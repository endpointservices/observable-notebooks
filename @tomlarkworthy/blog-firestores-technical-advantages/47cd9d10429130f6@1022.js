import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@347.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: Firestore's Technical Advantages
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(content,string_to_slug){return(
{
  description:
    "Don't underestimate Firestore, for many situations, its the world #1",
  notebook:
    'https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager',
  tags: ["article", "firebase"],
  image:
    "https://storage.googleapis.com/o_tomlarkworthy_toms/public/blogs/firestore.png",
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

function _6(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${md`

![](https://storage.googleapis.com/o_tomlarkworthy_toms/public/blogs/firestore.png)

I have read some pretty poor articles bashing Firestore recently. Generally they completely miss the features set or cargo cult Postgres SQL. This article attempt to highlight the features of Firestore that you won't see with a Postgres solution (note I love Postgres), highlighting several area's where Firestore is the world #1.

## Clientside first

It's designed for a direct connection to a mobile/webapp. This means it has a number of features that are unmatched in the market.

### Latency compensation

Firestore maintains a local cache, so local writes and observable immediately. Greatly simplifying controller design. It even broadcasts writes to adjacent tabs in the browser for 0 latency across browser tabs. *You ain't got time to implement that!*

### Offline persistence

The cache is backed by persistent storage, so your app works offline without much work. This is a huge feature that is difficult to get right and essential for a good mobile experience.

### Authorisation rules

The database has a layer of security rules which are very flexible and can depend on values in the database. 

### Causal Consistency

Client SDKs observe their own writes first, and remote writes sometime later. Firestore guarantees that remote writes preserve their order. This is better than eventual consistency, its causal consistency and the best you can manage in a distributed setting.
The fact write order is preserved makes the system very intuitive, but many Firestore competitors do not guarantee this property which leads to weird bugs and second guessing.

### 1M concurrent clients

Its not so easy to support 1M **concurrent** connections, that's serious engineering work.


## Spanner Backed

Firestore somewhat outclasses Postgres on underlying database technology too, being based on Google Spanner. Firestore is the most affordable way to access a Google Spanner based database.

### 99.999% SLA

Yes. You probably can't find a more reliable cross region database.

### Multi-region yet strong consistency

Writes are replicated across multiple regions. This is one of the reasons why it is so reliable, it is resistant to single data centre losses. It can achieve this AND still be strongly consistent. It is simply not possible to configure Postgres to be multi region and be strongly consistent. This is really what Spanner brings to the table.

### Transactions

Firestore can do atomic writes across documents, without _caveats_, without _sharding_. Very few distributed databases can achieve this in a multi-region setting. 

### array-contains-any joins

I have read that noSQL databases do not support joins at all. This is true for many NoSQL solutions, but not the full truth in Firestore's case. It is true query expressivity is lower than SQL.

However, thanks to the "array-contains-any" query you can retrieve a set of documents matching a set of ids in a single query. This is far more efficient than having to retrieve documents on the other side of a join one at a time. Thus a SQL with 3 joins can usually be performed with 3 queries in Firestore with the appropriate indexes. Though, to be fair Postgres has the upper hand here.

### Scalability

Firestore is true serverless with essentially unbounded scalability thanks to its Spanner backend. It also scales to zero so you only pay for what you use, unlike Postgres which has a fixed provisioning cost and an associated performance ceiling.

## Conclusion

Postgres is a great default choice for a startup. However, if your product is used on mobile or across the globe, you might find Firestore a better match due to its state-of-the-art backend and client SDKs.

*Disclaimer: I used to work on the Firebase databases*




`}`
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

function _14(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("title")).define("title", ["html","md"], _title);
  main.variable(observer()).define(["md","metadata"], _2);
  main.variable(observer("metadata")).define("metadata", ["content","string_to_slug"], _metadata);
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
