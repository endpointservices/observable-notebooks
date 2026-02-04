function _1(html){return(
html` <h1 style="display: none">Hello Lightning-FS + Isomorphic-git</h1><svg width="100%" viewBox="0 0 900 200" class="banner">
      <style>
      .banner{ background-color: #32C77F; fill: #fff; }
      text {font-size: 36px; font-weight: bold; overflow-wrap: anywhere;}
      </style>
      <text x="50%" y="${200 / 4}" text-anchor="middle" opacity="0.8">
        <tspan x="50%" dy="1.2em">Hello Lightning-FS</tspan>
        <tspan x="50%" dy="1.2em">+ Isomorphic-git</tspan>
      </text>
    </svg>`
)}

function _2(md){return(
md`### How to import`
)}

function _FS(require){return(
require("https://unpkg.com/@isomorphic-git/lightning-fs@4.4.1")
)}

function _git(require){return(
require("https://unpkg.com/isomorphic-git@1.8.1")
)}

function _http(){return(
import("https://unpkg.com/isomorphic-git@beta/http/web/index.js")
)}

function _6(md){return(
md`### Init`
)}

function _fs(FS){return(
new FS("testfs")
)}

function _pfs(fs){return(
fs.promises
)}

function _9(md){return(
md`### Examples`
)}

async function _create_directory(pfs)
{
  try {
    return await pfs.mkdir("/foo"); //EEXIST if opening this page again, FS persists to IndexedDB!
  } catch (err) {
    return err;
  }
}


function _query_stats(create_directory,pfs){return(
create_directory && pfs.stat("/foo")
)}

function _write_foo(create_directory,pfs)
{
  create_directory;
  return pfs.writeFile("/foo/filename.txt", "Hello");
}


function _read_foo(write_foo,pfs)
{
  write_foo;
  return pfs.readFile("/foo/filename.txt", { encoding: "utf8" });
}


function _disk_usage(write_foo,pfs)
{
  write_foo;
  return pfs.du("/foo");
}


function _15(md){return(
md`### GIT!`
)}

function _clone_runtime_repo(create_directory,git,fs,http)
{
  create_directory;
  return git.clone({
    fs,
    http,
    dir: "/runtime",
    corsProxy: "https://cors.isomorphic-git.org",
    url: "https://github.com/observablehq/runtime",
    ref: "main",
    singleBranch: true,
    depth: 10
  });
}


function _17(clone_runtime_repo,pfs,md)
{
  clone_runtime_repo;
  return pfs.readFile("/runtime/README.md", "utf8").then((d) => md`${d}`);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["html"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("FS")).define("FS", ["require"], _FS);
  main.variable(observer("git")).define("git", ["require"], _git);
  main.variable(observer("http")).define("http", _http);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("fs")).define("fs", ["FS"], _fs);
  main.variable(observer("pfs")).define("pfs", ["fs"], _pfs);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("create_directory")).define("create_directory", ["pfs"], _create_directory);
  main.variable(observer("query_stats")).define("query_stats", ["create_directory","pfs"], _query_stats);
  main.variable(observer("write_foo")).define("write_foo", ["create_directory","pfs"], _write_foo);
  main.variable(observer("read_foo")).define("read_foo", ["write_foo","pfs"], _read_foo);
  main.variable(observer("disk_usage")).define("disk_usage", ["write_foo","pfs"], _disk_usage);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("clone_runtime_repo")).define("clone_runtime_repo", ["create_directory","git","fs","http"], _clone_runtime_repo);
  main.variable(observer()).define(["clone_runtime_repo","pfs","md"], _17);
  return main;
}
