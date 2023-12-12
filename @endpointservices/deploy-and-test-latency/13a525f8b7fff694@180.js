import define1 from "./6eda90668ae03044@836.js";
import define2 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Deploy and Test webcode workflow latency measure

Here we test out how fast new endpoint code can be observed on the public internet. Note the insants deploy technology requires a developer to be logged in, so if you want to run this experiment yourself you will need to fork into your own namespace first! In Berlin I get a latency of 130*ms* to deploy and test an endpoint. This is literally an upper bound on how long it takes for a code change to be live-on-prod!`
)}

function _2(md){return(
md`#### mutable t_start

*t_start* is a mutable variable at the root of the dataflow dependency graph. If *t_start* changes, everything else underneath is recomputed to use its new value. Because it's marked mutable, we are able to programatically update its value from anywhere else in the notebook.`
)}

function _t_start(){return(
Date.now()
)}

function _4(md){return(
md`#### endpoint

our *endpoint* cell prints the value of *t_start* and therefore depends on it. Thus, when *t_start* changes, *endpoint* redeploys and so subsequent calls to the endpoint will include the new *t_start* value`
)}

function _endpoint(deploy,t_start){return(
deploy("latency", (req, res) =>
  res.json({
    t_start: t_start, // we depend on the hardcoded value of t_start
    t_handler: Date.now()
  })
)
)}

function _6(md){return(
md`### Test

Finally we make a test routine depend on the *endpoint* cell, so that after a redeploy, a call is made to the endpoint immediately. We confirm the value returned from the endpoint matches our session's t_start, and measure the end-to-end latency between t_start and the endpoint response. This will obviously include network latency (check you devtool network log to see the requests). We add that leatency measure to a dataset for visualization.`
)}

async function _test(endpoint,t_start,$0)
{
  // test depends on "endpoint" cell so it auto run after "endpoint" is redeployed
  const response = await fetch(endpoint.href);
  if (response.status !== 200) return;
  const timing = await response.json(); // we call the remote endpoint
  timing.t_end = Date.now(); // see how fast we get a response
  if (t_start !== timing.t_start)
    // Sanity check the endpoint is truely using our shared t_start value
    throw Error("Remote endpoint is not useing latest deploy");
  // Update our latency dataset
  $0.value = [
    ...$0.value,
    {
      browserToFunction: timing.t_handler - timing.t_start,
      functionToBrowser: timing.t_end - timing.t_handler,
      roundtrip: timing.t_end - timing.t_start
    }
  ];
  return timing;
}


function _8(md){return(
md`## Run an experiment

By mutating *t_start*, we cause a chain of reevaluations through the dataflow graph
- *t_start* is updated
- *endpoint* is reployed and starts serving the new value to *t_start*
- *test* calls *endpoint* and measures the delta between *t_start* and when it has a response.`
)}

function _9(Inputs,$0){return(
Inputs.button("redeploy and test", {
  // changing t_start invalidates the handler triggering a redploy
  reduce: () => ($0.value = Date.now())
})
)}

function _10(md){return(
md`### Roundrip latency to redeploy and call an endpoint`
)}

function _11(Plot,data){return(
Plot.plot({
  y: {
    label: "Latency (ms)"
  },
  marks: [Plot.barY(data, { x: (d, i) => i, y: "roundtrip" })]
})
)}

function _data(){return(
[]
)}

function _15(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.define("initial t_start", _t_start);
  main.variable(observer("mutable t_start")).define("mutable t_start", ["Mutable", "initial t_start"], (M, _) => new M(_));
  main.variable(observer("t_start")).define("t_start", ["mutable t_start"], _ => _.generator);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","t_start"], _endpoint);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("test")).define("test", ["endpoint","t_start","mutable data"], _test);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Inputs","mutable t_start"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","data"], _11);
  main.define("initial data", _data);
  main.variable(observer("mutable data")).define("mutable data", ["Mutable", "initial data"], (M, _) => new M(_));
  main.variable(observer("data")).define("data", ["mutable data"], _ => _.generator);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _15);
  return main;
}
