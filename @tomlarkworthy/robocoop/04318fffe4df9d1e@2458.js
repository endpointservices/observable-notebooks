import define1 from "./17c8ce433e1df58e@2965.js";
import define2 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# OpenAI Whisper Input

~~~js
  import {whisperInput} from "@tomlarkworthy/whisper-input"

  viewof myText = whisperInput({
    API_KEY: <YOUR OPEN API KEY>,
    content: <OPTIONAL BUTTON CONTENT, defaults to 🎙️>
  })
~~~

This is an input so it after transcripting it emits its value. This also means you can bind it to an ordinary text input.
`
)}

function _example(whisperInput,OPENAI_API_KEY){return(
whisperInput({
  API_KEY: OPENAI_API_KEY
})
)}

function _3(example){return(
example
)}

function _4(Inputs,$0){return(
Inputs.bind(Inputs.text(), $0)
)}

function _whisperInput(htl,MediaRecorder,audioBlobToFile,transcribeAudio,Event)
{
  ({
    prompt:
      "Create a builder that creates a single button in a view, while it is pushed it should transcribes audio, when released, it emits the text as a value. Follow the structure\n\nwhisperInput = (API_KEY) => {\n    let recording = undefined\n    return view`<button onmousedown=${()=> {...}} onmouseup=...>`\n}",
    time: 1725302054331
  });
  return ({ API_KEY, content = "🎙️" } = {}) => {
    let mediaRecorder;
    let audioChunks = [];

    const ui = htl.html`<div><button onmousedown=${async () => {
      console.log("starting");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async (evt) => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioFile = audioBlobToFile(audioBlob, "recording.wav");
        stream.getTracks().forEach((track) => track.stop());
        try {
          const transcribedText = await transcribeAudio(audioFile);
          console.log("transcribedText", transcribedText);
          audioChunks = []; // Reset audio chunks for the next recording
          ui.value = transcribedText;
          ui.dispatchEvent(new Event("input", { bubbles: true }));
        } catch (error) {
          console.error("Transcription error:", error);
        }
      };

      mediaRecorder.start();
    }} onmouseup=${async () => {
      console.log("stopping");
      mediaRecorder.stop();
    }}>${content}</button>`;
    ui.value = undefined;
    return ui;
  };
}


function _transcribeAudio(OPENAI_API_KEY,FormData){return(
{
  prompt:
    'The whisper API looks like this\n\n```\n\ncurl https://api.openai.com/v1/audio/transcriptions \\\n  -H "Authorization: Bearer $OPENAI_API_KEY" \\\n  -H "Content-Type: multipart/form-data" \\\n  -F model="whisper-1" \\\n  -F file="@/path/to/file/openai.mp3"\n```\n\n\nand returns\n\n```\n{\n  "text": "Imagine the wildest idea that you\'ve ever had, and you\'re curious about how it might scale to something that\'s a 100, a 1,000 times bigger..."\n}\n```\ncan you wrap that in a function using web api concepts',
  time: 1725301616943
} &&
  async function transcribeAudio(file) {
    const apiKey = OPENAI_API_KEY;
    const url = "https://api.openai.com/v1/audio/transcriptions";

    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  }
)}

function _audioBlobToFile(){return(
{
  prompt: "Convert audioBlob to a file for formData in a function",
  time: 1725301694316
} &&
  function audioBlobToFile(blob, filename) {
    return new File([blob], filename, { type: blob.type });
  }
)}

function _8(md){return(
md`---`
)}

function _9($0){return(
$0
)}

function _10(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _11($0){return(
$0
)}

function _12(md){return(
md`## Current Chat context`
)}

function _13($0){return(
$0
)}

function _14(md){return(
md`tick the cells to include in the next prompt`
)}

function _15($0){return(
$0
)}

function _16($0){return(
$0
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
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof example")).define("viewof example", ["whisperInput","OPENAI_API_KEY"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["example"], _3);
  main.variable(observer()).define(["Inputs","viewof example"], _4);
  main.variable(observer("whisperInput")).define("whisperInput", ["htl","MediaRecorder","audioBlobToFile","transcribeAudio","Event"], _whisperInput);
  main.variable(observer("transcribeAudio")).define("transcribeAudio", ["OPENAI_API_KEY","FormData"], _transcribeAudio);
  main.variable(observer("audioBlobToFile")).define("audioBlobToFile", _audioBlobToFile);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["viewof prompt"], _9);
  main.variable(observer()).define(["Inputs","suggestion"], _10);
  main.variable(observer()).define(["viewof suggestion"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof context_viz"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["viewof feedback_cells_selector"], _15);
  main.variable(observer()).define(["viewof feedback_prompt"], _16);
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
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
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
  main.import("viewof feedback_prompt", child1);
  main.import("feedback_prompt", child1);
  main.import("viewof feedback_cells_selector", child1);
  main.import("feedback_cells_selector", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer()).define(["background_tasks"], _23);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _25);
  return main;
}
