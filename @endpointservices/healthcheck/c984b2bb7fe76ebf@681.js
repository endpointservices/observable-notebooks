import define1 from "./374124b361974cb3@264.js";
import define2 from "./0e0b35a92c819d94@434.js";
import define3 from "./ab3e70b29c480e6d@83.js";
import define4 from "./6eda90668ae03044@836.js";
import define5 from "./048a17a165be198d@263.js";
import define6 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Generic Notebook Health Check


You can use this notebook to actively detect errors in any of your notebook quickly. Read more about the process of productionizing notebooks [here](https://observablehq.com/@tomlarkworthy/howto-monitoring).

This notebook executes other notebooks through an embedded [runtime](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) and looks for errors thrown by cells. You do not need to modify the original notebook in any way! It exposes its functionality as an endpoint, which can be connected to uptime monitors such as [pingdom](https://www.pingdom.com/) or [uptimerobot](https://uptimerobot.com/?rid=ea2c825277fe40). If an initialized [sentry.io](https://observablehq.com/@endpointservices/sentry-io) SDK is found, it is also used report those errors (Sentry logs include context and source code line numbers). 


To use, first fill in the manual trigger fields to get a feel of the events and errors. Then copy and paste the link your endpoint monitoring service of choice.

Some notebooks throw errors for reasonable reasons. You can ignore errors from names cells with the comma delimited field "excludes".


This notebook pairs well with the unit testing library: [@tomlarkworthy/testing](https://observablehq.com/@tomlarkworthy/testing), as failed unit tests throw exceptions that are detected by health monitoring.
`
)}

function _2(settings,md){return(
md`## Errors of ${settings.target}`
)}

function _errorSelection(Inputs,errors){return(
Inputs.table(errors)
)}

function _4(errorSelection){return(
errorSelection
)}

function _5(settings,md){return(
md`## Runtime Events of ${settings.target}`
)}

function _6(Inputs,events){return(
Inputs.table(events, {
  width: {
    status: "10%",
    ts: "15%"
  }
})
)}

function _7(md){return(
md`### Manual Trigger

Test a notebook by entering a text input`
)}

function _host(Inputs){return(
Inputs.select(["webcode.run", "http://localhost:8080"], {
  label: "host"
})
)}

function _manualTarget(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "target",
    placeholder: "@tomlarkworthy/saas-tutorial",
    minlength: 1
  }),
  localStorageView("healthcheck_notebook")
)
)}

function _manualExcludes(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "cells to exclude (comma seperated)"
  }),
  localStorageView("healthcheck_excludes")
)
)}

function _wait(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([1, 100], {
    step: 1,
    label: "seconds to wait for a cell to resolve"
  }),
  localStorageView("healthcheck_wait")
)
)}

function _result(Inputs,run,$0,$1,wait){return(
Inputs.button("Go!", {
  required: true,
  reduce: () =>
    run($0.value, $1.value, wait)
})
)}

function _13(result){return(
result
)}

function _permLink(URLSearchParams,location,manualTarget,manualExcludes,wait,healthcheckEndpoint)
{
  const params = new URLSearchParams(location.search);
  params.set("target", manualTarget);
  params.set("excludes", manualExcludes);
  params.set("wait", wait);

  return `${healthcheckEndpoint.href}?${params.toString()}`;
}


function _15(permLink,copy,htl){return(
htl.html`Your settings as a <a target="_blank"
  href=${permLink}>http endpoint</a>

<button onclick=${() => copy(permLink)}>Copy to clipboard</button>`
)}

function _healthcheckEndpoint(endpoint,run,host){return(
endpoint(
  "default", // For a simple URL we use the default name leading to https://webcode.run/observablehq.com/@endpointservices/healthcheck
  async (req, res) => {
    const target = req.query.target; // Read the target notebook.

    /* If needed we can block by namespace
    if (target.startsWith("@unavco"))
      return res
        .status(400)
        .send("@unavco is sending data too fast, blocked short term");
    */
    if (!target) return res.status(400);
    const excludes = req.query.excludes || ""; // Read which cells to ignore errors from
    window.rEPseDFzXFSPYkNz = // Inject location.search for notebooks using https://observablehq.com/@tomlarkworthy/url-query-field-view
      "?" +
      Object.entries(req.query)
        .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
        .join("");

    try {
      const response = await run(target, excludes, req.query.wait); // start health checking
      const status = response.errors.length > 0 ? 503 : 200;
      const payload = JSON.stringify(
        {
          settings: response.settings,
          errors: response.errors.map((e) => ({
            cell: e.cell,
            message: e.error.message
          }))
        },
        null,
        2
      );
      res.status(status).send(payload);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  {
    host,
    livecode: false, // Can affect monitoring if left open by accident
    reusable: false, // This does not support concurrent operations
    modifiers: ["orchistrator"] // This endpoint can call other endpoints
  }
)
)}

function _17(md){return(
md`## Notebook Runner`
)}

function _run($0){return(
(target, excludes, wait = 10) =>
  $0.send({
    wait,
    target,
    excludes: excludes.split(",").map((_) => _.trim())
  })
)}

function _19(md){return(
md`### Runner Runtime`
)}

function _healthcheck(flowQueue){return(
flowQueue({
  timeout_ms: 55000
})
)}

function _settings(healthcheck){return(
healthcheck
)}

function _errors(settings,Inputs){return(
settings, Inputs.input([])
)}

function _events(settings,Inputs){return(
settings, Inputs.input([])
)}

async function _Runtime($0,invalidation)
{
  try {
    const { Runtime } = await import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    );

    return Runtime;
  } catch (err) {
    $0.reject(err);
    return invalidation;
  }
}


async function _targetNotebook(settings,$0,invalidation)
{
  try {
    window["@endpointservices/healthcheck"] = true;
    const { default: targetNotebook } = await import(
      `https://api.observablehq.com/${settings.target}.js?v=3`
    );

    return targetNotebook;
  } catch (err) {
    $0.reject(err);
    return invalidation;
  }
}


function _runner(settings,Runtime,targetNotebook,$0,Event,$1,$2)
{
  console.log("Running", settings);
  const start = Date.now();
  return new Runtime().module(targetNotebook, (name) => {
    return {
      pending() {
        $0.value = [
          ...$0.value,
          { status: "pending", ts: Date.now() - start, name: name }
        ];
        $0.dispatchEvent(new Event("input", { bubbles: true }));
      },
      fulfilled(value) {
        $0.value = [
          ...$0.value,
          {
            status: "fulfilled",
            ts: Date.now() - start,
            name: name,
            value: value
          }
        ];
        $0.dispatchEvent(new Event("input", { bubbles: true }));
        let sentrySDK = undefined;
        if (value?.captureException) sentrySDK = value;
        else if (value?.sentry?.captureException) sentrySDK = value.sentry;
        else if (value?.value?.sentry?.captureException)
          sentrySDK = value.value.sentry;

        if (sentrySDK) {
          $1.value = sentrySDK;
          $1.dispatchEvent(new Event("input", { bubbles: true }));
        }
      },
      rejected(error) {
        const ignore = settings.excludes.includes(name);
        debugger;
        $0.value = [
          ...$0.value,
          {
            status: ignore ? "ignored" : "rejected",
            ts: Date.now() - start,
            name: name,
            error: error
          }
        ];
        $0.dispatchEvent(new Event("input", { bubbles: true }));

        if (!ignore) {
          // Report error
          $2.value = [
            ...$2.value,
            { error: error, cell: name }
          ];
          $2.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };
  });
}


function _responder(runner,$0,$1,$2){return(
runner, // No clear time to finish so we just send everytyhing aftger a timeout
setTimeout(() => {
  const response = {
    settings: $0.value,
    errors: $1.value,
    events: $2.value
  };
  console.log("responding", response);
  $0.resolve(response);
}, $0.value.wait * 1000)
)}

function _28(md){return(
md`### Production Debugger`
)}

function _trackingVariable_9uEFkhSF43aPddAA(){return(
true
)}

function _31(endpoint,notebookSnapshot){return(
endpoint("variables", async (req, res) => {
  res.json(
    (await notebookSnapshot("trackingVariable_9uEFkhSF43aPddAA")).map(
      (variable) => ({
        state: variable.state,
        name: variable.name,
        // Note these cells might contain personal information, so we only allow errors values to leave the environment
        ...(variable.state === "rejected" && { value: variable.value })
      })
    )
  );
})
)}

function _32(md){return(
md`### Sentry.io integration

Sentry SDK is sniffed from dataflow execution and used report all errors`
)}

function _33(md){return(
md`### Discovered Sentry SDK (or null)`
)}

function _sentry(Inputs){return(
Inputs.input(undefined)
)}

function _35(md){return(
md`### Report error log

We grow the reportedErrors array to same length as the error array by reporting errors to the SDK.`
)}

function _reportedErrors(Inputs){return(
Inputs.input([])
)}

function _reportMissingErrors(sentry,reportedErrors,errors)
{
  if (sentry) {
    while (reportedErrors.length < errors.length) {
      const nextError = errors[reportedErrors.length];
      reportedErrors.push(nextError);
      sentry.captureException(nextError.error);
    }
  }
}


function _43(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["settings","md"], _2);
  main.variable(observer("viewof errorSelection")).define("viewof errorSelection", ["Inputs","errors"], _errorSelection);
  main.variable(observer("errorSelection")).define("errorSelection", ["Generators", "viewof errorSelection"], (G, _) => G.input(_));
  main.variable(observer()).define(["errorSelection"], _4);
  main.variable(observer()).define(["settings","md"], _5);
  main.variable(observer()).define(["Inputs","events"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof host")).define("viewof host", ["Inputs"], _host);
  main.variable(observer("host")).define("host", ["Generators", "viewof host"], (G, _) => G.input(_));
  main.variable(observer("viewof manualTarget")).define("viewof manualTarget", ["Inputs","localStorageView"], _manualTarget);
  main.variable(observer("manualTarget")).define("manualTarget", ["Generators", "viewof manualTarget"], (G, _) => G.input(_));
  main.variable(observer("viewof manualExcludes")).define("viewof manualExcludes", ["Inputs","localStorageView"], _manualExcludes);
  main.variable(observer("manualExcludes")).define("manualExcludes", ["Generators", "viewof manualExcludes"], (G, _) => G.input(_));
  main.variable(observer("viewof wait")).define("viewof wait", ["Inputs","localStorageView"], _wait);
  main.variable(observer("wait")).define("wait", ["Generators", "viewof wait"], (G, _) => G.input(_));
  main.variable(observer("viewof result")).define("viewof result", ["Inputs","run","viewof manualTarget","viewof manualExcludes","wait"], _result);
  main.variable(observer("result")).define("result", ["Generators", "viewof result"], (G, _) => G.input(_));
  main.variable(observer()).define(["result"], _13);
  main.variable(observer("permLink")).define("permLink", ["URLSearchParams","location","manualTarget","manualExcludes","wait","healthcheckEndpoint"], _permLink);
  main.variable(observer()).define(["permLink","copy","htl"], _15);
  main.variable(observer("healthcheckEndpoint")).define("healthcheckEndpoint", ["endpoint","run","host"], _healthcheckEndpoint);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("run")).define("run", ["viewof healthcheck"], _run);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("viewof healthcheck")).define("viewof healthcheck", ["flowQueue"], _healthcheck);
  main.variable(observer("healthcheck")).define("healthcheck", ["Generators", "viewof healthcheck"], (G, _) => G.input(_));
  main.variable(observer("settings")).define("settings", ["healthcheck"], _settings);
  main.variable(observer("viewof errors")).define("viewof errors", ["settings","Inputs"], _errors);
  main.variable(observer("errors")).define("errors", ["Generators", "viewof errors"], (G, _) => G.input(_));
  main.variable(observer("viewof events")).define("viewof events", ["settings","Inputs"], _events);
  main.variable(observer("events")).define("events", ["Generators", "viewof events"], (G, _) => G.input(_));
  main.variable(observer("Runtime")).define("Runtime", ["viewof healthcheck","invalidation"], _Runtime);
  main.variable(observer("targetNotebook")).define("targetNotebook", ["settings","viewof healthcheck","invalidation"], _targetNotebook);
  main.variable(observer("runner")).define("runner", ["settings","Runtime","targetNotebook","viewof events","Event","viewof sentry","viewof errors"], _runner);
  main.variable(observer("responder")).define("responder", ["runner","viewof healthcheck","viewof errors","viewof events"], _responder);
  main.variable(observer()).define(["md"], _28);
  const child1 = runtime.module(define1);
  main.import("notebookSnapshot", child1);
  main.import("modules", child1);
  main.variable(observer("trackingVariable_9uEFkhSF43aPddAA")).define("trackingVariable_9uEFkhSF43aPddAA", _trackingVariable_9uEFkhSF43aPddAA);
  main.variable(observer()).define(["endpoint","notebookSnapshot"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof sentry")).define("viewof sentry", ["Inputs"], _sentry);
  main.variable(observer("sentry")).define("sentry", ["Generators", "viewof sentry"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("viewof reportedErrors")).define("viewof reportedErrors", ["Inputs"], _reportedErrors);
  main.variable(observer("reportedErrors")).define("reportedErrors", ["Generators", "viewof reportedErrors"], (G, _) => G.input(_));
  main.variable(observer("reportMissingErrors")).define("reportMissingErrors", ["sentry","reportedErrors","errors"], _reportMissingErrors);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  const child3 = runtime.module(define3);
  main.import("copy", child3);
  const child4 = runtime.module(define4);
  main.import("endpoint", child4);
  const child5 = runtime.module(define5);
  main.import("localStorageView", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _43);
  return main;
}
