function _1(md){return(
md`# Save source to clipboard

\`\`\`js
import {cellsToClipboard} from '@tomlarkworthy/cells-to-clipboard'
\`\`\`

Fork of [@tophtucker/generate-copied-cells](https://observablehq.com/@tophtucker/generate-copied-cells) to expose just the raw function. It won't work unless its executing during event handling
`
)}

function _2(copyCellButton){return(
copyCellButton(["x = Math.sin(now / 1000)", "y = Math.round(x * 10)"])
)}

function _3(copyCellButton){return(
copyCellButton([{type: "md", value: "# Hello"}, "now"])
)}

function _4(md){return(
md`Once you click “Copy cells”, press Esc to focus the main page and then Cmd-V.`
)}

function _5(md){return(
md`---
## Implementation`
)}

function _cellsToClipboard(makeCell){return(
(cells) => {
  function listener(e) {
    e.clipboardData.setData("text/plain", cells.join("\n\n"));
    e.clipboardData.setData(
      "application/vnd.observablehq+json",
      JSON.stringify(cells.map(makeCell))
    );
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}
)}

function _copyCellButton(Inputs,cellsToClipboard){return(
(cells) =>
  Inputs.button("Copy cells", { reduce: () => cellsToClipboard(cells) })
)}

function _makeCell($0,defaultJS,defaultOther){return(
(value) => {
  const id = $0.value++;
  debugger;
  if (typeof value === "string") {
    return { ...defaultJS, id, value };
  } else if (typeof value === "object") {
    if (value.type === "js") return { ...defaultJS, id, ...value };
    return { ...defaultOther, id, ...value };
  } else {
    throw new Error("Value must be string or object");
  }
}
)}

function _defaultJS(){return(
{
  id: 0,
  value: "",
  pinned: true,
  mode: "js",
  data: null,
  name: null
}
)}

function _defaultOther(){return(
{
  id: 0,
  value: "",
  pinned: false,
  mode: "md",
  data: null,
  name: ""
}
)}

function _id(){return(
0
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["copyCellButton"], _2);
  main.variable(observer()).define(["copyCellButton"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("cellsToClipboard")).define("cellsToClipboard", ["makeCell"], _cellsToClipboard);
  main.variable(observer("copyCellButton")).define("copyCellButton", ["Inputs","cellsToClipboard"], _copyCellButton);
  main.variable(observer("makeCell")).define("makeCell", ["mutable id","defaultJS","defaultOther"], _makeCell);
  main.variable(observer("defaultJS")).define("defaultJS", _defaultJS);
  main.variable(observer("defaultOther")).define("defaultOther", _defaultOther);
  main.define("initial id", _id);
  main.variable(observer("mutable id")).define("mutable id", ["Mutable", "initial id"], (M, _) => new M(_));
  main.variable(observer("id")).define("id", ["mutable id"], _ => _.generator);
  return main;
}
