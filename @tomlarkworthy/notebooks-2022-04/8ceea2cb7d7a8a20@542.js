// https://observablehq.com/@tomlarkworthy/notebooks-2022-04@542
import define1 from "./67d1b2c32f1883c4@669.js";
import define2 from "./55bed46f68a80641@366.js";
import define3 from "./ef672b935bd480fc@623.js";
import define4 from "./293899bef371e135@293.js";

function _1(month,md){return(
md`# Top Dataviz of ${month} 2022 - Visualizing Air Raid Sirens in Ukraine`
)}

function _2(data,htl)
{
  const notebooks = data
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return htl.html`<table width="100%">${Array.from({
    length: 5
  }).map(
    (__, j) =>
      htl.html.fragment`<tr style="border-bottom: none;">${Array.from({
        length: 4
      }).map((__, i) => {
        const notebook = data[i + j * 4];
        if (notebook === undefined) return;
        return htl.html.fragment`<td style="padding: 0px">
            <a href=${notebook.url} target="_blank" >
              <img width="100%" src=${notebook.thumbnail}>`;
      })}</tr>`
  )}</table>`;
}


function _3(md){return(
md`This month, our [Trending Notebook Bot](https://twitter.com/trendingnotebo2) saw huge engagement with [Volodymyr Agafonkin
's](https://observablehq.com/@mourner) notebook [Visualizing Air Raid Sirens in Ukraine](https://observablehq.com/@mourner/sirens). It's the biggest hit of the year so far.
`
)}

function _4(md){return(
md`### Engagement, Impressions, Likes and Retweets`
)}

function _5(Plot,d3,data){return(
Plot.plot({
  x: {
    domain: [0, d3.max(data, (d) => d.impressions * 1.2)]
  },
  y: {
    domain: [0, d3.max(data, (d) => d.engagements * 1.3)]
  },
  marks: [
    Plot.image(
      [...data].sort((x) => x.impressions),
      {
        x: "impressions",
        y: "engagements",
        width: "importance",
        title: "title",
        src: "thumbnail"
      }
    ),
    Plot.text(data, {
      text: (d) =>
        Array.from({ length: d.likes })
          .map((_) => "❤️")
          .join("") +
        Array.from({ length: d.retweets })
          .map((_) => "🔁")
          .join(""),
      x: "impressions",
      y: "engagements"
    })
  ]
})
)}

function _scaling(Inputs){return(
Inputs.range([0, 1], { value: 0.21 })
)}

function _offset(Inputs){return(
Inputs.range([0, 100], { value: 39 })
)}

function _cutoff(Inputs,data){return(
Inputs.range([0, data.length], {
  value: 2,
  step: 1,
  label: "cutoff"
})
)}

function _9(month,md){return(
md`The notebook went viral on Twitter from Volodymyr's own [tweet](https://twitter.com/mourner/status/1512061703227248651). This went viral because it's provides a unique angle to a story people are interested in. Volodymyr collected the data with a bot scraping for regional Telegram air raid alerts. The dataviz makes an emotional connection to the viewer - seeing those alerts visualized gives makes the reader anxious and empathetic to the suffering of those who a receiving those alerts for real. In a sense, the data provides insights into the anxiety level of Ukrainian citizens as this terrible war unfolds.

As with everything on [Observable](https://observablehq.com/), you have permission to remix the visualization, the data is embedded in the notebook and you can [fork it](https://observablehq.com/@observablehq/fork-suggest-merge). Perhaps you think the data could be visualized in another way, maybe you could create the next viral hit?


See you next month! Here are all the [trending](https://twitter.com/trendingnotebo2) notebooks of ${month} in their own words.
`
)}

function _10(md,content){return(
md`${content}`
)}

function _content(cutoff,data,month)
{
  debugger;
  let markdown = "";
  for (let i = 0; i < cutoff; i++) {
    const notebook = data[i];
    const author = /(@[^)]+)/.exec(notebook.author)[1];
    markdown += `### [${notebook.title}](${notebook.url}) by [${author}](https://observablehq.com/${author}) \n`;
    markdown += `<i>\n`;
    markdown += `\n[![](${notebook.thumbnail})](${notebook.url})\n`;
    markdown += `\n${notebook?.description || "No description provided"}\n`;
    markdown += `</i>\n`;
    markdown += "\n---\n";
  }

  markdown += `</i>\n`;

  markdown += `These other notebooks also trended in ${month}\n`;
  for (let i = cutoff; i < data.length; i++) {
    const notebook = data[i];
    const author_match = /(@[^)]+)/.exec(notebook.author);
    if (!author_match) {
      debugger;
      throw new Error(JSON.stringify(notebook));
    }
    const author = author_match[1];
    markdown += `#### [${notebook.title}](${notebook.url}) by [${author}](https://observablehq.com/${author}) \n`;
  }

  return markdown;
}


function _month(){return(
"April"
)}

function _data(tweets,meta,metadata,tags,thumbnailURL,scaling,offset){return(
tweets
  .map((tweet, i) => ({
    ...tweet,
    ...meta[i],
    ...metadata[i],
    ...tags[i],
    thumbnail: thumbnailURL(i),
    importance: tweet.impressions * scaling + offset
  }))
  .sort((a, b) => b.impressions - a.impressions)
)}

async function _tweets(FileAttachment){return(
(
  await FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220401_20220501_en.csv"
  ).csv()
).map((x) => ({
  ...x,
  engagements: parseFloat(x.engagements),
  impressions: parseFloat(x.impressions),
  likes: parseFloat(x.likes),
  retweets: parseFloat(x.retweets)
}))
)}

function _fetchNotebookURL(Inputs){return(
Inputs.toggle({
  label: "fetch notebook URL? (network, slow)"
})
)}

function _expandTwitterURL(){return(
async (shortURL) => {
  const response = await fetch(shortURL);
  if (response.status !== 200)
    throw new Error(`fetch to ${shortURL} resulted in ${response.status}`);
  const body = await response.text();
  return /URL=([^"]*)"/.exec(body)[1];
}
)}

function _fetchedNotebookURL(fetchNotebookURL,invalidation,tweets,expandTwitterURL)
{
  if (!fetchNotebookURL) return invalidation;
  const notebooks = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    const shortcode = /(https:\/\/t.co\/[0-9a-zA-Z]*) https:\/\/t.co\/[0-9a-zA-Z]*$/.exec(
      tweets[i]["Tweet text"]
    );
    if (!shortcode) {
      console.error(tweets[i]);
      throw Error(JSON.stringify(tweets[i]));
    }
    notebooks[i] = expandTwitterURL(shortcode[1]);
  }
  return Promise.all(notebooks);
}


function _notebookURL(FileAttachment){return(
FileAttachment("fetchedNotebookURL (4).json").json()
)}

function _fetchMetdata(Inputs){return(
Inputs.toggle({
  label: "fetch metadata? (network, slow)"
})
)}

async function _fetchedMetadata(fetchMetdata,invalidation,tweets,getMetadata,notebookURL)
{
  if (!fetchMetdata) return invalidation;

  const metadata = new Array(tweets.length);
  for (let i = 0; i < tweets.length; i++) {
    metadata[i] = await getMetadata(
      notebookURL[i].replace("https://observablehq.com/", "")
    );
  }
  return metadata;
}


function _metadata(FileAttachment){return(
FileAttachment("fetchedMetadata (5).json").json()
)}

function _22(tags){return(
tags[14]
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
FileAttachment("fetchedMeta (6).json").json()
)}

function _thumbnailURL(meta){return(
(index) =>
  meta[index]
    ? `https://static.observableusercontent.com/thumbnail/${
        meta[index].custom_thumbnail || meta[index].thumbnail
      }.jpg`
    : undefined
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


function _29(tags){return(
tags[14]
)}

async function _tags(FileAttachment){return(
(await FileAttachment("fetchedTags (6).json").json()).map((t) => {
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

function _35(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tweet_activity_metrics_trendingnotebo2_20220401_20220501_en.csv", {url: new URL("./files/ccc5c059a84d4ec78aa48d96cf471267387b6775d28461d80c618702f07e08c65f0abad34c50a5992fd3a80cf4266e15dfff2af388b9415950d3c4ea0f6a73fa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["fetchedNotebookURL (4).json", {url: new URL("./files/3b7ad2b2de12ecb7e88102f16809b14f5017fc037ae181515c9393da3d7902d4dbb8df1acd9e0fbef1c803e38b95180044bf0e0bbfc076182f11f41ffa19f1ee.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMetadata (5).json", {url: new URL("./files/416a69c7401d990f4d70b56351a2ae8ce1062f5338a330b1bcebbe2db1f6937358271c03ab1149b18aa18e0d7a0710920b3129c2248e59ba527181c799cd5f66.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedTags (6).json", {url: new URL("./files/d997d66094f59482957c0b42180ea7668d0cb1b38b76c1e67fa6c653c5cfb88c0176ba478d04e8c40668f11bbdc100cc809ddad281cd1662cf90917e71b9c8a7.json", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMeta (6).json", {url: new URL("./files/b68dbcadff6e6df996308934176ea45dc79f002be908c86d2606b95f1c67bd615288ee760e1b608b2091939bec4e4efaf3cb4652c2a52b537c7bbce7ea29d022.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["month","md"], _1);
  main.variable(observer()).define(["data","htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","d3","data"], _5);
  main.variable(observer("viewof scaling")).define("viewof scaling", ["Inputs"], _scaling);
  main.variable(observer("scaling")).define("scaling", ["Generators", "viewof scaling"], (G, _) => G.input(_));
  main.variable(observer("viewof offset")).define("viewof offset", ["Inputs"], _offset);
  main.variable(observer("offset")).define("offset", ["Generators", "viewof offset"], (G, _) => G.input(_));
  main.variable(observer("viewof cutoff")).define("viewof cutoff", ["Inputs","data"], _cutoff);
  main.variable(observer("cutoff")).define("cutoff", ["Generators", "viewof cutoff"], (G, _) => G.input(_));
  main.variable(observer()).define(["month","md"], _9);
  main.variable(observer()).define(["md","content"], _10);
  main.variable(observer("content")).define("content", ["cutoff","data","month"], _content);
  main.variable(observer("month")).define("month", _month);
  main.variable(observer("data")).define("data", ["tweets","meta","metadata","tags","thumbnailURL","scaling","offset"], _data);
  main.variable(observer("tweets")).define("tweets", ["FileAttachment"], _tweets);
  main.variable(observer("viewof fetchNotebookURL")).define("viewof fetchNotebookURL", ["Inputs"], _fetchNotebookURL);
  main.variable(observer("fetchNotebookURL")).define("fetchNotebookURL", ["Generators", "viewof fetchNotebookURL"], (G, _) => G.input(_));
  main.variable(observer("expandTwitterURL")).define("expandTwitterURL", _expandTwitterURL);
  main.variable(observer("fetchedNotebookURL")).define("fetchedNotebookURL", ["fetchNotebookURL","invalidation","tweets","expandTwitterURL"], _fetchedNotebookURL);
  main.variable(observer("notebookURL")).define("notebookURL", ["FileAttachment"], _notebookURL);
  main.variable(observer("viewof fetchMetdata")).define("viewof fetchMetdata", ["Inputs"], _fetchMetdata);
  main.variable(observer("fetchMetdata")).define("fetchMetdata", ["Generators", "viewof fetchMetdata"], (G, _) => G.input(_));
  main.variable(observer("fetchedMetadata")).define("fetchedMetadata", ["fetchMetdata","invalidation","tweets","getMetadata","notebookURL"], _fetchedMetadata);
  main.variable(observer("metadata")).define("metadata", ["FileAttachment"], _metadata);
  main.variable(observer()).define(["tags"], _22);
  main.variable(observer("viewof fetchMeta")).define("viewof fetchMeta", ["Inputs"], _fetchMeta);
  main.variable(observer("fetchMeta")).define("fetchMeta", ["Generators", "viewof fetchMeta"], (G, _) => G.input(_));
  main.variable(observer("fetchedMeta")).define("fetchedMeta", ["fetchMeta","invalidation","tweets","metadata","fetchp"], _fetchedMeta);
  main.variable(observer("meta")).define("meta", ["FileAttachment"], _meta);
  main.variable(observer("thumbnailURL")).define("thumbnailURL", ["meta"], _thumbnailURL);
  main.variable(observer("viewof fetchTags")).define("viewof fetchTags", ["Inputs"], _fetchTags);
  main.variable(observer("fetchTags")).define("fetchTags", ["Generators", "viewof fetchTags"], (G, _) => G.input(_));
  main.variable(observer("fetchedTags")).define("fetchedTags", ["fetchTags","invalidation","tweets","metadata","fetchp"], _fetchedTags);
  main.variable(observer()).define(["tags"], _29);
  main.variable(observer("tags")).define("tags", ["FileAttachment"], _tags);
  const child1 = runtime.module(define1);
  main.import("Plot", child1);
  const child2 = runtime.module(define2);
  main.import("getMetadata", child2);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _35);
  return main;
}
