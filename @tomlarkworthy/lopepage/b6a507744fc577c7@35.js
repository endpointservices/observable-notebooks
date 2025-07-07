function _1(md){return(
md`# SortableJS`
)}

function _Sortable(_sortablejs){return(
_sortablejs.default
)}

function _MultiDrag(_sortablejs){return(
_sortablejs.MultiDrag
)}

function _Swap(_sortablejs){return(
_sortablejs.Swap
)}

async function __sortablejs(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("sortable-1.15.6.min.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL); // Ensure URL is revoked after import
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
    ["sortable-1.15.6.min.js.gz", {url: new URL("./files/f720cfb19031faf1e6739d688aa8a2fc7de0e3f123935182f34c8c9aac28563e4ee86894454cb1255894bc932c252d59dc4eb069672a246a2d08d37b99fc49e0.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Sortable")).define("Sortable", ["_sortablejs"], _Sortable);
  main.variable(observer("MultiDrag")).define("MultiDrag", ["_sortablejs"], _MultiDrag);
  main.variable(observer("Swap")).define("Swap", ["_sortablejs"], _Swap);
  main.variable(observer("_sortablejs")).define("_sortablejs", ["unzip","FileAttachment"], __sortablejs);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
