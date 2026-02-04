function _1(md){return(
md`# Observable Runtime (v5)

\`\`\`js
import {Runtime, Inspector, Library, RuntimeError} from "@tomlarkworthy/observable-runtime"
\`\`\``
)}

function _Runtime(observable){return(
observable.Runtime
)}

function _Inspector(observable){return(
observable.Inspector
)}

function _Library(observable){return(
observable.Library
)}

function _RuntimeError(observable){return(
observable.RuntimeError
)}

async function _observable(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("runtime.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}


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
    ["runtime.js.gz", {url: new URL("./files/8cccd6235f8a3942c32b63f3eb9b0d4dde38e067e535593d175973050f65ae06e1854be4392aee9bc4e185a83f144f78c499dca7f5c214026ad2491e46a175fd.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Runtime")).define("Runtime", ["observable"], _Runtime);
  main.variable(observer("Inspector")).define("Inspector", ["observable"], _Inspector);
  main.variable(observer("Library")).define("Library", ["observable"], _Library);
  main.variable(observer("RuntimeError")).define("RuntimeError", ["observable"], _RuntimeError);
  main.variable(observer("observable")).define("observable", ["unzip","FileAttachment"], _observable);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
