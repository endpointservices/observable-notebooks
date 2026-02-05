import define1 from "./dfdb38d5580b5c35@351.js";

async function _1(FileAttachment,md){return(
md`# QR code scanning with [jsqrcode](https://github.com/LazarSoft/jsqrcode) and [webqr](http://www.webqr.com)

<img style="max-width: 480px" src=${await FileAttachment("61340.jpg").url()}></img>

This is a UI component that streams the webcam and resolves to any readable decoded QR information as the value. Works on mobile, which is nice.

~~~js
import {webcamQRReader} from '@tomlarkworthy/jsqrcode'
~~~

~~~
viewof data = webcamQRReader({
  width: 200,
  height: 400
})
~~~
### Credits 

<a href="https://www.freepik.com/vectors/technology">Technology vector created by studiogstock - www.freepik.com</a>

This is a port of QRCODE reader Copyright 2011 by Lazar Laszlo (APL 2.0)
- http://www.webqr.com
- https://github.com/LazarSoft/jsqrcode

Which in turn is a port of ZXing qrcode scanner
- http://code.google.com/p/zxing.

All are Apache-2.0 license (including this) https://github.com/zxing/zxing/blob/master/LICENSE



`
)}

function _2(md){return(
md`<mark>maybe I should use https://github.com/zxing-js/library?</mark>`
)}

function _3(md){return(
md`## Implementation`
)}

function _webcamQRReader(htl,FileAttachment,qrcode,Event){return(
async ({ width = 640, height = (width / 640) * 480 } = {}) => {
  const mainbody = htl.html`<span>
    <canvas style="display: none" id="qr-canvas"></canvas>
    <div>
      <button onclick=${setwebcam}>
        <img src="${await FileAttachment("vid.png").url()}" />
      </button>
    </div>
    <span id="outdiv"></span>`;

  var gCtx = null;
  var gCanvas = null;
  var c = 0;
  var stype = 0;
  var gUM = false;
  var webkit = false;
  var moz = false;
  var v = null;

  const vidhtml = `<video width="${width}px" height="${height}px" id="v" autoplay="">`;

  function initCanvas(w, h) {
    gCanvas = mainbody.querySelector("#qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
  }

  function captureToCanvas() {
    if (stype != 1) return;
    if (gUM) {
      try {
        gCtx.drawImage(v, 0, 0);
        try {
          qrcode.decode();
          setTimeout(captureToCanvas, 250);
        } catch (e) {
          console.log(e);
          setTimeout(captureToCanvas, 250);
        }
      } catch (e) {
        console.log(e);
        setTimeout(captureToCanvas, 250);
      }
    }
  }

  function htmlEntities(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function read(a) {
    mainbody.value = {
      time: Date.now(),
      data: a
    };
    mainbody.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function isCanvasSupported() {
    var elem = document.createElement("canvas");
    return !!(elem.getContext && elem.getContext("2d"));
  }
  function success(stream) {
    v.srcObject = stream;
    v.play();

    gUM = true;
    setTimeout(captureToCanvas, 500);
  }

  function error(error) {
    gUM = false;
    return;
  }

  function load() {
    if (isCanvasSupported() && window.File && window.FileReader) {
      initCanvas(800, 600);
      qrcode.callback = read;
      setwebcam();
    } else {
      mainbody.innerHTML =
        '<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>' +
        '<br><p id="mp2">sorry your browser is not supported</p><br><br>' +
        '<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
    }
  }

  function setwebcam() {
    var options = true;
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      try {
        navigator.mediaDevices.enumerateDevices().then(function (devices) {
          devices.forEach(function (device) {
            if (device.kind === "videoinput") {
              if (device.label.toLowerCase().search("back") > -1)
                options = {
                  deviceId: { exact: device.deviceId },
                  facingMode: "environment"
                };
            }
            console.log(
              device.kind + ": " + device.label + " id = " + device.deviceId
            );
          });
          setwebcam2(options);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("no navigator.mediaDevices.enumerateDevices");
      setwebcam2(options);
    }
  }

  function setwebcam2(options) {
    console.log(options);
    if (stype == 1) {
      setTimeout(captureToCanvas, 500);
      return;
    }
    var n = navigator;
    mainbody.querySelector("#outdiv").innerHTML = vidhtml;
    v = mainbody.querySelector("#v");

    if (n.mediaDevices.getUserMedia) {
      n.mediaDevices
        .getUserMedia({ video: options, audio: false })
        .then(function (stream) {
          success(stream);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (n.getUserMedia) {
      webkit = true;
      n.getUserMedia({ video: options, audio: false }, success, error);
    } else if (n.webkitGetUserMedia) {
      webkit = true;
      n.webkitGetUserMedia({ video: options, audio: false }, success, error);
    }

    stype = 1;
    setTimeout(captureToCanvas, 500);
  }
  load();

  return mainbody;
}
)}

function _5(md){return(
md`## Example`
)}

function _6(qrCodeData){return(
qrCodeData
)}

async function* _qrCodeData(Inputs,md,invalidation,webcamQRReader)
{
  let continueCallback;

  yield Inputs.button(
    md`**run the example**. _(prompts for webcam permission)_`,
    {
      value: invalidation,
      reduce: () => continueCallback()
    }
  );

  await new Promise((resolve) => (continueCallback = resolve));

  yield webcamQRReader({
    width: 320
  });
}


async function _qrcode(FileAttachment)
{
  // Port of instrucitons here https://github.com/LazarSoft/jsqrcode
  const sources = [
    await FileAttachment("grid.js").url(),
    await FileAttachment("version.js").url(),
    await FileAttachment("detector.js").url(),
    await FileAttachment("formatinf.js").url(),
    await FileAttachment("errorlevel.js").url(),
    await FileAttachment("bitmat.js").url(),
    await FileAttachment("datablock.js").url(),
    await FileAttachment("bmparser.js").url(),
    await FileAttachment("datamask.js").url(),
    await FileAttachment("rsdecoder.js").url(),
    await FileAttachment("gf256poly.js").url(),
    await FileAttachment("gf256.js").url(),
    await FileAttachment("decoder.js").url(),
    await FileAttachment("qrcode.js").url(),
    await FileAttachment("findpat.js").url(),
    await FileAttachment("alignpat.js").url(),
    await FileAttachment("databr.js").url()
  ];

  const promises = [];

  for (var i = 0; i < sources.length; i++) {
    var scriptTag = document.createElement("script");

    const loaded = new Promise((resolve) => {
      scriptTag.addEventListener("load", resolve);
    });
    scriptTag.src = sources[i];
    document.head.appendChild(scriptTag);
    await loaded;
  }

  return window.qrcode;
}


function _10(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["decoder.js", {url: new URL("./files/6381eaba6df4a5d57cc368a235b6ac09b447e36785d7b31e0a1e9e1f53a86659a60f3c903eafc2c42110763311ae4a1e615428bf8b42eda588385e51f260ee29.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["gf256.js", {url: new URL("./files/05336750665b115333d938479b05d70680e632e13e1f8a2915ec60eb41066e9effa308fbb559a5697126e309d4af6cff3aa594bab3e2feb914cfb932d207546b.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["version.js", {url: new URL("./files/c941902e1ce103e2e57df0a846ca0c3b48e2c1589459c62a6abfb4a3284488a9480e67406c22e4b8cf13b71c3e95402c7abe8158c615df8bdde2f9ddc143c580.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["gf256poly.js", {url: new URL("./files/11ca68edcf4c54401fb80c547caedbbb31e3963a2426c221bceac50d3e273dafeeafc474b37065a3e6cf9342d6d76ffc6a43c40ec9deaa837d03e2cb14f31c55.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["databr.js", {url: new URL("./files/a4777bb1a74f938f26dc363ac5088bd2649630c2055bd30cb13bef954b4ff66996b4dce664c0f5bb1da46ea24be2bcbeebc8585bbf77e78bcf39e701b3a17893.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["detector.js", {url: new URL("./files/331d6acb32d1af281a2a06d1a7a5eba335cbb63c0f3baabf8edb4aa3f40ac1b305d99d05ca2c1b31ef537d61e652170da2ea31ea2f34d4d88f74e9b25c623c40.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["qrcode.js", {url: new URL("./files/1ba02fdf84bf0791cc5cb6c78e1b90e53c402515d8e8df498de7bc97ee33b5229be2617d5fd1beb54e3f1fb61d0d650e3594371578ffcfd69bc18b3d41fb2e5b.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["datamask.js", {url: new URL("./files/f23016a802cf31f21da1bcf0d40d0d64159e8a9d0d75c12b33d2999f3fee57fd21c923ab5e54f271f1bb91751b277e4196faef047e51fcd5ad954555095cb4e1.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["errorlevel.js", {url: new URL("./files/556fa546ed4bab2dfa777cf36923b6fcaf243622155e568e8146d13758b1f5e353f4834f50ee060563482930a8bc53ae3daebef6d6ce316f4428005a87ea6b8c.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["datablock.js", {url: new URL("./files/9a229fcadbf3a437d6c7cb6eb01cc3d861291d067a3e7e4e2cd62e2785caf29f7457d05810640adb294e38f9cea48e40d6412e0fc80f3dc9cbc8bff1b6305375.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["findpat.js", {url: new URL("./files/489ff861c96d42f59b5452eb6f21918c30025022b148e5a7b1418468d0eed89a5a1d9b844a1c00159bdc36e5327beac6c40b3c6dad5065b47814dfff227733af.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["formatinf.js", {url: new URL("./files/b16cf5dc3e8d4235fd017da8eec88e9dece9bcba69739f49e79c6fc1e392495042e3090fd0bc20b43b094c460152644db8f354becf9e5ddeeb910ea8f181a746.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["rsdecoder.js", {url: new URL("./files/8db745fc1abd43483830fc85efc7d9462221aaf3342f11756c934ac6856100c93d09b2c55e86ee4c84588779b668cef9659a3c7e22b74dd1ea9a7cdaa399c53b.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["bitmat.js", {url: new URL("./files/55341715804278e371a400f9a198df13be4385fce45b40ffb3bcbf4078cb84faf9e9fd3d6a03404eae62fdb37a817d069e6861868788bf7f145df297464247a3.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["alignpat.js", {url: new URL("./files/de2d9d99e1ab1d8b8d2fa59a159c5a3de5798c080a918d6db992f329650ae185aecaeb2312cf0ae8c8b13a98f74c7369a72317525fba80995fcf1e8068045c53.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["bmparser.js", {url: new URL("./files/afcd28078780f75face4f3628fcd53a557d57501fe16954d595a627bcc6f27eea554c4eadb4bf91f1f606ba3fbf7f820627c7074054893a5e928a7990f2c4155.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["grid.js", {url: new URL("./files/ed5adb540fe95b3e15baea61fbd4e6a7f910d7d6fc7c1e82f0fe173ca2c50804e94e36a228d4a2163ed7ddf1e1c3392b19013ef139abeadc346f0e7f642b81b5.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["vid.png", {url: new URL("./files/6bb47d22c6093c14b6b74cb9e8055eade7be8cada255320c377661190f7a0b3ffe53606dcebed1e63b0e70f4eccebf0b8dba43d17b02207714b19ee5d4fdddeb.png", import.meta.url), mimeType: "image/png", toString}],
    ["61340.jpg", {url: new URL("./files/f08f8da291315c34a78282dbcf50eacc26d12fe9c289ce6557ea952fc5ca3f00379a246d970db0172e61f8d90377d2b2ce7842a94859911a95c706d31cf0b26f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["FileAttachment","md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("webcamQRReader")).define("webcamQRReader", ["htl","FileAttachment","qrcode","Event"], _webcamQRReader);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["qrCodeData"], _6);
  main.variable(observer("viewof qrCodeData")).define("viewof qrCodeData", ["Inputs","md","invalidation","webcamQRReader"], _qrCodeData);
  main.variable(observer("qrCodeData")).define("qrCodeData", ["Generators", "viewof qrCodeData"], (G, _) => G.input(_));
  main.variable(observer("qrcode")).define("qrcode", ["FileAttachment"], _qrcode);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _10);
  return main;
}
