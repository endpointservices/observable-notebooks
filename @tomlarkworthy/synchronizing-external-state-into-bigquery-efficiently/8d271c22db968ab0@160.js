// https://observablehq.com/@mbostock/form-input@160
function _1(md){return(
md`# Form Input

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Jan. 2022:*** *Observable now supports [**form inputs**](/@observablehq/input-form)! This notebook will remain for history, but please upgrade to [Observable Inputs](/@observablehq/inputs).*</p>

This notebook defines a *form* function which makes it easier to use complex forms together with [Observable views](/@mbostock/introduction-to-views). To use it in your notebook:

\`\`\`js
import {form} from "@mbostock/form-input"
\`\`\`

Pass the *form* function a form element, and you’re off to the races! 🐎`
)}

function _object(form,html){return(
form(html`<form>
  <div><label><input name="message" type="text" value="Hello, form!"> <i>message</i></label></div>
  <div><label><input name="hue" type="range" min=0 max=360> <i>hue</i></label></div>
  <div>
    <label><input name="size" type="radio" value="12"> <i>small</i></label>
    <label><input name="size" type="radio" value="24" checked> <i>medium</i></label>
    <label><input name="size" type="radio" value="48"> <i>large</i></label>
  </div>
  <div>
    <label>
      <select name="emojis" multiple size="3">
        <option value="🍎">🍎</option>
        <option value="🔥">🔥</option>
        <option value="🐙">🐙</option>
      </select>
    <i>emojis</i></label>
  </div>
</form>`)
)}

function _3(object){return(
object
)}

function _4(md){return(
md`Now you have a reactive reference to resulting object!`
)}

function _5(html,svg,object){return(
html`<svg
  width="640"
  height="64"
  viewBox="0 0 640 64"
  style="width:100%;max-width:640px;height:auto;display:block;background:#333;"
>
  ${Object.assign(
    svg`<text
    x="50%"
    y="50%"
    text-anchor="middle" 
    dy="0.35em"
    fill="hsl(${object.hue},100%,50%)"
    font-size="${object.size}"
  >`,
    {
      textContent: `${object.message} ${object.emojis.join(" ")}`
    }
  )}
</svg>`
)}

function _6(md){return(
md`---

## Implementation`
)}

function _form(html,formValue){return(
function form(form) {
  const container = html`<div>${form}`;
  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("change", () => container.dispatchEvent(new CustomEvent("input")));
  form.addEventListener("input", () => container.value = formValue(form));
  container.value = formValue(form);
  return container
}
)}

function _formValue(){return(
function formValue(form) {
  const object = {};
  for (const input of form.elements) {
    if (input.disabled || !input.hasAttribute("name")) continue;
    let value = input.value;
    switch (input.type) {
      case "range":
      case "number": {
        value = input.valueAsNumber;
        break;
      }
      case "date": {
        value = input.valueAsDate;
        break;
      }
      case "radio": {
        if (!input.checked) continue;
        break;
      }
      case "checkbox": {
        if (input.checked) value = true;
        else if (input.name in object) continue;
        else value = false;
        break;
      }
      case "file": {
        value = input.multiple ? input.files : input.files[0];
        break;
      }
      case "select-multiple": {
        value = Array.from(input.selectedOptions, option => option.value);
        break;
      }
    }
    object[input.name] = value;
  }
  return object;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof object")).define("viewof object", ["form","html"], _object);
  main.variable(observer("object")).define("object", ["Generators", "viewof object"], (G, _) => G.input(_));
  main.variable(observer()).define(["object"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["html","svg","object"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("form")).define("form", ["html","formValue"], _form);
  main.variable(observer("formValue")).define("formValue", _formValue);
  return main;
}
