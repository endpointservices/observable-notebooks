import define1 from "./b58f224e180d252e@57.js";

function _1(md){return(
md`# Purescript

Importable ObservableHQ notebook to compile purescript code using the \`try.purescript.org\` compiler endpoint.

See https://observablehq.com/@jmatsushita/try-purescript for an code playground which uses this module.

### Usage

\`\`\`
let source = \`module Main where\`
import { Purescript } from '@jmatsushita/purescript'
module = (await Purescript(source)).module
\`\`\`

### API

\`\`\`ts
Purescript(source: string, compilerUrl: string): Promise<{
  module,   // a compiled esm module with exported purescript symbols accessible at \`module.\${symbols}\`
  warnings?, // a array of compiler warnings  
} | {
  errors    // a array of compiler errors
  warnings?, // a array of compiler warnings  
}
>
\`\`\`

See [this section](#cell-735) for advanced use with a local try purescript compiler to work with packages that aren't in the package set.

See [Todo section](#cell-155) for some next steps ideas, and [Internals](#cell-91) for details on how this works. `
)}

function _2(md){return(
md`||
| --- |--- | --- |
||`
)}

function _3(md){return(
md`## Hello World
`
)}

function _hi(){return(
`module Main where

hi :: String
hi = "hello from purescript"`
)}

async function _5(Purescript,hi){return(
(await Purescript(hi)).module.hi
)}

function _6(md){return(
md`||
| --- |--- | --- |
||`
)}

function _7(md){return(
md`## More examples
`
)}

function _source(){return(
`module Main where

import Prelude
import Effect (Effect)
import Effect.Console (logShow)

val :: String
val = "blah"

greet :: String -> String
greet val = "Hello " <> val

render :: String
render = "<ul><li>a list item</li></ul>"

main :: Effect Unit
main = do
  logShow $ "hello from purescript"`
)}

async function _ps(Purescript,source){return(
await Purescript(source)
)}

function _module(ps){return(
ps.module
)}

function _11(md){return(
md`||
| --- |--- | --- |
||`
)}

function _12(md){return(
md`Get a simple value`
)}

function _13(module){return(
module.val
)}

function _14(md){return(
md`||
| --- |--- | --- |
||`
)}

function _15(md){return(
md`Run a function`
)}

function _16(module){return(
module.greet("me")
)}

function _17(md){return(
md`||
| --- |--- | --- |
||`
)}

function _18(md){return(
md`A console effect, check your dev console.`
)}

function _19(module){return(
module.main()
)}

function _20(md){return(
md`||
| --- |--- | --- |
||`
)}

function _21(md){return(
md`An html string`
)}

function _22(module){return(
module.render.toString()
)}

function _23(md){return(
md`||
| --- |--- | --- |
|Rendered as html (using \`unsafe_html\` from https://observablehq.com/@observablehq/htl)|`
)}

function _24(unsafe_html,module){return(
unsafe_html`${module.render}`
)}

function _unsafe_html(){return(
function unsafe_html() {
  const span = document.createElement("span");
  span.innerHTML = String.raw.apply(this, arguments);
  return span;
}
)}

function _26(md){return(
md`||
| --- |--- | --- |
||`
)}

function _27(md){return(
md`### Warnings`
)}

function _warnings(ps){return(
ps.warnings
)}

function _29(md){return(
md`||
| --- |--- | --- |
||`
)}

function _30(md){return(
md`### Errors`
)}

async function _errors(Purescript){return(
(await Purescript(`wat?`)).errors
)}

function _32(md){return(
md`### trypurescript on 127.0.0.1:8080

In case you're missing packages, or need to run on a custom package set, you can buil trypurescript and run it on localhost, following [the instructions here](https://github.com/purescript/trypurescript/tree/master?tab=readme-ov-file#2-local-compile-server-setup) and making sure you also serve the \`output\` path (as per the [nginx.conf](https://github.com/purescript/trypurescript/blob/master/deploy/nginx.conf#L87-L90)). For instance using the [\`http-server\` npm module](https://github.com/http-party/http-server) and making sure you allow cors headers for your observablehq subdomain:
\`\`\`sh
> export $OHQ_USERNAME # your observableHQ username
> (set -o noglob && stack exec trypurescript 8081 $(spago sources))
> yarn dlx http-server staging -P http://127.0.0.1:8081 --cors="Access-Control-Allow-Origin=https://$OHQ_USERNAME.static.observableusercontent.com"
\`\`\`

You can then call the compiler with \`Purescript(source, { compilerUrl: "http://127.0.0.1:8081"} )\` `
)}

async function _33(Purescript,hi){return(
(await Purescript(hi, { compilerUrl: "http://127.0.0.1:8080" })).module.hi
)}

function _simpleSample(){return(
`module Main where

import Prelude
import Effect (Effect)
import Effect.Console (logShow)

val :: String
val = "blah"

greet :: String -> String
greet val = "Hello " <> val
--     ^ shadowing on purpose to show compiler warnings

render :: String
render = "<ul><li>a list item</li></ul>"

main :: Effect Unit
main = do
  logShow $ "hello from purescript"`
)}

async function _35(Purescript,simpleSample){return(
(await Purescript(simpleSample, { compilerUrl: "http://127.0.0.1:8080" })).module.val
)}

async function _36(Purescript){return(
(await Purescript("module Main where\n import Data.Codec.Foreign (_stringify)\n stringify = _stringify", { compilerUrl: "http://127.0.0.1:8080" })).module.stringify(true)
)}

function _37(mdPlus){return(
mdPlus`## Todo

Reach out on the [purescript discord](https://purescript.org/chat) if you have ideas or want to help!

- [x] Improve warnings and errors rendering
- [x] Make this notebook into a nicely importable notebook.
- [ ] How would multiple modules work?`
)}

function _38(md){return(
md`## Internals
`
)}

function _39(md){return(
md`### Call the compile.purescript.org API

Call https://compile.purecript.org/compile and get the compiled javascript back`
)}

function _Purescript(compile){return(
async (source, options = { compilerUrl: "https://compile.purescript.org" }) => {
  const { compilerUrl } = options
  let response = await compile(source, compilerUrl)
  if (response.error && response.error.contents) 
    return { errors: response.error && response.error.contents, warnings: response.warnings }
  // console.log("compilerUrl", compilerUrl);
  let jsPatched = response.js.replaceAll('from "../', `from "${compilerUrl}/output/`)
  // console.log("jsPatched", jsPatched)
  let sourceURL = URL.createObjectURL(new Blob([jsPatched], { type: 'text/javascript' }))
  // console.log(sourceURL)
  let module
  try {
    module = await import(sourceURL)
  } catch (e) {
    console.error(e)
    return { module: e }
  }
  return { module, warnings: response.warnings }
}
)}

function _compile(){return(
(source, compilerUrl) => fetch(`${compilerUrl}/compile`, {
  method: 'POST',
  body: `${source}`
}).then((response) => response.json())
)}

function _42(md){return(
md`### Patch the compiler output

patch the compiler output to point to compiled packages from [available libraries](https://github.com/purescript/trypurescript/blob/master/README.md#which-libraries-are-available)  `
)}

function _44(md){return(
md`### Make a module specifier for the patched compiler output   

The trick is to then use \`URL.createObjectURL\` with the \`text/javascript\` mime type, and pass this to the \`import()\` statement.`
)}

function _46(md){return(
md`### Import the module
`
)}

function _48(md){return(
md`And there we have it. A compiled module that's accessible from the notebook 🎉`
)}

function _49(md){return(
md`### Make warnings and errors readable

Use a bunch of utility functions to render the warnings and errors in an html table (using the built-in \`Inputs.table\` didn't seem to allow multiline cells)`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("hi")).define("hi", _hi);
  main.variable(observer()).define(["Purescript","hi"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("source")).define("source", _source);
  main.variable(observer("ps")).define("ps", ["Purescript","source"], _ps);
  main.variable(observer("module")).define("module", ["ps"], _module);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["module"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["module"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["module"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["module"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["unsafe_html","module"], _24);
  main.variable(observer("unsafe_html")).define("unsafe_html", _unsafe_html);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("warnings")).define("warnings", ["ps"], _warnings);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("errors")).define("errors", ["Purescript"], _errors);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["Purescript","hi"], _33);
  main.variable(observer("simpleSample")).define("simpleSample", _simpleSample);
  main.variable(observer()).define(["Purescript","simpleSample"], _35);
  main.variable(observer()).define(["Purescript"], _36);
  main.variable(observer()).define(["mdPlus"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("Purescript")).define("Purescript", ["compile"], _Purescript);
  main.variable(observer("compile")).define("compile", _compile);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  const child1 = runtime.module(define1);
  main.import("mdPlus", child1);
  return main;
}
