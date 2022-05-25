// https://observablehq.com/@endpointservices/how-to-arrow-client@104
import define1 from "./a2e58f97fd5e8d7c@674.js";
import define2 from "./293899bef371e135@247.js";

async function _1(md,FileAttachment){return(
md`![](${await FileAttachment("ApachearrowClient@1.png").url()})

# Serverless arrow file consumption

* The [server](https://observablehq.com/@endpointservices/how-to-arrow-server) serves the resource in the cloud.
* The [client](https://observablehq.com/@endpointservices/how-to-arrow-client) consumes it in a user’s browser.

Here we read a _CSV_ and _arrow_ dataset off a [serverless](https://observablehq.com/@endpointservices/serverless-cells) endpoint using _d3_ and _arquero_


`
)}

function _notebook(){return(
`@endpointservices/how-to-arrow-server`
)}

function _3(d3,notebook){return(
d3.csv(`https://webcode.run/observablehq.com/${notebook};data.csv`, d3.autoType)
)}

function _dt(aq,notebook){return(
aq.loadArrow(`https://webcode.run/observablehq.com/${notebook};data.arrow`)
)}

function _results(Table,dt){return(
Table(dt)
)}

function _aq(require){return(
require('arquero')
)}

function _d3(require){return(
require("d3@6")
)}

function _10(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["ApachearrowClient@1.png", {url: new URL("./files/96f2198dda3268ae6fb71bb37fbeedd85df056d42c8e933276b31e5b84ce423b410926f7a12a7828960f8170291db0d58e73371a30490c28d42eb8f11c66afa2", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer("notebook")).define("notebook", _notebook);
  main.variable(observer()).define(["d3","notebook"], _3);
  main.variable(observer("dt")).define("dt", ["aq","notebook"], _dt);
  main.variable(observer("results")).define("results", ["Table","dt"], _results);
  main.variable(observer("aq")).define("aq", ["require"], _aq);
  const child1 = runtime.module(define1);
  main.import("Table", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _10);
  return main;
}
