// https://observablehq.com/@endpointservices/logs@1920
import define1 from "./165e9411d1af7e86@1398.js";
import define2 from "./698257e86fae4586@346.js";
import define3 from "./993a0c51ef1175ea@1317.js";
import define4 from "./11a5ab8b1b3a51db@1160.js";
import define5 from "./c7a3b20cec5d4dd9@659.js";
import define6 from "./cb60908738c3dabe@107.js";
import define7 from "./777fe85658e39c55@470.js";
import define8 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["robert-larsson-UsET4S0ginw-unsplash@1.jpg",new URL("./files/80f385bd757c2b37181f93d4a6f341849a0a28ccbdb21b28535a6dba3a52fb889d3ac52918d2849edbd76ae90fb8b732fa23821baebed742cb58f515ef67316b",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Logs Manager

Here you can enable logging for your [serverless cells](https://observablehq.com/@tomlarkworthy/serverless-cells). Logs are organized by Observable subdomain. Once enabled, you will be provided a link to your logs which are hosted on [Google Cloud Logging](https://console.cloud.google.com/logs/query?project=endpointserviceusers). You will need to [certify ownership](https://observablehq.com/@tomlarkworthy/subdomain-certification) of your observable subdomain with Endpoint Services before you can access logs.
`
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`

![](${await FileAttachment("robert-larsson-UsET4S0ginw-unsplash@1.jpg").url()})

<span>Photo by <a href="https://unsplash.com/@squareddesign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Robert Larsson</a> on <a href="https://unsplash.com/s/photos/logs?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
`
)});
  main.variable(observer("ui")).define("ui", ["subdomains","md","html","subdomain_states","subdomain_members","enable","user","addMember"], function(subdomains,md,html,subdomain_states,subdomain_members,enable,user,addMember)
{
  if (subdomains.length === 0) return md`
## No subdomains certified

You will need to [certify ownership of an _Observable_ subdomain](https://observablehq.com/@tomlarkworthy/subdomain-certification) before you can access subdomain logs. Follow the instructions [here first](https://observablehq.com/@tomlarkworthy/subdomain-certification).
`
  return html`<div>
<h2>Logging service</h2>
<table style="max-width:100%">
<thead>
<tr>
  <th>
    Subdomain
  </th>
  <th>
    Status
  </th>
  <th>
    Users
  </th>
  <th>
    Actions
  </th>
  <th>
  </th>
</tr>
</thead>
<tbody>
${subdomains.map(subdomain => html`<tr>
  <td>
    ${subdomain}
  </td>
  <td>
    ${subdomain_states[subdomain].state || "NOT ENABLED"}
  </td>
  <td>
    ${(subdomain_members[subdomain] || []).map(m => m.email).join(", ")}
  </td>
  <td>
    ${subdomain_states[subdomain].state === undefined ?
      html`<button class="button"
                   onclick=${() => enable(subdomain)}
      >
        Enable logging for team
      </button>`: null          
    }

    ${(subdomain_members[subdomain] || []).map(m => m.email).indexOf(user.email) == -1 ? 
      html`<button onclick=${() => addMember(subdomain, user.email)}
           > Add ${user.email}</button>`
      : html`<a target="_blank" href=${`https://console.cloud.google.com/logs/query;storageScope=storage,projects%2Fendpointserviceusers%2Flocations%2Feurope-west1%2Fbuckets%2Fusers_europe_west1%2Fviews%2F${subdomain}?project=endpointserviceusers`}
      >
        Goto logs
      </a>`
    }
  </td>
</tr>`)}
</tbody>
</table></div>`
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Login

A Google Identity (gmail or gsuite account) is required to access the logs service.
`
)});
  main.variable(observer()).define(["viewof user"], function($0){return(
$0
)});
  main.variable(observer()).define(["md"], function(md){return(
md `## Open Cloud


Like other Open Cloud tooling, the source code and design of this integration is in this notebook and permissively licensed.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Change log
- 2021-01-11: Created
`
)});
  main.variable(observer("overview")).define("overview", ["md"], function(md){return(
md`
 ## Open Cloud Implementation

The code in this notebook implements the logs service API endpoints through the use of [serverless cells](https://observablehq.com/@tomlarkworthy/serverless-cells). The code within this notebook **is** the code in production!

This notebook aims to deliver a multi-tenancy production logging experience for serverless cell users *'on the cheap'*. To keep development costs down we reuse Google Cloud Platforms logging solution and exploit [Google Cloud Logging Views](https://cloud.google.com/logging/docs/logs-views) and [IAM Conditions](https://cloud.google.com/iam/docs/conditions-overview) to enforce isolation between users.

Thus, we get a production logging solution with power features like a query language but without having to develop any of the backend or UI. Reuse rocks!

### Technical Approach

The serverless cell runtime emits logs named *\${subdomain}*  as a *'global'* monitored [resource_type](https://cloud.google.com/logging/docs/api/v2/resource-list#resource-types).

All logs for *resource_type* 'global' are exported to a project name _'endpointserviceusers'_ into a [regional log bucket](https://cloud.google.com/logging/docs/buckets) _(europe-west1)_. This separates user logs from system logs, as system logs have more specific monitored resource types.

When a user enables the logging service for a subdomain ([enable endpoint](https://observablehq.com/@endpointservices/logs#enableEndpoint)), a [log view](https://cloud.google.com/logging/docs/logs-views) is created which filters the logs with log id *\${subdomain}*.

When a user is given read access to logs ([addMember endpoint](https://observablehq.com/@endpointservices/logs#addMemberEndpoint)). The user's email is added to the project IAM policy as a [log view accessor with conditional access](https://cloud.google.com/logging/docs/access-control) predicted on the log resource name. Thus, the user is granted access only to a single log view which is a filter to *\${subdomain}*.

In both cases we record the changes in Firestore so the front end can update in realtime.

Both operations are idempotent.

The IAM policy for *'endpointserviceusers'* will get large, as it serves end-users. End-user data will also appear in the console, but by putting it in an isolated project user data will not be in view for normal operations.


### Serverside Endpoints
`
)});
  main.variable(observer("enableEndpoint")).define("enableEndpoint", ["deploy","verifyIdToken","firebase","getAccessTokenFromServiceAccount","createGapi"], function(deploy,verifyIdToken,firebase,getAccessTokenFromServiceAccount,createGapi){return(
deploy("enable", async (req, res, ctx) => {
  // Check signed in user
  req.auth = await verifyIdToken(firebase.app(), req.headers['idtoken']);
  const subdomain = JSON.parse(req.body).subdomain;
  
  // Login in with service account
  const service_account = JSON.parse(
    ctx.secrets["endpointservices_secretadmin_service_account_key"]);
  const access_token = await getAccessTokenFromServiceAccount(service_account);
  const credential = firebase.auth.GoogleAuthProvider.credential(null, access_token);
  await firebase.auth().signInWithCredential(credential);
  console.log(`Logged in with uid ${firebase.auth().currentUser.uid}`)
  
  // Check user is owner of subdomain
  const ownersQuery = await firebase.firestore().collection("/services/ownership/owners")
  .where("subdomain", '==', subdomain)
  .where("uid", '==', req.auth.uid).limit(1).get();

  if (ownersQuery.empty) {
    res.status(403).send("Not owner of subdomain");
  }
  
  // Create a logging view for the namespace
  console.log("Create GAPI client")
  const gapi = await createGapi({
    "apiKey": "AIzaSyCclj9WTy8ZAPxOBQeLyt_JS8zVF93wVnI",
    "discoveryDocs": ["https://logging.googleapis.com/$discovery/rest?version=v2"],
    "access_token": access_token
  });
  
  console.log("Create Google Cloud Logging View for ${subdomain}")
  const response = await gapi.logging.projects.locations.buckets.views.create({
    parent: "projects/endpointserviceusers/locations/europe-west1/buckets/users_europe_west1",
    viewId: subdomain,
    resource: {
      "name": subdomain,
      "description": `Logs for ${subdomain}`,
      // https://cloud.google.com/logging/docs/reference/v2/rest/v2/billingAccounts.buckets.views#LogView
      "filter": `LOG_ID(${subdomain})`
    }
  });
  console.log("Write to Firestore")
  await firebase.firestore().doc(`/services/logs/subdomains_state/${subdomain}`).set({
    state: "ENABLED"
  });
  
  res.status(response.status);
  res.json(response.result);  
}, {
  secrets: ['endpointservices_secretadmin_service_account_key']
})
)});
  main.variable(observer("addMemberEndpoint")).define("addMemberEndpoint", ["deploy","verifyIdToken","firebase","getAccessTokenFromServiceAccount","createGapi"], function(deploy,verifyIdToken,firebase,getAccessTokenFromServiceAccount,createGapi){return(
deploy("addMember", async (req, res, ctx) => {
  // Check signed in user
  req.auth = await verifyIdToken(firebase.app(), req.headers['idtoken']);
  const subdomain = JSON.parse(req.body).subdomain;
  const viewer_email = JSON.parse(req.body).viewer_email;
  
  // Login in with service account
  const service_account = JSON.parse(
    ctx.secrets["endpointservices_secretadmin_service_account_key"]);
  const access_token = await getAccessTokenFromServiceAccount(service_account);
  const credential = firebase.auth.GoogleAuthProvider.credential(null, access_token);
  await firebase.auth().signInWithCredential(credential);
  console.log(`Logged in with uid ${firebase.auth().currentUser.uid}`)
  
  // Check user is owner of subdomain
  const ownersQuery = await firebase.firestore().collection("/services/ownership/owners")
  .where("subdomain", '==', subdomain)
  .where("uid", '==', req.auth.uid).limit(1).get();

  if (ownersQuery.empty) {
    res.status(403).send("Not owner of subdomain");
  }
  
  // Use Cloud Resource Manager API to adjust access to the logging view
  console.log("Create GAPI client")
  const gapi = await createGapi({
    "apiKey": "AIzaSyCclj9WTy8ZAPxOBQeLyt_JS8zVF93wVnI",
    "discoveryDocs": ["https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v1"],
    "access_token": access_token
  });
  
  console.log("Read existing IAM policy")
  const readResponse = await gapi.cloudresourcemanager.projects.getIamPolicy({
    resource: "endpointserviceusers",
    options: {
      "requestedPolicyVersion": 3 // We need 3 for CEL conditions to work
    }
  });
  
  const existingPolicy = JSON.parse(readResponse.body);
  
  const newBinding = {
    "role": "roles/logging.viewAccessor",
    "members": [
      `user:${viewer_email}`
    ],
    "condition": {
      "expression": `resource.name == "projects/endpointserviceusers/locations/europe-west1/buckets/users_europe_west1/views/${subdomain}"`,
      "title": `${subdomain}`
    }
  };
  
  const updatedPolicy = {
    version: existingPolicy.version,
    etag: existingPolicy.etag,
    bindings: [
      ...existingPolicy.bindings,
      newBinding
    ]
  }
  
  console.log("Write new policy")
  const writeResponse = await gapi.cloudresourcemanager.projects.setIamPolicy({
    resource: "endpointserviceusers",
    policy: updatedPolicy
  })
  
  // Record success
  if (writeResponse.status == 200) {
    console.log("Write to Firestore")
    await firebase.firestore().doc(
      `/services/logs/subdomains_state/${subdomain}/members/${viewer_email}`
    ).set({role: "VIEWER"});
  }
  
  res.status(writeResponse.status);
  res.json({msg: `${viewer_email} added to ${subdomain}`});  
}, {
  secrets: ['endpointservices_secretadmin_service_account_key']
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Clientside SDK`
)});
  main.variable(observer("enable")).define("enable", ["subdomain_states_mask","mutable subdomain_states_mask","enableEndpoint","user"], function(subdomain_states_mask,$0,enableEndpoint,user){return(
async (subdomain) => {
  if (subdomain_states_mask[subdomain] != "ENABLING") {
    subdomain_states_mask[subdomain] = "ENABLING"
    $0.value = subdomain_states_mask;
  }
  const response = await fetch(enableEndpoint.href, {
    method: "POST",
    headers: {
      idtoken: await user.getIdToken()
    },
    body: JSON.stringify({
      subdomain: subdomain
    })
  })
  
  subdomain_states_mask[subdomain] = undefined
  $0.value = subdomain_states_mask;
  return await response.json();
}
)});
  main.variable(observer("addMember")).define("addMember", ["subdomain_states_mask","mutable subdomain_states_mask","addMemberEndpoint","user"], function(subdomain_states_mask,$0,addMemberEndpoint,user){return(
async (subdomain, viewer_email) => {
  if (subdomain_states_mask[subdomain] != "ADDING_MEMBER") {
    subdomain_states_mask[subdomain] = "ADDING_MEMBER"
    $0.value = subdomain_states_mask;
  }
  const response = await fetch(addMemberEndpoint.href, {
    method: "POST",
    headers: {
      idtoken: await user.getIdToken()
    },
    body: JSON.stringify({
      subdomain: subdomain,
      viewer_email: viewer_email
    })
  })
  
  subdomain_states_mask[subdomain] = undefined
  $0.value = subdomain_states_mask;
  return await response.json();
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### State`
)});
  main.variable(observer("subdomain_certificates")).define("subdomain_certificates", ["listen","firebase","user"], function(listen,firebase,user){return(
listen(firebase.firestore().collection("/services/ownership/owners").where("uid", "==", user.uid))
)});
  main.variable(observer("subdomains")).define("subdomains", ["subdomain_certificates"], function(subdomain_certificates){return(
subdomain_certificates.reduce(
  (acc, cert) => {
    if (!acc.includes(cert.subdomain)) acc.push(cert.subdomain)
    return acc
  },
  []
)
)});
  main.variable(observer("subdomain_states")).define("subdomain_states", ["subdomains","listen","firebase","subdomain_states_mask"], async function(subdomains,listen,firebase,subdomain_states_mask)
{
  // Fetch all the states for all subdomains
  const states = await Promise.all(subdomains.map(
    subdomain => listen(
      firebase.firestore().doc(
        `/services/logs/subdomains_state/${subdomain}`),
      {includeId: true}
  ).next()));
  // Now index state indexed by subdomain
  return states.reduce(
    (acc, record) => Object.defineProperty(acc, record.value._id, {
      value: {...record.value, state: subdomain_states_mask[record.value._id] || record.value.state},
      enumerable: true
    })
    ,{}
  )
}
);
  main.define("initial subdomain_states_mask", function(){return(
{}
)});
  main.variable(observer("mutable subdomain_states_mask")).define("mutable subdomain_states_mask", ["Mutable", "initial subdomain_states_mask"], (M, _) => new M(_));
  main.variable(observer("subdomain_states_mask")).define("subdomain_states_mask", ["mutable subdomain_states_mask"], _ => _.generator);
  main.variable(observer("subdomain_members")).define("subdomain_members", ["subdomains","listen","firebase","groupBy"], async function(subdomains,listen,firebase,groupBy)
{
  const members = await Promise.all(subdomains.map(
    subdomain => listen(
      firebase.firestore().collection(
        `/services/logs/subdomains_state/${subdomain}/members`),
      {includeRef: true}
  ).next()));
  
  const flatMembers = members.flatMap(s => s.value);
  const subdomainFromRef = (ref) => ref.match(/^services\/logs\/subdomains_state\/([^/]*)\//)[1]
  const emailFromRef = (ref) => ref.match(/^services\/logs\/subdomains_state\/[^/]*\/members\/([^/]*)/)[1]
  const extractedmembers = flatMembers.map(member => ({
    email: emailFromRef(member._ref),
    subdomain: subdomainFromRef(member._ref),
    role: member.role
  }));
  return groupBy(extractedmembers, 'subdomain')
}
);
  main.variable(observer("groupBy")).define("groupBy", function(){return(
function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
)});
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("Router", child1);
  main.import("handleWithExpress", child1);
  const child2 = runtime.module(define2);
  main.import("verifyIdToken", child2);
  main.variable(observer("getAccessTokenFromServiceAccount")).define("getAccessTokenFromServiceAccount", ["jsrsasign"], function(jsrsasign){return(
async function getAccessTokenFromServiceAccount(serviceAccountKey) {
  // First create a JWT from the credentials
  const tNow = Math.floor((new Date()).getTime() / 1000);
  const sHeader = JSON.stringify({alg: 'RS256', typ: 'JWT'});
  const sPayload = JSON.stringify({
      iss: serviceAccountKey.client_email,
      scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform",
      iat: tNow,
      exp: tNow + 600,
      aud: "https://oauth2.googleapis.com/token",
  });
  const JWT = jsrsasign.KJUR.jws.JWS.sign("RS256", sHeader, sPayload, serviceAccountKey.private_key);
    
  // Swap JWT for access_token
  const tokenResponse = await fetch(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${JWT}`,
    }
  );

  if (tokenResponse.status != 200) {
    throw new Error(await tokenResponse.text())
  }
  return (await tokenResponse.json()).access_token;
}
)});
  main.variable(observer("signinWithGoogleServiceAccountKeyJson")).define("signinWithGoogleServiceAccountKeyJson", ["getAccessTokenFromServiceAccount","firebase"], function(getAccessTokenFromServiceAccount,firebase){return(
async function signinWithGoogleServiceAccountKeyJson(serviceAccountKey) {
  const access_token = await getAccessTokenFromServiceAccount(serviceAccountKey)
  const credential = firebase.auth.GoogleAuthProvider.credential(null, access_token);
  return await firebase.auth().signInWithCredential(credential)
}
)});
  const child3 = runtime.module(define3).derive(["firebaseConfig"], main);
  main.import("viewof user", child3);
  main.import("user", child3);
  main.import("firebase", child3);
  main.import("listen", child3);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", function(){return(
{
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  databaseURL: "https://endpointservice.firebaseio.com",
  projectId: "endpointservice",
  storageBucket: "endpointservice.appspot.com",
  messagingSenderId: "1986724398",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
  uiConfig: { // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com"],
  },
}
)});
  main.variable(observer("jsrsasign")).define("jsrsasign", ["require"], function(require){return(
require('https://bundle.run/jsrsasign@10.1.4')
)});
  const child4 = runtime.module(define4);
  main.import("html", child4);
  const child5 = runtime.module(define5);
  main.import("viewof suite", "viewof testsuite", child5);
  main.import("suite", "testsuite", child5);
  main.import("expect", child5);
  const child6 = runtime.module(define6);
  main.import("encode", child6);
  main.import("decode", child6);
  const child7 = runtime.module(define7);
  main.import("createGapi", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
