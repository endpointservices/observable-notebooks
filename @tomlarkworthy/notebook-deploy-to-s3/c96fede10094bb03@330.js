// https://observablehq.com/@tomlarkworthy/notebook-deploy-to-s3@330
import define1 from "./e2cca0a7645d62fa@764.js";
import define2 from "./048a17a165be198d@273.js";
import define3 from "./55bed46f68a80641@366.js";

function _1(md){return(
md`# Notebook Deploy to S3

Reads Notebook code (the tar.gz file from the "Download Code" feature), unpacks, and uploads the individual files to S3, guesses MIME type based on file extension and invalidates CloudFront cache if applicable.

For utility notebooks like this one, you can run them directly from AWS, For example, I uploaded *this* notebook to S3, see:-

http://tomlarkworthy-access-aws.s3-website.eu-central-1.amazonaws.com/notebooks/1/index.html

For access direct from a bucket, you will need to set you bucket up for public access and serving static websites. Con: only insecure HTTP access

https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html

The simplest way to get secure SSL access is to use a CloudFront dsitribution:

https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-https-requests-s3/

then you can access it with SSL through an auto provisioned domain:-

https://d3gckb7a9lekvd.cloudfront.net/notebooks/1/index.html

If you wish to automate this notebook, simply rewrite the config cells at import time (https://observablehq.com/@observablehq/introduction-to-imports). 
`
)}

function _notebookURL(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "URL of notebook",
    placeholder: "https://observablehq.com/@tomlarkworthy/notebook-deploy-to-s3"
  }),
  localStorageView(`deploy_to_s3_notebookURL`)
)
)}

function _notebook(notebookURL){return(
notebookURL.replace('https://observablehq.com/', '')
)}

function _cells(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "[Optional] cells (comma seperated)",
    placeholder: "viewof notebookURL, viewof cells"
  }),
  localStorageView(`deploy_to_s3_notebookURL`)
)
)}

function _s3Target(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "S3 bucket + path",
    placeholder: 'tomlarkworthy-access-aws/notebooks/1'
  }),
  localStorageView(`deploy_to_s3_s3target`)
)
)}

function _bucket(s3Target){return(
s3Target.split("/")[0]
)}

function _path(s3Target,bucket){return(
s3Target.substring(bucket.length).replace(/^\//, '')
)}

function _8($0){return(
$0
)}

function _9(saveCreds){return(
saveCreds
)}

function _API_KEY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "[Optional] Observablehq API key"
  }),
  localStorageView(`deploy_to_s3_apikey`)
)
)}

function _CLOUD_FRONT_DISTRIBUTION_ID(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "[Optional] Cloud Front distribution ID"
  }),
  localStorageView(`deploy_to_s3_cf_d_id`)
)
)}

function _INVALIDATION_PATH(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    width: "1vu",
    label: "[Optional] Cloud Front paths",
    placeholder: "/notebooks/1/index.*"
  }),
  localStorageView(`deploy_to_s3_cf_path`)
)
)}

function _indexHtml(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.textarea({
    width: "1vu",
    rows: 50,
    label: "[Optional] Optional index.html"
  }),
  localStorageView(`deploy_to_s3_index.html`)
)
)}

function _uploadButton(Inputs,notebook,API_KEY,$0,$1){return(
Inputs.button("Deploy", {
  reduce: async () => {
    const url = `https://api.observablehq.com/${notebook}.tgz?v=3${
      API_KEY.length > 0 ? `&api_key=${API_KEY}` : ""
    }`;
    const response = await fetch(url);
    if (response.status !== 200)
      throw new Error(`${response.status} ${await response.text()}`);
    $0.value = response.arrayBuffer();
    $1.value = false;
  }
})
)}

function _gzTarBytes(){return(
undefined
)}

async function _tarBytes(gzTarBytes,pako)
{
  const buffer = new Uint8Array(gzTarBytes);
  return await pako.ungzip(buffer);
}


async function _files(untar,tarBytes){return(
await untar(tarBytes.buffer)
)}

function _deployed(){return(
false
)}

function _19(md,files,index){return(
md`Current: ${files[index].name}`
)}

function _index(files){return(
files, 0
)}

function _currentFile(files,index){return(
files[index]
)}

async function _uploader(files,index,indexHtml,putObject,bucket,path,mimetypes,$0,CLOUD_FRONT_DISTRIBUTION_ID,createInvalidation,INVALIDATION_PATH,$1)
{
  // upload current file
  const filename = files[index].name.replace("./", "");
  if (filename === "index.html" && indexHtml.length > 0) {
    files[index].buffer = indexHtml; // Not really a buffer but putObject accepts both
  }
  await putObject(bucket, path + "/" + filename, files[index].buffer, {
    ContentType: mimetypes.contentType(filename)
  });

  if (index < files.length - 1) {
    // next file
    $0.value = $0.value + 1;
  } else {
    // done!
    // Invalidate cloud front cache if needed.
    if (CLOUD_FRONT_DISTRIBUTION_ID.length > 0) {
      await createInvalidation(CLOUD_FRONT_DISTRIBUTION_ID, [
        INVALIDATION_PATH
      ]);
    }
    $1.value = true;
  }
}


function _REGION(){return(
'eu-central-1'
)}

function _mimetypes(){return(
import('https://cdn.skypack.dev/mime-types@2.1.32?min')
)}

function _jszip(require){return(
require("jszip@3/dist/jszip.min.js")
)}

function _pako(require){return(
require('https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.es5.min.js')
)}

function _untar(require){return(
require('js-untar')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof notebookURL")).define("viewof notebookURL", ["Inputs","localStorageView"], _notebookURL);
  main.variable(observer("notebookURL")).define("notebookURL", ["Generators", "viewof notebookURL"], (G, _) => G.input(_));
  main.variable(observer("notebook")).define("notebook", ["notebookURL"], _notebook);
  main.variable(observer("viewof cells")).define("viewof cells", ["Inputs","localStorageView"], _cells);
  main.variable(observer("cells")).define("cells", ["Generators", "viewof cells"], (G, _) => G.input(_));
  main.variable(observer("viewof s3Target")).define("viewof s3Target", ["Inputs","localStorageView"], _s3Target);
  main.variable(observer("s3Target")).define("s3Target", ["Generators", "viewof s3Target"], (G, _) => G.input(_));
  main.variable(observer("bucket")).define("bucket", ["s3Target"], _bucket);
  main.variable(observer("path")).define("path", ["s3Target","bucket"], _path);
  main.variable(observer()).define(["viewof manualCredentials"], _8);
  main.variable(observer()).define(["saveCreds"], _9);
  main.variable(observer("viewof API_KEY")).define("viewof API_KEY", ["Inputs","localStorageView"], _API_KEY);
  main.variable(observer("API_KEY")).define("API_KEY", ["Generators", "viewof API_KEY"], (G, _) => G.input(_));
  main.variable(observer("viewof CLOUD_FRONT_DISTRIBUTION_ID")).define("viewof CLOUD_FRONT_DISTRIBUTION_ID", ["Inputs","localStorageView"], _CLOUD_FRONT_DISTRIBUTION_ID);
  main.variable(observer("CLOUD_FRONT_DISTRIBUTION_ID")).define("CLOUD_FRONT_DISTRIBUTION_ID", ["Generators", "viewof CLOUD_FRONT_DISTRIBUTION_ID"], (G, _) => G.input(_));
  main.variable(observer("viewof INVALIDATION_PATH")).define("viewof INVALIDATION_PATH", ["Inputs","localStorageView"], _INVALIDATION_PATH);
  main.variable(observer("INVALIDATION_PATH")).define("INVALIDATION_PATH", ["Generators", "viewof INVALIDATION_PATH"], (G, _) => G.input(_));
  main.variable(observer("viewof indexHtml")).define("viewof indexHtml", ["Inputs","localStorageView"], _indexHtml);
  main.variable(observer("indexHtml")).define("indexHtml", ["Generators", "viewof indexHtml"], (G, _) => G.input(_));
  main.variable(observer("viewof uploadButton")).define("viewof uploadButton", ["Inputs","notebook","API_KEY","mutable gzTarBytes","mutable deployed"], _uploadButton);
  main.variable(observer("uploadButton")).define("uploadButton", ["Generators", "viewof uploadButton"], (G, _) => G.input(_));
  main.define("initial gzTarBytes", _gzTarBytes);
  main.variable(observer("mutable gzTarBytes")).define("mutable gzTarBytes", ["Mutable", "initial gzTarBytes"], (M, _) => new M(_));
  main.variable(observer("gzTarBytes")).define("gzTarBytes", ["mutable gzTarBytes"], _ => _.generator);
  main.variable(observer("tarBytes")).define("tarBytes", ["gzTarBytes","pako"], _tarBytes);
  main.variable(observer("files")).define("files", ["untar","tarBytes"], _files);
  main.define("initial deployed", _deployed);
  main.variable(observer("mutable deployed")).define("mutable deployed", ["Mutable", "initial deployed"], (M, _) => new M(_));
  main.variable(observer("deployed")).define("deployed", ["mutable deployed"], _ => _.generator);
  main.variable(observer()).define(["md","files","index"], _19);
  main.define("initial index", ["files"], _index);
  main.variable(observer("mutable index")).define("mutable index", ["Mutable", "initial index"], (M, _) => new M(_));
  main.variable(observer("index")).define("index", ["mutable index"], _ => _.generator);
  main.variable(observer("currentFile")).define("currentFile", ["files","index"], _currentFile);
  main.variable(observer("uploader")).define("uploader", ["files","index","indexHtml","putObject","bucket","path","mimetypes","mutable index","CLOUD_FRONT_DISTRIBUTION_ID","createInvalidation","INVALIDATION_PATH","mutable deployed"], _uploader);
  main.variable(observer("REGION")).define("REGION", _REGION);
  const child1 = runtime.module(define1).derive(["REGION"], main);
  main.import("viewof manualCredentials", child1);
  main.import("manualCredentials", child1);
  main.import("saveCreds", child1);
  main.import("putObject", child1);
  main.import("createInvalidation", child1);
  const child2 = runtime.module(define2);
  main.import("localStorageView", child2);
  const child3 = runtime.module(define3);
  main.import("getMetadata", child3);
  main.variable(observer("mimetypes")).define("mimetypes", _mimetypes);
  main.variable(observer("jszip")).define("jszip", ["require"], _jszip);
  main.variable(observer("pako")).define("pako", ["require"], _pako);
  main.variable(observer("untar")).define("untar", ["require"], _untar);
  return main;
}
