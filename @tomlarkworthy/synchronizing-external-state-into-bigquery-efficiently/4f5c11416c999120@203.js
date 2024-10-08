// https://observablehq.com/@tomlarkworthy/synchronizing-external-state-into-bigquery-efficiently@203
import define1 from "./8d271c22db968ab0@160.js";
import define2 from "./1bef71e497eda5fc@189.js";

function _1(md){return(
md`
# Schema Generator for synchronizing external state into BigQuery
`
)}

function _2(md){return(
md`
This is a design pattern for synchronizing BigQuery with external state with low latency. Its a situation I have run into enough to motivate building a generator for. This tool generates the right statements for creating custom tables and views for your particular situation and data types.


![Architecture diagram](https://raw.githubusercontent.com/tomlarkworthy/observablehq_data/master/images/BQSync.png)

The pattern achieves synchronization by streaming key-value mutations to an append only log. This is useful for data like user preferences or other externally managed relations etc, where the rate of change is relatively low, but there is a lot of static data and you want the changes reflected in the data pipelines as fast as possible, with more than 1000 updates per day. It is an alternative to replacing a table in a periodic batch process, which often is wasteful and adds significant latency.

The general idea is we represent the external data as a key-value relation within BigQuery. This abstraction is really a view of an append only oplog of assignment operations. It is the oplog that external sources write to in an append only real time fashion. The downstream bigquery consumers attach to a logical view of the oplog.

So, to update a single key-value record, the new key-value pair is inserted, with the current timestamp, to the oplog table. This is then reflected in the logical view almost immediately.

This tool is a code generator that produces right SQL for your project, dataset, KV name and column names and datatypes, so you can give your fields more meaningful names and support even structs as values. Feel free to [fork and customize](https://observablehq.com/@tomlarkworthy/synchronizing-external-state-into-bigquery-efficiently)! MIT licensed.

The outline of the setup is

1. Create an oplog table to store key-value mutations
2. Create a view of that that summarizes the latest state.
3. Run a background compaction query that prunes old operations from the oplog to prevent unbounded growth.

## Instructions

Use the tool's form below to customize the names and datatypes of the keys and values. For example, you might have a user-organization relation held in an external user management system. In this case the key might be userId as a STRING, and the value is the organization as a STRING. Whenever a user is created in an organization, append (userId, organizationId, CURRENT_TIMESTAMP) into the user_organization_oplog table.


`
)}

function _config(form,html){return(
form(html`<form>
  <div><label><input name="projectId" type="text" value="myProjectId"> <i>project id</i></label></div>
  <div><label><input name="dataset" type="text" value="myDataset"> <i>dataset name</i></label></div>
  <div><label><input name="name" type="text" value="myKV"> <i>view name</i></label></div>
  <div><label><input name="key" type="text" value="key"> <i>key name</i></label></div>
  <div><label><input name="keyT" type="text" value="STRING"> <i>key datatype</i></label></div>
  <div><label><input name="value" type="text" value="value"> <i>value name</i></label></div>
  <div><label><input name="valueT" type="text" value="STRING"> <i>value datatype</i></label></div>
  <div><label><input name="cluster" type="text" value="key"> <i>comma seperated cluster columns (or blank)</i></label></div>
</form>`)
)}

function _4(md,config,clusterBy){return(
md`

## Oplog Storage Table

The following code will regenerate the oplog table. External services should stream inserts into this to update individual Key-Value records. Run as a [query](https://bigquery.cloud.google.com/queries/${config.projectId}) in the UI.


\`\`\`sql
#standardSQL
CREATE OR REPLACE TABLE \`${config.projectId}.${config.dataset}.${config.name}_oplog\` (
  ${config.key} ${config.keyT} NOT NULL,
  ${config.value} ${config.valueT},
  timestamp TIMESTAMP NOT NULL
)
${clusterBy}
OPTIONS(
  description = "Inserts rows to update the ${config.key}-${config.value} relation. Last write wins as determined by the timestamp."
);
\`\`\`

## Key-Value View of Oplog

The following SQL creates a view of the oplog of the latest values of each Key-Value assignment. Downstream BQ consumers should query this view rather than the oplog. Run as a [query](https://bigquery.cloud.google.com/queries/${config.projectId}) in the UI.

\`\`\`sql
#standardSQL
CREATE OR REPLACE VIEW \`${config.projectId}.${config.dataset}.${config.name}\` AS 
SELECT ${config.key}, ${config.value}, timestamp AS last_modified
FROM \`${config.projectId}.${config.dataset}.${config.name}_oplog\` ops1
WHERE
  timestamp = (
    SELECT MAX(timestamp)
    FROM \`${config.projectId}.${config.dataset}.${config.name}_oplog\` ops2
    WHERE ops1.${config.key} = ops2.${config.key}
  ) AND ${config.value} IS NOT NULL;
\`\`\`

## Periodic Inplace Oplog Truncation

The following query should be run in a [scheduled query](https://bigquery.cloud.google.com/scheduledqueries/${config.projectId}) to compact the oplog regularly and keep the oplog small.
\`\`\`sql
#standardSQL
MERGE \`${config.projectId}.${config.dataset}.${config.name}_oplog\` ops
USING
  (SELECT * FROM \`${config.projectId}.${config.dataset}.${config.name}\`) kv
ON TRUE
  AND ops.${config.key} = kv.${config.key}
  AND ops.${config.value} = kv.${config.value}
  AND ops.timestamp = kv.last_modified
WHEN NOT MATCHED BY SOURCE THEN DELETE
\`\`\`
`
)}

function _clusterBy(config){return(
config.cluster? `CLUSTER BY ${config.cluster}` : ""
)}

function _6(){return(
`Copyright 2019 Tom Larkworthy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
)}

function _9(futurice_profile){return(
futurice_profile
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof config")).define("viewof config", ["form","html"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","config","clusterBy"], _4);
  main.variable(observer("clusterBy")).define("clusterBy", ["config"], _clusterBy);
  main.variable(observer()).define(_6);
  const child1 = runtime.module(define1);
  main.import("form", child1);
  const child2 = runtime.module(define2);
  main.import("futurice_profile", child2);
  main.variable(observer()).define(["futurice_profile"], _9);
  return main;
}
