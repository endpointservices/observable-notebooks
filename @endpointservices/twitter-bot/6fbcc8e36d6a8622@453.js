import define1 from "./629be1812462d083@415.js";
import define2 from "./6eda90668ae03044@836.js";
import define3 from "./993a0c51ef1175ea@1396.js";
import define4 from "./4e91ba6c5edba46c@761.js";
import define5 from "./664e6dbf65b52c3e@51.js";
import define6 from "./ef672b935bd480fc@623.js";
import define7 from "./293899bef371e135@293.js";

function _1(md){return(
md`# How to make a <strike>Twitter</strike> BlueSky Bot

<strike>This notebook describes how to use [@endpointservices](https://observablehq.com/@endpointservices) [cron](https://observablehq.com/@endpointservices/cron)/[zapier](https://observablehq.com/@endpointservices/zapier)/[serverless-cells](https://observablehq.com/@endpointservices/serverless-cells) to build a Twitter bot that tweets the [top trending notebook](https://observablehq.com/trending) on Observable once a day (Twitter account [@trendingnotebo2](https://twitter.com/trendingnotebo2)). This shows how to execute custom notebook logic on a schedule, which can be useful for lots of different things. </strike>

### Update 2024-11-30
I have switched the bot over to BlueSky ([trendingnotebooks.bsky.social](https://bsky.app/profile/trendingnotebooks.bsky.social)). Instead of using Zapier, I post directly using the API (see [@tomlarkworthy/post-to-bluesky](https://observablehq.com/@tomlarkworthy/post-to-bluesky)).


Everything is done within the browser, there are no tools to install! The video is less than 10 minutes, information dense and does not waste time.
 
`
)}

function _2(html,width){return(
html`<iframe width="${width}" height="${width * 0.6}"src="https://www.youtube.com/embed/hE-XaOZE4Es" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _3(md){return(
md`#### Change log

- 11/03/2021 Tweet deduplication logic added using HTTP cache and content hashing`
)}

function _4(md){return(
md`## Cron job

A "cron" job calls another URL on a regular schedule. We will use this to trigger a tweet once day, by setting the URL to a serverless-cell HTTP handler served from this Notebook.
`
)}

function _cronJob(createCron,topTrending){return(
createCron({
  name: "tweetdaily",
  schedule: "15 12 * * *", // Daily at 12:15 pm UTC
  url: topTrending.href
})
)}

function _7(md){return(
md`## URL handler

The URL handler receives the ping from the cron service on a regular schedule. 

We create a custom handler using a serverless-cell. Calling "deploy" creates a public URL which will execute the code within the handler when called.

In our case we wish to send a Tweet about the top trending Notebook on [Observable](https://observablehq.com)


`
)}

function _topTrending(deploy,db,contentHash,postWithImage,imgBlob,text){return(
deploy(
  "tweetTopTrending",
  async (req, res, context) => {
    const hasSent = (await db.child(contentHash).once("value")).val() !== null;
    if (hasSent) return res.send("Already sent");
    else {
      try {
        const response = await postWithImage(
          "trendingnotebooks.bsky.social",
          context.secrets["BLUESKY_TRENDING_APP_PASSWORD"],
          imgBlob,
          text
        );
        await db.child(contentHash).set(true);
        return res.send(JSON.stringify(response));
      } catch (err) {
        return res.status(400).send(err.message);
      }
    }
  },
  {
    modifiers: ["orchestrator"],
    secrets: ["endpointservices_BLUESKY_TRENDING_APP_PASSWORD"]
  }
)
)}

function _db(firebase){return(
firebase.database().ref(`/@endpointservices/twitter-bot`)
)}

function _FIREBASE_CONFIG(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

function _13(md){return(
md`## <strike>Send Tweet</strike>

Calling the Twitter API and authenticating is quite a lot of work. Instead of figuring out how to do that we use Zapier. Zapier has integrations for thousands of things including Twitter. Endpoint Services has an integration with [Zapier](https://observablehq.com/@endpointservices/zapier), so we can reach *a lot* of functionality just by using [@endpointservices/zapier](https://observablehq.com/@endpointservices/zapier).


`
)}

function _sendTweet(createTrigger,text,imgURL){return(
createTrigger({
    name: "sendTweet",
    authorized_public_keys: ["cg24TseUZnvEiO3XtXCFD08E9bX83Sv4rBHe2cjvpmU="],
    // Serverside check, ensure only the current trending tweet is used
    checkPayload: (payload) => payload.text === text && payload.img.startsWith("https://static.observableusercontent.com/thumbnail/"), 
    sample: {
      text: text,
      img: imgURL
    }
  })
)}

function _16(md){return(
md`## Post to BlueSky`
)}

function _password(Inputs){return(
Inputs.password({
  label: "app password"
})
)}

async function _imgBlob(fetchp,imgURL){return(
(await fetchp(imgURL)).blob()
)}

function _20(postWithImage,password,imgBlob,text){return(
postWithImage("trendingnotebooks.bsky.social", password, imgBlob, text)
)}

function _21(md){return(
md`## Fetching Top Trending Notebook

To figure out the top trending Tweet we call the Observable API.
`
)}

function _22(md){return(
md`
Observable's trending URL (/documents/public/trending) does not support cross origin requests so we use [fetchp](https://observablehq.com/@tomlarkworthy/fetchp) to get the data instead.
`
)}

function _24(md){return(
md`Now we can call the Observable API`
)}

async function _trendingResponse(fetchp){return(
await fetchp(
  "https://api.observablehq.com/documents/public/trending?page=1"
)
)}

async function _trending(trendingResponse){return(
trendingResponse.status == 200
  ? trendingResponse.json()
  : new Error(await trendingResponse.text())
)}

function _27(md){return(
md`The top notebook is the first result`
)}

function _topNotebook(trending){return(
trending.results[0]
)}

function _29(md){return(
md`#### Top notebook Tweet Text`
)}

function _suffix(topNotebook){return(
topNotebook.slug == null
  ? `d/${topNotebook.id}`
  : `@${topNotebook.owner.login}/${topNotebook.slug}`
)}

function _text(topNotebook,suffix){return(
`"${topNotebook.title}" by ${topNotebook.owner.name} https://observablehq.com/${suffix}`
)}

function _32(md){return(
md`#### Top Notebook image`
)}

function _imgURL(topNotebook){return(
`https://static.observableusercontent.com/thumbnail/${topNotebook.thumbnail}.jpg`
)}

function _img(html,imgURL){return(
html`<img src=${imgURL}></img>`
)}

function _35(md){return(
md`### Content hash`
)}

function _hash(){return(
async (str) => {
  let strBuf = new TextEncoder('utf-8').encode(str);
  const buffer = await crypto.subtle.digest("SHA-256", strBuf);
  const hashArray = Array.from(new Uint8Array(buffer));                    
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
)}

function _contentHash(hash,text){return(
hash(text)
)}

function _38(contentHash){return(
contentHash.length
)}

function _40(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","width"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("createCron", child1);
  main.variable(observer("viewof cronJob")).define("viewof cronJob", ["createCron","topTrending"], _cronJob);
  main.variable(observer("cronJob")).define("cronJob", ["Generators", "viewof cronJob"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.variable(observer("topTrending")).define("topTrending", ["deploy","db","contentHash","postWithImage","imgBlob","text"], _topTrending);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  const child3 = runtime.module(define3).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child3);
  main.import("FKEY", child3);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", _FIREBASE_CONFIG);
  main.variable(observer()).define(["md"], _13);
  const child4 = runtime.module(define4);
  main.import("createTrigger", child4);
  main.variable(observer("sendTweet")).define("sendTweet", ["createTrigger","text","imgURL"], _sendTweet);
  main.variable(observer()).define(["md"], _16);
  const child5 = runtime.module(define5);
  main.import("postWithImage", child5);
  main.variable(observer("viewof password")).define("viewof password", ["Inputs"], _password);
  main.variable(observer("password")).define("password", ["Generators", "viewof password"], (G, _) => G.input(_));
  main.variable(observer("imgBlob")).define("imgBlob", ["fetchp","imgURL"], _imgBlob);
  main.variable(observer()).define(["postWithImage","password","imgBlob","text"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  const child6 = runtime.module(define6);
  main.import("fetchp", child6);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("trendingResponse")).define("trendingResponse", ["fetchp"], _trendingResponse);
  main.variable(observer("trending")).define("trending", ["trendingResponse"], _trending);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("topNotebook")).define("topNotebook", ["trending"], _topNotebook);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("suffix")).define("suffix", ["topNotebook"], _suffix);
  main.variable(observer("text")).define("text", ["topNotebook","suffix"], _text);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("imgURL")).define("imgURL", ["topNotebook"], _imgURL);
  main.variable(observer("img")).define("img", ["html","imgURL"], _img);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("hash")).define("hash", _hash);
  main.variable(observer("contentHash")).define("contentHash", ["hash","text"], _contentHash);
  main.variable(observer()).define(["contentHash"], _38);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], _40);
  return main;
}
