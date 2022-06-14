// https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams@185
import define1 from "./293899bef371e135@267.js";

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

function _4(steppedMermaid,step){return(
steppedMermaid(step, `
sequenceDiagram
  autonumber
  participant Alice
  participant John

  %% step %%
  Alice->>John: Hello John, how are you?
      
  %% step %%
  loop Healthcheck
    John->>John: Fight against hypochondria
  end
  
  %% step %%
  Note right of John: Rational thoughts!

  %% step %%
  John-->>Alice: Great!
  
  %% step %%
  John->>Bob: How about you?
  
  %% step %%
  Bob-->>John: Jolly good!
`)
)}

function _5(md){return(
md`The [original version](https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams@109) of this notebook just used the \`?\` operator against the \`step\` value on the mermaid source code to create the animation effect. This annoyed people because the source was very messy, but then [@mootari](/@mootari) helpfully donated the following helper: `
)}

function _steppedMermaid(mermaid){return(
function steppedMermaid(index, markup) {
  const steps = markup.split(/\n\s*%% *step *%% *\n/).slice(0, index + 1);
  const n = steps.length - 1;
  if(n > 0) steps[n] = `rect rgb(0, 255, 0)\n${steps[n]}\nend\n`;
  return mermaid`${steps.join('\n')}`;
}
)}

function _7(md){return(
md`However, don't get hung up on the specifics of the helper. I imagine most deployments of this effect will need their set of own abstraction to help mutate the mermaid source, so don't feel restricted by it. You can highlight whatever boxes you like with rect! It's just string manipulation.`
)}

function _9(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof step")).define("viewof step", ["Inputs"], _step);
  main.variable(observer("step")).define("step", ["Generators", "viewof step"], (G, _) => G.input(_));
  main.variable(observer()).define(["step","md"], _3);
  main.variable(observer()).define(["steppedMermaid","step"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("steppedMermaid")).define("steppedMermaid", ["mermaid"], _steppedMermaid);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _9);
  return main;
}
