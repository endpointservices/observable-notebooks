function _1(md){return(
md`# Citation Factory
A simple-to-use mechanism for inline citations and a matching bibliography/reference list, built on [citeproc-js](https://citeproc-js.readthedocs.io/) and [Citation.js](https://citation.js.org/).`
)}

function _2(md){return(
md`## Overview
To use <code><b>citationFactory</b></code> you need to \`import\` the function from this notebook:
~~~js
  import {citationFactory} from '@akrawitz/citation-factory'
~~~`
)}

function _3(md){return(
md`To manufacture a new **citation engine**, place an order with the factory (see what I did there!), passing in the references you will be using:`
)}

function _cite(citationFactory,bibtex){return(
citationFactory(bibtex)
)}

function _5(md){return(
md`Then you can create **citations** from those references by calling the returned function, and passing in citation keys:`
)}

function _6(cite){return(
cite('kohonen1990self', 'elman1990finding')
)}

function _7(cite,md){return(
md`These citations can be interpolated into a markdown cell ${cite('meyer1997computational')}.`
)}

function _8(cite,htl){return(
htl.html`<div>And they can be interpolated into an HTML cell ${cite('meyer1997theory')}.</div>`
)}

function _9(md,cite){return(
md`Which means they can also be interpolated into tagged template literals ${cite('cohen2005vulcanization', 'cohen2011time')}.`
)}

function _10(cite,md){return(
md`If needed, you can tap into citeproc-js properties ${cite({id: 'kohonen1990self', prefix: 'e.g. '})} and flags, as not discussed by ${cite('elman1990finding', {mode: 'composite'})}.`
)}

function _11(md){return(
md`Finally, you can create a **bibliography**:`
)}

function _12(cite){return(
cite.bibliography()
)}

function _13(md){return(
md`The BibTeX reference data used in the examples above:`
)}

function _bibtex(){return(
`
@article{elman1990finding,
  author={Elman, Jeffrey L.},
  title={Finding structure in time},
  journal={Cognitive Science},
  volume={14},
  number={2},
  pages={179-211},
  year={1990},
  doi={https://doi.org/10.1207/s15516709cog1402\_1}
}
@article{kohonen1990self,
  author={Kohonen, Teuvo},
  title={The self-organizing map}, 
  journal={Proceedings of the IEEE}, 
  volume={78},
  number={9},
  pages={1464-1480},
  year={1990},
  doi={https://doi.org/10.1109/5.58325}
}
@article{meyer1997computational,
  author={David E. Meyer and David E. Kieras},
  title={A computational theory of executive cognitive processes and multiple-task performance: Part 1. Basic mechanisms.},
  journal={Psychological Review},
  volume={104},
  number={1},
  pages={3-65},
  year={1997},
  doi={https://doi.org/10.1037/0033-295x.104.1.3}
}
@article{meyer1997theory,
  author={David E. Meyer and David E. Kieras},
  title={A computational theory of executive cognitive processes and multiple-task performance: Part 2. Accounts of psychological refractory-period phenomena.},
  journal={Psychological Review},
  volume={104},
  number={4},
  pages={749-791},
  year={1997},
  doi={https://doi.org/10.1037/0033-295x.104.4.749}
}
@article{cohen2005vulcanization,
  author={Cohen, Jonathan D.},
  title={The Vulcanization of the Human Brain: A Neural Perspective on Interactions Between Cognition and Emotion},
  journal={Journal of Economic Perspectives},
  volume={19},
  number={4},
  year={2005},
  pages={3-24},
  doi={https://doi.org/10.1257/089533005775196750}
}
@article{cohen2011time,
  author={Cohen, Michael X.},
  title={It's about time},
  journal={Frontiers in Human Neuroscience},
  volume={5},
  pages={2},
  year={2011},
  doi={https://doi.org/10.3389/fnhum.2011.00002}
}
`
)}

function _15(md){return(
md`## Details
There are options available for each of the three components: the citation engine, the citations, and the bibliography.`
)}

function _16(md){return(
md`### Citation Engine
To create a citation engine, call <code><b>citationFactory</b></code>:
~~~js
  cite = citationFactory(referenceData, {cslStyle: styleApa, cslLocale: localeEnUs, linkCitations: true, linkBibliography: true})
~~~
which returns a <code><b>cite</b></code> function you can then use to create citations and a bibliography. Of course, you can name the returned function whatever you want.

* <code><b>referenceData</b></code> provides the references you will be using. These can be in any format supported by [Citation.js](https://citation.js.org/), including BibTeX, BibLaTeX, BibJSON, DOIs, RIS, and Wikidata, with multiple variations on these formats. Though dated, here is the most concise [list of input formats](https://citation.js.org/api/0.3/tutorial-input_formats.html) I could find. This notebook uses a BibTeX file as a single long string (i.e. \`@bibtex/text\` in the linked documentation). The references must be provided or else you won't be able to make any citations or a bibliography! The default value is \`undefined\`.
* <code><b>cslStyle</b></code> provides the formatting style to be used for the citations and bibliography in [Citation Style Language (CSL)](https://citationstyles.org/) as either serialized XML or a JavaScript object. Lucky for you, the [CSL style repository](https://github.com/citation-style-language/styles) provides over 2000 free, curated styles for you to choose from! Even luckier for you, I've included a utility function <code><b>citationFactory.fetchCslStyle</b></code> to retrieve the style of your choice (details below). The default is current APA style.
* <code><b>cslLocale</b></code> provides the localization information to be used for the citations and bibliography in [Citation Style Language (CSL)](https://citationstyles.org/) as a serialized XML string, an E4X object, a DOM document, or a JSON or JavaScript representation of the locale XML. Lucky for you, the [CSL locale repository](https://github.com/citation-style-language/locales) provides over 50 free, curated locales for you to choose from! Even luckier for you, I've included a utility function <code><b>citationFactory.fetchCslLocale</b></code> to retrieve the locale of your choice (details below). The default is American English (en-US).
* <code><b>linkCitations</b></code> is a boolean indicating whether or not citations should be clickable links to their corresponding entries in the bibliography. It defaults to \`true\`.
* <code><b>linkBibliography</b></code> is a boolean indicating whether DOIs and URLs in bibliography entries should be clickable links to the corresponding resources. It defaults to \`true\`.`
)}

function _17(md){return(
md`**Note:** You can make multiple calls to <code><b>citationFactory</b></code> and thus have multiple citation engines in the same notebook. They will operate independently and stay out of each other's way. Indeed, there is a second citation engine in this notebook in the "Further Example" section down below.`
)}

function _18(md){return(
md`#### Fetching CSL Styles
For a convenient way to fetch a style from the [CSL style repository](https://github.com/citation-style-language/styles), call <code><b>citationFactory.fetchCslStyle</b></code>:
~~~js
  myCslStyle = await citationFactory.fetchCslStyle(cslStyle)
~~~
which returns a Promise which resolves to the serialized XML for the requested CSL style as a string.

* <code><b>cslStyle</b></code> is a string with the name of the CSL style. For example, to fetch the current APA style, you would pass in \`'apa'\`. This would retrieve <code>https<span></span>://raw.githubusercontent.com/citation-style-language/styles/master/<b>apa</b>.csl</code>. The default value is \`undefined\`.

Thus, if you want to use the Chicago author-date style, you can do the following:
~~~js
  cite = citationFactory(bibtex, {cslStyle: await citationFactory.fetchCslStyle('chicago-author-date')})
~~~`
)}

function _19(md){return(
md`#### Fetching CSL Locales
For a convenient way to fetch a locale from the [CSL locale repository](https://github.com/citation-style-language/locales), call <code><b>citationFactory.fetchCslLocale</b></code>:
~~~js
  myCslLocale = await citationFactory.fetchCslLocale(cslLocale)
~~~
which returns a Promise which resolves to the serialized XML for the requested CSL locale as a string.

* <code><b>cslLocale</b></code> is a string with the name of the CSL locale. For example, to fetch the American English locale, you would pass in \`'en-US'\`. This would retrieve <code>https<span></span>://raw.githubusercontent.com/citation-style-language/locales/master/locales-<b>en-US</b>.xml</code>. The default value is \`undefined\`.

Thus, if you want to use the French Canadian locale, you can do the following:
~~~js
  cite = citationFactory(bibtex, {cslLocale: await citationFactory.fetchCslLocale('fr-CA')})
~~~`
)}

function _20(md){return(
md`### Citations
Once you have obtained the <code><b>cite</b></code> function as described above, you can use it to create citations on the fly:
~~~js
  cite(citationKey, ..., <citationProperties>)
~~~
which returns an HTML fragment that can stand alone, be interpolated into a markdown or HTML cell, or be interpolated into a markdown (\`md\`) or HTML (\`html\`, \`htl.html\`) tagged template literal.

* <code><b>citationKey</b></code> is either a string or an object.
<br>If your <code><b>citationKey</b></code> is a *string*, it should contain a single citation key for a reference in the reference data you provided when you created the citation engine. If your reference data is in BibTeX format, the citation key is at the beginning of each item, like \`krawitz\` in this made up example:
<pre>
@article{<b>krawitz</b>,
    author =       "Adam Krawitz",
    title =        "Blah, blah, blah",
    journal =      "Journal of Stuff",
    year =         "2021",
    keywords =     "fake"
}
</pre>
If you are using a different format, then you will need to determine how your citation keys are stored.
<br>If your <code><b>citationKey</b></code> is an *object*, it should be a [citeproc-js cite-item](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#cite-items). An <code><b>id</b></code> property is required, and is simply a string with the citation key as described above. Optional properties include: <code><b>locator</b></code>, <code><b>label</b></code>, <code><b>suppress-author</b></code>, <code><b>author-only</b></code>, <code><b>prefix</b></code>, and <code><b>suffix</b></code>, as described in the linked [citeproc-js cite-item](https://citeproc-js.readthedocs.io/en/latest/csl-json/markup.html#cite-items) documentation. Note that some of these cite-item properties may interact with the citation flags described below.
* <code><b>...</b></code> indicates that you can pass more than one <code><b>citationKey</b></code> to the <code><b>cite</b></code> function. Each subsequent <code><b>citationKey</b></code> can be a string or an object as per the description above. The individual items will be reordered and integrated into a single citation as per the rules of your chosen CSL style.
* <code><b>citationProperties</b></code> can optionally be included as the last argument to the function. It must be an *object* containing [citeproc-js citation flags appropriate for calls to \`processCitationCluster\`](https://citeproc-js.readthedocs.io/en/latest/running.html#citation-flags-with-processcitationcluster). The available flags include <code><b>mode</b></code> (\`'author-only'\`, \`'suppress-author'\`, or \`'composite'\`) and <code><b>infix</b></code>, as described in the linked [citeproc-js citation flag](https://citeproc-js.readthedocs.io/en/latest/running.html#citation-flags-with-processcitationcluster) documentation. Note that some of these citation flags may interact with the cite-item properties described above.

**Note:** The <code><b>cite</b></code> function will generate a citation that is correct "in isolation", but it won't account for the context of other citations. For example, in APA style:
  1. If you have two different references that would each be (Krawitz, 2020) alone, then they should be listed as (Krawitz, 2020a) and (Krawitz, 2020b) when both are used in the same document.
  2. If you have two different authors with the same last name, then instead of (Smith, 1999) and (Smith, 2021), they should be listed as (A. B. Smith, 1999) and (C. D. Smith, 2021).

However, if you call <code><b>cite.bibliography</b></code> somewhere in your document, it will fix all of these sorts of issues for you, because it reprocesses every citation taking the full context in to account!`
)}

function _21(md){return(
md`### Bibliography
Once you have obtained the <code><b>cite</b></code> function as described above, you can call <code><b>cite.bibliography</b></code> to generate a bibliography (a.k.a. reference list):
~~~js
  cite.bibliography({showAll: false, showNone: false})
~~~
which returns a Generator which yields the bibliography in HTML format. In Observable, this will be properly displayed and updated when called in a cell.

* <code><b>showAll</b></code> is a boolean that indicates whether all references should be displayed (\`true\`), or only those that are cited in the document (\`false\`). It defaults to \`false\`.
* <code><b>showNone</b></code> is a boolean that indicates whether display of references should be turned off (\`true\`), or turned on (\`false\`). It defaults to \`false\`.

**Note:** In addition to generating the bibliography, this function also reprocesses all of the citations in the document to handle the contextual issues described in the note for citations above. So, even if you don't want a bibliography, you may want to call this function to handle these issues. That is why there is an option to not display any citations, which otherwise might seem like a strange option to have.`
)}

function _22(md){return(
md`## Further Example
This is a second example of a citation engine, which I've setup so that you can pick from a few different CSL styles in a dropdown menu. The inline citations and the bibliography will change on the fly based on your selection. (The pause when you switch is due to downloading the CSL styles which can be fairly large files.)`
)}

function _myStyle(Inputs){return(
Inputs.select(["science", "modern-language-association", "ieee", "apa"], {label: "Pick your CSL Style:"})
)}

function _24(md){return(
md`Create the citation engine:`
)}

async function _cite2(citationFactory,bibtex,fetchCslStyle,myStyle){return(
citationFactory(bibtex, {cslStyle: await fetchCslStyle(myStyle)})
)}

function _26(cite2,md){return(
md`Make a couple of citations ${cite2('kohonen1990self', 'elman1990finding')}. One more ${cite2('cohen2005vulcanization')}. And, one last one ${cite2('cohen2011time')}.`
)}

function _27(md){return(
md`And here is the resulting bibliography:`
)}

function _28(cite2){return(
cite2.bibliography()
)}

function _29(md){return(
md`## Definitions`
)}

function _citationFactory(styleApa,localeEnUs,HTMLAnchorElement,invalidation,citationJs,citeproc,html,Generators,MutationObserver){return(
async function(referenceData = ``, {cslStyle = styleApa, cslLocale = localeEnUs, linkCitations = true, linkBibliography = true} = {}) {
  // Terminology used (arbitrary and capricious!)
  // reference = an entry in the source, that may or may not be cited or included in the bibliography
  // citation = an actual citation in the current notebook
  // citation item = the citing of a particular reference in a citation
  // citation cluster = a grouping of citation items cited together in the notebook
  // bibliography = the displayed list of references
  // bibliography entry = a single reference included in the bibliography

  const citationEngineId = Math.random().toString(36).substr(2, 5);
  
  // Make scrolling to bibliography entries from citation items work!
  const scrollToBibliographyEntry = (event) => {
    const sourceLink = event.target;
    if (
      sourceLink instanceof HTMLAnchorElement &&
      sourceLink.classList.contains('csl-link') &&
      sourceLink.getAttribute('href').match(/^#/)
    ) {
      const destinationEntry = document.querySelector(`.csl-entry${sourceLink.hash}[data-citation-engine-id="${sourceLink.dataset.citationEngineId}"]`);
      if (destinationEntry) {
        event.preventDefault();
        destinationEntry.scrollIntoView();
      }
    }
  };
  if (linkCitations) {
    document.addEventListener('click', scrollToBibliographyEntry);
    invalidation.then(() => document.removeEventListener('click', scrollToBibliographyEntry));
  }
  
  // Use citation.js to convert from bibtex (or other formats!) to CSL-JSON and put in a map
  const referenceMap = (await citationJs.async(referenceData, {generateGraph: false}))
    .format('data', {format: 'object'})
    .reduce((map, reference) => {
      return map.set(reference.id, reference);
    }, new Map());
  const referenceIds = Array.from(referenceMap.keys());
  
  // Create and initialize citeproc for immediate inline citations
  const sys = {
    retrieveLocale: () => { return cslLocale; },
    retrieveItem: (id) => { return referenceMap.get(id); },
  };
  const inlineEngine = new citeproc.Engine(sys, cslStyle);
  inlineEngine.updateItems(referenceIds);

  // Create inline citations!
  function cite(...citationItems) {
    try {
      // Use the last argument as citation properties if it is an object without an id
      const citationProperties = (
        citationItems.length &&
        (typeof citationItems[citationItems.length - 1] === 'object') &&
        !citationItems[citationItems.length - 1].hasOwnProperty('id')
      ) ? citationItems.pop() : {};
      citationProperties.noteIndex = 0;
      
      // Process the citation item objects
      citationItems = citationItems.map((citationItem) => {
        // Convert strings to objects
        citationItem = (typeof citationItem === 'string') ? {id: citationItem} : citationItem;
        // Add wrapper and optionally link citation to its reference
        citationItem.prefix = `<span class="csl-citation-item" data-citation-engine-id="${citationEngineId}" data-citation-item-id="${citationItem.id}">${citationItem.prefix ? citationItem.prefix : ``}${linkCitations ? `<a class="csl-link" href="#${citationItem.id}" data-citation-engine-id="${citationEngineId}">` : ``}`;
        citationItem.suffix = `${linkCitations ? `</a>` : ``}${citationItem.suffix ? citationItem.suffix : ``}</span>`;
        return citationItem;
      });
      
      // Convert into citeproc citation
      const citationCluster = {
        citationItems: citationItems,
        properties: citationProperties,
      };
  
      // Generate text of citation (and unescape the HTML!)
      const citationPreview = inlineEngine.previewCitationCluster(citationCluster, [], [], 'html')
        .replace(/&#60;/g, '<')
        .replace(/&#62;/g, '>');
  
      // Create final HTML and attach cluster object
      const citationTag = html`<span class="csl-citation-cluster" data-citation-engine-id="${citationEngineId}">${citationPreview}</span>`;
      citationTag.citationCluster = citationCluster;
      return citationTag;
    } catch (e) {
      return `<span style="padding: 0 5px; background-color: red; color: white;"><span style="font-weight: bold;">Citation error:</span> ${e}</span>`;
    }
  }

  // Create offline citations and a bibliography!
  cite.bibliography = function({showAll = false, showNone = false} = {}) {
    return Generators.observe((notify) => {
      let handledAll = false;
      let handledNoCitations = false;
      let handledNoReferences = false;
      let previousCitationItemTags = [];

      function observed() {
        // Find all citation items
        const citationItemTags = Array.from(document.querySelectorAll(`span.csl-citation-item[data-citation-engine-id="${citationEngineId}"]`));

        // Do we have any new citations?
        const haveNewCitationItems = citationItemTags.length && (
          citationItemTags.length !== previousCitationItemTags.length ||
          citationItemTags.some((citationItemTag, index) => {
            return citationItemTag !== previousCitationItemTags[index];
          })
        );

        let offlineEngine;
        if (haveNewCitationItems) {
          // Find all citation clusters
         const citationClusterTags = Array.from(document.querySelectorAll(`span.csl-citation-cluster[data-citation-engine-id="${citationEngineId}"]`));

          // Create citeproc for full offline citations
          offlineEngine = new citeproc.Engine(sys, cslStyle);
          offlineEngine.opt.development_extensions.wrap_url_and_doi = linkBibliography;
          offlineEngine.updateItems(referenceIds);

          // Process all citations
          const processedClusterList = [];
          const processedClusterMap = new Map();
          citationClusterTags.forEach((citationClusterTag) => {
            const processedClusterData = offlineEngine.processCitationCluster(citationClusterTag.citationCluster, processedClusterList, []);
            processedClusterData[1].forEach((processedCluster) => {
              processedClusterMap.set(
                processedCluster[2],
                processedCluster[1].replace(/&#60;/g, '<').replace(/&#62;/g, '>')
              );
            });
            // Update list of citations
            processedClusterList.push([citationClusterTag.citationCluster.citationID, 0]);
          });

          // Update all citations
          citationClusterTags.forEach((citationClusterTag, index) => {
            // Insert into existing HTML!
            citationClusterTag.innerHTML = processedClusterMap.get(citationClusterTag.citationCluster.citationID);
          });

          // Store new tags
         previousCitationItemTags = Array.from(document.querySelectorAll(`span.csl-citation-item[data-citation-engine-id="${citationEngineId}"]`));
        }

        // Warn if no references
        if (!referenceIds.length) {
          if (!handledNoReferences) {
            notify(html`<b>No references?</b>`);
            handledNoReferences = true;
          }
          return;
        }
        handledNoReferences = false;

        // Stop if not displaying
        if (showNone) {
          notify(html``);
          return;
        }

        let bibliographyEngine;
        if (showAll) {
          // Check if we've already rendered
          if (handledAll) {
            return;
          }
          // Create citeproc for the bibliography
          bibliographyEngine = new citeproc.Engine(sys, cslStyle);
          bibliographyEngine.opt.development_extensions.wrap_url_and_doi = linkBibliography;
          // Add cited items to bibliography
          bibliographyEngine.updateUncitedItems(referenceIds);
          handledAll = true;
        } else {
          // Warn if no citations
          if (!citationItemTags.length) {
            if (!handledNoCitations) {
              notify(html`<b>No citations!</b>`);
              handledNoCitations = true;
            }
            return;
          }
          handledNoCitations = false;
          
          // Check if anything changed
          if (!haveNewCitationItems) {
            return;
          }

          bibliographyEngine = offlineEngine;
        }
        
        // Generate bibliography!
        const bibliographyObject = bibliographyEngine.makeBibliography();

        // Insert IDs to act as link targets
        const bibliographyEntries = bibliographyObject[1].map((bibliographyEntry, index) => {
          return bibliographyEntry.replace('<div', `<div id="${bibliographyObject[0].entry_ids[index]}" data-citation-engine-id="${citationEngineId}"`);
        });

        // Glue bibliography into one big string
        const bibliographyString = bibliographyObject[0].bibstart +
          bibliographyEntries.reduce((bibliographyString, bibliographyEntry) => {
            return bibliographyString + bibliographyEntry;
          }, '') +
          bibliographyObject[0].bibend;

        // Define styles based on bibliography
        const bibliographyStyles = `
          <style>
            .csl-entry[data-citation-engine-id="${citationEngineId}"] {
              line-height: ${bibliographyObject[0].linespacing};
              ${bibliographyObject[0].hangingindent ? `
                padding-left: 2rem;
                text-indent: -2rem;
              ` : ``}
            }
          </style>
        `;
        
        const bibliography = html`<div data-citation-engine-id="${citationEngineId}">${bibliographyStyles}${bibliographyString}</div>`;
        notify(bibliography);
      }

      const observer = new MutationObserver(observed);
      observer.observe(document.body, { childList: true, subtree: true });
      observed();
      return () => { observer.disconnect() };
    });    
  };

  return cite;
}
)}

function _fetchCslStyle(){return(
async function(cslStyle) {
  const response = await fetch(`https://raw.githubusercontent.com/citation-style-language/styles/master/${cslStyle}.csl`);
  const text = await response.text();
  return text;
}
)}

function _fetchCslLocale(){return(
async function(cslLocale) {
  const response = await fetch(`https://raw.githubusercontent.com/citation-style-language/locales/master/locales-${cslLocale}.xml`);
  const text = await response.text();
  return text;
}
)}

function _33(citationFactory,fetchCslStyle,fetchCslLocale)
{
  citationFactory.fetchCslStyle = fetchCslStyle;
  citationFactory.fetchCslLocale = fetchCslLocale;
}


async function _styleApa(fetchCslStyle){return(
await fetchCslStyle('apa')
)}

async function _localeEnUs(fetchCslLocale){return(
await fetchCslLocale('en-US')
)}

function _36(md){return(
md`## Resources`
)}

function _37(md){return(
md`Load [Citation.js](https://citation.js.org/), which "converts formats like BibTeX, BibJSON, DOI, and Wikidata to CSL-JSON to convert to styles like APA, Vancouver and to BibTeX and RIS."`
)}

function _citationJs(require){return(
require('https://bundle.run/citation-js@0.5.1')
)}

function _39(md){return(
md`Load [citeproc-js](https://citeproc-js.readthedocs.io/), "a JavaScript implementation of the Citation Style Language."`
)}

function _citeproc(require){return(
require('https://bundle.run/citeproc@2.4.62')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("cite")).define("cite", ["citationFactory","bibtex"], _cite);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["cite"], _6);
  main.variable(observer()).define(["cite","md"], _7);
  main.variable(observer()).define(["cite","htl"], _8);
  main.variable(observer()).define(["md","cite"], _9);
  main.variable(observer()).define(["cite","md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["cite"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("bibtex")).define("bibtex", _bibtex);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("viewof myStyle")).define("viewof myStyle", ["Inputs"], _myStyle);
  main.variable(observer("myStyle")).define("myStyle", ["Generators", "viewof myStyle"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("cite2")).define("cite2", ["citationFactory","bibtex","fetchCslStyle","myStyle"], _cite2);
  main.variable(observer()).define(["cite2","md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["cite2"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("citationFactory")).define("citationFactory", ["styleApa","localeEnUs","HTMLAnchorElement","invalidation","citationJs","citeproc","html","Generators","MutationObserver"], _citationFactory);
  main.variable(observer("fetchCslStyle")).define("fetchCslStyle", _fetchCslStyle);
  main.variable(observer("fetchCslLocale")).define("fetchCslLocale", _fetchCslLocale);
  main.variable(observer()).define(["citationFactory","fetchCslStyle","fetchCslLocale"], _33);
  main.variable(observer("styleApa")).define("styleApa", ["fetchCslStyle"], _styleApa);
  main.variable(observer("localeEnUs")).define("localeEnUs", ["fetchCslLocale"], _localeEnUs);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("citationJs")).define("citationJs", ["require"], _citationJs);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("citeproc")).define("citeproc", ["require"], _citeproc);
  return main;
}
