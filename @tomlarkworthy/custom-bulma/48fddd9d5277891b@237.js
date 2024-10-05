// https://observablehq.com/@tomlarkworthy/custom-bulma@237
function _1(md){return(
md`# Custom Bulma

Supply your own premable. 
~~~js
import {style} with {preamble as premable} from '@tomlarkworthy/custom-bulma'
~~~

`
)}

function _preamble(){return(
`
@charset "utf-8"

@import "https://raw.githubusercontent.com/jgthms/bulma/0.9.1/bulma.sass";
`
)}

function _style(Sass,preamble,importSassGithub,invalidation)
{
  const rootfile = "mystyle.sass";
  return new Promise((resolve, reject) => {
    Sass.writeFile(rootfile, preamble, async () => {
      await importSassGithub();
      // We have to write it and then import it for the scss/sass switcher to work
      // see https://github.com/medialize/sass.js/issues/72
      Sass.compile(`@import "${rootfile}"`, (result) => {
        resolve(result.text)
      })
    });
    invalidation.then(
      () => new Promise((resolve) => Sass.clearFiles(resolve))
    );
  });
  
}


function _cache(){return(
{
  responses: {},
  content: {}
}
)}

function _importSassGithub(cache,Sass,invalidation){return(
function importSassGithub(path) {
  const readGithub = async (url) => {
    if (!cache.responses[url]) {
      console.log("Fetch from", url)
      cache.responses[url] = await fetch(url)
    }
    const response = cache.responses[url];
    if (response.status == 404) return undefined;
    if (!cache.content[url]) {
      cache.content[url] = await response.text();
    }
    return cache.content[url];
  }
  async function importFileToSass(path, done) {
    try {
      if (path.startsWith("/sass/https:/")) {
        // https:// gets mangled to https:/ (note number of slashes)
        const url = path.replace(/^\/sass\/https:\//, 'https://')
        // https://sass-lang.com/documentation/at-rules/import#finding-the-file
        //  variables.scss, variables.sass, or variables.css
        let foundUrl = null
        const content = false || 
              await readGithub(foundUrl = url) || 
              await readGithub(foundUrl = url + ".css") ||
              await readGithub(foundUrl = url + ".scss") ||
              await readGithub(foundUrl = url + ".sass");
        Sass.writeFile(foundUrl, content, (err) => {
          done({
            path: path,
          });
        });
      }
      
    } catch (err) {
      console.log("caught", err)
      done({
        error: err.message
      })
    }
    
  }
  
  Sass.importer(async function(request, done) {
    if (request.path) done()
    else {
      importFileToSass(request.resolved, done);
    }
  });
  
  invalidation.then(() => Sass.importer(null));
}
)}

function _Sass(require){return(
require('sass.js@0.11.1/dist/sass.sync.js').catch(() => window["Sass"])
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("preamble")).define("preamble", _preamble);
  main.variable(observer("style")).define("style", ["Sass","preamble","importSassGithub","invalidation"], _style);
  main.variable(observer("cache")).define("cache", _cache);
  main.variable(observer("importSassGithub")).define("importSassGithub", ["cache","Sass","invalidation"], _importSassGithub);
  main.variable(observer("Sass")).define("Sass", ["require"], _Sass);
  return main;
}
