// https://observablehq.com/@mbostock/hello-concaveman@97
function _1(md){return(
md`# Hello, concaveman

Computing the [concave hull](https://github.com/mapbox/concaveman) of San Francisco’s trees. Data: [DataSF](https://data.sfgov.org/City-Infrastructure/Street-Tree-Map/337t-q2b4)`
)}

function _canvas(DOM,width,height,d3,projection,points,hull)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath(projection, context);
  for (const [x, y] of points) {
    context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  }
  context.beginPath();
  context.moveTo(...hull[0]);
  for (const [x, y] of hull.slice(1)) {
    context.lineTo(x, y);
  }
  context.closePath();
  context.lineWidth = 1.5;
  context.lineJoin = "round";
  context.strokeStyle = "red";
  context.stroke();
  context.canvas.style.maxWidth = "100%";
  return context.canvas;
}


function _projection(d3,width,height){return(
d3.geoMercator()
    .center([-122.443, 37.758])
    .translate([width / 2, height / 2])
    .scale(width * 400)
)}

function _hull(concaveman,points){return(
concaveman(points, 2)
)}

function _points(FileAttachment,projection,width,height){return(
FileAttachment("trees.json").json()
  .then(multipoint => multipoint.coordinates.map(projection))
  .then(points => points.filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height))
)}

function _width(){return(
954
)}

function _height(width){return(
width * 0.95
)}

function _d3(require){return(
require("d3-geo@1")
)}

async function _concaveman(require,FileAttachment){return(
require(await FileAttachment("concaveman.js").url())
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["concaveman.js", {url: new URL("./files/d4c427a622e57212b6fce2de5e6a33d71eabb0a658cf97831bd5a7b462b144b2a8e296214009032ccb1fd19df7f19496ea0d0e5f2b5134c52c447781830ad483.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["trees.json", {url: new URL("./files/4300eb0cb85c0c54b43ce80ee513c9d08b502ed082a85e5fd744f657b4fa27fe04668080047eda1eda5f6501ebe86066a1b753fa125285d7e8c75cab6508f397.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","d3","projection","points","hull"], _canvas);
  main.variable(observer("projection")).define("projection", ["d3","width","height"], _projection);
  main.variable(observer("hull")).define("hull", ["concaveman","points"], _hull);
  main.variable(observer("points")).define("points", ["FileAttachment","projection","width","height"], _points);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("concaveman")).define("concaveman", ["require","FileAttachment"], _concaveman);
  return main;
}
