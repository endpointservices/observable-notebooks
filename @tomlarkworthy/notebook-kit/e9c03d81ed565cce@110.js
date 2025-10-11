function _1(md){return(
md`# [Notebook Kit@1.4.1](https://github.com/observablehq/notebook-kit) in the browser

Bundled [here](https://github.com/tomlarkworthy/notebook-kit/tree/selfhost/notebook-kit-selfhost)

Examples [here](https://observablehq.com/@tomlarkworthy/notebook-kit-examples)

\`\`\`js
import {kit} from "@tomlarkworthy/notebook-kit"
\`\`\``
)}

async function _kit(FileAttachment){return(
import(await FileAttachment("notebook-kit-browser.js").url())
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["notebook-kit-browser.js", {url: new URL("./files/fef556f7adaed19d35794081e2a5d9901395f589417e20894267eb6f5cde55ad5e19f85702162f403c30fbcace1f3038e1d90e3373d353f58cbee68d01e4b753.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("kit")).define("kit", ["FileAttachment"], _kit);
  return main;
}
