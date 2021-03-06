import define1 from "./6a703b03d185f279@1002.js";
import define2 from "./9bed702f80a3797e@402.js";
import define3 from "./5a63548f9c799b76@576.js";
import define4 from "./0e0b35a92c819d94@418.js";
import define5 from "./c7a3b20cec5d4dd9@669.js";
import define6 from "./293899bef371e135@267.js";

function _1(gfx,md){return(
md`${gfx}
<div style="display: none">
# A Causally Consistent Redis Backend for a Firebase-compatible Realtime Database
</div>
# Recreating Firebase's secret sauce in Literate Programming Form`
)}

function _2(md){return(
md`Firebase's databases are easy-to-use and intuitive, but they solve some tricky problems in distributed databases. **Firebase is often misclassified as an eventually consistent database**, but if that were the full truth, you would hear developers complain of data loss footguns and logically "impossible" security holes.

The reason why Firebase is intuitive to use, even for inexperienced programmers, is because a phenomenal amount of engineering resources were dedicated in ensuring the database achieved the best possible consistency guarantees you could hope for in a distributed setting *i.e.* **causal consistency**.

Causal consistency provides the bedrock on which other advanced features, such as offline persistency, optimistic updates, can be built upon. In this notebook we advance our [hackable Firebase-compatible server](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1) by developing a Redis backend suitable for use in a serverless architecture.`
)}

function _3(toc){return(
toc("h2,h3")
)}

async function _4(FileAttachment,md){return(
md`## Causal Consistency

_Causal consistency_ implies that **clients always see other client's operations in the order they occurred** [*]. There may be significant delays to observing the operations of an individual client — it could be offline — but when it does sync, those operations are observed in order. Operations made by different clients, on the other hand, may be observed in any order relative to one another.

${await FileAttachment("cc@1.svg").image({ style: "max-width: 400px;" })}

`
)}

function _5(width,md){return(
md`The stronger distributed consistency model, *sequential* consistency, requires a global ordering of operations and doesn't permit progress during network partitions. So sequential consistency is a non-starter for a distributed setting with ephemeral participants like web page visitors.

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

Going the other way, *eventual* consistency, implies nothing other than operations eventually become visible, but says nothing about ordering. Eventual consistency can be the cause of hard to replicate race conditions, and can leave you second guessing root causes of bugs. 

Causal consistency, on the other hand, is the optimal middle ground, which seems to match programmer's expectations of semantics. The ergonomics of causal consistency is one of the reasons why Firebase was such a hit. So suffice it to say that **causal consistency is what you want in a distributed database!**



[*] _Actually the general definition of causal consistency is more involved but it simplifies to this when clients connect to a central server in a star topology like Firebase does._ See [Time, Clocks, and the Ordering of Events in a Distributed System](https://lamport.azurewebsites.net/pubs/time-clocks.pdf) by _Leslie Lamport_ for a more theoretical treatment of causal consistency. In Firebase, the causal relations are added with subscriptions. 
`
)}

function _6(md){return(
md`## A Literate, End User Programmable Implementation on Redis`
)}

function _7(md){return(
md`This notebook is a prototype of a Redis based backend intended for the next iteration of a [**hackable 3rd party Firebase-compatible database server**](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1). This notebook is live code! the code is executed in *your* browser. Its will eventually become part of a **transparent cloud** where all services are auditable, extendable, self-hostable and customizable. This notebook includes integration tests that exercise the broad features. The implementation connects to an external Redis server which you can verify in your browser's development tools. If you fork this notebook, you can change the code, the commands will hit the same external Redis server unless you also change the [redisConfig](https://observablehq.com/@tomlarkworthy/redis-backend-1#redisConfig) cell below.`
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

function _9(md){return(
md`If you have any questions, you can ask them inline with a [comment](https://observablehq.com/@observablehq/comments).`
)}

function _suite(createSuite){return(
createSuite({ name: "Reactive Integration Tests" })
)}

function _11(md){return(
md`## Why we are building this: end user programmability`
)}

function _12(md){return(
md`*(BTW, this comes from painful personal realization from reflecting on my work on the [Firebase Rules](https://firebase.blog/posts/2018/01/introducing-query-based-security-rules), [Blaze Compiler](https://github.com/googlearchive/blaze_compiler) and the [Common Expression Language](https://github.com/google/cel-spec))*`
)}

function _13(md){return(
md`In my imagination of a better Realtime Database server, I think, **I want to use an ordinary programming language for authorization rules** and, I want to **query over different data-sources through federation**. Within auth checks, I want to be able to **call 3rd party APIs**, and write inefficient code if I want, **synchronously**. What I don't want to do, is to conform to some *deliberately constraining bespoke language* which is what Firebase asks me to do. 

Firebase, and similar products, don't allow general programming languages in the critical path because authorization is part of the database engine where latency impacts throughput. To enable end user customization, we need to rethink the architecture. Luckily new options have appeared since Firebase was developed. Modern infrastructure, like serverless, offers new opportunities for horizontal scaling. So let's try to execute our authorization rules and other services in horizontally scaled stateless workers. With this architecture, slow authorization or federation code would cost slightly more to run, but it would be isolated from the primary database performance.

`
)}

function _a(FileAttachment){return(
FileAttachment("a.svg").image({ style: "max-width: 600px" })
)}

function _15(md){return(
md`
Horizontal compute, like serverless, add additional design constraints though. Workers are ephemeral and stateless. But this statelessness clashes with stateful clients like Firebase that require executing a carefully ordered stateful wire protocol to meet their consistency guarantees. We will resolve this conundrum by externalizing all state into a stateful backend that the workers connect to, and for this prototype, we will try Redis.`
)}

function _16(md){return(
md`## Redis as the Shared State

In this new architecture, we use shared state that all the stateless workers will need to access every request. We chose Redis, as it is offered everywhere, it is known for low latency, and because we can also  use it as the primary storage too. In this architecture, the stateless workers terminate public client connections and execute the database protocol by moving state around a Redis backend.

Redis has some fantastic features for ensuring *at-least-once delivery*, *exactly-one* processing and therefore _causal consistency_. Firstly, queues, hashmaps and stream are all first class citizens in Redis with their own specialised instructions for manipulation. Secondly, sequences of Redis commands can be applied atomically in a [transaction](https://redis.io/docs/manual/transactions/). For example, we can pop an instruction from an inbox, apply the effects, and write notifications to other inboxes in a single atomic operation. 

This is an amazing because if we can apply client operations, including all the event deliveries to all other clients, in atomic operations, we can meet the requirements for _causal consistency_. The main requirement for _causal consistency_ is that other clients observe a client's operations in the order they were raised. So, if we pop operations from a clients inbox in order, and ensure they are applied atomically, then the effects on other client's outbox observations are also in causal order, and we are free to execute instructions from different clients in parallel.  `
)}

function _17(md){return(
md`### Connecting to Redis: *createClient*`
)}

function _18(md){return(
md`We will dedicate Redis client for each Firebase client. We will identify a client by its **client_id**, which will map to Firebase's connection id ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/Connection.ts#L98)). `
)}

function _createClient(createRedisClient){return(
async (redisConfig, client_id) => ({
  redis: await createRedisClient(redisConfig),
  client_id
})
)}

function _21(md){return(
md`So we can run functionality in the notebook, lets create an example client now!`
)}

function _exampleClient(restartClients,createClient,redisConfig)
{
  restartClients; // Depend on restartClients cell so we can cycle this client
  return createClient(redisConfig, "exampleClient");
}


function _23(md){return(
md`As Redis connections are stateful, if we hit a bug it is useful to cycle them`
)}

function _restartClients(Inputs){return(
Inputs.button("restart clients")
)}

function _25(md){return(
md`We can test the client is working by sending a PING command `
)}

function _26(suite,expect,exampleClient){return(
suite.test("Example client responds to PONG with PING", async () => {
  expect(await exampleClient.redis.sendCommand(["PING"])).toBe("PONG");
})
)}

async function _27(FileAttachment,md){return(
md`### Initializing the state for a fresh client: *init_client*

Central to the ordering guarantees is that client operations are processed in order, implying a queue for each client. 

${await FileAttachment("Q.SVG").image({style: "max-width: 640px"})}

When an SDK connects for the first time to the server, we need to setup two queues streams for the inbound (operations) and outbound (notifications) directions. We use Redis [streams](https://redis.io/docs/manual/data-types/streams/) to implement the queues, as they have features for ensuring *at-least-once* delivery which are beyond the basic [lists](https://redis.io/docs/manual/data-types/#lists).`
)}

function _init_client(clear_operations,clear_notifications,set_head_operation_id,set_head_notify_id){return(
({ redis, client_id }) => {
  clear_operations({ redis, client_id });
  clear_notifications({ redis, client_id });
  set_head_operation_id({ redis, client_id }, "0");
  return set_head_notify_id({ redis, client_id }, "0-0");
}
)}

function _29(md){return(
md`#### Key helpers

All data-structures in Redis are stored under keys. We use helper functions for generating key names for per client data-structure.`
)}

function _client_operation_queue_key(){return(
(client_id) => `c-${client_id}-actions`
)}

function _client_notify_queue_key(){return(
(client_id) => `c-${client_id}-replies`
)}

function _32(md){return(
md`#### Clearing streams`
)}

function _33(md){return(
md`Clearing streams is as simple as issuing the [DEL](https://redis.io/commands/del/) to the key holding the stream.`
)}

function _clear_operations(client_operation_queue_key){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["DEL", client_operation_queue_key(client_id)])
)}

function _clear_notifications(client_notify_queue_key){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["DEL", client_notify_queue_key(client_id)])
)}

function _36(md){return(
md`#### Manipulating the head of queue pointer

For *ordered at-least-once* delivery, a queue should shift up **after** the action has been applied. This implies we need keys to remember where we are in the queue, which will be incremented as we do the work. Redis streams already have entry IDs, so we will reusing that.
`
)}

function _37(md){return(
md`First we define helper functions for the keys`
)}

function _client_operation_head_id_key(){return(
(client_id) => `c-${client_id}-actions-head`
)}

function _client_notify_head_id_key(){return(
(client_id) => `c-${client_id}-replies-head`
)}

function _40(md){return(
md`Then we define helpers for setting them. The [SET](https://redis.io/commands/set/) command updates the key with the provided value.`
)}

function _set_head_operation_id(client_operation_head_id_key){return(
({ redis, client_id } = {}, value) =>
  redis.sendCommand(["SET", client_operation_head_id_key(client_id), value])
)}

function _set_head_notify_id(client_notify_head_id_key){return(
({ redis, client_id } = {}, value) =>
  redis.sendCommand(["SET", client_notify_head_id_key(client_id), value])
)}

function _43(md){return(
md`Of course, later we will need the [GET](https://redis.io/commands/get/) too.`
)}

function _get_head_operation_id(client_operation_head_id_key){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["GET", client_operation_head_id_key(client_id)])
)}

function _get_head_notify_id(client_notify_head_id_key){return(
({ redis, client_id } = {}) =>
  redis.sendCommand(["GET", client_notify_head_id_key(client_id)])
)}

function _46(md){return(
md`So after we initialize a client, we expect their head pointers to be 0-0. Let's confirm that with an integration test:`
)}

function _47(suite,createClient,redisConfig,enqueue_operation,init_client,expect,get_head_operation_id,get_head_notify_id,next_operation,next_notify){return(
suite.test("init_client resets queues and heads", async () => {
  const client = await createClient(redisConfig, "init_client");
  enqueue_operation(client, {}); // Put some data in the queue

  init_client(client); // reset the client

  expect(await get_head_operation_id(client)).toBe("0");
  expect(await get_head_notify_id(client)).toBe("0-0");
  expect(await next_operation(client)).toBe(null);
  expect(await next_notify(client)).toBe(null);
})
)}

function _48(md){return(
md`## Initializing a new long poll session: *createLongpollSession*

Interfacing to Firebase's long polling transport requires some additional metadata to be tracked across requests. Its not hugely relevant to *causal consistency* but just something we need. We use Redis' [HSET](https://redis.io/commands/hset/) and [HMGET](https://redis.io/commands/hmget/) to associate a dictionary of values for each client. So far we are only using it to store the long poll session password.

The session password is a security measure that prevents other agents manipulating a running long poll session ([source](https://github.com/firebase/firebase-js-sdk/blob/master/packages/database/src/realtime/BrowserPollConnection.ts#L54)).`
)}

function _client_longpoll_session_key(){return(
(client_id) => `c-${client_id}-lp`
)}

function _createLongpollSession(init_client,client_longpoll_session_key){return(
async (client, { password } = {}) => {
  init_client(client);
  client.redis.sendCommand([
    "HSET",
    client_longpoll_session_key(client.client_id),
    "password",
    password
  ]);
  return {
    client,
    password
  };
}
)}

function _retrieveLongpollSession(client_longpoll_session_key){return(
async (client) => {
  const response = await client.redis.sendCommand([
    "HMGET",
    client_longpoll_session_key(client.client_id),
    "password"
  ]);
  return {
    client,
    password: response[0]
  };
}
)}

function _52(suite,createLongpollSession,exampleClient,retrieveLongpollSession,expect){return(
suite.test(
  "createLongpollSession can set a password that is visible to retrieveLongpollSession",
  async () => {
    const randomPassword = Math.random().toString();
    createLongpollSession(exampleClient, { password: randomPassword });
    const retrieveSession = await retrieveLongpollSession(exampleClient);
    expect(retrieveSession.password).toBe(randomPassword);
  }
)
)}

function _53(md){return(
md`#### Monotonic long poll response numbering with: *incrementLongpollResponseNum*

The Firebase database server numbers each server-to-client longpoll packet with a sequentially increasing response number. It is used by the client to derive the correct response ordering ([source](https://github.com/firebase/firebase-js-sdk/blob/c424340aaeedbf1772db06437e65ab252d7a90e5/packages/database/src/realtime/polling/PacketReceiver.ts#L20)). `
)}

function _client_longpoll_response_num_key(){return(
(client_id) => `c-${client_id}-rp`
)}

function _incrementLongpollResponseNum(client_longpoll_response_num_key){return(
async ({ redis, client_id }) => {
  return (
    (await redis.sendCommand(["INCR", client_longpoll_response_num_key(client_id)])) -
    1
  );
}
)}

function _56(suite,incrementLongpollResponseNum,exampleClient,expect){return(
suite.test(
  "incrementLongpollResponseNum increases by one each time",
  async () => {
    const current = await incrementLongpollResponseNum(exampleClient);
    expect(await incrementLongpollResponseNum(exampleClient)).toBe(current + 1);
  }
)
)}

async function _57(FileAttachment,md){return(
md`## Database Semantics: Listenable Key-Value Store

Firebase' data model boils down to a Key-Value store that clients can register for changes. So for a single data *location*, we need: 1, a place to store its *value*, and 2, a list of interested data *listeners*. 

${await FileAttachment("l.svg").image({style: "max-width: 640px"})}

*Firebase is a bit more complex, listeners can be queries over a collection, and the JSON structure cascades across data locations, but for this early prototype we are ignoring these details. *`
)}

function _data_key(){return(
(location) => `${location}-data`
)}

function _data_listeners_key(){return(
(location) => `${location}-listeners`
)}

function _60(md){return(
md`The data holder can be accessed with Redis' scalar [GET](https://redis.io/commands/get/)/[SET](https://redis.io/commands/set/) operations. It's worth noting that we never *await* on these commands, as this will be pipelined in [transactions](https://redis.io/docs/manual/transactions/) later. I expect the data holder will be upgraded to a [RedisJSON ](https://redis.io/docs/stack/json/) representation in the future.`
)}

function _set_data(data_key){return(
({ redis, client_id } = {}, location, value) =>
  redis.sendCommand(["SET", data_key(location), value])
)}

function _get_data(data_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["GET", data_key(location)])
)}

function _63(suite,set_data,exampleClient,get_data,expect){return(
suite.test(
  "Read our writes. get_data retreives data previously set by set_data",
  async () => {
    const data = JSON.stringify(Math.random());
    set_data(exampleClient, "read_our_writes_test", data);
    const fetched = await get_data(exampleClient, "read_our_writes_test");
    expect(fetched).toBe(data);
  }
)
)}

function _64(md){return(
md`We store the registered *listeners* as a Redis [list](https://redis.io/docs/manual/data-types/#lists). This means we use [LPUSH](https://redis.io/commands/lpush/) (left push), [LREM](https://redis.io/commands/lrem/) (list remove) to add and remove to the list, and [LRANGE](https://redis.io/commands/lrange/) (list range query) to read the whole list.

Again, no *awaiting* in the code! these will functions will be pipelined and used in transactions.`
)}

function _add_data_listener(data_listeners_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["LPUSH", data_listeners_key(location), client_id])
)}

function _remove_data_listener(data_listeners_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["LREM", data_listeners_key(location), "1", client_id])
)}

function _get_data_listeners(data_listeners_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["LRANGE", data_listeners_key(location), "0", "-1"])
)}

function _clear_data_listeners(data_listeners_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["DEL", data_listeners_key(location)])
)}

function _69(suite,clear_data_listeners,exampleClient,get_data_listeners,add_data_listener,remove_data_listener,expect){return(
suite.test(
  "Listeners: add_data_listener, remove_data_listener, get_data_listeners, clear_data_listeners record client_id in a list",
  async () => {
    const location = "listeners-test";
    clear_data_listeners(exampleClient, location);
    const afterClear = get_data_listeners(exampleClient, location);
    add_data_listener(exampleClient, location);
    const afterAdd = get_data_listeners(exampleClient, location);
    remove_data_listener(exampleClient, location);
    const afterRemove = get_data_listeners(exampleClient, location);

    expect(await afterClear).toEqual([]);
    expect(await afterAdd).toEqual([exampleClient.client_id]);
    expect(await afterRemove).toEqual([]);
  }
)
)}

function _70(md){return(
md`## Exactly-once operations

In normal operation, the Firebase clients request that the server to perform database operations, such as adding a data listener to a data location or setting the value of a data location. For the system to meet the _causal consistency_ goals, the order of a client's operations and the server's responses need to be preserved. To that end we use two queues per client. One queue for each direction of traffic.`
)}

function _71(md){return(
md`So when an operation comes in, we need to push that into a queue. However, consider what happens if we crash immediately after doing so? The client will not know whether we received the operation, and will resend. So, if we are not careful, we will push the operation onto the work queue a second time, and this will cause problems (operations are **NOT** idempotent).`
)}

function _72(md){return(
md`Firebase solves this by sending a *request id* ([source](https://github.com/firebase/firebase-js-sdk/blob/1a06d5d6064bd3b6b3672a352b0f128f86d6d89a/packages/database/src/core/PersistentConnection.ts#L181)) with each operation, so duplicates can be detected. *At-least-once* queues are neatly implemented in Redis using a stream and we use [XADD](https://redis.io/commands/xadd/) to enqueue. We can achieve *exactly-once* processing by using Firebase's integer *request_id* to reject duplicates, as the following implementation of *enqueue_operation* does.`
)}

function _enqueue_operation(client_operation_queue_key){return(
({ redis, client_id } = {}, action) =>
  redis
    .sendCommand(
      [
        "XADD",
        client_operation_queue_key(client_id),
        `0-${action.request_id}`
      ].concat(Object.entries(action).flatMap((_) => _))
    )
    .catch((err) => {
      if (err.message.includes("ID specified in XADD is equal or smaller"))
        console.log(`Non-monotonic request id ${action.request_id}`);
      else {
        throw err;
      }
    })
)}

function _74(md){return(
md`While *enqueue_operation* adds to the back of the queue, *next_operation* reads the front of the queue. Redis streams are similar to Kafka whereby readers maintain their read position in the stream. So first, *get_head_operation_id* is called to discover where the head is. This costs a round trip to Redis (note the *await*). We *could* eliminate the round trip by using [LUA scripting](https://redis.io/docs/manual/programmability/eval-intro/), but we will leave performance optimizations for another day. So instead we close our eyes and use the Redis stream instruction [XREAD](https://redis.io/commands/xread/) to read one item from the queue.`
)}

function _next_operation(get_head_operation_id,client_operation_queue_key){return(
async ({ redis, client_id } = {}) => {
  const id = await get_head_operation_id({ redis, client_id });
  const response = await redis.sendCommand([
    "XREAD",
    "COUNT",
    "1",
    "STREAMS",
    client_operation_queue_key(client_id),
    `0-${id}`
  ]);
  if (response === "QUEUED")
    throw new Error("Can't use next_operation in transaction");
  return (
    response &&
    response[0][1][0][1].reduce((obj, val, index, arr) => {
      if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
      return obj;
    }, {})
  );
}
)}

function _76(md){return(
md`After calling *next_operation* a worker should actually try to apply the operation to the database. There can be two outcomes, the operation is applied successfully, in which case the *head_operation_id* should increment, or the operation fails, in which case we should retry. 

Incrementing the *head_operation_id* acknowledges the item in the operation queue was processed successfully, so we call this function *ack_operation* and it the stream id of the item we wish to move beyond. **We can achieve *exactly-once* processing if operation acknowledgement is in the same transaction as the operation's effect, thereby combining them atomically.** Though, we additionally need to exclude two processes from calling *ack_operation* twice for the same work with [WATCH](https://redis.io/commands/watch/) on the *head_operation_id*.`
)}

function _ack_operation(set_head_operation_id){return(
({ redis, client_id } = {}, stream_id) => {
  return set_head_operation_id({ redis, client_id }, stream_id);
}
)}

function _78(suite,createClient,redisConfig,init_client,enqueue_operation,next_operation,ack_operation,expect){return(
suite.test(
  "Client operation queue: enqueue_operation, next_operation, ack_operation",
  async () => {
    const client = await createClient(redisConfig, "operation_queue_client");
    init_client(client);

    enqueue_operation(client, {
      request_id: "1",
      payload: "init"
    });
    // If we write twice with the same request_id it is deduplicated
    enqueue_operation(client, {
      request_id: "1",
      payload: "dedupe_test"
    });

    enqueue_operation(client, {
      request_id: "2",
      payload: "second"
    });

    const next1 = next_operation(client);
    const next2 = next_operation(client);

    ack_operation(client, "1");

    const next3 = next_operation(client);

    ack_operation(client, "2");

    const next4 = next_operation(client);

    expect(await next1).toEqual({
      request_id: "1",
      payload: "init"
    });

    expect(await next2).toEqual({
      request_id: "1",
      payload: "init"
    });

    expect(await next3).toEqual({
      request_id: "2",
      payload: "second"
    });

    expect(await next4).toEqual(null);
  }
)
)}

function _79(md){return(
md`## At-most-once notifications

The server responds to every incoming operation through a server-to-client notification stream. If any data is written to location with an active *listen*, the server will inform the client through this channel too. Because this channel contains operation replies AND data notifications, we cannot use the 1-at-a-time incremented *request_id* as the *stream_id*. This is kind of annoying as we can't form an at-least-once request pipeline, but it doesn't compromise consistency because if an notification goes missing the client can detect it and restart the session (how the detection works is transport dependant).

Largely this code is the same as the queue for the *operation_queue*, the major difference is we let it auto-generate its own *stream_id* when calling [XADD](https://redis.io/commands/xadd/).
`
)}

function _enqueue_notify(client_notify_queue_key){return(
({ redis, client_id } = {}, target_client_id, reply) =>
  redis.sendCommand(
    ["XADD", client_notify_queue_key(target_client_id), "*"].concat(
      Object.entries(reply).flatMap((_) => _)
    )
  )
)}

function _81(enqueue_notify,exampleClient){return(
enqueue_notify(exampleClient, exampleClient.client_id, { payload: "hi" })
)}

function _next_notify(get_head_notify_id,client_notify_queue_key){return(
async ({ redis, client_id } = {}) => {
  const id = await get_head_notify_id({ redis, client_id });
  const response = await redis.sendCommand([
    "XREAD",
    "COUNT",
    "1",
    "STREAMS",
    client_notify_queue_key(client_id),
    id
  ]);
  return (
    response && [
      response[0][1][0][0],
      response[0][1][0][1].reduce((obj, val, index, arr) => {
        if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
        return obj;
      }, {})
    ]
  );
}
)}

function _ack_notify(set_head_notify_id){return(
({ redis, client_id } = {}, id) => {
  return set_head_notify_id({ redis, client_id }, id);
}
)}

function _84(md){return(
md`## process_operation

Processing an operation is the meat of the implementation. It is where we actually do database-like things like setting data values and registering listener. Of course, care must be taken to ensure we meet our causal consistency goals.

Specifically, *process_operation*, removes an item from operation queue, effects it and ACKS it **within a single transaction**. The transaction ensures the *operation* is applied atomically _i.e._ all or nothing. Some of the operation side-effects might include enqueueing *notifications* to other client's outbound message queues. Within the transaction, a [WATCH](https://redis.io/commands/watch/) on the *head_operation_id* ensures that **only one** worker can process this work task, leading to *exactly-once* processing.  
`
)}

async function _t(FileAttachment,htl){return(
htl.html`<figure>
  ${await FileAttachment("t.svg").image({ style: "max-width: 640px" })}
  <figcaption>Casual conistincy implies applying operations exactly-once and notifing observers through queues. This can be acheived in Redis within a transaction that does various datastructure manipulations.</figcaption>
</figure>`
)}

function _86(md){return(
md`To help with observability during development, the functional interface is converted to dataflow using a [*flowQueue*](https://observablehq.com/@tomlarkworthy/flow-queue). This allows us to break the program flow across notebook cells so it's easier to diagnose how decisions are made. It also gives the autocomplete visibility into the data on the wire. So, the main *process_operation* function just forwards the function arguments to the beginning of corresponding flowQueue cell *process_operation_args*.`
)}

function _process_operation($0){return(
(client) => $0.send(client)
)}

function _process_operation_args(flowQueue){return(
flowQueue({
  name: "process_operation_args",
  timeout_ms: 2000
})
)}

function _89(md){return(
md`The *process_operation_args* variable holds the last value seen:  `
)}

function _90(process_operation_args){return(
process_operation_args
)}

function _91(md){return(
md`First we fetch the next action after [WATCH](https://redis.io/commands/watch/)ing the *operation_head_id_key*. The WATCH prevents multiple workers doing the same operation.`
)}

async function _action(process_operation_args,client_operation_head_id_key,next_operation,$0,invalidation)
{
  const client = process_operation_args;
  client.redis.sendCommand([
    "WATCH",
    client_operation_head_id_key(client.client_id)
  ]);
  const actionRaw = await next_operation(process_operation_args);
  if (!actionRaw) {
    client.redis.sendCommand(["UNWATCH"]);
    $0.respond("NOOP");
    return invalidation;
  } else {
    return actionRaw;
  }
}


function _93(md){return(
md`Some operations require additional data to be available before they can be fulfilled correctly. For a PUT operation, we need to know what the active listeners are. With the list of active listeners, a transaction can update the data location **and** notify the listeners through their queues in a single atomic update. To do this consistently, the prerequisite data must be not change during operation processing, so the gathered data is locked with [WATCH](https://redis.io/commands/watch/).`
)}

async function _prerequisites(process_operation_args,action,data_listeners_key,get_data_listeners,data_key,get_data,$0)
{
  const client = process_operation_args;
  const operation = action.action;
  try {
    if (operation === "PUT") {
      client.redis.sendCommand(["WATCH", data_listeners_key(action.key)]);
      return {
        listeners: await get_data_listeners(client, action.key)
      };
    } else if (operation === "GET" || operation === "LISTEN") {
      client.redis.sendCommand(["WATCH", data_key(action.key)]);
      return {
        data: await get_data(client, action.key)
      };
    }
  } catch (err) {
    client.redis.sendCommand(["UNWATCH"]);
    console.error(err.message, action);
    $0.reject(err);
    return err;
  }
  return {};
}


function _95(md){return(
md`After gathering the prerequisite data for the operation, we execute all the mutations within a transaction block [MULTI](https://redis.io/commands/multi/). Exactly what is mutated depends on the operation, which is handled by _operation_ specific flowQueues (explained later). `
)}

async function _process_operation_effect(process_operation_args,action,$0,$1,$2,$3,prerequisites,$4)
{
  const client = process_operation_args;
  const operation = action.action;
  try {
    client.redis.sendCommand(["MULTI"]);
    const handler = {
      PUT: $0,
      GET: $1,
      LISTEN: $2,
      UNLISTEN: $3
    }[operation];

    if (handler === undefined)
      throw new Error("Unknown operation " + operation);

    return await handler.send({
      ...prerequisites,
      client,
      action
    });
  } catch (err) {
    console.error(err.message, action);
    client.redis.sendCommand(["DISCARD"]);
    $4.reject(err);
    return err;
  }
}


function _97(md){return(
md`Finally, after the operation specific effects are queued, we acknowledge the operation to indicate it is processed, and execute the everything in an atomic transaction. Because *ack_operation* mutates the *client_operation_head_id_key* and we WATCHed it at the beginning, we guarantee that only one worker can do an operation. Because we also do the effect in the same transaction, we ensure we only *ack_operation* if the effect is applied. So we achieve *exactly-once* operation processing. 

The response of the transaction is passed back to the enclosing [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue) using the *respond* function.`
)}

async function _ack_process_operation(process_operation_args,process_operation_effect,ack_operation,action,$0)
{
  const client = process_operation_args;
  process_operation_effect;
  try {
    ack_operation(client, action.request_id);
    const response = client.redis.sendCommand(["EXEC"]);
    $0.respond(response);
    return response;
  } catch (err) {
    await client.redis.sendCommand(["DISCARD"]);
    $0.reject(err);
    return err;
  }
}


function _99(suite,createClient,redisConfig,clear_data_listeners,init_client,enqueue_operation,process_operation,next_notify,ack_notify,expect){return(
suite.test(
  "smoke test process_operation with LISTEN/PUT/GET/UNLISTEN",
  async () => {
    const client = await createClient(
      redisConfig,
      "process_operation_smoke_test"
    );
    clear_data_listeners(client, "foo");
    init_client(client);
    enqueue_operation(client, {
      request_id: "1",
      action: "PUT",
      key: "foo",
      value: "baz"
    });
    enqueue_operation(client, {
      request_id: "2",
      action: "LISTEN",
      key: "foo"
    });
    enqueue_operation(client, {
      request_id: "3",
      action: "PUT",
      key: "foo",
      value: "bar"
    });
    enqueue_operation(client, {
      request_id: "4",
      action: "GET",
      key: "foo"
    });

    enqueue_operation(client, {
      request_id: "5",
      action: "UNLISTEN",
      key: "foo"
    });

    while ((await process_operation(client)) !== "NOOP") {}

    const history = [];
    var next = await next_notify(client);
    while (next) {
      const [id, reply] = next;
      history.push(reply);
      ack_notify(client, id);
      next = await next_notify(client);
    }
    expect(history).toEqual([
      {
        request_id: "1",
        status: "ok"
      },
      {
        action: "DATA",
        data: "baz",
        key: "foo"
      },
      {
        request_id: "2",
        status: "ok"
      },
      {
        action: "DATA",
        data: "bar",
        key: "foo"
      },
      {
        request_id: "3",
        status: "ok"
      },
      {
        data: "bar",
        request_id: "4",
        status: "ok"
      },
      {
        request_id: "5",
        status: "ok"
      }
    ]);
  }
)
)}

function _100(md){return(
md`## Operation Effects`
)}

function _operations(put_operation_response,get_operation_response,listen_operation_response,unlisten_operation_response){return(
[
  put_operation_response,
  get_operation_response,
  listen_operation_response,
  unlisten_operation_response
]
)}

function _102(md){return(
md`### run_put_operation

A PUT operation overwrites a data location with a new value, and notifies all listeners of the change. Thus to apply the operation the liste of listeners at that location is required.`
)}

function _run_put_operation_args(flowQueue){return(
flowQueue({
  name: "run_put_operation_args"
})
)}

function _104(run_put_operation_args){return(
run_put_operation_args
)}

function _run_put_operation_effect(run_put_operation_args,set_data,enqueue_notify)
{
  const client = run_put_operation_args.client;
  const action = run_put_operation_args.action;
  var result = set_data(client, action.key, action.value);
  run_put_operation_args.listeners.forEach((client_id) => {
    var result = enqueue_notify(client, client_id, {
      action: "DATA",
      key: action.key,
      data: action.value
    });
  });
  return enqueue_notify(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _put_operation_response($0,run_put_operation_effect){return(
$0.respond(
  run_put_operation_effect
)
)}

function _107(md){return(
md`### run_get_operation

A GET operation retrieves the data at a data location.`
)}

function _run_get_operation_args(flowQueue){return(
flowQueue({
  name: "run_get_operation_args"
})
)}

function _109(run_get_operation_args){return(
run_get_operation_args
)}

function _run_get_operation_effect(run_get_operation_args,enqueue_notify)
{
  const client = run_get_operation_args.client;
  const action = run_get_operation_args.action;
  const data = run_get_operation_args.data;
  return enqueue_notify(client, client.client_id, {
    request_id: action.request_id,
    status: "ok",
    data
  });
}


function _get_operation_response($0,run_get_operation_effect){return(
$0.respond(
  run_get_operation_effect
)
)}

function _112(md){return(
md`### run_listen_operation

A LISTEN operation adds a client to the list of listeners at a data location. The client is also informed of the current value of the data location.

TODO: Firebase also supports query filters and listening over collections of location too.`
)}

function _run_listen_operation_args(flowQueue){return(
flowQueue({
  name: "run_listen_operation_args"
})
)}

function _114(run_listen_operation_args){return(
run_listen_operation_args
)}

function _run_listen_effect(run_listen_operation_args,enqueue_notify,add_data_listener)
{
  const client = run_listen_operation_args.client;
  const action = run_listen_operation_args.action;
  const data = run_listen_operation_args.data;
  enqueue_notify(client, client.client_id, {
    action: "DATA",
    key: action.key,
    data: data
  });
  add_data_listener(client, action.key);
  return enqueue_notify(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _listen_operation_response($0,run_listen_effect){return(
$0.respond(
  run_listen_effect
)
)}

function _117(md){return(
md`### run_unlisten

Unlisten removes a listener at a data location.`
)}

function _run_unlisten_operation_args(flowQueue){return(
flowQueue({
  name: "run_unlisten_operation_args"
})
)}

function _119(run_unlisten_operation_args){return(
run_unlisten_operation_args
)}

function _run_unlisten_effect(run_unlisten_operation_args,remove_data_listener,enqueue_notify)
{
  const client = run_unlisten_operation_args.client;
  const action = run_unlisten_operation_args.action;
  remove_data_listener(client, action.key);
  return enqueue_notify(client, client.client_id, {
    request_id: action.request_id,
    status: "ok"
  });
}


function _unlisten_operation_response($0,run_unlisten_effect){return(
$0.respond(
  run_unlisten_effect
)
)}

function _122(md){return(
md`---`
)}

function _123(md){return(
md`## Notebook Dependencies`
)}

function _includeIf(){return(
(predicate, string) => (predicate ? string : "")
)}

function _129(md){return(
md`## Notebook Backups and Analytics`
)}

function _131(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["cc@1.svg", {url: new URL("./files/dcaef342095f3be1dab70b47943b99879e58dc529328c05be704e141703e928b09b1f476c1b44c2a077a4ff1e0e96a0fee4eb411c6103c6ee75fb76213f27dac", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["a.svg", {url: new URL("./files/983bc063173c7a92038c7ae5da914679660dbecbd957d5c1d3e64e75b5ec6db5f7b9e3005e42fcf6f6afbc9f21e51b7cdc8aebc55ecbe1db6205f89fda2db484", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["Q.SVG", {url: new URL("./files/bf4ad5b16896b3d6d2944e02f7f23bd6f67a36b1e085c9d255bf7f757fc4a4cf51dbe05a70d6aaed0974bd8849e203bc67a2aef4a257a984579bca40daca3a65", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["l.svg", {url: new URL("./files/7216a502ce536fbb7cd66f865a878b13f2aa40a1f96c342c91c4ad8a9679d89b00dfd2c1a31780d6079892048e4eba4ab4c5455a27d513b010354e313ff71e1f", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["t.svg", {url: new URL("./files/ab6ca1e70f72cc5b97db5df4a5200c8bae82aa9bc4204d7d9da3b203ac5614e19728806d385512e248634e107e88841392abce0423619e8c86ed2edadda035d7", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["gfx","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["FileAttachment","md"], _4);
  main.variable(observer()).define(["width","md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("a")).define("a", ["FileAttachment"], _a);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("createClient")).define("createClient", ["createRedisClient"], _createClient);
  const child1 = runtime.module(define1);
  main.import("createClient", "createRedisClient", child1);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("exampleClient")).define("exampleClient", ["restartClients","createClient","redisConfig"], _exampleClient);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("viewof restartClients")).define("viewof restartClients", ["Inputs"], _restartClients);
  main.variable(observer("restartClients")).define("restartClients", ["Generators", "viewof restartClients"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["suite","expect","exampleClient"], _26);
  main.variable(observer()).define(["FileAttachment","md"], _27);
  main.variable(observer("init_client")).define("init_client", ["clear_operations","clear_notifications","set_head_operation_id","set_head_notify_id"], _init_client);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("client_operation_queue_key")).define("client_operation_queue_key", _client_operation_queue_key);
  main.variable(observer("client_notify_queue_key")).define("client_notify_queue_key", _client_notify_queue_key);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("clear_operations")).define("clear_operations", ["client_operation_queue_key"], _clear_operations);
  main.variable(observer("clear_notifications")).define("clear_notifications", ["client_notify_queue_key"], _clear_notifications);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("client_operation_head_id_key")).define("client_operation_head_id_key", _client_operation_head_id_key);
  main.variable(observer("client_notify_head_id_key")).define("client_notify_head_id_key", _client_notify_head_id_key);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("set_head_operation_id")).define("set_head_operation_id", ["client_operation_head_id_key"], _set_head_operation_id);
  main.variable(observer("set_head_notify_id")).define("set_head_notify_id", ["client_notify_head_id_key"], _set_head_notify_id);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("get_head_operation_id")).define("get_head_operation_id", ["client_operation_head_id_key"], _get_head_operation_id);
  main.variable(observer("get_head_notify_id")).define("get_head_notify_id", ["client_notify_head_id_key"], _get_head_notify_id);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["suite","createClient","redisConfig","enqueue_operation","init_client","expect","get_head_operation_id","get_head_notify_id","next_operation","next_notify"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("client_longpoll_session_key")).define("client_longpoll_session_key", _client_longpoll_session_key);
  main.variable(observer("createLongpollSession")).define("createLongpollSession", ["init_client","client_longpoll_session_key"], _createLongpollSession);
  main.variable(observer("retrieveLongpollSession")).define("retrieveLongpollSession", ["client_longpoll_session_key"], _retrieveLongpollSession);
  main.variable(observer()).define(["suite","createLongpollSession","exampleClient","retrieveLongpollSession","expect"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("client_longpoll_response_num_key")).define("client_longpoll_response_num_key", _client_longpoll_response_num_key);
  main.variable(observer("incrementLongpollResponseNum")).define("incrementLongpollResponseNum", ["client_longpoll_response_num_key"], _incrementLongpollResponseNum);
  main.variable(observer()).define(["suite","incrementLongpollResponseNum","exampleClient","expect"], _56);
  main.variable(observer()).define(["FileAttachment","md"], _57);
  main.variable(observer("data_key")).define("data_key", _data_key);
  main.variable(observer("data_listeners_key")).define("data_listeners_key", _data_listeners_key);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("set_data")).define("set_data", ["data_key"], _set_data);
  main.variable(observer("get_data")).define("get_data", ["data_key"], _get_data);
  main.variable(observer()).define(["suite","set_data","exampleClient","get_data","expect"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("add_data_listener")).define("add_data_listener", ["data_listeners_key"], _add_data_listener);
  main.variable(observer("remove_data_listener")).define("remove_data_listener", ["data_listeners_key"], _remove_data_listener);
  main.variable(observer("get_data_listeners")).define("get_data_listeners", ["data_listeners_key"], _get_data_listeners);
  main.variable(observer("clear_data_listeners")).define("clear_data_listeners", ["data_listeners_key"], _clear_data_listeners);
  main.variable(observer()).define(["suite","clear_data_listeners","exampleClient","get_data_listeners","add_data_listener","remove_data_listener","expect"], _69);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("enqueue_operation")).define("enqueue_operation", ["client_operation_queue_key"], _enqueue_operation);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("next_operation")).define("next_operation", ["get_head_operation_id","client_operation_queue_key"], _next_operation);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("ack_operation")).define("ack_operation", ["set_head_operation_id"], _ack_operation);
  main.variable(observer()).define(["suite","createClient","redisConfig","init_client","enqueue_operation","next_operation","ack_operation","expect"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("enqueue_notify")).define("enqueue_notify", ["client_notify_queue_key"], _enqueue_notify);
  main.variable(observer()).define(["enqueue_notify","exampleClient"], _81);
  main.variable(observer("next_notify")).define("next_notify", ["get_head_notify_id","client_notify_queue_key"], _next_notify);
  main.variable(observer("ack_notify")).define("ack_notify", ["set_head_notify_id"], _ack_notify);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("t")).define("t", ["FileAttachment","htl"], _t);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer("process_operation")).define("process_operation", ["viewof process_operation_args"], _process_operation);
  main.variable(observer("viewof process_operation_args")).define("viewof process_operation_args", ["flowQueue"], _process_operation_args);
  main.variable(observer("process_operation_args")).define("process_operation_args", ["Generators", "viewof process_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _89);
  main.variable(observer()).define(["process_operation_args"], _90);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("action")).define("action", ["process_operation_args","client_operation_head_id_key","next_operation","viewof process_operation_args","invalidation"], _action);
  main.variable(observer()).define(["md"], _93);
  main.variable(observer("prerequisites")).define("prerequisites", ["process_operation_args","action","data_listeners_key","get_data_listeners","data_key","get_data","viewof process_operation_args"], _prerequisites);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer("process_operation_effect")).define("process_operation_effect", ["process_operation_args","action","viewof run_put_operation_args","viewof run_get_operation_args","viewof run_listen_operation_args","viewof run_unlisten_operation_args","prerequisites","viewof process_operation_args"], _process_operation_effect);
  main.variable(observer()).define(["md"], _97);
  main.variable(observer("ack_process_operation")).define("ack_process_operation", ["process_operation_args","process_operation_effect","ack_operation","action","viewof process_operation_args"], _ack_process_operation);
  main.variable(observer()).define(["suite","createClient","redisConfig","clear_data_listeners","init_client","enqueue_operation","process_operation","next_notify","ack_notify","expect"], _99);
  main.variable(observer()).define(["md"], _100);
  main.variable(observer("operations")).define("operations", ["put_operation_response","get_operation_response","listen_operation_response","unlisten_operation_response"], _operations);
  main.variable(observer()).define(["md"], _102);
  main.variable(observer("viewof run_put_operation_args")).define("viewof run_put_operation_args", ["flowQueue"], _run_put_operation_args);
  main.variable(observer("run_put_operation_args")).define("run_put_operation_args", ["Generators", "viewof run_put_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_put_operation_args"], _104);
  main.variable(observer("run_put_operation_effect")).define("run_put_operation_effect", ["run_put_operation_args","set_data","enqueue_notify"], _run_put_operation_effect);
  main.variable(observer("put_operation_response")).define("put_operation_response", ["viewof run_put_operation_args","run_put_operation_effect"], _put_operation_response);
  main.variable(observer()).define(["md"], _107);
  main.variable(observer("viewof run_get_operation_args")).define("viewof run_get_operation_args", ["flowQueue"], _run_get_operation_args);
  main.variable(observer("run_get_operation_args")).define("run_get_operation_args", ["Generators", "viewof run_get_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_get_operation_args"], _109);
  main.variable(observer("run_get_operation_effect")).define("run_get_operation_effect", ["run_get_operation_args","enqueue_notify"], _run_get_operation_effect);
  main.variable(observer("get_operation_response")).define("get_operation_response", ["viewof run_get_operation_args","run_get_operation_effect"], _get_operation_response);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer("viewof run_listen_operation_args")).define("viewof run_listen_operation_args", ["flowQueue"], _run_listen_operation_args);
  main.variable(observer("run_listen_operation_args")).define("run_listen_operation_args", ["Generators", "viewof run_listen_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_listen_operation_args"], _114);
  main.variable(observer("run_listen_effect")).define("run_listen_effect", ["run_listen_operation_args","enqueue_notify","add_data_listener"], _run_listen_effect);
  main.variable(observer("listen_operation_response")).define("listen_operation_response", ["viewof run_listen_operation_args","run_listen_effect"], _listen_operation_response);
  main.variable(observer()).define(["md"], _117);
  main.variable(observer("viewof run_unlisten_operation_args")).define("viewof run_unlisten_operation_args", ["flowQueue"], _run_unlisten_operation_args);
  main.variable(observer("run_unlisten_operation_args")).define("run_unlisten_operation_args", ["Generators", "viewof run_unlisten_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_unlisten_operation_args"], _119);
  main.variable(observer("run_unlisten_effect")).define("run_unlisten_effect", ["run_unlisten_operation_args","remove_data_listener","enqueue_notify"], _run_unlisten_effect);
  main.variable(observer("unlisten_operation_response")).define("unlisten_operation_response", ["viewof run_unlisten_operation_args","run_unlisten_effect"], _unlisten_operation_response);
  main.variable(observer()).define(["md"], _122);
  main.variable(observer()).define(["md"], _123);
  const child2 = runtime.module(define2);
  main.import("toc", child2);
  const child3 = runtime.module(define3);
  main.import("gfx", child3);
  main.variable(observer("includeIf")).define("includeIf", _includeIf);
  const child4 = runtime.module(define4);
  main.import("flowQueue", child4);
  const child5 = runtime.module(define5);
  main.import("createSuite", child5);
  main.import("expect", child5);
  main.variable(observer()).define(["md"], _129);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _131);
  return main;
}
