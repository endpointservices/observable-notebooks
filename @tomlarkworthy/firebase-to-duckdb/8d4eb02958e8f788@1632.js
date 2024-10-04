// https://observablehq.com/@tomlarkworthy/firebase-to-duckdb@1632
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./0e0b35a92c819d94@444.js";
import define3 from "./357f1a71f976f173@1034.js";
import define4 from "./ac2d8dc9041d3373@100.js";
import define5 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Building a SMART FARM EP04: Firebase to DuckDB SQL
`
)}

function _2(md){return(
md`So far our SMART FARM has data storage provided by Firebase ([EP01](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07)), and it is actively ingesting data from real farms in Colombia using Blues Wireless cellular connection ([EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14)). We are able to send dashboards to field workers on-demand using WhatsApp ([EP03](https://observablehq.com/@tomlarkworthy/dashboards-over-whatsapp)). Now we wish to produce KPI's relevant to the industry, in our case the *Growing Degree Days* (GDD) which is a measure of plant maturation based on temperature over time.

Firebase is not a good fit for data analytics, so we will stream our data into [DuckDB-WASM](https://duckdb.org/2021/10/29/duckdb-wasm.html) so we can do SQL inside the browser, in realtime.

I learnt a lot of tricks by making this notebook
- Throwing away a DuckDB client and recreating it is more memory efficient than dropping tables and recreating them.
- Creating custom workflow, like a button to reset the state of the notebook, has massive ROI
- Using a flowQueue is *great* for development of streaming pipelines, if a bug is encountered, the flow is interrupted and you can fix in-place and the streaming continues because of the cell memoization.
- You can configure dataflow to refresh your SQL views when new data arrives, giving you a realtime SQL view.`
)}

function _3(md){return(
md`## Full episode`
)}

function _4(width,videoStartAt,htl){return(
htl.html`<iframe width="${Math.min(width, 640)}" height="350" src="https://www.youtube.com/embed/VtNK9-kZ-Ys?start=${videoStartAt}&autoplay=${videoStartAt > 10 ? 1 : 0}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>`
)}

function _videoStartAt(Inputs){return(
Inputs.select(
  new Map([
    ["recap", 9],
    ["what analytics are useful to growers?", 45],
    ["setting up DuckDB", 375],
    ["Streaming firebase into DuckDB using flowQueue", 565],
    ["Setting up a reset button", 1180],
    ["Calculating growth days witb SQL cells", 1507],
    ["Using SQL Window function to extract intervals", 1755],
    ["Expanding with lookback window (Out of Memory Error!)", 2784],
    ["Writing back the computations into Firebase", 2940],
    ["Next steps, batch + realtime Lambda Architecture", 3070]
  ]),
  {
    label: "Jump to a location of interest"
  }
)
)}

function _6(md){return(
md`## Firebase Database
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

function _10(md){return(
md`## Live Temperature Dashboard

Setup in [EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14). This is 24 hour window of latest sensor readings. The green band represents the growth zone for the plant. Most sensors are sending data every 15 minutes which will be reflected in the dashboard automatically.`
)}

function _querySensorName(Inputs,latest){return(
Inputs.select(Object.keys(latest), {
  label: "Choose sensor to chart",
  value: "dev:864475046461397"
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

function _13(md){return(
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

function _18(md){return(
md`## DuckDB

In this episode we setup DuckDB`
)}

function _duckdb(reset,DuckDBClient){return(
reset, new DuckDBClient()
)}

function _21(md){return(
md`By making a second reference to a common duckdb client, we can use the first reference to populate the tables, and refresh the 2nd whenever we received new data and need to recompute our SQL cell analytic queries. `
)}

function _fullduck(doInsertRowToDuckDB,duckdb)
{
  // Refresh fullduck every insertion (causes analytics to be rerun)
  doInsertRowToDuckDB;
  return duckdb;
}


function _23(md){return(
md`### Workflow QoL
The reset button allows us to reset the state and perform the data loading from scratch. *Extremely* useful during development.`
)}

function _reset(daysLookback){return(
daysLookback, 0
)}

function _25(Inputs,$0){return(
Inputs.button("reset and reload data", {
  reduce: () => $0.value++
})
)}

function _26(md){return(
md`### Days Lookback

This controls the size of the aggregation window

🤔 In the livestream if the window function was greater than 2 DuckDB crashed. 

💡 Since the livestream I noticed that recreating the duckdb client every reset allowed us to go to 5. Clearly dropping tables does not reclaim memory`
)}

function _daysLookback(Inputs){return(
Inputs.range([1, 10], {
  label: "days to look back",
  step: 1,
  value: 1
})
)}

function _timeStartIso(timeStart){return(
new Date(timeStart * 1000).toISOString()
)}

function _timeStart(daysLookback){return(
Math.floor(Date.now() / 1000 - 60 * 60 * 24 * daysLookback)
)}

function _30(timeStartIso,__query,fullduck,invalidation){return(
__query.sql(fullduck,invalidation,"fullduck")`SELECT * FROM readings WEHRE 
  WHERE time > ${timeStartIso} 
  ORDER BY time ;`
)}

async function _doCreateTable(reset,duckdb)
{
  reset;
  await duckdb.query(`DROP TABLE IF EXISTS readings`);
  return duckdb.query(
    `CREATE TABLE IF NOT EXISTS readings(sensor STRING, time TIMESTAMP, temperature FLOAT)`
  );
}


function _32(md){return(
md`### Streaming Firebase Query

We pipe the results of a Firebase \`child_added\` into a \`flowQueue\` which will let us processes data one element at a time in realtime.`
)}

function _lastAnalyticRow(Generators,reset,$0,db,querySensorName,timeStart,invalidation){return(
Generators.observe((notify) => {
  reset;
  const dataHandler = (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data.body.temperature) {
      $0.send(data);
      notify(data);
    }
  };
  const ref = db
    .ref(`history/sensors/${querySensorName}`)
    .orderByKey()
    .startAt(timeStart + ""); // reduce data returned

  ref.on("child_added", dataHandler);

  invalidation.then(() => {
    ref.off("child_added", dataHandler);
  });
})
)}

function _34(md){return(
md`### Per row data processing`
)}

function _firebaseRow(doCreateTable,flowQueue){return(
doCreateTable,
flowQueue({
  timeout_ms: 10000000
})
)}

function _36(firebaseRow){return(
firebaseRow
)}

function _37(md){return(
md`For each document from Firebase we execute a SQL INSERT statement to fill DuckDB`
)}

function _doInsertRowToDuckDB(doCreateTable,duckdb,firebaseRow)
{
  doCreateTable;
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


function _40(md){return(
md`## Realtime Analytics: Growing Degree Days (GDD)

We perform analytics against our \`fullduck\` client which is refreshed every data insert.

The first issue is we convert our point-in-time temperature measurements into intervals and calculate their average time using a WINDOW function. Based on the average temperature of the time interval we classify the segment as being in the growth zone or not.`
)}

function _41(timeStartIso,__query,fullduck,invalidation){return(
__query.sql(fullduck,invalidation,"fullduck")`
SELECT sensor, startTime, endTime, avgTemperature, endTime - startTime as duration, temperature > 5 AND temperature < 25 AS isGrowth 
  FROM (
  SELECT sensor, time, temperature, 
      AVG(temperature) OVER lookback avgTemperature,
      MIN(time) OVER lookback startTime,
      MAX(time) OVER lookback endTime
  FROM readings
  WHERE time > ${timeStartIso}
  WINDOW lookback AS (
    ORDER BY "time"
    ROWS 1 PRECEDING)
  ORDER BY time
)`
)}

function _42(md){return(
md`Next we sum up the duration of our intervals that are classified as "growth" to compute total growthHours`
)}

function _aggregation(timeStartIso,__query,fullduck,invalidation){return(
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
      WHERE time > ${timeStartIso} /* Our uploaded data is indexed wrong so this correct the misindexing */
      WINDOW lookback AS (
        ORDER BY "time"
        ROWS 1 PRECEDING)
      ORDER BY time
    )
  )
  ) GROUP BY sensor`
)}

function _44(md){return(
md`We can write these aggregations back into the DB (next time we will schedule these)`
)}

async function _writeAggregation(firebase,db,querySensorName,aggregation)
{
  await firebase.auth().signInAnonymously();
  return db
    .ref(
      `/aggregations/GDD/${querySensorName}/${new Date()
        .toISOString()
        .substring(0, 10)}`
    )
    .set(aggregation[0]);
}


function _46(md){return(
md`## Next episode`
)}

function _47(upcoming){return(
upcoming
)}

function _48(md){return(
md`## Dependancies`
)}

function _51(footer){return(
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
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs","latest"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer("dashboard")).define("dashboard", ["Plot","liveView"], _dashboard);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  main.variable(observer("latest")).define("latest", ["Generators","db"], _latest);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer()).define(["md"], _18);
  const child3 = runtime.module(define3);
  main.import("DuckDBClient", child3);
  main.variable(observer("duckdb")).define("duckdb", ["reset","DuckDBClient"], _duckdb);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("fullduck")).define("fullduck", ["doInsertRowToDuckDB","duckdb"], _fullduck);
  main.variable(observer()).define(["md"], _23);
  main.define("initial reset", ["daysLookback"], _reset);
  main.variable(observer("mutable reset")).define("mutable reset", ["Mutable", "initial reset"], (M, _) => new M(_));
  main.variable(observer("reset")).define("reset", ["mutable reset"], _ => _.generator);
  main.variable(observer()).define(["Inputs","mutable reset"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof daysLookback")).define("viewof daysLookback", ["Inputs"], _daysLookback);
  main.variable(observer("daysLookback")).define("daysLookback", ["Generators", "viewof daysLookback"], (G, _) => G.input(_));
  main.variable(observer("timeStartIso")).define("timeStartIso", ["timeStart"], _timeStartIso);
  main.variable(observer("timeStart")).define("timeStart", ["daysLookback"], _timeStart);
  main.variable(observer()).define(["timeStartIso","__query","fullduck","invalidation"], _30);
  main.variable(observer("doCreateTable")).define("doCreateTable", ["reset","duckdb"], _doCreateTable);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("lastAnalyticRow")).define("lastAnalyticRow", ["Generators","reset","viewof firebaseRow","db","querySensorName","timeStart","invalidation"], _lastAnalyticRow);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("viewof firebaseRow")).define("viewof firebaseRow", ["doCreateTable","flowQueue"], _firebaseRow);
  main.variable(observer("firebaseRow")).define("firebaseRow", ["Generators", "viewof firebaseRow"], (G, _) => G.input(_));
  main.variable(observer()).define(["firebaseRow"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("doInsertRowToDuckDB")).define("doInsertRowToDuckDB", ["doCreateTable","duckdb","firebaseRow"], _doInsertRowToDuckDB);
  main.variable(observer("finishInsert")).define("finishInsert", ["doInsertRowToDuckDB","viewof firebaseRow"], _finishInsert);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["timeStartIso","__query","fullduck","invalidation"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("aggregation")).define("aggregation", ["timeStartIso","__query","fullduck","invalidation"], _aggregation);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("writeAggregation")).define("writeAggregation", ["firebase","db","querySensorName","aggregation"], _writeAggregation);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["upcoming"], _47);
  main.variable(observer()).define(["md"], _48);
  const child4 = runtime.module(define4);
  main.import("upcoming", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _51);
  return main;
}
