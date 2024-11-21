import define1 from "./5460ee246e3aa033@941.js";
import define2 from "./9e9b514f3656a16e@1255.js";
import define3 from "./dff1e917c89f5e76@1964.js";
import define4 from "./b8c5be7836c14484@899.js";
import define5 from "./bebff78c79e75160@549.js";
import define6 from "./b8a500058f806a6b@11.js";
import define7 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# Publish Notebook to Netlify

The tools deploys my notebooks on my personal site. For example: [multiplayer-cursors](https://tomlarkworthy.endpointservices.net/notebooks/tomlarkworthy/multiplayer-cursors.html)

Technologies
- [@mootari/sortable-notebook-list](https://observablehq.com/@mootari/sortable-notebook-list), for finding what notebooks I own
- [@tomlarkworthy/fetchp](https://observablehq.com/@tomlarkworthy/fetchp), for downloading notebook data _.tgz_ bundles
- [@endpointservices/storage](https://observablehq.com/@endpointservices/storage), provides filestorage, for unpacking _.tgz_ into
- [@endpointservices/netlify](https://observablehq.com/@endpointservices/netlify), for uploading to Netlify from URLs
- _pako_, and _untar_ - gzip and tar browser utilities.
- Firestore as a CMS (enabling partial sync to Netlify)
- IndieAuth as identity provider
`
)}

function _2(storageLogin){return(
storageLogin
)}

function _3(md,notebook){return(
md`#### Deploy notebook source wrapper (${notebook.title})`
)}

function _4(deployCustomNotebookPage,notebook){return(
deployCustomNotebookPage({
  title: notebook.title,
  owner: notebook.owner,
  slug: notebook.slug,
  thumbnail: notebook.thumbnail,
  collection: notebook.collection
})
)}

function _5(md,notebook){return(
md`#### Deploy notebook source (${notebook.title})`
)}

function _6(deployNotebookTgz,notebook){return(
deployNotebookTgz({
  owner: notebook.owner,
  slug: notebook.slug
})
)}

function _7(htl,state){return(
htl.html`<button onclick=${() => {
  state.unpacked = {};
}}>clear cache `
)}

function _8(md){return(
md`### Choose Notebook to deploy`
)}

function _search(Inputs,notebookData){return(
Inputs.search(notebookData)
)}

function _10($0){return(
$0
)}

function _11(md){return(
md`## HTML`
)}

function _customNotebookIndex(topbar,sidebar,html){return(
function customNotebookIndex({
  title,
  url,
  notebookURL,
  description,
  imageURL,
  twitterCreator = "@tomlarkworthy",
  baseURL = "."
} = {}) {
  return `<!DOCTYPE html>
<html class="has-navbar-fixed-top">
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" type="text/css" href="${baseURL}/inspector.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css">
<script src="https://kit.fontawesome.com/aeb44cf583.js" crossorigin="anonymous"></script>
<meta property="og:type" content="article"/>
${description ? `<meta name="description" content=${description}/>` : ''}
<meta property="og:url" content="${url}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image" content="${imageURL}"/>

<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="${url}" />
<meta name="twitter:creator" content="${twitterCreator}" />
<meta name="twitter:title" content=${title} />
<meta name="twitter:description" content=${description} />
<meta name="twitter:image" content=${imageURL} />

<body>
${topbar.outerHTML}
<div class="columns">
  ${sidebar.outerHTML}
  <div class="column is-half">
    <div style="text-align:right;">
      <svg width="20" height="16" viewBox="0 0 16 16" fill="currentColor" class="ml2 mr1"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 1.75C3.80964 1.75 3.25 2.30964 3.25 3C3.25 3.69036 3.80964 4.25 4.5 4.25C5.19036 4.25 5.75 3.69036 5.75 3C5.75 2.30964 5.19036 1.75 4.5 1.75ZM1.75 3C1.75 1.48122 2.98122 0.25 4.5 0.25C6.01878 0.25 7.25 1.48122 7.25 3C7.25 4.16599 6.52434 5.1625 5.5 5.56253V7H8.5C9.4199 7 10.1947 6.37895 10.4281 5.53327C9.44188 5.11546 8.75 4.13853 8.75 3C8.75 1.48122 9.98122 0.25 11.5 0.25C13.0188 0.25 14.25 1.48122 14.25 3C14.25 4.18168 13.5047 5.18928 12.4585 5.57835C12.1782 7.51343 10.5127 9 8.5 9H5.5V10.4375C6.52434 10.8375 7.25 11.834 7.25 13C7.25 14.5188 6.01878 15.75 4.5 15.75C2.98122 15.75 1.75 14.5188 1.75 13C1.75 11.834 2.47566 10.8375 3.5 10.4375L3.5 9V7V5.56253C2.47566 5.1625 1.75 4.16599 1.75 3ZM4.5 11.75C3.80964 11.75 3.25 12.3096 3.25 13C3.25 13.6904 3.80964 14.25 4.5 14.25C5.19036 14.25 5.75 13.6904 5.75 13C5.75 12.3096 5.19036 11.75 4.5 11.75ZM10.25 3C10.25 2.30964 10.8096 1.75 11.5 1.75C12.1904 1.75 12.75 2.30964 12.75 3C12.75 3.69036 12.1904 4.25 11.5 4.25C10.8096 4.25 10.25 3.69036 10.25 3Z"></path></svg>
      <strong>Fork</strong> this on <a href=${notebookURL}>Observablehq.com</a>
    </div>
    <br>
    <div id="notebook" class="content">
    </div>
  </div>
</div>

<script type="module">

import define from "${baseURL}/index.js";
import {Runtime, Library, Inspector} from "${baseURL}/runtime.js";

const runtime = new Runtime();
const main = runtime.module(define, Inspector.into(document.querySelector("#notebook")));
</script>

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <small>&copy; Copyright ${new Date().getFullYear()}, Tom Larkworthy</small>
    </p>
    <p>
      ${
        notebookURL
          ? html`The forkable notebook source code is available on <a href=${notebookURL}>Observablehq.com</a>. Deployed using <a href="https://observablehq.com/@tomlarkworthy/notebook-to-netlify">@tomlarkworthy/notebook-to-netlify</a>.`
              .outerHTML
          : null
      } 
      The website contentis licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>
</body>
</html>
`;
}
)}

function _customNotebookURL(customNotebookIndex){return(
(options) => `data:text/html;charset=UTF-8,${encodeURIComponent(
  customNotebookIndex(options)
)}`
)}

function _notebookGallery(topbar,sidebar){return(
() => {
  const title = `Tom's notebook gallery`;
  const description =
    "Gallery of noteoboks authored by Tom Larkworthy on https://observablehq.com, all forkable with pointers to their original source";
  const imageURL = null;
  return `<!DOCTYPE html>
<html class="has-navbar-fixed-top">
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css">
<script src="https://kit.fontawesome.com/aeb44cf583.js" crossorigin="anonymous"></script>
<meta property="og:type" content="article"/>
<meta name="description" content="${description}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:image" content="${imageURL}"/>

<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="https://tomlarkworthy.endpointservices.net" />
<meta name="twitter:creator" content="@tomlarkworhy" />
<meta name="twitter:title" content=${title} />
<meta name="twitter:description" content=${description} />
<meta name="twitter:image" content=${imageURL} />

<body>
${topbar.outerHTML}
<div class="columns">
  ${sidebar.outerHTML}
  <div class="column is-half">
    
  </div>
</div>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <small>&copy; Copyright ${new Date().getFullYear()}, Tom Larkworthy</small>
    </p>
    <p>
      Deployed using <a href="https://observablehq.com/@tomlarkworthy/notebook-to-netlify">@tomlarkworthy/notebook-to-netlify</a>.
      The website contentis licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
    </p>
  </div>
</footer>
</body>
</html>
`;
}
)}

function _15(md){return(
md`## Implementation`
)}

function _notebook(notebooks){return(
{
  title: notebooks[0].title,
  slug: notebooks[0].slug,
  thumbnail: notebooks[0].thumbnail,
  collection: notebooks[0]?.collection?.slug,
  owner: notebooks[0].owner.login
}
)}

function _storage(storageClient){return(
storageClient('gs://o_tomlarkworthy_toms').ref(
  "/backups/notebooks/@tomlarkworthy"
)
)}

function _state(){return(
{
  expansions: {},
  unpacked: {}
}
)}

function _19(md){return(
md`## Deployers`
)}

function _deployNotebookTgz(state,htl,md,untar,pako,fetchp,storageClient,promiseRecursive,deployStaticFiles){return(
async function* deployNotebookTgz({ slug, owner } = {}) {
  const name = `@${owner}/${slug}`;
  if (!state.expansions[name]) {
    let expand;
    state.expansions[name] = new Promise(resolve => (expand = resolve));
    yield Object.defineProperty(
      htl.html`<button onclick=${expand}>${name}</button>`,
      'value',
      {
        value: state.expansions[name]
      }
    );
  }
  await state.expansions[name];

  if (!state.unpacked[name]) {
    yield md`Preparing deploy from backups`;

    const url = `https://api.observablehq.com/@${owner}/${slug}.tgz?v=3`;
    const contents = await untar(
      await pako.ungzip(await (await fetchp(url)).arrayBuffer()).buffer
    );

    // unzip tar into storage so you can get the URL
    const unpackPromise = contents.map(async file => {
      const filename = file.name.substring(2); // trim "./"
      const ref = storageClient('gs://o_tomlarkworthy_toms').ref(
        "/deploys/notebooks/" + name + "/" + filename
      );
      await ref.put(file.buffer);
      return {
        name: filename,
        url: await ref.getDownloadURL()
      };
    });

    state.unpacked[name] = await promiseRecursive(unpackPromise);
  }

  yield deployStaticFiles({
    app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
    immediate: true,
    files: state.unpacked[name].map(file => ({
      source: file.url,
      target: `/notebooks/${name}/${file.name}`,
      tags: ['notebook_tgz']
    }))
  });
}
)}

function _deployCustomNotebookPage(customNotebookURL,html,deployStaticFile,name){return(
async ({
  owner,
  slug,
  title,
  description,
  thumbnail,
  collection
}) => {
  const target = `/notebooks/${owner}/${slug}.html`;
  const notebookURL = `https://observablehq.com/@${owner}/${slug}`;
  const preview = customNotebookURL({
    title,
    description,
    baseURL: `https://tomlarkworthy.endpointservices.net/notebooks/@${owner}/${slug}`,
    notebookURL,
    url: target,
    imageURL: `https://static.observableusercontent.com/thumbnail/${thumbnail}.jpg`
  });

  return html`
    <div><a href=${notebookURL}>notebook</a></div>
    <div><a href=${preview}>preview (right click)</a></div>
    <div><a target="_blank" href=${'https://tomlarkworthy.endpointservices.net' +
      target}>deployed ${target}</a></div>
    ${await deployStaticFile({
      app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02',
      source: preview,
      target,
      tags: collection ? ['notebook', collection] : ['notebook'],
      dependsOnTags: [name],
      title,
      owner,
      slug
    })}
  `;
}
)}

function _22(md){return(
md`## Imports`
)}

function _sort(){return(
"updated"
)}

function _username(getContext){return(
getContext().serverless ? new Promise(() => {}) : "tomlarkworthy"
)}

function _pako(require){return(
require('https://bundle.run/pako@2.0.3')
)}

function _untar(require){return(
require('js-untar')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["storageLogin"], _2);
  main.variable(observer()).define(["md","notebook"], _3);
  main.variable(observer()).define(["deployCustomNotebookPage","notebook"], _4);
  main.variable(observer()).define(["md","notebook"], _5);
  main.variable(observer()).define(["deployNotebookTgz","notebook"], _6);
  main.variable(observer()).define(["htl","state"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof search")).define("viewof search", ["Inputs","notebookData"], _search);
  main.variable(observer("search")).define("search", ["Generators", "viewof search"], (G, _) => G.input(_));
  main.variable(observer()).define(["viewof notebooks"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("customNotebookIndex")).define("customNotebookIndex", ["topbar","sidebar","html"], _customNotebookIndex);
  main.variable(observer("customNotebookURL")).define("customNotebookURL", ["customNotebookIndex"], _customNotebookURL);
  main.variable(observer("notebookGallery")).define("notebookGallery", ["topbar","sidebar"], _notebookGallery);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("notebook")).define("notebook", ["notebooks"], _notebook);
  main.variable(observer("storage")).define("storage", ["storageClient"], _storage);
  main.define("initial state", _state);
  main.variable(observer("mutable state")).define("mutable state", ["Mutable", "initial state"], (M, _) => new M(_));
  main.variable(observer("state")).define("state", ["mutable state"], _ => _.generator);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("deployNotebookTgz")).define("deployNotebookTgz", ["state","htl","md","untar","pako","fetchp","storageClient","promiseRecursive","deployStaticFiles"], _deployNotebookTgz);
  main.variable(observer("deployCustomNotebookPage")).define("deployCustomNotebookPage", ["customNotebookURL","html","deployStaticFile","name"], _deployCustomNotebookPage);
  main.variable(observer()).define(["md"], _22);
  const child1 = runtime.module(define1);
  main.import("storageClient", child1);
  main.import("storageLogin", child1);
  const child2 = runtime.module(define2);
  main.import("deployStaticFiles", child2);
  main.import("deployStaticFile", child2);
  const child3 = runtime.module(define3);
  main.import("getContext", child3);
  main.variable(observer("sort")).define("sort", _sort);
  main.variable(observer("username")).define("username", ["getContext"], _username);
  const child4 = runtime.module(define4).derive(["username"], main);
  main.import("notebooks", "notebookData", child4);
  const child5 = runtime.module(define4).derive(["sort",{name: "search", alias: "notebooks"}], main);
  main.import("viewof selection", "viewof notebooks", child5);
  main.import("selection", "notebooks", child5);
  main.variable(observer("pako")).define("pako", ["require"], _pako);
  main.variable(observer("untar")).define("untar", ["require"], _untar);
  const child6 = runtime.module(define3);
  main.import("deploy", child6);
  const child7 = runtime.module(define5);
  main.import("sidebar", child7);
  main.import("articleHeader", child7);
  main.import("topbar", child7);
  const child8 = runtime.module(define6);
  main.import("promiseRecursive", child8);
  const child9 = runtime.module(define7);
  main.import("fetchp", child9);
  return main;
}
