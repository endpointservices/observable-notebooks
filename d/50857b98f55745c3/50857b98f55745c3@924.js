import define1 from "./f109935193c0deba@4551.js";
import define2 from "./0b75dbddd18995dc@1765.js";
import define3 from "./8381f40adb144e29@52.js";
import define4 from "./98f34e974bb2e4bc@958.js";
import define5 from "./a2a7845a5e2a5aec@139.js";
import define6 from "./f8aabe0def7ada25@486.js";
import define7 from "./00ef42626bb8784f@29.js";
import define8 from "./674c4d9c6d6b8b60@66.js";
import define9 from "./dd8911e757486167@29.js";
import define10 from "./db42ae70222a8b08@1170.js";
import define11 from "./10c7899865f8a76e@8998.js";

function _1(md){return(
md`# Change History with Git

[Jumpgate](https://observablehq.com/@tomlarkworthy/jumpgate?source=https://observablehq.com/d/50857b98f55745c3&export_state=%7B%22hash%22%3A%22%23view%3Dd%2F50857b98f55745c3%22%2C%22headless%22%3Atrue%2C%22title%22%3A%22d%2F50857b98f55745c3%22%7D&git_url=https%3A%2F%2Fgithub.com%2Ftomlarkworthy%2Flopecode&load_source=true&commit=false)
`
)}

function _2(htl){return(
htl.html`<details><summary>video demo</summary>
  <lite-youtube videoid="V8bToPxvx3M" playlabel="Change History Demo"></lite-youtube>
</details>`
)}

function _temporal(Inputs){return(
Inputs.select(["temporal", "discrete"], {
  label: "y-axis",
  value: "discrete"
})
)}

function _rewind(Plot,width,temporal,d3,history,timeline)
{
  return Plot.plot({
    marginLeft: 200,
    width,
    y: {
      type: temporal == "temporal" ? "time" : "point",
      reverse: true
    },
    marks: [
      Plot.ruleY([d3.max(history, (d) => d.t)], {
        stroke: "green"
      }),
      Plot.ruleX(history, {
        x: "_name",
        strokeDasharray: [1, 10]
      }),
      Plot.dot(history, {
        x: "_name",
        y: "t",
        symbol: "type",
        stroke: "_name"
      }),
      Plot.ruleY(
        temporal == "temporal" ? timeline : history.map((e) => e.t),
        Plot.pointerY({ stroke: "red" })
      )
    ]
  });
}


function _named_cell(){return(
"test2"
)}

function _6(rewind,Inputs,rewindToTime,md){return(
rewind
  ? Inputs.button("rewind to time", {
      reduce: () => rewindToTime(rewind)
    })
  : md`⚠️ pick a time to rewind`
)}

function _selected(Inputs,history,inspect){return(
Inputs.table(history, {
  layout: "auto",
  required: false,
  sort: "t",
  reverse: true,
  format: {
    t: (ts) => new Date(ts).toISOString(),
    previous: inspect
  }
})
)}

function _8(selected,Inputs,revertVariables,md){return(
selected.length
  ? Inputs.button("revert variables", {
      reduce: () => revertVariables(selected)
    })
  : md`⚠️ select some variables to revert individual cells`
)}

function _change_me(){return(
"foo"
)}

function _10(md){return(
md`## Isomorphic Git

Model
 - one IndexDB filesystem (lopecode_history)
 - one repository per _notebook_
 - one branch per host \`url\` (e.g. a blob:// in the case of tab forks)
 - one subdirectory per module
 - one file per variable, contents is the \`_definition\`

So, everytime you fork a notebook, you create a new host url, but with a shared history of that notebook evolution.

~~~
lopecode-js
   - repo: notebook1
      branch: session1
        dir: /modules/module1
                - 0x54343af.js: (cell with lineage 0x54343af definition)
                - 0x54343af.json (cell with lineage 0x54343af metadata, name and inputs)
  
~~~`
)}

function _fs(Inputs,FS){return(
Inputs.button("wipe filesystem", {
  reduce: () =>
    new FS("lopecode_history", {
      wipe: true
    }).promises,
  value: new FS("lopecode_history", {
    wipe: false
  }).promises
})
)}

function _12(fs){return(
fs
)}

function _13(md){return(
md`## Initialization

`
)}

function _git_history(listCommits,config){return(
listCommits(config)
)}

function _git_changes(git_history,getCommitChanges,config){return(
Promise.all(
  git_history.map((h) =>
    getCommitChanges({
      ...config,
      oid: h.oid
    })
  )
)
)}

async function _config(notebook_title,ensure_branch)
{
  const config = {
    repo: "/" + notebook_title,
    branch: "default"
  };
  await ensure_branch(config);
  return config;
}


async function _latest_files(listFiles,config){return(
Promise.all(
  (
    await listFiles({
      ...config,
      ref: "HEAD"
    })
  ).map((path) => ({ path, ...config }))
)
)}

function _latest_content(latest_files,getFile){return(
Promise.all(
  latest_files.map(async (file) => ({
    ...file,
    content: await getFile({ ...file })
  }))
)
)}

function _applyLatest(Inputs,applyContent,latest_content){return(
Inputs.button("apply file changes", {
  reduce: () => {
    debugger;
    return applyContent(latest_content);
  }
})
)}

async function _20(applyContent,latest_content)
{
  if (!this) {
    await applyContent(latest_content);
  }
  return "OK";
}


async function _commit_history(history,commit_change,config)
{
  const start = this || 0;
  for (let i = start; i < history.length; i++) {
    await commit_change({ ...config, change: history[i] });
  }
  return history.length;
}


function _22(history){return(
history
)}

function _commit_change(modules,setFilesAndCommit){return(
async ({ repo, branch, change }) => {
  const module_name = modules.get(
    change?.variable?._module || change?.previous?._module
  ).name;
  const base = module_name + "/" + change.variable.lineage;
  const codePath = base + ".js";
  const metaPath = base + ".json";
  const content = change.variable._definition.toString();
  const metadata = JSON.stringify({
    name: change._name,
    inputs: change._inputs
  });
  if (change.type === "CHANGE") {
    const data = new Map([
      [codePath, content],
      [metaPath, metadata]
    ]);
    await setFilesAndCommit({ repo, branch, data });
  }
  return {
    path: codePath,
    content,
    metadataPath: metaPath,
    metadata
  };
}
)}

function _applyContent(modules,runtime){return(
async function applyContent(files) {
  const nameToModule = new Map(
    Array.from(modules, ([mod, info]) => [info?.name, mod])
  );
  const allModules = runtime?._modules ? Array.from(runtime._modules) : [];

  const variablesByLineage = new Map();

  for (const v of runtime._variables) {
    const lin = v?.lineage;
    if (lin && !variablesByLineage.has(lin)) variablesByLineage.set(lin, v);
  }

  const byBase = new Map();
  for (const f of files) {
    const p = f.path;
    const dot = p.lastIndexOf(".");
    const base = dot === -1 ? p : p.slice(0, dot);
    let g = byBase.get(base);
    if (!g) byBase.set(base, (g = []));
    g.push(f);
  }

  const parseDefinition = (src) => (0, eval)(`(${src.trim()})`);
  const results = [];

  for (const [base, group] of byBase) {
    const jsFile = group.find((f) => f.path.endsWith(".js"));
    const jsonFile = group.find((f) => f.path.endsWith(".json"));

    const parts = base.split("/").filter(Boolean);
    const lineage = parts.length ? parts[parts.length - 1] : base;
    const moduleName = parts.length > 1 ? parts.slice(0, -1).join("/") : "";

    const meta = jsonFile ? JSON.parse(jsonFile.content) : {};
    const name = meta.name || lineage;
    const inputs = meta.inputs || [];

    const module = nameToModule.get(moduleName);
    const variable = variablesByLineage.get(lineage) || null;
    const def = jsFile ? parseDefinition(jsFile.content) : null;

    const targetModule = module || variable?._module || null;

    if (variable?.define && def) {
      variable.define(name, inputs, def);
      variable.lineage = lineage;
      results.push({
        base,
        moduleName,
        lineage,
        name,
        inputs,
        applied: true,
        method: "variable.define",
        targetModule: targetModule ? true : false
      });
    } else {
      results.push({
        base,
        moduleName,
        lineage,
        name,
        inputs,
        applied: false,
        reason: !def
          ? "no .js definition found for base"
          : "no matching module/variable found in runtime"
      });
    }
  }

  return results;
}
)}

function _25(Inputs,exportToZip,fs,config,getCompactISODate){return(
Inputs.button("history git zip", {
  reduce: async () => {
    const zip = await exportToZip({ fs, dir: config.repo });
    const url = URL.createObjectURL(zip);
    const a = document.createElement("a");
    a.href = url;
    a.download = `history_${getCompactISODate()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }
})
)}

function _26(md){return(
md`## IndexDB State Explorer`
)}

function _repos(listRepos){return(
listRepos()
)}

function _selected_repo(Inputs,repos,config){return(
Inputs.select(repos, {
  label: "select repo",
  value: config.repo
})
)}

function _branches(listBranches,selected_repo){return(
listBranches({ repo: selected_repo })
)}

function _selected_branch(Inputs,branches,selected_repo,config){return(
Inputs.select(branches, {
  label: "select branch",
  value: selected_repo == config.repo ? config.branch : undefined
})
)}

function _selected_files(listFiles,selected_repo,selected_branch){return(
listFiles({ repo: selected_repo, branch: selected_branch })
)}

function _32(Inputs,selected_files){return(
Inputs.table(selected_files.map((path) => ({ path })))
)}

function _commits(listCommits,selected_repo,selected_branch){return(
listCommits({ repo: selected_repo, branch: selected_branch })
)}

function _34(Inputs,commits){return(
Inputs.table(commits, {
  format: {
    commit: (commit) => JSON.stringify(commit, null, 2)
  }
})
)}

function _exportFsToZip(JSZip){return(
async function exportFsToZip({fs, dir} = {}) {
  if (!fs) throw new Error("exportFsToZip: fs is required");
  if (!dir) throw new Error("exportFsToZip: dir is required");
  if (!JSZip) throw new Error("exportFsToZip: JSZip is not available");

  const zip = new JSZip();

  async function walk(currentPath, relPath = "") {
    const names = await fs.readdir(currentPath);
    for (const name of names) {
      if (name === "." || name === "..") continue;

      const fullPath = (currentPath.endsWith("/") ? currentPath : currentPath + "/") + name;
      const childRelPath = relPath ? relPath + "/" + name : name;

      const stat = await fs.stat(fullPath);
      if (stat.type === "file") {
        const data = await fs.readFile(fullPath);
        zip.file(childRelPath, data);
      } else if (stat.type === "dir") {
        await walk(fullPath, childRelPath);
      }
    }
  }

  await walk(dir, "");
  return zip.generateAsync({type: "blob"});
}
)}

function _36(Inputs,exportFsToZip,fs,config,getCompactISODate){return(
Inputs.button("Download fs as .zip", {
  reduce: async () => {
    const blob = await exportFsToZip({fs, dir: config.repo});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fs_${getCompactISODate()}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }
})
)}

function _37(md){return(
md`### Git utils`
)}

function _known_dirs(){return(
new Set()
)}

function _ensure_dir(known_dirs,fs){return(
async function ensure_dir({ dir }) {
  if (known_dirs.has(dir)) return;
  if (!dir || dir === "/") return;
  const lastSlash = dir.lastIndexOf("/");
  const parent = lastSlash > 0 ? dir.slice(0, lastSlash) : "/";
  if (parent && parent !== dir) {
    await ensure_dir({ dir: parent });
  }
  try {
    await fs.mkdir(dir);
  } catch (err) {
    if (!(err && err.message === "EEXIST")) {
      throw err;
    }
  }
  known_dirs.add(dir);
}
)}

function _known_repos(){return(
new Set()
)}

function _ensure_repo(known_repos,ensure_dir,git,fs){return(
async ({ repo, defaultBranch = "default" }) => {
  if (known_repos.has(repo)) return;
  await ensure_dir({ dir: repo });
  await git.init({
    fs,
    dir: repo,
    defaultBranch
  });
  known_repos.add(repo);
}
)}

function _ensure_branch(ensure_repo,git,fs){return(
async ({ repo, branch, create = true }) => {
  await ensure_repo({ repo, defaultBranch: branch || "default" });

  let branches = await git.listBranches({ fs, dir: repo });
  let hasBranch = branches.includes(branch);

  if (!hasBranch && create) {
    try {
      await git.branch({ fs, dir: repo, ref: branch });
      hasBranch = true;
    } catch (err) {
      if (err.code === "NoHeadCommitError") {
        hasBranch = true;
      } else if (
        err.code === "RefExistsError" ||
        err.name === "RefExistsError"
      ) {
        hasBranch = true;
      } else {
        throw err;
      }
    }
  }

  if (!hasBranch) return false;

  try {
    await git.checkout({ fs, dir: repo, ref: branch });
  } catch (err) {
    if (!(err.code === "ResolveRefError" || err.name === "NotFoundError")) {
      throw err;
    }
  }

  return true;
}
)}

function _setFileAndCommit(setFilesAndCommit){return(
async function setFileAndCommit({
  repo,
  branch,
  path,
  content
}) {
  return await setFilesAndCommit({
    repo,
    branch,
    data: new Map([[path, content]])
  });
}
)}

function _setFilesAndCommit(ensure_branch,ensure_dir,fs,git){return(
async function setFilesAndCommit({ repo, branch, data }) {
  await ensure_branch({ repo, branch });
  let hasFiles = false;
  for (const [path, content] of data) {
    hasFiles = true;
    const full_path = `${repo}/${path}`;
    const lastSlash = full_path.lastIndexOf("/");
    const dir = lastSlash === -1 ? repo : full_path.slice(0, lastSlash);
    await ensure_dir({ dir });
    await fs.writeFile(full_path, content);
    await git.add({
      fs,
      dir: repo,
      filepath: path
    });
  }
  if (!hasFiles) return;
  await git.commit({
    fs,
    dir: repo,
    author: { name: "-" },
    message: "-"
  });
}
)}

function _listRepos(fs){return(
async function listRepos({ root = "/", maxDepth = 4 } = {}) {
  const norm = (p) => (p === "/" ? "/" : p.replace(/\/+$/, ""));
  root = norm(root);

  const repos = new Set();
  const visited = new Set();
  const q = [{ path: root, depth: 0 }];

  const safeReaddir = async (p) => {
    try {
      return await fs.readdir(p);
    } catch (e) {
      return null;
    }
  };

  const safeStat = async (p) => {
    try {
      return await fs.stat(p);
    } catch (e) {
      return null;
    }
  };

  while (q.length) {
    const { path, depth } = q.shift();
    const key = `${depth}:${path}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const stat = await safeStat(path);
    if (!stat || stat.type !== "dir") continue;

    const names = await safeReaddir(path);
    if (!names) continue;

    if (names.includes(".git")) repos.add(path);

    if (depth >= maxDepth) continue;

    for (const name of names) {
      if (name === "." || name === "..") continue;
      const child = path === "/" ? `/${name}` : `${path}/${name}`;
      const cstat = await safeStat(child);
      if (cstat && cstat.type === "dir")
        q.push({ path: child, depth: depth + 1 });
    }
  }

  return Array.from(repos).sort();
}
)}

function _listBranches(ensure_repo,git,fs){return(
async function listBranches({ repo } = {}) {
  if (!repo) throw new Error("repo is required");
  await ensure_repo({ repo });
  return git.listBranches({ fs, dir: repo });
}
)}

function _listFiles(ensure_branch,git,fs){return(
async function listFiles({ repo, branch, ref } = {}) {
  if (!repo) throw new Error("repo is required");
  if (!branch) throw new Error("branch is required");
  await ensure_branch({ repo, branch, create: true });
  return git.listFiles({
    fs,
    dir: repo,
    ref: ref ?? branch
  });
}
)}

function _listCommits(ensure_branch,git,fs){return(
async function listCommits({ repo, branch, depth } = {}) {
  if (!repo) throw new Error("repo is required");
  if (!branch) throw new Error("branch is required");
  const hasBranch = await ensure_branch({ repo, branch, create: false });
  if (!hasBranch) return [];
  return git.log({
    fs,
    dir: repo,
    ref: branch,
    depth
  });
}
)}

function _getCommitChanges(git,fs){return(
async function getCommitChanges({ repo, oid } = {}) {
  if (!repo) throw new Error("repo is required");
  if (!oid) throw new Error("oid is required");

  const { commit } = await git.readCommit({ fs, dir: repo, oid });
  const parentOid = commit.parent && commit.parent[0] ? commit.parent[0] : null;

  const filesAt = async (ref) => {
    if (!ref) return new Map();
    const filepaths = await git.listFiles({ fs, dir: repo, ref });
    const entries = await Promise.all(
      filepaths.map(async (filepath) => {
        const { oid: blobOid } = await git.readObject({
          fs,
          dir: repo,
          oid: ref,
          filepath
        });
        return [filepath, blobOid];
      })
    );
    return new Map(entries);
  };

  const [currFiles, parentFiles] = await Promise.all([
    filesAt(oid),
    filesAt(parentOid)
  ]);

  const added = [];
  const modified = [];
  const removed = [];

  for (const [filepath, blobOid] of currFiles) {
    if (!parentFiles.has(filepath)) {
      added.push(filepath);
    } else if (parentFiles.get(filepath) !== blobOid) {
      modified.push(filepath);
    }
  }

  for (const filepath of parentFiles.keys()) {
    if (!currFiles.has(filepath)) {
      removed.push(filepath);
    }
  }

  return {
    oid,
    parentOid,
    added,
    modified,
    removed
  };
}
)}

function _getFile(ensure_branch,fs){return(
async function getFile({ repo, branch, path }) {
  const hasBranch = await ensure_branch({
    repo,
    branch,
    create: false
  });
  if (!hasBranch) return undefined;
  try {
    const content = await fs.readFile(repo + "/" + path);
    return content.toString();
  } catch (err) {
    if (err && (err.message === "ENOENT" || err.code === "ENOENT")) {
      return "";
    }
    throw err;
  }
}
)}

function _getCompactISODate(){return(
function getCompactISODate() {
  const date = new Date();

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
)}

function _exportToZip(JSZip){return(
async function exportToZip({ fs, dir }) {
  const zip = new JSZip();
  async function walk(currentPath, relPath = "") {
    const names = await fs.readdir(currentPath);
    for (const name of names) {
      if (name === "." || name === "..") continue;
      const fullPath =
        (currentPath.endsWith("/") ? currentPath : currentPath + "/") + name;
      const childRelPath = relPath ? relPath + "/" + name : name;
      const stat = await fs.stat(fullPath);
      if (stat.type === "file") {
        const data = await fs.readFile(fullPath);
        zip.file(childRelPath, data);
      } else if (stat.type === "dir") {
        await walk(fullPath, childRelPath);
      }
    }
  }
  await walk(dir, "");
  return zip.generateAsync({ type: "blob" });
}
)}

function _modules(moduleMap){return(
moduleMap()
)}

function _54(robocoop){return(
robocoop
)}

function _55(md,config){return(
md`### Idea for Candidate Plan to speed up \`git_history\` and get changed files

Right now you’re doing:

- \`git_history = listCommits(config)\` (fast)
- Then \`Promise.all(git_history.map(getCommitChanges))\`
- \`getCommitChanges\` calls \`git.listFiles\` and \`git.readObject\` for every file, for every commit, and then diffs those maps.

That is expensive (O(#commits × #files)) and overkill for what you need, and it still doesn’t give you a cheap way to answer “what changed in this commit?” later.

Below is a concrete plan to make it much faster and more useful.

---

#### 1. Stop recomputing changes from full trees; record them at commit time

You already know exactly which files are touched when you call \`commit_change\`:

\`\`\`js
const data = new Map([
  [codePath, content],
  [metaPath, metadata]
]);
await setFilesAndCommit({ repo, branch, data });
\`\`\`

So instead of later walking every commit’s full tree to rediscover this, encode a summary of the changed paths directly into the commit.

For example, change \`setFilesAndCommit\` to build a commit message that includes the modified paths in a machine-readable way:

\`\`\`js
setFilesAndCommit = async function setFilesAndCommit({repo, branch, data}) {
  await ensure_branch({ repo, branch });
  let hasFiles = false;
  const paths = [];
  for (const [path, content] of data) {
    hasFiles = true;
    paths.push(path);
    const full_path = \`\${repo}/\${path}\`;
    const lastSlash = full_path.lastIndexOf('/');
    const dir = lastSlash === -1 ? repo : full_path.slice(0, lastSlash);
    await ensure_dir({ dir });
    await fs.writeFile(full_path, content);
    await git.add({ fs, dir: repo, filepath: path });
  }
  if (!hasFiles) return;
  const message = JSON.stringify({ type: "change", paths });
  await git.commit({
    fs,
    dir: repo,
    author: { name: "-" },
    message
  });
}
\`\`\`

Then you get “what files changed?” just by parsing the commit message, with **no tree or blob walks**.

---

#### 2. Add a fast helper that returns commits + changed files in one pass

Use \`git.log\` once, then parse the JSON messages:

\`\`\`js
listCommitsWithChanges = async function listCommitsWithChanges({repo, branch, depth} = {}) {
  const commits = await listCommits({ repo, branch, depth });
  return commits.map(entry => {
    let info = null;
    try {
      info = JSON.parse(entry.commit.message || "{}");
    } catch {}
    return {
      oid: entry.oid,
      author: entry.commit.author,
      committer: entry.commit.committer,
      paths: Array.isArray(info?.paths) ? info.paths : []
    };
  });
}
\`\`\`

Now your “bulk” computation is:

- One \`git.log\` call
- A pure JS \`.map\` over that array to parse messages

No per-commit \`listFiles\`, no per-file \`readObject\`.

---

#### 3. Use this fast helper instead of \`Promise.all(git_history.map(getCommitChanges))\`

Replace the slow cell:

\`\`\`js
Promise.all(git_history.map(h => getCommitChanges({ ...config, oid: h.oid })))
\`\`\`

with something like:

\`\`\`js
git_history_with_paths = listCommitsWithChanges(config)
\`\`\`

You can then drive any UI (tables, plots) from \`git_history_with_paths\` directly.

---

#### 4. Optionally: keep an explicit index file for even faster queries

If you want to completely decouple queries from git internals, also write an index file that you append to on each commit:

- Path: \`${config.repo}/.history/index.jsonl\`
- Each line: \`{"oid":"…","t":123456789,"paths":["moduleA/…",".…"]}\`

Append in \`setFilesAndCommit\` right before \`git.commit\`. Then a “bulk” history query becomes:

- \`fs.readFile(indexPath)\`
- \`split("\n")\` and \`JSON.parse\` each non-empty line

Zero git calls.

---

#### 5. If you must reconstruct old history: use tree OIDs instead of \`listFiles + readObject\`

For existing repos where commit messages don’t have metadata, you can still make a faster one-off migrator:

- Use \`git.log\` once
- For each commit, use \`git.readCommit\` to get its \`tree\` OID and parent’s \`tree\`
- Use \`git.readTree\` recursively to build \`Map<filepath, blobOid>\` for each tree
- Diff the two maps to get {added, modified, removed}
- Store this result into your index file so that you never have to recompute it again

That’s still heavier than the approach above, but it’s a **one-time migration** instead of something you do reactively in the notebook.

---

#### 6. Short-term pragmatic win

If you don’t want to refactor commits yet, you can at least:

- Drop the \`Promise.all(git_history.map(getCommitChanges))\` cell from “hot” execution paths; only run it on demand (e.g., behind a button)
- Or call \`listCommits(config, { depth: N })\` so you don’t walk the entire history

But the main speedup will come from:

1. Recording changed paths when you already know them (inside \`setFilesAndCommit\`)
2. Reading them back via cheap \`git.log\` + \`JSON.parse\`, or from a dedicated history index file, rather than walking trees and blobs for every commit.`
)}

function _57(md){return(
md`## Function`
)}

function _revertVariables(){return(
(entries) => {
  entries.forEach(({ variable, previous }) => {
    variable.define(previous._name, previous._inputs, previous._definition);
  });
}
)}

function _rewindToTime(history,revertVariables){return(
function (time) {
  const byVariable = new Map();
  for (const entry of history) {
    if (entry.t > time) {
      const key = entry.variable;
      if (!byVariable.has(key)) byVariable.set(key, entry);
    }
  }
  revertVariables(Array.from(byVariable.values()));
}
)}

function _60(md){return(
md`## State`
)}

function _61(history){return(
history
)}

function _history(Inputs,invalidation,onCodeChange,sha1,Event)
{
  const buffer = this?.value || [];
  const view = Inputs.input(buffer);

  invalidation.then(
    onCodeChange(({ variable, previous }) => {
      if (variable?._type == 2) return; // Ignore IMPLICIT
      if (variable && !variable.lineage)
        // assign a lineage so we can follow
        variable.lineage = sha1(
          variable._definition.toString() + variable._name
        );

      if (!previous) return; // Not useful getting initial state, its in previous
      if (previous._inputs.find((i) => i == "@variable")) return; // ignore variables that redefine themselves (imports)
      const lineage = variable?.lineage || previous.variable.lineage;
      if (variable) {
        // UPSERT
        buffer.push({
          t: Date.now(),
          type: previous == null ? "INITIAL" : "CHANGE",
          variable: variable,
          previous,
          lineage,
          _module: variable._module,
          _name: variable._name || variable.lineage,
          _inputs: variable._inputs.map((i) => i._name),
          _definition: variable._definition
        });
      } else {
        // DELETE
        buffer.push({
          t: Date.now(),
          type: "DELETE",
          lineage,
          variable: previous.variable,
          previous,
          _module: previous.variable._module,
          _name: previous.variable._name || previous.variable.lineage,
          _inputs: previous.variable._inputs.map((i) => i._name),
          _definition: previous.variable._definition
        });
      }

      view.dispatchEvent(new Event("input"));
    })
  );
  return view;
}


function _63(md){return(
md`## Utils`
)}

function _66(lite_youtube_css){return(
lite_youtube_css
)}

function _timeline(history)
{
  const first = history.at(0) || 0;
  const last = history.at(-1) || 0;
  const factor = (last.t - first.t) / 1024;
  return Array.from({ length: 1024 }).map((_, i) =>
    Math.floor(first.t + i * factor)
  );
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer("viewof temporal")).define("viewof temporal", ["Inputs"], _temporal);
  main.variable(observer("temporal")).define("temporal", ["Generators", "viewof temporal"], (G, _) => G.input(_));
  main.variable(observer("viewof rewind")).define("viewof rewind", ["Plot","width","temporal","d3","history","timeline"], _rewind);
  main.variable(observer("rewind")).define("rewind", ["Generators", "viewof rewind"], (G, _) => G.input(_));
  main.variable(observer("named_cell")).define("named_cell", _named_cell);
  main.variable(observer()).define(["rewind","Inputs","rewindToTime","md"], _6);
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs","history","inspect"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["selected","Inputs","revertVariables","md"], _8);
  main.variable(observer("change_me")).define("change_me", _change_me);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof fs")).define("viewof fs", ["Inputs","FS"], _fs);
  main.variable(observer("fs")).define("fs", ["Generators", "viewof fs"], (G, _) => G.input(_));
  main.variable(observer()).define(["fs"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("git_history")).define("git_history", ["listCommits","config"], _git_history);
  main.variable(observer("git_changes")).define("git_changes", ["git_history","getCommitChanges","config"], _git_changes);
  main.variable(observer("config")).define("config", ["notebook_title","ensure_branch"], _config);
  main.variable(observer("latest_files")).define("latest_files", ["listFiles","config"], _latest_files);
  main.variable(observer("latest_content")).define("latest_content", ["latest_files","getFile"], _latest_content);
  main.variable(observer("viewof applyLatest")).define("viewof applyLatest", ["Inputs","applyContent","latest_content"], _applyLatest);
  main.variable(observer("applyLatest")).define("applyLatest", ["Generators", "viewof applyLatest"], (G, _) => G.input(_));
  main.variable(observer()).define(["applyContent","latest_content"], _20);
  main.variable(observer("commit_history")).define("commit_history", ["history","commit_change","config"], _commit_history);
  main.variable(observer()).define(["history"], _22);
  main.variable(observer("commit_change")).define("commit_change", ["modules","setFilesAndCommit"], _commit_change);
  main.variable(observer("applyContent")).define("applyContent", ["modules","runtime"], _applyContent);
  main.variable(observer()).define(["Inputs","exportToZip","fs","config","getCompactISODate"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("repos")).define("repos", ["listRepos"], _repos);
  main.variable(observer("viewof selected_repo")).define("viewof selected_repo", ["Inputs","repos","config"], _selected_repo);
  main.variable(observer("selected_repo")).define("selected_repo", ["Generators", "viewof selected_repo"], (G, _) => G.input(_));
  main.variable(observer("branches")).define("branches", ["listBranches","selected_repo"], _branches);
  main.variable(observer("viewof selected_branch")).define("viewof selected_branch", ["Inputs","branches","selected_repo","config"], _selected_branch);
  main.variable(observer("selected_branch")).define("selected_branch", ["Generators", "viewof selected_branch"], (G, _) => G.input(_));
  main.variable(observer("selected_files")).define("selected_files", ["listFiles","selected_repo","selected_branch"], _selected_files);
  main.variable(observer()).define(["Inputs","selected_files"], _32);
  main.variable(observer("commits")).define("commits", ["listCommits","selected_repo","selected_branch"], _commits);
  main.variable(observer()).define(["Inputs","commits"], _34);
  main.variable(observer("exportFsToZip")).define("exportFsToZip", ["JSZip"], _exportFsToZip);
  main.variable(observer()).define(["Inputs","exportFsToZip","fs","config","getCompactISODate"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("known_dirs")).define("known_dirs", _known_dirs);
  main.variable(observer("ensure_dir")).define("ensure_dir", ["known_dirs","fs"], _ensure_dir);
  main.variable(observer("known_repos")).define("known_repos", _known_repos);
  main.variable(observer("ensure_repo")).define("ensure_repo", ["known_repos","ensure_dir","git","fs"], _ensure_repo);
  main.variable(observer("ensure_branch")).define("ensure_branch", ["ensure_repo","git","fs"], _ensure_branch);
  main.variable(observer("setFileAndCommit")).define("setFileAndCommit", ["setFilesAndCommit"], _setFileAndCommit);
  main.variable(observer("setFilesAndCommit")).define("setFilesAndCommit", ["ensure_branch","ensure_dir","fs","git"], _setFilesAndCommit);
  main.variable(observer("listRepos")).define("listRepos", ["fs"], _listRepos);
  main.variable(observer("listBranches")).define("listBranches", ["ensure_repo","git","fs"], _listBranches);
  main.variable(observer("listFiles")).define("listFiles", ["ensure_branch","git","fs"], _listFiles);
  main.variable(observer("listCommits")).define("listCommits", ["ensure_branch","git","fs"], _listCommits);
  main.variable(observer("getCommitChanges")).define("getCommitChanges", ["git","fs"], _getCommitChanges);
  main.variable(observer("getFile")).define("getFile", ["ensure_branch","fs"], _getFile);
  main.variable(observer("getCompactISODate")).define("getCompactISODate", _getCompactISODate);
  main.variable(observer("exportToZip")).define("exportToZip", ["JSZip"], _exportToZip);
  main.variable(observer("modules")).define("modules", ["moduleMap"], _modules);
  main.variable(observer()).define(["robocoop"], _54);
  main.variable(observer()).define(["md","config"], _55);
  const child1 = runtime.module(define1);
  main.import("robocoop", child1);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("revertVariables")).define("revertVariables", _revertVariables);
  main.variable(observer("rewindToTime")).define("rewindToTime", ["history","revertVariables"], _rewindToTime);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer()).define(["history"], _61);
  main.variable(observer("viewof history")).define("viewof history", ["Inputs","invalidation","onCodeChange","sha1","Event"], _history);
  main.variable(observer("history")).define("history", ["Generators", "viewof history"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _63);
  const child2 = runtime.module(define2);
  main.import("_ndd", child2);
  main.variable(observer()).define(["lite_youtube_css"], _66);
  main.variable(observer("timeline")).define("timeline", ["history"], _timeline);
  const child3 = runtime.module(define3);
  main.import("lite_youtube_css", child3);
  const child4 = runtime.module(define4);
  main.import("onCodeChange", child4);
  main.import("runtime", child4);
  const child5 = runtime.module(define5);
  main.import("inspect", child5);
  main.import("Inspector", child5);
  const child6 = runtime.module(define6);
  main.import("sha1", child6);
  const child7 = runtime.module(define7);
  main.import("FS", child7);
  const child8 = runtime.module(define8);
  main.import("git", child8);
  main.import("http", child8);
  const child9 = runtime.module(define9);
  main.import("JSZip", child9);
  const child10 = runtime.module(define10);
  main.import("moduleMap", child10);
  const child11 = runtime.module(define11);
  main.import("notebook_title", child11);
  return main;
}
