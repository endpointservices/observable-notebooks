async function _1(FileAttachment,md){return(
md`# Local LLM with [llamafile](https://github.com/Mozilla-Ocho/llamafile)

Run a LLM + webserver locally, its very easy with [llamafiles](https://github.com/Mozilla-Ocho/llamafile)

\`\`\`
chmod +x mistral-7b-instruct-v0.2.Q5_K_M.llamafile
./mistral-7b-instruct-v0.2-Q5_K_M-server.llamafile
\`\`\`

I had problems running the Q5 weights on an M1 Pro 16GB. But the Q4 worked and I extracted the Q4 weights and ran the latest server on those (see [llamafile/issues/24](https://github.com/Mozilla-Ocho/llamafile/issues/24))

\`\`\`
./llamafile-0.5 --server -m mistral-7b-instruct-v0.1.Q4_K_M.gguf
\`\`\`

Running that servers a chat interface on [localhost:8080](https://localhost:8080), which can return return good results at about the same speed as OpenAI, on a Mac M1:

<details>
  <summary>screenshot</summary>
  ![image.png](${await FileAttachment("image.png").url()})
</details>
`
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

async function _4(FileAttachment,md){return(
md`## Call the API

In addition to the web app, the server also serves much of OpenAI's API (function calling is a notable ommision)

<details>
  <summary>example shreenshot</summary>
  ![image@2.png](${await FileAttachment("image@2.png").url()})
</details>`
)}

function _input(Inputs)
{
  return Inputs.textarea({
    placeholder: "write your prompt here",
    rows: 100,
    submit: true
  });
}


function _6(md,response){return(
md`${response.choices[0].message.content}`
)}

async function _response(input,settings)
{
  const response = await fetch("http://localhost:8080/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
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


function _8(md){return(
md`## Streaming responses

Llamafile server also supports streaming`
)}

function _streaming_input(Inputs)
{
  return Inputs.textarea({
    placeholder: "write your prompt here",
    rows: 100,
    submit: true
  });
}


function _10(md,streaming_response){return(
md`${streaming_response.content || ""}`
)}

function _streaming_events(Generators,fetchEventSource,streaming_input,settings){return(
Generators.observe((notify) => {
  let events = [];
  fetchEventSource("http://localhost:8080/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: streaming_input
        }
      ],
      stream: true,
      ...settings
    }),
    onmessage: (ev) => {
      //data.choices.content = ev.data.choices;
      events.push(JSON.parse(ev.data));
      notify(events);
    }
  });
})
)}

function _12(streaming_events){return(
JSON.stringify(streaming_events)
)}

function _streaming_response(streaming_events){return(
streaming_events.reduce((data, event) => {
  const choice = event.choices[0];

  // Check if there is a 'delta' object
  if (choice.delta) {
    // Apply delta updates
    for (const key in choice.delta) {
      data[key] = (data[key] || "") + choice.delta[key];
    }
  } else {
    // If no delta, assume setting the entire data object
    data = { ...data, ...choice };
  }

  return data;
}, {})
)}

async function _fetchEventSource(){return(
(
  await import(
    "https://cdn.skypack.dev/@microsoft/fetch-event-source@2.0.1?min"
  )
).fetchEventSource
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/1c8ff6c6f0e2cc66835420a39b585fb5db9e8f23f09588a389dc23c3eb527f1b1c36e109d7c03252bb5330cf35acb9b64dd0a2af4293aa0e60e4b109e13e63c8.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/eb12a82dae0f9e0349da8a10862d21656f96b0cf38035c96abcb816ff830aa8ca67f9462f84201eaa4830b3f8a500cef065f5f812a7a2e1565f10d82bd725aa5.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer("viewof max_tokens")).define("viewof max_tokens", ["Inputs"], _max_tokens);
  main.variable(observer("max_tokens")).define("max_tokens", ["Generators", "viewof max_tokens"], (G, _) => G.input(_));
  main.variable(observer("settings")).define("settings", ["max_tokens"], _settings);
  main.variable(observer()).define(["FileAttachment","md"], _4);
  main.variable(observer("viewof input")).define("viewof input", ["Inputs"], _input);
  main.variable(observer("input")).define("input", ["Generators", "viewof input"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","response"], _6);
  main.variable(observer("response")).define("response", ["input","settings"], _response);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof streaming_input")).define("viewof streaming_input", ["Inputs"], _streaming_input);
  main.variable(observer("streaming_input")).define("streaming_input", ["Generators", "viewof streaming_input"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","streaming_response"], _10);
  main.variable(observer("streaming_events")).define("streaming_events", ["Generators","fetchEventSource","streaming_input","settings"], _streaming_events);
  main.variable(observer()).define(["streaming_events"], _12);
  main.variable(observer("streaming_response")).define("streaming_response", ["streaming_events"], _streaming_response);
  main.variable(observer("fetchEventSource")).define("fetchEventSource", _fetchEventSource);
  return main;
}
