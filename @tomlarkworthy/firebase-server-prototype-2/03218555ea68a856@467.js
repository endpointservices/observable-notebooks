// https://observablehq.com/@mootari/sticky-positioning@467
function _1(md){return(
md`# Sticky Positioning

A notebook iframe's viewport spans the entire document height, with no means to access the parent (i.e., actual) viewport dimensions.
This notebook abuses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accurately determine the real viewport dimensions.

The implementation repeatedly observes and unobserves the \`<html>\` element to get a fresh \`intersectionRect\`. The rect is accurate as long as the notebook iframe spans beyond the upper or lower boundary of the viewport.

*Discussion: https://talk.observablehq.com/t/sticky-sidebar-in-cell/2268*`
)}

function _2(md){return(
md`---
## Demonstration
`
)}

function _options(DOM,html,Element)
{
  const opts = {
    transition: {
      label: 'Transition duration',
      input: {type: 'range', min: 0, max: 500, step: 5, value: 25},
      output: v => `${v} ms`,
    },
    offset: {
      label: 'Top offset',
      input: {type: 'range', min: 0, max: 300, step: 50, value: 0},
      output: v => `${v} px`,
    },
    ease: {
      label: 'Transition timing',
      input: DOM.select(['ease-in', 'ease-out', 'ease-in-out', 'ease', 'linear']),
      output: () => '',
    },
  };
  
  const value = {};
  const view = html`<div style="display:table;font-family:var(--sans-serif)">${Object.entries(opts).map(([k,{label,input,output}]) => {
    const i = input instanceof Element ? input : DOM.element('input', {id: DOM.uid().id, ...input}), o = html`<output>`;
    (i.oninput = () => { o.value = output(i.value) })();
    Object.defineProperty(value, k, {get: () => i.valueAsNumber !== undefined ? i.valueAsNumber : i.value, enumerable: true});
    return html`<div style="display:table-row">
      <label style="display:table-cell;width:0;white-space:nowrap;padding-right:1em" for=${i.id}>${label}:</label>
      <div style="display:table-cell;width:100%">${i} ${o}`;
  })}`;
  return view.value = value, view;
}


function _4(options){return(
options
)}

function _5(html,makeSticky,options,invalidation)
{
  const sidebar = html`<div class=sidebar>
    <p><strong>A sticky sidebar</strong></p>
    <p style="max-width:200px;padding-top:3em">It has some content to stretch its height.`;
  const container = html`<div class=container style="height:1500px">${sidebar}`;
  const unstick = makeSticky(container, sidebar, options);
  invalidation.then(unstick);
  return container;
}


function _6(md){return(
md`
Now that you've seen the default values in action, try experimenting with different parameters. E.g., adjust the sliders to:
\`\`\`javascript
  { transition: 250, offset: 300 }
\`\`\`
`
)}

function _7(md){return(
md`---
## API
`
)}

function _makeSticky(observeViewport,clamp){return(
function makeSticky(context, element, {transition = 75, offset = 0, ease = 'ease-in'} = {}) {
  element.style.position = 'absolute';
  element.style.transition = `top ${transition}ms ${ease}`;
  
  return observeViewport((top, bottom) => {
    const rc = context.getBoundingClientRect();
    const rs = element.getBoundingClientRect();
    element.style.top = clamp(0, rc.height - rs.height, top - rc.top + offset) + 'px';
  });
}
)}

function _observeViewport(IntersectionObserver){return(
function observeViewport(callback) {
  let top = -1, bottom = -1, raf;
  const observer = new IntersectionObserver(([e]) => {
    const t = e.intersectionRect.top;
    const b = e.intersectionRect.bottom;
    if(t !== top || b !== bottom) {
      top = t;
      bottom = b;
      callback(top, bottom);
    }
    observer.unobserve(target);
    raf = requestAnimationFrame(observe);
  });
  const target = document.documentElement;
  const observe = () => observer.observe(target);
  observe();
  
  // Disconnect callback.
  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
  }
}
)}

function _clamp(){return(
function clamp(a, b, v) {
  return v < a ? a : v > b ? b : v;
}
)}

function _11(md){return(
md`---`
)}

function _12(html,monoGradient){return(
html`<style>
.container {
  background: ${monoGradient({count:30,color1:'#fea',color2:'#faa'})};
}
.sidebar {
  left: -5px;
  background: #555;
  padding: 1em;
  box-shadow: 10px 15px 0px 0px #5003;
  font-family: var(--sans-serif);
  font-size: 1.2rem;
  color: white;
}
`
)}

function _monoGradient(){return(
function monoGradient(options = {}) {
  const {
    count = 10,
    color1: c1 = '#000',
    color2: c2 = '#fff',
    width = 20,
    direction: dir = '45deg',
  } = options;
  const height = (1/count*100).toFixed(2)+'%';
  const slices = Array(count).fill().map((_ ,i , {length: l}) => {
    const t = i/l, tw = (t*width).toFixed(0)+'px', oy = (t*100).toFixed(2);
    const stops = `${c2},${c2} ${tw},${c1} ${tw},${c1} ${width}px`;
    return `repeating-linear-gradient(${dir},${stops}) 50% ${oy}% / 100% ${height} no-repeat`;
  });
  return slices.join() + `,${c2}`;
}
)}

function _14(md){return(
md`---
## Deprecated`
)}

function _ViewportObservabler(observeViewport){return(
class ViewportObservabler {
  constructor(callback) {
    console.warn('ViewportObservabler is deprecated. Use observeViewport() instead.');
    this._disconnect = observeViewport((top, bottom) => callback([top, bottom]));
  }
  disconnect() {
    this._disconnect();
  }
}
)}

function _16(md){return(
md`---
## Changelog
- [2021-10-08](https://observablehq.com/compare/03218555ea68a856@463...03218555ea68a856@466): Bugfix: Observer not disconnecting when unstick() callback is called.
- [2021-09-10](https://observablehq.com/compare/03218555ea68a856@429...03218555ea68a856@454): Removed \`ViewportObservabler\` and probe element in favor of a simpler \`observeViewport\` implementation that watches the \`<html>\` element by repeatedly observing and unobserving it.
- [2021-09-10](https://observablehq.com/compare/03218555ea68a856@411...03218555ea68a856@428): Added option \`ease\` to \`makeSticky\`
- [2021-09-10](https://observablehq.com/compare/03218555ea68a856@384...03218555ea68a856@411): Reduced load by replacing \`setTimeout\` with \`requestAnimationFrame\`; option \`interval\``
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof options")).define("viewof options", ["DOM","html","Element"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer()).define(["options"], _4);
  main.variable(observer()).define(["html","makeSticky","options","invalidation"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("makeSticky")).define("makeSticky", ["observeViewport","clamp"], _makeSticky);
  main.variable(observer("observeViewport")).define("observeViewport", ["IntersectionObserver"], _observeViewport);
  main.variable(observer("clamp")).define("clamp", _clamp);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["html","monoGradient"], _12);
  main.variable(observer("monoGradient")).define("monoGradient", _monoGradient);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("ViewportObservabler")).define("ViewportObservabler", ["observeViewport"], _ViewportObservabler);
  main.variable(observer()).define(["md"], _16);
  return main;
}
