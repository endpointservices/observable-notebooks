import define1 from "./dff1e917c89f5e76@1709.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Get CORS tgz link (v=3)

The "download code' link on observablehq does not have CORS headers so its difficult to link Observable notebooks directly as dependancies to things like CodeSandbox ([forum](https://talk.observablehq.com/t/cors-header-for-download-code-urls/5391)), or create links to [offline notebooks](https://observablehq.com/@tomlarkworthy/offline).

`
)});
  main.variable(observer("viewof notebook")).define("viewof notebook", ["Inputs"], function(Inputs){return(
Inputs.text({
  label: "Which notebook?",
  value: "@tomlarkworthy/animated-kirigami"
})
)});
  main.variable(observer("notebook")).define("notebook", ["Generators", "viewof notebook"], (G, _) => G.input(_));
  main.variable(observer("cleanedNotebook")).define("cleanedNotebook", ["notebook"], function(notebook){return(
notebook.replaceAll(/(https:\/\/)?observablehq.com\//g, "").replaceAll(".tgz", "")
)});
  main.variable(observer("link")).define("link", ["cleanedNotebook","htl"], function(cleanedNotebook,htl)
{
  const href = `https://webcode.run/notebooks/@endpointservices/tzg/${cleanedNotebook}.tgz`
  return htl.html`Here is a CORS enabled link to that zip: <a href="${href}" target="_blank">${href}</a>`;
}
);
  main.variable(observer("backend")).define("backend", ["deploy"], function(deploy){return(
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
)});
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}