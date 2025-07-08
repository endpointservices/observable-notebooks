import define1 from "./dff1e917c89f5e76@1965.js";

function _1(md){return(
md`# Unrolling a Deploy command

If a deploy containing cell is slow to execute the runtime won't see it fast enough (10 seconds). If you response takes a long time to compute, take the response object outside of the handler so the deploy command can execute and leave dataflow to service the reponse later.
`
)}

function _unrolled_res(){return(
undefined
)}

function _3(deploy,$0){return(
deploy("slow", async (req, res) => {
  $0.value = res;
})
)}

function _slow(Promises){return(
Promises.delay("hi", 10000)
)}

function _5(unrolled_res,slow){return(
unrolled_res.send(slow)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.define("initial unrolled_res", _unrolled_res);
  main.variable(observer("mutable unrolled_res")).define("mutable unrolled_res", ["Mutable", "initial unrolled_res"], (M, _) => new M(_));
  main.variable(observer("unrolled_res")).define("unrolled_res", ["mutable unrolled_res"], _ => _.generator);
  main.variable(observer()).define(["deploy","mutable unrolled_res"], _3);
  main.variable(observer("slow")).define("slow", ["Promises"], _slow);
  main.variable(observer()).define(["unrolled_res","slow"], _5);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  return main;
}
