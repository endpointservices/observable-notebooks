function _1(md){return(
md`# [escodegen@2.1.0](https://github.com/estools/escodegen)

JS AST to code (the inverse of Acorn)

\`\`\`js
import {escodegen} from '@tomlarkworthy/escodegen'
\`\`\`

Building the \`FileAttachment\`
\`\`\`
npm run-script build-min
gzip -9 ./escodegen.browser.min.js
\`\`\``
)}

async function _escodegen(DecompressionStream,FileAttachment,Response)
{
  const ds = new DecompressionStream("gzip");
  const decompressedStream = (
    await FileAttachment("escodegen.browser.min.js.gz").stream()
  ).pipeThrough(ds);
  const source = await new Response(decompressedStream).text();
  const fn = eval(source.replace(".call(this,this)", ""));
  fn(window);
  return window.escodegen;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["escodegen.browser.min.js.gz", {url: new URL("./files/8bd107c9fb4d017c2a651671650692c278452f6a142a1066d75f88861d90c94aaa7edde682639e40a68e434b8b7e992069ef5f2183e949d0ad1809df28abe577.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("escodegen")).define("escodegen", ["DecompressionStream","FileAttachment","Response"], _escodegen);
  return main;
}
