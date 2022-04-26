// https://observablehq.com/@endpointservices/certify-subdomain-ownership@1592
import define1 from "./65d33fe44849cfde@586.js";
import define2 from "./698257e86fae4586@374.js";
import define3 from "./52d808b188b8672b@129.js";
import define4 from "./87deeb645328fb3b@223.js";
import define5 from "./dff1e917c89f5e76@1711.js";
import define6 from "./11a5ab8b1b3a51db@1161.js";
import define7 from "./c7a3b20cec5d4dd9@659.js";
import define8 from "./cb60908738c3dabe@152.js";
import define9 from "./ab3e70b29c480e6d@83.js";
import define10 from "./293899bef371e135@226.js";

function _1(md){return(
md`
# Certify Subdomain Ownership 

⚠️ DEPRECATED

<mark> We have simpler secure authentication mechnisms now, such as [Login with comment](/@endpointservices/login-with-comment). So this complex notebook is no required to use [secrets](/@endpointservices/secrets)!</mark>

Before you can set [serverside secrets](https://observablehq.com/@tomlarkworthy/secret-manager), access [logs](https://observablehq.com/@endpointservices/logs), or personalize your Open Cloud using [federated login](https://observablehq.com/@endpointservices/login), we need to figure out *securely* which _Observable_ domain you own, so we can grant you access to private data relating to that domain. 

We implement a challange based protocol inspired by [DNS-01 verification](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge). You prove control of a subdomain by writing a unique code into it, thus tangibly demonstrating you have write access.
`
)}

function _certified_domains(subdomain_certificates){return(
JSON.stringify(subdomain_certificates.reduce(
  (acc, cert) => {
    if (!acc.includes(cert.subdomain)) acc.push(cert.subdomain)
    return acc
  },
  []
))
)}

function _3(md){return(
md`## Step 1: Login to Endpointservices
`
)}

function _4($0){return(
$0
)}

function _5(md){return(
md`After logging in you have a uid, we will generate a secret code for you`
)}

function _endpoint_uid(user){return(
user.uid
)}

async function _challenge_code(challenge_implementation,relation)
{
  const response = await fetch(challenge_implementation.href, {
    method: "POST",
    body: JSON.stringify(relation)
  });
  if (response.status !== 200) throw new Error(response.status + ": " + await response.text())
  return await response.text()
}


async function _8(md,FileAttachment){return(
md`## Step 2: Create a new notebook

(very top right of page)
![](${await FileAttachment("image.png").url()})
`
)}

function _9(md){return(
md`## Step 3: Copy this certificate and paste it into a new notebook

Run it and follow its instruction.
`
)}

function _certificateTemplate(name){return(
(uid, code) => `
viewof endpoint_certificate = {
    const value = {
      uid: '${uid}',
      code: '${code}'
    };
    let ui;

    // If we are accessing this from another notebook we can return a value immediately
    if (window["request_certificate"]) {
      ui = html\`\`
      ui.value = value;
      yield ui;
      return ui;
    };

    // If the user has jsut pasted this into a notebook we want to wait until the notebook is published
    let author = null;
    // Mootari's getPinnedSlug https://observablehq.com/@mootari
    // https://observablehq.com/d/691ae3b95f02db79#getPinnedSlug
    async function getPinnedSlug({name = null, parseVersion = 'v1'} = {}) {
      const getLines = async (route, rtVersion, lines) => {
        return fetch(\`https://api.observablehq.com/\${route}.js?v=\${rtVersion}\`)
          .then(response => response.text())
          .catch(e => null)
          .then(t => t == null ? [] : t.split('\\n', lines + 1).slice(0, lines));
      }
      const parsers = {
        v1: route => getLines(route, 1, 4).then(ln => {
              const name = ln[0].slice('// URL: https://observablehq.com/'.length).replace(/^d\\//, '');
              const version = ln[3].slice('// Version: '.length);
              author = /\\(@([^)]*)\\)/.exec(ln[2])[1];
              return \`\\${name}@\${version}\`;
            }),
        v3: route => getLines(route, 3, 1).then(ln => {
              return ln[0].slice('// https://observablehq.com/'.length).replace(/^d\\//, '');
            }),
      };

      try {
        const route = name != null
          ? name.replace(/^(?!@)/, 'd/')
          : html\`<a href>\`.pathname.match(/^\\/(d\\/[a-f0-9]{16}|@[^\\/]+\\/[^@].*?)(?:$|\\/)/)[1];
        return parsers[parseVersion](route).catch(e => null);
      }
      catch(e) {
        return null;
      }  
    }

    const key = "published-e084898a9d18a9a2";
    await getPinnedSlug();
    // Wait loop
    while (author === null) {
      console.log("poll for published")
      const ui = html\`<b>Publish/link share notebook</b>\`
      yield ui;
      await getPinnedSlug();
      await new Promise(r => setTimeout(r, 5000)); // 5 second poll loop
    }

    // Once the notebook is published, offer a link to verify
    ui = html\`<div>
      <style>
        .certify-btn {
          display: inline-block;
          border-radius: 4px;
          background-color: hsl(171, 100%, 41%);
          color: #FFFFFF;
          text-align: center;
          font-size: 28px;
          padding: 20px;
          cursor: pointer;
          margin: 5px;
        }
        .certify-btn:hover {
          background: hsl(171, 100%, 46%);
        }
        .certify-btn:active {
          background: hsl(171, 100%, 41%);
          color: #FFF;
        }
      </style>
      <div id="cert-ui">
        <button class="certify-btn">
          Certify \${value.uid} owns \${author}
        </button>
      </div>
    </div>\`;
    ui.addEventListener("click", async () => {
      const ui = document.getElementById("cert-ui")
      ui.innerHTML = "Validating..."
      const response = await fetch("https://endpointservice.web.app/notebooks/@endpointservices/certify-subdomain-ownership/deployments/validation_implementation/secrets/endpointservices_secretadmin_service_account_key/cells/validation_implementation", {
        method: "POST",
        body: html\`<a href>\`.href
      });
      if (response.status == 200) {
        ui.innerHTML = "Thanks! " + await response.text()
      } else {
        ui.innerHTML = "Error: " + await response.text()
      }
      
    });
    ui.value = value
    yield ui;
  }
`
)}

function _11(copy,certificateTemplate,user,challenge_code,html)
{
  const click = () => {
    copy(certificateTemplate(user.uid, challenge_code))
    document.getElementById("copyCert").outerHTML = "Copied"
  }
  const ui = html`
<button id="copyCert" onclick=${click}> Copy certificate </button>
`
  return ui;
}


function _12(md){return(
md`## Step 4: Trigger validation

The certificate will serve a button in your new notebook. Pressing that button tells out validator to check for the secret challenge code. 

---

`
)}

function _13(md){return(
md`# Implementation
Certification is implementated using [serverside cells](https://observablehq.com/@tomlarkworthy/serverside-cells) containing a [secret](https://observablehq.com/@tomlarkworthy/secret-manager) Google Identity. It's plain Observable code you can inspect for transparency.

`
)}

function _14(md){return(
md`#### The challenge generates and records a secret code for a UID `
)}

function _challenge_implementation(deploy,getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,jsrsasign){return(
deploy("challenge_implementation", async (req, res, context) => {
  const access_token = await getAccessTokenFromServiceAccount(context.secrets["endpointservices_secretadmin_service_account_key"])
  
  // Signin as a public user
  await signinWithAccessToken(firebase, access_token);
  
  // Generate an unguessable challenge key using Crypto 
  const challenge = jsrsasign.KJUR.crypto.Util.getRandomHexOfNbytes(16); 
  const challangeContext = JSON.parse(req.body);
  
  // Record we made a challenge (the admin user is allowlisted to make the write, other users cannot)
  await firebase.firestore().collection("/services/ownership/challenges").add({
    uid: challangeContext.uid,
    time: firebase.firebase_.firestore.FieldValue.serverTimestamp(),
    challenge: challenge
  })
  
  // Tell the user the key
  res.send(challenge);
}, {
  secrets: ["endpointservices_secretadmin_service_account_key"],
  cell: "challenge_implementation"
})
)}

function _firestore(firebase){return(
firebase.firestore()
)}

function _fetchCode(regIdentifier,peekFirst){return(
function fetchCode(url) {
  const match = url.match(regIdentifier)
  
  const {id, user, slug, version} = match.groups,
        path = id ? `d/${id}` : `@${user}/${slug}`,
        suffix = version ? `@${version}` : '';
  
  window["request_certificate"] = true;
  return peekFirst({
    notebook: path,
    cell: "endpoint_certificate"
  });
}
)}

function _validation_implementation(deploy,getAccessTokenFromServiceAccount,signinWithAccessToken,firebase,fetchCode,fetchMeta){return(
deploy("validation_implementation", async (req, res, context) => {
  // Use a secret Google Service Account Key (JSON)
  const access_token = await getAccessTokenFromServiceAccount(context.secrets["endpointservices_secretadmin_service_account_key"])
  
  // Mint a JWT from it, exchange for access_token and signin as a public user
  await signinWithAccessToken(firebase, access_token);
      
  // The caller supplies the challenge context
  const url = req.body;
  
  console.log("url", url);
  
  const {
    uid,
    code
  } = await fetchCode(url);
  
  console.log("uid", uid, "code", code);
  
  const metadataPromise = fetchMeta(url)
  
  // Lookup a matching challenge record
  try {
    const matches = await firebase.firestore()
      .collection("/services/ownership/challenges")
      .where("challenge", '==', code)
      .where("uid", '==', uid)
      .orderBy("time", "desc").limit(1).get();
    
    console.log("matches", matches);

    if (matches.empty) {
        res.status(404).send("No matching challenge code found")
        return;
    }
    const match = matches.docs[0].data();

    // Check challenge is recent
    function timestamp2date(timestamp) {
        const date = new Date(0)
        date.setUTCSeconds(timestamp.seconds)
        return date; 
    }
    const age_millis = new Date() - timestamp2date(match.time)
    if (age_millis > 60 * 60 * 1000) { // > 1 hour
      res.status(400).send("Challenge stale")
      return;
    }

    const subdomain = (await metadataPromise).login;
    console.log("subdomain", subdomain);
    // OK ITS A FACT. Now we can record this in the ownership table
    await firebase.firestore().collection("/services/ownership/owners").doc(`${subdomain}|${match.uid}`).set({
      uid: match.uid,
      time: firebase.firebase_.firestore.FieldValue.serverTimestamp(),
      subdomain: subdomain
    })

    // Tell the user the key
    res.send(`${match.uid} owns ${subdomain} proved in ${url}`);
  } catch(err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }

}, {
  secrets: ["endpointservices_secretadmin_service_account_key"],
  cell: "validation_implementation"
})
)}

function _subdomain_certificates(listen,firebase,user){return(
listen(firebase.firestore().collection("/services/ownership/owners").where("uid", "==", user.uid))
)}

function _relation(user){return(
{
  "uid": user.uid
}
)}

function _31(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["image.png",new URL("./files/cf69b517437593b34a97ecf99c6a0677045fe92bf69bdbeb6a03e1087223074c642396c2b0815e1377da42b0aa022e99bd8f0f64d6c603f1b0cff4540fa2ac11",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("certified_domains")).define("certified_domains", ["subdomain_certificates"], _certified_domains);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["viewof user"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("endpoint_uid")).define("endpoint_uid", ["user"], _endpoint_uid);
  main.variable(observer("challenge_code")).define("challenge_code", ["challenge_implementation","relation"], _challenge_code);
  main.variable(observer()).define(["md","FileAttachment"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("certificateTemplate")).define("certificateTemplate", ["name"], _certificateTemplate);
  main.variable(observer()).define(["copy","certificateTemplate","user","challenge_code","html"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("challenge_implementation")).define("challenge_implementation", ["deploy","getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","jsrsasign"], _challenge_implementation);
  main.variable(observer("firestore")).define("firestore", ["firebase"], _firestore);
  main.variable(observer("fetchCode")).define("fetchCode", ["regIdentifier","peekFirst"], _fetchCode);
  main.variable(observer("validation_implementation")).define("validation_implementation", ["deploy","getAccessTokenFromServiceAccount","signinWithAccessToken","firebase","fetchCode","fetchMeta"], _validation_implementation);
  main.variable(observer("subdomain_certificates")).define("subdomain_certificates", ["listen","firebase","user"], _subdomain_certificates);
  main.variable(observer("relation")).define("relation", ["user"], _relation);
  const child1 = runtime.module(define1);
  main.import("peekFirst", child1);
  const child2 = runtime.module(define2);
  main.import("signinWithAccessToken", child2);
  main.import("getAccessTokenFromServiceAccount", child2);
  main.import("jsrsasign", child2);
  const child3 = runtime.module(define3);
  main.import("viewof user", child3);
  main.import("user", child3);
  main.import("firebase", child3);
  main.import("listen", child3);
  main.import("subdomain", child3);
  main.import("isOwner", child3);
  const child4 = runtime.module(define4);
  main.import("regIdentifier", child4);
  main.import("fetchMeta", child4);
  const child5 = runtime.module(define5);
  main.import("deploy", child5);
  const child6 = runtime.module(define6);
  main.import("html", child6);
  const child7 = runtime.module(define7);
  main.import("viewof suite", child7);
  main.import("suite", child7);
  main.import("expect", child7);
  const child8 = runtime.module(define8);
  main.import("encode", child8);
  main.import("decode", child8);
  const child9 = runtime.module(define9);
  main.import("copy", child9);
  const child10 = runtime.module(define10);
  main.import("footer", child10);
  main.variable(observer()).define(["footer"], _31);
  return main;
}
