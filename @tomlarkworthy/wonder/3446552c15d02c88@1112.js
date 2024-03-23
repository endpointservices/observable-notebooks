import define1 from "./a2e58f97fd5e8d7c@756.js";
import define2 from "./316f0885d15ab671@69.js";
import define3 from "./11a5ab8b1b3a51db@1161.js";
import define4 from "./dff1e917c89f5e76@1964.js";
import define5 from "./c2dae147641e012a@46.js";
import define6 from "./9c498948145037d2@140.js";
import define7 from "./dfdb38d5580b5c35@331.js";

async function _1(md,resize,FileAttachment,bluetoothLink){return(
md`# Dash Robot SDK for Observable

Dot and Dash robots were one of the best edutainment toys I got for my kids. We have had them for 3 years now, since my kids were 2, and we have played with them on-and-off throughout. Whats amazing is there is so many layers to them. At first they were just RC toys. Later they taught the basics of programming. Like all good general purpose modular things, Dash can be integrated into many different play activities.

![](${resize(await FileAttachment("image@4.png").url())})

To take my 5 year olds to the next level, we need to programming them and add our own sensors using the [LEGO adapters](https://store.makewonder.com/products/building-brick-connectors).

![](${resize(await FileAttachment("image@2.png").url())})

We added a camera phone for teleoperation. Next step add a cameraphone for Simultaneous Localization and Mapping ([SLAM](https://de.wikipedia.org/wiki/Simultaneous_Localization_and_Mapping)) and we will be nearing undergraduate level. 

![](${resize(await FileAttachment("image@5.png").url())})

Note the robot has IR distance sensors, wheel encoders, gyros, a 2DOF actuated head, buttons and LEDs. Its expensive but powerful, and now, thanks to this notebook, custom programming can be done right within a browser without installing anything! Works on a phone!!!!

_(sidenote: This is the 2nd time I have integrated Dash, I did it [once](https://www.youtube.com/watch?v=4H1N0gbyup0) with a Raspberry PI and the [morseapi](https://github.com/IlyaSukhanov/morseapi) in Python but the comms kept [dropping out](https://github.com/IlyaSukhanov/morseapi/issues/3) and required too many reboots. This setup is much more robust, more extensible and less fiddly)_

## Demo (1:30)

<iframe width="640" height="315" src="https://www.youtube-nocookie.com/embed/J8h40juXyM4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Keyboard controls

Arrow keys moves dash around, my kids find this much easier than the phone touch controls. 

You can also programatically script it using the SDK. 
~~~js
  sdk.drive(forward, turn)
~~~

To get the Bluetooth connection working, click ${
  bluetoothLink.outerHTML
} to open a top level page proxy to this notebook (this gets around the iframe sandbox security restrictions).

## WIP

I am am translating mostly from https://github.com/IlyaSukhanov/morseapi as I needed. Feel free to leave a comment to prioritize a feature, or suggestions welcome. 

`
)}

function _startupscript(sdk)
{
  // Will resend when link reestablishes
  sdk.playSound("SYSTAIRPORTJET");
}


function _brightness(Range){return(
Range([0, 255], {
  label: "eye",
  step: 1
})
)}

function _earLeftR(Range){return(
Range([0, 255], {
  label: "ear left R",
  step: 1
})
)}

function _earLeftG(Range){return(
Range([0, 255], {
  label: "ear left G",
  step: 1
})
)}

function _earLeftB(Range){return(
Range([0, 255], {
  label: "ear left B",
  step: 1
})
)}

function _earRightR(Range){return(
Range([0, 255], {
  label: "ear right R",
  step: 1
})
)}

function _earRightB(Range){return(
Range([0, 255], {
  label: "ear right B",
  step: 1
})
)}

function _earRightG(Range){return(
Range([0, 255], {
  label: "ear right G",
  step: 1
})
)}

function _forward(Range){return(
Range([-1023, 1023], {
  label: "forward",
  step: 1
})
)}

function _pitch(to_int,dotData){return(
to_int((dotData[4] & 0xf0) << 4 | dotData[2], 12)
)}

function _turn(Range){return(
Range([-1023, 1023], {
  label: "turn",
  step: 1
})
)}

function _pitchDelta(to_int,dashData){return(
to_int(
            (dashData[4] & 0x30) << 4 | dashData[3],
            10
        )
)}

function _roll(to_int,dotData){return(
to_int((dotData[4] & 0xf) << 8 | dotData[3], 12)
)}

function _roll_delta(to_int,dashData){return(
to_int(
            (dashData[4] & 0x3) << 8 | dashData[5],
            10
        )
)}

function _yaw(to_int,dashData){return(
to_int((dashData[13]  << 8) | dashData[12], 12)
)}

function _buttons(dotData){return(
[
    (dotData[8] & 0x10) > 0,
    (dotData[8] & 0x20) > 0,
    (dotData[8] & 0x40) > 0,
    (dotData[8] & 0x80) > 0
  ]
)}

function _proximity(dashData){return(
[
  dashData[6],
  dashData[7],
  dashData[8], // rear
]
)}

function _wheels(dashData){return(
[
  (dashData[15] << 8) | dashData[14], // left
  (dashData[17] << 8) | dashData[16]
]
)}

function _wheelDistance(to_int,dashData){return(
to_int(
  (dashData[9] & 0xf) << 12 | dashData[11] << 8 | dashData[10],
  16
)
)}

function _jogTurn(){return(
0
)}

function _jogForward(){return(
0
)}

function _keyboard($0,$1,invalidation)
{
  const keyup = e => {
    switch (e.keyCode) {
      case 38: // UP
      case 40: // DOWN
      case 87: // W
      case 83: // S
        $0.value = 0;
        break;
      case 37: // LEFT
      case 39: // RIGHT
      case 65: // A
      case 68: // D
        $1.value = 0;
        break;
    }
  };
  const keydown = e => {
    switch (e.keyCode) {
      case 38: // UP
      case 87: // W
        $0.value = 1;
        break;
      case 40: // DOWN
      case 83: // S
        $0.value = -1;
        break;
      case 37: // LEFT
      case 65: // A
        $1.value = -1;
        break;
      case 39: // RIGHT
      case 68: // D
        $1.value = 1;
        break;
    }
  };
  window.addEventListener('keyup', keyup);
  window.addEventListener('keydown', keydown);

  invalidation.then(() => {
    window.removeEventListener('keyup', keyup);
    window.removeEventListener('keydown', keydown);
  });
}


function _24(md){return(
md`### Actions`
)}

function _eyeBrightness(brightness,controller)
{
  var data = new Uint8Array(2);
  data[0] = 8;
  data[1] = brightness;
  controller.proxy.writeValue(data);
}


function _leftEar(earLeftR,earLeftG,earLeftB,controller)
{
  var data = new Uint8Array(4);
  data[0] = 11;
  data[1] = earLeftR;
  data[2] = earLeftG;
  data[3] = earLeftB;
  controller.proxy.writeValue(data);
}


function _RightEar(earRightR,earRightG,earRightB,controller)
{
  var data = new Uint8Array(4);
  data[0] = 12;
  data[1] = earRightR;
  data[2] = earRightG;
  data[3] = earRightB;
  controller.proxy.writeValue(data);
}


function _drive(forward,turn,jogTurn,jogForward,controller)
{
  // If negative value, shift sign bit into correct position
  var forwardSpeed =
    forward < 0 ? parseInt(forward) + 0x800 : parseInt(forward);
  var turnSpeed = turn < 0 ? parseInt(turn) + 0x800 : parseInt(turn);

  if (jogTurn != 0) turnSpeed = -jogTurn * 300;
  if (jogForward != 0) forwardSpeed = jogForward * 200;

  var data = new Uint8Array(4);
  data[0] = 0x02;
  data[1] = 0xff & forwardSpeed;
  data[2] = 0xff & turnSpeed;
  data[3] = ((0x700 & forwardSpeed) >> 8) | ((0x700 & turnSpeed) >> 5);
  controller.proxy.writeValue(data);
}


function _29(md){return(
md`### Sensors

I was unable to use comlink transfer or proxy to efficiently get sensor data here, in the end I JSONified it but thats ok.

See https://github.com/IlyaSukhanov/morseapi/blob/master/morseapi/sensors.py#L61
`
)}

function _30(dotData){return(
(dotData[8]& 0x20) > 0
)}

async function* _dashData(controller)
{
  while (true) {
    try {
      yield await controller.proxy.fetchDashData()
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}


async function* _dotData(controller)
{
  while (true) {
    try {
      yield await controller.proxy.fetchDotData()
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}


function _to_int(){return(
(value, bits) => {
  if (value > ((1<<(bits-1))-1))
    return  value - (1<<bits)
  else
    return value
}
)}

function _34(md){return(
md`### SDK`
)}

function _sdk($0,$1,Event,controller){return(
{
  drive: (forward, turn) => {
    $0.value = forward;
    $1.value = turn;
    $0.dispatchEvent(new Event('input'));
    $1.dispatchEvent(new Event('input'));
  },
  playSound: sound => {
    var data = new Uint8Array(1 + sound.length);
    data[0] = 24;
    for (var i = 0; i < sound.length; i++) {
      data[i + 1] = sound.charCodeAt(i);
    }
    controller.proxy.writeValue(data);
  }
}
)}

function _36(md){return(
md`## Communication`
)}

async function _controller(refresh,ifr,comlink,self)
{
  refresh; // reset
  await new Promise(resolve => (ifr.onload = resolve));
  const controller = comlink.wrap(
    comlink.windowEndpoint(
      ifr.contentWindow,
      self,
      "https://endpointservice.web.app"
    )
  );

  return {
    proxy: controller
  };
}


function _38(md){return(
md`### Communication Watchdog

Regularly checks the bluetooth page can be reached. If it cannot, it restarts the cross-origin bridge with a refresh.
`
)}

function _39(html,$0){return(
html`<button onclick=${() => $0.value++}>reset comms</button>`
)}

function _refresh(){return(
0
)}

function _lastPing(){return(
new Date()
)}

function _lastReset(){return(
new Date()
)}

async function* _pinger(controller,$0,Promises)
{
  // Send a message to the top level page
  controller;
  while (true) {
    const val = Math.random();

    console.log(`${await controller.proxy.ping()}`);
    $0.value = new Date();
    yield Promises.delay(1000);
  }
}


function _watchDog(now,lastPing,lastReset,$0,$1)
{
  now; // often check
  // auto restart comms if pings are 5 seconds behind
  if (new Date() - lastPing > 5000 && new Date() - lastReset > 5000) {
    $0.value = new Date();
    $1.value++;
  }
}


function _45(md){return(
md`### Cross-origin bridge to child iframe

The bridge is a child iframe of the observable notebook. As such it cannot open a bluetooth session. However, even though it is cross-origin it can communicate with the parent bidirectionally using postMessage. So we use this to create a converter to https://endpointservice.web.app domain.
`
)}

function _comlink(require){return(
require("comlink")
)}

function _ifr(html,iframeHtml,session,refresh){return(
html`<iframe height="50px" id="bridge" src=${`${
  iframeHtml.href
}?session=${session}&origin=${encodeURIComponent(window.origin)}`}></iframe>` ||
  refresh
)}

function _iframeHtml(deploy){return(
deploy("bridge", (req, res) => {
  res.send(`<!DOCTYPE html>
<title>Iframe bridge</title>
<h2> Iframe bridge </h2>
<script type="module">
var bc = new BroadcastChannel('${req.query.session}');
// Tab to parent
bc.onmessage = function (e) {
  window.parent.postMessage(e.data, '${req.query.origin}')
} 

// Parent to tab
window.onmessage = (e) => {
  bc.postMessage(e.data);
}
</script>`);
})
)}

function _49(md){return(
md`### Bluetooth Page

The Bluetooth page has to be its own top level page so it can call bluetooth API. It is on https://endpointservice.web.app domain, so it can can also communicate using Broadcast channel with the bridge iframe who is on same-origin, just click the link below to open it!
`
)}

function _bluetoothLink(deploy,html,session)
{
  const baseLink = deploy("bluetooth", (req, res) => {
    res.send(`<!DOCTYPE html>
<title> Bluetooth link </title>
<p>Turn your robot on, click connect below and pair over Bluetooth. Once connected you can return to <a href="https://observablehq.com/@tomlarkworthy/wonder" target="_blank">@tomlarkworthy/wonder</a></p>
<button id="connectBtn">Connect</button>
<script type="module">
  import * as Comlink from "https://unpkg.com/comlink@alpha/dist/esm/comlink.mjs";
  var bc = new BroadcastChannel('${req.query.session}');

  const SERVICE_UUID = 'af237777-879d-6186-1f49-deca0e85d9c1';
  const COMMAND_UUID = 'af230002-879d-6186-1f49-deca0e85d9c1';

  var device;
  var gatt;
  var service;
  var command;
  var dash_sensor;
  var dot_sensor;
  var fetchDashData = undefined; // I could not get comlink callbacks working with BroadcastChannel, so we poll
  var fetchDotData = undefined;

  async function connect() {
    gatt = await device.gatt.connect()
    service = await device.gatt.getPrimaryService(SERVICE_UUID)
    command = await service.getCharacteristic(COMMAND_UUID);
    // dash_sensor
    dash_sensor = await service.getCharacteristic('af230006-879d-6186-1f49-deca0e85d9c1');
    dash_sensor.startNotifications();
    dash_sensor.oncharacteristicvaluechanged = (evt) => {
      if (fetchDashData) {
        fetchDashData([...new Uint8Array(evt.currentTarget.value.buffer)]);
        fetchDashData = undefined;
      }
    }
    dot_sensor = await service.getCharacteristic('af230003-879d-6186-1f49-deca0e85d9c1');
    dot_sensor.startNotifications();
    dot_sensor.oncharacteristicvaluechanged = (evt) => {
      if(fetchDotData) {
        fetchDotData([...new Uint8Array(evt.currentTarget.value.buffer)]);
        fetchDotData = undefined;
      }
    }

    window.device = device;
    window.gatt = gatt;
    window.service = service;
    window.command = command;
    window.dash_sensor = dash_sensor;
    window.dot_sensor = dot_sensor;
  }

  document.getElementById("connectBtn").onclick = async () => {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }]
    });
    connect();
  }


  Comlink.expose({
    isConnected: () => gatt && gatt.connected,
    disconnect: () => gatt.disconnect(),
    connect: async () => {
      connect();
    },
    writeValue: (data) => command.writeValue(data),
    fetchDashData: () => new Promise(resolve => fetchDashData = resolve),
    fetchDotData: () => new Promise(resolve => fetchDotData = resolve),
    ping: () => "pong"
  }, bc);
</script>`);
  });
  return html`<a target="_blank" href="${baseLink.href}?session=${session}">bluetooth</a>`;
}


function _51(md){return(
md`
### References
This page would not be possible without the help of
- https://www.maissan.net/articles/dash-and-dot
- https://github.com/IlyaSukhanov/morseapi
- https://github.com/playi/WonderPy
- https://github.com/GoogleChromeLabs/comlink
`
)}

function _session(localStorage,randomId)
{
  // We try to keep the session ID stable but generate one first time so BroadcastChannels are impossible to guess.
  const KEY = "bluetoothsession";
  var session;
  if (!(session = localStorage.getItem(KEY))) {
    session = randomId(30);
    localStorage.setItem(KEY, session);
  }
  return session;
}


function _60(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@2.png", {url: new URL("./files/fe45b4483b4df8f77a9d857b8810549a2c47a3b784ef07caecfe2d4a25b766abdc39fdfe91e562820e5f0edab450684ea87b839ef2a3801907e5c45d7f962f0c.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@4.png", {url: new URL("./files/d0ebe2dfa390251eaca7094eb58baf31affa8d3f50a1ab9ffef9d345a42262d992b9a173a2c3f91296a3b3521febb56909190117636854782ca4499e611a2eb9.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@5.png", {url: new URL("./files/f6a77ae26432d008c2d48148b63f4393959f098d549b70b48755009d9c8ab76cf31822368c91ae1f01dff83e9da72b93af803d119fb54db05830f4ece5e09b51.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","resize","FileAttachment","bluetoothLink"], _1);
  main.variable(observer("startupscript")).define("startupscript", ["sdk"], _startupscript);
  main.variable(observer("viewof brightness")).define("viewof brightness", ["Range"], _brightness);
  main.variable(observer("brightness")).define("brightness", ["Generators", "viewof brightness"], (G, _) => G.input(_));
  main.variable(observer("viewof earLeftR")).define("viewof earLeftR", ["Range"], _earLeftR);
  main.variable(observer("earLeftR")).define("earLeftR", ["Generators", "viewof earLeftR"], (G, _) => G.input(_));
  main.variable(observer("viewof earLeftG")).define("viewof earLeftG", ["Range"], _earLeftG);
  main.variable(observer("earLeftG")).define("earLeftG", ["Generators", "viewof earLeftG"], (G, _) => G.input(_));
  main.variable(observer("viewof earLeftB")).define("viewof earLeftB", ["Range"], _earLeftB);
  main.variable(observer("earLeftB")).define("earLeftB", ["Generators", "viewof earLeftB"], (G, _) => G.input(_));
  main.variable(observer("viewof earRightR")).define("viewof earRightR", ["Range"], _earRightR);
  main.variable(observer("earRightR")).define("earRightR", ["Generators", "viewof earRightR"], (G, _) => G.input(_));
  main.variable(observer("viewof earRightB")).define("viewof earRightB", ["Range"], _earRightB);
  main.variable(observer("earRightB")).define("earRightB", ["Generators", "viewof earRightB"], (G, _) => G.input(_));
  main.variable(observer("viewof earRightG")).define("viewof earRightG", ["Range"], _earRightG);
  main.variable(observer("earRightG")).define("earRightG", ["Generators", "viewof earRightG"], (G, _) => G.input(_));
  main.variable(observer("viewof forward")).define("viewof forward", ["Range"], _forward);
  main.variable(observer("forward")).define("forward", ["Generators", "viewof forward"], (G, _) => G.input(_));
  main.variable(observer("pitch")).define("pitch", ["to_int","dotData"], _pitch);
  main.variable(observer("viewof turn")).define("viewof turn", ["Range"], _turn);
  main.variable(observer("turn")).define("turn", ["Generators", "viewof turn"], (G, _) => G.input(_));
  main.variable(observer("pitchDelta")).define("pitchDelta", ["to_int","dashData"], _pitchDelta);
  main.variable(observer("roll")).define("roll", ["to_int","dotData"], _roll);
  main.variable(observer("roll_delta")).define("roll_delta", ["to_int","dashData"], _roll_delta);
  main.variable(observer("yaw")).define("yaw", ["to_int","dashData"], _yaw);
  main.variable(observer("buttons")).define("buttons", ["dotData"], _buttons);
  main.variable(observer("proximity")).define("proximity", ["dashData"], _proximity);
  main.variable(observer("wheels")).define("wheels", ["dashData"], _wheels);
  main.variable(observer("wheelDistance")).define("wheelDistance", ["to_int","dashData"], _wheelDistance);
  main.define("initial jogTurn", _jogTurn);
  main.variable(observer("mutable jogTurn")).define("mutable jogTurn", ["Mutable", "initial jogTurn"], (M, _) => new M(_));
  main.variable(observer("jogTurn")).define("jogTurn", ["mutable jogTurn"], _ => _.generator);
  main.define("initial jogForward", _jogForward);
  main.variable(observer("mutable jogForward")).define("mutable jogForward", ["Mutable", "initial jogForward"], (M, _) => new M(_));
  main.variable(observer("jogForward")).define("jogForward", ["mutable jogForward"], _ => _.generator);
  main.variable(observer("keyboard")).define("keyboard", ["mutable jogForward","mutable jogTurn","invalidation"], _keyboard);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("eyeBrightness")).define("eyeBrightness", ["brightness","controller"], _eyeBrightness);
  main.variable(observer("leftEar")).define("leftEar", ["earLeftR","earLeftG","earLeftB","controller"], _leftEar);
  main.variable(observer("RightEar")).define("RightEar", ["earRightR","earRightG","earRightB","controller"], _RightEar);
  main.variable(observer("drive")).define("drive", ["forward","turn","jogTurn","jogForward","controller"], _drive);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["dotData"], _30);
  main.variable(observer("dashData")).define("dashData", ["controller"], _dashData);
  main.variable(observer("dotData")).define("dotData", ["controller"], _dotData);
  main.variable(observer("to_int")).define("to_int", _to_int);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("sdk")).define("sdk", ["viewof forward","viewof turn","Event","controller"], _sdk);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("controller")).define("controller", ["refresh","ifr","comlink","self"], _controller);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["html","mutable refresh"], _39);
  main.define("initial refresh", _refresh);
  main.variable(observer("mutable refresh")).define("mutable refresh", ["Mutable", "initial refresh"], (M, _) => new M(_));
  main.variable(observer("refresh")).define("refresh", ["mutable refresh"], _ => _.generator);
  main.define("initial lastPing", _lastPing);
  main.variable(observer("mutable lastPing")).define("mutable lastPing", ["Mutable", "initial lastPing"], (M, _) => new M(_));
  main.variable(observer("lastPing")).define("lastPing", ["mutable lastPing"], _ => _.generator);
  main.define("initial lastReset", _lastReset);
  main.variable(observer("mutable lastReset")).define("mutable lastReset", ["Mutable", "initial lastReset"], (M, _) => new M(_));
  main.variable(observer("lastReset")).define("lastReset", ["mutable lastReset"], _ => _.generator);
  main.variable(observer("pinger")).define("pinger", ["controller","mutable lastPing","Promises"], _pinger);
  main.variable(observer("watchDog")).define("watchDog", ["now","lastPing","lastReset","mutable lastReset","mutable refresh"], _watchDog);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("comlink")).define("comlink", ["require"], _comlink);
  main.variable(observer("ifr")).define("ifr", ["html","iframeHtml","session","refresh"], _ifr);
  main.variable(observer("iframeHtml")).define("iframeHtml", ["deploy"], _iframeHtml);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("bluetoothLink")).define("bluetoothLink", ["deploy","html","session"], _bluetoothLink);
  main.variable(observer()).define(["md"], _51);
  const child1 = runtime.module(define1);
  main.import("Range", child1);
  main.variable(observer("session")).define("session", ["localStorage","randomId"], _session);
  const child2 = runtime.module(define2);
  main.import("randomId", child2);
  const child3 = runtime.module(define3);
  main.import("html", child3);
  const child4 = runtime.module(define4);
  main.import("deploy", child4);
  const child5 = runtime.module(define5);
  main.import("localStorage", child5);
  const child6 = runtime.module(define6);
  main.import("resize", child6);
  const child7 = runtime.module(define7);
  main.import("footer", child7);
  main.variable(observer()).define(["footer"], _60);
  return main;
}
