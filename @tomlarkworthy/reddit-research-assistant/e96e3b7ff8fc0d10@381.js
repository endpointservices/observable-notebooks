import define1 from "./dff1e917c89f5e76@1965.js";
import define2 from "./993a0c51ef1175ea@1396.js";
import define3 from "./84e66f78139ac354@830.js";
import define4 from "./c0de6bf6c2f598ef@62.js";

function _1(html){return(
html`<div class="content">
<h1>The Reddit Research Assistant</h1>
`
)}

function _2(html,reddit_config){return(
html`Nothing happens until you <a href="https://www.reddit.com/api/v1/authorize?client_id=${reddit_config.OAUTH_CLIENT_ID}&response_type=${reddit_config.OAUTH_RESPONSE_TYPE}&state=${reddit_config.OAUTH_STATE}&redirect_uri=${reddit_config.OAUTH_REDIRECT_URI}&duration=${reddit_config.OAUTH_DURATION}&scope=${reddit_config.OAUTH_SCOPE_STRING}">authorize this with reddit</a>`
)}

function _3(html){return(
html`<div class="content"><h2> Project </h2>
<p> The project is the key to store data. Keep it a secret! Use a gibberish one preferably.
</div>`
)}

function _project(html){return(
html`<input placeholder="enter secret project code" type="text" value="demo">`
)}

function _5(html){return(
html`<div class="content"><h2> Question </h2>
<p> What are is the question we are researching? E.g. Whats the best VR goggles?
</div>`
)}

function _6(html){return(
html`<div class="content"><h2> Factors </h2>
<p> Factors are dimentions of relevance when evaluating a research question.

</div>`
)}

function _7(factors){return(
JSON.stringify(factors)
)}

function _8(html,factorDimensions,factors)
{
  const table = html`<center>
  <table class="table">
  <thead>
    <tr>
      ${factorDimensions.map(dim => html.fragment`
      <th>
      ${dim.title}
      </th>
      `)}
    </tr>
  </thead>
  <tbody>
    ${factors.map(row => html.fragment`
    <tr>
      ${factorDimensions.map(dim => html.fragment`
      <th>
        ${row[dim.key]}
      </th>
      `)}
    </tr>
    `)}  
  </tbody>
  </table>
  </center>`
  
  return table;
}


function _factorDimensions(){return(
[
  {
    key: "name",
    title: "name"
  }
]
)}

function _factors(DocsView,db,project){return(
new DocsView(db.collection("RedditRA").doc(project).collection('factors'))
)}

function _11(html){return(
html`<div class="content"><h2> Options </h2>
<p> What are possible answers to the research question?
</div>`
)}

function _12(options){return(
JSON.stringify(options)
)}

function _options(DocsView,db,project){return(
new DocsView(db.collection("RedditRA").doc(project).collection('options'))
)}

function _db(firebase){return(
firebase.firestore()
)}

async function _searchResults(client){return(
(await client.get("/r/programming/search.json", {
  q: "lisp",
  restrict_sr: true,
  sort: "relevance",
  t: "all"
})).json()
)}

function _selectedThread(){return(
null
)}

function _17($0,html,searchResults,selectedThread)
{
  function rowclick(row, evt) {
    $0.value = row.data
  }
  return html`<table class="table">
  <thead>
    <tr>
      <th>
       subreddit
      </th>
      <th>
        title
      </th>
    </tr>
  </thead>
  <tbody>
  ${searchResults.data.children.map(row => html.fragment`
    <tr onclick=${rowclick.bind(null, row)}
        class = "${row.data === selectedThread ? "is-selected" : null}"
        >
      <td>
       ${row.data.subreddit}
      </td>
      <td>
        ${row.data.title}
      </td>
      <td>
        read/not read?
      </td>
      <td>
        <button>maybe relevant (Y)</button>
        <button>definately not relevant (N)</button>
        <button>not sure (S)</button>
      </td>
    </tr>
  `)}
  </tbody>
  </table>`
}


function _client(credentials,reddit_config)
{
  const qs = (params) => Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&') + "&raw_json=1";
  
  return {
    get: async (url, params) => {
      return fetch(`https://oauth.reddit.com${url}?${qs(params)}`, {
        headers: {
          'Content-Type':'application/json',
          'Authorization': "Bearer " + credentials.access_token,
          'User-agent': reddit_config.user_agent
        }
      })
    }
  }
}


function _oauth_code(URLSearchParams){return(
new Promise((resolve) => {
  const code = new URLSearchParams(document.location.search).get("code")
  if (code) resolve(code)
})
)}

function _code_exchanger(deploy,reddit_config){return(
deploy("code_exchanger", async (req, res, ctx) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const client_secret = ctx.secrets["tomlarkworthy_reddit_RA_client_secret"];
  const response = await(await fetch("https://www.reddit.com/api/v1/access_token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Basic " + btoa(`${reddit_config.OAUTH_CLIENT_ID}:${client_secret}`),
      'User-agent': reddit_config.user_agent
    },
    body: `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${reddit_config.OAUTH_REDIRECT_URI}`
  })).json();
  res.json(response)
}, {
  cell: "code_exchanger",
  secrets: ["tomlarkworthy_reddit_RA_client_secret"]
})
)}

async function _credentials(code_exchanger,oauth_code){return(
(await(fetch(`${code_exchanger.href}?code=${oauth_code}`))).json()
)}

function _reddit_config(){return(
{
  OAUTH_CLIENT_ID: "Ma8Ks3R0Wp3dbQ",
  OAUTH_SCOPE_STRING: "read",
  OAUTH_REDIRECT_URI: "https://observablehq.com/@tomlarkworthy/reddit-research-assistant",
  OAUTH_RESPONSE_TYPE: "code",
  OAUTH_DURATION: "temporary",
  OAUTH_STATE: Math.random() + "",
  user_agent: "observablehq.com/@tomlarkworthy/reddit-research-assistant"
}
)}

function _firebaseConfig(){return(
{
    apiKey: "AIzaSyCYR2arNJImk-XpDfvO9LhBdIjZ7y-6cks",
    authDomain: "nell-37275.firebaseapp.com",
    databaseURL: "https://nell-37275.firebaseio.com",
    projectId: "nell-37275",
    storageBucket: "nell-37275.appspot.com",
    messagingSenderId: "343593749912",
    appId: "1:343593749912:web:b6553ef83e5dde38486fed"
}
)}

function _24(bulma){return(
bulma
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], _1);
  main.variable(observer()).define(["html","reddit_config"], _2);
  main.variable(observer()).define(["html"], _3);
  main.variable(observer("viewof project")).define("viewof project", ["html"], _project);
  main.variable(observer("project")).define("project", ["Generators", "viewof project"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], _5);
  main.variable(observer()).define(["html"], _6);
  main.variable(observer()).define(["factors"], _7);
  main.variable(observer()).define(["html","factorDimensions","factors"], _8);
  main.variable(observer("factorDimensions")).define("factorDimensions", _factorDimensions);
  main.variable(observer("viewof factors")).define("viewof factors", ["DocsView","db","project"], _factors);
  main.variable(observer("factors")).define("factors", ["Generators", "viewof factors"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], _11);
  main.variable(observer()).define(["options"], _12);
  main.variable(observer("viewof options")).define("viewof options", ["DocsView","db","project"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("searchResults")).define("searchResults", ["client"], _searchResults);
  main.define("initial selectedThread", _selectedThread);
  main.variable(observer("mutable selectedThread")).define("mutable selectedThread", ["Mutable", "initial selectedThread"], (M, _) => new M(_));
  main.variable(observer("selectedThread")).define("selectedThread", ["mutable selectedThread"], _ => _.generator);
  main.variable(observer()).define(["mutable selectedThread","html","searchResults","selectedThread"], _17);
  main.variable(observer("client")).define("client", ["credentials","reddit_config"], _client);
  main.variable(observer("oauth_code")).define("oauth_code", ["URLSearchParams"], _oauth_code);
  main.variable(observer("code_exchanger")).define("code_exchanger", ["deploy","reddit_config"], _code_exchanger);
  main.variable(observer("credentials")).define("credentials", ["code_exchanger","oauth_code"], _credentials);
  main.variable(observer("reddit_config")).define("reddit_config", _reddit_config);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["bulma"], _24);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2).derive(["firebaseConfig"], main);
  main.import("firebase", child2);
  main.import("DocsView", child2);
  main.import("DocView", child2);
  const child3 = runtime.module(define3);
  main.import("reconcile", child3);
  main.import("html", child3);
  const child4 = runtime.module(define4);
  main.import("bulma", child4);
  return main;
}
