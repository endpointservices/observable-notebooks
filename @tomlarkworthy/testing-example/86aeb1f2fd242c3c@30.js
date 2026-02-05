import define1 from "./c7a3b20cec5d4dd9@732.js";

function _1(md){return(
md`# Testing Example`
)}

function _suite(createSuite){return(
createSuite()
)}

function _4(suite,expect){return(
suite.test("passing test", () => expect(true).toBe(true))
)}

function _5(suite,expect){return(
suite.test("failing test", ()=>expect(true).toBe(false))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","expect"], _4);
  main.variable(observer()).define(["suite","expect"], _5);
  return main;
}
