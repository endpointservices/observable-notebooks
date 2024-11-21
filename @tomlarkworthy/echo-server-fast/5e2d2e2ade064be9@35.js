import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# Echo Server Fast `
)}

function _echo(deploy){return(
deploy(
  "default",
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
