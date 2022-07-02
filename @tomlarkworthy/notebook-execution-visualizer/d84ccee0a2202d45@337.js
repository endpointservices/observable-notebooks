import define1 from "./c7a3b20cec5d4dd9@669.js";
import define2 from "./ef672b935bd480fc@623.js";
import define3 from "./58f3eb7334551ae6@210.js";

function _1(md){return(
md`# ⛔️ Get Notebook Comments ⚠️

This uses a CORS bypass to read comments for a notebook. This does not use a public API and therefore is risky to depend on.

We use this channel as a component of authentication, critically Observable states the user login of the commentator.
`
)}

function _exampleWithCustomURL(getCommentsAndNamespace){return(
getCommentsAndNamespace(
  "https://observablehq.com/@endpointservices/get-comments"
)
)}

function _exampleById(getCommentsAndNamespace){return(
getCommentsAndNamespace(
  "https://observablehq.com/d/2953e428f445d12f"
)
)}

function _4(md){return(
md`## Change log
- 2022-06-15 Change from sniffing iframe to looking for RSS feed to determine notebook namespace (Bug fix for design change)`
)}

function _suite(createSuite){return(
createSuite()
)}

function _7(suite,expect,exampleWithCustomURL){return(
suite.test("getCommentsAndNamespace with custom URL", async () => {
  expect(exampleWithCustomURL.namespace).toBe("endpointservices");
  expect(exampleWithCustomURL.comments.length).toBeGreaterThanOrEqual(1);
  const lookup = exampleWithCustomURL.comments.find(
    (el) => el.content === "Hi I am leaving a comment"
  );
  expect(lookup).toBeDefined();
  expect(lookup.user.login).toBe("tomlarkworthy");
})
)}

function _8(suite,expect,exampleById){return(
suite.test("getCommentsAndNamespace with ID URL", async () => {
  expect(exampleById.namespace).toBe("endpointservices");
  expect(exampleById.comments.length).toBeGreaterThanOrEqual(1);
  const lookup = exampleById.comments.find((el) => el.content === "myComment");
  expect(lookup).toBeDefined();
  expect(lookup.user.login).toBe("tomlarkworthy");
})
)}

function _getComments(fetchp,DOMParser,findComments){return(
async (notebookURL) => {
  const apiCall = await fetchp(notebookURL);
  if (apiCall.status !== 200) throw new Error(`Error ${apiCall.status}, ${await apiCall.text()}`)
  const content = await (apiCall).text();
  const dom = new DOMParser().parseFromString(content, "text/html")
  const data = JSON.parse(dom.querySelector("#__NEXT_DATA__").innerHTML);
  return findComments(data);
}
)}

function _getCommentsAndNamespace(fetchp,DOMParser,findComments,findNamespace){return(
async notebookURL => {
  const apiCall = await fetchp(notebookURL);
  if (apiCall.status == 404)
    return { comments: undefined, namespace: undefined };
  if (apiCall.status !== 200)
    throw new Error(`Error ${apiCall.status}, ${await apiCall.text()}`);
  const content = await apiCall.text();
  const dom = new DOMParser().parseFromString(content, "text/html");
  const data = JSON.parse(dom.querySelector("#__NEXT_DATA__").innerHTML);
  const comments = findComments(data);
  const namespace = findNamespace(dom);
  return { comments, namespace };
}
)}

function _findComments(){return(
function findComments(obj) {
  if (!obj) return;
  if (typeof obj !== "object") return;
  for (let key of Object.keys(obj)) {
    if (key === "comments") {
      return obj[key];
    } else {
      const subfind = findComments(obj[key]);
      if (subfind !== undefined) return subfind;
    }
  }
}
)}

function _findNamespace(){return(
function findNamespace(dom) {
  if (!dom) return;
  const rssLink = dom.querySelector(
    "link[rel=alternate][type='application/rss+xml']"
  );
  if (rssLink) {
    return /@(.*)\.rss/.exec(rssLink.href)[1];
  }
  // Old way, perhaps does not work anymore
  const iframe = dom.querySelector("iframe[src]");
  if (!iframe) {
    debugger;
    throw new Error("Cannot find iframe");
  }
  return /^https:\/\/([^.]*)\.static\.observableusercontent\.com/.exec(
    iframe.src
  )[1];
}
)}

function _ALLOW_DOMAINS(){return(
['observablehq.com']
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("exampleWithCustomURL")).define("exampleWithCustomURL", ["getCommentsAndNamespace"], _exampleWithCustomURL);
  main.variable(observer("exampleById")).define("exampleById", ["getCommentsAndNamespace"], _exampleById);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","expect","exampleWithCustomURL"], _7);
  main.variable(observer()).define(["suite","expect","exampleById"], _8);
  main.variable(observer("getComments")).define("getComments", ["fetchp","DOMParser","findComments"], _getComments);
  main.variable(observer("getCommentsAndNamespace")).define("getCommentsAndNamespace", ["fetchp","DOMParser","findComments","findNamespace"], _getCommentsAndNamespace);
  main.variable(observer("findComments")).define("findComments", _findComments);
  main.variable(observer("findNamespace")).define("findNamespace", _findNamespace);
  main.variable(observer("ALLOW_DOMAINS")).define("ALLOW_DOMAINS", _ALLOW_DOMAINS);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _16);
  return main;
}
