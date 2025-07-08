import define1 from "./98f34e974bb2e4bc@650.js";
import define2 from "./f096db8fcbc444bf@563.js";

function _1(md){return(
md`# lopepage urls`
)}

function _2(md){return(
md`## Tests`
)}

function _3(tests){return(
tests()
)}

function _dslExamples(){return(
[
  "view=200@tomlarkworthy/slug,25@owner/page#cell",
  "view=@tomlarkworthy/slug,@owner/page",
  "view=C(@tomlarkworthy/slug,@owner/page)",
  "view=45@tomlarkworthy/slug,56@owner/page",
  "view=@tomlarkworthy/slug,R32(@owner/page,@owner/page2)",
  "view=200@tomlarkworthy/slug,25@owner/page",
  "C100(S50(@tomlarkworthy/module-selection),S50(@tomlarkworthy/dom-view))",
  "d/1f41fef8b019cf4e@94",
  "view=C100(S50(@tomlarkworthy/cells-to-clipboard,@tomlarkworthy/module-selection),S50(@tomlarkworthy/module-selection))",
  "R100(C50(S50(@tomlarkworthy/module-selection),S50(@tomlarkworthy/editor)),S50(@tomlarkworthy/svg-boinger))"
]
)}

function _parseViewDSL(){return(
function parseViewDSL(input) {
  if (!input)
    return {
      nodeType: "group",
      groupType: "S",
      weight: null,
      children: []
    };
  if (input.startsWith("view=")) {
    input = input.slice(5);
  }
  let i = 0;
  function err(msg) {
    throw new Error(msg + " at pos " + i + " for " + input);
  }
  function parseNumber() {
    let start = i;
    while (i < input.length && /[0-9]/.test(input[i])) {
      i++;
    }
    if (start === i) return null;
    return parseInt(input.slice(start, i), 10);
  }
  function parseModule() {
    let weight = parseNumber(); // optional
    if (input[i] == "@") {
      i++; // consume '@'
      let start = i;
      // Read slug until a comma or closing parenthesis.
      while (i < input.length && input[i] !== "," && input[i] !== ")") {
        i++;
      }
      let slug = "@" + input.slice(start, i).trim();
      return { nodeType: "module", weight, slug };
    } else if (input[i] == "d" && input[i + 1] == "/") {
      const start = i;
      let amp = Number.MAX_VALUE;
      while (i < input.length && input[i] !== "," && input[i] !== ")") {
        if (input[i] === "@") amp = i;
        i++;
      }
      let slug = input.slice(start, Math.min(amp, i)).trim();
      return { nodeType: "module", weight, slug };
    } else {
      err(`Expected ${input[i]}`);
    }
  }
  function parseGroup() {
    let groupType = "SCR".includes(input[i]) ? input[i++] : "S";
    let weight = parseNumber();
    if (input[i] == "(") i++; // skip '('
    let children = parseList();
    if (input[i] == ")") i++; // skip ')'
    return { nodeType: "group", groupType, weight, children };
  }
  function parseItem() {
    while (i < input.length && /\s/.test(input[i])) i++;
    if (i < input.length && "SCR".includes(input[i])) {
      return parseGroup();
    } else if (
      i < input.length &&
      (input[i] === "@" ||
        /[0-9]/.test(input[i]) ||
        (input[i] === "d" && input[i + 1] === "/"))
    ) {
      return parseModule();
    } else {
      err("Unexpected character: " + input[i]);
    }
  }
  function parseList() {
    let items = [];
    while (i < input.length && input[i] !== ")") {
      while (i < input.length && /\s/.test(input[i])) i++;
      items.push(parseItem());
      while (i < input.length && /\s/.test(input[i])) i++;
      if (i < input.length && input[i] === ",") {
        i++; // skip comma
      } else {
        break;
      }
    }
    return items;
  }
  const ast = parseGroup();
  while (i < input.length && /\s/.test(input[i])) i++;
  if (i < input.length) err("Unexpected input remaining");
  return ast;
}
)}

function _6(){return(
"SRC".includes("S")
)}

function _test_parseViewDSL(dslExamples,parseViewDSL){return(
dslExamples.map((dsl, idx) => parseViewDSL(dsl))
)}

function _convertToGoldenLayout(){return(
function convertToGoldenLayout(intermediate) {
  // Convert a module to a component.
  function convertModule(item) {
    return {
      type: "component",
      title: item.slug,
      weight: item.weight,
      size: "1fr",
      id: "",
      maximised: false,
      isClosable: true,
      reorderEnabled: true,
      componentType: "module",
      componentState: {}
    };
  }
  // Convert an item (module or group).
  function convertItem(item) {
    if (item.nodeType === "module") {
      return convertModule(item);
    } else if (item.nodeType === "group") {
      if (item.groupType === "S") {
        return {
          type: "stack",
          content: item.children.map(convertItem),
          weight: item.weight,
          id: "",
          maximised: false,
          isClosable: true,
          activeItemIndex: 0,
          size: "1fr"
        };
      }
      let containerType = item.groupType === "R" ? "row" : "column";
      return {
        type: containerType,
        weight: item.weight,
        content: item.children.map(convertItem),
        id: "",
        isClosable: true
      };
    }
    throw new Error("Unknown node type: " + item.nodeType);
  }

  return convertItem(intermediate);
}
)}

function _test_reserialized(dslExamples,convertToGoldenLayout,parseViewDSL){return(
dslExamples.map((dsl, idx) =>
  convertToGoldenLayout(parseViewDSL(dsl))
)
)}

function _normalizeWeights(){return(
function normalizeWeights(node) {
  if (node.content && node.content.length > 0) {
    let total = 0;
    for (const child of node.content) {
      total += child.weight || 100.0 / node.content.length;
    }
    for (const child of node.content) {
      let w = child.weight || 100.0 / node.content.length;
      child.size = ((w / total) * 100).toFixed(2) + "%";
      delete child.weight;
      normalizeWeights(child);
    }
  }
  if (!node.size) {
    node.size = "1fr";
    delete node.weight;
  }
}
)}

function _parseGoldenDSL(parseViewDSL,convertToGoldenLayout,normalizeWeights){return(
function parseGoldenDSL(dsl) {
  const intermediate = parseViewDSL(dsl);
  const glConfig = convertToGoldenLayout(intermediate);
  normalizeWeights(glConfig);
  return glConfig;
}
)}

function _layouts(dslExamples,parseGoldenDSL){return(
dslExamples.map((dsl, idx) => parseGoldenDSL(dsl))
)}

function _13(md){return(
md`## Serialization`
)}

function _serializeGoldenDSL(){return(
function serializeGoldenDSL(layout) {
  function serialize(node) {
    if (node.type === "component") {
      return `${node.title}`;
    }
    let size;
    if (node.size === "1fr" || !node.size.endsWith) {
      size = "100";
    } else {
      size = node.size.endsWith("%")
        ? Math.round(node.size.slice(0, -1))
        : Math.round(node.size);
    }

    const childrenStr = (node.content || []).map(serialize).join(",");
    if (node.type === "row") {
      return `R${size}(${childrenStr})`;
    } else if (node.type === "stack") {
      return `S${size}(${childrenStr})`;
    } else if (node.type === "column") {
      return `C${size}(${childrenStr})`;
    }
    throw new Error("Unknown node type: " + node.type);
  }
  return serialize(layout);
}
)}

function _test_serializeGoldenDSL(layouts,serializeGoldenDSL){return(
layouts.map(serializeGoldenDSL)
)}

function _test_parseGoldenDSL(test_serializeGoldenDSL,parseGoldenDSL){return(
test_serializeGoldenDSL.map(parseGoldenDSL)
)}

function _17(md){return(
md`## Flat listModules`
)}

function _listModules(_getModuleTitles,parseGoldenDSL){return(
(hash) => {
  if (!hash) return new Map();
  return new Map(
    _getModuleTitles(parseGoldenDSL(hash)).map((c) => [c.title, c])
  );
}
)}

function __getModuleTitles(){return(
function _getModuleTitles(ast) {
  let titles = [];
  if (ast.type === "component") {
    titles.push({
      title: ast.title.split("#")[0],
      cell: ast.title.split("#")[1]
    });
  }
  if (Array.isArray(ast.content)) {
    for (const child of ast.content) {
      titles = titles.concat(_getModuleTitles(child));
    }
  }
  return titles;
}
)}

function _test_list_modules(dslExamples,listModules){return(
dslExamples.map((dsl, idx) => listModules(dsl))
)}

function _21(md){return(
md`## Get cell`
)}

function _getCell(_getModuleTitles,parseGoldenDSL){return(
(hash, module) => {
  if (!hash) return undefined;
  return _getModuleTitles(parseGoldenDSL(hash));
}
)}

function _23(md){return(
md`## Add linkTo`
)}

function _isOnObservableCom(location){return(
() =>
  location.href.includes("observableusercontent.com") &&
  !location.href.includes("blob:")
)}

function _links(){return(
[
  "https://observablehq.com/@tom/foo",
  "https://observablehq.com/@tom/foo?query1#view=@tomlarkworthy/slug,@owner/page&foo=bar"
]
)}

function _targets(){return(
["@tom/bar", "d/1f41fef8b019cf4e@94", "@tom/bar#cell"]
)}

function _linkTo(isOnObservableCom,URLSearchParams,parseViewDSL,convertToGoldenLayout,normalizeWeights,serializeGoldenDSL){return(
function linkTo(
  module,
  { baseURI = document.baseURI, onObservable = isOnObservableCom() } = {}
) {
  if (onObservable) {
    return module.startsWith("#") ? module : "/" + module;
  }
  try {
    const base = new URL(baseURI);
    const hash = base.hash || "#";
    const baseHash = new URLSearchParams(hash.substring(1));
    const view = baseHash.get("view");
    const ast = parseViewDSL(view);
    ast.children.push({ nodeType: "module", weight: null, slug: module });
    const layout = convertToGoldenLayout(ast);
    normalizeWeights(layout);
    baseHash.set("view", serializeGoldenDSL(layout));
    base.hash = "#" + baseHash.toString();
    return base.toString();
  } catch (err) {
    console.error(err);
    debugger;
  }
}
)}

function _vars(variables,runtime){return(
variables(runtime)
)}

function _test_linkTo(links,targets,linkTo){return(
links.map((link) =>
  targets.map((target) =>
    linkTo(target, { baseURI: link, onObservable: false })
  )
)
)}

function _30(md){return(
md`## Auto switch to url structure

Watch the runtime for imports and swap them for our structure`
)}

function _href_examples(){return(
[
  "https://tomlarkworthy/import-notebook",
  "https://d/e1c39d41e8e944b0@939",
  "https://tomlarkworthy/visualizer#unorderedSync",
  "https://observablehq.com/@tomlarkworthy/robocoop",
  "https://observablehq.com/@tomlarkworthy/robocoop#on_prompt",
  "https://observablehq.com/d/936eb1bc1db1ac62",
  "@tomlarkworthy/robocoop#on_prompt"
]
)}

function _test_extractNotebookAndCell(href_examples,extractNotebookAndCell){return(
href_examples.map(extractNotebookAndCell)
)}

function _extractNotebookAndCell(){return(
function extractNotebookAndCell(href) {
  const regex =
    /^(https:\/\/(?<host>[\w.-]+)\/)?(?<nb>(@?[\w-]+\/[\w-]+|d\/[a-f0-9]+|e\/[a-f0-9]+@[0-9]+|[a-f0-9]+@[0-9]+|[\w-]+))(?:#(?<cell>[\w-]+))?$/;
  const match = href.match(regex);
  if (match && match.groups) {
    let notebook;
    if (match.groups.host === "observablehq.com") {
      notebook = match.groups.nb;
    } else {
      // For non-observablehq.com hosts, prepend the host.

      notebook = match.groups.host
        ? `${match.groups.host}/${match.groups.nb}`
        : match.groups.nb;
    }
    // Optionally, you can append an "@" to the notebook identifier later if needed,
    if (!notebook.startsWith("d/") && notebook[0] !== "@") {
      notebook = "@" + notebook;
    }

    notebook = notebook.replace(/@[0-9]+$/, "");
    return { notebook, cell: match.groups.cell || null };
  }
  return null;
}
)}

function _updateNotebookImports(vars,extractNotebookAndCell,linkTo)
{
  for (const variable of vars) {
    let import_dom;
    if (
      (import_dom = variable?._observer?._node?.firstChild) &&
      import_dom?.classList?.contains("observablehq--import")
    ) {
      import_dom.querySelectorAll("[href]").forEach((link) => {
        const extracted = extractNotebookAndCell(link.href);
        if (extracted) {
          link.href = linkTo(extracted.notebook);
        }
      });
    }
  }
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["tests"], _3);
  main.variable(observer("dslExamples")).define("dslExamples", _dslExamples);
  main.variable(observer("parseViewDSL")).define("parseViewDSL", _parseViewDSL);
  main.variable(observer()).define(_6);
  main.variable(observer("test_parseViewDSL")).define("test_parseViewDSL", ["dslExamples","parseViewDSL"], _test_parseViewDSL);
  main.variable(observer("convertToGoldenLayout")).define("convertToGoldenLayout", _convertToGoldenLayout);
  main.variable(observer("test_reserialized")).define("test_reserialized", ["dslExamples","convertToGoldenLayout","parseViewDSL"], _test_reserialized);
  main.variable(observer("normalizeWeights")).define("normalizeWeights", _normalizeWeights);
  main.variable(observer("parseGoldenDSL")).define("parseGoldenDSL", ["parseViewDSL","convertToGoldenLayout","normalizeWeights"], _parseGoldenDSL);
  main.variable(observer("layouts")).define("layouts", ["dslExamples","parseGoldenDSL"], _layouts);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("serializeGoldenDSL")).define("serializeGoldenDSL", _serializeGoldenDSL);
  main.variable(observer("test_serializeGoldenDSL")).define("test_serializeGoldenDSL", ["layouts","serializeGoldenDSL"], _test_serializeGoldenDSL);
  main.variable(observer("test_parseGoldenDSL")).define("test_parseGoldenDSL", ["test_serializeGoldenDSL","parseGoldenDSL"], _test_parseGoldenDSL);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("listModules")).define("listModules", ["_getModuleTitles","parseGoldenDSL"], _listModules);
  main.variable(observer("_getModuleTitles")).define("_getModuleTitles", __getModuleTitles);
  main.variable(observer("test_list_modules")).define("test_list_modules", ["dslExamples","listModules"], _test_list_modules);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("getCell")).define("getCell", ["_getModuleTitles","parseGoldenDSL"], _getCell);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("isOnObservableCom")).define("isOnObservableCom", ["location"], _isOnObservableCom);
  main.variable(observer("links")).define("links", _links);
  main.variable(observer("targets")).define("targets", _targets);
  main.variable(observer("linkTo")).define("linkTo", ["isOnObservableCom","URLSearchParams","parseViewDSL","convertToGoldenLayout","normalizeWeights","serializeGoldenDSL"], _linkTo);
  main.variable(observer("viewof vars")).define("viewof vars", ["variables","runtime"], _vars);
  main.variable(observer("vars")).define("vars", ["Generators", "viewof vars"], (G, _) => G.input(_));
  main.variable(observer("test_linkTo")).define("test_linkTo", ["links","targets","linkTo"], _test_linkTo);
  main.variable(observer()).define(["md"], _30);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("variables", child1);
  main.variable(observer("href_examples")).define("href_examples", _href_examples);
  main.variable(observer("test_extractNotebookAndCell")).define("test_extractNotebookAndCell", ["href_examples","extractNotebookAndCell"], _test_extractNotebookAndCell);
  main.variable(observer("extractNotebookAndCell")).define("extractNotebookAndCell", _extractNotebookAndCell);
  main.variable(observer("updateNotebookImports")).define("updateNotebookImports", ["vars","extractNotebookAndCell","linkTo"], _updateNotebookImports);
  const child2 = runtime.module(define2);
  main.import("tests", child2);
  return main;
}
