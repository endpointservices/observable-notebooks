import define1 from "./f109935193c0deba@4551.js";

function _1(htl){return(
htl.html`<h1 style="display: none;">ProseMirror lib</h1>`
)}

function _container()
{
  const container = document.createElement("div");

  const setFocused = (focused) => {
    container.classList.toggle("is-focused", focused);
  };

  container.addEventListener("focusin", () => setFocused(true));
  container.addEventListener("focusout", (event) => {
    if (event.relatedTarget && container.contains(event.relatedTarget)) return;
    setFocused(false);
  });
  return container;
}


function _view(prosemirror,container,state,invalidation)
{
  new prosemirror.EditorView(container, { state });
  invalidation.then(() => (container.innerHTML = ""));
}


function _state(prosemirror)
{
  const {
    EditorState,
    schema,
    exampleSetup,
    defaultMarkdownParser,
    defaultMarkdownSerializer
  } = prosemirror;

  const doc = defaultMarkdownParser.parse(
    `# Vendored [ProseMirror](https://prosemirror.net/examples/markdown/)
This is a prosemirror element. Its editing menu will appear when clicked!

`
  );

  return EditorState.create({
    doc,
    schema,
    plugins: exampleSetup({ schema })
  });
}


function _hide_menu_css(htl){return(
htl.html`<style>
.ProseMirror-menubar {
  display: none;
}
div.is-focused .ProseMirror-menubar {
  display: flex;
}

.ProseMirror-focused {
  padding: 1px;
}
</style>`
)}

function _6(md){return(
md`prosemirror is sensitive to how it is imported, this is a single dependancy.


## bundling prose-mirror
\`\`\`bash
npm install --save prosemirror-state \\
                      prosemirror-view \\
                      prosemirror-model \\
                      prosemirror-example-setup \\
                      prosemirror-transform \\
                      prosemirror-history \\
                      prosemirror-keymap \\
                      prosemirror-inputrules \\
                      prosemirror-commands \\
                      prosemirror-dropcursor \\
                      prosemirror-gapcursor \\
                      prosemirror-menu \\
                      prosemirror-markdown \\
                      prosemirror-tables

echo 'export * from "./node_modules/prosemirror-state/dist/index.js";
export * from "./node_modules/prosemirror-view/dist/index.js";
export * from "./node_modules/prosemirror-model/dist/index.js";
export * from "./node_modules/prosemirror-transform/dist/index.js";
export * from "./node_modules/prosemirror-history/dist/index.js";
export * from "./node_modules/prosemirror-keymap/dist/index.js";
export * from "./node_modules/prosemirror-inputrules/dist/index.js";
export * from "./node_modules/prosemirror-commands/dist/index.js";
export * from "./node_modules/prosemirror-dropcursor/dist/index.js";
export * from "./node_modules/prosemirror-gapcursor/dist/index.js";
export * from "./node_modules/prosemirror-menu/dist/index.js";
export * from "./node_modules/prosemirror-tables/dist/index.js";
export * from "./node_modules/prosemirror-markdown/dist/index.js";
export * from "./node_modules/prosemirror-example-setup/dist/index.js";' \\
  | npx esbuild --bundle --minify --format=esm > prosebundle.js

gzip --force -9 prosebundle.js
\`\`\`


### Bundling ProseMirror CSS

\`\`\`bash
echo 'import base from "./node_modules/prosemirror-view/style/prosemirror.css";
import menu from "./node_modules/prosemirror-menu/style/menu.css";
import gapcursor from "./node_modules/prosemirror-gapcursor/style/gapcursor.css";
import example from "./node_modules/prosemirror-example-setup/style/style.css";
import tables from "./node_modules/prosemirror-tables/style/tables.css";

const style = document.createElement("style");
style.textContent = base + menu + gapcursor + example + tables;
document.head.appendChild(style);' \\
  | npx esbuild --bundle --minify --loader:.css=text --format=esm > prosecssbundle.js

gzip --force -9 prosecssbundle.js
\`\`\``
)}

function _7(md){return(
md`---`
)}

async function _prosemirror(prosemirrorCssLoaded,unzip,FileAttachment)
{
  prosemirrorCssLoaded;
  const blob = await unzip(FileAttachment("prosebundle@5.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL); // Ensure URL is revoked after import
  }
}


async function _prosemirrorCssLoaded(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("prosecssbundle@1.js.gz"));
  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
  return true;
}


function _unzip(Response,DecompressionStream){return(
async (attachment) => {
  const response = await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  );

  return response.blob();
}
)}

function _11(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["prosecssbundle@1.js.gz", {url: new URL("./files/45f5bb3c722e4c7ec5db02e6e9a514479633e29769f746e13cc5f7cd64af0ac1b07ff613467c37a9a2a23326fc1adf714992cb2433298983203e1d85a0068a31.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["prosebundle@5.js.gz", {url: new URL("./files/63ac709ba18118d29709ecb7d4e470e45fa4c0349ae482847ea93b357ad29e12d0f49b9c63b1e7b3648d70037b7e39dd284b319c041673b06607df1ec922c440.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["htl"], _1);
  main.variable(observer("container")).define("container", _container);
  main.variable(observer("view")).define("view", ["prosemirror","container","state","invalidation"], _view);
  main.variable(observer("state")).define("state", ["prosemirror"], _state);
  main.variable(observer("hide_menu_css")).define("hide_menu_css", ["htl"], _hide_menu_css);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("prosemirror")).define("prosemirror", ["prosemirrorCssLoaded","unzip","FileAttachment"], _prosemirror);
  main.variable(observer("prosemirrorCssLoaded")).define("prosemirrorCssLoaded", ["unzip","FileAttachment"], _prosemirrorCssLoaded);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  main.variable(observer()).define(["robocoop"], _11);
  const child1 = runtime.module(define1);
  main.import("robocoop", child1);
  return main;
}
