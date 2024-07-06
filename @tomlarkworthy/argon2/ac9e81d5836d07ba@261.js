import define1 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Argon2 password hasher

Argon2 is the current best practice for password hashing.

~~~js
import {argon2} from '@tomlarkworthy/argon2'
~~~

There are a lot of cool options, check out https://github.com/antelle/argon2-browser
~~~js
argon2.hash({
    // required
    pass: 'password',
    salt: 'salt',
    // optional
    time: 1, // the number of iterations
    mem: 1024, // used memory, in KiB
    hashLen: 24, // desired hash length
    parallelism: 1, // desired parallelism (will be computed in parallel only for PNaCl)
    secret: new Uint8Array([...]), // optional secret data
    ad: new Uint8Array([...]), // optional associated data
    type: argon2.ArgonType.Argon2d, // or argon2.ArgonType.Argon2i
})
~~~

I had problems with CORS and importing it. So I figured out a way in this notebook

downloaded from https://github.com/antelle/argon2-browser

version was: 1.15.2
`
)}

function _2(md){return(
md`## Generate a hash with sane defaults
If you are not sure, these settings are better than the defaults (for password hashing)
`
)}

function _password(html){return(
html`<input placeholder="password">`
)}

function _salt(html){return(
html`<input placeholder="salt (8 char min)" value="testsalt">`
)}

function _5(argon2,password,salt){return(
argon2.hash({
  pass: password, 
  salt: salt,
  time: 10,  // rounds
  mem: 1024, // used memory, in KiB
  type: argon2.ArgonType.Argon2i // OWASP recommendation
})
)}

async function _argon2(configureGlobals,require,FileAttachment)
{
  configureGlobals
  return require(await FileAttachment("argon2lib.js").url())
}


async function _configureGlobals(FileAttachment)
{
  // This was the main gotcha with importing that module
  window['argon2WasmPath'] = await FileAttachment("argon2.wasm").url()
  window['loadArgon2WasmModule'] = async () => import(await FileAttachment("argon2.js").url())
}


function _8(md){return(
md`## Example`
)}

function _encrypted(argon2){return(
argon2.hash({
  pass: 'password',
  salt: 'somesalt',
  time: 10, // rounds
  mem: 1024, // used memory, in KiB
  type: argon2.ArgonType.Argon2i
})
)}

function _valid(argon2,encrypted){return(
argon2.verify({ pass: 'password', encoded: encrypted.encoded })
)}

function _invalid(argon2,encrypted){return(
argon2.verify({ pass: 'password2', encoded: encrypted.encoded }).catch(err => err)
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["argon2.wasm", {url: new URL("./files/df96c4a6d46e6640daaebb8936f00556bc217d5ee91509e85a6d7eb8e366b0429ed3af31214b2869da00ca15df4b20dbd88cdb4193f91f951bc1acc48ab30f7f.wasm", import.meta.url), mimeType: "application/wasm", toString}],
    ["argon2.js", {url: new URL("./files/f10fee8f4f64c0379e2adcc68502baba46fbf2008e51ee91e2edd26cdc287025859b9ca787dd9178eded27828cdcdc611c8dfdfafd5805533d42dd3ce1d57e10.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["argon2lib.js", {url: new URL("./files/702f5dc872f1774c857f4713286e659ceca604c80e0d59ab31abb819f756aac5bb375f369b6caebb345b0df84b9daa9ca3925c350ef5207112fbebbfaf8777d8.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof password")).define("viewof password", ["html"], _password);
  main.variable(observer("password")).define("password", ["Generators", "viewof password"], (G, _) => G.input(_));
  main.variable(observer("viewof salt")).define("viewof salt", ["html"], _salt);
  main.variable(observer("salt")).define("salt", ["Generators", "viewof salt"], (G, _) => G.input(_));
  main.variable(observer()).define(["argon2","password","salt"], _5);
  main.variable(observer("argon2")).define("argon2", ["configureGlobals","require","FileAttachment"], _argon2);
  main.variable(observer("configureGlobals")).define("configureGlobals", ["FileAttachment"], _configureGlobals);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("encrypted")).define("encrypted", ["argon2"], _encrypted);
  main.variable(observer("valid")).define("valid", ["argon2","encrypted"], _valid);
  main.variable(observer("invalid")).define("invalid", ["argon2","encrypted"], _invalid);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _13);
  return main;
}
