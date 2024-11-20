function _1(md){return(
md`# Firebase Functions`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-functions.js')
)}

function _connectFunctionsEmulator(https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js['connectFunctionsEmulator']
)}

function _getFunctions(https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js['getFunctions']
)}

function _httpsCallable(https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js['httpsCallable']
)}

function _httpsCallableFromURL(https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js['httpsCallableFromURL']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js);
  main.variable(observer("connectFunctionsEmulator")).define("connectFunctionsEmulator", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js"], _connectFunctionsEmulator);
  main.variable(observer("getFunctions")).define("getFunctions", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js"], _getFunctions);
  main.variable(observer("httpsCallable")).define("httpsCallable", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js"], _httpsCallable);
  main.variable(observer("httpsCallableFromURL")).define("httpsCallableFromURL", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_functions_js"], _httpsCallableFromURL);
  return main;
}
