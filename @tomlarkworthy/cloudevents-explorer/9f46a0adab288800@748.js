import define1 from "./67d1b2c32f1883c4@669.js";
import define2 from "./f92778131fd76559@1208.js";
import define3 from "./048a17a165be198d@271.js";

function _1(md){return(
md`# [CloudEvents](https://github.com/cloudevents/spec/blob/v1.0.1/spec.md) Explorer

Events are an extremely common concept in computers to decouple generic producers and consumers. For instance, Zapier allows actions to be triggers by events. Github exposes subscriptions of repository events in their API. Kubernetes has an internal events bus etc.

There is no standard for what an events should look like. The [Cloud Native Computing Foundation (CNCF)](https://cncf.io/) had a stab at it though, so I will use their deliberations as a base for event driven work. 

*"CloudEvents is a vendor-neutral specification for defining the format of event data." https://github.com/cloudevents/spec/blob/v1.0.1/spec.md*

It defines some useful common metadata (id, time, type, source and subject) along with an opaque data payload and the data encoding formal (e.g. JSON/gRPC).

This notebook is a UI component for exploring some deserialized CloudEvent data drawn from *somewhere* using Plot. For the demo I have taken some IP network data and transformed put it in the CloudEvents envelope. This dataset has too many pointscand dimensions which messes up the scale.
`
)}

function _eventExplorer(_,tooltip,Plot,addTooltips){return(
(events, settings) => {
  let options = {
    ...(settings.xDim && { x: (d) => _.get(d, settings.xDim) }),
    ...(settings.yDim && { y: (d) => _.get(d, settings.yDim) }),
    ...(settings.zDim && { z: (d) => _.get(d, settings.zDim) }),
    ...(settings.fillDim && { fill: (d) => _.get(d, settings.fillDim) }),
    ...(settings.strokeDim && { stroke: (d) => _.get(d, settings.strokeDim) }),
    title: tooltip
  };

  options = settings.groupX
    ? Plot.groupX({ y: settings.groupX }, options)
    : options;
  options = settings.groupY
    ? Plot.groupY({ x: settings.groupY }, options)
    : options;

  return addTooltips(
    Plot.plot({
      x: {
        //type: "time"
      },
      facet: {
        data: events,
        ...(settings.facetX && { x: (d) => _.get(d, settings.facetX) }),
        ...(settings.facetY && { y: (d) => _.get(d, settings.facetY) })
      },
      marks: [_.get(Plot, settings.mark)(events, options)]
    })
  );
}
)}

function _3(md){return(
md`### Demo Data: IP Network Traffic Flows Labeled with 75 Apps
*Labeled IP flows with their Application Protocol*

source: https://www.kaggle.com/jsrojas/ip-network-traffic-flows-labeled-with-87-apps`
)}

function _4($0,_,Event,htl,Inputs)
{
  const preset = (args) => {
    $0.value = _.merge($0.value, args);
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  };
  return htl.html`
    <h4>Demo Presets</h4>
    <div style="display: flex">
      ${Inputs.button("Bytes/sec per LABEL over time", {
        reduce: () => {
          preset({
            mark: "barY",
            xDim: "time",
            yDim: "data.flow_bytes_s",
            zDim: null,
            strokeDim: null,
            fillDim: null,
            facetX: null,
            facetY: "data.protocolname",
            groupX: "sum",
            groupY: null
          });
        }
      })}

      ${Inputs.button("sourceports", {
        reduce: () => {
          preset({
            mark: "barY",
            xDim: "data.source_port",
            yDim: null,
            zDim: null,
            strokeDim: null,
            fillDim: null,
            facetX: null,
            facetY: null,
            groupX: "count",
            groupY: null
          });
        }
      })}

      ${Inputs.button("fwd_packets_s", {
        reduce: () => {
          preset({
            mark: "tickX",
            xDim: "data.fwd_packets_s",
            yDim: null,
            zDim: null,
            strokeDim: null,
            fillDim: null,
            facetX: null,
            facetY: null,
            groupX: null,
            groupY: null
          });
        }
      })}

    `;
}


function _5(md,settings){return(
md`

Code for the graph below
~~~js
eventExplorer(data, ${JSON.stringify(
  Object.fromEntries(Object.entries(settings).filter(([k, v]) => v)),
  null,
  2
)})
~~~

`
)}

function _settings(view,Inputs,marks,dims,reducers){return(
view`<div>
  ${[
    "mark",
    Inputs.select(marks, {
      label: "mark"
    })
  ]}
  ${[
    "xDim",
    Inputs.select([undefined].concat(dims), {
      label: "xDim"
    })
  ]}
  ${[
    "yDim",
    Inputs.select([undefined].concat(dims), {
      label: "yDim"
    })
  ]}
  ${[
    "zDim",
    Inputs.select([undefined].concat(dims), {
      label: "zDim"
    })
  ]}
  ${[
    "strokeDim",
    Inputs.select([undefined].concat(dims), {
      label: "strokeDim"
    })
  ]}
  ${[
    "fillDim",
    Inputs.select([undefined].concat(dims), {
      label: "fillDim"
    })
  ]}
  ${[
    "facetX",
    Inputs.select([undefined].concat(dims), {
      label: "facetX"
    })
  ]}
  ${[
    "facetY",
    Inputs.select([undefined].concat(dims), {
      label: "facetY"
    })
  ]}
  ${[
    "groupX",
    Inputs.select([undefined].concat(reducers), {
      label: "groupX"
    })
  ]}
  ${[
    "groupY",
    Inputs.select([undefined].concat(reducers), {
      label: "groupY"
    })
  ]}
`
)}

function _exampleEventExplorer(eventExplorer,events,settings){return(
eventExplorer(events, settings)
)}

function _8(md){return(
md`### Cloud events`
)}

function _createEvent(randomId){return(
(args) => ({
  specversion: "1.0",
  id: randomId(),
  time: new Date(),
  type: "default",
  source: "createEvent()",
  subject: "default",
  datacontenttype: "application/json",
  data: undefined,
  ...args
})
)}

function _exampleEvent(createEvent){return(
createEvent()
)}

function _storedSettings(localStorageView){return(
localStorageView("settings", { json: true })
)}

function _pageLoad(_,$0,$1)
{
  _.merge($0.value, {
    // Default if no data in storage
    mark: "tickX",
    xDim: "data.fwd_packets_s"
  });
  _.merge($0.value, $1.value);
}


function _saveToStorage(pageLoad,Inputs,$0,$1){return(
pageLoad, Inputs.bind($0, $1)
)}

function _randomId(){return(
() => Math.random().toString(16).substring(2, 12)
)}

function _events(ipNetwork){return(
ipNetwork
)}

function _reducers(){return(
[
  "count",
  "sum",
  "proportion",
  "min",
  "max",
  "mean",
  "median",
  "variance",
  "deviation",
  "first",
  "last"
]
)}

function _marks(){return(
["dot", "tickX", "tickY", "barX", "barY", "cell", "line", "rect"]
)}

function _tooltip(){return(
(d) => JSON.stringify(d, null, 2)
)}

function _dims(events){return(
Object.keys(events[0])
  .filter((k) => k !== "data")
  .concat(Object.keys(events[0].data).map((k) => "data." + k))
)}

function _ipNetwork(d3,network_csv,createEvent)
{
  const parseTime = d3.timeParse("%d/%m/%Y%H:%M:%S");
  return network_csv.map((d) =>
    createEvent({
      time: parseTime(d.Timestamp),
      subject: d["Flow.ID"],
      data: Object.fromEntries(
        Object.entries(d).map(([key, v]) => {
          key = key.toLowerCase().replaceAll(".", "_");
          if (key.includes("total")) return [key, Number.parseInt(v)];
          if (key.includes("count")) return [key, Number.parseInt(v)];
          if (key.includes("mean")) return [key, Number.parseFloat(v)];
          if (key.includes("std")) return [key, Number.parseFloat(v)];
          if (key.includes("port")) return [key, Number.parseInt(v)];
          if (key.includes("bytes_s")) return [key, Number.parseFloat(v)];
          if (key.includes("packets_s")) return [key, Number.parseFloat(v)];
          if (key.includes("min")) return [key, Number.parseFloat(v)];
          if (key.includes("max")) return [key, Number.parseFloat(v)];
          if (key.includes("duration")) return [key, Number.parseInt(v)];

          if (key == "timestamp") return [key, parseTime(v)];
          return [key, v];
        })
      )
    })
  );
}


async function _network_csv(FileAttachment){return(
(
  await FileAttachment("Dataset-Unicauca-Version2-10k.csv.zip").zip()
)
  .file("Dataset-Unicauca-Version2-10k.csv")
  .csv()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Dataset-Unicauca-Version2-10k.csv.zip", {url: new URL("./files/568e83457bc29736d38fbcefe049fd03eda831cae7e4f385f29d506148410f6e459923084cf985eabd70ea18cc4b4c818f0890f3f01b573ffe7377d14358eeab.zip", import.meta.url), mimeType: "application/zip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("eventExplorer")).define("eventExplorer", ["_","tooltip","Plot","addTooltips"], _eventExplorer);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["viewof settings","_","Event","htl","Inputs"], _4);
  main.variable(observer()).define(["md","settings"], _5);
  main.variable(observer("viewof settings")).define("viewof settings", ["view","Inputs","marks","dims","reducers"], _settings);
  main.variable(observer("settings")).define("settings", ["Generators", "viewof settings"], (G, _) => G.input(_));
  main.variable(observer("viewof exampleEventExplorer")).define("viewof exampleEventExplorer", ["eventExplorer","events","settings"], _exampleEventExplorer);
  main.variable(observer("exampleEventExplorer")).define("exampleEventExplorer", ["Generators", "viewof exampleEventExplorer"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("createEvent")).define("createEvent", ["randomId"], _createEvent);
  main.variable(observer("exampleEvent")).define("exampleEvent", ["createEvent"], _exampleEvent);
  main.variable(observer("viewof storedSettings")).define("viewof storedSettings", ["localStorageView"], _storedSettings);
  main.variable(observer("storedSettings")).define("storedSettings", ["Generators", "viewof storedSettings"], (G, _) => G.input(_));
  main.variable(observer("pageLoad")).define("pageLoad", ["_","viewof settings","viewof storedSettings"], _pageLoad);
  main.variable(observer("saveToStorage")).define("saveToStorage", ["pageLoad","Inputs","viewof storedSettings","viewof settings"], _saveToStorage);
  main.variable(observer("randomId")).define("randomId", _randomId);
  main.variable(observer("events")).define("events", ["ipNetwork"], _events);
  main.variable(observer("reducers")).define("reducers", _reducers);
  main.variable(observer("marks")).define("marks", _marks);
  main.variable(observer("tooltip")).define("tooltip", _tooltip);
  main.variable(observer("dims")).define("dims", ["events"], _dims);
  const child1 = runtime.module(define1);
  main.import("addTooltips", child1);
  main.variable(observer("ipNetwork")).define("ipNetwork", ["d3","network_csv","createEvent"], _ipNetwork);
  main.variable(observer("network_csv")).define("network_csv", ["FileAttachment"], _network_csv);
  const child2 = runtime.module(define2);
  main.import("view", child2);
  const child3 = runtime.module(define3);
  main.import("localStorageView", child3);
  return main;
}
