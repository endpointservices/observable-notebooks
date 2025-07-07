import define1 from "./c087cd984171e13b@2881.js";
import define2 from "./e93eab08140b49b2@2875.js";
import define3 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Roboco-op: Blank Slate <!-- REWRITE THIS LINT TO GIVE YOUR NOTEBOOK A TITLE -->

A minimal [Roboco-op](https://observablehq.com/@tomlarkworthy/robocoop) blackboard to fork. It is highly recommended to copy and paste a few skills picked from [roboco-op skills](https://observablehq.com/@tomlarkworthy/robocoop-skills). This notebook starts with the [basic Observable programming skill](https://observablehq.com/@tomlarkworthy/robocoop-skills#observable_js_skill) and the [RAG extension](https://observablehq.com/@tomlarkworthy/rag-extension), but often you will want to pickup a UI generating skill too.
`
)}

function _4(observable_js_skill){return(
observable_js_skill
)}

function _5($0){return(
$0
)}

function _6(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _7($0){return(
$0
)}

function _8(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _9($0){return(
$0
)}

function _10(md){return(
md`### AI Settings`
)}

function _11($0){return(
$0
)}

function _12($0){return(
$0
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`---`
)}

function _background_tasks(rag,_background_tasks){return(
rag && _background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("observable_js_skill", child1);
  const child2 = runtime.module(define2);
  main.import("extension", "rag", child2);
  main.variable(observer()).define(["observable_js_skill"], _4);
  main.variable(observer()).define(["viewof prompt"], _5);
  main.variable(observer()).define(["Inputs","suggestion"], _6);
  main.variable(observer()).define(["viewof suggestion"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["viewof context_viz"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _11);
  main.variable(observer()).define(["viewof api_endpoint"], _12);
  main.variable(observer()).define(["viewof settings"], _13);
  main.variable(observer()).define(["md"], _14);
  const child3 = runtime.module(define3);
  main.import("ask", child3);
  main.import("excludes", child3);
  main.import("cells", child3);
  main.import("on_prompt", child3);
  main.import("variables", child3);
  main.import("api_call_response", child3);
  main.import("background_tasks", "_background_tasks", child3);
  main.import("_ndd", child3);
  main.import("instruction", child3);
  main.import("highlight", child3);
  main.import("mutable context", child3);
  main.import("context", child3);
  main.import("viewof prompt", child3);
  main.import("prompt", child3);
  main.import("viewof suggestion", child3);
  main.import("suggestion", child3);
  main.import("viewof settings", child3);
  main.import("settings", child3);
  main.import("viewof OPENAI_API_KEY", child3);
  main.import("OPENAI_API_KEY", child3);
  main.import("viewof api_endpoint", child3);
  main.import("api_endpoint", child3);
  main.import("viewof context_viz", child3);
  main.import("context_viz", child3);
  main.variable(observer("background_tasks")).define("background_tasks", ["rag","_background_tasks"], _background_tasks);
  return main;
}
