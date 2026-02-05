import define1 from "./17c8ce433e1df58e@3595.js";
import define2 from "./c7a3b20cec5d4dd9@732.js";

function _1(md){return(
md`# Test Driven Development Template

We feed a TAP report into the LLM and let it choose between
1. fixing the test setup
2. fixing test implementations
3. fixing the code based on test feedback.
`
)}

function _suite(createSuite){return(
createSuite({
  name: "Test Suite"
})
)}

function _test_runner(cases,suite,expect){return(
{
  prompt: "Write a declarative testing interface",
  time: 1726339624075
} &&
  Object.entries(cases).forEach(([name, params]) => {
    suite.test(name, () => {
      if (params.expected) {
        expect(params.functionToTest(...params.args)).toEqual(params.expected);
      } else if (params.error) {
        expect(() => params.functionToTest(...params.args)).toThrow(
          params.error
        );
      } else {
        throw new Error("Unrecognized test pattern");
      }
    });
  })
)}

function _4(highlight,test_results){return(
highlight(test_results)
)}

function _cases(invertList){return(
{ prompt: "Add some more cases", time: 1726340743875 } && {
  "test setup test": {
    args: [[]],
    expected: [],
    functionToTest: invertList
  },
  "test paramter validation": {
    args: [{}],
    error: new Error("required array"),
    functionToTest: invertList
  }
}
)}

function _invertList(){return(
{
  prompt: "write an invertList function that passes the tests",
  time: 1726333709633
} &&
  function invertList(arr) {
    if (!Array.isArray(arr)) throw new Error("required array");
    return arr.slice().reverse();
  }
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
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _11($0){return(
$0
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

function _18(md){return(
md`---`
)}

function _21(ask){return(
ask
)}

function _22(api_call_response){return(
api_call_response
)}

function _results(suite){return(
suite.viewofResults
)}

function _test_results(results,report,suite){return(
results && report(suite)
)}

function _25(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer("test_runner")).define("test_runner", ["cases","suite","expect"], _test_runner);
  main.variable(observer()).define(["highlight","test_results"], _4);
  main.variable(observer("cases")).define("cases", ["invertList"], _cases);
  main.variable(observer("invertList")).define("invertList", _invertList);
  main.variable(observer()).define(["viewof prompt"], _7);
  main.variable(observer()).define(["Inputs","suggestion"], _8);
  main.variable(observer()).define(["viewof suggestion"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["viewof context_viz"], _11);
  main.variable(observer()).define(["viewof reset"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _14);
  main.variable(observer()).define(["viewof api_endpoint"], _15);
  main.variable(observer()).define(["viewof settings"], _16);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer()).define(["md"], _18);
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
  main.import("instruction", child1);
  main.import("_events", child1);
  main.import("highlight", child1);
  main.import("viewof reset", child1);
  main.import("reset", child1);
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
  main.import("createSuite", child2);
  main.import("report", child2);
  main.import("expect", child2);
  main.variable(observer()).define(["ask"], _21);
  main.variable(observer()).define(["api_call_response"], _22);
  main.variable(observer("viewof results")).define("viewof results", ["suite"], _results);
  main.variable(observer("results")).define("results", ["Generators", "viewof results"], (G, _) => G.input(_));
  main.variable(observer("test_results")).define("test_results", ["results","report","suite"], _test_results);
  main.variable(observer()).define(["background_tasks"], _25);
  return main;
}
