import define1 from "./374124b361974cb3@259.js";
import define2 from "./0e0b35a92c819d94@418.js";
import define3 from "./ab3e70b29c480e6d@83.js";
import define4 from "./6eda90668ae03044@830.js";
import define5 from "./048a17a165be198d@263.js";
import define6 from "./293899bef371e135@268.js";

function _1(md){return(
md`# Generic Notebook Health Check

This notebook executes other notebooks through an embedded [runtime](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) and looks for errors thrown by cells. You do not need to modify the original notebook in any way! It exposes its functionality as an endpoint, which can be connected to uptime monitors such as [pingdom](https://www.pingdom.com/) or [uptimerobot](https://uptimerobot.com/). If an initialized [sentry.io](https://observablehq.com/@endpointservices/sentry-io) SDK is found, it is also used report those errors (Sentry logs include context and source code line numbers).

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

function _12(Inputs,run,$0,$1){return(
Inputs.button("Go!", {
  reduce: () => {
    run($0.value, $1.value);
  }
})
)}

function _permLink(URLSearchParams,location,manualTarget,manualExcludes,wait,healthcheckEndpoint)
{
  const params = new URLSearchParams(location.search);
  params.set("target", manualTarget);
  params.set("excludes", manualExcludes);
  params.set("wait", wait);

  return `${healthcheckEndpoint.href}?${params.toString()}`;
}


function _14(permLink,copy,htl){return(
htl.html`Your settings as a <a target="_blank"
  href=${permLink}>http endpoint</a>

<button onclick=${() => copy(permLink)}>Copy to clipboard</button>`
)}

function _healthcheckEndpoint(endpoint,run,$0,$1,host){return(
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
    const wait = req.query.wait || 10;
    if (!target) return res.status(400);
    const excludes = req.query.excludes || ""; // Read which cells to ignore errors from
    window.rEPseDFzXFSPYkNz = // Inject location.search for notebooks using https://observablehq.com/@tomlarkworthy/url-query-field-view
      "?" +
      Object.entries(req.query)
        .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
        .join("");

    run(target, excludes); // start health checking

    setTimeout(() => {
      // There is no clear stopping point so we just run it for X seconds
      const errors = $0.value; // collect errors
      const status = errors.length > 0 ? 503 : 200;
      const payload = JSON.stringify(
        {
          settings: $1.value,
          errors: errors.map((e) => ({
            cell: e.cell,
            message: e.error.message
          }))
        },
        null,
        2
      );

      res.status(status).send(payload);
    }, wait * 1000);
  },
  {
    host,
    livecode: false, // Can affect monitoring if left open by accident
    reusable: false, // This does not support concurrent operations
    modifiers: ["orchistrator"] // This endpoint can call other endpoints
  }
)
)}

function _16(md){return(
md`## Notebook Runner`
)}

function _run($0,Event,$1,$2,$3){return(
(target, excludes) => {
  console.log("Run", target, excludes);
  $0.value = excludes.split(",").map((_) => _.trim());
  $0.dispatchEvent(new Event("input", { bubbles: true }));
  $1.value = [];
  $1.dispatchEvent(new Event("input", { bubbles: true }));
  $2.value = [];
  $2.dispatchEvent(new Event("input", { bubbles: true }));
  $3.value = { target, excludes: $0.value };
  $3.dispatchEvent(new Event("input", { bubbles: true }));
}
)}

function _18(md){return(
md`### Runner state`
)}

function _settings(Inputs){return(
Inputs.input()
)}

function _errors(Inputs){return(
Inputs.input([])
)}

function _events(Inputs){return(
Inputs.input([])
)}

function _excludes(Inputs){return(
Inputs.input([])
)}

function _23(md){return(
md`### Runner Runtime`
)}

async function _module(settings,$0,Event,$1,$2,$3)
{
  window["@endpointservices/healthcheck"] = true;
  const [{ Runtime }, { default: targetNotebook }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/${settings.target}.js?v=3`)
  ]);
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
        const ignore = $2.value.includes(name);
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
          $3.value = [
            ...$3.value,
            { error: error, cell: name }
          ];
          $3.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    };
  });
}


function _25(md){return(
md`### Production Debugger`
)}

function _trackingVariable_9uEFkhSF43aPddAA(){return(
true
)}

function _28(endpoint,notebookSnapshot){return(
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

function _29(md){return(
md`### Sentry.io integration

Sentry SDK is sniffed from dataflow execution and used report all errors`
)}

function _30(md){return(
md`### Discovered Sentry SDK (or null)`
)}

function _sentry(Inputs){return(
Inputs.input(undefined)
)}

function _32(md){return(
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


function _40(footer){return(
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
  main.variable(observer()).define(["Inputs","run","viewof manualTarget","viewof manualExcludes"], _12);
  main.variable(observer("permLink")).define("permLink", ["URLSearchParams","location","manualTarget","manualExcludes","wait","healthcheckEndpoint"], _permLink);
  main.variable(observer()).define(["permLink","copy","htl"], _14);
  main.variable(observer("healthcheckEndpoint")).define("healthcheckEndpoint", ["endpoint","run","viewof errors","viewof settings","host"], _healthcheckEndpoint);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("run")).define("run", ["viewof excludes","Event","viewof errors","viewof events","viewof settings"], _run);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("viewof errors")).define("viewof errors", ["Inputs"], _errors);
  main.variable(observer("errors")).define("errors", ["Generators", "viewof errors"], (G, _) => G.input(_));
  main.variable(observer("viewof events")).define("viewof events", ["Inputs"], _events);
  main.variable(observer("events")).define("events", ["Generators", "viewof events"], (G, _) => G.input(_));
  main.variable(observer("viewof excludes")).define("viewof excludes", ["Inputs"], _excludes);
  main.variable(observer("excludes")).define("excludes", ["Generators", "viewof excludes"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("module")).define("module", ["settings","viewof events","Event","viewof sentry","viewof excludes","viewof errors"], _module);
  main.variable(observer()).define(["md"], _25);
  const child1 = runtime.module(define1);
  main.import("notebookSnapshot", child1);
  main.import("modules", child1);
  main.variable(observer("trackingVariable_9uEFkhSF43aPddAA")).define("trackingVariable_9uEFkhSF43aPddAA", _trackingVariable_9uEFkhSF43aPddAA);
  main.variable(observer()).define(["endpoint","notebookSnapshot"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof sentry")).define("viewof sentry", ["Inputs"], _sentry);
  main.variable(observer("sentry")).define("sentry", ["Generators", "viewof sentry"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _32);
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
  main.variable(observer()).define(["footer"], _40);
  return main;
}