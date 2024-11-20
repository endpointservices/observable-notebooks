import define1 from "./d413e30c311f49e6@827.js";
import define2 from "./a9fef9b5c7e4f792@670.js";
import define3 from "./048a17a165be198d@263.js";
import define4 from "./b58f224e180d252e@57.js";

async function _1(FileAttachment,md){return(
md`# Try Purescript

Run purescript code in ObservableHQ using \`try.purescript.org\`'s compiler endpoint and [@jmatsushita/purescript](https://observablehq.com/@jmatsushita/purescript).

## Usage

- Modify the [Source code](#cell-85) in the Editor below.
- Click the \`compile\` button to send your changes to the try purescript compiler API.
- Check for errors and warnings
- You can now [Run it](#cell-89) and use the compiled module using \`module.{symbol}\` (only tested with simple values!)

You even get your purescript exported symbols autocompleted in the javascript editor. 🎉

![image.png](${await FileAttachment("image.png").url()})

See [Todo section](#cell-155) for some next steps ideas, and [Internals](#cell-91) for details on how this works. `
)}

function _2(md){return(
md`## Source code`
)}

function _3(Inputs,set,$0,example,trypurescript){return(
Inputs.button([
  ["Simple example", () => set($0, example)],
  ["Try Purescript", () => set($0, trypurescript)],
  ["Reset", () => set($0, 'module Main where\n')]
])
)}

async function _editor(Inputs,PurescriptEditor,localStorageView){return(
Inputs.bind(
  await PurescriptEditor(
    "dsdsds"
    // [myDefaultTheme]
  ),
  localStorageView("code")
)
)}

function _5(editor){return(
editor
)}

function _6(Inputs,$0,Event){return(
Inputs.button([
  ["Compile", () => $0.dispatchEvent(new Event('input', {bubbles: true}))],
])
)}

function _7(md){return(
md`||
| --- |--- | --- |
|Compilation status|`
)}

function _8(renderCompilationStatus,source,warnings,errors,htl){return(
htl.html`${renderCompilationStatus(source, warnings, errors)}`
)}

function _9(md){return(
md`||
| --- |--- | --- |
|Displaying the \`render\` value as html|`
)}

function _html(unsafe_html,module){return(
unsafe_html`${module.render}`
)}

function _11(md){return(
md`||
| --- |--- | --- |
|Output \`val\`|`
)}

function _12(module){return(
module.val
)}

function _13(md){return(
md`||
| --- |--- | --- |
|Run the \`greet\` function|`
)}

function _14(module){return(
module.greet("me")
)}

function _15(md){return(
md`||
| --- |--- | --- |
|Run \`main\`, a console effect, check your devtools.|`
)}

function _16(module){return(
module.main()
)}

function _17(mdPlus){return(
mdPlus`## Todo

Reach out on the [purescript discord](https://purescript.org/chat) if you have ideas or want to help!

- [x] Improve warnings and errors rendering
- [x] Added a version of the original try purescript code sample.
- [x] Make this notebook into a nicely importable notebook. https://observablehq.com/@jmatsushita/purescript
- [x] Add syntax highlighting.
- [ ] How would multiple modules work?
- [ ] Display spinner while compiling`
)}

function _18(md){return(
md`## Internals
`
)}

function _19(md){return(
md`### Import the module
`
)}

async function _ps(Purescript,source){return(
await Purescript(source)
)}

async function _module(Purescript,source){return(
(await Purescript(source)).module
)}

function _errors(ps){return(
ps.errors
)}

function _warnings(ps){return(
ps.warnings
)}

function _renderCompilationStatus(htl,toColumns,toTable){return(
(source, warnings, errors) => {
  const renderedWarnings = warnings && warnings.length >0 ? 
htl.html`<h3>Compiler warnings</h3><table><thead>
    <tr>${toColumns(warnings).map(col => htl.html`<th>${col}</th>`)}</tr>
  </thead>
  <tbody>
    ${toTable(warnings, source).map(row => htl.html`<tr>
      ${Object.values(row).map(cell => htl.html`<td>${cell}</td>`)}
    </tr>`)}
  </tbody>
</table>
` : htl.html`<code>No warnings</code><br>`

  const renderedErrors = errors ? htl.html`<h3>Compiler errors</h3><table>
  <thead>
    <tr>
      ${toColumns(errors).map(col => htl.html`<th>${col}</th>`)}
    </tr>
  </thead>
  <tbody>
    ${toTable(errors, source).map(row => htl.html`<tr>
      ${Object.values(row).map(cell => htl.html`<td>${cell}</td>`)}
    </tr>`)}
  </tbody>
</table>
` : htl.html`<code>No errors</code>`
  return htl.html`${renderedWarnings}${renderedErrors}`
}
)}

function _26(Purescript){return(
Purescript
)}

function _27(md){return(
md`And there we have it. A compiled module that's accessible from the notebook 🎉`
)}

function _28(md){return(
md`### Use an embedded code editor with Haskell syntax highlighting`
)}

function _29(md){return(
md`Reuse https://observablehq.com/@cmudig/editor, an inline code editor with syntax highlighting`
)}

function _PurescriptEditor(CodeMirror,myDefaultTheme){return(
async (doc = '', extensions = []) => {
  const {StreamLanguage} = await import(`https://cdn.skypack.dev/@codemirror/language`)
  const { haskell } = await import(`https://cdn.skypack.dev/@codemirror/legacy-modes/mode/haskell`);
  return CodeMirror(doc, {
    extensions: [myDefaultTheme, StreamLanguage.define(haskell), ...extensions]
  });
}
)}

function _32(md){return(
md`### Support persistence in local storage`
)}

function _34(md){return(
md`If the local storage key doesn't exist, use this example as a default value.`
)}

function _set(Event){return(
function set(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input", {bubbles: true}));
}
)}

function _38(md){return(
md`### Make warnings and errors readable

Use a bunch of utility functions to render the warnings and errors in an html table (using the built-in \`Inputs.table\` didn't seem to allow multiline cells)`
)}

function _toTable(objectFilter,objectMap,toReadableRow,hideColumns){return(
(array, source) => array ? array.map(row => objectFilter(objectMap(row, toReadableRow(source)), hideColumns)) : []
)}

function _hideColumns(){return(
k => k !== "allSpans" && k !== "moduleName" && k !== "filename" && k !== "errorLink"
)}

function _toColumns(hideColumns){return(
array => array && array[0] ? Object.keys(array[0]).filter(hideColumns) : []
)}

function _toReadableRow(){return(
source => (v,k) => {
  switch(k) {
    case "allSpans": 
      return JSON.stringify(v)

    case "position":
      // console.log(source.split("\n"))
      // console.log(source.split("\n").slice(v.startLine - 1, v.endLine))
      return source.split("\n").slice(v.startLine - 1, v.endLine).join("\n")
      
    default:
      return v;
  }
}
)}

function _43(toTable,warnings,source){return(
toTable(warnings, source)
)}

function _44(toColumns,warnings){return(
toColumns(warnings)
)}

function _45(warnings){return(
warnings
)}

function _46(errors){return(
errors.contents
)}

function _47(toColumns,errors){return(
toColumns(errors.contents)
)}

function _48(toTable,errors,source){return(
toTable(errors.contents, source)
)}

function _objectMap(){return(
(obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )
)}

function _objectFilter(){return(
(obj, fn) => Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => fn(key)))
)}

function _unsafe_html(){return(
function unsafe_html() {
  const span = document.createElement("span");
  span.innerHTML = String.raw.apply(this, arguments);
  return span;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/6f40deb936bd75eae42893d683764ccb88a71c9bcc3e15c785b56a0afdfce87b9cd53e67885a65b409a003015d21dcd239bad13d3a8511f551e35de51ea399bb.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Inputs","set","viewof source","example","trypurescript"], _3);
  main.variable(observer("viewof editor")).define("viewof editor", ["Inputs","PurescriptEditor","localStorageView"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["editor"], _5);
  main.variable(observer()).define(["Inputs","viewof editor","Event"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["renderCompilationStatus","source","warnings","errors","htl"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("html")).define("html", ["unsafe_html","module"], _html);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["module"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["module"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["module"], _16);
  main.variable(observer()).define(["mdPlus"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("ps")).define("ps", ["Purescript","source"], _ps);
  main.variable(observer("module")).define("module", ["Purescript","source"], _module);
  main.variable(observer("errors")).define("errors", ["ps"], _errors);
  main.variable(observer("warnings")).define("warnings", ["ps"], _warnings);
  main.variable(observer("renderCompilationStatus")).define("renderCompilationStatus", ["htl","toColumns","toTable"], _renderCompilationStatus);
  const child1 = runtime.module(define1);
  main.import("Purescript", child1);
  main.variable(observer()).define(["Purescript"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  const child2 = runtime.module(define2);
  main.import("CodeMirror", child2);
  main.import("myDefaultTheme", child2);
  main.variable(observer("PurescriptEditor")).define("PurescriptEditor", ["CodeMirror","myDefaultTheme"], _PurescriptEditor);
  main.variable(observer()).define(["md"], _32);
  const child3 = runtime.module(define3);
  main.import("localStorageView", child3);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("set")).define("set", ["Event"], _set);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("toTable")).define("toTable", ["objectFilter","objectMap","toReadableRow","hideColumns"], _toTable);
  main.variable(observer("hideColumns")).define("hideColumns", _hideColumns);
  main.variable(observer("toColumns")).define("toColumns", ["hideColumns"], _toColumns);
  main.variable(observer("toReadableRow")).define("toReadableRow", _toReadableRow);
  main.variable(observer()).define(["toTable","warnings","source"], _43);
  main.variable(observer()).define(["toColumns","warnings"], _44);
  main.variable(observer()).define(["warnings"], _45);
  main.variable(observer()).define(["errors"], _46);
  main.variable(observer()).define(["toColumns","errors"], _47);
  main.variable(observer()).define(["toTable","errors","source"], _48);
  main.variable(observer("objectMap")).define("objectMap", _objectMap);
  main.variable(observer("objectFilter")).define("objectFilter", _objectFilter);
  const child4 = runtime.module(define4);
  main.import("mdPlus", child4);
  main.variable(observer("unsafe_html")).define("unsafe_html", _unsafe_html);
  return main;
}
