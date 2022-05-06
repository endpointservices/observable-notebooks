// https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams@98
import define1 from "./293899bef371e135@226.js";

function _1(md){return(
md`# Animated Sequence Diagrams

I am pleased to discover the Mermaid diagrams animate quite well. This lets the reader walk through the sequence at their own pace, and provides additional opportunity for the author to explain steps in details.

Yes the example is weird but it comes from the Mermaid [documentation](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)`
)}

function _step(Inputs){return(
Inputs.range([0, 6], { step: 1, value: 1 })
)}

function _3(step,md){return(
md`## ${
  ["John can react weirdly to small talk", "He met an old friend from school", "John struggled to find words", "But he remembered to focus", "He made a friendly reply", "And passed the good feelings on", "He even made a friend!"][step]
}`
)}

function _4(mermaid,step){return(
mermaid`sequenceDiagram
    autonumber
    ${
      step > 0
        ? `${
            step === 1 ? `rect rgb(0, 255, 0)\n` : ""
          } Alice->>John: Hello John, how are you? ${step == 1 ? "\nend" : ""}
    ${
      step > 1
        ? `loop Healthcheck
      ${
        step === 2 ? `rect rgb(0, 255, 0)\n` : ""
      } John->>John: Fight against hypochondri ${step == 2 ? "\nend" : ""}
    end
    ${
      step > 2
        ? `${
            step === 3 ? `rect rgb(0, 255, 0)\n` : ""
          } Note right of John: Rational thoughts! ${step == 3 ? "\nend" : ""}
    ${
      step > 3
        ? `${step === 4 ? `rect rgb(0, 255, 0)\n` : ""} John-->>Alice: Great! ${
            step == 4 ? "\nend" : ""
          }
    ${
      step > 4
        ? `${
            step === 5 ? `rect rgb(0, 255, 0)\n` : ""
          } John->>Bob: How about you? ${step == 5 ? "\nend" : ""}
    ${
      step > 5
        ? `${
            step === 6 ? `rect rgb(0, 255, 0)\n` : ""
          } Bob-->>John: Jolly good! ${step == 6 ? "\nend" : ""}`
        : ""
    }`
        : ""
    }`
        : ""
    }`
        : ""
    }`
        : ""
    }`
        : ""
    }
`
)}

function _6(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof step")).define("viewof step", ["Inputs"], _step);
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer()).define(["step","md"], _3);
  main.variable(observer()).define(["mermaid","step"], _4);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _6);
  return main;
}
