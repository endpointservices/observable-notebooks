// https://observablehq.com/@tomlarkworthy/wiki@80
function _1(md){return(
md`# Wiki tagged template with jscreole

https://github.com/codeholic/jscreole

Overwrite the _config_ variable to customize the Creale constructor args backing the wiki template literal. Comes preconfigured for [wikipedia](https://en.wikipedia.org/).

~~~js
import {wiki} from '@tomlarkworthy/wiki'
~~~
or

~~~js
import {wiki} with {config as config} from '@tomlarkworthy/wiki'
~~~
`
)}

function _2(md){return(
md`## Examples`
)}

function _3(wiki){return(
wiki`
  * This is [[Wikipedia:Wikitext|wikitext]]
  * This is [[Kingdom of Romania]]
  * This is interpolated: ${Math.random()
    .toString(36)
    .substring(3)}
`
)}

function _config(){return(
{
  interwiki: {},
  linkFormat: 'https://en.wikipedia.org/wiki/'
}
)}

function _Creole(require){return(
require('jscreole@0.9.0/lib/creole.js')
  .catch(() => window["creole"])
  .then(() => window["creole"])
)}

function _creole(Creole,config){return(
new Creole(config)
)}

function _wiki(creole){return(
function wiki(strings, ...args) {
  const zippedStrings = strings.reduce((acc, cur, i) => {
    let arrToConcat = i === strings.length - 1 ? [cur] : [cur, args[i]];
    return [...acc, ...arrToConcat];
  }, []);

  const string = zippedStrings.join('');

  var span = document.createElement('span');
  creole.parse(span, string);
  return span;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["wiki"], _3);
  main.variable(observer("config")).define("config", _config);
  main.variable(observer("Creole")).define("Creole", ["require"], _Creole);
  main.variable(observer("creole")).define("creole", ["Creole","config"], _creole);
  main.variable(observer("wiki")).define("wiki", ["creole"], _wiki);
  return main;
}
