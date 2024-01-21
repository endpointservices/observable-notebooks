import define1 from "./048a17a165be198d@264.js";
import define2 from "./293899bef371e135@290.js";

function _1(md){return(
md`# Simple ChatGPT Prompt`
)}

function _2(md){return(
md`<details>
  <summary>About your key privacy</summary>
  ${md`This notebook stores your OPENAI_API_KEY in localstorage so it's there when you refresh the page. Other than that the only time it is accessed is when making an OpenAI call. You can verify this by searching for OPENAI_API_KEY references using the search feature in the right sidebar.
  
  This notebook is hosted by [observablehq.com](https://observablehq.com/). They do not inspect the internal state of notebook. See their [security policy](https://observablehq.com/@observablehq/security-and-data-access-demo).`}

  => Your key is never disclosed to any party other than OpenAI
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
      "gpt-4-1106-preview"
    ].sort(),
    {
      label: "model"
    }
  ),
  localStorageView("MODEL")
)
)}

function _max_tokens(Inputs){return(
Inputs.range([0, 4096], {
  label: "max_tokens",
  value: 4096
})
)}

function _settings(max_tokens){return(
{
  temperature: 0.7,
  max_tokens,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}
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


function _9(md){return(
md`### Open AI`
)}

async function _openAiResponse(OPENAI_API_KEY,model,input,settings)
{
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: input
        }
      ],
      ...settings
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);

  return response.json();
}


function _11(Inputs,openAiResponse){return(
Inputs.textarea({
  value: openAiResponse.choices[0].message.content,
  rows: 100,
  disabled: true
})
)}

function _12(md){return(
md`### Misc`
)}

function _15(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs","localStorageView"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof max_tokens")).define("viewof max_tokens", ["Inputs"], _max_tokens);
  main.variable(observer("max_tokens")).define("max_tokens", ["Generators", "viewof max_tokens"], (G, _) => G.input(_));
  main.variable(observer("settings")).define("settings", ["max_tokens"], _settings);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof input")).define("viewof input", ["Inputs"], _input);
  main.variable(observer("input")).define("input", ["Generators", "viewof input"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["OPENAI_API_KEY","model","input","settings"], _openAiResponse);
  main.variable(observer()).define(["Inputs","openAiResponse"], _11);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _15);
  return main;
}
