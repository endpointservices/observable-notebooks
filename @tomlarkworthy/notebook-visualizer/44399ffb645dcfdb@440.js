// https://observablehq.com/@tomlarkworthy/notebook-visualizer@440
import define1 from "./a2e58f97fd5e8d7c@756.js";
import define2 from "./048a17a165be198d@264.js";

function _1(md,id){return(
md`# Notebook Visualizer for Teams

To use, paste the URL of a public or shared notebook below, or type and click submit. For more on what this graph means, see [How Observable Runs](/@observablehq/how-observable-runs). Use the cell menu <svg viewBox="0 0 8 14" fill="currentColor" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="8" height="14"><circle r="1.5" cx="4" cy="2"></circle><circle r="1.5" cx="4" cy="7"></circle><circle r="1.5" cx="4" cy="12"></circle></svg> below to save your graph as PNG or SVG if desired.

To share a link to your dependency graph, [click here](?id=${id}).`
)}

function _id(Text,location,Promises,Event)
{
  const text = Text({
    value: new URL(location).searchParams.get("id") || "@mbostock/liquidfun",
    submit: true,
    label: "Notebook"
  });
  const input = text.querySelector("input");
  input.addEventListener("input", (event) => {
    let v = input.value, m;
    if (m = /\.js(\?|$)/i.exec(v)) v = v.slice(0, m.index);
    if (m = /^[0-9a-f]{16}$/i.test(v)) v = `d/${v}`;
    if (m = /^https:\/\/(api\.|beta\.|)observablehq\.com\//i.exec(v)) v = v.slice(m[0].length);
    if (v !== input.value) input.value = v;
  });
  input.addEventListener("paste", (event) => {
    Promises.delay(50).then(() => {
      text.dispatchEvent(new Event("submit", {bubbles: true, cancelable: true}));
    });
  });
  return text;
}


function _orient(Select){return(
Select(new Map([
  ["left-to-right", "LR"],
  ["right-to-left", "RL"],
  ["top-to-bottom", "TB"],
  ["bottom-to-top", "BT"],
]), {label: "Orientation"})
)}

function _includes(Checkbox){return(
Checkbox(new Map([
  ["anonymous cells", "anon"],
  ["builtins", "builtin"]
]), {label: "Show"})
)}

function _apiKey(localStorageView,Inputs,html)
{
  const l = localStorageView('API_KEY');
  const i = Inputs.text({
    label: 'API key',
    submit: true,
    value: l.value
  });
  Inputs.bind(i, l);

  i.style.cssText += 'margin-top:.5em';
  const w = html`<details ${i.value ? 'open' : ''}>
    <summary style="font:13px var(--sans-serif);cursor:default">Enable access to private or team notebooks (<a href="https://observablehq.com/@observablehq/api-keys">learn more</a>)</summary>
    ${i}
  `;
  return Object.defineProperty(w, 'value', {
    get: () => i.value,
    set: v => (i.value = v)
  });
}


function _chart(dot,id,orient,variables,main){return(
dot`digraph "${id}" {
node [fontname="var(--sans-serif)" fontsize=12];
edge [fontname="var(--sans-serif)" fontsize=12];
rankdir = ${orient};
${Array.from(variables, v => `${v._id} [label = "${v._name || `#${v._id}`}"${v._module === main._runtime._builtin ? `, color = "gray", fontcolor = "#555555"` : ""}]; ${v._inputs.map(i => `${i._id} -> ${v._id} ${v._module !== i._module ? `[color = "#20b2aa"]` : ""};`).join(" ")}`).join("\n")}
}`
)}

function _7(md){return(
md`---`
)}

function _main(id,apiKey,Runtime,includes){return(
import(`https://api.observablehq.com/${id}.js?v=3${
  apiKey == null ? '' : `&api_key=${apiKey}`
}`).then(async ({ default: define }) => {
  const runtime = new Runtime();
  const main = runtime.module(
    define,
    name => includes.includes("anon") || name
  );
  await runtime._compute();
  runtime.dispose();
  return main;
})
)}

function _variables(main,isimport,includes){return(
Array.from(main._runtime._variables, (v, i) => (v._id = i, v))
  .filter(v => !isimport(v) && v._reachable)
  .filter(v => includes.includes("anon") || v._name !== null)
  .filter(v => includes.includes("builtin") || v._module !== main._runtime._builtin)
  .map(v => ({
    _module: v._module,
    _name: v._name,
    _id: v._id,
    _inputs: v._inputs
      .map(i => isimport(i) ? i._inputs[0] : i)
      .filter(i => includes.includes("builtin") || i._module !== main._runtime._builtin)
  }))
)}

function _isimport(){return(
v => v._inputs.length === 1 && v._module !== v._inputs[0]._module
)}

async function _Runtime(require){return(
(await require("@observablehq/runtime@4")).Runtime
)}

function _dot(require){return(
require("@observablehq/graphviz@0.2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","id"], _1);
  main.variable(observer("viewof id")).define("viewof id", ["Text","location","Promises","Event"], _id);
  main.variable(observer("id")).define("id", ["Generators", "viewof id"], (G, _) => G.input(_));
  main.variable(observer("viewof orient")).define("viewof orient", ["Select"], _orient);
  main.variable(observer("orient")).define("orient", ["Generators", "viewof orient"], (G, _) => G.input(_));
  main.variable(observer("viewof includes")).define("viewof includes", ["Checkbox"], _includes);
  main.variable(observer("includes")).define("includes", ["Generators", "viewof includes"], (G, _) => G.input(_));
  main.variable(observer("viewof apiKey")).define("viewof apiKey", ["localStorageView","Inputs","html"], _apiKey);
  main.variable(observer("apiKey")).define("apiKey", ["Generators", "viewof apiKey"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["dot","id","orient","variables","main"], _chart);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("main")).define("main", ["id","apiKey","Runtime","includes"], _main);
  main.variable(observer("variables")).define("variables", ["main","isimport","includes"], _variables);
  main.variable(observer("isimport")).define("isimport", _isimport);
  main.variable(observer("Runtime")).define("Runtime", ["require"], _Runtime);
  const child1 = runtime.module(define1);
  main.import("Text", child1);
  main.import("Select", child1);
  main.import("Checkbox", child1);
  main.variable(observer("dot")).define("dot", ["require"], _dot);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  return main;
}
