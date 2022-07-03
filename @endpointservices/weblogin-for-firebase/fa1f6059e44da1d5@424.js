// https://observablehq.com/@tomlarkworthy/catch-all@424
import define1 from "./58f3eb7334551ae6@211.js";

function _1(md){return(
md`# Detect notebook runtime errors with *catchAll((cellName, reason) => {...})*

<span style="font-size: 300px; padding-left: 100px">🚨</span>



*catchAll* registers a callback that will be informed of any uncaught cell errors in the notebook. 

---
Usage:
\`\`\`js
import {catchAll} from '@tomlarkworthy/catch-all'
\`\`\`
`
)}

function _2(md){return(
md`### Change Log

- 2022-06-26, removed mootari/access-runtime and inspected cells instead. This loses the cellName, but does track new cells being added
  `
)}

function _3(md){return(
md`#### note

You can pass an *invalidation* promise as the 2nd argument to clean up the observers, this is needed if you expect to be calling *catchAll* more than once.`
)}

function _4(md){return(
md`### Demo`
)}

function _errorTrigger(Inputs,md){return(
Inputs.button(md`throw an error`, { required: true })
)}

function _6(Inputs,errorLog){return(
Inputs.table(errorLog)
)}

function _errorCell(errorTrigger)
{
  errorTrigger;
  // Errors thrown here are picked up by catchAll
  throw new Error("An error " + Math.random().toString(16).substring(3));
}


function _8(catchAll,$0,invalidation){return(
catchAll((cellName, reason) => {
  $0.value = $0.value.concat({
    cellName,
    reason
  });
}, invalidation)
)}

function _errorLog(){return(
[]
)}

function _10(md){return(
md`### Implementation`
)}

function _error(Inputs,Event,MutationObserver,invalidation)
{
  const view = Inputs.input();

  const notify = (event) => {
    view.value = event.detail.error;
    view.dispatchEvent(new Event("input", { bubbles: true }));
  };

  const processInspectorNode = (el) => {
    el.addEventListener("error", notify);
  };

  // Attach to current cells
  [...document.querySelectorAll(".observablehq").values()].forEach(
    processInspectorNode
  );
  // Watch for new cells
  const root = document.querySelector(".observablehq-root");
  if (root) {
    const observer = new MutationObserver((mutationList, observer) => {
      for (const mutation of mutationList) {
        [...mutation.addedNodes].forEach(processInspectorNode);
      }
    });
    observer.observe(root, {
      childList: true
    });
    invalidation.then(observer.disconnect);
  }
  return view;
}


function _catchAll($0){return(
(handler, invalidation) => {
  const listener = () => handler("unknown", $0.value);
  $0.addEventListener("input", listener);
  if (invalidation)
    invalidation.then(() => {
      $0.removeEventListener(listener);
    });
}
)}

function _13(md){return(
md`### Tests and CI

We load the testing framework asynchronously to avoid statically depending on test libraries in production use. We can externally check these tests pass with [healthcheck](https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Fcatch-all&excludes=errorCell&wait=5) which is passed to an external monitoring solution (see [howto-monitoring](https://observablehq.com/@tomlarkworthy/howto-monitoring)).

Continuous integration is important for a library like this where API changes in Observable can easily break the implementation.`
)}

async function _testing($0,catchAll)
{
  $0, catchAll;
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

function _16(suite,$0,$1,Event,testing){return(
suite.test("Errors are logged", async (done) => {
  const numErrors = $0.value.length;
  $1.dispatchEvent(new Event("input")); // trigger an error
  setTimeout(() => {
    const newNumErrors = $0.value.length;
    testing.expect(newNumErrors - numErrors).toBeGreaterThan(0);
    done();
  }, 100);
})
)}

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof errorTrigger")).define("viewof errorTrigger", ["Inputs","md"], _errorTrigger);
  main.variable(observer("errorTrigger")).define("errorTrigger", ["Generators", "viewof errorTrigger"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","errorLog"], _6);
  main.variable(observer("errorCell")).define("errorCell", ["errorTrigger"], _errorCell);
  main.variable(observer()).define(["catchAll","mutable errorLog","invalidation"], _8);
  main.define("initial errorLog", _errorLog);
  main.variable(observer("mutable errorLog")).define("mutable errorLog", ["Mutable", "initial errorLog"], (M, _) => new M(_));
  main.variable(observer("errorLog")).define("errorLog", ["mutable errorLog"], _ => _.generator);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof error")).define("viewof error", ["Inputs","Event","MutationObserver","invalidation"], _error);
  main.variable(observer("error")).define("error", ["Generators", "viewof error"], (G, _) => G.input(_));
  main.variable(observer("catchAll")).define("catchAll", ["viewof error"], _catchAll);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("testing")).define("testing", ["viewof errorTrigger","catchAll"], _testing);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","mutable errorLog","viewof errorTrigger","Event","testing"], _16);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
