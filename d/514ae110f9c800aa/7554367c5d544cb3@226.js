// https://observablehq.com/@alecglassford/so-fetch@226
function _1(md){return(
md`# so fetch!`
)}

function _2(md){return(
md`*Short version: \`import { soFetch } from '@alecglassford/so-fetch'\`, then \`soFetch(urlWithoutCORS)\` ✨*`
)}

function _3(html){return(
html`<img src="https://i.giphy.com/SUgOYsXqmexxe.gif" alt="Silent, looping one-second video of Gretchen Wieners from the film Mean Girls saying 'so fetch!'">`
)}

function _4(md){return(
md`There's a lot of neat stuff on the web, but as the [Introduction to Data notebook](https://beta.observablehq.com/@mbostock/introduction-to-data) mentions, you're not going to be able to load resources whose owners haven't enabled [cross-origin resources sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), or CORS, on their servers. (See the bottom of this page for a bit more on this.)🔒

This notebook provides you with a function called \`soFetch\`, which wraps around [\`fetch\`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) and sends your request to [a tiny server](https://glitch.com/edit/#!/sofetch), which relays it on and gets you back your stuff. 🆒 (Well, some of it. See "Limitations.")`
)}

function _5(md){return(
md`## Usage

### "Installation"
Run \`import { soFetch } from '@alecglassford/so-fetch'\` in an Observable cell.

### "API"
Then use \`soFetch(url)\`, where \`url\` is a string representing any publicly available resource that you can snag with a *really simple* GET request. In return, you'll get a promise that resolves into [a Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) (just like \`fetch\`).

### Limitations
As alluded to above, you can't pass through headers or a body or use any HTTP request methods besides GET. And you won't get back any headers either. 🤭 TBH, this is because it's sufficient for my basic web-scraping needs, but I don't think it would be hard to make this a bit more robust. In fact, I may do that this weekend. But if I don't, you can give it a go by forking this notebook and [remixing the Glitch server](https://glitch.com/edit/#!/remix/sofetch).`
)}

function _6(md){return(
md`## Examples`
)}

function _7(md){return(
md`### Useful for web scraping in Observable`
)}

function _8(md){return(
md`This won't work:`
)}

function _9(){return(
fetch('https://www.rottentomatoes.com/m/mean_girls/')
)}

function _10(md){return(
md`But the next one will! 🎉`
)}

function _11(soFetch){return(
soFetch('https://www.rottentomatoes.com/m/mean_girls/')
)}

async function _12(soFetch,html)
{
  const res = await soFetch('https://www.rottentomatoes.com/m/mean_girls/');
  const source = await res.text();
  const dom = html`${source}`;
  return dom.querySelector('#tomato_meter_link').textContent.trim();
}


function _13(md){return(
md`### And for getting structured data too`
)}

function _14(md){return(
md`RSS feeds are a good example of small, frequently updating data sources—perfect to be playing with in Observable—that often aren't served with CORS.

Here we get the New York Times homepage feed and make a little skimsheet of the top five articles in it. (Apparently they aren't listed reverse chronologically?)`
)}

async function _15(soFetch,html,md)
{
  const res = await soFetch('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml');
  const source = await res.text();
  const dom = html`${source}`;
  const articles = [...dom.querySelectorAll('item')].slice(0, 5); // [...x] converts x to an array
  const bullets =  articles.map((article) => {
    const title = article.querySelector('title').textContent;
    const url = article.querySelector('guid').textContent;
    const byline = article.querySelector('dc\\:creator').textContent;
    const time = (new Date(article.querySelector('pubDate').textContent)).toLocaleTimeString();
    return `* [${title}](${url})\n  * _${byline}_, ${time}`
  });
  return md`${bullets.join('\n')}`;
}


function _16(md){return(
md`## Code`
)}

function _17(md){return(
md`It's just the one line below 😜. Plus a few more for [the proxy server code, which you can see and remix on Glitch](https://glitch.com/edit/#!/sofetch).`
)}

function _soFetch(){return(
function soFetch(url) {
  return fetch(`https://sofetch.glitch.me/${encodeURI(url)}`);
}
)}

function _19(md){return(
md`## A bit more on CORS and the same-origin policy

More broadly, this limitation is part of the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy#Security_Applications) which is totally dope, because it keeps whatever webpage you're on (e.g. this notebook), which runs code written by some potentially sketchy person (e.g. who am I?) from taking personal information in your browser (e.g. a cookie set by your bank's website) and sending it off to some target (e.g. your bank's website) and causing all sorts of trouble (e.g. $$$).

Your browser is not going to send any privileged information to  sofetch dot glitch dot me, because who the hell is that website to you anyway? So it's chill; soFetch isn't going to fetch any resource that requires any sort of authentication, and that's how it ought to be. ✌️

*Note on the above paragraphs: I am no security expert, so if you want to dig more into this sort of stuff, I recommend you check out the [Open Web Application Security Project](https://www.owasp.org/index.php/Main_Page). And [let me know if I messed something up here](https://twitter.com/alecglassford).*`
)}

function _20(md,LICENSE){return(
md`## License(s)

This software is licensed under ${LICENSE} (see below for details). And the documentation is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).`
)}

function _LICENSE(){return(
'Apache-2.0'
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["html"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(_9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["soFetch"], _11);
  main.variable(observer()).define(["soFetch","html"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["soFetch","html","md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("soFetch")).define("soFetch", _soFetch);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md","LICENSE"], _20);
  main.variable(observer("LICENSE")).define("LICENSE", _LICENSE);
  return main;
}
