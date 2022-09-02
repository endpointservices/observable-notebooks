// https://observablehq.com/@endpointservices/how-to-arrow-server@91
import define1 from "./dff1e917c89f5e76@1964.js";
import define2 from "./ef672b935bd480fc@623.js";
import define3 from "./293899bef371e135@280.js";

async function _1(md,FileAttachment){return(
md`# Serverless arrow file server

![](${await FileAttachment("ApachearrowServer.png").url()})

* The [server](https://observablehq.com/@endpointservices/how-to-arrow-server) serves the resource in the cloud.
* The [client](https://observablehq.com/@endpointservices/how-to-arrow-client) consumes it in a user’s browser.

We use a [serverless-cell](https://observablehq.com/@endpointservices/how-to-arrow-client) to
1. read a big dataset and transform to 
  - CSV
  - Apache Arrow
2. set the cache control headers so the expensive transformation is cached in CDN
3. serve the results from a [serverless-cell](https://observablehq.com/@endpointservices/serverless-cells)

The Covid19 dataset is CORS protected, so we use [*fetchp*](https://observablehq.com/@tomlarkworthy/fetchp), which in the browser will use a proxy.
`
)}

function _2(md){return(
md`*Note: this notebook loads a large unoptimized dataset and can be slow to load if your connection’s speed is mediocre (like mine); but we don’t need to open it except for developing and debugging; users will only access its endpoints through the client.*`
)}

function _allData(fetchp){return(
fetchp(
  "https://covid19.who.int/page-data/table/page-data.json"
).then((d) => d.json())
)}

function _data(allData){return(
allData.result.pageContext.rawDataSets.vaccineData.data
)}

function _5(deploy,aq,data){return(
deploy("data.csv", async (req, res) => {
  res.header("Cache-control", `public, max-age=${1 * 3600}`); // 1 hour cache on the CDN
  res.header("Content-Type", "text/plain");
  res.send(aq.from(data).toCSV());
})
)}

function _6(deploy,aq,data){return(
deploy("data.arrow", async (req, res) => {
  res.header("Cache-control", `public, max-age=${1 * 3600}`); // 1 hour cache on the CDN
  res.header("Content-Type", "application/octet-stream");
  res.header("Content-Disposition", `attachment; filename="data.arrow"`);
  res.send(aq.from(data).toArrowBuffer());
})
)}

function _7(md){return(
md`These two endpoints are now ready for consumption by any [client](/@endpointservices/how-to-arrow-client).`
)}

function _8(md){return(
md`---
_libraries_`
)}

function _aq(require){return(
require('arquero')
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["ApachearrowServer.png", {url: new URL("./files/4b92bbd2cadae6a400ccc77479acd362158ba31c25d6bbb1146664c64b54caca35b55398949c706b75472cfef29c5686abc9d8ae680aba0d111a5041e91df72f.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("allData")).define("allData", ["fetchp"], _allData);
  main.variable(observer("data")).define("data", ["allData"], _data);
  main.variable(observer()).define(["deploy","aq","data"], _5);
  main.variable(observer()).define(["deploy","aq","data"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  main.variable(observer("aq")).define("aq", ["require"], _aq);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _13);
  return main;
}
