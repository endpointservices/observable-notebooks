import define1 from "./9bed702f80a3797e@402.js";
import define2 from "./ef672b935bd480fc@623.js";
import define3 from "./e1e1342567637708@620.js";
import define4 from "./640827b90181613e@2951.js";
import define5 from "./c7a3b20cec5d4dd9@669.js";
import define6 from "./293899bef371e135@290.js";

function _1(md){return(
md`# Create persisted and forkable abstractions with \`cellstore\``
)}

function _2(md){return(
md`Realtime durable state comes to Observable! Features

- **simple**, it works using existing Observable login identities and requires no configuration of 3rd party services
- **empowered**, end users retain bidirectional access to their data even after *forking*
- **realtime**, mutations are synced to all connected notebooks automatically
- **secure**, specify who has read and write access using access control lists.
- **idiomatic**, data flows out reactively, writes are [synchronized](https://observablehq.com/@observablehq/synchronized-inputs) in.

The aim is to make building custom, persisted, abstractions on Observable easier, to make interoperability with external platforms simpler, and to allow sharing of privileged information between team members while embracing the end-user's right to modify experiences programmatically through [forking](https://observablehq.com/@observablehq/fork-suggest-merge).`
)}

function _4(toc){return(
toc("h2,h3,h4")
)}

function _5(md){return(
md`## Motivation

*"There doesn't seem to be a way of building up higher level abstractions [on Observablehq] and saving and reusing them."* -- Jimmy Miller, [Future of Coding Slack](https://linen.futureofcoding.org/t/2162521/it-s-time-we-rethought-the-text-editor-our-editors-today-are#2e87db8c-bb7b-48fc-be01-0ad7e566dde7), Aug 2022

I used to worry about Observable extensibility but then I went on to build [an Oauth Authorization Server](https://observablehq.com/@endpointservices/auth), an [OpenAI Tarot Card Reader](https://thetarot.online/), a [CORS Proxy](https://observablehq.com/@tomlarkworthy/fetchp), on-demand [Minecraft Server](https://observablehq.com/@tomlarkworthy/minecraft-servers), a [notebook debugger](https://observablehq.com/@tomlarkworthy/ndd), a [Twitter bot](https://twitter.com/trendingnotebo2) and a API [latency monitor](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor). To meet my growing needs I added plugins for [analytics](https://observablehq.com/@endpointservices/plausible-analytics), [continuous integration](https://observablehq.com/@endpointservices/healthcheck), [error monitoring](https://observablehq.com/@endpointservices/sentry) and [backups](https://observablehq.com/@tomlarkworthy/github-backups). And so I conclude there is very little you cannot do on Observable, however, setting these things up required specialized Cloud knowledge unrelated to the fun part of creation. It shouldn't be so time consuming and technical! **Jimmy has a point**.

So with \`cellstore\` I am taking my experience of building stateful applications on Observable and refactoring out a common-case state abstraction. While I am at it, I can fix some philosophical issues, like end-user forkability, once-and-for-all, and now I can put it all into a single declarative function you can just call. There are no additional steps to do! It's super easy to add state to notebooks now. I can't wait to see what you will do with it!
`
)}

function _6(md){return(
md`## Quickstart

Import \`cellstore\` and its async dependency loader job with
\`\`\`js
import {cellstore, cellstoreDeps} from '@endpointservices/cellstore-min'
\`\`\`

Depend on \`cellstoreDeps\` somewhere.

~~~js
cellstoreDeps
~~~

The split cell trick allows locally cached values to be returned _before_ dependencies have loaded and is important for fast startup performance. Hopefully, we can eventually remove the trick from the external API ([issue](https://github.com/observablehq/feedback/issues/470)).

Create a new synchronized storage location with 

\`\`\`js
viewof myStore = cellstore({
  key: "myStore", // storage identifier
  owner: "YOUR_USERNAME", // team or username administrator
  writers: ["YOUR USERNAME"], // 'all' or an array of usernames
  readers: "all", // 'all' or an array of usernames
  per_user: false, // A shared store or a store per user?
  writes_per_day: 10 // rate limit
})
\`\`\`

It will pop open a UI like the one below. You will need to sign in with \`admin\` permissions for it to update the storage configuration.`
)}

function _myStore(cellstore){return(
cellstore({
  key: "myKey",
  owner: "endpointservices",
  per_user: true,
  writes_per_day: 55,
  writers: "all",
  readers: "all"
})
)}

function _8(md){return(
md`
You read from the store by referencing the variable 'myStore' anywhere in the notebook. `
)}

function _latestValue(myStore){return(
myStore
)}

function _10(md){return(
md`Write to the store by writing into the view with \`viewof store.value = <VALUE>\` or by [view synchronization](https://observablehq.com/@observablehq/synchronized-inputs) (binding).`
)}

function _11(Inputs,$0){return(
Inputs.button("Write by assignment", {
  reduce: () => {
    $0.value = Math.random();
  }
})
)}

function _12(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 1], {
    label: "write by syncronization"
  }),
  $0
)
)}

function _13(md){return(
md`## Option: *per_user* global or per user storage setting

Either the state is common to everybody, which is useful for sharing configuration, secrets etc. or the state store offers isolated storage for each person, useful for building apps. Control with the *per_user* option flag.`
)}

function _14(md){return(
md`## Demo: Team Shared secret

In this example *tomlarkworthy* has setup a shared secret that he can setup for his Cloud backend that only *saneef* and *pstuffa* can read.`
)}

function _cloud_key(cellstore){return(
cellstore({
  owner: "endpointservices",
  key: "cloud_key",
  writers: ["tomlarkworthy"],
  readers: ["tomlarkworthy", "saneef", "pstuffa"]
})
)}

function _16(md){return(
md`To read the key you just use the variable name. As *you* do not have access this cell will be unresolved`
)}

function _17(cloud_key){return(
cloud_key
)}

function _18(md){return(
md`For a secret, it makes sense to [bind]((https://observablehq.com/@observablehq/synchronized-inputs) to an [Inputs.password](https://observablehq.com/@observablehq/input-text#password) field.`
)}

function _19(Inputs,$0){return(
Inputs.bind(
  Inputs.password({
    // Or use Inputs.password if you don't want the plain text revealed
    label: "edit secret",
    submit: true
  }),
  $0
)
)}

function _20(md){return(
md`## Demo: Publicly Readable Cache of HTTP Data

You want to embed the analysis of an expensive data gathering process in a notebook for everybody to see. Only a small trusted group of people can update the cache, but you want everybody to be able to view it and see the data preparation steps.`
)}

function _cache(cellstore){return(
cellstore({
  owner: "endpointservices",
  key: "cache_example",
  writers: ["tomlarkworthy"], // Only I can update the cache!
  readers: "all"
})
)}

function _updateCache(Inputs){return(
Inputs.button("updateCache", {
  required: true
})
)}

function _ALLOW_DOMAINS(){return(
["news.ycombinator.com"]
)}

async function _fetchData(updateCache,fetchp)
{
  updateCache; // run this only if the button is bushed
  return {
    hackernews: await (await fetchp("https://news.ycombinator.com")).text()
  };
}


function _26(md){return(
md`To write the data you can create an Inputs.input to hold the data then bind it to the cache, but I think the imperative API is the simplest`
)}

function _27($0,fetchData)
{
  $0.value = fetchData;
}


function _28(md){return(
md`You can use the cached results by referencing the cache variable, for example rendering the HTML. Everybody will see the same results and you do not put any traffic pressure on the source server. A single button click updates the cache, but only those with write permissions can make changes that affect everyone.`
)}

function _29(html,cache){return(
html`${cache.hackernews}`
)}

function _30(md){return(
md`## Demo: Custom Abstractions, a Rust editor

The main motivation behind \`cellstore\` was experimenting with new programming abstractions. If you set the storage to \`per_user\` and bump up the \`writes_per_day\` you can provide isolated storage for user' programs. Here we demo an embedded rust IDE, but you are not limited to just text interfaces!`
)}

function _rustProgram(cellstore){return(
cellstore({
  owner: "endpointservices",
  key: "rust_program",
  writers: "all",
  readers: "all",
  per_user: true,
  writes_per_day: 2000
})
)}

function _rustPlugin(esmCodeMirror){return(
esmCodeMirror("lang-rust@6.0.0")
)}

function _34(Inputs,$0){return(
Inputs.button("load example program", {
  reduce: () => {
    $0.value = `fn main() {
    // Print text to the console
    println!("Hello World!");
}`;
  }
})
)}

function _35(Inputs,CodeMirror,codemirror,rustPlugin,myDefaultTheme,$0){return(
Inputs.bind(
  CodeMirror("", {
    extensions: [codemirror.basicSetup, rustPlugin.rust(), myDefaultTheme]
  }),
  $0
)
)}

function _36(md){return(
md`In simple cases you should consider the \`cellstore\` as the authority, and trigger downstream toolchains from it, but be prepared for more complex cases to use the imperative API.`
)}

function _37(md){return(
md`## Option: \`writes_per_day\` rate limit


The maximum number of writes per day for a \`per_user\` store is 10000


The maximum number of writes per day for a *NOT* \`per_user\` store is 100


The global shared store write limit is much smaller because it can potentially fan out to many readers. I strongly suggest you do not set your rate limits to the maximum, otherwise, if you ever hit the limit due to an infinite loop programming bug, you will have to wait a day for a refill! It is quite easy to cause an infinite loop, hence we have the rate limits!`
)}

function _38(md){return(
md`---`
)}

function _39(md){return(
md`## Implementation`
)}

function _41(cellstoreDeps){return(
cellstoreDeps
)}

function _42(md){return(
md`---`
)}

function _43(md){return(
md`## Development tooling

This is not relevant for users, but I don't feel the need to hide it in another notebook. This tools help with the development and testing of \`cellstore\`. Like the documentation, I don't want them included with the minimized library.`
)}

function _44(md){return(
md`### New user Journey Manual Test

Its important that a fresh cellstore works, however, the user might not be logged in, and all the permissions are keyed of a config that may not have written, so we need to ensure that an anonymous user can login as an owner and get started right away. If the config is not written first, the data listeners get permission denied and fail, so there is an important ordering that should be tested.

This test is somewhat manual as we need someone to really login, so just press the buttons and follow the instructions (if you are a team member of endpointservices)!`
)}

function _newUserJourneyParams(Inputs){return(
Inputs.button("test journey", {
  reduce: () => Math.random(),
  required: true
})
)}

function _afterLogin($0,Inputs){return(
$0,
Inputs.button("press after logging in as an admin", {
  required: true
})
)}

function _newUserJourneyStore(clearNewUserJourneyStoreConfig,cellstore){return(
clearNewUserJourneyStoreConfig,
cellstore({
  owner: "endpointservices",
  key: "userJourneyTest",
  writers: "all",
  readers: "all",
  writes_per_day: 100
})
)}

function _newUserJourney(createSuite){return(
createSuite({ name: null, timeout_ms: 99999999 })
)}

function _49(newUserJourney,newUserJourneyParams,$0,expect,invalidation){return(
newUserJourney.test("new user can login and write data", (done) => {
  newUserJourneyParams; // reset

  const listener = () => {
    try {
      const testData = $0.value;
      expect(testData.dataflowRead).toBe(testData.written);
      expect(testData.backendRead).toBe(testData.written);
    } catch (err) {
      done(err);
    }
    done();
  };
  $0.addEventListener("input", listener);
  invalidation.then(() =>
    $0.removeEventListener("input", listener)
  );
})
)}

function _50(newUserJourneyParams){return(
newUserJourneyParams
)}

function _authRef(){return(
undefined
)}

function _52($0,auth){return(
$0.value = auth
)}

async function _clearNewUserJourneyStoreConfig(newUserJourneyParams,signOut,$0)
{
  newUserJourneyParams;
  // signout
  await signOut($0.value);

  return fetch(
    "https://datacell-us.firebaseio.com/config/endpointservices/userJourneyTest.json",
    {
      method: "PUT",
      body: "null"
    }
  );
}


function _doWrite(afterLogin,$0,newUserJourneyParams){return(
afterLogin,
($0.value = newUserJourneyParams)
)}

async function _backendRead(doWrite)
{
  doWrite;
  const backendValue = await (
    await fetch(
      "https://datacell-us.firebaseio.com/data/endpointservices/userJourneyTest/_.json"
    )
  ).json();

  if (!backendValue.error) return JSON.parse(backendValue);

  return backendValue;
}


function _dataflowRead(newUserJourneyStore){return(
newUserJourneyStore
)}

function _newUserJourneyResults(Inputs){return(
Inputs.input()
)}

function _58($0,newUserJourneyStore,dataflowRead,backendRead,Event)
{
  $0.value = {
    written: newUserJourneyStore,
    dataflowRead,
    backendRead
  };
  $0.dispatchEvent(new Event("input"));
  return $0.value;
}


function _59(md){return(
md`### Permissions Prediction Tests`
)}

function _permissions(createSuite){return(
createSuite({ name: null })
)}

function _62(permissions,expect,canWrite){return(
permissions.test("can write is false without uid", () => {
  expect(
    canWrite({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      // uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: ["observablehq|tomlarkworthy"]
    })
  ).toBe(false);
})
)}

function _63(permissions,expect,canWrite){return(
permissions.test("can write is false with wrong uid", () => {
  expect(
    canWrite({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: ["observablehq|endpointservices"] // note
    })
  ).toBe(false);
})
)}

function _64(permissions,expect,canWrite){return(
permissions.test("can write is true using [uid] in writer", () => {
  expect(
    canWrite({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: ["observablehq|tomlarkworthy"],
      per_user: true
    })
  ).toBe(true);
})
)}

function _65(permissions,expect,canWrite){return(
permissions.test("can write is true with 'all' as writer", () => {
  expect(
    canWrite({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: "all",
      per_user: true
    })

  ).toBe(true);
})
)}

function _66(permissions,expect,canWrite){return(
permissions.test("can write is true on forked realm for forker", () => {
  expect(
    canWrite({
      $shard: "forker",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|forker",
      realm: "forker",
      teams: ["forker"],
      writers: "all",
      per_user: true
    })
  ).toBe(true);
})
)}

function _67(permissions,expect,canWrite){return(
permissions.test("can write is false on forked realm for non-forker", () => {
  expect(
    canWrite({
      $shard: "forker",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|forker",
      realm: "otherforker",
      teams: ["forker"],
      writers: "all",
      per_user: true
    })
  ).toBe(false);
})
)}

function _68(permissions,expect,canWrite){return(
permissions.test("can write is false without writer", () => {
  expect(
    canWrite({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      per_user: true
    })
  ).toBe(false);
})
)}

function _69(permissions,expect,canWrite){return(
permissions.test("can write is true when shard is _ and !per_user", () => {
  expect(
    canWrite({
      $shard: "_", // note
      per_user: false, // note
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: ["observablehq|tomlarkworthy"]
    })
  ).toBe(true);
})
)}

function _70(permissions,expect,canWrite){return(
permissions.test(
  "can write is false when shard is user_id and per_user",
  () => {
    expect(
      canWrite({
        $shard: "tomlarkworthy", // note
        per_user: false, //note
        $owner: "endpointservices",
        $key: "myKey",
        uid: "observablehq|tomlarkworthy",
        realm: "endpointservices",
        teams: ["tomlarkworthy"],
        writers: ["observablehq|tomlarkworthy"]
      })
    ).toBe(false);
  }
)
)}

function _71(permissions,expect,canWrite){return(
permissions.test("can write is false when shard is _ and per_user", () => {
  expect(
    canWrite({
      $shard: "_", // note
      per_user: true, // note
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      writers: ["observablehq|tomlarkworthy"]
    })
  ).toBe(false);
})
)}

function _72(permissions,expect,canRead){return(
permissions.test("can read is true using [uid] in reader", () => {
  expect(
    canRead({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      readers: ["observablehq|tomlarkworthy"],
      per_user: true
    })
  ).toBe(true);
})
)}

function _73(permissions,expect,canRead){return(
permissions.test("can read is true using 'all' in reader", () => {
  expect(
    canRead({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      readers: "all",
      per_user: true
    })
  ).toBe(true);
})
)}

function _74(permissions,expect,canRead){return(
permissions.test("can read is false without reader", () => {
  expect(
    canRead({
      $shard: "tomlarkworthy",
      $owner: "endpointservices",
      $key: "myKey",
      uid: "observablehq|tomlarkworthy",
      realm: "endpointservices",
      teams: ["tomlarkworthy"],
      per_user: true
    })
  ).toBe(false);
})
)}

function _75(md){return(
md`### UI Playground`
)}

function _sample(UI,createLogin,defaultApp){return(
UI({
  userView: createLogin({
    firebaseApp: defaultApp,
    prepareBackendURL:
      "https://webcode.run/observablehq.com/@endpointservices/endpoint-login-with-comment;prepare",
    varifyBackendURL:
      "https://webcode.run/observablehq.com/@endpointservices/endpoint-login-with-comment;verify"
  }),
  showLogin: false,
  showData: true,
  owner: "tomlarkworthy",
  key: "myStore",
  user: "@tomlarkworthy",
  permissions: "none",
  version: 13,
  writes: 9,
  writes_per_day: 10,
  data: {
    string: "cool"
  }
})
)}

function _77(sample){return(
sample
)}

function _78(Inputs,$0){return(
Inputs.bind(
  Inputs.radio(["info", "login-with-comment"], { label: "screen" }),
  $0.screen
)
)}

function _79(Inputs,$0){return(
Inputs.bind(
  Inputs.toggle({
    label: "signIn"
  }),
  $0.signIn
)
)}

function _80(Inputs,$0){return(
Inputs.bind(
  Inputs.toggle({
    label: "signOut"
  }),
  $0.signOut
)
)}

function _81(Inputs,$0){return(
Inputs.bind(
  Inputs.toggle({
    label: "showData"
  }),
  $0.showData
)
)}

function _82(Inputs,$0){return(
Inputs.bind(
  Inputs.toggle({
    label: "showWriteRate"
  }),
  $0.showWriteRate
)
)}

function _83(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 10], {
    label: "writes",
    step: 1
  }),
  $0.writes
)
)}

function _84(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 10], {
    label: "writes_per_day",
    step: 1
  }),
  $0.writes_per_day
)
)}

function _86(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  main.variable(observer()).define(["toc"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof myStore")).define("viewof myStore", ["cellstore"], _myStore);
  main.variable(observer("myStore")).define("myStore", ["Generators", "viewof myStore"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("latestValue")).define("latestValue", ["myStore"], _latestValue);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Inputs","viewof myStore"], _11);
  main.variable(observer()).define(["Inputs","viewof myStore"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof cloud_key")).define("viewof cloud_key", ["cellstore"], _cloud_key);
  main.variable(observer("cloud_key")).define("cloud_key", ["Generators", "viewof cloud_key"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["cloud_key"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["Inputs","viewof cloud_key"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof cache")).define("viewof cache", ["cellstore"], _cache);
  main.variable(observer("cache")).define("cache", ["Generators", "viewof cache"], (G, _) => G.input(_));
  main.variable(observer("viewof updateCache")).define("viewof updateCache", ["Inputs"], _updateCache);
  main.variable(observer("updateCache")).define("updateCache", ["Generators", "viewof updateCache"], (G, _) => G.input(_));
  const child2 = runtime.module(define2).derive(["ALLOW_DOMAINS"], main);
  main.import("fetchp", child2);
  main.variable(observer("ALLOW_DOMAINS")).define("ALLOW_DOMAINS", _ALLOW_DOMAINS);
  main.variable(observer("fetchData")).define("fetchData", ["updateCache","fetchp"], _fetchData);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["viewof cache","fetchData"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["html","cache"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof rustProgram")).define("viewof rustProgram", ["cellstore"], _rustProgram);
  main.variable(observer("rustProgram")).define("rustProgram", ["Generators", "viewof rustProgram"], (G, _) => G.input(_));
  const child3 = runtime.module(define3);
  main.import("CodeMirror", child3);
  main.import("esmCodeMirror", child3);
  main.import("codemirror", child3);
  main.import("myDefaultTheme", child3);
  main.variable(observer("rustPlugin")).define("rustPlugin", ["esmCodeMirror"], _rustPlugin);
  main.variable(observer()).define(["Inputs","viewof rustProgram"], _34);
  main.variable(observer()).define(["Inputs","CodeMirror","codemirror","rustPlugin","myDefaultTheme","viewof rustProgram"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  const child4 = runtime.module(define4);
  main.import("cellstore", child4);
  main.import("signOut", child4);
  main.import("auth", child4);
  main.import("canRead", child4);
  main.import("canWrite", child4);
  main.import("createLogin", child4);
  main.import("UI", child4);
  main.import("defaultApp", child4);
  main.import("cellstoreDeps", child4);
  main.variable(observer()).define(["cellstoreDeps"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("viewof newUserJourneyParams")).define("viewof newUserJourneyParams", ["Inputs"], _newUserJourneyParams);
  main.variable(observer("newUserJourneyParams")).define("newUserJourneyParams", ["Generators", "viewof newUserJourneyParams"], (G, _) => G.input(_));
  main.variable(observer("viewof afterLogin")).define("viewof afterLogin", ["viewof newUserJourneyStore","Inputs"], _afterLogin);
  main.variable(observer("afterLogin")).define("afterLogin", ["Generators", "viewof afterLogin"], (G, _) => G.input(_));
  main.variable(observer("viewof newUserJourneyStore")).define("viewof newUserJourneyStore", ["clearNewUserJourneyStoreConfig","cellstore"], _newUserJourneyStore);
  main.variable(observer("newUserJourneyStore")).define("newUserJourneyStore", ["Generators", "viewof newUserJourneyStore"], (G, _) => G.input(_));
  main.variable(observer("viewof newUserJourney")).define("viewof newUserJourney", ["createSuite"], _newUserJourney);
  main.variable(observer("newUserJourney")).define("newUserJourney", ["Generators", "viewof newUserJourney"], (G, _) => G.input(_));
  main.variable(observer()).define(["newUserJourney","newUserJourneyParams","viewof newUserJourneyResults","expect","invalidation"], _49);
  main.variable(observer()).define(["newUserJourneyParams"], _50);
  main.define("initial authRef", _authRef);
  main.variable(observer("mutable authRef")).define("mutable authRef", ["Mutable", "initial authRef"], (M, _) => new M(_));
  main.variable(observer("authRef")).define("authRef", ["mutable authRef"], _ => _.generator);
  main.variable(observer()).define(["mutable authRef","auth"], _52);
  main.variable(observer("clearNewUserJourneyStoreConfig")).define("clearNewUserJourneyStoreConfig", ["newUserJourneyParams","signOut","mutable authRef"], _clearNewUserJourneyStoreConfig);
  main.variable(observer("doWrite")).define("doWrite", ["afterLogin","viewof newUserJourneyStore","newUserJourneyParams"], _doWrite);
  main.variable(observer("backendRead")).define("backendRead", ["doWrite"], _backendRead);
  main.variable(observer("dataflowRead")).define("dataflowRead", ["newUserJourneyStore"], _dataflowRead);
  main.variable(observer("viewof newUserJourneyResults")).define("viewof newUserJourneyResults", ["Inputs"], _newUserJourneyResults);
  main.variable(observer("newUserJourneyResults")).define("newUserJourneyResults", ["Generators", "viewof newUserJourneyResults"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof newUserJourneyResults","newUserJourneyStore","dataflowRead","backendRead","Event"], _58);
  main.variable(observer()).define(["md"], _59);
  main.variable(observer("viewof permissions")).define("viewof permissions", ["createSuite"], _permissions);
  main.variable(observer("permissions")).define("permissions", ["Generators", "viewof permissions"], (G, _) => G.input(_));
  const child5 = runtime.module(define5);
  main.import("createSuite", child5);
  main.import("expect", child5);
  main.variable(observer()).define(["permissions","expect","canWrite"], _62);
  main.variable(observer()).define(["permissions","expect","canWrite"], _63);
  main.variable(observer()).define(["permissions","expect","canWrite"], _64);
  main.variable(observer()).define(["permissions","expect","canWrite"], _65);
  main.variable(observer()).define(["permissions","expect","canWrite"], _66);
  main.variable(observer()).define(["permissions","expect","canWrite"], _67);
  main.variable(observer()).define(["permissions","expect","canWrite"], _68);
  main.variable(observer()).define(["permissions","expect","canWrite"], _69);
  main.variable(observer()).define(["permissions","expect","canWrite"], _70);
  main.variable(observer()).define(["permissions","expect","canWrite"], _71);
  main.variable(observer()).define(["permissions","expect","canRead"], _72);
  main.variable(observer()).define(["permissions","expect","canRead"], _73);
  main.variable(observer()).define(["permissions","expect","canRead"], _74);
  main.variable(observer()).define(["md"], _75);
  main.variable(observer("viewof sample")).define("viewof sample", ["UI","createLogin","defaultApp"], _sample);
  main.variable(observer("sample")).define("sample", ["Generators", "viewof sample"], (G, _) => G.input(_));
  main.variable(observer()).define(["sample"], _77);
  main.variable(observer()).define(["Inputs","viewof sample"], _78);
  main.variable(observer()).define(["Inputs","viewof sample"], _79);
  main.variable(observer()).define(["Inputs","viewof sample"], _80);
  main.variable(observer()).define(["Inputs","viewof sample"], _81);
  main.variable(observer()).define(["Inputs","viewof sample"], _82);
  main.variable(observer()).define(["Inputs","viewof sample"], _83);
  main.variable(observer()).define(["Inputs","viewof sample"], _84);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], _86);
  return main;
}
