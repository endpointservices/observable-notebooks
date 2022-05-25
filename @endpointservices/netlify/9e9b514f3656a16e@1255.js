// https://observablehq.com/@endpointservices/netlify@1255
import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./8253abefced00da1@959.js";
import define3 from "./dff1e917c89f5e76@1711.js";
import define4 from "./c0de6bf6c2f598ef@62.js";
import define5 from "./ef672b935bd480fc@619.js";
import define6 from "./3d9d1394d858ca97@553.js";
import define7 from "./b8a500058f806a6b@10.js";
import define8 from "./293899bef371e135@247.js";

async function _1(html,md,FileAttachment){return(
html`<div class="content">${md`
# Static Site Generator (Netlify)

Deploy an high performance static site from a notebook. Using Observable as the administrative front end to Netlify hosting has a few nice properties.

- Static file hosting for incredible performance.
- Option to create your build tooling and content programatically. 
- All hosted in the browser so no tools to install.
- Out of the box support for Markdown, Latex, SVG and raw HTML. Add your own!
- Partial deployments, only files that change are sent to Netlify. Its fast to deploy.
- Intelligent cacheing, CDN cache is purged on deploy, so no more uncertainty waiting around for the live version to update.
- URL based content definition, deploy files from external sources too.

To use, call _deployStaticFile_ in a content notebook.

~~~js
    import {deployStaticFile, queryDependants} from '@tomlarkworthy/netlify-deploy'
~~~

Instantiate against the *api_id* of your Netlify project (mislabelled app_id here), the URL of the content you wish to deploy, and the path on the website that you want.

~~~js
    deployStaticFile({
      app_id: 'b6a918d2-9cda-4fde-b2ec-add91b22ea02', // Find in Netlify site settings
      source: preview.href,                           // Address to find the content 
      target: "/blogs/jamstack.html",                 // Path suffix on domain
      tags: ["blog"],                                 // Used for organization
      dependsOnTags: ["global"]                       // Content inter-depedencies
    })
~~~

The function will return a HTML form that triggers a deploy:

![](${await FileAttachment("image@5.png").url()})

For a minimal example have a look at [@tdlgkjfhdljovtttqrzu/netlify-test](https://observablehq.com/@tdlgkjfhdljovtttqrzu/netlify-test)

I write my personal blog using this tool. Some examples

- An article template I fork for blog posts https://observablehq.com/@tomlarkworthy/blog-simple-article-template
- Setting up a common page theme: https://observablehq.com/@tomlarkworthy/blog-theme
- Creating a top level index.html of the last 20 articles: https://observablehq.com/@tomlarkworthy/blog-index-html
- Adding an RSS feed: https://observablehq.com/@tomlarkworthy/rss-feed

The blog is hosted on [tomlarkworthy.endpointservices.net](https://tomlarkworthy.endpointservices.net/). On my blog, the footer of each page links the [Observablehq.com](https://observablehq.com) source code.

`}`
)}

function _2(html,md){return(
html`<div class="content">${md`
### One-off Setup
Login to Endpoint Services and Authorize it with Netlify
`}`
)}

async function _authorizer($0,html,session,firebase,params,nextNonce,client_id)
{
  // Ensure user is logged in
  if (!($0).value.uid) return html`${$0}`;
  if (session.access_token) {
    async function unauthorize() {
      await firebase.firestore()
        .doc(`/services/netlify-proxy/sessions/${($0).value.uid}`)
        .delete();
    }
    return html`<div>
                ${$0}
                <a class="button"
                   href="https://app.netlify.com/authorize"
                   onclick=${unauthorize}>Unauthorize with Netlify</a>`
  } else if (params.access_token) {
    if (session.nonce === params.state.nonce) {
      await firebase.firestore()
        .doc(`/services/netlify-proxy/sessions/${($0).value.uid}`)
        .set({
          access_token: params.access_token,
          token_type: params.token_type
        }, {merge: true});
      return html`Authorized`;
    } else {
      return html`<a class="button" href="https://observablehq.com/@endpointservices/netlify">Mismatched nonce reload</a>`;
    }
  } else {
    if (nextNonce !== session.nonce) {
      await firebase.firestore()
        .doc(`/services/netlify-proxy/sessions/${($0).value.uid}`)
        .set({
          nonce: nextNonce
        }, {merge: true});
    }
    
    async function authorize(evt) {
      const url = 'https://app.netlify.com/authorize?' +
            'client_id=' + client_id +
            '&response_type=token' +
            '&redirect_uri=https://observablehq.com/@endpointservices/netlify' +
            '&state=' + encodeURIComponent(JSON.stringify(session));
      evt.target.href = url;
    }

    return html`<div>
      ${$0}
      <a class="button"
         href="https://app.netlify.com/authorize"
         onclick=${authorize}>authorize with Netlify</a>
    </div>`
  }
  
}


function _4(html,md){return(
html`<div class="content">${md`
## Static Site Generator library functions
`}`
)}

function _5(signature,deployStaticFile){return(
signature(deployStaticFile, {
  description: 'Deploys a file to a path on a Netlify hosted domain.',
  open: true
})
)}

function _deployStaticFile(deployStaticFiles){return(
async function deployStaticFile({
    app_id,             // Netlify api_id (typod to app_id)
    target,             // Path on domain to deploy this file to
    source,             // URL where to fecth file contents.
    tags = [],          // Search tags for content queries
    dependsOnTags = [], // Describe depedencies between content
    ...metadata         // Additional user fields to be saved in CMS
  } = {}) {
  return deployStaticFiles({
    app_id,
    files: [{
      app_id,
      target,
      source,
      tags,
      dependsOnTags,
      ...metadata
    }]
  })
}
)}

function _7(signature,deployStaticFiles){return(
signature(deployStaticFiles, {
  description: 'Deploys several files on Netlify hosted domain.',
  open: true
})
)}

function _deployStaticFiles(spinners,html,$0,session,nextNonce,firebase,client_id,location,promiseRecursive,message,updateDigest,createDeploy,deployments,uploadContent,md,Inputs){return(
async function deployStaticFiles({
    app_id,             // Netlify api_id (typod to app_id)
    immediate = false,    // auto-deploy (no button click)
    files = [
      //target,             // Path on domain to deploy this file to
      //source,             // URL where to fecth file contents.
      //tags = [],          // Search tags for content queries
      //dependsOnTags = [], // Describe depedencies between content
      //...metadata         // Additional user fields to be saved in CMS
    ]
  } = {}) {
  const id = files[0].target;
  if (spinners[id]) return html`${spinners[id]}`;
  
  // Ensure user is logged in
  if (!($0).value.uid) return html`${$0}`;
  
  // If there is no session data
  if (!session.access_token) {  
    "deployStaticFiles: no access token"
    if (nextNonce !== session.nonce) {
      await firebase.firestore()
        .doc(`/services/netlify-proxy/sessions/${($0).value.uid}`)
        .set({
          nonce: nextNonce
        }, {merge: true});
    }
    
    async function authorize(evt) {
      const url = 'https://app.netlify.com/authorize?' +
            'client_id=' + client_id +
            '&response_type=token' +
            '&redirect_uri=https://observablehq.com/@endpointservices/netlify' +
            '&state=' + encodeURIComponent(JSON.stringify(session));
      evt.target.href = url;
    }
    
    return html`
          <a class="button"
           href="https://app.netlify.com/authorize"
           onclick=${authorize}>authorize with Netlify</a>
    `;
  }
  // have access token
  const subdomain = location.host.split(".")[0];
  
  
  async function digestFileAndDeploySite(evt) {
    const unitsPromise = files.map(async file => {
      const unit = ({
        ...file,
        source: file.source,
        tags: file.tags || [],
        dependsOnTags: file.dependsOnTags || [],
        app_id,
        target: file.target,
        type: "file",
        safeTarget: encodeURIComponent(file.target),
      });

      const unitURI = `/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units/${unit.safeTarget}`;

      console.log("deployStaticFile: fetching previous deploy");
      const existing = (await firebase.firestore().doc(unitURI).get()).data()


      if (existing && existing.creationDate === undefined) {
        console.log("deployStaticFile: backfilling creationDate");
        await firebase.firestore()
          .doc(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units/${unit.safeTarget}`)
          .set({creationDate: firebase.firebase_.firestore.FieldValue.serverTimestamp()}, {merge: true})
      }

      console.log("deployStaticFile: syncing paramaters");
      await firebase.firestore()
        .doc(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units/${unit.safeTarget}`)
        .set({
          ...(!existing && {
            creationDate: firebase.firebase_.firestore.FieldValue.serverTimestamp()
          }),
          ...unit
        }, {merge: true})

      return unit;
    });

    var units = await promiseRecursive(unitsPromise);

    var tags = units.reduce(
      (list, unit) => list.concat(unit.tags)
      ,[]
    )


    const cache = {};
    
    message(id, "Deploying...\nQuerying dependents");
    
    // For now we do one round of dependencies
    const dependees = tags.length > 0 ? (await firebase.firestore()
                      .collection(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units`)
                      .where("type", "==", "file")
                      .where("dependsOnTags", "array-contains-any", [...new Set(tags || [])])
                      .limit(100)
                      .get()).docs.map(d => d.data())
                      : [];
    
    const updates = dependees.concat(units).map(unit => updateDigest({
      app_id, subdomain
    }, unit, cache));
    
    message(id, `${updates.length} files to update`)
    await Promise.all(updates);
    
    
    message(id, `Retreiving existing ${dependees.length} files metadata`)
    const existingFiles = (await firebase.firestore()
                      .collection(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units`)
                      .where("type", "==", "file")
                      .get()).docs.map(d => d.data());
    
    // console.log(existingFiles, cache)
    message(id, `Creating deploy with Netlify`)
    const deploy_json = await createDeploy(app_id, existingFiles);
    const requiredDigests = deploy_json.required;
    deployments[id] = deploy_json.ssl_url;
    message(id, `Syncing required files ${requiredDigests}`)
    const uploads = requiredDigests.map(digest => {
      if (!cache[digest]) {
        console.error(`Netlify has requested digest ${digest} which was not part of our sync`);
        // So lets find it
        let record;
        firebase.firestore()
          .collection(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units`)
          .where("digest", "==", digest)
          .get()
          .then(snap => {
            record = snap.docs[0].data()
            return fetch(record.source);
          }).then(response => response.text())
          .then(content => {
            return uploadContent(deploy_json.id, record.target, content);
          })
      } else {
        return uploadContent(deploy_json.id, cache[digest].target, cache[digest].content);
      }
    });
                        
    try {
      await Promise.all(uploads);
      message(id, null);
    } catch (err) {
      message(id, err.message);
    }
  }
  if (immediate && (!deployments[id])) {
    deployments[id] = 'inprogress'
    digestFileAndDeploySite()
  } else if (deployments[id] === 'inprogress') {
    return md`Deployment in progress`
  } else {
    return html`
      ${Inputs.table(files)}
    ${deployments[id] ?
      html`<p>Deployed to <a target="_blank" href=${deployments[id] + files[0].target}>${deployments[id] +  files[0].target}</a>`
      : null}
    <button class="button" onclick=${digestFileAndDeploySite}>deploy</button>
    `
  }
}
)}

function _9(signature,queryDependants){return(
signature(queryDependants, {
  description: 'Query dependants searches for all content with specific tags, useful for content grouping, sitemaps RSS feeds etc.',
  open: true
})
)}

function _queryDependants(location,listen,firebase){return(
function queryDependants({
    app_id,
    dependsOnTags,
    limit = 100
  } = {}) {
  const subdomain = location.host.split(".")[0]
  return listen(firebase.firestore().collection(
    `/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units`)
        .where("type", "==", "file")
        .where("tags", "array-contains-any", [...new Set(dependsOnTags)])
        .orderBy("creationDate", "desc")
        .limit(limit)
    );  
}
)}

async function _11(html,md,FileAttachment){return(
html`<div class=content>${
md`### Setup up your Netlify


Create a Netfliy site (without git)
![](${await FileAttachment("image.png").url()})

Drag and empty folder, this creates a new site.

![](${await FileAttachment("image@2.png").url()})

Make a note of its API ID

![](${await FileAttachment("image@3.png").url()})

`}`
)}

function _12(html,md){return(
html`<div class="content">${
md`## Supporting state
`}`
)}

function _message($0){return(
function message(id, message) {
  $0.value = ({
    ...$0.value,
    id: message
  })
}
)}

function _spinners(){return(
{

}
)}

function _deployments(){return(
{

}
)}

function _params(URLSearchParams,location)
{
  const params = Object.fromEntries(new URLSearchParams(location.hash.substring(1)).entries())
  params.state = params.state ? JSON.parse(decodeURIComponent(params.state)): null;
  return params;
}


function _session($0,listen,firebase){return(
($0).value.uid ? listen(firebase.firestore().doc(`/services/netlify-proxy/sessions/${($0).value.uid}`), {
  defaultValue: {}
}): {}
)}

function _nextNonce(){return(
Math.random()
)}

function _updateDigest(hashes,firebase){return(
async function updateDigest({
    subdomain, app_id
  } = {}, unit, cache) {
  const response = await fetch(unit.source)
  if (response.status >= 400) throw new Error(`Cannot remote resource: ${unit.source}`)
  const content = await response.text();
  const digest = await new hashes.SHA1().hex(content);
  await firebase.firestore()
    .doc(`/services/netlify-proxy/subdomains/${subdomain}/apps/${app_id}/units/${unit.safeTarget}`)
    .set({digest}, {merge:true})
  console.log(`${unit.target} has digest: ${digest}, content: ${content.substring(20)}`)
  cache[digest] = {
    content: content,
    target: unit.target,
    digest: digest,
  };
}
)}

function _createDeploy(fetchp,session){return(
async function createDeploy(app_id, files) {

  const deploy_response = await fetchp(`https://api.netlify.com/api/v1/sites/${app_id}/deploys`, {
    method: "POST",
    body: JSON.stringify({
      "files": files.reduce(
        (acc, file) => ({ ...acc, [file.target]: file.digest }),
        {}
      )
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`
    }
  });
  if (deploy_response.status !== 200)
    throw new Error(`${deploy_response.status}): ${deploy_response.text()}`);
  const deploy = await deploy_response.json();
  console.log(deploy)
  return deploy;
}
)}

function _uploadContent(fetchp,session){return(
async function uploadContent(deploy_id, target, content) {
  const netlify = "https://api.netlify.com/api/v1";
  const uploadResponse = await fetchp(`${netlify}/deploys/${deploy_id}/files/${target}`, {
    method: "PUT",
    body: new TextEncoder().encode(content),
    headers: {
      "Content-Type": "application/octet-stream",
      "Authorization": `Bearer ${session.access_token}`
    }
  })
  const text = await uploadResponse.text();
  if (uploadResponse.status >= 400) throw new Error(text)
  return text;
}
)}

function _version(){return(
9
)}

function _hashes(require){return(
require("jshashes")
)}

function _client_id(){return(
"nR-8fzREOHe0-6B2vGY6czBXxxpurQloK0niTCRR4PM"
)}

function _25(html){return(
html`<div class="content"><h4> Credits</h4><p>
Preview image, <span>Photo by <a href="https://unsplash.com/@andredantan19?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Andre Tan</a> on <a href="https://unsplash.com/s/photos/static?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
`
)}

function _26(html){return(
html`<div class="content"><h4> Imports`
)}

function _34(bulma){return(
bulma
)}

function _36(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/828a7e731e643b93e2abaf5bd206e1b1b4c9fd0f88526c3714c1dd2f3efba17ed3f403cec8299bc727df64210ebc5077bb57b13d824e7b7848ca19fc9019c9cc", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/54e88b3adc3bcfcf2ccaa8f572e87f9466b08254c241ec4ef382f73504a9e7b484e5d71108eef168c8eb53ccea3ef8b30d2fa0134626e71079dbacca51e32897", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/43094e670aa7e161a39587fb31042c51d8fef2785a86ee68cb846e678d5a15e476b447502c8b7b5818e9b1e8e828b0eee2cc26d187fa02f9b138b61b79561e00", import.meta.url), mimeType: "image/png", toString}],
    ["image@5.png", {url: new URL("./files/9a8c6eb0b661748266a1dd047581f160cedb0e80b165e49299a6c6e443acac6c866fdb8b18cee5d0bcb01cd86c5284586b7754918aefddddc4707ac80a705111", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["html","md","FileAttachment"], _1);
  main.variable(observer()).define(["html","md"], _2);
  main.variable(observer("authorizer")).define("authorizer", ["viewof user","html","session","firebase","params","nextNonce","client_id"], _authorizer);
  main.variable(observer()).define(["html","md"], _4);
  main.variable(observer()).define(["signature","deployStaticFile"], _5);
  main.variable(observer("deployStaticFile")).define("deployStaticFile", ["deployStaticFiles"], _deployStaticFile);
  main.variable(observer()).define(["signature","deployStaticFiles"], _7);
  main.variable(observer("deployStaticFiles")).define("deployStaticFiles", ["spinners","html","viewof user","session","nextNonce","firebase","client_id","location","promiseRecursive","message","updateDigest","createDeploy","deployments","uploadContent","md","Inputs"], _deployStaticFiles);
  main.variable(observer()).define(["signature","queryDependants"], _9);
  main.variable(observer("queryDependants")).define("queryDependants", ["location","listen","firebase"], _queryDependants);
  main.variable(observer()).define(["html","md","FileAttachment"], _11);
  main.variable(observer()).define(["html","md"], _12);
  main.variable(observer("message")).define("message", ["mutable spinners"], _message);
  main.define("initial spinners", _spinners);
  main.variable(observer("mutable spinners")).define("mutable spinners", ["Mutable", "initial spinners"], (M, _) => new M(_));
  main.variable(observer("spinners")).define("spinners", ["mutable spinners"], _ => _.generator);
  main.define("initial deployments", _deployments);
  main.variable(observer("mutable deployments")).define("mutable deployments", ["Mutable", "initial deployments"], (M, _) => new M(_));
  main.variable(observer("deployments")).define("deployments", ["mutable deployments"], _ => _.generator);
  main.variable(observer("params")).define("params", ["URLSearchParams","location"], _params);
  main.variable(observer("session")).define("session", ["viewof user","listen","firebase"], _session);
  main.variable(observer("nextNonce")).define("nextNonce", _nextNonce);
  main.variable(observer("updateDigest")).define("updateDigest", ["hashes","firebase"], _updateDigest);
  main.variable(observer("createDeploy")).define("createDeploy", ["fetchp","session"], _createDeploy);
  main.variable(observer("uploadContent")).define("uploadContent", ["fetchp","session"], _uploadContent);
  main.variable(observer("version")).define("version", _version);
  main.variable(observer("hashes")).define("hashes", ["require"], _hashes);
  main.variable(observer("client_id")).define("client_id", _client_id);
  main.variable(observer()).define(["html"], _25);
  main.variable(observer()).define(["html"], _26);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("viewof user", child2);
  main.import("user", child2);
  main.import("firebase", child2);
  main.import("listen", child2);
  const child3 = runtime.module(define3);
  main.import("deploy", child3);
  const child4 = runtime.module(define4);
  main.import("bulma", child4);
  const child5 = runtime.module(define5);
  main.import("fetchp", child5);
  const child6 = runtime.module(define6);
  main.import("signature", child6);
  const child7 = runtime.module(define7);
  main.import("promiseRecursive", child7);
  main.variable(observer()).define(["bulma"], _34);
  const child8 = runtime.module(define8);
  main.import("footer", child8);
  main.variable(observer()).define(["footer"], _36);
  return main;
}
