import define1 from "./048a17a165be198d@271.js";

function _1(md){return(
md`# 👋 Hello, OpenAI [Responses API](https://platform.openai.com/docs/api-reference/responses/create)

\`\`\`js
import { responses } from "@tomlarkworthy/openai-responses-api"
\`\`\``
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

function _3(md){return(
md`# Examples`
)}

function _4(md){return(
md`### Simple text prompt`
)}

function _text_response(responses){return(
responses({
  input: "how are you?"
})
)}

function _6(text_response){return(
text_response.output.at(-1).content.at(-1).text
)}

function _7(md){return(
md`### Image Prompt`
)}

function _disk(FileAttachment){return(
FileAttachment("image.png").image()
)}

function _getDataUrl(){return(
async function getDataUrl(img, format = "image/png") {
  if (img.image) {
    img = await img.image();
  }
  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // Set width and height
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw the image
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(format);
}
)}

function _10(img_response){return(
img_response.output.at(-1).content.at(-1).text
)}

function _img_response(responses,getDataUrl,disk){return(
responses({
  input: [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "what's in this image?"
        },
        {
          type: "input_image",
          image_url: getDataUrl(disk, "image/png")
        }
      ]
    }
  ]
})
)}

function _12(md){return(
md`### Tools: Web search

*not that many models support websearch*`
)}

function _13(websearch_response){return(
websearch_response.output.at(-1).content.at(-1).text
)}

function _14(websearch_response){return(
websearch_response.tools.at(-1)
)}

function _websearch_response(responses){return(
responses({
  model: "gpt-4o",
  input: "Whats the weather in Berlin today?",
  tools: [{ type: "web_search_preview" }]
})
)}

function _16(md){return(
md`### Tools: Image generation

The tool auto-converts the images to a blob inside the image_call output element`
)}

function _17(image_response){return(
image_response.output.at(-1).content.at(-1).text
)}

function _18(image_response,htl){return(
htl.html`<img
  width="400"
  src=${URL.createObjectURL(image_response.output[0].blob)}
  img.onload= ${() => URL.revokeObjectURL(this.url)}
></img>`
)}

function _image_response(responses){return(
responses({
  model: "gpt-4o",
  input: "Draw a pelican riding a bike",
  tools: [{ type: "image_generation" }]
})
)}

function _20(md){return(
md`### Tools: [function calling](https://platform.openai.com/docs/guides/function-calling?api-mode=responses)`
)}

function _21(resolved_function_response){return(
resolved_function_response.output.at(-1).content.at(-1).text
)}

function _function_response(responses,evalJavaScriptTool){return(
responses({
  model: "o4-mini",
  input: "You are executing in a browser. What is the current baseURL?",
  tools: [evalJavaScriptTool],
  reasoning: {
    effort: "high",
    summary: "detailed"
  },
  parallel_tool_calls: false
})
)}

function _resolved_function_response(runTools,function_response){return(
runTools(function_response)
)}

function _evalJavaScriptTool(){return(
{
  type: "function",
  name: "evalJavaScript",
  strict: true,
  description:
    "Evaluate a javascript expression and return the serialized result and the contents of the terminal in logs and errors ",
  parameters: {
    type: "object", // Does not support scalars
    properties: {
      code: { type: "string" }
    },
    required: ["code"],
    additionalProperties: false
  },
  // Not part of OpenAI API. This is where we define execution
  execute: async ({ code } = {}) => {
    const log = console.log.bind(console);
    const error = console.error.bind(console);
    const response = {
      logs: [],
      errors: []
    };
    console.log = (...args) => {
      response.logs.push(args);
      log(...args);
    };
    console.error = (...args) => {
      response.errors.push(args);
      error(...args);
    };
    try {
      response.result = await eval(code);
    } catch (err) {
      debugger;
      console.error(err);
    } finally {
      console.log = log;
      console.error = error;
    }
    return response;
  }
}
)}

function _25(md){return(
md`## [Responses API](https://platform.openai.com/docs/api-reference/responses/create)`
)}

function _responses($0,deepResolve){return(
async function responses({
  url = "https://api.openai.com/v1/responses",
  model = "o4-mini",
  input,
  background,
  include,
  instructions,
  max_output_tokens,
  metadata,
  parallel_tool_calls,
  previous_response_id,
  reasoning,
  service_tier,
  store,
  temperature,
  text,
  tool_choice,
  tools,
  top_p,
  truncation,
  user
} = {}) {
  debugger;
  if (typeof input === "string") {
    input = [
      {
        role: "user",
        content: input
      }
    ];
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${$0.value}`,
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      model,
      background,
      input: await deepResolve(input),
      include,
      instructions: await (typeof instructions == "function"
        ? instructions()
        : instructions),
      max_output_tokens,
      metadata,
      parallel_tool_calls,
      previous_response_id,
      reasoning,
      service_tier,
      store,
      temperature,
      text,
      tool_choice,
      tools,
      top_p,
      truncation,
      user
    })
  });
  if (response.status == 403 || response.status == 401)
    throw "Authentication error: update OPENAI_API_KEY";
  const responseJson = {
    ...arguments[0],
    input,
    ...(await response.json()),
    tools
  };

  console.log(arguments[0], responseJson);

  // Auto decode images to a blob
  responseJson.output &&
    (await Promise.all(
      responseJson.output
        .filter((o) => o.type == "image_generation_call")
        .map(async (call) => {
          call.blob = await fetch(
            `data:image/${call.format};base64,${call.result}`
          ).then((r) => r.blob());
        })
    ));

  // Auto decode arguments
  responseJson.output &&
    (await Promise.all(
      responseJson.output
        .filter((o) => o.type == "function_call")
        .map(async (call) => {
          call.arguments =
            typeof call.arguments == "string"
              ? JSON.parse(call.arguments)
              : call.arguments;
        })
    ));

  return responseJson;
}
)}

function _runTools(responses){return(
async function runTools(response) {
  // Auto function calls
  // https://platform.openai.com/docs/guides/function-calling?api-mode=responses#handling-function-calls
  const toolCalls =
    response.output &&
    (
      await Promise.all(
        response.output.flatMap(async (call, index) => {
          if (call.type !== "function_call") return [];
          const tool = response.tools.find((t) => t.name == call.name);
          const result = await tool.execute(call.arguments);
          return [
            ...(index > 1
              ? [
                  /*response.output[index - 2],*/
                  /*response.output[index - 1]*/
                ]
              : []),
            {
              type: "function_call_output",
              call_id: call.call_id,
              output:
                (typeof result == "string" ? result : JSON.stringify(result)) ||
                "undefined"
            }
          ];
        })
      )
    ).flat();
  if (toolCalls?.length > 0) {
    // auto-follow up
    return await responses({
      url: response.url,
      output: undefined,
      input: toolCalls,
      tools: response.tools,
      reasoning: response.reasoning,
      previous_response_id: response.id,
      tool_choice: response.tool_choice
    });
  }
  return undefined; // Nothing to do
}
)}

function _deepResolve(){return(
async function deepResolve(x) {
  if (x && typeof x.then === "function") return deepResolve(await x); // promise → unwrap
  if (Array.isArray(x)) return Promise.all(x.map(deepResolve)); // array  → recurse
  if (x !== null && typeof x === "object") {
    // plain obj → recurse
    const entries = await Promise.all(
      Object.entries(x).map(async ([k, v]) => [k, await deepResolve(v)])
    );
    return Object.fromEntries(entries);
  }
  return x; // primitive → as-is
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/dea7e05abdc37698bbe6c346a44bb1d230b4028311c951a8c8bf488fed2e09be728ee5d6da5aa7d7b2698f8c331798ecb65f3ab4e426dc3edb35dcf7361c36b3.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("text_response")).define("text_response", ["responses"], _text_response);
  main.variable(observer()).define(["text_response"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("disk")).define("disk", ["FileAttachment"], _disk);
  main.variable(observer("getDataUrl")).define("getDataUrl", _getDataUrl);
  main.variable(observer()).define(["img_response"], _10);
  main.variable(observer("img_response")).define("img_response", ["responses","getDataUrl","disk"], _img_response);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["websearch_response"], _13);
  main.variable(observer()).define(["websearch_response"], _14);
  main.variable(observer("websearch_response")).define("websearch_response", ["responses"], _websearch_response);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["image_response"], _17);
  main.variable(observer()).define(["image_response","htl"], _18);
  main.variable(observer("image_response")).define("image_response", ["responses"], _image_response);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["resolved_function_response"], _21);
  main.variable(observer("function_response")).define("function_response", ["responses","evalJavaScriptTool"], _function_response);
  main.variable(observer("resolved_function_response")).define("resolved_function_response", ["runTools","function_response"], _resolved_function_response);
  main.variable(observer("evalJavaScriptTool")).define("evalJavaScriptTool", _evalJavaScriptTool);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("responses")).define("responses", ["viewof OPENAI_API_KEY","deepResolve"], _responses);
  main.variable(observer("runTools")).define("runTools", ["responses"], _runTools);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  main.variable(observer("deepResolve")).define("deepResolve", _deepResolve);
  return main;
}
