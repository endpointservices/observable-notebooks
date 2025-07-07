import define1 from "./e1c39d41e8e944b0@939.js";
import define2 from "./e3a019069a130d79@6074.js";
import define3 from "./03dda470c56b93ff@8246.js";
import define4 from "./98f34e974bb2e4bc@650.js";

function _title_cell(md){return(
md`# How the Observable Runtime works
## Living documentation`
)}

function _2(md){return(
md`A lot of Observable is open source and MIT/ISC licensed. Additional tools have been built by the community

1st party
- [Observable JS parser](https://github.com/observablehq/parser)
- [Lezer Grammar for Observable JS](https://github.com/observablehq/lezer)
- [Observable Runtime](https://github.com/observablehq/runtime)
- [Standard Library](https://observablehq.com/documentation/misc/standard-library)
- [Inspector](https://github.com/observablehq/inspector)

3rd party
- [Access the runtime](https://observablehq.com/@mootari/access-runtime)
- [The Unofficial Observable Compiler](https://github.com/asg017/unofficial-observablehq-compiler/tree/beta)
- [Userspace Observable compiler and decompiler](https://observablehq.com/@tomlarkworthy/observablejs-toolchain)
- [Notebook Distiller](https://observablehq.com/@tmcw/notebook-distiller)
- [Single File Exporter](https://observablehq.com/@tomlarkworthy/exporter)`
)}

function _cell_map_diagram(mermaid){return(
mermaid`
stateDiagram-v2

observablehq.com --> user
user --> cell: <a href="https#colon;//observablehq.com/@tmcw/codemirror-inside-of-observable">codemirror</a>

user --> FileAttachment: upload
cell --> user: <a href="https#colon;//observablehq.com/blog/bringing-the-typescript-language-server-to-observable">LSP</a>

cell --> user: <a href="https#colon;//github.com/observablehq/lezer">highlight</a>
state ___.static.observableusercontent.com {
cell --> variable: <a href="https#colon;//github.com/observablehq/parser">parse</a> + compile
variable --> cell:  <a href="observablejs-toolchain">decompile</a>
cell --> module: <a href="https#colon;//github.com/observablehq/runtime?tab=readme-ov-file#moduleimportname-alias-from">import _ from _</a>
variable --> main_module: <a href="https#colon;//github.com/observablehq/runtime?tab=readme-ov-file#modulevariableobserver">define</a>

FileAttachment --> stdlib: <a href="https#colon;//github.com/observablehq/stdlib/blob/main/src/fileAttachment.js"> part of </a>
module --> runtime: <a href="https#colon;//github.com/observablehq/runtime?tab=readme-ov-file#runtimemoduledefine-observer">defines</a>
state static {

  main_module --> runtime
runtime --> main_module: <a href="https#colon;//observablehq.com/@mootari/access-runtime">access-runtime</a>

  stdlib --> runtime
  runtime --> inspector
}
  inspector --> DOM: <a href="https#colon;//github.com/observablehq/inspector">inspect</a>

}

DOM --> observablehq.com: iframe
`
)}

function _4(md){return(
md`## How Observable works

In this section I try to explain the main concepts, surfacing the runtime concepts as live variables you can explore inline.`
)}

function _5(md){return(
md`### the sandbox`
)}

function _6(md){return(
md`The main security mechanism on [observablehq.com](https://Observablehq.com) is to run all user javascript inside a sandboxed iframe. Each user has their own subdomain, so local storage of user code is isolated from one another and from the main webpage. `
)}

function _iframe_location(){return(
document.location
)}

function _8(md){return(
md`A drawback of the sandbox approach is several Web APIs don't work (sharedArrayBuffer, Bluetooth) and default forms submission will redirect the inner page.`
)}

function _9(md){return(
md`### The runtime`
)}

function _10(md){return(
md`At the core is the [Observable runtime](https://github.com/observablehq/runtime), which hot-reloads and schedules recompilation of the dependancy graph. Its the engine of reactivity, implemented in Javascript, executing javascript snippets in units called \`variables\`.`
)}

function _11(md){return(
md`The runtime runs *inside* the sandbox, so we can use [[mootari]()](https://observablehq.com/@mootari)'s hack to get a reference to the runtime from within an Observable notebook. `
)}

function _runtime_reference(toObject,runtime){return(
toObject(runtime)
)}

function _14(md){return(
md`### Variables`
)}

function _15(md){return(
md`The runtime holds a set of variables.`
)}

function _runtime_variables(runtime,toObject){return(
[...runtime._variables].map(toObject)
)}

function _17(md){return(
md`Variables are scoped to a module. All notebooks come with a "builtin" module which is defined by the stdlib`
)}

function _builtin_module_ref(runtime){return(
[...runtime._modules][0][1]
)}

function _builtin_module(toObject,builtin_module_ref){return(
toObject(builtin_module_ref)
)}

function _builtin_variables(toMap,runtime,builtin_module_ref){return(
toMap(
  ...[...runtime._variables].filter((v) => v._module === builtin_module_ref)
)
)}

function _21(md){return(
md`Two variables clash if they are named the same and belong to the same scope. However, when you import a module, you only expose a few variables to another module, so it is possible to have variables of the same name but in different modules.`
)}

function _22(md){return(
md`### Variable Definitions

Variable updates are scheduled when inputs become available. The runtime abstracts over the difference between async and syncronous execution via its scheduler. A variable can emit multiple values per update when defined as a generator.

When definitions are called, the \`this\` value bound to the prior state, allowing cells to reduce over executions i.e. chain state forward.`
)}

function _count_button(Inputs){return(
Inputs.button("count")
)}

function _24(count_button)
{
  count_button;
  return this + 1 || 0; // Add 1 to prior state (this)
}


function _25(md){return(
md`Observable does not enforce any kind of dataflow programming purity. Inputs are passed by reference, so definitions can mutate objects outside of the dataflow paradigm. Furthermore, definitions can reference globals like the window, change the DOM and perform arbitrary side effects outside the dataflow graph.

While functional reactive purist may find this unattractive, being ordinary Javascript functions reduces integration friction when importing existing Javascript libraries.`
)}

function _26(md){return(
md`### Glitch free Observable Reactivity Semantics`
)}

function _27(md){return(
md`Observable builds a dataflow dependancy graph between variables. When a variable is marked dirty, it is scheduled for recomputation next tick, as long as its inputs are not dirty. This batched computation avoids common pitfuls with reactivty such as glitching.`
)}

function _28(mermaid){return(
mermaid`graph TD
A-->D
A-->C
B-->D["D 🕣"]
C-->E
D-->E
`
)}

function _29(md){return(
md`In syncronous reactive systems without batching, an update to \`A\` will chain to C and D and then trigger E twice -- a so called "glitch" which can have unwanted side effects. In Observable, an update to \`A\` automatically marks A, C, D and E as dirty. C recomputes quickly and updates, followed by D and E after the asynchronous process in D completes. Thus E remains in the dirty state until D has completed and updates only once.

If B and A update temporally close together, D still emits a value once, but internally the async computation is ran twice with overlap. E then only updates once.`
)}

function _30(Inputs,$0,Event){return(
Inputs.button("a", {
  reduce: () => $0.dispatchEvent(new Event("input"))
})
)}

function _31(Inputs,$0,Event){return(
Inputs.button("b", {
  reduce: () => $0.dispatchEvent(new Event("input"))
})
)}

function _a(Inputs){return(
Inputs.input(0)
)}

function _b(Inputs){return(
Inputs.input(0)
)}

function _c(a,b)
{
  a, b;
  return this + 1 || 0;
}


async function _d(a,b)
{
  a, b;
  await new Promise((r) => setTimeout(r, 1000));
  return this + 1 || 0;
}


function _e(c,d)
{
  c, d;
  debugger;
  return this + 1 || 0;
}


function _module(thisModule){return(
thisModule()
)}

async function _vars(lookupVariable,module){return(
new Map([
  ["a", await lookupVariable("a", module)],
  ["b", await lookupVariable("b", module)],
  ["c", await lookupVariable("c", module)],
  ["d", await lookupVariable("d", module)],
  ["e", await lookupVariable("e", module)]
])
)}

function _39(md){return(
md`#### Cycles

You can get fake cycles by using a viewof and "posting upstream" programatically to the DAG`
)}

function _cycles(Inputs,$0,Event){return(
Inputs.button("do a cycle", {
  reduce: () => {
    $0.value = 0;
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _cycle(Inputs){return(
Inputs.input()
)}

function _42(cycle){return(
cycle
)}

function _increment($0,cycle,Event)
{
  $0.value = cycle + 1;
  $0.dispatchEvent(new Event("input"));
}


function _44(md){return(
md`#### Glitch Free cycles (with caveats)

If you use programmatic trigger, do we still get glitch free operation? i.e. do simultaneous triggers get merged into a single dataflow sweep? What about double triggers?`
)}

function _45(Inputs,$0,$1,n,Event){return(
Inputs.button("n-multi trigger DAG", {
  reduce: () => {
    $0.value = 0;
    $1.value = 0;
    for (let i = 0; i < n; i++) {
      $0.dispatchEvent(new Event("input"));
      $1.dispatchEvent(new Event("input"));
    }
  }
})
)}

function _n(Inputs){return(
Inputs.range([1, 10], { label: "n", step: 1, value: 1 })
)}

function _left(Inputs){return(
Inputs.input()
)}

function _right(Inputs){return(
Inputs.input()
)}

function _left_right(left,right)
{
  left, right;
  return this + 1 || 0;
}


function _50(md){return(
md`The above experiment shows triggers on seperate dataflow parents are merged in the same update batch (glitch free!). However,  repeated triggers lead to multiple batches up to a max of 2, which is super weird and unexpected.`
)}

function _51(md){return(
md`#### Responsiveness

Observable prioritises user-responsiveness. Dataflow decendants of high frequency streams will miss updates when they exceed the animation frame rate (typically 60fps). Its best to view the Observable dataflow graph as monotonically converging to the latest state rather than a stream processing engine.`
)}

function _52(Inputs,$0,Event){return(
Inputs.button("burst 100", {
  reduce: async () => {
    Array.from({ length: 100 }).reduce(
      (promise) =>
        promise.then(async () => {
          await new Promise((r) => setTimeout(r, 0));
          $0.dispatchEvent(new Event("input"));
        }),
      Promise.resolve()
    );
  }
})
)}

function _burst(Inputs){return(
Inputs.input(0)
)}

function _burst_decendant(burst)
{
  burst;
  return this + 1 || 0;
}


function _55(md){return(
md`### Cells`
)}

function _56(md){return(
md`You program cells in notebooks using ObservableJS. They are compiled to the runtime definitions. There are few major types of cell.
- Javascript cells
   - with some special handling for async, generator subtypes
- viewof, mutables
- Tagged template cells (e.g. markdown, html blocks)
- import statements`
)}

function _57(md){return(
md`#### Cell -> variables`
)}

function _58(md){return(
md`Cells are mapped to one or more runtime variables. A 3rd party tool can group them for a given module. Most cells in this notebook are anonymous cells without names, e.g. markdown blocks.`
)}

function _main_cells(cellMap,main){return(
cellMap(main)
)}

function _60(md){return(
md`Each cell is mapped to several variables, for instance, a mutable cell has three variables, the initial value, the non-reactive value, and the reactive value. Cells recompute when the *inputs* change.`
)}

function _cell_variables(Inputs,main_cells){return(
Inputs.select(main_cells, {
  label: "select a cell to expand"
})
)}

function _cell_variables_table(Inputs,cell_variables,toObject){return(
Inputs.table(cell_variables.map(toObject), {
  columns: ["_name", "_inputs", "_definition"],
  format: {
    _definition: (d) =>
      Inputs.textarea({ value: d.toString(), disabled: true }),
    _inputs: (d) => d.map((i) => i._name)
  },
  width: {
    _definition: "50%"
  }
})
)}

function _63(md){return(
md`The definition of a variable is the code that is executes when it recomputes. The arguments to that function are the dependancies that need to be computed first. A cell specifies its dependencies in the inputs array.`
)}

function _example_mutable(){return(
0
)}

function _65(md){return(
md`Each imported variable exposes creates at least one variable to cross between modules.
\`\`\`js
import {a, b, c as d} from "@..."
\`\`\`

Importing viewofs and mutables are a bit more complex because both the container and the data channels are imported even if you only import one of them. \`with\` syntax is even more complicated as a seperate runtime is spawned.`
)}

function _66(md){return(
md`#### Parsing`
)}

function _67(md){return(
md`The first stage of transforming ObserrvableJS source code to the runtime variable representation is parsing. The [observablehq/parser](https://github.com/observablehq/parser) does this. Its a wrapper around [acorn](https://github.com/acornjs/acorn). 

As the examples below show, where Observable goes beyond typical javascript is often expressed in the custom top level "cell" AST node. The other thing it does is figure out external references, which is what drives the dependancy resolution.`
)}

function _viewof_ast(parser){return(
parser.parseCell("viewof foo = 'bar'")
)}

function _mutable_ast(parser){return(
parser.parseCell("mutable foo = 'bar'")
)}

function _async_ast(parser){return(
parser.parseCell("foo = { await ''}")
)}

function _generator_ast(parser){return(
parser.parseCell("foo = { yield 'async'}")
)}

function _fileattachment_ast(parser){return(
parser.parseCell("foo = FileAttachment('filepath')")
)}

function _viewof_ref_ast(parser){return(
parser.parseCell("foo = viewof bar")
)}

function _import_ast(parser){return(
parser.parseCell("import {foo} from 'blah'")
)}

function _75(Inputs,viewof_ast,mutable_ast,async_ast,generator_ast,fileattachment_ast,viewof_ref_ast,import_ast){return(
Inputs.table(
  [
    Object.assign(viewof_ast, { name: "viewof_ast" }),
    Object.assign(mutable_ast, { name: "mutable_ast" }),
    Object.assign(async_ast, { name: "async_ast" }),
    Object.assign(generator_ast, { name: "generator_ast" }),
    Object.assign(fileattachment_ast, { name: "fileattachment_ast" }),
    Object.assign(viewof_ref_ast, { name: "viewof_ref_ast" }),
    Object.assign(import_ast, { name: "import_ast" })
  ],
  {
    columns: [
      "name",
      "id",
      "async",
      "generator",
      "references",
      "fileAttachments"
    ],
    width: {
      async: "10%",
      generator: "10%"
    },
    format: {
      id: (id) => JSON.stringify(id),
      references: (r) => JSON.stringify(r),
      fileAttachments: (r) => [...r.keys()]
    }
  }
)
)}

function _76(md){return(
md`### Compiling`
)}

function _77(md){return(
md`The Observable compiler is not open source. However, there is the community [unofficial-observablehq-compiler](https://github.com/asg017/unofficial-observablehq-compiler/tree/beta) and the [userspace decompiler/compiler](https://observablehq.com/@tomlarkworthy/observablejs-toolchain).`
)}

function _compiled_variables(compile){return(
compile("mutable example = 12")
)}

function _80(md){return(
md`## Running your own runtime`
)}

function _81(md){return(
md`To execute a notebook outside of [observablehq.com](https://observablehq.com) you need to instantiate a runtime (this is what the [notebook export feature](https://observablehq.com/documentation/embeds/advanced) does). First grab import the runtime from npm:`
)}

function _observable(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

function _embedded_runtime(observable){return(
new observable.Runtime()
)}

function _84(md){return(
md`Create a main module`
)}

function _embedded_main(embedded_runtime){return(
embedded_runtime.module()
)}

function _86(md){return(
md`Create and define variables, we will use the definitions that we compiled earlier`
)}

function _embedded_variables(compiled_variables,embedded_main,toFunction){return(
compiled_variables.map((v) =>
  embedded_main
    .variable({})
    .define(v._name, v._inputs, toFunction(v._definition))
)
)}

function _toFunction(){return(
(definition) => {
  let _fn;
  eval(`_fn = ${definition}`);
  return _fn;
}
)}

function _89(md){return(
md`The runtime will just run automatically, but as the variables are asyncronously processed, it can take a little while before we can observe the value directly in \`_value', so we can observe the promise instead.`
)}

async function _90(embedded_variables)
{
  await new Promise((r) => setTimeout(r, 1000));
  return embedded_variables[0]._promise;
}


function _91(md){return(
md`### Value change notification with Observers`
)}

function _92(md){return(
md`When a variable is setup, you can set a callback for value changes. Supply functions for handling for \`pending\`, \`fulfilled\` and \`rejected\` ([observers](https://github.com/observablehq/runtime?tab=readme-ov-file#observers) docs). Here we create a variable on a timer and send it result to a Generator function.`
)}

function _93(Generators,embedded_main){return(
Generators.observe((notify) => {
  // Generator.observe is a notebook userspace concept to make emitting values simpler
  embedded_main
    .variable({
      fulfilled: (value) => {
        // Observer.fulfilled
        notify(value); // pipe the variable notification up to userspace
      }
    })
    .define(async function* () {
      // zero input async generator
      // this is pure JS, normally the output a compile step
      // is used here
      let i = 0;
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        yield i++;
      }
    });
})
)}

function _94(md){return(
md`### Rendering values with Inspector`
)}

function _95(md){return(
md`To display cell values reactively on a _webpage_, the values need to be converted to DOM and kept up to date reactively. Observable provides the \`Inspector\` for this purpose, which implements the Observer interface `
)}

function _cell_out(md){return(
md`<div></div> <!-- DOM container we will pipe changes to -->`
)}

function _inspector(observable,cell_out){return(
new observable.Inspector(cell_out)
)}

function _98(Generators,embedded_main,inspector){return(
Generators.observe((notify) => {
  // Generator.observe is a notebook userspace concept to make emitting values simpler
  embedded_main.variable(inspector).define(async function* () {
    // zero input async generator
    // this is pure JS, normally the output a compile step
    // is used here
    let i = 0;
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield i++;
    }
  });
})
)}

function _99(md){return(
md`The Observer used in notebooks is not the same as the distributed Inspector, there is interesting metadata in the notebook's version. You can get a reference to it via the variable \`_observer\` reference. You can discover the type of cell by looking at the mode.`
)}

function _notebook_observer(main){return(
main._scope.get("title_cell")._observer
)}

function _101(notebook_observer){return(
notebook_observer.mode
)}

function _102(md){return(
md`Furthermore, you can relate the variable to the rendered DOM node in the notebook`
)}

function _103(main){return(
main._scope.get("title_cell")._observer._node.innerHTML
)}

function _104(md){return(
md`## File Attachments

FileAttachments are stored in a Map. The key is the name, the value is either 
1. a string of a URL
2. an object \`{mimeType, url}\`

A FileAttachment builtin is registered with a module with \`runtime.fileAttachments\`, this wraps the Map.`
)}

function _105(md){return(
md`## URLs

Observablehq.com extensively uses native web features like links.


| type | url |
|---|---|
| module (I) | \`<BASE_URL>/@tomlarkworthy/exporter\` | 
| module (II) | \`<BASE_URL>/d/936eb1bc1db1ac62\` | 
| cell (I) | \`<BASE_URL>/@tomlarkworthy/exporter#parser\`| 
| cell (II) | \`<BASE_URL>/d/936eb1bc1db1ac62#foo\`

Its worth keeping in mind several links might resolve to the same notebook. If the URL is changed the old name continues to resolve, and every notebook has an id which means the id based URL form always works as well.
`
)}

function _106(md){return(
md`---`
)}

function _107(exporter){return(
exporter()
)}

function _toMap(){return(
(...objects) =>
  Object.fromEntries(
    [...objects].map((v) => [
      v._name,
      Object.fromEntries(Object.getOwnPropertyNames(v).map((k) => [k, v[k]]))
    ])
  )
)}

function _toObject(){return(
(v) =>
  Object.fromEntries(Object.getOwnPropertyNames(v).map((k) => [k, v[k]]))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title_cell")).define("title_cell", ["md"], _title_cell);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("cell_map_diagram")).define("cell_map_diagram", ["mermaid"], _cell_map_diagram);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("iframe_location")).define("iframe_location", _iframe_location);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("main", child1);
  main.variable(observer("runtime_reference")).define("runtime_reference", ["toObject","runtime"], _runtime_reference);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("runtime_variables")).define("runtime_variables", ["runtime","toObject"], _runtime_variables);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("builtin_module_ref")).define("builtin_module_ref", ["runtime"], _builtin_module_ref);
  main.variable(observer("builtin_module")).define("builtin_module", ["toObject","builtin_module_ref"], _builtin_module);
  main.variable(observer("builtin_variables")).define("builtin_variables", ["toMap","runtime","builtin_module_ref"], _builtin_variables);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof count_button")).define("viewof count_button", ["Inputs"], _count_button);
  main.variable(observer("count_button")).define("count_button", ["Generators", "viewof count_button"], (G, _) => G.input(_));
  main.variable(observer()).define(["count_button"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["mermaid"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["Inputs","viewof a","Event"], _30);
  main.variable(observer()).define(["Inputs","viewof b","Event"], _31);
  main.variable(observer("viewof a")).define("viewof a", ["Inputs"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["Inputs"], _b);
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer("c")).define("c", ["a","b"], _c);
  main.variable(observer("d")).define("d", ["a","b"], _d);
  main.variable(observer("e")).define("e", ["c","d"], _e);
  main.variable(observer("viewof module")).define("viewof module", ["thisModule"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  main.variable(observer("vars")).define("vars", ["lookupVariable","module"], _vars);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("cycles")).define("cycles", ["Inputs","viewof cycle","Event"], _cycles);
  main.variable(observer("viewof cycle")).define("viewof cycle", ["Inputs"], _cycle);
  main.variable(observer("cycle")).define("cycle", ["Generators", "viewof cycle"], (G, _) => G.input(_));
  main.variable(observer()).define(["cycle"], _42);
  main.variable(observer("increment")).define("increment", ["viewof cycle","cycle","Event"], _increment);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["Inputs","viewof left","viewof right","n","Event"], _45);
  main.variable(observer("viewof n")).define("viewof n", ["Inputs"], _n);
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer("viewof left")).define("viewof left", ["Inputs"], _left);
  main.variable(observer("left")).define("left", ["Generators", "viewof left"], (G, _) => G.input(_));
  main.variable(observer("viewof right")).define("viewof right", ["Inputs"], _right);
  main.variable(observer("right")).define("right", ["Generators", "viewof right"], (G, _) => G.input(_));
  main.variable(observer("left_right")).define("left_right", ["left","right"], _left_right);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["Inputs","viewof burst","Event"], _52);
  main.variable(observer("viewof burst")).define("viewof burst", ["Inputs"], _burst);
  main.variable(observer("burst")).define("burst", ["Generators", "viewof burst"], (G, _) => G.input(_));
  main.variable(observer("burst_decendant")).define("burst_decendant", ["burst"], _burst_decendant);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("main_cells")).define("main_cells", ["cellMap","main"], _main_cells);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("viewof cell_variables")).define("viewof cell_variables", ["Inputs","main_cells"], _cell_variables);
  main.variable(observer("cell_variables")).define("cell_variables", ["Generators", "viewof cell_variables"], (G, _) => G.input(_));
  main.variable(observer("cell_variables_table")).define("cell_variables_table", ["Inputs","cell_variables","toObject"], _cell_variables_table);
  main.variable(observer()).define(["md"], _63);
  main.define("initial example_mutable", _example_mutable);
  main.variable(observer("mutable example_mutable")).define("mutable example_mutable", ["Mutable", "initial example_mutable"], (M, _) => new M(_));
  main.variable(observer("example_mutable")).define("example_mutable", ["mutable example_mutable"], _ => _.generator);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("viewof_ast")).define("viewof_ast", ["parser"], _viewof_ast);
  main.variable(observer("mutable_ast")).define("mutable_ast", ["parser"], _mutable_ast);
  main.variable(observer("async_ast")).define("async_ast", ["parser"], _async_ast);
  main.variable(observer("generator_ast")).define("generator_ast", ["parser"], _generator_ast);
  main.variable(observer("fileattachment_ast")).define("fileattachment_ast", ["parser"], _fileattachment_ast);
  main.variable(observer("viewof_ref_ast")).define("viewof_ref_ast", ["parser"], _viewof_ref_ast);
  main.variable(observer("import_ast")).define("import_ast", ["parser"], _import_ast);
  main.variable(observer()).define(["Inputs","viewof_ast","mutable_ast","async_ast","generator_ast","fileattachment_ast","viewof_ref_ast","import_ast"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer()).define(["md"], _77);
  const child2 = runtime.module(define2);
  main.import("compile", child2);
  main.variable(observer("compiled_variables")).define("compiled_variables", ["compile"], _compiled_variables);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer("observable")).define("observable", _observable);
  main.variable(observer("embedded_runtime")).define("embedded_runtime", ["observable"], _embedded_runtime);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("embedded_main")).define("embedded_main", ["embedded_runtime"], _embedded_main);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer("embedded_variables")).define("embedded_variables", ["compiled_variables","embedded_main","toFunction"], _embedded_variables);
  main.variable(observer("toFunction")).define("toFunction", _toFunction);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer()).define(["embedded_variables"], _90);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer()).define(["Generators","embedded_main"], _93);
  main.variable(observer()).define(["md"], _94);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer("cell_out")).define("cell_out", ["md"], _cell_out);
  main.variable(observer("inspector")).define("inspector", ["observable","cell_out"], _inspector);
  main.variable(observer()).define(["Generators","embedded_main","inspector"], _98);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("notebook_observer")).define("notebook_observer", ["main"], _notebook_observer);
  main.variable(observer()).define(["notebook_observer"], _101);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer()).define(["main"], _103);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer()).define(["exporter"], _107);
  main.variable(observer("toMap")).define("toMap", _toMap);
  main.variable(observer("toObject")).define("toObject", _toObject);
  const child3 = runtime.module(define3);
  main.import("exporter", child3);
  main.import("cellMap", child3);
  main.import("parser", child3);
  const child4 = runtime.module(define4);
  main.import("thisModule", child4);
  main.import("lookupVariable", child4);
  return main;
}
