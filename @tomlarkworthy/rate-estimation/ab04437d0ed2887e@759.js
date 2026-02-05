import define1 from "./c7a3b20cec5d4dd9@732.js";
import define2 from "./e93997d5089d7165@2303.js";
import define3 from "./11a5ab8b1b3a51db@1161.js";
import define4 from "./dfdb38d5580b5c35@351.js";

async function _1(md,FileAttachment){return(
md`# Exponentially Weighted Moving Rate Estimation with Fast Initialization

For use as serverless in-memory rate limiters ([packaged](https://observablehq.com/@tomlarkworthy/rate-estimation-min)).

![](${await FileAttachment("image.png").url()})

Rate limiters are used to prevent damage and are an important tools for reliability engineering.

This rate estimator is designed to 

- By used in Pareto situations where most tenants are far from engineering limits
- Optimized for small memory footprint
- Designed to reside in lambda memory.
- Fast convergence on initialization

The assumption is that only a few high traffic customers will need rate limiting at any time. Those kinds of workloads will end up hitting all lambda clones in production. Thus it's enough to estimate the rate on an individual runtime and multiple by the number of running clones. Its approximate but cheap.

## Implementation Sketch

Serverless runtimes are booted up frequently, so they need to converge to good estimates fast. As each runtime will have to hold rate counters for all 'recent customers', each counter needs to be lightweight.

To estimate rate we use an Exponentially Weighted Moving Average (EWMA) of the event intervals. At low sample counts we have a _fastConverge_ feature to calculate rate estimates based on small sample size statistics. 

The following page expains how the _fastConverge_ optimization works.
`
)}

function _2(md){return(
md`## Experiment on _fastConverge_ Parameter`
)}

function _experiment(start_t,rate_estimator){return(
{
  window_secs: 2,
  start_t: start_t,
  first: true,
  rate_estimator: rate_estimator({
    fastConverge: false,
    forgetFactor: 0.02,
    initial_rate: 45 / 1000 // Time unit is millis not seconds
  }),
  rate_estimator_fast: rate_estimator({
    fastConverge: true,
    forgetFactor: 0.02,
    initial_rate: 45 / 1000 // Time unit is millis not seconds
  }),
  samples: []
}
)}

function _experiment_step(now,experiment)
{
  const sample = now;
  if (now > experiment.start_t + experiment.window_secs * 1000) return;
  
  if (experiment.first) {
    experiment.rate_estimator.last_t = sample;
    experiment.rate_estimator_fast.last_t = sample;
    experiment.start_t = sample;
    experiment.first = false;
    return;
  }
  
  // Update running rate estimators
  experiment.rate_estimator = experiment.rate_estimator.observeAtTime(sample);
  experiment.rate_estimator_fast = experiment.rate_estimator_fast.observeAtTime(sample);
  
  // Push new sample, time and predictions
  experiment.samples.push({
    t: sample,
    r1: experiment.rate_estimator.estimateRateAtTime(sample) * 1000,
    r2: experiment.rate_estimator_fast.estimateRateAtTime(sample) * 1000,
  })
  // expire old samples
  while (experiment.samples[0].t < sample - experiment.window_secs * 1000) 
    experiment.samples.shift()
}


function _start_t(){return(
Date.now()
)}

function _6(md){return(
md`

The following is a timeseries of the 'now' spike train. On the Y axis is an estimate of the frequency (frames per second). The blue and red are estimates of the rate, with and without the _fastConverge_ parameter. The rate estimation has a low forgetting factor (0.02), so the initial state takes a long time to be forgotten without _fastConverge_.
`
)}

function _7($0,html)
{
  function reset() {
    $0.value = Date.now()
  }
  return html`<button onclick=${reset}>run</button>`
}


function _converge(d3,experiment,now,width)
{
  const margin = { top: 20, right: 30, bottom: 30, left: 40 }
  const viewportHeight = 280;
  const viewportWidth = 500;
  const xMapper = d3
    .scaleTime()
    .domain([experiment.samples[0].t, Math.min(now, experiment.start_t + experiment.window_secs * 1000)])
    .range([margin.left, viewportWidth - margin.right]);

  const yMapper = d3
    .scaleLinear()
    .domain([0, 70])
    .range([viewportHeight - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x(d => xMapper(d[0]))
    .y(d => yMapper(d[1]));

  const xAxis = function(g) {
    return g.attr("transform", `translate(0,${viewportHeight - margin.bottom})`).call(
      d3
        .axisBottom(xMapper)
        .ticks(d3.timeSecond.every(1))
    );
  };

  const yAxis = function(g) {
    return g.attr("transform", `translate(${margin.left},0)`).call(
      d3
        .axisLeft(yMapper)
        .ticks(5)
        .tickSizeOuter(0)
    );
    // to remove the axis line, add the following
    // .call(g => g.select(".domain").remove());
  };

  const svg = d3
    .create("svg")
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("width", viewportWidth)
    .attr("height", viewportHeight)
    .attr("style", "border:1px solid black");

  svg
    .append('rect')
    .attr('fill', '#FFF')
    .attr('width', width)
    .attr('height', viewportHeight)
  svg
    .append("path")
    .datum(experiment.samples.flatMap(s => [[s.t, 0], [s.t, 20], [s.t, 0]]))
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
  
  svg
    .append("path")
    .datum(experiment.samples.map(s => [s.t, s.r1]))
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
  
  svg
    .append("path")
    .datum(experiment.samples.map(s => [s.t, s.r2]))
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  return svg.node();
}


function _9(md){return(
md`[Get gif](https://observablehq.com/@tomlarkworthy/svg-to-gif?id=@tomlarkworthy/rate-estimation&cell=converge)`
)}

function _10(md){return(
md`## Experiment on rate tracking

The forgetFactor controls how must history is integrated into the running rate estimate. A small value is smooth but slow to react to changes in the rate.

`
)}

function _experiment_tracking(start_t,rate_estimator,forgetFactor){return(
{
  start_t: start_t,
  window_secs: 2,
  first: true,
  rate_estimator: rate_estimator({
    fastConverge: true,
    forgetFactor: forgetFactor,
    initial_rate: 0
  }),
  samples: []
}
)}

function* _experiment_tracking_step(experiment_tracking,frequency,Promises)
{
  while (true) {
    const sample = Date.now()
    if (experiment_tracking.first) {
      experiment_tracking.rate_estimator.last_t = sample;
      experiment_tracking.first = false;
    } else {
      // Update running rate estimators
      experiment_tracking.rate_estimator = experiment_tracking.rate_estimator.observeAtTime(sample);

      // Push new sample, time and predictions
      experiment_tracking.samples.push({
        t: sample,
        r2: experiment_tracking.rate_estimator.estimateRateAtTime(sample) * 1000,
      })
      // expire old samples
      while (experiment_tracking.samples[0].t < sample - experiment_tracking.window_secs * 1000) 
        experiment_tracking.samples.shift()
    }
    const delay = 1.0 / frequency * 1000;
    yield Promises.tick(delay);
  }
}


function _forgetFactor(slider){return(
slider({
  min: 0, 
  max: 1, 
  step: 0.01, 
  value: 0.2, 
  title: "forgetFactor",
})
)}

function _frequency(slider){return(
slider({
  min: 1, 
  max: 60, 
  step: 1, 
  value: 20, 
  title: "Events per second"
})
)}

function _15($0,html)
{
  function reset() {
    $0.value = Date.now()
  }
  return html`<button onclick=${reset}>run</button>`
}


function _16(width,d3,now,experiment_tracking)
{
  const margin = { top: 20, right: 30, bottom: 30, left: 40 }
  const viewportHeight = 300;
  const viewportWidth = width;
  const xMapper = d3
    .scaleTime()
    .domain([now - experiment_tracking.window_secs * 1000, now])
    .range([margin.left, viewportWidth - margin.right]);

  const yMapper = d3
    .scaleLinear()
    .domain([0, 70])
    .range([viewportHeight - margin.bottom, margin.top]);

  const line = d3
    .line()
    .x(d => xMapper(d[0]))
    .y(d => yMapper(d[1]));

  const xAxis = function(g) {
    return g.attr("transform", `translate(0,${300 - margin.bottom})`).call(
      d3
        .axisBottom(xMapper)
        .ticks(d3.timeSecond.every(1))
    );
  };

  const yAxis = function(g) {
    return g.attr("transform", `translate(${margin.left},0)`).call(
      d3
        .axisLeft(yMapper)
        .ticks(5)
        .tickSizeOuter(0)
    );
    // to remove the axis line, add the following
    // .call(g => g.select(".domain").remove());
  };

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", 300)
    .attr("style", "border:1px solid black");

  svg
    .append("path")
    .datum(experiment_tracking.samples.flatMap(s => [[s.t, 0], [s.t, 20], [s.t, 0]]))
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
  
  svg
    .append("path")
    .datum(experiment_tracking.samples.map(s => [s.t, s.r2]))
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1.5)
    .attr("stroke-miterlimit", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round");
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  return svg.node();
}


function _17(md){return(
md`## Experiment on Number of clones 

If we have _n_ clones with user traffic randomly load balanced over them. Then obviously they only see _nth_ the frequency so we should _n_ their estimate too. But should we need also scale their forgetting factor too to keep their convergence rate constant? 

__TODO, not critical right now__
`
)}

function _18(md){return(
md`## Forgetful Rate Estimator

Takes a stream of time measurements, and estimates the rate. E.g. send it "new Date().getTime() / 1000" and it will converge to (frames per second)

By default it assumes a rate of 1 dt. You have to initialize the historical state which it then forgets over time by the _forgetFactor_. Without _fastConverge_ it assumes it is always in the steady state. So if you have a low _forgetFactor_, it will be slow to forget its initial conditions.

_fastCoverge_ takes into account the number of samples already taken. When there is a low sample count, new measurements are weighted more heavily than the _forgetFactor_ would. This makes the estimate converge much more quickly after restart.
`
)}

function _rate_estimator(){return(
({
    fastConverge = true,
    forgetFactor = 0.9,
    initial_rate = 1,
    initial_t = 0,
  } = {}) => {
  const smallSetThreshold = Math.floor(1.0 / forgetFactor)
  class RateEstimate {
    constructor(state) {
      Object.assign(this, state);
    }
    observeAtTime (t) {
      const interval = t - this.last_t;
      if (fastConverge && this.n < smallSetThreshold) {
        const n = this.n + 1
        return new RateEstimate({
          n: n,
          last_t: t,
          dt: ((n - 1) * (this.dt) + 1 * interval) / n
        });
      } else {
        return new RateEstimate({
          n: this.n + 1,
          last_t: t,
          dt: (1 - forgetFactor) * (this.dt) + forgetFactor * interval
        });
      }
    }
    estimateRateAtTime (t) {
      if (t === this.last_t) {
        // No time has passed since last observation
        // Use historical mean interval
        return 1.0 / this.dt;
      } else {
        const interval = t - this.last_t;
        if (interval < this.dt) {
          // If less time has passed than expected, we can use
          // the existing estimate
          return 1.0 / this.dt;
        } else {
          // Its been a long time since an observation
          // The lack of information should affect the prediction
          return this.observeAtTime(t).estimateRateAtTime(t);
        }
      }
    }
  }
  return new RateEstimate({
    n: 0,
    last_t: initial_t,
    dt: 1.0 / Math.max(initial_rate, 0.00001)
  })
}
)}

function _frames_per_second_estimator(rate_estimator){return(
rate_estimator({
  fastConverge: true,
  forgetFactor: 0.01,
  initial_rate: 30,
  initial_t: (new Date().getTime() - 16) / 1000
})
)}

function _21($0,frames_per_second_estimator,now)
{ 
  $0.value = frames_per_second_estimator.observeAtTime(now / 1000)
  return frames_per_second_estimator.estimateRateAtTime(now/1000)
}


function _rate_estimator_tests(createSuite){return(
createSuite()
)}

function _23(rate_estimator_tests,expect,rate_estimator){return(
rate_estimator_tests.test("rate_estimator_tests.forgetFactor", () => {
  expect(
    rate_estimator({
      fastConverge: false,
      forgetFactor: 0.7
    }).observeAtTime(2).estimateRateAtTime(2)
  ).toBeCloseTo(0.59)

  expect(
    rate_estimator({
      fastConverge: false,
      forgetFactor: 0.2
    }).observeAtTime(2).estimateRateAtTime(2)
  ).toBeCloseTo(0.83)
})
)}

function _24(rate_estimator_tests,expect,rate_estimator){return(
rate_estimator_tests.test("rate_estimator_tests.initial_rate", () => {
  expect(
    rate_estimator({
      fastConverge: false,
      initial_rate: 0.5
    }).observeAtTime(2).estimateRateAtTime(2)
  ).toBeCloseTo(0.5)

  expect(
    rate_estimator({
      fastConverge: false,
      initial_rate: 2
    }).observeAtTime(0.5).estimateRateAtTime(0.5)
  ).toBeCloseTo(2)
})
)}

function _25(rate_estimator_tests,expect,rate_estimator){return(
rate_estimator_tests.test("rate_estimator_tests.estimateRateAtTime(t)", () => {
  expect(
    rate_estimator({
      fastConverge: false,
      initial_rate: 2
    }).estimateRateAtTime(0)
  ).toBeCloseTo(2)
  
  expect(
    rate_estimator({
      fastConverge: false,
      initial_rate: 2
    }).estimateRateAtTime(2)
  ).toBeCloseTo(0.54)
  
})
)}

function _26(rate_estimator_tests,rate_estimator,expect){return(
rate_estimator_tests.test("rate_estimator_tests.fastConverge(t)", () => {
  // Slow to converge (low forgetFactor)
  // initialized very wrong
  let estimator = rate_estimator({
      fastConverge: true,
      forgetFactor: 0.001,
      initial_rate: 100
    })
  // First measurement is initialization
  expect(
    estimator.estimateRateAtTime(0)
  ).toBeCloseTo(100)
  
  // Delays to first observation pull down rate estimate
  expect(
    estimator.estimateRateAtTime(1)
  ).toBeLessThan(100)
  
  // Do an observation after 1 second.
  estimator = estimator.observeAtTime(1)
  
  // As this is first time we expect to just use that 
  expect(
    estimator.estimateRateAtTime(1)
  ).toBe(1)
  
  debugger;
  // Do an observation after 1.5 second, 0.5 seconds after the first
  estimator = estimator.observeAtTime(1.5)
  
  // With fastConverge we have had two samples, one with an interval of 1 and one with an interval of 0.5
  // Average interval is thus 0.75 (TODO I am not sure arithmetic mean is ideal for frequency domain)
  expect(
    estimator.estimateRateAtTime(1)
  ).toBeCloseTo(1.0 / 0.75)
})
)}

function _27(md){return(
md`## Exponentially Weighted Moving Average (EWMA)

Takes the average of a stream of numbers, weighted by a forget factor. 1 means ignore history. 0 means ignore fresh data.
`
)}

function _running_mean(){return(
({
    forgetFactor = 0.9,
    initial = 0
  } = {}) => {
  let mean = initial;
  return (datum) => {
    mean = (1 - forgetFactor) * (mean) + forgetFactor * datum;
    return mean
  }
}
)}

function _running_mean_tests(createSuite){return(
createSuite()
)}

function _30(running_mean_tests,expect,running_mean){return(
running_mean_tests.test("config.initial", () => {
  expect(running_mean({
    initial: 1
  })(1)).toBe(1)
  
  expect(running_mean({
    initial: 2
  })(2)).toBe(2)
})
)}

function _31(running_mean_tests,expect,running_mean){return(
running_mean_tests.test("config.forgetFactor", () => {
  expect(running_mean({
    forgetFactor: 0.9
  })(1)).toBe(0.9)
  
  expect(running_mean({
    forgetFactor: 0.2
  })(1)).toBe(0.2)
})
)}

function _d3(require){return(
require("d3@6")
)}

function _37(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/1da4a15661c7c873814ba696290cd1cb33eba4f6127981379e7de656eca1f68ff2988c2ae074086fdb97b037b4c022308dacb7949e45bad442096d93dbf593ac.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.define("initial experiment", ["start_t","rate_estimator"], _experiment);
  main.variable(observer("mutable experiment")).define("mutable experiment", ["Mutable", "initial experiment"], (M, _) => new M(_));
  main.variable(observer("experiment")).define("experiment", ["mutable experiment"], _ => _.generator);
  main.variable(observer("experiment_step")).define("experiment_step", ["now","experiment"], _experiment_step);
  main.define("initial start_t", _start_t);
  main.variable(observer("mutable start_t")).define("mutable start_t", ["Mutable", "initial start_t"], (M, _) => new M(_));
  main.variable(observer("start_t")).define("start_t", ["mutable start_t"], _ => _.generator);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["mutable start_t","html"], _7);
  main.variable(observer("converge")).define("converge", ["d3","experiment","now","width"], _converge);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.define("initial experiment_tracking", ["start_t","rate_estimator","forgetFactor"], _experiment_tracking);
  main.variable(observer("mutable experiment_tracking")).define("mutable experiment_tracking", ["Mutable", "initial experiment_tracking"], (M, _) => new M(_));
  main.variable(observer("experiment_tracking")).define("experiment_tracking", ["mutable experiment_tracking"], _ => _.generator);
  main.variable(observer("experiment_tracking_step")).define("experiment_tracking_step", ["experiment_tracking","frequency","Promises"], _experiment_tracking_step);
  main.variable(observer("viewof forgetFactor")).define("viewof forgetFactor", ["slider"], _forgetFactor);
  main.variable(observer("forgetFactor")).define("forgetFactor", ["Generators", "viewof forgetFactor"], (G, _) => G.input(_));
  main.variable(observer("viewof frequency")).define("viewof frequency", ["slider"], _frequency);
  main.variable(observer("frequency")).define("frequency", ["Generators", "viewof frequency"], (G, _) => G.input(_));
  main.variable(observer()).define(["mutable start_t","html"], _15);
  main.variable(observer()).define(["width","d3","now","experiment_tracking"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("rate_estimator")).define("rate_estimator", _rate_estimator);
  main.define("initial frames_per_second_estimator", ["rate_estimator"], _frames_per_second_estimator);
  main.variable(observer("mutable frames_per_second_estimator")).define("mutable frames_per_second_estimator", ["Mutable", "initial frames_per_second_estimator"], (M, _) => new M(_));
  main.variable(observer("frames_per_second_estimator")).define("frames_per_second_estimator", ["mutable frames_per_second_estimator"], _ => _.generator);
  main.variable(observer()).define(["mutable frames_per_second_estimator","frames_per_second_estimator","now"], _21);
  main.variable(observer("viewof rate_estimator_tests")).define("viewof rate_estimator_tests", ["createSuite"], _rate_estimator_tests);
  main.variable(observer("rate_estimator_tests")).define("rate_estimator_tests", ["Generators", "viewof rate_estimator_tests"], (G, _) => G.input(_));
  main.variable(observer()).define(["rate_estimator_tests","expect","rate_estimator"], _23);
  main.variable(observer()).define(["rate_estimator_tests","expect","rate_estimator"], _24);
  main.variable(observer()).define(["rate_estimator_tests","expect","rate_estimator"], _25);
  main.variable(observer()).define(["rate_estimator_tests","rate_estimator","expect"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("running_mean")).define("running_mean", _running_mean);
  main.variable(observer("viewof running_mean_tests")).define("viewof running_mean_tests", ["createSuite"], _running_mean_tests);
  main.variable(observer("running_mean_tests")).define("running_mean_tests", ["Generators", "viewof running_mean_tests"], (G, _) => G.input(_));
  main.variable(observer()).define(["running_mean_tests","expect","running_mean"], _30);
  main.variable(observer()).define(["running_mean_tests","expect","running_mean"], _31);
  const child1 = runtime.module(define1);
  main.import("expect", child1);
  main.import("createSuite", child1);
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  const child3 = runtime.module(define3);
  main.import("html", child3);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _37);
  return main;
}
