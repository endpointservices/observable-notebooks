// https://observablehq.com/@observablehq/demo@306
import define1 from "./bb2055d580bbbab2@106.js";

function _1(md){return(
md`# Demo

Try editing this code to learn how Observable works!`
)}

function _2(md){return(
md`Observable notebooks consist of [JavaScript cells](/@observablehq/introduction-to-code). You can view the code for any cell by clicking in the left margin, or by clicking **Edit** in the cell menu <svg width="8" height="14" viewBox="0 0 8 14" fill="currentColor"><circle r="1.5" cx="4" cy="2"></circle><circle r="1.5" cx="4" cy="7"></circle><circle r="1.5" cx="4" cy="12"></circle></svg>. (The cells below are pinned <svg width="10" height="16" viewBox="4 -1 10 16" fill="currentColor"><path d="M8 1h3v1l-1 1v4l2 .875V9H9v5.125L8 15l-1-.875V9H4V7.875L6 7V3L5 2V1z"></path></svg> open, so their source is already visible.) After editing, hit Shift-Enter or click the cell’s play button <svg width="16" height="16" class="db bump" stroke-linejoin="round" fill="currentColor"><path d="M11.7206 6.94335C12.2406 7.34365 12.2406 8.12786 11.7206 8.52816L5.60999 13.2321C4.95242 13.7383 4 13.2696 4 12.4397L4 3.03178C4 2.20194 4.95243 1.73318 5.60999 2.23937L11.7206 6.94335Z" stroke="currentColor" stroke-width="1.6"></path></svg> to run the code.`
)}

function _3(){return(
1 + 1
)}

function _4(md){return(
md`For more complex definitions such as loops, hug your code with curly braces \`{…}\`. Whatever value you return is shown.`
)}

function _5()
{
  let sum = 0;
  for (let i = 0; i < 100; ++i) {
    sum += i;
  }
  return sum;
}


function _6(md){return(
md`A cell can have a name, allowing its value to be referenced by other cells. A referencing cell is [run automatically](/@observablehq/how-observable-runs) when the referenced value changes.`
)}

function _color(){return(
"red"
)}

function _8(color){return(
`My favorite color is ${color}.`
)}

function _9(md){return(
md`You can inspect nested values such as objects and arrays by clicking on them, just like in your browser’s developer console.`
)}

function _object(){return(
{open: [atob("c2VzYW1l")]}
)}

function _11(md){return(
md`Cells can [generate DOM elements](/@observablehq/introduction-to-html), such as HTML, SVG, Canvas and WebGL. You can use the DOM API, or our HTML and Markdown template literals.`
)}

function _12(html){return(
html`<span style="background:yellow;">
  My favorite language is <i>HTML</i>.
</span>`
)}

function _13(md){return(
md`Hi Mom! It’s me, *Markdown*.`
)}

function _14(md){return(
md`DOM can be made reactive simply by referring to other cells. The next cell refers to *color*, and will update if you change the definition of *color* above.`
)}

function _15(html,color){return(
html`My favorite color is <i style="background:${color};">${color}</i>.`
)}

function _16(md){return(
md`You can [load data](/@observablehq/introduction-to-data) by [attaching files](/@observablehq/file-attachments) or using the Fetch API.`
)}

function _cars(){return(
fetch("https://raw.githubusercontent.com/vega/vega/v4.3.0/docs/data/cars.json")
  .then(response => response.json())
)}

function _18(md){return(
md`You can [load libraries](/@tmcw/introduction-to-require) from npm.`
)}

function _d3(require){return(
require("d3-array@2")
)}

function _20(md){return(
md`If a cell’s value is a [promise](/@observablehq/introduction-to-promises), any referencing cell implicitly awaits it. Both \`fetch\` and \`require\` return promises, but the cell below can refer simply to their eventual values. (You can explicitly \`await\`, too.)`
)}

function _21(d3,cars){return(
d3.median(cars, d => d.Horsepower)
)}

function _22(md){return(
md`Define a function cell to reuse code.`
)}

function _greet(){return(
function greet(subject) {
  return `Hello, ${subject}!`;
}
)}

function _24(greet){return(
greet("world")
)}

function _25(md){return(
md`Cells can be [generators](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators), yielding values up to sixty times a second. A cell that refers to a generator cell runs automatically whenever the generator yields a new value.`
)}

function* _c()
{
  for (let i = 0; true; ++i) {
    yield i;
  }
}


function _27(md,c){return(
md`Currently, *c* = ${c}.`
)}

function _28(md){return(
md`You can yield DOM elements for animation. Click the play button <svg width="16" height="16" class="db bump" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"><path d="M4 3L12 8L4 13Z"></path></svg> in the top-right corner of the cell below to restart the animation.`
)}

function* _29(DOM,width)
{
  const height = 33;
  const context = DOM.context2d(width, height);
  for (let i = 0; i < width; ++i) {
    const t = i / width;
    const r = Math.floor(255 * Math.sin(Math.PI * (t + 0 / 3)) ** 2);
    const g = Math.floor(255 * Math.sin(Math.PI * (t + 1 / 3)) ** 2);
    const b = Math.floor(255 * Math.sin(Math.PI * (t + 2 / 3)) ** 2);
    context.fillStyle = `rgb(${r},${g},${b})`;
    context.fillRect(i, 0, 1, height);
    yield context.canvas;
  }
}


function _30(md){return(
md`Use [asynchronous iteration](/@observablehq/introduction-to-asynchronous-iteration) to control when the cell’s value changes. The cell below ticks every second, on the second.`
)}

async function* _tick(Promises)
{
  while (true) {
    const date = new Date(Math.ceil(Date.now() / 1000) * 1000);
    await Promises.when(date);
    yield date;
  }
}


function _32(md){return(
md`Asynchronous iteration works for interaction, too. Here’s a slider and a generator that yields a promise whenever you change the slider’s value.`
)}

function _slider(html){return(
html`<input type=range>`
)}

function _sliderValue(Generators,slider){return(
Generators.input(slider)
)}

function _35(md){return(
md`Use [views](/@observablehq/introduction-to-views) as shorthand to define interactive values. The cell below defines both a graphical user interface to control a value (another slider), and an implicit generator that exposes this value to the notebook.`
)}

function _d(html){return(
html`<input type=range>`
)}

function _37(md,d){return(
md`Currently, *d* = ${d}.`
)}

function _38(md){return(
md`Reuse code by [importing cells](/@observablehq/introduction-to-imports) from other notebooks!`
)}

function _40(tweet){return(
tweet("958726175123128321")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(_3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(_5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("color")).define("color", _color);
  main.variable(observer()).define(["color"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("object")).define("object", _object);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["html"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["html","color"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("cars")).define("cars", _cars);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["d3","cars"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("greet")).define("greet", _greet);
  main.variable(observer()).define(["greet"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("c")).define("c", _c);
  main.variable(observer()).define(["md","c"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["DOM","width"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("tick")).define("tick", ["Promises"], _tick);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("slider")).define("slider", ["html"], _slider);
  main.variable(observer("sliderValue")).define("sliderValue", ["Generators","slider"], _sliderValue);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("viewof d")).define("viewof d", ["html"], _d);
  main.variable(observer("d")).define("d", ["Generators", "viewof d"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","d"], _37);
  main.variable(observer()).define(["md"], _38);
  const child1 = runtime.module(define1);
  main.import("tweet", child1);
  main.variable(observer()).define(["tweet"], _40);
  return main;
}
