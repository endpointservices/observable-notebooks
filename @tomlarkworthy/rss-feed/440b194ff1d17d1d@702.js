// https://observablehq.com/@tomlarkworthy/rss-feed@702
import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";

function _titleHtml(html,md){return(
html`<div class=content>${
md`# BLOG: RSS Feed added
`}`
)}

function _rss_icon(html){return(
html`<center><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="128px" height="128px" id="RSSicon" viewBox="0 0 256 256">
<defs>
<linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
<stop offset="0.0" stop-color="#E3702D"/><stop offset="0.1071" stop-color="#EA7D31"/>
<stop offset="0.3503" stop-color="#F69537"/><stop offset="0.5" stop-color="#FB9E3A"/>
<stop offset="0.7016" stop-color="#EA7C31"/><stop offset="0.8866" stop-color="#DE642B"/>
<stop offset="1.0" stop-color="#D95B29"/>
</linearGradient>
</defs>
<rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"/>
<rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
<rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
<circle cx="68" cy="189" r="24" fill="#FFF"/>
<path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
<path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
</svg></center>`
)}

async function _metadata(content,FileAttachment){return(
{
  title: "RSS Feed added",
  description: "How and why RSS feeds were added to the Observable Jamstack blog",
  content: content.outerHTML,
  target: "/blogs/rss-feed.html",
  tags: ["article", "jamstack"],
  twitterCreator: "@tomlarkworthy",
  image: await FileAttachment("rss_icon.png").url(),
  get url() {
    return 'https://tomlarkworthy.endpointservices.net' + this.target;
  } 
}
)}

function _settings(deployStaticFile,metadata,preview){return(
deployStaticFile({
  ...metadata,
  app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
  source: preview.href
})
)}

function _preview(deploy,page){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  return res.send(page)
})
)}

function _content(html,md){return(
html`<div class=content>${
md`

An RSS feed is an XML file describing what new articles have appeared in a blog. They _used_ to be popular for notifying readers of new content, but that use-case has dwindled in recent years. However, they are still very useful for notifying other computers of changes, enabling a blog to become the hub for personal media automation.

I have now added an RSS feed to the site ([here](https://tomlarkworthy.endpointservices.net/rss.xml)). The RSS feed, like the other pages of the site, is served statically. When a new article is written, the RSS.xml needs to be update too. This requires new technology for the [Observable jamstack](https://observablehq.com/@tomlarkworthy/jamstack).

I drew inspiration from [Fred Wilson's blog](https://avc.com/). He writes *a ton* but the site is quite minimal. He organizes articles by _tags_, allowing topics to have dedicated lists while allowing a single article to be a member of many lists. Article _tags_ seem enough to build an RSS feed if we can search over articles using them.

Also, to display an RSS item we need a *title* and *description* and a few other metadata fields. So on top of tags, support for arbitrary fields was added. The [Observable netlify-deploy](https://observablehq.com/@tomlarkworthy/netlify-deploy) library now allows previously deployed static files (the atom of static site deploys) to be queried by tags.

So the content to deploy the ([RSS.xml](https://tomlarkworthy.endpointservices.net/rss.xml)) is reactively updated based on the result of a realtime article query. I have granted anonymous read access to the backing Firestore for my blog so those realtime queries can be viewed by anybody.

Tag query support is possible with Firestore indexes using the _"array-contains"_ [query semantic](https://firebase.google.com/docs/firestore/query-data/queries). Firestore continues to works very well as the backing store for the Observable jamstack CMS thanks to its realtime and web-based operation.
`
}`
)}

function _page(metadata,header,topbar,sidebar,titleHtml,rss_icon,content){return(
`<!doctype html>
<html class="has-navbar-fixed-top">
  <head>
    <meta property="og:type" content="article">
    <meta property="og:title" content="${metadata.title}">
  ${header.outerHTML}
  </head>
  <body>
    ${topbar.outerHTML}
    <div class="columns">
      ${sidebar.outerHTML}
    <div class="column is-half">
      ${titleHtml.outerHTML}
      ${rss_icon.outerHTML}
      ${content.outerHTML}
    </div>
  </body>
</html>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["rss_icon.png", {url: new URL("./files/8e2ab021b27d4b8a07b37c403dbab484d2ca8f994b059f19044cd489f70f218fc02e5507f8404764c80d0d29e31f08c9fda8c8b882483b535f86c769e0bcbc8a.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("titleHtml")).define("titleHtml", ["html","md"], _titleHtml);
  main.variable(observer("rss_icon")).define("rss_icon", ["html"], _rss_icon);
  main.variable(observer("metadata")).define("metadata", ["content","FileAttachment"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer("content")).define("content", ["html","md"], _content);
  main.variable(observer("page")).define("page", ["metadata","header","topbar","sidebar","titleHtml","rss_icon","content"], _page);
  const child1 = runtime.module(define1);
  main.import("deployStaticFile", child1);
  const child2 = runtime.module(define2);
  main.import("sidebar", child2);
  main.import("topbar", child2);
  main.import("header", child2);
  main.import("deploy", child2);
  main.import("html", child2);
  main.import("svg", child2);
  const child3 = runtime.module(define3);
  main.import("icon", child3);
  return main;
}
