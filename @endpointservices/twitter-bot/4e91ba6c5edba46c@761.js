// https://observablehq.com/@endpointservices/zapier@761
import define1 from "./11a5ab8b1b3a51db@1161.js";
import define2 from "./dff1e917c89f5e76@1965.js";
import define3 from "./993a0c51ef1175ea@1396.js";
import define4 from "./ab3e70b29c480e6d@83.js";
import define5 from "./293899bef371e135@293.js";

async function _1(md,FileAttachment){return(
md`# Zapier Cell Trigger


Trigger actions on the Zapier platform from a notebook. Send an arbitrary JSON payload down the tubes to invoke actions such as _"Send Email"_, _"Tweet"_ in a general way.

<img width="70%" src=${await FileAttachment("zapier.png").url()}> </img>

Import the createTrigger function.

~~~js
    import {createTrigger} from '@endpointservices/zapier'
~~~

Create a trigger 


~~~js
  defaultTrigger = createTrigger({
    name: "default",
    authorized_public_keys: ["CffdcxB8733cSSoJxRrhEiTmzy5ZU1DmyXwGqifuNmo="],
    checkPayload: (payload) => payload.value !== undefined,
    sample: {
      value: "This message appears in Zapier UI when setting up a new Zap, the sample payload fields populates the autocomplete for output variables"
    }
  })
~~~

Which will return a function that sends data to Zapier.

~~~js
   defaultTrigger: (payload) => {}
~~~

You can prevent malformed data with the _checkPayload_ field

~~~js
    checkPayload: (payload) => throw new Error(msg)
~~~

which is run both client side and server side (serverside is tamper proof).

#### Privacy 

Only the secret holder to an authorized public key can receive payload data in a Zap.
You can generate a public/secret key pairs in this notebook below. 

The app that receives data Zapier side is called Endpoint Services and is not public, but you can get access with this [invite link](https://zapier.com/developer/public-invite/123889/486258a91f4b504a0b025cb085077318/). Use a generate secret key to authenticate a connection with a Notebook.
`
)}

function _2(md){return(
md `## Cell Triggers

Send a JSON payload to Zapier.

1. Generate an Endpoint Service Key Pair (or reuse an existing one)
- Use _createTrigger_ in a notebook. Include your _public key_ in the *authorized_public_keys* field.
-  _Publish_ or _link share_ the notebook. The Notebook **must** be on the public internet for Zapier to find.
- On Zapier.com side add Endpoint Services connection using your *secret_key* ([invite link](https://zapier.com/developer/public-invite/123889/486258a91f4b504a0b025cb085077318/)).
- Create a zap using a **Observable Notebook Cell Trigger**, and follow the instructions in Zapier.
- Once setup, calling _createTrigger_ will send the first argument to the Zap. 
`
)}

function _createTrigger(location,deploy,sha256_b64,db,notebookID){return(
function createTrigger({
    name =  "default",
    allowOrigin = location.origin,
    sample = {},
    checkPayload = () => {},
    authorized_public_keys = []
  } = {}) {
  const trigger_name = "cell_trigger_" + name
  try { // If we are embedded none of the deploy's can work
    // Create a function for serving the Zapier event sample
    const name_spec = "perform_list_cell_trigger_" + name
    const a_spec = deploy(name_spec, async (req, res) => {
      // We do an auth check too so the user has to have the keys correct
      const api_key = req.query.api_key;
      const public_key = await sha256_b64(api_key)
      if (!authorized_public_keys.includes(public_key)) {
        res.status(401).send("Connections public key not found in authorized_public_keys");
      } else {
        res.json([sample]);
      }
    });

    // Create a *common* notebook level function for listing ALL triggers in this notebook.
    // Note each function will be redeclaring this implementation needlessly (but harmlessly).

    // Each function idempotently appends to the cell_triggers map though
    window.cell_triggers = Object.defineProperty(window.cell_triggers || {}, name, {
      value: authorized_public_keys,
      configurable: true,
      enumerable: true
    });

    // The common implementation returns the array of triggers
    const list_triggers = deploy("list_cell_triggers", async (req, res, ctx) => {
      res.header("Access-Control-Allow-Origin", `https://${ctx.namespace}.static.observableusercontent.com`); 
      res.json(Object.keys(window.cell_triggers).map(name => ({
        id: name,
        trigger_name: name
      }))); 
    });

    const a = deploy(trigger_name, async (req, res, ctx) => {
      // Default CORS for same notebook origin
      res.header('Access-Control-Allow-Origin', allowOrigin);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      if (req.method == 'OPTIONS') res.send();
      if (req.method != 'POST') res.status(500).json({msg: "POST only"});

      // validate body
      if (await checkPayload(JSON.parse(req.body)) === false) {
        throw new Error("Validate was false");
      }

      const cell_trigger = `${req.query.notebook_id}#${name}`
      const snapshot = await db.collection(
          `/services/zapier` + 
          `/cell_trigger_subs64/${encodeURIComponent(cell_trigger)}` + 
          `/hookUrls64`)
        .get()
      let rejected = 0;
      const triggers = snapshot.docs.map(
        async (doc) => {
          // Only propogate to subscriber if authorized
          const hookURL = decodeURIComponent(doc.id);
          const public_key = doc.data().api_key; 
          // Is the public_key authorized for this trigger at this time?
          if (!authorized_public_keys.includes(public_key)) {
            // No! Do not propogate
            rejected++;
            return Promise.resolve("Unauthorized")
          }
          // Call Zapier's callback
          const zapier_response = await fetch(hookURL, {
            method: "POST",
            body: req.body
          })

          return zapier_response;
        }
      );
      await Promise.all(triggers);
      res.json({
        'mgs': 'ok'
      });
    }, {
      modifiers: ["terminal"]
    });

    console.log(`Deploying: ${a.href}, ${a_spec.href}, ${list_triggers.href}`)
  } catch (err) {
    console.log(err)
  }
  
  const trigger = async (payload) => {
    if (await checkPayload(payload) === false) {
      throw new Error("Validate was false");
    }
    const triggerURL = `https://endpointservice.web.app/notebooks/${notebookID()}/deployments/${trigger_name}`
    const response = await fetch(`${triggerURL}?notebook_id=${notebookID()}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (response.status !== 200) throw new Error(await response.text())
  }
  return trigger
}
)}

function _4(md){return(
md`## API Key Pair Generator

Private triggers have authorized public keys associated which can only be read with matching secret API keys. Use this form to generate a public/secret key pair. You can use triggers to relay sensitive information as long as you keep your secret key safe (or throw it away after authenticating with Zapier).

**Place the** *public_key* **in the** *authorized_public_keys* **array when calling** *createTrigger* **in a notebook.**

**Use the** *secret_key* ** to authenticate a Zapier connection to Endpoint Service.** You only need to do this once and can then dispose of the key. Our systems never store the secret key.
`
)}

function _5(generateKeyPair,clipboard,html)
{
  async function generate() {
    const keys = await generateKeyPair()
    console.log(keys)
    document.getElementById("public_key").innerHTML = keys.public;
    document.getElementById("secret_key").innerHTML = keys.secret;
  }
  async function copy(evt) {
    document.getElementById("copyMsg").innerHTML = "Copied to clipboard";
    clipboard(evt.target.innerHTML);
    async function sleep(secs) {
      await new Promise(resolve => setTimeout(resolve, secs * 1000));
    }
    await sleep(1);
    document.getElementById("copyMsg").innerHTML = "Click a key to copy.";
  }
  return html`<div>
    <div id="copyMsg">Generate a Public/Secret pair.</div>
    <table>
      <tbody><tr>
        <th>Public Key <br> (for notebook)</th>
        <td id="public_key" onclick=${copy}>---</td>
      </tr><tr>
        <th>Secret Key <br> (for Zapier)</th>
        <td id="secret_key" onclick=${copy}>---</td>
      </tr></tbody>
    </table>
    <button onclick=${generate}>Generate</button>
  </div>`
}


function _6(md){return(
md`## Demo of writing to a spreadsheet.

`
)}

function _7(md){return(
md`### We have created  a trigger`
)}

function _defaultTrigger(createTrigger){return(
createTrigger({
  name: "default",
  authorized_public_keys: ["RJ5BhyVkkiSAUPUlnhBQioT1a0F238ayYBfpUJb7t6I="],
  checkPayload: (payload) => payload.value !== undefined,
  sample: {
    value: "This message appears in Zapier UI when setting up a new Zap, the sample payload fields populates the autocomplete for output variables"
  }
})
)}

function _9(md){return(
md`### Write to test [Google spreadsheet](https://docs.google.com/spreadsheets/d/1S-Z66kzXB1_2J_3AUZ_bMBLDoW7zL8_GmFFD9qbPfaU)`
)}

function _10(defaultTrigger,html)
{
  function keyup(evt) {
    if (evt.key === "Enter") {
      const value = evt.target.value;
      console.log("Triggering with ", value)
      defaultTrigger({value})
      evt.target.value = "";
    }
  }
  return html`<input onkeyup=${keyup}>`
}


function _11(md){return(
md`### Our Zap writes to a Google sheet, you can check it out

Our test Zap updates a [Google spreadsheet](https://docs.google.com/spreadsheets/d/1S-Z66kzXB1_2J_3AUZ_bMBLDoW7zL8_GmFFD9qbPfaU) with your value within 20 seconds or so. 

## Demo of emailing.

Here is another small [example which sends an email](https://observablehq.com/@tdlgkjfhdljovtttqrzu/trigger-sample).

## Privacy and Security 
Note about privacy: you are unable to subscribe to other notebook's triggers, as you do not have knowledge of the secret key. This means you cannot evesdrop on other notebook's payloads. If you inspect our source code you will see the secret is never persisted to our storage systems.

Note about security: an attacker can, however, use a _HTTP client_ to manually trigger a cell trigger with their own data. This is analogous to a public API endpoint being scripted. So you need to either design your application so that this is not a vunerability, or add an additional layer of security. The _checkPayload_ hook is for integrating custom auth logic (e.g. [Firebase Auth]() checks, [encrypted passwords](https://observablehq.com/@tomlarkworthy/aws-serverless-password)).
`
)}

function _12(md){return(
md`## Backend Implementation: Instant Trigger Hooks for Zapier

This section is for our integration with Zapier. Users do not need to understand this, but if you would like to make your own integration or understand how we process data it might be an interesting read.

See https://zapier.com/help/create/basics/set-up-your-zap-trigger
`
)}

function _subscribe_cell_trigger(deploy,sha256_b64,db){return(
deploy("subscribe_cell_trigger", async (req, res) => {
  // Anyone can call this URL, but it doesn't send data anywhere *unless* the API key matches. 
  const api_key = req.query.api_key;
  const public_key = await sha256_b64(api_key)
  const body = JSON.parse(req.body);
  const cell_trigger = body.cell_trigger;
  const hookUrl = body.hookUrl;
  await db.doc(
    `/services/zapier` + 
    `/cell_trigger_subs64/${encodeURIComponent(cell_trigger)}` + 
    `/hookUrls64/${encodeURIComponent(hookUrl)}`
  ).set({api_key: public_key}, {merge: true});
  res.json({"msg": "subscribe ok"})
})
)}

function _unsubscribe_cell_trigger(deploy,db){return(
deploy("unsubscribe_cell_trigger", async (req, res) => {
  // Anyone can call this URL, but unless you know a hookUrl, which is a Zapier-ES secret,
  // it doesn't do anything. 
  const body = JSON.parse(req.body);
  const cell_trigger = body.cell_trigger;
  const hookUrl = body.hookUrl;
  await db.doc(
    `/services/zapier` + 
    `/cell_trigger_subs64/${encodeURIComponent(cell_trigger)}` + 
    `/hookUrls64/${encodeURIComponent(hookUrl)}`
  ).delete()
  res.json({"msg": "unsubscribe ok"})
})
)}

function _15(md){return(
md`## Backend Implementation: API Key Generation`
)}

function _sha256_b64(){return(
async function sha256_b64(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to base64
    return btoa(String.fromCharCode.apply(null, new Uint8Array(hashBuffer)));
}
)}

function _generateId(){return(
function generateId () {
  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0")
  }
  var arr = new Uint8Array(36)
  window.crypto.getRandomValues(arr)
  return btoa(String.fromCharCode.apply(null, arr));
}
)}

function _generateKeyPair(generateId,sha256_b64,db){return(
async function generateKeyPair() {
  do {
    var secret = generateId();
    var pub = await sha256_b64(secret)
  } while ( pub.includes("/") || secret.includes("/"))
  // We store public key for UX reasons (testing validity of secret key).
  // We avoid storing the secret key.
  await db.doc(`services/zapier/keypairs/${pub}`).set({}) 
  return {
    public: pub,
    secret
  }
}
)}

function _testAPIKey(deploy,sha256_b64,db){return(
deploy("testAPIKey", async (req, res) => {
  const api_key = req.query.api_key;
  const pub = await sha256_b64(api_key)
  const snap = await db.doc(`services/zapier/keypairs/${pub}`).get();
  if (snap.exists) {
    res.json({
      public_key: pub
    }) // ok
  } else {
    res.status(404).end();
  }
})
)}

function _db(firebase){return(
firebase.firestore()
)}

function _notebookID(getContext){return(
() => {
  const ctx = getContext(); 
  return `@${ctx.namespace}/${ctx.notebook}`
}
)}

function _27(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["zapier.png", {url: new URL("./files/e489c027a94f63bdf02166d09611dc04f13681617393d806fb9b4fc52cc09aa4a7f8114000355e2c5813a388a547c0d2154e197be1fb7739f1285c26cf721b20.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("createTrigger")).define("createTrigger", ["location","deploy","sha256_b64","db","notebookID"], _createTrigger);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["generateKeyPair","clipboard","html"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("defaultTrigger")).define("defaultTrigger", ["createTrigger"], _defaultTrigger);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["defaultTrigger","html"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("subscribe_cell_trigger")).define("subscribe_cell_trigger", ["deploy","sha256_b64","db"], _subscribe_cell_trigger);
  main.variable(observer("unsubscribe_cell_trigger")).define("unsubscribe_cell_trigger", ["deploy","db"], _unsubscribe_cell_trigger);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("sha256_b64")).define("sha256_b64", _sha256_b64);
  main.variable(observer("generateId")).define("generateId", _generateId);
  main.variable(observer("generateKeyPair")).define("generateKeyPair", ["generateId","sha256_b64","db"], _generateKeyPair);
  main.variable(observer("testAPIKey")).define("testAPIKey", ["deploy","sha256_b64","db"], _testAPIKey);
  main.variable(observer("db")).define("db", ["firebase"], _db);
  main.variable(observer("notebookID")).define("notebookID", ["getContext"], _notebookID);
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.import("getContext", child2);
  const child3 = runtime.module(define3);
  main.import("firebase", child3);
  main.import("DocView", child3);
  const child4 = runtime.module(define4);
  main.import("copy", "clipboard", child4);
  const child5 = runtime.module(define5);
  main.import("footer", child5);
  main.variable(observer()).define(["footer"], _27);
  return main;
}
