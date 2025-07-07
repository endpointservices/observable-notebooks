function _1(md){return(
md`# MiniCell
## Small summary cell

This is an alternative [inspector](https://observablehq.com/@observablehq/inspector)`
)}

function _into(MiniCell){return(
(container) => () =>
  new MiniCell(container.appendChild(document.createElement("div")))
)}

function _MiniCell(style){return(
class MiniCell {
  constructor(element, options) {
    style;
    this._node = element;
    this._label = document.createTextNode("");

    element.classList.add("minicell", "observablehq");
    element.appendChild(this._label);
  }
  _setLabel(value) {
    this._label.nodeValue = value;
  }
  fulfilled(value, name) {
    this._setLabel(name);
    this._node.classList.add("minicell--ok");
    this._node.classList.remove("minicell--error", "minicell--running");
  }
  pending() {
    this._node.classList.add("minicell--running");
    this._node.classList.remove("minicell--error", "minicell--ok");
  }
  rejected(err, name) {
    this._setLabel(name);
    this._node.classList.add("minicell--error");
    this._node.classList.remove("minicell--running", "minicell--ok");
  }
}
)}

function _style(htl){return(
htl.html`<style>
 .minicell.observablehq {
   font-family: var(--system-ui);
   display: block;
   text-align: center;
   vertical-align: middle;
   min-height: 2rem;
   line-height: 2rem;
   border-radius: 0.25rem;
   border-width: 1px;
   border-style: solid;
   white-space: nowrap;
   text-wrap: nowrap;
   color: #555;
   font-style: italic;
 }

  .minicell--running {
    border-color: #ffa;
  }
  
  .minicell--error {
    border-color: #faa;
  }
  
  .minicell--ok {
    border-color: #84DCCF;
  }
</style>`
)}

function _5(MiniCell,html)
{
  const cell = new MiniCell(html`<div>`);
  cell.fulfilled(true, "lastVariableMoved");
  cell.pending();
  return cell._node;
}


function _6(MiniCell,html)
{
  const cell = new MiniCell(html`<div>`);
  cell.rejected(undefined, "lastVariableMoved");
  return cell._node;
}


function _7(MiniCell,html)
{
  const cell = new MiniCell(html`<div>`);
  cell.fulfilled(true, "viewof lastVariableMoved");
  return cell._node;
}


function _root(htl){return(
htl.html`<div>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("into")).define("into", ["MiniCell"], _into);
  main.variable(observer("MiniCell")).define("MiniCell", ["style"], _MiniCell);
  main.variable(observer("style")).define("style", ["htl"], _style);
  main.variable(observer()).define(["MiniCell","html"], _5);
  main.variable(observer()).define(["MiniCell","html"], _6);
  main.variable(observer()).define(["MiniCell","html"], _7);
  main.variable(observer("root")).define("root", ["htl"], _root);
  return main;
}
