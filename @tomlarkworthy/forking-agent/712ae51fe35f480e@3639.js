import define1 from "./10c7899865f8a76e@8998.js";
import define2 from "./cdc303fcc82a630f@262.js";
import define3 from "./db42ae70222a8b08@1170.js";
import define4 from "./e3a019069a130d79@6817.js";
import define5 from "./a89ea9f0ad8c6226@1486.js";
import define6 from "./a2a7845a5e2a5aec@139.js";
import define7 from "./b69d20b9e3533ef8@158.js";
import define8 from "./048a17a165be198d@273.js";
import define9 from "./26b0ee4d8f136fca@377.js";
import define10 from "./98f34e974bb2e4bc@958.js";
import define11 from "./f096db8fcbc444bf@565.js";
import define12 from "./db80e603859226c1@23.js";
import define13 from "./f109935193c0deba@4551.js";
import define14 from "./cc0400a7ad6d96d0@3027.js";
import define15 from "./99941e772e8d9b72@445.js";
import define16 from "./09fdee029150048c@446.js";
import define17 from "./0b75dbddd18995dc@1765.js";

function _ui(endpoint,keepalive,myModule,htl,reversibleAttach,ui_attached,style,$0,$1,$2,$3,$4,$5,$6,$7,$8)
{
  endpoint;
  keepalive(myModule, "initial_response");
  const ui = htl.html`<div>
  <h1>Forking Agent</h1>
  ${reversibleAttach(ui_attached, style)}
  ${reversibleAttach(ui_attached, $0)}
  ${
    $0.value !=
    "https://openai-proxy.endpointservices.workers.dev/v1/responses"
      ? reversibleAttach(ui_attached, $1)
      : undefined
  }
  ${reversibleAttach(ui_attached, $2)}
  ${reversibleAttach(ui_attached, $3)}
  ${reversibleAttach(ui_attached, $4)}
  ${reversibleAttach(ui_attached, $5)}
  ${reversibleAttach(ui_attached, $6)}
  <div style="max-height: 1024px; overflow: auto">
    ${reversibleAttach(ui_attached, $7)}
  </div>
  ${reversibleAttach(ui_attached, $8)}
</div>`;

  setTimeout(() => {
    $7.parentNode.scrollTop =
      $7.parentNode.scrollHeight;
  }, 0);
  return ui;
}


function _2(exporter){return(
exporter()
)}

function _3(md){return(
md`## TODO
`
)}

function _about(md){return(
md`## About

Fork the application, the development environment and the LLM conversation so that you can explore the development space without regret.`
)}

function _5(history){return(
history
)}

function _6(md){return(
md`\`\`\`js
import { ui, expect} from "@tomlarkworthy/agentic-planner"
\`\`\``
)}

function _7(md){return(
md`## Test Driven Development

The agent is aware of the state of tests`
)}

function _8(md){return(
md`## Failing Tests`
)}

function _failing_tests(tests){return(
tests({
  filter: (test) => test.computed && test.state == "rejected"
})
)}

function _tests_module($0,myModule){return(
$0.value.get(myModule)
)}

function _11(md){return(
md`## Agent Architecture`
)}

function _12(md){return(
md`Inspired by [Cline](https://github.com/cline/cline)`
)}

function _design(mermaid,md){return(
md`The design is extremely simple. The bot is [forced to pick a tool each iteration](https://community.openai.com/t/new-api-feature-forcing-function-calling-via-tool-choice-required/731488). We have two lifecycle tools, \`attempt_completion\` or \`ask_followup_question\`, and several task tools. The bot then just keeps calling the tools, and the tools execute and repost to the API and the bot calls a new tool. The lifecycle tools are special cases that hold up the control flow for human interaction.

${mermaid`flowchart TD
    Start([Prompt])
    End([End])
    Start --> Pick[LLM call]
    Pick -- "function_call" --> Type{Tool type?}

    Type -- "Lifecycle tool" --> Human
    
    Human --> End
    Human --> Respond

    Type -- "Task tool" --> Respond

    Respond -- "function_output" --> Pick


    
`}`
)}

function _15(md){return(
md`## Interface`
)}

function _ui_attached(Inputs){return(
Inputs.toggle({
  label: "ui_attached",
  value: true
})
)}

function _style(htl){return(
htl.html`<style>
  .plan div {
    font-size: 1em;
    padding: 0.25rem;
    border: black solid 1px;
  }
</style>`
)}

function _endpoint(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    new Map([
      [
        "demo",
        "https://openai-proxy.endpointservices.workers.dev/v1/responses"
      ],
      ["OpenAI", "https://api.openai.com/v1/responses"]
    ]),
    {
      label: "OpenAI API URL"
    }
  ),
  localStorageView("OPENAI_API_URL", {
    defaultValue:
      "https://openai-proxy.endpointservices.workers.dev/v1/responses"
  })
)
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "OPENAI_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _model(Inputs,reasoning_models){return(
Inputs.select(reasoning_models, { label: "model" })
)}

function _active_tools(Inputs,tools){return(
Inputs.select(new Map(tools.map((t) => [t.name, t])), {
  multiple: true,
  value: tools,
  label: "active tools"
})
)}

function _23($0){return(
$0
)}

function _workingModule(Inputs,currentModules,myModule){return(
Inputs.select(
  [...currentModules.values()].map((m) => m.name),
  {
    label: "working module",
    value: currentModules.get(myModule).name
  }
)
)}

function _yolo(Inputs){return(
Inputs.toggle({ label: "YOLO", value: true })
)}

function _clear(Inputs,$0,Event){return(
Inputs.button("clear", {
  reduce: () => {
    $0.value = [];
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _history_ui(plan,calls){return(
plan(calls)
)}

function _undo_last(Inputs,$0,Event){return(
Inputs.button("undo last", {
  reduce: () => {
    $0.value = $0.value.slice(0, -2);
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _29(md){return(
md`## Forking`
)}

function _forkCall(setFileAttachment,jsonFileAttachment,myModule,exportToHTML,lopepageModule,notesModule,location){return(
async (args) => {
  // Store arguments
  await setFileAttachment(jsonFileAttachment("call.json", args), myModule);
  // Export runtime
  const source = (
    await exportToHTML({
      mains: new Map([
        ["@tomlarkworthy/forking-agent", myModule],
        ["@tomlarkworthy/lopepage", lopepageModule],
        ["@tomlarkworthy/notes", notesModule]
      ]), // (name -> module) Map of main modules
      options: {
        title: "@tomlarkworthy/forking-agent",
        hash: "#view=R100(S70(@tomlarkworthy/forking-agent),C30(S50(@tomlarkworthy/module-selection),S50(@tomlarkworthy/notes)))",
        headless: true
      }
    })
  ).source;
  // Open in tab
  const url = URL.createObjectURL(new Blob([source], { type: "text/html" }));
  window.open(url + location.hash, "_blank");
}
)}

async function _continuation(FileAttachment,call,$0)
{
  if (this) return; // only once
  try {
    const continuation = await FileAttachment("call.json").json();
    if (continuation) {
      call($0, continuation);
    }
    return continuation;
  } catch (_) {}
}


function _call(responses,$0,$1,$2,instructions,Event){return(
async (calls_view, args) => {
  const call = await responses({
    url: $0.value,
    model: $1.value,
    tools: $2.value,
    parallel_tool_calls: false,
    reasoning: {
      effort: "medium",
      summary: "auto"
    },
    tool_choice: "required",
    ...args,
    ...(args.prependInstructions && {
      // Append instructions for first message
      input: [
        {
          role: "developer",
          content: await instructions()
        },
        {
          role: "user",
          content: args.input
        }
      ]
    })
  });
  calls_view.value.push(call);
  calls_view.dispatchEvent(new Event("input"));
  return call;
}
)}

function _33(md){return(
md`## Tools`
)}

function _tools(attempt_completionTool,ask_followup_questionTool,list_modulesTool,describe_moduleTool,describe_cellsTool,upsert_cellsTool,peek_variableTool,search_cellsTool,read_file_attachmentTool){return(
[
  //evalJavaScriptTool,
  attempt_completionTool,
  ask_followup_questionTool,
  list_modulesTool,
  describe_moduleTool,
  describe_cellsTool,
  upsert_cellsTool,
  peek_variableTool,
  search_cellsTool,
  read_file_attachmentTool
]
)}

function _fork_button(Inputs){return(
Inputs.button("fork")
)}

function _36(md){return(
md`#### initial_prompt

`
)}

function _initial_prompt_ui(Inputs){return(
Inputs.textarea({
  placeholder: "initial prompt"
})
)}

function _initialPromptDialog($0,forkCall,$1,$2,invalidation,htl){return(
(calls_view, initial = "") => {
  $0.value = initial.input;
  const listener = async (event) => {
    forkCall({
      model: $1.value,
      input: $0.value,
      prependInstructions: true
    });
  };
  $2.addEventListener("input", listener);
  invalidation.then(() =>
    $2.removeEventListener("input", listener)
  );
  return htl.html`
  ${$0} ${$2}
`;
}
)}

function _39(md){return(
md`#### attempt_completion

`
)}

function _attempt_completionTool($0){return(
{
  type: "function",
  name: "attempt_completion",
  strict: true,
  description: "Use this tool to present the final conclusion to the user.",
  parameters: {
    type: "object",
    properties: {
      result: {
        type: "string",
        description: "The result of the task."
      }
    },
    required: ["result"],
    additionalProperties: false
  },
  execute: async ({ result } = {}) => $0.value
}
)}

function _completionFeedback(Inputs){return(
Inputs.textarea({
  placeholder: "add feedback to continue",
  submit: "feedback"
})
)}

function _attempCompletetionDialog($0,runTools,Event,htl,md){return(
(calls_view, latest, tool) => {
  $0.value = "";
  const listener = async (event) => {
    $0.removeEventListener("input", listener);
    const response = await runTools(latest);
    calls_view.value.push(response);
    calls_view.dispatchEvent(new Event("input"));
  };
  $0.addEventListener("input", listener);
  return htl.html`
  ${md`${tool.arguments.result}`}
  ${$0}
`;
}
)}

function _43(md){return(
md`#### ask_followup_question `
)}

function _ask_followup_questionTool($0){return(
{
  type: "function",
  name: "ask_followup_question",
  strict: true,
  description:
    " Ask the user a question to gather additional information needed to complete the task. This tool should be used when you encounter ambiguities, need clarification, or require more details to proceed effectively. It allows for interactive problem-solving by enabling direct communication with the user. Use this tool judiciously to maintain a balance between gathering necessary information and avoiding excessive back-and-forth.",
  parameters: {
    type: "object",
    properties: {
      question: {
        type: "string",
        description:
          "The question to ask the user. This should be a clear, specific question that addresses the information you need."
      }
    },
    required: ["question"],
    additionalProperties: false
  },
  execute: async ({ result } = {}) => $0.value
}
)}

function _followUpResponse(Inputs){return(
Inputs.textarea({
  placeholder: "enter your response",
  submit: "respond"
})
)}

function _followUpQuestionDialog($0,runTools,Event,htl,md){return(
(calls_view, latest, tool) => {
  $0.value = "";
  const listener = async (event) => {
    $0.removeEventListener("input", listener);
    const response = await runTools(latest);
    calls_view.value.push(response);
    calls_view.dispatchEvent(new Event("input"));
  };
  $0.addEventListener("input", listener);
  return htl.html`
  ${md`${tool.arguments.question}`}
  ${$0}
`;
}
)}

function _47(md){return(
md`#### evalJavaScriptTool`
)}

function _48(evalJavaScriptTool){return(
evalJavaScriptTool
)}

function _49(md){return(
md`#### list_modules `
)}

function _list_modulesTool(runtimeSummary){return(
{
  type: "function",
  name: "list_modules",
  strict: true,
  description:
    "Use this to discover all loaded modules in the runtime. Modules are notebooks and contains cells and file attachments",
  parameters: {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false
  },
  execute: async ({ result } = {}) => runtimeSummary()
}
)}

function _runtimeSummary(getModules){return(
async () => {
  const moduleMap = await getModules();
  const modules = [...moduleMap.values()].sort();
  return `<runtime>\n${modules
    .map(
      (module) => `  <module name="${module.name}">
   <imports>${
     module.dependsOn && module.dependsOn.map((d) => `${d}`).join(", ")
   }</imports>\n  </module>`
    )
    .join("\n")}
</runtime>`;
}
)}

async function _test_list_modulesTool(list_modulesTool)
{
  return `${await list_modulesTool.execute()}`;
}


function _54(md){return(
md`#### describe_module`
)}

function _describe_moduleTool(getModule,cellMapCompat,getFileAttachments,moduleSummary){return(
{
  type: "function",
  name: "describe_module",
  strict: true,
  description:
    "Use this list the fileAttachments and cells in a module. Cells are listed in the order they appear in a notebook. Adjacent cells are often semantically related.",
  parameters: {
    type: "object",
    properties: {
      module_name: {
        type: "string"
      }
    },
    required: ["module_name"],
    additionalProperties: false
  },
  execute: async ({ module_name } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    const cells = await cellMapCompat(module.module);
    const fileAttachments = getFileAttachments(module.module);
    return await moduleSummary({
      name: module_name,
      cells,
      fileAttachments
    });
  }
}
)}

function _moduleSummary(fileAttachmentSummary,summarizeCell){return(
async ({ name, cells, fileAttachments }) => {
  return `<module name="${name}">
<fileAttachments>${[...fileAttachments.entries()]
    .map(([name, attachment]) => fileAttachmentSummary(name, attachment))
    .join(",")}</fileAttachments>
<cells>
${(
  await Promise.all(
    [...cells.entries()].map(([name, variables]) =>
      summarizeCell({ name, variables })
    )
  )
).join("\n")}
</cells>
</module>`;

  return cells;
}
)}

function _test_describe_moduleTool(describe_moduleTool){return(
describe_moduleTool.execute({
  module_name: "main"
})
)}

function _fileAttachmentSummary(){return(
(name, attachment) => name
)}

function _59(md){return(
md`### read_file_attachmentTool`
)}

function _read_file_attachmentTool(getModule,getFileAttachments,summarizeJS){return(
{
  type: "function",
  name: "read_file_attachment",
  strict: true,
  description:
    'Read all file attachments in a module using the given FileAttachment API (e.g., "json" or "text") and summarize each result with summarizeJS.',
  parameters: {
    type: "object",
    properties: {
      module_name: { type: "string" },
      filename: { type: "string" },
      method: {
        type: "string",
        enum: [
          "csv",
          "arrayBuffer",
          "json",
          "xml",
          "blob",
          "image",
          "csv",
          "html",
          "stream",
          "text",
          "url",
          "zip"
        ]
      },
      max_size: { type: "integer" }
    },
    required: ["module_name", "filename", "method", "max_size"],
    additionalProperties: false
  },
  execute: async ({ module_name, filename, method, max_size = 100 } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    const attachments = getFileAttachments(module.module);
    if (!attachments || attachments.size === 0)
      return `No file attachments in module ${module_name}`;
    const attachment = attachments.get(filename);
    if (!attachment)
      return `Error: Cannot find ${filename} in "${module_name}"`;

    const fn = attachment[method];
    if (typeof fn !== "function") {
      return `Error: method '${method}' not available`;
    }
    try {
      const value = await fn.call(attachment);
      return summarizeJS(value, { max_size });
    } catch (err) {
      return `Error: ${err?.message || err}`;
    }
  }
}
)}

function _test_read_file_attachmentTool(read_file_attachmentTool)
{
  return read_file_attachmentTool.execute({
    module_name: "@tomlarkworthy/jest-expect-standalone",
    filename: "jest-expect-standalone-24.0.2.js.gz",
    method: "text"
  });
}


function _62(md){return(
md`### search_cells`
)}

function _search_cellsTool(getModule,moduleMap,runtime,cellMapCompat,decompile,cellDescription){return(
{
  type: "function",
  name: "search_cells",
  strict: true,
  description:
    "Search for cells in the runtime module whose source code matches a regular expression. Returns up to 20 matching cells",
  parameters: {
    type: "object",
    properties: {
      module_name: { type: ["string", "null"] },
      pattern: { type: "string" },
      flags: { type: "string" }
    },
    required: ["module_name", "pattern", "flags"],
    additionalProperties: false
  },
  execute: async ({ module_name, pattern, flags = "" } = {}) => {
    const modules = module_name
      ? [await getModule(module_name)]
      : [...(await moduleMap(runtime)).values()];

    if (!module_name && !modules[0])
      return "Error: module " + module_name + " not found";

    const results = [];
    let regex;
    try {
      regex = new RegExp(pattern, flags);
    } catch (err) {
      return "Error: invalid regular expression: " + err.message;
    }

    for (let module of modules) {
      if (results.length >= 20) break;
      const cells = await cellMapCompat(module.module);

      for (const [cell_name, variables] of cells.entries()) {
        if (results.length >= 20) break;
        const source = await decompile(variables);
        if (regex.test(source)) {
          results.push({
            module,
            cell_name,
            variables,
            source
          });
        }
      }
    }
    if (results.length === 0)
      return (
        "No cells matching /" +
        pattern +
        "/" +
        flags +
        " in module " +
        module_name
      );
    return (
      "Cells matching /" +
      pattern +
      "/" +
      flags +
      " in module " +
      module_name +
      " (up to 20):\n" +
      (
        await Promise.all(
          results.map((n) =>
            cellDescription(n.module.name, n.cell_name, n.variables, n.source)
          )
        )
      ).join("\n")
    );
  }
}
)}

function _searchPattern(Inputs){return(
Inputs.text({
  label: "search pattern",
  value: "^test_"
})
)}

function _test_search_for_cell_digit_name(search_cellsTool,searchPattern)
{
  const result = search_cellsTool.execute({
    module_name: null,
    pattern: searchPattern,
    flags: ""
  });
  return result;
}


function _summarizeCell(cellSummary){return(
({ name, variables } = {}) => cellSummary(variables)
)}

function _69(md){return(
md`#### describe_cells`
)}

function _cellDescription(summarizeCell){return(
async (module_name, cell_name, variables, source) => {
  return await summarizeCell({
    name: cell_name,
    variables
  });
}
)}

function _describe_cellsTool(getModule,cellMapCompat,decompile,cellDescription){return(
{
  type: "function",
  name: "describe_cells",
  strict: true,
  description:
    "Describes cells, their inputs cells and their output cells, and their definition in a <code>...</code> block.",
  parameters: {
    type: "object",
    properties: {
      module_name: {
        type: "string"
      },
      cell_names: {
        type: ["array"],
        items: {
          type: ["string", "number"]
        }
      }
    },
    required: ["module_name", "cell_names"],
    additionalProperties: false
  },
  execute: async ({ module_name, cell_names } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    const cells = await cellMapCompat(module.module);

    return `### module ${module_name}
${(
  await Promise.all(
    cell_names.map(async (cell_name) => {
      if (!cells.has(cell_name))
        return `Error: cell ${cell_name} not found in module ${module_name}`;
      const variables = cells.get(cell_name);
      const source = await decompile(variables);
      return await cellDescription(module_name, cell_name, variables, source);
    })
  )
).join("\n")}

`;
  }
}
)}

function _test_describe_cellsTool(describe_cellsTool){return(
describe_cellsTool.execute({
  module_name: "@tomlarkworthy/module-map",
  cell_names: [0, "moduleMap"]
})
)}

function _73(md){return(
md`### upsert_cells`
)}

function _upsertCell(compile,main,ojs_observer){return(
function upsertCell({ module, code } = {}) {
  const defs = compile(code);
  // check for collisions
  const variables = defs.map((def) => {
    let _fn;
    eval("_fn = " + def._definition);
    if (
      def._name &&
      module._scope.has(def._name) &&
      /* scoped variables can exist for errors but not actually be real in the runtime*/ main._runtime._variables.has(
        module._scope.get(def._name)
      )
    ) {
      return module._scope.get(def._name).define(def._name, def._inputs, _fn);
    } else {
      return module
        .variable(ojs_observer ? ojs_observer(def._name) : () => ({}))
        .define(def._name, def._inputs, _fn);
    }
  });
  return variables;
}
)}

function _upsert_cellsTool(cellsRegex,getModule,$0,process,upsertCell,summarizeVariable){return(
{
  type: "custom",
  name: "upsert_cells",
  description: "Add or replace cells in the runtime.",
  format: {
    type: "grammar",
    syntax: "regex",
    definition: cellsRegex
  },
  execute: async (content) => {
    const module = await getModule($0.value);
    if (!module) return `Error: module ${$0.value} not found`;
    let variables;
    try {
      const cells = process(content);
      const responses = await Promise.all(
        cells.map(async (cell) => {
          try {
            variables = upsertCell({
              module: module.module,
              code: cell.code
            });
          } catch (err) {
            return `Error: ${err?.message || err}`;
          }
          return await summarizeVariable(variables[0]._name, variables[0], {
            max_size: 100
          });
        })
      );
      return responses.join("\n");
    } catch (err) {
      return `Error: ${err?.message || err}`;
    }
  }
}
)}

function _76(upsert_cellsTool){return(
upsert_cellsTool.execute(`<cell>
<inputs>md</inputs>
<code><![CDATA[
joke = md\`how are you?\`
]]></code>
</cell>`)
)}

function _cellsRegex()
{
  const CELL_OPEN = String.raw`<cell>\s*`;

  const INPUTS_BLOCK = String.raw`<inputs>.*<\/inputs>\s*`;

  const CODE_BLOCK = String.raw`<code><!\[CDATA\[[\s\S]*\]\]>\s*<\/code>\s*`;

  const CELL_CLOSE = String.raw`<\/cell>`;

  return "^(" + CELL_OPEN + INPUTS_BLOCK + CODE_BLOCK + CELL_CLOSE + ")*$";
}


function _78(cellsRegex){return(
cellsRegex.toString()
)}

function _79(md){return(
md`### replace_cell`
)}

function _replace_cellTool(getModule,cellMapCompat,replaceCell){return(
{
  type: "function",
  name: "replace_cell",
  strict: true,
  description: "Replace a cell with a new definition.",
  parameters: {
    type: "object",
    properties: {
      module_name: {
        type: "string"
      },
      cell_name: {
        type: "string"
      },
      source: {
        type: "string"
      }
    },
    required: ["module_name", "cell_name", "source"],
    additionalProperties: false
  },
  execute: async ({ module_name, cell_name, source } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    const cells = await cellMapCompat(module.module);
    if (!cells.has(cell_name))
      return `Error: cell '${cell_name}' in module '${module_name}' not found.`;
    const variables = cells.get(cell_name);
    try {
      const cell = replaceCell({
        module: module.module,
        variables,
        source
      });
    } catch (err) {
      return `Error: ${err.message}`;
    }
    return `ok`;
  }
}
)}

function _replaceCell(compile,runtime,repositionSetElement){return(
function replaceCell({ module, source, variables } = {}) {
  const defs = compile(source);
  
  let resposition = false, insertionIndex = -1;
  if (defs.length !== variables.length) {
    resposition = true;
    insertionIndex =
        [...runtime._variables].findIndex(
          (v) => v == variables.at(-1)
        );
    variables.forEach((v) => v.delete());
    for (let i = 0; i < defs.length; i++) {
      variables.push(module.variable({}));
    }
  }

  defs.forEach((v, i) => {
    const variable = variables[i];
    let _fn;
    eval("_fn = " + v._definition);
    variable.define(v._name, v._inputs, _fn);
    if (resposition)
      repositionSetElement(runtime._variables, variable, insertionIndex + i);
  });
  return variables;
}
)}

function _sample_variable(){return(
43
)}

function _test_replace_cellTool(replace_cellTool){return(
replace_cellTool.execute({
  module_name: "main",
  cell_name: "sample_variable",
  source: "sample_variable = 52"
})
)}

function _84(md){return(
md`### peek_variable`
)}

function _85(md){return(
md`TODO:
- Allow applying a function to the output with Javascript (e.g. CSS selector)`
)}

function _summarizeVariable(observe,summarizeJS){return(
async function summarizeVariable(
  variable_name,
  variable,
  { max_size = 0 } = {}
) {
  let cancel;
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`variable '${variable_name}' is pending`);
    }, 2000);
    cancel = observe(variable, {
      fulfilled: (value) => resolve(summarizeJS(value, { max_size })),
      rejected: (error) =>
        resolve(
          `variable '${variable_name}' in an an error state: ${summarizeJS(
            error,
            { max_size }
          )}`
        )
    });
  });
  return result;
}
)}

function _peek_variableTool(getModule,cellMapCompat,summarizeVariable){return(
{
  type: "function",
  name: "peek_variable",
  strict: true,
  description:
    "Query the value of a variable, often the name of the cell owning it, but views and mutable cells contain two variables",
  parameters: {
    type: "object",
    properties: {
      module_name: {
        type: "string"
      },
      variable_name: {
        type: "string"
      },
      max_size: {
        type: "integer"
      }
    },
    required: ["module_name", "variable_name", "max_size"],
    additionalProperties: false
  },
  execute: async ({ module_name, variable_name, max_size } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    const cells = await cellMapCompat(module.module);
    const options = [
      variable_name,
      `viewof ${variable_name}`,
      `mutable ${variable_name}`
    ];
    const cell_title = options.find((option) => cells.get(option));
    if (cell_title === undefined)
      return `can't find variables under ${variable_name}`;
    const variables = cells.get(cell_title);
    let variable;
    if (variables.length == 1) variable = variables[0];
    else {
      variable = variables.find((v) => v._name == variable_name);
    }

    return await summarizeVariable(variable_name, variable, { max_size });
  }
}
)}

function _test_peek_variableTool(peek_variableTool){return(
peek_variableTool.execute({
  module_name: "main",
  variable_name: "peek_variableTool",
  max_size: 1000
})
)}

function _cool(){return(
"43"
)}

function _errored()
{
  throw Error("deliberate error for testing");
}


function _pending(){return(
new Promise(() => {})
)}

function _test_peek_variableTool_mutable(peek_variableTool){return(
peek_variableTool.execute({
  module_name: "main",
  variable_name: "cool",
  max_size: 1000
})
)}

function _test_peek_variableTool_error(peek_variableTool){return(
peek_variableTool.execute({
  module_name: "main",
  variable_name: "errored",
  max_size: 1000
})
)}

function _test_peek_variableTool_pending(peek_variableTool){return(
peek_variableTool.execute({
  module_name: "main",
  variable_name: "pending",
  max_size: 1000
})
)}

function _test_peek_variableTool_tests(peek_variableTool){return(
peek_variableTool.execute({
  module_name: "main",
  variable_name: "failing_tests",
  max_size: 1000
})
)}

function _97(md){return(
md`### Helpers`
)}

function _moduleVariables(){return(
(module) =>
  module._runtime._variables.filter((v) => v._module == module)
)}

function _myModule(thisModule){return(
thisModule()
)}

function _getModules(moduleMap){return(
async function getModules() {
  return moduleMap();
}
)}

function _getModule(getModules){return(
async function getModule(name) {
  const modules = await getModules();
  return [...modules.values()].find((m) => m.name == name);
}
)}

function _107(md){return(
md`## Static Data`
)}

function _prompts(){return(
[
  "",
  "Explain how moduleMap works",
  "add a function to compute fibonacci sequence",
  "is yolo toggled?",
  "create some synthetic data and then visualize it with Plot (inbuilt function)"
]
)}

function _reasoning_models(){return(
["gpt-5-mini", "gpt-5-nano", "gpt-5", "gpt-5.1", "gpt-5.2"]
)}

function _110(md){return(
md`## State`
)}

async function _calls(FileAttachment,$0,Inputs)
{
  try {
    const calls = await await FileAttachment("calls.json").json();
    calls.forEach((call) => (call.tools = $0.value));
    return Inputs.input(calls);
  } catch (_) {
    return Inputs.input([]);
  }
}


function _112(setFileAttachment,jsonFileAttachment,calls,myModule){return(
setFileAttachment(jsonFileAttachment("calls.json", calls), myModule)
)}

function _113(Inputs,calls){return(
Inputs.table(calls, { layout: "auto" })
)}

function _114(md){return(
md`## UI Builders`
)}

function _actions(continuation,htl,initialPromptDialog,error,$0,runTools,Event,Inputs,followUpQuestionDialog,attempCompletetionDialog){return(
(calls_view, latest) => {
  if (!latest) {
    if (continuation) {
      return htl.html`<div class="actions" style="display: flex;">
${initialPromptDialog(calls_view, continuation)} 
</div>`;
    } else {
      return htl.html`<div class="actions" style="display: flex;">
${initialPromptDialog(calls_view)} 
</div>`;
    }
  }

  if (latest.error) return error(latest.error);

  const toolCalls = latest.output.filter((o) => o.type == "function_call");
  const actions = toolCalls.map((f) => f.name);

  if (
    !actions.includes("ask_followup_question") &&
    !actions.includes("attempt_completion") &&
    $0.value
  ) {
    runTools(latest).then((response) => {
      calls_view.value.push(response);
      calls_view.dispatchEvent(new Event("input"));
    });
    return undefined;
  }
  return htl.html`<div class="actions" style="display: flex;">
${
  !actions.includes("ask_followup_question") &&
  !actions.includes("attempt_completion")
    ? Inputs.button("execute", {
        reduce: async () => {
          const response = await runTools(latest);
          calls_view.value.push(response);
          calls_view.dispatchEvent(new Event("input"));
        }
      })
    : undefined
}
${
  actions.includes("ask_followup_question")
    ? followUpQuestionDialog(
        calls_view,
        latest,
        toolCalls.find((call) => call.name == "ask_followup_question")
      )
    : undefined
}
${
  actions.includes("attempt_completion")
    ? attempCompletetionDialog(
        calls_view,
        latest,
        toolCalls.find((call) => call.name == "attempt_completion")
      )
    : undefined
}
</div>`;
}
)}

function _error(htl){return(
(error) => {
  return htl.html`<div class="error">
<h4>error</h4>
<pre>
${JSON.stringify(error, null, 2)}
</pre>
</div>`;
}
)}

function _plan(htl,step,actions,$0){return(
(calls) => htl.html`<div class="plan">
<div class="history">
  ${calls.filter((x) => x).map(step)}
</div>
${actions($0, calls.at(-1))}
</div>`
)}

function _step(htl,input,output){return(
(response) =>
  htl.html`<div id=${response.id} class="step">
  <div>
    ${response.input.map((i) => input(response, i))}
  </div>
  <div>
    ${response.output && response.output.map((o) => output(response, o))}
  </div>
</div>`
)}

function _input(input_function_call_output,input_custom_tool_call_output,input_content){return(
(response, input) => {
  if (input.type == "function_call_output")
    return input_function_call_output(response, input);
  if (input.type == "custom_tool_call_output")
    return input_custom_tool_call_output(response, input);
  else if (input.content) return input_content(response, input);
  else console.error("unhandled input type", input.type);
}
)}

function _input_content(htl){return(
(response, input) => htl.html`<div 
    id=${input.id}
    class="input_message">
    <b>${input.role}</b>: ${input.content}
</div>`
)}

function _input_function_call_output(htl,md){return(
(response, input) => htl.html`<div 
    id=${input.id}
    class="function_call_output">
    <details><summary><h4>function_call_output</h4></summary>
    ${md`~~~xml
    ${input.output}
    ~~~`}
    </details>
</div>`
)}

function _input_custom_tool_call_output(htl,md){return(
(response, input) => htl.html`<div 
    id=${input.id}
    class="custom_tool_call_output">
    <details><summary><h4>custom_tool_call_output</h4></summary>
    ${md`~~~xml
    ${input.output}
    ~~~`}
    </details>
</div>`
)}

function _output(output_message,output_message_function_call,output_message_custom_tool_call,output_message_reasoning){return(
(response, output) => {
  if (output.type == "message") return output_message(response, output);
  else if (output.type == "function_call")
    return output_message_function_call(response, output);
  else if (output.type == "custom_tool_call")
    return output_message_custom_tool_call(response, output);
  else if (output.type == "reasoning")
    return output_message_reasoning(response, output);
  else {
    console.error("unhandled output type", output.type);
  }
}
)}

function _output_message_function_call(htl,md){return(
(response, output) => htl.html`<div 
    id=${output.id}
    class="function_call">
    <h4>function_call - ${output.name}</h4>
      <details><summary>arguments</summary>${md`~~~
${JSON.stringify(output.arguments, null, 2)}
~~~`}</details>
</div>`
)}

function _output_message_custom_tool_call(htl,md){return(
(response, output) => htl.html`<div 
    id=${output.id}
    class="custom_tool_call">
    <h4>custom_tool_call - ${output.name}</h4>
      <details><summary>arguments</summary>${md`~~~
${JSON.stringify(output.input, null, 2)}
~~~`}</details>
</div>`
)}

function _output_message_reasoning(htl,output_message_reasoning_summary){return(
(response, output) => htl.html`<div 
    id=${output.id}
    class="reasoning">
    <h4>reasoning</h4>
    ${output.summary.map((summary) =>
      output_message_reasoning_summary(response, output, summary)
    )}
</div>`
)}

function _output_message_reasoning_summary(html){return(
(response, output, summary) => {
  return html`<div class="summary_text">
    <details><summary>reasoning</summary>${summary.text}</details>
  </div>`;
}
)}

function _output_message(htl,output_message_content){return(
(response, output) => htl.html`<div 
    id=${output.id}
    class="plan_output">
    <h4>output_message</h4>
    ${output.content.map((content) =>
      output_message_content(response, output, content)
    )}
</div>`
)}

function _output_message_content(output_message_content_output_text){return(
(response, output, content) => {
  if (content.type == "output_text")
    return output_message_content_output_text(response, output, content);
  else {
    console.error("unhandled content type", content.type);
  }
}
)}

function _output_message_content_output_text(htl,md){return(
(
  response,
  output,
  content
) => htl.html`<div 
    id=${output.id}
    class="output_text">
    ${md`${content.text}`}
</div>`
)}

function _131(md){return(
md`## Prompt`
)}

async function _132(workingModule,md,instructions)
{
  workingModule;
  return md`${await instructions()}`;
}


function _instructions(keepalive,myModule,$0,tests_module,peek_variableTool)
{
  keepalive(myModule, "failing_tests");
  return async () => `ROBOCOOP AGENT INSTRUCTIONS (v3.1 • 2025-11-12)
ROLE

You are Roboco-op, a specialist coding agent embedded inside a computational notebook runtime, helping a user improve the current notebook from within. All coding from the user will target *this* Observable Notebook environment, using Observable JavaScript written into Notebook cells.

MISSION:
- You are executing in an Observable notebook runtime that is executing inside a user's browser.
- You can read code, fileAttachments and values in the runtime.
- Your language is Observable Javascript, which is run on the browser after compilation to plain Javascript.
- You will leverage your direct connection to the Notebook environment to manifest the user's request.


OBJECTIVE: 

deliver correct, working solutions with minimal back-and-forth by adding cells to the runtime and proving correctness by adding test cells.

TOOLS (quick reference)
- list_modules(): discover modules loaded.
- describe_module(module_name): enumerate cells in order.
- read_file_attachment(module_name, filename, method, max_size): read the content inside a FileAttachment
- search_cells(module_name|null, pattern, flags): find code by regex.
- describe_cells(module_name, cell_names[]): read definitions, inputs/outputs, and values.
- peek_variable(module_name, variable_name, max_size): inspect a variable’s current value/state.
- upsert_cells(xml): create or replace cells.
- ask_followup_question(question): use *only* when critical details are missing after discovery. Assume sensible defaults and generally avoid ask_followup_questions where possible.
- attempt_completion(result): final, validated outcome summary to the user (no questions at the end).

WORKFLOW (fast, reliable)
1) Discovery 
   - Understand task and current state
   - Prefer discovery over questions
      - Call list_modules to get an overview of the runtime and identify modules and fileAttachments that might be relevant to your task
      - Call describe_module on relevant modules to discover the functional cells for relevant modules
      - Call describe_cells to get the source and runtime value and reactive dependancies of cell that are relevant to you task.
   - When the user issues a clear, self‐contained implementation request, you may skip clarifications, assume sensible defaults, and immediately proceed to PLAN.
2) Plan
   - Consider how the user's request can be implemented in a Observable Notebook 1.0 environment.
   - Decompose the problem into a series of reactive cell executions, leveraging existing cells whenever possible. 
   - Plan for how unit tests can be used to check the code executes. Simple sanity checks that codepaths do not throw is helpful.
3) Execute and Iterate
   - Choose the smallest safe change. Prefer isolated, composable cells over large monoliths.
   - Create or replace cells with 'upsert_cells'
      - If the result is a Unexpected token, this is compilation mistake with the Notebook 1.0 syntax, just try again!
   - Name canonical tests with a \`test_*\` prefix so they are auto-run by the test harness.
   - Continue adding or modifying cells until the task is functionally complete.
4) Prove functional correctness through code
   - Write or update unit tests that cover the change and edge cases.
   - Validate expected values with peek_variable for key outputs.
   - Ensure asynchronous cells settle; if pending, design tests to resolve deterministically.
   - Do not claim success until tests pass and critical invariants are inspected.
5) Reflect, check that 
  - you have fullfilled your task.
  - the code is minimal
  - the code executes successfully.
  If any of those are not true, go back step 2 and replan
6) Summarize and Stop
   - Call attempt_completion with:
     - What changed (module, cell names).
     - Tests added/updated and their status.
     - Verification evidence (e.g., peeked values, absence of failing tests).
   - Do not end with a question.

STYLE AND SAFETY
- Be terse and technical. Do not start messages with “Great”, “Certainly”, “Okay”, or “Sure”.
- Never end attempt_completion with a question or a prompt for more input.
- Prefer zero or pinned external dependencies; when importing, pin versions (ESM) and keep minimal.
- Preserve notebook stability: avoid breaking dependent cells; if risky, stage changes behind new cells and migrate once verified.
- Use absolute dates when referencing time-sensitive facts.
- When ambiguity remains after discovery (e.g., multiple matching cells), then ask a single precise follow-up.

VERIFICATION CHECKLIST (execute before attempt_completion)
- \`failing_tests\` is empty or the failures are unrelated and explained.
- New/changed tests pass and cover primary behavior and edge cases.
- Key results peeked and match expectations.
- No cells are left in an error state; pending cells are intentional and documented.

PRACTICAL PATTERNS
- Add tests first when possible; otherwise, add them immediately after a change.
- For data work, prefer small synthetic fixtures in tests; for viz, add a minimal Plot/d3 example.
- For UI, prefer Inputs.form and small, focused views; keep state observable.
- When modifying critical infra cells (e.g., this instructions cell), preserve original inputs and signatures

PROGRAMMING MODEL

Response format
- Each response may contain one or more <cell> blocks. Every block must contain exactly:
  - <inputs>…</inputs>: a comma-separated list of every free variable the cell reads (standard libraries and other cells), or empty if none. Examples: <inputs></inputs>, <inputs>d3</inputs>, <inputs>expect,x</inputs>, <inputs>viewof ready</inputs>.
    - Include all referenced globals such as Inputs, htl, d3, Plot, FileAttachment, width, etc., when used.
    - Use exact names only; do not nest tags or add attributes inside <inputs>.
  - <code><![CDATA[ …Observable JS code… ]]></code>

General rules
- The Runtime is executed inside the user's browser reactively. 
- the runtime is comprised of modules, which are visualized to the user as computational notebooks
- Modules/notebooks are made of cells.
- Modules/Notebooks can import cells between each other.
- Cells are comprised of reactive variables that automatically recompute.
- Module/Notebooks can import each other's variables, so they can coordinate and reuse functionality or signals.
- Use Observable Notebook 1.0 Observable Javascript syntax.
- Keep cells small, less than 50 lines of code
- Do not log to the console or include comments; the cell’s value is the result.
- Use the exact variable names from the task. If the task requires a view, bind it with: viewof name = …
  - Use name for the view’s current value and viewof name for the element. 
  - Use viewof name.value if you want to peek a value without a reactive dependancy.
- Prefer zero-dependency, standard-library or runtime modules; import third-party packages only when necessary.

Standard libraries and inputs listing
- UI: use Inputs.* (Inputs.button with reduce, Inputs.toggle, Inputs.select, Inputs.range/Inputs.number, Inputs.form). Any cell calling Inputs.* must list Inputs.
- DOM/SVG: use Hypertext Literal via htl.html and htl.svg. Any cell using htl.* must list htl.
- Data utilities/viz: if a task mentions d3 or Plot, assume they are provided and list them in <inputs> for cells that use them.
- If you use FileAttachment, width, or other provided globals, list them in <inputs>.

Notebook imports
- Use Notebook 1.0 syntax: import {cell1} from "@name/other"
- Supports aliasing: import {cell1 as differentName} from "@name/other"

3rd party ESM imports
- Do not use require().
- Use ESM CDN imports with a pinned version:
  - Single-assignment cell example: dateFns = await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm")
- If you must provide a fallback CDN, keep a single top-level assignment via an async IIFE expression with try/catch:
  - dateFns = await (async () => { try { return await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm"); } catch { return await import("https://esm.sh/date-fns@4.1.0"); } })()
- Keep each import cell to a single top-level assignment (no extra top-level statements).

Reactivity
- Any cell that reads a variable x must list x in <inputs>.
- If a cell needs the view element, list viewof x; if it needs the view’s value, list x.
- The runtime recomputes a cell automatically if an input changes.

Testing and fixes
- If asked to fix a failing test, change the implementation to satisfy the test; do not modify the test unless explicitly requested.
- If you provide a minimal assertion helper (e.g., expect().toBe), implement only what’s needed and keep it in its own cell.

Error handling
- If a requested feature is unsupported without external deps and imports are disallowed or fail, either implement a minimal dependency-free solution or return a value that throws a clear Error describing the unsupported case.

UI patterns
- Counter button:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof count = Inputs.button("Increment", {value: 0, reduce: v => v + 1})
  ]]></code>
  </cell>
- Toggle:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof ready = Inputs.toggle({label: "Ready", value: false})
  ]]></code>
  </cell>
- Dropdown:
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof rgb = Inputs.select(["red", "green", "blue"], {value: "red"})
  ]]></code>
  </cell>
- Form (single view returning an object):
  <cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof credentials = Inputs.form({username: Inputs.text({label: "Username"}), password: Inputs.password({label: "Password"})})
  ]]></code>
  </cell>

Examples (minimal)
- Literal:
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  x = 42
  ]]></code>
  </cell>
- Using d3:
  <cell>
  <inputs>d3</inputs>
  <code><![CDATA[
  sum = d3.sum([1, 2, 3, 4, 5])
  ]]></code>
  </cell>
- Literal:
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  x = 42
  ]]></code>
  </cell>
- Notebook import:
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  {cell1, cell2} = import("@tomlarkworthy/runtime-sdk")
  ]]></code>
  </cell>
  <cell>
- 3rd party import and usage:
  <cell>
  <inputs></inputs>
  <code><![CDATA[
  dateFns = await import("https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm")
  ]]></code>
  </cell>
  <cell>
  <inputs>dateFns</inputs>
  <code><![CDATA[
  formatted = dateFns.format(new Date(2020, 0, 1), "yyyy-MM-dd")
  ]]></code>
  </cell>
- Reactive SVG:
  <cell>
  <inputs>htl,rectangleSettings</inputs>
  <code><![CDATA[
  htl.svg\`<svg width="\${rectangleSettings.width + 20}" height="\${rectangleSettings.height + 20}" viewBox="0 0 \${rectangleSettings.width + 20} \${rectangleSettings.height + 20}">
    <rect x="10" y="10" width="\${rectangleSettings.width}" height="\${rectangleSettings.height}" fill="\${rectangleSettings.fill ?? "#ccc"}" stroke="#000"/>
  </svg>\`
  ]]></code>
  </cell>


CURRENT CONTEXT
- Working module: "${$0.value}"
- Failing tests status right now (module ${
    tests_module.name
  }, variable failing_tests):
${await peek_variableTool.execute({
  module_name: tests_module.name,
  variable_name: "failing_tests",
  max_size: 2000
})}

NOTES
- Your code suggestions should be executable Observable cells; for permanent behavior, prefer named cells; for assertions, prefer \\\`test_*\\\` cells.

==== END OF INSTRUCTIONS
`;
}


function _139(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("ui")).define("ui", ["endpoint","keepalive","myModule","htl","reversibleAttach","ui_attached","style","viewof endpoint","viewof OPENAI_API_KEY","viewof model","viewof active_tools","viewof workingModule","viewof yolo","viewof clear","viewof history_ui","viewof undo_last"], _ui);
  main.variable(observer()).define(["exporter"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("about")).define("about", ["md"], _about);
  main.variable(observer()).define(["history"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof failing_tests")).define("viewof failing_tests", ["tests"], _failing_tests);
  main.variable(observer("failing_tests")).define("failing_tests", ["Generators", "viewof failing_tests"], (G, _) => G.input(_));
  main.variable(observer("tests_module")).define("tests_module", ["viewof currentModules","myModule"], _tests_module);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("design")).define("design", ["mermaid","md"], _design);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.import("exportToHTML", child1);
  main.variable(observer()).define(["md"], _15);
  const child2 = runtime.module(define2);
  main.import("reversibleAttach", child2);
  main.variable(observer("viewof ui_attached")).define("viewof ui_attached", ["Inputs"], _ui_attached);
  main.variable(observer("ui_attached")).define("ui_attached", ["Generators", "viewof ui_attached"], (G, _) => G.input(_));
  main.variable(observer("style")).define("style", ["htl"], _style);
  main.variable(observer("viewof endpoint")).define("viewof endpoint", ["Inputs","localStorageView"], _endpoint);
  main.variable(observer("endpoint")).define("endpoint", ["Generators", "viewof endpoint"], (G, _) => G.input(_));
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs","reasoning_models"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof active_tools")).define("viewof active_tools", ["Inputs","tools"], _active_tools);
  main.variable(observer("active_tools")).define("active_tools", ["Generators", "viewof active_tools"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof currentModules"], _23);
  main.variable(observer("viewof workingModule")).define("viewof workingModule", ["Inputs","currentModules","myModule"], _workingModule);
  main.variable(observer("workingModule")).define("workingModule", ["Generators", "viewof workingModule"], (G, _) => G.input(_));
  main.variable(observer("viewof yolo")).define("viewof yolo", ["Inputs"], _yolo);
  main.variable(observer("yolo")).define("yolo", ["Generators", "viewof yolo"], (G, _) => G.input(_));
  main.variable(observer("viewof clear")).define("viewof clear", ["Inputs","viewof calls","Event"], _clear);
  main.variable(observer("clear")).define("clear", ["Generators", "viewof clear"], (G, _) => G.input(_));
  main.variable(observer("viewof history_ui")).define("viewof history_ui", ["plan","calls"], _history_ui);
  main.variable(observer("history_ui")).define("history_ui", ["Generators", "viewof history_ui"], (G, _) => G.input(_));
  main.variable(observer("viewof undo_last")).define("viewof undo_last", ["Inputs","viewof calls","Event"], _undo_last);
  main.variable(observer("undo_last")).define("undo_last", ["Generators", "viewof undo_last"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("forkCall")).define("forkCall", ["setFileAttachment","jsonFileAttachment","myModule","exportToHTML","lopepageModule","notesModule","location"], _forkCall);
  main.variable(observer("continuation")).define("continuation", ["FileAttachment","call","viewof calls"], _continuation);
  main.variable(observer("call")).define("call", ["responses","viewof endpoint","viewof model","viewof active_tools","instructions","Event"], _call);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("tools")).define("tools", ["attempt_completionTool","ask_followup_questionTool","list_modulesTool","describe_moduleTool","describe_cellsTool","upsert_cellsTool","peek_variableTool","search_cellsTool","read_file_attachmentTool"], _tools);
  main.variable(observer("viewof fork_button")).define("viewof fork_button", ["Inputs"], _fork_button);
  main.variable(observer("fork_button")).define("fork_button", ["Generators", "viewof fork_button"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("viewof initial_prompt_ui")).define("viewof initial_prompt_ui", ["Inputs"], _initial_prompt_ui);
  main.variable(observer("initial_prompt_ui")).define("initial_prompt_ui", ["Generators", "viewof initial_prompt_ui"], (G, _) => G.input(_));
  main.variable(observer("initialPromptDialog")).define("initialPromptDialog", ["viewof initial_prompt_ui","forkCall","viewof model","viewof fork_button","invalidation","htl"], _initialPromptDialog);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("attempt_completionTool")).define("attempt_completionTool", ["viewof completionFeedback"], _attempt_completionTool);
  main.variable(observer("viewof completionFeedback")).define("viewof completionFeedback", ["Inputs"], _completionFeedback);
  main.variable(observer("completionFeedback")).define("completionFeedback", ["Generators", "viewof completionFeedback"], (G, _) => G.input(_));
  main.variable(observer("attempCompletetionDialog")).define("attempCompletetionDialog", ["viewof completionFeedback","runTools","Event","htl","md"], _attempCompletetionDialog);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("ask_followup_questionTool")).define("ask_followup_questionTool", ["viewof followUpResponse"], _ask_followup_questionTool);
  main.variable(observer("viewof followUpResponse")).define("viewof followUpResponse", ["Inputs"], _followUpResponse);
  main.variable(observer("followUpResponse")).define("followUpResponse", ["Generators", "viewof followUpResponse"], (G, _) => G.input(_));
  main.variable(observer("followUpQuestionDialog")).define("followUpQuestionDialog", ["viewof followUpResponse","runTools","Event","htl","md"], _followUpQuestionDialog);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["evalJavaScriptTool"], _48);
  main.variable(observer()).define(["md"], _49);
  const child3 = runtime.module(define3);
  main.import("moduleMap", child3);
  main.import("viewof currentModules", child3);
  main.import("currentModules", child3);
  main.variable(observer("list_modulesTool")).define("list_modulesTool", ["runtimeSummary"], _list_modulesTool);
  main.variable(observer("runtimeSummary")).define("runtimeSummary", ["getModules"], _runtimeSummary);
  main.variable(observer("test_list_modulesTool")).define("test_list_modulesTool", ["list_modulesTool"], _test_list_modulesTool);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("describe_moduleTool")).define("describe_moduleTool", ["getModule","cellMapCompat","getFileAttachments","moduleSummary"], _describe_moduleTool);
  main.variable(observer("moduleSummary")).define("moduleSummary", ["fileAttachmentSummary","summarizeCell"], _moduleSummary);
  main.variable(observer("test_describe_moduleTool")).define("test_describe_moduleTool", ["describe_moduleTool"], _test_describe_moduleTool);
  main.variable(observer("fileAttachmentSummary")).define("fileAttachmentSummary", _fileAttachmentSummary);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("read_file_attachmentTool")).define("read_file_attachmentTool", ["getModule","getFileAttachments","summarizeJS"], _read_file_attachmentTool);
  main.variable(observer("test_read_file_attachmentTool")).define("test_read_file_attachmentTool", ["read_file_attachmentTool"], _test_read_file_attachmentTool);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("search_cellsTool")).define("search_cellsTool", ["getModule","moduleMap","runtime","cellMapCompat","decompile","cellDescription"], _search_cellsTool);
  main.variable(observer("viewof searchPattern")).define("viewof searchPattern", ["Inputs"], _searchPattern);
  main.variable(observer("searchPattern")).define("searchPattern", ["Generators", "viewof searchPattern"], (G, _) => G.input(_));
  main.variable(observer("test_search_for_cell_digit_name")).define("test_search_for_cell_digit_name", ["search_cellsTool","searchPattern"], _test_search_for_cell_digit_name);
  const child4 = runtime.module(define4);
  main.import("decompile", child4);
  main.import("compile", child4);
  main.import("cellMap", child4);
  const child5 = runtime.module(define5);
  main.import("cellMapCompat", child5);
  main.variable(observer("summarizeCell")).define("summarizeCell", ["cellSummary"], _summarizeCell);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("cellDescription")).define("cellDescription", ["summarizeCell"], _cellDescription);
  main.variable(observer("describe_cellsTool")).define("describe_cellsTool", ["getModule","cellMapCompat","decompile","cellDescription"], _describe_cellsTool);
  main.variable(observer("test_describe_cellsTool")).define("test_describe_cellsTool", ["describe_cellsTool"], _test_describe_cellsTool);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer("upsertCell")).define("upsertCell", ["compile","main","ojs_observer"], _upsertCell);
  main.variable(observer("upsert_cellsTool")).define("upsert_cellsTool", ["cellsRegex","getModule","viewof workingModule","process","upsertCell","summarizeVariable"], _upsert_cellsTool);
  main.variable(observer()).define(["upsert_cellsTool"], _76);
  main.variable(observer("cellsRegex")).define("cellsRegex", _cellsRegex);
  main.variable(observer()).define(["cellsRegex"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("replace_cellTool")).define("replace_cellTool", ["getModule","cellMapCompat","replaceCell"], _replace_cellTool);
  main.variable(observer("replaceCell")).define("replaceCell", ["compile","runtime","repositionSetElement"], _replaceCell);
  main.variable(observer("sample_variable")).define("sample_variable", _sample_variable);
  main.variable(observer("test_replace_cellTool")).define("test_replace_cellTool", ["replace_cellTool"], _test_replace_cellTool);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer()).define(["md"], _85);
  const child6 = runtime.module(define6);
  main.import("inspect", child6);
  main.import("Inspector", child6);
  main.import("src", child6);
  main.variable(observer("summarizeVariable")).define("summarizeVariable", ["observe","summarizeJS"], _summarizeVariable);
  main.variable(observer("peek_variableTool")).define("peek_variableTool", ["getModule","cellMapCompat","summarizeVariable"], _peek_variableTool);
  main.variable(observer("test_peek_variableTool")).define("test_peek_variableTool", ["peek_variableTool"], _test_peek_variableTool);
  main.define("initial cool", _cool);
  main.variable(observer("mutable cool")).define("mutable cool", ["Mutable", "initial cool"], (M, _) => new M(_));
  main.variable(observer("cool")).define("cool", ["mutable cool"], _ => _.generator);
  main.variable(observer("errored")).define("errored", _errored);
  main.variable(observer("pending")).define("pending", _pending);
  main.variable(observer("test_peek_variableTool_mutable")).define("test_peek_variableTool_mutable", ["peek_variableTool"], _test_peek_variableTool_mutable);
  main.variable(observer("test_peek_variableTool_error")).define("test_peek_variableTool_error", ["peek_variableTool"], _test_peek_variableTool_error);
  main.variable(observer("test_peek_variableTool_pending")).define("test_peek_variableTool_pending", ["peek_variableTool"], _test_peek_variableTool_pending);
  main.variable(observer("test_peek_variableTool_tests")).define("test_peek_variableTool_tests", ["peek_variableTool"], _test_peek_variableTool_tests);
  main.variable(observer()).define(["md"], _97);
  main.variable(observer("moduleVariables")).define("moduleVariables", _moduleVariables);
  const child7 = runtime.module(define7);
  main.import("summarizeJS", child7);
  const child8 = runtime.module(define8);
  main.import("localStorageView", child8);
  const child9 = runtime.module(define9);
  main.import("responses", child9);
  main.import("runTools", child9);
  main.import("evalJavaScriptTool", child9);
  const child10 = runtime.module(define10);
  main.import("onCodeChange", child10);
  main.import("ojs_observer", child10);
  main.import("thisModule", child10);
  main.import("keepalive", child10);
  main.import("main", child10);
  main.import("runtime", child10);
  main.import("repositionSetElement", child10);
  main.import("observe", child10);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("getModules")).define("getModules", ["moduleMap"], _getModules);
  main.variable(observer("getModule")).define("getModule", ["getModules"], _getModule);
  const child11 = runtime.module(define11);
  main.import("tests", child11);
  main.variable(observer()).define(["md"], _107);
  main.variable(observer("prompts")).define("prompts", _prompts);
  main.variable(observer("reasoning_models")).define("reasoning_models", _reasoning_models);
  main.variable(observer()).define(["md"], _110);
  main.variable(observer("viewof calls")).define("viewof calls", ["FileAttachment","viewof active_tools","Inputs"], _calls);
  main.variable(observer("calls")).define("calls", ["Generators", "viewof calls"], (G, _) => G.input(_));
  main.variable(observer()).define(["setFileAttachment","jsonFileAttachment","calls","myModule"], _112);
  main.variable(observer()).define(["Inputs","calls"], _113);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer("actions")).define("actions", ["continuation","htl","initialPromptDialog","error","viewof yolo","runTools","Event","Inputs","followUpQuestionDialog","attempCompletetionDialog"], _actions);
  main.variable(observer("error")).define("error", ["htl"], _error);
  main.variable(observer("plan")).define("plan", ["htl","step","actions","viewof calls"], _plan);
  main.variable(observer("step")).define("step", ["htl","input","output"], _step);
  main.variable(observer("input")).define("input", ["input_function_call_output","input_custom_tool_call_output","input_content"], _input);
  main.variable(observer("input_content")).define("input_content", ["htl"], _input_content);
  main.variable(observer("input_function_call_output")).define("input_function_call_output", ["htl","md"], _input_function_call_output);
  main.variable(observer("input_custom_tool_call_output")).define("input_custom_tool_call_output", ["htl","md"], _input_custom_tool_call_output);
  main.variable(observer("output")).define("output", ["output_message","output_message_function_call","output_message_custom_tool_call","output_message_reasoning"], _output);
  main.variable(observer("output_message_function_call")).define("output_message_function_call", ["htl","md"], _output_message_function_call);
  main.variable(observer("output_message_custom_tool_call")).define("output_message_custom_tool_call", ["htl","md"], _output_message_custom_tool_call);
  main.variable(observer("output_message_reasoning")).define("output_message_reasoning", ["htl","output_message_reasoning_summary"], _output_message_reasoning);
  main.variable(observer("output_message_reasoning_summary")).define("output_message_reasoning_summary", ["html"], _output_message_reasoning_summary);
  main.variable(observer("output_message")).define("output_message", ["htl","output_message_content"], _output_message);
  main.variable(observer("output_message_content")).define("output_message_content", ["output_message_content_output_text"], _output_message_content);
  main.variable(observer("output_message_content_output_text")).define("output_message_content_output_text", ["htl","md"], _output_message_content_output_text);
  main.variable(observer()).define(["md"], _131);
  main.variable(observer()).define(["workingModule","md","instructions"], _132);
  main.variable(observer("instructions")).define("instructions", ["keepalive","myModule","viewof workingModule","tests_module","peek_variableTool"], _instructions);
  const child12 = runtime.module(define12);
  main.import("expect", child12);
  const child13 = runtime.module(define13);
  main.import("robocoop", child13);
  main.import("cellSummary", child13);
  main.import("process", child13);
  const child14 = runtime.module(define14);
  main.import("lopepageModule", child14);
  const child15 = runtime.module(define15);
  main.import("notesModule", child15);
  const child16 = runtime.module(define16);
  main.import("getFileAttachment", child16);
  main.import("setFileAttachment", child16);
  main.import("removeFileAttachment", child16);
  main.import("jsonFileAttachment", child16);
  main.import("createFileAttachment", child16);
  main.import("getFileAttachments", child16);
  main.variable(observer()).define(["robocoop"], _139);
  const child17 = runtime.module(define17);
  main.import("_ndd", child17);
  return main;
}
