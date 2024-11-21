function _1(md){return(
md`# [aws4fetch](https://github.com/mhart/aws4fetch)
\`\`\`js
    import {AwsClient, AwsV4Signer} from '@tomlarkworthy/aws4fetch'
\`\`\``
)}

async function _aws4fetch(Response,FileAttachment,DecompressionStream)
{
  const response = await new Response(
    (
      await FileAttachment("aws4fetch.esm.js.gz").stream()
    ).pipeThrough(new DecompressionStream("gzip"))
  );

  const blob = await response.blob();
  const objectURL = URL.createObjectURL(
    new Blob([blob], { type: "application/javascript" })
  );

  try {
    return await import(objectURL);
  } finally {
    URL.revokeObjectURL(objectURL); // Ensure URL is revoked after import
  }
}


function _AwsClient(aws4fetch){return(
aws4fetch.AwsClient
)}

function _AwsV4Signer(aws4fetch){return(
aws4fetch.AwsV4Signer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["aws4fetch.esm.js.gz", {url: new URL("./files/88db69649c613d86850f47b297a8be24ed98e2b4e637500aa80d4c4d9f4b43348a9db90d92f0c176e7b93085dc25bc1095404ec3bf6c6614dc692fbb5ed0d45c.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("aws4fetch")).define("aws4fetch", ["Response","FileAttachment","DecompressionStream"], _aws4fetch);
  main.variable(observer("AwsClient")).define("AwsClient", ["aws4fetch"], _AwsClient);
  main.variable(observer("AwsV4Signer")).define("AwsV4Signer", ["aws4fetch"], _AwsV4Signer);
  return main;
}
