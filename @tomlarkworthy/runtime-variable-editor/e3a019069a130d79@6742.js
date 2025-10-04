import define1 from "./f096db8fcbc444bf@565.js";
import define2 from "./a89ea9f0ad8c6226@1403.js";
import define3 from "./f550ddbdb36998cb@132.js";
import define4 from "./ba7429882b352b5b@18.js";
import define5 from "./db80e603859226c1@23.js";

function _1(md){return(
md`# Bidirectional Observable JS <=> Runtime Toolchain

\`\`\`js
import {decompile, compile, cellMap} from "@tomlarkworthy/observablejs-toolchain"
\`\`\``
)}

function _2(md){return(
md`### Compilation, source to runtime variable(s)

Compilation takes notebook source cells written in \`Observable Javascript\` and turns them into reactive variables for execution in the \`Observable Runtime\`. A cell is usually compiled to one runtime variable, however, mutable variables are more complicated and are represented as three runtime variables.

ObservableHQ does the compilation process as part of the hosted notebook experience but in this notebook we provide a way to do it in userspace.`
)}

function _3(md){return(
md`### Decompilation, Runtime variables(s) to source
The aim of decompilation is to go from the live runtime variable definitions, back to the source as best as possible. ObseervableHQ does not have this feature. In this notebook we implement it in userspace.
`
)}

function _4(md){return(
md`### Codeveloped with AI

This notebook is setup for was AI collaboration. Important runtime values, such as the test suite report, are highlighted to the LLM, which helps it decide how to fix test cases.`
)}

function _5(md){return(
md`### Prior work

_Alex Garcia_ pioneered the first third-party Observable **_compiler_** [[asg017/unofficial-observablehq-compiler](https://github.com/asg017/unofficial-observablehq-compiler)]. The compiler here differs by being entirely text/data based, _i.e._ the output is a string/JSON, not hydrated variables and functions.

This is the first **_decompiler_**.`
)}

function _6(md){return(
md`## TODO
- Tagged templates (decompilation works, but there is no source compile for them)
- notebook imports (WIP some decompilation works)
   - need to dedupe some of the implied imports, e.g. \`viewof foo\` also imports \`foo\` but we don't need to explicitly import \`foo\`, it's implied
- anonymous variables work, but the test cases fail due to naming mismatches
- Bug with unobserved module imports, moduleSource does not resolve, we just adjusted source to avoid that problem now 
- cellmap: assigning an imported viewof to a variable creates two cells where there should be 1
- class body assignments can't be decompiled`
)}

function _observable(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

function _8(md){return(
md`## Continuous Integration Testing

We sniff the entire runtime to test that each cell is de-compilable`
)}

function _10(tests){return(
tests()
)}

function _11(md){return(
md`### All cells are decompileable`
)}

function _cellMaps(cellMap2){return(
cellMap2()
)}

function _allCells(cellMaps){return(
[...cellMaps.values()]
  .map((cells) =>
    [...cells.values()]
      .filter((c) => c.module !== "builtin")
      .map((c) => c.variables)
  )
  .flat()
)}

function _all_decompiled(allCells,decompile){return(
Promise.all(
  allCells.map(async (cell) => {
    try {
      return {
        cell,
        source: await decompile(cell)
      };
    } catch (error) {
      return {
        cell,
        error
      };
    }
  })
)
)}

function _test_all_cells_decompilable(all_decompiled)
{
  const errors = all_decompiled.filter((s) => s.error);
  if (errors.length > 0) throw errors;
  return `${all_decompiled.length} cells decompiled without error`;
}


function _16(md){return(
md`### All decompiled cells can be recompiled`
)}

function _all_compiled(all_decompiled,compile){return(
all_decompiled
  .filter((source) => !source.error)
  .map((source) => {
    try {
      return {
        ...source,
        compiled: compile(source.source)
      };
    } catch (error) {
      return {
        ...source,
        error
      };
    }
  })
)}

function _test_decompiled_cells_recompilable(all_compiled)
{
  const errored = all_compiled.filter((cell) => cell.error);
  if (errored.length > 0) throw JSON.stringify(errored, null, 2);
  return `${all_compiled.length} cells recompiled without error`;
}


function _19(md){return(
md`### All cells roundtrip compile`
)}

function _roundtripped(all_compiled,decompile){return(
Promise.all(
  all_compiled
    .filter((c) => !c.error)
    .map(async (cell) => {
      try {
        const decompiled = await decompile(cell.compiled);
        return {
          ...cell,
          decompiled
        };
      } catch (error) {
        return {
          ...cell,
          error
        };
      }
    })
)
)}

function _test_all_cells_roundtrippable(roundtripped)
{
  const errored = roundtripped.filter((cell) => cell.error);
  if (errored.length > 0) throw JSON.stringify(errored, null, 2);
  return `${roundtripped} cells decompiled, recompiled and decompiled again without error`;
}


function _22(md){return(
md`## Reference Data`
)}

function _23(md){return(
md`### Source code
The source code of a [reference notebook](https://observablehq.com/@tomlarkworthy/notebook-semantics?collection=@tomlarkworthy/lopebook) is extracted directly from the \`https://api.observablehq.com/document/...\` endpoint
`
)}

function _dependancy_document(){return(
{
  id: "1fb3132464653a8f",
  slug: "dependancy",
  trashed: false,
  description: "",
  likes: 0,
  publish_level: "live_unlisted",
  forks: 0,
  fork_of: null,
  has_importers: true,
  update_time: "2024-10-15T18:06:59.080Z",
  first_public_version: 16,
  paused_version: null,
  publish_time: "2024-10-15T18:07:25.850Z",
  publish_version: 16,
  latest_version: 16,
  thumbnail: "52bb3d5b2f48b727e0eea931c0093fe5778fb9b809bebb1edfb949d2f4b5590a",
  default_thumbnail:
    "52bb3d5b2f48b727e0eea931c0093fe5778fb9b809bebb1edfb949d2f4b5590a",
  roles: [],
  sharing: null,
  owner: {
    id: "7db5ed2b0697d645",
    avatar_url:
      "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
    login: "tomlarkworthy",
    name: "Tom Larkworthy",
    bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
    home_url: "https://taktile.com",
    type: "team",
    tier: "starter_2024"
  },
  creator: {
    id: "5215f6ec4a999d40",
    avatar_url:
      "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
    login: "tomlarkworthy",
    name: "Tom Larkworthy",
    bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
    home_url: "https://taktile.com",
    tier: "pro"
  },
  authors: [
    {
      id: "5215f6ec4a999d40",
      avatar_url:
        "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
      name: "Tom Larkworthy",
      login: "tomlarkworthy",
      bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
      home_url: "https://taktile.com",
      tier: "pro",
      approved: true,
      description: ""
    }
  ],
  collections: [
    {
      id: "cf72f19f55f3a048",
      type: "public",
      slug: "lopebook",
      title: "lopebook",
      description: "",
      update_time: "2024-10-11T18:10:59.078Z",
      pinned: false,
      ordered: false,
      custom_thumbnail: null,
      default_thumbnail: null,
      thumbnail: null,
      listing_count: 0,
      parent_collection_count: 0,
      owner: {
        id: "7db5ed2b0697d645",
        avatar_url:
          "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
        login: "tomlarkworthy",
        name: "Tom Larkworthy",
        bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
        home_url: "https://taktile.com",
        type: "team",
        tier: "starter_2024"
      }
    }
  ],
  files: [],
  comments: [],
  commenting_lock: null,
  suggestion_from: null,
  suggestions_to: [],
  version: 16,
  title: "Dependancy",
  license: null,
  copyright: "",
  nodes: [
    {
      id: 0,
      value: "# Dependancy",
      pinned: false,
      mode: "md",
      data: null,
      name: ""
    },
    {
      id: 7,
      value: 'dep = "a"',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 9,
      value: "viewof viewdep = Inputs.input()",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 11,
      value: "mutable mutabledep = ({})",
      pinned: false,
      mode: "js",
      data: null,
      name: null
    }
  ],
  resolutions: [],
  schedule: null,
  last_view_time: null
}
)}

function _dependancy_source(dependancy_document){return(
dependancy_document.nodes.map((s) => ({
  value: s.value,
  name: s.name
}))
)}

function _26(md){return(
md`
\`\`\`
curl https://api.observablehq.com/document/@tomlarkworthy/notebook-semantics
\`\`\``
)}

function _notebook_semantics_document(){return(
{
  id: "483a346021943f64",
  slug: "notebook-semantics",
  trashed: false,
  description: "",
  likes: 0,
  publish_level: "live_unlisted",
  forks: 0,
  fork_of: null,
  has_importers: false,
  update_time: "2025-03-17T18:36:45.520Z",
  first_public_version: 90,
  paused_version: null,
  publish_time: "2024-10-15T18:29:58.853Z",
  publish_version: 152,
  latest_version: 152,
  thumbnail: "10dc93e33f09bad8366c143415404f378b6bd94f1148589113ff5fb2d22573ee",
  default_thumbnail:
    "10dc93e33f09bad8366c143415404f378b6bd94f1148589113ff5fb2d22573ee",
  roles: [],
  sharing: null,
  edits: [
    { node_id: 48, value: 'file = FileAttachment("empty")' },
    { node_id: 55, value: "mutable_dep_2 = {\n  file;\n  return q + 1;\n}" },
    { node_id: 151, value: "thisReference = (this || 0) + 1" }
  ],
  owner: {
    id: "7db5ed2b0697d645",
    avatar_url:
      "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
    login: "tomlarkworthy",
    name: "Tom Larkworthy",
    bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
    home_url: "https://taktile.com",
    type: "team",
    tier: "starter_2024"
  },
  creator: {
    id: "5215f6ec4a999d40",
    avatar_url:
      "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
    login: "tomlarkworthy",
    name: "Tom Larkworthy",
    bio: "Tech Lead at Taktile. ex Firebase, Google.\n🦋 larkworthy.bsky.social",
    home_url: "https://bsky.app/profile/larkworthy.bsky.social",
    tier: "pro"
  },
  authors: [
    {
      id: "5215f6ec4a999d40",
      avatar_url:
        "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
      name: "Tom Larkworthy",
      login: "tomlarkworthy",
      bio: "Tech Lead at Taktile. ex Firebase, Google.\n🦋 larkworthy.bsky.social",
      home_url: "https://bsky.app/profile/larkworthy.bsky.social",
      tier: "pro",
      approved: true,
      description: ""
    }
  ],
  collections: [
    {
      id: "cf72f19f55f3a048",
      type: "public",
      slug: "lopebook",
      title: "lopecode",
      description: "",
      update_time: "2024-11-17T07:27:34.529Z",
      pinned: false,
      ordered: true,
      custom_thumbnail: null,
      default_thumbnail:
        "dab1604ccf4a760060379630da0876da27b79509b738f8d5c300c9a9a320e38a",
      thumbnail:
        "dab1604ccf4a760060379630da0876da27b79509b738f8d5c300c9a9a320e38a",
      listing_count: 9,
      parent_collection_count: 0,
      owner: {
        id: "7db5ed2b0697d645",
        avatar_url:
          "https://avatars.observableusercontent.com/avatar/47327a8bc1966f2186dcb3ebf4b7ee6e4e7ab9a5c2a07405aff57200ea778f71",
        login: "tomlarkworthy",
        name: "Tom Larkworthy",
        bio: "Tech Lead at Taktile.\nFormerly Firebase, Google",
        home_url: "https://taktile.com",
        type: "team",
        tier: "starter_2024"
      }
    }
  ],
  files: [
    {
      id: "50cad75d56578d08f50d560a50a6f4a66919f1f0b9c189221c6768a04dc958323335dac14ca3526e6527019d02e9e00d21d247eb5c2646b38ec7720e0ddcaa7e",
      url: "https://static.observableusercontent.com/files/50cad75d56578d08f50d560a50a6f4a66919f1f0b9c189221c6768a04dc958323335dac14ca3526e6527019d02e9e00d21d247eb5c2646b38ec7720e0ddcaa7e",
      download_url:
        "https://static.observableusercontent.com/files/50cad75d56578d08f50d560a50a6f4a66919f1f0b9c189221c6768a04dc958323335dac14ca3526e6527019d02e9e00d21d247eb5c2646b38ec7720e0ddcaa7e?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27empty",
      name: "empty",
      create_time: "2024-10-15T18:03:32.575Z",
      mime_type: "application/octet-stream",
      status: "public",
      size: 2,
      content_encoding: null,
      private_bucket_id: null
    }
  ],
  comments: [],
  commenting_lock: null,
  suggestion_from: null,
  suggestions_to: [],
  version: 152,
  title: "Test Notebook of Semantics",
  license: "mit",
  copyright: "Copyright 2024 Tom Larkworthy",
  nodes: [
    {
      id: 0,
      value: "# Test Notebook of Semantics",
      pinned: false,
      mode: "md",
      data: null,
      name: ""
    },
    { id: 9, value: "1", pinned: true, mode: "js", data: null, name: null },
    {
      id: 31,
      value: '{\n  ("");\n}',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 100,
      value: "<div>",
      pinned: false,
      mode: "html",
      data: null,
      name: "html"
    },
    {
      id: 115,
      value: "obj_literal = ({})",
      pinned: false,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 11,
      value: 'x = ""',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 13,
      value: "y = x",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 15,
      value: 'z = {\n  ("");\n  return x + y;\n}',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 145,
      value: 'comments = {\n  // a comment\n  return "";\n}',
      pinned: false,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 17,
      value: "generator = {\n  yield x + y;\n}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 20,
      value: "_function = function () {}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 71,
      value: "asyncfunction = async function () {}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 25,
      value: "named_function = function foo() {}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 151,
      value: "thisReference = (this || 0) + 1",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 22,
      value: "lambda = () => {}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 33,
      value: "error = {\n  throw new Error();\n}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 39,
      value: "viewof view = Inputs.input()",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 42,
      value: "mutable q = 6",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 45,
      value: "inbuilt = _",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 48,
      value: 'file = FileAttachment("empty")',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 52,
      value:
        "mutable_dep = {\n  viewof view;\n  lambda;\n  mutable q;\n  return mutable q;\n}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 55,
      value: "mutable_dep_2 = {\n  file;\n  return q + 1;\n}",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 57,
      value: "viewofdep_inline = viewof view",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 61,
      value: "viewofdatadep = view",
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    { id: 93, value: "dep", pinned: true, mode: "js", data: null, name: null },
    {
      id: 64,
      value:
        'import {\n  dep,\n  mutable mutabledep,\n  viewof viewdep,\n  dep as dep_alias,\n  mutable mutabledep as aslias_mutabledep,\n  viewof viewdep as aslias_viewdep,\n  mutabledep as aslias_mutabledep_data,\n  viewdep as aslias_viewdep_data\n} from "@tomlarkworthy/dependancy";',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    }
  ],
  resolutions: [],
  schedule: null,
  last_view_time: null
}
)}

function _notebook_semantics_source(notebook_semantics_document,parser){return(
notebook_semantics_document.nodes.map((s) => ({
  value: s.value,
  name: s.mode == "js" ? parser.parseCell(s.value)?.id?.name : null,
  mode: s.mode
}))
)}

function _29(md){return(
md`### Runtime Representation (v4)`
)}

function _dependancy_module(){return(
import(
  "https://api.observablehq.com/@tomlarkworthy/dependancy.js?v=4"
)
)}

function _notebook_semantics_module(){return(
import(
  "https://api.observablehq.com/@tomlarkworthy/notebook-semantics.js?v=4"
)
)}

function _dependancy_runtime(observable,dependancy_module)
{
  const runtime = new observable.Runtime();
  runtime.module(dependancy_module.default);
  return runtime;
}


async function _notebook_semantics_runtime(dependancy_module,observable,notebook_semantics_module)
{
  dependancy_module;
  const runtime = new observable.Runtime();
  const module = runtime.module(
    notebook_semantics_module.default,
    observable.Inspector.into(document.createElement("div"))
  );
  await runtime._computeNow();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    runtime,
    module
  };
}


function _notebook_semantics_variables(notebook_semantics_runtime,variableToObject){return(
[
  ...notebook_semantics_runtime.runtime._variables
]
  .filter((v) => v._type == 1)
  .map(variableToObject)
)}

function _notebook_semantics_modules(moduleMap,notebook_semantics_runtime){return(
moduleMap(notebook_semantics_runtime.runtime)
)}

async function _notebook_semantics_cells(cellMap2,notebook_semantics_runtime,notebook_semantics_modules){return(
(
  await cellMap2(
    notebook_semantics_runtime.runtime._variables,
    notebook_semantics_modules
  )
).get(notebook_semantics_runtime.module)
)}

function _notebook_define(notebook_semantics_module){return(
notebook_semantics_module.default.toString()
)}

function _39(md){return(
md`### Cell map - ⚠️ Deprecated use https://observablehq.com/@tomlarkworthy/cell-map

\`viewof\` and \`mutable\` cells define more than one runtime variable, so we need to group variables by their cell function.
`
)}

function _sourceModule(){return(
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

function _cellMap(cellMapCompat){return(
cellMapCompat
)}

function _semanticsCells(cellMap,notebook_semantics_runtime)
{
  debugger;
  return cellMap(notebook_semantics_runtime.module);
}


function _43(md){return(
md`### Imports`
)}

function _44(md){return(
md`observed modules are variables in the parent notebook, so their module is the main, however, their dependency is something else. -- this holds even for live notebook. They can only have one dependancy (inputs.length = 1)`
)}

function _45(md){return(
md`### runtime in observable`
)}

function _46(md){return(
md`## Test cases`
)}

function _test_cases(notebook_semantics_source,parser,semanticsCells,normalizeObservableSource)
{
  let anonIdx = 1; // hack to get things to align as we filtered by ".js" , test suite specific
  const testCases = notebook_semantics_source
    .filter((s) => s.mode == "js")
    .map((source) => {
      const comments = [],
        tokens = [];
      const ast = parser.parseCell(source.value, {
        ranges: true,
        onComment: comments,
        onToken: tokens
      });
      const prefix =
        ast?.id?.type == "ViewExpression"
          ? "viewof "
          : ast?.id?.type == "MutableExpression"
          ? "mutable "
          : "";
      const importName =
        ast.body.type == "ImportDeclaration" &&
        "module @tomlarkworthy/dependancy";
      const name = ast.id?.name || ast?.id?.id?.name || importName || anonIdx++;
      const variables = semanticsCells.get(
        typeof name === "string" ? prefix + name : name
      );
      return {
        ast,
        name,
        source: {
          name: source.name,
          value: source.value
        },
        normalizeSource: source && normalizeObservableSource(source.value),
        variables
      };
    });
  return testCases;
}


function _importFake(observable){return(
async function (variable, module_name) {
  const runtime = new observable.Runtime({}, () => {});
  const importer = runtime.module();
  let _import_definition;
  eval(`_import_definition = async () => "${module_name}" && runtime.module()`);
  const importVariable = importer.define(
    `module ${module_name}`,
    _import_definition
  );
  const importee = (importVariable._value = await importVariable._definition());
  importee.define(variable._inputs[0], [], () => null);
  return importer.import([variable._inputs[0]], variable._name, importee);
}
)}

async function _test_decompile_$variable(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: "function _x($variable) {return ($variable);}",
      _inputs: [
        {
          _name: "@variable"
        }
      ]
    }
  ]);
  expect(decompiled).toEqual("v = $variable");
  return "@variable support: ok";
}


async function _test_decompile_import_variable(decompile,importFake,expect)
{
  const decompiled = await decompile([
    await importFake(
      {
        _name: "dep",
        _definition: "function Yn(e){return e}",
        _inputs: ["dep"]
      },
      "@tomlarkworthy/dependancy"
    )
  ]);
  expect(decompiled).toEqual(`import {dep} from "@tomlarkworthy/dependancy"`);
  return "ok";
}


async function _test_decompile_import_variable_alias(decompile,importFake,expect)
{
  const decompiled = await decompile([
    await importFake(
      {
        _name: "alias",
        _definition: "function Yn(e){return e}",
        _inputs: ["dep"]
      },
      "@tomlarkworthy/dependancy"
    )
  ]);
  expect(decompiled).toEqual(
    `import {dep as alias} from "@tomlarkworthy/dependancy"`
  );
  return "ok";
}


async function _test_decompile_import_many(decompile,importFake,expect)
{
  const decompiled = await decompile([
    await importFake(
      {
        _name: "dep",
        _definition: "function Yn(e){return e}",
        _inputs: ["dep"]
      },
      "@tomlarkworthy/dependancy"
    ),
    {
      _name: "mutable mutabledep",
      _definition: '(_, v) => v.import("mutable mutabledep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "mutabledep",
      _definition: '(_, v) => v.import("mutabledep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "viewof viewdep",
      _definition: '(_, v) => v.import("viewof viewdep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "viewdep",
      _definition: '(_, v) => v.import("viewdep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "dep_alias",
      _definition: '(_, v) => v.import("dep", "dep_alias", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "error_dep",
      _definition: "function Yn(e){return e}",
      _inputs: ["module 1", "error_dep"]
    },
    {
      _name: "mutable aslias_mutabledep",
      _definition:
        '(_, v) => v.import("mutable mutabledep", "mutable aslias_mutabledep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "aslias_mutabledep",
      _definition: '(_, v) => v.import("mutabledep", "aslias_mutabledep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "viewof aslias_viewdep",
      _definition:
        '(_, v) => v.import("viewof viewdep", "viewof aslias_viewdep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "aslias_viewdep",
      _definition: '(_, v) => v.import("viewdep", "aslias_viewdep", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "aslias_mutabledep_data",
      _definition:
        '(_, v) => v.import("mutabledep", "aslias_mutabledep_data", _)',
      _inputs: ["module 1", "@variable"]
    },
    {
      _name: "aslias_viewdep_data",
      _definition: '(_, v) => v.import("viewdep", "aslias_viewdep_data", _)',
      _inputs: ["module 1", "@variable"]
    }
  ]);
  expect(decompiled).toEqual(
    `import {dep, mutable mutabledep, mutabledep, viewof viewdep, viewdep, dep as dep_alias, error_dep, mutable mutabledep as mutable aslias_mutabledep, mutabledep as aslias_mutabledep, viewof viewdep as viewof aslias_viewdep, viewdep as aslias_viewdep, mutabledep as aslias_mutabledep_data, viewdep as aslias_viewdep_data} from "@tomlarkworthy/dependancy"`
  );
  return "ok";
}


async function _test_decompile_markdown_cell(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: `function _1(md){return(\nmd\`# Test Notebook of Semantics\`\n)}`,
      _inputs: [
        {
          _name: "md"
        }
      ]
    }
  ]);
  expect(decompiled).toEqual(`v = md\`# Test Notebook of Semantics\``);
  return "ok";
}


async function _test_decompile_constant(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: `function _2(){return(
1
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`v = 1`);
  return "ok";
}


async function _test_decompile_string_literal(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: function _3() {
        ("");
      },
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`v = {
    '';
}`);
  return "ok";
}


async function _test_decompile_html_cell(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "html",
      _definition: `function _html(htl){return(\nhtl.html\`<div>\`\n)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`html = htl.html\`<div>\``);
  return "ok";
}


async function _test_decompile_class(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "myclass",
      _definition: `function _myclass(){return(
class myclass {}
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`myclass = class myclass {
}`);
  return "ok";
}


function _test_decompile_class_with_property(decompile){return(
decompile([
  {
    _inputs: [],
    _definition: `function _Cls(){return(
        class Cls {
          d;
        }
    )}`
  }
])
)}

async function _test_decompile_object_literal(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "obj_literal",
      _definition: "function _obj_literal(){return(\n{}\n)}",
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`obj_literal = ({})`);
  return "ok";
}


async function _test_decompile_reference(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: `function _y(x){return(
x
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`v = x`);
  return "ok";
}


async function _test_decompile_block(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "v",
      _definition: `function _z(x,y)
{
  ("");
  return x + y;
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`v = {
    '';
    return x + y;
}`);
  return "ok";
}


async function _test_decompile_comments(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "comments",
      _definition: `function _comments()
{
  // a comment
  return "";
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`comments = {
    // a comment
    return '';
}`);
  return "ok";
}


async function _test_decompile_generator(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "generator",
      _definition: `function* _generator(x,y)
{
  yield x + y;
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`generator = {
    yield x + y;
}`);
  return "ok";
}


async function _test_decompile_function(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "_function",
      _definition: `function __function(){return(
function () {}
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`_function = function () {
}`);
  return "ok";
}


async function _test_decompile_async_function(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "asyncfunction",
      _definition: `function _asyncfunction(){return(
async function () {}
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`asyncfunction = async function () {
}`);
  return "ok";
}


async function _test_decompile_named_function(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "named_function",
      _definition: `function _named_function(){return(
function foo() {}
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`named_function = function foo() {
}`);
  return "ok";
}


async function _test_decompile_this_reference(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "thisReference",
      _definition: `function _thisReference(){return(
(this || 0) + 1
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`thisReference = (this || 0) + 1`);
  return "ok";
}


async function _test_decompile_lambda(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "lambda",
      _definition: `function _lambda(){return(
() => {}
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`lambda = () => {
}`);
  return "ok";
}


async function _test_decompile_error(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "error",
      _definition: `function _error()
{
  throw new Error();
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`error = {
    throw new Error();
}`);
  return "ok";
}


async function _test_decompile_error_object(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "error_obj",
      _definition: `function _error_obj()
{
  throw { foo: "bar" };
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`error_obj = {
    throw { foo: 'bar' };
}`);
  return "ok";
}


function _71(md){return(
md`⚠️ This cells have not been grouped correctly, should be a single import being decompiled`
)}

async function _test_decompile_anon_error_dep(decompile,expect)
{
  const decompiled = await decompile([
    {
      _definition: `function _19(error_dep){return(
error_dep
)}`,
      _inputs: ["error_dep"]
    }
  ]);
  expect(decompiled).toEqual(`error_dep`);
  return "ok";
}


async function _test_decompile_viewof(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewof view",
      _definition: `function _view(Inputs){return(
Inputs.input()
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`viewof view = Inputs.input()`);
  return "ok";
}


async function _test_decompile_mutable(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "initial q",
      _definition: `function _q(){return(
6
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`mutable q = 6`);
  return "ok";
}


async function _test_decompile_builtin(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "inbuilt",
      _definition: `function _inbuilt(_){return(
_
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`inbuilt = _`);
  return "ok";
}


async function _test_decompile_fileattachment(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "file",
      _definition: `function _file(FileAttachment){return(
FileAttachment("empty")
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`file = FileAttachment('empty')`);
  return "ok";
}


async function _test_decompile_mutable_dependancy(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "mutable_dep",
      _definition: `function _mutable_dep($0,lambda,$1)
{
  $0;
  lambda;
  $1.value;
  return $1.value;
}`,
      _inputs: ["viewof view", "mutable q"]
    }
  ]);
  expect(decompiled).toEqual(`mutable_dep = {
    viewof view;
    lambda;
    mutable q;
    return mutable q;
}`);
  return "ok";
}


async function _test_decompile_mutable_dependancy_2(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "mutable_dep_2",
      _definition: `function _mutable_dep_2(file,q)
{
  file;
  return q + 1;
}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`mutable_dep_2 = {
    file;
    return q + 1;
}`);
  return "ok";
}


async function _test_decompile_viewof_dep(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewofdep_inline",
      _definition: `function _viewofdep_inline($0){return(
$0
)}`,
      _inputs: ["viewof view"]
    }
  ]);
  expect(decompiled).toEqual(`viewofdep_inline = viewof view`);
  return "ok";
}


async function _test_decompile_viewof_data_dep(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewofdatadep",
      _definition: `function _viewofdatadep(view){return(
view
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`viewofdatadep = view`);
  return "ok";
}


async function _test_decompile_anon_dep(decompile,expect)
{
  const decompiled = await decompile([
    {
      _definition: `function _28(dep){return(
dep
)}`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`dep`);
  return "ok";
}


async function _test_decompile_import_mutable(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "mutable mutabledep",
      _definition: `(_, v) => v.import("mutable mutabledep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(
    `mutable mutabledep = v.import('mutable mutabledep', _)`
  );
  return "ok";
}


async function _test_decompile_import_viewof(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewof viewdep",
      _definition: `(_, v) => v.import("viewof viewdep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`viewof viewdep = v.import('viewof viewdep', _)`);
  return "ok";
}


async function _test_decompile_viewof_data(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewdep",
      _definition: `(_, v) => v.import("viewdep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`viewdep = v.import('viewdep', _)`);
  return "ok";
}


async function _test_decompile_import_alias(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "dep_alias",
      _definition: `(_, v) => v.import("dep", "dep_alias", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(`dep_alias = v.import('dep', 'dep_alias', _)`);
  return "ok";
}


async function _test_decompile_import_mutable_alias(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "mutable aslias_mutabledep",
      _definition: `(_, v) => v.import("mutable mutabledep", "mutable aslias_mutabledep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(
    `mutable aslias_mutabledep = v.import('mutable mutabledep', 'mutable aslias_mutabledep', _)`
  );
  return "ok";
}


async function _test_decompile_import_mutable_data_alias(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "aslias_mutabledep",
      _definition: `(_, v) => v.import("mutabledep", "aslias_mutabledep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(
    `aslias_mutabledep = v.import('mutabledep', 'aslias_mutabledep', _)`
  );
  return "ok";
}


async function _test_decompile_import_viewof_alias(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "viewof aslias_viewdep",
      _definition: `(_, v) => v.import("viewof viewdep", "viewof aslias_viewdep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(
    `viewof aslias_viewdep = v.import('viewof viewdep', 'viewof aslias_viewdep', _)`
  );
  return "ok";
}


async function _test_decompile_import_viewof_data_alias(decompile,expect)
{
  const decompiled = await decompile([
    {
      _name: "aslias_viewdep",
      _definition: `(_, v) => v.import("viewdep", "aslias_viewdep", _)`,
      _inputs: []
    }
  ]);
  expect(decompiled).toEqual(
    `aslias_viewdep = v.import('viewdep', 'aslias_viewdep', _)`
  );
  return "ok";
}


function _decompile_unit_test_template(Inputs,decompileCellCase,variableToObject,decompiled_example){return(
Inputs.textarea({
  value: `test_decompile_ = {
  const decompiled = await decompile(${JSON.stringify(
    decompileCellCase.variables.map(variableToObject),
    null,
    2
  )});
  expect(decompiled).toEqual(\`${decompiled_example}\`);
  return "ok";
}`,
  disabled: true,
  rows: 20,
  label: "decompile template"
})
)}

function _91(md){return(
md`### The Decompiler`
)}

function _decompileCellCase(Inputs,notebook_semantics_cells){return(
Inputs.select(notebook_semantics_cells, {
  label: "decompile cell",
  format: (cell) => cell.name
})
)}

function _94(decompileCellCase){return(
decompileCellCase
)}

function _decompiled_example(decompile,decompileCellCase)
{
  return decompile(decompileCellCase.variables);
}


function _96(md){return(
md`### \`extractModuleInfo\` 
static analysis of module imports`
)}

function _extractModuleInfo(){return(
function extractModuleInfo(str) {
  const named = /@([^/]+)\/([^.]+)\.js\?v=\d+(?:&resolutions=[^@]+@(\d+))?/;
  const matchNamed = str.match(named);

  if (matchNamed) {
    const namespace = matchNamed[1];
    const notebook = matchNamed[2];
    const version = matchNamed[3];
    return { namespace, notebook, version };
  }
  const id = /\/?d\/([^@]+)@?(\d+)/;
  const matchId = str.match(id);

  if (matchId) {
    const notebook = matchId[1];
    const version = matchId[2];
    return { id: notebook, version };
  }

  const lopebook = /"@([^/]+)\/([^"]+)"/;
  const lopebookId = str.match(lopebook);

  if (lopebookId) {
    const namespace = lopebookId[1];
    const notebook = lopebookId[2];
    return { namespace, notebook };
  }

  return {};
}
)}

function _test_extractModuleInfo_notebook_resolution(expect,extractModuleInfo)
{
  expect(
    extractModuleInfo(
      'async () => runtime.module((await import("/@tomlarkworthy/whisper-input.js?v=4&resolutions=03dda470c56b93ff@4883")).default)'
    )
  ).toEqual({
    namespace: "tomlarkworthy",
    notebook: "whisper-input",
    version: "4883"
  });
  return "ok";
}


function _test_extractModuleInfo_id_version_resolution(expect,extractModuleInfo)
{
  expect(
    extractModuleInfo(
      'async () => runtime.module((await import("/d/c2dae147641e012a@46.js?v=4&resolutions=03dda470c56b93ff@4883")).default)'
    )
  ).toEqual({ id: "c2dae147641e012a", version: "46" });
  return "ok";
}


function _test_extractModuleInfo_id_version(expect,extractModuleInfo)
{
  expect(
    extractModuleInfo(
      'async () => runtime.module((await import("d/58f3eb7334551ae6@215")).default)'
    )
  ).toEqual({ id: "58f3eb7334551ae6", version: "215" });
  return "ok";
}


function _test_extractModuleInfo_test_4(expect,extractModuleInfo)
{
  expect(
    extractModuleInfo(
      'await import("https://api.observablehq.com/@tomlarkworthy/observable-notes.js?v=4"'
    )
  ).toEqual({
    namespace: "tomlarkworthy",
    notebook: "observable-notes"
  });
  return "ok";
}


function _test_extractModuleInfo_alias_hack(expect,extractModuleInfo)
{
  expect(
    extractModuleInfo(
      'async () => "@tom/blank" && runtime.module((await import("blob:https://tomlarkworthy.static.observableusercontent.com/4cdeb9db-e473-436b-b343-95abd7e4c16f")).default)'
    )
  ).toEqual({
    namespace: "tom",
    notebook: "blank"
  });
  return "ok";
}


function _103(md){return(
md`### \`findModuleName\` and \`findImportedName\``
)}

function _import_ast_example(parser){return(
parser.parseCell(
  'import {runtime, viewof main as foo} from "@mootari/access-runtime"'
)
)}

function _findModuleName(extractModuleInfo){return(
(scope, module, { unknown_id = Math.random() } = {}) => {
  try {
    const scopedVariables = [...scope.values()];
    const moduleVariables = scopedVariables.filter((v) => v._module == module);
    // Look for module definition cell
    const module_definition_variable = scopedVariables.find((v) => {
      if (v._value == module) {
        const dfn = v._definition.toString();
        const info = extractModuleInfo(dfn);
        if (info.id || info.notebook) {
          return true;
        }
      }
      return false;
    });
    if (module_definition_variable) {
      const dfn = module_definition_variable._definition.toString();
      const info = extractModuleInfo(dfn);
      if (info.namespace) {
        return `@${info.namespace}/${info.notebook}`;
      } else if (info.id) {
        return `d/${info.id}@${info.version}`;
      } else {
        debugger;
      }
    }
    return `<unknown ${unknown_id}>`;
  } catch (e) {
    debugger;
    return "error";
  }
}
)}

function _findImportedName(){return(
async (v) => {
  if (v._inputs.length == 1 && v._inputs[0]._name === "@variable") {
    // import in a live-notebook hides the alias in a closure
    let capture;
    await v._definition({ import: (...args) => (capture = args) });
    return capture[0];
  }
  if (v._inputs.length == 1) {
    return v._inputs[0]._name;
  }
  const regex = /v\.import\("([^"]+)",\s*"([^"]+)"/;
  const match = v._definition.toString().match(regex);
  if (match) {
    // Handle two cases (two arguments)
    return match[1];
  }
  return v._name;
}
)}

function _107(md){return(
md`### \`decompile\``
)}

function _decompile(findModuleName,findImportedName,acorn,escodegen){return(
{ prompt: "fix tests", time: 1726546383668 } &&
  async function decompile(variables) {
    // Non-import cases
    if (!variables || variables.length == 0)
      throw new Error("no variables to decompile");

    try {
      // Import cases
      if (
        variables[0]._inputs.length == 1 &&
        variables[0]._module !== variables[0]._inputs[0]._module
      ) {
        const module_name = findModuleName(
          variables[0]._module._scope,
          variables[0]._inputs[0]._module
        );
        const import_aliasses = await Promise.all(
          variables.map(async (v) => {
            const importedName = await findImportedName(v);
            return importedName == v._name
              ? v._name
              : `${importedName} as ${v._name}`;
          })
        );
        return `import {${import_aliasses.join(", ")}} from "${module_name}"`;
      }

      const variable = variables[0];

      const name = variable._name;
      const compiled =
        typeof variable._definition == "string"
          ? variable._definition
          : variable._definition.toString();
      const inputs = variable._inputs.map((i) =>
        typeof i == "string" ? i : i._name
      );
      const wrappedCode = "(" + compiled + ")";
      const comments = [],
        tokens = [];
      let parsed = acorn.parse(wrappedCode, {
        ecmaVersion: 2022,
        sourceType: "module",
        ranges: true,
        onComment: comments,
        onToken: tokens
      });
      parsed = escodegen.attachComments(parsed, comments, tokens);

      const functionExpression = parsed.body[0].expression;
      const body = functionExpression.body;

      let varName = name;
      let prefix = "";

      // Handle special variables
      if (name) {
        if (name.startsWith("initial ")) {
          prefix = "mutable ";
          varName = name.replace(/^initial /, "");
        } else if (name.startsWith("mutable ")) {
          prefix = "mutable ";
          varName = name.replace(/^mutable /, "");
        } else if (name.startsWith("viewof ")) {
          prefix = "viewof ";
          varName = name.replace(/^viewof /, "");
        }
      }

      let expression = "";
      if (
        body.type === "BlockStatement" &&
        body.body.length === 1 &&
        body.body[0].type === "ReturnStatement" &&
        comments.length == 0
      ) {
        // If the body is a single ReturnStatement, decompile its argument
        if (wrappedCode[body.body[0].argument.start] == "{") {
          // bugfix if the body is an object literal we need to escape it
          expression = `(${escodegen.generate(body.body[0].argument, {
            comment: true
          })})`;
        } else {
          expression = escodegen.generate(body.body[0].argument, {
            comment: true
          });
        }
      } else {
        // For other types, decompile the whole body
        expression = escodegen.generate(body, { comment: true });
      }
      let source = `${varName ? `${prefix}${varName} = ` : ""}${expression}`;

      // replace mutable and viewofs
      let id = 0;
      inputs.forEach((input, idx) => {
        if (input.startsWith("mutable ")) {
          source = source.replaceAll(`$${id++}.value`, input);
        } else if (input.startsWith("viewof ")) {
          source = source.replaceAll(`$${id++}`, input);
        } else if (input == "@variable") {
          source = source.replaceAll(`$${id++}`, input);
        }
      });
      return source;
    } catch (e) {
      debugger;
      throw e;
    }
  }
)}

function _109(md){return(
md`## Javascript Source Normalization`
)}

function _normalizeJavascriptSourceSelector(Inputs,notebook_semantics_variables){return(
Inputs.select(
  notebook_semantics_variables.map((s) => s._definition),
  {
    label: "variable source",
    value: notebook_semantics_variables[5]._definition
  }
)
)}

function _normalizeJavascriptSource(acorn,escodegen){return(
(source) => {
  var comments = [];
  var tokens = [];

  var ast = acorn.parse(source, {
    ranges: true,
    onComment: comments,
    onToken: tokens
  });

  escodegen.attachComments(ast, comments, tokens);
  return escodegen.generate(ast, {
    comment: true
  });
}
)}

function _112(normalizeJavascriptSource,normalizeJavascriptSourceSelector)
{
  return normalizeJavascriptSource(normalizeJavascriptSourceSelector);
}


function _normalizeVariables(variableToObject,normalizeJavascriptSource){return(
(variables) =>
  variables.map(variableToObject).map((v) => ({
    ...v,
    _definition: normalizeJavascriptSource(v._definition)
  }))
)}

function _variableToObject(){return(
(v) => ({
  _name: v._name,
  _definition: v._definition.toString(),
  _inputs: v._inputs.map((v) => v._name || v)
})
)}

function _115(md){return(
md`## Observable Source Normalization`
)}

function _normalizeObservableSourceSelector(Inputs,notebook_semantics_source){return(
Inputs.select(
  notebook_semantics_source.map((s) => s.value),
  { label: "test case", value: "1" }
)
)}

function _117(normalizeObservableSource,normalizeObservableSourceSelector){return(
normalizeObservableSource(normalizeObservableSourceSelector)
)}

function _parsed(parser,normalizeObservableSourceSelector){return(
parser.parseCell(normalizeObservableSourceSelector)
)}

function _generate(escodegen){return(
function generate(node, source) {
  if (node.type == "Cell") {
    if (
      node.body.type != "BlockStatement" &&
      source &&
      source[node.body.start] == "{"
    ) {
      return `${node.id ? `${generate(node.id)} = ` : ""}(${escodegen.generate(
        node.body
      )})`;
    } else {
      return `${node.id ? `${generate(node.id)} = ` : ""}${escodegen.generate(
        node.body
      )}`;
    }
  } else if (node.type == "Identifier") {
    return escodegen.generate(node);
  } else if (node.type == "ViewExpression") {
  } else {
    throw node.type;
  }
}
)}

function _normalizeObservableSource(parser,generate){return(
{
  prompt:
    'I see some of the test are failing because the AST generator uses a different set of quotes than the original source and various formatting quirks. This should not count as failure. I would suggest normalizing. Its not super easy because source code is not vanilla JS, we need to normalize just the bit after the block expression, and replace the "viewof XX" and "mutable XXX" macros with a placeholder whic we can normalize and then undo. Write the normalizeObservableSource.',
  time: 1729097489369
} &&
  function normalizeObservableSource(source) {
    // Replace viewof and mutable with placeholders
    const viewofRegex = /viewof\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const mutableRegex = /mutable\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;

    // Temporary placeholders
    const VIEWOF_PLACEHOLDER = "__VIEWOF_PLACEHOLDER__";
    const MUTABLE_PLACEHOLDER = "__MUTABLE_PLACEHOLDER__";

    // Maps to store original names
    const viewOfMap = new Map();
    const mutableMap = new Map();

    // Replace viewof XX with placeholder and store mapping
    source = source.replace(viewofRegex, (match, p1) => {
      const placeholder = `${VIEWOF_PLACEHOLDER}_${p1}`;
      viewOfMap.set(placeholder, p1);
      return placeholder;
    });

    // Replace mutable XXX with placeholder and store mapping
    source = source.replace(mutableRegex, (match, p1) => {
      const placeholder = `${MUTABLE_PLACEHOLDER}_${p1}`;
      mutableMap.set(placeholder, p1);
      return placeholder;
    });

    // Normalize quotes: convert all to single quotes
    const comments = [],
      tokens = [];
    const cell = parser.parseCell(source, {
      ranges: true,
      onComment: comments,
      onToken: tokens
    });
    

    source = generate(cell, source);

    // Restore original viewof and mutable identifiers
    viewOfMap.forEach((original, placeholder) => {
      source = source.replaceAll(placeholder, `viewof ${original}`);
    });

    mutableMap.forEach((original, placeholder) => {
      source = source.replaceAll(placeholder, `mutable ${original}`);
    });

    return source;
  }
)}

function _121(md){return(
md`## The Compiler

`
)}

function _test_async_interpolation(compile){return(
eval(
  "let _fn = " +
    compile("md`${await FileAttachment('image@1.png').url() }`")[0]._definition
)
)}

function _123(compile)
{
  debugger;
  compile("md`${await FileAttachment('image@1.png').url() }`")[0];
}


async function _test_compile_integer(compile,expect)
{
  const compiled = await compile("1");
  expect(compiled).toEqual([
    {
      _definition: "function _anonymous() {return (1);}",
      _inputs: [],
      _name: null
    }
  ]);
  return "ok";
}


async function _test_compile_string(compile,expect)
{
  const compiled = await compile(`""`);
  expect(compiled).toEqual([
    {
      _name: null,
      _inputs: [],
      _definition: "function _anonymous() {return ('');}"
    }
  ]);
  return "ok";
}


async function _test_compile_obj_literal(compile,expect)
{
  const compiled = await compile(`obj_literal = ({})`);
  expect(compiled).toEqual([
    {
      _name: "obj_literal",
      _inputs: [],
      _definition: "function _obj_literal() {return ({});}"
    }
  ]);
  return "ok";
}


async function _test_compile_assignment(compile,expect)
{
  const compiled = await compile(`x = ""`);
  expect(compiled).toEqual([
    {
      _name: "x",
      _inputs: [],
      _definition: "function _x() {return ('');}"
    }
  ]);
  return "ok";
}


async function _test_compile_dependancy(compile,expect)
{
  const compiled = await compile(`y = x`);
  expect(compiled).toEqual([
    {
      _name: "y",
      _inputs: ["x"],
      _definition: "function _y(x) {return (x);}"
    }
  ]);
  return "ok";
}


async function _test_compile_block_dependancy(compile,expect)
{
  const compiled = await compile(`z = {
  ("");
  return x + y;
}`);
  expect(compiled).toEqual([
    {
      _name: "z",
      _inputs: ["x", "y"],
      _definition: "function _z(x,y) {\n    '';\n    return x + y;\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_comments(compile,expect)
{
  const compiled = await compile(`comments = {
  // a comment
  return "";
}`);
  expect(compiled).toEqual([
    {
      _name: "comments",
      _inputs: [],
      _definition: "function _comments() {\n    // a comment\n    return '';\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_generator(compile,expect)
{
  const compiled = await compile(`generator = {
  yield x + y;
}`);
  expect(compiled).toEqual([
    {
      _name: "generator",
      _inputs: ["x", "y"],
      _definition: "function* _generator(x,y) {\n    yield x + y;\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_function(compile,expect)
{
  const compiled = await compile(`_function = function () {}`);
  expect(compiled).toEqual([
    {
      _name: "_function",
      _inputs: [],
      _definition: "function __function() {return (function () {\n});}"
    }
  ]);
  return "ok";
}


async function _test_compile_async_function(compile,expect)
{
  const compiled = await compile(`asyncfunction = async function () {}`);
  expect(compiled).toEqual([
    {
      _name: "asyncfunction",
      _inputs: [],
      _definition:
        "function _asyncfunction() {return (async function () {\n});}"
    }
  ]);
  return "ok";
}


async function _test_compile_named_function(compile,expect)
{
  const compiled = await compile(`named_function = function foo() {}`);
  expect(compiled).toEqual([
    {
      _name: "named_function",
      _inputs: [],
      _definition: "function _named_function() {return (function foo() {\n});}"
    }
  ]);
  return "ok";
}


async function _test_compile_this_reference(compile,expect)
{
  const compiled = await compile(`thisReference = (this || 0) + 1`);
  expect(compiled).toEqual([
    {
      _name: "thisReference",
      _inputs: [],
      _definition: "function _thisReference() {return ((this || 0) + 1);}"
    }
  ]);
  return "ok";
}


async function _test_compile_lambda(compile,expect)
{
  const compiled = await compile(`lambda = () => {}`);
  expect(compiled).toEqual([
    {
      _name: "lambda",
      _inputs: [],
      _definition: "function _lambda() {return (() => {\n});}"
    }
  ]);
  return "ok";
}


async function _test_compile_error(compile,expect)
{
  const compiled = await compile(`error = {
  throw new Error();
}`);
  expect(compiled).toEqual([
    {
      _name: "error",
      _inputs: [],
      _definition: "function _error() {\n    throw new Error();\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_viewof(compile,expect)
{
  const compiled = await compile(`viewof view = Inputs.input()`);
  expect(compiled).toEqual([
    {
      _name: "viewof view",
      _inputs: ["Inputs"],
      _definition: "function _view(Inputs) {return (Inputs.input());}"
    },
    {
      _name: "view",
      _inputs: ["Generators", "viewof view"],
      _definition: "(G, _) => G.input(_);"
    }
  ]);
  return "ok";
}


async function _test_compile_mutable(compile,expect)
{
  const compiled = await compile(`mutable q = 6`);
  expect(compiled).toEqual([
    {
      _name: "initial q",
      _inputs: [],
      _definition: "function _q() {return (6);}"
    },
    {
      _name: "mutable q",
      _inputs: ["Mutable", "initial q"],
      _definition: "(M, _) => new M(_);"
    },
    {
      _name: "q",
      _inputs: ["mutable q"],
      _definition: "_ => _.generator;"
    }
  ]);
  return "ok";
}


async function _test_compile_builtin(compile,expect)
{
  const compiled = await compile(`inbuilt = _`);
  expect(compiled).toEqual([
    {
      _name: "inbuilt",
      _inputs: ["_"],
      _definition: "function _inbuilt(_) {return (_);}"
    }
  ]);
  return "ok";
}


async function _test_compile_fileattachment(compile,expect)
{
  const compiled = await compile(`file = FileAttachment("empty")`);
  expect(compiled).toEqual([
    {
      _name: "file",
      _inputs: ["FileAttachment"],
      _definition:
        "function _file(FileAttachment) {return (FileAttachment('empty'));}"
    }
  ]);
  return "ok";
}


async function _test_compile_mutable_dep(compile,expect)
{
  const compiled = await compile(`mutable_dep = {
  viewof view;
  lambda;
  mutable q;
  return mutable q;
}`);
  expect(compiled).toEqual([
    {
      _name: "mutable_dep",
      _inputs: ["viewof view", "lambda", "mutable q"],
      _definition:
        "function _mutable_dep($0,lambda,$1) {\n    $0;\n    lambda;\n    $1.value;\n    return $1.value;\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_mutable_dep2(compile,expect)
{
  const compiled = await compile(`mutable_dep_2 = {
  file;
  return q + 1;
}`);
  expect(compiled).toEqual([
    {
      _name: "mutable_dep_2",
      _inputs: ["file", "q"],
      _definition:
        "function _mutable_dep_2(file,q) {\n    file;\n    return q + 1;\n}"
    }
  ]);
  return "ok";
}


async function _test_compile_inline_viewof(compile,expect)
{
  const compiled = await compile(`viewofdep_inline = viewof view`);
  expect(compiled).toEqual([
    {
      _name: "viewofdep_inline",
      _inputs: ["viewof view"],
      _definition: "function _viewofdep_inline($0) {return ($0);}"
    }
  ]);
  return "ok";
}


async function _test_compile_view_dep(compile,expect)
{
  const compiled = await compile(`viewofdatadep = view`);
  expect(compiled).toEqual([
    {
      _name: "viewofdatadep",
      _inputs: ["view"],
      _definition: "function _viewofdatadep(view) {return (view);}"
    }
  ]);
  return "ok";
}


async function _test_compile_dep(compile,expect)
{
  const compiled = await compile(`dep`);
  expect(compiled).toEqual([
    {
      _name: null,
      _inputs: ["dep"],
      _definition: "function _anonymous(dep) {return (dep);}"
    }
  ]);
  return "ok";
}


async function _test_compile_class(compile,expect)
{
  const compiled = await compile(`v = class {}`);
  expect(compiled).toEqual([
    {
      _name: "v",
      _inputs: [],
      _definition: `function _v() {return (class {\n});}`
    }
  ]);
  return "ok";
}


async function _test_compile_event(compile,expect)
{
  const compiled = await compile(`event = new Event('input')`);
  expect(compiled).toEqual([
    {
      _name: "event",
      _inputs: ["Event"],
      _definition: `function _event(Event) {return (new Event('input'));}`
    }
  ]);
  return "ok";
}


async function _test_compile_tagged_literal(compile,expect)
{
  const compiled = await compile(`htl.html\`hi\``);
  expect(compiled).toEqual([
    {
      _name: null,
      _inputs: ["htl"],
      _definition: `function _anonymous(htl) {return (htl.html\`hi\`);}`
    }
  ]);
  return "ok";
}


function _compile_unit_test_template(Inputs,test_case,compiled){return(
Inputs.textarea({
  value: `test_compile_ = {
  const compiled = await compile(\`${test_case.value}\`);
  expect(compiled).toEqual(${JSON.stringify(compiled, null, 2)});
  return "ok";
}`,
  disabled: true,
  rows: 20,
  label: "compile test template"
})
)}

async function _test_compile_import(compile,expect)
{
  const compiled = await compile(`import {
  dep,
  mutable mutabledep,
  viewof viewdep,
  dep as dep_alias,
  mutable mutabledep as aslias_mutabledep,
  viewof viewdep as aslias_viewdep,
  mutabledep as aslias_mutabledep_data,
  viewdep as aslias_viewdep_data
} from "@tomlarkworthy/dependancy";`);
  debugger;
  expect(compiled).toEqual([
    {
      _name: "module @tomlarkworthy/dependancy",
      _inputs: [],
      _definition: `async () => runtime.module((await import("@tomlarkworthy/dependancy")).default)`
    },
    {
      _name: "dep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("dep", _)`
    },
    {
      _name: "mutabledep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("mutabledep", _)`
    },
    {
      _name: "viewdep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("viewdep", _)`
    },
    {
      _name: "viewof viewdep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("viewof viewdep", _)`
    },
    {
      _name: "dep_alias",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("dep_alias", _)`
    },
    {
      _name: "mutable aslias_mutabledep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("mutable aslias_mutabledep", _)`
    },
    {
      _name: "aslias_mutabledep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("aslias_mutabledep", _)`
    },
    {
      _name: "viewof aslias_viewdep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("viewof aslias_viewdep", _)`
    },
    {
      _name: "aslias_viewdep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("aslias_viewdep", _)`
    },
    {
      _name: "aslias_viewdep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("aslias_viewdep", _)`
    },
    {
      _name: "aslias_mutabledep_data",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("aslias_mutabledep_data", _)`
    },
    {
      _name: "aslias_viewdep_data",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("aslias_viewdep_data", _)`
    },
    {
      _name: "mutable mutabledep",
      _inputs: ["module @tomlarkworthy/dependancy", "@variable"],
      _definition: `(_, v) => v.import("mutable mutabledep", _)`
    }
  ]);
  return "ok";
}


async function _test_compile_import_notebook(compile,expect)
{
  const compiled = await compile(
    `import {escodegen} from "@tomlarkworthy/escodegen"`
  );
  expect(compiled).toEqual([
    {
      _name: `module @tomlarkworthy/escodegen`,
      _inputs: [],
      _definition:
        'async () => runtime.module((await import("@tomlarkworthy/escodegen")).default)'
    },
    {
      _name: `escodegen`,
      _inputs: ["module @tomlarkworthy/escodegen", "@variable"],
      _definition: '(_, v) => v.import("escodegen", _)'
    }
  ]);
  return "ok";
}


function _test_case(Inputs,notebook_semantics_source){return(
Inputs.select(
  notebook_semantics_source.filter((s) => s.mode == "js"),
  {
    label: "compilation test case",
    format: (v) => v.value
  }
)
)}

function _154(test_case){return(
test_case.value
)}

async function _compiled(compile,test_case){return(
await compile(test_case.value)
)}

function _156(parser,test_case)
{
  const comments = [];
  const tokens = [];
  const ast = parser.parseCell(test_case.value, {
    ranges: true,
    onComment: comments,
    onToken: tokens
  });

  return {
    ast,
    comments,
    tokens
  };
}


function _compiled_selector(Inputs,compiled){return(
Inputs.radio(compiled, {
  format: (v) => v._name,
  value: compiled[0]
})
)}

function _158(compiled_selector,normalizeJavascriptSource){return(
JSON.stringify(
  {
    ...compiled_selector,
    _definition: normalizeJavascriptSource(compiled_selector._definition)
  },
  null,
  2
)
)}

function _159(compile,test_case){return(
compile(test_case.value)
)}

function _160(normalizeVariables,test_case){return(
normalizeVariables(test_case.variables)[0]._definition
)}

async function _singleCompileTest(compile,test_case,expect,normalizeVariables)
{
  try {
    const compiled = await compile(test_case.source.value);
    return expect(normalizeVariables(compiled)).toEqual(
      normalizeVariables(test_case.variables)
    );
  } catch (e) {
    return e;
  }
}


function _compile(parser,observableToJs){return(
{ prompt: "fix the singleCompileTest", time: 1729232320503 } &&
  function compile(source, { anonymousName = "_anonymous" } = {}) {
    // Parse the cell using the Observable parser
    const comments = [],
      tokens = [];
    const cell = parser.parseCell(source, {
      ranges: true,
      onComment: comments,
      onToken: tokens
    });
    let dollarIdx = 0;
    const inputToArgMap = {};
    const dollarToMacro = {};
    // references contain all source references, so expect duplication
    const inputs = Array.from(cell.references || []).flatMap((i) => {
      if (i.name) {
        if (inputToArgMap[i.name]) return [];
        inputToArgMap[i.name] = i.name;
        return i.name;
      } else {
        if (inputToArgMap[i.id.name]) return [];
        const dollarName = "$" + dollarIdx;
        inputToArgMap[i.id.name] = dollarName;
        dollarToMacro[dollarName] =
          i.type == "ViewExpression"
            ? "viewof " + i.id.name
            : "mutable " + i.id.name;
        dollarIdx++;
        return dollarName;
      }
    });

    // Determine the function name
    let variables;
    if (cell.id) {
      if (cell.id.type === "Identifier") {
        variables = [
          {
            functionName: "_" + cell.id.name,
            name: cell.id.name,
            inputs,
            params: inputs.join(",")
          }
        ];
      } else if (cell.id.type === "ViewExpression") {
        variables = [
          {
            functionName: "_" + cell.id.id.name,
            name: "viewof " + cell.id.id.name,
            inputs,
            params: inputs.join(",")
          },
          {
            functionName: "_" + cell.id.id.name,
            name: cell.id.id.name,
            _definition: "(G, _) => G.input(_);",
            inputs: ["Generators", "viewof " + cell.id.id.name],
            params: inputs.join(",")
          }
        ];
      } else if (cell.id.type === "MutableExpression") {
        variables = [
          {
            functionName: "_" + cell.id.id.name,
            name: "initial " + cell.id.id.name,
            inputs,
            params: inputs.join(",")
          },
          {
            functionName: "_" + cell.id.id.name,
            name: "mutable " + cell.id.id.name,
            _definition: "(M, _) => new M(_);",
            inputs: ["Mutable", "initial " + cell.id.id.name],
            params: inputs.join(",")
          },
          {
            functionName: "_" + cell.id.id.name,
            name: cell.id.id.name,
            _definition: "_ => _.generator;",
            inputs: ["mutable " + cell.id.id.name],
            params: inputs.join(",")
          }
        ];
      }
    } else {
      // Imports are pure body
      if (cell.body.type == "ImportDeclaration") {
        const module_name = cell.body.source.value;
        const cell_variables = [
          {
            _name: `module ${module_name}`,
            _inputs: [],
            _definition: `async () => runtime.module((await import("${module_name}")).default)`
          }
        ];
        for (let specifier of cell.body.specifiers) {
          const imported = specifier.imported.name;
          const alias = specifier.local.name;
          cell_variables.push({
            _name: alias,
            _inputs: [`module ${module_name}`, "@variable"],
            _definition: `(_, v) => v.import("${imported}", _)`
          });
        }
        return cell_variables;
      } else {
        // For anonymous cells
        variables = [
          {
            functionName: anonymousName,
            name: null,
            inputs,
            params: inputs.join(",")
          }
        ];
      }
    }

    // Generate code for the function body
    return variables.map((v) => {
      let _definition = v._definition;

      if (!_definition) {
        let functionBody;
        if (cell.body.type === "BlockStatement") {
          // For BlockStatement, use the block directly
          functionBody = observableToJs(
            cell.body,
            inputToArgMap,
            comments,
            tokens
          );
        } else {
          // For other expressions, wrap in return ()
          const bodyCode = observableToJs(
            cell.body,
            inputToArgMap,
            comments,
            tokens
          );
          functionBody = `{return (${bodyCode});}`;
        }

        // Construct the function definition
        _definition = `${cell.async ? "async " : ""}function${
          cell.generator ? "*" : ""
        } ${v.functionName}(${v.inputs.map(
          (i) => inputToArgMap[i] || i
        )}) ${functionBody}`;
      }

      return {
        _name: v.name,
        _inputs: v.inputs.map(
          (i) => dollarToMacro[i] || (i == "$variable" ? "@variable" : i)
        ),
        _definition: _definition
      };
    });
  }
)}

function _observableToJs(acorn_walk,parser,escodegen){return(
(ast, inputMap, comments, tokens) => {
  // Replace ViewExpression with their id so they are removed from
  // source and replaced with a JS compatible one
  const offset = 0;
  acorn_walk.ancestor(
    ast,
    {
      ViewExpression(node, ancestors) {
        const reference = "viewof " + node.id.name;
        node.type = "Identifier";
        node.name = inputMap[node.id.name];
      },
      MutableExpression(node, ancestors) {
        const reference = "mutable " + node.id.name;
        node.type = "Identifier";
        // hack as ".value" is not valid identifier, but escodegen allows it
        node.name = inputMap[node.id.name] + ".value";
      }
    },
    parser.walk
  );
  escodegen.attachComments(ast, comments, tokens);
  const js = escodegen.generate(ast, { comment: true });
  return js;
}
)}

function _164(md){return(
md`### Bundled deps`
)}

function _decompress_url(DecompressionStream,TextDecoderStream,TransformStream,TextEncoderStream,Response){return(
async (attachment, overrides) => {
  let decompressedStream;

  if (!overrides) {
    decompressedStream = (await attachment.stream()).pipeThrough(
      new DecompressionStream("gzip")
    );
  } else {
    decompressedStream = (await attachment.stream())
      .pipeThrough(new DecompressionStream("gzip"))
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(
        new TransformStream({
          transform(chunk, controller) {
            // Rewrite URLs in the text
            let modifiedChunk = chunk;
            Object.entries(overrides).forEach(([override, replacement]) => {
              modifiedChunk = modifiedChunk.replace(override, replacement);
            });
            controller.enqueue(modifiedChunk);
          }
        })
      )
      .pipeThrough(new TextEncoderStream());
  }
  const arrayBuffer = await new Response(decompressedStream).arrayBuffer();

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: "application/javascript" });

  return URL.createObjectURL(blob);
}
)}

async function _parser(decompress_url,FileAttachment,acorn_url,acorn_walk_url){return(
import(
  await decompress_url(FileAttachment("parser-6.1.0.js.gz"), {
    "/npm/acorn@8.11.3/+esm": acorn_url,
    "/npm/acorn-walk@8.3.2/+esm": acorn_walk_url
  })
)
)}

function _acorn_walk(acorn_walk_url){return(
import(acorn_walk_url)
)}

function _acorn_walk_url(decompress_url,FileAttachment){return(
decompress_url(FileAttachment("acorn-walk-8.3.2.js.gz"))
)}

function _acorn_url(decompress_url,FileAttachment){return(
decompress_url(FileAttachment("acorn-8.11.3.js.gz"))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["acorn-walk-8.3.2.js.gz", {url: new URL("./files/c2f0e91f1dd2b6f54808b2ba0ce16404a46278d3925ac7c9b8241c057c99c536f7b7434052464a2041d2df284f0217a5f5e857d88f423fcf6153a9cd6befa099.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["acorn-8.11.3.js.gz", {url: new URL("./files/ef3eafe327e862f191a35f6501c2c3467f9ccf3996a62bbddb02349c8154f92287caac5ba6cdd7b41dfc21857e366b4c2342a2a9d8e2fbaed102125ce54ee1d3.gz", import.meta.url), mimeType: "application/gzip", toString}],
    ["parser-6.1.0.js.gz", {url: new URL("./files/36c11e4bac3ebe9047f79a4b9f2ed1554e7d684bbb421e5e466a888e8cb074e5e466e67930075ad8887e2281609649c21f7f7ce7484771268670298c77bd6dbc.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("observable")).define("observable", _observable);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1);
  main.import("tests", child1);
  main.import("viewof runtime_variables", child1);
  main.import("runtime_variables", child1);
  main.import("modules", child1);
  main.variable(observer()).define(["tests"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("cellMaps")).define("cellMaps", ["cellMap2"], _cellMaps);
  main.variable(observer("allCells")).define("allCells", ["cellMaps"], _allCells);
  main.variable(observer("all_decompiled")).define("all_decompiled", ["allCells","decompile"], _all_decompiled);
  main.variable(observer("test_all_cells_decompilable")).define("test_all_cells_decompilable", ["all_decompiled"], _test_all_cells_decompilable);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("all_compiled")).define("all_compiled", ["all_decompiled","compile"], _all_compiled);
  main.variable(observer("test_decompiled_cells_recompilable")).define("test_decompiled_cells_recompilable", ["all_compiled"], _test_decompiled_cells_recompilable);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("roundtripped")).define("roundtripped", ["all_compiled","decompile"], _roundtripped);
  main.variable(observer("test_all_cells_roundtrippable")).define("test_all_cells_roundtrippable", ["roundtripped"], _test_all_cells_roundtrippable);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("dependancy_document")).define("dependancy_document", _dependancy_document);
  main.variable(observer("dependancy_source")).define("dependancy_source", ["dependancy_document"], _dependancy_source);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("notebook_semantics_document")).define("notebook_semantics_document", _notebook_semantics_document);
  main.variable(observer("notebook_semantics_source")).define("notebook_semantics_source", ["notebook_semantics_document","parser"], _notebook_semantics_source);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("dependancy_module")).define("dependancy_module", _dependancy_module);
  main.variable(observer("notebook_semantics_module")).define("notebook_semantics_module", _notebook_semantics_module);
  main.variable(observer("dependancy_runtime")).define("dependancy_runtime", ["observable","dependancy_module"], _dependancy_runtime);
  main.variable(observer("notebook_semantics_runtime")).define("notebook_semantics_runtime", ["dependancy_module","observable","notebook_semantics_module"], _notebook_semantics_runtime);
  main.variable(observer("notebook_semantics_variables")).define("notebook_semantics_variables", ["notebook_semantics_runtime","variableToObject"], _notebook_semantics_variables);
  const child2 = runtime.module(define2);
  main.import("cellMap", "cellMap2", child2);
  main.import("moduleMap", child2);
  main.import("cellMapCompat", child2);
  main.variable(observer("notebook_semantics_modules")).define("notebook_semantics_modules", ["moduleMap","notebook_semantics_runtime"], _notebook_semantics_modules);
  main.variable(observer("notebook_semantics_cells")).define("notebook_semantics_cells", ["cellMap2","notebook_semantics_runtime","notebook_semantics_modules"], _notebook_semantics_cells);
  main.variable(observer("notebook_define")).define("notebook_define", ["notebook_semantics_module"], _notebook_define);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("sourceModule")).define("sourceModule", _sourceModule);
  main.variable(observer("cellMap")).define("cellMap", ["cellMapCompat"], _cellMap);
  main.variable(observer("semanticsCells")).define("semanticsCells", ["cellMap","notebook_semantics_runtime"], _semanticsCells);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("test_cases")).define("test_cases", ["notebook_semantics_source","parser","semanticsCells","normalizeObservableSource"], _test_cases);
  main.variable(observer("importFake")).define("importFake", ["observable"], _importFake);
  main.variable(observer("test_decompile_$variable")).define("test_decompile_$variable", ["decompile","expect"], _test_decompile_$variable);
  main.variable(observer("test_decompile_import_variable")).define("test_decompile_import_variable", ["decompile","importFake","expect"], _test_decompile_import_variable);
  main.variable(observer("test_decompile_import_variable_alias")).define("test_decompile_import_variable_alias", ["decompile","importFake","expect"], _test_decompile_import_variable_alias);
  main.variable(observer("test_decompile_import_many")).define("test_decompile_import_many", ["decompile","importFake","expect"], _test_decompile_import_many);
  main.variable(observer("test_decompile_markdown_cell")).define("test_decompile_markdown_cell", ["decompile","expect"], _test_decompile_markdown_cell);
  main.variable(observer("test_decompile_constant")).define("test_decompile_constant", ["decompile","expect"], _test_decompile_constant);
  main.variable(observer("test_decompile_string_literal")).define("test_decompile_string_literal", ["decompile","expect"], _test_decompile_string_literal);
  main.variable(observer("test_decompile_html_cell")).define("test_decompile_html_cell", ["decompile","expect"], _test_decompile_html_cell);
  main.variable(observer("test_decompile_class")).define("test_decompile_class", ["decompile","expect"], _test_decompile_class);
  main.variable(observer("test_decompile_class_with_property")).define("test_decompile_class_with_property", ["decompile"], _test_decompile_class_with_property);
  main.variable(observer("test_decompile_object_literal")).define("test_decompile_object_literal", ["decompile","expect"], _test_decompile_object_literal);
  main.variable(observer("test_decompile_reference")).define("test_decompile_reference", ["decompile","expect"], _test_decompile_reference);
  main.variable(observer("test_decompile_block")).define("test_decompile_block", ["decompile","expect"], _test_decompile_block);
  main.variable(observer("test_decompile_comments")).define("test_decompile_comments", ["decompile","expect"], _test_decompile_comments);
  main.variable(observer("test_decompile_generator")).define("test_decompile_generator", ["decompile","expect"], _test_decompile_generator);
  main.variable(observer("test_decompile_function")).define("test_decompile_function", ["decompile","expect"], _test_decompile_function);
  main.variable(observer("test_decompile_async_function")).define("test_decompile_async_function", ["decompile","expect"], _test_decompile_async_function);
  main.variable(observer("test_decompile_named_function")).define("test_decompile_named_function", ["decompile","expect"], _test_decompile_named_function);
  main.variable(observer("test_decompile_this_reference")).define("test_decompile_this_reference", ["decompile","expect"], _test_decompile_this_reference);
  main.variable(observer("test_decompile_lambda")).define("test_decompile_lambda", ["decompile","expect"], _test_decompile_lambda);
  main.variable(observer("test_decompile_error")).define("test_decompile_error", ["decompile","expect"], _test_decompile_error);
  main.variable(observer("test_decompile_error_object")).define("test_decompile_error_object", ["decompile","expect"], _test_decompile_error_object);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("test_decompile_anon_error_dep")).define("test_decompile_anon_error_dep", ["decompile","expect"], _test_decompile_anon_error_dep);
  main.variable(observer("test_decompile_viewof")).define("test_decompile_viewof", ["decompile","expect"], _test_decompile_viewof);
  main.variable(observer("test_decompile_mutable")).define("test_decompile_mutable", ["decompile","expect"], _test_decompile_mutable);
  main.variable(observer("test_decompile_builtin")).define("test_decompile_builtin", ["decompile","expect"], _test_decompile_builtin);
  main.variable(observer("test_decompile_fileattachment")).define("test_decompile_fileattachment", ["decompile","expect"], _test_decompile_fileattachment);
  main.variable(observer("test_decompile_mutable_dependancy")).define("test_decompile_mutable_dependancy", ["decompile","expect"], _test_decompile_mutable_dependancy);
  main.variable(observer("test_decompile_mutable_dependancy_2")).define("test_decompile_mutable_dependancy_2", ["decompile","expect"], _test_decompile_mutable_dependancy_2);
  main.variable(observer("test_decompile_viewof_dep")).define("test_decompile_viewof_dep", ["decompile","expect"], _test_decompile_viewof_dep);
  main.variable(observer("test_decompile_viewof_data_dep")).define("test_decompile_viewof_data_dep", ["decompile","expect"], _test_decompile_viewof_data_dep);
  main.variable(observer("test_decompile_anon_dep")).define("test_decompile_anon_dep", ["decompile","expect"], _test_decompile_anon_dep);
  main.variable(observer("test_decompile_import_mutable")).define("test_decompile_import_mutable", ["decompile","expect"], _test_decompile_import_mutable);
  main.variable(observer("test_decompile_import_viewof")).define("test_decompile_import_viewof", ["decompile","expect"], _test_decompile_import_viewof);
  main.variable(observer("test_decompile_viewof_data")).define("test_decompile_viewof_data", ["decompile","expect"], _test_decompile_viewof_data);
  main.variable(observer("test_decompile_import_alias")).define("test_decompile_import_alias", ["decompile","expect"], _test_decompile_import_alias);
  main.variable(observer("test_decompile_import_mutable_alias")).define("test_decompile_import_mutable_alias", ["decompile","expect"], _test_decompile_import_mutable_alias);
  main.variable(observer("test_decompile_import_mutable_data_alias")).define("test_decompile_import_mutable_data_alias", ["decompile","expect"], _test_decompile_import_mutable_data_alias);
  main.variable(observer("test_decompile_import_viewof_alias")).define("test_decompile_import_viewof_alias", ["decompile","expect"], _test_decompile_import_viewof_alias);
  main.variable(observer("test_decompile_import_viewof_data_alias")).define("test_decompile_import_viewof_data_alias", ["decompile","expect"], _test_decompile_import_viewof_data_alias);
  main.variable(observer("decompile_unit_test_template")).define("decompile_unit_test_template", ["Inputs","decompileCellCase","variableToObject","decompiled_example"], _decompile_unit_test_template);
  main.variable(observer()).define(["md"], _91);
  const child3 = runtime.module(define3);
  main.import("escodegen", child3);
  main.variable(observer("viewof decompileCellCase")).define("viewof decompileCellCase", ["Inputs","notebook_semantics_cells"], _decompileCellCase);
  main.variable(observer("decompileCellCase")).define("decompileCellCase", ["Generators", "viewof decompileCellCase"], (G, _) => G.input(_));
  main.variable(observer()).define(["decompileCellCase"], _94);
  main.variable(observer("decompiled_example")).define("decompiled_example", ["decompile","decompileCellCase"], _decompiled_example);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("extractModuleInfo")).define("extractModuleInfo", _extractModuleInfo);
  main.variable(observer("test_extractModuleInfo_notebook_resolution")).define("test_extractModuleInfo_notebook_resolution", ["expect","extractModuleInfo"], _test_extractModuleInfo_notebook_resolution);
  main.variable(observer("test_extractModuleInfo_id_version_resolution")).define("test_extractModuleInfo_id_version_resolution", ["expect","extractModuleInfo"], _test_extractModuleInfo_id_version_resolution);
  main.variable(observer("test_extractModuleInfo_id_version")).define("test_extractModuleInfo_id_version", ["expect","extractModuleInfo"], _test_extractModuleInfo_id_version);
  main.variable(observer("test_extractModuleInfo_test_4")).define("test_extractModuleInfo_test_4", ["expect","extractModuleInfo"], _test_extractModuleInfo_test_4);
  main.variable(observer("test_extractModuleInfo_alias_hack")).define("test_extractModuleInfo_alias_hack", ["expect","extractModuleInfo"], _test_extractModuleInfo_alias_hack);
  main.variable(observer()).define(["md"], _103);
  main.variable(observer("import_ast_example")).define("import_ast_example", ["parser"], _import_ast_example);
  main.variable(observer("findModuleName")).define("findModuleName", ["extractModuleInfo"], _findModuleName);
  main.variable(observer("findImportedName")).define("findImportedName", _findImportedName);
  main.variable(observer()).define(["md"], _107);
  main.variable(observer("decompile")).define("decompile", ["findModuleName","findImportedName","acorn","escodegen"], _decompile);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer("viewof normalizeJavascriptSourceSelector")).define("viewof normalizeJavascriptSourceSelector", ["Inputs","notebook_semantics_variables"], _normalizeJavascriptSourceSelector);
  main.variable(observer("normalizeJavascriptSourceSelector")).define("normalizeJavascriptSourceSelector", ["Generators", "viewof normalizeJavascriptSourceSelector"], (G, _) => G.input(_));
  main.variable(observer("normalizeJavascriptSource")).define("normalizeJavascriptSource", ["acorn","escodegen"], _normalizeJavascriptSource);
  main.variable(observer()).define(["normalizeJavascriptSource","normalizeJavascriptSourceSelector"], _112);
  main.variable(observer("normalizeVariables")).define("normalizeVariables", ["variableToObject","normalizeJavascriptSource"], _normalizeVariables);
  main.variable(observer("variableToObject")).define("variableToObject", _variableToObject);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer("viewof normalizeObservableSourceSelector")).define("viewof normalizeObservableSourceSelector", ["Inputs","notebook_semantics_source"], _normalizeObservableSourceSelector);
  main.variable(observer("normalizeObservableSourceSelector")).define("normalizeObservableSourceSelector", ["Generators", "viewof normalizeObservableSourceSelector"], (G, _) => G.input(_));
  main.variable(observer()).define(["normalizeObservableSource","normalizeObservableSourceSelector"], _117);
  main.variable(observer("parsed")).define("parsed", ["parser","normalizeObservableSourceSelector"], _parsed);
  main.variable(observer("generate")).define("generate", ["escodegen"], _generate);
  main.variable(observer("normalizeObservableSource")).define("normalizeObservableSource", ["parser","generate"], _normalizeObservableSource);
  main.variable(observer()).define(["md"], _121);
  main.variable(observer("test_async_interpolation")).define("test_async_interpolation", ["compile"], _test_async_interpolation);
  main.variable(observer()).define(["compile"], _123);
  main.variable(observer("test_compile_integer")).define("test_compile_integer", ["compile","expect"], _test_compile_integer);
  main.variable(observer("test_compile_string")).define("test_compile_string", ["compile","expect"], _test_compile_string);
  main.variable(observer("test_compile_obj_literal")).define("test_compile_obj_literal", ["compile","expect"], _test_compile_obj_literal);
  main.variable(observer("test_compile_assignment")).define("test_compile_assignment", ["compile","expect"], _test_compile_assignment);
  main.variable(observer("test_compile_dependancy")).define("test_compile_dependancy", ["compile","expect"], _test_compile_dependancy);
  main.variable(observer("test_compile_block_dependancy")).define("test_compile_block_dependancy", ["compile","expect"], _test_compile_block_dependancy);
  main.variable(observer("test_compile_comments")).define("test_compile_comments", ["compile","expect"], _test_compile_comments);
  main.variable(observer("test_compile_generator")).define("test_compile_generator", ["compile","expect"], _test_compile_generator);
  main.variable(observer("test_compile_function")).define("test_compile_function", ["compile","expect"], _test_compile_function);
  main.variable(observer("test_compile_async_function")).define("test_compile_async_function", ["compile","expect"], _test_compile_async_function);
  main.variable(observer("test_compile_named_function")).define("test_compile_named_function", ["compile","expect"], _test_compile_named_function);
  main.variable(observer("test_compile_this_reference")).define("test_compile_this_reference", ["compile","expect"], _test_compile_this_reference);
  main.variable(observer("test_compile_lambda")).define("test_compile_lambda", ["compile","expect"], _test_compile_lambda);
  main.variable(observer("test_compile_error")).define("test_compile_error", ["compile","expect"], _test_compile_error);
  main.variable(observer("test_compile_viewof")).define("test_compile_viewof", ["compile","expect"], _test_compile_viewof);
  main.variable(observer("test_compile_mutable")).define("test_compile_mutable", ["compile","expect"], _test_compile_mutable);
  main.variable(observer("test_compile_builtin")).define("test_compile_builtin", ["compile","expect"], _test_compile_builtin);
  main.variable(observer("test_compile_fileattachment")).define("test_compile_fileattachment", ["compile","expect"], _test_compile_fileattachment);
  main.variable(observer("test_compile_mutable_dep")).define("test_compile_mutable_dep", ["compile","expect"], _test_compile_mutable_dep);
  main.variable(observer("test_compile_mutable_dep2")).define("test_compile_mutable_dep2", ["compile","expect"], _test_compile_mutable_dep2);
  main.variable(observer("test_compile_inline_viewof")).define("test_compile_inline_viewof", ["compile","expect"], _test_compile_inline_viewof);
  main.variable(observer("test_compile_view_dep")).define("test_compile_view_dep", ["compile","expect"], _test_compile_view_dep);
  main.variable(observer("test_compile_dep")).define("test_compile_dep", ["compile","expect"], _test_compile_dep);
  main.variable(observer("test_compile_class")).define("test_compile_class", ["compile","expect"], _test_compile_class);
  main.variable(observer("test_compile_event")).define("test_compile_event", ["compile","expect"], _test_compile_event);
  main.variable(observer("test_compile_tagged_literal")).define("test_compile_tagged_literal", ["compile","expect"], _test_compile_tagged_literal);
  main.variable(observer("compile_unit_test_template")).define("compile_unit_test_template", ["Inputs","test_case","compiled"], _compile_unit_test_template);
  main.variable(observer("test_compile_import")).define("test_compile_import", ["compile","expect"], _test_compile_import);
  main.variable(observer("test_compile_import_notebook")).define("test_compile_import_notebook", ["compile","expect"], _test_compile_import_notebook);
  main.variable(observer("viewof test_case")).define("viewof test_case", ["Inputs","notebook_semantics_source"], _test_case);
  main.variable(observer("test_case")).define("test_case", ["Generators", "viewof test_case"], (G, _) => G.input(_));
  main.variable(observer()).define(["test_case"], _154);
  main.variable(observer("compiled")).define("compiled", ["compile","test_case"], _compiled);
  main.variable(observer()).define(["parser","test_case"], _156);
  main.variable(observer("viewof compiled_selector")).define("viewof compiled_selector", ["Inputs","compiled"], _compiled_selector);
  main.variable(observer("compiled_selector")).define("compiled_selector", ["Generators", "viewof compiled_selector"], (G, _) => G.input(_));
  main.variable(observer()).define(["compiled_selector","normalizeJavascriptSource"], _158);
  main.variable(observer()).define(["compile","test_case"], _159);
  main.variable(observer()).define(["normalizeVariables","test_case"], _160);
  main.variable(observer("singleCompileTest")).define("singleCompileTest", ["compile","test_case","expect","normalizeVariables"], _singleCompileTest);
  main.variable(observer("compile")).define("compile", ["parser","observableToJs"], _compile);
  main.variable(observer("observableToJs")).define("observableToJs", ["acorn_walk","parser","escodegen"], _observableToJs);
  main.variable(observer()).define(["md"], _164);
  main.variable(observer("decompress_url")).define("decompress_url", ["DecompressionStream","TextDecoderStream","TransformStream","TextEncoderStream","Response"], _decompress_url);
  main.variable(observer("parser")).define("parser", ["decompress_url","FileAttachment","acorn_url","acorn_walk_url"], _parser);
  main.variable(observer("acorn_walk")).define("acorn_walk", ["acorn_walk_url"], _acorn_walk);
  const child4 = runtime.module(define4);
  main.import("acorn", child4);
  main.variable(observer("acorn_walk_url")).define("acorn_walk_url", ["decompress_url","FileAttachment"], _acorn_walk_url);
  main.variable(observer("acorn_url")).define("acorn_url", ["decompress_url","FileAttachment"], _acorn_url);
  const child5 = runtime.module(define5);
  main.import("expect", child5);
  return main;
}
