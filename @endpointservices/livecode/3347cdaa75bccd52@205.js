// https://observablehq.com/@observablehq/plot-vector@205
import define1 from "./316b246fa1642db4@283.js";
import define2 from "./19c9e8baf0415fa7@62.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none">Vector Mark / Observable Plot</h1><a href="/@observablehq/plot">Observable Plot</a> › <a href="/@observablehq/plot-marks">Marks</a> › Vector · <a href="https://github.com/observablehq/plot/blob/main/README.md#vector">API</a></div>

# Plot: Vector

The **vector** mark represents data as little arrows, typically positioned in *x* and *y* quantitative dimensions, with a given magnitude (*length*) and direction (*rotate*), as in a vector field. For example, the plot below shows the wind speed and direction for a section of western Europe. (Based on a [LitVis example](https://github.com/gicentre/litvis/blob/master/examples/windVectors.md).)`
)}

function _wind(FileAttachment){return(
FileAttachment("windgrid.csv").csv({typed: true})
)}

function _3(Plot,wind){return(
Plot.plot({
  inset: 10,
  width: 1152,
  height: 870, // for a rougly equirectangular projection
  color: {
    scheme: "viridis",
    label: "Speed (m/s)",
    zero: true,
    legend: true
  },
  marks: [
    Plot.vector(wind, {
      x: "longitude",
      y: "latitude",
      rotate: ({u, v}) => Math.atan2(u, v) * 180 / Math.PI,
      length: ({u, v}) => Math.hypot(u, v),
      stroke: ({u, v}) => Math.hypot(u, v)
    })
  ]
})
)}

function _4(md){return(
md`Per [Remote Sensing Systems](https://www.remss.com/measurements/ccmp/) documentation:

> *Standard U and V coordinates apply, meaning the positive U is to the right and positive V is above the axis. U and V are relative to true north. CCMP winds are expressed using the oceanographic convention, meaning a wind blowing toward the Northeast has a positive U component and a positive V component.*
> 
> *Longitude is given in degrees East from 0.125 to 359.875 and latitude is given in degrees North with negative values representing southern locations.*`
)}

function _5(md){return(
md`And here is another example using Poisson disk sampling of a Perlin noise field:`
)}

function _6(Plot,samples,noise){return(
Plot.plot({
  inset: 12,
  height: 1152,
  width: 1152,
  marks: [
    Plot.vector(samples([0, 0, 2, 2], 4000), {
      length: ([x, y]) => (noise(x + 2, y) + 0.5) * 24,
      rotate: ([x, y]) => noise(x, y) * 360
    })
  ]
})
)}

function _noise(octave,perlin2){return(
octave(perlin2, 2)
)}

function _8(md){return(
md`<a title="Plot: Frame" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/@observablehq/plot-frame?collection=@observablehq/plot">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>  
<a title="Plot: Vector" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="https://github.com/observablehq/plot/blob/main/README.md#vector">API Reference<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
)}

function _9(md){return(
md`---

## Appendix`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["windgrid.csv", {url: new URL("./files/eda8a802fb7fd7429555174d1054ed864838ed3805a56a3cec27d6e065b8c12eefab55fb777078ef832caa2f6219b6952d5ff1cdd57e39d00bbc91225f14fbec.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("wind")).define("wind", ["FileAttachment"], _wind);
  main.variable(observer()).define(["Plot","wind"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["Plot","samples","noise"], _6);
  main.variable(observer("noise")).define("noise", ["octave","perlin2"], _noise);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("perlin2", child1);
  main.import("octave", child1);
  const child2 = runtime.module(define2);
  main.import("samples", child2);
  return main;
}
