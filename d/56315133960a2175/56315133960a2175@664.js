import define1 from "./27fa2d071aec962f@261.js";
import define2 from "./e1e1342567637708@810.js";
import define3 from "./ef672b935bd480fc@623.js";
import define4 from "./f92778131fd76559@1208.js";
import define5 from "./56b204c6d7cdb801@32.js";

function _1(md){return(
md`# Observable-on-observable


Can we write an [Observable Runtime](https://github.com/observablehq/runtime) toolchain within a notebook?`
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
md`# Traditional Embedding

If we have a reference to a compiled module, we can run it on the Observable Runtime`
)}

function _source(Inputs){return(
Inputs.text({
  label: "source",
  width: 500,
  value: "https://api.observablehq.com/@tomlarkworthy/svg-boinger.js?v=4"
})
)}

function _rt(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

async function _define(source){return(
(await import(source)).default
)}

function _7(htl){return(
htl.html`<div id="notebook"></div>`
)}

function _loaded_module(rt,define){return(
new rt.Runtime().module(define, rt.Inspector.into("#notebook"))
)}

function _9(md){return(
md`# Building an Observable Module`
)}

function _10(md){return(
md`## Parsing Source code`
)}

function _parser(){return(
import("https://unpkg.com/@observablehq/parser?module")
)}

function _parser_4_2(){return(
import("https://unpkg.com/@observablehq/parser@4.2?module")
)}

function _13(md){return(
md`### parsing a cell`
)}

function _constent_cell(parser){return(
parser.parseCell(`x = 32`)
)}

function _15(md){return(
md`### parsing a templates

⚠️ can't get to work yet⚠️ Needed for markdown cells etc.`
)}

function _16(parser)
{
  const p = new parser.TemplateCellParser();
  return p.parseCell("dsds");
}


function _17(md){return(
md`## Compiling

The [unofficial compiler provides](https://github.com/asg017/unofficial-observablehq-compiler) a way to go from source code to runtime variables`
)}

function _unofficial_compiler(){return(
import(
  "https://cdn.skypack.dev/@alex.garcia/unofficial-observablehq-compiler@0.6.0-alpha.9?min"
)
)}

function _interpreter(unofficial_compiler){return(
new unofficial_compiler.Interpreter()
)}

function _m(rt){return(
new rt.Runtime().module()
)}

function _21(md){return(
md`### compiler output`
)}

function _notebook_2(htl){return(
htl.html`<div id="notebook2"></div>`
)}

function _compiled_variables(notebook_2,interpreter,m,rt){return(
notebook_2 &&
  interpreter.cell(`x = { return 32}`, m, rt.Inspector.into("#notebook2"))
)}

function _24(md){return(
md`# Obtaining notebook source`
)}

function _25(md){return(
md`## Decompiling

Robocoop provides a method from going from variables to source code. However, it only works for module loaded methods, not those compiled through the unofficial compiler (but we have the source for those anyway)

- ⚠️ does not get the variable name
- ⚠️ probably does not work with generators
- ⚠️ not designed for this but it at least suggests its possible⚠️`
)}

function _compiled_definition(compiled_variables){return(
compiled_variables[0]._definition.toString()
)}

function _loaded_definition(loaded_module)
{
  return [...loaded_module._runtime._variables]
    .find((d) => d._name == "boinger")
    ._definition.toString();
}


function _29(observableDefinitionToCode,loaded_definition){return(
observableDefinitionToCode(loaded_definition)
)}

function _30(md){return(
md`## Fetching notebook source from the documents API

\`\`\`
curl https://api.observablehq.com/document/@jrus/halton | jq .

you get something resembling source code in the nodes field. However, the API requires a CORS proxy to fetch in user space
\`\`\``
)}

async function _api_document(fetchp){return(
(
  await fetchp(
    `https://api.observablehq.com/document/@tomlarkworthy/svg-boinger`
  )
).json()
)}

function _cached_document(FileAttachment){return(
FileAttachment("api_document.json").json()
)}

function _33(md){return(
md`### Compiling fetched document source`
)}

function _34(cached_document){return(
cached_document.nodes
)}

function _m2(rt){return(
new rt.Runtime().module()
)}

function _36(md){return(
md`### Displaying, it works!`
)}

function _cells_dom(cached_document,html,md){return(
md`<div>
  ${cached_document.nodes.map(node => html`<div id="cell-${node.id}">`)}
</div>`
)}

function _38(cells_dom,cached_document,interpreter,m,rt){return(
cells_dom &&
  cached_document.nodes.map((node) =>
    interpreter.cell(node.value, m, rt.Inspector.into(`#cell-${node.id}`))
  )
)}

function _39(md){return(
md`# Javascript Source Editor (single cell)

Some glitching with empty cells`
)}

async function _cm_js(esmImport){return(
await esmImport(`@codemirror/lang-javascript`)
)}

function _cell_source(CodeMirror,javascriptPlugin,codemirror,myDefaultTheme){return(
CodeMirror("6 + 5", {
  extensions: [
    javascriptPlugin.javascript(),
    codemirror.basicSetup,
    myDefaultTheme
  ]
})
)}

function _source_module(rt){return(
new rt.Runtime().module()
)}

function _44(md){return(
md`### source`
)}

function _45(cell_source){return(
cell_source
)}

function _46(source_module,htl){return(
htl.html`${source_module && ""}
<h3> execution</h2>
<div id="source_cell_div">`
)}

function _47(interpreter,cell_source,source_module,rt)
{
  if (this) {
    this[0].delete();
    document.getElementById("source_cell_div").innerHTML = "";
  }
  return interpreter.cell(
    cell_source,
    source_module,
    rt.Inspector.into(`#source_cell_div`)
  );
}


function _48(md){return(
md`# Javascript Source Editor multi cell
`
)}

function _module_multi(rt){return(
new rt.Runtime().module()
)}

function _50(md){return(
md`we will declare a view to hold our source, initialized to what we had before`
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

function _52(notebook){return(
notebook
)}

function _53(md){return(
md`By using the view template we now have an array of subviews holding the sourc. Next we create an identical number of output HTML views`
)}

function _outputs(view,$0,domView){return(
view`${[
  "outputs",
  $0.value.source.map((i) => domView({ className: "cell" }))
]}`
)}

function _55(outputs){return(
outputs
)}

function _56(md){return(
md`Finally we bind the source to the output with a oneWayBind that transforms using the compiler`
)}

function _quarto(require){return(
require("@quarto/external-alex-garcia-unofficial-observablehq-compiler")
)}

function _interpret(quarto,module_multi,observer_multi){return(
new quarto.Interpreter({
  module: module_multi,
  observer: observer_multi
})
)}

function _59($0){return(
$0.source[0].value
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


function _61(md){return(
md`### source`
)}

function _62(cell_source){return(
cell_source
)}

function _63(module_multi,htl){return(
htl.html`${module_multi && ""}
<h3> execution</h2>
<div id="source_multi_notebook">`
)}

function _64(){return(
document.getElementById("source_multi_notebook")
)}

function _observer_multi(rt){return(
rt.Inspector.into(
  document.getElementById("source_multi_notebook")
)
)}

function _parsed_cell_multi(parser_4_2,cell_multi){return(
parser_4_2.parseCell(cell_multi)
)}

function _67(parsed_cell_multi,cell_multi,interpret)
{
  parsed_cell_multi.input = cell_multi;
  return interpret.cell(parsed_cell_multi);
}


function _68(md){return(
md`---`
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
  main.variable(observer("viewof source")).define("viewof source", ["Inputs"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("rt")).define("rt", _rt);
  main.variable(observer("define")).define("define", ["source"], _define);
  main.variable(observer()).define(["htl"], _7);
  main.variable(observer("loaded_module")).define("loaded_module", ["rt","define"], _loaded_module);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("parser")).define("parser", _parser);
  main.variable(observer("parser_4_2")).define("parser_4_2", _parser_4_2);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("constent_cell")).define("constent_cell", ["parser"], _constent_cell);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["parser"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("unofficial_compiler")).define("unofficial_compiler", _unofficial_compiler);
  main.variable(observer("interpreter")).define("interpreter", ["unofficial_compiler"], _interpreter);
  main.variable(observer("m")).define("m", ["rt"], _m);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("notebook_2")).define("notebook_2", ["htl"], _notebook_2);
  main.variable(observer("compiled_variables")).define("compiled_variables", ["notebook_2","interpreter","m","rt"], _compiled_variables);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  const child1 = runtime.module(define1);
  main.import("observableDefinitionToCode", child1);
  main.variable(observer("compiled_definition")).define("compiled_definition", ["compiled_variables"], _compiled_definition);
  main.variable(observer("loaded_definition")).define("loaded_definition", ["loaded_module"], _loaded_definition);
  main.variable(observer()).define(["observableDefinitionToCode","loaded_definition"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("api_document")).define("api_document", ["fetchp"], _api_document);
  main.variable(observer("cached_document")).define("cached_document", ["FileAttachment"], _cached_document);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["cached_document"], _34);
  main.variable(observer("m2")).define("m2", ["rt"], _m2);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("cells_dom")).define("cells_dom", ["cached_document","html","md"], _cells_dom);
  main.variable(observer()).define(["cells_dom","cached_document","interpreter","m","rt"], _38);
  main.variable(observer()).define(["md"], _39);
  const child2 = runtime.module(define2);
  main.import("CodeMirror", child2);
  main.import("esmImport", child2);
  main.import("javascriptPlugin", child2);
  main.import("myDefaultTheme", child2);
  main.import("codemirror", child2);
  main.variable(observer("cm_js")).define("cm_js", ["esmImport"], _cm_js);
  main.variable(observer("viewof cell_source")).define("viewof cell_source", ["CodeMirror","javascriptPlugin","codemirror","myDefaultTheme"], _cell_source);
  main.variable(observer("cell_source")).define("cell_source", ["Generators", "viewof cell_source"], (G, _) => G.input(_));
  main.variable(observer("source_module")).define("source_module", ["rt"], _source_module);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["cell_source"], _45);
  main.variable(observer()).define(["source_module","htl"], _46);
  main.variable(observer()).define(["interpreter","cell_source","source_module","rt"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("module_multi")).define("module_multi", ["rt"], _module_multi);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("viewof notebook")).define("viewof notebook", ["view","cached_document","CodeMirror","javascriptPlugin","codemirror","myDefaultTheme"], _notebook);
  main.variable(observer("notebook")).define("notebook", ["Generators", "viewof notebook"], (G, _) => G.input(_));
  main.variable(observer()).define(["notebook"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viewof outputs")).define("viewof outputs", ["view","viewof notebook","domView"], _outputs);
  main.variable(observer("outputs")).define("outputs", ["Generators", "viewof outputs"], (G, _) => G.input(_));
  main.variable(observer()).define(["outputs"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("quarto")).define("quarto", ["require"], _quarto);
  main.variable(observer("interpret")).define("interpret", ["quarto","module_multi","observer_multi"], _interpret);
  main.variable(observer()).define(["viewof notebook"], _59);
  main.variable(observer("compile")).define("compile", ["viewof notebook","rt","viewof outputs","interpret","module_multi","invalidation"], _compile);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer()).define(["cell_source"], _62);
  main.variable(observer()).define(["module_multi","htl"], _63);
  main.variable(observer()).define(_64);
  main.variable(observer("observer_multi")).define("observer_multi", ["rt"], _observer_multi);
  main.variable(observer("parsed_cell_multi")).define("parsed_cell_multi", ["parser_4_2","cell_multi"], _parsed_cell_multi);
  main.variable(observer()).define(["parsed_cell_multi","cell_multi","interpret"], _67);
  main.variable(observer()).define(["md"], _68);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  main.import("bindOneWay", child4);
  const child5 = runtime.module(define5);
  main.import("domView", child5);
  return main;
}
