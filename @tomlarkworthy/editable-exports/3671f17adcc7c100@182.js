import define1 from "./03dda470c56b93ff@8246.js";
import define2 from "./ee79b1fa5101d6d9@3211.js";

function _title(md){return(
md`# 👋 Editor with Exporter

`
)}

function _2($0){return(
$0
)}

function _3(context_menu){return(
context_menu
)}

function _exporter_cell(exporter){return(
exporter()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer()).define(["viewof editor"], _2);
  main.variable(observer()).define(["context_menu"], _3);
  main.variable(observer("exporter_cell")).define("exporter_cell", ["exporter"], _exporter_cell);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  const child2 = runtime.module(define2);
  main.import("viewof editor", child2);
  main.import("editor", child2);
  main.import("context_menu", child2);
  return main;
}
