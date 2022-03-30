// https://observablehq.com/@mbostock/base64@152
function _1(md){return(
md`# Base64`
)}

function _encoded(Inputs){return(
Inputs.textarea({
  value: "RWRpdCBtZSwgb3IgcGFzdGUgc29tZSBCYXNlNjQgaW50byB0aGUgYm94IGFib3ZlIQ==",
  spellcheck: false,
  label: "Encoded"
})
)}

function _decoded(Inputs){return(
Inputs.textarea({
  label: "Decoded",
  spellcheck: false
})
)}

function _4(md){return(
md`---

## Implementation

Based on Niklas von Hertzen’s [base64-arraybuffer](https://github.com/niklasvh/base64-arraybuffer); MIT licensed.`
)}

function _update($0,decode,$1,encode,invalidation)
{
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder("utf-8");
  const redecode = () => $0.value = decoder.decode(decode($1.value));
  const reencode = () => $1.value = encode(encoder.encode($0.value));
  redecode();
  $1.addEventListener("input", redecode);
  $0.addEventListener("input", reencode);
  invalidation.then(() => {
    $1.removeEventListener("input", redecode);
    $0.removeEventListener("input", reencode);
  });
}


function _decode(lookup){return(
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
)}

function _encode(chars){return(
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
)}

function _chars(){return(
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
)}

function _lookup(chars)
{
  const lookup = new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  return lookup;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof encoded")).define("viewof encoded", ["Inputs"], _encoded);
  main.variable(observer("encoded")).define("encoded", ["Generators", "viewof encoded"], (G, _) => G.input(_));
  main.variable(observer("viewof decoded")).define("viewof decoded", ["Inputs"], _decoded);
  main.variable(observer("decoded")).define("decoded", ["Generators", "viewof decoded"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("update")).define("update", ["viewof decoded","decode","viewof encoded","encode","invalidation"], _update);
  main.variable(observer("decode")).define("decode", ["lookup"], _decode);
  main.variable(observer("encode")).define("encode", ["chars"], _encode);
  main.variable(observer("chars")).define("chars", _chars);
  main.variable(observer("lookup")).define("lookup", ["chars"], _lookup);
  return main;
}
