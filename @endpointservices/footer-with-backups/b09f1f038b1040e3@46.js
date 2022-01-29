import define1 from "./6eda90668ae03044@802.js";
import define2 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Starting [Github Action](https://docs.github.com/en/actions) Workflows From [Observable](https://observablehq.com/)`
)});
  main.variable(observer("Octokit")).define("Octokit", async function(){return(
await import("https://cdn.skypack.dev/@octokit/core")
)});
  main.variable(observer("dispatch")).define("dispatch", ["Octokit"], function(Octokit){return(
async function dispatch(
  token,
  { owner, repo, event_type = "event_type", client_payload = undefined } = {}
) {
  return await new Octokit.Octokit({
    auth: token
  }).request("POST /repos/{owner}/{repo}/dispatches", {
    ...arguments[1],
    event_type
  });
}
)});
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer("dispatchProxyName")).define("dispatchProxyName", function(){return(
({ owner, repo, event_type }) =>
  "dispatch_" + owner + "_" + repo + "_" + event_type
)});
  main.variable(observer("createDispatchProxy")).define("createDispatchProxy", ["endpoint","dispatchProxyName","dispatch","html"], function(endpoint,dispatchProxyName,dispatch,html){return(
function createDispatchProxy({
  owner,
  repo,
  event_type = "event_type",
  client_payload = "NOT USED", // If set to null, the client can set it dynamically when dispatching
  // If set to a value, it is fixed by the server
  secretName = "github_token" // Name of the secret containing a Github access token
} = {}) {
  const ep = endpoint(
    dispatchProxyName({ owner, repo, event_type }),
    async (req, res, ctx) => {
      if (req.method !== "POST")
        return res.status(400).send("Use POST to trigger a dispatch");
      const payload =
        client_payload === null && req.body
          ? JSON.parse(req.body)
          : client_payload;
      const args = {
        ...arguments[0],
        client_payload: payload,
        event_type
      };
      try {
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
)});
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
