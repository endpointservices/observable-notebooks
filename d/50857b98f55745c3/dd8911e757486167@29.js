function _1(md){return(
md`# [jszip@3.10.1](https://stuk.github.io/jszip/)

~~~js
import {JSZip} from "@tomlarkworthy/jszip-3-10-1"
~~~`
)}

async function _JSZip(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("jszip-3.10.1.min.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return (await import(objectURL)).default;
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
    ["jszip-3.10.1.min.js.gz", {url: new URL("./files/ebb4f7fbec8c3f2296d981d95d863f7bf5b015e9d652065245142cdcb76288abc6a1c4ff722a45e2170dd44404330e52d36aeb9af66f7c0d532404b9c4f4456f.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("JSZip")).define("JSZip", ["unzip","FileAttachment"], _JSZip);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
