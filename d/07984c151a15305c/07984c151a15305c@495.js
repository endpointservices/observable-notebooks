function _1(md){return(
md`# Emit \`input\` Events and Expose a Value
Click on the circle to make it change size and position.`
)}

function _circle(Circle,width,height,d3){return(
Circle({
  width,
  height,
  value: { x: width / 2, y: height / 2, r: height / 2, count: 0 },
  easement: d3.easeBounce,
  duration: 1000
})
)}

function _3(circle){return(
circle
)}

function _goto(circle,anyNatural,width,height,$0)
{
  circle; // When a value is emitted from the cicle cell
  const x = anyNatural(0, width);
  const y = anyNatural(0, height);
  const r = anyNatural(20, 400);
  $0.value = { x, y, r };
}


function _5(md){return(
md`Using the technique of dispatching events from a DOM element:
* draw a circle, which on each click:
  * changes the radius to some random number;
  * transitions to a new random point;
  * tracks the click count;
  * emits an \`input\` event; and
  * exposes its value—\`x\`, \`y\`, \`radius\`, and \`count\`.
 
Code is split out into small individual methods:
* to better fit in your mind;
* to avoid being bitten by global scope; that is, must explicitely pass all variables; (almost) no global scope

⚠️ in comments below indicates a ‘dirty’ function or not [pure function](https://en.wikipedia.org/wiki/Pure_function): i.e. code with side effects.`
)}

function _6(md){return(
md`### \`dot\`
* creates a \`Circle\`, as specified by its configuration;
* defines \`processor(event)\` that calls \`circle.process({event})\` on each \`input\` event.

Note that \`dot\`’s value is an object that is updated on each click. \`Generators.input(dot)\` shows its current value. Alternatively, you can say:
~~~js
viewof dot = { … }
~~~
to have \`dot\` itself reflect its changes in value.`
)}

function _7(md){return(
md`### \`Circle()\`
1. creates a sketch (\`svg\` image) containing a circle;
1. registers a \`revaluator\` that updates its \`value\` and emits an \`input\` event on each \`click\`; and
1. extends sketch with \`process()\` to process \`input\` events (as in \`dot\`, above).`
)}

function _Circle(d3,Event,processPlant){return(
({ width, height, value, event, easement, duration }) => {
  const sketch = d3.create("svg").attr("width", width).attr("height", height);

  const kind = "circle";

  const circle = sketch
    .append(kind)
    .attr("cx", value.x)
    .attr("cy", value.y)
    .attr("r", value.r)
    .attr("stroke-width", height / 2)
    .attr("stroke", "red")
    .on("click", () =>
      sketch.node().dispatchEvent(new Event("input", { bubbles: true }))
    );

  const process = processPlant({
    target: sketch.node(),
    kind,
    duration,
    easement
  });

  return Object.defineProperty(sketch.node(), "value", {
    get: () => value,
    set: (newValue) => {
      value = newValue;
      process(newValue);
    },
    enumerable: true
  });
}
)}

function _processPlant(d3){return(
({ target, kind, duration, easement }) => ({ r, x, y }) => {
  if (isNaN(x) || isNaN(y)) throw new Error();
  d3.select(target)
    .select(kind)
    .transition()
    .ease(easement)
    .duration(duration)
    .attr("r", r)
    .attr("cx", x)
    .attr("cy", y);
}
)}

function _anyNatural(){return(
(min, max) => +(min + (max - min) * Math.random()).toFixed(0)
)}

function _height(width){return(
width / 4
)}

function _12(md){return(
md`## Sources
* [Dispatching Events Example « Curran Kelleher « VizHub](https://vizhub.com/curran/96637eb6243a41a39dc728357617817d?edit=files&file=README.md)
* [Line Chart, Index Chart « Mike Bostock « D3 « Observable](https://observablehq.com/@d3/index-chart?collection=@d3/charts)`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof circle")).define("viewof circle", ["Circle","width","height","d3"], _circle);
  main.variable(observer("circle")).define("circle", ["Generators", "viewof circle"], (G, _) => G.input(_));
  main.variable(observer()).define(["circle"], _3);
  main.variable(observer("goto")).define("goto", ["circle","anyNatural","width","height","viewof circle"], _goto);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("Circle")).define("Circle", ["d3","Event","processPlant"], _Circle);
  main.variable(observer("processPlant")).define("processPlant", ["d3"], _processPlant);
  main.variable(observer("anyNatural")).define("anyNatural", _anyNatural);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer()).define(["md"], _12);
  return main;
}
