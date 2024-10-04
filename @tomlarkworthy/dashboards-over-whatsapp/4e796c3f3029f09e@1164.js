// https://observablehq.com/@tomlarkworthy/dashboards-over-whatsapp@1164
import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./6eda90668ae03044@836.js";
import define3 from "./576f8943dbfbd395@114.js";
import define4 from "./0e0b35a92c819d94@444.js";
import define5 from "./ac2d8dc9041d3373@100.js";
import define6 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Building a SMART FARM EP03: Dashboards over WhatsApp
`
)}

function _2(width,md){return(
md`So far our SMART FARM has data storage provided by Firebase ([EP01](https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07)), and it is actively ingesting data from real farms in Colombia using Blues Wireless cellular connection ([EP02](https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14)). In this episode we enable workers to request for Dataviz to be beamed to their phones via WhatsApp. 

We use [Observable's amazing inbuilt Plot](https://observablehq.com/@observablehq/plot) to generate realtime dashboards. We use [Twilio](https://www.twilio.com/)'s [WhatsApp API](https://www.twilio.com/docs/whatsapp/quickstart/curl) to send charts encoded as images, and implemented the webhooks in real time using [webcode.run](https://webcode.run) (teaser below)

<video controls="controls" width="${Math.min(width, 640)}" height="400" loop name="Video Name">
  <source src="https://storage.googleapis.com/publicartifacts/blogimages/notebookwebhook.mov">
</video>


There were lots of challenges along the way! We had to whip up an inline server to serve SVG and PNG images, so that we could pass the image data to Twilio as a publicly addressable URL. We also used WEBCode as a webhook to receive chat notifications. Our SMART FARM is becoming useful!!!`
)}

function _3(md){return(
md`## Full episode`
)}

function _4(width,videoStartAt,htl){return(
htl.html`<iframe width="${Math.min(width, 640)}" height="350" src="https://www.youtube.com/embed/F3dzaYnA7E4?start=${videoStartAt}&autoplay=${videoStartAt > 10 ? 1 : 0}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>`
)}

function _videoStartAt(Inputs){return(
Inputs.select(
  new Map([
    ["recap", 0],
    ["about the data and collection", 45],
    ["send a message to WhatsApp", 1440],
    ["send a Plot chart", 2165],
    [
      "Q&A: Why choose Realtime Database over Firestore (for IoT workloads)?",
      3096
    ],
    ["Respond to incoming messages", 3252]
  ]),
  {
    label: "Jump to video location"
  }
)
)}

function _6(width,md){return(
md`## Tarot of the Day
*What will happen to the price of Bitcoin in the next week?*

<a target="_blank" href="https://thetarot.online/-N563Dk450XXX2VlC_vc"><img 
width=${Math.min(width, 640)}                                                                         src="https://storage.googleapis.com/download/storage/v1/b/larkworthy-dfb11.appspot.com/o/@tomlarkworthy%2Ftarot-backend%2Fimages%2F-N563Dk450XXX2VlC_vc?generation=1655828444337017&alt=media">
</img></a>

`
)}

function _7(md){return(
md`## Database (EP01)`
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

function _11(md){return(
md`## Realtime Temperature Dashboard (EP02)`
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

function _14(md){return(
md`### streaming query (realtime updates)`
)}

function _liveViewRaw(Generators,db,querySensorName){return(
Generators.observe((notify) => {
  db.ref(`history/sensors/${querySensorName}`)
    .orderByKey()
    .startAt(Math.floor(Date.now() / 1000 - 60 * 60 * 24) + "") // reduce data returned
    .on("value", (snapshot) => {
      const data = snapshot.val();
      notify(data);
    });
})
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
    notify(data);
  });
})
)}

function _19(md){return(
md`## Aims for this Week (Bidirectional WhapsApp integration)

- Send dashboards over whatsapp
- Respond to inbound request for data

We followed the quickstart of [The WhatsApp Business API with Twilio](https://www.twilio.com/docs/whatsapp)`
)}

function _20(md){return(
md`### Twilio Integration`
)}

function _TWILIO_ACCOUNT_SID(){return(
"AC10f48e9a0e14f3ea9f27edad5a72929c"
)}

function _TWILIO_AUTH_TOKEN(Inputs){return(
Inputs.password()
)}

function _23(md){return(
md`### Test call

We used the following cell to test we can send a message`
)}

function _sendMessage(Inputs){return(
Inputs.button("sendMessage to Twilio API")
)}

function _sendMessageResponse(sendMessage,TWILIO_ACCOUNT_SID,URLSearchParams,pngLink,TWILIO_AUTH_TOKEN,invalidation){return(
sendMessage !== 0
  ? fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        body: new URLSearchParams(
          Object.entries({
            From: "whatsapp:+14155238886",
            To: "whatsapp:+4915114338654",
            Body: "new image",
            MediaUrl: pngLink.href //"https://webcode.run/observablehq.com/d/4e796c3f3029f09e;svg"
          })
        ).toString(),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: `Basic ${btoa(
            TWILIO_ACCOUNT_SID + ":" + TWILIO_AUTH_TOKEN
          )}`
        }
      }
    )
  : invalidation
)}

function _26(sendMessageResponse){return(
sendMessageResponse.json()
)}

function _27(md){return(
md`Next we tried to send an image as well using the tutorial [How to Send a Picture on WhatsApp Using Twilio and JavaScript](https://www.twilio.com/blog/how-to-send-picture-whatsapp-using-twilio-and-javascript)`
)}

function _dashboardEndpoint(endpoint,serialize,dashboard){return(
endpoint("svg", async (req, res) => {
  res.header("content-type", "image/svg+xml");
  const arrayBuffer = await serialize(dashboard).arrayBuffer();
  res.send(arrayBuffer);
})
)}

function _29(md){return(
md`We needed to serialize the SVG, we used Mike Bostock's excellent notebook to help. In the stream I copy and pasted it but since I have replaced it with an import.`
)}

function _31(md){return(
md`To test we are serving the SVG properly, we put it in a HTML \`<img>\` element`
)}

function _32(dashboardEndpoint,htl){return(
htl.html`<img src="${dashboardEndpoint.href}">`
)}

function _33(md){return(
md`As it turned out SVG was not supported so we rasterized it and used PNG instead. That worked!`
)}

function _pngLink(endpoint,rasterize,dashboard){return(
endpoint("png", async (req, res) => {
  res.header("content-type", "image/png");
  const blob = await rasterize(dashboard);
  const arrayBuffer = await blob.arrayBuffer();
  res.send(arrayBuffer);
})
)}

function _35(md){return(
md`## Webhook

Next we built our very basic bot that would respond to requests over WhatsApp. First we needed a webhook to receive events from Twilio's WhatsApp service.`
)}

function _whatsapp_webhook(endpoint,$0){return(
endpoint("whatsapp_webhook", async (req, res, ctx) => {
  try {
    const response = await $0.send({
      req,
      res,
      ctx
    });
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
})
)}

function _37(md){return(
md`Like in EP02, we spread a complex server over several Observable dataflow cells using a [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue)`
)}

function _whatsappEvent(flowQueue){return(
flowQueue()
)}

function _40(whatsappEvent){return(
whatsappEvent
)}

function _whatsappIncoming(URLSearchParams,whatsappEvent){return(
Object.fromEntries(
  new URLSearchParams(whatsappEvent.req.body).entries()
)
)}

function _msg(whatsappIncoming){return(
whatsappIncoming.Body
)}

function _chatResponse(TWILIO_AUTH_TOKEN,whatsappEvent,msg,TWILIO_ACCOUNT_SID,URLSearchParams,whatsappIncoming,pngLink,latest)
{
  const token = // Get the token from secrets if not in the notebook
    TWILIO_AUTH_TOKEN || whatsappEvent.ctx.secrets["TWILIO_AUTH_TOKEN"];

  if (msg === "chart") {
    fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        body: new URLSearchParams(
          Object.entries({
            From: "whatsapp:+14155238886",
            To: whatsappIncoming.From,
            Body: "Your chart:",
            MediaUrl: pngLink.href
          })
        ).toString(),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: `Basic ${btoa(TWILIO_ACCOUNT_SID + ":" + token)}`
        }
      }
    );
    return "Sending chart";
  } else {
    fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        body: new URLSearchParams(
          Object.entries({
            From: "whatsapp:+14155238886",
            To: whatsappIncoming.From,
            Body: `The sensor's last payload is ${JSON.stringify(
              latest["dev:864475046457429"].body
            )}`
          })
        ).toString(),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          authorization: `Basic ${btoa(TWILIO_ACCOUNT_SID + ":" + token)}`
        }
      }
    );
    return "Sending latest payload";
  }
}


function _whatsappEventResolver(chatResponse,$0)
{
  chatResponse;
  $0.resolve("OK");
}


async function _45(FileAttachment,width,md){return(
md`## Conclusion

We can 

- Serve Plot Dashboards over a URL
- Send and receive WhatsApp chat messages!
- Send live Dashboard data over WhatsApp!

${await FileAttachment("image@2.png").image({style: `max-width: ${Math.min(width, 640)}px`})}`
)}

function _46(md){return(
md`## Next week`
)}

function _48(upcoming){return(
upcoming
)}

function _49(md){return(
md`## Dependancies`
)}

function _51(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@2.png", {url: new URL("./files/84860490bf27ecde88d6e9c15a6be8380a770e61ede5365b062b2ce4845623a4694dbdb7421c44a72224647b6f894827831aee452000f2faf90115348a90f31c.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["width","md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["width","videoStartAt","htl"], _4);
  main.variable(observer("viewof videoStartAt")).define("viewof videoStartAt", ["Inputs"], _videoStartAt);
  main.variable(observer("videoStartAt")).define("videoStartAt", ["Generators", "viewof videoStartAt"], (G, _) => G.input(_));
  main.variable(observer()).define(["width","md"], _6);
  main.variable(observer()).define(["md"], _7);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof querySensorName")).define("viewof querySensorName", ["Inputs","latest"], _querySensorName);
  main.variable(observer("querySensorName")).define("querySensorName", ["Generators", "viewof querySensorName"], (G, _) => G.input(_));
  main.variable(observer("dashboard")).define("dashboard", ["Plot","liveView"], _dashboard);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("liveViewRaw")).define("liveViewRaw", ["Generators","db","querySensorName"], _liveViewRaw);
  main.variable(observer("liveView")).define("liveView", ["liveViewRaw"], _liveView);
  main.variable(observer("latest")).define("latest", ["Generators","db"], _latest);
  const child2 = runtime.module(define2);
  main.import("endpoint", child2);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("TWILIO_ACCOUNT_SID")).define("TWILIO_ACCOUNT_SID", _TWILIO_ACCOUNT_SID);
  main.variable(observer("viewof TWILIO_AUTH_TOKEN")).define("viewof TWILIO_AUTH_TOKEN", ["Inputs"], _TWILIO_AUTH_TOKEN);
  main.variable(observer("TWILIO_AUTH_TOKEN")).define("TWILIO_AUTH_TOKEN", ["Generators", "viewof TWILIO_AUTH_TOKEN"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof sendMessage")).define("viewof sendMessage", ["Inputs"], _sendMessage);
  main.variable(observer("sendMessage")).define("sendMessage", ["Generators", "viewof sendMessage"], (G, _) => G.input(_));
  main.variable(observer("sendMessageResponse")).define("sendMessageResponse", ["sendMessage","TWILIO_ACCOUNT_SID","URLSearchParams","pngLink","TWILIO_AUTH_TOKEN","invalidation"], _sendMessageResponse);
  main.variable(observer()).define(["sendMessageResponse"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("dashboardEndpoint")).define("dashboardEndpoint", ["endpoint","serialize","dashboard"], _dashboardEndpoint);
  main.variable(observer()).define(["md"], _29);
  const child3 = runtime.module(define3);
  main.import("rasterize", child3);
  main.import("serialize", child3);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer()).define(["dashboardEndpoint","htl"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("pngLink")).define("pngLink", ["endpoint","rasterize","dashboard"], _pngLink);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("whatsapp_webhook")).define("whatsapp_webhook", ["endpoint","viewof whatsappEvent"], _whatsapp_webhook);
  main.variable(observer()).define(["md"], _37);
  const child4 = runtime.module(define4);
  main.import("flowQueue", child4);
  main.variable(observer("viewof whatsappEvent")).define("viewof whatsappEvent", ["flowQueue"], _whatsappEvent);
  main.variable(observer("whatsappEvent")).define("whatsappEvent", ["Generators", "viewof whatsappEvent"], (G, _) => G.input(_));
  main.variable(observer()).define(["whatsappEvent"], _40);
  main.variable(observer("whatsappIncoming")).define("whatsappIncoming", ["URLSearchParams","whatsappEvent"], _whatsappIncoming);
  main.variable(observer("msg")).define("msg", ["whatsappIncoming"], _msg);
  main.variable(observer("chatResponse")).define("chatResponse", ["TWILIO_AUTH_TOKEN","whatsappEvent","msg","TWILIO_ACCOUNT_SID","URLSearchParams","whatsappIncoming","pngLink","latest"], _chatResponse);
  main.variable(observer("whatsappEventResolver")).define("whatsappEventResolver", ["chatResponse","viewof whatsappEvent"], _whatsappEventResolver);
  main.variable(observer()).define(["FileAttachment","width","md"], _45);
  main.variable(observer()).define(["md"], _46);
  const child5 = runtime.module(define5);
  main.import("upcoming", child5);
  main.variable(observer()).define(["upcoming"], _48);
  main.variable(observer()).define(["md"], _49);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _51);
  return main;
}
