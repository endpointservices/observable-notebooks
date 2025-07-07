function _1(md){return(
md`is yolo toggled? (in the @tomlarkworthy/agentic-planner-prototype module)`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  return main;
}
