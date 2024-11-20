function _1(md){return(
md`#  👋 Hello, [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine) ⨯ [Plot](https://observablehq.com/plot/) 

\`\`\`js
import {StateMachine, visualizeFsm} from "@tomlarkworthy/fsm"
\`\`\``
)}

async function _StateMachine(){return(
(await import("https://esm.sh/javascript-state-machine@3.1.0"))
  .default
)}

function _visualizeFsm(d3,Plot){return(
(
  fsm,
  {
    layout = (state, index) =>
      d3.pointRadial(((2 - index) * 2 * Math.PI) / fsm.allStates().length, 100)
  } = {}
) => {
  const nodes = new Map(fsm.allStates().map((m, i) => [m, layout(m, i)]));
  const edges = Object.entries(fsm._fsm.config.map).flatMap(
    ([from, transtions], i) =>
      Object.entries(transtions).map(([name, transtion], j) => [
        [from, nodes.get(from)],
        [name, nodes.get(transtion.to)]
      ])
  );
  return Plot.plot({
    inset: 60,
    aspectRatio: 1,
    axis: null,
    marks: [
      Plot.dot(nodes.entries(), {
        x: ([k, c]) => c[0],
        y: ([k, c]) => c[1],
        r: 40,
        stroke: ([k, c]) => (k == fsm.state ? "blue" : "black"),
        strokeWidth: ([k, c]) => (k == fsm.state ? 4 : 2)
      }),
      Plot.arrow(edges, {
        x1: ([[, [x1]]]) => x1,
        y1: ([[, [, y1]]]) => y1,
        x2: ([, [, [x2]]]) => x2,
        y2: ([, [, [, y2]]]) => y2,
        bend: true,
        //strokeWidth: ([, , value]) => value,
        strokeLinejoin: "miter",
        headLength: 24,
        inset: 48
      }),
      Plot.text(nodes.entries(), {
        x: ([k, c]) => c[0],
        y: ([k, c]) => c[1],
        text: ([k, c]) => k
      }),
      Plot.text(edges, {
        x: ([[, [x1, y1]], [, [x2, y2]]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
        y: ([[, [x1, y1]], [, [x2, y2]]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
        text: ([[, [x1, y1]], [label, [x2, y2]]]) => label
      })
    ]
  });
}
)}

function _4(md){return(
md`# Example`
)}

function _5(output,visualizeFsm,fsm){return(
output && visualizeFsm(fsm)
)}

function _output(Inputs){return(
Inputs.text({ label: "output", disabled: true, value: " " })
)}

function _state(output,Inputs,fsm){return(
output &&
  Inputs.text({ label: "state", disabled: true, value: fsm.state })
)}

function _8(output,fsm,htl,Inputs,html){return(
htl.html`<div style="display: flex;">
  ${output && fsm.allTransitions().map((state) => htl.html`<div style="width: 100px">${
    Inputs.button(html`<span style="color: ${!fsm.transitions().includes(state)? 'black': 'green'};">${state}</span>`, {
      reduce: () => fsm[state](),
      width: 100,
      disabled: !fsm.transitions().includes(state)
    })
}`)}
</div>`
)}

function _fsm(StateMachine,$0,Event){return(
new StateMachine({
  init: "solid",
  transitions: [
    { name: "melt", from: "solid", to: "liquid" },
    { name: "freeze", from: "liquid", to: "solid" },
    { name: "vaporize", from: "liquid", to: "gas" },
    { name: "condense", from: "gas", to: "liquid" }
  ],
  methods: {
    onMelt: function () {
      $0.value = "I melted";
    },
    onFreeze: function () {
      $0.value = "I froze";
    },
    onVaporize: function () {
      $0.value = "I vaporized";
    },
    onCondense: function () {
      $0.value = "I condensed";
    },
    // Always trigger dataflow on output cell after a change
    onAfterTransition: () => $0.dispatchEvent(new Event("input"))
  }
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("StateMachine")).define("StateMachine", _StateMachine);
  main.variable(observer("visualizeFsm")).define("visualizeFsm", ["d3","Plot"], _visualizeFsm);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["output","visualizeFsm","fsm"], _5);
  main.variable(observer("viewof output")).define("viewof output", ["Inputs"], _output);
  main.variable(observer("output")).define("output", ["Generators", "viewof output"], (G, _) => G.input(_));
  main.variable(observer("viewof state")).define("viewof state", ["output","Inputs","fsm"], _state);
  main.variable(observer("state")).define("state", ["Generators", "viewof state"], (G, _) => G.input(_));
  main.variable(observer()).define(["output","fsm","htl","Inputs","html"], _8);
  main.variable(observer("fsm")).define("fsm", ["StateMachine","viewof output","Event"], _fsm);
  return main;
}
