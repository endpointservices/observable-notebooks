import define1 from "./a2a7845a5e2a5aec@139.js";

function _1(md){return(
md`# SummarizeJS

Wraps [Observable's inspect](https://github.com/observablehq/inspector) to a single string and enforces a size limit, intended for sending Javascript values to LLM. Inspect is a good base because it includes type information, common edge cases (typed arrays, regex, symbols), truncates long lists and has functionality to expand and contract the represention. For this use-case we expand up to the max_size when possible.`
)}

function _max_size(Inputs){return(
Inputs.range([20, 500], { label: "max size", step: 1 })
)}

function _example(summarizeJS,data,max_size){return(
summarizeJS(data, { max_size })
)}

function _4(example){return(
example.length
)}

function _data(){return(
{
  nested: {
    date: new Date(),
    fn: function (arg) {},
    symbol: Symbol("cool"),
    nesting: {
      regex: /dsds/,
      map: new Map([
        ["key", "value"],
        ["key2", "value2"]
      ]),
      bar: Array.from({ length: 1000 }).map((_, i) => i)
    }
  },
  obj: {
    nested: Array.from({ length: 1000 }).map((_, i) => i)
  },
  cls: class foo {},
  instance: new URL("https://google.com")
}
)}

function _summarizeJS(html,inspect,postProcess,MouseEvent){return(
function summarizeJS(value, { max_size = 5000 } = {}) {
  // Render the inspected HTML into a temporary <div>
  const inspection = html`<div>${inspect(value)}`;
  let text = postProcess(inspection);
  let prior = undefined;

  // Helper to find all currently collapsed nodes
  const getCollapsed = () => [];

  // Expand collapsed nodes one by one until we exceed max_size
  let el;
  while ((el = inspection.querySelector(".observablehq--collapsed"))) {
    if (!el) break;
    if (text.length >= max_size) break;
    el.dispatchEvent(
      new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    prior = text;
    text = postProcess(inspection);
  }
  // If we've gone over max_size, return the last “prior” snapshot; otherwise current
  return prior && text.length > max_size ? prior : text;
}
)}

function _walked(postProcess,inspect,data){return(
postProcess(inspect(data))
)}

function _postProcess(walk){return(
(dom) => walk(dom).join("")
)}

function _TEXT(){return(
3
)}

function _11(walk,inspect,data){return(
walk(inspect(data))
)}

function _walk(TEXT){return(
function walk(dom, elements = []) {
  if (dom.nodeType === TEXT) {
    if (dom.parentNode.className.baseVal == "observablehq--caret") {
    } else if (dom.parentNode.className == "observablehq--key") {
      elements.push(dom.nodeValue.trim());
    } else if (dom.nodeValue == "  … more") {
      elements.push("…more");
    } else {
      elements.push(dom.nodeValue);
    }
    return;
  }
  let skipNext = false;
  let previous = undefined;
  for (let child of dom.childNodes) {
    if (
      child.className == "observablehq--field" &&
      child.firstChild.className == "observablehq--prototype-key"
    ) {
      continue;
    }
    if (
      child.className == "observablehq--field" &&
      previous?.className == "observablehq--field"
    ) {
      elements.push(", ");
    }

    if (child.className == "observablehq--index") {
      skipNext = true;
      continue;
    }
    if (skipNext) {
      skipNext = false;
      continue;
    }
    walk(child, elements);
    previous = child;
  }
  return elements;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof max_size")).define("viewof max_size", ["Inputs"], _max_size);
  main.variable(observer("max_size")).define("max_size", ["Generators", "viewof max_size"], (G, _) => G.input(_));
  main.variable(observer("example")).define("example", ["summarizeJS","data","max_size"], _example);
  main.variable(observer()).define(["example"], _4);
  const child1 = runtime.module(define1);
  main.import("inspect", child1);
  main.import("Inspector", child1);
  main.import("src", child1);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("summarizeJS")).define("summarizeJS", ["html","inspect","postProcess","MouseEvent"], _summarizeJS);
  main.variable(observer("walked")).define("walked", ["postProcess","inspect","data"], _walked);
  main.variable(observer("postProcess")).define("postProcess", ["walk"], _postProcess);
  main.variable(observer("TEXT")).define("TEXT", _TEXT);
  main.variable(observer()).define(["walk","inspect","data"], _11);
  main.variable(observer("walk")).define("walk", ["TEXT"], _walk);
  return main;
}
