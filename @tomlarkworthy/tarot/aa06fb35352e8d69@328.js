import define1 from "./549f62919a7018eb@4378.js";
import define2 from "./293899bef371e135@290.js";

function _app(transitions,$0){return(
transitions, $0
)}

function _2(app,md){return(
md`## About

The result of asking, *"can you build end-to-end applications on Observable?"* and an exploration into [OpenAI](https://openai.com/)'s abilities to read Tarot. Amazingly, it's a pretty good Tarot reader out of the box with no training.

This application does pretty much everything a production service needs to do. It uses a database and protected APIs including OpenAI. It adheres to OpenAI's [default safety requirements](https://beta.openai.com/docs/usage-guidelines/default-safety-requirements-for-all-applications), including: anonymous authentication, rate limiting and AI content filtering. Web requests are proxied through Netlify to add a vanity domain [thetarot.online](https://thetarot.online) ([code in Github](https://github.com/endpointservices/thetarot.online)). Production traffic can be proxied into the developers notebook, allowing live tracing of API executions. It can even be embedded inside a [Medium article](https://tom-larkworthy.medium.com/385d935662a3). Errors are monitored through [Sentry.io](https://sentry.io)

For the curious folk who wish to peak behind the curtain, please, follow an import link below.

${(app, '')}

`
)}

function _4(md){return(
md`## Learnings (this is my rough notes until I write them up properly)`
)}

async function _5(FileAttachment,md){return(
md`Long running notebooks created unique issues, such as crashing, and requiring manual intervention to restart them. Service was down during these times. 


Down was detected by complaints. When visiting the site it would 500 instead of telling a fortune.

First issue was automating detection of outages. We did this with a special API request that entered the request pipeline.

That special health check request was pinged by uptime robot. Then I could manually intervene by publishing the notebook, thus restarting the server.

Now we could keep the service up manually. Next issue was to trace the bug. For some reason the error was not in Sentry error logs. 

Added on demand state probe (https://webcode.run/observablehq.com/@tomlarkworthy/tarot-backend;variables), which I sampled. Discovered simple errors in pipeline.

Discovery 1: Sentry was blind to runtime errors. So I fixed that bug.
Discovery 2: Errors in pipeline are not recovered from (BUG) so fixed that.

Actual error was a unsanitized request causing an error, it was ok for the request to fail but not bring down the whole server. Those whole classes of damage have been removed!

Now we look at performance is not good (Page Speed Insights mobile 37)

Fixed unused testing.js javascript loading
Avoided running examples that draw cards in the notebook code. We removed 4MB of assets 

Biggest drag is largest contentful paint takes 8 seconds. This is stated as being due to long critical chains, but prefetch/preload assets did not help although we could remove the chaining.
Page speed has a helpful display of the order assets are loaded

${await FileAttachment("image.png").image()}


`
)}

function _6(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/fb520994ff7d4b4c03533b716352aaf85b802b3033a00cc2f6c5f0ad59a310ee1c9a009ceacdbd24e67ad102075b95a1906beb2f4a7b3f7cf576569e0d3c911b.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("app")).define("app", ["transitions","viewof display"], _app);
  main.variable(observer()).define(["app","md"], _2);
  const child1 = runtime.module(define1);
  main.import("viewof display", child1);
  main.import("display", child1);
  main.import("transitions", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["FileAttachment","md"], _5);
  main.variable(observer()).define(["footer"], _6);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  return main;
}
