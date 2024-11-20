import define1 from "./a2e58f97fd5e8d7c@756.js";

function _1(md){return(
md`# Vega-Lite API v5`
)}

function _2(md){return(
md`The [Vega-Lite JavaScript API](https://github.com/vega/vega-lite-api/) provides a convenient way to write [Vega-Lite](https://vega.github.io/vega-lite) specifications in a programmatic fashion. Scroll down for some usage examples, or browse the [Vega-Lite API example collection](https://observablehq.com/collection/@vega/vega-lite-api)! 

_This notebook uses **version 5** of Vega-Lite and the corresponding Vega-Lite API v5._ To see what's new in version 5, [have a look at the changelog](https://github.com/vega/vega-lite/releases/tag/v5.0.0). To use Vega-Lite version 4, see the [Vega-Lite API v4 notebook](https://observablehq.com/@vega/vega-lite-api) instead.

Want to learn more about data visualization and how to use the Vega-Lite API? Read the [introduction to Vega-Lite](https://observablehq.com/@uwdata/introduction-to-vega-lite) and the [data visualization curriculum](https://observablehq.com/@uwdata/data-visualization-curriculum?collection=@uwdata/visualization-curriculum).`
)}

function _3(md){return(
md`
The cell below imports the Vega-Lite API and registers the desired versions of Vega and Vega-Lite, along with default [Vega View options](https://vega.github.io/vega/docs/api/view/#view) and [Vega-Lite configuration](https://vega.github.io/vega-lite/docs/config.html):
`
)}

async function _vl(vegaVersion,vlVersion,apiVersion,tooltipVersion,require)
{
  const [vega, vegalite, api, tooltip] = await Promise.all([
    `vega@${vegaVersion}`,
    `vega-lite@${vlVersion}`,
    `vega-lite-api@${apiVersion}`,
    `vega-tooltip@${tooltipVersion}`
  ].map(module => require(module)));

  const options = {
    config: {
      // vega-lite default configuration
      config: {
        view: {continuousWidth: 400, continuousHeight: 300},
        mark: {tooltip: null}
      }
    },
    init: view => {
      // initialize tooltip handler
      view.tooltip(new tooltip.Handler().call);
      // enable horizontal scrolling for large plots
      if (view.container()) view.container().style['overflow-x'] = 'auto';
    },
    view: {
      // view constructor options
      loader: vega.loader({baseURL: 'https://cdn.jsdelivr.net/npm/vega-datasets@2/'}),
      renderer: 'canvas'
    }
  };
  
  return api.register(vega, vegalite, options);
}


function _apiVersion(){return(
'5.6.0'
)}

function _vlVersion(){return(
'5.6.0'
)}

function _vegaVersion(){return(
'5.23.0'
)}

function _tooltipVersion(){return(
'0.30.0'
)}

function _9(md){return(
md`To use the same setup in your own notebooks, add a cell with the following code:
~~~ js
import {vl} from '@vega/vega-lite-api-v5'
~~~
To use the API outside of Observable, see the [stand-alone usage instructions](#standalone_use) below.
`
)}

function _zip_codes(md){return(
md`<hr/>
## Zip Codes

A dot for each zip code in the United States, colored by the first digit.
`
)}

function _11(vl,width){return(
vl.markSquare({size: 2, opacity: 1})
  .data('data/zipcodes.csv')
  .transform(vl.calculate('substring(datum.zip_code, 0, 1)').as('digit'))
  .project(
    vl.projection('albersUsa')
  )
  .encode(
    vl.longitude().fieldQ('longitude'),
    vl.latitude().fieldQ('latitude'),
    vl.color().fieldN('digit')
  )
  .width(width)
  .height(Math.floor(width / 1.75))
  .autosize({type: 'fit-x', contains: 'padding'})
  .config({view: {stroke: null}})
  .render()
)}

function _interactive_weather(md){return(
md`<hr/>
## Interactive Seattle Weather 2012-2015

A scatter plot and summary histogram with linked selections between plots to perform cross-filtering and configure conditional color encodings.
`
)}

function _13(vl,width)
{
  const brush = vl.selectInterval().encodings('x');
  const click = vl.selectPoint().encodings('color');

  const scale = {
    domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
    range: ['#e7ba52', '#a7a7a7', '#aec7e8', '#1f77b4', '#9467bd']
  };

  const plot1 = vl.markPoint({filled: true})
    .encode(
      vl.color().value('lightgray')
        .if(brush, vl.color().fieldN('weather').scale(scale).title('Weather')),
      vl.size().fieldQ('precipitation').scale({domain: [-1, 50], range: [10, 500]}).title('Precipitation'),
      vl.order().fieldQ('precipitation').sort('descending'),
      vl.x().timeMD('date').axis({title: 'Date', format: '%b'}),
      vl.y().fieldQ('temp_max').scale({domain: [-5, 40]}).axis({title: 'Maximum Daily Temperature (°C)'})
    )
    .width(width)
    .height(300)
    .params(brush)
    .transform(vl.filter(click));

  const plot2 = vl.markBar()
    .encode(
      vl.color().if(click, vl.color().fieldN('weather')).value('lightgray')
        .scale(scale).title('Weather'),
      vl.x().count(),
      vl.y().fieldN('weather').scale({domain: scale.domain}).title('Weather')
    )
    .width(width)
    .params(click)
    .transform(vl.filter(brush));

  return vl.vconcat(plot1, plot2)
    .data('data/seattle-weather.csv')
    .autosize({type: 'fit-x', contains: 'padding'})
    .render();
}


function _population_pyramid(md){return(
md`<hr/>
## Population Pyramid

A [population pyramid](https://en.wikipedia.org/wiki/Population_pyramid) shows the distribution of age groups in a population. Drag the slider to see the U.S. change over time, but watch out for [missing data in 1890!](https://www.census.gov/history/www/faqs/genealogy_faqs/why_cant_i_find_1890_census_records.html) The slider is generated internally by binding the \`Year\` parameter using \`vl.slider()\`.`
)}

function _15(vl){return(
vl.markBar({ opacity: 0.4 })
  .params(
    vl.param('Year').value(2000).bind(vl.slider(1850, 2000, 10))
  )
  .data('data/population.json')
  .transform(
    vl.calculate('datum.sex === 1 ? "Male" : "Female"').as('sex'),
    vl.filter('datum.year === Year')
  )
  .encode(
    vl.x().sum('people').scale({ domain: [0, 12e6] }).stack(null).title('People'),
    vl.y().fieldO('age').sort('descending').title('Age'),
    vl.color().fieldN('sex').scale({ range: ['#675193', '#ca8861'] }).title('Sex')
  )
  .height(300) // fix the height to keep stability over missing data
  .render()
)}

function _bind_external(md){return(
md`### Bind Parameters to External Inputs

As an alternative to having Vega-Lite generate its own input widgets (as with \`vl.slider()\` above), we can also directly bind a Vega-Lite parameter to an existing widget, such as Observable's \`Range\` component:`
)}

function _year(Range){return(
Range([1850, 2000], { step: 10, value: 2000 })
)}

function _19(vl,$0){return(
vl.markBar({ opacity: 0.4 })
  .params(
    // use viewof to bind to the input element (the view), not the numeric year value
    vl.param('Year').bind($0)
  )
  .data('data/population.json')
  .transform(
    vl.calculate('datum.sex === 1 ? "Male" : "Female"').as('sex'),
    vl.filter('datum.year === Year')
  )
  .encode(
    vl.x().sum('people').scale({ domain: [0, 12e6] }).stack(null).title('People'),
    vl.y().fieldO('age').sort('descending').title('Age'),
    vl.color().fieldN('sex').scale({ range: ['#675193', '#ca8861'] }).title('Sex')
  )
  .height(300)
  .render()
)}

function _dynamic_scatter(md){return(
md`<hr/>
## Dynamic Query Scatter Plot

A scatter plot of automobile mileage and horsepower. (Shift-)Click the legend and drag the slider to filter by Origin and Year.`
)}

function _21(vl)
{
  const isOrigin = vl.selectPoint('isOrigin')
    .fields('Origin')
    .bind('legend'); // bind to legend interactions
 
  const isYear = vl.selectPoint('isYear')
    .fields('Year').value(1970)
    .bind(vl.slider(1970, 1980, 1).name('Year')); // bind to slider
  
  const show = vl.and(isOrigin, isYear); // combine selections

  return vl.markCircle()
    .data('data/cars.json')
    .transform(
      vl.calculate('year(datum.Year)').as('Year')
    )
    .params(isOrigin, isYear) // add selections to plot
    .encode(
      vl.x().fieldQ('Horsepower'),
      vl.y().fieldQ('Miles_per_Gallon'),
      vl.color().if(show, vl.color().fieldN('Origin')).value('grey'),
      vl.opacity().if(show, vl.value(1.0)).value(0.2)
    )
    .render();
}


function _parallel_coordinats(md){return(
md`<hr/>
## Parallel Coordinates

A [parallel coordinates plot](https://en.wikipedia.org/wiki/Parallel_coordinates) that uses \`window\` and \`fold\` transforms to convert the four dimensions of penguin measurements into normalized coordinates that can be visualized as \`line\` marks. The graphic includes an additional layer with custom \`text\` mark labels for the parallel axis grid lines. We render the plot as SVG by passing \`{renderer:'svg'}\` to the \`render\` method.
`
)}

function _23(vl,width)
{
  const domain = [
    'Beak Length (mm)',
    'Beak Depth (mm)',
    'Flipper Length (mm)',
    'Body Mass (g)'
  ];

  const scale = {
    type: 'point',
    padding: 0
  };
  
  const axis = {
    domain: false,
    ticks: false,
    title: false,
    grid: true,
    gridColor: '#888',
    labelAngle: 0,
    labelPadding: 8,
    labelFontWeight: 'bold'
  };

  const lines = vl.markLine({
      strokeWidth: 1.5,
      opacity: 0.5
    })
    .encode(
      vl.color().fieldN('Species').sort('descending'),
      vl.detail().fieldN('index'),
      vl.x().fieldO('key').scale(scale).axis(axis),
      vl.y().fieldQ('fraction').axis(null)
    );

  const labels = vl.markText({
      dx: -2,
      align: 'right',
      baseline: 'middle'
    })
    .transform(
      vl.groupby('key').aggregate(vl.min('value').as('min'), vl.max('value').as('max')),
      vl.fold('min', 'max').as('op', 'value'),
      vl.groupby('key').window(vl.percent_rank('value').as('fraction'))
    )
    .encode(
      vl.x().fieldN('key'),
      vl.y().fieldQ('fraction').axis(null),
      vl.text().field('value').format(',')
    );

  const plot = vl.layer(lines, labels)
    .data('data/penguins.json')
    .transform(
      vl.filter('datum["Beak Length (mm)"] != null'),
      vl.window(vl.row_number().as('index')),
      vl.fold(domain).as('key', 'value'),
      vl.groupby('key').join(vl.min('value').as('min'), vl.max('value').as('max')),
      vl.calculate('(datum.value - datum.min) / (datum.max - datum.min)').as('fraction')
    )
    .width(width)
    .height(300)
    .autosize({type: 'fit-x', contains: 'padding'})

  return plot.render({renderer: 'svg'});
}


function _standalone_use(md,apiVersion){return(
md`<hr/>
## Stand-Alone Usage in a Web Browser

To use the Vega-Lite API in the browser outside of Observable, you need to include all the dependencies, set the default configuration, and then register the Vega libraries. Here is some starting code to build from:

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-lite-api@${apiVersion}"></script>
    <script src="https://cdn.jsdelivr.net/npm/vega-tooltip"></script>
  </head>
  <body>
    <div id="view"></div>

    <script>
      // setup API options
      const options = {
        config: {
          // Vega-Lite default configuration
        },
        init: (view) => {
          // initialize tooltip handler
          view.tooltip(new vegaTooltip.Handler().call);
        },
        view: {
          // view constructor options
          // remove the loader if you don't want to default to vega-datasets!
          loader: vega.loader({
            baseURL: "https://cdn.jsdelivr.net/npm/vega-datasets@2/",
          }),
          renderer: "canvas",
        },
      };

      // register vega and vega-lite with the API
      vl.register(vega, vegaLite, options);

      // now you can use the API!
      vl.markBar({ tooltip: true })
        .data([
          { a: "A", b: 28 }, { a: "B", b: 55 }, { a: "C", b: 43 },
          { a: "D", b: 91 }, { a: "E", b: 81 }, { a: "F", b: 53 },
          { a: "G", b: 19 }, { a: "H", b: 87 }, { a: "I", b: 52 },
        ])
        .encode(
          vl.x().fieldQ("b"),
          vl.y().fieldN("a"),
          vl.tooltip([vl.fieldQ("b"), vl.fieldN("a")])
        )
        .render()
        .then(viewElement => {
          // render returns a promise to a DOM element containing the chart
          // viewElement.value contains the Vega View object instance
          document.getElementById('view').appendChild(viewElement);
        });
    </script>
  </body>
</html>

~~~`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("vl")).define("vl", ["vegaVersion","vlVersion","apiVersion","tooltipVersion","require"], _vl);
  main.variable(observer("apiVersion")).define("apiVersion", _apiVersion);
  main.variable(observer("vlVersion")).define("vlVersion", _vlVersion);
  main.variable(observer("vegaVersion")).define("vegaVersion", _vegaVersion);
  main.variable(observer("tooltipVersion")).define("tooltipVersion", _tooltipVersion);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("zip_codes")).define("zip_codes", ["md"], _zip_codes);
  main.variable(observer()).define(["vl","width"], _11);
  main.variable(observer("interactive_weather")).define("interactive_weather", ["md"], _interactive_weather);
  main.variable(observer()).define(["vl","width"], _13);
  main.variable(observer("population_pyramid")).define("population_pyramid", ["md"], _population_pyramid);
  main.variable(observer()).define(["vl"], _15);
  main.variable(observer("bind_external")).define("bind_external", ["md"], _bind_external);
  const child1 = runtime.module(define1);
  main.import("Range", child1);
  main.variable(observer("viewof year")).define("viewof year", ["Range"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer()).define(["vl","viewof year"], _19);
  main.variable(observer("dynamic_scatter")).define("dynamic_scatter", ["md"], _dynamic_scatter);
  main.variable(observer()).define(["vl"], _21);
  main.variable(observer("parallel_coordinats")).define("parallel_coordinats", ["md"], _parallel_coordinats);
  main.variable(observer()).define(["vl","width"], _23);
  main.variable(observer("standalone_use")).define("standalone_use", ["md","apiVersion"], _standalone_use);
  return main;
}
