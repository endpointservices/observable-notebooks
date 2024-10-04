function _1(md){return(
md`# JSON-merge-PATCH Calculator (RFC 7386)`
)}

function _source(Inputs){return(
Inputs.textarea({
  label: "source",
  rows: 10
})
)}

function _target(Inputs){return(
Inputs.textarea({
  label: "target",
  rows: 10
})
)}

function _output(Inputs){return(
Inputs.textarea({
  label: "output",
  rows: 10,
  disabled: true
})
)}

function _doDiff(source,target,dictify,arrayToDict,$0,generateJsonMergePatch)
{
  try {
    const s_json = JSON.parse(source);
    const t_json = JSON.parse(target);
    const s = dictify ? arrayToDict(s_json) : s_json;
    const t = dictify ? arrayToDict(t_json) : t_json;
    $0.value = JSON.stringify(generateJsonMergePatch(s, t), null, 2);
  } catch (err) {
    $0.value = err;
  }
}


function _generateJsonMergePatch(){return(
function generateJsonMergePatch(oldJson, newJson) {
  const result = {};

  for (const key in oldJson) {
    if (!(key in newJson)) {
      result[key] = null; // Value has been removed
    } else if (
      typeof oldJson[key] === "object" &&
      !Array.isArray(oldJson[key]) &&
      oldJson[key] !== null
    ) {
      const nestedPatch = generateJsonMergePatch(oldJson[key], newJson[key]);
      if (Object.keys(nestedPatch).length > 0) {
        result[key] = nestedPatch; // There are changes in the nested object
      }
    } else if (oldJson[key] !== newJson[key]) {
      result[key] = newJson[key]; // Value has changed
    }
  }

  for (const key in newJson) {
    if (!(key in oldJson)) {
      result[key] = newJson[key]; // Value is new
    }
  }

  return result;
}
)}

function _7(md){return(
md`the following feature toggle looks for arrays contained entries with an **id**, and converts them to dictionaries before calculating the merge`
)}

function _dictify(Inputs){return(
Inputs.toggle({
  label: "convert arrays to dicts?"
})
)}

function _arrayToDict(){return(
function arrayToDict(data) {
  if (Array.isArray(data)) {
    // Check if all elements are objects with an "id" property
    let allObjectsHaveId = true;
    let idsAreUnique = true;
    const idSet = new Set();
    for (const element of data) {
      if (typeof element !== "object" || element.id === undefined) {
        allObjectsHaveId = false;
        break;
      } else if (idSet.has(element.id)) {
        idsAreUnique = false;
        break;
      } else {
        idSet.add(element.id);
      }
    }
    if (allObjectsHaveId && idsAreUnique) {
      // Convert array to dictionary
      const dict = {};
      for (const element of data) {
        dict[element.id] = arrayToDict(element);
      }
      return dict;
    } else {
      // Recurse on array elements
      return data.map(arrayToDict);
    }
  } else if (typeof data === "object" && data !== null) {
    // Recurse on object properties
    const newObj = {};
    for (const key in data) {
      newObj[key] = arrayToDict(data[key]);
    }
    return newObj;
  } else {
    // Return primitive values as is
    return data;
  }
}
)}

function _arrayToDictOutput(Inputs){return(
Inputs.textarea({
  label: "arrayToDict(source)",
  rows: 10,
  disabled: true
})
)}

function _arrayToDictTarget(Inputs){return(
Inputs.textarea({
  label: "arrayToDict(target)",
  rows: 10,
  disabled: true
})
)}

function _doArrayToDict($0,arrayToDict,source,$1,target)
{
  try {
    $0.value = JSON.stringify(
      arrayToDict(JSON.parse(source)),
      null,
      2
    );
  } catch (err) {
    $0.value = err;
  }

  try {
    $1.value = JSON.stringify(
      arrayToDict(JSON.parse(target)),
      null,
      2
    );
  } catch (err) {
    $1.value = err;
  }
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof source")).define("viewof source", ["Inputs"], _source);
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer("viewof target")).define("viewof target", ["Inputs"], _target);
  main.variable(observer("target")).define("target", ["Generators", "viewof target"], (G, _) => G.input(_));
  main.variable(observer("viewof output")).define("viewof output", ["Inputs"], _output);
  main.variable(observer("output")).define("output", ["Generators", "viewof output"], (G, _) => G.input(_));
  main.variable(observer("doDiff")).define("doDiff", ["source","target","dictify","arrayToDict","viewof output","generateJsonMergePatch"], _doDiff);
  main.variable(observer("generateJsonMergePatch")).define("generateJsonMergePatch", _generateJsonMergePatch);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof dictify")).define("viewof dictify", ["Inputs"], _dictify);
  main.variable(observer("dictify")).define("dictify", ["Generators", "viewof dictify"], (G, _) => G.input(_));
  main.variable(observer("arrayToDict")).define("arrayToDict", _arrayToDict);
  main.variable(observer("viewof arrayToDictOutput")).define("viewof arrayToDictOutput", ["Inputs"], _arrayToDictOutput);
  main.variable(observer("arrayToDictOutput")).define("arrayToDictOutput", ["Generators", "viewof arrayToDictOutput"], (G, _) => G.input(_));
  main.variable(observer("viewof arrayToDictTarget")).define("viewof arrayToDictTarget", ["Inputs"], _arrayToDictTarget);
  main.variable(observer("arrayToDictTarget")).define("arrayToDictTarget", ["Generators", "viewof arrayToDictTarget"], (G, _) => G.input(_));
  main.variable(observer("doArrayToDict")).define("doArrayToDict", ["viewof arrayToDictOutput","arrayToDict","source","viewof arrayToDictTarget","target"], _doArrayToDict);
  return main;
}
