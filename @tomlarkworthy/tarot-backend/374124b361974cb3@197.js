// https://observablehq.com/@tomlarkworthy/notebook-snapshot@197
import define1 from "./e1c39d41e8e944b0@360.js";

function _1(md){return(
md`# *notebookSnapshot()*

This returns an array of the cell states *now*

\`\`\`js
[{
  name: String,  // [Optional] Cell name 
  state: String. // 'fulfilled', 'pending', 'rejected'
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

The trick used to discover which module is the current notebook can break with some modules. You can provide a known variable as the first parameter to aid detection of a particular notebook.`
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

function _10()
{
  // Anonymous Error
  throw new Error("I was thrown from an anonymous cell");
}


function _11(md){return(
md`### Implementation`
)}

function _notebookSnapshot(modules,runtime,promiseState){return(
(knownVariable) => {
  const moduleName = knownVariable
    ? modules.get(
        [...runtime._variables].find((v) => v._name === knownVariable)._module
      )
    : "main";

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

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("captureRuntime", child1);
  main.import("runtime", child1);
  main.import("modules", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["Inputs","md"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer("exampleResults")).define("exampleResults", ["refresh","Inputs","notebookSnapshot"], _exampleResults);
  main.variable(observer("thrownError")).define("thrownError", _thrownError);
  main.variable(observer("dependsOnThrownError")).define("dependsOnThrownError", ["thrownError"], _dependsOnThrownError);
  main.variable(observer()).define(_10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("notebookSnapshot")).define("notebookSnapshot", ["modules","runtime","promiseState"], _notebookSnapshot);
  main.variable(observer("promiseState")).define("promiseState", _promiseState);
  return main;
}
