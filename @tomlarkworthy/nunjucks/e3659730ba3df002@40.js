function _1(md){return(
md`# modern-screenshot@4.6.6`
)}

function _2(modern_screenshot){return(
modern_screenshot.domToImage(document.body, { scale: 2 })
)}

async function _modern_screenshot(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("modern-screenshot-4.6.6.js.gz"));

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
    ["modern-screenshot-4.6.6.js.gz", {url: new URL("./files/b9ec5eb6997c5955de5a42eef81224ff90af57944c6e5241e12fb54e590507bdd0ef8da7848b91a5cb2ab54a8d585c015e77fbd9f570007c01dc0ec7ba80dfde.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["modern_screenshot"], _2);
  main.variable(observer("modern_screenshot")).define("modern_screenshot", ["unzip","FileAttachment"], _modern_screenshot);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
