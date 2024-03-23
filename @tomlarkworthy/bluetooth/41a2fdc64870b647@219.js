import define1 from "./dff1e917c89f5e76@1964.js";
import define2 from "./316f0885d15ab671@69.js";
import define3 from "./dfdb38d5580b5c35@331.js";

async function _1(md,FileAttachment,bluetoothLink){return(
md`# Bluetooth Proxy PoC

Bluetooth does not work in embedded cross-origin iframes. So this is a work around with [serverless cells](https://observablehq.com/@endpointservices/serverless-cells) to get in contact with the Bluetooth API. 

![](${await FileAttachment("image.png").url()})

Open a 2nd tab by clicking: ${
  bluetoothLink.outerHTML
}. The opened tab is able to communicate back to *this* notebook. And this notebook is able to send commands to it. Thus, we are finally able to use the bluetooth API from a notebook (in theory, I have not fleshed the details out, advice welcome on how to proxy the API without a ton of code).
`
)}

function _selectedBluetoothDeviceId(Generators)
{
  const events = [];
  return Generators.observe(next => {
    next([]);
    window.onmessage = e => {
      if (e.origin !== "https://endpointservice.web.app") return;

      events.push(e.data);
      next(events);
    };
  });
}


function _4(md){return(
md`## Cross-origin bridge to child iframe

The bridge is a child iframe of the observable notebook. As such it cannot open a bluetooth session. However, even though it is cross-origin it can communicate with the parent bidirectionally using postMessage. So we use this to create a converter to https://endpointservice.web.app domain.
`
)}

function _bridgeLink(deploy,html){return(
deploy("bridge", (req, res) => {
  res.send(
    html`
<h1>Bridge</h1>
<script>
var channel = new BroadcastChannel('${req.query.session}');

// Bluetooth to Parent
channel.onmessage = function (e) {
  window.parent.postMessage(e.data, 'https://tomlarkworthy.static.observableusercontent.com')
} 

// Parent to Bluetooth
window.onmessage = (e) => {
  channel.postMessage(e.data);
}

</script>`.outerHTML
  );
})
)}

function _bridge(html,bridgeLink,session){return(
html`<iframe height="50px" id="bridge" src=${`${bridgeLink.href}?session=${session}`}></iframe>`
)}

function _7(md){return(
md`## Bluetooth Page

The Bluetooth page has to be its own top level page so it can call bluetooth API. It is on https://endpointservice.web.app domain, so it can can also communicate using Broadcast channel with the bridge iframe who is on same-origin, just click the link below to open it!
`
)}

function _bluetoothLink(deploy,html,session)
{
  const baseLink = deploy("bluetooth", (req, res) => {
    res.send(
      html`
      <button id="connectBtn">Connect to Device</button>
      <script>
        var channel = new BroadcastChannel('${req.query.session}');
        const button = document.getElementById("connectBtn");
        button.onclick = async event => {
          event.preventDefault();
          console.log("clicked");
          navigator.bluetooth.requestDevice({acceptAllDevices: true})
          .then(device=>{
            console.log("Device info: ");
            console.log(device);
            channel.postMessage(device.id); // Call the bidge
          })
          .catch(err=>{
            console.log("Error info: "+err.message);
          });
        };
      </script>
  `.outerHTML
    );
  });
  return html`<a target="_blank" href="${baseLink.href}?session=${session}">bluetooth</a>`;
}


function _session(randomId){return(
randomId(30)
)}

function _12(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/6a8d0366ebb206ae2c11f58ed669963a9e1289398b5d2f67166a2f126a19645253a8c2ba4269b75dfe4f5e2536f702c5879416b97db8300430f119e2c311730e.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment","bluetoothLink"], _1);
  main.variable(observer("selectedBluetoothDeviceId")).define("selectedBluetoothDeviceId", ["Generators"], _selectedBluetoothDeviceId);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("bridgeLink")).define("bridgeLink", ["deploy","html"], _bridgeLink);
  main.variable(observer("bridge")).define("bridge", ["html","bridgeLink","session"], _bridge);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("bluetoothLink")).define("bluetoothLink", ["deploy","html","session"], _bluetoothLink);
  main.variable(observer("session")).define("session", ["randomId"], _session);
  const child2 = runtime.module(define2);
  main.import("randomId", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _12);
  return main;
}
