import define1 from "./0e0b35a92c819d94@470.js";
import define2 from "./e1c39d41e8e944b0@939.js";
import define3 from "./e3a019069a130d79@5468.js";
import define4 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# Userspace Notebook Serializer

Serailize literate notebooks into single files. Double click to open locally. No server required. Push to S3. Chain export your exports.
`
)}

function _notebook_style(htl){return(
htl.html`<style>
  /* General layout with max-width */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  max-width: 1000px; /* Adjusts the maximum width for readability */
  margin: 0 auto;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.observablehq {
  border: 1px solid #e0e0e0; /* Light gray border */
  border-radius: 8px; /* Rounds the corners */
  padding: 0.5rem; /* Adds space inside the cell */
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem; /* Adds space between cells */
  background-color: #ffffff; /* Optional: white background for contrast */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for depth */
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.25;
  font-weight: 600;
}
/* General layout */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
font-size: 1rem;
line-height: 1.4;
color: #333;
max-width: 100%;
margin: 0 auto;
padding: 1rem;
background-color: #f8f9fa;
border: 1px solid #e0e0e0;
border-radius: 6px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: #2c3e50;
  margin: 1.25rem 0 0.75rem;
  line-height: 1.25;
  font-weight: 600;
}

h1 { font-size: 1.75rem; }
h2 { font-size: 1.5rem; }
h3 { font-size: 1.25rem; }

/* Paragraphs */
p {
  margin: 0 0 1rem;
  word-wrap: break-word;
}

/* Code blocks */
pre, code {
  font-family: Menlo, Consolas, Monaco, "Courier New", monospace;
  font-size: 0.95rem;
  background: #f1f3f5;
  color: #2e2e2e;
  padding: 0.25em 0.5em;
  border-radius: 4px;
  overflow-x: auto;
}

pre {
  padding: 0.75rem;
  margin: 0 0 1rem;
}

/* Inline code */
code {
  font-size: 0.9rem;
  padding: 0.2rem 0.4rem;
  background: #f9f9f9;
  color: #c7254e;
}

/* Lists */
ul, ol {
  margin: 0 0 1rem 1.25rem;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

/* Links */
a {
  color: #007bff;
  text-decoration: underline;
}

a:hover {
  color: #0056b3;
  text-decoration: none;
}

/* Table styling */
table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-top: 1px solid #dee2e6;
}

th {
  background-color: #f1f3f5;
  font-weight: bold;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  font-size: 0.95rem;
  padding: 0.75rem;

  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.25rem; }
  h3 { font-size: 1.1rem; }
}
</style>`
)}

function _3($0,main){return(
$0.send(main)
)}

function _4($0){return(
$0
)}

function _export_module(Inputs,modules){return(
Inputs.select(modules)
)}

function _6(Inputs,createAndOpenUrl,$0,export_module){return(
Inputs.button("Preview", {
  reduce: async () =>
    createAndOpenUrl(await $0.send(export_module.module))
})
)}

function _7(Inputs,$0,export_module){return(
Inputs.button("Download", {
  reduce: async () => {
    const htmlContent = await $0.send(export_module.module);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.html";
    a.click();
    URL.revokeObjectURL(url);
  }
})
)}

function _createAndOpenUrl(){return(
(html) => {
  const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
  window.open(url, "_blank");
}
)}

function _12(md){return(
md`### Notebook Source Generator`
)}

function _main_module(flowQueue){return(
flowQueue()
)}

function _main_cells(cellMap,main){return(
cellMap(main)
)}

function _unresolved_main_modules(main_cells){return(
new Map(
  [...main_cells.entries()].filter(
    ([name, vars]) =>
      typeof name == "string" && name.startsWith("module <unknown")
  )
)
)}

function _pageImports(main_module,parser){return(
main_module &&
  new Map(
    [...document.querySelectorAll(".observablehq--import")]
      .map((e) => parser.parseCell(e.textContent))
      .map((node) => [
        node.body.source.value,
        node.body.specifiers.map((s) => ({
          ast: s,
          local: s.local.name,
          imported: s.imported.name
        }))
      ])
  )
)}

async function _pageImportMatcher(unresolved_main_modules,pageImports,sourceModule)
{
  const toDo = [...unresolved_main_modules.entries()].sort(
    ([_a, a], [_b, b]) => b.length - a.length
  ); // sort by length so we match on hardest first
  const matches = [];
  const unmatcheds = [];
  const moduleLookup = [];
  const resolution = [];
  while (toDo.length > 0) {
    const [name, variables] = toDo.shift();
    const match = pageImports.entries().find(([url, specifiers]) => {
      // looking for an import that has all the required variables
      return variables.every((v) =>
        specifiers.find((s) => {
          return s.local == v._name.split(" ").at(-1);
        })
      );
    });
    if (match) {
      const module = await sourceModule(variables[0]);
      matches.push([
        module,
        {
          name: match[0],
          variables,
          cell: name,
          spefifiers: match[1]
        }
      ]);
      resolution.push([name, match[0]]);
      moduleLookup.push([module, match[0]]);
    } else {
      unmatcheds.push([name, variables]);
    }
  }
  return {
    matches: new Map(matches),
    moduleLookup: new Map(moduleLookup),
    resolution: new Map(resolution),
    unmatcheds
  };
}


function _module_definition_variables(main){return(
[...main._runtime._variables].filter(
  (v) => v._name && v._name.startsWith("module ")
)
)}

function _other_modules_unfiltered(main_module,module_definition_variables,findModuleName,pageImportMatcher){return(
[...main_module._runtime._modules.entries()]
  .filter(([definie, module]) => module != main_module)
  .map(([define, module]) => {
    // find module that imports it
    const module_definition_variable = module_definition_variables.find(
      (v) => v._value == module
    );
    return {
      define,
      module_definition_variable,
      module,
      name: module_definition_variable
        ? findModuleName(module_definition_variable._module._scope, module)
        : pageImportMatcher.moduleLookup.get(module) || "TBD"
    };
  })
)}

function _excluded_module_names(){return(
["TBD", "error", "@tomlarkworthy/robocoop"]
)}

function _excluded_modules(other_modules_unfiltered,excluded_module_names){return(
other_modules_unfiltered.filter((m) =>
  excluded_module_names.includes(m.name)
)
)}

function _included_modules(other_modules_unfiltered,excluded_module_names){return(
other_modules_unfiltered.filter(
  (m) => !excluded_module_names.includes(m.name)
)
)}

function _findImports(pageImportMatcher){return(
(cells) =>
  [...cells.keys()]
    .filter((name) => typeof name === "string" && name.startsWith("module "))
    .map((name) => pageImportMatcher.resolution.get(name) || name)
    .map((name) => name.replace("module ", ""))
)}

async function _modules(main_module,included_modules,cellMap,pageImportMatcher,findImports,generate_module_source){return(
new Map(
  await Promise.all(
    [{ name: "main", module: main_module }, ...included_modules].map(
      async (spec) => {
        const cells = await cellMap(spec.module, {
          extraModuleLookup: pageImportMatcher.moduleLookup
        });
        const imports = findImports(cells);
        const source = await generate_module_source(cells, {
          extraModuleLookup: pageImportMatcher.moduleLookup
        });
        return [
          spec.name,
          {
            url: spec.name,
            imports,
            source: source,
            cells,
            module: spec.module,
            define: spec.define
          }
        ];
      }
    )
  )
)
)}

function _book(lopebook,modules){return(
lopebook({
  url: "main",
  modules
})
)}

function _26($0,book){return(
$0.resolve(book)
)}

function _27(md){return(
md`### Module Source Generator`
)}

function _generate_module_source(generate_definitions,generate_define){return(
async (
  cells,
  { extraModuleLookup = new Map() } = {}
) =>
  `${await generate_definitions(cells, { extraModuleLookup })}
${await generate_define(cells, { extraModuleLookup })}`
)}

function _generate_definitions(cellToDefinition){return(
async (cells) =>
  (
    await Promise.all(
      [...cells.entries()].map(([name, variables]) =>
        cellToDefinition(name, variables)
      )
    )
  )
    .flat()
    .join("")
)}

function _generate_define(cellToDefines){return(
async (cells, { extraModuleLookup } = {}) => {
  return `export default function define(runtime, observer) {
  const main = runtime.module();
${(
  await Promise.all(
    [...cells.entries()].map(([name, variables]) =>
      cellToDefines(name, variables, { extraModuleLookup })
    )
  )
)
  .flat()
  .join("\n")}
  return main;
}`;
}
)}

function _cellToDefinition(){return(
(name, variables) => {
  if (typeof name == "string") {
    if (name.startsWith("module ")) {
      return "";
    }
    if (name.startsWith("viewof ")) {
      name = name.replace("viewof ", "");
    } else {
      if (name.startsWith("mutable ")) {
        name = name.replace("mutable ", "");
      }
    }
  }
  return `const _${name} = ${variables[0]._definition.toString()};\n`;
}
)}

function _cellToDefines(sourceModule,findModuleName,findImportedName){return(
async (name, variables, { extraModuleLookup } = {}) => {
  const defines = [];
  if (typeof name === "string") {
    if (name.startsWith("module ")) {
      if (name === "module @tomlarkworthy/flow-queue") {
        debugger;
      }
      const module = await sourceModule(variables[0]);
      const moduleName =
        extraModuleLookup.get(module) || findModuleName(module, variables);
      defines.push(
        `  main.define("${name}", async () => runtime.module((await import("/${moduleName}.js?v=4&resolutions=03dda470c56b93ff@3898")).default));`
      );
      await Promise.all(
        variables.map(async (v) => {
          const importedName = await findImportedName(v);
          defines.push(
            `  main.define("${
              v._name
            }", ["${name}", "@variable"], (_, v) => v.import("${v._name}", ${
              importedName && importedName !== v._name
                ? `"${importedName}", `
                : ""
            }_));`
          );
        })
      );
    } else if (name.startsWith("viewof ")) {
      // viewof <name>
      const viewName = name.replace("viewof ", "");
      const v = variables[0];
      defines.push(
        `  main.variable(observer("${name}")).define("${name}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${viewName});`
      );
      defines.push(
        `  main.variable(observer("${viewName}")).define("${viewName}", ["Generators", "viewof ${viewName}"], (G, _) => G.input(_));`
      );
    } else if (name.startsWith("mutable ")) {
      /*
main.define("initial recomputeTrigger", _recomputeTrigger);
  main.variable(observer("mutable recomputeTrigger")).define("mutable recomputeTrigger", ["Mutable", "initial recomputeTrigger"], (M, _) => new M(_));
  main.variable(observer("recomputeTrigger")).define("recomputeTrigger", ["mutable recomputeTrigger"], _ => _.generator);
  
      */
      // viewof <name>
      const mutableName = name.replace("mutable ", "");
      const v = variables[0];
      defines.push(
        `  main.define("initial ${mutableName}", ${
          v._inputs.length > 0
            ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
            : ""
        }_${mutableName});`
      );
      defines.push(
        `  main.variable(observer("mutable ${mutableName}")).define("mutable ${mutableName}", ["Mutable", "initial ${mutableName}"], (M, _) => new M(_));`
      );
      defines.push(
        `  main.variable(observer("${mutableName}")).define("${mutableName}", ["mutable ${mutableName}"], _ => _.generator);`
      );
    }
  }

  if (defines.length == 0 && variables.length == 1) {
    const v = variables[0];
    defines.push(
      `  main.variable(observer(${v._name ? `"${v._name}"` : ""})).define(${
        v._name ? `"${v._name}", ` : ""
      }${
        v._inputs.length > 0
          ? `[${v._inputs.map((i) => `"${i._name.toString()}"`)}], `
          : ""
      }_${name});`
    );
  }
  return defines;
}
)}

function _33(md){return(
md`## Assemble `
)}

function _lopebook(notebook_style,lopemodule){return(
(bundle) => `
<base href="https://_"></base>
${notebook_style.outerHTML}
${[...bundle.modules.values()].map((module) => lopemodule(module)).join("")}
<script>
  window.onload = function() {
    const imports = {};
    [...document.querySelectorAll("script[type=lopebook-module]")].forEach(module => {
      const blob_url = URL.createObjectURL(new Blob([module.text], {
        type: "application/javascript"
      }));
      if (module.id[0] == "/") module.id = module.id.substring(1);
      imports[module.id] = blob_url;
    });
    
    const importmap = document.createElement("script");
    importmap.type = "importmap";
    importmap.text = JSON.stringify({imports}, null, 2);
    document.body.append(importmap);

    const main = document.createElement("script");
    main.type = "module";
    main.text =
\`
import define from "${bundle.url}";

import { Runtime, Library, Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
const runtime = new Runtime();
debugger;
const main = runtime.module(define, Inspector.into(document.body));
\`;
    document.body.append(main);
  }
</script>`
)}

function _lopemodule(escapeScriptTags,rewriteImports){return(
(module) => `<script type="lopebook-module" id="${module.url}">
${escapeScriptTags(rewriteImports(module))}
</script>`
)}

function _escapeScriptTags(){return(
(str) => str.replaceAll("</script", "</scr\\ipt")
)}

function _rewriteImports(){return(
(module) => {
  let modified = module.source;
  module.imports.forEach((i) => {
    modified = modified.replaceAll(
      new RegExp('"/?' + i + '.*"', "g"),
      `"${i}"`
    );
  });
  return modified;
}
)}

function _38(md){return(
md`### Test Module Generator

We test the notebook by comparing the Observable API module definition to a runtime synthesised one`
)}

function _test_module_selection(Inputs){return(
Inputs.select(
  [
    "https://api.observablehq.com/@tomlarkworthy/exporter.js?v=4",
    "https://api.observablehq.com/@mootari/access-runtime.js?v=4",
    "https://api.observablehq.com/@tomlarkworthy/flow-queue.js?v=4"
  ],
  { width: "100%" }
)
)}

function _test_notebook(test_module_selection){return(
import(test_module_selection)
)}

function _test_notebook_define(test_notebook){return(
test_notebook.default.toString()
)}

function _lopecode_generated_define(generate_define,test_notebook_cell_map,pageImportMatcher){return(
generate_define(test_notebook_cell_map, {
  extraModuleLookup: pageImportMatcher.moduleLookup
})
)}

function _differences(compareDefines,lopecode_generated_define,test_notebook_define){return(
compareDefines(lopecode_generated_define, test_notebook_define)
)}

async function _test_notebook_module(test_module_selection)
{
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(test_module_selection)
  ]);
  return new Runtime().module(define);
}


function _test_notebook_cell_map(cellMap,test_notebook_module){return(
cellMap(test_notebook_module)
)}

function _compareDefines(){return(
{
  prompt:
    'The example_module_generated_define and example_module_define should be the same, lets build a helper for the comparing differences. The order of lines is not important. The output should be an object `{errors: 5, extraLines: ["...."], missingLists[]}`',
  time: 1728887073377
} &&
  /**
   * Compares two define functions and returns the differences.
   * @param {string} define1 - The first define function as a string.
   * @param {string} define2 - The second define function as a string.
   * @returns {Object} An object containing the number of errors, extra lines, and missing lines.
   */ function compareDefines(define1, define2) {
    // Split the defines into lines and trim whitespace
    const lines1 = define1
      .split("\n")
      .map((line) => line.trim().replace(/_\d+/g, "_ANON"))
      .map((line) => line.trim().replace(/module \S+/g, "module X"))
      .filter((line) => line);
    const lines2 = define2
      .split("\n")
      .map((line) => line.trim().replace(/_\d+/g, "_ANON"))
      .map((line) => line.trim().replace(/module \S+/g, "module X"))
      .filter((line) => line);

    // Create sets for efficient lookup
    const set1 = new Set(lines1);
    const set2 = new Set(lines2);

    // Find extra lines in define1 that are not in define2
    const extraLines = [...set1].filter((line) => !set2.has(line)).sort();

    // Find missing lines in define1 that are present in define2
    const missingLines = [...set2].filter((line) => !set1.has(line)).sort();

    // Calculate the total number of differences
    const errors = extraLines.length + missingLines.length;

    return { errors, extraLines, missingLines };
  }
)}

function _47(md){return(
md`### Generating Module

`
)}

function _generated_module_source_url(example_module_source){return(
URL.createObjectURL(
  new Blob([example_module_source], {
    type: "application/javascript"
  })
)
)}

function _example_module_source(generate_module_source,example_map){return(
generate_module_source(example_map)
)}

function _50(md){return(
md`## Example Lopebook`
)}

function _example_map(cellMap,main)
{
  debugger;
  return cellMap(main);
}


function _example_main_source(generate_module_source,example_map){return(
generate_module_source(example_map)
)}

function _dependants(runtime,findModuleName){return(
[...runtime._modules.entries()].map(([define, module]) => ({
  define,
  module,
  name: findModuleName(module)
}))
)}

function _dependant_maps(dependants){return(
new Map(
  dependants
    .filter((dep) => !dep.name.startsWith("error"))
    .map((dep) => {
      return [dep.name, { ...dep }];
    })
)
)}

function _main_imports(example_map){return(
[...example_map.keys()]
  .filter((k) => typeof k === "string" && k.startsWith("module "))
  .map((k) => k.replace("module ", ""))
)}

function _57(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("notebook_style")).define("notebook_style", ["htl"], _notebook_style);
  main.variable(observer()).define(["viewof main_module","main"], _3);
  main.variable(observer()).define(["viewof ex_refresh"], _4);
  main.variable(observer("viewof export_module")).define("viewof export_module", ["Inputs","modules"], _export_module);
  main.variable(observer("export_module")).define("export_module", ["Generators", "viewof export_module"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","createAndOpenUrl","viewof main_module","export_module"], _6);
  main.variable(observer()).define(["Inputs","viewof main_module","export_module"], _7);
  main.variable(observer("createAndOpenUrl")).define("createAndOpenUrl", _createAndOpenUrl);
  const child1 = runtime.module(define1);
  main.import("flowQueue", child1);
  const child2 = runtime.module(define2);
  main.import("runtime", child2);
  main.import("main", child2);
  main.import("observed", child2);
  main.import("viewof ex_refresh", child2);
  main.import("ex_refresh", child2);
  const child3 = runtime.module(define3);
  main.import("compile", child3);
  main.import("cellMap", child3);
  main.import("decompile", child3);
  main.import("findModuleName", child3);
  main.import("sourceModule", child3);
  main.import("findImportedName", child3);
  main.import("variableToObject", child3);
  main.import("parser", child3);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof main_module")).define("viewof main_module", ["flowQueue"], _main_module);
  main.variable(observer("main_module")).define("main_module", ["Generators", "viewof main_module"], (G, _) => G.input(_));
  main.variable(observer("main_cells")).define("main_cells", ["cellMap","main"], _main_cells);
  main.variable(observer("unresolved_main_modules")).define("unresolved_main_modules", ["main_cells"], _unresolved_main_modules);
  main.variable(observer("pageImports")).define("pageImports", ["main_module","parser"], _pageImports);
  main.variable(observer("pageImportMatcher")).define("pageImportMatcher", ["unresolved_main_modules","pageImports","sourceModule"], _pageImportMatcher);
  main.variable(observer("module_definition_variables")).define("module_definition_variables", ["main"], _module_definition_variables);
  main.variable(observer("other_modules_unfiltered")).define("other_modules_unfiltered", ["main_module","module_definition_variables","findModuleName","pageImportMatcher"], _other_modules_unfiltered);
  main.variable(observer("excluded_module_names")).define("excluded_module_names", _excluded_module_names);
  main.variable(observer("excluded_modules")).define("excluded_modules", ["other_modules_unfiltered","excluded_module_names"], _excluded_modules);
  main.variable(observer("included_modules")).define("included_modules", ["other_modules_unfiltered","excluded_module_names"], _included_modules);
  main.variable(observer("findImports")).define("findImports", ["pageImportMatcher"], _findImports);
  main.variable(observer("modules")).define("modules", ["main_module","included_modules","cellMap","pageImportMatcher","findImports","generate_module_source"], _modules);
  main.variable(observer("book")).define("book", ["lopebook","modules"], _book);
  main.variable(observer()).define(["viewof main_module","book"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("generate_module_source")).define("generate_module_source", ["generate_definitions","generate_define"], _generate_module_source);
  main.variable(observer("generate_definitions")).define("generate_definitions", ["cellToDefinition"], _generate_definitions);
  main.variable(observer("generate_define")).define("generate_define", ["cellToDefines"], _generate_define);
  main.variable(observer("cellToDefinition")).define("cellToDefinition", _cellToDefinition);
  main.variable(observer("cellToDefines")).define("cellToDefines", ["sourceModule","findModuleName","findImportedName"], _cellToDefines);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("lopebook")).define("lopebook", ["notebook_style","lopemodule"], _lopebook);
  main.variable(observer("lopemodule")).define("lopemodule", ["escapeScriptTags","rewriteImports"], _lopemodule);
  main.variable(observer("escapeScriptTags")).define("escapeScriptTags", _escapeScriptTags);
  main.variable(observer("rewriteImports")).define("rewriteImports", _rewriteImports);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("viewof test_module_selection")).define("viewof test_module_selection", ["Inputs"], _test_module_selection);
  main.variable(observer("test_module_selection")).define("test_module_selection", ["Generators", "viewof test_module_selection"], (G, _) => G.input(_));
  main.variable(observer("test_notebook")).define("test_notebook", ["test_module_selection"], _test_notebook);
  main.variable(observer("test_notebook_define")).define("test_notebook_define", ["test_notebook"], _test_notebook_define);
  main.variable(observer("lopecode_generated_define")).define("lopecode_generated_define", ["generate_define","test_notebook_cell_map","pageImportMatcher"], _lopecode_generated_define);
  main.variable(observer("differences")).define("differences", ["compareDefines","lopecode_generated_define","test_notebook_define"], _differences);
  main.variable(observer("test_notebook_module")).define("test_notebook_module", ["test_module_selection"], _test_notebook_module);
  main.variable(observer("test_notebook_cell_map")).define("test_notebook_cell_map", ["cellMap","test_notebook_module"], _test_notebook_cell_map);
  main.variable(observer("compareDefines")).define("compareDefines", _compareDefines);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("generated_module_source_url")).define("generated_module_source_url", ["example_module_source"], _generated_module_source_url);
  main.variable(observer("example_module_source")).define("example_module_source", ["generate_module_source","example_map"], _example_module_source);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("example_map")).define("example_map", ["cellMap","main"], _example_map);
  main.variable(observer("example_main_source")).define("example_main_source", ["generate_module_source","example_map"], _example_main_source);
  main.variable(observer("dependants")).define("dependants", ["runtime","findModuleName"], _dependants);
  main.variable(observer("dependant_maps")).define("dependant_maps", ["dependants"], _dependant_maps);
  main.variable(observer("main_imports")).define("main_imports", ["example_map"], _main_imports);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _57);
  return main;
}
