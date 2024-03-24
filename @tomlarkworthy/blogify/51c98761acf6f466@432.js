// https://observablehq.com/@tomlarkworthy/blogify@432
import define1 from "./55bed46f68a80641@366.js";
import define2 from "./6eda90668ae03044@836.js";
import define3 from "./048a17a165be198d@264.js";
import define4 from "./316f0885d15ab671@69.js";
import define5 from "./993a0c51ef1175ea@1396.js";

function _1(md){return(
md`# Blogify `
)}

function _2(md){return(
md`Creates a link to a pre-rendered static snapshot of any notebook. The goal is to make writing blog posts easier on Observable, by allowing notebooks to be exported as plain HTML. 

This makes it much easier to syndicate to other sites like [dev.to](https://dev.to) or [Medium](https://medium.com) using their ["import story"](https://medium.com/p/import) feature by passing the link generated here.`
)}

function _3(md){return(
md`### Step 1. Fill out the URL of the notebook you wish to Blogify`
)}

function _notebookURL(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({ label: "Notebook URL", width: "100%", submit: true }),
  localStorageView("blog", {
    defaultValue: "https://observablehq.com/@tomlarkworthy/notebooks2021"
  })
)
)}

function _5(md){return(
md`---
### Step 2: Here is your statically rendered links!

These links can be used to syndicate your original notebook`
)}

function _6(html,server,notebookURL){return(
html`<h2><a target="_blank" href="${server.href}?notebook=${encodeURIComponent(
  notebookURL
)}">blogified link</a> (works with <a target="_blank" href="https://medium.com/p/import">Medium import story</a>)`
)}

function _7(html,rss,notebookURL){return(
html`<h2><a target="_blank" href="${rss.href}?notebook=${encodeURIComponent(
  notebookURL
)}">blogified Atom feed</a> (works with <a href="https://dev.to/settings/extensions">dev.to</a> submit your feed in <a href="https://dev.to/settings/extensions">extensions</a>)`
)}

function _8(md){return(
md`## Preview`
)}

async function _9(html,getData,notebookURL){return(
html`${(await await getData(notebookURL)).content}`
)}

function _10(md){return(
md`---

### Implementation`
)}

function _template(){return(
(config) => `<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
<meta property="og:type" content="article">
<meta property="og:title" content="${config.title}">
<meta property="og:description" content="${config.description}">
<meta property='article:author' content='${config.author}' />
<link rel="canonical" href="${config.notebookURL}">
</head>
<body>
${config.content}
</body>
</html>`
)}

function _generate(HTMLElement){return(
async (id) => {
  console.log("generate", id);
  const container = document.createElement("article");
  const [{ Runtime, Inspector }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/d/${id}.js?v=3`)
  ]);

  let pending = 0;

  new Runtime().module(define, (name) => {
    const node = document.createElement("div");
    container.appendChild(node);
    if (name) node.id = name;
    return {
      pending() {
        pending++;
      },
      fulfilled(value) {
        if (value instanceof HTMLElement) {
          node.replaceWith(value);
        } else {
          console.log("skipping", value);
        }
        pending--;
      },
      rejected(error) {
        pending--;
      }
    };
  });
  let secs = 0;
  do {
    console.log("wait");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    secs++;
  } while (pending > 0 && secs < 2);
  return container;
}
)}

function _getData(db,FKEY,getMetadata,generate){return(
async (notebookURL) => {
  const metadata = db.child(FKEY.encode(notebookURL)).once("value");
  const notebookSuffix = notebookURL
    .replace("https://observablehq.com/d/", "")
    .replace("https://observablehq.com/", "");
  const [content, author] = await getMetadata(
    notebookSuffix
  ).then((notebookData) => [generate(notebookData.id), notebookData.author]);
  return {
    notebookURL,
    ...(await metadata).val(),
    author,
    content: (await content).outerHTML
  };
}
)}

function _server(deploy,getData,template){return(
deploy(
  "default",
  async (req, res) => {
    const notebookURL = (req.query || {}).notebook;
    const data = await getData(notebookURL);
    res.header("Content-type", "text/html");
    res.send(template(data));
  },
  { region: "europe-west4" }
)
)}

function _rss(deploy,getData){return(
deploy("rss", async (req, res) => {
  const notebookURL = (req.query || {}).notebook;
  const data = await getData(notebookURL);
  res.header("content-type", "application/xml");
  res.send(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns = "http://www.w3.org/2005/Atom">
  <title><![CDATA[${data.title}]]></title>
  <id>https://observablehq.com/@tomlarkworthy/blogify?notebook=${notebookURL}</id>
    <updated>${new Date().toISOString()}</updated>
  <entry>
    <id>${notebookURL}</id>
    <updated>${new Date().toISOString()}</updated>
    <author><name>${data.author}</name></author>
    <title><![CDATA[${data.title}]]></title>
    <link href = "https://webcode.run/observablehq.com/@tomlarkworthy/blogify?notebook=${encodeURIComponent(
      notebookURL
    )}"/>
    <content type="html"><![CDATA[${data.content}]]></content>
  </entry>
</feed>
`);
})
)}

function _db(firebase){return(
firebase.database().ref("@tomlarkworthy/blogify")
)}

function _FIREBASE_CONFIG(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof notebookURL")).define("viewof notebookURL", ["Inputs","localStorageView"], _notebookURL);
  main.variable(observer("notebookURL")).define("notebookURL", ["Generators", "viewof notebookURL"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["html","server","notebookURL"], _6);
  main.variable(observer()).define(["html","rss","notebookURL"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["html","getData","notebookURL"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("template")).define("template", _template);
  main.variable(observer("generate")).define("generate", ["HTMLElement"], _generate);
  main.variable(observer("getData")).define("getData", ["db","FKEY","getMetadata","generate"], _getData);
  main.variable(observer("server")).define("server", ["deploy","getData","template"], _server);
  main.variable(observer("rss")).define("rss", ["deploy","getData"], _rss);
  const child1 = runtime.module(define1);
  main.import("getMetadata", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  const child3 = runtime.module(define3);
  main.import("localStorageView", child3);
  const child4 = runtime.module(define4);
  main.import("randomId", child4);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  const child5 = runtime.module(define5).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child5);
  main.import("DocView", child5);
  main.import("FKEY", child5);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", _FIREBASE_CONFIG);
  return main;
}
