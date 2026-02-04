import define1 from "./98f34e974bb2e4bc@958.js";
import define2 from "./a2a7845a5e2a5aec@139.js";

function _1(md){return(
md`# Dataflow Templating

## The missing generative abstraction for dataflow programming.

`
)}

function _2(md){return(
md`\`\`\`js

import {cloneDataflow, thisModule, lookupVariable} from '@tomlarkworthy/dataflow-templating'
\`\`\``
)}

function _3(md){return(
md`### Why?

There is a reusability gap with notebooks (and spreadsheets for that matter). When you express a complex chain of computation, they build upon a set of initial inputs, unrolled across a series of cells. But then you realize, there is no way you can reuse the same logic with a different set of inputs in the same way you can with a function. The cells are single use.

But I love dataflow, notebooks, inspectable cells and the accompanying documentation! The inspectability of intermediate steps with dataflow programming speeds development through tight feedback. I love that I can build a program up one step at a time incrementally without needing to know the end game and without having to frequently rerun a program from scratch. However, the reusability gap bites hard when trying to generalize from a notebook's incrementally developed single solution to reusable library functions.

Dataflow templating addresses this reusability problem. We take a working dataflow graph and logically clone it. The clones contain distinct isolated reactive variables, but identical computation, so the values flowing through them can be different, but they all compute the same thing. This avoids workarounds such as a single dataflow chain processing collection values [[1](https://observablehq.com/@tomlarkworthy/visualizer)], or using queues to process values one-at-a-time [[2](https://observablehq.com/@tomlarkworthy/flow-queue)]. 
`
)}

function _dataflow_templating1(FileAttachment){return(
FileAttachment("dataflow_templating@1.svg").image()
)}

function _5(md){return(
md`# Example: A Dashboard Charting Widget`
)}

function _6(md){return(
md`With a dashboard we often want to show multiple slices of a high dimensional datasource but with a shared time axis.

We start with defining the prototype.`
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
md`With a dimension and slice, we can plot a timeseries. Note the chart is reactive to the UI earlier in the dataflow. If you change the \`startDay\` or \`endDay\` the chart axis updates`
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
        symbol: "dot" // or square?
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
md`Now that example was cool, we built it up incrementally. It is interactive, so we can test it easily, but it's a single chart, and we want a dashboard! So this is where cloning the dataflow will allow us to extract this chain of logic into a single programmable unit, based on the prototype.

First we gain access to the enclosing module hosting the variables via \`thisModule\` from the \`runtime-sdk\`.`
)}

function _myModule(thisModule){return(
thisModule()
)}

function _25(md){return(
md`Then we find the variables we wish to clone, using \`lookupVariable\` from \`runtime-sdk\`. Note a \`viewof\` is really two reactive variables so you need them both (\`viewof foo\` _and_ \`foo\`)`
)}

function _template(lookupVariable,myModule){return(
lookupVariable(
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
md`Then we call \`cloneDataflow\` with the variables to be extracted and an Observer factory to be notified of value changes. The Observer factory argument is the same signature used in the [Observable Runtime API](https://github.com/observablehq/runtime?tab=readme-ov-file#runtimemoduledefine-observer). 

\`\`\`js
observer: (name: string) => ({
  fulfilled: (value) => unknown,
  error: (error) => unknown,
  pending: () => unknown
}) | null
\`\`\``
)}

function _28(md){return(
md`For simple rendering of a repeated UI component, we listen only to the "widget" values, and pipe the fulfilled values to an enclosing Generator's\\* notify, so that the HTML element in the clone becomes exposed to the top level notebook.

\\* [Introduction to Generators](https://observablehq.com/@observablehq/introduction-to-generators)`
)}

function _29(Generators,cloneDataflow,template){return(
Generators.observe((notify) => {
  return cloneDataflow(
    // variables we wish to duplicate
    template,
    // Observer factory to pass to the template variables (same as Runtime API)
    (name) => {
      if (name == "widget")
        // we only care about the internal "widget" cell.
        return {
          // We stream the widget variable's values (a HTML form)
          // to be the result of this enclosing cells Generator.
          fulfilled: notify
        };
    }
  );
})
)}

function _auto_smoosh(visibility,$0,Event)
{
  visibility().then(() => {
    $0.value = true;
    $0.dispatchEvent(new Event("input"));
  });
}


function _31(md){return(
md`This is cool, we have a totally independent copy of the original dataflow. This is useful enough for templating common UI components that are always intended to be top level cells.



`
)}

function _32(md){return(
md`The other cool thing to note is that we did not include the timerange when cloning. That variable was not templated so all the widgets share that reactive reference and so have aligned time ranges.`
)}

function _33(md){return(
md`### One-to-many, Reading and Writing

For a dashboard we want to create \`n\` widgets and arrange them on a single HTML element. Reading out a single dataflow element and putting in a cell can be done with a generator, but when we want to create many, we can't associate every widget with a unique parent reactive variable.

Instead, we can use the Observable inspector (itself an implementor of the Observer API) to stream the cell changes to a DOM element. Furthermore, sometimes we want to manipulate the dataflow inside the clones programatically. To achieve this we resolve the first value of a control view to a promise, gaining access to the underlying view.`
)}

function _dataflows(widgetCount,invalidation,cloneDataflow,template,Inspector){return(
Array.from({ length: widgetCount }).map(() => {
  const widget = document.createElement("DIV");
  const control = new Promise((resolve) => {
    invalidation.then(
      cloneDataflow(template, (name) => {
        if (name == "widget") {
          return new Inspector(widget);
        }
        if (name == "viewof pizzaChoice") {
          return {
            fulfilled: resolve
          };
        }
      })
    );
  });
  return {
    widget,
    control
  };
})
)}

function _widgetCount(Inputs){return(
Inputs.range([1, 4], {
  label: "widget count",
  step: 1,
  value: 2
})
)}

function _36(md){return(
md`From the array of DOM elements we can easily render them to a container HTML element`
)}

function _37(htl,width,widgetCount,dataflows){return(
htl.html`<div style="display: flex;">
  <style>
    .widget {
      max-width: ${width / widgetCount}px
    }
  </style>
  ${dataflows.map((df) => df.widget)}

</div>`
)}

function _38(Inputs,$0){return(
Inputs.bind(
  Inputs.date({
    label: "startDay"
  }),
  $0
)
)}

function _39(Inputs,$0){return(
Inputs.bind(
  Inputs.date({
    label: "endDay"
  }),
  $0
)
)}

function _40(md){return(
md`An array of views also can be manipulated programmatically, which is changing the individual dataflow values inside the clones.
`
)}

function _controls(dataflows){return(
Promise.all(dataflows.map((df) => df.control))
)}

function _42(Inputs,controls,pizzaChoices,Event){return(
Inputs.button("randomize pizzaChoices", {
  reduce: () => {
    controls.forEach((control) => {
      control.value =
        pizzaChoices[Math.floor(Math.random() * pizzaChoices.length)];
      control.dispatchEvent(new Event("input"));
    });
  }
})
)}

function _43(md){return(
md`### Reactive code updates

So far we have shown how to duplicate dataflow logic and pass independent data through the clones. There is one more trick that allows changes to the source dataflow logic to propagate to the clones. Try changing the chart plot's symbol \`dot\` mark to \`square\` [here](#chart) in source code to see for yourself.... all the clones update when the source dataflow's logic changes too.`
)}

function _44(md){return(
md`### ⚠️ Dataflow topological changes

Beyond changing the code of an individual variable, you might add or remove variables from the source dataflow, changing the topology of the dataflow. There is no support for reacting to that. Generally you will need to change the templating parameters anyway so it did not seem worth dealing with the complexity when often you will cause a broken state anyway if the \`cloneDataflow\` call is not adjusted. 
`
)}

function _45(md){return(
md`## Releasing Resources

\`cloneDataflow\` creates non-visible reactive variables. These will accumulate over time unless you call the returned disposal function. You can use the [dataflow debugger](https://observablehq.com/@tomlarkworthy/debugger) to help identify leaks as it is able to plot a variables in the runtime, even those not visible in the notebook.`
)}

function _46(md){return(
md`---`
)}

function _47(md){return(
md`## cloneDataflow`
)}

function _cloneDataflow(observeSet){return(
function cloneDataflow(variables, observerFactory = () => ({})) {
  const uid = Math.random().toString(36).slice(2);
  const sanitize = (s) => s.replace(/[^\w$]/g, "_");
  const cloneNameOf = (v) => `dynamic ${sanitize(v._name)} ${uid}`;
  const sources = new Map(variables.map((v) => [v._name, v]));
  const clones = new Map();
  let runtime;
  for (const [name, v] of sources) {
    const inputs = v._inputs.map((i) =>
      sources.has(i._name) ? cloneNameOf(i) : i._name
    );
    const t = v._module
      .variable(observerFactory(v._name))
      .define(cloneNameOf(v), inputs, v._definition);
    clones.set(name, t);
    if (!runtime) runtime = t._module._runtime;
  }
  const unobserve = observeSet(runtime._variables, () => {
    for (const [name, v] of sources) {
      const t = clones.get(name);
      if (v._definition !== t._definition) {
        const inputs = v._inputs.map((i) =>
          sources.has(i._name) ? cloneNameOf(i) : i._name
        );
        t.define(cloneNameOf(v), inputs, v._definition);
      }
    }
  });
  return () => {
    for (const [name, v] of clones) v.delete();
    sources.clear();
    clones.clear();
    unobserve();
  };
}
)}

function _49(md){return(
md`## References

While this Dataflow Templating implementation is for Observable Runtime Dataflow. The overarching concept is applicable to any dataflow languages in the style of \`FrTime\`, see _"Embedding Dynamic Dataflow in a Call-by-Value Language"_ 2006, Gregory H. Cooper, Shriram Krishnamurthi ([pdf](https://cs.brown.edu/~sk/Publications/Papers/Published/ck-frtime/paper.pdf))`
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
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("dataflow_templating1")).define("dataflow_templating1", ["FileAttachment"], _dataflow_templating1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("dataset")).define("dataset", ["pizza"], _dataset);
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
  main.variable(observer("template")).define("template", ["lookupVariable","myModule"], _template);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["Generators","cloneDataflow","template"], _29);
  main.variable(observer("auto_smoosh")).define("auto_smoosh", ["visibility","viewof combine","Event"], _auto_smoosh);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("dataflows")).define("dataflows", ["widgetCount","invalidation","cloneDataflow","template","Inspector"], _dataflows);
  main.variable(observer("viewof widgetCount")).define("viewof widgetCount", ["Inputs"], _widgetCount);
  main.variable(observer("widgetCount")).define("widgetCount", ["Generators", "viewof widgetCount"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["htl","width","widgetCount","dataflows"], _37);
  main.variable(observer()).define(["Inputs","viewof startDay"], _38);
  main.variable(observer()).define(["Inputs","viewof endDay"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("controls")).define("controls", ["dataflows"], _controls);
  main.variable(observer()).define(["Inputs","controls","pizzaChoices","Event"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("cloneDataflow")).define("cloneDataflow", ["observeSet"], _cloneDataflow);
  main.variable(observer()).define(["md"], _49);
  const child1 = runtime.module(define1);
  main.import("getPromiseState", child1);
  main.import("descendants", child1);
  main.import("runtime", child1);
  main.import("thisModule", child1);
  main.import("lookupVariable", child1);
  main.import("toObject", child1);
  main.import("observeSet", child1);
  main.import("observe", child1);
  const child2 = runtime.module(define2);
  main.import("inspect", child2);
  main.import("Inspector", child2);
  return main;
}
