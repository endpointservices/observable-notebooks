import define1 from "./10c7899865f8a76e@8998.js";
import define2 from "./0e3d22b6a09eb1a7@25.js";
import define3 from "./98f34e974bb2e4bc@958.js";
import define4 from "./09fdee029150048c@446.js";

function _1(md){return(
md`# \`localState\` view
## dexie.js + fileattachments

Provides a local persistence (JSON serialisable data only) as a view. `
)}

function _text(Inputs,localState){return(
Inputs.bind(
  Inputs.textarea(),
  localState("demo", {
    value:
      "If you change the contents of this it will be remembered across restarts and synced to across tabs. Furthermore the changes will propogate to exports (cell below)"
  })
)
)}

function _3(exporter){return(
exporter()
)}

function _4(md){return(
md`## About
Values are stored in indexDB and restore after a page refresh. Changes are also flushed to fileAttachments and survive [export](https://observablehq.com/@tomlarkworthy/exporter-2). If you have multiple tabs opened they are synced.

You must assign a unique identifier for the cache key. You may also supply a default value if nothing is in the cache. It is easy to pollute your IndexDB with no longer used values, so lower down in the notebook is a list of all IndexDB entries and method for deleting them.

Stand alone usage:

~~~js
viewof state = localState("unique_id", {
    value: "default value"
})
~~~

Bound to a UI control:

~~~js
viewof control = Inputs.bind(
  Inputs.textarea(),
  localState("demo")
)
~~~

importing

~~~js
import {localState} from "@tomlarkworthy/local-state"
~~~

Can be viewed as an improved [@tomlarkworthy/local-storage-view](https://observablehq.com/@tomlarkworthy/local-storage-view), because now it reactive across tabs and JSON serialized by default and can hold *much* more data than is possible with local storage.`
)}

function _5(md){return(
md`#### IndexDB`
)}

function _selection(Inputs,content){return(
Inputs.table(content, {
  required: false,
  format: {
    data: JSON.stringify
  }
})
)}

function _7(Inputs,db,selection){return(
Inputs.button("delete selected", {
  reduce: () => {
    db.data.bulkDelete(selection.map((row) => row.uid));
  }
})
)}

function _8(md){return(
md`#### fileAttachments`
)}

function _9(getFileAttachments,localStateModule){return(
getFileAttachments(localStateModule)
)}

function _10(md){return(
md`## Sync Algorithm

This view keeps a piece of state in sync between two storage layers:

- **fileAttachments** – travel with the notebook when you export or fork it, and work across domains.
- **IndexedDB (via Dexie)** – lives in the browser and survives page reloads, but is limited to the current origin.

### How writes work

On every change:

1. The new value is written to **IndexedDB**.
2. The same value is written to a **fileAttachment**.
3. Each write is tagged with a **timestamp** (\\\`t\\\`), representing the time of the change.

### How reads (initial load) work

When the view is first read:

1. It loads the latest value from **fileAttachments** (if any).
2. It subscribes to **IndexedDB** via \\\`dexie.liveQuery\\\`.
3. When both sources are available, it picks the version with the **newer timestamp**:
   - If IndexedDB is newer, it wins.
   - If the fileAttachment is newer (or IndexedDB is empty), that wins.

Whichever source wins becomes the current value, is propagated to the view, and is immediately flushed back to the fileAttachment so future exports include the latest state.`
)}

function _content(Generators,dexie,db){return(
Generators.observe((notify) => {
  dexie.liveQuery(() => db.data.toArray()).subscribe({ next: notify });
})
)}

function _db(dexie){return(
new dexie.Dexie("localState").version(1).stores({
  data: "++uid"
}).db
)}

function _localState(EventTarget,dexie,_,setFileAttachment,jsonFileAttachment,localStateModule,Event,getFileAttachment){return(
(uid, { value = undefined } = {}) => {
  const filename = `${uid}.json`;
  if (!uid) throw "Provide a filename to store state";
  const view = new EventTarget();

  let initialized = false;
  let resolveFirstValue = undefined;
  let data = undefined;
  let t = -1;

  // setup dexie db
  const db = new dexie.Dexie("localState").version(1).stores({
    data: "++uid"
  }).db;

  const remoteChange = (doc, file) => {
    const change = (doc?.t || 0) > file?.t ? doc : file;
    if (change.t > t) {
      const previous = data;
      data = change.data;
      t = change.t;
      initialized = true;

      if (!_.isEqual(previous, data)) {
        setFileAttachment(
          jsonFileAttachment(filename, {
            t,
            data
          }),
          localStateModule
        );
        view.dispatchEvent(new Event("input"));
      }
    }
  };

  return Object.defineProperty(view, "value", {
    get: () => {
      if (initialized) return data;

      Promise.resolve().then(async () => {
        const file = (await getFileAttachment(
          filename,
          localStateModule
        )?.json()) || {
          t: 0,
          data: value
        };

        dexie
          .liveQuery(() => db.data.get(uid))
          .subscribe({ next: (doc) => remoteChange(doc, file) });
      });
      return value;
    },
    set: (newValue) => {
      const now = new Date().getTime();
      data = newValue;
      db.data.put({
        uid,
        t: now,
        data
      });
    }
  });
}
)}

function _localStateModule(thisModule){return(
thisModule()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof text")).define("viewof text", ["Inputs","localState"], _text);
  main.variable(observer("text")).define("text", ["Generators", "viewof text"], (G, _) => G.input(_));
  main.variable(observer()).define(["exporter"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof selection")).define("viewof selection", ["Inputs","content"], _selection);
  main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
  main.variable(observer()).define(["Inputs","db","selection"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["getFileAttachments","localStateModule"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("content")).define("content", ["Generators","dexie","db"], _content);
  main.variable(observer("db")).define("db", ["dexie"], _db);
  main.variable(observer("localState")).define("localState", ["EventTarget","dexie","_","setFileAttachment","jsonFileAttachment","localStateModule","Event","getFileAttachment"], _localState);
  main.variable(observer("viewof localStateModule")).define("viewof localStateModule", ["thisModule"], _localStateModule);
  main.variable(observer("localStateModule")).define("localStateModule", ["Generators", "viewof localStateModule"], (G, _) => G.input(_));
  const child1 = runtime.module(define1);
  main.import("exporter", child1);
  const child2 = runtime.module(define2);
  main.import("dexie", child2);
  const child3 = runtime.module(define3);
  main.import("find_with_tag", child3);
  main.import("variables", child3);
  main.import("getPromiseState", child3);
  main.import("viewof runtime_variables", child3);
  main.import("runtime_variables", child3);
  main.import("runtime", child3);
  main.import("thisModule", child3);
  const child4 = runtime.module(define4);
  main.import("getFileAttachment", child4);
  main.import("getFileAttachments", child4);
  main.import("setFileAttachment", child4);
  main.import("removeFileAttachment", child4);
  main.import("jsonFileAttachment", child4);
  main.import("createFileAttachment", child4);
  return main;
}
