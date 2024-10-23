import define1 from "./f550ddbdb36998cb@120.js";
import define2 from "./17c8ce433e1df58e@3272.js";
import define3 from "./c7a3b20cec5d4dd9@725.js";

function _1(md){return(
md`# Observable JS <=> Runtime Toolchain

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
- notebook imports (detected up as anonymous variables in test suite)
- anonymous variables work, but the test cases fail due to naming mismatches
- object literal needs preserving using parenthesis, we have added this to decompile, but the normalalization the tests use erases it and the test fails (falsely)`
)}

function _observable(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

function _8(md){return(
md`## Reference Data`
)}

function _9(md){return(
md`### Source code
The source code of a [reference notebook](https://observablehq.com/@tomlarkworthy/notebook-semantics?collection=@tomlarkworthy/lopebook) is extracted directly from the \`https://api.observablehq.com/document/...\` endpoint

\`\`\`
curl https://api.observablehq.com/document/@tomlarkworthy/dependancy
\`\`\``
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

function _12(md){return(
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
  update_time: "2024-10-23T11:11:22.340Z",
  first_public_version: 90,
  paused_version: null,
  publish_time: "2024-10-15T18:29:58.853Z",
  publish_version: 118,
  latest_version: 118,
  thumbnail: null,
  default_thumbnail: null,
  roles: [],
  sharing: null,
  edits: [
    { node_id: 48, value: 'file = FileAttachment("empty")' },
    { node_id: 55, value: "mutable_dep_2 = {\n  file;\n  return q + 1;\n}" }
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
      title: "noho",
      description: "",
      update_time: "2024-10-22T21:51:39.853Z",
      pinned: false,
      ordered: true,
      custom_thumbnail: null,
      default_thumbnail:
        "f7e5be7747535b6e526cfd42de66b48a4f3a3b01c4be740eade7ae964805f284",
      thumbnail:
        "f7e5be7747535b6e526cfd42de66b48a4f3a3b01c4be740eade7ae964805f284",
      listing_count: 1,
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
  version: 118,
  title: "Notebook Semantics",
  license: "mit",
  copyright: "Copyright 2024 Tom Larkworthy",
  nodes: [
    {
      id: 0,
      value: "# Notebook Semantics",
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
        'import {\n  dep,\n  mutable mutabledep,\n  viewof viewdep\n} from "@tomlarkworthy/dependancy"',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 87,
      value:
        'import {\n  dep as dep_alias,\n  mutable mutabledep as aslias_mutabledep,\n  viewof viewdep as aslias_viewdep\n} from "@tomlarkworthy/dependancy"',
      pinned: true,
      mode: "js",
      data: null,
      name: null
    },
    {
      id: 89,
      value:
        'import {\n  mutabledep as aslias_mutabledep_data,\n  viewdep as aslias_viewdep_data\n} from "@tomlarkworthy/dependancy"',
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

function _notebook_semantics_source(notebook_semantics_document){return(
notebook_semantics_document.nodes.map((s) => ({
  value: s.value,
  name: s.name,
  mode: s.mode
}))
)}

function _15(highlight,notebook_semantics_source){return(
highlight(notebook_semantics_source)
)}

function _16(md){return(
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
  await new Promise((resolve) => setTimeout(resolve, 100));
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

function _variableToObject(){return(
(v) => ({
  _name: v._name,
  _definition: v._definition.toString(),
  _inputs: v._inputs.map((v) => v._name || v)
})
)}

function _23(highlight,notebook_semantics_variables){return(
highlight(notebook_semantics_variables)
)}

function _notebook_define(notebook_semantics_module){return(
notebook_semantics_module.default.toString()
)}

function _25(highlight,notebook_define){return(
highlight(notebook_define)
)}

function _26(md){return(
md`### Cell map

\`viewof\` and \`mutable\` calls define more than one runtime variable, so we often need to group by their source cell label.`
)}

function _cellMap(){return(
(runtime, module, { excludeInbuilt = false } = {}) => {
  let c = 0;
  const viewofs = new Set();
  const mutables = new Set();

  const groups = [...runtime._variables]
    .filter((v) => v._module == module && (!excludeInbuilt || v._type == 1))
    .reduce((map, v) => {
      if (v._name) {
        if (v._name.startsWith("viewof ")) {
          viewofs.add(v);
        } else if (v._name.startsWith("mutable ")) {
          mutables.add(v);
        } else {
          map.set(v._name, [v]);
        }
      } else {
        map.set(c++, [v]);
      }
      return map;
    }, new Map());

  for (const v of viewofs) {
    const name = v._name.substring(7);
    groups.set(v._name, [v, groups.get(name)[0]]);
    groups.delete(name);
  }

  for (const v of mutables) {
    const name = v._name.substring(8);
    const intital = "initial " + name;
    groups.set(v._name, [groups.get(intital)?.[0], v, groups.get(name)[0]]);
    groups.delete(intital);
    groups.delete(name);
  }

  return groups;
}
)}

function _semanticsCells(cellMap,notebook_semantics_runtime){return(
cellMap(
  notebook_semantics_runtime.runtime,
  notebook_semantics_runtime.module
)
)}

function _29(md){return(
md`## Test cases`
)}

function _test_cases(notebook_semantics_source,parser,semanticsCells,normalizeObservableSource)
{
  let anonIdx = 1; // hack to get things to align as we filtered by ".js" , test suite specific
  const testCases = notebook_semantics_source
    .filter((s) => s.mode == "js")
    .map((source) => {
      const ast = parser.parseCell(source.value);
      const prefix =
        ast?.id?.type == "ViewExpression"
          ? "viewof "
          : ast?.id?.type == "MutableExpression"
          ? "mutable "
          : "";
      const name = ast.id?.name || ast?.id?.id?.name || anonIdx++;
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


function _31(highlight,test_cases){return(
highlight(test_cases)
)}

function _decompilationSuite(createSuite){return(
createSuite({
  name: "Decompilation Test Cases"
})
)}

function _decompilationResults(decompilationSuite){return(
decompilationSuite.viewofResults
)}

function _decompilation_test_results(decompilationResults,report,decompilationSuite){return(
decompilationResults && report(decompilationSuite)
)}

function _reference_decompilation_cases(test_cases,decompilationSuite,expect,decompile){return(
{
  prompt: "Write a declarative testing interface",
  time: 1726339624075
} &&
  Promise.all(
    test_cases.map(({ name, source, variables, normalizeSource }, i) => {
      return decompilationSuite.test(name || `test-${i}`, async (done) => {
        await expect(await decompile(variables)).toEqual(normalizeSource);
        done();
      });
    })
  )
)}

function _36(highlight,decompilation_test_results){return(
highlight(decompilation_test_results)
)}

function _37(md){return(
md`### The Decompiler`
)}

function _decompileObservableVariableSelection(Inputs,notebook_semantics_variables){return(
Inputs.select(
  notebook_semantics_variables.map((s) => s._definition),
  { label: "decompile case", value: "1" }
)
)}

function _decompileVariable(notebook_semantics_variables,decompileObservableVariableSelection){return(
notebook_semantics_variables.find(
  (v) => v._definition == decompileObservableVariableSelection
)
)}

function _decompiled_example(decompile,decompileVariable)
{
  debugger;
  return decompile([decompileVariable]);
}


function _decompile(acorn,escodegen){return(
{ prompt: "fix tests", time: 1726546383668 } &&
  async function decompile(variables) {
    if (!variables || variables.length == 0)
      throw new Error("no variables to decompile");

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
    const parsed = acorn.parse(wrappedCode, {
      ecmaVersion: 2022,
      sourceType: "module"
    });

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
      body.body[0].type === "ReturnStatement"
    ) {
      // If the body is a single ReturnStatement, decompile its argument
      if (wrappedCode[body.body[0].argument.start] == "{") {
        // bugfix if the body is an object literal we need to escape it
        expression = `(${escodegen.generate(body.body[0].argument)})`;
      } else {
        expression = escodegen.generate(body.body[0].argument);
      }
    } else {
      // For other types, decompile the whole body
      expression = escodegen.generate(body);
    }
    debugger;
    let source = `${varName ? `${prefix}${varName} = ` : ""}${expression}`;

    // replace mutable and viewofs
    let id = 0;
    inputs.forEach((input, idx) => {
      if (input.startsWith("mutable ")) {
        source = source.replaceAll(`$${id++}.value`, input);
      } else if (input.startsWith("viewof ")) {
        source = source.replaceAll(`$${id++}`, input);
      }
    });
    return source;
  }
)}

function _43(md){return(
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

function _normalizeJavascriptSource(escodegen,acorn){return(
(source) => escodegen.generate(acorn.parse(source))
)}

function _46(normalizeJavascriptSource,normalizeJavascriptSourceSelector){return(
normalizeJavascriptSource(normalizeJavascriptSourceSelector)
)}

function _47(md){return(
md`## Observable Source Normalization`
)}

function _normalizeObservableSourceSelector(Inputs,notebook_semantics_source){return(
Inputs.select(
  notebook_semantics_source.map((s) => s.value),
  { label: "test case", value: "1" }
)
)}

function _49(normalizeObservableSource,normalizeObservableSourceSelector){return(
normalizeObservableSource(normalizeObservableSourceSelector)
)}

function _parser(require){return(
require("@observablehq/parser")
)}

function _parsed(parser,normalizeObservableSourceSelector){return(
parser.parseCell(normalizeObservableSourceSelector)
)}

function _generate(escodegen){return(
function generate(node) {
  if (node.type == "Cell") {
    return `${node.id ? `${generate(node.id)} = ` : ""}${escodegen.generate(
      node.body
    )}`;
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
    const cell = parser.parseCell(source);

    source = generate(cell);

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

function _54(md){return(
md`## The Compiler

`
)}

function _compilationSuite(createSuite){return(
createSuite({
  name: "Compilation Test Cases"
})
)}

function _compilationResults(compilationSuite){return(
compilationSuite.viewofResults
)}

function _compilation_test_results(compilationResults,report,compilationSuite){return(
compilationResults && report(compilationSuite)
)}

function _58(highlight,compilation_test_results){return(
highlight(compilation_test_results)
)}

function _59(test_cases,compilationSuite,expect,normalizeVariables,compile){return(
{ prompt: "Write tests for the compile", time: 1726339624075 } &&
  Promise.all(
    test_cases.map(({ name, source, variables, normalizeSource }, i) => {
      return compilationSuite.test(name || `test-${i}`, async (done) => {
        await expect(
          normalizeVariables(
            await compile(source.value, { anonymousName: `_${i + 2}` })
          )
        ).toEqual(normalizeVariables(variables));
        done();
      });
    })
  )
)}

function _compilerSourceSelector(Inputs,notebook_semantics_source){return(
Inputs.select(
  notebook_semantics_source.map((s) => s.value),
  { label: "compilation test case", value: "1" }
)
)}

function _test_case(test_cases,compilerSourceSelector){return(
test_cases.find(
  (test) => test.source.value == compilerSourceSelector
)
)}

async function _compiled(compile,test_case){return(
await compile(test_case.source.value)
)}

function _63(parser,test_case){return(
parser.parseCell(test_case.source.value)
)}

function _compiled_selector(Inputs,compiled){return(
Inputs.radio(compiled, {
  format: (v) => v._name,
  value: compiled[0]
})
)}

function _65(compiled_selector,normalizeJavascriptSource){return(
JSON.stringify(
  {
    ...compiled_selector,
    _definition: normalizeJavascriptSource(compiled_selector._definition)
  },
  null,
  2
)
)}

function _66(compile,test_case){return(
compile(test_case.source.value)
)}

function _normalizeVariables(variableToObject,normalizeJavascriptSource){return(
(variables) =>
  variables.map(variableToObject).map((v) => ({
    ...v,
    _definition: normalizeJavascriptSource(v._definition)
  }))
)}

function _68(normalizeVariables,test_case){return(
normalizeVariables(test_case.variables)[0]._definition
)}

async function _singleCompileTest(expect,normalizeVariables,compile,test_case)
{
  try {
    return expect(
      normalizeVariables(await compile(test_case.source.value))
    ).toEqual(normalizeVariables(test_case.variables));
  } catch (e) {
    return e;
  }
}


function _70(highlight,singleCompileTest){return(
highlight(singleCompileTest || "OK")
)}

function _compile(parser,observableToJs){return(
{ prompt: "fix the singleCompileTest", time: 1729232320503 } &&
  function compile(source, { anonymousName = "_anonymous" } = {}) {
    // Parse the cell using the Observable parser
    const cell = parser.parseCell(source);
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

    // Generate code for the function body
    return variables.map((v) => {
      let _definition = v._definition;

      if (!_definition) {
        let functionBody;
        if (cell.body.type === "BlockStatement") {
          // For BlockStatement, use the block directly
          functionBody = observableToJs(cell.body, inputToArgMap);
        } else {
          // For other expressions, wrap in return ()
          const bodyCode = observableToJs(cell.body, inputToArgMap);
          functionBody = `{return (${bodyCode});}`;
        }

        // Construct the function definition
        _definition = `function${cell.generator ? "*" : ""} ${
          v.functionName
        }(${v.inputs.map((i) => inputToArgMap[i] || i)}) ${functionBody}`;
      }

      return {
        _name: v.name,
        _inputs: v.inputs.map((i) => dollarToMacro[i] || i),
        _definition: _definition
      };
    });
  }
)}

function _ast(Inputs){return(
Inputs.input()
)}

function _observableToJs($0,acorn_walk,parser,escodegen){return(
(ast, inputMap) => {
  $0.value = ast;

  // Replace ViewExpression with their id so they are removed from
  // source and replaced with a JS compatible one
  acorn_walk.ancestor(
    ast,
    {
      ViewExpression(node, ancestors) {
        debugger;
        const reference = "viewof " + node.id.name;
        node.type = "Identifier";
        node.name = inputMap[node.id.name];
      },
      MutableExpression(node, ancestors) {
        debugger;
        const reference = "mutable " + node.id.name;
        node.type = "Identifier";
        // hack as ".value" is not valid identifier, but es
        node.name = inputMap[node.id.name] + ".value"; 
      }
    },
    parser.walk
  );
  return escodegen.generate(ast);
}
)}

function _acorn_walk(){return(
import("https://unpkg.com/acorn-walk@8?module")
)}

function _75($0){return(
$0
)}

function _76(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _77($0){return(
$0
)}

function _78(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _79($0){return(
$0
)}

function _80(md){return(
md`### AI Settings`
)}

function _81($0){return(
$0
)}

function _82($0){return(
$0
)}

function _83($0){return(
$0
)}

function _observable_js_skill(html,md){return(
{
  prompt: "Explain the Observablehq programming model",
  time: 1700163368139
} &&
  html`<h2>Observable Programming Skill</h2>
<details>
  ${md`
The JavaScript dialect used in Observable notebooks is almost—but not entirely—vanilla. This is intentional: by building on the native language of the web, Observable is familiar. And you can use the libraries you know and love, such as D3, Lodash, and Apache Arrow. Yet for dataflow, Observable needed to change JavaScript in a few ways.

> **Note**  
> Observable JavaScript is used in notebooks only. Observable Framework uses vanilla JavaScript.

Here's a quick overview of what's different from vanilla.

## Cells are Separate Scripts

Each cell in a notebook is a separate script that runs independently. A syntax error in one cell won't prevent other cells from running.

~~~javascript
// Example of a syntax error in a cell
This is English, not JavaScript.
~~~

~~~javascript
// Example of a valid cell assignment
myCell = "some string"
~~~

~~~javascript
// Example of a runtime error in a cell
{ throw new Error("oopsie"); }
~~~

Even if one cell has a syntax or runtime error, it does not affect the execution of other cells.

Local variables are only visible to the cell that defines them. For example:

~~~javascript
// Defining a local variable in one cell
{ const local = "I am a local variable."; }
~~~
  
~~~javascript
// Attempting to use the local variable in another cell
local // not defined
~~~

The second cell above will cause a runtime error because \`local\` is not defined in that cell's scope.

## Cells Run in Topological Order

In vanilla JavaScript, code runs from top to bottom. Not so here; Observable runs like a spreadsheet, so you can define your cells in whatever order makes sense.

~~~javascript
// Using a variable defined in a later cell
a + 2 // a is defined below
~~~

~~~javascript
// Defining the variable 'a'
a = 1
~~~

You can define cells in any order you like. Here, \`a\` is successfully used as a variable in the cell before it is defined. However, circular definitions are not allowed:

~~~javascript
// Circular reference causing an error
c1 = c2 - 1
c2 = c1 + 1
~~~

Both \`c1\` and \`c2\` will throw a runtime error due to circular definition.

## Cells Re-run When Any Referenced Cell Changes

You don't have to run cells explicitly when you edit or interact—the notebook updates automatically. If a cell allocates resources that won't be automatically cleaned up by the garbage collector, such as an animation loop or event listener, use the \`invalidation\` promise to dispose of these resources manually and avoid leaks.

~~~javascript
// Using the invalidation promise for cleanup
{ invalidation.then(() => console.log("I was invalidated.")); }
~~~

## Cells Implicitly Await Promises

Cells can contain promises, and referencing cells will implicitly wait for these promises to resolve before running:

~~~javascript
// Defining a cell with a promise
hello = new Promise(resolve => {
  setTimeout(() => {
    resolve("hello there");
  }, 30000);
})
~~~

Referencing cells will wait for \`hello\` to resolve before they execute.

## Cells Implicitly Iterate Over Generators

If a cell yields, any referencing cell will see the most recently yielded value.

~~~javascript
// Using a generator with yield statements
c = {
  yield 1;
  yield 2;
  yield 3;
}
~~~

~~~javascript
// Referencing the generator cell
c
~~~

Referencing \`c\` will return the most recently yielded value, which in this example would be \`3\`.

## Named Cells are Declarations, Not Assignments

Named cells look like, and function almost like, assignment expressions in vanilla JavaScript. But cells can be defined in any order, so think of them as hoisted function declarations.

~~~javascript
// Trying to reassign a cell's value
foo = 2
{ foo = 3 } // SyntaxError: Assignment to constant variable foo
~~~

Cell names must also be unique, and you cannot reassign the value of another cell without using \`mutable\` variables.

## Statements Need Curly Braces, and Return or Yield

A cell body can be a simple expression, such as a number or string literal, or a function call. But for statements like loops, you'll need curly braces and a \`return\` statement to give the cell a value.

~~~javascript
// Using a block statement with a return
{
  let sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += i;
  }
  return sum;
}
// Output: 45
~~~

## Object Literals Need Parentheses or Return

Wrap object literals in parentheses or use a block statement with a \`return\` to ensure they are interpreted correctly.

~~~javascript
// Correctly defining object literals
object = ({ foo: "bar" })

block = { return { foo: "bar" }; }
~~~

Without parentheses or \`return\`, the cell would interpret the object literal incorrectly, leading to undefined behavior.

~~~javascript
// Incorrectly defining an object literal
label = { foo: "bar" }
// Output: undefined
~~~

## Cells Can Be Views

Observable has a special \`viewof\` operator which lets you define interactive values. A view is a cell with two faces: its user interface, and its programmatic value.

~~~javascript
// Using viewof to create an interactive text input
viewof text = html\`<input value="edit me">\`

// Accessing the value of 'text'
text
// Output: "edit me"
~~~

## Cells Can Be Mutables

Observable provides the \`mutable\` operator so you can opt into mutable state:

~~~javascript
// Defining and using a mutable variable
mutable thing = 0

// Mutating the value of \'thing\'
++mutable thing
// Output: 1
~~~

## Observable Has a Standard Library

Observable provides a small standard library for essential features, such as a reactive width and Inputs.

## Cells Can Be Imported from Other Notebooks

You can import any named cell from any Obserable notebooks, with syntax similar to static ES imports.

~~~javascript
// Importing the 'ramp' function from another notebook
import { ramp } from "@mbostock/ramp"

// Using the imported 'ramp' function
ramp(d3.interpolateBrBG)
~~~

## Static ES Imports Are Not Supported; Use Dynamic Imports

You cannot use normal static ES imports. To use the vanilla JS ecosystem, dynamically import modules from\`esm.sh\` or \`skypack\`.

~~~javascript
// Dynamically importing lodash
_ = import("https://cdn.skypack.dev/lodash-es@4")

// Using lodash function
_.camelCase("lodash was here")
// Output: "lodashWasHere"
~~~

This completes the overview of Observable's programming model, including specific behaviors and differences from standard JavaScript, emphasizing interactivity, reactivity, and cell independence.
`}
</details>
`
)}

function _85(md){return(
md`---`
)}

function _87(ask){return(
ask
)}

function _88(api_call_response){return(
api_call_response
)}

function _89(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("observable")).define("observable", _observable);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("dependancy_document")).define("dependancy_document", _dependancy_document);
  main.variable(observer("dependancy_source")).define("dependancy_source", ["dependancy_document"], _dependancy_source);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("notebook_semantics_document")).define("notebook_semantics_document", _notebook_semantics_document);
  main.variable(observer("notebook_semantics_source")).define("notebook_semantics_source", ["notebook_semantics_document"], _notebook_semantics_source);
  main.variable(observer()).define(["highlight","notebook_semantics_source"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("dependancy_module")).define("dependancy_module", _dependancy_module);
  main.variable(observer("notebook_semantics_module")).define("notebook_semantics_module", _notebook_semantics_module);
  main.variable(observer("dependancy_runtime")).define("dependancy_runtime", ["observable","dependancy_module"], _dependancy_runtime);
  main.variable(observer("notebook_semantics_runtime")).define("notebook_semantics_runtime", ["dependancy_module","observable","notebook_semantics_module"], _notebook_semantics_runtime);
  main.variable(observer("notebook_semantics_variables")).define("notebook_semantics_variables", ["notebook_semantics_runtime","variableToObject"], _notebook_semantics_variables);
  main.variable(observer("variableToObject")).define("variableToObject", _variableToObject);
  main.variable(observer()).define(["highlight","notebook_semantics_variables"], _23);
  main.variable(observer("notebook_define")).define("notebook_define", ["notebook_semantics_module"], _notebook_define);
  main.variable(observer()).define(["highlight","notebook_define"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("cellMap")).define("cellMap", _cellMap);
  main.variable(observer("semanticsCells")).define("semanticsCells", ["cellMap","notebook_semantics_runtime"], _semanticsCells);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("test_cases")).define("test_cases", ["notebook_semantics_source","parser","semanticsCells","normalizeObservableSource"], _test_cases);
  main.variable(observer()).define(["highlight","test_cases"], _31);
  main.variable(observer("viewof decompilationSuite")).define("viewof decompilationSuite", ["createSuite"], _decompilationSuite);
  main.variable(observer("decompilationSuite")).define("decompilationSuite", ["Generators", "viewof decompilationSuite"], (G, _) => G.input(_));
  main.variable(observer("viewof decompilationResults")).define("viewof decompilationResults", ["decompilationSuite"], _decompilationResults);
  main.variable(observer("decompilationResults")).define("decompilationResults", ["Generators", "viewof decompilationResults"], (G, _) => G.input(_));
  main.variable(observer("decompilation_test_results")).define("decompilation_test_results", ["decompilationResults","report","decompilationSuite"], _decompilation_test_results);
  main.variable(observer("reference_decompilation_cases")).define("reference_decompilation_cases", ["test_cases","decompilationSuite","expect","decompile"], _reference_decompilation_cases);
  main.variable(observer()).define(["highlight","decompilation_test_results"], _36);
  main.variable(observer()).define(["md"], _37);
  const child1 = runtime.module(define1);
  main.import("escodegen", child1);
  main.variable(observer("viewof decompileObservableVariableSelection")).define("viewof decompileObservableVariableSelection", ["Inputs","notebook_semantics_variables"], _decompileObservableVariableSelection);
  main.variable(observer("decompileObservableVariableSelection")).define("decompileObservableVariableSelection", ["Generators", "viewof decompileObservableVariableSelection"], (G, _) => G.input(_));
  main.variable(observer("decompileVariable")).define("decompileVariable", ["notebook_semantics_variables","decompileObservableVariableSelection"], _decompileVariable);
  main.variable(observer("decompiled_example")).define("decompiled_example", ["decompile","decompileVariable"], _decompiled_example);
  main.variable(observer("decompile")).define("decompile", ["acorn","escodegen"], _decompile);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("viewof normalizeJavascriptSourceSelector")).define("viewof normalizeJavascriptSourceSelector", ["Inputs","notebook_semantics_variables"], _normalizeJavascriptSourceSelector);
  main.variable(observer("normalizeJavascriptSourceSelector")).define("normalizeJavascriptSourceSelector", ["Generators", "viewof normalizeJavascriptSourceSelector"], (G, _) => G.input(_));
  main.variable(observer("normalizeJavascriptSource")).define("normalizeJavascriptSource", ["escodegen","acorn"], _normalizeJavascriptSource);
  main.variable(observer()).define(["normalizeJavascriptSource","normalizeJavascriptSourceSelector"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("viewof normalizeObservableSourceSelector")).define("viewof normalizeObservableSourceSelector", ["Inputs","notebook_semantics_source"], _normalizeObservableSourceSelector);
  main.variable(observer("normalizeObservableSourceSelector")).define("normalizeObservableSourceSelector", ["Generators", "viewof normalizeObservableSourceSelector"], (G, _) => G.input(_));
  main.variable(observer()).define(["normalizeObservableSource","normalizeObservableSourceSelector"], _49);
  main.variable(observer("parser")).define("parser", ["require"], _parser);
  main.variable(observer("parsed")).define("parsed", ["parser","normalizeObservableSourceSelector"], _parsed);
  main.variable(observer("generate")).define("generate", ["escodegen"], _generate);
  main.variable(observer("normalizeObservableSource")).define("normalizeObservableSource", ["parser","generate"], _normalizeObservableSource);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("viewof compilationSuite")).define("viewof compilationSuite", ["createSuite"], _compilationSuite);
  main.variable(observer("compilationSuite")).define("compilationSuite", ["Generators", "viewof compilationSuite"], (G, _) => G.input(_));
  main.variable(observer("viewof compilationResults")).define("viewof compilationResults", ["compilationSuite"], _compilationResults);
  main.variable(observer("compilationResults")).define("compilationResults", ["Generators", "viewof compilationResults"], (G, _) => G.input(_));
  main.variable(observer("compilation_test_results")).define("compilation_test_results", ["compilationResults","report","compilationSuite"], _compilation_test_results);
  main.variable(observer()).define(["highlight","compilation_test_results"], _58);
  main.variable(observer()).define(["test_cases","compilationSuite","expect","normalizeVariables","compile"], _59);
  main.variable(observer("viewof compilerSourceSelector")).define("viewof compilerSourceSelector", ["Inputs","notebook_semantics_source"], _compilerSourceSelector);
  main.variable(observer("compilerSourceSelector")).define("compilerSourceSelector", ["Generators", "viewof compilerSourceSelector"], (G, _) => G.input(_));
  main.variable(observer("test_case")).define("test_case", ["test_cases","compilerSourceSelector"], _test_case);
  main.variable(observer("compiled")).define("compiled", ["compile","test_case"], _compiled);
  main.variable(observer()).define(["parser","test_case"], _63);
  main.variable(observer("viewof compiled_selector")).define("viewof compiled_selector", ["Inputs","compiled"], _compiled_selector);
  main.variable(observer("compiled_selector")).define("compiled_selector", ["Generators", "viewof compiled_selector"], (G, _) => G.input(_));
  main.variable(observer()).define(["compiled_selector","normalizeJavascriptSource"], _65);
  main.variable(observer()).define(["compile","test_case"], _66);
  main.variable(observer("normalizeVariables")).define("normalizeVariables", ["variableToObject","normalizeJavascriptSource"], _normalizeVariables);
  main.variable(observer()).define(["normalizeVariables","test_case"], _68);
  main.variable(observer("singleCompileTest")).define("singleCompileTest", ["expect","normalizeVariables","compile","test_case"], _singleCompileTest);
  main.variable(observer()).define(["highlight","singleCompileTest"], _70);
  main.variable(observer("compile")).define("compile", ["parser","observableToJs"], _compile);
  main.variable(observer("viewof ast")).define("viewof ast", ["Inputs"], _ast);
  main.variable(observer("ast")).define("ast", ["Generators", "viewof ast"], (G, _) => G.input(_));
  main.variable(observer("observableToJs")).define("observableToJs", ["viewof ast","acorn_walk","parser","escodegen"], _observableToJs);
  main.variable(observer("acorn_walk")).define("acorn_walk", _acorn_walk);
  main.variable(observer()).define(["viewof prompt"], _75);
  main.variable(observer()).define(["Inputs","suggestion"], _76);
  main.variable(observer()).define(["viewof suggestion"], _77);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer()).define(["viewof context_viz"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _81);
  main.variable(observer()).define(["viewof api_endpoint"], _82);
  main.variable(observer()).define(["viewof settings"], _83);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer()).define(["md"], _85);
  const child2 = runtime.module(define2);
  main.import("ask", child2);
  main.import("excludes", child2);
  main.import("cells", child2);
  main.import("update_context", child2);
  main.import("on_prompt", child2);
  main.import("variables", child2);
  main.import("api_call_response", child2);
  main.import("background_tasks", child2);
  main.import("ndd", child2);
  main.import("instruction", child2);
  main.import("_events", child2);
  main.import("highlight", child2);
  main.import("acorn", child2);
  main.import("viewof reset", child2);
  main.import("reset", child2);
  main.import("mutable context", child2);
  main.import("context", child2);
  main.import("viewof prompt", child2);
  main.import("prompt", child2);
  main.import("viewof suggestion", child2);
  main.import("suggestion", child2);
  main.import("viewof settings", child2);
  main.import("settings", child2);
  main.import("viewof OPENAI_API_KEY", child2);
  main.import("OPENAI_API_KEY", child2);
  main.import("viewof api_endpoint", child2);
  main.import("api_endpoint", child2);
  main.import("viewof context_viz", child2);
  main.import("context_viz", child2);
  main.variable(observer()).define(["ask"], _87);
  main.variable(observer()).define(["api_call_response"], _88);
  main.variable(observer()).define(["background_tasks"], _89);
  const child3 = runtime.module(define3);
  main.import("createSuite", child3);
  main.import("report", child3);
  main.import("expect", child3);
  return main;
}
