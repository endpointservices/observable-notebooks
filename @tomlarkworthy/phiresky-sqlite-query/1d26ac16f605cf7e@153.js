// https://observablehq.com/@tomlarkworthy/phiresky-sqlite-query@153
import define1 from "./a2e58f97fd5e8d7c@756.js";

function _1(md){return(
md`# Network efficient SQLite querying from static file hosting.

Just saw https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/ and wanted to see if we could do it here.

This is extremely cool, a 600MB sqlite database file is hosted on static storage, and we can issue SQL queries, but only a small amount of data is transfered! Yet no backend is really running, its exploiting HTTP range queries. Amazing work Phiresky

Here I am query data from a Google Cloud bucket provisioned using https://observablehq.com/@endpointservices/storage though I had to enable public access to the files for it to work (i.e. not go through the storage client). So I would suggest using your own bucket for now. I could not use Phiresky's Github pages because of CORS. But this demo shows it definitely will work with Google Cloud Storage buckets. 🔥🔥🔥🔥🔥

`
)}

function _2(Table,results){return(
Table(results[0].values, {
})
)}

function _3(md){return(
md`## LOOK WE ARE ISSUING SQL 👇`
)}

function _results(worker){return(
worker.db.exec(
  `select country_code, long_name from wdi_country limit 10;`
)
)}

function _sqlite(require){return(
require("sql.js-httpvfs")
)}

async function _workerUrl(FileAttachment){return(
URL.createObjectURL(
  new Blob([await FileAttachment("sqlite.worker@1.js").text()], {
    type: 'application/javascript'
  })
)
)}

function _wasmUrl(FileAttachment){return(
FileAttachment("sql-wasm@1.wasm").url()
)}

async function _worker(sqlite,configURL,workerUrl,wasmUrl){return(
await sqlite.createDbWorker(
  [
    {
      from: "jsonconfig",
      configUrl: configURL
    }
  ],
  workerUrl,
  wasmUrl
)
)}

function _configURL(){return(
'https://storage.googleapis.com/o_endpointservices_mybucket11/public/world-development-indicators-sqlite/split-db/config.json'
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["sql-wasm@1.wasm", {url: new URL("./files/5a5cfd04f6921c008b80ca55799e4642776ac0dfc6911e0b6d95a327344cec20a74ee94037d01eecaf0f41f6e5c4e5d06b97ca5b4494080d8767d803745db2c7.wasm", import.meta.url), mimeType: "application/wasm", toString}],
    ["sqlite.worker@1.js", {url: new URL("./files/d0458b3c8960fc3490b9812bf0f63d021bf9d9be25393c122fe69d0eb3c5662feb2a59f2c4650b5d752764ce4eadcbd21ec81089eee0e022bbbefb20be8680f1.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Table","results"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("results")).define("results", ["worker"], _results);
  main.variable(observer("sqlite")).define("sqlite", ["require"], _sqlite);
  main.variable(observer("workerUrl")).define("workerUrl", ["FileAttachment"], _workerUrl);
  main.variable(observer("wasmUrl")).define("wasmUrl", ["FileAttachment"], _wasmUrl);
  main.variable(observer("worker")).define("worker", ["sqlite","configURL","workerUrl","wasmUrl"], _worker);
  const child1 = runtime.module(define1);
  main.import("Table", child1);
  main.variable(observer("configURL")).define("configURL", _configURL);
  return main;
}
