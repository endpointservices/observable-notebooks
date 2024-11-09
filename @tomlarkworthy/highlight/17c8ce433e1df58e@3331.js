import define1 from "./0b75dbddd18995dc@1386.js";
import define2 from "./e3a019069a130d79@5568.js";
import define3 from "./5845e1ca935fea5a@225.js";
import define4 from "./048a17a165be198d@264.js";
import define5 from "./0e0b35a92c819d94@470.js";
import define6 from "./1f41fef8b019cf4e@94.js";
import define7 from "./f92778131fd76559@1202.js";
import define8 from "./04318fffe4df9d1e@2461.js";
import define9 from "./9ed286bafcced0c3@2944.js";

function _1(md){return(
md`# Roboco-op: a computational blackboard for efficient human/AI collaboration

Robocoop is a different approach to building an AI coding assistant. In Robocoop, the LLM context is paired with code so it can be hand edited, imported, deleted and forked at any point during development. Its like Chat + Computational Notebook + RAG all wrapped into one.


Roboco-op blends [Observablehq.com](https://observablehq.com/)'s reactive notebooks with an **open source** userspace AI coding assistant. Observable notebooks are a unique coding environment because the code development and runtime state are mixed together. This means Robocoop can write code, a human can edit, and the LLM read the output of program fragments all within a single fluid environment.
`
)}

function _2(md){return(
md`### [Forkable Quickstart Notebook](https://observablehq.com/@tomlarkworthy/robocoop-blank-slate)

A *"blank slate"* notebook is available [here](https://observablehq.com/@tomlarkworthy/robocoop-blank-slate) which you should fork from for new projects. There are a selection of pre-packaged skill [here](https://observablehq.com/@tomlarkworthy/robocoop-skills) which can be copied and pasted into notebooks to provide specific expertise.`
)}

function _3(md){return(
md`### Automatic Source <--> LLM Context

In Roboco-op, a notebook cell is: code, execution, a prompt and an AI context **in a single atomic unit**. The chat context is a summation over all the cell's source code. You can edit _anything_ at _any_ time, in _any_ order **without losing state**. **The notebook _is_ the LLM state**. The AI will build upon whatever curated knowledge base that has been laid out via in-context learning.
`
)}

function _4(html,md){return(
md`### Copy and Paste Domain expertise with Skills
${html`<iframe width="640" height="480" src="https://www.youtube.com/embed/8cNRZUZSSS8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}

With Roboco-op notebook cells can become copy and pasteable [skills](https://observablehq.com/@tomlarkworthy/robocoop-skills) that can be assembled and adjusted into a situational expert. You can move the cells across notebook, correct them manually, and the LLM will jam from whatever is there for its next completion.

`
)}

function _5(html,md){return(
md`### \`highlight(<expr>)\` to bring runtime values into LLM context

${html`<iframe width="640" height="480" src="https://www.youtube.com/embed/RAEYuWhWtY4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}


Roboco-op automatically synchronises notebook source code, but you can also programatically bring runtime **values** into the LLM context too, just by calling the function \`highlight\`. This is useful for making AI informed decisions based on program state, for example, summerizing information pulled from a network call, or for informing code changes based on test suite feedback.

Test-driven-development using \`highlight\` is such a powerful technique for producing production quality code that we have a template to fork directly from [here](https://observablehq.com/@tomlarkworthy/ai-tdd-template)`
)}

function _6(highlight){return(
highlight(Math.random())
)}

function _7(md){return(
md`### RAG for getting started

The [RAG extension](https://observablehq.com/@tomlarkworthy/rag-extension) adds relevant examples to the context based on the question, which helps with getting started on a fresh notebook.
`
)}

function _8(md){return(
md`### More


Browse the main Roboco-op notebook ecosystem [here](https://observablehq.com/@tomlarkworthy/robocoop?collection=@tomlarkworthy/robocoop), or ask questions in <a href="https://www.reddit.com/r/robocoop/comments/17rlxaq/welcome_lets_figure_things_out_together/">r/robocoop</a>`
)}

function _9(md){return(
md`
Changes
- 2024-10-23 Better decompiler for understanding notebook runtime.
- 2024-10-15 Added highlight and a bunch of bug fixes
- 2024-05-11 Context is truncated according to max_prompt_tokens, oldest is removed first

TODO:
- FEATURE: Unified prompting UI
  - dynamic GPT model selection per prompt
  - regenerate response 
- BUG(minor): Renaming variable does not update feedback variables
- Investigate Summarization (https://github.com/jimmc414/1filellm)`
)}

function _10(md){return(
md`## Random Cell Made by Roboco-op`
)}

function _pong_game(width)
{
  ({
    prompt: "Create an automated retro looking game of pong",
    time: 1699389743848,
    comment: "Creating an automated retro-looking game of Pong"
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = 200;
  const context = canvas.getContext("2d");

  const ball = { x: width / 2, y: 20, dx: 3, dy: 2, radius: 15 };
  const paddle = { x: 5, y: canvas.height / 2, width: 20, height: 60 };

  const drawBall = () => {
    context.beginPath();
    context.rect(
      ball.x,
      ball.y - ball.radius,
      ball.radius * 2,
      ball.radius * 2
    );
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
  };

  const drawPaddle = () => {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.closePath();
  };

  const update = () => {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (
      ball.x + ball.dx > canvas.width - ball.radius ||
      ball.x + ball.dx < ball.radius + 10
    ) {
      ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
      } else {
        ball.dy = -ball.dy;
      }
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
    paddle.y = ball.y - 30;
  };

  const interval = setInterval(update, 10);

  return canvas;
}


function _12(md){return(
md`## Prompt Interface
`
)}

function _prompt(whisperInput,OPENAI_API_KEY,view,cautious,Inputs,invalidation)
{
  const whisper = whisperInput({
    API_KEY: OPENAI_API_KEY
  });
  const ui = view`<div>
      ${cautious(() => whisper)}
      ${[
        "...",
        Inputs.textarea({
          placeholder: "ask for a cell",
          rows: 10,
          minlength: 1,
          submit: true
        })
      ]}
    </div>`;
  // bindOneWay(ui, whisper);
  invalidation.then(
    whisper.addEventListener("input", () => {
      ui.value = whisper.value;
    })
  );

  return ui;
}


function _14(Inputs,cellsToClipboard,suggestion){return(
Inputs.button("copy code", {
  reduce: () => cellsToClipboard([suggestion])
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

function _16(md){return(
md`## Current Chat context`
)}

function _context_viz(Inputs,extension_context_previous,context,html,inspect){return(
Inputs.table(
  [...extension_context_previous, ...context].map((r) => ({
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
    layout: "auto"
  }
)
)}

function _18(md){return(
md`### AI Settings`
)}

function _models(){return(
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
  "gpt-4-0613",
  "gpt-4-turbo",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-turbo-preview",
  "gpt-4-vision-preview",
  "gpt-4o",
  "gpt-4o-mini",
  "o1-mini",
  "o1-preview"
]
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

function _ANTHROPIC_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "ANTHROPIC_API_KEY",
    placeholder: "paste ANTHROPIC_API_KEY key here"
  }),
  localStorageView("ANTHROPIC_API_KEY")
)
)}

function _api_endpoint(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "Completion API endpoint"
  }),
  localStorageView("OPENAI_API_ENDPOINT", {
    defaultValue: "https://api.openai.com/v1/chat/completions"
  })
)
)}

function _settings(Inputs,view,models,localStorageView){return(
{
  prompt:
    '\nThe notebook contains:\n  - cell "form" is Object {a: "", b: ""}\nUsing the already imported view literal for configuring a ChatGPT session. Example response \n\n{\n  model: "gpt-3.5-turbo"\n  temperature: 0.7\n  max_tokens: 1000\n  top_p: 1\n  frequency_penalty: 0\n  presence_penalty: 0\n}\n\nUse Inputs.select for model, Inputs.range for max_tokens etc.',
  time: 1699384189902,
  comment:
    "Creating a form to configure a ChatGPT session. The form includes a select input for model, and range inputs for temperature, max_tokens, top_p, frequency_penalty, and presence_penalty."
} &&
  Inputs.bind(
    view`
    <div>${["model", Inputs.select(models.sort(), { label: "model" })]}</div>
    <div>${[
      "temperature",
      Inputs.range([0, 1], { step: 0.1, value: 0.7, label: "temperature" })
    ]}</div>
    <div>${[
      "max_prompt_tokens",
      Inputs.range([1, 12000], {
        value: 4000,
        label: "max_tokens sent (oldest are truncated)"
      })
    ]}</div>
    <div>${[
      "max_tokens",
      Inputs.range([1, 32000], {
        value: 1000,
        label: "max_tokens for response"
      })
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
    localStorageView("NOTEBOOK_WRITER_2", {
      defaultValue: {
        model: "gpt-4-turbo",
        temperature: 0.7,
        max_prompt_tokens: 4000,
        max_tokens: 2000,
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
You are a notebook programming assisten for Observablehq notebook. You may respond only by inserting cells.

If the question requires clarification, you can generate a markdown cell to express your questions in prose.


EXAMPLES
========

user:
import <LIBRARY>

assistant:
upsert_cell({
  cell_name: "<LIBRARY>",
  code: "import("https://esm.sh/<LIBRARY>@2.5.0")"
})

user:
create an SVG element

assistant:
upsert_cell({
  cell_name: "svg",
  code: "htl.html\`<svg>\`"
})

user:
create an UI for temperate variable from -10 to 10

assistant:
upsert_cell({
  cell_name: "viewof temperature",
  code: "Inputs.range([-10, 10], {label: "set the temperature"})"
})

user:
create a 1 second counter

assistant:
upsert_cell({
  cell_name: "counter",
  code: "{\n  \n\n  let count = 0;\n  const interval = setInter…lidated\n  return () => clearInterval(interval);\n}"
})
`
)}

function _25(md){return(
md`## Roboco-op Implementation below`
)}

function _background_tasks(find_context_extensions,on_prompt,update_context,api_call_response,interceptVariables)
{
  find_context_extensions;
  on_prompt;
  update_context;
  api_call_response;
  interceptVariables;
}


function _user_variable_filters(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.input({}),
  localStorageView(
    `${new URL(document.baseURI).pathname}|user_variable_filters`,
    {
      defaultValue: {},
      json: true
    }
  )
)
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

async function _on_prompt(extension_context,prompt,$0,Event,$1,$2)
{
  const extension_context_now = await extension_context({
    question: prompt
  });
  $0.value = extension_context_now;
  $0.dispatchEvent(new Event("input"));
  const payload = [
    ...extension_context_now,
    ...$1.value,
    {
      role: "user",
      content: prompt
    }
  ];
  console.log("on_prompt", payload);
  return $2.send(payload);
}


function _32(md){return(
md`## Extensions`
)}

function _context_extensions(Inputs){return(
Inputs.input(new Set())
)}

function _find_context_extensions($0,cells)
{
  $0.value = new Set(
    cells
      .filter((cell) => cell.variable?._value?.robocoop?.onContext)
      .map((cell) => cell.variable?._value?.robocoop?.onContext)
  );
}


function _35(md){return(
md`### Reactive Context Construction`
)}

function _update_context(unprompted_context,prompted_context,highlight_context,_,$0)
{
  const context = [
    ...unprompted_context,
    ...prompted_context,
    ...highlight_context
  ];
  if (!_.isEqual($0.value, context)) {
    $0.value = context;
  }
}


function _context(){return(
undefined
)}

function _extension_context_previous(Inputs){return(
Inputs.input([])
)}

function _unprompted_context(cells){return(
cells
  .filter((c) => !c.prompt)
  .filter((c) => c.code && c.code !== "$0")
  .sort((a, b) => a.time - b.time)
  .flatMap((c) => [
    {
      role: "assistant",
      function_call: {
        name: "upsert_cell",
        arguments: JSON.stringify({
          cell_name: c.cell_name,
          code: c.code
        })
      }
    }
  ])
)}

function _prompted_context(cells){return(
cells
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
  ])
)}

function _extension_context($0){return(
async ({ question }) => {
  const context = [];
  await Promise.all(
    [...$0.value].map((fn) => fn({ question, context }))
  );
  return context;
}
)}

function _highlight_context(cells){return(
Object.entries(cells)
  .flatMap(([k, cell]) =>
    cell.variable._value && cell.variable._value.robocoop
      ? [
          {
            cell: cell,
            robocoop: cell.variable._value.robocoop
          }
        ]
      : []
  )
  .map(({ cell, robocoop }) => ({
    role: "user",
    content: `
The cell \`${cell.cell_name}\` defined as
~~~json
${cell.code}
~~~
evaluated to
~~~${robocoop.type}
${robocoop.value}
~~~
`
  }))
)}

function _43(md){return(
md`### Cell Analysis`
)}

function _findPrompt(parser){return(
(code) => {
  ({
    prompt:
      'write a cell called findPrompt. Using acorn JS parser, search some JS code for the existence of an Object literal containing fields: "prompt", "time", "comment" and return that object.',
    time: 1699380798090,
    comment:
      "This function search for the existence of an object literal containing fields: 'prompt', 'time', 'comment' in an input JavaScript code using the acorn JS parser. It returns the found object."
  });
  const ast = parser.parseCell(code);

  function search(node, parent) {
    if (node?.type === "ObjectExpression") {
      const keys = node.properties.map((p) => p?.key?.name || p?.key?.value);
      if (keys.includes("prompt") && keys.includes("time")) {
        return Object.fromEntries(
          node.properties
            .map((p) => p.key && [p.key.name || p.key.value, p.value.value])
            .filter((p) => !!p)
        );
      }
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === "object") {
        const found = search(node[key], node);
        if (found) return found;
      }
    }
  }

  return search(ast, null);
}
)}

function _cells(code,findPrompt){return(
Object.entries(code).reduce((acc, [name, code]) => {
  if (name === "@variable") return acc; // can't handle unobserved variables
  let prompt;
  try {
    prompt = findPrompt(code.code);
  } catch (err) {
    console.log(err);
    return [];
  }
  acc.push({
    ...prompt,
    cell_name: name,
    code: code.code,
    variable: code.variables[0]
  });
  return acc;
}, [])
)}

async function _code(events,cellMap,main,decompile){return(
events &&
  Object.fromEntries(
    await Promise.all(
      [...(await cellMap(main, { excludeInbuilt: true })).entries()]
        .filter(
          ([name, variables]) =>
            variables[0] !== undefined &&
            !(typeof name == "string" && name.startsWith("@variable "))
        )
        .map(async ([name, variables]) => {
          try {
            return [
              name,
              {
                code: await decompile(variables),
                variables
              }
            ];
          } catch (e) {
            debugger;
            throw e;
          }
        })
    )
  )
)}

function _variables(_mainVariables,excludes){return(
Object.fromEntries(
  _mainVariables
    .filter((v) => !excludes.includes(v._name) && v._type == 1)
    .map((v) => [v._name || v._observer.id, v])
)
)}

function _set_excludes($0,mandatory_excludes)
{
  $0.value = [
    "mutable find_context_extensions",
    "find_context_extensions",
    "cautious",
    "flowQueue",
    "localStorageView",
    "viewof user_variable_filters",
    "user_variable_filters",
    "view",
    "api_call_response",
    "viewof settings",
    "api_endpoint",
    "viewof api_endpoint",
    "workers",
    "viewof feedback_cells_selector",
    "feedback_cells_selector",
    "feedback_cells",
    "feedback_prompt",
    "findPrompt",
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
    "viewof ANTHROPIC_API_KEY",
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
    "inspect",
    "dirty_json",
    "parseJSON",
    "viewof suggestion",
    "formatted_instruction",
    "response",
    "on_prompt",
    "viewof context_viz",
    "context_viz",
    "excludes",
    ...mandatory_excludes
  ];
}


function _mandatory_excludes(){return(
[
  "events",
  "variables",
  "_mainVariables",
  "context",
  "_events",
  "ndd",
  "_ndd",
  "source",
  "highlight_context",
  "background_tasks",
  "_background_tasks",
  "prompted_context",
  "update_context",
  "unprompted_context",
  "code",
  "cells"
]
)}

function _events(_events){return(
_events
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
        }
      },
      required: ["cell_name", "code", "comment"]
    }
  }
]
)}

function _history(Inputs){return(
Inputs.input([])
)}

function _ask(flowQueue){return(
flowQueue({ timeout_ms: 180000 })
)}

function _54(ask){return(
console.log("Ask", ask)
)}

function _prompt_messages($0,system_prompt,ask){return(
[
  {
    role: $0.value.model.startsWith("o1") ? "user" : "system",
    content: system_prompt
  },
  ...ask
]
)}

function _token_analytics(prompt_messages){return(
{
  prompt: prompt_messages,
  prompt_tokens: prompt_messages.map(
    (p) => (p.content || JSON.stringify(p.function_call)).length * 5
  )
}
)}

function _trimmed_prompt(d3,token_analytics,settings)
{
  while (d3.sum(token_analytics.prompt_tokens) > settings.max_prompt_tokens) {
    token_analytics.prompt.splice(1, 1);
    token_analytics.prompt_tokens.splice(1, 1);
  }
  console.log("trimmed_prompt", token_analytics);
  return token_analytics;
}


function _modelConfig($0,ANTHROPIC_API_KEY,OPENAI_API_KEY,functions){return(
(model) => {
  if (model.startsWith("claude"))
    return {
      model: model,
      type: "chat",
      api: "https://api.anthropic.com/v1/messages",
      roles: ["user", "assistant"],
      settings: {
        temperature: 0.7,
        max_tokens: $0.value.max_prompt_tokens,
        top_p: 1
      },
      headers: () => ({
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      })
    };
  else if (model.startsWith("dall-e")) {
    return {
      model: model,
      type: "image",
      api: "https://api.openai.com/v1/images/generations",
      settings: {
        n: 1,
        size: "1024x1024",
        quality: "standard"
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  } else if (model.startsWith("o1")) {
    return {
      type: "image",
      api: "https://api.openai.com/v1/images/generations",
      roles: ["user", "assistant"],
      settings: {
        model: model,
        temperature: 1,
        max_completion_tokens: $0.value.max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
        // response_format: { type: "json_object" }
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  } else {
    return {
      api: "https://api.openai.com/v1/chat/completions",
      type: "chat",
      roles: ["user", "system", "assistant"],
      settings: {
        functions: functions,
        function_call: { name: "upsert_cell" },
        model: model,
        temperature: $0.value.temperature,
        max_tokens: $0.value.max_prompt_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      headers: () => ({
        Authorization: `Bearer ${OPENAI_API_KEY}`
      })
    };
  }
}
)}

async function _openAiResponse(trimmed_prompt,modelConfig,$0,OPENAI_API_KEY,api_endpoint)
{
  const body = {
    //functions: functions,
    // function_call: { name: "upsert_cell" },
    messages: trimmed_prompt.prompt,
    ...modelConfig($0.value.model).settings
  };
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  };
  console.log("Sending", body);
  const response = await fetch(api_endpoint, payload);

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);
  const responseJson = response.json();
  console.log("Received", await responseJson);
  return responseJson;
}


function _instruction(openAiResponse,$0,processO1,ask,parseJSON)
{
  const message = openAiResponse.choices[0].message;
  if (message.function_call === undefined) {
    if ($0.value.model.startsWith("o1")) {
      try {
        return {
          ...processO1(message.content),
          prompt: ask[ask.length - 1].content,
          action: "upsert_cell",
          time: Date.now()
        };
      } catch (e) {
        return {
          action: "reply",
          content: JSON.stringify(message)
        };
      }
    } else {
      return {
        action: "reply",
        content: message
      };
    }
  }

  return {
    ...parseJSON(message.function_call.arguments),
    prompt: ask[ask.length - 1].content,
    action: message.function_call.name,
    time: Date.now()
  };
}


function _content(processO1,openAiResponse){return(
processO1(openAiResponse.choices[0].message.content)
)}

function _processO1(parseJSON){return(
function processO1(content) {
  if (content.startsWith("```json"))
    return parseJSON(content.substring(7, content.length - 4));
  if (content.startsWith("```javascript")) {
    const substring = content.substring(13, content.length - 4);
    try {
      return parseJSON(substring);
    } catch (e) {
      console.log(substring, e);
      throw e;
    }
  }
  return content;
}
)}

function _parseJSON(dirty_json){return(
(str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    try {
      let upsert_result = undefined;
      const upsert_cell = (args) => (upsert_result = args);
      const eval_result = eval("(" + str + ")");
      return upsert_result || eval_result;
    } catch (e) {
      return dirty_json.parse(str);
    }
  }
}
)}

function _api_call_response($0,instruction){return(
$0.resolve(instruction) && instruction
)}

function _dirty_json(){return(
import("https://cdn.skypack.dev/dirty-json@0.9.2?min")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["html","md"], _4);
  main.variable(observer()).define(["html","md"], _5);
  main.variable(observer()).define(["highlight"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("pong_game")).define("pong_game", ["width"], _pong_game);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof prompt")).define("viewof prompt", ["whisperInput","OPENAI_API_KEY","view","cautious","Inputs","invalidation"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","cellsToClipboard","suggestion"], _14);
  main.variable(observer("viewof suggestion")).define("viewof suggestion", ["Inputs","formatted_instruction"], _suggestion);
  main.variable(observer("suggestion")).define("suggestion", ["Generators", "viewof suggestion"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof context_viz")).define("viewof context_viz", ["Inputs","extension_context_previous","context","html","inspect"], _context_viz);
  main.variable(observer("context_viz")).define("context_viz", ["Generators", "viewof context_viz"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("models")).define("models", _models);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof ANTHROPIC_API_KEY")).define("viewof ANTHROPIC_API_KEY", ["Inputs","localStorageView"], _ANTHROPIC_API_KEY);
  main.variable(observer("ANTHROPIC_API_KEY")).define("ANTHROPIC_API_KEY", ["Generators", "viewof ANTHROPIC_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof api_endpoint")).define("viewof api_endpoint", ["Inputs","localStorageView"], _api_endpoint);
  main.variable(observer("api_endpoint")).define("api_endpoint", ["Generators", "viewof api_endpoint"], (G, _) => G.input(_));
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs","view","models","localStorageView"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("background_tasks")).define("background_tasks", ["find_context_extensions","on_prompt","update_context","api_call_response","interceptVariables"], _background_tasks);
  main.variable(observer("viewof user_variable_filters")).define("viewof user_variable_filters", ["Inputs","localStorageView"], _user_variable_filters);
  main.variable(observer("user_variable_filters")).define("user_variable_filters", ["Generators", "viewof user_variable_filters"], (G, _) => G.input(_));
  main.variable(observer("ndd")).define("ndd", ["_ndd"], _ndd);
  main.variable(observer("formatted_instruction")).define("formatted_instruction", ["response"], _formatted_instruction);
  main.variable(observer("response")).define("response", ["on_prompt"], _response);
  main.variable(observer("on_prompt")).define("on_prompt", ["extension_context","prompt","viewof extension_context_previous","Event","mutable context","viewof ask"], _on_prompt);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof context_extensions")).define("viewof context_extensions", ["Inputs"], _context_extensions);
  main.variable(observer("context_extensions")).define("context_extensions", ["Generators", "viewof context_extensions"], (G, _) => G.input(_));
  main.variable(observer("find_context_extensions")).define("find_context_extensions", ["viewof context_extensions","cells"], _find_context_extensions);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("update_context")).define("update_context", ["unprompted_context","prompted_context","highlight_context","_","mutable context"], _update_context);
  main.define("initial context", _context);
  main.variable(observer("mutable context")).define("mutable context", ["Mutable", "initial context"], (M, _) => new M(_));
  main.variable(observer("context")).define("context", ["mutable context"], _ => _.generator);
  main.variable(observer("viewof extension_context_previous")).define("viewof extension_context_previous", ["Inputs"], _extension_context_previous);
  main.variable(observer("extension_context_previous")).define("extension_context_previous", ["Generators", "viewof extension_context_previous"], (G, _) => G.input(_));
  main.variable(observer("unprompted_context")).define("unprompted_context", ["cells"], _unprompted_context);
  main.variable(observer("prompted_context")).define("prompted_context", ["cells"], _prompted_context);
  main.variable(observer("extension_context")).define("extension_context", ["viewof context_extensions"], _extension_context);
  main.variable(observer("highlight_context")).define("highlight_context", ["cells"], _highlight_context);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("findPrompt")).define("findPrompt", ["parser"], _findPrompt);
  main.variable(observer("cells")).define("cells", ["code","findPrompt"], _cells);
  main.variable(observer("code")).define("code", ["events","cellMap","main","decompile"], _code);
  main.variable(observer("variables")).define("variables", ["_mainVariables","excludes"], _variables);
  main.variable(observer("set_excludes")).define("set_excludes", ["mutable excludes","mandatory_excludes"], _set_excludes);
  main.variable(observer("mandatory_excludes")).define("mandatory_excludes", _mandatory_excludes);
  main.variable(observer("events")).define("events", ["_events"], _events);
  main.variable(observer("functions")).define("functions", _functions);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer("viewof ask")).define("viewof ask", ["flowQueue"], _ask);
  main.variable(observer("ask")).define("ask", ["Generators", "viewof ask"], (G, _) => G.input(_));
  main.variable(observer()).define(["ask"], _54);
  main.variable(observer("prompt_messages")).define("prompt_messages", ["viewof settings","system_prompt","ask"], _prompt_messages);
  main.variable(observer("token_analytics")).define("token_analytics", ["prompt_messages"], _token_analytics);
  main.variable(observer("trimmed_prompt")).define("trimmed_prompt", ["d3","token_analytics","settings"], _trimmed_prompt);
  main.variable(observer("modelConfig")).define("modelConfig", ["viewof settings","ANTHROPIC_API_KEY","OPENAI_API_KEY","functions"], _modelConfig);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["trimmed_prompt","modelConfig","viewof settings","OPENAI_API_KEY","api_endpoint"], _openAiResponse);
  main.variable(observer("instruction")).define("instruction", ["openAiResponse","viewof settings","processO1","ask","parseJSON"], _instruction);
  main.variable(observer("content")).define("content", ["processO1","openAiResponse"], _content);
  main.variable(observer("processO1")).define("processO1", ["parseJSON"], _processO1);
  main.variable(observer("parseJSON")).define("parseJSON", ["dirty_json"], _parseJSON);
  main.variable(observer("api_call_response")).define("api_call_response", ["viewof ask","instruction"], _api_call_response);
  const child1 = runtime.module(define1);
  main.import("_ndd", child1);
  main.import("viewof reset", child1);
  main.import("reset", child1);
  main.import("events", "_events", child1);
  main.import("mainVariables", "_mainVariables", child1);
  main.import("interceptVariables", child1);
  main.import("runtime", child1);
  main.import("main", child1);
  main.import("mutable excludes", child1);
  main.import("excludes", child1);
  const child2 = runtime.module(define2);
  main.import("decompile", child2);
  main.import("compile", child2);
  main.import("cellMap", child2);
  main.import("parser", child2);
  const child3 = runtime.module(define3);
  main.import("cellsToClipboard", child3);
  const child4 = runtime.module(define4);
  main.import("localStorageView", child4);
  const child5 = runtime.module(define5);
  main.import("flowQueue", child5);
  const child6 = runtime.module(define6);
  main.import("inspect", child6);
  const child7 = runtime.module(define7);
  main.import("view", child7);
  main.import("cautious", child7);
  main.import("bindOneWay", child7);
  const child8 = runtime.module(define8);
  main.import("whisperInput", child8);
  const child9 = runtime.module(define9);
  main.import("highlight", child9);
  main.variable(observer("dirty_json")).define("dirty_json", _dirty_json);
  return main;
}
