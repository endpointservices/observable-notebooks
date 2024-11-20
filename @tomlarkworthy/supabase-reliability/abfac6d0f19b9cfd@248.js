import define1 from "./cf99806d548486b9@40.js";

function _1(md){return(
md`# Supabase Reliability

https://supabase.com/blog/supabase-realtime-multiplayer-general-availability`
)}

function _API_KEY(){return(
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cGNmdW91dHRxcW9mZndidGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5NDc0MjgsImV4cCI6MTk3NjUyMzQyOH0.KcVh9mC8U7mKpSSoOoCR8CXp251C0Sr4-QM0vuipeQ8"
)}

function _supabase(createClient,API_KEY){return(
createClient("https://hupcfuouttqqoffwbtcm.supabase.co", API_KEY)
)}

function _insertButton(Inputs,$0,Event,supabase){return(
Inputs.button("Insert", {
  reduce: async () => {
    const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
    $0.value[id] = Date.now();
    $0.dispatchEvent(new Event("input"));
    const { data, error } = await supabase.from("Messages").insert([{ id }]);
  }
})
)}

function _clear(Inputs){return(
Inputs.button("clear")
)}

function _maybeSent(clear,Inputs){return(
clear, new Inputs.input({})
)}

function _8(Inputs,maybeSent){return(
Inputs.text({ value: JSON.stringify(maybeSent), disabled: true })
)}

function _9(now){return(
new Date(now)
)}

function _change(Generators,supabase,$0,Event,invalidation){return(
Generators.observe((notify) => {
  const subscription = supabase
    .from("Messages")
    .on("*", (event) => {
      $0.value[event.new.id] = Date.now();
      $0.dispatchEvent(new Event("input"));
      notify(event);
    })
    .subscribe();
  invalidation.then(() => subscription.unsubscribe());
})
)}

function _received(clear,Inputs){return(
clear, new Inputs.input({})
)}

function _12(Inputs,$0,Promises){return(
Inputs.button("run 120", {
  reduce: async () => {
    for (let i = 0; i < 120; i++) {
      $0.querySelector("button").click();
      await Promises.delay(1000); // 1 per second
    }
  }
})
)}

function _refresh(Inputs){return(
Inputs.button("update graph")
)}

async function _confirmedSent(refresh,supabase,maybeSent){return(
(refresh,
await supabase
  .from("Messages")
  .select("*")
  .filter("id", "in", `(${Object.keys(maybeSent).join(",")})`)).data.map(
  (d) => `${d.id}`
)
)}

function _allReceived(refresh,received){return(
refresh, new Set(Object.keys(received))
)}

function _missed(refresh,confirmedSent,allReceived){return(
refresh, confirmedSent.filter((k) => !allReceived.has(k))
)}

function _17(refresh,maybeSent,received,md){return(
md`\`\`\`
maybeSent ${(refresh, Object.keys(maybeSent).length)}

received ${(refresh, Object.keys(received).length)}
\`\`\`
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("API_KEY")).define("API_KEY", _API_KEY);
  const child1 = runtime.module(define1);
  main.import("createClient", child1);
  main.variable(observer("supabase")).define("supabase", ["createClient","API_KEY"], _supabase);
  main.variable(observer("viewof insertButton")).define("viewof insertButton", ["Inputs","viewof maybeSent","Event","supabase"], _insertButton);
  main.variable(observer("insertButton")).define("insertButton", ["Generators", "viewof insertButton"], (G, _) => G.input(_));
  main.variable(observer("viewof clear")).define("viewof clear", ["Inputs"], _clear);
  main.variable(observer("clear")).define("clear", ["Generators", "viewof clear"], (G, _) => G.input(_));
  main.variable(observer("viewof maybeSent")).define("viewof maybeSent", ["clear","Inputs"], _maybeSent);
  main.variable(observer("maybeSent")).define("maybeSent", ["Generators", "viewof maybeSent"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","maybeSent"], _8);
  main.variable(observer()).define(["now"], _9);
  main.variable(observer("change")).define("change", ["Generators","supabase","viewof received","Event","invalidation"], _change);
  main.variable(observer("viewof received")).define("viewof received", ["clear","Inputs"], _received);
  main.variable(observer("received")).define("received", ["Generators", "viewof received"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","viewof insertButton","Promises"], _12);
  main.variable(observer("viewof refresh")).define("viewof refresh", ["Inputs"], _refresh);
  main.variable(observer("refresh")).define("refresh", ["Generators", "viewof refresh"], (G, _) => G.input(_));
  main.variable(observer("confirmedSent")).define("confirmedSent", ["refresh","supabase","maybeSent"], _confirmedSent);
  main.variable(observer("allReceived")).define("allReceived", ["refresh","received"], _allReceived);
  main.variable(observer("missed")).define("missed", ["refresh","confirmedSent","allReceived"], _missed);
  main.variable(observer()).define(["refresh","maybeSent","received","md"], _17);
  return main;
}
