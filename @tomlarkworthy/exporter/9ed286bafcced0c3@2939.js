import define1 from "./17c8ce433e1df58e@3318.js";

function _1(md){return(
md`# \`highlight()\` values to [roboco-op](https://observablehq.com/d/9ed286bafcced0c3?collection=@tomlarkworthy/robocoop)

Adds a runtime value to the LLM context programatically, closing a feedback loop.

TODO: in the future this might be an entrance point for image prompting`
)}

function _2(highlight,example){return(
highlight(example)
)}

function _example(highlight){return(
{
  number: 42,
  obj: {
    str: "cool"
  },
  fn: highlight
}
)}

function _highlight(html,md,customJsonFormatter){return(
{
  prompt:
    'I would like the existing highlight function to define multiple properties, on is "value" which is already done, and a new one "robocoop" which will return ({type: "highlight", value: <REF TO VALUE>}). Do it in a single call to defineProperties',
  time: 1726209709876
} &&
  ((value, { max_length = 1000 } = {}) =>
    Object.defineProperties(
      html`<details>
<summary><mark>highlight</mark></summary>
${md`
~~~javascript
${customJsonFormatter(value, { max_length })}
~~~`}
</details>`,
      {
        value: {
          get: () => value
        },
        robocoop: {
          get: () => ({
            type: "json",
            value: customJsonFormatter(value, { max_length })
          })
        }
      }
    ))
)}

function _customJsonFormatter(){return(
{
  prompt: "Custom JSON formatter that serializes functions and Error objects",
  time: 1726300000000
} &&
  function customJsonFormatter(value, { max_length = 250, indent = 0 } = {}) {
    const INDENT_SPACE = " ".repeat(indent);
    const jsonString = JSON.stringify(
      value,
      (key, val) => {
        if (typeof val === "function") {
          return val.toString();
        }
        if (val instanceof Error) {
          return `Error(\"${val.message}\")`;
        }
        return val;
      },
      2
    );
    // Truncate if too long
    if (jsonString.length > max_length) {
      return jsonString.slice(0, max_length) + "...";
    }

    return jsonString;
  }
)}

function _6(md,customJsonFormatter){return(
md`
~~~javascript
${customJsonFormatter({
  name: "Example",
  age: 30,
  error: new Error("dam"),
  greet: function () {
    console.log("Hello!");
  },
  nested: {
    arr: [1, "two", () => {}, { key: "value" }]
  }
})}
~~~`
)}

function _7($0){return(
$0
)}

function _8(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _9($0){return(
$0
)}

function _10(md){return(
md`## Current Chat context`
)}

function _11($0){return(
$0
)}

function _12(md){return(
md`tick the cells to include in the next prompt`
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
  main.variable(observer()).define(["highlight","example"], _2);
  main.variable(observer("example")).define("example", ["highlight"], _example);
  main.variable(observer("highlight")).define("highlight", ["html","md","customJsonFormatter"], _highlight);
  main.variable(observer("customJsonFormatter")).define("customJsonFormatter", _customJsonFormatter);
  main.variable(observer()).define(["md","customJsonFormatter"], _6);
  main.variable(observer()).define(["viewof prompt"], _7);
  main.variable(observer()).define(["Inputs","suggestion"], _8);
  main.variable(observer()).define(["viewof suggestion"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["viewof context_viz"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _14);
  main.variable(observer()).define(["viewof api_endpoint"], _15);
  main.variable(observer()).define(["viewof settings"], _16);
  main.variable(observer()).define(["md"], _17);
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
  main.import("_events", child1);
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
  main.variable(observer()).define(["background_tasks"], _19);
  return main;
}
