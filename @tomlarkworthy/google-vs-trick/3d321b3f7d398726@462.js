// https://observablehq.com/@tomlarkworthy/fileinput@462
import define1 from "./266e717755b1d175@112.js";
import define2 from "./f92778131fd76559@1174.js";

function _1(md){return(
md`# Draggable _LocalFile_ _fileInput_ 

A combination of [@fil/fileuploader](/@fil/fileuploader) and [@mbostock/localfile](/@mbostock/localfile) for a draggable file input that has all the convenience methods of a FileAttachment (e.g. .json()) and has a hover effect. Quite a good example of how much nicer using the view literal is.

I have not added many options, but [Suggestions](https://observablehq.com/@observablehq/suggestions-and-comments) are welcome.

Usage:
~~~{js}
import {fileInput} from "@tomlarkworthy/fileinput"

~~~
`
)}

function _fileInput(Inputs,htl,LocalFile,Event,view){return(
function fileInput({ prompt = 'Drag a file here', accept = null } = {}) {
  const output = Inputs.input();
  const input = htl.html`<input type="file">`;
  input.oninput = () => {
    output.value = new LocalFile(input.files[0]);
    output.dispatchEvent(new Event("input", { bubbles: true }));
  };

  input.ondragenter = evt => {
    input.classList.add("hover");
  };

  input.ondragleave = evt => {
    input.classList.remove("hover");
  };

  input.ondrop = evt => {
    input.classList.remove("hover");
  };

  return view`<div class="dropfileContainer">
    <style>
      .dropfileContainer > input[type=file] {
        width:100%;
        height:80px;
        background:#fefef2;
        border:solid 2px black;
        border-radius: 10px;
        padding-top: 10px;
      }
      
      .dropfileContainer > input[type=file].hover {
        background: #deded2;
      }
    </style>

    <p style="position: absolute;
              margin-top: 30px;
              margin-left: auto;
              margin-right: auto;
              left: 0;
              right: 0;
              text-align: center;
              pointer-events: none;">
      ${prompt}
    </p>
    ${input}
    <!-- ${['...', output]} -->
  </div>`;
}
)}

function _example_file(fileInput){return(
fileInput()
)}

function _4(example_file){return(
example_file.text()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("fileInput")).define("fileInput", ["Inputs","htl","LocalFile","Event","view"], _fileInput);
  main.variable(observer("viewof example_file")).define("viewof example_file", ["fileInput"], _example_file);
  main.variable(observer("example_file")).define("example_file", ["Generators", "viewof example_file"], (G, _) => G.input(_));
  main.variable(observer()).define(["example_file"], _4);
  const child1 = runtime.module(define1);
  main.import("LocalFile", child1);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  return main;
}
