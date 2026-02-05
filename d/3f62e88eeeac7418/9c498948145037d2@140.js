// https://observablehq.com/@endpointservices/resize@140
import define1 from "./3d9d1394d858ca97@556.js";
import define2 from "./dff1e917c89f5e76@1964.js";
import define3 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Resize FileAttachments on the fly with [serverless-cells](https://observablehq.com/@endpointservices/serverless-cells)


<mark>FileAttachments.image(...) supports props like width or style now, rendering this library pointless</mark> (there is some minor utility that this library does it server side so traffic is minimized, but it tends to be slow so I personally would still not use this method


Often, when copy and pasting, my FileAttachments are too big for markdown. I can switch to HTML, but thats hard work. So here is a use of [Serverless cells](https://observablehq.com/@endpointservices/serverless-cells) and the CDN caching which can resize an image on the fly and caches the result.

All you need to do is decorate the url with "resize" which creates a new URL to an inline image service that does the resizing.

~~~js
  import {resize} from '@endpointservices/resize'
~~~


I DON'T THINK THIS WORKS WITH FILE ATTACHMENTS ANYMORE, the URL is not stable or something
`
)}

function _2(signature,resize){return(
signature(resize, {

  description: "Returns a URL that serves a resized image, slow the first time, but result is cached. Your notebook must be published or link shared first."
})
)}

function _resize(deploy,convert){return(
function resize(
  src,               // URL of an image
  width = 640,       // Desired width
  height = undefined // Desired height, undefined scales by aspect ratio
) {
  // One cool thing about serverless cells and its code sharing is we can define the backend
  // inline with the front end.
  const backend = deploy("resizer", async (req, res) => {
    const params = JSON.parse(decodeURIComponent(req.query.params))
    const mime = "image/jpeg"
    res.header("content-type", mime);
    res.header("cache-control", "public, max-age=604800, immutable") // Remember
    res.send(await convert(params.src, params.width, params.height, mime))
  })
  
  return `${backend.href}?params=${encodeURIComponent(JSON.stringify({
    src, width, height
  }))}` 
}
)}

function _convert(){return(
function convert(src, width, height, mime) {
  return new Promise(resolve => {
    var img = new Image();
    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height || ((img.height * canvas.width) / img.width);

      var ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high"
      // Resize
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // https://stackoverflow.com/questions/47913980/js-convert-an-image-object-to-a-jpeg-file
      canvas.toBlob(async (data)=> {
        resolve(await data.arrayBuffer())
      }, mime, 0.75);
    };
    img.src = src;
  });
}
)}

async function _7(md,FileAttachment,resize){return(
md`
  ## Example

  ### Too big!
  ![](${await FileAttachment("image.png").url()})

  ### Inline resizing
  
  ![](${resize(await FileAttachment("image.png").url(), 400)})
`
)}

function _9(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/7f5a00c937e545c55b930664343d250c09bd4dae28630e6663b9a4b531a1f3b5f8395d4e8287f268c3337a227c0e422afb6abbe7b36e3de57b821dc00fccd425.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["signature","resize"], _2);
  main.variable(observer("resize")).define("resize", ["deploy","convert"], _resize);
  const child1 = runtime.module(define1);
  main.import("signature", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.variable(observer("convert")).define("convert", _convert);
  main.variable(observer()).define(["md","FileAttachment","resize"], _7);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _9);
  return main;
}
