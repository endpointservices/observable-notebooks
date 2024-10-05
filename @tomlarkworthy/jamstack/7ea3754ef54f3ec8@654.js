// https://observablehq.com/@tomlarkworthy/jamstack@654
import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";

function _titleHtml(html,md,metadata){return(
html`<div class=content>${
md`# ${metadata.title}
`}`
)}

async function _metadata(content,FileAttachment){return(
{
  title: "A Zero Install Forkable Jamstack",
  tags: ["article", "jamstack"],
  description: "How this blog is deployed to Netlify by an open source notebook",
  target: "/blogs/jamstack.html",
  content: content.outerHTML,
  twitterCreator: "@tomlarkworthy",
  image: await FileAttachment("image@1.png").url(),
  get url() {
    return 'https://tomlarkworthy.endpointservices.net' + this.target;
  }
}
)}

function _settings(deployStaticFile,metadata,content,preview){return(
deployStaticFile({
  ...metadata,
  content: content.outerHTML,
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

async function _content(html,md,FileAttachment){return(
html`<div class=content>${
md`
### This blog doesn't require tools to be installed. 
Its trivial to write and update content from any computer.
- *Everything* required to write content or customize the deployment engine is web hosted.
- Content is written in [Observable](https://observablehq.com/) notebooks (e.g. [this post, [an earlier one](https://observablehq.com/@tomlarkworthy/blog-first-post?collection=@tomlarkworthy/blog)](https://observablehq.com/@tomlarkworthy/jamstack) or the [navbars](https://observablehq.com/@tomlarkworthy/blog-common)). 
- The deployment toolchain is *also* hosted in an Observable Notebook (e.g. [Netlify deploy](https://observablehq.com/@tomlarkworthy/netlify-deploy)).
- [Observable](https://observablehq.com/) is designed for literate programming. Markdown or HTML or roll your own DSL.

### This blog is fast and does not require Javascript
The usual [Jamstack](https://jamstack.org/) advantages apply.
- Compiled to static assets deployed to a CDN.
- Exploits Netlify' [instant cache invalidation](https://www.netlify.com/blog/2015/09/11/instant-cache-invalidation/) so production updates are fast.
- Scaleable and secure.

![Google Page Speed test](${await FileAttachment("image@1.png").url()})

### This blog engine is Programmable, Open Source and Forkable.
Because the engine is programmed in Observable:
- Content is written within a web hosted IDE. You generate content programatically.
- Content pages, the deployment pipeline are executed in the browser, in cells viewers can look at.
- All pages can be forked and reprogrammed, allow blog developers to customize their blog engine without installing tooling.
`
}`
)}

function _page(metadata,header,topbar,sidebar,titleHtml,content){return(
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
      ${content.outerHTML}
    </div>
  </body>
</html>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/8032244cf73741313e461d24c2170afcd4ee9282f6478f041d22207fe9d347b1e83b329a7225ef17c806a6a70c26e8753f4c208ad11273dc448801196ee02a0d.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("titleHtml")).define("titleHtml", ["html","md","metadata"], _titleHtml);
  main.variable(observer("metadata")).define("metadata", ["content","FileAttachment"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","content","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer("content")).define("content", ["html","md","FileAttachment"], _content);
  main.variable(observer("page")).define("page", ["metadata","header","topbar","sidebar","titleHtml","content"], _page);
  const child1 = runtime.module(define1);
  main.import("deployStaticFile", child1);
  main.import("session", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  const child2 = runtime.module(define2);
  main.import("sidebar", child2);
  main.import("topbar", child2);
  main.import("header", child2);
  main.import("deploy", child2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("icon", child3);
  return main;
}
