import define1 from "./048a17a165be198d@264.js";
import define2 from "./293899bef371e135@290.js";

function _1(md){return(
md`# Simple ChatGPT/Claude Prompt`
)}

function _2(md){return(
md`<details>
  <summary>About your key privacy</summary>
  ${md`This notebook stores your keys in localstorage so it's there when you refresh the page. Other than that the only time it is accessed is when making an AI call.
  
  This notebook is hosted by [observablehq.com](https://observablehq.com/). They do not inspect the internal state of notebook. See their [security policy](https://observablehq.com/@observablehq/security-and-data-access-demo).`}

  => Your key is never disclosed to any party other than the vendor
</details>`
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
    placeholder: "paste Anthropic key here"
  }),
  localStorageView("ANTHROPIC_API_KEY")
)
)}

function _model(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    [
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-0301",
      "gpt-3.5-turbo-0613",
      "gpt-3.5-turbo-16k",
      "gpt-3.5-turbo-16k-0613",
      "gpt-3.5-turbo-instruct",
      "gpt-3.5-turbo-instruct-0914",
      "gpt-4",
      "gpt-4-0314",
      "gpt-4-0613",
      "gpt-4-32k-0613",
      "gpt-4-32k",
      "gpt-4-1106-preview",
      "gpt-4-turbo",
      "gpt-4o",
      "gpt-4o-mini",
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
      "dall-e-3"
    ].sort(),
    {
      label: "model"
    }
  ),
  localStorageView("SIMPLE_MODEL")
)
)}

function _max_tokens(Inputs){return(
Inputs.range([0, 4096], {
  label: "max_tokens",
  value: 4096
})
)}

function _7(md){return(
md`Enter your prompt here`
)}

function _input(Inputs)
{
  return Inputs.textarea({
    placeholder: "write your prompt here",
    rows: 100,
    submit: true
  });
}


function _9(Inputs,aiChatResponse){return(
Inputs.textarea({
  value: aiChatResponse && aiChatResponse.choices[0].message.content,
  rows: 100,
  disabled: true
})
)}

function _modelConfig(max_tokens,ANTHROPIC_API_KEY,OPENAI_API_KEY){return(
(model) => {
  if (model.startsWith("claude"))
    return {
      type: "chat",
      api: "https://api.anthropic.com/v1/messages",
      roles: ["user", "assistant"],
      settings: {
        temperature: 0.7,
        max_tokens,
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
  } else {
    return {
      api: "https://api.openai.com/v1/chat/completions",
      type: "chat",
      roles: ["user", "system", "assistant"],
      settings: {
        temperature: 0.7,
        max_tokens,
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

function _11(md){return(
md`### Open AI`
)}

function _config(modelConfig,model){return(
modelConfig(model)
)}

async function _aiChatResponse(modelConfig,model,input,normalizeChatResponse)
{
  const config = modelConfig(model);
  if (config.type !== "chat") return this;
  const response = await fetch(config.api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers()
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system" in config.roles ? "system" : "user",
          content: input
        }
      ],
      ...config.settings
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);
  return normalizeChatResponse(response.json());
}


function _normalizeChatResponse(){return(
(response) => {
  if (response.content) {
    response.choices = response.content.map((content) => ({
      message: {
        role: response.role,
        content: content.text
      }
    }));
  }
  return response;
}
)}

function _15(md){return(
md`### Misc`
)}

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof ANTHROPIC_API_KEY")).define("viewof ANTHROPIC_API_KEY", ["Inputs","localStorageView"], _ANTHROPIC_API_KEY);
  main.variable(observer("ANTHROPIC_API_KEY")).define("ANTHROPIC_API_KEY", ["Generators", "viewof ANTHROPIC_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs","localStorageView"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof max_tokens")).define("viewof max_tokens", ["Inputs"], _max_tokens);
  main.variable(observer("max_tokens")).define("max_tokens", ["Generators", "viewof max_tokens"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof input")).define("viewof input", ["Inputs"], _input);
  main.variable(observer("input")).define("input", ["Generators", "viewof input"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","aiChatResponse"], _9);
  main.variable(observer("modelConfig")).define("modelConfig", ["max_tokens","ANTHROPIC_API_KEY","OPENAI_API_KEY"], _modelConfig);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("config")).define("config", ["modelConfig","model"], _config);
  main.variable(observer("aiChatResponse")).define("aiChatResponse", ["modelConfig","model","input","normalizeChatResponse"], _aiChatResponse);
  main.variable(observer("normalizeChatResponse")).define("normalizeChatResponse", _normalizeChatResponse);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
