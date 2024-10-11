import define1 from "./17c8ce433e1df58e@3257.js";
import define2 from "./e93eab08140b49b2@2842.js";
import define3 from "./ef672b935bd480fc@623.js";
import define4 from "./1d309dbd9697e042@705.js";

function _1(md){return(
md`# Notebook Backup All

Scrapes Observable website and backs up all publicly listed notebooks. You need to fork this into your own namespace and adjust`
)}

async function _backup_yml(){return(
{
  prompt:
    "I have a workflow at https://github.com/endpointservices/observable-notebooks/blob/main/.github/workflows/backup.yml can you fetch its contents",
  time: 1728074573452
} &&
  (await (
    await fetch(
      "https://raw.githubusercontent.com/endpointservices/observable-notebooks/main/.github/workflows/backup.yml"
    )
  ).text())
)}

function _3(highlight,backup_yml){return(
highlight(backup_yml)
)}

function _fetchNotebookList(fetchp,DOMParser){return(
{
  prompt:
    "OK the logic works, lets create a function to wrap fetching a page and converting to a list of title + url objects",
  time: 1728076179878
} &&
  async function fetchNotebookList(url) {
    try {
      const response = await fetchp(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const notebookElements = doc.querySelectorAll('a[href^="/@"]');
      const notebooks = Array.from(notebookElements).map((a) => ({
        title: a.textContent.trim(),
        url: `https://observablehq.com${a.getAttribute("href")}`
      }));
      return notebooks.filter(
        (notebook) =>
          notebook.title != "" &&
          /^https:\/\/observablehq.com\/[@\w\-]+\/[\w\-]+$/.test(notebook.url)
      );
    } catch (error) {
      console.error("Error fetching notebooks:", error);
      return [];
    }
  }
)}

function _example_page(fetchNotebookList){return(
fetchNotebookList(
  "https://observablehq.com/@tomlarkworthy?page=1"
)
)}

function _6(highlight,example_page){return(
highlight(example_page)
)}

function _fetchAllNotebooks(fetchNotebookList){return(
{
  prompt:
    "Write a loop that will page through until a page with no results are found and return the total notebook list for a given author",
  time: 1728076425578
} &&
  async function fetchAllNotebooks(author) {
    const notebooks = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `https://observablehq.com/@${author}?page=${page}`;
      const newNotebooks = await fetchNotebookList(url);

      if (newNotebooks.length > 0) {
        notebooks.push(...newNotebooks);
        page++;
      } else {
        hasMore = false;
      }
    }

    return notebooks;
  }
)}

function _notebooks(fetchAllNotebooks){return(
fetchAllNotebooks("tomlarkworthy")
)}

function _backup(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices",
  repo: "observable-notebooks",
  allow: ["tomlarkworthy", "endpointservices"],
  debugProxy: true // Places breakpoint inside dispatch proxy (final step before Github)
})
)}

function _backupAllNotebooks(notebooks,backup){return(
{
  prompt:
    "We need to do have only one concurrent backup at a time and wait for response + 3 seconds before the iterating to the next backup attempt to avoid bursting",
  time: 1728078137382
} &&
  async function backupAllNotebooks() {
    for (let notebook of notebooks) {
      await backup({ url: notebook.url });
      await new Promise((resolve) => setTimeout(resolve, 120000)); // 120 seconds
    }
  }
)}

function _11(Inputs,backupAllNotebooks){return(
Inputs.button("backupall", {
  reduce: () => backupAllNotebooks()
})
)}

function _12($0){return(
$0
)}

function _13(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _14($0){return(
$0
)}

function _15(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _16($0){return(
$0
)}

function _17(md){return(
md`### AI Settings`
)}

function _18($0){return(
$0
)}

function _19($0){return(
$0
)}

function _20($0){return(
$0
)}

function _21(rag){return(
rag
)}

function _22(md){return(
md`---`
)}

function _25(background_tasks){return(
background_tasks
)}

function _27(backupNowButton){return(
backupNowButton()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("backup_yml")).define("backup_yml", _backup_yml);
  main.variable(observer()).define(["highlight","backup_yml"], _3);
  main.variable(observer("fetchNotebookList")).define("fetchNotebookList", ["fetchp","DOMParser"], _fetchNotebookList);
  main.variable(observer("example_page")).define("example_page", ["fetchNotebookList"], _example_page);
  main.variable(observer()).define(["highlight","example_page"], _6);
  main.variable(observer("fetchAllNotebooks")).define("fetchAllNotebooks", ["fetchNotebookList"], _fetchAllNotebooks);
  main.variable(observer("notebooks")).define("notebooks", ["fetchAllNotebooks"], _notebooks);
  main.variable(observer("viewof backup")).define("viewof backup", ["enableGithubBackups"], _backup);
  main.variable(observer("backup")).define("backup", ["Generators", "viewof backup"], (G, _) => G.input(_));
  main.variable(observer("backupAllNotebooks")).define("backupAllNotebooks", ["notebooks","backup"], _backupAllNotebooks);
  main.variable(observer()).define(["Inputs","backupAllNotebooks"], _11);
  main.variable(observer()).define(["viewof prompt"], _12);
  main.variable(observer()).define(["Inputs","suggestion"], _13);
  main.variable(observer()).define(["viewof suggestion"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["viewof context_viz"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _18);
  main.variable(observer()).define(["viewof api_endpoint"], _19);
  main.variable(observer()).define(["viewof settings"], _20);
  main.variable(observer()).define(["rag"], _21);
  main.variable(observer()).define(["md"], _22);
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
  const child2 = runtime.module(define2);
  main.import("extension", "rag", child2);
  main.variable(observer()).define(["background_tasks"], _25);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  main.variable(observer()).define(["backupNowButton"], _27);
  const child4 = runtime.module(define4);
  main.import("enableGithubBackups", child4);
  main.import("backupNowButton", child4);
  return main;
}
