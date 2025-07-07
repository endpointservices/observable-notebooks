import define1 from "./98f34e974bb2e4bc@650.js";
import define2 from "./e3a019069a130d79@6074.js";
import define3 from "./5845e1ca935fea5a@225.js";
import define4 from "./048a17a165be198d@271.js";
import define5 from "./0e0b35a92c819d94@474.js";
import define6 from "./1f41fef8b019cf4e@94.js";
import define7 from "./f92778131fd76559@1208.js";
import define8 from "./04318fffe4df9d1e@2463.js";
import define9 from "./9ed286bafcced0c3@3013.js";
import define10 from "./db42ae70222a8b08@995.js";

function _1(md){return(
md`# Roboco-op 2.0: a computational blackboard for efficient human/AI collaboration

Robocoop is a different approach to building an AI coding assistant. In Robocoop, the LLM context is paired with code so it can be hand edited, imported, deleted and forked at any point during development. Its like Chat + Computational Notebook + RAG all wrapped into one.


Roboco-op blends [Observablehq.com](https://observablehq.com/)'s reactive notebooks with an **open source** userspace AI coding assistant. Observable notebooks are a unique coding environment because the code development and runtime state are mixed together. This means Robocoop can write code, a human can edit, and the LLM read the output of program fragments all within a single fluid environment.

TODO
- Try it out button`
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
${html`<iframe width="640" height="480" src="https://www.youtube.com/embed/wx93r1pY_6Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`}

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
md`If highlight is passed a Blob with an image mime type it will convert to a vision prompt. However, not all models support image prompting so the following cell is commented out (but works)`
)}

function _8(highlight,example_image){return(
highlight(example_image)
)}

function _9(md){return(
md`### More


Browse the main Roboco-op notebook ecosystem [here](https://observablehq.com/@tomlarkworthy/robocoop?collection=@tomlarkworthy/robocoop), or ask questions in <a href="https://www.reddit.com/r/robocoop/comments/17rlxaq/welcome_lets_figure_things_out_together/">r/robocoop</a>`
)}

function _10(md){return(
md`
Changes
- 2025-02-06 Switch to XML
- 2024-12-28 Image prompting
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

function _11(md){return(
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


function _13(md){return(
md`## Prompt Interface
`
)}

function _14(openaiCompletion){return(
openaiCompletion({ prompt: "Write a haiku about Observable notebooks." })
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


function _include_deps(Inputs){return(
Inputs.toggle({
  label: "include dependancies in context?"
})
)}

function _17(Inputs,cellsToClipboard,suggestion){return(
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

function _context_viz(Inputs,context){return(
Inputs.textarea({
  label: "context",
  rows: 20,
  width: "100%",
  disabled: true,
  value: context.map(({ role, content }) => `${role}:\n${content}\n`).join("\n")
})
)}

function _20(context){return(
context
)}

function _21(md){return(
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
  "o1",
  "o1-mini",
  "o1-preview",
  "o3",
  "o3-mini",
  "o4-mini",
  "o4-mini-high"
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
      Inputs.range([1, 200000], {
        value: 4000,
        label: "max_tokens sent (oldest are truncated)"
      })
    ]}</div>
    <div>${[
      "max_tokens",
      Inputs.range([1, 200000], {
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
        max_prompt_tokens: 10000,
        max_tokens: 10000,
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
You are a notebook programming assistent for Observablehq notebook. You respond in XML formatted observable notebook cells only.

If a question requires clarification, you can generate a markdown cell writing your question.


EXAMPLES
========

user:
import <LIBRARY>

assistant:
<cell>
<deps></deps>
<![CDATA[
import("https://esm.sh/<LIBRARY>@2.5.0")
]]>
</cell>

user:
create an SVG element

assistant:
<cell>
<deps>htl</deps>
<code><![CDATA[
htl.html\`<svg>\`
]]></code>
</cell>

user:
create an UI for temperate variable from -10 to 10

assistant:
<cell>
<deps>Inputs</deps>
<code><![CDATA[
viewof temperature = Inputs.range([-10, 10], {label: "set the temperature"})
]]></code>
</cell>

user:
create a 1 second counter

assistant:
<cell>
<deps></deps>
<code><![CDATA[
mutable counterIndirect = 0
]]></code>
</cell>
<cell>
<deps>mutable counterIndirect</deps>
<code><![CDATA[
mutable counter = {
  let i = 0;
  while (i < 100) {
    mutable counterIndirect = i;
    yield Promises.delay(500, ++i);
  }
  yield i;
}
]]></code>
</cell>

user:
Tell me a joke
assistant:
<cell>
<deps>md</deps>
<code><![CDATA[
md\`Why did the chicken cross the road?... to get to the other side\`
]]></code>
</cell>
`
)}

function _28(md){return(
md`## Roboco-op Implementation below`
)}

function _background_tasks(submit_context,submit_summary,find_context_extensions,on_prompt,api_call_response)
{
  submit_context;
  submit_summary;
  find_context_extensions;
  on_prompt;

  api_call_response;
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

function _31(response){return(
response.cells
)}

function _formatted_instruction(response)
{
  if (response.action == "upsert_cells") {
    return response.cells.map((r) => r.code).join("\n\n");
  }
  return response.content;
}


function _response(on_prompt){return(
on_prompt
)}

async function _on_prompt($0,system_prompt,$1,include_deps,prompt,$2,$3)
{
  // const extension_context_now = await extension_context({
  //   question: prompt
  // });
  // viewof extension_context_previous.value = extension_context_now;
  // viewof extension_context_previous.dispatchEvent(new Event("input"));
  const payload = [
    //...extension_context_now,
    {
      role: $0.value.model.startsWith("o1") ? "user" : "system",
      content: system_prompt
    },
    ...(await $1.send({ include_deps })),
    {
      role: "user",
      content: prompt
    }
  ];
  $2.value = payload;
  console.log("on_prompt", payload);
  return $3.send(payload);
}


function _35(md){return(
md`## Extensions

Extensions like RAG dynamically build additional context on demand`
)}

function _context_extensions(Inputs){return(
Inputs.input(new Set())
)}

function _find_context_extensions(runtime){return(
[...runtime._variables].reduce((set, v) => {
  if (v._value?.robocoop?.onContext) {
    set.add(v._value?.robocoop?.onContext);
  }
  return set;
}, new Set())
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

function _39(md){return(
md`### Context Construction`
)}

function _contextRequest(flowQueue){return(
flowQueue({ timeout_ms: 180000 })
)}

function _41(contextRequest){return(
contextRequest
)}

function _modules(contextRequest,moduleMap,runtime)
{
  contextRequest;
  return moduleMap(contextRequest.runtime || runtime);
}


function _module_cells(main,modules,cellMap){return(
Promise.all(
  [
    [
      main,
      {
        type: "main",
        name: "main",
        module: main
      }
    ],
    ...modules.entries()
  ].map(async ([m, mInfo]) => ({
    ...mInfo,
    cells: await cellMap(m)
  }))
)
)}

function _module_summary(decompile){return(
async (mInfo) => {
  return `
module: ${mInfo.name}

${(
  await Promise.all(
    [...mInfo.cells.entries()].map(
      async ([name, vars]) => `<cell>
<deps>${vars[0]._inputs.map((i) => i._name).join(", ")}</deps>
<code><![CDATA[
${await decompile(vars).catch((err) => {
  console.error("Unable to decompile", vars);
})}
]]></code>
</cell>
`
    )
  )
).join("\n")}
`;
}
)}

function _main_module_summary(module_summary,module_cells){return(
module_summary(module_cells[0])
)}

async function _all_module_summary(module_cells,module_summary){return(
(await Promise.all(module_cells.map(module_summary))).join(
  "\n"
)
)}

function _submit_context($0,contextRequest,all_module_summary,main_module_summary,highlight_context){return(
$0.resolve([
  {
    role: "user",
    content: contextRequest.include_deps
      ? all_module_summary
      : main_module_summary
  },
  ...highlight_context
])
)}

function _context(){return(
[]
)}

function _49(md){return(
md`#### Compute highlighted Runtime Context`
)}

async function _highlight_context(module_cells,decompile,modelConfig){return(
(
  await Promise.all(
    module_cells
      .flatMap((m) => [...m.cells.entries()])
      .flatMap(([name, variables]) =>
        variables.map((variable) => [name, { variable, variables }])
      )
      .reduce((array, [name, { variable, variables }]) => {
        if (variable._value && variable._value.robocoop) {
          array.push({
            name: name,
            variable,
            variables,
            robocoop: variable._value.robocoop,
            source: decompile(variables)
          });
        }
        return array;
      }, [])
      .map(async (cell) => ({
        ...cell,
        source: await cell.source
      }))
  )
).map(({ name, variable, variables, robocoop, source }) =>
  robocoop.type === "json"
    ? {
        role: "user",
        content: `
The cell \`${name}\` defined as
<cell>
<deps>${variables[0]._inputs.map((i) => i._name).join(", ")}</deps>
<code><![CDATA[
${source}
]]></code>
</cell>
evaluated to
~~~${robocoop.type}
${robocoop.value}
~~~
`
      }
    : {
        role: "user",
        content: [
          {
            type: "text",
            text: `The cell \`${name}\` defined as
<cell>
<deps>${variables[0]._inputs.map((i) => i._name).join(", ")}</deps>
<code><![CDATA[
${source}
]]></code>
</cell>
is an image
`
          },

          ...(modelConfig.image_url
            ? [
                {
                  type: "image_url",
                  image_url: {
                    url: robocoop.value
                  }
                }
              ]
            : [])
        ]
      }
)
)}

function _51(md){return(
md`### History Memory`
)}

function _tag(){return(
Math.random()
)}

function _history(Inputs){return(
Inputs.input([])
)}

function _54(md){return(
md`---`
)}

function _55(md){return(
md`## LLM API Call`
)}

function _ask(flowQueue){return(
flowQueue({ timeout_ms: 180000 })
)}

function _57(ask){return(
console.log("Ask", ask)
)}

function _prompt_messages(ask){return(
[
  ...ask
]
)}

function _token_analytics(prompt_messages){return(
{
  prompt: prompt_messages,
  prompt_tokens: prompt_messages.map(
    (p) => (p.content || JSON.stringify(p.function_call)).length / 5
  )
}
)}

function _trimmed_prompt(token_analytics,d3,settings)
{
  console.log("token_analytics", token_analytics);
  while (d3.sum(token_analytics.prompt_tokens) > settings.max_prompt_tokens) {
    token_analytics.prompt.splice(1, 1);
    token_analytics.prompt_tokens.splice(1, 1);
  }
  console.log("trimmed_prompt", token_analytics);
  return token_analytics;
}


function _modelConfig($0,ANTHROPIC_API_KEY,OPENAI_API_KEY){return(
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
  } else if (
    model == "o3-mini" ||
    model == "o1-mini" ||
    model == "o1-preview"
  ) {
    return {
      type: "chat",
      image_url: false,
      api: "https://api.openai.com/v1/chat/completions",
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
  } else if (
    model == "o1" ||
    model == "o3" ||
    model == "o4-mini" ||
    model == "o4-mini-high"
  ) {
    return {
      api: "https://api.openai.com/v1/chat/completions",
      type: "chat",
      image_url: true,
      roles: ["user", "system", "assistant"],
      settings: {
        //functions: functions,
        //function_call: { name: "upsert_cell" },
        model: model,
        temperature: 1,
        max_completion_tokens: $0.value.max_prompt_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
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
        //functions: functions,
        //function_call: { name: "upsert_cell" },
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


function _instruction(openAiResponse,process,ask)
{
  const message = openAiResponse.choices[0].message;
  return {
    cells: process(message.content),
    prompt: ask[ask.length - 1].content,
    action: "upsert_cells",
    time: Date.now()
  };
}


function _domParser(DOMParser){return(
new DOMParser()
)}

function _content(process,openAiResponse){return(
process(openAiResponse.choices[0].message.content)
)}

function _process(domParser){return(
function process(content) {
  const doc = domParser.parseFromString(
    "<response>" + content + "</response>",
    "text/xml"
  );
  const cells = [...doc.querySelectorAll("cell")];
  return cells.map((cell) => ({
    inputs: cell
      .querySelector("deps")
      .textContent.split(",")
      .map((s) => s.trim()),
    code: cell.querySelector("code").textContent.trim()
  }));
}
)}

function _api_call_response($0,instruction){return(
$0.resolve(instruction) && instruction
)}

function _68(md){return(
md`---`
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
  main.variable(observer()).define(["highlight","example_image"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("pong_game")).define("pong_game", ["width"], _pong_game);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["openaiCompletion"], _14);
  main.variable(observer("viewof prompt")).define("viewof prompt", ["whisperInput","OPENAI_API_KEY","view","cautious","Inputs","invalidation"], _prompt);
  main.variable(observer("prompt")).define("prompt", ["Generators", "viewof prompt"], (G, _) => G.input(_));
  main.variable(observer("viewof include_deps")).define("viewof include_deps", ["Inputs"], _include_deps);
  main.variable(observer("include_deps")).define("include_deps", ["Generators", "viewof include_deps"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","cellsToClipboard","suggestion"], _17);
  main.variable(observer("viewof suggestion")).define("viewof suggestion", ["Inputs","formatted_instruction"], _suggestion);
  main.variable(observer("suggestion")).define("suggestion", ["Generators", "viewof suggestion"], (G, _) => G.input(_));
  main.variable(observer("viewof context_viz")).define("viewof context_viz", ["Inputs","context"], _context_viz);
  main.variable(observer("context_viz")).define("context_viz", ["Generators", "viewof context_viz"], (G, _) => G.input(_));
  main.variable(observer()).define(["context"], _20);
  main.variable(observer()).define(["md"], _21);
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
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("background_tasks")).define("background_tasks", ["submit_context","submit_summary","find_context_extensions","on_prompt","api_call_response"], _background_tasks);
  main.variable(observer("viewof user_variable_filters")).define("viewof user_variable_filters", ["Inputs","localStorageView"], _user_variable_filters);
  main.variable(observer("user_variable_filters")).define("user_variable_filters", ["Generators", "viewof user_variable_filters"], (G, _) => G.input(_));
  main.variable(observer()).define(["response"], _31);
  main.variable(observer("formatted_instruction")).define("formatted_instruction", ["response"], _formatted_instruction);
  main.variable(observer("response")).define("response", ["on_prompt"], _response);
  main.variable(observer("on_prompt")).define("on_prompt", ["viewof settings","system_prompt","viewof contextRequest","include_deps","prompt","mutable context","viewof ask"], _on_prompt);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("viewof context_extensions")).define("viewof context_extensions", ["Inputs"], _context_extensions);
  main.variable(observer("context_extensions")).define("context_extensions", ["Generators", "viewof context_extensions"], (G, _) => G.input(_));
  main.variable(observer("find_context_extensions")).define("find_context_extensions", ["runtime"], _find_context_extensions);
  main.variable(observer("extension_context")).define("extension_context", ["viewof context_extensions"], _extension_context);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("viewof contextRequest")).define("viewof contextRequest", ["flowQueue"], _contextRequest);
  main.variable(observer("contextRequest")).define("contextRequest", ["Generators", "viewof contextRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["contextRequest"], _41);
  main.variable(observer("modules")).define("modules", ["contextRequest","moduleMap","runtime"], _modules);
  main.variable(observer("module_cells")).define("module_cells", ["main","modules","cellMap"], _module_cells);
  main.variable(observer("module_summary")).define("module_summary", ["decompile"], _module_summary);
  main.variable(observer("main_module_summary")).define("main_module_summary", ["module_summary","module_cells"], _main_module_summary);
  main.variable(observer("all_module_summary")).define("all_module_summary", ["module_cells","module_summary"], _all_module_summary);
  main.variable(observer("submit_context")).define("submit_context", ["viewof contextRequest","contextRequest","all_module_summary","main_module_summary","highlight_context"], _submit_context);
  main.define("initial context", _context);
  main.variable(observer("mutable context")).define("mutable context", ["Mutable", "initial context"], (M, _) => new M(_));
  main.variable(observer("context")).define("context", ["mutable context"], _ => _.generator);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("highlight_context")).define("highlight_context", ["module_cells","decompile","modelConfig"], _highlight_context);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("tag")).define("tag", _tag);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("viewof ask")).define("viewof ask", ["flowQueue"], _ask);
  main.variable(observer("ask")).define("ask", ["Generators", "viewof ask"], (G, _) => G.input(_));
  main.variable(observer()).define(["ask"], _57);
  main.variable(observer("prompt_messages")).define("prompt_messages", ["ask"], _prompt_messages);
  main.variable(observer("token_analytics")).define("token_analytics", ["prompt_messages"], _token_analytics);
  main.variable(observer("trimmed_prompt")).define("trimmed_prompt", ["token_analytics","d3","settings"], _trimmed_prompt);
  main.variable(observer("modelConfig")).define("modelConfig", ["viewof settings","ANTHROPIC_API_KEY","OPENAI_API_KEY"], _modelConfig);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["trimmed_prompt","modelConfig","viewof settings","OPENAI_API_KEY","api_endpoint"], _openAiResponse);
  main.variable(observer("instruction")).define("instruction", ["openAiResponse","process","ask"], _instruction);
  main.variable(observer("domParser")).define("domParser", ["DOMParser"], _domParser);
  main.variable(observer("content")).define("content", ["process","openAiResponse"], _content);
  main.variable(observer("process")).define("process", ["domParser"], _process);
  main.variable(observer("api_call_response")).define("api_call_response", ["viewof ask","instruction"], _api_call_response);
  main.variable(observer()).define(["md"], _68);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("variables", child1);
  main.import("descendants", child1);
  main.import("lookupVariable", child1);
  main.import("main", child1);
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
  main.import("example_image", child9);
  main.variable(observer("dirty_json")).define("dirty_json", _dirty_json);
  const child10 = runtime.module(define10);
  main.import("moduleMap", child10);
  main.import("submit_summary", child10);
  return main;
}
