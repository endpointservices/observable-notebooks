import define1 from "./17c8ce433e1df58e@3584.js";
import define2 from "./f92778131fd76559@1208.js";
import define3 from "./dfdb38d5580b5c35@347.js";

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

function _7(md){return(
md`## Made with Robocoop + the Bindable UI Skill`
)}

function _8($0){return(
$0
)}

function _9(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _10($0){return(
$0
)}

function _11(md){return(
md`## Current Chat context`
)}

function _12($0){return(
$0
)}

function _13(md){return(
md`tick the cells to include in the next prompt`
)}

function _14($0){return(
$0
)}

function _15($0){return(
$0
)}

function _16(md){return(
md`### AI Settings`
)}

function _17($0){return(
$0
)}

function _18($0){return(
$0
)}

function _19($0){return(
$0
)}

function _20(md){return(
md`---`
)}

function _22(background_tasks){return(
background_tasks
)}

function _bindableUISkill(view,md,Inputs,htl,Event){return(
{
  prompt:
    "Demonstrate how to use the bidirection bindable UI composer, the view literal",
  time: 1700263368139,
  comment: "Binding inputs, composing within HTML and accessing via a viewof"
} &&
  view`<div class="skill">

  ${md`
  ## Bindable UI Skill
  ~~~js
  import {view} from '@tomlarkworthy/view' // required notebook import for bindable UI
  ~~~
  The view literal can compose bidirectional HTML UIs, whose value can be written to and the UI will visually update. You can bind them storage so they remember values across page refreshes
  `}
  <details><summary>example</summary>
    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Text Input</h3>
      <!-- Note a 2 element array bind the 2nd arg to the parent under the field name of the first arg -->
      ${[
        "textInput",
        Inputs.text({ placeholder: "Type something...", value: "Hello World!" })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Select Input</h3>
      ${[
        "selectInput",
        Inputs.select(["Option 1", "Option 2", "Option 3"], {
          value: "Option 2",
          label: "Choose an option"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Input Arrays</h3>
      <!-- Note a 3 element array bind the 2nd array to the parent under the field name of the first arg, and uses the 3rd arg as a builder when the underlying data array expands-->
      ${[
        "array",
        Array.from({ length: 3 }, (_, i) =>
          Inputs.text({ placeholder: `Input ${i + 1}` })
        ),
        (value) => Inputs.text({ value: value })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px;">
      <h3>Button Action</h3>
      <div style="display: flex; justify-content: flex-start;">
      <!-- the Inputs.button has a lot of formatting which breaks flexbox -->
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) => {
          const container = evt.target.closest(".skill");
          container.value.array.push(5); // manipulating the data array will trigger the UI builder
          container.dispatchEvent(new Event("input"));
        }}>add`
      ]}
      ${[
        "buttonAction",
        htl.html`<button onclick=${(evt) =>
          evt.target.closest(".skill").value.array.pop()}>remove`
      ]}
      </div>
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Radio Input</h3>
      ${[
        "radioInput",
        Inputs.radio(["Choice A", "Choice B", "Choice C"], {
          value: "Choice B",
          label: "Pick one"
        })
      ]}
    </div>

    <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
      <h3>Checkbox Input</h3>
      ${[
        "checkboxInput",
        Inputs.checkbox(["Check 1", "Check 2"], {
          values: ["Check 1"],
          label: "Select checks"
        })
      ]}
    </div>

</details>
  </div>`
)}

function _26(footer){return(
footer
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
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["viewof prompt"], _8);
  main.variable(observer()).define(["Inputs","suggestion"], _9);
  main.variable(observer()).define(["viewof suggestion"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["viewof context_viz"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _14);
  main.variable(observer()).define(["viewof feedback_prompt"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _17);
  main.variable(observer()).define(["viewof api_endpoint"], _18);
  main.variable(observer()).define(["viewof settings"], _19);
  main.variable(observer()).define(["md"], _20);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof feedback_prompt", child1);
  main.import("feedback_prompt", child1);
  main.import("viewof feedback_cells_selector", child1);
  main.import("feedback_cells_selector", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer()).define(["background_tasks"], _22);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _26);
  return main;
}
