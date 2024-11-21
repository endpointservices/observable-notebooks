async function _1(FileAttachment,md){return(
md`# Repro for runtime sleeping when tab not in focus

Both these tickers log every second, but if you switch tabs, only the altTicker will log, this screenshot below shows the altTicker logs logged an extra 4 times when I switched (look in the console

Normal Javascript does not go to sleep when switching tabs, only the Observable runtime does. I assume this is for some battery optimization or some such but it is annoying for long running data analysis.

![image.png](${await FileAttachment("image.png").url()})`
)}

function* _ticker(Promises)
{
  while (true) {
    yield Promises.delay(1000, "tick");
  }
}


function _logTick(ticker)
{
  ticker;
  console.log("log from tick");
}


function _altTicker(invalidation)
{
  const stop = setInterval(() => {
    console.log("log from alt ticker");
  }, 1000);
  invalidation.then(stop);
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/edd161909f54d111dabd231bb22ac1201273de2a50517bef32adf5dcfad8edd3ca486143153e68d7d4b12eb3809f08e9c49adb3ef56c148d28bc23d3df85bda0.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer("ticker")).define("ticker", ["Promises"], _ticker);
  main.variable(observer("logTick")).define("logTick", ["ticker"], _logTick);
  main.variable(observer("altTicker")).define("altTicker", ["invalidation"], _altTicker);
  return main;
}
