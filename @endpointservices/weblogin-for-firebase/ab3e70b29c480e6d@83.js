// https://observablehq.com/@mbostock/copier@83
function _1(md,Copier){return(
md`# Copier

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Sep. 2021:*** *Buttons are now available as part of [**Observable Inputs**](/@observablehq/inputs), and you can use <code>navigator.clipboard.writeText</code> to copy text to the clipboard! This notebook will remain for history, but please upgrade.*</p>

A button to help copy snippets of text to the clipboard. To use in your notebook:

~~~js
import {Copier} from "@mbostock/copier"
~~~

${Copier("Copy import", {value: `import {Copier} from "@mbostock/copier"`})}`
)}

function _2(Inputs){return(
Inputs.textarea({placeholder: "Now try pasting here."})
)}

function _3(Copier){return(
Copier("Click me!", {value: "Hello, world!"})
)}

function _4(Copier){return(
Copier([
  ["1", "I have eaten the plums that were in the icebox"],
  ["2", "and which you were probably saving for breakfast"],
  ["3", "Forgive me they were delicious so sweet and so cold"]
], {label: "Snippets"})
)}

function _5(md){return(
md`---

## Implementation`
)}

function _6(html,pbcopy)
{
  let count = 0;
  return Object.assign(
    html`<button>Click me to copy text!`,
    {onclick: () => pbcopy(`Hello, world! ${++count}`)}
  );
}


function _pbcopy(){return(
text => navigator.clipboard.writeText(text)
)}

function _Copier(pbcopy,Inputs){return(
function Copier(content = "Copy code", options) {
  if (Array.isArray(content)) content = Array.from(content, ([key, value]) => [key, () => (pbcopy(value), value)]);
  return Inputs.button(content, {...options, reduce: (value) => (pbcopy(value), value)});
}
)}

function _copy(pbcopy){return(
pbcopy
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","Copier"], _1);
  main.variable(observer()).define(["Inputs"], _2);
  main.variable(observer()).define(["Copier"], _3);
  main.variable(observer()).define(["Copier"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["html","pbcopy"], _6);
  main.variable(observer("pbcopy")).define("pbcopy", _pbcopy);
  main.variable(observer("Copier")).define("Copier", ["pbcopy","Inputs"], _Copier);
  main.variable(observer("copy")).define("copy", ["pbcopy"], _copy);
  return main;
}
