// https://observablehq.com/@tomlarkworthy/google-vs-trick@1506
import define1 from "./b5172ba044a84c1e@665.js";
import define2 from "./18498b485712f206@114.js";
import define3 from "./0e0b35a92c819d94@444.js";
import define4 from "./048a17a165be198d@264.js";
import define5 from "./3d321b3f7d398726@462.js";
import define6 from "./027541187c96745d@147.js";
import define7 from "./f92778131fd76559@1174.js";
import define8 from "./bb2055d580bbbab2@106.js";
import define9 from "./293899bef371e135@293.js";

function _1(md){return(
md`# The Google 'VS' trick

Outsource tedious research to the hive mind. This tool implements the [Google Search 'VS' trick](https://medium.com/applied-data-science/the-google-vs-trick-618c8fd5359f) to find common alternatives to things. Starting with a term like 'Poodle', we ask Google for search suggestions of 'Poodle VS' which will find alternatives to poodles that people often consider on the internet. This can be used to perform basic market research (e.g. find me React alternatives), medicine (find me ibuprofen alternatives) and product choices (Peloton alternatives) it will even find you choices for philosophical schools-of-thought!`
)}

function _2(FileAttachment){return(
FileAttachment("egograph.png").image({ style: "max-width: 640px" })
)}

async function _3(FileAttachment,md){return(
md`## What this does

Andriy Burkov noticed that by appending 'vs' to a google query, google will helpfully autosuggest alternatives to the thing ([linkedIn.com](https://www.linkedin.com/posts/andriyburkov_this-simple-hack-will-save-you-a-ton-of-time-activity-6675799581655203840-1XuH/
)). 

![image@2.png](${await FileAttachment("image@2.png").url()})


David Foster realized that you could take those suggestions and apply to trick again to find more alternatives. When you repeatedly do this you can generate a nice graph which will span a topic area ([medium.com](https://medium.com/applied-data-science/the-google-vs-trick-618c8fd5359f)). David had some nice tricks for pruning the graph based on connectivity to try and keep the algorithm on topic. What was missing was an online tool for doing this.

So this tool implements David's algorithm but online. It follows the principles of moldable development, it is end user programmable, so if you want to explore your own ideas from expanding google auto-suggestions you can just [fork this notebook](https://observablehq.com/@observablehq/fork-suggest-merge).



`
)}

function _4(md){return(
md`## Login with a comment

This kind of tool could easily spam Google. I have enacted a login requirement to prevent that from happening. It is part of system to enforce result pooling across users.

So you need an Observable account and to leave a comment on this notebook to use the tool.

*also you can disable notifications in the notebook burger menu / settings*`
)}

function _user(createLogin){return(
createLogin()
)}

function _6(md){return(
md`### Save & load`
)}

function _7(htl,Inputs,downloadObjectAsJson,unvisited,distance,exclude,allEdges,links,initialTerm){return(
htl.html`<div style="display:flex;justify-content: flex-start;">${Inputs.button(
  "download graph",
  {
    reduce: () => {
      downloadObjectAsJson(
        {
          unvisited: [...unvisited],
          distance: [...distance.entries()],
          exclude: [...exclude],
          edges: allEdges,
          directed: false,
          links: links.map((l) => ({
            ...l,
            source: l.source.id,
            target: l.target.id
          })),
          nodes: [
            ...links.reduce((n, l) => {
              n.add(l.source);
              n.add(l.target);
              return n;
            }, new Set())
          ]
        },
        initialTerm
      );
    }
  }
)}
`
)}

function _upload(fileInput){return(
fileInput({
  prompt: "upload graph file to initialize"
})
)}

function _9(md){return(
md`## Controls

<details>
  <summary>control help</summary>${md`
  The UI controls below let you control the expansion of a topic. 
  
*reinitialize* - resets all state
  
*starting term* - the thing are we looking alternatives for. Put whatever you want to research in here!

*single term results only* - whether to ignore suggestions that have more than one word (*e.g.* redis pro). Normally not very useful but sometimes it can help prune the results set.

*max term fanout* - How many suggestions should we feedback each iteration? If you use a high number, the graph will find lots of very weakly related concepts. If you use a low number it with be very focussed on the target term and only on close alternatives. David Foster defaults to 5, I have needed high numbers to dial up the sensitivity.

*max distance* - How far from the starting term should we explore?

*min connectedness* - the number of disjoint pathways that must be present to a vertex to be included in the ego graph. This often has the effect of pruning topic confusions caused by synonyms. Note you can also manually prune vertices too if needed.

*auto run* - controls whether the algorithm is run a single step at a time or fully automatic. ⚠️ If you think your search has gone off the rails, untick this to halt the search!`}
</details>
`
)}

function _10(Inputs,reset){return(
Inputs.button("reset", {
  label: "reinitialize",
  reduce: reset
})
)}

function _initialTermRaw(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.text({
    minlength: 3,
    label: "Starting term",
    placeholder: "term, e.g. redis"
  }),
  localStorageView("topic_search_term")
)
)}

function _SINGLE_RESULTS_ONLY(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.toggle({
    label: "Single term results only"
  }),
  localStorageView("topic_search_singles", { json: true })
)
)}

function _MAX_RESULTS(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([1, 10], {
    label: "max term fanout",
    step: 1,
    value: 5
  }),
  localStorageView("topic_search_fanout", { defaultValue: 5, json: true})
)
)}

function _maxDistance(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([1, 200], { label: "max distance", step: 1, value: 5 }),
  localStorageView("topic_search_radius", {defaultValue: 5, json: true})
)
)}

function _k(Inputs,localStorageView){return(
Inputs.bind(
  Inputs.range([1, 2], {
    label: "min connectedness",
    step: 1,
    value: 2
  }),
  localStorageView("topic_search_connectedness", {
    defaultValue: 2
  })
)
)}

function _autoRun(user,Inputs,localStorageView){return(
user,
Inputs.bind(
  Inputs.toggle({ label: "auto run", value: false }),
  localStorageView("topic_search_autorun", {
    json: true
  })
)
)}

function _17(user,Inputs,autoRun,step){return(
user,
Inputs.button(autoRun ? "run" : "step", {
  label: "run algorithm",
  reduce: step
})
)}

function _18($0,md){return(
new Promise((resolve) =>
  setTimeout(
    () =>
      resolve(
        $0?.value?.uid
          ? md``
          : md`⚠️ you need to login to use this tool`
      ),
    1000
  )
)
)}

function _19(md){return(
md`### last edge expansion`
)}

function _20(Inputs,filteredSuggestions){return(
Inputs.table(filteredSuggestions)
)}

function _21(initialTerm,md){return(
md`## Ego Graph for ${initialTerm}`
)}

function _22($0){return(
$0
)}

function _23(visualization,Inputs,deleteVertex)
{
  if (visualization.selected)
    return Inputs.button("exclude selected vertex", {
      reduce: () => deleteVertex(visualization.selected.id)
    });
}


function _24(md){return(
md`### Nodes`
)}

function _results(Inputs,nodes){return(
Inputs.search(nodes)
)}

function _toDelete(epoch,Inputs,results){return(
epoch, Inputs.table(results, { sort: "depth" })
)}

function _27(toDelete,nodes,md,Inputs,deleteVertex){return(
toDelete.length == nodes.length
  ? md`*delete nodes by first selecting their hidden checkbox on the left*`
  : Inputs.button("exclude selected nodes", {
      reduce: () => {
        toDelete.forEach((del) => {
          deleteVertex(del.id);
        });
      }
    })
)}

function _allEdges(epoch,edges){return(
epoch,
[...edges.values()].reduce((acc, map) => acc.concat([...map.values()]), [])
)}

function _nodes(epoch,allEdges,distance,maxDistance){return(
epoch,
[
  ...allEdges.reduce((set, edge) => {
    set.add(edge.source);
    set.add(edge.target);
    return set;
  }, new Set())
]
  .map((n) => ({
    id: n,
    count: allEdges.reduce(
      (c, e) => c + (e.target === n ? 1 : 0) + (e.source === n ? 1 : 0),
      0
    ),
    depth: distance.get(n)
  }))
  .filter((d) => d.depth < maxDistance)
)}

function _linksRaw(epoch,allEdges,nodes,edgeDistance){return(
epoch,
allEdges
  .map((e) => ({
    ...e,
    source: nodes.find((n) => n.id === e.source),
    target: nodes.find((n) => n.id === e.target),
    distance: edgeDistance(e.source, e.target)
  }))
  .filter((l) => l.source && l.target)
)}

function _unidirectedLinks(linksRaw,edges){return(
linksRaw.filter((l) => {
  const source = l.source.id;
  const target = l.target.id;
  if (source < target) return true;
  else return !edges.get(`${target}->${source}`);
})
)}

function _adj(unidirectedLinks)
{
  const adj = new Map();
  unidirectedLinks.forEach((link) => {
    if (!adj.has(link.source.id)) adj.set(link.source.id, []);
    if (!adj.has(link.target.id)) adj.set(link.target.id, []);
    adj.get(link.source.id).push(link.target.id);
    adj.get(link.target.id).push(link.source.id);
  });

  return adj;
}


function _links(k,unidirectedLinks,articulationPoints,initialTerm,adj)
{
  if (k == 1) return unidirectedLinks;
  else if (k == 2) {
    // Do a quick DFS to the articulation points
    const articulations = articulationPoints(initialTerm, adj);
    const unvisisted = new Set([initialTerm]);
    const visited = new Set();
    while (unvisisted.size > 0) {
      const next = unvisisted.values().next().value;
      unvisisted.delete(next);
      visited.add(next);
      if (articulations.has(next) && next !== initialTerm) {
      } else {
        (adj.get(next) || [])
          .filter((v) => !visited.has(v))
          .forEach((v) => unvisisted.add(v));
      }
    }
    return unidirectedLinks.filter(
      (e) => visited.has(e.source.id) && visited.has(e.target.id)
    );
  } else {
    throw new Error();
  }
}


function _chartData(epoch,links){return(
epoch,
{
  directed: false,
  links: links.map((l) => ({ ...l, source: l.source.id, target: l.target.id })),
  nodes: [
    ...links.reduce((n, l) => {
      n.add(l.source);
      n.add(l.target);
      return n;
    }, new Set())
  ]
}
)}

function _36(md){return(
md`### algorithm state`
)}

function _version(Inputs){return(
Inputs.input(0)
)}

function _epoch(Inputs){return(
Inputs.input(0)
)}

function _initialTerm(initialTermRaw){return(
initialTermRaw.toLowerCase()
)}

function _unvisited(initialTerm){return(
new Set([initialTerm])
)}

function _distance(initialTerm){return(
new Map([[initialTerm, 0]])
)}

function _exclude(initialTerm){return(
initialTerm, new Set()
)}

function _edges(initialTerm){return(
initialTerm, new Map()
)}

function _edgeDistance(MAX_RESULTS,edges){return(
(u, v) =>
  (1 +
    2 * MAX_RESULTS -
    (edges.get(u)?.get(v)?.weight || 0) -
    (edges.get(v)?.get(u)?.weight || 0)) /
  (2 * MAX_RESULTS + 1)
)}

function _step(unvisited,stepDijkstra,edges,edgeDistance,exclude,initialTerm,suggestionsFromGoogle,distance,maxDistance,$0,Event,$1,$2){return(
async function step() {
  if (unvisited.size > 0) {
    console.log("step...");

    function findNearestUnvisited(v) {
      var current = stepDijkstra({
        seed: { id: v, distance: 0 },
        adjacent: (u) =>
          [...(edges.get(u)?.keys() || [])]
            .map((v) => ({
              id: v,
              distance: edgeDistance(u, v)
            }))
            .filter((e) => !exclude.has(e.id))
      });

      while (current.lastVertex && !unvisited.has(current.lastVertex.id)) {
        current = stepDijkstra(current);
      }
      return current.lastVertex?.id;
    }

    const u = findNearestUnvisited(initialTerm);

    unvisited.delete(u);

    const neighbours = await suggestionsFromGoogle({
      term: u
    });
    for (let edge of neighbours) {
      if (!edges.has(edge.source)) {
        edges.set(edge.source, new Map());
      }
      const outgoingEdges = edges.get(edge.source);

      let v = edge.target;
      outgoingEdges.set(v, {
        source: edge.source,
        target: edge.target,
        weight: edge.weight
      });
      const alt =
        distance.get(edge.source) + edgeDistance(edge.source, edge.target);

      if (distance.get(v) === undefined) {
        distance.set(v, alt);
        if (alt < maxDistance) unvisited.add(v);
      } else if (alt < distance.get(v)) {
        distance.set(v, alt);
      }
    }

    console.log("step: notify epoch");
    try {
      $0.value = $0.value + 1;
      $0.dispatchEvent(new Event("input", { bubbles: true }));
    } catch (err) {
      console.log(err);
    }

    if (unvisited.size == 0) {
      console.log("step: nearly ending, notify latest version");
      $1.value = $1.value + 1;
      $1.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      if ($2.value) {
        // continue
        setTimeout(step, 100);
      }
    }
  } else {
    console.log("step: ending, no unvisted nodes");
  }
}
)}

async function _uploadData(upload){return(
await upload.json()
)}

function _onUpload(unvisited,distance,edges,uploadData,exclude,$0,Event,$1)
{
  unvisited.clear();
  distance.clear();
  edges.clear();
  uploadData.unvisited.forEach((v) => unvisited.add(v));
  uploadData.exclude.forEach((v) => exclude.add(v));
  uploadData.distance.forEach(([k, v]) => distance.set(k, v));
  uploadData.edges.forEach((e) => {
    if (!edges.has(e.source)) edges.set(e.source, new Map());
    edges.get(e.source).set(e.target, e);
  });
  $0.value += 1;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
  $1.value += 1;
  $1.dispatchEvent(new Event("input", { bubbles: true }));

  return uploadData;
}


function _onPageLoadInitialTerm($0,Event)
{
  if (!window.didPageLoad && $0.value === undefined) {
    $0.value = "poodle";
    $0.dispatchEvent(new Event("input", { bubbles: true }));
  }
}


async function _onPageLoad($0,FileAttachment,exclude,unvisited,distance,edges,$1,Event,$2)
{
  if (!window.didPageLoad && $0.value === "poodle") {
    window.didPageLoad = true;
    const data = await FileAttachment("poodle (7).json").json();
    data.exclude.forEach((v) => exclude.add(v));
    data.unvisited.forEach((v) => unvisited.add(v));
    data.distance.forEach(([k, v]) => distance.set(k, v));
    data.edges.forEach((e) => {
      if (!edges.has(e.source)) edges.set(e.source, new Map());
      edges.get(e.source).set(e.target, e);
    });
    $1.value += 1;
    $1.dispatchEvent(new Event("input", { bubbles: true }));
    $2.value += 1;
    $2.dispatchEvent(new Event("input", { bubbles: true }));
    return data;
  }
}


function _reset(unvisited,distance,edges,initialTerm,$0,Event,$1){return(
() => {
  unvisited.clear();
  distance.clear();
  edges.clear();
  unvisited.add(initialTerm);
  distance.set(initialTerm, 0);
  $0.value += 1;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
  $1.value += 1;
  $1.dispatchEvent(new Event("input", { bubbles: true }));
}
)}

function _52(allEdges){return(
allEdges
)}

function _53(allEdges){return(
allEdges.filter((e) => e.target === "loveramics")
)}

function _deleteVertex(allEdges,edges,exclude,$0,Event){return(
(id) => {
  const edgesToDelete = allEdges.filter(
    (e) => e.source === id || e.target === id
  );
  edgesToDelete.forEach((e) => {
    if (e.source === id) edges.delete(id);
    if (e.target === id) {
      const outgoing = edges.get(e.source);
      if (outgoing) outgoing.delete(e.target);
    }
  });

  exclude.add(id);

  $0.value++;
  $0.dispatchEvent(new Event("input", { bubbles: true }));
}
)}

function _55(md){return(
md`### suggestqueries.google.com`
)}

function _defaultSuggestionsFilter(MAX_RESULTS,SINGLE_RESULTS_ONLY){return(
(suggestions, { term, seperator } = {}) => {
  term = term.toLowerCase();
  let w = MAX_RESULTS;
  return suggestions.reduce((suggestions, suggestion) => {
    if (
      suggestions.length < MAX_RESULTS &&
      suggestion.startsWith(term + " " + seperator + " ", "")
    ) {
      // Trim "term VS" repeated prefix
      suggestion = suggestion.replace(term + " " + seperator + " ", "");

      // If SINGLE_RESULTS_ONLY we check for a single term
      if (!SINGLE_RESULTS_ONLY || suggestion.split(" ").length === 1) {
        // There may be several alternatives (e.g. covid vs flu vs cold
        const alternatives = suggestion.split(` ${seperator} `);
        alternatives.forEach((alternative) => {
          suggestions.push({
            source: term,
            target: alternative,
            weight: w--
          });
        });
      }
    }
    return suggestions;
  }, []);
}
)}

function _57(md){return(
md`### *suggestionsFromGoogle({term, filter, seperator})*`
)}

function _suggestionsFromGoogle(defaultSuggestionsFilter,$0){return(
function ({
  term,
  filter = defaultSuggestionsFilter,
  seperator = "vs"
} = {}) {
  return $0.send({
    term,
    filter,
    seperator
  });
}
)}

function _suggestionsFromGoogleParams(flowQueue){return(
flowQueue({
  timeout_ms: 10000
})
)}

function _60(suggestionsFromGoogleParams){return(
suggestionsFromGoogleParams
)}

function _proxy(){return(
"https://europe-west1-endpointservice.cloudfunctions.net/proxy"
)}

function _url(proxy,suggestionsFromGoogleParams){return(
`${proxy}/suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=${encodeURIComponent(
  suggestionsFromGoogleParams.term + " " + suggestionsFromGoogleParams.seperator
)}`
)}

async function _googleResponse(url,user){return(
fetch(url, {
  headers: {
    Authorization: `Bearer ${await user.getIdToken()}`
  }
})
)}

async function _googleResponseBody(googleResponse,$0)
{
  if (googleResponse.status == 200) {
    return googleResponse.text();
  } else {
    const err = new Error(await googleResponse.text());
    $0.reject(err);
    throw err;
  }
}


function _googleResponseDoc(parser,googleResponseBody){return(
parser.parseFromString(googleResponseBody, "text/xml")
)}

function _unfilteredSuggestions(googleResponseDoc){return(
[
  ...googleResponseDoc.querySelectorAll("suggestion")
].map((e) => e.getAttribute("data"))
)}

function _filteredSuggestions(suggestionsFromGoogleParams,unfilteredSuggestions){return(
suggestionsFromGoogleParams.filter(
  unfilteredSuggestions,
  {
    term: suggestionsFromGoogleParams.term,
    seperator: suggestionsFromGoogleParams.seperator
  }
)
)}

function _68($0,filteredSuggestions){return(
$0.respond(filteredSuggestions)
)}

function _parser(DOMParser){return(
new DOMParser()
)}

function _70(md){return(
md`### Articulation Points

Articulation points are vertices that separate biconnected components.`
)}

function _articulationPoints(){return(
function articulationPoints(initialTerm, adj) {
  const visisted = new Set();
  const depth = new Map();
  const low = new Map();
  const parent = new Map();
  const articulations = new Set();

  function articulationPointsFn(i, d) {
    visisted.add(i);
    depth.set(i, d);
    low.set(i, d);
    var childCount = 0;
    var isArticulation = false;

    const adjacent = adj.get(i) || [];
    adjacent.forEach((ni) => {
      if (!visisted.has(ni)) {
        parent.set(ni, i);
        articulationPointsFn(ni, d + 1);
        childCount++;
        if (low.get(ni) >= depth.get(i)) isArticulation = true;
        low.set(i, Math.min(low.get(i), low.get(ni)));
      } else if (parent.get(i) !== ni) {
        low.set(i, Math.min(low.get(i), depth.get(ni)));
      }
    });

    if (
      (parent.get(i) !== undefined && isArticulation) ||
      (parent.get(i) === undefined && childCount > 1)
    ) {
      articulations.add(i);
    }
  }

  articulationPointsFn(initialTerm, 0);
  return articulations;
}
)}

function _72(md){return(
md`### Download As JSON`
)}

function _downloadObjectAsJson(){return(
function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
)}

function _74(md){return(
md`### Style`
)}

function _ns(Inputs){return(
Inputs.text().classList[0]
)}

function _76(ns,htl){return(
htl.html`<style>
  form.${ns} {
    width: inherit;
  }
</style>`
)}

function _77(md){return(
md`### Cache`
)}

function _85(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image@2.png", {url: new URL("./files/17ad1408bf1c54d4874bb9a2dcccb12109e06ba19a3982f788292b11cfbb4a8e612461bfac0c6cd412a5202f638d78a3edc1fd4cd19dbe20938f49dee65c9c44.png", import.meta.url), mimeType: "image/png", toString}],
    ["poodle (7).json", {url: new URL("./files/d35859fb70678f8eecea94791dc2f07a19fe255bf78809a814927a01948fd29e013d73245fadebb4da402baca166f7b13b99a9943e963f9eb4d2411a3ec1f2b7.json", import.meta.url), mimeType: "application/json", toString}],
    ["egograph.png", {url: new URL("./files/e03b974a2dcc8317f3b9eb2385cdf572a12641671b4adaeae7941bc6efdfcdc0df70899ce536de7a6bc39b33acd09f9d3f2d2725ae5238ac098cde74f6d223b8.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment"], _2);
  main.variable(observer()).define(["FileAttachment","md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof user")).define("viewof user", ["createLogin"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["htl","Inputs","downloadObjectAsJson","unvisited","distance","exclude","allEdges","links","initialTerm"], _7);
  main.variable(observer("viewof upload")).define("viewof upload", ["fileInput"], _upload);
  main.variable(observer("upload")).define("upload", ["Generators", "viewof upload"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Inputs","reset"], _10);
  main.variable(observer("viewof initialTermRaw")).define("viewof initialTermRaw", ["Inputs","localStorageView"], _initialTermRaw);
  main.variable(observer("initialTermRaw")).define("initialTermRaw", ["Generators", "viewof initialTermRaw"], (G, _) => G.input(_));
  main.variable(observer("viewof SINGLE_RESULTS_ONLY")).define("viewof SINGLE_RESULTS_ONLY", ["Inputs","localStorageView"], _SINGLE_RESULTS_ONLY);
  main.variable(observer("SINGLE_RESULTS_ONLY")).define("SINGLE_RESULTS_ONLY", ["Generators", "viewof SINGLE_RESULTS_ONLY"], (G, _) => G.input(_));
  main.variable(observer("viewof MAX_RESULTS")).define("viewof MAX_RESULTS", ["Inputs","localStorageView"], _MAX_RESULTS);
  main.variable(observer("MAX_RESULTS")).define("MAX_RESULTS", ["Generators", "viewof MAX_RESULTS"], (G, _) => G.input(_));
  main.variable(observer("viewof maxDistance")).define("viewof maxDistance", ["Inputs","localStorageView"], _maxDistance);
  main.variable(observer("maxDistance")).define("maxDistance", ["Generators", "viewof maxDistance"], (G, _) => G.input(_));
  main.variable(observer("viewof k")).define("viewof k", ["Inputs","localStorageView"], _k);
  main.variable(observer("k")).define("k", ["Generators", "viewof k"], (G, _) => G.input(_));
  main.variable(observer("viewof autoRun")).define("viewof autoRun", ["user","Inputs","localStorageView"], _autoRun);
  main.variable(observer("autoRun")).define("autoRun", ["Generators", "viewof autoRun"], (G, _) => G.input(_));
  main.variable(observer()).define(["user","Inputs","autoRun","step"], _17);
  main.variable(observer()).define(["viewof user","md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["Inputs","filteredSuggestions"], _20);
  main.variable(observer()).define(["initialTerm","md"], _21);
  main.variable(observer()).define(["viewof visualization"], _22);
  main.variable(observer()).define(["visualization","Inputs","deleteVertex"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("viewof results")).define("viewof results", ["Inputs","nodes"], _results);
  main.variable(observer("results")).define("results", ["Generators", "viewof results"], (G, _) => G.input(_));
  main.variable(observer("viewof toDelete")).define("viewof toDelete", ["epoch","Inputs","results"], _toDelete);
  main.variable(observer("toDelete")).define("toDelete", ["Generators", "viewof toDelete"], (G, _) => G.input(_));
  main.variable(observer()).define(["toDelete","nodes","md","Inputs","deleteVertex"], _27);
  main.variable(observer("allEdges")).define("allEdges", ["epoch","edges"], _allEdges);
  main.variable(observer("nodes")).define("nodes", ["epoch","allEdges","distance","maxDistance"], _nodes);
  main.variable(observer("linksRaw")).define("linksRaw", ["epoch","allEdges","nodes","edgeDistance"], _linksRaw);
  main.variable(observer("unidirectedLinks")).define("unidirectedLinks", ["linksRaw","edges"], _unidirectedLinks);
  main.variable(observer("adj")).define("adj", ["unidirectedLinks"], _adj);
  main.variable(observer("links")).define("links", ["k","unidirectedLinks","articulationPoints","initialTerm","adj"], _links);
  main.variable(observer("chartData")).define("chartData", ["epoch","links"], _chartData);
  const child1 = runtime.module(define1).derive([{name: "chartData", alias: "data"}], main);
  main.import("viewof visualization", child1);
  main.import("visualization", child1);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("viewof version")).define("viewof version", ["Inputs"], _version);
  main.variable(observer("version")).define("version", ["Generators", "viewof version"], (G, _) => G.input(_));
  main.variable(observer("viewof epoch")).define("viewof epoch", ["Inputs"], _epoch);
  main.variable(observer("epoch")).define("epoch", ["Generators", "viewof epoch"], (G, _) => G.input(_));
  main.variable(observer("initialTerm")).define("initialTerm", ["initialTermRaw"], _initialTerm);
  main.variable(observer("unvisited")).define("unvisited", ["initialTerm"], _unvisited);
  main.variable(observer("distance")).define("distance", ["initialTerm"], _distance);
  main.variable(observer("exclude")).define("exclude", ["initialTerm"], _exclude);
  main.variable(observer("edges")).define("edges", ["initialTerm"], _edges);
  main.variable(observer("edgeDistance")).define("edgeDistance", ["MAX_RESULTS","edges"], _edgeDistance);
  const child2 = runtime.module(define2);
  main.import("step", "stepDijkstra", child2);
  main.variable(observer("step")).define("step", ["unvisited","stepDijkstra","edges","edgeDistance","exclude","initialTerm","suggestionsFromGoogle","distance","maxDistance","viewof epoch","Event","viewof version","viewof autoRun"], _step);
  main.variable(observer("uploadData")).define("uploadData", ["upload"], _uploadData);
  main.variable(observer("onUpload")).define("onUpload", ["unvisited","distance","edges","uploadData","exclude","viewof version","Event","viewof epoch"], _onUpload);
  main.variable(observer("onPageLoadInitialTerm")).define("onPageLoadInitialTerm", ["viewof initialTermRaw","Event"], _onPageLoadInitialTerm);
  main.variable(observer("onPageLoad")).define("onPageLoad", ["viewof initialTermRaw","FileAttachment","exclude","unvisited","distance","edges","viewof version","Event","viewof epoch"], _onPageLoad);
  main.variable(observer("reset")).define("reset", ["unvisited","distance","edges","initialTerm","viewof version","Event","viewof epoch"], _reset);
  main.variable(observer()).define(["allEdges"], _52);
  main.variable(observer()).define(["allEdges"], _53);
  main.variable(observer("deleteVertex")).define("deleteVertex", ["allEdges","edges","exclude","viewof epoch","Event"], _deleteVertex);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("defaultSuggestionsFilter")).define("defaultSuggestionsFilter", ["MAX_RESULTS","SINGLE_RESULTS_ONLY"], _defaultSuggestionsFilter);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("suggestionsFromGoogle")).define("suggestionsFromGoogle", ["defaultSuggestionsFilter","viewof suggestionsFromGoogleParams"], _suggestionsFromGoogle);
  main.variable(observer("viewof suggestionsFromGoogleParams")).define("viewof suggestionsFromGoogleParams", ["flowQueue"], _suggestionsFromGoogleParams);
  main.variable(observer("suggestionsFromGoogleParams")).define("suggestionsFromGoogleParams", ["Generators", "viewof suggestionsFromGoogleParams"], (G, _) => G.input(_));
  main.variable(observer()).define(["suggestionsFromGoogleParams"], _60);
  main.variable(observer("proxy")).define("proxy", _proxy);
  main.variable(observer("url")).define("url", ["proxy","suggestionsFromGoogleParams"], _url);
  main.variable(observer("googleResponse")).define("googleResponse", ["url","user"], _googleResponse);
  main.variable(observer("googleResponseBody")).define("googleResponseBody", ["googleResponse","viewof suggestionsFromGoogleParams"], _googleResponseBody);
  main.variable(observer("googleResponseDoc")).define("googleResponseDoc", ["parser","googleResponseBody"], _googleResponseDoc);
  main.variable(observer("unfilteredSuggestions")).define("unfilteredSuggestions", ["googleResponseDoc"], _unfilteredSuggestions);
  main.variable(observer("filteredSuggestions")).define("filteredSuggestions", ["suggestionsFromGoogleParams","unfilteredSuggestions"], _filteredSuggestions);
  main.variable(observer()).define(["viewof suggestionsFromGoogleParams","filteredSuggestions"], _68);
  main.variable(observer("parser")).define("parser", ["DOMParser"], _parser);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer("articulationPoints")).define("articulationPoints", _articulationPoints);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("downloadObjectAsJson")).define("downloadObjectAsJson", _downloadObjectAsJson);
  main.variable(observer()).define(["md"], _74);
  main.variable(observer("ns")).define("ns", ["Inputs"], _ns);
  main.variable(observer()).define(["ns","htl"], _76);
  main.variable(observer()).define(["md"], _77);
  const child3 = runtime.module(define3);
  main.import("flowQueue", child3);
  const child4 = runtime.module(define4);
  main.import("localStorageView", child4);
  const child5 = runtime.module(define5);
  main.import("fileInput", child5);
  const child6 = runtime.module(define6);
  main.import("createLogin", child6);
  const child7 = runtime.module(define7);
  main.import("view", child7);
  const child8 = runtime.module(define8);
  main.import("tweet", child8);
  const child9 = runtime.module(define9);
  main.import("footer", child9);
  main.variable(observer()).define(["footer"], _85);
  return main;
}
