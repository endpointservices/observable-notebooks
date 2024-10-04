import define1 from "./17c8ce433e1df58e@3253.js";
import define2 from "./161b65299d9741a3@951.js";

function _1(md){return(
md`# Observable Notebook Compressed RAG Index + Vector Search

Using embeddings of notebook cells so we can do semantic similarity search on the cell level. This notebook has a toy vector search engine using a pre-prepared index, but the main point is that it builds the index.

The uncompressed index is 14Mb for 2600 cells. Using PCA we achieve 3.7Mb including cell source code, vectors, and the PCA projection. matrix.

Used to generate Roboco-op's [RAG index](https://observablehq.com/@tomlarkworthy/rag-extension?collection=@tomlarkworthy/robocoop)`
)}

function _2(md){return(
md`### Vector search`
)}

function _query(Inputs){return(
Inputs.text({
  value: "plot the top 3 athletes",
  width: "100%",
  label: "query",
  submit: true
})
)}

function _4(md,matches,extractHexcode){return(
md`${matches.map(
  (row) => md`
<details>
<summary>
<a href="https://observablehq.com/d/${extractHexcode(
    row.cell_path
  )}" target="_blank">
https://observablehq.com/d/${extractHexcode(row.cell_path)}
</a>
</summary>
${md`~~~js
${row.code}
~~~`}
</details>`
)}`
)}

function _extractHexcode(){return(
{
  prompt:
    "extract the last segment hexcode before the @ in `@tomlarkworthy/adapting-dataviz/32eeadb67cb4cbcb@1472.js`",
  time: 1727977760396
} &&
  function extractHexcode(filename) {
    const match = filename.match(/\/([^/@]+)@/);
    return match ? match[1] : null;
  }
)}

function _matches(vector_search,query){return(
vector_search(query, { n: 10 })
)}

function _get_code(embedding_db){return(
async ({ cell_id, cell_path }) => {
  const result = await embedding_db.query(
    `SELECT code FROM cells WHERE id = ? AND notebook_path = ?`,
    [cell_id, cell_path]
  );
  return result.length > 0
    ? {
        cell_id,
        cell_path,
        code: result[0].code
      }
    : null;
}
)}

function _vector_search(get_vector_embedding,embedding_to_pca,means,proj,embedding_db,get_code){return(
{
  prompt:
    "similarity search needs to return the cell_id, cell_path of the top matches",
  time: 1727050000000
} &&
  async function vector_search(query, options = {}) {
    const n = options.n || 5;
    const embedding_full = await get_vector_embedding(query);
    const embedding = embedding_to_pca(embedding_full, means, proj);
    const rows = await embedding_db.query(
      `SELECT cell_id, cell_path, pca FROM compressed_embeddings`
    );

    function cosine_similarity(a, b) {
      const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
      const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
      const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
      return dot / (normA * normB);
    }

    const similarities = rows.map((row) => {
      const sim = cosine_similarity(embedding, [...row.pca]);
      return {
        cell_id: row.cell_id,
        cell_path: row.cell_path,
        similarity: sim
      };
    });
    similarities.sort((a, b) => b.similarity - a.similarity);
    // Return only cell_id and cell_path
    return Promise.all(similarities.slice(0, n).map(get_code));
  }
)}

function _embedding_db(Inputs){return(
Inputs.input()
)}

function _embedding_file(Inputs){return(
Inputs.file({
  label: "Upload embedding file",
  accept: ".zip",
  required: true
})
)}

async function _11($0,importDuckDB,embedding_file,Event)
{
  $0.value = await importDuckDB(embedding_file);
  $0.dispatchEvent(new Event("input"));
}


async function _db(DuckDBClient)
{
  const db = await DuckDBClient.of({});
  db.query("SET memory_limit = '10GB';");
  return db;
}


function _13(md){return(
md`### Retreve indexes from S3`
)}

async function _load_compressed_embeddings($0,importDuckDB,Event)
{
  const embedding_file = await fetch(
    "https://tomlarkworthy-access-aws.s3.eu-central-1.amazonaws.com/datasets/compressed.zip"
  );
  $0.value = await importDuckDB(embedding_file);
  $0.dispatchEvent(new Event("input"));
  return $0.value;
}


async function _load_pca_proj(){return(
(
  await fetch(
    "https://tomlarkworthy-access-aws.s3.eu-central-1.amazonaws.com/datasets/pca_projection.json"
  )
).json()
)}

function _load_indexes(load_compressed_embeddings,load_pca_proj)
{
  load_compressed_embeddings;
  load_pca_proj;
  return "Loaded";
}


function _17(md){return(
md`# Indexing

To build the index we fetch notebook exports and run them through OpenAI's vector embeddings. Due to RAM constraints of the browser, this had to be done in steps with a fresh DB each step.`
)}

function _18(md){return(
md`## Step 1: Build Corpus`
)}

function _file(Inputs){return(
Inputs.file({
  label: "Upload content file",
  accept: ".zip",
  required: true
})
)}

function _20(importDuckDB,file,db,$0,Event)
{
  const kb = importDuckDB(file, { client: db });
  $0.value = kb;
  $0.dispatchEvent(new Event("input"));
  return kb;
}


function _21(md){return(
md`## Import from notebook Backups: [endpointservices/observable-notebooks](https://github.com/endpointservices/observable-notebooks)`
)}

function _fetchFromGithub(Inputs){return(
Inputs.button("import from Github", {
  required: true
})
)}

async function _sources(fetchFromGithub)
{
  ({
    prompt:
      'list all files in "https://github.com/endpointservices/observable-notebooks"',
    time: 1726857989123
  });
  fetchFromGithub; // Only if asked
  const owner = "endpointservices";
  const repo = "observable-notebooks";
  const branch = "main";

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
  );
  const data = await response.json();
  const files = data.tree
    .filter((item) => item.type === "blob")
    .map((item) => item.path)
    .filter((item) => item.endsWith(".js"));
  return files;
}


function _latestSources(sources)
{
  ({
    prompt: "reduce the source list to just the latest version of a given file",
    time: 1726858685611
  });
  const fileMap = {};

  sources.forEach((path) => {
    // Example path: "@endpointservices/auth/027541187c96745d@147.js"
    const parts = path.split("/");
    const fileNameWithVersion = parts[parts.length - 1];
    const match = fileNameWithVersion.match(/^(.*)@(\d+)\.js$/);

    if (match) {
      const baseName = match[1] + ".js";
      const version = parseInt(match[2], 10);

      if (!fileMap[baseName] || version > fileMap[baseName].version) {
        fileMap[baseName] = { path, version };
      }
    }
  });

  return Object.values(fileMap).map((entry) => entry.path);
}


function _extendedSources(latestSources)
{
  ({
    prompt:
      "we have the latest versions of some files, but we are missing the module indexes like `@endpointservices/cellstore/index.js` we should also bring them into RAG",
    time: 1726859116211
  });

  const moduleSet = new Set();

  // Extract unique module paths from latestSources
  latestSources.forEach((path) => {
    const parts = path.split("/");
    if (parts.length >= 2) {
      const modulePath = parts.slice(0, 2).join("/");
      moduleSet.add(`${modulePath}/index.js`);
    }
  });

  // Combine latestSources with the module index files
  const extendedSources = Array.from(new Set([...latestSources, ...moduleSet]));

  return extendedSources;
}


function _26(highlight,latestSources){return(
highlight(latestSources)
)}

async function _importSources(db,latestSources)
{
  ({
    prompt: "create a duckdb database to index our files ",
    time: 1726859446011
  });
  await db.query(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      content TEXT
    )
  `);

  return await Promise.all(
    latestSources.map(async (path) => {
      const response = await fetch(
        `https://raw.githubusercontent.com/endpointservices/observable-notebooks/main/${path}`
      );
      const content = await response.text();
      await db.query(
        `INSERT INTO files (path, content) VALUES (?, ?) ON CONFLICT(path) DO UPDATE SET content=excluded.content`,
        [path, content]
      );
    })
  );
}


function _28(md){return(
md`## Export corpus from file`
)}

function _29(exportDuckDB,kb,htl){return(
htl.html`<button onclick=${() => {
  debugger;
  exportDuckDB(kb, {
  format: "parquet",
  filename: "corpus",
  download: true
})}}>Export corpus file`
)}

function _30(md){return(
md`## Step 2: Extract Notebook Cells`
)}

function _kb(Inputs,db){return(
Inputs.input(db)
)}

function _acorn(){return(
{ prompt: "import acorn", time: 1726903673948 } &&
  import("https://esm.sh/acorn@8.12.0")
)}

async function _parsedContent(kb,acorn)
{
  const filedata = await kb.query(`SELECT content, path FROM files LIMIT 100;`);
  await kb.query(`DROP TABLE files;`); // clear memory
  return filedata.map(({ content, path }) => ({
    parsed: acorn.parse(content, { ecmaVersion: 2022, sourceType: "module" }),
    content,
    path
  }));
}


function _processedContent(parsedContent){return(
{
  prompt:
    "For each element of parsedContent, add a list of top level function declarations, and slice the content to product a string under a key cells.",
  time: 1726905252540
} &&
  parsedContent.map((item) => ({
    cells: item.parsed.body
      .filter((node) => node.type === "FunctionDeclaration")
      .map((fn, i) => ({
        id: i,
        name: fn.id.name,
        code: item.content.slice(fn.start, fn.end),
        fn
      })),
    export: item.parsed.body
      .filter((node) => node.type === "ExportDefaultDeclaration")
      .map((fn, i) => ({
        code: item.content.slice(fn.start, fn.end),
        fn
      }))[0],

    ...item
  }))
)}

function _35(highlight,processedContent){return(
highlight(processedContent[0].cells[0].code)
)}

function _extract_definitions(){return(
{
  prompt:
    'extract_definitions is not quite right. the define function variable number of args. The last arg is the definition,  and the 2nd to last is the dependancies andsometimes a name is defined. Can you rewrite that, lets extract the dependancie string names as well. Rewrite extract_definitions, the matching logic is correct\n\n\n```\nfunction variable_define(name, inputs, definition) {\n  switch (arguments.length) {\n    case 1: {\n      definition = name, name = inputs = null;\n      break;\n    }\n    case 2: {\n      definition = inputs;\n      if (typeof name === "string") inputs = null;\n      else inputs = name, name = null;\n      break;\n    }\n  }\n  return variable_defineImpl.call(this,\n    name == null ? null : String(name),\n    inputs == null ? [] : map.call(inputs, this._resolve, this),\n    typeof definition === "function" ? definition : constant(definition)\n  );\n}\n```',
  time: 1726922431995
} &&
  function extract_definitions(notebook) {
    const definitions = {};

    function traverse(node) {
      if (
        node.type === "CallExpression" &&
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "define"
      ) {
        const args = node.arguments;
        let name = null;
        let dependencies = [];
        let definition = null;

        if (args.length === 1) {
          // define(definition)
          definition = args[0];
        } else if (args.length === 2) {
          if (args[0].type === "ArrayExpression") {
            // define(dependencies, definition)
            dependencies = args[0].elements
              .filter(
                (el) => el.type === "Literal" && typeof el.value === "string"
              )
              .map((el) => el.value);
            definition = args[1];
          } else if (
            args[0].type === "Literal" &&
            typeof args[0].value === "string"
          ) {
            // define(name, definition)
            name = args[0].value;
            definition = args[1];
          }
        } else if (args.length >= 3) {
          // define(name, dependencies, definition)
          if (args[0].type === "Literal" && typeof args[0].value === "string") {
            name = args[0].value;
          }
          if (args[1].type === "ArrayExpression") {
            dependencies = args[1].elements
              .filter(
                (el) => el.type === "Literal" && typeof el.value === "string"
              )
              .map((el) => el.value);
          }
          definition = args[args.length - 1];
        }

        if (definition) {
          if (definition.type == "Identifier") {
            definition = definition.name;
          }
          definitions[definition] = {
            name: name,
            dependencies: dependencies,
            definition: definition
          };
        }
      }

      for (const key in node) {
        const child = node[key];
        if (Array.isArray(child)) {
          child.forEach(traverse);
        } else if (typeof child === "object" && child !== null) {
          traverse(child);
        }
      }
    }

    traverse(notebook.export.fn);
    return definitions;
  }
)}

function _37(highlight,extract_definitions,processedContent){return(
highlight(extract_definitions(processedContent[1]))
)}

function _linkedContent(processedContent,extract_definitions){return(
processedContent.map((content) => {
  const definitions = extract_definitions(content);
  content.cells.forEach((cell) => {
    if (definitions[cell.name]) {
      cell.cell_name = definitions[cell.name].name;
      cell.dependencies = definitions[cell.name].dependencies;
    }
  });
  return {
    definitions,
    ...content
  };
})
)}

function _39(highlight,linkedContent){return(
highlight(linkedContent[3])
)}

async function _create_tables(DuckDBClient)
{
  ({
    prompt:
      "Now insert into the database a tables called notebooks, and cells which contain the all the information in cells. \n\nNotebooks should contain the path (thats their primary key)\n\nCells should contain a reference to their notebook (foreign key), their id, their cell_name, their code.\n\nCross dependancies between cells should be in a separate table called deps",
    time: 1726936221270
  });
  const kb = await DuckDBClient.of({});
  kb.query("SET memory_limit = '14GB';");
  kb.query(`
  CREATE TABLE IF NOT EXISTS notebooks (
    path TEXT PRIMARY KEY
  );`);

  kb.query(`CREATE TABLE IF NOT EXISTS cells (
    id INTEGER,
    cell_name TEXT,
    code TEXT,
    notebook_path TEXT,
    FOREIGN KEY (notebook_path) REFERENCES notebooks(path),
    PRIMARY KEY (id, notebook_path)
  );`);

  kb.query(`CREATE TABLE IF NOT EXISTS deps (
    cell_id INTEGER,
    cell_path TEXT, 
    depends_on TEXT,
    PRIMARY KEY (cell_id, cell_path, depends_on),
    FOREIGN KEY (cell_id, cell_path) REFERENCES cells(id, notebook_path)
  );`);
  return kb;
}


function _insertLinks(linkedContent,create_tables){return(
{
  prompt: "Now insert the data from linkedContent",
  time: 1726936427272
} &&
  Promise.all(
    linkedContent.map(async (notebook) => {
      create_tables;
      await create_tables.query(
        `INSERT INTO notebooks (path) VALUES (?) ON CONFLICT(path) DO NOTHING`,
        [notebook.path]
      );
      await Promise.all(
        notebook.cells.map(async (cell) => {
          await create_tables.query(
            `INSERT INTO cells (id, cell_name, code, notebook_path) VALUES (?, ?, ?, ?) ON CONFLICT(id, notebook_path) DO UPDATE SET cell_name = excluded.cell_name, code = excluded.code`,
            [cell.id, cell.cell_name, cell.code, notebook.path]
          );
          if (cell.dependencies && cell.dependencies.length > 0) {
            cell.dependencies.map(async (dep) => {
              return await create_tables.query(
                `INSERT INTO deps (cell_id, cell_path, depends_on) VALUES (?, ?, ?) ON CONFLICT(cell_id, cell_path, depends_on) DO NOTHING`,
                [cell.id, notebook.path, dep]
              );
            });
          }
        })
      );
    })
  )
)}

function _42(insertLinks,$0,create_tables,Event)
{
  insertLinks;
  $0.value = create_tables;
  $0.dispatchEvent(new Event("input"));
}


function _43(__query,populated_kb,invalidation){return(
__query.sql(populated_kb,invalidation,"populated_kb")`SELECT * FROM cells`
)}

function _44(highlight,linkedContent){return(
highlight({
  ...linkedContent[4].cells[1],
  fn: undefined
})
)}

function _45(exportDuckDB,populated_kb,htl){return(
htl.html`<button onclick=${() => {
  debugger;
  exportDuckDB(populated_kb, {
  format: "parquet",
  filename: "cells",
  download: true,
  dirname:`/export-${Math.random().toString(36).substring(2)}`
})}}>Export cells file`
)}

function _populated_kb(Inputs){return(
new Inputs.input(undefined)
)}

function _47(md){return(
md`### Step 3: Index Cells with Vectors`
)}

function _cell_file(Inputs){return(
Inputs.file({
  label: "Upload cell file",
  accept: ".zip",
  required: true
})
)}

function _cell_kb(importDuckDB,cell_file){return(
importDuckDB(cell_file)
)}

function _get_vector_embedding(OPENAI_API_KEY){return(
{
  prompt:
    "create a function call get vector embedding that will call OpenAI and retreive the vector embedding for a peice of text",
  time: 1727006386551
} &&
  async function get_vector_embedding(text) {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        input: text,
        model: "text-embedding-3-small"
      })
    });
    if (!response.ok) {
      throw new Error(`Error fetching embedding: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data[0].embedding;
  }
)}

async function _create_embeddings_table(cell_kb){return(
{
  prompt:
    'create an embeddings table with column "text-embedding-3-small" that is a  vec FLOAT[1536]  and has a foreign key to cells',
  time: 1727006849001
} &&
  (await cell_kb.query(`
  CREATE TABLE IF NOT EXISTS cell_embeddings (
    cell_id INTEGER,
    cell_path TEXT,
    "text-embedding-3-small" FLOAT[1536],
    PRIMARY KEY (cell_id, cell_path),
    FOREIGN KEY (cell_id, cell_path) REFERENCES cells(id, notebook_path)
  );
`))
)}

async function _cellsWithoutEmbedding(create_embeddings_table,cell_kb)
{
  create_embeddings_table;
  return await cell_kb.query(`
    SELECT c.id, c.cell_name, c.code, c.notebook_path
    FROM cells c
    LEFT JOIN cell_embeddings ce
      ON c.id = ce.cell_id AND c.notebook_path = ce.cell_path
    WHERE ce."text-embedding-3-small" IS NULL
  `);
}


async function _insert_embeddings(cellsWithoutEmbedding,get_vector_embedding,cell_kb)
{
  ({
    prompt:
      'Now insert an embedding for every cell that does not already have an embedding based on its "code"',
    time: 1727007112473
  });

  for (const cell of cellsWithoutEmbedding) {
    const embedding = await get_vector_embedding(cell.code);
    await cell_kb.query(`
      INSERT INTO cell_embeddings (cell_id, cell_path, "text-embedding-3-small")
      VALUES (${cell.id}, '${cell.notebook_path}', [${embedding}])`);
  }
}


function _54(exportDuckDB,embedding_db,htl){return(
htl.html`<button onclick=${() => {
  exportDuckDB(embedding_db, {
  format: "parquet",
  filename: "embeddings",
  parquetOptions: { COMPRESSION: "gzip"} ,
  download: true,
})}}>Export embeddings file`
)}

function _55(__query,embedding_db,invalidation){return(
__query.sql(embedding_db,invalidation,"embedding_db")`SELECT * FROM cells`
)}

function _56(md){return(
md`### PCA Vector compression

We can save space by using PCA to reduce our vectors
`
)}

function _57(Inputs,$0,importDuckDB,Event){return(
Inputs.button("load raw embeddings from s3", {
  reduce: async () => {
    const embedding_file = await fetch(
      "https://tomlarkworthy-access-aws.s3.eu-central-1.amazonaws.com/datasets/embeddings.zip"
    );
    $0.value = await importDuckDB(embedding_file);
    $0.dispatchEvent(new Event("input"));
    return $0.value;
  }
})
)}

function _compress(Inputs){return(
Inputs.toggle({ value: false, label: "compress (slow)" })
)}

async function _PCA(require){return(
(await require("https://bundle.run/ml-pca@4.0.2")).PCA
)}

function _embeddings(embedding_db){return(
embedding_db.query(`SELECT * FROM cell_embeddings`)
)}

function _vectors(compress,embeddings){return(
compress &&
  (embeddings)
    .map((d) => d["text-embedding-3-small"])
    .map((r) => [...r])
)}

function _pca(compress,PCA,vectors)
{
  if (!compress) return;
  return new PCA(vectors, { center: true });
}


function _variance(pca){return(
pca
  ? pca.getExplainedVariance().map((v, i) => ({ v, i }))
  : undefined
)}

function _cutoff(Inputs,variance){return(
Inputs.range([1, variance?.length], { value: 200, step: 1 })
)}

function _65(Plot,variance,cutoff){return(
Plot.plot({
  title: "PCA explained variance",
  marks: [
    Plot.lineY(variance, { x: "i", y: "v", tip: true }),
    Plot.ruleX([cutoff], { stroke: "red" }),
    Plot.ruleY([0], { stroke: "black" }),
    Plot.text([{}], {
      x: (d) => cutoff + 40,
      y: (d) => 0.01,
      text: (d) => "cutoff"
    })
  ]
})
)}

function _means(pca,base64ToFloat32,load_pca_proj){return(
pca ? new Float32Array(pca.means) : base64ToFloat32(load_pca_proj.means)
)}

function _embedding_to_pca(cutoff){return(
{
  prompt:
    "write a JS native way for embedding_to_pca(vector, components, means, scale, matrix). The libraries implementation is \n\n\n```\npublic predict(dataset: MaybeMatrix, options: PredictOptions = {}): Matrix {\n    const { nComponents = (this.U as Matrix).columns } = options;\n    let datasetmatrix;\n    if (Array.isArray(dataset)) {\n      datasetmatrix = new Matrix(dataset);\n    } else {\n      datasetmatrix = new Matrix(dataset);\n    }\n    if (this.center) {\n      datasetmatrix.subRowVector(this.means as number[]);\n      if (this.scale) {\n        for (let i of this.excludedFeatures) {\n          datasetmatrix.removeColumn(i);\n        }\n        datasetmatrix.divRowVector(this.stdevs as number[]);\n      }\n    }\n    let predictions = datasetmatrix.mmul(this.U as Matrix);\n    return predictions.subMatrix(0, predictions.rows - 1, 0, nComponents - 1);\n  }\n```\n",
  time: 1727980602225
} &&
  function embedding_to_pca(vector, means, components) {
    // Center the vector by subtracting the means
    let n = components.length / means.length;
    let centered = vector.map((val, i) => val - means[i]);
    // Perform matrix multiplication: centered vector * components matrix
    // Assuming components is an array of arrays (each sub-array is a component)
    const projection = Array.from({ length: cutoff }).map((_, i) => {
      let sum = 0;
      for (let j = 0; j < means.length; j++) {
        sum += components[j * n + i] * centered[j];
      }
      return sum;
    });
    return projection;
  }
)}

function _proj(pca,cutoff,base64ToFloat32,load_pca_proj){return(
pca
  ? new Float32Array(pca.U.data.map((row) => [...row.slice(0, cutoff)]).flat())
  : base64ToFloat32(load_pca_proj.proj)
)}

function _create_compressed_table(embedding_db,cutoff){return(
Promise.all([
  embedding_db.query(`
  CREATE TABLE IF NOT EXISTS compressed_embeddings (
    cell_id INTEGER,
    cell_path TEXT,
    "pca" FLOAT[${cutoff}],
    PRIMARY KEY (cell_id, cell_path),
    FOREIGN KEY (cell_id, cell_path) REFERENCES cells(id, notebook_path)
  );
`)
])
)}

function _insert_compressed_embeddings(create_compressed_table,embeddings,embedding_db,embedding_to_pca,means,proj)
{
  ({
    prompt:
      'Now insert an embedding for every cell that does not already have an embedding based on its "code"',
    time: 1727007112473
  });
  create_compressed_table;
  return Promise.all([
    ...embeddings.map((cell, i) =>
      embedding_db.query(`
      INSERT INTO compressed_embeddings (cell_id, cell_path, pca)
      VALUES (${cell.cell_id}, '${cell.cell_path}', [${embedding_to_pca(
        [...cell["text-embedding-3-small"]],
        means,
        proj
      )}])`)
    )
  ]);
}


function _71(__query,embedding_db,invalidation){return(
__query(embedding_db,{from:{table:{table:"compressed_embeddings"}},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"embedding_db")
)}

function _float32ArrayToBase64(){return(
{
  prompt: "write function to convert float32Array to base64 encoded string",
  time: 1727985306835
} &&
  function float32ArrayToBase64(floatArray) {
    let binary = "";
    const bytes = new Uint8Array(floatArray.buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }
)}

function _base64ToFloat32(){return(
{ prompt: "write Base64ToFloat32", time: 1727989536927 } &&
  function Base64ToFloat32(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Float32Array(bytes.buffer);
  }
)}

function _pca_projection(float32ArrayToBase64,proj,means){return(
{
  proj: float32ArrayToBase64(proj),
  means: float32ArrayToBase64(means)
}
)}

function _75(exportDuckDB,embedding_db,htl){return(
htl.html`<button onclick=${() => {
  exportDuckDB(embedding_db, {
  filter: (filename) => filename !== 'cell_embeddings.parquet',
  format: "parquet",
  filename: "compressed",
  parquetOptions: { COMPRESSION: "gzip"} ,
  download: true,
})}}>Export compressed file`
)}

function _76($0){return(
$0
)}

function _77(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _78($0){return(
$0
)}

function _79(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _80($0){return(
$0
)}

function _81(md){return(
md`### AI Settings`
)}

function _82($0){return(
$0
)}

function _83($0){return(
$0
)}

function _84($0){return(
$0
)}

function _85(md){return(
md`---`
)}

function _87(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof query")).define("viewof query", ["Inputs"], _query);
  main.variable(observer("query")).define("query", ["Generators", "viewof query"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","matches","extractHexcode"], _4);
  main.variable(observer("extractHexcode")).define("extractHexcode", _extractHexcode);
  main.variable(observer("matches")).define("matches", ["vector_search","query"], _matches);
  main.variable(observer("get_code")).define("get_code", ["embedding_db"], _get_code);
  main.variable(observer("vector_search")).define("vector_search", ["get_vector_embedding","embedding_to_pca","means","proj","embedding_db","get_code"], _vector_search);
  main.variable(observer("viewof embedding_db")).define("viewof embedding_db", ["Inputs"], _embedding_db);
  main.variable(observer("embedding_db")).define("embedding_db", ["Generators", "viewof embedding_db"], (G, _) => G.input(_));
  main.variable(observer("viewof embedding_file")).define("viewof embedding_file", ["Inputs"], _embedding_file);
  main.variable(observer("embedding_file")).define("embedding_file", ["Generators", "viewof embedding_file"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof embedding_db","importDuckDB","embedding_file","Event"], _11);
  main.variable(observer("db")).define("db", ["DuckDBClient"], _db);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("load_compressed_embeddings")).define("load_compressed_embeddings", ["viewof embedding_db","importDuckDB","Event"], _load_compressed_embeddings);
  main.variable(observer("load_pca_proj")).define("load_pca_proj", _load_pca_proj);
  main.variable(observer("load_indexes")).define("load_indexes", ["load_compressed_embeddings","load_pca_proj"], _load_indexes);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof file")).define("viewof file", ["Inputs"], _file);
  main.variable(observer("file")).define("file", ["Generators", "viewof file"], (G, _) => G.input(_));
  main.variable(observer()).define(["importDuckDB","file","db","viewof kb","Event"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof fetchFromGithub")).define("viewof fetchFromGithub", ["Inputs"], _fetchFromGithub);
  main.variable(observer("fetchFromGithub")).define("fetchFromGithub", ["Generators", "viewof fetchFromGithub"], (G, _) => G.input(_));
  main.variable(observer("sources")).define("sources", ["fetchFromGithub"], _sources);
  main.variable(observer("latestSources")).define("latestSources", ["sources"], _latestSources);
  main.variable(observer("extendedSources")).define("extendedSources", ["latestSources"], _extendedSources);
  main.variable(observer()).define(["highlight","latestSources"], _26);
  main.variable(observer("importSources")).define("importSources", ["db","latestSources"], _importSources);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["exportDuckDB","kb","htl"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof kb")).define("viewof kb", ["Inputs","db"], _kb);
  main.variable(observer("kb")).define("kb", ["Generators", "viewof kb"], (G, _) => G.input(_));
  main.variable(observer("acorn")).define("acorn", _acorn);
  main.variable(observer("parsedContent")).define("parsedContent", ["kb","acorn"], _parsedContent);
  main.variable(observer("processedContent")).define("processedContent", ["parsedContent"], _processedContent);
  main.variable(observer()).define(["highlight","processedContent"], _35);
  main.variable(observer("extract_definitions")).define("extract_definitions", _extract_definitions);
  main.variable(observer()).define(["highlight","extract_definitions","processedContent"], _37);
  main.variable(observer("linkedContent")).define("linkedContent", ["processedContent","extract_definitions"], _linkedContent);
  main.variable(observer()).define(["highlight","linkedContent"], _39);
  main.variable(observer("create_tables")).define("create_tables", ["DuckDBClient"], _create_tables);
  main.variable(observer("insertLinks")).define("insertLinks", ["linkedContent","create_tables"], _insertLinks);
  main.variable(observer()).define(["insertLinks","viewof populated_kb","create_tables","Event"], _42);
  main.variable(observer()).define(["__query","populated_kb","invalidation"], _43);
  main.variable(observer()).define(["highlight","linkedContent"], _44);
  main.variable(observer()).define(["exportDuckDB","populated_kb","htl"], _45);
  main.variable(observer("viewof populated_kb")).define("viewof populated_kb", ["Inputs"], _populated_kb);
  main.variable(observer("populated_kb")).define("populated_kb", ["Generators", "viewof populated_kb"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("viewof cell_file")).define("viewof cell_file", ["Inputs"], _cell_file);
  main.variable(observer("cell_file")).define("cell_file", ["Generators", "viewof cell_file"], (G, _) => G.input(_));
  main.variable(observer("cell_kb")).define("cell_kb", ["importDuckDB","cell_file"], _cell_kb);
  main.variable(observer("get_vector_embedding")).define("get_vector_embedding", ["OPENAI_API_KEY"], _get_vector_embedding);
  main.variable(observer("create_embeddings_table")).define("create_embeddings_table", ["cell_kb"], _create_embeddings_table);
  main.variable(observer("cellsWithoutEmbedding")).define("cellsWithoutEmbedding", ["create_embeddings_table","cell_kb"], _cellsWithoutEmbedding);
  main.variable(observer("insert_embeddings")).define("insert_embeddings", ["cellsWithoutEmbedding","get_vector_embedding","cell_kb"], _insert_embeddings);
  main.variable(observer()).define(["exportDuckDB","embedding_db","htl"], _54);
  main.variable(observer()).define(["__query","embedding_db","invalidation"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["Inputs","viewof embedding_db","importDuckDB","Event"], _57);
  main.variable(observer("viewof compress")).define("viewof compress", ["Inputs"], _compress);
  main.variable(observer("compress")).define("compress", ["Generators", "viewof compress"], (G, _) => G.input(_));
  main.variable(observer("PCA")).define("PCA", ["require"], _PCA);
  main.variable(observer("embeddings")).define("embeddings", ["embedding_db"], _embeddings);
  main.variable(observer("vectors")).define("vectors", ["compress","embeddings"], _vectors);
  main.variable(observer("pca")).define("pca", ["compress","PCA","vectors"], _pca);
  main.variable(observer("variance")).define("variance", ["pca"], _variance);
  main.variable(observer("viewof cutoff")).define("viewof cutoff", ["Inputs","variance"], _cutoff);
  main.variable(observer("cutoff")).define("cutoff", ["Generators", "viewof cutoff"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","variance","cutoff"], _65);
  main.variable(observer("means")).define("means", ["pca","base64ToFloat32","load_pca_proj"], _means);
  main.variable(observer("embedding_to_pca")).define("embedding_to_pca", ["cutoff"], _embedding_to_pca);
  main.variable(observer("proj")).define("proj", ["pca","cutoff","base64ToFloat32","load_pca_proj"], _proj);
  main.variable(observer("create_compressed_table")).define("create_compressed_table", ["embedding_db","cutoff"], _create_compressed_table);
  main.variable(observer("insert_compressed_embeddings")).define("insert_compressed_embeddings", ["create_compressed_table","embeddings","embedding_db","embedding_to_pca","means","proj"], _insert_compressed_embeddings);
  main.variable(observer()).define(["__query","embedding_db","invalidation"], _71);
  main.variable(observer("float32ArrayToBase64")).define("float32ArrayToBase64", _float32ArrayToBase64);
  main.variable(observer("base64ToFloat32")).define("base64ToFloat32", _base64ToFloat32);
  main.variable(observer("pca_projection")).define("pca_projection", ["float32ArrayToBase64","proj","means"], _pca_projection);
  main.variable(observer()).define(["exportDuckDB","embedding_db","htl"], _75);
  main.variable(observer()).define(["viewof prompt"], _76);
  main.variable(observer()).define(["Inputs","suggestion"], _77);
  main.variable(observer()).define(["viewof suggestion"], _78);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer()).define(["viewof context_viz"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _82);
  main.variable(observer()).define(["viewof api_endpoint"], _83);
  main.variable(observer()).define(["viewof settings"], _84);
  main.variable(observer()).define(["md"], _85);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("variables", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("ndd", child1);
  main.import("_ndd", child1);
  main.import("instruction", child1);
  main.import("_events", child1);
  main.import("highlight", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  main.variable(observer()).define(["background_tasks"], _87);
  const child2 = runtime.module(define2);
  main.import("exportDuckDB", child2);
  main.import("importDuckDB", child2);
  main.import("download", child2);
  main.import("fromZip", child2);
  main.import("toZip", child2);
  return main;
}
