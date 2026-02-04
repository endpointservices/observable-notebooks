import define1 from "./f109935193c0deba@4551.js";

function _1(md){return(
md`# Matrix Background

Modified from the work of Boujjou Achraf on [codepen](https://codepen.io/wefiy/pen/WPpEwo)`
)}

function _frequency(Inputs){return(
Inputs.range([0, 1], {
  label: "frequency"
})
)}

function _fade(Inputs){return(
Inputs.range([0, 1], {
  label: "fade",
  value: 0.1
})
)}

function _canvas(htl){return(
htl.html`<canvas style="position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;"></canvas>`
)}

function _6(canvas,fade,frequency,invalidation){return(
(() => {
  const ctx = canvas.getContext("2d");
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split(
      ""
    );

  let fontSize = 12;
  let columns = 0;
  let drops = [];
  let raf = null;

  function resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = Math.floor(window.innerWidth);
    const h = Math.floor(window.innerHeight);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.ceil(w / fontSize);
    drops = Array.from(
      { length: columns },
      () => 1 + (Math.random() * h) / fontSize
    );
  }

  function frame() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;

    ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const ch = chars[(Math.random() * chars.length) | 0];

      const head = Math.random() < 0.035;
      ctx.fillStyle = head
        ? "rgba(10, 110, 85, 0.85)"
        : "rgba(30, 55, 60, 0.50)";
      ctx.shadowColor = head ? "rgba(0, 140, 110, 0.25)" : "transparent";
      ctx.shadowBlur = head ? 6 : 0;

      ctx.fillText(ch, x, y);

      if (y > h && Math.random() > frequency) drops[i] = 0;
      drops[i] += 1;
    }

    raf = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  raf = requestAnimationFrame(frame);

  invalidation.then(() => {
    if (raf != null) cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  });

  return canvas;
})()
)}

function _7(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("robocoop", child1);
  main.variable(observer("viewof frequency")).define("viewof frequency", ["Inputs"], _frequency);
  main.variable(observer("frequency")).define("frequency", ["Generators", "viewof frequency"], (G, _) => G.input(_));
  main.variable(observer("viewof fade")).define("viewof fade", ["Inputs"], _fade);
  main.variable(observer("fade")).define("fade", ["Generators", "viewof fade"], (G, _) => G.input(_));
  main.variable(observer("canvas")).define("canvas", ["htl"], _canvas);
  main.variable(observer()).define(["canvas","fade","frequency","invalidation"], _6);
  main.variable(observer()).define(["robocoop"], _7);
  return main;
}
