import define1 from "./03218555ea68a856@467.js";
import define2 from "./f92778131fd76559@1208.js";

function _1(md){return(
md`# Draggable Sticky view

Create complex UIs that are always in view and that can be adjusted when needed.

Adapted from [@mootari/sticky-positioning](https://observablehq.com/@mootari/sticky-positioning)
`
)}

function _value(stickyView,view,Inputs,width){return(
stickyView(
  view`<div>
  ${["text", Inputs.textarea({ value: "text" })]}
  ${["number", Inputs.range()]}
</div>`,
  { offset: 10, left: width * 0.66, right: 25 }
)
)}

function _3(md){return(
md`Like other composable views, the \`stickyView\` exposes its child's value in a back-writable way`
)}

function _4(value){return(
value
)}

function _stickyView(html,view,makeSticky,makeMovable){return(
(child, { left = 0, right = 0, offset = 0 } = {}) => {
  ({
    prompt:
      "Can we make a movable sticky square, that responds to drag, by unsticking and resticking itself",
    time: 1725222636096
  });
  const dragger = html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
      <rect x="1" y="1" width="22" height="22" rx="2" fill="white" stroke="black"></rect>
      <circle cx="9" cy="6" r="2"/>
      <circle cx="9" cy="12" r="2"/>
      <circle cx="9" cy="18" r="2"/>
      <circle cx="15" cy="6" r="2"/>
      <circle cx="15" cy="12" r="2"/>
      <circle cx="15" cy="18" r="2"/>
    </svg>`;
  const element = view`<div style="cursor: grab; pointer-events: auto; left: ${left}px; right: ${right}px">
    ${dragger}
    <div>${["...", child]}</div>
  </div>`;

  const container = view`<div style="z-index: 1000; width:100%; height:100%; position: fixed; top:0px; pointer-events: none;touch-action: none">${[
    "...",
    element
  ]}`;
  makeSticky(container, element, { offset });
  makeMovable(dragger, element);
  return container;
}
)}

function _makeSticky(observeViewport){return(
function makeSticky(context, element, { offset = 0 } = {}) {
  element.style.position = "absolute";
  return observeViewport((top) => {
    const rc = context.getBoundingClientRect();
    const rs = element.getBoundingClientRect();
    console.log("stickying", offset);
    element.style.top = `${top - rc.top + offset}px`;
  });
}
)}

function _observeViewport(IntersectionObserver){return(
function observeViewport(callback) {
  console.log("creating observeViewport");
  let lastTop = -1,
    raf;
  const observer = new IntersectionObserver(([e]) => {
    if (Math.abs(lastTop - e.intersectionRect.top) > 2) {
      console.log(lastTop, e.intersectionRect.top);
      lastTop = e.intersectionRect.top;
      callback(e.intersectionRect.top);
    }
    observer.unobserve(target);
    raf = requestAnimationFrame(observe);
  });
  const target = document.documentElement;
  const observe = () => observer.observe(target);
  observe();

  // Disconnect callback.
  return () => {
    console.log("disconnect");
    cancelAnimationFrame(raf);
    observer.disconnect();
  };
}
)}

function _makeMovable(event,clamp,width){return(
function makeMovable(handle, el) {
  handle.onpointerdown = (e) => {
    let offsetX = e.clientX - el.offsetLeft;
    event.preventDefault();

    function move(event) {
      el.style.left = `${clamp(0, width - 20, event.clientX - offsetX)}px`;
      event.preventDefault();
    }

    function stopDrag() {
      el.style.cursor = "grab";
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", stopDrag);
    }

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", stopDrag);
  };
}
)}

function _clamp(){return(
function clamp(a, b, v) {
  return v < a ? a : v > b ? b : v;
}
)}

function _12(htl){return(
htl.html`<div style="height:300px">`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof value")).define("viewof value", ["stickyView","view","Inputs","width"], _value);
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["value"], _4);
  main.variable(observer("stickyView")).define("stickyView", ["html","view","makeSticky","makeMovable"], _stickyView);
  main.variable(observer("makeSticky")).define("makeSticky", ["observeViewport"], _makeSticky);
  main.variable(observer("observeViewport")).define("observeViewport", ["IntersectionObserver"], _observeViewport);
  main.variable(observer("makeMovable")).define("makeMovable", ["event","clamp","width"], _makeMovable);
  main.variable(observer("clamp")).define("clamp", _clamp);
  const child1 = runtime.module(define1);
  main.import("makeSticky", "makeStickyRaw", child1);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  main.variable(observer()).define(["htl"], _12);
  return main;
}
