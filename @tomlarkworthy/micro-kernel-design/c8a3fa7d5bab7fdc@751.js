import define1 from "./5c408e8ef210709e@472.js";
import define2 from "./98f34e974bb2e4bc@650.js";
import define3 from "./0b75dbddd18995dc@1761.js";
import define4 from "./e3a019069a130d79@6074.js";

function _1(md){return(
md`# The μ-kernel architecture for extensible live and mallable programming substrates`
)}

function _2(md){return(
md`Big ideas

- Client-side, no network dependancy, browser based
- No external managed source code, the runtime is the source of truth
- Reflective Reactive Dynamic Dataflow kernel
- The rest of programming system in userspace in live collaborating modules.`
)}

function _3(md){return(
md`
Delivering "easy to use" and "easy-to-change" software for all cannot be achieved in a single step. While research has highlighted the value of reactive and malleable software systems for usability; delivering complete programming system exceeds the capacity of most research projects that can only practically explore one angle at a time. Instead, we suggest reducing live programming to a small reactive substrate on which decoupled live programming systems can be layered upon in userspace. Such a μ-kernel would need to supply minimal functionality to enable:  1. live code updates, 2. reactive communication and 3. capability discovery between malleable modules that are implemented in userspace.

We identify the Observable Runtime as an MIT licenced, battle tested and independently developed off-the-self kernel that meets the needs for malleable programming. Although the Observbale Notebook Interface, the hosted product, is not mallable and therefore not a suitable base for live research, we show, through a prototype named Lopecode, that it is possible to make an replacement UX to the Observable Runtime, written entirely in userspace, that significantly exceeds the expressivity of the hosted Observable Notebook product.

Lopecode is a collection of reactive userspace modules that are capable of: 1. serialising the live system to a single HTML file. 2. live editing the systems own code reactively. 3. Providing a mutable datastore 4. Supporting an autonomous LLM coding agent. The Observable Runtime μ-kernel provides runtime reflection, a late-binding dataflow graph, and module loading. With those foundations, we show that a live programming system can be modularised in userspace and developed incrementally from within.
`
)}

function _4(md){return(
md`## Desirable Properties for an extensible Live Programming System 

Here is a somewhat arbitrary list of desirable properties we think a live programming system should have.
- Reactive live code updates
- Literate programming
- Data viz.
- Polyglot languages
- Multiple views of the same things
- No network dependancy
- No external toolchain
- Easy to distribute and run

The goal of the μ-kernel architecture is *not* to implement those properties! Rather, its to provide a foundation that can make working toward that list fun and incremental. We identify several foundational building blocks that the μ-kernel should supply

- Reactive low level code updates, so you can develop a future system from within the current system
- Reactive values, so all systems reflect the current program state instantly.
- meta-programming, so development services can abstract over the systems generically.
- module loading, for bootstrapping and decoupling of services

Although the list of requirements for a μ-kernel is short, all of those properties are notoriously difficult to develop individually. Fortunately the Observable Runtime is open source commercially developed library that supplies those features. We will explain how that works in detail shortly, and then afterwards show how we can realize the desirable other properties in userspace with Lopecode `
)}

function _5(md){return(
md`## The Observable Runtime Data Model

An executing Observable runtime is fairly simple. The root reference is a Runtime object. There are fixed functions called builtins which can be defined on runtime construction (for example d3) and additionally during module loading (for example module scoped \`FileAttachments\`) for module scoped builtins.

Reactivity is provided through variables which are named and can reference others variables as dependancies. Variables values are computed by calling their \`_definition\` function when their inputs change. The definition is a function or generator whose arguments are passed from the variables inputs.
\`\`\`
Runtime
 ├─ Builtins* (functions)
 └─ Module*   (namespace)
      ├─ Builtins*  (functions)
      └─ Variable*  (node)
           ├─ _name?       (string)
           ├─ _inputs     → downward edges
           └─ _definition  (function/generator)
\`\`\`

Groups of variables are contained within a module. When variables are created, input dependancies are specified by name. This means anonymous variables -- those without a name -- cannot be inputs of other variables. 

Variable inter-dependancies are late-bound together, so variables participating in dataflow can be instantiated in any order`
)}

function _6(md){return(
md`### Variable Definitions

Variable updates are scheduled when inputs become available. The runtime abstracts over the difference between async and syncronous execution via its scheduler. A variable can emit multiple values per update when defined as a generator.

When definitions are called, the \`this\` value bound to the prior state, allowing cells to reduce over executions i.e. chain state forward.`
)}

function _count_button(Inputs){return(
Inputs.button("count")
)}

function _8(count_button)
{
  count_button;
  return this + 1 || 0; // Add 1 to prior state (this)
}


function _9(md){return(
md`Observable does not enforce any kind of dataflow programming purity. Inputs are passed by reference, so definitions can mutate objects outside of the dataflow paradigm. Furthermore, definitions can reference globals like the window, change the DOM and perform arbitrary side effects outside the dataflow graph.

While functional reactive purist may find this unattractive, being ordinary Javascript functions reduces integration friction when importing existing Javascript libraries.`
)}

function _10(md){return(
md`### Glitch free Observable Reactivity Semantics`
)}

function _11(md){return(
md`Observable builds a dataflow dependancy graph between variables. When a variable is marked dirty, it is scheduled for recomputation next tick, as long as its inputs are not dirty. This batched computation avoids common pitfuls with reactivty such as glitching.`
)}

function _12(mermaid){return(
mermaid`graph TD
A-->D
A-->C
B-->D["D 🕣"]
C-->E
D-->E
`
)}

function _13(md){return(
md`In syncronous reactive systems without batching, an update to \`A\` will chain to C and D and then trigger E twice -- a so called "glitch" which can have unwanted side effects. In Observable, an update to \`A\` automatically marks A, C, D and E as dirty. C recomputes quickly and updates, followed by D and E after the asynchronous process in D completes. Thus E remains in the dirty state until D has completed and updates only once.

If B and A update temporally close together, D still emits a value once, but internally the async computation is ran twice with overlap. E then only updates once.`
)}

function _14(Inputs,$0,Event){return(
Inputs.button("a", {
  reduce: () => $0.dispatchEvent(new Event("input"))
})
)}

function _15(Inputs,$0,Event){return(
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
  return this + 1 || 0;
}


function _21(md){return(
md`#### Responsiveness

Observable prioritises user-responsiveness. Dataflow decendants of high frequency streams will miss updates when they exceed the animation frame rate (typically 60fps). Its best to view the Observable dataflow graph as monotonically converging to the latest state rather than a stream processing engine.`
)}

function _22(Inputs,$0,Event){return(
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


function _25(md){return(
md`### Reachability and Visibility

The runtime reduces its computation load by only computing variables that are reachable and visible. Reachable variables are those that are either in the foreground, or that are dataflow ascendants of foreground variables. A common situation when variables are not reachable is when they are anonymous cells in a dependancy. There is no point computing them because their effects cannot be seen.

The runtime sheds further load by also only rendering foreground variables that are visible on the page (or ascendants of visible variables). This optimisation allows computational resources to scale sub-linearly with graph size, but can be a source of confusion when interacting with the runtime graph programatically. `
)}

function _26(md){return(
md`## The Observable Notebook Programming Model
TODO
`
)}

function _27(md){return(
md`### Cells

When interactive with an Observable notebook the user does not observer the variables directly. Rather, access to runtime is mediated through cells, which are programming interface abstractions. There are several cell types and each maps to one or more runtime variables `
)}

function _28(md){return(
md`### Compilation from OJS to variables definitions

A compiler translates from Observable Javascript (OJS) to the Observable Runtime Representation. Unfortunately that toolchain is not open source but the [Observable/parser](https://github.com/observablehq/parser) is.
`
)}

function _29(md){return(
md`### Additional tooling

code search, code editor

### Sandboxing

iframe`
)}

function _30(md){return(
md`Observable programming model enforces a seperation between userspace code, and system provided code

There is no native ability to generate code, limiting expressivity. 

There is no programatic way to write data.

The limitations exist as a consequence of how the closed source Observable programming model is layered over the open source runtime. The underlying runtime itself is an advanced reactivity engine with many useful features for live programming, however, the programming model hudes access to the runtime and has no native meta-programming ability required to create development tools. `
)}

function _31(md){return(
md`# Building a μ-kernel architecture around the Observable Runtime


It is our opinion that the Observable Runtime contains enough expressivity to over-come the limitations surfaced in the Observable Notebook Interface, and that it is beneficial to reuse this library as it has solved a number of hard problems needed to create live and mallable systemes. 

In this section we will outline some of the parts of our prototype live programming system that is ecosystem compatible with Observable, but has additional features enabling meta-programming, self-hosting and self-serialization. Note that the aim of the paper is not to document the current state of the Lopecode system, instead, it is to demonstrate that this was possible without modification to the off-the-shelf μ-kernel. `
)}

function _32(md){return(
md`### Visualizer

The thing you see in a web notebook is a graphical projection of an underlying state. In order to see the running program something must render a visual representation of it, the raw values in the program state have no inherent graphical representation. Our userspace visualizer attempts to match the presentation style of Observable, so as to feel familiar, but, because its implemented in userspace, we would could visualize program state however we wish.

To implement visualization we needed to observe variable state changes. In a userspace implementation the visualizer is instanciated within the runtime and needs to observe variables that may have been setup earlier. Observable Runtime has an existing observation mechanism, but it is part of runtime setup before any variables are created. To observe from userspace we monkeypatch the existing variable's observer with out own observer, so we were able to get this to work without disrupting existing observers driving the Observable Notebook visualization.

And so this represents our first addition of a meta-programming facility, a programatic lookup of variables outside of dataflow, and registering a listener for state change events.`
)}

function _value(Inputs){return(
Inputs.range()
)}

function _34($0,htl,observe,lookupVariable,module,invalidation)
{
  $0; // ensure this cell executes after the variable is setup
  const ui = htl.html`<div>`;
  // meta-programming
  observe(
    lookupVariable("value", module),
    {
      fulfilled: (val) => (ui.innerHTML = `the value is ${val}`)
    },
    { invalidation }
  );
  return ui;
}


function _35(md){return(
md`Furthermore, cell visualization have to be added and removed as the cells change in the runtime. To enable this we monkeypatched the variable Set collection in the runtime to receive instant updates on membership changes`
)}

function _36(md){return(
md`### Reactive Debugger

Developing reactive programs can be tricky. We developed a tool to help us visualize state transitions over the entire notebook in a timeline, which can help trace causality. This is essentially a different projection of the program state enabled by our new meta-programming expressivity and an example of a userspace moldable tool. It is a clear example of viewing the same thing a different way.`
)}

function _37(_ndd){return(
_ndd
)}

function _38(md){return(
md`### Editor

To reprogram the internal dataflow you need to redefine variables which is a 1st party function in the Observale runtime. However, it expects the low level Javascript runtime representation, not the high OJS representation, and it also requires the input arguments specified. In addition to writing cells, an editor needs to read the current source to present to the user at the start of an edit session.

Obtaining the low level source code is simple in Javascript as you can \`toString\` the \`_definition\`. To obtain the high level representation we decompiled. Then to reversing the process after modification was compilation followed by a 1st party call to the runtime. The runtime will then recompute all cells impacted by the change reactively.
`
)}

function _secret()
{
  // Can you get this source code from the runtime?
  return 45;
}


function _secret_variable(lookupVariable,module){return(
lookupVariable("secret", module)
)}

function _low_level(secret_variable){return(
secret_variable._definition.toString()
)}

function _ojs_level(decompile,secret_variable){return(
decompile([secret_variable])
)}

function _43(md){return(
md`
Note there is no repository of source code in Lopecode. Source code is decompiled from the runtime on demand when needed. This is an interesting consequence of the principle that the μ-kernel is the source of truth; a secondary code representation would undermine that goal. It provides opportunities for alternative languages, as ObservableJS has no special status in the system and could be changed.

The [decompiler/compiler](https://observablehq.com/@tomlarkworthy/observablejs-toolchain) pair was developed together using an LLM driven by a test suite of examples, and leveraged the open source Observable/Parser, acorn and escodegen.`
)}

function _44(md){return(
md`### Exporter


TODO: Self serialization
`
)}

function _45(md){return(
md`### Mutable File attachments`
)}

function _46(md){return(
md`## Userspace Services

- Exporter
- Editor
- Visualizer
- Debugger
- LLM Agent

## Complex Applications

- Sequencer`
)}

function _47(md){return(
md`### References

- HYTRADBOI 2025
- Technical Dimensions of Programming Systems (Joel)
- Live Primer (https://live-workshop.github.io/primer/)
- Horowitz, J., & Heer, J. (2023). Live, Rich, and Composable: Qualities for Programming Beyond Static Text. Plateau Workshop. https://doi.org/10.1184/R1/22277338.V1
- Malleable Software: Restoring User Agency in a World of Locked-Down Apps • 2025
- Glitches in reactive programming (https://en.wikipedia.org/wiki/Reactive_programming#Glitches)
- D³ Data-Driven Documents https://ieeexplore.ieee.org/abstract/document/6064996
- https://tomlarkworthy.github.io/lopecode/notebooks/@tomlarkworthy_lopecode-vision.html#view=S100%28%40tomlarkworthy%2Flopecode-vision%2C%40tomlarkworthy%2Fmodule-selection%29
- The interplay of SARS-CoV-2 evolution and constraints imposed by the structure and functionality of its proteins - https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009147
- Software Architecture Patterns by Mark Richards 2002

- Mirrors Object orientated (relective capability) https://dl.acm.org/doi/pdf/10.1145/1035292.1029004

- FLOSS move, targetted intervension to make something usable, postmodern

- https://en.wikipedia.org/wiki/Linda_(coordination_language)
- Coordination Language`
)}

function _49(md){return(
md`---

Notes`
)}

function _50(md){return(
md`### Abstract (draft)

- Reactive kernal with everything in userspace
- Runtime, not source code, as the source-of-truth
- Add meta programming to Observable
- Add writable storage`
)}

function _51(md){return(
md`### Shower Thoughts

Live: Illustration, dry explaination, reusable core behind it.

We will not discuss in detail the prototype

Programming conference.

Clienside removes node

microkernal architecture allows live, reactive updates to the entire system

Multiplicity of programming interfaces, the Observable commercial one, the lopecode one.

In "Live, Rich, and Composable: Qualities for Programming Beyond Static Text" Observable is critiqued for not allowing visualizations to store state, we fix that with storage

Observable programming model. Runtime, modules, cells, variables, file attachments.

Building on a solid base
Observable kernel does not suffer from glitches.
Observable has been testing in production extensively.
Observable prioritizes user responsiveness over serializability(?). Skipping updates if behind => monotonic convergence. Not computing all cells in the graph if not in the forefront. Furthermore not updating cells that are not on the page.
Permissive license, developed in the open.
Written by luminary

Runtime as the source of truth enabling polyglot language support.
In a live system, runtime, not the source code, should be the source of truth. => we need reflectivity

Ecosystem compatability. Javascript/npm, Observable itself.


Plain text serialisation format for git freindly diffing and async. Useful during low level debugging.

Reactive execution helps with debugging

Multplitiy of visual representaitons of program state: debugger


Offline support

Immortal Software

Literate programming - divide and conquer. bundled technical documentation


Malleability by design: Microkernels isolate responsibilities into minimal, composable units. This enables live reloading, introspection, and recomposition of system behavior without global restarts, crucial for live systems.

Reactivity as substrate: Embedding reactive dataflow at the core (not as a library) makes live code change native system feature. 

Modifiability with stability: Users can safely experiment in userland without destabilizing the system

Composability over frameworks

List of tests https://github.com/preactjs/signals/blob/main/packages/core/test/signal.test.tsx#L1654

https://www.usenix.org/system/files/conference/tapp2018/tapp2018-paper-petricek.pdf

https://github.com/tpetricek/denicek-paper/blob/master/paper.pdf`
)}

function _52(md){return(
md`# The μ-kernel reactive substrate architecture

Remove the seperation between user code and system code.

Focus on iteration speed and expressivity:
- Code changes are reflected immediately.
- Programming system should be editable too (mallable) => the programming system is implemented in userspace
- support grouping of similar functionality (modularity) for divide-and-conquor and development scalability
    - all reusable abstractions

Our hypothesis is that live programming in userspace leads to a more mallable programming experience

Seperation of runtime from a front end language provides a `
)}

function _module(thisModule){return(
thisModule()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof count_button")).define("viewof count_button", ["Inputs"], _count_button);
  main.variable(observer("count_button")).define("count_button", ["Generators", "viewof count_button"], (G, _) => G.input(_));
  main.variable(observer()).define(["count_button"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["mermaid"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Inputs","viewof a","Event"], _14);
  main.variable(observer()).define(["Inputs","viewof b","Event"], _15);
  main.variable(observer("viewof a")).define("viewof a", ["Inputs"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer("viewof b")).define("viewof b", ["Inputs"], _b);
  main.variable(observer("b")).define("b", ["Generators", "viewof b"], (G, _) => G.input(_));
  main.variable(observer("c")).define("c", ["a","b"], _c);
  main.variable(observer("d")).define("d", ["a","b"], _d);
  main.variable(observer("e")).define("e", ["c","d"], _e);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["Inputs","viewof burst","Event"], _22);
  main.variable(observer("viewof burst")).define("viewof burst", ["Inputs"], _burst);
  main.variable(observer("burst")).define("burst", ["Generators", "viewof burst"], (G, _) => G.input(_));
  main.variable(observer("burst_decendant")).define("burst_decendant", ["burst"], _burst_decendant);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof value")).define("viewof value", ["Inputs"], _value);
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof value","htl","observe","lookupVariable","module","invalidation"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["_ndd"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("secret")).define("secret", _secret);
  main.variable(observer("secret_variable")).define("secret_variable", ["lookupVariable","module"], _secret_variable);
  main.variable(observer("low_level")).define("low_level", ["secret_variable"], _low_level);
  main.variable(observer("ojs_level")).define("ojs_level", ["decompile","secret_variable"], _ojs_level);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  const child1 = runtime.module(define1);
  main.import("References", child1);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  const child2 = runtime.module(define2);
  main.import("observe", child2);
  main.import("lookupVariable", child2);
  main.import("thisModule", child2);
  main.variable(observer("viewof module")).define("viewof module", ["thisModule"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("_ndd", child3);
  const child4 = runtime.module(define4);
  main.import("decompile", child4);
  return main;
}
