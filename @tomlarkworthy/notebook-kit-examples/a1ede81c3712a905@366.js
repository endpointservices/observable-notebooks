import define1 from "./e9c03d81ed565cce@110.js";
import define2 from "./893cd17fd1ceac98@21.js";
import define3 from "./ef672b935bd480fc@623.js";

function _intro(md){return(
md`# Browser build for [Notebook Kit](https://github.com/observablehq/notebook-kit)

These are my recent notes on bringing some of Notebook Kit's functionality to the browser.

A big component of NotebookKit is the Vite plugin. However, it uses everything which bloats the bundle quite a lot (10Mb), with functionality that is impossible to do in the browse (Database connectors, serverside execution) so I have opted to export the lower level utilities instead resulting in a bundle size of only 170kb, where 110kb is the acorn parser. (I would like to make the acorn parser a peer dependancy but it was a little complicated)`
)}

function _3(md){return(
md`### From jsDelivr

There is a are 1st party browser bundles. 


The transpiler brings in typescript at 1.3Mb (and acorn) so this is quite heavy`
)}

function _transpilerKit(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/notebook-kit/+esm"
)
)}

function _5(md){return(
md`The runtime is quite light (<20kb)`
)}

function _runtimeKit(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/notebook-kit/runtime/+esm"
)
)}

function _7(md){return(
md`## Serde`
)}

function _source(Inputs){return(
Inputs.textarea({
  rows: 10,
  value: `<notebook>
    <title>Demo</title>
    <script type="module">
    const a = 1;
    </script>
    <script type="module">
    // A simple cell that displays a value
    display(a);
    </script>
</notebook>
    `
})
)}

function _notebook(kit,source){return(
kit.deserialize(source)
)}

function _rendered(kit,notebook){return(
kit.serialize(notebook)
)}

function _11(md){return(
md`## Transpilers`
)}

function _js_cell(kit){return(
kit.transpileJavaScript(`{
  let a = 3
}`)
)}

function _ojs_cell(kit){return(
kit.transpileObservable(`a = 4`)
)}

function _14(md){return(
md`plus more (e.g. templates)`
)}

function _15(md){return(
md`## define

\`\`\`js
export function define(main: Module, state: DefineState, definition: Definition, observer = observe)
\`\`\`

Transpiration uses strings for the body. Before calling \`define\` they need to be converted to live functions. In the Vite plugin this is done by synthecising a \`<script>\` tag, but here we do it with an \`eval\`. `
)}

function _runtime(Runtime){return(
new Runtime(() => ({}))
)}

function _18(runtime){return(
runtime._variables
)}

function _main(runtime){return(
runtime.module()
)}

function _state(){return(
{
  variables: []
}
)}

function _definition(){return(
(source) => {
  let fn;
  eval("fn = " + source);
  return fn;
}
)}

function _load(kit,main,state,ojs_cell,definition){return(
kit.define(main, state, {
  ...ojs_cell,
  body: definition(ojs_cell.body)
})
)}

async function _loaded_variable(load,state)
{
  load;
  await new Promise((r) => setTimeout(r, 100));
  return state.variables[0];
}


function _24(loaded_variable){return(
loaded_variable._promise
)}

function _25(md){return(
md`## Display

\`\`\`js
export type DisplayState = {
  /** the HTML element in which to render this cell’s display */
  root: HTMLDivElement;
  /** whether to clear on fulfilled */
  autoclear?: boolean;
  /** for inspected values, any expanded paths; see getExpanded */
  expanded: (number[][] | undefined)[];
};

export function display(state: DisplayState, value: unknown): void {
  const {root, expanded} = state;
  const node = isDisplayable(value, root) ? value : inspect(value, expanded[root.childNodes.length]); // prettier-ignore
  displayNode(state, node);
}
\`\`\``
)}

function _element(htl){return(
htl.html`<div>`
)}

function _27(kit,element){return(
kit.display(
  {
    root: element,
    expanded: []
  },
  [1, 2, 3]
)
)}

function _28(md){return(
md`## Observe

Observe creates a variable listener to display's to a DOM node
`
)}

function _module2(runtime){return(
runtime.module()
)}

function _ticker_cell(kit){return(
kit.transpileObservable(`b = {let i = 0; while(true) yield i++}`)
)}

function _observer(kit,node,ticker_cell){return(
kit.observe(
  // sets up an observer but it is unbound to a variable, you need define to do that
  {
    root: node,
    expanded: []
  },
  {
    ...ticker_cell
  }
)
)}

function _32(md){return(
md`## Define uses Observe under the hood

So notebook kit's \`define\` also sets up DOM syncronization.`
)}

function _node(htl){return(
htl.html`<div>`
)}

function _34(kit,module2,node,ticker_cell,definition){return(
kit.define(
  module2,
  {
    root: node,
    expanded: [],
    variables: []
  },
  {
    ...ticker_cell,
    body: definition(ticker_cell.body)
  },
  kit.observe
)
)}

function _35(md){return(
md`## module resolution`
)}

function _36(kit){return(
kit.resolveImport("npm:htl")
)}

function _37(md){return(
md`## Converting Notebook 1.0 to Notebook 2.0 files

Notebook kit has a converter for 2.0 to 1.0 but it won't run in the browser (CORS)`
)}

function _38(md){return(
md`it can be done from command line`
)}

function _39(md){return(
md`\`\`\`shell
npx @observablehq/notebook-kit download @tomlarkworthy/notebook-kit-examples
\`\`\``
)}

function _40(md){return(
md`or we can work around with \`fetchp\`, the CORS proxy`
)}

function _url(Inputs){return(
Inputs.text({
  label: "url",
  width: "600px",
  submit: true,
  minlength: 1,
  placeholder: "@tomlarkworthy/notebook-kit-examples"
})
)}

async function _notebook1(fetchp,url){return(
(
  await fetchp(`https://api.observablehq.com/document/${url}`)
).json()
)}

function _44(Inputs,convert,notebook1){return(
Inputs.textarea({
  rows: 20,
  disabled: true,
  value: convert(notebook1)
})
)}

function _convert(kit){return(
({ title, nodes }) => {
  for (const node of nodes) if (node.mode === "js") node.mode = "ojs";
  return kit.serialize(kit.toNotebook({ title, cells: nodes }), {
    document: window.document
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("intro")).define("intro", ["md"], _intro);
  const child1 = runtime.module(define1);
  main.import("kit", child1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("transpilerKit")).define("transpilerKit", _transpilerKit);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("runtimeKit")).define("runtimeKit", _runtimeKit);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("notebook")).define("notebook", ["kit","source"], _notebook);
  main.variable(observer("rendered")).define("rendered", ["kit","notebook"], _rendered);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("js_cell")).define("js_cell", ["kit"], _js_cell);
  main.variable(observer("ojs_cell")).define("ojs_cell", ["kit"], _ojs_cell);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  const child2 = runtime.module(define2);
  main.import("Runtime", child2);
  main.import("Inspector", child2);
  main.import("Library", child2);
  main.import("RuntimeError", child2);
  main.variable(observer("runtime")).define("runtime", ["Runtime"], _runtime);
  main.variable(observer()).define(["runtime"], _18);
  main.variable(observer("main")).define("main", ["runtime"], _main);
  main.variable(observer("state")).define("state", _state);
  main.variable(observer("definition")).define("definition", _definition);
  main.variable(observer("load")).define("load", ["kit","main","state","ojs_cell","definition"], _load);
  main.variable(observer("loaded_variable")).define("loaded_variable", ["load","state"], _loaded_variable);
  main.variable(observer()).define(["loaded_variable"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("element")).define("element", ["htl"], _element);
  main.variable(observer()).define(["kit","element"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("module2")).define("module2", ["runtime"], _module2);
  main.variable(observer("ticker_cell")).define("ticker_cell", ["kit"], _ticker_cell);
  main.variable(observer("observer")).define("observer", ["kit","node","ticker_cell"], _observer);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("node")).define("node", ["htl"], _node);
  main.variable(observer()).define(["kit","module2","node","ticker_cell","definition"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["kit"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  main.variable(observer("viewof url")).define("viewof url", ["Inputs"], _url);
  main.variable(observer("url")).define("url", ["Generators", "viewof url"], (G, _) => G.input(_));
  main.variable(observer("notebook1")).define("notebook1", ["fetchp","url"], _notebook1);
  main.variable(observer()).define(["Inputs","convert","notebook1"], _44);
  main.variable(observer("convert")).define("convert", ["kit"], _convert);
  return main;
}
