// https://observablehq.com/@endpointservices/notebook-secret@503
import define1 from "./11a5ab8b1b3a51db@1160.js";
import define2 from "./a2e58f97fd5e8d7c@672.js";
import define3 from "./ab3e70b29c480e6d@83.js";
import define4 from "./58f3eb7334551ae6@187.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# How to password protect a Notebook secret

I sometimes wish to hide a secret in a public notebook, for example, a [service account to run billable cloud commands](https://observablehq.com/@endpointservices/cache-bigquery). This notebook provides functionality to generate a password-protected encrypted payload, which is safe to save in a public notebook.

~~~js
import {encrypt} from '@endpointservices/notebook-secret'
~~~

Also provided is a _decrypt_ UI control, which can read an encrypted payload and prompt the user for a password. If the correct password is provided the value resolves to the original secret. 

~~~js
import {decrypt} from '@endpointservices/notebook-secret'
~~~

This is allows the notebook author to run some privileged commands that other viewers cannot. If you want regular viewers also to be able to run privileged operations, consider using [serverless secrets](https://observablehq.com/@endpointservices/how-to-keep-an-api-key-secret-in-a-public-notebook) where the secret is never exposed to a client browser.

If you want to encode a secret for programatic use, use decode instead

~~~js
import {decode} from '@endpointservices/notebook-secret'
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Step 1, generate an encrypted payload

Configure the password and the secret
`
)});
  main.variable(observer("viewof pass")).define("viewof pass", ["html","Text"], function(html,Text){return(
html`${Text({"label":"Password"})}`
)});
  main.variable(observer("pass")).define("pass", ["Generators", "viewof pass"], (G, _) => G.input(_));
  main.variable(observer("viewof secret")).define("viewof secret", ["Textarea"], function(Textarea){return(
Textarea({label: "Secret", rows: 6})
)});
  main.variable(observer("secret")).define("secret", ["Generators", "viewof secret"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This generates a encrypted payload which is safe to put in a public place`
)});
  main.variable(observer("encrypt")).define("encrypt", ["deriveKey","enc","encode64"], function(deriveKey,enc,encode64){return(
async ({
  secret, password
} = {}) => {
  const salt = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const name = "AES-GCM";
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name, iv
    },
    key,
    enc.encode(secret)
  );
  return {
    name,
    salt: encode64(salt),
    iv: encode64(iv),
    ciphertext: encode64(ciphertext)
  };
}
)});
  main.variable(observer("encryptedSecret")).define("encryptedSecret", ["encrypt","pass","secret"], function(encrypt,pass,secret){return(
encrypt({
  password: pass,
  secret
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`You will probably need to pass this to the _decrypt_ function so you can click the following button to copy it to the clipboard`
)});
  main.variable(observer("toClipboard")).define("toClipboard", ["html","pbcopy","encryptedSecret"], function(html,pbcopy,encryptedSecret)
{
  const msg = html`Copy encrypted payload`;
  
  function click() {
    button.innerHTML = "copied!"
    pbcopy(JSON.stringify(encryptedSecret, null, 2));
    setTimeout(
      () => button.innerHTML = msg.outerHTML,
      1000
    )
  }
  const ui = html`<div>
    <button class="copy" onclick=${click}>${msg}</button>
  </div>`
  let button = ui.querySelector(".copy")
  
  return ui;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Step 2, create a _decrypt_ control

The _decrypt_ UI control takes an encrypted payload as an argument, and prompts the reader for a password. Only when the password is correct, the control can resolve a value which is the decrypted secret.

~~~js
viewof decryptedSecret = decrypt(<encrypted payload>)
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In the following example the password is "12345"`
)});
  main.variable(observer("viewof decryptedSecret")).define("viewof decryptedSecret", ["decrypt"], function(decrypt){return(
decrypt({
  "name": "AES-GCM",
  "salt": "R6IPpW0u06A+sObp",
  "iv": "8Qo+fJwwOUBz+UuU",
  "ciphertext": "D2Hw1RK41fNnYL3MEbJVSdjkQJK2BfjV4hYwavJqdjsbFl5G8QJQUANHri1hE2eLvADXrkFp8tRt7Yk="
})
)});
  main.variable(observer("decryptedSecret")).define("decryptedSecret", ["Generators", "viewof decryptedSecret"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","decryptedSecret"], function(html,decryptedSecret){return(
html`<a href=${decryptedSecret}>${decryptedSecret}</a>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Implementation Notes

We use "PBKDF2" to derive a high quality key from a low quality one like a user password.

We use "AES-GCM" to encrypt the secret payload, which is a notable for being an [authenticated encryption](https://en.wikipedia.org/wiki/Authenticated_encryption) algorithm that is available in the browser.

`
)});
  main.variable(observer("decrypt")).define("decrypt", ["decode","Event","html"], function(decode,Event,html){return(
function decrypt(encryptedSecret) {
  function input(evt) {
      evt.stopPropagation()
  }
  
  async function keypress(evt) {
    if (evt.keyCode === 13) {
      let decoded = new Promise(() => {})
      try {
        decoded = await decode(password.value, encryptedSecret)
        feedback.innerHTML = "";
      } catch (err) {
        console.error(err)
        feedback.innerHTML = "Please try again"
      }
      password.value = ""
      ui.value = decoded;
      ui.dispatchEvent(new Event('input'));
    }
  }
      
  let ui = html`<div>
    <div class="feedback"></div>
    <input class="password"
           type="password"
           placeholder="Enter your password"
           oninput=${input}
           onkeypress=${keypress} />
  </div>`
  
  let feedback = ui.querySelector(".feedback");
  let password = ui.querySelector(".password");

  ui.value = undefined
  return ui;
}
)});
  main.variable(observer("decode")).define("decode", ["deriveKey","decode64"], function(deriveKey,decode64){return(
async function decode(password, encryptedSecret) {
  if (typeof encryptedSecret === 'string') encryptedSecret = JSON.parse(encryptedSecret)
  const key = await deriveKey(password, decode64(encryptedSecret.salt));
  const secret = await window.crypto.subtle.decrypt(
    {
      name: encryptedSecret.name,
      iv: decode64(encryptedSecret.iv)
    },
    key,
    decode64(encryptedSecret.ciphertext)
  );
  return new TextDecoder().decode(secret)
}
)});
  main.variable(observer("deriveKey")).define("deriveKey", ["enc"], function(enc){return(
async (password, salt) => {
  const material = await window.crypto.subtle.importKey(
      "raw", 
      enc.encode(password), 
      {name: "PBKDF2"}, 
      false, 
      ["deriveBits", "deriveKey"]
    );
  return await window.crypto.subtle.deriveKey(
      {
        "name": "PBKDF2",
        salt: salt, 
        "iterations": 100000,
        "hash": "SHA-256"
      },
      material,
      { "name": "AES-GCM", "length": 256},
      true,
      [ "encrypt", "decrypt" ]
    );
}
)});
  main.variable(observer("enc")).define("enc", function(){return(
new TextEncoder()
)});
  main.variable(observer("encode64")).define("encode64", function(){return(
(buffer) => btoa(String.fromCharCode(...new Uint8Array(buffer)))
)});
  main.variable(observer("decode64")).define("decode64", function(){return(
(b64) => Uint8Array.from(atob(b64), c => c.charCodeAt(0))
)});
  const child1 = runtime.module(define1);
  main.import("html", child1);
  const child2 = runtime.module(define2);
  main.import("Textarea", child2);
  main.import("Text", child2);
  const child3 = runtime.module(define3);
  main.import("pbcopy", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], function(footer){return(
footer
)});
  return main;
}
