import define1 from "./e1e1342567637708@779.js";
import define2 from "./ef672b935bd480fc@623.js";
import define3 from "./f92778131fd76559@1176.js";
import define4 from "./56b204c6d7cdb801@31.js";
import define5 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Userspace notebook editor


Can we write an [Observable Runtime](https://github.com/observablehq/runtime) toolchain within a notebook? (previous [notes](https://observablehq.com/d/56315133960a2175))`
)}

function _2(md){return(
md`links
https://observablehq.com/@kotelnikov/observablehq-notebooks-building-and-compiling
https://observablehq.com/@gordonsmith/observablehq-compiler
https://observablehq.com/@asg017/an-unofficial-observablehq-compiler
https://observablehq.com/@asg017/v0-6-0-of-the-unofficial-observablehq-compiler
https://observablehq.com/d/63585ffc01d6a1af

`
)}

function _3(md){return(
md`## Observable Runtime and Inspector`
)}

function _rt(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

function _5(md){return(
md`## Compiling

The [unofficial compiler provides](https://github.com/asg017/unofficial-observablehq-compiler) a way to go from source code to runtime variables. There is a [Quarto fork](https://github.com/quarto-dev/external-asg017-unofficial-observablehq-compiler/) with some bug fixes`
)}

function _quarto(require){return(
require("@quarto/external-alex-garcia-unofficial-observablehq-compiler")
)}

function _7(md){return(
md`## Obtaining Notebook Source from Observable documents API

The [SVG boinger](https://observablehq.com/@tomlarkworthy/svg-boinger) is just a random notebook I made in 2021
\`\`\`
curl https://api.observablehq.com/document/@tomlarkworthy/svg-boinger
\`\`\`

Document endpoint not support CORS so I just pasted the results here:`
)}

function _cached_document(FileAttachment){return(
FileAttachment("api_document.json").json()
)}

function _9(md){return(
md`## Source editor (CodeMirror)`
)}

async function _cm_js(esmImport){return(
await esmImport(`@codemirror/lang-javascript`)
)}

function _12(md){return(
md`## Userspace Notebook Editor
`
)}

function _module_multi(rt){return(
new rt.Runtime().module()
)}

function _14(md){return(
md`we will declare a view to hold our source, initialised to the SVG Boinger source to test`
)}

function _notebook(view,cached_document,CodeMirror,javascriptPlugin,codemirror,myDefaultTheme){return(
view`${[
  "source",
  cached_document.nodes /*.slice(0, 2)*/
    .map((i) =>
      CodeMirror(i.value, {
        extensions: [
          javascriptPlugin.javascript(),
          codemirror.basicSetup,
          myDefaultTheme
        ]
      })
    )
]}`
)}

function _16(notebook){return(
notebook
)}

function _17(md){return(
md`## Userspace Notebook Viewer`
)}

function _outputs(view,$0,domView){return(
view`${[
  "outputs",
  $0.value.source.map((i) => domView({ className: "cell" }))
]}`
)}

function _19(outputs){return(
outputs
)}

function _20(md){return(
md`## Linking source to the notebook view`
)}

function _21(md){return(
md`Finally we bind the source to the output with a oneWayBind that transforms using the compiler`
)}

function _interpret(quarto,module_multi){return(
new quarto.Interpreter({
  module: module_multi
})
)}

function _compile($0,rt,$1,interpret,module_multi,invalidation)
{
  $0.source.value.forEach((src, i) => {
    let variables = [];
    const inspector = rt.Inspector.into($1.outputs[i]);
    const onInput = async (_) => {
      const src = $0.source[i].value;
      variables.forEach((v) => {
        v.delete();
      });
      $1.outputs[i].value = null;
      variables = await interpret.cell(src, module_multi, inspector);
    };
    $0.source[i].addEventListener("input", onInput);
    onInput();

    invalidation.then(() =>
      $0.source[i].removeEventListener("input", onInput)
    );
  });
}


function _24(md){return(
md`---`
)}

function _29(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["api_document.json", {url: new URL("./files/351846058b764e35df64e79e1d9a38cfd20b8f167425bd3322e0906b9c95ccdf3d12a216fb30bbacbcdf8000ab5910071e80a2529a101f854cbf91a328d98e66.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("rt")).define("rt", _rt);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("quarto")).define("quarto", ["require"], _quarto);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("cached_document")).define("cached_document", ["FileAttachment"], _cached_document);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("CodeMirror", child1);
  main.import("esmImport", child1);
  main.import("javascriptPlugin", child1);
  main.import("myDefaultTheme", child1);
  main.import("codemirror", child1);
  main.variable(observer("cm_js")).define("cm_js", ["esmImport"], _cm_js);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("module_multi")).define("module_multi", ["rt"], _module_multi);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof notebook")).define("viewof notebook", ["view","cached_document","CodeMirror","javascriptPlugin","codemirror","myDefaultTheme"], _notebook);
  main.variable(observer("notebook")).define("notebook", ["Generators", "viewof notebook"], (G, _) => G.input(_));
  main.variable(observer()).define(["notebook"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof outputs")).define("viewof outputs", ["view","viewof notebook","domView"], _outputs);
  main.variable(observer("outputs")).define("outputs", ["Generators", "viewof outputs"], (G, _) => G.input(_));
  main.variable(observer()).define(["outputs"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("interpret")).define("interpret", ["quarto","module_multi"], _interpret);
  main.variable(observer("compile")).define("compile", ["viewof notebook","rt","viewof outputs","interpret","module_multi","invalidation"], _compile);
  main.variable(observer()).define(["md"], _24);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  const child3 = runtime.module(define3);
  main.import("view", child3);
  main.import("bindOneWay", child3);
  const child4 = runtime.module(define4);
  main.import("domView", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _29);
  return main;
}
