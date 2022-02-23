import define1 from "./ef672b935bd480fc@619.js";
import define2 from "./c7a3b20cec5d4dd9@659.js";
import define3 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# ⛔️ Get Notebook Comments ⚠️

This uses a CORS bypass to read comments for a notebook. This does not use a public API and therefore is risky to depend on.

We use this channel as a component of authentication, critically Observable states the user login of the commentator.
`
)});
  main.variable(observer("example")).define("example", ["getComments"], function(getComments){return(
getComments('https://observablehq.com/@endpointservices/get-comments')
)});
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], function(createSuite){return(
createSuite()
)});
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","expect","example"], function(suite,expect,example){return(
suite.test("getComments('https://observablehq.com/@endpointservices/get-comments' has 'Hi I am leaving a comment'", async () => {
  expect(example.length).toBeGreaterThanOrEqual(1);
  const lookup = example.find((el) => el.content === "Hi I am leaving a comment");
  expect(lookup).toBeDefined();
  expect(lookup.user.login).toBe("tomlarkworthy");
})
)});
  main.variable(observer("getComments")).define("getComments", ["fetchp","DOMParser","findComments"], function(fetchp,DOMParser,findComments){return(
async (notebookURL) => {
  const apiCall = await fetchp(notebookURL);
  if (apiCall.status !== 200) throw new Error(`Error ${apiCall.status}, ${await apiCall.text()}`)
  const content = await (apiCall).text();
  const dom = new DOMParser().parseFromString(content, "text/html")
  const data = JSON.parse(dom.querySelector("#__NEXT_DATA__").innerHTML);
  return findComments(data);
}
)});
  main.variable(observer("getCommentsAndNamespace")).define("getCommentsAndNamespace", ["fetchp","DOMParser","findComments","findNamespace"], function(fetchp,DOMParser,findComments,findNamespace){return(
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
)});
  main.variable(observer("findComments")).define("findComments", function(){return(
function findComments(obj) {
  if (!obj) return;
  if (typeof obj !== 'object') return;
  for (let key of Object.keys(obj)) {
    if (key === "comments") {
      return obj[key];
    } else {
      const subfind = findComments(obj[key]);
      if (subfind !== undefined) return subfind;
    }
  }
}
)});
  main.variable(observer("findNamespace")).define("findNamespace", function(){return(
function findNamespace(dom) {
  if (!dom) return;
  const iframe = dom.querySelector('iframe[src]');
  return /^https:\/\/([^.]*)\.static\.observableusercontent\.com/.exec(iframe.src)[1];
}
)});
  main.variable(observer("ALLOW_DOMAINS")).define("ALLOW_DOMAINS", function(){return(
['observablehq.com']
)});
  const child1 = runtime.module(define1).derive(["ALLOW_DOMAINS"], main);
  main.import("fetchp", child1);
  const child2 = runtime.module(define2);
  main.import("createSuite", child2);
  main.import("expect", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
