import define1 from "./6eda90668ae03044@836.js";
import define2 from "./048a17a165be198d@264.js";
import define3 from "./03218555ea68a856@467.js";
import define4 from "./f92778131fd76559@1174.js";
import define5 from "./9bed702f80a3797e@402.js";
import define6 from "./bb2055d580bbbab2@106.js";
import define7 from "./dfdb38d5580b5c35@334.js";

function _1(md){return(
md`# [Firebase Realtime Database](https://firebase.google.com/docs/database) Wire Protocol Explorer

Google kindly open sourced the Firebase Client SDKs, but there is no open source server implementation! This notebook is step 1 to remedying that omission by **documenting the wire protocol**.

In this *interactive* notebook, we instrument the [Realtime Database](https://firebase.google.com/docs/database) client, and create a number of repeatable in-browser experiments to understand the wire protocol. We then confirm our understanding by **bringing up our own Fake Realtime Database Server**, and connecting it to an unmodified SDK.`
)}

function _2(md){return(
md`🚀 *update 2022-04-29: a prototype Firebase compatible server can found [here](https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1)* 🚀`
)}

function _3(md){return(
md`🍾 This work was presented at [HYTRADBOI conference](https://www.hytradboi.com/2022/creating-a-wire-compatible-firebase-realtime-database-substitute)`
)}

function _4(width,htl){return(
htl.html`<iframe width="${Math.min(720, width)}" height="315" src="https://www.youtube.com/embed/rZby8_Cr9aE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _5(toc){return(
toc()
)}

function _6(tweet,md){return(
md`## But Why?

Building a [causally consistent](https://en.wikipedia.org/wiki/Causal_consistency), latency compensated, local persistence backed sync protocol is *hard*. There have been a few different attempts since Firebase, for example, *[replicache](https://replicache.dev/)*, *[supabase](https://supabase.com/)*, *[appwrite](https://appwrite.io/)*, but they all miss various important features which makes them only partial replacements. Luckily, the major engineering is in the client, which has been MIT licensed, so let's leverage that to build a true, wire-compatible substitution. 

Also, since Firebase SDK version 9, the SDK has been modularized, so now we are at quite a nice position where we can depend on just the production Realtime Database SDK and swap its upstream server, without accidentally including any Google specific services. I prefer the RTDB over Firestore, it has a lower latency and faster startup time due to technology choice, and while it hasn't much query expressivity, it's a high performance replicated Key-Value store so it's an excellent primitive to build upon.

As you will see in this notebook, the core Realtime Database sync protocol is pretty simple. I hope that by demonstrating how easy it is to substitute your own server that interested you will see an open source server is not a huge undertaking. Follow along at:

${tweet('1471850731032485896')}
`
)}

function _7(md){return(
md`### Related work

In an earlier work I wrote a serverless [IndieAuth Oauth 2.0 notebook](https://observablehq.com/@endpointservices/auth) capable to minting Custom Firebase Auth tokens. These projects will hopefully combine.

I created [webcode.run](https://webcode.run) to make building serious infrastructure in public web notebooks possible.`
)}

function _8(md){return(
md`### About me

I worked on the Firebase Realtime Database from 2014 to 2018. I am careful to only use information derived from public sources, including the realtime databases SDKs own logging, and the MIT licensed source code hosted on Github.

I am part of the [SDIAlliance](https://sdialliance.org/) technical steering board with the mission of delivering a sustainable digital infrastructure for Europe. My working hypothesis is that trust in digital services has broken down due to lack of transparency and auditability, so now I am on a mission trying to build secure systems that operate in the open, *by design*, e.g. from public notebook source code.`
)}

function _9(md){return(
md`## Firebase Realtime Database Protocol Sources

- Urish reversed engineered the wire protocol once and make a testing server https://github.com/urish/firebase-server
- The [client source code is public](https://github.com/firebase/firebase-js-sdk/blob/master/packages/database/src/core/ServerActions.ts)
- The SDK will emit protocol information when you call "enableLogging"
- Your Browser developer tools will log the unencrypted network requests. `
)}

function _10(tweet){return(
tweet("1506214338503364613")
)}

function _11(md){return(
md`## How to use this Notebook

When you enable logging (below), there will be a readout of the Realtime database SDK's [logging](https://firebase.google.com/docs/reference/node/firebase.database#enablelogging) output. This provides a high level description of messages exchanged over the wire protocol. The notebook contains buttons that when pressed, will call SDK methods. The aim of the notebook is to understand how the client SDK communicates with the server.
`
)}

async function _12(FileAttachment,width,md){return(
md`
While the logging is extremely useful, to understand the low level details you need to open DevTools and inspect the messages in the *network* tab. By unticking "websocket" and refreshing the webpage, you can force the SDK to use a *longpolling* transport fallback, which uses a remote HTTP endpointpoint prefixed by \`.lp/\`

${await FileAttachment("image.png").image({width: Math.min(width, 620)})}

In the first half of the notebook we probe an **reference** Firebase SDK pointing to a normal Firebase project. 
In the second half we initialize a **fake** Firebase server and configure a Firebase SDK to point to that instead. To my delight, no source modifications of the client are required to point it at a 3rd party server implementation.
`
)}

function _showOverlay(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.toggle({ label: "show SDK logging?" }),
  localStorageView("logger")
)
)}

function _14(md){return(
md`## Common Code`
)}

function _app(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js")
)}

function _auth(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js")
)}

async function _rtdb(toggleWebsockets){return(
toggleWebsockets,
await import("https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js")
)}

function _18(md){return(
md`## Reference Firebase Server

The reference Firebase is wired to a normal Firebase project.`
)}

function _initializeGate(buttonGate){return(
buttonGate("ref initializeApp")
)}

function _referenceApp(initializeGate,rtdb,app){return(
initializeGate,
rtdb,
app.initializeApp(
  {
    /* apiKey & authDomain required for authentication, but you can talk to an RTDB unathenticated without these */
    apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
    authDomain: "larkworthy-dfb11.firebaseapp.com",
    databaseURL:
      "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app"
    // "https://s-euw1b-nss-205.europe-west1.firebasedatabase.app?ns=larkworthy-dfb11-default-rtdb"
  },
  "reference"
)
)}

function _21(md){return(
md`### CONNECT/REPORT_STATS`
)}

function _referenceDatabase(rtdb,$0,Event,referenceApp)
{
  rtdb.enableLogging((log) => {
    $0.value = $0.value + "\n" + log;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return rtdb.getDatabase(referenceApp);
}


function _refRoot(rtdb,referenceDatabase){return(
rtdb.ref(referenceDatabase, "/")
)}

function _24(md){return(
md`When an app is initialized, and a reference to the database is made, three major things happen in sequence.

1. A connection is negotiated
2. A disconnect channel is setup.
3. The SDK reports stats (which seems to be just be which SDK version is in use)

The logs show some of this, but you need to look at the network tab to really see what is happening.

~~~
p:0: Browser went online. 
p:0: Making a connection attempt 
getToken() completed. Creating connection. 
c:0:0: Connection created 
c:0:0:0 Connecting via long-poll to https://s-euw1b-nss-200.europe-west1.firebasedatabase.app/.lp?start=t&ser=71903273&cb=1&v=5&ns=larkworthy-dfb11-default-rtdb 
c:0:0: Realtime connection established. 
p:0: connection ready 
p:0: reportStats {"c":{"sdk.js.9-5-0":1}} 
p:0: {"r":1,"a":"s","b":{"c":{"sdk.js.9-5-0":1}}} 
c:0:0: Primary connection is healthy. 
p:0: from server: {"r":1,"b":{"s":"ok","d":""}} 
~~~

`
)}

function _25(md){return(
md`#### Initial handshake

Our freshly initialized client (configured for longpolling) first makes a HTTP request to 
\`\`\`
https://s-euw1b-nss-202.europe-west1.firebasedatabase.app/.lp?start=t&ser=63492315&cb=1&v=5&p=1:1986724398:web:9b8bc33895b45dd2e095bf&ns=endpointservice-eu
\`\`\`

Here is the meaning of each part of the URL ([source](https://github.com/firebase/firebase-js-sdk/blob/fb3e35965b23f88e318dd877fabade16cdcb6385/packages/database/src/realtime/Constants.ts#L18))

| URL  | meaning |
|-------------|-------|
| s-euw1b-nss-202.europe-west1.firebasedatabase.app      | Host server location (GCP region \`europe-west1\`)  |
| /.lp     | longpoll endpoint    |
| cb=...     | callback suffix   |
| ser=...     | cache buster    |
| v=5     | VERSION_PARAM    |
| p     | APPLICATION_ID_PARAM    |
| ns     | namespace, the database name    |



The server responds by setting up two [JSONP](https://en.wikipedia.org/wiki/JSONP#:~:text=JSONP%2C%20or%20JSON%2DP%20(,by%20Bob%20Ippolito%20in%202005.) callbacks, one for stream control and one for data messages. JSONP is an old technique for cross-origin communication that works with very old browsers (remember that the longpolling transport is a fallback for when websockets are not detected)

\`\`\`js
function pLPCommand(c, a1, a2, a3, a4) {
  parent.window["pLPCommand1"] && parent.window["pLPCommand1"](c, a1, a2, a3, a4);
}
function pRTLPCB(pN, data) {
  parent.window["pRTLPCB1"] && parent.window["pRTLPCB1"](pN, data);
}
pLPCommand('start','5124373','WQLLoCT4we');
pRTLPCB(0,[{"t":"c","d":{"t":"h","d":{
  "ts":1638559030693,"v":"5",
  "h":"s-euw1b-nss-202.europe-west1.firebasedatabase.app",
  "s":"CellW7myawI0dIl4X4u9szYUYDyg6AWx"
}}}]);
\`\`\`

The actual number in the literals, like pLPCommand1, is matched to the cb parameter. Thus a client is able to hold multiple longpoll channels open (e.g. for multiple apps) by assigning each a unique ID.

The server sends two messages immediately.

First, a command message to start the stream which sets an ID and password (
[source](https://github.com/firebase/firebase-js-sdk/blob/fb3e35965b23f88e318dd877fabade16cdcb6385/packages/database/src/realtime/BrowserPollConnection.ts#L171)).

\`\`\`
pLPCommand('start', ID, PASSWORD)
\`\`\`

Second, the [SERVER_HELLO](https://github.com/firebase/firebase-js-sdk/blob/fb3e35965b23f88e318dd877fabade16cdcb6385/packages/database/src/realtime/Connection.ts#L62) packet which includes a server provided timestamp that completes the [handshake](https://github.com/firebase/firebase-js-sdk/blob/fb3e35965b23f88e318dd877fabade16cdcb6385/packages/database/src/realtime/Connection.ts#L378).

Once these messages are processed the logging considers the connection 'healthy'
`
)}

function _26(md){return(
md`#### Page unload handler

The clients now communicates with the server using the provided ID and password, and requests a disconnect SCRIPT 

~~~
https://s-euw1b-nss-200.europe-west1.firebasedatabase.app/.lp?dframe=t&id=228625&pw=JjiEOkOhrA&ns=larkworthy-dfb11-default-rtdb
~~~

To which the server responses with HTML 

~~~
<html><body><script>
  function EnvSendPing(destURL) {
  try{
  var xhr=new XMLHttpRequest();
  xhr.open("GET", destURL, false);
  xhr.send(null);
  } catch (e) { }
  }
  function EnvDisconnect() {
  EnvSendPing("/.lp?disconn=t&id=432432&pw=fdkjfdlksfjs");
  }
  if(window.addEventListener)
  window.addEventListener('unload',EnvDisconnect,false);
  else if(window.attachEvent)
  window.attachEvent('onunload',EnvDisconnect);
  </script></body></html>
~~~

You can see if that script is unloaded (i.e. page closed), the client will send a message to the server first.
`
)}

function _27(md){return(
md`#### REPORT_STATS

The client send its SDK version to the server after connecting. This looks like an outbound requests

~~~
https://s-euw1b-nss-209.europe-west1.firebasedatabase.app/.lp?
  id=28078&pw=QoaXoLj7Nf&
  ser=50262031&
  ns=larkworthy-dfb11-default-rtdb&
  seg0=0&
  ts0=1&
  d0=eyJ0IjoiZCIsImQiOnsiciI6MSwiYSI6InMiLCJiIjp7ImMiOnsic2RrLmpzLjktNS0wIjoxfX19fQ..
~~~

The server responds with 
~~~js
pRTLPCB(2,[{"t":"d","d":{"r":1,"b":{"s":"ok","d":""}}}]);
~~~

To understand the outbound request we need to look at the source code. We will now attempt to explain the message framing that is common to messages after the initial handshake.`
)}

function _28(md){return(
md`### Outbound Data Message Framing

A long poll is a vanilla HTTP GET request, and is the only client -> server transport. As a database, the client will sometimes need to send up to 1MB of data, but this exceeds the capacity of a URL. So, an outbound request is chunked into "segments", which is what "seg0 ts0 and d0" encode ([source](https://github.com/firebase/firebase-js-sdk/blob/fb3e35965b23f88e318dd877fabade16cdcb6385/packages/database/src/realtime/BrowserPollConnection.ts#L625)). \`d<num>\` is the data portion, which is URL safe base64 encoded. When the d0 parameter above is decoded it turns out to be JSON

\`\`\`
{"t":"d","d":{"r":1,"a":"s","b":{"c":{"sdk.js.9-5-0":1}}}}
\`\`\`

<aside style="background-color: yellow; padding: 10px">
  ⚠️ multiple commands are batched by the client by using d1 and higher
</aside>

The first d object matches what is printed in the logs! The outer \`"t":"d"\` seems to denote "data" message (instead of a control message) and is not printed in the logs. The inner \`"d":{"r":1,"a":"s","b":{"c":{"sdk.js.9-5-0":1}}}\` is a wire protocol data massage.

By looking at the source we can figure out meaningful names. The first set of objects are a common message envelope.

| property | meaning     | VALUE  | meaning      |
|----------|-------------|--------|--------------|
| r        | REQUEST_SEQ | number |              |
| a        | ACTION      | s      | REPORT_STATS |
| b        | BODY        | JSON   | depends on a |

The r number is auto incremented by the client so messages can be decoded in order server side.

The a is the ACTION, in this case, REPORT_STATS, which is encoding what type of event the client is sending. The BODY is any associated data with the ACTION, for reporting stats the client send its SDK version under a property 'c'.
`
)}

function _29(md){return(
md`### Inbound Data Message Framing

Most outbound commands returned data or need acknowledgement. The server will send back something like

~~~js
pRTLPCB(2,[{"t":"d","d":{"r":1,"b":{"s":"ok","d":""}}}]);
~~~

This is a JSONP response. The first number '\`2\`' is the message sequence number. The client orders returned packets by this number ([source](https://github.com/firebase/firebase-js-sdk/blob/7354a0ed438f4e3df6577e4927e8c8f8f1fbbfda/packages/database/src/realtime/polling/PacketReceiver.ts#L20)) before processing. Note these features means the long poll transport is a bidi ordered transport like a websocket. The websocket does not need these features as its naive to the transport.

We then have a message envelope

| property | meaning     | VALUE  | meaning      |
|----------|-------------|--------|--------------|
| t        | TYPE        | d      | DATA |
|          |        | t      | CONTROL |
| d        | DATA        | JSON   | the message |

And then the actual message

| property | meaning     | VALUE  | meaning      |
|----------|-------------|--------|--------------|
| r        | RESPOSNE_NUM | number |              |
| b        | BODY        | JSON   | depends what is being responded to |

The message is similar to an outbound messages, except there is no action. The r is used to match a message to the outbound request, so the action is implied by the outbound request that triggered it.

Often the body is of the form "s" for status (e.g. "OK"), "d" for data.`
)}

function _30(md){return(
md`### GET

GET, action, "a", code "g". The client sends a path "p", and optionally a query filter "q".

\`\`\`
p:0: {"r":6,"a":"g","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer/rw","q":{}}} 
\`\`\`

The server responds with the status, "s", and if the GET is successful, the data, "d", as a JSON

\`\`\`
p:0: from server: {"r":6,"b":{"s":"ok","d":"hi"}}
\`\`\``
)}

function _refGetOk(buttonGate){return(
buttonGate("ref.get('/...') ok")
)}

async function _32(refGetOk,rtdb,refRoot){return(
refGetOk,
(
  await rtdb.get(
    rtdb.child(refRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw")
  )
).val()
)}

function _refGetDenied(buttonGate){return(
buttonGate("ref.get('/..') permission_denied")
)}

function _34(md){return(
md`If the a GET cannot be executed it is returned as status "permission_denied"

\`\`\`
p:0: from server: {"r":7,"b":{"s":"permission_denied","d":"Permission denied"}} 
\`\`\``
)}

function _35(refGetDenied,rtdb,refRoot){return(
refGetDenied, rtdb.get(rtdb.child(refRoot, "subpath"))
)}

function _36(md){return(
md`### PUT`
)}

function _37(md){return(
md`PUT, action "a" code "p", places the data "d" at the path "p"
\`\`\`
p:0: {"r":7,"a":"p","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer/rw","d":"hi"}} 
\`\`\`
The server response with the status "s" and no data "d"
\`\`\`
p:0: from server: {"r":7,"b":{"s":"ok","d":""}} 
\`\`\``
)}

function _refSetSuccess(buttonGate){return(
buttonGate("ref.set('/...') success")
)}

function _39(refSetSuccess,rtdb,refRoot){return(
refSetSuccess,
rtdb.set(rtdb.child(refRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw"), "hi")
)}

function _40(md){return(
md`### MERGE`
)}

function _41(md){return(
md`A MERGE, action "a" code "m", takes a root path "p", and mixes in data payload.

\`\`\`
p:0: {"r":2,"a":"m","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer","d":{"rw":"hi"}}}
\`\`\`
The server repsonds with the status and no data.
\`\`\`
p:0: from server: {"r":2,"b":{"s":"ok","d":""}} 
\`\`\`

a:m > action: merge`
)}

function _refPatchSuccess(buttonGate){return(
buttonGate("ref.update('/...') success")
)}

function _43(refPatchSuccess,rtdb,refRoot){return(
refPatchSuccess,
rtdb.update(rtdb.child(refRoot, "@tomlarkworthy/rtdb-protocol-explorer"), {
  rw: "hi"
})
)}

function _44(md){return(
md`### LISTEN/QUERY

Listen, action code "l" or query, action code "q" are the more complex because often multiple messages need to be send for a single. When a LISTEN is attached,the server first sends the data, and then responds ok against the original request.

`
)}

function _refOnValueSuccess(buttonGate){return(
buttonGate("ref.onValue('...')")
)}

function _46(Generators,refOnValueSuccess,rtdb,refRoot){return(
Generators.observe((notify) => {
  refOnValueSuccess,
    rtdb.onValue(
      rtdb.child(refRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw"),
      (snap) => {
        notify(snap.val());
      }
    );
})
)}

function _47(md){return(
md`\`\`\`
p:0: Listen called for /@tomlarkworthy/rtdb-protocol-explorer/rw default 
p:0: Listen on /@tomlarkworthy/rtdb-protocol-explorer/rw for default 
p:0: {"r":2,"a":"q","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer/rw","h":""}} 
p:0: handleServerMessage d {"p":"@tomlarkworthy/rtdb-protocol-explorer/rw","d":"hi"} 
event: /@tomlarkworthy/rtdb-protocol-explorer/rw:value:"hi" 
p:0: from server: {"r":2,"b":{"s":"ok","d":{}}} 
p:0: listen response {"s":"ok","d":{}} 
\`\`\`
client issues
\`\`\`
https://s-euw1b-nss-209.europe-west1.firebasedatabase.app/.lp?id=9751&pw=BglKoMFz30&ser=60177916&ns=larkworthy-dfb11-default-rtdb&seg0=1&ts0=1&d0=eyJ0IjoiZCIsImQiOnsiciI6MiwiYSI6InEiLCJiIjp7InAiOiIvQHRvbWxhcmt3b3J0aHkvcnRkYi1wcm90b2NvbC1leHBsb3Jlci9ydyIsImgiOiIifX19
\`\`\`
the payload decodes to 
\`\`\`
{"t":"d","d":{"r":2,"a":"q","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer/rw","h":""}}}
\`\`\`


Server respondes
\`\`\`
pRTLPCB(4,[{"t":"d","d":{"b":{"p":"@tomlarkworthy/rtdb-protocol-explorer/rw","d":"hi"},"a":"d"}}]);
\`\`\`
Client then sends
\`\`\`
https://s-euw1b-nss-209.europe-west1.firebasedatabase.app/.lp?id=9751&pw=BglKoMFz30&ser=60177917&ns=larkworthy-dfb11-default-rtdb
\`\`\`

Server responds
\`\`\`
pRTLPCB(5,[{"t":"d","d":{"r":2,"b":{"s":"ok","d":{}}}}]);
\`\`\`

Client follows up with 
\`\`\`
https://s-euw1b-nss-209.europe-west1.firebasedatabase.app/.lp?id=9751&pw=BglKoMFz30&ser=60177918&ns=larkworthy-dfb11-default-rtdb
\`\`\`

So, after requesting a listen, the server sends all the data, and responds OK when the client has received the initial data set.`
)}

function _48(md){return(
md`### UNLISTEN

UNLISTEN is action "a" code "n", which requires a path "p". The server will acknowledge.
~~~
p:0: Unlisten on /@tomlarkworthy/rtdb-protocol-explorer/rw for default 
p:0: {"r":4,"a":"n","b":{"p":"/@tomlarkworthy/rtdb-protocol-explorer/rw"}} 
p:0: from server: {"r":4,"b":{"s":"ok","d":""}}
~~~`
)}

function _refOff(buttonGate){return(
buttonGate("ref.off('...')")
)}

function _50(refOff,rtdb,refRoot){return(
refOff,
rtdb.off(rtdb.child(refRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw"))
)}

function _51(md){return(
md`### DISCONNECT`
)}

function _52(Inputs,rtdb,referenceDatabase){return(
Inputs.button("goOffline", {
  reduce: () => rtdb.goOffline(referenceDatabase)
})
)}

function _53(md){return(
md`\`\`\`
Interrupting connection for reason: repo_interrupt 
c:0:0: Closing realtime connection. 
c:0:0: Shutting down all connections 
c:0:0:0 Longpoll is being closed. 
p:0: data client disconnected 
0: onDisconnectEvents 
\`\`\``
)}

function _54(md){return(
md`### AUTH

AUTH, action "a" code "auth" sends a signed [JWT access_token](https://datatracker.ietf.org/doc/html/rfc7519) to the server for use with authentication rules.`
)}

function _refSignIn(buttonGate){return(
buttonGate("ref.signInAnonymously")
)}

async function _56(refSignIn,auth,referenceApp){return(
refSignIn, auth.signInAnonymously(await auth.getAuth(referenceApp))
)}

function _57(md){return(
md`\`\`\`
p:0: {"r":2,"a":"auth","b":{"cred":"eyJ...tAg"}} 
p:0: from server: {"r":1,"b":{"s":"ok","d":""}} 
\`\`\`

The decoded token payload looks something like 
\`\`\`
{
  "provider_id": "anonymous",
  "iss": "https://securetoken.google.com/larkworthy-dfb11",
  "aud": "larkworthy-dfb11",
  "auth_time": 1639411696,
  "user_id": "NIZX38015decs0zX2LMLXezgPQN2",
  "sub": "NIZX38015decs0zX2LMLXezgPQN2",
  "iat": 1639411696,
  "exp": 1639415296,
  "firebase": {
    "identities": {},
    "sign_in_provider": "anonymous"
  }
}
\`\`\``
)}

function _58(md){return(
md`### UNAUTH

UNAUTH is action "a" code "unath", no data is sent`
)}

function _59(md){return(
md`\`\`\`
p:0: {"r":3,"a":"unauth","b":{}} 
p:0: from server: {"r":3,"b":{"s":"ok","d":"unauthenticated"}} 
\`\`\``
)}

function _refSignOut(buttonGate){return(
buttonGate("ref.signOut")
)}

async function _61(refSignOut,auth,referenceApp){return(
refSignOut, auth.signOut(await auth.getAuth(referenceApp))
)}

function _62(md){return(
md`## Fake Realtime Database Server

In this section we create a server endpoint capable of replying to an unmodified client.

<mark>Note</mark> For webcode live coding to work (which is extremely helpful as you can breakpoint the server), you need websockets *turned on* in the log overlay.

<mark>Note</mark> Only the notebook owner can do live coding, but this notebook is forkable. After forking and logging into the server, you should should be able enable live coding and set DevTools debugging breakpoints with "debugger" in the server source code. You may need to refresh the page after the URL changes.`
)}

function _63(endpoint)
{
  // State to carry between requests
  const connections = {};

  return endpoint("longpoll", async (req, res) => {
    debugger;
    const callbackId = req.query.cb;
    if (req.query.start) {
      // New session initialized
      const cid = Math.random().toString(16).substring(3);

      connections[cid] = {
        responseId: 0,
        sessionId: Math.random().toString(16).substring(3),
        password: Math.random().toString(16).substring(3),
        active: null,
        forClient: []
      };

      res.header("content-type", "application/javascript");
      res.send(`
  function pLPCommand(c, a1, a2, a3, a4) {
  parent.window["pLPCommand${callbackId}"] && parent.window["pLPCommand${callbackId}"](c, a1, a2, a3, a4);
  }
  function pRTLPCB(pN, data) {
  parent.window["pRTLPCB${callbackId}"] && parent.window["pRTLPCB${callbackId}"](pN, data);
  }
  pLPCommand('start','${cid}','${connections[cid].password}')
  pRTLPCB(${connections[cid].responseId++},${JSON.stringify([
        {
          t: "c",
          d: {
            t: "h",
            d: {
              ts: Date.now(),
              v: "5",
              h: "webcode.run",
              s: connections[cid].sessionId
            }
          }
        }
      ])})`);
    } else if (req.query.dframe) {
      res.header("content-type", "text/html");
      res.send(`<html><body><script>
  function EnvSendPing(destURL) {
  try{
  var xhr=new XMLHttpRequest();
  xhr.open("GET", destURL, false);
  xhr.send(null);
  } catch (e) { }
  }
  function EnvDisconnect() {
  EnvSendPing("/.lp?disconn=t&id=${req.query.id}&pw=${req.query.pw}");
  }
  if(window.addEventListener)
  window.addEventListener('unload',EnvDisconnect,false);
  else if(window.attachEvent)
  window.attachEvent('onunload',EnvDisconnect);
  </script></body></html>`);
    } else {
      const connection = connections[req.query.id];
      // If there is an existing long poll close the previous
      if (connection.active) {
        connection.active.send(`pRTLPCB(${connection.responseId++},[])`);
        connection.active = null;
      }
      res.header("content-type", "application/javascript");

      if (req.query.d0) {
        debugger;
        const data = JSON.parse(atob(req.query.d0.replaceAll(".", "=")));
        if (data.d.a === "g") {
          const path = data.d.b.p;
          let body;
          if (path === "/")
            body = { s: "permission_denied", d: "Permission denied" };
          if (path === "/@tomlarkworthy/rtdb-protocol-explorer/rw")
            body = { s: "ok", d: "hi!" };

          // Action: GET
          res.send(
            `pRTLPCB(${connection.responseId++},${JSON.stringify([
              {
                t: "d",
                d: {
                  r: data.d.r,
                  b: body
                }
              }
            ])});`
          );
        } else if (data.d.a === "q") {
          // Actions: Listen/Query
          // Initial data update sent immediately
          res.send(
            `pRTLPCB(${connection.responseId++},${JSON.stringify([
              {
                t: "d",
                d: {
                  a: "d", // data action
                  b: {
                    p: "@tomlarkworthy/rtdb-protocol-explorer/rw",
                    d: "hi!"
                  }
                }
              }
            ])});`
          );
          // Follow up with a OK to the listen
          connection.forClient.push(
            `pRTLPCB(${connection.responseId++},${JSON.stringify([
              { t: "d", d: { r: data.d.r, b: { s: "ok", d: "" } } }
            ])});`
          );
        } else if (data.d.a === "s") {
          // Actions: Stats
          res.send(
            `pRTLPCB(${connection.responseId++},${JSON.stringify([
              { t: "d", d: { r: data.d.r, b: { s: "ok", d: "" } } }
            ])});`
          );
        }
      } else {
        if (connection.forClient.length > 0) {
          res.send(connection.forClient.shift());
        } else {
          connection.active = res;
        }
      }
    }
  });
}


function _64(md){return(
md`### Configuring a vanilla SDK to a 3rd party server`
)}

function _65(md){return(
md`There are a few ways the SDK decodes the Database URL. You can include an "ns" parameter for instance ([source](https://github.com/firebase/firebase-js-sdk/blob/f5a17143b1930b7b7b45d431ad21f50b236e4f80/packages/database/src/core/util/libs/parser.ts#L176)).

We use the ns parameter to route the inbound long poll connections to a webcode endpoint hosted on [Observable](https://observablehq.com) (handler [source](https://github.com/endpointservices/webcode.run/blob/ec897913df5b3507910a329f91fce1cb042e2e6d/rtdb.mjs#L3))
`
)}

function _THIS_NOTEBOOK(html){return(
/(@|d)[^/]*\/[^/#?]*/.exec(html`<a href="#">`.href)[0]
)}

function _FAKE_SERVER_URL(THIS_NOTEBOOK){return(
`https://webcode.run?ns=${THIS_NOTEBOOK.replace(
  "@",
  ""
).replace("/", "|")};longpoll`
)}

function _initializeFakeGate(buttonGate){return(
buttonGate("initialize Fake Firebase Client")
)}

function _fakeApp(initializeFakeGate,app,FAKE_SERVER_URL){return(
initializeFakeGate,
console.log("initialize fake app"),
app.initializeApp(
  {
    databaseURL: FAKE_SERVER_URL
  },
  Math.random().toString(16) // We randomize the name so we can rerun initialization
)
)}

function _70(md){return(
md`### CONNECT/REPORT_STATS`
)}

function _fakeDatabase(rtdb,$0,Event,fakeApp)
{
  rtdb.enableLogging((log) => {
    $0.value = $0.value + "\n" + log;
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return rtdb.getDatabase(fakeApp);
}


function _fakeRoot(rtdb,fakeDatabase){return(
rtdb.ref(fakeDatabase, "/")
)}

function _73(Inputs,rtdb,fakeDatabase){return(
Inputs.button("goOffline()", {
  reduce: () => rtdb.goOffline(fakeDatabase)
})
)}

function _74(md){return(
md`### GET`
)}

function _fakeGetDenied(buttonGate){return(
buttonGate("get('/') permission_denied")
)}

function _76(fakeGetDenied,rtdb,fakeRoot){return(
fakeGetDenied, rtdb.get(fakeRoot)
)}

function _fakeGetOk(buttonGate){return(
buttonGate("get('/') ok")
)}

async function _78(fakeGetOk,rtdb,fakeRoot){return(
fakeGetOk,
(
  await rtdb.get(
    rtdb.child(fakeRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw")
  )
).val()
)}

function _79(md){return(
md`### LISTEN`
)}

function _fakeOnValueSuccess(buttonGate){return(
buttonGate("ref.onValue('...')")
)}

function _81(Generators,fakeOnValueSuccess,rtdb,fakeRoot){return(
Generators.observe((notify) => {
  fakeOnValueSuccess,
    rtdb.onValue(
      rtdb.child(fakeRoot, "@tomlarkworthy/rtdb-protocol-explorer/rw"),
      (snap) => {
        notify(snap.val());
      }
    );
})
)}

function _82(md){return(
md`## UI Functions`
)}

function _toggleWebsockets(useWebsocket)
{
  if (!useWebsocket) window.WebSocket = undefined;
}


function _buttonGate(htl,Event){return(
function buttonGate(label) {
  const button = htl.html`<div><button onclick=${() => {
    button.value = null;
    button.dispatchEvent(new Event("input", { bubbles: true }));
  }} >${label}</button>`;
  return button;
}
)}

function _rtdbLogs(Inputs){return(
Inputs.input([])
)}

function _useWebsocket(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.toggle({ label: "websocket?" }),
  localStorageView("websocket", {
    json: true
  })
)
)}

function _87(md){return(
md`#### Overlay implementation`
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


function _89(md){return(
md`## Imports`
)}

function _97(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/01c2b756326d0b35dee0b5a1fc0e5a8c56059c12f917f3bd2a48592856a0829b168b79a626e27c579fe247b86cb81bedb38f386b409e6bf44c21b8b9d52a48b7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["width","htl"], _4);
  main.variable(observer()).define(["toc"], _5);
  main.variable(observer()).define(["tweet","md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["tweet"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["FileAttachment","width","md"], _12);
  main.variable(observer("viewof showOverlay")).define("viewof showOverlay", ["Inputs","localStorageView"], _showOverlay);
  main.variable(observer("showOverlay")).define("showOverlay", ["Generators", "viewof showOverlay"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("app")).define("app", _app);
  main.variable(observer("auth")).define("auth", _auth);
  main.variable(observer("rtdb")).define("rtdb", ["toggleWebsockets"], _rtdb);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof initializeGate")).define("viewof initializeGate", ["buttonGate"], _initializeGate);
  main.variable(observer("initializeGate")).define("initializeGate", ["Generators", "viewof initializeGate"], (G, _) => G.input(_));
  main.variable(observer("referenceApp")).define("referenceApp", ["initializeGate","rtdb","app"], _referenceApp);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("referenceDatabase")).define("referenceDatabase", ["rtdb","viewof rtdbLogs","Event","referenceApp"], _referenceDatabase);
  main.variable(observer("refRoot")).define("refRoot", ["rtdb","referenceDatabase"], _refRoot);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof refGetOk")).define("viewof refGetOk", ["buttonGate"], _refGetOk);
  main.variable(observer("refGetOk")).define("refGetOk", ["Generators", "viewof refGetOk"], (G, _) => G.input(_));
  main.variable(observer()).define(["refGetOk","rtdb","refRoot"], _32);
  main.variable(observer("viewof refGetDenied")).define("viewof refGetDenied", ["buttonGate"], _refGetDenied);
  main.variable(observer("refGetDenied")).define("refGetDenied", ["Generators", "viewof refGetDenied"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["refGetDenied","rtdb","refRoot"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("viewof refSetSuccess")).define("viewof refSetSuccess", ["buttonGate"], _refSetSuccess);
  main.variable(observer("refSetSuccess")).define("refSetSuccess", ["Generators", "viewof refSetSuccess"], (G, _) => G.input(_));
  main.variable(observer()).define(["refSetSuccess","rtdb","refRoot"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof refPatchSuccess")).define("viewof refPatchSuccess", ["buttonGate"], _refPatchSuccess);
  main.variable(observer("refPatchSuccess")).define("refPatchSuccess", ["Generators", "viewof refPatchSuccess"], (G, _) => G.input(_));
  main.variable(observer()).define(["refPatchSuccess","rtdb","refRoot"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof refOnValueSuccess")).define("viewof refOnValueSuccess", ["buttonGate"], _refOnValueSuccess);
  main.variable(observer("refOnValueSuccess")).define("refOnValueSuccess", ["Generators", "viewof refOnValueSuccess"], (G, _) => G.input(_));
  main.variable(observer()).define(["Generators","refOnValueSuccess","rtdb","refRoot"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer("viewof refOff")).define("viewof refOff", ["buttonGate"], _refOff);
  main.variable(observer("refOff")).define("refOff", ["Generators", "viewof refOff"], (G, _) => G.input(_));
  main.variable(observer()).define(["refOff","rtdb","refRoot"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["Inputs","rtdb","referenceDatabase"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("viewof refSignIn")).define("viewof refSignIn", ["buttonGate"], _refSignIn);
  main.variable(observer("refSignIn")).define("refSignIn", ["Generators", "viewof refSignIn"], (G, _) => G.input(_));
  main.variable(observer()).define(["refSignIn","auth","referenceApp"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("viewof refSignOut")).define("viewof refSignOut", ["buttonGate"], _refSignOut);
  main.variable(observer("refSignOut")).define("refSignOut", ["Generators", "viewof refSignOut"], (G, _) => G.input(_));
  main.variable(observer()).define(["refSignOut","auth","referenceApp"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["endpoint"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer("THIS_NOTEBOOK")).define("THIS_NOTEBOOK", ["html"], _THIS_NOTEBOOK);
  main.variable(observer("FAKE_SERVER_URL")).define("FAKE_SERVER_URL", ["THIS_NOTEBOOK"], _FAKE_SERVER_URL);
  main.variable(observer("viewof initializeFakeGate")).define("viewof initializeFakeGate", ["buttonGate"], _initializeFakeGate);
  main.variable(observer("initializeFakeGate")).define("initializeFakeGate", ["Generators", "viewof initializeFakeGate"], (G, _) => G.input(_));
  main.variable(observer("fakeApp")).define("fakeApp", ["initializeFakeGate","app","FAKE_SERVER_URL"], _fakeApp);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("fakeDatabase")).define("fakeDatabase", ["rtdb","viewof rtdbLogs","Event","fakeApp"], _fakeDatabase);
  main.variable(observer("fakeRoot")).define("fakeRoot", ["rtdb","fakeDatabase"], _fakeRoot);
  main.variable(observer()).define(["Inputs","rtdb","fakeDatabase"], _73);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("viewof fakeGetDenied")).define("viewof fakeGetDenied", ["buttonGate"], _fakeGetDenied);
  main.variable(observer("fakeGetDenied")).define("fakeGetDenied", ["Generators", "viewof fakeGetDenied"], (G, _) => G.input(_));
  main.variable(observer()).define(["fakeGetDenied","rtdb","fakeRoot"], _76);
  main.variable(observer("viewof fakeGetOk")).define("viewof fakeGetOk", ["buttonGate"], _fakeGetOk);
  main.variable(observer("fakeGetOk")).define("fakeGetOk", ["Generators", "viewof fakeGetOk"], (G, _) => G.input(_));
  main.variable(observer()).define(["fakeGetOk","rtdb","fakeRoot"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("viewof fakeOnValueSuccess")).define("viewof fakeOnValueSuccess", ["buttonGate"], _fakeOnValueSuccess);
  main.variable(observer("fakeOnValueSuccess")).define("fakeOnValueSuccess", ["Generators", "viewof fakeOnValueSuccess"], (G, _) => G.input(_));
  main.variable(observer()).define(["Generators","fakeOnValueSuccess","rtdb","fakeRoot"], _81);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("toggleWebsockets")).define("toggleWebsockets", ["useWebsocket"], _toggleWebsockets);
  main.variable(observer("buttonGate")).define("buttonGate", ["htl","Event"], _buttonGate);
  main.variable(observer("viewof rtdbLogs")).define("viewof rtdbLogs", ["Inputs"], _rtdbLogs);
  main.variable(observer("rtdbLogs")).define("rtdbLogs", ["Generators", "viewof rtdbLogs"], (G, _) => G.input(_));
  main.variable(observer("viewof useWebsocket")).define("viewof useWebsocket", ["Inputs","localStorageView"], _useWebsocket);
  main.variable(observer("useWebsocket")).define("useWebsocket", ["Generators", "viewof useWebsocket"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _87);
  main.variable(observer("overlay")).define("overlay", ["showOverlay","view","Inputs","viewof rtdbLogs","Event","viewof useWebsocket","html","makeSticky","invalidation"], _overlay);
  main.variable(observer()).define(["md"], _89);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  const child3 = runtime.module(define3);
  main.import("makeSticky", child3);
  const child4 = runtime.module(define4);
  main.import("view", child4);
  const child5 = runtime.module(define5);
  main.import("toc", child5);
  const child6 = runtime.module(define6);
  main.import("tweet", child6);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], _97);
  return main;
}
