export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Notebook Metadata

Fork of [@mootari](/@mootari)'s wonderful [notebook-data](/@mootari/notebook-data). Mainly added the ability to supply an \`api_key\` option, but also stripped the version pinning stuff as thats not relevant to our use cases.`
)});
  main.variable(observer()).define(["metadata"], function(metadata){return(
metadata("@endpointservices/metadata")
)});
  main.variable(observer("formatLocalPath")).define("formatLocalPath", function(){return(
function formatLocalPath(name, version = null) {
  return '/' + (name.match(/^@/) ? name : 'd/' + name) + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatPath")).define("formatPath", ["domain","formatLocalPath"], function(domain,formatLocalPath){return(
function formatPath(name, version = null) {
  return `https://${domain}${formatLocalPath(name, version)}`;
}
)});
  main.variable(observer("formatSourcePath")).define("formatSourcePath", ["apiDomain","formatLocalPath"], function(apiDomain,formatLocalPath){return(
function formatSourcePath(name, version = null) {
  return `https://${apiDomain}${formatLocalPath(name, version)}.js`;
}
)});
  main.variable(observer("formatName")).define("formatName", function(){return(
function formatName(name, version = null) {
  return name + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatId")).define("formatId", function(){return(
function formatId(id, version = null) {
  return id + (version ? '@' + version : '');
}
)});
  main.variable(observer("formatComparePath")).define("formatComparePath", ["domain","formatId"], function(domain,formatId){return(
function formatComparePath(id1, version1, id2, version2) {
  return `https://${domain}/compare/${formatId(id1, version1)}...${formatId(id2, version2)}`;
}
)});
  main.variable(observer("getSource")).define("getSource", ["formatSourcePath"], function(formatSourcePath){return(
async function getSource(name, { version = null, api_key = undefined } = {}) {
  const path = formatSourcePath(name, version);
  try {
    const response = await fetch(
      path + (api_key ? `?api_key=${api_key}` : ""),
      {
        cache: version ? "default" : "no-cache"
      }
    );
    return await response.text();
  } catch (e) {
    return null;
  }
}
)});
  main.variable(observer("metadata")).define("metadata", ["getSource"], function(getSource){return(
async function metadata(name, { version = null, api_key = undefined } = {}) {
  name = name
    .replace("https://observablehq.com/", "")
    .split("#")[0]
    .split("?")[0];
  if (name.startsWith("d/")) name = name.replace("d/", "");
  const map = {
    URL: "url",
    Title: "title",
    Author: "author",
    Version: "version",
    "Runtime version": "runtimeVersion"
  };
  const source = await getSource(name, { version, api_key });
  if (!source) return null;

  const frontmatter = source.match(/^(?:\/\/ .+?\n)+/);
  const id = source.match(/^\s+?id:\s+?"([^@"]+)/m);
  if (!frontmatter || !id) return null;

  return frontmatter[0].split(/\n/).reduce(
    (data, s) => {
      const m = s.match(/^\/\/ ([^:]+?):\s+?(.+?)$/);
      if (m && map.hasOwnProperty(m[1])) data[map[m[1]]] = m[2];
      return data;
    },
    { id: id[1] }
  );
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer("domain")).define("domain", function(){return(
'observablehq.com'
)});
  main.variable(observer("apiDomain")).define("apiDomain", function(){return(
'api.observablehq.com'
)});
  return main;
}
