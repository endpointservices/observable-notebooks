import define1 from "./357f1a71f976f173@1034.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./0e0b35a92c819d94@471.js";

function _1(md){return(
md`# DuckDB play`
)}

function _duckdb(DuckDBClient){return(
new DuckDBClient()
)}

function _4(duckdb){return(
duckdb.db()
)}

function _filled_duckdb(insertDatum,duckdb)
{
  insertDatum;
  return duckdb;
}


function _results(__query,filled_duckdb,invalidation){return(
__query.sql(filled_duckdb,invalidation,"filled_duckdb")`SELECT * FROM reading;`
)}

function _7(results){return(
results
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

function _querySensorName(){return(
"dev:864475046458393"
)}

function _db(firebase){return(
firebase.database()
)}

function _12(Inputs,$0,$1){return(
Inputs.button("reload data", {
  reduce: () => {
    $0.value = false;
    $1.value++;
  }
})
)}

function _refresh(){return(
0
)}

function _liveViewRaw(Generators,refresh,db,querySensorName,$0,$1){return(
Generators.observe((notify) => {
  refresh;
  db.ref(`history/sensors/${querySensorName}`)
    .orderByKey()
    .startAt(Math.floor(Date.now() / 1000 - 60 * 60 * 24) + "") // reduce data returned
    .on("child_added", (snapshot) => {
      const data = snapshot.val();
      if (data && data.body.temperature && data.when) {
        debugger;
        const datum = {
          sensor: querySensorName,
          ...data.body,
          timestamp: data.when
        };
        $0.send(datum);
        $1.value = datum;
        notify(datum);
      }
    });
})
)}

function _sample(){return(
undefined
)}

async function _syncToDuckDB(duckdb,db,querySensorName)
{
  await duckdb.query(
    `CREATE TABLE IF NOT EXISTS dt(u STRING, x INTEGER, y FLOAT)`
  );
  db.ref(`history/sensors/${querySensorName}`)
    .orderByKey()
    .startAt(Math.floor(Date.now() / 1000 - 60 * 60 * 24) + "") // reduce data returned
    .on("child_added", (snapshot) => {
      const data = snapshot.val();
      debugger;
      if (data) {
        duckdb.query(
          `INSERT INTO sensors VALUES ('a', 1, 5), ('b', 2, 6), ('c', 3, 7), ('d', 4, 8);`
        );
      }
    });
  return "ok";
}


function _datum(flowQueue){return(
flowQueue({
  timeout_ms: 1000000000
})
)}

function _hasCreatedtable(){return(
false
)}

function _20(Inputs,$0){return(
Inputs.button("refresh table", {
  reduce: () => ($0.value = false)
})
)}

async function _createTable(datum,hasCreatedtable,duckdb,$0,$1)
{
  datum;
  if (!hasCreatedtable) {
    await duckdb.query("DROP TABLE IF EXISTS reading");
    await duckdb.query(
      `CREATE TABLE IF NOT EXISTS reading(${Object.entries($0.value)
        .map(([k, v]) =>
          k == "timestamp"
            ? `${k} TIMESTAMP`
            : typeof v === "number"
            ? `${k} FLOAT`
            : typeof v === "string"
            ? `${k} STRING`
            : "error"
        )
        .join(",")})`
    );
    $1.value = true;
  }
}


function _22(){return(
typeof ""
)}

function _insertDatum(createTable,duckdb,datum)
{
  createTable; // Do after createTable
  return duckdb.query(
    `INSERT INTO reading (${Object.keys(datum).join(
      ","
    )}) VALUES (${Object.keys(datum)
      .map((key) =>
        key === "timestamp"
          ? `'${new Date(datum.timestamp * 1000).toISOString()}'`
          : `'${datum[key]}'`
      )
      .join(",")});`
  );
}


function _insertReturn($0,insertDatum){return(
$0.resolve(insertDatum)
)}

function _growth1(__query,filled_duckdb,invalidation){return(
__query.sql(filled_duckdb,invalidation,"filled_duckdb")`
SELECT *
FROM 
(SELECT *, CAST(startTime - endTime as INTERVAL) duration_millis, avgTemp > 15 AND avgTemp < 25 as isGrowth
FROM (
  SELECT "sensor", 
    MAX(timestamp) OVER interval startTime,
    MIN(timestamp) OVER interval endTime,
    AVG(temperature) OVER interval avgTemp,
  FROM reading
  WINDOW interval AS (
    PARTITION BY "sensor"
    ORDER BY "timestamp" ASC
    ROWS 1 PRECEDING)
  ORDER BY "sensor", "timestamp"
)
WHERE duration_millis > INTERVAL 0 SECONDS)
  `
)}

function _growth(__query,filled_duckdb,invalidation){return(
__query.sql(filled_duckdb,invalidation,"filled_duckdb")`
SELECT *, CASE WHEN isGrowth THEN EXTRACT(epoch FROM duration_millis) ELSE 0 END growth_secs
FROM 
(SELECT *, CAST(startTime - endTime as INTERVAL) duration_millis, avgTemp > 15 AND avgTemp < 25 as isGrowth
FROM (
  SELECT "sensor", 
    MAX(timestamp) OVER interval startTime,
    MIN(timestamp) OVER interval endTime,
    AVG(temperature) OVER interval avgTemp,
  FROM reading
  WINDOW interval AS (
    PARTITION BY "sensor"
    ORDER BY "timestamp" ASC
    ROWS 1 PRECEDING)
  ORDER BY "sensor", "timestamp"
)
WHERE duration_millis > INTERVAL 0 SECONDS)
  `
)}

function _27(){return(
31612
)}

function _growth2(__query,filled_duckdb,invalidation){return(
__query.sql(filled_duckdb,invalidation,"filled_duckdb")`SELECT sensor, SUM(CAST(growth_secs AS FLOAT)/ (60 * 60 * 24)) AS growth_days FROM (
SELECT *, CASE WHEN isGrowth THEN EXTRACT(epoch FROM duration_millis) ELSE 0 END growth_secs
FROM 
(SELECT *, CAST(startTime - endTime as INTERVAL) duration_millis, avgTemp > 15 AND avgTemp < 25 as isGrowth
FROM (
  SELECT "sensor", 
    MAX(timestamp) OVER interval startTime,
    MIN(timestamp) OVER interval endTime,
    AVG(temperature) OVER interval avgTemp,
  FROM reading
  WINDOW interval AS (
    PARTITION BY "sensor"
    ORDER BY "timestamp" ASC
    ROWS 1 PRECEDING)
  ORDER BY "sensor", "timestamp"
)
WHERE duration_millis > INTERVAL 0 SECONDS)
) group by sensor`
)}

function _29(__query,filled_duckdb,invalidation){return(
__query.sql(filled_duckdb,invalidation,"filled_duckdb")`SELECT 10000000000000 AS INTEGER st;`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("DuckDBClient", child1);
  main.variable(observer("duckdb")).define("duckdb", ["DuckDBClient"], _duckdb);
  main.variable(observer()).define(["duckdb"], _4);
  main.variable(observer("filled_duckdb")).define("filled_duckdb", ["insertDatum","duckdb"], _filled_duckdb);
  main.variable(observer("results")).define("results", ["__query","filled_duckdb","invalidation"], _results);
  main.variable(observer()).define(["results"], _7);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  const child2 = runtime.module(define2).derive(["firebaseConfig"], main);
  main.import("firebase", child2);
  main.import("viewof user", child2);
  main.import("user", child2);
  main.import("listen", child2);
  main.variable(observer("querySensorName")).define("querySensorName", _querySensorName);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["Inputs","mutable hasCreatedtable","mutable refresh"], _12);
  main.define("initial refresh", _refresh);
  main.variable(observer("mutable refresh")).define("mutable refresh", ["Mutable", "initial refresh"], (M, _) => new M(_));
  main.variable(observer("refresh")).define("refresh", ["mutable refresh"], _ => _.generator);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","refresh","db","querySensorName","viewof datum","mutable sample"], _liveViewRaw);
  main.define("initial sample", _sample);
  main.variable(observer("mutable sample")).define("mutable sample", ["Mutable", "initial sample"], (M, _) => new M(_));
  main.variable(observer("sample")).define("sample", ["mutable sample"], _ => _.generator);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  main.variable(observer("syncToDuckDB")).define("syncToDuckDB", ["duckdb","db","querySensorName"], _syncToDuckDB);
  main.variable(observer("viewof datum")).define("viewof datum", ["flowQueue"], _datum);
  main.variable(observer("datum")).define("datum", ["Generators", "viewof datum"], (G, _) => G.input(_));
  main.define("initial hasCreatedtable", _hasCreatedtable);
  main.variable(observer("mutable hasCreatedtable")).define("mutable hasCreatedtable", ["Mutable", "initial hasCreatedtable"], (M, _) => new M(_));
  main.variable(observer("hasCreatedtable")).define("hasCreatedtable", ["mutable hasCreatedtable"], _ => _.generator);
  main.variable(observer()).define(["Inputs","mutable hasCreatedtable"], _20);
  main.variable(observer("createTable")).define("createTable", ["datum","hasCreatedtable","duckdb","mutable sample","mutable hasCreatedtable"], _createTable);
  main.variable(observer()).define(_22);
  main.variable(observer("insertDatum")).define("insertDatum", ["createTable","duckdb","datum"], _insertDatum);
  main.variable(observer("insertReturn")).define("insertReturn", ["viewof datum","insertDatum"], _insertReturn);
  main.variable(observer("growth1")).define("growth1", ["__query","filled_duckdb","invalidation"], _growth1);
  main.variable(observer("growth")).define("growth", ["__query","filled_duckdb","invalidation"], _growth);
  main.variable(observer()).define(_27);
  main.variable(observer("growth2")).define("growth2", ["__query","filled_duckdb","invalidation"], _growth2);
  main.variable(observer()).define(["__query","filled_duckdb","invalidation"], _29);
  return main;
}
