function _1(md){return(
md`# Exporting Your DuckDB Databases

This notebook implements helpers to export, download and reimport a DuckDB database as CSV or Parquet.

~~~js
import {exportDuckDB, importDuckDB} from "@mootari/export-duckdb"
~~~

**Export options:**

~~~js
exportDuckDB(db, {
  // Export format. Valid options are "csv" and "parquet".
  format = "csv",
  // Whether to include load.sql and schema.sql - required for reimport.
  includeSchema = true,
  // Custom filter function, overrides includeSchema if provided.
  filter = (filename) => true,
  // Filename of the archive (without ".zip")
  filename = "export",
  // Whether a download should be triggered automatically.
  // Note that downloads must be initiated by an interaction (e.g. a click).
  download = false,
  // Custom CSV options.
  csvOptions = {},
  // Custom Parquet options.
  parquetOptions = { compression: "gzip" }  
})
~~~

**Import options:**
~~~js
importDuckDB(attachmentOrFile, {
  // DuckDBClient to import into. Will create a new one if not provided.
  client,
  // Directory path in archive.
  path
})
~~~
`
)}

function _2(md){return(
md`---
## Examples`
)}

function _3(md){return(
md`
### Basic usage`
)}

function _db(DuckDBClient,aapl,penguins,weather){return(
DuckDBClient.of({ aapl, penguins, weather })
)}

function _5(exportDuckDB,db,htl){return(
htl.html`<button onclick=${() => exportDuckDB(db, {download: true})}>Download`
)}

function _6(Inputs,exportDuckDB,db){return(
Inputs.button("Download", {reduce: () => exportDuckDB(db, {download: true})})
)}

function _7(md){return(
md`---
### Interactive customization`
)}

function _options(Inputs)
{
  // See also https://duckdb.org/docs/sql/statements/copy#csv-options  
  const csvOptions = Inputs.form({
    quote: Inputs.text({maxlength: 8, value: '"', label: "quote"}),
    delim: Inputs.text({maxlength: 8, value: ',', label: "delimiter"}),
    header: Inputs.toggle({label: "header"}),
  });
  csvOptions.querySelectorAll("label").forEach(n => n.style.cssText += "text-indent:16px");
  csvOptions.querySelectorAll("input[type=text]").forEach(n => n.style.cssText += `width:${n.maxLength}ch`);
  
  const form = Inputs.form({
    format: Inputs.radio(["csv", "parquet"], {label: "Export format", value: "csv"}),
    csvOptions,
    filename: Inputs.text({label: "File name", value: "export", submit: true}),
    //dirname: Inputs.text({label: "Directory name", value: "", submit: true}),
    includeSchema: Inputs.toggle({label: "Include schema", value: true}),
  });
  form.addEventListener("input", () => {
    csvOptions.style.display = form.value.format === "csv" ? null : "none";
  });
  return form;
}


async function _includeFiles(Inputs,htl,formatSize,exportDatabase,db,options){return(
(choices => Inputs.checkbox(choices, {
  label: "Include files",
  format: d => htl.html`<span>${d[0]} <span style="opacity:.5">(${formatSize(d[1].length)})`,
  value: choices,
}))(
  Object.entries(await exportDatabase(db, options))
    // Sort by extension
    .sort(([a], [b]) => a.split(".").at(-1).localeCompare(b.split(".").at(-1)))
)
)}

function _interactiveDownload(htl,toZip,includeFiles,options,download){return(
htl.html`<button ${{async onclick() {
  const archive = await toZip(Object.fromEntries(includeFiles), options.filename);
  download(archive);
}}}>Download ${options.filename}.zip`
)}

function _11(htl,includeFiles){return(
htl.html`<div>${
  includeFiles
    .filter(d => d[0].endsWith(".csv"))
    .map(([name, buffer]) => htl.html`<div style="margin-bottom:8px; font: bold 13px/2 var(--sans-serif)">
      ${name}<br>
      <textarea readonly rows=5 style="display:block; width:100%; resize:vertical">${new TextDecoder().decode(buffer)}
    `)
}`
)}

function _12(md){return(
md`---
### Reimporting a database`
)}

function _archive(Inputs){return(
Inputs.file({label: "Exported archive"})
)}

function _importedDB(importDuckDB,archive,FileAttachment){return(
importDuckDB(archive ?? FileAttachment("export.zip"))
)}

async function _15(importedDB,Inputs)
{
  const db = importedDB;
  const tables = await db.describeTables();
  const entries = await Promise.all(tables.map(({name}) => db
    .query(`select count(*) c from ${db.escape(name)}`)
    .then(r => ({"Table name": name, Rows: r[0].c}))
  ));
  const form = Inputs.table(entries);
  form.querySelector("table").style.width = "auto";
  return form;
}


function _16(md){return(
md`---
## Appendix`
)}

function _17(md){return(
md`### Archive handling`
)}

function _fflate(require){return(
require("fflate@0.8.0")
)}

function _promisify(){return(
fn => new Promise((resolve, reject) => fn((err, data) => err ? reject(err) : resolve(data)))
)}

function _toBuffer(){return(
file => file.arrayBuffer().then(buf => new Uint8Array(buf))
)}

function _toZip(promisify,fflate){return(
async function toZip(files, name = "export") {
  const archive = await promisify(done => fflate.zip(files, done));
  const blob = new Blob([archive], {type: "application/zip"});
  return new File([blob], `${name}.zip`);
}
)}

function _fromZip(toBuffer,promisify,fflate){return(
async function fromZip(archive) {
  const buffer = await toBuffer(archive);
  return promisify(done => fflate.unzip(buffer, done));
}
)}

function _23(md){return(
md`### Export / download`
)}

function _exportDuckDB(exportDatabase,toZip,download){return(
async function exportDuckDB(client, {
  filename = "export",
  download: triggerDownload = false,
  ...options
} = {}) {
  const files = await exportDatabase(client, options);
  const file = await toZip(files, filename);
  if(triggerDownload) download(file);
  return file;
}
)}

function _exportDatabase(excludeSchema){return(
async function exportDatabase(client, {
  format = "csv",
  includeSchema = true,
  filter = includeSchema ? () => true : excludeSchema,
  dirname = "",
  csvOptions = {},
  parquetOptions = { compression: "gzip" },
} = {}) {
  const toFormatString = o => Object.entries(o).map(([k, v]) => `, ${k} ${typeof v === "string" ? `'${v}'` : v}`).join("");
  
  const db = client._db;
  // https://duckdb.org/docs/sql/statements/copy
  const options = toFormatString(format === "parquet" ? parquetOptions : csvOptions);
  // https://duckdb.org/docs/sql/statements/export
  await client.query(`EXPORT DATABASE '${dirname}' (FORMAT ${format}${options})`);
  const files = {};
  
  for(const f of await db.globFiles(`${dirname}/*`)) {
    const name = f.fileName.split("/").at(-1);
    if(filter(name)) files[f.fileName] = await db.copyFileToBuffer(f.fileName);
    db.dropFile(f.fileName);
  }

  return files;  
}
)}

function _excludeSchema(){return(
name => !name.endsWith(".sql")
)}

function _download(){return(
function download(file) {
  const a = document.createElement("a");
  a.download = file.name;
  a.href = URL.createObjectURL(file);
  a.click();
  URL.revokeObjectURL(a.href);
}
)}

function _28(md){return(
md`### Import`
)}

function _importDuckDB(DuckDBClient,DOM,fromZip,importDatabase){return(
async function importDuckDB(archive, {client, path} = {}) {
  if(!client) client = await DuckDBClient.of();
  
  const tmp = DOM.uid("tmp").id;
  let files = await fromZip(archive);
  if(path != null) files = Object.fromEntries(
    Object.entries(files).filter(d => d[0].startsWith(path))
  );
  await importDatabase(client, files);
  return client;
}
)}

function _importDatabase(DOM,dirname){return(
async function importDatabase(client, files, {
  tempdir = DOM.uid("tmp").id
} = {}) {
  const entries = Object.entries(files)
    .map(([path, buffer]) => [`${tempdir}/${path.replace(/^\//, "")}`, buffer]);
  const load = entries.find(d => d[0].endsWith("/load.sql"));
  if(!load) throw new Error("load.sql not found");
  if(!entries.find(d => d[0].endsWith("/schema.sql"))) throw new Error("schema.sql not found");
  const dir = dirname(load[0]);
  
  const db = client._db;
  for(const [path, buf] of entries) {
    await db.registerFileBuffer(path, buf.slice());
  }
  const conn = await db.connect();
  await conn.query(`IMPORT DATABASE '${dir}'`);
  await conn.close();
  for(const [path] of entries) await db.dropFile(path);
}
)}

function _dirname(){return(
d => d.slice(0, Math.max(0, d.lastIndexOf("/")))
)}

function _32(md){return(
md`### Demo utils`
)}

function _formatSize(){return(
size => {
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log2(size) / 10));
  let s = (size / (1024 ** i)).toFixed(1).replace(/\.?0+$/, "");
  return `${s} ${units[i]}`;
}
)}

function _34(md){return(
md`---

<span style="font:500 14px var(--sans-serif)">Thumbnail image by [manfredrichter](https://pixabay.com/photos/duck-meet-ducks-rubber-ducks-4127701/)`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["export.zip", {url: new URL("./files/6fc6ca06246a6f5661801314c33476a68b49d30b12614f9e7496917dbf9287bc68f169f450d4805c3670ca3ecaba44f16e916c444a460fb5e6206e60abfd16e2.zip", import.meta.url), mimeType: "application/zip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("db")).define("db", ["DuckDBClient","aapl","penguins","weather"], _db);
  main.variable(observer()).define(["exportDuckDB","db","htl"], _5);
  main.variable(observer()).define(["Inputs","exportDuckDB","db"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof options")).define("viewof options", ["Inputs"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("viewof includeFiles")).define("viewof includeFiles", ["Inputs","htl","formatSize","exportDatabase","db","options"], _includeFiles);
  main.variable(observer("includeFiles")).define("includeFiles", ["Generators", "viewof includeFiles"], (G, _) => G.input(_));
  main.variable(observer("viewof interactiveDownload")).define("viewof interactiveDownload", ["htl","toZip","includeFiles","options","download"], _interactiveDownload);
  main.variable(observer("interactiveDownload")).define("interactiveDownload", ["Generators", "viewof interactiveDownload"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl","includeFiles"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof archive")).define("viewof archive", ["Inputs"], _archive);
  main.variable(observer("archive")).define("archive", ["Generators", "viewof archive"], (G, _) => G.input(_));
  main.variable(observer("importedDB")).define("importedDB", ["importDuckDB","archive","FileAttachment"], _importedDB);
  main.variable(observer()).define(["importedDB","Inputs"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("fflate")).define("fflate", ["require"], _fflate);
  main.variable(observer("promisify")).define("promisify", _promisify);
  main.variable(observer("toBuffer")).define("toBuffer", _toBuffer);
  main.variable(observer("toZip")).define("toZip", ["promisify","fflate"], _toZip);
  main.variable(observer("fromZip")).define("fromZip", ["toBuffer","promisify","fflate"], _fromZip);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("exportDuckDB")).define("exportDuckDB", ["exportDatabase","toZip","download"], _exportDuckDB);
  main.variable(observer("exportDatabase")).define("exportDatabase", ["excludeSchema"], _exportDatabase);
  main.variable(observer("excludeSchema")).define("excludeSchema", _excludeSchema);
  main.variable(observer("download")).define("download", _download);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("importDuckDB")).define("importDuckDB", ["DuckDBClient","DOM","fromZip","importDatabase"], _importDuckDB);
  main.variable(observer("importDatabase")).define("importDatabase", ["DOM","dirname"], _importDatabase);
  main.variable(observer("dirname")).define("dirname", _dirname);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("formatSize")).define("formatSize", _formatSize);
  main.variable(observer()).define(["md"], _34);
  return main;
}
