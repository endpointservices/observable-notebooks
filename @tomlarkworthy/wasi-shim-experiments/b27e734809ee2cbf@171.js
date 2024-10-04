import define1 from "./8fbd0c403e63ced3@235.js";

function _1(md){return(
md`# WASI [browser_wasi_shim](https://github.com/bjorn3/browser_wasi_shim) experiments


This notebook executes a C program in a WASI environment and half prints some of the text to xterm.js

It does not really work properly, we don't have much of stdin working. I was following the example from \`browser_wasi_shim\` but it does not implement stdin either.

That said, container2wasm has a fuller example, but in a webworker. 

https://github.com/ktock/container2wasm/blob/d05d6977df7a0d51dbc807a893f1854db8960c75/examples/wasi-browser/htdocs/worker.js#L169

The point of this notebook is to see if we can get WASI working in Observable. I learnt: yes we can, but we need a fuller implementation of WASI than the example in browser_wasi_shim, and container2wasm demonstrates this is also possible.`
)}

function _2(md){return(
md`## A simple C program that uses stdout and stdin

\`\`\`c
#include <stdio.h>  
int main() {  
  char name[50];  
    int age;  
    int favoriteNumber;  
  printf("Enter your name: \\n");  
  scanf("%s", name);  
  printf("Enter your age: \\n");  
  scanf("%d", &age);  
  printf("Enter your favorite number: \\n");  
  scanf("%d", &favoriteNumber);  
  printf("Name: %s\\n", name);  
  printf("Age: %d\\n", age);  
  printf("Favorite Number: %d\\n", favoriteNumber);  
  return 0;  
}  
\`\`\`

compile it using a docker image of the WASI SDK

\`\`\`
docker run -v \`pwd\`:/src -it -w /src ghcr.io/webassembly/wasi-sdk clang-17 --sysroot=/wasi-sysroot/ --target=wasm32-wasi simple.c -o simple.wasm
\`\`\`

should produce a binary you can check it works with \`wasmtime\` or \`wasmer\`. Mine is 47k

\`\`\`
wasmtime simple.wasm
wasmer simple.wasm  
\`\`\`

`
)}

function _simple_wasm(FileAttachment){return(
FileAttachment("simple.wasm")
)}

function _4(md){return(
md`## Xterm

Xtrem.js is used to host our program io`
)}

async function _xterm(){return(
(await import("https://cdn.skypack.dev/xterm@4.18.0?min")).default
  .Terminal
)}

function _7(terminalContainer){return(
terminalContainer
)}

function _8(xtermCSS){return(
xtermCSS
)}

function _term(Terminal){return(
Terminal
)}

function _10(md){return(
md`## WASI shim`
)}

function _wasiShim(){return(
import(
  "https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.2.17/+esm"
)
)}

function _12(md){return(
md`## Xtermio

We extends wasiShim.Fd to pipe fd_write to our terminal. Note this is only 1 of about 20 methods that need to be implemented.

see https://github.com/bjorn3/browser_wasi_shim/blob/main/examples/rustc.html`
)}

function _XtermStdio(wasiShim){return(
class XtermStdio extends wasiShim.Fd {
  /*:: term: Terminal*/

  constructor(term /*: Terminal*/) {
    super();
    this.term = term;
    this.file_pos = 0;
  }
  fd_write(
    view8 /*: Uint8Array*/,
    iovs /*: [wasi.Iovec]*/
  ) /*: {ret: number, nwritten: number}*/ {
    let nwritten = 0;
    for (let iovec of iovs) {
      console.log(
        iovec.buf_len,
        iovec.buf_len,
        view8.slice(iovec.buf, iovec.buf + iovec.buf_len)
      );
      let buffer = view8.slice(iovec.buf, iovec.buf + iovec.buf_len);
      this.term.writeln(buffer);
      nwritten += iovec.buf_len;
    }
    return { ret: 0, nwritten };
  }
  /*
  fd_read(
    view8, // Uint8Array
    iovs // Array<wasi.Iovec>
  ) {
    debugger;
    let nread = 0;
    for (const iovec of iovs) {
      if (this.file_pos < this.file.data.byteLength) {
        const slice = this.file.data.slice(
          Number(this.file_pos),
          Number(this.file_pos + BigInt(iovec.buf_len))
        );
        view8.set(slice, iovec.buf);
        this.file_pos += BigInt(slice.length);
        nread += slice.length;
      } else {
        break;
      }
    }
    return { ret: 0, nread };
  }*/
}
)}

function _14(md){return(
md`## Run WASI`
)}

async function _15(XtermStdio,term,wasiShim,WebAssembly,simple_wasm)
{
  let args = ["bin", "arg1", "arg2"];
  let env = ["FOO=bar"];
  let fds = [
    new XtermStdio(term), // stdin
    new XtermStdio(term), // stdout
    new XtermStdio(term) // stderr
  ];
  let wasi = new wasiShim.WASI(args, env, fds);
  let wasm = await WebAssembly.compileStreaming(fetch(await simple_wasm.url()));
  let inst = await WebAssembly.instantiate(wasm, {
    wasi_snapshot_preview1: wasi.wasiImport
  });
  wasi.start(inst);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["simple.wasm", {url: new URL("./files/66a29abbb45c708a85cb0cd7e9eb0074fad46575a31f8db528068ff8ae8089070a1cc33c8aaa062de0feb8d1107672fc9ffe298398c1bfef3b18e3f951c46856.wasm", import.meta.url), mimeType: "application/wasm", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("simple_wasm")).define("simple_wasm", ["FileAttachment"], _simple_wasm);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("xterm")).define("xterm", _xterm);
  const child1 = runtime.module(define1).derive(["xterm"], main);
  main.import("Terminal", child1);
  main.import("terminalContainer", child1);
  main.import("xtermCSS", child1);
  main.variable(observer()).define(["terminalContainer"], _7);
  main.variable(observer()).define(["xtermCSS"], _8);
  main.variable(observer("term")).define("term", ["Terminal"], _term);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("wasiShim")).define("wasiShim", _wasiShim);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("XtermStdio")).define("XtermStdio", ["wasiShim"], _XtermStdio);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["XtermStdio","term","wasiShim","WebAssembly","simple_wasm"], _15);
  return main;
}
