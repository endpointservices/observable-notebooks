import define1 from "./17c8ce433e1df58e@3584.js";
import define2 from "./c7a3b20cec5d4dd9@730.js";

function _1(md){return(
md`# Test Driven Development Demo: SQL Parser

`
)}

function _suite(createSuite){return(
createSuite({
  name: "Test Suite"
})
)}

function _test_runner(cases,suite,expect){return(
{
  prompt: "Write a declarative testing interface",
  time: 1726339624075
} &&
  Object.entries(cases).forEach(([name, params]) => {
    suite.test(name, () => {
      if (params.expected) {
        expect(params.functionToTest(...params.args)).toEqual(params.expected);
      } else if (params.error) {
        expect(() => params.functionToTest(...params.args)).toThrow(
          params.error
        );
      } else {
        throw new Error("Unrecognized test pattern");
      }
    });
  })
)}

function _test_results(results,report,suite){return(
results && report(suite)
)}

function _cases(sampleData,queryArray){return(
{
  prompt:
    "Add comprehensive test cases for testing various SQL SELECT semantics",
  time: 1726683000000
} && {
  // Existing test cases
  "Select all from arg1": {
    args: ["select * from arg1", ...sampleData()],
    expected: sampleData()[0],
    functionToTest: queryArray
  },
  // Previous new test cases with joins
  "Select IDs greater than 1": {
    args: ["select * from arg1 where id > 1", ...sampleData()],
    expected: sampleData()[0].filter((item) => item.id > 1),
    functionToTest: queryArray
  },
  "Select name equals 'Bob'": {
    args: ["select * from arg1 where name = 'Bob'", ...sampleData()],
    expected: sampleData()[0].filter((item) => item.name === "Bob"),
    functionToTest: queryArray
  },
  // New test cases with joins
  "Inner join arg1 and arg2 on id": {
    args: [
      "select * from arg1 inner join arg2 on arg1.id = arg2.id",
      ...sampleData()
    ],
    expected: sampleData()[0]
      .filter((item1) => sampleData()[1].some((item2) => item2.id === item1.id))
      .map((item1) => {
        const item2 = sampleData()[1].find((item2) => item2.id === item1.id);
        return { ...item1, ...item2 };
      }),
    functionToTest: queryArray
  },
  "Left join arg1 and arg2 on id": {
    args: [
      "select * from arg1 left join arg2 on arg1.id = arg2.id",
      ...sampleData()
    ],
    expected: sampleData()[0].map((item1) => {
      const item2 =
        sampleData()[1].find((item2) => item2.id === item1.id) || {};
      return { ...item1, ...item2 };
    }),
    functionToTest: queryArray
  },
  "Right join arg1 and arg2 on id": {
    args: [
      "select * from arg1 right join arg2 on arg1.id = arg2.id",
      ...sampleData()
    ],
    expected: sampleData()[1].map((item2) => {
      const item1 =
        sampleData()[0].find((item1) => item1.id === item2.id) || {};
      return { ...(item1 || {}), ...item2 };
    }),
    functionToTest: queryArray
  },
  // New Test Cases
  "Select with DISTINCT": {
    args: ["select DISTINCT name from arg1", ...sampleData()],
    expected: [...new Set(sampleData()[0].map((item) => item.name))].map(
      (name) => ({ name })
    ),
    functionToTest: queryArray
  },
  "Select with ORDER BY": {
    args: ["select * from arg1 order by name DESC", ...sampleData()],
    expected: [...sampleData()[0]].sort((a, b) => b.name.localeCompare(a.name)),
    functionToTest: queryArray
  },
  "Select with LIMIT": {
    args: ["select * from arg1 limit 2", ...sampleData()],
    expected: sampleData()[0].slice(0, 2),
    functionToTest: queryArray
  },
  "Select with OFFSET": {
    args: ["select * from arg1 offset 1", ...sampleData()],
    expected: sampleData()[0].slice(1),
    functionToTest: queryArray
  },
  "Select with GROUP BY and COUNT": {
    args: [
      "select name, COUNT(*) as count from arg1 group by name",
      ...sampleData()
    ],
    expected: sampleData()[0].reduce((acc, item) => {
      const existing = acc.find((entry) => entry.name === item.name);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: item.name, count: 1 });
      }
      return acc;
    }, []),
    functionToTest: queryArray
  },
  "Select with WHERE IN": {
    args: [
      "select * from arg1 where name IN ('Alice', 'Charlie')",
      ...sampleData()
    ],
    expected: sampleData()[0].filter((item) =>
      ["Alice", "Charlie"].includes(item.name)
    ),
    functionToTest: queryArray
  },
  "Select with WHERE LIKE": {
    args: ["select * from arg1 where name LIKE 'A%'", ...sampleData()],
    expected: sampleData()[0].filter((item) => /^A/.test(item.name)),
    functionToTest: queryArray
  },
  "Select with Multiple JOINS": {
    args: [
      "select arg1.name, arg2.age from arg1 inner join arg2 on arg1.id = arg2.id",
      ...sampleData()
    ],
    expected: sampleData()[0]
      .filter((item1) => sampleData()[1].some((item2) => item2.id === item1.id))
      .map((item1) => {
        const item2 = sampleData()[1].find((item2) => item2.id === item1.id);
        return { name: item1.name, age: item2.age };
      }),
    functionToTest: queryArray
  },
  "Select with Aliases": {
    args: ["select name as username from arg1", ...sampleData()],
    expected: sampleData()[0].map((item) => ({ username: item.name })),
    functionToTest: queryArray
  },
  "Select with NULL Handling": {
    args: ["select * from arg1 where age IS NULL", ...sampleData()],
    expected: sampleData()[0].filter(
      (item) => item.age === undefined || item.age === null
    ),
    functionToTest: queryArray
  },
  "Select with ORDER BY and LIMIT": {
    args: ["select * from arg1 order by id DESC limit 2", ...sampleData()],
    expected: [...sampleData()[0]].sort((a, b) => b.id - a.id).slice(0, 2),
    functionToTest: queryArray
  }
}
)}

function _6(highlight,test_results){return(
highlight(test_results, { max_length: 3000 })
)}

function _sampleData(){return(
{
  prompt: "Create sample data for testing joins between two arrays.",
  time: 1726682200000
} &&
  (() => [
    [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" }
    ],
    [
      { id: 2, age: 30 },
      { id: 3, age: 25 },
      { id: 4, age: 40 }
    ]
  ])
)}

function _queryArray(){return(
{ prompt: "Try again", time: 1726689739332 } &&
  function queryArray(sql, arg1, arg2) {
    sql = sql.trim();
    const tables = { arg1: arg1, arg2: arg2 };
    let result = [];
    let resultTableName = null;

    // Parse SELECT clause
    const selectRegex = /^select\s+(distinct\s+)?([\s\S]+?)\s+from\s+(\w+)/i;
    const selectMatch = sql.match(selectRegex);
    if (!selectMatch) {
      throw new Error("Unsupported SQL query");
    }
    const isDistinct = !!selectMatch[1];
    const selectFieldsStr = selectMatch[2].trim();
    resultTableName = selectMatch[3];
    result = tables[resultTableName];

    // Handle JOIN clauses
    const joinRegex =
      /\s+(inner|left|right)?\s*join\s+(\w+)\s+on\s+([\w\.]+)\s*=\s*([\w\.]+)/gi;
    let joinMatch;
    while ((joinMatch = joinRegex.exec(sql)) !== null) {
      const joinType = (joinMatch[1] || "inner").toLowerCase();
      const joinTableName = joinMatch[2];
      const leftKey = joinMatch[3];
      const rightKey = joinMatch[4];
      const table1 = result;
      const table2 = tables[joinTableName];
      const leftField = leftKey.includes(".") ? leftKey.split(".")[1] : leftKey;
      const rightField = rightKey.includes(".")
        ? rightKey.split(".")[1]
        : rightKey;
      result = performJoin(table1, table2, leftField, rightField, joinType);
      resultTableName = null; // After join, result is the joined table
    }

    // Handle WHERE clause
    const whereRegex =
      /\s+where\s+([\s\S]+?)(\s+group\s+by|\s+order\s+by|\s+limit|\s+offset|$)/i;
    const whereMatch = sql.match(whereRegex);
    if (whereMatch) {
      const whereClause = whereMatch[1];
      const conditions = whereClause.split(/\s+and\s+/i);
      result = result.filter((item) => {
        return conditions.every((condition) =>
          evaluateCondition(item, condition)
        );
      });
    }

    // Handle GROUP BY clause
    const groupByRegex = /\s+group\s+by\s+([\w\., ]+)/i;
    const groupByMatch = sql.match(groupByRegex);
    if (groupByMatch) {
      const groupByFields = groupByMatch[1].split(",").map((f) => f.trim());
      result = groupBy(result, groupByFields);
    }

    // Handle SELECT fields
    result = selectFields(result, selectFieldsStr);

    // Handle DISTINCT
    if (isDistinct) {
      result = removeDuplicates(result);
    }

    // Handle ORDER BY
    const orderByRegex = /\s+order\s+by\s+([\w\.]+)\s*(asc|desc)?/i;
    const orderByMatch = sql.match(orderByRegex);
    if (orderByMatch) {
      const orderField = orderByMatch[1];
      const orderDirection = (orderByMatch[2] || "asc").toLowerCase();
      result.sort((a, b) => {
        const aValue = getFieldValue(a, orderField);
        const bValue = getFieldValue(b, orderField);
        if (aValue < bValue) return orderDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return orderDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Handle LIMIT
    const limitRegex = /\s+limit\s+(\d+)/i;
    const limitMatch = sql.match(limitRegex);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10);
      result = result.slice(0, limit);
    }

    // Handle OFFSET
    const offsetRegex = /\s+offset\s+(\d+)/i;
    const offsetMatch = sql.match(offsetRegex);
    if (offsetMatch) {
      const offset = parseInt(offsetMatch[1], 10);
      result = result.slice(offset);
    }

    return result;

    // Helper functions
    function performJoin(table1, table2, leftField, rightField, joinType) {
      const joined = [];
      const table2Index = createIndex(table2, rightField);

      if (joinType === "inner") {
        for (const row1 of table1) {
          const key = row1[leftField];
          const matches = table2Index.get(key);
          if (matches) {
            for (const row2 of matches) {
              joined.push({
                ...row1,
                ...row2
              });
            }
          }
        }
      } else if (joinType === "left") {
        for (const row1 of table1) {
          const key = row1[leftField];
          const matches = table2Index.get(key);
          if (matches) {
            for (const row2 of matches) {
              joined.push({
                ...row1,
                ...row2
              });
            }
          } else {
            joined.push({
              ...row1
            });
          }
        }
      } else if (joinType === "right") {
        const table1Index = createIndex(table1, leftField);
        for (const row2 of table2) {
          const key = row2[rightField];
          const matches = table1Index.get(key);
          if (matches) {
            for (const row1 of matches) {
              joined.push({
                ...row1,
                ...row2
              });
            }
          } else {
            joined.push({
              ...row2
            });
          }
        }
      }
      return joined;
    }

    function createIndex(table, field) {
      const index = new Map();
      for (const row of table) {
        const key = row[field];
        if (!index.has(key)) {
          index.set(key, []);
        }
        index.get(key).push(row);
      }
      return index;
    }

    function evaluateCondition(item, condition) {
      const conditionRegex =
        /([\w\.]+)\s*(=|>|<|>=|<=|!=|in|like|is\s+null|is\s+not\s+null)\s*(.*)/i;
      const conditionMatch = condition.match(conditionRegex);
      if (!conditionMatch) {
        throw new Error("Unsupported WHERE clause");
      }
      let [, field, operator, valueRaw] = conditionMatch;
      operator = operator.toLowerCase();
      const value = valueRaw ? valueRaw.trim() : null;
      const itemValue = getFieldValue(item, field);
      if (operator === "is null") {
        return itemValue === null || itemValue === undefined;
      } else if (operator === "is not null") {
        return itemValue !== null && itemValue !== undefined;
      } else if (operator === "in") {
        const values = value
          .replace(/[()]/g, "")
          .split(",")
          .map((v) => v.trim().replace(/'/g, ""));
        return values.includes(String(itemValue));
      } else if (operator === "like") {
        const pattern = new RegExp(
          "^" + value.replace(/%/g, ".*").replace(/'/g, "") + "$",
          "i"
        );
        return pattern.test(itemValue);
      } else {
        const parsedValue = isNaN(value)
          ? value.replace(/'/g, "")
          : Number(value);
        switch (operator) {
          case "=":
            return itemValue == parsedValue;
          case "!=":
            return itemValue != parsedValue;
          case ">":
            return itemValue > parsedValue;
          case "<":
            return itemValue < parsedValue;
          case ">=":
            return itemValue >= parsedValue;
          case "<=":
            return itemValue <= parsedValue;
          default:
            throw new Error("Unsupported operator");
        }
      }
    }

    function groupBy(array, fields) {
      const groups = {};
      for (const item of array) {
        const key = fields.map((f) => getFieldValue(item, f)).join("|");
        if (!groups[key]) {
          groups[key] = { ...item, count: 1 };
        } else {
          groups[key].count += 1;
        }
      }
      return Object.values(groups);
    }

    function selectFields(array, fieldsStr) {
      if (fieldsStr === "*") {
        return array;
      }
      const fields = fieldsStr.split(",").map((f) => f.trim());
      return array.map((item) => {
        const newItem = {};
        fields.forEach((field) => {
          if (field.includes(" as ")) {
            const [expression, alias] = field
              .split(/\s+as\s+/i)
              .map((f) => f.trim());
            if (/count\(\*\)/i.test(expression)) {
              newItem[alias] = item["count"] || 1;
            } else {
              newItem[alias] = getFieldValue(item, expression);
            }
          } else if (/count\(\*\)/i.test(field)) {
            newItem["count"] = item["count"] || 1;
          } else {
            newItem[field] = getFieldValue(item, field);
          }
        });
        return newItem;
      });
    }

    function removeDuplicates(array) {
      const seen = new Set();
      return array.filter((item) => {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          return false;
        } else {
          seen.add(key);
          return true;
        }
      });
    }

    function getFieldValue(item, field) {
      const parts = field.split(".");
      let value = item;
      for (let part of parts) {
        if (value && value.hasOwnProperty(part)) {
          value = value[part];
        } else {
          value = undefined;
          break;
        }
      }
      return value;
    }
  }
)}

function _9($0){return(
$0
)}

function _10(Inputs,suggestion){return(
Inputs.button("copy code", {
  reduce: () => {
    navigator.clipboard.writeText(suggestion);
  }
})
)}

function _11($0){return(
$0
)}

function _12(md){return(
md`## Current Chat context
code is automatically added to the context. Use \`highlight(<expr>)\` to selectively bring runtime values into the context as well`
)}

function _13($0){return(
$0
)}

function _14($0){return(
$0
)}

function _15(md){return(
md`### AI Settings`
)}

function _16($0){return(
$0
)}

function _17($0){return(
$0
)}

function _18($0){return(
$0
)}

function _observable_js_skill(html,md){return(
{
  prompt: "Explain the Observablehq programming model",
  time: 1700163368139
} &&
  html`<h2>Observable Programming Skill</h2>
<details>
  ${md`
The JavaScript dialect used in Observable notebooks is almost—but not entirely—vanilla. This is intentional: by building on the native language of the web, Observable is familiar. And you can use the libraries you know and love, such as D3, Lodash, and Apache Arrow. Yet for dataflow, Observable needed to change JavaScript in a few ways.

> **Note**  
> Observable JavaScript is used in notebooks only. Observable Framework uses vanilla JavaScript.

Here's a quick overview of what's different from vanilla.

## Cells are Separate Scripts

Each cell in a notebook is a separate script that runs independently. A syntax error in one cell won't prevent other cells from running.

~~~javascript
// Example of a syntax error in a cell
This is English, not JavaScript.
~~~

~~~javascript
// Example of a valid cell assignment
myCell = "some string"
~~~

~~~javascript
// Example of a runtime error in a cell
{ throw new Error("oopsie"); }
~~~

Even if one cell has a syntax or runtime error, it does not affect the execution of other cells.

Local variables are only visible to the cell that defines them. For example:

~~~javascript
// Defining a local variable in one cell
{ const local = "I am a local variable."; }
~~~
  
~~~javascript
// Attempting to use the local variable in another cell
local // not defined
~~~

The second cell above will cause a runtime error because \`local\` is not defined in that cell's scope.

## Cells Run in Topological Order

In vanilla JavaScript, code runs from top to bottom. Not so here; Observable runs like a spreadsheet, so you can define your cells in whatever order makes sense.

~~~javascript
// Using a variable defined in a later cell
a + 2 // a is defined below
~~~

~~~javascript
// Defining the variable 'a'
a = 1
~~~

You can define cells in any order you like. Here, \`a\` is successfully used as a variable in the cell before it is defined. However, circular definitions are not allowed:

~~~javascript
// Circular reference causing an error
c1 = c2 - 1
c2 = c1 + 1
~~~

Both \`c1\` and \`c2\` will throw a runtime error due to circular definition.

## Cells Re-run When Any Referenced Cell Changes

You don't have to run cells explicitly when you edit or interact—the notebook updates automatically. If a cell allocates resources that won't be automatically cleaned up by the garbage collector, such as an animation loop or event listener, use the \`invalidation\` promise to dispose of these resources manually and avoid leaks.

~~~javascript
// Using the invalidation promise for cleanup
{ invalidation.then(() => console.log("I was invalidated.")); }
~~~

## Cells Implicitly Await Promises

Cells can contain promises, and referencing cells will implicitly wait for these promises to resolve before running:

~~~javascript
// Defining a cell with a promise
hello = new Promise(resolve => {
  setTimeout(() => {
    resolve("hello there");
  }, 30000);
})
~~~

Referencing cells will wait for \`hello\` to resolve before they execute.

## Cells Implicitly Iterate Over Generators

If a cell yields, any referencing cell will see the most recently yielded value.

~~~javascript
// Using a generator with yield statements
c = {
  yield 1;
  yield 2;
  yield 3;
}
~~~

~~~javascript
// Referencing the generator cell
c
~~~

Referencing \`c\` will return the most recently yielded value, which in this example would be \`3\`.

## Named Cells are Declarations, Not Assignments

Named cells look like, and function almost like, assignment expressions in vanilla JavaScript. But cells can be defined in any order, so think of them as hoisted function declarations.

~~~javascript
// Trying to reassign a cell's value
foo = 2
{ foo = 3 } // SyntaxError: Assignment to constant variable foo
~~~

Cell names must also be unique, and you cannot reassign the value of another cell without using \`mutable\` variables.

## Statements Need Curly Braces, and Return or Yield

A cell body can be a simple expression, such as a number or string literal, or a function call. But for statements like loops, you'll need curly braces and a \`return\` statement to give the cell a value.

~~~javascript
// Using a block statement with a return
{
  let sum = 0;
  for (let i = 0; i < 10; ++i) {
    sum += i;
  }
  return sum;
}
// Output: 45
~~~

## Object Literals Need Parentheses or Return

Wrap object literals in parentheses or use a block statement with a \`return\` to ensure they are interpreted correctly.

~~~javascript
// Correctly defining object literals
object = ({ foo: "bar" })

block = { return { foo: "bar" }; }
~~~

Without parentheses or \`return\`, the cell would interpret the object literal incorrectly, leading to undefined behavior.

~~~javascript
// Incorrectly defining an object literal
label = { foo: "bar" }
// Output: undefined
~~~

## Cells Can Be Views

Observable has a special \`viewof\` operator which lets you define interactive values. A view is a cell with two faces: its user interface, and its programmatic value.

~~~javascript
// Using viewof to create an interactive text input
viewof text = html\`<input value="edit me">\`

// Accessing the value of 'text'
text
// Output: "edit me"
~~~

## Cells Can Be Mutables

Observable provides the \`mutable\` operator so you can opt into mutable state:

~~~javascript
// Defining and using a mutable variable
mutable thing = 0

// Mutating the value of \'thing\'
++mutable thing
// Output: 1
~~~

## Observable Has a Standard Library

Observable provides a small standard library for essential features, such as a reactive width and Inputs.

## Cells Can Be Imported from Other Notebooks

You can import any named cell from any Obserable notebooks, with syntax similar to static ES imports.

~~~javascript
// Importing the 'ramp' function from another notebook
import { ramp } from "@mbostock/ramp"

// Using the imported 'ramp' function
ramp(d3.interpolateBrBG)
~~~

## Static ES Imports Are Not Supported; Use Dynamic Imports

You cannot use normal static ES imports. To use the vanilla JS ecosystem, dynamically import modules from\`esm.sh\` or \`skypack\`.

~~~javascript
// Dynamically importing lodash
_ = import("https://cdn.skypack.dev/lodash-es@4")

// Using lodash function
_.camelCase("lodash was here")
// Output: "lodashWasHere"
~~~

This completes the overview of Observable's programming model, including specific behaviors and differences from standard JavaScript, emphasizing interactivity, reactivity, and cell independence.
`}
</details>
`
)}

function _20(md){return(
md`---`
)}

function _23(ask){return(
ask
)}

function _24(api_call_response){return(
api_call_response
)}

function _results(suite){return(
suite.viewofResults
)}

function _26(background_tasks){return(
background_tasks
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof suite")).define("viewof suite", ["createSuite"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer("test_runner")).define("test_runner", ["cases","suite","expect"], _test_runner);
  main.variable(observer("test_results")).define("test_results", ["results","report","suite"], _test_results);
  main.variable(observer("cases")).define("cases", ["sampleData","queryArray"], _cases);
  main.variable(observer()).define(["highlight","test_results"], _6);
  main.variable(observer("sampleData")).define("sampleData", _sampleData);
  main.variable(observer("queryArray")).define("queryArray", _queryArray);
  main.variable(observer()).define(["viewof prompt"], _9);
  main.variable(observer()).define(["Inputs","suggestion"], _10);
  main.variable(observer()).define(["viewof suggestion"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["viewof context_viz"], _13);
  main.variable(observer()).define(["viewof reset"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["viewof OPENAI_API_KEY"], _16);
  main.variable(observer()).define(["viewof api_endpoint"], _17);
  main.variable(observer()).define(["viewof settings"], _18);
  main.variable(observer("observable_js_skill")).define("observable_js_skill", ["html","md"], _observable_js_skill);
  main.variable(observer()).define(["md"], _20);
  const child1 = runtime.module(define1);
  main.import("ask", child1);
  main.import("excludes", child1);
  main.import("cells", child1);
  main.import("update_context", child1);
  main.import("on_prompt", child1);
  main.import("variables", child1);
  main.import("api_call_response", child1);
  main.import("background_tasks", child1);
  main.import("ndd", child1);
  main.import("instruction", child1);
  main.import("_events", child1);
  main.import("highlight", child1);
  main.import("viewof reset", child1);
  main.import("reset", child1);
  main.import("mutable context", child1);
  main.import("context", child1);
  main.import("viewof prompt", child1);
  main.import("prompt", child1);
  main.import("viewof suggestion", child1);
  main.import("suggestion", child1);
  main.import("viewof settings", child1);
  main.import("settings", child1);
  main.import("viewof OPENAI_API_KEY", child1);
  main.import("OPENAI_API_KEY", child1);
  main.import("viewof api_endpoint", child1);
  main.import("api_endpoint", child1);
  main.import("viewof feedback_prompt", child1);
  main.import("feedback_prompt", child1);
  main.import("viewof feedback_cells_selector", child1);
  main.import("feedback_cells_selector", child1);
  main.import("viewof context_viz", child1);
  main.import("context_viz", child1);
  const child2 = runtime.module(define2);
  main.import("createSuite", child2);
  main.import("report", child2);
  main.import("expect", child2);
  main.variable(observer()).define(["ask"], _23);
  main.variable(observer()).define(["api_call_response"], _24);
  main.variable(observer("viewof results")).define("viewof results", ["suite"], _results);
  main.variable(observer("results")).define("results", ["Generators", "viewof results"], (G, _) => G.input(_));
  main.variable(observer()).define(["background_tasks"], _26);
  return main;
}
