function _1(md){return(
md`# Ego graph

Ego graph with selection, used in https://observablehq.com/@tomlarkworthy/google-vs-trick
`
)}

function _2(visualization){return(
visualization
)}

function _visualization(data,d3,width,height,maxDepthInv,linkWidth,nodeSize,color,drag,labeldY,labelSize,Event,invalidation)
{
  const links = data.links;
  const nodes = data.nodes;

  const forceLink = d3
    .forceLink(links)
    .id((d) => d.id)
    .distance((link) => {
      const scale = d3.scaleSqrt().domain([0, 1]).range([30, 70]);
      return scale(link.distance);
    })
    .strength((link) => 1 / Math.min(link.source.count, link.target.count));

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", forceLink)
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", zoomed)
    );

  const container = svg.append("g");

  svg.on("click", (e) => {
    if (e.target === svg.node()) {
      link.style("stroke-opacity", 0.6);
      node.style("opacity", 0.8);
      text.attr("display", "block");
    }
  });

  function zoomed({ transform }) {
    container.attr("transform", transform);
  }

  const defs = svg.append("defs");

  const gradients = defs
    .selectAll("line")
    .data(links)
    .join("linearGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("id", (d) => "l-" + d.index)
    .attr("x1", (d) => d.source.x)
    .attr("x2", (d) => d.target.x)
    .attr("y1", (d) => d.source.y)
    .attr("y2", (d) => d.target.y);

  function addStop(w) {
    gradients
      .append("stop")
      .attr("offset", `${w * 100}%`)
      .attr("stop-color", (d) =>
        d3.interpolateTurbo(
          ((1 - w) * d.source.depth + w * d.target.depth) * maxDepthInv
        )
      );
  }
  addStop(0);
  addStop(0.5);
  addStop(1);

  // links
  const link = container
    .append("g")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", (d) => `url(#${"l-" + d.index}`)
    .attr("stroke-width", linkWidth);

  const node = container
    .append("g")
    .attr("opacity", 0.8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", nodeSize)
    .attr("fill", color)
    .call(drag(simulation));

  node.append("title").text((d) => d.id);

  const text = container
    .append("g")
    .attr("class", "labels")
    .selectAll("g")
    .data(nodes)
    .enter()
    .append("g");

  text
    .append("text")
    .attr("fill", "black")
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("paint-order", "stroke fill")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("dy", labeldY)
    .style("font-family", "sans-serif")
    .style("font-size", labelSize)
    .text(function (d) {
      return d.id;
    });

  node.on("click", (_, d) => {
    var _nodes = [d];
    link.style("stroke-opacity", function (l) {
      if (d === l.source) {
        _nodes.push(l.target);
        return 1.0;
      } else if (d === l.target) {
        _nodes.push(l.source);
        return 1.0;
      } else return 0.3;
    });

    node.style("opacity", function (n) {
      return _nodes.indexOf(n) !== -1 ? 0.8 : 0.3;
    });

    text.attr("display", function (t) {
      return _nodes.indexOf(t) !== -1 ? "block" : "none";
    });

    svg.node().value = {
      selected: d,
      neighbourhood: _nodes
    };
    svg.node().dispatchEvent(new Event("input", { bubbles: true }));
  });

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    gradients
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    text.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}


function _4(Inputs,data){return(
Inputs.table(
  data.links.map((l) => ({ ...l, source: l.source.id, target: l.target.id }))
)
)}

function _maxDepth(data){return(
data.nodes.reduce((m, n) => Math.max(m, n.depth), Number.MIN_VALUE)
)}

function _maxDepthInv(maxDepth){return(
1 / maxDepth
)}

function _7(Inputs,data){return(
Inputs.table(data.nodes)
)}

function _drag(d3){return(
simulation => {
  
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event,d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event,d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)}

function _nodeSize(d3)
{
  const scale = d3.scaleSqrt()
    .domain([1, 50])
    .range([5, 15]);
  return d => scale(d.count);
}


function _labelSize(d3)
{
  const scale = d3.scaleSqrt()
    .domain([1, 50])
    .range([10, 18]);
  return d => scale(d.count);
}


function _labeldY(nodeSize)
{
  return d => 2*nodeSize(d)+2.0
}


function _linkWidth(d3)
{
  const scale = d3.scaleSqrt().domain([1, 11]).range([2, 20]);
  return (d) => scale(d.weight);
}


function _nodesById(data){return(
new Map(data.nodes.map((n) => [n.id, n]))
)}

function _color(d3)
{
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return d => scale(d.depth);
}


function _data(FileAttachment){return(
FileAttachment("poodle (3).json").json()
)}

function _height(){return(
600
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["poodle (3).json", {url: new URL("./files/8bd411c3335c848e8abba1e8d4f1b21f851bbd300d8527daf069b929de8fac53c55b245d18f022eb46a29961fc3bda3246f674b93508b6fe54730ce9721e2568.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["visualization"], _2);
  main.variable(observer("viewof visualization")).define("viewof visualization", ["data","d3","width","height","maxDepthInv","linkWidth","nodeSize","color","drag","labeldY","labelSize","Event","invalidation"], _visualization);
  main.variable(observer("visualization")).define("visualization", ["Generators", "viewof visualization"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","data"], _4);
  main.variable(observer("maxDepth")).define("maxDepth", ["data"], _maxDepth);
  main.variable(observer("maxDepthInv")).define("maxDepthInv", ["maxDepth"], _maxDepthInv);
  main.variable(observer()).define(["Inputs","data"], _7);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("nodeSize")).define("nodeSize", ["d3"], _nodeSize);
  main.variable(observer("labelSize")).define("labelSize", ["d3"], _labelSize);
  main.variable(observer("labeldY")).define("labeldY", ["nodeSize"], _labeldY);
  main.variable(observer("linkWidth")).define("linkWidth", ["d3"], _linkWidth);
  main.variable(observer("nodesById")).define("nodesById", ["data"], _nodesById);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
