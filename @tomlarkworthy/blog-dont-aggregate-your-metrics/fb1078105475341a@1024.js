import define1 from "./9e9b514f3656a16e@1255.js";
import define2 from "./bebff78c79e75160@549.js";
import define3 from "./0db772951ed2f762@153.js";
import define4 from "./dfdb38d5580b5c35@331.js";

function _title(html,md){return(
html`<div id="blogtitle" class=content>${
md`# BLOG: Don't aggregate your metrics
`}`
)}

function _2(md,metadata){return(
md`Live ${metadata.url}`
)}

function _metadata(content,string_to_slug){return(
{
  description:
    "Recently [Visnu Pitiyanuvath](https://twitter.com/visnup) of Observable presented how dataviz techniques can be applied to developer dashboards to improve insights. I followed his advice and it had a transformational effect on my work. Read why and how leaving metrics unaggregate can help drive optimizations.",
  notebook:
    'https://observablehq.com/@tomlarkworthy/blog-dont-aggregate-your-metrics',
  tags: ["article"],
  image:
    "https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/latency_events.png",
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

function _5(md,metadata){return(
md`# Social image

![](${metadata.image})`
)}

function _preview(deploy,page){return(
deploy("preview", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  return res.send(page)
})
)}

function _content(html,md){return(
html`<div class=content>${md`

Recently Visnu Pitiyanuvath of [Observable](observablehq.com) presented how [dataviz techniques can be applied to developer dashboards to improve insights](https://youtu.be/L_5vavklnVI). I followed his advice and it had a transformational effect on my work.

*(full talk is below but you don't need to watch it right now)*

<iframe width="560" height="315" src="https://www.youtube.com/embed/L_5vavklnVI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

 His talk emphasized that we often over aggregate metrics [[proof](https://youtu.be/L_5vavklnVI?t=1650)]. Indeed, most monitoring dashboards are time series of the mean, perhaps some percentiles, but a load of line graphs nonetheless.

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/grafana_lines.png)
*Typical Graphana dashboards are not good for building insight*


His message was to stop doing that, and just draw every single event, no aggregation into trendlines. Allow your visual system to notice patterns that would otherwise be invisible under aggregation. 

I was quite intrigued. The advice felt like the opposite of what the Google SRE book suggests, where SREs are encouraged to distill the system down to a small number of actionable graphs and precise SLO boundaries. (FWIW: I think the difference is SREs expect to be piloting a well-understood system whereas Visnu is advising how you can start to understand a poorly understood system).

Anyway, I was building a new system that had lots of weird performance quirks, so it was a great testbed to try out the techniques he suggested. 

### [Serverless Cells](https://observablehq.com/@endpointservices/serverless-cells)

The system I am developing executes observable notebooks in a serverless environment. It's multi-tenancy Puppeteer on Cloud Run. It potentially has multiple levels of cold starts, and I was interested in understanding the performance characteristic better.

   So I hacked together a [latency prober notebook](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor), which satisfyingly could utilize the serverless environment to implement, schedule, and execute the probes, as well as visualize the results.


### Data collection

The core latency measurement work is a cell named [timedRequest](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor#timedRequest) that wraps an HTTP call with a timer. Multiple calls to _timedRequest_ are made in the serverless-cell called [ping](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor#ping). In particular, for each region, every 30 minutes, two calls are made in quick succession, with the results saved to the Firebase Realtime Database. The first is tagged the "cold" call, and the second is tagged "warm".

~~~js
    async function ping(region) {
      const coldTime = readableTimestamp();
      const datapointCold = await timedRequest(region);
      baseRef.child(coldTime + region).set({
        tag: "cold",
        region,
        time: coldTime,
        ...datapointCold
      });
      const warmTime = readableTimestamp();
      const datapointWarm = await timedRequest(region);
      await baseRef.child(warmTime + region).set({
        tag: "warm",
        region,
        time: warmTime,
        ...datapointWarm
      });
    }
~~~

Scheduling the work every 30 mins is achieved with a [cron](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor#schedule). I let the cron kick off latency work executed in europe-east1 which probes 3 **different** regions, *europe-east4*, *us-central1* and *asia-east1*. 

One would hope the latency between europe-east1 and europe-east4 would be the lowest, but of course, our stack is complicated and might route traffic to US, so that was the motivation for the regions chosen.

### Visualisation

Visnu suggested using [Vega-lite (JS API)](https://vega.github.io/vega-lite-api/) and Observable together as a good pairing for quick dashboards. Wow, he was 100% right on how easy it was to draw and refine a decent graph containing all the measurement points read (in realtime) from Realtime Database.

The following code ([source](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor#eventGraph)) produces the main workhorse of the dashboard. Every latency measurement is plotted, X is time, Y is latency. And each point is color-coded by the response code and whether it was warm or cold measurement. 

The visualization includes the ability to hover over individual data points to get the raw data written in a tooltip, which makes localizing the precise time incredibly easy for heading to the system logs.

Here is the full code for building the main dashboard:

~~~js
vl
  .layer([
    vl.markCircle({ size: 100, tooltip: { content: "data" } })
      .data(samples)
      .transform([
        vl.calculate("datum.tag + '/' + datum.status").as("type/status")
      ])
      .encode(
        vl.x().fieldT("time"),
        vl.y()
          .fieldQ("ms")
          .scale({ type: 'log' })
          .axis({
            title: "latency (ms)"
          }),
        vl.color().fieldN("type/status")
      ),
    vl
      .markRule()
      .data(events)
      .encode(vl.x().fieldT("time"))
  ])
  .render()
~~~

### Immediate results - Thundering Hurd Issues

Within 24 hours I had observed my first performance glitch. A cluster of measurements with a constellation of response codes occurring at nearly the same time.

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/latency_spike_1.jpeg)

It turned out the system had a bug in its pool mechanism. The intent was that requests to the same notebook would reuse the underlying puppeteer instance. Unfortunately, the pool was not populated until AFTER the instance started. So if _n_  requests came in the system would exhaust its resources booting up n puppeteer instances and generally go bananas. It was a one-line fix

![image](https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/cache_fix.jpeg)
 
### Chasing down the long tail

After fixing the first set of obvious problems, the focus turned to issues in the long tail. We had several unexpectedly long performance measurements. Requests taking longer than 5 minutes, for a service with a timeout of 20 seconds! What the hell?

In the following graph, you can see on the far left a period where some requests took an impossibly long time. The graph is segmented into intervals where we tried out a different fix. 

![eventGraph](https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/latency_events.png)

We first noted that the latencies were beyond the timeout setting for Cloud Run. We noted that the Cloud Run severs the client connection at the timeout setting, and freezes the container. But, the express handler continues to run after the container is unfrozen *for unrelated subsequent requests*.

The fix was to detect and end the long-running processes explicitly (see [commit](https://github.com/endpointservices/webcode.run/commit/42d2865cb976659415bf2400e6c82621e040bfa9)).

However, we then saw a reduction in the number of warm latency measurements. Now that the 20s timeout was truly respected, the latency prober ran out of time to gather the 2nd datapoint. So the 2nd adjustment was to bump the deadline to 60 seconds.

After that fix, it seems to work at first, but latency measurements crept up over time. This turned out to be a problem with the measurement system, not the infra. Each latency prober boots up the latency measurement notebook, which queries the measurement history. 

So, the problem is that the Realtime Database will pause when large quantities of data arrive. If that happens in the middle of a latency measurement, then that measurement is stretched *proportional to the amount of data in the system*. This is why it was trending upwards over time. It's also why some data points are not affected and many are but by a similar magnitude even though they are readings for different regions!

Figuring out that last bug was quite tricky. I ended up running the serverless env locally and step debugging. I ended up pausing during a latency measurement for several minutes, causing a massive spike in latency! But that was just me debugging.

So after adding some logic so that the cron job never loads the dashboard pointlessly:-

~~~js
if (!getContext().serverless) ...
~~~

We were finally back where we were but with no crazy long tails! We were often recording warm latencies below 1s! 

![eventGraph](https://storage.googleapis.com/publicartifacts/blogimages/blog-dont-aggregate-your-metrics/latency_events.png)

Open questions remain. We are seeing more 429 from us-central1 despite it being our least loaded region. And also latency is lower in us-central1 when it should be lowest in europe-west4, indicating our traffic is pointless being routed to the US somewhere (Firebase Hosting origin is only in US).

### [Visnu](https://twitter.com/visnup) was right

The main point of this dashboard was to see if plotting individual measurements was better than aggregated trend lines. My conclusion: **absolutely**.

Many of the trickier issues were only diagnosed because we could see strange unexpected correlations across groups. Or very precise synchronizations in time. Or problems that affected only a small number of data points. 

Aggregation would have washed out those details! I am a convert. **Never aggregate**! 

---

_Its also cool you can host an end-to-end latency prober system in a single notebook, if you want to build your own you can fork [mine](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor)_


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
  main.variable(observer()).define(["md","metadata"], _5);
  main.variable(observer("preview")).define("preview", ["deploy","page"], _preview);
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
