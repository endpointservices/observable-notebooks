function _1(md){return(
md`# CodeMirror 6 View`
)}

function _2(md){return(
md`Refactor of [@andy0130tw](https://observablehq.com/@andy0130tw/codemirror) Codemirror component. Added back-writability (it was very hard to get events right, use [@tomlarkworthy/ndd](/@tomlarkworthy/ndd)) and switched to UPKG because Skypack was causing errors ([issue](https://github.com/skypackjs/skypack-cdn/issues/159)).

Sample usage: 

\`\`\`javascript
import { CodeMirror } from '@tomlarkworthy/codemirror-6'

viewof editor = CodeMirror('initial text', {
  extensions: [],
  keymaps: [],
})
\`\`\`
\``
)}

function _javascriptPlugin(esmCodeMirror){return(
esmCodeMirror("lang-javascript")
)}

function _editor(CodeMirror,javascriptPlugin,codemirror,myDefaultTheme){return(
CodeMirror("const foo = () => 4.5\n", {
  extensions: [
    javascriptPlugin.javascript(),
    codemirror.basicSetup,
    myDefaultTheme
  ]
})
)}

function _5(editor){return(
editor
)}

function _texarea(Inputs,$0){return(
Inputs.bind(
  Inputs.textarea({
    label: "bidirecitonal binding"
  }),
  $0
)
)}

function _7(md){return(
md`---`
)}

function _CODEMIRROR_VERSION(){return(
"6.0.1"
)}

function _9(md){return(
md`---`
)}

function _CodeMirror(codemirror,Event,htl){return(
(doc = "", config = {}) => {
  const extensions = config.extensions ?? [];
  const keymaps = config.keymaps ?? [];

  const updateViewOf = codemirror.EditorView.updateListener.of((update) => {
    if (doc !== view.state.doc.toString()) {
      doc = view.state.doc.toString();
      container.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  const view = new codemirror.EditorView({
    doc,
    extensions: [updateViewOf, ...extensions]
  });
  const el = view.dom;
  const container = htl.html`<div><span onInput=${(evt) =>
    evt.stopPropagation()}>${el}`;
  Object.defineProperty(container, "value", {
    enumerable: true,
    get: () => doc,
    set: (newContent) => {
      doc = newContent;
      view.dispatch({
        changes: [{ from: 0, to: view.state.doc.length, insert: newContent }]
      });
    }
  });
  return container;
}
)}

function _11(md){return(
md`---`
)}

function _myDefaultTheme(codemirror){return(
codemirror.EditorView.theme({
  "&": {
    fontFamily: 'Consolas, "Roboto Mono", monospace',
    fontSize: "14px",
    height: "200px",
    border: "1px solid #ddd"
  }
})
)}

function _13(md){return(
md`---`
)}

function _esmImport(){return(
(pkg) =>
  import(
    `https://unpkg.com/${pkg}/dist/index.js?module`
  )
)}

function _esmCodeMirror(esmImport,CODEMIRROR_VERSION){return(
mod => esmImport('@codemirror/' + (mod.indexOf('@') >= 0 ? mod : `${mod}@${CODEMIRROR_VERSION}`))
)}

function _codemirror(esmImport,CODEMIRROR_VERSION){return(
esmImport(`codemirror@${CODEMIRROR_VERSION}`)
)}

function _17(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("javascriptPlugin")).define("javascriptPlugin", ["esmCodeMirror"], _javascriptPlugin);
  main.variable(observer("viewof editor")).define("viewof editor", ["CodeMirror","javascriptPlugin","codemirror","myDefaultTheme"], _editor);
  main.variable(observer("editor")).define("editor", ["Generators", "viewof editor"], (G, _) => G.input(_));
  main.variable(observer()).define(["editor"], _5);
  main.variable(observer("viewof texarea")).define("viewof texarea", ["Inputs","viewof editor"], _texarea);
  main.variable(observer("texarea")).define("texarea", ["Generators", "viewof texarea"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("CODEMIRROR_VERSION")).define("CODEMIRROR_VERSION", _CODEMIRROR_VERSION);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("CodeMirror")).define("CodeMirror", ["codemirror","Event","htl"], _CodeMirror);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("myDefaultTheme")).define("myDefaultTheme", ["codemirror"], _myDefaultTheme);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("esmImport")).define("esmImport", _esmImport);
  main.variable(observer("esmCodeMirror")).define("esmCodeMirror", ["esmImport","CODEMIRROR_VERSION"], _esmCodeMirror);
  main.variable(observer("codemirror")).define("codemirror", ["esmImport","CODEMIRROR_VERSION"], _codemirror);
  main.variable(observer()).define(["md"], _17);
  return main;
}
