// https://observablehq.com/@mbostock/localfile@112
function _1(md){return(
md`# LocalFile

<p style="background: #fffced; box-sizing: border-box; padding: 10px 20px;">***Update Oct. 2021:*** *Observable now supports [**file inputs**](/@observablehq/input-file)! This notebook will remain for history, but please upgrade to [Observable Inputs](/@observablehq/inputs).*</p>

A hack to treat a local file as an Observable FileAttachment, so that you get all the same conveniences (*e.g.*, loading CSV or SQLite). Pass the *value* option to set the initial value to a file attachment.`
)}

function _file(localFileInput){return(
localFileInput({accept: ".db"})
)}

function _db(file){return(
file.sqlite()
)}

function _4(db){return(
db.describe()
)}

function _localFileInput(htl,LocalFile){return(
function localFileInput({
  accept, // e.g., ".txt,.md"
  value // set the initial value (typically to a FileAttachment)
} = {}) {
  return Object.assign(htl.html`<form><input type=file ${{accept}} oninput=${(event) => {
    const {currentTarget: input} = event;
    const {form, files: [file]} = input;
    form.value = new LocalFile(file);
  }}>`, {value});
}
)}

function _LocalFile(AbstractFile){return(
class LocalFile extends AbstractFile {
  constructor(file) {
    super(file.name);
    Object.defineProperty(this, "_", {value: file});
    Object.defineProperty(this, "_url", {writable: true});
  }
  async url() {
    return this._url || (this._url = URL.createObjectURL(this._));
  }
  async blob() {
    return this._;
  }
  async stream() {
    return this._.stream();
  }
}
)}

function _AbstractFile(FileAttachment){return(
FileAttachment("empty@1").constructor.__proto__
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["empty@1",new URL("./files/aaf5ec330f0dfd9b95a227670f343e20580ad90dc63af4ae39c38035b5a48001b3a57a354a5a3033ac3b336dc6dffa189021d093b9c9ac83e1e9fae64a08f352",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof file")).define("viewof file", ["localFileInput"], _file);
  main.variable(observer("file")).define("file", ["Generators", "viewof file"], (G, _) => G.input(_));
  main.variable(observer("db")).define("db", ["file"], _db);
  main.variable(observer()).define(["db"], _4);
  main.variable(observer("localFileInput")).define("localFileInput", ["htl","LocalFile"], _localFileInput);
  main.variable(observer("LocalFile")).define("LocalFile", ["AbstractFile"], _LocalFile);
  main.variable(observer("AbstractFile")).define("AbstractFile", ["FileAttachment"], _AbstractFile);
  return main;
}
