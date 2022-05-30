// https://observablehq.com/@tomlarkworthy/catch-all@408
import define1 from "./e1c39d41e8e944b0@378.js";
import define2 from "./58f3eb7334551ae6@209.js";

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

async function _2(FileAttachment,md){return(
md`TODO, we should move towards this instead of access-runtime

![image@1.png](${await FileAttachment("image@1.png").url()})`
)}

function _3(md){return(
md`#### note

Only the variables present when *catchAll* is called will be tracked, and new cells created afterwards will not be tracked.

You can pass an *invalidation* promise as the 2nd argument to clean up the observers, this is needed if you expect to be calling *catchAll* more than once.`
)}

function _4(md){return(
md`#### Thanks [@mootari/access-runtime](https://observablehq.com/@mootari/access-runtime)

This notebook operates upon a hacks developed by [@mootari](/@mootari) and [@bryangingechen](/@bryangingechen). Read more in the dependency link 👇`
)}

function _6(md){return(
md`### Demo`
)}

function _errorTrigger(Inputs,md){return(
Inputs.button(md`throw an error`, { required: true })
)}

function _8(Inputs,errorLog){return(
Inputs.table(errorLog)
)}

function _errorCell(errorTrigger)
{
  errorTrigger;
  // Errors thrown here are picked up by catchAll
  throw new Error("An error " + Math.random().toString(16).substring(3));
}


function _10(catchAll,$0,invalidation){return(
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

function _12(md){return(
md`### Implementation`
)}

function _catchAll(runtime,modules){return(
(handler, invalidation) => {
  const moduleName = "main";
  Array.from(runtime._variables)
    .filter((v) => modules.get(v._module) === moduleName)
    .forEach((v) => {
      if (v._observer.rejected) {
        const oldRejectedHandler = v._observer.rejected;
        v._observer.rejected = (error, name) => {
          try {
            handler(name, error);
          } catch (err) {
            console.error(err);
          }
          // The oldRejectedHandler is often a prototype, so we use Reflect to call it
          Reflect.apply(oldRejectedHandler, v._observer, [error, name]);
        };
        if (invalidation)
          invalidation.then(() => (v._observer.rejected = oldRejectedHandler));
      } else {
        // This is probably the no_observer case
        // https://github.com/observablehq/runtime/blob/893fed311c59a79fc1b326dd6f8612e85634adce/src/variable.js#L14
        v._observer.rejected = (error, name) => handler(name, error);
        if (invalidation)
          invalidation.then(() => (v._observer.rejected = undefined));
      }
    });
}
)}

function _14(md){return(
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

function _17(suite,$0,$1,Event,testing){return(
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

function _19(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/367dfd8bc3670f94f64604ca4a5d0bfc2a68bd4aed2ce1f4ebe9a6d422fabfde19a4498d6ecbe63d351bcb2bf4541fc2f17d04c1849bd1384e36628b9d4b9b44", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("modules", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof errorTrigger")).define("viewof errorTrigger", ["Inputs","md"], _errorTrigger);
  main.variable(observer("errorTrigger")).define("errorTrigger", ["Generators", "viewof errorTrigger"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","errorLog"], _8);
  main.variable(observer("errorCell")).define("errorCell", ["errorTrigger"], _errorCell);
  main.variable(observer()).define(["catchAll","mutable errorLog","invalidation"], _10);
  main.define("initial errorLog", _errorLog);
  main.variable(observer("mutable errorLog")).define("mutable errorLog", ["Mutable", "initial errorLog"], (M, _) => new M(_));
  main.variable(observer("errorLog")).define("errorLog", ["mutable errorLog"], _ => _.generator);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("catchAll")).define("catchAll", ["runtime","modules"], _catchAll);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("testing")).define("testing", ["viewof errorTrigger","catchAll"], _testing);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","mutable errorLog","viewof errorTrigger","Event","testing"], _17);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _19);
  return main;
}
