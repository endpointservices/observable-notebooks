import define1 from "./10c7899865f8a76e@8998.js";
import define2 from "./f109935193c0deba@4551.js";
import define3 from "./8381f40adb144e29@52.js";
import define4 from "./010725e8849f52d0@816.js";

function _1(md){return(
md`# Unaggregating Cloud Watch Metrics


[Visnu Pitiyanuvath](https://observablehq.com/@visnup) of Observable advocates _"never aggregate your datapoints"_. The outliers _are_ the signal! His talk made me realize that we, the developer community, could do better, *especially* the Cloud providers. `
)}

function _2(htl){return(
htl.html`<details><summary>The "DataViz Dashboards for Developers" talk that inspired me</summary>
<lite-youtube videoid="L_5vavklnVI" playlabel="DataViz Dashboards for Developers"></lite-youtube>
</details>`
)}

function _3(md){return(
md`

Ever since that talk my heart sinks when I assemble a Cloud Watch dashboard. Yes, they work and are useful, but why are they just _lines_?... after some though I realized that, well, maybe they do not need to be? 

Maybe there is a way to take _Visnu_'s lessons and apply them to my day-to-day work. Can we invert Cloud Watch metrics back to something close to the original unaggregated datapoints? Turns out, YES WE CAN!`
)}

function _4(md){return(
md`## My Uninspiring Cloud Watch Dashboard`
)}

async function _5(FileAttachment,htl){return(
htl.html`<img style="width: 640px"  alt="image@2.png" src="${await FileAttachment("image@2.png").url()}">`
)}

function _6(md){return(
md`## The same data after unaggregating it`
)}

function _synthetic_example(Plot,resampled,foreground){return(
Plot.plot({
  width: 640,
  height: 300,
  marginLeft: 50,
  marks: [
    Plot.dot(resampled, {
      x: "time",
      y: "value",
      r: 3,
      fill: foreground,
      opacity: 0.1
    })
    // Plot.dot(tidy_data, {
    //   x: "time",
    //   y: "avg",
    //   r: 3,
    //   fill: "red"
    // })
  ]
})
)}

function _animate(Inputs){return(
Inputs.toggle({
  label: "resample",
  value: false
})
)}

function _9(md){return(
md`Thats the same data source that displays the Cloud Watch metric above. LOOK AT THE DETAILS. I can see that just before 12pm, traffic stopped, and then there was pent up demand unleashed at 12pm. You _cannot_ see traffic volume in the Cloud Watch chart of latency! I can also see that the biggest outlier is over 20 seconds! Again I can't usually see that in Cloud Watch. THERE IS SO MUCH MAGNIFISCENT DETAIL REVEALED.

It's the same metric! That detail was there, you just have to visualize it.`
)}

function _10(md){return(
md`## How it works

A Cloud Watch metric precisely tracks the _max_, _min_, _count_ and _sum_ into temporal bins ([AWS docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Statistics-definitions.html)). The main idea is to use those statitics to generate something close to the real dataset.

If the sample count in a bin is 1, 2 or 3, you know all the values *exactly*, that's essentially unaggregated points. If you have more than 4 points in a bin, you still know 2 of those points exactly (the min and max), plus you know how many more points there are. We use sampling to regenerate the remaining points, using the statistics to estimate of the skewness. That's what produce the above graph.

Is it accurate though?`
)}

function _11(md){return(
md`## Ground truth`
)}

function _12(md){return(
md`

I have the real datapoints (below) gathered from logs. There are some differences between the unaggregated data and the ground truth data. The ground truth shows a stronger floor latency distribution. But still, the unaggregated graph did a pretty amazing job at representing the real distribution. Its shocking to me that this level of detail was already present in my existing Cloud Watch metrics.`
)}

function _ground_truth(Plot,truth,foreground){return(
Plot.plot({
  width: 640,
  height: 300,
  marginLeft: 50,
  x: {
    type: "time"
  },
  marks: [
    Plot.dot(truth, {
      x: "time",
      y: "value",
      r: 3,
      fill: foreground,
      opacity: 0.1
    })
  ]
})
)}

function _14(md){return(
md`## ⚠️ High throughput Metrics

For metric streams under 1 request per second, Cloud Watch metrics streams do not lose much detail because their 4 dimensional statistics are nearly enough to represent the raw dataset in 5 second bins. At higher rates though the synthetically sampled data dominates and obscures.`
)}

function _15(md){return(
md`---`
)}

function _16(md){return(
md`Original blog on [Observablehq](https://observablehq.com/@tomlarkworthy/unaggregating-cloudwatch-metrics). Exported to a hermetic local-first form with [Lopecode](https://github.com/tomlarkworthy/lopecode)`
)}

function _17(exporter){return(
exporter()
)}

function _18(md){return(
md`### Appendix: Data`
)}

function _19(md){return(
md`<details><summary>Boto3 call to collect the Metric Data</summary>
  ${md`
~~~python
import boto3
import json
PERIOD = 60  # seconds

cw = boto3.client('cloudwatch', region_name='eu-central-1')

metric = {
    "Namespace": "Taktile",
    "MetricName": "latency",
    "Dimensions": [
        {"Name":"path","Value":"..."},
        {"Name":"method","Value":"POST"},
        {"Name":"status","Value":"200"},
    ]
}

resp = cw.get_metric_data(
    MetricDataQueries=[
        {
            "Id": "min",
            "MetricStat": {
                "Metric": metric,
                "Period": PERIOD,
                "Stat": "Minimum",
            },
            "ReturnData": True,
        },
        {
            "Id": "max",
            "MetricStat": {
                "Metric": metric,
                "Period": PERIOD,
                "Stat": "Maximum",
            },
            "ReturnData": True,
        },
        {
            "Id": "sum",
            "MetricStat": {
                "Metric": metric,
                "Period": PERIOD,
                "Stat": "Sum",
            },
            "ReturnData": True,
        },
        {
            "Id": "count",
            "MetricStat": {
                "Metric": metric,
                "Period": PERIOD,
                "Stat": "SampleCount",
            },
            "ReturnData": True,
        }
    ],
    StartTime="2025-12-03T20:43Z",
    EndTime="2025-12-04T20:43Z",
)

print(json.dumps(resp, indent=2, default=str))
~~~`}
  
</details>
`
)}

function _data(FileAttachment){return(
FileAttachment("data@4.json").json()
)}

function _tidy_data(data)
{
  const byTime = new Map();
  const idToField = {
    min: "min",
    max: "max",
    sum: "sum",
    count: "count"
  };
  for (const { Id, Timestamps = [], Values = [] } of data.MetricDataResults) {
    const field = idToField[Id];
    if (!field) continue;
    for (let i = 0; i < Timestamps.length; i++) {
      const t = new Date(Timestamps[i]);
      const key = t.getTime();
      let entry = byTime.get(key);
      if (!entry) {
        entry = { time: t };
        byTime.set(key, entry);
      }
      entry[field] = Values[i];
    }
  }
  return Array.from(byTime.values()).sort((a, b) => a.time - b.time);
}


function* _resampled(animate,generateSyntheticFromStats,tidy_data)
{
  while (animate) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateSyntheticFromStats(tidy_data, { periodMs: 60_000 }));
      }, 200);
    });
  }
  yield generateSyntheticFromStats(tidy_data, { periodMs: 60_000 });
}


async function _truth(FileAttachment){return(
(await FileAttachment("logs-insights-results (27)@1.csv").csv()).map(
  (d) => ({
    time: new Date(d["@timestamp"]).getTime(),
    value: Number.parseInt(d.integration_latency)
  })
)
)}

function _24(md){return(
md`### Appendix: Code`
)}

function _generateSyntheticFromStats(sampleFairFromStats){return(
(
  rows,
  { periodMs = 60000, rng = Math.random } = {}
) => {
  const all = [];
  for (const d of rows ?? []) {
    if (!d || !d.time) continue;

    const bin = [];
    const count = Math.max(1, Math.round(d.count ?? 1));
    const t0 = d.time.getTime();
    const t1 = t0 + periodMs;

    const randTime = () => new Date(t0 + rng() * (t1 - t0));
    const push = (v) => {
      if (v == null || !Number.isFinite(v)) return;
      bin.push({ time: randTime(), value: v, bucketTime: d.time });
    };

    const min = d.min ?? d.avg ?? d.max ?? 0;
    const max = d.max ?? d.avg ?? d.min ?? min;
    const sum =
      d.sum != null && Number.isFinite(d.sum)
        ? d.sum
        : d.avg != null && Number.isFinite(d.avg)
        ? d.avg * count
        : ((min + max) / 2) * count;

    if (count === 1) {
      push(min);
    } else if (count === 2) {
      push(min);
      push(max);
    } else if (count === 3) {
      const mean = sum / count;
      push(min);
      push(mean);
      push(max);
    } else if (count === 4) {
      const innerSum = sum - min - max;
      const mid = innerSum / 2;
      push(min);
      push(mid);
      push(mid);
      push(max);
    } else {
      let remaining = count;
      push(min);
      push(max);
      remaining -= 2;
      for (let i = 0; i < remaining; i++) {
        push(sampleFairFromStats([d.min, d.max, d.sum, d.count]));
      }
    }

    all.push(...bin);
  }
  return all;
}
)}

function _sampleFairFromStats(){return(
([min, max, sum, count], rng = Math.random) => {
  const a = min;
  const b = max;
  if (
    a == null ||
    b == null ||
    !Number.isFinite(a) ||
    !Number.isFinite(b) ||
    a === b
  )
    return a ?? b ?? 0;
  const n = Math.max(1, count ?? 1);
  const mean = sum != null && Number.isFinite(sum) ? sum / n : (a + b) / 2;
  if (!Number.isFinite(mean) || mean <= a || mean >= b)
    return a + rng() * (b - a);
  const Fm = (mean - a) / (b - a);
  const u = rng();
  if (u < Fm) {
    return a + Math.sqrt(u * (b - a) * (mean - a));
  } else {
    return b - Math.sqrt((1 - u) * (b - a) * (b - mean));
  }
}
)}

function _unzip(Response,DecompressionStream){return(
async (attachment) =>
  await new Response(
    (await attachment.stream()).pipeThrough(new DecompressionStream("gzip"))
  ).blob()
)}

function _foreground(getComputedStyle)
{
  const styles = getComputedStyle(document.body);
  return styles.getPropertyValue("--theme-foreground").trim() || "black";
}


function _background(getComputedStyle)
{
  const styles = getComputedStyle(document.body);
  return styles.getPropertyValue("--theme-background").trim() || "black";
}


function _30(md){return(
md`### Appendix: developer tools`
)}

function _32(robocoop){return(
robocoop
)}

function _34(lite_youtube_css){return(
lite_youtube_css
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@2.png", {url: new URL("./files/6718c84577234c69aca9260072ece1c6e12b7db6771ff4e4bff1794face216993740abf0cf643732fa41493cc4e16a768401487225a75c9af9dfb352dce74332.png", import.meta.url), mimeType: "image/png", toString}],
    ["data@4.json", {url: new URL("./files/b4aecb7f7da3614f7c43042e343a14064a2591b65b236c9cdf0632f4953482101613f656d8f3a2e23436e55c17b47b8e370b4cb376756a4b1cebb38cf47707dc.json", import.meta.url), mimeType: "application/json", toString}],
    ["logs-insights-results (27)@1.csv", {url: new URL("./files/796451bd6a37e846c1dfdc05ae8f6183403366b64feec9039d51ef545696dc9a877f290330e74a5513882e6ac79991942eb5c9ad26f0ba577a82589bd99273f2.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["FileAttachment","htl"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("synthetic_example")).define("synthetic_example", ["Plot","resampled","foreground"], _synthetic_example);
  main.variable(observer("viewof animate")).define("viewof animate", ["Inputs"], _animate);
  main.variable(observer("animate")).define("animate", ["Generators", "viewof animate"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("ground_truth")).define("ground_truth", ["Plot","truth","foreground"], _ground_truth);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["exporter"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("tidy_data")).define("tidy_data", ["data"], _tidy_data);
  main.variable(observer("resampled")).define("resampled", ["animate","generateSyntheticFromStats","tidy_data"], _resampled);
  main.variable(observer("truth")).define("truth", ["FileAttachment"], _truth);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("generateSyntheticFromStats")).define("generateSyntheticFromStats", ["sampleFairFromStats"], _generateSyntheticFromStats);
  main.variable(observer("sampleFairFromStats")).define("sampleFairFromStats", _sampleFairFromStats);
  main.variable(observer("unzip")).define("unzip", ["Response","DecompressionStream"], _unzip);
  main.variable(observer("foreground")).define("foreground", ["getComputedStyle"], _foreground);
  main.variable(observer("background")).define("background", ["getComputedStyle"], _background);
  main.variable(observer()).define(["md"], _30);
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  main.variable(observer()).define(["robocoop"], _32);
  const child2 = runtime.module(define2);
  main.import("robocoop", child2);
  main.variable(observer()).define(["lite_youtube_css"], _34);
  const child3 = runtime.module(define3);
  main.import("lite_youtube_css", child3);
  const child4 = runtime.module(define4);
  main.import("md", child4);
  return main;
}
