import define1 from "./dff1e917c89f5e76@1965.js";
import define2 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Google Trends
`
)}

function _iframe(html){return(
new Promise(resolve => {
  let iframe = html`<iframe src="https://www.google.com" onload=${() => resolve(iframe)}></iframe>`
})
)}

function _content(iframe){return(
iframe.contentDocument || iframe.contentWindow.document
)}

function _4(deploy,content){return(
deploy("trends", async (req, res) => {
  res.send(content)
})
)}

function _googleTrends(require){return(
require('https://bundle.run/google-trends-api@4.9.2')
)}

function _trends(deploy,googleTrends){return(
deploy("trends", async (req, res) => {
  req.text(await googleTrends.interestOverTime({
    "keyword":"covid"
  }));
})
)}

function _t_response(trends){return(
fetch(trends.href)
)}

function _8(t_response){return(
t_response.status
)}

function _9(t_response){return(
t_response.text()
)}

function _10(googleTrends,fetchp){return(
googleTrends.interestOverTime({
  "keyword":"covid",
  "agent": fetchp
})
)}

function _terms(html){return(
html`<input value = "covid">`
)}

function _12(terms){return(
terms
)}

function _response(fetchp){return(
fetchp("https://trends.google.com/trends/?geo=US")
)}

function _14(response){return(
response.status
)}

async function _15(response){return(
await response.text()
)}

function _16(response){return(
Object.fromEntries(response.headers.entries())
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("iframe")).define("iframe", ["html"], _iframe);
  main.variable(observer("content")).define("content", ["iframe"], _content);
  main.variable(observer()).define(["deploy","content"], _4);
  main.variable(observer("googleTrends")).define("googleTrends", ["require"], _googleTrends);
  main.variable(observer("trends")).define("trends", ["deploy","googleTrends"], _trends);
  main.variable(observer("t_response")).define("t_response", ["trends"], _t_response);
  main.variable(observer()).define(["t_response"], _8);
  main.variable(observer()).define(["t_response"], _9);
  main.variable(observer()).define(["googleTrends","fetchp"], _10);
  main.variable(observer("viewof terms")).define("viewof terms", ["html"], _terms);
  main.variable(observer("terms")).define("terms", ["Generators", "viewof terms"], (G, _) => G.input(_));
  main.variable(observer()).define(["terms"], _12);
  main.variable(observer("response")).define("response", ["fetchp"], _response);
  main.variable(observer()).define(["response"], _14);
  main.variable(observer()).define(["response"], _15);
  main.variable(observer()).define(["response"], _16);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  return main;
}
