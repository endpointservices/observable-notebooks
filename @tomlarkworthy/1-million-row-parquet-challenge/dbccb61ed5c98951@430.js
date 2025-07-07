function _1(md){return(
md`# DuckDBClient with DuckDB 1.1.1`
)}

function _2(versions,md){return(
md`Observable's Standard Library currently includes duckdb-wasm 1.24.0 (with [duckdb 0.7.1](https://github.com/duckdb/duckdb-wasm/tree/v1.24.0/submodules)). This notebook provides patched \`DuckDBClient\` instances for
- [\`duckdb-wasm@latest\`](https://www.npmjs.com/package/@duckdb/duckdb-wasm/v/latest) (${versions.latest.wasmVersion}, with [duckdb ${versions.latest.duckdb}](https://github.com/duckdb/duckdb-wasm/tree/${versions.latest.gitRef}/submodules))
- [\`duckdb-wasm@next\`](https://www.npmjs.com/package/@duckdb/duckdb-wasm/v/next) (${versions.next.wasmVersion}, with [duckdb ${versions.next.duckdb}](https://github.com/duckdb/duckdb-wasm/tree/${versions.next.gitRef}/submodules))

### Usage

\`\`\`js
import {DuckDBClient_latest as DuckDBClient} from "@mootari/duckdbclient"
\`\`\`
\`\`\`js
db = DuckDBClient_latest.of(/* your tables */)
\`\`\`
### Known problems

**Files:**
- large FileAttachments may not work in Safari ([see issue comment](https://github.com/observablehq/feedback/issues/588#issuecomment-1679543240))
- cached Parquet files may cause errors ([see issue](https://github.com/duckdb/duckdb-wasm/issues/1658))

**\`PIVOT\`:**
- queries with interpolated values fail ([see issue](https://github.com/duckdb/duckdb-wasm/issues/1835))
- pivoted numeric columns have ".0" appended`
)}

function _3(md){return(
md`---
## Example`
)}

function _version(Inputs,versions,htl){return(
Inputs.radio(Object.entries(versions), {
  label: "Version",
  format: ([k, v]) => htl.html`<span><strong>@${k}</strong> (duckdb-wasm ${v.wasmVersion}, duckdb ${v.duckdb})`,
  valueof: d => d[0],
  value: new URL(document.baseURI).searchParams.get("version") ?? "latest",
})
)}

function _DuckDBClient_example(importPatched,versions,version){return(
importPatched(versions[version])
)}

function _cities(){return(
[
  ['NL', 'Amsterdam', 2000, 1005],
  ['NL', 'Amsterdam', 2010, 1065],
  ['NL', 'Amsterdam', 2020, 1158],
  ['US', 'Seattle', 2000, 564],
  ['US', 'Seattle', 2010, 608],
  ['US', 'Seattle', 2020, 738],
  ['US', 'New York City', 2000, 8015],
  ['US', 'New York City', 2010, 8175],
  ['US', 'New York City', 2020, 8772],
].map(([country, name, year, population]) => ({country, name, year, population}))
)}

function _db(DuckDBClient_example,cities){return(
DuckDBClient_example.of({cities})
)}

function _8(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`-- Example from https://duckdb.org/docs/stable/sql/statements/pivot.html#pivot-on-and-using
PIVOT cities ON year USING sum(population)`
)}

function _9(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`-- Example from https://duckdb.org/docs/stable/sql/statements/pivot.html#in-filter-for-on-clause
PIVOT cities ON year IN (2000.0, 2010.0) USING sum(population) GROUP BY country`
)}

function _10(md){return(
md`The following query requires the **@next** version:`
)}

function _11(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`-- Adapted from https://duckdb.org/docs/stable/sql/statements/pivot.html#in-filter-for-on-clause
PIVOT cities ON year IN (2000.0, 2010.0) USING sum(population) + ${0} GROUP BY country`
)}

function _12(md){return(
md`---`
)}

function _13(__query,db,invalidation){return(
__query.sql(db,invalidation,"db")`-- Show the DuckDB version and ensure that prepared statements work
select version(), ${"foo"}, ${1}`
)}

function _14(md){return(
md`---
## Implementation`
)}

function _versions(){return(
{
  latest: {
    gitRef: "v1.29.0",
    wasmVersion: "1.29.0",
    arrowVersion: "17.0.0",
    duckdb: "1.1.1"
  },
  next: {
    gitRef: "v1.2-histrionicus",
    wasmVersion: "1.29.1-dev115.0",
    arrowVersion: "17.0.0",
    duckdb: "1.2.1"
  }
}
)}

function _DuckDBClient_latest(importPatched,versions){return(
importPatched(versions.latest)
)}

function _DuckDBClient_next(importPatched,versions){return(
importPatched(versions.next)
)}

function _importPatched(patchSend){return(
function importPatched({wasmVersion, arrowVersion}) {
  return fetch("https://esm.sh/gh/observablehq/stdlib@v5.8.8/es2022/src/duckdb.bundle.mjs")
    .then(response => response.text())
    // Patch the module source
    .then(source => source
      .replace(/("@duckdb\/duckdb-wasm",)"1.24.0"/, `$1"${wasmVersion}"`)
      // Match the Arrow version.
      // See https://github.com/duckdb/duckdb-wasm/blob/v1.29.0/packages/duckdb-wasm/package.json#L26
      .replace(/("apache-arrow",)"11.0.0"/, `$1"${arrowVersion}"`)
    )
    // Import the patched module
    .then(source => import(URL.createObjectURL(new Blob([source], {type: "text/javascript"}))))
    // Restore the now minified class name
    .then(module => Object.defineProperty(module.DuckDBClient, "name", {value: "DuckDBClient"}))
    // Patch the client's internal duckdb-wasm instance to remap .send() to .query() on connection and statement instances
    .then(C => {
      const of = C.of;
      C.of = async(...args) => {
        const client = await of(...args);
        patchSend(client._db);
        return client;
      };
      return C;
    })
}
)}

function _patchSend(){return(
function patchSend(db) {
  const wrap = (fn, map) => function(...args) { return map(fn.apply(this, args)) };
  const yieldAsync = async function* (ret) { yield await ret };
  db.connect = wrap(db.connect, async ret => {
    const conn = await ret;
    conn.prepare = wrap(conn.prepare, async ret => {
      const stmt = await ret;
      stmt.send = wrap(stmt.query, yieldAsync);
      return stmt;
    });
    conn.send = wrap(conn.query, yieldAsync);
    return conn;
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["versions","md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof version")).define("viewof version", ["Inputs","versions","htl"], _version);
  main.variable(observer("version")).define("version", ["Generators", "viewof version"], (G, _) => G.input(_));
  main.variable(observer("DuckDBClient_example")).define("DuckDBClient_example", ["importPatched","versions","version"], _DuckDBClient_example);
  main.variable(observer("cities")).define("cities", _cities);
  main.variable(observer("db")).define("db", ["DuckDBClient_example","cities"], _db);
  main.variable(observer()).define(["__query","db","invalidation"], _8);
  main.variable(observer()).define(["__query","db","invalidation"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["__query","db","invalidation"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["__query","db","invalidation"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("versions")).define("versions", _versions);
  main.variable(observer("DuckDBClient_latest")).define("DuckDBClient_latest", ["importPatched","versions"], _DuckDBClient_latest);
  main.variable(observer("DuckDBClient_next")).define("DuckDBClient_next", ["importPatched","versions"], _DuckDBClient_next);
  main.variable(observer("importPatched")).define("importPatched", ["patchSend"], _importPatched);
  main.variable(observer("patchSend")).define("patchSend", _patchSend);
  return main;
}
