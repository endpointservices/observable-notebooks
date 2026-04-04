function _1(md){return(
md`# DOM view

A view whose value is a DOM node, and whose view is a container of that value. 

\`\`\`js
import {domView} from '@tomlarkworthy/dom-view'
\`\`\``
)}

function _domView(invalidation){return(
({ className = "" } = {}) => {
  const dom = document.createElement("div");
  dom.className = className;
  dom.value = undefined;
  invalidation.then(dom.addEventListener("input", () => {}));
  Object.defineProperty(dom, "value", {
    set: (value) => {
      if (dom.firstChild) dom.textContent = "";
      if (value) dom.appendChild(value);
    },
    get: () => dom.firstChild
  });
  return dom;
}
)}

function _example(domView){return(
domView()
)}

function _4($0,html){return(
$0.value = html`<button>❤️</button>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("domView")).define("domView", ["invalidation"], _domView);
  main.variable(observer("viewof example")).define("viewof example", ["domView"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof example","html"], _4);
  return main;
}
