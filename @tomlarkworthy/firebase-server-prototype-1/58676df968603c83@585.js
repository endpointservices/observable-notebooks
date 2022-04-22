import define1 from "./c5544d2895d5e4ad@36.js";
import define2 from "./6a703b03d185f279@978.js";
import define3 from "./6eda90668ae03044@803.js";
import define4 from "./c7a3b20cec5d4dd9@659.js";
import define5 from "./0e0b35a92c819d94@413.js";
import define6 from "./293899bef371e135@225.js";

function _1(md){return(
md`# Hackable Firebase Realtime Database Server Prototype #1`
)}

function _server2(endpoint){return(
endpoint("server2", async (req, res) => {})
)}

function _3(md){return(
md`An Open Source reimplementation of a Firebase Realtime Database Server designed for hacking and customization. Written with moldability, readability and developer ergonomics in mind, this server records its execution traces in the notebook for maximum observability.

`
)}

function _4(md){return(
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

function _5(md){return(
md`

### Background
In a previous work we developed a tool for [reverse engineering the Firebase Realtime Database wire protocol](https://observablehq.com/@tomlarkworthy/rtdb-protocol), which included a very primitive Firebase Server Fake. Since then, we have created a [Redis driver](https://observablehq.com/@tomlarkworthy/redis) so notebooks can persist data to Redis directly, and so now we are in a position to put it all together. 

### Goal

This goal of this prototype is about getting our code layout nice, and introducing using Redis as the backing persistence store.

### It's unsecured public server

The prototype server here can be accessed using a vanilla client from *anywhere*. In this notebook we instantiate a Firebase client within the notebook to execute the tests, but it's important to note the server and client are communicating over the internet despite sharing a common notebook space.`
)}

function _6(md){return(
md`### Firebase Test Clients`
)}

function _7(md){return(
md`With a specially formatted database URL we can send a client to a 3rd party server implementation.`
)}

function _databaseURL(thisNotebooksNamespace,thisNotebooksSlug){return(
`https://webcode.run?ns=${thisNotebooksNamespace}|${thisNotebooksSlug};server`
)}

function _clientConfig(databaseURL){return(
{
  firebaseServer: {
    url: databaseURL
  }
}
)}

function _11(md){return(
md`### Redis Driver`
)}

function _redisConfig(){return(
{
  host: "redis.webcode.run",
  port: 443,
  tls: true
}
)}

function _redis(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _suite(server,redis,createSuite){return(
server,
redis,
createSuite({
  name: "Hackable Realtime Server Test Suite"
})
)}

function _16($0){return(
$0
)}

function _17(suite,randomString,rtdb,rootA,expect){return(
suite.test("Read your own write - String", async () => {
  const payload = randomString();
  const location = rtdb.child(rootA, "collection/readyourownwrite");
  await rtdb.set(location, payload);
  const response = (await rtdb.get(location)).val();
  expect(response).toEqual(payload);
})
)}

function _18(suite,randomString,rtdb,rootA,rootB,expect){return(
suite.test("Read their write - String", async () => {
  const payload = randomString();
  const locationA = rtdb.child(rootA, "collection/readtheirwrite");
  const locationB = rtdb.child(rootB, "collection/readtheirwrite");
  await rtdb.set(locationA, payload);
  const response = await rtdb.get(locationB);
  expect(response.val()).toEqual(payload);
})
)}

function _19(suite,randomString,rtdb,rootA,rootB,_){return(
suite.test("onValue is notified of other's write", async (done) => {
  const payload = randomString();
  const locationA = rtdb.child(rootA, "collection/subscribetheirwrite");
  const locationB = rtdb.child(rootB, "collection/subscribetheirwrite");
  rtdb.onValue(locationB, (snap) => {
    const val = snap.val();
    if (_.isEqual(val, payload)) {
      done();
    }
  });

  await rtdb.set(locationA, payload);
})
)}

function _20(md){return(
md`## Custom Firebase Realtime Server`
)}

function _server(endpoint,$0){return(
endpoint("server", async (req, res) => {
  $0.send({ req, res });
})
)}

function _22(md){return(
md`### Long Poll Request Pipeline`
)}

function _incomingLongpollRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _24(incomingLongpollRequest){return(
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


function _29(md){return(
md`## Data Request Pipeline`
)}

function _incomingRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _31(incomingRequest){return(
incomingRequest
)}

function _requestRouter($0,$1,$2,$3,incomingRequest,$4)
{
  const commandHandler = {
    s: $0,
    p: $1,
    q: $2,
    g: $3
  }[incomingRequest.d.a];

  if (!commandHandler) {
    return $4.reject(
      new Error("Unrecognised server action " + incomingRequest.d.a)
    );
  }

  commandHandler
    .send(incomingRequest.d.b)
    .then((handlerResponse) => {
      $4.respond(handlerResponse);
    })
    .catch($4.reject);
}


function _33(md){return(
md`### STATS`
)}

function _incomingStats(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _35(incomingStats){return(
incomingStats
)}

function _incomingStatsAction(incomingStats,$0)
{
  incomingStats; // Trigger
  const response = { s: "ok", d: "" };
  $0.respond(response);
  return response;
}


function _37(md){return(
md`### PUT`
)}

function _incomingPut(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _39(incomingPut){return(
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


function _41(md){return(
md`### GET`
)}

function _incomingGet(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _43(incomingGet){return(
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


function _45(md){return(
md`### QUERY`
)}

function _incomingQuery(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _47(incomingQuery){return(
incomingQuery
)}

function _incomingQueryAction(session,data)
{
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
}


function _49(md){return(
md`### Utils`
)}

function _randomString(){return(
() => Math.random().toString(16).substring(3)
)}

function _thisNotebooksNamespace(html){return(
/@([^/]*)\//.exec(html`<a href="?">`.href)[1]
)}

function _thisNotebooksSlug(html){return(
/\/([^/]*)\?/.exec(html`<a href="?">`.href)[1]
)}

function _53(md){return(
md`### Dependancies`
)}

function _58(md){return(
md`### Notebook Analytics and Backups`
)}

function _59(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("server2")).define("server2", ["endpoint"], _server2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("databaseURL")).define("databaseURL", ["thisNotebooksNamespace","thisNotebooksSlug"], _databaseURL);
  main.variable(observer("clientConfig")).define("clientConfig", ["databaseURL"], _clientConfig);
  const child1 = runtime.module(define1).derive([{name: "clientConfig", alias: "config"}], main);
  main.import("viewof restartClient", child1);
  main.import("restartClient", child1);
  main.import("rtdb", child1);
  main.import("rootA", child1);
  main.import("rootB", child1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  const child2 = runtime.module(define2);
  main.import("createClient", child2);
  main.variable(observer("redis")).define("redis", ["createClient","redisConfig"], _redis);
  main.variable(observer("viewof suite")).define("viewof suite", ["server","redis","createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof restartClient"], _16);
  main.variable(observer()).define(["suite","randomString","rtdb","rootA","expect"], _17);
  main.variable(observer()).define(["suite","randomString","rtdb","rootA","rootB","expect"], _18);
  main.variable(observer()).define(["suite","randomString","rtdb","rootA","rootB","_"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("server")).define("server", ["endpoint","viewof incomingLongpollRequest"], _server);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof incomingLongpollRequest")).define("viewof incomingLongpollRequest", ["flowQueue"], _incomingLongpollRequest);
  main.variable(observer("incomingLongpollRequest")).define("incomingLongpollRequest", ["Generators", "viewof incomingLongpollRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingLongpollRequest"], _24);
  main.variable(observer("sessions")).define("sessions", _sessions);
  main.variable(observer("newSessionResponse")).define("newSessionResponse", _newSessionResponse);
  main.variable(observer("disconnectFrame")).define("disconnectFrame", _disconnectFrame);
  main.variable(observer("incomingLongpollRequestAction")).define("incomingLongpollRequestAction", ["incomingLongpollRequest","sessions","newSessionResponse","disconnectFrame","viewof incomingLongpollRequest","viewof incomingRequest"], _incomingLongpollRequestAction);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof incomingRequest")).define("viewof incomingRequest", ["flowQueue"], _incomingRequest);
  main.variable(observer("incomingRequest")).define("incomingRequest", ["Generators", "viewof incomingRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingRequest"], _31);
  main.variable(observer("requestRouter")).define("requestRouter", ["viewof incomingStats","viewof incomingPut","viewof incomingQuery","viewof incomingGet","incomingRequest","viewof incomingRequest"], _requestRouter);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof incomingStats")).define("viewof incomingStats", ["flowQueue"], _incomingStats);
  main.variable(observer("incomingStats")).define("incomingStats", ["Generators", "viewof incomingStats"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingStats"], _35);
  main.variable(observer("incomingStatsAction")).define("incomingStatsAction", ["incomingStats","viewof incomingStats"], _incomingStatsAction);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof incomingPut")).define("viewof incomingPut", ["flowQueue"], _incomingPut);
  main.variable(observer("incomingPut")).define("incomingPut", ["Generators", "viewof incomingPut"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingPut"], _39);
  main.variable(observer("incomingPutAction")).define("incomingPutAction", ["incomingPut","redis","viewof incomingPut"], _incomingPutAction);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof incomingGet")).define("viewof incomingGet", ["flowQueue"], _incomingGet);
  main.variable(observer("incomingGet")).define("incomingGet", ["Generators", "viewof incomingGet"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingGet"], _43);
  main.variable(observer("incomingGetAction")).define("incomingGetAction", ["incomingGet","redis","viewof incomingGet"], _incomingGetAction);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("viewof incomingQuery")).define("viewof incomingQuery", ["flowQueue"], _incomingQuery);
  main.variable(observer("incomingQuery")).define("incomingQuery", ["Generators", "viewof incomingQuery"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingQuery"], _47);
  main.variable(observer("incomingQueryAction")).define("incomingQueryAction", ["session","data"], _incomingQueryAction);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("randomString")).define("randomString", _randomString);
  main.variable(observer("thisNotebooksNamespace")).define("thisNotebooksNamespace", ["html"], _thisNotebooksNamespace);
  main.variable(observer("thisNotebooksSlug")).define("thisNotebooksSlug", ["html"], _thisNotebooksSlug);
  main.variable(observer()).define(["md"], _53);
  const child3 = runtime.module(define3);
  main.import("endpoint", child3);
  const child4 = runtime.module(define4);
  main.import("expect", child4);
  main.import("createSuite", child4);
  const child5 = runtime.module(define5);
  main.import("flowQueue", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["footer"], _59);
  return main;
}
