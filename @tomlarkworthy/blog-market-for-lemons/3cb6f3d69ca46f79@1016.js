import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@351.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: The Internet is a Market for Lemons
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

async function _metadata(FileAttachment,content,string_to_slug){return(
{
  description: "Internet software distribution has a huge design flaw, you cannot see what you are buying. When providers are more informed than the buyers a “market-for-lemons” forms. That feeling keeps you to ‘the beaten path’ which exacerbates inequality and amplifies monopolistic power. My investment hypothesis is if we fix this, we fix the market.",
  notebook: 'https://observablehq.com/@tomlarkworthy/blog-market-for-lemons',
  tags: ["article", "transparency"],
  image: await FileAttachment("thitiphum-koonjantuek-TFqjlTmkeyY-unsplash@1.jpg").url(),
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

function _6(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${
md`

Do you get anxious when installing/authorizing software? That feeling keeps you to ‘the beaten path’ which exacerbates inequality and amplifies monopolistic power.  Here I explain the underlying economic mechanisms that have turned the modern internet into a battlefield... 

Internet software distribution has a huge design flaw, you cannot *see* what you are buying. You cannot see *how* your data is processed. You cannot *verify* the software does what it says it does. In many cases it does not.

For example, your internet service provider, *that you pay money to provide you with internet*, probably also sells your surfing data, in a free market, to anybody. Nobody would willingly choose that package! 

Similarly, apps in the app store advertise doing one thing, whilst hoovering up data to sell to data brokers. If given a choice, you would pick the app that does not do that, but you can’t. You cannot observe how software is going to behave post purchase. 

The software market is stuffed with software that advertises doing one thing, but behind your back, also does several other things that are against your best interests. This is why we are anxious. The internet, on aggregate, is actively hostile. Why has this happened?

George Akerlof won a Nobel prize for observing that when providers are more informed than the buyers a “market-for-lemons” forms. The market malfunctions by rewarding sleazy and deceptive practices. This is where we are today on the internet. 

When buyers cannot assess the quality of a product directly, they use different buying signals. For software, this is often brand reputation. Established companies are incentivised to play by the rules, as their protection of the brand itself becomes worthwhile.

But this encourages winner-takes-all market dynamics. So we end up with just a handful of household brand technology companies (the FAANGs) whose individual opinions dominate the global narrative. This is not a healthy market for diversity. 

We need to amplify the smaller good guys whilst avoiding the bad guys. Remember: this whole mess is because software buyers cannot assess the quality of the software they are purchasing.  My investment hypothesis is if we fix this, we fix the market.

So my goal is to improve software service observability. Imagine if end users could view the source code in a continuously publicly auditable system. It would take one motivated technical user to inoculate all the non-technical users against hostile service providers

Serverside open source. We have a demo. Checkout https://observablehq.com/@tomlarkworthy/serverless-cells on the Observable platform. Follow the journey on twitter https://twitter.com/tomlarkworthy. Let’s deescalate the end user/service provider relation.

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

function _14(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["thitiphum-koonjantuek-TFqjlTmkeyY-unsplash@1.jpg", {url: new URL("./files/346fd4ad571f02e2ec797040b9f1a4ed41657ed0b07f34338cf9e63a3bbc39435344f5fad11041a572dfc8f5f68db152ebcb0a29c2702d49eee58e5d23bc7de1.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer()).define(["md","metadata"], _2);
  main.variable(observer("metadata")).define("metadata", ["FileAttachment","content","string_to_slug"], _metadata);
  main.variable(observer("viewof settings")).define("viewof settings", ["deployStaticFile","metadata","preview"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
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
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _14);
  return main;
}
