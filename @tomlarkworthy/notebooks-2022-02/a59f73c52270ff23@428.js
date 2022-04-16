// https://observablehq.com/@tomlarkworthy/notebooks-2022-02@428
import define1 from "./67d1b2c32f1883c4@565.js";
import define2 from "./55bed46f68a80641@366.js";
import define3 from "./ef672b935bd480fc@619.js";
import define4 from "./293899bef371e135@225.js";

function _1(month,md){return(
md`# Top Notebooks of ${month} 2022`
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
md`Welcome to the second monthly summary of what is hot on the [Observable](https://observablehq.com/) Dataviz platform. I write these articles to help myself stay on top of all the good work coming out of [Observable](https://observablehq.com/). Last month, two notebooks in particular did well on the timeline of the [trending bot](https://twitter.com/trendingnotebo2), of those two, [Yuri Vishnevsky](https://observablehq.com/@yurivish)'s *["Words Known Better by Males than Females, and Vice Versa"](https://observablehq.com/@yurivish/words)* is the clear winner, as it went viral, with a 623 upvotes on [Hackernews](https://news.ycombinator.com/item?id=30275159). Congrats Yuri!
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

function _9(month,md){return(
md`
[@yurivish](https://observablehq.com/@yurivish) brilliant *["Words Known Better by Males than Females, and Vice Versa"](https://observablehq.com/@yurivish/words)* does so well because it is so relatable. You are skeptical that people of a different gender have their own vocabulary, but then as soon as you see the data you are flummoxed by "peplum" (word known by women) or "bushido" (word known by men). Of course it went viral!

The challenger notebook in February [@tomlarkworthy](https://observablehq.com/@tomlarkworthy) the utility [Automatically Backup Observable notebooks to Github](https://observablehq.com/@tomlarkworthy/github-backups). This was a notebook I wrote myself to safeguard my intellectual property developed on the platform. Now all my notebooks are automatically synced to Github, so I can be sure I never lose my hard work. Clearly, other people thought this was a useful too!

Of course, there were many other great notebooks, check the rest of ${month}'s trending notebooks below! 
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
"February"
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
    "tweet_activity_metrics_trendingnotebo2_20220201_20220301_en@1.csv"
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
FileAttachment("fetchedNotebookURL (2).json").json()
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
FileAttachment("fetchedMetadata (3).json").json()
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
FileAttachment("fetchedMeta (2).json").json()
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
(await FileAttachment("fetchedTags (3).json").json()).map((t) => {
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
  const fileAttachments = new Map([["tweet_activity_metrics_trendingnotebo2_20220201_20220301_en@1.csv",new URL("./files/8ffb77e2eb384d4eb3da72f77640ad4e0135342cd24f7deb94876dc9d52351c52a6079d39538ddd6e4352e4a9789b55292b4c0f5b4ee763815fddc009acc3c5a",import.meta.url)],["fetchedMeta (2).json",new URL("./files/da685df43d0a31ac559a6548d5bdd5c1d92483adad105b449af4b7eca9763cc6e67fc05f266615e15a336555f4120a720a15b5bf444116e3623f7c68a5087d50",import.meta.url)],["fetchedTags (3).json",new URL("./files/6d570135e86549226eded356fd7014dd3548a10feaf117afcca2c823861fececc11d95c115400b27242594005e956a374146108999511045ab3b330dc2707bb1",import.meta.url)],["fetchedNotebookURL (2).json",new URL("./files/dd127ec740d76110761136b713dc685d984ca2757444f7709b3ef901220c009e59c350ebec106c2f1f62409c948c2427fa9454dd26ec316274f6e3f69951553d",import.meta.url)],["fetchedMetadata (3).json",new URL("./files/067dd226a62449ee708b04976279e6f069d1992769afe671fdf2c5000e59fad8258e08e4fb79fdac762f6b9f56247a6e3d23c8bf0197887089e30234c36d7c5c",import.meta.url)]]);
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
  main.variable(observer()).define(["month","md"], _9);
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
