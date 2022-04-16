function _1(md){return(
md`# *stepped* Dijkstra search`
)}

function _2(suite,step,testing){return(
suite.test(
  "step's frontier lastVertex is an expansion with smallest distance",
  () => {
    const result = step({
      seed: {
        id: "start",
        distance: 5
      },
      adjacent: (source) => [
        {
          id: "v0",
          distance: 10
        },
        {
          id: "v1",
          distance: 9
        },
        {
          id: "v2",
          distance: 10
        }
      ]
    });
    testing.expect(result.frontier.peek()).toEqual({
      id: "v1",
      distance: 9 + 5
    });
  }
)
)}

function _3(suite,step,testing){return(
suite.test("step eventually terminates by lastVertex not being present", () => {
  const array4 = Array.from({ length: 4 }).map((_, i) => i);

  var current = step({
    seed: {
      id: 0,
      distance: 0
    },
    adjacent: (source) => array4.map((i) => ({ id: i, distance: i }))
  });

  testing.expect(current.lastVertex).toEqual({
    id: 0,
    distance: 0
  });
  while (current.lastVertex) {
    debugger;

    current = step(current);
  }
})
)}

function _step(PriorityQueue){return(
({
  seed = undefined, // Pushed into priority queue, should be in format {id, distance}
  frontier = new PriorityQueue((a, b) => (a.distance || 0) < (b.distance || 0)),
  distances = new Map(), // distances to known vertex ids
  // User supplied adjacent function.
  // returns an iterable of adjacent vertices as {id, distance}
  adjacent = (source) => [
    {
      id: "target",
      distance: 1
    }
  ]
} = {}) => {
  if (seed) {
    frontier.push(seed);
  }

  while (!frontier.isEmpty()) {
    const u = frontier.pop();
    if (distances.has(u.id)) continue;
    else {
      distances.set(u.id, u.distance);
    }

    const adj = adjacent(u.id);
    for (const v of adj) {
      if (!distances.has(v.id)) {
        const total = v.distance + u.distance;
        frontier.push({
          id: v.id,
          distance: v.distance + u.distance
        });
      }
    }

    return {
      lastVertex: u,
      lastExpanded: adj,
      frontier,
      distances,
      adjacent
    };
  }
  // If we have no vertices ther
  return {
    frontier,
    distances,
    adjacent
  };
}
)}

function _6(md){return(
md`### PriorityQueue (from <a target="_blank" href="https://stackoverflow.com/a/42919752/862295">stackoverflow.com</a>, thanks user719662!)`
)}

function _PriorityQueue()
{
  const top = 0;
  const parent = (i) => ((i + 1) >>> 1) - 1;
  const left = (i) => (i << 1) + 1;
  const right = (i) => (i + 1) << 1;
  return class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
      this._heap = [];
      this._comparator = comparator;
    }
    size() {
      return this._heap.length;
    }
    isEmpty() {
      return this.size() == 0;
    }
    peek() {
      return this._heap[top];
    }
    push(...values) {
      values.forEach((value) => {
        this._heap.push(value);
        this._siftUp();
      });
      return this.size();
    }
    pop() {
      const poppedValue = this.peek();
      const bottom = this.size() - 1;
      if (bottom > top) {
        this._swap(top, bottom);
      }
      this._heap.pop();
      this._siftDown();
      return poppedValue;
    }
    replace(value) {
      const replacedValue = this.peek();
      this._heap[top] = value;
      this._siftDown();
      return replacedValue;
    }
    _greater(i, j) {
      return this._comparator(this._heap[i], this._heap[j]);
    }
    _swap(i, j) {
      [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }
    _siftUp() {
      let node = this.size() - 1;
      while (node > top && this._greater(node, parent(node))) {
        this._swap(node, parent(node));
        node = parent(node);
      }
    }
    _siftDown() {
      let node = top;
      while (
        (left(node) < this.size() && this._greater(left(node), node)) ||
        (right(node) < this.size() && this._greater(right(node), node))
      ) {
        let maxChild =
          right(node) < this.size() && this._greater(right(node), left(node))
            ? right(node)
            : left(node);
        this._swap(node, maxChild);
        node = maxChild;
      }
    }
  };
}


function _suite(testing){return(
testing.createSuite()
)}

async function _testing(step)
{
  step;
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(
      "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js"
    ),
    import(`https://api.observablehq.com/@tomlarkworthy/testing.js?v=3`)
  ]);
  const module = new Runtime().module(define);
  return Object.fromEntries(
    await Promise.all(
      ["expect", "createSuite"].map((n) => module.value(n).then((v) => [n, v]))
    )
  );
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["suite","step","testing"], _2);
  main.variable(observer()).define(["suite","step","testing"], _3);
  main.variable(observer("step")).define("step", ["PriorityQueue"], _step);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("PriorityQueue")).define("PriorityQueue", _PriorityQueue);
  main.variable(observer("viewof suite")).define("viewof suite", ["testing"], _suite);
  main.variable(observer("suite")).define("suite", ["Generators", "viewof suite"], (G, _) => G.input(_));
  main.variable(observer("testing")).define("testing", ["step"], _testing);
  return main;
}
