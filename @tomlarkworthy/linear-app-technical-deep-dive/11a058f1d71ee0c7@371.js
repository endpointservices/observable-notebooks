function _1(a,md){return(
md`# Learning from the best: ${a("https://linear.app","Linear.app")} Technical Deep Dive`
)}

function _2(md){return(
md`Linear is rapidly becomes the project tracker of choice in startup world, with startups proudly declaring their loyalty to the product:`
)}

function _3(a,md){return(
md`_As a distributed team, we were looking for a better tool to help us manage our product development work and reduce the cost of coordination…Then we tried Linear and suddenly all our task management problems went away. I think <mark>one of the main reasons was the speed</mark>. The team felt that they could get into the tool, find what they were looking for or figure out what they needed to do, and then get back to work._
-- Justin “Vegetables” Reidy, Senior Engineering Manager, Loom (${a("https://medium.com/linear-app/fast-growing-startups-are-built-on-linear-74511bf96afb","source")})`
)}

function _4(a,md){return(
md`Clearly, it's a world class product, in particular by providing instant UI interactions in a web app. So let's have a peek under the hood and see what it is doing. Maybe it will help inform technical decisions at ${a("https://www.taktile.com/", "Taktile")} where we are building a modern decision engine.`
)}

function _5(md){return(
md`### DNS`
)}

function _6(a,md){return(
md`${a("https://linear.app","Linear")} is registered with ${a("https://namecheap.com","Namecheap")} and served from ${a("https://cloudflare.com","Cloudflare")}.`
)}

function _7(md){return(
md`## High level technologies (from [BuiltWith](https://builtwith.com/linear.app))`
)}

function _8(a,md){return(
md`### Cloud
- ${a("https://cloud.google.com/", "Google Cloud")}

### Front End Framework
- ${a("https://nextjs.org", "next.js")}
- ${a("https://reactjs.org/", "react")} -- Linear has a responsive design so it works on mobile and desktop

### Front End Utils
- ${a("https://www.npmjs.com/package/core-js", "core-js")}
- ${a("https://lodash.com", "lodash")}

### Services
- ${a("https://www.algolia.com/", "Algolia")}

### Analytics
- ${a("https://www.segment.io/", "Segment")}
- ${a("https://analytics.google.com/analytics/web", "Google Analytics")}`
)}

function _9(md){return(
md`## WEB tech`
)}

async function _10(FileAttachment,a,md){return(
md`### Service Workers

Linear uses a service worker to cache remote resources, when you look at the network tab you can see resources are often proxied via a service worker. If the service worker has the resource a network fetch may be avoided (not in the case above).
${await FileAttachment("image@9.png").image({style: "max-width: 640px"})}

In addition to managing a cache, the service worker also does some extra things like receiving notifications through the ${a("https://w3c.github.io/push-api/#dfn-web-push-protocol", "WEB push protocol")} for displaying notifications and responding to user clicks of notifications using a ${a("https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event", "`notificationclick`")} handler.

<details>
  <summary>source ${a("https://linear.app/client/sw.js","/client/sw.js")}</summary>
${md`
~~~js
const t = ["/"],
  e = [
    ...
  ],
  a = [
    "https://linear.app",
    "https://static.linear.app",
    "https://local.linear.dev:8080", 
  ];
self.addEventListener("activate", (e) => {
  const a = ["linear-sw-v5"];
  e.waitUntil(
    self.caches
      .keys()
      .then(async (e) => {
        const n = e.filter((t) => -1 === a.indexOf(t));
        await Promise.all(n.map((t) => self.caches.delete(t)));
        const s = await caches.open("linear-sw-v5");
        await Promise.allSettled(
          t.map((t) =>
            fetch(t).then(async (e) => {
              if (e.ok) {
                const a = e.clone();
                -1 !== (await e.text()).indexOf("data-sw-cache") &&
                  (await s.put(t, a));
              }
            })
          )
        );
      })
      .then(() => clients.claim())
  );
}),
  self.addEventListener("fetch", (t) => {
    if ("GET" !== t.request.method) return;
    const n = (function (t) {
      if (!a.some((e) => t.startsWith(e))) return;
      const n = new URL(t).pathname;
      if (e.some((t) => n.startsWith(t))) return;
      const s = n.match(
        /^(\/client\/assets\/[a-zA-Z0-9_\-]+)(\.[a-fA-F0-9]{5,10})(\.chunk\.js|\.js|\.css)$/
      );
      return s
        ? { name: \`\${s[1]}\${s[3]}\`, saveToCache: !0 }
        : -1 !== n.indexOf(".")
        ? { name: n, saveToCache: !0 }
        : { name: "/", saveToCache: !1 };
    })(t.request.url);
    void 0 !== n &&
      t.respondWith(
        self
          .fetch(t.request)
          .then(async (t) => {
            const e = await self.caches.open("linear-sw-v5");
            try {
              n.saveToCache && (await e.put(n.name, t.clone()));
            } catch (a) {
              const t = await e.keys();
              await Promise.all(t.map((t) => e.delete(t)));
            }
            return t;
          })
          .catch(async (t) => {
            const e = await self.caches.open("linear-sw-v5");
            return await e.match(n.name);
          })
      );
  }),
  self.addEventListener("push", (t) => {
    try {
      const e = t.data.text(),
        a = JSON.parse(e);
      if ("notification" === a.type) {
        const e = {
          body: a.body,
          requireInteraction: a.requireInteraction,
          data: { link: a.link },
        };
        t.waitUntil(self.registration.showNotification(a.title || "Linear", e));
      }
    } catch (e) {}
  }),
  self.addEventListener("notificationclick", (t) => {
    t.notification.data.link && clients.openWindow(t.notification.data.link);
  });
//# sourceMappingURL=__sw__.ecfde3da.js.map
~~~
`}
</details>`
)}

function _11(md){return(
md`
### Websockets

Linear uses a bi-direcitonal wire protocol via a websocket connection \`wss://sync.linear.app/\` Other user actions come down during a sync command.

\`\`\`
{"cmd":"track","event":{"event":"Action Invoked","properties":{"name":"Assign to…","isKeyboardAction":false}}}

{"cmd":"pong","id":4}

{"cmd":"sync","sync":[{"id":531725237,"modelName":"Issue","modelId":"...","action":"I","data":{"id":"...","title":"Add tests for ...","number":525,"teamId":"446e7499-429a-4002-af70-0e3046a97926","stateId":"...","labelIds":[],"priority":3,"createdAt":"2022-10-25T20:44:18.959Z","creatorId":"...","projectId":"a79ab520-a7af-4cc8-b2bb-f217fd8f4ccb","sortOrder":-349375,"startedAt":null,"updatedAt":"2022-10-25T20:44:18.959Z","assigneeId":"33e11220-f6fb-4eb8-843a-127ace5eab21","boardOrder":0,"canceledAt":null,"completedAt":null,"autoClosedAt":null,"subscriberIds":["33e11220-f6fb-4eb8-843a-127ace5eab21"],"descriptionData":"{\\"type\\":\\"doc\\",\\"content\\":[{\\"type\\":\\"paragraph\\",\\"content\\":[{\\"type\\":\\"text\\",\\"text\\":\\"..."}]}]}","previousIdentifiers":[]}}],"lastSyncId":531725238}
\`\`\`
`
)}

function _12(md){return(
md`### GraphQL

An Linear app uses a graphQL to apply changes, like updating an Issue:

\`\`\`
{
  "query": "mutation IssueUpdate { issueUpdate(id: \\"d1661e4b-be4c-49e5-a456-fe25dfcd0349\\", input: { descriptionData: \\"{\\\\\\"type\\\\\\":\\\\\\"doc\\\\\\",\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"paragraph\\\\\\",\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"text\\\\\\",\\\\\\"marks\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"strong\\\\\\"}],\\\\\\"text\\\\\\":\\\\\\"B\\\\\\"}]},{\\\\\\"type\\\\\\":\\\\\\"paragraph\\\\\\"},{\\\\\\"type\\\\\\":\\\\\\"paragraph\\\\\\",\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"text\\\\\\",\\\\\\"marks\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"strong\\\\\\"}],\\\\\\"text\\\\\\":\\\\\\"Acceptance criteria\\\\\\"}]},{\\\\\\"type\\\\\\":\\\\\\"todo_list\\\\\\",\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"todo_item\\\\\\",\\\\\\"attrs\\\\\\":{\\\\\\"done\\\\\\":false},\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"paragraph\\\\\\",\\\\\\"content\\\\\\":[{\\\\\\"type\\\\\\":\\\\\\"text\\\\\\",\\\\\\"text\\\\\\":\\\\\\"First\\\\\\"}]}]}]},{\\\\\\"type\\\\\\":\\\\\\"paragraph\\\\\\"}]}\\" }) { lastSyncId } }",
  "operationName": "IssueUpdate"
}
\`\`\`

Unfortunately they have wisely disable GraphQL introspection so the following meta-query is not permitted to execute   

~~~js
fetch('https://client-api.linear.app/graphql', {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: \`{"query": "{__schema {types {name}}}"}\`
});
~~~
`
)}

function _13(md){return(
md`### Auth

The graphQL endpoint uses cookies with an embedded JWT that decodes to 
\`\`\`
{
  "userId": "<UUID>",
  "userAccountId": "<UUID>",
  "organizationId": "<UUID>",
  "iat": 1667291977,
  "exp": 1667896777
}
\`\`\`

The sync endpoint uses a JWT bearer token that decodes to

\`\`\`
{
  "id": "<userAccountId UUID>",
  "authService": "google",
  "iat": 1663667247
}
\`\`\`

It's interesting that the JWT encodes very little information (e.g. no auth claims) so it seems like just an verifiable session identifier.
`
)}

async function _14(a,FileAttachment,md){return(
md`### Origin location

By pinging the graphQL endpoint a few times, from Berlin we never see a response in under 180ms, this is evidence supporting that there are only US origin servers (despite Cloudflare any-cast routing for static assets). This is confirmed in the ${a("https://linear.app/docs/security#faq", "FAQ")}

${await FileAttachment("image@6.png").image({style:"max-width: 640px"})}`
)}

async function _15(a,FileAttachment,md){return(
md`### Local Storage
A small amount of state is in localstorage, things like IDs and auth state. Also some interesting feature flags for product darklaunches and some of the details suggest use of ${a("https://cloud.google.com/bigtable","bigtable")} and ${a("https://www.mongodb.com/","Mongo")} at some level

![image@1.png](${await FileAttachment("image@1.png").url()})

`
)}

async function _16(FileAttachment,md){return(
md`### IndexDB

The bulk of application state is stored in IndexDB

![image.png](${await FileAttachment("image.png").url()})

`
)}

function _17(md){return(
md`### IndexDB Exporter Console Tool

We can export this database as JSON using a modified script from https://dfahlander.medium.com/export-indexeddb-from-a-web-app-using-devtools-62c55a8996a1. Just pop open the devtool console and paste the following script!

<details>
  <summary>IndexDB JSON downloader</summary>
  ${md`
~~~js
const theDBName = 'linear_083b983087fb85fee71c6e37227d5cd1'; // Find in applications tab
const script1 = document.createElement('script');
script1.src = 'https://unpkg.com/dexie@3.2.2';
document.body.appendChild(script1);
script1.onload = () => {
  const script2 = document.createElement('script');
  script2.src = 'https://unpkg.com/dexie-export-import@1.0.3';
  document.body.appendChild(script2);
  script2.onload = async () => {
    console.log("Setting up Dexie");
    theDB = new Dexie(theDBName);
    let {verno, tables} = await theDB.open();
    theDB.close();
    console.log("Loading", theDBName);
    theDB = new Dexie(theDBName);
    theDB.version(verno).stores(tables.reduce((p,c) => {p[c.name] = c.schema.primKey.keyPath || ""; return p;}, {}));
    console.log("Exporting", theDBName);
    theBlob = await theDB.export();
    var dl = document.createElement('a');
    console.log("Creating download link", theBlob);
    dl.href = URL.createObjectURL(theBlob);
    dl.innerHTML = 'Right-click to download database export';
    document.body.insertBefore(dl, document.body.firstChild);
  } 
}
~~~
  `}
</details>
`
)}

function _18(md){return(
md`### webmanifest

supplies icons for use offline

https://static.linear.app/client/pwa.webmanifest`
)}

function _19(a,md){return(
md`## No Spinners => Offline-first

The most attractive thing about ${a("https://linear.app", "Linear.app")} is that has no spinners or delays when clicking UI actions, despite a single regional deployment! ${a("https://www.swyx.io/client-server-battle", "Swyx")} has an excellent series of articles explaining how smart clients enable zero latency interfaces by being _offline-first_. Offline-first implies the network is no longer on the critical path. How does Linear acheive this? Let's find out!

`
)}

function _20(md){return(
md`The easy way to get offline is turn off your wifi`
)}

function _image4(FileAttachment){return(
FileAttachment("image@4.png").image()
)}

async function _22(FileAttachment,md){return(
md`![image@5.png](${await FileAttachment("image@5.png").url()})`
)}

async function _23(FileAttachment,a,md){return(
md`### What happens when you create a ticket when offline?

By turning off the network to the computer, we can figure out what happens by taking a snapshot of IndexDB (\`initial.json\`). Then we create an issue in the app. The application will inform us we are offline

${await FileAttachment("image@2.png").image()}

Then we take another snapshot of IndexDB snapshot and use ${a("https://github.com/josephburnett/jd","jd")} to compute the delta. Here is what was queued in IndexDB when we had a pending change

\`\`\`js
jd initial.json pending.json
@ ["data","data",26,"rows",-1]
+ {
    "$types": { "additionalCreationArgs": "undef" },
    "additionalCreationArgs": null,
    "batchIndex": 1,
    "id": 84,
    "model": {
      "assigneeId": "d4e76130-2e8c-4c2f-bd45-87ab962ce838",
      "createdAt": "2022-10-27T19:41:02.124Z",
      "creatorId": "d4e76130-2e8c-4c2f-bd45-87ab962ce838",
      "cycleId": "ab0310ec-10cd-4b0f-8efa-b35a744f5422",
      "descriptionData": "{\\"type\\":\\"doc\\",\\"content\\":[{\\"type\\":\\"paragraph\\",\\"content\\":[{\\"type\\":\\"text\\",\\"marks\\":[{\\"type\\":\\"strong\\"}],\\"text\\":\\"Description\\"}]},{\\"type\\":\\"paragraph\\"},{\\"type\\":\\"paragraph\\",\\"content\\":[{\\"type\\":\\"text\\",\\"marks\\":[{\\"type\\":\\"strong\\"}],\\"text\\":\\"Acceptance criteria\\"}]},{\\"type\\":\\"todo_list\\",\\"content\\":[{\\"type\\":\\"todo_item\\",\\"attrs\\":{\\"done\\":false},\\"content\\":[{\\"type\\":\\"paragraph\\",\\"content\\":[{\\"type\\":\\"text\\",\\"text\\":\\"First\\"}]}]}]},{\\"type\\":\\"paragraph\\"}]}",
      "id": "c3148d6d-3867-4fb3-97cf-fb6b20bb03b3",
      "labelIds": [],
      "number": 514,
      "previousIdentifiers": [],
      "priority": 0,
      "sortOrder": -284258.17,
      "stateId": "d8c90333-5890-49c1-b8f8-0251ed420aea",
      "subscriberIds": [],
      "teamId": "98af7326-70d1-450e-84fc-99a8e9fbdc28",
      "title": "Test",
      "updatedAt": "2022-10-27T19:40:55.210Z"
    },
    "modelType": "Issue",
    "type": "create"
  }
\`\`\`

This record was created in a table called \`_transactions\`. After restoring the internet and let the application sync the \`_transactions\` table is emptied again. Thus, \`_transactions\` contains a persisted pending operation queue. Linear queues up all actions in an ordered log when offline. It is critical for apps to maintain ordering of actions for ${a("https://en.wikipedia.org/wiki/Causal_consistency#:~:text=4%20Implementation-,Definition,of%20the%20causally%2Drelated%20operations.", "causal consistency")}, otherwise weird stuff happens. Because you could be offline for a while, it is also important for offline-app to persist this data. The use of IndexDB allows Linear to buffer large amounts of data offline (vs. local storage which has a 5MB limit).`
)}

async function _24(FileAttachment,a,md){return(
md`## Conflict Resolution

When creating different tickets on two different offline sessions, there is no conflict, both tickets can be created when the system gets online. However, if we modify the same field in the same ticket we will have a conflict.
<figure>
  ${await FileAttachment("image@10.png").image()}
  <figcaption>Kudos for the great meme ${a("https://twitter.com/basiafusinska?lang=en", "Barbara Fusinska")} from her presentation <i>${a("https://www.infoq.com/presentations/offline-mobile-apps/",'offline mobile apps')}</i></figcaption></figcaption>
</figure>

We might think perhaps Linear uses CRDT to resolve conflicts in text fields, but in experiments, at this point in time (2022-10-31), Linear applies Last Write Wins resolution (ie. offline clients just overwrite each other). 

${await FileAttachment("image@7.png").image({
  style: "max-width: 640px"
})}
`
)}

function _25(a,md){return(
md`### Summary

Linear is an exemplary example of modern offline-first applications. It uses IndexDB to store the app state locally, so startup is fast and UI interactions can be applied without the internet. When offline, mutations are stored in an *ordered* queue and applied in order to preserve causal consistency. Linear does not use complex conflict resolution and is hosted from a single region, yet because of its offline-first architecture, the app feels snappy and reactive.

### Next Steps?

Off-the-shelf technology that has a similar architecture is ${a("https://replicache.dev/", "replicache")}, they even built an Liner inspired demo called ${a("https://repliear.herokuapp.com/d/s7IJRXk8H5", "repliear")}. I would welcome other technology suggestions that you think can be used to build production-ready offline-first applications like Linear.`
)}

function _a(htl){return(
function a(url, label) {
  try {
    new URL(url); // check for typos
  } catch (err) {
    return htl.html`<span style="color: red;">${url} is not a valid url!`;
  }
  return htl.html`<a target="_blank" href=${url}>${label}`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/93495783b66e3fe81fc53b63f2bec40ff93e5a6e130767b235fac02b1af15e76f67245f61c3cdaae851d2b0e07017e479e1b597ffd8a35c739b5655193ec789c.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/7fb3e065e612c51e03fea27946735ebeac50998335f474c2243e04856671627a8e00a34959117c8145dcada7da086b13fbae12d7a0e95eaecb79f497a46eb6c7.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/7218fc3ffeab356d92f5cb817bcf93a7ee1a45874232f2d484c02fb11715e6cae0753c99b0f34d2e1cd61017369960a948a3c4b20a1d6fbadcfb300bb8c2666e.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@4.png", {url: new URL("./files/d291334af9d431e7cdfe5a792c295db385521808c422cfd5e948eb39785aef3034b4e0fd73b8a052b5b60e9f96217dcc282a1a7080e4b7002b8d0f023e328b21.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@5.png", {url: new URL("./files/1fbe215867083642770a99de2f43d3858fb59d4968a21f472e5ccb08b7178ae219fb6f2478f2110971de74e082140d9de349813bf775ba167086f1acf08d26ba.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@6.png", {url: new URL("./files/af405ec180ba39476f517ef80e0dc05df6778ab731bbfb41359d3ecb959666dde5bf6858293e27e2c5dd52da40e11d1f703520ef2935b4dd0dc53d05725d483a.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@7.png", {url: new URL("./files/c90703f8dd2328437ab212fdee8f424777413991c5dab42663f2770470c816273d8e2f78ffdf42edff630119832b17633fd9ebc0b3ca72b3051bf984e55c92ec.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@9.png", {url: new URL("./files/9f494f6627265f836d44a0f1dff6a01c5c89aa4fe437538b91e904e0f6e61235fb483a682d98af8fbe839c39ace9795989e23292e0409ed7d75ce11a6319451b.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@10.png", {url: new URL("./files/cb8316f83cef66bbb6cd4fa8116a90d07ad5dd18e052558aaacbe338b1d7af65fd3fdfee178fd0f12cd2cc665a5b20246aa9035e63a095ced609419ba938127a.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["a","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["a","md"], _3);
  main.variable(observer()).define(["a","md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["a","md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["a","md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["FileAttachment","a","md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["a","FileAttachment","md"], _14);
  main.variable(observer()).define(["a","FileAttachment","md"], _15);
  main.variable(observer()).define(["FileAttachment","md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["a","md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("image4")).define("image4", ["FileAttachment"], _image4);
  main.variable(observer()).define(["FileAttachment","md"], _22);
  main.variable(observer()).define(["FileAttachment","a","md"], _23);
  main.variable(observer()).define(["FileAttachment","a","md"], _24);
  main.variable(observer()).define(["a","md"], _25);
  main.variable(observer("a")).define("a", ["htl"], _a);
  return main;
}
