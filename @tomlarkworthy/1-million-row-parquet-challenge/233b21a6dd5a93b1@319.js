import define1 from "./dbccb61ed5c98951@430.js";

function _1(md){return(
md`# 1 Million Row Parquet Challenge`
)}

function _2(md){return(
md`## Datasets

On Github, 2M rows https://github.com/tomlarkworthy/datasets of S&P 500 data ([Kaggle](https://www.kaggle.com/datasets/gratefuldata/intraday-stock-data-1-min-sp-500-200821?resource=download)). Multiple symbols, so we can exploit parquet format to pull columns. Uncompressed dataset is 138.77 MB, most of the compression algorithms get to about 35 MB.

I have tried out DuckDb and Hyparquet.`
)}

function _compression(Inputs){return(
Inputs.select(["zstd", "gzip", "snappy", "br"], {
  label: "compression"
})
)}

function _PARQUET_URL(compression){return(
`https://tomlarkworthy.github.io/datasets/1_min_SPY_2008-2021.${compression}.parquet`
)}

function _5(md){return(
md`# DuckDB`
)}

function _6(md){return(
md`# Results

In dev tools disable cache and load page, order by size. In my system duckdb issues range queries (206) to reduce transfers.

DuckDB.wasm + its parquet extension itself is biggest download at 7.6Mb

Despite the underlying datasets being 138Mb uncompressed, 35Mb compressed, only 6MB is transfered for 1M rows.

It took 6 seconds to transfer the data (my internet or Github is slow)
It takes 5 seconds on my machine to fully render a scatter of that and my browser goes jerky when the page reflows (the SVG is heavy)
It only takes 0.3 to render a histogram of the same 1M datapoints.

DuckDB is not the only library that can use range queries to slice parquet files, so the 7MB might be avoidable.`
)}

function _duckdb(Inputs){return(
Inputs.toggle({ label: "do duckdb" })
)}

function _image(FileAttachment){return(
FileAttachment("image.png").image()
)}

function _9(md){return(
md`## DuckDB is 7MB :S`
)}

function _db(DuckDBClient){return(
DuckDBClient.of({})
)}

function _12(md){return(
md`## Getting the metadata is instant!

It is *not* loading 37MB`
)}

function _13(PARQUET_URL,__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`DESCRIBE SELECT * FROM parquet_scan(${PARQUET_URL})`
)}

function _14(md){return(
md`## Draw a 1M scatter plot`
)}

async function _average_time(duckdb,db,PARQUET_URL,parseCustomDate)
{
  if (!duckdb) throw "Enable Duck DB";
  const startTime = performance.now();
  const result = (
    await db.query(
      `SELECT average, date FROM parquet_scan('${PARQUET_URL}') LIMIT 1000000`
    )
  ).map((r) => ({ ...r, date: parseCustomDate(r.date) }));
  result.fetchTime = performance.now() - startTime;
  return result;
}


function _16(average_time){return(
average_time.fetchTime
)}

function _parseCustomDate(){return(
function parseCustomDate(dateString) {
  // Trim and split on one or more whitespace characters
  const [datePart, timePart] = dateString.trim().split(/\s+/);

  // Extract year, month, day from the datePart (YYYYMMDD)
  const year = parseInt(datePart.slice(0, 4), 10);
  const month = parseInt(datePart.slice(4, 6), 10) - 1; // JS months are 0-indexed
  const day = parseInt(datePart.slice(6, 8), 10);

  // Extract hours, minutes, seconds from the timePart (HH:MM:SS)
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Create and return the Date object (local time)
  return new Date(year, month, day, hours, minutes, seconds);
}
)}

function _18(md){return(
md`# Visualizations`
)}

function _do_scatter(Inputs){return(
Inputs.toggle({ label: "draw scatter (slow!)" })
)}

function _scatter(do_scatter,Plot,average_time)
{
  if (!do_scatter) return;
  const startTime = performance.now();

  const plot = Plot.plot({
    marks: [Plot.dot(average_time, { x: "date", y: "average", tip: true })]
  });

  plot.renderTime = performance.now() - startTime;

  return plot;
}


function _21(do_scatter,scatter){return(
do_scatter && scatter.renderTime
)}

function _histogram(Plot,average_time)
{
  const startTime = performance.now();
  const plot = Plot.plot({
    marks: [
      Plot.rectY(average_time, Plot.binX({ y: "count" }, { x: "average" })),
      Plot.ruleY([0])
    ]
  });
  plot.renderTime = performance.now() - startTime;
  return plot;
}


function _23(histogram){return(
histogram.renderTime
)}

function _density(Plot,average_time)
{
  const startTime = performance.now();

  const plot = Plot.plot({
    marks: [
      Plot.density(average_time, {
        x: "date",
        y: "average",
        stroke: "blue",
        strokeWidth: 0.25
      })
    ]
  });

  plot.renderTime = performance.now() - startTime;

  return plot;
}


function _25(density){return(
density.renderTime
)}

function _binned(Plot,average_time)
{
  const startTime = performance.now();

  const plot = Plot.plot({
    marks: [Plot.rect(average_time, Plot.bin({}, { x: "date", y: "average" }))]
  });

  plot.renderTime = performance.now() - startTime;

  return plot;
}


function _27(binned){return(
binned.renderTime
)}

function _28(md){return(
md`# Hyparquet

Hyparquet is much faster than DuckDB at reading and converting, but it will do a single range query for two columns, even if it makes sense to do two seperate ranges, so you need to split your column reads which does provide the opertunity for parrellelization`
)}

function _hyparquet(){return(
import("https://cdn.jsdelivr.net/npm/hyparquet@1.17.8/+esm")
)}

function _compressors(){return(
import(
  "https://cdn.jsdelivr.net/npm/hyparquet-compressors@1.1.1/+esm"
)
)}

function _hypa_read_objects(Inputs){return(
Inputs.toggle({ label: "do hypa_read_objects" })
)}

function _start_time(hypa_read_objects){return(
hypa_read_objects && performance.now()
)}

async function _hypa_data_date(hypa_read_objects,hyparquet,PARQUET_URL,compressors,parseCustomDate)
{
  if (!hypa_read_objects) throw "enable hyparquet";
  const file = await hyparquet.asyncBufferFromUrl({ url: PARQUET_URL }); // wrap url for async fetching
  const startTime = performance.now();
  const data = await hyparquet.parquetReadObjects({
    file,
    columns: ["date"],
    rowStart: 0,
    rowEnd: 1000000, // These don't affect data read! we need rowLimit
    compressors: compressors.compressors
  });

  const fetchTime = performance.now() - startTime;
  const munged = data.map((r) => ({ date: parseCustomDate(r.date) }));
  munged.mungeTime = performance.now() - startTime;
  munged.fetchTime = fetchTime;
  return munged;
}


function _34(PARQUET_URL){return(
PARQUET_URL
)}

async function _hypa_data_average(hypa_read_objects,hyparquet,PARQUET_URL,compressors)
{
  if (!hypa_read_objects) return [];
  const file = await hyparquet.asyncBufferFromUrl({ url: PARQUET_URL }); // wrap url for async fetching
  const startTime = performance.now();
  const data = await hyparquet.parquetReadObjects({
    file,
    columns: ["average"],
    rowStart: 0,
    rowEnd: 1000000, // These don't affect data read! we need rowLimit
    compressors: compressors.compressors
  });

  data.fetchTime = performance.now() - startTime;
  return data;
}


function _36(hypa_data_date){return(
hypa_data_date.fetchTime
)}

function _37(hypa_data_average){return(
hypa_data_average.fetchTime
)}

function _38(hypa_data_date){return(
hypa_data_date.mungeTime
)}

function _total_time(hypa_data_average,hypa_data_date,start_time){return(
hypa_data_average &&
  hypa_data_date &&
  performance.now() - start_time
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/269ab9e1c5c8a72469706c8ada6f6998b41ba82941c2ed977f2b90199a68f8b0783e441d1d12253a18ab6919ac6e3e0dc10b9c7e46f3286bb65ea1108a39eb59.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof compression")).define("viewof compression", ["Inputs"], _compression);
  main.variable(observer("compression")).define("compression", ["Generators", "viewof compression"], (G, _) => G.input(_));
  main.variable(observer("PARQUET_URL")).define("PARQUET_URL", ["compression"], _PARQUET_URL);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof duckdb")).define("viewof duckdb", ["Inputs"], _duckdb);
  main.variable(observer("duckdb")).define("duckdb", ["Generators", "viewof duckdb"], (G, _) => G.input(_));
  main.variable(observer("image")).define("image", ["FileAttachment"], _image);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("DuckDBClient_latest", "DuckDBClient", child1);
  main.variable(observer("db")).define("db", ["DuckDBClient"], _db);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["PARQUET_URL","__query","db","invalidation"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("average_time")).define("average_time", ["duckdb","db","PARQUET_URL","parseCustomDate"], _average_time);
  main.variable(observer()).define(["average_time"], _16);
  main.variable(observer("parseCustomDate")).define("parseCustomDate", _parseCustomDate);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof do_scatter")).define("viewof do_scatter", ["Inputs"], _do_scatter);
  main.variable(observer("do_scatter")).define("do_scatter", ["Generators", "viewof do_scatter"], (G, _) => G.input(_));
  main.variable(observer("scatter")).define("scatter", ["do_scatter","Plot","average_time"], _scatter);
  main.variable(observer()).define(["do_scatter","scatter"], _21);
  main.variable(observer("histogram")).define("histogram", ["Plot","average_time"], _histogram);
  main.variable(observer()).define(["histogram"], _23);
  main.variable(observer("density")).define("density", ["Plot","average_time"], _density);
  main.variable(observer()).define(["density"], _25);
  main.variable(observer("binned")).define("binned", ["Plot","average_time"], _binned);
  main.variable(observer()).define(["binned"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("hyparquet")).define("hyparquet", _hyparquet);
  main.variable(observer("compressors")).define("compressors", _compressors);
  main.variable(observer("viewof hypa_read_objects")).define("viewof hypa_read_objects", ["Inputs"], _hypa_read_objects);
  main.variable(observer("hypa_read_objects")).define("hypa_read_objects", ["Generators", "viewof hypa_read_objects"], (G, _) => G.input(_));
  main.variable(observer("start_time")).define("start_time", ["hypa_read_objects"], _start_time);
  main.variable(observer("hypa_data_date")).define("hypa_data_date", ["hypa_read_objects","hyparquet","PARQUET_URL","compressors","parseCustomDate"], _hypa_data_date);
  main.variable(observer()).define(["PARQUET_URL"], _34);
  main.variable(observer("hypa_data_average")).define("hypa_data_average", ["hypa_read_objects","hyparquet","PARQUET_URL","compressors"], _hypa_data_average);
  main.variable(observer()).define(["hypa_data_date"], _36);
  main.variable(observer()).define(["hypa_data_average"], _37);
  main.variable(observer()).define(["hypa_data_date"], _38);
  main.variable(observer("total_time")).define("total_time", ["hypa_data_average","hypa_data_date","start_time"], _total_time);
  return main;
}
