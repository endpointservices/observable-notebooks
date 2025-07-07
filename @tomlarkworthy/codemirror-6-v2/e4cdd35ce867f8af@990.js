function _1(md){return(
md`# Vendored CodeMirror 6 + Javascript `
)}

function _2(md){return(
md`CodeMirror is sensitive to how it is imported, this is a single dependancy.


build script
\`\`\`bash
npm install --save codemirror
npm install --save @codemirror/lang-javascript
echo 'export * from "./node_modules/codemirror/dist/index.js";
      export * from "./node_modules/@codemirror/lang-javascript/dist/index.js";
      export {indentWithTab} from "@codemirror/commands";
      export * from "./node_modules/@codemirror/view/dist/index.js";
      export * from "./node_modules/@codemirror/state/dist/index.js";' \\
    | npx esbuild --bundle --minify --format=esm > codemirror_javascript.js
gzip --force -9 codemirror_javascript.js  
\`\`\``
)}

function _3(EditorView,codemirror,myDefaultTheme){return(
new EditorView({
  doc: `function() {
  // nice!
  return ""
}`,
  extensions: [
    codemirror.EditorView.lineWrapping,
    codemirror.javascript(),
    codemirror.basicSetup,
    myDefaultTheme
  ]
}).dom
)}

function _4(md){return(
md`---`
)}

function _EditorView(codemirror){return(
codemirror.EditorView
)}

function _EditorState(codemirror){return(
codemirror.EditorState
)}

function _7(md){return(
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

function _9(md){return(
md`---`
)}

async function _codemirror(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("codemirror_javascript.js.gz"));

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

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["codemirror_javascript.js.gz", {url: new URL("./files/ea0968231e202b960d51337e6c36b14c65d03e3647063de55ad072afef92e7b93c41446fe8010bb11f1df34090dfb87eec5b32993ef816202f05436454aafbd8.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["EditorView","codemirror","myDefaultTheme"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("EditorView")).define("EditorView", ["codemirror"], _EditorView);
  main.variable(observer("EditorState")).define("EditorState", ["codemirror"], _EditorState);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("myDefaultTheme")).define("myDefaultTheme", ["codemirror"], _myDefaultTheme);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("codemirror")).define("codemirror", ["unzip","FileAttachment"], _codemirror);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
