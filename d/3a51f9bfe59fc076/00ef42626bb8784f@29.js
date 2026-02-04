function _1(md){return(
md`# lightning-fs@4.6.0

\`\`\`js
import {FS} from "@tomlarkworthy/lightning-fs-4-6-0"
\`\`\`

~~~js
import {git, http} from "@tomlarkworthy/isomorphic-git-1-30-1" 
~~~`
)}

async function _FS(unzip,FileAttachment)
{
  const blob = await unzip(FileAttachment("lightning-fs-4.6.0.js.gz"));

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return (await import(objectURL)).default;
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}


function _3(md){return(
md`
### build
\`\`\`
npm install @isomorphic-git/lightning-fs@4.6.0
esbuild --minify --format=esm --bundle node_modules/@isomorphic-git/lightning-fs/dist/lightning-fs.min.js > lightning-fs@4.6.0.js
gzip -9 lightning-fs@4.6.0.js


\`\`\``
)}

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
    ["lightning-fs-4.6.0.js.gz", {url: new URL("./files/c55e03847c87d69cce339c97b43086deadcae7319e85f4cfc07a7b9e4c76268b9c1ebf5c3d81b7064393f66e70738b84450458ce4bc5eaf093e7751caa05f045.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("FS")).define("FS", ["unzip","FileAttachment"], _FS);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
