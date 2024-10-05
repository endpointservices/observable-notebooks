// https://observablehq.com/@tomlarkworthy/howto-import-react-component@194
import define1 from "./c6e46a483fad9cef@36.js";

function _1(md){return(
md`# Howto import a React component (Chonky Example)

There are a lot of useful components already programmed in the React ecosystem. However, they often require nodejs to use. This is my notes on exporting one to AMD module format so that it can be imported into a notebook and used to assemble an application with Observable.

I have saved the npm package here https://github.com/tomlarkworthy/chonky-adapter
`
)}

function _2(md){return(
md`### Use j-f1's react library for Observablehq`
)}

function _4(md){return(
md`#### Create an minimal npm package

~~~
    npm init
    npm install chonky@2.1  chonky-icon-fontawesome@2.1 --save-dev
    npm install react@16 react-dom@16 --save-dev 
    npm install webpack@4 webpack-cli@4 --save-dev 
~~~`
)}

function _5(md){return(
md`#### Create a *webpack.config.js* to bundle an AMD module

We designate _react_ and _react-dom_ as **external** dependancies so they are not included in the bundle, and that we are building a AMD library.

~~~js
const path = require('path');

module.exports = [{
  entry: './node_modules/chonky/lib/index.js',
  name: "chonky",
  mode: 'production',
  externals: {
    react: {
      root: 'React',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      amd: 'react-dom',
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chonky-amd.js',
    library: "chonky",
    libraryTarget: 'amd'
  },
}, {
  entry: './node_modules/chonky-icon-fontawesome/lib/index.js',
  name: "chonky-icons",
  mode: 'production',
  externals: {
    react: {
      root: 'React',
      amd: 'react',
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chonky-icons-amd.js',
    library: "chonkyicons",
    libraryTarget: 'amd'
  },
}];
~~~`
)}

function _6(md){return(
md`#### Import the artifacts

We include a require.alias so that j-f1's react library is used as the react(-dom) dependency.
`
)}

async function _chonky(require,React,ReactDOM,FileAttachment){return(
require.alias({
  react: React, // We are bringing these from @j-f1/react
  "react-dom": ReactDOM
})(await FileAttachment("chonky-amd@2.js").url())
)}

async function _chonky_icons(require,React,FileAttachment){return(
require.alias({
  react: React // We are bringing these from @j-f1/react
})(await FileAttachment("chonky-icons-amd@1.js").url())
)}

function _9(md){return(
md`### DONE!

Now lets try out Chonky filebrowser react component!
`
)}

function _files(){return(
[
  { id: 'lht', name: 'Projects', isDir: true },
  {
    id: 'mcd',
    name: 'chonky-sphere-v2.png',
    thumbnailUrl: 'https://chonky.io/chonky-sphere-v2.png'
  }
]
)}

function _chonky_defaults(chonky,chonky_icons){return(
chonky.setChonkyDefaults({
  iconComponent: chonky_icons.ChonkyIconFA
})
)}

function _folderChain(){return(
[{ id: 'xcv', name: 'Demo', isDir: true }]
)}

function _13(md){return(
md`## Drum roll...`
)}

function _14(chonky_defaults,render,jsx,chonky,files,folderChain)
{
  chonky_defaults; // Ensure our font is loaded
  return render(
    // We can use j-f1's JSX and depend on our imported React component!
    () =>
      jsx`<${chonky.FullFileBrowser} files=${files} folderChain=${folderChain}></>`
  );
}


function _15(md){return(
md`Whats cool is Observable's reactive behaviour will redraw the folder view if _files_ changes, wow! React AND Observable 😎`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["chonky-amd@2.js", {url: new URL("./files/0a7dea08cf0cf9a3dcf75d44f1c5de452bd20effb2544b300825d46e5f32977ad939acb26e0fe969744bbe1cc528546772ded19fc4562c7be0deaf9ab592471d.js", import.meta.url), mimeType: "application/javascript", toString}],
    ["chonky-icons-amd@1.js", {url: new URL("./files/c0fa95e905706f2b56018c50a030dbe1057f4cc67a28c1ddaa03c0aeb25180c73c40b35f49e8a06768c06d397fbc7ab522dc6d6731be629021fc67c623bd563c.js", import.meta.url), mimeType: "application/javascript", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("render", child1);
  main.import("component", child1);
  main.import("jsx", child1);
  main.import("memo", child1);
  main.import("forwardRef", child1);
  main.import("React", child1);
  main.import("ReactDOM", child1);
  main.import("createElement", child1);
  main.import("Children", child1);
  main.import("createRef", child1);
  main.import("createContext", child1);
  main.import("lazy", child1);
  main.import("Fragment", child1);
  main.import("StrictMode", child1);
  main.import("Suspense", child1);
  main.import("cloneElement", child1);
  main.import("useCallback", child1);
  main.import("useContext", child1);
  main.import("useEffect", child1);
  main.import("useImperativeHandle", child1);
  main.import("useLayoutEffect", child1);
  main.import("useMemo", child1);
  main.import("useReducer", child1);
  main.import("useRef", child1);
  main.import("useState", child1);
  main.import("useDebugValue", child1);
  main.import("createPortal", child1);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("chonky")).define("chonky", ["require","React","ReactDOM","FileAttachment"], _chonky);
  main.variable(observer("chonky_icons")).define("chonky_icons", ["require","React","FileAttachment"], _chonky_icons);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("files")).define("files", _files);
  main.variable(observer("chonky_defaults")).define("chonky_defaults", ["chonky","chonky_icons"], _chonky_defaults);
  main.variable(observer("folderChain")).define("folderChain", _folderChain);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["chonky_defaults","render","jsx","chonky","files","folderChain"], _14);
  main.variable(observer()).define(["md"], _15);
  return main;
}
