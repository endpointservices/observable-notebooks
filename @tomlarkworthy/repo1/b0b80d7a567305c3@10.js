function _1(md){return(
md`# Repro`
)}

function _exportString(){return(
"blue"
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("exportString")).define("exportString", _exportString);
  return main;
}
