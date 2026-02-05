import define1 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# How to [Dataflow](https://observablehq.com/@observablehq/reactive-dataflow) merge on [Observable](https://observablehq.com)  

*In this series, I will explore programming techniques for the notebook platform [Observable](https://observablehq.com). Today I am looking at how to *merge* multiple reactive Dataflow streams into a single stream. This article assumes you are familiar with [Observable's non-linear reactive program flow](https://observablehq.com/@observablehq/reactive-dataflow) already.*

A common situation is this: you have a notebook that performs some useful task, and you want to offer a few different ways to start that task. For example, starting something based on configuration obtained from either URL parameters, local storage, or a manual UI. It's a little trickier than you would hope because, if each of these methods is in their own cell [1], then we have multiple distinct data flow pathways converging into a single flow.

<small>[1] *and they probably should be because of separation-of-concerns*</small>
`
)}

async function _2(FileAttachment,md){return(
md`| |
| --- |

| <center><img height=300 src=${await FileAttachment("OR_fan.png").url()}></img><center>  |
| --- |

`
)}

async function _3(FileAttachment,md){return(
md`The core difficulty is if there is no data in a source, its dataflow won't tick, so if the business logic depends on all the input sources, the business logic will not tick either. So this pattern described here will joins the business logic to the sources a different way so that if any of them tick, the business logic will tick too.

In [ReactiveX](http://reactivex.io/) terms, [Observable](https://observablehq.com)'s dataflow is a *[combineLatest](https://rxjs.dev/api/index/function/combineLatest)* 
across cell streams, but we want a *[merge](https://rxjs.dev/api/index/function/merge)*.


| |
| --- |

| <img width="100%" src=${await FileAttachment("image.png").url()}></img> | <img width="100%" src=${await FileAttachment("image@1.png").url()}></img>  |
|---|---|

So here is how you can do it with *views* and *Inputs.bind*.

`
)}

function _4(md){return(
md`## Step 1. Create an unresolved view for the business logic to depend on

We can quickly create an unresolved view with [\`Inputs.input()\`](https://github.com/observablehq/inputs/blob/main/README.md#inputsinputvalue). We will fan-in sources to this view.
`
)}

function _config(Inputs){return(
Inputs.input()
)}

function _6(md){return(
md`If the business logic extracts parameters from the *config* variable, then it will not run until it is set to a non-*undefined* value (note grey bar on the left of the cell after notebook startup).

Our example business logic will flash the notebook in a color set by the config.`
)}

async function* _businessLogic(htl,config)
{
  yield htl.svg`<svg style="position: fixed;top:0px;height:100%" viewBox="0 0 1 1">
  <rect width="1" height="1" fill=${config.color} />
</svg>`;
  await new Promise((resolve) => setTimeout(resolve, 100));
  yield undefined;
}


function _8(md){return(
md`## 2. Setup all the sources to be views

Next, we need the sources to be emitting their config to a view's value. 

Often, a source is already a view:
`
)}

function _source1(Inputs){return(
Inputs.button("source1: red", {
  required: true,
  reduce: () => ({
    color: "#f002"
  })
})
)}

function _10(source1){return(
source1
)}

function _11(md){return(
md`But even if it isn't, it is trivial to create a view from a dataflow variable by writing into an  [\`Inputs.input()\`](https://github.com/observablehq/inputs/blob/main/README.md#inputsinputvalue)`
)}

function _source2(Inputs){return(
Inputs.input()
)}

function _var2(Inputs){return(
Inputs.button("var2: yellow", {
  required: true,
  reduce: () => ({
    color: "#ff04"
  })
})
)}

function _copyVar2IntoSource2($0,var2,Event)
{
  $0.value = var2;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}


function _15(source2){return(
source2
)}

function _16(md){return(
md`## 3. Bind the source views to the fan-in view backwards

`
)}

function _connectSources(Inputs,$0,$1,invalidation,$2)
{
  // Note these appear to be wired backwards!
  // Source is in the target argument slot!
  // Bind is not symmetrical!
  Inputs.bind($0, $1, invalidation);
  Inputs.bind($2, $1, invalidation);
}


function _18(md){return(
md`Now, if either of the sources fire, the business logic is run. Give it a try on the live notebook at [@tomlarkworthy/merge-dataflow](https://observablehq.com/@tomlarkworthy/merge-dataflow)

I hope you find that useful and that you find other useful ways to manipulate dataflow!
`
)}

function _19(htl){return(
htl.html`<style>
  code {
    border-radius: 20px;
    padding: 4px;
    background-color: #f5f5f5;
  }
</style>`
)}

function _21(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["OR_fan.png", {url: new URL("./files/c716a11c651d424c4600eb696cf67410bf4b9485905f7a85a9fae9a97572e2cb1521d0580b7e6d73910ae5d18328a7aba2d7e0821fa4fca41381d1202ea06250.png", import.meta.url), mimeType: "image/png", toString}],
    ["image.png", {url: new URL("./files/179fb6fdbc37ab4d1f8dbb73afd702956a35939d7d9965e21cb5285d993b117b746684e7c64c3be1ea8d8fcd6afa9ae96b13c810047ffdf3e09b69aa9d7f952e.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/7ed8bcec1d34eda7fcd491dd5cfb4a2fc1e121cdf0ad865bf1a54b116270c0d0ae66003bbe20ef12cb622f2fba1029ef43e97f68ff7df054af615f81b3fbb388.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer()).define(["FileAttachment","md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof config")).define("viewof config", ["Inputs"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("businessLogic")).define("businessLogic", ["htl","config"], _businessLogic);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof source1")).define("viewof source1", ["Inputs"], _source1);
  main.variable(observer("source1")).define("source1", ["Generators", "viewof source1"], (G, _) => G.input(_));
  main.variable(observer()).define(["source1"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof source2")).define("viewof source2", ["Inputs"], _source2);
  main.variable(observer("source2")).define("source2", ["Generators", "viewof source2"], (G, _) => G.input(_));
  main.variable(observer("viewof var2")).define("viewof var2", ["Inputs"], _var2);
  main.variable(observer("var2")).define("var2", ["Generators", "viewof var2"], (G, _) => G.input(_));
  main.variable(observer("copyVar2IntoSource2")).define("copyVar2IntoSource2", ["viewof source2","var2","Event"], _copyVar2IntoSource2);
  main.variable(observer()).define(["source2"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("connectSources")).define("connectSources", ["Inputs","viewof source1","viewof config","invalidation","viewof source2"], _connectSources);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["htl"], _19);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _21);
  return main;
}
