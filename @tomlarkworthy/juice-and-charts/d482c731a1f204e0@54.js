import define1 from "./653c46ed55693b1f@674.js";
import define2 from "./dea0d0ec849491a6@513.js";

function _1(md){return(
md`# Animating D3 charts with juice`
)}

function _animation(now,$0)
{
  const s = Math.sin(now / 1000);
  const c = Math.cos(now / 1000);
  const data = [];
  for (var i = -5; i <= 5; i++) {
    for (var j = -5; j <= 5; j++) {
      data.push([(i * s + j * c) * 0.1, (i * c - j * s) * 0.1]);
    }
  }
  $0.coords.value = data; // push the data into the view
}


function _world(juice,Scatterplot){return(
juice(Scatterplot, {
  coords: "[0]"
})([], {
  xDomain: [-1, 1],
  yDomain: [-1, 1]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("juice", child1);
  const child2 = runtime.module(define2);
  main.import("Scatterplot", child2);
  main.variable(observer("animation")).define("animation", ["now","viewof world"], _animation);
  main.variable(observer("viewof world")).define("viewof world", ["juice","Scatterplot"], _world);
  main.variable(observer("world")).define("world", ["Generators", "viewof world"], (G, _) => G.input(_));
  return main;
}
