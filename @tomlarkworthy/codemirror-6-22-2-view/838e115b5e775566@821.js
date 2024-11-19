function _1(md){return(
md`# CodeMirror 6 Backwritable View v6.22.2`
)}

function _2(md){return(
md`CodeMirror is sensitive to how it is imported, this is a super minimal dependancy. For more information check out the original [CodeMirror 6 Backwritable View](https://observablehq.com/@tomlarkworthy/codemirror-6)`
)}

function _CODEMIRROR_VERSION(){return(
"6.22.2"
)}

function _4(md){return(
md`---`
)}

function _CodeMirror(codemirror,Event,htl,calcChange){return(
(doc = "", config = {}) => {
  const extensions = config.extensions ?? [];

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
    set: (newContent = "") => {
      const change = calcChange(doc, newContent, view.state.selection);
      doc = newContent;
      view.dispatch(change);
    }
  });
  return container;
}
)}

function _6(calcChange){return(
calcChange("abcddddddefg", "abcddddddefg", { ranges: [{ from: 8 }] })
)}

function _calcChange(){return(
(previous, next, selection) => {
  // Find where to start inserting
  for (
    var insertOffset = 0;
    insertOffset < selection.ranges[0].from;
    insertOffset++
  ) {
    if (previous[insertOffset] !== next[insertOffset]) break;
  }

  // Find where the insert ends
  for (
    var endOffset = 0;
    endOffset < previous.length - selection.ranges[0].from;
    endOffset++
  ) {
    if (
      previous[previous.length - endOffset - 1] !==
      next[next.length - endOffset - 1]
    )
      break;
  }
  const insert = next.substring(insertOffset, next.length - endOffset);
  const cursor = Math.min(insertOffset + insert.length, next.length);
  return {
    changes: [
      {
        from: insertOffset,
        to: previous.length - endOffset,
        insert
      }
    ],
    selection: {
      anchor: cursor,
      head: cursor
    }
  };
}
)}

function _8(md){return(
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

function _10(md){return(
md`---`
)}

function _esmImport(){return(
(pkg) =>
  import(
    /*`https://unpkg.com/${pkg}/dist/index.js?module`*/
    `https://jspm.dev/${pkg}`
  )
)}

function _esmCodeMirror(esmImport,CODEMIRROR_VERSION){return(
(mod) =>
  esmImport(
    "@codemirror/" +
      (mod.indexOf("@") >= 0 ? mod : `${mod}@${CODEMIRROR_VERSION}`)
  )
)}

function _codemirror(esmImport){return(
esmImport(`codemirror`)
)}

function _14(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("CODEMIRROR_VERSION")).define("CODEMIRROR_VERSION", _CODEMIRROR_VERSION);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("CodeMirror")).define("CodeMirror", ["codemirror","Event","htl","calcChange"], _CodeMirror);
  main.variable(observer()).define(["calcChange"], _6);
  main.variable(observer("calcChange")).define("calcChange", _calcChange);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("myDefaultTheme")).define("myDefaultTheme", ["codemirror"], _myDefaultTheme);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("esmImport")).define("esmImport", _esmImport);
  main.variable(observer("esmCodeMirror")).define("esmCodeMirror", ["esmImport","CODEMIRROR_VERSION"], _esmCodeMirror);
  main.variable(observer("codemirror")).define("codemirror", ["esmImport"], _codemirror);
  main.variable(observer()).define(["md"], _14);
  return main;
}
