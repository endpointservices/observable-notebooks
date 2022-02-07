// https://observablehq.com/@observablehq/inspector@91
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Observable Inspector

This notebook provides an *inspect* function that you can use in a notebook to inspect JavaScript values. To import into your notebook:

~~~js
import {inspect} from "@observablehq/inspector"
~~~`
)});
  main.variable(observer()).define(["md","inspect"], function(md,inspect){return(
md`For example, this is my object:

${inspect({hello: ["world"]})}

There are many like it, but this one is mine.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The [Observable Inspector](https://github.com/observablehq/inspector) is open-source and provided as part of the [Observable Runtime](https://github.com/observablehq/runtime), which you can use to run Observable notebooks anywhere on the web. The Observable Inspector is used implicitly when a cell returns an arbitrary JavaScript value (*i.e.*, something other than a DOM element) into a DOM element that you can look at, prod, and poke.`
)});
  main.variable(observer()).define(function(){return(
{hello: ["world"]}
)});
  main.variable(observer()).define(["inspect"], function(inspect){return(
inspect({hello: ["world"]})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Implementation`
)});
  main.variable(observer("inspect")).define("inspect", ["Inspector"], function(Inspector){return(
function inspect(value) {
  const root = document.createElement("DIV");
  new Inspector(root).fulfilled(value);
  const element = root.firstChild;
  element.remove();
  element.value = value; // for viewof
  return element;
}
)});
  main.variable(observer("Inspector")).define("Inspector", ["require"], async function(require){return(
(await require("@observablehq/inspector@3.2.2/dist/inspector.js")).Inspector
)});
  return main;
}
