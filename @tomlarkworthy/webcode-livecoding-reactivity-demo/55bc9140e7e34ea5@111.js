import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# How fast is [Webcode](https://observablehq.com/@tomlarkworthy/webcode)'s live coding?

This demo proves that endpoint live coding works at the speed of Observablehq's Dataflow recomputation, with real network request involved.

For this to work you need to fork into your own namespace so you can attach the live coding workflow. `
)}

function _2(md){return(
md`### Create some state`
)}

function _nonce(){return(
Math.random()
)}

function _4(md){return(
md`### Deploy an endpoint that serves that state`
)}

function _endpoint(deploy,nonce){return(
deploy("default", (req, res) => {
  debugger;
  res.json(nonce);
})
)}

function _7(md){return(
md`Note, there is a reactive dependency between the nonce and the endpoint cell. If the nonce changes the deployment cell will reevaluate, and thus it should logically serve the latest value of the nonce.`
)}

function _8(md){return(
md`### Do a network request to the endpoint`
)}

async function _remoteNonce(endpoint){return(
(await fetch(endpoint.href)).text()
)}

function _10(md){return(
md`Note, this fetch is a real network request, you can see it in the DevTools. Because it's reactively dependent on the endpoint cell value, it will fetch the instant the endpoint cell reevaluates.`
)}

function _11(md){return(
md`### Now permute the nonce, triggering an endpoint update, triggering a network fetch`
)}

function _12(Inputs,$0){return(
Inputs.button("Recompute nonce", {
  reduce: () => ($0.value = Math.random())
})
)}

function _13(md){return(
md`## Conclusion

When live coding is enabled the remote nonce matches the latest value of the local nonce. This means the live debugging session has updated between the endpoint cell reevaluation and the remoteNonce fetch evaluation. So live coding truly is zero latency!

If live coding is disabled (or you are not logged in) then the nonces will not match as the nonce will have been generate on the remote machine.

This shows use that ultimately, when using live coding, the production requests are being served by the local development machine.
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.define("initial nonce", _nonce);
  main.variable(observer("mutable nonce")).define("mutable nonce", ["Mutable", "initial nonce"], (M, _) => new M(_));
  main.variable(observer("nonce")).define("nonce", ["mutable nonce"], _ => _.generator);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","nonce"], _endpoint);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("remoteNonce")).define("remoteNonce", ["endpoint"], _remoteNonce);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["Inputs","mutable nonce"], _12);
  main.variable(observer()).define(["md"], _13);
  return main;
}
