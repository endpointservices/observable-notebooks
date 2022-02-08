// https://observablehq.com/@endpointservices/how-to-keep-an-api-key-secret-in-a-public-notebook@109
import define1 from "./dff1e917c89f5e76@1709.js";
import define2 from "./293899bef371e135@216.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image@1.png",new URL("./files/d5654fa8fc805df282a4ae6cbb5027f47e1bc44de10de639869ba77eb130ca96c7f842b8776e23d586baa3dc26c3f5e04e5ad5eaea8f4cd14f013bfab0920141",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# How To Keep an API key secret in a Public Notebook

<mark>I now recommend using the <a href="https://observablehq.com/@endpointservices/public-api-keys">webcode</a> dashboard for setting secrets</mark>

You can keep a secret in a public notebook by using a combination of [Secret Manager](https://observablehq.com/@tomlarkworthy/secret-manager) and [Serverless Cells](https://observablehq.com/@tomlarkworthy/serverless-cells)

motivation:
https://talk.observablehq.com/t/is-it-possible-to-encapsulate-secret-based-code-for-public-notebook-use/4649
`
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`
## Save your secret to [Secret Manager](https://observablehq.com/@tomlarkworthy/secret-manager)


![](${await FileAttachment("image@1.png").url()})
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Inject secret into serverless cell handler that calls the protected API

In the deploy options, tell the runtime to inject your secret. In the handler, you can retreive the secret in the runtime context.

Then call the API using the secret, and pipe the result to the response of the serverless-cell.

`
)});
  main.variable(observer("proxy")).define("proxy", ["deploy"], function(deploy){return(
deploy(
  "proxy",
  async (request, response, context) => {
    const format_url = (x) => x;
    const base_url =
      "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";

    const key = context.secrets["endpointservices_example_secret"];
    const date1 = format_url(request.query.start);
    const date2 = format_url(request.query.end);

    const xml_url = `${base_url}?serviceKey=${encodeURIComponent(
      key
    )}&startCreateDt=${date1}&endCreateDt=${date2}`;

    // Sometimes its enough to debug intermediate steps by returning information via the response.
    // return response.send(xml_url)

    const apiResponse = await fetch(xml_url);

    response.status(apiResponse.status).send(await apiResponse.text());
  },
  {
    secrets: ["endpointservices_example_secret"]
  }
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## PUBLISH YOUR NOTEBOOK

The Serverless cell runtime needs to be able to access your notebook to read the handler code. So you must link share or publish your notebook. 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Try the link manually

The link returned by the _deploy_ command is one you can click on. (though it won't have URL parameters)
`
)});
  main.variable(observer()).define(["html","proxy"], function(html,proxy){return(
html`${proxy}`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Call the link programatically

(of course I don't have access to a real API_KEY so it breaks with 500)
`
)});
  main.variable(observer("proxyResponse")).define("proxyResponse", ["proxy"], function(proxy){return(
fetch(`${proxy.href}?start=20200101&end=20200201`)
)});
  main.variable(observer()).define(["proxyResponse"], function(proxyResponse){return(
proxyResponse.text()
)});
  main.variable(observer()).define(["proxyResponse"], function(proxyResponse){return(
proxyResponse.status
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
