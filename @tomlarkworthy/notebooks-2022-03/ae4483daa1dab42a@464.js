import define1 from "./67d1b2c32f1883c4@565.js";
import define2 from "./55bed46f68a80641@366.js";
import define3 from "./ef672b935bd480fc@619.js";
import define4 from "./293899bef371e135@225.js";

function _1(month,md){return(
md`# Inspiring Notebooks of ${month} 2022`
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
md`It's my favourite part of the month when I get to review what has happened recently on the [Observable](https://observablehq.com/) Dataviz platform. This month, three notebooks had very similar engagement as measured by the Twitter analytics of the [Trending Notebook Bot](https://twitter.com/trendingnotebo2).

`
)}

function _4(md){return(
md`### Engagement, Impressions, Likes and Retweets`
)}

function _5(Plot,data){return(
Plot.plot({
  x: {
    domain: [0, 500]
  },
  y: {
    domain: [0, 25]
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
  value: 5,
  step: 1,
  label: "cutoff"
})
)}

function _9(md){return(
md`
Top dog by a hair's breadth was *["Example Custom Embed"](https://observablehq.com/@endpointservices/example-custom-embed)* created by none other than me under my team account ([@endpointservices](https://observablehq.com/@endpointservices))! That notebook demonstrates how you can completely control the markup of a custom micro websites yet define logic using an [Observable](https://observablehq.com/) notebook. It's a problem people have and it was motivated by answering a question on the [Observable forum](https://talk.observablehq.com/t/how-can-i-remove-the-observable-logo/6362/6). I highly recommend using the forum as a source of inspiration, I also recommend using Observable as a website builder-lite.

The next outstanding notebook in March was *[Hello, Ruffle!](https://observablehq.com/@mootari/ruffle-js)* by [@mootari](https://observablehq.com/@mootari). The Observablehq community has a tradition of bringing in new technologies onto the platform via an introductory notebook called *hello X*, so this notebook was about getting [Ruffle](https://ruffle.rs/) running. Ruffle is a *Rust* implementation of Adobe Flash compiled to WASM for use on the WEB, so now you can start playing your favourite Flash experiences on Observable!

Our third winner of March was [Shape interpolations with flubber](https://observablehq.com/@neocartocnrs/shape-interpolations-with-flubber) by [@neocartocnrs](https://observablehq.com/@neocartocnrs). Flubber is an animation library that lets you interpolate between arbitrary SVG shapes. I think this notebook did well because it has some great interactive demos that both wow and and reveal the limitations of [Flubber](https://github.com/veltman/flubber). It is tactile, honest and informative which are great ingredients for a successful computational notebook! If you like that one you will probably also like [https://observablehq.com/@tophtucker/recreating-ostlings-regression-visualizations](https://observablehq.com/@tophtucker/recreating-ostlings-regression-visualizations) by [@tophtucker](https://observablehq.com/@tophtucker) which is a very informative set of demonstrations of linear interpolation gotchas.

Talk to you next month! Here are all the [trending](https://twitter.com/trendingnotebo2) notebooks of March in their own words.
`
)}

function _10(md,content){return(
md`${content}`
)}

function _content(cutoff,data,month)
{
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
    if (!author_match) throw new Error(JSON.stringify(notebook));
    const author = author_match[1];
    markdown += `#### [${notebook.title}](${notebook.url}) by [${author}](https://observablehq.com/${author}) \n`;
  }

  return markdown;
}


function _12(md){return(
md`### Data wrangling`
)}

function _month(){return(
"March"
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
    "tweet_activity_metrics_trendingnotebo2_20220301_20220401_en.csv"
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
FileAttachment("fetchedNotebookURL (3).json").json()
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
FileAttachment("fetchedMetadata (4).json").json()
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
FileAttachment("fetchedMeta (3).json").json()
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
(await FileAttachment("fetchedTags (4).json").json()).map((t) => {
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
  const fileAttachments = new Map([["tweet_activity_metrics_trendingnotebo2_20220301_20220401_en.csv",new URL("./files/b9e4df54ac8f577e5331bc36b3f86b23300a8e80e0253d37bae7fdec22abdd7b25a9f50a13932a7eb0ad5c76e46f41506cad7717a1a93e7a23a63057f388f6c4",import.meta.url)],["fetchedNotebookURL (3).json",new URL("./files/09b0520d3c4f54fc2a10d901614bd13b917fd5955f01bfdb6f2ef9695fa26fbb52681a824c08f7c1a2600156fd9f7feb76bbd3a85f3656a687ddc39978a022a1",import.meta.url)],["fetchedMetadata (4).json",new URL("./files/2b7240690137cf0433fe476fd33e220b5ef2dc161ff588f6cde15eddc74619f5c14bba5e255753bbef6b3c0b68fb9e311ec9502900f40cd2c52672e6c5d79ce6",import.meta.url)],["fetchedMeta (3).json",new URL("./files/c2414a68bc72321a1205f2cafbf4a2ad12f4c7f74db7d437bdd0cd110fe976315079b187506208bf93aa2ccc5a4d805cc4ab3fae7db5a5ec5bf39e02cc2a4c2a",import.meta.url)],["fetchedTags (4).json",new URL("./files/dd85837124355570a3d0298b4afb91a3492f35e4d08a48822383eca49586df36c4f1edd6ee571e31e5abd7e0949e1b7070c1a02509f1ebcc6d4449a6fa4c43dc",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["month","md"], _1);
  main.variable(observer()).define(["data","htl"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["Plot","data"], _5);
  main.variable(observer("viewof scaling")).define("viewof scaling", ["Inputs"], _scaling);
  main.variable(observer("scaling")).define("scaling", ["Generators", "viewof scaling"], (G, _) => G.input(_));
  main.variable(observer("viewof offset")).define("viewof offset", ["Inputs"], _offset);
  main.variable(observer("offset")).define("offset", ["Generators", "viewof offset"], (G, _) => G.input(_));
  main.variable(observer("viewof cutoff")).define("viewof cutoff", ["Inputs","data"], _cutoff);
  main.variable(observer("cutoff")).define("cutoff", ["Generators", "viewof cutoff"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md","content"], _10);
  main.variable(observer("content")).define("content", ["cutoff","data","month"], _content);
  main.variable(observer()).define(["md"], _12);
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
