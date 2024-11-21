import define1 from "./6eda90668ae03044@830.js";
import define2 from "./0e0b35a92c819d94@471.js";

function _1(md){return(
md`# Webcode`
)}

function _4(endpoint,$0){return(
endpoint("example", async (req, res) => {
  $0.send({
    req,
    res
  });
})
)}

function _event(flowQueue){return(
flowQueue()
)}

function _6(event){return(
event
)}

function _reply(event)
{
  event.res.send("ok");
}


function _response(reply,$0)
{
  reply;
  $0.resolve("ok");
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer()).define(["endpoint","viewof event"], _4);
  main.variable(observer("viewof event")).define("viewof event", ["flowQueue"], _event);
  main.variable(observer("event")).define("event", ["Generators", "viewof event"], (G, _) => G.input(_));
  main.variable(observer()).define(["event"], _6);
  main.variable(observer("reply")).define("reply", ["event"], _reply);
  main.variable(observer("response")).define("response", ["reply","viewof event"], _response);
  return main;
}
