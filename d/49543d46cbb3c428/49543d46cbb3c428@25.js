import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# Web Monetization Temp Test`
)}

function _2(tag){return(
document.head.appendChild(tag)
)}

function _3(){return(
document.head
)}

function _4(deploy,wallet){return(
deploy("send", (req, res) =>
  res.send(`<head>
<meta name="monetization" content="${wallet}">
</head>
`)
)
)}

function _tag(html,wallet){return(
html`<meta name="monetization" content="${wallet}">`
)}

function _wallet(){return(
"$ilp.uphold.com/fMpF4F9jX3F3"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tag"], _2);
  main.variable(observer()).define(_3);
  main.variable(observer()).define(["deploy","wallet"], _4);
  main.variable(observer("tag")).define("tag", ["html","wallet"], _tag);
  main.variable(observer("wallet")).define("wallet", _wallet);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  return main;
}
