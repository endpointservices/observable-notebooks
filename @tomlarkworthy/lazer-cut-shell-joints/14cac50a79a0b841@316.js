// https://observablehq.com/@fil/jszip@316
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# jszip

Usage:
~~~js
import {zip, zipreader} from "@fil/jszip"

// Fetch
fetch("url.zip").then(zipreader);

// Observable FileAttachment | note: this is now native!
// zipreader(FileAttachment("data.zip"));
FileAttachment("data.zip").zip()

// File input
import {file} from "@jashkenas/inputs"
viewof f = file();
zipreader(f);

~~~

Note that creating zip files that visitors can download is also possible, see example 5 below. For more examples see also “[Hello, jszip](https://observablehq.com/@mbostock/hello-jszip)”.
`
)}

function _2(md){return(
md`## 1. Fetch a remote zip`
)}

function _url(){return(
"https://visionscarto.net/obs/jszip-demo/data.zip"
)}

function _A(url,zipreader){return(
fetch("https://cors-anywhere.herokuapp.com/" + url).then(zipreader)
)}

function _5(md){return(
md`<code>zipreader</code> calls the .arrayBuffer of any “File” object, and returns a Map of the files contained in the zip, indexed on their names. Each file is a Promise—use .then to apply another transformation:`
)}

function _penguins(A,d3){return(
A.get("penguins.csv").then(d3.csvParse)
)}

function _7(md){return(
md`## 2. Read a zipped FileAttachment`
)}

function _zipreader(zip){return(
(fileDescriptor, { type = "string" } = {}) =>
  fileDescriptor
    .arrayBuffer()
    .then(d => zip().loadAsync(d))
    .then(
      ({ files }) =>
        new Map(Object.keys(files).map(f => [f, files[f].async(type)]))
    )
)}

function _reader(zipreader,FileAttachment){return(
zipreader(FileAttachment("datasets.zip"))
)}

function _cars(reader,d3){return(
reader.get("cars.csv").then(d3.csvParse)
)}

function _11(md){return(
md`## 3. File input`
)}

function _up(file){return(
file({ description: "zip file", accept: ".zip" })
)}

function _readerUp(up,zip){return(
up.arrayBuffer()
  .then(d => zip().loadAsync(d))
  .then(
    ({ files }) =>
      new Map(Object.keys(files).map(f => [f, files[f].async("string")]))
  )
)}

function _dir(readerUp){return(
[...readerUp.keys()]
)}

function _15(md){return(
md`## 4. Binary files?

The preceding examples are retrieving text files; it's also possible to retrieve binary files by passing a *type* option. In the cell below, the payload is an Apache arrow dataset (example contributed by [Yuri Vishnevsky](https://observablehq.com/@yurivish)):`
)}

function _16(zipreader,FileAttachment,arrow){return(
zipreader(FileAttachment("arrow.zip"), { type: "arraybuffer" }).then((d) =>
  arrow.Table.from(d.get("data.arrow"))
)
)}

function _17(md){return(
md`## 5. Create and download a zip`
)}

function _created(zip,cars,penguins,d3)
{
  const z = zip();
  const data = {
    hello: [{ a: "1", b: 2 }],
    world: [{ some: "good", news: "maybe?" }],
    cars,
    penguins
  };
  for (let key in data) z.file(`${key}.csv`, d3.csvFormat(data[key]));
  return z.generateAsync({ type: "blob" });
}


function _19(button,created){return(
button(created, "files.zip")
)}

function _20(md){return(
md`---
_boring zone_`
)}

async function _zip(require,FileAttachment){return(
require(await FileAttachment("jszip-3.5.0").url())
)}

function _d3(require){return(
require("d3-dsv@3")
)}

function _button(d3,DOM){return(
(data, filename = 'data') => {
  if (!data) throw new Error('Array of data required as first argument');

  let downloadData;
  if (filename.includes('.csv')) {
    downloadData = new Blob([d3.csvFormat(data)], { type: "text/csv" });
  } else if (filename.includes('.zip')) {
    downloadData = new Blob([data], { type: "application/zip" });
  } else {
    downloadData = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
  }

  const size = (downloadData.size / 1024).toFixed(0);
  const button = DOM.download(
    downloadData,
    filename,
    `Download ${filename} (~${size} KB)`
  );
  return button;
}
)}

function _arrow(require){return(
require("apache-arrow@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["datasets.zip", {url: new URL("./files/8bbd74b6062a016225f74553558df8b2d346017fc173afe6a971d75a0c38f97a0b3406c944e0d8da7d5611ff0326fe128e9c4b007961a6848588a9831f697440.zip", import.meta.url), mimeType: "application/zip", toString}],
    ["jszip-3.5.0", {url: new URL("./files/562c7bacd69880af6f3551e662bb554569a4559aadfb769a5d2afc97e27a080fa5bad38fd6165f05b0646f4a0548cc5b84473f6a7e2025ff1d99e047fe2fc355.bin", import.meta.url), mimeType: "application/octet-stream", toString}],
    ["arrow.zip", {url: new URL("./files/7f97a3ee991faadbfc16c06db27834f7d040d46218cbf517aed85d8d9d9b1c56accc0a4be2c7045a3558f83011599bee570cc8b55d0c9df555f4b866cceaa82c.zip", import.meta.url), mimeType: "application/zip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("url")).define("url", _url);
  main.variable(observer("A")).define("A", ["url","zipreader"], _A);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("penguins")).define("penguins", ["A","d3"], _penguins);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("zipreader")).define("zipreader", ["zip"], _zipreader);
  main.variable(observer("reader")).define("reader", ["zipreader","FileAttachment"], _reader);
  main.variable(observer("cars")).define("cars", ["reader","d3"], _cars);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof up")).define("viewof up", ["file"], _up);
  main.variable(observer("up")).define("up", ["Generators", "viewof up"], (G, _) => G.input(_));
  main.variable(observer("readerUp")).define("readerUp", ["up","zip"], _readerUp);
  main.variable(observer("dir")).define("dir", ["readerUp"], _dir);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["zipreader","FileAttachment","arrow"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("created")).define("created", ["zip","cars","penguins","d3"], _created);
  main.variable(observer()).define(["button","created"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("zip")).define("zip", ["require","FileAttachment"], _zip);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("button")).define("button", ["d3","DOM"], _button);
  main.variable(observer("arrow")).define("arrow", ["require"], _arrow);
  const child1 = runtime.module(define1);
  main.import("file", child1);
  return main;
}
