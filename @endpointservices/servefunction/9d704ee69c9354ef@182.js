import define1 from "./6eda90668ae03044@804.js";
import define2 from "./293899bef371e135@267.js";

function _1(md){return(
md`# *serveFunction*

WEBCode offers a lot of control over HTTP handling, but often the expressivity is overkill and just complicates. If you wish to just expose computation over the internet, serveFunction greatly simplifies the experience, whilst still retaining instant deploys, remote debugging and secrets

To import:
~~~js
import {serveFunction} from '@endpointservices/servefunction'
~~~

To create a new endpoint:
~~~js
viewof remoteFunction = serveFunction((x) => {
  return x * x;
})
~~~

To call the endpoint:
~~~js
await remoteFunction(...)
~~~`
)}

function _square(serveFunction){return(
serveFunction((x) => {
  return x * x;
})
)}

function _3(square){return(
square(12)
)}

function _serveFunction(endpoint,htl){return(
(fn, { name = "default" } = {}) => {
  const server = endpoint(name || "default", async (req, res) => {
    const args = req.query.args ? JSON.parse(req.query.args) : [];
    const response = await fn(...args);
    if (!response) res.status(204).end();
    else res.json(response);
  });

  const client = htl.html`<span>${server}`;
  client.value = async (...args) => {
    const response = await fetch(
      server.href + "?args=" + encodeURIComponent(JSON.stringify(args))
    );
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 204) {
      return undefined;
    } else {
      throw new Error(`Status: ${response.status}, ${await response.text()}`);
    }
  };
  return client;
}
)}

function _7(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof square")).define("viewof square", ["serveFunction"], _square);
  main.variable(observer("square")).define("square", ["Generators", "viewof square"], (G, _) => G.input(_));
  main.variable(observer()).define(["square"], _3);
  main.variable(observer("serveFunction")).define("serveFunction", ["endpoint","htl"], _serveFunction);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _7);
  return main;
}
