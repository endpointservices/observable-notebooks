// https://observablehq.com/@mbostock/canvas-to-gif@89
function _1(md){return(
md`# Canvas to GIF

Let’s make an animated GIF from a Canvas element using [gif.js](https://jnordberg.github.io/gif.js/).`
)}

function* _gif(GIF,DOM,width,height)
{
  const gif = new GIF;
  const canvas = DOM.canvas(width, height);
  const context = canvas.getContext("2d");
  context.font = "128px Helvetica Neue";
  context.textAlign = "center";
  for (let i = 0, n = 10; i < n; ++i) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = `hsl(${i / n * 360},100%,50%)`;
    context.fillText(`Frame ${i}`, width / 2, height / 2 + 40);
    gif.addFrame(canvas, {copy: true, delay: 250});
    yield canvas;
  }
  canvas.value = new Promise(resolve => gif.on("finished", resolve));
  gif.render();
  yield canvas;
}


function _3(html,gif){return(
html`<img src="${URL.createObjectURL(gif, {type: "image/gif"})}">`
)}

function _4(DOM,gif){return(
DOM.download(gif)
)}

async function _GIF(require)
{
  const [gif, workerScript] = await Promise.all([
    require("gif.js@0.2"),
    require.resolve("gif.js@0.2/dist/gif.worker.js")
      .then(fetch)
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob, {type: "text/javascript"}))
  ]);
  return class extends gif {
    constructor(options) {
      super({workerScript, ...options});
    }
  };
}


function _width(){return(
640
)}

function _height(){return(
480
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof gif")).define("viewof gif", ["GIF","DOM","width","height"], _gif);
  main.variable(observer("gif")).define("gif", ["Generators", "viewof gif"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","gif"], _3);
  main.variable(observer()).define(["DOM","gif"], _4);
  main.variable(observer("GIF")).define("GIF", ["require"], _GIF);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  return main;
}
