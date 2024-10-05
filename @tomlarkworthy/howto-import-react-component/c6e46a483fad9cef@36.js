// https://observablehq.com/@j-f1/react-16@36
import define1 from "./309c76100e0d1941@1257.js";

function _1(md,__SECRET_SWITCHER){return(
md`
# React 16

My [React notebook](https://observablehq.com/@j-f1/react), except locked to React 16.x. Using this notebook instead will guard your notebook against breaking changes introduced in future major versions of React.

${__SECRET_SWITCHER('@j-f1/react-16')}
`
)}

function _versionRange(){return(
"16"
)}

function _dev(){return(
true
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","__SECRET_SWITCHER"], _1);
  main.variable(observer("versionRange")).define("versionRange", _versionRange);
  main.variable(observer("dev")).define("dev", _dev);
  const child1 = runtime.module(define1).derive(["versionRange","dev"], main);
  main.import("render", child1);
  main.import("component", child1);
  main.import("jsx", child1);
  main.import("memo", child1);
  main.import("forwardRef", child1);
  main.import("React", child1);
  main.import("ReactDOM", child1);
  main.import("createElement", child1);
  main.import("Children", child1);
  main.import("createRef", child1);
  main.import("createContext", child1);
  main.import("lazy", child1);
  main.import("Fragment", child1);
  main.import("StrictMode", child1);
  main.import("Suspense", child1);
  main.import("cloneElement", child1);
  main.import("useCallback", child1);
  main.import("useContext", child1);
  main.import("useEffect", child1);
  main.import("useImperativeHandle", child1);
  main.import("useLayoutEffect", child1);
  main.import("useMemo", child1);
  main.import("useReducer", child1);
  main.import("useRef", child1);
  main.import("useState", child1);
  main.import("useDebugValue", child1);
  main.import("createPortal", child1);
  main.import("__SECRET_SWITCHER", child1);
  return main;
}
