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

async function _testing()
{
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


function _expect(testing){return(
testing.expect
)}

function _suite(testing){return(
testing.createSuite()
)}

function _8(suite,expect,exampleWithCustomURL){return(
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

function _9(suite,expect,exampleById){return(
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

function _fetchp(){return(
(url) =>
  fetch(
    "https://webcode.run/observablehq.com/@endpointservices/observable-proxy;proxy_d2d3fe67a2",
    {
      method: "POST",
      body: JSON.stringify({
        options: {},
        url: url
      })
    }
  )
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.define("module 1", async () => runtime.module((await import("./58f3eb7334551ae6@215.js")).default));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("exampleWithCustomURL")).define("exampleWithCustomURL", ["getCommentsAndNamespace"], _exampleWithCustomURL);
  main.variable(observer("exampleById")).define("exampleById", ["getCommentsAndNamespace"], _exampleById);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("testing")).define("testing", _testing);
  main.variable(observer("expect")).define("expect", ["testing"], _expect);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","expect","exampleWithCustomURL"], _8);
  main.variable(observer()).define(["suite","expect","exampleById"], _9);
  main.variable(observer("getComments")).define("getComments", ["fetchp","DOMParser","findComments"], _getComments);
  main.variable(observer("getCommentsAndNamespace")).define("getCommentsAndNamespace", ["fetchp","DOMParser","findComments","findNamespace"], _getCommentsAndNamespace);
  main.variable(observer("findComments")).define("findComments", _findComments);
  main.variable(observer("findNamespace")).define("findNamespace", _findNamespace);
  main.variable(observer("fetchp")).define("fetchp", _fetchp);
  main.define("footer", ["module 1", "@variable"], (_, v) => v.import("footer", _));
  main.variable(observer()).define(["footer"], _16);
  return main;
}
