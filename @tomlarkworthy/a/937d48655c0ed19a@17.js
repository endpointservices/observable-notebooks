import define1 from "./99fd2056c9547bdc@19.js";

function _1(md){return(
md`# Circular Import A`
)}

function _one(){return(
1
)}

function _3(two,one){return(
two + one
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("one")).define("one", _one);
  main.variable(observer()).define(["two","one"], _3);
  const child1 = runtime.module(define1);
  main.import("two", child1);
  return main;
}
