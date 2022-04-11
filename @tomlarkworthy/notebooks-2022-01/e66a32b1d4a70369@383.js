// https://observablehq.com/@tomlarkworthy/notebooks-2022-01@383
import define1 from "./67d1b2c32f1883c4@565.js";
import define2 from "./55bed46f68a80641@366.js";
import define3 from "./ef672b935bd480fc@619.js";
import define4 from "./293899bef371e135@225.js";

function _1(md){return(
md`# Engaging Notebooks of Jan 2022`
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
md`Welcome to the first edition of a monthly summary of what is hot on the [Observable](https://observablehq.com/) Dataviz platform. There is so much activity it is sometimes hard to stay up to date and not miss anything juicy. This newsletter is dedicated to finding the gems. Last month two notebooks tweeted by the [trending bot](https://twitter.com/trendingnotebo2) in particular found some resonance in the broader community.
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
First, the prolific [@fil](https://observablehq.com/@fil) scored a hit with a technical dimension reduction technique for summarizing time-series data called [topological subsampling](https://observablehq.com/@fil/time-series-topological-subsampling). It's pleasing to see technical posts do so well, I think Fil did a fantastic job of explaining the technique very well, and my hypothesis why it did so well is that it ultimately solves a very practical problem of transmitting just the salient information very efficiently. You can use the technique to speed up various parts of Dataviz, including bandwidth minimization or speeding up rendering pipelines. 

The second big hit was [@neocartocnrs](https://observablehq.com/@neocartocnrs) introduction to his library [Bertin.js](https://github.com/neocarto/bertin). Bertin.js is a geo library to help render beautiful thematic maps. We are very excited because [@neocartocnrs](https://observablehq.com/@neocartocnrs) is a long-time Observablehq user and professional cartographer, and his library seems to be a manifestation of the move toward declarative style DataViz that the Observablehq community is moving towards. We wish you good luck Nicolas Lambert with Berin.js!  

Of course, there were many other great notebooks, check the rest of January's trending notebooks below! Also if you have not seen, there is a list of the [100 notebooks in 2021](https://observablehq.com/@tomlarkworthy/notebooks2021).
`
)}

function _10(md,content){return(
md`${content}`
)}

function _content(cutoff,data)
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

  markdown += `These other notebooks also trended in Jan\n`;
  for (let i = cutoff; i < data.length; i++) {
    const notebook = data[i];
    const author = /(@[^)]+)/.exec(notebook.author)[1];
    markdown += `#### [${notebook.title}](${notebook.url}) by [${author}](https://observablehq.com/${author}) \n`;
  }

  return markdown;
}


function _12(md){return(
md`### Data wrangling`
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
    "tweet_activity_metrics_trendingnotebo2_20220101_20220201_en.csv"
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
    const shortcode = /(https:\/\/t.co\/[0-9a-zA-Z]*) https:\/\/t.co\/[0-9a-zA-Z]*/.exec(
      tweets[i]["Tweet text"]
    )[1];
    notebooks[i] = expandTwitterURL(shortcode);
  }
  return Promise.all(notebooks);
}


function _notebookURL(FileAttachment){return(
FileAttachment("fetchedNotebookURL.json").json()
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
FileAttachment("fetchedMetadata (1).json").json()
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
FileAttachment("fetchedMeta (1).json").json()
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
(await FileAttachment("fetchedTags (2).json").json()).map((t) => {
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

function _33(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["tweet_activity_metrics_trendingnotebo2_20220101_20220201_en.csv",new URL("./files/9c846183cce847cef674131ad8bec8f590225e27a36af41480e75b4733b879090ea3a95d02bc5c7b99a53c40f95d1a5640e464ed32d1cd40056cf3ff7153015d",import.meta.url)],["fetchedNotebookURL.json",new URL("./files/e7f4e5e0e9549e843c12fffa630b9093207806aa36e985b9eca4b094c4d4bdd5e124345de28857bf032883b952dbd375500d5f0bf4042cc20aff84c1af0980be",import.meta.url)],["fetchedMetadata (1).json",new URL("./files/b8765b3740d5c3d8573adc60b1b2aa3ead50e2ffd625151852e7c4540c5ef599ebf72d024e55eec1bd436c2b02f36e8921d5bb3c4477e7f5c7625e12054e2f43",import.meta.url)],["fetchedMeta (1).json",new URL("./files/c0484f26e0b6c674ab1ee957d62712562b37f0000195b0d9bbc754b31b61aa4ab664999953ceb3ae32096fed574032ffbb5fa6520abd1fc49db6ac30902479b3",import.meta.url)],["fetchedTags (2).json",new URL("./files/c4d11deada8350ad56433f126b42571626b5584de4de9fe731ceff5fa95501e78d9c6b28a13e94f4b1638130a16ce011674bcc56328d74127f9324d5ca076154",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
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
  main.variable(observer("content")).define("content", ["cutoff","data"], _content);
  main.variable(observer()).define(["md"], _12);
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
  main.variable(observer()).define(["footer"], _33);
  return main;
}
