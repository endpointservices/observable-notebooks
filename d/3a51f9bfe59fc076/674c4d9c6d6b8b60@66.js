function _1(md){return(
md`# Isomorphic-git@1.30.1

~~~js
import {git, http} from "@tomlarkworthy/isomorphic-git-1-30-1" 
~~~

~~~js
import {FS} from "@tomlarkworthy/lightning-fs-4-6-0"
~~~`
)}

async function _git(unzip,FileAttachment)
{
  const blob = await unzip(
    FileAttachment("isomorphic-git-1@1.30.1.bundle.js.gz")
  );

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}


async function _http(unzip,FileAttachment)
{
  const blob = await unzip(
    FileAttachment("isomorphic-git-http-1.0.0-beta.36.js.gz")
  );

  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );
  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL);
  }
}


function _4(md){return(
md`
### bundle building
\`\`\`
npm install isomorphic-git@1.30.1

// build.js
import { build } from 'esbuild';
import { http } from '@hyrious/esbuild-plugin-http';  // resolver for http/https URLs

await build({
  stdin: {
    contents: 'export * from "https://cdn.jsdelivr.net/npm/isomorphic-git@1.30.1/+esm";',
    sourcefile: 'remote.js',
  },
  minify: true,
  bundle: true,
  format: 'esm',
  outfile: 'isomorphic-git@1.30.1.bundle.js',
  plugins: [http()],          // pulls the remote module tree and inlines it
});


node build.js
gzip -9 isomorphic-git@1.30.1.bundle.js
\`\`\``
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
    ["isomorphic-git-1@1.30.1.bundle.js.gz", {url: new URL("./files/19cce988d8737934bced3aa74e39c2e35d809dba0b6c4bfcb186e4da349b2b5e49b5365e19442f91bd319426f2af00defed50bfed2b25fe0b1d580aabcf5d32f.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["isomorphic-git-http-1.0.0-beta.36.js.gz", {url: new URL("./files/a3de5b5aa59f78ae2f119c0621ccd0a2f856426ecd205631067eb01ee715ad488de616fc6f20078b33af47e006b815ff54d18471413eb8fceb64e180d3a250fd.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("git")).define("git", ["unzip","FileAttachment"], _git);
  main.variable(observer("http")).define("http", ["unzip","FileAttachment"], _http);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  return main;
}
