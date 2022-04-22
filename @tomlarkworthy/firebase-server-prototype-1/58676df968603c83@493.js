import define1 from "./6a703b03d185f279@978.js";
import define2 from "./6eda90668ae03044@803.js";
import define3 from "./c7a3b20cec5d4dd9@659.js";
import define4 from "./0e0b35a92c819d94@413.js";
import define5 from "./293899bef371e135@225.js";

function _1(md){return(
md`# Hackable Firebase Realtime Database Server Prototype #1`
)}

function _2(md){return(
md`An Open Source reimplementation of a Firebase Realtime Database Server designed for hacking and customization. Written with moldability, readability and developer ergonomics in mind, this server records its execution traces in the notebook for maximum observability.

`
)}

function _3(md){return(
md`### What this prototype does

- Key based Listen/Get/Put
- Persist data to Redis
- HTTP long poll transport

### What this prototype doesn't do

- JSON semantics
- Query semantics
- onDisconnect semantics
- websocket transport
- REST API
- Redis security
`
)}

function _4(md){return(
md`

### Background
In a previous work we developed a tool for [reverse engineering the Firebase Realtime Database wire protocol](https://observablehq.com/@tomlarkworthy/rtdb-protocol), which included a very primitive Firebase Server Fake. Since then, we have created a [Redis driver](https://observablehq.com/@tomlarkworthy/redis) so notebooks can persist data to Redis directly, and so now we are in a position to put it all together. 

### Goal

This goal of this prototype is about getting our code layout nice, and introducing using Redis as the backing persistence store.

### It's unsecured public server

The prototype server here can be accessed using a vanilla client from *anywhere*. In this notebook we instantiate a Firebase client within the notebook to execute the tests, but it's important to note the server and client are communicating over the internet despite sharing a common notebook space.`
)}

function _5(md){return(
md`## Config`
)}

function _config(){return(
{
  redis: {
    host: "redis.webcode.run",
    port: 443,
    tls: true
  }
}
)}

function _clientConfig(){return(
{
  firebaseServer: {
    url:
      "https://webcode.run?ns=tomlarkworthy|firebase-server-prototype-1;server"
  }
}
)}

function _8(md){return(
md`### Firebase Test Client`
)}

function _appLib(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js")
)}

function _rtdb(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js")
)}

function _firebaseAppA(restartClient,appLib,clientConfig){return(
restartClient,
appLib.initializeApp(
  {
    databaseURL: clientConfig.firebaseServer.url
  },
  Math.random().toString(16) // We randomize the name so we can rerun initialization
)
)}

function _firebaseAppB(restartClient,appLib,clientConfig){return(
restartClient,
appLib.initializeApp(
  {
    databaseURL: clientConfig.firebaseServer.url
  },
  Math.random().toString(16) // We randomize the name so we can rerun initialization
)
)}

function _databaseA(rtdb,firebaseAppA)
{
  rtdb.enableLogging(true);
  return rtdb.getDatabase(firebaseAppA);
}


function _databaseB(rtdb,firebaseAppB)
{
  rtdb.enableLogging(true);
  return rtdb.getDatabase(firebaseAppB);
}


function _rootA(rtdb,databaseA){return(
rtdb.ref(databaseA, "/")
)}

function _rootB(rtdb,databaseA){return(
rtdb.ref(databaseA, "/")
)}

function _17(md){return(
md`### Redis`
)}

function _redis(createClient,config){return(
createClient({
  socket: config.redis
})
)}

function _restartClient(Inputs){return(
Inputs.button("restart client")
)}

function _suite(server,redis,createSuite){return(
server,
redis,
createSuite({
  name: "Hackable Realtime Server Test Suite"
})
)}

function _22(suite,randomString,rtdb,rootA,expect){return(
suite.test("Read your own write - Object", async () => {
  // Note: This test will pass if the server throws an error, because RT DB fallsback to local cache.
  const payload = {
    string: randomString()
  };
  const location = rtdb.child(rootA, "collection/readyourownwrite");
  await rtdb.set(location, payload);
  const response = (await rtdb.get(location)).val();
  expect(response).toEqual(payload);
})
)}

function _23(suite,randomString,rtdb,rootA,rootB,expect){return(
suite.test("Read their write - Object", async () => {
  const payload = {
    string: randomString()
  };
  const locationA = rtdb.child(rootA, "collection/readtheirwrite");
  const locationB = rtdb.child(rootB, "collection/readtheirwrite");
  await rtdb.set(locationA, payload);
  const response = await rtdb.get(locationB);
  expect(response.val()).toEqual(payload);
})
)}

function _24(redis){return(
redis.sendCommand(["GET", "foo"])
)}

function _server(endpoint,$0){return(
endpoint("server", async (req, res) => {
  $0.send({ req, res });
})
)}

function _26(md){return(
md`## Long Poll Request Pipeline`
)}

function _incomingLongpollRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _28(incomingLongpollRequest){return(
incomingLongpollRequest
)}

function _sessions(){return(
{}
)}

function _newSessionResponse(){return(
(callbackId, session) => `
  function pLPCommand(c, a1, a2, a3, a4) {
  parent.window["pLPCommand${callbackId}"] && parent.window["pLPCommand${callbackId}"](c, a1, a2, a3, a4);
  }
  function pRTLPCB(pN, data) {
  parent.window["pRTLPCB${callbackId}"] && parent.window["pRTLPCB${callbackId}"](pN, data);
  }
  pLPCommand('start','${session.id}','${session.password}')
  pRTLPCB(${session.responseId++},${JSON.stringify([
  {
    t: "c",
    d: {
      t: "h",
      d: {
        ts: Date.now(),
        v: "5",
        h: "webcode.run",
        s: session.sessionId
      }
    }
  }
])})`
)}

function _disconnectFrame(){return(
(session) => `<html><body><script>
  function EnvSendPing(destURL) {
  try{
  var xhr=new XMLHttpRequest();
  xhr.open("GET", destURL, false);
  xhr.send(null);
  } catch (e) { }
  }
  function EnvDisconnect() {
  EnvSendPing("/.lp?disconn=t&id=${session.id}&pw=${session.pw}");
  }
  if(window.addEventListener)
  window.addEventListener('unload',EnvDisconnect,false);
  else if(window.attachEvent)
  window.attachEvent('onunload',EnvDisconnect);
  </script></body></html>`
)}

async function _incomingLongpollRequestAction(incomingLongpollRequest,sessions,newSessionResponse,disconnectFrame,$0,$1)
{
  const req = incomingLongpollRequest.req;
  const res = incomingLongpollRequest.res;

  const callbackId = req.query.cb;
  if (req.query.start) {
    // New session initialized
    const cid = Math.random().toString(16).substring(3);

    sessions[cid] = {
      id: cid,
      responseId: 0,
      sessionId: Math.random().toString(16).substring(3),
      password: Math.random().toString(16).substring(3),
      hanginingRequest: null,
      serverToClientQueue: []
    };

    res.header("content-type", "application/javascript");
    res.send(newSessionResponse(callbackId, sessions[cid]));
  } else if (req.query.dframe) {
    res.header("content-type", "text/html");
    res.send(disconnectFrame(sessions[req.query.id]));
  } else {
    const session = sessions[req.query.id];
    if (!session) {
      return $0.reject(
        new Error("Unrecognized connection id for " + req.query.id)
      );
    }
    // If there is an existing long poll close the previous
    if (session.hangingRequest) {
      session.hangingRequest.send(`pRTLPCB(${session.responseId++},[])`);
      session.hangingRequest = null;
    }

    res.header("content-type", "application/javascript");
    var commandIndex = 0;
    while (req.query[`d${commandIndex}`]) {
      const data = JSON.parse(
        atob(req.query[`d${commandIndex}`].replaceAll(".", "="))
      );
      commandIndex++;
      console.log("Incoming request", data);
      if (data.d.a === "q") {
        // Actions: Listen/Query
        // Initial data update sent immediately
        session.serverToClientQueue.push({
          t: "d",
          d: {
            a: "d", // data update action
            b: {
              p: "@tomlarkworthy/rtdb-protocol-explorer/rw",
              d: "hi!"
            }
          }
        });
        // Follow up with a OK to the listen
        session.serverToClientQueue.push({
          t: "d",
          d: { r: data.d.r, b: { s: "ok", d: "" } }
        });
      } else {
        try {
          const response = await $1.send(data);
          session.serverToClientQueue.push({
            t: "d",
            d: { r: data.d.r, b: response }
          });
        } catch (err) {
          console.error(err);
          session.serverToClientQueue.push({
            t: "d",
            d: { s: "fail", d: err.message }
          });
        }
      }
    }

    if (session.serverToClientQueue.length > 0) {
      res.send(
        `pRTLPCB(${session.responseId++},${JSON.stringify([
          session.serverToClientQueue.shift()
        ])});`
      );
    } else {
      session.hangingRequest = res;
    }
  }

  $0.respond();
}


function _33(md){return(
md`## Data Request Pipeline`
)}

function _incomingRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _35(incomingRequest){return(
incomingRequest
)}

function _requestRouter($0,$1,$2,incomingRequest,$3)
{
  const commandHandler = {
    s: $0,
    p: $1,
    g: $2
  }[incomingRequest.d.a];

  if (!commandHandler) {
    return $3.reject(
      new Error("Unrecognised server action " + incomingRequest.d.a)
    );
  }

  commandHandler
    .send(incomingRequest.d.b)
    .then((handlerResponse) => {
      $3.respond(handlerResponse);
    })
    .catch($3.reject);
}


function _37(md){return(
md`### STATS`
)}

function _incomingStats(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _39(incomingStats){return(
incomingStats
)}

function _incomingStatsAction(incomingStats,$0)
{
  incomingStats; // Trigger
  const response = { s: "ok", d: "" };
  $0.respond(response);
  return response;
}


function _41(md){return(
md`### PUT`
)}

function _incomingPut(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _43(incomingPut){return(
incomingPut
)}

async function _incomingPutAction(incomingPut,redis,$0)
{
  const path = incomingPut.p;
  const data = incomingPut.d;
  try {
    await redis.sendCommand([
      "SET",
      "firebase-server-prototype-1" + path,
      JSON.stringify(data)
    ]);
    const response = { s: "ok", d: "" };
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _45(md){return(
md`### GET`
)}

function _incomingGet(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _47(incomingGet){return(
incomingGet
)}

async function _incomingGetAction(incomingGet,redis,$0)
{
  const path = incomingGet.p;
  const query = incomingGet.q;

  // TODO permissions check
  // { s: "permission_denied", d: "Permission denied" };
  try {
    const value = await redis.sendCommand([
      "GET",
      "firebase-server-prototype-1" + path
    ]);
    const response = { s: "ok", d: JSON.parse(value) };
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _49(md){return(
md`### Utils`
)}

function _randomString(){return(
() => Math.random().toString(16).substring(3)
)}

function _51(md){return(
md`### Dependancies`
)}

function _56(md){return(
md`### Notebook Analytics and Backups`
)}

function _57(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("clientConfig")).define("clientConfig", _clientConfig);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("appLib")).define("appLib", _appLib);
  main.variable(observer("rtdb")).define("rtdb", _rtdb);
  main.variable(observer("firebaseAppA")).define("firebaseAppA", ["restartClient","appLib","clientConfig"], _firebaseAppA);
  main.variable(observer("firebaseAppB")).define("firebaseAppB", ["restartClient","appLib","clientConfig"], _firebaseAppB);
  main.variable(observer("databaseA")).define("databaseA", ["rtdb","firebaseAppA"], _databaseA);
  main.variable(observer("databaseB")).define("databaseB", ["rtdb","firebaseAppB"], _databaseB);
  main.variable(observer("rootA")).define("rootA", ["rtdb","databaseA"], _rootA);
  main.variable(observer("rootB")).define("rootB", ["rtdb","databaseA"], _rootB);
  main.variable(observer()).define(["md"], _17);
  const child1 = runtime.module(define1);
  main.import("createClient", child1);
  main.variable(observer("redis")).define("redis", ["createClient","config"], _redis);
  main.variable(observer("viewof restartClient")).define("viewof restartClient", ["Inputs"], _restartClient);
  main.variable(observer("restartClient")).define("restartClient", ["Generators", "viewof restartClient"], (G, _) => G.input(_));
  main.variable(observer("viewof suite")).define("viewof suite", ["server","redis","createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","randomString","rtdb","rootA","expect"], _22);
  main.variable(observer()).define(["suite","randomString","rtdb","rootA","rootB","expect"], _23);
  main.variable(observer()).define(["redis"], _24);
  main.variable(observer("server")).define("server", ["endpoint","viewof incomingLongpollRequest"], _server);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof incomingLongpollRequest")).define("viewof incomingLongpollRequest", ["flowQueue"], _incomingLongpollRequest);
  main.variable(observer("incomingLongpollRequest")).define("incomingLongpollRequest", ["Generators", "viewof incomingLongpollRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingLongpollRequest"], _28);
  main.variable(observer("sessions")).define("sessions", _sessions);
  main.variable(observer("newSessionResponse")).define("newSessionResponse", _newSessionResponse);
  main.variable(observer("disconnectFrame")).define("disconnectFrame", _disconnectFrame);
  main.variable(observer("incomingLongpollRequestAction")).define("incomingLongpollRequestAction", ["incomingLongpollRequest","sessions","newSessionResponse","disconnectFrame","viewof incomingLongpollRequest","viewof incomingRequest"], _incomingLongpollRequestAction);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof incomingRequest")).define("viewof incomingRequest", ["flowQueue"], _incomingRequest);
  main.variable(observer("incomingRequest")).define("incomingRequest", ["Generators", "viewof incomingRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingRequest"], _35);
  main.variable(observer("requestRouter")).define("requestRouter", ["viewof incomingStats","viewof incomingPut","viewof incomingGet","incomingRequest","viewof incomingRequest"], _requestRouter);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof incomingStats")).define("viewof incomingStats", ["flowQueue"], _incomingStats);
  main.variable(observer("incomingStats")).define("incomingStats", ["Generators", "viewof incomingStats"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingStats"], _39);
  main.variable(observer("incomingStatsAction")).define("incomingStatsAction", ["incomingStats","viewof incomingStats"], _incomingStatsAction);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof incomingPut")).define("viewof incomingPut", ["flowQueue"], _incomingPut);
  main.variable(observer("incomingPut")).define("incomingPut", ["Generators", "viewof incomingPut"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingPut"], _43);
  main.variable(observer("incomingPutAction")).define("incomingPutAction", ["incomingPut","redis","viewof incomingPut"], _incomingPutAction);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("viewof incomingGet")).define("viewof incomingGet", ["flowQueue"], _incomingGet);
  main.variable(observer("incomingGet")).define("incomingGet", ["Generators", "viewof incomingGet"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingGet"], _47);
  main.variable(observer("incomingGetAction")).define("incomingGetAction", ["incomingGet","redis","viewof incomingGet"], _incomingGetAction);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("randomString")).define("randomString", _randomString);
  main.variable(observer()).define(["md"], _51);
  const child2 = runtime.module(define2);
  main.import("endpoint", child2);
  const child3 = runtime.module(define3);
  main.import("expect", child3);
  main.import("createSuite", child3);
  const child4 = runtime.module(define4);
  main.import("flowQueue", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["footer"], _57);
  return main;
}
