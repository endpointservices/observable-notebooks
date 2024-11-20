import define1 from "./6eda90668ae03044@836.js";
import define2 from "./bb2055d580bbbab2@106.js";

function _1(tweet,md){return(
md`# Substack signup form is 2.4 MB!!!!!

${tweet("1562845641625071616")}

Here is an extremely simple [webpage](https://webcode.run/observablehq.com/@tomlarkworthy/substack-signup-form) that does nothing other than host the recommended iframe snippet by Substack.`
)}

function _2(endpoint){return(
endpoint("default", async (req, res) => {
  res.send(
    `<iframe src="https://webcode.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>`
  );
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["tweet","md"], _1);
  main.variable(observer()).define(["endpoint"], _2);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  const child2 = runtime.module(define2);
  main.import("tweet", child2);
  return main;
}
