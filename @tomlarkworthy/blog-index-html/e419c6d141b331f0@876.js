import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./bebff78c79e75160@549.js";

function _1(md){return(
md`# Index.html

The top level page is the X most recent articles.
`
)}

function _config(){return(
{
  title: "Tom Larkworthy' Personal Blog",
  description: "Random tech stuff",
  notebook:
    "https://observablehq.com/@tomlarkworthy/blog-index-html?collection=@tomlarkworthy/blog",
  target: "/index.html",
  subdomain: "tomlarkworthy",
  app_id: "b6a918d2-9cda-4fde-b2ec-add91b22ea02",
  base_url: "https://tomlarkworthy.endpointservices.net",
  dependsOnTags: ["article", 'notebook'],
  limit: 20
}
)}

function _3(deployStaticFile,config,preview){return(
deployStaticFile({...config, source: preview.href})
)}

function _preview(deploy,page){return(
deploy("preview", (req, res) => {
  return res.send(page);
})
)}

function _page(header,topbar,sidebar,content,articleFooter,config){return(
`<html class="has-navbar-fixed-top">
<head>
${header.outerHTML}
</head>
<body>
${topbar.outerHTML}
<div class="columns">
${sidebar.outerHTML}
<div class="column is-half">
<h1>Recent Articles</h1>
${content.outerHTML}
</div>
</div>
${articleFooter(config).outerHTML}
</body>
</html>`
)}

function _content(html,articles,toDate,span){return(
html`
${articles.map(article => html`<section class="section content">
      <small>${toDate(article.creationDate)}</small>
      <h2><a href=${article.target}>${article.title}</a></h2>  
      ${span(article.content)}
      <hr class="hr"/>
  </section>`)}
`
)}

function _toDate(){return(
function toDate(timestamp) {
  const date = new Date(0)
  date.setUTCSeconds(timestamp.seconds) 
  return date
}
)}

function _span(){return(
function span(content) {
  const span = document.createElement("span");
  span.innerHTML = content;
  return span;
}
)}

function _9(articles){return(
articles
)}

function _utcSecondsToDate(){return(
(secs) => {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(secs);
  return d;
}
)}

function _articles(queryDependants,config){return(
queryDependants({
  app_id: config.app_id,
  dependsOnTags: ['article']
})
)}

async function _Feed(require){return(
(await require('https://bundle.run/feed@4.2.1')).Feed
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer()).define(["deployStaticFile","config","preview"], _3);
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer("page")).define("page", ["header","topbar","sidebar","content","articleFooter","config"], _page);
  main.variable(observer("content")).define("content", ["html","articles","toDate","span"], _content);
  main.variable(observer("toDate")).define("toDate", _toDate);
  main.variable(observer("span")).define("span", _span);
  main.variable(observer()).define(["articles"], _9);
  main.variable(observer("utcSecondsToDate")).define("utcSecondsToDate", _utcSecondsToDate);
  main.variable(observer("articles")).define("articles", ["queryDependants","config"], _articles);
  main.variable(observer("Feed")).define("Feed", ["require"], _Feed);
  const child1 = runtime.module(define1);
  main.import("deployStaticFile", child1);
  main.import("queryDependants", child1);
  const child2 = runtime.module(define2);
  main.import("firebase", child2);
  main.import("DocsView", child2);
  const child3 = runtime.module(define3);
  main.import("sidebar", child3);
  main.import("topbar", child3);
  main.import("header", child3);
  main.import("articleFooter", child3);
  main.import("deploy", child3);
  main.import("html", child3);
  return main;
}
