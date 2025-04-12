import define1 from "./e1c39d41e8e944b0@939.js";

function _1(md){return(
md`# Local FileAttachments

Attach files to notebooks without uploading them anywhere. Massive files, no problem! Offers programmatic access to the FileAttachments too.

~~~js
import {addFileAttachment, attachments, removeFileAttachment} from '@tomlarkworthy/fileattachments'
~~~`
)}

function _file(Inputs){return(
Inputs.file({ label: "add file" })
)}

function _attach_file(addFileAttachment,file){return(
addFileAttachment(file)
)}

function _4(md){return(
md`Files are stored in \`mutable attachments\` as a Map of \`filename => FileAttachment\` which updates reactively.`
)}

function _selected(Inputs,attachments){return(
Inputs.select(attachments, { label: "file attachments" })
)}

function _6(md){return(
md`The normal FileAttachment API is available so it plays nicely with other features like downloads.`
)}

function _download_selected(selected,DOM){return(
selected &&
  DOM.download(selected.blob(), selected.name, `Download ${selected.name}`)
)}

async function _size_bytes(selected){return(
selected && (await selected.arrayBuffer()).byteLength
)}

function _attachments(getFileAttachments){return(
getFileAttachments()
)}

function _jsonFileAttachment(createFileAttachment){return(
(name, obj) => {
  const str = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  return createFileAttachment(url, name, "application/json");
}
)}

function _createFileAttachment(FileAttachmentClass){return(
(url, name, mimeType) => {
  const file = new FileAttachmentClass(name, mimeType);
  Object.defineProperty(file, "url", { value: () => url });
  return file;
}
)}

function _addFileAttachment(getFileAttachmentsMap,main,$0,getFileAttachments){return(
async function addFileAttachment(file) {
  if (!file) return;
  getFileAttachmentsMap(main._builtins.get("FileAttachment")).set(
    file.name,
    await file.url()
  );
  $0.value = getFileAttachments();
}
)}

function _getFileAttachment(getFileAttachments){return(
(name) => getFileAttachments().get(name)
)}

function _removeFileAttachment(getFileAttachmentsMap,main,$0,getFileAttachments){return(
function (name) {
  getFileAttachmentsMap(main._builtins.get("FileAttachment")).delete(name);
  $0.value = getFileAttachments();
}
)}

function _getFileAttachments(main,getFileAttachmentsMap){return(
function getFileAttachments() {
  const FileAttachment = main._builtins.get("FileAttachment");
  return new Map(
    [...getFileAttachmentsMap(FileAttachment).entries()].map(
      ([name, payload]) => [name, FileAttachment.call(null, name)]
    )
  );
}
)}

function _getFileAttachmentsMap(){return(
(FileAttachment) => {
  let fileMap;
  const backup_get = Map.prototype.get;
  const backup_has = Map.prototype.has;
  Map.prototype.has = Map.prototype.get = function (...args) {
    fileMap = this;
  };
  try {
    FileAttachment("");
  } catch (e) {}
  Map.prototype.has = backup_has;
  Map.prototype.get = backup_get;
  return fileMap;
}
)}

function _FileAttachmentClass(sampleFileAttachment)
{
  return sampleFileAttachment.__proto__.__proto__.constructor;
}


function _fileInput(Inputs){return(
Inputs.file()
)}

function _plainFile(){return(
new File([], "cool")
)}

function _sampleFileAttachment(DataTransfer,plainFile,$0,Event)
{
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(plainFile);
  $0[0].files = dataTransfer.files;
  $0[0].dispatchEvent(new Event("input"));
  return $0.value;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof file")).define("viewof file", ["Inputs"], _file);
  main.variable(observer("file")).define("file", ["Generators", "viewof file"], (G, _) => G.input(_));
  main.variable(observer("attach_file")).define("attach_file", ["addFileAttachment","file"], _attach_file);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof selected")).define("viewof selected", ["Inputs","attachments"], _selected);
  main.variable(observer("selected")).define("selected", ["Generators", "viewof selected"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("download_selected")).define("download_selected", ["selected","DOM"], _download_selected);
  main.variable(observer("size_bytes")).define("size_bytes", ["selected"], _size_bytes);
  main.define("initial attachments", ["getFileAttachments"], _attachments);
  main.variable(observer("mutable attachments")).define("mutable attachments", ["Mutable", "initial attachments"], (M, _) => new M(_));
  main.variable(observer("attachments")).define("attachments", ["mutable attachments"], _ => _.generator);
  main.variable(observer("jsonFileAttachment")).define("jsonFileAttachment", ["createFileAttachment"], _jsonFileAttachment);
  main.variable(observer("createFileAttachment")).define("createFileAttachment", ["FileAttachmentClass"], _createFileAttachment);
  main.variable(observer("addFileAttachment")).define("addFileAttachment", ["getFileAttachmentsMap","main","mutable attachments","getFileAttachments"], _addFileAttachment);
  main.variable(observer("getFileAttachment")).define("getFileAttachment", ["getFileAttachments"], _getFileAttachment);
  main.variable(observer("removeFileAttachment")).define("removeFileAttachment", ["getFileAttachmentsMap","main","mutable attachments","getFileAttachments"], _removeFileAttachment);
  main.variable(observer("getFileAttachments")).define("getFileAttachments", ["main","getFileAttachmentsMap"], _getFileAttachments);
  main.variable(observer("getFileAttachmentsMap")).define("getFileAttachmentsMap", _getFileAttachmentsMap);
  main.variable(observer("FileAttachmentClass")).define("FileAttachmentClass", ["sampleFileAttachment"], _FileAttachmentClass);
  const child1 = runtime.module(define1);
  main.import("runtime", child1);
  main.import("main", child1);
  main.variable(observer("viewof fileInput")).define("viewof fileInput", ["Inputs"], _fileInput);
  main.variable(observer("fileInput")).define("fileInput", ["Generators", "viewof fileInput"], (G, _) => G.input(_));
  main.variable(observer("plainFile")).define("plainFile", _plainFile);
  main.variable(observer("sampleFileAttachment")).define("sampleFileAttachment", ["DataTransfer","plainFile","viewof fileInput","Event"], _sampleFileAttachment);
  return main;
}
