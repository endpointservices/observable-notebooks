import define1 from "./6a703b03d185f279@1002.js";
import define2 from "./0e0b35a92c819d94@418.js";
import define3 from "./293899bef371e135@247.js";

function _1(md){return(
md`#  Redis as the Shared State for an Elastic Realtime Database`
)}

function _2(md){return(
md`Lesly Lamport`
)}

function _3(md){return(
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

function _suite(testing){return(
testing.createSuite({ name: "Reactive Integration Tests" })
)}

function _6(md){return(
md`## Why we are here: bespoke security languages suck`
)}

function _7(md){return(
md`*(BTW, this comes from painful realization from reflecting on [Firebase Rules](https://firebase.blog/posts/2018/01/introducing-query-based-security-rules), [Blaze Compiler](https://github.com/googlearchive/blaze_compiler) and the [Common Expression Language](https://github.com/google/cel-spec))*`
)}

async function _8(FileAttachment,width,md){return(
md`In my imagination of a better Realtime Database server, I think, I want it easy to use. **I want to use an ordinary programming language for authorization rules**. In the rules, I want to be able to **call 3rd party APIs**, and write inefficient code if I want, **synchronously**, right in the critical path. What I don't want to do, is to conform to some *deliberately constraining bespoke language*. 


There are good arguments as to why infrastructure vendors avoid shipping general programming languages in their managed products... security risks, scaling, performance, consistency... but using simple Javascript would be be so much easier for us developers. Implementing authorization as code is the exact approach I would take if I were writing a common three tier architecture.

So in my ideal architecture, we execute authorization rules and other services in horizontally scaled stateless workers. If you wrote some sloppy code, it would scale up and costs more to run, but that could be the right tradeoff. 


${await FileAttachment("IMG_20220511_204941@1.jpg").image({width: Math.min(width, 300)})}

But this has issues, horizontal compute like serverless implies other constraints. Workers are ephemeral and stateless. But this statelessness clashes with stateful clients like Firebase that require executing a carefully ordered stateful wire protocol to meet their consistency guarantees.`
)}

function _9(width,md){return(
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

function _10(md){return(
md`## At-least-once ordered delivery over unreliable communications

Causal consistency has implications when transporting messages over an unreliable transport. During network partitions, messages need to be buffered until there is an opportunity to send them. When they are eventually sent, they need to be applied by the server in the same order the client originally raised them, because of **causal consistency**.

With ordered streaming transports like Websockets/TCP, it is enough for clients to buffer pending messages in a queue, and send them in order. In high performance applications, clients will not wait for a response, but rather pipeline requests one-after-another. If a connection is lost, any unacknowledged operations will be resent in order again ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L1069)). Pending operations are only removed from the queue after acknowledgement by the server ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/core/PersistentConnection.ts#L632)).

For the unordered transport like HTTP, the client can send multiple database requests in a single HTTP request. Firebase clients only have one HTTP in flight at a time ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L660), [source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/BrowserPollConnection.ts#L676)), but operations are still logically pipelines and acknowledged in streams much similar to the websocket transport.


`
)}

function _11(md){return(
md`
## Causal Consistency over Stateless Workers

So now we get to the core technical challenge. Causal consistency implies preserving the ordering of an individual client's operations. However, if operations are sent to a horizontally scaled service, each operation might hit different worker, yet they *must* coordinate to **effect** the persisted shared database state one-after-another. 

In Google's real Firebase Realtime database implementation all requests hit a single server so it can maintain a per client queue of pending operations, but by switching to an elastic architecture, the load balancer in front of the elastic compute works against us by scattering incoming operations across difference machines. Thus, the required pending operation queue needs to be moved to external shared state.`
)}

function _12(md){return(
md`## Redis as the Shared State

So for my ideal architecture, we need some shared state that all the stateless workers will need to access every request. I chose Redis, as it is a common offering, that is low latency and can fulfill the storage role too. In this architecture, the stateless workers terminate public client connections and execute the database protocol by moving state around a Redis backend.

Redis has some fantastic features for ensuring at-least-once delivery and causal consistency. Firstly, queues, hashmaps and stream are all first class citizens in Redis with their own specialised instructions for manipulation. Secondly, sequences of Redis commands can be applied atomically in a [transaction](https://redis.io/docs/manual/transactions/). For example, we can pop an instruction from an inbox, apply the effects, and write notifications to other inboxes in a single atomic operation. 

This is an amazing because if we can apply client operations, including all the event deliveries to all other clients, in atomic operations, we meet the requirements for causal consistency. The main requirement for causal consistency is that other clients observe a client's operations in the order they were raised. So, if we pop operations from a clients inbox in order, and ensure they are applied atomically, then the effects on other client's outbox observations are also in causal order, and we are free to execute instructions from different clients in parallel.  `
)}

function _13(md){return(
md`### Client Connections

This notebook is the storage API for a future serverless worker, but we are not putting it in a container. We imagine Firebase client SDKs will connect to a worker, and stream commands over HTTP longpoll or websocket and the worker will need to collect stream responses back.`
)}

function _14(md){return(
md`### Connecting to Redis: *createClient*`
)}

function _15(md){return(
md`We will dedicate Redis client for each Firebase client. We will identify a client by its **client_id**, which will map to Firebase's connection id ([source](https://github.com/firebase/firebase-js-sdk/blob/8bece487710aa6315c7dd98bcb086cd18fc9a943/packages/database/src/realtime/Connection.ts#L98)). `
)}

function _createClient(createRedisClient){return(
async (redisConfig, client_id) => ({
  redis: await createRedisClient(redisConfig),
  client_id
})
)}

function _18(md){return(
md`So we can demo functionality in the notebook, lets create an example client now:`
)}

function _exampleClient(restartClients,createClient,redisConfig)
{
  restartClients; // Depend on restartClients cell so we can cycle this client
  return createClient(redisConfig, "exampleClient");
}


function _20(md){return(
md`As Redis connections are stateful, it is often useful to cycle them`
)}

function _restartClients(Inputs){return(
Inputs.button("restart clients")
)}

function _22(md){return(
md`We can test the client is working by sending a PING command `
)}

function _23(suite,testing,exampleClient){return(
suite.test("Example client responds to PONG with PING", async () => {
  testing.expect(await exampleClient.redis.sendCommand(["PING"])).toBe("PONG");
})
)}

function _24(md){return(
md`### Initializing the state for a fresh client: *init_client*

Central to the ordering guarantees is that client operations are processed in order, implying a queue for each client. 

When an SDK connects for the first time to the server, we need to setup two queues streams for the inbound (operations) and outbound (notifications) directions. We use Redis [streams](https://redis.io/docs/manual/data-types/streams/) to implement the queues, as they have features for ensuring *at-least-once* delivery which is simpler than using basic [lists](https://redis.io/docs/manual/data-types/#lists).`
)}

function _init_client(clear_operations,clear_notifications,set_head_operation_id,set_head_notify_id){return(
({ redis, client_id }) => {
  clear_operations({ redis, client_id });
  clear_notifications({ redis, client_id });
  set_head_operation_id({ redis, client_id }, "0-0");
  return set_head_notify_id({ redis, client_id }, "0-0");
}
)}

function _26(md){return(
md`#### Key helpers

We create some helper functions for generating the key names for a given client and the various Redis keys that need to be provisioned.`
)}

function _client_operation_queue_key(){return(
(client_id) => `c-${client_id}-actions`
)}

function _client_notify_queue_key(){return(
(client_id) => `c-${client_id}-replies`
)}

function _29(md){return(
md`#### Clearing streams`
)}

function _30(md){return(
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

function _33(md){return(
md`#### Manipulating the head of queue pointer

For *ordered at-least-once* delivery, a queue should shift up **after** the action has been applied. This implies we need keys to remember where we are in the queue, which will be incremented as we do the work. Redis streams already have entry IDs, so we will reusing that.
`
)}

function _34(md){return(
md`First we define helper functions for the keys`
)}

function _client_operation_head_id_key(){return(
(client_id) => `c-${client_id}-actions-head`
)}

function _client_notify_head_id_key(){return(
(client_id) => `c-${client_id}-replies-head`
)}

function _37(md){return(
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

function _40(md){return(
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

function _43(md){return(
md`So after we initialize a client, we expect their head pointers to be 0-0`
)}

function _44(suite,createClient,redisConfig,enqueue_operation,init_client,testing,get_head_operation_id,get_head_notify_id,next_operation,next_notify){return(
suite.test("init_client resets queues and heads", async () => {
  const client = await createClient(redisConfig, "init_client");
  enqueue_operation(client, {}); // Put some data in the queue

  init_client(client); // reset the client

  testing.expect(await get_head_operation_id(client)).toBe("0-0");
  testing.expect(await get_head_notify_id(client)).toBe("0-0");
  testing.expect(await next_operation(client)).toBe(null);
  testing.expect(await next_notify(client)).toBe(null);
})
)}

function _45(md){return(
md`## Initializing a new long poll session: *createLongpollSession*

Interfacing to Firebase's long polling transport requires some additional metadata to be tracked across requests. We use Redis' [HSET](https://redis.io/commands/hset/) and [HMGET](https://redis.io/commands/hmget/) to associate a dictionary of values for each client. So far we are only using it to store the long poll session password but it will probably expand.

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
  debugger;
  return {
    client,
    password: response[0]
  };
}
)}

function _49(suite,createLongpollSession,exampleClient,retrieveLongpollSession,testing){return(
suite.test(
  "createLongpollSession can set a password that is visible to retrieveLongpollSession",
  async () => {
    const randomPassword = Math.random().toString();
    createLongpollSession(exampleClient, { password: randomPassword });
    const retrieveSession = await retrieveLongpollSession(exampleClient);
    testing.expect(retrieveSession.password).toBe(randomPassword);
  }
)
)}

function _50(md){return(
md`#### Monotonic long poll response numbering with: *incrementLongpollResponseNum*

The server adds a response integer for the client to derive the correct response ordering ([source](https://github.com/firebase/firebase-js-sdk/blob/c424340aaeedbf1772db06437e65ab252d7a90e5/packages/database/src/realtime/polling/PacketReceiver.ts#L20)). `
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

function _53(suite,incrementLongpollResponseNum,exampleClient,testing){return(
suite.test(
  "incrementLongpollResponseNum increases by one each time",
  async () => {
    const current = await incrementLongpollResponseNum(exampleClient);
    testing
      .expect(await incrementLongpollResponseNum(exampleClient))
      .toBe(current + 1);
  }
)
)}

function _54(md){return(
md`## Listenable Key-Value Store

Firebase' data model boils down to a Key-Value store that clients can register for changes. So for a single data *location*, we need: 1, a place to store its *value*, and 2, a list of interested data *listeners*.`
)}

function _data_key(){return(
(location) => `${location}-data`
)}

function _data_listeners_key(){return(
(location) => `${location}-listeners`
)}

function _57(md){return(
md`The data holder can be accessed with Redis' scalar [GET](https://redis.io/commands/get/)/[SET](https://redis.io/commands/set/) operations. It's worth noting that we never *await* on these commands, as this will be pipelined in [transactions](https://redis.io/docs/manual/transactions/) later. I also suspect the data holder will be upgraded with [RedisJSON ](https://redis.io/docs/stack/json/) in the future.`
)}

function _set_data(data_key){return(
({ redis, client_id } = {}, location, value) =>
  redis.sendCommand(["SET", data_key(location), value])
)}

function _get_data(data_key){return(
({ redis, client_id } = {}, location) =>
  redis.sendCommand(["GET", data_key(location)])
)}

function _60(suite,set_data,exampleClient,get_data,testing){return(
suite.test(
  "Read our writes. get_data retreives data previously set by set_data",
  async () => {
    const data = JSON.stringify(Math.random());
    set_data(exampleClient, "read_our_writes_test", data);
    const fetched = await get_data(exampleClient, "read_our_writes_test");
    testing.expect(fetched).toBe(data);
  }
)
)}

function _61(md){return(
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

function _66(suite,clear_data_listeners,exampleClient,get_data_listeners,add_data_listener,remove_data_listener,testing){return(
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

    testing.expect(await afterClear).toEqual([]);
    testing.expect(await afterAdd).toEqual([exampleClient.client_id]);
    testing.expect(await afterRemove).toEqual([]);
  }
)
)}

function _67(md){return(
md`## Exactly-once Operations

Clients request the server to perform database side effects, such as adding a data listener to a location or setting a value. For the system to meet the causal consistency goals, the order of a client's operations and the server's responses need to be preserved. To that end we use two queues per client. One queue for each direction of traffic.`
)}

function _68(md){return(
md`So when an operation comes in, we need to push that into a queue. However, consider what happens if we crash immediately after doing so? The client will not know whether we received the operation, and will resend. So, if we are not careful, we will push the operation onto the work queue a second time, and this will cause problems (operations are **NOT** idempotent).`
)}

function _69(md){return(
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

function _71(md){return(
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
    id
  ]);
  return (
    response &&
    response[0][1][0][1].reduce((obj, val, index, arr) => {
      if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
      return obj;
    }, {})
  );
}
)}

function _73(md){return(
md`After calling *next_operation* a worker should actually try to apply the operation to the database. There can be two outcomes, the operation is applied successfully, in which case the *head_operation_id* should increment, or the operation fails, in which case we should retry. 

Incrementing the *head_operation_id* acknowledges the item in the operation queue was processed successfully, so we call this function *ack_operation* and it the stream id of the item we wish to move beyond. **We can achieve *exactly-once* processing if operation acknowledgement is in the same transaction as the operation's effect, thereby combining them atomically.** Though, we additionally need to exclude two processes from calling *ack_operation* twice for the same work with [WATCH](https://redis.io/commands/watch/) on the *head_operation_id*.`
)}

function _ack_operation(set_head_operation_id){return(
({ redis, client_id } = {}, stream_id) => {
  return set_head_operation_id({ redis, client_id }, stream_id);
}
)}

function _75(suite,createClient,redisConfig,init_client,enqueue_operation,next_operation,ack_operation,testing){return(
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

    const next1 = next_operation(client);
    const next2 = next_operation(client);

    ack_operation(client, "1"); // This should be part of a transaction to prevent double ACKs

    const next3 = next_operation(client);

    testing.expect(await next1).toEqual({
      request_id: "1",
      payload: "init"
    });

    testing.expect(await next2).toEqual({
      request_id: "1",
      payload: "init"
    });

    testing.expect(await next3).toEqual(null);
  }
)
)}

function _76(md){return(
md`## At-most-once notifications

The server responds to every incoming operation through a server-to-client notification stream. If any data is written to location with an active *listen*, the server will inform the client through this channel too. Because this channel contains operation replies AND data notifications, we cannot use the 1-at-a-time incremented *request_id* as the *stream_id*. This is kind of annoying as we can't form an at-least-once request pipeline, but does not compromise consistency because if an notification goes missing the client can detect it and restart the session (how the detection works is transport dependant).

Largely this code is the same as the queue for the *operation_queue*, the major difference is we let it generate its own *stream_id* when calling [XADD](https://redis.io/commands/xadd/).
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

function _78(enqueue_notify,exampleClient){return(
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
  return response && response[0][1][0];
}
)}

function _ack_notify(set_head_notify_id){return(
({ redis, client_id } = {}, id) => {
  return set_head_notify_id({ redis, client_id }, id);
}
)}

function _81(md){return(
md`## process_operation

Removes item from operation queue, then ACKS and effects it **within a transaction**. The transaction ensures the *operation* is applied atomically _i.e._ all or nothing. Some of the operation side-effects might include enqueueing *notifications* to other client's outbound message queues. Within the transaction a [WATCH](https://redis.io/commands/watch/) on the *head_operation_id* ensures only one worker can process this work task, leading to *exactly-once* processing.  
`
)}

function _82(md){return(
md`To help with observability during development, the functional interface is converted dataflow using a [*flowQueue*](https://observablehq.com/@tomlarkworthy/flow-queue). This allows us to break the program flow across notebook cells so it's easier to diagnose how decisions are made. It also gives the autocomplete visibility into the data on the wire. So, the main *process_operation* function just forwards the function arguments to the beginning of coresponding flowQueue cell`
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

function _85(md){return(
md`The *process_operation_args* variable holds the last value seen:  `
)}

function _86(process_operation_args){return(
process_operation_args
)}

function _87(md){return(
md`First we fetch the next action`
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
    client.redis.sendCommand([
      "UNWATCH",
      client_operation_head_id_key(client.client_id)
    ]);
    $0.respond("NOOP");
    return invalidation;
  } else {
    return actionRaw;
  }
}


function _89(md){return(
md`Then a transaction block is started with [MULTI](https://redis.io/commands/multi/). Followed by _operation_ specific code (each explained later). `
)}

async function _process_operation_effect(process_operation_args,action,data_listeners_key,get_data_listeners,$0,data_key,get_data,$1,$2,$3,$4)
{
  debugger;
  const client = process_operation_args;
  const code = action.action;
  let result;
  try {
    if (code === "PUT") {
      // We need a snapshot of the affected listeners before we start the transaciton
      client.redis.sendCommand(["WATCH", data_listeners_key(action.key)]);
      const listenersPromise = get_data_listeners(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $0.send({
        client,
        listeners: await listenersPromise,
        action: action
      });
    } else if (code === "GET") {
      client.redis.sendCommand(["WATCH", data_key(action.key)]);
      const dataPromise = get_data(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $1.send({
        client,
        data: await dataPromise,
        action: action
      });
    } else if (code === "LISTEN") {
      client.redis.sendCommand(["WATCH", data_key(action.key)]);
      const dataPromise = get_data(client, action.key);
      client.redis.sendCommand(["MULTI"]);
      result = await $2.send({
        client,
        data: await dataPromise,
        action: action
      });
    } else if (code === "UNLISTEN") {
      client.redis.sendCommand(["MULTI"]);
      result = await $3.send({
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


function _91(md){return(
md`Finally, the transaction is executed and the response is passed back to the [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue).`
)}

async function _ack_process_operation(process_operation_args,ack_operation,action,$0)
{
  const client = process_operation_args;
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


async function _93(clear_data_listeners,exampleClient,init_client,enqueue_operation,process_operation,next_notify,ack_notify)
{
  clear_data_listeners(exampleClient, "foo");
  init_client(exampleClient);
  await enqueue_operation(exampleClient, {
    request_id: "1",
    action: "LISTEN",
    key: "foo"
  });
  await enqueue_operation(exampleClient, {
    request_id: "2",
    action: "PUT",
    key: "foo",
    value: "bar"
  });
  await enqueue_operation(exampleClient, {
    request_id: "3",
    action: "GET",
    key: "foo"
  });
  await enqueue_operation(exampleClient, {
    request_id: "4",
    action: "UNLISTEN",
    key: "foo"
  });

  while ((await process_operation(exampleClient)) !== "NOOP") {}

  const history = [];
  var next = await next_notify(exampleClient);
  while (next) {
    const [id, reply] = next;
    history.push(reply);
    ack_notify(exampleClient, id);
    next = await next_notify(exampleClient);
  }
  return history;
}


function _94(md){return(
md`## Test clients`
)}

function _95(md){return(
md`## Fuzzer`
)}

function _96(md){return(
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

async function _runPlan(clients,init_client,clear_data_listeners,exampleClient,plan,enqueue_operation,process_operation)
{
  // clear state
  console.log("Resetting clients");
  await Promise.all(clients.map((c) => init_client(c)));
  console.log("Resetting listeners");
  await Promise.all(
    ["k0", "k1", "k2"].map((k) => clear_data_listeners(exampleClient, k))
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
      enqueue_operation(client, action);
      return process_operation(client);
    })
  );
}


function _histories(runPlan,clients,next_notify,ack_notify)
{
  // wait for plan to run
  runPlan;
  // Now drain the queues
  return Promise.all(
    clients.map(async (client) => {
      const history = [];
      var next = await next_notify(client);
      while (next) {
        const [id, replyRaw] = next;
        const reply = replyRaw.reduce((obj, val, index, arr) => {
          if (index % 2 == 1) obj[arr[index - 1]] = arr[index];
          return obj;
        }, {});
        ack_notify(client, id);
        history.push(reply);
        next = await next_notify(client);
      }
      return history;
    })
  );
}


async function _clients(restartClients,exampleClient,createClient,redisConfig){return(
restartClients,
[
  exampleClient,
  await createClient(redisConfig, "1"),
  await createClient(redisConfig, "2")
]
)}

function _104(md){return(
md`## Resource Identifiers`
)}

function _105(md){return(
md`## Data Model`
)}

function _106(md){return(
md`### Data Storage`
)}

function _107(md){return(
md`### Listeners`
)}

function _108(md){return(
md`### init_client`
)}

function _109(init_client,exampleClient){return(
init_client(exampleClient)
)}

function _110(md){return(
md`### Workers`
)}

function _workers(ack_process_operation,put_operation_reponse,get_operation_repsonse,listen_operation_reponse,unlisten_operation_response){return(
[
  ack_process_operation,
  put_operation_reponse,
  get_operation_repsonse,
  listen_operation_reponse,
  unlisten_operation_response
]
)}

function _112(md){return(
md`## Client Actions`
)}

function _113(md){return(
md`### enqueue_operation`
)}

function _114(md){return(
md`### head_operation_id`
)}

function _115(md){return(
md`### next_operation`
)}

function _116(md){return(
md`### ack_operation`
)}

function _117(md){return(
md`### clear_operations`
)}

function _118(md){return(
md`## Client Reply`
)}

function _119(md){return(
md`## Action Processing`
)}

function _120(md){return(
md`### run_put_operation`
)}

function _run_put_operation_args(flowQueue){return(
flowQueue({
  name: "run_put_operation_args",
  timeout_ms: 2000
})
)}

function _122(run_put_operation_args){return(
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


function _put_operation_reponse($0,run_put_operation_effect){return(
$0.respond(run_put_operation_effect)
)}

function _125(md){return(
md`### run_get_operation`
)}

function _run_get_operation_args(flowQueue){return(
flowQueue({
  name: "run_get_operation_args",
  timeout_ms: 2000
})
)}

function _127(run_get_operation_args){return(
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


function _get_operation_repsonse($0,run_get_operation_effect){return(
$0.respond(run_get_operation_effect)
)}

function _130(md){return(
md`### run_listen_operation`
)}

function _run_listen_operation_args(flowQueue){return(
flowQueue({
  name: "run_listen_operation_args"
})
)}

function _132(run_listen_operation_args){return(
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


function _listen_operation_reponse($0,run_listen_effect){return(
$0.respond(run_listen_effect)
)}

function _135(md){return(
md`### run_unlisten`
)}

function _run_unlisten_operation_args(flowQueue){return(
flowQueue({
  name: "run_unlisten_operation_args"
})
)}

function _137(run_unlisten_operation_args){return(
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

function _140(md){return(
md`---`
)}

function _141(md){return(
md`## Dependencies`
)}

function _includeIf(){return(
(predicate, string) => (predicate ? string : "")
)}

async function _testing(createClient)
{
  createClient;
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}


function _145(md){return(
md`## Backups and Analytics`
)}

function _147(footer){return(
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
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["FileAttachment","width","md"], _8);
  main.variable(observer()).define(["width","md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("createClient")).define("createClient", ["createRedisClient"], _createClient);
  const child1 = runtime.module(define1);
  main.import("createClient", "createRedisClient", child1);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("exampleClient")).define("exampleClient", ["restartClients","createClient","redisConfig"], _exampleClient);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof restartClients")).define("viewof restartClients", ["Inputs"], _restartClients);
  main.variable(observer("restartClients")).define("restartClients", ["Generators", "viewof restartClients"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["suite","testing","exampleClient"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("init_client")).define("init_client", ["clear_operations","clear_notifications","set_head_operation_id","set_head_notify_id"], _init_client);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("client_operation_queue_key")).define("client_operation_queue_key", _client_operation_queue_key);
  main.variable(observer("client_notify_queue_key")).define("client_notify_queue_key", _client_notify_queue_key);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("clear_operations")).define("clear_operations", ["client_operation_queue_key"], _clear_operations);
  main.variable(observer("clear_notifications")).define("clear_notifications", ["client_notify_queue_key"], _clear_notifications);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("client_operation_head_id_key")).define("client_operation_head_id_key", _client_operation_head_id_key);
  main.variable(observer("client_notify_head_id_key")).define("client_notify_head_id_key", _client_notify_head_id_key);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("set_head_operation_id")).define("set_head_operation_id", ["client_operation_head_id_key"], _set_head_operation_id);
  main.variable(observer("set_head_notify_id")).define("set_head_notify_id", ["client_notify_head_id_key"], _set_head_notify_id);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("get_head_operation_id")).define("get_head_operation_id", ["client_operation_head_id_key"], _get_head_operation_id);
  main.variable(observer("get_head_notify_id")).define("get_head_notify_id", ["client_notify_head_id_key"], _get_head_notify_id);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["suite","createClient","redisConfig","enqueue_operation","init_client","testing","get_head_operation_id","get_head_notify_id","next_operation","next_notify"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("client_longpoll_session_key")).define("client_longpoll_session_key", _client_longpoll_session_key);
  main.variable(observer("createLongpollSession")).define("createLongpollSession", ["init_client","client_longpoll_session_key"], _createLongpollSession);
  main.variable(observer("retrieveLongpollSession")).define("retrieveLongpollSession", ["client_longpoll_session_key"], _retrieveLongpollSession);
  main.variable(observer()).define(["suite","createLongpollSession","exampleClient","retrieveLongpollSession","testing"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer("client_longpoll_response_num_key")).define("client_longpoll_response_num_key", _client_longpoll_response_num_key);
  main.variable(observer("incrementLongpollResponseNum")).define("incrementLongpollResponseNum", ["client_longpoll_response_num_key"], _incrementLongpollResponseNum);
  main.variable(observer()).define(["suite","incrementLongpollResponseNum","exampleClient","testing"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("data_key")).define("data_key", _data_key);
  main.variable(observer("data_listeners_key")).define("data_listeners_key", _data_listeners_key);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("set_data")).define("set_data", ["data_key"], _set_data);
  main.variable(observer("get_data")).define("get_data", ["data_key"], _get_data);
  main.variable(observer()).define(["suite","set_data","exampleClient","get_data","testing"], _60);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer("add_data_listener")).define("add_data_listener", ["data_listeners_key"], _add_data_listener);
  main.variable(observer("remove_data_listener")).define("remove_data_listener", ["data_listeners_key"], _remove_data_listener);
  main.variable(observer("get_data_listeners")).define("get_data_listeners", ["data_listeners_key"], _get_data_listeners);
  main.variable(observer("clear_data_listeners")).define("clear_data_listeners", ["data_listeners_key"], _clear_data_listeners);
  main.variable(observer()).define(["suite","clear_data_listeners","exampleClient","get_data_listeners","add_data_listener","remove_data_listener","testing"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("enqueue_operation")).define("enqueue_operation", ["client_operation_queue_key"], _enqueue_operation);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer("next_operation")).define("next_operation", ["get_head_operation_id","client_operation_queue_key"], _next_operation);
  main.variable(observer()).define(["md"], _73);
  main.variable(observer("ack_operation")).define("ack_operation", ["set_head_operation_id"], _ack_operation);
  main.variable(observer()).define(["suite","createClient","redisConfig","init_client","enqueue_operation","next_operation","ack_operation","testing"], _75);
  main.variable(observer()).define(["md"], _76);
  main.variable(observer("enqueue_notify")).define("enqueue_notify", ["client_notify_queue_key"], _enqueue_notify);
  main.variable(observer()).define(["enqueue_notify","exampleClient"], _78);
  main.variable(observer("next_notify")).define("next_notify", ["get_head_notify_id","client_notify_queue_key"], _next_notify);
  main.variable(observer("ack_notify")).define("ack_notify", ["set_head_notify_id"], _ack_notify);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("process_operation")).define("process_operation", ["viewof process_operation_args"], _process_operation);
  main.variable(observer("viewof process_operation_args")).define("viewof process_operation_args", ["flowQueue"], _process_operation_args);
  main.variable(observer("process_operation_args")).define("process_operation_args", ["Generators", "viewof process_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _85);
  main.variable(observer()).define(["process_operation_args"], _86);
  main.variable(observer()).define(["md"], _87);
  main.variable(observer("action")).define("action", ["process_operation_args","client_operation_head_id_key","next_operation","viewof process_operation_args","invalidation"], _action);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer("process_operation_effect")).define("process_operation_effect", ["process_operation_args","action","data_listeners_key","get_data_listeners","viewof run_put_operation_args","data_key","get_data","viewof run_get_operation_args","viewof run_listen_operation_args","viewof run_unlisten_operation_args","viewof process_operation_args"], _process_operation_effect);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("ack_process_operation")).define("ack_process_operation", ["process_operation_args","ack_operation","action","viewof process_operation_args"], _ack_process_operation);
  main.variable(observer()).define(["clear_data_listeners","exampleClient","init_client","enqueue_operation","process_operation","next_notify","ack_notify"], _93);
  main.variable(observer()).define(["md"], _94);
  main.variable(observer()).define(["md"], _95);
  main.variable(observer()).define(["md"], _96);
  main.variable(observer("mulberry32")).define("mulberry32", _mulberry32);
  main.variable(observer("rnd")).define("rnd", ["mulberry32"], _rnd);
  main.variable(observer("viewof fuzz")).define("viewof fuzz", ["Inputs"], _fuzz);
  main.variable(observer("fuzz")).define("fuzz", ["Generators", "viewof fuzz"], (G, _) => G.input(_));
  main.variable(observer("plan")).define("plan", ["fuzz","rnd","invalidation"], _plan);
  main.variable(observer("runPlan")).define("runPlan", ["clients","init_client","clear_data_listeners","exampleClient","plan","enqueue_operation","process_operation"], _runPlan);
  main.variable(observer("histories")).define("histories", ["runPlan","clients","next_notify","ack_notify"], _histories);
  main.variable(observer("clients")).define("clients", ["restartClients","exampleClient","createClient","redisConfig"], _clients);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer()).define(["md"], _107);
  main.variable(observer()).define(["md"], _108);
  main.variable(observer()).define(["init_client","exampleClient"], _109);
  main.variable(observer()).define(["md"], _110);
  main.variable(observer("workers")).define("workers", ["ack_process_operation","put_operation_reponse","get_operation_repsonse","listen_operation_reponse","unlisten_operation_response"], _workers);
  main.variable(observer()).define(["md"], _112);
  main.variable(observer()).define(["md"], _113);
  main.variable(observer()).define(["md"], _114);
  main.variable(observer()).define(["md"], _115);
  main.variable(observer()).define(["md"], _116);
  main.variable(observer()).define(["md"], _117);
  main.variable(observer()).define(["md"], _118);
  main.variable(observer()).define(["md"], _119);
  main.variable(observer()).define(["md"], _120);
  main.variable(observer("viewof run_put_operation_args")).define("viewof run_put_operation_args", ["flowQueue"], _run_put_operation_args);
  main.variable(observer("run_put_operation_args")).define("run_put_operation_args", ["Generators", "viewof run_put_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_put_operation_args"], _122);
  main.variable(observer("run_put_operation_effect")).define("run_put_operation_effect", ["run_put_operation_args","set_data","enqueue_notify"], _run_put_operation_effect);
  main.variable(observer("put_operation_reponse")).define("put_operation_reponse", ["viewof run_put_operation_args","run_put_operation_effect"], _put_operation_reponse);
  main.variable(observer()).define(["md"], _125);
  main.variable(observer("viewof run_get_operation_args")).define("viewof run_get_operation_args", ["flowQueue"], _run_get_operation_args);
  main.variable(observer("run_get_operation_args")).define("run_get_operation_args", ["Generators", "viewof run_get_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_get_operation_args"], _127);
  main.variable(observer("run_get_operation_effect")).define("run_get_operation_effect", ["run_get_operation_args","enqueue_notify"], _run_get_operation_effect);
  main.variable(observer("get_operation_repsonse")).define("get_operation_repsonse", ["viewof run_get_operation_args","run_get_operation_effect"], _get_operation_repsonse);
  main.variable(observer()).define(["md"], _130);
  main.variable(observer("viewof run_listen_operation_args")).define("viewof run_listen_operation_args", ["flowQueue"], _run_listen_operation_args);
  main.variable(observer("run_listen_operation_args")).define("run_listen_operation_args", ["Generators", "viewof run_listen_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_listen_operation_args"], _132);
  main.variable(observer("run_listen_effect")).define("run_listen_effect", ["run_listen_operation_args","enqueue_notify","add_data_listener"], _run_listen_effect);
  main.variable(observer("listen_operation_reponse")).define("listen_operation_reponse", ["viewof run_listen_operation_args","run_listen_effect"], _listen_operation_reponse);
  main.variable(observer()).define(["md"], _135);
  main.variable(observer("viewof run_unlisten_operation_args")).define("viewof run_unlisten_operation_args", ["flowQueue"], _run_unlisten_operation_args);
  main.variable(observer("run_unlisten_operation_args")).define("run_unlisten_operation_args", ["Generators", "viewof run_unlisten_operation_args"], (G, _) => G.input(_));
  main.variable(observer()).define(["run_unlisten_operation_args"], _137);
  main.variable(observer("run_unlisten_effect")).define("run_unlisten_effect", ["run_unlisten_operation_args","remove_data_listener","enqueue_notify"], _run_unlisten_effect);
  main.variable(observer("unlisten_operation_response")).define("unlisten_operation_response", ["viewof run_unlisten_operation_args","run_unlisten_effect"], _unlisten_operation_response);
  main.variable(observer()).define(["md"], _140);
  main.variable(observer()).define(["md"], _141);
  main.variable(observer("includeIf")).define("includeIf", _includeIf);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer("testing")).define("testing", ["createClient"], _testing);
  main.variable(observer()).define(["md"], _145);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _147);
  return main;
}
