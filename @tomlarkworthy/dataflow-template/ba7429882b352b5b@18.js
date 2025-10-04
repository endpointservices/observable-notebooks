function _1(md){return(
md`# [Acorn@8.11.3](https://github.com/acornjs/acorn)

\`\`\`\`js
import { acorn } from "@tomlarkworthy/acorn-8-11-3"
\`\`\``
)}

async function _acorn(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("acorn-8.11.3.js.gz"));

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
    ["acorn-8.11.3.js.gz", {url: new URL("./files/ef3eafe327e862f191a35f6501c2c3467f9ccf3996a62bbddb02349c8154f92287caac5ba6cdd7b41dfc21857e366b4c2342a2a9d8e2fbaed102125ce54ee1d3.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("acorn")).define("acorn", ["unzip","FileAttachment"], _acorn);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
