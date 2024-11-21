function _1(md){return(
md`# Min-Example`
)}

function _2(md){return(
md`
I want to use <a href="https://highlightjs.org/">hljs</a> on my notebooks, and I have a customized hljs mode file to load... <br>
so I first import hljs 
`
)}

function _hljs(require){return(
require("https://bundle.run/highlight.js@10.5.0")
)}

function _install_riscript(hljs)
{
  hljs.registerLanguage(
    "riscript",
    (() => {
      "use strict";
      return s => ({
        name: "RiScript",
        aliases: ["risc", "riscript"],
        case_insensistive: !1,
        disableAutodetect: !0,
        keywords: "",
        contains: [
          { className: "rs-assign", match: /[\$]{1,2}[\w]+[\s]*\=/ },
          {
            className: "rs-transform",
            match: /\.[\w]+[\(]?[\)]?/
          },
          { className: "rs-dynamic", match: /\$\$[\w]+/ },
          { className: "rs-symbol", match: /\$[\w]+/ },
          {
            className: "rs-entity",
            match: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
          },
          {
            className: "rs-conditional",
            match: /\{(\$[\w]+([\!\*\^\$<>]\=|[\=<>])([\w]+|[0-9]?\.[0-9]+)\,)?(\$[\w]+([\!\*\^\$<>]\=|[\=<>])([\w]+|[0-9]?\.[0-9]+))\}\?/
          },
          {
            className: "rs-choice",
            begin: /\(/,
            end: /\)/,
            illegal: "\n",
            contains: [
              {
                className: "rs-weight",
                match: /\[[0-9]+\]/
              }
            ]
          },
          { className: "rs-continuation", match: /[\w]+[\s]*\\$/ },
          s.C_BLOCK_COMMENT_MODE,
          s.C_LINE_COMMENT_MODE
        ]
      });
    })()
  );
}


function _5(install_riscript,html,hljs)
{
  install_riscript; // Make sure it is run before executing this block
  const code = html`
<div style="width: 290px;">
<pre><code class="riscript">  $$mammal=(dog | child | ox)
  My $mammal is often unruly.
</code></pre>
`;
  hljs.highlightBlock(code.children[0].children[0]);
  return code;
}


function _6(html){return(
html`<link type="text/css" href="https://static.observableusercontent.com/files/3fd3ece7a6c07e36c3bcfefd4e910d561ac86fb6237e15030b4d0f6cb4232914e7bcb7988945f3c5e1a2c4eb687be257f8d248164ef3ebb082166d48797e6af0" rel="stylesheet"/>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("hljs")).define("hljs", ["require"], _hljs);
  main.variable(observer("install_riscript")).define("install_riscript", ["hljs"], _install_riscript);
  main.variable(observer()).define(["install_riscript","html","hljs"], _5);
  main.variable(observer()).define(["html"], _6);
  return main;
}
