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

function _flow_version_url(refresh,Inputs,localStorageView){return(
refresh &&
  Inputs.bind(
    Inputs.text({
      label: "flow_version_url",
      width: "100%"
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

function _flow_version_selection(Inputs,flow){return(
Inputs.select(flow.versions, {
  label: "version",
  format: (x) => x.name
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

function _10(Inputs,hint){return(
Inputs.textarea({
  label: "hint",
  value: hint,
  disabled: true,
  rows: 5
})
)}

function _11(md){return(
md`### Response decoder`
)}

function _hint(openAiResponse)
{
  try {
    return openAiResponse.choices[0].message.content
      .match(/---([\s\S]*)---([\s\S]*)---/)[1]
      .trim();
  } catch (err) {
    return openAiResponse.choices[0].message.content;
  }
}


function _13(openAiResponse){return(
openAiResponse.choices[0].message.content
)}

function _14(md){return(
md`## Open AI API call configuration`
)}

function _system_prompt(){return(
`You are a very smart and compassionate support agent for a decision engine built on Python talking a inexperienced programmer with not experience of Python. I am trying to build decision for a fin tech application. I have a larger decision flows comprised of different nodes and a python dictionary called data is passed through it. I have an error on a code node.

I will supply you the JSON definition of my current code node, the python code is in a field called "src"

The code node has the current set of Python packages availible which might be helpful. 
zstd 1.5.2.6
wrapt 1.14.1
urllib3 1.26.14
typing-extensions 4.4.0
sympy 1.11.1
six 1.16.0
s3transfer 0.6.0
runner 0.1.0
requests 2.28.1
python-dateutil 2.8.2
pyrsistent 0.19.3
pydantic 1.10.4
protobuf 4.21.12
packaging 23.0
orjson 3.8.5
onnxruntime 1.13.1
numpy 1.24.1
mpmath 1.2.1
jsonschema 4.17.3
jmespath 1.0.1
idna 3.4
humanfriendly 10.0
flow-utils 0.1.0
flatbuffers 23.1.4
fastjsonschema 2.16.2
email-validator 1.3.0
dnspython 2.3.0
connect-schemas 0.1.0
coloredlogs 15.0.1
charset-normalizer 2.1.1
certifi 2022.12.7
botocore 1.29.51
boto3 1.26.51
aws-xray-sdk 2.11.0
aws-lambda-powertools 1.28.0
attrs 22.2.0
simplejson 3.17.2
awslambdaric 2.0.4
setuptools 58.1.0
pip 22.0.4
Code nodes use Python 3.9

I access data through a data object, which is a Python dictionary, but also dot notation which I find more readable and simple. To access the attribute "max_age" of the data object you would type data.max_age.

There is also a params object availible, which is another Python dictionary. You can access attributes by using dot notation as well. To access the attribute "max_age" of params you would type params.max_age.
If a parameter is not found, you have the option of adding new parameters with all supported datatypes in Python - in this case, please return the updated <params> json.

Between nodes the data that is being passed must be json serializable. Note that some datatypes in Python are not (e.g. numpy datatypes)

I will now send you a message about an error in the system as follows
---
<node definition JSON>
---
<error response>
---
<params>
---
<input schema>
---

The first entry of the <error response> is the data object. 

The last one is the input schema of the decision flow which corresponds to a REST API accepting data as an input. Usually the solution to schema errors is changing the schema as opposed to changing the data.

You must response with a helpful error explanation including what the new code should look like in a python markdown formatted code block

More hints for your response: 
- Please always suggest fixes for the logic and not for the data object!!!! This is very important!
- Always refer to null and None as None consistently - the system is based on Python. Sometimes you will have missing data marked as null. In your human readable explanation please always use None and not null.


You must respond **mardown**, always include the complete code. You should include a comment "# I change the following line for you" above any code modification you make on my node. I cannot respond to follow up questions so do not invite me to follow ups.
`
)}

function _prompt(error_node,error,flow_version){return(
`
---
${JSON.stringify(error_node, null, 2)}
---
${JSON.stringify(error, null, 2)}
---
${JSON.stringify(flow_version.parameters, null, 2)}
---
${JSON.stringify(flow_version.input_schema, null, 2)}
---`
)}

function _settings(){return(
{
  temperature: 0
}
)}

function _examples(){return(
[]
)}

function _19(md){return(
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


function _21(md){return(
md`## Failures
 `
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

function _24(md){return(
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

function _26(md){return(
md`### Runtime failures`
)}

function _errorPages(run_result){return(
run_result.nodes
  ? Object.entries(run_result.nodes).flatMap(([id, n]) => n.failure_pages_urls)
  : []
)}

function _28(run_result){return(
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

function _31(md){return(
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


async function _flow_version(flow_version_selection,api_key){return(
(
  await fetch(
    `https://flow-api.stg.taktile.com/api/v1/flow_versions/${flow_version_selection.id}`,
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

function _37(sample_data){return(
sample_data.id
)}

function _38(flow){return(
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

function _43(md){return(
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
  main.variable(observer("viewof flow_version_url")).define("viewof flow_version_url", ["refresh","Inputs","localStorageView"], _flow_version_url);
  main.variable(observer("flow_version_url")).define("flow_version_url", ["Generators", "viewof flow_version_url"], (G, _) => G.input(_));
  main.variable(observer("viewof sample_data")).define("viewof sample_data", ["Inputs","flow"], _sample_data);
  main.variable(observer("sample_data")).define("sample_data", ["Generators", "viewof sample_data"], (G, _) => G.input(_));
  main.variable(observer("viewof flow_version_selection")).define("viewof flow_version_selection", ["Inputs","flow"], _flow_version_selection);
  main.variable(observer("flow_version_selection")).define("flow_version_selection", ["Generators", "viewof flow_version_selection"], (G, _) => G.input(_));
  main.variable(observer("viewof error")).define("viewof error", ["Inputs","failures","flow_version"], _error);
  main.variable(observer("error")).define("error", ["Generators", "viewof error"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","hint"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("hint")).define("hint", ["openAiResponse"], _hint);
  main.variable(observer()).define(["openAiResponse"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("system_prompt")).define("system_prompt", _system_prompt);
  main.variable(observer("prompt")).define("prompt", ["error_node","error","flow_version"], _prompt);
  main.variable(observer("settings")).define("settings", _settings);
  main.variable(observer("examples")).define("examples", _examples);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("openAiResponse")).define("openAiResponse", ["OPEN_AI_KEY","model","system_prompt","examples","prompt","settings"], _openAiResponse);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("error_node")).define("error_node", ["flow_version","error"], _error_node);
  main.variable(observer("failures")).define("failures", ["executionErrors","runtimeFailures"], _failures);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("executionErrors")).define("executionErrors", ["run_result"], _executionErrors);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("errorPages")).define("errorPages", ["run_result"], _errorPages);
  main.variable(observer()).define(["run_result"], _28);
  main.variable(observer("errorPageResponses")).define("errorPageResponses", ["promiseRecursive","errorPages","workspace","flow","api_key"], _errorPageResponses);
  main.variable(observer("runtimeFailures")).define("runtimeFailures", ["promiseRecursive","errorPageResponses"], _runtimeFailures);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("config")).define("config", ["flow_version_url"], _config);
  main.variable(observer("flow_version")).define("flow_version", ["flow_version_selection","api_key"], _flow_version);
  main.variable(observer("flow")).define("flow", ["config","api_key"], _flow);
  main.variable(observer("workspace")).define("workspace", ["config","api_key"], _workspace);
  main.variable(observer("run_response")).define("run_response", ["workspace","flow","api_key","flow_version","sample_data"], _run_response);
  main.variable(observer()).define(["sample_data"], _37);
  main.variable(observer()).define(["flow"], _38);
  main.define("initial poll_iteration", _poll_iteration);
  main.variable(observer("mutable poll_iteration")).define("mutable poll_iteration", ["Mutable", "initial poll_iteration"], (M, _) => new M(_));
  main.variable(observer("poll_iteration")).define("poll_iteration", ["mutable poll_iteration"], _ => _.generator);
  main.variable(observer("poll_response")).define("poll_response", ["poll_iteration","workspace","flow","run_response","api_key"], _poll_response);
  main.variable(observer("run_result_link")).define("run_result_link", ["poll_response","mutable poll_iteration"], _run_result_link);
  main.variable(observer("run_result")).define("run_result", ["run_result_link"], _run_result);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  return main;
}
