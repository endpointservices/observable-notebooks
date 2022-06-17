// https://observablehq.com/@tomlarkworthy/fetchp@622
import define1 from "./dff1e917c89f5e76@1939.js";

function _1(md){return(
md`# CORS Proxy _fetchp_

A drop in replacement for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that uses a proxy to get around CORS and can optionally mixin [secrets](https://observablehq.com/@endpointservices/secrets) into URL parameters and Basic Auth. Retries with exponential backoff in the case of 429 response code.

When you import _fetchp_, you are actually statically defining a [serverless-cell](https://observablehq.com/@endpointservices/serverless-cells) proxy in the consuming notebook on a unique URL. So you need to publish or link share your notebook before it works. 

~~~js
    import {fetchp} from '@tomlarkworthy/fetchp'
    ...
    const response = await fetchp(url, options)
~~~


You can restrict the allowed domains the proxy can call and inject [secrets](https://observablehq.com/@endpointservices/secrets) so you can narrow the flexibility of the proxy to just your use case for that notebook.

~~~js
    secrets = ({ API_KEY: 'tomlarkworthy_API_KEY' })
    ---
    trusted_domain = ['endpointservice.web.app']
    ---
    import { fetchp } with {
       trusted_domain as ALLOW_DOMAINS,
       secrets as SECRET_PARAMS
    } from '@tomlarkworthy/fetchp'
~~~

If *fetchp* is called within a serverless environment (where CORS is allowed), and does not need access to secrets, then it will skip using a proxy and go direct.

You can ask fetchp to add headers to the response, e.g. to set cache control, by setting the option _responseHeaders_

~~~js
    fetchp(<URL>, {
      responseHeaders: {
        "Cache-control": "public, max-age=3600"
      }
    })
~~~

To see some executable examples check out the [tests](https://observablehq.com/@tomlarkworthy/fetchp-tests)

### Open Issues
 - does not work with HTTP content

### Change log
- 2020-10-01 fetchp updated to take advantage of page reuse for much faster warm latencies
- 2020-05-20 Utilizes streaming (transfer-encoding: chunked), removing 32MB response limit and time to first byte.
- 2020-05-11 FIX: fetchp with ALLOW_DOMAIN short curcuits properly now
- 2020-05-01 Added responseHeaders option to set the headers on the response from the proxy
- 2020-04-28 FIX: use arrayBuffer to decode remote response body, which works for binary responses.
- 2020-04-08 short curcuit proxying if called from inside serverless environement.
- 2020-03-24 Added ability to inject secrets into URL params/headers (secretParams: {param: secret})
- 2020-03-23 Remove hardcoded proxy and converted to "terminal" serverless cell
- 2020-02-12 Fixed UInt8array as body encoding problems
- 2021-01-24 Added exponential backoff on 429s
`
)}

function _SECRET_PARAMS(){return(
{}
)}

function _ALLOW_DOMAINS(){return(
null
)}

function _BASIC_AUTH(){return(
null
)}

function _MODIFIERS(){return(
['terminal']
)}

function _id(hash,ALLOW_DOMAINS,SECRET_PARAMS,BASIC_AUTH,MODIFIERS){return(
hash([ALLOW_DOMAINS, SECRET_PARAMS, BASIC_AUTH, MODIFIERS]).substring(30)
)}

function _fetchp(ALLOW_DOMAINS,Response,getContext,SECRET_PARAMS,BASIC_AUTH,proxy){return(
async (url, options) => {
  options = options || {};
  let retries = options.retries || 10;
  let response = null;
  let delay_ms = 100;

  if (url.startsWith("http://"))
    throw new Error("fetchp only supports secure https:// addresses");
  if (ALLOW_DOMAINS !== null && !ALLOW_DOMAINS.includes(new URL(url).host))
    return new Response(`${url} is not in ALLOW_DOMAINS set`, {
      status: 403
    });

  if (
    getContext().serverless &&
    Object.keys(SECRET_PARAMS).length === 0 &&
    BASIC_AUTH == null
  ) {
    // Skip sending to proxy but still do retries
    while (retries-- >= 0) {
      response = await fetch(url, options);
      if (response.status !== 429) break;
      // Exponential backoff
      await new Promise((res) => setTimeout(res, delay_ms));
      delay_ms *= 1.5;
    }
    return response;
  }

  // Fetch can have UInt8array as body, which is lost by default JSON stringify
  // https://gist.github.com/jonathanlurie/04fa6343e64f750d03072ac92584b5df
  const body = JSON.stringify({ url, options }, function (key, value) {
    // the replacer function is looking for some typed arrays.
    // If found, it replaces it by a trio
    if (
      value instanceof Int8Array ||
      value instanceof Uint8Array ||
      value instanceof Uint8ClampedArray ||
      value instanceof Int16Array ||
      value instanceof Uint16Array ||
      value instanceof Int32Array ||
      value instanceof Uint32Array ||
      value instanceof Float32Array ||
      value instanceof Float64Array
    ) {
      var replacement = {
        constructor: value.constructor.name,
        data: Array.from(value),
        flag: "FLAG_TYPED_ARRAY"
      };
      return replacement;
    }
    return value;
  });

  const proxy_url = proxy.href;

  if (options.region) {
    proxy_url.pathname = `regions/${options.region}${proxy_url.pathname}`;
  }

  while (retries-- >= 0) {
    response = await fetch(proxy_url, {
      method: "POST",
      body: body
    });

    if (response.status !== 429 && response.status !== 503) break;

    // Exponential backoff
    await new Promise((res) => setTimeout(res, delay_ms));
    delay_ms *= 1.5;
  }
  return response;
}
)}

function _8(md){return(
md` Use like normal [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). The implementation just serialize the two parameters and executed on a remote headless Chrome that has had CORS disabled.

~~~js
response = await fetchp("https://google.com", {
  method: ...
  headers: {...}
});
~~~

`
)}

function _9(md){return(
md`### Serverside Implementation`
)}

function _proxy(deploy,id,SECRET_PARAMS,BASIC_AUTH,ALLOW_DOMAINS,MODIFIERS,array){return(
deploy(
  `proxy_${id}`, // Each proxy gets unique ID so they are not confused in notebooks with many
  async (req, res, ctx) => {
    try {
      // Read the envelope
      const { url, options } = JSON.parse(req.body, function (key, value) {
        // the reviver function looks for the typed array flag
        try {
          if ("flag" in value && value.flag === "FLAG_TYPED_ARRAY") {
            // if found, we convert it back to a typed array
            return new window[value.constructor](value.data);
          }
        } catch (e) {}
        // if flag not found no conversion is done
        return value;
      });

      const secretParams = Object.keys(SECRET_PARAMS)
        .map((param) => {
          const secret = SECRET_PARAMS[param];
          const value = ctx.secrets[secret];
          return encodeURIComponent(param) + "=" + encodeURIComponent(value);
        })
        .join("&");

      const decodedURL = new URL(url);
      if ((secretParams || BASIC_AUTH) && !ALLOW_DOMAINS)
        return res
          .status(400)
          .send("Must set ALLOW_DOMAINS when using secrets");
      if (ALLOW_DOMAINS !== null && !ALLOW_DOMAINS.includes(decodedURL.host))
        return res
          .status(403)
          .send(`${decodedURL.host} is not in ALLOW_DOMAINS set`);

      options.headers = options.headers || {};
      if (
        options.headers["content-type"] === "application/x-www-form-urlencoded"
      ) {
        options.body = (options.body || "") + "&" + secretParams;
      } else {
        decodedURL.search =
          decodedURL.search.length > 0
            ? decodedURL.search + "&" + secretParams
            : secretParams;
      }

      if (BASIC_AUTH && BASIC_AUTH.protocol === "RFC 7617") {
        options.headers = options.headers || {};
        const secret = ctx.secrets[BASIC_AUTH.passwordSecret];
        const username = BASIC_AUTH.username;
        options.headers["Authorization"] = `Basic ${btoa(
          `${username}:${secret}`
        )}`;
      }

      const response = await fetch(decodedURL, options);
      const responseHeaders = Object.fromEntries(
        Array.from(response.headers.entries()).map(([k, v]) => [
          k.toLowerCase(),
          v
        ])
      );
      delete responseHeaders["content-encoding"]; // Ensure we are not claiming to be gzipped
      delete responseHeaders["content-length"]; // We switch to chunked
      delete responseHeaders["access-control-allow-origin"]; // Remove any CORS
      delete responseHeaders["x-frame-options"];
      const headers = {
        ...responseHeaders,
        ...(options.responseHeaders || {}),
        "transfer-encoding": "chunked"
      };
      Object.keys(headers).map((key) => {
        if (headers[key]) res.header(key, headers[key]);
      });

      res.status(response.status);

      const body = await response.body;
      const reader = body.getReader();

      let { done, value } = await reader.read();
      while (!done) {
        //await
        res.write(value); // I think we shoudl await here but it breaks things if we do
        ({ done, value } = await reader.read());
      }
      res.end();
    } catch (err) {
      console.error(err);
      res.end(); // Can't do much on a chunked response
    }
  },
  {
    host: "webcode.run",
    modifiers: MODIFIERS,
    reusable: true,
    secrets: [
      ...Object.values(SECRET_PARAMS),
      ...array(BASIC_AUTH?.passwordSecret)
    ]
  }
)
)}

function _tryme(html,fetchp)
{ // Press it really quickly and see the 429 errors hidden from caller
  const button = html`<button>try me</button>`
  button.onclick = async () => {
    const response = await fetchp("https://google.com");
    console.log("Response " + response.status);
  }
  return button;
}


function _hash(require){return(
require('object-hash')
)}

function _array(){return(
value => (value ? [value] : [])
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("SECRET_PARAMS")).define("SECRET_PARAMS", _SECRET_PARAMS);
  main.variable(observer("ALLOW_DOMAINS")).define("ALLOW_DOMAINS", _ALLOW_DOMAINS);
  main.variable(observer("BASIC_AUTH")).define("BASIC_AUTH", _BASIC_AUTH);
  main.variable(observer("MODIFIERS")).define("MODIFIERS", _MODIFIERS);
  main.variable(observer("id")).define("id", ["hash","ALLOW_DOMAINS","SECRET_PARAMS","BASIC_AUTH","MODIFIERS"], _id);
  main.variable(observer("fetchp")).define("fetchp", ["ALLOW_DOMAINS","Response","getContext","SECRET_PARAMS","BASIC_AUTH","proxy"], _fetchp);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("proxy")).define("proxy", ["deploy","id","SECRET_PARAMS","BASIC_AUTH","ALLOW_DOMAINS","MODIFIERS","array"], _proxy);
  main.variable(observer("tryme")).define("tryme", ["html","fetchp"], _tryme);
  main.variable(observer("hash")).define("hash", ["require"], _hash);
  main.variable(observer("array")).define("array", _array);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.import("getContext", child1);
  return main;
}
