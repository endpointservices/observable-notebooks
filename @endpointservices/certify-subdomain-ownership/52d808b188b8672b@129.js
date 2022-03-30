import define1 from "./993a0c51ef1175ea@1345.js";
import define2 from "./698257e86fae4586@350.js";
import define3 from "./293899bef371e135@216.js";

function _1(md){return(
md`# Endpoint Utils
~~~js
import {viewof user, firebase, listen, subdomain, isOwner} from '@endpointservices/utils'
import {firebase, getAccessTokenFromServiceAccount, signinWithAccessToken} from '@endpointservices/utils'
~~~`
)}

function _isOwner(firebase,subdomain){return(
async function isOwner(uid, subdomain_) {
  return (await (await firebase.firestore().collection("/services/ownership/owners")
                 .where("subdomain", '==', subdomain_ || subdomain())
                 .where("uid", '==', uid).limit(1).get())).docs.length > 0;
}
)}

function _subdomain(html,location){return(
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
)}

function _notebook(html){return(
(url) => {
  url = url || html`<a href="">`.href;
  let match;
  if (match = /^https:\/\/(next\.)?observablehq.com\/@[^/]*\/([^/?#]*)/.exec(url)) return match[2]
  throw new Error("Cannot determine notebook name, did you publish/share?")
}
)}

function _5(subdomain){return(
subdomain('https://endpointservices.static.observableusercontent.com')
)}

function _6(notebook){return(
notebook()
)}

function _firebaseConfig(){return(
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
)}

function _signinWithAccessToken(firebase){return(
async function signinWithAccessToken(access_token) {
  const credential = firebase.firebase_.auth.GoogleAuthProvider.credential(
    null,
    access_token
  );
  return await firebase.auth().signInWithCredential(credential);
}
)}

function _12(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("isOwner")).define("isOwner", ["firebase","subdomain"], _isOwner);
  main.variable(observer("subdomain")).define("subdomain", ["html","location"], _subdomain);
  main.variable(observer("notebook")).define("notebook", ["html"], _notebook);
  main.variable(observer()).define(["subdomain"], _5);
  main.variable(observer()).define(["notebook"], _6);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("signinWithAccessToken")).define("signinWithAccessToken", ["firebase"], _signinWithAccessToken);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("firebase", child1);
  main.import("listen", child1);
  const child2 = runtime.module(define2);
  main.import("getAccessTokenFromServiceAccount", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _12);
  return main;
}
