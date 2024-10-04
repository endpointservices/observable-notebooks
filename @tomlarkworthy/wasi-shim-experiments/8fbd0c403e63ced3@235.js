// https://observablehq.com/@asg017/hello-xterm-js@235
function _1(md){return(
md`# Hello, Xterm.js!`
)}

function _2(md){return(
md`
This is just a playground terminal! It's not connected to any real backend server. For that, check out
[this]() notebook!`
)}

function _terminalContainer(xtermCSS,DOM)
{
  xtermCSS;
  const terminal = DOM.element("div");
  terminal.classList.add("xterm-container-observablehq");
  return terminal;
}


function _4(md){return(
md`## Importing

\`\`\`js
import {Terminal, terminalContainer, xtermCSS} from '@asg017/hello-xterm-js'

Terminal // xterm js object, do stuff like Terminal.on('', ()=>...), Terminal.write('data')....

terminalContainer // html element of the actual Terminal

xtermCSS // CSS required to make terminal look all good
\`\`\``
)}

function _5(md){return(
md`---`
)}

function _Terminal(xterm,terminalRows,terminalColumns,terminalContainer,invalidation)
{
  const Terminal = new xterm({ rows: terminalRows, columns: terminalColumns });
  Terminal.open(terminalContainer);
  Terminal._initialized = true;
  invalidation.then(() => Terminal.destroy());
  return Terminal;
}


function _terminalColumns(){return(
80
)}

function _terminalRows(){return(
24
)}

function _9(Terminal,ansiStyles,md)
{
  Terminal.prompt = () => {
    Terminal.write("\r\n$ ");
  };
  `Welcome to xterm.js!
This is a local terminal emulation, without a real terminal in the back-end.
${ansiStyles.blueBright.open}This should be bright blue! ${
    ansiStyles.blueBright.close
  }
${ansiStyles.bgMagenta.open}This is a magenta background! 🚀${
    ansiStyles.bgMagenta.close
  }
${ansiStyles.greenBright.open}wow so green wow ${ansiStyles.greenBright.close}

Type some keys and commands to play around.

`
    .split("\n")
    .map(line => Terminal.writeln(line));
  Terminal.prompt();
  Terminal.on("key", function(key, ev) {
    const printable =
      !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode === 13) {
      Terminal.prompt();
    } else if (ev.keyCode === 8) {
      // Do not delete the prompt
      if (Terminal.buffer.x > 2) {
        Terminal.write("\b \b");
      }
    } else if (printable) {
      Terminal.write(key);
    }
  });

  Terminal.on("paste", function(data) {
    Terminal.write(data);
  });
  return md``;
}


function _ansiStyles(require){return(
require("https://bundle.run/ansi-styles@3.2.1")
)}

function _xTermObservableStyle(html){return(
html`<style>
.xterm-container-observablehq { 
  padding: .75rem .25rem; 
  background-color: black;
}`
)}

function _xtermCSS(html,xTermObservableStyle){return(
html`
<link  rel="stylesheet" href="https://unpkg.com/xterm@3.0.1/dist/xterm.css">
${xTermObservableStyle}
`
)}

function _xterm(require){return(
require("https://unpkg.com/xterm@3.0.1/dist/xterm.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("terminalContainer")).define("terminalContainer", ["xtermCSS","DOM"], _terminalContainer);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("Terminal")).define("Terminal", ["xterm","terminalRows","terminalColumns","terminalContainer","invalidation"], _Terminal);
  main.variable(observer("terminalColumns")).define("terminalColumns", _terminalColumns);
  main.variable(observer("terminalRows")).define("terminalRows", _terminalRows);
  main.variable(observer()).define(["Terminal","ansiStyles","md"], _9);
  main.variable(observer("ansiStyles")).define("ansiStyles", ["require"], _ansiStyles);
  main.variable(observer("xTermObservableStyle")).define("xTermObservableStyle", ["html"], _xTermObservableStyle);
  main.variable(observer("xtermCSS")).define("xtermCSS", ["html","xTermObservableStyle"], _xtermCSS);
  main.variable(observer("xterm")).define("xterm", ["require"], _xterm);
  return main;
}
