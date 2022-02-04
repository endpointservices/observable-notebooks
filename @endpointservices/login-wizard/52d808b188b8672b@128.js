import define1 from "./993a0c51ef1175ea@1317.js";
import define2 from "./698257e86fae4586@346.js";
import define3 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Endpoint Utils
~~~js
import {viewof user, firebase, listen, subdomain, isOwner} from '@endpointservices/utils'
import {firebase, getAccessTokenFromServiceAccount, signinWithAccessToken} from '@endpointservices/utils'
~~~`
)});
  main.variable(observer("isOwner")).define("isOwner", ["firebase","subdomain"], function(firebase,subdomain){return(
async function isOwner(uid, subdomain_) {
  return (await (await firebase.firestore().collection("/services/ownership/owners")
                 .where("subdomain", '==', subdomain_ || subdomain())
                 .where("uid", '==', uid).limit(1).get())).docs.length > 0;
}
)});
  main.variable(observer("subdomain")).define("subdomain", ["html","location"], function(html,location){return(
(url) => {
  url = url || html`<a href="">`.href;
  const origin = location.origin;
  let match;
  if (match = /^https:\/\/observablehq.com\/@([^/]*)/.exec(url)) return match[1]
  if (match = /^https:\/\/([^.]*).static.observableusercontent.com/.exec(url)) return match[1]
  if (match = /^https:\/\/observablehq.com\/@([^/]*)/.exec(origin)) return match[1]
  if (match = /^https:\/\/([^.]*).static.observableusercontent.com/.exec(origin)) return match[1]
  return undefined;
}
)});
  main.variable(observer("notebook")).define("notebook", ["html"], function(html){return(
(url) => {
  url = url || html`<a href="">`.href;
  let match;
  if (match = /^https:\/\/(next\.)?observablehq.com\/@[^/]*\/([^/?#]*)/.exec(url)) return match[2]
  throw new Error("Cannot determine notebook name, did you publish/share?")
}
)});
  main.variable(observer()).define(["subdomain"], function(subdomain){return(
subdomain('https://endpointservices.static.observableusercontent.com')
)});
  main.variable(observer()).define(["notebook"], function(notebook){return(
notebook()
)});
  main.variable(observer("firebaseConfig")).define("firebaseConfig", function(){return(
{
  // See https://console.firebase.google.com/u/0/project/_/settings/general/web
  apiKey: "AIzaSyD882c8YEgeYpNkX01fhpUDfioWl_ETQyQ",
  authDomain: "endpointservice.firebaseapp.com",
  databaseURL: "https://endpointservice-eu.europe-west1.firebasedatabase.app/",
  projectId: "endpointservice",
  storageBucket: "endpointservice.appspot.com",
  appId: "1:1986724398:web:9b8bc33895b45dd2e095bf",
  uiConfig: { // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com", "facebook.com", "phone", "github.com"],
    // tosUrl: '<your-tos-url>', // Terms of service url.
    // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
  },
}
)});
  main.variable(observer("signinWithAccessToken")).define("signinWithAccessToken", ["firebase"], function(firebase){return(
async function signinWithAccessToken(access_token) {
  const credential = firebase.firebase_.auth.GoogleAuthProvider.credential(
    null,
    access_token
  );
  return await firebase.auth().signInWithCredential(credential);
}
)});
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("firebase", child1);
  main.import("listen", child1);
  const child2 = runtime.module(define2);
  main.import("getAccessTokenFromServiceAccount", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
