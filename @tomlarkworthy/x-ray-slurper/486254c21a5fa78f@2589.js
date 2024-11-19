import define1 from "./048a17a165be198d@271.js";
import define2 from "./161b65299d9741a3@948.js";
import define3 from "./0e0b35a92c819d94@471.js";

function _1(md){return(
md`# AWS [Cloudwatch X-Ray](https://aws.amazon.com/xray/) Exploratory Analytics 
## Get more value out of the data already in your AWS account. 

This batch downloads an x-ray query result set in DuckDB in the browser, so you can explore system behaviour with full text search over metadata, reactive data visualisation, flamegraphs and SQL queries. Save/load traces to CSV or Parquet. Fork this notebook to extend programatically
`
)}

function _2(md){return(
md`
<details>
  <summary>
    Contributing
  </summary>
Feel free to fork this notebook and send back change requests. A goal of this notebook is that it is domain independent and a generic interface to x-ray. If you need to do domain specific analysis, use a different notebook that consumes the exportable trace archives.
</details>`
)}

function _3(md){return(
md`# Data loading`
)}

function _4(md){return(
md`## Slurp from AWS account over a time range`
)}

function _start_time(Inputs){return(
Inputs.datetime({
  label: "start time (local)",
  max: new Date(),
  value: new Date() - 3600 * 1000
})
)}

function _end_time(Inputs){return(
Inputs.datetime({
  label: "end time (local)",
  max: new Date(),
  value: new Date()
})
)}

function _7(start_time,end_time,md){return(
md`UTC ${start_time.toISOString()} to ${end_time.toISOString()}`
)}

function _region(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    [
      "us-east-1", // N. Virginia
      "us-east-2", // Ohio
      "us-west-1", // N. California
      "us-west-2", // Oregon
      "af-south-1", // Cape Town
      "ap-east-1", // Hong Kong
      "ap-south-1", // Mumbai
      "ap-northeast-1", // Tokyo
      "ap-northeast-2", // Seoul
      "ap-northeast-3", // Osaka
      "ap-southeast-1", // Singapore
      "ap-southeast-2", // Sydney
      "ca-central-1", // Canada (Central)
      "eu-central-1", // Frankfurt
      "eu-west-1", // Ireland
      "eu-west-2", // London
      "eu-west-3", // Paris
      "eu-south-1", // Milan
      "eu-north-1", // Stockholm
      "me-south-1", // Bahrain
      "sa-east-1" // São Paulo
    ],
    {
      label: "region"
    }
  ),
  localStorageView("region")
)
)}

function _filter(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.textarea({ label: "query (syntax is same as AWS console)" }),
  localStorageView("FilterExpression")
)
)}

function _downsample(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([1, 1000], { label: "downsample", step: 1, value: 1 }),
  localStorageView("downsample")
)
)}

function _fetch_traces(dropTables,Inputs,trace_summaries)
{
  dropTables;
  return Inputs.button(
    `Append ${trace_summaries.TraceSummaries.length}${
      trace_summaries.NextToken !== null ? "+" : ""
    } traces into local DuckDB`
  );
}


function _dropTables(Inputs,db,$0){return(
Inputs.button("Reset state", {
  reduce: async () => {
    await db.query("DROP TABLE segments");
    await db.query("DROP TABLE traces");
    $0.value++;
  }
})
)}

function _run(Inputs){return(
Inputs.toggle({ label: "run", value: true })
)}

function _batches_fetched(){return(
0
)}

function _15(md){return(
md`## Slurp newline deliminated list of trace-ids`
)}

function _trace_ids_list(Inputs){return(
Inputs.textarea()
)}

function _17(Inputs,$0,trace_ids_list){return(
Inputs.button("load", {
  label: "load list",
  reduce: () => {
    $0.send({
      TraceSummaries: trace_ids_list.split("\n").map((t) => ({
        Id: t
      }))
    });
  }
})
)}

function _18(md){return(
md`## AWS Auth
`
)}

function _access_key(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "AWS access key"
  }),
  localStorageView("aws_access_key")
)
)}

function _access_secret_key(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "AWS secret key"
  }),
  localStorageView("aws_secret_key")
)
)}

function _21($0,$1,Event)
{
  if (document.location.hash.length > 10) {
    const creds = JSON.parse(atob(document.location.hash.substring(1)));
    $0.value = creds.ACCESS_KEY;
    $1.value = creds.SECRET;
    $0.dispatchEvent(new Event("input"));
    $1.dispatchEvent(new Event("input"));
  }
  return "You can also encode URL hash as base64 JSON to load AWS creds for deep linking. Grant creds AWSXRayReadOnlyAccess";
}


function _query_params_loader(search_params,$0,Event,$1)
{
  if (search_params.filter) {
    $0.value = search_params.filter;
    $0.dispatchEvent(new Event("input"));
  }
  if (search_params.region) {
    $1.value = search_params.region;
    $1.dispatchEvent(new Event("input"));
  }
}


function _23(md){return(
md`## Save/Load Trace Dataset from File`
)}

function _24(exportDuckDB,db,filename,htl){return(
htl.html`<button onclick=${() => exportDuckDB(db, {
  format: "csv",
  filename,
  download: true
})}>Download an archive locally`
)}

function _archive(Inputs){return(
Inputs.file({ label: "Load a trace archive" })
)}

async function _loader_code(archive,db,importDuckDB,$0)
{
  if (!archive) return;
  console.log("loading archive", archive);
  await db.sql`DROP TABLE IF EXISTS segments`;
  await db.sql`DROP TABLE IF EXISTS traces`;
  await importDuckDB(archive, {
    client: db
  });
  $0.value++;
}


function _filename(region,start_time,end_time,filter){return(
`traces_${region}_${start_time.toISOString()}_${end_time.toISOString()}_${encodeURIComponent(
  filter
)}`
)}

function _28(md){return(
md`## Trace Selection Tool

Using the filtering features will sub-select traces for the visualisations`
)}

function _selected_traces(__query,segment_tree,invalidation){return(
__query(segment_tree,{from:{table:"segment_tree"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:["start_time","end_time","TraceId","pageId","method","url","status","name","parent","Id"]}},invalidation,"segment_tree")
)}

function _uuid_regex(){return(
/[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/gi
)}

function _date_regex(){return(
/[0-9]{4}-[0-9]{2}-[0-9]{2}/g
)}

function _root_segments(selected_traces,uuid_regex,date_regex,max_duration){return(
selected_traces
  .map((d) => {
    const path = d.url ? new URL(d.url || d.pageId).pathname : d.pageId;
    return {
      ...d,
      duration: Math.max(0, d.end_time - d.start_time),
      grouped_url: path
        ? path.replaceAll(uuid_regex, "<UUID>").replaceAll(date_regex, "<NUM>")
        : undefined
    };
  })
  .filter((d) => d.duration < max_duration)
)}

function _segment_tree(db_refresh){return(
db_refresh.query(`
WITH RECURSIVE cte AS (
   SELECT 1 AS depth, *
   FROM segments
   WHERE parent IS NULL
   UNION ALL
   SELECT depth + 1, segments.*
   FROM segments
   JOIN cte
     ON segments.parent = cte.Id
)
SELECT * FROM cte;
`)
)}

function _34(md){return(
md`## Visualizations`
)}

function _35(md){return(
md`### trace latency by *name*`
)}

function _36(Plot,root_segments,width){return(
Plot.auto(root_segments, {x: "duration", y: "name", mark: "dot"}).plot({width, marginLeft: 500})
)}

function _37(md){return(
md`### trace latency by grouped URL or pathId

CloudWatch RUM add a URL, API Gateway adds a pathId. The visualisation attempts to rollup stats by detecting date and UUID formats`
)}

function _max_duration(Inputs){return(
Inputs.range([0, 60 * 60 * 1000], {
  label: "max duration ms",
  value: 60000
})
)}

function _39(Plot,root_segments,width){return(
Plot.auto(root_segments, {x: "duration", y: "grouped_url"}).plot({width, marginLeft: 500})
)}

function _40(md){return(
md`### Trace latency over time ( interactive and 👇 clickable)`
)}

function _selected(Plot,width,root_segments){return(
Plot.plot({
  width,
  color: { legend: true },
  marks: [
    Plot.dot(root_segments, {
      x: "start_time",
      y: "duration",
      fill: "name",
      channels: {
        name: (d) => d.name,
        host: (d) => (d.url ? new URL(d.url).host : undefined),
        url: (d) => (d.url ? new URL(d.url).pathname : undefined)
      },
      tip: true
    })
  ]
})
)}

function _42(root_segments){return(
root_segments
)}

function _43(md){return(
md`#### Selected root trace details`
)}

function _selected_trace(segment_tree,selected){return(
segment_tree.filter((r) => r.TraceId == selected.TraceId)
)}

function _45(__query,selected_trace,invalidation){return(
__query(selected_trace,{from:{table:"selected_trace"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:["name","TraceId","pageId","method","url","status","parent","depth","Id","start_time","end_time"]}},invalidation,"selected_trace")
)}

function _46(md){return(
md`#### Selected trace flamegraph`
)}

function _single_height(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([0, 2000], { value: 400, step: 1, label: "height" }),
  localStorageView("single_height", { defaultValue: 400 })
)
)}

function _48(d3,DOM,width,single_height,single_trace,d3FlameGraph)
{
  const svg = d3.select(DOM.svg(width, single_height));
  svg
    .datum(single_trace)
    .call(
      d3FlameGraph()
        .width(width)
        .sort(false)
        .transitionDuration(0)
        .cellHeight(18)
        .transitionEase(d3.easeCubic)
        .title("")
        .inverted(true)
    );
  return svg.node();
}


function _single_trace(to_tree,selected_trace){return(
to_tree(
  selected_trace.map((d) => ({
    name: d.name,
    value: d.end_time - d.start_time,
    start_time: d.start_time,
    end_time: d.end_time
    // TraceId: d.TraceId // Don't need as its single trace so groups into one anyway
  }))
)
)}

function _to_tree(d3){return(
(flamegraph_data) => {
  function createTree(data) {
    // Sort the array by start_time
    data.sort((a, b) => {
      const diff = a.start_time - b.start_time;
      if (diff != 0) return diff;
      else return b.end_time - a.end_time;
    });

    const stack = [];

    data.forEach((row) => {
      let node = { ...row, children: [] };
      let currentTime = row.start_time;

      while (
        stack.length > 1 &&
        stack[stack.length - 1].end_time <= currentTime
      ) {
        stack.pop();
      }

      if (stack.length > 0) stack[stack.length - 1].children.push(node);
      stack.push(node);
    });

    return stack[0];
  }
  if (!flamegraph_data[0].TraceId) return createTree(flamegraph_data);

  return [...d3.group(flamegraph_data, (d) => d.TraceId).values()].flatMap(
    (tree) => createTree(tree)
  );
}
)}

function _51(md){return(
md`### Trace latency`
)}

function _52(Plot,root_segments){return(
Plot.auto(root_segments, {x: "duration"}).plot()
)}

function _53(d3,root_segments,md){return(
md`median: ${d3.median(root_segments, (d) => d.duration)} mean ${d3.mean(root_segments, (d) => d.duration)} p90: ${d3.quantile(root_segments, 0.9, (d) => d.duration)}`
)}

function _54(md){return(
md`### Selected Segment Latency`
)}

function _perf(selected_traces){return(
selected_traces.map((d) => ({
  ...d,
  duration: Math.max(d.end_time - d.start_time, 0)
}))
)}

function _56(md){return(
md`#### Total segment duration`
)}

function _57(Plot,perf,width){return(
Plot.auto(perf, {x: {value: "duration", reduce: "sum"}, y: "name", mark: "bar", color: "name"}).plot({color: {legend: true}, width, marginLeft: 500})
)}

function _58(md){return(
md`#### Mean Segment Duration`
)}

function _59(Plot,perf,width){return(
Plot.auto(perf, {x: {value: "duration", reduce: "mean"}, y: "name", mark: "bar", color: "name"}).plot({color: {legend: true}, width, marginLeft: 500})
)}

function _60(md){return(
md`#### Individual data points`
)}

function _61(Plot,width,perf){return(
Plot.plot({
  width,
  marginLeft: 500,
  marks: [
    Plot.tickX(perf, { x: "duration", y: "name", tip: true, stroke: "#0003" }),
    Plot.ruleX([0])
  ]
})
)}

function _62(md){return(
md`## Flamegraph including descendants`
)}

function _height(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([0, 2000], { value: 400, step: 1, label: "height" }),
  localStorageView("height", { defaultValue: 400 })
)
)}

function _64(d3,DOM,width,height,flamegraph_chart_data,d3FlameGraph)
{
  const svg = d3.select(DOM.svg(width, height));
  svg
    .datum(flamegraph_chart_data)
    .call(
      d3FlameGraph()
        .width(width)
        .sort(true)
        .transitionDuration(0)
        .cellHeight(18)
        .transitionEase(d3.easeCubic)
        .title("")
        .inverted(true)
    );
  return svg.node();
}


function _flamegraph_data(selected_traces,db_refresh){return(
selected_traces.length < 10000
  ? db_refresh.query(`
WITH RECURSIVE cte AS (
   SELECT 1 AS depth, *
   FROM segments
   WHERE /*Id in (${selected_traces.map((d) => `'${d.Id}'`).join(",")})*/
        TraceId in (${selected_traces
          .map((d) => `'${d.TraceId}'`)
          .join(",")}) AND parent is NULL
   UNION ALL
   SELECT depth + 1, segments.*
   FROM segments
   JOIN cte
     ON segments.parent = cte.Id
)
SELECT
  cte.name,
  cte.start_time,
  cte.end_time,
  cte.traceId,
  /* Work around for old duckdb client, no epoch_ms function */
  epoch(cte.end_time) * 1000 + (EXTRACT('milliseconds' FROM cte.end_time) % 1000)
  - epoch(cte.start_time) * 1000 - EXTRACT('milliseconds' FROM cte.start_time)  % 1000 AS value
FROM cte
`)
  : []
)}

function _66(md){return(
md`### Trace and decendant's latency by name`
)}

function _67(Plot,flamegraph_data,width){return(
Plot.auto(flamegraph_data, {x: "value", y: "name"}).plot({width, marginLeft: 400})
)}

function _68(Plot,flamegraph_data){return(
Plot.auto(flamegraph_data, {x: {value: "value", reduce: "sum"}, y: {value: "name", reduce: null}}).plot({marginLeft: 400})
)}

function _flamegraph_chart_data(to_tree,flamegraph_data)
{
  const merge = (base, tree) => {
    const indexChildren = (array) =>
      array.reduce((obj, el) => {
        obj[el.name] = el;
        return obj;
      }, {});

    const name_to_child_base = indexChildren(base.children);
    const name_to_child_tree = indexChildren(tree.children);

    // Merge children from base and tree
    const children = Object.values({
      ...name_to_child_base,
      ...name_to_child_tree
    }).map((child) => {
      if (name_to_child_base[child.name] && name_to_child_tree[child.name]) {
        // Child exists in both, merge them
        return merge(
          name_to_child_base[child.name],
          name_to_child_tree[child.name]
        );
      } else {
        // Child exists in only one, return it
        return {
          name: child.name,
          value: child.value,
          children: child.children
        };
      }
    });
    debugger;
    return {
      name: base.name,
      value: base.value + tree.value,
      children
    };
  };

  return to_tree(flamegraph_data).reduce(
    (base, tree) =>
      merge(base, {
        name: "root",
        value: tree.value,
        children: [tree]
      }),
    {
      name: "root",
      value: 0,
      children: []
    }
  );
}


function _70(md){return(
md`## DuckDB Database Explorer`
)}

function _db_refresh(refresh_db,db){return(
refresh_db && db
)}

function _72(md){return(
md`### traces`
)}

function _73(__query,db_refresh,invalidation){return(
__query(db_refresh,{from:{table:{table:"traces"}},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"db_refresh")
)}

function _74(md){return(
md`### Segments`
)}

function _75(__query,db_refresh,invalidation){return(
__query(db_refresh,{from:{table:{table:"segments"}},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"db_refresh")
)}

function _76(md){return(
md`---
# Implementation`
)}

function _77(md){return(
md`## Database Setup`
)}

function _db(DuckDBClient){return(
DuckDBClient.of({})
)}

function _79(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`SELECT table_name, column_name, data_type FROM temp.information_schema.columns`
)}

function _refresh_db(){return(
0
)}

function _traces_table(dropTables,db)
{
  dropTables
  return db.sql`CREATE OR REPLACE TABLE traces (
      Id string,
      Duration float,
      PRIMARY KEY (Id)
  )`;
}


function _82(traces){return(
new Date(JSON.parse(traces.Traces[0].Segments[0].Document).start_time * 1000)
)}

function _83(traces){return(
traces
)}

function _84(traces){return(
JSON.parse(traces.Traces[0].Segments[2].Document)
)}

function _segments_table(traces_table,db,$0){return(
traces_table &&
  db.sql`CREATE OR REPLACE TABLE segments (
    Id string,
    name string,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    parent string,
    TraceId string,
    pageId string,
    method string,
    url string,
    status integer,
    PRIMARY KEY (Id),
    FOREIGN KEY (TraceId) REFERENCES traces(Id)
)`.then(() => $0.value++)
)}

function _86(md){return(
md`### https://docs.aws.amazon.com/xray/latest/devguide/xray-api-segmentdocuments.html`
)}

function _87(insert_traces,db,traces){return(
insert_traces &&
  db.query(`SELECT * FROM segments WHERE TraceId = '${traces.Traces[0].Id}'`)
)}

function _insert_traces(segments_table,traces,db)
{
  segments_table;
  return Promise.all(
    traces.Traces.map(async (trace) =>
      db.sql`INSERT INTO traces VALUES (${trace.Id}, ${trace.Duration})`
        .then(() =>
          Promise.all(
            trace.Segments.map((segment) => {
              const doc = JSON.parse(segment.Document);
              const insert_doc = (doc, parent_id) => {
                const parent_insert = db.sql`INSERT INTO segments VALUES (
                  ${doc.id},
                  ${doc.name},
                  ${new Date(doc.start_time * 1000)},
                  ${new Date(doc.end_time * 1000)},
                  ${doc.parent_id || parent_id},
                  ${trace.Id},
                  ${doc?.metadata?.rum?.pageId},
                  ${doc?.http?.request?.method?.toUpperCase()},
                  ${doc?.http?.request?.url},
                  ${doc?.http?.response?.status},
                )`.catch((err) => {
                  //debugger;
                  console.error(err);
                });

                return parent_insert.then(
                  Promise.all(
                    (doc.subsegments || []).map((subsegment) =>
                      insert_doc(subsegment, segment.Id)
                    )
                  )
                );
              };
              return insert_doc(doc);
            })
          )
        )
        .catch((err) => {
          //debugger;
          console.error(err);
        })
    )
  );
}


function _89(insert_traces,$0){return(
insert_traces && $0.value++
)}

function _90(md){return(
md`## Slurper`
)}

function _xray(AWS,access_key,access_secret_key,region)
{
  AWS.config.credentials = {
    accessKeyId: access_key,
    secretAccessKey: access_secret_key
  };
  return new AWS.XRay({
    region: region
  });
}


function _trace_summaries(xray,filter,start_time,end_time){return(
xray
  .getTraceSummaries({
    FilterExpression: filter.trim() !== "" ? filter.trim() : undefined,
    StartTime: start_time.toISOString(),
    EndTime: end_time.toISOString()
  })
  .promise()
)}

async function _enqueue_batches(fetch_traces,trace_summaries,run,$0,xray,filter,start_time,end_time)
{
  if (fetch_traces == 0) return "Press fetch traces to commence slurping";
  let batch = trace_summaries;
  while (batch && run) {
    $0.send(batch);
    if (batch.NextToken) {
      batch = await xray
        .getTraceSummaries({
          FilterExpression: filter.trim() !== "" ? filter.trim() : undefined,
          StartTime: start_time.toISOString(),
          EndTime: end_time.toISOString(),
          NextToken: batch.NextToken
        })
        .promise();
    } else {
      batch = null;
    }
  }
}


function _batch(dropTables,flowQueue)
{
  dropTables;
  return flowQueue();
}


function _counter(){return(
0
)}

function _minibatch(){return(
[]
)}

function _loadTracesInBatch(batch,$0,$1,minibatch,$2,$3)
{
  const ids = batch.TraceSummaries.map((summary) => summary.Id);
  for (let i = 0; i < ids.length; i++) {
    if ($0.value % $1.value == 0) {
      minibatch.push(ids[i]);
      if (minibatch.length == 5) {
        $2.send(minibatch);
        minibatch.length = 0;
      }
    }
    $0.value = $0.value + 1;
  }
  $3.resolve(ids);
  return ids;
}


function _trace_ids(dropTables,flowQueue)
{
  dropTables;
  return flowQueue();
}


function _traces(xray,trace_ids){return(
xray
  .batchGetTraces({
    TraceIds: trace_ids
  })
  .promise()
)}

function _100(traces,$0){return(
traces && $0.value++
)}

function _101($0,insert_traces){return(
$0.resolve(insert_traces)
)}

function _search_params(URLSearchParams,location){return(
Object.fromEntries(
  new URLSearchParams(location.search).entries()
)
)}

async function _AWS(require,FileAttachment){return(
require(await FileAttachment("aws-sdk-2.1429.0.min.js").url()).then(
  (_) => window["AWS"]
)
)}

function _aws(){return(
import("https://cdn.skypack.dev/@aws-sdk/client-location")
)}

function _d3FlameGraph(require){return(
require("d3-flame-graph@4.0.6/dist/d3-flamegraph.min.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["aws-sdk-2.1429.0.min.js", {url: new URL("./files/f8a3463795a6e86102275e385116ec0485e98d9443156e358aa665980ca282a2ea9ba0d0df8e4e7f24cb3fb09b29e094e8cc71b61b2315b4fe80399a61a6d21a.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof start_time")).define("viewof start_time", ["Inputs"], _start_time);
  main.variable(observer("start_time")).define("start_time", ["Generators", "viewof start_time"], (G, _) => G.input(_));
  main.variable(observer("viewof end_time")).define("viewof end_time", ["Inputs"], _end_time);
  main.variable(observer("end_time")).define("end_time", ["Generators", "viewof end_time"], (G, _) => G.input(_));
  main.variable(observer()).define(["start_time","end_time","md"], _7);
  main.variable(observer("viewof region")).define("viewof region", ["Inputs","localStorageView"], _region);
  main.variable(observer("region")).define("region", ["Generators", "viewof region"], (G, _) => G.input(_));
  main.variable(observer("viewof filter")).define("viewof filter", ["Inputs","localStorageView"], _filter);
  main.variable(observer("filter")).define("filter", ["Generators", "viewof filter"], (G, _) => G.input(_));
  main.variable(observer("viewof downsample")).define("viewof downsample", ["Inputs","localStorageView"], _downsample);
  main.variable(observer("downsample")).define("downsample", ["Generators", "viewof downsample"], (G, _) => G.input(_));
  main.variable(observer("viewof fetch_traces")).define("viewof fetch_traces", ["dropTables","Inputs","trace_summaries"], _fetch_traces);
  main.variable(observer("fetch_traces")).define("fetch_traces", ["Generators", "viewof fetch_traces"], (G, _) => G.input(_));
  main.variable(observer("viewof dropTables")).define("viewof dropTables", ["Inputs","db","mutable refresh_db"], _dropTables);
  main.variable(observer("dropTables")).define("dropTables", ["Generators", "viewof dropTables"], (G, _) => G.input(_));
  main.variable(observer("viewof run")).define("viewof run", ["Inputs"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.define("initial batches_fetched", _batches_fetched);
  main.variable(observer("mutable batches_fetched")).define("mutable batches_fetched", ["Mutable", "initial batches_fetched"], (M, _) => new M(_));
  main.variable(observer("batches_fetched")).define("batches_fetched", ["mutable batches_fetched"], _ => _.generator);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof trace_ids_list")).define("viewof trace_ids_list", ["Inputs"], _trace_ids_list);
  main.variable(observer("trace_ids_list")).define("trace_ids_list", ["Generators", "viewof trace_ids_list"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof batch","trace_ids_list"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof access_key")).define("viewof access_key", ["Inputs","localStorageView"], _access_key);
  main.variable(observer("access_key")).define("access_key", ["Generators", "viewof access_key"], (G, _) => G.input(_));
  main.variable(observer("viewof access_secret_key")).define("viewof access_secret_key", ["Inputs","localStorageView"], _access_secret_key);
  main.variable(observer("access_secret_key")).define("access_secret_key", ["Generators", "viewof access_secret_key"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof access_key","viewof access_secret_key","Event"], _21);
  main.variable(observer("query_params_loader")).define("query_params_loader", ["search_params","viewof filter","Event","viewof region"], _query_params_loader);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["exportDuckDB","db","filename","htl"], _24);
  main.variable(observer("viewof archive")).define("viewof archive", ["Inputs"], _archive);
  main.variable(observer("archive")).define("archive", ["Generators", "viewof archive"], (G, _) => G.input(_));
  main.variable(observer("loader_code")).define("loader_code", ["archive","db","importDuckDB","mutable refresh_db"], _loader_code);
  main.variable(observer("filename")).define("filename", ["region","start_time","end_time","filter"], _filename);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("selected_traces")).define("selected_traces", ["__query","segment_tree","invalidation"], _selected_traces);
  main.variable(observer("uuid_regex")).define("uuid_regex", _uuid_regex);
  main.variable(observer("date_regex")).define("date_regex", _date_regex);
  main.variable(observer("root_segments")).define("root_segments", ["selected_traces","uuid_regex","date_regex","max_duration"], _root_segments);
  main.variable(observer("segment_tree")).define("segment_tree", ["db_refresh"], _segment_tree);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["Plot","root_segments","width"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof max_duration")).define("viewof max_duration", ["Inputs"], _max_duration);
  main.variable(observer("max_duration")).define("max_duration", ["Generators", "viewof max_duration"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","root_segments","width"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("viewof selected")).define("viewof selected", ["Plot","width","root_segments"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["root_segments"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("selected_trace")).define("selected_trace", ["segment_tree","selected"], _selected_trace);
  main.variable(observer()).define(["__query","selected_trace","invalidation"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("viewof single_height")).define("viewof single_height", ["Inputs","localStorageView"], _single_height);
  main.variable(observer("single_height")).define("single_height", ["Generators", "viewof single_height"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","DOM","width","single_height","single_trace","d3FlameGraph"], _48);
  main.variable(observer("single_trace")).define("single_trace", ["to_tree","selected_trace"], _single_trace);
  main.variable(observer("to_tree")).define("to_tree", ["d3"], _to_tree);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["Plot","root_segments"], _52);
  main.variable(observer()).define(["d3","root_segments","md"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("perf")).define("perf", ["selected_traces"], _perf);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["Plot","perf","width"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["Plot","perf","width"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer()).define(["Plot","width","perf"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("viewof height")).define("viewof height", ["Inputs","localStorageView"], _height);
  main.variable(observer("height")).define("height", ["Generators", "viewof height"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","DOM","width","height","flamegraph_chart_data","d3FlameGraph"], _64);
  main.variable(observer("flamegraph_data")).define("flamegraph_data", ["selected_traces","db_refresh"], _flamegraph_data);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["Plot","flamegraph_data","width"], _67);
  main.variable(observer()).define(["Plot","flamegraph_data"], _68);
  main.variable(observer("flamegraph_chart_data")).define("flamegraph_chart_data", ["to_tree","flamegraph_data"], _flamegraph_chart_data);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("db_refresh")).define("db_refresh", ["refresh_db","db"], _db_refresh);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer()).define(["__query","db_refresh","invalidation"], _73);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer()).define(["__query","db_refresh","invalidation"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer("db")).define("db", ["DuckDBClient"], _db);
  main.variable(observer()).define(["__query","db","invalidation"], _79);
  main.define("initial refresh_db", _refresh_db);
  main.variable(observer("mutable refresh_db")).define("mutable refresh_db", ["Mutable", "initial refresh_db"], (M, _) => new M(_));
  main.variable(observer("refresh_db")).define("refresh_db", ["mutable refresh_db"], _ => _.generator);
  main.variable(observer("traces_table")).define("traces_table", ["dropTables","db"], _traces_table);
  main.variable(observer()).define(["traces"], _82);
  main.variable(observer()).define(["traces"], _83);
  main.variable(observer()).define(["traces"], _84);
  main.variable(observer("segments_table")).define("segments_table", ["traces_table","db","mutable refresh_db"], _segments_table);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer()).define(["insert_traces","db","traces"], _87);
  main.variable(observer("insert_traces")).define("insert_traces", ["segments_table","traces","db"], _insert_traces);
  main.variable(observer()).define(["insert_traces","mutable refresh_db"], _89);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer("xray")).define("xray", ["AWS","access_key","access_secret_key","region"], _xray);
  main.variable(observer("trace_summaries")).define("trace_summaries", ["xray","filter","start_time","end_time"], _trace_summaries);
  main.variable(observer("enqueue_batches")).define("enqueue_batches", ["fetch_traces","trace_summaries","run","viewof batch","xray","filter","start_time","end_time"], _enqueue_batches);
  main.variable(observer("viewof batch")).define("viewof batch", ["dropTables","flowQueue"], _batch);
  main.variable(observer("batch")).define("batch", ["Generators", "viewof batch"], (G, _) => G.input(_));
  main.define("initial counter", _counter);
  main.variable(observer("mutable counter")).define("mutable counter", ["Mutable", "initial counter"], (M, _) => new M(_));
  main.variable(observer("counter")).define("counter", ["mutable counter"], _ => _.generator);
  main.variable(observer("minibatch")).define("minibatch", _minibatch);
  main.variable(observer("loadTracesInBatch")).define("loadTracesInBatch", ["batch","mutable counter","viewof downsample","minibatch","viewof trace_ids","viewof batch"], _loadTracesInBatch);
  main.variable(observer("viewof trace_ids")).define("viewof trace_ids", ["dropTables","flowQueue"], _trace_ids);
  main.variable(observer("trace_ids")).define("trace_ids", ["Generators", "viewof trace_ids"], (G, _) => G.input(_));
  main.variable(observer("traces")).define("traces", ["xray","trace_ids"], _traces);
  main.variable(observer()).define(["traces","mutable batches_fetched"], _100);
  main.variable(observer()).define(["viewof trace_ids","insert_traces"], _101);
  main.variable(observer("search_params")).define("search_params", ["URLSearchParams","location"], _search_params);
  main.variable(observer("AWS")).define("AWS", ["require","FileAttachment"], _AWS);
  main.variable(observer("aws")).define("aws", _aws);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  const child2 = runtime.module(define2).derive(["db"], main);
  main.import("exportDuckDB", child2);
  main.import("importDuckDB", child2);
  main.import("download", child2);
  main.import("includeFiles", child2);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  main.variable(observer("d3FlameGraph")).define("d3FlameGraph", ["require"], _d3FlameGraph);
  return main;
}
