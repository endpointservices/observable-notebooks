import define1 from "./6eda90668ae03044@805.js";
import define2 from "./048a17a165be198d@263.js";
import define3 from "./509d6b5d1aebf2a1@215.js";
import define4 from "./293899bef371e135@267.js";

function _1(md){return(
md`# Livecoding Endpoints with [WEBCode.run](https://webcode.run)

*The* defining feature of [WEBCode.run](https://webcode.run) serverless endpoints is **livecoding**. Livecoding routes production traffic to your browser, so live traffic is served in realtime with the very latest code without a deploy step. **It transfers Observable's reactive development workflow to server side development**, and it allows **browser tools to debug, intercept and reply to production traffic**.`
)}

function _2(md){return(
md`## Example`
)}

function _3(md){return(
md`import the [webcode](https://observablehq.com/@endpointservices/webcode) dependency:`
)}

function _5(md){return(
md`create an endpoint. For this example, we turn on public livecoding in the options with \`{livecoding: 'public'}\` so anybody can intercept traffic, in production use you would only allow livecoding by a developer.`
)}

function _exampleEndpoint(endpoint,host){return(
endpoint(
  "example",
  async (req, res) => {
    console.log("Received request", req);
    console.log("Writing to response", res);
    debugger; // 👈 triggers a breakpoint if DevTools is open
    res.send({
      msg: `Hi! ${req.query.name}`,
      time: Date.now()
    });
  },
  {
    // Never combine secrets and *public* livecoding!
    // Any secrets bound to a *public* livecode endpoint will be exposed.
    // In contrast, default livecoding secrets are only exposed to authenticated team members.
    // who presumably had access by other means anyway.
    livecode: "public",
    host // WEBCode is a federated compute technology, you can host it yourself on a custom domain
  }
)
)}

function _7(md){return(
md`Our implementation does a *console.log* of the inbound [request](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#request) payload, and sends an object to the [response](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#response). The response is computed based on the value of an incoming HTTP URL parameter *name*.`
)}

function _8(md){return(
md`### Making a GET

The following UI uses the *fetch* API client-side, to make a simple request to our endpoint. The URL of the endpoint is the *href* parameter of the endpoint.

When public livecoding, the URL of the server contains the session ID, so the server knows which tunnel to route through. Public livecode endpoints are isolated between participants.`
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

function _11(md){return(
md`After clicking the button we can render what the response was (after JSON deserialization). Try changing the name value sent and making more requests.`
)}

function _12(response){return(
response
)}

function _13(md){return(
md`Updating a value in response to a button press does not seem that impressive until you realize the request is going over the public internet. So you don't need to initiate the request inside the browser, you can also use curl from your console for instance:`
)}

function _curl_get(exampleEndpoint,name,md){return(
md`\`\`\`

curl '${exampleEndpoint.href + `?name=${name}`}'
\`\`\``
)}

function _15(md){return(
md`The story is even more interesting when you pop <a target="_blank" href="https://balsamiq.com/support/faqs/browserconsole">open your developers tools</a>. You should see that the \`console.log\` messages inside the handler have executed, indicating the endpoint code was executed inside your browser.

When you click `
)}

function _16(md){return(
md`### Unrolling a server across cells with [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue)`
)}

function _17(md){return(
md`### Config`
)}

function _host(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(["webcode.run", "http://localhost:8080"], {
    label: "host"
  }),
  /* localStorageView allows us to persist the value across refreshed */
  localStorageView("WEBCODE_HOST", {
    defaultValue: "webcode.run"
  })
)
)}

function _20(md){return(
md`### Notebook Enhancements`
)}

function _21(installCopyCode,curl_get,invalidation,md)
{
  installCopyCode(curl_get, { invalidation });
  return md`*👈 [copy-code](https://observablehq.com/@tomlarkworthy/copy-code) button for examples*`;
}


function _23(md){return(
md`##### Notebook Backup, Analytics and monitoring`
)}

function _25(footer){return(
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
  main.variable(observer("exampleEndpoint")).define("exampleEndpoint", ["endpoint","host"], _exampleEndpoint);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof name")).define("viewof name", ["Inputs"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer("viewof response")).define("viewof response", ["Inputs","name","exampleEndpoint"], _response);
  main.variable(observer("response")).define("response", ["Generators", "viewof response"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["response"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("curl_get")).define("curl_get", ["exampleEndpoint","name","md"], _curl_get);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  main.variable(observer("viewof host")).define("viewof host", ["Inputs","localStorageView"], _host);
  main.variable(observer("host")).define("host", ["Generators", "viewof host"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["installCopyCode","curl_get","invalidation","md"], _21);
  const child3 = runtime.module(define3);
  main.import("installCopyCode", child3);
  main.variable(observer()).define(["md"], _23);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _25);
  return main;
}
