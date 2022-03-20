import define1 from "./549f62919a7018eb@2978.js";

function _app(transitions,footer,$0){return(
transitions, footer, $0
)}

function _2(app,md){return(
md`## About

The result of asking, *"can you build end-to-end applications on Observable?"*. 

Here is a small but representative application coded entirely within Observable. It uses a database and protected APIs. It adheres to OpenAI's [default safety requirements](https://beta.openai.com/docs/usage-guidelines/default-safety-requirements-for-all-applications), including: anonymous authentication, rate limiting and AI content filtering. Web requests are proxied through Netlify to add a vanity domain [thetarot.online](https://thetarot.online) ([code in Github](https://github.com/endpointservices/thetarot.online)). Production traffic can be proxied into the developers notebook, allowing live tracing of API executions.

For the curious folk who wish to peak behind the curtain, follow an import link below.

${(app, '')}

`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("app")).define("app", ["transitions","footer","viewof display"], _app);
  main.variable(observer()).define(["app","md"], _2);
  const child1 = runtime.module(define1);
  main.import("viewof display", child1);
  main.import("display", child1);
  main.import("transitions", child1);
  main.import("footer", child1);
  return main;
}
