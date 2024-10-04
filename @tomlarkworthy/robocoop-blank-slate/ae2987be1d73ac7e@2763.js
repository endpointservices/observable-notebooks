import define1 from "./17c8ce433e1df58e@3253.js";
import define2 from "./e93eab08140b49b2@2835.js";

function _1(md){return(
md`# Roboco-op: Blank Slate <!-- REWRITE THIS LINT TO GIVE YOUR NOTEBOOK A TITLE -->

A minimal [Roboco-op](https://observablehq.com/@tomlarkworthy/robocoop) blackboard to fork. It is highly recommended to copy and paste a few skills picked from [roboco-op skills](https://observablehq.com/@tomlarkworthy/robocoop-skills). This notebook starts with the [basic Observable programming skill](https://observablehq.com/@tomlarkworthy/robocoop-skills#observable_js_skill) and the [RAG extension](https://observablehq.com/@tomlarkworthy/rag-extension), but often you will want to pickup a UI generating skill too.
`
)}

function _2($0){return(
$0
)}

function _3(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _4($0){return(
$0
)}

function _5(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _6($0){return(
$0
)}

function _7(md){return(
md`### AI Settings`
)}

function _8($0){return(
$0
)}

function _9($0){return(
$0
)}

function _10($0){return(
$0
)}

function _11(rag){return(
rag
)}

function _12(md){return(
md`---`
)}

function _15(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["viewof prompt"], _2);
  main.variable(observer()).define(["Inputs","suggestion"], _3);
  main.variable(observer()).define(["viewof suggestion"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["viewof context_viz"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _8);
  main.variable(observer()).define(["viewof api_endpoint"], _9);
  main.variable(observer()).define(["viewof settings"], _10);
  main.variable(observer()).define(["rag"], _11);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("variables", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("ndd", child1);
  main.import("_ndd", child1);
  main.import("instruction", child1);
  main.import("_events", child1);
  main.import("highlight", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  const child2 = runtime.module(define2);
  main.import("extension", "rag", child2);
  main.variable(observer()).define(["background_tasks"], _15);
  return main;
}
