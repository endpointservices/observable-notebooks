import define1 from "./03dda470c56b93ff@8246.js";

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
