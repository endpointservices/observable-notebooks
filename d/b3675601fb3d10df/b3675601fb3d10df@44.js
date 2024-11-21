import define1 from "./6eda90668ae03044@836.js";
import define2 from "./993a0c51ef1175ea@1396.js";

function _1(md){return(
md`# Example`
)}

function _3(endpoint,welcomePage){return(
endpoint("server", async (request, response) => {
  if (request.body && request.method === "POST") {
    return response.send(`<div>
      You sent me ${request.body}
    </div>`);
  } else {
    return response.send(welcomePage.outerHTML);
  }
})
)}

function _welcomePage(htl){return(
htl.html`<title>Welcome</title>
<h1>Welcome to the server</h1>
<form method="POST" action="https://webcode.run/observablehq.com/d/b3675601fb3d10df;server">
  <input type="text" name="message">
  <input type="submit">
</form>
`
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyBN4bxw6d0cM0CGPNzRrkRlBqwFQnPLdN4",
  authDomain: "larkworthy-dfb11.firebaseapp.com",
  databaseURL:
    "https://larkworthy-dfb11-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "larkworthy-dfb11",
  storageBucket: "larkworthy-dfb11.appspot.com",
  messagingSenderId: "786910701676",
  appId: "1:786910701676:web:8d7dd002acf3b78c74d049",
  uiConfig: {
    // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com", "anonymous"]
    // tosUrl: '<your-tos-url>', // Terms of service url.
    // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
  }
}
)}

function _db(firebase){return(
firebase.database().ref("/")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("endpoint", child1);
  main.variable(observer()).define(["endpoint","welcomePage"], _3);
  main.variable(observer("welcomePage")).define("welcomePage", ["htl"], _welcomePage);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  const child2 = runtime.module(define2).derive(["firebaseConfig"], main);
  main.import("firebase", child2);
  main.import("listen", child2);
  main.import("viewof user", child2);
  main.import("user", child2);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  return main;
}
