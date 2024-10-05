// https://observablehq.com/@tomlarkworthy/bitcoin-energy@422
import define1 from "./17567518d319e006@159.js";
import define2 from "./c7a3b20cec5d4dd9@725.js";
import define3 from "./62ef64b34c6a3b20@50.js";
import define4 from "./bb2055d580bbbab2@106.js";

async function _1(md,tweet,FileAttachment){return(
md`# Bitcoin Energy Use

Some people think Bitcoin is an ecological disaster:

${tweet("1350869944888664064")}

Other people think the ecological case is overblown ([HN](https://news.ycombinator.com/item?id=25881088))

![](${await FileAttachment("image@3.png").url()})

I feel the root of the problem is scale. How much electricity does Bitcoin burn, relative to how much electricity in general we have?
`
)}

async function _2(md,FileAttachment){return(
md`## Hash Rate over time

The network hashrate is how much computation is being performed and is a recorded publically on the blockchain.

![](${await FileAttachment("image.png").url()})

source: https://www.blockchain.com/charts/hash-rate
`
)}

async function _hashrate(d3,FileAttachment,moment){return(
d3.csvParse(await FileAttachment("hash-rate.csv").text()).map(row => ({
  date: moment(row.Timestamp).toDate(),
  th_per_sec: row['hash-rate']
})).filter(row => row.date > new Date("2015-01-01T00:00"))
)}

function _4(md){return(
md`## ASIC Efficiency over time

We can look at existing hardware specs to see how fast we can hash/mine at a given point in time.

source: https://www.asicminervalue.com/`
)}

async function _asicminervaluetable(FileAttachment){return(
(await FileAttachment("asicminervalue.com").text()).match(
  /(<table[\s\S]*<\/table>)/
)[1]
)}

function _asic_history(tableExtractor,d3,asicminervaluetable,ThPerSec,Watts,moment){return(
tableExtractor(d3.create("div").html(asicminervaluetable)).map(row => ({...row, th_per_sec_per_watt: ThPerSec(row.Hashrate) / Watts(row.Power), date: new Date(moment(row.Release).toDate())}))
)}

function _best_asic_history(asic_history){return(
asic_history.sort((a,b) => a.date - b.date).reduce(
  (acc, row) => {
    if (row.th_per_sec_per_watt > acc.best_th_per_sec_per_watt) {
      acc.best_th_per_sec_per_watt = row.th_per_sec_per_watt;
      acc.history.push(row);
    }
    return acc;
  },
  {
    history: [],
    best_th_per_sec_per_watt: 0
  }
).history
)}

function _8(vega,best_asic_history,width){return(
vega({
  data: {values: best_asic_history},
  width,
  height: 500,
  autosize: "fit",
  mark: "line",
  encoding: {
    x: {"field": "Release", "type": "temporal"},
    y: {"field": "th_per_sec_per_watt", "type": "quantitative"}
  }
})
)}

function _best_th_per_sec_per_watt_at(best_asic_history){return(
(date) => {
  return best_asic_history.slice().reverse().find(row => row.date < date).th_per_sec_per_watt
}
)}

function _10(md){return(
md`## Minimum Energy Usage over time

If we use the most effecient ASIC technology to mine the recorded hashrate, we can see the minimum energy spend
`
)}

function _power_over_time(hashrate,best_th_per_sec_per_watt_at){return(
hashrate.map(row => {
  const best_th_per_sec_per_watt = best_th_per_sec_per_watt_at(row.date);
  const min_watts = row.th_per_sec / best_th_per_sec_per_watt;
  return {
    ...row,
    best_th_per_sec_per_watt,
    min_watts,
    TWh: min_watts * 60 * 60 * 1.0E-12
  };
})
)}

function _12(vega,power_over_time,width){return(
vega({
  data: {values: power_over_time},
  width,
  height: 500,
  autosize: "fit",
  mark: "line",
  encoding: {
    x: {"field": "date", "type": "temporal"},
    y: {"field": "TWh", "type": "quantitative"}
  }
})
)}

async function _13(md,FileAttachment){return(
md`# Realistic Energy usage

The above graph assumes all the miners are using the best hardware available to satsify the hash rate. In the paper:

*"Bitcoin’s energy consumption is underestimated: A market dynamics approach"* -- **Alexde Vries**
https://www.sciencedirect.com/science/article/abs/pii/S2214629620302966?via%3Dihub

Vries tries to estimate the inneffeciency leading to estimate of 87.1 TWh of electrical energy annually on September, 2019 (so about 10x the optimal rate).

[Statista](https://www.statista.com/statistics/881472/worldwide-bitcoin-energy-consumption/#:~:text=Global%20Bitcoin%20energy%20consumption%202017%2D2020&text=As%20of%20November%202020%2C%20Bitcoin,76.87%20terawatt%20hours%20per%20year) estiamtes energy leveling off at 80TWh

![](${await FileAttachment("image@2.png").url()})


# Worldwide Electricity usage

So bitcoin is using somewhere in the region on 80TWh to 160TWh. Is that a lot?

![](${await FileAttachment("image@1.png").url()})

World wide energy consumption for *everything* is in the order of 22kTWh, thus Bitcoin is around 0.4% - 0.7% of worldwide consumption.

Given Bitcoin contributes nothing in my life, and electricity a lot, I think Bitcoin usage is way too high for the niche collection of people it is used by.

`
)}

function _ThPerSec(){return(
(hashrate) => {
  if (hashrate.endsWith('Th/s')) {
    return parseFloat(hashrate.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0])
  } else if (hashrate.endsWith('Gh/s')) {
    return parseFloat(hashrate.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0]) * 1e-3
  } else if (hashrate.endsWith('Mh/s')) {
    return parseFloat(hashrate.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0]) * 1e-6
  } else if (hashrate.endsWith('ksol/s')) {
    return parseFloat(hashrate.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0]) * 1e-9
  } else if (hashrate.endsWith('h/s')) {
    return parseFloat(hashrate.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0]) * 1e-12
  }
  throw new Error("Unrecognised unit " + hashrate)
}
)}

function _ThPerSecTests(createSuite){return(
createSuite()
)}

function _ThPerSecTestCase(ThPerSecTests,expect,ThPerSec){return(
function ThPerSecTestCase(input, expected) {
  return ThPerSecTests.test(`${input} is ${expected}TH/s`, () => {
    expect(ThPerSec(input)).toBe(expected)
  })
}
)}

function _Watts(hashrate){return(
(power) => {
  if (power.endsWith('W')) {
    return parseFloat(power.match(/^([+-]?([0-9]*[.])?[0-9]+)/)[0])
  }
  throw new Error("Unrecognised unit " + hashrate)
}
)}

function _18(ThPerSecTestCase){return(
ThPerSecTestCase("6.6Th/s", 6.6)
)}

function _19(ThPerSecTestCase){return(
ThPerSecTestCase("1Gh/s", 0.001)
)}

function _20(ThPerSecTestCase){return(
ThPerSecTestCase("12Mh/s", 0.000012)
)}

function _21(ThPerSecTests,asic_history,ThPerSec){return(
ThPerSecTests.test(`All Hashrate of asic_history can be converted to Th/s`, () => {
  asic_history.map(row => ThPerSec(row.Hashrate))
})
)}

function _22(ThPerSecTests,asic_history,Watts){return(
ThPerSecTests.test(`All Power of asic_history can be converted to W`, () => {
  asic_history.map(row => Watts(row.Power))
})
)}

function _d3(require){return(
require("d3@6")
)}

function _moment(require){return(
require('moment')
)}

function _vega(require){return(
require("@observablehq/vega-lite@0.1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/2483c6491952bca60c65225590ddb6ea69c6a15646a322d6b065ddeddecd5786da8b511d561da059116bf0c94e4edb8eaf8b36e02fc7e57dcad6c8a414fe9cd8.png", import.meta.url), mimeType: "image/png", toString}],
    ["hash-rate.csv", {url: new URL("./files/74ef8a5037252b0e5300bc3d447a4ce6242b98d05966b3ee2aba11d1ed8d025cccbc73bafec0964ee8f18091fa24af152f13fa8936af6edd5d2d42c973a603b6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["asicminervalue.com", {url: new URL("./files/8f9b2a9d23c2d290c3b33e5c4fdff7a261c6ca6e7d39ac3ecdc5d99d17371e5ed91f05fa0e43c0c81b47ae44eb61ccf1a8048cb52b73101c53c2ac84db146dc4.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["image@1.png", {url: new URL("./files/8a17878bbb953af3f83795874f6704920c6f17ae1f71bc54567e28ed5d9e66bccdac2a18728b15b32f461b3e41eacb274521b4bd058200ea17c8aa739d5d92a9.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/8a1fdf29a9ba75a0f2ddb8969a47831c6c32acb81b345f396cbcafa529c7714abdc306617bc2926523617fbc90763c6aac660f07d179f787396433149eb320c0.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/6e95d601c0ed231fb82c2f23a01d991424760b32d7ce37399580466840a61d9280619499a253ed86d54cade940e51c638be3bd563f8833ea1109117b36a52797.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","tweet","FileAttachment"], _1);
  main.variable(observer()).define(["md","FileAttachment"], _2);
  main.variable(observer("hashrate")).define("hashrate", ["d3","FileAttachment","moment"], _hashrate);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("asicminervaluetable")).define("asicminervaluetable", ["FileAttachment"], _asicminervaluetable);
  main.variable(observer("asic_history")).define("asic_history", ["tableExtractor","d3","asicminervaluetable","ThPerSec","Watts","moment"], _asic_history);
  main.variable(observer("best_asic_history")).define("best_asic_history", ["asic_history"], _best_asic_history);
  main.variable(observer()).define(["vega","best_asic_history","width"], _8);
  main.variable(observer("best_th_per_sec_per_watt_at")).define("best_th_per_sec_per_watt_at", ["best_asic_history"], _best_th_per_sec_per_watt_at);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("power_over_time")).define("power_over_time", ["hashrate","best_th_per_sec_per_watt_at"], _power_over_time);
  main.variable(observer()).define(["vega","power_over_time","width"], _12);
  main.variable(observer()).define(["md","FileAttachment"], _13);
  main.variable(observer("ThPerSec")).define("ThPerSec", _ThPerSec);
  main.variable(observer("viewof ThPerSecTests")).define("viewof ThPerSecTests", ["createSuite"], _ThPerSecTests);
  main.variable(observer("ThPerSecTests")).define("ThPerSecTests", ["Generators", "viewof ThPerSecTests"], (G, _) => G.input(_));
  main.variable(observer("ThPerSecTestCase")).define("ThPerSecTestCase", ["ThPerSecTests","expect","ThPerSec"], _ThPerSecTestCase);
  main.variable(observer("Watts")).define("Watts", ["hashrate"], _Watts);
  main.variable(observer()).define(["ThPerSecTestCase"], _18);
  main.variable(observer()).define(["ThPerSecTestCase"], _19);
  main.variable(observer()).define(["ThPerSecTestCase"], _20);
  main.variable(observer()).define(["ThPerSecTests","asic_history","ThPerSec"], _21);
  main.variable(observer()).define(["ThPerSecTests","asic_history","Watts"], _22);
  const child1 = runtime.module(define1);
  main.import("tableExtractor", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child2 = runtime.module(define2);
  main.import("createSuite", child2);
  main.import("expect", child2);
  const child3 = runtime.module(define3);
  main.import("timeSeries", child3);
  main.variable(observer("moment")).define("moment", ["require"], _moment);
  main.variable(observer("vega")).define("vega", ["require"], _vega);
  const child4 = runtime.module(define4);
  main.import("tweet", child4);
  return main;
}
