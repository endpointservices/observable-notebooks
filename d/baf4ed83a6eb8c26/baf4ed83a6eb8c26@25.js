import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# eg`
)}

function _3(endpoint){return(
endpoint("default", async (req, res) => {
  res.send("cool");
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["endpoint"], _3);
  return main;
}
