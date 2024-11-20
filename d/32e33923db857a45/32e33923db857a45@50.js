function _1(md){return(
md`# FileUpload
`
)}

function _file_input(htl){return(
htl.html`<input type="file">`
)}

function _file(file_input){return(
file_input.files[0]
)}

function _reader(){return(
new FileReader()
)}

function _dataString(reader,file)
{
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        resolve(reader.result);
      },
      false
    );
  });
}


function _base64(dataString){return(
dataString.replace("data:image/png;base64,", "")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("file_input")).define("file_input", ["htl"], _file_input);
  main.variable(observer("file")).define("file", ["file_input"], _file);
  main.variable(observer("reader")).define("reader", _reader);
  main.variable(observer("dataString")).define("dataString", ["reader","file"], _dataString);
  main.variable(observer("base64")).define("base64", ["dataString"], _base64);
  return main;
}
