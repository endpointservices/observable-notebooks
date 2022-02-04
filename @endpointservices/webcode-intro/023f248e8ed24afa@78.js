import define1 from "./6eda90668ae03044@802.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# My First Webcode Endpoint`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Step 1, import dependencies
(note, these are clickable hyperlinks to the source!)`
)});
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`### Step 2, deploy a handler`
)});
  main.variable(observer("endpoint")).define("endpoint", ["deploy","getContext"], function(deploy,getContext){return(
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
)});
  main.variable(observer()).define(["endpoint","htl"], function(endpoint,htl){return(
htl.html`<p>You can call your endpoint by clicking its <a target="_blank" href="${endpoint.href}">link</a> in a browser, or with <i>curl</i></p>
<div style="background-color: black; color: lightgrey; padding: 10px"><code>
    curl '${endpoint.href}'
<code></div>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
