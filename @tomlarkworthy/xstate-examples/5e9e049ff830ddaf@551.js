import define1 from "./06b5944fd43dbd46@356.js";

function _1(md){return(
md`# Reactive State Machine Development with [XState](https://xstate.js.org/docs/), [Stately.ai](https://stately.ai) on [Observablehq.com](https://observablehq.com)`
)}

async function _2(FileAttachment,md){return(
md`State machines are a great computational formalism. They discretize state into verteces, and state transitions to edges on a graph. This is very minimal, which means state machines can often be exhaustively checked. State machines' restrained expressivity is exactly why they open the door to **formal methods** [[1](https://www.researchgate.net/publication/4353087_Symbolic_model_checking_of_hierarchical_UML_state_machines)] and are loved in the embedded/realtime/safety-critical system communities.

From another direction, state machines are easy to understand. A running system is a vertex within a graph, and you can see where the system can go by looking at the outbound edges. Some developers advocate for their use in **low level UI handling**, translating low-level events, like key _mousedown_ events, into high-level concepts like selection dragging (e.g. in [TLDraw](https://github.com/tldraw/tldraw/blob/2567cedcd268c8e71045d45fb76388f96e7251f4/examples/core-example-advanced/src/state/machine.ts#L8)). In this context, the state machines vertices hold the gesture context, like whether they are currently in a drag-or-not.

However, in practice, state machines are not very readable. A state machine's program is a list of translations that often have no natural linear ordering so they do not map particularly well to code. The intuitive representation of state machines is a state machine diagram *i.e.* a programmer's DataViz. 

<figure>
    <img src="${await FileAttachment("image.png").url()}"
         alt="State machine diagram example">
    <figcaption>Diagram from [www.state-machine.com](https://www.state-machine.com) a company specializing in realtime embedded controllers programmed via the state machine paradigm</figcaption>
</figure>

There are many tools for drawing state machines. [Stately.ai](https://stately.ai) stands out because it can draw both the machine definition *and* a running machine. It is compatible with [xstate](https://xstate.js.org/docs/), the leading state machine implementation for JavaScript. Yet despite its power, I have always had problems because my program was *here*, my code was *there* and the visualizer was somewhere else entirely! Thus the context switching between code, program output, and visualization tool was too high to get make state machine development effective.

<figure>
    <img src="${await FileAttachment("image@1.png").url()}"
         alt="State machine diagram example">
    <figcaption>An [xstate](xstate.js.org) machine visualization</figcaption>
</figure>

This changes now! [Stately.ai](https://stately.ai) can be embedded in an *iframe*. We can leverage Observable's reactive execution model to reattach a visual debugger on machine definition changes, giving us a reactive development workflow where the code, the program output, and the visual debugging tools are next to each other and they all auto-update on changes properly! Finally! a nice workflow for state machine development!
`
)}

function _3(md){return(
md`### Import the dependancies`
)}

function _5(md){return(
md`TODO
- Better explanation for calculator input
- Calculator machine is unreadable (trim machine, or fiddle with zoom levels)
- Explain steps of bringing up a state machine
`
)}

function _6(md){return(
md`### Realtime inspection

See https://xstate.js.org/docs/packages/xstate-inspect/`
)}

function _setupInspect(calculatorMachineDefinition,inspect,stately)
{
  calculatorMachineDefinition;

  return inspect({
    iframe: () => stately,
    url: "https://stately.ai/viz/embed?mode=viz&inspect"
  });
}


function _stately(width,htl){return(
htl.html`<iframe style="width: ${width}px; height: ${width * 0.7}px;"></iframe>`
)}

function _9(md){return(
md`This is the calculator input, all keyboard events are consumed, and the calculator display is output.`
)}

function _dispay(htl,$0,invalidation)
{
  const ui = htl.html`<input>`;
  function onKey(evt) {
    $0.value = evt.key;
    evt.preventDefault();
  }
  ui.addEventListener("keydown", onKey);
  invalidation.then(() => ui.removeEventListener("keydown", onKey));
  return ui;
}


function _11(state){return(
state.value
)}

function _keydown(){return(
undefined
)}

function _sendToMachine(keydown,calculatorMachine)
{
  const num = parseInt(keydown);
  if (Number.isInteger(num)) {
    calculatorMachine.send({
      type: "NUMBER",
      key: num
    });
  } else if (["/", "*", "+", "-", "x"].includes(keydown)) {
    calculatorMachine.send({
      type: "OPERATOR",
      operator: keydown === "*" ? "x" : keydown
    });
  } else if (keydown === ".") {
    calculatorMachine.send({
      type: "DECIMAL_POINT"
    });
  } else if (keydown === "Enter" || keydown === "=") {
    calculatorMachine.send({
      type: "EQUALS"
    });
  } else if (keydown === "Backspace") {
    calculatorMachine.send({
      type: "CLEAR_ENTRY"
    });
  }
}


function _readFromMachine($0,state)
{
  $0.value = state.context.display;
}


function _state(Generators,calculatorMachine){return(
Generators.observe((notify) => {
  calculatorMachine.onTransition((state) => notify(state));
})
)}

function _16(md){return(
md`---`
)}

function _logic()
{
  const not = (fn) => (...args) => !fn(...args);
  const isZero = (context, event) => event?.key === 0;
  const isNotZero = not(isZero);
  const isMinus = (context, event) => event?.operator === "-";
  const isNotMinus = not(isMinus);
  const divideByZero = (context, event) => {
    debugger;
    return;
    (!context?.operand2 || context?.operand2 === "0.") &&
      context?.operator === "/";
  };

  const notDivideByZero = not(divideByZero);
  function doMath(operand1, operand2, operator) {
    switch (operator) {
      case "+":
        return +operand1 + +operand2;
      case "-":
        return +operand1 - +operand2;
      case "/":
        return +operand1 / +operand2;
      case "x":
        return +operand1 * +operand2;
      default:
        return Infinity;
    }
  }

  return {
    not,
    isZero,
    isNotZero,
    isMinus,
    isNotMinus,
    divideByZero,
    notDivideByZero,
    doMath
  };
}


function _calculatorMachineDefinition(createMachine,alert,logic,assign){return(
createMachine(
  {
    id: "calcMachine",
    context: {
      display: "0.",
      operand1: undefined,
      operand2: undefined,
      operator: undefined
    },
    strict: true,
    initial: "start",
    on: {
      CLEAR_EVERYTHING: {
        target: ".start",
        actions: ["reset"]
      }
    },
    states: {
      start: {
        on: {
          NUMBER: [
            {
              cond: "isZero",
              target: "operand1.zero",
              actions: ["defaultReadout"]
            },
            {
              cond: "isNotZero",
              target: "operand1.before_decimal_point",
              actions: ["setReadoutNum"]
            }
          ],
          OPERATOR: {
            cond: "isMinus",
            target: "negative_number",
            actions: ["startNegativeNumber"]
          },
          DECIMAL_POINT: {
            target: "operand1.after_decimal_point",
            actions: ["defaultReadout"]
          }
        }
      },
      operand1: {
        on: {
          OPERATOR: {
            target: "operator_entered",
            actions: ["recordOperator"]
          },
          PERCENTAGE: {
            target: "result",
            actions: ["storeResultAsOperand2", "computePercentage"]
          },
          CLEAR_ENTRY: {
            target: "operand1",
            actions: ["defaultReadout"]
          }
        },
        initial: "zero",
        states: {
          zero: {
            on: {
              NUMBER: {
                target: "before_decimal_point",
                actions: "setReadoutNum"
              },
              DECIMAL_POINT: "after_decimal_point"
            }
          },
          before_decimal_point: {
            on: {
              NUMBER: {
                target: "before_decimal_point",
                actions: ["appendNumBeforeDecimal"]
              },
              DECIMAL_POINT: "after_decimal_point"
            }
          },
          after_decimal_point: {
            on: {
              NUMBER: {
                target: "after_decimal_point",
                actions: ["appendNumAfterDecimal"]
              }
            }
          }
        }
      },
      negative_number: {
        on: {
          NUMBER: [
            {
              cond: "isZero",
              target: "operand1.zero",
              actions: ["defaultNegativeReadout"]
            },
            {
              cond: "isNotZero",
              target: "operand1.before_decimal_point",
              actions: ["setNegativeReadoutNum"]
            }
          ],
          DECIMAL_POINT: {
            target: "operand1.after_decimal_point",
            actions: ["defaultNegativeReadout"]
          },
          CLEAR_ENTRY: {
            target: "start",
            actions: ["defaultReadout"]
          }
        }
      },
      operator_entered: {
        on: {
          OPERATOR: [
            {
              cond: "isNotMinus",
              target: "operator_entered",
              actions: "setOperator"
            },
            {
              cond: "isMinus",
              target: "negative_number_2",
              actions: ["startNegativeNumber"]
            }
          ],
          NUMBER: [
            {
              cond: "isZero",
              target: "operand2.zero",
              actions: ["defaultReadout", "saveOperand2"]
            },
            {
              cond: "isNotZero",
              target: "operand2.before_decimal_point",
              actions: ["setReadoutNum", "saveOperand2"]
            }
          ],
          DECIMAL_POINT: {
            target: "operand2.after_decimal_point",
            actions: ["defaultReadout"]
          }
        }
      },
      operand2: {
        on: {
          OPERATOR: [
            {
              cond: "notDivideByZero",
              target: "operator_entered",
              actions: [
                "storeResultAsOperand2",
                "compute",
                "storeResultAsOperand1",
                "setOperator"
              ]
            },
            {
              target: "alert"
            }
          ],
          EQUALS: [
            {
              cond: "notDivideByZero",
              target: "result",
              actions: ["storeResultAsOperand2", "compute"]
            },
            {
              target: "alert"
            }
          ],
          CLEAR_ENTRY: {
            target: "operand2.zero",
            actions: ["defaultReadout"]
          }
        },
        initial: "zero",
        states: {
          zero: {
            on: {
              NUMBER: {
                target: "before_decimal_point",
                actions: ["setReadoutNum"]
              },
              DECIMAL_POINT: "after_decimal_point"
            }
          },
          before_decimal_point: {
            on: {
              NUMBER: {
                target: "before_decimal_point",
                actions: ["appendNumBeforeDecimal"]
              },
              DECIMAL_POINT: "after_decimal_point"
            }
          },
          after_decimal_point: {
            on: {
              NUMBER: {
                target: "after_decimal_point",
                actions: "appendNumAfterDecimal"
              }
            }
          }
        }
      },
      negative_number_2: {
        on: {
          NUMBER: [
            {
              cond: "isZero",
              target: "operand2.zero",
              actions: ["defaultNegativeReadout"]
            },
            {
              cond: "isNotZero",
              target: "operand2.before_decimal_point",
              actions: ["setNegativeReadoutNum"]
            }
          ],
          DECIMAL_POINT: {
            target: "operand2.after_decimal_point",
            actions: ["defaultNegativeReadout"]
          },
          CLEAR_ENTRY: {
            target: "operator_entered",
            actions: ["defaultReadout"]
          }
        }
      },
      result: {
        on: {
          NUMBER: [
            {
              cond: "isZero",
              target: "operand1",
              actions: ["defaultReadout"]
            },
            {
              cond: "isNotZero",
              target: "operand1.before_decimal_point",
              actions: ["setReadoutNum"]
            }
          ],
          PERCENTAGE: {
            target: "result",
            actions: ["storeResultAsOperand2", "computePercentage"]
          },
          OPERATOR: {
            target: "operator_entered",
            actions: ["storeResultAsOperand1", "recordOperator"]
          },
          CLEAR_ENTRY: {
            target: "start",
            actions: ["defaultReadout"]
          }
        }
      },
      alert: {
        invoke: {
          src: (context, event) => () => {
            // eslint-disable-next-line no-alert
            alert("Cannot divide by zero!");
            return Promise.resolve();
          },
          onDone: {
            target: "start",
            actions: ["reset"]
          }
        }
      }
    }
  },
  {
    guards: {
      isMinus: logic.isMinus,
      isNotMinus: logic.isNotMinus,
      isZero: logic.isZero,
      isNotZero: logic.isNotZero,
      notDivideByZero: logic.notDivideByZero
    },
    actions: {
      defaultReadout: assign({
        display: () => {
          console.log("defaultReadout");

          return "0.";
        }
      }),

      defaultNegativeReadout: assign({
        display: () => "-0."
      }),

      appendNumBeforeDecimal: assign({
        display: (context, event) => {
          // from '123.' => '1234.'
          return `${context.display.slice(0, -1)}${event.key}.`;
        }
      }),

      appendNumAfterDecimal: assign({
        display: (context, event) => {
          return `${context.display}${event.key}`;
        }
      }),

      setReadoutNum: assign({
        display: (context, event) => {
          return `${event.key}.`;
        }
      }),

      setNegativeReadoutNum: assign({
        display: (context, event) => `-${event.key}.`
      }),

      startNegativeNumber: assign({
        display: () => "-"
      }),

      recordOperator: assign({
        operand1: (context) => context.display,
        operator: (context, event) => event.operator
      }),

      setOperator: assign({
        operator: (context, event) => context.operator
      }),

      computePercentage: assign({
        display: (context, event) => (+context.display / 100).toString()
      }),

      compute: assign({
        display: (context, event) => {
          const result = logic.doMath(
            context.operand1,
            context.operand2,
            context.operator
          );

          console.log(
            `doing calculation ${context.operand1} ${context.operator} ${context.operand2} = ${result}`
          );

          return result.toString();
        }
      }),

      storeResultAsOperand1: assign({
        operand1: (context) => context.display
      }),

      storeResultAsOperand2: assign({
        operand2: (context) => context.display
      }),

      saveOperand2: assign({
        operand2: (context, event) => context.display
      }),

      reset: assign({
        display: () => "0.",
        operand1: (context, event) => undefined,
        operand2: () => undefined,
        operator: () => undefined
      })
    }
  }
)
)}

function _rememberState(Inputs){return(
Inputs.toggle({
  label: "Remember state and context?",
  value: true
})
)}

function _calculatorMachine(setupInspect,interpret,calculatorMachineDefinition,invalidation,$0)
{
  setupInspect;

  const machine = interpret(calculatorMachineDefinition, { devTools: true });
  invalidation.then(() => machine.stop());
  if (this && $0.value) {
    machine.start(this.state.value);
    machine.withContext(this.machine.context);
  } else {
    machine.start();
  }

  return machine;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/f6372ece54ff522322d575db00fec066b189c38ebe96ca615f8d383b9cad0a427023801275df84839c9d6c2778d0c712e16f2767d334f9ceb9565484f7d1fd1a.png", import.meta.url), mimeType: "image/png", toString}],
    ["image@1.png", {url: new URL("./files/a6fbadea3d07149323ef5a6534dc538f804a781afd30c5edad0ab26f5da37f65978c21de1f90caeba5076d846554b94cfdb27c223530a76a8a48f25129d40d1b.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["FileAttachment","md"], _2);
  main.variable(observer()).define(["md"], _3);
  const child1 = runtime.module(define1);
  main.import("createMachine", child1);
  main.import("interpret", child1);
  main.import("inspect", child1);
  main.import("assign", child1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("setupInspect")).define("setupInspect", ["calculatorMachineDefinition","inspect","stately"], _setupInspect);
  main.variable(observer("stately")).define("stately", ["width","htl"], _stately);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("viewof dispay")).define("viewof dispay", ["htl","mutable keydown","invalidation"], _dispay);
  main.variable(observer("dispay")).define("dispay", ["Generators", "viewof dispay"], (G, _) => G.input(_));
  main.variable(observer()).define(["state"], _11);
  main.define("initial keydown", _keydown);
  main.variable(observer("mutable keydown")).define("mutable keydown", ["Mutable", "initial keydown"], (M, _) => new M(_));
  main.variable(observer("keydown")).define("keydown", ["mutable keydown"], _ => _.generator);
  main.variable(observer("sendToMachine")).define("sendToMachine", ["keydown","calculatorMachine"], _sendToMachine);
  main.variable(observer("readFromMachine")).define("readFromMachine", ["viewof dispay","state"], _readFromMachine);
  main.variable(observer("state")).define("state", ["Generators","calculatorMachine"], _state);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("logic")).define("logic", _logic);
  main.variable(observer("calculatorMachineDefinition")).define("calculatorMachineDefinition", ["createMachine","alert","logic","assign"], _calculatorMachineDefinition);
  main.variable(observer("viewof rememberState")).define("viewof rememberState", ["Inputs"], _rememberState);
  main.variable(observer("rememberState")).define("rememberState", ["Generators", "viewof rememberState"], (G, _) => G.input(_));
  main.variable(observer("calculatorMachine")).define("calculatorMachine", ["setupInspect","interpret","calculatorMachineDefinition","invalidation","viewof rememberState"], _calculatorMachine);
  return main;
}
