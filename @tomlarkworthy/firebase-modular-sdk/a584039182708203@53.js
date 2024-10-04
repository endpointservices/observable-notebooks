// https://observablehq.com/@tomlarkworthy/firebase-modular-sdk@53
import define1 from "./58f3eb7334551ae6@211.js";

function _1(md){return(
md`# Firebase Modular SDK

The [Firebase module SDK collection](https://observablehq.com/collection/@tomlarkworthy/firebase-modular-sdk) enables the use of the modular SDK in the Firebase idiomatic style.

In Firebase the [quickstart](https://firebase.google.com/docs/auth/web/start) the documentation states the following

\`\`\`js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
\`\`\`

However, the destructuring ES6 module import is not available in Observable so that code will not run. To fix this, the module SDK collection defines a number of notebooks as equivalents for the underlying Firebase modules. Destructuring *is* available when importing notebooks, so the imports in the above code can be rewritten and the overall code block will now work

\`\`\`js
import { initializeApp } from "@tomlarkworthy/firebase-app";
import { getAuth } from "@tomlarkworthy/firebase-auth";
\`\`\``
)}

function _2(md){return(
md`## Advantages of the Modular SDK

The earlier version of bringing Firebase to Observable ended loading all packages, which was over 1MB of JavaScript, of which, most was Firestore due to its underlying gRPC-web transport. This manifested itself as slow page load times. With the modular SDK only Javascript you need can be loaded, and the resultant code is tree shakeable for even more code size reductions.`
)}

function _3(md){return(
md`## Code generated

The notebook https://observablehq.com/@tomlarkworthy/paste-codegen was used to help auto generate the notebook collection`
)}

function _4(md){return(
md`## Minified

Some of the libraries have been minified (they have an attachment)
~~~js
#!/usr/bin/env node
require('esbuild').build({
  entryPoints: ['firebase-auth.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  outfile: 'firebase-auth.min.js',
}).catch(() => process.exit(1))
~~~`
)}

function _6(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _6);
  return main;
}
