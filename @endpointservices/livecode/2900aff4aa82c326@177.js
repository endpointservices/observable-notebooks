import define1 from "./6eda90668ae03044@804.js";
import define2 from "./293899bef371e135@267.js";

function _1(md){return(
md`# Livecoding Serverless Playground

A defining feature of [WEBCode.run](https://webcode.run) serverless endpoints is **livecoding**. Livecoding routes production traffic to your browser, so live traffic is served in realtime by the bleeding-edge code without a deploy step. **It transfers Observable's reactive development workflow to server side development**, and it allows **browser tools to debug, intercept and reply to production traffic**.`
)}

function _2(md){return(
md`## Example`
)}

function _3(md){return(
md`import the [webcode](https://observablehq.com/@endpointservices/webcode) dependency:`
)}

function _5(md){return(
md`create an endpoint. For this example, we turn on public livecoding in the options payload so anybody can intercept traffic, in production use you would only allow livecoding by a developer.`
)}

function _exampleEndpoint(endpoint){return(
endpoint(
  "example",
  async (req, res) => {
    console.log("Received request", req);
    console.log("Writing to response", res);
    res.send({
      msg: `Hi! ${req.query.name}`,
      time: Date.now()
    });
  },
  {
    // Never combine secrets and public livecoding!
    // Any secrets bound to a public livecode endpoint will be exposed.
    // With normal livecoding secrets are only exposed to authenticated team members.
    livecode: "public"
  }
)
)}

function _7(md){return(
md`Our implementation does a *console.log* of the inbound [request](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#request) payload, and sends an object to the [response](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#response). The response is computed based on the value of an incoming HTTP URL parameter *name*.`
)}

function _8(md){return(
md`### Making a GET

The following UI uses the *fetch* API to make a simple request to our endpoint. The URL of the endpoint is the *href* parameter of the endpoint.

When public livecoding, the URL of the server contains the session ID, so the server knows which tunnel to route through. **Public livecode endpoints are isolated between participants**.`
)}

function _name(Inputs){return(
Inputs.text({
  label: "name",
  placeholder: "Please enter your name"
})
)}

function _response(Inputs,name,exampleEndpoint){return(
Inputs.button("Make request", {
  reduce: async () => {
    console.log("Sending request with name parameter", name);
    const response = await fetch(
      exampleEndpoint.href + `?name=${encodeURIComponent(name)}`
    );
    console.log("Got response", response);
    return response.json();
  }
})
)}

function _11(response){return(
response
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof exampleEndpoint")).define("viewof exampleEndpoint", ["endpoint"], _exampleEndpoint);
  main.variable(observer("exampleEndpoint")).define("exampleEndpoint", ["Generators", "viewof exampleEndpoint"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof name")).define("viewof name", ["Inputs"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer("viewof response")).define("viewof response", ["Inputs","name","exampleEndpoint"], _response);
  main.variable(observer("response")).define("response", ["Generators", "viewof response"], (G, _) => G.input(_));
  main.variable(observer()).define(["response"], _11);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _13);
  return main;
}
