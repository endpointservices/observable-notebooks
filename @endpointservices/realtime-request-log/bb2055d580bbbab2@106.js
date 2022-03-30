// https://observablehq.com/@observablehq/tweet@106
function _1(md){return(
md`# Tweet

This notebook provides a tiny convenience function for embedding a tweet in a notebook using [Twitter’s widgets API](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-javascript-factory-function). To use it in your notebook, first import it:

\`\`\`js
import {tweet} from "@observablehq/tweet"
\`\`\`

Then define a cell that calls *tweet*, passing in the tweet’s unique identifier.`
)}

function _2(tweet){return(
tweet("993222403663675392")
)}

function _3(md){return(
md`Here’s the implementation:`
)}

function _tweet(twttr){return(
function tweet(id, options) {
  const div = document.createElement("DIV");
  Promise.resolve().then(() => twttr.widgets.createTweet(id, div, options));
  return div;
}
)}

function _twttr(require){return(
require("https://platform.twitter.com/widgets.js")
  .catch((e) => window.twttr || Promise.reject(e))
  .then(twttr => new Promise(resolve => twttr.ready(resolve)))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["tweet"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("tweet")).define("tweet", ["twttr"], _tweet);
  main.variable(observer("twttr")).define("twttr", ["require"], _twttr);
  return main;
}
