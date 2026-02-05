import define1 from "./048a17a165be198d@273.js";

function _1(md){return(
md`# AI Hackathon`
)}

function _refresh(Inputs){return(
Inputs.button("refresh", { value: 1 })
)}

function _OPEN_AI_KEY(refresh,Inputs,localStorageView){return(
refresh &&
  Inputs.bind(
    Inputs.password({
      label: "ChatGPT key"
    }),
    localStorageView("gpt_key")
  )
)}

function _model(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    [
      "gpt-4",
      "gpt-4-0314",
      "gpt-4-32k",
      "gpt-4-32k-0314",
      "gpt-3.5-turbo",
      "gpt-3.5-turbo-16k",
      "gpt-3.5-turbo-0301"
    ].sort(),
    {
      label: "model"
    }
  ),
  localStorageView("gpt_model")
)
)}

function _api_key(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "Personal Staging API key"
  }),
  localStorageView("workspace_api_key")
)
)}

function _flow_version_url(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "flow_version_url"
  }),
  localStorageView("flow_version_url")
)
)}

function _sample_data(Inputs,flow){return(
Inputs.select(flow.sample_data, {
  label: "dataset",
  format: (x) => x.name,
  value: (x) => x.id
})
)}

function _error(Inputs,failures,flow_version){return(
Inputs.select(failures, {
  label: "error",
  format: (x) => {
    return (
      flow_version.graph.nodes.find((n) => n.id == x.node_id)?.name +
      " - " +
      x.msg
    );
  },
  width: "100%"
})
)}

function _9(Inputs,function_call){return(
Inputs.textarea({
  label: "chat",
  value: JSON.stringify(function_call.human_readable_error, null, 2),
  disabled: true,
  rows: 100
})
)}

function _10(Inputs,function_call){return(
Inputs.textarea({
  label: "fix",
  value: JSON.stringify(function_call.fixed_graph_json, null, 2),
  disabled: true,
  rows: 100
})
)}

function _11(md){return(
md`## Open AI API call configuration`
)}

function _system_prompt(){return(
"A python based decision engine has a serialized decision representation of graph_json and when executing a test run the server responds with error_json."
)}

function _prompt(error_node,flow_version,error){return(
`
The element of the Decision Flow version which has caused the error has a serialized representation of

---
${JSON.stringify(error_node, null, 2)}
---


${
  error_node.type == "input"
    ? `
  The node performs schema validation. The schema of the corresponding REST API has the following JSON representation ${JSON.stringify(
    flow_version.input_schema,
    null,
    2
  )}`
    : ""
}

when executing a test run the server responds with error_json of

---
${JSON.stringify(error, null, 2)}
---


How should we update the serialized representation to avoid the error response and how could we best explain it to the user who experienced this error and is now trying to debug it in the Taktile frontend? 

`
)}

function _settings(){return(
{
  temperature: 0,
  functions: [
    {
      name: "fix_decision_flow",
      description: "",
      parameters: {
        type: "object",
        properties: {
          human_readable_error: {
            type: "string",
            description:
              "Please explain why the error happened as if you were teaching someone just learning Python and provide and explanation of the fix you are suggesting - ideally as a series of steps the user can take to fix the error."
          },
          fixed_graph_json: {
            type: "string",
            description:
              "Escaped valid json of the new graph_json. It is critical this is syntactically valid JSON"
          }
        },
        required: ["human_readable_error", "fixed_graph_json"]
      }
    }
  ]
}
)}

function _examples(){return(
[
  {
    role: "user",
    content: `

The element of the Decision Flow version which has caused the error has a serialized representation of

---
{
  "meta": {
    "branches": [
      {
        "id": "8c2bd361-198d-4581-b824-d026e1d4400d",
        "junction": "and",
        "clauses": [
          {
            "id_left": "d6465e4f-e739-4ebd-bba1-14cd74d6bc44",
            "id_right": "4c2707d7-1f6a-4ce3-8d5e-b82ae480758f",
            "left": "data.buyer_age",
            "right": "1",
            "operator": "lt"
          }
        ],
        "effects": [
          {
            "id": "4fe05400-99e9-4961-9745-038d04c98ae9",
            "target": "knockout_age_status",
            "value": "\"FAIL\""
          },
          {
            "id": "6b8a2aed-8116-41be-bf72-6f19f8701df5",
            "target": "rejection_reasons",
            "value": "data.rejection_reasons + [\"Company is not old enough\"]"
          }
        ]
      }
    ],
    "default_effects": [
      {
        "id": "8c1a1b42-34d3-4fd2-93ed-4d3822668d19",
        "target": "knockout_age_status",
        "value": "\"PASS\""
      },
      {
        "id": "bdf70379-f771-46f2-ae87-bcad2220da19",
        "target": "rejection_reasons",
        "value": "data.rejection_reasons"
      }
    ],
    "created_by_id": "c31e4eed-b9ee-4a8a-810c-941ffa4045dd",
    "updated_by_id": "c31e4eed-b9ee-4a8a-810c-941ffa4045dd"
  },
  "name": "Knock-out: Buyer age",
  "id": "1183aa76-a206-4690-9236-6db3573f4e2f",
  "type": "rule_2"
}
---




when executing a test run the server responds with error_json of

---
{
  "index": 4,
  "data": {
    "buyer_id": "52e14392-7103-43ce-ae63-722c1dc8ed63",
    "platform": "Amazon UK",
    "buyer_age": null,
    "buyer_address_country": "UK",
    "buyer_history": [
      {
        "order_external_id": "5f6374a46a5e8e0104aa5cd4",
        "merchant_external_id": "5f6374a46a5e8e0104aa5cd4",
        "ordered_at": "2023-04-19",
        "payment_method": "CASH",
        "total_gross": 123.56,
        "currency": "POUNDS"
      },
      {
        "order_external_id": "5f6374a46a5e8e0104aa5cd4",
        "merchant_external_id": "5f6374a46a5e8e0104aa5cd4",
        "ordered_at": "2023-04-18",
        "payment_method": "CASH",
        "total_gross": 354.76,
        "currency": "POUNDS"
      },
      {
        "order_external_id": "5f6374a46a5e8e0104aa5cd4",
        "merchant_external_id": "5f6374a46a5e8e0104aa5cd4",
        "ordered_at": "2023-03-15",
        "payment_method": "CASH",
        "total_gross": 86.7,
        "currency": "POUNDS"
      },
      {
        "order_external_id": "5f6374a46a5e8e0104aa5cd4",
        "merchant_external_id": "5f6374a46a5e8e0104aa5cd4",
        "ordered_at": "2023-02-15",
        "payment_method": "CASH",
        "total_gross": 2341.4,
        "currency": "POUNDS"
      },
      {
        "order_external_id": "5f6374a46a5e8e0104aa5cd4",
        "merchant_external_id": "5f6374a46a5e8e0104aa5cd4",
        "ordered_at": "2023-01-13",
        "payment_method": "CASH",
        "total_gross": 11.34,
        "currency": "POUNDS"
      }
    ],
    "request_date": "2023-04-23",
    "buyer_name": "Green Construction Ltd",
    "legal_form": "Limited company",
    "registration_number": "AB123456",
    "fraud_score_provided": 0.05,
    "delinquency_score_provided": 100,
    "env": "test",
    "rejection_reasons": [],
    "knockout_country_status": "PASS"
  },
  "aux_data": {
    "archetype": "Rule node error - typeerror in comparison"
  },
  "node_id": "1183aa76-a206-4690-9236-6db3573f4e2f",
  "msg": "<class 'TypeError'> on operator application: '<' not supported between instances of 'NoneType' and 'int'",
  "status_code": 424,
  "loc": null,
  "loc_type": "node",
  "field_errors": [],
  "error_hash": "f05218991bd9c40ee2111ea2df42738f3d5794f2587a1c5aa9d1e1bfb944038e"
}
---


How should we update the serialized representation to avoid the error response and how could we best explain it to the user who experienced this error and is now trying to debug it in the Taktile frontend? 

`
  },
  {
    role: "assistant",
    content: ""
  }
]
)}

function _16(md){return(
md`### OpenAI execution`
)}

async function _openAiResponse(OPEN_AI_KEY,model,system_prompt,examples,prompt,settings)
{
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPEN_AI_KEY}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt
        },
        ...examples,
        {
          role: "user",
          content: prompt
        }
      ],
      ...settings
    })
  });

  if (response.status !== 200)
    throw new Error(`${response.status}: ${await response.text()}`);

  return response.json();
}


function _json_error(tmp)
{
  try {
    JSON.parse(tmp.fixed_graph_json);
    return true;
  } catch (e) {
    return e.message;
  }
}


function _function_call(openAiResponse,json_error)
{
  const response = JSON.parse(
    openAiResponse.choices[0].message.function_call.arguments
  );
  response.fixed_graph_json =
    json_error == false
      ? JSON.parse(response.fixed_graph_json)
      : {
          invalid_json: json_error,
          response: response.fixed_graph_json
        };
  return response;
}


function _tmp(openAiResponse){return(
JSON.parse(openAiResponse.choices[0].message.function_call.arguments)
)}

function _21(md){return(
md`## Failures
 `
)}

function _22(error){return(
error
)}

function _23(flow_version){return(
flow_version.graph.edges
)}

function _24(flow_version){return(
flow_version.graph.nodes
)}

function _error_node(flow_version,error){return(
flow_version.graph.nodes.find((n) => n.id == error.node_id)
)}

function _failures(executionErrors,runtimeFailures){return(
executionErrors.concat(runtimeFailures).map((e) => ({
  ...e,
  timings: undefined,
  provenance: undefined
}))
)}

function _27(md){return(
md`### Execution Failures`
)}

function _executionErrors(run_result){return(
run_result.errors
  ? run_result.errors.map((e) => ({
      ...e,
      name: e.msg
    }))
  : []
)}

function _29(md){return(
md`### Runtime failures`
)}

function _errorPages(run_result){return(
run_result.nodes
  ? Object.entries(run_result.nodes).flatMap(([id, n]) => n.failure_pages_urls)
  : []
)}

function _31(run_result){return(
run_result
)}

function _errorPageResponses(promiseRecursive,errorPages,workspace,flow,api_key){return(
promiseRecursive(
  errorPages.map((errorPage) =>
    fetch(
      `https://${workspace.base_url}/run/api/v1/flows/${flow.slug}/author/test-run/${errorPage}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": `${api_key}`,
          "content-type": "application/json"
        }
      }
    ).then((r) => r.json())
  )
)
)}

async function _runtimeFailures(promiseRecursive,errorPageResponses){return(
(
  await promiseRecursive(
    errorPageResponses.map(
      async (errorPageResponse) =>
        (
          await (await fetch(errorPageResponse.url)).json()
        ).failure
    )
  )
).flat()
)}

function _34(md){return(
md`## Implementaiton`
)}

function _config(flow_version_url)
{
  const url = new URL(flow_version_url);
  return {
    url,
    path: url.pathname,
    org: url.pathname.match(/org\/([^/]*)/)[1],
    ws: url.pathname.match(/ws\/([^/]*)/)[1],
    flow: url.pathname.match(/flow\/([^/]*)/)[1],
    flow_version: url.pathname.match(/version\/([^/]*)/)[1]
  };
}


async function _flow_version(config,api_key){return(
(
  await fetch(
    `https://flow-api.stg.taktile.com/api/v1/flow_versions/${config.flow_version}`,
    {
      headers: {
        accept: "application/json",
        "X-Api-Key": `${api_key}`
      },
      method: "GET"
    }
  )
).json()
)}

async function _flow(config,api_key){return(
(
  await fetch(`https://flow-api.stg.taktile.com/api/v1/flows/${config.flow}`, {
    headers: {
      accept: "application/json",
      "X-Api-Key": `${api_key}`
    },
    method: "GET"
  })
).json()
)}

async function _workspace(config,api_key){return(
(
  await fetch(
    `https://flow-api.stg.taktile.com/api/v1/workspaces/${config.ws}`,
    {
      headers: {
        accept: "application/json",
        "X-Api-Key": `${api_key}`
      },
      referrer: "https://app.stg.taktile.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      method: "GET",
      mode: "cors"
    }
  )
).json()
)}

async function _run_response(workspace,flow,api_key,flow_version,sample_data){return(
(
  await fetch(
    `https://${workspace.base_url}/run/api/v1/flows/${flow.slug}/author/test-run`,
    {
      method: "POST",
      headers: {
        "X-Api-Key": `${api_key}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        flow_version: flow_version.id,
        sample_data: sample_data.id,
        flow_version_etag: flow_version.etag
      })
    }
  )
).json()
)}

function _40(sample_data){return(
sample_data.id
)}

function _41(flow){return(
flow
)}

function _poll_iteration(){return(
1
)}

function _poll_response(poll_iteration,workspace,flow,run_response,api_key){return(
poll_iteration &&
  fetch(
    `https://${workspace.base_url}/run/api/v1/flows/${flow.slug}/author/test-run?run_id=${run_response.run_id}`,
    {
      headers: {
        "accept-language": "en-DE,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6",
        "X-Api-Key": `${api_key}`,
        "content-type": "application/json"
      }
    }
  )
)}

async function _run_result_link(poll_response,$0)
{
  if (poll_response.status == 200) return poll_response.json();
  if (poll_response.status >= 400) throw poll_response.status;
  else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    $0.value = $0.value + 1;
  }
}


async function _run_result(run_result_link){return(
(await fetch(run_result_link.url)).json()
)}

function _46(md){return(
md`## Utils`
)}

function _promiseRecursive(){return(
function promiseRecursive(obj) {
  const getPromises = (obj) =>
    Object.keys(obj).reduce(
      (acc, key) =>
        Object(obj[key]) !== obj[key]
          ? acc
          : acc.concat(
              typeof obj[key].then === "function"
                ? [[obj, key]]
                : getPromises(obj[key])
            ),
      []
    );
  const all = getPromises(obj);
  return Promise.all(all.map(([obj, key]) => obj[key])).then(
    (responses) => (
      all.forEach(([obj, key], i) => (obj[key] = responses[i])), obj
    )
  );
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["Inputs"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer("viewof OPEN_AI_KEY")).define("viewof OPEN_AI_KEY", ["refresh","Inputs","localStorageView"], _OPEN_AI_KEY);
  main.variable(observer("OPEN_AI_KEY")).define("OPEN_AI_KEY", ["Generators", "viewof OPEN_AI_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs","localStorageView"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof api_key")).define("viewof api_key", ["Inputs","localStorageView"], _api_key);
  main.variable(observer("api_key")).define("api_key", ["Generators", "viewof api_key"], (G, _) => G.input(_));
  main.variable(observer("viewof flow_version_url")).define("viewof flow_version_url", ["Inputs","localStorageView"], _flow_version_url);
  main.variable(observer("flow_version_url")).define("flow_version_url", ["Generators", "viewof flow_version_url"], (G, _) => G.input(_));
  main.variable(observer("viewof sample_data")).define("viewof sample_data", ["Inputs","flow"], _sample_data);
  main.variable(observer("sample_data")).define("sample_data", ["Generators", "viewof sample_data"], (G, _) => G.input(_));
  main.variable(observer("viewof error")).define("viewof error", ["Inputs","failures","flow_version"], _error);
  main.variable(observer("error")).define("error", ["Generators", "viewof error"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","function_call"], _9);
  main.variable(observer()).define(["Inputs","function_call"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer("prompt")).define("prompt", ["error_node","flow_version","error"], _prompt);
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer("examples")).define("examples", _examples);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["OPEN_AI_KEY","model","system_prompt","examples","prompt","settings"], _openAiResponse);
  main.variable(observer("json_error")).define("json_error", ["tmp"], _json_error);
  main.variable(observer("function_call")).define("function_call", ["openAiResponse","json_error"], _function_call);
  main.variable(observer("tmp")).define("tmp", ["openAiResponse"], _tmp);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["error"], _22);
  main.variable(observer()).define(["flow_version"], _23);
  main.variable(observer()).define(["flow_version"], _24);
  main.variable(observer("error_node")).define("error_node", ["flow_version","error"], _error_node);
  main.variable(observer("failures")).define("failures", ["executionErrors","runtimeFailures"], _failures);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("executionErrors")).define("executionErrors", ["run_result"], _executionErrors);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("errorPages")).define("errorPages", ["run_result"], _errorPages);
  main.variable(observer()).define(["run_result"], _31);
  main.variable(observer("errorPageResponses")).define("errorPageResponses", ["promiseRecursive","errorPages","workspace","flow","api_key"], _errorPageResponses);
  main.variable(observer("runtimeFailures")).define("runtimeFailures", ["promiseRecursive","errorPageResponses"], _runtimeFailures);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("config")).define("config", ["flow_version_url"], _config);
  main.variable(observer("flow_version")).define("flow_version", ["config","api_key"], _flow_version);
  main.variable(observer("flow")).define("flow", ["config","api_key"], _flow);
  main.variable(observer("workspace")).define("workspace", ["config","api_key"], _workspace);
  main.variable(observer("run_response")).define("run_response", ["workspace","flow","api_key","flow_version","sample_data"], _run_response);
  main.variable(observer()).define(["sample_data"], _40);
  main.variable(observer()).define(["flow"], _41);
  main.define("initial poll_iteration", _poll_iteration);
  main.variable(observer("mutable poll_iteration")).define("mutable poll_iteration", ["Mutable", "initial poll_iteration"], (M, _) => new M(_));
  main.variable(observer("poll_iteration")).define("poll_iteration", ["mutable poll_iteration"], _ => _.generator);
  main.variable(observer("poll_response")).define("poll_response", ["poll_iteration","workspace","flow","run_response","api_key"], _poll_response);
  main.variable(observer("run_result_link")).define("run_result_link", ["poll_response","mutable poll_iteration"], _run_result_link);
  main.variable(observer("run_result")).define("run_result", ["run_result_link"], _run_result);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  return main;
}
