function _1(md){return(
md`# Firebase Performance Monitoring`
)}

function _https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js(){return(
import('https://www.gstatic.com/firebasejs/9.9.2/firebase-performance.js')
)}

function _getPerformance(https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js['getPerformance']
)}

function _initializePerformance(https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js['initializePerformance']
)}

function _trace(https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js){return(
https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js['trace']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js")).define("https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js", _https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js);
  main.variable(observer("getPerformance")).define("getPerformance", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js"], _getPerformance);
  main.variable(observer("initializePerformance")).define("initializePerformance", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js"], _initializePerformance);
  main.variable(observer("trace")).define("trace", ["https___www_gstatic_com_firebasejs_9_9_2_firebase_performance_js"], _trace);
  return main;
}
