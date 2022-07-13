// https://observablehq.com/@tomlarkworthy/firebase@1373
import define1 from "./c7a3b20cec5d4dd9@669.js";
import define2 from "./3df1b33bb2cfcd3c@475.js";
import define3 from "./58f3eb7334551ae6@211.js";

function _1(md){return(
md`# Firebase and Firebase UI

The Firebase SDK and a user signin UI, plus utility classes for the databases.

Provides a realtime push database (Firestore) and cloud file storage (Firebase storage) protected with granular per user permissions (Firebase auth) behind federated login (Google, Facebook, Twitter, Github, Anonymous, Email and Phone). A reactive login button is provided through FirebaseUI.

### Change log
- 2022-03-28: Add ignorePendingWrites option to listen, which defaults to false for backwards compatibility
- 2021-03-09: BUGFIX: firebase.auth().signout() flows to viewof user
- 2021-03-03: Lazy loaded testing library to reduce dependancies
- 2020-09-01: Fixed race condition with SDK loader. Added RT database to DocView
- 2020-04-23: Upgrade to 8.4.1
- 2020-03-17: Multiple app support and Realtime Database added.
- 2021-03-02: Prevented embedding to guard against clickjacking. Thanks [@keystroke](https://observablehq.com/@keystroke) in [forum](https://talk.observablehq.com/t/clickjacking-attacks-and-notebook-security)
- ??? Switched to universal _listen_ instead of DocView/DocViews
`
)}

function _2(htl,width){return(
htl.html`<h2>Video Walkthrough</h2><iframe width="${width}"
                 height="${(width * 3) / 4}"
                 src="https://www.youtube.com/embed/Fo3JTKp3CFU"
                 title="Firebase walkthrough"
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>`
)}

function _3(md){return(
md`# Firebase SDK

To import it:
~~~js
  import {firebase, viewof user, listen}
  with {firebaseConfig as firebaseConfig}
  from "@tomlarkworthy/firebase"
~~~
You need a config defined in a cell too, which you can obtain from console.firebase.google.com (project settings, web app)
~~~js 
  firebaseConfig = ({
    // See https://console.firebase.google.com/u/0/project/_/settings/general/web
    apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
    authDomain: "endpointservice.firebaseapp.com",
    databaseURL: "https://endpointservice.firebaseio.com",
    projectId: "endpointservice",
    storageBucket: "endpointservice.appspot.com",
    appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
    uiConfig: { // https://github.com/firebase/firebaseui-web#configuration
        signInOptions: ["google.com", "password", "phone", "anonymous"],
        // tosUrl: '<your-tos-url>', // Terms of service url.
        // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
    },
  })
~~~
`
)}

function _FIREBASE_VERSION(){return(
"8.4.1"
)}

async function _firebase(require,FIREBASE_VERSION,firebaseConfig)
{
  window.firebases = window.firebases || {};

  if (!window._firebase) {
    // Has to be window.firebase for Firebase UI to find it
    // Require Firebase SDK once
    window._firebase = require.alias({
      "@firebase/app": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`,
      "@firebase/auth": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`,
      "@firebase/database": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js`,
      "@firebase/firestore": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`,
      "@firebase/functions": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-functions.js`,
      "@firebase/storage": `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-storage.js`
    })(
      "@firebase/app",
      "@firebase/auth",
      "@firebase/database",
      "@firebase/firestore",
      "@firebase/functions",
      "@firebase/storage"
    );
  }
  window._firebase = await window._firebase;

  // Init an app for each firebaseConfig.name || apiKey identifier
  const id = firebaseConfig.name || firebaseConfig.apiKey;
  if (!window.firebases[id]) {
    window.firebases[id] = window._firebase.initializeApp(firebaseConfig, id);
    window.firebases[id].auth().useDeviceLanguage();
  }
  return window.firebases[id];
}


function _6(md){return(
md`# listen (Firestore doc/collection)

Creates an async iterator bound to a Firestore location. This allows you to pipe values directly into an Observable notebook cell without ceremony.

If you listen to a Firestore collections you get a stream of arrays. If you listen to a document you get a stream of JSON values.

Sometimes you need the full path of elements or the id. In the options you can request *\_id* and *\_ref* to be added to the result elements.

Usage: 
~~~js
      citiesCA = listen(db.collection("cities").where("state", "==", "CA"))
~~~
A pretty cool demo is changing the value through the realtime Firebase console and seeing the notebook update reactively.

Adding additional options:

~~~js
listen(ref, {
   includeRef: true,
   includeId: true
});
~~~
`
)}

function _listen(){return(
async function* listen(
  ref,
  {
    includeRef = false,
    includeId = false,
    ignorePendingWrites = false,
    defaultValue = undefined // If doc is empty what should be the return value
  } = {}
) {
  // Forked some code from https://github.com/observablehq/stdlib/blob/master/src/generators/observe.js
  let resolve = undefined;
  let reject = undefined;
  let error = undefined;
  let dispose = undefined;
  let done = false;

  const queue = [];
  if (ref.onSnapshot) {
    // Firestore
    dispose = ref.onSnapshot(
      snapshot => {
        if (!ignorePendingWrites || !snapshot.metadata.hasPendingWrites) {
          const value = snapshot.data
            ? // Doc listen
              includeRef || includeId
              ? {
                  ...snapshot.data(),
                  ...(includeRef && { _ref: snapshot.ref.path }),
                  ...(includeId && { _id: snapshot.id })
                }
              : snapshot.data() || defaultValue
            : // Collection listen
              snapshot.docs.map(doc => ({
                ...doc.data(),
                ...(includeRef && { _ref: doc.ref.path }),
                ...(includeId && { _id: doc.id })
              }));
          queue.push(value);
          if (resolve) resolve(queue.shift()), (resolve = null);
        }
      },
      err => {
        error = err;
        queue.length = 0;
        done = true;
        console.log("rejecting with err", err);
        if (reject) reject(err), (reject = null);
      }
    );
  } else if (ref.on) {
    // Firebase RT database
    const handler = snap => {
      const value = Object.keys(snap.val() || {}).map(key => ({
        ...snap.val()[key],
        ...(includeRef && { _ref: snap.child(key).ref() }),
        ...(includeId && { _id: key })
      }));
      queue.push(value);
      if (resolve) resolve(queue.shift()), (resolve = null);
    };

    ref.on('value', handler, err => {
      error = err;
      queue.length = 0;
      done = true;
      console.log("rejecting with err", err);
      if (reject) reject(err), (reject = null);
    });
    dispose = () => ref.off('value', handler);
  }

  while (!done) {
    if (error) {
      throw error;
    } else if (queue.length) {
      yield Promise.resolve(queue.shift());
    } else {
      yield new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
    }
  }
  dispose();
}
)}

function _8(md){return(
md`## _Listen_ examples and tests`
)}

function _collection_listen(listen,firebase){return(
listen(firebase.firestore().collection("services/testing/example"), {
  includeRef: true
})
)}

function _doc_listen(listen,firebase){return(
listen(firebase.firestore().doc("services/testing/example/example1"))
)}

function _default_value(listen,firebase){return(
listen(firebase.firestore().doc("services/testing/example/empty"), {
  defaultValue: {}
})
)}

function _listenTests(createSuite){return(
createSuite()
)}

function _13(listenTests,firebase,expect,listen){return(
listenTests.test("Collection listen value is array", async () => {
  const ref = firebase.firestore().collection("services/testing/example");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).resolves.toEqual({
    "done": false,
    "value": [{string: "aString"}]})
})
)}

function _14(listenTests,firebase,expect,listen){return(
listenTests.test("Collection listen propagates error", async () => {
  const ref = firebase.firestore().collection("error");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).rejects.toThrow()
})
)}

function _15(listenTests,firebase,expect,listen){return(
listenTests.test("Doc listen value is object", async () => {
  const ref = firebase.firestore().doc("services/testing/example/example1");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).resolves.toEqual({
    "done": false,
    "value": {string: "aString"}})
})
)}

function _16(listenTests,firebase,expect,listen){return(
listenTests.test("Doc listen propagates error", async () => {
  const ref = firebase.firestore().doc("error/error");
  await expect(listen(ref).next()).rejects.toThrow()
})
)}

function _17(listenTests,expect,default_value){return(
listenTests.test("Default value for example is {}", async () => {
  expect(default_value).toEqual({})
})
)}

function _18(md){return(
md`# User Login via Firebase UI

Current status of Firebase UI

- Google (works)
- Facebook (works)
- Github (works)
- phone (works)
- guest (works)
- Twitter (not tried)
- email with password (doesn't work)
- email with link (not tried)
`
)}

async function _token(user){return(
JSON.stringify(await user.getIdTokenResult(), null, 2)
)}

function _user(html,firebaseConfig,firebase,firebaseui)
{
  // Protection against click jacking
  const url = html`<a href>`.href;
  if (
    !url.startsWith("https://observablehq.com") &&
    !url.startsWith("https://next.observablehq.com")
  ) {
    throw new Error("Login form is not allowed to be embedded");
  }

  const authContainerId = `firebaseui-auth-container-${Math.random()
    .toString(36)
    .substring(7)}`;
  const form = html`
  <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css" />
  <div id="${authContainerId}"></div>
  `;
  let delayInitialValue = new Promise(async (resolveInitialValue) => {
    // Options that are fixed to make it work with Observable
    firebaseConfig.uiConfig = firebaseConfig.uiConfig || {};
    firebaseConfig.uiConfig.signInFlow = "popup";
    firebaseConfig.uiConfig.callbacks = {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => false
    };
    let firstTime = true;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null || !firstTime) {
        firstTime = false;
        form.value = user;
        resolveInitialValue(user);
        form.dispatchEvent(new CustomEvent("input"));
      }
    });
    // Initialize the FirebaseUI Widget using Firebase after the div is visible
    function pollForUIContainer() {
      window.firebase = window._firebase;
      if (!document.getElementById(authContainerId)) {
        // console.log(`cant find ${authContainerId}`)
        setTimeout(pollForUIContainer, 50);
      } else {
        console.log(`starting for ${authContainerId}`);
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(`#${authContainerId}`, firebaseConfig.uiConfig);
      }
    }
    pollForUIContainer();
  });
  form.value = delayInitialValue;
  return form;
}


function _21(md){return(
md`
To import it:
~~~js
  import {viewof user}
  with {firebaseConfig as firebaseConfig}
  from "@tomlarkworthy/firebaseui"
~~~
To customize it:
~~~js 
  firebaseConfig = ({
    // See https://console.firebase.google.com/u/0/project/_/settings/general/web
    apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
    authDomain: "endpointservice.firebaseapp.com",
    databaseURL: "https://endpointservice.firebaseio.com",
    projectId: "endpointservice",
    storageBucket: "endpointservice.appspot.com",
    appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
    uiConfig: { // https://github.com/firebase/firebaseui-web#configuration
        signInOptions: ["google.com", "password", "phone", "anonymous"],
        // tosUrl: '<your-tos-url>', // Terms of service url.
        // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
    },
  })
~~~
To display the UI
~~~js
  viewof user
~~~
To evaluate it, using *unresolved* to represent "logged out".
~~~js
  user
~~~
To evaluate it, using *null* to represent "logged out".
~~~js
  viewof user.value
~~~
To test it:
~~~js
  user.displayName
~~~
See the [FirebaseUI](https://firebase.google.com/docs/auth/web/firebaseui) documentation to see some of the advanced signin flows you can achieve (e.g. anonymous login, login by password link)

Firestore, Firebase Storage, Firebase Auth and Firebase Functions are also loaded (*not* Firebase Analytics). Thus allowing you to store user application and call server side functionality easily.

You can verify firebase id tokens with https://observablehq.com/@tomlarkworthy/verifyidtoken

The _user_ variable does resolve until someone logs in (like [Mike's auth simulator](https://observablehq.com/@mbostock/authentication-simulator)).

`
)}

function _firebaseConfig(){return(
{
    apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
    authDomain: "endpointservice.firebaseapp.com",
    databaseURL: "https://endpointservice.firebaseio.com",
    projectId: "endpointservice",
    storageBucket: "endpointservice.appspot.com",
    appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
    uiConfig: {
      signInOptions: ["google.com", "facebook.com", "twitter.com", "github.com", "password", "phone", "anonymous"],
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: '<your-privacy-url>'
    },
  }
)}

async function _23(md,FileAttachment){return(
md`## Allowing the Pop-up  
You will need to add __observableusercontent.com__ to the authorized domains on the Firebase Providers:  https://console.firebase.google.com/project/_/authentication/providers)
 <img width=500px src="${await FileAttachment("Screen Shot 2019-11-06 at 12.16.34 AM.png").url()}">
`
)}

function _firebaseui()
{
  var script = document.createElement('script');
  script.src = "https://www.gstatic.com/firebasejs/ui/4.6.0/firebase-ui-auth.js";
  document.getElementsByTagName('head')[0].appendChild(script);
  return new Promise((resolve) => {
    function pollForFirebaseUI() {
      if (!window.firebaseui) {
        setTimeout(pollForFirebaseUI, 50);
      } else {
        resolve(window.firebaseui);
      }
    }
    pollForFirebaseUI();
  })
}


function _25(md){return(
md`## Key encoding for firebase realtime database`
)}

function _FKEY()
{
  // http://stackoverflow.com/a/6969486/692528
  const escapeRegExp = str =>
    str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

  const chars = '.$[]#/%'.split('');
  const charCodes = chars.map(
    c =>
      `%${c
        .charCodeAt(0)
        .toString(16)
        .toUpperCase()}`
  );

  const charToCode = {};
  const codeToChar = {};
  chars.forEach((c, i) => {
    charToCode[c] = charCodes[i];
    codeToChar[charCodes[i]] = c;
  });

  const charsRegex = new RegExp(`[${escapeRegExp(chars.join(''))}]`, 'g');
  const charCodesRegex = new RegExp(charCodes.join('|'), 'g');

  const encode = str => str.replace(charsRegex, match => charToCode[match]);
  const decode = str => str.replace(charCodesRegex, match => codeToChar[match]);
  return {
    encode,
    decode
  };
}


function _27(md){return(
md` # DocView
This is a utility to map a mutable observable view to a Firestore doc location


Usage: 
~~~js
  viewof profile = new DocView(db.collection('users').doc(uid))
~~~
To imperatively update a view's value in a code block:
~~~js
  viewof profile.value = {"height": 12}
~~~
But you can do some cools stuff via binding. See https://observablehq.com/@mbostock/synchronized-views

A pretty cool demo is changing the value through the realtime Firebase console and seeing the notebook update reactively.
`
)}

function _DocView(View){return(
class DocView extends View {
  constructor(docRef, initial) {
    super(initial);
    const thisview = this;
    Object.defineProperty(this, "_ref", {
      value: docRef
    });
    if (this._ref.onSnapshot) {
      // Firestore listen
      this._ref.onSnapshot((doc) => {
        const value = doc.data() || initial;
        thisview._value = value;
        thisview.dispatchEvent(
          new CustomEvent("input", { detail: value, bubbles: true })
        );
      });
    }

    if (this._ref.on) {
      // RT Database listen
      this._ref.on("value", (snap) => {
        const value = snap.val() || initial;
        thisview._value = value;
        thisview.dispatchEvent(
          new CustomEvent("input", { detail: value, bubbles: true })
        );
      });
    }
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._ref.set(value);
    this._value = value;
    this.dispatchEvent(
      new CustomEvent("input", { detail: value, bubbles: true })
    );
  }
}
)}

function _29(md){return(
md` # DocsView
This is a utility to map read only observable view to a Firestore snapshot location (query or collection)

Usage: 
~~~js
      viewof citiesCA = new DocsView(db.collection("cities").where("state", "==", "CA"))
~~~
A pretty cool demo is changing the value through the realtime Firebase console and seeing the notebook update reactively.

You can have the DocsView class add *\_id* and *\_ref* properties to the result elements in the options.

~~~js
new DocsView(..., {
   includeRef: true,
   includeId: true
});
~~~
`
)}

function _DocsView(View){return(
class DocsView extends View {
  constructor(queryRef, options) {
    super(undefined);
    const self = this;
    options = options || {}
    
    Object.defineProperty(this, "_ref", {
      value: queryRef
    })
    
    let firstResolve, firstReject;
    let first = new Promise(function(resolve, reject){
      firstResolve = resolve;
      firstReject = reject;
    });

    self._value = first;
    this._ref.onSnapshot(snapshot => {
      const value = snapshot.docs.map(doc => (
        {
          ...doc.data(),
          ...options.includeRef && {_ref: doc.ref.path},
          ...options.includeId && {_id: doc.id}
        }
      ))
      if (first) {
        first = undefined;
        firstResolve(value);
      }
      self._value = value;
      self.dispatchEvent(new CustomEvent("input", {detail: self._value}));
    }, (error) => {
      if (first) {
        first = undefined;
        firstReject(error);
      }
    })                
  }
  get value() {
    return this._value;
  }
}
)}

function _31(md){return(
md`### Testing`
)}

function _docsViewTests(createSuite){return(
createSuite()
)}

function _testView(DocsView,firebase){return(
new DocsView(firebase.firestore().collection("services/testing/example"))
)}

function _35(testView){return(
testView
)}

function _36(docsViewTests,expect,testView){return(
docsViewTests.test("First value is the result", () => {
  // Well this is a pass but the Runtime won't allow a cell to catch the Runtime error
  console.log("expect?");
  expect(testView[0].string).toBe("aString");
})
)}

function _permissionDeniedView(DocsView,firebase){return(
new DocsView(firebase.firestore().collection("hjfkjhfsd/dasdasdas/dasdasdas"))
)}

function _38(docsViewTests,$0){return(
docsViewTests.test("Permission errors bubble up", async (done) => {
  // Well this is a pass but the Runtime won't allow a cell to catch the Runtime error
  try {
    await $0.value;
  } catch (err) {
    done();
  }
})
)}

function _41(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Screen Shot 2019-11-06 at 12.16.34 AM.png", {url: new URL("./files/33cbb25f5481dedc73ecc45de90291e561d3662978a4e3b28a2a8f587f965058a3cce8e8e10e78f527043fd90b76dfbe54cc911ea19252e7422e158e33fd47d1.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl","width"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("FIREBASE_VERSION")).define("FIREBASE_VERSION", _FIREBASE_VERSION);
  main.variable(observer("firebase")).define("firebase", ["require","FIREBASE_VERSION","firebaseConfig"], _firebase);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("listen")).define("listen", _listen);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("collection_listen")).define("collection_listen", ["listen","firebase"], _collection_listen);
  main.variable(observer("doc_listen")).define("doc_listen", ["listen","firebase"], _doc_listen);
  main.variable(observer("default_value")).define("default_value", ["listen","firebase"], _default_value);
  main.variable(observer("viewof listenTests")).define("viewof listenTests", ["createSuite"], _listenTests);
  main.variable(observer("listenTests")).define("listenTests", ["Generators", "viewof listenTests"], (G, _) => G.input(_));
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], _13);
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], _14);
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], _15);
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], _16);
  main.variable(observer()).define(["listenTests","expect","default_value"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("token")).define("token", ["user"], _token);
  main.variable(observer("viewof user")).define("viewof user", ["html","firebaseConfig","firebase","firebaseui"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md","FileAttachment"], _23);
  main.variable(observer("firebaseui")).define("firebaseui", _firebaseui);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("FKEY")).define("FKEY", _FKEY);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("DocView")).define("DocView", ["View"], _DocView);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("DocsView")).define("DocsView", ["View"], _DocsView);
  main.variable(observer()).define(["md"], _31);
  const child1 = runtime.module(define1);
  main.import("createSuite", child1);
  main.import("expect", child1);
  main.variable(observer("viewof docsViewTests")).define("viewof docsViewTests", ["createSuite"], _docsViewTests);
  main.variable(observer("docsViewTests")).define("docsViewTests", ["Generators", "viewof docsViewTests"], (G, _) => G.input(_));
  main.variable(observer("viewof testView")).define("viewof testView", ["DocsView","firebase"], _testView);
  main.variable(observer("testView")).define("testView", ["Generators", "viewof testView"], (G, _) => G.input(_));
  main.variable(observer()).define(["testView"], _35);
  main.variable(observer()).define(["docsViewTests","expect","testView"], _36);
  main.variable(observer("viewof permissionDeniedView")).define("viewof permissionDeniedView", ["DocsView","firebase"], _permissionDeniedView);
  main.variable(observer("permissionDeniedView")).define("permissionDeniedView", ["Generators", "viewof permissionDeniedView"], (G, _) => G.input(_));
  main.variable(observer()).define(["docsViewTests","viewof permissionDeniedView"], _38);
  const child2 = runtime.module(define2);
  main.import("View", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _41);
  return main;
}
