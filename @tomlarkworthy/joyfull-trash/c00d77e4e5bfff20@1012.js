import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: Making the Trash Joyfull, Marie Kondo style
`}`
)}

function _preview(deploy,page){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  return res.send(page)
})
)}

function _3(md,metadata){return(
md`Live ${metadata.url}`
)}

function _settings(deployStaticFile,metadata,preview){return(
deployStaticFile({
  ...metadata,
  app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
  source: preview.href
})
)}

async function _metadata(FileAttachment,content,string_to_slug){return(
{
  description: "We believe in Marie Kondo decluttering maxim that every household object should spark joy. We recently turned around our most disliked object, the trash can, to something that the kids fight over who will empty it. How? here is the story…",
  notebook: 'https://observablehq.com/@tomlarkworthy/joyfull-trash',
  tags: ["article", "reviews"],
  image: await FileAttachment("nojoy.jpg").url(),
  get title() {
    return document.getElementById("blogtitle").innerText.replace("BLOG: ", "")
  },
  content: content.outerHTML,
  get target() {
    return `/blogs/${string_to_slug(this.title)}.html`
  },
  twitterCreator: "@tomlarkworthy",
  get url() {
    return 'https://tomlarkworthy.endpointservices.net' + this.target;
  }
}
)}

function _6(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${
md`

We believe in Marie Kondo decluttering maxim that every household object should spark joy. We recently turned around our most disliked object, the trash can, to something that the kids fight over who will empty it. How? here is the story…

To make being at home pleasanter, we pondered which object in the house brings us the least joy? Worse than even the toilet brush, the trash can we find torturous. We hate it to the point of avoiding it 'til trash is spilling onto the floor.

Furthermore, the bags often burst, getting gross liquid everywhere. Yuck, the trash sucks! How could we possibly turn it into something fun? We googled around for top of the range trash cans and found a wonderful concept...

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dAZemohmgfU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Here is a can that: 1. opens itself, so you do not need to touch it ever. 2. Bags itself when full. 3. Replaces the bag fully automatically! 4. Seals the outgoing full bags.

So this is a new robotic product which I am deeply suspicious of (I have a PhD in robots), but, we bought it 4 months ago, it's still going strong, and *it genuinely brings us joy*. We *love* showing guests the rebagging cycle. It’s a showpiece and a point of pride now! Wow!

The kids *love* activating the rebagging cycle, and will happily take the bagged trash to the front door. The can is small, the bags are airtight sealed and don’t leak.

There are negatives, the bags *are* small. Though, it makes them easy to take out and stops them from breaking, so we do not mind the more frequent trips. Overall it's a really great purchase that has improved our lives. Marie Kondo is right!

I did not think we could make the trash fun and joyful but it is possible. It’s kinda expensive but it’s well worth it. The product we bought was a [Xiaomi Townew T1 Self-Sealing and Self-Changing
Trash Can](https://geni.us/XPIS) (commercial link)


`
}`
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
        <img width="800" height="400" src="${metadata.image}"></img>
        ${content.outerHTML}
      </div>
    </div>
    ${articleFooter(metadata).outerHTML}
  </body>
</html>`
)}

function _string_to_slug(){return(
function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["nojoy.jpg", {url: new URL("./files/410fd08d121bad351c9de7cd3290583f27fc9068fd816b35346dad61c6de4c8dceaef45fdc6da8df3de8eb0930df9c3e425c177d8476d459763cf1ff853d4244.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer()).define(["md","metadata"], _3);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("metadata")).define("metadata", ["FileAttachment","content","string_to_slug"], _metadata);
  main.variable(observer()).define(["md","metadata"], _6);
  main.variable(observer("content")).define("content", ["html","md"], _content);
  main.variable(observer("page")).define("page", ["articleHeader","metadata","topbar","sidebar","html","content","articleFooter"], _page);
  main.variable(observer("string_to_slug")).define("string_to_slug", _string_to_slug);
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
