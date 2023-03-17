// https://observablehq.com/@endpointservices/realtime-request-log@434
import define1 from "./6eda90668ae03044@836.js";
import define2 from "./bb2055d580bbbab2@106.js";
import define3 from "./293899bef371e135@290.js";

function _1(md){return(
md`# Networking Tools: Realtime Request log

Log who is calling an endpoint and the headers used.

This notebook hosts an endpoint that reflects back the incoming metadata, and logs it, so you can use it to probe remote services that are not under your control. This utility was used to develop the [onPublish](https://observablehq.com/@tomlarkworthy/onpublish) notebook hook. A similar service to [hookbin.com](https://hookbin.com/)

Try it out, 

<a target="_blank" href="https://webcode.run/observablehq.com/@endpointservices/realtime-request-log">https://webcode.run/observablehq.com/@endpointservices/realtime-request-log</a>

<pre style="background: black; color: white"> 
    curl https://webcode.run/observablehq.com/@endpointservices/realtime-request-log 
</pre>

If you append an additional URL path, this is logged as /url so you can tag your requests for ease of identification.



`
)}

function _2(tweet){return(
tweet("1451506581619752965")
)}

function _3(md){return(
md`### Requests timeline`
)}

function _4(Plot,requests){return(
Plot.plot({
  marks: [Plot.ruleX(requests, { x: (r) => r.time })]
})
)}

function _5(md){return(
md`### Header Counts`
)}

function _header(Inputs,headers){return(
Inputs.select(Object.keys(headers[0]), { value: "user-agent" })
)}

function _7(Plot,width,headers,header){return(
Plot.plot({
  width,
  marginBottom: 100,
  x: {
    tickRotate: 10
  },
  marks: [Plot.barY(headers, Plot.groupX({ y: "count" }, { x: header }))]
})
)}

function _8(Inputs,requests,htl){return(
Inputs.table(requests, {
  columns: ["time", "method", "url", "headers"],
  height: "500px",
  width: {
    method: "5%",
    url: "20%",
    headers: "50%"
  },
  format: {
    headers: (headers) =>
      htl.html`<table>
          ${Object.entries(headers).map(
            ([header, value]) => htl.html.fragment`
          <tr>
            <td>${header}</td>
            <td>${value}</td>
          </tr>
        `
          )}
        </table>`
  }
})
)}

function _9(md){return(
md`### Data prep`
)}

function _requests(requestsRaw){return(
requestsRaw
  .slice()
  .reverse()
  .map((r) => ({ ...r, time: new Date(r.time) }))
)}

function _headers(requests){return(
requests.map((r) => r.headers)
)}

function _requestsRaw(Inputs,database,ref,Event,invalidation)
{
  const holder = Inputs.input([]);
  const unsubscribe = database.onValue(
    database.query(ref, database.limitToLast(100)),
    (snap) => {
      holder.value = Object.values(snap.val());
      holder.dispatchEvent(new Event("input", { bubbles: true }));
    }
  );
  invalidation.then(unsubscribe);
  return holder;
}


function _13(md){return(
md`### Server`
)}

function _url(endpoint,database,ref){return(
endpoint("default", async (req, res) => {
  const data = {
    ...req,
    ip: "redacted",
    time: { ".sv": "timestamp" }
  };
  database.push(ref, data);
  res.json(data);
})
)}

function _16(md){return(
md`### Database`
)}

function _FIREBASE_VERSION(){return(
"9.1.3"
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)}

async function _app(FIREBASE_VERSION,firebaseConfig)
{
  const app = await import(
    `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`
  );
  return app.initializeApp(
    firebaseConfig,
    "@endpointservices/realtime-request-log"
  );
}


async function _database(FIREBASE_VERSION){return(
await import(
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js`
)
)}

function _ref(database,app){return(
database.ref(
  database.getDatabase(app),
  "@endpointservices/realtime-request-log"
)
)}

function _24(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tweet"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Plot","requests"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof header")).define("viewof header", ["Inputs","headers"], _header);
  main.variable(observer("header")).define("header", ["Generators", "viewof header"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","width","headers","header"], _7);
  main.variable(observer()).define(["Inputs","requests","htl"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("requests")).define("requests", ["requestsRaw"], _requests);
  main.variable(observer("headers")).define("headers", ["requests"], _headers);
  main.variable(observer("viewof requestsRaw")).define("viewof requestsRaw", ["Inputs","database","ref","Event","invalidation"], _requestsRaw);
  main.variable(observer("requestsRaw")).define("requestsRaw", ["Generators", "viewof requestsRaw"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("viewof url")).define("viewof url", ["endpoint","database","ref"], _url);
  main.variable(observer("url")).define("url", ["Generators", "viewof url"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("FIREBASE_VERSION")).define("FIREBASE_VERSION", _FIREBASE_VERSION);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer("app")).define("app", ["FIREBASE_VERSION","firebaseConfig"], _app);
  main.variable(observer("database")).define("database", ["FIREBASE_VERSION"], _database);
  main.variable(observer("ref")).define("ref", ["database","app"], _ref);
  const child2 = runtime.module(define2);
  main.import("tweet", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _24);
  return main;
}
