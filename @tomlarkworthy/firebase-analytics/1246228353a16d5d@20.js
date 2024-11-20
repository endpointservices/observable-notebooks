function _1(md){return(
md`# Firebase Analytics`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js')
)}

function _getAnalytics(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['getAnalytics']
)}

function _initializeAnalytics(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['initializeAnalytics']
)}

function _isSupported(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['isSupported']
)}

function _logEvent(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['logEvent']
)}

function _setAnalyticsCollectionEnabled(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setAnalyticsCollectionEnabled']
)}

function _setConsent(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setConsent']
)}

function _setCurrentScreen(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setCurrentScreen']
)}

function _setDefaultEventParameters(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setDefaultEventParameters']
)}

function _setUserId(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setUserId']
)}

function _setUserProperties(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['setUserProperties']
)}

function _settings(https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js['settings']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js);
  main.variable(observer("getAnalytics")).define("getAnalytics", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _getAnalytics);
  main.variable(observer("initializeAnalytics")).define("initializeAnalytics", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _initializeAnalytics);
  main.variable(observer("isSupported")).define("isSupported", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _isSupported);
  main.variable(observer("logEvent")).define("logEvent", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _logEvent);
  main.variable(observer("setAnalyticsCollectionEnabled")).define("setAnalyticsCollectionEnabled", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setAnalyticsCollectionEnabled);
  main.variable(observer("setConsent")).define("setConsent", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setConsent);
  main.variable(observer("setCurrentScreen")).define("setCurrentScreen", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setCurrentScreen);
  main.variable(observer("setDefaultEventParameters")).define("setDefaultEventParameters", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setDefaultEventParameters);
  main.variable(observer("setUserId")).define("setUserId", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setUserId);
  main.variable(observer("setUserProperties")).define("setUserProperties", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _setUserProperties);
  main.variable(observer("settings")).define("settings", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_analytics_js"], _settings);
  return main;
}
