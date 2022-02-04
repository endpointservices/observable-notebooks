// https://observablehq.com/@tomlarkworthy/oauth@459
import define1 from "./ef672b935bd480fc@619.js";
import define2 from "./c2dae147641e012a@46.js";
import define3 from "./316f0885d15ab671@65.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Oauth 2.0 Client

Login to 3rd party services like Github/Reddit and obtain an 'access_token' for API usage or identification purposes. 

Working examples found [here](https://observablehq.com/@tomlarkworthy/oauth-examples).

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Outputs`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The authorization link is where users need to be redirected to, in order to login. Probably put it in an anchor on a login form.`
)});
  main.variable(observer("authorize_link")).define("authorize_link", ["initial_state","exchange_token","state","AUTHORIZE_URL","encodeParams","CLIENT_ID","REDIRECT_URI","RESPONSE_TYPE","SCOPES"], function(initial_state,exchange_token,state,AUTHORIZE_URL,encodeParams,CLIENT_ID,REDIRECT_URI,RESPONSE_TYPE,SCOPES)
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
);
  main.variable(observer()).define(["md"], function(md){return(
md`The state parameter will provide information about the _status_ of the authorization process, and will contain the *access_token*`
)});
  main.define("initial state", ["STORAGE_BACKEND","CLIENT_ID","AUTHORIZE_URL"], async function(STORAGE_BACKEND,CLIENT_ID,AUTHORIZE_URL)
{
  try {
    return JSON.parse(await STORAGE_BACKEND.getItem(CLIENT_ID + AUTHORIZE_URL));
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
);
  main.variable(observer("mutable state")).define("mutable state", ["Mutable", "initial state"], (M, _) => new M(_));
  main.variable(observer("state")).define("state", ["mutable state"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`## Config

You will have to set the necessary configuration parameters at import time. 
`
)});
  main.variable(observer("CLIENT_ID")).define("CLIENT_ID", function(){return(
undefined
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The name under which the secret has been stored using Serverless Cell [secrets](https://observablehq.com/@endpointservices/secrets). Don't put the actual secret here.`
)});
  main.variable(observer("CLIENT_SECRET_SECRET_NAME")).define("CLIENT_SECRET_SECRET_NAME", function(){return(
undefined
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_If_ sending the client secret in the parameters, what is the name of the parameter? (e.g. client_secret)`
)});
  main.variable(observer("CLIENT_SECRET_PARAMETER_NAME")).define("CLIENT_SECRET_PARAMETER_NAME", function(){return(
undefined
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Use basic auth to authenticate with token endpoint?`
)});
  main.variable(observer("USE_BASIC_AUTH")).define("USE_BASIC_AUTH", function(){return(
null
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Endpoint used to initiate auth flow`
)});
  main.variable(observer("AUTHORIZE_URL")).define("AUTHORIZE_URL", function(){return(
undefined
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Endpoint later used to change a code for a token.`
)});
  main.variable(observer("TOKEN_URL")).define("TOKEN_URL", function(){return(
undefined
)});
  main.variable(observer("TOKEN_PARAMS")).define("TOKEN_PARAMS", function(){return(
args => ({})
)});
  main.variable(observer("TOKEN_HEADERS")).define("TOKEN_HEADERS", function(){return(
args => ({})
)});
  main.variable(observer("TOKEN_BODY")).define("TOKEN_BODY", function(){return(
() => undefined
)});
  main.variable(observer("RESPONSE_TYPE")).define("RESPONSE_TYPE", function(){return(
"code"
)});
  main.variable(observer("REDIRECT_URI")).define("REDIRECT_URI", ["html"], function(html)
{
  const url = new URL(html`<a href="">`.href);
  url.search = "";
  url.hash = "";
  return url.toString();
}
);
  main.variable(observer("SCOPES")).define("SCOPES", function(){return(
[]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`By default we use local storage with an in-memory fallback for storing the Oauth session state parameter, but you can bring your own. Just define setItem and getItem`
)});
  main.variable(observer("STORAGE_BACKEND")).define("STORAGE_BACKEND", ["localStorage"], function(localStorage){return(
localStorage
)});
  main.variable(observer("CORS_BYPASS")).define("CORS_BYPASS", function(){return(
false
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## State machine`
)});
  main.variable(observer("setState")).define("setState", ["CLIENT_ID","STORAGE_BACKEND","AUTHORIZE_URL","mutable state"], function(CLIENT_ID,STORAGE_BACKEND,AUTHORIZE_URL,$0){return(
async function setState(newState) {
  if (!CLIENT_ID) return;
  await STORAGE_BACKEND.setItem(
    CLIENT_ID + AUTHORIZE_URL,
    JSON.stringify(newState)
  );
  $0.value = newState;
}
)});
  main.variable(observer("initial_state")).define("initial_state", ["state","CLIENT_ID","setState","randomId","mutable state"], async function(state,CLIENT_ID,setState,randomId,$0)
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
);
  main.variable(observer("exchange_token")).define("exchange_token", ["state","pageParams","exchange"], function(state,pageParams,exchange)
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
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Calculated values`
)});
  main.variable(observer("pageParams")).define("pageParams", ["URLSearchParams","location"], function(URLSearchParams,location)
{
  const urlParams = new URLSearchParams(location.search);
  return Object.fromEntries(urlParams);
}
);
  main.variable(observer("encodeParams")).define("encodeParams", function(){return(
p =>
  Object.entries(p)
    .map(kv => kv.map(encodeURIComponent).join("="))
    .join("&")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Token exchange`
)});
  main.variable(observer("exchange")).define("exchange", ["pageParams","resolveConfig","TOKEN_URL","encodeParams","TOKEN_PARAMS","CLIENT_SECRET_SECRET_NAME","CORS_BYPASS","tokenProxy","TOKEN_HEADERS","TOKEN_BODY","decodeToken","setState","randomId"], function(pageParams,resolveConfig,TOKEN_URL,encodeParams,TOKEN_PARAMS,CLIENT_SECRET_SECRET_NAME,CORS_BYPASS,tokenProxy,TOKEN_HEADERS,TOKEN_BODY,decodeToken,setState,randomId){return(
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
)});
  main.variable(observer("tokenDomains")).define("tokenDomains", ["TOKEN_URL"], function(TOKEN_URL){return(
TOKEN_URL ? [new URL(TOKEN_URL).host] : []
)});
  main.variable(observer("tokenSecretParams")).define("tokenSecretParams", ["CLIENT_SECRET_PARAMETER_NAME","CLIENT_SECRET_SECRET_NAME"], function(CLIENT_SECRET_PARAMETER_NAME,CLIENT_SECRET_SECRET_NAME)
{
  if (CLIENT_SECRET_PARAMETER_NAME) {
    return {
      [CLIENT_SECRET_PARAMETER_NAME]: CLIENT_SECRET_SECRET_NAME
    };
  } else {
    return {};
  }
}
);
  main.variable(observer("tokenBasicAuth")).define("tokenBasicAuth", ["USE_BASIC_AUTH","CLIENT_ID","CLIENT_SECRET_SECRET_NAME"], function(USE_BASIC_AUTH,CLIENT_ID,CLIENT_SECRET_SECRET_NAME)
{
  if (USE_BASIC_AUTH) {
    return {
      protocol: 'RFC 7617',
      username: CLIENT_ID,
      passwordSecret: CLIENT_SECRET_SECRET_NAME
    };
  }
}
);
  const child1 = runtime.module(define1).derive([{name: "tokenDomains", alias: "ALLOW_DOMAINS"},{name: "tokenSecretParams", alias: "SECRET_PARAMS"},{name: "tokenBasicAuth", alias: "BASIC_AUTH"}], main);
  main.import("fetchp", "tokenProxy", child1);
  main.variable(observer("decodeToken")).define("decodeToken", ["URLSearchParams"], function(URLSearchParams){return(
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
)});
  main.variable(observer("resolveConfig")).define("resolveConfig", ["CLIENT_ID","REDIRECT_URI","SCOPES","pageParams","state"], function(CLIENT_ID,REDIRECT_URI,SCOPES,pageParams,state){return(
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
)});
  const child2 = runtime.module(define2);
  main.import("localStorage", child2);
  const child3 = runtime.module(define3);
  main.import("randomId", child3);
  return main;
}
