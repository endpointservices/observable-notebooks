// https://observablehq.com/@tomlarkworthy/mip@720
import define1 from "./c7a3b20cec5d4dd9@730.js";
import define2 from "./316f0885d15ab671@69.js";
import define3 from "./50309473a164e648@2525.js";
import define4 from "./bb2055d580bbbab2@106.js";
import define5 from "./58f3eb7334551ae6@215.js";

function _1(tex,md){return(
md`# Mixed Integer / Linear Programming

Mixed integer programming for the browser! Mixed integer programming is restricted but powerful formalism for solving optimization problems. 

Variables can be
- non-negative continuous (default)
- integer
- binary (which is integer restricted to 0 or 1)

You can request to **minimize** or **maximize** some **linear** objective function _e.g._ ${tex`4x + 5y`}. Note the main linear limitation is you cannot multiply variables.

You can provide additional _linear_ constraints on the solution space
- ${tex`4x \leq 4`}
- ${tex`x - b == 0`}

The solver will then find a solution that is optimal for your objective (though may take a long time).

This solver frontend is very different to other linear programming libraries in Javascript, it accepts expressions encoded as strings and does algebraic rearrangement for you.

Whilst the linearity requirements are a restriction on the creative space, the fact that an optimal solution will be found is why we like the formalism. There are techniques to make Mixed Integer Programming apply to problems that naively look non-linear, e.g. the [Big M method](https://en.wikipedia.org/wiki/Big_M_method) or piecewise discretization. 

There are very powerful solvers in the commercial market ([Gurobi](gurobi.com), [Google DeepMind](https://deepmind.com/research/publications/2021/Solving-Mixed-Integer-Programs-Using-Neural-Networks)), the one here uses the open source solver [GNU GLPK](https://www.gnu.org/software/glpk/) as a backend but we can add support for more if we can find a WASM binary. GLPK was transpiled to JS by [glpk.js](https://github.com/jvail/glpk.js). GLPK is not directly called, hence the front end can be ISC licensed as a seperate work.`
)}

function _2(md){return(
md`### Change log
- 2021-09-05: [Fuzzing testing](https://observablehq.com/@tomlarkworthy/expression-fuzzer) + rewrite of some of simplification logic greatly increased robustness`
)}

function _3(md){return(
md`## Use outside of Observable?

Notebooks are ES6 modules, you can depend on them in a package.json!`
)}

function _4(md){return(
md`### Jo Wood's Observable Intro to Linear Programming

Jo prepared and excellent selection of examples using this library in their notebook [Hello Linear Programming](https://observablehq.com/@jwolondon/hello-linear-programming)`
)}

function _5(md){return(
md`
~~~js
import {mip} from '@tomlarkworthy/mip'
~~~

Example:

~~~js
  mip()
    .objective(Math.min, '40x1 + 60x2 + 15u2') // Cost, includes fixed cost of using ingredient 2
    .subjectTo('x1 + x2 + x3 == 1') // Mixing
    .subjectTo('100x1 + 200x2 >= 90 * (1 - va)') // Nutriant A
    .subjectTo('80x1 + 150x2 >= 50 * (1 - vb)') // Nutriant B
    .subjectTo('40x1 + 20x2 >= 20 * (1 - vc)') // Nutriant C
    .subjectTo('10x1 >= 2 * (1 - vd)') // Nutriant D
    .var('u2', Boolean) // Used ingredient 2 flag
    .subjectTo('x2 - u2 <= 0') // For x2 > 0 (but < 1), u2 must also be non-zero, and its a boolean so 1
    .var('va', Boolean) // violate nutriants A
    .var('vb', Boolean)
    .var('vc', Boolean)
    .var('vd', Boolean)
    .subjectTo('va + vb + vc + vd <= 1') // Only one violation
    .solve()
~~~
`
)}

function _6(md){return(
md`### Conversation on Twitter`
)}

function _7(tweet){return(
tweet('1422788681778307075')
)}

function _8(md){return(
md`### Reporting Bugs

Post message to https://talk.observablehq.com/t/mixed-integer-programming/5414`
)}

function _9(md){return(
md`

## Another example: J E Beasley Operation Research Examples 

Taken from http://people.brunel.ac.uk/~mastjjb/jeb/or/moreip.html

### Basic Blending problem

Consider the example of a manufacturer of animal feed who is producing feed mix for dairy cattle. In our simple example the feed mix contains two active ingredients and a filler to provide bulk. One kg of feed mix must contain a minimum quantity of each of four nutrients as below:

~~~
Nutrient       A      B     C     D
gram           90     50    20    2
~~~
The ingredients have the following nutrient values and cost
~~~
                        A      B       C       D      Cost/kg
Ingredient 1 (gram/kg)  100    80      40      10     40
Ingredient 2 (gram/kg)  200    150     20      -      60
~~~
What should be the amounts of active ingredients and filler in one kg of feed mix?`
)}

function _10(tex,md){return(
md`### Blending problem solution
Variables

In order to solve this problem it is best to think in terms of one kilogram of feed mix. That kilogram is made up of three parts - ingredient 1, ingredient 2 and filler so: let
x1 = amount (kg) of ingredient 1 in one kg of feed mix
x2 = amount (kg) of ingredient 2 in one kg of feed mix
x3 = amount (kg) of filler in one kg of feed mix
where x1 >= 0, x2 >= 0 and x3 >= 0.

Constraints
balancing constraint (an implicit constraint due to the definition of the variables)
x1 + x2 + x3 = 1
nutrient constraints

100x1 + 200x2 >= 90 (nutrient A)
80x1 + 150x2 >= 50 (nutrient B)
40x1 + 20x2 >= 20 (nutrient C)
10x1 >= 2 (nutrient D)
Note the use of an inequality rather than an equality in these constraints, following the rule we put forward in the Two Mines example, where we assume that the nutrient levels we want are lower limits on the amount of nutrient in one kg of feed mix.

#### Objective

Presumably to minimise cost, i.e.

_minimize_ ${tex`40x1 + 60x2`}


which gives us our complete LP model for the blending problem.`
)}

function _blendingAns(mip){return(
mip()
  .objective(Math.min, '40x1 + 60x2')
  .subjectTo('x1 + x2 + x3 == 1')
  .subjectTo('100x1 + 200x2 >= 90')
  .subjectTo('80x1 + 150x2 >= 50')
  .subjectTo('40x1 + 20x2 >= 20')
  .subjectTo('10x1 >= 2')
  .solve()
)}

function _12(Inputs,blendingAns){return(
Inputs.table(
  Object.entries(blendingAns.vars).map(([k, v]) => ({ var: k, value: v }))
)
)}

function _13(md){return(
md`#### Blending Problem++

Suppose now we have the additional conditions:

if we use any of ingredient 2 we incur a fixed cost of 15
we need not satisfy all four nutrient constraints but need only satisfy three of them (i.e. whereas before the optimal solution required all four nutrient constraints to be satisfied now the optimal solution could (if it is worthwhile to do so) only have three (any three) of these nutrient constraints satisfied and the fourth violated.
Give the complete MIP formulation of the problem with these two new conditions added.`
)}

function _14(Inputs,blendingPlusAns){return(
Inputs.table(
  Object.entries(blendingPlusAns.vars).map(([k, v]) => ({ var: k, value: v }))
)
)}

function _blendingPlusAns(mip){return(
mip()
  .objective(Math.min, '40x1 + 60x2 + 15u2') // Cost, includes fixed cost of using ingredient 2
  .subjectTo('x1 + x2 + x3 == 1') // Mixing
  .subjectTo('100x1 + 200x2 >= 90 * (1 - va)') // Nutriant A
  .subjectTo('80x1 + 150x2 >= 50 * (1 - vb)') // Nutriant B
  .subjectTo('40x1 + 20x2 >= 20 * (1 - vc)') // Nutriant C
  .subjectTo('10x1 >= 2 * (1 - vd)') // Nutriant D
  .var('u2', Boolean) // Used ingredient 2 flag
  .subjectTo('x2 - u2 <= 0') // For x2 > 0 (but < 1), u2 must also be non-zero, and its a boolean so 1
  .var('va', Boolean) // violate nutriants A
  .var('vb', Boolean)
  .var('vc', Boolean)
  .var('vd', Boolean)
  .subjectTo('va + vb + vc + vd <= 1') // Only one violation
  .solve()
)}

function _mip(glpkService,Model,randomId,server_comm_tag,invalidation){return(
function mip() {
  glpkService;
  const model = new Model();
  return {
    objective: function(maxOrMin, expr) {
      model.objective(maxOrMin, expr);
      return this;
    },
    var: function(label, type = Number) {
      model.var(label, type);
      return this;
    },
    subjectTo: function(label, expr) {
      model.subjectTo(label, expr);
      return this;
    },
    model: function() {
      return model;
    },
    solve: async function() {
      const session = randomId();
      let resolve, reject;
      const result = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      // listen for solution
      function solutionHandler(event) {
        if (
          event.origin === window.origin &&
          event.data.tag === server_comm_tag &&
          event.data.method === "solution" &&
          event.data.session === session
        ) {
          console.log("Response received");
          const result = event.data.result;

          if (result.status === "optimal") resolve(result);
          else {
            const err = new Error(result.status);
            err.result = result;
            reject(err);
          }
        }
      }
      window.addEventListener("message", solutionHandler, false);
      invalidation.then(() =>
        window.removeEventListener("message", solutionHandler)
      );

      // Send problem off to solver
      window.postMessage(
        {
          tag: server_comm_tag,
          method: "solve",
          session: session,
          model: model
        },
        window.origin
      );
      return result;
    }
  };
}
)}

function _17(md){return(
md`### Tests`
)}

function _18(suite,mip,expect){return(
suite.test("subjectTo lower bound", async () => {
  const result = await mip()
    .objective(Math.min, 'y')
    .subjectTo("y >= 1")
    .solve();
  expect(result.vars.y).toBe(1);
})
)}

function _19(suite,mip,expect){return(
suite.test("subjectTo upper bound", async () => {
  const result = await mip()
    .objective(Math.max, 'y')
    .subjectTo("y <= 10")
    .solve();
  expect(result.vars.y).toBe(10);
})
)}

function _20(suite,mip,expect){return(
suite.test("variables cannot be negative", async () => {
  const result = await mip()
    .objective(Math.min, 'x')
    .subjectTo("x >= -1")
    .solve();
  expect(result.vars.x).toBe(0);
})
)}

function _21(suite,mip,expect){return(
suite.test("variables cannot be negative workaround", async () => {
  const result = await mip()
    .objective(Math.min, 'x_pos - x_neg')
    .subjectTo("x_pos - x_neg >= -1")
    .solve();
  expect(result.vars.x_pos).toBe(0);
  expect(result.vars.x_neg).toBe(1);
})
)}

function _22(suite,mip,expect){return(
suite.test("Integer variable", async () => {
  const result = await mip()
    .objective(Math.min, 'x')
    .var("x", BigInt)
    .subjectTo("x >= 1.1")
    .solve();
  expect(result.vars.x).toBe(2);
})
)}

function _23(suite,mip,expect){return(
suite.test("Boolean variable max is 1", async () => {
  const result = await mip()
    .objective(Math.max, 'x')
    .var("x", Boolean)
    .solve();
  expect(result.vars.x).toBe(1);
})
)}

function _24(suite,mip,expect){return(
suite.test("Boolean variable min is 0", async () => {
  const result = await mip()
    .objective(Math.min, 'x')
    .var("x", Boolean)
    .solve();
  expect(result.vars.x).toBe(0);
})
)}

function _25(suite,mip,expect){return(
suite.test("Using boolean to indicate non-negative", async () => {
  const result = await mip()
    .objective(Math.min, 'x + b')
    .var('b', Boolean)
    .subjectTo('x >= 1')
    .subjectTo('x - b <= 0') // For x > 0 (but < 1), b must also be non-zero, and its a boolean so 1
    .solve();
  expect(result.vars.b).toBe(1);
})
)}

function _26(suite,mip,expect){return(
suite.test("solve unbounded throws", async done => {
  try {
    const result = await mip()
      .objective(Math.max, 'x')
      .solve();
  } catch (err) {
    expect(err.result.status).toBe('unbounded');
    done();
  }
})
)}

function _27(suite,mip,expect){return(
suite.test(
  "scaling to 10000 variables if the objective function is in a simple form",
  async () => {
    const terms = Array.from({ length: 10000 })
      .map((_, i) => `x${i}`)
      .join(" + ");
    const result = await mip()
      .objective(Math.min, terms)
      .solve();
    expect(result.vars.x0).toBe(0);
  }
)
)}

function _suite(createSuite){return(
createSuite({ name: "MIP tests" })
)}

function _31(md){return(
md`### Licensing

The solver backend is GLPK which is GPL 3.0, but this MIP front end is ISC. Our integration to the backend is pluggable and the front end communicates with the GLPK core via postMessage in a analogous way to a CLI. Let me explain how this works and why the client can be released as ISC and doesn't have to take on GPL licensing terms.

**Background**

If one program is statically or dynamically linked to a GPL program. It needs to also be releases under GPL terms. However, if the two programs remain separate, it does not.

_"By contrast, pipes, sockets and command-line arguments are communication mechanisms normally used between two separate programs. So when they are used for communication, the modules normally are separate programs."_ -- [GNU FAQ](https://www.gnu.org/licenses/old-licenses/gpl-2.0-faq.en.html#TOCMereAggregation) 

We can see this separation at work in the Python ecosystem, e.g. PuLP invokes GLPK but is not GPL because it invokes through the CLI https://github.com/coin-or/pulp (which is common to how MIP solvers are invoked).

https://github.com/coin-or/pulp/blob/master/pulp/apis/glpk_api.py

One the Web, *almost* everything is dynamically linked so what is the equivalent interface to a UNIX pipe?
Critically, so the separate programs directly call each other functions? Or do they call an intermedia public API. Some musings are here.

_"But it is also possible to call generically written Javascript from a document and pass information to that Javascript using a well-established public API. This would be an indication that the works may be considered separate. The answer would be dependent on an analysis of the particular case at hand."_ [Stack overflow](https://opensource.stackexchange.com/a/4500/24642)

postMessage is a WEB API often used to serialize messages between web workers who have isolated address spaces. This is the WEB version of process isolation and analogous to independant programs on native OSes. So, if we wrap GLPK with a postMessage interface, and keep its interface generic like its CLI, then programs that go through the postMessage interface should are considered separate programs and are not required to be GPLed, as long as the integration is generic.

Thus particular effort is made to ensure the GLPK backend is swappable and we use the postMessage interface to communicate.`
)}

function _32(md){return(
md`### Linear Programming Model (Dual license, ISC and GPL)
Here we define our Linear Programming data model, which can be serialized and deserialized either side of the postMessage interface.
`
)}

function _Model(extract){return(
class Model {
  constructor() {
    this.types = {};
    this.constraints = {};
  }
  objective(dir, expr) {
    if (dir === Math.max) this.dir = "max";
    else if (dir === Math.min) this.dir = "min";
    else throw new Error(`Unrecognized dir ${dir}`);

    this.objective = extract(expr + "<= 0").vars;
  }
  var(label, type = Number) {
    let _type = undefined;
    if (type === BigInt) _type = "int";
    else if (type === Number) _type = "real";
    else if (type === Boolean) _type = "bool";
    else throw new Error(`Unrecognized type ${type}`);

    this.types[label] = _type;
  }
  subjectTo(
    expr,
    { label = `c-${Object.keys(this.constraints).length}` } = {}
  ) {
    const constraint = extract(expr);
    this.constraints[label] = constraint;
  }
}
)}

function _client_comm_tag(){return(
"uuCTsfALkm"
)}

function _35(md){return(
md`### GLPK backend (GPL licensed)`
)}

function _server_comm_tag(){return(
"uuCTsfALkm"
)}

function _messages(){return(
[]
)}

function _38(mip){return(
mip()
  .objective(Math.max, 'x1')
  .var("x1")
  .subjectTo("x1 <= 10")
  .model()
)}

function _modelToLp(glpk){return(
function modelToLp(model) {
  return {
    name: 'LP',
    objective: {
      direction:
        model.dir == "max"
          ? glpk.GLP_MAX
          : model.dir == "min"
          ? glpk.GLP_MIN
          : "unknown",
      name: 'obj',
      vars: model.objective
    },
    generals: Object.entries(model.types)
      .filter(e => e[1] === 'int')
      .map(([name, type]) => name),
    binaries: Object.entries(model.types)
      .filter(e => e[1] === 'bool')
      .map(([name, type]) => name),
    subjectTo: Object.entries(model.constraints).map(([name, c]) => ({
      name,
      vars: c.vars,
      bnds: {
        type:
          c.bounds.upper === c.bounds.lower
            ? glpk.GLP_FX
            : c.bounds.upper !== undefined && c.bounds.lower !== undefined
            ? glpk.GLP_DB
            : c.bounds.upper !== undefined
            ? glpk.GLP_UP
            : glpk.GLP_LO,
        ub: c.bounds.upper,
        lb: c.bounds.lower
      }
    }))
  };
}
)}

function _glpkToResult(glpk){return(
function glpkToResult(result) {
  const status =
    result.status === glpk.GLP_UNDEF
      ? "undefined"
      : result.status === glpk.GLP_FEAS
      ? "feasible"
      : result.status === glpk.GLP_INFEAS
      ? "infeasible"
      : result.status === glpk.GLP_NOFEAS
      ? "nofeasible"
      : result.status === glpk.GLP_OPT
      ? "optimal"
      : result.status === glpk.GLP_UNBND
      ? "unbounded"
      : "unrecognised status code";

  return {
    vars: result.vars,
    status: status
  };
}
)}

function _debug(Inputs){return(
Inputs.checkbox(['debug'])
)}

function _cplex(){return(
""
)}

function _lp(){return(
{}
)}

function _glpkService(server_comm_tag,modelToLp,debug,glpk,$0,$1,glpkToResult,invalidation)
{
  const handler = async event => {
    if (
      event.origin === window.origin &&
      event.data.tag === server_comm_tag &&
      event.data.method === "solve"
    ) {
      console.log("Running on GLPK");
      const model = modelToLp(event.data.model);
      if (debug.length) {
        const result = glpk.write(model);
        $0.value = result;
        $1.value = JSON.stringify(model, null, 2);
        debugger;
      }
      const output = await glpk.solve(model, event.data.options || {});
      console.log("GLPK complete");
      event.source.postMessage(
        {
          tag: server_comm_tag,
          method: "solution",
          session: event.data.session,
          result: glpkToResult(output.result)
        },
        window.origin
      );
    }
  };
  window.addEventListener("message", handler, false);
  invalidation.then(() => window.removeEventListener("message", handler));
}


async function _glpk()
{
  const module = await import('https://cdn.skypack.dev/glpk.js@4.0.1?min')
  return module.default()
}


function _46(glpk){return(
glpk.solve({
  name: 'LP',
  objective: {
    direction: glpk.GLP_MIN,
    name: 'obj',
    vars: [{ name: 'x', coef: 1 }]
  },
  subjectTo: [
    {
      name: 'cons1',
      vars: [{ name: 'x', coef: 1.0 }],
      bnds: { type: glpk.GLP_UP, lb: -1.0, ub: 1000 }
    }
  ]
})
)}

function _50(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["tex","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["tweet"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["tex","md"], _10);
  main.variable(observer("blendingAns")).define("blendingAns", ["mip"], _blendingAns);
  main.variable(observer()).define(["Inputs","blendingAns"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Inputs","blendingPlusAns"], _14);
  main.variable(observer("blendingPlusAns")).define("blendingPlusAns", ["mip"], _blendingPlusAns);
  main.variable(observer("mip")).define("mip", ["glpkService","Model","randomId","server_comm_tag","invalidation"], _mip);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["suite","mip","expect"], _18);
  main.variable(observer()).define(["suite","mip","expect"], _19);
  main.variable(observer()).define(["suite","mip","expect"], _20);
  main.variable(observer()).define(["suite","mip","expect"], _21);
  main.variable(observer()).define(["suite","mip","expect"], _22);
  main.variable(observer()).define(["suite","mip","expect"], _23);
  main.variable(observer()).define(["suite","mip","expect"], _24);
  main.variable(observer()).define(["suite","mip","expect"], _25);
  main.variable(observer()).define(["suite","mip","expect"], _26);
  main.variable(observer()).define(["suite","mip","expect"], _27);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  const child2 = runtime.module(define2);
  main.import("randomId", child2);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("Model")).define("Model", ["extract"], _Model);
  main.variable(observer("client_comm_tag")).define("client_comm_tag", _client_comm_tag);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("server_comm_tag")).define("server_comm_tag", _server_comm_tag);
  main.variable(observer("messages")).define("messages", _messages);
  main.variable(observer()).define(["mip"], _38);
  main.variable(observer("modelToLp")).define("modelToLp", ["glpk"], _modelToLp);
  main.variable(observer("glpkToResult")).define("glpkToResult", ["glpk"], _glpkToResult);
  main.variable(observer("viewof debug")).define("viewof debug", ["Inputs"], _debug);
  main.variable(observer("debug")).define("debug", ["Generators", "viewof debug"], (G, _) => G.input(_));
  main.define("initial cplex", _cplex);
  main.variable(observer("mutable cplex")).define("mutable cplex", ["Mutable", "initial cplex"], (M, _) => new M(_));
  main.variable(observer("cplex")).define("cplex", ["mutable cplex"], _ => _.generator);
  main.define("initial lp", _lp);
  main.variable(observer("mutable lp")).define("mutable lp", ["Mutable", "initial lp"], (M, _) => new M(_));
  main.variable(observer("lp")).define("lp", ["mutable lp"], _ => _.generator);
  main.variable(observer("glpkService")).define("glpkService", ["server_comm_tag","modelToLp","debug","glpk","mutable cplex","mutable lp","glpkToResult","invalidation"], _glpkService);
  main.variable(observer("glpk")).define("glpk", _glpk);
  main.variable(observer()).define(["glpk"], _46);
  const child3 = runtime.module(define3);
  main.import("extract", child3);
  main.import("extractLHS", child3);
  const child4 = runtime.module(define4);
  main.import("tweet", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _50);
  return main;
}
