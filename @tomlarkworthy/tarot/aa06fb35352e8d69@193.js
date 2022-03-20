import define1 from "./549f62919a7018eb@2922.js";

function _app(transitions,footer,$0){return(
transitions, footer, $0
)}

function _2(app,md){return(
md`## About

The result of asking, *"can you build end-to-end applications on Observable?"*. 

Here is a small but representative application coded entirely within Observable. It uses a database and several sensitive APIs. It adheres to industry development requirements like OpenAI's [default safety requirements](https://beta.openai.com/docs/usage-guidelines/default-safety-requirements-for-all-applications), for example, anonymous authentication, rate limiting and AI content filtering. Access is proxied through Netlify from a dedicated domain [thetarot.online](https://thetarot.online), which took 8 lines of external [code in Github](https://github.com/endpointservices/thetarot.online). It is a single cell, which can be embedded.

The curious folk who wish to peak beneath the curtain can follow an import link below.

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
