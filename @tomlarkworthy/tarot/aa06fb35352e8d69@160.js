import define1 from "./549f62919a7018eb@2554.js";

function _1(transitions,footer,$0){return(
transitions, footer, $0
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["transitions","footer","viewof display"], _1);
  const child1 = runtime.module(define1);
  main.import("viewof display", child1);
  main.import("display", child1);
  main.import("transitions", child1);
  main.import("footer", child1);
  return main;
}
