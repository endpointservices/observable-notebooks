// https://observablehq.com/@tomlarkworthy/notebook-backups@313
import define1 from "./5460ee246e3aa033@941.js";
import define2 from "./b8c5be7836c14484@899.js";
import define3 from "./dff1e917c89f5e76@1964.js";
import define4 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Notebook Backup Tool
`
)}

function _2(md){return(
md`## Provision storage`
)}

function _3(storageLogin){return(
storageLogin
)}

function _files(bucket,rules){return(
bucket({
  name: "toms",
  rules: rules
})
)}

function _rules(){return(
`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if 'tomlarkworthy' in request.auth.token['observablehq.com'];
    }
    match /backups/{allPaths=**} {
      allow read;
    }
    match /public/{allPaths=**} {
      allow get;
    }
  }
}
`
)}

function _6(files){return(
files.link
)}

function _storage(storageClient,files){return(
storageClient(files.link)
)}

function _9(md){return(
md`## Use [mootari](https://observablehq.com/@mootari)'s notebook list to find recently published notebook`
)}

function _username(getContext){return(
getContext().serverless ? new Promise(() => {}) : "tomlarkworthy"
)}

function _sort(){return(
"updated"
)}

function _12(Inputs,notebooks){return(
Inputs.table(notebooks)
)}

function _15(md){return(
md`## Backup: Iterate through list starting at most recent

Save the version in file metadata, so we skip backing up the same file everyday
`
)}

function _backupState(){return(
{
  index: 0,
  status: "waiting"
}
)}

function _fullscan(){return(
true
)}

function _18(html,$0,cache,codeURL,backupState)
{
  const reset = html`<button>Reset</button>`;
  reset.onclick = evt => {
    $0.value = { index: 0, status: "waiting" };
  };
  const run = html`<button>Backup</button>`;
  run.onclick = evt => {
    $0.value = { index: 0, status: "unchecked" };
  };
  const retry = html`<button>Retry current</button>`;
  retry.onclick = evt => {
    delete cache[codeURL];
    $0.value = { ...backupState, status: "unchecked" };
  };
  const skip = html`<button>Skip current</button>`;
  skip.onclick = evt => {
    delete cache[codeURL];
    $0.value = {
      ...backupState,
      index: backupState.index + 1,
      status: "unchecked"
    };
  };
  const permSkip = html`<button>Perm skip</button>`;
  permSkip.onclick = evt => {
    delete cache[codeURL];
    $0.value = {
      ...backupState,
      index: backupState.index,
      status: "permskip"
    };
  };
  return html`${reset}${run}${retry}${skip}${permSkip}`;
}


function _PREFIX(){return(
"backups/notebooks/"
)}

function _currentNotebook(notebooks,backupState){return(
notebooks[backupState.index]
)}

function _storageRef(storage,PREFIX,currentNotebook){return(
storage.ref(
  `${PREFIX}/@${currentNotebook.owner.login}/${currentNotebook.slug}.tgz`
)
)}

async function _storageMetadata(storageRef)
{
  try {
    return await storageRef.getMetadata();
  } catch (e) {
    if (e.message.includes("does not exist")) return undefined;
    else throw e;
  }
}


function _codeURL(currentNotebook){return(
`https://api.observablehq.com/@${currentNotebook.owner.login}/${currentNotebook.slug}.tgz?v=3`
)}

function _triageUnchecked(backupState,storageMetadata,$0,currentNotebook)
{
  if (backupState.status === "unchecked") {
    if (!storageMetadata) {
      $0.value = { ...backupState, status: "requiresBackup" };
    }
    
    if (Number.parseInt(storageMetadata?.customMetadata?.version) !== currentNotebook.version) {
      console.log(Number.parseInt(storageMetadata?.customMetadata?.version), currentNotebook.version)
      $0.value = { ...backupState, status: "requiresBackup" };
    }
    
    if (Number.parseInt(storageMetadata?.customMetadata?.version) === currentNotebook.version) {
      $0.value = { ...backupState, status: "finished" };
    }
  }
}


function _cache(){return(
{}
)}

function _retreive(cache,fetchp,codeURL)
{
  return async function retreive(url) {
    if (!cache[url]) {
      cache[url] = fetchp(codeURL);
    }
    return cache[url];
  };
}


async function _doBackup(backupState,retreive,codeURL,$0,storageRef,currentNotebook)
{
  if (backupState.status === "requiresBackup") {
    const response = await retreive(codeURL);
    if (response.status !== 200) {
      $0.value = {
        ...backupState,
        status: "error",
        message: await response.text()
      };
    }
    const upload = await storageRef.put(await response.arrayBuffer());
    $0.value = { ...backupState, status: "backedUp" };
  }

  if (backupState.status === "backedUp") {
    await storageRef.updateMetadata({
      customMetadata: {
        version: currentNotebook.version,
        id: currentNotebook.id
      }
    });
    $0.value = { ...backupState, status: "ready" };
  }
}


async function _doSkip(backupState,storageRef,currentNotebook,$0)
{
  if (backupState.status === "permskip") {
    const upload = await storageRef.put("");
    await storageRef.updateMetadata({
      customMetadata: {
        version: currentNotebook.version,
        id: currentNotebook.id
      }
    });
    $0.value = { ...backupState, status: "ready" };
  }
}


function _iterate(backupState,notebooks,cache,codeURL,$0,fullscan)
{
  if (
    backupState.status === "ready" &&
    backupState.index !== notebooks.length - 1
  ) {
    delete cache[codeURL];
    $0.value = {
      status: "unchecked",
      index: backupState.index + 1
    };
  }
  if (
    !fullscan &&
    backupState.status === "ready" &&
    backupState.index === notebooks.length - 1
  ) {
    $0.value = {
      status: "finished"
    };
  }
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["storageLogin"], _3);
  main.variable(observer("viewof files")).define("viewof files", ["bucket","rules"], _files);
  main.variable(observer("files")).define("files", ["Generators", "viewof files"], (G, _) => G.input(_));
  main.variable(observer("rules")).define("rules", _rules);
  main.variable(observer()).define(["files"], _6);
  main.variable(observer("storage")).define("storage", ["storageClient","files"], _storage);
  const child1 = runtime.module(define1);
  main.import("storageClient", child1);
  main.import("storageLogin", child1);
  main.import("bucket", child1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("username")).define("username", ["getContext"], _username);
  main.variable(observer("sort")).define("sort", _sort);
  main.variable(observer()).define(["Inputs","notebooks"], _12);
  const child2 = runtime.module(define2).derive(["username","sort"], main);
  main.import("selection", "notebooks", child2);
  const child3 = runtime.module(define3);
  main.import("getContext", child3);
  main.variable(observer()).define(["md"], _15);
  main.define("initial backupState", _backupState);
  main.variable(observer("mutable backupState")).define("mutable backupState", ["Mutable", "initial backupState"], (M, _) => new M(_));
  main.variable(observer("backupState")).define("backupState", ["mutable backupState"], _ => _.generator);
  main.variable(observer("fullscan")).define("fullscan", _fullscan);
  main.variable(observer()).define(["html","mutable backupState","cache","codeURL","backupState"], _18);
  main.variable(observer("PREFIX")).define("PREFIX", _PREFIX);
  main.variable(observer("currentNotebook")).define("currentNotebook", ["notebooks","backupState"], _currentNotebook);
  main.variable(observer("storageRef")).define("storageRef", ["storage","PREFIX","currentNotebook"], _storageRef);
  main.variable(observer("storageMetadata")).define("storageMetadata", ["storageRef"], _storageMetadata);
  main.variable(observer("codeURL")).define("codeURL", ["currentNotebook"], _codeURL);
  main.variable(observer("triageUnchecked")).define("triageUnchecked", ["backupState","storageMetadata","mutable backupState","currentNotebook"], _triageUnchecked);
  main.variable(observer("cache")).define("cache", _cache);
  main.variable(observer("retreive")).define("retreive", ["cache","fetchp","codeURL"], _retreive);
  main.variable(observer("doBackup")).define("doBackup", ["backupState","retreive","codeURL","mutable backupState","storageRef","currentNotebook"], _doBackup);
  main.variable(observer("doSkip")).define("doSkip", ["backupState","storageRef","currentNotebook","mutable backupState"], _doSkip);
  main.variable(observer("iterate")).define("iterate", ["backupState","notebooks","cache","codeURL","mutable backupState","fullscan"], _iterate);
  const child4 = runtime.module(define4);
  main.import("fetchp", child4);
  return main;
}
