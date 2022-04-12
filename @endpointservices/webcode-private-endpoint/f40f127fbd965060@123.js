// https://observablehq.com/@endpointservices/webcode-private-endpoint@123
import define1 from "./293899bef371e135@225.js";

function _1(md){return(
md`# [WEBCode.run](https://webcode.run) Private Endpoints Released`
)}

function _2(htl){return(
htl.html`<iframe width="560" height="315" src="https://www.youtube.com/embed/HqITeIFlRXI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _3(md){return(
md`[WEBCode.run](https://webcode.run) is growing! We have added our first paid feature which will help support it long term. WEBCode is bootstrapped so this is a big milestone!

For those that do not know, [WEBCode.run](https://webcode.run) allows you to run serverless compute workloads from within [Observable](https://observablehq.com) notebooks. Until now, notebooks containing [WEBCode.run](https://webcode.run) handlers had to be public so that WEBCode's compute layer could read the code. Not anymore! 

We have added a new feature for Observable [Team](https://observablehq.com/@observablehq/getting-started-with-teams) accounts that allows public access to serverless endpoints while keeping the source code private. We feel this feature best suits commercial teams, and thus, is a perfect fit for a paid tier. Find out more on the [webcode.run website](https://webcode.run) or contact [sales@webcode.run](mailto://sales@webcode.run).

For those that want to use WEBCode to build transparent open source services, they can continue do so at no charge.

As part of the work in providing a paid tier, we have updated the [website](https://webcode.run) significantly. You can also email me at [tom@webcode.run](mailto://tom@webcode.run)!


### Coming soon

[WEBCode.run](https://webcode.run) enables running HTTP services with excellent performance and observability from within a notebook. In the coming months we will demonstrate why this is an important primitive. [WEBCode.run](https://webcode.run) is a connection technology for something larger, it enables completely self documenting projects to be bundled into a single encapsulated artifact. In the coming months the focus will be on delivering preconfigured artifacts you can one click fork to self-host and customize.

In our vision of the future, source level customization and self-hosting at the service level is a single click away. This is only possible when the backend and frontend + all the extras (documentation, monitoring) are a single forkable artifact, [WEBCode.run](https://webcode.run) *with* [Observablehq.com](https://observablehq.com) are able to deliver this.  

### Support us on Product Hunt

We are launching the paid tier and [webcode.run](https://webcode.run) on Product Hunt. Help us get to #1 with some love [here](https://www.producthunt.com/posts/webcode-run)

### Follow the newsletter

I am going to start posting webcode.run updates to a [newsletter](https://webcode.substack.com/), so this is another option you can stay up to date 
`
)}

function _4(htl){return(
htl.html`<iframe src="https://webcode.substack.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>`
)}

function _6(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["htl"], _4);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _6);
  return main;
}
