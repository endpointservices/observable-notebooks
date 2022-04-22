// https://observablehq.com/@tomlarkworthy/redis@978
import define1 from "./bb2055d580bbbab2@106.js";
import define2 from "./58f3eb7334551ae6@209.js";

function _1(md){return(
md`# [Redis Serialization Protocol](https://redis.io/topics/protocol) (RESP) Client for the Web`
)}

function _2(FileAttachment,width){return(
FileAttachment("redis.png").image({width: Math.min(640, width)})
)}

function _3(md){return(
md`\`\`\`js
import {createClient} from '@tomlarkworthy/redis'
\`\`\``
)}

function _4(md){return(
md`Let's bring a hugely popular database to the web. This is a partial port of the [nodejs redis client](https://github.com/redis/node-redis) adapted for use with websockets. We don't bother creation dedication functions for the [zillions of commands](https://redis.io/commands) available, rather, we just port the generic \`sendCommand([...])\` catchall that gives you everything in one.

\`\`\`js
const client = await createClient()
client.sendCommand(["SET", "k1", "foobar"]);
const result = await client.sendCommand(["GET", "k1"]);
// result == "foobar"
\`\`\`
`
)}

function _5(md){return(
md`
To reach Redis from a browser you need to setup an intermediate websocket to TCP socket bridge (instructions below). Useful in privileged browser environments, such as behind a private network or with [webcode](https://webcode.run).  

The Redis protocol is used by more than just [Redis](https://redis.io/)! See also [KeyDB](https://keydb.dev/) and [SSDB](https://github.com/ideawu/ssdb)`
)}

function _6(tweet){return(
tweet("1474008210650587144")
)}

function _7(md){return(
md`### Availible on NPM

This notebook hosts the source code. The source is published to NPM under [web-redis](https://www.npmjs.com/package/web-redis) using [distiller](https://observablehq.com/@tomlarkworthy/distiller).`
)}

function _8(md){return(
md`### Start REDIS

\`\`\`
docker run -it --rm --name redis -p 6379:6379  redis 
\`\`\``
)}

function _9(md){return(
md`### Install and Start websockify bridge

\`\`\`
npm install git+https://github.com/endpointservices/websockify-js
\`\`\`

\`\`\`
node_modules/websockify/websockify.js 6380 localhost:6379
\`\`\`

<mark> Warning <b>websockify</b> cannot encrypt the upstream TCP session </mark> which may be ok if you run it local to the redis server.

The command we use for the demo server protected with ssh with LetsEncrypt certbot ends up as 
\`\`\`
nohup node_modules/websockify/websockify.js \\
--cert /etc/letsencrypt/live/redis.webcode.run/fullchain.pem \\
--key /etc/letsencrypt/live/redis.webcode.run/privkey.pem \\
443 localhost:6379 &
\`\`\``
)}

function _10(md){return(
md`### Alternative: ws-tcp-proxy bridge

An alternative is a go websocket -> TCP proxy which does support TLS for the upstream, which would make it suitable for TLS encrypted REDIS services such as that on REDIS cloud

https://github.com/zquestz/ws-tcp-proxy`
)}

function _11(md){return(
md`### Managed Redis providers

https://geekflare.com/redis-hosting-platform/`
)}

function _12(md){return(
md`### createClient`
)}

function _createClient(RedisCommandsQueue,encodeCommand,C){return(
async function createClient({
  socket = {
    host: "localhost",
    port: 6380,
    tls: false
  },
  url = undefined,
  username = undefined,
  password = undefined,
  name = undefined,
  database = undefined
} = {}) {
  const queue = new RedisCommandsQueue();
  var ws = undefined;

  const newSocket = async () => {
    ws = new WebSocket(
      `ws${socket.tls ? "s" : ""}://${socket.host}:${socket.port}`
    );
    ws.binaryType = "arraybuffer";
    ws.onmessage = (evt) => {
      queue.parseResponse(evt.data);
    };
    // wait for socket to open
    await new Promise((resolve, reject) => {
      ws.onclose = (evt) => reject(evt.code);
      ws.onopen = resolve;
    });

    if (username || password) {
      if (!username) sendCommand(["AUTH", password]);
      else sendCommand(["AUTH", username, password], { asap: true });
    }

    if (database) {
      sendCommand(["SELECT", database], { asap: true });
    }

    return ws;
  };

  const tick = async () => {
    while (true) {
      const args = queue.getCommandToSend();
      if (args === undefined) break;
      if (ws.readyState > 1 /* CLOSING or CLOSED */) {
        await newSocket();
      }
      writeCommand(args);
    }
  };

  const sendCommand = (args, options) => {
    const reply = queue.addCommand(args, options);
    tick();
    return reply;
  };

  const writeCommand = (args) => {
    for (const toWrite of encodeCommand(args)) {
      ws.send(toWrite);
    }
  };

  await newSocket();

  return {
    sendCommand,
    subscribe: (channels, listener, bufferMode) => {
      const reply = queue.subscribe(
        C.PubSubSubscribeCommands.SUBSCRIBE,
        channels,
        listener,
        bufferMode
      );
      tick();
      return reply;
    }
  };
}
)}

function _14(md){return(
md`### Works with Redis Cloud
(if you have a websocket proxy setup up)`
)}

function _15(md){return(
md`## Ported code

Porting involves:-
1. exchanging the use of Buffers for UInt8Array + TextEncoder. 
2. Sockets swapped for WebSocket.
3. TS to JS conversion.
`
)}

function _encodeCommand(encoder){return(
function* encodeCommand(args) {
  let strings = `*${args.length}\r\n`,
    stringsLength = 0;
  for (const arg of args) {
    const isString = typeof arg === "string",
      byteLength = isString ? encoder.encode(arg).length : arg.byteLength;
    strings += `$${byteLength}\r\n`;

    if (isString) {
      const totalLength = stringsLength + byteLength;
      if (totalLength > 1024) {
        yield strings;
        strings = arg;
        stringsLength = byteLength;
      } else {
        strings += arg;
        stringsLength = totalLength;
      }
    } else {
      yield strings;
      strings = "";
      stringsLength = 0;
      yield arg;
    }

    strings += "\r\n";
  }

  yield strings;
}
)}

function _parseURL(){return(
(url) => {
  // https://www.iana.org/assignments/uri-schemes/prov/redis
  const { hostname, port, protocol, username, password, pathname } = new URL(
      url
    ),
    parsed = {
      socket: {
        host: hostname
      }
    };

  if (protocol === "rediss:") {
    parsed.socket.tls = true;
  } else if (protocol !== "redis:") {
    throw new TypeError("Invalid protocol");
  }

  if (port) {
    parsed.socket.port = Number(port);
  }

  if (username) {
    parsed.username = decodeURIComponent(username);
  }

  if (password) {
    parsed.password = decodeURIComponent(password);
  }

  if (pathname.length > 1) {
    const database = Number(pathname.substring(1));
    if (isNaN(database)) {
      throw new TypeError("Invalid pathname");
    }

    parsed.database = database;
  }

  return parsed;
}
)}

function _C(encoder){return(
{
  PUB_SUB_MESSAGES: {
    message: encoder.encode("message"),
    pMessage: encoder.encode("pmessage"),
    subscribe: encoder.encode("subscribe"),
    pSubscribe: encoder.encode("psubscribe"),
    unsubscribe: encoder.encode("unsunscribe"),
    pUnsubscribe: encoder.encode("punsubscribe")
  },
  PubSubSubscribeCommands: {
    SUBSCRIBE: "SUBSCRIBE",
    PSUBSCRIBE: "PSUBSCRIBE"
  },
  PubSubUnsubscribeCommands: {
    UNSUBSCRIBE: "UNSUBSCRIBE",
    PUNSUBSCRIBE: "PUNSUBSCRIBE"
  }
}
)}

function _RedisCommandsQueue(decoder,Parser,equal,C,AbortError){return(
class RedisCommandsQueue {
  static flushQueue(queue, err) {
    while (queue.length) {
      queue.shift().reject(err);
    }
  }

  static emitPubSubMessage(listenersMap, message, channel, pattern) {
    const keyString = decoder.decode(pattern || channel),
      listeners = listenersMap.get(keyString);

    if (!listeners) return;

    for (const listener of listeners.buffers) {
      listener(message, channel);
    }

    if (!listeners.strings.size) return;

    const messageString = decoder.decode(message),
      channelString = pattern ? decoder.decode(channel) : keyString;
    for (const listener of listeners.strings) {
      listener(messageString, channelString);
    }
  }

  constructor(maxLength = 10000) {
    this.waitingToBeSent = [];
    this.waitingForReply = [];
    this.maxLength = maxLength;
    this.parser = new Parser({
      returnReply: (reply) => {
        if (this.pubSubState && Array.isArray(reply)) {
          if (equal(C.PUB_SUB_MESSAGES.message, reply[0])) {
            return RedisCommandsQueue.emitPubSubMessage(
              this.pubSubState.listeners.channels,
              reply[2],
              reply[1]
            );
          } else if (equal(C.PUB_SUB_MESSAGES.pMessage, reply[0])) {
            return RedisCommandsQueue.emitPubSubMessage(
              this.pubSubState.listeners.patterns,
              reply[3],
              reply[2],
              reply[1]
            );
          } else if (
            equal(C.PUB_SUB_MESSAGES.subscribe, reply[0]) ||
            equal(C.PUB_SUB_MESSAGES.pSubscribe.equals, reply[0]) ||
            equal(C.PUB_SUB_MESSAGES.unsubscribe.equals, reply[0]) ||
            equal(C.PUB_SUB_MESSAGES.pUnsubscribe.equals, reply[0])
          ) {
            if (--this.waitingForReply[0].channelsCounter === 0) {
              this.shiftWaitingForReply().resolve();
            }
            return;
          }
        }
        this.shiftWaitingForReply().resolve(reply);
      },
      returnError: (err) => this.shiftWaitingForReply().reject(err)
    });
  }

  addCommand(args, options) {
    if (this.pubSubState && !options?.ignorePubSubMode) {
      return Promise.reject(new Error("Cannot send commands in PubSub mode"));
    } else if (
      this.maxLength &&
      this.waitingToBeSent.length + this.waitingForReply.length >=
        this.maxLength
    ) {
      return Promise.reject(new Error("The queue is full"));
    } else if (options?.signal?.aborted) {
      return Promise.reject(new AbortError());
    }
    return new Promise((resolve, reject) => {
      const node = {
        args,
        chainId: options?.chainId,
        returnBuffers: options?.returnBuffers,
        resolve,
        reject
      };

      if (options?.signal) {
        const listener = () => {
          this.waitingToBeSent.removeNode(node);
          node.value.reject(new AbortError());
        };
        node.value.abort = {
          signal: options.signal,
          listener
        };
        // AbortSignal type is incorrent
        options.signal.addEventListener("abort", listener, {
          once: true
        });
      }
      if (options?.asap) {
        this.waitingToBeSent.unshift(node);
      } else {
        this.waitingToBeSent.push(node);
      }
    });
  }

  initiatePubSubState() {
    return (this.pubSubState ??= {
      subscribed: 0,
      subscribing: 0,
      unsubscribing: 0,
      listeners: {
        channels: new Map(),
        patterns: new Map()
      }
    });
  }

  subscribe(command, channels, listener, returnBuffers) {
    const pubSubState = this.initiatePubSubState(),
      channelsToSubscribe = [],
      listenersMap =
        command === C.PubSubSubscribeCommands.SUBSCRIBE
          ? pubSubState.listeners.channels
          : pubSubState.listeners.patterns;
    for (const channel of Array.isArray(channels) ? channels : [channels]) {
      const channelString =
        typeof channel === "string" ? channel : channel.toString();
      let listeners = listenersMap.get(channelString);
      if (!listeners) {
        listeners = {
          buffers: new Set(),
          strings: new Set()
        };
        listenersMap.set(channelString, listeners);
        channelsToSubscribe.push(channel);
      }

      // https://github.com/microsoft/TypeScript/issues/23132
      (returnBuffers ? listeners.buffers : listeners.strings).add(listener);
    }

    if (!channelsToSubscribe.length) {
      return Promise.resolve();
    }
    return this.pushPubSubCommand(command, channelsToSubscribe);
  }

  unsubscribe(command, channels, listener, returnBuffers) {
    if (!this.pubSubState) {
      return Promise.resolve();
    }

    const listeners =
      command === C.PubSubUnsubscribeCommands.UNSUBSCRIBE
        ? this.pubSubState.listeners.channels
        : this.pubSubState.listeners.patterns;

    if (!channels) {
      const size = listeners.size;
      listeners.clear();
      return this.pushPubSubCommand(command, size);
    }

    const channelsToUnsubscribe = [];
    for (const channel of Array.isArray(channels) ? channels : [channels]) {
      const sets = listeners.get(channel);
      if (!sets) continue;

      let shouldUnsubscribe;
      if (listener) {
        // https://github.com/microsoft/TypeScript/issues/23132
        (returnBuffers ? sets.buffers : sets.strings).delete(listener);
        shouldUnsubscribe = !sets.buffers.size && !sets.strings.size;
      } else {
        shouldUnsubscribe = true;
      }

      if (shouldUnsubscribe) {
        channelsToUnsubscribe.push(channel);
        listeners.delete(channel);
      }
    }
    if (!channelsToUnsubscribe.length) {
      return Promise.resolve();
    }
    return this.pushPubSubCommand(command, channelsToUnsubscribe);
  }

  pushPubSubCommand(command, channels) {
    return new Promise((resolve, reject) => {
      const pubSubState = this.initiatePubSubState(),
        isSubscribe =
          command === C.PubSubSubscribeCommands.SUBSCRIBE ||
          command === C.PubSubSubscribeCommands.PSUBSCRIBE,
        inProgressKey = isSubscribe ? "subscribing" : "unsubscribing",
        commandArgs = [command];

      let channelsCounter;
      if (typeof channels === "number") {
        // unsubscribe only
        channelsCounter = channels;
      } else {
        commandArgs.push(...channels);
        channelsCounter = channels.length;
      }

      pubSubState[inProgressKey] += channelsCounter;

      this.waitingToBeSent.push({
        args: commandArgs,
        channelsCounter,
        returnBuffers: true,
        resolve: () => {
          pubSubState[inProgressKey] -= channelsCounter;
          if (isSubscribe) {
            pubSubState.subscribed += channelsCounter;
          } else {
            pubSubState.subscribed -= channelsCounter;
            if (
              !pubSubState.subscribed &&
              !pubSubState.subscribing &&
              !pubSubState.subscribed
            ) {
              this.pubSubState = undefined;
            }
          }
          resolve();
        },
        reject: (err) => {
          pubSubState[inProgressKey] -=
            channelsCounter * (isSubscribe ? 1 : -1);
          reject(err);
        }
      });
    });
  }

  resubscribe() {
    if (!this.pubSubState) {
      return;
    }

    this.pubSubState.subscribed = 0;

    const promises = [],
      { channels, patterns } = this.pubSubState.listeners;

    if (channels.size) {
      promises.push(
        this.pushPubSubCommand(C.PubSubSubscribeCommands.SUBSCRIBE, [
          ...channels.keys()
        ])
      );
    }

    if (patterns.size) {
      promises.push(
        this.pushPubSubCommand(C.PubSubSubscribeCommands.PSUBSCRIBE, [
          ...patterns.keys()
        ])
      );
    }

    if (promises.length) {
      return Promise.all(promises);
    }
  }

  getCommandToSend() {
    const toSend = this.waitingToBeSent.shift();
    if (toSend) {
      this.waitingForReply.push({
        resolve: toSend.resolve,
        reject: toSend.reject,
        channelsCounter: toSend.channelsCounter,
        returnBuffers: toSend.returnBuffers
      });
    }
    this.chainInExecution = toSend?.chainId;
    return toSend?.args;
  }

  parseResponse(data) {
    this.parser.setReturnBuffers(
      !!this.waitingForReply[0]?.returnBuffers || !!this.pubSubState?.subscribed
    );
    this.parser.execute(data);
  }

  shiftWaitingForReply() {
    if (!this.waitingForReply.length) {
      throw new Error("Got an unexpected reply from Redis");
    }
    return this.waitingForReply.shift();
  }
  flushWaitingForReply(err) {
    RedisCommandsQueue.flushQueue(this.waitingForReply, err);
    if (!this.chainInExecution) {
      return;
    }
    while (this.waitingToBeSent.head?.value.chainId === this.chainInExecution) {
      this.waitingToBeSent.shift();
    }
    this.chainInExecution = undefined;
  }
  flushAll(err) {
    RedisCommandsQueue.flushQueue(this.waitingForReply, err);
    RedisCommandsQueue.flushQueue(this.waitingToBeSent, err);
  }
}
)}

function _Parser(decoder,ReplyError,ParserError)
{
  var bufferPool = new ArrayBuffer(32 * 1024);
  var bufferOffset = 0;
  var interval = null;
  var counter = 0;
  var notDecreased = 0;

  /**
   * Used for integer numbers only
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|number}
   */
  function parseSimpleNumbers(parser) {
    const length = parser.buffer.byteLength - 1;
    var offset = parser.offset;
    var number = 0;
    var sign = 1;

    if (parser.buffer[offset] === 45) {
      sign = -1;
      offset++;
    }

    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        // \r\n
        parser.offset = offset + 1;
        return sign * number;
      }
      number = number * 10 + (c1 - 48);
    }
  }

  /**
   * Used for integer numbers in case of the returnNumbers option
   *
   * Reading the string as parts of n SMI is more efficient than
   * using a string directly.
   *
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|string}
   */
  function parseStringNumbers(parser) {
    const length = parser.buffer.byteLength - 1;
    var offset = parser.offset;
    var number = 0;
    var res = "";

    if (parser.buffer[offset] === 45) {
      res += "-";
      offset++;
    }

    while (offset < length) {
      var c1 = parser.buffer[offset++];
      if (c1 === 13) {
        // \r\n
        parser.offset = offset + 1;
        if (number !== 0) {
          res += number;
        }
        return res;
      } else if (number > 429496728) {
        res += number * 10 + (c1 - 48);
        number = 0;
      } else if (c1 === 48 && number === 0) {
        res += 0;
      } else {
        number = number * 10 + (c1 - 48);
      }
    }
  }

  /**
   * Parse a '+' redis simple string response but forward the offsets
   * onto convertBufferRange to generate a string.
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|string|Buffer}
   */
  function parseSimpleString(parser) {
    const start = parser.offset;
    const buffer = parser.buffer;
    const length = buffer.byteLength - 1;
    var offset = start;

    while (offset < length) {
      if (buffer[offset++] === 13) {
        // \r\n
        parser.offset = offset + 1;
        if (parser.optionReturnBuffers === true) {
          return parser.buffer.slice(start, offset - 1);
        } else {
          return decoder.decode(parser.buffer.subarray(start, offset - 1));
        }
      }
    }
  }

  /**
   * Returns the read length
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|number}
   */
  function parseLength(parser) {
    const length = parser.buffer.byteLength - 1;
    var offset = parser.offset;
    var number = 0;

    while (offset < length) {
      const c1 = parser.buffer[offset++];
      if (c1 === 13) {
        parser.offset = offset + 1;
        return number;
      }
      number = number * 10 + (c1 - 48);
    }
  }

  /**
   * Parse a ':' redis integer response
   *
   * If stringNumbers is activated the parser always returns numbers as string
   * This is important for big numbers (number > Math.pow(2, 53)) as js numbers
   * are 64bit floating point numbers with reduced precision
   *
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|number|string}
   */
  function parseInteger(parser) {
    if (parser.optionStringNumbers === true) {
      return parseStringNumbers(parser);
    }
    return parseSimpleNumbers(parser);
  }

  /**
   * Parse a '$' redis bulk string response
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|null|string}
   */
  function parseBulkString(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const offset = parser.offset + length;
    if (offset + 2 > parser.buffer.byteLength) {
      parser.bigStrSize = offset + 2;
      parser.totalChunkSize = parser.buffer.byteLength;
      parser.bufferCache.push(parser.buffer);
      return;
    }
    const start = parser.offset;
    parser.offset = offset + 2;
    if (parser.optionReturnBuffers === true) {
      return parser.buffer.slice(start, offset);
    } else {
      return decoder.decode(parser.buffer.subarray(start, offset));
    }
  }

  /**
   * Parse a '-' redis error response
   * @param {JavascriptRedisParser} parser
   * @returns {ReplyError}
   */
  function parseError(parser) {
    var string = parseSimpleString(parser);
    if (string !== undefined) {
      if (parser.optionReturnBuffers === true) {
        string = string.toString();
      }
      return new ReplyError(string);
    }
  }

  /**
   * Parsing error handler, resets parser buffer
   * @param {JavascriptRedisParser} parser
   * @param {number} type
   * @returns {undefined}
   */
  function handleError(parser, type) {
    const err = new ParserError(
      "Protocol error, got " +
        JSON.stringify(String.fromCharCode(type)) +
        " as reply type byte",
      JSON.stringify(parser.buffer),
      parser.offset
    );
    parser.buffer = null;
    parser.returnFatalError(err);
  }

  /**
   * Parse a '*' redis array response
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|null|any[]}
   */
  function parseArray(parser) {
    const length = parseLength(parser);
    if (length === undefined) {
      return;
    }
    if (length < 0) {
      return null;
    }
    const responses = new Array(length);
    return parseArrayElements(parser, responses, 0);
  }

  /**
   * Push a partly parsed array to the stack
   *
   * @param {JavascriptRedisParser} parser
   * @param {any[]} array
   * @param {number} pos
   * @returns {undefined}
   */
  function pushArrayCache(parser, array, pos) {
    parser.arrayCache.push(array);
    parser.arrayPos.push(pos);
  }

  /**
   * Parse chunked redis array response
   * @param {JavascriptRedisParser} parser
   * @returns {undefined|any[]}
   */
  function parseArrayChunks(parser) {
    const tmp = parser.arrayCache.pop();
    var pos = parser.arrayPos.pop();
    if (parser.arrayCache.length) {
      const res = parseArrayChunks(parser);
      if (res === undefined) {
        pushArrayCache(parser, tmp, pos);
        return;
      }
      tmp[pos++] = res;
    }
    return parseArrayElements(parser, tmp, pos);
  }

  /**
   * Parse redis array response elements
   * @param {JavascriptRedisParser} parser
   * @param {Array} responses
   * @param {number} i
   * @returns {undefined|null|any[]}
   */
  function parseArrayElements(parser, responses, i) {
    const bufferLength = parser.buffer.length;
    while (i < responses.length) {
      const offset = parser.offset;
      if (parser.offset >= bufferLength) {
        pushArrayCache(parser, responses, i);
        return;
      }
      const response = parseType(parser, parser.buffer[parser.offset++]);
      if (response === undefined) {
        if (!(parser.arrayCache.length || parser.bufferCache.length)) {
          parser.offset = offset;
        }
        pushArrayCache(parser, responses, i);
        return;
      }
      responses[i] = response;
      i++;
    }

    return responses;
  }

  /**
   * Called the appropriate parser for the specified type.
   *
   * 36: $
   * 43: +
   * 42: *
   * 58: :
   * 45: -
   *
   * @param {JavascriptRedisParser} parser
   * @param {number} type
   * @returns {*}
   */
  function parseType(parser, type) {
    switch (type) {
      case 36:
        return parseBulkString(parser);
      case 43:
        return parseSimpleString(parser);
      case 42:
        return parseArray(parser);
      case 58:
        return parseInteger(parser);
      case 45:
        return parseError(parser);
      default:
        return handleError(parser, type);
    }
  }

  /**
   * Decrease the bufferPool size over time
   *
   * Balance between increasing and decreasing the bufferPool.
   * Decrease the bufferPool by 10% by removing the first 10% of the current pool.
   * @returns {undefined}
   */
  function decreaseBufferPool() {
    if (bufferPool.byteLength > 50 * 1024) {
      if (counter === 1 || notDecreased > counter * 2) {
        const minSliceLen = Math.floor(bufferPool.byteLength / 10);
        const sliceLength =
          minSliceLen < bufferOffset ? bufferOffset : minSliceLen;
        bufferOffset = 0;
        bufferPool = bufferPool.slice(sliceLength, bufferPool.byteLength);
      } else {
        notDecreased++;
        counter--;
      }
    } else {
      clearInterval(interval);
      counter = 0;
      notDecreased = 0;
      interval = null;
    }
  }

  /**
   * Check if the requested size fits in the current bufferPool.
   * If it does not, reset and increase the bufferPool accordingly.
   *
   * @param {number} length
   * @returns {undefined}
   */
  function resizeBuffer(length) {
    if (bufferPool.byteLength < length + bufferOffset) {
      const multiplier = length > 1024 * 1024 * 75 ? 2 : 3;
      if (bufferOffset > 1024 * 1024 * 111) {
        bufferOffset = 1024 * 1024 * 50;
      }
      bufferPool = new Uint8Array(length * multiplier + bufferOffset);
      bufferOffset = 0;
      counter++;
      if (interval === null) {
        interval = setInterval(decreaseBufferPool, 50);
      }
    }
  }

  /**
   * Concat a bulk string containing multiple chunks
   *
   * Notes:
   * 1) The first chunk might contain the whole bulk string including the \r
   * 2) We are only safe to fully add up elements that are neither the first nor any of the last two elements
   *
   * @param {JavascriptRedisParser} parser
   * @returns {String}
   */
  function concatBulkString(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].toString("utf8", oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    var res = decoder.write(list[0].slice(oldOffset));
    for (var i = 1; i < chunks - 1; i++) {
      res += decoder.write(list[i]);
    }
    res += decoder.end(list[i].slice(0, offset - 2));
    return res;
  }

  /**
   * Concat the collected chunks from parser.bufferCache.
   *
   * Increases the bufferPool size beforehand if necessary.
   *
   * @param {JavascriptRedisParser} parser
   * @returns {Buffer}
   */
  function concatBulkBuffer(parser) {
    const list = parser.bufferCache;
    const oldOffset = parser.offset;
    const length = parser.bigStrSize - oldOffset - 2;
    var chunks = list.length;
    var offset = parser.bigStrSize - parser.totalChunkSize;
    parser.offset = offset;
    if (offset <= 2) {
      if (chunks === 2) {
        return list[0].slice(oldOffset, list[0].length + offset - 2);
      }
      chunks--;
      offset = list[list.length - 2].length + offset;
    }
    resizeBuffer(length);
    const start = bufferOffset;
    list[0].copy(bufferPool, start, oldOffset, list[0].length);
    bufferOffset += list[0].length - oldOffset;
    for (var i = 1; i < chunks - 1; i++) {
      list[i].copy(bufferPool, bufferOffset);
      bufferOffset += list[i].length;
    }
    list[i].copy(bufferPool, bufferOffset, 0, offset - 2);
    bufferOffset += offset - 2;
    return bufferPool.slice(start, bufferOffset);
  }

  class JavascriptRedisParser {
    /**
     * Javascript Redis Parser constructor
     * @param {{returnError: Function, returnReply: Function, returnFatalError?: Function, returnBuffers: boolean, stringNumbers: boolean }} options
     * @constructor
     */
    constructor(options) {
      if (!options) {
        throw new TypeError("Options are mandatory.");
      }
      if (
        typeof options.returnError !== "function" ||
        typeof options.returnReply !== "function"
      ) {
        throw new TypeError(
          "The returnReply and returnError options have to be functions."
        );
      }
      this.setReturnBuffers(!!options.returnBuffers);
      this.setStringNumbers(!!options.stringNumbers);
      this.returnError = options.returnError;
      this.returnFatalError = options.returnFatalError || options.returnError;
      this.returnReply = options.returnReply;
      this.reset();
    }

    /**
     * Reset the parser values to the initial state
     *
     * @returns {undefined}
     */
    reset() {
      this.offset = 0;
      this.buffer = null;
      this.bigStrSize = 0;
      this.totalChunkSize = 0;
      this.bufferCache = [];
      this.arrayCache = [];
      this.arrayPos = [];
    }

    /**
     * Set the returnBuffers option
     *
     * @param {boolean} returnBuffers
     * @returns {undefined}
     */
    setReturnBuffers(returnBuffers) {
      if (typeof returnBuffers !== "boolean") {
        throw new TypeError("The returnBuffers argument has to be a boolean");
      }
      this.optionReturnBuffers = returnBuffers;
    }

    /**
     * Set the stringNumbers option
     *
     * @param {boolean} stringNumbers
     * @returns {undefined}
     */
    setStringNumbers(stringNumbers) {
      if (typeof stringNumbers !== "boolean") {
        throw new TypeError("The stringNumbers argument has to be a boolean");
      }
      this.optionStringNumbers = stringNumbers;
    }

    /**
     * Parse the redis buffer
     * @param {Buffer} buffer
     * @returns {undefined}
     */
    execute(buffer) {
      buffer = new Uint8Array(buffer);
      if (this.buffer === null) {
        this.buffer = buffer;
        this.offset = 0;
      } else if (this.bigStrSize === 0) {
        const oldLength = this.buffer.byteLength;
        const remainingLength = oldLength - this.offset;
        const newBuffer = new Uint8Array(remainingLength + buffer.byteLength);

        // target, targetStart, sourceStart, sourceEnd
        // this.buffer.copy(newBuffer, 0, this.offset, oldLength);
        newBuffer.set(this.buffer.subarray(this.offset, oldLength), 0);
        // target, targetStart, sourceStart, sourceEnd
        // buffer.copy(newBuffer, remainingLength, 0, buffer.byteLength);
        newBuffer.set(buffer.subarray(0, buffer.byteLength), remainingLength);

        this.buffer = newBuffer;
        this.offset = 0;
        if (this.arrayCache.length) {
          const arr = parseArrayChunks(this);
          if (arr === undefined) {
            return;
          }
          this.returnReply(arr);
        }
      } else if (this.totalChunkSize + buffer.byteLength >= this.bigStrSize) {
        this.bufferCache.push(buffer);
        var tmp = this.optionReturnBuffers
          ? concatBulkBuffer(this)
          : concatBulkString(this);
        this.bigStrSize = 0;
        this.bufferCache = [];
        this.buffer = buffer;
        if (this.arrayCache.length) {
          this.arrayCache[0][this.arrayPos[0]++] = tmp;
          tmp = parseArrayChunks(this);
          if (tmp === undefined) {
            return;
          }
        }
        this.returnReply(tmp);
      } else {
        this.bufferCache.push(buffer);
        this.totalChunkSize += buffer.length;
        return;
      }

      while (this.offset < this.buffer.byteLength) {
        const offset = this.offset;
        const type = this.buffer[this.offset++];
        const response = parseType(this, type);
        if (response === undefined) {
          if (!(this.arrayCache.length || this.bufferCache.length)) {
            this.offset = offset;
          }
          return;
        }

        if (type === 45) {
          this.returnError(response);
        } else {
          this.returnReply(response);
        }
      }

      this.buffer = null;
    }
  }
  return JavascriptRedisParser;
}


function _21(md){return(
md`#### [redis-errors](https://github.com/NodeRedis/redis-errors)`
)}

function _RedisError(){return(
class RedisError extends Error {
  get name() {
    return this.constructor.name;
  }
}
)}

function _AbortError(RedisError){return(
class AbortError extends RedisError {
  get name() {
    return this.constructor.name;
  }
}
)}

function _InterruptError(AbortError){return(
class InterruptError extends AbortError {
  get name() {
    return this.constructor.name;
  }
}
)}

function _ReplyError(RedisError){return(
class ReplyError extends RedisError {
  constructor(message) {
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    super(message);
    Error.stackTraceLimit = tmp;
  }
  get name() {
    return this.constructor.name;
  }
}
)}

function _ParserError(RedisError){return(
class ParserError extends RedisError {
  constructor(message, buffer, offset) {
    const tmp = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    super(message);
    Error.stackTraceLimit = tmp;
    this.offset = offset;
    this.buffer = buffer;
  }

  get name() {
    return this.constructor.name;
  }
}
)}

function _27(md){return(
md`## Support`
)}

function _encoder(){return(
new TextEncoder()
)}

function _decoder(){return(
new TextDecoder()
)}

function _equal(){return(
function equal(buf1, buf2) {
  if (buf1.byteLength != buf2.byteLength) return false;
  for (var i = 0; i != buf1.byteLength; i++) {
    if (buf1[i] != buf2[i]) return false;
  }
  return true;
}
)}

function _31(md){return(
md`### Testing`
)}

async function _testing(footer)
{
  footer;
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


function _expect(testing){return(
testing.expect
)}

function _tests(testing){return(
testing.createSuite({
  name: "Redis Serialization Protocol Test Suite",
  timeout_ms: 1000
})
)}

function _rerun(Inputs){return(
Inputs.button("rerun tests")
)}

function _demoServer(){return(
{
  host: "redis.webcode.run",
  port: 443,
  tls: true
}
)}

function _client(rerun,createClient,demoServer){return(
rerun,
createClient({
  socket: demoServer
})
)}

function _blockClient(client,createClient,demoServer){return(
client,
createClient({
  socket: demoServer
})
)}

function _subClient(blockClient,createClient,demoServer){return(
blockClient,
createClient({
  socket: demoServer
})
)}

function _transClient(subClient,createClient,demoServer){return(
subClient,
createClient({
  socket: demoServer
})
)}

function _41(tests,createClient,expect){return(
tests.test(
  `createClient to non-existent server throws code 1006`,
  async (done) => {
    try {
      await createClient({ socket: { host: "localhost", port: 19999 } });
    } catch (err) {
      expect(err).toBe(1006);
      done();
    }
  }
)
)}

function _42(md){return(
md`### Basic commands`
)}

function _p(tests,client,expect){return(
tests.test(`sendCommand(["PING"]) returns 'PONG'`, async () => {
  const result = await client.sendCommand(["PING"]);
  expect(result).toBe("PONG");
})
)}

function _setKey(tests,client,expect){return(
tests.test(
  'sendCommand(["SET", "key", "value"]) returns "OK"',
  async () => {
    const result = await client.sendCommand(["SET", "key", "value"]);
    expect(result).toBe("OK");
  }
)
)}

function _b3(tests,setKey,client,expect){return(
tests.test('sendCommand(["GET", "key"]) returns foobar', async () => {
  setKey; // ensure setKey run first
  const result = await client.sendCommand(["GET", "key"]);
  expect(result).toBe("value");
})
)}

function _46(md){return(
md`### Pubsub`
)}

function _47(md){return(
md`subscribing to a topic switch the client to pub/sub mode (so you can't execute other commands) where messages on topics will be delivered to the client.`
)}

function _48(tests,subClient,expect,client){return(
tests.test(
  'subscribe("foo", listener) receives (message, foo)',
  async (done) => {
    await subClient.subscribe("foo", (message, channel) => {
      expect(message).toBe("bar");
      expect(channel).toBe("foo");
      done();
    });
    client.sendCommand(["PUBLISH", "foo", "bar"]);
  }
)
)}

function _49(md){return(
md`### Blocking`
)}

function _50(md){return(
md`BLPOP is a blocking left pop, it will take an element from a list, blocking until the list fills with an element if necessary. `
)}

function _51(tests,blockClient,client,expect){return(
tests.test("BLPOP blocks until RPUSH", async () => {
  const result = blockClient.sendCommand(["BLPOP", "list0", "0"]);
  client.sendCommand(["LPUSH", "list0", "v1"]);
  expect(await result).toEqual(["list0", "v1"]);
})
)}

function _52(md){return(
md`### Transactions`
)}

function _53(md){return(
md`MULTI/EXEC blocks will execute intermediate commands atomically. This is a very important foundational semantic of Redis. `
)}

function _multi1(tests,transClient,expect){return(
tests.test("MULTI/EXEC block", async () => {
  transClient.sendCommand(["MULTI"]);
  transClient.sendCommand(["SET", "k0", "v0"]);
  transClient.sendCommand(["SET", "k1", "v0"]);
  const result = await transClient.sendCommand(["EXEC"]);
  expect(result).toEqual(["OK", "OK"]);
})
)}

function _55(md){return(
md`WATCH combines with MULTI/EXEC to guaranteed pin key values, allowing read/modify/write transactions.`
)}

function _56(tests,multi1,transClient,expect){return(
tests.test("WATCH atomic increment", async () => {
  multi1;
  transClient.sendCommand(["WATCH", "k1"]);
  const v = transClient.sendCommand(["GET", "k1"]);
  transClient.sendCommand(["MULTI"]);
  transClient.sendCommand(["SET", "k1", Number.parseInt(await v) + 1 + ""]);
  const result = await transClient.sendCommand(["EXEC"]);
  expect(result).toEqual(["OK"]);
})
)}

function _59(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["redis.png",new URL("./files/f2e998f5d962cffa4b289f4d7c272aaaf390db875a4e6fb75ecd68f6787b10ca040ac26101042cf8a177cd8e492a75c040fd6b5089811e0c8a0b432bbcf80644",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","width"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["tweet"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("createClient")).define("createClient", ["RedisCommandsQueue","encodeCommand","C"], _createClient);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("encodeCommand")).define("encodeCommand", ["encoder"], _encodeCommand);
  main.variable(observer("parseURL")).define("parseURL", _parseURL);
  main.variable(observer("C")).define("C", ["encoder"], _C);
  main.variable(observer("RedisCommandsQueue")).define("RedisCommandsQueue", ["decoder","Parser","equal","C","AbortError"], _RedisCommandsQueue);
  main.variable(observer("Parser")).define("Parser", ["decoder","ReplyError","ParserError"], _Parser);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("RedisError")).define("RedisError", _RedisError);
  main.variable(observer("AbortError")).define("AbortError", ["RedisError"], _AbortError);
  main.variable(observer("InterruptError")).define("InterruptError", ["AbortError"], _InterruptError);
  main.variable(observer("ReplyError")).define("ReplyError", ["RedisError"], _ReplyError);
  main.variable(observer("ParserError")).define("ParserError", ["RedisError"], _ParserError);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("encoder")).define("encoder", _encoder);
  main.variable(observer("decoder")).define("decoder", _decoder);
  main.variable(observer("equal")).define("equal", _equal);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("testing")).define("testing", ["footer"], _testing);
  main.variable(observer("expect")).define("expect", ["testing"], _expect);
  main.variable(observer("viewof tests")).define("viewof tests", ["testing"], _tests);
  main.variable(observer("tests")).define("tests", ["Generators", "viewof tests"], (G, _) => G.input(_));
  main.variable(observer("viewof rerun")).define("viewof rerun", ["Inputs"], _rerun);
  main.variable(observer("rerun")).define("rerun", ["Generators", "viewof rerun"], (G, _) => G.input(_));
  main.variable(observer("demoServer")).define("demoServer", _demoServer);
  main.variable(observer("client")).define("client", ["rerun","createClient","demoServer"], _client);
  main.variable(observer("blockClient")).define("blockClient", ["client","createClient","demoServer"], _blockClient);
  main.variable(observer("subClient")).define("subClient", ["blockClient","createClient","demoServer"], _subClient);
  main.variable(observer("transClient")).define("transClient", ["subClient","createClient","demoServer"], _transClient);
  main.variable(observer()).define(["tests","createClient","expect"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("p")).define("p", ["tests","client","expect"], _p);
  main.variable(observer("setKey")).define("setKey", ["tests","client","expect"], _setKey);
  main.variable(observer("b3")).define("b3", ["tests","setKey","client","expect"], _b3);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["tests","subClient","expect","client"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["tests","blockClient","client","expect"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("multi1")).define("multi1", ["tests","transClient","expect"], _multi1);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["tests","multi1","transClient","expect"], _56);
  const child1 = runtime.module(define1);
  main.import("tweet", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _59);
  return main;
}
