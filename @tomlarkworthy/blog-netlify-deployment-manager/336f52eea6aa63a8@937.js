import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";

function _1(html,md){return(
html`<div class=content>${
md`# BLOG: Netlify Deployment Manager Notebook
`}`
)}

function _metadata(content,imageUrl){return(
{
  title: "Netlify Deployment Manager Notebook",
  description: "How this blog is deployed to Netlify by an open source notebook",
  notebook: 'https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager',
  content: content.outerHTML,
  target: "/blogs/partial-deployment.html",
  tags: ["article", "jamstack"],
  twitterCreator: "@tomlarkworthy",
  image: imageUrl,
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
  return res.send(page);
})
)}

function _6(page){return(
page
)}

function _content(html,md,graphic){return(
html`<div class=content>${
md`

To recap I am building my blog using [Observable](https://observablehq.com) as the Content Management System (CMS) interface to a statically deployed site (Jamstack). The main motivation for building _yet-another-static-site-generator_ is that Observable is a web-based literate programming notebook environment. So the unique angle of _this_ jamstack is that the content interface is programmable and forkable (like [this](https://observablehq.com/@tomlarkworthy/blog-partial-deployment)) which gives me unlimited creative freedom and extension points as a technical content author.

${graphic.outerHTML}

**Even the deployment toolchain is hosted as a notebook** that can be forked and customized. This article describes some of the features so far for the deployment notebook.

## [Netlify Deployment Manager](https://observablehq.com/@tomlarkworthy/netlify-deploy?collection=@tomlarkworthy/blog#deployStaticFile)

So I just got partial deployment working nicely so I thought now would be a good time to summarize the deployment features so far. 

Some of my frustrations with existing CMSs are

1. Content changes either take a long time to propagate, or the overall page is slow, depending on the cache settings.

- Deployment can take a long time.

## Instant CDN cache preloading and invalidation

[Netlify](https://www.netlify.com/) solves the cache problems with a smart cache. Caches are not cold because the content is actively pushed to the CDN on deploy, *and*, the old CDN state is [invalidated](https://www.netlify.com/blog/2015/09/11/instant-cache-invalidation/) on deploy. So some hard problems are solved just by using Netlify. Thus the website is super fast without the drawback of stale caches.

## Faster Deployment with Delta Sync

The other issue is that static sites tend to be slow to deploy due to an _O(n)_ deployment complexity. Again, thanks to Netlify functionality we can send just the content that changes in deployment. Furthermore, thanks to the CMS data model we can model the dependencies across pages so we only need to regenerate the pages that change too.

Netlify offers a deployment API, so we can deploy content directly from a notebook (see the [_deployStaticFile_](https://observablehq.com/@tomlarkworthy/netlify-deploy?collection=@tomlarkworthy/blog#deployStaticFile) call).

### Tag-based dependencies

File record metadata is stored in [Firestore](https://firebase.google.com/docs/firestore) which [plays well with Observable](https://observablehq.com/@tomlarkworthy/saas-tutorial). Each record includes a _tags_ array.  When an article is updated, we do a reverse query for pages that _depend_ on file _tags_ using the [_"contains-array-any"_](https://firebase.google.com/docs/firestore/query-data/queries#in_not-in_and_array-contains-any) query operator. Examples of content that do this are the [index.html](https://observablehq.com/@tomlarkworthy/blog-index-html) and the [rss.xml](https://observablehq.com/@tomlarkworthy/rss-atom-feed/forks) against any files tagged _"article"_. When an article is deployed, the page indexes are deployed too.

### Parallel Materialization

To improve deploy speed, each notebook contains a [serverside cell](https://observablehq.com/@tomlarkworthy/serverside-cells) used to render the page _preview_ of the page. The process of deployment is materializing of the preview link into Netlify. As the data exchange is a URL, we are pretty flexible about how content is expressed. The content doesn't even need to be hosted on Observable, for instance, the URL could be external (e.g. for materializing 3rd party libraries)

The other useful thing about using a URL as the content representation, and using serverside cells to generate the content, is that we can parallelize materialization jsut by reading the links in parrallel.

The most awesome thing about building on Observable is that this deployment toolchain is hosted within Observable notebooks too. The [Netlify Deployment Manager](https://observablehq.com/@tomlarkworthy/netlify-deploy?collection=@tomlarkworthy/blog) contains all the Oauth code and API calls used to implement the [_deployStaticFile_](https://observablehq.com/@tomlarkworthy/netlify-deploy?collection=@tomlarkworthy/blog#deployStaticFile) library cell. You can see how it works and change it whenever you want!

## Next steps

The next job is to fix the authentication so it's easier for other _Observable_ users to fork my blog examples and deploy their content on their Netlify accounts. We have not reached a usable service yet but it is getting closer!

-- Tom2

`
}`
)}

function _image(md,imageUrl){return(
md`![image](${imageUrl})`
)}

function _imageUrl(FileAttachment){return(
FileAttachment("graphic.png").url()
)}

function _graphic(svg){return(
svg`<center><svg viewbox="0 0 800 200" width="100%" height="200">
  ${Array(120).fill(0).map((v, idx) => svg`
    <g transform="translate(${(idx-20)*11} 30)">
      <rect x=0 y="0" width="5" height="50" fill="#c00">
        <animateTransform attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="${idx*11} 60 70"
                            to="${idx*11 + 360} 60 70"
                            dur="3s"
                            repeatCount="indefinite"/>
      </rect>
    </g>
    
  `)}
</svg></center>`
)}

function _page(articleHeader,metadata,topbar,sidebar,html,content,articleFooter){return(
`<!doctype html>
<html class="has-navbar-fixed-top">
  <head>
    ${articleHeader(metadata).outerHTML}
  </head>
  <body>
    ${topbar.outerHTML}
    <div class="columns">
      ${sidebar.outerHTML}
      <div class="column is-half">
        ${html`<div class="content"><h1>${metadata.title}`.outerHTML}
        ${content.outerHTML}
      </div>
    </div>
    ${articleFooter(metadata).outerHTML}
  </body>
</html>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["graphic.png", {url: new URL("./files/d1bc27d657c5492993abf9b628aba9cd957327a5593b4f523e092682a4b1b703c75a9041a3b9715ec9ebb7ed4ff5f99e916c738e93ad03073d3dbf5587af4ab1.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","md"], _1);
  main.variable(observer("metadata")).define("metadata", ["content","imageUrl"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer()).define(["page"], _6);
  main.variable(observer("content")).define("content", ["html","md","graphic"], _content);
  main.variable(observer("image")).define("image", ["md","imageUrl"], _image);
  main.variable(observer("imageUrl")).define("imageUrl", ["FileAttachment"], _imageUrl);
  main.variable(observer("graphic")).define("graphic", ["svg"], _graphic);
  main.variable(observer("page")).define("page", ["articleHeader","metadata","topbar","sidebar","html","content","articleFooter"], _page);
  const child1 = runtime.module(define1);
  main.import("deployStaticFile", child1);
  const child2 = runtime.module(define2);
  main.import("sidebar", child2);
  main.import("topbar", child2);
  main.import("articleHeader", child2);
  main.import("articleFooter", child2);
  main.import("deploy", child2);
  main.import("html", child2);
  main.import("svg", child2);
  const child3 = runtime.module(define3);
  main.import("icon", child3);
  return main;
}
