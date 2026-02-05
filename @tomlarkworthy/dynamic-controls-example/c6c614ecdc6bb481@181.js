// https://observablehq.com/@tomlarkworthy/dynamic-controls-example@181
import define1 from "./f92778131fd76559@1212.js";

function _1(md){return(
md`# Dynamic Controls Example`
)}

function _values(view,Inputs)
{
  const ui = view`
    ${["elements", [], (value) => Inputs.range([0, 1], { value: value })]}
    <div style="display: flex;">
      ${Inputs.button("add", {
        reduce: () => ui.value.elements.push(Math.random())
      })}
      ${Inputs.button("remove", {
        reduce: () => ui.value.elements.pop()
      })}
    </div>
  `;
  return ui;
}


function _4(values){return(
values
)}

function _5(md){return(
md`## Q: How do I create multiple linked views?`
)}

function _builder(view,Inputs,Event){return(
({ source } = {}) => {
  const ui = view`
    ${["elements", [], (value) => Inputs.range([0, 1], { value: value })]}
    <div style="display: flex;">
      ${Inputs.button("add", {
        reduce: () => ui.value.elements.push(Math.random())
      })}
      ${Inputs.button("remove", {
        reduce: () => ui.value.elements.pop()
      })}
    </div>
  `;

  if (source) {
    ui.value = source.value;
    source.addEventListener("input", () => {
      source.value.elements.forEach((v, i) => {
        // Bug fix for twitchy events, you must not set the target if its the corrent value already
        // In the case of the target changing, the is avoid the source setting the target after being changed itself
        if (ui.value.elements[i] != v) ui.value.elements[i] = v;
      });
      ui.value.elements.splice(
        // Deal with the case someone deleted an element
        source.value.elements.length,
        ui.value.elements.length - source.value.elements.length
      );
    });
    ui.addEventListener("input", () => {
      ui.value.elements.forEach((v, i) => {
        source.value.elements[i] = v; // Straight assignment to source
      });
      source.value.elements.splice(
        // Deal with the case someone deleted an element
        ui.value.elements.length,
        source.value.elements.length - ui.value.elements.length
      );
      // Retrigger source when target changes
      // Same asymetric operation as Inputs.bind
      source.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  return ui;
}
)}

function _target(builder,$0){return(
builder({
  source: $0
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer("viewof values")).define("viewof values", ["view","Inputs"], _values);
  main.variable(observer("values")).define("values", ["Generators", "viewof values"], (G, _) => G.input(_));
  main.variable(observer()).define(["values"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("builder")).define("builder", ["view","Inputs","Event"], _builder);
  main.variable(observer("viewof target")).define("viewof target", ["builder","viewof values"], _target);
  main.variable(observer("target")).define("target", ["Generators", "viewof target"], (G, _) => G.input(_));
  return main;
}
