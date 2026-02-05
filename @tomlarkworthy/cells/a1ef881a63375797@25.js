import define1 from "./dfdb38d5580b5c35@351.js";

async function _1(md,FileAttachment){return(
md`# Cells

![](${await FileAttachment("Screenshot_20210121-204316.jpg").url()})`
)}

function _3(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screenshot_20210121-204316.jpg", {url: new URL("./files/219089c5fac0d665c37da17ba68e80237bbca2123f04bc4b39101a3700799705705c10e40a9b49094a972c36fc2be4093bed0f35cbb7258bc7ff054d443aaacf.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _3);
  return main;
}
