function _1(md){return(
md`# DuckDB 1.27.0
`
)}

function _2(md){return(
md`---`
)}

function _packageName(){return(
'@duckdb/duckdb-wasm'
)}

function _duckdb(){return(
import("https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.27.0/+esm")
)}

function _arrow(require){return(
require("apache-arrow@8")
)}

function _libraryVersion(duckdb){return(
duckdb.PACKAGE_VERSION
)}

function _bundles(duckdb){return(
duckdb.getJsDelivrBundles()
)}

function _bundle(duckdb,bundles){return(
duckdb.selectBundle(bundles)
)}

function _makeDB(duckdb,bundle){return(
async function makeDB() {
  const logger = new duckdb.ConsoleLogger();
  const worker = await duckdb.createWorker(bundle.mainWorker);
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule);
  return db
}
)}

function _db(makeDB){return(
makeDB()
)}

function _11(db){return(
db.getVersion()
)}

function _DuckDBClient(getType,makeDB,Inputs,element,text,arrow){return(
class DuckDBClient {
  constructor(_db) {
    this._db = _db;
    this._counter = 0;
  }

  async queryStream(query, params) {
    const conn = await this.connection();
    let result;

    if (params) {
      const stmt = await conn.prepare(query);
      result = await stmt.query(...params);
    } else {
      result = await conn.query(query);
    }
    // Populate the schema of the results
    const schema = result.schema.fields.map(({ name, type }) => ({
      name,
      type: getType(String(type)),
      databaseType: String(type)
    }));
    return {
      schema,
      async *readRows() {
        let rows = result.toArray().map((r) => Object.fromEntries(r));
        yield rows;
      }
    };
  }

  // This function gets called to prepare the `query` parameter of the `queryStream` method
  queryTag(strings, ...params) {
    return [strings.join("?"), params];
  }

  escape(name) {
    return `"${name}"`;
  }

  async describeTables() {
    const conn = await this.connection();
    const tables = (await conn.query(`SHOW TABLES`)).toArray();
    return tables.map(({ name }) => ({ name }));
  }

  async describeColumns({ table } = {}) {
    const conn = await this.connection();
    const columns = (await conn.query(`DESCRIBE ${table}`)).toArray();
    return columns.map(({ column_name, column_type }) => {
      return {
        name: column_name,
        type: getType(column_type),
        databaseType: column_type
      };
    });
  }

  async db() {
    if (!this._db) {
      this._db = await makeDB();
      await this._db.open({
        query: {
          castTimestampToDate: true
        }
      });
    }
    return this._db;
  }

  async connection() {
    if (!this._conn) {
      const db = await this.db();
      this._conn = await db.connect();
    }
    return this._conn;
  }

  async reconnect() {
    if (this._conn) {
      this._conn.close();
    }
    delete this._conn;
  }

  // The `.queryStream` function will supercede this for SQL and Table cells
  // Keeping this for backwards compatibility
  async query(query, params) {
    const key = `Query ${this._counter++}: ${query}`;
    console.time(key);
    const conn = await this.connection();
    let result;

    if (params) {
      const stmt = await conn.prepare(query);
      result = stmt.query(...params);
    } else {
      result = await conn.query(query);
    }

    console.timeEnd(key);
    return result;
  }

  // The `.queryStream` function will supercede this for SQL and Table cells
  // Keeping this for backwards compatibility
  async sql(strings, ...args) {
    // expected to be used like db.sql`select * from table where foo = ${param}`

    // let queryWithParams = strings.join("?");
    // if (typeof args !== 'undefined'){
    //   for (const param of args) {
    //     queryWithParams = queryWithParams.replace('?', param);
    //   }
    // }
    // const results = await this.query(queryWithParams);

    const results = await this.query(strings.join("?"), args);

    // return rows as a JavaScript array of objects for now
    let rows = results.toArray().map(Object.fromEntries);
    rows.columns = results.schema.fields.map((d) => d.name);
    return rows;
  }

  async table(query, params, opts) {
    const result = await this.query(query, params);
    return Inputs.table(result, { layout: "auto", ...(opts || {}) });
  }

  // get the client after the query ran
  async client(query, params) {
    await this.query(query, params);
    return this;
  }

  // query a single row
  async queryRow(query, params) {
    const key = `Query ${this._counter++}: ${query}`;

    console.time(key);
    const conn = await this.connection();
    // use send as we can stop iterating after we get the first batch
    const result = await conn.send(query, params);
    const batch = (await result.next()).value;
    console.timeEnd(key);

    return batch?.get(0);
  }

  async explain(query, params) {
    const row = await this.queryRow(`EXPLAIN ${query}`, params);
    return element("pre", { className: "observablehq--inspect" }, [
      text(row["explain_value"])
    ]);
  }

  // Describe the database (no arg) or a table
  async describe(object) {
    const result = await (object === undefined
      ? this.query(`SHOW TABLES`)
      : this.query(`DESCRIBE ${object}`));
    return Inputs.table(result);
  }

  // Summarize a query result
  async summarize(query) {
    const result = await this.query(`SUMMARIZE ${query}`);
    return Inputs.table(result);
  }

  async insertJSON(name, buffer, options) {
    const db = await this.db();
    await db.registerFileBuffer(name, new Uint8Array(buffer));
    const conn = await db.connect();
    await conn.insertJSONFromPath(name, { name, schema: "main", ...options });
    await conn.close();

    return this;
  }

  async insertCSV(name, buffer, options) {
    const db = await this.db();
    await db.registerFileBuffer(name, new Uint8Array(buffer));
    const conn = await db.connect();
    await conn.insertCSVFromPath(name, { name, schema: "main", ...options });
    await conn.close();

    return this;
  }

  async insertParquet(name, buffer) {
    const db = await this.db();
    await db.registerFileBuffer(name, new Uint8Array(buffer));
    const conn = await db.connect();
    await conn.query(
      `CREATE VIEW '${name}' AS SELECT * FROM parquet_scan('${name}')`
    );
    await conn.close();

    return this;
  }

  async insertArrowTable(name, table, options) {
    const buffer = arrow.tableToIPC(table);
    return this.insertArrowFromIPCStream(name, buffer, options);
  }

  async insertArrowFromIPCStream(name, buffer, options) {
    const db = await this.db();
    const conn = await db.connect();
    await conn.insertArrowFromIPCStream(buffer, {
      name,
      schema: "main",
      ...options
    });
    await conn.close();

    return this;
  }

  // Create a database from FileArrachments
  static async of(files = []) {
    const db = await makeDB();
    await db.open({
      query: {
        castTimestampToDate: true
      }
    });

    const toName = (file) =>
      file.name.split(".").slice(0, -1).join(".").replace(/\@.+?/, ""); // remove the "@X" versions Observable adds to file names

    if (files.constructor.name === "FileAttachment") {
      files = [[toName(files), files]];
    } else if (!Array.isArray(files)) {
      files = Object.entries(files);
    }

    // Add all files to the database. Import JSON and CSV. Create view for Parquet.
    await Promise.all(
      files.map(async (entry) => {
        let file;
        let name;
        let options = {};

        if (Array.isArray(entry)) {
          [name, file] = entry;
          if (file.hasOwnProperty("file")) {
            ({ file, ...options } = file);
          }
        } else if (entry.constructor.name === "FileAttachment") {
          [name, file] = [toName(entry), entry];
        } else if (typeof entry === "object") {
          ({ file, name, ...options } = entry);
          name = name ?? toName(file);
        } else {
          console.error("Unrecognized entry", entry);
        }

        console.log("entry", entry);
        console.log("file", file);
        console.log("name", name);
        console.log("options", options);

        if (!file.url && Array.isArray(file)) {
          const data = file;
          // file = { name: name + ".json" };
          // db.registerFileText(`${name}.json`, JSON.stringify(data));

          const table = arrow.tableFromJSON(data);
          const buffer = arrow.tableToIPC(table);

          const conn = await db.connect();
          await conn.insertArrowFromIPCStream(buffer, {
            name,
            schema: "main",
            ...options
          });
          await conn.close();
          return;
        } else {
          const url = await file.url();
          if (url.indexOf("blob:") === 0) {
            const buffer = await file.arrayBuffer();
            await db.registerFileBuffer(file.name, new Uint8Array(buffer));
          } else {
            await db.registerFileURL(file.name, url);
          }
        }

        const conn = await db.connect();
        if (file.name.endsWith(".csv")) {
          await conn.insertCSVFromPath(file.name, {
            name,
            schema: "main",
            ...options
          });
        } else if (file.name.endsWith(".json")) {
          await conn.insertJSONFromPath(file.name, {
            name,
            schema: "main",
            ...options
          });
        } else if (file.name.endsWith(".parquet")) {
          await conn.query(
            `CREATE VIEW '${name}' AS SELECT * FROM parquet_scan('${file.name}')`
          );
        } else {
          console.warn(`Don't know how to handle file type of ${file.name}`);
        }
        await conn.close();
      })
    );

    return new DuckDBClient(db);
  }
}
)}

function _getType(){return(
(type) => {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case "bigint":
    case "int8":
    case "long":
      return "bigint";

    case "double":
    case "float8":
    case "numeric":
    case "decimal":
    case "decimal(s, p)":
    case "real":
    case "float4":
    case "float":
    case "float32":
    case "float64":
      return "number";

    case "hugeint":
    case "integer":
    case "smallint":
    case "tinyint":
    case "ubigint":
    case "uinteger":
    case "usmallint":
    case "utinyint":
    case "smallint":
    case "tinyint":
    case "ubigint":
    case "uinteger":
    case "usmallint":
    case "utinyint":
    case "int4":
    case "int":
    case "signed":
    case "int2":
    case "short":
    case "int1":
    case "int64":
    case "int32":
      return "integer";

    case "boolean":
    case "bool":
    case "logical":
      return "boolean";

    case "date":
    case "interval": // date or time delta
    case "time":
    case "timestamp":
    case "timestamp with time zone":
    case "datetime":
    case "timestamptz":
      return "date";

    case "uuid":
    case "varchar":
    case "char":
    case "bpchar":
    case "text":
    case "string":
    case "utf8": // this type is unlisted in the `types`, but is returned by the db as `column_type`...
      return "string";
    default:
      return "other";
  }
}
)}

function _element(){return(
function element(name, props, children) {
  if (arguments.length === 2) children = props, props = undefined;
  const element = document.createElement(name);
  if (props !== undefined) for (const p in props) element[p] = props[p];
  if (children !== undefined) for (const c of children) element.appendChild(c);
  return element;
}
)}

function _text(){return(
function text(value) {
  return document.createTextNode(value);
}
)}

async function _16(db)
{
  const conn = await db.connect();
  const result = await conn.query(`	SELECT
			v::INTEGER AS x,
			(sin(v/50.0) * 100 + 100)::INTEGER AS y
			FROM generate_series(0, 100) AS t(v)`);
  await conn.close();
  return result;
}


function _17(md){return(
md`## Test the Observable Client`
)}

async function _client(DuckDBClient)
{
  const c = new DuckDBClient();
  await c.query(`CREATE TABLE dt(u STRING, x INTEGER, y FLOAT)`);
  await c.query(
    `INSERT INTO dt VALUES ('a', 1, 5), ('b', 2, 6), ('c', 3, 7), ('d', 4, 8);`
  );
  return c;
}


function _19(client){return(
client.table(`SELECT ? as a, ? as b`, ["2", "3"])
)}

function _a(){return(
1
)}

function _21(client,a){return(
client.sql`SELECT ${a}, 2`
)}

function _c(client){return(
client.connection()
)}

async function _r(c){return(
await c.send("select 1,2")
)}

function _24(r){return(
r.get(0)
)}

function _25(client){return(
client.queryRow(`SELECT 1`)
)}

function _26(a,__query,client,invalidation){return(
__query.sql(client,invalidation,"client")`SELECT ${a}, 2`
)}

function _27(__query,client,invalidation){return(
__query(client,{from:{table:{table:"dt"},mimeType:null},sort:[{column:"u",direction:"desc"}],slice:{to:null,from:null},filter:[],select:{columns:["u","x","y"]}},invalidation,"client")
)}

function _28(md){return(
md`## Test Query

Just to make sure that we can connect to the database. `
)}

async function _29(db,Inputs)
{
  const conn = await db.connect();
  const result = await conn.query(`SELECT 1 AS 'Result'
UNION SELECT 2
UNION SELECT 3`);
  await conn.close();
  return Inputs.table(result);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("packageName")).define("packageName", _packageName);
  main.variable(observer("duckdb")).define("duckdb", _duckdb);
  main.variable(observer("arrow")).define("arrow", ["require"], _arrow);
  main.variable(observer("libraryVersion")).define("libraryVersion", ["duckdb"], _libraryVersion);
  main.variable(observer("bundles")).define("bundles", ["duckdb"], _bundles);
  main.variable(observer("bundle")).define("bundle", ["duckdb","bundles"], _bundle);
  main.variable(observer("makeDB")).define("makeDB", ["duckdb","bundle"], _makeDB);
  main.variable(observer("db")).define("db", ["makeDB"], _db);
  main.variable(observer()).define(["db"], _11);
  main.variable(observer("DuckDBClient")).define("DuckDBClient", ["getType","makeDB","Inputs","element","text","arrow"], _DuckDBClient);
  main.variable(observer("getType")).define("getType", _getType);
  main.variable(observer("element")).define("element", _element);
  main.variable(observer("text")).define("text", _text);
  main.variable(observer()).define(["db"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("client")).define("client", ["DuckDBClient"], _client);
  main.variable(observer()).define(["client"], _19);
  main.variable(observer("a")).define("a", _a);
  main.variable(observer()).define(["client","a"], _21);
  main.variable(observer("c")).define("c", ["client"], _c);
  main.variable(observer("r")).define("r", ["c"], _r);
  main.variable(observer()).define(["r"], _24);
  main.variable(observer()).define(["client"], _25);
  main.variable(observer()).define(["a","__query","client","invalidation"], _26);
  main.variable(observer()).define(["__query","client","invalidation"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["db","Inputs"], _29);
  return main;
}
