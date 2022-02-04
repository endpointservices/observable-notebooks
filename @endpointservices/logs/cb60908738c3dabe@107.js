// https://observablehq.com/@mbostock/base64@107
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Base64`
)});
  main.variable(observer("viewof mode")).define("viewof mode", ["html"], function(html){return(
html`<select>
  <option value=decode>Decode (from Base64 to ASCII)
  <option value=encode>Encode (from ASCII to Base64)
</select>`
)});
  main.variable(observer("mode")).define("mode", ["Generators", "viewof mode"], (G, _) => G.input(_));
  main.variable(observer("viewof input")).define("viewof input", ["Inputs"], function(Inputs){return(
Inputs.textarea({value: "UGFzdGUgc29tZSBCYXNlNjQgaW50byB0aGUgYm94IGFib3ZlIQ==", spellcheck: false})
)});
  main.variable(observer("input")).define("input", ["Generators", "viewof input"], (G, _) => G.input(_));
  main.variable(observer("output")).define("output", ["html","mode","encode","input","decode"], function(html,mode,encode,input,decode){return(
Object.assign(html`<pre style="padding: 6px 0; white-space: pre-wrap;">`, {
  textContent: mode === "encode"
    ? encode(new TextEncoder("utf-8").encode(input))
    : new TextDecoder("utf-8").decode(decode(input))
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix

You can use btoa and atob, but the methods below use typed arrays for safety.`
)});
  main.variable(observer("decode")).define("decode", ["lookup"], function(lookup){return(
function decode(base64) {
  let len = base64.length;
  let bufferLength = len * 0.75;
  let i;
  let p = 0;
  if (base64[base64.length - 1] === "=") {
    --bufferLength;
    if (base64[base64.length - 2] === "=") {
      --bufferLength;
    }
  }
  let bytes = new Uint8Array(bufferLength);
  for (i = 0; i < len; i+=4) {
    const encoded1 = lookup[base64.charCodeAt(i)];
    const encoded2 = lookup[base64.charCodeAt(i+1)];
    const encoded3 = lookup[base64.charCodeAt(i+2)];
    const encoded4 = lookup[base64.charCodeAt(i+3)];
    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
  }
  return bytes.buffer;
}
)});
  main.variable(observer("encode")).define("encode", ["chars"], function(chars){return(
function encode(buffer) {
  let bytes = new Uint8Array(buffer);
  let len = bytes.length;
  let i;
  let base64 = "";
  for (i = 0; i < len; i+=3) {
    base64 += chars[bytes[i] >> 2];
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += chars[bytes[i + 2] & 63];
  }
  if ((len % 3) === 2) {
    base64 = base64.slice(0, -1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.slice(0, -2) + "==";
  }
  return base64;
}
)});
  main.variable(observer("chars")).define("chars", function(){return(
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
)});
  main.variable(observer("lookup")).define("lookup", ["chars"], function(chars)
{
  const lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  return lookup;
}
);
  return main;
}
