import define1 from "./6a703b03d185f279@1000.js";
import define2 from "./0e0b35a92c819d94@418.js";
import define3 from "./293899bef371e135@247.js";

function _1(md){return(
md`#  Redis as the Shared State for an Elastic Realtime Database`
)}

function _2(md){return(
md`This notebook is a next living prototype for a realtime database backend. It contains unit tests that are run in your browser that connect to an external Redis server. You can observe the network communications yourself through your browser's developer tools. You can fork this notebook and extend it. It is open source, and it is also backed up to Github.`
)}

function _3(md){return(
md`https://microservices.io/patterns/data/transactional-outbox.html`
)}

function _4(md){return(
md`In my imagination of a better Realtime Database server, I think, I want it easy to use. I want to use an ordinary programming language for the authorization rules. In the rules, I want to be able to call 3rd party APIs, and write inefficient code if I want, synchronously, right in the critical path. What I don't want to do, is to conform to some deliberately constraining bespoke language. 

So there are very good and valid reasons why infrastructure vendors avoid shipping general programming languages... security risks, scaling, performance, consistency... but using simple Javascript would be better right?

So in my ideal architecture, we execute authorization rules and other services in horizontally scaled compute. So you could write some sloppy code and it will just costs a bit more to run, but you can ship faster and avoid learning the arcane security rules. 

But this has issues, horizontal compute like serverless implies other constraints. Workers are ephemeral and stateless. But this statelessness clashes with stateful clients like Firebase that require executing a carefully ordered stateful wire protocol to meet their consistency guarantees.

Firebase is a causally consistent distributed database. This implies that clients always see other client's operations in the same order they occurred. There may be significant delays to observing the operations of an individual client -- it could be offline -- but when it does sync, those operations are applied in the order they occurred.

Causal consistency is basically the best consistency you can hope for in a distributed setting. Strong consistency requires a global ordering of operations and would exclude offline caching. Eventual consistency is a much weaker consistency guarantee that tells you nothing about ordering and is the cause of many strange race conditions. Causal consistency seems to match programmers intuitive programming model of database, and is one of reasons why I think Firebase did well. We really want causal consistency in our distributed databases! 

So now we get to the core technical challenge. Causal consistency implies preserving the ordering of operations of clients. However, if operations are sent over HTTP to a horizontally scaled service, each HTTP request might hit different database workers, yet they *must* somehow coordinate to effect the persisted shared database state in the correct logical order. The load balancer in front of the elastic compute works against us by scattering incoming operations across difference machines.

All is not lost though, it is still possible to implement an ordered at-least-once protocol over HTTP, but you must add additional data to identify logical sessions and ordering and suchlike. This session metadata needs to be made available to all nodes in the cluster via some shared state.

So for my ideal architecture, we need some shared state that all the stateless workers will need to access every request. I chose Redis, as it is a common offering that is low latency and can fulfill the persistence role too. In this architecture, the stateless workers terminate public client connections and decode the database protocol, but really they are just pushing state around a Redis backend.

So this notebook is my first literate programming prototype of a Redis backend suitable for building a 3rd party Firebase-compatible database server. The big difference to the preceding [prototype #1](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1) is that first was about gathering proof that it was possible to interface to clients, but it made no attempt at consistency guarantees. That prototype was about implementing the wire protocol to see if it could be done. 

In contrast, this notebook is splitting off the Redis component into a dedicated notebook, so we can define a clear backend API and test in insolation. Redis will be used to both store data, like a database, and pass events around, like a message broker. In order for our system to achieve causal consistency and at-least-once semantics, care must be taken on the API interface and internal data processing.
`
)}

function _5(md){return(
md`### At-least-once delivery

queues and acks`
)}

function _6(md){return(
md`## Fuzzer`
)}

function _7(md){return(
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


function _14(md){return(
md`## Test clients`
)}

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

function _18(md){return(
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

function _27(md){return(
md`## Data Model`
)}

function _28(md){return(
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

function _31(md){return(
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

function _36(md){return(
md`### Client Connections`
)}

function _createClient(createRedisClient){return(
async (redisConfig, client_id) => ({
  redis: await createRedisClient(redisConfig),
  client_id
})
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

function _41(md){return(
md`### init_client`
)}

function _42(init_client,client0){return(
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

function _44(md){return(
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

function _46(md){return(
md`## Client Actions`
)}

function _47(md){return(
md`### enqueue_action`
)}

function _48(enqueue_action,client0){return(
enqueue_action(client0, {
  request_id: "A",
  action: "LISTEN",
  key: "foo"
})
)}

function _49(enqueue_action,client0){return(
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

function _51(md){return(
md`### head_action_id`
)}

function _52(get_head_action_id,client0){return(
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

function _55(md){return(
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

function _57(md){return(
md`### ack_action`
)}

function _ack_action(set_head_action_id){return(
({ redis, client_id } = {}, id) => {
  return set_head_action_id({ redis, client_id }, id);
}
)}

function _59(md){return(
md`### clear_actions`
)}

function _clear_actions(client_action_queue){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["DEL", client_action_queue(client_id)])
)}

function _61(md){return(
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

function _68(md){return(
md`## Action Processing`
)}

async function _69(clear_data_listeners,client0,enqueue_action,run_action,pop_reply,ack_reply)
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


function _70(md){return(
md`### run_action

Removes item from client action queue, then effects it within a transaction that also increments the action queue head.

Ensures the action is applied at-least-once and atomically. `
)}

function _71(run_action,client0){return(
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

function _74(run_action_args){return(
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


function _79(md){return(
md`### run_put_action`
)}

function _run_put_action_args(flowQueue){return(
flowQueue({
  name: "run_put_action_args",
  timeout_ms: 2000
})
)}

function _81(run_put_action_args){return(
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

function _84(md){return(
md`### run_get_action`
)}

function _run_get_action_args(flowQueue){return(
flowQueue({
  name: "run_get_action_args",
  timeout_ms: 2000
})
)}

function _86(run_get_action_args){return(
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

function _89(md){return(
md`### run_listen_action`
)}

function _run_listen_action_args(flowQueue){return(
flowQueue({
  name: "run_listen_action_args"
})
)}

function _91(run_listen_action_args){return(
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

function _94(md){return(
md`### run_unlisten`
)}

function _run_unlisten_action_args(flowQueue){return(
flowQueue({
  name: "run_unlisten_action_args"
})
)}

function _96(run_unlisten_action_args){return(
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

function _99(md){return(
md`---
## Config`
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

function _101(md){return(
md`---`
)}

function _102(md){return(
md`## Dependencies`
)}

function _105(md){return(
md`## Backups and Analytics`
)}

function _107(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("mulberry32")).define("mulberry32", _mulberry32);
  main.variable(observer("rnd")).define("rnd", ["mulberry32"], _rnd);
  main.variable(observer("viewof fuzz")).define("viewof fuzz", ["Inputs"], _fuzz);
  main.variable(observer("fuzz")).define("fuzz", ["Generators", "viewof fuzz"], (G, _) => G.input(_));
  main.variable(observer("plan")).define("plan", ["fuzz","rnd","invalidation"], _plan);
  main.variable(observer("runPlan")).define("runPlan", ["clients","init_client","clear_data_listeners","client0","plan","enqueue_action","run_action"], _runPlan);
  main.variable(observer("histories")).define("histories", ["runPlan","clients","pop_reply","ack_reply"], _histories);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof restartClients")).define("viewof restartClients", ["Inputs"], _restartClients);
  main.variable(observer("restartClients")).define("restartClients", ["Generators", "viewof restartClients"], (G, _) => G.input(_));
  main.variable(observer("client0")).define("client0", ["restartClients","createClient","redisConfig"], _client0);
  main.variable(observer("clients")).define("clients", ["restartClients","client0","createClient","redisConfig"], _clients);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("client_longpoll_session")).define("client_longpoll_session", _client_longpoll_session);
  main.variable(observer("client_longpoll_reply")).define("client_longpoll_reply", _client_longpoll_reply);
  main.variable(observer("client_action_queue")).define("client_action_queue", _client_action_queue);
  main.variable(observer("client_action_head_id")).define("client_action_head_id", _client_action_head_id);
  main.variable(observer("client_reply_queue")).define("client_reply_queue", _client_reply_queue);
  main.variable(observer("client_reply_head_id")).define("client_reply_head_id", _client_reply_head_id);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("data_listeners")).define("data_listeners", _data_listeners);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("set_data")).define("set_data", ["data"], _set_data);
  main.variable(observer("get_data")).define("get_data", ["data"], _get_data);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("add_data_listener")).define("add_data_listener", ["data_listeners"], _add_data_listener);
  main.variable(observer("remove_data_listener")).define("remove_data_listener", ["data_listeners"], _remove_data_listener);
  main.variable(observer("get_data_listeners")).define("get_data_listeners", ["data_listeners"], _get_data_listeners);
  main.variable(observer("clear_data_listeners")).define("clear_data_listeners", ["data_listeners"], _clear_data_listeners);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("createClient")).define("createClient", ["createRedisClient"], _createClient);
  main.variable(observer("createLongpollSession")).define("createLongpollSession", ["init_client","client_longpoll_session"], _createLongpollSession);
  main.variable(observer("getLongpollSession")).define("getLongpollSession", ["client_longpoll_session"], _getLongpollSession);
  main.variable(observer("incrementLongpollReply")).define("incrementLongpollReply", ["client_longpoll_reply"], _incrementLongpollReply);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["init_client","client0"], _42);
  main.variable(observer("init_client")).define("init_client", ["clear_actions","clear_replies","set_head_action_id","set_head_reply_id"], _init_client);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("workers")).define("workers", ["ack_run_action","put_action_reponse","get_action_repsonse","listen_action_reponse","unlisten_action_response"], _workers);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["enqueue_action","client0"], _48);
  main.variable(observer()).define(["enqueue_action","client0"], _49);
  main.variable(observer("enqueue_action")).define("enqueue_action", ["client_action_queue"], _enqueue_action);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["get_head_action_id","client0"], _52);
  main.variable(observer("get_head_action_id")).define("get_head_action_id", ["client_action_head_id"], _get_head_action_id);
  main.variable(observer("set_head_action_id")).define("set_head_action_id", ["client_action_head_id"], _set_head_action_id);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("pop_action")).define("pop_action", ["get_head_action_id","client_action_queue"], _pop_action);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("ack_action")).define("ack_action", ["set_head_action_id"], _ack_action);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("clear_actions")).define("clear_actions", ["client_action_queue"], _clear_actions);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("enqueue_reply")).define("enqueue_reply", ["client_reply_queue"], _enqueue_reply);
  main.variable(observer("get_head_reply_id")).define("get_head_reply_id", ["client_reply_head_id"], _get_head_reply_id);
  main.variable(observer("set_head_reply_id")).define("set_head_reply_id", ["client_reply_head_id"], _set_head_reply_id);
  main.variable(observer("pop_reply")).define("pop_reply", ["get_head_reply_id","client_reply_queue"], _pop_reply);
  main.variable(observer("ack_reply")).define("ack_reply", ["set_head_reply_id"], _ack_reply);
  main.variable(observer("clear_replies")).define("clear_replies", ["client_reply_queue"], _clear_replies);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["clear_data_listeners","client0","enqueue_action","run_action","pop_reply","ack_reply"], _69);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer()).define(["run_action","client0"], _71);
  main.variable(observer("run_action")).define("run_action", ["viewof run_action_args"], _run_action);
  main.variable(observer("viewof run_action_args")).define("viewof run_action_args", ["flowQueue"], _run_action_args);
  main.variable(observer("run_action_args")).define("run_action_args", ["Generators", "viewof run_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_action_args"], _74);
  main.variable(observer("actionRaw")).define("actionRaw", ["pop_action","run_action_args","viewof run_action_args","invalidation"], _actionRaw);
  main.variable(observer("action")).define("action", ["actionRaw"], _action);
  main.variable(observer("response")).define("response", ["run_action_args","action","data_listeners","get_data_listeners","viewof run_put_action_args","data","get_data","viewof run_get_action_args","viewof run_listen_action_args","viewof run_unlisten_action_args","viewof run_action_args"], _response);
  main.variable(observer("ack_run_action")).define("ack_run_action", ["run_action_args","response","actionRaw","ack_action","viewof run_action_args"], _ack_run_action);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("viewof run_put_action_args")).define("viewof run_put_action_args", ["flowQueue"], _run_put_action_args);
  main.variable(observer("run_put_action_args")).define("run_put_action_args", ["Generators", "viewof run_put_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_put_action_args"], _81);
  main.variable(observer("run_put_action_effect")).define("run_put_action_effect", ["run_put_action_args","set_data","enqueue_reply"], _run_put_action_effect);
  main.variable(observer("put_action_reponse")).define("put_action_reponse", ["viewof run_put_action_args","run_put_action_effect"], _put_action_reponse);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("viewof run_get_action_args")).define("viewof run_get_action_args", ["flowQueue"], _run_get_action_args);
  main.variable(observer("run_get_action_args")).define("run_get_action_args", ["Generators", "viewof run_get_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_get_action_args"], _86);
  main.variable(observer("run_get_action_effect")).define("run_get_action_effect", ["run_get_action_args","enqueue_reply"], _run_get_action_effect);
  main.variable(observer("get_action_repsonse")).define("get_action_repsonse", ["viewof run_get_action_args","run_get_action_effect"], _get_action_repsonse);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer("viewof run_listen_action_args")).define("viewof run_listen_action_args", ["flowQueue"], _run_listen_action_args);
  main.variable(observer("run_listen_action_args")).define("run_listen_action_args", ["Generators", "viewof run_listen_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_listen_action_args"], _91);
  main.variable(observer("run_listen_effect")).define("run_listen_effect", ["run_listen_action_args","enqueue_reply","add_data_listener"], _run_listen_effect);
  main.variable(observer("listen_action_reponse")).define("listen_action_reponse", ["viewof run_listen_action_args","run_listen_effect"], _listen_action_reponse);
  main.variable(observer()).define(["md"], _94);
  main.variable(observer("viewof run_unlisten_action_args")).define("viewof run_unlisten_action_args", ["flowQueue"], _run_unlisten_action_args);
  main.variable(observer("run_unlisten_action_args")).define("run_unlisten_action_args", ["Generators", "viewof run_unlisten_action_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_unlisten_action_args"], _96);
  main.variable(observer("run_unlisten_effect")).define("run_unlisten_effect", ["run_unlisten_action_args","remove_data_listener","enqueue_reply"], _run_unlisten_effect);
  main.variable(observer("unlisten_action_response")).define("unlisten_action_response", ["viewof run_unlisten_action_args","run_unlisten_effect"], _unlisten_action_response);
  main.variable(observer()).define(["md"], _99);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  main.variable(observer()).define(["md"], _101);
  main.variable(observer()).define(["md"], _102);
  const child1 = runtime.module(define1);
  main.import("createClient", "createRedisClient", child1);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer()).define(["md"], _105);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _107);
  return main;
}
