import define1 from "./993a0c51ef1175ea@1396.js";
import define2 from "./11a5ab8b1b3a51db@1161.js";
import define3 from "./84e66f78139ac354@830.js";
import define4 from "./316f0885d15ab671@69.js";
import define5 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Chat application with Firebase on Observable (Twitch)

This is the notebook I used when doing an Observable Twitch stream! None of this will work unless you signin at the bottom because we added security :) However, I had added the option to signin in anonymously so you don't need to give up your email address.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fo3JTKp3CFU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

function _4(md){return(
md`Its useful to assign SDK services to variable so autocomplete works`
)}

function _firestore(firebase){return(
firebase.firestore()
)}

function _6(firestore){return(
firestore
)}

function _7(md){return(
md`## Basics`
)}

function _8(md){return(
md`Write some data`
)}

function _9(firestore,user){return(
firestore.doc("messages/5h126rZvETtk4U010ueQ").set({
  by: user.uid,
  msg: "Hello"
})
)}

function _10(md){return(
md`Read a snapshot in time:`
)}

async function _11(firestore){return(
(await firestore.doc("messages/5h126rZvETtk4U010ueQ").get()).data()
)}

function _12(md){return(
md`Read a collection at a snapshot in time`
)}

async function _13(firestore){return(
(await firestore.collection("messages").get()).docs.map(d => d.data())
)}

function _14(md){return(
md`Read a doc AND update in realtime. Use list to bind a location to a cell, and have all the nice dataflow features of dependant recomputing nicely.`
)}

function _15(listen,firestore){return(
listen(firestore.collection("messages").limit(2))
)}

function _16(md){return(
md`## Lets Build a chat app`
)}

function _messages(listen,firestore){return(
listen(
  firestore
    .collection("messages")
    .orderBy("t")
    .limitToLast(20)
)
)}

function _20(md){return(
md`When we add Firebase storage we need to convert the filepaths do download URLs which is a little awkward as they are promises`
)}

function _messagesWithURL(promiseRecursive,messages,storage){return(
promiseRecursive(
  messages.map(row => ({
    ...row,
    ...(row.path && { url: storage.ref(row.path).getDownloadURL() })
  }))
)
)}

function _promiseRecursive(){return(
function promiseRecursive(obj) {
  const getPromises = obj =>
    Object.keys(obj).reduce(
      (acc, key) =>
        Object(obj[key]) !== obj[key]
          ? acc
          : acc.concat(
              typeof obj[key].then === "function"
                ? [[obj, key]]
                : getPromises(obj[key])
            ),
      []
    );
  const all = getPromises(obj);
  return Promise.all(all.map(([obj, key]) => obj[key])).then(
    responses => (
      all.forEach(([obj, key], i) => (obj[key] = responses[i])), obj
    )
  );
}
)}

function _ui(reconcile,html,messagesWithURL,$0,$1)
{
  return reconcile(
    this,
    html`<table>
      ${messagesWithURL.map(row =>
        row.url
          ? html`<tr><td width="100px">${row.by}</td><td><img width="400px" src=${row.url}></img></td></tr>`
          : html`<tr><td width="100px">${row.by}</td><td>${row.msg}</td></tr>`
      )}
    </table>
    <input onkeypress=${evt => {
      $0.value = evt;
    }}><br>

    <input type="file" onchange=${evt => {
      $1.value = evt;
    }}>

`
  );
}


function _msgEvt(){return(
undefined
)}

function _25(msgEvt){return(
msgEvt.key
)}

function _proccessMessage(msgEvt,firestore,user,firebase)
{
  if (msgEvt.key == "Enter") {
    firestore.collection("messages").add({
      by: user.uid,
      msg: msgEvt.target.value,
      t: firebase.firebase_.firestore.FieldValue.serverTimestamp()
    });
  }
}


function _27(msgEvt){return(
msgEvt.target.value
)}

function _fileEvt(){return(
undefined
)}

function _storage(firebase){return(
firebase.storage()
)}

function _sRef(storage,randomId){return(
storage.ref(`/examples/chat/${randomId()}`)
)}

async function _processFiles(fileEvt,storage,randomId,firestore,user,firebase)
{
  const file = fileEvt.target.files[0];
  const sRef = storage.ref(`/examples/chat/${randomId()}`);
  const result = await sRef.put(file);
  const path = result.ref.fullPath;
  firestore.collection("messages").add({
    by: user.uid,
    path: path,
    t: firebase.firebase_.firestore.FieldValue.serverTimestamp()
  });
}


function _33(md){return(
md`## Security`
)}

function _34($0){return(
$0
)}

function _35(user){return(
user.uid
)}

function _37(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1).derive(["firebaseConfig"], main);
  main.import("firebase", child1);
  main.import("listen", child1);
  main.import("viewof user", child1);
  main.import("user", child1);
  main.variable(observer("firebaseConfig")).define("firebaseConfig", _firebaseConfig);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("firestore")).define("firestore", ["firebase"], _firestore);
  main.variable(observer()).define(["firestore"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["firestore","user"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["firestore"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["firestore"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["listen","firestore"], _15);
  main.variable(observer()).define(["md"], _16);
  const child2 = runtime.module(define2);
  main.import("html", child2);
  const child3 = runtime.module(define3);
  main.import("reconcile", child3);
  main.variable(observer("messages")).define("messages", ["listen","firestore"], _messages);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("messagesWithURL")).define("messagesWithURL", ["promiseRecursive","messages","storage"], _messagesWithURL);
  main.variable(observer("promiseRecursive")).define("promiseRecursive", _promiseRecursive);
  main.variable(observer("ui")).define("ui", ["reconcile","html","messagesWithURL","mutable msgEvt","mutable fileEvt"], _ui);
  main.define("initial msgEvt", _msgEvt);
  main.variable(observer("mutable msgEvt")).define("mutable msgEvt", ["Mutable", "initial msgEvt"], (M, _) => new M(_));
  main.variable(observer("msgEvt")).define("msgEvt", ["mutable msgEvt"], _ => _.generator);
  main.variable(observer()).define(["msgEvt"], _25);
  main.variable(observer("proccessMessage")).define("proccessMessage", ["msgEvt","firestore","user","firebase"], _proccessMessage);
  main.variable(observer()).define(["msgEvt"], _27);
  main.define("initial fileEvt", _fileEvt);
  main.variable(observer("mutable fileEvt")).define("mutable fileEvt", ["Mutable", "initial fileEvt"], (M, _) => new M(_));
  main.variable(observer("fileEvt")).define("fileEvt", ["mutable fileEvt"], _ => _.generator);
  main.variable(observer("storage")).define("storage", ["firebase"], _storage);
  main.variable(observer("sRef")).define("sRef", ["storage","randomId"], _sRef);
  main.variable(observer("processFiles")).define("processFiles", ["fileEvt","storage","randomId","firestore","user","firebase"], _processFiles);
  const child4 = runtime.module(define4);
  main.import("randomId", child4);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["viewof user"], _34);
  main.variable(observer()).define(["user"], _35);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _37);
  return main;
}
