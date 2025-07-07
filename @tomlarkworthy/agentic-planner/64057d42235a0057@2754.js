import define1 from "./cdc303fcc82a630f@262.js";
import define2 from "./db42ae70222a8b08@995.js";
import define3 from "./e3a019069a130d79@6074.js";
import define4 from "./a2a7845a5e2a5aec@139.js";
import define5 from "./b69d20b9e3533ef8@149.js";
import define6 from "./048a17a165be198d@271.js";
import define7 from "./26b0ee4d8f136fca@364.js";
import define8 from "./98f34e974bb2e4bc@650.js";
import define9 from "./f096db8fcbc444bf@563.js";
import define10 from "./ee79b1fa5101d6d9@3211.js";

function _1(md){return(
md`# Roboco-op 2.0: Agentic Notebook Assistent
`
)}

function _ui(endpoint,keepalive,myModule,htl,reversibleAttach,ui_attached,style,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9)
{
  endpoint;
  keepalive(myModule, "initial_response");
  const ui = htl.html`<div>
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
  <div style="max-height: 1024px; overflow: auto">
    ${reversibleAttach(ui_attached, $8)}
  </div>
  ${reversibleAttach(ui_attached, $9)}
</div>`;

  setTimeout(() => {
    $8.parentNode.scrollTop =
      $8.parentNode.scrollHeight;
  }, 0);
  return ui;
}


function _about(md){return(
md`## About

Roboco-op 2.0 runs inside the notebook along side userspace code. This means it can **read program values** and **write new cells**. It has the dataflow dependancy graph at hand which it uses to gather context. The notebook environment is reactive, so modifications are applied immediately and cascade to only the cells downstream of dataflow. The agent can write new tools, test its code, and draw diagrams. 

This is a better workflow for agents than mainstream development tooling, where code and program are separate and programs must be repeatedly restarted from scratch. In Roboco-op the agent is reactively syncronized to the running program state and able to modify code in-flight.

Inline unit tests update reactively too, and the notebook supports data-viz out-of-the-box. When running on [ObservableHQ.com](https://observablehq.com/@tomlarkworthy/agentic-planner) the cells it creates are not visible, but they exist and can be depended on, when running on [Lopecode](https://github.com/tomlarkworthy/lopecode) changes are visible. `
)}

function _4(md){return(
md`## Failing Tests`
)}

function _failing_tests(tests){return(
tests({
  filter: (test) => test.computed && test.state == "rejected"
})
)}

function _6(md){return(
md`## Architecture`
)}

function _7(md){return(
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

function _9(md){return(
md`## TODO

- MCP integration
- Reading cells as images
- FileAttachment support
- Fix main issue with tests`
)}

function _10(md){return(
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

function _24(md){return(
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

function _26(md){return(
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

function _30(md){return(
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

function _34(md){return(
md`#### evalJavaScriptTool`
)}

function _35(evalJavaScriptTool){return(
evalJavaScriptTool
)}

function _36(md){return(
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

function _41(md){return(
md`#### list_cells`
)}

function _list_cellsTool(getModule,cellMap,summarizeCell){return(
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
    const cells = await cellMap(module.module);

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

function _44(md){return(
md`### search_cells`
)}

function _search_cellsTool(getModule,moduleMap,runtime,cellMap,decompile,cellDescription){return(
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
      const cells = await cellMap(module.module);

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

function _50(md){return(
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

function _describe_cellsTool(getModule,cellMap,decompile,cellDescription){return(
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
    const cells = await cellMap(module.module);

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

function _54(md){return(
md`### create_cell`
)}

function _create_cellTool(getModule,cellMap,runtime,createCell,repositionSetElement,summarizeVariable){return(
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
      const cells = await cellMap(module.module);
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

function _61(md){return(
md`### replace_cell`
)}

function _replace_cellTool(getModule,cellMap,replaceCell){return(
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
    const cells = await cellMap(module.module);
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

function _66(md){return(
md`### peek_cell`
)}

function _67(md){return(
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

function _peek_variableTool(getModule,cellMap,summarizeVariable){return(
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
    const cells = await cellMap(module.module);
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

function _79(md){return(
md`### Helpers`
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

function _88(md){return(
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
["o4-mini", "o3-mini", "o3"]
)}

function _91(md){return(
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


function _calls(Inputs){return(
Inputs.input([])
)}

function _94(md){return(
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

function _109(md){return(
md`## Prompt`
)}

function _110(context_menu){return(
context_menu
)}

function _112(md,instructions){return(
md`${instructions}`
)}

function _instructions($0){return(
() => `RULES
- You are Roboco-op, a highly professional software engineer with extensive knowledge Observable notebooks, data analysis and visualization, and literate programming.
- You are executing inside a browser, collaberating with a user on a notebook, executing inside the notebook. Your JavascriptEnvironment is thus browser based and your scoping is an execution inside a function. You may access globals like window or document, but most interactions will use the tools that operate on the Observable reactive runtime.
- A notebook is made up of modules, cells and fileattachments. It is a literate programming environment and most modules contain useful information to understand the motivation, read those anonymous cells.
- Both you and the user can only append Observable source code to the notebook. All usage suggestions to the user should thus be in the form of Observable cell source code.
- You are capable of querying the notebook to discover its capabilities. Use the tooling to provide answers based on facts.
- When understanding cells, always run describe_cells on preceeding anonymous cells, as they may contain critical information needed to understand the cell properly. Prefer decribing more cells than you think you need to ensure coverage and full understanding. Follow the inputs to cells to ensure you understand the dependancies before answering.
- Use the replace_cell or create_cell tool modify the notebook. You do not need to display the changes before using the tool.
- Do not ask for more information than necessary. Use the tools provided to accomplish the user's request efficiently and effectively. When you've completed your task, you *MUST* use the attempt_completion tool to present the result to the user. The user may provide feedback, which you can use to make improvements and try again.
- You are only allowed to ask the user questions using the ask_followup_question tool. Use this tool only when you need additional details to complete a task, and be sure to use a clear and concise question that will help you move forward with the task. However if you can use the available tools to avoid having to ask the user questions, you should do so. For example, if the user mentions a specific cell, you should use the list_modules tool to list the modules in the runtime and check if the cell they are talking about is there, rather than asking the user to provide the cell themselves.
- Your goal is to try to accomplish the user's task, NOT engage in a back and forth conversation.
- Never suggest code you have not executed and checked the result of. Use temporary cells for scratch calculations, but if creating a cannonical test use a unit test prefixed with 'test_'.
- NEVER end attempt_completion result with a question or request to engage in further conversation! Formulate the end of your result in a way that is final and does not require further input from the user.
- You are STRICTLY FORBIDDEN from starting your messages with "Great", "Certainly", "Okay", "Sure". You should NOT be conversational in your responses, but rather direct and to the point. For example you should NOT say "Great, I've updated the CSS" but instead something like "I've updated the CSS". It is important you be clear and technical in your messages.
- When presented with images, utilize your vision capabilities to thoroughly examine them and extract meaningful information. Incorporate these insights into your thought process as you accomplish the user's task.
- Like any professional software engineer, you make mistakes, which is why you attempt to verify operations have executed as you expected with peek_cell. Furthermore, you document examples through unit tests.
- You check for failing tests in the "main" module, cell "failing_tests", and cell prefixed with 'test_' is automatically picked up by the test suite.


====

OBJECTIVE

You accomplish a given task iteratively, breaking it down into clear steps and working through them methodically.

1. Analyze the user's task and set clear, achievable goals to accomplish it. Prioritize these goals in a logical order.
2. Work through these goals sequentially, utilizing available tools one at a time as necessary. Each goal should correspond to a distinct step in your problem-solving process. You will be informed on the work completed and what's remaining as you go.
3. Remember, you have extensive capabilities with access to a wide range of tools that can be used in powerful and clever ways as necessary to accomplish each goal. Before calling a tool, think about it before hand. Think about which of the provided tools is the most relevant tool to accomplish the user's task. Next, go through each of the required parameters of the relevant tool and determine if the user has directly provided or given enough information to infer a value. When deciding if the parameter can be inferred, carefully consider all the context to see if it supports a specific value. If all of the required parameters are present or can be reasonably inferred, stop thinking and proceed with the tool use. BUT, if one of the values for a required parameter is missing, DO NOT invoke the tool (not even with fillers for the missing params) and instead, ask the user to provide the missing parameters using the ask_followup_question tool. DO NOT ask for more information on optional parameters if it is not provided.
4. Once you've completed the user's task, you *MUST* use the attempt_completion tool to present the result of the task to the user. You may also provide an example cell to showcase the result of your task.
5. The user may provide feedback, which you can use to make improvements and try again. But DO NOT continue in pointless back and forth conversations, i.e. don't end your responses with questions or offers for further assistance.

====

USER CONTEXT

The user has the notebook open on "${
  $0.value.module.name
}" and selected cell "${$0.value.name}"

You can look for failing tests in the "main" notebook, peek_cell "failing_tests"

`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("ui")).define("ui", ["endpoint","keepalive","myModule","htl","reversibleAttach","ui_attached","style","viewof endpoint","viewof OPENAI_API_KEY","viewof model","viewof active_tools","viewof prompt_example","viewof prompt","viewof yolo","viewof clear","viewof history_ui","viewof undo_last"], _ui);
  main.variable(observer("about")).define("about", ["md"], _about);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof failing_tests")).define("viewof failing_tests", ["tests"], _failing_tests);
  main.variable(observer("failing_tests")).define("failing_tests", ["Generators", "viewof failing_tests"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("design")).define("design", ["mermaid","md"], _design);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  const child1 = runtime.module(define1);
  main.import("reversibleAttach", child1);
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
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("tools")).define("tools", ["attempt_completionTool","ask_followup_questionTool","list_modulesTool","list_cellsTool","describe_cellsTool","create_cellTool","replace_cellTool","peek_variableTool","search_cellsTool"], _tools);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("attempt_completionTool")).define("attempt_completionTool", ["viewof completionFeedback"], _attempt_completionTool);
  main.variable(observer("viewof completionFeedback")).define("viewof completionFeedback", ["Inputs"], _completionFeedback);
  main.variable(observer("completionFeedback")).define("completionFeedback", ["Generators", "viewof completionFeedback"], (G, _) => G.input(_));
  main.variable(observer("attempCompletetionDialog")).define("attempCompletetionDialog", ["viewof completionFeedback","runTools","Event","htl","md"], _attempCompletetionDialog);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("ask_followup_questionTool")).define("ask_followup_questionTool", ["viewof followUpResponse"], _ask_followup_questionTool);
  main.variable(observer("viewof followUpResponse")).define("viewof followUpResponse", ["Inputs"], _followUpResponse);
  main.variable(observer("followUpResponse")).define("followUpResponse", ["Generators", "viewof followUpResponse"], (G, _) => G.input(_));
  main.variable(observer("followUpQuestionDialog")).define("followUpQuestionDialog", ["viewof followUpResponse","runTools","Event","htl","md"], _followUpQuestionDialog);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["evalJavaScriptTool"], _35);
  main.variable(observer()).define(["md"], _36);
  const child2 = runtime.module(define2);
  main.import("moduleMap", child2);
  main.variable(observer("list_modulesTool")).define("list_modulesTool", ["runtimeSummary"], _list_modulesTool);
  main.variable(observer("runtimeSummary")).define("runtimeSummary", ["getModules"], _runtimeSummary);
  main.variable(observer("test_list_modulesTool")).define("test_list_modulesTool", ["md","list_modulesTool"], _test_list_modulesTool);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("list_cellsTool")).define("list_cellsTool", ["getModule","cellMap","summarizeCell"], _list_cellsTool);
  main.variable(observer("test_list_cellsTool")).define("test_list_cellsTool", ["list_cellsTool"], _test_list_cellsTool);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("search_cellsTool")).define("search_cellsTool", ["getModule","moduleMap","runtime","cellMap","decompile","cellDescription"], _search_cellsTool);
  main.variable(observer("viewof searchPattern")).define("viewof searchPattern", ["Inputs"], _searchPattern);
  main.variable(observer("searchPattern")).define("searchPattern", ["Generators", "viewof searchPattern"], (G, _) => G.input(_));
  main.variable(observer("test_search_for_cell_digit_name")).define("test_search_for_cell_digit_name", ["search_cellsTool","searchPattern"], _test_search_for_cell_digit_name);
  const child3 = runtime.module(define3);
  main.import("decompile", child3);
  main.import("compile", child3);
  main.import("cellMap", child3);
  main.variable(observer("summarizeCell")).define("summarizeCell", _summarizeCell);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("cellDescription")).define("cellDescription", ["summarizeVariable"], _cellDescription);
  main.variable(observer("describe_cellsTool")).define("describe_cellsTool", ["getModule","cellMap","decompile","cellDescription"], _describe_cellsTool);
  main.variable(observer("test_describe_cellsTool")).define("test_describe_cellsTool", ["describe_cellsTool"], _test_describe_cellsTool);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("create_cellTool")).define("create_cellTool", ["getModule","cellMap","runtime","createCell","repositionSetElement","summarizeVariable"], _create_cellTool);
  main.variable(observer("test_create_cellTool")).define("test_create_cellTool", ["create_cellTool"], _test_create_cellTool);
  main.variable(observer("test_create_cell_dupe")).define("test_create_cell_dupe", ["create_cellTool"], _test_create_cell_dupe);
  main.variable(observer("test_create_cell_after")).define("test_create_cell_after", ["create_cellTool"], _test_create_cell_after);
  main.variable(observer("createCell")).define("createCell", ["compile","main"], _createCell);
  main.variable(observer("test_create_cell_anon")).define("test_create_cell_anon", ["createCell","myModule"], _test_create_cell_anon);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("replace_cellTool")).define("replace_cellTool", ["getModule","cellMap","replaceCell"], _replace_cellTool);
  main.variable(observer("replaceCell")).define("replaceCell", ["compile","runtime","repositionSetElement"], _replaceCell);
  main.variable(observer("sample_variable")).define("sample_variable", _sample_variable);
  main.variable(observer("test_replace_cellTool")).define("test_replace_cellTool", ["replace_cellTool"], _test_replace_cellTool);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["md"], _67);
  const child4 = runtime.module(define4);
  main.import("inspect", child4);
  main.import("Inspector", child4);
  main.import("src", child4);
  main.variable(observer("summarizeVariable")).define("summarizeVariable", ["observe","summarizeJS"], _summarizeVariable);
  main.variable(observer("peek_variableTool")).define("peek_variableTool", ["getModule","cellMap","summarizeVariable"], _peek_variableTool);
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
  main.variable(observer()).define(["md"], _79);
  const child5 = runtime.module(define5);
  main.import("summarizeJS", child5);
  const child6 = runtime.module(define6);
  main.import("localStorageView", child6);
  const child7 = runtime.module(define7);
  main.import("responses", child7);
  main.import("runTools", child7);
  main.import("evalJavaScriptTool", child7);
  const child8 = runtime.module(define8);
  main.import("thisModule", child8);
  main.import("keepalive", child8);
  main.import("main", child8);
  main.import("runtime", child8);
  main.import("repositionSetElement", child8);
  main.import("observe", child8);
  main.variable(observer("viewof myModule")).define("viewof myModule", ["thisModule"], _myModule);
  main.variable(observer("myModule")).define("myModule", ["Generators", "viewof myModule"], (G, _) => G.input(_));
  main.variable(observer("getModules")).define("getModules", ["moduleMap"], _getModules);
  main.variable(observer("getModule")).define("getModule", ["getModules"], _getModule);
  const child9 = runtime.module(define9);
  main.import("tests", child9);
  main.variable(observer()).define(["md"], _88);
  main.variable(observer("prompts")).define("prompts", _prompts);
  main.variable(observer("reasoning_models")).define("reasoning_models", _reasoning_models);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("initial_response")).define("initial_response", ["viewof calls","Event","responses","viewof endpoint","model","instructions","prompt","viewof active_tools"], _initial_response);
  main.variable(observer("viewof calls")).define("viewof calls", ["Inputs"], _calls);
  main.variable(observer("calls")).define("calls", ["Generators", "viewof calls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _94);
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
  main.variable(observer()).define(["md"], _109);
  main.variable(observer()).define(["context_menu"], _110);
  const child10 = runtime.module(define10);
  main.import("viewof selectedCell", child10);
  main.import("selectedCell", child10);
  main.import("context_menu", child10);
  main.variable(observer()).define(["md","instructions"], _112);
  main.variable(observer("instructions")).define("instructions", ["viewof selectedCell"], _instructions);
  return main;
}
