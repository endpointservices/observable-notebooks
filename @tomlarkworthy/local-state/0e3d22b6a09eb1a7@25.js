function _1(md){return(
md`# [Dexie@4.2.1](https://dexie.org/) 30kb`
)}

async function _dexie(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("dexie@1.min.js.gz"));
  const url = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  const dexie = await import(url);
  URL.revokeObjectURL(url);
  return dexie;
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
    ["dexie@1.min.js.gz", {url: new URL("./files/075da52d2f3d705a92aca90200924dd41e2a0be55898a4520567882d8cc913a6c74220ce6d1d191065cd8aeb92717051c9a572b29cb4ff732cef4a8c9e517323.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("dexie")).define("dexie", ["unzip","FileAttachment"], _dexie);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
