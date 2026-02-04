function _1(htl){return(
htl.html`"Tiny notebook"`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["htl"], _1);
  return main;
}
