import define1 from "./f92778131fd76559@1212.js";
import define2 from "./17c8ce433e1df58e@3595.js";

async function _1(FileAttachment,md){return(
md`${await FileAttachment("DALL·E 2023-11-18 17.33.23 - A human and a robot, arm in arm, standing in front of a magnificent neon-lit tech tree. The scene conveys a sense of partnership and contemplation, as.png").image({style: "float: right; padding: 10px; width: 300px"})}


# Roboco-op Skills

Copy and paste skills into a [roboco-op](https://observablehq.com/@tomlarkworthy/robocoop) notebook to level-up your LLM, start a new notebook from a [blank slate](https://observablehq.com/@tomlarkworthy/robocoop-blank-slate)

`
)}

function _observable_js_skill(html,md){return(
{
  prompt: "Explain the Observablehq programming model",
  time: 1700163368139
} &&
  html`<h2>Observable Programming Skill</h2>
<details>
  ${md`
The JavaScript dialect used in Observable notebooks is almost—but not entirely—vanilla. This is intentional: by building on the native language of the web, Observable is familiar. And you can use the libraries you know and love, such as D3, Lodash, and Apache Arrow. Yet for dataflow, Observable needed to change JavaScript in a few ways.

> **Note**  
> Observable JavaScript is used in notebooks only. Observable Framework uses vanilla JavaScript.

Here's a quick overview of what's different from vanilla.

## Cells are Separate Scripts

Each cell in a notebook is a separate script that runs independently. A syntax error in one cell won't prevent other cells from running.

~~~javascript
// Example of a syntax error in a cell
This is English, not JavaScript.
~~~

~~~javascript
// Example of a valid cell assignment
myCell = "some string"
~~~

~~~javascript
// Example of a runtime error in a cell
{ throw new Error("oopsie"); }
~~~

Even if one cell has a syntax or runtime error, it does not affect the execution of other cells.

Local variables are only visible to the cell that defines them. For example:

~~~javascript
// Defining a local variable in one cell
{ const local = "I am a local variable."; }
~~~
  
~~~javascript
// Attempting to use the local variable in another cell
local // not defined
~~~

The second cell above will cause a runtime error because \`local\` is not defined in that cell's scope.

## Cells Run in Topological Order

In vanilla JavaScript, code runs from top to bottom. Not so here; Observable runs like a spreadsheet, so you can define your cells in whatever order makes sense.

~~~javascript
// Using a variable defined in a later cell
a + 2 // a is defined below
~~~

~~~javascript
// Defining the variable 'a'
a = 1
~~~

You can define cells in any order you like. Here, \`a\` is successfully used as a variable in the cell before it is defined. However, circular definitions are not allowed:

~~~javascript
// Circular reference causing an error
c1 = c2 - 1
c2 = c1 + 1
~~~

Both \`c1\` and \`c2\` will throw a runtime error due to circular definition.

## Cells Re-run When Any Referenced Cell Changes

You don't have to run cells explicitly when you edit or interact—the notebook updates automatically. If a cell allocates resources that won't be automatically cleaned up by the garbage collector, such as an animation loop or event listener, use the \`invalidation\` promise to dispose of these resources manually and avoid leaks.

~~~javascript
// Using the invalidation promise for cleanup
{ invalidation.then(() => console.log("I was invalidated.")); }
~~~

## Cells Implicitly Await Promises

Cells can contain promises, and referencing cells will implicitly wait for these promises to resolve before running:

~~~javascript
// Defining a cell with a promise
hello = new Promise(resolve => {
  setTimeout(() => {
    resolve("hello there");
  }, 30000);
})
~~~

Referencing cells will wait for \`hello\` to resolve before they execute.

## Cells Implicitly Iterate Over Generators

If a cell yields, any referencing cell will see the most recently yielded value.

~~~javascript
// Using a generator with yield statements
c = {
  yield 1;
  yield 2;
  yield 3;
}
~~~

~~~javascript
// Referencing the generator cell
c
~~~

Referencing \`c\` will return the most recently yielded value, which in this example would be \`3\`.

## Named Cells are Declarations, Not Assignments

Named cells look like, and function almost like, assignment expressions in vanilla JavaScript. But cells can be defined in any order, so think of them as hoisted function declarations.

~~~javascript
// Trying to reassign a cell's value
foo = 2
{ foo = 3 } // SyntaxError: Assignment to constant variable foo
~~~

Cell names must also be unique, and you cannot reassign the value of another cell without using \`mutable\` variables.

## Statements Need Curly Braces, and Return or Yield

A cell body can be a simple expression, such as a number or string literal, or a function call. But for statements like loops, you'll need curly braces and a \`return\` statement to give the cell a value.

~~~javascript
// Using a block statement with a return
{
  let sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += i;
  }
  return sum;
}
// Output: 45
~~~

## Object Literals Need Parentheses or Return

Wrap object literals in parentheses or use a block statement with a \`return\` to ensure they are interpreted correctly.

~~~javascript
// Correctly defining object literals
object = ({ foo: "bar" })

block = { return { foo: "bar" }; }
~~~

Without parentheses or \`return\`, the cell would interpret the object literal incorrectly, leading to undefined behavior.

~~~javascript
// Incorrectly defining an object literal
label = { foo: "bar" }
// Output: undefined
~~~

## Cells Can Be Views

Observable has a special \`viewof\` operator which lets you define interactive values. A view is a cell with two faces: its user interface, and its programmatic value.

~~~javascript
// Using viewof to create an interactive text input
viewof text = html\`<input value="edit me">\`

// Accessing the value of 'text'
text
// Output: "edit me"
~~~

## Cells Can Be Mutables

Observable provides the \`mutable\` operator so you can opt into mutable state:

~~~javascript
// Defining and using a mutable variable
mutable thing = 0

// Mutating the value of \'thing\'
++mutable thing
// Output: 1
~~~

## Observable Has a Standard Library

Observable provides a small standard library for essential features, such as a reactive width and Inputs.

## Cells Can Be Imported from Other Notebooks

You can import any named cell from any Obserable notebooks, with syntax similar to static ES imports.

~~~javascript
// Importing the 'ramp' function from another notebook
import { ramp } from "@mbostock/ramp"

// Using the imported 'ramp' function
ramp(d3.interpolateBrBG)
~~~

## Static ES Imports Are Not Supported; Use Dynamic Imports

You cannot use normal static ES imports. To use the vanilla JS ecosystem, dynamically import modules from\`esm.sh\` or \`skypack\`.

~~~javascript
// Dynamically importing lodash
_ = import("https://cdn.skypack.dev/lodash-es@4")

// Using lodash function
_.camelCase("lodash was here")
// Output: "lodashWasHere"
~~~

This completes the overview of Observable's programming model, including specific behaviors and differences from standard JavaScript, emphasizing interactivity, reactivity, and cell independence.
`}
</details>
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

function _observable_ui_skill(Inputs,md){return(
{
  prompt:
    "Document example cells of Observable Inputs as UI components but hide them rendering",
  time: 1700262095526
} &&
  Inputs.form({
    myText: Inputs.text({
      label: "Text Input",
      placeholder: "Enter some text",
      value: "hi!"
    }),
    myTextarea: Inputs.textarea({
      label: "Textarea Input",
      rows: 3,
      placeholder: "Enter multiple lines of text"
    }),
    myRange: Inputs.range([0, 100], {
      label: "Range Input",
      step: 1,
      value: 50
    }),
    mySelect: Inputs.select(
      new Map([
        ["Short", 8],
        ["Tall", 12],
        ["Grande", 16],
        ["Venti", 20]
      ]),
      {
        value: 12,
        label: "Size",
        format: ([name, value]) => name + " " + value + "oz"
      }
    ),
    myRadio: Inputs.radio(["Option A", "Option B", "Option C"], {
      label: "Radio Input"
    }),
    myButton: Inputs.button("Click Me", {
      title: "Button Input"
    }),
    mySearch: Inputs.search(["Item 1", "Item 2", "Item 3"], {
      placeholder: "Search here"
    }),
    myTable: Inputs.table(
      [
        { column1: "Row 1", column2: "Data 1" },
        { column1: "Row 2", column2: "Data 2" }
      ],
      { label: "Table Input" }
    ),
    myFile: Inputs.file({ label: "File Input" }),
    myColor: Inputs.color({
      label: "Color Input",
      value: "#ff0000"
    }),
    myDate: Inputs.date({ label: "Date Input" }),
    myObjectForm: Inputs.form({
      r: Inputs.range([0, 255], { step: 1, label: "r" }),
      g: Inputs.range([0, 255], { step: 1, label: "g" }),
      b: Inputs.range([0, 255], { step: 1, label: "b" })
    }),
    myArrayForm: Inputs.form([
      Inputs.range([0, 255], { step: 1, label: "r" }),
      Inputs.range([0, 255], { step: 1, label: "g" }),
      Inputs.range([0, 255], { step: 1, label: "b" })
    ])
  }) &&
  md`## Observable Inputs UI Skill
UI components in notebooks
`
)}

function _bindableUISkill(view,md,Inputs,htl,Event){return(
{
  prompt:
    "Demonstrate how to use the bidirection bindable UI composer, the view literal",
  time: 1700263368139,
  comment: "Binding inputs, composing within HTML and accessing via a viewof"
} &&
  view`<div class="skill">

  ${md`
  ## Styled View UI Skill
  ~~~js
  import {view} from '@tomlarkworthy/view' // required notebook import for bindable UI
  ~~~
  The view literal can compose bidirectional HTML UIs, whose value can be written to and the UI will visually update. They can decorated views with HTML.
  `}
  <details><summary>example</summary>
    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Text Input</h3>
      <!-- Note a 2 element array bind the 2nd arg to the parent under the field name of the first arg -->
      ${[
        "textInput",
        Inputs.text({ placeholder: "Type something...", value: "Hello World!" })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Select Input</h3>
      ${[
        "selectInput",
        Inputs.select(["Option 1", "Option 2", "Option 3"], {
          value: "Option 2",
          label: "Choose an option"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Input Arrays</h3>
      <!-- Note a 3 element array bind the 2nd array to the parent under the field name of the first arg, and uses the 3rd arg as a builder when the underlying data array expands-->
      ${[
        "array",
        Array.from({ length: 3 }, (_, i) =>
          Inputs.text({ placeholder: `Input ${i + 1}` })
        ),
        (value) => Inputs.text({ value: value })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px;">
      <h3>Button Action</h3>
      <div style="display: flex; justify-content: flex-start;">
      <!-- the Inputs.button has a lot of formatting which breaks flexbox -->
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) => {
          const container = evt.target.closest(".skill");
          container.value.array.push(5); // manipulating the data array will trigger the UI builder
          container.dispatchEvent(new Event("input"));
        }}>add`
      ]}
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) =>
          evt.target.closest(".skill").value.array.pop()}>remove`
      ]}
      </div>
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Radio Input</h3>
      ${[
        "radioInput",
        Inputs.radio(["Choice A", "Choice B", "Choice C"], {
          value: "Choice B",
          label: "Pick one"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Checkbox Input</h3>
      ${[
        "checkboxInput",
        Inputs.checkbox(["Check 1", "Check 2"], {
          values: ["Check 1"],
          label: "Select checks"
        })
      ]}
    </div>

</details>
  </div>`
)}

function _7(md){return(
md`---`
)}

function _8($0){return(
$0
)}

function _10(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _11($0){return(
$0
)}

function _12(md){return(
md`## Current Chat context`
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`tick the cells to include in the next prompt`
)}

function _15($0){return(
$0
)}

function _16(feedback_prompt){return(
feedback_prompt
)}

function _17(md){return(
md`### AI Settings`
)}

function _18($0){return(
$0
)}

function _19($0){return(
$0
)}

function _20($0){return(
$0
)}

function _21(md){return(
md`---`
)}

function _workers(update_context,on_prompt,api_call_response)
{
  update_context;
  on_prompt;
  return api_call_response;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["DALL·E 2023-11-18 17.33.23 - A human and a robot, arm in arm, standing in front of a magnificent neon-lit tech tree. The scene conveys a sense of partnership and contemplation, as.png", {url: new URL("./files/7937434e7ffba2538979e250764442e70c5763920c108ee19dae9c6843e2e5c55b65443266ff1ee2aef112f6f286cc08992ad889f08250caee4c017616102362.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer("markdown_skill")).define("markdown_skill", ["md","mermaid","htl","tex"], _markdown_skill);
  main.variable(observer("viewof observable_ui_skill")).define("viewof observable_ui_skill", ["Inputs","md"], _observable_ui_skill);
  main.variable(observer("observable_ui_skill")).define("observable_ui_skill", ["Generators", "viewof observable_ui_skill"], (G, _) => G.input(_));
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["viewof prompt"], _8);
  main.variable(observer()).define(["Inputs","suggestion"], _10);
  main.variable(observer()).define(["viewof suggestion"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof context_viz"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _15);
  main.variable(observer()).define(["feedback_prompt"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _18);
  main.variable(observer()).define(["viewof api_endpoint"], _19);
  main.variable(observer()).define(["viewof settings"], _20);
  main.variable(observer()).define(["md"], _21);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("api_call_response", child2);
  main.import("viewof reset", child2);
  main.import("reset", child2);
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
  main.import("feedback_prompt", child2);
  main.import("viewof feedback_cells_selector", child2);
  main.import("feedback_cells_selector", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer("workers")).define("workers", ["update_context","on_prompt","api_call_response"], _workers);
  return main;
}
