// https://observablehq.com/@magjac/d3-graphviz@1379
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# d3-graphviz`
)}

function _2(md){return(
md`Functions for rendering Graphviz graphs and performing animated transitions between them.`
)}

function _logoAnimation(adot,logoDots,logoDotIndex,logoDuration){return(
adot.bind(this)`${logoDots[logoDotIndex]}${{duration: logoDuration, zoom: false}}`
)}

function _playLogo(button){return(
button({value: "Play animation"})
)}

function _5(md){return(
md`---
## adot

\`import {adot} from "@magjac/d3-graphviz"\``
)}

function _6(md){return(
md`Animated DOT through the **adot** [template literal tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)`
)}

function _7(md){return(
md`#### Basic form:
The basic form renders a static graph just like **dot** from [@mbostock/graphviz](https://beta.observablehq.com/@mbostock/graphviz):`
)}

function _8(adot){return(
adot`digraph {a -> b}`
)}

function _9(md){return(
md`#### Animation form:
The animation form utilizes a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) with embedded expressions that evaluates to the [DOT](https://www.graphviz.org/doc/info/lang.html) source. It performs an animated transition when the DOT source changes and needs the **this** context from the current cell to calculate the graph changes.`
)}

function _10(adot,dotSrc1){return(
adot.bind(this)`${dotSrc1}`
)}

function _dotSrc1(){return(
`digraph {a -> b; c}`
)}

function _12(md){return(
md`If an embedded expression evaluates to an object, it's properties are taken to be options to adot.`
)}

function _13(adot,dotSrc2){return(
adot.bind(this)`${dotSrc2}${{duration: 2000}}`
)}

function _dotSrc2(){return(
`digraph {rankdir=LR a -> b -> c; a -> c}`
)}

function _logo(adot,logoDots,width){return(
adot.bind(this)`${logoDots[logoDots.length - 1]}${{width: width, height: 300, fit: true, zoom: false}}`
)}

function _16(md){return(
md`---
## Definitions`
)}

function _17(md){return(
md`### Internal data`
)}

function _defaultOptions(){return(
{
  useWorker: false,
  width: null, // SVG width. Default: use original SVG width
  height: null, // SVG height. Default: use original SVG height
  scale: 1, // scale factor to scale up the graph with after possible fit to SVG size. Default: no scaling
  fit: false, // If true, scale the graph automatically to fit the svg size. Default: don't fit
  loadEvents: false,
  duration: 250,
  zoom: true,
}
)}

function _19(md){return(
md`### Exported functions`
)}

function _adot(defaultOptions,html,d3){return(
async function (strings) {
  console.log('Running adot');
  let string = strings[0] + "";
  let i = 0;
  let n = arguments.length;
  var options = Object.assign({}, defaultOptions);
  while (++i < n) {
    if (arguments[i] instanceof Object) {
      for (var option of Object.keys(arguments[i])) { 
         options[option] = arguments[i][option];
      }
    } else {
      string += arguments[i] + "";
    }
    string += strings[i];
  }
  if (!this) {
    var div = html`<div>`;
  } else {
    var div = this;
  }
  var graphviz = d3.select(div).graphviz(options);
  var divSel = d3.select(div);
  graphviz
    .transition(function () {
      return d3.transition("adot")
        .duration(options.duration)
        // ResizeObserver is currently only supported in Chrome.
        // Make sure Observable notices cell hight changes during the transition by dispatching a load event.
        // See also https://talk.observablehq.com/t/left-side-and-code-does-not-move-when-cell-content-height-changes-in-a-transition/780.
        /*.tween("update", () => () => {
          if (options.loadEvents) {
            divSel.dispatch("load");
          }
        })*/;
  });
  await new Promise(function(resolve, reject) { 
      graphviz.renderDot(string, function () {
        resolve(this);
      });
  });
  return div;
}
)}

function _21(md){return(
md`### Dependencies`
)}

function _d3(require){return(
require("d3-graphviz@2.6.1", "d3-selection@1", "d3-transition@1")
)}

function _24(md){return(
md`### Notebook internals`
)}

function _logoDots()
{
  let logos = [
      {widthPt: 300, heightPt: 123},
      {widthPt: 314, heightPt: 44},
      {widthPt: 174, heightPt: 116},
  ];

  let thumbnail = {widthPt: 320 * 3 / 4, heightPt: 200 * 3 / 4};

  let maxHeightPt = Math.max(...logos.map(l => l.heightPt));

  let logo = {widthPt: thumbnail.widthPt * maxHeightPt / logos[2].heightPt, heightPt: thumbnail.heightPt * maxHeightPt / logos[2].heightPt};

  let scale = logo.heightPt / logos[2].heightPt;
  let widthOffsetPt = logo.widthPt - logos[2].widthPt * scale;

  let size_attr0 = `viewport="${logos[0].widthPt * scale + widthOffsetPt},${logos[0].heightPt * scale}, ${scale}"`;
  let size_attr1 = `viewport="${logos[1].widthPt * scale + widthOffsetPt},${logos[1].heightPt * scale}, ${scale}"`;
  let size_attr2 = `viewport="${logo.widthPt},${logo.heightPt}, ${scale}"`;

  let dots = [/*`
  digraph  {
    graph [bgcolor=lightgray]
  }
  `, */`
  digraph  {
    graph [${size_attr0}]
    node [style=filled]
    D3 [fillcolor="#1f77b4" shape=circle URL="https://d3js.org/"]
    Graphviz [fillcolor="#d62728" shape=circle URL="https://www.graphviz.org/"]
    "d3-graphviz" [fillcolor="#2ca02c" shape=circle URL="https://github.com/magjac/d3-graphviz"]
  }`, `
  digraph  {
    graph [${size_attr1}]
    node [style=filled]
    D3 [fillcolor="#1f77b4" shape=hexagon URL="https://d3js.org/"]
    Graphviz [fillcolor="#d62728" shape=ellipse URL="https://www.graphviz.org/"]
    "d3-graphviz" [fillcolor="#2ca02c" shape="egg" URL="https://github.com/magjac/d3-graphviz"]
  }
  `, `
  digraph  {
    graph [${size_attr2}]
    node [style=filled]
    D3 [fillcolor="#1f77b4" shape=hexagon URL="https://d3js.org/"]
    Graphviz [fillcolor="#d62728" shape=ellipse URL="https://www.graphviz.org/"]
    "d3-graphviz" [fillcolor="#2ca02c" shape="egg" URL="https://github.com/magjac/d3-graphviz"]
    D3 -> "d3-graphviz"
    Graphviz -> "d3-graphviz"
  }
  `];
    return dots;
  }


function _26(logoDots){return(
logoDots[2]
)}

function _logoDots0(){return(
[`
digraph  {
}
`, `
digraph  {
  node [style=filled]
  D3 [fillcolor="#1f77b4" shape=circle URL="https://d3js.org/"]
  Graphviz [fillcolor="#d62728" shape=circle URL="https://www.graphviz.org/"]
  "d3-graphviz" [fillcolor="#2ca02c" shape=circle URL="https://github.com/magjac/d3-graphviz"]
}`, `
digraph  {
  node [style=filled]
  D3 [fillcolor="#1f77b4" shape=hexagon URL="https://d3js.org/"]
  Graphviz [fillcolor="#d62728" shape=ellipse URL="https://www.graphviz.org/"]
  "d3-graphviz" [fillcolor="#2ca02c" shape="egg" URL="https://github.com/magjac/d3-graphviz"]
}
`, `
digraph  {
  node [style=filled]
  D3 [fillcolor="#1f77b4" shape=hexagon URL="https://d3js.org/"]
  Graphviz [fillcolor="#d62728" shape=ellipse URL="https://www.graphviz.org/"]
  "d3-graphviz" [fillcolor="#2ca02c" shape="egg" URL="https://github.com/magjac/d3-graphviz"]
  D3 -> "d3-graphviz"
  Graphviz -> "d3-graphviz"
}
`]
)}

function _logoDot(logoDots){return(
logoDots[logoDots.length - 1]
)}

function* _logoDotIndex(playLogo,logoDots,Promises,logoDuration)
{
  playLogo;
  let i = this ? (this +  1) % logoDots.length : logoDots.length - 1;
  yield i;
  while (++i < logoDots.length) {
    yield Promises.delay(logoDuration + 100, i);
  }
}


function _logoDuration(){return(
1000
)}

function _31(md){return(
md`---
## Revision history`
)}

function _32(md){return(
md`

2020-03-10 18:49

* Pin d3-graphviz to 2.x after release of incompatible d3-graphviz 3.0.0 (Thanks [@alvaro-jmp](https://beta.observablehq.com/@alvaro-jmp))

2018-06-10 21:34

* Refactored to utilize new features in d3-graphviz v2.2.0:
 * Re-use existing renderer
 * Use new witdh, height, fit and scale options

2018-06-04 13:36

* Support setting only one of the **width** and **height** options

2018-05-29 12:10:

* Added **zoom** option

2018-05-28 16:51:

* Added options:
 * **width**: SVG width in pixels
 * **height**: SVG height in pixels
 * **fit**: Scale the graph to fit the specified SVG size if true. N/A if neither **width** nor **height** is specified
 * **scale**: Scale the graph within the specified SVG. N/A if **fit** is true or neither **width** nor **height** is specified
 * **loadEvents**: Issue load events (see below) only when true  

2018-05-28 00:06:
* Make sure Observable left pane and code moves when cell height changes by issuing load events during the transition
 * See also [Left side and code does not move when cell content height changes in a transition](https://talk.observablehq.com/t/left-side-and-code-does-not-move-when-cell-content-height-changes-in-a-transition/780)

2018-05-27 09:12:
* Added support for options object in adot:
 * Support transition **duration**

2018-05-26 18:16:
* Added d3-graphviz logo animated transition

2018-05-26 14:10:
* Changed duration to same as d3 default; 250 ms
* Streamlined examples

2018-05-25 20:36:
* Removed console logging

2020-09-01 17:50:
* Remove d3 minor and patch version pinning. Only require major version 1
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("logoAnimation")).define("logoAnimation", ["adot","logoDots","logoDotIndex","logoDuration"], _logoAnimation);
  main.variable(observer("viewof playLogo")).define("viewof playLogo", ["button"], _playLogo);
  main.variable(observer("playLogo")).define("playLogo", ["Generators", "viewof playLogo"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["adot"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["adot","dotSrc1"], _10);
  main.variable(observer("dotSrc1")).define("dotSrc1", _dotSrc1);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["adot","dotSrc2"], _13);
  main.variable(observer("dotSrc2")).define("dotSrc2", _dotSrc2);
  main.variable(observer("logo")).define("logo", ["adot","logoDots","width"], _logo);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("defaultOptions")).define("defaultOptions", _defaultOptions);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("adot")).define("adot", ["defaultOptions","html","d3"], _adot);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  main.import("button", child1);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("logoDots")).define("logoDots", _logoDots);
  main.variable(observer()).define(["logoDots"], _26);
  main.variable(observer("logoDots0")).define("logoDots0", _logoDots0);
  main.variable(observer("logoDot")).define("logoDot", ["logoDots"], _logoDot);
  main.variable(observer("logoDotIndex")).define("logoDotIndex", ["playLogo","logoDots","Promises","logoDuration"], _logoDotIndex);
  main.variable(observer("logoDuration")).define("logoDuration", _logoDuration);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  return main;
}
