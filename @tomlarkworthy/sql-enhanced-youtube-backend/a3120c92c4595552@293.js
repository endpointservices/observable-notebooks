import define1 from "./698257e86fae4586@378.js";
import define2 from "./0e0b35a92c819d94@471.js";
import define3 from "./6eda90668ae03044@836.js";
import define4 from "./048a17a165be198d@271.js";
import define5 from "./ef672b935bd480fc@623.js";
import define6 from "./7a77afd2ce564067@459.js";

function _1(md){return(
md`# SQL Enhanced YouTube -- Backend`
)}

function _2(htl){return(
htl.html`<h2> NOT POSSIBLE, YouTube does not allow caption downloads!</h2>`
)}

function _3(Inputs,getCaptions){return(
Inputs.button("test caption request", {
  reduce: () => getCaptions("I845O57ZSy4")
})
)}

function _4(authorize_link,htl){return(
htl.html`<a href="${authorize_link}">
    authorize
</a>`
)}

function _access_token(google_state,invalidation){return(
google_state?.access_token || invalidation
)}

function _getCaptions(backend,access_token){return(
async (id) => {
  const response = await fetch(`${backend.href}?id=${id}`, {
    headers: {
      Authorization: access_token
    }
  });
  if (response.status !== 200) throw new Error(await response.text());
  else return response.json();
}
)}

function _backend(endpoint,$0){return(
endpoint("backend", async (req, res, ctx) => {
  try {
    $0.send({ req, res, ctx });
  } catch (err) {
    res.status(err.code || 500).send(err.message);
  }
})
)}

function _request(flowQueue){return(
flowQueue({
  timeout_ms: 5000
})
)}

function _9(request){return(
request
)}

function _API_KEY(){return(
"AIzaSyA3nWv_jQuZ7Mvti69gGAVBH2Rd4aAmHbs"
)}

async function _youtubeCaptionsListResponse(request,API_KEY)
{
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/captions?part=id&videoId=${request.req.query.id}&key=${API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${request.req.headers.authorization}`,
        Accept: "application/json"
      }
    }
  );
  return response.json();
}


async function _12(fetchp,request){return(
(
  await fetchp(
    `https://video.google.com/timedtext?lang=en&v=${request.req.query.id}`,
    {
      headers: {
        Accept: "application/json"
      }
    }
  )
).text()
)}

function _13(request){return(
request.req.query.id
)}

function _captions(youtubeCaptionsListResponse){return(
youtubeCaptionsListResponse.items
)}

async function _youtubeCaptionsDownloadResponse(fetchp,captions,API_KEY,request)
{
  const response = await fetchp(
    `https://youtube.googleapis.com/youtube/v3/captions/${captions[0].id}?key=${API_KEY}`,
    {
      headers: {
        Authorization: `Bearer ${request.req.headers.authorization}`,
        Accept: "application/json"
      }
    }
  );
  return response.text();
}


function _16(youtubeCaptionsDownloadResponse){return(
youtubeCaptionsDownloadResponse.text()
)}

function _22(md){return(
md`## Oauth`
)}

function _GOOGLE_CLIENT_ID(){return(
'786910701676-0lg1uf3udtpnct9ji4ojijvv2rcelq6n.apps.googleusercontent.com'
)}

function _GOOGLE_CLIENT_SECRET_SECRET_NAME(){return(
"tomlarkworthy_sql-enhanced-youtube-backend"
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
["https://www.googleapis.com/auth/youtube.force-ssl"]
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["Inputs","getCaptions"], _3);
  main.variable(observer()).define(["authorize_link","htl"], _4);
  main.variable(observer("access_token")).define("access_token", ["google_state","invalidation"], _access_token);
  main.variable(observer("getCaptions")).define("getCaptions", ["backend","access_token"], _getCaptions);
  main.variable(observer("backend")).define("backend", ["endpoint","viewof request"], _backend);
  main.variable(observer("viewof request")).define("viewof request", ["flowQueue"], _request);
  main.variable(observer("request")).define("request", ["Generators", "viewof request"], (G, _) => G.input(_));
  main.variable(observer()).define(["request"], _9);
  main.variable(observer("API_KEY")).define("API_KEY", _API_KEY);
  main.variable(observer("youtubeCaptionsListResponse")).define("youtubeCaptionsListResponse", ["request","API_KEY"], _youtubeCaptionsListResponse);
  main.variable(observer()).define(["fetchp","request"], _12);
  main.variable(observer()).define(["request"], _13);
  main.variable(observer("captions")).define("captions", ["youtubeCaptionsListResponse"], _captions);
  main.variable(observer("youtubeCaptionsDownloadResponse")).define("youtubeCaptionsDownloadResponse", ["fetchp","captions","API_KEY","request"], _youtubeCaptionsDownloadResponse);
  main.variable(observer()).define(["youtubeCaptionsDownloadResponse"], _16);
  const child1 = runtime.module(define1);
  main.import("getAccessTokenFromServiceAccount", child1);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  const child3 = runtime.module(define3);
  main.import("endpoint", child3);
  const child4 = runtime.module(define4);
  main.import("localStorageView", child4);
  const child5 = runtime.module(define5);
  main.import("fetchp", child5);
  main.variable(observer()).define(["md"], _22);
  const child6 = runtime.module(define6).derive([{name: "GOOGLE_CLIENT_ID", alias: "CLIENT_ID"},{name: "GOOGLE_CLIENT_SECRET_SECRET_NAME", alias: "CLIENT_SECRET_SECRET_NAME"},{name: "GOOGLE_CLIENT_SECRET_PARAMETER_NAME", alias: "CLIENT_SECRET_PARAMETER_NAME"},{name: "GOOGLE_AUTHORIZE_URL", alias: "AUTHORIZE_URL"},{name: "GOOGLE_TOKEN_URL", alias: "TOKEN_URL"},{name: "GOOGLE_TOKEN_HEADERS", alias: "TOKEN_HEADERS"},{name: "GOOGLE_TOKEN_BODY", alias: "TOKEN_BODY"},{name: "GOOGLE_SCOPES", alias: "SCOPES"}], main);
  main.import("authorize_link", child6);
  main.import("state", "google_state", child6);
  main.variable(observer("GOOGLE_CLIENT_ID")).define("GOOGLE_CLIENT_ID", _GOOGLE_CLIENT_ID);
  main.variable(observer("GOOGLE_CLIENT_SECRET_SECRET_NAME")).define("GOOGLE_CLIENT_SECRET_SECRET_NAME", _GOOGLE_CLIENT_SECRET_SECRET_NAME);
  main.variable(observer("GOOGLE_CLIENT_SECRET_PARAMETER_NAME")).define("GOOGLE_CLIENT_SECRET_PARAMETER_NAME", _GOOGLE_CLIENT_SECRET_PARAMETER_NAME);
  main.variable(observer("GOOGLE_AUTHORIZE_URL")).define("GOOGLE_AUTHORIZE_URL", _GOOGLE_AUTHORIZE_URL);
  main.variable(observer("GOOGLE_TOKEN_URL")).define("GOOGLE_TOKEN_URL", _GOOGLE_TOKEN_URL);
  main.variable(observer("GOOGLE_TOKEN_HEADERS")).define("GOOGLE_TOKEN_HEADERS", _GOOGLE_TOKEN_HEADERS);
  main.variable(observer("GOOGLE_TOKEN_BODY")).define("GOOGLE_TOKEN_BODY", _GOOGLE_TOKEN_BODY);
  main.variable(observer("GOOGLE_SCOPES")).define("GOOGLE_SCOPES", _GOOGLE_SCOPES);
  return main;
}
