import define1 from "./f92778131fd76559@1208.js";
import define2 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Serverless Cells Scratch pad`
)}

function _2(md){return(
md`### Can we return a href in a div?`
)}

function _hrefDivHtml(html){return(
html`<div href="https://observablehq.com/d/152aa2a44fd7f9cb">Cool</div>`
)}

function _4(hrefDivHtml){return(
hrefDivHtml.href
)}

function _hrefDivProperty(html)
{
  const div = html`<div>Cool</div>`;
  div.href = 'https://observablehq.com/d/152aa2a44fd7f9cb';
  return div;
}


function _6(hrefDivProperty){return(
hrefDivProperty.href
)}

function _7(md){return(
md`Neither is clickable by you can see one`
)}

function _9(md){return(
md`### New UI aims

- Zero authentication secret upload
   - login-with-comments

- UI needs to be reusable for downstream (e.g. fetchp proxy config)

`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("hrefDivHtml")).define("hrefDivHtml", ["html"], _hrefDivHtml);
  main.variable(observer()).define(["hrefDivHtml"], _4);
  main.variable(observer("hrefDivProperty")).define("hrefDivProperty", ["html"], _hrefDivProperty);
  main.variable(observer()).define(["hrefDivProperty"], _6);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.variable(observer()).define(["md"], _9);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  return main;
}
