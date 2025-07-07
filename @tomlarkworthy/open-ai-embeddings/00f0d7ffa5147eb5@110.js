import define1 from "./048a17a165be198d@271.js";

function _1(md){return(
md`# Vector embeddings

\`\`\`js
import {vectors} from '@tomlarkworthy/open-ai-embeddings'
\`\`\`

\`\`\`js
vectors(inputs, { model, dimensions, cache })
\`\`\`
### \`vectors(inputs, { model, dimensions, cache })\`

Embeds an array of strings using OpenAI’s embedding endpoint, automatically batching requests to stay within API limits.

#### Parameters

- \`inputs\` (\`string | string[]\`): Text(s) to embed. Accepts a single string or an array of strings.
- \`model\` (\`string\`, optional): Embedding model name. Defaults to \`viewof model.value\`.
- \`dimensions\` (\`number\`, optional): Number of dimensions for the embedding (if supported by the model).
- \`cache\` (\`Map<string, object>\`, optional): Optional cache to store and reuse embeddings. Input strings are used as keys.


#### Returns

- \`Promise<object[]>\`: Resolves to an array of objects, one per input string. Each object includes:
  - \`input\`: the original input string
  - \`object\`: always \`"embedding"\`
  - \`index\`: position of the input in the request
  - \`embedding\`: an array of floats representing the vector embedding`
)}

function _memoryCache(){return(
new Map()
)}

function _3(md){return(
md`## Example`
)}

function _4(vectors){return(
vectors(["a", "b"])
)}

function _endpoint(Inputs){return(
Inputs.text({
  label: "embedding endpoint",
  value: "https://api.openai.com/v1/embeddings"
})
)}

function _model(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.select(
    [
      "text-embedding-ada-002",
      "text-embedding-3-small",
      "text-embedding-3-large"
    ],
    {
      label: "model"
    }
  ),
  localStorageView("embedding", {
    defaultValue: "text-embedding-3-small"
  })
)
)}

function _OPENAI_API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "OPENAI_API_KEY",
    placeholder: "paste openAI key here"
  }),
  localStorageView("OPENAI_API_KEY")
)
)}

function _vectors($0,memoryCache,vectorAPI){return(
async function vectors(
  inputs,
  { dimensions, model = $0.value, cache = memoryCache } = {}
) {
  if (typeof inputs === "string") inputs = [inputs];

  const maxPerInput = 8192 * 6;
  const maxTotalTokens = 300_000;
  const maxBatchSize = 2048;

  const batches = [];
  let batch = [];
  let batchTokenCount = 0;

  const results = [];

  for (const item of inputs) {
    if (!item || typeof item !== "string") continue;
    if (cache?.has(item)) {
      results.push(cache.get(item));
      continue;
    }

    const tokenEstimate = Math.ceil(item.length / 6);
    if (tokenEstimate > 8192) continue;

    if (
      batch.length >= maxBatchSize ||
      batchTokenCount + tokenEstimate > maxTotalTokens
    ) {
      batches.push(batch);
      batch = [];
      batchTokenCount = 0;
    }

    batch.push(item);
    batchTokenCount += tokenEstimate;
  }

  if (batch.length) batches.push(batch);

  for (const b of batches) {
    const r = await vectorAPI(b, { model, dimensions });
    const arr = Array.isArray(r) ? r : [r];
    for (let i = 0; i < b.length; i++) {
      const item = b[i];
      const result = arr[i];
      if (cache) cache.set(item, result);
      results.push(result);
    }
  }

  return results;
}
)}

function _vectorAPI($0,$1){return(
async function vectorAPI(input, { model, dimensions} = {}) {
  const data = (
    await (
      await fetch($0.value, {
        method: "post",
        headers: {
          Authorization: `Bearer ${$1.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input,
          model,
          dimensions,
          encoding_format: "float"
        })
      })
    ).json()
  ).data;

  return data.map((d, i) => ({
    input: input[i],
    ...d
  }));
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("memoryCache")).define("memoryCache", _memoryCache);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["vectors"], _4);
  main.variable(observer("viewof endpoint")).define("viewof endpoint", ["Inputs"], _endpoint);
  main.variable(observer("endpoint")).define("endpoint", ["Generators", "viewof endpoint"], (G, _) => G.input(_));
  main.variable(observer("viewof model")).define("viewof model", ["Inputs","localStorageView"], _model);
  main.variable(observer("model")).define("model", ["Generators", "viewof model"], (G, _) => G.input(_));
  main.variable(observer("viewof OPENAI_API_KEY")).define("viewof OPENAI_API_KEY", ["Inputs","localStorageView"], _OPENAI_API_KEY);
  main.variable(observer("OPENAI_API_KEY")).define("OPENAI_API_KEY", ["Generators", "viewof OPENAI_API_KEY"], (G, _) => G.input(_));
  main.variable(observer("vectors")).define("vectors", ["viewof model","memoryCache","vectorAPI"], _vectors);
  main.variable(observer("vectorAPI")).define("vectorAPI", ["viewof endpoint","viewof OPENAI_API_KEY"], _vectorAPI);
  const child1 = runtime.module(define1);
  main.import("localStorageView", child1);
  return main;
}
