// https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07@248
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./58f3eb7334551ae6@209.js";

function _1(md){return(
md`# Building a SMART FARM EP01: Firebase storage backend


*Tom: Well that went better than expected! We got the storage backend and a live dashboard programmed. And @gabrielcoch gave us a fascinating peek into industrialised production of flowers in Colombia.*

Recording of the Livestream below:`
)}

function _2(htl){return(
htl.html`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rkI7bEBRdLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _3(md){return(
md`## Agropatterns
- Helping farmers optimize their processes.
- Predict time-to-market better (e.g. Valetine's day).`
)}

function _4(md){return(
md`## Existing architecture for Agropatterns
- React
- Meteor
- Sensors
- Too many technologies

## Hoping Observable/Webcode.run
- consolidate stack

    `
)}

function _5(md){return(
md`## Aim for prototype
- #1 needs to work offline or through WhatsApp (works over cellular, not wifi)
    should respond to queries about where infestations are
- People gather data through a mobile
    - record data from each flow bed, manual data collection
    - Slider input, and click to next flower bed
    - 2 mins per bed
- Also data gathered
    - automated temperature and humidity
    - Internet-of-things - Blues wireless "notecard"
    -    cellular connection too!
- Countermeasures (e.g. for pests)
    - Farmers chemicals (also affected by temperature)

- Difficult optimization problems!!!!
    - find best action for Farm on given day!
  
- Insights
    - Flowers thrive under certain temperatures, and take certain speed to mature
    - Hot temperatures can slow maturation (e.g. green houses)
`
)}

function _6(md){return(
md`## Aims for this episode

- Centralize storage into a notebook
- Let's use Firebase ([helpers here](https://observablehq.com/@tomlarkworthy/firebase)) for now for storage (there will be open source alternative soon! https://observablehq.com/@tomlarkworthy/redis-backend-1)
- Later will will need to aggregate`
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

function _8(md){return(
md`## Database`
)}

function _db(firebase){return(
firebase.database()
)}

function _11(md){return(
md`## Login`
)}

function _12($0){return(
$0
)}

function _14(md){return(
md`TOM: since the live stream I added Database rules so that only logged in users can write data`
)}

function _15(md){return(
md`## Dashboard`
)}

function _16(Plot,liveView){return(
Plot.plot({
  marks: [
    Plot.lineY(liveView, { x: (d) => new Date(d.time), y: (d) => d.temp }),
    Plot.ruleY([0])
  ]
})
)}

function _17(md){return(
md`### writing sensor data`
)}

function _sensorName(Inputs){return(
Inputs.text({
  value: "defaultSensorName",
  label: "name"
})
)}

function _sensorTemperature(Inputs){return(
Inputs.range([-10, 50], {
  label: "temperature (C)",
  step: 0.1
})
)}

function _20(Inputs,uploadSensor){return(
Inputs.button("upload data", {
  reduce: () => {
    uploadSensor();
  }
})
)}

function _uploadSensor(db,sensorName,sensorTemperature){return(
function uploadSensor() {
  const time = Date.now();
  db.ref(`current/sensors/${sensorName}`).set({
    location: "-76.5 4.7",
    time,
    temp: sensorTemperature,
    battery: 0.5
  });
  db.ref(`history/sensors/${sensorName}/${time}`).set({
    location: "-76.5 4.7",
    time,
    temp: sensorTemperature,
    battery: 0.5
  });
}
)}

function _22(md){return(
md`## Reading data`
)}

function _querySensorName(Inputs){return(
Inputs.text({
  value: "defaultSensorName",
  label: "sensor to query"
})
)}

function _24(md){return(
md`### static query`
)}

async function _result(db,querySensorName){return(
(
  await db.ref(`history/sensors/${querySensorName}`).once("value")
).toJSON()
)}

function _26(md){return(
md`### streaming query (realtime updates)`
)}

function _liveViewRaw(Generators,db,querySensorName){return(
Generators.observe((notify) => {
  db.ref(`history/sensors/${querySensorName}`)
    .limitToLast(6) // reduce data returned
    .on("value", (snapshot) => {
      const data = snapshot.val();
      notify(data);
    });
})
)}

function _liveView(liveViewRaw){return(
Object.entries(liveViewRaw).map(([k, v]) => v)
)}

function _30(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["viewof user"], _12);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["Plot","liveView"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("viewof sensorName")).define("viewof sensorName", ["Inputs"], _sensorName);
  main.variable(observer("sensorName")).define("sensorName", ["Generators", "viewof sensorName"], (G, _) => G.input(_));
  main.variable(observer("viewof sensorTemperature")).define("viewof sensorTemperature", ["Inputs"], _sensorTemperature);
  main.variable(observer("sensorTemperature")).define("sensorTemperature", ["Generators", "viewof sensorTemperature"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","uploadSensor"], _20);
  main.variable(observer("uploadSensor")).define("uploadSensor", ["db","sensorName","sensorTemperature"], _uploadSensor);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("result")).define("result", ["db","querySensorName"], _result);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _30);
  return main;
}
