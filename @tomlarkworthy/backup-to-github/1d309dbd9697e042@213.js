import define1 from "./8aac8b2cb06bf434@247.js";
import define2 from "./b09f1f038b1040e3@46.js";
import define3 from "./55bed46f68a80641@366.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image@1.png",new URL("./files/648780efd84242fcfc017133a5ce32ec072c82cd23bdf5f3fe9d79a7b9567068492b1c81915497d7210b185ec81f0217baa6bd00a4999d38a0d3c9dd7db6a2ee",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Automatically Backup Notebooks with *enableBackupToGithub* 

Using a combination of [on version hook](https://observablehq.com/@endpointservices/onversion) which executes after a notebook is published, and [repository dispatch](https://observablehq.com/@tomlarkworthy/repository-dispatch) which starts a Github Action workflow, we can automatically unpack and backup our notebook source code to a Github repository every version.`
)});
  main.variable(observer()).define(["FileAttachment","md"], async function(FileAttachment,md){return(
md`## enableBackupToGithub({ owner, repo })

In an Observable notebook call \`enableBackupToGithub({ owner, repo })\` with the target Github repository for backups. For example,

~~~js

enableBackupToGithub({
  owner: "endpointservices",    // Github username/organization
  repo: "observable-notebooks". // Github repo
})
~~~

This will open a webcode endpoint UI. Store a Github [access token](https://github.com/settings/tokens/new) in a secret called \`github_token', and bind it to the endpoint, as shown below. If you add an API key you will be able to backup team notebooks.

${await FileAttachment("image@1.png").image({style: 'max-width: 640px'})}
`
)});
  main.variable(observer()).define(["getMetadata"], function(getMetadata){return(
getMetadata("8aac8b2cb06bf434", "113")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Implementation`
)});
  main.variable(observer("enableBackupToGithub")).define("enableBackupToGithub", ["onVersion","getMetadata","dispatchProxyName","createDispatchProxy"], function(onVersion,getMetadata,dispatchProxyName,createDispatchProxy){return(
function enableBackupToGithub({ owner, repo } = {}) {
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
    const metadata = await getMetadata(id, version); // use id to fetch more info
    if (metadata === null) {
      // null means it could be a private URL and therefore d/<hex> for only
      altDispatchURL = `https://webcode.run/observablehq.com/d/${id}@${version};${dispatchProxyName(
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
    client_payload: null
  });

  return dispatchBackup;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### What *enableBackupToGithub* does

*enableBackupToGithub* setups up an endpoint that receives \`onVersion\` hook that triggers backup repository workflow stored in Github. The endpoint sends the Github repository workflow an event_type of type \`new_notebook_version\` along with a client payload JSON containing the notebook \`id\` and \`version\` and authenticated with the \`github_token\` credentials.

Note the actual backup is performed by a Github Action.

`
)});
  main.variable(observer("viewof backup")).define("viewof backup", ["enableBackupToGithub"], function(enableBackupToGithub){return(
enableBackupToGithub({
  owner: "endpointservices",
  repo: "observable-notebooks"
})
)});
  main.variable(observer("backup")).define("backup", ["Generators", "viewof backup"], (G, _) => G.input(_));
  main.variable(observer()).define(["backup"], function(backup){return(
backup
)});
  main.variable(observer("nonce")).define("nonce", function(){return(
7
)});
  main.variable(observer()).define(["dispatchProxyName"], function(dispatchProxyName)
{
  const owner = "endpointservices";
  const repo = "observable-notebooks";
  const id = "1d309dbd9697e042";
  const version = "112";
  const altDispatchURL = `https://webcode.run/observablehq.com/d/${id};${dispatchProxyName(
    { owner, repo, event_type: "new_notebook_version" }
  )}`;
  fetch(altDispatchURL, {
    method: "POST",
    body: JSON.stringify({ id, version })
  });
}
);
  const child1 = runtime.module(define1);
  main.import("onVersion", child1);
  const child2 = runtime.module(define2);
  main.import("createDispatchProxy", child2);
  main.import("dispatchProxyName", child2);
  const child3 = runtime.module(define3);
  main.import("getMetadata", child3);
  return main;
}
