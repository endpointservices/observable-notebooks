// https://observablehq.com/@tomlarkworthy/paste-codegen@278
import define1 from "./293899bef371e135@278.js";

function _1(md){return(
md`# Code generation with multi-cell clipboard pasting

With this notebook, you can programmatically populate clipboard data with pastable cells. The intent is to help code-generation. After the core utilities, there is an ES6 module destructurer intended to help wrap dynamically imported modules in a notebook enabling destructuring.

<iframe width="560" height="315" src="https://www.youtube.com/embed/E2e_TcvS6Bg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _clipboard(Inputs,MIME_TYPE,Event)
{
  const ui = Inputs.textarea({
    label:
      "Paste a cell selection into here to see the format of multicell clipboard data"
  });
  ui.addEventListener("paste", function (event) {
    event.preventDefault();
    event.stopPropagation();
    ui.value = event.clipboardData.getData(MIME_TYPE);
    ui.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return ui;
}


function _3(Inputs,name)
{
  const ui = Inputs.textarea({
    label: "Copy multicell data from here",
    rows: 10,
    value: `[{"id":80,"value":"viewof name = Inputs.text({ label: \\\"Enter your name\\\" })","pinned":false,"mode":"js","data":null,"name":null},{"id":84,"value":"md\`👋 hi '${name}'.\`","pinned":true,"mode":"js","data":null,"name":null}]`
  });
  ui.addEventListener("copy", function (event) {
    event.preventDefault();
    event.stopPropagation();
    debugger;
    const source = JSON.parse(ui.value);
    event.clipboardData.setData("text/plain", source.join("\n\n"));
    event.clipboardData.setData(
      "application/vnd.observablehq+json",
      JSON.stringify(source)
    );
  });
  return ui;
}


function _4(md){return(
md`### Module destructurer

Observable doesn't support destructuring syntax with external ES modules, for example:-

\`\`\`js
import { getAuth, onAuthStateChanged } from "firebase/auth";
\`\`\``
)}

function _5(md){return(
md`However, we can simply write a cell for each destructurable method that forwards to a common dynamically imported module for the same effect. This enclosing notebook *can* be destructured on import:

\`\`\`js
import { getAuth, onAuthStateChanged } from "@tom.larkworthy/firebase-auth";
\`\`\`

so you end up with an identical API. The painful part is writing all the cells, so here have build a helper for auto-generating the code based on reflection of the module object`
)}

function _modulePath(Inputs)
{
  const ui = Inputs.text({
    submit: true,
    label: "Path to a dynamic module",
    value: "https://www.gstatic.com/firebasejs/9.9.2/firebase-remote-config.js"
  });

  return ui;
}


function _identifier(modulePath,allowedCharacters){return(
[...modulePath]
  .map((char) => (allowedCharacters.includes(char) ? char : "_"))
  .join("")
)}

function _module(modulePath){return(
import(modulePath)
)}

function _code(identifier,modulePath,module){return(
[
  {
    id: 1,
    value: `${identifier} = import('${modulePath}')`,
    pinned: false,
    mode: "js",
    data: null,
    name: null
  }
].concat(
  Object.keys(module)
    .sort()
    .map((property, i) => ({
      id: i + 2,
      value: `${property} = ${identifier}['${property}']`,
      pinned: false,
      mode: "js",
      data: null,
      name: null
    }))
)
)}

function _10(Inputs,code)
{
  const ui = Inputs.textarea({
    label: "Copy destructured code here",
    rows: 10,
    value: JSON.stringify(code)
  });
  ui.addEventListener("copy", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const source = JSON.parse(ui.value);
    event.clipboardData.setData("text/plain", source.join("\n\n"));
    event.clipboardData.setData(
      "application/vnd.observablehq+json",
      JSON.stringify(source)
    );
  });
  return ui;
}


function _11(md){return(
md`## Technical Background

so I don't forget how to debug this!`
)}

function _MIME_TYPE(){return(
"application/vnd.observablehq+json"
)}

function _13(md){return(
md`
Observable uses a special mime-type to enable pasting of cells. You can discover this by setting a breakpoint on ClipboardEvents and pasting as normal, which will reveal the ClipBoardEvent and its types in the debugger`
)}

function _image(FileAttachment){return(
FileAttachment("image.png").image()
)}

function _allowedCharacters(){return(
[
  ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
]
)}

function _17(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/a22795e2d78254404617d01cda33aa0782856022e0aa113a47cac76d581c0832d20ed4ccb0c240d9eaa2d5c8f972591871c48208eeb616ecf9aedddbf176839e.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof clipboard")).define("viewof clipboard", ["Inputs","MIME_TYPE","Event"], _clipboard);
  main.variable(observer("clipboard")).define("clipboard", ["Generators", "viewof clipboard"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","name"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof modulePath")).define("viewof modulePath", ["Inputs"], _modulePath);
  main.variable(observer("modulePath")).define("modulePath", ["Generators", "viewof modulePath"], (G, _) => G.input(_));
  main.variable(observer("identifier")).define("identifier", ["modulePath","allowedCharacters"], _identifier);
  main.variable(observer("module")).define("module", ["modulePath"], _module);
  main.variable(observer("code")).define("code", ["identifier","modulePath","module"], _code);
  main.variable(observer()).define(["Inputs","code"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("MIME_TYPE")).define("MIME_TYPE", _MIME_TYPE);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("image")).define("image", ["FileAttachment"], _image);
  main.variable(observer("allowedCharacters")).define("allowedCharacters", _allowedCharacters);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _17);
  return main;
}
