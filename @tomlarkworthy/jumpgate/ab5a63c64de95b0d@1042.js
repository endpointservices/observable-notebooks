import define1 from "./893cd17fd1ceac98@21.js";
import define2 from "./09fdee029150048c@443.js";
import define3 from "./db42ae70222a8b08@1033.js";
import define4 from "./03dda470c56b93ff@8385.js";
import define5 from "./00ef42626bb8784f@29.js";
import define6 from "./674c4d9c6d6b8b60@66.js";
import define7 from "./cc0400a7ad6d96d0@2964.js";
import define8 from "./048a17a165be198d@273.js";
import define9 from "./0e0b35a92c819d94@474.js";
import define10 from "./98f34e974bb2e4bc@699.js";
import define11 from "./1a271ff51d899f30@488.js";
import define12 from "./db80e603859226c1@23.js";

async function _1(FileAttachment,md){return(
md`<div>
  <h1 style="display: none">Jumpgate</h1>
  ${await FileAttachment("image (7) (1).png").image({width: 640})}
</div>`
)}

function _2(md){return(
md`Jumpgate takes an ordinary notebook from Observable, mixes it with extra tooling (the frame), and exports it to a single lopecode file, which you can optionally push to Github, preview or download as an offline-first file.

We use this approach to mixin userspace tooling implemented notebook tooling, like an editor and a notebook explorer. The resultant file is enriched, including the ability to self-edit and reserialize itself, but now without an internet connection and openable as a \`file://\` domain.

This notebook be automated via url parameters (see [my lopebooks](https://observablehq.com/@tomlarkworthy/my-lopebooks)).

⚠️ the userspace tooling is under active development.

[Youtube intro video](https://www.youtube.com/watch?v=1UQMFp0wz-Q)`
)}

function _3(md){return(
md`### Changes
- 2025-05-17 [Avoid cloning the remote](https://bsky.app/profile/larkworthy.bsky.social/post/3lpetshkbes2i) buy using a blank repositor (rolled back as this does not work when overwriting existing files)
- 2025-05-17 Fixed bug that was not exploiting the cache properly, or switching branches cleanly.`
)}

function _4(md){return(
md`## Source Configuration`
)}

function _source(Inputs,urlQueryFieldView){return(
Inputs.bind(
  Inputs.text({
    label: "source",
    width: "100%"
  }),
  urlQueryFieldView("source", {
    defaultValue: "https://observablehq.com/@tomlarkworthy/jumpgate"
  })
)
)}

function _frame(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: "frame",
    width: "100%"
  }),
  localStorageView("frame", {
    defaultValue: "https://observablehq.com/@tomlarkworthy/lopepage"
  })
)
)}

function _7(md){return(
md`We set the [export_state.json](https://observablehq.com/@tomlarkworthy/exporter#exportState) configuration file so that subsequent exports keep settings, and open with the main notebook first with the module selection.`
)}

function _export_state_text(Inputs,urlQueryFieldView,source_notebook){return(
Inputs.bind(
  Inputs.textarea({
    label: "export_state.json",
    rows: 8
  }),
  urlQueryFieldView("export_state", {
    defaultValue: JSON.stringify(
      {
        options: {
          headless: true
        },
        hash: `#view=S100%28${encodeURIComponent(
          source_notebook
        )}%2C%40tomlarkworthy%2Fmodule-selection%29`
      },
      null,
      2
    )
  })
)
)}

function _load_source(Inputs,urlQueryFieldView){return(
Inputs.bind(
  Inputs.toggle({
    label: "load source"
  }),
  urlQueryFieldView("load_source", {
    defaultValue: false,
    decode: JSON.parse
  })
)
)}

function _10(md){return(
md`**The following lines error until you instruct the notebook to call the Observable API by ticking the box above.**`
)}

function _11(Inputs,exported){return(
Inputs.textarea({
  label: "export",
  value: exported.source,
  width: "100%",
  disabled: true,
  rows: 20
})
)}

function _12(Inputs,exported){return(
Inputs.button("preview", {
  reduce: () => {
    const url = URL.createObjectURL(
      new Blob([exported.source], { type: "text/html" })
    );
    window.open(url, "_blank");
  }
})
)}

function _13(Inputs,exported,source_notebook,getCompactISODate){return(
Inputs.button("download", {
  reduce: () => {
    const url = URL.createObjectURL(
      new Blob([exported.source], { type: "text/html" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${source_notebook}_${getCompactISODate()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
})
)}

function _14(md){return(
md`## Target Repository

Here is configuration of the target git repository. You will need to add a personal access token to give the notebook the authority to write to branches.`
)}

function _target_git(Inputs,urlQueryFieldView){return(
Inputs.bind(
  Inputs.text({
    label: "git URL",
    width: "100%"
  }),
  urlQueryFieldView("git_url", {
    defaultValue: "https://github.com/tomlarkworthy/lopebooks"
  })
)
)}

function _github_token(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.password({
    label: "Github token (saved to local storage)"
  }),
  localStorageView("jumpgate_github_token")
)
)}

function _corsProxy(Inputs){return(
Inputs.text({
  label: "cors proxy",
  value: "https://isomorphic.endpointservices.workers.dev"
})
)}

function _wipe_filesystem(Inputs){return(
Inputs.toggle({
  label: "wipe filesystem",
  value: false
})
)}

function _commit(Inputs,urlQueryFieldView){return(
Inputs.bind(
  Inputs.toggle({
    label: "commit"
  }),
  urlQueryFieldView("commit", {
    defaultValue: false,
    decode: JSON.parse
  })
)
)}

function _20(md){return(
md`**The following line will error until you instruct the notebook to perform git operations by ticking \`commit\`** the checkbox above. The git checkout state is persisted to IndexDB using lighning-fs and isomorphic-git, if the notebook gets stuck, you might find checking "wipe filesystem" helps reset the state.
`
)}

function _21(push_git,target_git,ref,htl){return(
htl.html`${push_git && ""}
<a href="${target_git}/compare/${ref}" target="_blank">Create Github Pull Request</a>`
)}

function _22(md){return(
md`---`
)}

function _23(md){return(
md`# Implementation`
)}

function _24(md){return(
md`## TODO
- <strike>git is not caught up (pull/merge missing)
- each upstream origin should be own repo directory</strike>
- <strike>double file attachments
  - file attachments move from source to page</strike>
- <strike>make offline first (including runtime)</strike>
- Refreshing overwrites loses current hash URL
- d/2efed83da255d4dd id named notebooks don;t work`
)}

function _25(md){return(
md`isomorphic-git [docs](https://isomorphic-git.org/docs/en/alphabetic)`
)}

function _26(md){return(
md`## Source to filesystem`
)}

function _source_notebook(source){return(
source.trim().replace("https://observablehq.com/", "")
)}

function _frame_notebook(frame){return(
frame.trim().replace("https://observablehq.com/", "")
)}

function _notebook_filename(source_notebook){return(
source_notebook.replace("/", "_") + ".html"
)}

function _embedded_runtime(Library,Runtime,invalidation)
{
  const library = new Library();
  const runtime = new Runtime(library);
  invalidation.then(() => runtime.dispose());
  return runtime;
}


async function _frame_define(load_source,frame_notebook)
{
  if (!load_source) throw "Load source not ticked";
  return (await import(`https://api.observablehq.com/${frame_notebook}.js?v=4`))
    .default;
}


async function _source_define(load_source,source_notebook)
{
  if (!load_source) throw "Load source not ticked";
  return (
    await import(`https://api.observablehq.com/${source_notebook}.js?v=4`)
  ).default;
}


function _embedded_frame(embedded_runtime,frame_define){return(
embedded_runtime.module(frame_define)
)}

function _embedded_source(embedded_runtime,source_define){return(
embedded_runtime.module(source_define)
)}

function _output(){return(
undefined
)}

async function _modules(embedded_frame,embedded_source,moduleMap,embedded_runtime)
{
  embedded_frame;
  embedded_source;
  const modules = await moduleMap(embedded_runtime);

  return modules;
}


function _check_module_map_invariants(expect,modules,embedded_frame,embedded_source)
{
  expect(modules.get(embedded_frame)).toBeDefined();
  expect(modules.get(embedded_source)).toBeDefined();
}


function _module_selections(modules){return(
[...modules.values()].filter(
  (info) => info.name == "@tomlarkworthy/module-selection"
)
)}

function _exporters(modules){return(
[...modules.values()].filter(
  (info) => info.name == "@tomlarkworthy/exporter"
)
)}

function _register_additional_module(embedded_frame,embedded_source,module_selections,jsonFileAttachment,source_notebook,setFileAttachment)
{
  embedded_frame;
  embedded_source;

  return Promise.all(
    module_selections.map(async (module_selection) => {
      const file = jsonFileAttachment("additionalModules.json", [
        source_notebook
      ]);
      setFileAttachment(file, module_selection.module);
    })
  );
}


function _export_state(export_state_text){return(
JSON.parse(export_state_text)
)}

function _register_export_state(embedded_frame,embedded_source,exporters,jsonFileAttachment,export_state,setFileAttachment)
{
  embedded_frame;
  embedded_source;

  return Promise.all(
    exporters.map(async (exporter) => {
      const file = jsonFileAttachment("export_state.json", export_state);
      setFileAttachment(file, exporter.module);
    })
  );
}


function _exported(register_additional_module,register_export_state,exportToHTML,frame_notebook,embedded_frame,source_notebook,embedded_source,export_state,default_style,$0)
{
  register_additional_module;
  register_export_state;
  debugger;
  return exportToHTML({
    notebook: frame_notebook,
    module: embedded_frame,
    modules: new Map([[source_notebook, embedded_source]]),
    options: {
      ...export_state.options,
      debug: false,
      headless: true,
      main_files: false,
      style: default_style,
      output: (out) => ($0.value = out)
    }
  });
}


function _tasks(tomlarkworthy_exporter_task)
{
  tomlarkworthy_exporter_task;
}


function _dir(target_git){return(
"/" +
  target_git.replace("https://", "").replaceAll("/", "_").replaceAll(".", "_")
)}

function _filesystem(FS,wipe_filesystem){return(
new FS("jumpgate", {
  wipe: wipe_filesystem
}).promises
)}

async function _update_main_branch(commit,filesystem,dir,git,http,corsProxy,target_git)
{
  if (!commit) throw "skipped";
  try {
    await filesystem.lstat(dir);
    await git.fetch({
      fs: filesystem,
      filesystem,
      http,
      dir,
      corsProxy: corsProxy,
      url: target_git,
      ref: "main",
      remoteRef: "main",
      singleBranch: true
    });
  } catch (err) {
    return git.clone({
      fs: filesystem,
      filesystem,
      http,
      dir,
      corsProxy: corsProxy,
      url: target_git,
      ref: "main",
      //noCheckout: true,
      singleBranch: true
    });
  }
}


function _ref(dir,wipe_filesystem,notebook_filename,getCompactISODate)
{
  dir;
  wipe_filesystem;
  return notebook_filename + "_" + getCompactISODate();
}


async function _branch_to_ref(update_main_branch,git,filesystem,dir,ref)
{
  update_main_branch;
  return await git.branch({
    fs: filesystem,
    object: "origin/main",
    dir,
    ref,
    checkout: true
  });
}


async function _create_directory(branch_to_ref,filesystem,dir)
{
  branch_to_ref;
  try {
    return await filesystem.mkdir(`${dir}/notebooks`); //EEXIST if opening this page again, FS persists to IndexedDB!
  } catch (err) {
    if (err.message === "EEXIST") {
      return;
    } else {
      throw err;
    }
  }
}


async function _write_notebook(create_directory,filesystem,dir,notebook_filename,exported)
{
  create_directory;
  return await filesystem.writeFile(
    `${dir}/notebooks/${notebook_filename}`,
    exported.source
  );
}


async function _filepaths(write_notebook,filesystem)
{
  write_notebook;
  const paths = [];
  async function walk(d) {
    for (const name of await filesystem.readdir(d)) {
      const p = d === "/" ? `/${name}` : `${d}/${name}`;
      const stat = await filesystem.stat(p);
      debugger;
      if (stat.type === "dir") {
        await walk(p);
      } else {
        paths.push(p);
      }
    }
  }
  await walk("/");
  return paths;
}


function _written_file(write_notebook,filesystem,dir,notebook_filename)
{
  write_notebook;
  return filesystem.readFile(`${dir}/notebooks/${notebook_filename}`, {
    encoding: "utf8"
  });
}


function _add_git(written_file,git,filesystem,dir)
{
  written_file;
  return git.add({
    fs: filesystem,
    dir,
    filepath: "." //`notebooks/${notebook_filename}`
  });
}


function _commit_git(commit,add_git,git,filesystem,dir,ref)
{
  if (!commit) throw "skipped";

  add_git;
  return git.commit({
    fs: filesystem,
    dir,
    author: {
      name: "Jumpgate",
      email: "jumpgate@lopecode.com"
    },
    message: `Jumpgate for ${ref}`
  });
}


function _push_git(commit_git,git,filesystem,http,dir,ref,corsProxy,github_token)
{
  commit_git;
  return git.push({
    fs: filesystem,
    force: true,
    http,
    dir,
    remote: "origin",
    ref,
    corsProxy: corsProxy,
    remoteRef: ref,
    onAuth: () => ({ username: github_token })
  });
}


function _57(md){return(
md`## Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image (7) (1).png", {url: new URL("./files/9ed511baa571900694d033daa910a077df744ab8d3caf01e021ee021129d85ac3d1389f40c35906c72a02b9703d19d8d865e7b3904b0346f2f094662dec8b4f3.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs","urlQueryFieldView"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("viewof frame")).define("viewof frame", ["Inputs","localStorageView"], _frame);
  main.variable(observer("frame")).define("frame", ["Generators", "viewof frame"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof export_state_text")).define("viewof export_state_text", ["Inputs","urlQueryFieldView","source_notebook"], _export_state_text);
  main.variable(observer("export_state_text")).define("export_state_text", ["Generators", "viewof export_state_text"], (G, _) => G.input(_));
  main.variable(observer("viewof load_source")).define("viewof load_source", ["Inputs","urlQueryFieldView"], _load_source);
  main.variable(observer("load_source")).define("load_source", ["Generators", "viewof load_source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Inputs","exported"], _11);
  main.variable(observer()).define(["Inputs","exported"], _12);
  main.variable(observer()).define(["Inputs","exported","source_notebook","getCompactISODate"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof target_git")).define("viewof target_git", ["Inputs","urlQueryFieldView"], _target_git);
  main.variable(observer("target_git")).define("target_git", ["Generators", "viewof target_git"], (G, _) => G.input(_));
  main.variable(observer("viewof github_token")).define("viewof github_token", ["Inputs","localStorageView"], _github_token);
  main.variable(observer("github_token")).define("github_token", ["Generators", "viewof github_token"], (G, _) => G.input(_));
  main.variable(observer("viewof corsProxy")).define("viewof corsProxy", ["Inputs"], _corsProxy);
  main.variable(observer("corsProxy")).define("corsProxy", ["Generators", "viewof corsProxy"], (G, _) => G.input(_));
  main.variable(observer("viewof wipe_filesystem")).define("viewof wipe_filesystem", ["Inputs"], _wipe_filesystem);
  main.variable(observer("wipe_filesystem")).define("wipe_filesystem", ["Generators", "viewof wipe_filesystem"], (G, _) => G.input(_));
  main.variable(observer("viewof commit")).define("viewof commit", ["Inputs","urlQueryFieldView"], _commit);
  main.variable(observer("commit")).define("commit", ["Generators", "viewof commit"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["push_git","target_git","ref","htl"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("source_notebook")).define("source_notebook", ["source"], _source_notebook);
  main.variable(observer("frame_notebook")).define("frame_notebook", ["frame"], _frame_notebook);
  main.variable(observer("notebook_filename")).define("notebook_filename", ["source_notebook"], _notebook_filename);
  main.variable(observer("embedded_runtime")).define("embedded_runtime", ["Library","Runtime","invalidation"], _embedded_runtime);
  main.variable(observer("frame_define")).define("frame_define", ["load_source","frame_notebook"], _frame_define);
  main.variable(observer("source_define")).define("source_define", ["load_source","source_notebook"], _source_define);
  main.variable(observer("embedded_frame")).define("embedded_frame", ["embedded_runtime","frame_define"], _embedded_frame);
  main.variable(observer("embedded_source")).define("embedded_source", ["embedded_runtime","source_define"], _embedded_source);
  main.define("initial output", _output);
  main.variable(observer("mutable output")).define("mutable output", ["Mutable", "initial output"], (M, _) => new M(_));
  main.variable(observer("output")).define("output", ["mutable output"], _ => _.generator);
  main.variable(observer("modules")).define("modules", ["embedded_frame","embedded_source","moduleMap","embedded_runtime"], _modules);
  main.variable(observer("check_module_map_invariants")).define("check_module_map_invariants", ["expect","modules","embedded_frame","embedded_source"], _check_module_map_invariants);
  main.variable(observer("module_selections")).define("module_selections", ["modules"], _module_selections);
  main.variable(observer("exporters")).define("exporters", ["modules"], _exporters);
  main.variable(observer("register_additional_module")).define("register_additional_module", ["embedded_frame","embedded_source","module_selections","jsonFileAttachment","source_notebook","setFileAttachment"], _register_additional_module);
  main.variable(observer("export_state")).define("export_state", ["export_state_text"], _export_state);
  main.variable(observer("register_export_state")).define("register_export_state", ["embedded_frame","embedded_source","exporters","jsonFileAttachment","export_state","setFileAttachment"], _register_export_state);
  main.variable(observer("exported")).define("exported", ["register_additional_module","register_export_state","exportToHTML","frame_notebook","embedded_frame","source_notebook","embedded_source","export_state","default_style","mutable output"], _exported);
  main.variable(observer("tasks")).define("tasks", ["tomlarkworthy_exporter_task"], _tasks);
  main.variable(observer("dir")).define("dir", ["target_git"], _dir);
  main.variable(observer("filesystem")).define("filesystem", ["FS","wipe_filesystem"], _filesystem);
  main.variable(observer("update_main_branch")).define("update_main_branch", ["commit","filesystem","dir","git","http","corsProxy","target_git"], _update_main_branch);
  main.variable(observer("ref")).define("ref", ["dir","wipe_filesystem","notebook_filename","getCompactISODate"], _ref);
  main.variable(observer("branch_to_ref")).define("branch_to_ref", ["update_main_branch","git","filesystem","dir","ref"], _branch_to_ref);
  main.variable(observer("create_directory")).define("create_directory", ["branch_to_ref","filesystem","dir"], _create_directory);
  main.variable(observer("write_notebook")).define("write_notebook", ["create_directory","filesystem","dir","notebook_filename","exported"], _write_notebook);
  main.variable(observer("filepaths")).define("filepaths", ["write_notebook","filesystem"], _filepaths);
  main.variable(observer("written_file")).define("written_file", ["write_notebook","filesystem","dir","notebook_filename"], _written_file);
  main.variable(observer("add_git")).define("add_git", ["written_file","git","filesystem","dir"], _add_git);
  main.variable(observer("commit_git")).define("commit_git", ["commit","add_git","git","filesystem","dir","ref"], _commit_git);
  main.variable(observer("push_git")).define("push_git", ["commit_git","git","filesystem","http","dir","ref","corsProxy","github_token"], _push_git);
  main.variable(observer()).define(["md"], _57);
  const child1 = runtime.module(define1);
  main.import("Runtime", child1);
  main.import("Inspector", child1);
  main.import("Library", child1);
  main.import("RuntimeError", child1);
  const child2 = runtime.module(define2);
  main.import("getFileAttachment", child2);
  main.import("setFileAttachment", child2);
  main.import("removeFileAttachment", child2);
  main.import("attachments", child2);
  main.import("jsonFileAttachment", child2);
  const child3 = runtime.module(define3);
  main.import("moduleMap", child3);
  const child4 = runtime.module(define4);
  main.import("exportToHTML", child4);
  main.import("default_style", child4);
  main.import("tomlarkworthy_exporter_task", child4);
  main.import("getCompactISODate", child4);
  const child5 = runtime.module(define5);
  main.import("FS", child5);
  const child6 = runtime.module(define6);
  main.import("git", child6);
  main.import("http", child6);
  const child7 = runtime.module(define7);
  main.import("page", child7);
  main.import("background_jobs", child7);
  const child8 = runtime.module(define8);
  main.import("localStorageView", child8);
  const child9 = runtime.module(define9);
  main.import("flowQueue", child9);
  const child10 = runtime.module(define10);
  main.import("toObject", child10);
  const child11 = runtime.module(define11);
  main.import("urlQueryFieldView", child11);
  const child12 = runtime.module(define12);
  main.import("expect", child12);
  return main;
}
