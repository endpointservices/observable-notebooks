import define1 from "./b5ee47165ef0a032@504.js";
import define2 from "./777fe85658e39c55@470.js";
import define3 from "./a2e58f97fd5e8d7c@756.js";
import define4 from "./993a0c51ef1175ea@1396.js";
import define5 from "./698257e86fae4586@378.js";
import define6 from "./ef672b935bd480fc@623.js";
import define7 from "./293899bef371e135@293.js";

async function _1(md,FileAttachment){return(
md`# How to cache BigQuery results in a public Notebook with Firebase Storage or a Cloud Bucket

<img width="600" src="${await FileAttachment("BQCache.png").url()}"> </img>

BigQuery is powerful, but expensive if misused, so you never want to grant BigQuery API access to the public. For dataviz, a cache of BigQuery data is preferred. But in the ObservableHQ world, we want to be transparent about how we prepared our cache. Ideally we would like to show our BigQuery commands, but not allow them to be run. 

In this notebook I explore a workflow for allowing data to be refreshed right in the browser, from BigQuery, securely, if the correct password is presented. So viewers can see the production commands, but not execute them. It also makes it trivial for the Notebook maintainer to update caches, as it can all be done within the Observable environment. Furthermore, while viewers can read the cache, they are prevented from writing to it.

## Background

A Google service account can both

1. Read from BigQuery
2. Log into Firebase clientside and use clientside services like Firebase Storage

Firebase Storage can be configured to _allow public read access_ and grant _write access to a single user_ (e.g. our service account).

Service accounts should be kept secret, but we can use encryption to hide one in a [public notebook behind a password](https://observablehq.com/@endpointservices/notebook-secret).

Putting all of this together, we can hide a service account in a notebook, and password protect the ability to use it to update the cache.

`
)}

function _2(md){return(
md`## Create a service account

- *Create a service account* in the GCP console [here](https://console.cloud.google.com/iam-admin/serviceaccounts).
- Grant the service account the _BigQuery User_ role.
- Create a JSON key which will download a file like _"larkworthy-dfb11-1e804d36fdda.json"_
`
)}

function _3(md){return(
md`## Encrypt service account credentials

- Open the contents of the key file
- Copy the content of the "secret" portion of the [encyption notebook](https://observablehq.com/@endpointservices/notebook-secret) and set a [strong password](https://passwordsgenerator.net/)
- Copy the encypted payload out and save in your target notebook.

Here is what mine look like:-
`
)}

function _encrypted_service_account_credentials(){return(
{
  name: "AES-GCM",
  salt: "x4gEPgJOp9brBg==",
  iv: "Hwoo2XyMFSJT5FLq",
  ciphertext:
    "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"
}
)}

function _5(md){return(
md`## Import a UI to decrypt the service account`
)}

function _service_account_credentials(decrypt,encrypted_service_account_credentials){return(
decrypt(
  encrypted_service_account_credentials
)
)}

function _8(md){return(
md`Check it works by reading out its result. This will only resolve it you enter a valid password.`
)}

function _9(service_account_credentials){return(
service_account_credentials
)}

async function _10(md,FileAttachment){return(
md`## Create a Google API client targeting BigQuery and login with service account

- Use the [Google API client](https://observablehq.com/@tomlarkworthy/gapi) notebook and a copy of your creds to figure out how to instantiate a GAPI client in its Playground
- You will need to generate an API key at https://console.cloud.google.com/apis/credentials
- You can instantiate a GAPI client direct from unencrypted service account credentials using the "service_account_key" parameter
- Lookup the discovery doc. For BigQuery this is "https://bigquery.googleapis.com/discovery/v1/apis/bigquery/v2/rest"
- Do keep an eye on the devtools console and network output tab, it can help diagnose setup issues

With the API key, the unencrypted service account, and a discovery doc URL, you should be able to use the Playground UI feature to instantiate a client and check it works clientside without disclosing your service account. 

My working one looked like 

![](${await FileAttachment("image.png").url()})

`
)}

function _11(md){return(
md`Once it works in that notebook we can bring it over to our target notebook`
)}

function _gapi_config(service_account_credentials){return(
{
  apiKey: "AIzaSyC-Uh-7CtBwhlZrXvAr1gmnUaZzixeVG84",
  discoveryDocs: [
    "https://bigquery.googleapis.com/discovery/v1/apis/bigquery/v2/rest"
  ],
  service_account_key: JSON.parse(service_account_credentials)
}
)}

async function _bqClient(createGapi,gapi_config){return(
await createGapi(gapi_config)
)}

function _15(md){return(
md`Now we have a working client with autocomplete (press TAB). We can use the [REST API](https://cloud.google.com/bigquery/docs/reference/rest/) documentation to figure out how to execute a query.

Simplest for BigQuery is creating a synchronous query job https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
`
)}

function _bqResponse(bqClient){return(
bqClient.bigquery.jobs.query({
  projectId: "larkworthy-dfb11",
  resource: {
    // See https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query#QueryRequest
    query:
      "SELECT title FROM [bigquery-public-data:hacker_news.stories] WHERE title != 'Placeholder' LIMIT 20",
    useLegacySql: true
  }
})
)}

function _17(md){return(
md`## Tidy results`
)}

function _data(bqResponse){return(
bqResponse.result.rows.map(col => col.f[0])
)}

function _20(Table,data){return(
Table(data)
)}

function _21(md){return(
md`So its the "data" blog we wish to cache. We can also use a service account as an identity to log into Firebase`
)}

function _22(md){return(
md`## Log into Firebase clientside using a Service Account`
)}

function _23(md){return(
md`Add Firebase to your Cloud project, then grab its web config from a URL like https://console.firebase.google.com/u/0/project/larkworthy-dfb11/settings/general/web`
)}

function _firebaseConfig(){return(
{
  // I don't configure everything, we jsut want Auth and storage for this notebook
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  projectId: "larkworthy-dfb11",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049",
  storageBucket: "larkworthy-dfb11.appspot.com"
}
)}

function _25(md){return(
md`Instantiate Firebase SDK with custom config AND Firebase admin for service account login`
)}

function _28(md){return(
md`Now we can login using a service account identity. This is using a service account like a regular user on the internet. So in order to give them special privileges in Firebase Security Rules, we need to discover their uid.`
)}

async function _service_account_user(getAccessTokenFromServiceAccount,service_account_credentials,signinWithAccessToken,firebase)
{
  const token = await getAccessTokenFromServiceAccount(
    service_account_credentials
  );
  await signinWithAccessToken(firebase, token);
  return firebase.auth().currentUser;
}


function _30(md){return(
md`Print their uid for use with rules`
)}

function _31(service_account_user){return(
service_account_user.uid
)}

async function _32(md,FileAttachment){return(
md`## Give the service account user write permission to Firebase Storage

Setup rules for the storage bucket at a URL like https://console.firebase.google.com/u/0/project/larkworthy-dfb11/storage/larkworthy-dfb11.appspot.com/rules

I want public read access, but only the service account can make writes. So using the _uid_ from the step before, my rules look like

![](${await FileAttachment("image@2.png").url()})
`
)}

function _33(md){return(
md`## Write BigQuery results to Firebase Storage

The cool thing with Observable dataflow is the following code will execute automatically when the correct password is entered! 
`
)}

function _34(service_account_user,data,firebase)
{
  service_account_user; // Make sure this cell depends on the service_account_user logging in

  // See https://medium.com/@dorathedev/uploading-json-objects-as-json-files-to-firebase-storage-without-having-or-creating-a-json-file-38ad323af3c4
  // convert your object into a JSON-string
  const string = JSON.stringify(data);
  // create a Blob from the JSON-string
  const blob = new Blob([string], { type: "application/json" });

  // create a reference to the storage
  var ref = firebase.storage().ref("/examples/cache-bigquery/data.json");
  // upload you blob into the storage
  return ref.put(blob);
}


async function _35(md,FileAttachment){return(
md`## Alernatively: Write BigQuery directly to Google Cloud Storage Bucket

We are able to mint *access_tokens* from a Service Account, so we can go directly to a bucket too. This avoids a Firebase dependancy.

We need the *access_token* in a vanilla HTTP PUT request, and the service account needs write permissions to the bucket.  (Storage Object Creator role to write once, or Legacy Bucket Owner to update)

![](${await FileAttachment("image@3.png").url()})
`
)}

async function _uploadToBucket(getAccessTokenFromServiceAccount,service_account_credentials,data)
{
  return (await fetch(`https://www.googleapis.com/upload/storage/v1/b/larkworthy-dfb11.appspot.com/o?name=examples/cache-bigquery/dataalt.json`, {
    headers: {
      'Authorization': `Bearer ${await getAccessTokenFromServiceAccount(service_account_credentials)}`
    },
    method: "POST",
    body: JSON.stringify(data)
  })).text() 

}


function _38(md){return(
md`## Read the cache

By default CORS is not enabled for the Firebase bucket. 

- Enable CORS for the bucket (see [docs](https://firebase.google.com/docs/storage/web/download-files#cors_configuration))
  - It's a bit annoying having to install _gsutils_ locally. You can also use [Cloud Shell](gsutil cors set cors.json gs://larkworthy-dfb11.appspot.com) which will do the authentication with _gsutils_ right in the browser and tidy up after itself.
`
)}

function _cached_data_ref(firebase){return(
firebase
  .storage()
  .ref()
  .child("/examples/cache-bigquery/data.json")
)}

async function _cached_data(cached_data_ref){return(
(await fetch(await cached_data_ref.getDownloadURL())).json()
)}

function _41(md){return(
md`Note we can display this data even without authenticating with Firebase!!! You could of course put the reading of Firebase data in a different notebook too`
)}

function _42(Table,cached_data){return(
Table(cached_data)
)}

function _44(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/fbc397fffdbe52b61932e0103b0325cae160a17d283c91f7069cd45fa6ceb77126c2406184bd88c0f0fc9c4dbc6b6bbfb558789e3fd0932c2bed366d8f20bdfc.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/18624dbd4d6b6bca3f66183a47b4640a0189c1f3fc33f677f52eda3db72a9c021e27daa182c8b0a898a12b8738107514b7f03f050815828e1fcdbb4ecde2042a.png", import.meta.url), mimeType: "image/png", toString}],
    ["BQCache.png", {url: new URL("./files/ea3c89962b18d200e41e79f2a8af4b7c56bd1a1eef909523642599f8c2b98c2ef6a524fb84ae1584fcea0c286be2491af84932e3685d35f5651398da6082403a.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/50ed998f033d3ae2c3fccfe7b9665c917eb9b07efaa94a44ea99c6a0ad81bfa8cbeda923368579bd7bc8722a82304ee269bb395eebe4ba180613a5b62e6e7355.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("encrypted_service_account_credentials")).define("encrypted_service_account_credentials", _encrypted_service_account_credentials);
  main.variable(observer()).define(["md"], _5);
  const child1 = runtime.module(define1);
  main.import("decrypt", child1);
  main.variable(observer("viewof service_account_credentials")).define("viewof service_account_credentials", ["decrypt","encrypted_service_account_credentials"], _service_account_credentials);
  main.variable(observer("service_account_credentials")).define("service_account_credentials", ["Generators", "viewof service_account_credentials"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["service_account_credentials"], _9);
  main.variable(observer()).define(["md","FileAttachment"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("gapi_config")).define("gapi_config", ["service_account_credentials"], _gapi_config);
  const child2 = runtime.module(define2);
  main.import("createGapi", child2);
  main.variable(observer("bqClient")).define("bqClient", ["createGapi","gapi_config"], _bqClient);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("bqResponse")).define("bqResponse", ["bqClient"], _bqResponse);
  main.variable(observer()).define(["md"], _17);
  const child3 = runtime.module(define3);
  main.import("Table", child3);
  main.variable(observer("data")).define("data", ["bqResponse"], _data);
  main.variable(observer()).define(["Table","data"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _25);
  const child4 = runtime.module(define4).derive(["firebaseConfig"], main);
  main.import("firebase", child4);
  const child5 = runtime.module(define5);
  main.import("getAccessTokenFromServiceAccount", child5);
  main.import("signinWithAccessToken", child5);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("service_account_user")).define("service_account_user", ["getAccessTokenFromServiceAccount","service_account_credentials","signinWithAccessToken","firebase"], _service_account_user);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["service_account_user"], _31);
  main.variable(observer()).define(["md","FileAttachment"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["service_account_user","data","firebase"], _34);
  main.variable(observer()).define(["md","FileAttachment"], _35);
  main.variable(observer("uploadToBucket")).define("uploadToBucket", ["getAccessTokenFromServiceAccount","service_account_credentials","data"], _uploadToBucket);
  const child6 = runtime.module(define6);
  main.import("fetchp", child6);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("cached_data_ref")).define("cached_data_ref", ["firebase"], _cached_data_ref);
  main.variable(observer("cached_data")).define("cached_data", ["cached_data_ref"], _cached_data);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["Table","cached_data"], _42);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], _44);
  return main;
}
