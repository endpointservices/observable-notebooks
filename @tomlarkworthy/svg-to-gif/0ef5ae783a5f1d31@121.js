// https://observablehq.com/@mbostock/more-deliberate-inputs@121
function _1(md){return(
md`# More Deliberate Inputs

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Feb. 2021:*** *Observable now supports [**Text inputs**](/@observablehq/input-text) with a submit option! This notebook will remain for history, but please upgrade to [Observable Inputs](/@observablehq/inputs).*</p>

If you use a default text input in Observable, the notebook will react instantaneously as you type in the input.`
)}

function _text(html){return(
html`<input placeholder="Type here!">`
)}

function _3(text){return(
text
)}

function _4(md){return(
md`Sometimes what you want is a more *deliberate* input, where the notebook will only react when you click submit or hit enter. You can do that using a form and mapping the form’s *submit* event to the *input* event expected by Observable.`
)}

function _value(submit){return(
submit()
)}

function _6(value){return(
value
)}

function _7(md){return(
md`To use this implementation in your notebook:

~~~js
import {submit} from "@mbostock/more-deliberate-inputs"
~~~`
)}

function _8(md){return(
md`---

## Appendix`
)}

function _submit(Inputs){return(
({
  value = "",
  placeholder = "Type here, then click submit.",
  submit = "Submit",
  ...props
} = {}) => {
  const form = Inputs.text({value, placeholder, submit});
  Object.assign(form.text, props);
  return form;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof text")).define("viewof text", ["html"], _text);
  main.variable(observer("text")).define("text", ["Generators", "viewof text"], (G, _) => G.input(_));
  main.variable(observer()).define(["text"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof value")).define("viewof value", ["submit"], _value);
  main.variable(observer("value")).define("value", ["Generators", "viewof value"], (G, _) => G.input(_));
  main.variable(observer()).define(["value"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("submit")).define("submit", ["Inputs"], _submit);
  return main;
}
