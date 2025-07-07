import define1 from "./03dda470c56b93ff@8246.js";
import define2 from "./e1c39d41e8e944b0@939.js";
import define3 from "./0b75dbddd18995dc@1761.js";

function _1(md){return(
md`# Export to HTML example`
)}

function _3(report){return(
report
)}

function _5(exportToHTML,main){return(
exportToHTML({
  notebook: "@tomlarkworthy/test",
  module: main
})
)}

function _7(_ndd){return(
_ndd
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("exportToHTML", child1);
  main.import("report", child1);
  main.variable(observer()).define(["report"], _3);
  const child2 = runtime.module(define2);
  main.import("runtime", child2);
  main.import("main", child2);
  main.variable(observer()).define(["exportToHTML","main"], _5);
  const child3 = runtime.module(define3);
  main.import("_ndd", child3);
  main.variable(observer()).define(["_ndd"], _7);
  return main;
}
