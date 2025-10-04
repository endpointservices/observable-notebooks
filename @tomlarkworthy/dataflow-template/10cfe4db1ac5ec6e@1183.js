import define1 from "./4f3615c7e4d21e01@257.js";
import define2 from "./98f34e974bb2e4bc@699.js";
import define3 from "./f096db8fcbc444bf@565.js";
import define4 from "./56b204c6d7cdb801@35.js";
import define5 from "./db80e603859226c1@23.js";
import define6 from "./f109935193c0deba@4417.js";

function _1(md){return(
md`# Reusable Dataflow Programming with Reactive Dataflow Templating

## Clone a dataflow subgraph, and iterate reactively on all clones  at once. Useful for creating reusable dataflow components from a concrete example.`
)}

function _2(md){return(
md`### Why?

There is an reusability gap with notebooks (and spreadsheets for that matter). When you express a complex chain of computation, they build upon a set of initial inputs, unrolled across a series of cells. But then you realize, there is no way you can reuse the same logic with different inputs.

But I love dataflow, notebooks, inspectable cells and the accompanying documentation! The inspectability of intermediate steps with dataflow programming speeds development through tight feedback. I love that I can build a program up one step at a time incrementally without needing to know the end game and without having to frequently rerun a program from scratch. However, the reuasability gap bites hard when trying to go from a notebook's incrementally developed solution to library functions.

Dataflow templating addresses the reusability problem. We take a working dataflow graph and logically clone it into a dataflow facade you can programatically interact with. The clones contain distinct isolated variables, but identical implementations, so the values flowing through them can be different but they exactly match the logic you developed incrementally.
`
)}

function _dataflow_templating1(FileAttachment){return(
FileAttachment("dataflow_templating@1.svg").image()
)}

function _4(md){return(
md`# Example: A Dashboard Charting Widget`
)}

function _5(md){return(
md`With a dashboard we often want to show multiple slices of a high dimensional datasource across common axis. We start with a prototype.`
)}

function _dataset(pizza){return(
pizza
)}

function _time(startDay,endDay){return(
[startDay, endDay]
)}

function _startDay(Inputs,d3,dataset){return(
Inputs.date({
  label: "startDay",
  value: d3.min(dataset, (d) => d.order_date)
})
)}

function _endDay(Inputs,d3,dataset){return(
Inputs.date({
  label: "endDay",
  value: d3.max(dataset, (d) => d.order_date)
})
)}

function _11(md){return(
md`For each widget should look at a different dimension.`
)}

function _dimension(Inputs,dataset){return(
Inputs.select(Object.getOwnPropertyNames(dataset[0]), {
  label: "dimension",
  value: "orders"
})
)}

function _pizzaChoices(dataset){return(
[...new Set(dataset.map((d) => d.name))]
)}

function _14(md){return(
md`and slice by pizza type.`
)}

function _pizzaChoice(Inputs,pizzaChoices){return(
Inputs.select(pizzaChoices, {
  label: "pizza"
})
)}

function _16(md){return(
md`With a dimension and slice, we can plot a timeseries. Note the chart is reactive to the UI earlier in the dataflow.`
)}

function _chart(Plot,pizzaChoice,dimension,time,dataset){return(
Plot.plot({
  title: `${pizzaChoice}, ${dimension}`,
  x: {
    domain: time
  },
  marks: [
    Plot.dot(
      dataset.filter((d) => d.name == pizzaChoice),
      {
        x: "order_date",
        y: dimension,
        symbol: "dot"
      }
    )
  ]
})
)}

function _18(md){return(
md`We want to combine all our UI controls and the chart into a single HTML widget`
)}

function _combine(Inputs){return(
Inputs.toggle({ label: "smoosh into single component" })
)}

function _20(md){return(
md`#### assembled widget prototype`
)}

function _widget(combine,htl,$0,$1,chart){return(
combine
  ? htl.html`<div>
  ${$0}
  ${$1}
  ${chart}
</div>`
  : "You need to tick combine to see the UI assembled into a element"
)}

function _22(md){return(
md`## Cloning the dataflow`
)}

function _23(md){return(
md`Now that example was cool, we built it up incrementally. It is interactive, so we can test it easily, but it's a single chart, and we want a dashboard! So this is where cloning the dataflow will allow us to extract this chain of logic into a single programmable unit, based on the prototype`
)}

function _myModule(thisModule){return(
thisModule()
)}

function _25(md){return(
md`To extract the dataflow we call cloneDataflow with the variables to be extracted and a reference to the module the variables live in. Note viewof is really two reactive variables so you need them both (\`viewof foo\` _and_ \`foo\`).
`
)}

function _dataflow(cloneDataflow,myModule){return(
cloneDataflow(
  [
    "viewof dimension",
    "dimension",
    "viewof pizzaChoice",
    "pizzaChoice",
    "chart",
    "widget"
  ],
  myModule
)
)}

function _27(md){return(
md`The dataflow contains all the variables, which are reactively updated. To get the current value of an internal node, you \`observe\` it, which returns a generator compatible with can be used as a cell (see [Introduction to Generators](https://observablehq.com/@observablehq/introduction-to-generators))`
)}

function _28(dataflow){return(
dataflow.observe("widget")
)}

function _auto_smoosh(visibility,$0,Event)
{
  visibility().then(() => {
    $0.value = true;
    $0.dispatchEvent(new Event("input"));
  });
}


function _30(md){return(
md`This is cool, we have a totally indepant copy of the original dataflow. This is useful enough for templating common UI components that are always intended to be top level cells.`
)}

function _31(md){return(
md`The other cool thing to note is that we did not include the timerange when cloning. That variable was not templated so all the widgets share that reactive reference and so have aligned time ranges.`
)}

function _32(md){return(
md`### one-to-many: convert to dom

For a dashboard we want to create \`n\` widgets and arrange them on a single HTML element. Reading out a single dataflow element and putting in a cell can be done with a generator, but to combine, we need a stable DOM element that reactively updates with dataflow changes. For that we call \`dom\` which creates a [domView](https://observablehq.com/@tomlarkworthy/dom-view) wrapper`
)}

function _widgetCount(Inputs){return(
Inputs.range([1, 4], {
  label: "widget count",
  step: 1,
  value: 2
})
)}

async function _dataflows(widgetCount,cloneDataflow,myModule,invalidation)
{
  const dataflows = await Promise.all(
    Array.from({ length: widgetCount }).map(() =>
      cloneDataflow(
        [
          "viewof dimension",
          "dimension",
          "viewof pizzaChoice",
          "pizzaChoice",
          "chart",
          "widget"
        ],
        myModule
      )
    )
  );
  invalidation.then(() => dataflows.forEach((d) => d.dispose()));
  return dataflows;
}


function _domElements(dataflows){return(
dataflows.map((dataflow) =>
  dataflow.dom("widget", { className: "widget" })
)
)}

function _36(htl,width,widgetCount,domElements){return(
htl.html`<div style="display: flex;">
  <style>
    .widget {
      max-width: ${width / widgetCount}px
    }
  </style>
  ${domElements}

</div>`
)}

function _37(Inputs,$0){return(
Inputs.bind(
  Inputs.date({
    label: "startDay"
  }),
  $0
)
)}

function _38(Inputs,$0){return(
Inputs.bind(
  Inputs.date({
    label: "endDay"
  }),
  $0
)
)}

function _39(md){return(
md`### Scripting a Dataflow Clone's inputs

Dataflows often accept external input via views, typically [Observable Inputs](https://observablehq.com/documentation/inputs/overview), including the programmatic input, [\`Inputs.input\`](https://github.com/observablehq/inputs?tab=readme-ov-file#inputsinputvalue).

If you obtain a reference to these, you can script them as normal, allowing programatic per clone configuration. Through the use of tactically placed inputs, we can abstract out an end-to-end computation.`
)}

function _pizzaChoiceControls(dataflows){return(
Promise.all(
  dataflows.map((dataflow) => dataflow.valueOf("viewof pizzaChoice"))
)
)}

function _41(Inputs,pizzaChoiceControls,pizzaChoices,Event){return(
Inputs.button("randomize", {
  reduce: () => {
    pizzaChoiceControls.forEach((control) => {
      control.value =
        pizzaChoices[Math.floor(Math.random() * pizzaChoices.length)];
      control.dispatchEvent(new Event("input"));
    });
  }
})
)}

function _42(md){return(
md`### Reactive code updates

So far we have shown how to duplicate dataflow logic and pass independent data through the clones. There is one more trick that allows changes to the source dataflow logic to propagate to the clones. Try changing the chart plot's symbol \`dot\` mark to \`square\` [here](#chart) in source code to see for yourself.... all the clones update when the source dataflow's logic changes too.`
)}

function _43(md){return(
md`### ⚠️ Dataflow topological changes

Beyond changing the code of individual variable, you might introduce add or remove variables from the source dataflow, changing the topology of the dataflow. There is no support for reacting to that. Generally you will need to change the templating parameters anyway so it did not seem worth dealing with the complexity when often you will cause a broken state anyway if the \`cloneDataflow\` call is not adjusted. 
`
)}

function _44(md){return(
md`## Releasing Resources

\`cloneDataflow\` creates non-visible reactive variables. These will accumulate over time unless you call \`dispose\`. You can use the [dataflow debugger](https://observablehq.com/@tomlarkworthy/debugger) to help identify leaks as it is able to plot a variables in the runtime, even those not visible in the notebook.`
)}

function _45(md){return(
md`## Limitations

A daflow tick is done in an animation frame, which means best case you can achieve 8ms for a computation on a 120Hz refresh rate (see [benchmark](#test_addOneBenchmark)). All dataflow is done in the same runtime in the same tick, so you can effectively use parallel clones.

You can't really do more than one computation per tick per dataflow clone, so this limits its use to UI widgets or event driven computation. It would be a bad choice for a low level, frequently called library computation. `
)}

function _46(md){return(
md`---`
)}

function _47(md){return(
md`## cloneDataflow`
)}

function _cloneDataflow(lookupVariable,VariableSupport,observeSet,Dataflow){return(
async function cloneDataflow(names, module) {
  const sources = new Map(
    await Promise.all(
      names.map(async (name) => {
        const v = await lookupVariable(name, module);
        if (!v) throw new Error(`Variable not found: ${name}`);
        return [name, v];
      })
    )
  );
  const uid = Math.random().toString(36).slice(2);
  const sanitize = (s) => (s ?? "anon").replace(/[^\w$]/g, "_");
  const cloneNameOf = (v) => `dyanamic ${sanitize(v._name)} ${uid}`;
  const sourceSet = new Set(sources.values());
  const variables = new Map();
  for (const [name, v] of sources) {
    const vs = new VariableSupport(name, v);
    const inputs = v._inputs.map((i) =>
      sourceSet.has(i) ? cloneNameOf(i) : i._name
    );
    const t = module
      .variable({
        fulfilled: (val) => vs.setValue(Promise.resolve(val)),
        rejected: (err) => vs.setValue(Promise.reject(err))
      })
      .define(cloneNameOf(v), inputs, v._definition);
    vs.target = t;
    variables.set(name, vs);
  }
  await module._runtime._computeSoon();
  observeSet(module._runtime._variables, () => {
    for (const [name, v] of sources) {
      const vs = variables.get(name);
      if (!vs) continue;
      const t = vs.target;
      if (v._definition !== t._definition) {
        const inputs = v._inputs.map((i) =>
          sourceSet.has(i) ? cloneNameOf(i) : i._name
        );
        t.define(cloneNameOf(v), inputs, v._definition);
      }
    }
  });
  return new Dataflow(variables);
}
)}

function _VariableSupport(){return(
class {
  constructor(name, source) {
    this.name = name;
    this.source = source;
    this.target = null;
    this.last = undefined;
    this.listeners = new Set();
    this.generators = new Set();
  }
  setValue(promise) {
    this.last = promise;
    this.listeners.forEach((l) => l(promise));
  }
}
)}

function _Dataflow(Generators,domView,Event){return(
class {
  constructor(variables) {
    this.variables = variables;
  }
  observe(name) {
    const vs = this.variables.get(name);
    if (!vs) throw new Error(`${name} is not templated`);
    const generator = Generators.observe((notify) => {
      if (vs.last) notify(vs.last);
      vs.listeners.add(notify);
    });
    vs.generators.add(generator);
    return generator;
  }
  valueOf(name) {
    const vs = this.variables.get(name);
    if (!vs) throw new Error(`${name} is not templated`);
    return vs.last ?? vs.target._promise;
  }
  dom(name, { className = "" } = {}) {
    const vs = this.variables.get(name);
    if (!vs) throw new Error(`${name} is not templated`);
    const view = domView({ className });
    const apply = (p) =>
      p.then((v) => {
        view.value = v;
        view.dispatchEvent(new Event("input", { bubbles: true }));
      });
    apply(vs.last ?? vs.target._promise);
    vs.listeners.add(apply);
    return view;
  }
  inspect(name, dom) {}
  dispose() {
    for (const vs of this.variables.values()) {
      vs.generators.forEach((g) => g.return());
      vs.listeners.clear();
      if (vs.target) vs.target.delete();
    }
    this.variables.clear();
  }
}
)}

function _52(md){return(
md`## Tests`
)}

function _53(tests,myModule){return(
tests({
  filter: (test) => test.variable._module == myModule
})
)}

function _addOneInput(Inputs){return(
Inputs.input()
)}

function _addOneOutput(addOneInput){return(
addOneInput + 1
)}

function _delayedPromise(){return(
new Promise((r) => setInterval(() => r(10), 500))
)}

function _hangingPromise(){return(
new Promise((r) => {})
)}

function _error()
{
  throw "Error";
}


function _view(Inputs){return(
Inputs.input(10)
)}

async function _test_addOneBenchmark(cloneDataflow,myModule,Event,expect,d3)
{
  const dataflow = await cloneDataflow(
    ["viewof addOneInput", "addOneInput", "addOneOutput"],
    myModule
  );
  const input = await dataflow.valueOf("viewof addOneInput");
  const outputStream = dataflow.observe("addOneOutput");
  const times = [];
  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    input.value = 1;
    input.dispatchEvent(new Event("input"));
    const out = await outputStream.next().value;
    const time = performance.now() - start;
    expect(out).toEqual(2);
    times.push(time);
  }
  // no output
  return `avg ${d3.sum(times) / times.length}ms`;
}


async function _test_addOneQueing(cloneDataflow,myModule,Event,expect)
{
  const dataflow = await cloneDataflow(
    ["viewof addOneInput", "addOneInput", "addOneOutput"],
    myModule
  );
  const input = await dataflow.valueOf("viewof addOneInput");
  const outputStream = dataflow.observe("addOneOutput");

  input.value = 1;
  input.dispatchEvent(new Event("input"));
  input.value = 2;
  input.dispatchEvent(new Event("input"));
  input.value = 3;
  input.dispatchEvent(new Event("input"));
  const out1 = await outputStream.next().value;
  const out2 = await outputStream.next().value;
  const out3 = await outputStream.next().value;
  expect(out1).toBe(2);
  expect(out2).toBe(3);
  expect(out2).toBe(4);
}


async function _test_delayedPromise(cloneDataflow,myModule,expect)
{
  const dataflow = await cloneDataflow(["delayedPromise"], myModule);
  // valueOf
  expect(await dataflow.valueOf("delayedPromise")).toEqual(10);
  // generator
  expect(await dataflow.observe("delayedPromise").next().value).toEqual(10);
}


async function _test_error(cloneDataflow,myModule,expect,getPromiseState)
{
  const dataflow = await cloneDataflow(["error"], myModule);
  // valueOf view
  expect(await getPromiseState(dataflow.valueOf("error"))).toEqual({
    state: "rejected",
    error: "Error"
  });

  // generator view
  expect(await getPromiseState(dataflow.observe("error").next().value)).toEqual(
    {
      state: "rejected",
      error: "Error"
    }
  );
}


async function _test_hangingPromise(cloneDataflow,myModule,expect,getPromiseState)
{
  const dataflow = await cloneDataflow(["hangingPromise"], myModule);
  // valueOf
  expect(await getPromiseState(dataflow.valueOf("hangingPromise"))).toEqual({
    state: "pending"
  });
  // generator
  expect(
    await getPromiseState(dataflow.observe("hangingPromise").next().value)
  ).toEqual({
    state: "pending"
  });
}


async function _test_view(cloneDataflow,myModule,expect,getPromiseState,Inputs)
{
  const dataflow = await cloneDataflow(["viewof view", "view"], myModule);

  // valueOf view
  expect(await getPromiseState(dataflow.valueOf("viewof view"))).toEqual({
    state: "fulfilled",
    fulfilled: Inputs.input(10)
  });
  // valueOf data
  expect(await getPromiseState(dataflow.valueOf("view"))).toEqual({
    fulfilled: 10,
    state: "fulfilled"
  });

  // generator view
  expect(
    await getPromiseState(dataflow.observe("viewof view").next().value)
  ).toEqual({
    state: "fulfilled",
    fulfilled: Inputs.input(10)
  });
  // generator data
  expect(await getPromiseState(dataflow.valueOf("view"))).toEqual({
    fulfilled: 10,
    state: "fulfilled"
  });
}


function _69(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["dataflow_templating@1.svg", {url: new URL("./files/2c9efeb6f92ffdbfd4643ca6749a24a323f5692d6658c99e1f80448cd10d863537917ccf4d1f128ec8e659e4bf8c9a33fb90d6bcd3257eff7ea7987f72584235.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("dataflow_templating1")).define("dataflow_templating1", ["FileAttachment"], _dataflow_templating1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("dataset")).define("dataset", ["pizza"], _dataset);
  const child1 = runtime.module(define1);
  main.import("timeRange", child1);
  main.variable(observer("time")).define("time", ["startDay","endDay"], _time);
  main.variable(observer("viewof startDay")).define("viewof startDay", ["Inputs","d3","dataset"], _startDay);
  main.variable(observer("startDay")).define("startDay", ["Generators", "viewof startDay"], (G, _) => G.input(_));
  main.variable(observer("viewof endDay")).define("viewof endDay", ["Inputs","d3","dataset"], _endDay);
  main.variable(observer("endDay")).define("endDay", ["Generators", "viewof endDay"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof dimension")).define("viewof dimension", ["Inputs","dataset"], _dimension);
  main.variable(observer("dimension")).define("dimension", ["Generators", "viewof dimension"], (G, _) => G.input(_));
  main.variable(observer("pizzaChoices")).define("pizzaChoices", ["dataset"], _pizzaChoices);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof pizzaChoice")).define("viewof pizzaChoice", ["Inputs","pizzaChoices"], _pizzaChoice);
  main.variable(observer("pizzaChoice")).define("pizzaChoice", ["Generators", "viewof pizzaChoice"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("chart")).define("chart", ["Plot","pizzaChoice","dimension","time","dataset"], _chart);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof combine")).define("viewof combine", ["Inputs"], _combine);
  main.variable(observer("combine")).define("combine", ["Generators", "viewof combine"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("widget")).define("widget", ["combine","htl","viewof dimension","viewof pizzaChoice","chart"], _widget);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("dataflow")).define("dataflow", ["cloneDataflow","myModule"], _dataflow);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["dataflow"], _28);
  main.variable(observer("auto_smoosh")).define("auto_smoosh", ["visibility","viewof combine","Event"], _auto_smoosh);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof widgetCount")).define("viewof widgetCount", ["Inputs"], _widgetCount);
  main.variable(observer("widgetCount")).define("widgetCount", ["Generators", "viewof widgetCount"], (G, _) => G.input(_));
  main.variable(observer("dataflows")).define("dataflows", ["widgetCount","cloneDataflow","myModule","invalidation"], _dataflows);
  main.variable(observer("domElements")).define("domElements", ["dataflows"], _domElements);
  main.variable(observer()).define(["htl","width","widgetCount","domElements"], _36);
  main.variable(observer()).define(["Inputs","viewof startDay"], _37);
  main.variable(observer()).define(["Inputs","viewof endDay"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("pizzaChoiceControls")).define("pizzaChoiceControls", ["dataflows"], _pizzaChoiceControls);
  main.variable(observer()).define(["Inputs","pizzaChoiceControls","pizzaChoices","Event"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("cloneDataflow")).define("cloneDataflow", ["lookupVariable","VariableSupport","observeSet","Dataflow"], _cloneDataflow);
  main.variable(observer("VariableSupport")).define("VariableSupport", _VariableSupport);
  main.variable(observer("Dataflow")).define("Dataflow", ["Generators","domView","Event"], _Dataflow);
  const child2 = runtime.module(define2);
  main.import("getPromiseState", child2);
  main.import("descendants", child2);
  main.import("runtime", child2);
  main.import("thisModule", child2);
  main.import("lookupVariable", child2);
  main.import("toObject", child2);
  main.import("observeSet", child2);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["tests","myModule"], _53);
  main.variable(observer("viewof addOneInput")).define("viewof addOneInput", ["Inputs"], _addOneInput);
  main.variable(observer("addOneInput")).define("addOneInput", ["Generators", "viewof addOneInput"], (G, _) => G.input(_));
  main.variable(observer("addOneOutput")).define("addOneOutput", ["addOneInput"], _addOneOutput);
  main.variable(observer("delayedPromise")).define("delayedPromise", _delayedPromise);
  main.variable(observer("hangingPromise")).define("hangingPromise", _hangingPromise);
  main.variable(observer("error")).define("error", _error);
  main.variable(observer("viewof view")).define("viewof view", ["Inputs"], _view);
  main.variable(observer("view")).define("view", ["Generators", "viewof view"], (G, _) => G.input(_));
  main.variable(observer("test_addOneBenchmark")).define("test_addOneBenchmark", ["cloneDataflow","myModule","Event","expect","d3"], _test_addOneBenchmark);
  main.variable(observer("test_addOneQueing")).define("test_addOneQueing", ["cloneDataflow","myModule","Event","expect"], _test_addOneQueing);
  main.variable(observer("test_delayedPromise")).define("test_delayedPromise", ["cloneDataflow","myModule","expect"], _test_delayedPromise);
  main.variable(observer("test_error")).define("test_error", ["cloneDataflow","myModule","expect","getPromiseState"], _test_error);
  main.variable(observer("test_hangingPromise")).define("test_hangingPromise", ["cloneDataflow","myModule","expect","getPromiseState"], _test_hangingPromise);
  main.variable(observer("test_view")).define("test_view", ["cloneDataflow","myModule","expect","getPromiseState","Inputs"], _test_view);
  const child3 = runtime.module(define3);
  main.import("tests", child3);
  const child4 = runtime.module(define4);
  main.import("domView", child4);
  const child5 = runtime.module(define5);
  main.import("expect", child5);
  main.variable(observer()).define(["robocoop"], _69);
  const child6 = runtime.module(define6);
  main.import("robocoop", child6);
  return main;
}
