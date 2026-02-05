import define1 from "./55bed46f68a80641@366.js";
import define2 from "./ef672b935bd480fc@623.js";
import define3 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# 100 Beautiful and Informative Notebooks of 2021`
)}

function _2(top100,htl)
{
  const notebooks = top100
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return htl.html`<table width="100%">${Array.from({
    length: 10
  }).map(
    (__, j) =>
      htl.html.fragment`<tr style="border-bottom: none;">${Array.from({
        length: 10
      }).map((__, i) => {
        const notebook = notebooks[i + j * 10];
        return htl.html.fragment`<td style="padding: 0px">
            <a href=${notebook.url} target="_blank" >
              <img width="100%" src=${notebook.thumbnail}>`;
      })}</tr>`
  )}</table>`;
}


function _3(md){return(
md`It's the end of 2021, and I would like to reminisce about the amazing work that was produced on Observable over the last year. I have taken all the notebooks that were [trending](https://observablehq.com/trending) from the [Top Trending Notebook Twitter Bot](https://twitter.com/trendingnotebo2) and picked 100 good ones.

The broad categories apparent in 2021 were "dataviz, art, mathematics, maps, apps, development, design, tutorials and tools". Every notebook listed here is worth a read, but there is rather a lot so it might take you a few sessions!

OK, enough chat... here are my favorite notebooks of 2021, sorted into topics...`
)}

function _4(md,content){return(
md`${content}`
)}

function _content(notebooksByCatagory)
{
  const order = [
    "dataviz",
    "art",
    "math",
    "map",
    "app",
    "dev",
    "design",
    "tutorial",
    "tool"
  ];

  const sectionIntro = {
    dataviz: `## Dataviz
Observable is a digital community for data practitioners. In 2021 an enormous quantity of informative dataviz notebooks were produced, but here is some of the very best. Special shout out to [@karimdouieb](https://observablehq.com/@karimdouieb) who has been on fire using 3D graphics to visualize large datasets with great effect in works like [All the passes](https://observablehq.com/@karimdouieb/all-the-passes).
`,
    art: `## Digital and Generative Art
The Observable platform is great for iterating on visuals quickly. In 2021 there were many digital artists producing novel and interesting works, some of my top picks are shown below. Makio135's [Creative Coding](https://observablehq.com/@makio135/creative-coding) tutorial notebook on producing generative art on Observable remains a must-read for aspiring digital artists.
`,
    math: `## Mathematics
There is something about the reactive interactivity of Observable that makes it useful for intuition building. There is an avid group of mathmaticians on Observable producing engaging mathmatical teaching materials. Prof. [McClure
](https://observablehq.com/@mcmcclur) in particular has an [extensive set of notebooks](https://observablehq.com/@mcmcclur?tab=collections) to support his classes.
`,
    map: `## Maps
Maps are a specialised subset of dataviz dealing with realworld spatial data. Maps are a loved topic on Observable. In 2021 [@floledermann](https://observablehq.com/@floledermann) produced the [projection notebook](https://observablehq.com/@floledermann/projection-playground) to end all projection notebooks.
`,
    app: `## Apps
At its core, Observable is a front end development platform, and a few of the community have built fully fledged web applications.
`,
    dev: `## Development
Building complex applications on Observable requires all kinds of supporting libraries. A number of development notebooks stood out in 2021. Databases were a strong theme over the year, due to additional SQL support provided by the platform.
`,
    design: `## UI, UX and Web Design
Observble notebooks promote resuse. A number of useful components were developed which can be used in other Dataviz notebooks. [Mathieu Jouhet](https://observablehq.com/@daformat) wrote a stunning library + tutorial notebook on [Rounding polygon corners in SVG](https://observablehq.com/@daformat/rounding-polygon-corners)
`,
    tutorial: `## Tutorials
The Observable community likes to help others learn. There are tutorial notebooks dedicated to a wide variaty of topics. I write a lot about how to build applications on Observable, and a focus area for me in 2021 was [scaling UI development](https://observablehq.com/@tomlarkworthy/ui-development).
`,
    tool: `## Tools
The Observble community has built some impressive tooling to support data practitioners. The biggest news of the year was the introduction of [Plot](https://observablehq.com/@observablehq/introducing-observable-plot) by the [Observable](https://observablehq.com/@observablehq) team, which allows rapid production of informative charts.
`
  };

  let markdown = "";

  order.forEach((catagory) => {
    markdown += `\n${sectionIntro[catagory]}\n`;
    notebooksByCatagory.get(catagory).forEach((notebook) => {
      const author = /(@[^)]+)/.exec(notebook.author)[1];
      markdown += `### [${notebook.title}](${notebook.url}) by [${author}](https://observablehq.com/${author}) \n`;
      markdown += `<i>\n`;
      markdown += `\n[![](${notebook.thumbnail})](${notebook.url})\n`;
      markdown += `\n${notebook?.description || "No description provided"}\n`;
      markdown += `</i>\n`;
    });
    markdown += "\n---\n";
  });

  return markdown;
}


function _devmode(){return(
false
)}

function _7(md){return(
md`## Top 100 Labeled`
)}

function _notebooksByCatagory(d3,labelled100){return(
d3.group(labelled100, (d) => d.catagory)
)}

function _top100(d3,data){return(
d3
  .sort(data, (d) => -d.score)
  .slice(0, /*there were some dupes, d3 chart and TimeChart, color inputs*/ 103)
)}

function _labelled100(top100,catagoriesTop100){return(
top100
  .map((row, index) => ({
    ...row,
    catagory: catagoriesTop100[index]
  }))
  .filter((e) => e.catagory !== " ")
)}

function _catagoriesTop100(){return(
[
  "map",
  "dev",
  "map",
  "dataviz",
  "design",
  "math",
  "tool",
  "design",
  "tool",
  "dataviz",
  "map",
  "tool",
  "art",
  "design",
  "dataviz",
  "tool",
  "art",
  "design",
  "tutorial",
  "dev",
  "tool",
  " ",
  "design",
  "tutorial",
  "art",
  "map",
  "art",
  "tutorial",
  "tool",
  "dataviz",
  "design",
  " ",
  "map",
  "math",
  "map",
  "art",
  "art",
  "dataviz",
  "map",
  "design",
  "dev",
  "tool",
  "tutorial",
  "tool",
  "art",
  "dev",
  "art",
  "design",
  "dataviz",
  "dataviz",
  "art",
  "design",
  "dataviz",
  "map",
  "art",
  "art",
  "dataviz",
  "dev",
  "map",
  "tool",
  "map",
  "tool",
  "design",
  "dataviz",
  "design",
  " ",
  "dataviz",
  "map",
  "design",
  "map",
  "design",
  "art",
  "design",
  "art",
  "dataviz",
  "math",
  "dataviz",
  "design",
  "tutorial",
  "tool",
  "design",
  "dataviz",
  "map",
  "tool",
  "map",
  "map",
  "tutorial",
  "dev",
  "map",
  "design",
  "map",
  "math",
  "app",
  "design",
  "map",
  "math",
  "math",
  "design",
  "dataviz",
  "dataviz",
  "app",
  "design",
  "app"
]
)}

function _12(devmode,Inputs,labelled100,html,data){return(
devmode
  ? Inputs.table(labelled100, {
      columns: ["thumbnail", "url", "title", "author", "score", "catagory"],
      sort: "score",
      reverse: true,
      rows: 50,
      format: {
        thumbnail: (t) =>
          html`<a href=${
            data.find((d) => d.thumbnail === t)?.url
          } target=_blank><img width=100% src=${t}>`
      }
    })
  : undefined
)}

function _13(md){return(
md`## Combined Dataset`
)}

function _data(tweets,metadata,tags,likes,thumbnailURL){return(
tweets.map((t, index) => ({
  title: metadata[index]?.title,
  description: tags[index]?.description,
  twitter_like_count: t.like_count,
  twitter_retweet_count: t.retweet_count,
  observable_like_count: likes[index],
  score: (t.like_count + t.retweet_count) * 30 + likes[index], // Twitter dominates but observable likes tie break
  author: metadata[index]?.author,
  url: metadata[index]?.url,
  thumbnail: thumbnailURL(index)
}))
)}

function _15(devmode,Inputs,data,html){return(
devmode
  ? Inputs.table(data, {
      columns: ["thumbnail", "url", "title", "author", "score"],
      sort: "score",
      reverse: true,
      rows: 50,
      format: {
        thumbnail: (t) =>
          html`<a href=${
            data.find((d) => d.thumbnail === t)?.url
          } target=_blank><img width=100% src=${t}>`
      }
    })
  : undefined
)}

function _16(md){return(
md`### Trending Notebook Dataset

retrieved using [Andrea Mignone](https://observablehq.com/@floatingpurr)'s [Querying the Twitter API](https://observablehq.com/@floatingpurr/twitter-api) from the Twitter account of [@trendingnotebo2](https://twitter.com/trendingnotebo2)`
)}

function _twitter(FileAttachment){return(
FileAttachment("twitter.json").json()
)}

function _tweets(twitter){return(
twitter.tweets.map((t) => ({
  url: t.entities.urls.find((e) => e.expanded_url.includes("observablehq"))
    .expanded_url,
  text: t.text,
  created_at: t.created_at,
  like_count: t.public_metrics.like_count,
  retweet_count: t.public_metrics.retweet_count
}))
)}

function _19(md){return(
md`### Notebook Metadata
`
)}

function _fetchMetdata(Inputs){return(
Inputs.toggle({
  label: "fetch metadata? (network, slow)"
})
)}

async function _fetchedMetadata(fetchMetdata,invalidation,tweets,getMetadata)
{
  if (!fetchMetdata) return invalidation;

  const metadata = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    metadata[i] = await getMetadata(
      tweets[i].url.replace("https://observablehq.com/", "")
    );
  }
  return metadata;
}


function _23(md){return(
md`the next cell is the same as above but loaded from file cache`
)}

function _metadata(FileAttachment){return(
FileAttachment("fetchedMetadata.json").json()
)}

function _25(md){return(
md`### Document Meta
`
)}

function _fetchMeta(Inputs){return(
Inputs.toggle({
  label: "fetch doc meta? (network, slow)"
})
)}

async function _fetchedMeta(fetchMeta,invalidation,tweets,metadata,fetchp)
{
  if (!fetchMeta) return invalidation;
  const meta = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    if (metadata[i]) {
      meta[i] = (
        await fetchp(
          `https://api.observablehq.com/document/${metadata[i].id}/meta`
        )
      ).json();
    }
  }
  return Promise.all(meta);
}


function _meta(FileAttachment){return(
FileAttachment("fetchedMeta.json").json()
)}

function _30(md){return(
md`### Thumbnail`
)}

function _thumbnailURL(meta){return(
(index) =>
  meta[index]
    ? `https://static.observableusercontent.com/thumbnail/${
        meta[index].custom_thumbnail || meta[index].thumbnail
      }.jpg`
    : undefined
)}

function _32(md){return(
md`### Notebook Likes
`
)}

function _fetchLikes(Inputs){return(
Inputs.toggle({
  label: "fetch notebook likes? (network, slow)"
})
)}

async function _fetchedLikes(fetchLikes,invalidation,tweets,metadata,fetchp)
{
  if (!fetchLikes) return invalidation;
  const likes = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    if (metadata[i]) {
      const html = await (await fetchp(metadata[i].url)).text();

      likes[i] = /"likes":(\d+)/.exec(html)[1];
    }
  }
  return likes;
}


async function _likes(FileAttachment){return(
(await FileAttachment("fetchedLikes.json").json()).map((n) =>
  Number.parseInt(n)
)
)}

function _36(md){return(
md`### Social Tags`
)}

async function _37(fetchp,metadata){return(
(await fetchp(metadata[147].url)).text()
)}

function _fetchTags(Inputs){return(
Inputs.toggle({
  label: "fetch page meta tags? (network, slow)"
})
)}

async function _fetchedTags(fetchTags,invalidation,tweets,metadata,fetchp)
{
  if (!fetchTags) return invalidation;
  var el = document.createElement("tmp");
  const tags = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    if (metadata[i]) {
      el.innerHTML = await (await fetchp(metadata[i].url)).text();

      try {
        tags[i] = {
          title: el.querySelector("meta[property='og:title']").content,
          description: el.querySelector("meta[name=description]").content
        };
      } catch (err) {
        console.error("Problem with tags for " + i);
      }
    }
  }
  return tags;
}


async function _tags(FileAttachment){return(
(await FileAttachment("fetchedTags (1).json").json()).map((t) => {
  let description = undefined;
  if (t?.description) {
    description = t.description;

    if (description.lastIndexOf(".") !== -1)
      description = description.substring(0, description.lastIndexOf(".") + 1);
  }

  return {
    ...t,
    description
  };
})
)}

function _42(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["twitter.json", {url: new URL("./files/04d026fc8ce140583b1d35ee94f76ead94bebd2204698be7a311d5eeb349a37250951b76e379c470d745065ff405779a1755c8a02941f34cfafeaf8e1390a082.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMetadata.json", {url: new URL("./files/ee44c4cc22b52ed1184e88b05f33f14dae3caf2b76aa3c196ef16e2f874dae9d96daff26566f1aa9497d5388cfd727e1e366789e0d123e5dc53377c344c2d286.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMeta.json", {url: new URL("./files/fb5a5aec44669bbd8f8f9246c24fb88e7a5765ae0ce638923d379cd11cb8118dce80724c739a643b6385b067ca1ab24f4575318a520470e5811d8e69677104b4.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedLikes.json", {url: new URL("./files/25438af63673fc6f7ae68b6d655b683962899b847fcbfa1ff2b90cb7617e483267742e2911e3c1138e3d55557495cfe1bcc2fd4f4b37ffceaabcf1014d2e95d6.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedTags (1).json", {url: new URL("./files/4f8cca63ae70e2ef77bba49a48a9d5990b6bdacb351f64575b4cf6efce76fe5c05380f3041fa1e06d311485bbb6e73465e9d13a005a07084b4c9831e3e23003a.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["top100","htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md","content"], _4);
  main.variable(observer("content")).define("content", ["notebooksByCatagory"], _content);
  main.variable(observer("devmode")).define("devmode", _devmode);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("notebooksByCatagory")).define("notebooksByCatagory", ["d3","labelled100"], _notebooksByCatagory);
  main.variable(observer("top100")).define("top100", ["d3","data"], _top100);
  main.variable(observer("labelled100")).define("labelled100", ["top100","catagoriesTop100"], _labelled100);
  main.variable(observer("catagoriesTop100")).define("catagoriesTop100", _catagoriesTop100);
  main.variable(observer()).define(["devmode","Inputs","labelled100","html","data"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("data")).define("data", ["tweets","metadata","tags","likes","thumbnailURL"], _data);
  main.variable(observer()).define(["devmode","Inputs","data","html"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("twitter")).define("twitter", ["FileAttachment"], _twitter);
  main.variable(observer("tweets")).define("tweets", ["twitter"], _tweets);
  main.variable(observer()).define(["md"], _19);
  const child1 = runtime.module(define1);
  main.import("getMetadata", child1);
  main.variable(observer("viewof fetchMetdata")).define("viewof fetchMetdata", ["Inputs"], _fetchMetdata);
  main.variable(observer("fetchMetdata")).define("fetchMetdata", ["Generators", "viewof fetchMetdata"], (G, _) => G.input(_));
  main.variable(observer("fetchedMetadata")).define("fetchedMetadata", ["fetchMetdata","invalidation","tweets","getMetadata"], _fetchedMetadata);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("metadata")).define("metadata", ["FileAttachment"], _metadata);
  main.variable(observer()).define(["md"], _25);
  const child2 = runtime.module(define2);
  main.import("fetchp", child2);
  main.variable(observer("viewof fetchMeta")).define("viewof fetchMeta", ["Inputs"], _fetchMeta);
  main.variable(observer("fetchMeta")).define("fetchMeta", ["Generators", "viewof fetchMeta"], (G, _) => G.input(_));
  main.variable(observer("fetchedMeta")).define("fetchedMeta", ["fetchMeta","invalidation","tweets","metadata","fetchp"], _fetchedMeta);
  main.variable(observer("meta")).define("meta", ["FileAttachment"], _meta);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("thumbnailURL")).define("thumbnailURL", ["meta"], _thumbnailURL);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("viewof fetchLikes")).define("viewof fetchLikes", ["Inputs"], _fetchLikes);
  main.variable(observer("fetchLikes")).define("fetchLikes", ["Generators", "viewof fetchLikes"], (G, _) => G.input(_));
  main.variable(observer("fetchedLikes")).define("fetchedLikes", ["fetchLikes","invalidation","tweets","metadata","fetchp"], _fetchedLikes);
  main.variable(observer("likes")).define("likes", ["FileAttachment"], _likes);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["fetchp","metadata"], _37);
  main.variable(observer("viewof fetchTags")).define("viewof fetchTags", ["Inputs"], _fetchTags);
  main.variable(observer("fetchTags")).define("fetchTags", ["Generators", "viewof fetchTags"], (G, _) => G.input(_));
  main.variable(observer("fetchedTags")).define("fetchedTags", ["fetchTags","invalidation","tweets","metadata","fetchp"], _fetchedTags);
  main.variable(observer("tags")).define("tags", ["FileAttachment"], _tags);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _42);
  return main;
}
