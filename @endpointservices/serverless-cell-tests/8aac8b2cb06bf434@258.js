// https://observablehq.com/@endpointservices/onversion@258
import define1 from "./58f3eb7334551ae6@209.js";

function _1(onVersion,md){return(
md`# On Version Notebook Hook 

Execute a JS callback function when a notebook version is created (note the code will be executed on a remote machine). Could be useful for wiring up Observable as the front end to a CRM or for a Continuous Delivery process. Publishing a notebook always causes a version bump.

~~~js
import { onVersion } from "@endpointservices/onversion"
~~~

A good initial hook is to call a [request logging service](https://observablehq.com/@endpointservices/realtime-request-log) so you can confirm the hook is firing. 

~~~js
onVersion((metadata) => {
  fetch(
    \`https://webcode.run/observablehq.com/@endpointservices/realtime-request-log\` + 
    \`/version-\${metadata?.id}@\${metadata?.version}\`
  );
})
~~~

The hook is passed the notebook id and version.

~~~js
{
  "id":"8aac8b2cb06bf434",
  "version":"113",
}
~~~

Inspired by a thread on [Observable Talk](https://talk.observablehq.com/t/triggering-a-build-process-on-publish-notebook-event/5719/4)


${(onVersion, '')}
`
)}

function _2(md){return(
md`### Low Latency

With a sample size of 1, I recorded a latency of seven seconds`
)}

function _3(htl){return(
htl.html`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lGYdoCNkdAk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _4(md){return(
md`### How it works

When a notebook is published, Observable's infra loads the notebook to scan for metadata. We can detect this process by looking at the host URL (and a few other ways) `
)}

async function _5(FileAttachment,md){return(
md`#### Example - WebHook

In this example we ask the notebook to make an outbound request after a notebook is published.

For our example we called an external [request log](https://observablehq.com/@endpointservices/realtime-request-log) so it can be verified that the custom code was executed. Here is how this demo is logged (note we see the notebook ID and version in the URL suffix)

<img width=500 src=${await FileAttachment("image@1.png").url()}></img>`
)}

function _nonce(){return(
3
)}

function _7(onVersion){return(
onVersion((metadata) => {
  fetch(
    `https://webcode.run/observablehq.com/@endpointservices/realtime-request-log/version-${metadata?.id}@${metadata?.version}`
  );
})
)}

function _8(md){return(
md`### Implementation

We check to see if the URL is prefixed with /thumbnail`
)}

function _extractMetadata(){return(
(pathname) => {
  const match = /^\/thumbnail\/(\S+)@(\d+)/.exec(pathname);
  if (!match) return undefined;
  return {
    id: match[1],
    version: match[2]
  };
}
)}

function _onVersion(extractMetadata,html){return(
async (work) => {
  const metadata = extractMetadata(html`<a href="#">`.pathname);
  if (metadata) {
    work(metadata);
  }
  return work;
}
)}

function _12(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/4729a9f274ae2604cf10e1384d5e582d108eb74e56765e26c57dd37a5ef88ddb7850c71291fe021eb33869eb10af413facd2d13d2c332bf325574c61213d5c64.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["onVersion","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["htl"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["FileAttachment","md"], _5);
  main.variable(observer("nonce")).define("nonce", _nonce);
  main.variable(observer()).define(["onVersion"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("extractMetadata")).define("extractMetadata", _extractMetadata);
  main.variable(observer("onVersion")).define("onVersion", ["extractMetadata","html"], _onVersion);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _12);
  return main;
}
