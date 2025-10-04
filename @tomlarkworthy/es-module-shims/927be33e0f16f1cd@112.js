function _1(md){return(
md`# [es-module-shims@2.6.0](https://github.com/guybedford/es-module-shims)

With esModuleShims you need to setup the options in the window before loading, so this distribution is a function you call with the options.

\`\`\`js
import {esModuleShims} from "@tomlarkworthy/es-module-shims"
\`\`\``
)}

function _esModuleShims(unzip,FileAttachment){return(
async (esmsInitOptions = {}) => {
  window.esmsInitOptions = esmsInitOptions;

  const blob = await unzip(FileAttachment("es-module-shims-2@1.6.0.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}
)}

function _unzip(Response,DecompressionStream){return(
async (attachment) =>
  await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  ).blob()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["es-module-shims-2@1.6.0.js.gz", {url: new URL("./files/add07d1eeaeba02c62a0d7965624da28be7ca763c93a5488c69aeaf7d543db13de10cb8334027d1bfe6178a20232502282261f8272f8f05a8fbb3af73ee2a669.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("esModuleShims")).define("esModuleShims", ["unzip","FileAttachment"], _esModuleShims);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
