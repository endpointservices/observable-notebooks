import define1 from "./0e0b35a92c819d94@471.js";
import define2 from "./e3a019069a130d79@5780.js";
import define3 from "./e1c39d41e8e944b0@939.js";

function _1(md){return(
md`# Module map

Figures out the import structure of a runtime, just pass a runtime to the function \`moduleMap\` to get a summary of the modules. Returns a map indexed by a Module object to a record.

\`\`\`
module -> {
  type: "notebook import" | "module variable",
  name: <module name>,
  module: <module object ref>
  ...
}
\`\`\``
)}

function _moduleMap($0){return(
async () => {
  console.log("moduleMap");
  return await $0.send();
}
)}

function _3(md){return(
md`### Example`
)}

function _4(Inputs,example_map){return(
Inputs.table([...example_map.values()], {
  format: {
    dom: (d) => d.innerHTML,
    specifiers: JSON.stringify,
    variable: (v) => v._name
  }
})
)}

function _example_map(moduleMap,runtime){return(
moduleMap(runtime)
)}

function _6(md){return(
md`### Random helpers`
)}

function _myModule(runtime,tag)
{
  const module = [...runtime._variables].find((v) => v._value === tag)._module;
  console.log("myModule", module);
  return module;
}


function _tag(){return(
Symbol()
)}

function _forcePeek()
{
  console.log("force peek");
  return (variable, { forever = false } = {}) => {
    if (variable._value) return variable._value;
    let peeker;
    const promise = new Promise((resolve) => {
      peeker = variable._module.variable({}).define([variable._name], (m) => {
        resolve(m);
      });
    });
    if (!forever) promise.then((v) => peeker.delete());
    return promise;
  };
}


function _observe(){return(
(module, variable_name, observer) => {
  const variable = module
    .variable(observer)
    .define(`dynamic observe ${variable_name}`, [variable_name], (m) => m);
  return () => variable.delete();
}
)}

function _11(md){return(
md`### Implementation`
)}

function _queue(flowQueue){return(
flowQueue({ timeout_ms: 10000 })
)}

function _13(md){return(
md`We resolve what we can using variables named with prefix \`module\` that hold module values. We \`forcePeek\` the variables to make them resolve, which forces loading of the modules.`
)}

async function _module_definition_variables(notebookImports,queue,runtime,forcePeek)
{
  console.log("module_definition_variables");
  notebookImports;
  queue;
  let last_module_count = -1;
  let module_definition_variables = [];
  while (last_module_count < module_definition_variables.length) {
    last_module_count = module_definition_variables.length;
    module_definition_variables = await Promise.all(
      [...runtime._variables]
        .filter((v) => v._name && v._name.startsWith("module "))
        .filter((v) => !v._name.startsWith("module <unknown"))
        .map(async (v) => {
          console.log("forcePeek", v._name);
          await forcePeek(v); // force module to load, may cause others to load
          return v;
        })
    );
  }
  return module_definition_variables;
}


function _modules(module_definition_variables,runtime)
{
  console.log("modules");
  module_definition_variables;
  return [...runtime._modules.values()];
}


function _resolve_modules(modules,module_definition_variables,findModuleName)
{
  console.log("resolve_modules");
  const module_definitions = new Map();
  const unresolved = [];
  modules.forEach((m) => {
    const md = module_definition_variables.find((md) => md._value == m);
    if (md) {
      if (md._name == "module @tomlarkworthy/observable-notes") {
        debugger;
      }
      module_definitions.set(m, {
        type: "module variable",
        name: findModuleName(md._module._scope, m),
        variable: md
      });
    } else {
      unresolved.push(m);
    }
  });
  return { module_definitions, unresolved };
}


function _17(md){return(
md`modules imported via notebook imports do not have module variables, so they are trickier to figure out. We can sniff the page DOM to find the import expressions, and try to map them to the modules we could to resolve earlier`
)}

function _notebookImports(main,parser)
{
  console.log("notebookImports");
  main;
  return new Map(
    [...document.querySelectorAll(".observablehq--import")]
      .map((dom) => [dom, parser.parseCell(dom.textContent)])
      .map(([dom, node]) => [
        dom.parentElement,
        node.body.specifiers.map((s) => ({
          name: node.body.source.value,
          dom: dom.parentElement,
          ast: s,
          local: s.local.name,
          imported: s.imported.name
        }))
      ])
  );
}


function _notebookImportVariables(runtime,notebookImports)
{
  console.log("notebookImportVariables");
  return [
    ...[...runtime._variables] // Observable DOM nodes are referenced in runtime variables
      .filter(
        (v) =>
          v._observer &&
          v._observer._node &&
          notebookImports.get(v._observer._node)
      )
      .map((v) => ({
        variable: v,
        notebookImports: notebookImports.get(v._observer._node)
      })),
    ...[
      ...[...notebookImports.entries()] // visualizer DOM nodes have the variable attached
        .filter(([pi, vars]) => pi.variable)
        .map(([pi, vars]) => ({
          variable: pi.variable,
          notebookImports: vars
        }))
    ]
  ].sort((a, b) => b.notebookImports.length - a.notebookImports.length); // sort by complexity
}


function _pageImportMatch(){return(
async (notebookImportVariables, modules) => {
  console.log("pageImportMatch");
  const backupHas = Map.prototype.has; // Save the original `has` method on Map.prototype

  let currentImport = undefined;
  const matches = new Map();
  // Override `Map.prototype.has` to intercept calls to `has` on any Map instance
  Map.prototype.has = function (...args) {
    const module = modules.find((m) => m._scope == this);
    if (currentImport && module) {
      matches.set(module, {
        type: "notebook import",
        name: currentImport.notebookImports[0].name,
        module: module,
        dom: currentImport.notebookImports[0].dom,
        specifiers: currentImport.notebookImports.map((pi) => ({
          local: pi.local,
          imported: pi.imported,
          variable: pi.variable
        }))
      });
    }
    return backupHas.call(this, ...args); // Call the original `has` method
  };

  // Iterate through the notebook imports and define them while capturing `has` calls

  await notebookImportVariables.reduce((chain, pageImportVariable) => {
    // Call the definition chain
    return chain.then(async () => {
      currentImport = pageImportVariable;
      try {
        await pageImportVariable.variable._definition();
      } catch (err) {
        console.warn(err);
      }
      currentImport = undefined;
    });
  }, Promise.resolve());

  // Restore the original `has` method after the operations are done
  Map.prototype.has = backupHas;

  return matches;
}
)}

function _notebookImportMatches(pageImportMatch,notebookImportVariables,modules)
{
  console.log("notebookImportMatches");
  return pageImportMatch(notebookImportVariables, modules);
}


function _summary(notebookImportMatches,resolve_modules)
{
  console.log("generate summary");
  return new Map([
    ...notebookImportMatches.entries(),
    ...[...resolve_modules.module_definitions.entries()].map(([m, spec]) => [
      m,
      {
        ...spec,
        module: m,
        name: spec.name
      }
    ])
  ]);
}


function _submit_summary(resolve_modules,queue,notebookImports,$0,summary)
{
  resolve_modules;
  queue;
  console.log("submit_summary");
  notebookImports;
  $0.resolve(summary);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("moduleMap")).define("moduleMap", ["viewof queue"], _moduleMap);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Inputs","example_map"], _4);
  main.variable(observer("example_map")).define("example_map", ["moduleMap","runtime"], _example_map);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("myModule")).define("myModule", ["runtime","tag"], _myModule);
  main.variable(observer("tag")).define("tag", _tag);
  main.variable(observer("forcePeek")).define("forcePeek", _forcePeek);
  main.variable(observer("observe")).define("observe", _observe);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof queue")).define("viewof queue", ["flowQueue"], _queue);
  main.variable(observer("queue")).define("queue", ["Generators", "viewof queue"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("module_definition_variables")).define("module_definition_variables", ["notebookImports","queue","runtime","forcePeek"], _module_definition_variables);
  main.variable(observer("modules")).define("modules", ["module_definition_variables","runtime"], _modules);
  main.variable(observer("resolve_modules")).define("resolve_modules", ["modules","module_definition_variables","findModuleName"], _resolve_modules);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("notebookImports")).define("notebookImports", ["main","parser"], _notebookImports);
  main.variable(observer("notebookImportVariables")).define("notebookImportVariables", ["runtime","notebookImports"], _notebookImportVariables);
  main.variable(observer("pageImportMatch")).define("pageImportMatch", _pageImportMatch);
  main.variable(observer("notebookImportMatches")).define("notebookImportMatches", ["pageImportMatch","notebookImportVariables","modules"], _notebookImportMatches);
  main.variable(observer("summary")).define("summary", ["notebookImportMatches","resolve_modules"], _summary);
  main.variable(observer("submit_summary")).define("submit_summary", ["resolve_modules","queue","notebookImports","viewof queue","summary"], _submit_summary);
  const child1 = runtime.module(define1);
  main.import("flowQueue", child1);
  const child2 = runtime.module(define2);
  main.import("parser", child2);
  main.import("sourceModule", child2);
  main.import("findModuleName", child2);
  const child3 = runtime.module(define3);
  main.import("runtime", child3);
  main.import("main", child3);
  return main;
}
