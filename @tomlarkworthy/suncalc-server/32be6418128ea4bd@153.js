// https://observablehq.com/@tomlarkworthy/suncalc-server@153
import define1 from "./6eda90668ae03044@836.js";
import define2 from "./509d6b5d1aebf2a1@236.js";
import define3 from "./293899bef371e135@278.js";

async function _1(FileAttachment,md){return(
md`# Suncalc server for [sqlite-http](https://github.com/asg017/sqlite-http) implemented in a notebook

[@asg017](/@asg017) showed using a Deno deployment how to tap into the power of [sqlite-http](https://observablehq.com/@asg017/introducing-sqlite-http) to extend your database with server-defined processing. However, it required setting up a server. We can do that kind of task inline an observable notebook though with less fuss and with faster development loops and debugging out-of-the-box.

In this notebook I show how easy it is to convert the provided Deno in [introducing-sqlite-http](https://observablehq.com/@asg017/introducing-sqlite-http) to a webcode equivalent. Here is the original code

${await FileAttachment("image@1.png").image({style:"width: 500px"})}`
)}

function _2(md){return(
md`## And here is the equivalent in Observable/[WEBCode](http://webcode.run/)
`
)}

function _suncalc(require){return(
require("suncalc@1.9.0/suncalc.js")
)}

function _suntimesRoute(URLPattern){return(
new URLPattern({ pathname: "/suncalc" })
)}

function _handleSuntimes(suncalc,Response){return(
async function handleSuntimes(request) {
  const { latitude, longitude, date } = await request.json();
  const times = suncalc.getTimes(new Date(date), latitude, longitude);
  return Promise.resolve(new Response(JSON.stringify(times), { status: 200 }));
}
)}

function _suncalcServer(endpoint,$0,suntimesRoute,handleSuntimes){return(
endpoint(
  "default",
  async (req, res) => {
    debugger; // put a request debugger breakpoint in for demo purposes
    $0.value = req.body; // Also write the incoming request into the lastRequest value
    if (suntimesRoute.test(req.url)) return handleSuntimes(req);
    else res.status(404).send("Not found");
  },
  {
    // Switch on public livecoding so everybody
    // can experience livecoding
    livecode: "public"
  }
)
)}

function _testing(suncalcServer,md){return(
md`### Test with

\`\`\`
curl -X POST '${suncalcServer.href}/suncalc' --data '{"longitude": -118.1498, "latitude": 34.0414, "date": "2020-03-01"}'
\`\`\``
)}

function _8(md){return(
md`Note unlike Deno if we are logged with livecoding, we can see the requests get processed, which is very helpful for development of custom functions!`
)}

function _lastRequest(Inputs){return(
Inputs.text({ disabled: true, label: "last request" })
)}

function _10(md){return(
md`You can drop the long string which is the livecoding correlation id and just use 
\`\`\`
https://webcode.run/observablehq.com/@tomlarkworthy/suncalc-server/suncalc
\`\`\`
as the URL too (but its not live debuggable)`
)}

function _11(md){return(
md`## Live debugging

If you have your browser tools open and you are logged into the webcode endpoint, you should trigger a breakpoint in the request handler! State-of-the-art-debugging and reactive deployment against production endpoints!`
)}

function _12(md){return(
md`---

#### Helpers`
)}

function _installHere(testing,installCopyCode,invalidation)
{
  testing,
    [...document.querySelectorAll("pre")].map((el) =>
      installCopyCode(el, { invalidation })
    );
}


function _17(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/0325a4058076a17d0fc6e3aca784a076a5e8dbdf0e26971c308ab35e0907d186e732d0bcd672c8d7fca7cec9b408d3558e6d089f2583170872ed335cf6b11687.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("suncalc")).define("suncalc", ["require"], _suncalc);
  main.variable(observer("suntimesRoute")).define("suntimesRoute", ["URLPattern"], _suntimesRoute);
  main.variable(observer("handleSuntimes")).define("handleSuntimes", ["suncalc","Response"], _handleSuntimes);
  main.variable(observer("viewof suncalcServer")).define("viewof suncalcServer", ["endpoint","viewof lastRequest","suntimesRoute","handleSuntimes"], _suncalcServer);
  main.variable(observer("suncalcServer")).define("suncalcServer", ["Generators", "viewof suncalcServer"], (G, _) => G.input(_));
  main.variable(observer("testing")).define("testing", ["suncalcServer","md"], _testing);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof lastRequest")).define("viewof lastRequest", ["Inputs"], _lastRequest);
  main.variable(observer("lastRequest")).define("lastRequest", ["Generators", "viewof lastRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("installHere")).define("installHere", ["testing","installCopyCode","invalidation"], _installHere);
  const child2 = runtime.module(define2);
  main.import("installCopyCode", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _17);
  return main;
}
