// https://observablehq.com/@endpointservices/realtime-request-log@433
import define1 from "./6eda90668ae03044@803.js";
import define2 from "./bb2055d580bbbab2@106.js";
import define3 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer()).define(["tweet"], function(tweet){return(
tweet("1451506581619752965")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Requests timeline`
)});
  main.variable(observer()).define(["Plot","requests"], function(Plot,requests){return(
Plot.plot({
  marks: [Plot.ruleX(requests, { x: (r) => r.time })]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Header Counts`
)});
  main.variable(observer("viewof header")).define("viewof header", ["Inputs","headers"], function(Inputs,headers){return(
Inputs.select(Object.keys(headers[0]), { value: "user-agent" })
)});
  main.variable(observer("header")).define("header", ["Generators", "viewof header"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","width","headers","header"], function(Plot,width,headers,header){return(
Plot.plot({
  width,
  marginBottom: 100,
  x: {
    tickRotate: 10
  },
  marks: [Plot.barY(headers, Plot.groupX({ y: "count" }, { x: header }))]
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`nonce2`
)});
  main.variable(observer()).define(["Inputs","requests","htl"], function(Inputs,requests,htl){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data prep`
)});
  main.variable(observer("requests")).define("requests", ["requestsRaw"], function(requestsRaw){return(
requestsRaw
  .slice()
  .reverse()
  .map((r) => ({ ...r, time: new Date(r.time) }))
)});
  main.variable(observer("headers")).define("headers", ["requests"], function(requests){return(
requests.map((r) => r.headers)
)});
  main.variable(observer("viewof requestsRaw")).define("viewof requestsRaw", ["Inputs","database","ref","Event","invalidation"], function(Inputs,database,ref,Event,invalidation)
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
);
  main.variable(observer("requestsRaw")).define("requestsRaw", ["Generators", "viewof requestsRaw"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Server`
)});
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("viewof url")).define("viewof url", ["endpoint","database","ref"], function(endpoint,database,ref){return(
endpoint("default", async (req, res) => {
  const data = {
    ...req,
    ip: "redacted",
    time: { ".sv": "timestamp" }
  };
  database.push(ref, data);
  res.json(data);
})
)});
  main.variable(observer("url")).define("url", ["Generators", "viewof url"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Database`
)});
  main.variable(observer("FIREBASE_VERSION")).define("FIREBASE_VERSION", function(){return(
"9.1.3"
)});
  main.variable(observer("firebaseConfig")).define("firebaseConfig", function(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049"
}
)});
  main.variable(observer("app")).define("app", ["FIREBASE_VERSION","firebaseConfig"], async function(FIREBASE_VERSION,firebaseConfig)
{
  const app = await import(
    `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`
  );
  return app.initializeApp(
    firebaseConfig,
    "@endpointservices/realtime-request-log"
  );
}
);
  main.variable(observer("database")).define("database", ["FIREBASE_VERSION"], async function(FIREBASE_VERSION){return(
await import(
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js`
)
)});
  main.variable(observer("ref")).define("ref", ["database","app"], function(database,app){return(
database.ref(
  database.getDatabase(app),
  "@endpointservices/realtime-request-log"
)
)});
  const child2 = runtime.module(define2);
  main.import("tweet", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
