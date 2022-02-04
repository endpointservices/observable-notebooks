// https://observablehq.com/@endpointservices/how-to-arrow-client@104
import define1 from "./a2e58f97fd5e8d7c@672.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["ApachearrowClient@1.png",new URL("./files/96f2198dda3268ae6fb71bb37fbeedd85df056d42c8e933276b31e5b84ce423b410926f7a12a7828960f8170291db0d58e73371a30490c28d42eb8f11c66afa2",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`![](${await FileAttachment("ApachearrowClient@1.png").url()})

# Serverless arrow file consumption

* The [server](https://observablehq.com/@endpointservices/how-to-arrow-server) serves the resource in the cloud.
* The [client](https://observablehq.com/@endpointservices/how-to-arrow-client) consumes it in a user’s browser.

Here we read a _CSV_ and _arrow_ dataset off a [serverless](https://observablehq.com/@endpointservices/serverless-cells) endpoint using _d3_ and _arquero_


`
)});
  main.variable(observer("notebook")).define("notebook", function(){return(
`@endpointservices/how-to-arrow-server`
)});
  main.variable(observer()).define(["d3","notebook"], function(d3,notebook){return(
d3.csv(`https://webcode.run/observablehq.com/${notebook};data.csv`, d3.autoType)
)});
  main.variable(observer("dt")).define("dt", ["aq","notebook"], function(aq,notebook){return(
aq.loadArrow(`https://webcode.run/observablehq.com/${notebook};data.arrow`)
)});
  main.variable(observer("results")).define("results", ["Table","dt"], function(Table,dt){return(
Table(dt)
)});
  main.variable(observer("aq")).define("aq", ["require"], function(require){return(
require('arquero')
)});
  const child1 = runtime.module(define1);
  main.import("Table", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
