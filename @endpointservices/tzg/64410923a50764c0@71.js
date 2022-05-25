import define1 from "./dff1e917c89f5e76@1711.js";
import define2 from "./293899bef371e135@247.js";

function _1(md){return(
md`# Get CORS tgz link (v=3)

The "download code' link on observablehq does not have CORS headers so its difficult to link Observable notebooks directly as dependancies to things like CodeSandbox ([forum](https://talk.observablehq.com/t/cors-header-for-download-code-urls/5391)), or create links to [offline notebooks](https://observablehq.com/@tomlarkworthy/offline).

`
)}

function _notebook(Inputs){return(
Inputs.text({
  label: "Which notebook?",
  value: "@tomlarkworthy/animated-kirigami"
})
)}

function _cleanedNotebook(notebook){return(
notebook.replaceAll(/(https:\/\/)?observablehq.com\//g, "").replaceAll(".tgz", "")
)}

function _link(cleanedNotebook,htl)
{
  const href = `https://webcode.run/notebooks/@endpointservices/tzg/${cleanedNotebook}.tgz`
  return htl.html`Here is a CORS enabled link to that zip: <a href="${href}" target="_blank">${href}</a>`;
}


function _backend(deploy){return(
deploy("default", async (req, res) => {
  const api = `https://api.observablehq.com${req.url}?v=3`
  const response = await fetch(api)
  
  if (response.status !== 200) return res.status(response.status).send(await res.text())
  
  const responseHeaders = Object.fromEntries(
        Array.from(response.headers.entries()).map(([k, v]) => [k.toLowerCase(), v]))
  delete responseHeaders['content-encoding']; // Ensure we are not claiming to be gzipped
  delete responseHeaders['content-length'];   // We switch to chunked
  delete responseHeaders['access-control-allow-origin']; // Remove any CORS
  delete responseHeaders['x-frame-options'];
  
  const headers = {
    ...responseHeaders,
    'transfer-encoding': 'chunked'
  };
  Object.keys(headers).map(key => {
    if (headers[key]) res.header(key, headers[key])
  });

  res.status(response.status)
  
  const body = await response.body;
  const reader = body.getReader();

  let { done, value } = await reader.read();
  while (!done) {
    res.write(value); 
    ({ done, value } = await reader.read());
  }
  res.end()
})
)}

function _8(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof notebook")).define("viewof notebook", ["Inputs"], _notebook);
  main.variable(observer("notebook")).define("notebook", ["Generators", "viewof notebook"], (G, _) => G.input(_));
  main.variable(observer("cleanedNotebook")).define("cleanedNotebook", ["notebook"], _cleanedNotebook);
  main.variable(observer("link")).define("link", ["cleanedNotebook","htl"], _link);
  main.variable(observer("backend")).define("backend", ["deploy"], _backend);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _8);
  return main;
}
