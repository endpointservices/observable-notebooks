import define1 from "./e1c39d41e8e944b0@939.js";
import define2 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Notebook Dataflow Debugger (ndd)

A [moldable](https://moldabledevelopment.com/) development tool to help debug [dataflow problems](https://observablehq.com/@observablehq/how-observable-runs) by visualizing all cell state transitions in the containing notebook ([Twitter](https://twitter.com/tomlarkworthy/status/1543253986026954752) thread). Import into your own notebook when you need to debug a dataflow problem

\`\`\`js
import {_ndd} from '@tomlarkworthy/ndd'
\`\`\`

So that the debugger does not trigger itself, you must name its containing cell \`ndd\`:

\`\`\`js
ndd = _ndd
\`\`\`

Thanks to [\`@mootari/access-runtime\`](https://observablehq.com/@mootari/access-runtime) on which this tool builds upon.


|Date| Change|
|---|---|
| 2023-11-04 | Fixed renaming bug not tracking the new variable name
|            | Fixed initial variables not triggering`
)}

function __ndd(htl,$0,$1,$2,vizUpdater,vizHolder){return(
this || // Reuse DOM to keep control state working, but mixin 'vizUpdater'
  htl.html`
      <div style="display:flex;flex-wrap:wrap">
      ${$0}
      ${$1}
      ${$2}
      </div>
      ${(vizUpdater, vizHolder)}
      `
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


function _runPeriodics(Inputs){return(
Inputs.toggle({
  value: true,
  label: "run periodics?"
})
)}

function* _periodicFulfilled(runPeriodics,Promises)
{
  while (runPeriodics) {
    yield Promises.delay(1000, Math.random());
  }
}


function _periodicThrow(periodicFulfilled)
{
  periodicFulfilled; // depends on periodicFulfilled's clock
  throw new Error(); // throw an error, errors are shown in red
}


function _9(md){return(
md`## State`
)}

function _excludes(){return(
["events", "viz", "vizUpdater", "ndd", "_ndd"]
)}

function _events(reset,WATCHER_PREFIX)
{
  reset;
  const val = [];
  val[WATCHER_PREFIX] = true;
  return val;
}


function _endTime(Inputs){return(
Inputs.input(null)
)}

function _13(md){return(
md`### UI`
)}

function _14(md){return(
md`#### timeline`
)}

function _viz(endTime,now,windowSecs,reset,events,Plot)
{
  const end = endTime || now;
  const start = Math.max(end - windowSecs * 1000, reset);
  const windowedEvents = events.slice(events.findIndex((e) => e.t >= start));
  return Plot.plot({
    marginLeft: 150,
    y: {
      axis: null,
      domain: Object.keys(
        events.reduce((acc, e) => ((acc[e.name] = ""), acc), {})
      )
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
          stroke: "#EEE"
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
      Plot.tickX(windowedEvents, {
        x: "t",
        y: "name",
        stroke: "type",
        strokeWidth: 2
      }),
      Plot.text(
        events,
        Plot.selectLast({
          x: start,
          y: "name",
          z: "name",
          text: "name",
          textAnchor: "end",
          dx: -10,

          fill: "black"
        })
      )
    ]
  });
}


function _16(md){return(
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


function _19(md){return(
md`#### reset button`
)}

function _reset(Inputs){return(
Inputs.button("reset", { reduce: () => Date.now() })
)}

function _21(md){return(
md`#### pause toggle`
)}

function _pause(Inputs,$0,Event)
{
  const ui = Inputs.toggle({ label: "pause" });

  const updateEndTime = () => {
    $0.value = ui.value ? Date.now() : null;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  };
  ui.addEventListener("input", updateEndTime);
  return ui;
}


function _23(md){return(
md`#### break toggler`
)}

function _breakpoint(Inputs){return(
Inputs.toggle({ label: "break next?" })
)}

function _25(md){return(
md`#### Time window`
)}

function _windowSecs(Inputs){return(
Inputs.range([1, 60 * 30], {
  value: 30,
  step: 1,
  label: "window (secs)"
})
)}

function _27(md){return(
md`## Implementation`
)}

function _28(md){return(
md`### Get the runtime`
)}

function _30(md){return(
md`find the main module (the notebook itself, not its imports)`
)}

function _main(modules)
{
  for (let [module, label] of modules.entries()) {
    if (label === "main") return module;
  }
}


function _32(md){return(
md`### track notebook variables`
)}

function _mainVariables(reset,Generators,runtime,main,WATCHER_PREFIX,_,invalidation){return(
reset,
Generators.observe((notify) => {
  const pollVariables = () =>
    Array.from(runtime._variables)
      .filter((v) => v._module === main)
      .filter((v) => v._type === 1)
      .filter((v) => !v._name || !v._name.startsWith(WATCHER_PREFIX));

  let current = pollVariables();
  const id = setInterval(() => {
    const sample = pollVariables();
    if (!_.isEqual(current, sample)) {
      current = sample;
      notify(current);
    }
  }, 1000);
  invalidation.then(() => clearInterval(id));

  notify(current); // Initial value
})
)}

function _mainVariableNames(mainVariables){return(
mainVariables.map((v) => v._name)
)}

function _interceptVariables(mainVariables,interceptVariable,invalidation)
{
  mainVariables.forEach((v) =>
    interceptVariable(
      v,
      invalidation,
      /* first seen */ (this || {})[v._name] === undefined
    )
  );
  return Object.fromEntries(mainVariables.map((v) => [v._name, v]));
}


function _new_veriable_10(){return(
2
)}

function _notify($0,$1,$2){return(
function notify(name, type, value) {
  if ($0.value) return;
  const datum = {
    t: Date.now(),
    name: name || "unknown",
    value,
    type
  };
  $1.value = $1.value.concat(datum);
  if ($2.value) {
    debugger;
  }
}
)}

function _WATCHER_PREFIX(){return(
"uYtQqQXnBT"
)}

function _uid(){return(
() => Math.random().toString(16).substring(3)
)}

function _interceptVariable(excludes,_,notify,WATCHER_PREFIX,uid){return(
function interceptVariable(v, invalidation, firstSeen = false) {
  if (excludes.includes(v._name)) return;
  const name = v._name || "anon_" + v._observer.id;
  if (firstSeen) {
    debugger;
  }
  if (_.isEqual(v._observer, {})) {
    // for views and mutables, no observer is setup
    // we create a synthetic anon variable to watch it
    // (we tried inserting an observable into the existing
    // variable object but it never triggered)

    // Because we are creating a variable it takes 2 events to catch up
    // Its starts in pending state ( 1 extra state unrelated to target variable)
    let skip = 2;
    const handler =
      (type) =>
      (...args) => {
        if (skip-- <= 0) notify(args[1], type, args[0]);
      };
    const watcher = v._module.variable({
      pending: handler("pending"),
      rejected: handler("rejected"),
      fulfilled: handler("fulfilled")
    });
    watcher.define(WATCHER_PREFIX + uid(), [name], (val) => val);
    invalidation.then(() => {
      watcher.delete();
      watcher._observer = {}; // Bug: runtime still sends events to observer, so dereference the observable to cleanup
    });
  } else {
    // intercepts an existing observer handler
    const intercept = (type) => {
      if (v._observer[type]) {
        const old = v._observer[type];
        v._observer[type] = (...args) => {
          notify(args[1], type, args[0]);
          // The old is often a prototype, so we use Reflect to call it
          Reflect.apply(old, v._observer, args);
        };
        invalidation.then(() => (v._observer[type] = old));
      }
    };

    intercept("fulfilled");
    intercept("rejected");
    intercept("pending");
  }

  if (firstSeen) {
    debugger;
    if (v._value !== undefined) notify(v._name, "fulfilled", v._value);
    else if (v._promise) {
      notify(v._name, "pending", undefined);
      v._promise
        .then((value) => notify(v._name, "fulfilled", value))
        .catch((err) => notify(v._name, "rejected", err));
    }
  }
}
)}

function _42(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("_ndd")).define("_ndd", ["htl","viewof reset","viewof pause","viewof windowSecs","vizUpdater","vizHolder"], __ndd);
  main.variable(observer("viewof slider2")).define("viewof slider2", ["Inputs"], _slider2);
  main.variable(observer("slider2")).define("slider2", ["Generators", "viewof slider2"], (G, _) => G.input(_));
  main.variable(observer("viewof clicker")).define("viewof clicker", ["Inputs"], _clicker);
  main.variable(observer("clicker")).define("clicker", ["Generators", "viewof clicker"], (G, _) => G.input(_));
  main.variable(observer("delayedDependentAsyncComputation")).define("delayedDependentAsyncComputation", ["clicker","uid"], _delayedDependentAsyncComputation);
  main.variable(observer("viewof runPeriodics")).define("viewof runPeriodics", ["Inputs"], _runPeriodics);
  main.variable(observer("runPeriodics")).define("runPeriodics", ["Generators", "viewof runPeriodics"], (G, _) => G.input(_));
  main.variable(observer("periodicFulfilled")).define("periodicFulfilled", ["runPeriodics","Promises"], _periodicFulfilled);
  main.variable(observer("periodicThrow")).define("periodicThrow", ["periodicFulfilled"], _periodicThrow);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("excludes")).define("excludes", _excludes);
  main.define("initial events", ["reset","WATCHER_PREFIX"], _events);
  main.variable(observer("mutable events")).define("mutable events", ["Mutable", "initial events"], (M, _) => new M(_));
  main.variable(observer("events")).define("events", ["mutable events"], _ => _.generator);
  main.variable(observer("viewof endTime")).define("viewof endTime", ["Inputs"], _endTime);
  main.variable(observer("endTime")).define("endTime", ["Generators", "viewof endTime"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viz")).define("viz", ["endTime","now","windowSecs","reset","events","Plot"], _viz);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("vizHolder")).define("vizHolder", _vizHolder);
  main.variable(observer("vizUpdater")).define("vizUpdater", ["interceptVariables","vizHolder","viz"], _vizUpdater);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof reset")).define("viewof reset", ["Inputs"], _reset);
  main.variable(observer("reset")).define("reset", ["Generators", "viewof reset"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof pause")).define("viewof pause", ["Inputs","viewof endTime","Event"], _pause);
  main.variable(observer("pause")).define("pause", ["Generators", "viewof pause"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof breakpoint")).define("viewof breakpoint", ["Inputs"], _breakpoint);
  main.variable(observer("breakpoint")).define("breakpoint", ["Generators", "viewof breakpoint"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("viewof windowSecs")).define("viewof windowSecs", ["Inputs"], _windowSecs);
  main.variable(observer("windowSecs")).define("windowSecs", ["Generators", "viewof windowSecs"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("modules", child1);
  main.import("variables", child1);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("main")).define("main", ["modules"], _main);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("mainVariables")).define("mainVariables", ["reset","Generators","runtime","main","WATCHER_PREFIX","_","invalidation"], _mainVariables);
  main.variable(observer("mainVariableNames")).define("mainVariableNames", ["mainVariables"], _mainVariableNames);
  main.variable(observer("interceptVariables")).define("interceptVariables", ["mainVariables","interceptVariable","invalidation"], _interceptVariables);
  main.variable(observer("new_veriable_10")).define("new_veriable_10", _new_veriable_10);
  main.variable(observer("notify")).define("notify", ["viewof pause","mutable events","viewof breakpoint"], _notify);
  main.variable(observer("WATCHER_PREFIX")).define("WATCHER_PREFIX", _WATCHER_PREFIX);
  main.variable(observer("uid")).define("uid", _uid);
  main.variable(observer("interceptVariable")).define("interceptVariable", ["excludes","_","notify","WATCHER_PREFIX","uid"], _interceptVariable);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _42);
  return main;
}
