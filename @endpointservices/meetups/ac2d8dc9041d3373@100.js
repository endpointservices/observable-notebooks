import define1 from "./293899bef371e135@280.js";

function _1(md){return(
md`# Upcoming Events

There is an ongoing series on **Building a SMART FARM**. You can find the previous cleaned up videos and accompanying Observable notebooks [here](https://observablehq.com/collection/@tomlarkworthy/livecoding).`
)}

function _upcoming(htl){return(
htl.html`<iframe width="100%" height="600" src="https://www.addevent.com/event/yJ14513755">
</iframe>`
)}

function _3(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("upcoming")).define("upcoming", ["htl"], _upcoming);
  main.variable(observer()).define(["footer"], _3);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  return main;
}
