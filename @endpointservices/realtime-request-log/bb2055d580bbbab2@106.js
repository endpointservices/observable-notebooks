// https://observablehq.com/@observablehq/tweet@106
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Tweet

This notebook provides a tiny convenience function for embedding a tweet in a notebook using [Twitter’s widgets API](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-javascript-factory-function). To use it in your notebook, first import it:

\`\`\`js
import {tweet} from "@observablehq/tweet"
\`\`\`

Then define a cell that calls *tweet*, passing in the tweet’s unique identifier.`
)});
  main.variable(observer()).define(["tweet"], function(tweet){return(
tweet("993222403663675392")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Here’s the implementation:`
)});
  main.variable(observer("tweet")).define("tweet", ["twttr"], function(twttr){return(
function tweet(id, options) {
  const div = document.createElement("DIV");
  Promise.resolve().then(() => twttr.widgets.createTweet(id, div, options));
  return div;
}
)});
  main.variable(observer("twttr")).define("twttr", ["require"], function(require){return(
require("https://platform.twitter.com/widgets.js")
  .catch((e) => window.twttr || Promise.reject(e))
  .then(twttr => new Promise(resolve => twttr.ready(resolve)))
)});
  return main;
}
