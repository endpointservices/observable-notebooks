// https://observablehq.com/@endpointservices/puppeteer@443
import define1 from "./f92778131fd76559@1169.js";
import define2 from "./c16efae137e70585@1416.js";
import define3 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["puppeteer-web-0.0.3.js",new URL("./files/d388b40ec6f0de2f7bc7298b068e8a0e84b4db2a6f31d6e150901f185e40f04c3bd38d06b75ada5932ece93d6e1af1fed8a9a6369d0682ae790944f964e9d924",import.meta.url)],["puppeteer.png",new URL("./files/243b533b7711810576f16d3718a988783a7b4cfc059c2eda243baf41d26762d9f128c746a5a8c2b181c7b7895506df8de83dd693447949a579543c0a91e969e4",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`# Browser Automation with Puppeteer

![](${await FileAttachment("puppeteer.png").url()})

[Puppeteer by Google](https://github.com/puppeteer/puppeteer) is a headless Chrome automation library. Now you can do it in the browser without installing or running anything! 

By using the work of [pupeteer-web](https://www.npmjs.com/package/puppeteer-web) (thanks [@entrptaher](https://github.com/entrptaher)!) we are able to make a connection with a remote pupeteer instance hosted by [@endpointservices](https://observablehq.com/@endpointservices) (in the serverless cell [binary](https://github.com/endpointservices/serverlesscells))

You need to login to use the service. We use IndeWeb login, so you can use either

1. An [IndieWeb Identity URL](https://indieweb.org/IndieAuth) of your personal homepage.
2. a Github profile URL.
3. an Observable profile URL, if it includes a link to a Github profile URL or some other authentication method. 

Alternatively, you can use a demo identity to login and try without any prior setup:

~~~
    https://webcode.run/notebooks/@endpointservices/identity/deploys/demo/mods/T
~~~


There is no billing for this ATM. But if it is popular I would adopt some usage based pricing in the order of $0.0001 per second.

## What can I do? 
[puppeteer docs](https://github.com/puppeteer/puppeteer#what-can-i-do)

<iframe width="640" height="400" src="https://www.youtube.com/embed/lhZOFUY1weo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Most things that you can do manually in the browser can be done using Puppeteer! Here are a few examples to get you started:

- Collect data from other websites
- Generate screenshots and PDFs of pages.
- Crawl a SPA (Single-Page Application) and generate pre-rendered content (i.e. "SSR" (Server-Side Rendering)).
- Automate form submission, UI testing, keyboard input, etc.
- Create an up-to-date, automated testing environment. Run your tests directly in the latest version of Chrome using the latest JavaScript and browser features.
- Capture a timeline trace of your site to help diagnose performance issues.



### Quickstart

~~~js
    import {viewof connect, weblogin} from '@endpointservices/puppeteer'
~~~


`
)});
  main.variable(observer()).define(["viewof user"], function($0){return(
$0
)});
  main.variable(observer("viewof connect")).define("viewof connect", ["md","user","puppeteer_web"], function(md,user,puppeteer_web)
{
  const ui = md`
<details>
<summary>[puppeteer](https://observablehq.com/@endpointservices/puppeteer) connection settings</summary>
account ${user.uid}
</details>

  `

  ui.value = async function connect() {
      const url = `wss://webcode.run/puppeteer?token=${await user.getIdToken()}`
      return await puppeteer_web.connect({
        browserWSEndpoint: url,
        ignoreHTTPSErrors: true
      });
    }
  return ui;
}
);
  main.variable(observer("connect")).define("connect", ["Generators", "viewof connect"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Taking a screenshot`
)});
  main.variable(observer("screenshot")).define("screenshot", ["runDemos","connect","htl"], async function(runDemos,connect,htl)
{
  runDemos;
  const browser = await connect();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com");
  const buffer = await page.screenshot();

  const imgBlob = new Blob([buffer], { type: "image/png" });
  const img = htl.html`<img width="400px" src=${URL.createObjectURL(imgBlob)}>`;

  browser.close(); // Usage based pricing! Close when not in use!!!
  return img;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Scraping the DOM`
)});
  main.variable(observer("scrapeDOM")).define("scrapeDOM", ["runDemos","connect","Inputs"], async function(runDemos,connect,Inputs)
{
  runDemos;
  const browser = await connect();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com");
  await page.waitForSelector(".titlelink");
  // Get the link to all the required books
  let links = await page.$$eval(".titlelink", (links) =>
    links.map((link, i) => ({
      rank: i + 1,
      href: link.href,
      title: link.innerHTML
    }))
  );

  browser.close(); // Usage based pricing! Close when not in use!!!
  return Inputs.table(links, {
    columns: ["rank", "title", "href"],
    layout: "auto"
  });
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Performance Tracing`
)});
  main.variable(observer()).define(["Plot","completeEvents"], function(Plot,completeEvents){return(
Plot.plot({
  y: {
    axis: null
  },
  marks: [
    Plot.barX(completeEvents,  {
      x1: "ts",
      x2: "te",
      y: "depth",
      fill: "#000",
    })
  ]
})
)});
  main.variable(observer("traceData")).define("traceData", ["runDemos","connect"], async function(runDemos,connect)
{
  runDemos
  const browser = await connect()
  const page = await browser.newPage();
  // Drag and drop this JSON file to the DevTools Performance panel!
  await page.tracing.start({categories: ['blink', 'cc', 'netlog', 'v8', 'sequence_manager', 'toplevel']});
  await page.goto('https://observablehq.com');
  const buffer = await page.tracing.stop();
  await browser.close();
  return buffer
}
);
  main.variable(observer()).define(["htl","traceData"], function(htl,traceData){return(
htl.html`


<a download="profile.json" href="${URL.createObjectURL(new Blob([JSON.stringify(JSON.parse(traceData))], {type: "application/json"}))}"> download profile data</a>
<p>Its compatible with <a href="https://chromedevtools.github.io/timeline-viewer/">timeline-viewer</a>
`
)});
  main.variable(observer("completeEvents")).define("completeEvents", ["traceData"], function(traceData)
{
  let depth = 0;
  return JSON.parse(traceData).traceEvents.reduce(
    (acc, evt) => {
      if (evt.ph === 'B') {
        depth++;
      } else if (evt.ph === 'E') {
        depth--;
      } else if (evt.ph === 'X') {
        acc.push({
          ...evt,
          te: evt.ts + evt.dur,
          depth: depth
        })
      }
      return acc;
    }
  , [])

}
);
  main.variable(observer("runDemos")).define("runDemos", ["htl","invalidation"], function(htl,invalidation){return(
htl.html`<a href="">`.href.startsWith('https://observablehq.com/@endpointservices/puppeteer') || invalidation
)});
  main.variable(observer("puppeteer_web")).define("puppeteer_web", ["require","FileAttachment"], async function(require,FileAttachment){return(
require(await FileAttachment("puppeteer-web-0.0.3.js").url())
)});
  const child1 = runtime.module(define1);
  main.import("view", child1);
  const child2 = runtime.module(define2);
  main.import("viewof user", child2);
  main.import("user", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}