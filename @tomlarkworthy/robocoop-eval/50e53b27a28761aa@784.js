import define1 from "./26b0ee4d8f136fca@377.js";
import define2 from "./b964abe9346c2831@1125.js";
import define3 from "./64057d42235a0057@2913.js";
import define4 from "./10c7899865f8a76e@8998.js";
import define5 from "./ee79b1fa5101d6d9@3298.js";
import define6 from "./50e53b27a28761aa@784.js";

function _1(md){return(
md`# Trying out "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning"
## https://arxiv.org/abs/2507.19457 25 Jul 2025
_Lakshya A Agrawal, Shangyin Tan, Dilara Soylu, Noah Ziems, Rishi Khare, Krista Opsahl-Ong, Arnav Singhvi, Herumb Shandilya, Michael J Ryan, Meng Jiang, Christopher Potts, Koushik Sen, Alexandros G. Dimakis, Ion Stoica, Dan Klein, Matei Zaharia, Omar Khattab_ -- UC Berkeley, Stanford University, BespokeLabs.ai, Databricks, MIT`
)}

function _2(md){return(
md`## Replicating GEPA

LLMs are powerful, but performance hinges on the prompt. I wanted to explore GEPA (Genetic-Pareto) as a method for optimizing prompts. I liked this algorithm because it’s easy to implement and leverages an LLM’s own understanding of natural language. It’s quite different from gradient ascent or other numerical approaches.

The main component is reflection: run a candidate prompt on all your tasks and record diagnostic information—reasoning traces, tool outputs, explanations of scores, and error messages (e.g., syntax errors that block execution). Then ask the LLM to improve the prompt based on that information — “mutate” it in genetic algorithm speak.

The second component is orchestrating reflection at scale. This uses simple numerics: for each task, assign a numeric score. If you have t tasks, each candidate prompt has t scores (a.k.a. multi-variate optimization). Maintain a pool of candidate prompts (initially size 1). Select the best-scoring prompts—the Pareto front of the multi-variate scores (code [here](https://observablehq.com/@tomlarkworthy/gepa#paretoFront)) — and generate improvements to add back into the pool.

That’s it. After a few generations, you’ll have much-improved prompts. I tested this using simple evals I had built for a coding assistant and did only 4 generations.
`
)}

function _3(md){return(
md`
### Seed prompt (human made)
\`\`\`
Respond in Observable Javascript (Notebook 1.0) inside an
XML code tag to solve the question.
for example
<cell>
<inputs></inputs>
<code><![CDATA[
x = 'string'
]]></code>
</cell>
\`\`\``
)}

function _4(md){return(
md`
### Evolved Prompt (made by GEPA)
\`\`\`
SCORE: 1,1,1,1,1,1,0.8,1
PROMPT: 
Respond only with XML containing Observable JavaScript (Notebook 1.0) cell blocks that solve the user’s task. Unless the user explicitly asks for multiple cells, return exactly one <cell>.

Cell format:
<cell>
  <inputs>COMMA-SEPARATED, ALPHABETICALLY SORTED, DEDUPED LIST OF EXTERNAL IDENTIFIERS USED BY THIS CELL (NO SPACES)</inputs>
  <code><![CDATA[
    Observable JavaScript for this cell (bare assignments only; no top-level const/let/var/class/import/require/function)
  ]]></code>
</cell>

Binding policy:
- Only create a named binding when the user specifies a variable name. If no name is requested, return an anonymous expression (e.g., md\`...\`, html\`...\`, Plot.plot(...), a DOM node, or a literal value) without inventing a variable.
- If the user requests an interactive control “bound to NAME” or says “viewof NAME”, define viewof NAME exactly. Otherwise, do not introduce viewof.

Authoring rules:
- Use bare assignment for all bindings (e.g., x = 42, f = (a, b) => a + b). No top-level declarations (const/let/var/class/function), no imports/requires, no runtimes, no <imports>.
- Prefer returning a value or DOM node (md, html, svg, Inputs, Plot) over side effects. Do not use console.log, alert, or document.write.
- Block cells ({ ... }) must return a value to set the cell’s value.
- Use Observable’s built-ins/globals directly and include each referenced identifier in <inputs>: html, svg, md, Inputs, Plot, d3, FileAttachment, DOM, width, Mutable, Generators, now, Event, document, window, URL, URLSearchParams, fetch, FormData, File, setTimeout, setInterval, clearTimeout, clearInterval, AbortController, IntersectionObserver, ResizeObserver, etc.
- List every external identifier referenced by this cell in <inputs>. Do not list variables defined by this cell. Deduplicate, sort alphabetically, and use no spaces (comma-separated). If none, use an empty <inputs></inputs> exactly.
- If the user asks to “use X” (e.g., d3, Plot, Inputs, fetch), actually reference X in code and include X in <inputs>.
- Avoid non-determinism unless requested. Prefer deterministic defaults; if time is needed, use now (and include now in <inputs>) rather than Date.now or new Date().
- Accessibility: provide labels for interactive controls. For Inputs.* use {label: "..."}. For custom controls, include an accessible label (e.g., aria-label on a button or a <label> element).
- Custom inputs: keep element.value up to date and dispatch new Event("input", {bubbles: true}) on change. Include Event (and any other globals used, e.g., FormData) in <inputs>.
- Use top-level await only when required (e.g., FileAttachment, fetch). Avoid unnecessary async wrappers.
- Do not reference undeclared names. If the task depends on prior variables not provided, implement a self-contained solution within the single cell.
- Avoid the literal CDATA terminator sequence inside code; if needed, split it (e.g., "]] ]>" as "]] ]" + ">").
- Match requested variable names exactly (including viewof names). Do not create both viewof x and x = viewof x unless explicitly requested; reference the requested name directly elsewhere.
- When producing plots, return the figure node (e.g., Plot.plot({...})) and include Plot in <inputs>; consider width for responsive sizing if appropriate (and include width in <inputs> if used).
- Output only the cell block(s)—no prose, no code fences, no JSON outside <cell>.

Usage guidance:
- d3: call d3.* and include d3 in <inputs> when used.
- Plot: call Plot.* and include Plot in <inputs>; prefer Plot.plot({...}) to produce a node.
- html/svg/md/Inputs: include the identifier in <inputs> when used.
- Include each browser/global you reference: FileAttachment/DOM/width/now/Event/document/window/URL/URLSearchParams/fetch/FormData/File/AbortController/etc.

UI control snippets (when asked):
- viewof ready = Inputs.toggle({label: "Ready?", value: false})
- viewof rgb = Inputs.select(["red", "green", "blue"], {label: "Color"})

Examples:
- Assign a number
<cell>
  <inputs></inputs>
  <code><![CDATA[
  x = 42
  ]]></code>
</cell>

- Say hello (anonymous, no binding invented)
<cell>
  <inputs>md</inputs>
  <code><![CDATA[
  md\`hello\`
  ]]></code>
</cell>

- Sum using d3
<cell>
  <inputs>d3</inputs>
  <code><![CDATA[
  sum = d3.sum([1, 2, 3, 4, 5])
  ]]></code>
</cell>

- Toggle value (binding requested)
<cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof ready = Inputs.toggle({label: "Ready?", value: false})
  ]]></code>
</cell>

- Dropdown bound to rgb (binding requested)
<cell>
  <inputs>Inputs</inputs>
  <code><![CDATA[
  viewof rgb = Inputs.select(["red","green","blue"], {label: "Color"})
  ]]></code>
</cell>

- Counter button (custom; accessible; note Event in inputs; binding requested)
<cell>
  <inputs>Event,html</inputs>
  <code><![CDATA[
  viewof count = {
    const button = html\`<button type="button" aria-label="Increment count">Count: 0</button>\`;
    button.value = 0;
    button.addEventListener("click", () => {
      button.value++;
      button.textContent = \`Count: \${button.value}\`;
      button.dispatchEvent(new Event("input", {bubbles: true}));
    });
    return button;
  }
  ]]></code>
</cell>

- Simple Plot (anonymous; no binding invented)
<cell>
  <inputs>Plot</inputs>
  <code><![CDATA[
  Plot.plot({marks: [Plot.barY([{x:"A",y:3},{x:"B",y:5}], {x:"x", y:"y"})]})
  ]]></code>
</cell>

- Load CSV via FileAttachment
<cell>
  <inputs>FileAttachment</inputs>
  <code><![CDATA[
  data = await FileAttachment("data.csv").csv()
  ]]></code>
</cell>

- Fetch JSON (note fetch and URL)
<cell>
  <inputs>URL,fetch</inputs>
  <code><![CDATA[
  data = await (await fetch(new URL("https://api.example.com/data.json"))).json()
  ]]></code>
</cell>

- Username/password form (anonymous when no binding is requested; accessible)
<cell>
  <inputs>Event,FormData,html</inputs>
  <code><![CDATA[
  {
    const form = html\`<form style="display:flex;flex-direction:column;gap:0.5em;max-width:300px">
      <label>Username: <input name="username" required autocomplete="username"></label>
      <label>Password: <input name="password" type="password" required autocomplete="current-password"></label>
      <button type="submit">Sign in</button>
    </form>\`;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      form.value = {username: data.get("username"), password: data.get("password")};
      form.dispatchEvent(new Event("input", {bubbles: true}));
    });
    return form;
  }
  ]]></code>
</cell>

Validation checklist before responding:
- Exactly one <cell> unless the user explicitly requested multiple.
- Only create named bindings when requested; otherwise return an anonymous expression.
- Every external identifier used by the code appears in <inputs>, deduped, alphabetically sorted, comma-separated, and with no spaces.
- No imports/requires/console.log or top-level const/let/var/class/function.
- Variable and viewof names match the request exactly.
- No undeclared references; self-contained if prior context is missing.
- Block cells return a value.
- Code does not include the CDATA terminator sequence.
- Output is only XML cell block(s)—no extra text.
- No unused identifiers in <inputs>.
- If the prompt asks to “use X”, X is referenced in code and included in <inputs>.
\`\`\``
)}

function _5(md){return(
md`## Tasks

The tasks used to evaluate are found in [@tomlarkworthy/robocoop-eval](https://observablehq.com/@tomlarkworthy/robocoop-eval). They are 8 very simple Observable coding challenges`
)}

function _6(md){return(
md`## Noted on implementation

No cross-over was used.

We enabled websearch when reflecting on a new prompt (code [here](https://observablehq.com/@tomlarkworthy/gepa#reflectFn)). This was important because the LLM was able to source actual documentation on the Observable programming model when trying to fix misunderstandings.

`
)}

async function _7(FileAttachment,md){return(
md`## Critique

#### Overfitting
The run definitely overfitted to the evals, and many of its "examples" were direct solutions. The paper itself used a validation set to stop overfitting which I did not replicate. Even so, its quite impressive that it did figure out solutions still, it doesn't really know Observable Javascript idioms so it figured out those examples by itself! I think the real solution to overfitting is more and better eval tasks.

#### Introns

Sometimes the prompt will includes some totally pointless junk that is not useful. For example, on one run the whole pool got contaminated with adding cell type attributes to the cell tag e.g.
\`\`\`
<code type="solution"
</code>
\`\`\`
That has no effect in the system but these benign mutations don't have a mechanism for removal. In the above example it provides plot examples, but there are no eval task testing plot usage so those examples might be wrong! In production I would pass the final solution through an expect to trim the prompt of extras.

#### Diagnostics Traces

The GEPA algorithm is very simple and took about 1 hour to write with an LLM. However, the real brains to the system is the feedback emitted during evaluation of a prompt. The LLM cannot successful reflect unless there is clear reasons why a low score occurred. This got much more detailed than I originally anticipated, for example, surfacing syntax errors and runtime errors. By a large margin most of the time was spend on trace design and improving the tasks in the eval.

#### Costs

In total I spent $62 in API calls. This includes numerous failed runs. I think 1 run of GEPA on this tasks costs < $5. I use o4-mini as the coder, although this executes a lot it costs less than $0.1. The main driver of cost was the reflect function's o5 output tokens, spent as reasoning tokens ($50), websearch tool costs were only $1.70 and input tokens $7.1.

![image@1.png](${await FileAttachment("image@1.png").url()})

Once the scores and evals were engineered properly the GEPA algorithm was reliably able to improve the prompt to get good scores. So overall its a winner! `
)}

function _8(md){return(
md`---

For the rest of the notebook to run you need to enter a "OPENAI_API_KEY" in the Robocoop 2.0 modal, but you can take the algorithm and rewire it to something else if you don't want to run *this* particular experiment.`
)}

function _run_example(Inputs){return(
Inputs.toggle({
  label: "run GEPA"
})
)}

function _10(renderHierarchy,svg,width,heirachy){return(
renderHierarchy(svg`<svg width="${width}px"></svg>`, heirachy)
)}

function _11(md){return(
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

function _14(md){return(
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

function _18(md){return(
md`### LLM integration (callFn)`
)}

function _callFn(runPrompt){return(
async function callFn(prompt, task) {
  const output = await runPrompt(task, {
    system_prompt: prompt
  });
  output.trace = `USER: ${task.query}\nLLM: ${JSON.stringify(
    output.response
  )}\nASSISTANT: ${JSON.stringify(output.cells, null, 2)}`;
  return output;
}
)}

function _21(md){return(
md`#### test callFn`
)}

async function _test_callFn(callFn,system_prompt,assign_literal,expect,seed_prompt)
{
  const output = await callFn(system_prompt, assign_literal);
  expect(output.cells.length).toBeGreaterThan(0);
  expect(output.trace.length).toBeGreaterThan(0);
  return {
    seed_prompt,
    ...output
  };
}


function _23(test_callFn){return(
test_callFn.trace
)}

function _24(md){return(
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
    (experiment.score.correct ? 1 : 0) +
    (experiment.score.errors.length == 0 ? 1 : 0);
  return {
    score: overall / 5.0,
    trace: JSON.stringify(experiment.score, null, 2)
  };
}
)}

async function _test_scoreFn(test_callFn,scoreFn,assign_literal)
{
  const output = test_callFn;
  const scoreResponse = await scoreFn(output, assign_literal);

  return scoreResponse.trace;
}


function _buildEvalFn(){return(
function buildEvalFn({ tasks, callFn, scoreFn, aggregator = (s) => s }) {
  return async function evalFn(prompt) {
    const taskScores = [];
    const traceParts = [];
    const outputs = [];
    await Promise.all(
      tasks.map(async (task) => {
        const output = await callFn(prompt, task);
        const score = await scoreFn(output, task);
        outputs.push(output);
        taskScores.push(score.score);
        traceParts.push(
          `TASK: ${task.name}\nSCORE: ${score.trace}\nOVERALL: ${score.score}\nTRACE: ${output.trace}\n`
        );
      })
    );
    const scores = aggregator(taskScores);
    return { scores, outputs, trace: traceParts.join("\n---\n") };
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

async function _test_evalFn(evalFn,seed_prompt,expect,cases)
{
  const result = await evalFn(seed_prompt);
  expect(result.scores.length).toEqual([...cases.values()].length);
  expect(result.trace).toBeDefined();
  return result;
}


function _30(test_evalFn){return(
test_evalFn.trace
)}

function _31(md){return(
md`## Reflection

Learning how to answer the prompt requires research, so the reflect function first uses a web tool and then answers with an improved prompt.`
)}

function _reflectFn(responses){return(
async function reflectFn(prompt, trace) {
  const sys = `You are a prompt‑engineer AI. You will be improving the performance of a prompt by considering recent executions of that prompt against a variate of tasks that were asked by a user. You need to look for ways to improve the SCORE by considering recent executions using that prompt and doing web research on the domain.

Your tasks is to improve the CURRENT PROMPT.
You will be given traces of several TASKS using the CURRENT PROMPT
and then respond only with the text of the improved using the improve_prompt tool`;
  const research_msg = `Generate some ideas on how how this prompt might be improved, perhaps using web research\nCURRENT PROMPT:\n${prompt}\n${trace}`;
  const research_response = await responses({
    model: "gpt-5",
    instructions: sys,
    input: research_msg,
    tool_choice: "auto",
    tools: [{ type: "web_search_preview" }]
  });

  const improve_msg = `Now suggest a candidate prompt improvement`;
  const prompt_improvement_response = await responses({
    model: "gpt-5",
    input: improve_msg,
    previous_response_id: research_response.id,
    tool_choice: "required",
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
  return prompt_improvement_response.output.at(-1).arguments.improved_prompt;
}
)}

function _test_reflectFunction(reflectFn,system_prompt,test_evalFn)
{
  const reflection = reflectFn(system_prompt, test_evalFn.trace);

  return reflection;
}


function _34(md){return(
md`## Run GEPA`
)}

function _seed_prompt(){return(
`Respond in Observable Javascript (Notebook 1.0) inside an XML code tag to solve the question. for example
<cell>
<inputs></inputs>
<code><![CDATA[
x = 'string'
]]></code>
</cell>`
)}

function _test_gepa_initialization(GEPA,seed_prompt,evalFn,reflectFn)
{
  const state = new GEPA({
    initialPrompts: [seed_prompt],
    evalFn,
    reflectFn,
    populationSize: undefined,
    children: undefined,
    generations: undefined
  });
  return state;
}


function _test_gepa_initialize(run_example,initialize,test_gepa_initialization){return(
run_example && initialize(test_gepa_initialization)
)}

function _pInit(recordFront,paretoFront,test_gepa_initialize){return(
recordFront(paretoFront(test_gepa_initialize.population))
)}

function _39(printFront,pInit){return(
printFront(pInit)
)}

function _test_gepa_step_0(step,test_gepa_initialization){return(
step(test_gepa_initialization)
)}

function _p0(recordFront,paretoFront,test_gepa_step_0){return(
recordFront(paretoFront(test_gepa_step_0.population))
)}

function _42(printFront,p0){return(
printFront(p0)
)}

function _test_gepa_step_1(step,test_gepa_step_0){return(
step(test_gepa_step_0)
)}

function _p1(recordFront,paretoFront,test_gepa_step_1){return(
recordFront(paretoFront(test_gepa_step_1.population))
)}

function _45(printFront,p1){return(
printFront(p1)
)}

function _test_gepa_step_2(step,test_gepa_step_1){return(
step(test_gepa_step_1)
)}

function _p2(recordFront,paretoFront,test_gepa_step_2){return(
recordFront(paretoFront(test_gepa_step_2.population))
)}

function _48(printFront,p2){return(
printFront(p2)
)}

function _test_gepa_step_3(step,test_gepa_step_2){return(
step(test_gepa_step_2)
)}

function _p3(recordFront,paretoFront,test_gepa_step_3){return(
recordFront(paretoFront(test_gepa_step_3.population))
)}

function _51(printFront,p3){return(
printFront(p3)
)}

function _test_gepa_step_4(step,test_gepa_step_3){return(
step(test_gepa_step_3)
)}

function _p4(recordFront,paretoFront,test_gepa_step_4){return(
recordFront(paretoFront(test_gepa_step_4.population))
)}

function _54(printFront,p4){return(
printFront(p4)
)}

function _printFront(Inputs){return(
(front) =>
  Inputs.textarea({
    rows: 100,
    value: front
      .map(
        (s) =>
          `SCORE: ${s.scores}\nPROMPT: \n${s.prompt}\nTRACE:\n\n${s.trace}\n`
      )
      .join("")
  })
)}

function _recordFront($0,Event){return(
function recordFront(front) {
  $0.value.push(front);
  $0.dispatchEvent(new Event("input"));
  return front;
}
)}

function _generations(Inputs){return(
Inputs.input([])
)}

function _58(generations){return(
generations
)}

function _toHierarchy(){return(
function toHierarchy(generations) {
  // Map candidates to node shells
  const nodeMap = new Map();
  generations.flat().forEach((c) => {
    nodeMap.set(c, { name: c.scores.join(","), data: c, children: [] });
  });
  // Wire up children
  generations.flat().forEach((c) => {
    if (c.parent && nodeMap.has(c.parent)) {
      nodeMap.get(c.parent).children.push(nodeMap.get(c));
    }
  });
  // Roots = generation 0
  const roots = generations[0].map((c) => nodeMap.get(c));
  return roots.length === 1 ? roots[0] : { name: "root", children: roots };
}
)}

function _heirachy(toHierarchy,generations){return(
toHierarchy([generations.at(-1)])
)}

function _61(renderHierarchy,svg,width,heirachy){return(
renderHierarchy(svg`<svg width="${width}px"></svg>`, heirachy)
)}

function _renderHierarchy(d3){return(
function renderHierarchy(
  svg,
  data,
  {
    nodeWidth = 20,
    levelGap = 30,
    separation = (a, b) => (a.parent === b.parent ? 1 : 2),
    nodeRadius = 10,
    marginTop = 0
  } = {}
) {
  // Lazy load d3 from global if not imported

  const root = d3.hierarchy(data);
  d3.tree().nodeSize([nodeWidth, levelGap]).separation(separation)(root);
  const xMin = Math.min(...root.descendants().map((d) => d.x)) - nodeWidth;
  const xMax = Math.max(...root.descendants().map((d) => d.x)) + nodeWidth;
  const yMin = Math.min(...root.descendants().map((d) => d.y)) - nodeWidth;
  const yMax = Math.max(...root.descendants().map((d) => d.y)) + nodeWidth;
  const g = d3
    .select(svg)
    .attr("viewBox", [xMin, yMin, xMax - xMin, yMax - yMin]);

  // links
  g.selectAll("path.link")
    .data(root.links())
    .join("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#999")
    .attr(
      "d",
      (d) =>
        `M${d.source.x},${d.source.y}V${(d.source.y + d.target.y) / 2}H${
          d.target.x
        }V${d.target.y}`
    );

  // nodes
  const node = g
    .selectAll("g.node")
    .data(root.descendants())
    .join("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  node
    .append("circle")
    .attr("r", nodeRadius)
    .attr("fill", "#fff")
    .attr("stroke", "#333");

  node
    .append("text")
    .attr("dy", 1)
    .attr("font-size", 3)
    .attr("text-anchor", "middle")
    .text((d) => d.data.name);
  return svg;
}
)}

function _63(md){return(
md`## Evals`
)}

function _data(cases){return(
[...cases.values()]
)}

function _66(Inputs,data){return(
Inputs.table(data, {
  layout: "auto"
})
)}

function _67(md){return(
md`# Dev tools`
)}

function _68(ui,md){return(
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

function _73(exporter){return(
exporter()
)}

function _77(load_all){return(
load_all
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/d01f33e522e8e15412b1c2e319f8dfad08f38a2dff95dd1d3a03e3a2017bc79e2bcccb1e31a0f91c5ff46dbd7c7ac16dbda292ab6e7d2a8473efca9bfcc7a37c.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["FileAttachment","md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof run_example")).define("viewof run_example", ["Inputs"], _run_example);
  main.variable(observer("run_example")).define("run_example", ["Generators", "viewof run_example"], (G, _) => G.input(_));
  main.variable(observer()).define(["renderHierarchy","svg","width","heirachy"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("dominates")).define("dominates", _dominates);
  main.variable(observer("paretoFront")).define("paretoFront", ["dominates"], _paretoFront);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("GEPA")).define("GEPA", _GEPA);
  main.variable(observer("initialize")).define("initialize", _initialize);
  main.variable(observer("step")).define("step", ["paretoFront"], _step);
  main.variable(observer()).define(["md"], _18);
  const child1 = runtime.module(define1);
  main.import("responses", child1);
  main.variable(observer("callFn")).define("callFn", ["runPrompt"], _callFn);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("test_callFn")).define("test_callFn", ["callFn","system_prompt","assign_literal","expect","seed_prompt"], _test_callFn);
  main.variable(observer()).define(["test_callFn"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("scoreFn")).define("scoreFn", ["runScore"], _scoreFn);
  main.variable(observer("test_scoreFn")).define("test_scoreFn", ["test_callFn","scoreFn","assign_literal"], _test_scoreFn);
  main.variable(observer("buildEvalFn")).define("buildEvalFn", _buildEvalFn);
  main.variable(observer("evalFn")).define("evalFn", ["buildEvalFn","cases","callFn","scoreFn"], _evalFn);
  main.variable(observer("test_evalFn")).define("test_evalFn", ["evalFn","seed_prompt","expect","cases"], _test_evalFn);
  main.variable(observer()).define(["test_evalFn"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("reflectFn")).define("reflectFn", ["responses"], _reflectFn);
  main.variable(observer("test_reflectFunction")).define("test_reflectFunction", ["reflectFn","system_prompt","test_evalFn"], _test_reflectFunction);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("seed_prompt")).define("seed_prompt", _seed_prompt);
  main.variable(observer("test_gepa_initialization")).define("test_gepa_initialization", ["GEPA","seed_prompt","evalFn","reflectFn"], _test_gepa_initialization);
  main.variable(observer("test_gepa_initialize")).define("test_gepa_initialize", ["run_example","initialize","test_gepa_initialization"], _test_gepa_initialize);
  main.variable(observer("pInit")).define("pInit", ["recordFront","paretoFront","test_gepa_initialize"], _pInit);
  main.variable(observer()).define(["printFront","pInit"], _39);
  main.variable(observer("test_gepa_step_0")).define("test_gepa_step_0", ["step","test_gepa_initialization"], _test_gepa_step_0);
  main.variable(observer("p0")).define("p0", ["recordFront","paretoFront","test_gepa_step_0"], _p0);
  main.variable(observer()).define(["printFront","p0"], _42);
  main.variable(observer("test_gepa_step_1")).define("test_gepa_step_1", ["step","test_gepa_step_0"], _test_gepa_step_1);
  main.variable(observer("p1")).define("p1", ["recordFront","paretoFront","test_gepa_step_1"], _p1);
  main.variable(observer()).define(["printFront","p1"], _45);
  main.variable(observer("test_gepa_step_2")).define("test_gepa_step_2", ["step","test_gepa_step_1"], _test_gepa_step_2);
  main.variable(observer("p2")).define("p2", ["recordFront","paretoFront","test_gepa_step_2"], _p2);
  main.variable(observer()).define(["printFront","p2"], _48);
  main.variable(observer("test_gepa_step_3")).define("test_gepa_step_3", ["step","test_gepa_step_2"], _test_gepa_step_3);
  main.variable(observer("p3")).define("p3", ["recordFront","paretoFront","test_gepa_step_3"], _p3);
  main.variable(observer()).define(["printFront","p3"], _51);
  main.variable(observer("test_gepa_step_4")).define("test_gepa_step_4", ["step","test_gepa_step_3"], _test_gepa_step_4);
  main.variable(observer("p4")).define("p4", ["recordFront","paretoFront","test_gepa_step_4"], _p4);
  main.variable(observer()).define(["printFront","p4"], _54);
  main.variable(observer("printFront")).define("printFront", ["Inputs"], _printFront);
  main.variable(observer("recordFront")).define("recordFront", ["viewof generations","Event"], _recordFront);
  main.variable(observer("viewof generations")).define("viewof generations", ["Inputs"], _generations);
  main.variable(observer("generations")).define("generations", ["Generators", "viewof generations"], (G, _) => G.input(_));
  main.variable(observer()).define(["generations"], _58);
  main.variable(observer("toHierarchy")).define("toHierarchy", _toHierarchy);
  main.variable(observer("heirachy")).define("heirachy", ["toHierarchy","generations"], _heirachy);
  main.variable(observer()).define(["renderHierarchy","svg","width","heirachy"], _61);
  main.variable(observer("renderHierarchy")).define("renderHierarchy", ["d3"], _renderHierarchy);
  main.variable(observer()).define(["md"], _63);
  const child2 = runtime.module(define2);
  main.import("cases", child2);
  main.import("runCase", child2);
  main.import("assign_literal", child2);
  main.import("load_all", child2);
  main.import("system_prompt", child2);
  main.import("runScore", child2);
  main.import("runPrompt", child2);
  main.variable(observer("data")).define("data", ["cases"], _data);
  main.variable(observer()).define(["Inputs","data"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["ui","md"], _68);
  main.variable(observer("sayHello")).define("sayHello", _sayHello);
  main.variable(observer("test_hello")).define("test_hello", ["expect","sayHello"], _test_hello);
  const child3 = runtime.module(define3);
  main.import("ui", child3);
  main.import("failing_tests", child3);
  main.import("expect", child3);
  const child4 = runtime.module(define4);
  main.import("exporter", child4);
  main.variable(observer()).define(["exporter"], _73);
  const child5 = runtime.module(define5);
  main.import("context_menu", child5);
  const child6 = runtime.module(define6);
  main.variable(observer()).define(["load_all"], _77);
  return main;
}
