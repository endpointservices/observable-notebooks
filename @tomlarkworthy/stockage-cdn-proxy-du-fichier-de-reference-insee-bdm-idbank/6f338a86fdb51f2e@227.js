import define1 from "./ef672b935bd480fc@623.js";
import define2 from "./dff1e917c89f5e76@1964.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none">Stockage CDN/proxy du fichier de référence Insee BDM idbanks</h1><a href="https://observablehq.com/@ericmauviere/insee-bdm-sommaire">INSEE BDM</a> › 4 - Mise en cache</div>

# Stockage CDN/proxy du fichier de référence Insee BDM idbanks


`
)}

function _insee_csv_zipped(){return(
"https://www.insee.fr/fr/statistiques/fichier/2862759/2021_correspondance_idbank_dimension.zip"
)}

function _results(fetchp,insee_csv_zipped){return(
fetchp(insee_csv_zipped, {
  headers: {
    'x-requested-with': "observablehq.com" // Upstream blocks us without this, silly
  },
  responseHeaders: {
    'transfer-encoding': null, // Its trying to send them in a chunked reponse which is not working ATM
    'Cache-control': `public, max-age=${24 * 7 * 3600}` // We can cache at the proxy level now too!
  }
})
)}

function _content(results){return(
results.arrayBuffer()
)}

async function _unzip(jszip,content)
{
  const buf = await jszip.loadAsync(content);
  const file = Object.keys(buf.files)[0];
  return buf.file(file).async("string");
}


function _6(md){return(
md `Le lien suivant pointe vers la ressource extraite, mise en cache pour 1 semaine`
)}

function _7(deploy,unzip){return(
deploy("insee_bdm_idbanks_150521.csv", async (req, res) => {
  res.header("Cache-control", `public, max-age=${24 * 7 * 3600}`); //
  res.header("Content-Type", "text/plain");
  res.send(unzip);
})
)}

function _8(md){return(
md`---
_libraries_`
)}

function _jszip(require){return(
require("jszip@3/dist/jszip.min.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("insee_csv_zipped")).define("insee_csv_zipped", _insee_csv_zipped);
  main.variable(observer("results")).define("results", ["fetchp","insee_csv_zipped"], _results);
  main.variable(observer("content")).define("content", ["results"], _content);
  main.variable(observer("unzip")).define("unzip", ["jszip","content"], _unzip);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["deploy","unzip"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("jszip")).define("jszip", ["require"], _jszip);
  const child1 = runtime.module(define1);
  main.import("fetchp", child1);
  const child2 = runtime.module(define2);
  main.import("deploy", child2);
  return main;
}
