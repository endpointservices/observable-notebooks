// https://observablehq.com/@chitacan/rss@153
function _1(md,icon){return(
md`# RSS

*RSS subscribe button for your notebook. ${icon({ text: 'subscribe me' })}*

<img width="350" src="https://user-images.githubusercontent.com/286950/49281924-2885ce00-f4d1-11e8-927c-7019593ec303.png"/>

Observable supports [feeds](https://beta.observablehq.com/@mbostock/changelog-2018-05-07#feeds-) with its own API. Unfortunately Observable does not provide a **subscribe** button on your profile & notebook page. 😢 If you want to use Observable as your blog, (like me!!) you need to create own subscribe button on your notebook.

This notebook provides bit more simpler way to create your Observable notebook subscribe button. (with icon${icon()})

First, import this notebook.

~~~js
import {icon} from "@chitacan/rss"
~~~

And put it wherever you want.

~~~js
md\`my awesome content \${icon()}\`
~~~

With some option(\`{text, size, url}\`), you can customize it.

* ${icon({
  text: '@mbostock',
  url: 'https://api.observablehq.com/documents/@mbostock.rss'
})}
* ${icon({
  text: '@jashkenas',
  url: 'https://api.observablehq.com/documents/@jashkenas.rss'
})}
* ${icon({
  text: '@tmcw',
  url: 'https://api.observablehq.com/documents/@tmcw.rss'
})}
* ${icon({
  text: '@observablehq',
  url: 'https://api.observablehq.com/documents/@observablehq.rss'
})}
* ${icon({
  text: '@d3',
  url: 'https://api.observablehq.com/documents/@d3.rss'
})}

for collection pass (\`{user, collection}\`).

* ${icon({ user: 'd3', collection: 'd3-scale' })}

Happy subscribing 📰
`
)}

function _icon(feedURL,html){return(
(opt = {}) => {
  const { user: user, collection: collection, ...rest } = opt;
  const _opt = Object.assign(
    {},
    {
      text: user && collection ? `@${user}/collection` : '',
      size: 15,
      url: feedURL(user, collection)
    },
    rest
  );
  return html`<a id="rss-icon" href="${_opt.url}" target="_blank">${_opt.text}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="${_opt.size}" height="${_opt.size}">
    <title>RSS feed icon</title>
    <style type="text/css">
      svg {padding: 0 5px;}
      .button {stroke: none; fill: orange;}
      .symbol {stroke: none; fill: white;}
    </style>
    <rect class="button" width="8" height="8" rx="1.5"/>
    <circle class="symbol" cx="2" cy="6" r="1"/>
    <path class="symbol" d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"/>
    <path class="symbol" d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"/>
  </svg></a>`;
}
)}

function _feedURL(location){return(
(user, collection) => {
  if (!user || user == '') {
    const url = new URL(location.href);
    [user] = url.hostname.split('.');
  }

  if (collection) {
    return `https://api.observablehq.com/collection/@${user}/${collection}.rss`;
  }
  return `https://api.observablehq.com/documents/@${user}.rss`;
}
)}

function _4(md){return(
md`*Clip art courtesy [ClipArt ETC](https://etc.usf.edu/clipart/)*`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","icon"], _1);
  main.variable(observer("icon")).define("icon", ["feedURL","html"], _icon);
  main.variable(observer("feedURL")).define("feedURL", ["location"], _feedURL);
  main.variable(observer()).define(["md"], _4);
  return main;
}
