// https://observablehq.com/@endpointservices/twitter-bot@344
import define1 from "./629be1812462d083@415.js";
import define2 from "./dff1e917c89f5e76@1709.js";
import define3 from "./993a0c51ef1175ea@1317.js";
import define4 from "./4e91ba6c5edba46c@761.js";
import define5 from "./ef672b935bd480fc@619.js";
import define6 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# How to make a Twitter Bot

This notebook describes how to use [@endpointservices](https://observablehq.com/@endpointservices) [cron](https://observablehq.com/@endpointservices/cron)/[zapier](https://observablehq.com/@endpointservices/zapier)/[serverless-cells](https://observablehq.com/@endpointservices/serverless-cells) to build a Twitter bot that tweets the [top trending notebook](https://observablehq.com/trending) on Observable once a day (Twitter account [@trendingnotebo2](https://twitter.com/trendingnotebo2)). This shows how to execute custom notebook logic on a schedule, which can be useful for lots of different things. 

Everything is done within the browser, there are no tools to install! The video is less than 10 minutes, information dense and does not waste time.
 
`
)});
  main.variable(observer()).define(["html","width"], function(html,width){return(
html`<iframe width="${width}" height="${width * 0.6}"src="https://www.youtube.com/embed/hE-XaOZE4Es" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Change log

- 11/03/2021 Tweet deduplication logic added using HTTP cache and content hashing`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Cron job

A "cron" job calls another URL on a regular schedule. We will use this to trigger a tweet once day, by setting the URL to a serverless-cell HTTP handler served from this Notebook.
`
)});
  const child1 = runtime.module(define1);
  main.import("createCron", child1);
  main.variable(observer("viewof cronJob")).define("viewof cronJob", ["createCron","topTrending"], function(createCron,topTrending){return(
createCron({
  name: "tweetdaily",
  schedule: "15 12 * * *", // Daily at 12:15 pm UTC
  url: topTrending.href
})
)});
  main.variable(observer("cronJob")).define("cronJob", ["Generators", "viewof cronJob"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`## URL handler

The URL handler receives the ping from the cron service on a regular schedule. 

We create a custom handler using a serverless-cell. Calling "deploy" creates a public URL which will execute the code within the handler when called.

In our case we wish to send a Tweet about the top trending Notebook on [Observable](https://observablehq.com)


`
)});
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.variable(observer("topTrending")).define("topTrending", ["deploy","db","contentHash","sendTweet","text","imgURL"], function(deploy,db,contentHash,sendTweet,text,imgURL){return(
deploy(
  "tweetTopTrending",
  async (req, res) => {
    const hasSent = (await db.child(contentHash).once("value")).val() !== null;
    if (hasSent) return res.send("Already sent");
    else {
      await sendTweet({
        text: text,
        img: imgURL
      });
      await db.child(contentHash).set(true);
      return res.send("OK");
    }
  },
  {
    modifiers: ["orchestrator"]
  }
)
)});
  main.variable(observer("db")).define("db", ["firebase"], function(firebase){return(
firebase.database().ref(`/@endpointservices/twitter-bot`)
)});
  const child3 = runtime.module(define3).derive([{name: "FIREBASE_CONFIG", alias: "firebaseConfig"}], main);
  main.import("firebase", child3);
  main.import("FKEY", child3);
  main.variable(observer("FIREBASE_CONFIG")).define("FIREBASE_CONFIG", function(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Send Tweet

Calling the Twitter API and authenticating is quite a lot of work. Instead of figuring out how to do that we use Zapier. Zapier has integrations for thousands of things including Twitter. Endpoint Services has an integration with [Zapier](https://observablehq.com/@endpointservices/zapier), so we can reach *a lot* of functionality just by using [@endpointservices/zapier](https://observablehq.com/@endpointservices/zapier).


`
)});
  const child4 = runtime.module(define4);
  main.import("createTrigger", child4);
  main.variable(observer("sendTweet")).define("sendTweet", ["createTrigger","text","imgURL"], function(createTrigger,text,imgURL){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Fetching Top Trending Notebook

To figure out the top trending Tweet we call the Observable API.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Observable's trending URL (/documents/public/trending) does not support cross origin requests so we use [fetchp](https://observablehq.com/@tomlarkworthy/fetchp) to get the data instead.
`
)});
  const child5 = runtime.module(define5);
  main.import("fetchp", child5);
  main.variable(observer()).define(["md"], function(md){return(
md`Now we can call the Observable API`
)});
  main.variable(observer("trendingResponse")).define("trendingResponse", ["fetchp"], async function(fetchp){return(
await fetchp(
  "https://api.observablehq.com/documents/public/trending?page=1"
)
)});
  main.variable(observer("trending")).define("trending", ["trendingResponse"], async function(trendingResponse){return(
trendingResponse.status == 200
  ? trendingResponse.json()
  : new Error(await trendingResponse.text())
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The top notebook is the first result`
)});
  main.variable(observer("topNotebook")).define("topNotebook", ["trending"], function(trending){return(
trending.results[0]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Top notebook Tweet Text`
)});
  main.variable(observer("text")).define("text", ["topNotebook"], function(topNotebook){return(
`"${topNotebook.title}" by ${topNotebook.owner.name} https://observablehq.com/@${topNotebook.owner.login}/${topNotebook.slug}`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Top Notebook image`
)});
  main.variable(observer("imgURL")).define("imgURL", ["topNotebook"], function(topNotebook){return(
`https://static.observableusercontent.com/thumbnail/${topNotebook.thumbnail}.jpg`
)});
  main.variable(observer()).define(["html","imgURL"], function(html,imgURL){return(
html`<img src=${imgURL}></img>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Content hash`
)});
  main.variable(observer("hash")).define("hash", function(){return(
async (str) => {
  let strBuf = new TextEncoder('utf-8').encode(str);
  const buffer = await crypto.subtle.digest("SHA-256", strBuf);
  const hashArray = Array.from(new Uint8Array(buffer));                    
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
)});
  main.variable(observer("contentHash")).define("contentHash", ["hash","text"], function(hash,text){return(
hash(text)
)});
  main.variable(observer()).define(["contentHash"], function(contentHash){return(
contentHash.length
)});
  const child6 = runtime.module(define6);
  main.import("footer", child6);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
