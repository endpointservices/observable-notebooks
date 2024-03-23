import define1 from "./65d33fe44849cfde@588.js";
import define2 from "./3fd0d90f06cd444e@89.js";
import define3 from "./0ef5ae783a5f1d31@121.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# SVG Timeseries to GIF


Reference an external notebook cell that contains an _SVG_ timeseries:

~~~js
  (number) => svg 
~~~ 

or a generator

~~~js
   svg*
~~~

and it will loop to a downloadable _gif_

## TODO

switch to https://observablehq.com/@mootari/gif#GifConverter

## Change log
- 2021-01-03: Fixed background and generalized generators
- 2021-01-27: Updated to use '@tomlarkworthy/metaprogramming' instead of rolling own Runtime manipulation
- 2021-01-25: Auto set xmlns attributeNS and xlink (see [discusison](https://talk.observablehq.com/t/svg-export-from-a-vega-lite-api-chart-error-on-opening-the-file/4398/6))
- 2021-01-21: Auto set xmlns attribute to SVG as that is often missing
- 2021-01-03: Can also render generators.
`
)}

function _2(md){return(
md `## Choose Your Reference`
)}

function _id(submit,searchParams,Promises)
{
  const {text} = submit({
    value: searchParams.get("id") || "@tomlarkworthy/svg-boinger"
  });
  text.addEventListener("input", () => {
    let v = text.value, m;
    if (m = /\.js(\?|$)/i.exec(v)) v = v.slice(0, m.index);
    if (m = /^[0-9a-f]{16}$/i.test(v)) v = `d/${v}`;
    if (m = /^https:\/\/(api\.|beta\.|)observablehq\.com\//i.exec(v)) v = v.slice(m[0].length);
    if (v !== text.value) text.value = v;
  });
  text.addEventListener("paste", () => {
    Promises.delay(50).then(() => {
      text.form.dispatchEvent(new CustomEvent("submit", {cancelable: true}));
    });
  });
  return text.form;
}


function _target(html,searchParams){return(
html`<input placeholder="cell name SVG or (t) => SVG" value=${
  searchParams.get("cell") || 'timeseries'
}>`
)}

function _5(html,id,target,frame_min,frame_max,fillStyle,frame_duration,fps){return(
html`<a href="/@tomlarkworthy/svg-to-gif?id=${id}&cell=${target}&frame_min=${frame_min}&frame_max=${frame_max}&fillStyle=${fillStyle}&frame_duration=${frame_duration}&fps=${fps}">Perm link to your page settings</a>`
)}

function _6(md){return(
md`## Here is what we can load`
)}

function _source(peek,id,target){return(
peek({
  notebook: id,
  cell: target
})
)}

function _8(md){return(
md`### Choose Your Loop Params`
)}

function _frame_min(number,searchParams){return(
number({
  value: searchParams.get("frame_min") || 0,
  description: "frame_min (inclusive)"
})
)}

function _frame_max(number,searchParams){return(
number({
  value: searchParams.get("frame_max") || 3,
  description: "frame_max (exclusive)"
})
)}

function _frame_duration(number,searchParams){return(
number({
  value: searchParams.get("frame_duration") || 3,
  description: "frame_duration (secs)"
})
)}

function _fps(number,searchParams){return(
number({
  value: searchParams.get("fps") || 30,
  description: "fps"
})
)}

function _fillStyle(html,location){return(
html`<input value=${
  new URL(location).searchParams.get("fillStyle") || 'transparent'
}>`
)}

function _14(md){return(
md`### Restart the rendering loop if you change params to fix issues`
)}

function _15(html,$0)
{
  const button = html`<button>restart`
  button.onclick = (evt) => {
    $0.value = 0;
  }
  return button;
}


function _16(md){return(
md`#### Our current frame for rendering`
)}

function _frame(frame_min){return(
frame_min
)}

function _step(frame,$0,frame_min,$1,GIF,frame_max,frame_duration,fps,gif,$2,canvas)
{
  if (isNaN(frame)) {
    $0.value = frame_min;
    return;
  }
  if (frame == frame_min) {
    console.log("restart");
    $1.value = new GIF();
  }

  const step = (frame_max - frame_min) / (frame_duration * fps);

  if (frame > frame_max - step - 0.0001) {
    // The end
    if (gif.rendered) return;
    const result = new Promise(resolve => {
      try {
        console.log("render");
        gif.rendered = true;
        const p = $1.value.render();
        $1.value.on("finished", resolve);
      } catch (err) {
        // restart on error
        console.log(err);
        $0.value = frame_min;
      }
    });

    result.then(data => {
      $2.value = data;
    });

    return result;
  } else {
    // step
    console.log("frame " + frame);
    gif.addFrame(canvas, { copy: true, delay: 1000 / fps });
    $0.value = frame + step;
  }
  return new Promise(() => frame);
}


function _19(md){return(
md`### When the button below appears, your gif is ready.`
)}

function _20(DOM,render,target){return(
DOM.download(render,
             target + ".gif", // optional file name
             "Download " + target + ".gif")
)}

function _21(md){return(
md`### preview gif`
)}

function _22(html,render){return(
html`<img src="${URL.createObjectURL(render, {type: "image/gif"})}">`
)}

function _23(md){return(
md`Thanks [@mootari](https://observablehq.com/@mootari) for suggesting to use gif.js in the [talk thread](https://talk.observablehq.com/t/how-to-make-a-gif-e-g-from-an-svg)`
)}

function _24(md){return(
md`### SVG to ImageElement`
)}

function _gif(GIF){return(
new GIF
)}

function _img(source,frame)
{
  return new Promise(resolve => {
    const img = new Image();
    const svg = typeof source === 'function' ? source(frame) : source;
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns",
      "http://www.w3.org/2000/svg"
    );
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );
    img.onload = () => resolve(img);
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svg.outerHTML)}`;
  });
}


function _27(md){return(
md`### ImageElement to Canvas with background`
)}

function _canvas(img,fillStyle)
{
  const c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  c.width = img.width;
  c.height = img.height;
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, img.width, img.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);
  return c;
}


function _render(){return(
null
)}

function _searchParams(location){return(
new URL(location).searchParams
)}

function _36(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof id")).define("viewof id", ["submit","searchParams","Promises"], _id);
  main.variable(observer("id")).define("id", ["Generators", "viewof id"], (G, _) => G.input(_));
  main.variable(observer("viewof target")).define("viewof target", ["html","searchParams"], _target);
  main.variable(observer("target")).define("target", ["Generators", "viewof target"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","id","target","frame_min","frame_max","fillStyle","frame_duration","fps"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("source")).define("source", ["peek","id","target"], _source);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof frame_min")).define("viewof frame_min", ["number","searchParams"], _frame_min);
  main.variable(observer("frame_min")).define("frame_min", ["Generators", "viewof frame_min"], (G, _) => G.input(_));
  main.variable(observer("viewof frame_max")).define("viewof frame_max", ["number","searchParams"], _frame_max);
  main.variable(observer("frame_max")).define("frame_max", ["Generators", "viewof frame_max"], (G, _) => G.input(_));
  main.variable(observer("viewof frame_duration")).define("viewof frame_duration", ["number","searchParams"], _frame_duration);
  main.variable(observer("frame_duration")).define("frame_duration", ["Generators", "viewof frame_duration"], (G, _) => G.input(_));
  main.variable(observer("viewof fps")).define("viewof fps", ["number","searchParams"], _fps);
  main.variable(observer("fps")).define("fps", ["Generators", "viewof fps"], (G, _) => G.input(_));
  main.variable(observer("viewof fillStyle")).define("viewof fillStyle", ["html","location"], _fillStyle);
  main.variable(observer("fillStyle")).define("fillStyle", ["Generators", "viewof fillStyle"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["html","mutable frame"], _15);
  main.variable(observer()).define(["md"], _16);
  main.define("initial frame", ["frame_min"], _frame);
  main.variable(observer("mutable frame")).define("mutable frame", ["Mutable", "initial frame"], (M, _) => new M(_));
  main.variable(observer("frame")).define("frame", ["mutable frame"], _ => _.generator);
  main.variable(observer("step")).define("step", ["frame","mutable frame","frame_min","mutable gif","GIF","frame_max","frame_duration","fps","gif","mutable render","canvas"], _step);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["DOM","render","target"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["html","render"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.define("initial gif", ["GIF"], _gif);
  main.variable(observer("mutable gif")).define("mutable gif", ["Mutable", "initial gif"], (M, _) => new M(_));
  main.variable(observer("gif")).define("gif", ["mutable gif"], _ => _.generator);
  main.variable(observer("img")).define("img", ["source","frame"], _img);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("canvas")).define("canvas", ["img","fillStyle"], _canvas);
  main.define("initial render", _render);
  main.variable(observer("mutable render")).define("mutable render", ["Mutable", "initial render"], (M, _) => new M(_));
  main.variable(observer("render")).define("render", ["mutable render"], _ => _.generator);
  main.variable(observer("searchParams")).define("searchParams", ["location"], _searchParams);
  const child1 = runtime.module(define1);
  main.import("peek", child1);
  const child2 = runtime.module(define2);
  main.import("GIF", child2);
  const child3 = runtime.module(define3);
  main.import("submit", child3);
  const child4 = runtime.module(define4);
  main.import("number", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _36);
  return main;
}
