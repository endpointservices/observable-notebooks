// https://observablehq.com/@endpointservices/webcode@836
import define1 from "./cbc2e7f6260d11b1@2790.js";
import define2 from "./dff1e917c89f5e76@1964.js";
import define3 from "./58f3eb7334551ae6@215.js";

function _1(html){return(
html`<a href="https://webcode.run"><h1 style="font-family: Tahoma; font-size: 9vw;"><span style="color: #E78AAE">WEB</span><span style="color: #626262">code</span><span style="color: #9DE2BF">.</span><span style="color: #4A44C4">run</span></h1></a>

`
)}

function _2(md){return(
md`## ** Rapid HTTP endpoint development featuring *production debugging*, *instant deploys*** and [Observable](https://observablehq.com/) browser based tooling.
`
)}

function _3(width,html)
{
  const w = Math.min(width, 640);
  return html`<iframe width="${w}" height="${
    (w * 3) / 4
  }" src="https://www.youtube-nocookie.com/embed/HqITeIFlRXI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}


function _4(md){return(
md`Do you like the idea of Serverless functions-at-a-service but find the sheer pain of development is actually worse than the operation complexity it displaces? Do you empathize with the following:-

- The local tooling is confusing, inconsistent with prod and takes too much effort to setup?
- The deployment cycle is too slow?
- The lack of debugger is like coding blindfolded?

If you answered yes to any of those, this you might want to check out **webcode**, find the [** quickstart**](https://observablehq.com/@endpointservices/webcode-quickstart) down below.`
)}

function _5(md){return(
md`### Extending [Observable](https://observablehq.com/) to the backend.
We are not affiliated with Observable, but we love love the environment and the hyper-fast development loop it enables. We layered a serverless runtime *on top* of Observable that preserves its innovative approach to coding. So the first big feature is you can use Observable notebooks to author HTTP endpoints and Observable has many benefits as a JS++ development environment

- Reactive recomputation of only dependant cells on code changes.
- 100% browser based
- version control
- notebook forking
- social layer
- ES6 module distribution
`
)}

function _6(md){return(
md`## Webcode

Webcode though, was created to fix the top pain points of modern serverless development. It features:-

- *Instant* deploys of HTTP endpoints.
- **Live code** with production debugging (DevTools)
- 100% browser based, so nothing to install, you can even code from your phone.

Plus, there are all the other [Observable](https://observablehq.com/) features: [forking](https://observablehq.com/@observablehq/fork-share-merge), [version history](https://observablehq.com/@observablehq/history), [comments](https://observablehq.com/@observablehq/suggestions-and-comments) and [community](https://observablehq.com/community).
`
)}

function _7(md){return(
md`## Your first endpoint in 5 minutes

Because there are not tools to install on your machine, and deployment is instant, you can bring up a custom HTTP endpoints, with no previous experience, in under 5 minutes. Why not give the [quickstart](https://observablehq.com/@endpointservices/webcode-quickstart) a spin?`
)}

function _8(md){return(
md`
## More About the Service

The previous version was called [serverless-cells](/@endpointservices/serverless-cells) which has the same programming model and API reference.

Find the API reference [here](https://observablehq.com/@endpointservices/webcode-docs)`
)}

function _9(md){return(
md`
## The Foundation of an Open Cloud

Because the source is defined within an _Observable_ notebook also implies the source code can be audited, edited and forked by anyone too. 

- Its a serverless runtime that *only* executes public source code
- API endpoints are not a black box, users can audit what code is running before sending data to it.
- You can learn how others approach backend programming from tangible, live implementations.
- You can fork and customize an implementation of an API service using normal Observable notebook features.
`
)}

function _10(md){return(
md`
### Open Cloud Services

Serverless cells are being used to build an Open Cloud, some of the services so far

- An [IndieWeb authentication server](https://observablehq.com/@endpointservices/auth), used to login user using their personal homepages.
- A [CORS proxy](https://observablehq.com/@tomlarkworthy/fetchp) service, used to get around those pesky CORS errors. Also can do BASIC AUTH and secret injection.
- [Secret Manager](https://observablehq.com/@endpointservices/secrets) is the service used to upload secrets. 
- A [cloud cron](https://observablehq.com/@endpointservices/cron) service, you can trigger your serverless cells on a schedule.
- [Zapier](https://observablehq.com/@endpointservices/zapier) integration, so you can get access to thousands of APIs
- [Puppeteer-as-a-service](https://observablehq.com/@endpointservices/puppeteer) for end2end testing (WIP)
- [Netlify](https://observablehq.com/@endpointservices/netlify) for deploying static sites using partial deploys. 
- A [word2vec](https://observablehq.com/@endpointservices/word2vec) service that serves the entire Google word2vec corpus.

So you can just peek at the implementation of any of those to see how secure services can be constructed.
`
)}

function _11(md){return(
md`
### Open Runtime

Runtime of the source code is published here: https://github.com/endpointservices/webcode.run
`
)}

function _12(md){return(
md`##### Implementation`
)}

function _endpoint(deploy){return(
deploy
)}

function _deploy(baseDeploy,serverlessCellUI,subdomain){return(
(name, handler, options = {}) => {
  const resolveUid = "uiilwqbmonujdnfv" + name;
  if (window[resolveUid]) {
    console.log(`Serverless cells, invalidating ${name}`);
    window[resolveUid]();
  }
  const link = baseDeploy(name, handler, {
    reusable: true,
    ...options,
    modifiers: [...(options.modifiers || []), "dynamic"] // Tell runtime to block for dynamic config
  });
  const ui = serverlessCellUI(
    {
      name,
      namespace: subdomain(),
      endpoint: link.href,
      options
    },
    new Promise((resolve) => (window[resolveUid] = resolve)) // Our invlidation promise
  );
  ui.href = link.href;
  return ui;
}
)}

function _15(md){return(
md`##### Dependencies`
)}

function _18(htl){return(
htl.html`<style>
  code {
    white-space: pre-wrap;
    border: solid;
    background-color: lightyellow;
    border-width: 3px;
    border-radius: 10px;
    padding: 10px;
    display: block;
  }

  .observablehq {
    background: #FFFFFF
  }
  
  .observablehq h1 {
    font-family: "Impact";
  }
</stlye>`
)}

function _20(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["width","html"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("endpoint")).define("endpoint", ["deploy"], _endpoint);
  main.variable(observer("deploy")).define("deploy", ["baseDeploy","serverlessCellUI","subdomain"], _deploy);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("serverlessCellUI", child1);
  main.import("colors", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", "baseDeploy", child2);
  main.import("getContext", child2);
  main.import("subdomain", child2);
  main.variable(observer()).define(["htl"], _18);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _20);
  return main;
}
