function _content_editable(htl){return(
htl.html`<div id='editor' contenteditable>
  <h1>Content Editable</h1>
  <p>Some text that you can format. Try inserting an image or a link.</p>
  <p>
    original <a href="https://codepen.io/Shokeen/pen/QyvPMw">source</a>, MIT <a href="https://blog.codepen.io/documentation/licensing/">license</a>
  </p>
</div>
<div class="toolbar">
  <a href="#" data-command='undo'><i class='fa fa-undo'></i></a>
  <a href="#" data-command='redo'><i class='fa fa-repeat'></i></a>
  <div class="fore-wrapper"><i class='fa fa-font' style='color:#C96;'></i>
    <div class="fore-palette">
    </div>
  </div>
  <div class="back-wrapper"><i class='fa fa-font' style='background:#C96;'></i>
    <div class="back-palette">
    </div>
  </div>
  <a href="#" data-command='bold'><i class='fa fa-bold'></i></a>
  <a href="#" data-command='italic'><i class='fa fa-italic'></i></a>
  <a href="#" data-command='underline'><i class='fa fa-underline'></i></a>
  <a href="#" data-command='strikeThrough'><i class='fa fa-strikethrough'></i></a>
  <a href="#" data-command='justifyLeft'><i class='fa fa-align-left'></i></a>
  <a href="#" data-command='justifyCenter'><i class='fa fa-align-center'></i></a>
  <a href="#" data-command='justifyRight'><i class='fa fa-align-right'></i></a>
  <a href="#" data-command='justifyFull'><i class='fa fa-align-justify'></i></a>
  <a href="#" data-command='indent'><i class='fa fa-indent'></i></a>
  <a href="#" data-command='outdent'><i class='fa fa-outdent'></i></a>
  <a href="#" data-command='insertUnorderedList'><i class='fa fa-list-ul'></i></a>
  <a href="#" data-command='insertOrderedList'><i class='fa fa-list-ol'></i></a>
  <a href="#" data-command='h1'>H1</a>
  <a href="#" data-command='h2'>H2</a>
  <a href="#" data-command='createlink'><i class='fa fa-link'></i></a>
  <a href="#" data-command='unlink'><i class='fa fa-unlink'></i></a>
  <a href="#" data-command='insertimage'><i class='fa fa-image'></i></a>
  <a href="#" data-command='p'>P</a>
  <a href="#" data-command='subscript'><i class='fa fa-subscript'></i></a>
  <a href="#" data-command='superscript'><i class='fa fa-superscript'></i></a>
</div>`
)}

function _2(content_editable){return(
content_editable.outerHTML
)}

function _3(htl){return(
htl.html`<style>
body {
  margin: 0 auto;
  font-family: 'Dosis';
}

a{
  cursor:pointer;
}

#editor {
  box-shadow: 0 0 2px #CCC;
  min-height: 150px;
  overflow: auto;
  padding: 1em;
  margin-top: 20px;
  resize: vertical;
  outline: none;
}

.toolbar {
  text-align: center;
}

.toolbar a,
.fore-wrapper,
.back-wrapper {
  border: 1px solid #AAA;
  background: #FFF;
  font-family: 'Candal';
  border-radius: 1px;
  color: black;
  padding: 5px;
  width: 1.5em;
  margin: -2px;
  margin-top: 10px;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0px 1px 0px #CCC;
}

.toolbar a:hover, .fore-wrapper:hover, .back-wrapper:hover {
  background: #f2f2f2;
  border-color: #8c8c8c;
}

a[data-command='redo'],a[data-command='strikeThrough'],a[data-command='justifyFull'],a[data-command='insertOrderedList'],a[data-command='outdent'],a[data-command='p'],a[data-command='superscript']{
  margin-right:5px;
  border-radius:0 3px 3px 0;
}

a[data-command='undo'],.fore-wrapper,a[data-command='justifyLeft'],a[data-command='insertUnorderedList'],a[data-command='indent'],a[data-command='h1'],a[data-command='subscript']{
  border-radius:3px 0 0 3px;
}

a.palette-item {
  height: 1em;
  border-radius: 3px;
  margin: 2px 1px;
  width: 1em;
}

.fore-palette,
.back-palette {
  display: none;
}

.fore-wrapper,
.back-wrapper {
  display: inline-block;
  cursor: pointer;
}

.fore-wrapper:hover .fore-palette,
.back-wrapper:hover .back-palette {
  display: block;
  position: absolute;
  padding: 3px;
  width: 10em;
  background: #FFF;
  border: 1px solid #DDD;
  box-shadow: 0 0 5px #CCC;
  height: 4.4em;
}

.fore-palette a,
.back-palette a {
  background: #FFF;
  margin-bottom: 2px;
}
</style>
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.css">`
)}

function _4($,prompt)
{
  var colorPalette = [
    "000000",
    "FF9966",
    "6699FF",
    "99FF66",
    "CC0000",
    "00CC00",
    "0000CC",
    "333333",
    "0066FF",
    "FFFFFF"
  ];
  var forePalette = $(".fore-palette");
  var backPalette = $(".back-palette");

  for (var i = 0; i < colorPalette.length; i++) {
    forePalette.append(
      '<a href="#" data-command="forecolor" data-value="' +
        "#" +
        colorPalette[i] +
        '" style="background-color:' +
        "#" +
        colorPalette[i] +
        ';" class="palette-item"></a>'
    );
    backPalette.append(
      '<a href="#" data-command="backcolor" data-value="' +
        "#" +
        colorPalette[i] +
        '" style="background-color:' +
        "#" +
        colorPalette[i] +
        ';" class="palette-item"></a>'
    );
  }

  $(".toolbar a").click(function (e) {
    var command = $(this).data("command");
    if (command == "h1" || command == "h2" || command == "p") {
      document.execCommand("formatBlock", false, command);
    }
    if (command == "forecolor" || command == "backcolor") {
      document.execCommand(
        $(this).data("command"),
        false,
        $(this).data("value")
      );
    }
    if (command == "createlink" || command == "insertimage") {
      const url = prompt("Enter the link here: ", "http://");
      document.execCommand($(this).data("command"), false, url);
    } else document.execCommand($(this).data("command"), false, null);
  });
}


function _$(require){return(
require("jquery")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("content_editable")).define("content_editable", ["htl"], _content_editable);
  main.variable(observer()).define(["content_editable"], _2);
  main.variable(observer()).define(["htl"], _3);
  main.variable(observer()).define(["$","prompt"], _4);
  main.variable(observer("$")).define("$", ["require"], _$);
  return main;
}
