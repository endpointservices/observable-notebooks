import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@351.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: How Cloud Run changes Cloud Architecture
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(content,string_to_slug){return(
{
  description: "How Cloud Run min-instances changes Cloud Architecture",
  notebook:
    'https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager',
  tags: ["article", "cloud"],
  image:
    "https://storage.googleapis.com/publicartifacts/blogimages/blog-cloud-run-changes-architecture/cloudrun.png",
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

Cloud Run is interesting, it's a general-purpose elastic container hosting service, a bit like Fargate or Azure-Containers but with a few critical differences.

Most interesting is that it scales to zero, and auto-scales horizontally, making it very cost-effective for low traffic jobs (e.g. overnight batch processes).

It also runs arbitrary docker containers and can serve requests concurrently, meaning that for modest traffic you don't usually need more than 1 instance running (and you save money).

Its flexibility comes at the cost of higher cold starts though. Take a look at our cold start latencies for an on-demand puppeteer service in a low traffic region:

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-cloud-run-changes-architecture/cold.png)

We are seeing cold start latencies of around 10 seconds, to boot up a 400MB container and start Chrome. This was annoyingly slow.

Not all our regions were that slow though, in one of the busier regions we saw a bimodal latency graph:

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-cloud-run-changes-architecture/coldandwarm.png)

suggesting that 2.5 seconds is booting up a puppeteer instance and serving the request, and 5-7 seconds is booting the container. For busier regions often a container is running so that's why sometimes the cold latencies are much lower. (for completeness a warm latency measurement is 1.5 seconds, so probably 1 second is booting chrome, and 1.5 seconds is serving the request).

So... how could we speed things up? 5-7 seconds is spent on container startup. It's our biggest spender of the latency budget, so that's what we should concentrate on reducing.

One solution is to run a dedicated VM, though that loses the horizontal elasticity. Even so, let's do the numbers.

A 2 vCPU 2GB RAM machine (e2-highcpu-2) is $36.11 per month

Now Cloud Run has a relatively new feature called [min-instances](https://cloud.google.com/run/docs/configuring/min-instances). 

This keeps some containers IDLE but with no CPU budget, so they can be flipped on quicker. IDLE instances are still charged, BUT, at around a 10x reduced cost. The cost for an IDLE 2 vCPU 2GB RAM Cloud Run is $26.28 per month. 

This gets pretty close to having your cake and eating it. You get lower latency like a dedicated machine, but also still horizontally elastic. It may even cost less.

For our application, we tried a *min-instance* of 1 and this was the result.

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-cloud-run-changes-architecture/warm.png)

Our cold start latencies from container startup are decimated! We have not had to change any code. 

I think this min-instances feature is a game-changer for cloud architecture. You can now get the benefits of dedicated VMs at a comparable price to dedicated VMs but with elasticity and image-based deployments. The new min-instances feature broadens the range of applications that serverless compute can address. 

---

*Our latency monitoring infrastructure and data is [public](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor).*

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
