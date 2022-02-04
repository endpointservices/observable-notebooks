import define1 from "./6eda90668ae03044@802.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer("viewof square")).define("viewof square", ["serveFunction"], function(serveFunction){return(
serveFunction((x) => {
  return x * x;
})
)});
  main.variable(observer("square")).define("square", ["Generators", "viewof square"], (G, _) => G.input(_));
  main.variable(observer()).define(["square"], function(square){return(
square(12)
)});
  main.variable(observer("serveFunction")).define("serveFunction", ["endpoint","htl"], function(endpoint,htl){return(
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
)});
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
