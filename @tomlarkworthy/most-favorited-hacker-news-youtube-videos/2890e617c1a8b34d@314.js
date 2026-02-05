import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./1bef71e497eda5fc@189.js";
import define3 from "./dfdb38d5580b5c35@351.js";

function _1(md){return(
md`# Most favorited Hacker News YouTube videos

I was hungry for YouTube recommendations so I applied a different filtering criteria to the exact same data of [Most Favourited Hacker News Posts](https://observablehq.com/@tomlarkworthy/hacker-favourites-analysis) of last year.
`
)}

function _display(html,score_per_link){return(
html`
<style>
body  { font-family:Verdana, Geneva, sans-serif; font-size:10pt; color:#828282; }
td    { font-family:Verdana, Geneva, sans-serif; font-size:10pt; color:#828282; }
.subtext td { font-family:Verdana, Geneva, sans-serif; font-size:  7pt; color:#828282; }
input    { font-family:monospace; font-size:10pt; }
input[type=\"submit\"] { font-family:Verdana, Geneva, sans-serif; }
textarea { font-family:monospace; font-size:10pt; }
a:link    { color:#000000; text-decoration:none; }
a:visited { color:#828282; text-decoration:none; }
.default { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#828282; }
.admin   { font-family:Verdana, Geneva, sans-serif; font-size:8.5pt; color:#000000; }
.title   { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#828282; }
.subtext { font-family:Verdana, Geneva, sans-serif; font-size:  7pt; color:#828282; }
.yclinks { font-family:Verdana, Geneva, sans-serif; font-size:  8pt; color:#828282; }
.pagetop { font-family:Verdana, Geneva, sans-serif; font-size: 10pt; color:#222222; }
.comhead { font-family:Verdana, Geneva, sans-serif; font-size:  8pt; color:#828282; }
.comment { font-family:Verdana, Geneva, sans-serif; font-size:  9pt; }
.comment a:link, .comment a:visited { text-decoration: underline; }
.noshow { display: none; }
.nosee { visibility: hidden; pointer-events: none; cursor: default }
.pagetop a:visited { color:#000000;}
.topsel a:link, .topsel a:visited { color:#ffffff; }
.subtext a:link, .subtext a:visited { color:#828282; }
.subtext a:hover { text-decoration:underline; }
.comhead a:link, .subtext a:visited { color:#828282; }
.comhead a:hover { text-decoration:underline; }
.hnmore a:link, a:visited { color:#828282; }
.hnmore { text-decoration:underline; }
.default p { margin-top: 8px; margin-bottom: 0px; }
.pagebreak {page-break-before:always}
pre { overflow: auto; padding: 2px; white-space: pre-wrap; word-wrap: break-word; }
pre:hover { overflow:auto }
.votearrow {
  width:      10px;
  height:     10px;
  border:     0px;
  margin:     3px 2px 6px;
  background: url("grayarrow.gif")
  no-repeat;
}
.votelinks.nosee div.votearrow.rotate180 {
  display: none;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .votearrow { background-size: 10px; background-image: url("grayarrow2x.gif"); }
}
/* mobile device */
@media only screen
and (min-width : 300px)
and (max-width : 750px) {
#hnmain { width: 100%; }
body { padding: 0; margin: 0; width: 100%; -webkit-text-size-adjust: none; }
td { height: inherit !important; }
.title, .comment { font-size: inherit;  }
span.pagetop { display: block; margin: 3px 5px; font-size: 12px; }
span.pagetop b { display: block; font-size: 15px; }
table.comment-tree .comment a { display: inline-block; max-width: 200px; overflow: hidden; white-space: nowrap;
text-overflow: ellipsis; vertical-align:top; }
img[src='s.gif'][width='40'] { width: 12px; }
img[src='s.gif'][width='80'] { width: 24px; }
img[src='s.gif'][width='120'] { width: 36px; }
img[src='s.gif'][width='160'] { width: 48px; }
img[src='s.gif'][width='200'] { width: 60px; }
img[src='s.gif'][width='240'] { width: 72px; }
img[src='s.gif'][width='280'] { width: 84px; }
img[src='s.gif'][width='320'] { width: 96px; }
img[src='s.gif'][width='360'] { width: 108px; }
img[src='s.gif'][width='400'] { width: 120px; }
img[src='s.gif'][width='440'] { width: 132px; }
img[src='s.gif'][width='480'] { width: 144px; }
img[src='s.gif'][width='520'] { width: 156px; }
img[src='s.gif'][width='560'] { width: 168px; }
img[src='s.gif'][width='600'] { width: 180px; }
img[src='s.gif'][width='640'] { width: 192px; }
img[src='s.gif'][width='680'] { width: 204px; }
img[src='s.gif'][width='720'] { width: 216px; }
img[src='s.gif'][width='760'] { width: 228px; }
img[src='s.gif'][width='800'] { width: 240px; }
img[src='s.gif'][width='840'] { width: 252px; }
.title { font-size: 11pt; line-height: 14pt;  }
.subtext { font-size: 9pt; }
.itemlist { padding-right: 5px;}
.votearrow { transform: scale(1.3,1.3); margin-right: 6px; }
.votelinks { min-width: 18px; }
.votelinks a { display: block; margin-bottom: 9px; }
input[type='text'], input[type='number'], textarea { font-size: 16px; width: 90%; }
}
.comment { max-width: 1215px; overflow: hidden }
@media only screen and (min-width : 300px) and (max-width : 389px) {
.comment { max-width: 270px; overflow: hidden }
}
@media only screen and (min-width : 390px) and (max-width : 509px) {
.comment { max-width: 350px; overflow: hidden }
}
@media only screen and (min-width : 600px) and (max-width : 689px) {
.comment { max-width: 540px; overflow: hidden }
}
@media only screen and (min-width : 810px) and (max-width : 899px) {
.comment { max-width: 730px; overflow: hidden }
}
@media only screen and (min-width : 1080px) and (max-width : 1169px) {
.comment { max-width: 970px; overflow: hidden }
}
@media only screen and (min-width : 1260px) and (max-width : 1349px) {
.comment { max-width: 1130px; overflow: hidden }
}
</style>
<table border="0" cellpadding="0" cellspacing="0" class="itemlist">
<tbody>${score_per_link.slice(0, 50).map((element, index) => {return `<tr class="athing" id="${element.id}">
<td><span class="rank">${index + 1}.</span></td>
<td valign="top" class="votelinks"><center><a><div class="votearrow"></div></a></center></td>
<td class="title">
<a href="${(element.link.startsWith("item?")?"http://news.ycombinator.com/":"") + element.link}" class="storylink" target="_blank">${element.label}</a>
<span class="sitebit comhead"> <a href="http://news.ycombinator.com/${element.from_link}" target="_blank"><span class="sitestr">${element.from_label}</span></a></span>
</td>
</tr>
<tr>
<td colspan="2"></td>
<td class="subtext">
<span class="score" id="score_24280204">${Math.round(element.score * 30)} faves</span> | <a href="http://news.ycombinator.com/item?id=${element.id}" target="_blank">comments</a>              
</td>
</tr>`}).join("")}</tbody></table>`
)}

function _score_per_link(favourites,links_by_username,d3){return(
Object.values(
  favourites.reduce((acc, item) => {
    if (!acc[item.id]) {
      item.score = 0;
      acc[item.id] = item;
    }
    acc[item.id].score += 1.0 / links_by_username.get(item.username);
    return acc;
  }, {})
)
  .filter(
    d => d.link.indexOf("youtu.be") != -1 || d.link.indexOf("youtube.com") != -1
  )
  .sort((a, b) => d3.descending(a.score, b.score))
)}

function _links_by_username(d3,favourites){return(
d3.rollup(
  favourites, 
  links => links.length, 
  link => link.username
)
)}

async function _favourites(d3,FileAttachment,excludeInternals){return(
d3.csvParse(await FileAttachment("hn_favourites@2.csv").text())
  .filter(value => !value.link.startsWith("item?") || !excludeInternals)
)}

function _d3(require){return(
require("d3@6")
)}

function _excludeInternals(checkbox){return(
checkbox({
  options: [{ value: "toggle", label: "Exclude ycombinator results like Tell/Ask HN?" }],
  value: "toggle"
})
)}

function _11(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["hn_favourites@2.csv", {url: new URL("./files/4e2c2d264c56d0d622d4066b85957b7e42d07f2c1e91a607e1ce356d57894dda011aec7a51ce12daafb09897e639d638f1b059b21aaf3b0b7d40cd43d83a4676.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("display")).define("display", ["html","score_per_link"], _display);
  main.variable(observer("score_per_link")).define("score_per_link", ["favourites","links_by_username","d3"], _score_per_link);
  main.variable(observer("links_by_username")).define("links_by_username", ["d3","favourites"], _links_by_username);
  main.variable(observer("favourites")).define("favourites", ["d3","FileAttachment","excludeInternals"], _favourites);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("viewof excludeInternals")).define("viewof excludeInternals", ["checkbox"], _excludeInternals);
  main.variable(observer("excludeInternals")).define("excludeInternals", ["Generators", "viewof excludeInternals"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  const child2 = runtime.module(define2);
  main.import("futurice_profile", child2);
  const child3 = runtime.module(define3);
  main.import("footer", child3);
  main.variable(observer()).define(["footer"], _11);
  return main;
}
