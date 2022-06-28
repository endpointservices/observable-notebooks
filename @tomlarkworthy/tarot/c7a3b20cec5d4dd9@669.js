// https://observablehq.com/@tomlarkworthy/testing@669
import define1 from "./84e66f78139ac354@829.js";
import define2 from "./58f3eb7334551ae6@209.js";

async function _1(md,FileAttachment){return(
md`# Reactive Unit Testing and Reporting Framework

<center>
<img width="30%" src=${await FileAttachment(
  "noun_test_2404407.svg"
).url()}></img>
</center>

A test suite that updates as you fix bugs in realtime. Combines with [healthcheck](https://observablehq.com/@endpointservices/healthcheck) to create a CI.

  - Monitorable with [healthcheck](https://observablehq.com/@endpointservices/healthcheck)
  - Followable stack track from failure to implementation
  - filter tests by __regex__
  - rerun tests by pressing enter.
  - Familiar Jest expressions

Only matched tests are run, allowing you to focus on executing individual tests precisely.  


Import the suite
~~~js
    import {createSuite, expect} from '@tomlarkworthy/testing'
~~~

Create the UI
~~~js
    viewof suite = createSuite({
      name: "mySuite",
      timeout_ms: 1000
    })
~~~

Create named tests using [jest expect](https://jestjs.io/docs/en/expect).
~~~js
    suite.test("A passing test", () => {expect(true).toBe(true)})
~~~

See the [example here](https://observablehq.com/@tomlarkworthy/testing-example).


### Change log
- 2021-11-10 Remove TAP link, [healthcheck](https://observablehq.com/@endpointservices/healthcheck) is better. 
- 2020-03-23 TAP reports are now hosted by "orchestrator" cells so can be used to test serverless cell services
- 2020-02-14 Collaberation between [@chonghorizons](https://observablehq.com/@chonghorizons) and [@tomlarkworthy](https://observablehq.com/@tomlarkworthy) to add *timeout_ms* and explicit _done_() callback
`
)}

function _2(md){return(
md`## Lazy loading

You might not want testing to be a static dependancy, you can use something like the following to programatically load the testing library only if some condition is true. (thanks [@mootari](/@mootari) who donated this)
~~~js
testing = {
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(\`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3\`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}
~~~

`
)}

function _createSuite(pseudouuid,reconcile,html,HTMLAnchorElement,invalidation){return(
({
  name = "tests", // Set to null to turn of tap report link
  timeout_ms = 30000
} = {}) => {
  const id = pseudouuid();
  const tests = {};
  const results = {};
  var filter = "";
  const regex = () => new RegExp(filter);

  function updateUI() {
    reconcile(document.getElementById(id), generate());
  }

  // from https://spin.atomicobject.com/2020/01/16/timeout-promises-nodejs/
  function promiseWithTimeout(timeoutMs, promise, failureMessage) {
    let timeoutHandle;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutHandle = setTimeout(
        () => reject(new Error(failureMessage)),
        timeoutMs
      );
    });
    return Promise.race([promise, timeoutPromise]).then((result) => {
      clearTimeout(timeoutHandle);
      return result;
    });
  }

  async function maybeRunTest(name) {
    if (regex().test(name)) {
      results[name] = undefined;
      updateUI();
      try {
        await promiseWithTimeout(timeout_ms, tests[name](), "Timeout");
        results[name] = "ok";
        updateUI();
        return results[name];
      } catch (err) {
        results[name] = err;
        updateUI();
        throw err;
      }
    }
  }

  function filterChange(evt) {
    if (filter !== evt.target.value) {
      filter = evt.target.value;
      updateUI();
    }
    if (evt.keyCode === 13) {
      Object.keys(tests).map((label) => maybeRunTest(label));
    }
  }

  function generate() {
    return html`<div class="testsuite" id=${id}>
        ${name ? html`<h2 id="title{id}">${name}</h2>` : null}
        <a name="testsuite${id}"></a>
        <input key="filter"
          oninput=${(e) => e.stopPropagation()}
          onkeyup=${filterChange}
          value="${filter}"
          placeholder="test filter regex"></input>
        <table key="results" style="max-width: 100%">
          <tr><th>name</th><th>value</th></tr>
          ${Object.keys(results)
            .filter((label) => regex().test(label))
            .sort()
            .map(
              (label) => html.fragment`
                <tr><td>
                  <a href="#testresult${encodeURIComponent(label)}">
                    ${label}
                  </a>
                </td><td>${
                  results[label] ? (results[label] + "").slice(0, 200) : null
                }
                </td></tr>
              `
            )}
        </table>
        <style>
          a[name] { scroll-margin-top: 75px }
        </style>
      </div>`;
  }
  const api = {
    results: results,
    test: async (label, fn) => {
      // console.log(`Test scheduled: ${label}`);
      results[label] = undefined;
      const run = async () => {
        // If the user supplies a done handler in the fn, use that
        return fn.length == 1
          ? new Promise(async (resolve, reject) => {
              const done = (error) => {
                if (error) reject(error);
                else resolve();
              };
              try {
                await fn(done);
              } catch (error) {
                reject(error);
              }
            })
          : fn();
      };
      tests[label] = run;
      const result = await maybeRunTest(label);
      const color = result === "ok" ? "green" : "red";
      return html`<div class="testresult" style="font: var(--mono_fonts); color: ${color}; padding: 6px 0;">
        <a name="testresult${encodeURIComponent(label)}"></a>
        ${label}: ${result}
        <a style="float:right" href="#testsuite${id}">goto suite</a>
      </div>`;
    }
  };
  {
    // Navigation widget
    const isLocalLink = (a) =>
      a instanceof HTMLAnchorElement && a.getAttribute("href").match(/^#/);
    const scrollTo = (e) => {
      let l = e.target,
        t;
      if (
        isLocalLink(l) &&
        (t = document.querySelector(`[name="${l.hash.slice(1)}"]`))
      ) {
        e.preventDefault();
        t.scrollIntoView();
      }
    };
    document.addEventListener("click", scrollTo);
    invalidation.then(() => document.removeEventListener("click", scrollTo));
  }

  const view = html`${generate()}`;
  view.value = api;
  return view;
}
)}

function _report(){return(
function report(suite, { timeout = 10000 } = {}) {
  function tap(suite) {
    // Ugly indentation here to avoid whitespace in the TAP report.
    return `TAP version 13
1..${Object.keys(suite.results).length}
${Object.keys(suite.results)
  .sort()
  .map((name, index) => {
    let status = 'not ok';
    let details = '';
    if (suite.results[name] === 'ok') status = 'ok';

    if (status === 'not ok') {
      details = `\n  ---\n  message: ${JSON.stringify(suite.results[name])}`;
    }
    return `${status} ${index + 1} - ${name}${details}`;
  })
  .join('\n')}`;
  }
  // This is a bit of a crappy poll loop
  // but its only intended for http handler use
  // https://stackoverflow.com/questions/30505960/use-promise-to-wait-until-polled-condition-is-satisfied
  return new Promise(function(resolve, reject) {
    function waitForResults() {
      if (!Object.values(suite.results).includes(undefined))
        return resolve(tap(suite));
      setTimeout(waitForResults, 100);
    }
    setTimeout(waitForResults, 1000);
  });
}
)}

function _5(md){return(
md`## Test Suite UI`
)}

function _suite(createSuite){return(
createSuite({
  timeout_ms: 5000
})
)}

function _7(md){return(
md`#### The report links to an always on TAP report`
)}

async function _8(html,report,suite){return(
html`<pre>${await report(suite)}</pre>`
)}

function _9(md){return(
md`## Some Tests`
)}

function _10(suite,expect){return(
suite.test("sync pass", () => expect(true).toBe(true))
)}

function _11(md){return(
md`#### Demo of what a failing test looks like`
)}

function _12(suite,expect){return(
suite.test("sync fail", () => expect(true).toBe(false))
)}

function _13(suite,expect){return(
suite.test("throw exception", () => {
  console.log("Run: Throws exception")
  expect(() => {
    throw new Error("Expected exception");
  }).toThrow();
})
)}

function _14(suite){return(
suite.test("asyncORIG - original function", async () => {
  console.log("Run: async function")
  await new Promise(resolve => setTimeout(resolve, 500));
  return "foo2"
})
)}

function _15(md){return(
md`### Some more async function tests

added by @chonghorizons, Feb2021`
)}

function _16(md){return(
md`#### Demo of timeout`
)}

function _17(suite){return(
suite.test("async0 - should fail, no resolve", async () => {
  console.log("Run: async function")
//  await new Promise(resolve => setTimeout(resolve, 1000));
  await new Promise( resolve => {});
})
)}

function _18(suite,expect){return(
suite.test("async1 check returned data", async () => {
  await new Promise(resolve => setTimeout(()=>resolve("foo"), 1000))
    .then(data => {
    expect(data).toBe("foo");
  })
})
)}

function _19(md){return(
md`#### Demo of not calling _done_ will timeout`
)}

function _20(suite){return(
suite.test("async2 function hanging example, should fail", done => {
  
})
)}

function _21(md){return(
md`#### Demo of _done_ param is propogated as an error`
)}

function _22(suite){return(
suite.test("done arg is an error", done => {
  done(new Error("Not an error really"));
})
)}

function _23(md){return(
md`#### Demo of normal errors will fail a test with _done_`
)}

function _24(suite,expect){return(
suite.test("Failure with done raises error", async done => {
  expect(true).toBe(false);
})
)}

function _25(suite,expect){return(
suite.test('async4: the data is peanut butter', () => {
  const fetchData = () => new Promise(resolve => resolve('peanut butter'));
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
})
)}

function _html(htl){return(
htl.html
)}

function _pseudouuid(){return(
() => Math.random().toString(16).substring(3)
)}

function _expect(require,JEST_EXPECT_STANDALONE_VERSION)
{
  console.log("loding expect");
  if (window.expect) return window.expect;
  return require(`jest-expect-standalone@${JEST_EXPECT_STANDALONE_VERSION}/dist/expect.min.js`).catch(() => {
    console.log("catch returning window.expect", window.expect)
    return window.expect;
  }).then(() => {
    console.log("then returning window.expect", window.expect)
    return window.expect;
  });
}


function _JEST_EXPECT_STANDALONE_VERSION(){return(
"24.0.2"
)}

function _32(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["noun_test_2404407.svg", {url: new URL("./files/b85565d2b6f001a2db39bdbeafbf5aa687188a77a6f65088a3da275743064af6ec763f97d4575207873165a49b07b65e492987b100b4a0d6bbe3df1f74efda1e.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("createSuite")).define("createSuite", ["pseudouuid","reconcile","html","HTMLAnchorElement","invalidation"], _createSuite);
  main.variable(observer("report")).define("report", _report);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["html","report","suite"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["suite","expect"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["suite","expect"], _12);
  main.variable(observer()).define(["suite","expect"], _13);
  main.variable(observer()).define(["suite"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["suite"], _17);
  main.variable(observer()).define(["suite","expect"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["suite"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["suite"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["suite","expect"], _24);
  main.variable(observer()).define(["suite","expect"], _25);
  main.variable(observer("html")).define("html", ["htl"], _html);
  const child1 = runtime.module(define1);
  main.import("reconcile", child1);
  main.variable(observer("pseudouuid")).define("pseudouuid", _pseudouuid);
  main.variable(observer("expect")).define("expect", ["require","JEST_EXPECT_STANDALONE_VERSION"], _expect);
  main.variable(observer("JEST_EXPECT_STANDALONE_VERSION")).define("JEST_EXPECT_STANDALONE_VERSION", _JEST_EXPECT_STANDALONE_VERSION);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _32);
  return main;
}
