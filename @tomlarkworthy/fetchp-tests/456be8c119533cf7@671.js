import define1 from "./ef672b935bd480fc@623.js";
import define2 from "./c7a3b20cec5d4dd9@732.js";
import define3 from "./dff1e917c89f5e76@1965.js";

function _1(md){return(
md`# _fetchp_ tests
`
)}

function _suite(createSuite){return(
createSuite({
  name: "tests"
})
)}

function _3(md){return(
md`#### Endpoint to figure out how proxy has mutated requests`
)}

function _reflect(deploy){return(
deploy("reflect request", (req, res) => res.json(req), {
  modifiers: ["terminal"],
  reusable: true
})
)}

function _5(md){return(
md`#### Vanilla proxying (with no CORS)`
)}

function _7(suite,fetchp,expect){return(
suite.test("GET google.com", async () => {
  const response = await fetchp("https://google.com");
  if (response.status !== 200) console.error(await response.text());
  expect(response.status).toBe(200);
  expect(await response.text()).toMatch("advanced_search");
})
)}

function _11(md){return(
md`#### Create custom proxy for parameter secret injection`
)}

function _modifiers(){return(
['external']
)}

function _secrets(){return(
{ secret: 'tomlarkworthy_example_secret' }
)}

function _trusted_domain(){return(
[
  'webcode.run',
  'endpointservice.web.app',
  'storage.googleapis.com',
  'localhost:8080'
]
)}

function _16(suite,fetchpWithSecrets,reflect,expect){return(
suite.test("Inject a secret into URL params", async () => {
  // Our proxy, that has been setup to inject a secret
  const response = await fetchpWithSecrets(reflect.href);
  if (response.status !== 200) console.error(await response.text());
  expect(response.status).toBe(200);
  expect((await response.json()).query.secret).toBe(
    "correct horse battery staple"
  );
})
)}

function _17(suite,fetchpWithSecrets,reflect,expect){return(
suite.test(
  "Inject a secret into URL params with existing paramater",
  async () => {
    // Our proxy, that has been setup to inject a secret
    const response = await fetchpWithSecrets(reflect.href + "?foo");
    if (response.status !== 200) console.error(await response.text());
    expect(response.status).toBe(200);
    expect((await response.json()).query.secret).toBe(
      "correct horse battery staple"
    );
  }
)
)}

function _18(md){return(
md`#### Create custom proxy with basic auth injection`
)}

function _basicAuth(){return(
{
  protocol: "RFC 7617",
  username: "username",
  passwordSecret: "tomlarkworthy_example_secret"
}
)}

function _21(suite,fetchpWithBasicAuth,reflect,expect){return(
suite.test("Injects basic auth header into request", async () => {
  // Our proxy, that has been setup to inject a secret
  const response = await fetchpWithBasicAuth(reflect.href);
  if (response.status !== 200) console.error(await response.text());
  expect(response.status).toBe(200);
  expect((await response.json()).headers['authorization']).toBe(
    "Basic dXNlcm5hbWU6Y29ycmVjdCBob3JzZSBiYXR0ZXJ5IHN0YXBsZQ=="
  );
})
)}

function _22(suite,fetchpWithBasicAuth,reflect,expect){return(
suite.test(
  "Injects basic auth header into request with additional headers",
  async () => {
    // Our proxy, that has been setup to inject a secret
    const response = await fetchpWithBasicAuth(reflect.href, {
      headers: { foo: 'bar' }
    });
    if (response.status !== 200) console.error(await response.text());
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.headers['authorization']).toBe(
      "Basic dXNlcm5hbWU6Y29ycmVjdCBob3JzZSBiYXR0ZXJ5IHN0YXBsZQ=="
    );
    expect(json.headers['foo']).toBe('bar');
  }
)
)}

function _23(md){return(
md`#### Create custom proxy with no allowed domains`
)}

function _no_domain(){return(
[]
)}

function _26(suite,fetchpWithNoAllowDomain,expect){return(
suite.test("Proxy rejects unauthorized domains with 403", async () => {
  const response = await fetchpWithNoAllowDomain("https://www.example.com", {
    modifiers: ["external"]
  });
  expect(response.status).toBe(403);
})
)}

function _27(md){return(
md`#### Short curcuits`
)}

function _serverlessFetchp(deploy,fetchp){return(
deploy("serverlessFetchp", async (req, res) => {
  const response = await fetchp(
    'https://storage.googleapis.com/o_tomlarkworthy_toms/public/empty.txt'
  );
  res.json(await Object.fromEntries(response.headers.entries()));
})
)}

function _serverlessFetchpWithAllowDomain(deploy,fetchpWithAllowDomain){return(
deploy(
  "serverlessFetchpWithAllowDomain",
  async (req, res) => {
    const response = await fetchpWithAllowDomain(
      'https://storage.googleapis.com/o_tomlarkworthy_toms/public/empty.txt'
    );
    res.json(await Object.fromEntries(response.headers.entries()));
  }
)
)}

function _serverlessFetchpWithBasicAuth(deploy,fetchpWithBasicAuth){return(
deploy(
  "serverlessFetchpWithBasicAuth",
  async (req, res) => {
    const response = await fetchpWithBasicAuth(
      'https://storage.googleapis.com/o_tomlarkworthy_toms/public/empty.txt'
    );
    res.json(await Object.fromEntries(response.headers.entries()));
  }
)
)}

function _31(suite,expect,serverlessFetchp){return(
suite.test("fetchp short cucuits inside serverless cells", async () => {
  // If direct the headers will be from a GCS server
  expect((await (await fetch(serverlessFetchp.href)).json()).server).toBe(
    "UploadServer"
  );
})
)}

function _32(suite,expect,serverlessFetchpWithAllowDomain){return(
suite.test("fetchp with ALLOW_DOMAIN short cucuits inside serverless cells", async () => {
  // If direct the headers will be from a GCS server
  expect((await (await fetch(serverlessFetchpWithAllowDomain.href)).json()).server).toBe(
    "UploadServer"
  );
})
)}

function _33(suite,expect,serverlessFetchpWithBasicAuth){return(
suite.test(
  "fetchp with BASIC_AUTH DOESN'T short cucuits inside serverless cells",
  async () => {
    // If not direct the headers will be from GFE (Cloud Run)
    expect(
      (await (await fetch(serverlessFetchpWithBasicAuth.href)).json()).server
    ).toBe("Google Frontend");
  }
)
)}

async function _url(data){return(
URL.createObjectURL(new Blob([await data.arrayBuffer()]))
)}

function _35(html,url){return(
html`<a href=${url}>download`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("reflect")).define("reflect", ["deploy"], _reflect);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("fetchp", child1);
  main.variable(observer()).define(["suite","fetchp","expect"], _7);
  const child2 = runtime.module(define1).derive([{name: "trusted_domain", alias: "ALLOW_DOMAINS"}], main);
  main.import("fetchp", "fetchpWithAllowDomain", child2);
  main.variable(observer()).define(["md"], _11);
  const child3 = runtime.module(define1).derive([{name: "trusted_domain", alias: "ALLOW_DOMAINS"},{name: "secrets", alias: "SECRET_PARAMS"},{name: "modifiers", alias: "MODIFIERS"}], main);
  main.import("fetchp", "fetchpWithSecrets", child3);
  main.variable(observer("modifiers")).define("modifiers", _modifiers);
  main.variable(observer("secrets")).define("secrets", _secrets);
  main.variable(observer("trusted_domain")).define("trusted_domain", _trusted_domain);
  main.variable(observer()).define(["suite","fetchpWithSecrets","reflect","expect"], _16);
  main.variable(observer()).define(["suite","fetchpWithSecrets","reflect","expect"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("basicAuth")).define("basicAuth", _basicAuth);
  const child4 = runtime.module(define1).derive([{name: "trusted_domain", alias: "ALLOW_DOMAINS"},{name: "basicAuth", alias: "BASIC_AUTH"},{name: "modifiers", alias: "MODIFIERS"}], main);
  main.import("fetchp", "fetchpWithBasicAuth", child4);
  main.variable(observer()).define(["suite","fetchpWithBasicAuth","reflect","expect"], _21);
  main.variable(observer()).define(["suite","fetchpWithBasicAuth","reflect","expect"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("no_domain")).define("no_domain", _no_domain);
  const child5 = runtime.module(define1).derive([{name: "no_domain", alias: "ALLOW_DOMAINS"},{name: "secrets", alias: "SECRET_PARAMS"}], main);
  main.import("fetchp", "fetchpWithNoAllowDomain", child5);
  main.variable(observer()).define(["suite","fetchpWithNoAllowDomain","expect"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("serverlessFetchp")).define("serverlessFetchp", ["deploy","fetchp"], _serverlessFetchp);
  main.variable(observer("serverlessFetchpWithAllowDomain")).define("serverlessFetchpWithAllowDomain", ["deploy","fetchpWithAllowDomain"], _serverlessFetchpWithAllowDomain);
  main.variable(observer("serverlessFetchpWithBasicAuth")).define("serverlessFetchpWithBasicAuth", ["deploy","fetchpWithBasicAuth"], _serverlessFetchpWithBasicAuth);
  main.variable(observer()).define(["suite","expect","serverlessFetchp"], _31);
  main.variable(observer()).define(["suite","expect","serverlessFetchpWithAllowDomain"], _32);
  main.variable(observer()).define(["suite","expect","serverlessFetchpWithBasicAuth"], _33);
  main.variable(observer("url")).define("url", ["data"], _url);
  main.variable(observer()).define(["html","url"], _35);
  const child6 = runtime.module(define2);
  main.import("createSuite", child6);
  main.import("expect", child6);
  const child7 = runtime.module(define3);
  main.import("deploy", child7);
  return main;
}
