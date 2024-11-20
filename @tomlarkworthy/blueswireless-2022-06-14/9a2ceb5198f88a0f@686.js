import define1 from "./ac2d8dc9041d3373@68.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./6eda90668ae03044@825.js";
import define4 from "./0e0b35a92c819d94@471.js";
import define5 from "./58f3eb7334551ae6@209.js";

function _1(md){return(
md`# Building a SMART FARM EP02: Blues Wireless Integration
`
)}

function _2(md){return(
md`In this stream we setup a webhook for streaming sensor data from [Blues Wireless](https://blues.io/) into our storage backend. We heavily utilised [WEBCode](https://webcode.run)'s ability to stream production traffic into the notebook, and [Observablehq](https://observablehq.com)'s hot-code reload, to develop the code incrementally, based on real data.`
)}

function _3(width,htl){return(
htl.html`<iframe width="${Math.min(width, 640)}" height="350" src="https://www.youtube.com/embed/5KxloAcMeSE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _4(md){return(
md`Video places of interest
- start of tech demo: (https://youtu.be/5KxloAcMeSE?t=854)`
)}

function _5(md){return(
md`## Bugfixes since Stream

The endpoint was not storing data when not live tunnelled, this was because the Firebase *set* commands were executed asynchronously (I forgot to *await*). After making them await they threw an error. The error was "permission denied", which is because we require logged in users to write, and the server did not have permission. The fix was to add a *signAnonymously* call before firebase set `
)}

function _7(width,md){return(
md`## LiveStream Tarot
<a target="_blank" href="https://thetarot.online/-N4Xx6RDQegejTqFIwcj"><img 
width=${Math.min(width, 640)}                                                                         src="https://storage.googleapis.com/download/storage/v1/b/larkworthy-dfb11.appspot.com/o/@tomlarkworthy%2Ftarot-backend%2Fimages%2F-N4Xx6RDQegejTqFIwcj?generation=1655222599459640&alt=media">
</img></a>`
)}

function _8(md){return(
md`## Agropatterns
- Helping farmers optimize their processes.
- Predict time-to-market better (e.g. Valetine's day).`
)}

function _9(md){return(
md`## Previously

- [Last time](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07) we setup a Firebase database for writing sensor data into
- Also we used Firebase to make a realtime query and streamed into a Plot`
)}

async function _10(FileAttachment,width,md){return(
md`## Aims
- Ingest data from Blues Wireless' [notehub.io](https://notehub.io/) and put into database
- visualize, see target graph below

${await FileAttachment("image.png").image({style: `width: ${Math.min(width, 640)}px`})}`
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

function _12(md){return(
md`## Database`
)}

function _db(firebase){return(
firebase.database()
)}

function _15(md){return(
md`## Realtime Temperature Dashboard `
)}

function _sensor8393(FileAttachment){return(
FileAttachment("sensor8393.png").image({width: 640})
)}

function _17(querySensorName){return(
querySensorName
)}

function _querySensorName(Inputs,latest){return(
Inputs.select(Object.keys(latest), {
  label: "Choose sensor to chart",
  ...(this?.value && { value: this.value }) // Fix to make it remember across cell reevaluations
})
)}

function _19(Plot,liveView){return(
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
      liveView.filter((d) => d?.body?.temperature), // Fix for unfiltering data serverside
      {
        stroke: "#0003",
        x: (d) => new Date(d.when * 1000),
        y: (d) => d.body.temperature
      }
    ),
    Plot.dot(
      liveView.filter((d) => d?.body?.temperature), // Fix for unfiltering data serverside
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

function _20(md){return(
md`*tom: I updated graphics after the show, I am not confident enough doing plot live yet!!*`
)}

function _21(md){return(
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

function _23(liveViewRaw){return(
liveViewRaw
)}

function _24(){return(
Math.floor(Date.now() / 1000 - 60 * 60 * 24)
)}

function _liveView(liveViewRaw){return(
Object.entries(liveViewRaw).map(([k, v]) => v)
)}

function _latest(Generators,db){return(
Generators.observe((notify) => {
  db.ref(`current/sensors`).on("value", (snapshot) => {
    const data = snapshot.val();
    // clear synthetic data from EP01 testings
    delete data["sensor2"];
    delete data["defaultSensorName"];
    delete data["defaultSensorName3"];
     delete data["dev:864475046457429"];
    notify(data);
  });
})
)}

function _27(md){return(
md`## Sensor Ingestion`
)}

function _29(endpoint,$0){return(
endpoint("blues_ingestion", async (request, response, context) => {
  return response.status(404).send("disabled");

  console.log(request);
  try {
    const outcome = await $0.send({
      request,
      response,
      context
    });
    response.send(outcome);
  } catch (err) {
    return response.status(err.code || 500).send(err.message);
  }
})
)}

function _31($0){return(
$0
)}

function _event(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _33(event){return(
event
)}

function _check_auth(event,$0,invalidation)
{
  if (
    event.request.headers["authorization"] !==
    `Bearer ${event.context.secrets["AGROPATTERNS"]}`
  ) {
    const error = new Error("not authorized");
    error.code = 403;
    $0.reject(error);
    return invalidation;
  } else {
    return "OK";
  }
}


function _sensor(event){return(
JSON.parse(event.request.body)
)}

async function _uploadToFirebase(check_auth,firebase,db,sensor,$0,invalidation)
{
  check_auth;
  try {
    await firebase.auth().signInAnonymously(); // Bugfix, server needs to login, could also  be done using service account in a secret
    await db.ref(`current/sensors/${sensor.device}`).set(sensor);
    await db.ref(`history/sensors/${sensor.device}/${sensor.when}`).set(sensor);
  } catch (err) {
    $0.reject(err);
    return invalidation;
  }
  return "saved";
}


function _finishProcessing($0,uploadToFirebase)
{
  $0.respond(uploadToFirebase);
}


function _38(md){return(
md`## Next Episode`
)}

function _39(upcoming){return(
upcoming
)}

function _40(md){return(
md`## Dependancies`
)}

function _42(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/80f33f34d27e168da282db65773ce17e84366921cfe5fdaf63bbd74767577b44e69fe938acbba4b9c20d29c4ff11517f0d6101742cec2e6aef90c36b36954474.png", import.meta.url), mimeType: "image/png", toString}],
    ["sensor8393.png", {url: new URL("./files/c6b6f396d7bedcc86e4491075a9975254da55bd6e5ce7780162a16c4217ce6fca0bce056e674519967052e443392f20dbc59319b15e3e13bfac194a9d5e2bbe6.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["width","htl"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("upcoming", child1);
  main.variable(observer()).define(["width","md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["FileAttachment","width","md"], _10);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _12);
  const child2 = runtime.module(define2).derive(["firebaseConfig"], main);
  main.import("firebase", child2);
  main.import("viewof user", child2);
  main.import("user", child2);
  main.import("listen", child2);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("sensor8393")).define("sensor8393", ["FileAttachment"], _sensor8393);
  main.variable(observer()).define(["querySensorName"], _17);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs","latest"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","liveView"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer()).define(["liveViewRaw"], _23);
  main.variable(observer()).define(_24);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  main.variable(observer("latest")).define("latest", ["Generators","db"], _latest);
  main.variable(observer()).define(["md"], _27);
  const child3 = runtime.module(define3);
  main.import("endpoint", child3);
  main.variable(observer()).define(["endpoint","viewof event"], _29);
  const child4 = runtime.module(define4);
  main.import("flowQueue", child4);
  main.variable(observer()).define(["viewof event"], _31);
  main.variable(observer("viewof event")).define("viewof event", ["flowQueue"], _event);
  main.variable(observer("event")).define("event", ["Generators", "viewof event"], (G, _) => G.input(_));
  main.variable(observer()).define(["event"], _33);
  main.variable(observer("check_auth")).define("check_auth", ["event","viewof event","invalidation"], _check_auth);
  main.variable(observer("sensor")).define("sensor", ["event"], _sensor);
  main.variable(observer("uploadToFirebase")).define("uploadToFirebase", ["check_auth","firebase","db","sensor","viewof event","invalidation"], _uploadToFirebase);
  main.variable(observer("finishProcessing")).define("finishProcessing", ["viewof event","uploadToFirebase"], _finishProcessing);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["upcoming"], _39);
  main.variable(observer()).define(["md"], _40);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _42);
  return main;
}
