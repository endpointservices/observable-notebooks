import define1 from "./d76c2180ae7b30c9@4434.js";
import define2 from "./17c8ce433e1df58e@3332.js";

function _1(md){return(
md`# RAG Extension for Roboco-op

This extension reads the user question to locate relvant examples from a knowledge base. Invoke the extension function in a roboco-op notebook to install it. Uses a prepared index built with [@tomlarkworthy/notebook-rag](https://observablehq.com/@tomlarkworthy/notebook-rag)

~~~js
import {extension} from "@tomlarkworthy/rag-extension"
~~~

TODO:
- We should save the _inputs and (maybe) the _name in the code index, then we can decompile more effectively
`
)}

function _question(Inputs){return(
Inputs.textarea({ label: "question" })
)}

function _example_results(vector_search,question){return(
vector_search(question)
)}

function _4(formatResults,example_results)
{
  debugger;
  return formatResults(example_results, { n: 2 });
}


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

function _6(rag_context){return(
rag_context("draw a plot", { n: 4 })
)}

function _rag_context(load_indexes,formatResults,vector_search){return(
load_indexes &&
  (async (question, options) => formatResults(await vector_search(question, options)))
)}

function _formatResults(decompile){return(
async (results) => `
General Examples
================

${(
  await Promise.all(
    results.map(
      async (result, i) => `assistant:
upsert_cell({
  cell_name: "example_${i}",
  code: \`${await decompile([
    {
      _inputs: [],
      _name: undefined,
      _definition: result.code
    }
  ])}\`
})`
    )
  )
).join("\n\n")}

`
)}

function _9(load_indexes){return(
load_indexes
)}

function _11($0){return(
$0
)}

function _12(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _15($0){return(
$0
)}

function _16(md){return(
md`### AI Settings`
)}

function _17($0){return(
$0
)}

function _18($0){return(
$0
)}

function _19($0){return(
$0
)}

function _20(md){return(
md`---`
)}

function _22(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof question")).define("viewof question", ["Inputs"], _question);
  main.variable(observer("question")).define("question", ["Generators", "viewof question"], (G, _) => G.input(_));
  main.variable(observer("example_results")).define("example_results", ["vector_search","question"], _example_results);
  main.variable(observer()).define(["formatResults","example_results"], _4);
  main.variable(observer("extension")).define("extension", ["rag_context"], _extension);
  main.variable(observer()).define(["rag_context"], _6);
  main.variable(observer("rag_context")).define("rag_context", ["load_indexes","formatResults","vector_search"], _rag_context);
  main.variable(observer("formatResults")).define("formatResults", ["decompile"], _formatResults);
  main.variable(observer()).define(["load_indexes"], _9);
  const child1 = runtime.module(define1);
  main.import("vector_search", child1);
  main.import("load_indexes", child1);
  main.variable(observer()).define(["viewof prompt"], _11);
  main.variable(observer()).define(["Inputs","suggestion"], _12);
  main.variable(observer()).define(["viewof suggestion"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["viewof context_viz"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _17);
  main.variable(observer()).define(["viewof api_endpoint"], _18);
  main.variable(observer()).define(["viewof settings"], _19);
  main.variable(observer()).define(["md"], _20);
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
  main.import("decompile", child2);
  main.import("compile", child2);
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
  main.variable(observer()).define(["background_tasks"], _22);
  return main;
}
