// https://observablehq.com/@tomlarkworthy/coffeescript-demo@38
function _1(md){return(
md`# Coffeescript Proof of Concept

In response to https://talk.observablehq.com/t/coffeescript/2524/3

_"We don’t currently support transpilers, but you could evaluate JavaScript dynamically (using eval or the Function constructor)."_ -- mbostock (leader)

`
)}

function _square(compiler){return(
compiler.eval("(x) -> x * x")
)}

function _3(square){return(
square(4)
)}

function _compiler(require){return(
require('https://coffeescript.org/v2/browser-compiler-legacy/coffeescript.js')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("square")).define("square", ["compiler"], _square);
  main.variable(observer()).define(["square"], _3);
  main.variable(observer("compiler")).define("compiler", ["require"], _compiler);
  return main;
}
