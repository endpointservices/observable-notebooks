import define1 from "./c2dae147641e012a@46.js";
import define2 from "./1d309dbd9697e042@703.js";

function _1(md){return(
md`# Endpoint Services Footer


Generic services to apply to all Endpoint Service notebooks, e.g. error monitoring, analytics and backups.

\`\`\`js
import { footer } from "@endpointservices/endpoint-services-footer"
---
footer
\`\`\``
)}

function _graphic(md){return(
md`<small>
[WEBCode.run](https://webcode.run) makes building fully encapsulated services within Observable notebooks possible.

*Endpoint Services collects usage metrics through [Plausible Analytics](https://plausible.io/) and publishes them [here](https://observablehq.com/@endpointservices/plausible-analytics). Notebooks are monitored for errors using [sentry.io](https://sentry.io).* </small>`
)}

function _footer(plausible_analytics,sentry,backups,graphic)
{
  plausible_analytics;
  sentry;
  backups;
  graphic.sentry = sentry;
  return graphic;
}


function _4(md){return(
md`### Usage: Plausible Analytics

Note, data domain auto set so it will only be able to track properties I own. And the use of plausible analytics is for usage stats, no personal information.`
)}

function _plausible_analytics(html,localStorage,XMLHttpRequest)
{
  const DATA_DOMAIN = window.origin.replace("https://", "");
  const DATA_API = "https://plausible.io";
  var a = html`<a href="${document.baseURI.replace(
      "observablehq.com",
      DATA_DOMAIN
    )}">`, // Fix for Observable
    r = window.document,
    t = localStorage, // Fix for Observable
    o = r.currentScript,
    s = "https://plausible.io/api/event",
    l = t && t.plausible_ignore;
  function p(t) {
    console.warn("Ignoring Event: " + t);
  }
  function e(t, e) {
    if (
      /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) ||
      "file:" === a.protocol
    )
      return p("localhost");
    if (
      !(
        window._phantom ||
        window.__nightmare ||
        window.navigator.webdriver ||
        window.Cypress
      )
    ) {
      if ("true" == l) return p("localStorage flag");
      var i = {};
      (i.n = t),
        (i.u = a.href),
        (i.d = DATA_DOMAIN),
        (i.r = r.referrer || null),
        (i.w = window.innerWidth),
        e && e.meta && (i.m = JSON.stringify(e.meta)),
        e && e.props && (i.p = JSON.stringify(e.props));
      var n = new XMLHttpRequest();
      n.open("POST", s, !0),
        n.setRequestHeader("Content-Type", "text/plain"),
        n.send(JSON.stringify(i)),
        (n.onreadystatechange = function () {
          4 == n.readyState && e && e.callback && e.callback();
        });
    }
  }
  var i = (window.plausible && window.plausible.q) || [];
  window.plausible = e;
  for (var n, w = 0; w < i.length; w++) e.apply(this, i[w]);
  function d() {
    n !== a.pathname && ((n = a.pathname), e("pageview"));
  }
  var u,
    c = window.history;
  c.pushState &&
    ((u = c.pushState),
    (c.pushState = function () {
      u.apply(this, arguments), d();
    }),
    window.addEventListener("popstate", d)),
    "prerender" === r.visibilityState
      ? r.addEventListener("visibilitychange", function () {
          n || "visible" !== r.visibilityState || d();
        })
      : d();
}


function _6(md){return(
md`### Error Monitoring: Sentry

Sentry alerts me to errors in notebooks`
)}

function _sentry(html,location,Sentry,Tracing)
{
  const selfUrl = html`<a href="?">`.href;
  if (
    !(
      selfUrl.includes("@endpointservices") ||
      selfUrl.includes("@tomlarkworthy") ||
      location.origin.includes("https://endpointservices") ||
      location.origin.includes("https://tomlarkworthy")
    )
  )
    return;
  Sentry.init({
    dsn:
      "https://f9a89df07acc4958843e8bd2dca8794b@o518834.ingest.sentry.io/5628336",
    beforeSend: (event) => {
      event.request.url = selfUrl.split("?")[0];
      return event;
    },
    integrations: [new Tracing.Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
  return Sentry;
}


async function _Sentry(require,FileAttachment){return(
require(await FileAttachment("browser-6.1.0").url())
)}

async function _Tracing(require,FileAttachment){return(
require(await FileAttachment("tracing-6.1.0").url())
)}

function _11(md){return(
md`### Backups`
)}

function _backups(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices",
  repo: "observable-notebooks"
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("graphic")).define("graphic", ["md"], _graphic);
  main.variable(observer("footer")).define("footer", ["plausible_analytics","sentry","backups","graphic"], _footer);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("plausible_analytics")).define("plausible_analytics", ["html","localStorage","XMLHttpRequest"], _plausible_analytics);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("sentry")).define("sentry", ["html","location","Sentry","Tracing"], _sentry);
  main.variable(observer("Sentry")).define("Sentry", ["require","FileAttachment"], _Sentry);
  main.variable(observer("Tracing")).define("Tracing", ["require","FileAttachment"], _Tracing);
  const child1 = runtime.module(define1);
  main.import("localStorage", child1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof backups")).define("viewof backups", ["enableGithubBackups"], _backups);
  main.variable(observer("backups")).define("backups", ["Generators", "viewof backups"], (G, _) => G.input(_));
  const child2 = runtime.module(define2);
  main.import("enableGithubBackups", child2);
  return main;
}
