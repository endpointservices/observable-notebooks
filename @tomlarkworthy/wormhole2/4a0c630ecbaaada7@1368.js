// https://observablehq.com/@tomlarkworthy/wormhole2@1368
import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./92ff66b718c1972f@141.js";

async function _1(md,FileAttachment){return(
md`# Animated Wormhole V2
Lorentzian Wormholes: _a throat joining two asymptotically flat regions_ [1]
![](${await FileAttachment("image.png").url()})

### References
[1] [_"On the Construction and Traversability of Lorentzian Wormholes"_](https://uu.diva-portal.org/smash/get/diva2:1333284/FULLTEXT01.pdf), Maximilian Svensson
`
)}

function _2(md){return(
md`# Displacement

Let one side be x = +1 and the other x = -1. The width of the throat be _w_. The contours of the wormhole are _u_. At u = 0 we are in the throat. When _u_ is _+ve_ infinity, _x_ is 1 and _r_ is infinity.
`
)}

function _3(md){return(
md`## Contours of wormhole are _theta_ and _u_

Lets figure out equations describing 3d coordinate given _u_ and _theta_. Theta is simple, so lets concentrate on the profile bases on _u_ first.
`
)}

function _4(md){return(
md`Step *u_steps* times from *-u_max* to *+u_max*:`
)}

function _u_in(range,c,u_step){return(
range(c.u_steps).map(x => u_step * x - c.u_max)
)}

function _u_step(c){return(
(c.u_max * 2.0) / (c.u_steps-1)
)}

function _7(md){return(
md`The radius should rapidly increases as we get further from u = 0

I can't figure out the equations in the Physics papers so I will just use two exponetials so away from zero the value is really high.
`
)}

function _r(){return(
u => Math.exp(u) + Math.exp(-u) + 1
)}

function _9(svg,u_in,r){return(
svg`<svg width="300" height="300" viewBox="-10 -10 20 10">
  ${u_in.map(u => svg`<circle cx=${u} cy=${-r(u * 0.4)} r="0.1" />`)}
`
)}

function _10(md){return(
md`The x value should tend towards 1 or -1 as _u_ gets big. I used a neural network sigmoid function`
)}

function _x(){return(
u => Math.exp(u) / (Math.exp(u) + 1)
)}

function _12(svg,u_in,x){return(
svg`<svg width="300" height="300" viewBox="-10 -1 20 1">
  ${u_in.map(u => svg`<circle cx=${u} cy=${-x(u * 0.9)} r="0.1" />`)}
`
)}

function _13(md){return(
md`# Parameterized an put it all together`
)}

function _14(c){return(
c
)}

function _c(verticalSliders)
{
  const names = ["th_steps", "u_max", "u_steps", "m_steps", "line_width", "v", "u", "rx", "ry", "rz", "s"];
  return verticalSliders({
    values: [8, 5.8, 20, 10, 0.001, 22, 0.5, 0.5, 0.31, 24, 3],
    maxs: [100, 10, 50, 20, 1, 100, 1, 1, 1, 100, 10],
    mins: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -10],
    steps: [1, "any", 1, 1, "any", "any", "any", "any", "any", "any", "any"],
    names,
    labels: names
  })
}


function _wormhole(wormholeFrame,c,now){return(
wormholeFrame(c.s*now / 1000)
)}

function _xyz(c,r,x){return(
([th, u]) => [
  Math.sin(th * Math.PI * 2 / c.th_steps) * r(u),
  Math.cos(th * Math.PI * 2 / c.th_steps) * r(u),
  -x(u)
]
)}

function _view(c){return(
([x, y, z]) => [
  x * c.rx,
  y * c.ry + z * c.rz + c.rz
]
)}

function _loop(c,u_step){return(
c.s*u_step * 2
)}

function _wormholeFrame(svg,c,cartesian,u_in,range,e_eq,u_step,view,xyz,d3,steps)
{
  return (t) => svg`<svg xmlns="http://www.w3.org/2000/svg"
                         width="400"
                         height="400"
                         viewBox="${-c.v} ${-c.v} ${2*c.v} ${2*c.v}">
    <style>
      polygon {
        stroke-width: ${c.line_width}px
      }
    </style>
    <rect x=${-c.v} y=${-c.v} width=${2*c.v} height=${2*c.v} style="fill:black" />
    ${cartesian(u_in, range(c.th_steps)).map(([u_base, th]) => {
      if (e_eq(u_base, c.u_max)) return;
      const u = u_base + -t % (2 * u_step);
    debugger;
      // The 4 corners
      const s = view(xyz([th, u]))
      const s_th = view(xyz([th + 1, u]))
      const s_u_th  = view(xyz([th + 1, u + u_step]))
      const s_u  = view(xyz([th, u + u_step]))
      const u_i = u_in.indexOf(u_base)
      // Now make a filled polygon using microsteps
      return svg.fragment`
        <polygon 
            fill=${((u_i + th) % 2) ? d3.interpolateGreys(1 - Math.abs(u) / c.u_max) : "black"} stroke="red"
            points="
              ${steps(th, th + 1,    c.m_steps).map(th_i => view(xyz([th_i  , u])).join())}
              ${steps(u, u + u_step, c.m_steps).map( u_i => view(xyz([th + 1, u_i])).join())}
              ${steps(th + 1, th,    c.m_steps).map(th_i => view(xyz([th_i, u + u_step])).join())}
              ${steps(u + u_step, u, c.m_steps).map( u_i => view(xyz([th, u_i])).join())}
            "
        />
      `
    })}
  </svg>`
}


function _21(cartesian,range,u_in){return(
cartesian(range(3), u_in)
)}

function _steps(){return(
(from, to, steps) => Array(steps).fill(0).map((_, i) => i * (to - from) / steps + from)
)}

function _range(){return(
(n) => Array(n).fill(0).map((_, i) => i)
)}

function _vrange(cartesian,range){return(
(array) => cartesian(...array.map(d => range(d)))
)}

function _cartesian(){return(
(...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))
)}

function _e_eq(){return(
(a, b) => a > b - 0.0001 && a < b + 0.0001
)}

function _d3(require){return(
require("d3-scale-chromatic@1", "d3-interpolate@1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/9badbb3ed24bab8a12d07e93bfef4299e0119ef57b435f7ce2fcc6d99b7bc720f91eff2021d72036b7d89417c7d619b465ee12daad440e0e36d95437fd505456.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("u_in")).define("u_in", ["range","c","u_step"], _u_in);
  main.variable(observer("u_step")).define("u_step", ["c"], _u_step);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("r")).define("r", _r);
  main.variable(observer()).define(["svg","u_in","r"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("x")).define("x", _x);
  main.variable(observer()).define(["svg","u_in","x"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["c"], _14);
  main.variable(observer("viewof c")).define("viewof c", ["verticalSliders"], _c);
  main.variable(observer("c")).define("c", ["Generators", "viewof c"], (G, _) => G.input(_));
  main.variable(observer("wormhole")).define("wormhole", ["wormholeFrame","c","now"], _wormhole);
  main.variable(observer("xyz")).define("xyz", ["c","r","x"], _xyz);
  main.variable(observer("view")).define("view", ["c"], _view);
  main.variable(observer("loop")).define("loop", ["c","u_step"], _loop);
  main.variable(observer("wormholeFrame")).define("wormholeFrame", ["svg","c","cartesian","u_in","range","e_eq","u_step","view","xyz","d3","steps"], _wormholeFrame);
  main.variable(observer()).define(["cartesian","range","u_in"], _21);
  main.variable(observer("steps")).define("steps", _steps);
  main.variable(observer("range")).define("range", _range);
  main.variable(observer("vrange")).define("vrange", ["cartesian","range"], _vrange);
  main.variable(observer("cartesian")).define("cartesian", _cartesian);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.variable(observer("e_eq")).define("e_eq", _e_eq);
  const child2 = runtime.module(define2);
  main.import("svg", child2);
  const child3 = runtime.module(define3);
  main.import("verticalSliders", child3);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
