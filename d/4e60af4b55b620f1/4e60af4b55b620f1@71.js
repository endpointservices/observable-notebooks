function _1(md){return(
md`# Flaky tests`
)}

function _2(md){return(
md`### flakiness against when first encountered`
)}

function _3(Plot,data){return(
Plot.plot({
  marks: [
    Plot.dot(data, {
      x: "first_flaky_seen_at",
      y: "flakiness",
      fill: "severity",
      tip: true,
      channels: { spec_path: "spec_path", name: "title" }
    })
  ]
})
)}

function _4(md){return(
md`### When a flake was first and last encountered per test`
)}

function _5(Plot,data){return(
Plot.plot({
  marks: [
    Plot.rect(data, {
      x1: "first_flaky_seen_at", // or ([x1]) => x1
      y1: "flakiness", // or ([, y1]) => y1
      x2: "last_flaky_seen_at", // or ([,, x2]) => x2
      y2: (d) => d.flakiness + 0.001,
      fill: "severity",
      tip: true,
      channels: { spec_path: "spec_path", name: "title" }
    })
  ]
})
)}

function _data(data_raw){return(
data_raw.map((d) => ({
  ...d,
  flakiness: d.total_flaky_runs / d.total_runs
}))
)}

function _7(__query,data,invalidation){return(
__query(data,{from:{table:"data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data")
)}

function _data_raw(__query,FileAttachment,invalidation){return(
__query(FileAttachment("flaky-tests-20230831-20240830.csv"),{from:{table:"flaky-tests-20230831-20240830"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["flaky-tests-20230831-20240830.csv", {url: new URL("./files/abe416fa5634df9632acac2a35827d9cdd543f8ef9a69648b5b2a19a984fe84099a09102dde8e078c88f04932045969643dec6a4a249023605bd741fddc449f7.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Plot","data"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","data"], _5);
  main.variable(observer("data")).define("data", ["data_raw"], _data);
  main.variable(observer()).define(["__query","data","invalidation"], _7);
  main.variable(observer("data_raw")).define("data_raw", ["__query","FileAttachment","invalidation"], _data_raw);
  return main;
}
