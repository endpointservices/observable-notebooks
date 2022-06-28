import define1 from "./6eda90668ae03044@830.js";
import define2 from "./58f3eb7334551ae6@210.js";

function _1(md){return(
md`# Starting [Github Action](https://docs.github.com/en/actions) Workflows From [Observable](https://observablehq.com/)`
)}

async function _Octokit(){return(
await import("https://cdn.skypack.dev/@octokit/core")
)}

function _dispatch(Octokit){return(
async function dispatch(
  token,
  { owner, repo, event_type = "event_type", client_payload = undefined } = {}
) {
  return await new Octokit.Octokit({
    auth: token
  }).request("POST /repos/{owner}/{repo}/dispatches", {
    owner,
    repo,
    event_type,
    ...(client_payload && { client_payload })
  });
}
)}

function _dispatchProxyName(){return(
({ owner, repo, event_type }) =>
  "dispatch_" + owner + "_" + repo + "_" + event_type
)}

function _createDispatchProxy(endpoint,dispatchProxyName,dispatch,subdomain,html){return(
function createDispatchProxy({
  owner,
  repo,
  event_type = "event_type",
  client_payload = "NOT USED", // If set to null, the client can set it dynamically when dispatching
  secretName = "github_token", // Name of the secret containing a Github access token
  beforeDispatch = (args, ctx) => {}, // Custom hook for mutating args before dispatch evaluated serverside
  debug = false
} = {}) {
  const ep = endpoint(
    dispatchProxyName({ owner, repo, event_type }),
    async (req, res, ctx) => {
      if (debug) debugger;
      if (req.method !== "POST")
        return res.status(400).send("Use POST to trigger a dispatch");
      if (!ctx.secrets[secretName])
        return res
          .status(500)
          .send(`Cannot find a secret value under ${secretName}`);
      const payload =
        client_payload === null && req.body
          ? JSON.parse(req.body)
          : client_payload;
      const args = {
        ...arguments[0],
        ...(payload !== "NOT USED" && { client_payload: payload }),
        event_type
      };
      try {
        await beforeDispatch(args, ctx);
        const result = await dispatch(ctx.secrets[secretName], args);
        res.json(result);
      } catch (err) {
        res.json({
          error: true,
          name: err.name,
          status: err.status,
          message: err.message
        });
      }
    },
    {
      secrets: [subdomain() + "_" + secretName]
    }
  );
  const url = ep.href;

  const view = html`<div>${ep}`;
  view.value = async (user_client_payload) => {
    if (user_client_payload && client_payload !== null) {
      throw new Error(
        "Client cannot set client_payload if proxy has a client_payload configured"
      );
    }
    const proxyCall = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user_client_payload)
    });
    const result = await proxyCall.json();
    if (result.error) {
      const err = new Error(result.message);
      (err.name = result.name), (err.status = result.status);
      throw err;
    } else {
      return result;
    }
  };
  return view;
}
)}

function _8(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("Octokit")).define("Octokit", _Octokit);
  main.variable(observer("dispatch")).define("dispatch", ["Octokit"], _dispatch);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.import("subdomain", child1);
  main.variable(observer("dispatchProxyName")).define("dispatchProxyName", _dispatchProxyName);
  main.variable(observer("createDispatchProxy")).define("createDispatchProxy", ["endpoint","dispatchProxyName","dispatch","subdomain","html"], _createDispatchProxy);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _8);
  return main;
}
