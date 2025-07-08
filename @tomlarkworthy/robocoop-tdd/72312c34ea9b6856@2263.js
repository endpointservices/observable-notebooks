import define1 from "./c7a3b20cec5d4dd9@730.js";
import define2 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# Test-Driven Development
`
)}

function _markdown_skill(md,mermaid,htl,tex){return(
{
  prompt: "Write a markdown skill cell",
  time: 1699719020249,
  comment: "Complex markdown skill cell"
} &&
  md`
## Markdown Skill
This demonstrates advanced usage of markdown \`md\` literal

<details><summary>example</summary>
${md`## Mermaid Diagram
${mermaid`
graph TB;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
`}

## Live JavaScript Execution
${(function () {
  const span = htl.html`<span>`;
  let count = 0;
  span.textContent = count;
  setInterval(() => {
    count++;
    span.textContent = count;
  }, 1000);
  return span;
})()}

## KaTeX
The quadratic formula is ${tex`x = {-b \pm \sqrt{b^2-4ac} \over 2a}`}

${tex`
\begin{aligned}
  (a+b)^2 &= (a+b)(a+b) \\
  &= a^2 + 2ab + b^2
\end{aligned}
`}

## Details/Summary
<details>
  <summary>Expandable content</summary>
  ${md`
  - Item 1
  - Item 2
  - Item 3
  `}
</details>

## HTML Figure
<figure>
  <a href="https://www.reddit.com/r/robocoop/" target="_blank">
    <img src="https://avatars.githubusercontent.com/endpointservices" alt="Endpoint Services" width="100" height="100">
  </a>
  <figcaption>Figure: Endpoint Services. Click to visit the Roboco-op subreddit.</figcaption>
</figure>

## Blocks
\`Backticks\` need to be escaped, it is easier to use ~ instead
~~~js
  () => throw Error()
~~~
`}
</details>
`
)}

function _suite(createSuite){return(
{
  prompt: "create a test suite called suite",
  time: 1702899872368
} && createSuite()
)}

function _test_twoPlusTwo(suite,expect){return(
{
  prompt: "Add a test for 2 + 2 = 4",
  time: 1702900160674,
  comment: "Adding a test to check if 2 + 2 equals 4"
} &&
  suite.test("2 plus 2 equals 4", () => {
    expect(2 + 2).toBe(4);
  })
)}

function _6(expect){return(
expect
)}

function _7(suite){return(
suite.results
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
md`## Current Chat context`
)}

function _12($0){return(
$0
)}

function _13(md){return(
md`tick the cells to include in the next prompt`
)}

function _14($0){return(
$0
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
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer("test_twoPlusTwo")).define("test_twoPlusTwo", ["suite","expect"], _test_twoPlusTwo);
  main.variable(observer()).define(["expect"], _6);
  main.variable(observer()).define(["suite"], _7);
  main.variable(observer()).define(["viewof prompt"], _8);
  main.variable(observer()).define(["Inputs","suggestion"], _9);
  main.variable(observer()).define(["viewof suggestion"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["viewof context_viz"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _14);
  main.variable(observer()).define(["viewof feedback_prompt"], _15);
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
  main.import("api_call_response", child2);
  main.import("background_tasks", child2);
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
  main.import("viewof feedback_prompt", child2);
  main.import("feedback_prompt", child2);
  main.import("viewof feedback_cells_selector", child2);
  main.import("feedback_cells_selector", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer()).define(["background_tasks"], _22);
  return main;
}
