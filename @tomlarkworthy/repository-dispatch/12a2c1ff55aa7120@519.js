import define1 from "./b09f1f038b1040e3@77.js";
import define2 from "./048a17a165be198d@273.js";
import define3 from "./3d9d1394d858ca97@556.js";
import define4 from "./6eda90668ae03044@836.js";
import define5 from "./dfdb38d5580b5c35@351.js";
import define6 from "./bb2055d580bbbab2@106.js";

function _1(md){return(
md`# Starting [Github Action](https://docs.github.com/en/actions) Workflows From [Observable](https://observablehq.com/)

A [repository dispatch](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch) triggers [Github Action](https://docs.github.com/en/actions) workflows via an authenticated HTTP request. See the [documentation](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch) on Github. From there you can do all kinds of things, even programmatically creating commits.

In this notebook, we document two major ways to trigger actions from [Observable](https://observablehq.com)
1. authenticated, where notebook **readers** provide the access token to trigger a workflow
2. pre-authenticated, where the notebook **author** configures a proxy using their own creds, so anybody can trigger workflows on the author's blessed path.

To use
~~~js
import {dispatch, createDispatchProxy} from '@tomlarkworthy/repository-dispatch-min'
~~~
`
)}

function _2(tweet){return(
tweet("1475383403285467145")
)}

function _3(md){return(
md`## Repository Dispatch Client Library for Observable

The authenticated dispatch function takes an access token, plus the other options, to perform the dispatch`
)}

function _4(signature,dispatch){return(
signature(dispatch, {
  description:
    "Pass a GitHub access token in 'token' and dispatch will trigger a repository workflow in the target repository."
})
)}

function _5(md){return(
md`## Example Usecase 1: Pass Personal Token In Notebook

To use our simple dispatch function, we need a Github API access token. A simple way is to ask the reader for one.`
)}

function _token(Inputs,md,localStorageView){return(
Inputs.bind(
  Inputs.text({
    label: md`Enter [personal token](https://github.com/settings/tokens/new)`,
    minlength: 10
  }),
  localStorageView("gh_token")
)
)}

function _7(md){return(
md`Note: If you use [localStorageView](https://observablehq.com/@tomlarkworthy/local-storage-view#localStorageView) you can remember the input across page sessions in local storage.`
)}

function _8(dispatch,token){return(
dispatch(token, {
  owner: "tomlarkworthy",
  repo: "octokit-test"
})
)}

function _9(md){return(
md`There are situations where you don't want the reader to provide a token. For this, we need to introduce a secure environment.`
)}

function _10(md){return(
md`## Example Usecase 2: Use Shared Secret Stored in [Webcode.run](https://webcode.run) to pre-authorize a configuration

Code executed on [webcode.run](https://webcode.run) is remote, and so secrets are not exposed to notebook readers. By creating a proxy to do the request, we can expose Github workflows to the public without requiring them to supply tokens. Instead, the secret can be set in the inline UI (or at [@endpointservices/secrets](https://observablehq.com/@endpointservices/secrets)). But default, the secret should be called \`github_token\`, but you can override this in the \`createDispatchProxy\` arguments.`
)}

function _11(signature,createDispatchProxy){return(
signature(createDispatchProxy, {
  description: `returns a preconfigured and authorized dispatch function
~~~js
(client_payload) => status
~~~

which you can call to invoke a github workflow
`
})
)}

function _12(md){return(
md`Note, configuration of the dispatch function has to be done when creating the proxy so that the endpoint cannot be used against arbitrary repositories. An opt-in exception is that when the \`client_payload\` arg is set to undefined, the client can pass a value of \`client_payload\` as the first argument (this is to enable passing data into a workflow).`
)}

function _13(md){return(
md`\`\`\`js
viewof remoteDispatch = createDispatchProxy({
  owner: "tomlarkworthy",
  repo: "octokit-test"
})
\`\`\`

The result of a \`createDispatchProxy\` call is a view. The UI is the default [webcode.run](https://webcode.run) UI, which provides a method of setting the secret once you are logged in. You will need to create a stored secret called \`github_token\` **and** bind it to the endpoint. If you forget to configure the secret, the underlying Octokit API will throw \`HTTPError: Not Found\` exceptions. Your notebook needs to be published for it to work when you are logged out.`
)}

function _remoteDispatch(createDispatchProxy){return(
createDispatchProxy({
  owner: "tomlarkworthy",
  repo: "octokit-test",
  event_type: "log"
})
)}

function _15(md){return(
md`The data channel of the returned \`createDispatchProxy\` view is a dispatch function. When called, it will run the dispatch remotely, but importantly, you do not need to pass any authentication credentials. So you can just place it in a button for anybody to use. Try mine below.`
)}

function _lastResult(Inputs,remoteDispatch){return(
Inputs.button("trigger workflow", {
  reduce: () => remoteDispatch()
})
)}

function _17(lastResult){return(
lastResult
)}

function _18(md){return(
md`The above workflow will trigger [this workflow](https://github.com/tomlarkworthy/octokit-test/blob/main/.github/workflows/log-http.yml) which in turn write back into the repository as a log entry found [here](https://github.com/tomlarkworthy/octokit-test/blob/main/log/http.log). So you can see for yourself that your triggers are registered by inspecting the timestamps in the logs!

The example here will cause a commit to occur in a repository you would not normally have permissions to! Now imagine what is possible when you can offload storage into git repositories for public users on [Observablehq](https://observablehq.com)!
`
)}

function _19(md){return(
md`## Writing workflows

I recommend [Triggering GitHub Actions Using Repository Dispatches](https://dev.to/teamhive/triggering-github-actions-using-repository-dispatches-39d1) for a good overview of the technique.

At the beginning of a workflow file (stored in \`/.github/workflows/<name>.yml\`) you announce how the workflow is triggered. For an externally HTTP triggered workflow you use \`repository_dispatch\`. You also can *optionally* restrict what the \`event_type\` must be through the \`types\` array property:-
~~~yaml

name: HTTP triggered workflow
on:
  repository_dispatch:
  types: [start-example-workflow]
~~~

Next, you list jobs with steps. Steps can include anything off the vast Github Actions [marketplace](https://github.com/marketplace?type=actions) or just simple shell scripting!

~~~yaml
jobs:
  commit-timestamp:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Log workflow execution in log
        run: |
          mkdir -p ./log
          echo "$(date '+%Y-%m-%d %H:%M:%S') inbound HTTP" >> ./log/http.log
      - name: Commit updated log
        run: |
          git config --global user.name 'Log External HTTP'
          git config --global user.email 'robot@webcode.run'
          git add ./log/http.log
          git commit -am "Log inbound HTTP"
          git push
~~~


`
)}

function _20(md){return(
md`### Observable + Github Actions`
)}

function _21(md){return(
md`Observable is a great way to provide a lightweight interactive UI with minimal development effort. When paired with Github actions you can use Observable to create a nice GUI over the Action primitives. You can also use Actions to enhance the Observable experience, for example, auto-backing up notebooks into a Github repo using the [onversion hook](https://observablehq.com/@endpointservices/onversion).`
)}

function _22(md){return(
md`## Supporting Libraries`
)}

async function _Octokit(){return(
await import("https://cdn.skypack.dev/@octokit/core")
)}

function _30(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tweet"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["signature","dispatch"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof token")).define("viewof token", ["Inputs","md","localStorageView"], _token);
  main.variable(observer("token")).define("token", ["Generators", "viewof token"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["dispatch","token"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["signature","createDispatchProxy"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof remoteDispatch")).define("viewof remoteDispatch", ["createDispatchProxy"], _remoteDispatch);
  main.variable(observer("remoteDispatch")).define("remoteDispatch", ["Generators", "viewof remoteDispatch"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof lastResult")).define("viewof lastResult", ["Inputs","remoteDispatch"], _lastResult);
  main.variable(observer("lastResult")).define("lastResult", ["Generators", "viewof lastResult"], (G, _) => G.input(_));
  main.variable(observer()).define(["lastResult"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("Octokit")).define("Octokit", _Octokit);
  const child1 = runtime.module(define1);
  main.import("dispatch", child1);
  main.import("createDispatchProxy", child1);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  const child3 = runtime.module(define3);
  main.import("signature", child3);
  const child4 = runtime.module(define4);
  main.import("endpoint", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  const child6 = runtime.module(define6);
  main.import("tweet", child6);
  main.variable(observer()).define(["footer"], _30);
  return main;
}
