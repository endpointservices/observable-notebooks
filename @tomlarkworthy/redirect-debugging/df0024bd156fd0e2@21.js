import define1 from "./dff1e917c89f5e76@1964.js";
import define2 from "./316f0885d15ab671@69.js";

function _1(md){return(
md`# Redirect Debugging`
)}

function _target(deploy,randomId){return(
deploy("target", async (req, res) => {
  const message = `${req.query.n} ${await randomId()}`;
  console.log(message);
  res.send(message);
})
)}

function _4(deploy,randomId,target){return(
deploy("redirect", async (req, res) => {
  const id = await randomId();
  console.log(`redirect ${id}`);
  res.redirect(302, target.href + "?n=" + id);
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer("target")).define("target", ["deploy","randomId"], _target);
  main.variable(observer()).define(["deploy","randomId","target"], _4);
  const child2 = runtime.module(define2);
  main.import("randomId", child2);
  return main;
}
