import define1 from "./03dda470c56b93ff@8385.js";
import define2 from "./cdc303fcc82a630f@262.js";
import define3 from "./db42ae70222a8b08@1033.js";
import define4 from "./e3a019069a130d79@6742.js";
import define5 from "./a89ea9f0ad8c6226@1403.js";
import define6 from "./a2a7845a5e2a5aec@139.js";
import define7 from "./b69d20b9e3533ef8@158.js";
import define8 from "./048a17a165be198d@273.js";
import define9 from "./26b0ee4d8f136fca@374.js";
import define10 from "./98f34e974bb2e4bc@699.js";
import define11 from "./f096db8fcbc444bf@565.js";
import define12 from "./ee79b1fa5101d6d9@3283.js";
import define13 from "./db80e603859226c1@23.js";
import define14 from "./50e53b27a28761aa@783.js";

function _1(md){return(
md`# Roboco-op 3.0: Agentic Notebook Assistent
`
)}

function _ui(endpoint,keepalive,myModule,htl,reversibleAttach,ui_attached,style,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
{
  endpoint;
  keepalive(myModule, "initial_response");
  const ui = htl.html`<div>
  <h2>Robocoop 3.0</h2>
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
  ${reversibleAttach(ui_attached, $7)}
  ${reversibleAttach(ui_attached, $8)}
  <div style="max-height: 1024px; overflow: auto">
    ${reversibleAttach(ui_attached, $9)}
  </div>
  ${reversibleAttach(ui_attached, $10)}
</div>`;

  setTimeout(() => {
    $9.parentNode.scrollTop =
      $9.parentNode.scrollHeight;
  }, 0);
  return ui;
}


function _3(history){return(
history
)}

function _4(md){return(
md`\`\`\`js
import { ui, expect} from "@tomlarkworthy/agentic-planner"
\`\`\``
)}

function _about(md){return(
md`## About

Roboco-op 2.0 runs inside the notebook along side userspace code. This means it can **read program values** and **write new cells**. It has the dataflow dependancy graph at hand which it uses to gather context. The notebook environment is reactive, so modifications are applied immediately and cascade to only the cells downstream of dataflow. The agent can write new tools, test its code, and draw diagrams. 

This is a better workflow for agents than mainstream development tooling, where code and program are separate and programs must be repeatedly restarted from scratch. In Roboco-op the agent is reactively syncronized to the running program state and able to modify code in-flight.

Inline unit tests update reactively too, and the notebook supports data-viz out-of-the-box. When running on [ObservableHQ.com](https://observablehq.com/@tomlarkworthy/agentic-planner) the cells it creates are not visible, but they exist and can be depended on, when running on [Lopecode](https://github.com/tomlarkworthy/lopecode) changes are visible. `
)}

function _6(md){return(
md`## TDD`
)}

function _7(md){return(
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

function _10(md){return(
md`## Architecture`
)}

function _11(md){return(
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

function _13(md){return(
md`## TODO

- MCP integration
- Reading cells as images
- FileAttachment support
- Fix main issue with tests`
)}

function _15(exporter){return(
exporter()
)}

function _16(md){return(
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

function _prompt_example(Inputs,prompts){return(
Inputs.select(prompts, { label: "example prompts" })
)}

function _workingModule(Inputs,currentModules){return(
Inputs.select(
  [...currentModules.values()].map((m) => m.name),
  {
    label: "working module"
  }
)
)}

function _prompt(Inputs,prompt_example){return(
Inputs.textarea({
  label: "prompt",
  submit: "go",
  value: prompt_example,
  minlength: 1
})
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

function _31(md){return(
md`## Tools`
)}

function _tools(attempt_completionTool,ask_followup_questionTool,list_modulesTool,list_cellsTool,describe_cellsTool,create_cellTool,replace_cellTool,peek_variableTool,search_cellsTool){return(
[
  //evalJavaScriptTool,
  attempt_completionTool,
  ask_followup_questionTool,
  list_modulesTool,
  list_cellsTool,
  describe_cellsTool,
  create_cellTool,
  replace_cellTool,
  peek_variableTool,
  search_cellsTool
]
)}

function _33(md){return(
md`#### attempt_completion

`
)}

function _attempt_completionTool($0){return(
{
  type: "function",
  name: "attempt_completion",
  strict: true,
  description:
    "Use this tool to present the final *validated* conclusion to the user.",
  parameters: {
    type: "object",
    properties: {
      result: {
        type: "string",
        description:
          "The result of the task. Formulate this result in a way that is final and does not require further input from the user. Don't end your result with questions or offers for further assistance."
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

function _37(md){return(
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

function _41(md){return(
md`#### evalJavaScriptTool`
)}

function _42(evalJavaScriptTool){return(
evalJavaScriptTool
)}

function _43(md){return(
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
  return `### modules\n${modules
    .map(
      (module) => `- ${module.name}${
        module?.dependsOn?.length > 0
          ? `\n  - dependsOn\n${
              module.dependsOn &&
              module.dependsOn.map((d) => `    - ${d}`).join("\n")
            }`
          : ""
      }
`
    )
    .join("")}`;
}
)}

async function _test_list_modulesTool(md,list_modulesTool){return(
md`${await list_modulesTool.execute()}`
)}

function _48(md){return(
md`#### list_cells`
)}

function _list_cellsTool(getModule,cellMapCompat,summarizeCell){return(
{
  type: "function",
  name: "list_cells",
  strict: true,
  description:
    "Use this list the cells in a module. They are listed in the order they appear in a notebook. Adjacent cells are likely to be semantically related, but functionally ordering does not matter. Anonymous cells could be documentation for a nearby code cell.",
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

    return `${module_name} contents:\n
${[...cells.entries()]
  .map(([name, variables]) => summarizeCell({ name, variables }))
  .join("")}
    `;

    return cells;
  }
}
)}

function _test_list_cellsTool(list_cellsTool){return(
list_cellsTool.execute({
  module_name: "main"
})
)}

function _51(md){return(
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
  debugger;
  const result = search_cellsTool.execute({
    module_name: null,
    pattern: searchPattern,
    flags: ""
  });
  return result;
}


function _summarizeCell(){return(
({ name, variables } = {}) => {
  const definitionSize = variables.reduce(
    (total, variable) => variable._definition.toString().length,
    0
  );
  return `- ${typeof name == "string" ? name : `${name}`}
  - inputs: [${variables[0]._inputs.map((i) => i._name)}]
  - reachable: ${variables[0]._reachable}
  - definition size: ${definitionSize} bytes
`;
}
)}

function _58(md){return(
md`#### describe_cells`
)}

function _cellDescription(summarizeVariable){return(
async (module_name, cell_name, variables, source) => {
  return `#### module '${module_name}' cell '${
    variables[0]._name || cell_name
  }':
- inputs: [${variables[0]._inputs.map((i) => i._name)}]
- outputs: [${[...variables[0]._outputs].map((i) => i._name)}]
- reachable: ${variables[0]._reachable}${
    variables[0]._reachable
      ? `\n- value: ${await summarizeVariable(
          variables[0]._name,
          variables[0],
          {
            max_size: 1
          }
        )}\n`
      : ""
  }
<code>
${source}
</code>
`;
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
      return cellDescription(module_name, cell_name, variables, source);
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

function _62(md){return(
md`### create_cell`
)}

function _create_cellTool(getModule,cellMapCompat,runtime,createCell,repositionSetElement,summarizeVariable){return(
{
  type: "function",
  name: "create_cell",
  strict: true,
  description:
    "Add cells to the runtime. Optionally specify after_cell to insert after an existing cell.",
  parameters: {
    type: "object",
    properties: {
      module_name: { type: "string" },
      source: { type: "string" },
      after_cell: { type: ["integer", "string", "null"] }
    },
    required: ["module_name", "source", "after_cell"],
    additionalProperties: false
  },
  execute: async ({ module_name, source, after_cell } = {}) => {
    const module = await getModule(module_name);
    if (!module) return `Error: module ${module_name} not found`;
    let idx = -1;
    if (after_cell) {
      const cells = await cellMapCompat(module.module);
      if (!cells.has(after_cell))
        return `Error: cell '${after_cell}' not found in module '${module_name}'`;
      const target = cells.get(after_cell).at(-1);
      idx = [...runtime._variables].findIndex((v) => v === target) + 1;
      if (idx < 0) return `Error: could not locate target cell '${after_cell}'`;
    }
    let variables;
    try {
      variables = createCell({
        module: module.module,
        source
      });
    } catch (err) {
      return `Error: ${err?.message || err}`;
    }
    if (after_cell) {
      variables.forEach((v, i) =>
        repositionSetElement(runtime._variables, v, idx + i)
      );
    }
    return summarizeVariable(variables[0]._name, variables[0]);
  }
}
)}

function _test_create_cellTool(create_cellTool)
{
  return create_cellTool.execute({
    module_name: "main",
    source: "akljlksda = {}"
  });
}


function _test_create_cell_dupe(create_cellTool){return(
create_cellTool.execute({
  module_name: "main",
  source: "createCell = 54"
})
)}

function _test_create_cell_after(create_cellTool){return(
create_cellTool.execute({
  module_name: "main",
  source: "after_cell_test_4 = 81",
  after_cell: 1
})
)}

function _createCell(compile,main){return(
function createCell({ module, source } = {}) {
  const defs = compile(source);
  // check for collisions
  debugger;
  defs.forEach((def) => {
    if (
      def._name &&
      module._scope.has(def._name) &&
      /* scoped variables can exist for errors but not actually be real in the runtime*/ main._runtime._variables.has(
        module._scope.get(def._name)
      )
    ) {
      throw "duplicate name";
    }
  });
  const variables = defs.map((def) => {
    let _fn;
    eval("_fn = " + def._definition);
    return module.variable({}).define(def._name, def._inputs, _fn);
  });
  return variables;
}
)}

function _test_create_cell_anon(createCell,myModule){return(
createCell({ module: myModule, source: "45" })
)}

function _69(md){return(
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

function _74(md){return(
md`### peek_cell`
)}

function _75(md){return(
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

    return await summarizeVariable(variable_name, variable);
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

function _87(md){return(
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

function _97(md){return(
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
["gpt-5-mini", "o4-mini", "o3-mini", "o3"]
)}

function _100(md){return(
md`## State`
)}

async function _initial_response($0,Event,responses,$1,model,instructions,prompt,$2)
{
  console.log("initial_response");
  debugger;
  $0.value = [];
  $0.dispatchEvent(new Event("input"));
  const call = await responses({
    url: $1.value,
    model,
    instructions,
    input: prompt,
    tools: $2.value,
    parallel_tool_calls: false,
    reasoning: {
      effort: "high",
      summary: "auto"
    },
    tool_choice: "required"
  });
  $0.value.push(call);
  $0.dispatchEvent(new Event("input"));
}


function _102(step,calls){return(
step(calls[5])
)}

function _calls(Inputs){return(
Inputs.input([])
)}

function _104(md){return(
md`## UI Builders`
)}

function _actions(error,$0,runTools,Event,htl,Inputs,followUpQuestionDialog,attempCompletetionDialog){return(
(calls_view, latest) => {
  if (!latest) return undefined;

  if (latest.error) return error(latest.error)
  
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

function _input(input_function_call_output,input_content){return(
(response, input) => {
  if (input.type == "function_call_output")
    return input_function_call_output(response, input);
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
    <h4>function_call_output</h4>
    ${md`${input.output}`}
</div>`
)}

function _output(output_message,output_message_function_call,output_message_reasoning){return(
(response, output) => {
  if (output.type == "message") return output_message(response, output);
  else if (output.type == "function_call")
    return output_message_function_call(response, output);
  else if (output.type == "reasoning")
    return output_message_reasoning(response, output);
  else {
    console.error("unhandled output type", output.type);
  }
}
)}

function _output_message_function_call(htl){return(
(response, output) => htl.html`<div 
    id=${output.id}
    class="function_call">
    <h4>function_call</h4>
    <code>
      ${output.name}(${JSON.stringify(output.arguments, null, 2)})
    </code>
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
    ${summary.text}
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

function _119(md){return(
md`## Prompt`
)}

function _120(context_menu){return(
context_menu
)}

async function _122(workingModule,md,instructions)
{
  workingModule;
  return md`${await instructions()}`;
}


function _instructions(keepalive,myModule,$0,tests_module,peek_variableTool)
{
  keepalive(myModule, "failing_tests");
  return async () => `RULES
- You are Roboco-op, a highly professional software engineer with extensive knowledge Observable notebooks, data analysis and visualization, and literate programming.
- You are executing inside a browser, collaberating with a user on a notebook, executing inside the notebook. 
- A notebook is made up of modules, cells and fileattachments. It is a literate programming environment and most modules contain useful information in anonymous markdown cells.
- Both you and the user can manipulate Observable source code in the notebook. All usage suggestions to the user should thus be in the form of Observable cell source code.
- You are capable of querying the notebook to discover its capabilities. Use tools to provide answers based on facts.
- When understanding cells, always run 'describe_cells' on preceeding anonymous cells, as they may contain critical information needed to understand the cell properly. Prefer decribing more cells than you think you need to ensure coverage and full understanding. Follow the inputs to cells to ensure you understand the dependancies before answering.
- Use the replace_cell or create_cell tool modify the notebook. You do not need to display the changes before using the tool.
- Do not ask for more information than necessary. Use the tools provided to accomplish the user's request efficiently and effectively. When you've completed your task, you *MUST* use the attempt_completion tool to present the result to the user. The user may provide feedback, which you can use to make improvements and try again.
- You are only allowed to ask the user questions using the ask_followup_question tool. Use this tool only when you need additional details to complete a task, and be sure to use a clear and concise question that will help you move forward with the task. However if you can use the available tools to avoid having to ask the user questions, you should do so. For example, if the user mentions a specific cell, you should use the list_modules tool to list the modules in the runtime and check if the cell they are talking about is there, rather than asking the user to provide the cell themselves.
- Your goal is to try to accomplish the user's task, NOT engage in a back and forth conversation. Be terse.
- Never suggest code you have not executed and checked the result of. Use temporary cells for scratch calculations, but if creating a cannonical test use a unit test prefixed with 'test_'.
- NEVER end attempt_completion result with a question or request to engage in further conversation! Formulate the end of your result in a way that is final and does not require further input from the user.
- You are STRICTLY FORBIDDEN from starting your messages with "Great", "Certainly", "Okay", "Sure". You should NOT be conversational in your responses, but rather direct and to the point. For example you should NOT say "Great, I've updated the CSS" but instead something like "I've updated the CSS". It is important you be clear and technical in your messages.
- When presented with images, utilize your vision capabilities to thoroughly examine them and extract meaningful information. Incorporate these insights into your thought process as you accomplish the user's task.
- Like any professional software engineer, you make mistakes, which is why you attempt to verify operations have executed as you expected with peek_cell. Furthermore, you document examples through unit tests.
- You check for failing tests in the "@tomlarkworthy/agentic-planner" module, cell "failing_tests", cells prefixed with 'test_' is automatically picked up by the test suite. If you observe an empty array in "failing_tests" then nothing is failing!
- You can write a test like so 
<code>
test_foo = {
  expect(await "foo").toEqual("bar");
}"
</code>
- You write in observablejs source code, so a simple cell might look like
<code>
myCell = {
  return "foo"
}
</code>

====

USER CONTEXT

You are to do most of your work in "${$0.value}" module.


You can look for failing tests in the "${
    tests_module.name
  }" notebook, cell "failing_tests". It currently is evaluating to

${await peek_variableTool.execute({
  module_name: tests_module.name,
  variable_name: "failing_tests"
})}
`;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("ui")).define("ui", ["endpoint","keepalive","myModule","htl","reversibleAttach","ui_attached","style","viewof endpoint","viewof OPENAI_API_KEY","viewof model","viewof active_tools","viewof workingModule","viewof prompt_example","viewof prompt","viewof yolo","viewof clear","viewof history_ui","viewof undo_last"], _ui);
  main.variable(observer()).define(["history"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("about")).define("about", ["md"], _about);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof failing_tests")).define("viewof failing_tests", ["tests"], _failing_tests);
  main.variable(observer("failing_tests")).define("failing_tests", ["Generators", "viewof failing_tests"], (G, _) => G.input(_));
  main.variable(observer("tests_module")).define("tests_module", ["viewof currentModules","myModule"], _tests_module);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("design")).define("design", ["mermaid","md"], _design);
  main.variable(observer()).define(["md"], _13);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer()).define(["exporter"], _15);
  main.variable(observer()).define(["md"], _16);
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
  main.variable(observer("viewof prompt_example")).define("viewof prompt_example", ["Inputs","prompts"], _prompt_example);
  main.variable(observer("prompt_example")).define("prompt_example", ["Generators", "viewof prompt_example"], (G, _) => G.input(_));
  main.variable(observer("viewof workingModule")).define("viewof workingModule", ["Inputs","currentModules"], _workingModule);
  main.variable(observer("workingModule")).define("workingModule", ["Generators", "viewof workingModule"], (G, _) => G.input(_));
  main.variable(observer("viewof prompt")).define("viewof prompt", ["Inputs","prompt_example"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer("viewof yolo")).define("viewof yolo", ["Inputs"], _yolo);
  main.variable(observer("yolo")).define("yolo", ["Generators", "viewof yolo"], (G, _) => G.input(_));
  main.variable(observer("viewof clear")).define("viewof clear", ["Inputs","viewof calls","Event"], _clear);
  main.variable(observer("clear")).define("clear", ["Generators", "viewof clear"], (G, _) => G.input(_));
  main.variable(observer("viewof history_ui")).define("viewof history_ui", ["plan","calls"], _history_ui);
  main.variable(observer("history_ui")).define("history_ui", ["Generators", "viewof history_ui"], (G, _) => G.input(_));
  main.variable(observer("viewof undo_last")).define("viewof undo_last", ["Inputs","viewof calls","Event"], _undo_last);
  main.variable(observer("undo_last")).define("undo_last", ["Generators", "viewof undo_last"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("tools")).define("tools", ["attempt_completionTool","ask_followup_questionTool","list_modulesTool","list_cellsTool","describe_cellsTool","create_cellTool","replace_cellTool","peek_variableTool","search_cellsTool"], _tools);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("attempt_completionTool")).define("attempt_completionTool", ["viewof completionFeedback"], _attempt_completionTool);
  main.variable(observer("viewof completionFeedback")).define("viewof completionFeedback", ["Inputs"], _completionFeedback);
  main.variable(observer("completionFeedback")).define("completionFeedback", ["Generators", "viewof completionFeedback"], (G, _) => G.input(_));
  main.variable(observer("attempCompletetionDialog")).define("attempCompletetionDialog", ["viewof completionFeedback","runTools","Event","htl","md"], _attempCompletetionDialog);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("ask_followup_questionTool")).define("ask_followup_questionTool", ["viewof followUpResponse"], _ask_followup_questionTool);
  main.variable(observer("viewof followUpResponse")).define("viewof followUpResponse", ["Inputs"], _followUpResponse);
  main.variable(observer("followUpResponse")).define("followUpResponse", ["Generators", "viewof followUpResponse"], (G, _) => G.input(_));
  main.variable(observer("followUpQuestionDialog")).define("followUpQuestionDialog", ["viewof followUpResponse","runTools","Event","htl","md"], _followUpQuestionDialog);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["evalJavaScriptTool"], _42);
  main.variable(observer()).define(["md"], _43);
  const child3 = runtime.module(define3);
  main.import("moduleMap", child3);
  main.import("viewof currentModules", child3);
  main.import("currentModules", child3);
  main.variable(observer("list_modulesTool")).define("list_modulesTool", ["runtimeSummary"], _list_modulesTool);
  main.variable(observer("runtimeSummary")).define("runtimeSummary", ["getModules"], _runtimeSummary);
  main.variable(observer("test_list_modulesTool")).define("test_list_modulesTool", ["md","list_modulesTool"], _test_list_modulesTool);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("list_cellsTool")).define("list_cellsTool", ["getModule","cellMapCompat","summarizeCell"], _list_cellsTool);
  main.variable(observer("test_list_cellsTool")).define("test_list_cellsTool", ["list_cellsTool"], _test_list_cellsTool);
  main.variable(observer()).define(["md"], _51);
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
  main.variable(observer("summarizeCell")).define("summarizeCell", _summarizeCell);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("cellDescription")).define("cellDescription", ["summarizeVariable"], _cellDescription);
  main.variable(observer("describe_cellsTool")).define("describe_cellsTool", ["getModule","cellMapCompat","decompile","cellDescription"], _describe_cellsTool);
  main.variable(observer("test_describe_cellsTool")).define("test_describe_cellsTool", ["describe_cellsTool"], _test_describe_cellsTool);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("create_cellTool")).define("create_cellTool", ["getModule","cellMapCompat","runtime","createCell","repositionSetElement","summarizeVariable"], _create_cellTool);
  main.variable(observer("test_create_cellTool")).define("test_create_cellTool", ["create_cellTool"], _test_create_cellTool);
  main.variable(observer("test_create_cell_dupe")).define("test_create_cell_dupe", ["create_cellTool"], _test_create_cell_dupe);
  main.variable(observer("test_create_cell_after")).define("test_create_cell_after", ["create_cellTool"], _test_create_cell_after);
  main.variable(observer("createCell")).define("createCell", ["compile","main"], _createCell);
  main.variable(observer("test_create_cell_anon")).define("test_create_cell_anon", ["createCell","myModule"], _test_create_cell_anon);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("replace_cellTool")).define("replace_cellTool", ["getModule","cellMapCompat","replaceCell"], _replace_cellTool);
  main.variable(observer("replaceCell")).define("replaceCell", ["compile","runtime","repositionSetElement"], _replaceCell);
  main.variable(observer("sample_variable")).define("sample_variable", _sample_variable);
  main.variable(observer("test_replace_cellTool")).define("test_replace_cellTool", ["replace_cellTool"], _test_replace_cellTool);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer()).define(["md"], _75);
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
  main.variable(observer()).define(["md"], _87);
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
  main.variable(observer()).define(["md"], _97);
  main.variable(observer("prompts")).define("prompts", _prompts);
  main.variable(observer("reasoning_models")).define("reasoning_models", _reasoning_models);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer("initial_response")).define("initial_response", ["viewof calls","Event","responses","viewof endpoint","model","instructions","prompt","viewof active_tools"], _initial_response);
  main.variable(observer()).define(["step","calls"], _102);
  main.variable(observer("viewof calls")).define("viewof calls", ["Inputs"], _calls);
  main.variable(observer("calls")).define("calls", ["Generators", "viewof calls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _104);
  main.variable(observer("actions")).define("actions", ["error","viewof yolo","runTools","Event","htl","Inputs","followUpQuestionDialog","attempCompletetionDialog"], _actions);
  main.variable(observer("error")).define("error", ["htl"], _error);
  main.variable(observer("plan")).define("plan", ["htl","step","actions","viewof calls"], _plan);
  main.variable(observer("step")).define("step", ["htl","input","output"], _step);
  main.variable(observer("input")).define("input", ["input_function_call_output","input_content"], _input);
  main.variable(observer("input_content")).define("input_content", ["htl"], _input_content);
  main.variable(observer("input_function_call_output")).define("input_function_call_output", ["htl","md"], _input_function_call_output);
  main.variable(observer("output")).define("output", ["output_message","output_message_function_call","output_message_reasoning"], _output);
  main.variable(observer("output_message_function_call")).define("output_message_function_call", ["htl"], _output_message_function_call);
  main.variable(observer("output_message_reasoning")).define("output_message_reasoning", ["htl","output_message_reasoning_summary"], _output_message_reasoning);
  main.variable(observer("output_message_reasoning_summary")).define("output_message_reasoning_summary", ["html"], _output_message_reasoning_summary);
  main.variable(observer("output_message")).define("output_message", ["htl","output_message_content"], _output_message);
  main.variable(observer("output_message_content")).define("output_message_content", ["output_message_content_output_text"], _output_message_content);
  main.variable(observer("output_message_content_output_text")).define("output_message_content_output_text", ["htl","md"], _output_message_content_output_text);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer()).define(["context_menu"], _120);
  const child12 = runtime.module(define12);
  main.import("viewof selectedCell", child12);
  main.import("selectedCell", child12);
  main.import("context_menu", child12);
  main.variable(observer()).define(["workingModule","md","instructions"], _122);
  main.variable(observer("instructions")).define("instructions", ["keepalive","myModule","viewof workingModule","tests_module","peek_variableTool"], _instructions);
  const child13 = runtime.module(define13);
  main.import("expect", child13);
  const child14 = runtime.module(define14);
  main.import("foo", child14);
  return main;
}
