function _1(md){return(
md`# Firebase Remote Config`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-remote-config.js')
)}

function _activate(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['activate']
)}

function _ensureInitialized(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['ensureInitialized']
)}

function _fetchAndActivate(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['fetchAndActivate']
)}

function _fetchConfig(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['fetchConfig']
)}

function _getAll(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getAll']
)}

function _getBoolean(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getBoolean']
)}

function _getNumber(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getNumber']
)}

function _getRemoteConfig(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getRemoteConfig']
)}

function _getString(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getString']
)}

function _getValue(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['getValue']
)}

function _isSupported(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['isSupported']
)}

function _setLogLevel(https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js['setLogLevel']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js);
  main.variable(observer("activate")).define("activate", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _activate);
  main.variable(observer("ensureInitialized")).define("ensureInitialized", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _ensureInitialized);
  main.variable(observer("fetchAndActivate")).define("fetchAndActivate", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _fetchAndActivate);
  main.variable(observer("fetchConfig")).define("fetchConfig", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _fetchConfig);
  main.variable(observer("getAll")).define("getAll", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getAll);
  main.variable(observer("getBoolean")).define("getBoolean", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getBoolean);
  main.variable(observer("getNumber")).define("getNumber", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getNumber);
  main.variable(observer("getRemoteConfig")).define("getRemoteConfig", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getRemoteConfig);
  main.variable(observer("getString")).define("getString", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getString);
  main.variable(observer("getValue")).define("getValue", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _getValue);
  main.variable(observer("isSupported")).define("isSupported", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _isSupported);
  main.variable(observer("setLogLevel")).define("setLogLevel", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_remote_config_js"], _setLogLevel);
  return main;
}
