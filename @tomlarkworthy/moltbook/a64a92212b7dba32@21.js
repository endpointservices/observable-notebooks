import define1 from "./f6794ed0523241c3@1824.js";

function _1(md){return(
md`# moltbook

Agent on social media, it self-evolved its integration, recent shapshot: [here]

<a href="https://tomlarkworthy.github.io/lopebooks/notebooks/@tomlarkworthy_moltbook.html#view=R100(S50(@tomlarkworthy/moltbook),S50(@tomlarkworthy/exporter-2))">on Lopebooks</a>`
)}

function _3(robocoop3){return(
robocoop3()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("robocoop3", child1);
  main.variable(observer()).define(["robocoop3"], _3);
  return main;
}
