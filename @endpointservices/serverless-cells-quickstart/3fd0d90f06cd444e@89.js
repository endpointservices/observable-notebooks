// https://observablehq.com/@mbostock/canvas-to-gif@89
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Canvas to GIF

Let’s make an animated GIF from a Canvas element using [gif.js](https://jnordberg.github.io/gif.js/).`
)});
  main.variable(observer("viewof gif")).define("viewof gif", ["GIF","DOM","width","height"], function*(GIF,DOM,width,height)
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
);
  main.variable(observer("gif")).define("gif", ["Generators", "viewof gif"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","gif"], function(html,gif){return(
html`<img src="${URL.createObjectURL(gif, {type: "image/gif"})}">`
)});
  main.variable(observer()).define(["DOM","gif"], function(DOM,gif){return(
DOM.download(gif)
)});
  main.variable(observer("GIF")).define("GIF", ["require"], async function(require)
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
);
  main.variable(observer("width")).define("width", function(){return(
640
)});
  main.variable(observer("height")).define("height", function(){return(
480
)});
  return main;
}
