// https://observablehq.com/@endpointservices/logo@223
import define1 from "./11a5ab8b1b3a51db@1160.js";
import define2 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/ecc59a281521628992c0d5de8207e9003802be7b508cefcbfecb1a10e0fa55e442c8dd3298585d729fcc6ee47b54b9c0f715c185e03c4845af3a8dba6106030e",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Endpoint Services Logo

Its gotta be designed here in SVG of course. A unit cube inside a unit circle, colored orthogonally. 

`
)});
  main.variable(observer()).define(["logo"], function(logo){return(
logo("80px")
)});
  main.variable(observer()).define(["logo"], function(logo){return(
logo("512px")
)});
  main.variable(observer("logo")).define("logo", ["svg","range"], function(svg,range){return(
(size) => {
  const face_letter_fill = ['red','green','blue'];
  
  const x_to_screen = (x) => [ 0.7 * x,  0.4 * x];
  const y_to_screen = (y) => [ 0.7 * y, -0.4 * y];
  const z_to_screen = (z) => [ 0,  -z];
   
  const world_to_screen = (w) => {
    const x_s = x_to_screen(w[0]);
    const y_s = y_to_screen(w[1]);
    const z_s = z_to_screen(w[2]);
    return [x_s[0] + y_s[0] + z_s[0], x_s[1] + y_s[1] + z_s[1]]
  };
  
  function dimSwap(vertex, face) {
    if (face === 0) return [vertex[0], vertex[1], vertex[2]];
    if (face === 1) return [vertex[1], vertex[2], vertex[0]];
    if (face === 2) return [vertex[2], vertex[0]-1, vertex[1]];
  }
  
  const inner = 0.24;
  const innerEdge = 1 - inner;
  
  // Figure out middle
  const v0_1_0 = world_to_screen([0, 1, 0]);
  const v1_0_1 = world_to_screen([1, 0, 1]);
  const cx = v1_0_1[0];
  const cy = (v1_0_1[1] + v0_1_0[1]) * 0.5;
  
  return svg`<svg width=${size}  viewBox="${cx - 1} ${cy - 1} 2 2" >
    <circle 
      cx=${cx} cy=${cy} r="1"
      fill="black"
    />

    ${range(3).map(face => svg`<polygon
      fill=${face_letter_fill[face]}
      stroke="white"
      stroke-width="0.03"
      stroke-linejoin="round"
      points="
        ${world_to_screen(dimSwap([1, 0,     1],                 face)).join()}
        ${world_to_screen(dimSwap([1, 1,     1],                 face)).join()}
        ${world_to_screen(dimSwap([1, 1,     innerEdge],         face)).join()}
        ${world_to_screen(dimSwap([1, inner, innerEdge],         face)).join()}
        ${world_to_screen(dimSwap([1, inner, 0.5 + 0.5 * inner], face)).join()}
        ${world_to_screen(dimSwap([1, 1,     0.5 + 0.5 * inner], face)).join()}
        ${world_to_screen(dimSwap([1, 1,     0.5 - 0.5 * inner], face)).join()}
        ${world_to_screen(dimSwap([1, inner, 0.5 - 0.5 * inner], face)).join()}
        ${world_to_screen(dimSwap([1, inner, inner],             face)).join()}
        ${world_to_screen(dimSwap([1, 1,     inner],             face)).join()}
        ${world_to_screen(dimSwap([1, 1,     0],                 face)).join()}
        ${world_to_screen(dimSwap([1, 0,     0],                 face)).join()}
      "
    />`)}
  </svg>`
}
)});
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.import("svg", child1);
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`
source: http://www.math.brown.edu/tbanchof/Beyond3d/chapter8/section01.html
![Cube coordinates](${await FileAttachment("image.png").url()})`
)});
  main.variable(observer("range")).define("range", function(){return(
(n) => Array(n).fill(0).map((_, i) => i)
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}