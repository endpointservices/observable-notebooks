import define1 from "./937d48655c0ed19a@17.js";

function _1(md){return(
md`# Circular Import B`
)}

function _two(){return(
2
)}

function _result(one,two){return(
one + two
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("two")).define("two", _two);
  main.variable(observer("result")).define("result", ["one","two"], _result);
  const child1 = runtime.module(define1);
  main.import("one", child1);
  return main;
}
