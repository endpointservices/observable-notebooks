import define1 from "./03dda470c56b93ff@8395.js";

function _1(md){return(
md`# File System Access API

Note to be confused with the private origin file system (OPFS) or the File System API. The File System Access API lets you read and write files to the host system, i.e. actual files on the user's machine.

Currently it does not work with Safari or Firefox (2025-05-26). The is a more general ponyfill to get a more general library with [browser FS access](https://observablehq.com/@tomlarkworthy/browser-fs-access)`
)}

function _triggerFile(Inputs){return(
Inputs.button("choose directory")
)}

async function _files(triggerFile)
{
  triggerFile;
  return Array.fromAsync((await window.showDirectoryPicker()).entries());
}


function _4(md){return(
md`However, you cannot use the File System API in an Observable notebook because the notebook is inside an cross-origin iframe. We can work around that though. The following tool will export this notebook to a separate tab (Preview), or serialize to a single HTML file (Download) where it works.`
)}

function _5(exporter){return(
exporter()
)}

async function _7(Inputs,files){return(
Inputs.table(
  await Promise.all(
    files.map(async ([name, handle]) => {
      const file = await handle.getFile();
      const text = await file.text();
      return {
        name,
        content: text.slice(0, 100)
      };
    })
  )
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof triggerFile")).define("viewof triggerFile", ["Inputs"], _triggerFile);
  main.variable(observer("triggerFile")).define("triggerFile", ["Generators", "viewof triggerFile"], (G, _) => G.input(_));
  main.variable(observer("files")).define("files", ["triggerFile"], _files);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["exporter"], _5);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer()).define(["Inputs","files"], _7);
  return main;
}
