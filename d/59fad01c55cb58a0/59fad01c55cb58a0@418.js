function _1(md){return(
md`# Type checking Python in the Browser

`
)}

function _2(md){return(
md`At my work we are building a programmable browser-based control-plane over a data-plane decision engine. The underlying server runtime is Python, and so many of our _knobs_ are Python expressions or Python snippets. And to make it easy-to-use -- to allow it to point out common mistakes -- we want our Python code bits to highlight programming mistakes. Of course, the best technology we have so far for programming fault detection that is syntax highlighting and type checking. And so the search for a way of hosting a state-of-the-art language server for Python in the browser begins ...`
)}

function _3(md){return(
md`⚠️ This is a work in progress and doesn't work, if you look at the development server you can see the language server has started, in the notebook you will find a monoca editor but the two things are not joined yet`
)}

function _4(md){return(
md`### Picking up the scent

Observable published this nice [article](https://observablehq.com/blog/bringing-the-typescript-language-server-to-observable) about how they brought a language server into their web app.
- Typescript though
- They avoided running an LSP because ___
- conversation on work [slack](https://taktile.slack.com/archives/C012VA5MK4H/p1669059228592949)`
)}

function _5(md){return(
md`## Asking Around

- https://news.ycombinator.com/item?id=34225091 (THanks _ and _)
- Microbit has a Python IDE and [nice writeup](https://github.com/microbit-foundation/pyright/blob/microbit/THIS_FORK.md)
- Pyright themselves state the high level steps in a brilliant [Github issue thread](https://github.com/microsoft/pyright/discussions/3222):
  - disable the worker
  - bring in a VFS
  - stub the global process
     - argsv
     - mem/cpu usage
   
  `
)}

function _6(md){return(
md`## Microbit Fork

- nvm use 16
\`\`\`
git clone https://github.com/microbit-foundation/pyright.git
cd pyright 
npm install
cd packages/browser-pyright
npm run build
\`\`\`

leads to the following worker (uploaded to notebook)`
)}

function _workerScript(FileAttachment){return(
FileAttachment("pyright-ce7e498c42dd661d8ee3.worker.js").url()
)}

function _workerScriptCrossOrigin(workerScript){return(
fetch(workerScript)
  .then((res) => res.text())
  .then((codeString) => {
    let workerPath = new URL(workerScript).href.split("/");
    workerPath.pop();

    const importScriptsFix = `const _importScripts = importScripts;
const _fixImports = (url) => new URL(url, '${workerPath.join("/") + "/"}').href;
importScripts = (...urls) => _importScripts(...urls.map(_fixImports));`;

    let finalURL =
      `data:application/javascript,` +
      encodeURIComponent(importScriptsFix + codeString);

    return URL.createObjectURL(
      new Blob([`importScripts("${finalURL}")`], {
        type: "application/javascript"
      })
    );
  })
)}

function _foreground(workerScriptCrossOrigin){return(
new Worker(workerScriptCrossOrigin, {
  name: "Pyright-foreground"
})
)}

async function _rpc(){return(
(await import("https://cdn.skypack.dev/vscode-jsonrpc@6.0.0")).default
)}

function _connection(foreground,rpc,workerScriptCrossOrigin)
{
  foreground.postMessage({
    type: "browser/boot",
    mode: "foreground"
  });

  const connection = rpc.createMessageConnection(
    new rpc.BrowserMessageReader(foreground),
    new rpc.BrowserMessageWriter(foreground)
  );

  let backgroundWorkerCount = 0;

  const workers = [foreground];
  connection.onDispose(() => {
    workers.forEach((w) => w.terminate());
  });

  foreground.addEventListener("message", (e) => {
    if (e.data && e.data.type === "browser/newWorker") {
      console.log("Creating a new background worker");
      // The foreground worker has created a message channel and passed us
      // a port. We create the background worker and pass transfer the port
      // onward.
      const { initialData, port } = e.data;
      const background = new Worker(workerScriptCrossOrigin, {
        name: `Pyright-background-${++backgroundWorkerCount}`
      });
      workers.push(background);
      background.postMessage(
        {
          type: "browser/boot",
          mode: "background",
          initialData,
          port
        },
        [port]
      );
    }
  });

  connection.onNotification("window/logMessage", (params) =>
    console.log("[LS]", params.message)
  );

  connection.listen();
  return connection;
}


function _12(md){return(
md`## https://github.com/microbit-foundation/python-editor-v3/blob/40ff6f64955bf552c4513a762228982114353cbd/src/language-server/client.ts#L111`
)}

async function _13(FileAttachment,md){return(
md`We can look in the console to see what gets booted
![image.png](${await FileAttachment("image.png").url()})`
)}

function _14(md){return(
md`typeshed supplies the config (see https://github.com/microbit-foundation/python-editor-v3/blob/fadaf6e2b9b9dfbac3fb53755eee88461919acbe/src/micropython/main/typeshed.en.json)`
)}

function _typeshed(FileAttachment){return(
FileAttachment("typshed.json").json()
)}

function _rootUri(){return(
"/"
)}

function _17(md){return(
md`https://github.com/microbit-foundation/python-editor-v3/blob/a44fb2b4c41b5fef63ee0ee1ae67b4a9c8b21ec2/src/language-server/client.ts#L178`
)}

function _initializationOptions(typeshed){return(
{
  files: typeshed,
  // Custom option in our Pyright version
  diagnosticStyle: "simplified"
}
)}

function _initializeParams(initializationOptions,rootUri){return(
{
  locale: "en",
  capabilities: {
    textDocument: {
      moniker: {},
      synchronization: {
        willSave: false,
        didSave: false,
        willSaveWaitUntil: false
      },
      completion: {
        completionItem: {
          snippetSupport: false,
          commitCharactersSupport: true,
          documentationFormat: ["markdown"],
          deprecatedSupport: false,
          preselectSupport: false
        },
        contextSupport: true
      },
      signatureHelp: {
        signatureInformation: {
          documentationFormat: ["markdown"],
          activeParameterSupport: true,
          parameterInformation: {
            labelOffsetSupport: true
          }
        }
      },
      publishDiagnostics: {
        tagSupport: {
          // valueSet: [DiagnosticTag.Unnecessary, DiagnosticTag.Deprecated]
        }
      }
    },
    workspace: {
      workspaceFolders: true,
      didChangeConfiguration: {},
      configuration: true
    }
  },
  initializationOptions: initializationOptions,
  processId: null,
  // Do we need both of these?
  rootUri: rootUri,
  workspaceFolders: [
    {
      name: "src",
      uri: rootUri
    }
  ]
}
)}

function _capabilities(connection,initializeParams){return(
connection.sendRequest("initialize", initializeParams)
)}

function _21(md){return(
md`I had problems using the vscode-languageserver-protocol, but a look at the source code showed it was mainly a ligte wraper over the RPC connection, so I translated`
)}

function _createProtocolConnectionFailed(require){return(
require("vscode-languageserver-protocol@3.17.2/lib/browser/main.js").catch(
  () => window["createProtocolConnection"]
)
)}

function _createProtocolConnection(rpc){return(
function createProtocolConnection(reader, writer, logger, options) {
  return (0, rpc.createMessageConnection)(reader, writer, logger, options);
}
)}

function _24(md){return(
md`https://www.typefox.io/blog/teaching-the-language-server-protocol-to-microsofts-monaco-editor`
)}

function _25(md){return(
md`monaco browser-lsp example in monaco!

https://github.com/TypeFox/monaco-languageclient/tree/main/packages/examples/browser-lsp (legacy)

https://github.com/TypeFox/monaco-languageclient/blob/main/packages/examples/main/src/langium/main.ts`
)}

function _26(md){return(
md`## Monaco Language Client Browser Language Client & Server`
)}

function _monaco_html(htl){return(
htl.html`<div id="container" style="width:800px;height:100px;border:1px solid grey"></div>`
)}

function _28(md){return(
md`## Monaco languageclient

This repository is cool, it contains a sample vite server that serves a webworkered monaco session in the browser.`
)}

function _29(md){return(
md`## Monaco Editor

I had difficulties importing this, in the end I created a vite project based off https://github.com/TypeFox/monaco-languageclient/tree/main/packages/examples/browser-lsp and imported that`
)}

async function _monaco(FileAttachment){return(
import(await FileAttachment("monaco-editor@1.js").url())
)}

function _editor(monaco)
{
  return monaco.editor.create(document.getElementById("container"), {
    model: monaco.editor.createModel(
      "Hello",
      "plaintext",
      monaco.Uri.parse("inmemory://model.txt")
    ),
    glyphMargin: true,
    lightbulb: {
      enabled: true
    },
    automaticLayout: true
  });
}


function _32(monaco){return(
monaco.se
)}

function _33(md){return(
md`https://stackoverflow.com/questions/57048510/how-to-initialize-microsoft-monaco-editor-in-a-browser-using-simple-javascript-o`
)}

function _34(md){return(
md`https://github.com/microsoft/monaco-editor/tree/main/samples/browser-script-editor`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["pyright-ce7e498c42dd661d8ee3.worker.js", {url: new URL("./files/a10311362c948dd1cc7f894dddb07bd22c5907bd7fb03e5c4f8e47f5928e02e8238913fb2bb189a143bf450630ca1124d1e250179156449bb3aa2e990a163393.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["monaco-editor@1.js", {url: new URL("./files/20c65a2445a261da3685c2ef5c03dfeeb80a023f337fa54a67744bc9cd8395e6392f2ece05d05b0a91225000415304718b71bcf4df5dbb9afba651bb33871a2f.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["image.png", {url: new URL("./files/30ad9d6fee14737051dff00a3cabe1da593eb4f247eb8be6538a9451d9bb1b0b68bef34108beb1f0a7f4e97f42494dda832081552df7652780e056f91cd009e9.png", import.meta.url), mimeType: "image/png", toString}],
    ["typshed.json", {url: new URL("./files/ba06e10cf5d862c60a6439895866c28ae74776911eb34d7060b458f5e851f8bb86e26335f83696ebb6cc78733c9ae381f3fcedcc17806cb915d5096d79983668.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("workerScript")).define("workerScript", ["FileAttachment"], _workerScript);
  main.variable(observer("workerScriptCrossOrigin")).define("workerScriptCrossOrigin", ["workerScript"], _workerScriptCrossOrigin);
  main.variable(observer("foreground")).define("foreground", ["workerScriptCrossOrigin"], _foreground);
  main.variable(observer("rpc")).define("rpc", _rpc);
  main.variable(observer("connection")).define("connection", ["foreground","rpc","workerScriptCrossOrigin"], _connection);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["FileAttachment","md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("typeshed")).define("typeshed", ["FileAttachment"], _typeshed);
  main.variable(observer("rootUri")).define("rootUri", _rootUri);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("initializationOptions")).define("initializationOptions", ["typeshed"], _initializationOptions);
  main.variable(observer("initializeParams")).define("initializeParams", ["initializationOptions","rootUri"], _initializeParams);
  main.variable(observer("capabilities")).define("capabilities", ["connection","initializeParams"], _capabilities);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("createProtocolConnectionFailed")).define("createProtocolConnectionFailed", ["require"], _createProtocolConnectionFailed);
  main.variable(observer("createProtocolConnection")).define("createProtocolConnection", ["rpc"], _createProtocolConnection);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("monaco_html")).define("monaco_html", ["htl"], _monaco_html);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("monaco")).define("monaco", ["FileAttachment"], _monaco);
  main.variable(observer("editor")).define("editor", ["monaco"], _editor);
  main.variable(observer()).define(["monaco"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  return main;
}
