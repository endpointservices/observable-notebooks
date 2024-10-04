// https://observablehq.com/@tomlarkworthy/leakybucket@157
function _1(md){return(
md`# Hello, Leaky Bucket

Live demo of 
~~~js
bucket.throttle(<cost>);
~~~

Will throw or decrement a bucket of capacity. Used for rate limiting. Supports some other useful features like idle tidy up of resources.`
)}

async function _Bucket(){return(
(await import("https://cdn.skypack.dev/leaky-bucket@4.1.4?min"))
  .default
)}

function _capacity(Inputs){return(
Inputs.range([0, 20], {
  value: 20,
  step: 1,
  label: "capacity"
})
)}

function _interval(Inputs){return(
Inputs.range([0.1, 20], {
  value: 10,
  step: 0.1,
  label: "interval"
})
)}

function _bucket(Bucket,capacity,interval){return(
new Bucket({
  capacity: capacity,
  interval: interval
})
)}

function _6(Plot,bucketState){return(
Plot.plot({
  y: {
    domain: [0, 20.1]
  },
  marks: [Plot.barY([bucketState], { y: "currentCapacity" })]
})
)}

function _7(htl,Inputs,bucket,$0,Event){return(
htl.html`<div style="display: flex;">
${Inputs.button(".throttle()", {
  reduce: async () => {
    try {
      await bucket.throttle();
      console.log("tick");
    } catch (err) {
      $0.value.push(err);
      $0.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
})}
${Inputs.button(".throttle(10)", {
  reduce: async () => {
    try {
      await bucket.throttle(10);
    } catch (err) {
      $0.value.push(err);
      $0.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
})}`
)}

function _8(htl,errors){return(
htl.html`<b>Thrown errors</b><ul>${errors.map(
  (err) => htl.html`<li>${err.message}`
)}`
)}

function _errors(Inputs){return(
Inputs.input([])
)}

function _bucketState(now,bucket){return(
now,
bucket.throttle(0.000001), // Tick the bucket but with near 0 cost (0 causes a bug with windup)
{
  currentCapacity: bucket.getCurrentCapacity()
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Bucket")).define("Bucket", _Bucket);
  main.variable(observer("viewof capacity")).define("viewof capacity", ["Inputs"], _capacity);
  main.variable(observer("capacity")).define("capacity", ["Generators", "viewof capacity"], (G, _) => G.input(_));
  main.variable(observer("viewof interval")).define("viewof interval", ["Inputs"], _interval);
  main.variable(observer("interval")).define("interval", ["Generators", "viewof interval"], (G, _) => G.input(_));
  main.variable(observer("bucket")).define("bucket", ["Bucket","capacity","interval"], _bucket);
  main.variable(observer()).define(["Plot","bucketState"], _6);
  main.variable(observer()).define(["htl","Inputs","bucket","viewof errors","Event"], _7);
  main.variable(observer()).define(["htl","errors"], _8);
  main.variable(observer("viewof errors")).define("viewof errors", ["Inputs"], _errors);
  main.variable(observer("errors")).define("errors", ["Generators", "viewof errors"], (G, _) => G.input(_));
  main.variable(observer("bucketState")).define("bucketState", ["now","bucket"], _bucketState);
  return main;
}
