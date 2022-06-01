// https://observablehq.com/@endpointservices/sentry@227
import define1 from "./fa1f6059e44da1d5@408.js";
import define2 from "./58f3eb7334551ae6@209.js";

async function _1(FileAttachment,md){return(
md`# [Observablehq.com](https://observablehq.com) Notebook Monitoring with [sentry.io](sentry.io)

Sick of broken notebooks? Don't be that guy!

<figure>
<img src=${await FileAttachment("image@4.png").url()}></img>
<figcaption>Have you tried refreshing the page?</figcaption>
</figure>


With some minor configuration you can have [sentry.io](sentry.io) monitor notebooks for unexpected errors, so you get informed fast when something breaks, and get to the bottom of those tricky to repro issues.

Best thing? For low traffic single developer use cases.... its FREE

\`\`\`js
import {sentry} from '@endpointservices/sentry'
\`\`\`

Usage
\`\`\`js
  sentry({
    DSN: "..." // find in the Client Keys section of Sentry,
    namespaces: ['tomlarkworthy', 'endpointservices'] // Change to your namespace(s)
  })
\`\`\``
)}

function _2(md){return(
md`### Change log
- 2022-03-31 Added *catchAll* to report runtime caught error (previously a blind spot)`
)}

async function _3(FileAttachment,md){return(
md`## Example Sentry error report

Sentry will notify you if an exception is thrown, and tries to group them. It will include

- Error message
- URL of the notebook
- OS, browser, device

Here is a real one my notebooks are throwing occasionally at the moment!

![image@1.png](${await FileAttachment("image@1.png").url()})

It will also include the last few requests that occured, and the stack trace. In this report there is a problem loading the Firebase SDK, which I have realised is a rare, but regular occurrence! With that information I can see my users would benefit with an upgrade to the new SDK which is packed in a [modular ESM compatible way](https://firebase.google.com/docs/web/modular-upgrade)

![image@2.png](${await FileAttachment("image@2.png").url()})
`
)}

async function _4(FileAttachment,md){return(
md`### Configuring Sentry

By default Sentry collects IP addresses which is sensitive personal data by GDPR definitions. So I recommend turning this off and turning on various other data scrubbing tools in the settings.

![image@3.png](${await FileAttachment("image@3.png").url()})`
)}

function _5(md){return(
md`### Sentry

We customize Sentry initialization to rewrites the URL, so usage is reported against the top level Observable URL and not the nonsensical content domain of the userspace iframe. Include your Sentry supplied DSN and which Observable NAMESPACEs you wish to report errors for.

\`\`\`js
  sentry({
    DSN: "..." // find in the Client Keys section of Sentry,
    namespaces: ['tomlarkworthy', 'endpointservices']
  })
\`\`\`
`
)}

function _sentry(html,location,Sentry,Tracing,catchAll,invalidation){return(
({ DSN, namespaces } = {}) => {
  if (!DSN) throw new Error("You must supply your DSN");
  if (!namespaces)
    throw new Error(
      "You must supply are array of namespaces to active sentry for"
    );
  const selfUrl = html`<a href="?">`.href;
  if (
    !(
      namespaces.find((namespace) => selfUrl.includes(`@${namespace}`)) ||
      namespaces.find((namespace) =>
        location.origin.includes(`https://${namespace}`)
      )
    )
  ) {
    return; // Do not initialize Sentry for unexpected namespaces
  }
  const sentry = Sentry.init({
    dsn: DSN,
    beforeSend: (event) => {
      event.request.url = html`<a href="?">`.href.split("?")[0];
      return event;
    },
    integrations: [new Tracing.Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
  catchAll((cellName, reason) => {
    Sentry.captureException(reason);
  }, invalidation);

  return Sentry;
}
)}

function _Sentry(){return(
import("https://cdn.skypack.dev/@sentry/browser?min")
)}

function _Tracing(){return(
import("https://cdn.skypack.dev/@sentry/tracing?min")
)}

function _11(md){return(
md`### Works with [WEBCode.run](https://webcode.run)

Because the Observable native, functions-as-a-service runtime [webcode.run](https://webcode.run) is run inside a browser, you get reports of server side errors too!
`
)}

function _13(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/c8ad4ae31da35d2adf2a7256ef6791d044f4d0c2982b9ea6597838d5f012063838e769af1750f2acd52b25ff7299c584cd58fd5adcc9d595eedc6a3cabd46cc3", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/d514902a6a0977910569cbaead516077a7e2f21427c26cc4f15d73109a26771fcec180662b1724eb7a0038f555c0aadf7ddc3daf9b3a51b6722ec9064d8ad72d", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/6ff8fd10b917ca3215af6f21bc97a25ef7c20dc1921e40f9615c2929dd0c0e502a4049d9e8565efbff1b7258e5494d87490079ed0956dc25e364ff1f8a72f3f9", import.meta.url), mimeType: "image/png", toString}],
    ["image@4.png", {url: new URL("./files/dcdaa39e4be97c69d27e82a6df66d263e0f4e32412268cbc40f2b1d08c1225b50a88a30416bda1e2a652d484d13b9cf7588625258dec0f4b1890fde5a38f2bf0", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["FileAttachment","md"], _3);
  main.variable(observer()).define(["FileAttachment","md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("sentry")).define("sentry", ["html","location","Sentry","Tracing","catchAll","invalidation"], _sentry);
  main.variable(observer("Sentry")).define("Sentry", _Sentry);
  main.variable(observer("Tracing")).define("Tracing", _Tracing);
  const child1 = runtime.module(define1);
  main.import("catchAll", child1);
  main.variable(observer()).define(["md"], _11);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _13);
  return main;
}
