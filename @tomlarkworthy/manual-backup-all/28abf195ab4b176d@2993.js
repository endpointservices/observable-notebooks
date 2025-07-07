import define1 from "./ef672b935bd480fc@623.js";
import define2 from "./03dda470c56b93ff@8246.js";
import define3 from "./1d309dbd9697e042@705.js";

function _1(md){return(
md`# Notebook Backup All

Note this also has a manual scraping script

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

function _backupAllNotebooks(backup){return(
{
  prompt:
    "We need to do have only one concurrent backup at a time and wait for response + 3 seconds before the iterating to the next backup attempt to avoid bursting",
  time: 1728078137382
} &&
  async function backupAllNotebooks(notebooks) {
    for (let notebook of notebooks) {
      await backup({ url: notebook.url });
      await new Promise((resolve) => setTimeout(resolve, 60000)); // 60 seconds
    }
  }
)}

function _9(Inputs,backupAllNotebooks,notebooks){return(
Inputs.button("backupall", {
  reduce: () => backupAllNotebooks(notebooks)
})
)}

function _10(md){return(
md`---`
)}

function _11(md){return(
md`### Getting all notebooks manually with some help in the console`
)}

function _12(md){return(
md`
In the console I executed
\`\`\`js
const notebooks = new Set();

// then I paged through all my notebooks and added 30 at a time using

[...document.querySelectorAll("a[title]")].map(h => h.href).filter(url => !url.includes("&page")).forEach(url => notebooks.add(url))

\`\`\`

and the "copy value" the notebook variable`
)}

function _manual_notebooks(){return(
new Set([
  "https://observablehq.com/@tomlarkworthy/manual-backup-all",
  "https://observablehq.com/d/88337fee594fe0b6",
  "https://observablehq.com/@tomlarkworthy/jumpgate",
  "https://observablehq.com/@tomlarkworthy/lopecode-tour",
  "https://observablehq.com/@tomlarkworthy/my-lopebooks",
  "https://observablehq.com/@tomlarkworthy/lopecode-vision",
  "https://observablehq.com/@tomlarkworthy/exporter",
  "https://observablehq.com/@tomlarkworthy/codemirror-6-v2",
  "https://observablehq.com/@tomlarkworthy/editor-4",
  "https://observablehq.com/@tomlarkworthy/runtime-sdk",
  "https://observablehq.com/@tomlarkworthy/observablejs-toolchain",
  "https://observablehq.com/@tomlarkworthy/agentic-planner",
  "https://observablehq.com/@tomlarkworthy/cell-map",
  "https://observablehq.com/@tomlarkworthy/perspective-transform",
  "https://observablehq.com/d/86aa5f9cb1e3ef31",
  "https://observablehq.com/@tomlarkworthy/manipulate",
  "https://observablehq.com/@tomlarkworthy/lopepage",
  "https://observablehq.com/@tomlarkworthy/visualizer",
  "https://observablehq.com/@tomlarkworthy/stream-operators",
  "https://observablehq.com/@tomlarkworthy/flow-queue",
  "https://observablehq.com/@tomlarkworthy/lopepage-urls",
  "https://observablehq.com/@tomlarkworthy/robocoop",
  "https://observablehq.com/@tomlarkworthy/module-selection",
  "https://observablehq.com/@tomlarkworthy/local-storage-view",
  "https://observablehq.com/@tomlarkworthy/reversible-attachment",
  "https://observablehq.com/@tomlarkworthy/import-notebook",
  "https://observablehq.com/@tomlarkworthy/tester",
  "https://observablehq.com/@tomlarkworthy/minecraft-servers-be",
  "https://observablehq.com/@tomlarkworthy/module-map",
  "https://observablehq.com/@tomlarkworthy/aws4fetch",
  "https://observablehq.com/@tomlarkworthy?tab=recents",
  "https://observablehq.com/@tomlarkworthy/fileattachments",
  "https://observablehq.com/@tomlarkworthy/robocoop-2",
  "https://observablehq.com/@tomlarkworthy/testing",
  "https://observablehq.com/@tomlarkworthy/es-module-shims",
  "https://observablehq.com/@tomlarkworthy/jest-expect-standalone",
  "https://observablehq.com/@tomlarkworthy/observable-notes",
  "https://observablehq.com/@tomlarkworthy/micro-kernel-design",
  "https://observablehq.com/@tomlarkworthy/observable-runtime",
  "https://observablehq.com/@tomlarkworthy/svg-boinger",
  "https://observablehq.com/d/be9bb4e5730903ef",
  "https://observablehq.com/@tomlarkworthy/openai-responses-api",
  "https://observablehq.com/@tomlarkworthy/debugger",
  "https://observablehq.com/@tomlarkworthy/editable-exports",
  "https://observablehq.com/@tomlarkworthy/dataeditor",
  "https://observablehq.com/@tomlarkworthy/editor-3",
  "https://observablehq.com/@tomlarkworthy/export-to-html-example",
  "https://observablehq.com/d/ae9a1ab60441b8ab",
  "https://observablehq.com/@tomlarkworthy/codemirror-6-22-2-view",
  "https://observablehq.com/@tomlarkworthy/codemirror-6",
  "https://observablehq.com/d/5c9a6c2c6e7ae936",
  "https://observablehq.com/@tomlarkworthy/fsm",
  "https://observablehq.com/@tomlarkworthy/summarizejs",
  "https://observablehq.com/@tomlarkworthy/inspector",
  "https://observablehq.com/@tomlarkworthy/highlight",
  "https://observablehq.com/@tomlarkworthy/editor-2",
  "https://observablehq.com/d/7748588c3be19bbb",
  "https://observablehq.com/d/0a03f7035073f8a3",
  "https://observablehq.com/d/397ad7c5e572c9d1",
  "https://observablehq.com/@tomlarkworthy/open-ai-embeddings",
  "https://observablehq.com/@tomlarkworthy/reactive-reflective-testing",
  "https://observablehq.com/@tomlarkworthy/sequencer",
  "https://observablehq.com/@tomlarkworthy/juice",
  "https://observablehq.com/@tomlarkworthy/audio-inputs",
  "https://observablehq.com/@tomlarkworthy/paste-codegen",
  "https://observablehq.com/d/889bfbe3fdab9dec",
  "https://observablehq.com/@tomlarkworthy/copy-code",
  "https://observablehq.com/@tomlarkworthy/browser-fs-access",
  "https://observablehq.com/@tomlarkworthy/file-system-api",
  "https://observablehq.com/d/fc62748ad3c632e6",
  "https://observablehq.com/@tomlarkworthy/robocoop-eval",
  "https://observablehq.com/d/a9efd6519d13098e",
  "https://observablehq.com/@tomlarkworthy/1-million-row-parquet-challenge",
  "https://observablehq.com/@tomlarkworthy/url-query-field-view",
  "https://observablehq.com/@tomlarkworthy/minicell",
  "https://observablehq.com/@tomlarkworthy/escodegen",
  "https://observablehq.com/@tomlarkworthy/notebook-semantics",
  "https://observablehq.com/@tomlarkworthy/dependancy",
  "https://observablehq.com/d/59fad01c55cb58a0",
  "https://observablehq.com/d/3c9c1a12c5442093",
  "https://observablehq.com/@tomlarkworthy/content-editable-text",
  "https://observablehq.com/@tomlarkworthy/retro-title-graphic",
  "https://observablehq.com/@tomlarkworthy/isomorphic-git-1-30-1",
  "https://observablehq.com/@tomlarkworthy/lightning-fs-4-6-0",
  "https://observablehq.com/d/c4c916e2ef396483",
  "https://observablehq.com/@tomlarkworthy/golden-layout-2-6-0",
  "https://observablehq.com/@tomlarkworthy/wormhole2",
  "https://observablehq.com/@tomlarkworthy/wormhole",
  "https://observablehq.com/@tomlarkworthy/editor",
  "https://observablehq.com/@tomlarkworthy/view",
  "https://observablehq.com/@tomlarkworthy/dom-view",
  "https://observablehq.com/@tomlarkworthy/exporter",
  "https://observablehq.com/@tomlarkworthy/cell-editor",
  "https://observablehq.com/d/d472ec3b674d028b",
  "https://observablehq.com/@tomlarkworthy/codemirror-6-22-2-view",
  "https://observablehq.com/@tomlarkworthy/codemirror-6",
  "https://observablehq.com/@tomlarkworthy/lazer-cut-shell-joints",
  "https://observablehq.com/@tomlarkworthy/ndd",
  "https://observablehq.com/@tomlarkworthy/whisper-input",
  "https://observablehq.com/@tomlarkworthy/footer",
  "https://observablehq.com/@tomlarkworthy/notebook-snapshot",
  "https://observablehq.com/@tomlarkworthy/robocoop",
  "https://observablehq.com/@tomlarkworthy/view",
  "https://observablehq.com/@tomlarkworthy/observablejs-toolchain",
  "https://observablehq.com/@tomlarkworthy/escodegen",
  "https://observablehq.com/@tomlarkworthy/local-storage-view",
  "https://observablehq.com/@tomlarkworthy/inspector",
  "https://observablehq.com/@tomlarkworthy/aws4fetch",
  "https://observablehq.com/@tomlarkworthy/flow-queue",
  "https://observablehq.com/@tomlarkworthy/dom-view",
  "https://observablehq.com/@tomlarkworthy/reconcile-nanomorph",
  "https://observablehq.com/@tomlarkworthy/testing",
  "https://observablehq.com/@tomlarkworthy/ui-development",
  "https://observablehq.com/@tomlarkworthy/highlight",
  "https://observablehq.com/@tomlarkworthy/reversible-attachment",
  "https://observablehq.com/d/0bd3e9d02bf32698",
  "https://observablehq.com/@tomlarkworthy/x-ray-slurper",
  "https://observablehq.com/@tomlarkworthy/robocoop-blank-slate",
  "https://observablehq.com/@tomlarkworthy/notebook-semantics",
  "https://observablehq.com/@tomlarkworthy/rag-extension",
  "https://observablehq.com/@tomlarkworthy/robocoop-2024-10-17",
  "https://observablehq.com/@tomlarkworthy?tab=notebooks",
  "https://observablehq.com/@tomlarkworthy/oauth-examples",
  "https://observablehq.com/@tomlarkworthy/youtube-upload",
  "https://observablehq.com/d/d6818c2c7f169187",
  "https://observablehq.com/@tomlarkworthy/dependancy",
  "https://observablehq.com/@tomlarkworthy/openai-realtime-api",
  "https://observablehq.com/@tomlarkworthy/juice",
  "https://observablehq.com/@tomlarkworthy/sticky-view",
  "https://observablehq.com/@tomlarkworthy/scrape-notebook-history",
  "https://observablehq.com/@tomlarkworthy/notebook-rag",
  "https://observablehq.com/@tomlarkworthy/manual-backup-all",
  "https://observablehq.com/@tomlarkworthy/github-backups",
  "https://observablehq.com/d/0cfc303bee434d0a",
  "https://observablehq.com/d/cef0a81af7d7549d",
  "https://observablehq.com/d/a95022c51b8e85d9",
  "https://observablehq.com/@tomlarkworthy/duckdb-1-27-0",
  "https://observablehq.com/d/1f3329951555c7f1",
  "https://observablehq.com/@tomlarkworthy/ai-tdd-template",
  "https://observablehq.com/d/fcf22f590074cc03",
  "https://observablehq.com/d/252197f9d8bb2d7f",
  "https://observablehq.com/@tomlarkworthy/runtime-decompiler",
  "https://observablehq.com/@tomlarkworthy/robocoop-skills",
  "https://observablehq.com/d/4771cda6e0c1faca",
  "https://observablehq.com/d/85dbe3fb251135a3",
  "https://observablehq.com/d/d93957fcf7d6025a",
  "https://observablehq.com/d/bdff5071d36da1c9",
  "https://observablehq.com/d/068d5883e3b95625",
  "https://observablehq.com/d/6ff8cd8fdf01d8eb",
  "https://observablehq.com/d/ecf787b2cbb134a4",
  "https://observablehq.com/@tomlarkworthy/userspace-editor",
  "https://observablehq.com/@tomlarkworthy/cells-to-clipboard",
  "https://observablehq.com/@tomlarkworthy/paste-codegen",
  "https://observablehq.com/d/96b6dfdcea93701e",
  "https://observablehq.com/d/7ae3bf57bacfde91",
  "https://observablehq.com/@tomlarkworthy/simple-prompt",
  "https://observablehq.com/d/4e60af4b55b620f1",
  "https://observablehq.com/@tomlarkworthy/fsm",
  "https://observablehq.com/@tomlarkworthy/twitch-webhook",
  "https://observablehq.com/d/e627aaaaa9857257",
  "https://observablehq.com/@tomlarkworthy/lazer-cut-plant-pot",
  "https://observablehq.com/d/56315133960a2175",
  "https://observablehq.com/d/6a9cafad13816f19",
  "https://observablehq.com/@tomlarkworthy/tabbed-pane-view",
  "https://observablehq.com/d/2320fab09283ad21",
  "https://observablehq.com/@tomlarkworthy/svg-boinger",
  "https://observablehq.com/@tomlarkworthy/minecraft-servers",
  "https://observablehq.com/@tomlarkworthy/single-stroke-font",
  "https://observablehq.com/@tomlarkworthy/simplest-cms",
  "https://observablehq.com/d/e8237b40dca127a5",
  "https://observablehq.com/d/88337fee594fe0b6",
  "https://observablehq.com/d/ed0f1dcee5434a99",
  "https://observablehq.com/d/126c7605e0e65eb0",
  "https://observablehq.com/@tomlarkworthy/lazer-cutting-notebook",
  "https://observablehq.com/@tomlarkworthy/colossal-cave-chatgpt-challange",
  "https://observablehq.com/d/bc2455e46c3adaba",
  "https://observablehq.com/@tomlarkworthy/rtdb-protocol",
  "https://observablehq.com/@tomlarkworthy/status-code-tests",
  "https://observablehq.com/d/85abb51748e1d1cb",
  "https://observablehq.com/@tomlarkworthy/blueswireless-2022-06-14",
  "https://observablehq.com/@tomlarkworthy/expression-fuzzer",
  "https://observablehq.com/@tomlarkworthy/jsqrcode",
  "https://observablehq.com/@tomlarkworthy/grid",
  "https://observablehq.com/@tomlarkworthy/ink",
  "https://observablehq.com/@tomlarkworthy/saas-tutorial",
  "https://observablehq.com/@tomlarkworthy/copy-code",
  "https://observablehq.com/@tomlarkworthy/notebooks2021",
  "https://observablehq.com/@tomlarkworthy/repository-dispatch",
  "https://observablehq.com/@tomlarkworthy/switch-dataflow",
  "https://observablehq.com/@tomlarkworthy/observable-tour",
  "https://observablehq.com/d/df82a934d9f2a59f",
  "https://observablehq.com/@tomlarkworthy/hacker-favourites-analysis",
  "https://observablehq.com/@tomlarkworthy/ui-guidelines",
  "https://observablehq.com/@tomlarkworthy/sign-a-pdf",
  "https://observablehq.com/@tomlarkworthy/wonder",
  "https://observablehq.com/@tomlarkworthy/aws-serverless-password",
  "https://observablehq.com/@tomlarkworthy/merge-dataflow",
  "https://observablehq.com/@tomlarkworthy/chat-application",
  "https://observablehq.com/@tomlarkworthy/sound-cloud-reactive-audio-visualizer",
  "https://observablehq.com/@tomlarkworthy/blog-dont-aggregate-your-metrics",
  "https://observablehq.com/@tomlarkworthy/viewroutine",
  "https://observablehq.com/d/fc269352ce678fc9",
  "https://observablehq.com/d/3f62e88eeeac7418",
  "https://observablehq.com/@tomlarkworthy/view-examples",
  "https://observablehq.com/@tomlarkworthy/n-door-monty-hall",
  "https://observablehq.com/@tomlarkworthy/agency-wisdom-from-monty-hall",
  "https://observablehq.com/@tomlarkworthy/fileinput",
  "https://observablehq.com/d/3ec13d6fd7e5d082",
  "https://observablehq.com/@tomlarkworthy/multi-tenancy-puppeteer",
  "https://observablehq.com/@tomlarkworthy/blog-theme",
  "https://observablehq.com/@tomlarkworthy/howto-import-react-application",
  "https://observablehq.com/@tomlarkworthy/lazer-simulator",
  "https://observablehq.com/@tomlarkworthy/svg-twist",
  "https://observablehq.com/@tomlarkworthy/blog-firestores-technical-advantages",
  "https://observablehq.com/@tomlarkworthy/blog-how-cloud-run-changes-cloud-architecture",
  "https://observablehq.com/@tomlarkworthy/bluetooth",
  "https://observablehq.com/@tomlarkworthy/story-tube-help-the-sad-king",
  "https://observablehq.com/@tomlarkworthy/svg-to-gif",
  "https://observablehq.com/@tomlarkworthy/argon2",
  "https://observablehq.com/@tomlarkworthy/most-favorited-hacker-news-youtube-videos",
  "https://observablehq.com/@tomlarkworthy/animation",
  "https://observablehq.com/@tomlarkworthy/animated-kirigami",
  "https://observablehq.com/@tomlarkworthy/vertical-sliders",
  "https://observablehq.com/@tomlarkworthy/blog-market-for-lemons",
  "https://observablehq.com/@tomlarkworthy/cells",
  "https://observablehq.com/@tomlarkworthy/pause-and-play-book",
  "https://observablehq.com/@tomlarkworthy/rate-estimation",
  "https://observablehq.com/@tomlarkworthy/logo",
  "https://observablehq.com/d/a0d5dac39ca73e2e",
  "https://observablehq.com/@tomlarkworthy/infinite-kirigami-the-endless-wall",
  "https://observablehq.com/@tomlarkworthy/parametric-kirigami-the-castle-wall",
  "https://observablehq.com/@tomlarkworthy/kirigami-turret",
  "https://observablehq.com/d/99142b2e889059ae",
  "https://observablehq.com/@tomlarkworthy/blog-first-post",
  "https://observablehq.com/@tomlarkworthy/wax-bead-crafts",
  "https://observablehq.com/@tomlarkworthy/ilda-laser-show-player",
  "https://observablehq.com/@tomlarkworthy/ilda-virtual-laser-test-pattern",
  "https://observablehq.com/@tomlarkworthy/radial-explosion",
  "https://observablehq.com/@tomlarkworthy/lazer-light",
  "https://observablehq.com/@tomlarkworthy/2d-spatial-wormhole-warp",
  "https://observablehq.com/@tomlarkworthy/fast-barcode-scanner",
  "https://observablehq.com/@tomlarkworthy/nunjucks",
  "https://observablehq.com/d/62ecbc80ae1a4825",
  "https://observablehq.com/d/65a6a49592c1e92e",
  "https://observablehq.com/@tomlarkworthy/async-lambda-sqs-eventbridge-benchmark",
  "https://observablehq.com/d/03d1bf2e19c985bc",
  "https://observablehq.com/d/2df49729bb26e18d",
  "https://observablehq.com/d/e02d090ea2a71fda",
  "https://observablehq.com/d/c0a7f2510dfb76fe",
  "https://observablehq.com/@tomlarkworthy/sticky-footer-in-list",
  "https://observablehq.com/d/ed185511f355bbd7",
  "https://observablehq.com/@tomlarkworthy/wasi-shim-experiments",
  "https://observablehq.com/d/32e023b22aa9ff8d",
  "https://observablehq.com/@tomlarkworthy/local-llm-with-llamafile",
  "https://observablehq.com/d/402b20f986c44cf0",
  "https://observablehq.com/@tomlarkworthy/community-help",
  "https://observablehq.com/d/1b6492e3d56db2e6",
  "https://observablehq.com/@tomlarkworthy/robocoop-tdd",
  "https://observablehq.com/d/94342383e5349374",
  "https://observablehq.com/d/9568798fb0fbd44c",
  "https://observablehq.com/@tomlarkworthy/complex-software-with-chatgpt",
  "https://observablehq.com/@tomlarkworthy/make-a-game-part-viib-filter-sidequest",
  "https://observablehq.com/d/fbab829d5bcdd7e2",
  "https://observablehq.com/d/8571aa583512f2a4",
  "https://observablehq.com/d/b497b79c94d3fbd1",
  "https://observablehq.com/d/5cc90faa3b651500",
  "https://observablehq.com/@tomlarkworthy/audio-inputs",
  "https://observablehq.com/d/49b1dd226a242821",
  "https://observablehq.com/d/ef7ccf2e0ed653d1",
  "https://observablehq.com/d/025ff03d865684e9",
  "https://observablehq.com/d/8b2c75e8a466d1a2",
  "https://observablehq.com/d/35261d31eb7148b4",
  "https://observablehq.com/d/571bf7ae1262750e",
  "https://observablehq.com/d/1ec7e3f612d70414",
  "https://observablehq.com/@tomlarkworthy/robocoop-gallery",
  "https://observablehq.com/@tomlarkworthy/imgchooser",
  "https://observablehq.com/d/3ea0eb95a792444a",
  "https://observablehq.com/@tomlarkworthy/twitter-trending-notebook-bot-dataset-2022",
  "https://observablehq.com/d/f689961a22c14ea2",
  "https://observablehq.com/@tomlarkworthy/dataeditor",
  "https://observablehq.com/d/912f5152f26b9088",
  "https://observablehq.com/d/32a38ebbb21ec073",
  "https://observablehq.com/@tomlarkworthy/chatgpt-notebook-feedback",
  "https://observablehq.com/@tomlarkworthy/chatgpt-notebook-generator-test-1",
  "https://observablehq.com/d/2c4b1ae7e1ffbd94",
  "https://observablehq.com/@tomlarkworthy/mps3-vendor-examples",
  "https://observablehq.com/d/26e21ba328992aae",
  "https://observablehq.com/@tomlarkworthy/tarot-backend",
  "https://observablehq.com/@tomlarkworthy/repository-dispatch-min",
  "https://observablehq.com/@tomlarkworthy/minecraft-servers-be",
  "https://observablehq.com/@tomlarkworthy/ai-hackathon-no-functions",
  "https://observablehq.com/@tomlarkworthy/ai-hackathon-tar",
  "https://observablehq.com/@tomlarkworthy/ai-hackathon-v1-examples",
  "https://observablehq.com/d/137396387698fab9",
  "https://observablehq.com/d/171e83999c03ffae",
  "https://observablehq.com/d/61e757c787b19ba5",
  "https://observablehq.com/d/8b20c47ffa3e3122",
  "https://observablehq.com/d/f1a258c298e54e4d",
  "https://observablehq.com/@tomlarkworthy/circular-barcode-simulator",
  "https://observablehq.com/@tomlarkworthy/tarot",
  "https://observablehq.com/@tomlarkworthy/json-merge-patch",
  "https://observablehq.com/d/16187f66cc8bd5a5",
  "https://observablehq.com/d/968dba38c371b88d",
  "https://observablehq.com/d/59fad01c55cb58a0",
  "https://observablehq.com/@tomlarkworthy/manager-app",
  "https://observablehq.com/d/c90802097aa9842b",
  "https://observablehq.com/d/f5a8c6ba0ea0fa69",
  "https://observablehq.com/d/8a1ca79e6b18857c",
  "https://observablehq.com/@tomlarkworthy/oauth-xero",
  "https://observablehq.com/d/635db53a8cf8bbdb",
  "https://observablehq.com/d/32e33923db857a45",
  "https://observablehq.com/@tomlarkworthy/linear-app-technical-deep-dive",
  "https://observablehq.com/d/51b11c4ffde4abaa",
  "https://observablehq.com/@tomlarkworthy/firebase-server-prototype-2",
  "https://observablehq.com/@tomlarkworthy/firebase-to-duckdb",
  "https://observablehq.com/@tomlarkworthy/tldraw-example",
  "https://observablehq.com/d/90154ec319fd9cdd",
  "https://observablehq.com/@tomlarkworthy/metaprogramming",
  "https://observablehq.com/d/4d2454dc8f0f442d",
  "https://observablehq.com/@tomlarkworthy/building-a-team-chore-app",
  "https://observablehq.com/d/7a05fad9bb8b6efd",
  "https://observablehq.com/@tomlarkworthy/webdesign",
  "https://observablehq.com/@tomlarkworthy/firebase",
  "https://observablehq.com/@tomlarkworthy/firebase-auth",
  "https://observablehq.com/@tomlarkworthy/firebase-modular-sdk",
  "https://observablehq.com/@tomlarkworthy/distiller",
  "https://observablehq.com/@tomlarkworthy/substack-signup-form",
  "https://observablehq.com/@tomlarkworthy/serverless-cell-latency-monitor",
  "https://observablehq.com/@tomlarkworthy/firebase-admin",
  "https://observablehq.com/d/7b9b1e7e237b19d1",
  "https://observablehq.com/@tomlarkworthy/randomid",
  "https://observablehq.com/@tomlarkworthy/supabase-reliability",
  "https://observablehq.com/@tomlarkworthy/supabase",
  "https://observablehq.com/@tomlarkworthy/xstate-examples",
  "https://observablehq.com/@tomlarkworthy/xstate",
  "https://observablehq.com/@tomlarkworthy/firebase-app-check",
  "https://observablehq.com/@tomlarkworthy/firebase-performance",
  "https://observablehq.com/@tomlarkworthy/firebase-remote-config",
  "https://observablehq.com/@tomlarkworthy/firebase-firestore-lite",
  "https://observablehq.com/@tomlarkworthy/firestore-messaging",
  "https://observablehq.com/@tomlarkworthy/firebase-functions",
  "https://observablehq.com/@tomlarkworthy/firebase-analytics",
  "https://observablehq.com/@tomlarkworthy/firebase-storage",
  "https://observablehq.com/@tomlarkworthy/firebase-firestore",
  "https://observablehq.com/@tomlarkworthy/firebase-database",
  "https://observablehq.com/@tomlarkworthy/firebase-app",
  "https://observablehq.com/d/e96a0cad38555f43",
  "https://observablehq.com/@tomlarkworthy/firebase-server-test-clients",
  "https://observablehq.com/@tomlarkworthy/adapting-dataviz",
  "https://observablehq.com/d/9c19e3f070767898",
  "https://observablehq.com/@tomlarkworthy/suncalc-server",
  "https://observablehq.com/@tomlarkworthy/shareview",
  "https://observablehq.com/@tomlarkworthy/multiplayer-cursors",
  "https://observablehq.com/@tomlarkworthy/aws",
  "https://observablehq.com/d/514ae110f9c800aa",
  "https://observablehq.com/@tomlarkworthy/sql-enhanced-youtube-backend",
  "https://observablehq.com/@tomlarkworthy/gapi",
  "https://observablehq.com/@tomlarkworthy/url-query-field-view",
  "https://observablehq.com/@tomlarkworthy/sql-enhanced-youtube",
  "https://observablehq.com/@tomlarkworthy/productionization",
  "https://observablehq.com/@tomlarkworthy/howto-monitoring",
  "https://observablehq.com/d/45b42c96aa9d7a05",
  "https://observablehq.com/d/baf4ed83a6eb8c26",
  "https://observablehq.com/d/dca56d65b53309ff",
  "https://observablehq.com/@tomlarkworthy/redis",
  "https://observablehq.com/@tomlarkworthy/lambda-architecture",
  "https://observablehq.com/@tomlarkworthy/dashboards-over-whatsapp",
  "https://observablehq.com/d/b5f36c7f116fd782",
  "https://observablehq.com/d/e03434f9859d5216",
  "https://observablehq.com/d/d5572dd42b477cd9",
  "https://observablehq.com/@tomlarkworthy/firebase-server-prototype-1",
  "https://observablehq.com/@tomlarkworthy/catch-all",
  "https://observablehq.com/@tomlarkworthy/fairy-dog-calendar",
  "https://observablehq.com/@tomlarkworthy/sequencer",
  "https://observablehq.com/@tomlarkworthy/webxr-dom-overlay",
  "https://observablehq.com/@tomlarkworthy/offline",
  "https://observablehq.com/@tomlarkworthy/duckdb-scratch",
  "https://observablehq.com/d/6f1bffd7be0752e5",
  "https://observablehq.com/@tomlarkworthy/agropatterns",
  "https://observablehq.com/d/5c545f9bb22a85ac",
  "https://observablehq.com/@tomlarkworthy/livecoding-2022-06-07",
  "https://observablehq.com/d/beb0c4b8fb70adc8",
  "https://observablehq.com/@tomlarkworthy/e1",
  "https://observablehq.com/@tomlarkworthy/aqi_no_loop_breaking",
  "https://observablehq.com/@tomlarkworthy/fetchp",
  "https://observablehq.com/d/1c1ae65128238bc5",
  "https://observablehq.com/@tomlarkworthy/api-hosting-with-express",
  "https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams",
  "https://observablehq.com/@tomlarkworthy/hackable-realtime-database-title-graphic",
  "https://observablehq.com/d/bb403da7a50f75fa",
  "https://observablehq.com/d/01b5ca48feb1db82",
  "https://observablehq.com/@tomlarkworthy/redis-backend-1",
  "https://observablehq.com/@tomlarkworthy/utils",
  "https://observablehq.com/d/4dd450d8a6e9c490",
  "https://observablehq.com/@tomlarkworthy/blogify",
  "https://observablehq.com/@tomlarkworthy/notebooks-2022-05",
  "https://observablehq.com/@tomlarkworthy/stripe",
  "https://observablehq.com/@tomlarkworthy/bug-unresolved-error-cells",
  "https://observablehq.com/@tomlarkworthy/hackable-firebase-realtime-database-server-prototype-2-backup",
  "https://observablehq.com/@tomlarkworthy/playing-with-redis",
  "https://observablehq.com/@tomlarkworthy/notebooks-2022-04",
  "https://observablehq.com/@tomlarkworthy/notebooks-2022-01",
  "https://observablehq.com/@tomlarkworthy/google-vs-trick",
  "https://observablehq.com/@tomlarkworthy/ego-graph",
  "https://observablehq.com/@tomlarkworthy/dijkstra",
  "https://observablehq.com/@tomlarkworthy/performance-investigation",
  "https://observablehq.com/@tomlarkworthy/notebooks-2022-03",
  "https://observablehq.com/@tomlarkworthy/a",
  "https://observablehq.com/@tomlarkworthy/b",
  "https://observablehq.com/d/c61faea06f2e00c0",
  "https://observablehq.com/d/811e0a13ef36e6ce",
  "https://observablehq.com/@tomlarkworthy/notebooks-2022-02",
  "https://observablehq.com/@tomlarkworthy/notebook-deploy-to-s3",
  "https://observablehq.com/@tomlarkworthy/mip",
  "https://observablehq.com/d/4f9c918925e44685",
  "https://observablehq.com/@tomlarkworthy/loremipsum",
  "https://observablehq.com/d/d0458bce28f88624",
  "https://observablehq.com/@tomlarkworthy/wms-leaflet-gca-dev",
  "https://observablehq.com/d/7ed3789c792da954",
  "https://observablehq.com/d/573498e681a6c3ec",
  "https://observablehq.com/d/b3675601fb3d10df",
  "https://observablehq.com/d/7f57acf1d6b5ab56",
  "https://observablehq.com/@tomlarkworthy/dynamic-controls-example",
  "https://observablehq.com/@tomlarkworthy/creating-long-lasting-content",
  "https://observablehq.com/d/378a340f19507683",
  "https://observablehq.com/@tomlarkworthy/leakybucket",
  "https://observablehq.com/@tomlarkworthy/fetchp-tests",
  "https://observablehq.com/d/3ee3e38985429ad6",
  "https://observablehq.com/@tomlarkworthy/cloudevents-explorer",
  "https://observablehq.com/@tomlarkworthy/echo-server-fast",
  "https://observablehq.com/d/e6ffeabfd47a55f6",
  "https://observablehq.com/d/2f024c470fcde7b5",
  "https://observablehq.com/@tomlarkworthy/tom-larkworthy",
  "https://observablehq.com/d/dad0770443998e3b",
  "https://observablehq.com/d/9f9391544e84839e",
  "https://observablehq.com/d/17918aff9d7a55ac",
  "https://observablehq.com/d/b7fec71640a6497d",
  "https://observablehq.com/d/9b1d8b930dd8dec5",
  "https://observablehq.com/d/07984c151a15305c",
  "https://observablehq.com/@tomlarkworthy/juice-and-charts",
  "https://observablehq.com/@tomlarkworthy/notebook-backups",
  "https://observablehq.com/d/eae9fb5d8998e426",
  "https://observablehq.com/d/310285cb7e84e21f",
  "https://observablehq.com/@tomlarkworthy/testblog",
  "https://observablehq.com/@tomlarkworthy/echo-server",
  "https://observablehq.com/d/49543d46cbb3c428",
  "https://observablehq.com/d/a0aab298f7605de5",
  "https://observablehq.com/d/f41b469f08f72eec",
  "https://observablehq.com/@tomlarkworthy/glpk-canonicalization",
  "https://observablehq.com/d/56d971a3dc0b42c4",
  "https://observablehq.com/@tomlarkworthy/webcode-livecoding-reactivity-demo",
  "https://observablehq.com/d/433338dff632f5a9",
  "https://observablehq.com/d/d53e8625c4ca7c0a",
  "https://observablehq.com/@tomlarkworthy/oauth",
  "https://observablehq.com/d/152aa2a44fd7f9cb",
  "https://observablehq.com/d/7731a62983a5de20",
  "https://observablehq.com/d/2de6eaad22f8fdf9",
  "https://observablehq.com/@tomlarkworthy/repo1",
  "https://observablehq.com/d/ac21b35bbfc6f70c",
  "https://observablehq.com/@tomlarkworthy/notebook-visualizer",
  "https://observablehq.com/@tomlarkworthy/blog-simple-article-template",
  "https://observablehq.com/@tomlarkworthy/neato",
  "https://observablehq.com/d/e05c47a5095a85b2",
  "https://observablehq.com/@tomlarkworthy/linkpreview",
  "https://observablehq.com/d/5608488fc3f8a7cf",
  "https://observablehq.com/@tomlarkworthy/access-aws",
  "https://observablehq.com/d/67faf3745ced6a6c",
  "https://observablehq.com/@tomlarkworthy/dataflow",
  "https://observablehq.com/@tomlarkworthy/notebook-to-netlify",
  "https://observablehq.com/@tomlarkworthy/howto-import-react-component",
  "https://observablehq.com/@tomlarkworthy/blog-index-html",
  "https://observablehq.com/@tomlarkworthy/colorpicker",
  "https://observablehq.com/@tomlarkworthy/stockage-cdn-proxy-du-fichier-de-reference-insee-bdm-idbank",
  "https://observablehq.com/@tomlarkworthy/phiresky-sqlite-query",
  "https://observablehq.com/@tomlarkworthy/unrolling-a-deploy-command",
  "https://observablehq.com/d/ebec922a70b5cae1",
  "https://observablehq.com/d/4fe1d59fbc5644b8",
  "https://observablehq.com/@tomlarkworthy/literateobject",
  "https://observablehq.com/@tomlarkworthy/blog-sidebar",
  "https://observablehq.com/@tomlarkworthy/redirect-debugging",
  "https://observablehq.com/@tomlarkworthy/syncingcontrols",
  "https://observablehq.com/@tomlarkworthy/liquid",
  "https://observablehq.com/@tomlarkworthy/tiktok",
  "https://observablehq.com/d/33f56ff7fc426da0",
  "https://observablehq.com/@tomlarkworthy/womens-suffrage",
  "https://observablehq.com/@tomlarkworthy/wiki",
  "https://observablehq.com/@tomlarkworthy/blog-netlify-deployment-manager",
  "https://observablehq.com/d/0147e2f83cad9f4f",
  "https://observablehq.com/@tomlarkworthy/google-trends",
  "https://observablehq.com/@tomlarkworthy/subdomain-certification",
  "https://observablehq.com/@tomlarkworthy/rss-atom-feed",
  "https://observablehq.com/@tomlarkworthy/native-inputs",
  "https://observablehq.com/d/f409f681d87aef40",
  "https://observablehq.com/@tomlarkworthy/random-place-on-youtube",
  "https://observablehq.com/@tomlarkworthy/mutable-form-input",
  "https://observablehq.com/d/2690a7e4ca9c878d",
  "https://observablehq.com/@tomlarkworthy/jamstack",
  "https://observablehq.com/d/2873571b15b84b2c",
  "https://observablehq.com/@tomlarkworthy/blm-us-wealth",
  "https://observablehq.com/@tomlarkworthy/pause-and-play-shop",
  "https://observablehq.com/@tomlarkworthy/address",
  "https://observablehq.com/@tomlarkworthy/remote-cell-value",
  "https://observablehq.com/@tomlarkworthy/testing-example",
  "https://observablehq.com/@tomlarkworthy/joyfull-trash",
  "https://observablehq.com/@tomlarkworthy/tweetstorm",
  "https://observablehq.com/@tomlarkworthy/bitcoin-energy",
  "https://observablehq.com/d/b9264ab851af4f14",
  "https://observablehq.com/@tomlarkworthy/wormhole2",
  "https://observablehq.com/d/546c36e727089329",
  "https://observablehq.com/@tomlarkworthy/observables-now-temporal-spacing-is-60-frames-per-second",
  "https://observablehq.com/@tomlarkworthy/coffeescript-demo",
  "https://observablehq.com/@tomlarkworthy/rate-estimation-min",
  "https://observablehq.com/@tomlarkworthy/rss-feed",
  "https://observablehq.com/d/d47f26bdf0bc33c0",
  "https://observablehq.com/@tomlarkworthy/bulma",
  "https://observablehq.com/@tomlarkworthy/custom-bulma",
  "https://observablehq.com/@tomlarkworthy/reddit-research-assistant",
  "https://observablehq.com/@tomlarkworthy/reconcile",
  "https://observablehq.com/@tomlarkworthy/synchronizing-external-state-into-bigquery-efficiently",
  "https://observablehq.com/@tomlarkworthy/wormhole",
  "https://observablehq.com/@tomlarkworthy/wave-function-collapse",
  "https://observablehq.com/d/f0d2912039f81d62"
])
)}

function _manualStartAt(Inputs){return(
Inputs.text({
  label: "start at"
})
)}

function _backup_slice(manual_notebooks,manualStartAt)
{
  const notebooks = [...manual_notebooks];
  const start = notebooks.findIndex((v) => v.includes(manualStartAt));
  return notebooks.slice(start);
}


function _16(Inputs,backupAllNotebooks,backup_slice){return(
Inputs.button("backup manual notebook list", {
  reduce: () =>
    backupAllNotebooks(
      backup_slice.map((url) => ({
        url
      }))
    )
})
)}

function _17(md){return(
md`---`
)}

function _18(md){return(
md`### Backup to [tomlarkworthy.moldable.app](https://tomlarkworthy.moldable.app)`
)}

function _19($0){return(
$0.s3.querySelector("button").click()
)}

function _20($0){return(
$0.handler
)}

function _moldable_exporter(exporter){return(
exporter()
)}

function _24(backupNowButton){return(
backupNowButton()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("backup_yml")).define("backup_yml", _backup_yml);
  main.variable(observer("fetchNotebookList")).define("fetchNotebookList", ["fetchp","DOMParser"], _fetchNotebookList);
  main.variable(observer("example_page")).define("example_page", ["fetchNotebookList"], _example_page);
  main.variable(observer("fetchAllNotebooks")).define("fetchAllNotebooks", ["fetchNotebookList"], _fetchAllNotebooks);
  main.variable(observer("notebooks")).define("notebooks", ["fetchAllNotebooks"], _notebooks);
  main.variable(observer("viewof backup")).define("viewof backup", ["enableGithubBackups"], _backup);
  main.variable(observer("backup")).define("backup", ["Generators", "viewof backup"], (G, _) => G.input(_));
  main.variable(observer("backupAllNotebooks")).define("backupAllNotebooks", ["backup"], _backupAllNotebooks);
  main.variable(observer()).define(["Inputs","backupAllNotebooks","notebooks"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("manual_notebooks")).define("manual_notebooks", _manual_notebooks);
  main.variable(observer("viewof manualStartAt")).define("viewof manualStartAt", ["Inputs"], _manualStartAt);
  main.variable(observer("manualStartAt")).define("manualStartAt", ["Generators", "viewof manualStartAt"], (G, _) => G.input(_));
  main.variable(observer("backup_slice")).define("backup_slice", ["manual_notebooks","manualStartAt"], _backup_slice);
  main.variable(observer()).define(["Inputs","backupAllNotebooks","backup_slice"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["viewof moldable_exporter"], _19);
  main.variable(observer()).define(["viewof moldable_exporter"], _20);
  main.variable(observer("viewof moldable_exporter")).define("viewof moldable_exporter", ["exporter"], _moldable_exporter);
  main.variable(observer("moldable_exporter")).define("moldable_exporter", ["Generators", "viewof moldable_exporter"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("fetchp", child1);
  const child2 = runtime.module(define2);
  main.import("exporter", child2);
  main.variable(observer()).define(["backupNowButton"], _24);
  const child3 = runtime.module(define3);
  main.import("enableGithubBackups", child3);
  main.import("backupNowButton", child3);
  return main;
}
