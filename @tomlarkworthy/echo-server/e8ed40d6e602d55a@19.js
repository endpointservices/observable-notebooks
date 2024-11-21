import define1 from "./dff1e917c89f5e76@1964.js";

function _1(md){return(
md`# Echo Server`
)}

function _echo(deploy){return(
deploy(
  "echo",
  (req, res) => {
    req.body ? res.send(req.body) : res.end();
  },
  {
    modifiers: ["terminal"],
    reusable: true
  }
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer("echo")).define("echo", ["deploy"], _echo);
  return main;
}
