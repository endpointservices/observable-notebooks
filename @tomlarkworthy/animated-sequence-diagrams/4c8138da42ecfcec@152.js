// https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams@152
import define1 from "./293899bef371e135@226.js";

function _1(md){return(
md`# Interactive Sequence Diagrams

I am pleased to discover the Mermaid diagrams animate quite well. This lets the reader walk through the sequence at their own pace, and provides additional opportunity for the author to explain steps in details.

Yes the example is weird but it comes from the Mermaid [documentation](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)`
)}

function _step(Inputs){return(
Inputs.range([0, 6], { step: 1, value: 1, label: "step" })
)}

function _3(step,md){return(
md`## ${
  ["John can react weirdly to small talk", "He met an old friend from school", "John struggled to find words", "But he remembered to focus", "He made a friendly reply", "And passed the good feelings on", "He even made a friend!"][step]
}`
)}

function _4(mermaid,includeIf,step){return(
mermaid`sequenceDiagram
    autonumber
    participant Alice
    participant John
    ${includeIf(
      step > 0,
      `${includeIf(step === 1, `rect rgb(0,255,0)\n`)}
      Alice->>John: Hello John, how are you?
      ${includeIf(step == 1, "\nend")}
      ${includeIf(
        step > 1,
        `loop Healthcheck
        ${includeIf(step === 2, `rect rgb(0, 255, 0)\n`)}
          John->>John: Fight against hypochondri
        ${includeIf(step == 2, "\nend")}
        end
        ${includeIf(
          step > 2,
          `${includeIf(step === 3, `rect rgb(0, 255, 0)\n`)}
            Note right of John: Rational thoughts!
            ${includeIf(step == 3, "\nend")}
          ${includeIf(
            step > 3,
            `${includeIf(step === 4, `rect rgb(0, 255, 0)\n`)}
              John-->>Alice: Great!
              ${includeIf(step == 4, "\nend")}
            ${includeIf(
              step > 4,
              `${includeIf(step === 5, `rect rgb(0, 255, 0)\n`)}
                John->>Bob: How about you?
                ${includeIf(step == 5, "\nend")}
              ${includeIf(
                step > 5,
                `${includeIf(step === 6, `rect rgb(0, 255, 0)\n`)}
                Bob-->>John: Jolly good!
                ${includeIf(step == 6, "\nend")}`
              )}`
            )}`
          )}`
        )}`
      )}`
    )}
`
)}

function _includeIf(){return(
(condition, source) => (condition ? source : "")
)}

function _7(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof step")).define("viewof step", ["Inputs"], _step);
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer()).define(["step","md"], _3);
  main.variable(observer()).define(["mermaid","includeIf","step"], _4);
  main.variable(observer("includeIf")).define("includeIf", _includeIf);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _7);
  return main;
}
