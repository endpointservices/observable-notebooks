// https://observablehq.com/@tomlarkworthy/randomid@65
function _1(md){return(
md`# Secure random ID

~~~js
import {randomId} from '@tomlarkworthy/randomid'
~~~

`
)}

function _chars(){return(
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
)}

function _example(randomId){return(
randomId()
)}

function _randomId(chars){return(
(len = 8) => {
  var array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  return [...array].map(v => chars[v % chars.length]).join('');
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chars")).define("chars", _chars);
  main.variable(observer("example")).define("example", ["randomId"], _example);
  main.variable(observer("randomId")).define("randomId", ["chars"], _randomId);
  return main;
}
