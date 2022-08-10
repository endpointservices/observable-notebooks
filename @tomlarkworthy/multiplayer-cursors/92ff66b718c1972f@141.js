// https://observablehq.com/@tomlarkworthy/vertical-sliders@141
import define1 from "./21f9b5d8b377a751@205.js";

function _1(md){return(
md`# Vertical Sliders

Put all your controls into a single row for less vertical scrolling

~~~js
import {verticalSliders} from '@tomlarkworthy/vertical-sliders'
~~~

Supported fields in the config are _mins, maxs, steps, values, names, labels_

~~~js
viewof color = verticalSliders({
  names: ["r", "g", "b"],
  labels:["red", "green", "blue"],
  maxs:  [255,255,255],
  steps: [1,1,1]
})
~~~

Vertical sliders were used in [@tomlarkworthy/wormhole2](https://observablehq.com/@tomlarkworthy/wormhole2)
`
)}

function _verticalSliders(form,html){return(
function verticalSliders(config = {}) {
  const len = (arr) => arr ? arr.length : undefined;
  let {
    n = len(config.values) ||
        len(config.mins) ||
        len(config.maxs) ||
        len(config.values) || 
        len(config.names) || 
        len(config.labels) || 
        1,
    mins = Array(n).fill(0),
    maxs = Array(n).fill(1),
    steps = Array(n).fill("any"),
    values = mins.map((min, idx) => (maxs[idx] + min) / 2),
    names = Array(n).fill(0).map((_, idx) => `${idx}`),
    labels = Array(n).fill("")
  } = config;
  return form(html`<form>
    <style>
      input[type=range][orient=vertical]
      {
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
        width: 8px;
        height: 175px;
        padding: 0 5px;
      }
    </style>
    <table style="table-layout: fixed; width:100%;text-align:center;">
    <tfoot>
      <tr style="font-size: 0.85rem;font-style:italic;">
        ${labels.map(label => html`<td>${label}</td>`)}
      </tr>
    </tfoot>
    <tbody>
      <tr>
        ${Array(n).fill(0).map((_, idx) => html`<td><input
          type=range
          name=${names[idx]}
          step=${steps[idx]}
          min=${mins[idx]}
          max=${maxs[idx]}
          value="${values[idx]}"
          orient=vertical></td>`)}
      </tr>
    </tbody></table>`)
}
)}

function _demo(verticalSliders,now){return(
verticalSliders({
  values: Array(30).fill(0).map((_, i) => Math.sin(i/3 + now/500) / 2 + 0.5),
  labels: Array(30).fill(0).map((_, i) => i)
})
)}

function _4(html,color){return(
html`<div style="height: 50px;width: 50px;background-color: rgb(${color.r}, ${color.g}, ${color.b});"></div>`
)}

function _5(color){return(
color
)}

function _color(verticalSliders){return(
verticalSliders({
  names: ["r", "g", "b"],
  labels:["red", "green", "blue"],
  maxs:  [255,255,255],
  steps: [1,1,1]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("verticalSliders")).define("verticalSliders", ["form","html"], _verticalSliders);
  main.variable(observer("viewof demo")).define("viewof demo", ["verticalSliders","now"], _demo);
  main.variable(observer("demo")).define("demo", ["Generators", "viewof demo"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","color"], _4);
  main.variable(observer()).define(["color"], _5);
  main.variable(observer("viewof color")).define("viewof color", ["verticalSliders"], _color);
  main.variable(observer("color")).define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("form", child1);
  return main;
}
