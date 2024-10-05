// https://observablehq.com/@tomlarkworthy/access-aws@321
import define1 from "./dff1e917c89f5e76@1964.js";
import define2 from "./c7a3b20cec5d4dd9@725.js";

async function _1(md,FileAttachment){return(
md`# AWS Serverless Notebooks Simplified

![AWS footguns](${await FileAttachment("AWS.jpg").url()})

Leaving the glorious comfort of an _Observable_ notebook in order to write a _lambda_ is not very fun. Here we cut out the _API Gateway_ and _Lambda_ wrapper boilerplate in Mike's [Serverless Notebook](https://observablehq.com/@observablehq/introduction-to-serverless-notebooks) and replace with _Observable_ hosted code instead.

[Secret](https://observablehq.com/@tomlarkworthy/secret-manager) AWS credentials can be injected into [serverside cells](https://observablehq.com/@tomlarkworthy/serverside-cells) enabling us to access the AWS universe in native Observable code, without credentials being exposed to end users. If you are ok with the credentails being exposed to a password holder, there is an even [simpler way](https://observablehq.com/@endpointservices/notebook-secret).

In this tutorial I will demonstrate accessing a private s3 bucket, but of course, it could be any AWS service. 

There is different way of getting AWS connected explored here as well https://observablehq.com/@tomlarkworthy/aws-serverless-password
`
)}

async function _2(md,FileAttachment){return(
md`
## Create AWS Resource
![create AWS bucket](${await FileAttachment("image.png").url()})`
)}

async function _3(md,FileAttachment){return(
md`
## Create IAM user
![create AWS bucket](${await FileAttachment("image@1.png").url()})

Make note of user credentials 

![create AWS bucket](${await FileAttachment("image@2.png").url()})
`
)}

function _4(md){return(
md`
## Create IAM Policy

~~~
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "s3:PutObject",
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Resource": [
                "arn:aws:s3:::tomlarkworthy-access-aws/*"
            ]
        }
    ]
}
~~~
`
)}

async function _5(md,FileAttachment){return(
md`### Attach policy to IAM user

![Attach policy](${await FileAttachment("image@3.png").url()})

`
)}

function _6(md){return(
md`# Create Application in Observable
AWS SDK is very easy to import to Observable
`
)}

function _AWS(require){return(
require('https://sdk.amazonaws.com/js/aws-sdk-2.799.0.min.js').then(_ => window['AWS'])
)}

function _8(md){return(
md`Write the application like an express controller, for more advanced route handling use https://observablehq.com/@tomlarkworthy/api-hosting-with-express`
)}

function _handler(AWS,parseCreds){return(
async (req, res, context) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, OPTIONS");
  if (req.method === 'OPTIONS') res.status(200).end(); // Get CORS preflights ACKed ASAP
  
  // Fetch secrets from context
  const aws_creds = context.secrets['tomlarkworthy_aws'];
  AWS.config.credentials = new AWS.ChainableTemporaryCredentials({
    masterCredentials: parseCreds(aws_creds)
  });
  
  // A very simple API, GET returns a bucket file, PUT sets one.
  const key = req.url.substring(1); // URL has "/" prefix which AWS Bucket keyspace does not
  if (req.method == "GET") {
    const s3res = await new AWS.S3().getObject({
      Bucket: 'tomlarkworthy-access-aws',
      Key: key
    }).promise().catch((err) => res.status(404).send(err.message))
    res.send(s3res.Body.toString('utf-8'))
  } else if (req.method == "PUT") {
    const s3res = await new AWS.S3().putObject({
      Bucket: 'tomlarkworthy-access-aws',
      Key: key,
      Body: req.body
    }).promise()
    res.end()
  } 
}
)}

function _parseCreds(){return(
function parseCreds(csv) {
  if (!csv) return undefined;
  const credsCSV = csv.split(",")
  return {
    accessKeyId: credsCSV[0],
    secretAccessKey: credsCSV[1]
  }
}
)}

function _11(md){return(
md`# Deploy Serverside Cell with Secret Injection

This create an encoded URL pointing to the notebook and cell. We declare which secrets are needed, in our case, AWS credentials. AWS credentials are written into the secret store using [Secret Manager](https://observablehq.com/@tomlarkworthy/secret-manager).
`
)}

function _endpoint(deploy,handler){return(
deploy("access-aws", handler, {
  secrets: ['tomlarkworthy_aws']
})
)}

function _14(md){return(
md `## Tests
Lets check it works and explain how to use the library using a reactive testing library.
`
)}

function _16($0){return(
$0
)}

function _17(suite,endpoint,expect){return(
suite.test("01: GET <random> 404s", async () => {
  const response = await fetch(endpoint.href + "/fdsfdfs"); 
  expect(response.status).toBe(404);
})
)}

function _18(suite,endpoint,expect){return(
suite.test("02: GET /access-aws/example.txt 200 and 'foo'", async () => {
  const response = await fetch(endpoint.href + "/access-aws/example.txt"); 
  expect(response.status).toBe(200);
  expect(await response.text()).toBe("foo");
})
)}

function _19(suite,endpoint,expect){return(
suite.test("03: PUT /test.txt 200", async () => {
  const response = await fetch(endpoint.href + "/access-aws/put.txt", {
    method: "PUT",
    body: "foo"
  }); 
  expect(response.status).toBe(200);
})
)}

function _20(suite,endpoint,expect){return(
suite.test("04: Read your writes", async () => {
  const data = Math.random() + "";
  
  await fetch(endpoint.href + "/access-aws/getput.txt", {
    method: "PUT",
    body: data
  });
  
  const response = await fetch(endpoint.href + "/access-aws/getput.txt"); 
  expect(response.status).toBe(200);
  expect(await response.text()).toBe(data);
})
)}

function _21(md){return(
md`# Securing user data (Firebase)

The endpoint is not really secure, anybody can read and write into it. 

To add a login and user based security have a look at the implementation of https://observablehq.com/@tomlarkworthy/secret-manager

- A login can be provided with [firebaseui](https://observablehq.com/@tomlarkworthy/firebase)
- The user token is extracted with user.getIdToken()
- Serverside verification of firebase login: [verifyIdToken](https://observablehq.com/@tomlarkworthy/verifyidtoken)
`
)}

function _22(md){return(
md`# Securing Access (Password) 

You can use Argon2 to encypt a password and store inside the notebook. For an example see 

https://observablehq.com/@tomlarkworthy/aws-serverless-password
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/d0d3745b9af967c9cc9697a4f571cb134b6c14e38c8a51c8fc4dd8e716dddded5e37917ef9f4081950b5cb1d17b688959ddd4632be998f307a8a3ddd1f4f0c29.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/eeaea20543c2b6393aabe0715a09a04eb8fd51bc3a94fc241a86cbf2e5312a2589bb0b91fd3bbed2b925a13ea7f9cf739113594816dd58bfa7f8fb0c4655f8cf.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@2.png", {url: new URL("./files/628d2d5488560dfd14cb4007a1925e95c632f2752487c8ca9615d9059bacf880c1d9caa347982c322d89c6f7e8efe03894cc63e4c82200e633c8c31643801673.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@3.png", {url: new URL("./files/5d0090a08ee102ddefdb0ae3ffef17f8b8bbff7a3b5f9ee65b7efea8856429e0a7b8b53ac10c3dfc23b9d31ecf54d7aaaccf3c5196e44f0525a6380fe8070fd9.png", import.meta.url), mimeType: "image/png", toString}],
    ["AWS.jpg", {url: new URL("./files/744c74358c1c96e1b78cb1518ee64749c648e2fdc0e0a3fed35462f01090003093297aee57d65019da998ef583bebabc6ffb742a5133fa8bdf04921c4e2b800c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","FileAttachment"], _1);
  main.variable(observer()).define(["md","FileAttachment"], _2);
  main.variable(observer()).define(["md","FileAttachment"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md","FileAttachment"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("AWS")).define("AWS", ["require"], _AWS);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("handler")).define("handler", ["AWS","parseCreds"], _handler);
  main.variable(observer("parseCreds")).define("parseCreds", _parseCreds);
  main.variable(observer()).define(["md"], _11);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  main.variable(observer("endpoint")).define("endpoint", ["deploy","handler"], _endpoint);
  main.variable(observer()).define(["md"], _14);
  const child2 = runtime.module(define2);
  main.import("viewof suite", child2);
  main.import("suite", child2);
  main.import("expect", child2);
  main.variable(observer()).define(["viewof suite"], _16);
  main.variable(observer()).define(["suite","endpoint","expect"], _17);
  main.variable(observer()).define(["suite","endpoint","expect"], _18);
  main.variable(observer()).define(["suite","endpoint","expect"], _19);
  main.variable(observer()).define(["suite","endpoint","expect"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  return main;
}
