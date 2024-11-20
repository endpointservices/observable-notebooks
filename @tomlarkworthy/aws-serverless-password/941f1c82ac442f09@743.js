import define1 from "./ac9e81d5836d07ba@261.js";
import define2 from "./6eda90668ae03044@836.js";
import define3 from "./c7a3b20cec5d4dd9@730.js";
import define4 from "./dfdb38d5580b5c35@347.js";

async function _1(md,FileAttachment){return(
md`# Password Secured Clientside AWS Notebook

In a [previous notebook](https://observablehq.com/@tomlarkworthy/access-aws) I secured AWS credentials behind a [serverside cell](https://observablehq.com/@tomlarkworthy/serverside-cells) proxy. This is good if you do not want AWS credentials exposed to the notebook user and want full control over AWS API interactions. It would be a good way of building a product. However, its still quite a burden to develop as you have to write alot of boilerplate in the proxy layer. 

![Rake hitting me in the face](${await FileAttachment("myproxy.jpg").url()})

This _notebook removes the need for a proxy altogether_ by minting temporary credentials server-side to pass to the front end. This means the notebook connects to AWS directly running off short lived credentials. To prevent abuse the endpoint is password protected.

** Using Argon2 password hashing, we are able to store the password in the notebook itself **

The main benefits of this method is
- You can work with the AWS SDK in the local browser
- Notebooks can be forked and still work, even unpublished, as long as credentials are fetched from a published original
- Master credentials are still hidden
- If there was token leak it would only have limited time to be exploited

There are some drawbacks
- Only works if AWS endpoints have CORS
- Can only be used in a freindly environment
- You lose fine grained control over what the user can do within an API.

This suits sole programmer wanting to experiment with AWS with low friction. There is an even simpler way by encrypting the [secret in the front end](https://observablehq.com/@endpointservices/notebook-secret).
`
)}

function _2(md){return(
md`### The default build of the AWS Browser SDK`
)}

function _AWS(require){return(
require('https://sdk.amazonaws.com/js/aws-sdk-2.799.0.min.js').then(_ => window['AWS'])
)}

function _4(md){return(
md`### The Argon2i password hashing algorithm
we hide the password in plain sight.`
)}

function _stored_password(){return(
"44dd7cab46f45921e05c4bcd92593f140918726463fcb00e"
)}

function _salt(){return(
"Gtoc2Rhc2s"
)}

function _8(md){return(
md`User must supply a password in memory that hashes to the stored version. For the sake of a demo, **the password for this notebook is _qwerty_**.`
)}

function _password(html){return(
html`<input placeholder="enter password">`
)}

function _10(suite,expect,testAWSAPICallResponse){return(
suite.test("Can use the AWS API based on user supplied password", () => {
  expect(testAWSAPICallResponse.Body.toString()).toBe("foo")
})
)}

function _11(md){return(
md`### Hashing algorithm`
)}

function _encode(argon2){return(
async (password, salt) => (await argon2.hash({
  pass: password, 
  salt: salt,
  time: 10, // rounds
  mem: 1024, // used memory, in KiB
  type: argon2.ArgonType.Argon2i // OWASP recommendation
})).hashHex
)}

function _13(md){return(
md`## Implementation`
)}

function _14(md){return(
md`### Serverside temporary credential generator

- Matches password sent in header to stored one in notebook
- returns temporary credentials if password matches`
)}

function _credential_generator(encode,salt,stored_password,AWS){return(
async (req, res, context) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === 'OPTIONS') res.status(200).end(); // Get CORS preflights ACKed ASAP
  
  // Password check
  if (await encode(req.headers['authorization'], salt) !== stored_password) {
    res.status(403).end()
  }
  
  // Fetch master AWS secrets from secret store. In the form "<CLIENT>,<SECRET>"
  const aws_creds = context.secrets['tomlarkworthy_aws'].split(",");
  AWS.config.credentials = new AWS.ChainableTemporaryCredentials({
    masterCredentials: {
      accessKeyId: aws_creds[0],
      secretAccessKey: aws_creds[1]
    }
  });
  
  // Request a fresh token and return derived temporary credentials
  await AWS.config.credentials.refreshPromise()
  res.json({
    accessKeyId: AWS.config.credentials.accessKeyId,
    secretAccessKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken
  });
}
)}

function _16(md){return(
md`## Deploy Token Generator
Access to master credentials is acheived with [secret injection](https://observablehq.com/@tomlarkworthy/secret-manager) 
`
)}

function _credentials(deploy,credential_generator){return(
deploy("credentials", credential_generator, {
  secrets: ["tomlarkworthy_aws"] // Here is how master creds are injected
})
)}

function _19(md){return(
md`## Automatic CredFetcher using user supplied password
We can wrap our token generating endpoint as a custom credential supplier for the AWS SDK, so it automatically refreshes.

We place the endpoint url in a new variable, so that if someone forks this notebook, they still point to the original. Anybody can fork this notbook and work on it, as long as they know the password (_qwerty_ in this case).
`
)}

function _credentials_copy(){return(
'https://endpointservice.web.app/notebooks/@tomlarkworthy/aws-serverless-password/deployments/credentials/secrets/tomlarkworthy_aws'
)}

function _CredFetcher(AWS,credentials,password){return(
class CredFetcher extends AWS.Credentials {
  constructor() {
    super();
    this.expired = true;
  }
  needsRefresh() {
    return this.expired || Date() - this.lastRefresh > 15 * 60 * 1000; // Refresh every 15 mins
  }
  refresh(callback) {
    const self = this;
    fetch(credentials.href, {
      headers: { authorization: password } // User supplied password
    })
      .then((r) => r.json())
      .then((creds) => {
        this.accessKeyId = creds.accessKeyId;
        this.secretAccessKey = creds.secretAccessKey;
        this.sessionToken = creds.sessionToken;
        this.lastRefresh = Date();
        this.expired = false;
        callback();
      })
      .catch((err) => callback(err));
  }
}
)}

function _assign_creds(AWS,CredFetcher)
{
  AWS.config.credentials = new CredFetcher();
}


function _23(md){return(
md`## Check we can read bucket
Clientside and through the AWS API`
)}

function _24(md){return(
md`

AWS S3 SDK does not work until you enable a CORS policy in the bucket permissions

~~~js
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
~~~
`
)}

function _testAWSAPICallResponse(assign_creds,AWS)
{
  assign_creds; // Make sure we retry after loading creds
  return new AWS.S3()
    .getObject({
      Bucket: "tomlarkworthy-access-aws",
      Key: "access-aws/example.txt"
    })
    .promise();
}


function _26(suite,expect,testAWSAPICallResponse){return(
suite.test("00: GetObject returns file containing 'foo'", () => {
  expect(testAWSAPICallResponse.Body.toString()).toBe("foo")
})
)}

function _27(md){return(
md`# 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳 🥳`
)}

function _28(md){return(
md `## Other Tests
`
)}

function _suite(createSuite){return(
createSuite({
  timeout_ms: 10000
})
)}

function _31(suite,credentials,expect){return(
suite.test("01: GET with right password is 200", async () => {
  const response = await fetch(credentials.href, {
    headers: {
      "authorization": "qwerty"
    }
  });
  if (response.status !== 200) console.error(await response.text())
  expect(response.status).toBe(200);
})
)}

function _32(suite,credentials,expect){return(
suite.test("02: GET with wrong password is 403", async () => {
  const response = await fetch(credentials.href, {
    headers: {
      "authorization": "qwerty1"
    }
  });
  expect(response.status).toBe(403);
})
)}

function _34(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["myproxy.jpg", {url: new URL("./files/9f927ceb793adb5e9addba73279c4d4fce2f5c480233924f05f891fe94d237d4b6bef50ee512d4cb4b7001f2d485aa848b528a394c17f398a2236be9ff4b2ff5.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("AWS")).define("AWS", ["require"], _AWS);
  main.variable(observer()).define(["md"], _4);
  const child1 = runtime.module(define1);
  main.import("argon2", child1);
  main.variable(observer("stored_password")).define("stored_password", _stored_password);
  main.variable(observer("salt")).define("salt", _salt);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof password")).define("viewof password", ["html"], _password);
  main.variable(observer("password")).define("password", ["Generators", "viewof password"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","expect","testAWSAPICallResponse"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("encode")).define("encode", ["argon2"], _encode);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("credential_generator")).define("credential_generator", ["encode","salt","stored_password","AWS"], _credential_generator);
  main.variable(observer()).define(["md"], _16);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  main.variable(observer("credentials")).define("credentials", ["deploy","credential_generator"], _credentials);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("credentials_copy")).define("credentials_copy", _credentials_copy);
  main.variable(observer("CredFetcher")).define("CredFetcher", ["AWS","credentials","password"], _CredFetcher);
  main.variable(observer("assign_creds")).define("assign_creds", ["AWS","CredFetcher"], _assign_creds);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("testAWSAPICallResponse")).define("testAWSAPICallResponse", ["assign_creds","AWS"], _testAWSAPICallResponse);
  main.variable(observer()).define(["suite","expect","testAWSAPICallResponse"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  const child3 = runtime.module(define3);
  main.import("createSuite", child3);
  main.import("expect", child3);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer()).define(["suite","credentials","expect"], _31);
  main.variable(observer()).define(["suite","credentials","expect"], _32);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _34);
  return main;
}
