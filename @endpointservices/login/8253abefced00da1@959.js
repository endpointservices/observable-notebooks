// https://observablehq.com/@endpointservices/login@959
import define1 from "./698257e86fae4586@346.js";
import define2 from "./52d808b188b8672b@128.js";
import define3 from "./165e9411d1af7e86@1398.js";
import define4 from "./11a5ab8b1b3a51db@1160.js";
import define5 from "./c0de6bf6c2f598ef@62.js";
import define6 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${md`# Federated Login (⚠️ not in use)

The controls below create a federated login session that will allow you to login to Endpoint services from your own personal domains.

Works by creating an encrypted _SameSite=None_ cookie that is sent to shared URL regardless of the origin you are browsing from.

(Please note UI is very slow ATM)
(Works with Chrome, Firefox but not Safari)

`}`
)});
  main.variable(observer("viewof user")).define("viewof user", ["notify","federatedLoginState","URLSearchParams","location","html","lib","firebase","subdomain","viewof firebaseUser","checkToken","baseURL","mutable notify"], async function(notify,federatedLoginState,URLSearchParams,location,html,lib,firebase,subdomain,$0,checkToken,baseURL,$1)
{
  notify
  let ui;
  
  // Federated User, perfect!
  if (federatedLoginState === "LOGGED_IN") {
    console.log("@endpointservices/login: LOGGED_IN");
    const redirect = new URLSearchParams(location.search).get('source');
    ui = html`<div>
      <p class="content"> You are logged in </p>
      ${redirect ? html`<a class="button" href=${redirect}>Return to ${redirect.replace('https://observablehq.com', '')}</a>`: null}
      <button class="button" onclick=${lib.signout}>signout</button>
    </div>`
    ui.value = firebase.auth().currentUser
    return ui;
  }
  
  // We can use the Firebase login to log into endpointservice notebooks
  if (subdomain() === 'endpointservices' && !firebase.auth().currentUser) {
    ui = html`${$0}`
  }
  
  
  // We can use the Firebase login to log into endpointservice notebooks
  if (subdomain() === 'endpointservices' && firebase.auth().currentUser && federatedLoginState === "LOGGED_OUT") {
    ui = html`<button class="button" onclick=${lib.signout}>signout</butt`
  }
  
  // On an endpoint service notebook, for a non-custom provider, we can upgrade to a federated login by sending our token off to /signin
  try {
      
    let idToken = await firebase.auth().currentUser.getIdToken()
    
    if (subdomain() === 'endpointservices' &&
        firebase.auth().currentUser && await checkToken(idToken)) {
      console.log("@endpointservices/login: Fetching federated token");
      fetch(baseURL + "/signin", {
        method: 'POST',
        body: idToken,
        credentials: 'include'
      }).then(() => {
        $1.value++; //recalulate out login state
      });
      ui = html`Obtaining cookie...`
    }
  } catch (err) {
    // Just means checkToken threw
  }

  // Non @endpointservices notebooks must login through federated login notebook
  if (subdomain() !== 'endpointservices' && federatedLoginState === "LOGGED_OUT") {
    console.log("@endpointservices/login: Login at https://observablehq.com/@endpointservices/login required");
    ui = html`<a class="button" href=${`https://observablehq.com/@endpointservices/login?source=${html`<a href="">.href`}`}>Login to Endpoint Services</a>`
  }
  
  // Non @endpointservices notebook user must  be certified before they can login
  if (subdomain() !== 'endpointservices' && federatedLoginState === "UNCERTIFIED") {
    console.log("@endpointservices/login: Certification https://observablehq.com/@endpointservices/certify-subdomain-ownership required");
    ui = html`<a class="button" href=${`https://observablehq.com/@endpointservices/certify-subdomain-ownership?source=${html`<a href="">.href`}`}>You must certify ownership of ${subdomain()} to login</a>`
  }
  
  ui.value = federatedLoginState === "LOGGED_IN" ? firebase.auth().currentUser
                                                 : new Promise(() => {})
  return ui
}
);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`

Login is a *critical* component of offering stateful personalised experiences on the web. A login step allows a user to prove their identity to a backend service. With that knowledge, a backend services can provide conditional access to resources, such as a personal storage space that is isolated from other users.

Many auth providers are configured to permit login to a single domain, but this does not work well with the Observable workflow where we would like users to be able to fork notebooks into their own subdomain for personal customization. They will need to be able to login to their forked notebook, though even though it is now hosted on their personal subdomain.

~~~js
import {viewof user} from '@endpointservices/login'
...
viewof user // Resolves only when logged in.
~~~

Because Endpoint Services does not have fine grained access control, we only allow login of of the owner of a subdomain to forked Notebooks. This avoids the risk of construction of malicious forks. If you do wish to share an improvement to an endpoint service notebook, either suggest changes to the @endpointservices notebook, or encourage others to fork your work into their workspace.

We use the tricks described in [John Carrol's excellent guide to federating Firebase auth](https://dev.to/johncarroll/how-to-share-firebase-authentication-across-subdomains-1ka8) to enable you to login to Endpoint services from your own notebooks. We deviate slightly from his implementation by use Origin header to avoid CSRF attacks instead of his "csst" token.

The technique for login federation is interesting in its own right. All production code is in this notebook using [serverless cells](https://observablehq.com/@tomlarkworthy/serverless-cells). So you can see how this one works to make your own.
`}`
)});
  main.variable(observer("federatedLoginState")).define("federatedLoginState", ["notify","firebase","baseURL","mutable notify"], async function(notify,firebase,baseURL,$0)
{
  // firebase.auth().currentUser is always null on first page reload, will be notified 
  // by first state change
  if (notify === 0) return new Promise(() => {});
  
  // If we already have custom auth token we are already logged in as a federated user
  /* No if user signouts out on subdomain we might still have custom creds in notebook
  try { 
    firebase.auth().currentUser && await checkToken(await firebase.auth().currentUser.getIdToken())
  } catch (err) {
    if (err.message === "Not approved signin provider: custom") return "LOGGED_IN"
  }*/
  if (this == "LOGGED_IN" && firebase.auth().currentUser) return "LOGGED_IN";
  
  // Maybe we can become one?
  const check = await fetch(baseURL + "/check", { 
    method: 'POST',
    credentials: 'include'
  });
  if (check.status === 200) {
    const token = await check.text();
    await firebase.auth().signInWithCustomToken(token);
    $0.value++;
    return "LOGGED_IN"
  } else if (check.status === 401) {
    return "LOGGED_OUT"
  } else if (check.status === 403) {
    return "UNCERTIFIED"
  } else {
    throw new Error("Unexpected: " + check.status)
  }
}
);
  main.define("initial notify", function()
{ // Triggers a reevaluation of the auth state
  return 0
}
);
  main.variable(observer("mutable notify")).define("mutable notify", ["Mutable", "initial notify"], (M, _) => new M(_));
  main.variable(observer("notify")).define("notify", ["mutable notify"], _ => _.generator);
  main.variable(observer("lib")).define("lib", ["firebase","mutable notify","baseURL"], function(firebase,$0,baseURL)
{
  firebase.auth().onAuthStateChanged(function(user) {$0.value++});
  return ({
    signout: async () => {
      // Remove cookie first
      await fetch(baseURL + "/signout", {
        method: 'POST',
        credentials: 'include'
      })
      // Remove firebase 2nd (also notifies listeners)
      await firebase.auth().signOut();
    }
  })
}
);
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`### Endpoint

We serve a single 'default' serverless cells as the API endpoint connected to an Express router so can use multiple routes.
`}`
)});
  main.variable(observer("baseURL")).define("baseURL", function(){return(
"https://endpointservice.web.app/notebooks/@endpointservices/login/secrets/endpointservices_secretadmin_service_account_key"
)});
  main.variable(observer()).define(["deploy","handleWithExpress","api"], function(deploy,handleWithExpress,api){return(
deploy("default", handleWithExpress(api), {
  // Admin account can mint custom login tokens and encrypt cookies
  secrets: ['endpointservices_secretadmin_service_account_key'],
  modifiers: ["terminal"]
})
)});
  main.variable(observer("api")).define("api", ["Router","cookieParser","signinHandler","checkHandler","signoutHandler"], function(Router,cookieParser,signinHandler,checkHandler,signoutHandler)
{
  const api = Router();
  api.use((req, res, next) => {
    const cookieHandler = cookieParser(req.context.secrets['endpointservices_secretadmin_service_account_key'])
    cookieHandler(req, res, next)
  });
  api.post('/signin', signinHandler);
  api.post('/check', checkHandler);
  api.post('/signout', signoutHandler);
  return api
}
);
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`## /signin

Exchanges a Firebase auth ID token for a encrypted cookie containing the user's _uid_.

Can only be called from Endpoint Service notebooks. If the token is suitable, the server sets a cookie that will be submitted to other login endpoints regardless what origin the call is made from.
`}`
)});
  main.variable(observer("checkToken")).define("checkToken", ["verifyIdToken","firebase","firebaseConfig"], function(verifyIdToken,firebase,firebaseConfig){return(
async function checkToken(idToken) {
  const jwt = await verifyIdToken(firebase, idToken);
  const secondsSinceIssued = (Date.now() - new Date(jwt.iat * 1000)) / 1000;
  if (secondsSinceIssued > 60 * 60)
    throw new Error("Iat too old");
  if (!firebaseConfig.uiConfig.signInOptions.includes(jwt.firebase.sign_in_provider)) 
    throw new Error("Not approved signin provider: " + jwt.firebase.sign_in_provider);
  return jwt;
}
)});
  main.variable(observer("signinHandler")).define("signinHandler", ["checkToken"], function(checkToken){return(
async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://endpointservices.static.observableusercontent.com')
  res.header('Access-Control-Allow-Credentials', 'true')
  
  try {
    const jwt = await checkToken(req.body);
    res.cookie('endpointservicesuser',
      jwt.uid /* Firebase id */, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day expiry
        httpOnly: true, // Not availible in JS env
        secure: true,   // Https only
        signed: true,   // Encrypted
        path: '/notebooks/@endpointservices/login', // Prevent access from other notebooks
        sameSite: 'None'
      });
    res.status(200).end();
  } catch (err) {
    const msg = err.message;
    console.error(msg);
    res.status(403).send(msg);
  }
}
)});
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`## /check

Use /check to retrieve a custom auth token for cross domain use.

If a signed cookie is present federated credentials will be sent, otherwise the user should use /signin first.
`}`
)});
  main.variable(observer("checkHandler")).define("checkHandler", ["getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","isOwner","subdomain","createCustomToken"], function(getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,isOwner,subdomain,createCustomToken){return(
async (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.signedCookies && req.signedCookies.endpointservicesuser) {
    const uid = req.signedCookies.endpointservicesuser;
    const sa = JSON.parse(req.context.secrets['endpointservices_secretadmin_service_account_key']);
    const access_token = await getAccessTokenFromServiceAccount(sa);
    await signinWithAccessToken(firebase, access_token)
    
    if (req.headers.origin === "https://endpointservices.static.observableusercontent.com" || await isOwner(uid, subdomain(req.headers.origin))) {
      console.log(`Minting ${uid} from ${subdomain(req.headers.origin)}`)
      res.send(await createCustomToken(sa, uid));
    } else {
      // Signin token present but user is calling from an origin that is not allowed federation
      res.status(403).end()
    }
  } else {
    res.status(401).end() // No signin token present
  }
}
)});
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`## /signout
Clears cookie
`}`
)});
  main.variable(observer("signoutHandler")).define("signoutHandler", function(){return(
async (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  
  try {
    res.clearCookie('endpointservicesuser', {
        httpOnly: true, // Not availible in JS env
        secure: true,   // Https only
        signed: true,   // Encrypted
        path: '/notebooks/@endpointservices/login', // Prevent access from other notebooks
        sameSite: 'None'
      });
    res.status(200).end();
  } catch (err) {
    const msg = err.message;
    console.error(msg);
    res.status(500).send(msg);
  }
}
)});
  main.variable(observer()).define(["html","md"], function(html,md){return(
html`<div class="content"> ${
md`
---
## Imports
`}`
)});
  main.variable(observer("cookieParser")).define("cookieParser", ["require"], function(require){return(
require('cookie-parser-browserify@1.4.8')
)});
  main.variable(observer()).define(["bulma"], function(bulma){return(
bulma
)});
  const child1 = runtime.module(define1);
  main.import("createCustomToken", child1);
  main.import("verifyIdToken", child1);
  main.import("getAccessTokenFromServiceAccount", child1);
  main.import("signinWithAccessToken", child1);
  const child2 = runtime.module(define2);
  main.import("viewof user", "viewof firebaseUser", child2);
  main.import("user", "firebaseUser", child2);
  main.import("firebaseConfig", child2);
  main.import("firebase", child2);
  main.import("listen", child2);
  main.import("subdomain", child2);
  main.import("isOwner", child2);
  const child3 = runtime.module(define3);
  main.import("Router", child3);
  main.import("handleWithExpress", child3);
  main.import("deploy", child3);
  const child4 = runtime.module(define4);
  main.import("html", child4);
  const child5 = runtime.module(define5);
  main.import("bulma", child5);
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
