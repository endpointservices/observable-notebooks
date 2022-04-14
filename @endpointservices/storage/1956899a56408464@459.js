import define1 from "./0905542adbad836e@55.js";
import define2 from "./52d808b188b8672b@129.js";
import define3 from "./84e66f78139ac354@814.js";
import define4 from "./dff1e917c89f5e76@1711.js";
import define5 from "./a2e58f97fd5e8d7c@674.js";
import define6 from "./11a5ab8b1b3a51db@1161.js";
import define7 from "./3d9d1394d858ca97@553.js";
import define8 from "./293899bef371e135@225.js";

function _1(md){return(
md`# Declarative Infra-as-code Helpers

Following Kubernetes paradigm, the description of a service is the desired _spec_ and the current state. Current state might change for reasons outside your control. 

Following Terraform paradigm, we commit the _spec_ to source control (in this case a notebook). _So you must always publish your changes_.

Following declarative resource orientated design principles, we describe the system into nouns (resources). The user states what they want (e.g. a bucket name 'foo' in europe), and the SDK attempts to make reality match the description of resources described by the user as a JSON document.

This notebook abstracts a pattern for hosting infra on observable.

- Create a resource description function by wrapping higher order function _resource).
- Create a backend implementation by supplying an *apply(current, space, token)*  to a *resource_endpoint* function.

Firestore hosts the dynamic state (at configPath). Observable hosts the user's intent. 

The pattern generates a UI with a _sync_ button that 
1. error checks the latest changes have been committed to the notebook
-  calls the apply function at the backend with the latest spec
- reads the result of apply and if successful commits it to the database
- The user UI updates to reflect the new reality.
- Counts usage and enforces a _max_ parameter

Thus the service develop just needs to worry about how the apply function is implemented, and the domain specific fields of the resource.


`
)}

function _2(widget){return(
widget({
  name: "bill",
  location: "US"
})
)}

function _widget(resource,resource_endpoint){return(
function widget({
    name = "widget_default",
    location = "europe"
  }) { 
  return resource({
    fields: ["", "name", "location"],
    endpoint: resource_endpoint({
      name: "widget",
      configPath: (domain, notebook, config) => `/domains/${domain}/notebooks/${notebook}/widgets/${config.name}`
    })
  })({
    name, location
  })
}
)}

function _resource(notebook,subdomain,deploy,firebase,html,Table,reconcile){return(
function resource({
    fields = undefined,
    name = "default",
    endpoint
  } = {}) {

  return async (proposedConfig) => {
    
    async function sync(proposedConfig) {
      const response = await fetch(endpoint.href,
        {
          method: "PUT",
          body: JSON.stringify({
            notebook: notebook(),
            subdomain: subdomain(),
            expected: proposedConfig
          })
        }
      );
      if (response.status !== 200) {
        throw new Error(`Error code ${response.status}. ${await response.text()}`)
      }
      const body = await response.json();
      if (body.message) throw new Error(body.message)
    }

    let error = undefined;
    let updating = false;

    // We create a HTTP endpoint to serve our desired configuration.
    const resource_config = deploy(`public ${endpoint.name} config ${name}`,
                                   (req, res) => res.json(proposedConfig));

    let render = async () => {
      const currentConfig = (await firebase.firestore().doc(endpoint.configPath(subdomain(), notebook(), proposedConfig)).get()).data();
      error = error || currentConfig?.error
      const ui = html`
        ${error ? html`<p style="color:red">${error}</p>`: null}
        ${Table([
          {'': 'current', ...currentConfig},
          {'': 'spec',    ...proposedConfig}
        ], {
          width: 'auto',
          columns: fields
        })}
        ${ updating
          ? html`<button class="update-btn" disabled> updating...</button>`
          : html`<button class="update-btn" onclick=${() => updateClick()}>Sync</button>`
        }
      ` 
      ui.value = proposedConfig
      return ui;
    }

    let ui = await render()
    let updateClick = async () => {
      updating = true;
      ui = reconcile(ui, await render());
      error = undefined;
      try {
        await sync(proposedConfig);
      } catch (err) {
        error = err.message
      }
      updating = false;
      ui = reconcile(ui, await render());
    }
    
    return ui;
  }
}
)}

function _resource_endpoint(deploy,getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,fetchWithTimeout,_){return(
function resource_endpoint({
    name,
    configPath,
    max = 99999,
    hostNotebook,
    apply = (current, config, token) => config 
  } = {}) {
  const endpoint = deploy(name, async (req, res, ctx) => {
    try {
      const serviceAccount = JSON.parse(ctx.secrets['endpointservices_secretadmin_service_account_key']);
      const token =  await getAccessTokenFromServiceAccount(serviceAccount);
      await signinWithAccessToken(token);

      const {
        subdomain,
        notebook,
        expected,
      } = JSON.parse(req.body);
      
      const countRef = firebase.firestore().doc(`services/usage/subdomains/${subdomain}/resources/${name}`)
      const currentPromise = firebase.firestore().doc(configPath(subdomain, notebook, expected)).get();
      const currentUsagePromise = countRef.get();
    
      // We can only safely sync with what has been published
      // So we read configuration is deployed rather than rely on what has been sent in the request
      // Its still useful for the deployer to send what they want to deploy as we can see if they have
      // forgotten to publish the Notebook.
      const actualResponse = await fetchWithTimeout(`https://endpointservice.web.app/notebooks/@${subdomain}/${notebook}/deployments/public%20${name}%20config%20${expected.name}`);
      if (actualResponse.status !== 200) {
        return res.status(404).json({
          error: "No published config found, did you forget to publish/share?"
        });
      }
      const actual = await actualResponse.json()
      
      // Check the published version matches what the caller is expecting
      if (!_.isEqual(actual, expected)) {
        return res.status(400).json({
          error: "The published config does not match your view, did you forget to publish/share?"
        });
      }
      
      const current = (await currentPromise).data() || {};
      delete current.error;
      const currentExists = current.state && current.state !== 'deleted'
      const proposedExists = actual.state && actual.state !== 'deleted'
      const proposedChange = (proposedExists ? 1 : 0) - (currentExists ? 1 : 0);
      
      // Check limits
      const currentUsage = (await currentUsagePromise).data() || {n: 0};
      
      if (proposedChange > 0 && currentUsage.n + proposedChange > max) {
        return res.status(422).send(`${currentUsage.n}/${max} ${name} resources used. Limit reached.`);
      }
      
      
      try {
        await apply(current, actual, {
          notebook: notebook,
          subdomain: subdomain,
          token
        });
      } catch (err) {
        current.error = err.message || err.body
      }

      await firebase.firestore().runTransaction(async (transaction) => {
        const countDoc = (await transaction.get(
          countRef
        )).data() || {
          updates: 0,
          n: 0
        };
        
        
        const newExists = current.state && current.state !== 'deleted'
        const change = (newExists ? 1 : 0) - (currentExists ? 1 : 0)
        
        transaction.set(
          firebase.firestore().doc(configPath(subdomain, notebook, actual))
          , {
            ...current
          }
        );

        transaction.set(countRef, {
          ...countDoc,
          n: countDoc.n + 1, 
          updates: countDoc.updates + 1,
          last_updated: firebase.firebase_.firestore.FieldValue.serverTimestamp(),
        });
      });
      
      res.json(current);
    } catch (err) {
      console.log(err.message, JSON.stringify(req.body))
      res.status(500).json({
        message: err.message || err.body
      })
    }
  }, {
    hostNotebook: hostNotebook,
    secrets: ['endpointservices_secretadmin_service_account_key']
  });
  
  return {
    configPath: configPath,
    name: name,
    href: endpoint.href
  }
}
)}

function _fetchWithTimeout(){return(
async (url, options, timeout = 10000) => {
    return await Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Cannot fetch config, did you publish the notebook?')), timeout)
        )
    ]);
}
)}

function _15(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["widget"], _2);
  main.variable(observer("widget")).define("widget", ["resource","resource_endpoint"], _widget);
  main.variable(observer("resource")).define("resource", ["notebook","subdomain","deploy","firebase","html","Table","reconcile"], _resource);
  main.variable(observer("resource_endpoint")).define("resource_endpoint", ["deploy","getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","fetchWithTimeout","_"], _resource_endpoint);
  main.variable(observer("fetchWithTimeout")).define("fetchWithTimeout", _fetchWithTimeout);
  const child1 = runtime.module(define1);
  main.import("_", child1);
  const child2 = runtime.module(define2);
  main.import("firebase", child2);
  main.import("listen", child2);
  main.import("subdomain", child2);
  main.import("notebook", child2);
  main.import("signinWithAccessToken", child2);
  main.import("getAccessTokenFromServiceAccount", child2);
  const child3 = runtime.module(define3);
  main.import("reconcile", child3);
  const child4 = runtime.module(define4);
  main.import("deploy", child4);
  const child5 = runtime.module(define5);
  main.import("Table", child5);
  const child6 = runtime.module(define6);
  main.import("html", child6);
  const child7 = runtime.module(define7);
  main.import("signature", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _15);
  return main;
}
