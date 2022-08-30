import define1 from "./6eda90668ae03044@836.js";
import define2 from "./293899bef371e135@280.js";

function _1(md){return(
md`# My First Webcode Endpoint`
)}

function _2(md){return(
md`### Step 1, import dependencies
(note, these are clickable hyperlinks to the source!)`
)}

function _4(md){return(
md`### Step 2, deploy a handler`
)}

function _endpoint(deploy,getContext){return(
deploy("info", async (request, response) => {
  console.log("Request received", request);
  // debugger;
  response.send(
    `<pre>${JSON.stringify(
      {
        request,
        response,
        context: await getContext()
      },
      null,
      2
    )}</pre>`
  );
})
)}

function _6(endpoint,htl){return(
htl.html`<p>You can call your endpoint by clicking its <a target="_blank" href="${endpoint.href}">link</a> in a browser, or with <i>curl</i></p>
<div style="background-color: black; color: lightgrey; padding: 10px"><code>
    curl '${endpoint.href}'
<code></div>`
)}

function _7(md){return(
md`---`
)}

function _9(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","getContext"], _endpoint);
  main.variable(observer()).define(["endpoint","htl"], _6);
  main.variable(observer()).define(["md"], _7);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _9);
  return main;
}
