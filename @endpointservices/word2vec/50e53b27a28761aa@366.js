import define1 from "./26b0ee4d8f136fca@374.js";
import define2 from "./b964abe9346c2831@651.js";
import define3 from "./64057d42235a0057@2907.js";
import define4 from "./03dda470c56b93ff@8378.js";
import define5 from "./ee79b1fa5101d6d9@3281.js";
import define6 from "./50e53b27a28761aa@366.js";

function _1(md){return(
md`# GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning
## https://arxiv.org/abs/2507.19457 25 Jul 2025
Lakshya A Agrawal, Shangyin Tan, Dilara Soylu, Noah Ziems, Rishi Khare, Krista Opsahl-Ong, Arnav Singhvi, Herumb Shandilya, Michael J Ryan, Meng Jiang, Christopher Potts, Koushik Sen, Alexandros G. Dimakis, Ion Stoica, Dan Klein, Matei Zaharia, Omar Khattab`
)}

function _2(md){return(
md`### Math`
)}

function _dominates(){return(
function dominates(a, b) {
  const betterInAny = a.scores.some((v, i) => v > b.scores[i]);
  const notWorse = a.scores.every((v, i) => v >= b.scores[i]);
  return betterInAny && notWorse;
}
)}

function _paretoFront(dominates){return(
function paretoFront(pop) {
  return pop.filter((c) => !pop.some((o) => o !== c && dominates(o, c)));
}
)}

function _5(md){return(
md`## GEPA`
)}

function _GEPA(){return(
class GEPA {
  constructor({
    initialPrompts,
    evalFn,
    reflectFn,
    populationSize = 12,
    children = 2,
    generations = 8
  }) {
    this.evalFn = evalFn;
    this.reflectFn = reflectFn;
    this.populationSize = populationSize;
    this.children = children;
    this.generations = generations;
    this.population = initialPrompts.map((p) => ({
      parent: null,
      prompt: p,
      scores: null,
      trace: ""
    }));
  }
}
)}

function _initialize(){return(
async function initialize(gepa) {
  // evaluate seed prompts
  await Promise.all(
    gepa.population.map(async (c) => {
      const r = await gepa.evalFn(c.prompt);
      c.scores = r.scores;
      c.trace = r.trace;
    })
  );
  return gepa;
}
)}

function _step(paretoFront){return(
async function step(gepa) {
  const frontier = paretoFront(gepa.population);

  const tasks = frontier.flatMap((parent) =>
    Array.from({ length: gepa.children }, async () => {
      try {
        const childPrompt = await gepa.reflectFn(parent.prompt, parent.trace);
        const r = await gepa.evalFn(childPrompt);
        return {
          parent,
          prompt: childPrompt,
          scores: r.scores,
          trace: r.trace
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    })
  );

  const offspring = (await Promise.all(tasks)).filter(Boolean);

  gepa.population = paretoFront([...frontier, ...offspring]);
  if (gepa.population.length > gepa.populationSize)
    gepa.population.length = gepa.populationSize;

  return gepa;
}
)}

function _9(md){return(
md`### LLM integration (callFn)`
)}

function _callFn(runPrompt){return(
async function callFn(prompt, task) {
  const output = await runPrompt(task, {
    system_prompt: prompt
  });
  output.trace = `USER: ${task.query}\nASSISTANT: ${JSON.stringify(
    output.cells,
    null,
    2
  )}`;
  return output;
}
)}

function _12(md){return(
md`#### test callFn`
)}

async function _test_callFn(callFn,system_prompt,assign_literal,expect)
{
  const output = await callFn(system_prompt, assign_literal);
  expect(output.cells.length).toBeGreaterThan(0);
  expect(output.trace.length).toBeGreaterThan(0);
  return {
    system_prompt,
    ...output
  };
}


function _14(test_callFn){return(
test_callFn.trace
)}

function _15(md){return(
md`### Scoring Tasks (scoreFn, evalFn)`
)}

function _scoreFn(runScore){return(
async (output, task) => {
  const experiment = await runScore({
    response: output,
    caseTask: task
  });

  const overall =
    (experiment.score.responded ? 1 : 0) +
    (experiment.score.compiles ? 1 : 0) +
    (experiment.score.applies ? 1 : 0) +
    (experiment.score.correct ? 1 : 0);
  return {
    score: overall / 4.0,
    trace: JSON.stringify(experiment.score, null, 2)
  };
}
)}

async function _test_scoreFn(test_callFn,scoreFn,assign_literal)
{
  const output = test_callFn;
  const scoreResponse = await scoreFn(output, assign_literal);

  return scoreResponse;
}


function _buildEvalFn(){return(
function buildEvalFn({ tasks, callFn, scoreFn, aggregator = (s) => s }) {
  return async function evalFn(prompt) {
    const taskScores = [];
    const traceParts = [];
    await Promise.all(
      tasks.map(async (task) => {
        const output = await callFn(prompt, task);
        const score = await scoreFn(output, task);
        taskScores.push(score.score);
        traceParts.push(
          `TASK: ${task.name}\nSCORE: ${score.trace}\nOVERALL: ${score.score}\nTRACE: ${output.trace}\n`
        );
      })
    );
    const scores = aggregator(taskScores);
    return { scores, trace: traceParts.join("\n---\n") };
  };
}
)}

function _evalFn(buildEvalFn,cases,callFn,scoreFn){return(
buildEvalFn({
  tasks: [...cases.values()],
  callFn,
  scoreFn
})
)}

async function _test_evalFn(evalFn,system_prompt,expect,cases)
{
  const result = await evalFn(system_prompt);
  expect(result.scores.length).toEqual([...cases.values()].length);
  expect(result.trace).toBeDefined();
  return result;
}


function _21(test_evalFn){return(
test_evalFn.trace
)}

function _22(md){return(
md`## Reflection`
)}

function _reflectFn(responses){return(
async function reflectFn(prompt, trace) {
  const sys = `You are a prompt‑engineer AI. You will be improving the performance of a prompt by considering recent executions of that prompt against a variate of tasks that were asked by a user. You need to look for ways to improve the SCORE by considering recent executions using that prompt.

Your tasks is to improve the CURRENT PROMPT.
You will be given traces of several TASKS using the CURRENT PROMPT
and then respond only with the text of the improved`;
  const msg = `CURRENT PROMPT:\n${prompt}\n${trace}\nRewrite the prompt to improve performance.`;
  const response = await responses({
    model: "o3",
    instructions: sys,

    input: msg,
    tool_choice: "required",
    reasoning: {
      effort: "high",
      summary: "auto"
    },
    tools: [
      {
        type: "function",
        name: "improve_prompt",
        strict: true,
        description: "improves the prompt with the given refined prompt",
        parameters: {
          type: "object", // Does not support scalars
          properties: {
            improved_prompt: { type: "string" }
          },
          required: ["improved_prompt"],
          additionalProperties: false
        }
      }
    ]
  });
  return response.output.at(-1).arguments.improved_prompt;
}
)}

function _test_reflectFunction(reflectFn,system_prompt,test_evalFn)
{
  const reflection = reflectFn(system_prompt, test_evalFn.trace);

  return reflection;
}


function _25(md){return(
md`## Run GEPA`
)}

function _test_gepa_initialization(GEPA,system_prompt,evalFn,reflectFn)
{
  const state = new GEPA({
    initialPrompts: [system_prompt],
    evalFn,
    reflectFn,
    populationSize: undefined,
    children: undefined,
    generations: undefined
  });
  return state;
}


function _test_gepa_initialize(initialize,test_gepa_initialization){return(
initialize(test_gepa_initialization)
)}

function _28(paretoFront,test_gepa_initialize){return(
paretoFront(test_gepa_initialize.population)
)}

function _test_gepa_step_0(step,test_gepa_initialization){return(
step(test_gepa_initialization)
)}

function _30(paretoFront,test_gepa_step_0){return(
paretoFront(test_gepa_step_0.population)
)}

function _test_gepa_step_1(step,test_gepa_step_0){return(
step(test_gepa_step_0)
)}

function _32(paretoFront,test_gepa_step_1){return(
paretoFront(test_gepa_step_1.population)
)}

function _test_gepa_step_2(step,test_gepa_step_1){return(
step(test_gepa_step_1)
)}

function _34(paretoFront,test_gepa_step_2){return(
paretoFront(test_gepa_step_2.population)
)}

function _35(md){return(
md`## Eval`
)}

function _37(cases){return(
[...cases.values()]
)}

function _38(md){return(
md`# Dev tools`
)}

function _39(ui,md){return(
md`<div>
  ${ui}
</div>`
)}

function _sayHello()
{
  return "hello";
}


function _test_hello(expect,sayHello){return(
expect(sayHello).toEqual("hello")
)}

function _44(exporter){return(
exporter()
)}

function _46(context_menu){return(
context_menu
)}

function _48(load_all){return(
load_all
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("dominates")).define("dominates", _dominates);
  main.variable(observer("paretoFront")).define("paretoFront", ["dominates"], _paretoFront);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("GEPA")).define("GEPA", _GEPA);
  main.variable(observer("initialize")).define("initialize", _initialize);
  main.variable(observer("step")).define("step", ["paretoFront"], _step);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("responses", child1);
  main.variable(observer("callFn")).define("callFn", ["runPrompt"], _callFn);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("test_callFn")).define("test_callFn", ["callFn","system_prompt","assign_literal","expect"], _test_callFn);
  main.variable(observer()).define(["test_callFn"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("scoreFn")).define("scoreFn", ["runScore"], _scoreFn);
  main.variable(observer("test_scoreFn")).define("test_scoreFn", ["test_callFn","scoreFn","assign_literal"], _test_scoreFn);
  main.variable(observer("buildEvalFn")).define("buildEvalFn", _buildEvalFn);
  main.variable(observer("evalFn")).define("evalFn", ["buildEvalFn","cases","callFn","scoreFn"], _evalFn);
  main.variable(observer("test_evalFn")).define("test_evalFn", ["evalFn","system_prompt","expect","cases"], _test_evalFn);
  main.variable(observer()).define(["test_evalFn"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("reflectFn")).define("reflectFn", ["responses"], _reflectFn);
  main.variable(observer("test_reflectFunction")).define("test_reflectFunction", ["reflectFn","system_prompt","test_evalFn"], _test_reflectFunction);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("test_gepa_initialization")).define("test_gepa_initialization", ["GEPA","system_prompt","evalFn","reflectFn"], _test_gepa_initialization);
  main.variable(observer("test_gepa_initialize")).define("test_gepa_initialize", ["initialize","test_gepa_initialization"], _test_gepa_initialize);
  main.variable(observer()).define(["paretoFront","test_gepa_initialize"], _28);
  main.variable(observer("test_gepa_step_0")).define("test_gepa_step_0", ["step","test_gepa_initialization"], _test_gepa_step_0);
  main.variable(observer()).define(["paretoFront","test_gepa_step_0"], _30);
  main.variable(observer("test_gepa_step_1")).define("test_gepa_step_1", ["step","test_gepa_step_0"], _test_gepa_step_1);
  main.variable(observer()).define(["paretoFront","test_gepa_step_1"], _32);
  main.variable(observer("test_gepa_step_2")).define("test_gepa_step_2", ["step","test_gepa_step_1"], _test_gepa_step_2);
  main.variable(observer()).define(["paretoFront","test_gepa_step_2"], _34);
  main.variable(observer()).define(["md"], _35);
  const child2 = runtime.module(define2);
  main.import("cases", child2);
  main.import("runCase", child2);
  main.import("assign_literal", child2);
  main.import("load_all", child2);
  main.import("system_prompt", child2);
  main.import("runScore", child2);
  main.import("runPrompt", child2);
  main.variable(observer()).define(["cases"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["ui","md"], _39);
  main.variable(observer("sayHello")).define("sayHello", _sayHello);
  main.variable(observer("test_hello")).define("test_hello", ["expect","sayHello"], _test_hello);
  const child3 = runtime.module(define3);
  main.import("ui", child3);
  main.import("failing_tests", child3);
  main.import("expect", child3);
  const child4 = runtime.module(define4);
  main.import("exporter", child4);
  main.variable(observer()).define(["exporter"], _44);
  const child5 = runtime.module(define5);
  main.import("context_menu", child5);
  main.variable(observer()).define(["context_menu"], _46);
  const child6 = runtime.module(define6);
  main.variable(observer()).define(["load_all"], _48);
  return main;
}
