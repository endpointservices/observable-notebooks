import define1 from "./f92778131fd76559@1212.js";
import define2 from "./58f3eb7334551ae6@215.js";

function _1(md){return(
md`# Data Editor 

Reorderable, editable, selectable, table of views that is also backwritable. 

~~~js
  import {dataEditor} from '@tomlarkworthy/dataeditor'
~~~

Thanks [@jashkenas/select-order-input](/@jashkenas/select-order-input) for figuring out the tricky drag business.
`
)}

function _2(md){return(
md`## Example`
)}

function _3(md,example){return(
md`${example.data.map(e => `${e.type}: **${e.name}**(${e.qty})`).join(", ")}`
)}

function _4(md){return(
md`### Open Issues

- does not play well with [shareview](/@tomlarkworthy/shareview), see [repro](https://observablehq.com/d/3f62e88eeeac7418) (more [shareview](/@tomlarkworthy/shareview)'s issues)
   - selection breaks for no good reason (and is not backwritable anyway).
`
)}

function _5(example){return(
example
)}

function _selectable(Inputs){return(
Inputs.toggle({
  label: "select?",
  value: true
})
)}

function _deletable(Inputs){return(
Inputs.toggle({
  label: "delete?",
  value: true
})
)}

function _example(dataEditor,Inputs,selectable,deletable){return(
dataEditor(
  [
    { qty: 1, name: "Peas", type: "vegetable" },
    { qty: 50, name: "Apples", type: "fruit" },
    { qty: 12, name: "Bananas", type: "fruit" },
    { qty: 13, name: "Pears", type: "fruit" },
    { qty: 63, name: "Broccoli", type: "vegetable" },
    { qty: 10, name: "Cabbage", type: "vegetable" },
    { qty: 14, name: "Starfruit", type: "fruit" },
    { qty: 53, name: "Passionfruit", type: "fruit" },
    { qty: 12, name: "Carrots", type: "vegetable" },
    { qty: 1, name: "Potatoes", type: "vegetable" },
    { qty: 0, name: "Cabbage", type: "vegetable" },
    { qty: 44, name: "Lemons", type: "fruit" },
    { qty: 54, name: "Nuts", type: "vegetable" },
    { qty: 12, name: "Sugar cane", type: "vegetable" },
    { qty: 12, name: "Coconuts", type: "fruit" },
    { qty: 13, name: "Seeds", type: "fruit" },
    { qty: 63, name: "Corn", type: "vegetable" },
    { qty: 10, name: "Grapefruit", type: "vegetable" }
  ],
  {
    columns: ["qty", "type", "name"],
    format: {
      qty: (d) =>
        Inputs.range([0, 100], {
          value: d
        }),
      type: (d) =>
        Inputs.select(["fruit", "vegetable"], {
          value: d
        })
    },
    width: {
      qty: "100px",
      type: "100px",
      name: "100%"
    },
    tableclass: "veg",
    stylesheet: `
      .veg {
        background-color: #fff;
      }
      .col-qty form {
        width: 100px
      }
      .col-type form {
        width: 100px
      }
      .veg input[type=range] {
        display: none;
      }
    `,
    select: selectable,
    delete: deletable
  }
)
)}

function _9(md){return(
md`You can add add/delete rows by assigning to the **data** subview. This can be useful for external input forms to add/remove elements. Note it does not raise an input event itself`
)}

function _10(view,Inputs,example,$0,Event)
{
  let newItem = view`
    ${[
      "name",
      Inputs.text({
        label: "name",
        placeholder: "enter item name"
      })
    ]}
    ${[
      "qty",
      Inputs.range([0, 100], {
        label: "qty",
        value: 1,
        step: 1
      })
    ]}

    ${[
      "type",
      Inputs.select(["fruit", "vegetable"], {
        label: "type"
      })
    ]}

    ${Inputs.button("Add Item", {
      reduce: () => {
        example.data = [...example.data, newItem.value];
        $0.dispatchEvent(new Event("input", { bubbles: true }));
      }
    })}
  `;

  return newItem;
}


function _dataEditor(Inputs,view,topBorder,bottomBorder,handle,html,htl,getTr,Event,reset,dragBorder,_,oninput){return(
function dataEditor(
  data,
  options = {
    select: true,
    delete: true
  }
) {
  if (options.select !== false) options.select = true;
  if (options.delete !== false) options.delete = true;

  let dragging = null;
  let dragover = null;
  const selected = Inputs.input({});
  if (!options.tableclass)
    options.tableclass = options.tableClass || "dataeditor";
  if (!options.columns) options.columns = Object.keys(data[0]);

  const row = (row) => {
    const rowEl = view`<tr style="border-top: ${topBorder}; border-bottom: ${bottomBorder}"">
      <td draggable="true">
        ${handle()}
      </td>
      ${
        options.select
          ? html`<td><input class="rowselect" type="checkbox" style="vertical-align: baseline; margin-right: 8px"/></td>`
          : ""
      }
      ${
        options.delete
          ? htl.html`<td><button style="width:30px; height:30px;" onclick=${() => {
              const index = [...table.data].findIndex(
                (e) => e === getTr(rowEl)
              );
              table.splice(index, 1);
              table.dispatchEvent(new Event("input", { bubbles: true }));
            }}>❌</button></td>`
          : ""
      }
      
        ${[
          "...",
          Object.fromEntries(
            options.columns.map((column, ci) => [
              column,
              view`<td class="col-${column}">${[
                "...",
                (options.format || {})[column]
                  ? options.format[column](row[column])
                  : Inputs.text({ value: row[column], disabled: true })
              ]}
              </td>`
            ])
          )
        ]}
    </tr>`;
    return rowEl;
  };

  const table = view`<table class=${options.tableclass} >
    <!-- ${["selected", selected]} -->
  <style>
    .${options.tableclass} {
      overflow-y: scroll;
      max-height: 400px;
      table-layout: fixed;
      display: block;
      max-width: 900px;
      width: 900px;
    }

    .${options.tableclass} th {
      position: sticky;
      top: 0;
      background-color: white;
    }
    .${options.tableclass} thead > tr {
      position: sticky;
      top: 0;
    }
    ${options.stylesheet}
  </style>
  <thead>
    <tr>
    <th style="width:20px;"></th>
    ${options.select ? html`<th style="width:20px;"></th>` : ""}
    ${options.delete ? html`<th style="width:40px;"></th>` : ""}
    ${options.columns.map(
      (column, ci) => view`<th style=${{
        width: (options?.width || {})[column]
      }}>
        ${column}
      </th>`
    )}
    </tr>
  </thead>
  <tbody>
    ${["data", data.map(row), row]}
  </tbody></table>`;

  table.addEventListener("input", (evt) => {
    const checkboxes = [...table.querySelectorAll(".rowselect")];
    Object.keys(selected.value).forEach((i) => {
      console.log(i);
      if (i >= checkboxes.length || !checkboxes[i].checked) {
        delete selected.value[i];
      }
    });
    checkboxes.map((c, i) => {
      if (c.checked) selected.value[i] = true;
    });
  });

  function splice(index, numDelete, ...items) {
    const newData = [...table.data];
    newData.splice(
      index,
      numDelete,
      ...items.map((item, itemIndex) => row(item))
    );
    table.data.value = newData.map((sv) => sv.value);
  }

  function ondragstart(event) {
    var target = getTr(event.target);
    dragging = target;
    if (event.dataTransfer) event.dataTransfer.setData("text/plain", null);
  }

  function ondragover(event, eventTarget, clientY) {
    event.preventDefault();
    var target = getTr(eventTarget || event.target);
    if (!target) {
      reset(dragover);
      dragover = undefined;
    }
    var bounding = target.getBoundingClientRect();
    var offset = bounding.y + bounding.height / 2;

    reset(dragover);
    dragover = target;

    if ((clientY || event.clientY) - offset > 0) {
      target.style["border-bottom"] = dragBorder;
      target.style["border-top"] = topBorder;
      target.inserting = "below";
    } else {
      target.style["border-top"] = dragBorder;
      target.style["border-bottom"] = bottomBorder;
      target.inserting = "above";
    }
  }

  function ondragleave(event) {
    reset(dragover);
    dragover = null;
  }

  function ondrop(event) {
    event.preventDefault();
    const index = [...table.data].findIndex((e) => e === dragging);
    const newData = [
      ...[...table.data].slice(0, index),
      ...[...table.data].slice(index + 1, table.data.length)
    ];

    if (dragover.inserting === "below") {
      const insert = newData.findIndex((e) => e === dragover.nextSibling);
      newData.splice(insert === -1 ? newData.length : insert, 0, dragging);
    } else {
      const insert = newData.findIndex((e) => e === dragover);
      newData.splice(insert, 0, dragging);
    }
    reset(dragover);
    dragover = null;
    debugger;
    table.data.value = _.cloneDeep(newData.map((row) => row.value));
    const newEvent = new Event("input", { bubbles: true });
    newEvent.isUser = true;
    table.dispatchEvent(newEvent);
  }

  function ontouchstart(event) {
    if (event.target.draggable) {
      ondragstart(event);
    }
  }

  function ontouchmove(event) {
    if (dragging) {
      const target = document.elementFromPoint(
        event.touches[0].clientX,
        event.touches[0].clientY
      );
      if (target) {
        ondragover(event, target, event.touches[0].clientY);
      } else {
        reset(dragover);
        dragover = null;
      }
    }
  }

  function ontouchend(event) {
    if (dragging) {
      if (dragover) {
        ondrop(event);
      }
      ondragleave(event);
    }
    dragging = null;
  }

  return Object.assign(table, {
    splice,
    ondragstart,
    ondragover,
    ondragleave,
    ondrop,
    oninput,
    ontouchstart,
    ontouchmove,
    ontouchend
  });
}
)}

function _12(md){return(
md`---`
)}

function _reset(topBorder,bottomBorder){return(
function reset(li) {
  if (li) {
    li.style['border-top'] = topBorder;
    li.style['border-bottom'] = bottomBorder;
  }
}
)}

function _getTr(){return(
function getTr(target) {
  if (!target) return false;
  while (
    target.nodeName.toLowerCase() != 'tr' &&
    target.nodeName.toLowerCase() != 'table'
  ) {
    target = target.parentNode;
  }
  if (
    target.nodeName.toLowerCase() == 'table' ||
    target.parentNode.nodeName.toLowerCase() == 'thead'
  ) {
    return false;
  } else {
    return target;
  }
}
)}

function _bottomBorder(){return(
'solid 1px #ddd'
)}

function _topBorder(){return(
'solid 1px transparent'
)}

function _dragBorder(){return(
'solid 3px blue'
)}

function _18(htl,handle){return(
htl.html`${handle()}`
)}

function _handle(html)
{
  const template = document.createElement("template");
  // Attaching the SVG as file had problems, we we jsut put it in as a literal for now
  // https://github.com/observablehq/feedback/issues/202
  template.content.appendChild(
    html`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>`
  );
  return () => template.content.cloneNode(true);
}


function _22(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md","example"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["example"], _5);
  main.variable(observer("viewof selectable")).define("viewof selectable", ["Inputs"], _selectable);
  main.variable(observer("selectable")).define("selectable", ["Generators", "viewof selectable"], (G, _) => G.input(_));
  main.variable(observer("viewof deletable")).define("viewof deletable", ["Inputs"], _deletable);
  main.variable(observer("deletable")).define("deletable", ["Generators", "viewof deletable"], (G, _) => G.input(_));
  main.variable(observer("viewof example")).define("viewof example", ["dataEditor","Inputs","selectable","deletable"], _example);
  main.variable(observer("example")).define("example", ["Generators", "viewof example"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["view","Inputs","example","viewof example","Event"], _10);
  main.variable(observer("dataEditor")).define("dataEditor", ["Inputs","view","topBorder","bottomBorder","handle","html","htl","getTr","Event","reset","dragBorder","_","oninput"], _dataEditor);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("reset")).define("reset", ["topBorder","bottomBorder"], _reset);
  main.variable(observer("getTr")).define("getTr", _getTr);
  main.variable(observer("bottomBorder")).define("bottomBorder", _bottomBorder);
  main.variable(observer("topBorder")).define("topBorder", _topBorder);
  main.variable(observer("dragBorder")).define("dragBorder", _dragBorder);
  main.variable(observer()).define(["htl","handle"], _18);
  main.variable(observer("handle")).define("handle", ["html"], _handle);
  const child1 = runtime.module(define1);
  main.import("view", child1);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _22);
  return main;
}
