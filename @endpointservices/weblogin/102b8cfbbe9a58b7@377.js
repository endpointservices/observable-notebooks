import define1 from "./7a77afd2ce564067@459.js";
import define2 from "./c2dae147641e012a@46.js";
import define3 from "./ef672b935bd480fc@623.js";
import define4 from "./1131d8b2f152e8a8@463.js";
import define5 from "./293899bef371e135@290.js";

async function _1(bannerImage,FileAttachment){return(
bannerImage(await FileAttachment("Weblogin.png").url(), "User signin with IndieWeb weblogin")
)}

function _2(md){return(
md`# How to create a user respecting signin with [IndieWeb](https://indieweb.org/why) technologies

Allow users to signin with a URL (even one hosted on from an [observablehq.com](observablehq.com) notebook
) and obtain an access token. 

This notebook is a living demo for three different user focussed authorization servers (including one hosted on [Observable](https://observablehq.com/@endpointservices/auth)). 

Reference documentation on setting up an indieauth login can be found on [indielogin.com](https://indielogin.com/api).
`
)}

function _3(md){return(
md`### Select authorization server provider`
)}

function _provider(localStorage,htl)
{
  const initial = localStorage.getItem("provider");
  return htl.html`<select>
    <option selected=${initial ===
      '@endpointservices'}>@endpointservices</option>
    <option selected=${initial === 'indieauth.com'}>indieauth.com</option>
    <option selected=${initial === 'indielogin.com'}>indielogin.com</option>
  </select>`;
}


function _notes(md,provider){return(
{
  "indieauth.com": md`---
#### Note about ${provider}

  [Indieauth.com](https://indieauth.com/) is to be deprecated, but it will mint tokens for public clients.

---
`,
  "indielogin.com": md`---
#### Note about ${provider}

  [indielogin.com](https://indielogin.com/) should be self-hosted. The public service requires a client to be registered.

---
`,
  "@endpointservices": md`---
#### Note about ${provider}

[@endpointservices/auth](https://endpointservice.web.app/notebooks/@endpointservices/auth) will mint tokens for Observable notebooks, and is designed to be easily forked and self-hosted if you wish to add additional public clients. Tokens are compatible with Firebase [custom tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens) and login URL works with 3rd party profile links directly.

---
`
}[provider]
)}

function _6(md){return(
md`## Additional [Scope](https://indieweb.org/scope)

The scope parameter is a space delimineted list of additional access _scopes_. They represent requests by the service to be granted access to additional privilidged access elsewhere. The Authorization server will highlight these to the user and ask for their consent.

For simple services that do not need access to 3rd party privilidged resources they are not needed.
`
)}

function _SCOPE(htl){return(
htl.html`<input type="text" placeholder="e.g. profile email" value="observablehq.com">`
)}

function _8(md,provider){return(
md`#### Config for ${provider}`
)}

function _AUTHORIZE_URL(provider){return(
{
  "indieauth.com": "https://indieauth.com/auth",
  "indielogin.com": "https://indielogin.com/auth",
  "@endpointservices": "https://webcode.run/observablehq.com/@endpointservices/auth;authorization_endpoint"
}[provider]
)}

function _TOKEN_URL(provider){return(
{
  "indieauth.com": "https://tokens.indieauth.com/token",
  "indielogin.com": "https://indielogin.com/token",
  "@endpointservices": "https://webcode.run/observablehq.com/@endpointservices/auth;token_endpoint"
}[provider]
)}

function _CORS_BYPASS(provider){return(
{
  "indieauth.com": true,
  "indielogin.com": true,
  "@endpointservices": false
}[provider]
)}

function _12(md){return(
md`## Example 1: Signin with a prompt for the user's homepage`
)}

function _13(htl,authorize_link,CLIENT_ID,state,SCOPE){return(
htl.html`
<form action="${authorize_link}" method="get">
  <label for="url">Web Address:</label>
  <input id="url" type="text" name="me" placeholder="yourdomain.com" />
  <p><button type="submit">Sign In</button></p>
  <input type="hidden" name="client_id" value="${CLIENT_ID}" />
  <input type="hidden" name="redirect_uri" value="${CLIENT_ID}" />
  <input type="hidden" name="state" value="${state.state}" />
  <input type="hidden" name="scope" value="${SCOPE}" />
</form>
`
)}

function _14(md){return(
md`## Example 2: Signin and and let auth server prompt for their homepage`
)}

function _15(htl,authorize_link,CLIENT_ID,state,SCOPE){return(
htl.html`
<form action="${authorize_link}" method="get">
  <p><button type="submit">Sign In</button></p>
  <input type="hidden" name="client_id" value="${CLIENT_ID}" />
  <input type="hidden" name="redirect_uri" value="${CLIENT_ID}" />
  <input type="hidden" name="state" value="${state.state}" />
  <input type="hidden" name="scope" value="${SCOPE}" />
</form>
`
)}

function _16(md,provider){return(
md`### Signin state for ${provider}`
)}

function _17(state){return(
state
)}

function _token(state){return(
state.access_token
)}

function _decoded_token(token){return(
JSON.stringify(JSON.parse(atob(token.split('.')[1])), null, 2)
)}

function _20(md){return(
md`### Verify tokens

See https://indieweb.org/token-endpoint#Verifying_an_Access_Token
`
)}

async function _verified_token(CORS_BYPASS,fetchp,TOKEN_URL,token)
{
  const fetchfn = CORS_BYPASS ? fetchp : fetch;
  return (await fetchfn(TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })).json();
}


function _22(md){return(
md`## Commmon Oauth 2.0 machinery

Signin is normal Oauth 2.0 so something needs to check state parameter after redirect and exchange a code for a token`
)}

function _23(authorize_link){return(
authorize_link
)}

function _CLIENT_ID(){return(
"https://observablehq.com/@tomlarkworthy/howto-indieauth"
)}

function _TOKEN_PARAMS(){return(
args => ({
  client_id: args.CLIENT_ID,
  redirect_uri: args.REDIRECT_URI,
  code: args.code,
  state: args.state
})
)}

function _27(localStorage,provider)
{
  localStorage.setItem("provider", provider);
}


function _32(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Weblogin.png", {url: new URL("./files/ca8a76de87199997679a9cf7731f7a13c101f90dc661ba5bb1a39cedb6a817ea74c588fe3dc1a46a78f147f99ef2e0c5678e050a4f26ac4d81e95a8c9dce93e9.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["bannerImage","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof provider")).define("viewof provider", ["localStorage","htl"], _provider);
  main.variable(observer("provider")).define("provider", ["Generators", "viewof provider"], (G, _) => G.input(_));
  main.variable(observer("notes")).define("notes", ["md","provider"], _notes);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof SCOPE")).define("viewof SCOPE", ["htl"], _SCOPE);
  main.variable(observer("SCOPE")).define("SCOPE", ["Generators", "viewof SCOPE"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","provider"], _8);
  main.variable(observer("AUTHORIZE_URL")).define("AUTHORIZE_URL", ["provider"], _AUTHORIZE_URL);
  main.variable(observer("TOKEN_URL")).define("TOKEN_URL", ["provider"], _TOKEN_URL);
  main.variable(observer("CORS_BYPASS")).define("CORS_BYPASS", ["provider"], _CORS_BYPASS);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["htl","authorize_link","CLIENT_ID","state","SCOPE"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["htl","authorize_link","CLIENT_ID","state","SCOPE"], _15);
  main.variable(observer()).define(["md","provider"], _16);
  main.variable(observer()).define(["state"], _17);
  main.variable(observer("token")).define("token", ["state"], _token);
  main.variable(observer("decoded_token")).define("decoded_token", ["token"], _decoded_token);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("verified_token")).define("verified_token", ["CORS_BYPASS","fetchp","TOKEN_URL","token"], _verified_token);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["authorize_link"], _23);
  const child1 = runtime.module(define1).derive(["CLIENT_ID",{name: "CLIENT_ID", alias: "REDIRECT_URI"},"AUTHORIZE_URL","TOKEN_URL","TOKEN_PARAMS","CORS_BYPASS"], main);
  main.import("authorize_link", child1);
  main.import("state", child1);
  main.variable(observer("CLIENT_ID")).define("CLIENT_ID", _CLIENT_ID);
  main.variable(observer("TOKEN_PARAMS")).define("TOKEN_PARAMS", _TOKEN_PARAMS);
  main.variable(observer()).define(["localStorage","provider"], _27);
  const child2 = runtime.module(define2);
  main.import("localStorage", child2);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  const child4 = runtime.module(define4);
  main.import("bannerImage", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _32);
  return main;
}
