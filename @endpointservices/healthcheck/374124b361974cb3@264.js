// https://observablehq.com/@tomlarkworthy/notebook-snapshot@264
import define1 from "./e1c39d41e8e944b0@420.js";
import define2 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# *notebookSnapshot()*

This returns an array of the cell states *now*

\`\`\`js
[{
  name: String,  // [Optional] Cell name 
  state: String, // 'fulfilled', 'pending', 'rejected'
  value: Any     // pending/rejected value/reason
}, ...]
\`\`\`

---
Usage:
\`\`\`js
import {notebookSnapshot} from '@tomlarkworthy/notebook-snapshot'
\`\`\`
`
)}

function _2(md){return(
md`#### Thanks [@mootari/access-runtime](https://observablehq.com/@mootari/access-runtime)

This notebook operates upon a hacks developed by [@mootari](/@mootari) and [@bryangingechen](/@bryangingechen). Read more in the dependency link 👇`
)}

function _4(md){return(
md`### Fixing for edge cases

The trick used to discover which module is the current notebook can break with some modules. You can provide a known variable as the first parameter to aid detection of a particular notebook, but it's not needed for most usecases`
)}

function _5(md){return(
md`### Demo

*look* its *this* notebook's snapshot! If you click refresh, the value of *refresh* increments, because of the default reduce action of an *Input.button*. I also added some Errors so you can see the state "rejected".`
)}

function _refresh(Inputs,md){return(
Inputs.button(md`refresh *notebookSnapshot()*`)
)}

async function _exampleResults(refresh,Inputs,notebookSnapshot){return(
refresh,
Inputs.table(await notebookSnapshot("dependsOnThrownError"), {
  columns: ["name", "state", "value"]
})
)}

function _thrownError()
{
  throw new Error("I was thrown!");
}


function _dependsOnThrownError(thrownError){return(
thrownError
)}

function _10(md){return(
md`### Implementation`
)}

function _notebookSnapshot(modules,runtime,promiseState){return(
(knownVariable) => {
  const moduleName = knownVariable
    ? modules.get(
        [...runtime._variables].find((v) => v._name === knownVariable)?._module
      )
    : "main";

  if (!moduleName) {
    debugger;
    throw new Error(
      `Cannot find tracking variable '${knownVariable}' for notebook snapshot in runtime variables ${JSON.stringify(
        [...runtime._variables]
      )}`
    );
  }
  console.log(moduleName);

  return Promise.all(
    Array.from(runtime._variables)
      .filter((v) => modules.get(v._module) === moduleName)
      .map((v) => {
        return promiseState(v._promise).then(([state, value]) => ({
          ...(v._name && { name: v._name }),
          value,
          state
        }));
      })
  );
}
)}

function _promiseState(){return(
(promise) =>
  new Promise((resolve) => {
    // Symbols and RegExps are never content-equal
    var uniqueValue = window["Symbol"] ? Symbol("unique") : /unique/;

    function notifyPendingOrResolved(value) {
      if (value === uniqueValue) {
        return resolve(["pending", undefined]);
      } else {
        return resolve(["fulfilled", value]);
      }
    }

    function notifyRejected(reason) {
      return resolve(["rejected", reason]);
    }

    var race = [promise, Promise.resolve(uniqueValue)];
    Promise.race(race).then(notifyPendingOrResolved, notifyRejected);
  })
)}

function _13(md){return(
md`### Tests and CI

We load the testing framework asynchronously to avoid statically depending on test libraries in production use. We can externally check these tests pass with [healthcheck](https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Fnotebook-snapshot&excludes=thrownError%2C+dependsOnThrownError&wait=5) which is passed to an external monitoring solution (see [howto-monitoring](https://observablehq.com/@tomlarkworthy/howto-monitoring)).

Continuous integration is important for a library like this where API changes in Observable can easily break the implementation.`
)}

async function _testing()
{
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}


function _suite(testing){return(
testing.createSuite()
)}

function _16(suite,testing,notebookSnapshot){return(
suite.test("known variable found", async () => {
  testing
    .expect((await notebookSnapshot()).find((cell) => cell.name === "testing"))
    .toBeDefined();
})
)}

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("modules", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["Inputs","md"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer("exampleResults")).define("exampleResults", ["refresh","Inputs","notebookSnapshot"], _exampleResults);
  main.variable(observer("thrownError")).define("thrownError", _thrownError);
  main.variable(observer("dependsOnThrownError")).define("dependsOnThrownError", ["thrownError"], _dependsOnThrownError);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("notebookSnapshot")).define("notebookSnapshot", ["modules","runtime","promiseState"], _notebookSnapshot);
  main.variable(observer("promiseState")).define("promiseState", _promiseState);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("testing")).define("testing", _testing);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","testing","notebookSnapshot"], _16);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
