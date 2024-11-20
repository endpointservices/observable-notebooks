import define1 from "./0b75dbddd18995dc@1389.js";
import define2 from "./048a17a165be198d@271.js";
import define3 from "./0e0b35a92c819d94@471.js";
import define4 from "./1f41fef8b019cf4e@94.js";
import define5 from "./f92778131fd76559@1208.js";

function _example_markdown(md){return(
{
  prompt: "Write an example markdown cell",
  time: 1699221659348,
  comment: "Example of a markdown cell"
} &&
  md` This is a markdown cell. You can use **bold**, _italic_, and [links](http://example.com).`
)}

function _game_plan(md){return(
({"prompt":"I would like to make an engaging tarot reading game. Can you please plan it?","time":1699651014431,"comment":"Planning the tarot reading game"}) && md`
## Tarot Reading Game Plan

1. **Introduction**: Explain the game to the user, provide instructions on how they can interact with it.

2. **Deck Initialization**: Create a Tarot deck. This can be achieved by either importing a Tarot deck library or creating a custom deck. The deck should contain 78 cards, each with a unique name and meaning.

3. **Card Selection**: Implement a mechanism for selecting a specific number of cards from the deck at random. This will simulate the shuffling and drawing of cards in a physical Tarot reading.

4. **Card Presentation**: Present the selected cards to the user. This can be done sequentially or all at once, depending on the type of reading being performed. Each card should be presented with its name and a brief description of its meaning.

5. **Card Interpretation**: Provide a deeper interpretation of the selected cards. This should take into account the position of the cards (e.g., past, present, future) and their orientation (upright or reversed).

6. **User Interaction**: Allow user to start a new reading, share their reading, or learn more about Tarot.

The game should be visually engaging, intuitive to interact with, and provide insightful readings.`
)}

function _import_tarot_deck(d3){return(
({"prompt":"Ok, importing a tarot deck library is not working. Can we use a different method? ","time":1699651780166,"comment":"Importing tarot deck using d3.json from a public GitHub repository"}) && d3.json('https://raw.githubusercontent.com/metabismuth/tarot-json/master/tarot.json')
)}

function _celtic_cross_reading_positions(md){return(
({"prompt":"Can you please explain what are all the tarot card positions in a Celtic Cross Reading?","time":1699652295304,"comment":"Explanation of tarot card positions in a Celtic Cross Reading"}) && md`
1. **The Present**: This card represents what is happening to the querent at the present time. It also reflects the querent's state of mind and how they may be perceiving the situation.

2. **The Challenge**: This card represents the immediate challenge or problem facing the querent. This is the issue that needs to be resolved or that is blocking the querent from moving forward.

3. **The Past**: This card represents the events leading up to the current situation. It can represent events in the querent's recent past or childhood that have an influence on the present situation.

4. **The Future**: This card represents the likely outcome if things continue on their current path. It's not the final outcome, but rather the next step on the journey.

5. **Above (Goals and Aspirations)**: This card represents the best possible outcome for the querent. It represents the querent's goals, aspirations, and best potential.

6. **Below (Subconscious Influences)**: This card represents what is driving the querent at the deepest level. This includes subconscious influences, deeply rooted beliefs, and spiritual forces.

7. **Advice**: This card represents guidance or advice for the querent on how to handle the current situation.

8. **External Influences**: This card represents the people, energies or events which are affecting the situation but are beyond the querent's control.

9. **Hopes and Fears**: This card represents the querent's hopes and fears related to the situation.

10. **Outcome**: This card represents the final outcome of the situation, given the current circumstances.`
)}

function _celtic_cross_reading(TarotDeck,prompt)
{
  ({"prompt":"Write a code where the user is asking a question + selecting all 10 cards for a Celtic Cross reading. Please.","time":1699652400900,"comment":"This code asks the user for a question, then draws 10 cards from a Tarot deck for a Celtic Cross reading, and displays the reading."})
  // Initialize the deck
  let deck = new TarotDeck();
  
  // Ask the user's question
  let question = prompt("Please enter your question:");
  
  // Select 10 cards for the Celtic Cross reading
  let reading = deck.draw(10);
  
  // Display the reading
  console.log("Your Celtic Cross reading for the question '", question, "' is:");
  for(let i = 0; i < reading.length; i++) {
    console.log("Card ", i+1, ": ", reading[i].name);
  }

}


function _6(md){return(
md`---

---

## Prompt Interface 🤗
`
)}

function _prompt(Inputs){return(
Inputs.textarea({
  placeholder: "enter what you want to do, CMD + ENTER to submit",
  rows: 10,
  minlength: 1,
  submit: true
})
)}

function _8(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _suggestion(Inputs,formatted_instruction){return(
Inputs.textarea({
  rows: 50,
  disabled: true,
  value: formatted_instruction,
  style: "height: 500px"
})
)}

function _10(md){return(
md`## Current Chat context`
)}

function _context_viz(Inputs,context,html,inspect){return(
Inputs.table(
  context.map((r) => ({
    role: r.role,
    content_or_function_call: r.content || r.function_call
  })),
  {
    format: {
      role: (role) =>
        html`<span style="color: ${
          role == "assistant" ? "red" : "black"
        }">${role}`,
      content_or_function_call: (f) =>
        f.arguments ? inspect(JSON.parse(f.arguments)) : f
    },
    layout: "auto",
    title: {
      combined: "foo"
    }
  }
)
)}

function _12(md){return(
md`## Cell Values to Include

tick cells to include in the next prompt`
)}

function _feedback_cells_selector(Inputs,variables,inspect){return(
Inputs.table(
  Object.entries(variables)
    .map(([name, v]) => ({
      name,
      value: inspect(v._value).innerText.trim()
    }))
    .filter((v) => v.name !== "null"),
  {
    layout: "auto",
    value: []
  }
)
)}

function _feedback_prompt(feedback_cells){return(
feedback_cells.length > 0
  ? `
The notebook contains:
${feedback_cells
  .map((cell) => `  - cell "${cell.name}" is ${cell.value}\n`)
  .join("")}`
  : ""
)}

function _15(md){return(
md`### AI Settings`
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

function _settings(Inputs,view,localStorageView){return(
{
  prompt:
    '\nThe notebook contains:\n  - cell "form" is Object {a: "", b: ""}\nUsing the already imported view literal for configuring a ChatGPT session. Example response \n\n{\n  model: "gpt-3.5-turbo"\n  temperature: 0.7\n  max_tokens: 1000\n  top_p: 1\n  frequency_penalty: 0\n  presence_penalty: 0\n}\n\nUse Inputs.select for model, Inputs.range for max_tokens etc.',
  time: 1699384189902,
  comment:
    "Creating a form to configure a ChatGPT session. The form includes a select input for model, and range inputs for temperature, max_tokens, top_p, frequency_penalty, and presence_penalty."
} &&
  Inputs.bind(
    view`
    <div>${[
      "model",
      Inputs.select(
        [
          "gpt-3.5-turbo-1106",
          "gpt-3.5-turbo",
          "gpt-3.5-turbo-0301",
          "gpt-3.5-turbo-0613",
          "gpt-3.5-turbo-16k",
          "gpt-3.5-turbo-16k-0613",
          "gpt-3.5-turbo-instruct",
          "gpt-3.5-turbo-instruct-0914",
          "gpt-4-1106-preview",
          "gpt-4",
          "gpt-4-32k",
          "gpt-4-0314",
          "gpt-4-0613"
        ].sort(),
        { label: "model" }
      )
    ]}</div>
    <div>${[
      "temperature",
      Inputs.range([0, 1], { step: 0.1, value: 0.7, label: "temperature" })
    ]}</div>
    <div>${[
      "max_tokens",
      Inputs.range([1, 4000], { value: 1000, label: "max_tokens" })
    ]}</div>
    <div>${[
      "top_p",
      Inputs.range([0, 1], { step: 0.1, value: 1, label: "top_p" })
    ]}</div>
    <div>${[
      "frequency_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "frequency_penalty" })
    ]}</div>
    <div>${[
      "presence_penalty",
      Inputs.range([0, 1], { step: 0.1, value: 0, label: "presence_penalty" })
    ]}</div>
  `,
    localStorageView("NOTEBOOK_WRITER", {
      defaultValue: {
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      json: true
    })
  )
)}

function _system_prompt(){return(
`
I am programming an observablehq notebook. You are an inline tool. Our notebook is empty

If the question requires clarification, generate a markdown cell to express your questions.

When a cell is updated I may respond with relevant outputs. 

EXAMPLES
========

upsert_cell({
  comment: "import <LIBRARY> with dynamic ES6 module import",
  cell_name: <CELL_NAME>,
  code: import(<URL>)
})

upsert_cell({
  comment: "Create SVG, must be wrapped in hypertext-literal",
  cell_name: "svg",
  code: "htl.html\`<svg>\`"
})

upsert_cell({
  comment: "Setup range slider using inbuilt Inputs library"
  cell_name: "viewof range",
  code: "Inputs.range([0, 10], {label: "set the range", value: 0})"
})
`
)}

function _feedback_cells($0,feedback_cells_selector){return(
[
  ...$0.querySelectorAll("input[type=checkbox]")
].some((e) => e.checked)
  ? feedback_cells_selector
  : []
)}

function _20(md){return(
md`## Roboco-op Implementation below`
)}

function _ndd(_ndd){return(
_ndd
)}

function _formatted_instruction(response)
{
  if (response.action == "upsert_cell") {
    let code = undefined;
    const prompt = {
      prompt: response.prompt,
      time: response.time,
      comment: response.comment
    };
    if (response.code.trim().startsWith("{")) {
      code = `{ (${JSON.stringify(prompt)})\n${response.code.trim().slice(1)}`;
    } else {
      code = `(${JSON.stringify(prompt)}) && ${response.code}`;
    }
    return `${response.cell_name} = ${code}`;
  }
  return response.content;
}


function _response(on_prompt){return(
on_prompt
)}

function _on_prompt($0,$1,feedback_prompt,prompt)
{
  return $0.send([
    ...$1.value,
    {
      role: "user",
      content: feedback_prompt + prompt
    }
  ]);
}


function _context(){return(
undefined
)}

function _update_context(cells,_,$0)
{
  const context = cells
    .filter((c) => c.prompt)
    .sort((a, b) => a.time - b.time)
    .flatMap((c) => [
      {
        role: "user",
        content: c.prompt
      },
      {
        role: "assistant",
        content: null,
        function_call: {
          name: "upsert_cell",
          arguments: JSON.stringify({
            cell_name: c.cell_name,
            code: c.code,
            comment: c.comment
          })
        }
      }
    ]);
  if (!_.isEqual($0.value, context)) {
    $0.value = context;
  }
}


function _find_prompt(acorn){return(
{
  prompt:
    'write a cell called find_prompt. Using acorn JS parser, search some JS code for the existence of an Object literal containing fields: "prompt", "time", "comment" and return that object.',
  time: 1699380798090,
  comment:
    "This function search for the existence of an object literal containing fields: 'prompt', 'time', 'comment' in an input JavaScript code using the acorn JS parser. It returns the found object."
} &&
  function findPrompt(code) {
    let ast;
    let fixed_code;
    try {
      fixed_code = "() => " + code;
      ast = acorn.parse(fixed_code, { ecmaVersion: 2020 });
    } catch (e) {}
    try {
      fixed_code = "() => (" + code + ")";
      ast = ast || acorn.parse(fixed_code, { ecmaVersion: 2020 });
    } catch (e) {}

    function search(node) {
      if (node.type === "ObjectExpression") {
        const keys = node.properties.map((p) => p.key?.name || p.key?.value);
        if (
          keys.includes("prompt") &&
          keys.includes("time") &&
          keys.includes("comment")
        ) {
          const trimmed =
            fixed_code.slice(0, node.start) +
            "{}" +
            fixed_code.slice(node.end + 1);
          return [
            Object.fromEntries(
              node.properties.map((p) => [
                p.key.name || p.key?.value,
                p.value.value
              ])
            ),
            trimmed.startsWith("() => (")
              ? trimmed
                  .substring(7, trimmed.length - 1)
                  .replace("{}&&", "")
                  .trim()
              : trimmed
          ];
        }
      }
      for (const key in node) {
        if (node[key] && typeof node[key] === "object") {
          const found = search(node[key]);
          if (found) return found;
        }
      }
    }

    return search(ast) || [undefined, code];
  }
)}

function _cells(code,find_prompt){return(
Object.entries(code).reduce((acc, [name, code]) => {
  if (code === "{return e.input(t)}") return acc; // The data part of a viewof, not authored
  if (name == "hookes_law_diagram") {
    debugger;
  }
  let [prompt, fixed] = find_prompt(code);
  acc.push({
    ...prompt,
    cell_name: name,
    code: fixed
  });
  return acc;
}, [])
)}

function _observableDefinitionToCode(acorn){return(
(source) => {
  try {
    const defn = "(" + source + ")";
    const ast = acorn.parse(defn);
    const functionExpression = ast.body[0].expression;
    if (functionExpression.type !== "FunctionExpression")
      throw functionExpression;
    const block = defn.slice(
      functionExpression.body.start,
      functionExpression.body.end
    );

    const exprMatch = /{return\(\n([\s\S]*)\n\)}$/.exec(block);
    if (exprMatch) return exprMatch[1].trim();
    else return block;
  } catch (e) {
    return undefined;
  }
}
)}

function _code(events,variables,observableDefinitionToCode){return(
events &&
  Object.fromEntries(
    Object.entries(variables).map(([name, v]) => [
      name,
      observableDefinitionToCode(v._definition.toString())
    ])
  )
)}

function _variables(_mainVariables,excludes){return(
Object.fromEntries(
  _mainVariables
    .filter((v) => !excludes.includes(v._name))
    .map((v) => [v._name, v])
)
)}

function _events(_events){return(
_events
)}

function _excludes(){return(
[
  "viewof settings",
  "viewof feedback_cells_selector",
  "feedback_cells_selector",
  "feedback_cells",
  "feedback_prompt",
  "find_prompt",
  "viewof feedback_cells",
  "null",
  "viewof reset",
  "reset",
  "viewof prompt",
  "prompt",
  "suggestion",
  "initial last_salient_summary",
  "mutable last_salient_summary",
  "initial context",
  "mutable context",
  "observableDefinitionToCode",
  "viewof model",
  "model",
  "viewof OPENAI_API_KEY",
  "OPENAI_API_KEY",
  "settings",
  "system_prompt",
  "functions",
  "viewof history",
  "history",
  "viewof ask",
  "ask",
  "openAiResponse",
  "instruction",
  "acorn",
  "inspect",
  "dirty_json",
  "parseJSON",
  "update_context",
  "viewof suggestion",
  "formatted_instruction",
  "response",
  "on_prompt",
  "viewof context_viz",
  "context_viz",
  "context",
  "code",
  "cells",
  "events",
  "viz",
  "vizUpdater",
  "ndd",
  "_ndd",
  "excludes",
  "_events",
  "variables",
  "_mainVariables",
  "on_salient_event"
]
)}

function _functions(){return(
[
  {
    name: "upsert_cell",
    description: "Upsert a cell in notebook",
    parameters: {
      type: "object",
      properties: {
        cell_name: {
          type: "string",
          description: "Name of cell to add"
        },
        code: {
          type: "string",
          description: "Single expression or code block"
        },
        comment: {
          type: "string",
          description: "Explaination for code"
        }
      },
      required: ["cell_name", "code", "comment"]
    }
  },
  {
    name: "wait",
    description: "Wait for next user instruction",
    parameters: { type: "object", properties: {} }
  }
]
)}

function _history(Inputs){return(
Inputs.input([])
)}

function _ask(flowQueue){return(
flowQueue({ timeout_ms: 90000 })
)}

function _38(ask){return(
ask
)}

async function _openAiResponse(OPENAI_API_KEY,functions,system_prompt,ask,$0)
{
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      functions: functions,
      function_call: { name: "upsert_cell" },
      messages: [
        {
          role: "system",
          content: system_prompt
        },
        ...ask
      ],
      ...$0.value
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);

  return response.json();
}


function _40(parseJSON,openAiResponse){return(
parseJSON(openAiResponse.choices[0].message.function_call.arguments)
)}

function _instruction(openAiResponse,parseJSON,ask)
{
  const message = openAiResponse.choices[0].message;
  if (message.function_call === undefined)
    return {
      action: "reply",
      content: message.content
    };
  return {
    ...parseJSON(message.function_call.arguments),
    prompt: ask[ask.length - 1].content,
    action: message.function_call.name,
    time: Date.now()
  };
}


function _42($0,instruction){return(
$0.resolve(instruction)
)}

function _parseJSON(dirty_json){return(
(str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    try {
      return eval("(" + str + ")");
    } catch (e) {
      return dirty_json.parse(str);
    }
  }
}
)}

function _acorn(require){return(
require("acorn")
)}

function _dirty_json(){return(
import("https://cdn.skypack.dev/dirty-json@0.9.2?min")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("example_markdown")).define("example_markdown", ["md"], _example_markdown);
  main.variable(observer("game_plan")).define("game_plan", ["md"], _game_plan);
  main.variable(observer("import_tarot_deck")).define("import_tarot_deck", ["d3"], _import_tarot_deck);
  main.variable(observer("celtic_cross_reading_positions")).define("celtic_cross_reading_positions", ["md"], _celtic_cross_reading_positions);
  main.variable(observer("celtic_cross_reading")).define("celtic_cross_reading", ["TarotDeck","prompt"], _celtic_cross_reading);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof prompt")).define("viewof prompt", ["Inputs"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","suggestion"], _8);
  main.variable(observer("viewof suggestion")).define("viewof suggestion", ["Inputs","formatted_instruction"], _suggestion);
  main.variable(observer("suggestion")).define("suggestion", ["Generators", "viewof suggestion"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof context_viz")).define("viewof context_viz", ["Inputs","context","html","inspect"], _context_viz);
  main.variable(observer("context_viz")).define("context_viz", ["Generators", "viewof context_viz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof feedback_cells_selector")).define("viewof feedback_cells_selector", ["Inputs","variables","inspect"], _feedback_cells_selector);
  main.variable(observer("feedback_cells_selector")).define("feedback_cells_selector", ["Generators", "viewof feedback_cells_selector"], (G, _) => G.input(_));
  main.variable(observer("feedback_prompt")).define("feedback_prompt", ["feedback_cells"], _feedback_prompt);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs","view","localStorageView"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer("feedback_cells")).define("feedback_cells", ["viewof feedback_cells_selector","feedback_cells_selector"], _feedback_cells);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("ndd")).define("ndd", ["_ndd"], _ndd);
  main.variable(observer("formatted_instruction")).define("formatted_instruction", ["response"], _formatted_instruction);
  main.variable(observer("response")).define("response", ["on_prompt"], _response);
  main.variable(observer("on_prompt")).define("on_prompt", ["viewof ask","mutable context","feedback_prompt","prompt"], _on_prompt);
  main.define("initial context", _context);
  main.variable(observer("mutable context")).define("mutable context", ["Mutable", "initial context"], (M, _) => new M(_));
  main.variable(observer("context")).define("context", ["mutable context"], _ => _.generator);
  main.variable(observer("update_context")).define("update_context", ["cells","_","mutable context"], _update_context);
  main.variable(observer("find_prompt")).define("find_prompt", ["acorn"], _find_prompt);
  main.variable(observer("cells")).define("cells", ["code","find_prompt"], _cells);
  main.variable(observer("observableDefinitionToCode")).define("observableDefinitionToCode", ["acorn"], _observableDefinitionToCode);
  main.variable(observer("code")).define("code", ["events","variables","observableDefinitionToCode"], _code);
  main.variable(observer("variables")).define("variables", ["_mainVariables","excludes"], _variables);
  main.variable(observer("events")).define("events", ["_events"], _events);
  main.variable(observer("excludes")).define("excludes", _excludes);
  const child1 = runtime.module(define1).derive(["excludes"], main);
  main.import("_ndd", child1);
  main.import("events", "_events", child1);
  main.import("mainVariables", "_mainVariables", child1);
  main.variable(observer("functions")).define("functions", _functions);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer("viewof ask")).define("viewof ask", ["flowQueue"], _ask);
  main.variable(observer("ask")).define("ask", ["Generators", "viewof ask"], (G, _) => G.input(_));
  main.variable(observer()).define(["ask"], _38);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["OPENAI_API_KEY","functions","system_prompt","ask","viewof settings"], _openAiResponse);
  main.variable(observer()).define(["parseJSON","openAiResponse"], _40);
  main.variable(observer("instruction")).define("instruction", ["openAiResponse","parseJSON","ask"], _instruction);
  main.variable(observer()).define(["viewof ask","instruction"], _42);
  main.variable(observer("parseJSON")).define("parseJSON", ["dirty_json"], _parseJSON);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  main.variable(observer("acorn")).define("acorn", ["require"], _acorn);
  const child4 = runtime.module(define4);
  main.import("inspect", child4);
  const child5 = runtime.module(define5);
  main.import("view", child5);
  main.import("cautious", child5);
  main.variable(observer("dirty_json")).define("dirty_json", _dirty_json);
  return main;
}
