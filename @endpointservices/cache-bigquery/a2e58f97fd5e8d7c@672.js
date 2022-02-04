// https://observablehq.com/@observablehq/inputs@672
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["us-state-capitals.tsv",new URL("./files/eee4d2a928a36026dab4281b76deb7fe0cd885f1c6df6e546efb79db7e5fa5ccc98a395f865d31c1db3344ff1734683764bb1a63871fb1b39f77bb810f49699c",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Observable Inputs

These lightweight interface components — buttons, sliders, dropdowns, tables, and the like — help you explore data and build interactive displays. For a walkthrough of how you might use these to support data analysis, see [Hello, Inputs!](/@observablehq/hello-inputs)`
)});
  main.variable(observer("usage")).define("usage", ["md"], function(md){return(
md`---
## Usage

Declare your inputs with [viewof](/@observablehq/introduction-to-views), like so:`
)});
  main.variable(observer("viewof gain")).define("viewof gain", ["Inputs"], function(Inputs){return(
Inputs.range([0, 11], {value: 5, step: 0.1, label: "Gain"})
)});
  main.variable(observer("gain")).define("gain", ["Generators", "viewof gain"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Now you can reference the input’s value (here *gain*) in any cell, and the cell will run whenever the input changes. No event listeners required!`
)});
  main.variable(observer()).define(["gain"], function(gain){return(
gain
)});
  main.variable(observer()).define(["html","gain"], function(html,gain){return(
html`The current gain is ${gain.toFixed(1)}!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Observable Inputs are released under the [ISC license](https://github.com/observablehq/inputs/blob/main/LICENSE) and depend only on [Hypertext Literal](/@observablehq/htl), our tagged template literal for safely generating dynamic HTML. If you are interested in contributing or wish to report an issue, please see [our repository](https://github.com/observablehq/inputs). For recent changes, please see [our release notes](https://github.com/observablehq/inputs/releases).`
)});
  main.variable(observer("basics")).define("basics", ["md"], function(md){return(
md`---
## Basics

These basic inputs will get you started.

* [Button](/@observablehq/input-button) - do something when a button is clicked
* [Toggle](/@observablehq/input-toggle) - toggle between two values (on or off)
* [Checkbox](/@observablehq/input-checkbox) - choose any from a set
* [Radio](/@observablehq/input-radio) - choose one from a set
* [Range](/@observablehq/input-range) or [Number](/@observablehq/input-range) - choose a number in a range (slider)
* [Select](/@observablehq/input-select) - choose one or any from a set (drop-down menu)
* [Text](/@observablehq/input-text) - enter freeform single-line text
* [Textarea](/@observablehq/input-textarea) - enter freeform multi-line text
* [Date](/@observablehq/input-date) or [Datetime](/@observablehq/input-date) - choose a date
* [Color](/@observablehq/input-color) - choose a color
* [File](/@observablehq/input-file) - choose a local file
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Button](/@observablehq/input-button) 

Do something when a button is clicked. [Examples ›](/@observablehq/input-button) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#button)`
)});
  main.variable(observer("viewof clicks")).define("viewof clicks", ["Inputs"], function(Inputs){return(
Inputs.button("Click me")
)});
  main.variable(observer("clicks")).define("clicks", ["Generators", "viewof clicks"], (G, _) => G.input(_));
  main.variable(observer()).define(["clicks"], function(clicks){return(
clicks
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Toggle](/@observablehq/input-toggle) 

Toggle between two values (on or off). [Examples ›](/@observablehq/input-toggle) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#toggle)`
)});
  main.variable(observer("viewof mute")).define("viewof mute", ["Inputs"], function(Inputs){return(
Inputs.toggle({label: "Mute"})
)});
  main.variable(observer("mute")).define("mute", ["Generators", "viewof mute"], (G, _) => G.input(_));
  main.variable(observer()).define(["mute"], function(mute){return(
mute
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Checkbox](/@observablehq/input-checkbox) 

Choose any from a set. [Examples ›](/@observablehq/input-checkbox) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#checkbox)`
)});
  main.variable(observer("viewof flavors")).define("viewof flavors", ["Inputs"], function(Inputs){return(
Inputs.checkbox(["salty", "sweet", "bitter", "sour", "umami"], {label: "Flavors"})
)});
  main.variable(observer("flavors")).define("flavors", ["Generators", "viewof flavors"], (G, _) => G.input(_));
  main.variable(observer()).define(["flavors"], function(flavors){return(
flavors
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Radio](/@observablehq/input-radio)

Choose one from a set. [Examples ›](/@observablehq/input-radio) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#radio)`
)});
  main.variable(observer("viewof flavor")).define("viewof flavor", ["Inputs"], function(Inputs){return(
Inputs.radio(["salty", "sweet", "bitter", "sour", "umami"], {label: "Flavor"})
)});
  main.variable(observer("flavor")).define("flavor", ["Generators", "viewof flavor"], (G, _) => G.input(_));
  main.variable(observer()).define(["flavor"], function(flavor){return(
flavor
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Range](/@observablehq/input-range)

Pick a number. [Examples ›](/@observablehq/input-range) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#range)`
)});
  main.variable(observer("viewof n")).define("viewof n", ["Inputs"], function(Inputs){return(
Inputs.range([0, 255], {step: 1, label: "Favorite number"})
)});
  main.variable(observer("n")).define("n", ["Generators", "viewof n"], (G, _) => G.input(_));
  main.variable(observer()).define(["n"], function(n){return(
n
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Select](/@observablehq/input-select)

Choose one, or any, from a menu. [Examples ›](/@observablehq/input-select) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#select)`
)});
  main.variable(observer("viewof homeState")).define("viewof homeState", ["Inputs","stateNames"], function(Inputs,stateNames){return(
Inputs.select([null].concat(stateNames), {label: "Home state"})
)});
  main.variable(observer("homeState")).define("homeState", ["Generators", "viewof homeState"], (G, _) => G.input(_));
  main.variable(observer()).define(["homeState"], function(homeState){return(
homeState
)});
  main.variable(observer("viewof visitedStates")).define("viewof visitedStates", ["Inputs","stateNames"], function(Inputs,stateNames){return(
Inputs.select(stateNames, {label: "Visited states", multiple: true})
)});
  main.variable(observer("visitedStates")).define("visitedStates", ["Generators", "viewof visitedStates"], (G, _) => G.input(_));
  main.variable(observer()).define(["visitedStates"], function(visitedStates){return(
visitedStates
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Text](/@observablehq/input-text)

Enter freeform single-line text. [Examples ›](/@observablehq/input-text) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#text)`
)});
  main.variable(observer("viewof name")).define("viewof name", ["Inputs"], function(Inputs){return(
Inputs.text({label: "Name", placeholder: "What’s your name?"})
)});
  main.variable(observer("name")).define("name", ["Generators", "viewof name"], (G, _) => G.input(_));
  main.variable(observer()).define(["name"], function(name){return(
name
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Textarea](/@observablehq/input-textarea)

Enter freeform multi-line text. [Examples ›](/@observablehq/input-textarea) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#textarea)`
)});
  main.variable(observer("viewof bio")).define("viewof bio", ["Inputs"], function(Inputs){return(
Inputs.textarea({label: "Biography", placeholder: "What’s your story?"})
)});
  main.variable(observer("bio")).define("bio", ["Generators", "viewof bio"], (G, _) => G.input(_));
  main.variable(observer()).define(["bio"], function(bio){return(
bio
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Date](/@observablehq/input-date)

Choose a date, or a date and time. [Examples ›](/@observablehq/input-date) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#date)`
)});
  main.variable(observer("viewof birthday")).define("viewof birthday", ["Inputs"], function(Inputs){return(
Inputs.date({label: "Birthday"})
)});
  main.variable(observer("birthday")).define("birthday", ["Generators", "viewof birthday"], (G, _) => G.input(_));
  main.variable(observer()).define(["birthday"], function(birthday){return(
birthday
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Color](/@observablehq/input-color)

Choose a color. [Examples ›](/@observablehq/input-color) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#color)`
)});
  main.variable(observer("viewof color")).define("viewof color", ["Inputs"], function(Inputs){return(
Inputs.color({label: "Favorite color", value: "#4682b4"})
)});
  main.variable(observer("color")).define("color", ["Generators", "viewof color"], (G, _) => G.input(_));
  main.variable(observer()).define(["color"], function(color){return(
color
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [File](/@observablehq/input-file)

Choose a local file. [Examples ›](/@observablehq/input-file) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#file)`
)});
  main.variable(observer("viewof file")).define("viewof file", ["Inputs"], function(Inputs){return(
Inputs.file({label: "CSV file", accept: ".csv", required: true})
)});
  main.variable(observer("file")).define("file", ["Generators", "viewof file"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["file"], function(file){return(
file.csv({typed: true})
)});
  main.variable(observer("tables")).define("tables", ["md"], function(md){return(
md`---
## Tabular data

These fancy inputs are designed to work with tabular data such as CSV or TSV [file attachments](/@observablehq/file-attachments) and [database clients](/@observablehq/databases).

* [Search](/@observablehq/input-search) - query a tabular dataset
* [Table](/@observablehq/input-table) - browse a tabular dataset`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Search](/@observablehq/input-search)

Query a tabular dataset. [Examples ›](/@observablehq/input-search) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#search)`
)});
  main.variable(observer("viewof search")).define("viewof search", ["Inputs","capitals"], function(Inputs,capitals){return(
Inputs.search(capitals, {placeholder: "Search U.S. capitals"})
)});
  main.variable(observer("search")).define("search", ["Generators", "viewof search"], (G, _) => G.input(_));
  main.variable(observer()).define(["search"], function(search){return(
search
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---
### [Table](/@observablehq/input-table)

Browse a tabular dataset. [Examples ›](/@observablehq/input-table) [API Reference ›](https://github.com/observablehq/inputs/blob/main/README.md#table)`
)});
  main.variable(observer("viewof rows")).define("viewof rows", ["Inputs","search"], function(Inputs,search){return(
Inputs.table(search)
)});
  main.variable(observer("rows")).define("rows", ["Generators", "viewof rows"], (G, _) => G.input(_));
  main.variable(observer()).define(["rows"], function(rows){return(
rows
)});
  main.variable(observer("techniques")).define("techniques", ["md"], function(md){return(
md`---
## And more!

Got the basics? Here are a few more advanced techniques:

* [Form](/@observablehq/input-form) - combine multiple inputs for a compact display
* [Synchronized inputs](/@observablehq/synchronized-inputs) - bind two or more inputs
* [Introduction to Views](/@observablehq/introduction-to-views) - more on Observable’s viewof
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We are grateful to Jeremy Ashkenas for blazing the trail with [“The Grand Native Inputs Bazaar”](/@jashkenas/inputs). To migrate from Jeremy’s inputs to our new official inputs, consider our [legacy inputs](/@observablehq/legacy-inputs).`
)});
  main.variable(observer()).define(["md","Inputs","html"], function(md,Inputs,html){return(
md`For even more, consider these “friends & family” inputs and techniques shared by the Observable community:

${Inputs.table([
  [["2D Slider", "/d/98bbb19bf9e859ee"], "Fabian Iwand", "a two-dimensional range"],
  [["Binary Input", "/@rreusser/binary-input"], "Ricky Reusser", "bitwise IEEE floating point"],
  [["DIY inputs", "/@bartok32/diy-inputs"], "Bartosz Prusinowski", "inputs with fun, custom styles"],
  [["FineRange", "/@rreusser/fine-range"], "Ricky Reusser", "high-precision numeric control"],
  [["Form Input", "/@mbostock/form-input"], "Mike Bostock", "multiple inputs in single cell"],
  [["Inputs", "/@jashkenas/inputs"], "Jeremy Ashkenas", "the original"],
  [["Player", "/@oscar6echo/player"], "oscar6echo", "detailed timing control for animation"],
  [["Scrubber", "/@mbostock/scrubber"], "Mike Bostock", "play/pause/scrub control for animation"],
  [["Range Slider", "/@mootari/range-slider"], "Fabian Iwand", "a two-ended range"],
  [["Ternary Slider", "/@yurivish/ternary-slider"], "Yuri Vishnevsky", "a proportion of three values"],
  [["Data driven range sliders", "/@bumbeishvili/data-driven-range-sliders"], "David B.", "a range input with a histogram"],
  [["Snapping Histogram Slider", "/@trebor/snapping-histogram-slider"], "Robert Harris", "a range input with a histogram"],
  [["Inputs in grid", "/@bumbeishvili/input-groups"], "David B.", "combine multiple inputs into a compact grid"],
  [["List Input", "/@harrislapiroff/list-input"], "Harris L.", "enter more than one of something"],
  [["Copier", "/@mbostock/copier"], "Mike Bostock", "a button to copy to the clipboard"],
  [["Tangle", "/@mbostock/tangle"], "Mike Bostock", "Bret Victor-inspired inline scrubbable numbers"],
  [["Editor", "/@cmudig/editor"], "CMU Data Interaction Group", "code editor with syntax highlighting"],
  [["Color Scheme Picker", "/@zechasault/color-schemes-and-interpolators-picker"], "Zack Ciminera", "pick a D3 color scheme"],
  [["Easing Curve Editor", "/@nhogs/easing-graphs-editor"], "Nhogs", "create a custom easing curve"]
].map(([Name, Author, Description]) => ({Name, Author, Description})), {
  sort: "Name",
  rows: Infinity,
  layout: "auto",
  width: {
    "Description": "60%"
  },
  format: {
    Name: ([title, link]) => html`<a href=${link} target=_blank>${title}`
  }
})}

To share your reusable input or technique, please leave a comment.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Appendix`
)});
  main.variable(observer("capitals")).define("capitals", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("us-state-capitals.tsv").tsv({typed: true})
)});
  main.variable(observer("stateNames")).define("stateNames", ["capitals"], function(capitals){return(
capitals.map(d => d.State)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The cells below provide deprecated aliases for older versions of Inputs. Please use Inputs.button *etc.* instead of importing from this notebook.`
)});
  main.variable(observer("Button")).define("Button", ["Inputs"], function(Inputs){return(
Inputs.button
)});
  main.variable(observer("Toggle")).define("Toggle", ["Inputs"], function(Inputs){return(
Inputs.toggle
)});
  main.variable(observer("Radio")).define("Radio", ["Inputs"], function(Inputs){return(
Inputs.radio
)});
  main.variable(observer("Checkbox")).define("Checkbox", ["Inputs"], function(Inputs){return(
Inputs.checkbox
)});
  main.variable(observer("Range")).define("Range", ["Inputs"], function(Inputs){return(
Inputs.range
)});
  main.variable(observer("Select")).define("Select", ["Inputs"], function(Inputs){return(
Inputs.select
)});
  main.variable(observer("Text")).define("Text", ["Inputs"], function(Inputs){return(
Inputs.text
)});
  main.variable(observer("Textarea")).define("Textarea", ["Inputs"], function(Inputs){return(
Inputs.textarea
)});
  main.variable(observer("Search")).define("Search", ["Inputs"], function(Inputs){return(
Inputs.search
)});
  main.variable(observer("Table")).define("Table", ["Inputs"], function(Inputs){return(
Inputs.table
)});
  main.variable(observer("Input")).define("Input", ["Inputs"], function(Inputs){return(
Inputs.input
)});
  main.variable(observer("bind")).define("bind", ["Inputs"], function(Inputs){return(
Inputs.bind
)});
  main.variable(observer("disposal")).define("disposal", ["Inputs"], function(Inputs){return(
Inputs.disposal
)});
  main.variable(observer("svg")).define("svg", ["htl"], function(htl){return(
htl.svg
)});
  main.variable(observer("html")).define("html", ["htl"], function(htl){return(
htl.html
)});
  return main;
}
