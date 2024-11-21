function _1(md){return(
md`# altocumulus's Logging

From: [https://stackoverflow.com/questions/49802167/d3-console-log-in-a-function-chain/49802340](https://stackoverflow.com/questions/49802167/d3-console-log-in-a-function-chain/49802340)`
)}

function _logger(d3){return(
{
  log() {          // Generic method logging all arguments.
    console.log(...arguments);
    return this;
  },
  
  logMsg(msg) {    // Logging just a simple msg.
    console.log(msg);
    return this;
  },
  
  logSel() {       // Log the selection.
    console.log(this);
    return this;
  },
  
  logAttr(name) {  // Log the attributes with "name" for all selected elements.
    this.each(function(d, i) {
      let attr = d3.select(this).attr(name);
      console.log(`Node ${i}: ${name}=${attr}`);
    });
    return this;
  },
  
  logData() {      // Log the data bound to this selection.
    console.log(this.data());
    return this;
  },

  logNodeData() {  // Log datum per node.
    this.each(function(d, i) {
      console.log(`Node ${i}: ${d}`);
    });
    return this;
  }
}
)}

function _test(assignLogger,d3)
{
  assignLogger // Ensure the custom logger is assigned first by adding it as a dependancy to this cell
d3.select("body")
    .logMsg("Start")
  .append("svg").selectAll(null)
    .log(1, {}, "Test")
    // .logSel()   // this doesn't work well in Stack snippets
  .data([1,2])
  .enter().append("circle")
    .attr("r", "10")
    .logAttr("r")
    .logData()
    .logNodeData()
    .logMsg("End");

}


function _assignLogger(d3,logger){return(
Object.assign(d3.selection.prototype, logger)
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("logger")).define("logger", ["d3"], _logger);
  main.variable(observer("test")).define("test", ["assignLogger","d3"], _test);
  main.variable(observer("assignLogger")).define("assignLogger", ["d3","logger"], _assignLogger);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
