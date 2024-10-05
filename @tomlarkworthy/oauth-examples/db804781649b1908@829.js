// https://observablehq.com/@tomlarkworthy/oauth-examples@829
import define1 from "./7a77afd2ce564067@459.js";
import define2 from "./dff1e917c89f5e76@1964.js";
import define3 from "./993a0c51ef1175ea@1396.js";
import define4 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Oauth 2.0 Client Examples

These are preconfigured clients that can authorize *this* notebook. You would need to create your own secrets and *client_id* and *redirect_uri*'s if you were to host your own, but here you can experience it working.

We only support the Oauth 2.0 _ Authorization Code_ grant flow. For high level documentation on Oauth 2.0, I recommend [Auth0](https://auth0.com/docs/protocols/protocol-oauth2)'s.

Each Oauth client runs its own [proxy](https://observablehq.com/@tomlarkworthy/fetchp) which injects [secrets](https://observablehq.com/@endpointservices/secrets) during transit outside the browser environment.

The Oauth Client Example here are for-
- [RelMeAuth](#relmeauth)
- [Github](#github)
- [Reddit](#reddit)
- [Google](#google)
- [Strava](#strava)

We do not suppor PCKE yet, but the [IndieAuth server](https://observablehq.com/@endpointservices/auth) does do a PKCE handshake including the b64S256 hash function when talking to an upstream indie auth endpoint.
`
)}

function _relmeauth(md){return(
md`## Login to an RelMeAuth server

Login using a URL to a privacy preserving authorization server hosted [on Observable](https://observablehq.com/@endpointservices/relmeauth).
`
)}

function _3(html,relmeauth_link){return(
html`<a href="${relmeauth_link}">login to RelMeAuth on @endpointservices</a>`
)}

function _4(relmeauth_link){return(
relmeauth_link
)}

function _5(relmeauth_state){return(
relmeauth_state
)}

function _6(relmeauth_state){return(
relmeauth_state.access_token
)}

function _RELMEAUTH_CLIENT_ID(){return(
"https://observablehq.com/@tomlarkworthy/oauth-examples"
)}

function _RELMEAUTH_AUTHORIZE_URL(){return(
"https://webcode.run/notebooks/@endpointservices/auth/deploys/authorization_endpoint/mods/X/secrets/endpointservices_secretadmin_service_account_key"
)}

function _RELMEAUTH_TOKEN_URL(){return(
"https://webcode.run/notebooks/@endpointservices/auth/deploys/token_endpoint/mods/X/secrets/endpointservices_secretadmin_service_account_key,endpointservices_minter"
)}

function _RELMEAUTH_TOKEN_PARAMS(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  scope: args.SCOPES.join(" "),
  code: args.code,
  state: args.state
})
)}

function _github(md){return(
md`## Github example`
)}

function _13(md){return(
md`Github App are configured at [/settings/apps](https://github.com/settings/apps). Technical documentation is [here](https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps).`
)}

function _14(html,github_link){return(
html`<a href="${github_link}">login to Github</a>`
)}

function _15(github_state){return(
github_state
)}

function _GITHUB_CLIENT_SECRET_SECRET_NAME(){return(
"tomlarkworthy_github_client_secret"
)}

function _GITHUB_CLIENT_SECRET_PARAMETER_NAME(){return(
"client_secret"
)}

function _GITHUB_CLIENT_ID(){return(
"Iv1.058b3e2cc86bdb17"
)}

function _GITHUB_AUTHORIZE_URL(){return(
'https://github.com/login/oauth/authorize'
)}

function _GITHUB_TOKEN_URL(){return(
"https://github.com/login/oauth/access_token"
)}

function _GITHUB_TOKEN_PARAMS(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  scope: args.SCOPES.join(" "),
  code: args.code,
  state: args.state
})
)}

function _github_storage(md){return(
md`## Github multi tenancy external storage example`
)}

function _24(md){return(
md`Here we investigate how to set up shared storage of the auth state. Note in this example the database is publically readable, so the *auth_tokens* are public! However, we do not ask for any scopes so they have limited power.

In a real situation you would need to secure these, for example, run the browsers in a privileged environment like [serverless cells](https://www.producthunt.com/posts/serverless-cells). The purpose of this is to document how to inject a custom storage backend for the Auth clients.

We also show how to do dynamic lookup of the tenant despite the redirect_uri being different to the source notebook. This indirection is, for instance, we you could keep the access_tokens hidden from the end user.
`
)}

function _25(html){return(
html`<a href="https://observablehq.com/@tomlarkworthy/oauth-examples?tenant=tom#github_storage"> Switch to tenant</a>`
)}

function _26(html,github_storage_link,tenant){return(
html`<a href="${github_storage_link}">login to Github as ${tenant}</a>`
)}

function _GITHUB_REDIRECT_URI(deploy,firebase){return(
deploy("github_storage_redirect", async (req, res) => {
  // From the state parameter we can figure out the tenant that used it.
  const tenant = (await firebase
    .database()
    .ref(`@tomlarkworthy/oauth-examples/${req.query.state}`)
    .once('value')).val();
  res.redirect(
    `https://observablehq.com/@tomlarkworthy/oauth-examples?tenant=${tenant}&state=${req.query.state}&code=${req.query.code}#github_storage`
  );
})
)}

function _29(github_storage_state){return(
github_storage_state
)}

function _tenant(URLSearchParams,location){return(
new URLSearchParams(location.search).get("tenant")
)}

function _state_to_tenant(github_storage_state,tenant,firebase)
{
  if (github_storage_state.state && tenant)
    return firebase
      .database()
      .ref(`@tomlarkworthy/oauth-examples/${github_storage_state.state}`)
      .set(tenant);
}


function _firebaseConfig(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _34(md){return(
md`
   Security rules look like

~~~js
{
  "rules": {
    "@tomlarkworthy": {
      "oauth-examples": {
      	"$tenant": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
~~~
`
)}

function _ref(firebase,tenant){return(
firebase.database().ref(`/@tomlarkworthy/oauth-examples/${tenant}`)
)}

function _36(md){return(
md`In a multitenancy situation we want the current user to be included in the redirect URL`
)}

function _GITHUB_STORAGE_BACKEND(ref){return(
{
  getItem: async key => (await ref.child(btoa(key)).once('value')).val(),
  setItem: async (key, value) => await ref.child(btoa(key)).set(value)
}
)}

function _reddit(md){return(
md`## Reddit example`
)}

function _40(md){return(
md`[Reddit Oauth 2.0 instructuctions](https://github.com/reddit-archive/reddit/wiki/OAuth2). Apps can be created at [/prefs/apps](https://www.reddit.com/prefs/apps).`
)}

function _41(html,reddit_link){return(
html`<a href="${reddit_link}">login to Reddit</a>`
)}

function _42(reddit_state){return(
reddit_state
)}

function _REDDIT_CLIENT_ID(){return(
'HS-UEO2EWugyNg'
)}

function _REDDIT_CLIENT_SECRET_SECRET_NAME(){return(
'tomlarkworthy_reddit_client_secret'
)}

function _REDDIT_USE_BASIC_AUTH(){return(
true
)}

function _REDDIT_AUTHORIZE_URL(){return(
'https://www.reddit.com/api/v1/authorize'
)}

function _REDDIT_TOKEN_URL(){return(
'https://www.reddit.com/api/v1/access_token'
)}

function _REDDIT_TOKEN_BODY(){return(
args => {
  return `grant_type=authorization_code&code=${args.code}&redirect_uri=${args.REDIRECT_URI}`;
}
)}

function _REDDIT_TOKEN_HEADERS(){return(
{
  'content-type': 'application/x-www-form-urlencoded'
}
)}

function _REDDIT_SCOPES(){return(
['read']
)}

function _google(md){return(
md`## Google`
)}

function _53(md){return(
md`Oauth 2.0 credentials can be minted in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Information on the web-server authentication flow is [here](https://developers.google.com/identity/protocols/oauth2/web-server).`
)}

function _54(html,google_link){return(
html`<a href="${google_link}">login to Google</a>`
)}

function _55(google_state){return(
google_state
)}

function _GOOGLE_CLIENT_ID(){return(
'1986724398-5adiabbdrs6lrdh54m25nv9l2afjvl2q.apps.googleusercontent.com'
)}

function _GOOGLE_CLIENT_SECRET_SECRET_NAME(){return(
'tomlarkworthy_google_client_secret'
)}

function _GOOGLE_CLIENT_SECRET_PARAMETER_NAME(){return(
"client_secret"
)}

function _GOOGLE_AUTHORIZE_URL(){return(
'https://accounts.google.com/o/oauth2/v2/auth'
)}

function _GOOGLE_TOKEN_URL(){return(
'https://oauth2.googleapis.com/token'
)}

function _GOOGLE_TOKEN_HEADERS(){return(
{
  'content-type': 'application/x-www-form-urlencoded'
}
)}

function _GOOGLE_TOKEN_BODY(){return(
args => {
  return (
    `code=${args.code}&client_id=${args.CLIENT_ID}&` +
    `redirect_uri=${args.REDIRECT_URI}&grant_type=authorization_code`
  );
}
)}

function _GOOGLE_SCOPES(){return(
['email']
)}

function _strava(md){return(
md`## Strava`
)}

function _66(html,strava_link){return(
html`<a href="${strava_link}">login to Strava</a>`
)}

function _67(strava_state){return(
strava_state
)}

function _STRAVA_CLIENT_SECRET_SECRET_NAME(){return(
'tomlarkworthy_strava_client_secret'
)}

function _STRAVA_CLIENT_SECRET_PARAMETER_NAME(){return(
'client_secret'
)}

function _STRAVA_CLIENT_ID(){return(
"69457"
)}

function _STRAVA_AUTHORIZE_URL(){return(
'https://www.strava.com/oauth/authorize'
)}

function _STRAVA_TOKEN_URL(){return(
'https://www.strava.com/oauth/token'
)}

function _STRAVA_SCOPES(){return(
["activity:read"]
)}

function _STRAVA_TOKEN_PARAMS(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  scope: args.SCOPES.join(" "),
  code: args.code,
  state: args.state
})
)}

function _77(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("relmeauth")).define("relmeauth", ["md"], _relmeauth);
  main.variable(observer()).define(["html","relmeauth_link"], _3);
  main.variable(observer()).define(["relmeauth_link"], _4);
  main.variable(observer()).define(["relmeauth_state"], _5);
  main.variable(observer()).define(["relmeauth_state"], _6);
  const child1 = runtime.module(define1).derive([{name: "RELMEAUTH_CLIENT_ID", alias: "CLIENT_ID"},{name: "RELMEAUTH_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "RELMEAUTH_TOKEN_URL", alias: "TOKEN_URL"},{name: "RELMEAUTH_TOKEN_PARAMS", alias: "TOKEN_PARAMS"}], main);
  main.import("authorize_link", "relmeauth_link", child1);
  main.import("state", "relmeauth_state", child1);
  main.variable(observer("RELMEAUTH_CLIENT_ID")).define("RELMEAUTH_CLIENT_ID", _RELMEAUTH_CLIENT_ID);
  main.variable(observer("RELMEAUTH_AUTHORIZE_URL")).define("RELMEAUTH_AUTHORIZE_URL", _RELMEAUTH_AUTHORIZE_URL);
  main.variable(observer("RELMEAUTH_TOKEN_URL")).define("RELMEAUTH_TOKEN_URL", _RELMEAUTH_TOKEN_URL);
  main.variable(observer("RELMEAUTH_TOKEN_PARAMS")).define("RELMEAUTH_TOKEN_PARAMS", _RELMEAUTH_TOKEN_PARAMS);
  main.variable(observer("github")).define("github", ["md"], _github);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["html","github_link"], _14);
  main.variable(observer()).define(["github_state"], _15);
  const child2 = runtime.module(define1).derive([{name: "GITHUB_CLIENT_ID", alias: "CLIENT_ID"},{name: "GITHUB_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "GITHUB_CLIENT_SECRET_PARAMETER_NAME", alias: "CLIENT_SECRET_PARAMETER_NAME"},{name: "GITHUB_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "GITHUB_TOKEN_URL", alias: "TOKEN_URL"},{name: "GITHUB_TOKEN_PARAMS", alias: "TOKEN_PARAMS"}], main);
  main.import("authorize_link", "github_link", child2);
  main.import("state", "github_state", child2);
  main.variable(observer("GITHUB_CLIENT_SECRET_SECRET_NAME")).define("GITHUB_CLIENT_SECRET_SECRET_NAME", _GITHUB_CLIENT_SECRET_SECRET_NAME);
  main.variable(observer("GITHUB_CLIENT_SECRET_PARAMETER_NAME")).define("GITHUB_CLIENT_SECRET_PARAMETER_NAME", _GITHUB_CLIENT_SECRET_PARAMETER_NAME);
  main.variable(observer("GITHUB_CLIENT_ID")).define("GITHUB_CLIENT_ID", _GITHUB_CLIENT_ID);
  main.variable(observer("GITHUB_AUTHORIZE_URL")).define("GITHUB_AUTHORIZE_URL", _GITHUB_AUTHORIZE_URL);
  main.variable(observer("GITHUB_TOKEN_URL")).define("GITHUB_TOKEN_URL", _GITHUB_TOKEN_URL);
  main.variable(observer("GITHUB_TOKEN_PARAMS")).define("GITHUB_TOKEN_PARAMS", _GITHUB_TOKEN_PARAMS);
  main.variable(observer("github_storage")).define("github_storage", ["md"], _github_storage);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["html"], _25);
  main.variable(observer()).define(["html","github_storage_link","tenant"], _26);
  const child3 = runtime.module(define2);
  main.import("deploy", child3);
  main.variable(observer("GITHUB_REDIRECT_URI")).define("GITHUB_REDIRECT_URI", ["deploy","firebase"], _GITHUB_REDIRECT_URI);
  main.variable(observer()).define(["github_storage_state"], _29);
  main.variable(observer("tenant")).define("tenant", ["URLSearchParams","location"], _tenant);
  main.variable(observer("state_to_tenant")).define("state_to_tenant", ["github_storage_state","tenant","firebase"], _state_to_tenant);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  const child4 = runtime.module(define3).derive(["firebaseConfig"], main);
  main.import("firebase", child4);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("ref")).define("ref", ["firebase","tenant"], _ref);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("GITHUB_STORAGE_BACKEND")).define("GITHUB_STORAGE_BACKEND", ["ref"], _GITHUB_STORAGE_BACKEND);
  const child5 = runtime.module(define1).derive([{name: "GITHUB_CLIENT_ID", alias: "CLIENT_ID"},{name: "GITHUB_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "GITHUB_CLIENT_SECRET_PARAMETER_NAME", alias: "CLIENT_SECRET_PARAMETER_NAME"},{name: "GITHUB_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "GITHUB_TOKEN_URL", alias: "TOKEN_URL"},{name: "GITHUB_TOKEN_PARAMS", alias: "TOKEN_PARAMS"},{name: "GITHUB_STORAGE_BACKEND", alias: "STORAGE_BACKEND"},{name: "GITHUB_REDIRECT_URI", alias: "REDIRECT_URI"}], main);
  main.import("authorize_link", "github_storage_link", child5);
  main.import("state", "github_storage_state", child5);
  main.variable(observer("reddit")).define("reddit", ["md"], _reddit);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["html","reddit_link"], _41);
  main.variable(observer()).define(["reddit_state"], _42);
  const child6 = runtime.module(define1).derive([{name: "REDDIT_CLIENT_ID", alias: "CLIENT_ID"},{name: "REDDIT_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "REDDIT_USE_BASIC_AUTH", alias: "USE_BASIC_AUTH"},{name: "REDDIT_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "REDDIT_TOKEN_URL", alias: "TOKEN_URL"},{name: "REDDIT_TOKEN_HEADERS", alias: "TOKEN_HEADERS"},{name: "REDDIT_TOKEN_BODY", alias: "TOKEN_BODY"},{name: "REDDIT_SCOPES", alias: "SCOPES"}], main);
  main.import("authorize_link", "reddit_link", child6);
  main.import("state", "reddit_state", child6);
  main.variable(observer("REDDIT_CLIENT_ID")).define("REDDIT_CLIENT_ID", _REDDIT_CLIENT_ID);
  main.variable(observer("REDDIT_CLIENT_SECRET_SECRET_NAME")).define("REDDIT_CLIENT_SECRET_SECRET_NAME", _REDDIT_CLIENT_SECRET_SECRET_NAME);
  main.variable(observer("REDDIT_USE_BASIC_AUTH")).define("REDDIT_USE_BASIC_AUTH", _REDDIT_USE_BASIC_AUTH);
  main.variable(observer("REDDIT_AUTHORIZE_URL")).define("REDDIT_AUTHORIZE_URL", _REDDIT_AUTHORIZE_URL);
  main.variable(observer("REDDIT_TOKEN_URL")).define("REDDIT_TOKEN_URL", _REDDIT_TOKEN_URL);
  main.variable(observer("REDDIT_TOKEN_BODY")).define("REDDIT_TOKEN_BODY", _REDDIT_TOKEN_BODY);
  main.variable(observer("REDDIT_TOKEN_HEADERS")).define("REDDIT_TOKEN_HEADERS", _REDDIT_TOKEN_HEADERS);
  main.variable(observer("REDDIT_SCOPES")).define("REDDIT_SCOPES", _REDDIT_SCOPES);
  main.variable(observer("google")).define("google", ["md"], _google);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["html","google_link"], _54);
  main.variable(observer()).define(["google_state"], _55);
  const child7 = runtime.module(define1).derive([{name: "GOOGLE_CLIENT_ID", alias: "CLIENT_ID"},{name: "GOOGLE_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "GOOGLE_CLIENT_SECRET_PARAMETER_NAME", alias: "CLIENT_SECRET_PARAMETER_NAME"},{name: "GOOGLE_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "GOOGLE_TOKEN_URL", alias: "TOKEN_URL"},{name: "GOOGLE_TOKEN_HEADERS", alias: "TOKEN_HEADERS"},{name: "GOOGLE_TOKEN_BODY", alias: "TOKEN_BODY"},{name: "GOOGLE_SCOPES", alias: "SCOPES"}], main);
  main.import("authorize_link", "google_link", child7);
  main.import("state", "google_state", child7);
  main.variable(observer("GOOGLE_CLIENT_ID")).define("GOOGLE_CLIENT_ID", _GOOGLE_CLIENT_ID);
  main.variable(observer("GOOGLE_CLIENT_SECRET_SECRET_NAME")).define("GOOGLE_CLIENT_SECRET_SECRET_NAME", _GOOGLE_CLIENT_SECRET_SECRET_NAME);
  main.variable(observer("GOOGLE_CLIENT_SECRET_PARAMETER_NAME")).define("GOOGLE_CLIENT_SECRET_PARAMETER_NAME", _GOOGLE_CLIENT_SECRET_PARAMETER_NAME);
  main.variable(observer("GOOGLE_AUTHORIZE_URL")).define("GOOGLE_AUTHORIZE_URL", _GOOGLE_AUTHORIZE_URL);
  main.variable(observer("GOOGLE_TOKEN_URL")).define("GOOGLE_TOKEN_URL", _GOOGLE_TOKEN_URL);
  main.variable(observer("GOOGLE_TOKEN_HEADERS")).define("GOOGLE_TOKEN_HEADERS", _GOOGLE_TOKEN_HEADERS);
  main.variable(observer("GOOGLE_TOKEN_BODY")).define("GOOGLE_TOKEN_BODY", _GOOGLE_TOKEN_BODY);
  main.variable(observer("GOOGLE_SCOPES")).define("GOOGLE_SCOPES", _GOOGLE_SCOPES);
  main.variable(observer("strava")).define("strava", ["md"], _strava);
  main.variable(observer()).define(["html","strava_link"], _66);
  main.variable(observer()).define(["strava_state"], _67);
  main.variable(observer("STRAVA_CLIENT_SECRET_SECRET_NAME")).define("STRAVA_CLIENT_SECRET_SECRET_NAME", _STRAVA_CLIENT_SECRET_SECRET_NAME);
  main.variable(observer("STRAVA_CLIENT_SECRET_PARAMETER_NAME")).define("STRAVA_CLIENT_SECRET_PARAMETER_NAME", _STRAVA_CLIENT_SECRET_PARAMETER_NAME);
  main.variable(observer("STRAVA_CLIENT_ID")).define("STRAVA_CLIENT_ID", _STRAVA_CLIENT_ID);
  main.variable(observer("STRAVA_AUTHORIZE_URL")).define("STRAVA_AUTHORIZE_URL", _STRAVA_AUTHORIZE_URL);
  main.variable(observer("STRAVA_TOKEN_URL")).define("STRAVA_TOKEN_URL", _STRAVA_TOKEN_URL);
  main.variable(observer("STRAVA_SCOPES")).define("STRAVA_SCOPES", _STRAVA_SCOPES);
  main.variable(observer("STRAVA_TOKEN_PARAMS")).define("STRAVA_TOKEN_PARAMS", _STRAVA_TOKEN_PARAMS);
  const child8 = runtime.module(define1).derive([{name: "STRAVA_CLIENT_ID", alias: "CLIENT_ID"},{name: "STRAVA_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "STRAVA_CLIENT_SECRET_PARAMETER_NAME", alias: "CLIENT_SECRET_PARAMETER_NAME"},{name: "STRAVA_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "STRAVA_TOKEN_URL", alias: "TOKEN_URL"},{name: "STRAVA_TOKEN_PARAMS", alias: "TOKEN_PARAMS"},{name: "STRAVA_SCOPES", alias: "SCOPES"}], main);
  main.import("authorize_link", "strava_link", child8);
  main.import("state", "strava_state", child8);
  const child9 = runtime.module(define4);
  main.import("footer", child9);
  main.variable(observer()).define(["footer"], _77);
  return main;
}
