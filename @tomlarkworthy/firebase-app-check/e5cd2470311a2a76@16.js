function _1(md){return(
md`# Firebase App Check`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-app-check.js')
)}

function _CustomProvider(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['CustomProvider']
)}

function _ReCaptchaEnterpriseProvider(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['ReCaptchaEnterpriseProvider']
)}

function _ReCaptchaV3Provider(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['ReCaptchaV3Provider']
)}

function _getToken(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['getToken']
)}

function _initializeAppCheck(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['initializeAppCheck']
)}

function _onTokenChanged(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['onTokenChanged']
)}

function _setTokenAutoRefreshEnabled(https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js['setTokenAutoRefreshEnabled']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js);
  main.variable(observer("CustomProvider")).define("CustomProvider", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _CustomProvider);
  main.variable(observer("ReCaptchaEnterpriseProvider")).define("ReCaptchaEnterpriseProvider", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _ReCaptchaEnterpriseProvider);
  main.variable(observer("ReCaptchaV3Provider")).define("ReCaptchaV3Provider", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _ReCaptchaV3Provider);
  main.variable(observer("getToken")).define("getToken", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _getToken);
  main.variable(observer("initializeAppCheck")).define("initializeAppCheck", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _initializeAppCheck);
  main.variable(observer("onTokenChanged")).define("onTokenChanged", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _onTokenChanged);
  main.variable(observer("setTokenAutoRefreshEnabled")).define("setTokenAutoRefreshEnabled", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_app_check_js"], _setTokenAutoRefreshEnabled);
  return main;
}
