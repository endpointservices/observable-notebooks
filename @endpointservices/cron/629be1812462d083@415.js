// https://observablehq.com/@endpointservices/cron@415
import define1 from "./52d808b188b8672b@129.js";
import define2 from "./dff1e917c89f5e76@1964.js";
import define3 from "./11a5ab8b1b3a51db@1161.js";
import define4 from "./84e66f78139ac354@829.js";
import define5 from "./a2e58f97fd5e8d7c@756.js";
import define6 from "./0905542adbad836e@55.js";
import define7 from "./3d9d1394d858ca97@553.js";
import define8 from "./293899bef371e135@293.js";

async function _1(md,FileAttachment){return(
md`# Schedule Regular Tasks with Cron

![](${await FileAttachment("Cron.png").url()})

Cron will call a URL regularly. To create a regular task call _createCron_.

`
)}

function _2(signature,createCron){return(
signature(createCron)
)}

function _createCron(deploy,firebase,configPath,subdomain,notebook,html,Table,reconcile,update){return(
async function createCron({
  name = "default", // Unique name needed per cron per notebook
  enabled = true, // Fastest way to disable a cron is to set enabled = false
  schedule = "0 0 1 * *", // UNIX cron format (https://man7.org/linux/man-pages/man5/crontab.5.html)
  location = "europe-west1",
  timezone = "UTC",
  url, // E.g. 'https://example.com'
  method = "POST",
  body = ""
} = {}) {
  const proposedConfig = {
    name,
    enabled,
    schedule,
    timezone,
    location,
    url,
    method,
    body
  };
  let error = undefined;
  let updating = false;

  // We create a HTTP endpoint to serve our desired configuration.
  const cron_config = deploy(
    "public cron config " + name,
    (req, res) => res.json(proposedConfig),
    { modifiers: ["terminal"] }
  );

  let render = async () => {
    const currentConfig = (
      await firebase
        .firestore()
        .doc(configPath(subdomain(), notebook(), name))
        .get()
    ).data();
    return html`
      ${error ? html`<p style="color:red">${error}</p>` : null}
      ${Table(
        [
          { "": "current", ...currentConfig },
          { "": "desired", ...proposedConfig }
        ],
        {
          width: "auto",
          columns: [
            "",
            "name",
            "enabled",
            "schedule",
            "timezone",
            "url",
            "method",
            "body",
            "location"
          ]
        }
      )}
      ${
        updating
          ? html`<button class="update-btn" disabled> updating...</button>`
          : html`<button class="update-btn" onclick=${() =>
              updateClick()}>Update</button>`
      }
    `;
  };

  let ui = await render();
  let updateClick = async () => {
    updating = true;
    ui = reconcile(ui, await render());
    try {
      error = await update(proposedConfig);
    } catch (err) {
      error = err.message;
    }
    updating = false;
    ui = reconcile(ui, await render());
  };

  return ui;
}
)}

function _4(md){return(
md`
This will return a UI which will tell you the current state of the named cron job, and a button to update the latest version. Cron is configured like infrastructure-as-code, you need to *publish* the notebook containing configuration before you can _update_.
`
)}

function _example(createCron){return(
createCron({
  schedule: '5 2 * * *', // Daily, at 2a.m.
  url: "https://observablehq.com/@endpointservices/cron"
})
)}

function _6(md){return(
md`

The strange way schedules are expressed is an oddity due to historical reasons. There are plenty of resources on the web to help you figure out the correct expression, for example [crontab.guru](https://crontab.guru/examples.html). Don't feel bad, I look them up all the time too! The good thing is that they can model stuff like _"do something every hour but only during office hours"_ which is very useful to alert you of faults but not in the middle of the night.

The API that actually creates the Job can be found in [https://observablehq.com/@endpointservices/cron-backend](https://observablehq.com/@endpointservices/cron-backend)
`
)}

function _configPath(){return(
(subdomain, notebook, name) =>
  `services/cron/subdomains/${subdomain}/notebooks/${notebook}/crons/${name}`
)}

function _8(md){return(
md`### Update calls [@endpointservices/cron-backend](https://observablehq.com/@endpointservices/cron-backend)`
)}

function _update(notebook,subdomain){return(
async function update(config) {
  const response = await fetch(
    "https://webcode.run/observablehq.com/@endpointservices/cron-backend;update_cron",
    {
      method: "PUT",
      body: JSON.stringify({
        notebook: notebook(),
        subdomain: subdomain(),
        expected: config
      })
    }
  );
  if (response.status != 200) {
    return await response.text();
  }
}
)}

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Cron.png", {url: new URL("./files/db6a61a4a210555c4422ea034ec059f52ee2d3128a3e23eb16e24c2197b85c46128aca9ccebb8b72c431456d84f31c4648df69e2dbfaf473eecf75e2188c2220.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["signature","createCron"], _2);
  main.variable(observer("createCron")).define("createCron", ["deploy","firebase","configPath","subdomain","notebook","html","Table","reconcile","update"], _createCron);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("example")).define("example", ["createCron"], _example);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("configPath")).define("configPath", _configPath);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("update")).define("update", ["notebook","subdomain"], _update);
  const child1 = runtime.module(define1);
  main.import("firebase", child1);
  main.import("subdomain", child1);
  main.import("notebook", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  const child3 = runtime.module(define3);
  main.import("html", child3);
  const child4 = runtime.module(define4);
  main.import("reconcile", child4);
  const child5 = runtime.module(define5);
  main.import("Table", child5);
  const child6 = runtime.module(define6);
  main.import("_", child6);
  const child7 = runtime.module(define7);
  main.import("signature", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
