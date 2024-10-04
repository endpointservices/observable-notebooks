// https://observablehq.com/@tomlarkworthy/productionization@2766
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./6eda90668ae03044@836.js";
import define3 from "./a81f2a20664080d3@243.js";
import define4 from "./ac2d8dc9041d3373@100.js";
import define5 from "./58f3eb7334551ae6@211.js";

function _1(md){return(
md`# Building a SMART FARM EP06: Productionization (custom domain, error monitoring)
`
)}

function _2(md){return(
md`So far our SMART FARM has data storage provided by Firebase ([EP01](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07)), and it is actively ingesting data from real farms in Colombia using Blues Wireless cellular connection ([EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14)). We are able to send dashboards to field workers on-demand using WhatsApp ([EP03](https://observablehq.com/@tomlarkworthy/dashboards-over-whatsapp)). Last time in ([EP04](https://observablehq.com/@tomlarkworthy/firebase-to-duckdb?collection=@tomlarkworthy/livecoding)) we calculated the *Growing Degree Days* (GDD) using DuckDB SQL and optimized it with a lambda architecture in ([EP05](https://observablehq.com/@tomlarkworthy/lambda-architecture))

In this episode, we cover some generic topics required to take an Observable based application into production. From scratch, we register a custom domain with [Netlify](https://netlify.com/) and serve a custom interactive dashboard of our production data in under 30 minutes! Later we walkthrough how to monitor our user sessions for unexpected errors using [Sentry](https://sentry.io/) and then how to continuously monitor a notebook for errors using [healthcheck](https://observablehq.com/@endpointservices/healthcheck) and [uptimerobot](https://uptimerobot.com/?rid=ea2c825277fe40).`
)}

function _3(md){return(
md`## Full episode
<small>Sorry the video stream lags in the last half, the audio is good though, I am working on a fix for the video long term!</small>`
)}

function _4(width,videoStartAt,htl){return(
htl.html`<iframe width="${Math.min(width, 640)}" height="350" src="https://www.youtube.com/embed/G9R-_x_MO4U?start=${videoStartAt}&autoplay=${videoStartAt > 10 ? 1 : 0}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>`
)}

function _5(videoStartAt){return(
videoStartAt
)}

function _videoStartAt(Inputs){return(
Inputs.select(
  new Map([
    ["Start", 1],
    ["Updates from TechHub Live (AgTech conference)", 30],
    ["Simple embedding", 550],
    ["Serving a website", 670],
    ["Whitelabelled Custom embedding", 828],
    ["Custom Domain (Netlify)", 1165],
    ["Performance tips", 1738],
    ["Error Monitoring (Sentry)", 2044],
    ["Active Monitoring (healthcheck + uptimerobot)", 2558],
    ["Next steps", 3323]
  ]),
  {
    label: "Jump to a location of interest"
  }
)
)}

function _7(md){return(
md`## (EP01) Firebase Database
Setup in [EP01](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07)`
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyA9OQ--0Sn8Gm6C1B4M-SbnxRMtKHgnHzs",
  authDomain: "agropatterns-iot.firebaseapp.com",
  databaseURL: "https://agropatterns-iot-default-rtdb.firebaseio.com",
  projectId: "agropatterns-iot",
  appId: "1:650132950601:web:115b1ba65750d2b0aaf998",
  uiConfig: {
    // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["anonymous"]
  }
}
)}

function _db(firebase){return(
firebase.database()
)}

function _11(md){return(
md`## (EP02) Live Temperature Dashboard

Setup in [EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14). This is 24 hour window of latest sensor readings. The green band represents the growth zone for the plant. Most sensors are sending data every 15 minutes which will be reflected in the dashboard automatically.`
)}

function _12(md){return(
md`### (EP02) streaming query (realtime updates)`
)}

function _liveViewRaw(Generators,db,querySensorName){return(
Generators.observe((notify) => {
  db.ref(`history/sensors/${querySensorName}`)
    .orderByKey()
    .startAt(Math.floor(Date.now() / 1000 - 60 * 60 * 24) + "") // reduce data returned
    .on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) notify(data);
    });
})
)}

function _liveView(liveViewRaw){return(
Object.entries(liveViewRaw).map(([k, v]) => v)
)}

function _latest(Generators,db){return(
Generators.observe((notify) => {
  db.ref(`current/sensors`).once("value", (snapshot) => {
    const data = snapshot.val();
    // clear synthetic data from EP01 testings
    delete data["sensor2"];
    delete data["defaultSensorName"];
    notify(data);
  });
})
)}

function _16(md){return(
md`### (EP02) Interactive live data Dashboard`
)}

function _querySensorName(Inputs,latest){return(
Inputs.select(Object.keys(latest), {
  label: "Choose sensor to chart",
  value: "dev:864475046458393"
})
)}

function _dashboard(Plot,liveView){return(
Plot.plot({
  x: { type: "time" },
  y: { domain: [0, 40], label: "Temperature" },
  color: {
    domain: [0, 40],
    scheme: "turbo"
  },
  marks: [
    Plot.rect([{}], { fill: "#F4BFA6", y1: 25, y2: 40 }),
    Plot.rect([{}], { fill: "#A7D3A6", y1: 5, y2: 25 }),
    Plot.rect([{}], { fill: "#A4B5E3", y1: 0, y2: 5 }),
    Plot.ruleY([20], { stroke: "#0003", strokeDasharray: [5] }),
    Plot.lineY(
      liveView.filter((d) => d.body.temperature), // Fix for unfiltering data serverside
      {
        stroke: "#0003",
        x: (d) => new Date(d.when * 1000),
        y: (d) => d.body.temperature
      }
    ),
    Plot.dot(
      liveView.filter((d) => d.body.temperature), // Fix for unfiltering data serverside
      {
        r: 5,
        x: (d) => new Date(d.when * 1000),
        y: (d) => d.body.temperature,
        fill: (d) => d.body.temperature
      }
    )
  ]
})
)}

function _19(md){return(
md`## Custom Webpage Server`
)}

function _21(endpoint,sensor_page){return(
endpoint("website", async (req, res) => {
  res.send(sensor_page.outerHTML);
})
)}

function _22(md){return(
md`### Custom webpage source (in a HTML cell)`
)}

function _sensor_page(htl){return(
htl.html`<head>
</head>
<body> 
  <h1>Agropatterns V2</h1>
  <h2>Sensor page</h2>
  <div id="errorButton"></div>
  <div id="chooser"></div>
  <div id="dashboard"></div>
<script type="module">
  import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
  import notebook from "https://api.observablehq.com/@tomlarkworthy/productionization.js?v=3";
  new Runtime().module(notebook, name => {
    if (name === "dashboard") {
      return new Inspector(document.querySelector("#dashboard"));
    } else if (name === "viewof querySensorName") {
      return new Inspector(document.querySelector("#chooser"));
    } else if (name === "viewof errorButton") {
      return new Inspector(document.querySelector("#errorButton"));
    } else if (name === "mySentry") {
      return true
    }
  });
</script>
</body>`
)}

function _25(md){return(
md`## Custom Domain

We registered a domain through netlify, the created a site that simply redirects to our custom webserver endpoint. We use Netlify's GitOps workflow to update the site, our only file is the *netlify.toml* that configures Netlify as a reverse proxy, find ours [here](https://github.com/tomlarkworthy/QAFaLWyJ/blob/main/netlify.toml)

After configuring netlify, our custom domain points to our custom dashboard: [https://qafalwyj.com/](https://qafalwyj.com/)

Links to further resources
- [Advanced Observablehq embedding](https://observablehq.com/@observablehq/advanced-embeds?collection=@observablehq/embed-trail)
- [Custom domain in 4 lines-of-code](https://dev.to/tomlarkworthy/custom-domain-in-4loc-l6f)`
)}

function _26(md){return(
md`## Monitoring with Sentry

After Sentry is installed, any errors thrown will be reported to the Sentry dashboard. It is important you test the integration! You can do this by executing \`throw new Error("test")\` in the console. Remeber if you are using a custom domain, it needs to be allowlisted in the \`'namespaces'\` configuration.

You find the DSN number after creating a sentry Javascript project.`
)}

function _mySentry(sentry)
{
  console.log("sentry has been setup");
  return sentry({
    DSN:
      "https://a6079bd15b7c405bb6346e95a44f3ee8@o1335620.ingest.sentry.io/6603442",
    namespaces: ["tomlarkworthy", /* IMPORTANT */ "qafalwyj.com"]
  });
}


function _29(md){return(
md`## Active Monitoring with Healthcheck + Uptimerobot

With [\`healthceck\`](https://observablehq.com/@endpointservices/healthcheck) notebook, you can ask it to run a different notebook and detect errors. When you have that setup the check can be exported as a URL. You can then monitor that URL using off-the-shelf monitoring software like [uptimerobot](https://uptimerobot.com/?rid=ea2c825277fe40).

So if we have a known error:`
)}

function _errorCell()
{
  throw new Error("Known error");
}


function _31(md){return(
md`Calling the URL ['@endpointservices/healthcheck?target=%40tomlarkworthy%2Fproductionization&wait=5'](https://webcode.run/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Fproductionization&wait=5) will detect the error and return a 503 status check.

By plugging that URL into [uptimerobot.com](https://uptimerobot.com/?rid=ea2c825277fe40) we can check for errors every 5 minutes or so and be alerted if errors are raised. `
)}

function _32(md){return(
md`## Next episode`
)}

function _33(upcoming){return(
upcoming
)}

function _34(md){return(
md`## Dependancies`
)}

function _37(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["width","videoStartAt","htl"], _4);
  main.variable(observer()).define(["videoStartAt"], _5);
  main.variable(observer("viewof videoStartAt")).define("viewof videoStartAt", ["Inputs"], _videoStartAt);
  main.variable(observer("videoStartAt")).define("videoStartAt", ["Generators", "viewof videoStartAt"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  main.variable(observer("latest")).define("latest", ["Generators","db"], _latest);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs","latest"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer("dashboard")).define("dashboard", ["Plot","liveView"], _dashboard);
  main.variable(observer()).define(["md"], _19);
  const child2 = runtime.module(define2);
  main.import("endpoint", child2);
  main.variable(observer()).define(["endpoint","sensor_page"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("sensor_page")).define("sensor_page", ["htl"], _sensor_page);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  const child3 = runtime.module(define3);
  main.import("sentry", child3);
  main.variable(observer("mySentry")).define("mySentry", ["sentry"], _mySentry);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("errorCell")).define("errorCell", _errorCell);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["upcoming"], _33);
  main.variable(observer()).define(["md"], _34);
  const child4 = runtime.module(define4);
  main.import("upcoming", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _37);
  return main;
}
