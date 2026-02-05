// https://observablehq.com/@tomlarkworthy/adapting-dataviz@531
import define1 from "./29b56ba60f19a819@605.js";
import define2 from "./653c46ed55693b1f@685.js";
import define3 from "./41f3c8664d9e45a6@1969.js";
import define4 from "./0e0b35a92c819d94@474.js";
import define5 from "./293899bef371e135@278.js";

function _1(md){return(
md`# How to adapt other people's Dataviz

You might find something visually useful on [Observablehq.com](https://observablehq.com/) but often it's not written in the way you actually need. You *could* fork it, but often this causes a long-term maintenance burden as the two sources diverge. There are a few other options though

[*juice*](https://observablehq.com/@tomlarkworthy/juice) can take any DataViz builder and add back-writability to any construction parameter. For example, making selection options dynamic. This is useful for converting static DataViz into real-time components, for instance.

[*flowQueue*](https://observablehq.com/@tomlarkworthy/flow-queue) can transform any Dataflow expressed logic into a function, allowing you to convert from a single example into a functional builder pattern.

I'll show you some examples of how to use these using DataViz by other people.`
)}

function _2(md){return(
md`## Making [@saneef](https://observablehq.com/@saneef)'s [radar-chart](https://observablehq.com/@saneef/radar-chart) back-writable

Saneef has a nice radar chart component, but it doesn't work the way *I* want.

1. to customize the data you need to fiddle with d3 in a fluent style, whereas I prefer data passed in as a parameter.
2. the data is specified as a denormalized list, whereas I prefer as a single object.
3. For my application the scores need to be [synchronized](https://observablehq.com/@observablehq/synchronized-inputs) from data loaded elsewhere, so I want to be able to synchronize the values dynamically.

Fortunately, we can change all these opinions without asking [@saneef](https://observablehq.com/@saneef) to do anything!`
)}

function _3(sampleRadarChart){return(
sampleRadarChart
)}

function _5(md){return(
md`### 1. Making a functional interface

We can use normal programming abstraction to introduce a builder.`
)}

function _radarChart(htl,RadarChart,d3){return(
({
  data = [],
  width = 640,
  height = width / 1.333,
  margins = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  }
} = {}) => {
  const svg = htl.svg`<svg width=${width} height=${height} viewbox="0 0 ${width} ${height}">`;
  const radarChart = new RadarChart(svg)
    .size(width, height)
    .margins(margins)
    .data(Object.entries(data).map(([key, val]) => ({ axis: key, value: val })))
    .field({ axis: "axis", value: "value" })
    .baselineValue(3)
    .curve(d3.curveLinearClosed)
    .render();

  return svg;
}
)}

function _7(md){return(
md`So now we can use our builder *radarChart* to create multiple charta with different custom data. Cool.`
)}

function _8(radarChart,htl){return(
htl.html`${radarChart({
width: 400,
data: {"label 1": 1, "label 2":2, "cool": 4}
})}

${radarChart({
width: 400,
data: {"something": 1, "cool":2, "cool": 4, "boo": 4, "baz": 3}
})}`
)}

function _9(md){return(
md`### 2. Adding back-writability

Many people do not add back-writability to their charts, if they had no need, why would they? Luckily we can add that by wrapping a static component functional builder with [juice](https://observablehq.com/@tomlarkworthy/juice), that creates a new builder that creates dynamic components.

The juice configuration just needs to state which constructor arguments should be extracted as a JSON path and the name they become in the composite object.

For my application, the radar chart labels are fixed, but the values should be back-writable. So I can create this new dynamic component like so:`
)}

function _personalityChart(juice,radarChart){return(
juice(radarChart, {
  rationality: "[0].data['rationality']",
  empathy: "[0].data['empathy']",
  resourcefulness: "[0].data['resourcefulness']"
})
)}

function _12(md){return(
md`So now I can can create the viz in exactly the same way, juice passes through all the existing parameters so nothing changes at construction time.`
)}

function _personality(personalityChart){return(
personalityChart({
  width: 450,
  margins: { top: 100, left: 100, right: 100, bottom: 100 },
  data: {
    rationality: 4,
    empathy: 1,
    resourcefulness: 2
  }
})
)}

function _14(md){return(
md`What changes is the return type, it now is a composite object with values for all the extra fields configured:`
)}

function _15(personality){return(
personality
)}

function _16(md){return(
md`But these fields are actually views themselves so you can do fine grained binding to them, such as attaching sliders or manually setting them`
)}

function _17(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 5], {
    label: "rationality",
    step: 1
  }),
  $0.rationality
)
)}

function _18(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 5], {
    label: "empathy",
    step: 1
  }),
  $0.empathy
)
)}

function _19(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 5], {
    label: "resourcefulness",
    step: 1
  }),
  $0.resourcefulness
)
)}

function _20(md){return(
md`With this technique we can do things far beyond what @saneef designed for.`
)}

function _bigRadar(juice,radarChart){return(
juice(
  radarChart,
  Object.fromEntries(
    Array.from({ length: 16 }).map((_, i) => [i, `[0].data[${i}]`])
  )
)
)}

function _run(Inputs){return(
Inputs.toggle({
  label: "run"
})
)}

function _vals(bigRadar){return(
bigRadar({
  width: 500
})
)}

function* _updater(run,$0,Promises)
{
  while (run) {
    const ts = new Date() / 10000;
    $0.value = Object.fromEntries(
      Array.from({ length: 16 }).map((_, i) => [
        i,
        5 * (Math.sin(ts * (i + 1)) + 1)
      ])
    );

    yield Promises.delay(100);
  }
}


function _25(md){return(
md`With back-writability in place we can compose hierarchically and use the component within a *single cell application* (see [scaling UI](https://observablehq.com/@tomlarkworthy/ui-development))`
)}

function _26(md){return(
md`## Creating a functional interface from one-off Dataflow DataViz

It's quite common to see a nice DataViz in a narrative piece, but because the author was never designing for reuse, so it was developed as a one-off with no builder.

For example, look at this beautiful comparison plot from [@observablehq/correlation-over-time](https://observablehq.com/@observablehq/correlation-over-time)`
)}

function _28(comparisonPlotSample){return(
comparisonPlotSample
)}

function _29(md){return(
md`Before we can start modding it with *juice*, we need to wrap it in a functional interface. We can dataflow-to-function conversion achieve using a *flowQueue*. First, we need to identify what upstream cells are needed to configure the viz. In this case **data**, **period** and **colorScheme**. We need to supply those at import time using the *with* clause. I find it useful during development to use Inputs to model these parameter cells because they can be set manually and programatically.`
)}

function _30(md){return(
md`### inputs cells`
)}

function _dataInputRaw(Inputs){return(
Inputs.textarea({ label: "data (as JSON)", minlength: 3 })
)}

function _data(dataInputRaw){return(
eval(dataInputRaw)
)}

function _period(Inputs){return(
Inputs.select(
  [
    "date",
    "hour",
    "day",
    "weekend",
    "week",
    "month",
    "quarter",
    "daytime",
    "feel"
  ],
  {
    label: "period"
  }
)
)}

function _colorScheme(Inputs){return(
Inputs.select(
  [
    "Cyclical, Nameable, High Perceptual Differentiation (rainbow)",
    "Dark to Light (magma)",
    "Optimized for Color Vision Deficiency (cividis)",
    "Diverging (RdYlBu)"
  ],
  {
    label: "colorScheme"
  }
)
)}

function _35(md){return(
md`### import the output cell`
)}

function _36(md){return(
md`The inputs are substituted at import time within a *with* clause, so that the output cell **comparisonPlot** is now affected by their changes. `
)}

function _38(md){return(
md`### Wrap with flowQueue

We need a flowQueue to helps us manage the underlying dataflow logic.`
)}

function _args(flowQueue){return(
flowQueue()
)}

function _41(args){return(
args
)}

function _42(md){return(
md`The active task in the flowQueue will be called args. When that changes we need to push its values into our input cells, and tell them to update`
)}

function _loadArgs($0,args,$1,$2,Event)
{
  $0.value = JSON.stringify(args.data);
  $1.value = args.period;
  $2.value = args.colorScheme;

  $0.dispatchEvent(new Event("input", { bubbles: true }));
  $1.dispatchEvent(new Event("input", { bubbles: true }));
  $2.dispatchEvent(new Event("input", { bubbles: true }));
}


function _44(md){return(
md`We expect that changing the inputs will cause our output cell (\`comparisonPlot\`) to update. After it is updated we want to consider the tasks complete and return the value from the \`flowQueue\`. So we create a cell triggered by c\`omparisonPlot\` dataflow to resolve the \`flowQueue\` tasks`
)}

function _resolveTask($0,comparisonPlot)
{
  $0.resolve(comparisonPlot);
}


function _46(md){return(
md`To load a task we send to the *flowQueue*. So here we can create our functional interface.`
)}

function _comparisonPlotFn($0){return(
async ({
  data = [],
  period = "month",
  colorScheme = "Dark to Light (magma)"
} = {}) =>
  await $0.send({
    data,
    period,
    colorScheme
  })
)}

function _48(md){return(
md`So now we can create (multiple) diagrams just by calling a builder function, despite the implementation being written in the dataflow style, and by a different person!`
)}

async function _49(html,comparisonPlotFn,myData){return(
html`${await comparisonPlotFn({
  period: "hour",
  data: myData
})}
${await comparisonPlotFn({
  period: "day",
  data: myData
})}
`
)}

function _myData(){return(
[
  {
    date: "2019-09-27T01:00:00.000Z",
    demand: 60870,
    hour: 20,
    daytime: 1,
    day: 3,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 31.1
  },
  {
    date: "2019-09-27T02:00:00.000Z",
    demand: 58914,
    hour: 21,
    daytime: 1,
    day: 3,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 30
  },
  {
    date: "2019-09-27T03:00:00.000Z",
    demand: 55656,
    hour: 22,
    daytime: 1,
    day: 3,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 29.4
  },
  {
    date: "2019-09-27T04:00:00.000Z",
    demand: 51579,
    hour: 23,
    daytime: 1,
    day: 3,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 29.4
  },
  {
    date: "2019-09-27T05:00:00.000Z",
    demand: 47630,
    hour: 0,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 28.9
  },
  {
    date: "2019-09-27T06:00:00.000Z",
    demand: 44379,
    hour: 1,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 27.8
  },
  {
    date: "2019-09-27T07:00:00.000Z",
    demand: 42075,
    hour: 2,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 27.2
  },
  {
    date: "2019-09-27T08:00:00.000Z",
    demand: 40525,
    hour: 3,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 26.7
  },
  {
    date: "2019-09-27T09:00:00.000Z",
    demand: 39477,
    hour: 4,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 2,
    temp: 25.6
  },
  {
    date: "2019-09-27T10:00:00.000Z",
    demand: 39391,
    hour: 5,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 1,
    temp: 25
  },
  {
    date: "2019-09-27T11:00:00.000Z",
    demand: 40767,
    hour: 6,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 1,
    temp: 23.9
  },
  {
    date: "2019-09-27T12:00:00.000Z",
    demand: 43381,
    hour: 7,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 1,
    temp: 23.3
  },
  {
    date: "2019-09-27T13:00:00.000Z",
    demand: 44128,
    hour: 8,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 1,
    temp: 23.9
  },
  {
    date: "2019-09-27T14:00:00.000Z",
    demand: 45056,
    hour: 9,
    daytime: 2,
    day: 4,
    weekend: 0,
    week: 39,
    month: 8,
    quarter: 2,
    feel: 1,
    temp: 25
  }
]
)}

function _52(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["sampleRadarChart"], _3);
  const child1 = runtime.module(define1);
  main.import("sampleRadarChart", child1);
  main.import("RadarChart", child1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("radarChart")).define("radarChart", ["htl","RadarChart","d3"], _radarChart);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["radarChart","htl"], _8);
  main.variable(observer()).define(["md"], _9);
  const child2 = runtime.module(define2);
  main.import("juice", child2);
  main.variable(observer("personalityChart")).define("personalityChart", ["juice","radarChart"], _personalityChart);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof personality")).define("viewof personality", ["personalityChart"], _personality);
  main.variable(observer("personality")).define("personality", ["Generators", "viewof personality"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["personality"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Inputs","viewof personality"], _17);
  main.variable(observer()).define(["Inputs","viewof personality"], _18);
  main.variable(observer()).define(["Inputs","viewof personality"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("bigRadar")).define("bigRadar", ["juice","radarChart"], _bigRadar);
  main.variable(observer("viewof run")).define("viewof run", ["Inputs"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.variable(observer("viewof vals")).define("viewof vals", ["bigRadar"], _vals);
  main.variable(observer("vals")).define("vals", ["Generators", "viewof vals"], (G, _) => G.input(_));
  main.variable(observer("updater")).define("updater", ["run","viewof vals","Promises"], _updater);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  const child3 = runtime.module(define3);
  main.import("comparisonPlot", "comparisonPlotSample", child3);
  main.variable(observer()).define(["comparisonPlotSample"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof dataInputRaw")).define("viewof dataInputRaw", ["Inputs"], _dataInputRaw);
  main.variable(observer("dataInputRaw")).define("dataInputRaw", ["Generators", "viewof dataInputRaw"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["dataInputRaw"], _data);
  main.variable(observer("viewof period")).define("viewof period", ["Inputs"], _period);
  main.variable(observer("period")).define("period", ["Generators", "viewof period"], (G, _) => G.input(_));
  main.variable(observer("viewof colorScheme")).define("viewof colorScheme", ["Inputs"], _colorScheme);
  main.variable(observer("colorScheme")).define("colorScheme", ["Generators", "viewof colorScheme"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  const child4 = runtime.module(define3).derive(["data","period","colorScheme"], main);
  main.import("comparisonPlot", child4);
  main.variable(observer()).define(["md"], _38);
  const child5 = runtime.module(define4);
  main.import("flowQueue", child5);
  main.variable(observer("viewof args")).define("viewof args", ["flowQueue"], _args);
  main.variable(observer("args")).define("args", ["Generators", "viewof args"], (G, _) => G.input(_));
  main.variable(observer()).define(["args"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("loadArgs")).define("loadArgs", ["viewof dataInputRaw","args","viewof period","viewof colorScheme","Event"], _loadArgs);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("resolveTask")).define("resolveTask", ["viewof args","comparisonPlot"], _resolveTask);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("comparisonPlotFn")).define("comparisonPlotFn", ["viewof args"], _comparisonPlotFn);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["html","comparisonPlotFn","myData"], _49);
  main.variable(observer("myData")).define("myData", _myData);
  const child6 = runtime.module(define5);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _52);
  return main;
}
