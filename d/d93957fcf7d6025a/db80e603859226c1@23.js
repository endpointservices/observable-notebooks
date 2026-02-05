function _1(md){return(
md`# jest-expect-standalone@24.0.2

~~~js
import {expect} from "@tomlarkworthy/jest-expect-standalone"
~~~`
)}

async function _expect(unzip,FileAttachment)
{
  const blob = await unzip(
    FileAttachment("jest-expect-standalone-24.0.2.js.gz")
  );

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    await import(objectURL);
    return window.expect;
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
    ["jest-expect-standalone-24.0.2.js.gz", {url: new URL("./files/44a994984be925455541ea84ec6b0c4ac2a0a77b36d929488143676c7876feaa8c75c9212ac08426ddee2de1e894294f40aac0106776eb2bd224021b6b48843a.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("expect")).define("expect", ["unzip","FileAttachment"], _expect);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
