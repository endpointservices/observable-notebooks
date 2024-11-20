function _1(md){return(
md`# Supabase`
)}

function _2(md){return(
md`---
#### https://cdn.skypack.dev/@supabase/supabase-js@1.35.6?min
generated with [paste-codegen](https://observablehq.com/@tomlarkworthy/paste-codegen)`
)}

function _https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min(){return(
import('https://cdn.skypack.dev/@supabase/supabase-js@1.35.6?min')
)}

function _GoTrueApi(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['GoTrueApi']
)}

function _GoTrueClient(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['GoTrueClient']
)}

function _RealtimeClient(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['RealtimeClient']
)}

function _RealtimeSubscription(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['RealtimeSubscription']
)}

function _SupabaseClient(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['SupabaseClient']
)}

function _Transformers(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['Transformers']
)}

function _createClient(https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min){return(
https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min['createClient']
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min")).define("https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min", _https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min);
  main.variable(observer("GoTrueApi")).define("GoTrueApi", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _GoTrueApi);
  main.variable(observer("GoTrueClient")).define("GoTrueClient", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _GoTrueClient);
  main.variable(observer("RealtimeClient")).define("RealtimeClient", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _RealtimeClient);
  main.variable(observer("RealtimeSubscription")).define("RealtimeSubscription", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _RealtimeSubscription);
  main.variable(observer("SupabaseClient")).define("SupabaseClient", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _SupabaseClient);
  main.variable(observer("Transformers")).define("Transformers", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _Transformers);
  main.variable(observer("createClient")).define("createClient", ["https___cdn_skypack_dev__supabase_supabase_js_1_35_6_min"], _createClient);
  return main;
}
