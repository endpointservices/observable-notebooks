function _1(md){return(
md`# Taktile`
)}

function _2(md){return(
md`Write a fun, takes 2 integers, multiplies them without X`
)}

function _3(Inputs){return(
Inputs.table([
  { a: "-", b: "-", output: "+" },
  { a: "-", b: "+", output: "-" },
  { a: "+", b: "-", output: "-" },
  { a: "+", b: "+", output: "+" }
])
)}

function _multiply(multiplyUnsigned){return(
(a, b) => {
  const invert = (a < 0 || b < 0) && !(a < 0 && b < 0);

  const pos =
    a < b
      ? multiplyUnsigned(Math.abs(a), Math.abs(b))
      : multiplyUnsigned(Math.abs(b), Math.abs(a));

  return invert ? -pos : pos;
}
)}

function _5(multiply){return(
multiply(1000000000, 1)
)}

function _6(multiply){return(
multiply(1, -1)
)}

function _multiplyUnsigned(){return(
(a, b) => {
  let sum = 0;
  for (let i = 0; i < a; i++) {
    sum += b;
  }
  return sum;
}
)}

function _8(md){return(
md`---`
)}

function _multiplyRecusiveUnsigned(){return(
function multiplyRecusiveUnsigned(a, b, sum = 0) {
  if (a == 0) return sum;
  return multiplyRecusiveUnsigned(a - 1, b, sum + b);
}
)}

function _multiplyRecusive(multiplyRecusiveUnsigned){return(
(a, b) => {
  const invert = (a < 0 || b < 0) && !(a < 0 && b < 0);

  const pos =
    a < b
      ? multiplyRecusiveUnsigned(Math.abs(a), Math.abs(b))
      : multiplyRecusiveUnsigned(Math.abs(b), Math.abs(a));

  return invert ? -pos : pos;
}
)}

function _11(multiplyRecusive){return(
multiplyRecusive(-8, 2)
)}

function _12(md){return(
md`---`
)}

function _multiplyRecusiveUnsigned2(multiplyRecusiveUnsigned){return(
function multiplyRecusiveUnsigned2(a, b, sum = 0) {
  if (a == 0) return sum;
  return multiplyRecusiveUnsigned(a - 1, b, sum + b);
}
)}

function _14(multiplyRecusiveUnsigned2){return(
multiplyRecusiveUnsigned2(2, 10)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Inputs"], _3);
  main.variable(observer("multiply")).define("multiply", ["multiplyUnsigned"], _multiply);
  main.variable(observer()).define(["multiply"], _5);
  main.variable(observer()).define(["multiply"], _6);
  main.variable(observer("multiplyUnsigned")).define("multiplyUnsigned", _multiplyUnsigned);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("multiplyRecusiveUnsigned")).define("multiplyRecusiveUnsigned", _multiplyRecusiveUnsigned);
  main.variable(observer("multiplyRecusive")).define("multiplyRecusive", ["multiplyRecusiveUnsigned"], _multiplyRecusive);
  main.variable(observer()).define(["multiplyRecusive"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("multiplyRecusiveUnsigned2")).define("multiplyRecusiveUnsigned2", ["multiplyRecusiveUnsigned"], _multiplyRecusiveUnsigned2);
  main.variable(observer()).define(["multiplyRecusiveUnsigned2"], _14);
  return main;
}
