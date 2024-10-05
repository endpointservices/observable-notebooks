import define1 from "./bebff78c79e75160@549.js";
import define2 from "./0db772951ed2f762@153.js";
import define3 from "./9e9b514f3656a16e@1255.js";
import define4 from "./dfdb38d5580b5c35@334.js";

function _title(html,md){return(
html`<div class=content>${
md`# First Post: Static site generation in Observable
`}`
)}

function _2(html){return(
html`<a href="http://tomlarkworthy.endpointservices.net/blogs/firstpost.html">prod`
)}

function _3(deployStaticFile,content,preview){return(
deployStaticFile({
  title: "Static site generation in Observable",
  content: content.outerHTML,
  app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
  source: preview.href,
  target: "/blogs/firstpost.html",
  tags: ["article"]
})
)}

function _content(html,md,rule30n,icon){return(
html`<div class=content>${
md`

This post was authored in [_Observable_](https://observablehq.com/) at [_@tomlarkworthy/blog-first-post_](https://observablehq.com/@tomlarkworthy/blog-first-post). I love programming in _Observable_. I have always felt limited by the expressivity of CRMs like WordPress and Contentful. I want to blog using code. I want to use Observable as an interface to a static site.

## Write with Code 

With _Observable_ I can generate static prose programatically:

${rule30n(20).map(row => `    ${row.map(d => d == 0 ? ' ': '#').join('')}\n`)} 


And this is generated and embedded into a pure HTML site.

## Animate with Code

I can also embed Observable cells for dynamic content (kudos [Lionel Radisson](https://observablehq.com/@makio135)). Find more of his [great code here](https://observablehq.com/@makio135/creative-coding)

<iframe width="100%" height="600" frameborder="0"
  src="https://observablehq.com/embed/@makio135/svg-template?cell=render"></iframe>

So now I have a kick-ass static site that's super easy to update! I don't need to run a CLI command or do a PR to update it. All features can be done in the browser, including the build chain. The whole thing is entirely in _Observable_. Furthermore, it's all backed by CDN and is super fast, there are no compromises on the output, exactly because it's self authored. 

## Tech Used

I used a [serverside cell](https://observablehq.com/@tomlarkworthy/serverside-cells) called [preview](https://observablehq.com/@tomlarkworthy/blog-first-post#preview) to dynamically serve the page. You can see that preview at the following link:

[https://endpointservice.web.app/notebooks/@tomlarkworthy/blog-first-post/deployments/preview](https://endpointservice.web.app/notebooks/@tomlarkworthy/blog-first-post/deployments/preview)

By default, the preview page renders every visit. This is somewhat slow, taking around 2-3 seconds, but it means published changes are reflected quickly. However, it is a horrible URL and too slow for production.

I give the page a nice URL using Netlify. To make the production page fast, I max the shared cache settings in the [serverside cell](https://observablehq.com/@tomlarkworthy/serverside-cells) when a production _X-Version_ header is present. Thus, so we lean heavily on the integrated CDN.

On the Netlify end, I set up the page to redirect to the serverside cell URL and add a custom _X-Version_ header. When the production page is updated, the version header is bumped, so the upstream cache is invalidated.

## Stay tuned

The personal webpage is a work in progress. Meta tags are missing, the RSS feed doesn't work and it doesn't support more than one page yet! But I will add to this over the next few weeks and hopefully get it to a state where anybody can create a page easily. For now, follow along on Observable${icon()} or [Twitter](https://twitter.com/tomlarkworthy).

Check

`
}`
)}

function _initial()
{
  const arr = Array(61).fill(0);
  arr[30] = 1;
  return arr
}


async function _6(html,FileAttachment){return(
html`<img src=${await FileAttachment("image.png").url()}>`
)}

function _rule30(){return(
(input) => input.map((_, idx) => {
  const context = [input[idx-1] || 0, input[idx] || 0, input[idx+1] || 0];
  const id = JSON.stringify
  switch (id(context)) {
    case id([1,1,1]): return 0
    case id([1,1,0]): return 0
    case id([1,0,1]): return 0
    case id([1,0,0]): return 1
    case id([0,1,1]): return 1
    case id([0,1,0]): return 1
    case id([0,0,1]): return 1
    case id([0,0,0]): return 0
    default: throw Error(`Unexpected ${context}`)
  }
})
)}

function _rule30n(rule30,initial){return(
(n) => new Array(n).fill(0).reduce(
  (acc) => {
    console.log(acc)
    return acc.concat([rule30(acc[acc.length - 1])])
  },
  [initial]
)
)}

function _preview(deploy,header,topbar,sidebar,title,content){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  return res.send(`<html class="has-navbar-fixed-top">
    <head>
    ${header.outerHTML}
    </head>
    <body>
    ${topbar.outerHTML}
    <div class="columns">
      ${sidebar.outerHTML}
    <div class="column is-half">
      ${title.outerHTML}
      ${content.outerHTML}
    </div>
    </body>
    </html>`)
})
)}

function _10(md){return(
md`


Netlify redirect:
-H 'cache-control: max-age=0' // Does not affect FH?

-H 'if-none-match: <etag>'  if etag is right we can cache a cache hit
-H 'Authorization: <>' We can can cause a refetch regardless

-X 'X-Version' We can cause a refetch

`
)}

function _15(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/0b3da562321b38a8c16b5ffb789ab0919d222c67d95901dc72ecf7e5f8564a8bcf01bbf382e9291cae3b5f2374fe1d2485497c86eeb28079ca7e7a9dbc2206f4.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer()).define(["html"], _2);
  main.variable(observer()).define(["deployStaticFile","content","preview"], _3);
  main.variable(observer("content")).define("content", ["html","md","rule30n","icon"], _content);
  main.variable(observer("initial")).define("initial", _initial);
  main.variable(observer()).define(["html","FileAttachment"], _6);
  main.variable(observer("rule30")).define("rule30", _rule30);
  main.variable(observer("rule30n")).define("rule30n", ["rule30","initial"], _rule30n);
  main.variable(observer("preview")).define("preview", ["deploy","header","topbar","sidebar","title","content"], _preview);
  main.variable(observer()).define(["md"], _10);
  const child1 = runtime.module(define1);
  main.import("sidebar", child1);
  main.import("topbar", child1);
  main.import("header", child1);
  main.import("deploy", child1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("icon", child2);
  const child3 = runtime.module(define3);
  main.import("deployStaticFile", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _15);
  return main;
}
