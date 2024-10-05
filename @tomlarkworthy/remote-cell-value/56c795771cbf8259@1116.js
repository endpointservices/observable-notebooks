// https://observablehq.com/@tomlarkworthy/remote-cell-value@1116
import define1 from "./65d33fe44849cfde@588.js";

function _1(md){return(
md `# Literal remote cell value 
Deprecated: Use https://observablehq.com/@tomlarkworthy/metaprogramming#peekFirst directly instead
`
)}

function _target_notebook(html){return(
html`<input type=text value="@tomlarkworthy/subdomain-certification">`
)}

function _target_cell(html){return(
html`<input type=text value="challenge_response">`
)}

function _4(remoteCellValue,target_notebook,target_cell){return(
remoteCellValue(target_notebook, target_cell)
)}

function _5(md){return(
md`
~~~js
import {remoteCellValue} from '@tomlarkworthy/remote-cell-value'
~~~
`
)}

function _remoteCellValue(peekFirst){return(
async function remoteCellValue(target_notebook, target_cell, apiUrl) {
  return peekFirst({
    notebook: target_notebook,
    cell: target_cell
  })
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof target_notebook")).define("viewof target_notebook", ["html"], _target_notebook);
  main.variable(observer("target_notebook")).define("target_notebook", ["Generators", "viewof target_notebook"], (G, _) => G.input(_));
  main.variable(observer("viewof target_cell")).define("viewof target_cell", ["html"], _target_cell);
  main.variable(observer("target_cell")).define("target_cell", ["Generators", "viewof target_cell"], (G, _) => G.input(_));
  main.variable(observer()).define(["remoteCellValue","target_notebook","target_cell"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("remoteCellValue")).define("remoteCellValue", ["peekFirst"], _remoteCellValue);
  const child1 = runtime.module(define1);
  main.import("peekFirst", child1);
  return main;
}
