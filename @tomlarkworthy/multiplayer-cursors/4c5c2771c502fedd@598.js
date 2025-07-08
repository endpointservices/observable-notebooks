function _1(md){return(
md`# RxJS inspired stream operators for *views*


[Reactive Extension's (RxJS)](https://rxjs.dev/) container class is an _Observable_. Rx defines a set of stream operators to combine and transform _Observables_ into other _Observables_.

Observable[sic] Notebooks are nothing to do with RxJS, but have "views" which represent two reactive variables:
1. the control-plane variable "_viewof X_", often a DOM node.
2. the data-plane value "_X_", which is an independent reactivity participant.
  
Note the "viewof" does not need to to be a DOM node and it this notebook it will not be used like that.

In this notebook we note that a "_viewof_" can act like an RxJS Observable. It wraps a stream of values, and thus, we can make analogous viewof counterparts to RxJS's stream Operators. With our RxJS-like Stream Operators, we will combine and transform views, to create new views.

In this notebook we explore how some of RxJS's operators can solve some common Observablehq dataflow gotchas.`
)}

function _2(md){return(
md`## Fizz Buzz Example

Walking through an implementation of FizzBuzz using stream operator's introduces the coding style. `
)}

function _3(md){return(
md`RxJS has a "creation" operator called [_interval_](https://rxjs.dev/api/index/function/interval) that creates a reactive stream that emits in incrementing numbers every "period" milliseconds. We can do the same thing:-`
)}

function _counter(interval,invalidation){return(
interval({ period: 500, invalidation })
)}

function _5(md){return(
md`With our _interval_ it returns a "viewof" as opposed to an _Observable_. We also have to pass in the _invalidation_ promise so that if the cell is reevaluated the timer is removed. Note: all our stream operators need the invalidation promise passed in.

If we now look at the value of the _counter_ below, it is updating every half a second, but note the control-plane _viewof_ above is not. This is important, when we combine streams we work with the "viewofs", which are static wiring, but underneath them the dataplane is reactive and processing dataflow idiomatically to the Observable's notebook dataflow paradigm.`
)}

function _6(counter){return(
counter
)}

function _7(md){return(
md`Lets implement FizzBuzz as two independently combined streams, Fizz and Buzz. 

For Fizz, we emit Fizz if we see the counter is divisible by 3, otherwise we emit null. We can use a reactive ["map"](https://rxjs.dev/api?query=map). Our input view is our previous viewof (not the data channel!)`
)}

function _fizz(map,$0,invalidation){return(
map({
  view: $0,
  map: (count) => {
    if (count % 3 == 0) return "Fizz";
    return null;
  },
  invalidation
})
)}

function _9(md){return(
md`Note the result of the map is another viewof, which depends only on the previous viewof counter, so is not affected by dataflow either but the underlying data channel is recomputing at the same rate as _counter_ (see below)`
)}

function _10(fizz){return(
fizz
)}

function _11(md){return(
md`Buzz is the same thing but for numbers divisible by 5 numbers.`
)}

function _buzz(map,$0,invalidation){return(
map({
  view: $0,
  map: (count) => {
    if (count % 5 == 0) return "Buzz";
    return null;
  },
  invalidation
})
)}

function _13(buzz){return(
buzz
)}

function _14(md){return(
md`Now lets try to combine streams. In FizzBuzz you either say fizz or buzz or both if the number is divisible by 5 and 3. If the number is not any of those you say the number. So we need to combine three streams (Fizz, Buzz and Counter).

A common stream combinator is ["combineLatest"](https://rxjs.dev/api/operators/combineLatest), which provides the latest values of multiple streams to a function, that then computes the emitted value.

Our viewof -> RxJS mapping converts the passed in viewof streams to values internally, and forwards them to the internal function in the same order but as values now. We never depend on data channels directly otherwise the stream operator call would recompute every data update.
`
)}

function _fizzBuzzCombineLatest(combineLatest,$0,$1,$2,invalidation){return(
combineLatest({
  // three views
  views: [$0, $1, $2],
  // three **values**
  map: (count, fizz, buzz) =>
    fizz && buzz ? fizz + buzz : fizz || buzz || count,
  invalidation
})
)}

function _16(md){return(
md`_fizzBuzzCombineLatest_ shows the glitchiness of combining synchronised streams with _combineLatest_, sometimes there are extra frames merging a previous value to a new value, depending on the order of evaluation. 

The result is more updates than you would expect.`
)}

function _17(fizzBuzzCombineLatest){return(
fizzBuzzCombineLatest
)}

function _18(md){return(
md`We can count the number of updates with a scan`
)}

function _countFizzBuzzCombineLatest(scan,$0,invalidation){return(
scan({
  view: $0,
  seed: 0,
  scan: (acc, element) => acc + 1,
  invalidation
})
)}

function _20(countFizzBuzzCombineLatest){return(
countFizzBuzzCombineLatest
)}

function _21(md){return(
md`Now we can clearly see that there are three updates per clock update! This is a common source of bugs in Observable reactive programming! Merging multiple active dataflow add the rate of updates, furthermore the order of the cell updates is indeterminate. ObservableHQ dataflow is most analogous to RxJS's combineLatest operator.`
)}

function _22(md){return(
md`RxJS has an alternative solution, the [zip](https://www.learnrxjs.io/learn-rxjs/operators/combination/zip) operator, which waits until every stream emits before emitting an array of those values.`
)}

function _fizzBuzzZipArray(zip,$0,$1,$2,invalidation){return(
zip({
  views: [$0, $1, $2],
  invalidation
})
)}

function _24(fizzBuzzZipArray){return(
fizzBuzzZipArray
)}

function _25(md){return(
md`For zip and combineLatest you can add a map parameter to transform the stream inline.`
)}

function _fizzBuzzZip(zip,$0,$1,$2,invalidation){return(
zip({
  views: [$0, $1, $2],
  map: (count, fizz, buzz) =>
    fizz && buzz ? fizz + buzz : fizz || buzz || count,
  invalidation
})
)}

function _27(fizzBuzzZip){return(
fizzBuzzZip
)}

function _28(md){return(
md`Now when we count the downstream updates we get one update every 500 millis! We solved FizzBuzz the stream orientated way!`
)}

function _countFizzBuzzZip(scan,$0,invalidation){return(
scan({
  view: $0,
  seed: 0,
  scan: (acc, element) => acc + 1,
  invalidation
})
)}

function _30(countFizzBuzzZip){return(
countFizzBuzzZip
)}

function _31(md){return(
md`The zip operator is useful for fixing Obervable dataflow glitches caused by combining synchronised streams.`
)}

function _32(md){return(
md`## Other Examples`
)}

function _33(md){return(
md`#### Rate reduction

Another annoyance with Observable Notebook dataflow is its hard to reduce the rate of dataflow. As soon as a cell references another cell, the downstream cell will always recompute at least as frequently as the upstream cell.

We can fix this with stream operators, if a map function returns undefined, no update is made.

In the following function we will create a cell that updates once a second by only emitting if the counter is even, thereby halving the frequency of updates`
)}

function _evens(map,$0,invalidation){return(
map({
  view: $0,
  map: (v) => (v % 2 ? undefined : v),
  invalidation
})
)}

function _35(evens){return(
evens
)}

function _36(md){return(
md`#### Deduplication

Another common difficulty is preventing duplicate updates, this organically arrises when filtering collections. Often minor perturbations of the selection criteria lead to the same sub-selection, so why cascade that change downstream? More generally, if a cell output is the same, there is no need to propagate a change. We can use scan to achieve this.`
)}

function _headsOrTails(map,$0,invalidation){return(
map({
  view: $0,
  map: (v) => (Math.random() > 0.5 ? "Heads" : "Tails"),
  invalidation
})
)}

function _38(headsOrTails){return(
headsOrTails
)}

function _deduped(scan,$0,invalidation){return(
scan({
  view: $0,
  scan: (acc, value) => (acc !== value ? value : undefined),
  invalidation
})
)}

function _40(deduped){return(
deduped
)}

function _41(md){return(
md`#### Temporal Rate Measurement

The scan is pretty flexible. We can compute a running rate computation. First we map a stream to timestamps, scan to collect those within the last 5 seconds, then compute the average.`
)}

function _timestamp(map,$0,invalidation){return(
map({
  view: $0,
  map: () => performance.now(),
  invalidation
})
)}

function _43(timestamp){return(
timestamp
)}

function _last_5_secs(scan,$0,invalidation){return(
scan({
  view: $0,
  seed: [],
  scan: (acc, next) => {
    acc.push(next);
    while (acc[0] < performance.now() - 5000) acc.shift();
    return acc;
  },
  invalidation
})
)}

function _45(last_5_secs){return(
last_5_secs
)}

function _rate(map,$0,invalidation){return(
map({
  view: $0,
  map: (array) => array.length / (0.001 * (array.at(-1) - array.at(1))),
  invalidation
})
)}

function _47(rate,md){return(
md`${rate} per second`
)}

function _48(md){return(
md`We don't actually need to do these computations in different cells, you can wire everything up purely in imperative code if you want. It looks ugly as hell though.`
)}

function _rate2(map,scan,$0,invalidation){return(
map({
  map: (array) => array.length / (0.001 * (array.at(-1) - array.at(1))),
  view: scan({
    seed: [],
    scan: (acc, next) => {
      acc.push(next);
      while (acc[0] < performance.now() - 5000) acc.shift();
      return acc;
    },
    view: map({
      map: () => performance.now(),
      view: $0,
      invalidation
    }),
    invalidation
  }),
  invalidation
})
)}

function _50(rate2,md){return(
md`${rate2} per second`
)}

function _51(md){return(
md`## Operator Implementation`
)}

function _52(md){return(
md`In most places returning \`undefined\` means skip an update.`
)}

function _53(md){return(
md`### interval

https://rxjs.dev/api/index/function/interval`
)}

function _interval(Inputs,Event){return(
function interval({ period = 0, invalidation }) {
  const result = Inputs.input();
  let count = 0;
  debugger;
  const onTick = () => {
    debugger;
    result.value = count++;
    result.dispatchEvent(new Event("input"));
  };
  const id = setInterval(onTick, period);
  invalidation.then(() => clearInterval(id));
  return result;
}
)}

function _55(md){return(
md`### map

https://rxjs.dev/api/index/function/map`
)}

function _map(Inputs,Event){return(
function map({ view, map = (v) => v, invalidation }) {
  const result = Inputs.input();
  const handler = () => {
    const val = map(view.value);
    if (val !== undefined) {
      result.value = val;
      result.dispatchEvent(new Event("input"));
    }
  };
  view.addEventListener("input", handler);

  invalidation.then(() => view.removeEventListener("input", handler));
  handler();
  return result;
}
)}

function _57(md){return(
md`### scan

https://rxjs.dev/api/operators/scan`
)}

function _scan(Inputs,Event){return(
function scan({ view, scan = (acc, v) => v, seed, invalidation }) {
  const result = Inputs.input();
  let acc = seed;

  const handler = () => {
    const update = scan(acc, view.value);
    if (update !== undefined) {
      acc = update;
      result.value = acc;
      result.dispatchEvent(new Event("input"));
    }
  };

  view.addEventListener("input", handler);

  invalidation.then(() => view.removeEventListener("input", handler));

  handler();
  return result;
}
)}

function _59(md){return(
md`### combineLatest

https://rxjs.dev/api/index/function/combineLatest`
)}

function _combineLatest(Inputs,Event){return(
function combineLatest({
  views = [],
  map = (...views) => views,
  invalidation
}) {
  const result = Inputs.input();
  const recompute = () => {
    const latest = map(...views.map((v) => v.value));
    if (latest !== undefined) {
      result.value = latest;
      result.dispatchEvent(new Event("input"));
    }
  };
  views.forEach((view) => view.addEventListener("input", recompute));
  invalidation.then(() => {
    views.forEach((view) => view.removeEventListener("input", recompute));
  });
  return result;
}
)}

function _61(md){return(
md`### zip

https://rxjs.dev/api/index/function/zip`
)}

function _zip(Inputs,Event){return(
function zip({ views = [], map = (...values) => values, invalidation }) {
  const result = Inputs.input();
  const queues = views.map(() => []);
  const handlers = views.map((view, i) => {
    const handler = () => {
      queues[i].push(view.value);
      if (queues.every((q) => q.length > 0)) {
        const vals = queues.map((q) => q.shift());
        const out = map(...vals);
        if (out !== undefined) {
          result.value = out;
          result.dispatchEvent(new Event("input"));
        }
      }
    };
    view.addEventListener("input", handler);
    return { view, handler };
  });

  invalidation.then(() => {
    handlers.forEach(({ view, handler }) =>
      view.removeEventListener("input", handler)
    );
  });

  return result;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof counter")).define("viewof counter", ["interval","invalidation"], _counter);
  main.variable(observer("counter")).define("counter", ["Generators", "viewof counter"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["counter"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof fizz")).define("viewof fizz", ["map","viewof counter","invalidation"], _fizz);
  main.variable(observer("fizz")).define("fizz", ["Generators", "viewof fizz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["fizz"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof buzz")).define("viewof buzz", ["map","viewof counter","invalidation"], _buzz);
  main.variable(observer("buzz")).define("buzz", ["Generators", "viewof buzz"], (G, _) => G.input(_));
  main.variable(observer()).define(["buzz"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof fizzBuzzCombineLatest")).define("viewof fizzBuzzCombineLatest", ["combineLatest","viewof counter","viewof fizz","viewof buzz","invalidation"], _fizzBuzzCombineLatest);
  main.variable(observer("fizzBuzzCombineLatest")).define("fizzBuzzCombineLatest", ["Generators", "viewof fizzBuzzCombineLatest"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["fizzBuzzCombineLatest"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof countFizzBuzzCombineLatest")).define("viewof countFizzBuzzCombineLatest", ["scan","viewof fizzBuzzCombineLatest","invalidation"], _countFizzBuzzCombineLatest);
  main.variable(observer("countFizzBuzzCombineLatest")).define("countFizzBuzzCombineLatest", ["Generators", "viewof countFizzBuzzCombineLatest"], (G, _) => G.input(_));
  main.variable(observer()).define(["countFizzBuzzCombineLatest"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof fizzBuzzZipArray")).define("viewof fizzBuzzZipArray", ["zip","viewof counter","viewof fizz","viewof buzz","invalidation"], _fizzBuzzZipArray);
  main.variable(observer("fizzBuzzZipArray")).define("fizzBuzzZipArray", ["Generators", "viewof fizzBuzzZipArray"], (G, _) => G.input(_));
  main.variable(observer()).define(["fizzBuzzZipArray"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("viewof fizzBuzzZip")).define("viewof fizzBuzzZip", ["zip","viewof counter","viewof fizz","viewof buzz","invalidation"], _fizzBuzzZip);
  main.variable(observer("fizzBuzzZip")).define("fizzBuzzZip", ["Generators", "viewof fizzBuzzZip"], (G, _) => G.input(_));
  main.variable(observer()).define(["fizzBuzzZip"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof countFizzBuzzZip")).define("viewof countFizzBuzzZip", ["scan","viewof fizzBuzzZip","invalidation"], _countFizzBuzzZip);
  main.variable(observer("countFizzBuzzZip")).define("countFizzBuzzZip", ["Generators", "viewof countFizzBuzzZip"], (G, _) => G.input(_));
  main.variable(observer()).define(["countFizzBuzzZip"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof evens")).define("viewof evens", ["map","viewof counter","invalidation"], _evens);
  main.variable(observer("evens")).define("evens", ["Generators", "viewof evens"], (G, _) => G.input(_));
  main.variable(observer()).define(["evens"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("viewof headsOrTails")).define("viewof headsOrTails", ["map","viewof counter","invalidation"], _headsOrTails);
  main.variable(observer("headsOrTails")).define("headsOrTails", ["Generators", "viewof headsOrTails"], (G, _) => G.input(_));
  main.variable(observer()).define(["headsOrTails"], _38);
  main.variable(observer("viewof deduped")).define("viewof deduped", ["scan","viewof headsOrTails","invalidation"], _deduped);
  main.variable(observer("deduped")).define("deduped", ["Generators", "viewof deduped"], (G, _) => G.input(_));
  main.variable(observer()).define(["deduped"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof timestamp")).define("viewof timestamp", ["map","viewof deduped","invalidation"], _timestamp);
  main.variable(observer("timestamp")).define("timestamp", ["Generators", "viewof timestamp"], (G, _) => G.input(_));
  main.variable(observer()).define(["timestamp"], _43);
  main.variable(observer("viewof last_5_secs")).define("viewof last_5_secs", ["scan","viewof timestamp","invalidation"], _last_5_secs);
  main.variable(observer("last_5_secs")).define("last_5_secs", ["Generators", "viewof last_5_secs"], (G, _) => G.input(_));
  main.variable(observer()).define(["last_5_secs"], _45);
  main.variable(observer("viewof rate")).define("viewof rate", ["map","viewof last_5_secs","invalidation"], _rate);
  main.variable(observer("rate")).define("rate", ["Generators", "viewof rate"], (G, _) => G.input(_));
  main.variable(observer()).define(["rate","md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof rate2")).define("viewof rate2", ["map","scan","viewof deduped","invalidation"], _rate2);
  main.variable(observer("rate2")).define("rate2", ["Generators", "viewof rate2"], (G, _) => G.input(_));
  main.variable(observer()).define(["rate2","md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("interval")).define("interval", ["Inputs","Event"], _interval);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("map")).define("map", ["Inputs","Event"], _map);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("scan")).define("scan", ["Inputs","Event"], _scan);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("combineLatest")).define("combineLatest", ["Inputs","Event"], _combineLatest);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("zip")).define("zip", ["Inputs","Event"], _zip);
  return main;
}
