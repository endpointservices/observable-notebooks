// https://observablehq.com/@endpointservices/sentry-io@143
import define1 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image@1.png",new URL("./files/c8ad4ae31da35d2adf2a7256ef6791d044f4d0c2982b9ea6597838d5f012063838e769af1750f2acd52b25ff7299c584cd58fd5adcc9d595eedc6a3cabd46cc3",import.meta.url)],["image@2.png",new URL("./files/d514902a6a0977910569cbaead516077a7e2f21427c26cc4f15d73109a26771fcec180662b1724eb7a0038f555c0aadf7ddc3daf9b3a51b6722ec9064d8ad72d",import.meta.url)],["image@3.png",new URL("./files/6ff8fd10b917ca3215af6f21bc97a25ef7c20dc1921e40f9615c2929dd0c0e502a4049d9e8565efbff1b7258e5494d87490079ed0956dc25e364ff1f8a72f3f9",import.meta.url)],["image@4.png",new URL("./files/dcdaa39e4be97c69d27e82a6df66d263e0f4e32412268cbc40f2b1d08c1225b50a88a30416bda1e2a652d484d13b9cf7588625258dec0f4b1890fde5a38f2bf0",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`# [Observablehq.com](https://observablehq.com) Notebook Monitoring with [sentry.io](sentry.io)

Sick of broken notebooks? Don't be that guy!

<figure>
<img src=${await FileAttachment("image@4.png").url()}></img>
<figcaption>Have you tried refreshing the page?</figcaption>
</figure>


With some minor configuration you can have [sentry.io](sentry.io) monitor notebooks for unexpected errors, so you get informed fast when something breaks, and get to the bottom of those tricky to repro issues.

Best thing? For low traffic single developer use cases.... its FREE`
)});
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
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
)});
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`### Configuring Sentry

By default Sentry collects IP addresses which is sensitive personal data by GDPR definitions. So I recommend turning this off and turning on various other data scrubbing tools in the settings.

![image@3.png](${await FileAttachment("image@3.png").url()})`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Sentry snippet

The following code rewrites the URL, so usage is reported against the top level Observable URL and not the nonsensical content domain of the userspace iframe. Change your Sentry supplied DSN and Observablehq NAMESPACE below.

~~~js
sentry = {
  if (!html\`<a href="?">\`.href.includes(<YOUR NAMESPACE E.G. @endpointservices>)) return;
  Sentry.init({
    dsn: "<YOUR DSN>",
    beforeSend: (event) => {
      event.request.url = html\`<a href="?">\`.href.split("?")[0];
      return event;
    },
    integrations: [new Tracing.Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });
}
~~~

And the dependencies are

~~~js
Sentry = import("https://cdn.skypack.dev/@sentry/browser@6.13.3?min")
~~~

and 

~~~js
Tracing = import("https://cdn.skypack.dev/@sentry/tracing@6.13.3?min")
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Limitations

Errors caught by the Observablehq runtime are not reported.
Errors throw before the sentry cell completes might not be reported

To solve address the limitations you can actively monitor the notebooks through a [health check endpoint](https://observablehq.com/@endpointservices/healthcheck).


`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Works with [WEBCode.run](https://webcode.run)

Because the Observable native, functions-as-a-service runtime [webcode.run](https://webcode.run) is run inside a browser, you get reports of server side errors too!
`
)});
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
