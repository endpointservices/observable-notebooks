import define1 from "./f92778131fd76559@1212.js";
import define2 from "./17c8ce433e1df58e@3595.js";

function _1(md){return(
md`# UUID compressor
`
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
  ## Styled View UI Skill
  ~~~js
  import {view} from '@tomlarkworthy/view' // required notebook import for bindable UI
  ~~~
  The view literal can compose bidirectional HTML UIs, whose value can be written to and the UI will visually update. They can decorated views with HTML.
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

function _indexUUIDs(){return(
{
  prompt:
    "write a function that indexes all unique UUIDs in a document, and replaces them with numbers",
  time: 1727254619679
} &&
  function indexUUIDs(document) {
    const uuidRegex =
      /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;
    const uniqueUUIDs = [...new Set(document.match(uuidRegex))];
    const uuidMap = {};
    uniqueUUIDs.forEach((uuid, index) => {
      uuidMap[uuid] = index + 1;
    });
    const replacedDocument = document.replace(uuidRegex, (match) => {
      debugger;
      return uuidMap[match];
    });
    return { replacedDocument, uuidMap };
  }
)}

function _inputText(Inputs){return(
{
  prompt: "write a UI text input that strips all UUIDS and shows the output",
  time: 1727254674077
} &&
  Inputs.textarea({
    label: "Enter text with UUIDs",
    value: ""
  })
)}

function _strippedOutput(Inputs,indexUUIDs,inputText){return(
{
  prompt: "render the stripped output of the UI",
  time: 1727254694152
} &&
  Inputs.textarea({
    label: "Stripped data",
    disabled: true,
    rows: 100,
    value: indexUUIDs(inputText).replacedDocument
  })
)}

function _7($0){return(
$0
)}

function _8(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _9($0){return(
$0
)}

function _10(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _11($0){return(
$0
)}

function _12(md){return(
md`### AI Settings`
)}

function _13($0){return(
$0
)}

function _14($0){return(
$0
)}

function _15($0){return(
$0
)}

function _16(md){return(
md`---`
)}

function _18(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer("viewof bindableUISkill")).define("viewof bindableUISkill", ["view","md","Inputs","htl","Event"], _bindableUISkill);
  main.variable(observer("bindableUISkill")).define("bindableUISkill", ["Generators", "viewof bindableUISkill"], (G, _) => G.input(_));
  main.variable(observer("indexUUIDs")).define("indexUUIDs", _indexUUIDs);
  main.variable(observer("viewof inputText")).define("viewof inputText", ["Inputs"], _inputText);
  main.variable(observer("inputText")).define("inputText", ["Generators", "viewof inputText"], (G, _) => G.input(_));
  main.variable(observer("strippedOutput")).define("strippedOutput", ["Inputs","indexUUIDs","inputText"], _strippedOutput);
  main.variable(observer()).define(["viewof prompt"], _7);
  main.variable(observer()).define(["Inputs","suggestion"], _8);
  main.variable(observer()).define(["viewof suggestion"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["viewof context_viz"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _13);
  main.variable(observer()).define(["viewof api_endpoint"], _14);
  main.variable(observer()).define(["viewof settings"], _15);
  main.variable(observer()).define(["md"], _16);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("variables", child2);
  main.import("api_call_response", child2);
  main.import("background_tasks", child2);
  main.import("ndd", child2);
  main.import("_ndd", child2);
  main.import("instruction", child2);
  main.import("_events", child2);
  main.import("highlight", child2);
  main.import("mutable context", child2);
  main.import("context", child2);
  main.import("viewof prompt", child2);
  main.import("prompt", child2);
  main.import("viewof suggestion", child2);
  main.import("suggestion", child2);
  main.import("viewof settings", child2);
  main.import("settings", child2);
  main.import("viewof OPENAI_API_KEY", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("viewof api_endpoint", child2);
  main.import("api_endpoint", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer()).define(["background_tasks"], _18);
  return main;
}
