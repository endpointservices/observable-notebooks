// https://observablehq.com/@tomlarkworthy/rss-atom-feed@800
import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./dff1e917c89f5e76@1964.js";

function _1(md){return(
md`# RSS/Atom/JSON feed

Render the XML of a feed based on a query over deployed static files.

Uses https://github.com/jpmonette/feed

~~~js
  import {deploy} with {rss_config as config} from '@tomlarkworthy/rss-atom-feed'
~~~
`
)}

function* _current_user(Promises,md,firebase)
{
  while (true) {
    yield Promises.delay(
      1000,
      md`Current user is ${(firebase.auth().currentUser || {}).uid}`
    );
  }
}


function _config(){return(
{
  title: "Tom Larkworthy' Personal Blog",
  description: "Random tech stuff",
  feed_type: "RSS2", // or Atom1, or JSON1
  target: "/rss.xml",
  subdomain: "tomlarkworthy",
  app_id: "b6a918d2-9cda-4fde-b2ec-add91b22ea02",
  base_url: "https://tomlarkworthy.endpointservices.net",
  dependsOnTags: ["article"],
  limit: 20
}
)}

function _4(deployStaticFile,config,preview){return(
deployStaticFile({...config, source: preview.href})
)}

function _preview(deploy,content){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/rss+xml")
  return res.send(content)
})
)}

function _feed(Feed,config,articles,utcSecondsToDate)
{
  const feed = new Feed({
    ...config.title && {title: config.title},
    ...config.description && {description: config.description},
    id: config.base_url,
    link: config.base_url,
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  })
  articles.forEach(article => feed.addItem({
    ...article.title && {title: article.title},
    ...article.description && {description: article.description},
    ...article.content && {content: article.content},
    ...article.image && {image: article.image},
    id: config.base_url + article.target,
    link: config.base_url + article.target,
    author: [],
    contributor: [],
    date: utcSecondsToDate(article.creationDate.seconds),
  }));
  return feed;
}


function _content(config,feed){return(
config.feed_type === "Atom1" ? feed.atom1() : config.feed_type === "JSON1" ? feed.json1() : feed.rss2()
)}

function _8(articles){return(
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
queryDependants(config)
)}

async function _Feed(require){return(
(await require('https://bundle.run/feed@4.2.1')).Feed
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("current_user")).define("current_user", ["Promises","md","firebase"], _current_user);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer()).define(["deployStaticFile","config","preview"], _4);
  main.variable(observer("preview")).define("preview", ["deploy","content"], _preview);
  main.variable(observer("feed")).define("feed", ["Feed","config","articles","utcSecondsToDate"], _feed);
  main.variable(observer("content")).define("content", ["config","feed"], _content);
  main.variable(observer()).define(["articles"], _8);
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
  main.import("deploy", child3);
  return main;
}
