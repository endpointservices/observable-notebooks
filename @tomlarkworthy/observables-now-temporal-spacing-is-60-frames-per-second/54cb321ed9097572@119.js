// https://observablehq.com/@tomlarkworthy/observables-now-temporal-spacing-is-60-frames-per-second@119
function _1(md){return(
md`# Observable's _'now'_ temporal spacing is 60 or 30 frames per second.

Take a __*weighted running mean*__ of subsequent _'now'_ measurements. As its so fast it should quickly converge to a stable measure. The stability comes from integrating information over hundreds of samples.

My final measurement was _16.6ms_, which is bang-on 60 _frames per second_ (Chrome M1).

[Jacob Rus](https://observablehq.com/@jrus) reports 30 FPS in Safari
`
)}

function _mean_diff_ms(){return(
10
)}

function _prev_now(){return(
(new Date()).getTime()
)}

function _iteration($0,mean_diff_ms,now,prev_now,$1)
{
  // Take a weighted average between the latest measurement and the history, strongly bias towards
  // history (0.99 unit weight)
  $0.value = 0.99 * mean_diff_ms + 0.01 * (now - prev_now)
  $1.value = now;
}


function _5(md){return(
md`## Decimating 'now'

'now' runs a bit fast, can we trigger every 10th?
`
)}

function _slow_now(now)
{
  const latest = now; // Will update at 30 or 60 fps
  if (Math.random() < 0.1) return now
  else return new Promise(() => {}) // Mask update by returning unresolved promise
}


function _slow_updates(){return(
0
)}

function _updates(){return(
0
)}

function _9(slow_now,$0)
{
  slow_now
  $0.value++
}


function _10(now,$0)
{
  now
  $0.value++
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.define("initial mean_diff_ms", _mean_diff_ms);
  main.variable(observer("mutable mean_diff_ms")).define("mutable mean_diff_ms", ["Mutable", "initial mean_diff_ms"], (M, _) => new M(_));
  main.variable(observer("mean_diff_ms")).define("mean_diff_ms", ["mutable mean_diff_ms"], _ => _.generator);
  main.define("initial prev_now", _prev_now);
  main.variable(observer("mutable prev_now")).define("mutable prev_now", ["Mutable", "initial prev_now"], (M, _) => new M(_));
  main.variable(observer("prev_now")).define("prev_now", ["mutable prev_now"], _ => _.generator);
  main.variable(observer("iteration")).define("iteration", ["mutable mean_diff_ms","mean_diff_ms","now","prev_now","mutable prev_now"], _iteration);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("slow_now")).define("slow_now", ["now"], _slow_now);
  main.define("initial slow_updates", _slow_updates);
  main.variable(observer("mutable slow_updates")).define("mutable slow_updates", ["Mutable", "initial slow_updates"], (M, _) => new M(_));
  main.variable(observer("slow_updates")).define("slow_updates", ["mutable slow_updates"], _ => _.generator);
  main.define("initial updates", _updates);
  main.variable(observer("mutable updates")).define("mutable updates", ["Mutable", "initial updates"], (M, _) => new M(_));
  main.variable(observer("updates")).define("updates", ["mutable updates"], _ => _.generator);
  main.variable(observer()).define(["slow_now","mutable slow_updates"], _9);
  main.variable(observer()).define(["now","mutable updates"], _10);
  return main;
}
