// https://observablehq.com/@tomlarkworthy/nunjucks@647
import define1 from "./b419f4d2dc70c295@464.js";
import define2 from "./293899bef371e135@290.js";

function _1(md){return(
md`# 👋 Hello Nunjucks

[Nunjucks](https://mozilla.github.io/nunjucks/) is a fully featured string templating engine by Mozilla. It's very powerful and well known for building websites and programmatic documentation. It can be used to create reusable snippets for markdown, html or anything else! It is one of main engines in the popular [Eleventy](https://www.11ty.dev/) static site builder, so you can often find commercial website templates using Nunjucks (templates use the *.njs* extension)

In this integration we bind the Nunjucks processor to the *html*, *md* and *tex* *cellmodes*. Tex is used to create high performance compiled templates, perhaps useful for servers. *htl* and *md* adds the Nunjucks process into *html* and *md* blocks. You don't need to import all of them though!`
)}

function _2(md){return(
md`### Configure and Import

Configuration is done inline with importing the dependency, if you wish to customize, override the *options* object. Import the tex, htl or md variables to get the custom cell mode. Note you should import the [nunjucks-min](https://observablehq.com/@tomlarkworthy/nunjucks) notebook rather than this one.

~~~js
import { nunjucks, tex, md, html} with { options } from "@tomlarkworthy/nunjucks-min"
~~~`
)}

function _options(){return(
{
  lstripBlocks: true, // automatically remove leading whitespace from a block/tag
  trimBlocks: true, // automatically remove trailing newlines from a block/tag
  configure: (env) => {
    // Hook to perform additional configuration of the Environemnt (e.g. addFilters, addExtension)
  }
}
)}

function _5(md){return(
md`### Vanilla Use

Nunjucks has a function *renderString*, or *render* on a compiled template, passing the context variables as an object to hydrate into the template. `
)}

function _6(nunjucks){return(
nunjucks.renderString("Hello {{ username }}", { username: "James" })
)}

function _template(nunjucks){return(
nunjucks.compile("Hello {{ username }}")
)}

function _8(template){return(
template.render({ username: "James" })
)}

function _9(md){return(
md`### import Tex for *template compilation*

We override the Tex cellmode so we have have a custom nunjuck template cellmode which generates compiled templates. This is very useful for webserver usage where a template is repeatedly used.`
)}

function _helloExampleTemplate(tex){return(
tex.block`Hello {{ username }}`
)}

function _11(md){return(
md`so if you name the cell, you can reference it in other cells to render it`
)}

function _12(helloExampleTemplate){return(
helloExampleTemplate.render({ username: "James" })
)}

function _13(md){return(
md`Templates can define functionality for other templates to import`
)}

function _definitions_njk(tex){return(
tex.block`{% macro callout(content) %}
<div style="border-radius: 10px;background-color: yellow;border: solid;padding:10px;padding-left: 50px; display: flex">
  <span>💡<span>
  <span>{{caller()}}</span>
</div>
{% endmacro %}

{% macro user(name) %}
<a href="https://observablehq.com/@{{name}}" target="_blank">@{{name}}</a>
{% endmacro %}`
)}

function _15(md){return(
md`### import htl for *rendering* HTML

We override the HTML cellmode (note variable is called *htl* though) to produce DOM content while accepting nunjucks code`
)}

function _16(definitions_njk,htl){return(
htl.html`{# Comments in HTML #}
{% from ${definitions_njk} import callout %}

{% call callout() %}
  Callout are useful for creating <b>readable</b> documentation. It's easy to encapsulate features like this into <i>macros</i>
{% endcall %}
      `
)}

function _17(md){return(
md`### import md for *rendering* MD cells

We override the Markdown cellmode (note variable is called *md*) to produce DOM content from Markdown source.`
)}

function _18(definitions_njk,md){return(
md`{# Normally macros are imported from other templates #}
{% from ${definitions_njk} import user %}
    
This notebook was written by {{ user('tomlarkworthy') }}
      `
)}

function _19(md){return(
md`### Using cell variables

Instead of passing variables in the render, you can use template variables. These variables are automatically bound to the render function via some monkey patching.`
)}

function _username(){return(
"James as a cell variable"
)}

function _templateVariables(username,tex){return(
tex.block`Hello {{ ${username}}}`
)}

function _22(templateVariables){return(
templateVariables.render()
)}

function _23(md){return(
md`### Comments`
)}

function _comment(md){return(
md`{# This is how you comment #}
Only this renders`
)}

function _25(definitions_njk,md){return(
md`### Extending a base template

Nunjucks supports single inheritance of templates. Extension templates can fill in the blocks defined by the ancestor. 

{% from ${definitions_njk} import callout %}

{% call callout() %}
  The hack to support template literal variables breaks down in the parent, so you must pass in an variables you wish to pass across scopes
{% endcall %}

`
)}

function _base_njk(tex){return(
tex.block`<!DOCTYPE html>
<html>
  <head>
    {% block header %}{% endblock %}
  </head>
  <body>
    {% block content %}{% endblock %}
  </body>
  {# DOES NOT WORK #}
  <p> Tag expressions don't work in extends/imports: {{ ${new Date().toString()} }} </p>
  {# the following will work if you set the data variable #}
  <p> You need to set the variables manually in the child: {{ date }} </p>
</html>`
)}

function _title(){return(
"Nunjuck example"
)}

function _items(){return(
{
  apples: 5,
  bananas: "yum"
}
)}

function _templateExample(base_njk,title,items,htl){return(
htl.html`{% set date = ${'🤘'} %}

{% extends ${base_njk} %}
{% block header %}
<h3>{{ ${title} }}</h3>
{% endblock %}
{% block content %}
<ul>
  {% for name, item in ${items} %}
  <li>{{ name }}: {{ item }}</li>
  {% endfor %}
</ul>
{% endblock %}`
)}

function _30(md){return(
md`### Macro

Macros can be passed arguments and expand to chunks of content, similar conceptually to functions. We can use these to create easily reused, parameterized snippets.`
)}

function _observable_njk(tex){return(
tex.block`{% macro user(name) %}
<a href="https://observablehq.com/@{{name}}">@{{name}}</a>
{% endmacro %}`
)}

function _32(md){return(
md`### Imports

there are a few different syntaxes for imports, they can be used to bring in macros from other templates (among other things)`
)}

function _macroExample(observable_njk,htl){return(
htl.html`{% from ${observable_njk} import user %}
Hi {{ user('tomlarkworthy') }}`
)}

function _34(md){return(
md`## Read more

There is more documentation at https://mozilla.github.io/nunjucks/`
)}

function _36(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("options")).define("options", _options);
  const child1 = runtime.module(define1).derive(["options"], main);
  main.import("nunjucks", child1);
  main.import("tex", child1);
  main.import("md", child1);
  main.import("htl", child1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["nunjucks"], _6);
  main.variable(observer("template")).define("template", ["nunjucks"], _template);
  main.variable(observer()).define(["template"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("helloExampleTemplate")).define("helloExampleTemplate", ["tex"], _helloExampleTemplate);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["helloExampleTemplate"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("definitions_njk")).define("definitions_njk", ["tex"], _definitions_njk);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["definitions_njk","htl"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["definitions_njk","md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("username")).define("username", _username);
  main.variable(observer("templateVariables")).define("templateVariables", ["username","tex"], _templateVariables);
  main.variable(observer()).define(["templateVariables"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("comment")).define("comment", ["md"], _comment);
  main.variable(observer()).define(["definitions_njk","md"], _25);
  main.variable(observer("base_njk")).define("base_njk", ["tex"], _base_njk);
  main.variable(observer("title")).define("title", _title);
  main.variable(observer("items")).define("items", _items);
  main.variable(observer("templateExample")).define("templateExample", ["base_njk","title","items","htl"], _templateExample);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("observable_njk")).define("observable_njk", ["tex"], _observable_njk);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("macroExample")).define("macroExample", ["observable_njk","htl"], _macroExample);
  main.variable(observer()).define(["md"], _34);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _36);
  return main;
}
