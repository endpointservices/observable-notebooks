function _1(md){return(
md`# SharedArrayBuffer`
)}

function _2(md){return(
md`Requires the HTML response headers
\`\`\`
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
\`\`\``
)}

function _3(crossOriginIsolated){return(
crossOriginIsolated
)}

function _sharedBuffer(SharedArrayBuffer){return(
new SharedArrayBuffer(4)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["crossOriginIsolated"], _3);
  main.variable(observer("sharedBuffer")).define("sharedBuffer", ["SharedArrayBuffer"], _sharedBuffer);
  return main;
}
