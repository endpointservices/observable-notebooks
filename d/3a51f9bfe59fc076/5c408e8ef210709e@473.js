import define1 from "./23a966af27d94974@1571.js";

function _1(md){return(
md`# References Class

References for inline citations and bibliographies in other observable documents.

Standard use in other pages would be to import the following:

\`\`\`javaScript
import {References} from "@jwolondon/references-class"
\`\`\`

then instantiate the class with a list of bibtex references (see below).

\`\`\`javaScript
bib = References.create(myRefDatabase)
\`\`\`

Once instantiated, you can call a range of citation methods:`
)}

function _2(bib,md){return(
md`- **\`refTable()\`** Table of all references in the database sorted in alphabetical order. Can be useful to see what your reference database contains.
- **\`cite(myRefs)\`** citation(s) without outer parentheses: ${bib.cite("wood_design_2019")}
- **\`citep(myRefs)\`** citation(s) in parentheses: ${bib.citep("knuth_literate_1984")}
- **\`citeeg(myRefs)\`** example citation(s) in parentheses: ${bib.citeeg("kirk_data_2019","munzner_visualization_2014")}
- **\`bibliography()\`** Formatted list of references from this intance that have been cited somewhere:`
)}

function _3(bib){return(
bib.bibliography()
)}

function _4(md){return(
md`## Reference Database

This is the central list of publications from which citations can be made. Only those that are actually cited appear by default in the bibliography so a single central database of references can be built for use with multiple documents, each of which may only cite a few of them. If no reference list is provided, the one on this page is used by default.

I recommend using bibtex format so that the database is self-documenting. Including a \`doi\` field allows each reference in the generated bibliography to hyperlink to the source. If a DOI is not available, adding a \`url=\` entry is recommended for easy hyplerlinking in the bibliography.

I am adopting the naming convention for each reference to be lower-case \`firstAuthor_firstTitleWord_date\` to allow easier recall of reference names in external documents.`
)}

function _bib(References,refs){return(
References.create(refs)
)}

function _6(bib){return(
bib.refTable()
)}

function _7(md){return(
md` Alternatively you can create multiple \`References\` instances in the same page with different databases. Useful for specialised collections of references or reducing the size of the reference list for specific pages. For example:`
)}

function _bib2(References,lakelandRefs){return(
References.create(lakelandRefs)
)}

function _9(bib2,md){return(
md`> Alfred Wainwright produced a series of seven hand-drawn guidebooks on walking in the Lake District starting with the Eastern Fells ${bib2.citep('wainwright_pictorial_1955')} and ending eleven years later with the Western Fells  ${bib2.citep('wainwright_pictorial_1966')}.`
)}

function _10(bib2){return(
bib2.bibliography()
)}

function _11(md){return(
md`---

## Appendices`
)}

function _12(md){return(
md`Uses the excellent _Citation Factory_ from Adam Krawitz which is itself built on [citeproc-js](https://citeproc-js.readthedocs.io/) and [Citation.js](https://citation.js.org/).`
)}

function _References(refs,citationFactory,fetchCslLocale,Inputs){return(
class References {
  constructor(refList, citeFac) {
    this.refObject = this.#parseBibtex(refList);
    this.citeFac = citeFac;
  }

  // The actual entry point for creating Reference instances.
  // Will default to this page's reference database (refs) if database not provided.
  static async create(refList = refs) {
    const citeFac = await citationFactory(refList, {
      cslLocale: await fetchCslLocale("en-GB")
    });
    return new References(refList, citeFac);
  }

  // Generate an alphabetically ordered table of all references
  // in the refernce database, even if not cited.
  refTable() {
    return Inputs.table(this.refObject, { layout: "auto" });
  }

  // Cite a reference in the form Wood (2024)
  cite(...params) {
    return this.#citeProp("mode", "composite", ...params);
  }

  // Cite a reference in the form (Wood, 2024)
  citep(...params) {
    return this.citeFac(...params);
  }

  // Cite a reference in the form (e.g. Wood, 2024)
  citeeg(...params) {
    return this.#citeProp("prefix", "e.g. ", ...params);
  }

  // Create a formatted bibliography of all references cited via cite, citep, citeeg
  bibliography() {
    return this.citeFac.bibliography();
  }

  // -----------------------------------------------------------------------
  // Private methods

  #parseBibtex(bibtexString) {
    const entries = [];
    const regex =
      /@(\w+)\{([^,]+),[^@]*(?<!book)title\s*=\s*[\{\"]([^\"\}]+)[\"\}]/g;

    let match;
    while ((match = regex.exec(bibtexString)) !== null) {
      entries.push({
        name: match[2].trim(),
        title: match[3].trim(),
        type: match[1]
      });
    }
    entries.sort((a, b) => (a.name < b.name ? -1 : 1));
    return entries;
  }

  #citeProp(k, v, ...params) {
    if (
      params.length &&
      typeof params[params.length - 1] === "object" &&
      !params[params.length - 1].hasOwnProperty("id")
    ) {
      // We have some citation properties in the parameter list
      const cProps = params.pop();
      return this.citeFac(...params, { ...cProps, [k]: v });
    }
    return this.citeFac(...params, { [k]: v });
  }
}
)}

function _15(md){return(
md`_References database examples. Each is a list of bibtex formatted references:_`
)}

function _refs(){return(
`

@inproceedings{amar_low_2005,
  title={Low-level components of analytic activity in information visualization},
  author={Amar, Robert and Eagan, James and Stasko, John},
  booktitle={IEEE Symposium on Information Visualization. InfoVis 2005.},
  pages={111--117},
  year={2005},
  organization={IEEE},
  doi={10.1109/INFVIS.2005.1532136}
}

@inproceedings{bai_discrete_2007,
  title={Discrete skeleton evolution},
  author={Bai, Xiang and Latecki, Longin Jan},
  booktitle={Energy Minimization Methods in Computer Vision and Pattern Recognition: 6th International Conference, EMMCVPR 2007, Ezhou, China, August 27-29, 2007. Proceedings 6},
  pages={362--374},
  year={2007},
  organization={Springer},
  url={https://link.springer.com/chapter/10.1007/978-3-540-74198-5_28}
}

@book{bloom_taxonomy_1956,
  title={Taxonomy of educational objectives, handbook I: The cognitive domain},
  author={Bloom, Benjamin and Engelhart, Max and Furst, Edward and Hill, Walker and Krathwohl, David},
  year={1956},
  publisher={David McKay}
}

@article{brehmer_multi_2013,
  title={A multi-level typology of abstract visualization tasks},
  author={Brehmer, Matthew and Munzner, Tamara},
  journal={IEEE transactions on visualization and computer graphics},
  volume={19},
  number={12},
  pages={2376--2385},
  year={2013},
  publisher={IEEE},
  doi={10.1109/TVCG.2013.124}
}

@article{cleveland_model_1993,
  title={A model for studying display methods of statistical graphics},
  author={Cleveland, William S},
  journal={Journal of Computational and Graphical Statistics},
  volume={2},
  number={4},
  pages={323--343},
  year={1993},
  publisher={Taylor \& Francis},
  doi={10.2307/1390686}
}

@article{dimara_task_2018,
  title={A task-based taxonomy of cognitive biases for information visualization},
  author={Dimara, Evanthia and Franconeri, Steven and Plaisant, Catherine and Bezerianos, Anastasia and Dragicevic, Pierre},
  journal={IEEE transactions on visualization and computer graphics},
  volume={26},
  number={2},
  pages={1413--1432},
  year={2018},
  publisher={IEEE},
  doi={10.1109/TVCG.2018.2872577}
}

@article{dimara_critical_2021,
  title={A critical reflection on visualization research: Where do decision making tasks hide?},
  author={Dimara, Evanthia and Stasko, John},
  journal={IEEE Transactions on Visualization and Computer Graphics},
  volume={28},
  number={1},
  pages={1128--1138},
  year={2021},
  publisher={IEEE},
  doi={10.1109/TVCG.2021.3114813}
}

@inproceedings{disch_designing_2022,
  author = {Disch, Leonie and Fessl, Angela and Pammer-Schindler, Viktoria},
  title = {Designing for Knowledge Construction to Facilitate the Uptake of Open Science: Laying out the Design Space},
  year = {2022},
  isbn = {9781450391573},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3491102.3517450},
  doi = {10.1145/3491102.3517450},
  booktitle = {Proceedings of the 2022 CHI Conference on Human Factors in Computing Systems},
  articleno = {246},
  numpages = {16},
  keywords = {knowledge construction, open science, platform design, design implications},
  location = {New Orleans, LA, USA},
  series = {CHI '22}
}

@article{dykes_visualization_2022,
  title={Visualization for epidemiological modelling: challenges, solutions, reflections and recommendations},
  author={Dykes, Jason and Abdul-Rahman, Alfie and Archambault, Daniel and Bach, Benjamin and Borgo, Rita and Chen, Min and Enright, Jessica and Fang, Hui and Firat, Elif E and Freeman, Euan and others},
  journal={Philosophical Transactions of the Royal Society A},
  volume={380},
  number={2233},
  pages={20210299},
  year={2022},
  publisher={The Royal Society},
  doi={10.1098/rsta.2021.0299}
}

@article{franconeri_science_2021,
  title={The science of visual data communication: What works},
  author={Franconeri, Steven L and Padilla, Lace M and Shah, Priti and Zacks, Jeffrey M and Hullman, Jessica},
  journal={Psychological Science in the public interest},
  volume={22},
  number={3},
  pages={110--161},
  year={2021},
  publisher={Sage Publications Sage CA: Los Angeles, CA},
  doi={10.1177/15291006211051956}
}

@article{hall_design_2020,
  author={Hall, Kyle Wm. and Bradley, Adam J. and Hinrichs, Uta and Huron, Samuel and Wood, Jo and Collins, Christopher and Carpendale, Sheelagh},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Design by Immersion: A Transdisciplinary Approach to Problem-Driven Visualizations}, 
  year={2020},
  volume={26},
  number={1},
  pages={109-118},
  doi={10.1109/TVCG.2019.2934790}}

@article{iceland_multigroup_2004,
  title={The multigroup entropy index (also known as Theil’s H or the information theory index)},
  author={Iceland, John},
  journal={US Census Bureau},
  volume={31},
  number={2006},
  pages={51},
  year={2004},
  url={https://www2.census.gov/programs-surveys/demo/about/housing-patterns/multigroup_entropy.pdf}
}

@article{jenny_cartographic_2021,
  author={Jenny, Bernhard and Heitzler, Magnus and Singh, Dilpreet and Farmakis-Serebryakova, Marianna and Liu, Jeffery Chieh and Hurni, Lorenz},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Cartographic Relief Shading with Neural Networks}, 
  year={2021},
  volume={27},
  number={2},
  pages={1225-1235},
  doi={10.1109/TVCG.2020.3030456}}

@book{kahneman_thinking_2011,
  title={Thinking, fast and slow},
  author={Kahneman, Daniel},
  year={2011},
  publisher={macmillan},
  url={https://www.penguin.com.au/books/thinking-fast-and-slow-9780141033570}
}

@article{kirk_data_2019,
  title={Data visualisation: A handbook for data driven design},
  author={Kirk, Andy},
  journal={Data Visualisation},
  pages={1--328},
  year={2019},
  publisher={SAGE Publications Ltd},
  url={https://visualisingdata.com/book}
}

@article{knuth_literate_1984,
  title={Literate programming},
  author={Knuth, Donald Ervin},
  journal={The computer journal},
  volume={27},
  number={2},
  pages={97--111},
  year={1984},
  publisher={Oxford University Press},
  url={https://en.wikipedia.org/wiki/Literate_programming}
}

@article{kosara_notebooks_2023,
  author = {R. Kosara},
  journal = {IEEE Computer Graphics and Applications},
  title = {Notebooks for Data Analysis and Visualization: Moving Beyond the Data},
  year = {2023},
  volume = {43},
  number = {01},
  issn = {1558-1756},
  pages = {91-96},
  keywords = {analytical models;data analysis;filtering;data visualization;collaboration;predictive models;data models},
  doi = {10.1109/MCG.2022.3222024},
  publisher = {IEEE Computer Society},
  address = {Los Alamitos, CA, USA},
  month = {jan}
}

@book{krathwohl_taxonomy_1956,
  title={Taxonomy of educational objectives: The classification of educational goals; Handbook II: Affective domain},
  author={Krathwohl, David and Bloom, Benjamin and Mesia, B},
  year={1956},
  publisher={David McKay}
}

@article{lee_affective_2023,
  title={Affective learning objectives for communicative visualizations},
  author={Lee-Robbins, Elsie and Adar, Eytan},
  journal={IEEE Transactions on Visualization and Computer Graphics},
  volume={29},
  number={1},
  pages={1--11},
  year={2023},
  publisher={IEEE},
  doi={10.1109/TVCG.2022.3209500}
}

@article{lex_upset_2014,
  title={UpSet: visualization of intersecting sets},
  author={Lex, Alexander and Gehlenborg, Nils and Strobelt, Hendrik and Vuillemot, Romain and Pfister, Hanspeter},
  journal={IEEE transactions on visualization and computer graphics},
  volume={20},
  number={12},
  pages={1983--1992},
  year={2014},
  publisher={IEEE},
  doi={10.1109/TVCG.2014.2346248}
}

@article{mackinlay_automating_1986,
  title={Automating the design of graphical presentations of relational information},
  author={Mackinlay, Jock},
  journal={ACM Transactions On Graphics},
  volume={5},
  number={2},
  pages={110--141},
  year={1986},
  publisher={ACM New York, NY, USA},
  doi={10.1145/22949.22950},
}

@article{massey_dimensions_1988,
  title={The dimensions of residential segregation},
  author={Massey, Douglas S and Denton, Nancy A},
  journal={Social forces},
  volume={67},
  number={2},
  pages={281--315},
  year={1988},
  publisher={The University of North Carolina Press},
  doi={10.1093/sf/67.2.281}
}

@article{meyer_criteria_2020,
  author={Meyer, Miriah and Dykes, Jason},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Criteria for Rigor in Visualization Design Study}, 
  year={2020},
  volume={26},
  number={1},
  pages={87-97},
  doi={10.1109/TVCG.2019.2934539}}

@book{munzner_visualization_2014,
  title={Visualization analysis and design},
  author={Munzner, Tamara},
  year={2014},
  publisher={CRC press},
  doi={10.1201/b17511}
}

@article{rogers_insights_2020,
  author={Rogers, Jen and Patton, Austin H. and Harmon, Luke and Lex, Alexander and Meyer, Miriah},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Insights From Experiments with Rigor in an EvoBio Design Study}, 
  year={2021},
  volume={27},
  number={2},
  pages={1106-1116},
  doi={10.1109/TVCG.2020.3030405}}
}

@article{theil_note_1971,
  title={A note on the measurement of racial integration of schools by means of informational concepts},
  author={Theil, Henri and Finizza, Anthony J},
  journal={Journal of Mathematical Sociology}, 
  year={1971},
  volume={1},
  number={2},
  pages={187-193},
  publisher = {Routledge},
  doi={10.1080/0022250X.1971.9989795}
}

@book{wang_artful_2018,
  title={Artful Design: Technology in Search of the Sublime, A MusiComic Manifesto},
  author={Wang, Ge},
  year={2018},
  publisher={Stanford University Press},
  url={https://artful.design}
}

@article{wilkinson_grammar_2010,
  title = {The grammar of graphics (review)},
  author = {Wilkinson, Leland},
  year = {2010},
  journal = {WIREs Computational Statistics},
  volume = {2},
  number = {6},
  pages = {673-677},
  doi = {https://doi.org/10.1002/wics.118}
}

@book{wilkinson_grammar_2012,
  title={The grammar of graphics},
  author={Wilkinson, Leland},
  year={2012},
  publisher={Springer},
  doi={10.1007/0-387-28695-0}
}

@article{wood_design_2019,
  author={Wood, Jo and Kachkaev, Alexander and Dykes, Jason},
  journal={IEEE Transactions on Visualization and Computer Graphics}, 
  title={Design Exposition with Literate Visualization}, 
  year={2019},
  volume={25},
  number={1},
  pages={759-768},
  doi={10.1109/TVCG.2018.2864836}}

`
)}

function _lakelandRefs(){return(
`
@book{wainwright_pictorial_1955,
  title={A Pictorial Guide to the Lakeland Fells. Book One: The Eastern Fells},
  author={Wainwright, Alfred},
  year={1955},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1957,
  title={A Pictorial Guide to the Lakeland Fells. Book Two: The Far Eastern Fells},
  author={Wainwright, Alfred},
  year={1957},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1958,
  title={A Pictorial Guide to the Lakeland Fells. Book Three: The Central Fells},
  author={Wainwright, Alfred},
  year={1958},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1960,
  title={A Pictorial Guide to the Lakeland Fells. Book Four: The Southern Fells},
  author={Wainwright, Alfred},
  year={1960},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1962,
  title={A Pictorial Guide to the Lakeland Fells. Book Five: The Northern Fells},
  author={Wainwright, Alfred},
  year={1962},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1964,
  title={A Pictorial Guide to the Lakeland Fells. Book Six: The North Western Fells},
  author={Wainwright, Alfred},
  year={1964},
  publisher={Westmoreland Gazette}
}

@book{wainwright_pictorial_1966,
  title={A Pictorial Guide to the Lakeland Fells. Book Seven: The Western Fells},
  author={Wainwright, Alfred},
  year={1966},
  publisher={Westmoreland Gazette}
}
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["bib","md"], _2);
  main.variable(observer()).define(["bib"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("bib")).define("bib", ["References","refs"], _bib);
  main.variable(observer()).define(["bib"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("bib2")).define("bib2", ["References","lakelandRefs"], _bib2);
  main.variable(observer()).define(["bib2","md"], _9);
  main.variable(observer()).define(["bib2"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("citationFactory", child1);
  main.import("fetchCslLocale", child1);
  main.variable(observer("References")).define("References", ["refs","citationFactory","fetchCslLocale","Inputs"], _References);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("refs")).define("refs", _refs);
  main.variable(observer("lakelandRefs")).define("lakelandRefs", _lakelandRefs);
  return main;
}
