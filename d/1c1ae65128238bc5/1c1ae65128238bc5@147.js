import define1 from "./ef672b935bd480fc@623.js";

function _1(md){return(
md`# DNA Center API demo `
)}

function _url(Inputs){return(
Inputs.text({label: "DNAC Url", value: "https://sandboxdnac.cisco.com"})
)}

function _3(md){return(
md`# Base64`
)}

function _4(md){return(
md`When authenticating with the DNAC it expects a Base64 authenticaition token.

String composed of “Basic”, followed by a space, followed by the Base64 encoding of “username:password”, NOT including the quotes. For example “Basic YWRtaW46TWFnbGV2MTIz”, where YWRtaW46TWFnbGV2MTIz is the Base 64 encoding.`
)}

function _userpass(Inputs){return(
Inputs.text({label: "Username:Password", value: "devnetuser:Cisco123!"})
)}

function _authvar(userpass){return(
"Basic " +window.btoa(unescape(encodeURIComponent(userpass)))
)}

function _7(url){return(
url+ "/dna/system/api/v1/auth/token"
)}

async function _data(fetchp,url){return(
await fetchp(url + "/dna/system/api/v1/auth/token", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Basic ZGV2bmV0dXNlcjpDaXNjbzEyMyE="
  }
}).then((response) => {
  return response.text();
})
)}

function _token(Inputs){return(
Inputs.text({label: "API Token:"})
)}

function _10(md){return(
md`Look at this exaple: https://observablehq.com/@mbostock/posting-with-fetch`
)}

function _ALLOW_DOMAINS(){return(
["sandboxdnac.cisco.com"]
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof url")).define("viewof url", ["Inputs"], _url);
  main.variable(observer("url")).define("url", ["Generators", "viewof url"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof userpass")).define("viewof userpass", ["Inputs"], _userpass);
  main.variable(observer("userpass")).define("userpass", ["Generators", "viewof userpass"], (G, _) => G.input(_));
  main.variable(observer("authvar")).define("authvar", ["userpass"], _authvar);
  main.variable(observer()).define(["url"], _7);
  main.variable(observer("data")).define("data", ["fetchp","url"], _data);
  main.variable(observer("viewof token")).define("viewof token", ["Inputs"], _token);
  main.variable(observer("token")).define("token", ["Generators", "viewof token"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("ALLOW_DOMAINS")).define("ALLOW_DOMAINS", _ALLOW_DOMAINS);
  const child1 = runtime.module(define1).derive(["ALLOW_DOMAINS"], main);
  main.import("fetchp", child1);
  return main;
}
