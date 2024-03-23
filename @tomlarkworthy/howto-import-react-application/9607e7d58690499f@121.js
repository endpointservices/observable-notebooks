import define1 from "./dfdb38d5580b5c35@331.js";

function _1(md){return(
md`# Howto Import a React Application (Chonky Example)

I wanted to use a cool UI I saw in the React ecosystem in Observable. It was not obvious how to get it working so here are my notes. [Chonky](https://chonky.io/) does not have an ES6 module build or anything so you have to pack it from a consuming app. This is not so complicated once you know how.

An issue with the react ecosystem is dependancies (e.g. [material-ui/issue](https://github.com/mui-org/material-ui/issues/1486#issuecomment-141821034)) often use _nodejs_-isms which cannot be handled in the browser. Developers are expected to webpack as the last step to turn a fully assembled application into something that can be read by the browser. Unfortunately this means we cannot directly read various _react_ components within Observable. Here is how you perform the bundling steps locally though, which you can then import into a notebook.

#### This imports a whole application, to import just a component for assembly clientside see https://observablehq.com/@tomlarkworthy/howto-import-react-component


#### Create client react project
~~~
npx create-react-app filebrowser
~~~

#### Downgrade React in package.json

This was necessary because Chonky only worked with react 16 at the time.
~~~
    "react": "^16.13",
    "react-dom": "^16.13",
~~~

Re-init packages
~~~
    rm -fR node_modules
~~~

#### Depend on Chonky
~~~
npm install --save chonky-icon-fontawesome, chonky
~~~

#### Update App.js
~~~js
import { FullFileBrowser } from 'chonky';
function App() {
  const files = [
    { id: 'lht', name: 'Projects', isDir: true },
    {
      id: 'mcd',
      name: 'chonky-sphere-v2.png',
      thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png',
    },
  ]
  const folderChain = [{ id: 'xcv', name: 'Demo', isDir: true }]
  return (
    <div style={{ height: 300 }}>
      <FullFileBrowser files={files} folderChain={folderChain} />
    </div>
  )

}
export default App;
~~~


#### Update index.js

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { setChonkyDefaults } from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import App from './App';

setChonkyDefaults({ iconComponent: ChonkyIconFA });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
~~~

#### Test it works locally
~~~
npm run start
~~~

#### Bundle for upload to Observablehq
~~~
npm run build
~~~

This will create some interesting files:-
- build/index.html
- build/static/js/...

Note the _runtime-main_ is inlined into the index.html

If you study this we just need a 
~~~html
  <div id="root"\>
~~~

plus the js code to boot the application. So in observable create a DIV with id:-
`
)}

function _root(html){return(
html`<div id="root"></div>`
)}

function _3(md){return(
md`Then for loading the scripts we can inject script tags into the head. Of course we have to upload the js files into FileAttachments first`
)}

async function _4(root,FileAttachment)
{
  root; // Ensure our DIV is materialized before loading scripts
  var loader = document.createElement("script");
  loader.src = await FileAttachment("runtime-main.b53eba1f.js").url();
  document.head.appendChild(loader);

  var chunk = document.createElement("script");
  chunk.src = await FileAttachment("2.d04965b1.chunk.js").url();
  document.head.appendChild(chunk);

  var main = document.createElement("script");
  main.src = await FileAttachment("main.cf9a6b73.chunk.js").url();
  document.head.appendChild(main);
}


function _5(md){return(
md`## Boom!

#### Next steps

We can compress the 3 scripts to one using https://www.labnol.org/code/bundle-react-app-single-file-200514 which makes it slightly easier iterating. Or even smoother map your local filesystem to a [cloud bucket](https://observablehq.com/@endpointservices/storage) for zero clicks.
`
)}

function _6(){return(
window.ReactDOM
)}

function _8(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["runtime-main.b53eba1f.js", {url: new URL("./files/ccaea7a7af55da4b610b19f29ce88677844e83d1127e457d4344a285398676f7a95e65f1fab9f2d0041332b4075ed2fb529e886b41f1dabd863971d8e6ef928a.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["main.cf9a6b73.chunk.js", {url: new URL("./files/c747b0aca5b87b6b7169b2bd69ab3b8657a0c790becf73de5afa13241825a43a01217c23a9d7907b54a74c6d08eaf7306f91fa8945324520525b4fe07b163927.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["2.d04965b1.chunk.js", {url: new URL("./files/db7363d3c0ff2e521565571f851dc73d313ea32fa5b2bbbb762e1e39eb238445c1c7f3e8f0c094c8690470c1bae184777541b9e4ec09ba6f78699b94bb2e5b88.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("root")).define("root", ["html"], _root);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["root","FileAttachment"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(_6);
  const child1 = runtime.module(define1);
  main.import("footer", child1);
  main.variable(observer()).define(["footer"], _8);
  return main;
}
