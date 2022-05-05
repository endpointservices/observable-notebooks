// https://observablehq.com/@tomlarkworthy/gapi@470
import define1 from "./3d9d1394d858ca97@553.js";
import define2 from "./048a17a165be198d@263.js";

async function _1(md,FileAttachment){return(
md`# Google API Client

Lets try and make the [Google APIs](https://github.com/google/google-api-javascript-client) easier to use in Observable. Feedback welcome (use the burger menu to the left to 'Add Comment').

## Autocomplete!
If you correctly setup a [discovery doc](https://developers.google.com/apis-explorer/#p/), autocomplete on observable works! Press TAB on the client object after a **.** to see your options! _exampleClient.logging_ should be an autocompleted item in this notebook

<img width="400px" src="${await FileAttachment("image.png").url()}"></img>

## Auth

I use Google (Cloud) APIs [serverside](https://observablehq.com/@tomlarkworthy/serverless-cells) with a service account, so that's the one way to authorize at the moment. You would use this to access resources owned by yourself.

You can also let the user grant the webpage access to their personal resources with Oauth2 (e.g. accessing their Google Drive). Please leave comments if you want an example of that.


## Use field 'resource' to send a body

To set the POST request body use the field 'resource', for example:

~~~js
  response = await exampleClient.logging.projects.locations.buckets.views.create({
    parent: "projects/endpointserviceusers/locations/europe-west1/buckets/users_europe_west1",
    viewId: "t4",
    resource: {
      "name": "t4",
      "description": "",
      "filter": ""
    }
  })
~~~
`
)}

function _2(signature,createGapi){return(
signature(createGapi)
)}

function _createGapi(require,getAccessTokenFromServiceAccount){return(
async function createGapi({
  // Create API key https://cloud.google.com/docs/authentication/api-keys
  apiKey = undefined,
  // Find the APIs you want to use https://developers.google.com/apis-explorer/#p/
  discoveryDocs = [],
  // One way of authenticating is with an access_token
  // gcloud auth print-access-token
  access_token = undefined,
  // Another is with a service account key like
  /*
  {
    "type": "service_account",
    "project_id": "...",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "...@....iam.gserviceaccount.com",
    "client_id": "....",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/....iam.gserviceaccount.com"
  }*/
  service_account_key = undefined
} = {}) {
  const gapi = await new Promise((resolve, reject) => {
    require("https://apis.google.com/js/api.js")
      .catch(() => {
        window.gapi.load("client:auth2", () => resolve(window.gapi));
      })
      .then(() => {
        window.gapi.load("client:auth2", () => resolve(window.gapi)); // Embeds work?
      });
  });
  await gapi.client.init({
    apiKey,
    discoveryDocs
  });
  // Auth based on config
  if (service_account_key) {
    console.log("Using service account to mint access token");
    access_token = await getAccessTokenFromServiceAccount(service_account_key);
  }
  if (access_token) {
    console.log("Using access token");
    gapi.client.setToken({
      access_token
    });
  }
  return gapi.client;
}
)}

function _4(md){return(
md`## Playground`
)}

function _5(md){return(
md`
A simple way to get an access token for testing is execute:

~~~
    gcloud auth print-access-token --project=endpointservices
~~~
`
)}

function _exampleConfigText(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.textarea({
    value: `{
  "apiKey": "AIzaSyCRV8x-DcOQmZXI_rbEz2-6JCRV7FqIscg",
  "discoveryDocs": ["https://logging.googleapis.com/$discovery/rest?version=v2"],
  "access_token": "ya29.a0AfH6SMB9PzK7H5pFcf3qvyFwp3rukRsWF93crr4unG0UAMJ1u9LaHUQHN_9bS7FhKnN2w7x_0Btuva7FCNVzYCxwwPdnyGdTyBXrdnbSYXgRAK0SDN0csT0-abQNIGjDgH_qp-VaMn_A43MCsvAePWR-9PfW1L9Bvld5z6aSvpRnf7BZiVmk"
}`,
    rows: 10
  }),
  localStorageView("@tomlarkworthy/gapi")
)
)}

function _config(exampleConfigText){return(
JSON.parse(exampleConfigText)
)}

async function _exampleClient(createGapi,config)
{
  try {
    return await createGapi(config);
  } catch (err) {
    return err;
  }
}


async function _response(exampleClient)
{
  try {
    return await exampleClient.monitoring.projects.timeSeries.query({
      name: 'projects/endpointservice',
      query: `fetch generic_task
              | metric 'logging.googleapis.com/user/serverless_cell_duration'
              | align delta(1h)
              | every 1h
              | group_by [metric.namespace], [row_count: row_count()]`
    });
  } catch (err) {
    return err;
  }
}


function _10(response){return(
response.body
)}

function _11(response){return(
response
)}

function _getAccessTokenFromServiceAccount(jsrsasign){return(
async function getAccessTokenFromServiceAccount(serviceAccountKey) {
  // First create a JWT from the credentials
  const tNow = Math.floor((new Date()).getTime() / 1000);
  const sHeader = JSON.stringify({alg: 'RS256', typ: 'JWT'});
  const sPayload = JSON.stringify({
      iss: serviceAccountKey.client_email,
      scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform",
      iat: tNow,
      exp: tNow + 600,
      aud: "https://oauth2.googleapis.com/token",
  });
  const JWT = jsrsasign.KJUR.jws.JWS.sign("RS256", sHeader, sPayload, serviceAccountKey.private_key);
    
  // Swap JWT for access_token
  const tokenResponse = await fetch(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${JWT}`,
    }
  );

  if (tokenResponse.status != 200) {
    throw new Error(await tokenResponse.text())
  }
  return (await tokenResponse.json()).access_token;
}
)}

function _jsrsasign(require){return(
require('https://bundle.run/jsrsasign@10.1.4')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/d87a5d0300d9df3cc0d98f61231763c86eca8b855c09d89085282da84cf009ace28c3e4eb8daf60663f2c1b79f5e113c66865bcaa9b051e6f104b53f99c958de", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["signature","createGapi"], _2);
  main.variable(observer("createGapi")).define("createGapi", ["require","getAccessTokenFromServiceAccount"], _createGapi);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof exampleConfigText")).define("viewof exampleConfigText", ["Inputs","localStorageView"], _exampleConfigText);
  main.variable(observer("exampleConfigText")).define("exampleConfigText", ["Generators", "viewof exampleConfigText"], (G, _) => G.input(_));
  main.variable(observer("config")).define("config", ["exampleConfigText"], _config);
  main.variable(observer("exampleClient")).define("exampleClient", ["createGapi","config"], _exampleClient);
  main.variable(observer("response")).define("response", ["exampleClient"], _response);
  main.variable(observer()).define(["response"], _10);
  main.variable(observer()).define(["response"], _11);
  main.variable(observer("getAccessTokenFromServiceAccount")).define("getAccessTokenFromServiceAccount", ["jsrsasign"], _getAccessTokenFromServiceAccount);
  main.variable(observer("jsrsasign")).define("jsrsasign", ["require"], _jsrsasign);
  const child1 = runtime.module(define1);
  main.import("signature", child1);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  return main;
}
