import define1 from "./a6a56ee61aba9799@409.js";
import define2 from "./db42ae70222a8b08@1170.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./db80e603859226c1@23.js";
import define5 from "./f096db8fcbc444bf@565.js";
import define6 from "./57d79353bac56631@44.js";
import define7 from "./e3a019069a130d79@6817.js";
import define8 from "./f6794ed0523241c3@1824.js";
import define9 from "./f109935193c0deba@4551.js";

function _1(md){return(
md`# \`cellMap\`
## computes the mapping of reactive variables to higher level notebook cells, grouped by module`
)}

function _showBuiltins(Inputs){return(
Inputs.toggle({ label: "builtins?", value: false })
)}

function _showAnon(Inputs){return(
Inputs.toggle({ label: "anonymous?", value: false })
)}

function _cellMapViz(hash,Plot,width,d3,filteredMap,edges,linkTo,isOnObservableCom)
{
  hash; // update links on hash change
  return Plot.plot({
    width,
    axis: null,
    y: {
      reverse: true
    },
    marks: [
      Plot.dot(
        [
          [-1, d3.min(filteredMap, (d) => d.module)],
          [1, d3.max(filteredMap, (d) => d.module) + "_"]
        ],
        {
          stroke: "none"
        }
      ),
      Plot.arrow(
        edges.filter((edge) => edge[1]),
        {
          x1: 0,
          y1: (edge) => `${edge[0].module}#${edge[0].name}`,
          x2: 0,
          y2: (edge) => `${edge[1].module}#${edge[1].name}`,
          stroke: (edge) => edge[0].module,
          headLength: 0,
          bend: 90
        }
      ),
      Plot.ruleY(new Set(filteredMap.map((cell) => cell.module + "-")), {
        y: (d) => d,
        stroke: (d) => d,
        strokeOpacity: 0.5,
        strokeDasharray: [5, 10]
      }),
      Plot.text(new Set(filteredMap.map((cell) => cell.module)), {
        x: -1,
        y: (d) => d + "_",
        fill: (d) => d,
        fontSize: 14,
        frameAnchor: "top-left",
        dy: 8,
        href: (cell) => linkTo(`${cell}`),
        ...(isOnObservableCom() && { target: "_blank" })
      }),
      Plot.text(
        filteredMap,
        Plot.pointerY({
          x: 1,
          text: (d) => `${d.module}#${d.name}`,
          y: (d) => `${d.module}#${d.name}`,
          fill: (d) => d.module,
          fontSize: 14,
          frameAnchor: "right",
          href: (cell) => {
            if (!cell) return undefined;
            return linkTo(`${cell.module}#${cell.name}`);
          },
          ...(isOnObservableCom() && { target: "_blank" })
        })
      )
    ]
  });
}


function _detailVizTitle(cellMapViz,linkTo,md){return(
md`${cellMapViz ? `### [\`${cellMapViz?.module}#${cellMapViz?.name}\`](${linkTo(`${cellMapViz?.module}#${cellMapViz?.name}`)})` : `\`<click the above viz to pin a cell and open its dependancy graph below>\``}`
)}

function _detailViz(Plot,width,nodes,variableToCell,modules,linkTo,isOnObservableCom){return(
Plot.plot({
  symbol: {
    domain: ["simple", "mutable", undefined, "import", " ", "viewof"],
    legend: true
  },
  margin: 50,
  axis: null,
  width,
  height: 1000,
  marks: [
    Plot.link(
      nodes
        .filter((d) => d.parent)
        .map((n) => {
          if (variableToCell.get(n.parent.data) == variableToCell.get(n.data)) {
            n.type = variableToCell.get(n.data).type;
          } else {
            n.type = "connector";
          }
          return n;
        }),
      {
        x1: "y",
        y1: "x",
        x2: (d) => d.parent.y,
        y2: (d) => d.parent.x,
        stroke: "type",
        strokeLinecap: "round",
        strokeWidth: (d) => (d.type == "connector" ? 2 : 20),
        opacity: (d) => (d.type == "connector" ? 0.5 : 0.1),
        inset: 0
      }
    ),
    Plot.dot(nodes, {
      x: "y",
      y: "x",
      r: 10,
      fill: "white",
      symbol: (node) => variableToCell.get(node.data)?.type,
      stroke: (d) => modules.get(d.data._module)?.name,
      strokeWidth: 4,
      href: (d) => {
        const cell = variableToCell.get(d.data);
        if (!cell) return undefined;
        return linkTo(`${cell.module}#${cell.name}`);
      },
      ...(isOnObservableCom() && { target: "_blank" })
    }),
    Plot.arrow(
      nodes
        .filter((d) => d.parent)
        .flatMap((d) => d.reused.map((reused) => ({ ...d, parent: reused }))),
      {
        x1: "y",
        y1: "x",
        x2: (d) => d.parent.y,
        y2: (d) => d.parent.x,
        bend: -10,
        strokeDasharray: [1, 5],
        stroke: "red",
        opacity: 0.5,
        inset: 14
      }
    ),
    Plot.text(nodes, {
      x: "y",
      y: "x",
      text: (d) => d.data._name,
      dy: 16
    })
  ]
})
)}

function _7(md){return(
md`## cellMap`
)}

function _8(Inputs,filteredMap){return(
Inputs.table(filteredMap, {
  layout: "auto",
  format: {
    variables: (d) => d.length
  }
})
)}

function _9(md){return(
md`## \`liveCellMap\`

Prefer using this variable for an always live view of the runtime state`
)}

async function _liveCellMap(keepalive,cellMapModule,Inputs,cellMap)
{
  keepalive(cellMapModule, "maintain_live_cell_map");
  return Inputs.input(await cellMap());
}


async function _maintain_live_cell_map(runtime_variables,$0,cellMap,Event)
{
  runtime_variables;
  $0.value = await cellMap();
  $0.dispatchEvent(new Event("input"));
}


function _usage(md){return(
md`## cellMap function

You can call it with zero args to default to the current runtime, or pass in a subset of variables to extract the cell structure from just those.

\`\`\`js
import {cellMap, liveCellMap} from "@tomlarkworthy/cell-map"
\`\`\`

If you wanted to use the visualizations in your own notebooks. You would import the views e.g.

\`\`\`js
import {viewof cellMapViz, viewof detailViz, detailVizTitle} from "@tomlarkworthy/cell-map"
\`\`\`

and then call them in your notebooks`
)}

function _cellMap(runtime,moduleMap,moduleVarInfo,importedModule,findModuleName,decompileImport){return(
async (variables, _moduleMap) => {
  const map = new Map();
  if (!variables) variables = runtime._variables;
  variables = [...variables];
  if (variables.length === 0) return map;
  if (!_moduleMap) _moduleMap = await moduleMap(variables[0]._module._runtime);

  const byNotebookModule = new Map();
  for (const v of variables) {
    const info = _moduleMap.get(v._module);
    if (!info) continue;
    if (!byNotebookModule.has(info.module))
      byNotebookModule.set(info.module, []);
    byNotebookModule.get(info.module).push(v);
  }

  const isModuleVar = (v) =>
    typeof v?._name === "string" && v._name.startsWith("module ");

  await Promise.all(
    [...byNotebookModule.keys()].map(async (m) => {
      const variables = byNotebookModule.get(m);
      const cells = new Map();

      const moduleVars = variables.filter(isModuleVar);
      const moduleVarInfos = new Map(
        await Promise.all(
          moduleVars.map(async (v) => [v, await moduleVarInfo(v, _moduleMap)])
        )
      );

      const moduleVarsByKey = new Map();
      for (const v of moduleVars) {
        const info = moduleVarInfos.get(v);
        const key = info?.module ?? info?.name ?? null;
        if (!key) continue;
        if (!moduleVarsByKey.has(key)) moduleVarsByKey.set(key, []);
        moduleVarsByKey.get(key).push(v);
      }

      const viewofs = new Set();
      const mutables = new Set();

      const namedNonModuleVars = variables.filter(
        (v) => v?._name && !isModuleVar(v)
      );
      const sources = new Map(
        await Promise.all(
          namedNonModuleVars.map(async (v) => [
            v._name,
            await importedModule(v)
          ])
        )
      );

      const imports = new Map();
      const moduleNamesPromises = new Map();
      const groups = new Map();
      let anonCounter = 0;

      for (const v of variables) {
        if (v?._name) {
          if (isModuleVar(v)) {
            continue;
          }
          const source = sources.get(v._name);
          if (source) {
            const key = source;
            if (!imports.has(key)) {
              imports.set(key, []);
              moduleNamesPromises.set(
                key,
                Promise.resolve(
                  findModuleName(key, _moduleMap, { unknown_id: v._name })
                )
              );
            }
            imports.get(key).push(v);
          } else if (v._name.startsWith("viewof ")) {
            cells.set(v, { type: "viewof", lang: ["ojs"] });
            viewofs.add(v);
            groups.set(v._name, []);
          } else if (v._name.startsWith("mutable ")) {
            cells.set(v, { type: "mutable", lang: ["ojs"] });
            mutables.add(v);
            groups.set(v._name, []);
          } else if (v._name.startsWith("dynamic ")) {
            continue;
          } else {
            cells.set(v, { type: "simple", lang: ["ojs"] });
            groups.set(v._name, [v]);
          }
        } else {
          cells.set(v, { type: "simple", lang: ["ojs"] });
          groups.set(anonCounter++, [v]);
        }
      }

      for (const [key] of moduleVarsByKey.entries()) {
        if (imports.has(key)) continue;
        if (!moduleNamesPromises.has(key)) {
          if (typeof key === "string")
            moduleNamesPromises.set(key, Promise.resolve(key));
          else
            moduleNamesPromises.set(
              key,
              Promise.resolve(
                findModuleName(key, _moduleMap, { unknown_id: Math.random() })
              )
            );
        }
      }

      const moduleNames = new Map(
        await Promise.all(
          [...moduleNamesPromises.entries()].map(async ([k, p]) => [k, await p])
        )
      );

      for (const v of viewofs) {
        const name = v._name.substring(7);
        if (groups.has(name)) {
          groups.get(v._name).push(v, groups.get(name)[0]);
          groups.delete(name);
        } else {
          groups.delete(v._name);
        }
      }

      for (const v of mutables) {
        const name = v._name.substring(8);
        const initial = "initial " + name;
        if (groups.has(name) && groups.has(initial)) {
          groups
            .get(v._name)
            .push(groups.get(initial)?.[0], v, groups.get(name)[0]);
          cells.delete(groups.get(initial)[0]);
          cells.delete(groups.get(name)[0]);
          groups.delete(initial);
          groups.delete(name);
        } else {
          const vars = groups.get(v._name);
          if (vars?.[0]) cells.delete(vars[0]);
          groups.delete(v._name);
          groups.delete(initial);
          groups.delete(name);
        }
      }

      for (const [key, importVars] of imports.entries()) {
        const module_name =
          moduleNames.get(key) ?? `<unknown ${Math.random()}>`;

        let importInfo = null;
        try {
          importInfo = (await decompileImport(importVars)) ?? null;
        } catch {
          importInfo = null;
        }

        cells.set(importVars[0], {
          type: "import",
          lang: ["ojs"],
          module_name,
          importInfo
        });

        const groupName = `module ${module_name}`;
        const moduleVarsForKey = moduleVarsByKey.get(key) ?? [];
        groups.set(groupName, [...importVars, ...moduleVarsForKey]);
        moduleVarsByKey.delete(key);
      }

      for (const [key, moduleVarsOnly] of moduleVarsByKey.entries()) {
        if (!moduleVarsOnly.length) continue;

        const module_name =
          moduleNames.get(key) ??
          (typeof key === "string" ? key : `<unknown ${Math.random()}>`);

        let importInfo = null;
        try {
          importInfo = (await decompileImport(moduleVarsOnly)) ?? null;
        } catch {
          importInfo = null;
        }

        cells.set(moduleVarsOnly[0], {
          type: "import",
          lang: ["ojs"],
          module_name,
          importInfo
        });

        const groupName = `module ${module_name}`;
        groups.set(groupName, [...moduleVarsOnly]);
      }

      const moduleName =
        _moduleMap.get(variables[0]._module)?.name ?? "<unknown module>";
      map.set(
        m,
        [...groups.entries()].map(([name, variables]) => {
          const head =
            typeof name === "string" && name.startsWith("mutable")
              ? variables[1]
              : variables[0];
          return {
            name,
            module: moduleName,
            ...(cells.get(head) ?? { type: "simple", lang: ["ojs"] }),
            variables
          };
        })
      );
    })
  );

  return map;
}
)}

async function _test_cellmap_importInfo_on_real_import(cellMap,expect)
{
  const mapped = await cellMap();
  const allCells = [...mapped.values()].flat();
  const cell = allCells.find(
    (c) => c?.type === "import" && typeof c?.module_name === "string"
  );
  expect(Boolean(cell)).toBe(true);

  expect(cell.type).toBe("import");
  expect(cell.importInfo != null).toBe(true);
  expect(cell.importInfo.type).toBe("import");
  expect((cell.importInfo.specifiers?.length ?? 0) >= 1).toBe(true);

  const vars = cell.importInfo?.meta?.variables ?? [];
  expect(Array.isArray(vars)).toBe(true);
  expect(vars.length >= 1).toBe(true);

  return cell.importInfo;
}


function _15(md){return(
md`### \`cellMapCompat\`

Migration helper from old cellMap`
)}

function _cellMapCompat(cellMap){return(
async (module, { excludeInbuilt = true } = {}) => {
  const map = await cellMap(
    [...module._runtime._variables].filter(
      (v) => v._module == module && (!excludeInbuilt || v._type == 1)
    )
  );
  const cells = map.get(module) || [];
  return new Map(cells.map((c) => [c.name, c.variables]));
}
)}

function _17(md){return(
md`## Visualizations`
)}

function _nodeToSymbol(variableToCell){return(
(node) =>
  ({
    viewof: "triangle",
    mutable: "cross",
    import: "square",
    simple: "circle"
  }[variableToCell.get(node.data)?.type] || "diamond")
)}

function _focus_variables(cellMapViz,descendants,ascendants){return(
cellMapViz
  ? [
      ...descendants(cellMapViz.variables[0]),
      ...ascendants(cellMapViz.variables[0])
    ]
  : []
)}

function _focus_cells(focus_variables,variableToCell){return(
new Set(focus_variables.map((v) => variableToCell.get(v)))
)}

function _descendents(d3,cellMapViz){return(
d3.hierarchy(
  cellMapViz ? cellMapViz.variables[0] : [],
  (variable) => {
    return variable._inputs;
  }
)
)}

function _dedupeHierarchy(){return(
function dedupeHierarchy(root) {
  const key = (n) => n.data;
  const deepest = new Map(); // datum → deepest node

  // pass-1: pick deepest representative
  root.each((n) => {
    const k = key(n);
    if (!deepest.has(k) || n.depth > deepest.get(k).depth) deepest.set(k, n);
  });
  deepest.forEach((n) => {
    n.reused = [];
  });

  // pass-2: alias shallower nodes → deepest
  root.each((n) => {
    const rep = deepest.get(key(n));
    n.name = n.data._name;
    const p = n.parent;
    if (n !== rep) {
      if (p) {
        p.children = p.children.map((c) => (c === n ? rep : c));
        if (!rep.reused.includes(p) && p == deepest.get(key(p)))
          rep.reused.push(p);
      }
    }
  });
  return root;
}
)}

function _layout(d3,descendents){return(
d3.tree()(descendents)
)}

function _clustered(dedupeHierarchy,layout){return(
dedupeHierarchy(layout)
)}

function _nodes(clustered){return(
clustered.descendants().map((n) => ({ name: n.data._name, ...n }))
)}

function _26(md){return(
md`### visualize the cell ordering`
)}

function _runtimeMap(runtime_variables,liveCellMap)
{
  runtime_variables;
  return [...liveCellMap.values()].flat();
}


function _variableToCell(runtimeMap){return(
new Map(
  runtimeMap.flatMap((cell) => cell.variables.map((v) => [v, cell]))
)
)}

function _filteredMap(runtimeMap,filter){return(
runtimeMap.filter(filter)
)}

function _filter(showBuiltins,showAnon){return(
(v) =>
  (showBuiltins || (v.module !== "builtin" && v.name !== "module builtin")) &&
  (showAnon || typeof v.name == "string")
)}

function _edges(filteredMap,variableToCell,filter){return(
filteredMap.flatMap((cell) =>
  cell.variables.flatMap((variable) =>
    variable._inputs
      .map((input) => [variableToCell.get(variable), variableToCell.get(input)])
      .filter(([source, imported]) => imported && filter(imported))
  )
)
)}

function _cellMapModule(thisModule){return(
thisModule()
)}

function _38(md){return(
md`## testing`
)}

function _39(tests){return(
tests({
  filter: (t) =>
    t.name.includes("@tomlarkworthy/cell-map") || t.name.includes("main")
})
)}

function _modules(moduleMap,runtime){return(
moduleMap(runtime)
)}

function _moduleLookup(modules){return(
new Map([...modules.values()].map((info) => [info.name, info]))
)}

function _42(md){return(
md`low-level variables in this module`
)}

function _43(Inputs,runtime_variables,cellMapModule,toObject,modules){return(
Inputs.table(
  [...runtime_variables]
    .filter((v) => v._module == cellMapModule)
    .map(toObject),
  {
    columns: [
      "_name",
      "_inputs",
      "_definition",
      "_type",
      "_reachable",
      "_observer",
      "_module"
    ],
    format: {
      _inputs: (i) => i.map((i) => i._name).join(", "),
      _observer: (i) => i.toString(),
      _module: (m) => modules.get(m).name
    }
  }
)
)}

function _unreached_main_import(toObject,lookupVariable,cellMapModule){return(
toObject &&
  lookupVariable("repositionSetElement", cellMapModule)
)}

function _reached_main_import(runtime,lookupVariable,cellMapModule){return(
runtime && lookupVariable("runtime", cellMapModule)
)}

function _main_mutable(){return(
"OK"
)}

async function _test_importedModule(expect,modules,importedModule,reached_main_import,unreached_main_import)
{
  expect(modules.get(await importedModule(reached_main_import)).name).toBe(
    "@tomlarkworthy/module-map"
  );

  expect(modules.get(await importedModule(unreached_main_import)).name).toBe(
    "@tomlarkworthy/runtime-sdk"
  );

  return "ok";
}


async function _test_findModuleName(expect,findModuleName,importedModule,reached_main_import,modules,unreached_main_import)
{
  expect(
    findModuleName(await importedModule(reached_main_import), modules)
  ).toBe("@tomlarkworthy/module-map");

  expect(
    findModuleName(await importedModule(unreached_main_import), modules)
  ).toBe("@tomlarkworthy/runtime-sdk");

  return "ok";
}


async function _test_cellmap_mutable(main_mutable,lookupVariable,cellMapModule,cellMap,modules,expect)
{
  const initialMutable =
    main_mutable &&
    (await lookupVariable("initial main_mutable", cellMapModule));
  const mutableMutable =
    main_mutable &&
    (await lookupVariable("mutable main_mutable", cellMapModule));
  const mainMutable =
    main_mutable && (await lookupVariable("main_mutable", cellMapModule));
  const mapped = await cellMap(
    [initialMutable, mutableMutable, mainMutable],
    modules
  );
  const module = mapped.get(cellMapModule);
  expect(module).toHaveLength(1);
  const mutableCell = module[0];

  expect(mutableCell.type).toBe("mutable");
  expect(mutableCell.variables).toHaveLength(3);
  return mutableCell;
}


function _50(md){return(
md`### Ntoebook 2.0 Compatability`
)}

function _cellMapVizView($0){return(
$0
)}

function _52(md){return(
md`detailVizView = viewof detailViz`
)}

function _coverage_failures(runtime_variables,liveCellMap,modules)
{
  const byModule = new Map();
  for (const v of runtime_variables) {
    const m = v._module;
    let arr = byModule.get(m);
    if (!arr) byModule.set(m, (arr = []));
    arr.push(v);
  }

  const isDynamic = (v) =>
    typeof v?._name === "string" && v._name.startsWith("dynamic");

  const failures = [];
  for (const [m, vars] of byModule.entries()) {
    const cells = liveCellMap.get(m) || [];
    const covered = new Set(cells.flatMap((c) => c.variables || []));
    const missing = vars.filter(
      (v) => v._type == 1 && !isDynamic(v) && !covered.has(v)
    );
    if (missing.length) {
      const moduleName = modules?.get(m)?.name ?? "<unknown module>";
      failures.push({
        module: moduleName,
        missing: missing.map((v, i) => v._name ?? `<anonymous ${i}>`)
      });
    }
  }
  return failures;
}


function _test_cell_map_covers_all_runtime_variables(coverage_failures)
{
  if (coverage_failures.length) {
    debugger;
    throw JSON.stringify(coverage_failures);
  }
  return "pass";
}


function _test_cell_map_no_variable_in_more_than_one_cell(runtime_variables,liveCellMap,modules)
{
  runtime_variables;

  const where = new Map(); // variable -> Set(cellId)
  const add = (v, cellId) => {
    let s = where.get(v);
    if (!s) where.set(v, (s = new Set()));
    s.add(cellId);
  };

  for (const [m, cells] of liveCellMap.entries()) {
    const moduleName = modules?.get(m)?.name ?? "<unknown module>";
    for (const c of cells ?? []) {
      const cellId = `${moduleName}#${String(c?.name ?? "<unknown cell>")}`;
      const vars = c?.variables ?? [];
      const uniq = new Set(vars);
      for (const v of uniq) add(v, cellId);
    }
  }

  const failures = [];
  for (const [v, cellIds] of where.entries()) {
    if (cellIds.size > 1) {
      const vModuleName = modules?.get(v?._module)?.name ?? "<unknown module>";
      failures.push({
        variable_module: vModuleName,
        variable_name: v?._name ?? "<anonymous>",
        cells: [...cellIds]
      });
    }
  }

  if (failures.length) throw JSON.stringify(failures);
  return "pass";
}


function _56(md){return(
md`### Utilities`
)}

function _importedModule(){return(
async (v) => {
  if (
    // imported variable is observed
    v._inputs.length == 1 && // always a single dependancy
    v._inputs[0]._module !== v._module // bridging across modules
  )
    return v._inputs[0]._module;

  // Import from API
  // 'async () => runtime.module((await import("/@tomlarkworthy/exporter.js?v=4&resolutions=ab5a63c64de95b0d@298")).default)'
  /*
  if (
    v._inputs.length == 0 &&
    v._definition.toString().includes("runtime.module((await import")
  ) {
    debugger;
    v._value = await v._definition();
    return v._value;
  }*/
  if (
    // imported variable unobserved and loaded by API
    v._inputs.length == 2 && // always a single dependancy
    v._inputs[1]._name == "@variable" // bridging across modules
  ) {
    if (v._inputs[0]._value) return v._inputs[0]._value;
    else {
      return;
      //const module = await v._inputs[0]._definition();
      //debugger;
      //return module;
    }
  }

  // The inline case for live notebook
  // _definition: "async t=>t.import(e.name,e.alias,await i)"
  if (
    v._inputs.length == 1 &&
    v._inputs[0]._name == "@variable" &&
    v._definition.toString().includes("import(")
  ) {
    return await new Promise(async (resolve, reject) => {
      try {
        await v._definition({
          import: (...args) => resolve(args[2])
        });
      } catch (err) {
        if (v._definition.toString().includes("derive")) {
          console.error("Subbing derrived module for original", v);
          const derrived = await v._definition(v);
          resolve(derrived._source);
        } else {
          console.error("Cannot sourceModule for ", v);
          debugger;
          throw err;
        }
      }
    });
  }

  return null;
}
)}

function _findModuleName(){return(
(module, moduleMap, { unknown_id = Math.random() } = {}) => {
  try {
    const lookup = moduleMap.get(module);
    if (lookup) return lookup.name;
    return `<unknown ${unknown_id}>`;
  } catch (e) {
    debugger;
    return "error";
  }
}
)}

function _extractObservableNotebookNameFromSpecifier(){return(
(specifier) => {
  if (specifier == null) return null;
  const s = String(specifier);
  try {
    const u = new URL(s, "https://api.observablehq.com/");
    const p = u.pathname;
    let m = p.match(/\/(@[^/]+\/[^/]+)\.js$/);
    if (m) return m[1];
    m = p.match(/\/(d\/[0-9a-f]+@\d+)\.js$/);
    if (m) return m[1];
    m = p.match(/\/(d\/[0-9a-f]+)\.js$/);
    if (m) return m[1];
    return null;
  } catch {
    return null;
  }
}
)}

function _moduleVarInfo(extractObservableNotebookNameFromSpecifier){return(
async (v, moduleMapLike) => {
  const mod = v?._value ?? null;
  const nameFromMap =
    mod && moduleMapLike?.get?.(mod)?.name ? moduleMapLike.get(mod).name : null;

  const def = v?._definition;
  const defSrc = typeof def?.toString === "function" ? def.toString() : "";
  const m = defSrc.match(/\bimport\(\s*(['"])(.*?)\1\s*\)/);
  const specifier = m?.[2] ?? null;
  const nameFromSpecifier =
    extractObservableNotebookNameFromSpecifier(specifier);

  return {
    module: mod,
    name: nameFromMap ?? nameFromSpecifier ?? null,
    specifier
  };
}
)}

function _65(robocoop3){return(
robocoop3()
)}

function _66(robocoop2){return(
robocoop2()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof showBuiltins")).define("viewof showBuiltins", ["Inputs"], _showBuiltins);
  main.variable(observer("showBuiltins")).define("showBuiltins", ["Generators", "viewof showBuiltins"], (G, _) => G.input(_));
  main.variable(observer("viewof showAnon")).define("viewof showAnon", ["Inputs"], _showAnon);
  main.variable(observer("showAnon")).define("showAnon", ["Generators", "viewof showAnon"], (G, _) => G.input(_));
  main.variable(observer("viewof cellMapViz")).define("viewof cellMapViz", ["hash","Plot","width","d3","filteredMap","edges","linkTo","isOnObservableCom"], _cellMapViz);
  main.variable(observer("cellMapViz")).define("cellMapViz", ["Generators", "viewof cellMapViz"], (G, _) => G.input(_));
  main.variable(observer("detailVizTitle")).define("detailVizTitle", ["cellMapViz","linkTo","md"], _detailVizTitle);
  main.variable(observer("viewof detailViz")).define("viewof detailViz", ["Plot","width","nodes","variableToCell","modules","linkTo","isOnObservableCom"], _detailViz);
  main.variable(observer("detailViz")).define("detailViz", ["Generators", "viewof detailViz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Inputs","filteredMap"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof liveCellMap")).define("viewof liveCellMap", ["keepalive","cellMapModule","Inputs","cellMap"], _liveCellMap);
  main.variable(observer("liveCellMap")).define("liveCellMap", ["Generators", "viewof liveCellMap"], (G, _) => G.input(_));
  main.variable(observer("maintain_live_cell_map")).define("maintain_live_cell_map", ["runtime_variables","viewof liveCellMap","cellMap","Event"], _maintain_live_cell_map);
  main.variable(observer("usage")).define("usage", ["md"], _usage);
  main.variable(observer("cellMap")).define("cellMap", ["runtime","moduleMap","moduleVarInfo","importedModule","findModuleName","decompileImport"], _cellMap);
  main.variable(observer("test_cellmap_importInfo_on_real_import")).define("test_cellmap_importInfo_on_real_import", ["cellMap","expect"], _test_cellmap_importInfo_on_real_import);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("cellMapCompat")).define("cellMapCompat", ["cellMap"], _cellMapCompat);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("nodeToSymbol")).define("nodeToSymbol", ["variableToCell"], _nodeToSymbol);
  main.variable(observer("focus_variables")).define("focus_variables", ["cellMapViz","descendants","ascendants"], _focus_variables);
  main.variable(observer("focus_cells")).define("focus_cells", ["focus_variables","variableToCell"], _focus_cells);
  main.variable(observer("descendents")).define("descendents", ["d3","cellMapViz"], _descendents);
  main.variable(observer("dedupeHierarchy")).define("dedupeHierarchy", _dedupeHierarchy);
  main.variable(observer("layout")).define("layout", ["d3","descendents"], _layout);
  main.variable(observer("clustered")).define("clustered", ["dedupeHierarchy","layout"], _clustered);
  main.variable(observer("nodes")).define("nodes", ["clustered"], _nodes);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("runtimeMap")).define("runtimeMap", ["runtime_variables","liveCellMap"], _runtimeMap);
  main.variable(observer("variableToCell")).define("variableToCell", ["runtimeMap"], _variableToCell);
  main.variable(observer("filteredMap")).define("filteredMap", ["runtimeMap","filter"], _filteredMap);
  main.variable(observer("filter")).define("filter", ["showBuiltins","showAnon"], _filter);
  main.variable(observer("edges")).define("edges", ["filteredMap","variableToCell","filter"], _edges);
  const child1 = runtime.module(define1);
  main.import("linkTo", child1);
  main.import("isOnObservableCom", child1);
  const child2 = runtime.module(define2);
  main.import("moduleMap", child2);
  main.import("runtime", child2);
  const child3 = runtime.module(define3);
  main.import("keepalive", child3);
  main.import("runtime_variables", child3);
  main.import("lookupVariable", child3);
  main.import("thisModule", child3);
  main.import("toObject", child3);
  main.import("repositionSetElement", child3);
  main.import("ascendants", child3);
  main.import("descendants", child3);
  const child4 = runtime.module(define4);
  main.import("expect", child4);
  main.variable(observer("viewof cellMapModule")).define("viewof cellMapModule", ["thisModule"], _cellMapModule);
  main.variable(observer("cellMapModule")).define("cellMapModule", ["Generators", "viewof cellMapModule"], (G, _) => G.input(_));
  const child5 = runtime.module(define5);
  main.import("tests", child5);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["tests"], _39);
  main.variable(observer("modules")).define("modules", ["moduleMap","runtime"], _modules);
  main.variable(observer("moduleLookup")).define("moduleLookup", ["modules"], _moduleLookup);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["Inputs","runtime_variables","cellMapModule","toObject","modules"], _43);
  main.variable(observer("unreached_main_import")).define("unreached_main_import", ["toObject","lookupVariable","cellMapModule"], _unreached_main_import);
  main.variable(observer("reached_main_import")).define("reached_main_import", ["runtime","lookupVariable","cellMapModule"], _reached_main_import);
  main.define("initial main_mutable", _main_mutable);
  main.variable(observer("mutable main_mutable")).define("mutable main_mutable", ["Mutable", "initial main_mutable"], (M, _) => new M(_));
  main.variable(observer("main_mutable")).define("main_mutable", ["mutable main_mutable"], _ => _.generator);
  main.variable(observer("test_importedModule")).define("test_importedModule", ["expect","modules","importedModule","reached_main_import","unreached_main_import"], _test_importedModule);
  main.variable(observer("test_findModuleName")).define("test_findModuleName", ["expect","findModuleName","importedModule","reached_main_import","modules","unreached_main_import"], _test_findModuleName);
  main.variable(observer("test_cellmap_mutable")).define("test_cellmap_mutable", ["main_mutable","lookupVariable","cellMapModule","cellMap","modules","expect"], _test_cellmap_mutable);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("cellMapVizView")).define("cellMapVizView", ["viewof cellMapViz"], _cellMapVizView);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("coverage_failures")).define("coverage_failures", ["runtime_variables","liveCellMap","modules"], _coverage_failures);
  main.variable(observer("test_cell_map_covers_all_runtime_variables")).define("test_cell_map_covers_all_runtime_variables", ["coverage_failures"], _test_cell_map_covers_all_runtime_variables);
  main.variable(observer("test_cell_map_no_variable_in_more_than_one_cell")).define("test_cell_map_no_variable_in_more_than_one_cell", ["runtime_variables","liveCellMap","modules"], _test_cell_map_no_variable_in_more_than_one_cell);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("importedModule")).define("importedModule", _importedModule);
  main.variable(observer("findModuleName")).define("findModuleName", _findModuleName);
  main.variable(observer("extractObservableNotebookNameFromSpecifier")).define("extractObservableNotebookNameFromSpecifier", _extractObservableNotebookNameFromSpecifier);
  main.variable(observer("moduleVarInfo")).define("moduleVarInfo", ["extractObservableNotebookNameFromSpecifier"], _moduleVarInfo);
  const child6 = runtime.module(define6);
  main.import("hash", child6);
  const child7 = runtime.module(define7);
  main.import("decompileImport", child7);
  const child8 = runtime.module(define8);
  main.import("robocoop3", child8);
  const child9 = runtime.module(define9);
  main.import("robocoop2", child9);
  main.variable(observer()).define(["robocoop3"], _65);
  main.variable(observer()).define(["robocoop2"], _66);
  return main;
}
