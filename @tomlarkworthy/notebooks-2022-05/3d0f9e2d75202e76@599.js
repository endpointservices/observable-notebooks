// https://observablehq.com/@tomlarkworthy/notebooks-2022-05@599
import define1 from "./67d1b2c32f1883c4@565.js";
import define2 from "./55bed46f68a80641@366.js";
import define3 from "./ef672b935bd480fc@622.js";
import define4 from "./293899bef371e135@267.js";

function _1(md){return(
md`# Top Observablehq Notebooks of May 2022 `
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


function _3(month,md){return(
md`${month} had 4 times more engagement with the [Trending Notebook Bot](https://twitter.com/trendingnotebo2) than April! This is an unprecedented jump in activity! This I think was due to [@waynesutton](https://twitter.com/waynesutton) returning as community manager for Observable (👋 great to have you back Wayne!) and retweeting us a lot. Thanks Wayne, it makes a big impact for us! I had to rescale all my plots to 
accommodate!

${month} had four notebooks in particular broke from the pack this month, each gaining many likes and retweets. I would say we are still waiting for a true viral Tweet authored by the [trending bot](https://twitter.com/trendingnotebo2), but we are getting some close calls!
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
Inputs.range([0, 1], { value: 0.09 })
)}

function _offset(Inputs){return(
Inputs.range([0, 100], { value: 71 })
)}

function _cutoff(Inputs,data){return(
Inputs.range([0, data.length], {
  value: 5,
  step: 1,
  label: "cutoff"
})
)}

function _9(month,md){return(
md`The very top notebook was [Hello MapLibre](https://observablehq.com/@neocartocnrs/hello-maplibre) which had 18 likes and 6 retweets. [@neocartocnrs](https://observablehq.com/@neocartocnrs) is a familiar name in the Map Dataviz and Observable community. [MapLibre](https://maplibre.org/) is the OSS fork of mapbox-gl-js, and requires a little Observable knowhow to get working properly. Creating a _Hello X_ notebook is an Observablehq community norm when getting a new technology into the ecosystem, and MapLibre is a highly desirable dependency for the mapping community. Thus, getting that library working was a big deal, which was eagerly snapped up by the community. Since publishing, we have seen some other notebooks building on the path cut by [@neocartocnrs](https://observablehq.com/@neocartocnrs), for example, [Terrains with MapLibre](https://observablehq.com/@bert/terrains-with-maplibre) by [@bert](https://observablehq.com/@bert).

The next big hit of the month was written by me! I can tell your that [Interactive Sequence Diagrams](https://observablehq.com/@tomlarkworthy/animated-sequence-diagrams) was a shower thought that struck me at 1a.m. at night. It's an extremely simple technique for creating user steppable sequence diagrams on Observable, which solved a problem I was having with technical documentation. It only took about 15 mins to code up. I was surprised by how well the notebook did on the trending page, leading me to submit it to Hackernews where it reached the front page. That notebook received more traffic than I ususally get in a whole month over all my notebooks. Clearly, Observable has great potential as a technical documentation host.

Another big notebook of the month was [DarkCideS: Bats in Caves Data](https://observablehq.com/@observablehq/darkcides-bats-in-caves) by the [creators](https://observablehq.com/@observablehq) of Observable. That notebook is simply a stellar example of how to do sophisticated data analysis on the platform. In particular, it makes use of embedded SQL cells to deftly manipulate data and uses Plot to create amazing visualization with very little code. That notebook is my new reference example for canonical Dataviz techniques on Observable. 👏 great work Observble team it is a thing of beauty!  

The final notebook of the months big four was [A Sine-Cosine Encoder Experiment](https://observablehq.com/@skybrian/a-sine-cosine-encoder-experiment) by [@skybrian](https://observablehq.com/@skybrian). It's a wonderful example of doing real engineering at home using consumer equipement (LEGO!), that is just a great read with amazing charts of real data. These kinds of projects work quite well in Computational notebooks because you can easily embed pictures and do the mathematics in a single artifact. It lets you get everything down in a single place that you can refer back to at any time. I hope we see more like this!

It did not make quite a big a splash as the other notebooks, but I find it quite amusing that the #5 in ${month} was last months *"best-of"* summary notebook! It had to happen eventually. I did tweet the notebook last month, so for the first time a summary notebook made it into [trending](https://observablehq.com/trending), and actually did really well!

See you next month! Here are the [top trending](https://twitter.com/trendingnotebo2) notebooks of ${month} in their own words.
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
"May"
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

function _SKIP(){return(
[
  "Notebook of the month (maybe of the year?) by a clear margin was 'Visualizing Air Raid Sirens in Ukraine' by @mourner. Amazing work Volodymyr, thank you.\n\nhttps://t.co/a95BeD8luT"
]
)}

async function _tweets(FileAttachment,SKIP){return(
(
  await FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220501_20220601_en.csv"
  ).csv()
).filter(tweet => !SKIP.includes(tweet['Tweet text'])).map((x) => ({
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
FileAttachment("fetchedNotebookURL (5).json").json()
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
FileAttachment("fetchedMetadata (6).json").json()
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
FileAttachment("fetchedMeta (7).json").json()
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


async function _tags(FileAttachment){return(
(await FileAttachment("fetchedTags (7).json").json()).map((t) => {
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

function _34(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tweet_activity_metrics_trendingnotebo2_20220501_20220601_en.csv", {url: new URL("./files/05977de6e91435e6d3661781bd1ff56daf8b49a9bc7d390ca5715809514846fc3cae45eeccf65d7224b3f3c21fdd21820ecc539f3d086c74fa15db36d50f91fc", import.meta.url), mimeType: "text/csv", toString}],
    ["fetchedNotebookURL (5).json", {url: new URL("./files/2ebea91ab2063de8eab668dd9badb4ab6c16758ced8ac1ba9579553bab00c3569e8ac6a6e1938fc489713020678ede39b83a2ddf4634761a57afd88b4da4e0a9", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMetadata (6).json", {url: new URL("./files/80bb079de24b599bd1f47b0a94cc1976f2c0a58aaf1aa9abf9a85943c766fc327237eb7381e7b09081be782eef73abb73feac001205cfb940dba57d4fd644f11", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedMeta (7).json", {url: new URL("./files/b1672860c46f3b0da18f50caac091c0c6fc5033dd8a63a2294090bfe9b8fc95b35e4ef5bafb69614df90f4e3004578d4c167841a3603a334a934bec765cf3106", import.meta.url), mimeType: "application/json", toString}],
    ["fetchedTags (7).json", {url: new URL("./files/23c0b5107c0a3141f49e54a9f3280f77f251ceb623149253e9a18db55783119cf657ea6d3d540ab4c1cdebaaefc0f8e6fa1290f41916830d4b352a0d16147634", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["data","htl"], _2);
  main.variable(observer()).define(["month","md"], _3);
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
  main.variable(observer("SKIP")).define("SKIP", _SKIP);
  main.variable(observer("tweets")).define("tweets", ["FileAttachment","SKIP"], _tweets);
  main.variable(observer("viewof fetchNotebookURL")).define("viewof fetchNotebookURL", ["Inputs"], _fetchNotebookURL);
  main.variable(observer("fetchNotebookURL")).define("fetchNotebookURL", ["Generators", "viewof fetchNotebookURL"], (G, _) => G.input(_));
  main.variable(observer("expandTwitterURL")).define("expandTwitterURL", _expandTwitterURL);
  main.variable(observer("fetchedNotebookURL")).define("fetchedNotebookURL", ["fetchNotebookURL","invalidation","tweets","expandTwitterURL"], _fetchedNotebookURL);
  main.variable(observer("notebookURL")).define("notebookURL", ["FileAttachment"], _notebookURL);
  main.variable(observer("viewof fetchMetdata")).define("viewof fetchMetdata", ["Inputs"], _fetchMetdata);
  main.variable(observer("fetchMetdata")).define("fetchMetdata", ["Generators", "viewof fetchMetdata"], (G, _) => G.input(_));
  main.variable(observer("fetchedMetadata")).define("fetchedMetadata", ["fetchMetdata","invalidation","tweets","getMetadata","notebookURL"], _fetchedMetadata);
  main.variable(observer("metadata")).define("metadata", ["FileAttachment"], _metadata);
  main.variable(observer("viewof fetchMeta")).define("viewof fetchMeta", ["Inputs"], _fetchMeta);
  main.variable(observer("fetchMeta")).define("fetchMeta", ["Generators", "viewof fetchMeta"], (G, _) => G.input(_));
  main.variable(observer("fetchedMeta")).define("fetchedMeta", ["fetchMeta","invalidation","tweets","metadata","fetchp"], _fetchedMeta);
  main.variable(observer("meta")).define("meta", ["FileAttachment"], _meta);
  main.variable(observer("thumbnailURL")).define("thumbnailURL", ["meta"], _thumbnailURL);
  main.variable(observer("viewof fetchTags")).define("viewof fetchTags", ["Inputs"], _fetchTags);
  main.variable(observer("fetchTags")).define("fetchTags", ["Generators", "viewof fetchTags"], (G, _) => G.input(_));
  main.variable(observer("fetchedTags")).define("fetchedTags", ["fetchTags","invalidation","tweets","metadata","fetchp"], _fetchedTags);
  main.variable(observer("tags")).define("tags", ["FileAttachment"], _tags);
  const child1 = runtime.module(define1);
  main.import("Plot", child1);
  const child2 = runtime.module(define2);
  main.import("getMetadata", child2);
  const child3 = runtime.module(define3);
  main.import("fetchp", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _34);
  return main;
}
