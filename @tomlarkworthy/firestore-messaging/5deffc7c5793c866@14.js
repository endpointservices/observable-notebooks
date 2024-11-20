function _1(md){return(
md`# Firestore Messaging`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-messaging.js')
)}

function _deleteToken(https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js['deleteToken']
)}

function _getMessaging(https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js['getMessaging']
)}

function _getToken(https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js['getToken']
)}

function _isSupported(https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js['isSupported']
)}

function _onMessage(https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js['onMessage']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js);
  main.variable(observer("deleteToken")).define("deleteToken", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js"], _deleteToken);
  main.variable(observer("getMessaging")).define("getMessaging", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js"], _getMessaging);
  main.variable(observer("getToken")).define("getToken", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js"], _getToken);
  main.variable(observer("isSupported")).define("isSupported", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js"], _isSupported);
  main.variable(observer("onMessage")).define("onMessage", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_messaging_js"], _onMessage);
  return main;
}
