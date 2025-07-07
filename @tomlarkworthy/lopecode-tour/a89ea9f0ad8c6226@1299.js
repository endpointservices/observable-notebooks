import define1 from "./a6a56ee61aba9799@406.js";
import define2 from "./db42ae70222a8b08@995.js";
import define3 from "./98f34e974bb2e4bc@650.js";
import define4 from "./db80e603859226c1@23.js";
import define5 from "./f096db8fcbc444bf@563.js";
import define6 from "./57d79353bac56631@44.js";

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
        href: (cell) => {
          debugger;
          return linkTo(`${cell}`);
        },
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

function _usage(md){return(
md`## cellMap function

You can call it with zero args to default to the current runtime, or pass in a subset of variables to extract the cell structure from just those.

\`\`\`js
import {cellMap} from "@tomlarkworthy/cell-map"
\`\`\`

If you wanted to use the visualizations in your own notebooks. You would import the views e.g.

\`\`\`js
import {viewof cellMapViz, viewof detailViz, detailVizTitle} from "@tomlarkworthy/cell-map"
\`\`\`

and then call them in your notebooks`
)}

function _cellMap(runtime,moduleMap,importedModule,findModuleName){return(
async (variables, _moduleMap) => {
  if (!variables) variables = runtime._variables;
  if (!_moduleMap) _moduleMap = await moduleMap(runtime);

  // do one module at a time
  const map = new Map();
  const modules = new Map();
  [...variables].forEach((v) => {
    const info = _moduleMap.get(v._module);
    if (!info) {
      debugger;
      return;
    }
    if (!modules.has(info.module)) {
      modules.set(info.module, []);
    }
    modules.get(info.module).push(v);
  });

  let c = 0;

  await Promise.all(
    [...modules.keys()].map(async (m) => {
      const variables = modules.get(m);
      const cells = new Map();
      try {
        const viewofs = new Set();
        const mutables = new Set();
        const imports = new Map();

        const sources = new Map(
          await Promise.all(
            variables
              .filter((v) => v._name)
              .map(async (v) => [v._name, await importedModule(v)])
          )
        );

        const moduleNamesPromises = new Map();

        const groups = variables.reduce((groups, v) => {
          if (v._name) {
            const source = sources.get(v._name);
            if (source) {
              if (!imports.has(source)) {
                imports.set(source, []);
                moduleNamesPromises.set(
                  source,
                  findModuleName(source, _moduleMap, {
                    unknown_id: v._name
                  })
                );
              }
              imports.get(source).push(v);
            } else if (v._name.startsWith("viewof ")) {
              cells.set(v, {
                type: "viewof",
                lang: ["ojs"]
              });
              viewofs.add(v);
              groups.set(v._name, []);
            } else if (v._name.startsWith("mutable ")) {
              debugger;
              const vars = [];
              cells.set(v, {
                type: "mutable",
                lang: ["ojs"]
              });
              mutables.add(v);
              groups.set(v._name, vars);
            } else if (v._name.startsWith("module ")) {
              // skip these
            } else if (v._name.startsWith("dynamic ")) {
              // skip these
            } else {
              cells.set(v, {
                type: "simple",
                lang: ["ojs"]
              });
              groups.set(v._name, [v]);
            }
          } else {
            cells.set(v, {
              type: "simple",
              lang: ["ojs"]
            });
            groups.set(c++, [v]);
          }
          return groups;
        }, new Map());

        const moduleNames = new Map(
          await Promise.all(
            [...moduleNamesPromises.entries()].map(async ([k, v]) => [
              k,
              await v
            ])
          )
        );
        for (const v of viewofs) {
          const name = v._name.substring(7);
          if (groups.has(name)) {
            groups.get(v._name).push(...[v, groups.get(name)[0]]);
            groups.delete(name);
          } else {
            groups.delete(v._name);
          }
        }

        for (const v of mutables) {
          debugger;
          const name = v._name.substring(8);
          const intital = "initial " + name;
          if (groups.has(name) && groups.has(intital)) {
            groups
              .get(v._name)
              .push(...[groups.get(intital)?.[0], v, groups.get(name)[0]]);

            cells.delete(groups.get(intital)[0]);
            cells.delete(groups.get(name)[0]);
            groups.delete(intital);
            groups.delete(name);
          } else {
            cells.delete(groups.get(v._name)[0]);
            cells.delete(groups.get(intital)[0]);
            cells.delete(groups.get(name)[0]);
            groups.delete(v._name);
            groups.delete(intital);
            groups.delete(name);
          }
        }

        for (const [module, variables] of imports.entries()) {
          cells.set(variables[0], {
            type: "import",
            lang: ["ojs"]
          });
          const name = `module ${moduleNames.get(module)}`;
          groups.set(name, variables);
        }

        map.set(
          m,
          [...groups.entries()].map(([name, variables]) => ({
            name,
            module: _moduleMap.get(variables[0]._module).name,
            ...cells.get(
              typeof name == "string" && name.startsWith("mutable")
                ? variables[1]
                : variables[0]
            ),
            variables: variables
          }))
        );
      } catch (e) {
        debugger;
        throw e;
      }
    })
  );
  return map;
}
)}

function _11(md){return(
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

function _20(md){return(
md`### visualize the cell ordering`
)}

async function _runtimeMap(runtime_variables,cellMap)
{
  runtime_variables;
  return [...(await cellMap()).values()].flat();
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

function _32(md){return(
md`## testing`
)}

function _33(tests){return(
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

function _36(md){return(
md`low-level variables in this module`
)}

function _37(Inputs,runtime_variables,cellMapModule,toObject,modules){return(
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


function _43(cellMap,unreached_main_import,reached_main_import,modules){return(
cellMap(new Set([unreached_main_import, reached_main_import]), modules)
)}

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


function _45(md){return(
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
  main.variable(observer("usage")).define("usage", ["md"], _usage);
  main.variable(observer("cellMap")).define("cellMap", ["runtime","moduleMap","importedModule","findModuleName"], _cellMap);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("nodeToSymbol")).define("nodeToSymbol", ["variableToCell"], _nodeToSymbol);
  main.variable(observer("focus_variables")).define("focus_variables", ["cellMapViz","descendants","ascendants"], _focus_variables);
  main.variable(observer("focus_cells")).define("focus_cells", ["focus_variables","variableToCell"], _focus_cells);
  main.variable(observer("descendents")).define("descendents", ["d3","cellMapViz"], _descendents);
  main.variable(observer("dedupeHierarchy")).define("dedupeHierarchy", _dedupeHierarchy);
  main.variable(observer("layout")).define("layout", ["d3","descendents"], _layout);
  main.variable(observer("clustered")).define("clustered", ["dedupeHierarchy","layout"], _clustered);
  main.variable(observer("nodes")).define("nodes", ["clustered"], _nodes);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("runtimeMap")).define("runtimeMap", ["runtime_variables","cellMap"], _runtimeMap);
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
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["tests"], _33);
  main.variable(observer("modules")).define("modules", ["moduleMap","runtime"], _modules);
  main.variable(observer("moduleLookup")).define("moduleLookup", ["modules"], _moduleLookup);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["Inputs","runtime_variables","cellMapModule","toObject","modules"], _37);
  main.variable(observer("unreached_main_import")).define("unreached_main_import", ["toObject","lookupVariable","cellMapModule"], _unreached_main_import);
  main.variable(observer("reached_main_import")).define("reached_main_import", ["runtime","lookupVariable","cellMapModule"], _reached_main_import);
  main.define("initial main_mutable", _main_mutable);
  main.variable(observer("mutable main_mutable")).define("mutable main_mutable", ["Mutable", "initial main_mutable"], (M, _) => new M(_));
  main.variable(observer("main_mutable")).define("main_mutable", ["mutable main_mutable"], _ => _.generator);
  main.variable(observer("test_importedModule")).define("test_importedModule", ["expect","modules","importedModule","reached_main_import","unreached_main_import"], _test_importedModule);
  main.variable(observer("test_findModuleName")).define("test_findModuleName", ["expect","findModuleName","importedModule","reached_main_import","modules","unreached_main_import"], _test_findModuleName);
  main.variable(observer()).define(["cellMap","unreached_main_import","reached_main_import","modules"], _43);
  main.variable(observer("test_cellmap_mutable")).define("test_cellmap_mutable", ["main_mutable","lookupVariable","cellMapModule","cellMap","modules","expect"], _test_cellmap_mutable);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("importedModule")).define("importedModule", _importedModule);
  main.variable(observer("findModuleName")).define("findModuleName", _findModuleName);
  const child6 = runtime.module(define6);
  main.import("hash", child6);
  return main;
}
