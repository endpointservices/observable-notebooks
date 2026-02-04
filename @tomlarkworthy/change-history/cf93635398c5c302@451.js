import define1 from "./f109935193c0deba@4551.js";
import define2 from "./8381f40adb144e29@52.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./a2a7845a5e2a5aec@139.js";
import define5 from "./f8aabe0def7ada25@486.js";

function _1(md){return(
md`# Change History

[jumpgate](https://observablehq.com/@tomlarkworthy/jumpgate?source=https://observablehq.com/@tomlarkworthy/change-history&export_state=%7B%22hash%22%3A%22%23view%3D%40tomlarkworthy%2Fchange-history%22%2C%22headless%22%3Atrue%2C%22title%22%3A%22%40tomlarkworthy%2Fchange-history%22%7D&git_url=https%3A%2F%2Fgithub.com%2Ftomlarkworthy%2Flopecode&load_source=true&commit=false)`
)}

function _2(htl){return(
htl.html`<details><summary>video demo</summary>
  <lite-youtube videoid="V8bToPxvx3M" playlabel="Change History Demo"></lite-youtube>
</details>`
)}

function _temporal(Inputs){return(
Inputs.select(["temporal", "discrete"], {
  label: "y-axis",
  value: "discrete"
})
)}

function _rewind(Plot,width,temporal,d3,history,timeline)
{
  return Plot.plot({
    marginLeft: 200,
    width,
    y: {
      type: temporal == "temporal" ? "time" : "point",
      reverse: true
    },
    marks: [
      Plot.ruleY([d3.max(history, (d) => d.t)], {
        stroke: "green"
      }),
      Plot.ruleX(history, {
        x: "_name",
        strokeDasharray: [1, 10]
      }),
      Plot.dot(history, {
        x: "_name",
        y: "t",
        symbol: "type",
        stroke: "_name"
      }),
      Plot.ruleY(
        temporal == "temporal" ? timeline : history.map((e) => e.t),
        Plot.pointerY({ stroke: "red" })
      )
    ]
  });
}


function _rewindButton(Inputs,rewindToTime,rewind){return(
Inputs.button("rewind to time", {
  reduce: () => rewindToTime(rewind),
  disabled: !rewind
})
)}

function _selected(Inputs,history,inspect){return(
Inputs.table(history, {
  layout: "auto",
  required: false,
  sort: "t",
  reverse: true,
  format: {
    t: (ts) => new Date(ts).toISOString(),
    previous: inspect
  }
})
)}

function _7(selected,Inputs,revertVariables,md){return(
selected.length
  ? Inputs.button("revert variables", {
      reduce: () => revertVariables(selected)
    })
  : md`⚠️ select some variables to revert individual cells`
)}

function _change_me(){return(
"dsdsds"
)}

function _9(md){return(
md`## Function`
)}

function _revertVariables(){return(
(entries) => {
  entries.forEach(({ variable, previous }) => {
    variable.define(previous._name, previous._inputs, previous._definition);
  });
}
)}

function _rewindToTime(history,revertVariables){return(
function (time) {
  const byVariable = new Map();
  for (const entry of history) {
    if (entry.t > time) {
      const key = entry.variable;
      if (!byVariable.has(key)) byVariable.set(key, entry);
    }
  }
  revertVariables(Array.from(byVariable.values()));
}
)}

function _12(md){return(
md`## State`
)}

function _history(Inputs,invalidation,onCodeChange,sha1,Event)
{
  const buffer = this?.value || [];
  const view = Inputs.input(buffer);

  invalidation.then(
    onCodeChange(({ variable, previous }) => {
      if (variable._type == 2) return; // Ignore IMPLICIT
      if (!previous)
        // assign a lineage so we can follow
        variable.lineage = sha1(
          variable._definition.toString() + variable._name
        );
      if (!previous) return; // Not useful getting initial state, its in previous
      if (previous._inputs.find((i) => i == "@variable")) return; // ignore variables that redefine themselves (imports)
      buffer.push({
        t: Date.now(),
        type: previous == null ? "INITIAL" : "CHANGE",
        variable,
        previous,
        _module: variable._module,
        _name: variable._name || variable.lineage,
        _inputs: variable._inputs.map((i) => i._name),
        _definition: variable._definition
      });

      view.dispatchEvent(new Event("input"));
    })
  );
  return view;
}


function _14(robocoop){return(
robocoop
)}

function _16(md){return(
md`## Utils`
)}

function _17(lite_youtube_css){return(
lite_youtube_css
)}

function _timeline(history)
{
  const first = history.at(0) || 0;
  const last = history.at(-1) || 0;
  const factor = (last.t - first.t) / 1024;
  return Array.from({ length: 1024 }).map((_, i) =>
    Math.floor(first.t + i * factor)
  );
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer("viewof temporal")).define("viewof temporal", ["Inputs"], _temporal);
  main.variable(observer("temporal")).define("temporal", ["Generators", "viewof temporal"], (G, _) => G.input(_));
  main.variable(observer("viewof rewind")).define("viewof rewind", ["Plot","width","temporal","d3","history","timeline"], _rewind);
  main.variable(observer("rewind")).define("rewind", ["Generators", "viewof rewind"], (G, _) => G.input(_));
  main.variable(observer("rewindButton")).define("rewindButton", ["Inputs","rewindToTime","rewind"], _rewindButton);
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs","history","inspect"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["selected","Inputs","revertVariables","md"], _7);
  main.variable(observer("change_me")).define("change_me", _change_me);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("revertVariables")).define("revertVariables", _revertVariables);
  main.variable(observer("rewindToTime")).define("rewindToTime", ["history","revertVariables"], _rewindToTime);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs","invalidation","onCodeChange","sha1","Event"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer()).define(["robocoop"], _14);
  const child1 = runtime.module(define1);
  main.import("robocoop", child1);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["lite_youtube_css"], _17);
  main.variable(observer("timeline")).define("timeline", ["history"], _timeline);
  const child2 = runtime.module(define2);
  main.import("lite_youtube_css", child2);
  const child3 = runtime.module(define3);
  main.import("onCodeChange", child3);
  main.import("runtime", child3);
  const child4 = runtime.module(define4);
  main.import("inspect", child4);
  main.import("Inspector", child4);
  const child5 = runtime.module(define5);
  main.import("sha1", child5);
  return main;
}
