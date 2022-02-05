import define1 from "./8aac8b2cb06bf434@247.js";
import define2 from "./b09f1f038b1040e3@62.js";
import define3 from "./55bed46f68a80641@366.js";
import define4 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image@1.png",new URL("./files/648780efd84242fcfc017133a5ce32ec072c82cd23bdf5f3fe9d79a7b9567068492b1c81915497d7210b185ec81f0217baa6bd00a4999d38a0d3c9dd7db6a2ee",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Backup Notebooks with \`enableGithubBackups\` 

Take control of your data and relax. Backup your [Observable](https://observablehq.com) notebooks to a shared Github repository *automatically when published*.
By using a combination of [on version hook](https://observablehq.com/@endpointservices/onversion) which executes after a notebook is published, and [repository dispatch](https://observablehq.com/@tomlarkworthy/repository-dispatch) which starts a Github Action workflow, we can automatically unpack and backup notebook source code to a Github repository every version.

The setup is a two step process.
1. In the notebooks, import and call \`enableGithubBackups({ owner, repo })\`
2. In the Github repository, setup an Action Workflow that downloads the \`notebook.tar.gz\` and unpacks it.

[Observable notebook exports](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) are ES6 modules with a HTML runner. You can easily run your notebooks without a dependency on Observable servers, or include the code in a build process.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Import the Github backup notebook.


~~~js
import {enableGithubBackups, backupNowButton} from \`@tomlarkworthy/github-backups\`
~~~`
)});
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`## Call \`enableGithubBackups({ owner, repo })\`

In an Observable notebook call \`enableGithubBackups({ owner, repo })\` with the target Github repository for backups. For example,

~~~js 
enableGithubBackups({
  owner: "endpointservices",                   // Target Github username/organization
  repo: "observable-notebooks",                // Target Github repo
})
~~~

This will open a webcode endpoint UI. Store a Github [access token](https://github.com/settings/tokens/new) in a secret named \`github_token\`, and bind it to the endpoint, as shown below. If you add an API key you can backup non-public team notebooks.

${await FileAttachment("image@1.png").image({style: 'max-width: 640px'})}
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Implementation`
)});
  main.variable(observer("enableGithubBackups")).define("enableGithubBackups", ["onVersion","getMetadata","dispatchProxyName","createDispatchProxy"], function(onVersion,getMetadata,dispatchProxyName,createDispatchProxy){return(
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
    let altDispatchURL = undefined;
    const metadata = await getMetadata(id); // use id to fetch more info
    if (metadata === null) {
      // null means it could be a private URL and therefore d/<hex> for only
      altDispatchURL = `https://webcode.run/observablehq.com/d/${id};${dispatchProxyName(
        { owner, repo, event_type: "new_notebook_version" }
      )}`;
    } else {
      // else we can lookup the latest URL from metadata
      const notebookURL = metadata.url.replace("https://", "");
      altDispatchURL = `https://webcode.run/${notebookURL};${dispatchProxyName({
        owner,
        repo,
        event_type: "new_notebook_version"
      })}`;
    }
    // Now we forward this information to the dispatch function
    fetch(altDispatchURL, {
      method: "POST",
      body: JSON.stringify({ ...metadata, id, version })
    });
  });

  const dispatchBackup = createDispatchProxy({
    owner,
    repo,
    event_type: "new_notebook_version",
    client_payload: null,
    debug: debugProxy
  });

  return dispatchBackup;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Backup now button

It's useful, especially when setting up, to manually trigger the backup. Use the \`backupNowButton()\` function to trigger the Github workflow.`
)});
  main.variable(observer("backupNowButton")).define("backupNowButton", ["Inputs","getCurrentMetadata"], function(Inputs,getCurrentMetadata){return(
() =>
  Inputs.button("backup now", {
    reduce: async () => {
      const metadata = await getCurrentMetadata();
      const dispatchName = Object.keys(window.deployments).find((n) =>
        n.endsWith("_new_notebook_version")
      );
      const notebookURL = metadata.url.replace("https://", "");
      fetch(`https://webcode.run/${notebookURL};${dispatchName}`, {
        method: "POST",
        body: JSON.stringify(await getCurrentMetadata())
      });
    }
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### What *enableGithubBackups* does

*enableGithubBackups* setups up an endpoint that receives \`onVersion\` hook that triggers backup repository workflow stored in Github. The endpoint sends the Github repository workflow an event_type of type \`new_notebook_version\` along with a client payload JSON containing the notebook \`id\` and \`version\` and authenticated with the \`github_token\` credentials.

Note the actual backup is performed by a Github Action.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
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
          set -euxo pipefail
          echo 'payload: \${{ toJson(github.event.client_payload) }}'
          curl 'https://api.observablehq.com/d/\${{github.event.client_payload.id}}@\${{github.event.client_payload.version}}.tgz?v=3' > notebook.tgz
          # The URL is the notebook source, e.g. https://observablehq.com/@tomlarkworthy/github-backups 
          URL="\${{github.event.client_payload.url}}"
          # We convert this to @tomlarkworthy/github-backups by striping the prefix
          path="\${URL/https:\\/\\/observablehq.com\\//}"
          
          rm -rf "\${path}"
          mkdir -p "\${path}"
          tar -xf notebook.tgz -C "\${path}"
          git config --global user.name 'backup-to-github'
          git config --global user.email 'robot@webcode.run'
          git add "\${path}"
          git pull
          if ! git diff-index --quiet HEAD; then
            git commit -m 'Backup \${{github.event.client_payload.id}}@\${{github.event.client_payload.version}}   
            \${{toJson(github.event.client_payload)}}
            '
            git push
          fi
\`\`\`
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Daily backup job

Because the \`onVersion\` hook is best effort, a [daily job](https://observablehq.com/@endpointservices/backups-failsafe) will also call the backup workflow to ensure backups converge to the latest.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Example

The following cell backs up *this* notebook for real! [Here](https://github.com/endpointservices/observable-notebooks/blob/main/%40tomlarkworthy/github-backups/index.html) it is in Github (and the Action Workflow file is in that repository too). Of course, if you are not *tomlarkworthy* you cannot login the the endpoint below, and there is no way to access my personal *github_token* but it is there, enabling the integration.`
)});
  main.variable(observer()).define(["enableGithubBackups"], function(enableGithubBackups){return(
enableGithubBackups({
  owner: "endpointservices",
  repo: "observable-notebooks"
})
)});
  main.variable(observer()).define(["backupNowButton"], function(backupNowButton){return(
backupNowButton()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Dependencies`
)});
  const child1 = runtime.module(define1);
  main.import("onVersion", child1);
  const child2 = runtime.module(define2);
  main.import("createDispatchProxy", child2);
  main.import("dispatchProxyName", child2);
  const child3 = runtime.module(define3);
  main.import("getMetadata", child3);
  main.import("getCurrentMetadata", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
