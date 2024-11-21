// https://observablehq.com/@mkfreeman/overlapping-projections@223
import define1 from "./816a5e069fcbf8ae@347.js";
import define2 from "./a2e58f97fd5e8d7c@756.js";

function _1(md){return(
md`# Overlapping Projections`
)}

function _replay(Button){return(
Button("Replay")
)}

function _delay(Range){return(
Range([0, 2000], {
  step: 100,
  value: 100,
  label: "Delay between countries"
})
)}

function _chart(replay,d3,width,height,projections,topojson,shapefile,path_data,delay)
{
  replay; // triggers replay
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
    .data(projections, d => d.name)
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

  // Transition the paths
  svg
    .selectAll("path")
    .transition()
    .delay((d, i) => i * delay)
    .style("stroke", "black");

  return svg.node();
}


function _appendix(md){return(
md`## Appendix`
)}

function _path_data(topojson,shapefile){return(
topojson.mesh(shapefile)
)}

function _d3(require){return(
require("d3", "d3-geo@2", "d3-geo-projection@3")
)}

function _shapefile(d3){return(
d3.json(
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
)
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _height(){return(
500
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof replay")).define("viewof replay", ["Button"], _replay);
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("viewof delay")).define("viewof delay", ["Range"], _delay);
  main.variable(observer("delay")).define("delay", ["Generators", "viewof delay"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["replay","d3","width","height","projections","topojson","shapefile","path_data","delay"], _chart);
  main.variable(observer("appendix")).define("appendix", ["md"], _appendix);
  main.variable(observer("path_data")).define("path_data", ["topojson","shapefile"], _path_data);
  const child1 = runtime.module(define1);
  main.import("projections", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("shapefile")).define("shapefile", ["d3"], _shapefile);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("height")).define("height", _height);
  const child2 = runtime.module(define2);
  main.import("Button", child2);
  main.import("Range", child2);
  return main;
}
