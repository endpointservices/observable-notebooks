// https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1@997
import define1 from "./c5544d2895d5e4ad@39.js";
import define2 from "./6a703b03d185f279@978.js";
import define3 from "./374124b361974cb3@259.js";
import define4 from "./5a63548f9c799b76@550.js";
import define5 from "./6eda90668ae03044@803.js";
import define6 from "./c7a3b20cec5d4dd9@660.js";
import define7 from "./0e0b35a92c819d94@413.js";
import define8 from "./293899bef371e135@226.js";
import define9 from "./64641700df65baed@91.js";

function _1(gfx,htl){return(
htl.html`<h1 style="display: none;">Hackable Firebase Realtime Database Server Prototype #1<h1>
${gfx}
<h2 style="font-size:42px">Prototype #1</h2>
<h3>Focus areas: Firebase Client compatibility, Redis Persistence, GET/PUT/LISTEN</h3>`
)}

function _2(md){return(
md`*Let's build a 3rd party wire compatible Firebase Database Server.*`
)}

function _3(toc){return(
toc("h2,h3,h4,h5,h6")
)}

function _4(md){return(
md`## Introduction`
)}

function _5(width,md){return(
md`This is a prototype **Firebase wire compatible** Realtime Database Server. Vanilla Firebase web clients are able to connect and sync data with it. The server is written in [Observable](https://observablehq.com/) to simplify programmable customizability, you can one-click fork to host your own ([*really*](https://observablehq.com/@observablehq/fork-suggest-merge)).

I think an end user programmable database server has much potential, for example, you could use ordinary code to authorize requests, you could even call out to external APIs, checking signatures *etc.* You could create synthetic data views to federated data sources *on-demand*, or fanout writes to additional storage engines. You can collocate the database near to users for incredibly low latency. 

This is just a prototype though, and **not ready for production use**. However, it is a step in the right direction. The code layout has been optimized for observability, readability and developer ergonomics. Through use of [webcode.run](https://webcode.run) live coding, live traffic can be execution in the developers browser. You can attach the Chrome DevTools debugger and REPL traffic live. Furthermore, through the use of [flowQueue](/@tomlarkworthy/flow-queue)s, tunnelled requests leave their live execution trace in the variables of the notebook, so you can see the processing steps without special tooling. See the accompanying [Youtube video](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1) about some of the innovative development features.

<iframe width="${Math.min(720, width)}" height="315" src="https://www.youtube.com/embed/P6zuvlcAKag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _6(md){return(
md`### What this prototype does

- Works with vanilla Firebase clients over public internet.
- Key based Listen/Get/Put
- Persist data to Redis
- HTTP long poll transport

### What this prototype doesn't do

- JSON interpolation
- OrderBy/limit
- onDisconnect semantics
- websocket transport
- REST API
- Redis security
- horizontal scalability
- long poll big payload segment assembly
- query indexes
- server values
`
)}

function _7(md){return(
md`## Background
In a previous work we developed a tool for [reverse engineering the Firebase Realtime Database wire protocol](https://observablehq.com/@tomlarkworthy/rtdb-protocol), which included a very primitive Firebase Server Fake. Since then, we have created a [Redis driver](https://observablehq.com/@tomlarkworthy/redis) so notebooks can persist data to Redis directly, and so now we are in a position to put it all together. 
`
)}

function _8(md){return(
md`## Database URL`
)}

function _9(md){return(
md`With a specially formatted database URL we can send a vanilla Firebase client to a 3rd party server implementation.`
)}

function _databaseURL(thisNotebooksNamespace,thisNotebooksSlug){return(
`https://webcode.run?ns=${thisNotebooksNamespace}|${thisNotebooksSlug};server`
)}

function _11(md){return(
md`## Live Tests

The tests are meant to be read. They illustrate what features are working and furthermore, they are executed in **your** browser so you know it works because you have seen it work. Pop open DevTools and take a look when the clients are reset.

In this early stage the tests are a bit flakey and you might need to restart the clients, refresh the page, and try a few times until everything is warmed up 😳.`
)}

function _clientConfig(databaseURL){return(
{
  firebaseServer: {
    url: databaseURL
  }
}
)}

function _13(md){return(
md`### Firebase Test Clients`
)}

function _15(md){return(
md`### Test Results`
)}

function _suite(server,redis,flowQueue,createSuite){return(
server,
redis,
flowQueue,
createSuite({
  name: null
})
)}

function _17(md){return(
md`### Restart Test Clients & Tests`
)}

function _18($0){return(
$0
)}

function _19(md){return(
md`### Smoke Tests`
)}

function _20(md){return(
md`#### Read your write`
)}

function _readYourWriteTest(suite,randomString,rtdb,rootA,expect){return(
suite.test("Read your own write - String", async () => {
  const payload = randomString();
  const location = rtdb.child(rootA, "collection/readyourownwrite");
  await rtdb.set(location, payload);
  const response = (await rtdb.get(location)).val();
  expect(response).toEqual(payload);
})
)}

function _22(md){return(
md`#### Read other's write`
)}

function _readTheirWriteTest(suite,randomString,rtdb,rootA,rootB,expect){return(
suite.test("Read their write - String", async () => {
  const payload = randomString();
  const locationA = rtdb.child(rootA, "collection/readtheirwrite");
  const locationB = rtdb.child(rootB, "collection/readtheirwrite");
  await rtdb.set(locationA, payload);
  const response = await rtdb.get(locationB);
  expect(response.val()).toEqual(payload);
})
)}

function _24(md){return(
md`#### Listen notified of other's write`
)}

function _listenNotifiedOfWrite(suite,randomString,rtdb,rootA,rootB,_){return(
suite.test(
  "onValue is notified of other's write",
  async (done) => {
    const payload = randomString();
    const locationA = rtdb.child(rootA, "collection/subscribetheirwrite");
    const locationB = rtdb.child(rootB, "collection/subscribetheirwrite");
    rtdb.onValue(locationB, (snap) => {
      const val = snap.val();
      console.log(val);
      if (_.isEqual(val, payload)) {
        done();
      }
    });

    await rtdb.set(locationA, payload);
  }
)
)}

function _26(md){return(
md`## Custom Firebase Realtime Server`
)}

function _27(md){return(
md`### Storage Engine: Redis

Redis the the storage engine for this prototype. We are using a custom [redis-web](https://observablehq.com/@tomlarkworthy/redis) client.`
)}

function _redis(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _redisConfig(){return(
{
  host: "redis.webcode.run",
  port: 443,
  tls: true
}
)}

function _31(md){return(
md`### Long Poll Endpoint

Firebase clients make long lived connection to this endpoint`
)}

function _server(endpoint,redis,flowQueue,$0){return(
endpoint("server", async (req, res) => {
  redis, flowQueue; // make sure these are setup first
  $0.send({ req, res }); // handle in to poll pipeline (unfold across Dataflow)
})
)}

function _33(md){return(
md`### Long Poll Request Pipeline

If you are live tunnelling the server endpoint, these cells will evaluate in response to production traffic (and will handle production traffic).`
)}

function _incomingLongpollRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _35(incomingLongpollRequest){return(
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
        const response = await $1.send({
          session,
          request: data
        });
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


function _40(md){return(
md`### Data Request Pipeline`
)}

function _incomingRequest(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _42(incomingRequest){return(
incomingRequest
)}

function _requestRouter(incomingRequest,$0,$1,$2,$3,$4)
{
  const session = incomingRequest.session;
  const request = incomingRequest.request;
  const commandHandler = {
    s: $0,
    p: $1,
    q: $2,
    g: $3
  }[request.d.a];

  if (!commandHandler) {
    return $4.reject(
      new Error("Unrecognised server action " + request.d.a)
    );
  }

  commandHandler
    .send({
      session,
      command: request.d.b
    })
    .then((handlerResponse) => {
      $4.respond(handlerResponse);
    })
    .catch($4.reject);
}


function _44(md){return(
md`#### STATS`
)}

function _incomingStats(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _46(incomingStats){return(
incomingStats
)}

function _incomingStatsAction(incomingStats,$0)
{
  incomingStats; // Trigger
  const response = { s: "ok", d: "" };
  $0.respond(response);
  return response;
}


function _48(md){return(
md`#### PUT`
)}

function _incomingPut(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _50(incomingPut){return(
incomingPut
)}

async function _incomingPutAction(incomingPut,redis,pathToListeners,$0)
{
  const path = incomingPut.command.p;
  const data = incomingPut.command.d;
  try {
    await redis.sendCommand([
      "SET",
      "firebase-server-prototype-1" + path,
      JSON.stringify(data)
    ]);

    // We also need to tell all interested parties
    const listeners = pathToListeners[path] || [];
    listeners.forEach((session) => {
      session.serverToClientQueue.push({
        t: "d",
        d: {
          a: "d",
          b: {
            p: path,
            d: data
          }
        }
      });

      // TODO, we should not be doing long poll specific stuff here
      if (session.hangingRequest) {
        const res = session.hangingRequest;
        session.hangingRequest = null;
        res.send(
          `pRTLPCB(${session.responseId++},${JSON.stringify([
            session.serverToClientQueue.shift()
          ])});`
        );
      }
    });

    const response = { s: "ok", d: "" };
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _52(md){return(
md`#### GET`
)}

function _incomingGet(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _54(incomingGet){return(
incomingGet
)}

async function _incomingGetAction(incomingGet,redis,$0)
{
  const path = incomingGet.command.p;
  const query = incomingGet.command.q;

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


function _56(md){return(
md`#### QUERY`
)}

function _pathToListeners(){return(
{}
)}

function _incomingQuery(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _59(incomingQuery){return(
incomingQuery
)}

async function _incomingQueryAction(incomingQuery,redis,pathToListeners,$0)
{
  // Actions: Listen/Query
  const session = incomingQuery.session;
  const command = incomingQuery.command;

  try {
    const initial = await redis.sendCommand([
      "GET",
      "firebase-server-prototype-1" + command.p
    ]);

    // Initial data update sent immediately
    session.serverToClientQueue.push({
      t: "d",
      d: {
        a: "d",
        b: {
          p: command.p,
          d: JSON.parse(initial)
        }
      }
    });

    // Now register as a listener
    pathToListeners[command.p] ||= [];
    pathToListeners[command.p].push(session);

    // Follow up with a OK to the query
    const response = { s: "ok", d: "" };
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _61(md){return(
md`### Utils`
)}

function _randomString(){return(
() => Math.random().toString(16).substring(3)
)}

function _thisNotebooksNamespace(thisNotebooksSlug,HEALTH_CHECK_FALLBACK_SLUG,HEALTH_CHECK_FALLBACK_NAMESPACE,html)
{
  if (thisNotebooksSlug === HEALTH_CHECK_FALLBACK_SLUG)
    return HEALTH_CHECK_FALLBACK_NAMESPACE;
  else return /@([^/]*)\//.exec(html`<a href="?">`.href)[1];
}


function _thisNotebooksSlug(html,HEALTH_CHECK_FALLBACK_SLUG)
{
  const thisSlug = /\/([^/]*)\?/.exec(html`<a href="?">`.href)[1];
  if (thisSlug === "healthcheck") return HEALTH_CHECK_FALLBACK_SLUG;
  else return thisSlug;
}


function _65(md){return(
md`### Remote notebook state

We expose an endpoint for reading the remote notebooks state, which can be useful for debugging remote errors.`
)}

function _trackingVariable_e3366d24de62(){return(
true
)}

function _68(endpoint,notebookSnapshot){return(
endpoint("variables", async (req, res) => {
  res.json(
    (await notebookSnapshot("trackingVariable_e3366d24de62")).map(
      (variable) => ({
        state: variable.state,
        name: variable.name,
        // Note these cells might contain personal information, so we only allow errors values to leave the environment
        ...(variable.state === "rejected" && {})
      })
    )
  );
})
)}

function _69(md){return(
md`### [Health check](https://observablehq.com/@endpointservices/healthcheck)

The healthcheck is actively monitored and includes the smoke tests.

| Region      | URL |
| ----------- | ----------- |
| us-central1      | https://webcode.run/regions/us-central1/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Ffirebase-server-prototype-1&wait=50      |
| europe-west4   | https://webcode.run/regions/europe-west4/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Ffirebase-server-prototype-1&wait=50        |`
)}

function _70(md){return(
md`When running inside the healthcheck notebook, the slug is detected incorrectly as "healthcheck" which means the clients connect to the wrong place. So we have manual fix.`
)}

function _HEALTH_CHECK_FALLBACK_SLUG(){return(
"firebase-server-prototype-1"
)}

function _HEALTH_CHECK_FALLBACK_NAMESPACE(){return(
"tomlarkworthy"
)}

function _73(md){return(
md`### Notebook Error Monitoring, Analytics and Backups`
)}

function _74(footer){return(
footer
)}

function _75(md){return(
md`### Dependancies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["gfx","htl"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["width","md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("databaseURL")).define("databaseURL", ["thisNotebooksNamespace","thisNotebooksSlug"], _databaseURL);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("clientConfig")).define("clientConfig", ["databaseURL"], _clientConfig);
  main.variable(observer()).define(["md"], _13);
  const child1 = runtime.module(define1).derive([{name: "clientConfig", alias: "config"}], main);
  main.import("viewof restartClient", child1);
  main.import("restartClient", child1);
  main.import("rtdb", child1);
  main.import("rootA", child1);
  main.import("rootB", child1);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof suite")).define("viewof suite", ["server","redis","flowQueue","createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["viewof restartClient"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("readYourWriteTest")).define("readYourWriteTest", ["suite","randomString","rtdb","rootA","expect"], _readYourWriteTest);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("readTheirWriteTest")).define("readTheirWriteTest", ["suite","randomString","rtdb","rootA","rootB","expect"], _readTheirWriteTest);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("listenNotifiedOfWrite")).define("listenNotifiedOfWrite", ["suite","randomString","rtdb","rootA","rootB","_"], _listenNotifiedOfWrite);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("redis")).define("redis", ["createClient","redisConfig"], _redis);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  const child2 = runtime.module(define2);
  main.import("createClient", child2);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("server")).define("server", ["endpoint","redis","flowQueue","viewof incomingLongpollRequest"], _server);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("viewof incomingLongpollRequest")).define("viewof incomingLongpollRequest", ["flowQueue"], _incomingLongpollRequest);
  main.variable(observer("incomingLongpollRequest")).define("incomingLongpollRequest", ["Generators", "viewof incomingLongpollRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingLongpollRequest"], _35);
  main.variable(observer("sessions")).define("sessions", _sessions);
  main.variable(observer("newSessionResponse")).define("newSessionResponse", _newSessionResponse);
  main.variable(observer("disconnectFrame")).define("disconnectFrame", _disconnectFrame);
  main.variable(observer("incomingLongpollRequestAction")).define("incomingLongpollRequestAction", ["incomingLongpollRequest","sessions","newSessionResponse","disconnectFrame","viewof incomingLongpollRequest","viewof incomingRequest"], _incomingLongpollRequestAction);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("viewof incomingRequest")).define("viewof incomingRequest", ["flowQueue"], _incomingRequest);
  main.variable(observer("incomingRequest")).define("incomingRequest", ["Generators", "viewof incomingRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingRequest"], _42);
  main.variable(observer("requestRouter")).define("requestRouter", ["incomingRequest","viewof incomingStats","viewof incomingPut","viewof incomingQuery","viewof incomingGet","viewof incomingRequest"], _requestRouter);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof incomingStats")).define("viewof incomingStats", ["flowQueue"], _incomingStats);
  main.variable(observer("incomingStats")).define("incomingStats", ["Generators", "viewof incomingStats"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingStats"], _46);
  main.variable(observer("incomingStatsAction")).define("incomingStatsAction", ["incomingStats","viewof incomingStats"], _incomingStatsAction);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof incomingPut")).define("viewof incomingPut", ["flowQueue"], _incomingPut);
  main.variable(observer("incomingPut")).define("incomingPut", ["Generators", "viewof incomingPut"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingPut"], _50);
  main.variable(observer("incomingPutAction")).define("incomingPutAction", ["incomingPut","redis","pathToListeners","viewof incomingPut"], _incomingPutAction);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("viewof incomingGet")).define("viewof incomingGet", ["flowQueue"], _incomingGet);
  main.variable(observer("incomingGet")).define("incomingGet", ["Generators", "viewof incomingGet"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingGet"], _54);
  main.variable(observer("incomingGetAction")).define("incomingGetAction", ["incomingGet","redis","viewof incomingGet"], _incomingGetAction);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("pathToListeners")).define("pathToListeners", _pathToListeners);
  main.variable(observer("viewof incomingQuery")).define("viewof incomingQuery", ["flowQueue"], _incomingQuery);
  main.variable(observer("incomingQuery")).define("incomingQuery", ["Generators", "viewof incomingQuery"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingQuery"], _59);
  main.variable(observer("incomingQueryAction")).define("incomingQueryAction", ["incomingQuery","redis","pathToListeners","viewof incomingQuery"], _incomingQueryAction);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("randomString")).define("randomString", _randomString);
  main.variable(observer("thisNotebooksNamespace")).define("thisNotebooksNamespace", ["thisNotebooksSlug","HEALTH_CHECK_FALLBACK_SLUG","HEALTH_CHECK_FALLBACK_NAMESPACE","html"], _thisNotebooksNamespace);
  main.variable(observer("thisNotebooksSlug")).define("thisNotebooksSlug", ["html","HEALTH_CHECK_FALLBACK_SLUG"], _thisNotebooksSlug);
  main.variable(observer()).define(["md"], _65);
  const child3 = runtime.module(define3);
  main.import("notebookSnapshot", child3);
  main.variable(observer("trackingVariable_e3366d24de62")).define("trackingVariable_e3366d24de62", _trackingVariable_e3366d24de62);
  main.variable(observer()).define(["endpoint","notebookSnapshot"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("HEALTH_CHECK_FALLBACK_SLUG")).define("HEALTH_CHECK_FALLBACK_SLUG", _HEALTH_CHECK_FALLBACK_SLUG);
  main.variable(observer("HEALTH_CHECK_FALLBACK_NAMESPACE")).define("HEALTH_CHECK_FALLBACK_NAMESPACE", _HEALTH_CHECK_FALLBACK_NAMESPACE);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer()).define(["footer"], _74);
  main.variable(observer()).define(["md"], _75);
  const child4 = runtime.module(define4);
  main.import("gfx", child4);
  const child5 = runtime.module(define5);
  main.import("endpoint", child5);
  const child6 = runtime.module(define6);
  main.import("expect", child6);
  main.import("createSuite", child6);
  const child7 = runtime.module(define7);
  main.import("flowQueue", child7);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  const child9 = runtime.module(define9);
  main.import("toc", child9);
  return main;
}
