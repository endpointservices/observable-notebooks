// https://observablehq.com/@endpointservices/weblogin-for-firebase@454
import define1 from "./7a77afd2ce564067@459.js";
import define2 from "./993a0c51ef1175ea@1362.js";
import define3 from "./09eaec8e2cf20db7@223.js";
import define4 from "./293899bef371e135@267.js";

function _1(md){return(
md`# IndieWeb Login For Firebase

#### Or how I used an IndieAuth Server as a Custom Token Provider


IndieAuth is a better way to do login, as the identities are under user control and portable across silos.

In this notebook is demonstrated how the tokens issued by [@endpointservices/auth](https://observablehq.com/@endpointservices/auth) can be used as custom tokens for the FirebaseSDK. Note this is a property of that Server and not IndieAuth in general, but it does highlight IndieAuth tokens and Firebase Custom tokens can coexist in the same token.

~~~js
    import {weblogin, user} from '@endpointservices/weblogin-for-firebase'
~~~

`
)}

function _2(md){return(
md` ## Setup Oauth 2.0 client

IndieAuth is an Oauth 2.0 endpoint, so we need to setup an Oauth 2.0 client first`
)}

function _AUTHORIZE_URL(){return(
"https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint"
)}

function _TOKEN_URL(){return(
"https://webcode.run/observablehq.com/@endpointservices/auth;token_endpoint"
)}

function _CLIENT_ID(html){return(
html`<a href>`.href.split("?")[0]
)}

function _SCOPE(){return(
'observablehq.com'
)}

function _TOKEN_PARAMS(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  code: args.code,
  state: args.state
})
)}

function _9(md){return(
md`## Create a login form

Note state etc are driven by Oauth 2.0 client
`
)}

function _weblogin(exchange,htl,logo,userWithNull,state,firebase,authorize_link,CLIENT_ID,SCOPE,invalidation)
{ 
  exchange // Ensure state machine runs
  // Protection against click jacking
  const url = htl.html`<a href>`.href;
  if (
    !url.startsWith("https://observablehq.com") &&
    !url.startsWith("https://next.observablehq.com")
  ) {
    throw new Error("Login form is not allowed to be embedded");
  }
  const ui = htl.html`<div>
    <span style="float: left;padding-right: 10px;">
      <a href="https://observablehq.com/collection/@endpointservices/services">
      ${logo("70px")}
      </a>
    </span>
    <h3> <a href="https://indieweb.org/Why_web_sign-in"> Web Sign-in</a> </h3>
    ${userWithNull ? htl.html`
    <div>
      You are signed in as <a href="${userWithNull.uid}">${userWithNull.uid}</a>
    </div>
    <div>
      <button onclick=${() => {
        state.access_token = undefined; // Prevents immediately signing in by token exchange logic
        firebase.auth().signOut();
      }
      }>
        signout
      </button>
    </div>
      ` : htl.html`
    <form action="${authorize_link}" method="get">
      <label for="url">Identity URL:</label>
      <input id="url" type="text" name="me" placeholder="https://example.com/me" />
      <p><button type="submit">Sign In</button></p>
      <input type="hidden" name="client_id" value="${CLIENT_ID}" />
      <input type="hidden" name="redirect_uri" value="${CLIENT_ID}" />
      <input type="hidden" name="state" value="${state.state}" />
      <input type="hidden" name="scope" value="${SCOPE}" />
    </form>
    <small><details>
      <summary>Help</summary>
      <p>Weblogin uses <a href="https://indieweb.org/IndieAuth">IndieAuth</a>/<a href="https://indieweb.org/RelMeAuth">Relmeauth</a> to log you in using data scraped from your homepage URL. 
      <p>To get setup as fast as possible checkout the <a href="https://observablehq.com/@endpointservices/login-wizard">Weblogin wizard</a>.
    </details></small>
    `
    }
  </div>`;
  ui.value = userWithNull || invalidation
  return ui;
}


function _11(md){return(
md`## Listen to Firebase auth state changes`
)}

function _userWithNull(Generators,firebase){return(
Generators.queue(next => {
  firebase.auth().onAuthStateChanged(auth => {
    console.log("Auth state changed", auth)
    next(auth)
  })
})
)}

function _user(userWithNull,invalidation)
{
  return userWithNull ? userWithNull : invalidation
}


function _14(md){return(
md`## Exchange indie auth token for Firebase session

*When* we have an access token for a different uid, *exchange for firebase identity*

We need to rely on Firebase auth's own caching of token info where possible, as it has its own refresh token etc. with a much longer expiry than IndieAuth tokens. 

`
)}

function _15(state){return(
state
)}

function _decoded(state){return(
state && state.access_token ? JSON.parse(atob(state.access_token.split('.')[1])): undefined
)}

function _exchange(state,decoded,userWithNull,hasNewClaims,currentClaims,firebase)
{
  if (state && state.access_token && (
      decoded.uid !== userWithNull?.uid || hasNewClaims(decoded.claims, currentClaims)
    )) {
    console.log("Using access_token for Firebase signin")
    firebase.auth().signInWithCustomToken(state.access_token)
  }
}


function _hasNewClaims(deepEqual){return(
function hasNewClaims(newClaims, oldClaims) {
  return Object.keys(newClaims || {}).some(newClaim => {
    if (!oldClaims[newClaim]) return true
    if (!deepEqual(newClaims[newClaim], oldClaims[newClaim])) return true
  })
}
)}

function _deepEqual(){return(
function deepEqual(a,b)
{
  if( (typeof a == 'object' && a != null) &&
      (typeof b == 'object' && b != null) ) {
     var count = [0,0];
     for( var key in a) count[0]++;
     for( var key in b) count[1]++;
     if ( count[0]-count[1] != 0) {return false;}
     for( var key in a) {
       if (!(key in b) || !deepEqual(a[key],b[key])) {return false;}
     }
     for( var key in b) {
       if (!(key in a) || !deepEqual(b[key],a[key])) {return false;}
     }
     return true;
  } else {
     return a === b;
  }
}
)}

async function _currentClaims(userWithNull){return(
userWithNull ? JSON.parse(atob((await userWithNull.getIdToken()).split(".")[1]))
      : {}
)}

function _21(user){return(
user
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
  authDomain: "endpointserviceusers.firebaseapp.com",
  projectId: "endpointserviceusers",
  appId: "1:283622646315:web:baa488124636283783006e"
}
)}

function _26(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("AUTHORIZE_URL")).define("AUTHORIZE_URL", _AUTHORIZE_URL);
  main.variable(observer("TOKEN_URL")).define("TOKEN_URL", _TOKEN_URL);
  main.variable(observer("CLIENT_ID")).define("CLIENT_ID", ["html"], _CLIENT_ID);
  main.variable(observer("SCOPE")).define("SCOPE", _SCOPE);
  main.variable(observer("TOKEN_PARAMS")).define("TOKEN_PARAMS", _TOKEN_PARAMS);
  const child1 = runtime.module(define1).derive(["CLIENT_ID",{name: "CLIENT_ID", alias: "REDIRECT_URI"},"AUTHORIZE_URL","TOKEN_URL","TOKEN_PARAMS"], main);
  main.import("authorize_link", child1);
  main.import("state", child1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("weblogin")).define("weblogin", ["exchange","htl","logo","userWithNull","state","firebase","authorize_link","CLIENT_ID","SCOPE","invalidation"], _weblogin);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("userWithNull")).define("userWithNull", ["Generators","firebase"], _userWithNull);
  main.variable(observer("user")).define("user", ["userWithNull","invalidation"], _user);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["state"], _15);
  main.variable(observer("decoded")).define("decoded", ["state"], _decoded);
  main.variable(observer("exchange")).define("exchange", ["state","decoded","userWithNull","hasNewClaims","currentClaims","firebase"], _exchange);
  main.variable(observer("hasNewClaims")).define("hasNewClaims", ["deepEqual"], _hasNewClaims);
  main.variable(observer("deepEqual")).define("deepEqual", _deepEqual);
  main.variable(observer("currentClaims")).define("currentClaims", ["userWithNull"], _currentClaims);
  main.variable(observer()).define(["user"], _21);
  const child2 = runtime.module(define2).derive(["firebaseConfig"], main);
  main.import("firebase", child2);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  const child3 = runtime.module(define3);
  main.import("logo", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _26);
  return main;
}
