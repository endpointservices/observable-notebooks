function _1(md){return(
md`# Sentry ES6 problem for 7.1.0`
)}

function _version(Inputs){return(
Inputs.select(["7.1.0", "7.0.0", "7.1.1"], {
  label: "version"
})
)}

function _3(version){return(
import(`https://cdn.skypack.dev/@sentry/browser@${version}?min`)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof version")).define("viewof version", ["Inputs"], _version);
  main.variable(observer("version")).define("version", ["Generators", "viewof version"], (G, _) => G.input(_));
  main.variable(observer()).define(["version"], _3);
  return main;
}
