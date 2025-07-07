function _1(md){return(
md`# Dependancy`
)}

function _dep(){return(
"a"
)}

function _error_dep()
{
  throw "err";
}


function _viewdep(Inputs){return(
Inputs.input()
)}

function _mutabledep(){return(
{}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("dep")).define("dep", _dep);
  main.variable(observer("error_dep")).define("error_dep", _error_dep);
  main.variable(observer("viewof viewdep")).define("viewof viewdep", ["Inputs"], _viewdep);
  main.variable(observer("viewdep")).define("viewdep", ["Generators", "viewof viewdep"], (G, _) => G.input(_));
  main.define("initial mutabledep", _mutabledep);
  main.variable(observer("mutable mutabledep")).define("mutable mutabledep", ["Mutable", "initial mutabledep"], (M, _) => new M(_));
  main.variable(observer("mutabledep")).define("mutabledep", ["mutable mutabledep"], _ => _.generator);
  return main;
}
