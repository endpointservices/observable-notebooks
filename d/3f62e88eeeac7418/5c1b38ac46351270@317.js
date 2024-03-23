// https://observablehq.com/@tomlarkworthy/shareview@317
import define1 from "./92ff66b718c1972f@141.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./9c498948145037d2@140.js";
import define4 from "./55bed46f68a80641@366.js";
import define5 from "./3d9d1394d858ca97@553.js";

async function _1(md,FileAttachment,getCurrentPinnedName){return(
md`# Globally Synchronized Views

<img style="max-width: 640px" src=${await FileAttachment(
  "shareview.png"
).url()}></img>

When collaborating it is sometimes desirable that everyone sees exactly the same thing.

This notebook adds a \`share(key, view)\` which will globally synchronize the view (and remember it between sessions). The view argument must conform to [best practices](https://observablehq.com/@tomlarkworthy/ui-linter), such as [@observablehq/inputs](https://observablehq.com/@observablehq/inputs) or a native input. In particular, it needs to be a writable *viewof*.

The result of a _share_ call is a link to a [REST API](https://firebase.google.com/docs/reference/rest/database), so you can even manipulate the control outside of a notebook.

~~~js
    import {share} from '${await getCurrentPinnedName()}'
~~~

To use:
~~~js
  share("uniqueKey", viewof range)
~~~

There is a unique keyspace for each notebook URL, so forks will have their own settings.

Thanks [@enjalot](https://observablehq.com/@enjalot) for coming up with the idea and sparring solutions.

shareview uses isTrusted to detect whether a change was by a user or not, which avoids self triggering loops when syncronizing with the server. However, sometimes a component has to raise events manually and it is not possible to set isTrusted on the raised events. So for synthetic events you wish to be serialized,sSet _isUser_ to true inside the "details" object of a CustomEvent object.

`
)}

function _2(md){return(
md`## Demo

Open this <a target="_blank" href="https://observablehq.com/@tomlarkworthy/shareinput">notebook</a> twice
`
)}

function _range(html){return(
html`<input type="range">`
)}

function _4(share,$0){return(
share("range", $0)
)}

function _5(md){return(
md`---`
)}

function _6(signature,share){return(
signature(share, {
  description:
    "Synchronizes an *viewof* to a notebook scoped *key*. Returns a link to a RESTful resource URL, which you can also GET and PUT"
})
)}

function _share(db,FKEY,html,Event,invalidation){return(
async function share(
  key, // Key is notebook scoped storage location to use (typically unique within a notebook)
  view // View is a viewof component like Range. Should be writable
) {
  if (typeof key !== 'string')
    throw new Error("First arg of share, 'key', must be a string");
  if (view.value === undefined)
    throw new Error("Sencond arg of share, 'view', must be a viewof");

  const dbRef = db.ref(
    `/shareinput/${FKEY.encode(
      html`<a href>`.href.split('?')[0]
    )}/${FKEY.encode(key)}`
  );

  const inputListener = e => {
    // update the value in firebase only if the user triggered it via user interaction
    if (e.isTrusted || e.isUser) dbRef.set(view.value);
  };

  const dbListener = snapshot => {
    const val = snapshot.val();
    if (val) {
      // val can be null when first used
      view.value = val;
      view.dispatchEvent(new Event('input'));
    }
  };

  view.addEventListener("input", inputListener);
  dbRef.on('value', dbListener);

  invalidation.then(() => {
    view.removeEventListener("input", inputListener);
    dbRef.off('value', dbListener);
  });

  return html`<a target="_blank" href="${dbRef.toString() +
    ".json"}">${key}</a>`;
}
)}

function _8(md){return(
md`---

### Synchronized inputs

If you map two controls to a single key then you get [synchronized input](https://observablehq.com/@observablehq/synchronized-inputs) behavior.
`
)}

function _differentRange(html){return(
html`<input type="range">`
)}

function _10(share,$0){return(
share("range", $0)
)}

function _11(md){return(
md`### Generalized JSON syncing

So even complex UIs, as long as they follow [best practices](https://observablehq.com/@tomlarkworthy/ui-linter) they should work.
`
)}

function _sliders(verticalSliders){return(
verticalSliders({
  names: 'shareinput'
})
)}

function _13(share,$0){return(
share("sliders", $0)
)}

function _15(md){return(
md`---`
)}

async function _16(md,FileAttachment){return(
md`### Realtime Database

We use Firebase realtime database as it has the lowest latency. Its an unpaid account so you cannot possibly bankrupt me, and I am happpy to share this one. BUT, the possibility exists of a non-community minded individual exhausts the credit. In this case, you are able to bring-your-own firebase by overriding FIREBASE_CONFIG, and you can even clientside secure your instance with security rules and a login if you wish.

The current rules are:

<img width=300 src=${await FileAttachment("image.png").url()}></img>
`
)}

function _db(firebase){return(
firebase.database()
)}

function _FIREBASE_CONFIG(){return(
{
  apiKey: "AIzaSyAqtghLj-S9NX0rj11ynWIovHOj3Wx9bqQ",
  databaseURL: "https://calculus-d7a63.firebaseio.com",
  projectId: "calculus-d7a63",
  appId: "1:55204078424:web:ee6243e9fcb0578e653b2d"
}
)}

function _21(md){return(
md`---
### [@Mootari's](https://observablehq.com/@mootari) usefuls and handies
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/9d3aeba4ffeff06ff85193b1c170e502cecc3893d74d927b7cce37ef8d010b31957548c007efd06c0faca36602616a6f2d5398604973b8a49cb0d061b5a8fa47.png", import.meta.url), mimeType: "image/png", toString}],
    ["shareview.png", {url: new URL("./files/9a603de881b78682cdfebb78bb136dc135bdaa644a12b6c4b0e3e26a817be594caed1d3e8782e45ecef3ebc22c4aa28cbae376e521861dee4e7d8efc084b9b3c.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment","getCurrentPinnedName"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof range")).define("viewof range", ["html"], _range);
  main.variable(observer("range")).define("range", ["Generators", "viewof range"], (G, _) => G.input(_));
  main.variable(observer()).define(["share","viewof range"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["signature","share"], _6);
  main.variable(observer("share")).define("share", ["db","FKEY","html","Event","invalidation"], _share);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof differentRange")).define("viewof differentRange", ["html"], _differentRange);
  main.variable(observer("differentRange")).define("differentRange", ["Generators", "viewof differentRange"], (G, _) => G.input(_));
  main.variable(observer()).define(["share","viewof differentRange"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof sliders")).define("viewof sliders", ["verticalSliders"], _sliders);
  main.variable(observer("sliders")).define("sliders", ["Generators", "viewof sliders"], (G, _) => G.input(_));
  main.variable(observer()).define(["share","viewof sliders"], _13);
  const child1 = runtime.module(define1);
  main.import("verticalSliders", child1);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md","FileAttachment"], _16);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", _FIREBASE_CONFIG);
  const child2 = runtime.module(define2).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child2);
  main.import("FKEY", child2);
  const child3 = runtime.module(define3);
  main.import("resize", child3);
  main.variable(observer()).define(["md"], _21);
  const child4 = runtime.module(define4);
  main.import("getCurrentPinnedName", child4);
  const child5 = runtime.module(define5);
  main.import("signature", child5);
  return main;
}
