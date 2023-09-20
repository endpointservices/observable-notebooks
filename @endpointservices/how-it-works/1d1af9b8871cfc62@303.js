import define1 from "./9bed702f80a3797e@402.js";
import define2 from "./293899bef371e135@293.js";

function _1(md){return(
md`# A Day in the life of a [WEBcode.run](https://webcode.run) request

With [WEBCode.run](webcode.run) you can build secure backend services using just Observable notebooks. [WEBCode.run](webcode.run) hosts multi-tenancy cross-region serverless infrastructure endpoints that forwards web traffic to handler code defined in Observable notebooks.

Because code is looked up dynamically, and because WEBCode.run's fabric is multi-tenancy, there is no deploy step even for new customers. WEBCode.run provides Observable users with a tamper-proof remote runtime, where secrets can be used to access other services security (e.g. database).

This document explains the steps taken in details to serve a request, an in particular, explains how customer isolation is achieved in a multi-tenancy environment, and how secrets remain secret.`
)}

function _2(toc){return(
toc({
  headers: "h2,h3,h4"
})
)}

function _3(md){return(
md`## Preliminaries

### Namespace

Before we begin let me explain the main jargon term I will use throughout. *namespace* denotes our primary security isolation boundary, which is an extrapolation of Observable's security model.

On the Observable platform, user notebooks are served from an iframe:

\`<namespace>.static.observableusercontent.com\`

So while the top-level domain you seen in your browser URL bar is always \`observablehq.com/<something>\` underneath the notebook is hosted on the origin \`<namespace>.static.observableusercontent.com\`. 

\`<namespace>\` can be either the username or the team name of the notebook owner. Using unique content origins for each account is a technique that uses the browser's security model of keeping data from one site isolated from another ([same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)).

WEBCode keys its resources by the same identifiers and enforces one namespace cannot access resources from another as well. So it's very important to understand our use of the term namespace.

**WEBCode.run does not handle any sensitive PII**, all resources and access control is keyed by **namespace**.
`
)}

function _4(md){return(
md`## A Day In the Life of a WEBCode.run request.

Something (a user or a machine), somewhere (browser, or CLI) initiates a HTTP request to 

\`https://webcode.run/observablehq/@example/mynotebook;api/subpath?arg=1\`

Here are the important steps of request will take as it is handled.

### WEBCode CDN

The WEBcode domain \`webcode.run\` points to a global load balancer with CDN, if the webcode handler has used cache-control headers to store content in the CDN, the request may be served from a HTTP cache geographically close to the initiator. 

### WEBCode Load Balancer

Next, the request is routed by the global load balancer to a regional cluster. Normally this is to the closest (Anycast), but you can deterministically control it by prefixing the path with \`/region/{region}\` too.

### Cloud Run Regional Cluster

Request are served by a Cloud Run instance in each region. [Cloud Run](https://cloud.google.com/run) is an autoscaling container hosting service. Additional containers are spun up on-demand, we pay from a minimum number of instances to minimize cold starts.

### WEBcode.run Runtime

The container image is the WEBCode.run runtime ([Dockerfile](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/Dockerfile#L1)). 

### WEBcode.run Express Server

Inbound requests are decoded by an Express server in the container (the [route](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/index.mjs#L86)). The URL is parsed ([source](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/observable.mjs#L3)). \`

`
)}

function _5(md){return(
md`### Request Decoder

From a URL like \`https://webcode.run/observablehq/@example/mynotebook;api/subpath?arg=1\` the parser tries to discover the following information

- The code hosting platform (e.g. observablehq)
- The namespace (example)
- The notebook name (mynotebook)
- The handler name (api)

There is some extra information like user subpaths, headers, and query args but these are not interesting to the runtime. Sometimes the runtime cannot determine the namespace (e.g. \`d/1d1af9b8871cfc62\`), in which case it creates a temporary namespace for it.

A unique id is generated for each request.
`
)}

function _6(md){return(
md`### Protection Rate limits

Early in the request processing, we apply some rate-limiting by IP address and the endpoint being accessed. This rate limit is for primarily protecting against mistakes.`
)}

function _7(md){return(
md`### Dynamic config subscription

Developer configuration set in the Webcode Endpoint UI is subscribed to (if not already). Note config changes are pushed in realtime to interested WEBCode servers for immediate responsiveness to changes. Some things held in dynamic configuration include

- Secret configuration
- Live-coding routing information

Configuration is hosted on Firestore, so developer updates affect production in realtime, as webcode servers have active connections.

### Routing decision

The runtime makes a decision on whether to handle the request using a headless browser in the server, or whether the request should be handled by a developer in a live-coding session on the developer's machine.

For this example we assume there is no live-coding session open so the request is handled using a headless browser
`
)}

function _8(md){return(
md`
### **Namespaced** Browser

Each namespace is given a unique Chrome process for isolation. So all webcode requests for a given namespace share the same Chrome instance. It would have been nice to share a single instance of Chrome, but Chrome per tab sandbox does not work in a containerized environment (see [securing a multi-tenancy puppeteer installation](https://tomlarkworthy.endpointservices.net/blogs/securing-a-serverless-multi-tenancy-puppeteer-service.html)).

So an instance of Chrome is opened if one has not been cached. Automation of the browser uses Puppeteer.

We protect ourselves against serverside scripting by configuring Chrome to use an outbound HTTP proxy ([tinyproxy](http://tinyproxy.github.io/)) so we can null-route dangerous ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)) requests  in [configuration](https://github.com/endpointservices/webcode.run/blob/main/tinyproxy.conf#L11).

### Page Tab

For a given request, the *embed* URL for the target notebook is loaded. So 

\`https://webcode.run/observablehq/@example/mynotebook;api/subpath?arg=1\` uses

\`https://observablehq.com/embed/@example/mynotebook\`

WEBCode calls will try to reuse tabs where possible. If the tab is not in the cache, then a new tab is opened.

### Tab Instrumentation

Before navigation, some WEBCode tooling is installed:
- Some information is injected as context ([source](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/index.mjs#L163))
- a callback handler is installed, which is used for passing data from the WEBCode handler back to the runtime ([source](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/index.mjs#L176)).
- Javascript logs are redirected ([source](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/index.mjs#L171))

### Load the embedded notebook

The Runtime loads the embedded version of the target notebook. This contains Javascript, including the WEBCode.run [endpoint](https://observablehq.com/@endpointservices/webcode#endpoint) SDK call.

### iframe detector

As the page loads the runtime can obtain the authoritative namespace from the iframe element.


`
)}

function _9(md){return(
md`### Secrets Loader

Secrets are scoped at the namespace level. In fact, in the backend, all secrets are prefixed by the owning namespace, so it's very easy to validate permissions.

### Execute Javascript  

An embedded notebook will start executing. The WEBCode SDK call registers the request handler in the global window object.

### Wait for handler

The WEBCode.run node.js runtime waits for the handler to be visible and obtains a reference to it([source](https://github.com/endpointservices/webcode.run/blob/5f04058c4d961cb86925e1bcc690d10ec1ee40ec/index.mjs#L240)).

### Call handler

The outer Express Request is transformed to WEBCode Request and forwarded to the in-notebook handler for processing. The context of the request is included, which includes any secrets.

### Notebook communicates with callback

In user space, a WEBCode.run handler may make multiple calls to response.header, response.write before finishing with response.end. These SDK calls are routed to the callback handler along with the request ID, so a single notebook is capable of handling multiple requests concurrently.

### Callback forwards to node.js Response 

WEBCode.run response invocations typically call the equivalent method on the node.js Response object. There is special handling for binary data where WEBCode SDK uses TypedArrays instead of Node.js Buffers.

### Close request

After the handler returns, the request will be closed, or an error occurs. Regardless, the request is finished and resources are tidied, and the system logs record the duration.
`
)}

function _10(md){return(
md`## Discussion

### WEBCode offers private untamperable execution traces for Observable users

When a request is run, the source code is fetched with TLS from Observablehq.com domain by WEBCode.run servers and executed remotely. The caller has no way of messing with the execution or observing the execution (beyond what is received in the response). This has a number of useful properties for building secure digital services

- Private information, such as system secrets, can be handled.
- You can trust code is executed correctly, such as access control checks and calls to privileged backend APIs.`
)}

function _11(md){return(
md`### Only Notebook Owners can change the source code

Because WEBCode.run reads the handler source from Observable. The only way the code for a handler can be changed is by a person with write access to the notebook.
`
)}

function _12(md){return(
md`### Secrets are securely scoped

WEBCode.run knows the *namespace* of an executing notebook, and secrets are stored in a *namespace*. WEBCode.run enforces that only notebooks can access secrets of the same notebooks. The code that retrieves secrets (from any namespace) is part of the node.js runtime, and thus not accessible from userspace.   

Userspace HTTP handlers are always in a *namespace*, and thus, can only access secrets in the same *namespace*. The WEBCode.run runtime fetches secrets based on configuration and does an access check before injecting them into a userspace context.

Developers from other namespaces cannot write code to access a specific namespace's secrets, because they cannot publish code to a notebook in that namespace, or set up a live-coding tunnel under that that namespace. 
`
)}

async function _13(FileAttachment,md){return(
md`### Live-coding sessions

When a live-coding tunnel is active, requests are forwarded through a Realtime Database to a developer's open notebook. This means the latest source code can be used against the request, or the developer can intercept and inspect the request using a debugger.

Handling live production data is a privileged operation, furthermore, in order for code that uses secrets to work, secrets must also be forwarded to the developer's session. Thus, live-coding can only be initiated by the owner or team member of the namespace who would have access to these resources already.

## Authentication via Login with Comment

To offer additional services such as live-coding or setting secrets we need to be able to identify the caller of API endpoints as having write access to an Observable namespace (encoded as a JWT claim).

Endpoint Services uses a federated login strategy [endpoint-login-with-comment](https://observablehq.com/@endpointservices/endpoint-login-with-comment) which figures out the login identities of the caller. 

### Backend is \`@endpointservices/endpoint-login-with-comment\`

All login requests (even those from forked notebooks) are forwarded to \`@endpointservices/endpoint-login-with-comment\` which has access to the SECRET "endpointservices_secretadmin_service_account_key" which is a service account key able to sign custom *access_token* with claims.

See *[getAccessTokenFromServiceAccount](https://observablehq.com/@tomlarkworthy/firebase-admin#getAccessTokenFromServiceAccount)* source code for minting RS256 JWT Google that is exchanged at *https://oauth2.googleapis.com/token*

### Public/Private key challenge

To sign in, a user first PREPAREs the backend by sending a PRIVATE_KEY. Second, the user leaves a comment containing a PUBLIC KEY on a notebook.

The backend can read the comment using Observable's own API, which includes the Observable login ID. The user follows with a call to VERIFY, at which the backend then can infer a number of facts 
- The user's login ID on Observable (from results in the Observable API)
- The namespace they wish to login (by which notebook they commented on)
- The caller of VERIFY is the user by checking the PUBLIC/PRIVATE key correspondence.

Thus the backend can confidently sign an access_token and return it to the caller, using its secret key that certifies the bearer as being an Observable user with a specific login. There is a 10-minute timeout between PREPARE and VERIFY calls, and the user is informed that verifying will expose their login name to the calling service.

### Team Support

On login, a user can opt-in for team scanning. The user's observable profile's weblinks will be read looking for links to team profiles, and those team profiles will be scanned for weblinks back to the users profile.

### JWT tokens isolated to the current domain

A successful challenge results in a short-lived access_token which can be exchanged for a long-lived custom Firebase auth session ([signinWithAccessToken](https://observablehq.com/@tomlarkworthy/firebase-admin#signinWithAccessToken)). Long term state is stored in *localstorage*, and hence scoped to the current domain. (i.e. you have to login for each *namespace*, but you login once for all notebooks in a given namespace).

### Forkable

Anybody can use the login form when it appears in a notebook hosted on @tomlarkworthy or @endpointservices domain. If you login from a notebook hosted on namespace "foo" it will only work for user "foo". This enables the following story

As "foo" you use a utility on @endpointservices. You later decide to customize the utility, so you fork the notebook. This fork is now hosted on namespace "foo", so your previous login credentials are not visible. You log in again, and obtain a session for "foo". You previous work is now visible because all @endpointservice resources are keyed by the claimed Observable ID which is consistent across both namespaces. 


### No storage of sensitive PII

JWTs are signed with Observable login IDs, not emails. This is what the Firebase Auth console shows (note Identifier is empty, which normally contains email addresses)

<img src=${await FileAttachment("image.png").url()} style="max-width:640px;" ></img>

(Observable login IDs are examples of non-sensitive PII, identifiable information that is derived from public sources.)

As a result, **WEBCode.run does not handle any sensitive PII**, all resources and access control are keyed by **namespace**.

`
)}

function _16(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/e2dd63f1534603fb2a771d36d8ee0dfd2ffc6127bcf991856298cf79c5bd6faaca8ffd566628a50b9cf8d53c1674b2b2bc9752c2a47122cd2efec6621b2e26a4.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["FileAttachment","md"], _13);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _16);
  return main;
}
