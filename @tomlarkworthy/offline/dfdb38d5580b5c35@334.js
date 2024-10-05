import define1 from "./293899bef371e135@271.js";

function _1(md){return(
md`# Tom Services Footer

~~~js
import {footer} from "@tomlarkworthy/footer"
~~~
`
)}

function _2($0){return(
$0
)}

function _4(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["viewof backups"], _2);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.import("viewof backups", child1);
  main.import("backups", child1);
  main.variable(observer()).define(["footer"], _4);
  return main;
}
