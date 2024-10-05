// https://observablehq.com/@sdaas/d3-timeseries@50
function _1(md){return(
md`# d3 Timeseries`
)}

function _data(moment)
{
  const data = [];
  let d = moment("15-Mar-20");
  for (let i = 0, v = 2; i < 60; ++i) {
    v += Math.random() - 0.5;
    v = Math.max(Math.min(v, 4), 0);
    data.push({
      date: d.toDate(),
      value: v
    });

    //next date
    d = d.add(1, 'day');
  }
  return data;
}


function _3(timeSeries,data){return(
timeSeries(600, 200, data)
)}

function _4(md){return(
md`### Implementation`
)}

function _5(md){return(
md`#### timeSeries()`
)}

function _d3(require){return(
require("d3")
)}

function _timeSeries(d3){return(
function timeSeries(width, height, data) {
  
  const margin = { top: 20, right: 30, bottom: 30, left: 40 }
  const viewportHeight = height;
  const viewportWidth = width;
  const xMapper = d3
    .scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, viewportWidth - margin.right]);

  const yMapper = d3
    .scaleLinear()
    .domain([0, 4])
    .range([viewportHeight - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x(d => xMapper(d.date))
    .y(d => yMapper(d.value));

  const xAxis = function(g) {
    return g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(xMapper)
        .ticks(10)
        .tickSizeOuter(0)
    );
  };

  const yAxis = function(g) {
    return g.attr("transform", `translate(${margin.left},0)`).call(
      d3
        .axisLeft(yMapper)
        .ticks(5)
        .tickSizeOuter(0)
    );
    // to remove the axis line, add the following
    // .call(g => g.select(".domain").remove());
  };

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "border:1px solid black");

  svg
    .append("path")
    .datum(data)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  return svg.node();
}
)}

function _8(md){return(
md`#### moment for date/time calcs`
)}

function _moment(require){return(
require('moment')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["moment"], _data);
  main.variable(observer()).define(["timeSeries","data"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("timeSeries")).define("timeSeries", ["d3"], _timeSeries);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("moment")).define("moment", ["require"], _moment);
  return main;
}
