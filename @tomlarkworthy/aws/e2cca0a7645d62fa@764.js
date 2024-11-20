// https://observablehq.com/@tomlarkworthy/aws@764
import define1 from "./c7a3b20cec5d4dd9@730.js";
import define2 from "./316f0885d15ab671@69.js";
import define3 from "./9c498948145037d2@140.js";
import define4 from "./c2dae147641e012a@46.js";
import define5 from "./3d9d1394d858ca97@553.js";

function _1(md){return(
md`# AWS Helpers
`
)}

function _2(md){return(
md`

Store AWS credentials in local storage and call the AWS SDK. So far we have added IAM, S3 and CloudFront. If you need more SDK methods, create an web SDK distribution using https://sdk.amazonaws.com/builder/js/ 

~~~js
  import {
    iam, s3,
    viewof manualCredentials, saveCreds.
    listObjects, getObject, putObject,
    listGroups, listGroupsForUser, addUserToGroup, removeUserFromGroup
    listUsers, createUser, deleteUser, getUser,
    listAccessKeys, createAccessKey, deleteAccessKey,
    listUserTags, tagUser, untagUser
  } with {REGION as REGION} from '@tomlarkworthy/aws'
~~~

I am a big fan of using resource tagging to provide attribute based access control (ABAC), as an alternative to API Gateway. With IAM policies, you can add a tag to an s3 object, and a tag to a user account, and express that "only users with the matching tag can access the file". Using wildcards and StringLike expressions, you can tag a user account with all projects they can access, and let them create files only with a matching project prefix.

For example, the following AWS policy rule allows the authenticated IAM user (a.k.a. the Principle) to create a file with a "project" tag that matches one of the projects in their tag "projects" (space prefixed/suffixed/delimited) list.
~~~
{
    "Effect": "Allow",
    "Action": [
        "s3:putObjectTagging"
        "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::myBucket/*",
    "Condition": {
        "StringLike": {
            "aws:PrincipalTag/projects": "* \${s3:RequestObjectTag/project} *"
        }
    }
}
~~~

With the right IAM User Group policies and this AWS SDK wrapper you can build a quite powerful multi-tenancy file storage system without API gateway. Kinda like a Firebase Storage-lite. Don't underestimate tagging! For more info check out Amazon's documentation. 

https://docs.aws.amazon.com/AmazonS3/latest/userguide/tagging-and-policies.html

`
)}

async function _AWS(require,FileAttachment){return(
require(await FileAttachment("aws-sdk-2.983.0.min.js").url()).then(
  (_) => window["AWS"]
)
)}

function _4(md){return(
md`# Credentials

A credentials file can be used to derive *access_tokens* for SDK calls.
~~~js
{ 
  "accessKeyId": <YOUR_ACCESS_KEY_ID>,
  "secretAccessKey": <YOUR_SECRET_ACCESS_KEY>
}
~~~
`
)}

function _5(md){return(
md`## Input credentials

Not persisted or shared outside of your local network. Paste an unencrypted JSON of your credentials in the following box to authenticate.
`
)}

function _manualCredentials(localStorage,htl,Inputs)
{
  const existingCreds = localStorage.getItem(
    `AWS_CREDS_${btoa(htl.html`<a href>`.href.split("?")[0])}`
  );

  const control = Inputs.textarea({
    label: "Supply AWS credentials as JSON",
    rows: 6,
    minlength: 1,
    submit: true,
    value: existingCreds
  });

  const wrapped = htl.html`<div class="pmnuxzjxzr">
    <style>
      .pmnuxzjxzr > form > div > textarea {
        ${
          existingCreds
            ? `
                color: transparent;
                text-shadow: 0 0 4px rgba(0,0,0,0.5);
              `
            : null
        }
      }
    </style>
    ${control}`;
  Inputs.bind(wrapped, control);
  return wrapped;
}


function _saveCreds(htl,Inputs,localStorage,manualCredentials){return(
htl.html`<span style="display: flex">${Inputs.button(
  "Save creds to local storage",
  {
    reduce: () =>
      localStorage.setItem(
        `AWS_CREDS_${btoa(htl.html`<a href>`.href.split("?")[0])}`,
        manualCredentials
      )
  }
)} ${Inputs.button("Clear stored creds", {
  reduce: () =>
    localStorage.removeItem(
      `AWS_CREDS_${btoa(htl.html`<a href>`.href.split("?")[0])}`
    )
})}</span>`
)}

function _8(md){return(
md`## Credentials`
)}

function _credentials(Generators,$0,expect,invalidation){return(
Generators.observe(next => {
  const check = () => {
    const creds = $0.value;
    try {
      expect(creds).toBeDefined();
      const parsed = JSON.parse(creds);
      expect(parsed).toHaveProperty("accessKeyId");
      expect(parsed).toHaveProperty("secretAccessKey");
      next(parsed);
    } catch (err) {
      //next(err);
    }
  };

  $0.addEventListener('input', check);
  invalidation.then(() => {
    $0.removeEventListener('input', check);
  });
  check();
})
)}

function _10(md){return(
md`Use creds in SDK`
)}

function _login(AWS,credentials)
{
  AWS.config.credentials = credentials;
}


function _12(md){return(
md`# IAM`
)}

function _iam(login,AWS){return(
login || new AWS.IAM()
)}

function _14(md){return(
md`##### Users`
)}

function _listUsers(iam){return(
async () => {
  const response = await iam.listUsers().promise();
  return response.Users;
}
)}

function _createUser(iam){return(
async username => {
  const response = await iam
    .createUser({
      UserName: username
    })
    .promise();
  return response.User;
}
)}

function _deleteUser(iam){return(
async username => {
  const response = await iam
    .deleteUser({
      UserName: username
    })
    .promise();
}
)}

function _getUser(iam){return(
async username => {
  const response = await iam
    .getUser({
      ...(username && { UserName: username })
    })
    .promise();
  return response.User;
}
)}

function _19(md){return(
md`##### Access Keys`
)}

function _listAccessKeys(iam){return(
async username => {
  const response = await iam
    .listAccessKeys({
      UserName: username
    })
    .promise();
  return response.AccessKeyMetadata;
}
)}

function _createAccessKey(iam){return(
async username => {
  const response = await iam
    .createAccessKey({
      UserName: username
    })
    .promise();
  return response.AccessKey;
}
)}

function _deleteAccessKey(iam){return(
async (username, accessKeyId) => {
  const response = await iam
    .deleteAccessKey({
      UserName: username,
      AccessKeyId: accessKeyId
    })
    .promise();
}
)}

function _23(md){return(
md`##### User Tags`
)}

function _listUserTags(iam){return(
async username => {
  const response = await iam
    .listUserTags({
      UserName: username
    })
    .promise();
  return response.Tags.reduce(
    (acc, r) =>
      Object.defineProperty(acc, r.Key, { value: r.Value, enumerable: true }),
    {}
  );
}
)}

function _tagUser(iam){return(
async (username, tagDictionary) => {
  const response = await iam
    .tagUser({
      Tags: Object.entries(tagDictionary).map(e => ({
        Key: e[0],
        Value: e[1]
      })),
      UserName: username
    })
    .promise();
  return response.Tags;
}
)}

function _untagUser(iam){return(
async (username, keyArray) => {
  const response = await iam
    .untagUser({
      TagKeys: keyArray,
      UserName: username
    })
    .promise();
  return response.Tags;
}
)}

function _27(md){return(
md`##### IAM User groups`
)}

function _listGroups(iam){return(
async username => {
  const response = await iam.listGroups().promise();
  return response.Groups;
}
)}

function _listGroupsForUser(iam){return(
async username => {
  const response = await iam
    .listGroupsForUser({
      UserName: username
    })
    .promise();
  return response.Groups;
}
)}

function _addUserToGroup(iam){return(
async (username, group) => {
  return await iam
    .addUserToGroup({
      UserName: username,
      GroupName: group
    })
    .promise();
}
)}

function _removeUserFromGroup(iam){return(
async (username, group) => {
  return await iam
    .removeUserFromGroup({
      UserName: username,
      GroupName: group
    })
    .promise();
}
)}

function _32(md){return(
md`# S3

`
)}

function _33(md){return(
md`S3 service doesn't work until you set a region, and you cannot create buckets through the SDK, you have to set them up in the console first, but you can add and remove files from a pre-existing bucket`
)}

function _REGION(){return(
'us-east-2'
)}

function _s3(login,AWS,REGION){return(
login || new AWS.S3({ region: REGION })
)}

function _36(md){return(
md`### CORS

AWS S3 SDK does not work until you enable a CORS policy in the bucket permissions

~~~js
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
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

function _hasBucket(s3){return(
async function hasBucket(name) {
  return s3
    .getBucketLocation({
      Bucket: name
    })
    .promise()
    .then(() => true)
    .catch(err => false);
}
)}

function _listObjects(s3){return(
async function (bucket, prefix = undefined, options = {}) {
  const response = await s3
    .listObjectsV2({
      Bucket: bucket,
      Delimiter: "/",
      ...(prefix && { Prefix: prefix }),
      ...options
    })
    .promise();
  return response.CommonPrefixes;
}
)}

function _getObject(s3){return(
async (bucket, path) => {
  const response = await s3
    .getObject({
      Bucket: bucket,
      Key: path
    })
    .promise();
  return response.Body;
}
)}

function _putObject(s3){return(
async (bucket, path, value, options) => {
  const s3Options = { ...options };
  delete s3Options["tags"];
  return s3
    .putObject({
      Bucket: bucket,
      Key: path,
      Body: value,
      ...(options?.tags && {
        Tagging: Object.entries(options.tags)
          .map((e) => `${e[0]}=${e[1]}`)
          .join("&")
      }),
      ...s3Options
    })
    .promise();
}
)}

function _41(md){return(
md`# CloudFront

`
)}

function _cloudFront(login,AWS){return(
login || new AWS.CloudFront()
)}

function _createInvalidation(randomId,cloudFront){return(
(distributionId, paths = []) => {
  const operationId = randomId(16);
  return cloudFront
    .createInvalidation({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: operationId,
        Paths: {
          Quantity: paths.length,
          Items: paths
        }
      }
    })
    .promise();
}
)}

function _44(md){return(
md`---`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["aws-sdk-2.983.0.min.js", {url: new URL("./files/42a7af064086ea13afd59dd09481661f09943c6804c9569656218bc23bd70b7f7cf6681bda2ae79eba6ea147389fe57ae2e82788ff78a187ba3712ab8275ee14.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("AWS")).define("AWS", ["require","FileAttachment"], _AWS);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof manualCredentials")).define("viewof manualCredentials", ["localStorage","htl","Inputs"], _manualCredentials);
  main.variable(observer("manualCredentials")).define("manualCredentials", ["Generators", "viewof manualCredentials"], (G, _) => G.input(_));
  main.variable(observer("saveCreds")).define("saveCreds", ["htl","Inputs","localStorage","manualCredentials"], _saveCreds);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("credentials")).define("credentials", ["Generators","viewof manualCredentials","expect","invalidation"], _credentials);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("login")).define("login", ["AWS","credentials"], _login);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("iam")).define("iam", ["login","AWS"], _iam);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("listUsers")).define("listUsers", ["iam"], _listUsers);
  main.variable(observer("createUser")).define("createUser", ["iam"], _createUser);
  main.variable(observer("deleteUser")).define("deleteUser", ["iam"], _deleteUser);
  main.variable(observer("getUser")).define("getUser", ["iam"], _getUser);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("listAccessKeys")).define("listAccessKeys", ["iam"], _listAccessKeys);
  main.variable(observer("createAccessKey")).define("createAccessKey", ["iam"], _createAccessKey);
  main.variable(observer("deleteAccessKey")).define("deleteAccessKey", ["iam"], _deleteAccessKey);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("listUserTags")).define("listUserTags", ["iam"], _listUserTags);
  main.variable(observer("tagUser")).define("tagUser", ["iam"], _tagUser);
  main.variable(observer("untagUser")).define("untagUser", ["iam"], _untagUser);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("listGroups")).define("listGroups", ["iam"], _listGroups);
  main.variable(observer("listGroupsForUser")).define("listGroupsForUser", ["iam"], _listGroupsForUser);
  main.variable(observer("addUserToGroup")).define("addUserToGroup", ["iam"], _addUserToGroup);
  main.variable(observer("removeUserFromGroup")).define("removeUserFromGroup", ["iam"], _removeUserFromGroup);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("REGION")).define("REGION", _REGION);
  main.variable(observer("s3")).define("s3", ["login","AWS","REGION"], _s3);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("hasBucket")).define("hasBucket", ["s3"], _hasBucket);
  main.variable(observer("listObjects")).define("listObjects", ["s3"], _listObjects);
  main.variable(observer("getObject")).define("getObject", ["s3"], _getObject);
  main.variable(observer("putObject")).define("putObject", ["s3"], _putObject);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("cloudFront")).define("cloudFront", ["login","AWS"], _cloudFront);
  main.variable(observer("createInvalidation")).define("createInvalidation", ["randomId","cloudFront"], _createInvalidation);
  main.variable(observer()).define(["md"], _44);
  const child1 = runtime.module(define1);
  main.import("expect", child1);
  const child2 = runtime.module(define2);
  main.import("randomId", child2);
  const child3 = runtime.module(define3);
  main.import("resize", child3);
  const child4 = runtime.module(define4);
  main.import("localStorage", child4);
  const child5 = runtime.module(define5);
  main.import("signature", child5);
  return main;
}
