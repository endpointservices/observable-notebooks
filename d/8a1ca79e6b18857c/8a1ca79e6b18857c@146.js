import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./1a271ff51d899f30@486.js";
import define3 from "./b6bd365c0ef42224@243.js";

function _2(md){return(
md`# Team Member App`
)}

function _4(md){return(
md`## Handling Responses`
)}

function _responseTask(urlQueryFieldView){return(
urlQueryFieldView("respond")
)}

function _response(URLSearchParams,location){return(
Object.fromEntries(new URLSearchParams(location.search).entries())
)}

function _7(response,db,sendEmail)
{
  response;
  // set the response
  db.ref(response.respond).set(response);
  // send the email
  sendEmail({
    to: "tom.larkworthy@gmail.com",
    title: "You have a response",
    body: "TODO"
  });
}


function _8(md){return(
md`## Handling Tasks`
)}

function _rtdbTask(urlQueryFieldView){return(
urlQueryFieldView("rtdbtask")
)}

function _10(rtdbTask){return(
rtdbTask
)}

function _task(Generators,db,rtdbTask){return(
Generators.observe((notify) => {
  db.ref(rtdbTask).on("value", notify);
})
)}

function _taskForm(task){return(
task.val()
)}

function _13(html,taskForm){return(
html`${taskForm}`
)}

function _14(md){return(
md`## Configuration`
)}

function _db(firebase){return(
firebase.database()
)}

function _firebaseConfig(){return(
{
  apiKey: "AIzaSyAy7DrkXtQdHcJ6eLhBuXHAP1EDkJxHDSc",
  authDomain: "choreapp-954bd.firebaseapp.com",
  databaseURL:
    "https://choreapp-954bd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "choreapp-954bd",
  storageBucket: "choreapp-954bd.appspot.com",
  messagingSenderId: "834144188417",
  appId: "1:834144188417:web:0d8da2a55d89eb1e77e800",
  uiConfig: {
    // https://github.com/firebase/firebaseui-web#configuration
    signInOptions: ["google.com", "password", "phone"]
    // tosUrl: '<your-tos-url>', // Terms of service url.
    // privacyPolicyUrl: '<your-privacy-policy-url>', // Privacy policy url.
  }
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof responseTask")).define("viewof responseTask", ["urlQueryFieldView"], _responseTask);
  main.variable(observer("responseTask")).define("responseTask", ["Generators", "viewof responseTask"], (G, _) => G.input(_));
  main.variable(observer("response")).define("response", ["URLSearchParams","location"], _response);
  main.variable(observer()).define(["response","db","sendEmail"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof rtdbTask")).define("viewof rtdbTask", ["urlQueryFieldView"], _rtdbTask);
  main.variable(observer("rtdbTask")).define("rtdbTask", ["Generators", "viewof rtdbTask"], (G, _) => G.input(_));
  main.variable(observer()).define(["rtdbTask"], _10);
  main.variable(observer("task")).define("task", ["Generators","db","rtdbTask"], _task);
  main.variable(observer("taskForm")).define("taskForm", ["task"], _taskForm);
  main.variable(observer()).define(["html","taskForm"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.import("listen", child1);
  const child2 = runtime.module(define2);
  main.import("urlQueryFieldView", child2);
  const child3 = runtime.module(define3);
  main.import("sendEmail", child3);
  return main;
}
