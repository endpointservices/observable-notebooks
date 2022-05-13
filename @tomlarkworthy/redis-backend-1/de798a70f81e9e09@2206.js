import define1 from "./6a703b03d185f279@1000.js";
import define2 from "./0e0b35a92c819d94@418.js";
import define3 from "./293899bef371e135@247.js";

function _1(md){return(
md`#  Redis as the Shared State for an Elastic Realtime Database`
)}

function _2(md){return(
md`This notebook is part of a [collection](https://observablehq.com/collection/@tomlarkworthy/firebase) creating **an improved, open-source Firebase-compatible realtime database**. We will create an elastic architecture by leveraging new serverless technology. Serverless will enable us to horizontally scale the expensive parts of request handling, such as authorization rules and external API connectors, without impacting throughput. The goal is to offer end user programmability of the system, including using ordinary Javascript for authorization rules, and other goodies like custom federated data sources. **Lack of programmability is the main weakness of existing managed realtime database offerings**.

To make something truly end user programmable, it is not enough to offer the source code under a permissive license. It needs innovate on documentation, innovate on workflow, offer social commenting features and be painless to stand up the customizations. This is why the prototype is hosted on Observable, it enables **literate programming**, in notebook comments, the fastest development feedback loop, one click forking -- all in the browser with zero setup. Our intellectual property is not locked in though, the code is an ES6 module that is also exported to Github [here](https://github.com/endpointservices/observable-notebooks/tree/main/%40tomlarkworthy/redis-backend-1).

This notebook is a prototype of a Redis based persistence and message broker backend. It's a living prototype, the code is executed in *your* browser. Its part of my quest to create a **transparent cloud**. It contains unit tests that exercise the broad features. are run in your browser that connect to an external Redis server. You can watch the network tab executing the commands in your browser's development tools. If you fork this notebook, you can change the code, the commands will hit the same redis server unless you also change the [redisConfig](https://observablehq.com/@tomlarkworthy/redis-backend-1#redisConfig) cell below.`
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

function _4(md){return(
md`## Why we are here: bespoke security languages suck`
)}

function _5(md){return(
md`*(BTW, this comes from painful realization from reflecting on [Firebase Rules](https://firebase.blog/posts/2018/01/introducing-query-based-security-rules), [Blaze Compiler](https://github.com/googlearchive/blaze_compiler) and the [Common Expression Language](https://github.com/google/cel-spec))*`
)}

async function _6(FileAttachment,width,md){return(
md`In my imagination of a better Realtime Database server, I think, I want it easy to use. **I want to use an ordinary programming language for authorization rules**. In the rules, I want to be able to **call 3rd party APIs**, and write inefficient code if I want, **synchronously**, right in the critical path. What I don't want to do, is to conform to some *deliberately constraining bespoke language*. 


There are good arguments as to why infrastructure vendors avoid shipping general programming languages in their managed products... security risks, scaling, performance, consistency... but using simple Javascript would be be so much easier for us developers. Implementing authorization as code is the exact approach I would take if I were writing a common three tier architecture.

So in my ideal architecture, we execute authorization rules and other services in horizontally scaled stateless workers. If you wrote some sloppy code, it would scale up and costs more to run, but that could be the right tradeoff. 


${await FileAttachment("IMG_20220511_204941@1.jpg").image({width: Math.min(width, 300)})}

But this has issues, horizontal compute like serverless implies other constraints. Workers are ephemeral and stateless. But this statelessness clashes with stateful clients like Firebase that require executing a carefully ordered stateful wire protocol to meet their consistency guarantees.`
)}

function _7(width,md){return(
md`## Causal Consistency

Firebase is (nearly) a causally consistent distributed database. This implies that **clients always see other client's operations in the order they occurred**. There may be significant delays to observing the operations of an individual client -- it could be offline -- but when it does sync, those operations are observed in order.

<svg width="${Math.min(600, width)}px" viewBox="0 0 600 164" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 62 (91390) - https://sketch.com -->
    <title>Artboard</title>
    <desc>Created with Sketch.</desc>
    <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle id="Oval" stroke="#000000" stroke-width="7" cx="68" cy="60" r="26.5"></circle>
        <circle id="Oval" stroke="#000000" stroke-width="7" cx="532" cy="60" r="26.5"></circle>
        <circle id="Oval" stroke="#000000" stroke-width="7" cx="300" cy="60" r="26.5"></circle>
        <line x1="98.5" y1="60.5" x2="270.5" y2="60.5" id="Line" stroke="#000000" stroke-width="7" stroke-linecap="square"></line>
        <line x1="330.5" y1="60.5" x2="502.5" y2="60.5" id="Line" stroke="#000000" stroke-width="7" stroke-linecap="square"></line>
        <line x1="68.5" y1="90.5" x2="69" y2="103" id="Line" stroke="#000000" stroke-width="7" stroke-linecap="square"></line>
        <line x1="299.5" y1="90.5" x2="300" y2="103" id="Line" stroke="#000000" stroke-width="7" stroke-linecap="square"></line>
        <line x1="531.5" y1="90.5" x2="532" y2="103" id="Line" stroke="#000000" stroke-width="7" stroke-linecap="square"></line>
        <text id="eventual" font-family="Helvetica-BoldOblique, Helvetica" font-size="20" font-style="italic" font-weight="bold" fill="#000000">
            <tspan x="27.4287109" y="128">eventual</tspan>
        </text>
        <text id="causal" font-family="Helvetica-BoldOblique, Helvetica" font-size="20" font-style="italic" font-weight="bold" fill="#000000">
            <tspan x="268.867188" y="128">causal</tspan>
        </text>
        <text id="sequential" font-family="Helvetica-BoldOblique, Helvetica" font-size="20" font-style="italic" font-weight="bold" fill="#000000">
            <tspan x="482.541992" y="128">sequential</tspan>
        </text>
    </g>
</svg>

*Causal* consistency is the best consistency you can hope for in a distributed setting. The stronger consistency model, *sequential* consistency, requires a global ordering of operations and doesn't permit progress during network partitions. Sequential consistency, of course, cannot work for something including web page visitors. Going the other way, *eventual* consistency, implies nothing other than operations eventually become visible, but says nothing about ordering. Eventual consistency can be the cause of hard to replicate race conditions, and can leave you second guessing root causes of bugs. Causal consistency, on the other hand, is the optimal middle ground, and seems to match programmer's intuitive mental model of database. The ergonomics of causal consistency is one of reasons why I think Firebase was hit, suffice it to say that **causal consistency is a desirable property in a distributed databases!**


`
)}

function _8(md){return(
md`## At-least-once ordered delivery over unreliable communications

Causal consistency has implications when transporting messages over an unreliable transport. During network partitions, messages need to be buffered until there is an opportunity to send them. When they are eventually sent, they need to be applied by the server in the same order the client originally raised them, because of **causal consistency**.

With ordered streaming transports like Websockets/TCP, it is enough for clients to buffer pending messages in a queue, and send them in order. In high performance applications, clients will not wait for a response, but rather pipeline requests one-after-another. If a connection is lost, any unacknowledged operations will be resent in order again ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L1069)). Pending operations are only removed from the queue after acknowledgement by the server ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L632)).

For the unordered transport like HTTP, the client can send multiple database requests in a single HTTP request. Firebase clients only have one HTTP in flight at a time ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L660), [source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L676)), but operations are still logically pipelines and acknowledged in streams much similar to the websocket transport.


`
)}

function _9(md){return(
md`
## Causal Consistency over Stateless Workers

So now we get to the core technical challenge. Causal consistency implies preserving the ordering of an individual client's operations. However, if operations are sent to a horizontally scaled service, each operation might hit different worker, yet they *must* coordinate to **effect** the persisted shared database state one-after-another. 

In Google's real Firebase Realtime database implementation all requests hit a single server so it can maintain a per client queue of pending operations, but by switching to an elastic architecture, the load balancer in front of the elastic compute works against us by scattering incoming operations across difference machines. Thus, the required pending operation queue needs to be moved to external shared state.`
)}

function _10(md){return(
md`## Redis as the Shared State

So for my ideal architecture, we need some shared state that all the stateless workers will need to access every request. I chose Redis, as it is a common offering, that is low latency and can fulfill the storage role too. In this architecture, the stateless workers terminate public client connections and execute the database protocol by moving state around a Redis backend.

Redis has some fantastic features for ensuring at-least-once delivery and causal consistency. Firstly, queues, hashmaps and stream are all first class citizens in Redis with their own specialised instructions for manipulation. Secondly, sequences of Redis commands can be applied atomically in a [transaction](https://redis.io/docs/manual/transactions/). For example, we can pop an instruction from an inbox, apply the effects, and write notifications to other inboxes in a single atomic operation. 

This is an amazing because if we can apply client operations, including all the event deliveries to all other clients, in atomic operations, we meet the requirements for causal consistency. The main requirement for causal consistency is that other clients observe a client's operations in the order they were raised. So, if we pop operations from a clients inbox in order, and ensure they are applied atomically, then the effects on other client's outbox observations are also in causal order, and we are free to execute instructions from different clients in parallel.  `
)}

function _11(md){return(
md`### Client Connections`
)}

function _createClient(createRedisClient){return(
async (redisConfig, client_id) => ({
  redis: await createRedisClient(redisConfig),
  client_id
})
)}

function _14(md){return(
md`## Test clients`
)}

function _15(md){return(
md`## Fuzzer`
)}

function _16(md){return(
md`### *mulberry32*, a seeded random number generator

When fuzzing it's nice to be able to reconstruct the failure case from a seed. So we want a deterministic plan given some numeric seed.

From [stack overflow, seeding RNG](https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript)
Thanks [bryc](https://stackoverflow.com/users/815680/bryc)!
`
)}

function _mulberry32(){return(
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
)}

function _rnd(mulberry32){return(
mulberry32(Math.random() * 100000000)
)}

function _fuzz(Inputs){return(
Inputs.toggle({
  label: "Run fuzzer?"
})
)}

function _plan(fuzz,rnd,invalidation){return(
fuzz
  ? Array.from({ length: 20 }).map((_) => {
      const action = Math.floor(rnd() * 4);
      const client = Math.floor(rnd() * 3);
      const key = Math.floor(rnd() * 3);
      return {
        client: client,
        action: action,
        key: key
      };
    })
  : invalidation
)}

async function _runPlan(clients,init_client,clear_data_listeners,client0,plan,enqueue_action,run_action)
{
  // clear state
  console.log("Resetting clients");
  await Promise.all(clients.map((c) => init_client(c)));
  console.log("Resetting listeners");
  await Promise.all(
    ["k0", "k1", "k2"].map((k) => clear_data_listeners(client0, k))
  );
  // enqueue actions
  console.log("Running plan");
  return await Promise.all(
    plan.map((instruction, i) => {
      const client = clients[instruction.client];
      const key = "k" + instruction.key.toString();
      const action =
        instruction.action == 0
          ? {
              action: "PUT",
              key,
              value: "t" + i
            }
          : instruction.action == 1
          ? {
              action: "LISTEN",
              key
            }
          : instruction.action == 2
          ? {
              action: "UNLISTEN",
              key
            }
          : instruction.action == 3
          ? {
              action: "GET",
              key
            }
          : undefined;
      action.request_id = "r" + i;
      enqueue_action(client, action);
      return run_action(client);
    })
  );
}


function _histories(runPlan,clients,pop_reply,ack_reply)
{
  // wait for plan to run
  runPlan;
  // Now drain the queues
  return Promise.all(
    clients.map(async (client) => {
      const history = [];
      var next = await pop_reply(client);
      while (next) {
        const [id, replyRaw] = next;
        const reply = replyRaw.reduce((obj, val, index, arr) => {
          if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
          return obj;
        }, {});
        ack_reply(client, id);
        history.push(reply);
        next = await pop_reply(client);
      }
      return history;
    })
  );
}


function _restartClients(Inputs){return(
Inputs.button("restart clients")
)}

function _client0(restartClients,createClient,redisConfig){return(
restartClients, createClient(redisConfig, "0")
)}

async function _clients(restartClients,client0,createClient,redisConfig){return(
restartClients,
[
  client0,
  await createClient(redisConfig, "1"),
  await createClient(redisConfig, "2")
]
)}

function _26(md){return(
md`## Resource Identifiers`
)}

function _client_longpoll_session(){return(
(client_id) => `c-${client_id}-lp`
)}

function _client_longpoll_reply(){return(
(client_id) => `c-${client_id}-rp`
)}

function _client_action_queue(){return(
(client_id) => `c-${client_id}-actions`
)}

function _client_action_head_id(){return(
(client_id) => `c-${client_id}-actions-head`
)}

function _client_reply_queue(){return(
(client_id) => `c-${client_id}-replies`
)}

function _client_reply_head_id(){return(
(client_id) => `c-${client_id}-replies-head`
)}

function _data(){return(
(key) => `${key}-data`
)}

function _data_listeners(){return(
(key) => `${key}-listeners`
)}

function _35(md){return(
md`## Data Model`
)}

function _36(md){return(
md`### Data Storage`
)}

function _set_data(data){return(
({ redis, client_id } = {}, key, value) =>
  redis.sendCommand(["SET", data(key), value])
)}

function _get_data(data){return(
({ redis, client_id } = {}, key) =>
  redis.sendCommand(["GET", data(key)])
)}

function _39(md){return(
md`### Listeners`
)}

function _add_data_listener(data_listeners){return(
({ redis, client_id } = {}, key) =>
  redis.sendCommand(["LPUSH", data_listeners(key), client_id])
)}

function _remove_data_listener(data_listeners){return(
({ redis, client_id } = {}, key) =>
  redis.sendCommand(["LREM", data_listeners(key), "1", client_id])
)}

function _get_data_listeners(data_listeners){return(
({ redis, client_id } = {}, key) =>
  redis.sendCommand(["LRANGE", data_listeners(key), "0", "-1"])
)}

function _clear_data_listeners(data_listeners){return(
({ redis, client_id } = {}, key) =>
  redis.sendCommand(["DEL", data_listeners(key)])
)}

function _createLongpollSession(init_client,client_longpoll_session){return(
async ({ redis, client_id }, { password } = {}) => {
  init_client({ redis, client_id });
  await redis.sendCommand([
    "HSET",
    client_longpoll_session(client_id),
    "responseId",
    "0",
    "password",
    password
  ]);
  var responseId = 0;
  return Object.defineProperties(
    {},
    {
      client: {
        value: { redis, client_id },
        enumerable: true
      },
      password: {
        value: password,
        enumerable: true
      }
    }
  );
}
)}

function _getLongpollSession(client_longpoll_session){return(
async ({ redis, client_id }) => {
  const response = await redis.sendCommand([
    "HMGET",
    client_longpoll_session(client_id),
    "responseId",
    "password"
  ]);
  var responseId = response[0];
  return Object.defineProperties(
    {},
    {
      client: {
        value: { redis, client_id },
        enumerable: true
      },
      password: {
        value: response[1],
        enumerable: true
      }
    }
  );
}
)}

function _incrementLongpollReply(client_longpoll_reply){return(
async ({ redis, client_id }) => {
  return (
    (await redis.sendCommand(["INCR", client_longpoll_reply(client_id)])) - 1
  );
}
)}

function _47(md){return(
md`### init_client`
)}

function _48(init_client,client0){return(
init_client(client0)
)}

function _init_client(clear_actions,clear_replies,set_head_action_id,set_head_reply_id){return(
({ redis, client_id }) => {
  clear_actions({ redis, client_id });
  clear_replies({ redis, client_id });
  set_head_action_id({ redis, client_id }, "0-0");
  set_head_reply_id({ redis, client_id }, "0-0");
}
)}

function _50(md){return(
md`### Workers`
)}

function _workers(ack_run_action,put_action_reponse,get_action_repsonse,listen_action_reponse,unlisten_action_response){return(
[
  ack_run_action,
  put_action_reponse,
  get_action_repsonse,
  listen_action_reponse,
  unlisten_action_response
]
)}

function _52(md){return(
md`## Client Actions`
)}

function _53(md){return(
md`### enqueue_action`
)}

function _54(enqueue_action,client0){return(
enqueue_action(client0, {
  request_id: "A",
  action: "LISTEN",
  key: "foo"
})
)}

function _55(enqueue_action,client0){return(
enqueue_action(client0, {
  request_id: "B",
  action: "PUT",
  key: "foo",
  value: "bar"
})
)}

function _enqueue_action(client_action_queue){return(
({ redis, client_id } = {}, action) =>
  redis.sendCommand(
    ["XADD", client_action_queue(client_id), "*"].concat(
      Object.entries(action).flatMap((_) => _)
    )
  )
)}

function _57(md){return(
md`### head_action_id`
)}

function _58(get_head_action_id,client0){return(
get_head_action_id(client0)
)}

function _get_head_action_id(client_action_head_id){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["GET", client_action_head_id(client_id)])
)}

function _set_head_action_id(client_action_head_id){return(
({ redis, client_id } = {}, value) =>
  redis.sendCommand(["SET", client_action_head_id(client_id), value])
)}

function _61(md){return(
md`### pop_action`
)}

function _pop_action(get_head_action_id,client_action_queue){return(
async ({ redis, client_id } = {}) => {
  const id = await get_head_action_id({ redis, client_id });
  const response = await redis.sendCommand([
    "XREAD",
    "COUNT",
    "1",
    "STREAMS",
    client_action_queue(client_id),
    id
  ]);
  return response && response[0][1][0];
}
)}

function _63(md){return(
md`### ack_action`
)}

function _ack_action(set_head_action_id){return(
({ redis, client_id } = {}, id) => {
  return set_head_action_id({ redis, client_id }, id);
}
)}

function _65(md){return(
md`### clear_actions`
)}

function _clear_actions(client_action_queue){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["DEL", client_action_queue(client_id)])
)}

function _67(md){return(
md`## Client Reply`
)}

function _enqueue_reply(client_reply_queue){return(
({ redis, client_id } = {}, target_client_id, reply) =>
  redis.sendCommand(
    ["XADD", client_reply_queue(target_client_id), "*"].concat(
      Object.entries(reply).flatMap((_) => _)
    )
  )
)}

function _get_head_reply_id(client_reply_head_id){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["GET", client_reply_head_id(client_id)])
)}

function _set_head_reply_id(client_reply_head_id){return(
({ redis, client_id } = {}, value) =>
  redis.sendCommand(["SET", client_reply_head_id(client_id), value])
)}

function _pop_reply(get_head_reply_id,client_reply_queue){return(
async ({ redis, client_id } = {}) => {
  const id = await get_head_reply_id({ redis, client_id });
  const response = await redis.sendCommand([
    "XREAD",
    "COUNT",
    "1",
    "STREAMS",
    client_reply_queue(client_id),
    id
  ]);
  return response && response[0][1][0];
}
)}

function _ack_reply(set_head_reply_id){return(
({ redis, client_id } = {}, id) => {
  return set_head_reply_id({ redis, client_id }, id);
}
)}

function _clear_replies(client_reply_queue){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["DEL", client_reply_queue(client_id)])
)}

function _74(md){return(
md`## Action Processing`
)}

async function _75(clear_data_listeners,client0,enqueue_action,run_action,pop_reply,ack_reply)
{
  clear_data_listeners(client0, "foo");
  await enqueue_action(client0, {
    request_id: "1",
    action: "LISTEN",
    key: "foo"
  });
  await enqueue_action(client0, {
    request_id: "2",
    action: "PUT",
    key: "foo",
    value: "bar"
  });
  await enqueue_action(client0, {
    request_id: "3",
    action: "GET",
    key: "foo"
  });
  await enqueue_action(client0, {
    request_id: "4",
    action: "UNLISTEN",
    key: "foo"
  });

  while ((await run_action(client0)) !== "NOOP") {}

  const history = [];
  var next = await pop_reply(client0);
  while (next) {
    const [id, reply] = next;
    history.push(reply);
    ack_reply(client0, id);
    next = await pop_reply(client0);
  }
  return history;
}


function _76(md){return(
md`### run_action

Removes item from client action queue, then effects it within a transaction that also increments the action queue head.

Ensures the action is applied at-least-once and atomically. `
)}

function _77(run_action,client0){return(
run_action(client0)
)}

function _run_action($0){return(
async (client) => $0.send(client)
)}

function _run_action_args(flowQueue){return(
flowQueue({
  name: "run_action_args",
  timeout_ms: 2000
})
)}

function _80(run_action_args){return(
run_action_args
)}

async function _actionRaw(pop_action,run_action_args,$0,invalidation)
{
  const actionRaw = await pop_action(run_action_args);
  if (!actionRaw) {
    $0.respond("NOOP");
    return invalidation;
  } else {
    return actionRaw;
  }
}


function _action(actionRaw){return(
actionRaw[1].reduce((obj, val, index, arr) => {
  if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
  return obj;
}, {})
)}

async function _response(run_action_args,action,data_listeners,get_data_listeners,$0,data,get_data,$1,$2,$3,$4)
{
  const client = run_action_args;
  const code = action.action;
  const longpoll = action.longpoll;
  let result;
  try {
    if (code === "PUT") {
      // We need a snapshot of the affected listeners before we start the transaciton
      client.redis.sendCommand(["WATCH", data_listeners(action.key)]);
      const listenersPromise = get_data_listeners(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $0.send({
        longpoll,
        client,
        listeners: await listenersPromise,
        action: action
      });
    } else if (code === "GET") {
      client.redis.sendCommand(["WATCH", data(action.key)]);
      const dataPromise = get_data(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $1.send({
        longpoll,
        client,
        data: await dataPromise,
        action: action
      });
    } else if (code === "LISTEN") {
      client.redis.sendCommand(["WATCH", data(action.key)]);
      const dataPromise = get_data(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $2.send({
        longpoll,
        client,
        data: await dataPromise,
        action: action
      });
    } else if (code === "UNLISTEN") {
      client.redis.sendCommand(["MULTI"]);
      result = await $3.send({
        longpoll,
        client,
        action: action
      });
    } else {
      throw new Error("Unknown action code " + code);
    }
    return result;
  } catch (err) {
    console.error(err.message, action);
    client.redis.sendCommand(["DISCARD"]);
    $4.reject(err);
    return err;
  }
}


async function _ack_run_action(run_action_args,response,actionRaw,ack_action,$0)
{
  const client = run_action_args;
  response; // If we have a response, we have acted
  const action_id = actionRaw[0];
  try {
    ack_action(client, action_id);
    client.redis.sendCommand(["EXEC"]);
    $0.respond(response);
    return response;
  } catch (err) {
    await client.redis.sendCommand(["DISCARD"]);
    $0.reject(err);
    return err;
  }
}


function _85(md){return(
md`### run_put_action`
)}

function _run_put_action_args(flowQueue){return(
flowQueue({
  name: "run_put_action_args",
  timeout_ms: 2000
})
)}

function _87(run_put_action_args){return(
run_put_action_args
)}

function _run_put_action_effect(run_put_action_args,set_data,enqueue_reply)
{
  const client = run_put_action_args.client;
  const action = run_put_action_args.action;
  var result = set_data(client, action.key, action.value);
  run_put_action_args.listeners.forEach((client_id) => {
    var result = enqueue_reply(client, client_id, {
      action: "DATA",
      key: action.key,
      data: action.value
    });
  });
  return enqueue_reply(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _put_action_reponse($0,run_put_action_effect){return(
$0.respond(run_put_action_effect)
)}

function _90(md){return(
md`### run_get_action`
)}

function _run_get_action_args(flowQueue){return(
flowQueue({
  name: "run_get_action_args",
  timeout_ms: 2000
})
)}

function _92(run_get_action_args){return(
run_get_action_args
)}

function _run_get_action_effect(run_get_action_args,enqueue_reply)
{
  const client = run_get_action_args.client;
  const action = run_get_action_args.action;
  const data = run_get_action_args.data;
  return enqueue_reply(client, client.client_id, {
    request_id: action.request_id,
    status: "ok",
    data
  });
}


function _get_action_repsonse($0,run_get_action_effect){return(
$0.respond(run_get_action_effect)
)}

function _95(md){return(
md`### run_listen_action`
)}

function _run_listen_action_args(flowQueue){return(
flowQueue({
  name: "run_listen_action_args"
})
)}

function _97(run_listen_action_args){return(
run_listen_action_args
)}

function _run_listen_effect(run_listen_action_args,enqueue_reply,add_data_listener)
{
  const client = run_listen_action_args.client;
  const action = run_listen_action_args.action;
  const data = run_listen_action_args.data;
  enqueue_reply(client, client.client_id, {
    action: "DATA",
    key: action.key,
    data: data
  });
  add_data_listener(client, action.key);
  return enqueue_reply(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _listen_action_reponse($0,run_listen_effect){return(
$0.respond(run_listen_effect)
)}

function _100(md){return(
md`### run_unlisten`
)}

function _run_unlisten_action_args(flowQueue){return(
flowQueue({
  name: "run_unlisten_action_args"
})
)}

function _102(run_unlisten_action_args){return(
run_unlisten_action_args
)}

function _run_unlisten_effect(run_unlisten_action_args,remove_data_listener,enqueue_reply)
{
  const client = run_unlisten_action_args.client;
  const action = run_unlisten_action_args.action;
  remove_data_listener(client, action.key);
  return enqueue_reply(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _unlisten_action_response($0,run_unlisten_effect){return(
$0.respond(
  run_unlisten_effect
)
)}

function _105(md){return(
md`---`
)}

function _106(md){return(
md`## Dependencies`
)}

function _includeIf(){return(
(predicate, string) => (predicate ? string : "")
)}

function _109(md){return(
md`## Backups and Analytics`
)}

function _111(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["IMG_20220511_204941@1.jpg", {url: new URL("./files/f92b7180c94f6c629e3a641c391704d873c02098d15153c7049a24abf5363da758152325b9670b6d07266f7918bb9ecec218a30aeafead46c184f1fd62b357d4", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["FileAttachment","width","md"], _6);
  main.variable(observer()).define(["width","md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("createClient", "createRedisClient", child1);
  main.variable(observer("createClient")).define("createClient", ["createRedisClient"], _createClient);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("mulberry32")).define("mulberry32", _mulberry32);
  main.variable(observer("rnd")).define("rnd", ["mulberry32"], _rnd);
  main.variable(observer("viewof fuzz")).define("viewof fuzz", ["Inputs"], _fuzz);
  main.variable(observer("fuzz")).define("fuzz", ["Generators", "viewof fuzz"], (G, _) => G.input(_));
  main.variable(observer("plan")).define("plan", ["fuzz","rnd","invalidation"], _plan);
  main.variable(observer("runPlan")).define("runPlan", ["clients","init_client","clear_data_listeners","client0","plan","enqueue_action","run_action"], _runPlan);
  main.variable(observer("histories")).define("histories", ["runPlan","clients","pop_reply","ack_reply"], _histories);
  main.variable(observer("viewof restartClients")).define("viewof restartClients", ["Inputs"], _restartClients);
  main.variable(observer("restartClients")).define("restartClients", ["Generators", "viewof restartClients"], (G, _) => G.input(_));
  main.variable(observer("client0")).define("client0", ["restartClients","createClient","redisConfig"], _client0);
  main.variable(observer("clients")).define("clients", ["restartClients","client0","createClient","redisConfig"], _clients);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("client_longpoll_session")).define("client_longpoll_session", _client_longpoll_session);
  main.variable(observer("client_longpoll_reply")).define("client_longpoll_reply", _client_longpoll_reply);
  main.variable(observer("client_action_queue")).define("client_action_queue", _client_action_queue);
  main.variable(observer("client_action_head_id")).define("client_action_head_id", _client_action_head_id);
  main.variable(observer("client_reply_queue")).define("client_reply_queue", _client_reply_queue);
  main.variable(observer("client_reply_head_id")).define("client_reply_head_id", _client_reply_head_id);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("data_listeners")).define("data_listeners", _data_listeners);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("set_data")).define("set_data", ["data"], _set_data);
  main.variable(observer("get_data")).define("get_data", ["data"], _get_data);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("add_data_listener")).define("add_data_listener", ["data_listeners"], _add_data_listener);
  main.variable(observer("remove_data_listener")).define("remove_data_listener", ["data_listeners"], _remove_data_listener);
  main.variable(observer("get_data_listeners")).define("get_data_listeners", ["data_listeners"], _get_data_listeners);
  main.variable(observer("clear_data_listeners")).define("clear_data_listeners", ["data_listeners"], _clear_data_listeners);
  main.variable(observer("createLongpollSession")).define("createLongpollSession", ["init_client","client_longpoll_session"], _createLongpollSession);
  main.variable(observer("getLongpollSession")).define("getLongpollSession", ["client_longpoll_session"], _getLongpollSession);
  main.variable(observer("incrementLongpollReply")).define("incrementLongpollReply", ["client_longpoll_reply"], _incrementLongpollReply);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["init_client","client0"], _48);
  main.variable(observer("init_client")).define("init_client", ["clear_actions","clear_replies","set_head_action_id","set_head_reply_id"], _init_client);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("workers")).define("workers", ["ack_run_action","put_action_reponse","get_action_repsonse","listen_action_reponse","unlisten_action_response"], _workers);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["enqueue_action","client0"], _54);
  main.variable(observer()).define(["enqueue_action","client0"], _55);
  main.variable(observer("enqueue_action")).define("enqueue_action", ["client_action_queue"], _enqueue_action);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["get_head_action_id","client0"], _58);
  main.variable(observer("get_head_action_id")).define("get_head_action_id", ["client_action_head_id"], _get_head_action_id);
  main.variable(observer("set_head_action_id")).define("set_head_action_id", ["client_action_head_id"], _set_head_action_id);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("pop_action")).define("pop_action", ["get_head_action_id","client_action_queue"], _pop_action);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("ack_action")).define("ack_action", ["set_head_action_id"], _ack_action);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer("clear_actions")).define("clear_actions", ["client_action_queue"], _clear_actions);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("enqueue_reply")).define("enqueue_reply", ["client_reply_queue"], _enqueue_reply);
  main.variable(observer("get_head_reply_id")).define("get_head_reply_id", ["client_reply_head_id"], _get_head_reply_id);
  main.variable(observer("set_head_reply_id")).define("set_head_reply_id", ["client_reply_head_id"], _set_head_reply_id);
  main.variable(observer("pop_reply")).define("pop_reply", ["get_head_reply_id","client_reply_queue"], _pop_reply);
  main.variable(observer("ack_reply")).define("ack_reply", ["set_head_reply_id"], _ack_reply);
  main.variable(observer("clear_replies")).define("clear_replies", ["client_reply_queue"], _clear_replies);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer()).define(["clear_data_listeners","client0","enqueue_action","run_action","pop_reply","ack_reply"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer()).define(["run_action","client0"], _77);
  main.variable(observer("run_action")).define("run_action", ["viewof run_action_args"], _run_action);
  main.variable(observer("viewof run_action_args")).define("viewof run_action_args", ["flowQueue"], _run_action_args);
  main.variable(observer("run_action_args")).define("run_action_args", ["Generators", "viewof run_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_action_args"], _80);
  main.variable(observer("actionRaw")).define("actionRaw", ["pop_action","run_action_args","viewof run_action_args","invalidation"], _actionRaw);
  main.variable(observer("action")).define("action", ["actionRaw"], _action);
  main.variable(observer("response")).define("response", ["run_action_args","action","data_listeners","get_data_listeners","viewof run_put_action_args","data","get_data","viewof run_get_action_args","viewof run_listen_action_args","viewof run_unlisten_action_args","viewof run_action_args"], _response);
  main.variable(observer("ack_run_action")).define("ack_run_action", ["run_action_args","response","actionRaw","ack_action","viewof run_action_args"], _ack_run_action);
  main.variable(observer()).define(["md"], _85);
  main.variable(observer("viewof run_put_action_args")).define("viewof run_put_action_args", ["flowQueue"], _run_put_action_args);
  main.variable(observer("run_put_action_args")).define("run_put_action_args", ["Generators", "viewof run_put_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_put_action_args"], _87);
  main.variable(observer("run_put_action_effect")).define("run_put_action_effect", ["run_put_action_args","set_data","enqueue_reply"], _run_put_action_effect);
  main.variable(observer("put_action_reponse")).define("put_action_reponse", ["viewof run_put_action_args","run_put_action_effect"], _put_action_reponse);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer("viewof run_get_action_args")).define("viewof run_get_action_args", ["flowQueue"], _run_get_action_args);
  main.variable(observer("run_get_action_args")).define("run_get_action_args", ["Generators", "viewof run_get_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_get_action_args"], _92);
  main.variable(observer("run_get_action_effect")).define("run_get_action_effect", ["run_get_action_args","enqueue_reply"], _run_get_action_effect);
  main.variable(observer("get_action_repsonse")).define("get_action_repsonse", ["viewof run_get_action_args","run_get_action_effect"], _get_action_repsonse);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer("viewof run_listen_action_args")).define("viewof run_listen_action_args", ["flowQueue"], _run_listen_action_args);
  main.variable(observer("run_listen_action_args")).define("run_listen_action_args", ["Generators", "viewof run_listen_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_listen_action_args"], _97);
  main.variable(observer("run_listen_effect")).define("run_listen_effect", ["run_listen_action_args","enqueue_reply","add_data_listener"], _run_listen_effect);
  main.variable(observer("listen_action_reponse")).define("listen_action_reponse", ["viewof run_listen_action_args","run_listen_effect"], _listen_action_reponse);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer("viewof run_unlisten_action_args")).define("viewof run_unlisten_action_args", ["flowQueue"], _run_unlisten_action_args);
  main.variable(observer("run_unlisten_action_args")).define("run_unlisten_action_args", ["Generators", "viewof run_unlisten_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_unlisten_action_args"], _102);
  main.variable(observer("run_unlisten_effect")).define("run_unlisten_effect", ["run_unlisten_action_args","remove_data_listener","enqueue_reply"], _run_unlisten_effect);
  main.variable(observer("unlisten_action_response")).define("unlisten_action_response", ["viewof run_unlisten_action_args","run_unlisten_effect"], _unlisten_action_response);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer("includeIf")).define("includeIf", _includeIf);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer()).define(["md"], _109);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _111);
  return main;
}
