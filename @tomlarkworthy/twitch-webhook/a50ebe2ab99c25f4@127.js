import define1 from "./6eda90668ae03044@836.js";
import define2 from "./048a17a165be198d@271.js";

function _1(md){return(
md`# Twitch Webhook`
)}

function _3(md){return(
md`## Webhook to Twitch Events`
)}

function _events(endpoint,$0,Event){return(
endpoint("twitch", (req, res) => {
  $0.value = { req, res };
  $0.dispatchEvent(new Event("input"));
})
)}

function _req_res(Inputs){return(
Inputs.input()
)}

function _body(req_res){return(
JSON.parse(req_res.req.body)
)}

function _challenge_responser(body,req_res)
{
  if (body.challenge) {
    return req_res.res.send(body.challenge);
  }
}


function _8(endpoint){return(
endpoint("oauth", (req, res) => {
  debugger;
  res.send("hello");
})
)}

function _token(Inputs){return(
Inputs.text({
  label: "token"
})
)}

function _webhook_secret(){return(
"lkhfsdkjfhsdklfahdfas"
)}

async function _subscription(app_token,client_id,events,webhook_secret){return(
(
  await fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
    method: "post",
    headers: {
      Authorization: `Bearer ${app_token}`,
      "Content-Type": "application/json",
      "Client-Id": `${client_id}`
    },
    body: JSON.stringify({
      type: "user.update",
      version: "1",
      condition: {
        user_id: "1234"
      },
      transport: {
        method: "webhook",
        callback: events.href,
        secret: webhook_secret
      }
    })
  })
).json()
)}

function _13(md){return(
md`## Generate an App token`
)}

function _client_id(){return(
"c4lcospy8fxkqmu27vw2hkwzqov44t"
)}

function _client_secret(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "client secret"
  }),
  localStorageView("twitch_Secret")
)
)}

async function _app_token(Inputs,client_id,client_secret){return(
Inputs.password({
  label: "app_token",
  value: (
    await (
      await fetch("https://id.twitch.tv/oauth2/token", {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`
      })
    ).json()
  ).access_token
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("events")).define("events", ["endpoint","viewof req_res","Event"], _events);
  main.variable(observer("viewof req_res")).define("viewof req_res", ["Inputs"], _req_res);
  main.variable(observer("req_res")).define("req_res", ["Generators", "viewof req_res"], (G, _) => G.input(_));
  main.variable(observer("body")).define("body", ["req_res"], _body);
  main.variable(observer("challenge_responser")).define("challenge_responser", ["body","req_res"], _challenge_responser);
  main.variable(observer()).define(["endpoint"], _8);
  main.variable(observer("viewof token")).define("viewof token", ["Inputs"], _token);
  main.variable(observer("token")).define("token", ["Generators", "viewof token"], (G, _) => G.input(_));
  main.variable(observer("webhook_secret")).define("webhook_secret", _webhook_secret);
  main.variable(observer("subscription")).define("subscription", ["app_token","client_id","events","webhook_secret"], _subscription);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("client_id")).define("client_id", _client_id);
  main.variable(observer("viewof client_secret")).define("viewof client_secret", ["Inputs","localStorageView"], _client_secret);
  main.variable(observer("client_secret")).define("client_secret", ["Generators", "viewof client_secret"], (G, _) => G.input(_));
  main.variable(observer("viewof app_token")).define("viewof app_token", ["Inputs","client_id","client_secret"], _app_token);
  main.variable(observer("app_token")).define("app_token", ["Generators", "viewof app_token"], (G, _) => G.input(_));
  return main;
}
