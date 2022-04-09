// https://observablehq.com/@endpointservices/encapsulated-monitoring@216
import define1 from "./293899bef371e135@225.js";

function _1(md){return(
md`# The Fully Encapsulated Monitoring Notebook

Imagine, in a page of code, hosted entirely on the web, with zero tools to install or infra to manage, you could have a state-of-art *programmable* data visualization system recording anything reachable on the internet. Bold claim? I have built two such systems and I am so excited by the possibilities I wish to excitedly share the architecture.`
)}

function _2(md){return(
md`### IDE, Documentation, Code Host and Front End: [Observablehq.com](https://observablehq.com)

[Observablehq.com](https://observablehq.com) is a mind-blowingly simpler platform that can replace: Github, CI, VScode, static hosting, Google docs, and containers. It hosts, runs, and provides an IDE for client-side Javascript. Furthermore, it provides a novel reactive notebook format, so code can be written non-linearly and the program output is interleaved with the code. It’s also a literate programming environment, so notebooks also support documentation, multiplayer commenting, and collaboration.

*Observable is a single tool that can replace numerous critical tools required in a software project. Including development, technical documentation, and hosting.*
`
)}

function _3(md){return(
md`### Charting: [@observablehq/plot](https://observablehq.com/@observablehq/plot)

[Observablehq.com](https://observablehq.com), is the hottest place for Dataviz, so it naturally hosts a number of state-of-the-art tools such as [plot](https://observablehq.com/@observablehq/plot). [Plot](https://observablehq.com/@observablehq/plot) stands out by being so fast to develop with, but [Vega-lite](https://observablehq.com/@observablehq/vega-lite) is another great option. Check out some of the workshops on how to use these tools effectively.

- (Plot) [Analyzing Time Series Data in Observable: Hands-on Workshop](https://www.youtube.com/watch?v=bTQfm6gwngY)
- (vega-lite) [Observable: Vega-Lite: A Crash Course](https://www.youtube.com/watch?v=ZV_Yjcs5WtM)

To do queries on the client side I would use [Arquero](https://observablehq.com/@uwdata/introducing-arquero) for data operations. There is an interactive intro to Arquero through [Data Wrangler](https://observablehq.com/@observablehq/data-wrangler).`
)}

function _4(md){return(
md`### UI: [@observablehq/inputs](https://observablehq.com/@observablehq/inputs)
For simple controls, Observable has an excellent selection of off-the-shelf components through [@observablehq/inputs](https://observablehq.com/@observablehq/inputs). With some work, you can make complex UIs too (see [Scaling User Interface Development](https://observablehq.com/@tomlarkworthy/ui-development)).
`
)}

function _5(md){return(
md`### Realtime Database: [firebase.google.com](https://firebase.google.com)
As Observable is a reactive client-side environment, it works really well with reactive client-side databases like Firebase. When I am choosing for monitoring systems, I look for: cheap writes and low latency. So I tend to pick the [Firebase Realtime Database](https://firebase.google.com/docs/database) over [Firestore](https://firebase.google.com/docs/firestore) for monitoring applications. (FWIW I pick [Firestore](https://firebase.google.com/docs/firestore) for online transaction processing applications).
`
)}

function _6(md){return(
md`### API Endpoints: [WEBCode.run](https://webcode.run)
Monitoring solutions often need APIs, so they can respond to external services (e.g. queries, datapoint ingestion, [OAuth](https://observablehq.com/@tomlarkworthy/oauth-examples) handshakes). [WEBCode.run](https://webcode.run) extends Observable with an SDK that allows notebooks to host serverless endpoints. These endpoints can utilize [secrets](https://observablehq.com/@endpointservices/public-api-keys) and [scheduled functions](https://observablehq.com/@endpointservices/cron) so are a great fit when you need to interface with external systems and it can be all done without leaving [observablehq.com](https://observablehq.com).
`
)}

function _7(md){return(
md`## Example Monitoring Notebooks

I have built two notebooks so far that are self-enclosed systems, and they have both provided *immense* value to me. I intend to do many more.`
)}

function _8(md){return(
md`### 1. [Realtime Inbound Request Log](https://observablehq.com/@endpointservices/realtime-request-log)
The [Realtime Inbound Request Log](https://observablehq.com/@endpointservices/realtime-request-log) notebook hosts an endpoint and puts all inbound requests in a log. When you view the notebook the log entries are queried and some summaries are provided.
This notebook was developed to help me sniff request headers on a remote machine not under my control, by scripting the remote machine to query the instrumented endpoint.
`
)}

function _9(md){return(
md`### 2. [Latency Monitor](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor)

The [Latency Monitor](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor) notebook is a full end-to-end prober solution. It periodically schedules traffic to a system, measures the latency, and summarizes the results in a dashboard.

This has been in operation for nearly a1 year and helped quantify latency performance.
`
)}

function _10(md){return(
md`## Everything in one end-to-end environment.

I am delighted that everything is in a single artifact that can be shared with a URL. This is not some low code compromise either, all the parts work together providing the end-user with a state-of-the-art experience. *Realtime* data dashboards using state-of-the-art DataViz libraries, stitched together with a modern language using tools that support version control, step debuggers, *etc.*

By having the tools to modify the monitoring pipeline next to the technical documentation and realtime output of the production data allows anyone to maintain it with no context switching.

Overall it is a joyful development experience and operationally simple.`
)}

function _11(md){return(
md`#### Credits
- Article hosted on [Observable](https://observablehq.com/@tomlarkworthy/encapsulated-monitoring) and syndicated with [Blogify](https://observablehq.com/@tomlarkworthy/blogify)
- Photo by <a href="https://unsplash.com/@mjessier?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Myriam Jessier</a> on <a href="https://unsplash.com/s/photos/data?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  `
)}

function _13(footer,md){return(
footer, md``
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer","md"], _13);
  return main;
}
