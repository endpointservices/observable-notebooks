import define1 from "./f92778131fd76559@1208.js";
import define2 from "./b8a500058f806a6b@11.js";
import define3 from "./dfdb38d5580b5c35@347.js";

function _1(md){return(
md`# Sign a PDF and Adobe: Go F* Yourself

Allows super-imposing an image of your signature on a PDF. 

** Note: you can also do this using Mac Preview, see _Tools > Annotate > Signature_ ([docs](https://support.apple.com/en-gb/guide/preview/prvw35725/mac))** 

### Why not use Adobe?
I once had a Adobe subscription exactly for this purpose but I was unable to cancel it. So it cost me $200 to sign a document. They are [predatory](https://www.reddit.com/r/Adobe/comments/ad72z0/adobe_fix_your_predatory_billing_practices/), and [its not just me](https://news.ycombinator.com/item?id=25971114).

### Why not use the free tools on the internet?

I want to sign financial documents and privacy is critical. Unfortunately, I cannot audit most free software on the internet. Lack of auditability of digital services is actually why I started [@endpointservices](https://observablehq.com/@endpointservices), a Cloud which *exclusively* runs source available software. But in this case we can sign a document clientside so no data will leave the computer and we don't even need a digital service.

### Why on [Observablehq.com](https://observablehq.com/)?

I love it, it took a day to build this and I do not need to worry about hosting, and anybody can inspect, fork and improve the software right from within their browser. It radically lowers viscosity of software development. I can painlessly upgrade it as I go.

### How can I verify data is not leaving my computer?

To see if a webpage is transmiting your data you should check to see if a network call is made when you upload you pdf. Open the View > Developer > Developer Tools > Network, *then* set your pdf. For this application a network call is made! But it's a blob resource with size 0 that takes 2ms. This is an in-memory representation used to move data around *inside* the current session, it doesn't represent data leaving the computer. In general if there are no network entries generator or only blob entries you can be sure data is not leaving your computer and its safe to use. You would generally expect about the same amount of data would need to leave your computer as the file you just uploaded. Read more about the network tab: https://developer.chrome.com/docs/devtools/network/

### Credits

We salute you Andrew Dillon for [pdf-lib](https://github.com/Hopding/pdf-lib) (PDF writer) and Mozilla for [PDF.js](https://mozilla.github.io/pdf.js/) (PDF viewer). 🖖

`
)}

function _2(md){return(
md`### Select files`
)}

function _top(view,htl,$0,Inputs){return(
view`<div>
  <style>
    .labelManual {
      --length1: 3.25px;
      --length2: 6.5px;
      --length3: 13px;
      --label-width: 120px;
      --input-width: 240px;
      font: 13px/1.2 var(--sans-serif);
      flex-shrink: 0;
      align-self: start;
      padding: 5px 0 4px 0;
      width: var(--label-width);
      margin-right: var(--length2);
    }
  </style>
  <div style="display: flex;">
    <label class="labelManual">Choose a pdf</label> 
    ${htl.html`<input name="pdf" type="file" onchange=${evt =>
      ($0.value = evt)} accept=".pdf">`}
  </div>
  ${[
    "images",
    Inputs.range([1, 5], {
      label: "Number of images to add",
      value: 1,
      step: 1
    })
  ]}
`
)}

function _signatures(view,top,htl,sigchange,$0){return(
view`
  ${[
    "sigs",
    Array(top.images)
      .fill(null)
      .map(
        (_, i) => view`<div style="display: flex;">
    <label class="labelManual">Choose image ${i + 1}</label> 
    ${htl.html`<input type="file" onchange=${evt => {
      sigchange[i] = evt;
      $0.value = $0.value; //trigger update
    }} accept="image/jpg">`}
  </div>`
      )
  ]}
  
`
)}

function _5(md){return(
md`### Controls`
)}

async function _6(pdfjs,url,config,html,width)
{
  const pdf = await pdfjs.getDocument(url).promise;
  const page = await pdf.getPage(config.page);

  const canvas = html`<canvas width=${width} height=${config.height} style="border: 1px solid #aaa">`;

  page.render({
    canvasContext: canvas.getContext('2d'),
    viewport: page.getViewport({ scale: 1.5 })
  });
  return canvas;
}


function _config(view,Inputs,fixedDoc,signatures,sigUrls){return(
view`<div>
  ${[
    'height',
    Inputs.range([0, 1200], { label: "preview height", value: 800 })
  ]}
  ${[
    'page',
    Inputs.range([1, fixedDoc.pageCount], {
      label: "preview page",
      value: 1,
      step: 1
    })
  ]}
  ${[
    "sigs",
    signatures.sigs.map(
      (_, i) => view`<hr>
      <img height="100px" src=${sigUrls[i]}></img>
      ${[
        'page',
        Inputs.range([1, fixedDoc.pageCount], { label: "page", value: 1 })
      ]}
      ${[
        'sX',
        Inputs.range([0, fixedDoc.getPage(0).getWidth()], {
          label: "signature x",
          value: 0
        })
      ]}
      ${[
        'sY',
        Inputs.range([0, fixedDoc.getPage(0).getHeight()], {
          label: "signature y",
          value: 0
        })
      ]}
      ${[
        'sW',
        Inputs.range([1, fixedDoc.getPage(0).getWidth()], {
          label: "signature width",
          value: 300
        })
      ]}
      ${[
        'sH',
        Inputs.range([1, fixedDoc.getPage(0).getHeight()], {
          label: "signature height",
          value: 300
        })
      ]}`
    )
  ]}

`
)}

function _8(md){return(
md`## Download the result`
)}

function _9(htl,url){return(
htl.html`<a href=${url} download="output.pdf">download</a>`
)}

function _pdfchange(){return(
undefined
)}

function _11(md){return(
md`---
## Implementation`
)}

function _sigchange(){return(
[]
)}

function _pdf(pdfchange){return(
pdfchange.target.files[0]
)}

async function _fixedDoc(pdfLib,pdf){return(
await pdfLib.PDFDocument.load(await pdf.arrayBuffer())
)}

async function _pdfDoc(config,pdfLib,pdf){return(
config, await pdfLib.PDFDocument.load(await pdf.arrayBuffer())
)}

function _embed(promiseRecursive,sigchange,pdfDoc,config){return(
promiseRecursive(
  // Mutate PDF, overlays images onto pdf
  sigchange.map(async (sig, i) => {
    if (!sig.target.files[0]) return "N/A";

    const page = pdfDoc.getPage(config.sigs[i].page - 1);
    const jpgImage = await pdfDoc.embedJpg(
      await sig.target.files[0].arrayBuffer()
    );
    page.drawImage(jpgImage, {
      x: config.sigs[i].sX,
      y: config.sigs[i].sY,
      width: config.sigs[i].sW,
      height: config.sigs[i].sH
    });

    return "OK";
  })
)
)}

async function _url(embed,pdfDoc)
{
  // Generate a blob representing the rendered PDF
  embed; // make sure image is in it first
  const file = new Blob([await pdfDoc.save()], {
    type: "application/pdf"
  });
  return URL.createObjectURL(file);
}


function _sigUrls(promiseRecursive,sigchange){return(
promiseRecursive(
  // Generate a blobs for the signatures
  sigchange.map(async (sig, i) => {
    if (!sig.target.files[0]) return undefined;
    const file = new Blob([await sig.target.files[0].arrayBuffer()], {
      type: "image/jpg"
    });
    return URL.createObjectURL(file);
  })
)
)}

function _19(md){return(
md`### Imports`
)}

async function _pdfLib(require,FileAttachment){return(
require(await FileAttachment("pdf-lib.min.js").url())
)}

async function _pdfjs(require,FileAttachment)
{
  const lib = await require(await FileAttachment("pdf.js").url());
  lib.GlobalWorkerOptions.workerSrc = await FileAttachment(
    "pdf.worker.js"
  ).url();
  return lib;
}


function _25(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["pdf-lib.min.js", {url: new URL("./files/e8c8472a848b69be98c5220f6709b6e9bde2029c8bbe28004235e94cd385ba5d945281d7802a4915b89b80b67203d01124190f6e6b490415d2665bece54175e4.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["pdf.worker.js", {url: new URL("./files/a922cb2b451fa28a6a893bc7a6c9ab13b1c484be3fd218eff880d98635cf039903f2e34a525e082cf646d5240f3b5ced29d0464aa9ec3a8740ab65c664bd96ac.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["pdf.js", {url: new URL("./files/c355c0bb7746b5947aeba91da1189f8fd06641f3aaf062cc7103901cefae76dd10b3e99cc13acd0a5ee6e40a1ee4231776dd23bade2bb0b59357078fdf76d7f9.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof top")).define("viewof top", ["view","htl","mutable pdfchange","Inputs"], _top);
  main.variable(observer("top")).define("top", ["Generators", "viewof top"], (G, _) => G.input(_));
  main.variable(observer("viewof signatures")).define("viewof signatures", ["view","top","htl","sigchange","mutable sigchange"], _signatures);
  main.variable(observer("signatures")).define("signatures", ["Generators", "viewof signatures"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["pdfjs","url","config","html","width"], _6);
  main.variable(observer("viewof config")).define("viewof config", ["view","Inputs","fixedDoc","signatures","sigUrls"], _config);
  main.variable(observer("config")).define("config", ["Generators", "viewof config"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["htl","url"], _9);
  main.define("initial pdfchange", _pdfchange);
  main.variable(observer("mutable pdfchange")).define("mutable pdfchange", ["Mutable", "initial pdfchange"], (M, _) => new M(_));
  main.variable(observer("pdfchange")).define("pdfchange", ["mutable pdfchange"], _ => _.generator);
  main.variable(observer()).define(["md"], _11);
  main.define("initial sigchange", _sigchange);
  main.variable(observer("mutable sigchange")).define("mutable sigchange", ["Mutable", "initial sigchange"], (M, _) => new M(_));
  main.variable(observer("sigchange")).define("sigchange", ["mutable sigchange"], _ => _.generator);
  main.variable(observer("pdf")).define("pdf", ["pdfchange"], _pdf);
  main.variable(observer("fixedDoc")).define("fixedDoc", ["pdfLib","pdf"], _fixedDoc);
  main.variable(observer("pdfDoc")).define("pdfDoc", ["config","pdfLib","pdf"], _pdfDoc);
  main.variable(observer("embed")).define("embed", ["promiseRecursive","sigchange","pdfDoc","config"], _embed);
  main.variable(observer("url")).define("url", ["embed","pdfDoc"], _url);
  main.variable(observer("sigUrls")).define("sigUrls", ["promiseRecursive","sigchange"], _sigUrls);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("pdfLib")).define("pdfLib", ["require","FileAttachment"], _pdfLib);
  main.variable(observer("pdfjs")).define("pdfjs", ["require","FileAttachment"], _pdfjs);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  const child2 = runtime.module(define2);
  main.import("promiseRecursive", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _25);
  return main;
}
