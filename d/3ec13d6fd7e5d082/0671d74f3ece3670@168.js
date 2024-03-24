function _1(md){return(
md`# Hello, Viz.js (with a binding to neato)

See [@mbostock/graphviz](/@mbostock/graphviz) for a convenient wrapper. This version uses a web worker, loads Viz.js directly, and loads the “full” renderer rather than the “lite” one.`
)}

function _2(dot){return(
dot`digraph { a -> b }`
)}

function _3(dot){return(
dot`graph G {
    B [label="Hello World" pos="0,1!"]
    A [label=<Hello<I>World</I>>, color=red  pos="0,2!"]
}`
)}

function _4(neato){return(
neato`graph G {
    B [label="Hello World" pos="0,1!"]
    A [label=<Hello<I>World</I>>, color=red  pos="0,2!"]
}`
)}

async function _viz(require)
{
  const Viz = await require("viz.js@2");

  return require
    .resolve("viz.js@2/full.render.js")
    .then(url => fetch(url))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => new Worker(url))
    .then(worker => new Viz({ worker }));
}


function _dot(viz){return(
function dot(strings) {
  let string = strings[0] + "",
    i = 0,
    n = arguments.length;
  while (++i < n) string += arguments[i] + "" + strings[i];
  const svg = document.createElement("span");

  viz.renderSVGElement(string, { engine: 'dot' }).then(node => {
    svg.appendChild(node);
  });
  svg.style.maxWidth = "100%";
  svg.style.height = "auto";
  return svg;
}
)}

function _neato(viz){return(
function neato(strings) {
  let string = strings[0] + "",
    i = 0,
    n = arguments.length;
  while (++i < n) string += arguments[i] + "" + strings[i];
  const svg = document.createElement("span");

  viz.renderSVGElement(string, { engine: 'neato' }).then(node => {
    svg.appendChild(node);
  });
  svg.style.maxWidth = "100%";
  svg.style.height = "auto";
  return svg;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["dot"], _2);
  main.variable(observer()).define(["dot"], _3);
  main.variable(observer()).define(["neato"], _4);
  main.variable(observer("viz")).define("viz", ["require"], _viz);
  main.variable(observer("dot")).define("dot", ["viz"], _dot);
  main.variable(observer("neato")).define("neato", ["viz"], _neato);
  return main;
}
