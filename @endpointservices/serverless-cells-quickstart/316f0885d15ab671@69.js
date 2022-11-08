// https://observablehq.com/@tomlarkworthy/randomid@69
function _1(md){return(
md`# Secure random ID

~~~js
import {randomId} from '@tomlarkworthy/randomid'
~~~

`
)}

function _example(randomId){return(
randomId()
)}

function _randomId(){return(
(len = 8) => {
  // From 'https://observablehq.com/@tomlarkworthy/randomid'
  // Avoid / and + and - and _ typof chars seen in base64
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  return [...array].map((v) => chars[v % chars.length]).join("");
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("example")).define("example", ["randomId"], _example);
  main.variable(observer("randomId")).define("randomId", _randomId);
  return main;
}
