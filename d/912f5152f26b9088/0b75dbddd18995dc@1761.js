import define1 from "./e1c39d41e8e944b0@939.js";
import define2 from "./98f34e974bb2e4bc@650.js";
import define3 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Debugger: Notebook Dataflow Debugger (ndd)
`
)}

function __ndd(htl,$0,$1,$2,$3,vizUpdater,vizHolder){return(
this || // Reuse DOM to keep control state working, but mixin 'vizUpdater'
  htl.html`<div style="display:flex;flex-wrap:wrap; max-height: 200px; ">
        ${$0}
        ${$1}
        ${$2}
        ${$3}
      </div>
      ${(vizUpdater, vizHolder)}
      `
)}

function _b(a){return(
a + 6
)}

function _a(Inputs){return(
Inputs.range()
)}

function _5(md){return(
md`
A [moldable](https://moldabledevelopment.com/) development tool to help debug [dataflow problems](https://observablehq.com/@observablehq/how-observable-runs) by visualizing all cell state transitions in the containing notebook on a timeline.

\`\`\`js
import {_ndd} from '@tomlarkworthy/debugger'
\`\`\`

Thanks to [\`@mootari/access-runtime\`](https://observablehq.com/@mootari/access-runtime) on which this tool builds upon.


|Date| Change|
|---|---|
| 2025-04-27 | Fixed bug that broke exports by calling observe on unobserved variables
| 2025-03-11 | Visualize all variables in runtime, better zoom
| 2024-12-08 | Added dependancy graph and track anon variables too
| 2023-11-04 | Fixed renaming bug not tracking the new variable name
|            | Fixed initial variables not triggering`
)}

function _6(md){return(
md`## TODO
- Reduce volume of signals (filters? Search)
- Vertical zoom?`
)}

function _slider2(Inputs){return(
Inputs.range([0, 1], { label: "slide me!" })
)}

function _clicker(Inputs){return(
Inputs.button("Click me!")
)}

function _delayedDependentAsyncComputation(clicker,uid)
{
  clicker; // create dependancy on clicker cellto resolve a value
  return uid();
}


function _uid(){return(
() => (Math.random() + 1).toString(36).substring(7)
)}

function _11(md){return(
md`## State`
)}

function _extra_excludes(){return(
new Set()
)}

function _excludes(descendants,lookupVariable,module,extra_excludes){return(
descendants(
  lookupVariable("range", module),
  lookupVariable("events", module),
  lookupVariable("dedupe_range", module),
  lookupVariable("trackedVariables", module),
  ...extra_excludes
)
)}

function _events()
{
  const val = [];
  return val;
}


function _endTime(Inputs){return(
Inputs.input(null)
)}

function _16(md){return(
md`### UI`
)}

function _17(md){return(
md`#### timeline`
)}

function _18(events){return(
events
)}

function _range(now,endTime,timeDelay,windowSecs,$0,Event)
{
  now;
  const end = (endTime || performance.now()) - timeDelay * 1000;
  const start = Math.max(end - windowSecs * 1000);
  if (
    $0.value[0] !== start ||
    $0.value[1] !== end
  ) {
    $0.value[0] = start;
    $0.value[1] = end;
    $0.dispatchEvent(new Event("input"));
  }
}


function _dedupe_range(keepalive,module,Inputs)
{
  keepalive(module, "range");
  return Inputs.input([0, 30]);
}


function _viz(dedupe_range,Plot,width,events)
{
  const [start, end] = dedupe_range;
  return Plot.plot({
    width,
    marginLeft: 200,
    y: {
      axis: null,
      domain: [
        ...events.reduce((acc, e) => (acc.add(e.name), acc), new Set())
      ].sort()
    },
    x: {
      domain: [start, end],
      type: "time"
    },
    color: {
      domain: ["pending", "fulfilled", "rejected", "idle"],
      range: ["#BBF", "#0F0", "#F44", "#EEE"]
    },
    marks: [
      Plot.ruleY(
        events,
        Plot.selectLast({
          z: "name",
          y: "name",
          stroke: "#EEE",
          strokeDasharray: [2, 3]
        })
      ),
      Plot.barX(
        events,
        Plot.selectLast({
          x1: start,
          x2: start - 60 * 60 * 1000,
          y: "name",
          z: "name",
          text: "name",
          textAnchor: "end",
          dx: -10,
          fill: (d) =>
            d.type === "pending" ? "pending" : end - d.t < 500 ? d.type : "idle"
        })
      ),
      Plot.tickX(events, {
        x: "t",
        y: "name",
        stroke: "type",
        strokeWidth: 2
      }),
      // Plot.arrow(
      //   events.flatMap((e) =>
      //     e.variable._inputs.map((i) => ({
      //       input: i,
      //       variable: e.variable
      //     }))
      //   ),
      //   {
      //     x1: start,
      //     y1: (d) => d.input._name,
      //     x2: start,
      //     y2: (d) => d.variable._name,
      //     bend: true,
      //     stroke: "#ccc",
      //     headLength: 4,
      //     strokeWidth: 1
      //   }
      // ),
      Plot.text(
        events,
        Plot.selectLast({
          x: start,
          y: "name",
          z: "name",
          text: (d) => d.name, // + "\n " + d.variable._definition.toString().slice(0, 30),
          textAnchor: "end",
          dx: -10,
          fill: "black"
        })
      )
    ]
  });
}


function _22(md){return(
md`#### timeline holder`
)}

function _vizHolder(){return(
document.createElement("div")
)}

function _vizUpdater(interceptVariables,vizHolder,viz)
{
  interceptVariables;
  vizHolder.firstChild?.remove();
  vizHolder.appendChild(viz);
  
}


function _25(md){return(
md`#### clear button`
)}

function _clear(Inputs,$0){return(
Inputs.button("clear", {
  reduce: () => ($0.value = [])
})
)}

function _27(md){return(
md`#### pause toggle`
)}

function _pause(Inputs,$0,Event)
{
  const ui = Inputs.toggle({ label: "pause" });

  const updateEndTime = () => {
    $0.value = ui.value ? performance.now() : null;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  };
  ui.addEventListener("input", updateEndTime);
  return ui;
}


function _29(md){return(
md`#### break toggler`
)}

function _breakpoint(Inputs){return(
Inputs.toggle({ label: "break next?" })
)}

function _31(md){return(
md`#### Time window`
)}

function _windowSecs(Inputs){return(
Inputs.range([0.01, 60], {
  value: 30,
  step: 0.01,
  label: "window (secs)"
})
)}

function _33(md){return(
md`#### Time delay`
)}

function _timeDelay(Inputs){return(
Inputs.range([0, 30], {
  value: 0,
  step: 0.01,
  label: "delay (secs)"
})
)}

function _35(md){return(
md`## Implementation`
)}

function _36(md){return(
md`### Get the runtime`
)}

function _38(md){return(
md`### track notebook variables`
)}

function _allVariables(variables,runtime){return(
variables(runtime)
)}

function _module(thisModule){return(
thisModule()
)}

function _trackedVariables(allVariables){return(
[...allVariables]
)}

function _mainVariableNames(trackedVariables){return(
trackedVariables.map((v) => v._name)
)}

function _interceptVariables(trackedVariables,interceptVariable,invalidation,excludes)
{
  trackedVariables.forEach((v) => interceptVariable(v, invalidation, excludes));
  return Object.fromEntries(trackedVariables.map((v) => [v._name, v]));
}


function _notify($0,$1,$2){return(
function notify(name, type, value, variable) {
  if ($0.value) return;

  const event = {
    t: performance.now(),
    name: name || variable._definition.toString().slice(0, 30),
    value,
    type,
    variable
  };
  $1.value.push(event);
  while ($1.value.length > 2000) $1.value.shift();

  $1.value = $1.value;
  if ($2.value) {
    debugger;
  }
}
)}

function _names(){return(
{}
)}

function _interceptVariable(observe,notify){return(
function interceptVariable(v, invalidation, excludes, firstSeen = false) {
  if (excludes.has(v)) return;
  if (v._name === "now") return;
  if (!v._reachable) return; // causes bugs and there is nothing interesting to debug anyway
  if (!v.ndd) {
    v.ndd = true;
    observe(v, {
      pending: (...args) => notify(v._name, "pending", args[0], v),
      rejected: (...args) => notify(v._name, "rejected", args[0], v),
      fulfilled: (...args) => notify(v._name, "fulfilled", args[0], v)
    });
  }
}
)}

function _49(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("_ndd")).define("_ndd", ["htl","viewof clear","viewof pause","viewof windowSecs","viewof timeDelay","vizUpdater","vizHolder"], __ndd);
  main.variable(observer("b")).define("b", ["a"], _b);
  main.variable(observer("viewof a")).define("viewof a", ["Inputs"], _a);
  main.variable(observer("a")).define("a", ["Generators", "viewof a"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof slider2")).define("viewof slider2", ["Inputs"], _slider2);
  main.variable(observer("slider2")).define("slider2", ["Generators", "viewof slider2"], (G, _) => G.input(_));
  main.variable(observer("viewof clicker")).define("viewof clicker", ["Inputs"], _clicker);
  main.variable(observer("clicker")).define("clicker", ["Generators", "viewof clicker"], (G, _) => G.input(_));
  main.variable(observer("delayedDependentAsyncComputation")).define("delayedDependentAsyncComputation", ["clicker","uid"], _delayedDependentAsyncComputation);
  main.variable(observer("uid")).define("uid", _uid);
  main.variable(observer()).define(["md"], _11);
  main.define("initial extra_excludes", _extra_excludes);
  main.variable(observer("mutable extra_excludes")).define("mutable extra_excludes", ["Mutable", "initial extra_excludes"], (M, _) => new M(_));
  main.variable(observer("extra_excludes")).define("extra_excludes", ["mutable extra_excludes"], _ => _.generator);
  main.variable(observer("excludes")).define("excludes", ["descendants","lookupVariable","module","extra_excludes"], _excludes);
  main.define("initial events", _events);
  main.variable(observer("mutable events")).define("mutable events", ["Mutable", "initial events"], (M, _) => new M(_));
  main.variable(observer("events")).define("events", ["mutable events"], _ => _.generator);
  main.variable(observer("viewof endTime")).define("viewof endTime", ["Inputs"], _endTime);
  main.variable(observer("endTime")).define("endTime", ["Generators", "viewof endTime"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["events"], _18);
  main.variable(observer("range")).define("range", ["now","endTime","timeDelay","windowSecs","viewof dedupe_range","Event"], _range);
  main.variable(observer("viewof dedupe_range")).define("viewof dedupe_range", ["keepalive","module","Inputs"], _dedupe_range);
  main.variable(observer("dedupe_range")).define("dedupe_range", ["Generators", "viewof dedupe_range"], (G, _) => G.input(_));
  main.variable(observer("viz")).define("viz", ["dedupe_range","Plot","width","events"], _viz);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("vizHolder")).define("vizHolder", _vizHolder);
  main.variable(observer("vizUpdater")).define("vizUpdater", ["interceptVariables","vizHolder","viz"], _vizUpdater);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("viewof clear")).define("viewof clear", ["Inputs","mutable events"], _clear);
  main.variable(observer("clear")).define("clear", ["Generators", "viewof clear"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("viewof pause")).define("viewof pause", ["Inputs","viewof endTime","Event"], _pause);
  main.variable(observer("pause")).define("pause", ["Generators", "viewof pause"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof breakpoint")).define("viewof breakpoint", ["Inputs"], _breakpoint);
  main.variable(observer("breakpoint")).define("breakpoint", ["Generators", "viewof breakpoint"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("viewof windowSecs")).define("viewof windowSecs", ["Inputs"], _windowSecs);
  main.variable(observer("windowSecs")).define("windowSecs", ["Generators", "viewof windowSecs"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof timeDelay")).define("viewof timeDelay", ["Inputs"], _timeDelay);
  main.variable(observer("timeDelay")).define("timeDelay", ["Generators", "viewof timeDelay"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("modules", child1);
  main.import("main", child1);
  main.variable(observer()).define(["md"], _38);
  const child2 = runtime.module(define2);
  main.import("variables", child2);
  main.import("descendants", child2);
  main.import("lookupVariable", child2);
  main.import("observe", child2);
  main.import("thisModule", child2);
  main.import("keepalive", child2);
  main.variable(observer("viewof allVariables")).define("viewof allVariables", ["variables","runtime"], _allVariables);
  main.variable(observer("allVariables")).define("allVariables", ["Generators", "viewof allVariables"], (G, _) => G.input(_));
  main.variable(observer("viewof module")).define("viewof module", ["thisModule"], _module);
  main.variable(observer("module")).define("module", ["Generators", "viewof module"], (G, _) => G.input(_));
  main.variable(observer("trackedVariables")).define("trackedVariables", ["allVariables"], _trackedVariables);
  main.variable(observer("mainVariableNames")).define("mainVariableNames", ["trackedVariables"], _mainVariableNames);
  main.variable(observer("interceptVariables")).define("interceptVariables", ["trackedVariables","interceptVariable","invalidation","excludes"], _interceptVariables);
  main.variable(observer("notify")).define("notify", ["viewof pause","mutable events","viewof breakpoint"], _notify);
  main.variable(observer("names")).define("names", _names);
  main.variable(observer("interceptVariable")).define("interceptVariable", ["observe","notify"], _interceptVariable);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _49);
  return main;
}
