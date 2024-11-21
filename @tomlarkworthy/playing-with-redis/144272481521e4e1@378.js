import define1 from "./6a703b03d185f279@1005.js";

function _1(md){return(
md`# Playing with Redis`
)}

function _connection1(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _4(md){return(
md`## Get all KEYS with ["KEYS", "0"]`
)}

async function _5(Inputs,connection1){return(
Inputs.table(
  (await connection1.sendCommand(["KEYS", "*"])).sort().map((key) => ({
    key
  }))
)
)}

function _6(md){return(
md`## Using a queue (RPUSH and BLPOP)`
)}

function _7(md){return(
md`### send message by publishing: Right Push (RPUSH)|`
)}

function _userMessage(Inputs){return(
Inputs.text({
  placeholder: "message"
})
)}

function _messages_in_len(connection1,userMessage){return(
connection1.sendCommand(["RPUSH", "messages_in", userMessage])
)}

function _10(md){return(
md`### listen for messages: Blocking Left Pop

requires hogging a connection.`
)}

function _messageListener(createClient,redisConfig,invalidation){return(
createClient({
  socket: redisConfig,
  invalidation
})
)}

function* _latestMessage(messageListener)
{
  while (true) yield messageListener.sendCommand(["BLPOP", "messages_in", "0"]);
}


function _13(latestMessage){return(
latestMessage
)}

function _14(md){return(
md`## Executing a Lua Script`
)}

function _15(connection1){return(
connection1.sendCommand(["EVAL", `return 'Hello, scripting!'`, "0"])
)}

function _16(md){return(
md`## Atomic fanout to many queues

The blocking queue approach
- After a BRPOP, the client could break and a message would be lost.`
)}

function _SUBSCRIBERS_KEY(){return(
"s1"
)}

function _send_many(connection1){return(
async (subscribers, userMessage) => {
  const queues = await connection1.sendCommand(["SMEMBERS", subscribers]);
  connection1.sendCommand(["MULTI"]);
  queues.forEach((q) => connection1.sendCommand(["RPUSH", q, userMessage]));
  return connection1.sendCommand(["EXEC"]);
}
)}

function _19(Inputs,send_many,SUBSCRIBERS_KEY){return(
Inputs.button("send_many", {
  reduce: () => {
    send_many(SUBSCRIBERS_KEY, "hi " + Math.random().toString(16).substring(3));
  }
})
)}

function* _q1Messages(q1Client)
{
  while (true) {
    yield q1Client.sendCommand(["BLPOP", "q1", "0"]);
  }
}


function* _q2Messages(q2Client)
{
  while (true) {
    yield q2Client.sendCommand(["BLPOP", "q2", "0"]);
  }
}


function _subscribe(connection1){return(
(subscribers, id) =>
  connection1.sendCommand(["SADD", subscribers, id])
)}

function _initialize(connection1,SUBSCRIBERS_KEY,subscribe)
{
  connection1.sendCommand(["DEL", SUBSCRIBERS_KEY]);
  subscribe(SUBSCRIBERS_KEY, "q1");
  subscribe(SUBSCRIBERS_KEY, "q2");
}


function _members(initialize,connection1,SUBSCRIBERS_KEY){return(
initialize, connection1.sendCommand(["SMEMBERS", SUBSCRIBERS_KEY])
)}

function _q1Client(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _q2Client(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _27(md){return(
md`### ACKing a stream`
)}

function _GROUP(){return(
"g0"
)}

function _29(connection1,GROUP,POS1){return(
connection1.sendCommand(["XGROUP", "CREATE", "stream-1", GROUP, POS1])
)}

function _CONSUMER(){return(
"c0"
)}

function _POS1(){return(
"0"
)}

function _32(connection1){return(
connection1.sendCommand(["XADD", "stream-1", "*", "message", "hi!"])
)}

function _33(connection1){return(
connection1.sendCommand(["XLEN", "stream-1"])
)}

function _34(connection1){return(
connection1.sendCommand(["XINFO", "STREAM", "stream-1"])
)}

function _35(connection1,GROUP){return(
connection1.sendCommand(["XINFO", "CONSUMERS", "stream-1", GROUP])
)}

function _streamClient(createClient,redisConfig){return(
createClient({
  socket: redisConfig
})
)}

function _37(streamClient,POS1){return(
streamClient.sendCommand(["XREAD", "COUNT", "1", "STREAMS", "stream-1", POS1])
)}

function _38(streamClient,GROUP,CONSUMER,POS1){return(
streamClient.sendCommand([
  "XREADGROUP",
  "GROUP",
  GROUP,
  CONSUMER,
  "COUNT",
  "2",
  "STREAMS",
  "stream-1",
  POS1
])
)}

function _39(connection1,GROUP){return(
connection1.sendCommand(["XPENDING", "stream-1", GROUP])
)}

function _40(md){return(
md`---
## Config`
)}

function _redisConfig(){return(
{
  host: "redis.webcode.run",
  port: 443,
  tls: true
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("createClient", child1);
  main.variable(observer("connection1")).define("connection1", ["createClient","redisConfig"], _connection1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Inputs","connection1"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof userMessage")).define("viewof userMessage", ["Inputs"], _userMessage);
  main.variable(observer("userMessage")).define("userMessage", ["Generators", "viewof userMessage"], (G, _) => G.input(_));
  main.variable(observer("messages_in_len")).define("messages_in_len", ["connection1","userMessage"], _messages_in_len);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("messageListener")).define("messageListener", ["createClient","redisConfig","invalidation"], _messageListener);
  main.variable(observer("latestMessage")).define("latestMessage", ["messageListener"], _latestMessage);
  main.variable(observer()).define(["latestMessage"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["connection1"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("SUBSCRIBERS_KEY")).define("SUBSCRIBERS_KEY", _SUBSCRIBERS_KEY);
  main.variable(observer("send_many")).define("send_many", ["connection1"], _send_many);
  main.variable(observer()).define(["Inputs","send_many","SUBSCRIBERS_KEY"], _19);
  main.variable(observer("q1Messages")).define("q1Messages", ["q1Client"], _q1Messages);
  main.variable(observer("q2Messages")).define("q2Messages", ["q2Client"], _q2Messages);
  main.variable(observer("subscribe")).define("subscribe", ["connection1"], _subscribe);
  main.variable(observer("initialize")).define("initialize", ["connection1","SUBSCRIBERS_KEY","subscribe"], _initialize);
  main.variable(observer("members")).define("members", ["initialize","connection1","SUBSCRIBERS_KEY"], _members);
  main.variable(observer("q1Client")).define("q1Client", ["createClient","redisConfig"], _q1Client);
  main.variable(observer("q2Client")).define("q2Client", ["createClient","redisConfig"], _q2Client);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("GROUP")).define("GROUP", _GROUP);
  main.variable(observer()).define(["connection1","GROUP","POS1"], _29);
  main.variable(observer("CONSUMER")).define("CONSUMER", _CONSUMER);
  main.variable(observer("POS1")).define("POS1", _POS1);
  main.variable(observer()).define(["connection1"], _32);
  main.variable(observer()).define(["connection1"], _33);
  main.variable(observer()).define(["connection1"], _34);
  main.variable(observer()).define(["connection1","GROUP"], _35);
  main.variable(observer("streamClient")).define("streamClient", ["createClient","redisConfig"], _streamClient);
  main.variable(observer()).define(["streamClient","POS1"], _37);
  main.variable(observer()).define(["streamClient","GROUP","CONSUMER","POS1"], _38);
  main.variable(observer()).define(["connection1","GROUP"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("redisConfig")).define("redisConfig", _redisConfig);
  return main;
}
