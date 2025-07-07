function _1(md){return(
md`# CodeMirror 6 + Javascript `
)}

function _2(md){return(
md`CodeMirror is sensitive to how it is imported, this is a single dependancy. For more information check out the original [CodeMirror 6 Backwritable View](https://observablehq.com/@tomlarkworthy/codemirror-6)

\`\`\`bash
npm install --save codemirror
npm install --save @codemirror/lang-javascript
echo 'export * from "./node_modules/codemirror/dist/index.js";
      export * from "./node_modules/@codemirror/lang-javascript/dist/index.js";
      export * from "./node_modules/@codemirror/view/dist/index.js";
      export * from "./node_modules/@codemirror/state/dist/index.js";' \\
    | npx esbuild --bundle --format=esm > codemirror_javascript.js\`\`\``
)}

function _3(CodeMirror,codemirror,myDefaultTheme){return(
CodeMirror(
  `function() {
  // nice!
  return ""
}`,
  {
    extensions: [
      codemirror.EditorView.lineWrapping,
      codemirror.javascript(),
      codemirror.basicSetup,
      myDefaultTheme
    ]
  }
)
)}

function _4(md){return(
md`---`
)}

function _CodeMirror(codemirror,Event,htl,calcChange){return(
(doc = "", config = {}) => {
  const extensions = config.extensions ?? [];

  const updateViewOf = codemirror.EditorView.updateListener.of((update) => {
    console.log(update);
    container.dispatchEvent(new Event("input", { bubbles: true }));
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
    get: () => view.state.doc.toString(),
    set: (newContent = "") => {
      const change = calcChange(
        view.state.doc.toString(),
        newContent,
        view.state.selection
      );
      view.dispatch(change);
    }
  });
  return container;
}
)}

function _6(calcChange){return(
calcChange("abcefg", "abcnewefg", { ranges: [{ from: 8 }] })
)}

function _calcChange(findMiddle){return(
(previous, next, selection) => {
  // Find where to start inserting
  const [insertOffset, endOffset] = findMiddle(previous, next);
  const insert = next.substring(insertOffset, next.length - endOffset);
  const cursor = Math.min(insertOffset + insert.length, next.length);
  return {
    changes: [
      {
        from: insertOffset,
        to: previous.length - endOffset,
        insert
      }
    ]
    /*
    selection: {
      anchor: cursor,
      head: cursor
    }*/
  };
}
)}

function _findMiddle(){return(
function findMiddle(s1, s2) {
  const n = s1.length,
    m = s2.length;

  // Step 1: Find the shared prefix
  let prefixLen = 0;
  while (prefixLen < n && prefixLen < m && s1[prefixLen] === s2[prefixLen]) {
    prefixLen++;
  }

  // Step 2: Find the shared suffix
  let suffixLen = 0;
  while (
    suffixLen < n - prefixLen &&
    suffixLen < m - prefixLen &&
    s1[n - suffixLen - 1] === s2[m - suffixLen - 1]
  ) {
    suffixLen++;
  }

  return [prefixLen, suffixLen];
}
)}

function _9(md){return(
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

function _11(md){return(
md`---`
)}

async function _codemirror(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("codemirror_javascript@1.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    console.log("Loading codemirror from", objectURL);
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL); // Ensure URL is revoked after import
  }
}


function _unzip(Response,DecompressionStream){return(
async (attachment) => {
  const response = await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  );

  return response.blob();
}
)}

function _14(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["codemirror_javascript@1.js.gz", {url: new URL("./files/2768cc56655d2670868c24410fa040c58eb96fabf5d1a519619523cb6e13703fc05a668a40530ea1fb3296021f0bc96cd68ea1904bc68b2a9f89f29e6f9515fa.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["CodeMirror","codemirror","myDefaultTheme"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("CodeMirror")).define("CodeMirror", ["codemirror","Event","htl","calcChange"], _CodeMirror);
  main.variable(observer()).define(["calcChange"], _6);
  main.variable(observer("calcChange")).define("calcChange", ["findMiddle"], _calcChange);
  main.variable(observer("findMiddle")).define("findMiddle", _findMiddle);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("myDefaultTheme")).define("myDefaultTheme", ["codemirror"], _myDefaultTheme);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("codemirror")).define("codemirror", ["unzip","FileAttachment"], _codemirror);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  main.variable(observer()).define(["md"], _14);
  return main;
}
