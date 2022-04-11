function _options(){return(
{}
)}

async function _nunjucks(require,options)
{
  const nunjucks = await require("nunjucks@3.2.3/browser/nunjucks.min.js");
  nunjucks.env = nunjucks.configure(options);
  if (options.configure) options.configure(nunjucks.env);
  return nunjucks;
}


function _3(require){return(
require("nunjucks@3.2.3/browser/nunjucks.min.js")
)}

function _tex(nunjucks,_)
{
  const uid = () => Math.random().toString(16).substring(2);
  const interleaveArrays = (arr1, arr2) => {
    const result = new Array(arr1.length + arr2.length);
    for (var i = 0; i < arr2.length; i++) {
      result[i * 2] = arr1[i];
      result[i * 2 + 1] = arr2[i];
    }
    result[result.length - 1] = arr1[arr1.length - 1];
    return result;
  };
  return {
    block: (source, ...values) => {
      const context = {};
      values.forEach((value, i) => (context["v" + uid()] = value));
      const template = nunjucks.compile(
        interleaveArrays(source, Object.keys(context)).join(""),
        nunjucks.env
      );
      const baseRender = template.__proto__.render;
      template.render = function (ctx, ...args) {
        debugger;
        ctx = _.merge(ctx || {}, context);
        return baseRender.call(template, ctx, ...args);
      };
      return template;
    }
  };
}


async function _stdMd(stdlib){return(
await new stdlib.Library().md()
)}

function _md(stdMd,tex){return(
(source, ...values) => stdMd`${tex.block(source, ...values).render()}`
)}

async function _stdHtl(stdlib){return(
await new stdlib.Library().htl()
)}

function _htl(tex,stdHtl){return(
{
  html: (source, ...values) => {
    const strings = [tex.block(source, ...values).render()];
    strings.raw = strings;
    return stdHtl.html(strings);
  }
}
)}

function _stdlib(nunjucks,require){return(
nunjucks, require("@observablehq/stdlib@3.15.4/dist/stdlib.js")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("options")).define("options", _options);
  main.variable(observer("nunjucks")).define("nunjucks", ["require","options"], _nunjucks);
  main.variable(observer()).define(["require"], _3);
  main.variable(observer("tex")).define("tex", ["nunjucks","_"], _tex);
  main.variable(observer("stdMd")).define("stdMd", ["stdlib"], _stdMd);
  main.variable(observer("md")).define("md", ["stdMd","tex"], _md);
  main.variable(observer("stdHtl")).define("stdHtl", ["stdlib"], _stdHtl);
  main.variable(observer("htl")).define("htl", ["tex","stdHtl"], _htl);
  main.variable(observer("stdlib")).define("stdlib", ["nunjucks","require"], _stdlib);
  return main;
}
