import define1 from "./03dda470c56b93ff@8395.js";

function _1(md){return(
md`# 👋 Hello [Browser FS Access](https://developer.chrome.com/docs/capabilities/browser-fs-access)

Progressive enhancement API for wrapping the File System Access API with fallbacks.

Unlike the [File System Access API](https://observablehq.com/@tomlarkworthy/file-system-api), this works within Observable (despite iframe), but will use the more performance File System Access API when possible.`
)}

function _browser_fs(){return(
import(
  "https://unpkg.com/browser-fs-access@0.37.0/dist/index.modern.js?module"
)
)}

function _triggerFile(Inputs){return(
Inputs.button("choose directory")
)}

async function _files(triggerFile,browser_fs)
{
  triggerFile;
  return Array.fromAsync((await browser_fs.directoryOpen()).entries());
}


async function _5(Inputs,files){return(
Inputs.table(
  await Promise.all(
    files.map(async ([name, file]) => {
      const text = await file.text();
      return {
        name: file.name,
        content: text.slice(0, 100)
      };
    })
  )
)
)}

function _7(md){return(
md`The direct File System Access API does not work in an Observable notebooks because the notebook is inside an cross-origin iframe. We can work around that though (it also doesn't work in Safari or Firefox). The following tool will export this notebook to a separate tab (Preview), or serialize to a single HTML file (Download), so you can see the slightly different behaviour of the Browser FS API.`
)}

function _8(exporter){return(
exporter()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("browser_fs")).define("browser_fs", _browser_fs);
  main.variable(observer("viewof triggerFile")).define("viewof triggerFile", ["Inputs"], _triggerFile);
  main.variable(observer("triggerFile")).define("triggerFile", ["Generators", "viewof triggerFile"], (G, _) => G.input(_));
  main.variable(observer("files")).define("files", ["triggerFile","browser_fs"], _files);
  main.variable(observer()).define(["Inputs","files"], _5);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["exporter"], _8);
  return main;
}
