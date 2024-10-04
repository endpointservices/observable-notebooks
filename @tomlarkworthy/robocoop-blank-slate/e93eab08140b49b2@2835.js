import define1 from "./d76c2180ae7b30c9@4433.js";
import define2 from "./17c8ce433e1df58e@3253.js";

function _1(md){return(
md`# RAG Extension for Roboco-op

This extension reads the user question to retrieve examples from a knowledge base.

~~~js
import {extension} from "@tomlarkworthy/rag-extension"
~~~
`
)}

function _extension(rag_context){return(
{
  robocoop: {
    onContext: async ({ question, context }) => {
      const examples = await rag_context(question, { n: 4 });
      context.push({
        role: "user",
        content: examples
      });
    }
  }
}
)}

function _3(rag_context){return(
rag_context("draw a plot", { n: 4 })
)}

function _rag_context(load_indexes,formatResults,vector_search){return(
load_indexes &&
  (async (question, options) => formatResults(await vector_search(question, options)))
)}

function _formatResults(observableDefinitionToCode){return(
(results) => `
General Examples
================

${results
  .map(
    (result, i) => `assistant:
upsert_cell({
  cell_name: "example_${i}",
  code: \`${observableDefinitionToCode(result.code)}\`
})`
  )
  .join("\n\n")}

`
)}

function _6(load_indexes){return(
load_indexes
)}

function _8($0){return(
$0
)}

function _9(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _10($0){return(
$0
)}

function _11(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _12($0){return(
$0
)}

function _13(md){return(
md`### AI Settings`
)}

function _14($0){return(
$0
)}

function _15($0){return(
$0
)}

function _16($0){return(
$0
)}

function _17(md){return(
md`---`
)}

function _19(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("extension")).define("extension", ["rag_context"], _extension);
  main.variable(observer()).define(["rag_context"], _3);
  main.variable(observer("rag_context")).define("rag_context", ["load_indexes","formatResults","vector_search"], _rag_context);
  main.variable(observer("formatResults")).define("formatResults", ["observableDefinitionToCode"], _formatResults);
  main.variable(observer()).define(["load_indexes"], _6);
  const child1 = runtime.module(define1);
  main.import("vector_search", child1);
  main.import("load_indexes", child1);
  main.variable(observer()).define(["viewof prompt"], _8);
  main.variable(observer()).define(["Inputs","suggestion"], _9);
  main.variable(observer()).define(["viewof suggestion"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["viewof context_viz"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _14);
  main.variable(observer()).define(["viewof api_endpoint"], _15);
  main.variable(observer()).define(["viewof settings"], _16);
  main.variable(observer()).define(["md"], _17);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("variables", child2);
  main.import("api_call_response", child2);
  main.import("background_tasks", child2);
  main.import("ndd", child2);
  main.import("_ndd", child2);
  main.import("instruction", child2);
  main.import("_events", child2);
  main.import("highlight", child2);
  main.import("observableDefinitionToCode", child2);
  main.import("mutable context", child2);
  main.import("context", child2);
  main.import("viewof prompt", child2);
  main.import("prompt", child2);
  main.import("viewof suggestion", child2);
  main.import("suggestion", child2);
  main.import("viewof settings", child2);
  main.import("settings", child2);
  main.import("viewof OPENAI_API_KEY", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("viewof api_endpoint", child2);
  main.import("api_endpoint", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer()).define(["background_tasks"], _19);
  return main;
}
