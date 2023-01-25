import define1 from "./6eda90668ae03044@836.js";
import define2 from "./293899bef371e135@290.js";

function _1(md){return(
md`# [Webcode](https://webcode.run) API Reference`
)}

function _2(md){return(
md`## deploy(name, httpHandler, options)

Arg | Type | Description
------------ | ------------- | -------------
**name** | [**String**](string.md) | notebook unique name to identify this endpoint within the notebook. If you name it 'default' the name will not appear in the URL.
**httpHandler** | [**Function**](.md) | Express 4.0 style HTTP handler 
**options** | [**Object**](string.md) | Additional [DeplyOptions](options) for controlling endpoint

**returns** an object that includes the field "href" which is the public URL of the deployed endpoint`
)}

function _options(md){return(
md`## DeployOptions

Field | Type | Description
------------ | ------------- | -------------
**host** | [**String**]() | Domain of runtime (defaults to https://webcode.run) change to self-host (e.g. https://localhost:8080)
**hostNotebook** | [**String**]() | Notebook host (defaults to current notebook). Hardcode if you want the endpoint to always point to a specific notebook even when forked
**secrets** | [**Array(String)**]() | An array of secrets you wish to inject into the execution context.
**livecode** | [**String** or **Boolean**]() | Set to *true* to enabled developer livecoding. Hardcode to false to disable it. Set to "PUBLIC" to enable public live coding.
**region** | [**Object**]() | regional host (us-central1, europe-west4, asia-east1)
**modifiers** | [**Array(String)**]() | Loop prevention flags, by default, endpoints can only be invoked by "external" requests. If a endpoint is marked as "terminal" it may be called by other endpoints. "orchestrator" endpoints can call other endpoints except other "orchestrators".

`
)}

function _4(md){return(
md`## HTTPHandler

The handler is the Javascript code that responds with a _response_ to an inbound _request_.

~~~js
async (request, response, context) => {
  response.send("Hello World!)
}
~~~
Arg | Type | Description
------------ | ------------- | -------------
**request** | [**Object**](string.md) | Inbound request parameterization.
**response** | [**Object**](.md) | Response object containing functions to call in order to respond.
**context** | [**Object**](string.md) | Execution context for the request`
)}

function _5(md){return(
md`## getContext()

_getContext_ returns the current execution context`
)}

function _6(md){return(
md`## Context

The execution context can be retrieved with getContext() and is also added as the third argument in a HTTP handler.

Name | Type | Description
------------ | ------------- | -------------
**namespace** | [**String**](.md) | Execution namespace (e.g. endpointservices)
**notebook** | [**String**](string.md) | Execution notebook (e.g. webcode-docs)
**secrets** | [**Object**](string.md) | name -> value of injected secrets, includes the api_key if a private endpoint
**serverless** | [**Boolean**](string.md) | If the current thread is running in a serverless environment`
)}

function _7(md){return(
md`## Request

Name | Type | Description
------------ | ------------- | -------------
**method** | [**String**](string.md) | HTTP method e.g. GET, POST, OPTION
**query** | [**Object**](string.md) | Query strings as key-values
**headers** | [**Object**](.md) | HTTP headers
**url** | [**String**](string.md) | url SUFFIX after the deployment URL (direct calls to the endpoint are simply "/")
**baseUrl** | [**String**](string.md) | &#39; Canonical deployment URL of the endpoint, excludes region prefix and any additional paths that may have been suffixed. E.g. &#x60;/observablehq.com/d/424a8c8cd1a48f09;info&#x60; ads ds &#39;
**ip** | [**String**](string.md) | IP address of the caller`
)}

function _8(md){return(
md`## Response

The response object is how the endpoint returns its result, it is an Object with a number of functions attached.

Function | Type | Description
------------ | ------------- | -------------
**status(number)** | [**Function**]() | Response _status_ code (must be called before send, defaults to 200 if not called)
**send(data)** | [**Function**]() | Set the response body and close request. _data_ can be string or buffer.
**json(obj)** | [**Function**]() | Set the response as a JSON and close request.
**header(string,string)** | [**Function**]() | Set a response header
**redirect(number,string)** | [**Function**]() | Send a redirect with response code and a location URL.
**write(data)** | [**Function**]() | Send a response chunk for response streaming, request IS NOT CLOSED
**end()** | [**Function**]() | Close a request (usually called in combination with _write_)
`
)}

function _10(md){return(
md`## Introspecting endpoint
We can deploy a HTTP endpoint that prints out the webcode API
`
)}

function _11(deploy,getContext){return(
deploy("info", async (request, response) => {
  response.send(
    `<pre>${JSON.stringify(
      {
        request,
        response: Object.fromEntries(
          Object.getOwnPropertyNames(response.__proto__).map((name) => [
            name,
            typeof response[name]
          ])
        ),
        context: await getContext()
      },
      null,
      2
    )}</pre>`
  );
})
)}

function _12(md){return(
md`### Example Response`
)}

function _13(htl){return(
htl.html`<pre>
{
  "request": {
    "baseUrl": "/observablehq.com/@endpointservices/webcode-docs;info",
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,de;q=0.7",
      "host": "webcode.run",
      "referer": "https://endpointservices.static.observableusercontent.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    "ip": "::ffff:169.254.8.129",
    "method": "GET",
    "url": "/"
  },
  "response": {
    "send": "function",
    "write": "function",
    "json": "function",
    "end": "function",
    "redirect": "function",
    "status": "function",
    "header": "function",
    "finish": "function"
  },
  "context": {
    "serverless": false,
    "namespace": "endpointservices",
    "notebook": "webcode-docs",
    "secrets": {}
  }
}
</pre>`
)}

function _14(htl){return(
htl.html`<style>
  code {
    white-space: pre-wrap;
    border: solid;
    background-color: lightyellow;
    border-width: 3px;
    border-radius: 10px;
    padding: 10px;
    display: block;
  }

  .observablehq {
    background: #FFFFFF
  }
  
  .observablehq h1 {
    font-family: "Impact";
  }
</stlye>`
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("options")).define("options", ["md"], _options);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["deploy","getContext"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["htl"], _13);
  main.variable(observer()).define(["htl"], _14);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _16);
  return main;
}
