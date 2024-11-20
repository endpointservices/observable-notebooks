import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@347.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${md`# BLOG: Securing a Serverless Multi-Tenancy Puppeteer Service
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(content,string_to_slug){return(
{
  description:
    "If you ever try to stand up a Puppeteer service you will almost immediately find it is difficult to secure when running inside a Docker environment. This article documents how I persevered to create a browser based Puppeteer service on Observablehq.com",
  notebook:
    'https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager',
  tags: ["article", "serverless"],
  image:
    "https://storage.googleapis.com/o_tomlarkworthy_toms/public/blogs/puppeteer-securing/puppeteer.png",
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

function _7(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _content(html,md){return(
html`<div class=content>${md`

If you ever try to stand up a Puppeteer service you will almost immediately find it is difficult to secure when running inside a Docker environment. 

I love my serverless, so I was not prepared to take no for an answer. And with a lot of sweat, I think I able to stand up a Puppeteer service with full customer isolation and protection again serverside scripting from within a multi-tenancy docker container.

## Customer Isolation

Customers should not be able to view each other's data.

### --no-sandbox

Chrome itself is natively very good at sandboxing tabs for security reasons. Ideally, we would simply just exploit the inbuilt security model, e.g. put each customer in their own tab(s). Not so fast though! Unfortunately, Chrome won't boot under that configuration. The way that sandbox is implemented does not work containers, as a result, nearly every Dockerfile for Puppeteer on the internet launches with the --no-sandbox flag.  

### --cap-add=SYS_ADMIN

The few Dockerfiles I could find without --no-sandbox have added the SYS_ADMIN security capability. This is one solution to keep the sandbox, but most managed docker environments don't expose this control, unfortunately. So I needed a different way to work on Serverless.

### Linux process isolation

Normal Linux processes cannot mess with each other's memory. So the OS approach for customer isolation is to run a different browser for each customer. 

### Resource isolation

You still need to be careful though, as even separate Chrome processes can still access common resources (e.g. filesystem). In particular, user sessions, cookies, and website cached data need to be stored in different directories for each customer

~~~
--disk-cache-dir
--media-cache-dir
~~~


## Protection against Serverside Request Forgery

A Puppeteer service essentially allows end-users to run code within our infrastructure. The big danger is that the Puppeteer instance will become a bastion for network intrusion. This is not an academic thing either, a ton of exploits observed in the wild used Puppeteer or similar to launch attacks via serverside request forgery attacks. Check out

- https://techkranti.com/ssrf-aws-metadata-leakage/ 
- https://twitter.com/IAmMandatory/status/1196939247057457152
- https://www.hackerone.com/blog/spotlight-server-side

In particular, an easy attack is to have Puppeteer run a webpage that probes for Cloud metadata servers, which can then be used to obtain credentials. 

So, we must prevent Chrome from accessing certain URLs and local IP addresses. 

You can find a list of IP addressed to block on [owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html).


### --proxy-server

Chrome can be configured to use an outbound HTTP proxy server, which we can use to intercept and filter traffic. For our service, we used TinyProxy as it has a very low resource overhead (2MB). 

The TinyProxy configuration then protects against access to sensitive IP addresses and domains.


Our translation of OWASP's IP filters to TinyProxy configuration can be found on [Github](https://github.com/endpointservices/serverlesscells/blob/main/tinyproxy.conf)

### Exposing the Chrome DevTools protocol port

The most exciting thing for me is allowing users to script Chrome from within their browser environment remotely. This is enabled by exposing the Devtools debug WebSocket protocol. 

To allow us to meter access, we expose a WebSocket endpoint that requires an access_token to be in the path. We can then verify the access_token, boot Puppeteer, and then proxy the public WebSocket endpoint to the internal WebSocket endpoint on demand.

## Try it in your Browser without installation

With that in place, we are now able to offer Puppeteer access from right within a browser. Check it out, we are hosting it from within @observablehq in a [notebook](https://observablehq.com/@endpointservices/puppeteer
), and you can sign in using [IndieAuth](https://indieauth.net/).

Full source code is available on [Github](https://github.com/endpointservices/serverlesscells/blob/main/tinyproxy.conf) and it is designed to be run on Google Cloud Run.

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

function _15(footer){return(
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
  main.variable(observer()).define(["md","metadata"], _7);
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
  main.variable(observer()).define(["footer"], _15);
  return main;
}
