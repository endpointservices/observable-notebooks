import define1 from "./276aa931e2b40b73@223.js";
import define2 from "./3fd0d90f06cd444e@89.js";

function _1(md){return(
md`# SVG To GIF
Convert timed Observable SVG Animations to GIF format.`
)}

function _2(md){return(
md`Based on prior work:
- [Canvas to GIF](https://observablehq.com/@mbostock/canvas-to-gif)
- [GIF Rendering](https://bl.ocks.org/veltman/1071413ad6b5b542a1a3)
`
)}

function _3(md){return(
md`## Steps
Based on the above work, there appear to be 3 steps to rendering a GIF from SVG:
- Create a \`gif\` element
- Each time the SVG contains a view that you would like to include in the GIF, add a **frame** to the \`gif\`
  - (this requires serializing the SVG as an image, which we'll do in a separate \`addFrame()\` function)
- Rendering the gif

As a motivating example, let's imagine I want to create the following as a GIF:`
)}

function _4($0){return(
$0
)}

function _5(original_chart){return(
original_chart
)}

function _6(md){return(
md`## Recreating the SVG as a GIF`
)}

function _7(md){return(
md`My current approach is to iterate through each projection and add a frame each time:

~~~js
  // Add frame to the GIF for each projection
  await svg
    .selectAll("path")
    .transition()
    .delay((d, i) => i * duration)
    .each(function(d, i) {
      d3.select(this).style("stroke", "black");
      addFrame(delay * i, { copy: true, delay: 250 }, svg.node());
    })
    .end();

  // Render the GIF when it's finished
  gif.on("finished", () => gif.render());
~~~
`
)}

function _8(md){return(
md`The SVG renders (currently just using 3 projections), but the GIF won't render...`
)}

async function _chart(d3,width,height,sample_projections,topojson,shapefile,path_data,duration,addFrame,delay,gif,$0)
{
  // Create the svg
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .style("text-anchor", "middle")
    .style('font-family', 'sans-serif')
    .style("font-size", "12px");

  // Add a g for each projection
  const gs = svg
    .selectAll("path")
    .data(sample_projections, d => d.name)
    .join("path")
    .attr("d", d => {
      // Define a projection
      const projection = d3
        .geoProjection(d.value)
        .fitExtent(
          [[10, 10], [width, height]],
          topojson.feature(shapefile, shapefile.objects.countries)
        );

      // Set the projection and apply it to the data
      const path_d = d3.geoPath().projection(projection)(path_data);
      return path_d;
    })
    .style("fill", "none")
    .style("stroke-width", .1);
  // Add frame to the GIF for each projection
  await svg
    .selectAll("path")
    .transition()
    .delay((d, i) => i * duration)
    .each(function(d, i) {
      d3.select(this).style("stroke", "black");
      const svgnode = svg.node();

      addFrame(delay * i, { copy: true, delay: 250 }, svgnode);
    })
    .end();

  // Render the GIF when it's finished
  gif.render();
  gif.on("finished", data => {
    $0.value = data;
  });

  return svg.node();
}


function _render(){return(
null
)}

function _11(html,render){return(
html`<img src="${URL.createObjectURL(render, { type: "image/gif" })}">`
)}

function _sample_projections(projections){return(
projections.filter((d, i) => i < 3)
)}

function _13(md){return(
md`## Helper Functions`
)}

function _gif(GIF,width,height){return(
new GIF({
  workers: 3,
  quality: 1,
  repeat: 0,
  width: width,
  height: height
})
)}

function _duration(){return(
100
)}

function _addFrame(XMLSerializer,gif,duration,frames,width,height){return(
function addFrame(t, cb, chart) {
  // Create a blob URL from SVG
  // including "charset=utf-8" in the blob type breaks in Safari
  var img = new Image(),
    serialized = new XMLSerializer().serializeToString(chart),
    svg = new Blob([serialized], { type: "image/svg+xml" }),
    url = URL.createObjectURL(svg);

  // Onload, callback to move on to next frame
  img.onload = function() {
    gif.addFrame(img, {
      delay: duration / frames,
      copy: true,
      width: width,
      height: height
    });

    cb(null, t);
  };

  img.src = url;
}
)}

function _17(md){return(
md`## Appendix`
)}

function _d3(require){return(
require("d3")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["viewof replay"], _4);
  main.variable(observer()).define(["original_chart"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("chart")).define("chart", ["d3","width","height","sample_projections","topojson","shapefile","path_data","duration","addFrame","delay","gif","mutable render"], _chart);
  main.define("initial render", _render);
  main.variable(observer("mutable render")).define("mutable render", ["Mutable", "initial render"], (M, _) => new M(_));
  main.variable(observer("render")).define("render", ["mutable render"], _ => _.generator);
  main.variable(observer()).define(["html","render"], _11);
  main.variable(observer("sample_projections")).define("sample_projections", ["projections"], _sample_projections);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("gif")).define("gif", ["GIF","width","height"], _gif);
  main.variable(observer("duration")).define("duration", _duration);
  main.variable(observer("addFrame")).define("addFrame", ["XMLSerializer","gif","duration","frames","width","height"], _addFrame);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("viewof replay", child1);
  main.import("replay", child1);
  main.import("chart", "original_chart", child1);
  main.import("height", child1);
  main.import("projections", child1);
  main.import("shapefile", child1);
  main.import("path_data", child1);
  main.import("delay", child1);
  const child2 = runtime.module(define2);
  main.import("GIF", child2);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  return main;
}
