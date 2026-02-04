import define1 from "./e627aaaaa9857257@1727.js";
import define2 from "./f6794ed0523241c3@1824.js";
import define3 from "./10c7899865f8a76e@8998.js";
import define4 from "./aec6a9b84ae17c82@64.js";
import define5 from "./8381f40adb144e29@52.js";
import define6 from "./2ff342bf285f0043@458.js";
import define7 from "./db42ae70222a8b08@1170.js";
import define8 from "./de3abeb05c4b090e@765.js";
import define9 from "./a6a56ee61aba9799@409.js";
import define10 from "./a89ea9f0ad8c6226@1486.js";
import define11 from "./98f34e974bb2e4bc@958.js";
import define12 from "./e3a019069a130d79@6817.js";
import define13 from "./f6282eaf525a00db@2418.js";
import define14 from "./09fdee029150048c@446.js";
import define15 from "./0b75dbddd18995dc@1765.js";
import define16 from "./f096db8fcbc444bf@565.js";
import define17 from "./010725e8849f52d0@816.js";

function _1(md){return(
md`# The Lopecode Tour`
)}

function _2(html){return(
html`<a href="https://observablehq.com/@tomlarkworthy/jumpgate?source=https://observablehq.com/d/3a51f9bfe59fc076&export_state=%7B%22hash%22%3A%22%23view%3DR100(S50(%40tomlarkworthy%2Flopecode-tour)%2CC50(S50(%40tomlarkworthy%2Fatlas%2C%40tomlarkworthy%2Fmodule-selection)%2CS50(%40tomlarkworthy%2Frobocoop-3%2C%40tomlarkworthy%2Frobocoop-2)))%22%2C%22headless%22%3Atrue%2C%22title%22%3A%22%40tomlarkworthy%2Flopecode-tour%22%7D&git_url=https%3A%2F%2Fgithub.com%2Ftomlarkworthy%2Flopecode&load_source=true&commit=false&" target="_blank">preview</a>`
)}

function _3(md){return(
md`Lopecode is a huge rethink of how we make documents, code and applications. Did you ever wish documents could be scripted? Did you ever want applications to be adjusted. Lopecode was born out of my frustration that computers have become increasingly difficult to get them to do what I know they are capable of.`
)}

function _4(timeNow,md){return(
md`## Programmable Prose

People read documents on a computer, and they write documents on a computer. Documents should be able to leverage the computer to display information derived from calculation. For example, the time *now* is: 

${timeNow}

Lopecode is reactive, meaning computation is redone if the values change. This is why we are able to embed a *live* value of the time.`
)}

function _ui_prose(htl,md){return(
md`
In Lopecode, you can write in markdown, but reference program data with \`\${<expr>}\`. If \`<expr>\` is a DOM element, it is inserted, enabling interactive controls ${htl.html`<button onclick=${(e) => {e.target.innerHTML = "thanks"; e.stopPropagation()}}>click me!</button>`}`
)}

async function* _timeNow()
{
  let time_now;
  while (true) {
    const latest = Date().toString();
    if (time_now !== latest) {
      time_now = latest;
      yield time_now;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  return time_now;
}


function _7(md){return(
md`### Dataviz

Because prose can include programatic HTML we can embed rich interactive visaulizations. Lopecode includes [Observable Plot](https://observablehq.com/plot/).`
)}

function _plot_simple(Plot,x_simple){return(
Plot.plot({
  x: {
    domain: [0, 1]
  },
  y: {
    domain: [0, 1]
  },
  marks: [
    Plot.density(x_simple, {
      x: "x",
      y: "y",
      stroke: "blue",
      thresholds: 5,
      bandwidth: 70,
      strokeWidth: 0.25
    }),
    Plot.dot(x_simple, { x: "x", y: "y", value: true, r: 20 }),
    Plot.dot(
      x_simple,
      Plot.pointer({
        x: "x",
        y: "y",
        fill: "red",
        r: 20,
        maxRadius: Infinity
      })
    )
  ]
})
)}

function _9(md){return(
md`Interaction by the reader on a plot can be read and referenced. Try moving the points around in the above diagram`
)}

function _10(Inputs,x_simple){return(
Inputs.table(x_simple)
)}

function _x_simple(Inputs){return(
Inputs.input([
  { x: 0.1, y: 0.1 },
  { x: 0.9, y: 0.1 },
  { x: 0.1, y: 0.9 },
  { x: 0.5, y: 0.5 }
])
)}

function _13(manipulate,$0,$1,invalidation,invert){return(
manipulate({
  this: this,
  viewofData: $0,
  viewofPlot: $1,
  invalidation,
  onInteraction: ({
    event,
    pixelStart,
    pixelCurrent,
    dataStart,
    dataCurrent,
    viewofPlot
  }) => {
    const scaleX = viewofPlot.scale("x");
    const scaleY = viewofPlot.scale("y");
    dataCurrent.x = invert(
      scaleX,
      scaleX.apply(dataStart.x) + pixelCurrent[0] - pixelStart[0]
    );
    dataCurrent.y = invert(
      scaleY,
      scaleY.apply(dataStart.y) + pixelCurrent[1] - pixelStart[1]
    );
    event.preventDefault(); // prevents scrolling on mobile
  }
})
)}

function _14(md){return(
md`## Simplified Programming

There are many unnecessary impediments in industrial programming that add friction. For example, 
- All the code must be syntactically correct to run any portion of it.
- There is a single start to a program and you must always run it from the beginning
- The code must be written in files, sometimes in a certain order, and the placement of code affects the semantics of the program.
- Running the program is seperate from developing it.
- Debugging a program is separate from developing or running it
- Building a program is a whole different thing and a total nightmare.
- Source code is plain text.
- Code documentation is different to source code.

Lopecode sweeps these constraints away so that we can build, run, document and debug in a single place, focusing purely on logic, in an ordering that makes narrative sense.

`
)}

function _15(md){return(
md`## Dataflow

Lopecode is based on reactive dataflow programming. Its the same model that spreadsheets use. You change something, everything updates. Code is organised into cells; cells update when their upstream dependancies change. The order in which you display the cells is not relevant to the computation -- you are free to order the cells how you like.`
)}

function _foo_plus_one(foo){return(
foo + 1
)}

function _bar(){return(
"hello"
)}

function _18(md){return(
md`*if you change foo, the others will change*`
)}

function _foo(){return(
34
)}

function _bar_plus_foo(bar,foo){return(
bar + foo
)}

function _21(md){return(
md`The ordering that computation is done is defined by what upstream dependancy has to be computed first. Furthermore, dataflow leaves a trace of what the last value was. This helps with with legibility of programs. When writing a complex computation, it is very useful to see that an upstream value was \`NaN\` so you don't try to fix the wrong thing!

With dataflow you don't need to run anything, the cells recompute automatically when changed. If you introduce a syntax mistake, only downstream cells are affected, not the entire program. When code changes, only downstream cells are rerun, state stored elsewhere in unaffected. You never need to "run from the beginning" which enables much tighter development loops.

Dataflow is effecient for program writers because there are less steps involved, the program is easier to comprehend, and the programs do not lose state from restarting. Dataflow is also more efficient for the computer running it, as it doesn't recomputing things unnecessarily.`
)}

function _22(md){return(
md`## AI ❤️ Dataflow

Originally, Lopecode was designed to speed up my human programming. However, the programming ergonomics also transfer directly to AI. The fact that a dataflow runtime is robust to individual cell failures means we can code up an AI inside the dataflow graph and let it modify other cells without breaking itself.`
)}

function _23(robocoop3){return(
robocoop3({ prompt: "Roast my code" })
)}

function _24(md){return(
md`// TODO, pre-prompt robocoop, also remove the Run from the UI in robocoop3`
)}

function _26(md){return(
md`\`robocoop3\` is an Agentic AI that can read and modify the executing program. It is aware of the code that every cell executes and values they produce. You can ask it why something is happening and it very capable at figuring it out! It can fix bugs, write plans, and implement features. 

\`robocoop3\` is a normal dataflow program written in Lopecode that you can change_ right now_. If you make changes they will automatically propagate and update the one here. Dataflow is capable of expressing complex programs.`
)}

async function _27(downloadAnchor,FileAttachment,forkAnchor,md){return(
md`## Save to file, open offline

Lopecode saves to a *single* HTML file that requires nothing special to open (${downloadAnchor()}). Double clicking the file will open the page on a \`file://\` domain where it *just works*.

The experience of opening the file is insanely fast, because no networking is involved.

<figure>
![image.png](${await FileAttachment("image.png").url()})
  <caption>320ms to load exporter-2 notebook from file</caption>
</figure>

<figure>
![image@1.png](${await FileAttachment("image@1.png").url()})
  <caption>3500ms to load the same notebook from [Observablehq.com](https://observablehq.com/@tomlarkworthy/exporter-2). 10x slower!</caption>
</figure>

Lopecode's ability to self-serialize encourages low risk experimentation, instead of serializing to file you can serialize to an in-memory ${forkAnchor(undefined, undefined, {"theme": "parchment"})} that manifests as a new browser tab to try things out on. Let the AI run wild!

Self-serialization has other uses, it is possible to copy the environment to your clipboard, and paste into another website, bringing your Lopecode environment into a 3rd party domain, see the _"Copy To JS"_ button on the full *exporter* UI.

`
)}

function _copy_to_js(exporter){return(
exporter()
)}

function _30(md){return(
md`## Web Standards

Lopecode is _not_ a new programming language, or a software-as-a-service. It's a HTML document that can be saved to disk for archiving. Old file exports work after years. Here is the first [commit](https://github.com/tomlarkworthy/lopecode/commit/459c924658b8a18fe46a51719c1ab2de36a839a7) to the [Lopecode](https://github.com/tomlarkworthy/lopecode) repository on Jan 3, 2025, to [\`webpage.html\`](https://raw.githubusercontent.com/tomlarkworthy/lopecode/459c924658b8a18fe46a51719c1ab2de36a839a7/webpage.html), which looks embarissing but still runs today! Just save the file to disk and click it!

Lopecode was designed not to bit-rot. By eliminating the network and bundling everything into a standards compliant file, I hope that programs that worked into the past will continue to work long into the future. The web has a good track record of backwards compatability, and all the evergreen browser implementations work with Lopecode.

Several other advantagoes come for free with the Web

- The \`debugger\` statement works. Furthermore, it synergizes with reactive programming. When you add a \`debugger\` statement the cell is rerun and often immediately triggers a breakpoint.
- The other rich development features of the web work (performance profiling, page inspection). Modern browsers are essentially IDEs and this really helps development on Lopecode.
- You can easily share you work by uploading it to a webserver. Any static hosting works.
- You can leverage the existing Javascript ecosystem, e.g. dynamic \`import\` works. Though, you have to copy them in to make them offline-first.`
)}

function _31(md){return(
md`# The Principles of Lopecode

So far we have discussed a selection of cool things Lopecode can do. But we have not explained what it is. Curiously none of those things are integral to the core of Lopecode. In this section we describe the guiding principles shaping the technical architecture. 


_“If a system is to serve the creative spirit, it must be entirely comprehensible to a single individual… Any barrier that exists between the user and some part of the system will eventually be a barrier to creative expression. Any part of the system that cannot be changed or that is not sufficiently general is a likely source of impediment.”_

–- ”Design Principles Behind Smalltalk,” Byte 1981(Ingalls 286)`
)}

function _32(md){return(
md`## The runtime is the source of truth

Traditional programming has the programmer edit a source code, which is compiled to a program, which is then run. This is true even of the hosted Notebook environment on [Observablehq.com](https://www.observablehq.com).

Lopecode does not have a distinct concept of source code. Instead, it leverages Javascript's [\`Function.prototype.toString()\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) to decompile variables on the fly when source code is needed. Whatever is currently executing in the runtime, will be what is exported.

This is how Lopecode exports still work on the hosted Observable platform, despite no access to the hosted source code. The export scans the runtime programatically to create a serialisable representation.



`
)}

function _33(md){return(
md`## Everything runs in userspace

For a system to be *truly* moldable. Everything must be changable. Lopecode adopts a μ-kernel design where all features are added in userspace. For example, a minimal Lopecode file can be small as 48Kb.

<aside style="background: #eee; margin: 10px; padding: 10px; width: 80%;">
${md`#### es-module-shims@2.6.2 (20kb) and networking_script (7.7Kb)

ES-Module-Shims installs module loading hooks, allowing all Javascript module imports to be intercepted and the source rewritten. Lopecode leverages this to load modules from HTML content embedded in the source instead of over the network. It is the machinery that enables a single file to provide the illusion of networked module loading.

The custom \`networking_script\` adds a few more network orientated patches so that CommonJS modules and vanilla fetch also can be served with the impression of network connectivity.

#### @observablehq/inspector@5.0.1 (7Kb)

The observable inspector is an off-the-shelf module that Observable uses to render Javascript values as a DOM representation.

#### @observablehq/runtime@6.0.0 (6.5Kb)

The runtime is the reactivity dataflow engine developed by Observable. It is surprisingly small. It provides the programming module of variables and modules, and handles scheduling recomputations.

#### @tomlarkworthy/bootloader-min (3.5K)

The bootloader is a nominated userspace module that should run first. It is responsible for setting up the standard library and then loading the first real modules specified by the \`bootconf.json\`. The normal lopecode bootloader is much larger (>300kb) and includes the markdown renderer, katex, Plot etc. 
`}
</aside>

The core starts an Observable Runtime engine and sets up the internal networking and loads nominated userspace modules. At the end of the boot sequence nothing will have been rendered to the DOM. All the initial machinery is headless.

The notebook experience you are reading now happens after the Lopecode boot sequence. It is not what Lopecode is, more a demonstration of what is possible in userspace. We have choosen to recreate the Observable Notebook 1.0 experience, but it is not limited to that.

What Lopecode provides is packaging Observable's reactive runtime with mechanisms to run it from a single file and a collection of important userspace modules. An important implication being anything is reactively hot-swappable at runtime.
`
)}

function _34(md){return(
md`# The Reactive Programming model

The Reactive Programming model ensure code changes are applied immediately but selectively. We will not explain it in too much detail here. The Observable documentation explains the high level programming idioms in detail

Lopecode is a substantial reactive program. It has gone beyond the state-of-the-art with the addition of meta-programming and dataflow-templating, each which solves a different fundamental problem when scaling up a live programming system. In addition, reactive programming enables more effecient testing methodolgies that have been deploy like Reactive Testing which helps AI aided development.
`
)}

function _35(md){return(
md`## Meta-programming in Lopecode

- Required to implement editors`
)}

function _36(md){return(
md`## Dataflow Templating

Provides a generative abstraction to dataflow programming.`
)}

function _37(md){return(
md`## Reactive Testing`
)}

function _38(md){return(
md`# The Principles of the Lopecode Architecture

Unlike traditional systems where *source files* are canonical and the runtime is derived, Lopecode flips the relationship:

- **The runtime is the source of truth.** The live dataflow graph (modules, variables) *is* the program.
- **Everything runs in userspace.** Editors, visualizers, navigators, exporters, debuggers—none of these are privileged. They are ordinary modules that you can inspect, fork, and hot-edit while the system is running.
- **Minimal dependencies.** The core stays small; capabilities are layered on by importing modules when you need them.

Lopecode is **not inherently a notebook**, but it can *host* notebook-like experiences. Observable Notebook compatibility exists because “cells” and “Observable JavaScript” are implemented as a userspace layer that compiles to (and can be decompiled from) the μ-kernel’s low-level reactive variables.

This tour walks through:
1. **Modules as cooperating pieces of a single live runtime**
2. **Reactive variables and dataflow**, including runtime-wide meta-programming
3. **Decompile → edit → recompile → hot patch** workflows
4. **Userspace projection**: mapping values to DOM (and alternative views)
5. **Serialization/export**: bundling an entire computational universe into a single HTML file that can be opened without a network connection or webserver.

When you can *observe* and *rewrite* the runtime from within the runtime, you can build tools that keep evolving.`
)}

function _39(md){return(
md`#  `
)}

function _40(robocoop3){return(
robocoop3()
)}

function _42(md){return(
md`## Contributions to the State of the Art

Observable showed us the way. Main contribution is architecture


Editor <-> Source -compile-> -> Runtime

vs
                         ----- exporter
                         V
Editor <-> Source <-> Runtime <-> AI
                         ^
                         ---- inline markdown editor `
)}

function _43(lite_youtube_css,htl){return(
htl.html`<details>
  ${lite_youtube_css}
  <summary>Lopecode video tour presented at <a href="https://futureofcoding.org/">Future of Coding</a></summary>
  <lite-youtube videoid="In_BjcsDlfY" playlabel="Lopecode demo at Futore of Code" params="start=972"></lite-youtube>
</details>`
)}

function _45(md){return(
md`## Architecture

Inside there is a reactive μ-kernel that executes locally in the browser. It offers hot-code reload, dataflow, modules and meta-programming. Its the [Observable Runtime](https://github.com/observablehq/runtime) but without the hosted Notebook frontend.

_Everything else_ you see here is made in userspace, including the editor, the presentation and the cell based programming model. Using only the μ-kernel, we are able to build a complete reactive programming system which is reprogrammable at runtime.


_“If a system is to serve the creative spirit, it must be entirely comprehensible to a single individual… Any barrier that exists between the user and some part of the system will eventually be a barrier to creative expression. Any part of the system that cannot be changed or that is not sufficiently general is a likely source of impediment.”_

–- ”Design Principles Behind Smalltalk,” Byte 1981(Ingalls 286)`
)}

async function _46(architecture,htl){return(
htl.html`<img src="${await architecture.url()}" />`
)}

function _48(md){return(
md`## 1. The runtime is a collection of cooperating modules`
)}

function _49(md){return(
md`Modules contain reactive variables in a scope. Reactive variables can depend on other variables and updates automatically cascade.

`
)}

function _a(Inputs){return(
Inputs.range()
)}

function _51(a){return(
a
)}

function _52(md){return(
md`To enable meta-programming, the current set of modules in the runtime is available as a reactive variable, so that any code can reactively update to changes in the current module listing. For instance, the plot below visualizes the *current* set of modules, and reacts to new modules being loaded into the runtime.`
)}

function _54(currentModules){return(
currentModules
)}

function _mainVisualizeModules(visualizeModules){return(
visualizeModules()
)}

function _56(md){return(
md`You can add new modules at runtime with the userspace UI below. This will look for the module locally first, and if it cannot be found, pulls from the Observable API.`
)}

function _57(html,$0,$1,$2){return(
html`<div>
  ${$0}
  ${$1}
  ${$2}
</div>`
)}

function _58(additionalModules){return(
additionalModules
)}

function _61(md){return(
md`With meta-programming we are able to build software components that work over the whole of the runtime, for instance, creating module listings UIs and navigators.`
)}

function _62(md){return(
md`## Modules define reactive variables`
)}

function _63(md){return(
md`Reactive variables are owned by a module. Variables have other variables as inputs, and automatically recompute when upstream changes. The variables in the runtime collectively form a dataflow graph arranged in a DAG. 

A variable's value might recompute for several reasons, perhaps it tracks user input, or its code definition was changed, or it might be a generator that algorithmically emits many values.

The following chart is a *live* visualization of *this* runtime's variables. It is unusaully busy because this notebook imports *a lot* of other notebooks! Clicking will take you to that cell in the *Lopebook*.`
)}

function _mainCellMapViz($0){return(
$0
)}

function _66(md){return(
md`Note the code that displays the above visualization is nothing *special*, it is written in userspace and you can live edit the code. Thanks to reactive meta-programming UIs that manipulate the entire runtime are possible. Thanks to modules you can import these into the runtime as needed and reuse across lopebooks.`
)}

function _67(md){return(
md`## Low level _variables_ are compiled from high level _cells_`
)}

function _68(md){return(
md`Low level variables are implemented as plain Javascript functions (or generators) with known arguments that the μ-kernel injects when scheduling a recompilation. Choosing the right function type, specifying the arguments is tedius and error prone, so Observable Notebooks wraps the process with a higher level language ([Observable Javascript](https://observablehq.com/documentation/cells/observable-javascript)) that is close to Javascript but in a form that can be auto-wired and that lends itself to implementing common reactive patterns.

It is the higher level language that introduced the programming model of *cells*. We can look at some examples below. The following diagram unrolls all the dependancies of a specific cell \`mainVisualizeModules\` owned by the module \`main\` (when viewed on Observable.com) or \`@tomlarkworthy/lopecode-tour\` when viewed in Lopecode.`
)}

function _69(cellMapViz,$0,demoCell,Event)
{
  if (cellMapViz == null) {
    $0.value = demoCell;
    $0.dispatchEvent(new Event("input"));
  }
}


function _70(runtimeMap){return(
runtimeMap
)}

function _demoCell(mainVisualizeModules,runtimeMap)
{
  mainVisualizeModules;
  return runtimeMap.filter((cell) => cell.name == "mainVisualizeModules")[0];
}


function _mainDetailVizTitle(detailVizTitle){return(
detailVizTitle
)}

function _mainDetailCell($0){return(
$0
)}

function _74(linkTo,md){return(
md`The majority of cells are simple (denoted with a circle), and map to a single reactive variable, but there are some special types like \`viewof\` (triangle) and \`mutable\` (plus) cells that contain two or three reactive variables. Explaining the full programming model is beyond the scope of this tour. The Observable documentation explains [Observable Javascript](https://observablehq.com/@observablehq/observable-javascript) in detail.

Lopecode implements its own [Observable Javascript compiler/decompiler in userspace](${linkTo("@tomlarkworthy/observablejs-toolchain")}).

Note _cells_ are not an innate runtime feature of the μ-kernel, so there is no dependancy on the language [Observable Javascript](https://observablehq.com/@observablehq/observable-javascript) within the μ-kernel. [Observable Javascript](https://observablehq.com/@observablehq/observable-javascript) is front end language that compiles to the low level runtime representation and is implemented in userspace. We can use other languages if they target the low level runtime representation.`
)}

function _75(md){return(
md`# The runtime is the source of truth`
)}

function _76(md){return(
md`Thus, there is no external source code representation. The state of the μ-kernel is the source of truth.

When an [Observable Javascript](https://observablehq.com/@observablehq/observable-javascript) interface is needed to some variables (perhaps to offer a programming UI), the variables are dynamically decompiled, on demand, from live low level functions. 

The can be achieved because [Javascript functions have a \`toString\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) that lists their source. Because the μ-kernel manages all cross-references, no additional lexical scope needs to be considered, and so \`toString\` is all you need to recover the implementation of the dataflow graph
`
)}

function _77(md){return(
md`Here is a walk through of how it does step-by-step.`
)}

function _78(md){return(
md`### 0. Setup

Let us declare a simple cell that returns the value of a DEPENDANCY.`
)}

function _DEPENDANCY(){return(
"This should be the value of secret"
)}

function _secret(DEPENDANCY)
{
  // Can you get this source code from the runtime?
  return DEPENDANCY;
}


function _81(md){return(
md`### 1. find the variable via meta-programming

The cell is compiled to a variable, so we can query the runtime to find that variable as an Object`
)}

function _tourModule(thisModule){return(
thisModule()
)}

function _secret_variable(secret,lookupVariable,tourModule)
{
  secret;
  return lookupVariable("secret", tourModule);
}


function _85(md){return(
md`### 2. Extracts the low level definition of a variable

We can find the source code of that variable by \`toString\` the variables \`_definition\`. This is what a simple cell gets compiled to.`
)}

function _low_level(secret_variable){return(
secret_variable._definition.toString()
)}

function _87(md){return(
md`⚠️ note is the low level runtime representation, dependancies are represented as arguments to a function. The runtime knows how to fill those arguments because the low level variable also specifies its dependancies in the \`_input\` field.`
)}

function _88(secret_variable){return(
secret_variable._inputs.map((input) => input._name)
)}

function _89(md){return(
md`### 3. _decompiles_ the low level variable definitions to a high level language

To recover the high-level cell representation can *decompile*, going from low level back to high level`
)}

function _high_level(decompile,secret_variable){return(
decompile([secret_variable])
)}

function _92(md){return(
md`This now looks like the original source code, though perhaps formatted slightly differently`
)}

function _93(md){return(
md`### 4. display source code to the programmer

If we were writing a cell editor we would offer some kind of editable interface to the high-level Observable Javascript source.`
)}

function _source(Inputs,high_level){return(
Inputs.textarea({
  label: "Observable Javascript",
  value: high_level.replace("DEPENDANCY", "DEPENDANCY_2")
})
)}

function _95(md){return(
md`At this point we have recovered a high level cell representation directly from low level runtime representation.`
)}

function _96(md){return(
md`
### 5. on edit, compile back to the low level representation and updates the variable with a new definition

We can go from high-level to low level using *compile*.`
)}

function _DEPENDANCY_2(){return(
"Where did this come from?"
)}

function _low_level_edit(compile,source){return(
compile(source)
)}

function _99(Inputs,low_level_edit){return(
Inputs.textarea({
  label: "compiled",
  value: low_level_edit[0]._definition,
  rows: 4,
  disabled: true
})
)}

function _100(md){return(
md`Because the μ-kernel offers hot-code reload, we can hot patch any variable's definition at any time programmatically.`
)}

function _101(Inputs,low_level_edit,secret_variable){return(
Inputs.button("hot patch edit", {
  reduce: () => {
    let _fn;
    eval("_fn = " + low_level_edit[0]._definition);
    secret_variable._module.redefine(
      low_level_edit[0]._name,
      low_level_edit[0]._inputs,
      _fn
    );
  }
})
)}

function _102(md){return(
md`When the hot patch is clicked the source of secret is hot patched and all dependancies update `
)}

function _103(secret){return(
secret
)}

function _104(md){return(
md`## The projection of program values to the document DOM is userspace too`
)}

function _105(md){return(
md`Reactive variables compute Javascript values. Javascript values have no inherent webpage representation. The _visualizer_ maps variable values to DOM nodes to present them in a notebook-like format.   `
)}

function _options(currentModules){return(
new Map([...currentModules.values()].map((m) => [m.name, m]))
)}

function _about_modules(md){return(
md`You can pick a module to render, even one dynamically added in the "the runtime is a collection of modules" section above.`
)}

function _vizualize_module(Inputs,options){return(
Inputs.select(options, {
  label: "select a module to vizualize",
  value: options.get("@tomlarkworthy/reactive-reflective-testing")
})
)}

function _visualize(html,visualizer,runtime,invalidation,vizualize_module){return(
html`<div style="width: 90%; height: 400px; overflow: scroll; background: #fee; border: 1rem solid; margin: 1rem; padding: 1rem">
  ${visualizer(runtime, {
    invalidation,
    module: vizualize_module.module,
    detachNodes: true
  })}
</div>`
)}

function _111(md){return(
md`Because the visualizer is a userspace module, we can change it on the fly, or supply a second mapping of program state. The visualizer leverages no special access to the runtime, it simply observes variable value changes with an API that available to every userspace service. 

Lets do a simple walkthrough for a tabular view of name variables in the Tour notebook`
)}

function _112(md){return(
md`#### Obtain a reactive reference to variables of interest`
)}

function _observedVariables(runtime_variables,tourModule){return(
[...runtime_variables].filter(
  (v) =>
    (v._module == tourModule && v?._name == "observedA") ||
    v?._name == "observedB"
)
)}

function _114(md){return(
md`#### Create a destination for state change`
)}

function _stateChangeLog(html){return(
html`<div>dsds</div>`
)}

function _116(md){return(
md`#### Stream the state changes with \`observe\``
)}

function _117(observedVariables,observe,stateChangeLog,invalidation)
{
  const observers = observedVariables.map((v) =>
    observe(
      v,
      {
        fulfilled: (value, name) =>
          (stateChangeLog.innerHTML = `<div>'${name}' changed to ${value}</div>`)
      },
      { invalidation }
    )
  );
}


function _observedA(Inputs){return(
Inputs.range()
)}

function _observedB(Inputs){return(
Inputs.range()
)}

function _120(md){return(
md`Superficially this looks like what could be achieved with normal Observable Javascript programming, but importantly we have done this programatically and so we can come up with different views of program state.`
)}

function _121(md){return(
md`## A Lopebook is a hypertext navigator for _all_ the modules in the runtime

But why only render a single module, when they are all reactively linked and active in the runtime? A _Lopebook_ visualizes multiple modules and allows navigation through hyperlinks.

clicking this [link](#view=R100%28S50%28%40tomlarkworthy%2Fmodule-selection%29%2CS50%28%40tomlarkworthy%2Fflow-queue%29%29) appends to the document URL fragment. The lopebook synchronised with the document fragment, and adds a userspace context menu.

So now you can browse the runtime module structure, with dockable pages, from within the runtime.`
)}

function _122(md){return(
md`## Exporter can serialize the runtime graph to a single file`
)}

function _123(md){return(
md`Because "runtime is the source of truth" and the runtime supports meta-programming, the whole runtime dataflow graph can be serialized. 

The \`exporter\` chooses to encode the program as a single HTML file. Through importmap magic, we can inline all modules (which are native Browser ESM modules), and all file attachments, as base64 encoded strings. The resultant HTML file can be opened from an operating system without a local webserver because there are no cross-origin requests (its a single file that bundles everything needed without futher network requests).`
)}

function _125(md){return(
md`If you click "Preview" the runtime will be serialized to a HTML file which is then converted to a blob resource, which is then opened in a new tab. It also prints out a handy overview of where all the space is used.`
)}

function _exporter2(exporter){return(
exporter()
)}

function _127(md){return(
md`Of course, the exporter was implemented in userspace and as userspace has been serialized, the resultant export contains the means to re-export itself _ad infinitum_. With the addition of exporter, _Lopecode_ becomes self-hosting.`
)}

function _128(md){return(
md`## File Attachments: include assets for offline-first operation`
)}

function _129(md){return(
md`Modules support attaching binary assets in userspace. This includes npm sourced Javascript modules. All of Lopecode's Javascript dependancies have been attached to modules, including the Observable runtime μ-kernel. This means an exported single file HTML file will open and fully operate without a network connection.

Remember how a lopepage navigates through the URL fragment? That works offline too because the hash specifier is not considered a different page and does not cause a network request. Thus it is possible to embed a navigable universe of computation in a single HTML file. `
)}

function _130(md){return(
md`## Writable File Attachments`
)}

function _131(md){return(
md`Attachments are runtime state, so they can be changed (how else would you set them?). **The runtime is the source of truth**, and and **exporter serialized the runtime**, _therefore_ file attachments can be used as databases or config for state that persists across exports`
)}

async function _note(Inputs,FileAttachment){return(
Inputs.textarea({
  label: "note",
  rows: 20,
  value: await FileAttachment("task.md").text()
})
)}

function _attachment(note,createFileAttachment)
{
  const blob = new Blob([note], {
    type: "application/text;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  return createFileAttachment(url, "task.md", "application/text");
}


function _135(setFileAttachment,attachment,tourModule){return(
setFileAttachment(attachment, tourModule)
)}

function _136(md){return(
md`Updates to the note will be remembered after export, so while dataflow values are forgotten during serialization, there are facilities for binary storage under userspace control through file attachments.`
)}

function _137(exporter){return(
exporter()
)}

function _138(md){return(
md`## Nothing is _special_, everything is replacable, runtime state is a *shared* resource.

The programming system is implemented in userspace and userspace has reactive meta-programming access to everything. You could use the inbuilt editor to edit the editor, or add your own alterantive. 

You can write your own visualizer, in fact, it is very useful to construct alternative visualization of program state, for example the reactive debugger that places all variable state transitions on a timeline. (tick unpause to see it in action)`
)}

function _140($0,Event)
{
  $0.value = true;
  $0.dispatchEvent(new Event("input"));
}


function _142(md){return(
md`Similarly the serialised HTML file that the exporter exports is not canonical. You can write a different serialisation format and use both at the same time.`
)}

function _143(md){return(
md`## Meta-programming is the tool to build tools`
)}

function _144(md){return(
md`_Want reactive unit testing that is faster than watch mode?_ Use userspace metaprogramming and search for variables beginning with "test_"`
)}

function _146(tests){return(
tests({
  filter: (test) => test.state !== "paused"
})
)}

function _should_throw(Inputs){return(
Inputs.toggle({
  label: "throw?"
})
)}

function _test_has_it_thrown(should_throw)
{
  if (should_throw) throw "I threw";
}


function _149(md){return(
md`## AI 


`
)}

function _150(linkTo,md){return(
md`<a href="${linkTo("@tomlarkworthy/robocoop-2")}">Robocoop v2</a> can use read values and take screenshots of the system to help rapidly develop new functionality `
)}

function _151(md){return(
md`## Acknowledgements

Thank you *Mike Bostock* for so much. For building the Observable Runtime, d3, Plot and for seeing the future of a dataviz driven programming environment. Thanks *Philippe Rivière* for the outstanding work on Plot. Thanks *Fabian Iwand* for stretching what is possible on Observable Notebooks. Thanks _Thomas Ballinger_, _Tom MacWright_, _Jeremy Ashkenas_, _Toph Tucker_, _Visnu Pitiyanuvath_, _Allison Horst_, _Ian Johnson_, _Cobus Theunissen_, _Wayne Sutton_ and many more for building Observable.

Thanks to *Tomas Petricek* for introducing me to the computational *substrates* research discipline, which seems to fit what Lopecode is. Thank *you* for reading!`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["task.md", {url: new URL("./files/73288ecc7b82f7e7788db7ec51b172c1a294352c8811a85ca760cd42acb8d55d82a770600f3bdb368d3b4e541649ee78f0ac3293cacde26a69bd3ebec4e30ed5.markdown", import.meta.url), mimeType: "text/markdown", toString}],
    ["image.png", {url: new URL("./files/0aa2c18a4a6c1a3dfe687b7a80aacb25e44346121a2cac8e84abc7dfcce8d8375e06ccbd35c52b6638f7bc3872a7d1de1304dca09da377ca1a1f87e6d80d0dfb.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/5bfd551d73effddf8bce17999c07ffb60a8d08632b89622492976af07b8e09781f4b2cea32b85e1894fe7f8dd447ad7301a550a89205979e620a651f7d92d32d.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["timeNow","md"], _4);
  main.variable(observer("ui_prose")).define("ui_prose", ["htl","md"], _ui_prose);
  main.variable(observer("timeNow")).define("timeNow", _timeNow);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof plot_simple")).define("viewof plot_simple", ["Plot","x_simple"], _plot_simple);
  main.variable(observer("plot_simple")).define("plot_simple", ["Generators", "viewof plot_simple"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Inputs","x_simple"], _10);
  const child1 = runtime.module(define1);
  main.import("manipulate", child1);
  main.import("invert", child1);
  main.variable(observer("viewof x_simple")).define("viewof x_simple", ["Inputs"], _x_simple);
  main.variable(observer("x_simple")).define("x_simple", ["Generators", "viewof x_simple"], (G, _) => G.input(_));
  main.variable(observer()).define(["manipulate","viewof x_simple","viewof plot_simple","invalidation","invert"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("foo_plus_one")).define("foo_plus_one", ["foo"], _foo_plus_one);
  main.variable(observer("bar")).define("bar", _bar);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("foo")).define("foo", _foo);
  main.variable(observer("bar_plus_foo")).define("bar_plus_foo", ["bar","foo"], _bar_plus_foo);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["robocoop3"], _23);
  main.variable(observer()).define(["md"], _24);
  const child2 = runtime.module(define2);
  main.import("robocoop3", child2);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["downloadAnchor","FileAttachment","forkAnchor","md"], _27);
  main.variable(observer("copy_to_js")).define("copy_to_js", ["exporter"], _copy_to_js);
  const child3 = runtime.module(define3);
  main.import("downloadAnchor", child3);
  main.import("forkAnchor", child3);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["robocoop3"], _40);
  const child4 = runtime.module(define4);
  main.import("_0", child4);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["lite_youtube_css","htl"], _43);
  const child5 = runtime.module(define5);
  main.import("lite_youtube_css", child5);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["architecture","htl"], _46);
  const child6 = runtime.module(define6);
  main.import("architecture", child6);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("viewof a")).define("viewof a", ["Inputs"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer()).define(["a"], _51);
  main.variable(observer()).define(["md"], _52);
  const child7 = runtime.module(define7);
  main.import("visualizeModules", child7);
  main.import("viewof currentModules", child7);
  main.import("currentModules", child7);
  main.variable(observer()).define(["currentModules"], _54);
  main.variable(observer("mainVisualizeModules")).define("mainVisualizeModules", ["visualizeModules"], _mainVisualizeModules);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["html","viewof additional_module","viewof create_module","viewof remove_module"], _57);
  main.variable(observer()).define(["additionalModules"], _58);
  const child8 = runtime.module(define8);
  main.import("viewof create_module", child8);
  main.import("create_module", child8);
  main.import("viewof remove_module", child8);
  main.import("remove_module", child8);
  main.import("viewof additional_module", child8);
  main.import("additional_module", child8);
  main.import("additionalModules", child8);
  const child9 = runtime.module(define9);
  main.import("linkTo", child9);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["md"], _63);
  const child10 = runtime.module(define10);
  main.import("cellMap", child10);
  main.import("viewof cellMapViz", child10);
  main.import("cellMapViz", child10);
  main.import("filteredMap", child10);
  main.import("runtimeMap", child10);
  main.import("detailVizTitle", child10);
  main.import("viewof detailViz", child10);
  main.import("detailViz", child10);
  main.variable(observer("viewof mainCellMapViz")).define("viewof mainCellMapViz", ["viewof cellMapViz"], _mainCellMapViz);
  main.variable(observer("mainCellMapViz")).define("mainCellMapViz", ["Generators", "viewof mainCellMapViz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["cellMapViz","viewof cellMapViz","demoCell","Event"], _69);
  main.variable(observer()).define(["runtimeMap"], _70);
  main.variable(observer("demoCell")).define("demoCell", ["mainVisualizeModules","runtimeMap"], _demoCell);
  main.variable(observer("mainDetailVizTitle")).define("mainDetailVizTitle", ["detailVizTitle"], _mainDetailVizTitle);
  main.variable(observer("viewof mainDetailCell")).define("viewof mainDetailCell", ["viewof detailViz"], _mainDetailCell);
  main.variable(observer("mainDetailCell")).define("mainDetailCell", ["Generators", "viewof mainDetailCell"], (G, _) => G.input(_));
  main.variable(observer()).define(["linkTo","md"], _74);
  main.variable(observer()).define(["md"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer("DEPENDANCY")).define("DEPENDANCY", _DEPENDANCY);
  main.variable(observer("secret")).define("secret", ["DEPENDANCY"], _secret);
  main.variable(observer()).define(["md"], _81);
  const child11 = runtime.module(define11);
  main.import("runtime_variables", child11);
  main.import("observe", child11);
  main.import("lookupVariable", child11);
  main.import("thisModule", child11);
  main.import("runtime", child11);
  main.import("variables", child11);
  main.variable(observer("viewof tourModule")).define("viewof tourModule", ["thisModule"], _tourModule);
  main.variable(observer("tourModule")).define("tourModule", ["Generators", "viewof tourModule"], (G, _) => G.input(_));
  main.variable(observer("secret_variable")).define("secret_variable", ["secret","lookupVariable","tourModule"], _secret_variable);
  main.variable(observer()).define(["md"], _85);
  main.variable(observer("low_level")).define("low_level", ["secret_variable"], _low_level);
  main.variable(observer()).define(["md"], _87);
  main.variable(observer()).define(["secret_variable"], _88);
  main.variable(observer()).define(["md"], _89);
  const child12 = runtime.module(define12);
  main.import("compile", child12);
  main.import("decompile", child12);
  main.variable(observer("high_level")).define("high_level", ["decompile","secret_variable"], _high_level);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs","high_level"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _95);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("DEPENDANCY_2")).define("DEPENDANCY_2", _DEPENDANCY_2);
  main.variable(observer("low_level_edit")).define("low_level_edit", ["compile","source"], _low_level_edit);
  main.variable(observer()).define(["Inputs","low_level_edit"], _99);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer()).define(["Inputs","low_level_edit","secret_variable"], _101);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer()).define(["secret"], _103);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["md"], _105);
  const child13 = runtime.module(define13);
  main.import("visualizer", child13);
  main.variable(observer("options")).define("options", ["currentModules"], _options);
  main.variable(observer("about_modules")).define("about_modules", ["md"], _about_modules);
  main.variable(observer("viewof vizualize_module")).define("viewof vizualize_module", ["Inputs","options"], _vizualize_module);
  main.variable(observer("vizualize_module")).define("vizualize_module", ["Generators", "viewof vizualize_module"], (G, _) => G.input(_));
  main.variable(observer("visualize")).define("visualize", ["html","visualizer","runtime","invalidation","vizualize_module"], _visualize);
  main.variable(observer()).define(["md"], _111);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer("observedVariables")).define("observedVariables", ["runtime_variables","tourModule"], _observedVariables);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer("stateChangeLog")).define("stateChangeLog", ["html"], _stateChangeLog);
  main.variable(observer()).define(["md"], _116);
  main.variable(observer()).define(["observedVariables","observe","stateChangeLog","invalidation"], _117);
  main.variable(observer("viewof observedA")).define("viewof observedA", ["Inputs"], _observedA);
  main.variable(observer("observedA")).define("observedA", ["Generators", "viewof observedA"], (G, _) => G.input(_));
  main.variable(observer("viewof observedB")).define("viewof observedB", ["Inputs"], _observedB);
  main.variable(observer("observedB")).define("observedB", ["Generators", "viewof observedB"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _120);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer()).define(["md"], _122);
  main.variable(observer()).define(["md"], _123);
  const child14 = runtime.module(define3);
  main.import("exporter", child14);
  main.variable(observer()).define(["md"], _125);
  main.variable(observer("exporter2")).define("exporter2", ["exporter"], _exporter2);
  main.variable(observer()).define(["md"], _127);
  main.variable(observer()).define(["md"], _128);
  main.variable(observer()).define(["md"], _129);
  main.variable(observer()).define(["md"], _130);
  main.variable(observer()).define(["md"], _131);
  main.variable(observer("viewof note")).define("viewof note", ["Inputs","FileAttachment"], _note);
  main.variable(observer("note")).define("note", ["Generators", "viewof note"], (G, _) => G.input(_));
  const child15 = runtime.module(define14);
  main.import("createFileAttachment", child15);
  main.import("setFileAttachment", child15);
  main.variable(observer("attachment")).define("attachment", ["note","createFileAttachment"], _attachment);
  main.variable(observer()).define(["setFileAttachment","attachment","tourModule"], _135);
  main.variable(observer()).define(["md"], _136);
  main.variable(observer()).define(["exporter"], _137);
  main.variable(observer()).define(["md"], _138);
  const child16 = runtime.module(define15);
  main.import("_ndd", child16);
  main.import("viewof pause", child16);
  main.import("pause", child16);
  main.import("events", child16);
  main.variable(observer()).define(["viewof pause","Event"], _140);
  main.variable(observer()).define(["md"], _142);
  main.variable(observer()).define(["md"], _143);
  main.variable(observer()).define(["md"], _144);
  const child17 = runtime.module(define16);
  main.import("tests", child17);
  main.variable(observer()).define(["tests"], _146);
  main.variable(observer("viewof should_throw")).define("viewof should_throw", ["Inputs"], _should_throw);
  main.variable(observer("should_throw")).define("should_throw", ["Generators", "viewof should_throw"], (G, _) => G.input(_));
  main.variable(observer("test_has_it_thrown")).define("test_has_it_thrown", ["should_throw"], _test_has_it_thrown);
  main.variable(observer()).define(["md"], _149);
  main.variable(observer()).define(["linkTo","md"], _150);
  main.variable(observer()).define(["md"], _151);
  const child18 = runtime.module(define17);
  main.import("md", child18);
  return main;
}
