import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# Status code Tests`
)}

function _3(endpoint){return(
endpoint("500", async (req, res) => {
  res.status(500).send("500");
})
)}

function _4(endpoint){return(
endpoint("401", async (req, res) => {
  res.status(401).send("401");
})
)}

function _5(endpoint){return(
endpoint("403", async (req, res) => {
  res.status(403).send("403");
})
)}

function _6(endpoint){return(
endpoint("slow", async (req, res) => {
  await new Promise((r) => setTimeout(r, 5500));
  res.status(200).send("200");
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["endpoint"], _3);
  main.variable(observer()).define(["endpoint"], _4);
  main.variable(observer()).define(["endpoint"], _5);
  main.variable(observer()).define(["endpoint"], _6);
  return main;
}
