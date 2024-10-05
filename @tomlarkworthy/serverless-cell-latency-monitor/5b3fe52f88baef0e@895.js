// https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor@895
import define1 from "./7764a40fe6b83ca1@437.js";
import define2 from "./851cd068c9c12ade@887.js";
import define3 from "./11a5ab8b1b3a51db@1161.js";
import define4 from "./dff1e917c89f5e76@1964.js";
import define5 from "./698257e86fae4586@378.js";
import define6 from "./629be1812462d083@415.js";
import define7 from "./993a0c51ef1175ea@1396.js";
import define8 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Realtime [Serverless Cell](https://observablehq.com/@endpointservices/serverless-cells) Latency Monitor`
)}

function _events(){return(
[
  {
    time: "2022-08-24T22:00",
    desc: "us-central1 and eu-west4 min-instances changed from 1 to 0"
  },
  {
    time: "2021-11-13T15:00",
    desc:
      "Increased key resolution to millis not seconds to fix lost cold measurements"
  },
  {
    time: "2021-09-30T13:00",
    desc: "Enabled page reuse for echo-server"
  },
  {
    time: "2021-08-26T05:35",
    desc:
      "Fix performance regression (null dynamic config results were not cached properly, causing fetches every request, attemp #2: fb6f4a731c737145e29d4a66f4fcb858639736e3)"
  },
  {
    time: "2021-08-25T21:00",
    desc:
      "Fix performance regression (null dynamic config results were not cached properly, causing fetches every request, fb6f4a731c737145e29d4a66f4fcb858639736e3)"
  },
  {
    time: "2021-08-25T20:39",
    desc:
      "Emergency rollout after realizing a config change had broken the current deployment (further workflow improvements)"
  },
  {
    time: "2021-08-25T16:00",
    desc: "Cleanup of old permissions"
  },
  {
    time: "2021-08-23T18:30",
    desc:
      "New version of SC loads additional config via Firestore for realtime updates"
  },
  {
    time: "2021-08-07T07:00",
    desc:
      "New version of SC loads config dynamically, causes asia-east1 not to warm until 3 requests"
  },
  {
    time: "2021-05-18T09:03",
    desc:
      "Switch to https://webcode.run as host (Google Cloud HTTPS load balancer)"
  },
  {
    time: "2021-04-27T22:00",
    desc:
      "us-central1: CPU 4 -> 2, RAM 4Gb -> 2Gb, min instances 0 -> 1, eu-west4: RAM 4Gb -> 2Gb"
  },
  {
    time: "2021-04-25T22:00",
    desc: "eu-west4: CPU 4 -> 2, min instances 0 -> 1"
  },
  {
    time: "2021-03-29T04:00",
    desc: "Force page close when request hungup, killing zombie handlers"
  },
  {
    time: "2021-04-02T04:00",
    desc: "Increase response deadline from 20s to 60s "
  },
  {
    time: "2021-04-06T20:00",
    desc: "Debugger paused execution to profile measurement workers"
  },
  {
    time: "2021-04-07T00:00",
    desc: "Perf fix: workers do not download dataset"
  }
].sort((a, b) => b.time.localeCompare(a.time))
)}

function _3(md,events){return(
md`## Labelled events

${events.map(e => `- ${e.time}, ${e.desc}`).join('\n')}
`
)}

function _4(md){return(
md`### Other notes
asia-east uses 3% of its 2GB memory budget for each additional chrome browser. => 62MiB per pupeteer shard
`
)}

function _start(Inputs){return(
Inputs.text({
  value: new Date().toISOString()
})
)}

function _DAYS_AGO(Inputs){return(
Inputs.range([0, 14], {
  value: 3,
  label: "DAYS lookback",
  step: 1
})
)}

function _eventGraph(vl,samples,events,startRange,start){return(
vl
  .layer([
    vl
      .markCircle({ size: 10, opacity: 0.5, tooltip: { content: "data" } })
      .data(samples)
      .transform([
        // vl.filter(`datum.region == 'europe-west4'`),
        vl.calculate("datum.tag + '/' + datum.status").as("type/status")
      ])
      .encode(
        vl.x().fieldT("time"),
        vl.y().fieldQ("ms").scale({ type: "log" }).axis({
          title: "latency (ms)"
        }),
        vl.color().fieldN("type/status")
      ),
    vl
      .markRule()
      .data(
        events.filter(
          (x) =>
            new Date(x.time) > startRange && new Date(x.time) < new Date(start)
        )
      )
      .encode(vl.x().fieldT("time")),

    vl
      .markRule()
      .data([new Date()]) // Draw now as well to keep the x axis extended
      .encode(vl.x().fieldT("time"))
  ])
  .render()
)}

function _8(vl,samples,regions){return(
vl
  .data(samples)
  .transform([vl.filter("datum.status == 200 && datum.ms < 20000")])
  .vconcat(
    regions.map(region =>
      vl
        .data()
        .title(
          "Round trip latency to " + region + " as measure from europe-west1"
        )
        .transform([vl.filter(`datum.region == '${region}'`)])
        .hconcat([
          vl
            .markBar({ tooltip: true })
            .transform([vl.filter("datum.tag == 'warm'")])
            .encode(
              vl
                .x()
                .fieldQ("ms")
                .axis({
                  title: "latency (ms)"
                })
                .scale({ domain: [0, 20000] })
                .bin({
                  step: 500
                }),
              vl
                .y()
                .aggregate('count')
                .axis({
                  title: "# WARM(200) samples"
                })
            ),

          vl
            .markBar({ tooltip: true })
            .transform([vl.filter("datum.tag == 'cold'")])
            .encode(
              vl
                .x()
                .fieldQ("ms")
                .axis({
                  title: "latency (ms)"
                })
                .scale({ domain: [0, 20000] })
                .bin({
                  step: 500
                }),
              vl
                .y()
                .aggregate('count')
                .axis({
                  title: "# COLD(200) samples"
                })
            )
        ])
    )
  )
  .render()
)}

function _9(md){return(
md`
This is a self contained notebook that is:
- a [realtime dashboard](#dashboard) of the cold and warm latency measurements and http status codes
- a latency measuring serverside [data gathering](data_gathering) endpoint.
- a periodic [scheduler](#scheduler) (for the above).

Notebook uses the [Firebase Realtime Database](#storage)(Free tier) with public read access, and a [serverless cell](https://observablehq.com/@endpointservices/serverless-cells) to with privileged write access (so its tamper proof). All implemented without leaving the Notebook environment in the browser. 😎

This graph will help me measure performance and reliability improvements.

Samples are collected every 30 mins, but you can generate some now if you want...`
)}

function _10(html,ping){return(
html`<button onclick=${() => fetch(ping.href)}>Generate a datum</button>`
)}

function _11(md){return(
md`### Raw data`
)}

function _12(Table,samples){return(
Table(samples, {
  sort: "time",
  reverse: true,
  columns: ["time", "region", "tag", "status", "ms"]
})
)}

function _samples(samplesRaw)
{
  const samples = samplesRaw.map((d) => ({
    ...d,
    time: d.time.replace("_", ".")
  }));
  samples.reverse();
  return samples;
}


function _samplesRaw(getContext,listen,baseRef,readableTimestamp,startRange,start){return(
getContext().serverless
  ? []
  : listen(
      baseRef
        .orderByKey()
        .startAt(readableTimestamp(startRange))
        .endAt(readableTimestamp(new Date(start))),
      {
        includeId: true
      }
    )
)}

function _data_gathering(md){return(
md`## Data gathering`
)}

function _targetURL(){return(
destination =>
  `https://webcode.run/regions/${destination}/observablehq.com/@tomlarkworthy/echo-server;echo`
)}

function _timedRequest(targetURL){return(
async function timedRequest(destination) {
  const start = window.performance.now();
  const response = await fetch(targetURL(destination), {
    method: "POST",
    body: `${window.performance.now()}`
  });
  response.text(); // ensure request closed
  const delta = window.performance.now() - start;
  return {
    status: response.status,
    ms: delta
  };
}
)}

function _22(md){return(
md`### Regional Ping`
)}

function _regions(){return(
["us-central1", "europe-west4", "asia-east1"]
)}

function _ping(deploy,readableTimestamp,timedRequest,baseRef,getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,regions){return(
deploy(
  `ping`,
  async (req, res, ctx) => {
    async function ping(region) {
      const coldTime = readableTimestamp();
      const datapointCold = await timedRequest(region);
      await baseRef.child(coldTime + region).set({
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

    try {
      const token = await getAccessTokenFromServiceAccount(
        ctx.secrets["tomlarkworthy_webadmin_service_account_key"]
      );
      await signinWithAccessToken(firebase, token);
      await Promise.all(regions.map(ping));
      res.json("OK");
    } catch (err) {
      return res.json(err.message);
    }
  },
  {
    region: "europe-west1", // Run pinger in an unrelated 4th test region
    secrets: ["tomlarkworthy_webadmin_service_account_key"]
  }
)
)}

function _scheduler(md){return(
md`## Scheduler`
)}

function _schedule(createCron,ping){return(
createCron({
  name: "pinger",
  enabled: true,
  schedule: '*/30 * * * *',
  url: ping.href
})
)}

function _storage(md){return(
md`## Data storage`
)}

function _baseRef(firebase){return(
firebase
  .database()
  .ref("@tomlarkworthy/serverless-cell-latency-monitor/data")
)}

function _firebaseConfig(){return(
{
    apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
    authDomain: "larkworthy-dfb11.firebaseapp.com",
    databaseURL: "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "larkworthy-dfb11",
    appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _33(md){return(
md`## Utils`
)}

function _readableTimestamp(){return(
(date = new Date()) => date.toISOString().replace(".", "_")
)}

function _startRange(DAYS_AGO,start)
{
  const daysAgo = DAYS_AGO;
  var time = new Date(start);
  time.setTime(time.getTime() - daysAgo * 24 * 3600000);
  return time;
}


function _37(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("events")).define("events", _events);
  main.variable(observer()).define(["md","events"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof start")).define("viewof start", ["Inputs"], _start);
  main.variable(observer("start")).define("start", ["Generators", "viewof start"], (G, _) => G.input(_));
  main.variable(observer("viewof DAYS_AGO")).define("viewof DAYS_AGO", ["Inputs"], _DAYS_AGO);
  main.variable(observer("DAYS_AGO")).define("DAYS_AGO", ["Generators", "viewof DAYS_AGO"], (G, _) => G.input(_));
  main.variable(observer("eventGraph")).define("eventGraph", ["vl","samples","events","startRange","start"], _eventGraph);
  main.variable(observer()).define(["vl","samples","regions"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["html","ping"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["Table","samples"], _12);
  main.variable(observer("samples")).define("samples", ["samplesRaw"], _samples);
  main.variable(observer("samplesRaw")).define("samplesRaw", ["getContext","listen","baseRef","readableTimestamp","startRange","start"], _samplesRaw);
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  const child2 = runtime.module(define2);
  main.import("Table", child2);
  const child3 = runtime.module(define3);
  main.import("html", child3);
  main.variable(observer("data_gathering")).define("data_gathering", ["md"], _data_gathering);
  main.variable(observer("targetURL")).define("targetURL", _targetURL);
  main.variable(observer("timedRequest")).define("timedRequest", ["targetURL"], _timedRequest);
  const child4 = runtime.module(define4);
  main.import("deploy", child4);
  main.import("getContext", child4);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("regions")).define("regions", _regions);
  main.variable(observer("ping")).define("ping", ["deploy","readableTimestamp","timedRequest","baseRef","getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","regions"], _ping);
  const child5 = runtime.module(define5);
  main.import("signinWithAccessToken", child5);
  main.import("getAccessTokenFromServiceAccount", child5);
  main.variable(observer("scheduler")).define("scheduler", ["md"], _scheduler);
  const child6 = runtime.module(define6);
  main.import("createCron", child6);
  main.variable(observer("schedule")).define("schedule", ["createCron","ping"], _schedule);
  main.variable(observer("storage")).define("storage", ["md"], _storage);
  const child7 = runtime.module(define7).derive(["firebaseConfig"], main);
  main.import("firebase", child7);
  main.import("listen", child7);
  main.variable(observer("baseRef")).define("baseRef", ["firebase"], _baseRef);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("readableTimestamp")).define("readableTimestamp", _readableTimestamp);
  main.variable(observer("startRange")).define("startRange", ["DAYS_AGO","start"], _startRange);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _37);
  return main;
}
