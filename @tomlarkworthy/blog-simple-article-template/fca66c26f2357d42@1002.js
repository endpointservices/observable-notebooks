import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: Simple Article Template
`}`
)}

function _DESCRIPTION(){return(
`How this blog is deployed to Netlify by an open source notebook`
)}

function _NOTEBOOK(){return(
"https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager"
)}

function _TAGS(){return(
["article", "jamstack"]
)}

function _IMAGE_URL(){return(
"https://static.observableusercontent.com/files/d1bc27d657c5492993abf9b628aba9cd957327a5593b4f523e092682a4b1b703c75a9041a3b9715ec9ebb7ed4ff5f99e916c738e93ad03073d3dbf5587af4ab1"
)}

function _6(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(DESCRIPTION,NOTEBOOK,TAGS,IMAGE_URL,content,string_to_slug){return(
{
  description: DESCRIPTION,
  notebook: NOTEBOOK,
  tags: TAGS,
  image: IMAGE_URL,
  get title() {
    return document.getElementById("blogtitle").innerText.replace("BLOG: ", "");
  },
  content: content.outerHTML,
  get target() {
    return `/blogs/${string_to_slug(this.title)}.html`;
  },
  twitterCreator: "@tomlarkworthy",
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

function _10(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${
md`

MARKDOWN HERE

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
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer("DESCRIPTION")).define("DESCRIPTION", _DESCRIPTION);
  main.variable(observer("NOTEBOOK")).define("NOTEBOOK", _NOTEBOOK);
  main.variable(observer("TAGS")).define("TAGS", _TAGS);
  main.variable(observer("IMAGE_URL")).define("IMAGE_URL", _IMAGE_URL);
  main.variable(observer()).define(["md","metadata"], _6);
  main.variable(observer("metadata")).define("metadata", ["DESCRIPTION","NOTEBOOK","TAGS","IMAGE_URL","content","string_to_slug"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
  main.variable(observer()).define(["md","metadata"], _10);
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
