import define1 from "./a6a56ee61aba9799@409.js";
import define2 from "./0e0b35a92c819d94@474.js";
import define3 from "./e3a019069a130d79@6817.js";
import define4 from "./98f34e974bb2e4bc@958.js";
import define5 from "./b316487cf25bf2ee@290.js";
import define6 from "./f109935193c0deba@4551.js";

function _1(md){return(
md`# Module map`
)}

function _2(visualizeModules){return(
visualizeModules()
)}

function _3(md){return(
md`Figures out the import structure of a runtime, just pass a runtime to the function \`moduleMap\` to get a summary of the modules. Returns a map indexed by a Module object to a record.

\`\`\`
module -> {
  type: "notebook import" | "module variable",
  name: <module name>,
  module: <module object ref>
  dependsOn: [<module name>*],
  dependedBy: [<module name>*],
}
\`\`\``
)}

function _moduleMap(runtime,keepalive,myModule,$0){return(
async (
  _runtime = runtime,
  {
    cache = new Map() // module -> {name}
  } = {}
) => {
  if (!_runtime || !_runtime._variables)
    throw "Invalid runtime passed to moduleMap";
  keepalive(myModule, "submit_summary");
  keepalive(myModule, "sync_modules");
  keepalive(myModule, "currentModules");
  return await $0.send({
    runtime: _runtime,
    cache: cache
  });
}
)}

function _5(md){return(
md`### \`currentModules\``
)}

async function _sync_modules(runtime_variables,moduleMap,_,$0,Event)
{
  runtime_variables;
  const latest = await moduleMap();
  let dirty = !this || !_.isEqual(new Set(latest.keys()), new Set(this.keys()));
  if (dirty) {
    $0.value = latest;
    $0.dispatchEvent(new Event("input"));
  }
  return $0.value;
}


async function _currentModules(Inputs,moduleMap){return(
Inputs.input(await moduleMap())
)}

function _8(Inputs,currentModules){return(
Inputs.table([...currentModules.values()], {
  format: {
    dom: (d) => d.innerHTML,
    specifiers: JSON.stringify,
    variable: (v) => v._name
  }
})
)}

function _9(md){return(
md`### Visualization`
)}

function _tipTitle(){return(
([k, c]) => 
`${k}\ndependsOn: [\n  ${(c[3].dependsOn || []).join(
  "\n  "
)}\n]\ndependedBy: [\n  ${(c[3].dependedBy || []).join("\n  ")}\n]`
)}

function _visualizeModules(currentModules,htl,d3,spectralCircleOrder,improveOrderSifting,bestOfRandomOrders,Plot,tipTitle,linkTo,isOnObservableCom)
{
  return ({ useSpectral = true } = {}) => {
    const modules = [...currentModules.values()].filter((m) => m && m.name);
    const n = modules.length;
    if (n === 0) return htl.svg`<svg width="1" height="1"></svg>`;

    const indexOf = new Map(modules.map((m, i) => [m.name, i]));

    const undirectedEdges = [];
    const seen = new Set();
    for (let i = 0; i < n; i++) {
      const from = modules[i];
      for (const toName of from.dependsOn || []) {
        const j = indexOf.get(toName);
        if (j == null || j === i) continue;
        const a = Math.min(i, j),
          b = Math.max(i, j);
        const k = `${a},${b}`;
        if (seen.has(k)) continue;
        seen.add(k);
        undirectedEdges.push([a, b]);
      }
    }

    const buildCSRLocal = (n, edges) => {
      const adj = Array.from({ length: n }, () => []);
      for (const [a0, b0] of edges) {
        const a = a0 | 0,
          b = b0 | 0;
        if (a === b) continue;
        if (a < 0 || b < 0 || a >= n || b >= n) continue;
        adj[a].push(b);
        adj[b].push(a);
      }
      const deg = new Float64Array(n);
      let nnz = 0;
      for (let i = 0; i < n; i++) {
        const row = adj[i];
        row.sort((x, y) => x - y);
        let w = 0;
        for (let j = 0; j < row.length; j++)
          if (w === 0 || row[j] !== row[w - 1]) row[w++] = row[j];
        row.length = w;
        deg[i] = w;
        nnz += w;
      }
      const rowPtr = new Int32Array(n + 1);
      const colIdx = new Int32Array(nnz);
      const val = new Float64Array(nnz);
      let p = 0;
      for (let i = 0; i < n; i++) {
        rowPtr[i] = p;
        const row = adj[i];
        for (let j = 0; j < row.length; j++) {
          colIdx[p] = row[j];
          val[p] = 1;
          p++;
        }
      }
      rowPtr[n] = p;
      return { n, rowPtr, colIdx, val, deg };
    };

    const crossingsCountLocal = (n, edges, order) => {
      const pos = new Int32Array(n);
      for (let i = 0; i < n; i++) pos[order[i]] = i;

      const intervals = [];
      for (const [a0, b0] of edges) {
        const a = a0 | 0,
          b = b0 | 0;
        if (a === b) continue;
        const i = pos[a],
          j = pos[b];
        const s = Math.min(i, j),
          t = Math.max(i, j);
        if (s === t) continue;
        intervals.push([s, t]);
      }

      intervals.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
      const bit = new Int32Array(n + 1);
      const add = (i) => {
        for (let x = i + 1; x <= n; x += x & -x) bit[x]++;
      };
      const sum = (i) => {
        let s = 0;
        for (let x = i + 1; x > 0; x -= x & -x) s += bit[x];
        return s;
      };
      const range = (l, r) => (r < l ? 0 : sum(r) - (l > 0 ? sum(l - 1) : 0));

      let crossings = 0;
      let k = 0;
      while (k < intervals.length) {
        const s = intervals[k][0];
        let k2 = k;
        while (k2 < intervals.length && intervals[k2][0] === s) k2++;
        for (let t = k; t < k2; t++)
          crossings += range(s + 1, intervals[t][1] - 1);
        for (let t = k; t < k2; t++) add(intervals[t][1]);
        k = k2;
      }
      return crossings;
    };

    let orderIdx;
    if (n <= 2 || undirectedEdges.length === 0 || !useSpectral) {
      orderIdx = Int32Array.from(d3.range(n));
    } else {
      const csr = buildCSRLocal(n, undirectedEdges);

      const spectral = spectralCircleOrder(csr, {
        alpha: 0.92,
        maxIters: 80,
        tol: 1e-4,
        seed: 1,
        passesOrtho: 1
      });

      const sifted = improveOrderSifting(n, undirectedEdges, spectral.order, {
        passes: 1,
        vertexSequence: "order"
      });

      const baseline = bestOfRandomOrders(n, undirectedEdges, {
        R: Math.min(n, 12),
        seed: 1,
        postSiftPasses: 0
      });

      const cSift = crossingsCountLocal(n, undirectedEdges, sifted.order);
      orderIdx =
        baseline?.order && baseline.crossings < cSift
          ? baseline.order
          : sifted.order;
    }

    const R = 100;
    const nodes = new Map();
    for (let p = 0; p < n; p++) {
      const vid = orderIdx[p] | 0;
      const a = (p * 2 * Math.PI) / n;
      const [x, y] = d3.pointRadial(a, R);
      const deg = (p * 360) / n;
      nodes.set(modules[vid].name, [x, y, deg, modules[vid]]);
    }

    const edges = modules.flatMap((from) =>
      (from.dependsOn || [])
        .filter((to) => nodes.has(to))
        .map((to) => [
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
          [...nodes.entries()].filter(([, c]) => c[2] > 180),
          {
            textAnchor: "end",
            x: ([, c]) => c[0],
            y: ([, c]) => c[1],
            rotate: ([, c]) => -c[2] - (c[2] > 180 ? 90 : -90),
            text: ([k]) => k
          }
        ),
        Plot.text(
          [...nodes.entries()].filter(([, c]) => c[2] <= 180),
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

    const xmlns = "http://www.w3.org/2000/svg";
    const xlink = "http://www.w3.org/1999/xlink";
    for (const text of plot.querySelectorAll("text")) {
      const moduleName = text.textContent;
      let url;
      try {
        url = linkTo(moduleName);
      } catch {
        continue;
      }
      const a = document.createElementNS(xmlns, "a");
      a.setAttributeNS(null, "href", url);
      a.setAttributeNS(xlink, "href", url);
      text.parentNode.insertBefore(a, text);
      if (isOnObservableCom()) {
        a.setAttribute("target", "_blank");
      }
      a.appendChild(text);
    }

    return plot;
  };
}


function _12(md){return(
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

function _17(md){return(
md`### Implementation`
)}

function _queue(flowQueue){return(
flowQueue({ timeout_ms: 15000 })
)}

function _19(md){return(
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
      [...queue.runtime._variables]
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
  return [...new Set([...queue.runtime._variables].map((v) => v._module))];
}


function _builtin(queue){return(
queue.runtime._builtin
)}

function _main_modules(queue,modules,builtin)
{
  const imports = new Set(queue.runtime._modules.values());
  return modules.filter((m) => !imports.has(m) && m !== builtin);
}


function _bootloaded_mains(queue){return(
queue.runtime.mains || new Map()
)}

function _bootloader(queue){return(
queue.runtime.bootloader
)}

function _resolve_modules(modules,module_definition_variables,findModuleName)
{
  console.log("resolve_modules");
  const module_definitions = new Map();
  const unresolved = [];
  modules.forEach((m) => {
    const md = module_definition_variables.find((md) => md._value == m);
    if (md) {
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


function _27(md){return(
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


async function _titles(modules,moduleTitle){return(
new Map(
  await Promise.all([...modules].map(async (m) => [m, await moduleTitle(m)]))
)
)}

function _summary(main_modules,titles,bootloader,builtin,queue,notebookImportMatches,bootloaded_mains,resolve_modules,module_definition_variables)
{
  console.log("generate summary");
  const modules = new Map([
    ...main_modules.map((main_module) => [
      main_module,
      {
        name: "main",
        module: main_module,
        title: titles.get(main_module),
        dependsOn: [],
        dependedBy: []
      }
    ]),
    ...(bootloader
      ? [
          [
            bootloader,
            {
              name: "bootloader",
              title: "Bootloader",
              module: bootloader,
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
        title: "Standard library",
        module: builtin,
        dependsOn: [],
        dependedBy: []
      }
    ],
    ...queue.cache,
    ...notebookImportMatches.entries(),
    ...[...bootloaded_mains.entries()].map(([name, module]) => [
      module,
      {
        name: name,
        module: module,
        title: titles.get(module),
        dependsOn: [],
        dependedBy: []
      }
    ]),
    ...[...resolve_modules.module_definitions.entries()].map(([m, spec]) => [
      m,
      {
        ...spec,
        name: spec.name,
        module: m,
        title: titles.get(m),
        dependsOn: [],
        dependedBy: []
      }
    ])
  ]);
  // add cross links
  // notebookImportVariables[0].variable._module == main
  [...notebookImportMatches.keys()].forEach((m) => {
    const hostModule = modules.get(main_modules[0]);
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
    importedModule.dependedBy.push(main_modules[0].name);
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


function _moduleTitle(runtime,Element,Text,observeVariable){return(
async function moduleTitle(
  module,
  { runtime: rt = runtime, timeoutMs = 15000 } = {}
) {
  if (!module)
    throw new Error(
      "moduleTitle(moduleMeta): expected {module} or a Module object."
    );

  const vars = [...rt._variables].filter(
    (v) => v && v._module === module && v._definition
  );
  const candidates = vars.filter((v) => {
    const n = v._name;
    if (v._type != 1) return false;
    if (n == null) return true;
    if (typeof n !== "string") return true;
    if (n.startsWith("dynamic observe ")) return false;
    if (n.startsWith("module ")) return false;
    return true;
  });

  if (candidates.length === 0) return null;

  const first = candidates.find(
    (v) => typeof v._id === "number" && Number.isFinite(v._id)
  )
    ? candidates.reduce((a, b) =>
        (a._id ?? Infinity) <= (b._id ?? Infinity) ? a : b
      )
    : candidates[0];

  const extract = (v) => {
    if (v == null) return null;
    if (typeof v === "string") return v.trim() || null;
    if (v instanceof Element) {
      if (v.tagName == "H1") return v.textContent;
      const h1 = v.querySelector?.("h1");
      if (h1) return (h1.textContent ?? "").trim() || null;
      debugger;
      return null;
    }
    if (v instanceof Text) return (v.textContent ?? "").trim() || null;
    const maybeNode = v?.nodeType ? v : null;
    if (maybeNode instanceof Element) return extract(maybeNode);
    debugger;
    return null;
  };

  return Promise.race([
    new Promise((resolve) => {
      const cancel = observeVariable(first, {
        fulfilled: (value) => {
          cancel();
          resolve(extract(value));
        },
        error: (err) => {
          cancel();
          resolve("Err");
        }
      });
    }),
    new Promise((resolve) => setInterval(() => resolve("title cell slow"), 250))
  ]);
}
)}

function _submit_summary(resolve_modules,queue,notebookImports,$0,summary)
{
  resolve_modules;
  queue;
  console.log("submit_summary");
  notebookImports;
  $0.resolve(summary);
}


function _36(robocoop2){return(
robocoop2()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["visualizeModules"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("moduleMap")).define("moduleMap", ["runtime","keepalive","myModule","viewof queue"], _moduleMap);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("sync_modules")).define("sync_modules", ["runtime_variables","moduleMap","_","viewof currentModules","Event"], _sync_modules);
  main.variable(observer("viewof currentModules")).define("viewof currentModules", ["Inputs","moduleMap"], _currentModules);
  main.variable(observer("currentModules")).define("currentModules", ["Generators", "viewof currentModules"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","currentModules"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("tipTitle")).define("tipTitle", _tipTitle);
  main.variable(observer("visualizeModules")).define("visualizeModules", ["currentModules","htl","d3","spectralCircleOrder","improveOrderSifting","bestOfRandomOrders","Plot","tipTitle","linkTo","isOnObservableCom"], _visualizeModules);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("tag")).define("tag", _tag);
  main.variable(observer("forcePeek")).define("forcePeek", _forcePeek);
  main.variable(observer("observe")).define("observe", _observe);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof queue")).define("viewof queue", ["flowQueue"], _queue);
  main.variable(observer("queue")).define("queue", ["Generators", "viewof queue"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("module_definition_variables")).define("module_definition_variables", ["notebookImports","queue","forcePeek"], _module_definition_variables);
  main.variable(observer("modules")).define("modules", ["module_definition_variables","queue"], _modules);
  main.variable(observer("builtin")).define("builtin", ["queue"], _builtin);
  main.variable(observer("main_modules")).define("main_modules", ["queue","modules","builtin"], _main_modules);
  main.variable(observer("bootloaded_mains")).define("bootloaded_mains", ["queue"], _bootloaded_mains);
  main.variable(observer("bootloader")).define("bootloader", ["queue"], _bootloader);
  main.variable(observer("resolve_modules")).define("resolve_modules", ["modules","module_definition_variables","findModuleName"], _resolve_modules);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("notebookImports")).define("notebookImports", ["main","parser"], _notebookImports);
  main.variable(observer("notebookImportVariables")).define("notebookImportVariables", ["runtime","notebookImports"], _notebookImportVariables);
  main.variable(observer("pageImportMatch")).define("pageImportMatch", _pageImportMatch);
  main.variable(observer("notebookImportMatches")).define("notebookImportMatches", ["pageImportMatch","notebookImportVariables","modules"], _notebookImportMatches);
  main.variable(observer("titles")).define("titles", ["modules","moduleTitle"], _titles);
  main.variable(observer("summary")).define("summary", ["main_modules","titles","bootloader","builtin","queue","notebookImportMatches","bootloaded_mains","resolve_modules","module_definition_variables"], _summary);
  main.variable(observer("moduleTitle")).define("moduleTitle", ["runtime","Element","Text","observeVariable"], _moduleTitle);
  main.variable(observer("submit_summary")).define("submit_summary", ["resolve_modules","queue","notebookImports","viewof queue","summary"], _submit_summary);
  main.variable(observer()).define(["robocoop2"], _36);
  const child1 = runtime.module(define1);
  main.import("linkTo", child1);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  const child3 = runtime.module(define3);
  main.import("parser", child3);
  main.import("sourceModule", child3);
  main.import("findModuleName", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  main.import("main", child4);
  main.import("keepalive", child4);
  main.import("thisModule", child4);
  main.import("unorderedSync", child4);
  main.import("isOnObservableCom", child4);
  main.import("viewof runtime_variables", child4);
  main.import("runtime_variables", child4);
  main.import("observe", "observeVariable", child4);
  const child5 = runtime.module(define5);
  main.import("spectralCircleOrder", child5);
  main.import("improveOrderSifting", child5);
  main.import("bestOfRandomOrders", child5);
  const child6 = runtime.module(define6);
  main.import("robocoop2", child6);
  return main;
}
