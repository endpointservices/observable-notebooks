import define1 from "./f92778131fd76559@1212.js";

function _1(md){return(
md`# Tabbed Pane View

Turn a dictionary of views into a tabbed composite view

\`\`\`js
import {tabbedPane} from '@tomlarkworthy/tabbed-pane-view'
\`\`\``
)}

function _tabbedPane(view,htl){return(
{
  prompt:
    "create a function that takes a dictionary of views and create a new view that is a tabbed pane that switches between them",
  time: 1716923511020,
  comment: "Function to create a tabbed pane view from a dictionary of views"
} &&
  function tabbedPane(viewDict) {
    const tabNames = Object.keys(viewDict);
    const container = view`<div>
    <div class="tabs">
      ${tabNames.map(
        (name, i) => htl.html`<button 
          class="tab ${i === 0 ? "active" : ""}"
          onclick=${() => switchTab(i)}>${name}</button>`
      )}
    </div>
    <div class="tab-content">
      ${[
        "...",
        Object.fromEntries(
          tabNames.map((name, i) => [
            name,
            view`<div class="tab-panel" style="display: ${
              i === 0 ? "block" : "none"
            };">
        ${["...", viewDict[name]]}
      </div>`
          ])
        )
      ]}
    </div>
  </div>`;

    function switchTab(index) {
      container.querySelectorAll(":scope > .tabs > .tab").forEach((tab, i) => {
        tab.classList.toggle("active", i === index);
      });
      container
        .querySelectorAll(":scope > .tab-content > .tab-panel")
        .forEach((panel, i) => {
          panel.style.display = i === index ? "block" : "none";
        });
    }

    return container;
  }
)}

function _controls(tabbedPane,Inputs){return(
tabbedPane({
  left: Inputs.range([0, 1]),
  right: Inputs.range([0, 10]),
  nested: tabbedPane({
    text: Inputs.text(),
    textarea: Inputs.textarea()
  })
})
)}

function _4(md){return(
md`## Backdrivable`
)}

function _5(Inputs,$0){return(
Inputs.bind(Inputs.range(), $0.left)
)}

function _6(Inputs,$0){return(
Inputs.bind(Inputs.range([0, 10]), $0.right)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("tabbedPane")).define("tabbedPane", ["view","htl"], _tabbedPane);
  main.variable(observer("viewof controls")).define("viewof controls", ["tabbedPane","Inputs"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Inputs","viewof controls"], _5);
  main.variable(observer()).define(["Inputs","viewof controls"], _6);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  return main;
}
