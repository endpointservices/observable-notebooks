import define1 from "./a81f2a20664080d3@245.js";
import define2 from "./c2dae147641e012a@46.js";
import define3 from "./1d309dbd9697e042@703.js";

function _1(md){return(
md`# Endpoint Services Footer


Generic services to apply to all Endpoint Service notebooks, e.g. error monitoring, analytics and backups.

\`\`\`js
import { footer } from "@endpointservices/endpoint-services-footer"
---
footer
\`\`\``
)}

function _graphic(md,backupNowButton){return(
md`<small>
*This notebook collects anonymous usage metrics through [Plausible Analytics](https://observablehq.com/@endpointservices/plausible-analytics). Notebooks are monitored for errors using [sentry.io](https://sentry.io).* The notebook is saved to Github with [backup-to-github](https://observablehq.com/@tomlarkworthy/github-backups). ${backupNowButton()}</small>
`
)}

function _footer($0,plausible_analytics,sentry,graphic)
{
  $0;
  plausible_analytics;
  const Sentry = sentry({
    DSN:
      "https://f9a89df07acc4958843e8bd2dca8794b@o518834.ingest.sentry.io/5628336",
    namespaces: ["endpointservices", "tomlarkworthy"]
  });
  graphic.sentry = Sentry;
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

function _9(md){return(
md`### Backups`
)}

function _backups(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices",
  repo: "observable-notebooks"
  /*debugProxy: true*/
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("graphic")).define("graphic", ["md","backupNowButton"], _graphic);
  main.variable(observer("footer")).define("footer", ["viewof backups","plausible_analytics","sentry","graphic"], _footer);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("plausible_analytics")).define("plausible_analytics", ["html","localStorage","XMLHttpRequest"], _plausible_analytics);
  main.variable(observer()).define(["md"], _6);
  const child1 = runtime.module(define1);
  main.import("sentry", child1);
  const child2 = runtime.module(define2);
  main.import("localStorage", child2);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof backups")).define("viewof backups", ["enableGithubBackups"], _backups);
  main.variable(observer("backups")).define("backups", ["Generators", "viewof backups"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("enableGithubBackups", child3);
  main.import("backupNowButton", child3);
  return main;
}
