import define1 from "./293899bef371e135@267.js";

function _1(md){return(
md`# Upcoming Events

Events happening soon that you might want a calendar event for.`
)}

function _upcoming(htl){return(
htl.html`<iframe width="100%" height="500" src="https://www.addevent.com/event/xp14041481">
</iframe>`
)}

function _4(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("upcoming")).define("upcoming", ["htl"], _upcoming);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _4);
  return main;
}
