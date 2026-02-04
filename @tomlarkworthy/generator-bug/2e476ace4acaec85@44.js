function _1(md){return(
md`# Generator Bug`
)}

function _trigger(Inputs,Event)
{
  const view = Inputs.input("tick");
  setTimeout(() => {
    view.value = "tock";
    view.dispatchEvent(new Event("input"));
  }, 500);

  return view;
}


function _item(trigger,Inputs,Event)
{
  trigger;
  const view = Inputs.input(undefined);
  // its initial undefined (doesn't trigger generator), and then triggers a value
  setTimeout(() => {
    view.value = "foo";
    view.dispatchEvent(new Event("input"));
  }, 1000);

  return view;
}


function _4(item){return(
item
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof trigger")).define("viewof trigger", ["Inputs","Event"], _trigger);
  main.variable(observer("trigger")).define("trigger", ["Generators", "viewof trigger"], (G, _) => G.input(_));
  main.variable(observer("viewof item")).define("viewof item", ["trigger","Inputs","Event"], _item);
  main.variable(observer("item")).define("item", ["Generators", "viewof item"], (G, _) => G.input(_));
  main.variable(observer()).define(["item"], _4);
  return main;
}
