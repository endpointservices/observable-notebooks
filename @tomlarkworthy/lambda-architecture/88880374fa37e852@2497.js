// https://observablehq.com/@tomlarkworthy/lambda-architecture@2497
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./0e0b35a92c819d94@474.js";
import define3 from "./357f1a71f976f173@1035.js";
import define4 from "./0b75dbddd18995dc@1761.js";
import define5 from "./ac2d8dc9041d3373@100.js";
import define6 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Building a SMART FARM EP05: Lambda Architecture
`
)}

function _2(md){return(
md`So far our SMART FARM has data storage provided by Firebase ([EP01](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07)), and it is actively ingesting data from real farms in Colombia using Blues Wireless cellular connection ([EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14)). We are able to send dashboards to field workers on-demand using WhatsApp ([EP03](https://observablehq.com/@tomlarkworthy/dashboards-over-whatsapp)). Last time in ([EP04](https://observablehq.com/@tomlarkworthy/firebase-to-duckdb?collection=@tomlarkworthy/livecoding)) we calculated the *Growing Degree Days* (GDD) using DuckDB SQL but it could only look back a few days before exhausting memory constraints.

In this episode, we take our prototyped GDD calculations and make them work in realtime over large time ranges by precomputation. We functionify our previous dataflow based calculation logic with a flowQueue. With a function frontend, we can automate precomputing daily totals of GDD for all our sensors.

With GDD precomputed over our reading history, we can utilize the lambda architecture to combine batch data with realtime data. So now we can view GDD over a month time range *and still have the latest realtime data included*. Somewhat amazingly, we have achieved this entirely within a web browser`
)}

function _3(md){return(
md`## Full episode`
)}

function _4(width,videoStartAt,htl){return(
htl.html`<iframe width="${Math.min(width, 640)}" height="350" src="https://www.youtube.com/embed/AqzgVQ2S14U?start=${videoStartAt}&autoplay=${videoStartAt > 10 ? 1 : 0}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>`
)}

function _videoStartAt(Inputs){return(
Inputs.select(
  new Map([
    ["recap", 1],
    ["what analytics are useful to growers?", 45],
    ["Tarot of the day", 180],
    ["Review of Growing Degrees Calculation in DuckDB SQL (EP04)", 290],
    ["functionification", 1270],
    ["lambda architecture", 2205]
  ]),
  {
    label: "Jump to a location of interest"
  }
)
)}

function _6(md){return(
md`### Realtime data over a large timeranges

This plot is a realtime view of the Growing Degree Days of some of our sensors. It would not be possible to draw this quickly if we summed all the sensor data over the time range. Instead, we precompute some daily aggregates and combine the pre-aggregated data to the latest streamed realtime data to be able to query a large timerange yet still have the latest data represented. Combining pre-aggregated 'batch' data with realtime 'streaming' data is known as a [lambda architectue](https://en.wikipedia.org/wiki/Lambda_architecture).
`
)}

function _7(Plot,historical,latestData){return(
Plot.plot({
  color: {
    legend: true
  },
  y: {
    domain: [0, 24]
  },
  x: {
    type: "time"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(historical.concat(latestData), {
      x: "timestamp",
      y: "gdd",
      stroke: "device"
    })
  ]
})
)}

function _8(md){return(
md`### Historical GDD

Our historical data is pulled pre-aggregated from "aggregations/GDD". We precompute these aggregates later on in the notebook. `
)}

function _historyRaw(db){return(
new Promise((resolve) =>
  db.ref("aggregations/GDD").once("value", (snap) => resolve(snap.val()))
)
)}

function _historical(historyRaw)
{
  const data = [];
  Object.entries(historyRaw).map(([device, readings]) => [
    device,
    Object.entries(readings).forEach(([timestamp, gdd]) => {
      if (typeof gdd === "number")
        data.push({
          device,
          timestamp: new Date(timestamp * 1000),
          gdd
        });
    })
  ]);
  return data;
}


function _11(md){return(
md`### Realtime data

Our latest data is streamed from \`history/sensors/dev:864475046458393\`, we are only getting data for one sensor for this simple demo.`
)}

function _todaySeconds(){return(
new Date(new Date().toISOString().substring(0, 10)).getTime() /
  1000
)}

function _latestDataRaw(Generators,reset,db,todaySeconds,invalidation){return(
Generators.observe((notify) => {
  reset;
  const dataset = (this && this.dataset) || [];
  const dataHandler = (snapshot) => {
    debugger;
    const data = snapshot.val();
    console.log(data);
    if (data.body.temperature) {
      dataset.push(data);
      notify({
        dataset,
        row: data
      });
    }
  };
  const ref = db
    .ref(`history/sensors/dev:864475046458393`)
    .orderByKey()
    .startAt(todaySeconds + "");

  ref.on("child_added", dataHandler);

  invalidation.then(() => {
    dataset.length = 0;
    ref.off("child_added", dataHandler);
  });
})
)}

function _14(md){return(
md`We need to compute the GDD from the sensor samples. Ideally, we would reuse the SQL query used in the historical aggregation, as that was adaptive to missing data. But for simplicity we just assume each sample is 15 minutes and compute it with code. In production I would spend a little bit more time here to properly reuse the SQL query so any changes are reflected on both sides of the lambda architecture.`
)}

function _latestDataGdd(latestDataRaw){return(
latestDataRaw.dataset
  .map((entry) => ({
    device: entry.device,
    timestamp: new Date(entry.when * 1000),
    temperature: entry.body.temperature
  }))
  .reduce(
    (gdd, row) =>
      gdd + (row.temperature > 5 && row.temperature < 25 ? 0.25 : 0),
    0
  )
)}

function _latestData(todaySeconds,latestDataGdd){return(
[
  {
    device: "dev:864475046458393",
    timestamp: new Date(todaySeconds * 1000),
    gdd: latestDataGdd
  }
]
)}

function _17(md){return(
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

function _21(md){return(
md`## (EP02) Live Temperature Dashboard

Setup in [EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14). This is 24 hour window of latest sensor readings. The green band represents the growth zone for the plant. Most sensors are sending data every 15 minutes which will be reflected in the dashboard automatically.`
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

function _24(md){return(
md`### streaming query (realtime updates)`
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

function _29(md){return(
md`## (EP04) DuckDB

Setup in [EP04](https://observablehq.com/@tomlarkworthy/firebase-to-duckdb?collection=@tomlarkworthy/livecoding). We use DuckDB so we can execute SQL within a web browser using Observable awesome SQL cells. For our SMART farm we calculated "growing degree days" (GDD)`
)}

function _duckdb(prepareAggregation,reset,DuckDBClient){return(
prepareAggregation, reset, new DuckDBClient()
)}

function _32(md){return(
md`By making a second reference to a common duckdb client, we can use the first reference to populate the tables, and refresh the 2nd whenever we received new data and need to recompute our SQL cell analytic queries. `
)}

function _fullduck(doInsertRowToDuckDB,duckdb)
{
  // Refresh fullduck every insertion (causes analytics to be rerun)
  doInsertRowToDuckDB;
  return duckdb;
}


function _34(md){return(
md`### (EP04) Workflow QoL
The reset button allows us to reset the state and perform the data loading from scratch. *Extremely* useful during development.`
)}

function _reset(){return(
0
)}

function _36(Inputs,$0){return(
Inputs.button("reset", { reduce: () => $0.value++ })
)}

function _37(md){return(
md`### (EP04) Inserting Data to DuckDB

For each document sent to the flow queue we execute a SQL INSERT statement to fill DuckDB`
)}

async function _doCreateTable(reset,duckdb)
{
  reset;
  await duckdb.query(`DROP TABLE IF EXISTS readings`);
  return duckdb.query(
    `CREATE TABLE IF NOT EXISTS readings(sensor STRING, time TIMESTAMP, temperature FLOAT)`
  );
}


function _firebaseRow(prepareAggregation,flowQueue){return(
prepareAggregation,
flowQueue({
  timeout_ms: 10000000
})
)}

function _40(firebaseRow){return(
firebaseRow
)}

function _doInsertRowToDuckDB(doCreateTable,firebaseRow,duckdb)
{
  doCreateTable;
  if (firebaseRow === null) return;
  return duckdb.query(
    `INSERT INTO readings VALUES ('${firebaseRow.device}', '${new Date(
      (firebaseRow.when || firebaseRow.tower_when) * 1000
    ).toISOString()}', ${firebaseRow.body.temperature});`
  );
}


function _finishInsert(doInsertRowToDuckDB,$0)
{
  doInsertRowToDuckDB; // Finsih processing everytime we insert a row
  $0.resolve();
}


function _43(md){return(
md`### (EP04) Computing Grow Degree Days (GDD) in DuckDB`
)}

function _aggregation(startTimeIso,endTimeIso,__query,fullduck,invalidation){return(
__query.sql(fullduck,invalidation,"fullduck")`SELECT sensor, CAST(SUM(EXTRACT(epoch from growthDuration)) AS FLOAT) / (60 * 60) as growthHours
FROM (SELECT *, CASE WHEN isGrowth THEN duration ELSE INTERVAL 0 seconds END growthDuration 
  FROM (
    SELECT sensor, startTime, endTime, avgTemperature, endTime - startTime as duration, temperature > 5 AND temperature < 25 AS isGrowth 
      FROM (
      SELECT sensor, time, temperature, 
          AVG(temperature) OVER lookback avgTemperature,
          MIN(time) OVER lookback startTime,
          MAX(time) OVER lookback endTime
      FROM readings
      WHERE time > ${startTimeIso} AND time < ${endTimeIso}
      WINDOW lookback AS (
        ORDER BY "time"
        ROWS 1 PRECEDING)
      ORDER BY time
    )
  )
  ) GROUP BY sensor`
)}

function _45(md){return(
md`## EP05 Functionification of daily GDD 

We took the EP04 calculations which were written in the notebook dataflow style and wrapped them in a function so we can more easily reuse the work. We created a function called \`aggregate(day, sensor)\` which computes the GDD for a day for a given sensor and writes it into \`"aggregations/GDD"\`. 

To aid in understanding the dataflow, we open the notebook dataflow debugger:`
)}

function _ndd(_ndd){return(
_ndd
)}

function _48(Inputs,querySensorName,aggregate){return(
Inputs.button(`Aggregate ${querySensorName} on 2022-07-05`, {
  reduce: () => aggregate("2022-07-05", querySensorName)
})
)}

function _49(md){return(
md`The aggregate functions forwards to a \`flowQueue\`, which allows us to package up dataflow.`
)}

function _aggregate($0){return(
(targetDay, sensor) =>
  $0.send({
    targetDay,
    sensor
  })
)}

function _aggregationRequest(reset,flowQueue){return(
reset,
flowQueue({
  timeout_ms: 10000000
})
)}

function _52(md){return(
md`The head of the queue contains the aggregation request parameters:`
)}

function _53(aggregationRequest){return(
aggregationRequest
)}

function _startTime(aggregationRequest){return(
new Date(aggregationRequest.targetDay)
)}

function _startTimeIso(startTime){return(
startTime.toISOString()
)}

function _endTime(startTime){return(
new Date(startTime.getTime() + 60 * 60 * 24 * 1000)
)}

function _endTimeIso(endTime){return(
endTime.toISOString()
)}

function _58(md){return(
md`We first query the sensor data from \`history/sensors/{sensor}\` from Firebase with a "once" query`
)}

function _aggregationSensorDataRaw(db,aggregationRequest,startTime,endTime){return(
new Promise((resolve) => {
  db.ref(`history/sensors/${aggregationRequest.sensor}`)
    .orderByKey()
    .startAt(startTime.getTime() / 1000 + "")
    .endAt(endTime.getTime() / 1000 + "")
    .once("value", (snap) => resolve(snap.val()));
})
)}

function _60(md){return(
md`We massage it into [tidy data](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html) form in a follow up cell`
)}

function _aggregationSensorData(aggregationSensorDataRaw){return(
aggregationSensorDataRaw
  ? Object.entries(aggregationSensorDataRaw)
      .filter(([k, v]) => v.body.temperature)
      .map(([k, v]) => v)
  : []
)}

function _62(md){return(
md`We reset DuckDB state before inserting data`
)}

function _prepareAggregation(aggregationSensorData)
{
  aggregationSensorData;
}


function _64(md){return(
md`Our insert cell does not resolve until all data is inserted thanks to the \`Promise.all\``
)}

async function _insertIntoDb(prepareAggregation,doCreateTable,aggregationSensorData,$0)
{
  prepareAggregation;
  doCreateTable; // ensure DuckDB is reset and tables recreated
  if (aggregationSensorData.length === 0) {
    $0.send(null);
  } else {
    return await Promise.all(
      aggregationSensorData.map((data) => $0.send(data))
    );
  }
}


function _66(md){return(
md`We can directly retrieve the value of the SQL cell after all data has been inserted, which in our case, is computing the GDD growthHours`
)}

function _growthHoursAggregation(insertIntoDb,aggregation)
{
  insertIntoDb; // dataflow link to do after insertion
  return aggregation[0]?.growthHours || 0;
}


function _68(md){return(
md`After computing the growthHours we insert it back into Firebase at \`/aggregations/GDD/\`as a batch precomputation. Our lambda architecture will read this precomputed data to save time for the realtime graphs. `
)}

async function _writeAggregation(firebase,db,aggregationRequest,startTime,growthHoursAggregation)
{
  await firebase.auth().signInAnonymously();
  return db
    .ref(
      `/aggregations/GDD/${aggregationRequest.sensor}/${
        startTime.getTime() / 1000
      }`
    )
    .set(growthHoursAggregation);
}


function _70(md){return(
md`After writing to Firebase we can consider the aggregation task complete, we return the growthHours as the 'return' value`
)}

function _returnResultToFlowQueue(writeAggregation,$0,growthHoursAggregation)
{
  writeAggregation;
  return $0.resolve(growthHoursAggregation);
}


function _72(md){return(
md`### Orchestrating aggregate

Now that aggregation has a function interface, it is more easily reused. We can create an aggregateAll function that applies aggregate to several sensors, and we can write a backfill function that calls aggregate over many days, for example.

In the future, we will want to schedule aggregate with a [cron](https://observablehq.com/@endpointservices/cron).

What we have now is enough to demonstrate the performance gains of the lambda architecture. For a bit of fun, checkout the notebook dataflow debugger after pressing backfill button)`
)}

function _73(Inputs,aggregateAll){return(
Inputs.button(`aggregateAll("2022-07-02")`, {
  reduce: () => aggregateAll("2022-07-02")
})
)}

function _aggregateAll(aggregate){return(
function aggregateAll(day) {
  return Promise.all(
    [
      "dev:864475046458393",
      "dev:864475046461397",
      "dev:864475046554399"
    ].map((device) => aggregate(day, device))
  );
}
)}

function _75(Inputs,aggregateAll){return(
Inputs.button("backfill", {
  reduce: async () => {
    for (let i = 22; i <= 26; i++) {
      await aggregateAll(`2022-07-${(i < 10 ? "0" : "") + i}`);
    }
  }
})
)}

function _76(width,md){return(
md`## Tarot of the Day
*Will our vlog "building a smart farm" help with future heat waves in the united states?*

<a target="_blank" href="https://thetarot.online/-N6n9gDvUEeH_7tKXMLz"><img 
width=${Math.min(width, 640)}                                                                         src="https://storage.googleapis.com/download/storage/v1/b/larkworthy-dfb11.appspot.com/o/@tomlarkworthy%2Ftarot-backend%2Fimages%2F-N6n9gDvUEeH_7tKXMLz?generation=1657642077175681&alt=media">
</img></a>

`
)}

function _77(md){return(
md`## Next episode`
)}

function _78(upcoming){return(
upcoming
)}

function _79(md){return(
md`## Dependancies`
)}

function _82(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["width","videoStartAt","htl"], _4);
  main.variable(observer("viewof videoStartAt")).define("viewof videoStartAt", ["Inputs"], _videoStartAt);
  main.variable(observer("videoStartAt")).define("videoStartAt", ["Generators", "viewof videoStartAt"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","historical","latestData"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("historyRaw")).define("historyRaw", ["db"], _historyRaw);
  main.variable(observer("historical")).define("historical", ["historyRaw"], _historical);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("todaySeconds")).define("todaySeconds", _todaySeconds);
  main.variable(observer("latestDataRaw")).define("latestDataRaw", ["Generators","reset","db","todaySeconds","invalidation"], _latestDataRaw);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("latestDataGdd")).define("latestDataGdd", ["latestDataRaw"], _latestDataGdd);
  main.variable(observer("latestData")).define("latestData", ["todaySeconds","latestDataGdd"], _latestData);
  main.variable(observer()).define(["md"], _17);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs","latest"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer("dashboard")).define("dashboard", ["Plot","liveView"], _dashboard);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  main.variable(observer("latest")).define("latest", ["Generators","db"], _latest);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer()).define(["md"], _29);
  const child3 = runtime.module(define3);
  main.import("DuckDBClient", child3);
  main.variable(observer("duckdb")).define("duckdb", ["prepareAggregation","reset","DuckDBClient"], _duckdb);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("fullduck")).define("fullduck", ["doInsertRowToDuckDB","duckdb"], _fullduck);
  main.variable(observer()).define(["md"], _34);
  main.define("initial reset", _reset);
  main.variable(observer("mutable reset")).define("mutable reset", ["Mutable", "initial reset"], (M, _) => new M(_));
  main.variable(observer("reset")).define("reset", ["mutable reset"], _ => _.generator);
  main.variable(observer()).define(["Inputs","mutable reset"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("doCreateTable")).define("doCreateTable", ["reset","duckdb"], _doCreateTable);
  main.variable(observer("viewof firebaseRow")).define("viewof firebaseRow", ["prepareAggregation","flowQueue"], _firebaseRow);
  main.variable(observer("firebaseRow")).define("firebaseRow", ["Generators", "viewof firebaseRow"], (G, _) => G.input(_));
  main.variable(observer()).define(["firebaseRow"], _40);
  main.variable(observer("doInsertRowToDuckDB")).define("doInsertRowToDuckDB", ["doCreateTable","firebaseRow","duckdb"], _doInsertRowToDuckDB);
  main.variable(observer("finishInsert")).define("finishInsert", ["doInsertRowToDuckDB","viewof firebaseRow"], _finishInsert);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("aggregation")).define("aggregation", ["startTimeIso","endTimeIso","__query","fullduck","invalidation"], _aggregation);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("ndd")).define("ndd", ["_ndd"], _ndd);
  const child4 = runtime.module(define4);
  main.import("_ndd", child4);
  main.variable(observer()).define(["Inputs","querySensorName","aggregate"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("aggregate")).define("aggregate", ["viewof aggregationRequest"], _aggregate);
  main.variable(observer("viewof aggregationRequest")).define("viewof aggregationRequest", ["reset","flowQueue"], _aggregationRequest);
  main.variable(observer("aggregationRequest")).define("aggregationRequest", ["Generators", "viewof aggregationRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["aggregationRequest"], _53);
  main.variable(observer("startTime")).define("startTime", ["aggregationRequest"], _startTime);
  main.variable(observer("startTimeIso")).define("startTimeIso", ["startTime"], _startTimeIso);
  main.variable(observer("endTime")).define("endTime", ["startTime"], _endTime);
  main.variable(observer("endTimeIso")).define("endTimeIso", ["endTime"], _endTimeIso);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer("aggregationSensorDataRaw")).define("aggregationSensorDataRaw", ["db","aggregationRequest","startTime","endTime"], _aggregationSensorDataRaw);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("aggregationSensorData")).define("aggregationSensorData", ["aggregationSensorDataRaw"], _aggregationSensorData);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("prepareAggregation")).define("prepareAggregation", ["aggregationSensorData"], _prepareAggregation);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("insertIntoDb")).define("insertIntoDb", ["prepareAggregation","doCreateTable","aggregationSensorData","viewof firebaseRow"], _insertIntoDb);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer("growthHoursAggregation")).define("growthHoursAggregation", ["insertIntoDb","aggregation"], _growthHoursAggregation);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer("writeAggregation")).define("writeAggregation", ["firebase","db","aggregationRequest","startTime","growthHoursAggregation"], _writeAggregation);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("returnResultToFlowQueue")).define("returnResultToFlowQueue", ["writeAggregation","viewof aggregationRequest","growthHoursAggregation"], _returnResultToFlowQueue);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer()).define(["Inputs","aggregateAll"], _73);
  main.variable(observer("aggregateAll")).define("aggregateAll", ["aggregate"], _aggregateAll);
  main.variable(observer()).define(["Inputs","aggregateAll"], _75);
  main.variable(observer()).define(["width","md"], _76);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer()).define(["upcoming"], _78);
  main.variable(observer()).define(["md"], _79);
  const child5 = runtime.module(define5);
  main.import("upcoming", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _82);
  return main;
}
