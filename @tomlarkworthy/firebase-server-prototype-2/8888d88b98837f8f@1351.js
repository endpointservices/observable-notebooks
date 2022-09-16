import define1 from "./048a17a165be198d@263.js";
import define2 from "./03218555ea68a856@467.js";
import define3 from "./f92778131fd76559@1174.js";
import define4 from "./c5544d2895d5e4ad@39.js";
import define5 from "./de798a70f81e9e09@4435.js";
import define6 from "./374124b361974cb3@265.js";
import define7 from "./5a63548f9c799b76@576.js";
import define8 from "./6eda90668ae03044@804.js";
import define9 from "./c7a3b20cec5d4dd9@669.js";
import define10 from "./0e0b35a92c819d94@444.js";
import define11 from "./293899bef371e135@267.js";
import define12 from "./64641700df65baed@91.js";

function _1(gfx,htl){return(
htl.html`<h1 style="display: none;">Hackable Firebase Realtime Database Server Prototype #2<h1>
${gfx}
<h2 style="font-size:42px">Prototype #2</h2>
<h3>Focus areas: Firebase Client compatibility, Redis Persistence, GET/PUT/LISTEN/UNLISTEN</h3>`
)}

function _showOverlay(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.toggle({ label: "show SDK logging?" }),
  localStorageView("logger")
)
)}

function _useWebsocket(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.toggle({ label: "websocket?" }),
  localStorageView("websocket", {
    json: true
  })
)
)}

function _toggleWebsockets(useWebsocket)
{
  if (!useWebsocket) window.WebSocket = undefined;
}


function _rtdbLogs(Inputs){return(
Inputs.input([])
)}

function _overlay(showOverlay,view,Inputs,$0,Event,$1,html,makeSticky,invalidation)
{
  if (!showOverlay) return;
  const sidebar = view`<div style="pointer-events: auto; width:40%; padding-top:3em;right:50px;background-color: white;">
    ${Inputs.bind(
      Inputs.textarea({
        width: "100%",
        rows: 10,
        disabled: true
      }),
      $0
    )}
    <div style="display:flex;">
      ${Inputs.button("clear logs", {
        reduce: () => (
          ($0.value = []),
          $0.dispatchEvent(new Event("input", { bubbles: true }))
        )
      })}
      ${["useWebsocket", $1]}
      
    </div>
  </div>`;
  const container = html`<div style="width:100%; height:100%; position: fixed;top:0px; pointer-events: none; ">${sidebar}`;
  const unstick = makeSticky(container, sidebar, { offset: 10 });
  invalidation.then(unstick);
  return container;
}


function _10(md){return(
md`This notebook is part of a [collection](https://observablehq.com/collection/@tomlarkworthy/firebase) creating **an improved, open-source Firebase-compatible realtime database**. We will create an elastic architecture by leveraging new serverless technology. Serverless will enable us to horizontally scale the expensive parts of request handling, such as authorization rules and external API connectors, without impacting throughput. The goal is to offer end user programmability of the system, including using ordinary Javascript for authorization rules, and other goodies like custom federated data sources. **Lack of programmability is the main weakness of existing managed realtime database offerings**.

To make something truly end user programmable, it is not enough to offer the source code under a permissive license. It needs innovate on documentation, innovate on workflow, offer social commenting features and be painless to stand up the customizations. This is why the prototype is hosted on Observable, it enables **literate programming**, in notebook comments, the fastest development feedback loop, one click forking -- all in the browser with zero setup. Our intellectual property is not locked in though, the code is an ES6 module that is also exported to Github [here](https://github.com/endpointservices/observable-notebooks/tree/main/%40tomlarkworthy/redis-backend-1).

This notebook is a prototype of a Redis based persistence and message broker backend. It's a living prototype, the code is executed in *your* browser. Its part of my quest to create a **transparent cloud**. It contains unit tests that exercise the broad features. are run in your browser that connect to an external Redis server. You can watch the network tab executing the commands in your browser's development tools. If you fork this notebook, you can change the code, the commands will hit the same redis server unless you also change the [redisConfig](https://observablehq.com/@tomlarkworthy/redis-backend-1#redisConfig) cell below.`
)}

function _11(md){return(
md`## At-least-once ordered delivery over unreliable communications

Causal consistency has implications when transporting messages over an unreliable transport. During network partitions, messages need to be buffered until there is an opportunity to send them. When they are eventually sent, they need to be applied by the server in the same order the client originally raised them and *exactly once*, because of **causal consistency**.

With ordered streaming transports like Websockets/TCP, it is enough for clients to buffer pending messages in a queue, and send them in order. In high performance applications, clients will not wait for a response, but rather pipeline requests one-after-another. If a connection is lost, any unacknowledged operations will be resent in order again ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L1069)). Pending operations are only removed from the queue after acknowledgement by the server ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L632)).

For the unordered transport like HTTP, the client can send multiple database requests in a single HTTP request. Firebase clients only have one HTTP in flight at a time ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L660), [source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L676)), but operations are still logically pipelines and acknowledged in streams much similar to the websocket transport.


`
)}

function _12(md){return(
md`
## Causal Consistency over Stateless Workers

So now we get to the core technical challenge. Causal consistency implies preserving the ordering of an individual client's operations. However, if operations are sent to a horizontally scaled service, each operation might hit different worker, yet they *must* coordinate to **effect** the persisted shared database state one-after-another. 

In Google's real Firebase Realtime database implementation all requests hit a single server so it can maintain a per client queue of pending operations, but by switching to an elastic architecture, the load balancer in front of the elastic compute works against us by scattering incoming operations across difference machines. Thus, the required pending operation queue needs to be moved to external shared state.`
)}

function _13(md){return(
md`*Let's build a 3rd party wire compatible Firebase Database Server.*`
)}

function _14(toc){return(
toc("h2,h3,h4,h5,h6")
)}

function _15(md){return(
md`## Introduction`
)}

function _16(width,md){return(
md`This is a prototype **Firebase wire compatible** Realtime Database Server. Vanilla Firebase web clients are able to connect and sync data with it. The server is written in [Observable](https://observablehq.com/) to simplify programmable customizability, you can one-click fork to host your own ([*really*](https://observablehq.com/@observablehq/fork-suggest-merge)).

I think an end user programmable database server has much potential, for example, you could use ordinary code to authorize requests, you could even call out to external APIs, checking signatures *etc.* You could create synthetic data views to federated data sources *on-demand*, or fanout writes to additional storage engines. You can collocate the database near to users for incredibly low latency. 

This is just a prototype though, and **not ready for production use**. However, it is a step in the right direction. The code layout has been optimized for observability, readability and developer ergonomics. Through use of [webcode.run](https://webcode.run) live coding, live traffic can be execution in the developers browser. You can attach the Chrome DevTools debugger and REPL traffic live. Furthermore, through the use of [flowQueue](/@tomlarkworthy/flow-queue)s, tunnelled requests leave their live execution trace in the variables of the notebook, so you can see the processing steps without special tooling. See the accompanying [Youtube video](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1) about some of the innovative development features.

<iframe width="${Math.min(720, width)}" height="315" src="https://www.youtube.com/embed/P6zuvlcAKag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _17(md){return(
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

function _18(md){return(
md`## Background
In a previous work we developed a tool for [reverse engineering the Firebase Realtime Database wire protocol](https://observablehq.com/@tomlarkworthy/rtdb-protocol), which included a very primitive Firebase Server Fake. Since then, we have created a [Redis driver](https://observablehq.com/@tomlarkworthy/redis) so notebooks can persist data to Redis directly, and so now we are in a position to put it all together. 
`
)}

function _19(md){return(
md`## Follow along
[twitter](https://twitter.com/tomlarkworthy) or 
<iframe src="https://webcode.substack.com/embed" width="640" height="200px" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>`
)}

function _20(md){return(
md`## Database URL`
)}

function _21(md){return(
md`With a specially formatted database URL we can send a vanilla Firebase client to a 3rd party server implementation.`
)}

function _databaseURL(thisNotebooksNamespace,thisNotebooksSlug){return(
`https://webcode.run?ns=${thisNotebooksNamespace}|${thisNotebooksSlug};server`
)}

function _23(md){return(
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

function _25(md){return(
md`### Firebase Test Clients`
)}

function _referenceDatabase(rtdb,$0,Event)
{
  rtdb.enableLogging((log) => {
    $0.value = $0.value + "\n" + log;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  });
}


function _28(md){return(
md`### Test Results`
)}

function _suite(server,flowQueue,createSuite){return(
server,
flowQueue,
createSuite({
  name: null
})
)}

function _30(md){return(
md`### Restart Test Clients & Tests`
)}

function _31($0){return(
$0
)}

function _32(md){return(
md`### Smoke Tests`
)}

function _33(md){return(
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

function _35(md){return(
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

function _37(md){return(
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

function _39(md){return(
md`## Custom Firebase Realtime Server`
)}

function _40(md){return(
md`### Storage Engine: Redis

Redis the the storage engine for this prototype. We are using a custom [redis-web](https://observablehq.com/@tomlarkworthy/redis) client.`
)}

function _42(md){return(
md`## Shared redis is used for global operations such as process_operation`
)}

function _43(operations){return(
operations
)}

function _redisConfig(){return(
{
  socket: {
    host: "redis.webcode.run",
    port: 443,
    tls: true
  }
}
)}

function _45(md){return(
md`### Long Poll Endpoint

Firebase clients make long lived connection to this endpoint`
)}

function _server(endpoint,$0){return(
endpoint("server", async (req, res) => {
  try {
    console.log("incoming HTTP", res, res);
    $0.send({ req, res }); // handle in to poll pipeline (unfold across Dataflow)
  } catch (err) {
    res.status(500).send(err.message);
  }
})
)}

function _47(md){return(
md`### Long Poll Request Pipeline

If you are live tunnelling the server endpoint, these cells will evaluate in response to production traffic (and will handle production traffic).`
)}

function _incomingLongpollRequest(flowQueue){return(
flowQueue({
  name: "incomingLongpollRequest",
  timeout_ms: 20000
})
)}

function _49(incomingLongpollRequest){return(
incomingLongpollRequest
)}

function _newSessionResponse(){return(
(callbackId, session, replyId) => `
  function pLPCommand(c, a1, a2, a3, a4) {
  parent.window["pLPCommand${callbackId}"] && parent.window["pLPCommand${callbackId}"](c, a1, a2, a3, a4);
  }
  function pRTLPCB(pN, data) {
  parent.window["pRTLPCB${callbackId}"] && parent.window["pRTLPCB${callbackId}"](pN, data);
  }
  pLPCommand('start','${session.client.client_id}','${session.password}')
  pRTLPCB(${replyId},${JSON.stringify([
  {
    t: "c",
    d: {
      t: "h",
      d: {
        ts: Date.now(),
        v: "5",
        h: "webcode.run",
        s: session.id
      }
    }
  }
])})`
)}

function _disconnectFrame(){return(
({ id, pw } = {}) => `<html><body><script>
  function EnvSendPing(destURL) {
  try{
  var xhr=new XMLHttpRequest();
  xhr.open("GET", destURL, false);
  xhr.send(null);
  } catch (e) { }
  }
  function EnvDisconnect() {
  EnvSendPing("/.lp?disconn=t&id=${id}&pw=${pw}");
  }
  if(window.addEventListener)
  window.addEventListener('unload',EnvDisconnect,false);
  else if(window.attachEvent)
  window.attachEvent('onunload',EnvDisconnect);
  </script></body></html>`
)}

async function _incomingLongpollRequestAction(incomingLongpollRequest,createClient,redisConfig,createLongpollSession,newSessionResponse,incrementLongpollResponseNum,$0,disconnectFrame,retrieveLongpollSession,$1,process_operation,next_notify,ack_notify)
{
  console.log("started incomingLongpollRequestAction");
  const req = incomingLongpollRequest.req;
  const res = incomingLongpollRequest.res;

  const callbackId = req.query.cb;
  if (req.query.start) {
    // New session initialized
    const cid = Math.random().toString(16).substring(3);
    const client = await createClient(redisConfig, cid);
    console.log("New long poll session");
    const session = await createLongpollSession(client, {
      password: Math.random().toString(16).substring(3)
    });

    console.log("Creating new long poll session", session);

    res.header("content-type", "application/javascript");
    res.send(
      newSessionResponse(
        callbackId,
        session,
        await incrementLongpollResponseNum(client)
      )
    );
    $0.respond("new connection");
  } else if (req.query.dframe) {
    res.header("content-type", "text/html");
    res.send(
      disconnectFrame({
        id: req.query.id,
        pw: req.query.pw
      })
    );
    $0.respond("disconnect frame");
  } else {
    const client = await createClient(redisConfig, req.query.id);
    const session = await retrieveLongpollSession(client);
    console.log("Long poll existing session", session);
    if (!session) {
      return $0.reject(
        new Error("Unrecognized connection id for " + req.query.id)
      );
    }

    res.header("content-type", "application/javascript");
    // We look for proof that a future longpoll came in, by stamping actions with a timestamp
    // If a future one comes in this one is no longer necissary and should be closed.
    const longpoll = Date.now();
    var commandIndex = 0;
    while (req.query[`d${commandIndex}`]) {
      const data = JSON.parse(
        atob(req.query[`d${commandIndex}`].replaceAll(".", "="))
      );
      commandIndex++;
      data.d.longpoll = longpoll;
      console.log("Incoming request", data);
      try {
        const response = await $1.send({
          session,
          request: data
        });
      } catch (err) {
        console.error(err);
      }
    }

    new Promise(async (_) => {
      console.log("run actions");
      while ("NOOP" !== (await process_operation(session.client))) {}
    });

    console.log("polling for response");
    $0.respond("streaming"); // let other stuff happen

    while (true) {
      const fromRedis = await next_notify(session.client);
      if (fromRedis) {
        debugger;
        // TODO this return path should be its own flow step
        const [id, reply] = fromRedis;

        /*
        if (Number.parseInt(reply.longpoll) > longpoll) {
          console.log("seen newer longpoll");
          res.send(`pRTLPCB(${await incrementLongpollResponseNum(client)},[])`);
          break;
        }*/

        // TODO: correctness: this should not be done until the next long poll comes in
        // that the point we know the previous command was processed
        console.log("ack reply", id, reply);
        ack_notify(session.client, id);

        res.send(
          `pRTLPCB(${await incrementLongpollResponseNum(
            client
          )},${JSON.stringify([
            {
              t: "d",
              d: {
                ...(reply.request_id && {
                  r: Number.parseInt(reply.request_id)
                }),
                ...(reply.action === "DATA" && { a: "d" }),
                b: {
                  ...(reply.status && { s: reply.status }),
                  d: JSON.parse(reply.data || '""'),
                  ...(reply.key && {
                    p: reply.key.replace("firebase-server-prototype-2", "")
                  })
                }
              }
            }
          ])});`
        );
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    console.log("Terminating");
  }
}


function _53(md){return(
md`### Data Request Pipeline`
)}

function _incomingRequest(flowQueue){return(
flowQueue({
  name: "incomingRequest",
  timeout_ms: 10000
})
)}

function _55(incomingRequest){return(
incomingRequest
)}

function _requestRouter(incomingRequest,$0,$1,$2,$3,$4)
{
  console.log("running requestRouter", incomingRequest);
  const client = incomingRequest.session.client;
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

  return commandHandler
    .send({
      session,
      command: request.d
    })
    .then((handlerResponse) => {
      console.log("requestRouter done", handlerResponse);
      $4.respond(handlerResponse);
      return handlerResponse;
    })
    .catch($4.reject);
}


function _57(md){return(
md`#### STATS`
)}

function _incomingStats(flowQueue){return(
flowQueue({
  name: "incomingStats",
  timeout_ms: 5000
})
)}

function _59(incomingStats){return(
incomingStats
)}

function _incomingStatsAction(incomingStats,enqueue_notify,$0)
{
  console.log("incomingStatsAction", incomingStats);
  const client = incomingStats.session.client;
  const request_id = incomingStats.command.r;
  try {
    // Short curcuit straight to the reply queue for this client
    const response = enqueue_notify(client, client.client_id, {
      request_id,
      status: "ok"
    });
    $0.respond(response);
    return response;
  } catch (err) {
    console.error(err, incomingStats);
    $0.reject(err);
    return err;
  }
}


function _61(md){return(
md`#### PUT`
)}

function _incomingPut(flowQueue){return(
flowQueue({
  name: "incomingPut",
  timeout_ms: 5000
})
)}

function _63(incomingPut){return(
incomingPut
)}

function _incomingPutAction(incomingPut,enqueue_operation,$0)
{
  const client = incomingPut.session.client;
  const path = incomingPut.command.b.p;
  const data = incomingPut.command.b.d;
  const request_id = incomingPut.command.r;
  try {
    const response = enqueue_operation(client, {
      request_id,
      action: "PUT",
      key: "firebase-server-prototype-2" + path,
      value: JSON.stringify(data)
    });
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _65(md){return(
md`#### GET`
)}

function _incomingGet(flowQueue){return(
flowQueue({
  name: "incomingGet",
  timeout_ms: 5000
})
)}

function _67(incomingGet){return(
incomingGet
)}

function _incomingGetAction(incomingGet,enqueue_operation,$0)
{
  const client = incomingGet.session.client;
  const path = incomingGet.command.b.p;
  const query = incomingGet.command.b.q;
  const request_id = incomingGet.command.r;

  // TODO permissions check
  // { s: "permission_denied", d: "Permission denied" };
  try {
    const response = enqueue_operation(client, {
      request_id,
      action: "GET",
      key: "firebase-server-prototype-2" + path
    });
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _69(md){return(
md`#### QUERY`
)}

function _pathToListeners(){return(
{}
)}

function _incomingQuery(flowQueue){return(
flowQueue({
  name: "incomingQuery",
  timeout_ms: 5000
})
)}

function _72(incomingQuery){return(
incomingQuery
)}

function _incomingQueryAction(incomingQuery,enqueue_operation,$0)
{
  // Actions: Listen/Query
  const client = incomingQuery.session.client;
  const command = incomingQuery.command;
  const request_id = incomingQuery.command.r;
  const path = incomingQuery.command.b.p;

  try {
    const response = enqueue_operation(client, {
      request_id,
      action: "LISTEN",
      key: "firebase-server-prototype-2" + path
    });
    $0.respond(response);
    return response;
  } catch (err) {
    $0.reject(err);
    return err;
  }
}


function _74(md){return(
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


function _78(md){return(
md`### Remote notebook state

We expose an endpoint for reading the remote notebooks state, which can be useful for debugging remote errors.`
)}

function _trackingVariable_e3366d24de62(){return(
true
)}

function _81(endpoint,notebookSnapshot){return(
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

function _82(md){return(
md`### [Health check](https://observablehq.com/@endpointservices/healthcheck)

The healthcheck is actively monitored and includes the smoke tests.

| Region      | URL |
| ----------- | ----------- |
| us-central1      | https://webcode.run/regions/us-central1/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Ffirebase-server-prototype-1&wait=50      |
| europe-west4   | https://webcode.run/regions/europe-west4/observablehq.com/@endpointservices/healthcheck?target=%40tomlarkworthy%2Ffirebase-server-prototype-1&wait=50        |`
)}

function _83(md){return(
md`When running inside the healthcheck notebook, the slug is detected incorrectly as "healthcheck" which means the clients connect to the wrong place. So we have manual fix.`
)}

function _HEALTH_CHECK_FALLBACK_SLUG(){return(
"firebase-server-prototype-1"
)}

function _HEALTH_CHECK_FALLBACK_NAMESPACE(){return(
"tomlarkworthy"
)}

function _86(md){return(
md`### Notebook Error Monitoring, Analytics and Backups`
)}

function _87(footer){return(
footer
)}

function _88(md){return(
md`### Dependancies`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["gfx","htl"], _1);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  const child2 = runtime.module(define2);
  main.import("makeSticky", child2);
  const child3 = runtime.module(define3);
  main.import("view", child3);
  main.variable(observer("viewof showOverlay")).define("viewof showOverlay", ["Inputs","localStorageView"], _showOverlay);
  main.variable(observer("showOverlay")).define("showOverlay", ["Generators", "viewof showOverlay"], (G, _) => G.input(_));
  main.variable(observer("viewof useWebsocket")).define("viewof useWebsocket", ["Inputs","localStorageView"], _useWebsocket);
  main.variable(observer("useWebsocket")).define("useWebsocket", ["Generators", "viewof useWebsocket"], (G, _) => G.input(_));
  main.variable(observer("toggleWebsockets")).define("toggleWebsockets", ["useWebsocket"], _toggleWebsockets);
  main.variable(observer("viewof rtdbLogs")).define("viewof rtdbLogs", ["Inputs"], _rtdbLogs);
  main.variable(observer("rtdbLogs")).define("rtdbLogs", ["Generators", "viewof rtdbLogs"], (G, _) => G.input(_));
  main.variable(observer("overlay")).define("overlay", ["showOverlay","view","Inputs","viewof rtdbLogs","Event","viewof useWebsocket","html","makeSticky","invalidation"], _overlay);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["toc"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["width","md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("databaseURL")).define("databaseURL", ["thisNotebooksNamespace","thisNotebooksSlug"], _databaseURL);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("clientConfig")).define("clientConfig", ["databaseURL"], _clientConfig);
  main.variable(observer()).define(["md"], _25);
  const child4 = runtime.module(define4).derive([{name: "clientConfig", alias: "config"}], main);
  main.import("viewof restartClient", child4);
  main.import("restartClient", child4);
  main.import("rtdb", child4);
  main.import("rootA", child4);
  main.import("rootB", child4);
  main.variable(observer("referenceDatabase")).define("referenceDatabase", ["rtdb","viewof rtdbLogs","Event"], _referenceDatabase);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof suite")).define("viewof suite", ["server","flowQueue","createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["viewof restartClient"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("readYourWriteTest")).define("readYourWriteTest", ["suite","randomString","rtdb","rootA","expect"], _readYourWriteTest);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("readTheirWriteTest")).define("readTheirWriteTest", ["suite","randomString","rtdb","rootA","rootB","expect"], _readTheirWriteTest);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("listenNotifiedOfWrite")).define("listenNotifiedOfWrite", ["suite","randomString","rtdb","rootA","rootB","_"], _listenNotifiedOfWrite);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  const child5 = runtime.module(define5);
  main.import("enqueue_operation", child5);
  main.import("enqueue_notify", child5);
  main.import("process_operation", child5);
  main.import("next_notify", child5);
  main.import("ack_notify", child5);
  main.import("createClient", child5);
  main.import("createLongpollSession", child5);
  main.import("retrieveLongpollSession", child5);
  main.import("incrementLongpollResponseNum", child5);
  main.import("operations", child5);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["operations"], _43);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("server")).define("server", ["endpoint","viewof incomingLongpollRequest"], _server);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("viewof incomingLongpollRequest")).define("viewof incomingLongpollRequest", ["flowQueue"], _incomingLongpollRequest);
  main.variable(observer("incomingLongpollRequest")).define("incomingLongpollRequest", ["Generators", "viewof incomingLongpollRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingLongpollRequest"], _49);
  main.variable(observer("newSessionResponse")).define("newSessionResponse", _newSessionResponse);
  main.variable(observer("disconnectFrame")).define("disconnectFrame", _disconnectFrame);
  main.variable(observer("incomingLongpollRequestAction")).define("incomingLongpollRequestAction", ["incomingLongpollRequest","createClient","redisConfig","createLongpollSession","newSessionResponse","incrementLongpollResponseNum","viewof incomingLongpollRequest","disconnectFrame","retrieveLongpollSession","viewof incomingRequest","process_operation","next_notify","ack_notify"], _incomingLongpollRequestAction);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("viewof incomingRequest")).define("viewof incomingRequest", ["flowQueue"], _incomingRequest);
  main.variable(observer("incomingRequest")).define("incomingRequest", ["Generators", "viewof incomingRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingRequest"], _55);
  main.variable(observer("requestRouter")).define("requestRouter", ["incomingRequest","viewof incomingStats","viewof incomingPut","viewof incomingQuery","viewof incomingGet","viewof incomingRequest"], _requestRouter);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("viewof incomingStats")).define("viewof incomingStats", ["flowQueue"], _incomingStats);
  main.variable(observer("incomingStats")).define("incomingStats", ["Generators", "viewof incomingStats"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingStats"], _59);
  main.variable(observer("incomingStatsAction")).define("incomingStatsAction", ["incomingStats","enqueue_notify","viewof incomingStats"], _incomingStatsAction);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("viewof incomingPut")).define("viewof incomingPut", ["flowQueue"], _incomingPut);
  main.variable(observer("incomingPut")).define("incomingPut", ["Generators", "viewof incomingPut"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingPut"], _63);
  main.variable(observer("incomingPutAction")).define("incomingPutAction", ["incomingPut","enqueue_operation","viewof incomingPut"], _incomingPutAction);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer("viewof incomingGet")).define("viewof incomingGet", ["flowQueue"], _incomingGet);
  main.variable(observer("incomingGet")).define("incomingGet", ["Generators", "viewof incomingGet"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingGet"], _67);
  main.variable(observer("incomingGetAction")).define("incomingGetAction", ["incomingGet","enqueue_operation","viewof incomingGet"], _incomingGetAction);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("pathToListeners")).define("pathToListeners", _pathToListeners);
  main.variable(observer("viewof incomingQuery")).define("viewof incomingQuery", ["flowQueue"], _incomingQuery);
  main.variable(observer("incomingQuery")).define("incomingQuery", ["Generators", "viewof incomingQuery"], (G, _) => G.input(_));
  main.variable(observer()).define(["incomingQuery"], _72);
  main.variable(observer("incomingQueryAction")).define("incomingQueryAction", ["incomingQuery","enqueue_operation","viewof incomingQuery"], _incomingQueryAction);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("randomString")).define("randomString", _randomString);
  main.variable(observer("thisNotebooksNamespace")).define("thisNotebooksNamespace", ["thisNotebooksSlug","HEALTH_CHECK_FALLBACK_SLUG","HEALTH_CHECK_FALLBACK_NAMESPACE","html"], _thisNotebooksNamespace);
  main.variable(observer("thisNotebooksSlug")).define("thisNotebooksSlug", ["html","HEALTH_CHECK_FALLBACK_SLUG"], _thisNotebooksSlug);
  main.variable(observer()).define(["md"], _78);
  const child6 = runtime.module(define6);
  main.import("notebookSnapshot", child6);
  main.variable(observer("trackingVariable_e3366d24de62")).define("trackingVariable_e3366d24de62", _trackingVariable_e3366d24de62);
  main.variable(observer()).define(["endpoint","notebookSnapshot"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer("HEALTH_CHECK_FALLBACK_SLUG")).define("HEALTH_CHECK_FALLBACK_SLUG", _HEALTH_CHECK_FALLBACK_SLUG);
  main.variable(observer("HEALTH_CHECK_FALLBACK_NAMESPACE")).define("HEALTH_CHECK_FALLBACK_NAMESPACE", _HEALTH_CHECK_FALLBACK_NAMESPACE);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer()).define(["footer"], _87);
  main.variable(observer()).define(["md"], _88);
  const child7 = runtime.module(define7);
  main.import("gfx", child7);
  const child8 = runtime.module(define8);
  main.import("endpoint", child8);
  const child9 = runtime.module(define9);
  main.import("expect", child9);
  main.import("createSuite", child9);
  const child10 = runtime.module(define10);
  main.import("flowQueue", child10);
  const child11 = runtime.module(define11);
  main.import("footer", child11);
  const child12 = runtime.module(define12);
  main.import("toc", child12);
  return main;
}
