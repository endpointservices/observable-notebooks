import define1 from "./f109935193c0deba@4417.js";
import define2 from "./0e0b35a92c819d94@474.js";
import define3 from "./e3a019069a130d79@6742.js";
import define4 from "./98f34e974bb2e4bc@699.js";
import define5 from "./64057d42235a0057@2912.js";
import define6 from "./ee79b1fa5101d6d9@3283.js";
import define7 from "./03dda470c56b93ff@8385.js";
import define8 from "./f096db8fcbc444bf@565.js";

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

function _b($0){return(
$0
)}

function _a($0){return(
$0
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

function _8(md){return(
md`## Experiments`
)}

function _9(Inputs,$0,experiments,runScore,Event){return(
Inputs.button("rescore", {
  reduce: async () => {
    $0.value = await Promise.all(experiments.map(runScore));
    $0.dispatchEvent(new Event("input"));
  }
})
)}

function _10(Inputs,experiments){return(
Inputs.table(experiments, {
  columns: ["caseTask", "score", "settings", "response"],
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

function _13(md){return(
md`## Score Task`
)}

function _runScore(observable,compile,_,getPromiseState){return(
async ({ settings, response, caseTask } = {}) => {
  const scoreTask = { settings, response, caseTask };
  const embedded_runtime = new observable.Runtime();
  const embedded_main = embedded_runtime.module();

  (await caseTask.notebook()).forEach((cell) => {
    const variables = compile(cell.code);
    variables.forEach((v) => {
      embedded_main.variable({}).define(v._name, v._inputs, v._definition);
    });
  });

  let compile_or_null = null,
    apply_or_null = null,
    check_or_null = null,
    values = [],
    errors = [];
  let compileError = false;
  compile_or_null = scoreTask.response.cells.flatMap((cell) => {
    try {
      const variables = compile(cell.code);
      const inputs = _.sortBy(cell.inputs);
      const compiledInputs = _.sortBy(variables[0]._inputs);
      if (!_.isEqual(inputs, compiledInputs)) {
        errors.push(
          `Incorrectly specified inputs ${inputs} does not match ${compiledInputs}`
        );
      }
      return [variables];
    } catch (err) {
      errors.push(err.message);
      compileError = true;
      return [];
    }
  });
  try {
    const vars = compile_or_null.map((variables) =>
      variables.map((v) => {
        let _fn;
        eval("_fn = " + v._definition);
        if (embedded_main._scope.has(v._name)) {
          debugger;
          return embedded_main._scope
            .get(v._name)
            .define(v._name, v._inputs, _fn);
        } else {
          return embedded_main.variable({}).define(v._name, v._inputs, _fn);
        }
      })
    );
    embedded_runtime._computeNow();
    await new Promise((r) => setTimeout(r, 100));
    apply_or_null = vars.flat();

    const values = await Promise.all(
      vars.flat().map((v) => getPromiseState(v._promise))
    );
    values
      .filter((v) => v.error)
      .forEach((e) => errors.push(e.error.message || e.error));
    check_or_null = await scoreTask.caseTask.check(
      embedded_runtime,
      embedded_main,
      apply_or_null,
      scoreTask.response
    );
    if (typeof check_or_null === "string") {
      errors.push(check_or_null);
      check_or_null = false;
    }
  } catch (err) {
    errors.push(err.message || err);
  }

  embedded_runtime.dispose();

  return {
    settings: scoreTask.settings,
    caseTask: scoreTask.caseTask,
    response: scoreTask.response,
    score: {
      responded: !!scoreTask.response.cells,
      compiles: !compileError,
      applies: !compileError && !!apply_or_null,
      resolves: !compileError && !values.some((v) => v.error),
      correct: !!check_or_null,
      errors: errors
    }
  };
}
)}

function _15(md){return(
md`## RunCase`
)}

function _16(Inputs,promptHistory){return(
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
  ...(await promptTask.caseTask.notebook()).map((cell) => ({
    role: "user",
    content: `<cell>
<inputs>${cell.inputs.join(", ")}</inputs>
<code><![CDATA[
${cell.code}
]]></code>
</cell>
`
  })),
  {
    role: "user",
    content: promptTask.caseTask.query
  }
]
)}

function _20(md){return(
md`## Cases`
)}

function _21(Inputs,cases,runCase){return(
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
    format: { run: (r) => r },
    layout: "auto"
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
    notebook = () => [],
    check = () => true
  } = {}) {
    this.name = name;
    this.query = query;
    this.notebook = notebook;
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

function _24(md){return(
md`## Errors`
)}

async function _test_syntax_error(runScore,assign_literal,expect,_)
{
  const { score } = await runScore({
    caseTask: assign_literal,
    response: {
      cells: [
        {
          inputs: [],
          code: `x = '`
        }
      ]
    }
  });
  expect(
    _.pick(score, ["responded", "compiles", "applies", "correct"])
  ).toEqual({
    responded: true,
    compiles: false,
    applies: false,
    correct: false
  });
  expect(score.errors[0]).toBe("Unterminated string constant (1:4)");
  return "ok";
}


async function _test_runtime_import_error(runScore,assign_literal,expect,_)
{
  const { score } = await runScore({
    caseTask: assign_literal,
    response: {
      cells: [
        {
          inputs: [],
          code: `viewof rgb = (await import("npm:@observablehq/inputs")).Inputs.select({
  options: ["red", "green", "blue"],
  label: "rgb"
})`
        }
      ]
    }
  });
  expect(
    _.pick(score, ["responded", "compiles", "applies", "correct"])
  ).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    correct: false
  });
  expect(score.errors[0]).toBe(
    "Failed to fetch dynamically imported module: npm:@observablehq/inputs"
  );
  return "ok";
}


async function _test_runtime_input_error(runScore,assign_literal,expect)
{
  const { score } = await runScore({
    caseTask: assign_literal,
    response: {
      cells: [
        {
          inputs: ["@observablehq/stdlib@5"],
          code: `foo = d3`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: false,
    errors: [
      "Incorrectly specified inputs @observablehq/stdlib@5 does not match d3",
      "Cannot read properties of undefined (reading '_promise')"
    ]
  });
  return "ok";
}


function _assign_literal(Case,invalidation){return(
new Case({
  invalidation,
  name: "assign a synchronous literal number",
  query: "create a cell x whose value is 42",
  check: async (runtime, main) =>
    main._scope.get("x")._promise.then((v) => v == 42)
})
)}

async function _test_assign_literal(runScore,assign_literal,expect)
{
  const { score } = await runScore({
    caseTask: assign_literal,
    response: {
      cells: [
        {
          inputs: [],
          code: `x = 42`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _say_hello(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "say hello",
  query: "say hello",
  check: async (runtime, main, variables) => {
    if (variables.length != 1) return "only 1 variable needed to solve this";
    if (!variables[0]._value instanceof HTMLElement)
      return "did not solve using md";
    return true;
  }
})
)}

async function _test_say_hello(runScore,say_hello,expect)
{
  const { score } = await runScore({
    caseTask: say_hello,
    response: {
      cells: [
        {
          inputs: [],
          code: `hello = document.createElement("div")`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    correct: true,
    resolves: true,
    errors: []
  });
  return "ok";
}


function _create_login_form(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "login form",
  query: "create a username and password form bound to credentials",
  check: async (runtime, main, variables, response) => {
    if (variables.length != 2) return "did not use a single view to solve";
    if (!variables[0]._value instanceof HTMLElement)
      return "did not use Inputs";
    if (!variables[0]._definition.toString().includes("Inputs.password"))
      return "did not use Inputs.password for password field";
    return true;
  }
})
)}

async function _test_create_login_form(runScore,create_login_form,expect)
{
  const { score } = await runScore({
    caseTask: create_login_form,
    response: {
      cells: [
        {
          inputs: ["Inputs"],
          code: `viewof credentials = Inputs.form({
  username: Inputs.text({label: "username"}),
  password: Inputs.password({type: "password", label: "password"})
})`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _create_checkbox_form(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "toggle value",
  query: "create a toggle for the value ready",
  check: async (runtime, main, variables, response) => {
    return (
      variables.length == 2 &&
      variables[0]._value instanceof HTMLElement &&
      variables[0]._name == "viewof ready" &&
      variables[0]._definition.toString().includes("Inputs.toggle")
    );
  }
})
)}

async function _test_create_toggle_form(runScore,create_checkbox_form,expect)
{
  const { score } = await runScore({
    caseTask: create_checkbox_form,
    response: {
      cells: [
        {
          inputs: ["Inputs"],
          code: `viewof ready = Inputs.toggle()`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _sum_array(Case,invalidation){return(
new Case({
  invalidation,
  name: "sum of array",
  query:
    "create a cell sum whose value is the sum of the array [1,2,3,4,5] using d3",
  check: async (runtime, main) => {
    const variable = main._scope.get("sum");
    return (
      (await variable._promise.then((v) => v === 15)) &&
      variable._definition.toString().includes("d3")
    );
  }
})
)}

async function _test_sum_array(runScore,sum_array,expect)
{
  const { score } = await runScore({
    caseTask: sum_array,
    response: {
      cells: [
        {
          inputs: ["d3"],
          code: `sum = d3.sum([1, 2, 3, 4, 5])`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _filter_array(Case,invalidation){return(
new Case({
  invalidation,
  name: "filter array",
  query:
    "create a cell evens whose value is the even numbers from [1,2,3,4,5,6]",
  check: async (runtime, main) =>
    main._scope
      .get("evens")
      ._promise.then(
        (v) => Array.isArray(v) && v.length === 3 && v.every((n) => n % 2 === 0)
      )
})
)}

async function _test_filter_array(runScore,filter_array,expect)
{
  const { score } = await runScore({
    caseTask: filter_array,
    response: {
      cells: [
        {
          inputs: [],
          code: `evens = [1,2,3,4,5,6].filter(n => n % 2 === 0)`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _create_counter(Case,invalidation){return(
new Case({
  invalidation,
  name: "counter button",
  query: "create a viewof count that displays a button to increment a number",
  check: async (runtime, main, variables) => {
    if (variables.length !== 2) return false;
    const v = variables[0];
    if (v._name !== "viewof count") return "Should be a viewof button";
    if (!v._definition.toString().includes("Inputs.button"))
      return "did not use Inputs.button reduce functionality";
    return true;
  }
})
)}

async function _test_create_counter(runScore,create_counter,expect)
{
  const { score } = await runScore({
    caseTask: create_counter,
    response: {
      cells: [
        {
          inputs: ["Inputs"],
          code: `viewof count = Inputs.button("Increment")`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _create_dropdown(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "dropdown",
  query:
    'create a dropdown select element with options "red","green","blue" bound to rgb',
  check: async (runtime, main, variables) => {
    if (variables.length !== 2) return false;
    const el = variables[0]._value;
    if (!(el instanceof HTMLElement)) return false;
    if (el.tagName !== "FORM") return false;
    const opts = el.querySelectorAll("option");
    const values = Array.from(opts).map((o) => o.text);
    return (
      values.length === 3 &&
      values[0] === "red" &&
      values[1] === "green" &&
      values[2] === "blue"
    );
  }
})
)}

async function _test_dropdown(runScore,create_dropdown,expect)
{
  // Test runScore with empty response cells
  const { score } = await runScore({
    caseTask: create_dropdown,
    response: {
      cells: [
        {
          inputs: ["Inputs"],
          code: `viewof rgb = Inputs.select(["red", "green", "blue"])`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _create_composite_ui(Case,invalidation,HTMLElement){return(
new Case({
  invalidation,
  name: "composite ui",
  query:
    "create a UI for a rectangle called rectangleSettings with whole number width and height ranges",
  check: async (runtime, main, variables) => {
    return (
      variables.length == 2 &&
      variables[0]._name == "viewof rectangleSettings" &&
      variables[0]._value instanceof HTMLElement &&
      variables[0]._inputs.length == 1 &&
      variables[0]._inputs[0]._name == "Inputs" &&
      variables[0]._definition.toString().includes("Inputs.form")
    );
  }
})
)}

async function _test_composite_ui(runScore,create_composite_ui,expect)
{
  const { score } = await runScore({
    caseTask: create_composite_ui,
    response: {
      cells: [
        {
          inputs: ["Inputs"],
          code: `viewof rectangleSettings = Inputs.form({
  width: Inputs.range([1, 10], { label: "width (px)", step: 1, value: 1 }),
  height: Inputs.range([20, 100], { label: "height (px)", step: 1, value: 30 })
})`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _create_dataflow_svg(Case,invalidation){return(
new Case({
  invalidation,
  name: "dataflow svg",
  query:
    "Use rectangleSettings to create an SVG element that live updates an svg rectangle",
  notebook: async () => [
    {
      inputs: ["Inputs"],
      code: `viewof rectangleSettings = Inputs.form({
  width: Inputs.range([1, 200], { label: "width", step: 1, value: 100 }),
  height: Inputs.range([1, 200], { label: "height", step: 1, value: 50 }),
  fill: Inputs.color({ label: "fill" })
})`
    }
  ],
  check: async (runtime, main, variables) => {
    if (variables.length !== 1) return false;
    const v = variables[0];
    const src = v._definition.toString();
    if (!v._inputs.find((i) => i._name === "htl"))
      return "Use hypertext literal htl";
    if (!v._inputs.find((i) => i._name === "rectangleSettings")) return false;
    if (!src.includes("htl.svg`")) return false;
    if (!src.includes("rectangleSettings.fill"))
      return "did not access the fill setting";
    if (!src.includes("rectangleSettings.width")) return false;
    if (!src.includes("rectangleSettings.height")) return false;

    return true;
  }
})
)}

async function _test_create_dataflow_svg(runScore,create_dataflow_svg,expect)
{
  const { score } = await runScore({
    caseTask: create_dataflow_svg,
    response: {
      cells: [
        {
          inputs: ["htl", "rectangleSettings"],
          code: `htl.svg\`<svg><rect fill="\${rectangleSettings.fill}" width=\${rectangleSettings.width} height=\${rectangleSettings.height}></rect></svg>\``
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _import_date_fns(Case,invalidation){return(
new Case({
  invalidation,
  name: "date-fns format",
  query:
    'Import date-fns and create a cell formatted whose value is the ISO date "2020-01-01" by formatting new Date(2020,0,1) using date-fns (e.g., dateFns.format).',
  check: async (runtime, main) => {
    const variable = main._scope.get("formatted");
    if (!variable) return "missing formatted variable";
    const okValue = await variable._promise.then((v) => v === "2020-01-01");
    const usesDateFns =
      variable._definition &&
      variable._definition.toString().includes("dateFns.format");
    return okValue && usesDateFns;
  }
})
)}

async function _test_import_date_fns(runScore,import_date_fns,expect)
{
  const { score } = await runScore({
    caseTask: import_date_fns,
    response: {
      cells: [
        {
          code: `dateFns = import('https://cdn.jsdelivr.net/npm/date-fns@4.1.0/+esm')`
        },
        {
          inputs: ["dateFns"],
          code: `formatted = dateFns.format(new Date(2020, 0, 1), 'yyyy-MM-dd')`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _matrix_eig_case(Case,invalidation){return(
new Case({
  invalidation,
  name: "matrix_eig",
  query:
    "Create a function matrix_eig(matrix) that returns {values: [...], vectors: [[...], ...]} for real-eigenvalue cases, or throws/returns an error for unsupported/complex cases.",
  check: async (runtime, main) => {
    const v = main._scope.get("matrix_eig");
    if (!v) return "missing matrix_eig";
    const fn = await v._promise;
    if (typeof fn !== "function") return "matrix_eig is not a function";

    const approx = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;
    const mul = (M, vec) =>
      M.map((row) => row.reduce((s, x, i) => s + x * vec[i], 0));

    const checkMatrix = async (M) => {
      let res;
      try {
        res = await fn(M);
      } catch (e) {
        return `threw for a matrix that should be supported: ${
          e && e.message ? e.message : e
        }`;
      }
      if (!res || !Array.isArray(res.values) || !Array.isArray(res.vectors))
        return "result must be an object with arrays values and vectors";
      if (res.values.length !== res.vectors.length)
        return "values and vectors must be the same length";
      if (res.vectors.some((v) => !Array.isArray(v) || v.length !== M.length))
        return "each vector must be an array of the correct dimension";

      for (let i = 0; i < res.values.length; i++) {
        const lambda = res.values[i];
        const vec = res.vectors[i];
        const Av = mul(M, vec);
        const lv = vec.map((x) => lambda * x);
        for (let j = 0; j < Av.length; j++) {
          if (!approx(Av[j], lv[j], 1e-6)) {
            return `eigenpair ${i} failed: Av=${JSON.stringify(
              Av
            )} vs λv=${JSON.stringify(lv)}`;
          }
        }
      }
      return true;
    };

    // 1) Simple diagonal matrix
    const M1 = [
      [2, 0],
      [0, 3]
    ];
    const ok1 = await checkMatrix(M1);
    if (ok1 !== true) return ok1;

    // 2) Symmetric matrix with distinct eigenvalues
    const M2 = [
      [2, 1],
      [1, 2]
    ]; // eigenvalues 3 and 1
    const ok2 = await checkMatrix(M2);
    if (ok2 !== true) return ok2;

    const M3 = [
      [2, 1, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 4, 0],
      [0, 0, 0, 1]
    ];
    debugger;
    const ok3 = await checkMatrix(M3);
    if (ok3 !== true) return ok3;

    return true; // throwing is acceptable
  }
})
)}

async function _test_matrix_eig(runScore,matrix_eig_case,expect)
{
  const { score } = await runScore({
    caseTask: matrix_eig_case,
    response: {
      cells: [
        {
          code: `mathjs = import("https://cdn.jsdelivr.net/npm/mathjs@14.6.0/+esm")`
        },
        {
          inputs: ["mathjs"],
          code: `matrix_eig = async function(matrix){
  const eigs = await mathjs.eigs(matrix)
  return {
    values: eigs.eigenvectors.map(v => v.value),
    vectors: eigs.eigenvectors.map(v => v.vector),
  }
}`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _fix_test_case(Case,invalidation){return(
new Case({
  invalidation,
  name: "fix a test with TDD",
  query: "Fix the test",
  notebook: async () => [
    {
      inputs: [],
      code: `import {expect} from "@tomlarkworthy/jest-expect-standalone"`
    },
    {
      inputs: [],
      code: `x = {value: 10}`
    },
    {
      inputs: ["expect"],
      code: `test_x_value = expect(x.value).toBe(10)`
    }
  ],
  check: async (runtime, main, variables) => {
    if (variables.length !== 1) return false;
    const v = variables[0];
    const src = v._definition.toString();
    const x_value = await main._scope.get("x")._promise.then((v) => v);
    if (x_value.value != 10)
      return "x.value is not 10, rembember that observable syntax blocks have higher precidence than object literals";

    return true;
  }
})
)}

async function _test_fix_case(runScore,fix_test_case,expect)
{
  const { score } = await runScore({
    caseTask: fix_test_case,
    response: {
      cells: [
        {
          code: `x = ({value: 10})`
        }
      ]
    }
  });
  expect(score).toEqual({
    responded: true,
    compiles: true,
    applies: true,
    resolves: true,
    correct: true,
    errors: []
  });
  return "ok";
}


function _load_all(assign_literal,say_hello,create_login_form,create_checkbox_form,create_dropdown,create_counter,filter_array,sum_array,create_composite_ui,create_dataflow_svg,import_date_fns,matrix_eig_case,fix_test_case)
{
  assign_literal,
    say_hello,
    create_login_form,
    create_checkbox_form,
    create_dropdown,
    create_counter,
    filter_array,
    sum_array,
    create_composite_ui,
    create_dataflow_svg,
    import_date_fns,
    matrix_eig_case,
    fix_test_case;
}


function _55(md){return(
md`## Libs`
)}

function _observable(){return(
import(
  "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js"
)
)}

function _58(){return(
function () {}
)}

function _59(robocoop){return(
robocoop
)}

function _size(Inputs){return(
Inputs.form({
  width: Inputs.range([1, 10], { label: "width (px)", step: 1, value: 1 }),
  height: Inputs.range([20, 100], { label: "height (px)", step: 1, value: 30 })
})
)}

function _65(ui){return(
ui
)}

function _67(context_menu){return(
context_menu
)}

function _68(exporter){return(
exporter()
)}

function _71(tests){return(
tests({
  filter: (t) => t.state !== "paused"
})
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
  main.variable(observer("b")).define("b", ["viewof suggestion"], _b);
  main.variable(observer("a")).define("a", ["viewof context_viz"], _a);
  main.variable(observer("viewof scores")).define("viewof scores", ["Inputs"], _scores);
  main.variable(observer("scores")).define("scores", ["Generators", "viewof scores"], (G, _) => G.input(_));
  main.variable(observer("runCase")).define("runCase", ["runPrompt","runScore","addResult"], _runCase);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Inputs","viewof experiments","experiments","runScore","Event"], _9);
  main.variable(observer()).define(["Inputs","experiments"], _10);
  main.variable(observer("viewof experiments")).define("viewof experiments", ["Inputs"], _experiments);
  main.variable(observer("experiments")).define("experiments", ["Generators", "viewof experiments"], (G, _) => G.input(_));
  main.variable(observer("addResult")).define("addResult", ["viewof experiments","Event"], _addResult);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("runScore")).define("runScore", ["observable","compile","_","getPromiseState"], _runScore);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["Inputs","promptHistory"], _16);
  main.variable(observer("viewof promptHistory")).define("viewof promptHistory", ["Inputs"], _promptHistory);
  main.variable(observer("promptHistory")).define("promptHistory", ["Generators", "viewof promptHistory"], (G, _) => G.input(_));
  main.variable(observer("runPrompt")).define("runPrompt", ["buildMessages","viewof settings","runAsk","viewof promptHistory","Event"], _runPrompt);
  main.variable(observer("buildMessages")).define("buildMessages", ["viewof system_prompt"], _buildMessages);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["Inputs","cases","runCase"], _21);
  main.variable(observer("viewof cases")).define("viewof cases", ["Inputs"], _cases);
  main.variable(observer("cases")).define("cases", ["Generators", "viewof cases"], (G, _) => G.input(_));
  main.variable(observer("Case")).define("Case", ["viewof cases","Event"], _Case);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("test_syntax_error")).define("test_syntax_error", ["runScore","assign_literal","expect","_"], _test_syntax_error);
  main.variable(observer("test_runtime_import_error")).define("test_runtime_import_error", ["runScore","assign_literal","expect","_"], _test_runtime_import_error);
  main.variable(observer("test_runtime_input_error")).define("test_runtime_input_error", ["runScore","assign_literal","expect"], _test_runtime_input_error);
  main.variable(observer("assign_literal")).define("assign_literal", ["Case","invalidation"], _assign_literal);
  main.variable(observer("test_assign_literal")).define("test_assign_literal", ["runScore","assign_literal","expect"], _test_assign_literal);
  main.variable(observer("say_hello")).define("say_hello", ["Case","invalidation","HTMLElement"], _say_hello);
  main.variable(observer("test_say_hello")).define("test_say_hello", ["runScore","say_hello","expect"], _test_say_hello);
  main.variable(observer("create_login_form")).define("create_login_form", ["Case","invalidation","HTMLElement"], _create_login_form);
  main.variable(observer("test_create_login_form")).define("test_create_login_form", ["runScore","create_login_form","expect"], _test_create_login_form);
  main.variable(observer("create_checkbox_form")).define("create_checkbox_form", ["Case","invalidation","HTMLElement"], _create_checkbox_form);
  main.variable(observer("test_create_toggle_form")).define("test_create_toggle_form", ["runScore","create_checkbox_form","expect"], _test_create_toggle_form);
  main.variable(observer("sum_array")).define("sum_array", ["Case","invalidation"], _sum_array);
  main.variable(observer("test_sum_array")).define("test_sum_array", ["runScore","sum_array","expect"], _test_sum_array);
  main.variable(observer("filter_array")).define("filter_array", ["Case","invalidation"], _filter_array);
  main.variable(observer("test_filter_array")).define("test_filter_array", ["runScore","filter_array","expect"], _test_filter_array);
  main.variable(observer("create_counter")).define("create_counter", ["Case","invalidation"], _create_counter);
  main.variable(observer("test_create_counter")).define("test_create_counter", ["runScore","create_counter","expect"], _test_create_counter);
  main.variable(observer("create_dropdown")).define("create_dropdown", ["Case","invalidation","HTMLElement"], _create_dropdown);
  main.variable(observer("test_dropdown")).define("test_dropdown", ["runScore","create_dropdown","expect"], _test_dropdown);
  main.variable(observer("create_composite_ui")).define("create_composite_ui", ["Case","invalidation","HTMLElement"], _create_composite_ui);
  main.variable(observer("test_composite_ui")).define("test_composite_ui", ["runScore","create_composite_ui","expect"], _test_composite_ui);
  main.variable(observer("create_dataflow_svg")).define("create_dataflow_svg", ["Case","invalidation"], _create_dataflow_svg);
  main.variable(observer("test_create_dataflow_svg")).define("test_create_dataflow_svg", ["runScore","create_dataflow_svg","expect"], _test_create_dataflow_svg);
  main.variable(observer("import_date_fns")).define("import_date_fns", ["Case","invalidation"], _import_date_fns);
  main.variable(observer("test_import_date_fns")).define("test_import_date_fns", ["runScore","import_date_fns","expect"], _test_import_date_fns);
  main.variable(observer("matrix_eig_case")).define("matrix_eig_case", ["Case","invalidation"], _matrix_eig_case);
  main.variable(observer("test_matrix_eig")).define("test_matrix_eig", ["runScore","matrix_eig_case","expect"], _test_matrix_eig);
  main.variable(observer("fix_test_case")).define("fix_test_case", ["Case","invalidation"], _fix_test_case);
  main.variable(observer("test_fix_case")).define("test_fix_case", ["runScore","fix_test_case","expect"], _test_fix_case);
  main.variable(observer("load_all")).define("load_all", ["assign_literal","say_hello","create_login_form","create_checkbox_form","create_dropdown","create_counter","filter_array","sum_array","create_composite_ui","create_dataflow_svg","import_date_fns","matrix_eig_case","fix_test_case"], _load_all);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("observable")).define("observable", _observable);
  const child2 = runtime.module(define1);
  main.import("robocoop", child2);
  main.variable(observer()).define(_58);
  main.variable(observer()).define(["robocoop"], _59);
  const child3 = runtime.module(define2);
  main.import("flowQueue", child3);
  const child4 = runtime.module(define3);
  main.import("compile", child4);
  const child5 = runtime.module(define4);
  main.import("runtime", child5);
  main.import("getPromiseState", child5);
  const child6 = runtime.module(define5);
  main.import("ui", child6);
  main.import("expect", child6);
  main.variable(observer("viewof size")).define("viewof size", ["Inputs"], _size);
  main.variable(observer("size")).define("size", ["Generators", "viewof size"], (G, _) => G.input(_));
  main.variable(observer()).define(["ui"], _65);
  const child7 = runtime.module(define6);
  main.import("context_menu", child7);
  main.variable(observer()).define(["context_menu"], _67);
  main.variable(observer()).define(["exporter"], _68);
  const child8 = runtime.module(define7);
  main.import("exporter", child8);
  const child9 = runtime.module(define8);
  main.import("tests", child9);
  main.variable(observer()).define(["tests"], _71);
  return main;
}
