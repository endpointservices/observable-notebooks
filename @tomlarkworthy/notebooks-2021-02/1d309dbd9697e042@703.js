import define1 from "./8aac8b2cb06bf434@263.js";
import define2 from "./b09f1f038b1040e3@77.js";
import define3 from "./58f3eb7334551ae6@215.js";
import define4 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Automatically Backup [Observable](observablehq.com) notebooks to Github

Take control of your data and relax. Backup your public and team [Observable](https://observablehq.com) notebooks to a Github repository *automatically when published*.
By using a combination of [on version hook](https://observablehq.com/@endpointservices/onversion) which executes after a notebook is published, and [repository dispatch](https://observablehq.com/@tomlarkworthy/repository-dispatch) which starts a Github Action workflow, we can automatically export and unpack notebook source code to a Github repository every change.

The setup is a two step process.
1. In the notebooks, import and call \`enableGithubBackups({ owner, repo })\`
2. In the Github repository, setup an Action Workflow that downloads the \`notebook.tar.gz\` and unpacks it.

[Observable notebook exports](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) are ES6 modules with a HTML runner. You can easily run your notebooks without a dependency on Observable servers, or include the code in a build process. Take a look for yourself at our Github backups [here](https://github.com/endpointservices/observable-notebooks).

### Changes
- 2024-03-23 Removed v1 API sniffing by request of Observablehq staff, but it still works`
)}

function _2(md){return(
md`## Import the Github backup notebook.


~~~js
import {enableGithubBackups, backupNowButton} from \`@tomlarkworthy/github-backups\`
~~~`
)}

async function _3(FileAttachment,md){return(
md`## Call \`enableGithubBackups({ owner, repo })\`

In an Observable notebook call \`enableGithubBackups({ owner, repo })\` with the target Github repository for backups. For example,

~~~js 
enableGithubBackups({
  owner: "endpointservices",                   // Target Github username/organization
  repo: "observable-notebooks",                // Target Github repo
  allow: ['tomlarkworthy', 'endpointservices'] // [optional] Allowed source observablehq logins
})
~~~

This will open a webcode endpoint UI. Store a Github [access token](https://github.com/settings/tokens/new) in a secret named \`github_token\`, and bind it to the endpoint, as shown below. If you add an API key you can backup non-public team notebooks.

${await FileAttachment("image@1.png").image({style: 'max-width: 640px'})}

⚠️ You notebook must be public *or* you must provide an API key for the backup process to read the source.
`
)}

function _4(md){return(
md`### Implementation`
)}

function _enableGithubBackups(onVersion,dispatchProxyName,urlFromId,createDispatchProxy){return(
function enableGithubBackups({ owner, repo, debugProxy, allow } = {}) {
  // Create onVersion hook, which simply forwards to the dispatchProxyEndpoint
  onVersion(async ({ id, version } = {}) => {
    // To check if this was called send a request to a honeypot
    fetch(
      `https://webcode.run/observablehq.com/@endpointservices/realtime-request-log` +
        `/version-${id}@${version}`
    );

    // Endpoints don't work in the thumbnail process, as they cannot figure out their top level slugs
    // However, as we have the id and version passed in we can derive it.
    let dispatchURL = `https://webcode.run/observablehq.com/d/${id};${dispatchProxyName(
      { owner, repo, event_type: "new_notebook_version" }
    )}`;
    // Now we forward this information to the dispatch function
    fetch(dispatchURL, {
      method: "POST",
      body: JSON.stringify({ url: await urlFromId(id), id, version })
    });
  });

  const dispatchBackup = createDispatchProxy({
    owner,
    repo,
    event_type: "new_notebook_version",
    client_payload: null,
    debug: debugProxy,
    beforeDispatch: async ({ client_payload } = {}, ctx) => {
      // Mixin the apiKey so Github can access private code exports
      client_payload.api_key = ctx.secrets.api_key;
    }
  });

  return dispatchBackup;
}
)}

function _6(md){return(
md`### Backup now button

It's useful, especially when setting up, to manually trigger the backup. Use the \`backupNowButton()\` function to trigger the Github workflow.`
)}

function _backupNowButton(Inputs,html){return(
() =>
  Inputs.button("backup now", {
    reduce: async () => {
      const notebookURL = html`<a href="?">`.href
        .replace("https://", "")
        .replace("?", "");

      const dispatchName = Object.keys(window.deployments).find((n) =>
        n.endsWith("_new_notebook_version")
      );
      fetch(`https://webcode.run/${notebookURL};${dispatchName}`, {
        method: "POST",
        body: JSON.stringify({
          url: "https://" + notebookURL
        })
      });
    }
  })
)}

function _8(md){return(
md`### What *enableGithubBackups* does

*enableGithubBackups* setups up an endpoint that receives \`onVersion\` hook that triggers backup repository workflow stored in Github. The endpoint sends the Github repository workflow an event_type of type \`new_notebook_version\` along with a client payload JSON containing the notebook \`id\` and \`version\` and authenticated with the \`github_token\` credentials.

Note the actual backup is performed by a Github Action.

`
)}

function _9(md){return(
md`## Setup \`.github/workflows/backup.yml\`

In a Github repository for backups, create a workflow for performing the backups. The following example comes from [endpointservices/observable-notebooks/.github/workflows/backup.yml](https://github.com/endpointservices/observable-notebooks/blob/main/.github/workflows/backup.yml). Note you can send all notebooks to the same repository as they are prefixed by Observable login and slug.

\`\`\`bash
name: backups
on:
  repository_dispatch:
    types: [new_notebook_version]
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: backup
        run: |
          set -euo pipefail  
          # The URL is the notebook source, e.g. https://observablehq.com/@tomlarkworthy/github-backups 
          URL="\${{github.event.client_payload.url}}"
          # We convert this to @tomlarkworthy/github-backups by striping the prefix
          path="\${URL/https:\\/\\/observablehq.com\\//}"
          
          echo 'url:  \${{github.event.client_payload.url}}'
          echo "path: \${path}"
          # NOTE: api_key parameter not printed for security reasons, but it may be present
          # Download tar from Observable directly (do not echo, may contain API key)
          curl "https://api.observablehq.com/\${path}.tgz?v=3&api_key=\${{github.event.client_payload.api_key}}" > notebook.tgz
          
          # Turn on echo of commands now
          set -x

          rm -rf "\${path}"
          mkdir -p "\${path}"
          tar -xf notebook.tgz -C "\${path}"
          git config --global user.name 'backup-to-github'
          git config --global user.email 'robot@webcode.run'
          git add "\${path}"
          git pull
          if ! git diff-index --quiet HEAD; then
            git commit -m 'Backup \${{github.event.client_payload.url}}   
            url:     \${{github.event.client_payload.url}}
            title:   \${{github.event.client_payload.title}}
            author:  \${{github.event.client_payload.author}}
            id:      \${{github.event.client_payload.id}}
            '
            git push
          fi
\`\`\`
`
)}

function _10(md){return(
md`You can see if your workflow is triggering in the action sections of your repository in Github.`
)}

function _11(md){return(
md`## Daily backup job

Because the \`onVersion\` hook is best effort, a [daily job](https://observablehq.com/@endpointservices/backups-failsafe) will also call the backup workflow to ensure backups converge to the latest.`
)}

function _12(md){return(
md`## Example

The following cell backs up *this* notebook for real! [Here](https://github.com/endpointservices/observable-notebooks/blob/main/%40tomlarkworthy/github-backups/index.html) it is in Github (and the Action Workflow file is in that repository too). Of course, if you are not *tomlarkworthy* you cannot login the the endpoint below, and there is no way to access my personal *github_token* but it is there, enabling the integration.`
)}

function _13(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices",
  repo: "observable-notebooks",
  allow: ["tomlarkworthy", "endpointservices"],
  debugProxy: true // Places breakpoint inside dispatch proxy (final step before Github)
})
)}

function _14(backupNowButton){return(
backupNowButton()
)}

function _15(md){return(
md`### Info

endpoint expects a request with the body of the form 

~~~
{
    "url": "https://observablehq.com/@tomlarkworthy/github-backups",
    "id": "..." // used to drive the download URL (https://api.observablehq.com/@tomlarkworthy/github-backups@642.tgz?v=3)
    "api_key": "..." // optional
}
~~~`
)}

function _16(md){return(
md`### Utils`
)}

function _urlFromId(fetchp){return(
async (id) => {
  const response = await (
    await fetchp(`https://api.observablehq.com/document/${id}/head?v=4`)
  ).json();
  if (response.slug) {
    return `https://observablehq.com/@tomlarkworthy/${response.slug}`;
  }
  return `https://observablehq.com/d/${id}`;
}
)}

function _18(urlFromId){return(
urlFromId("d023d6fa23f3afd0")
)}

function _19(md){return(
md`## Dependencies`
)}

function _trusted_domain(){return(
["api.observablehq.com"]
)}

function _25(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/648780efd84242fcfc017133a5ce32ec072c82cd23bdf5f3fe9d79a7b9567068492b1c81915497d7210b185ec81f0217baa6bd00a4999d38a0d3c9dd7db6a2ee.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["FileAttachment","md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("enableGithubBackups")).define("enableGithubBackups", ["onVersion","dispatchProxyName","urlFromId","createDispatchProxy"], _enableGithubBackups);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("backupNowButton")).define("backupNowButton", ["Inputs","html"], _backupNowButton);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["enableGithubBackups"], _13);
  main.variable(observer()).define(["backupNowButton"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("urlFromId")).define("urlFromId", ["fetchp"], _urlFromId);
  main.variable(observer()).define(["urlFromId"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("trusted_domain")).define("trusted_domain", _trusted_domain);
  const child1 = runtime.module(define1);
  main.import("onVersion", child1);
  const child2 = runtime.module(define2);
  main.import("createDispatchProxy", child2);
  main.import("dispatchProxyName", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  const child4 = runtime.module(define4).derive([{name: "trusted_domain", alias: "ALLOW_DOMAINS"}], main);
  main.import("fetchp", child4);
  main.variable(observer()).define(["footer"], _25);
  return main;
}
