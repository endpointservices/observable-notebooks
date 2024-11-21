function _1(md){return(
md`# Bug report: errors not cleared for evaluated but unresolved cells`
)}

function _throwError(Inputs){return(
Inputs.toggle({ label: "error?", value: true })
)}

function _error_cell(throwError)
{
  if (throwError) throw Error("This error was deliberate");
}


function _downstreamA(error_cell)
{
  error_cell;
}


function _downstreamB(error_cell,invalidation)
{
  error_cell;
  return invalidation;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof throwError")).define("viewof throwError", ["Inputs"], _throwError);
  main.variable(observer("throwError")).define("throwError", ["Generators", "viewof throwError"], (G, _) => G.input(_));
  main.variable(observer("error_cell")).define("error_cell", ["throwError"], _error_cell);
  main.variable(observer("downstreamA")).define("downstreamA", ["error_cell"], _downstreamA);
  main.variable(observer("downstreamB")).define("downstreamB", ["error_cell","invalidation"], _downstreamB);
  return main;
}
