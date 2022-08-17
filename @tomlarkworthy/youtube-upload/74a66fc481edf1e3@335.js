// https://observablehq.com/@tomlarkworthy/youtube-upload@335
import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./293899bef371e135@278.js";

async function _1(md,FileAttachment){return(
md`
# YouTube API Video Upload

<iframe width="560" height="315" src="https://www.youtube.com/embed/FThG8pVGIS0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The Notebook is about how to upload a video using the YouTube API.

We need the YouTube Data API setup, and an Oauth Web Client redirecting to the Observable Notebook.

Caution, you only get 6 attempts a day! Quota is extremely tight. I have disabled this notebooks uploads, you need to setup your own.

[my quota page](https://console.cloud.google.com/iam-admin/quotas/details;servicem=youtube.googleapis.com;metricm=youtube.googleapis.com%2Fdefault;limitIdm=1%2Fd%2F%7Bproject%7D?project=endpointservice)

I had to authorize "https://tomlarkworthy.static.observableusercontent.com" as a Javascript Origin
![](${await FileAttachment("image@1.png").url()})

`
)}

function _client_id(){return(
"1986724398-5adiabbdrs6lrdh54m25nv9l2afjvl2q.apps.googleusercontent.com"
)}

function _api_key(){return(
"AIzaSyCQXyMj3N6KWJ4PEdOtSZ_gLnIZwAep4Uo"
)}

async function _gapi(require)
{
  const gapi = await require("https://apis.google.com/js/api.js").catch(() => window.gapi);
  await new Promise((callback, onerror) => gapi.load("client", {callback, onerror}));
  return gapi;
}


function _auth(api_key,client_id,gapi,html)
{
  // Enter an API key from the Google API Console:
  // https://console.developers.google.com/apis/credentials
  var apiKey = api_key;

  // Enter the API Discovery Docs that describes the APIs you want to
  // access. In this example, we are accessing the People API, so we load
  // Discovery Doc found here: https://developers.google.com/people/api/rest/
  var discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];

  // Enter a client ID for a web application from the Google API Console:
  //   https://console.developers.google.com/apis/credentials?project=_
  // In your API Console project, add a JavaScript origin that corresponds
  //   to the domain where you will be running the script.
  var clientId = client_id;

  // Enter one or more authorization scopes. Refer to the documentation for
  // the API or https://developers.google.com/people/v1/how-tos/authorizing
  // for details.
  var scopes = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
  ];

  function initClient() {
    console.log("Init client")
    gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes.join(" ")
    }).then(function () {
      console.log("Initialize login")
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  function updateSigninStatus(isSignedIn) {
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');
    authorizeButton.style.display = isSignedIn ? 'none' : 'block';
    signoutButton.style.display = isSignedIn ? 'block' : 'none';
  }

  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
  
  initClient();
  
  return html`
    <div>
      <button id="authorize-button" style="display: none;" onclick=${handleAuthClick}>Authorize</button>
      <button id="signout-button" style="display: none;" onclick=${handleSignoutClick}>Sign Out</button>
    </div>
  `
}


async function _contents(FileAttachment){return(
new Uint8Array(await FileAttachment("sample_640x360.mp4").arrayBuffer())
)}

function _Uint8ToString(){return(
function Uint8ToString(u8a){
  var CHUNK_SZ = 0x8000;
  var c = [];
  for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
  }
  return c.join("");
}
)}

function _11(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@1.png", {url: new URL("./files/94bb84b4421bd4631f49c0fac54086acd75a480a4aabe6634dcc92a7766180d9aef410c1a81aacc4c1281c16c3e55397e8e9c4943f76acedbda95dcec2a9e99f.png", import.meta.url), mimeType: "image/png", toString}],
    ["sample_640x360.mp4", {url: new URL("./files/0a1b11884b66a719beec84172feb273a5a1279cd4ad8e3575db588b397e10d2bf3b9428e9969e735ab3276991eb7c83053aeb68827f2df39e9987683fc6ed3ec.mp4", import.meta.url), mimeType: "video/mp4", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer("client_id")).define("client_id", _client_id);
  main.variable(observer("api_key")).define("api_key", _api_key);
  main.variable(observer("gapi")).define("gapi", ["require"], _gapi);
  main.variable(observer("auth")).define("auth", ["api_key","client_id","gapi","html"], _auth);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  main.variable(observer("contents")).define("contents", ["FileAttachment"], _contents);
  main.variable(observer("Uint8ToString")).define("Uint8ToString", _Uint8ToString);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _11);
  return main;
}
