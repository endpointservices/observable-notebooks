import define1 from "./c7a3b20cec5d4dd9@725.js";
import define2 from "./17c8ce433e1df58e@3253.js";

function _1(md){return(
md`# Test Driven Development with AI: Writing a Decompiler

The is an experiment to see if we can get an AI assistant to perform a complex programming task, and produce a well engineered function and test suite of production quality. It uses [\`highlight\`](https://observablehq.com/@tomlarkworthy/highlight) to pass test suite results back into [roboco-op](https://observablehq.com/@tomlarkworthy/robocoop) LLM context, closing a test driven development feedback loop. \`o1-preview\` is used for doing the majority of the code generation. 

I picked reversing the Observable compiler, going from Javascript runtime representation back to source code. I had several reasons for choosing this task

1. Nobody has done this yet (so its a task not in LLM training set)
2. It is quite intricate software engineering work
4. Its has some grey areas, decompilation is lossy, so some judgement is required
5. Its the kind of thing that takes a long time to get right
6. \`gpt-4o\` models can't do it


Conclusion: I am blown away that it has managed to produce such code. Check out [decompileExpression](https://observablehq.com/@tomlarkworthy/ai-written-decompiler#decompileExpression) and [decompile](https://observablehq.com/@tomlarkworthy/ai-written-decompiler#decompile). The notebook started optimizating a single function with only a few test cases, but the AI split it into two functions. I added more test cases as it got better, but the AI was also able to update the test cases.
`
)}

function _2(md){return(
md`### Compilation, source to runtime variable(s)

Observable (the host of this notebook) takes user source code blocks and turns them into reactive code for running in the browser`
)}

function _simple_code(){return(
4 + 2
)}

function _4(md){return(
md`We can peek at the runtime variables and extract the compiled representation`
)}

function _5(variables){return(
variables
)}

function _6(variables){return(
variables["simple_code"]._definition.toString()
)}

function _7(md){return(
md`So for this example the in-browser representation is a function wrapping the arithmetic we keyed in as source code. The comments got stripped in the process. It gets more complex when considering code blocks that depend on other code blocks, mutable variables, and other things, but it looks mostly reversible.`
)}

function _8(variables){return(
variables["dependancy"]._definition.toString()
)}

function _9(variables){return(
variables["mutable mutable_value_example"]._definition.toString()
)}

function _10(variables){return(
variables["mutable_value_example"]._definition.toString()
)}

function _11(variables){return(
variables["initial mutable_value_example"]._definition.toString()
)}

function _12(md){return(
md`The aim of decompilation is to go from the runtime variable definition, back to the source as best as possible. Can AI make headway with this task?! We will use a Test Driven Development approach, using the \`highlight\` keyword to pass the results of the test suite back into the LLM context.`
)}

function _suite(createSuite){return(
createSuite({
  name: "Test Suite"
})
)}

function _results(suite){return(
suite.viewofResults
)}

function _test_results(results,report,suite){return(
results && report(suite)
)}

function _17(md){return(
md`By "highlighting" a value, we pass it back into the LLM context, hence our coding assitent roboco-op will know how successful it is on the test suite`
)}

function _18(highlight,test_results){return(
highlight(test_results)
)}

function _19(md){return(
md`### Test Cases

To build actual test cases we need to first write source code so we can later peek at the runtime representation`
)}

function _findCompiledVariable(variables){return(
(name) => ({
  name: name,
  variable: variables[name],
  compiled: variables[name]._definition.toString(),
  outputs: variables[name]._outputs
})
)}

function _simple_addition(){return(
4 + 2
)}

function _functional_add(){return(
(a, b) => a + b
)}

function _object_literal(){return(
{ a: 1, b: 2 }
)}

function _dependancy(functional_add,simple_addition){return(
functional_add(simple_addition, simple_addition)
)}

function _array_expr(){return(
[1, 2, 3]
)}

function _block()
{
  console.log("block");
}


function* _generator()
{
  yield "foo";
}


function _mutable_undefined_example(){return(
undefined
)}

function _mutable_value_example(){return(
3
)}

function _view_example(Inputs){return(
Inputs.input({})
)}

function _31(md){return(
md`### The declarative test cases`
)}

function _cases(findCompiledVariable){return(
{
  prompt: "Write some test cases for the decompile function",
  time: 1726484727341
} && {
  "test simple addition": {
    args: [findCompiledVariable("simple_addition")],
    expected: "simple_addition = 4 + 2"
  },
  "test function expression": {
    args: [findCompiledVariable("functional_add")],
    expected: "functional_add = (a, b) => a + b"
  },
  "test object literal": {
    args: [findCompiledVariable("object_literal")],
    expected: "object_literal = ({ a: 1, b: 2 })"
  },
  "test array expression": {
    args: [findCompiledVariable("array_expr")],
    expected: "array_expr = [1, 2, 3]"
  },
  "test mutable mutable_value_example": {
    args: [findCompiledVariable("initial mutable_value_example")], // note initial NOT mutable
    expected: "mutable mutable_value_example = 3"
  },
  "test dependancy": {
    args: [findCompiledVariable("dependancy")],
    expected: "dependancy = functional_add(simple_addition, simple_addition)"
  },
  "test block": {
    args: [findCompiledVariable("block")],
    expected: 'block = {\nconsole.log("block");\n}'
  },
  "test generator": {
    args: [findCompiledVariable("generator")],
    expected: 'generator = {\nyield "foo";\n}'
  },
  "test viewof": {
    args: [findCompiledVariable("viewof view_example")],
    expected: "viewof view_example = Inputs.input(({  }))"
  }
}
)}

function _33(cases,suite,expect,functionToTest){return(
{ prompt: "Write a declarative testing interface", time: 1726339624075 } &&
  Object.entries(cases).map(([name, params]) => {
    suite.test(name, async () => {
      if (params.expected) {
        expect(await functionToTest(...params.args)).toEqual(params.expected);
      } else if (params.error) {
        expect(() => functionToTest(...params.args)).toThrow(params.error);
      } else {
        throw new Error("Unrecognized test pattern");
      }
    });
  })
)}

function _acorn(require){return(
require("acorn")
)}

function _functionToTest(decompile){return(
decompile
)}

function _36(md){return(
md`### The Decompiler`
)}

function _decompileExpression(){return(
{
  prompt: "Get the tests to pass.",
  time: 1726514365372
} &&
  function decompileExpression(node) {
    switch (node.type) {
      case "Literal":
        return JSON.stringify(node.value);
      case "Identifier":
        return node.name;
      case "BinaryExpression":
        return `${decompileExpression(node.left)} ${
          node.operator
        } ${decompileExpression(node.right)}`;
      case "ArrowFunctionExpression":
        const params = node.params.map(decompileExpression).join(", ");
        const body =
          node.body.type === "BlockStatement"
            ? decompileExpression(node.body)
            : decompileExpression(node.body);
        return `(${params}) => ${body}`;
      case "ObjectExpression":
        const properties = node.properties
          .map((prop) => {
            const key =
              prop.key.type === "Identifier"
                ? prop.key.name
                : `[${decompileExpression(prop.key)}]`;
            return `${key}: ${decompileExpression(prop.value)}`;
          })
          .join(", ");
        return `({ ${properties} })`;
      case "ArrayExpression":
        const elements = node.elements.map(decompileExpression).join(", ");
        return `[${elements}]`;
      case "ReturnStatement":
        return `return ${decompileExpression(node.argument)};`;
      case "ExpressionStatement":
        return `${decompileExpression(node.expression)};`;
      case "CallExpression":
        const callee = decompileExpression(node.callee);
        const args = node.arguments.map(decompileExpression).join(", ");
        return `${callee}(${args})`;
      case "BlockStatement":
        return `{
${node.body.map(decompileExpression).join("\n")}
}`;
      case "NewExpression":
        const newCallee = decompileExpression(node.callee);
        const newArgs = node.arguments.map(decompileExpression).join(", ");
        return `new ${newCallee}(${newArgs})`;
      case "MemberExpression":
        const object = decompileExpression(node.object);
        const property = node.computed
          ? `[${decompileExpression(node.property)}]`
          : `.${decompileExpression(node.property)}`;
        return `${object}${property}`;
      case "FunctionDeclaration":
        const funcName = node.id.name;
        const funcParams = node.params.map(decompileExpression).join(", ");
        const funcBody = decompileExpression(node.body);
        return `function ${funcName}(${funcParams}) ${funcBody}`;
      case "VariableDeclaration":
        const declarations = node.declarations
          .map(decompileExpression)
          .join(", ");
        return `${node.kind} ${declarations};`;
      case "VariableDeclarator":
        const id = decompileExpression(node.id);
        const init = node.init ? ` = ${decompileExpression(node.init)}` : "";
        return `${id}${init}`;
      case "WhileStatement":
        const test = decompileExpression(node.test);
        const whileBody = decompileExpression(node.body);
        return `while (${test}) ${whileBody}`;
      case "AwaitExpression":
        return `await ${decompileExpression(node.argument)}`;
      case "YieldExpression":
        const delegate = node.delegate ? "*" : "";
        const arg = node.argument ? decompileExpression(node.argument) : "";
        return `yield${delegate} ${arg}`;
      case "AssignmentExpression":
        return `${decompileExpression(node.left)} ${
          node.operator
        } ${decompileExpression(node.right)}`;
      case "UpdateExpression":
        const prefix = node.prefix ? node.operator : "";
        const suffix = !node.prefix ? node.operator : "";
        return `${prefix}${decompileExpression(node.argument)}${suffix}`;
      case "ConditionalExpression":
        return `${decompileExpression(node.test)} ? ${decompileExpression(
          node.consequent
        )} : ${decompileExpression(node.alternate)}`;
      case "LogicalExpression":
        return `${decompileExpression(node.left)} ${
          node.operator
        } ${decompileExpression(node.right)}`;
      case "FunctionExpression":
        const funcExprParams = node.params.map(decompileExpression).join(", ");
        const funcExprBody = decompileExpression(node.body);
        return `function(${funcExprParams}) ${funcExprBody}`;
      case "ForStatement": {
        const init = decompileExpression(node.init);
        const testExpr = decompileExpression(node.test);
        const update = decompileExpression(node.update);
        const bodyStmt = decompileExpression(node.body);
        return `for (${init}; ${testExpr}; ${update}) ${bodyStmt}`;
      }
      case "IfStatement":
        const testCond = decompileExpression(node.test);
        const consequent = decompileExpression(node.consequent);
        const alternate = node.alternate
          ? ` else ${decompileExpression(node.alternate)}`
          : "";
        return `if (${testCond}) ${consequent}${alternate}`;
      default:
        throw new Error(`Unsupported node type: ${node.type}`);
    }
  }
)}

function _decompile(acorn,decompileExpression){return(
{ prompt: "fix tests", time: 1726546383668 } &&
  async function decompile({ name, compiled, outputs }) {
    const wrappedCode = "(" + compiled + ")";
    const parsed = acorn.parse(wrappedCode, {
      ecmaVersion: 2022,
      sourceType: "module"
    });

    const functionExpression = parsed.body[0].expression;
    const body = functionExpression.body;

    name = name || "undefined";
    let prefix = "";

    // Handle mutable variables
    if (name.startsWith("initial ")) {
      prefix = "mutable ";
      name = name.replace(/^initial /, "");
    } else if (name.startsWith("mutable ")) {
      prefix = "mutable ";
      name = name.replace(/^mutable /, "");
    }

    let expression = "";

    if (
      body.type === "BlockStatement" &&
      body.body.length === 1 &&
      body.body[0].type === "ReturnStatement"
    ) {
      // If the body is a single ReturnStatement, decompile its argument
      expression = decompileExpression(body.body[0].argument);
    } else {
      // For other types, decompile the whole body
      expression = decompileExpression(body);
    }

    return `${prefix}${name} = ${expression}`;
  }
)}

async function _39(highlight,decompile,findCompiledVariable){return(
highlight(await decompile(findCompiledVariable("block")))
)}

function _40($0){return(
$0
)}

function _41($0){return(
$0
)}

function _42(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _43($0){return(
$0
)}

function _44(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _45($0){return(
$0
)}

function _46(md){return(
md`### AI Settings`
)}

function _47($0){return(
$0
)}

function _48($0){return(
$0
)}

function _49($0){return(
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

function _51(md){return(
md`---`
)}

function _53(ask){return(
ask
)}

function _54(api_call_response){return(
api_call_response
)}

function _55(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("simple_code")).define("simple_code", _simple_code);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["variables"], _5);
  main.variable(observer()).define(["variables"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["variables"], _8);
  main.variable(observer()).define(["variables"], _9);
  main.variable(observer()).define(["variables"], _10);
  main.variable(observer()).define(["variables"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("report", child1);
  main.import("expect", child1);
  main.variable(observer("viewof results")).define("viewof results", ["suite"], _results);
  main.variable(observer("results")).define("results", ["Generators", "viewof results"], (G, _) => G.input(_));
  main.variable(observer("test_results")).define("test_results", ["results","report","suite"], _test_results);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["highlight","test_results"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("findCompiledVariable")).define("findCompiledVariable", ["variables"], _findCompiledVariable);
  main.variable(observer("simple_addition")).define("simple_addition", _simple_addition);
  main.variable(observer("functional_add")).define("functional_add", _functional_add);
  main.variable(observer("object_literal")).define("object_literal", _object_literal);
  main.variable(observer("dependancy")).define("dependancy", ["functional_add","simple_addition"], _dependancy);
  main.variable(observer("array_expr")).define("array_expr", _array_expr);
  main.variable(observer("block")).define("block", _block);
  main.variable(observer("generator")).define("generator", _generator);
  main.define("initial mutable_undefined_example", _mutable_undefined_example);
  main.variable(observer("mutable mutable_undefined_example")).define("mutable mutable_undefined_example", ["Mutable", "initial mutable_undefined_example"], (M, _) => new M(_));
  main.variable(observer("mutable_undefined_example")).define("mutable_undefined_example", ["mutable mutable_undefined_example"], _ => _.generator);
  main.define("initial mutable_value_example", _mutable_value_example);
  main.variable(observer("mutable mutable_value_example")).define("mutable mutable_value_example", ["Mutable", "initial mutable_value_example"], (M, _) => new M(_));
  main.variable(observer("mutable_value_example")).define("mutable_value_example", ["mutable mutable_value_example"], _ => _.generator);
  main.variable(observer("viewof view_example")).define("viewof view_example", ["Inputs"], _view_example);
  main.variable(observer("view_example")).define("view_example", ["Generators", "viewof view_example"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("cases")).define("cases", ["findCompiledVariable"], _cases);
  main.variable(observer()).define(["cases","suite","expect","functionToTest"], _33);
  main.variable(observer("acorn")).define("acorn", ["require"], _acorn);
  main.variable(observer("functionToTest")).define("functionToTest", ["decompile"], _functionToTest);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("decompileExpression")).define("decompileExpression", _decompileExpression);
  main.variable(observer("decompile")).define("decompile", ["acorn","decompileExpression"], _decompile);
  main.variable(observer()).define(["highlight","decompile","findCompiledVariable"], _39);
  main.variable(observer()).define(["viewof reset"], _40);
  main.variable(observer()).define(["viewof prompt"], _41);
  main.variable(observer()).define(["Inputs","suggestion"], _42);
  main.variable(observer()).define(["viewof suggestion"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["viewof context_viz"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _47);
  main.variable(observer()).define(["viewof api_endpoint"], _48);
  main.variable(observer()).define(["viewof settings"], _49);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer()).define(["md"], _51);
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
  main.import("instruction", child2);
  main.import("_events", child2);
  main.import("highlight", child2);
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
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer()).define(["ask"], _53);
  main.variable(observer()).define(["api_call_response"], _54);
  main.variable(observer()).define(["background_tasks"], _55);
  return main;
}
