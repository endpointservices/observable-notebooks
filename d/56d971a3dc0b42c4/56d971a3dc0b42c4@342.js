function _1(md){return(
md`# Radial Stacked Bar Chart (Nightingale mortality chart)`
)}

function _angle1(Inputs){return(
Inputs.range([-180, 180], { label: 'angle' })
)}

function _angle2(Inputs){return(
Inputs.range([-180, 180], { label: 'angle' })
)}

function _angle3(Inputs){return(
Inputs.range([-180, 180], { label: 'angle' })
)}

function _chart(d3,DOM,width,height,angle1,angle2,data,z,arc,xAxis,angle3,yAxis,legend)
{
  const svg = d3
    .select(DOM.svg(width, height))
    .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
    .style("width", "100%")
    .style("height", "auto")
    .style("font", "10px sans-serif")
    .attr('transform', `rotate(${angle1})`);

  svg
    .append("g")
    .attr('transform', `rotate(${angle2})`)
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(1))(data))
    .join("g")
    .attr("fill", d => z(d.key))
    .selectAll("path")
    .data(d => d)
    .join("path")
    .attr("d", arc);

  svg.append("g").call(xAxis);

  svg
    .append("g")
    .attr('transform', `rotate(${angle3})`)
    .call(yAxis);

  svg.append("g").call(legend);

  return svg.node();
}


function _data(d3){return(
d3.csvParse(`Month,Impact Space and Community,Impact Ecosystem,Impact Captial
Business acumen,5,0,0
Overall well-being,3,0,0
Increase awareness,5,0,0
Diverse and meaningful connections,4,0,0

Information transpareny,0,3,0
Exposure,0,3.5,0
Collaborativeness,0,4.5,0
Stakeholder involvement,0,4,0
.
Knowledge,0,0,4
Opportunities & Support,0,0,3
`, (d, _, columns) => {
  let total = 0;
  for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
  d.total = total;
  return d;
})
)}

function _arc(d3,y,x,innerRadius){return(
d3.arc()
    .innerRadius(d => y(d[0]))
    .outerRadius(d => y(d[1]))
    .startAngle(d => x(d.data.Month))
    .endAngle(d => x(d.data.Month) + x.bandwidth())
    .padRadius(innerRadius)
)}

function _x(d3,data){return(
d3.scaleBand()
    .domain(data.map(d => d.Month))
    .range([-0.5*Math.PI,  0.5*Math.PI])
    .align(0)
)}

function _y(d3,data,innerRadius,outerRadius){return(
d3.scaleRadial()
      .domain([0, d3.max(data, d => d.total)])
      .range([innerRadius, outerRadius])
)}

function _z(d3,data){return(
d3.scaleOrdinal()
    .domain(data.columns.slice(1))//.range(["#DB004C", "#8CCBFF", "#FF3700"])
    .range(["#FF3700", "#FF8C00", "#E26310"])
)}

function _xAxis(data,x,innerRadius){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(data)
      .join("g")
        .attr("transform", d => `
          rotate(${((x(d.Month) + x.bandwidth() / 2) * 180 / Math.PI - 0)})
          translate(${innerRadius},0)
        `)
        .call(g => g.append("line")
            .attr("x2", -5)
            .attr("stroke", "#000"))
        .call(g => g.append("text")
            .attr("transform", d => (x(d.Month) + x.bandwidth() / 2 + Math.PI / 2) % (Math.PI) < 0.5*Math.PI
                ? "rotate(0)translate(20,3)"
                : "rotate(0)translate(-30,3)")
            .text(d => d.Month)))
)}

function _yAxis(y,d3,x,innerRadius){return(
g => g
    .attr("text-anchor", "middle")
    .call(g => g.selectAll("g")
      .data(y.ticks(5).slice(1))
      .join("g")
        .attr("fill", "none")
        .call(g => g.append("path")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.25)
            .attr("d", d3.arc()
              .innerRadius(y)
              .outerRadius(y)
              .startAngle(-0.5*Math.PI)
              .endAngle(0.5*Math.PI) ))

          .call(g => g.append("text")
            .attr("x", d => -y(d))
            .attr("dx", "0.35em")
            .attr("dy", "0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat())
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none"))
         .call(g => g.append("text")
            .attr("x", d => y(d))
            .attr("dx", "0.35em")
            .attr("dy", "-0.35em")
            .attr("stroke", "#fff")
            .attr("stroke-width", 5)
            .text(y.tickFormat())
         .clone(true)
            .attr("fill", "#000")
            .attr("stroke", "none"))
           .attr("transform", d => `
          rotate(${((x(d.Month) + x.bandwidth() / 2) * 180 / Math.PI - 0)})
          translate(${innerRadius},0)
        `)
        
        
         )
)}

function _legend(data,z){return(
g => g.append("g")
  .selectAll("g")
  .data(data.columns.slice(1).reverse())
  .join("g")
    .attr("transform", (d, i) => `translate(-20,${(i - (data.columns.length - 1) / 2) * 20-40})`)
    .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z))
    .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))
)}

function _width(){return(
975
)}

function _height(width){return(
width
)}

function _innerRadius(){return(
200
)}

function _outerRadius(width,height){return(
Math.min(width, height) / 2
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof angle1")).define("viewof angle1", ["Inputs"], _angle1);
  main.variable(observer("angle1")).define("angle1", ["Generators", "viewof angle1"], (G, _) => G.input(_));
  main.variable(observer("viewof angle2")).define("viewof angle2", ["Inputs"], _angle2);
  main.variable(observer("angle2")).define("angle2", ["Generators", "viewof angle2"], (G, _) => G.input(_));
  main.variable(observer("viewof angle3")).define("viewof angle3", ["Inputs"], _angle3);
  main.variable(observer("angle3")).define("angle3", ["Generators", "viewof angle3"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","angle1","angle2","data","z","arc","xAxis","angle3","yAxis","legend"], _chart);
  main.variable(observer("data")).define("data", ["d3"], _data);
  main.variable(observer("arc")).define("arc", ["d3","y","x","innerRadius"], _arc);
  main.variable(observer("x")).define("x", ["d3","data"], _x);
  main.variable(observer("y")).define("y", ["d3","data","innerRadius","outerRadius"], _y);
  main.variable(observer("z")).define("z", ["d3","data"], _z);
  main.variable(observer("xAxis")).define("xAxis", ["data","x","innerRadius"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["y","d3","x","innerRadius"], _yAxis);
  main.variable(observer("legend")).define("legend", ["data","z"], _legend);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("innerRadius")).define("innerRadius", _innerRadius);
  main.variable(observer("outerRadius")).define("outerRadius", ["width","height"], _outerRadius);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
