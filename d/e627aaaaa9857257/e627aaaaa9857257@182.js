import define1 from "./38a22fd9c3d0ef68@285.js";

function _1(md){return(
md`# Direct Manipulation Plot


In a [Future of Coding conversation](https://akkartik.name/archives/foc/linking-together/1721317807.883659.html) provoked by the blog [Where Should Visual Programming Go?](https://tonsky.me/blog/diagrams/) I argued that great visualization tools like \`Plot\` were the Future of Coding. However, some disagreed becuase it is "only" a data/data -> viz transformation, and *true* Future of Code tools would support direct manipulation for the inverse. That made we wonder if it is possible to "invert" visual tools into a direct manipulation tools in a methodical way? I have had some success repurposing UI inputs [in other contexts](https://observablehq.com/@tomlarkworthy/juice), but this would be the next level.

I think Plot has a good shot at this because it is built on **grammar of graphics** principles. Plot exports the scales, thus Plot offers a very clear \`data => pixel\` transform. For direct manipulation we will need to go from pixel space (e.g. mouse clicks) to data space. Plot is also very expressive, supporting different types of data (ordinal, continuous) and multi-variate (facets) and put together by experienced data experts. If Plot can be transformed into direct manipulation, it seems like most thing could.
`
)}

function _3(md){return(
md`## Sensing Input`
)}

function _x(Inputs){return(
Inputs.input([
  [0, 1],
  [1, 2],
  [1, 0]
])
)}

function _width(Inputs){return(
Inputs.range([0, 10], { label: "width" })
)}

function _diagram(Plot,width,x){return(
Plot.plot({
  x: {
    domain: [0, width]
  },
  y: {
    domain: [0, 10]
  },
  marks: [
    Plot.dot(x, { x: (d) => d[0], y: (d) => d[1], value: true }),
    Plot.dot(
      x,
      Plot.pointer({
        x: (d) => d[0],
        y: (d) => d[1],
        fill: "red",
        r: 8
      })
    )
  ]
})
)}

function _7(diagram){return(
diagram
)}

function _pressX(scaleX,mousedown){return(
scaleX.invert(mousedown.offsetX)
)}

function _pressY(scaleY,mousedown){return(
scaleY.invert(mousedown.offsetY)
)}

function _mousedown(Generators,$0){return(
Generators.observe((notify) => {
  $0.addEventListener("mousedown", notify);
  $0.addEventListener("touchdown", notify);
})
)}

function _11(Plot){return(
Plot.pointer({
  x: (d) => d[0],
  y: (d) => d[1],
  fill: "red",
  r: 8
})
)}

function _pointermove(Generators,$0){return(
Generators.observe((notify) => {
  $0.addEventListener("pointermove", notify);
})
)}

function _p(Plot){return(
Plot.plot({})
)}

function _scaleX($0){return(
$0.scale("x")
)}

function _scaleY($0){return(
$0.scale("y")
)}

function _16($0){return(
$0
)}

function _pointerdown(Generators,$0){return(
Generators.observe((notify) => {
  $0.addEventListener("pointerdown", notify);
})
)}

function _18($0,pressX,pressY,Event)
{
  $0.value.push([pressX, pressY]);
  $0.dispatchEvent(new Event("input"));
  return $0.value;
}


function _event(Generators,$0){return(
Generators.observe((notify) => {
  $0.addEventListener("input", notify);
})
)}

function _matrix(){return(
[
  [3, 2, 5],
  [1, 7, 2],
  [1, 1, 8]
]
)}

function _nodes(matrix,d3){return(
matrix.map((m, i) =>
  d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100)
)
)}

function _edges(matrix,nodes){return(
matrix.flatMap((m, i) =>
  m.map((value, j) => [nodes[i], nodes[j], value])
)
)}

function _23(Plot,nodes,edges){return(
Plot.plot({
  inset: 60,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.dot(nodes, { r: 40 }),
    Plot.arrow(edges, {
      x1: ([[x1]]) => x1,
      y1: ([[, y1]]) => y1,
      x2: ([, [x2]]) => x2,
      y2: ([, [, y2]]) => y2,
      bend: true,
      strokeWidth: ([, , value]) => value,
      strokeLinejoin: "miter",
      headLength: 24,
      inset: 48
    }),
    Plot.text(nodes, { text: ["A", "B", "C"], dy: 12 }),
    Plot.text(edges, {
      x: ([[x1, y1], [x2, y2]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
      y: ([[x1, y1], [x2, y2]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
      text: ([, , value]) => value
    })
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("StateMachine", child1);
  main.import("visualizeFsm", child1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof x")).define("viewof x", ["Inputs"], _x);
  main.variable(observer("x")).define("x", ["Generators", "viewof x"], (G, _) => G.input(_));
  main.variable(observer("viewof width")).define("viewof width", ["Inputs"], _width);
  main.variable(observer("width")).define("width", ["Generators", "viewof width"], (G, _) => G.input(_));
  main.variable(observer("viewof diagram")).define("viewof diagram", ["Plot","width","x"], _diagram);
  main.variable(observer("diagram")).define("diagram", ["Generators", "viewof diagram"], (G, _) => G.input(_));
  main.variable(observer()).define(["diagram"], _7);
  main.variable(observer("pressX")).define("pressX", ["scaleX","mousedown"], _pressX);
  main.variable(observer("pressY")).define("pressY", ["scaleY","mousedown"], _pressY);
  main.variable(observer("mousedown")).define("mousedown", ["Generators","viewof diagram"], _mousedown);
  main.variable(observer()).define(["Plot"], _11);
  main.variable(observer("pointermove")).define("pointermove", ["Generators","viewof diagram"], _pointermove);
  main.variable(observer("p")).define("p", ["Plot"], _p);
  main.variable(observer("scaleX")).define("scaleX", ["viewof diagram"], _scaleX);
  main.variable(observer("scaleY")).define("scaleY", ["viewof diagram"], _scaleY);
  main.variable(observer()).define(["viewof diagram"], _16);
  main.variable(observer("pointerdown")).define("pointerdown", ["Generators","viewof diagram"], _pointerdown);
  main.variable(observer()).define(["viewof x","pressX","pressY","Event"], _18);
  main.variable(observer("event")).define("event", ["Generators","viewof diagram"], _event);
  main.variable(observer("matrix")).define("matrix", _matrix);
  main.variable(observer("nodes")).define("nodes", ["matrix","d3"], _nodes);
  main.variable(observer("edges")).define("edges", ["matrix","nodes"], _edges);
  main.variable(observer()).define(["Plot","nodes","edges"], _23);
  return main;
}
