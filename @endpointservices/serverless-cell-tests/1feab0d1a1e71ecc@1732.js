import define1 from "./6eda90668ae03044@830.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./c7a3b20cec5d4dd9@669.js";
import define4 from "./293899bef371e135@271.js";

async function _1(md,FileAttachment){return(
md`
# Serverless Cell Tests

<img width=640 src=${await FileAttachment(
  "PreviewServerlessCells@1.png"
).url()}></img>

Test suite for [Serverless Cells](https://observablehq.com/@endpointservices/serverless-cells). Documents examples of working behaviour.
`
)}

function _2(md){return(
md`## Automated Tests`
)}

function _region(Inputs){return(
Inputs.radio(["europe-west4", "europe-west1", "us-central1"], {
  value: "europe-west1"
})
)}

function _4(html){return(
html`${["europe-west4", "europe-west1", "us-central1"].map(
  (region) =>
    html`<a target="_blank" href="https://webcode.run/regions/${region}/.stats">Diagnostics from ${region}</a><br>`
)}`
)}

function _ci(createSuite){return(
createSuite({
  name: "Serverless cell tests",
  timeout_ms: 20000
})
)}

function _7(md){return(
md `
## Example - referencing cell values

Here is some data we wish to serve an a random cell.
`
)}

function _localValue(){return(
"hello dsadasda is from another cell yo yo"
)}

function _9(md){return(
md`
### Creating a handler

Our handler serves our value as JSON using _res.json(localValue)_. Handlers can reference other cells just like normal.

`
)}

function _10(md){return(
md`### Deploy the handler
We create a named cell "remote_cell_link" and also hint the deploymentFunction the name of the cell. The function responds with a link you can click on, call with curl _etc_!

NOTE: THE BACKEND READS THE CURRENT **PUBLISHED** (or linked shared) NOTEBOOK. So if you make changes remember to republish the notebook otherwise the notebook will be hitting a previous version.

`
)}

function _11(region){return(
region
)}

function _remote_cell_link(deploy,localValue,region)
{
  return deploy(
    "remote_cell",
    (req, res) => {
      res.json(localValue);
    },
    {
      region: region,
      host: "webcode.run"
    }
  );
}


function _13(md){return(
md` ### Test it
To prove it works we issue a fetch command. Look! That url is serving the value we set at the beginning!
`
)}

async function _example1_response(remote_cell_link){return(
(await fetch(remote_cell_link.href)).json()
)}

function _15(ci,expect,example1_response,localValue){return(
ci.test("Example 1 reponse matches localValue", () => {
  expect(example1_response).toBe(localValue);
})
)}

function _16(md){return(
md`## Example - the *default* deployment for small URLs

Sometimes a notebook has a single serverless cell with multiple API routes. We can minimize the size of the URL by calling the deployed function _"default"_
`
)}

function _default_url_example(deploy,region,html)
{
  const link = deploy(
    "default",
    async (req, res) => {
      res.send("You can make small URLs with the default handler");
    },
    {
      reusable: true,
      region: region
    }
  );
  return html`<a href=${link.href} target="_blank">${link.href}</a>`;
}


function _18(md){return(
md`## Example - error propagation

If you throw an error the URL will serve status 500 and the message (of course if you don't like this you can catch your own errors and do your own thing)
`
)}

function _buggy_remote_cell_link(deploy,region){return(
deploy(
  "buggy_remote_cell",
  async (req, res) => {
    throw Error("Ooops");
  },
  {
    reusable: true,
    region: region
  }
)
)}

function _20(md){return(
md`Calling this buggy URL:`
)}

async function _example2_response(buggy_remote_cell_link)
{
  const result = await fetch(buggy_remote_cell_link.href);
  return {
    status: result.status,
    text: await result.text()
  };
}


function _22(ci,expect,example2_response){return(
ci.test("Example 2 reponse status is 500", () => {
  expect(example2_response.status).toBe(500);
})
)}

function _23(ci,expect,example2_response){return(
ci.test("Example 2 reponse includes error message", () => {
  expect(example2_response.text).toEqual(expect.stringContaining("Ooops"))
})
)}

async function _24(md,FileAttachment){return(
md`## Example - serving a webpage

Serverside rendering with the wonderful hypertext literal anyone?

![Serverside rendering](${await FileAttachment("ServersideCells.png").url()})

With control over the meta payload we can make a much better social sharing preview, and control all the redirection behaviour.
`
)}

function _webpage(deploy,FileAttachment,html,region){return(
deploy(
  "social_link",
  async (req, res) => {
    res.header("Content-Type", "text/html");
    const title = "Serverless cells";
    const description = "Observable cells as serverless hosts.";
    const image = await FileAttachment("PreviewServerlessCells.png").url();
    const link = "https://observablehq.com/@tomlarkworthy/serverside-cells";
    // Hypertext literal does not support html, head and body tags.
    // So we render the head and body content using the html template but
    // interpolate into a vanilla HTML string.
    res.send(
      `<html>
    <head>
    ${
      html`
      <title>
        ${title}
      </title>
      <meta property="og:title" content=${title}>
      <meta property="og:description" content=${description}>
      <meta property="og:image" content=${image}>
      <meta property="og:url" content=${link}>
      <meta http-equiv="refresh" content="3;URL='${link}'">
   
      <meta name="twitter:title" content=${title}>
      <meta name="twitter:description" content=${description}>
      <meta name="twitter:image" content=${image}>
      <meta name="twitter:card" content="summary_large_image">
      `.innerHTML
    }
    </head>
    <body>
    ${
      html`
        <center>
        <a href=${link}>
        <h1>${title}</h1>
        <img width="640px" src=${image}></img>
        <p>${description}</p>
        </a>
        </center>
      `.innerHTML
    }
    </body>
    `
    );
  },
  {
    reusable: true,
    region: region
  }
)
)}

function _example_injecting_secrets(md){return(
md`## Example - Injecting Secrets 

Integrating with 3rd party APIs often require storing an OAuth client secret. We are able to inject secrets into the handler. Note, secrets are owned by the author and cannot be accessed by other notebooks. So if you fork this page, this example will fail for you. Note the prefix matches the usercontent subdomain.

You can set secrets with [secret-manager](https://observablehq.com/@tomlarkworthy/secret-manager)
`
)}

function _example_secrets(deploy,region){return(
deploy(
  "example_secrets",
  (req, res, context) => {
    res.send(context.secrets["endpointservices_example_secret"]);
  },
  {
    secrets: ["endpointservices_example_secret"],
    region: region
  }
)
)}

function _29(ci,example_secrets,expect){return(
ci.test(
  "Example 4 example secret is 'correct horse battery staple'",
  async () => {
    const response = await fetch(example_secrets.href);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("correct horse battery staple");
  }
)
)}

function _30(md){return(
md`## Example - Testing execution context

You can tell if you are running serverless or not by checking the context, you can also find out the notebook when availible.
`
)}

function _example_getContext(deploy,getContext,region){return(
deploy(
  "example_getContext",
  (req, res) => {
    res.send(getContext()); // Use of global getContext() function
  },
  {
    region: region
  }
)
)}

function _32(ci,expect,example_getContext){return(
ci.test("Example 5 getContext()", async () => {
  expect(await (await fetch(example_getContext.href)).json()).toEqual({
    namespace: "endpointservices",
    secrets: {},
    serverless: true,
    notebook: "serverless-cell-tests"
  });
})
)}

function _33(md){return(
md`## Example of CDN`
)}

function _endpoint_with_CDN(deploy,region){return(
deploy(
  "endpoint_with_CDN",
  (req, res, context) => {
    res.header("Cache-Control", "public, max-age=0, s-maxage=99999"); // Cache in shared cache (CDN)
    res.send(new Date());
  },
  {
    region: region
  }
)
)}

function _35(ci,endpoint_with_CDN,expect){return(
ci.test("Example 6 Enable cache for insane performance", async () => {
  const response = await fetch(endpoint_with_CDN.href);
  return expect(response.status).toBe(200);
})
)}

function _test_end(ci,deploy,region,expect){return(
ci.test("Reference: res.status('204').end() responds", async () => {
  const link = await deploy(
    "test_end",
    (req, res) => {
      res.status(204).end();
    },
    {
      cell: "test_end",
      region: region
    }
  );
  return expect(await (await fetch(link.href)).status).toBe(204);
})
)}

function _37(md){return(
md`## Regions 

You can elect to run the code in us-central1 (Iowa), europe-west4 (Netherlands), or asia-east1 (Taiwan). The default is "europe-west4". Fastest seems to be "us-central1" (see the [latency monitor](https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor))
`
)}

function _europe_west1(deploy){return(
deploy(
  "europe-west1",
  async (req, res) => {
    res.send("Howdy!");
  },
  {
    region: "europe-west1"
  }
)
)}

function _39(ci,expect,europe_west1){return(
ci.test("Example 6.1: Regions", async () => {
  await expect((await fetch(europe_west1.href)).status).toBe(200);
})
)}

function _40(md){return(
md`## Signed Cookie Support`
)}

function _41(ci,Response,expect){return(
ci.test("Example 7: Cookie signing same as nodejs Express (disabled)", () => {
  return;
  /* Test program to be run with node.js
  const app = require('express')();
  app.use(require('cookie-parser')("secret"))
  app.get('/', (req, res) => {
      res.cookie("value", "value", {signed: true, maxAge:1000, httpOnly: true})
      res.end();
  })
  app.listen(8080, () => {})
  */
  // Curling the nodejs server (curl localhost:8080 -v) contains line:-
  // Set-Cookie: value=s%3Avalue.UOA%2BvmW%2BmLuL8RuiyJLVTAeayisNOwFidpxtdXolQ08; Max-Age=1; Path=/; Expires=Sun, 31 Jan 2021 09:04:51 GMT; HttpOnly
  const headerValue = new Response({
    secret: "secret"
  }).cookie("value", "value", { signed: true, maxAge: 1000, httpOnly: true })
    ._headers["Set-Cookie"];
  // Test the encryption is the same
  expect(headerValue).toMatch(
    "value=s%3Avalue.UOA%2BvmW%2BmLuL8RuiyJLVTAeayisNOwFidpxtdXolQ08; Max-Age=1; Path=/; Expires="
  );
  // Test the feature switches work
  expect(headerValue).toMatch("; HttpOnly");
})
)}

function _binary(md){return(
md`## Serving Binary data (e.g. images)

the _res.send(<arg>)_ supports using an arrayBuffer as the arg.
`
)}

function _pngLink(deploy,FileAttachment,region){return(
deploy(
  "png",
  async (req, res) => {
    res.header("content-type", "image/png");
    const blob = await FileAttachment("logo.png").blob();
    const arrayBuffer = await blob.arrayBuffer();
    res.send(arrayBuffer);
  },
  {
    region: region
  }
)
)}

function _pngElement(html,pngLink){return(
new Promise((resolve) => {
  let img = html`<img src=${pngLink} onerror=${() => {
    img.err = true;
    resolve(img);
  }} onload=${() => resolve(img)} />`;
})
)}

function _45(ci,expect,pngElement,region){return(
ci.test(
  "Example 8: Images can be served as binary data",
  async () => {
    expect(pngElement.err).toBeUndefined();
  },
  {
    region: region
  }
)
)}

function _46(md){return(
md`### Cell Modifiers and chaining calls

Only "terminal" cells can be called by other cells
`
)}

function _external_to_terminal(deploy,region){return(
deploy("external", async (req, res) => {
  try {
    res.send(await (await fetch("https://endpointservice.web.app/notebooks/@endpointservices/serverless-cell-user-agents/deploys/terminal-ua/mods/T")).text());
  } catch (err) {
    res.send(err.message)
  }
}, {
  region: region,
  modifiers: ["external"]
})
)}

function _48(ci,expect,external_to_terminal){return(
ci.test(
  "Example 9: An external can call a cell with modifier terminal",
  async () => {
    expect(await (await fetch(external_to_terminal.href)).text()).toBe(
      "observablehq.com/@endpointservices/serverless-cells"
    );
  }
)
)}

function _orchestrator_to_external(deploy,region){return(
deploy(
  "orchestrator",
  async (req, res) => {
    try {
      res.send(
        await (
          await fetch(
            "https://endpointservice.web.app/notebooks/@endpointservices/serverless-cell-user-agents/deploys/external-ua/mods/T"
          )
        ).text()
      );
    } catch (err) {
      res.send(err.message);
    }
  },
  {
    region: region,
    modifiers: ["orchestrator"]
  }
)
)}

function _50(ci,expect,orchestrator_to_external){return(
ci.test(
  "Example 10: An orchestrator can call a cell with modifier external",
  async () => {
    expect(await (await fetch(orchestrator_to_external.href)).text()).toBe(
      "observablehq.com/@endpointservices/serverless-cells O"
    );
  }
)
)}

function _51(ci,expect,deploy){return(
ci.test("Conformance: name is URI encoded: foo/bar", async () => {
  throw new Error("Somehow this causes loops!");
  expect(
    await (
      await fetch(deploy("foo/bar", (req, res) => res.send("OK: foo/bar")).href)
    ).text()
  ).toBe("OK: foo/bar");
})
)}

function _52(ci,expect,deploy,region){return(
ci.test("Conformance: name is URI encoded: foo", async () => {
  expect(
    await (
      await fetch(
        deploy("foo", (req, res) => res.send("OK: foo"), { region }).href
      )
    ).text()
  ).toBe("OK: foo");
})
)}

function _metadata_token(deploy,region){return(
deploy("metadata_token", async (req, res) => {
  try {
    const response = await fetch("http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token", {
      headers: {
        "Metadata-Flavor": "Google"
      }
    })
    res.status(response.status).send(await response.text())
  } catch (err) {
    res.status(500).send(err.message)
  }
}, {region})
)}

function _54(ci,expect,metadata_token){return(
ci.test("Security: Cannot get to metadata server", async () => {
  expect(await (await fetch(metadata_token.href)).text()).toBe(
    "Failed to fetch"
  );
})
)}

function _55(md){return(
md`#### Streaming`
)}

function _streamingResponse(deploy,region){return(
deploy(
  "streamingResponse",
  async (req, res) => {
    res.write("w");
    res.write("r");
    res.write("i");
    res.write("t");
    res.write("e");
    res.end();
  },
  {
    region: region
  }
)
)}

function _57(ci,expect,streamingResponse){return(
ci.test("Streaming: write works", async () => {
  expect(await (await fetch(streamingResponse.href)).text()).toBe("write");
})
)}

function _58(deploy,pngLink,region){return(
deploy(
  "redirect",
  (req, res) => {
    res.redirect(302, pngLink.href);
  },
  {
    region
  }
)
)}

function _59(ci,expect,orchestrator_to_external){return(
ci.test("Example 11: Redirects", async () => {
  expect(await (await fetch(orchestrator_to_external.href)).text()).toBe(
    "observablehq.com/@endpointservices/serverless-cells O"
  );
})
)}

function _60(ci,deploy,region,expect){return(
ci.test("Context fields are populated", async () => {
  const payload = await (
    await fetch(
      deploy("contextFields", (req, res) => res.json(req), {
        reusable: true,
        region
      }).href
    )
  ).json();

  expect(payload).toHaveProperty("headers");
  expect(payload).toHaveProperty("ip");
  expect(payload).toHaveProperty("url");
  expect(payload).toHaveProperty("method");
  expect(payload).toHaveProperty("query");
  expect(payload).toHaveProperty("baseUrl");
})
)}

function _63(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["logo.png", {url: new URL("./files/f66616596d81ff0717d6e08454566d311c636aae5f2383f8599e3767ab5c91f0ee2ceb3e1244872b703708f02177ca74c707e6c422db21ec208e03075855df12.png", import.meta.url), mimeType: "image/png", toString}],
    ["PreviewServerlessCells.png", {url: new URL("./files/0b797b66fdbead75a0a4046e1d201066e13151c42dff566cc70e8045d307a601567bb41aa7a2e35de2948aa02e7d1edea836d049cbfa220e5491f3486ac962ef.png", import.meta.url), mimeType: "image/png", toString}],
    ["ServersideCells.png", {url: new URL("./files/dfb3314f7289de45d0b83cb4455c0a7cdc3aacbf3b79f7b7d608b5b2959ee436931198f212c6a74386e019b616383dec98fe801601c551493686ce482789e433.png", import.meta.url), mimeType: "image/png", toString}],
    ["PreviewServerlessCells@1.png", {url: new URL("./files/60d4ca69fed9f57d135d2784c0afeba63568ab00be1304592966277256857787c9b9dd4dc7049b81be32369d69c4a2a60cc258fb252fc171b72ae298d04a63f7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof region")).define("viewof region", ["Inputs"], _region);
  main.variable(observer("region")).define("region", ["Generators", "viewof region"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], _4);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  main.import("Response", child1);
  main.variable(observer("viewof ci")).define("viewof ci", ["createSuite"], _ci);
  main.variable(observer("ci")).define("ci", ["Generators", "viewof ci"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("localValue")).define("localValue", _localValue);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["region"], _11);
  main.variable(observer("remote_cell_link")).define("remote_cell_link", ["deploy","localValue","region"], _remote_cell_link);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("example1_response")).define("example1_response", ["remote_cell_link"], _example1_response);
  main.variable(observer()).define(["ci","expect","example1_response","localValue"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("default_url_example")).define("default_url_example", ["deploy","region","html"], _default_url_example);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("buggy_remote_cell_link")).define("buggy_remote_cell_link", ["deploy","region"], _buggy_remote_cell_link);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("example2_response")).define("example2_response", ["buggy_remote_cell_link"], _example2_response);
  main.variable(observer()).define(["ci","expect","example2_response"], _22);
  main.variable(observer()).define(["ci","expect","example2_response"], _23);
  main.variable(observer()).define(["md","FileAttachment"], _24);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  main.variable(observer("webpage")).define("webpage", ["deploy","FileAttachment","html","region"], _webpage);
  main.variable(observer("example_injecting_secrets")).define("example_injecting_secrets", ["md"], _example_injecting_secrets);
  main.variable(observer("example_secrets")).define("example_secrets", ["deploy","region"], _example_secrets);
  main.variable(observer()).define(["ci","example_secrets","expect"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("example_getContext")).define("example_getContext", ["deploy","getContext","region"], _example_getContext);
  main.variable(observer()).define(["ci","expect","example_getContext"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("endpoint_with_CDN")).define("endpoint_with_CDN", ["deploy","region"], _endpoint_with_CDN);
  main.variable(observer()).define(["ci","endpoint_with_CDN","expect"], _35);
  main.variable(observer("test_end")).define("test_end", ["ci","deploy","region","expect"], _test_end);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("europe_west1")).define("europe_west1", ["deploy"], _europe_west1);
  main.variable(observer()).define(["ci","expect","europe_west1"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["ci","Response","expect"], _41);
  main.variable(observer("binary")).define("binary", ["md"], _binary);
  main.variable(observer("pngLink")).define("pngLink", ["deploy","FileAttachment","region"], _pngLink);
  main.variable(observer("pngElement")).define("pngElement", ["html","pngLink"], _pngElement);
  main.variable(observer()).define(["ci","expect","pngElement","region"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("external_to_terminal")).define("external_to_terminal", ["deploy","region"], _external_to_terminal);
  main.variable(observer()).define(["ci","expect","external_to_terminal"], _48);
  main.variable(observer("orchestrator_to_external")).define("orchestrator_to_external", ["deploy","region"], _orchestrator_to_external);
  main.variable(observer()).define(["ci","expect","orchestrator_to_external"], _50);
  main.variable(observer()).define(["ci","expect","deploy"], _51);
  main.variable(observer()).define(["ci","expect","deploy","region"], _52);
  main.variable(observer("metadata_token")).define("metadata_token", ["deploy","region"], _metadata_token);
  main.variable(observer()).define(["ci","expect","metadata_token"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("streamingResponse")).define("streamingResponse", ["deploy","region"], _streamingResponse);
  main.variable(observer()).define(["ci","expect","streamingResponse"], _57);
  main.variable(observer()).define(["deploy","pngLink","region"], _58);
  main.variable(observer()).define(["ci","expect","orchestrator_to_external"], _59);
  main.variable(observer()).define(["ci","deploy","region","expect"], _60);
  const child3 = runtime.module(define3);
  main.import("createSuite", child3);
  main.import("expect", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _63);
  return main;
}
