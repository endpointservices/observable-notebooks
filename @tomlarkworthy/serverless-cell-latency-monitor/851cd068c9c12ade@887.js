function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none">Table Input / Observable Inputs</h1><a href="/@observablehq/inputs">Observable Inputs</a> › Table · <a href="https://github.com/observablehq/inputs/blob/main/README.md#table">API</a></div>

# Input: Table

A Table displays tabular data. It’s fast: rows are rendered lazily on scroll. It sorts: click a header to sort, and click again to reverse. And it selects: click a checkbox on any row, and the selected rows are exported as a view value. (And for searching, see the [Search input](/@observablehq/input-search).) For more applied examples, see [Hello, Inputs!](/@observablehq/hello-inputs)`
)}

function _2(md){return(
md`By default, all columns are visible. Only the first dozen rows are initially visible, but you can scroll to see more. Column headers are fixed for readability.`
)}

function _penguins(FileAttachment){return(
FileAttachment("penguins.csv").csv({typed: true})
)}

function _4(Inputs,penguins){return(
Inputs.table(penguins)
)}

function _5(md){return(
md`To show a subset of columns, or to reorder them, pass an array of property names
as the _columns_ option. By default, columns are inferred from _data_.columns if
present, and otherwise by iterating over the data to union the property names.

The _header_ option lets you redefine the column title; this doesn’t change the
name used to reference the data.
`
)}

function _6(penguins){return(
penguins.columns
)}

function _7(Inputs,penguins){return(
Inputs.table(penguins, {
  columns: [
    "species",
    "culmen_length_mm",
    "culmen_depth_mm",
    "flipper_length_mm"
  ],
  header: {
    species: "Penguin Species",
    culmen_length_mm: "Culmen length (mm)",
    flipper_length_mm: "Flipper length (mm)",
    culmen_depth_mm: "Culmen Depth (mm)"
  }
})
)}

function _8(md){return(
md`By default, rows are displayed in input order. You can change the order by
specifying the name of a column to _sort_ by, and optionally the _reverse_
option for descending order. The male Gentoo penguins are the largest in this
dataset, for example. Undefined values go to the end.
`
)}

function _9(Inputs,penguins){return(
Inputs.table(penguins, {sort: "body_mass_g", reverse: true})
)}

function _10(md){return(
md`Tables are [view-compatible](/@observablehq/introduction-to-views): using the
viewof operator, you can use a table to select rows and refer to them from other
cells, say to chart a subset of the data. Click the checkbox on the left edge of
a row to select it, and click the checkbox in the header row to clear the
selection. You can shift-click to select a range of rows.
`
)}

function _selection(Inputs,penguins){return(
Inputs.table(penguins, {required: false})
)}

function _12(selection){return(
selection
)}

function _13(md){return(
md`The _required_ option determines the selection when no items are selected from
the table. If it is true (default), the selection contains the full dataset.
Otherwise, the selection is empty.
`
)}

function _14(md){return(
md`The table component assumes that all values in a given column are the same type,
and chooses a suitable formatter based on the first non-null value in each
column.

- Numbers are formatted using
  [_number_.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString);
- Dates are formatted in [ISO8601](https://en.wikipedia.org/wiki/ISO_8601);
- undefined and NaN values are empty;
- everything else is displayed as-is.

To override the default formatting, pass _format_ options for the desired
columns.
`
)}

function _15(Inputs,penguins){return(
Inputs.table(penguins, {
  format: {
    culmen_length_mm: x => x.toFixed(1),
    culmen_depth_mm: x => x.toFixed(1),
    sex: x => x === "MALE" ? "M" : x === "FEMALE" ? "F" : ""
  }
})
)}

function _16(md){return(
md`The _format_ function can return a text string or an HTML element.  
For example, this can be used to render inline visualizations such as bars or [sparklines](/@mbostock/covid-cases-by-state).`
)}

function _17(Inputs,penguins,sparkbar,d3){return(
Inputs.table(penguins, {
  format: {
    culmen_length_mm: sparkbar(d3.max(penguins, d => d.culmen_length_mm)),
    culmen_depth_mm: sparkbar(d3.max(penguins, d => d.culmen_depth_mm)),
    flipper_length_mm: sparkbar(d3.max(penguins, d => d.flipper_length_mm)),
    body_mass_g: sparkbar(d3.max(penguins, d => d.body_mass_g)),
    sex: x => x.toLowerCase()
  }
})
)}

function _sparkbar(htl){return(
function sparkbar(max) {
  return x => htl.html`<div style="
    background: lightblue;
    width: ${100 * x / max}%;
    float: right;
    padding-right: 3px;
    box-sizing: border-box;
    overflow: visible;
    display: flex;
    justify-content: end;">${x.toLocaleString("en")}`
}
)}

function _19(md){return(
md`There’s a similar _width_ option if you want to give certain columns specific
widths. The table component defaults to a fixed _layout_ if there are twelve or
fewer columns; this improves performance and avoids reflow when scrolling.

You can switch _layout_ to auto if you prefer sizing columns based on content.
This makes the columns widths resize with the data, which can cause the columns
to jump around as the user scrolls. A horizontal scroll bar is added if the
total width exceeds the table’s width.

Set _layout_ to fixed to pack all the columns into the width of the table.
`
)}

function _20(md){return(
md`The table’s width can be controlled by the _width_ option, in pixels. Individual
column widths can alternatively be defined by specifying an object with column
names as keys, and widths as values. Use the _maxWidth_ option if the sum of
column widths exceeds the desired table’s width.

The _align_ option allows to change the text-alignment of cells, which can be
right, left, or center; it defaults to right for numeric columns, and left for
everything else.

The _rows_ option indicates the number of rows to display; it defaults to 11.5.
The _height_ and _maxHeight_ options respectively set the height and maximum
height of the table, in pixels. The height defaults to (rows + 1) \\* 22 - 1.
`
)}

function _21(Inputs,penguins){return(
Inputs.table(penguins, {
  width: {
    culmen_length_mm: 140,
    culmen_depth_mm: 140,
    flipper_length_mm: 140
  },
  align: {
    culmen_length_mm: "right",
    culmen_depth_mm: "center",
    flipper_length_mm: "left"
  },
  rows: 18,
  maxWidth: 840,
  multiple: false,
  layout: "fixed"
})
)}

function _22(md){return(
md`You can preselect some rows in the table by setting the _value_ option to an
array of references to the actual objects in your data.

For example, to preselect the first two items, you could write:

> \`\`\`js
>  {value: penguins.slice(0, 2)})
> \`\`\`

or, if you just want to preselect the rows 1, 3, 7 and 9:

> \`\`\`js
> { value: penguins.filter((_,i)=>  [1, 3, 7, 9].includes(i))}
> \`\`\`

The _multiple_ option allows multiple rows to be selected (defaults to true).
When false, only one row can be selected. To set the initial value in that case,
just reference the preselected object:

> \`\`\`js
> { multiple: false, value: penguins[4] }
> \`\`\`
`
)}

function _23(Inputs,penguins){return(
Inputs.table(penguins, {
  value: penguins.filter((_, i) => [1, 3, 7, 9].includes(i)),
  multiple: true
})
)}

function _24(md){return(
md`---

## Appendix`
)}

function _25(md){return(
md`Thanks to [Ilyá Belsky](https://observablehq.com/@oluckyman) and [Brett Cooper](https://observablehq.com/@hellonearthis) for suggestions.`
)}

function _Table(Inputs){return(
Inputs.table
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["penguins.csv", {url: new URL("./files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("penguins")).define("penguins", ["FileAttachment"], _penguins);
  main.variable(observer()).define(["Inputs","penguins"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["penguins"], _6);
  main.variable(observer()).define(["Inputs","penguins"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["Inputs","penguins"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof selection")).define("viewof selection", ["Inputs","penguins"], _selection);
  main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
  main.variable(observer()).define(["selection"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["Inputs","penguins"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Inputs","penguins","sparkbar","d3"], _17);
  main.variable(observer("sparkbar")).define("sparkbar", ["htl"], _sparkbar);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["Inputs","penguins"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["Inputs","penguins"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("Table")).define("Table", ["Inputs"], _Table);
  return main;
}
