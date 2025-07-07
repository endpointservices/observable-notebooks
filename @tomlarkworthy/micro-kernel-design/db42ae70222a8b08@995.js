import define1 from "./de3abeb05c4b090e@526.js";
import define2 from "./a6a56ee61aba9799@406.js";
import define3 from "./0e0b35a92c819d94@474.js";
import define4 from "./e3a019069a130d79@6074.js";
import define5 from "./e1c39d41e8e944b0@939.js";
import define6 from "./98f34e974bb2e4bc@650.js";

function _1(md){return(
md`# Module map

`
)}

function _2(visualizeModules){return(
visualizeModules()
)}

function _4(md){return(
md`Figures out the import structure of a runtime, just pass a runtime to the function \`moduleMap\` to get a summary of the modules. Returns a map indexed by a Module object to a record.

\`\`\`
module -> {
  type: "notebook import" | "module variable",
  name: <module name>,
  module: <module object ref>
  ...
}
\`\`\``
)}

function _moduleMap(runtime,keepalive,myModule,$0){return(
async (_runtime = runtime) => {
  keepalive(myModule, "submit_summary");
  keepalive(myModule, "sync_modules");
  return await $0.send(_runtime);
}
)}

function _6(md){return(
md`### Example`
)}

function _vars(variables,runtime){return(
variables(runtime)
)}

async function _sync_modules(vars,moduleMap,$0,Event)
{
  vars;
  const latest = await moduleMap();
  let dirty = false;
  for (let [module, info] of latest) {
    if (!$0.value.has(module)) {
      dirty = true;
    }
  }
  $0.value = latest;
  if (dirty) {
    $0.dispatchEvent(new Event("input"));
  }
}


async function _currentModules(Inputs,moduleMap){return(
Inputs.input(await moduleMap())
)}

function _10(Inputs,currentModules){return(
Inputs.table([...currentModules.values()], {
  format: {
    dom: (d) => d.innerHTML,
    specifiers: JSON.stringify,
    variable: (v) => v._name
  }
})
)}

function _11(main){return(
main
)}

function _12(md){return(
md`### Visualization`
)}

function _tipTitle(){return(
([k, c]) => 
`${k}\ndependsOn: [\n  ${(c[3].dependsOn || []).join(
  "\n  "
)}\n]\ndependedBy: [\n  ${(c[3].dependedBy || []).join("\n  ")}\n]`
)}

function _visualizeModules(currentModules,d3,Plot,htl,tipTitle,linkTo)
{
  return () => {
    const modules = [...currentModules.values()];
    const layout = (module, index) => [
      ...d3.pointRadial((index * 2 * Math.PI) / modules.length, 100),
      (index * 360) / modules.length,
      module
    ];
    const nodes = new Map(modules.map((m, i) => [m.name, layout(m, i)]));
    const edges = modules.flatMap((from, i) =>
      (from.dependsOn || []).map((to) => [
        [from.name, nodes.get(from.name)],
        [to, nodes.get(to)]
      ])
    );
    const plot = Plot.plot({
      inset: 180,
      aspectRatio: 1,
      axis: null,
      marks: [
        () => htl.svg`<defs>
            <linearGradient id="gradient">
              <stop offset="15%" stop-color="red" />
              <stop offset="100%" stop-color="gold" />
            </linearGradient>
          </defs>`,
        Plot.arrow(edges, {
          x1: ([[, [x1]]]) => x1,
          y1: ([[, [, y1]]]) => y1,
          x2: ([, [, [x2]]]) => x2,
          y2: ([, [, [, y2]]]) => y2,
          bend: true,
          stroke: "url(#gradient)",
          strokeOpacity: 0.5,
          strokeLinejoin: "miter",
          headLength: 3,
          inset: 5
        }),
        Plot.text(
          [...nodes.entries()].filter(([k, c]) => c[2] > 180),
          {
            textAnchor: "end",
            x: ([, c]) => c[0],
            y: ([, c]) => c[1],
            rotate: ([, c]) => -c[2] - (c[2] > 180 ? 90 : -90),
            text: ([k]) => k
          }
        ),
        Plot.text(
          [...nodes.entries()].filter(([k, c]) => c[2] <= 180),
          {
            fontSize: 12,
            textAnchor: "start",
            x: ([, c]) => c[0],
            y: ([, c]) => c[1],
            rotate: ([, c]) => -c[2] - (c[2] > 180 ? 90 : -90),
            text: ([k]) => k
          }
        ),
        Plot.tip(
          nodes.entries(),
          Plot.pointer({
            x: ([, c]) => c[0],
            y: ([, c]) => c[1],
            title: tipTitle,
            maxRadius: Infinity
          })
        )
      ]
    });
    // Wrap text labels in hyperlinks
    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    for (const text of plot.querySelectorAll("text")) {
      const moduleName = text.textContent;
      let url;
      try {
        url = linkTo(moduleName);
      } catch (e) {
        console.error(e);
        continue;
      }
      const a = document.createElementNS(xmlns, "a");
      a.setAttributeNS(null, "href", url);
      a.setAttributeNS(xlink, "href", url);
      text.parentNode.insertBefore(a, text);
      a.appendChild(text);
    }
    return plot;
  };
}


function _15(md){return(
md`### Random helpers`
)}

function _myModule(thisModule){return(
thisModule()
)}

function _tag(){return(
Symbol()
)}

function _forcePeek()
{
  //console.log("force peek");
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

function _20(md){return(
md`### Implementation`
)}

function _queue(flowQueue){return(
flowQueue({ timeout_ms: 15000 })
)}

function _22(queue){return(
queue
)}

function _23(md){return(
md`We resolve what we can using variables named with prefix \`module\` that hold module values. We \`forcePeek\` the variables to make them resolve, which forces loading of the modules.`
)}

async function _module_definition_variables(notebookImports,queue,forcePeek)
{
  console.log("module_definition_variables");
  notebookImports;
  queue;
  let last_module_count = -1;
  let module_definition_variables = [];
  while (last_module_count < module_definition_variables.length) {
    last_module_count = module_definition_variables.length;
    module_definition_variables = await Promise.all(
      [...queue._variables]
        .filter((v) => v._name && v._name.startsWith("module "))
        .filter((v) => !v._name.startsWith("module <unknown"))
        .map(async (v) => {
          await forcePeek(v); // force module to load, may cause others to load
          return v;
        })
    );
  }
  return module_definition_variables;
}


function _modules(module_definition_variables,queue)
{
  console.log("modules");
  module_definition_variables;
  return [...new Set([...queue._variables].map((v) => v._module))];
}


function _builtin(queue){return(
queue._builtin
)}

function _main_module(runtime,modules,builtin)
{
  const imports = new Set(runtime._modules.values());
  return modules.filter((m) => !imports.has(m) && m !== builtin)[0];
}


function _28(modules){return(
modules[3].define
)}

function _29(queue,modules){return(
queue._modules.has(modules[3].define)
)}

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


function _31(md){return(
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


function _34(notebookImportVariables){return(
notebookImportVariables[0].variable._outputs
)}

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
        name: currentImport.notebookImports[0].name,
        type: "notebook import",
        module: module,
        dependsOn: [],
        dependedBy: [],
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


function _summary(main_module,builtin,notebookImportMatches,resolve_modules,module_definition_variables)
{
  console.log("generate summary");
  const modules = new Map([
    ...(main_module
      ? [
          [
            main_module,
            {
              name: "main",
              module: main_module,
              dependsOn: [],
              dependedBy: []
            }
          ]
        ]
      : []),
    [
      builtin,
      {
        name: "builtin",
        module: builtin,
        dependsOn: [],
        dependedBy: []
      }
    ],
    ...notebookImportMatches.entries(),
    ...[...resolve_modules.module_definitions.entries()].map(([m, spec]) => [
      m,
      {
        ...spec,
        name: spec.name,
        module: m,
        dependsOn: [],
        dependedBy: []
      }
    ])
  ]);
  // add cross links
  // notebookImportVariables[0].variable._module == main
  [...notebookImportMatches.keys()].forEach((m) => {
    const hostModule = modules.get(main_module);
    const importedModule = modules.get(m);
    if (!hostModule?.dependsOn || !importedModule?.dependedBy) {
      console.error(
        "error building module dependancy map",
        hostModule,
        importedModule
      );
      return;
    }
    hostModule.dependsOn.push(importedModule.name);
    importedModule.dependedBy.push(main_module.name);
  });

  module_definition_variables.forEach((v) => {
    const hostModule = modules.get(v._module);
    const importedModule = modules.get(v._value);
    if (!hostModule?.dependsOn || !importedModule?.dependedBy) {
      console.error(
        "error building module dependancy map",
        hostModule,
        importedModule
      );
      return;
    }
    hostModule.dependsOn.push(importedModule.name);
    importedModule.dependedBy.push(hostModule.name);
  });
  return modules;
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
  main.variable(observer()).define(["visualizeModules"], _2);
  const child1 = runtime.module(define1);
  main.import("viewof additional_module", child1);
  main.import("additional_module", child1);
  main.import("additionalModules", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("moduleMap")).define("moduleMap", ["runtime","keepalive","myModule","viewof queue"], _moduleMap);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof vars")).define("viewof vars", ["variables","runtime"], _vars);
  main.variable(observer("vars")).define("vars", ["Generators", "viewof vars"], (G, _) => G.input(_));
  main.variable(observer("sync_modules")).define("sync_modules", ["vars","moduleMap","viewof currentModules","Event"], _sync_modules);
  main.variable(observer("viewof currentModules")).define("viewof currentModules", ["Inputs","moduleMap"], _currentModules);
  main.variable(observer("currentModules")).define("currentModules", ["Generators", "viewof currentModules"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","currentModules"], _10);
  main.variable(observer()).define(["main"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("tipTitle")).define("tipTitle", _tipTitle);
  main.variable(observer("visualizeModules")).define("visualizeModules", ["currentModules","d3","Plot","htl","tipTitle","linkTo"], _visualizeModules);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("tag")).define("tag", _tag);
  main.variable(observer("forcePeek")).define("forcePeek", _forcePeek);
  main.variable(observer("observe")).define("observe", _observe);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof queue")).define("viewof queue", ["flowQueue"], _queue);
  main.variable(observer("queue")).define("queue", ["Generators", "viewof queue"], (G, _) => G.input(_));
  main.variable(observer()).define(["queue"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("module_definition_variables")).define("module_definition_variables", ["notebookImports","queue","forcePeek"], _module_definition_variables);
  main.variable(observer("modules")).define("modules", ["module_definition_variables","queue"], _modules);
  main.variable(observer("builtin")).define("builtin", ["queue"], _builtin);
  main.variable(observer("main_module")).define("main_module", ["runtime","modules","builtin"], _main_module);
  main.variable(observer()).define(["modules"], _28);
  main.variable(observer()).define(["queue","modules"], _29);
  main.variable(observer("resolve_modules")).define("resolve_modules", ["modules","module_definition_variables","findModuleName"], _resolve_modules);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("notebookImports")).define("notebookImports", ["main","parser"], _notebookImports);
  main.variable(observer("notebookImportVariables")).define("notebookImportVariables", ["runtime","notebookImports"], _notebookImportVariables);
  main.variable(observer()).define(["notebookImportVariables"], _34);
  main.variable(observer("pageImportMatch")).define("pageImportMatch", _pageImportMatch);
  main.variable(observer("notebookImportMatches")).define("notebookImportMatches", ["pageImportMatch","notebookImportVariables","modules"], _notebookImportMatches);
  main.variable(observer("summary")).define("summary", ["main_module","builtin","notebookImportMatches","resolve_modules","module_definition_variables"], _summary);
  main.variable(observer("submit_summary")).define("submit_summary", ["resolve_modules","queue","notebookImports","viewof queue","summary"], _submit_summary);
  const child2 = runtime.module(define2);
  main.import("linkTo", child2);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  const child4 = runtime.module(define4);
  main.import("parser", child4);
  main.import("sourceModule", child4);
  main.import("findModuleName", child4);
  const child5 = runtime.module(define5);
  main.import("runtime", child5);
  main.import("main", child5);
  const child6 = runtime.module(define6);
  main.import("keepalive", child6);
  main.import("thisModule", child6);
  main.import("variables", child6);
  return main;
}
