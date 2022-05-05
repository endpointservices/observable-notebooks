function _1(md){return(
md`# Firebase Server Test Clients`
)}

function _config(){return(
{
  firebaseServer: {
    url:
      "https://webcode.run?ns=tomlarkworthy|firebase-server-prototype-1;server"
  }
}
)}

function _restartClient(Inputs){return(
Inputs.button("restart clients")
)}

function _appLib(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js")
)}

function _rtdb(){return(
import("https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js")
)}

function _firebaseAppA(restartClient,appLib,config){return(
restartClient,
appLib.initializeApp(
  {
    databaseURL: config.firebaseServer.url
  },
  Math.random().toString(16) // We randomize the name so we can rerun initialization
)
)}

function _firebaseAppB(restartClient,appLib,config){return(
restartClient,
appLib.initializeApp(
  {
    databaseURL: config.firebaseServer.url
  },
  Math.random().toString(16) // We randomize the name so we can rerun initialization
)
)}

function _databaseA(rtdb,firebaseAppA,invalidation)
{
  rtdb.enableLogging(true);
  const db = rtdb.getDatabase(firebaseAppA);
  invalidation.then(() => rtdb.goOffline(db));
  return db;
}


function _databaseB(rtdb,firebaseAppB,invalidation)
{
  rtdb.enableLogging(true);
  const db = rtdb.getDatabase(firebaseAppB);
  invalidation.then(() => rtdb.goOffline(db));
  return db;
}


function _rootA(rtdb,databaseA){return(
rtdb.ref(databaseA, "/")
)}

function _rootB(rtdb,databaseB){return(
rtdb.ref(databaseB, "/")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("viewof restartClient")).define("viewof restartClient", ["Inputs"], _restartClient);
  main.variable(observer("restartClient")).define("restartClient", ["Generators", "viewof restartClient"], (G, _) => G.input(_));
  main.variable(observer("appLib")).define("appLib", _appLib);
  main.variable(observer("rtdb")).define("rtdb", _rtdb);
  main.variable(observer("firebaseAppA")).define("firebaseAppA", ["restartClient","appLib","config"], _firebaseAppA);
  main.variable(observer("firebaseAppB")).define("firebaseAppB", ["restartClient","appLib","config"], _firebaseAppB);
  main.variable(observer("databaseA")).define("databaseA", ["rtdb","firebaseAppA","invalidation"], _databaseA);
  main.variable(observer("databaseB")).define("databaseB", ["rtdb","firebaseAppB","invalidation"], _databaseB);
  main.variable(observer("rootA")).define("rootA", ["rtdb","databaseA"], _rootA);
  main.variable(observer("rootB")).define("rootB", ["rtdb","databaseB"], _rootB);
  return main;
}
