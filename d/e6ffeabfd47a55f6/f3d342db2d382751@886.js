function _1(md){return(
md`# Observable Plot

[Observable Plot](https://github.com/observablehq/plot) is a free, open-source JavaScript library to help you quickly visualize tabular data. It has a concise and (hopefully) memorable API to foster fluency — and plenty of examples to learn from and copy-paste.`
)}

function _2(md){return(
md`In the spirit of *show don’t tell*, below is a scatterplot of the height and weight of Olympic athletes (sourced from [Matt Riggott](https://flother.is/2017/olympic-games-data/)), constructed using a [dot mark](/@observablehq/plot-dot?collection=@observablehq/plot). We assign columns of data (such as *weight*) to visual properties (such as the dot’s *x*), and Plot infers the rest. You can configure much more, if needed, but Plot’s goal is to help you get a meaningful visualization quickly.`
)}

function _athletes(FileAttachment){return(
FileAttachment("athletes.csv").csv({typed: true})
)}

function _4(dotplot){return(
dotplot.legend("color")
)}

function _dotplot(Plot,athletes){return(
Plot.dot(athletes, {x: "weight", y: "height", stroke: "sex"}).plot()
)}

function _6(Inputs,athletes){return(
Inputs.table(athletes)
)}

function _7(md){return(
md`This scatterplot suffers from overplotting: many dots are drawn in the same spot, so it’s hard to perceive density. We can fix this by [binning](/@observablehq/plot-bin?collection=@observablehq/plot) athletes of similar height and weight (and sex), then using opacity to encode the number of athletes in the bin.`
)}

function _8(Plot,athletes){return(
Plot.rect(athletes, Plot.bin({fillOpacity: "count"}, {x: "weight", y: "height", fill: "sex"})).plot()
)}

function _9(md){return(
md`Or we could try the [density mark](/@observablehq/plot-density?collection=@observablehq/plot).`
)}

function _10(Plot,athletes){return(
Plot.density(athletes, {x: "weight", y: "height", stroke: "sex", bandwidth: 6}).plot()
)}

function _11(md){return(
md`A simpler take on this data is to focus on one dimension: weight. We can use the bin transform again to make a histogram with weight on the *x*-axis and frequency on the *y*-axis. This plot uses a [rect mark](/@observablehq/plot-rect?collection=@observablehq/plot) and an implicit [stack transform](/@observablehq/plot-stack?collection=@observablehq/plot).`
)}

function _12(Plot,athletes){return(
Plot.rectY(athletes, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})).plot()
)}

function _13(md){return(
md`Or if we’d prefer to show the two distributions separately as small multiples, we can [facet](/@observablehq/plot-facets?collection=@observablehq/plot) the data along *y* (keeping the *fill* encoding for consistency, and adding grid lines and a rule at *y* = 0 to improve readability).`
)}

function _14(Plot,athletes){return(
Plot.plot({
  grid: true,
  marks: [
    Plot.rectY(athletes, Plot.binX({y: "count"}, {x: "weight", fill: "sex", fy: "sex"})),
    Plot.ruleY([0])
  ]
})
)}

function _15(md){return(
md`Plot employs a layered grammar of graphics inspired by [Vega-Lite](https://vega.github.io/vega-lite/), [ggplot2](https://vita.had.co.nz/papers/layered-grammar.html), Wilkinson’s *Grammar of Graphics*, and Bertin’s *Semiology of Graphics*. Plot rejects a chart typology in favor of [marks](/@observablehq/plot-marks?collection=@observablehq/plot), [scales](/@observablehq/plot-scales?collection=@observablehq/plot), and [transforms](/@observablehq/plot-transforms?collection=@observablehq/plot). Plot can be readily extended in JavaScript, whether to define a channel, a transform, or even a custom mark. And Plot is compatible with [Observable dataflow](/@observablehq/how-observable-runs): use [inputs](/@observablehq/inputs) to control charts, and [views](/@observablehq/introduction-to-views) to read chart selections. (This last part is coming soon!)`
)}

function _16(md){return(
md`We created Plot to better support exploratory data analysis in reactive, JavaScript notebooks like Observable. We continue to support D3 for bespoke explanatory visualization and recommend Vega-Lite for imperative, polyglot environments such as Jupyter. Plot lets you see your ideas quickly, supports interaction with minimal fuss, is flexible with respect to data, and can be readily extended by the community. We believe people will be more successful finding and sharing insight if there’s less wrestling with the intricacies of programming and more “using vision to think.”`
)}

function _17(md){return(
md`To learn more, start with [Plot: Marks and Channels](/@observablehq/plot-marks?collection=@observablehq/plot) or dive into the docs below.

Or for a quick overview, see the interactive [Plot Cheatsheets](https://observablehq.com/@observablehq/plot-cheatsheets) or [download the PDF](https://github.com/observablehq/plot-cheatsheets/raw/main/plot-cheatsheets.pdf).`
)}

function _concepts(md){return(
md`---

## Concepts

These core concepts provide Plot’s foundation.`
)}

function _19(htl,previews){return(
htl.html`${previews([
{
  path: "@observablehq/plot-marks?collection=@observablehq/plot",
  thumbnail: "17e04344c0f0cee103a18bfd0853f6af30baa28f0439d19dc231a473373ab8f5",
  title: "Marks and Channels"
},
{
  path: "@observablehq/plot-scales?collection=@observablehq/plot",
  thumbnail: "fc104fd0099a7333f000901b3d9a38e4b4f8a9e8bac40ffd746aab1cc9f21fa5",
  title: "Scales"
},
{
  path: "@observablehq/plot-axes?collection=@observablehq/plot",
  thumbnail: "61ef43e3641638a2c8745ff587efd2b9976e70ea8ad94b7e6e5dca4023214d85",
  title: "Axes"
},
{
  path: "@observablehq/plot-transforms?collection=@observablehq/plot",
  thumbnail: "c7c6bd4e567a9e3081d3c56e19d91ddc56c4591e7d281ab601188c3018a70c5f",
  title: "Transforms"
},
{
  path: "@observablehq/plot-facets?collection=@observablehq/plot",
  thumbnail: "e58c30cf3f770a5b5b2c1b1cb76ac20b77dc5364c713158e044324c785233f3e",
  title: "Facets"
},
{
  path: "@observablehq/plot-legends?collection=@observablehq/plot",
  thumbnail: "35db49733fa8e379ee43991bce223d6b426640cc426e8f506c112286778caa11",
  title: "Legends"
},
{
  path: "@observablehq/plot-projections?collection=@observablehq/plot",
  thumbnail: "dc5a5bb1addccb577197417b527c780c93e3beaef5320c885624ae179d623ea8",
  title: "Projections"
},
{
  path: "@observablehq/plot-mapping?collection=@observablehq/plot",
  thumbnail: "02dc8bc250505e431f0ba894d600cb034bcb5fc0be4ee55252712916a19d444f",
  title: "Maps"
}
], {target: null})}`
)}

function _marks(md){return(
md`---

## Marks

Plot provides built-in graphical marks for common charts.`
)}

function _21(htl,previews){return(
htl.html`${previews([
{
  path: "@observablehq/plot-area?collection=@observablehq/plot",
  thumbnail: "f0a4487c91350493f1880454fbbdf91c421f9bd8868af4936757be73a8717b7b",
  title: "Area"
},
{
  path: "@observablehq/plot-arrow?collection=@observablehq/plot",
  thumbnail: "91bc584168279712c59bec43091e2407e50c31362cec3b1420ba1f97115e5a73",
  title: "Arrow"
},
{
  path: "@observablehq/plot-auto?collection=@observablehq/plot",
  thumbnail: "b8118f4945bbeec180e55a4c6a2f96ab0ae1ad93b1d77dd62329f98f7f1ef523",
  title: "Auto"
},
{
  path: "@observablehq/plot-bar?collection=@observablehq/plot",
  thumbnail: "3d378538d99293ba7b7285b0e70fe18009337de7dd829c75dbd6d693517432ca",
  title: "Bar"
},
{
  path: "@observablehq/plot-box?collection=@observablehq/plot",
  thumbnail: "d0c067bba581b4496a1bbbc8209f24e297de23445b437ac3c81a2a2e013b9778",
  title: "Box"
},
{
  path: "@observablehq/plot-cell?collection=@observablehq/plot",
  thumbnail: "b5b820dbad95e6a67205c6b930f07e9cc926bdd5d43e1286146dd86cafaeedef",
  title: "Cell"
},
{
  path: "@observablehq/plot-contour?collection=@observablehq/plot",
  thumbnail: "49cd7536ea0fac9334f3cd1b0b5b7bd60b7c93e6f920e3c6359817261c2c241a",
  title: "Contour"
},
{
  path: "@observablehq/plot-delaunay?collection=@observablehq/plot",
  thumbnail: "10eb7be4221d152d6caa5782696df4b57d2b411e5980e92ac789b303176a4484",
  title: "Delaunay"
},
{
  path: "@observablehq/plot-density?collection=@observablehq/plot",
  thumbnail: "0437302677376a942aa51f44f24491ad10fed95b427ab747f2d8221b5339e868",
  title: "Density"
},
{
  path: "@observablehq/plot-dot?collection=@observablehq/plot",
  thumbnail: "323235720172d6fee0ef5d6168490cbed268c9033ae120b4c91ad2b266bdd184",
  title: "Dot"
},
{
  path: "@observablehq/plot-geo?collection=@observablehq/plot",
  thumbnail: "8f82539b36f5f734374bdf7ce911223054432a29f63300ef9d137c934bec5e5d",
  title: "Geo"
},
{
  path: "@observablehq/plot-image?collection=@observablehq/plot",
  thumbnail: "460aa771e3208a4e3f45d4ed85c50c85516bca054d4606ea6649a48fcc4f111e",
  title: "Image"
},
{
  path: "@observablehq/plot-line?collection=@observablehq/plot",
  thumbnail: "42bfda8e0c228d0dbc5e661296742a4ec39baf9f9c60c280be85d237e0cd73fc",
  title: "Line"
},
{
  path: "@observablehq/plot-linear-regression?collection=@observablehq/plot",
  thumbnail: "ee0e226b7139db9e9f9f68d93e08938e21f915bb815e88ead2db2ad28e76280c",
  title: "Linear Regression"
},
{
  path: "@observablehq/plot-link?collection=@observablehq/plot",
  thumbnail: "3eac02b86fdaa4ed37924a8f8c7b582e77211136493f0bccdc1f8153e72d8297",
  title: "Link"
},
{
  path: "@observablehq/plot-raster?collection=@observablehq/plot",
  thumbnail: "130f8ec065a4ccc5de0a45725ede04dcc2144ee807c6c232460b5db52f9bfb14",
  title: "Raster"
},
{
  path: "@observablehq/plot-rect?collection=@observablehq/plot",
  thumbnail: "e4bf03d155af21a24533562d7fa68d3de7b69039f83294594bd3db0f7e5fa934",
  title: "Rect"
},
{
  path: "@observablehq/plot-rule?collection=@observablehq/plot",
  thumbnail: "06ba94eeed4d9b60d019cf8f0b032e27b4c4936fe3ad13b2dc47b79e871ffcf7",
  title: "Rule"
},
{
  path: "@observablehq/plot-text?collection=@observablehq/plot",
  thumbnail: "38ce703e6382ebc50f3f9015b5216ce824c312ddca03f7b345823010685fc914",
  title: "Text"
},
{
  path: "@observablehq/plot-tick?collection=@observablehq/plot",
  thumbnail: "17ac3016ac7dc061e904156a0c7631abdaa60f541e9127c4c4c4bdef5b06fe3f",
  title: "Tick"
},
{
  path: "@observablehq/plot-tree?collection=@observablehq/plot",
  thumbnail: "40026ebe38b28341b040e4a1df6ba2dd78d41df11fb185657c1427cbc7ea65df",
  title: "Tree"
},
{
  path: "@observablehq/plot-vector?collection=@observablehq/plot",
  thumbnail: "ad91e0b1ab74040f4fecfc74b5415671394179bc267d0a9e77ba2242e981ffbd",
  title: "Vector"
},
{
  path: "@observablehq/plot-frame?collection=@observablehq/plot",
  thumbnail: "0a551b1d232053a3a8c1bb868e09d1754ad7c054822766b566843a575ab9d183",
  title: "Frame"
}
], {target: null})}`
)}

function _transforms(md){return(
md`---

## Transforms

Plot provides built-in transforms for deriving data.`
)}

function _23(htl,previews){return(
htl.html`${previews([
{
  path: "@observablehq/plot-group?collection=@observablehq/plot",
  thumbnail: "17ae90540a6c2e950dc2625a1217297ed9a177ae48c3535c61893b1b49213990",
  title: "Group"
},
{
  path: "@observablehq/plot-bin?collection=@observablehq/plot",
  thumbnail: "6c7912a62a512d88ee539cb621b8d7334b97ef60e60a6437b711aed32ec4f418",
  title: "Bin"
},
{
  path: "@observablehq/plot-stack?collection=@observablehq/plot",
  thumbnail: "e9cc1076c63314fb1f644b2eaca629480682a46085c0fa6bf032b04f8ab4c882",
  title: "Stack"
},
{
  path: "@observablehq/plot-map?collection=@observablehq/plot",
  thumbnail: "664128766139683663b4a54e4d6fb7fe023bb14504da53a6ab8d5845b521646e",
  title: "Map"
},
{
  path: "@observablehq/plot-window?collection=@observablehq/plot",
  thumbnail: "a675ab3e532f9beef208148886f1b667fac06148ddedad19f33b60ced8c0f612",
  title: "Window"
},
{
  path: "@observablehq/plot-select?collection=@observablehq/plot",
  thumbnail: "7901ac621b6ad99134bc3d532a92fb1274836b14b829529c500a38a1cad48c71",
  title: "Select"
},
{
  path: "@observablehq/plot-interval?collection=@observablehq/plot",
  thumbnail: "e3916c7ce03e0a15565e9a4447e3524f98d28d620c3c38a97461b4a56453aa20",
  title: "Interval"
},
{
  path: "@observablehq/plot-dodge?collection=@observablehq/plot",
  thumbnail: "c5edc82ad424d0698c9b8a397dc73a413ad3a1c19fba70385dcbfda52cc9c0c7",
  title: "Dodge"
},
{
  path: "@observablehq/plot-centroid?collection=@observablehq/plot",
  thumbnail: "6c439558adf373275c46e5763a9d3568c6d6609cf727a99d7db7f32b359b6cc7",
  title: "Centroid"
},
{
  path: "@observablehq/plot-hexbin?collection=@observablehq/plot",
  thumbnail: "1fe95f593aa40f969b2be9b86aa4c5c2cd7e6435ac895ffc09fd885ee4f7e8bf",
  title: "Hexbin"
}
], {target: null})}`
)}

function _24(md){return(
md`---

## Maps

[Projections](/@observablehq/plot-projection) allow to use the dedicated [geo](/@observablehq/plot-geo) mark, as well as all the point-based marks, to create maps from geographical data, using D3’s rich variety of [spherical projections](/@observablehq/plot-extended-projections). See the [Mapping with Plot](/@observablehq/plot-mapping) notebook for details.`
)}

function _more(md){return(
md`---
## And more!

Got the basics? Here are even more resources:

* [API Reference](https://github.com/observablehq/plot/blob/main/README.md)
* [Cheatsheets](/@observablehq/plot-cheatsheets)
* [Examples](/collection/@observablehq/plot-examples)
* [Shorthand](/@observablehq/plot-shorthand)
* [Exploration: Penguins](/@observablehq/plot-exploration-penguins)
* [Exploration: Weather](/@observablehq/plot-exploration-weather)
* … and more coming soon!
`
)}

function _26(md){return(
md`Observable Plot is released under the [ISC license](https://github.com/observablehq/plot/blob/main/LICENSE) and depends on [D3](https://d3js.org). It works great on Observable but does not depend on Observable; use it anywhere! To contribute to Plot’s development or to report an issue, please see [our repository](https://github.com/observablehq/plot). For recent changes, please see [our release notes](https://github.com/observablehq/plot/releases).`
)}

function _27(md){return(
md`---

## Appendix\``
)}

function _previews(htl,preview){return(
function previews(notebooks, options) {
  return htl.html`<div style="display: grid; grid-gap: .875rem; grid-template-columns: repeat(auto-fill, minmax(160px, 5fr));">${notebooks.map(notebook => preview(notebook, options))}</div>`;
}
)}

function _preview(htl){return(
function preview({path, title, author, thumbnail}, {target = "_blank"} = {}) {
  return htl.html`<a href=${`/${path}`} target=${target} title="${title}${author ? `by ${author}`: ""}" style="display: inline-flex; flex-direction: column; align-items: start; font: 400 .75rem var(--sans-serif); color: #1b1e23; width: 100%;" onmouseover=${event => event.currentTarget.firstElementChild.style.borderColor = "#1b1e23"} onmouseout=${event => event.currentTarget.firstElementChild.style.borderColor = "#e8e8e8"}>
  <div style="border: solid 1px #e8e8e8; border-radius: 4px; box-sizing: border-box; width: 100%; padding-top: 62.5%; background-size: cover; background-image: url(https://static.observableusercontent.com/thumbnail/${encodeURI(thumbnail)}.jpg);"></div>
  <div style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${title}</div>
</a>`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["athletes.csv", {url: new URL("./files/31ca24545a0603dce099d10ee89ee5ae72d29fa55e8fc7c9ffb5ded87ac83060d80f1d9e21f4ae8eb04c1e8940b7287d179fe8060d887fb1f055f430e210007c.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("athletes")).define("athletes", ["FileAttachment"], _athletes);
  main.variable(observer()).define(["dotplot"], _4);
  main.variable(observer("dotplot")).define("dotplot", ["Plot","athletes"], _dotplot);
  main.variable(observer()).define(["Inputs","athletes"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Plot","athletes"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","athletes"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["Plot","athletes"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Plot","athletes"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("concepts")).define("concepts", ["md"], _concepts);
  main.variable(observer()).define(["htl","previews"], _19);
  main.variable(observer("marks")).define("marks", ["md"], _marks);
  main.variable(observer()).define(["htl","previews"], _21);
  main.variable(observer("transforms")).define("transforms", ["md"], _transforms);
  main.variable(observer()).define(["htl","previews"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("more")).define("more", ["md"], _more);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("previews")).define("previews", ["htl","preview"], _previews);
  main.variable(observer("preview")).define("preview", ["htl"], _preview);
  return main;
}
