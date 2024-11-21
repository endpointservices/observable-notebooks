function _1(md,tex){return(
md`
# Kernel Density Estimation

As per Wikipedia:

> The kernel density estimation (KDE) is a way to estimate the PDF of a random variable.

This estimation will help us understand how does a distribution behave based on three elements:

1. Sample dataset of size ${tex `n`}
2. A kernel function ${tex `K`}
3. The _bandwidth_ parameter ${tex `h`}

With those three elements, we'll be able to build a function that, given an ${tex `x`}, will try to estimate the frecuency of ${tex `x`} within the distribution of our random variable.

As an example, let's say that we have a sample of a random variable ${tex `Z \sim N(0, 1)`}. The PDF function of a standard normal distribution is:

> ${tex `f(x) = \frac{e^{\frac{-x}{2}}}{\sqrt{2\pi}}`}

With ${tex `x = 0`} we get ${tex `f(0) \approx 0.3989`}, so we'll want our KDE ${tex `\hat{f}(0)`} to be near ${tex `0.3989`}. 

This approximation should happen not only for ${tex `x = 0`} but for every value of the domain of ${tex `f`}.

The thing is, when you already know the distribution that ${tex `Z`} follows, the KDE doesn't make much sense as you already know the PDF. But what happens when you **can't be sure** about the distribution that follows a random variable ${tex `X`}?

Given this explanation, this is how our approximation ${tex `\hat{f}`} is calculated:

> ${tex `\hat{f}(x) = \frac{1}{nh} \sum_{i=1}^{n} K(\frac{x - x_i}{h})`}

With ${tex `K`} being a kernel function of our choice.

It seems pretty scary at first, but we'll go visually through all those parts to gain the intuition behind it.
`
)}

function _2(md){return(
md`

## Generating our sample data

First of all, we'll need some data to analyze.

You should click in the grey area of the screen, as a rule of thumb, 30 clicks is enough but the more the merrier!

`
)}

function* _canvas(DOM,width,height,$0,clicks)
{
  const context = DOM.context2d(width, height);

  context.canvas.style.background = "#333";
  
  const clicksWithAlpha = [];
  
  context.canvas.addEventListener('click', e => {
    ($0.value) = [...clicks, [e.offsetX, e.offsetY]];
    
    context.fillStyle = '#f00';

    context.beginPath();
    context.arc(e.offsetX, e.offsetY, 10, 0, 2 * Math.PI);
    
    context.fill();
    context.stroke();
    
    context.save();
  }, false);
  
  while (true) {    
    context.save();
    
    context.fillStyle = '#66666611';
    context.fillRect(0, 0, width, height);
    
    context.font = '50px "Source Serif Pro"';
    context.fillStyle = (clicks.length > 30 ? '#ffffff66' : '#ffeeee');
    context.textAlign = 'center';
    context.fillText(clicks.length, width / 2, (height + 50) / 2);
    
    yield context.canvas;    
  }

}


function _4(md){return(
md`

You can analyze the x coordinate, the y coordinate or the distance to the center of the grey area of your clicks.

Select the variable to analyze and check its histogram below.

`
)}

function _variable(DOM){return(
DOM.select(['x', 'y', 'distance to the center'])
)}

function _data(variable,clicks,width,height)
{
    
  if (variable == 'x') {
    return clicks.map(c => c[0]);
  } else if (variable == 'y') {
    return clicks.map(c => c[1]);
  } else if (variable == 'distance to the center') {
    return clicks.map(c => Math.sqrt(Math.pow(c[0] - width / 2, 2) + Math.pow(c[1] - height / 2, 2)));
  }

}


function _hist(d3,width,height,bins,x,y,data,binWidth,xAxis,yAxis)
{
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("fill", "#bbb")
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => x(d.x0) + 1)
      .attr("y", d => y(d.length / data.length / binWidth))
      .attr("width", d => x(d.x1) - x(d.x0) - 1)
      .attr("height", d => y(0) - y(d.length / data.length / binWidth));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}


function _8(md,tex){return(
md`

I have no idea what kind of histogram you are looking at (as you've generated your own data randomly) but the idea of a KDE is to estimate its shape, so I'm sure we'll be able to draw a curve that approximates the figure you're looking at pretty nicely.

## Kernel

Let's start by analyzing what happens when we apply the kernel function ${tex `K`} to one single element from our sample, as this is the core of the KDE.

We'll use the Epanechnikov kernel (there are many kernels to choose from, check them [here](https://en.wikipedia.org/wiki/Kernel_(statistics)) as our selected ${tex `K`}:

> ${tex `K(x) = \frac{3}{4}(1 - x^2)` }

As a kernel function can't be negative, ${tex `K`} is ${tex `0`} if ${tex `1 - x^2 < 0`}.

`
)}

function _9(md,tex,chosen_element,variable){return(
md`

We will work with ${tex `\hat{x} = ${ chosen_element ? chosen_element.toFixed(2) : '?' }` }, which was the _${ variable }_ value of one of your clicks.

Let's see first how does the kernel behaves with ${tex `\hat{x}`}.

`
)}

function _chosen_element(data){return(
data[Math.floor(Math.random() * data.length)]
)}

function _11(d3,width,height,chosen_element,bandwidth,epanechnikov,margin,data)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  const f = xValue => (xValue - chosen_element) / bandwidth;
  const xRange = d3.range(Math.floor(chosen_element - 2 * bandwidth), Math.floor(chosen_element + 2 * bandwidth));
  const image = xRange.map(v => [v, f(v)]);
  const k = xRange.map(v => [v, epanechnikov((v - chosen_element) / bandwidth)]);
  
  const kernelX = d3.scaleLinear()
    .domain(d3.extent(xRange)).nice()
    .range([margin.left, width - margin.right]);
  
  const kernelY = d3.scaleLinear()
    .domain([d3.min(image, d => d[1]), d3.max(image, d => d[1])])
    .range([height - margin.bottom, margin.top]);
  
  svg.append('rect')
    .attr('x', kernelX(chosen_element))
    .attr('y', kernelY(0) - 20)
    .attr('width', 3)
    .attr('height', 20)
    .attr('fill', '#ff000066');

  const area = d3.line()
    .curve(d3.curveBasis)
    .x(d => kernelX(d[0]))
    .y(d => kernelY(d[1]));

  svg.append("path")
    .datum(image)
    .attr("fill", "#00000000")
    .attr('stroke', '#bbb')
    .attr("d", area)
    .attr('stroke-dasharray', '5,5');

  const kernelCurve = d3.line()
    .curve(d3.curveBasis)
    .x(d => kernelX(d[0]))
    .y(d => kernelY(d[1]));

  svg.append("path")
    .datum(k)
    .attr("fill", "#00000000")
    .attr('stroke', '#bbb')
    .attr("stroke-linejoin", "round")
    .attr("d", kernelCurve);
  
  const xAxis = g => g
    .attr("transform", `translate(0,${ kernelY(0) })`)
    .call(d3.axisBottom(kernelX))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(data.title))
  
  svg.append('g')
      .call(xAxis);
  
  return svg.node();
}


function _12(md,tex,chosen_element){return(
md`

What are we looking at right now?

The dotted line represents the function ${tex `u(x) = \frac{x - ${ chosen_element ? chosen_element.toFixed(2) : '?' }}{h}` }, while the solid curve represents ${tex `K(u(x))`}.

You can see how the bump gets taller whenever the dotted line gets near the horizontal axis and near ${tex `\hat{x}`}.

This helps us to model the "presence" of our element with a continous function. Each element of our sample will have its corresponding bump. This will be handy for the KDE.

Here are all the bumps that your clicks generated:

`
)}

function* _13(d3,width,height,xAxis,bandwidth,epanechnikov,x,N,margin,y,Promises,data)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
    
  svg.append("g")
      .call(xAxis);
  
  const drawClick = (click) => {
    const kernel = (u) => {
      const kernelArg = u / bandwidth;

      return epanechnikov(kernelArg) / bandwidth;
    };

    const kernelEstimation = x.ticks(1000)
      .map(v => [v, kernel(v - click) / N]);

    const area = d3.area()
      .curve(d3.curveBasis)
      .x(d => x(d[0]))
      .y0(height - margin.bottom)
      .y1(d => y(d[1]));

    svg.append("path")
        .datum(kernelEstimation)
        .attr("fill", "#00000010")
        .attr("stroke-linejoin", "round")
        .attr("d", area);
  };
  
  let nClick = 0;
  while (true) {
    yield Promises.delay(25, svg.node());
    
    drawClick(data[nClick]);
    nClick++;
    
    if (nClick >= N) {
      return;
    }
  }
}


function _14(md){return(
md`

## Generating the KDE

The KDE sums all those bumps to generate a new function, which is the one that approximates our histogram. That's it.

First of all, let's understand how does summing those bumps work.

I'll let you click the button to generate new bumps and see what's the resulting sum.

`
)}

function _bumps(html,d3)
{
  let value = [];
  const button = html`<button>Add bump`;
  Object.defineProperty(button, "value", {get() { return value; }});
  button.onclick = () => value.push(d3.randomNormal(300, 20)());
  
  return button;
}


function _16(d3,width,height,bandwidth,epanechnikov,bumps,x,margin,xAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  const kernel = (u) => {
    const kernelArg = u / bandwidth;

    return epanechnikov(kernelArg) / bandwidth;
  };

  const kernelBumps = bumps.map(b => (x => kernel(x - b)));
  
  const sumKernels = x.ticks(1000)
    .map(x => {
      return [
        x,
        kernelBumps
          .map(k => k(x))
          .reduce((a, b) => a + b, 0)
      ]
    });
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(sumKernels, d => d[1])])
    .range([height - margin.bottom, margin.top])

  const area = d3.area()
    .curve(d3.curveBasis)
    .x(d => x(d[0]))
    .y0(height - margin.bottom)
    .y1(d => yScale(d[1]));
   
  svg.append("path")
    .datum(sumKernels)
    .attr("fill", "#00000010")
    .attr("stroke-linejoin", "round")
    .attr("d", area);
  
  const bumpsGroup = svg.append('g');

  kernelBumps.forEach(kernelBump => {
    const bumpData = x.ticks(1000)
      .map(v => [v, kernelBump(v)]);
    
    const bumpArea = d3.area()
      .curve(d3.curveBasis)
      .x(d => x(d[0]))
      .y0(height - margin.bottom)
      .y1(d => yScale(d[1]));
         
    const path = bumpsGroup.append("path");
    
    path
      .datum(bumpData)
      .attr("fill", "#cc000020")
      .attr("stroke-linejoin", "round")
      .attr("d", bumpArea);
    });

  
  svg.append("g")
      .call(xAxis);
  
  svg.style = 'mix-blend-mode: screen';
  
  return svg.node();
}


function _17(md,tex){return(
md `

Intuitively, the sum of an area with a high density of bumps, will be higher that an area with no bumps. Check that in the chart above, you should see that darker red areas have a higher grey value.

You may be able to see where are we going here.

Let's check again how the KDE is defined:

> ${tex `\hat{f}(x) = \frac{1}{nh} \sum_{i=1}^{n} K(\frac{x - x_i}{h})`}

If we sum all the bumps that your clicks generated, we get this new curve:

`
)}

function _bandwidth(html)
{
  const form = html`<form>
  <input name=i type=range min=0.1 max=40 value=10 step=any style="width:180px;">
  <output style="font-size:smaller;font-style:oblique;" name=o></output>
</form>`;
  form.i.oninput = () => form.o.value = `${(form.value = form.i.valueAsNumber).toFixed(1)} bandwidth`;
  form.i.oninput();
  return form;
}


function _estimate(d3,width,height,bins,x,y,data,binWidth,xAxis,yAxis,bandwidth,epanechnikov,thresholds,margin)
{
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("g")
    .attr("fill", "#bbb")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", (d) => x(d.x0) + 1)
    .attr("y", (d) => y(d.length / data.length / binWidth))
    .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
    .attr("height", (d) => y(0) - y(d.length / data.length / binWidth));

  svg.append("g").call(xAxis);

  svg.append("g").call(yAxis);

  const kernel = (u) => {
    const kernelArg = u / bandwidth;

    return epanechnikov(kernelArg) / bandwidth;
  };

  const kernelEstimation = thresholds.map((t) => [
    t,
    d3.mean(data, (d) => kernel(t - d))
  ]);

  const area = d3
    .area()
    .curve(d3.curveBasis)
    .x((d) => x(d[0]) + 1)
    .y0(height - margin.bottom)
    .y1((d) => y(d[1]));

  svg
    .append("path")
    .data([kernelEstimation])
    .attr("fill", "#ff000033")
    .attr("d", area);

  return svg.node();
}


function _20(md){return(
md`

Play with the bandwidth selector and see if you can get a curve that adjusts properly to the histogram. This parameter influences the width and height of all the particular bumps; a higher bandwidth will smooth the curve.

And that's it! We managed to get a continuous function that approximates the frequency of our sample data.

Hope you have a better understanding on how does KDE work!

`
)}

function _epanechnikov(){return(
function epanechnikov(u) {
  return Math.abs(u) <= 1 ? 0.75 * (1 - u * u) : 0;
}
)}

function _margin(){return(
{ top: 50, bottom: 50, left: 50, right: 50 }
)}

function _binWidth(bins){return(
bins[0]['x1'] - bins[0]['x0']
)}

function _bins(d3,x,thresholds,data)
{
  
  const bin = d3.histogram()
    .domain(x.domain())
    .thresholds(thresholds);
  
  return bin(data);
  
}


function _thresholds(x,N){return(
x.ticks(Math.round(N / 4))
)}

function _yAxis(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, "%"))
    .call(g => g.select(".domain").remove())
)}

function _xAxis(height,margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .attr("font-weight", "bold")
        .text(data.title))
)}

function _y(d3,bins,data,binWidth,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length) / (data.length * binWidth)])
    .range([height - margin.bottom, margin.top])
)}

function _x(d3,data,margin,width){return(
d3.scaleLinear()
        .domain([0, d3.max(data)]).nice()
        .range([margin.left, width - margin.right])
)}

function _N(clicks){return(
clicks.length
)}

function _clicks(){return(
[]
)}

function _width(){return(
800
)}

function _height(){return(
400
)}

function _d3(require){return(
require('d3')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","tex"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","mutable clicks","clicks"], _canvas);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof variable")).define("viewof variable", ["DOM"], _variable);
  main.variable(observer("variable")).define("variable", ["Generators", "viewof variable"], (G, _) => G.input(_));
  main.variable(observer("data")).define("data", ["variable","clicks","width","height"], _data);
  main.variable(observer("hist")).define("hist", ["d3","width","height","bins","x","y","data","binWidth","xAxis","yAxis"], _hist);
  main.variable(observer()).define(["md","tex"], _8);
  main.variable(observer()).define(["md","tex","chosen_element","variable"], _9);
  main.variable(observer("chosen_element")).define("chosen_element", ["data"], _chosen_element);
  main.variable(observer()).define(["d3","width","height","chosen_element","bandwidth","epanechnikov","margin","data"], _11);
  main.variable(observer()).define(["md","tex","chosen_element"], _12);
  main.variable(observer()).define(["d3","width","height","xAxis","bandwidth","epanechnikov","x","N","margin","y","Promises","data"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof bumps")).define("viewof bumps", ["html","d3"], _bumps);
  main.variable(observer("bumps")).define("bumps", ["Generators", "viewof bumps"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","width","height","bandwidth","epanechnikov","bumps","x","margin","xAxis"], _16);
  main.variable(observer()).define(["md","tex"], _17);
  main.variable(observer("viewof bandwidth")).define("viewof bandwidth", ["html"], _bandwidth);
  main.variable(observer("bandwidth")).define("bandwidth", ["Generators", "viewof bandwidth"], (G, _) => G.input(_));
  main.variable(observer("estimate")).define("estimate", ["d3","width","height","bins","x","y","data","binWidth","xAxis","yAxis","bandwidth","epanechnikov","thresholds","margin"], _estimate);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("epanechnikov")).define("epanechnikov", _epanechnikov);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("binWidth")).define("binWidth", ["bins"], _binWidth);
  main.variable(observer("bins")).define("bins", ["d3","x","thresholds","data"], _bins);
  main.variable(observer("thresholds")).define("thresholds", ["x","N"], _thresholds);
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], _yAxis);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width","data"], _xAxis);
  main.variable(observer("y")).define("y", ["d3","bins","data","binWidth","height","margin"], _y);
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], _x);
  main.variable(observer("N")).define("N", ["clicks"], _N);
  main.define("initial clicks", _clicks);
  main.variable(observer("mutable clicks")).define("mutable clicks", ["Mutable", "initial clicks"], (M, _) => new M(_));
  main.variable(observer("clicks")).define("clicks", ["mutable clicks"], _ => _.generator);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
