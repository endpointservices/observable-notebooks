import define1 from "./ab3e70b29c480e6d@83.js";
import define2 from "./6eda90668ae03044@803.js";
import define3 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Generic Notebook Health Check

This notebook executes other notebooks through an embedded [runtime](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) and looks for errors thrown by cells. You do not need to modify the original notebook in any way! It exposes its functionality as an endpoint, which can be connected to uptime monitors such as [pingdom](https://www.pingdom.com/) or [uptimerobot](https://uptimerobot.com/). If an initialized [sentry.io](https://observablehq.com/@endpointservices/sentry-io) SDK is found, it is also used report those errors (Sentry logs include context and source code line numbers).

To use, first fill in the manual trigger fields to get a feel of the events and errors. Then copy and paste the link your endpoint monitoring service of choice.

Some notebooks throw errors for reasonable reasons. You can ignore errors from names cells with the comma delimited field "excludes".`
)});
  main.variable(observer()).define(["settings","md"], function(settings,md){return(
md`## Errors of ${settings.target}`
)});
  main.variable(observer()).define(["Inputs","errors"], function(Inputs,errors){return(
Inputs.table(errors)
)});
  main.variable(observer()).define(["settings","md"], function(settings,md){return(
md`## Runtime Events of ${settings.target}`
)});
  main.variable(observer()).define(["Inputs","events"], function(Inputs,events){return(
Inputs.table(events, {
  width: {
    status: "10%",
    ts: "15%"
  }
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Manual Trigger

Test a notebook by entering a text input`
)});
  main.variable(observer("viewof manualTarget")).define("viewof manualTarget", ["Inputs"], function(Inputs){return(
Inputs.text({
  label: "target",
  placeholder: "@tomlarkworthy/saas-tutorial",
  minlength: 1
})
)});
  main.variable(observer("manualTarget")).define("manualTarget", ["Generators", "viewof manualTarget"], (G, _) => G.input(_));
  main.variable(observer("viewof manualExcludes")).define("viewof manualExcludes", ["Inputs"], function(Inputs){return(
Inputs.text({
  label: "cells to exclude (comma seperated)"
})
)});
  main.variable(observer("manualExcludes")).define("manualExcludes", ["Generators", "viewof manualExcludes"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","run","viewof manualTarget","viewof manualExcludes"], function(Inputs,run,$0,$1){return(
Inputs.button("Go!", {
  reduce: () => {
    run($0.value, $1.value);
  }
})
)});
  main.variable(observer()).define(["manualTarget","manualExcludes","copy","htl"], function(manualTarget,manualExcludes,copy,htl){return(
htl.html`Your manual trigger as a <a target="_blank"
  href=${`https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=${manualTarget}&excludes=${encodeURIComponent(manualExcludes)}`}>http trigger</a>

<button onclick=${() => copy(`https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=${manualTarget}&excludes=${encodeURIComponent(manualExcludes)}`)}>Copy to clipboard</button>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### HTTP Trigger

Test a notebook by sending a HTTP request to

~~~
https://webcode.run/observablehq.com/@endpointservices/notebook-availability?notebook=<notebook path>
~~~`
)});
  main.variable(observer()).define(["endpoint","run","viewof errors","viewof settings"], function(endpoint,run,$0,$1){return(
endpoint(
  "default", // For a simple URL we use the default name leading to https://webcode.run/observablehq.com/@endpointservices/healthcheck
  async (req, res) => {
    const target = req.query.target; // Read the target notebook.
    if (!target) return res.send(400);
    const excludes = req.query.excludes || ""; // Read which cells to ignore errors from

    run(target, excludes); // start health checking

    setTimeout(() => {
      // There is no clear stopping point so we just run it for X seconds
      const errors = $0.value; // collect errors
      res.status(errors.length > 0 ? 503 : 200).send(
        JSON.stringify(
          {
            settings: $1.value,
            errors: errors.map((e) => ({
              cell: e.cell,
              message: e.error.message
            }))
          },
          null,
          2
        )
      );
    }, 5000);
  },
  {
    reusable: false, // This does not support concurrent operations
    modifiers: ["orchistrator"] // This endpoint can call other endpoints
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Notebook Runner`
)});
  main.variable(observer("run")).define("run", ["viewof excludes","Event","viewof errors","viewof events","viewof settings"], function($0,Event,$1,$2,$3){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Runner state`
)});
  main.variable(observer("viewof settings")).define("viewof settings", ["Inputs"], function(Inputs){return(
Inputs.input()
)});
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("viewof errors")).define("viewof errors", ["Inputs"], function(Inputs){return(
Inputs.input([])
)});
  main.variable(observer("errors")).define("errors", ["Generators", "viewof errors"], (G, _) => G.input(_));
  main.variable(observer("viewof events")).define("viewof events", ["Inputs"], function(Inputs){return(
Inputs.input([])
)});
  main.variable(observer("events")).define("events", ["Generators", "viewof events"], (G, _) => G.input(_));
  main.variable(observer("viewof excludes")).define("viewof excludes", ["Inputs"], function(Inputs){return(
Inputs.input([])
)});
  main.variable(observer("excludes")).define("excludes", ["Generators", "viewof excludes"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Runner Runtime`
)});
  main.variable(observer("module")).define("module", ["settings","viewof events","Event","viewof sentry","viewof excludes","viewof errors"], async function(settings,$0,Event,$1,$2,$3)
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
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Sentry.io integration

Sentry SDK is sniffed from dataflow execution and used report all errors`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Discovered Sentry SDK (or null)`
)});
  main.variable(observer("viewof sentry")).define("viewof sentry", ["Inputs"], function(Inputs){return(
Inputs.input(undefined)
)});
  main.variable(observer("sentry")).define("sentry", ["Generators", "viewof sentry"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Report error log

We grow the reportedErrors array to same length as the error array by reporting errors to the SDK.`
)});
  main.variable(observer("viewof reportedErrors")).define("viewof reportedErrors", ["Inputs"], function(Inputs){return(
Inputs.input([])
)});
  main.variable(observer("reportedErrors")).define("reportedErrors", ["Generators", "viewof reportedErrors"], (G, _) => G.input(_));
  main.variable(observer("reportMissingErrors")).define("reportMissingErrors", ["sentry","reportedErrors","errors"], function(sentry,reportedErrors,errors)
{
  if (sentry) {
    while (reportedErrors.length < errors.length) {
      const nextError = errors[reportedErrors.length];
      reportedErrors.push(nextError);
      sentry.captureException(nextError.error);
    }
  }
}
);
  const child1 = runtime.module(define1);
  main.import("copy", child1);
  const child2 = runtime.module(define2);
  main.import("endpoint", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
