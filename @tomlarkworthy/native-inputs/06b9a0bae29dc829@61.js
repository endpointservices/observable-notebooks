function _1(md){return(
md`# Native inputs`
)}

function _Range(html){return(
options => {
  const ui = html`<input type="range">`;
  Object.keys(options || {}).forEach(option => {
    ui[option] = options[option];
  });
  return ui;
}
)}

function _range(Range)
{
  let that = Range({
    onclick: evt => (that.value = Math.random() * 100),
    value: 10
  });
  return that;
}


function _Div(html){return(
options => {
  const ui = html`<div>`;
  Object.keys(options || {}).forEach(option => {
    ui[option] = options[option];
  });
  return ui;
}
)}

function _Button(html){return(
options => {
  const ui = html`<button>`;
  Object.keys(options || {}).forEach(option => {
    ui[option] = options[option];
  });
  return ui;
}
)}

function _Param(html){return(
options => {
  const ui = html`<param>`;
  Object.keys(options || {}).forEach(option => {
    ui[option] = options[option];
  });
  return ui;
}
)}

function _test(Selec){return(
Selec({
  value: "foo"
})
)}

function _8(test){return(
test
)}

function _9($0){return(
$0.value = "yo"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Range")).define("Range", ["html"], _Range);
  main.variable(observer("viewof range")).define("viewof range", ["Range"], _range);
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer("Div")).define("Div", ["html"], _Div);
  main.variable(observer("Button")).define("Button", ["html"], _Button);
  main.variable(observer("Param")).define("Param", ["html"], _Param);
  main.variable(observer("viewof test")).define("viewof test", ["Selec"], _test);
  main.variable(observer("test")).define("test", ["Generators", "viewof test"], (G, _) => G.input(_));
  main.variable(observer()).define(["test"], _8);
  main.variable(observer()).define(["viewof test"], _9);
  return main;
}
