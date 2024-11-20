function _1(md){return(
md`# Sticky footer in list`
)}

function _2(htl){return(
htl.html`
<ul style="background: yellow;">
  <div class="footer"><b>my footer</b> is cool</div>
  <li>one</li>
  <li>two</li>
</ul>`
)}

function _3(htl){return(
htl.html`<style>
.footer {
  position: absolute;
  bottom: 0px;
}

li:last-child {
  padding-bottom: 50px
}

</style>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["htl"], _2);
  main.variable(observer()).define(["htl"], _3);
  return main;
}
