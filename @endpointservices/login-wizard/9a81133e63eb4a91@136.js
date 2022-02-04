// https://observablehq.com/@mbostock/escaping-html@136
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Escaping HTML

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Jan. 2022:*** *Observable now supports [**Hypertext Literal**](/@observablehq/htl), a new HTML tagged template literal that does escaping by default! This notebook will remain for history, but please upgrade to [Hypertext Literal](/@observablehq/htl).*</p>

Be careful when using \`html\` tagged template literals. If you don’t escape embedded expressions, they are interpreted as HTML rather than text. Sometimes this is what you want, but sometimes this leads to undesired behavior:`
)});
  main.variable(observer()).define(["html","values"], function(html,values){return(
html`<select>${values.map(v => `
  <option value="${v}">${v}</option>`)}
</select>`
)});
  main.variable(observer("values")).define("values", function(){return(
["Foo", "Bar\"></option><option selected>Oops"]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To embed values safely, use the DOM API to set attributes and text:`
)});
  main.variable(observer()).define(["html","values"], function(html,values){return(
html`<select>${values.map(v => {
  const option = html`<option>`;
  option.textContent = v;
  return option;
})}</select>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can also use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):`
)});
  main.variable(observer()).define(["html","values"], function(html,values){return(
html`<select>${values.map(v => Object.assign(
  html`<option>`, {textContent: v}
))}</select>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You can also escape manually, but this requires implementing an escape function:`
)});
  main.variable(observer()).define(["html","values","escapeHtml"], function(html,values,escapeHtml){return(
html`<select>${values.map(v => `
  <option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`)}
</select>`
)});
  main.variable(observer("escapeHtml")).define("escapeHtml", function(){return(
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
)});
  return main;
}
