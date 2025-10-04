function _1(md){return(
md`# [Notebook Kit@1.4.1](https://github.com/observablehq/notebook-kit) in the browser

Bundled [here](https://github.com/tomlarkworthy/notebook-kit/tree/selfhost/notebook-kit-selfhost)

\`\`\`js
import {kit} from "@tomlarkworthy/notebook-kit"
\`\`\``
)}

async function _kit(FileAttachment){return(
import(await FileAttachment("notebook-kit-browser@4.js").url())
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["notebook-kit-browser@4.js", {url: new URL("./files/e039ef8249f2fa344afc7cbd5118b6ffd5926723db5d14385f0323c3eacce32d4850649c959bcd8ac30bb23397bde9a0c7da63231803b2b3b2b99aba5c2fc161.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("kit")).define("kit", ["FileAttachment"], _kit);
  return main;
}
