import define1 from "./10c7899865f8a76e@8998.js";

function _1(md){return(
md`# Tom Services Footer

~~~js
import {footer} from "@tomlarkworthy/footer"
~~~
`
)}

function _footer(exporter){return(
exporter()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer("footer")).define("footer", ["exporter"], _footer);
  return main;
}
