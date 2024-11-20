function _1(md){return(
md`# Comparing AMZ and CloudFlare's HTTP Date response header`
)}

function _skew(Inputs){return(
Inputs.range([-5000, 5000], {
  label: "skew",
  value: 0,
  step: 1
})
)}

function _local_clock(skew){return(
() => Date.now() + skew
)}

function _endpoint(Inputs){return(
Inputs.select([
  "https://s3.eu-central-1.amazonaws.com/mps3-demo",
  "https://time.endpointservices.workers.dev"
])
)}

function _sample(local_clock){return(
async (endpoint) => {
  const start_t = local_clock();
  const response = await fetch(endpoint);
  const end_t = local_clock();

  return {
    endpoint,
    remote: new Date(response.headers.get("Date")).getTime(),
    start_t,
    end_t,
    latency: end_t - start_t
  };
}
)}

function _source(Inputs){return(
Inputs.select(["use cached", "generate own"], {
  label: "data source"
})
)}

function _data(source,data_offline,sample)
{
  if (source == "use cached") return data_offline;
  const data = [];
  let i = 0;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (i++ >= 100) {
        clearInterval(timer);
        resolve(data);
      }
      Promise.all([
        sample("https://s3.eu-central-1.amazonaws.com/mps3-demo"),
        sample("https://time.endpointservices.workers.dev")
      ]).then(([aws, cf]) => {
        data.push(aws);
        data.push(cf);
      });
    }, 100);
  });
}


function _data_offline(FileAttachment){return(
FileAttachment("data (2).json").json()
)}

function _9(md){return(
md`## Cloudflare Rounds down, Amazon subtracts 1 and rounds to nearest`
)}

function _10(Plot,data_offline){return(
Plot.plot({
  x: {
    type: "utc",
    grid: true
  },

  y: {
    type: "utc",
    grid: true
  },
  color: { legend: true },
  marks: [
    Plot.dot(data_offline, {
      x: "start_t",
      y: "remote",
      stroke: "endpoint",
      tip: true
    })
  ]
})
)}

function _delta(data){return(
data.map((d) => ({
  start_dt: d.start_t - d.remote,
  end_dt: d.end_t - d.remote,
  endpoint: d.endpoint
}))
)}

function _12(md){return(
md`## start_dt distribution`
)}

function _13(Plot,delta){return(
Plot.auto(delta, {x: "start_dt", fx: "endpoint"}).plot()
)}

function _14(md){return(
md`## end_dt distribution

Cloudflare has a *very* evenly spaced offset from our time measurement when the response completes. Strongly suggesting the Date timestamp is added on the return path.`
)}

function _15(Plot,delta){return(
Plot.auto(delta, {x: "end_dt", fx: "endpoint"}).plot()
)}

function _16(md){return(
md`## latency

Most requests are really fast (< 50ms), some are much slower (>200ms). Seems like AWS s3 is faster than CF when 403ing`
)}

function _18(Plot,data){return(
Plot.auto(data, {x: "latency", fx: "endpoint"}).plot()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data (2).json", {url: new URL("./files/97725bc141f6b98ac5f5faad9edde7489123af900b054eaeaa6b971ee5b6d1f5653192a9db15435a889c9bac2a6cfe5466d7d043ee237a8cd605eb972205ea09.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof skew")).define("viewof skew", ["Inputs"], _skew);
  main.variable(observer("skew")).define("skew", ["Generators", "viewof skew"], (G, _) => G.input(_));
  main.variable(observer("local_clock")).define("local_clock", ["skew"], _local_clock);
  main.variable(observer("viewof endpoint")).define("viewof endpoint", ["Inputs"], _endpoint);
  main.variable(observer("endpoint")).define("endpoint", ["Generators", "viewof endpoint"], (G, _) => G.input(_));
  main.variable(observer("sample")).define("sample", ["local_clock"], _sample);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["source","data_offline","sample"], _data);
  main.variable(observer("data_offline")).define("data_offline", ["FileAttachment"], _data_offline);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","data_offline"], _10);
  main.variable(observer("delta")).define("delta", ["data"], _delta);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["Plot","delta"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["Plot","delta"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Plot","data"], _18);
  return main;
}
