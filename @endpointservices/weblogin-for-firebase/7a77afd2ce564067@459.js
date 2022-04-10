// https://observablehq.com/@tomlarkworthy/oauth@459
import define1 from "./ef672b935bd480fc@619.js";
import define2 from "./c2dae147641e012a@46.js";
import define3 from "./316f0885d15ab671@65.js";

function _1(md){return(
md`# Oauth 2.0 Client

Login to 3rd party services like Github/Reddit and obtain an 'access_token' for API usage or identification purposes. 

Working examples found [here](https://observablehq.com/@tomlarkworthy/oauth-examples).

`
)}

function _2(md){return(
md`## Outputs`
)}

function _3(md){return(
md`The authorization link is where users need to be redirected to, in order to login. Probably put it in an anchor on a login form.`
)}

function _authorize_link(initial_state,exchange_token,state,AUTHORIZE_URL,encodeParams,CLIENT_ID,REDIRECT_URI,RESPONSE_TYPE,SCOPES)
{
  // Reference the state transition rules
  initial_state;
  exchange_token;

  return (
    state &&
    AUTHORIZE_URL &&
    `${AUTHORIZE_URL}?${encodeParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: RESPONSE_TYPE,
      scope: SCOPES.join(" "),
      state: state.state
    })}`
  );
}


function _5(md){return(
md`The state parameter will provide information about the _status_ of the authorization process, and will contain the *access_token*`
)}

async function _state(STORAGE_BACKEND,CLIENT_ID,AUTHORIZE_URL)
{
  try {
    return JSON.parse(await STORAGE_BACKEND.getItem(CLIENT_ID + AUTHORIZE_URL));
  } catch (err) {
    console.error(err);
    return undefined;
  }
}


function _7(md){return(
md`## Config

You will have to set the necessary configuration parameters at import time. 
`
)}

function _CLIENT_ID(){return(
undefined
)}

function _9(md){return(
md`The name under which the secret has been stored using Serverless Cell [secrets](https://observablehq.com/@endpointservices/secrets). Don't put the actual secret here.`
)}

function _CLIENT_SECRET_SECRET_NAME(){return(
undefined
)}

function _11(md){return(
md`_If_ sending the client secret in the parameters, what is the name of the parameter? (e.g. client_secret)`
)}

function _CLIENT_SECRET_PARAMETER_NAME(){return(
undefined
)}

function _13(md){return(
md`Use basic auth to authenticate with token endpoint?`
)}

function _USE_BASIC_AUTH(){return(
null
)}

function _15(md){return(
md`Endpoint used to initiate auth flow`
)}

function _AUTHORIZE_URL(){return(
undefined
)}

function _17(md){return(
md`Endpoint later used to change a code for a token.`
)}

function _TOKEN_URL(){return(
undefined
)}

function _TOKEN_PARAMS(){return(
args => ({})
)}

function _TOKEN_HEADERS(){return(
args => ({})
)}

function _TOKEN_BODY(){return(
() => undefined
)}

function _RESPONSE_TYPE(){return(
"code"
)}

function _REDIRECT_URI(html)
{
  const url = new URL(html`<a href="">`.href);
  url.search = "";
  url.hash = "";
  return url.toString();
}


function _SCOPES(){return(
[]
)}

function _25(md){return(
md`By default we use local storage with an in-memory fallback for storing the Oauth session state parameter, but you can bring your own. Just define setItem and getItem`
)}

function _STORAGE_BACKEND(localStorage){return(
localStorage
)}

function _CORS_BYPASS(){return(
false
)}

function _28(md){return(
md`## State machine`
)}

function _setState(CLIENT_ID,STORAGE_BACKEND,AUTHORIZE_URL,$0){return(
async function setState(newState) {
  if (!CLIENT_ID) return;
  await STORAGE_BACKEND.setItem(
    CLIENT_ID + AUTHORIZE_URL,
    JSON.stringify(newState)
  );
  $0.value = newState;
}
)}

async function _initial_state(state,CLIENT_ID,setState,randomId,$0)
{
  if (!state && CLIENT_ID) {
    await setState({
      status: "unauthorized",
      state: randomId()
    });
  } else if (!state && !CLIENT_ID) {
    $0.value = {
      status: "unconfigured"
    };
  }
}


function _exchange_token(state,pageParams,exchange)
{
  if (
    state &&
    state.last_code !== pageParams.code &&
    pageParams.code &&
    state.state === pageParams.state
  ) {
    exchange();
  }
}


function _32(md){return(
md`## Calculated values`
)}

function _pageParams(URLSearchParams,location)
{
  const urlParams = new URLSearchParams(location.search);
  return Object.fromEntries(urlParams);
}


function _encodeParams(){return(
p =>
  Object.entries(p)
    .map(kv => kv.map(encodeURIComponent).join("="))
    .join("&")
)}

function _35(md){return(
md`## Token exchange`
)}

function _exchange(pageParams,resolveConfig,TOKEN_URL,encodeParams,TOKEN_PARAMS,CLIENT_SECRET_SECRET_NAME,CORS_BYPASS,tokenProxy,TOKEN_HEADERS,TOKEN_BODY,decodeToken,setState,randomId){return(
async () => {
  if (!pageParams.code) throw new Error("No CODE to exchange");

  const exchange_url = `${resolveConfig(TOKEN_URL)}?${encodeParams(
    resolveConfig(TOKEN_PARAMS)
  )}`;

  const fetchFn = CLIENT_SECRET_SECRET_NAME || CORS_BYPASS ? tokenProxy : fetch;

  const tokenResponse = await fetchFn(exchange_url, {
    method: "POST",
    headers: resolveConfig(TOKEN_HEADERS),
    body: resolveConfig(TOKEN_BODY)
  });

  try {
    const token = await decodeToken(tokenResponse);
    await setState({
      status: "authorized",
      access_token: token,
      last_code: pageParams.code,
      state: randomId()
    });
  } catch (err) {
    await setState({
      error: err.message,
      status: "unauthorized",
      last_code: pageParams.code,
      state: randomId()
    });
  }
}
)}

function _tokenDomains(TOKEN_URL){return(
TOKEN_URL ? [new URL(TOKEN_URL).host] : []
)}

function _tokenSecretParams(CLIENT_SECRET_PARAMETER_NAME,CLIENT_SECRET_SECRET_NAME)
{
  if (CLIENT_SECRET_PARAMETER_NAME) {
    return {
      [CLIENT_SECRET_PARAMETER_NAME]: CLIENT_SECRET_SECRET_NAME
    };
  } else {
    return {};
  }
}


function _tokenBasicAuth(USE_BASIC_AUTH,CLIENT_ID,CLIENT_SECRET_SECRET_NAME)
{
  if (USE_BASIC_AUTH) {
    return {
      protocol: 'RFC 7617',
      username: CLIENT_ID,
      passwordSecret: CLIENT_SECRET_SECRET_NAME
    };
  }
}


function _decodeToken(URLSearchParams){return(
async response => {
  if (response.status !== 200)
    throw new Error(`Status: ${response.status} ${await response.text()}`);
  const responseText = await response.text();

  // Try JSON decode
  try {
    return JSON.parse(responseText).access_token;
  } catch (err) {
    // OK if not a JSON
  }

  // Try Form decode
  const token = new URLSearchParams(responseText).get('access_token');
  if (token !== null) {
    return token;
  } else {
    throw new Error(`Cannot find token in response: ${responseText}`);
  }
}
)}

function _resolveConfig(CLIENT_ID,REDIRECT_URI,SCOPES,pageParams,state){return(
arg => {
  if (typeof arg === 'function') {
    return arg({
      CLIENT_ID,
      REDIRECT_URI,
      SCOPES,
      code: pageParams.code,
      state: state.state
    });
  } else {
    return arg;
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("authorize_link")).define("authorize_link", ["initial_state","exchange_token","state","AUTHORIZE_URL","encodeParams","CLIENT_ID","REDIRECT_URI","RESPONSE_TYPE","SCOPES"], _authorize_link);
  main.variable(observer()).define(["md"], _5);
  main.define("initial state", ["STORAGE_BACKEND","CLIENT_ID","AUTHORIZE_URL"], _state);
  main.variable(observer("mutable state")).define("mutable state", ["Mutable", "initial state"], (M, _) => new M(_));
  main.variable(observer("state")).define("state", ["mutable state"], _ => _.generator);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("CLIENT_ID")).define("CLIENT_ID", _CLIENT_ID);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("CLIENT_SECRET_SECRET_NAME")).define("CLIENT_SECRET_SECRET_NAME", _CLIENT_SECRET_SECRET_NAME);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("CLIENT_SECRET_PARAMETER_NAME")).define("CLIENT_SECRET_PARAMETER_NAME", _CLIENT_SECRET_PARAMETER_NAME);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("USE_BASIC_AUTH")).define("USE_BASIC_AUTH", _USE_BASIC_AUTH);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("AUTHORIZE_URL")).define("AUTHORIZE_URL", _AUTHORIZE_URL);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("TOKEN_URL")).define("TOKEN_URL", _TOKEN_URL);
  main.variable(observer("TOKEN_PARAMS")).define("TOKEN_PARAMS", _TOKEN_PARAMS);
  main.variable(observer("TOKEN_HEADERS")).define("TOKEN_HEADERS", _TOKEN_HEADERS);
  main.variable(observer("TOKEN_BODY")).define("TOKEN_BODY", _TOKEN_BODY);
  main.variable(observer("RESPONSE_TYPE")).define("RESPONSE_TYPE", _RESPONSE_TYPE);
  main.variable(observer("REDIRECT_URI")).define("REDIRECT_URI", ["html"], _REDIRECT_URI);
  main.variable(observer("SCOPES")).define("SCOPES", _SCOPES);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("STORAGE_BACKEND")).define("STORAGE_BACKEND", ["localStorage"], _STORAGE_BACKEND);
  main.variable(observer("CORS_BYPASS")).define("CORS_BYPASS", _CORS_BYPASS);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("setState")).define("setState", ["CLIENT_ID","STORAGE_BACKEND","AUTHORIZE_URL","mutable state"], _setState);
  main.variable(observer("initial_state")).define("initial_state", ["state","CLIENT_ID","setState","randomId","mutable state"], _initial_state);
  main.variable(observer("exchange_token")).define("exchange_token", ["state","pageParams","exchange"], _exchange_token);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("pageParams")).define("pageParams", ["URLSearchParams","location"], _pageParams);
  main.variable(observer("encodeParams")).define("encodeParams", _encodeParams);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("exchange")).define("exchange", ["pageParams","resolveConfig","TOKEN_URL","encodeParams","TOKEN_PARAMS","CLIENT_SECRET_SECRET_NAME","CORS_BYPASS","tokenProxy","TOKEN_HEADERS","TOKEN_BODY","decodeToken","setState","randomId"], _exchange);
  main.variable(observer("tokenDomains")).define("tokenDomains", ["TOKEN_URL"], _tokenDomains);
  main.variable(observer("tokenSecretParams")).define("tokenSecretParams", ["CLIENT_SECRET_PARAMETER_NAME","CLIENT_SECRET_SECRET_NAME"], _tokenSecretParams);
  main.variable(observer("tokenBasicAuth")).define("tokenBasicAuth", ["USE_BASIC_AUTH","CLIENT_ID","CLIENT_SECRET_SECRET_NAME"], _tokenBasicAuth);
  const child1 = runtime.module(define1).derive([{name: "tokenDomains", alias: "ALLOW_DOMAINS"},{name: "tokenSecretParams", alias: "SECRET_PARAMS"},{name: "tokenBasicAuth", alias: "BASIC_AUTH"}], main);
  main.import("fetchp", "tokenProxy", child1);
  main.variable(observer("decodeToken")).define("decodeToken", ["URLSearchParams"], _decodeToken);
  main.variable(observer("resolveConfig")).define("resolveConfig", ["CLIENT_ID","REDIRECT_URI","SCOPES","pageParams","state"], _resolveConfig);
  const child2 = runtime.module(define2);
  main.import("localStorage", child2);
  const child3 = runtime.module(define3);
  main.import("randomId", child3);
  return main;
}
