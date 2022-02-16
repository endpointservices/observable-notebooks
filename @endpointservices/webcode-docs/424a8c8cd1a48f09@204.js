import define1 from "./6eda90668ae03044@803.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# [Webcode](https://webcode.run) API Reference`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## deploy(name, httpHandler, options)

Arg | Type | Description
------------ | ------------- | -------------
**name** | [**String**](string.md) | notebook unique name to identify this endpoint within the notebook. If you name it 'default' the name will not appear in the URL.
**httpHandler** | [**Function**](.md) | Express 4.0 style HTTP handler 
**options** | [**Object**](string.md) | Additional deploy options for controlling endpoint

**returns** an object that includes the field "href" which is the public URL of the deployed endpoint`
)});
  main.variable(observer("options")).define("options", ["md"], function(md){return(
md`## DeployOptions

Field | Type | Description
------------ | ------------- | -------------
**host** | [**String**]() | Domain of runtime (defaults to https://webcode.run) change to self-host
**hostNotebook** | [**String**]() | Notebook host (defaults to <this> notebook) fix if you want the endpoint to always point to a specific notebook even when forked
**secrets** | [**Array(String)**]() | An array of secrets you wish to inject into the execution context.
**region** | [**Object**]() | regional host (us-central1, europe-west4, asia-east1)
**modifiers** | [**Array(String)**]() | Loop prevention flags, by default, endpoints can only be invoked by "external" requests. If a endpoint is marked as "terminal" it may be called by other endpoints. "orchestrator" endpoints can call other endpoints except other "orchistrators".

`
)});
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## getContext()

_getContext_ returns the current execution context`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Context

The execution context can be retrieved with getContext() and is also added as the third argument in a HTTP handler.

Name | Type | Description
------------ | ------------- | -------------
**namespace** | [**String**](.md) | Execution namespace (e.g. endpointservices)
**notebook** | [**String**](string.md) | Execution notebook (e.g. webcode-docs)
**secrets** | [**Object**](string.md) | name -> value of injected secrets, includes the api_key if a private endpoint
**serverless** | [**Boolean**](string.md) | If the current thread is running in a serverless environment`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Request

Name | Type | Description
------------ | ------------- | -------------
**method** | [**String**](string.md) | HTTP method e.g. GET, POST, OPTION
**query** | [**Object**](string.md) | Query strings as key-values
**headers** | [**Object**](.md) | HTTP headers
**url** | [**String**](string.md) | url SUFFIX after the deployment URL (direct calls to the endpoint are simply "/")
**baseUrl** | [**String**](string.md) | &#39; Canonical deployment URL of the endpoint, excludes region prefix and any additional paths that may have been suffixed. E.g. &#x60;/observablehq.com/d/424a8c8cd1a48f09;info&#x60; ads ds &#39;
**ip** | [**String**](string.md) | IP address of the caller`
)});
  main.variable(observer()).define(["md"], function(md){return(
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
)});
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`## Introspecting endpoint
We can deploy a HTTP endpoint that prints out the webcode API
`
)});
  main.variable(observer()).define(["deploy","getContext"], function(deploy,getContext){return(
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
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Example Response`
)});
  main.variable(observer()).define(["htl"], function(htl){return(
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
)});
  main.variable(observer()).define(["htl"], function(htl){return(
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
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
