// https://observablehq.com/@endpointservices/livecode@1628
import define1 from "./6eda90668ae03044@830.js";
import define2 from "./0e0b35a92c819d94@434.js";
import define3 from "./576f8943dbfbd395@114.js";
import define4 from "./048a17a165be198d@263.js";
import define5 from "./509d6b5d1aebf2a1@215.js";
import define6 from "./9bed702f80a3797e@402.js";
import define7 from "./293899bef371e135@271.js";

function _1(md){return(
md`# *Livecode* a webserver *in a browser*

[WEBcode.run](https://webcode.run) lets you create serverless endpoints within Observable notebooks, so you can implement webhooks, dashboard servers and webapps without leaving your browser. *The* defining feature of [WEBCode.run](https://webcode.run) over other serverless platforms is **livecoding**. Livecoding routes production traffic to your browser, so live traffic is served in realtime with the very latest code without a deploy step. **It transfers Observable's reactive development workflow to server side development**, and it allows **browser tools to debug, intercept and reply-to production traffic**. This is only possible because serverside and development are both browser based, and therefore can be swapped freely. `
)}

function _2(width,md){return(
md`## 10 second demo

In this article we demo some interactive live coding examples around the theme of building a webserver. Livecoding can be shaped to leave an execution trace across cells. This trace is useful for inspecting the steps in the request processing, and furthermore, thanks to Observable hot-code reloading, can be used to develop incrementally based off the memoized data. 

Here is what it looks like in practice when building a webhook integration. Live events from a WhatsApp cascade through the notebook. Code changes *are instantly applied* enabling a super tight feedback loop. That's right! Webhook development with a tight feedback loop!

<video controls="controls" width="${Math.min(width, 640)}" height="400" loop name="Video Name">
  <source src="https://storage.googleapis.com/publicartifacts/blogimages/notebookwebhook.mov">
</video>`
)}

function _3(toc){return(
toc("h2,h3")
)}

function _4(md){return(
md`## Prerequisites: Observable Basics
To reap the benefit of *livecoding*, you should understand [Observable]()'s non-linear reactive cells execution model. Firstly, Observable's runtime is framework around **normal javascript**, so you can do normal Javascript things. _Hell, you can store your crap in the global window if you want_. Secondly, the runtime organises a program into **named code cells**, which can read and emit values. Together cells Cells reevaluate primarily for two reasons, 1, if their inputs are dirty *or, 2, you change their code definition*.

So when you code, only the dependant computational graph is recomputed. It's significantly less disruptive than a full restart. React developers might have experienced _Hot Module Reload (HMR)_ before, this is like that but more reliable as its baked into the runtime. 

Non-linear, reactive execution is *so* ergonomic for development, that it deserves (and needs) support at runtime if it is to be reliable and intuitive. **Reactive hot code reload is simply a better way to program**.
`
)}

function _5(md){return(
md`### Extended to Serverless

WEBCode takes Observable's ergonomic reactive programming model, and extends it to serverless, so you can *develop* serverside code in an explorative way too. To get the full reactive programming experience, *your* browser session is put on critical path of the server when in **livecode** mode.

In the notebook we will explore how to get the most out of **livecode**. But first, you will need the **webcode** dependency:`
)}

function _7(md){return(
md`## Declarative Endpoints`
)}

function _8(md){return(
md`WEBCode's API is declarative. You can simply declare an endpoint with \`endpoint(<name>, <handler>, <options>)\`. There is no deploy step, this is pure *infra-as-code*.

**Endpoints will be instantaneously live on the internet**, if *livecode* is enabled, otherwise, if nobody is *livecoding*, the request will be handled by *the last **published** version of the notebook*. If the notebook has never been published, the endpoint will \`404\`.`
)}

function _exampleEndpoint(endpoint,$0,host){return(
endpoint(
  /* endpoint name, must be unique per notebook */ "example",
  /* endpoint handler, written like an express handler https://expressjs.com/en/api.html#app */
  async (req, res) => {
    console.log(`Received request from '${req.query.name}'`, req);
    console.log("Writing to response", res);
    $0.value = $0.value.concat(req);
    debugger; // 👈 triggers a breakpoint if DevTools is open
    res.send({
      msg: `Hi! ${req.query.name}`,
      time: Date.now()
    });
  },
  /* endpoint options */ {
    // For _this_ example, we turn on **public livecoding** in the options with `{livecode: 'public'}`
    // I production use you would only allow livecoding by a developer (the default).
    // Never combine secrets and *public* livecoding!
    // Any secrets bound to a *public* livecode endpoint will be exposed.
    // In contrast, default livecoding secrets are only exposed to the authenticated team members,
    // who presumably had access by other means anyway.
    livecode: "public",
    host // WEBCode is a federated compute technology, you can host it yourself on a custom domain
  }
)
)}

function _10(md){return(
md`Our implementation does a *console.log* of the inbound [request](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#request) payload, and sends an object to the [response](https://observablehq.com/@endpointservices/webcode-docs?collection=@endpointservices/webcode-run#response). The response is computed based on the value of an incoming HTTP URL parameter *name*.`
)}

function _11(md){return(
md`### Making a GET

The following UI uses the *fetch* API client-side, to make a simple request to our endpoint. The URL of the endpoint is the *href* parameter of the endpoint.

When public livecoding, the URL of the server contains the session ID, so the server knows which tunnel to route through. Public livecode endpoints are isolated between participants.`
)}

function _12(response,html){return(
response || html``
)}

function _name(Inputs){return(
Inputs.text({
  label: "name",
  placeholder: "Please enter your name (or don't)"
})
)}

function _response(Inputs,name,exampleEndpoint){return(
Inputs.button("Make random request (press me!)", {
  reduce: async () => {
    try {
      console.log(`Sending request with name parameter '${name}'`);
      const response = await fetch(
        exampleEndpoint.href + `?name=${encodeURIComponent(name)}`
      );
      console.log("Got response", response);
      return response.json();
    } catch (err) {
      return err.message;
    }
  }
})
)}

function _15(md){return(
md`After clicking the button we can render what the response was (after JSON deserialization). Try changing the name value sent and making more requests.`
)}

function _16(response,html){return(
response || html``
)}

function _17(md){return(
md`Updating a value in response to a button press does not seem that impressive until you realize the request is going over the public internet. So you don't need to initiate the request inside the browser, you can also use curl from your console for instance:`
)}

function _curl_get(exampleEndpoint,md){return(
md`\`\`\`

curl '${exampleEndpoint.href + `?name=fromcurl`}'
\`\`\``
)}

function _19(md){return(
md`The story is even more interesting when you pop <a target="_blank" href="https://balsamiq.com/support/faqs/browserconsole">open your developers tools</a>. You should see that the \`console.log\` messages inside the handler have executed, indicating the endpoint code was executed inside your browser.

We also write to a \`mutable seversideLog\` inside the request handler you can confirm the request was handled in *your* notebook session.`
)}

function _20(Inputs,handlerLog){return(
Inputs.table(
  handlerLog.map((d) => ({
    ...d,
    query: JSON.stringify(d.query),
    headers: JSON.stringify(d.headers)
  }))
)
)}

function _handlerLog(){return(
[]
)}

function _22(Inputs,$0){return(
Inputs.button("clear log", {
  reduce: () => ($0.value = [])
})
)}

function _23(md){return(
md`you can change the handler code and the **changes will be reflected instantly**, no need to deploy!`
)}

function _24(md){return(
md`## Livecode a webserver

Endpoint changes are **instantly** visible to livecode. When combined with Observable hot-code reload we can build ergonomic developer reactive workflows. For example, if we put a dataflow dependency of a client on the server, if the server handler changes, the client will refresh automatically, using the very latest deployed code. **livecode propagates serverside code changes at the speed of Observable's reactive dataflow**. 


In this example the client will be an iframe, and the server with be a webserver definition. In this arrangement, we can reactively develop a server, and always be viewing the latest webpage on the client`
)}

function _25(md){return(
md`### Sidequest: Unrolling request processing across cells

with [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue)

As server gets complex, visibility into its request processing pipeline becomes important. We can a [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue) to lay processing steps across cells in the _dataflow_ style. You call *send* to add a task to the [flowQueue](https://observablehq.com/@tomlarkworthy/flow-queue). The next task will not be loaded until the notebook calls resolve/rejects on the flowQueue *view* for the previous task.`
)}

function _webserver(endpoint,$0,$1,host){return(
endpoint(
  "webserver",
  async (req, res, ctx) => {
    try {
      $0.value = $0.value.concat(Date.now());
      // Forward to a flowQueue for (async) processing
      const response = await $1.send({
        req,
        res,
        ctx
      });
    } catch (err) {
      res.status(err.code || 500).send(err.message);
    }
  },
  {
    livecode: "public",
    host
  }
)
)}

function _28(md){return(
md`### \`webRequest\`, request processing in the dataflow style 

"viewof webRequest" refers the flowQueue, whereas "webRequest" refers to the current task. When live coding is turned on "webRequest"'s value will be the last seen incoming request to that endpoint. **We can exploit Observable's runtime to leave a trace of server execution**.`
)}

function _webRequest(flowQueue){return(
flowQueue({
  timeout_ms: 1000
})
)}

function _30(webRequest){return(
webRequest
)}

function _31(md){return(
md`### Creating multiple routes

You can server multiple pages from the webserver by inspecting the \`url\` param. 

You can discover the \`url\` param without reading documentation, by making a random request (click below), and expanding the \`webRequest\` value (above).
`
)}

function _randomResponse(Inputs,webserver){return(
Inputs.button("Make request with random path", {
  value: { text: () => "" },
  reduce: () =>
    fetch(webserver.href + "/" + Math.random().toString(16).substring(3))
})
)}

function _33(webRequest){return(
webRequest.req.url
)}

function _34(md){return(
md`The \`req\` payload contains all the incoming HTTP information, including the HTTP verb, headers and query parameters!`
)}

function _35(webRequest){return(
webRequest.req
)}

function _36(md){return(
md`You can define routes in the [express](https://observablehq.com/@tomlarkworthy/api-hosting-with-express) style if you want, but it is easier to develop incrementally if we use a \`flowQueue\` for each route.

We will need a \`default\` route to handle our random requests, and a most specific ones we will go back to later`
)}

function _router(webRequest,$0,$1,$2,$3,$4)
{
  switch (webRequest.req.url) {
    default:
      return $0.resolve($1.send(webRequest));

    // Form handling example
    case "/form.html":
      return $0.resolve($2.send(webRequest));

    // Image serving (SVG and PNG)
    case "/weblog.svg":
      return $0.resolve($3.send(webRequest));
    case "/weblog.png":
      return $0.resolve($3.send(webRequest));

    // HTML streaming
    case "/stream.html":
      return $0.resolve($4.send(webRequest));
  }
}


function _38(md){return(
md`### Responding to a request: \`defaultRequest\``
)}

function _defaultRequest(flowQueue){return(
flowQueue()
)}

function _40(defaultRequest){return(
defaultRequest
)}

function _41(md){return(
md`The appropriate response to a random request is to return status code 404`
)}

function _defaultRequestHandler(defaultRequest)
{
  const message = `Unknown path ${defaultRequest.req.url}`;
  defaultRequest.res.status(404).send(message);
  return message;
}


function _43(md){return(
md`We end the processing by resolving the flowQueue`
)}

function _defaultRequestResolver(defaultRequestHandler,$0)
{
  defaultRequestHandler; // triggered after defaultRequestHandler has run
  $0.resolve();
}


function _45(randomResponse){return(
randomResponse.text()
)}

function _46(Inputs,$0){return(
Inputs.button("Make request with random path", {
  reduce: () => $0.querySelector("button").click()
})
)}

function _47(md){return(
md`### Responding with HTML \`formRequest\`

WEBCode is ideal for creating little utilities that can slot in other websites. For example, handling a form data or displaying a chart.`
)}

function _formRequest(flowQueue){return(
flowQueue()
)}

async function _formResponseContent(formRequest,$0)
{
  if (formRequest.req.method === "POST") {
    return await $0.send(formRequest);
  } else if (formRequest.req.method === "GET") {
    return `<form method="post">
  <textarea id="note" name="note"
    rows="5" cols="40"></textarea>
  <div><button type="submit">Submit</button></div>
</form>`;
  }
}


function _50(formRequest){return(
formRequest
)}

function _51(md){return(
md`### Preview a HTML response in an \`iframe\`

We can of course put the rendered form in our own iframe so we can see the result`
)}

function _52(Inputs,$0){return(
Inputs.button("refresh preview", {
  reduce: () => $0.value++
})
)}

function _53(refreshForm,width,webserver,htl){return(
htl.html`${/* Programatically refresh this cell by incrementing refreshForm */ (refreshForm, '')}
<iframe width="${width}" height="170px" src=${webserver.href + "/form.html"}></iframe>`
)}

function _54(md){return(
md`### Automated preview refreshing

If we are a little clever with our dataflow, we can get the iframe to auto refresh on changes. Recall that in a flowQueue, a single request must processed before the next is exposed. If we see the same request more than once, that means intermediate cells have refreshed for reasons *other* than a new request arriving. This is likely a code change so we can tell the preview to refresh when the request the same as the previous one.

With this little bit of code we can edit the source of the formHandler and the preview updates automatically. Every request has a unique id associated with it (the id) so we can use this to track for repeated exposure to the same request.`
)}

function _refreshForm(webserver,Promises){return(
webserver, Promises.delay(2000, 0)
)}

function _formResponder(formRequest,formResponseContent,$0)
{
  if (formRequest.req.id !== /* previous value of cell */ this) {
    // New request, respond to it
    formRequest.res.status(200).send(formResponseContent);
  } else {
    $0.value++;
  }
  return formRequest.req.id;
}


function _57(md){return(
md`### Handling a Form POST response

When a user clicks the submit button on a form, and the form action is 'POST', the browser makes a POST request to an endpoint with the data in the form encoded in the body. This is the original way of enable a user to pass data to a webserver.`
)}

function _formPostRequest(flowQueue){return(
flowQueue()
)}

function _59(formPostRequest){return(
formPostRequest
)}

function _60(md){return(
md`Form data, when using the POST action, is URL encoded in the body.`
)}

function _formDataRaw(formPostRequest){return(
formPostRequest.req.body
)}

function _62(md){return(
md`The modern way to decode it is with URLSearchParams...`
)}

function _decodedFormData(URLSearchParams,formDataRaw){return(
new URLSearchParams(formDataRaw)
)}

function _64(md){return(
md`a URLSearchParams object is not very inspectible on its own, so I often convert into an ordinary data object, which is easier to work with`
)}

function _formData(decodedFormData){return(
Object.fromEntries(decodedFormData.entries())
)}

function _formPostRequestResolver(formPostRequest,$0,formData)
{
  formPostRequest;
  $0.resolve(
    `<h2>Thanks, your note was:</h2><p>${formData.note}</p>`
  );
}


function _67(md){return(
md`### Serving media (e.g. images)

To server images (or video) you must return the data along with the correct [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the [\`content-type\` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type).

Let's show how this works by serving an Observable Plot (SVG) and a random png. `
)}

function _imgRequest(flowQueue){return(
flowQueue()
)}

function _69(imgRequest){return(
imgRequest
)}

function _70(md){return(
md`Lets visualize what requests the webserver has seen in its history. When _livecoding_ the log will be just your session, when not _livecoding_, this will scoped to the shared serverside session (!)`
)}

function _weblog(){return(
[]
)}

function _72(md){return(
md`We have to decouple dataflow from weblog updates so the \`imgRequest\` pipeline is not triggered by \`weblog\` changes. We can use a \`mutable\` for this.`
)}

function _visualizationUpdater($0,Plot,weblog)
{
  $0.value = Plot.plot({
    x: {
      type: "time",
      label: "time"
    },
    marks: [Plot.tickX(weblog)]
  });
}


function _weblogDataviz(){return(
undefined
)}

function _75(md){return(
md`To serve an image (and other media), you need to set the correct MIME type and send the data in an arrayBuffer. Step one is converting it to a blob. Mike Bostock has an [excellent notebook on the topic](https://observablehq.com/@mbostock/saving-svg), so we can reuse his work to convert an SVG to a Blob `
)}

function _imageData(imgRequest,serialize,$0,rasterize,$1)
{
  if (imgRequest.req.url.endsWith(".svg")) {
    return serialize($0.value);
  } else if (imgRequest.req.url.endsWith(".png")) {
    return rasterize($0.value);
  } else {
    const error = new Error(
      `Unrecognised image extension ${imgRequest.req.url}`
    );
    error.code = 400;
    $1.reject(error);
    throw error;
  }
}


function _78(md){return(
md`A correctly constructed blob has the MIME type in the type field:-`
)}

function _79(imageData){return(
imageData.type
)}

function _80(md){return(
md`The binary data can also be extracted with '.arrayBuffer()'. Passing an buffer to the response object will send binary data.`
)}

async function _imgRequestResponder(imgRequest,imageData)
{
  imgRequest.res.header("content-type", imageData.type);
  imgRequest.res.send(await imageData.arrayBuffer());
}


function _82(md){return(
md`After sending the data we can unlock the flowQueue task so the next can be handled. Again, we can look for duplicate requests to trigger refreshing the preview too (see above) because that means there was a code change in the request pipeline.`
)}

function _imgRequestResolve(imgRequestResponder,imgRequest,$0,$1)
{
  imgRequestResponder;
  if (imgRequest.req.id !== this) {
    $0.resolve("OK");
    return imgRequest.req.id;
  } else {
    $1.value++;
    return this;
  }
}


function _84(md){return(
md`If we are serving SVG correctly, we can use it as the src of an image.`
)}

function _85(refreshDashboardImage,width,webserver,htl){return(
htl.html`${(refreshDashboardImage, '')}
<img width="${Math.min(width, 640)}" src=${webserver.href + "/weblog.svg"}></img>`
)}

function _86(md){return(
md`If we are serving PNG correctly, we can also use it as the src of an image.`
)}

function _87(refreshDashboardImage,width,webserver,htl){return(
htl.html`${(refreshDashboardImage, '')}
<img width="${Math.min(width, 640)}" src=${webserver.href + "/weblog.png"}></img>`
)}

function _refreshDashboardImage(Promises){return(
Promises.delay(3000, 0)
)}

function _89(md){return(
md`### Streamed Responses

So far we have explored a few of the request/response idioms of webservers. Webservers can also stream data, which can be useful for realtime applications or [high performance websites/progressive rendering](https://dev.to/tigt/the-weirdly-obscure-art-of-streamed-html-4gc2).`
)}

function _streamRequest(flowQueue){return(
flowQueue()
)}

function _91(streamRequest){return(
streamRequest
)}

function _92(md){return(
md`In this example every time a control changes we HTML that includes a Javascript snippet to scrub the previous value, so we can have a page displaying the latest value of a control.`
)}

function* _streamRequestResponse(streamRequest,$0,invalidation)
{
  yield "ok"; // Yeild a value so request processing can proceed dowstream

  // Run the streaming outside of the runtime with event listeners
  // Its not easily possible to handle concurrent long lived requests using dataflow
  const res = streamRequest.res;
  const req = streamRequest.req;
  const changeHandler = () => {
    console.log(`change ${req.id}`);
    res.write(
      `<script>document.querySelector("pre")?.remove()</script>` +
        `<pre>latest: ${$0.value}</pre>`
    );
  };
  console.log(`opening ${req.id}`);
  res.write(`<body>Streaming for request ${req.id}`);
  changeHandler();

  $0.addEventListener("input", changeHandler);
  invalidation.then(() => {
    console.log(`close ${req.id}`);
    $0.removeEventListener("input", changeHandler);
    res.end();
  });
}


function _streamRequestResolver(streamRequestResponse,streamRequest,$0,$1)
{
  streamRequestResponse;
  if (this !== streamRequest.req.id) {
    $0.resolve("ok");
  } else {
    $1.value++;
  }
  return streamRequest.req.id;
}


function _streamingPreview(Inputs){return(
Inputs.toggle({
  label: "turn on streaming preview"
})
)}

function _96(Inputs,$0){return(
Inputs.button("refresh streaming", {
  reduce: () => $0.value++
})
)}

function _streamValue(Inputs){return(
Inputs.range([0, 1], { step: 0.001, value: 0, label: "wiggle me" })
)}

function _98(runStreamingPreview,streamingPreviewRefresh,width,link,htl){return(
htl.html`${runStreamingPreview && streamingPreviewRefresh}
<iframe width="${width}" height="100px" src=${link}></iframe>
`
)}

function _streamingCurl(link,md){return(
md`You can read streaming responses in \`curl\` but you need to turn buffering off

\`\`\`
 curl --no-buffer '${link}' 

\`\`\``
)}

function _link(webserver){return(
webserver.href + "/stream.html"
)}

function _runStreamingPreview(streamingPreview,invalidation){return(
streamingPreview ? "" : invalidation
)}

function _streamingPreviewRefresh(){return(
0
)}

function _103(md){return(
md`## Ideas for more Livecoding/Webserver examples?

Leave a comment if you want to see how to livecode up other webserver functionality`
)}

function _104(md){return(
md`---`
)}

function _105(md){return(
md`## Supporting notebook functionality`
)}

function _106(md){return(
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

function _109(md){return(
md`### Notebook Enhancements`
)}

function _110(webserver,exampleEndpoint,streamingCurl,installCopyCode,invalidation,curl_get,md)
{
  // After import {endpoint} from 'webcode' snippet is the use of the keyword 'endpoint'
  /* Upstream */ webserver, exampleEndpoint, streamingCurl;
  {
    [...document.querySelectorAll("pre")].forEach((el) =>
      installCopyCode(el, { invalidation })
    );
  }

  installCopyCode(curl_get, { invalidation });
  installCopyCode(curl_get, { invalidation });
  return md`*👈 [copy-code](https://observablehq.com/@tomlarkworthy/copy-code) button for examples*`;
}


function _113(md){return(
md`### Notebook Backup, Analytics and monitoring`
)}

function _115(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["width","md"], _2);
  main.variable(observer()).define(["toc"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("exampleEndpoint")).define("exampleEndpoint", ["endpoint","mutable handlerLog","host"], _exampleEndpoint);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["response","html"], _12);
  main.variable(observer("viewof name")).define("viewof name", ["Inputs"], _name);
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer("viewof response")).define("viewof response", ["Inputs","name","exampleEndpoint"], _response);
  main.variable(observer("response")).define("response", ["Generators", "viewof response"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["response","html"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("curl_get")).define("curl_get", ["exampleEndpoint","md"], _curl_get);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["Inputs","handlerLog"], _20);
  main.define("initial handlerLog", _handlerLog);
  main.variable(observer("mutable handlerLog")).define("mutable handlerLog", ["Mutable", "initial handlerLog"], (M, _) => new M(_));
  main.variable(observer("handlerLog")).define("handlerLog", ["mutable handlerLog"], _ => _.generator);
  main.variable(observer()).define(["Inputs","mutable handlerLog"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  const child2 = runtime.module(define2);
  main.import("flowQueue", child2);
  main.variable(observer("webserver")).define("webserver", ["endpoint","mutable weblog","viewof webRequest","host"], _webserver);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("viewof webRequest")).define("viewof webRequest", ["flowQueue"], _webRequest);
  main.variable(observer("webRequest")).define("webRequest", ["Generators", "viewof webRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["webRequest"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("viewof randomResponse")).define("viewof randomResponse", ["Inputs","webserver"], _randomResponse);
  main.variable(observer("randomResponse")).define("randomResponse", ["Generators", "viewof randomResponse"], (G, _) => G.input(_));
  main.variable(observer()).define(["webRequest"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["webRequest"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("router")).define("router", ["webRequest","viewof webRequest","viewof defaultRequest","viewof formRequest","viewof imgRequest","viewof streamRequest"], _router);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("viewof defaultRequest")).define("viewof defaultRequest", ["flowQueue"], _defaultRequest);
  main.variable(observer("defaultRequest")).define("defaultRequest", ["Generators", "viewof defaultRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["defaultRequest"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("defaultRequestHandler")).define("defaultRequestHandler", ["defaultRequest"], _defaultRequestHandler);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("defaultRequestResolver")).define("defaultRequestResolver", ["defaultRequestHandler","viewof defaultRequest"], _defaultRequestResolver);
  main.variable(observer()).define(["randomResponse"], _45);
  main.variable(observer()).define(["Inputs","viewof randomResponse"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("viewof formRequest")).define("viewof formRequest", ["flowQueue"], _formRequest);
  main.variable(observer("formRequest")).define("formRequest", ["Generators", "viewof formRequest"], (G, _) => G.input(_));
  main.variable(observer("formResponseContent")).define("formResponseContent", ["formRequest","viewof formPostRequest"], _formResponseContent);
  main.variable(observer()).define(["formRequest"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["Inputs","mutable refreshForm"], _52);
  main.variable(observer()).define(["refreshForm","width","webserver","htl"], _53);
  main.variable(observer()).define(["md"], _54);
  main.define("initial refreshForm", ["webserver","Promises"], _refreshForm);
  main.variable(observer("mutable refreshForm")).define("mutable refreshForm", ["Mutable", "initial refreshForm"], (M, _) => new M(_));
  main.variable(observer("refreshForm")).define("refreshForm", ["mutable refreshForm"], _ => _.generator);
  main.variable(observer("formResponder")).define("formResponder", ["formRequest","formResponseContent","mutable refreshForm"], _formResponder);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("viewof formPostRequest")).define("viewof formPostRequest", ["flowQueue"], _formPostRequest);
  main.variable(observer("formPostRequest")).define("formPostRequest", ["Generators", "viewof formPostRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["formPostRequest"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer("formDataRaw")).define("formDataRaw", ["formPostRequest"], _formDataRaw);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("decodedFormData")).define("decodedFormData", ["URLSearchParams","formDataRaw"], _decodedFormData);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("formData")).define("formData", ["decodedFormData"], _formData);
  main.variable(observer("formPostRequestResolver")).define("formPostRequestResolver", ["formPostRequest","viewof formPostRequest","formData"], _formPostRequestResolver);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer("viewof imgRequest")).define("viewof imgRequest", ["flowQueue"], _imgRequest);
  main.variable(observer("imgRequest")).define("imgRequest", ["Generators", "viewof imgRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["imgRequest"], _69);
  main.variable(observer()).define(["md"], _70);
  main.define("initial weblog", _weblog);
  main.variable(observer("mutable weblog")).define("mutable weblog", ["Mutable", "initial weblog"], (M, _) => new M(_));
  main.variable(observer("weblog")).define("weblog", ["mutable weblog"], _ => _.generator);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("visualizationUpdater")).define("visualizationUpdater", ["mutable weblogDataviz","Plot","weblog"], _visualizationUpdater);
  main.define("initial weblogDataviz", _weblogDataviz);
  main.variable(observer("mutable weblogDataviz")).define("mutable weblogDataviz", ["Mutable", "initial weblogDataviz"], (M, _) => new M(_));
  main.variable(observer("weblogDataviz")).define("weblogDataviz", ["mutable weblogDataviz"], _ => _.generator);
  main.variable(observer()).define(["md"], _75);
  const child3 = runtime.module(define3);
  main.import("rasterize", child3);
  main.import("serialize", child3);
  main.variable(observer("imageData")).define("imageData", ["imgRequest","serialize","mutable weblogDataviz","rasterize","viewof imgRequest"], _imageData);
  main.variable(observer()).define(["md"], _78);
  main.variable(observer()).define(["imageData"], _79);
  main.variable(observer()).define(["md"], _80);
  main.variable(observer("imgRequestResponder")).define("imgRequestResponder", ["imgRequest","imageData"], _imgRequestResponder);
  main.variable(observer()).define(["md"], _82);
  main.variable(observer("imgRequestResolve")).define("imgRequestResolve", ["imgRequestResponder","imgRequest","viewof imgRequest","mutable refreshDashboardImage"], _imgRequestResolve);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer()).define(["refreshDashboardImage","width","webserver","htl"], _85);
  main.variable(observer()).define(["md"], _86);
  main.variable(observer()).define(["refreshDashboardImage","width","webserver","htl"], _87);
  main.define("initial refreshDashboardImage", ["Promises"], _refreshDashboardImage);
  main.variable(observer("mutable refreshDashboardImage")).define("mutable refreshDashboardImage", ["Mutable", "initial refreshDashboardImage"], (M, _) => new M(_));
  main.variable(observer("refreshDashboardImage")).define("refreshDashboardImage", ["mutable refreshDashboardImage"], _ => _.generator);
  main.variable(observer()).define(["md"], _89);
  main.variable(observer("viewof streamRequest")).define("viewof streamRequest", ["flowQueue"], _streamRequest);
  main.variable(observer("streamRequest")).define("streamRequest", ["Generators", "viewof streamRequest"], (G, _) => G.input(_));
  main.variable(observer()).define(["streamRequest"], _91);
  main.variable(observer()).define(["md"], _92);
  main.variable(observer("streamRequestResponse")).define("streamRequestResponse", ["streamRequest","viewof streamValue","invalidation"], _streamRequestResponse);
  main.variable(observer("streamRequestResolver")).define("streamRequestResolver", ["streamRequestResponse","streamRequest","viewof streamRequest","mutable streamingPreviewRefresh"], _streamRequestResolver);
  main.variable(observer("viewof streamingPreview")).define("viewof streamingPreview", ["Inputs"], _streamingPreview);
  main.variable(observer("streamingPreview")).define("streamingPreview", ["Generators", "viewof streamingPreview"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","mutable streamingPreviewRefresh"], _96);
  main.variable(observer("viewof streamValue")).define("viewof streamValue", ["Inputs"], _streamValue);
  main.variable(observer("streamValue")).define("streamValue", ["Generators", "viewof streamValue"], (G, _) => G.input(_));
  main.variable(observer()).define(["runStreamingPreview","streamingPreviewRefresh","width","link","htl"], _98);
  main.variable(observer("streamingCurl")).define("streamingCurl", ["link","md"], _streamingCurl);
  main.variable(observer("link")).define("link", ["webserver"], _link);
  main.variable(observer("runStreamingPreview")).define("runStreamingPreview", ["streamingPreview","invalidation"], _runStreamingPreview);
  main.define("initial streamingPreviewRefresh", _streamingPreviewRefresh);
  main.variable(observer("mutable streamingPreviewRefresh")).define("mutable streamingPreviewRefresh", ["Mutable", "initial streamingPreviewRefresh"], (M, _) => new M(_));
  main.variable(observer("streamingPreviewRefresh")).define("streamingPreviewRefresh", ["mutable streamingPreviewRefresh"], _ => _.generator);
  main.variable(observer()).define(["md"], _103);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer()).define(["md"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer("viewof host")).define("viewof host", ["Inputs","localStorageView"], _host);
  main.variable(observer("host")).define("host", ["Generators", "viewof host"], (G, _) => G.input(_));
  const child4 = runtime.module(define4);
  main.import("localStorageView", child4);
  main.variable(observer()).define(["md"], _109);
  main.variable(observer()).define(["webserver","exampleEndpoint","streamingCurl","installCopyCode","invalidation","curl_get","md"], _110);
  const child5 = runtime.module(define5);
  main.import("installCopyCode", child5);
  const child6 = runtime.module(define6);
  main.import("toc", child6);
  main.variable(observer()).define(["md"], _113);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], _115);
  return main;
}
