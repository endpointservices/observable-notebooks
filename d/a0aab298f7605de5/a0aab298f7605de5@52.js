import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# Binding a secret

Create a secret in the secret tab and bind it to the endpoint.`
)}

function _2(FileAttachment){return(
FileAttachment("image.png").image()
)}

function _4(md){return(
md`### Retrieve the secret from the context`
)}

function _endpoint(deploy,getContext){return(
deploy("info", async (request, response) => {
  response.send(getContext().secrets.example_secret); // retreive secret from context
})
)}

async function _6(endpoint){return(
(await fetch(endpoint.href)).text()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/ad0b25d68b66e82adb1b1b470a6ab5f2a6dc83f2ebcac437f50c2d627b58d44d682da49c88c772b8249dc8d2b169042b530de2978d62384c62fe4b3462ce0f3d.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment"], _2);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","getContext"], _endpoint);
  main.variable(observer()).define(["endpoint"], _6);
  return main;
}
