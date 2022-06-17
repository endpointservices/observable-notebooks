// https://observablehq.com/@tomlarkworthy/flow-queue@418
import define1 from "./293899bef371e135@268.js";

async function _1(FileAttachment,md){return(
md`# How to convert dataflow to a promise using *flowQueue*


~~~js
import {flowQueue} from '@tomlarkworthy/flow-queue'
~~~

${await FileAttachment("flowQuery@1.svg").image({style: 'width:640px; max-width:100%'})}

A flow queue releases values one-at-a-time onto a Dataflow graph, and collects a response before releasing the next. A *flowQueue* wraps Dataflow with a *promise*. It allows you to *unroll* a function body across dataflow cells, which is sometimes better for code layout and explanation.  

In other words, __*flowQueue* provides dataflow programming a functional interface__. Consider the following

~~~js
aysnc doWork(arg) {
  const r1 = await step1(arg)
  const r2 = await step2(r1);
  return r2;
}
~~~

Using a *flowQueue* you can spread the asynchronous steps into different cells. To spread *doWork* across cells we first create a *flowQueue*, whose messages are *doWork*'s args.

~~~js
viewof head = flowQueue()
~~~

The refactored version of *doWork* will forward its *arg* to the *flowQueue* and returns the promise. (note: viewof)
~~~js
doWork = (arg) => viewof head.send(arg)
~~~

Now we unroll the body of *doWork* across several cells. Cell *r1* calls function *step1* and makes a dataflow dependency to *head* of the *flowQueue*. So when *head* updates, *r1* will too.
~~~js
r1 = step1(head)
~~~

The next step *r2* depends on the previous step.
~~~js
r2 = step2(r1)
~~~

To return a result, we call *respond* to the *flowQueue*. This will resolve the *send* promise earlier, and allow the next  to run. (note: viewof)
~~~js
{
  viewof head.respond(r2)
}
~~~

### Optimizations

The *flowQueue* will unblock immediately when *respond* is passed a *promise*.


### Errors

Every *send* should lead to a call to *respond*. If you call *respond* an extra time it will throw an Error. If *respond* is not called within *timeout_ms* (1000ms) the promise will reject. 
`
)}

function _2(md){return(
md`## Changelog

2022-04-13 Bugfix: queue was not recovering after timeout properly.`
)}

function _flowQueue(htl,Event){return(
({ name, timeout_ms = 1000 } = {}) => {
  let runningResolve = undefined;
  let runningReject = undefined;
  const q = [];

  const ui = htl.html`<code>flowQueue()</code>`;

  const run = () => {
    const [head, resolve, reject] = q.shift();
    let timer;
    runningResolve = (val) => {
      clearTimeout(timer);
      return resolve(val);
    };
    runningReject = (err) => {
      clearTimeout(timer);
      return reject(err);
    };

    timer = setTimeout(
      () =>
        ui.reject(
          new Error(`Timeout (maybe increase timeout_ms?) ${name || ""}`)
        ),
      timeout_ms
    );

    ui.value = head;
    ui.dispatchEvent(new Event("input", { bubbles: true }));
  };

  ui.send = (task) =>
    new Promise((resolve, reject) => {
      q.push([task, resolve, reject]);
      if (runningResolve === undefined) run();
    });

  ui.reject = async (err) => {
    if (!runningReject) throw new Error(`No task executing! ${name || ""}`);
    const resolve = runningResolve;
    const reject = runningReject;
    runningResolve = undefined;
    runningReject = undefined;
    reject(err);
    if (q.length > 0) run();
  };

  ui.respond = async (value) => {
    if (!runningResolve) throw new Error(`No task executing! ${name || ""}`);
    const resolve = runningResolve;
    const reject = runningReject;
    runningResolve = undefined;
    runningReject = undefined;
    if (q.length > 0) run();
    try {
      value = await value;
      resolve(value);
    } catch (err) {
      reject(err);
    }
  };

  return ui;
}
)}

function _4(md){return(
md`## Uses

- Functional adapter, for interfacing with functional interfaces.
- Testing, as you can write clear expected starting and ending criteria on a dataflow subgraph.`
)}

function _sqrt(flowQueue){return(
flowQueue()
)}

function _6($0,sqrt){return(
$0.respond(Math.sqrt(sqrt))
)}

async function _testing(flowQueue)
{
  flowQueue; // load after implementation
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
testing.createSuite({
  name: "Unit Tests"
})
)}

function _9(suite,flowQueue,testing){return(
suite.test("respond after send resolves", async () => {
  const q = flowQueue();
  const prom = q.send("send val");
  testing.expect(q.value).toBe("send val");
  q.respond("respond val");
  const response = await prom;
  testing.expect(response).toBe("respond val");
})
)}

function _maybeReply(flowQueue){return(
flowQueue({ timeout_ms: 100 })
)}

function _maybeReplyReplier(maybeReply,$0)
{
  debugger;
  if (maybeReply === "reply") $0.respond("reply");
}


function _12(suite,$0,testing){return(
suite.test("Unreplied queues recover after timeout_ms", async (done) => {
  try {
    debugger;
    await $0.send("no reply");
  } catch (err) {
    debugger;
    const result = await $0.send("reply");
    testing.expect(result).toEqual("reply");
    done();
  }
})
)}

function _13(suite,flowQueue,testing){return(
suite.test("respond with promise", async () => {
  const q = flowQueue();
  const prom = q.send();
  q.respond(new Promise((resolve) => resolve("respond val")));
  const response = await prom;
  testing.expect(response).toBe("respond val");
})
)}

function _14(suite,flowQueue,testing){return(
suite.test("respond without send throws", async () => {
  const q = flowQueue();
  await testing
    .expect(q.respond())
    .rejects.toEqual(Error("No task executing! "));
})
)}

function _15(suite,flowQueue,testing){return(
suite.test("missing respond rejects with timout", async () => {
  const q = flowQueue({ timeout_ms: 1 });
  await testing
    .expect(q.send())
    .rejects.toEqual(Error("Timeout (maybe increase timeout_ms?) "));
})
)}

function _16(suite,$0,testing){return(
suite.test("works in a real notebook", async () => {
  // Here we call a flowQueue that resides in the cells underneath, and collect the result.
  const result = $0.send(4);
  await testing.expect(result).resolves.toBe(2);
})
)}

function _18(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["flowQuery@1.svg", {url: new URL("./files/2166d28716de155cb2e835f715303ad5424fafa96abbed2e8ae8be3bda3111ed08a113a82cf3fe6c38446382f338627d45fd0ce40155baaeff770b6c8e76f0da.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("flowQueue")).define("flowQueue", ["htl","Event"], _flowQueue);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof sqrt")).define("viewof sqrt", ["flowQueue"], _sqrt);
  main.variable(observer("sqrt")).define("sqrt", ["Generators", "viewof sqrt"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof sqrt","sqrt"], _6);
  main.variable(observer("testing")).define("testing", ["flowQueue"], _testing);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","flowQueue","testing"], _9);
  main.variable(observer("viewof maybeReply")).define("viewof maybeReply", ["flowQueue"], _maybeReply);
  main.variable(observer("maybeReply")).define("maybeReply", ["Generators", "viewof maybeReply"], (G, _) => G.input(_));
  main.variable(observer("maybeReplyReplier")).define("maybeReplyReplier", ["maybeReply","viewof maybeReply"], _maybeReplyReplier);
  main.variable(observer()).define(["suite","viewof maybeReply","testing"], _12);
  main.variable(observer()).define(["suite","flowQueue","testing"], _13);
  main.variable(observer()).define(["suite","flowQueue","testing"], _14);
  main.variable(observer()).define(["suite","flowQueue","testing"], _15);
  main.variable(observer()).define(["suite","viewof sqrt","testing"], _16);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _18);
  return main;
}
