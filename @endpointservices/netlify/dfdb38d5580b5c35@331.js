import define1 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Tom Services Footer

~~~js
import {footer} from "@tomlarkworthy/footer"
~~~
`
)}

function _3(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _3);
  return main;
}
