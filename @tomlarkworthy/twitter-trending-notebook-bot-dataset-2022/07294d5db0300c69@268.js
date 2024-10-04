function _1(md){return(
md`# Twitter Trending Notebook Bot Dataset 2022
`
)}

function _2(md){return(
md`Last year I published [100 Beautiful and Informative Notebooks of 2021](https://observablehq.com/@tomlarkworthy/notebooks2021) and reposted to Medium where it went viral. I will make another this year, but I thought it be good to share the Twitter data early so people can make their own celebrations of Observable excellence.

⚠️ Just remember, if you create something fair-use out of other people's work, ensure you credit them! Link them, link the notebook and give the reader context like the title.

The raw data is in this notebook as FileAttachments, but I did a little data exploration so you can see the power. I will update December on New Year's Day!
`
)}

function _dimension(Inputs,tweets){return(
Inputs.select(Object.keys(tweets[0]), {
  label: "dimension",
  value: "engagements"
})
)}

function _bar(Inputs,series){return(
Inputs.range([Math.min(...series), Math.max(...series)], {
  label: "The bar"
})
)}

function _5(Plot,tweets,dimension,bar){return(
Plot.plot({
  marks: [
    Plot.ruleX(tweets, { x: "time", y: d => +d[dimension] }),
    Plot.ruleY([0]),
    Plot.ruleY([bar], { stroke: "red" })
  ]
})
)}

function _6(html,tweetsAboveTheBar){return(
html`${tweetsAboveTheBar.map(
  (tweet) => html`<iframe border=0 frameborder=0 height=640 width=550
 src="https://twitframe.com/show?url=${encodeURIComponent(
   tweet["Tweet permalink"]
 )}"></iframe>`
)}`
)}

function _tweetsAboveTheBar(tweets,dimension,bar){return(
tweets.reduce((acc, tweet) => {
  if (tweet[dimension] > bar) acc.push(tweet);
  return acc;
}, [])
)}

function _series(tweets,dimension){return(
tweets.map((t) => t[dimension])
)}

function _9(tweets){return(
tweets[0]
)}

async function _database(DuckDBClient,twitter_files)
{
  const cleanAttachment = async (attachment) =>
    (await attachment.csv()).map((row) => {
      row["time"] = new Date(row["time"]);
      return row;
    });

  const database = await DuckDBClient.of({
    ...Object.fromEntries(
      await Promise.all(
        twitter_files.map(async (attachment) => [
          attachment.name,
          await cleanAttachment(attachment)
        ])
      )
    )
  });
  // Join all the files into tweets table
  database.query(`CREATE TABLE tweets AS (
    ${twitter_files
      .map((attachment) => `select * from "${attachment.name}"`)
      .join("\nUNION ALL\n")}
  )`);
  return database;
}


function _tweets(__query,database,invalidation){return(
__query.sql(database,invalidation,"database")`select * from tweets`
)}

function _twitter_files(FileAttachment){return(
[
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220101_20220201_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220201_20220301_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220301_20220401_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220401_20220501_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220501_20220601_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220601_20220701_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220701_20220801_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220801_20220901_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20220901_20221001_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20221001_20221101_en.csv"
  ),
  FileAttachment(
    "tweet_activity_metrics_trendingnotebo2_20221101_20221201_en.csv"
  )
  // FileAttachment("tweet_activity_metrics_trendingnotebo2_20221201_2023011_en.csv"),
]
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["tweet_activity_metrics_trendingnotebo2_20220801_20220901_en.csv", {url: new URL("./files/46c9ad30a5517e221a51c4142aadb62a76fb64427c727aa6a2275218f6ff60d1a311f9a0473032f7ab14c87b0304f6adab22409291dcbd6cb23dcfb118d7f0fa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220901_20221001_en.csv", {url: new URL("./files/567a00b7ac9dbd753a6d4146973d50a9d3b933074d3ed1bbfc425eab77caa091532890a404075e8399706d93dcaa2a4c2e302e3d0e626629eea9d8676a6793c6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220601_20220701_en.csv", {url: new URL("./files/ce84d18d4ea8745402640f3faa3a0359123149dceb961f390e77d7e12a0df7bf364520cc20ceadb69e2db2f17ce3cc499bd5cafb3346e40bd243e152ac963b73.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220701_20220801_en.csv", {url: new URL("./files/6ef48c3525bf1cebe77f44e8dfb964c55e7793b56f327c5ff4f2158801535661fbfd9cbc1a9217cc37a4867c66f05df52293441c898cb994a48f618faeeb7e55.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220501_20220601_en.csv", {url: new URL("./files/05977de6e91435e6d3661781bd1ff56daf8b49a9bc7d390ca5715809514846fc3cae45eeccf65d7224b3f3c21fdd21820ecc539f3d086c74fa15db36d50f91fc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220301_20220401_en.csv", {url: new URL("./files/b9e4df54ac8f577e5331bc36b3f86b23300a8e80e0253d37bae7fdec22abdd7b25a9f50a13932a7eb0ad5c76e46f41506cad7717a1a93e7a23a63057f388f6c4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220101_20220201_en.csv", {url: new URL("./files/9c846183cce847cef674131ad8bec8f590225e27a36af41480e75b4733b879090ea3a95d02bc5c7b99a53c40f95d1a5640e464ed32d1cd40056cf3ff7153015d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20221001_20221101_en.csv", {url: new URL("./files/65a96b7f47b3602d9b5c6cacbfe186bfe51bdb393df792774c1806926996ddfe398945a71c68a32e3d3a4ebf3f138c417b8e12b538a1bc2bde4d0b1aceb0b073.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20221101_20221201_en.csv", {url: new URL("./files/a248ce429ae247cd184a94d4e246a313fbae99b12b45eda956bb9e6556e0c9e09f798ebe4e2e3658e7b6265ebabea6579f3097a62960629c11261326b098c413.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220401_20220501_en.csv", {url: new URL("./files/ccc5c059a84d4ec78aa48d96cf471267387b6775d28461d80c618702f07e08c65f0abad34c50a5992fd3a80cf4266e15dfff2af388b9415950d3c4ea0f6a73fa.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["tweet_activity_metrics_trendingnotebo2_20220201_20220301_en.csv", {url: new URL("./files/8ffb77e2eb384d4eb3da72f77640ad4e0135342cd24f7deb94876dc9d52351c52a6079d39538ddd6e4352e4a9789b55292b4c0f5b4ee763815fddc009acc3c5a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof dimension")).define("viewof dimension", ["Inputs","tweets"], _dimension);
  main.variable(observer("dimension")).define("dimension", ["Generators", "viewof dimension"], (G, _) => G.input(_));
  main.variable(observer("viewof bar")).define("viewof bar", ["Inputs","series"], _bar);
  main.variable(observer("bar")).define("bar", ["Generators", "viewof bar"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","tweets","dimension","bar"], _5);
  main.variable(observer()).define(["html","tweetsAboveTheBar"], _6);
  main.variable(observer("tweetsAboveTheBar")).define("tweetsAboveTheBar", ["tweets","dimension","bar"], _tweetsAboveTheBar);
  main.variable(observer("series")).define("series", ["tweets","dimension"], _series);
  main.variable(observer()).define(["tweets"], _9);
  main.variable(observer("database")).define("database", ["DuckDBClient","twitter_files"], _database);
  main.variable(observer("tweets")).define("tweets", ["__query","database","invalidation"], _tweets);
  main.variable(observer("twitter_files")).define("twitter_files", ["FileAttachment"], _twitter_files);
  return main;
}
