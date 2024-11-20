function _1(md){return(
md`# Fairy Dog Calendar `
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  return main;
}
