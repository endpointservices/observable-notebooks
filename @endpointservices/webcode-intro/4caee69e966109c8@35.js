// https://observablehq.com/@mbostock/disposal@35
function _1(md){return(
md`# Disposal

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Feb. 2021:*** *The disposal function is now available as part of [**Observable Inputs**](/@observablehq/inputs)! This notebook will remain for history, but please upgrade.*</p>

This is a little helper to detect when an element is removed from the DOM. It functions similarly to [invalidation](https://github.com/observablehq/notebook-stdlib/blob/master/README.md#invalidation), except that you don’t need to pass the invalidation promise around. The downside is that it only works if the resource you want to dispose is attached to a DOM element.`
)}

function _disposal(Inputs){return(
Inputs.disposal
)}

function _3(md,test){return(
md`This is a test; the count should be three.

${Array.from({length: 3}, test)}`
)}

function _count(){return(
0
)}

function _test(html,$0,disposal){return(
function test() {
  const span = html`<span>`;
  ++$0.value;
  disposal(span).then(() => --$0.value);
  return span;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("disposal")).define("disposal", ["Inputs"], _disposal);
  main.variable(observer()).define(["md","test"], _3);
  main.define("initial count", _count);
  main.variable(observer("mutable count")).define("mutable count", ["Mutable", "initial count"], (M, _) => new M(_));
  main.variable(observer("count")).define("count", ["mutable count"], _ => _.generator);
  main.variable(observer("test")).define("test", ["html","mutable count","disposal"], _test);
  return main;
}
