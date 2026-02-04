function _1(md){return(
md`# SHA-1 in the Browser

This notebook contains methods to generate SHA-1 hashes using pure JS.

Methods:
* \`sha1(message)\` - accepts a string and returns HEX-encoded SHA-1 hash
* \`newSha1()\` - accepts a binary array and returns an object with the following methods allowing to calculate SHA-1 hash:
  * \`update(array)\` - updates the internal hash
  * \`finalize()\` - finalizes digest calculations and returns a binary array with the hash
* to hex / from hex encoding:
  - \`toHex(array)\` - encode the given binary array and returns the corresponding HEX string
  - \`fromHex(string)\` - gets a HEX-encoded string and returns a binary array with the content
`
)}

function _2(md){return(
md`Simple usage: calculate the HEX-encodied SHA-1 digest:`
)}

function _hash(sha1){return(
sha1("Hello")
)}

function _4(md){return(
md`An example of digest calculations for multiple binary chunks:`
)}

function _5(newSha1)
{
  const encoder = new TextEncoder();
  const token1 = encoder.encode("Hello");
  const token2 = encoder.encode(" ");
  const token3 = encoder.encode("World");

  // Example 1: chained methods calls
  const hash1 = newSha1()
    .update(token1)
    .update(token2)
    .update(token3)
    .finalize();

  const hash2 = newSha1(token1, token2, token3);

  return {
    hash1,
    hash2
  };
}


function _6(md){return(
md`## SHA-1 Calculations`
)}

function _7(md){return(
md` This method contains the implementation of the SHA1 algorithm copied from [js-sha1](https://github.com/emn178/js-sha1) library (MIT License).
 If this method is used with parameters - with one or more byte arrays - then it directly returns the resulting hash.
 
 If there is no parameters for this method then it returns an update function which can be called multiple times to update the internal digest. The chained "finalize" function returns the resulting hash.`
)}

function _newSha1(){return(
function newSha1(message) {
  /*
   * [js-sha1]{@link https://github.com/emn178/js-sha1}
   *
   * @version 0.6.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   */

  const EXTRA = [-2147483648, 8388608, 32768, 128];
  const SHIFT = [24, 16, 8, 0];

  const blocks = [];
  blocks[0] =
    blocks[16] =
    blocks[1] =
    blocks[2] =
    blocks[3] =
    blocks[4] =
    blocks[5] =
    blocks[6] =
    blocks[7] =
    blocks[8] =
    blocks[9] =
    blocks[10] =
    blocks[11] =
    blocks[12] =
    blocks[13] =
    blocks[14] =
    blocks[15] =
      0;

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  let block = 0;
  let start = 0;
  let bytes = 0;
  let hBytes = 0;
  let finalized = false;
  let hashed = false;
  let first = true;

  let lastByteIndex;

  function checkFinalized() {
    if (finalized) throw new Error("Hash was finalized");
  }

  function update(message) {
    if (!arguments.length) {
      return update;
    }
    checkFinalized();
    let code,
      index = 0,
      i,
      length = message.length || 0;

    while (index < length) {
      if (hashed) {
        hashed = false;
        blocks[0] = block;
        blocks[16] =
          blocks[1] =
          blocks[2] =
          blocks[3] =
          blocks[4] =
          blocks[5] =
          blocks[6] =
          blocks[7] =
          blocks[8] =
          blocks[9] =
          blocks[10] =
          blocks[11] =
          blocks[12] =
          blocks[13] =
          blocks[14] =
          blocks[15] =
            0;
      }

      for (i = start; index < length && i < 64; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }

      lastByteIndex = i;
      bytes += i - start;
      if (i >= 64) {
        block = blocks[16];
        start = i - 64;
        hash();
        hashed = true;
      } else {
        start = i;
      }
    }
    if (bytes > 4294967295) {
      hBytes += (bytes / 4294967296) << 0;
      bytes = bytes % 4294967296;
    }
    return update;
  }

  function finalize() {
    checkFinalized();
    finalized = true;
    let i = lastByteIndex;
    blocks[16] = block;
    blocks[i >> 2] |= EXTRA[i & 3];
    block = blocks[16];
    if (i >= 56) {
      if (!hashed) {
        hash();
      }
      blocks[0] = block;
      blocks[16] =
        blocks[1] =
        blocks[2] =
        blocks[3] =
        blocks[4] =
        blocks[5] =
        blocks[6] =
        blocks[7] =
        blocks[8] =
        blocks[9] =
        blocks[10] =
        blocks[11] =
        blocks[12] =
        blocks[13] =
        blocks[14] =
        blocks[15] =
          0;
    }
    blocks[14] = (hBytes << 3) | (bytes >>> 29);
    blocks[15] = bytes << 3;
    hash();

    return [
      (h0 >> 24) & 0xff,
      (h0 >> 16) & 0xff,
      (h0 >> 8) & 0xff,
      h0 & 0xff,
      (h1 >> 24) & 0xff,
      (h1 >> 16) & 0xff,
      (h1 >> 8) & 0xff,
      h1 & 0xff,
      (h2 >> 24) & 0xff,
      (h2 >> 16) & 0xff,
      (h2 >> 8) & 0xff,
      h2 & 0xff,
      (h3 >> 24) & 0xff,
      (h3 >> 16) & 0xff,
      (h3 >> 8) & 0xff,
      h3 & 0xff,
      (h4 >> 24) & 0xff,
      (h4 >> 16) & 0xff,
      (h4 >> 8) & 0xff,
      h4 & 0xff
    ];
  }

  function hash() {
    var a = h0,
      b = h1,
      c = h2,
      d = h3,
      e = h4;
    var f, j, t;

    for (j = 16; j < 80; ++j) {
      t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
      blocks[j] = (t << 1) | (t >>> 31);
    }

    for (j = 0; j < 20; j += 5) {
      f = (b & c) | (~b & d);
      t = (a << 5) | (a >>> 27);
      e = (t + f + e + 1518500249 + blocks[j]) << 0;
      b = (b << 30) | (b >>> 2);

      f = (a & b) | (~a & c);
      t = (e << 5) | (e >>> 27);
      d = (t + f + d + 1518500249 + blocks[j + 1]) << 0;
      a = (a << 30) | (a >>> 2);

      f = (e & a) | (~e & b);
      t = (d << 5) | (d >>> 27);
      c = (t + f + c + 1518500249 + blocks[j + 2]) << 0;
      e = (e << 30) | (e >>> 2);

      f = (d & e) | (~d & a);
      t = (c << 5) | (c >>> 27);
      b = (t + f + b + 1518500249 + blocks[j + 3]) << 0;
      d = (d << 30) | (d >>> 2);

      f = (c & d) | (~c & e);
      t = (b << 5) | (b >>> 27);
      a = (t + f + a + 1518500249 + blocks[j + 4]) << 0;
      c = (c << 30) | (c >>> 2);
    }

    for (; j < 40; j += 5) {
      f = b ^ c ^ d;
      t = (a << 5) | (a >>> 27);
      e = (t + f + e + 1859775393 + blocks[j]) << 0;
      b = (b << 30) | (b >>> 2);

      f = a ^ b ^ c;
      t = (e << 5) | (e >>> 27);
      d = (t + f + d + 1859775393 + blocks[j + 1]) << 0;
      a = (a << 30) | (a >>> 2);

      f = e ^ a ^ b;
      t = (d << 5) | (d >>> 27);
      c = (t + f + c + 1859775393 + blocks[j + 2]) << 0;
      e = (e << 30) | (e >>> 2);

      f = d ^ e ^ a;
      t = (c << 5) | (c >>> 27);
      b = (t + f + b + 1859775393 + blocks[j + 3]) << 0;
      d = (d << 30) | (d >>> 2);

      f = c ^ d ^ e;
      t = (b << 5) | (b >>> 27);
      a = (t + f + a + 1859775393 + blocks[j + 4]) << 0;
      c = (c << 30) | (c >>> 2);
    }

    for (; j < 60; j += 5) {
      f = (b & c) | (b & d) | (c & d);
      t = (a << 5) | (a >>> 27);
      e = (t + f + e - 1894007588 + blocks[j]) << 0;
      b = (b << 30) | (b >>> 2);

      f = (a & b) | (a & c) | (b & c);
      t = (e << 5) | (e >>> 27);
      d = (t + f + d - 1894007588 + blocks[j + 1]) << 0;
      a = (a << 30) | (a >>> 2);

      f = (e & a) | (e & b) | (a & b);
      t = (d << 5) | (d >>> 27);
      c = (t + f + c - 1894007588 + blocks[j + 2]) << 0;
      e = (e << 30) | (e >>> 2);

      f = (d & e) | (d & a) | (e & a);
      t = (c << 5) | (c >>> 27);
      b = (t + f + b - 1894007588 + blocks[j + 3]) << 0;
      d = (d << 30) | (d >>> 2);

      f = (c & d) | (c & e) | (d & e);
      t = (b << 5) | (b >>> 27);
      a = (t + f + a - 1894007588 + blocks[j + 4]) << 0;
      c = (c << 30) | (c >>> 2);
    }

    for (; j < 80; j += 5) {
      f = b ^ c ^ d;
      t = (a << 5) | (a >>> 27);
      e = (t + f + e - 899497514 + blocks[j]) << 0;
      b = (b << 30) | (b >>> 2);

      f = a ^ b ^ c;
      t = (e << 5) | (e >>> 27);
      d = (t + f + d - 899497514 + blocks[j + 1]) << 0;
      a = (a << 30) | (a >>> 2);

      f = e ^ a ^ b;
      t = (d << 5) | (d >>> 27);
      c = (t + f + c - 899497514 + blocks[j + 2]) << 0;
      e = (e << 30) | (e >>> 2);

      f = d ^ e ^ a;
      t = (c << 5) | (c >>> 27);
      b = (t + f + b - 899497514 + blocks[j + 3]) << 0;
      d = (d << 30) | (d >>> 2);

      f = c ^ d ^ e;
      t = (b << 5) | (b >>> 27);
      a = (t + f + a - 899497514 + blocks[j + 4]) << 0;
      c = (c << 30) | (c >>> 2);
    }

    h0 = (h0 + a) << 0;
    h1 = (h1 + b) << 0;
    h2 = (h2 + c) << 0;
    h3 = (h3 + d) << 0;
    h4 = (h4 + e) << 0;
  }

  update.finalize = finalize;
  update.update = update;
  if (arguments.length) {
    for (let i = 0; i < arguments.length; i++) {
      update(arguments[i]);
    }
    return finalize();
  } else {
    return update;
  }
}
)}

function _9(md){return(
md`An utility method accepting a string parameter used to calculate the hash and returns the corresponding HEX-encoded SHA-1 digest:`
)}

function _sha1(toHex,newSha1){return(
function sha1(str) {
  const encoder = new TextEncoder();
  return toHex(newSha1(encoder.encode(str)));
}
)}

function _11(md){return(
md`## \`fromHex / toHex\` methods`
)}

function _toHex(){return(
function toHex(array) {
  return Array.from(new Uint8Array(array))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
)}

function _fromHex(){return(
function fromHex(hexString) {
  const MAP_HEX = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15
  };

  const bytes = new Uint8Array(Math.floor((hexString || "").length / 2));
  let i;
  for (i = 0; i < bytes.length; i++) {
    const a = MAP_HEX[hexString[i * 2]];
    const b = MAP_HEX[hexString[i * 2 + 1]];
    if (a === undefined || b === undefined) {
      break;
    }
    bytes[i] = (a << 4) | b;
  }
  return i === bytes.length ? bytes : bytes.slice(0, i);
}
)}

function _14(fromHex,hash){return(
fromHex(hash)
)}

function _15(md){return(
md`## Utilities`
)}

function _report(){return(
function report(action) {
  const start = Date.now();
  try {
    return action();
  } finally {
    const stop = Date.now();
    console.log(`- ${stop - start}ms`);
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("hash")).define("hash", ["sha1"], _hash);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["newSha1"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("newSha1")).define("newSha1", _newSha1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("sha1")).define("sha1", ["toHex","newSha1"], _sha1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("toHex")).define("toHex", _toHex);
  main.variable(observer("fromHex")).define("fromHex", _fromHex);
  main.variable(observer()).define(["fromHex","hash"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("report")).define("report", _report);
  return main;
}
