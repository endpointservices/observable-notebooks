function _1(md){return(
md`# Literate Object

Prototype for an idea of configuring the visual representation of an object. Note observable CSS appears to be accessible within a user notebook.
`
)}

function _literateObject(html){return(
function literateObject(obj, mask = {}) {
  const ui = html`<span class="observablehq--expanded observablehq--inspect"><span class="observablehq--cellname">sample = </span><a><svg width="8" height="8" class="observablehq--caret">
    <path d="M4 7L0 1h8z" fill="currentColor"></path>
  </svg>Object {</a><div class="observablehq--field"><span class="observablehq--key">  str</span>: <span><span class="observablehq--string">"foo"</span></span></div><div class="observablehq--field"><span class="observablehq--key">  number</span>: <span><span class="observablehq--number">1</span></span></div><div class="observablehq--field"><span class="observablehq--key">  object</span>: <span class="observablehq--expanded"><a><svg width="8" height="8" class="observablehq--caret">
    <path d="M4 7L0 1h8z" fill="currentColor"></path>
  </svg>Object {</a><div class="observablehq--field"><span class="observablehq--key">  f1</span>: <span><span class="observablehq--string">"v1"</span></span></div>}</span></div>}</span>`;
  ui.value = obj;
  return ui;
}
)}

function _sample(literateObject){return(
literateObject({ str: "foo", number: 1, object: { f1: "v1" } })
)}

function _4(sample){return(
sample
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("literateObject")).define("literateObject", ["html"], _literateObject);
  main.variable(observer("viewof sample")).define("viewof sample", ["literateObject"], _sample);
  main.variable(observer("sample")).define("sample", ["Generators", "viewof sample"], (G, _) => G.input(_));
  main.variable(observer()).define(["sample"], _4);
  return main;
}
