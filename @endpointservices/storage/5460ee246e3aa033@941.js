// https://observablehq.com/@endpointservices/storage@941
import define1 from "./573e072575f28fb9@454.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./993a0c51ef1175ea@1396.js";
import define4 from "./52d808b188b8672b@129.js";
import define5 from "./dff1e917c89f5e76@1964.js";
import define6 from "./3d9d1394d858ca97@553.js";
import define7 from "./777fe85658e39c55@470.js";
import define8 from "./1956899a56408464@459.js";
import define9 from "./0905542adbad836e@55.js";
import define10 from "./293899bef371e135@290.js";

async function _1(md,FileAttachment){return(
md`![](${await FileAttachment("storage.png").url()})

# Store Files with Storage

At last, upload files! First, provision a *"bucket"* to hold your files. Once logged in you can upload and download files using a *storageClient*. You login with an [IndieWeb]() identity URL, which needs to be linked to an _observableProfile_ to upload and list files.

Files uploaded to the _/public_ prefix can be accessed from anywhere without login.

~~~js
   import {bucket, storageClient, storageLogin, user, observableProfiles} from '@endpointservices/storage'
~~~

These are real Google Cloud Storage buckets accessed through Firebase Storage (including its authorization rules). For power users, it is possible to customize the access logic, map buckets to your local filesystem using [gcs-FUSE](https://cloud.google.com/storage/docs/gcs-fuse), or bulk manipulate them with [gsutil](https://cloud.google.com/storage/docs/gsutil) and access them from other platforms (e.g. colab). Please get in touch to unlock these features.

Usage is currently capped to 20Mb per bucket, and one bucket per ObservableHQ profile.
`
)}

function _2(html,width){return(
html`<iframe width="${width}" height="${width*0.7}" src="https://www.youtube-nocookie.com/embed/hbIbxkacekg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
)}

function _3(md){return(
md`## Provision A Storage Bucket`
)}

function _4(signature,bucket){return(
signature(bucket, {
  description: "Create a Cloud storage bucket that can store files."
})
)}

function _5(md){return(
md`### Example`
)}

async function _myBucket(bucket){return(
await bucket({
  name: "mybucket11",
  location: "europe-west4",
  // status: "deleted",
})
)}

function _7(md){return(
md`## Create a storage client`
)}

function _8(md){return(
md`Every bucket has a unique \`gs://<bucketname>\` identifier. You can use this to initialize a _storageClient_, even in other notebooks... even from other platforms...`
)}

function _storage_link(myBucket){return(
myBucket.link
)}

function _storage(storageClient){return(
storageClient("gs://o_endpointservices_mybucket11")
)}

function _11(md){return(
md`## Get a URL to public object

The default rules allow unauthenticated read access to /public directory and descendents.
`
)}

function _developerGif(storage){return(
storage.ref("/public/developers.gif").getDownloadURL()
)}

function _13(html,developerGif){return(
html`<img src=${developerGif}>`
)}

function _14(md){return(
md`## Login for priviledged access

We use IndieAuth to login both users and admins in.
`
)}

function _storageLogin(weblogin){return(
weblogin
)}

function _17(md){return(
md`## Admins must be linked to ObservableHQ profile URL

Only owners of the observable profile (e.g. @endpointservices) can list and upload files by default. 

To show ownership, the identity URL (e.g. http://tomlarkworthy.endpointservices.net/) needs to host a webpage linked (with rel="me") to the observeable profile URL (e.g. https://observablehq.com/@endpointservices), AND the observable profile URL needs to link back to the identity URL in the websites list. See [microformats](https://microformats.org/wiki/rel-me) wiki.

The [wizard](https://observablehq.com/@endpointservices/login-wizard) will guide you through the setup. If you are logged in successfull the next line will print your linked Observable username.

`
)}

function _observableProfiles(user,endpointserviceusers)
{ // Its a bit of work but you can find the claims in an accessToken buried in the firebase auth SDK
  user
  return JSON.parse(atob(endpointserviceusers.auth().currentUser.toJSON().stsTokenManager.accessToken.split('.')[1]))['observablehq.com']
}


function _19(md){return(
md`## Upload a file

The storage client is a preconfigured Firebase storage client. So you can use its [API documentation](https://firebase.google.com/docs/reference/js/firebase.storage) to find all the ways you can use it.

For a minimal upload we can do it with a simple file input
`
)}

function _20(html,storage){return(
html`<input type="file" onchange=${(evt)=> {
  const file = evt.target.files[0];
  return storage.ref(`/public/${file.name}`).put(file);
}}>`
)}

function _22(md){return(
md`## Download file

Once authenticated as the owner you can download files from anywhere
`
)}

function _23(storage){return(
storage.ref("/foo").getDownloadURL()
)}

function _24(md){return(
md`## List files in directory

Unathenticated users on the default rules are unable to list files, but the bucket owner can.
`
)}

async function _25(storage){return(
(await storage.ref("/public").listAll()).items.map(item => item.name)
)}

function _26(md){return(
md`## More

This is a thin wrapper over a Firebase storage client. Check it full documentation [here](https://firebase.google.com/docs/storage/web/start).
`
)}

function _27(md){return(
md`## Rules

These are the rules we set by default. You can configure others though. See the Firebase [documentation on storage rules](https://firebase.google.com/docs/storage/security).
`
)}

function _defaultRules(subdomain){return(
`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if '${subdomain()}' in request.auth.token['observablehq.com'];
    }
    match /public/{allPaths=**} {
      allow get;
    }
  }
}
`
)}

function _29(md){return(
md`## Implementation`
)}

function _bucket(defaultRules,subdomain,resource,bucket_endpoint){return(
async function bucket({
  name = "default",          // Lowercase, digits, '-' and '_' only.
  state = "active",          // or "deleted"      
  location = 'europe-west4', // https://cloud.google.com/storage/docs/locations
  rules = defaultRules,      // https://firebase.google.com/docs/storage/security/get-started
  cors = [{                  // https://cloud.google.com/storage/docs/json_api/v1/buckets/update
    method: ["*"],
    origin: ["*"],
    responseHeader: ["*"],
    maxAgeSeconds: "3000"
  }]                  
} = {}) {
  if (!name.match(/^[-_a-z0-9]*$/)) throw new Error("Lowercase, digits '-' and '_' in bucket names only")
  const fullname = `o_${subdomain()}_${name}`;
  return resource({
    name: fullname,
    fields: ["", "name", "size", "location", "state", "link", "rules", "cors"],
    endpoint: bucket_endpoint
  })({
     name: fullname, state, location, link: `gs://${fullname}`, rules: rules, cors
  })
}
)}

function _bucket_endpoint(resource_endpoint,updateBucket){return(
resource_endpoint({
  apply: updateBucket,
  name: "bucket",
  max: 1,
  hostNotebook: "@endpointservices/storage",
  configPath: (subdomain, notebook, config) =>
      `services/storage/subdomains/${subdomain}/buckets/${config.name}`
})
)}

function _updateBucket(createGapi,_,fingerprint){return(
async function updateBucket(current, {
    name,
    location,
    state,
    rules,
    link,
    cors
  } = {}, {
    notebook, subdomain, token
  } = {}) {
  
  if (!name.startsWith("o_" + subdomain + "_")) throw new Error("Bucket names must start with o_<subdomain>_")
  
  const gapi = await createGapi({
    "apiKey": "AIzaSyC4q-5jTXGPmPg7-S49QxdFgWHSleGF4xw",
    "discoveryDocs": ["https://storage.googleapis.com/$discovery/rest?version=v1"],
    "access_token": token
  });
  
  if (state === "deleted") {
    await gapi.storage.buckets.delete({
      bucket: name,
    });
    return ({
      state
    })
  } else if (state === "active") {
    const config = ({
      project: 'endpointserviceusers',
      name,
      location,
      cors
    });
    
    // Sync state
    if (current.state !== state || !_.isEqual(current.cors, cors)) {
      if (current.state === "active") {
        await gapi.storage.buckets.update({
          ...config,
          bucket: config.name
        });
      } else {
        try {
          await gapi.storage.buckets.update(config);
        } catch(err) {
          await gapi.storage.buckets.insert(config);
          // Import bucket to Firebase https://firebase.google.com/docs/reference/rest/storage/rest/v1beta/projects.buckets/addFirebase
          const response = await fetch(
            "https://firebasestorage.googleapis.com/v1beta/" +                
            `projects/endpointserviceusers/buckets/${name}:addFirebase`, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}` 
              }
            });
          if (response.status !== 200) {
            throw new Error(`firebasestorage error status ${response.status} ${await response.text()}`)
          }
        }
      }
    }
    current.name = config.name;
    current.location = config.location;
    current.state = state;
    current.link = link;
    current.cors = cors;
    
    // Sync rules
    if (current.rules !== rules) {
      // https://redocly.github.io/redoc/?url=https://api.apis.guru/v2/specs/googleapis.com/firebaserules/v1/openapi.json#operation/firebaserules.projects.rulesets.create
      const rulesetResponse = await fetch(
        "https://firebaserules.googleapis.com/v1/" +                
        `projects/endpointserviceusers/rulesets`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            "metadata": {
              "services": [
                'firebase.storage' // https://github.com/firebase/firebase-admin-node/blob/d961c3f705a8259762a796ac4f4d6a6dd0992eb1/src/security-rules/security-rules.ts#L90
              ]
            },
            "source": {
              "files": [
                {
                  "content": rules,
                  "fingerprint": await fingerprint(rules),
                  "name": "storage.rules"
                }
              ]
            }
          })
        });
      if (rulesetResponse.status !== 200) {
        throw new Error(`firebaserules ruleset error ${rulesetResponse.status} ${await rulesetResponse.text()}`)
      }
      const ruleset = await rulesetResponse.json();
      
      // https://redocly.github.io/redoc/?url=https://api.apis.guru/v2/specs/googleapis.com/firebaserules/v1/openapi.json#operation/firebaserules.projects.releases.list
      const releaseName = `firebase.storage/${name}`;
      const releaseResponse = await fetch(
        'https://firebaserules.googleapis.com/v1/projects/endpointserviceusers' + 
        `/releases/${releaseName}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            "release": {
              // https://github.com/firebase/firebase-admin-node/blob/d961c3f705a8259762a796ac4f4d6a6dd0992eb1/src/security-rules/security-rules.ts#L216
              "name": `projects/endpointserviceusers/releases/${releaseName}`,
              "rulesetName": ruleset.name,
            }
          }),
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        }
      );
      if (releaseResponse.status !== 200) {
        throw new Error(`firebaserules release error ${releaseResponse.status} ${await releaseResponse.text()}`)
      }
      
      current.rules = rules;
    }
    
    return (current)
  } else {
    throw new Error(`Unrecognised state: ${state}`)
  }
}
)}

function _storageClient(endpointserviceusers){return(
function storageClient(link) {
  return endpointserviceusers.storage(link)
}
)}

function _clientconfig(){return(
{
  apiKey: "AIzaSyBquSsEgQnG_rHyasUA95xHN5INnvnh3gc",
  authDomain: "endpointserviceusers.firebaseapp.com",
  projectId: "endpointserviceusers",
  appId: "1:283622646315:web:baa488124636283783006e"
}
)}

function _fingerprint(){return(
async function fingerprint(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer =  await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuffer)));
}
)}

function _37(md){return(
md`### Imports`
)}

function _45(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["storage.png", {url: new URL("./files/2c4b5386929916dd0bdfad6c659a3b1209ff8cd567a651922b03612ed58eab417007bfe078b4de66320e8f709e25d4e8e66dbc1888276d21c68f8f3a5dff3bb4.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["html","width"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["signature","bucket"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof myBucket")).define("viewof myBucket", ["bucket"], _myBucket);
  main.variable(observer("myBucket")).define("myBucket", ["Generators", "viewof myBucket"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("storage_link")).define("storage_link", ["myBucket"], _storage_link);
  main.variable(observer("storage")).define("storage", ["storageClient"], _storage);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("developerGif")).define("developerGif", ["storage"], _developerGif);
  main.variable(observer()).define(["html","developerGif"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("storageLogin")).define("storageLogin", ["weblogin"], _storageLogin);
  const child1 = runtime.module(define1).derive([{name: "endpointserviceusers", alias: "firebase"}], main);
  main.import("weblogin", child1);
  main.import("user", child1);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("observableProfiles")).define("observableProfiles", ["user","endpointserviceusers"], _observableProfiles);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["html","storage"], _20);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["storage"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["storage"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("defaultRules")).define("defaultRules", ["subdomain"], _defaultRules);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("bucket")).define("bucket", ["defaultRules","subdomain","resource","bucket_endpoint"], _bucket);
  main.variable(observer("bucket_endpoint")).define("bucket_endpoint", ["resource_endpoint","updateBucket"], _bucket_endpoint);
  main.variable(observer("updateBucket")).define("updateBucket", ["createGapi","_","fingerprint"], _updateBucket);
  main.variable(observer("storageClient")).define("storageClient", ["endpointserviceusers"], _storageClient);
  main.variable(observer("clientconfig")).define("clientconfig", _clientconfig);
  const child3 = runtime.module(define3).derive([{name: "clientconfig", alias: "firebaseConfig"}], main);
  main.import("firebase", "endpointserviceusers", child3);
  main.variable(observer("fingerprint")).define("fingerprint", _fingerprint);
  main.variable(observer()).define(["md"], _37);
  const child4 = runtime.module(define4);
  main.import("firebase", child4);
  main.import("listen", child4);
  main.import("subdomain", child4);
  main.import("notebook", child4);
  main.import("signinWithAccessToken", child4);
  main.import("getAccessTokenFromServiceAccount", child4);
  const child5 = runtime.module(define5);
  main.import("deploy", child5);
  const child6 = runtime.module(define6);
  main.import("signature", child6);
  const child7 = runtime.module(define7);
  main.import("createGapi", child7);
  const child8 = runtime.module(define8);
  main.import("resource", child8);
  main.import("resource_endpoint", child8);
  const child9 = runtime.module(define9);
  main.import("_", child9);
  const child10 = runtime.module(define10);
  main.import("footer", child10);
  main.variable(observer()).define(["footer"], _45);
  return main;
}
