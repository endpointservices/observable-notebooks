import define1 from "./f109935193c0deba@3909.js";
import define2 from "./0e0b35a92c819d94@474.js";
import define3 from "./e3a019069a130d79@6721.js";
import define4 from "./e1c39d41e8e944b0@947.js";

function _1(md){return(
md`# Roboco-op 2 Eval

TODO:

needle_in_haystack:
Get a large notebook and ask it to locate functionality. E.g. Which cell is responsible for opening the code editor on click?`
)}

function _3(Inputs,$0){return(
Inputs.bind(
  Inputs.textarea({
    rows: 100,
    disabled: true
  }),
  $0
)
)}

function _4($0){return(
$0
)}

function _5($0){return(
$0
)}

function _6(background_tasks){return(
background_tasks
)}

function _scores(Inputs){return(
Inputs.input([])
)}

function _runCase(runPrompt,runScore,addResult){return(
async function runCase(caseTask, settings) {
  const response = await runPrompt(caseTask, settings);
  const experiment = await runScore({
    response,
    settings,
    caseTask
  });
  addResult(experiment);
  return response;
}
)}

function _9(md){return(
md`## Experiments`
)}

function _10(Inputs,$0,experiments,runScore,Event){return(
Inputs.button("rescore", {
  reduce: async () => {
    $0.value = await Promise.all(experiments.map(runScore));
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _11(Inputs,experiments){return(
Inputs.table(experiments, {
  columns: ["settings", "response", "caseTask", "score"],
  layout: "auto",
  format: {
    settings: (v) => JSON.stringify(v, null, 2),
    response: (v) => JSON.stringify(v, null, 2),
    caseTask: (v) => JSON.stringify(v, null, 2),
    score: (v) => JSON.stringify(v, null, 2)
  }
})
)}

function _experiments(Inputs){return(
Inputs.input([])
)}

function _addResult($0,Event){return(
function addResult(result) {
  $0.value.push(result);
  $0.dispatchEvent(new Event("input"));
}
)}

function _14(md){return(
md`## Score Task`
)}

function _runScore(observable,compile){return(
async ({ settings, response, caseTask } = {}) => {
  const scoreTask = { settings, response, caseTask };
  const embedded_runtime = new observable.Runtime();
  const embedded_main = embedded_runtime.module();
  let compile_or_null = null,
    apply_or_null = null,
    check_or_null = null;
  try {
    compile_or_null = scoreTask.response.cells.map((cell) =>
      compile(cell.code)
    );
    const vars = compile_or_null.map((variables) =>
      variables.map((v) => {
        let _fn;
        eval("_fn = " + v._definition);
        return embedded_main.variable({}).define(v._name, v._inputs, _fn);
      })
    );
    embedded_runtime._computeNow();
    await new Promise((r) => setTimeout(r, 0));
    apply_or_null = vars.flat();

    check_or_null = await scoreTask.caseTask.check(
      embedded_runtime,
      embedded_main,
      apply_or_null,
      scoreTask.response
    );
  } catch (err) {}

  embedded_runtime.dispose();

  return {
    settings: scoreTask.settings,
    caseTask: scoreTask.caseTask,
    response: scoreTask.response,
    score: {
      responded: !!scoreTask.response.cells,
      compiles: !!compile_or_null,
      applies: !!apply_or_null,
      correct: !!check_or_null
    }
  };
}
)}

function _16(md){return(
md`## RunCase`
)}

function _17(Inputs,promptHistory){return(
Inputs.table(promptHistory, {
  layout: "auto",
  format: {
    caseTask: (d) => JSON.stringify(d, null, 2),
    settings: (d) => JSON.stringify(d, null, 2),
    response: (d) => JSON.stringify(d, null, 2)
  }
})
)}

function _promptHistory(Inputs){return(
Inputs.input([])
)}

function _runPrompt(buildMessages,$0,runAsk,$1,Event){return(
async (caseTask, settings) => {
  const promptTask = { caseTask: caseTask, settings };
  const messages = await buildMessages($0.value, promptTask);
  const response = await runAsk({
    settings: $0.value,
    messages
  });
  $1.value.push({
    ...promptTask,
    response
  });
  $1.dispatchEvent(new Event("input"));
  return response;
}
)}

function _buildMessages($0){return(
async (llm_settings, promptTask) => [
  {
    role: llm_settings.model.startsWith("o1") ? "user" : "system",
    content: promptTask.settings.system_prompt || $0.value
  },
  ...(await promptTask.caseTask.context()),
  {
    role: "user",
    content: promptTask.caseTask.query
  }
]
)}

function _21(md){return(
md`## Cases`
)}

function _22(Inputs,cases,runCase){return(
Inputs.table(
  [...cases.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((evalCase) => ({
      ...evalCase,
      run: Inputs.button("run", {
        reduce: () => runCase(evalCase, {})
      })
    })),
  {
    columns: ["name", "query", "context", "run"],
    format: { run: (r) => r }
  }
)
)}

function _cases(Inputs){return(
Inputs.input(new Map())
)}

function _Case($0,Event){return(
class Case {
  constructor({
    invalidation,
    name,
    query,
    context = () => [],
    check = () => true
  } = {}) {
    this.name = name;
    this.query = query;
    this.context = context;
    this.check = check;

    $0.value.set(this.name, this);
    $0.dispatchEvent(new Event("input"));
    invalidation.then(() => {
      $0.value.delete(this.name);
      $0.dispatchEvent(new Event("input"));
    });
  }
}
)}

function _assign_literal(Case,invalidation){return(
new Case({
  invalidation,
  name: "assign a syncronous literal number",
  query: "create a cell x whose value is 42",
  context: async () => [],
  check: async (runtime, main) =>
    main._scope.get("x")._promise.then((v) => v == 42)
})
)}

function _say_hello(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "say hello",
  query: "say hello",
  context: async () => [],
  check: async (runtime, main, variables) => {
    return variables.length == 1 && variables[0]._value instanceof HTMLElement;
  }
})
)}

function _create_login_form(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "login form",
  query: "create a username and password form",
  context: async () => [],
  check: async (runtime, main, variables, response) =>
    variables.length == 1 && variables[0]._value instanceof HTMLElement
})
)}

function _create_toogle_form(Case,invalidation,HTMLElement,Inputs){return(
new Case({
  invalidation,
  name: "toggle value",
  query: "create a checkbox for the value ready",
  context: async () => [],
  check: async (runtime, main, variables, response) =>
    variables.length == 1 &&
    variables[0]._value instanceof HTMLElement &&
    variables[0]._name == "viewof ready" &&
    variables[0]._definition.toString().includes(Inputs.checkbox)
})
)}

function _load_all(assign_literal,say_hello,create_login_form,create_toogle_form,background_tasks)
{
  assign_literal, say_hello, create_login_form, create_toogle_form;
  background_tasks;
}


function _30(md){return(
md`## Libs`
)}

function _observable(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.import("background_tasks", child1);
  main.import("viewof system_prompt", child1);
  main.import("system_prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("runAsk", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.variable(observer()).define(["Inputs","viewof system_prompt"], _3);
  main.variable(observer()).define(["viewof suggestion"], _4);
  main.variable(observer()).define(["viewof context_viz"], _5);
  main.variable(observer()).define(["background_tasks"], _6);
  main.variable(observer("viewof scores")).define("viewof scores", ["Inputs"], _scores);
  main.variable(observer("scores")).define("scores", ["Generators", "viewof scores"], (G, _) => G.input(_));
  main.variable(observer("runCase")).define("runCase", ["runPrompt","runScore","addResult"], _runCase);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Inputs","viewof experiments","experiments","runScore","Event"], _10);
  main.variable(observer()).define(["Inputs","experiments"], _11);
  main.variable(observer("viewof experiments")).define("viewof experiments", ["Inputs"], _experiments);
  main.variable(observer("experiments")).define("experiments", ["Generators", "viewof experiments"], (G, _) => G.input(_));
  main.variable(observer("addResult")).define("addResult", ["viewof experiments","Event"], _addResult);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("runScore")).define("runScore", ["observable","compile"], _runScore);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Inputs","promptHistory"], _17);
  main.variable(observer("viewof promptHistory")).define("viewof promptHistory", ["Inputs"], _promptHistory);
  main.variable(observer("promptHistory")).define("promptHistory", ["Generators", "viewof promptHistory"], (G, _) => G.input(_));
  main.variable(observer("runPrompt")).define("runPrompt", ["buildMessages","viewof settings","runAsk","viewof promptHistory","Event"], _runPrompt);
  main.variable(observer("buildMessages")).define("buildMessages", ["viewof system_prompt"], _buildMessages);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["Inputs","cases","runCase"], _22);
  main.variable(observer("viewof cases")).define("viewof cases", ["Inputs"], _cases);
  main.variable(observer("cases")).define("cases", ["Generators", "viewof cases"], (G, _) => G.input(_));
  main.variable(observer("Case")).define("Case", ["viewof cases","Event"], _Case);
  main.variable(observer("assign_literal")).define("assign_literal", ["Case","invalidation"], _assign_literal);
  main.variable(observer("say_hello")).define("say_hello", ["Case","invalidation","HTMLElement"], _say_hello);
  main.variable(observer("create_login_form")).define("create_login_form", ["Case","invalidation","HTMLElement"], _create_login_form);
  main.variable(observer("create_toogle_form")).define("create_toogle_form", ["Case","invalidation","HTMLElement","Inputs"], _create_toogle_form);
  main.variable(observer("load_all")).define("load_all", ["assign_literal","say_hello","create_login_form","create_toogle_form","background_tasks"], _load_all);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("observable")).define("observable", _observable);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  const child3 = runtime.module(define3);
  main.import("compile", child3);
  const child4 = runtime.module(define4);
  main.import("runtime", child4);
  return main;
}
