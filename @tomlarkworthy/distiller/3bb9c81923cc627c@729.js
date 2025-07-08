import define1 from "./f92778131fd76559@1208.js";
import define2 from "./653c46ed55693b1f@683.js";
import define3 from "./6eda90668ae03044@836.js";
import define4 from "./509d6b5d1aebf2a1@236.js";
import define5 from "./048a17a165be198d@271.js";
import define6 from "./293899bef371e135@280.js";

function _1(md){return(
md`# Notebook distiller v2

<figure><img src='https://i.imgur.com/VAsGp5S.gif' /></figure>

This notebook is a tool that allows you to output some _subset_ of Observable notebooks as _pure ES6 modules_. That means no runtime, with natural-looking JavaScript code, ready to become NPM modules.

- Emphasis on _pure_: this is really meant for notebooks like [parse-gedcom](/@tmcw/parse-gedcom), that are written with the intent of serving as fodder for NPM distribution.

This fork adds a webserver so you can access distilled code from outside Observable (e.g. as part of a publish to NPM CI pipeline) and adds a few debugging features.
`
)}

function _2(md){return(
md`### Open Issues

If you encouter a bug not on this list please send a comment via the burger menu on the left!

- Cannot handle imports (but theoretically possible)
- Cannot handle standard library calls (might be possible)`
)}

function _3(md){return(
md`### Change log
- 2022-04-08 Tom Larkworthy, added support for 'require'
- 2021-12-22, Tom Larkworthy, acorn parser set to EMCA 12, syntax errors now print source hints. Added link to bundle.js.
- 2018-11-15, Tom MacWright, created the notebook distiller. `
)}

function _config(view,Inputs,localStorageView,dynamicSelect){return(
view`<div>
${[
  "notebookName",
  Inputs.bind(
    Inputs.text({
      minlength: 1,
      width: "50%",
      placeholder: "@tomlarkworthy/redis",
      label: "Notebook path"
    }),
    localStorageView("@tomlarkworthy/distiller/notebook")
  )
]}
${[
  "entryPoint",
  dynamicSelect([], {
    label: "Entry point"
  })
]}
${["promisify", Inputs.toggle({ label: "promisify" })]}
`
)}

function _5(config){return(
config
)}

function _6(code,host,config,htl){return(
htl.html`${(code, '')}
<a href="${host.href}?notebook=${config.notebookName}&entryPoint=${config.entryPoint.result}${config.promisify ? '&promisify=true':''}">bundle.js</a>`
)}

function _renderedCode(md,code){return(
md`\`\`\`js
${code}
\`\`\``
)}

function _code(Inputs){return(
Inputs.input(undefined)
)}

function _generate(astring,program,$0,Event)
{
  const code = astring.generate(program);
  $0.value = code;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}


function _body(config,getNotebook,invalidation){return(
config.notebookName ? getNotebook(config.notebookName) : invalidation
)}

function _program(exports,emitExpressions,entry){return(
{
  type: "Program",
  body: exports.flatMap((exp) => emitExpressions(exp, exp === entry))
}
)}

function _cells(body,getProperty)
{
  if (body.length !== 3) throw new Error("no support for imports yet");
  const cells = 
    body[0].declarations[0].init.properties[1].value.elements;
  const cellMap = new Map();
  for (let cell of cells) {
    const name = getProperty(cell, "name");
    if (name) {
      cellMap.set(name.value.value, cell);
    }
  }
  return cellMap;
}


function _syncEntryPoints(cells,$0,Event)
{
  const options = [...cells.keys()];
  if (
    JSON.stringify(options) !==
    JSON.stringify($0.value.entryPoint.options)
  ) {
    $0.value.entryPoint.options = [...cells.keys()];
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
}


function _entry(cells,config)
{
  let entry = cells.get(config.entryPoint.result);
  if (!entry) throw new Error("Entry not found");
  return entry;
}


function _15(cells){return(
cells
)}

function _parse(acorn){return(
(src) =>
  acorn.parse(src, {
    ecmaVersion: 12,
    sourceType: "module"
  }).body
)}

function _stdlib(){return(
{
  // https://github.com/observablehq/stdlib/blob/main/src/library.js#L23
  require: {
    type: "source",
    value: `import {require as requireDefault_hCx5YD, requireFrom as requireFrom_hCx5YD} from 'https://cdn.skypack.dev/d3-require';
const require = (resolve) => resolve == null ? requireDefault_hCx5YD : requireFrom_hCx5YD(resolve);
`
  }
}
)}

function _exports(getInputs,cells,stdlib,entry)
{
  let exported = new Set();
  let exports = [];

  // A depth-first search that aims to order
  // cells in dependency (topological) order, so that they
  // always have their dependencies defined before them.
  function crawlTree(cell) {
    if (exported.has(cell)) return;
    getInputs(cell).forEach((input) => {
      const cell = cells.get(input);
      if (cell === undefined && stdlib[input]) {
        if (exported.add(input + "_Bucw6S")) exports.push(stdlib[input]);
      } else if (cell === undefined) {
        throw Error(
          `Cannot find cell for input '${input}' with entry ${
            entry.start + ":" + entry.end
          }`
        );
      } else {
        crawlTree(cell);
      }
    });
    if (exported.add(cell)) exports.push(cell);
  }

  crawlTree(entry);

  return exports;
}


function _emitExpressions(parse,getName,getValue){return(
function emitExpressions(cell, isEntry) {
  if (cell.type === "source") {
    return parse(cell.value);
  }
  const decl = {
    type: "VariableDeclaration",
    kind: "const",
    declarations: [
      {
        type: "VariableDeclarator",
        id: {
          type: "Identifier",
          name: getName(cell)
        },
        init: getValue(cell)
      }
    ]
  };
  if (isEntry) {
    return [
      {
        type: "ExportNamedDeclaration",
        declaration: decl
      }
    ];
  }
  return [decl];
}
)}

function _getValue(config,getPromiseValue,getConstantValue){return(
config.promisify ? getPromiseValue : getConstantValue
)}

function _getName(getProperty){return(
function getName(cell) {
  return getProperty(cell, "name").value.value;
}
)}

function _getConstantValue(getProperty){return(
function getConstantValue(cell) {
  const value = getProperty(cell, "value").value;
  if (value.body.type === "BlockStatement"
      && value.body.body.length === 1
      && value.body.body[0].type === "ReturnStatement") {
    return value.body.body[0].argument;
  }
  return {
    type: "CallExpression",
    callee: {
      ...value,
      params: []
    }
  };
}
)}

function _getPromiseValue(getProperty,getInputs){return(
function getPromiseValue(cell) {
  const value = getProperty(cell, "value").value;
  const inputs = getInputs(cell).map(name => ({type: "Identifier", name}));
  return {
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: inputs.length === 0
      ? {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "Promise"
            },
            property: {
              type: "Identifier",
              name: "resolve"
            }
          },
          arguments: []
        } 
      : inputs.length === 1 ? inputs[0]
      : {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "Promise"
            },
            property: {
              type: "Identifier",
              name: "all"
            }
          },
          arguments: [
            {
              type: "ArrayExpression",
              elements: inputs
            }
          ]
        },
      property: {
        type: "Identifier",
        name: "then"
      }
    },
    arguments: [
      {
        ...value,
        params: inputs.length > 1 
            ? [{type: "ArrayPattern", elements: value.params}] 
            : value.params
      }
    ]
  };
}
)}

function _getInputs(getProperty){return(
function getInputs(cell) {
  const inputs = getProperty(cell, "inputs");
  if (!inputs) return [];
  return inputs.value.elements.map((e) => e.value);
}
)}

async function _25(){return(
(
  await (
    await fetch(`https://api.observablehq.com/@tomlarkworthy/distiller.js`)
  ).text()
).substring(0, 1000)
)}

function _getNotebook(parse){return(
async function getNotebook(name) {
  const src = await (
    await fetch(`https://api.observablehq.com/${name}.js`)
  ).text();
  try {
    return parse(src);
  } catch (err) {
    if (err instanceof SyntaxError) {
      const message =
        err.message +
        "\n" +
        src.split("\n")[err.loc.line - 1] +
        "\n" +
        Array.from({ length: err.loc.column - 1 })
          .fill(" ")
          .join("") +
        "^";

      throw new Error(message);
    }
    throw err;
  }
}
)}

function _getProperty(){return(
(cell, name) => {
  if (cell === undefined)
    throw new Error("Cannot getProperty for undefined cell");
  return cell.properties.find((p) => p.key.name === name);
}
)}

function _host(endpoint,$0,Event,$1){return(
endpoint("default", async (req, res) => {
  const notebook = req.query.notebook;
  if (!notebook)
    return res.status(400).send("Please set notebook in URL params");
  const entryPoint = req.query.entryPoint;
  if (!entryPoint)
    return res.status(400).send("Please set entryPoint in URL params");
  const promisify = req.query.promisify || false;

  $0.value.notebookName = notebook;
  $0.value.entryPoint.options = [entryPoint];
  $0.value.entryPoint.result = entryPoint;
  $0.value.promisify = promisify;
  $0.dispatchEvent(new Event("input", { bubbles: true }));

  // Listen for code generation and send response
  $1.addEventListener("input", () => {
    res.header("content-type", "text/javascript"), res.send($1.value);
  });
})
)}

function _acorn(require){return(
require("acorn")
)}

function _astring(){return(
import("https://unpkg.com/astring?module")
)}

function _dynamicSelect(juice,Inputs){return(
juice(Inputs.select, {
  label: "[1].label",
  options: "[0]", // "options" is first arg (index 0) of Inputs.select
  result: "[1].value" // "result" can be set in the options.value, options being the 2nd arg (index 0)
})
)}

function _36(renderedCode,installCopyCode,invalidation)
{
  renderedCode;
  [...document.querySelectorAll("pre")].forEach((el) =>
    installCopyCode(el, { invalidation })
  );
}


function _39(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof config")).define("viewof config", ["view","Inputs","localStorageView","dynamicSelect"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["config"], _5);
  main.variable(observer()).define(["code","host","config","htl"], _6);
  main.variable(observer("renderedCode")).define("renderedCode", ["md","code"], _renderedCode);
  main.variable(observer("viewof code")).define("viewof code", ["Inputs"], _code);
  main.variable(observer("code")).define("code", ["Generators", "viewof code"], (G, _) => G.input(_));
  main.variable(observer("generate")).define("generate", ["astring","program","viewof code","Event"], _generate);
  main.variable(observer("body")).define("body", ["config","getNotebook","invalidation"], _body);
  main.variable(observer("program")).define("program", ["exports","emitExpressions","entry"], _program);
  main.variable(observer("cells")).define("cells", ["body","getProperty"], _cells);
  main.variable(observer("syncEntryPoints")).define("syncEntryPoints", ["cells","viewof config","Event"], _syncEntryPoints);
  main.variable(observer("entry")).define("entry", ["cells","config"], _entry);
  main.variable(observer()).define(["cells"], _15);
  main.variable(observer("parse")).define("parse", ["acorn"], _parse);
  main.variable(observer("stdlib")).define("stdlib", _stdlib);
  main.variable(observer("exports")).define("exports", ["getInputs","cells","stdlib","entry"], _exports);
  main.variable(observer("emitExpressions")).define("emitExpressions", ["parse","getName","getValue"], _emitExpressions);
  main.variable(observer("getValue")).define("getValue", ["config","getPromiseValue","getConstantValue"], _getValue);
  main.variable(observer("getName")).define("getName", ["getProperty"], _getName);
  main.variable(observer("getConstantValue")).define("getConstantValue", ["getProperty"], _getConstantValue);
  main.variable(observer("getPromiseValue")).define("getPromiseValue", ["getProperty","getInputs"], _getPromiseValue);
  main.variable(observer("getInputs")).define("getInputs", ["getProperty"], _getInputs);
  main.variable(observer()).define(_25);
  main.variable(observer("getNotebook")).define("getNotebook", ["parse"], _getNotebook);
  main.variable(observer("getProperty")).define("getProperty", _getProperty);
  main.variable(observer("viewof host")).define("viewof host", ["endpoint","viewof config","Event","viewof code"], _host);
  main.variable(observer("host")).define("host", ["Generators", "viewof host"], (G, _) => G.input(_));
  main.variable(observer("acorn")).define("acorn", ["require"], _acorn);
  main.variable(observer("astring")).define("astring", _astring);
  main.variable(observer("dynamicSelect")).define("dynamicSelect", ["juice","Inputs"], _dynamicSelect);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  main.import("cautious", child1);
  const child2 = runtime.module(define2);
  main.import("juice", child2);
  const child3 = runtime.module(define3);
  main.import("endpoint", child3);
  const child4 = runtime.module(define4);
  main.import("installCopyCode", child4);
  main.variable(observer()).define(["renderedCode","installCopyCode","invalidation"], _36);
  const child5 = runtime.module(define5);
  main.import("localStorageView", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _39);
  return main;
}
