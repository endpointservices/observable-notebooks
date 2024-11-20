function _1(md){return(
md`# Firebase App`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js')
)}

function _FirebaseError(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['FirebaseError']
)}

function _SDK_VERSION(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['SDK_VERSION']
)}

function __DEFAULT_ENTRY_NAME(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_DEFAULT_ENTRY_NAME']
)}

function __addComponent(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_addComponent']
)}

function __addOrOverwriteComponent(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_addOrOverwriteComponent']
)}

function __apps(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_apps']
)}

function __clearComponents(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_clearComponents']
)}

function __components(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_components']
)}

function __getProvider(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_getProvider']
)}

function __registerComponent(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_registerComponent']
)}

function __removeServiceInstance(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['_removeServiceInstance']
)}

function _deleteApp(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['deleteApp']
)}

function _getApp(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['getApp']
)}

function _getApps(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['getApps']
)}

function _initializeApp(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['initializeApp']
)}

function _onLog(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['onLog']
)}

function _registerVersion(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['registerVersion']
)}

function _setLogLevel(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js['setLogLevel']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js);
  main.variable(observer("FirebaseError")).define("FirebaseError", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _FirebaseError);
  main.variable(observer("SDK_VERSION")).define("SDK_VERSION", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _SDK_VERSION);
  main.variable(observer("_DEFAULT_ENTRY_NAME")).define("_DEFAULT_ENTRY_NAME", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __DEFAULT_ENTRY_NAME);
  main.variable(observer("_addComponent")).define("_addComponent", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __addComponent);
  main.variable(observer("_addOrOverwriteComponent")).define("_addOrOverwriteComponent", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __addOrOverwriteComponent);
  main.variable(observer("_apps")).define("_apps", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __apps);
  main.variable(observer("_clearComponents")).define("_clearComponents", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __clearComponents);
  main.variable(observer("_components")).define("_components", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __components);
  main.variable(observer("_getProvider")).define("_getProvider", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __getProvider);
  main.variable(observer("_registerComponent")).define("_registerComponent", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __registerComponent);
  main.variable(observer("_removeServiceInstance")).define("_removeServiceInstance", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], __removeServiceInstance);
  main.variable(observer("deleteApp")).define("deleteApp", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _deleteApp);
  main.variable(observer("getApp")).define("getApp", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _getApp);
  main.variable(observer("getApps")).define("getApps", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _getApps);
  main.variable(observer("initializeApp")).define("initializeApp", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _initializeApp);
  main.variable(observer("onLog")).define("onLog", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _onLog);
  main.variable(observer("registerVersion")).define("registerVersion", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _registerVersion);
  main.variable(observer("setLogLevel")).define("setLogLevel", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_js"], _setLogLevel);
  return main;
}
