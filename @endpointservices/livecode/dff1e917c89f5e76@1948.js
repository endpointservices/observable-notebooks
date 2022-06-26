// https://observablehq.com/@endpointservices/serverless-cells@1948
import define1 from "./8aac8b2cb06bf434@261.js";
import define2 from "./58f3eb7334551ae6@210.js";

async function _1(FileAttachment,width,md){return(
md`# Serverless Cells

** The next iteration of serverless cells is called [webcode](https://observablehq.com/@endpointservices/webcode). Webcode improves by adding live coding, instant deploys and production debugging, as well as a UI, new projects should probably use [webcode](https://observablehq.com/@endpointservices/webcode) rather than this one (though they are compatible)**

<img width=640 src=${await FileAttachment(
  "PreviewServerlessCells@2.png"
).url()}></img>

Serverless cells provide a [no-ops](https://betterprogramming.pub/devop-noops-difference-504dfc4e9faa) serverless backend to Observable. When you publish a serverless cell, a HTTP endpoint becomes available on [webcode.run](https://webcode.run). The endpoint reads the http handler source code using Puppeteer and responds to incoming requests accordingly.

This means:
- Notebooks can handle frontend and backend tasks.
- No deployment step, no CLIs or tools to install locally. Everything can be done through a browser.
- Seamless code sharing between the notebook frontend and the serverless-cell backend.

## Dynamic Webcode URLs

<img style="max-width: ${width}"src=${await FileAttachment("webcodeURL@1.svg").url()}></img>

A webcode URL encodes the information needed to find source code on the web. It comprises of four major parts.
1. The runtime host describes which server will run the code (self-hosting is an option).
2. The code host and location is a URL to webpage containing the source code for HTTP request handlers.
3. As each page may have several handlers defined, the specific handler to run is specified by name delimited after a **;**.
4. Further URL segments and query parameters may be present, which are also routed to the HTTP handler.
 
### Secure

Each namespace is given a unique Puppeteer, for data isolation. Secrets stored by [webcode.run](https://webcode.run) can be injected into the runtime, enabling secure development of public services and API integrations in an isolated environment.

**CORS is disabled**, making it a useful [CORS proxy](https://observablehq.com/@tomlarkworthy/fetchp) and able to interface with most APIs.

### Safe

Every notebook and unique ip address is limited to a sustained rate of 1 call per second with 20 successive bursts possible. A status code of 429 causes backoff. **Serverless-cells cannot invoke each other in endless self-triggering loops** (see *modifiers* for details).


## The Foundation of an Open Cloud

Because the source is defined within an _Observable_ notebook also implies the source code can be audited, edited and forked by anyone too. 

- Its a serverless runtime that *only* executes public source code
- API endpoints are not a black box, users can audit what code is running before sending data to it.
- You can learn how others approach backend programming from tangible, live implementations.
- You can fork and customize an implementation of an API service using normal Observable notebook features.

### Open Cloud Services

Serverless cells are being used to build an Open Cloud, some of the services so far

- An [IndieWeb authentication server](https://observablehq.com/@endpointservices/auth), used to login user using their personal homepages.
- A [CORS proxy](https://observablehq.com/@tomlarkworthy/fetchp) service, used to get around those pesky CORS errors. Also can do BASIC AUTH and secret injection.
- [Secret Manager](https://observablehq.com/@endpointservices/secrets) is the service used to upload secrets. 
- A [cloud cron](https://observablehq.com/@endpointservices/cron) service, you can trigger your serverless cells on a schedule.
- [Zapier](https://observablehq.com/@endpointservices/zapier) integration, so you can get access to thousands of APIs
- [Puppeteer-as-a-service](https://observablehq.com/@endpointservices/puppeteer) for end2end testing (WIP)
- [Netlify](https://observablehq.com/@endpointservices/netlify) for deploying static sites using partial deploys. 
- A [word2vec](https://observablehq.com/@endpointservices/word2vec) service that serves the entire Google word2vec corpus.

### Open Runtime

Runtime of the source code is published here: https://github.com/endpointservices/serverlesscells

## The possibilities are endless
You can use that link to achieve whatever you like! Your handler can do anything, such as serve HTML, increment counters, etc. It's a real URL on the public internet executing your notebook code when called!   

Serverless cells increase the scope of what you can achieve with Observable. You can dynamically build and serve completely custom HTML, providing you full control over meta tags, link previews, share buttons, HTTP methods, headers, etc.



## Getting Started

Get up and running with the [quickstart](https://observablehq.com/@endpointservices/serverless-cells-quickstart). Find executable examples in the [test notebook](https://observablehq.com/@endpointservices/serverless-cell-tests). Performance and reliability are tracked with the [latency monitor](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor) notebook.


## Import snippet

~~~js
    import {deploy, getContext} from '@endpointservices/serverless-cells'
~~~

## Get help at the chat server

Come hang out with us on the [d3 Zulip server](https://d3js.zulipchat.com/#narrow/stream/289603-serverless-cells/topic/Welcome.20to.20Serverless.20Cells)
`
)}

function _2(md){return(
md`### Example`
)}

function _host(Inputs){return(
Inputs.select(["webcode.run", "http://localhost:8080"], {
  label: "host"
})
)}

function _region(Inputs){return(
Inputs.select(
  ["nearest", "us-central1", "europe-west1", "asia-east1"],
  {
    label: "region"
  }
)
)}

function _livecode(Inputs){return(
Inputs.radio(["unspecified", "false", "public"], {
  label: "livecode?"
})
)}

function _6(deploy,host,region,livecode){return(
deploy(
  "default",
  async (req, res) => {
    res.send(req);
  },
  {
    host: host,
    ...((region !== "nearest") & { region }),
    livecode
  }
)
)}

function _7(md){return(
md`### Implementation`
)}

function _deploy(onVersionPublished,generateSessionId,Response,subdomain,getContext,html){return(
function (label, handler, options) {
  onVersionPublished; // Ensure all users of this have the onPublish hook installed
  if (typeof label !== "string")
    throw new Error(
      "The first parameter 'name' must be a unique string to disambiguate different endpoints, using'default' will exclude it from the URL"
    );

  options = options || {};
  const modifiers = options.modifiers || ["external"];
  if (typeof options.livecode === "string") {
    options.livecode = options.livecode.toUpperCase();
  }
  // We have to generate sessions if we are live coding
  const session =
    options.livecode === "PUBLIC" ? generateSessionId(label) : undefined;

  const isExternal = modifiers.includes("external");
  const isTerminal = modifiers.includes("terminal");
  const isOrchestrator = modifiers.includes("orchestrator");

  window["deployments"] = window["deployments"] || {};

  window["deployments"][label] = (req, context) =>
    new Promise((resolve, reject) => {
      req.query = req.query || {};
      const res = new Response(req, resolve);
      window["@endpointservices.context"] = context;
      try {
        Promise.resolve(handler(req, res, context)).catch((err) => reject(err));
      } catch (err) {
        reject(err);
      }
    });

  window["deployments"][label].config = {
    reusable: options.reusable || false,
    modifiers: options.modifiers,
    secrets: options.secrets
  };

  const host =
    options.host && /http(s?):\/\//.exec(options.host)
      ? options.host
      : "https://" + (options.host || `webcode.run`);

  const region = options.region ? `/regions/${options.region}` : "";
  try {
    // Bug fix
    if (options.hostNotebook) options.hostNotebook = "/" + options.hostNotebook;

    const namespace = subdomain();
    const notebook = options.hostNotebook
      ? options.hostNotebook.split("/")[1]
      : getContext().notebook;
    const name = label === "default" && !session ? "" : `;${label}`;
    const correlation = session ? `;${session}` : "";
    const link =
      `${host}${region}/observablehq.com` +
      (options.hostNotebook ||
        `${notebook.startsWith("d/") ? "" : `/@${namespace}`}/${notebook}`) +
      `${name}${correlation}`;
    return html`<a href="${link}" target="_blank">${link}</a>`;
  } catch (err) {
    console.error("Links don't work when embedded, but the deployed code does");
    return Object.defineProperty({}, "href", {
      get: () => {
        throw new Error(
          "Serverless cells do not work on embedded or unshared pages, unless you set the hostNotebook option"
        );
      }
    });
  }
}
)}

function _onVersionPublished(onVersion){return(
onVersion((metadata) => {
  // Run the cache invlidation routines when a new version is published
  // See https://observablehq.com/@endpointservices/webcode-onpublish
  fetch(
    `https://webcode.run/observablehq.com/@endpointservices/webcode-onpublish;onpublish?id=${metadata.id}`
  );
})
)}

function _getContext(subdomain,notebook){return(
() => window["@endpointservices.context"] || (() => ({
  serverless: false,
  namespace: subdomain(),
  notebook: notebook(),
  secrets: {}
}))()
)}

function _Response(){return(
class {
  constructor(req, done) {
    this.req = req;
    this.done = done;
    this._headers = {};
  }
  _pack(arg) {
    if (arg === undefined) return undefined;
    if (
      arg instanceof Object.getPrototypeOf(Uint8Array) ||
      (arg.constructor && arg.constructor.name === "ArrayBuffer")
    ) {
      function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      return {
        ARuRQygChDsaTvPRztEb: "bufferBase64",
        value: arrayBufferToBase64(arg.buffer || arg)
      };
    } else {
      return arg;
    }
  }
  send(arg) {
    if (arg === undefined) throw new Error("arg required");
    this._send = this._pack(arg);
    this.finish();
  }
  async write(chunk) {
    if (window["@endpointservices.callback"]) {
      return window["@endpointservices.callback"](this.req.id, "write", [
        this._pack(chunk)
      ]);
    } else {
      return window["@endpointservices.write"](this._pack(chunk));
    }
  }
  json(arg) {
    if (arg === undefined || arg === null) throw new Error("arg required");
    this._json = arg;
    this.finish();
  }
  end() {
    this._end = true;
    this.finish();
  }
  redirect(url) {
    let address = url;
    let status = 302;
    if (arguments.length === 2) {
      status = arguments[0];
      address = arguments[1];
    }
    this.header("Location", address);
    this.status(status);
    this.end();
  }
  status(number) {
    if (number === undefined) throw new Error("arg required");
    if (window["@endpointservices.callback"]) {
      window["@endpointservices.callback"](this.req.id, "status", [number]);
    } else if (window["@endpointservices.status"]) {
      window["@endpointservices.status"](number);
    } else {
      this._status = number;
    }
    return this;
  }
  header(arg1, arg2) {
    if (window["@endpointservices.callback"]) {
      window["@endpointservices.callback"](this.req.id, "header", [arg1, arg2]);
    } else if (window["@endpointservices.header"]) {
      window["@endpointservices.header"](arg1, arg2);
    } else {
      this._headers[arg1] = arg2;
    }
    return this;
  }
  finish() {
    if (this.done) this.done(this.toData());
  }
  toData() {
    return {
      ...(this._send && { send: this._send }),
      ...(this._json && { json: this._json }),
      ...(this._end && { end: this._end })
    };
  }
}
)}

function _12(md){return(
md`
### Change Log
  - 2021-08-07
    - URL improvements
      - secrets and modifiers no longer in URL, for much cleaner URLs, also name of function added as ;suffix.
      - d/{id} notebooks now work (as long as they are link shared)
      - @version pinning works in the URL too 
  - 2021-05-20: streaming support, use res.write() to respond in chunks
  - 2021-05-20: switch to webcode.run as primary host (supports anycast and choosing region and higher performance)
  - 2021-05-18: can set a custom host with option.host
  - 2021-05-13: cookies moved to [Express router](https://observablehq.com/@tomlarkworthy/api-hosting-with-express) as its quite a weighty dependency
  - 2021-05-30: hostNotebook options allows URL to be pinned to a specific notebook.
  - 2021-04-26: Improved cold start performance and simplifying sending binary buffers
  - 2021-03-22: Modifiers added. "terminal" cells can be called by other cells.
  - 2021-03-21: US and Asia regions added
  - 2021-03-12: Support for send(arrayBuffer) (e.g. images)
  - 2021-03-01: [Source code](https://github.com/endpointservices/serverlesscells) of runtime made availible on Github
  - 2021-02-22: Configure test suite better to avoid timeouts.
  - 2021-01-30: Added signed cookie support
  - 2021-01-26: Added 'default' deployment for smaller URL endpoints
  - 2021-01-25: Bugfix: req.url was sometimes lost or a '/' appended to end
  - 2021-01-21: Disabled CORS in general, as its not so useful being user configurable
  - 2021-01-05: Changed name to serverless cells.
  - 2021-01-05: Rate limits added on incoming IP address and cell URL
  - 2020-12-30: Namespace field added to context argument.
  - 2020-12-28: Return undefined for embedded anchor results
  - 2020-12-04: CDN added (Use Cache-Control headers)
  - 2020-11-18: Serverside performance increase
  - 2020-11-17: Published
`
)}

function _13(md){return(
md`

# API Reference

## deploy(_label_, _handler_, _options_)

returns a link attached to the handler. Supports all HTTP verbs

### _label_
The deployment label, must be unique. Maybe later this will become a URL path


### _handler_

Express style web handler of the form 

~~~js
function(request, response, context)
~~~
where

#### handler _request_

contains the following fields. See https://expressjs.com/en/api.html#req

~~~js
{
    baseUrl
    url
    headers
    ip
    method
    query
    body
    cookies
}
~~~

#### handler _response_

has the following methods. See https://expressjs.com/en/api.html#res

~~~js
{
  send(arg)
  json(arg)
  status(number)
  header(key, value)
  redirect(code, location)
  write(chunk)
  end()
}
~~~

#### handler _context_

Context allows the server environment to add additional private information

~~~js
{
  notebook: "serverless-cells",
  namespace: "endpointservices", // subdomain source e.g. tomlarkworthy
  secrets: {} // map of secret values
}
~~~

### _options_

~~~js
{
  cell,
  host,
  hostNotebook
  secrets: [...]
  region
  modifiers: ["terminal", "external", "orchestrator"]
}
~~~

#### cell

The cell options states what **named** cell the _deploy_ call is in. With this defined the the serverside executor can expand just the cells needed to run the code, greatly improving performance.
#### host

Alternative host to send request to, for self hosted or local solutions.

#### hostNotebook

Fixes the notebook to a specific notebook, example: *@endpointservices/storage*. This will allow the endpoint to work even when embedded.

#### secrets

An array of secret keys to request in context. Secret names must be prefixed by the user subdomain (e.g. tomlarkworthy)

#### region

Which part of the world should run the handler. Defaults to europe-west1. Also accepts us-central1 and asia-east1.

#### modifiers

By default Serverless cells cannot be called by other Serverless cells and can only be invoked by "external" requests. If a cell is marked as "terminal" it may be called by other serverless cells but it cannot call other cells itself (even terminal ones). "orchestrator" can call other serverless cells except other _orchestrators_.


`
)}

function _14(md){return(
md`## Express Routing

You can attached an Express router to allow fine grained path based responses. Find out more [here](https://observablehq.com/@tomlarkworthy/api-hosting-with-express).

`
)}

function _chars(){return(
"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
)}

function _salt(){return(
window.crypto
  // ~6 bits per selection, we need 120
  .getRandomValues(new Uint32Array(Math.ceil(120.0 / 5.9)))
)}

function _generateSessionId(salt,chars){return(
(name) => {
  const letters = new Uint32Array(salt);
  for (let i = 0; i < name.length; i++) {
    letters[i] = salt[i] ^ name.charCodeAt(i % name.length);
  }
  return letters
    .reduce((acc, n) => acc.concat(chars[n % chars.length]), [])
    .join("");
}
)}

function _subdomain(html,location){return(
(url) => {
  url = url || html`<a href="">`.href;
  const origin = location.origin;
  let match;
  if (match = /^https:\/\/observablehq.com\/@([^/]*)/.exec(url)) return match[1]
  if (match = /^https:\/\/([^.]*).static.observableusercontent.com/.exec(url)) return match[1]
  if (match = /^https:\/\/observablehq.com\/@([^/]*)/.exec(origin)) return match[1]
  if (match = /^https:\/\/([^.]*).static.observableusercontent.com/.exec(origin)) return match[1]
  return undefined;
}
)}

function _notebook(html){return(
(url) => {
  url = url || html`<a href="">`.href;
  let match;
  if (match = /^https:\/\/(next\.)?observablehq.com\/@[^/]*\/([^/?#]*)/.exec(url)) return match[2]
  if (match = /^https:\/\/(next\.)?observablehq.com\/(d\/[^/?#]*)/.exec(url)) return match[2]
  throw new Error("Cannot determine notebook name")
}
)}

function _22(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["PreviewServerlessCells@2.png", {url: new URL("./files/b62247c0e9ee195b70aa8001ba70002ac1d3465e3d03f6a634290cc9c530f0c6cbf1a49c8dc9d726a3a3fe3cc36c269575739c0586586b6aab24ae344911add9.png", import.meta.url), mimeType: "image/png", toString}],
    ["webcodeURL@1.svg", {url: new URL("./files/b797ffea682c2d1260334582978e5f92834b1ad2a93e12355f5a2ccc8de7ffbe47b72ca03fedf0df413dfdc5ca722120a62728b6dd20d17047bdb0a26124da97.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","width","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof host")).define("viewof host", ["Inputs"], _host);
  main.variable(observer("host")).define("host", ["Generators", "viewof host"], (G, _) => G.input(_));
  main.variable(observer("viewof region")).define("viewof region", ["Inputs"], _region);
  main.variable(observer("region")).define("region", ["Generators", "viewof region"], (G, _) => G.input(_));
  main.variable(observer("viewof livecode")).define("viewof livecode", ["Inputs"], _livecode);
  main.variable(observer("livecode")).define("livecode", ["Generators", "viewof livecode"], (G, _) => G.input(_));
  main.variable(observer()).define(["deploy","host","region","livecode"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("deploy")).define("deploy", ["onVersionPublished","generateSessionId","Response","subdomain","getContext","html"], _deploy);
  main.variable(observer("onVersionPublished")).define("onVersionPublished", ["onVersion"], _onVersionPublished);
  main.variable(observer("getContext")).define("getContext", ["subdomain","notebook"], _getContext);
  main.variable(observer("Response")).define("Response", _Response);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("chars")).define("chars", _chars);
  main.variable(observer("salt")).define("salt", _salt);
  main.variable(observer("generateSessionId")).define("generateSessionId", ["salt","chars"], _generateSessionId);
  main.variable(observer("subdomain")).define("subdomain", ["html","location"], _subdomain);
  main.variable(observer("notebook")).define("notebook", ["html"], _notebook);
  const child1 = runtime.module(define1);
  main.import("onVersion", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _22);
  return main;
}
