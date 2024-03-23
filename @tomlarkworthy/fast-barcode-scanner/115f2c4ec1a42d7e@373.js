function _1(md){return(
md`# Pyodide library for Observable`
)}

function _2(md){return(
md`> [Pyodide](https://pyodide.org/) brings the Python 3.8 runtime to the browser via WebAssembly, along with the Python scientific stack including NumPy, Pandas, Matplotlib, SciPy, and scikit-learn. The packages directory lists over 75 packages which are currently available. In addition it’s possible to install pure Python wheels from PyPi.

Pyodide.js is a Javascript interface to pyodide. It provides methods like [pyodide.runPython](https://pyodide.org/en/stable/usage/api/js-api.html#pyodide.runPython) to run Python code and [pyodide.loadPackage](https://pyodide.org/en/stable/usage/api/js-api.html#pyodide.loadPackage) to load Python packages from the pyodide repo or from PyPi using [micropip](https://pyodide.org/en/stable/usage/api/micropip-api.html). 

Python objects can be used in Javascript and vice-versa. \`pyodide.runPython\` returns the Python values but [pyodide.pyimport](https://pyodide.readthedocs.io/en/latest/api_reference.html#pyodide-pyimport-name) can be used to import specific Python variables and [pyodide.globals](https://pyodide.readthedocs.io/en/latest/api_reference.html#pyodide-globals) to import Python globals into Javascript. Javascript objects can be imported into Python by importing from the \`js\` namespace (e.g. \`from js import document\`).

It's worth noting that pyodide.js loads the entire CPython standard library into the browser (6.4mb), but this is a huge reduction from Pyodide's original size (over 50mb).

## _py_ string template literal function
The closest we can get to writing Python natively in Observable is using Javascript's string literal feature. This allows us to write Python like:

~~~py
py\`import sys
sys.version\`
~~~

...much like we would write Markdown or HTML.

Under the hood, \`py\` calls \`pyodide.pyodide_py.eval_code_async\` on the code provided which will not only execute the code but also import any dependencies using \`pyodide.loadPackagesFromImports\`. Lastly, if the returned value has a \`toJs\`, it will return the result of calling that method. 

Javascript template literals allow us to include Javascript expressions in our Python code using _placeholders_ (using the \`\$\{expression\}\` syntax) and the \`py\` function will translate these Javascript expressions to Python and make them available in the (Python) global context. This is especially useful in an Observable notebook where cells react to changes in dependent cells, so if we want our Python cells to react to changes in other cells, we can reference those cells by name using placeholders.

See the [examples](https://observablehq.com/@gnestor/pyodide-demo) to see this in practice 👍

## Usage

~~~js
import { py, pyodide } from '@gnestor/pyodide'
~~~

## Examples

See examples at https://observablehq.com/@gnestor/pyodide-demo

## Best Practices

After having personally used Pyodide in Observable notebooks for 2+ years, I have learned that state should live in Observable notebooks cells as much as possible vs. Python. I tend to define variables as cells that evaluate some Python code, even if that variable is a Pandas dataframe or something entirely unique to Python. Pyodide will translate that Python object to Javascript and other cells can reference that object and call methods on it. If that object depends on other Javascript variables, it will react to changes in those variables as long as it references those variables using template literal placeholders.`
)}

function _py(pyodide){return(
async (strings, ...expressions) => {
  let globals = {};
  const code = strings.reduce((result, string, index) => {
    if (expressions[index]) {
      const name = `x${index}`;
      globals[name] = expressions[index];
      return result + string + name;
    }
    return result + string;
  }, '');
  await pyodide.loadPackagesFromImports(code);
  const result = await pyodide.pyodide_py.eval_code_async(
    code,
    pyodide.toPy(globals)
  );
  if (result?.toJs) return result.toJs();
  return result;
}
)}

async function _pyodide(require)
{
  const pyodide =
    await require("https://cdn.jsdelivr.net/pyodide/v0.21.2/full/pyodide.js");
  return pyodide.loadPyodide();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("py")).define("py", ["pyodide"], _py);
  main.variable(observer("pyodide")).define("pyodide", ["require"], _pyodide);
  return main;
}
