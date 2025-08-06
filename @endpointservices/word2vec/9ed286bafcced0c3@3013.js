import define1 from "./17c8ce433e1df58e@3584.js";

function _1(md){return(
md`# \`highlight()\` values to [roboco-op](https://observablehq.com/d/9ed286bafcced0c3?collection=@tomlarkworthy/robocoop)

Adds a runtime value to the LLM context programatically, closing a feedback loop.

Changes
 
 - 2024-12-28: highlight blobs and if they are images they become image prompts`
)}

function _2(highlight,example){return(
highlight(example)
)}

function _example(highlight){return(
{
  number: 42,
  obj: {
    str: "cool"
  },
  fn: highlight
}
)}

function _example_image(FileAttachment){return(
FileAttachment("sample.png").blob()
)}

function _5(highlight,example_image){return(
highlight(example_image)
)}

function _highlight(guessType,encodeImage,html,md,customJsonFormatter){return(
{
  prompt:
    'I would like the existing highlight function to define multiple properties, on is "value" which is already done, and a new one "robocoop" which will return ({type: "highlight", value: <REF TO VALUE>}). Do it in a single call to defineProperties',
  time: 1726209709876
} &&
  (async (value, { max_length = 1000, title = "highlight" } = {}) => {
    value = await value;
    const type = guessType(value);
    let image_url = undefined;
    if (type === "image") {
      image_url = await encodeImage(value);
    }
    return Object.defineProperties(
      html`<details>
<summary><mark>${title}</mark></summary>
${
  type === "json"
    ? md`~~~javascript
${customJsonFormatter(value, { max_length })}
~~~`
    : html`<img src="${image_url}" />`
}
</details>`,
      {
        value: {
          get: () => value
        },
        robocoop: {
          get: () => ({
            type: type,
            value:
              type === "json"
                ? customJsonFormatter(value, { max_length })
                : image_url
          })
        }
      }
    );
  })
)}

function _guessType(){return(
{
  prompt:
    'write a better guessType that checks if the value is a blob and if so checks the mime type and if its a PNG (.png), JPEG (.jpeg and .jpg), WEBP (.webp), or non-animated GIF (.gif) returns "image"',
  time: 1735419431197
} &&
  ((value) => {
    if (value instanceof Blob) {
      const mime = value.type.toLowerCase();
      const validImageTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif"
      ];
      if (validImageTypes.includes(mime)) {
        return "image";
      }
    }
    return "json";
  })
)}

function _customJsonFormatter(){return(
{
  prompt: "Custom JSON formatter that serializes functions and Error objects",
  time: 1726300000000
} &&
  function customJsonFormatter(value, { max_length = 250, indent = 0 } = {}) {
    const INDENT_SPACE = " ".repeat(indent);
    const jsonString = JSON.stringify(
      value,
      (key, val) => {
        if (typeof val === "function") {
          return val.toString();
        }
        if (val instanceof Error) {
          return `Error(\"${val.message}\")`;
        }
        return val;
      },
      2
    );
    // Truncate if too long
    if (jsonString.length > max_length) {
      return jsonString.slice(0, max_length) + "...";
    }

    return jsonString;
  }
)}

function _9(md,customJsonFormatter){return(
md`
~~~javascript
${customJsonFormatter({
  name: "Example",
  age: 30,
  error: new Error("dam"),
  greet: function () {
    console.log("Hello!");
  },
  nested: {
    arr: [1, "two", () => {}, { key: "value" }]
  }
})}
~~~`
)}

function _encodeImage(){return(
{
  prompt:
    'Can you write the equivelent of this but for javascript. An encode image that takes a blob, looks at the mime type and constructre a value that could be an image_url\n```\nimport base64\nfrom openai import OpenAI\n\nclient = OpenAI()\n\n# Function to encode the image\ndef encode_image(image_path):\n    with open(image_path, "rb") as image_file:\n        return base64.b64encode(image_file.read()).decode("utf-8")\n\n\n# Path to your image\nimage_path = "path_to_your_image.jpg"\n\n# Getting the base64 string\nbase64_image = encode_image(image_path)\n\nresponse = client.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[\n        {\n            "role": "user",\n            "content": [\n                {\n                    "type": "text",\n                    "text": "What is in this image?",\n                },\n                {\n                    "type": "image_url",\n                    "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"},\n                },\n            ],\n        }\n    ],\n)\n```',
  time: 1735418567409
} &&
  async function encodeImage(blob) {
    if (!(blob instanceof Blob)) {
      throw new TypeError("The provided value is not a Blob.");
    }

    const mimeType = blob.type;
    if (!mimeType.startsWith("image/")) {
      throw new Error("The provided Blob is not an image.");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // This will be a data URL
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
)}

function _11($0){return(
$0
)}

function _12(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`## Current Chat context`
)}

function _15($0){return(
$0
)}

function _16(md){return(
md`tick the cells to include in the next prompt`
)}

function _17(md){return(
md`### AI Settings`
)}

function _18($0){return(
$0
)}

function _19($0){return(
$0
)}

function _20($0){return(
$0
)}

function _21(md){return(
md`---`
)}

function _23(background_tasks){return(
background_tasks
)}

function _25(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["sample.png", {url: new URL("./files/cf0d945f21b11b44092be2c19260bf4b8ca62fe6c30366894817c19562f5a6bdad046a871bd564606e1b7ec21529fafc9922209bd4e50b37300842d53211b241.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["highlight","example"], _2);
  main.variable(observer("example")).define("example", ["highlight"], _example);
  main.variable(observer("example_image")).define("example_image", ["FileAttachment"], _example_image);
  main.variable(observer()).define(["highlight","example_image"], _5);
  main.variable(observer("highlight")).define("highlight", ["guessType","encodeImage","html","md","customJsonFormatter"], _highlight);
  main.variable(observer("guessType")).define("guessType", _guessType);
  main.variable(observer("customJsonFormatter")).define("customJsonFormatter", _customJsonFormatter);
  main.variable(observer()).define(["md","customJsonFormatter"], _9);
  main.variable(observer("encodeImage")).define("encodeImage", _encodeImage);
  main.variable(observer()).define(["viewof prompt"], _11);
  main.variable(observer()).define(["Inputs","suggestion"], _12);
  main.variable(observer()).define(["viewof suggestion"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["viewof context_viz"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _18);
  main.variable(observer()).define(["viewof api_endpoint"], _19);
  main.variable(observer()).define(["viewof settings"], _20);
  main.variable(observer()).define(["md"], _21);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("variables", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("ndd", child1);
  main.import("_events", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer()).define(["background_tasks"], _23);
  main.variable(observer()).define(["footer"], _25);
  return main;
}
