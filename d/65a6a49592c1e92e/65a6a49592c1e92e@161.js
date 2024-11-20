function _1(md){return(
md`# Search Engine Ranking Tracker`
)}

function _term(Inputs){return(
Inputs.text({
  label: "search team",
  value: "decision engine"
})
)}

async function _result(term){return(
(
  await fetch(
    `https://d78f0762-18a8-4cfa-88f5-ead63fe30372-00-1mr8yctl1rxnj.worf.replit.dev/search?q=${term}`
  )
).text()
)}

function _4(serp_parser,result){return(
serp_parser.parse(
  {
    searchEngine: "google"
  },
  result
)
)}

function _dom(DOMParser,result){return(
new DOMParser().parseFromString(result, "text/html")
)}

function _links(dom){return(
[...dom.body.querySelectorAll("[ping]")]
  .map((e) => e.outerHTML)
  .join("\n")
)}

function _link(links){return(
links[0]
)}

function _8(link){return(
link.lastChild.textContent
)}

function _serp_parser(){return(
import("https://cdn.skypack.dev/google-html-parser")
)}

function _10(){return(
import("https://cdn.skypack.dev/google-search-results-nodejs")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof term")).define("viewof term", ["Inputs"], _term);
  main.variable(observer("term")).define("term", ["Generators", "viewof term"], (G, _) => G.input(_));
  main.variable(observer("result")).define("result", ["term"], _result);
  main.variable(observer()).define(["serp_parser","result"], _4);
  main.variable(observer("dom")).define("dom", ["DOMParser","result"], _dom);
  main.variable(observer("links")).define("links", ["dom"], _links);
  main.variable(observer("link")).define("link", ["links"], _link);
  main.variable(observer()).define(["link"], _8);
  main.variable(observer("serp_parser")).define("serp_parser", _serp_parser);
  main.variable(observer()).define(_10);
  return main;
}
