// https://observablehq.com/@observablehq/inspector@94
function _1(md){return(
md`# Observable Inspector

This notebook provides an *inspect* function that you can use in a notebook to inspect JavaScript values. To import into your notebook:

~~~js
import {inspect} from "@observablehq/inspector"
~~~`
)}

function _2(md,inspect){return(
md`For example, this is my object:

${inspect({hello: ["world"]})}

There are many like it, but this one is mine.`
)}

function _3(md){return(
md`The [Observable Inspector](https://github.com/observablehq/inspector) is open-source and provided as part of the [Observable Runtime](https://github.com/observablehq/runtime), which you can use to run Observable notebooks anywhere on the web. The Observable Inspector is used implicitly when a cell returns an arbitrary JavaScript value (*i.e.*, something other than a DOM element) into a DOM element that you can look at, prod, and poke.`
)}

function _4(){return(
{hello: ["world"]}
)}

function _5(inspect){return(
inspect({hello: ["world"]})
)}

function _6(md){return(
md`---

## Implementation`
)}

function _inspect(Inspector){return(
function inspect(value) {
  const root = document.createElement("DIV");
  new Inspector(root).fulfilled(value);
  const element = root.firstChild;
  element.remove();
  element.value = value; // for viewof
  return element;
}
)}

async function _Inspector(){return(
(await import("https://cdn.skypack.dev/@observablehq/inspector@3")).Inspector
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md","inspect"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(_4);
  main.variable(observer()).define(["inspect"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("inspect")).define("inspect", ["Inspector"], _inspect);
  main.variable(observer("Inspector")).define("Inspector", _Inspector);
  return main;
}
