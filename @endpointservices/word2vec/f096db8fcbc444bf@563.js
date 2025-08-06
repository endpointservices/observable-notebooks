import define1 from "./a6a56ee61aba9799@406.js";
import define2 from "./db42ae70222a8b08@1033.js";
import define3 from "./98f34e974bb2e4bc@659.js";
import define4 from "./4c5c2771c502fedd@598.js";
import define5 from "./a2a7845a5e2a5aec@139.js";

function _1(md){return(
md`# Tests`
)}

function _2(tests){return(
tests()
)}

function _3(md){return(
md`## Low Boiler-plate

Any *cell*, that starts with \`test_\` is considered a test, whether in the main notebook or in a dependancy. The cell is considered "passing" if it evaluates to a non-error. Inspired by pytest auto-discovery.


The runner makes no assumption on how you actually test. You could use programatic tests or something more sophisticated like \`expect\`. Just throw something to indicate failure.

You can filter the tests to lower the quantity

\`\`\`js
import {tests} from "@tomlarkworthy/tests"
\`\`\``
)}

function _4(md){return(
md`## Interactive Examples

Demo of the test state is reactive, even with active dataflow.`
)}

function _example_type(Inputs){return(
Inputs.radio(
  ["success", "error", "pending", "changing"],
  {
    label: "case"
  }
)
)}

async function* _test_tests_example(example_type)
{
  switch (example_type) {
    case "error":
      throw "Error";
    case "success":
      yield "Ok";
    case "pending":
      yield new Promise(() => {});
    case "changing":
      while (true) {
        yield Math.random();
        await new Promise((r) => setTimeout(r, 1000));
      }
  }
  yield new Promise(() => {});
}


function _7(md){return(
md`## Testing variables

variables that start with "\`test_\`", sniffed from the runtime, updated reactively`
)}

function _modules(moduleMap,runtime){return(
moduleMap(runtime)
)}

function _testing_variables(scan,$0,modules,_,invalidation){return(
scan({
  view: $0,
  scan: (acc, value) => {
    const test_vars = [...value]
      .filter((v) => typeof v._name == "string" && v._name.startsWith("test_"))
      .map((v) => ({
        name: (modules.get(v._module)?.name || "") + "#" + v._name,
        running: v._reachable,
        variable: v
      }));
    return _.isEqual(acc, test_vars) ? undefined : test_vars;
  },
  invalidation
})
)}

function _10(Inputs,testing_variables){return(
Inputs.table(testing_variables)
)}

function _11(md){return(
md`## UI`
)}

function _isObservable(isOnObservableCom){return(
isOnObservableCom() &&
  !document.baseURI.startsWith(
    "https://observablehq.com/@tomlarkworthy/lopepage"
  )
)}

function _tests(background_task,Inputs,current,url,inspect){return(
({ filter = () => true } = {}) => {
  background_task;
  return Inputs.table(current.filter(filter), {
    rows: Infinity,
    columns: ["name", "state", "value"],
    reverse: true,
    format: {
      state: (state) =>
        state === "fulfilled"
          ? "✅"
          : state === "rejected"
          ? "❌"
          : state === "pending"
          ? "⌛️"
          : "⏸️",
      name: url,
      value: inspect
    },
    width: {
      state: "5%"
    },
    layout: "auto"
  });
}
)}

function _current(testing_variables,latest_state){return(
testing_variables
  .map((testing_variable) => ({
    name: testing_variable.name,
    state: "paused",
    ...latest_state.get(testing_variable.name),
    computed: testing_variable.running
  }))
  .sort((b, a) => {
    // 1) errors first
    if (a.error !== b.error) return a.error ? -1 : 1;
    // 2) “local” names (starting with ‘#’) next
    const aLocal = a.name.startsWith("#");
    const bLocal = b.name.startsWith("#");
    if (aLocal !== bLocal) return aLocal ? -1 : 1;
    // 3) finally, lexicographic by name
    return a.name.localeCompare(b.name);
  })
)}

function _url(isObservable,html,linkTo){return(
(name) => {
  if (isObservable) {
    return html`<a href="/${name}" target="_blank">${name}</a>`;
  } else {
    return html`<a href="${linkTo(name)}">${name}</a>`;
  }
}
)}

function _17(md){return(
md`## Latest State

Variables update reactively, so observers are registered for running testing variables and update the latest state as information arrives. Only applied to running variables.`
)}

function _18(Inputs,latest_state){return(
Inputs.table(
  [...latest_state.entries()].map(([name, state]) => ({
    name,
    ...state
  }))
)
)}

function _latest_state(Inputs){return(
Inputs.input(new Map())
)}

function _observers(){return(
new Map()
)}

function _21(md){return(
md`### Observer syncronization`
)}

function _changes(testing_variables,unorderedSync,observers){return(
testing_variables &&
  unorderedSync(
    testing_variables.filter((v) => v.running),
    [...observers.keys()],
    (a, b) => a.name == b
  )
)}

function _on_add(changes,observers,observe,$0,Event){return(
changes.add.forEach((testing_variable) => {
  observers.set(
    testing_variable.name,
    observe(testing_variable.variable, {
      fulfilled: (value) => {
        $0.value.set(testing_variable.name, {
          state: "fulfilled",
          value: value
        });
        $0.dispatchEvent(new Event("input"));
      },
      pending: (value) => {
        $0.value.set(testing_variable.name, {
          state: "pending"
        });
        $0.dispatchEvent(new Event("input"));
      },
      rejected: (error) => {
        $0.value.set(testing_variable.name, {
          state: "rejected",
          value: error
        });
        $0.dispatchEvent(new Event("input"));
      }
    })
  );
})
)}

function _on_remove(testing_variables,changes,observers,$0,Event)
{
  testing_variables;
  changes.remove.forEach((name) => {
    const current = observers.get(name);
    if (current) {
      current(); // deregister listener
      observers.delete(name);
    }
    $0.value.delete(name);
  });
  $0.dispatchEvent(new Event("input"));
}


function _25(md){return(
md`## Background Tasks`
)}

function _tasks(on_add,on_remove,submit_summary)
{
  on_add;
  on_remove;
  submit_summary;
}


function _background_task(keepalive,testsModule){return(
keepalive(testsModule, "tasks")
)}

function _testsModule(thisModule){return(
thisModule()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tests"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof example_type")).define("viewof example_type", ["Inputs"], _example_type);
  main.variable(observer("example_type")).define("example_type", ["Generators", "viewof example_type"], (G, _) => G.input(_));
  main.variable(observer("test_tests_example")).define("test_tests_example", ["example_type"], _test_tests_example);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("modules")).define("modules", ["moduleMap","runtime"], _modules);
  main.variable(observer("viewof testing_variables")).define("viewof testing_variables", ["scan","viewof runtime_variables","modules","_","invalidation"], _testing_variables);
  main.variable(observer("testing_variables")).define("testing_variables", ["Generators", "viewof testing_variables"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","testing_variables"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("isObservable")).define("isObservable", ["isOnObservableCom"], _isObservable);
  main.variable(observer("tests")).define("tests", ["background_task","Inputs","current","url","inspect"], _tests);
  main.variable(observer("current")).define("current", ["testing_variables","latest_state"], _current);
  const child1 = runtime.module(define1);
  main.import("linkTo", child1);
  main.variable(observer("url")).define("url", ["isObservable","html","linkTo"], _url);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["Inputs","latest_state"], _18);
  main.variable(observer("viewof latest_state")).define("viewof latest_state", ["Inputs"], _latest_state);
  main.variable(observer("latest_state")).define("latest_state", ["Generators", "viewof latest_state"], (G, _) => G.input(_));
  main.variable(observer("observers")).define("observers", _observers);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("changes")).define("changes", ["testing_variables","unorderedSync","observers"], _changes);
  main.variable(observer("on_add")).define("on_add", ["changes","observers","observe","viewof latest_state","Event"], _on_add);
  main.variable(observer("on_remove")).define("on_remove", ["testing_variables","changes","observers","viewof latest_state","Event"], _on_remove);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("tasks")).define("tasks", ["on_add","on_remove","submit_summary"], _tasks);
  main.variable(observer("background_task")).define("background_task", ["keepalive","testsModule"], _background_task);
  main.variable(observer("viewof testsModule")).define("viewof testsModule", ["thisModule"], _testsModule);
  main.variable(observer("testsModule")).define("testsModule", ["Generators", "viewof testsModule"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("moduleMap", child2);
  main.import("submit_summary", child2);
  const child3 = runtime.module(define3);
  main.import("isOnObservableCom", child3);
  main.import("viewof runtime_variables", child3);
  main.import("runtime_variables", child3);
  main.import("runtime", child3);
  main.import("unorderedSync", child3);
  main.import("observe", child3);
  main.import("thisModule", child3);
  main.import("keepalive", child3);
  const child4 = runtime.module(define4);
  main.import("scan", child4);
  const child5 = runtime.module(define5);
  main.import("inspect", child5);
  main.import("Inspector", child5);
  return main;
}
