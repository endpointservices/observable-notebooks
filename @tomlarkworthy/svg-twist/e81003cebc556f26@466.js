import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# SVG Twist`
)}

function* _3(timeseries)
{
  while (true) {
    yield timeseries(Date.now() / 1000);
  }
}


function _timeseries(svg,range){return(
frame => {
  const params = {
    segments: 200.0
  };

  return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 -1.5 3 3" width="100%">
    <style>
      .edge {
        stroke: black;
        stroke-width:0.01;
      }
      .ladder0 {
        stroke: red;
        stroke-width:0.01;
      }
      .ladder1 {
        stroke: green;
        stroke-width:0.01;
      }
      .ladder2 {
        stroke: blue;
        stroke-width:0.01;
      }
    </style>
    ${range(params.segments).map(t100 => {
      const t = (2 * Math.PI * t100) / params.segments;
      const t_step = (2 * Math.PI) / params.segments;

      const f = 3;
      const scale = 0.3;
      const tx3 = t * f;
      const tx3_step = t_step * f;
      return svg.fragment`
        ${range(f).map(tedge => {
          const edge = tedge + frame;
          const offset = (2.0 * Math.PI * edge) / f;
          const offset_step = (2.0 * Math.PI) / f;

          return svg`${
            (tx3 + offset + Math.PI / 3) % (2 * Math.PI) < Math.PI
              ? svg`<line x1=${Math.cos(t) *
                  (1 - Math.cos(tx3 + offset) * scale)}
                y1=${Math.sin(t) * (1 - Math.cos(tx3 + offset) * scale)}
                x2=${Math.cos(t) *
                  (1 - Math.cos(tx3 + offset + offset_step) * scale)}
                y2=${Math.sin(t) *
                  (1 -
                    Math.cos(tx3 + offset + offset_step) *
                      scale)} class="ladder${tedge}"/>`
              : null
          }
            ${
              (tx3 + offset + Math.PI / 3) % (2 * Math.PI) < Math.PI
                ? svg`<line x1=${Math.cos(t) *
                    (1 - Math.cos(tx3 + offset) * scale)}
                y1=${Math.sin(t) * (1 - Math.cos(tx3 + offset) * scale)}
                x2=${Math.cos(t + t_step) *
                  (1 - Math.cos(tx3 + offset) * scale)}
                y2=${Math.sin(t + t_step) *
                  (1 -
                    Math.cos(tx3 + offset) * scale)} class="ladder${tedge}"/>`
                : null
            }
            ${
              (tx3 + offset + Math.PI / 3) % (2 * Math.PI) < Math.PI
                ? svg`
          <line x1=${Math.cos(t) *
            (1 - Math.cos(tx3 + offset + offset_step) * scale)}
                y1=${Math.sin(t) *
                  (1 - Math.cos(tx3 + offset + offset_step) * scale)}
                x2=${Math.cos(t + t_step) *
                  (1 - Math.cos(tx3 + offset + offset_step) * scale)}
                y2=${Math.sin(t + t_step) *
                  (1 -
                    Math.cos(tx3 + offset + offset_step) *
                      scale)} class="ladder${tedge}"/>`
                : null
            }`;
        })}`;
    })}</svg>`;
}
)}

function _range(){return(
(n) => [...Array(n).keys()]
)}

function _7(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.import("svg", child1);
  main.variable(observer()).define(["timeseries"], _3);
  main.variable(observer("timeseries")).define("timeseries", ["svg","range"], _timeseries);
  main.variable(observer("range")).define("range", _range);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _7);
  return main;
}
