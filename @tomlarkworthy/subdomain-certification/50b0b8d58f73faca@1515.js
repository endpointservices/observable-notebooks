// https://observablehq.com/@tomlarkworthy/subdomain-certification@1515
function _1(md){return(
md`
# Certify Subdomain Ownership 

A simple method is now available at https://observablehq.com/@endpointservices/certify-subdomain-ownership
`
)}

function _2(md){return(
md`make note of the uid, it will not transfer to the fork`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  return main;
}
