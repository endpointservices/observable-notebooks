// https://observablehq.com/@mbostock/escaping-html@136
function _1(md){return(
md`# Escaping HTML

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Jan. 2022:*** *Observable now supports [**Hypertext Literal**](/@observablehq/htl), a new HTML tagged template literal that does escaping by default! This notebook will remain for history, but please upgrade to [Hypertext Literal](/@observablehq/htl).*</p>

Be careful when using \`html\` tagged template literals. If you don’t escape embedded expressions, they are interpreted as HTML rather than text. Sometimes this is what you want, but sometimes this leads to undesired behavior:`
)}

function _2(html,values){return(
html`<select>${values.map(v => `
  <option value="${v}">${v}</option>`)}
</select>`
)}

function _values(){return(
["Foo", "Bar\"></option><option selected>Oops"]
)}

function _4(md){return(
md`To embed values safely, use the DOM API to set attributes and text:`
)}

function _5(html,values){return(
html`<select>${values.map(v => {
  const option = html`<option>`;
  option.textContent = v;
  return option;
})}</select>`
)}

function _6(md){return(
md`You can also use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):`
)}

function _7(html,values){return(
html`<select>${values.map(v => Object.assign(
  html`<option>`, {textContent: v}
))}</select>`
)}

function _8(md){return(
md`You can also escape manually, but this requires implementing an escape function:`
)}

function _9(html,values,escapeHtml){return(
html`<select>${values.map(v => `
  <option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`)}
</select>`
)}

function _escapeHtml(){return(
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","values"], _2);
  main.variable(observer("values")).define("values", _values);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["html","values"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["html","values"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["html","values","escapeHtml"], _9);
  main.variable(observer("escapeHtml")).define("escapeHtml", _escapeHtml);
  return main;
}
