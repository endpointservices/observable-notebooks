// https://observablehq.com/@tomlarkworthy/firebase@1316
import define1 from "./3df1b33bb2cfcd3c@475.js";
import define2 from "./c7a3b20cec5d4dd9@659.js";
import define3 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Screen Shot 2019-11-06 at 12.16.34 AM.png",new URL("./files/33cbb25f5481dedc73ecc45de90291e561d3662978a4e3b28a2a8f587f965058a3cce8e8e10e78f527043fd90b76dfbe54cc911ea19252e7422e158e33fd47d1",import.meta.url)],["firebase-storage.js",new URL("./files/94e5aea4cc6cad9a4e6d33909304a02f328fd76cfba29e077e9b0861267589a5238283913a21605cf8444317b1356718dd37715a552836455f7a14917537faff",import.meta.url)],["firebase-functions.js",new URL("./files/f78f07572ec1a32909166a94f4bc7ead99afd223cc11bd87d0d76cf43846f462b341053f2edb52e593d19889958b026bac178b89494b5e4cf8f284ec2988a3d7",import.meta.url)],["firebase-firestore.js",new URL("./files/2d5cc6a0a68fdf18efc60dfd62f8b85484d97677ea01fa10c786522a222789929f493811bb1f2f774f7719741f2d2a10625c2b140149f8e55d29651f67f5b149",import.meta.url)],["firebase-database.js",new URL("./files/6d0288584c4ea56241cd6b7ec8f941a3aa6dfa7909360c88da9b69fc82360f7d91a2180f596893df51f3b9c6b4c489a2523aa7ad93392918e656b93d06a6c9db",import.meta.url)],["firebase-auth.js",new URL("./files/f4dc14c87b0d9dbe3cef7d6ef918693da744128a4ccb6f62f0a01517fd74a7d820fd90199d8d2a258990b31345e59d1b45c9c583dcba6e5dbff5738bf499fcaa",import.meta.url)],["firebase-app.js",new URL("./files/d9752327453acf77e767930a980e065cb0cd1dd450ed2d815acf17815a275993eccb8ff342763e03ae9171e86476a1476d61bc196e53734a5fbc111ecf29afa1",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Firebase and Firebase UI

The Firebase SDK and a user signin UI, plus utility classes for the databases.

Provides a realtime push database (Firestore) and cloud file storage (Firebase storage) protected with granular per user permissions (Firebase auth) behind federated login (Google, Facebook, Twitter, Github, Anonymous, Email and Phone). A reactive login button is provided through FirebaseUI.

### Change log
- 2020-09-01: Fixed race condition with SDK loader. Added RT detabase to DocView
- 2020-04-23: Upgrade to 8.4.1
- 2020-03-17: Multiple app support and Realtime Database added.
- 2021-03-02: Prevented embedding to guard against clickjacking. Thanks [@keystroke](https://observablehq.com/@keystroke) in [forum](https://talk.observablehq.com/t/clickjacking-attacks-and-notebook-security)
- ??? Switched to universal _listen_ instead of DocView/DocViews
`
)});
  main.variable(observer()).define(["htl","width"], function(htl,width){return(
htl.html`<h2>Video Walkthrough</h2><iframe width="${width}"
                 height="${(width * 3) / 4}"
                 src="https://www.youtube.com/embed/Fo3JTKp3CFU"
                 title="Firebase walkthrough"
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>`
)});
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("firebase")).define("firebase", ["require","FileAttachment","firebaseConfig"], async function(require,FileAttachment,firebaseConfig)
{
  window.firebases = window.firebases || {};

  if (!window._firebase) {
    // Has to be window.firebase for Firebase UI to find it
    // Require Firebase SDK once
    window._firebase = require.alias({
      "@firebase/app": await FileAttachment("firebase-app.js").url(), // 8.4.1
      "@firebase/auth": await FileAttachment("firebase-auth.js").url(),
      "@firebase/database": await FileAttachment("firebase-database.js").url(),
      "@firebase/firestore": await FileAttachment(
        "firebase-firestore.js"
      ).url(),
      "@firebase/functions": await FileAttachment(
        "firebase-functions.js"
      ).url(),
      "@firebase/storage": await FileAttachment("firebase-storage.js").url()
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

  // Init an app for each apiKey
  if (!window.firebases[firebaseConfig.apiKey]) {
    window.firebases[firebaseConfig.apiKey] = window._firebase.initializeApp(
      firebaseConfig,
      firebaseConfig.apiKey
    );
    window.firebases[firebaseConfig.apiKey].auth().useDeviceLanguage();
  }
  return window.firebases[firebaseConfig.apiKey];
}
);
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("listen")).define("listen", function(){return(
async function* listen(
  ref,
  {
    includeRef = false,
    includeId = false,
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## _Listen_ examples and tests`
)});
  main.variable(observer("collection_listen")).define("collection_listen", ["listen","firebase"], function(listen,firebase){return(
listen(firebase.firestore().collection("services/testing/example"), {
  includeRef: true
})
)});
  main.variable(observer("doc_listen")).define("doc_listen", ["listen","firebase"], function(listen,firebase){return(
listen(firebase.firestore().doc("services/testing/example/example1"))
)});
  main.variable(observer("default_value")).define("default_value", ["listen","firebase"], function(listen,firebase){return(
listen(firebase.firestore().doc("services/testing/example/empty"), {
  defaultValue: {}
})
)});
  main.variable(observer("viewof listenTests")).define("viewof listenTests", ["createSuite"], function(createSuite){return(
createSuite()
)});
  main.variable(observer("listenTests")).define("listenTests", ["Generators", "viewof listenTests"], (G, _) => G.input(_));
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], function(listenTests,firebase,expect,listen){return(
listenTests.test("Collection listen value is array", async () => {
  const ref = firebase.firestore().collection("services/testing/example");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).resolves.toEqual({
    "done": false,
    "value": [{string: "aString"}]})
})
)});
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], function(listenTests,firebase,expect,listen){return(
listenTests.test("Collection listen propagates error", async () => {
  const ref = firebase.firestore().collection("error");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).rejects.toThrow()
})
)});
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], function(listenTests,firebase,expect,listen){return(
listenTests.test("Doc listen value is object", async () => {
  const ref = firebase.firestore().doc("services/testing/example/example1");
  // This is an example of reading a generator "by hand"
  // See https://observablehq.com/@observablehq/introduction-to-asynchronous-iteration
  await expect(listen(ref).next()).resolves.toEqual({
    "done": false,
    "value": {string: "aString"}})
})
)});
  main.variable(observer()).define(["listenTests","firebase","expect","listen"], function(listenTests,firebase,expect,listen){return(
listenTests.test("Doc listen propagates error", async () => {
  const ref = firebase.firestore().doc("error/error");
  await expect(listen(ref).next()).rejects.toThrow()
})
)});
  main.variable(observer()).define(["listenTests","expect","default_value"], function(listenTests,expect,default_value){return(
listenTests.test("Default value for example is {}", async () => {
  expect(default_value).toEqual({})
})
)});
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("token")).define("token", ["user"], function(user){return(
user.getIdTokenResult()
)});
  main.variable(observer("viewof user")).define("viewof user", ["html","firebaseConfig","firebase","firebaseui"], function(html,firebaseConfig,firebase,firebaseui)
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
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
);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("firebaseConfig")).define("firebaseConfig", function(){return(
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
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`## Allowing the Pop-up  
You will need to add __observableusercontent.com__ to the authorized domains on the Firebase Providers:  https://console.firebase.google.com/project/_/authentication/providers)
 <img width=500px src="${await FileAttachment("Screen Shot 2019-11-06 at 12.16.34 AM.png").url()}">
`
)});
  main.variable(observer("firebaseui")).define("firebaseui", function()
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
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Key encoding for firebase realtime database`
)});
  main.variable(observer("FKEY")).define("FKEY", function()
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
);
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("DocView")).define("DocView", ["View"], function(View){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("DocsView")).define("DocsView", ["View"], function(View){return(
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
)});
  main.variable(observer("viewof docsViewTests")).define("viewof docsViewTests", ["createSuite"], function(createSuite){return(
createSuite()
)});
  main.variable(observer("docsViewTests")).define("docsViewTests", ["Generators", "viewof docsViewTests"], (G, _) => G.input(_));
  main.variable(observer("viewof testView")).define("viewof testView", ["DocsView","firebase"], function(DocsView,firebase){return(
new DocsView(firebase.firestore().collection("services/testing/example"))
)});
  main.variable(observer("testView")).define("testView", ["Generators", "viewof testView"], (G, _) => G.input(_));
  main.variable(observer()).define(["testView"], function(testView){return(
testView
)});
  main.variable(observer()).define(["docsViewTests","expect","testView"], function(docsViewTests,expect,testView){return(
docsViewTests.test("First value is the result", () => {
  // Well this is a pass but the Runtime won't allow a cell to catch the Runtime error
  console.log("expect?")
  expect(testView[0].string).toBe("aString")
})
)});
  main.variable(observer("viewof permissionDeniedView")).define("viewof permissionDeniedView", ["DocsView","firebase"], function(DocsView,firebase){return(
new DocsView(firebase.firestore().collection("hjfkjhfsd/dasdasdas/dasdasdas"))
)});
  main.variable(observer("permissionDeniedView")).define("permissionDeniedView", ["Generators", "viewof permissionDeniedView"], (G, _) => G.input(_));
  main.variable(observer()).define(["docsViewTests","viewof permissionDeniedView"], function(docsViewTests,$0){return(
docsViewTests.test("Permission errors bubble up", async (done) => {
  // Well this is a pass but the Runtime won't allow a cell to catch the Runtime error
  try {
    await $0.value;
  } catch (err) {
    done();
  }
})
)});
  const child1 = runtime.module(define1);
  main.import("View", child1);
  const child2 = runtime.module(define2);
  main.import("expect", child2);
  main.import("createSuite", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
