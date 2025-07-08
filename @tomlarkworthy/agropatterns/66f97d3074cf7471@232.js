import define1 from "./6eda90668ae03044@825.js";
import define2 from "./0e0b35a92c819d94@474.js";

function _1(md){return(
md`# Agropatterns on WebCode`
)}

function _2(md){return(
md`### 8th June 2022 Fortune`
)}

function _3(md){return(
md`https://thetarot.online/-N42NHEPbBsiwdilM5oP`
)}

function _4(htl){return(
htl.html`<img src="https://storage.googleapis.com/download/storage/v1/b/larkworthy-dfb11.appspot.com/o/@tomlarkworthy%2Ftarot-backend%2Fimages%2F-N42NHEPbBsiwdilM5oP?generation=1654692851186510&alt=media">`
)}

function _5(md){return(
md`## June 9 Fortune`
)}

function _6(md){return(
md`https://thetarot.online/-N47w0hPDECBxl4k7y7I`
)}

function _screenShot20220609At105843Am(FileAttachment){return(
FileAttachment("Screen Shot 2022-06-09 at 11.00.39 AM.png").image({width: 800})
)}

function _8(md){return(
md`## Questions`
)}

function _9(md){return(
md`## Agropatterns Vision new version
- Conflict on people upvoting at same time
- PDF
- QR codes
- Offline first - Users in field uploading information about observations (i.e. multiple blights per square - about 10 squares per bed and 200 beds per greenhouse). Some of our clients have as many as 50 greenhouses in their farms.
- need distilled information (highlight areas of concern), bot messaging them directly to take action
- The application is accounting for agriculture
- Sticky traps for insects (count a couple times a week).
- New sensors for realtime data (temperature, humidity)
- Predictive analytics (extrapolate temperature)
- Target dates (e.g. crops)
- Large amounts of historical data. IoT as well as Field Observations.`
)}

function _10(md){return(
md`## High importance

- Whitelabeling.
- Offline first support in Observable.
- [Blues Wireless](www.blues.io) tech (i.e Notecard + Notehub) (CEO - Ray Ozzie). Good working relationship w/ them.
- **WhatsApp dialogue interface.** Seems there are some products out there that do just that - may be straightforward to develop our own. Top Priority given that our users are mostly out in the field. Query but also updates via simple forms (e.g. Change from Programmed Countermeasures to Applied and add time of application). NL interface would be really cool.


Storage: we will use Firebase short term`
)}

function _11(md){return(
md`### Existing techs
- Papertrail
- React / React native
- Antd as components
- Mongo
- Mongo Atlas
- Meteor Galaxy
- GraphQL
- Mapbox
- Expo
`
)}

function _12(md){return(
md`## Twitch checklist
- Guest uses skype
- OBS has virtual camera setting on, skype connection switch to OBS virtual camera, so guest sees stream view
- Observable notebook shared with guest
`
)}

function _13(md){return(
md`## Stream 1 Script

- Tom: Intro  (hello welcome to first stream etc.)
- Tom: Segue to Gabriel (Tell us about Agropatterns)
- Gabriel: _pitch_
- Tom: Intro to series: We will stream every week or two weeks various aspects of Agropatterns. So maybe pick a technical challange and determine a solution. What are you hoping to build with WEBCode/observable
- Gabriel:...
- Tom: So we need to break this down into streamable chunks. (chunks). But for this week lets concentrate on setting up the webcode environment, so we can do live debugging, and just get the basics working.`
)}

function _14(md){return(
md`## Stream 2 Script

\`\`\`

- Tom: Intro, 
       Daily Tarot reading, lol
       I am excited to ... today let's try a... webhook...
       Gabriel show us around your use of Blues Mobile
- Gabriel: ... shreenshare of dashboard stories...
           ...
           ... stories of waste
           ...
           ... and we can send that data on
- Tom
       ...<create route>
       ...<create webhook>
       ...<demo livecoding>
       ...<demo flowQueue>
       ...<demo realtime dashbord>

\`\`\``
)}

function _15(md){return(
md`## Demo`
)}

function _webhook(endpoint,$0){return(
endpoint("blues_webhook", async (req, res, ctx) => {
  console.log(req);
  try {
    await $0.send({
      req,
      res,
      ctx
    });
    res.send("OK");
  } catch (err) {
    res.status(err.code || 500).send(err.message);
  }
})
)}

function _event(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _20(event){return(
event
)}

function _21(event){return(
event.req.headers
)}

function _checkAuth(event,$0,invalidation)
{
  if (
    event.req.headers.authorization ===
    `Basic ${event.ctx.secrets["AGROPATTERNS"]}`
  ) {
  } else {
    const err = new Error("Unauthorized");
    err.code = 403;
    $0.reject(err);
    return invalidation;
  }
}


function _sensor(checkAuth,event){return(
checkAuth, JSON.parse(event.req.body)
)}

function _uploadToFirbase(sensor,Promises)
{
  sensor;
  return Promises.delay(1000, "OK");
}


function _25($0,uploadToFirbase){return(
$0.respond(uploadToFirbase)
)}

function _26(event){return(
event.req.headers
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screen Shot 2022-06-09 at 11.00.39 AM.png", {url: new URL("./files/310cffcd09f630ed71c7305e78016491db3e83bf81acba2a4825fb45bc2ffb9f23f831668f5d4724fd3bc2e707589aab4bcdf5bb49bcb9366b5b6af7edce0a46.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["htl"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("screenShot20220609At105843Am")).define("screenShot20220609At105843Am", ["FileAttachment"], _screenShot20220609At105843Am);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("webhook")).define("webhook", ["endpoint","viewof event"], _webhook);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer("viewof event")).define("viewof event", ["flowQueue"], _event);
  main.variable(observer("event")).define("event", ["Generators", "viewof event"], (G, _) => G.input(_));
  main.variable(observer()).define(["event"], _20);
  main.variable(observer()).define(["event"], _21);
  main.variable(observer("checkAuth")).define("checkAuth", ["event","viewof event","invalidation"], _checkAuth);
  main.variable(observer("sensor")).define("sensor", ["checkAuth","event"], _sensor);
  main.variable(observer("uploadToFirbase")).define("uploadToFirbase", ["sensor","Promises"], _uploadToFirbase);
  main.variable(observer()).define(["viewof event","uploadToFirbase"], _25);
  main.variable(observer()).define(["event"], _26);
  return main;
}
