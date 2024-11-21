import define1 from "./6eda90668ae03044@836.js";

function _1(md){return(
md`# Learning *WEBcode.run*`
)}

function _myEndpoint(endpoint){return(
endpoint("info", async (request, response) => {
  // debugger;
  response.send(
    `<pre>\${JSON.stringify({
          request,
          response,
          context: await getContext()
        }, null, 2)}</pre>`
  );
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.import("getContext", child1);
  main.variable(observer("myEndpoint")).define("myEndpoint", ["endpoint"], _myEndpoint);
  return main;
}
