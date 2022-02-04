// https://observablehq.com/@tomlarkworthy/randomid@65
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Secure random ID

~~~js
import {randomId} from '@tomlarkworthy/randomid'
~~~

`
)});
  main.variable(observer("chars")).define("chars", function(){return(
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
)});
  main.variable(observer("example")).define("example", ["randomId"], function(randomId){return(
randomId()
)});
  main.variable(observer("randomId")).define("randomId", ["chars"], function(chars){return(
(len = 8) => {
  var array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  return [...array].map(v => chars[v % chars.length]).join('');
}
)});
  return main;
}
