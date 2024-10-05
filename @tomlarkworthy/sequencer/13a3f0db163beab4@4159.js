function _1(md){return(
md`# Density Plot Library

Standard charts such as scatterplots and line charts have difficulties scaling as data increases due to issues with performance and overplotting. Density plots are an alternative that can handle larger volumes of data, often more quickly.`
)}

function _importStatement(md){return(
md`
~~~js
import { densityPlot, pointDensity, seriesDensity } from '@twitter/density-plot@4159'
~~~
`
)}

function _3(md){return(
md`See the [documentation](https://observablehq.com/@twitter/density-plot-documentation) and [notebook collection](https://observablehq.com/collection/@twitter/density) for examples.

---
`
)}

function _pointDensity(renderPointsGenerator,renderPoints,d3){return(
function pointDensity(xBins, yBins) {
  let x = d => d[0],
    y = d => d[1],
    weight = d => 1,
    xDomain,
    yDomain,
    reduceOp = (x, y) => x + y,
    batchSize = null;
  let ret = data => {
    if (!Number.isInteger(xBins))
      throw new Error(`xBins must be an integer (got ${xBins})`);
    if (!Number.isInteger(yBins))
      throw new Error(`yBins must be an integer (got ${yBins})`);
    if (!xBins || !yBins)
      throw new Error(
        "computing density requires nonzero values for both xBins and yBins."
      );
    return (typeof batchSize == 'number'
      ? renderPointsGenerator
      : renderPoints)(data, ret.options(data));
  };
  ret.options = data => ({
    xBins,
    yBins,
    x,
    y,
    weight,
    xDomain: xDomain || ret.defaultXDomain(data),
    yDomain: yDomain || ret.defaultYDomain(data),
    reduceOp,
    batchSize
  });
  ret.xBins = function(_) {
    return arguments.length ? ((xBins = _), ret) : xBins;
  };
  ret.yBins = function(_) {
    return arguments.length ? ((yBins = _), ret) : yBins;
  };
  ret.x = function(_) {
    return arguments.length ? ((x = _), ret) : x;
  };
  ret.y = function(_) {
    return arguments.length ? ((y = _), ret) : y;
  };
  ret.weight = function(_) {
    return arguments.length ? ((weight = _), ret) : weight;
  };
  ret.xDomain = function(_) {
    return arguments.length ? ((xDomain = _), ret) : xDomain;
  };
  ret.yDomain = function(_) {
    return arguments.length ? ((yDomain = _), ret) : yDomain;
  };
  ret.reduceOp = function(_) {
    return arguments.length ? ((reduceOp = _), ret) : reduceOp;
  };
  ret.batchSize = function(_) {
    return arguments.length ? ((batchSize = _), ret) : batchSize;
  };
  ret.defaultXDomain = data => d3.extent(data, x);
  ret.defaultYDomain = data => d3.extent(data, y);
  ret.copy = function(_) {
    return pointDensity(xBins, yBins)
      .x(x)
      .y(y)
      .weight(weight)
      .xDomain(xDomain)
      .yDomain(yDomain)
      .reduceOp(reduceOp)
      .batchSize(batchSize);
  };
  return ret;
}
)}

function _renderPoints(binScale){return(
function renderPoints(data, options) {
  let {
    x,
    y,
    weight,
    xBins,
    yBins,
    xDomain,
    yDomain,
    batchSize,
    reduceOp
  } = options;
  // the buffer represents data in column-major order for consistency since we sum time series by column
  let buffer = new Float64Array(xBins * yBins);
  let xScale = binScale(xDomain[0], xDomain[1], xBins);
  // invert the y axis. do it this way here rather than by reversing
  // the scale domain so that both dimensions get scaled
  // exactly the same way. Otherwise we'd be rounding one dimension's
  // bin boundaries up and the other down
  let _yScale = binScale(yDomain[0], yDomain[1], yBins);
  let yScale = val => yBins - 1 - _yScale(val);
  let [xLo, xHi] = xDomain;
  let [yLo, yHi] = yDomain;
  let i = 0;
  for (let d of data) {
    let xVal = x(d, i, data);
    let yVal = y(d, i, data);
    // this guards against NaN as well as out-of-bounds values
    if (xLo <= xVal && yLo <= yVal && xVal <= xHi && yVal <= yHi) {
      let xBin = xScale(xVal);
      let yBin = yScale(yVal);
      let index = yBins * xBin + yBin;
      buffer[index] = reduceOp(buffer[index], weight(d, i, data));
    }
    i += 1;
  }
  return buffer;
}
)}

function _renderPointsGenerator(binScale){return(
function* renderPointsGenerator(data, options) {
  let {
    x,
    y,
    weight,
    xBins,
    yBins,
    xDomain,
    yDomain,
    batchSize,
    reduceOp
  } = options;
  let floor = Math.floor;
  // the buffer represents data in column-major order
  let buffer = new Float64Array(xBins * yBins);
  let xScale = binScale(xDomain[0], xDomain[1], xBins);
  // invert the y axis. do it this way here rather than by reversing
  // the scale domain so that both dimensions get scaled
  // exactly the same way. Otherwise we'd be rounding one dimension's
  // bin boundaries up and the other down.
  let _yScale = binScale(yDomain[0], yDomain[1], yBins);
  let yScale = val => yBins - 1 - _yScale(val);
  let [xLo, xHi] = xDomain;
  let [yLo, yHi] = yDomain;
  let i = 0;
  for (let d of data) {
    if (i && i % batchSize == 0) yield buffer; // !
    let xVal = x(d, i, data);
    let yVal = y(d, i, data);
    if (xLo <= xVal && xVal <= xHi && yLo <= yVal && yVal <= yHi) {
      let xBin = xScale(xVal);
      // invert the y axis. we do this here rather than in the /
      // definition of yScale so that both dimensions get scaled
      // exactly the same way, rather than rounding one dimension's
      // bin boundaries up and the other one down
      let yBin = yScale(yVal);
      buffer[yBins * xBin + yBin] = reduceOp(
        buffer[yBins * xBin + yBin],
        weight(d, i, data)
      );
    }
    i += 1;
  }
  yield buffer; // !
}
)}

function _nonnegative(){return(
x => x > 0
)}

function _renderSingleSeries(nonnegative,plotLine){return(
function renderSingleSeries(
  x0,
  ys,
  options,
  xScale,
  yScale,
  { tmpBuf: tmp, tmpSums: sums, tmpMinY: minY, tmpMaxY: maxY },
  ret
) {
  let { xBins, yBins, arcLengthNormalize } = options;
  if (ys.length < 2) return ret;
  let { max, min } = Math;
  let prevX = xScale(x0);
  let prevY = yScale(ys[0]);

  // prepare our temporary buffers
  tmp.fill(0);
  sums.fill(0);
  minY.fill(yBins - 1);
  maxY.fill(0);

  // render all interpolated lines (between adjacent points) to the temp canvas
  // note: the current bresenham implementation assumes integer coordinates.
  let curInBounds = 0 <= prevX && prevX < xBins && 0 <= prevY && prevY < yBins;
  let prevInBounds;
  for (let i = 1; i < ys.length; i++) {
    let curX = xScale(x0 + i);
    let curY = yScale(ys[i]); // perf todo: this could apply a constant increment?
    // this bounds check prevents rendering NaN values as well as datapoints out of bounds
    prevInBounds = curInBounds;
    curInBounds = 0 <= curX && curX < xBins && 0 <= curY && curY < yBins;
    let inBounds = prevInBounds || curInBounds;
    if (inBounds || nonnegative(prevY) != nonnegative(curY)) {
      plotLine(prevX, prevY, curX, curY, (x, y) => {
        // plot only in-bounds pixels
        if (0 <= x && x < xBins && 0 <= y && y < yBins) {
          sums[x] += tmp[yBins * x + y] == 0;
          tmp[yBins * x + y] = 1;
          minY[x] = min(minY[x], y);
          maxY[x] = max(maxY[x], y);
        }
      });
    }
    prevX = curX;
    prevY = curY;
  }

  // normalize the temp canvas by column sums and add to ret canvas
  for (let x = 0; x < xBins; x++) {
    let sum = sums[x];
    if (sum > 0) {
      let scale = arcLengthNormalize ? 1 / sum : 1;
      let lo = yBins * x + minY[x];
      let hi = yBins * x + maxY[x] + 1;
      for (let i = lo; i < hi; i++) ret[i] += tmp[i] * scale;
    }
  }

  return ret;
}
)}

function _seriesDensity(renderSeriesGenerator,renderSeries,d3){return(
function seriesDensity(xBins, yBins) {
  let x0 = d => d.x0 || 0,
    ys = d => d,
    xDomain,
    yDomain,
    arcLengthNormalize = true,
    batchSize = null;
  let ret = data => {
    if (!Number.isInteger(xBins))
      throw new Error(`xBins must be an integer (got ${xBins})`);
    if (!Number.isInteger(yBins))
      throw new Error(`yBins must be an integer (got ${yBins})`);
    if (!xBins || !yBins)
      throw new Error(
        "computing density requires nonzero values for both xBins and yBins."
      );
    return (typeof batchSize == 'number'
      ? renderSeriesGenerator
      : renderSeries)(data, ret.options(data));
  };
  ret.options = data => {
    return {
      xBins,
      yBins,
      x0,
      ys,
      xDomain: xDomain || ret.defaultXDomain(data),
      yDomain: yDomain || ret.defaultYDomain(data),
      arcLengthNormalize,
      batchSize
    };
  };
  ret.xBins = function(_) {
    return arguments.length ? ((xBins = _), ret) : xBins;
  };
  ret.yBins = function(_) {
    return arguments.length ? ((yBins = _), ret) : yBins;
  };
  ret.x0 = function(_) {
    return arguments.length ? ((x0 = _), ret) : x0;
  };
  ret.ys = function(_) {
    return arguments.length ? ((ys = _), ret) : ys;
  };
  ret.xDomain = function(_) {
    return arguments.length ? ((xDomain = _), ret) : xDomain;
  };
  ret.yDomain = function(_) {
    return arguments.length ? ((yDomain = _), ret) : yDomain;
  };
  ret.arcLengthNormalize = function(_) {
    return arguments.length
      ? ((arcLengthNormalize = _), ret)
      : arcLengthNormalize;
  };
  ret.batchSize = function(_) {
    return arguments.length ? ((batchSize = _), ret) : batchSize;
  };
  // optimization opportunity: compute the extents in one pass
  ret.defaultXDomain = data => [
    d3.min(data, x0),
    d3.max(data, (series, i, a) => x0(series, i, a) + ys(series, i, a).length) -
      1
  ];
  ret.defaultYDomain = data => [
    d3.min(data, series => d3.min(ys(series))),
    d3.max(data, series => d3.max(ys(series)))
  ];
  ret.copy = function(_) {
    return seriesDensity(xBins, yBins)
      .x0(x0)
      .ys(ys)
      .xDomain(xDomain)
      .yDomain(yDomain)
      .arcLengthNormalize(arcLengthNormalize)
      .batchSize(batchSize);
  };
  return ret;
}
)}

function _renderSeries(binScale,renderSingleSeries){return(
function renderSeries(data, options) {
  let {
    xBins,
    yBins,
    x0,
    ys,
    xDomain,
    yDomain,
    batchSize,
    normalize
  } = options;

  // note: the buffers represent data in column-major order since we sum by column
  let buffer = new Float64Array(xBins * yBins);
  let tmpBuf = new Int8Array(xBins * yBins);
  let tmpSums = new Int32Array(xBins); // note: assumes no more than 2.1 billion weight per pixel
  let tmpMinY = new Int32Array(xBins);
  let tmpMaxY = new Int32Array(xBins);
  let tmp = { tmpBuf, tmpSums, tmpMinY, tmpMaxY };
  let xScale = binScale(xDomain[0], xDomain[1], xBins);
  let yScale = binScale(yDomain[1], yDomain[0], yBins);
  let i = 0;
  for (let series of data) {
    renderSingleSeries(
      x0(series, i, data),
      ys(series, i, data),
      options,
      xScale,
      yScale,
      tmp,
      buffer
    );
    i += 1;
  }
  return buffer;
}
)}

function _renderSeriesGenerator(binScale,renderSingleSeries){return(
function* renderSeriesGenerator(data, options) {
  let {
    xBins,
    yBins,
    x0,
    ys,
    xDomain,
    yDomain,
    batchSize,
    normalize
  } = options;
  // note: the buffers represent data in column-major order since we sum by column
  let buffer = new Float64Array(xBins * yBins);
  let tmpBuf = new Int8Array(xBins * yBins);
  let tmpSums = new Int32Array(xBins); // note: assumes no more than 2.1 billion weight per pixel
  let tmpMinY = new Int32Array(xBins);
  let tmpMaxY = new Int32Array(xBins);
  let tmp = { tmpBuf, tmpSums, tmpMinY, tmpMaxY };
  let xScale = binScale(xDomain[0], xDomain[1], xBins);
  let yScale = binScale(yDomain[1], yDomain[0], yBins);
  let i = 0;
  for (let series of data) {
    if (i && i % batchSize == 0) yield buffer; // !
    renderSingleSeries(
      x0(series, i, data),
      ys(series, i, data),
      options,
      xScale,
      yScale,
      tmp,
      buffer
    );
    i += 1;
  }
  yield buffer; // !
}
)}

function _densityPlot(cacheInterpolator,d3,DOM,dispatchValue,isGenerator,Generators,zipGenerators){return(
function densityPlot(density, size) {
  let interpolator = cacheInterpolator(d3.interpolateViridis);
  let color = buf => d3.scaleSequential(d3.extent(buf), interpolator);
  let background = null;
  let drawAxes = true;
  let xAxisScale, yAxisScale;
  let ret = (...data) => {
    // note: margins take up extra space, in addition to width and height.
    let margin = { left: 30, top: 5, right: 0, bottom: 25 };

    let dense = density.copy();
    let xBins = dense.xBins();
    let yBins = dense.yBins();

    let [width, height] = size || [xBins, yBins];

    if (drawAxes) {
      // this isn't great, but we need to do this so that everything still fits on screen.
      // The optional preserveCanvasSize option will prevent the canvas from being resized, so that
      // `size` will refer to canvas size rather than the total size take by the chart.
      if (!drawAxes.preserveCanvasSize) {
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
      }
    }

    let canvas = DOM.canvas(xBins, yBins, 1);
    let ctx = canvas.getContext('2d');
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.imageRendering = 'pixelated';
    ctx.imageSmoothingEnabled = false;

    let container = d3.create('div');

    // We need to know the x and y extents in order to draw axes.
    // If none were passed, compute them, and set them explicitly
    // on our copy of `density` to avoid recomputing them later.
    if (!dense.xDomain()) {
      let domains = data.map(data => dense.defaultXDomain(data));
      dense.xDomain([
        d3.min(domains, values => d3.min(values)),
        d3.max(domains, values => d3.max(values))
      ]);
    }
    if (!dense.yDomain()) {
      let domains = data.map(data => dense.defaultYDomain(data));
      dense.yDomain([
        d3.min(domains, values => d3.min(values)),
        d3.max(domains, values => d3.max(values))
      ]);
    }

    let xAxisG, yAxisG;
    if (drawAxes) {
      container
        .style('position', 'relative')
        .style('width', width + margin.left + margin.right + 'px')
        .style('height', height + margin.bottom + margin.top + 'px');

      let axesSel = container
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.bottom + margin.top)
        .style('position', 'absolute')
        .style('z-index', '0')
        .style('overflow', 'visible');

      xAxisG = axesSel
        .append('g')
        .attr('transform', `translate(${margin.left}, ${height + margin.top})`);

      yAxisG = axesSel
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      ctx.canvas.style.width = width + 'px';
      ctx.canvas.style.height = height + 'px';

      d3.select(container.node().appendChild(ctx.canvas))
        .style('position', 'absolute')
        .style('z-index', '1')
        .style(
          'left',
          `${
            margin.left + 1 /* avoid overlapping the vertical y axis line */
          }px`
        )
        .style('top', `${margin.top}px`);
    }

    let render = buffers => {
      if (drawAxes) {
        xAxisG.call(
          d3.axisBottom(
            xAxisScale
              ? xAxisScale.copy().range([0, width])
              : d3.scaleLinear(dense.xDomain(), [0, width])
          )
        );
        yAxisG.call(
          d3.axisLeft(
            yAxisScale
              ? yAxisScale.copy().range([height, 0])
              : d3.scaleLinear(dense.yDomain(), [height, 0])
          )
        );
      }
      let colorScale = color(...buffers);
      let values = new Array(buffers.length).fill(0.0);

      // Determine whether the color scale returns color strings or objects.
      // If the scale returns objects, it is assumed that they have {r, g, b} properties.
      // This allows us to avoid the overhead of parsing color strings.
      let colorScaleReturnsString = typeof colorScale(...values) == 'string';

      // Fill the canvas with the background color, or the zero color for the scale
      // if no background color was specified
      ctx.fillStyle = background || d3.rgb(colorScale(...values)).toString();
      ctx.fillRect(0, 0, xBins, yBins);
      let img = ctx.getImageData(0, 0, xBins, yBins);
      let imgData = img.data;

      for (let x = 0; x < xBins; x++) {
        for (let y = 0; y < yBins; y++) {
          let draw = false; // whether to draw this pixel
          // plot data is column-major, image data is row-major
          for (let i = 0; i < buffers.length; i++) {
            let value = buffers[i][yBins * x + y];
            values[i] = value;
            if (value) draw = true;
          }
          if (!draw) continue;

          let c = colorScaleReturnsString
            ? d3.rgb(colorScale(...values))
            : colorScale(...values);
          let i = xBins * y + x;
          imgData[4 * i] = c.r;
          imgData[4 * i + 1] = c.g;
          imgData[4 * i + 2] = c.b;
          imgData[4 * i + 3] = 255 * c.opacity;
        }
      }
      ctx.putImageData(img, 0, 0);
      let node = drawAxes ? container.node() : ctx.canvas;
      dispatchValue(node, {
        colorScale,
        buffers,
        canvas: ctx.canvas,
        density: dense,
        update
      });
      return node;
    };

    // idea: something with requestAnimationFrame to do the next batch,
    // making our actual structure push-based...

    let update = (...data) => {
      let results = Array.from(data, data => dense(data));
      return results.some(isGenerator)
        ? Generators.map(zipGenerators(results), render)
        : render(results);
    };

    return update(...data);
  };
  // can we make the chart once, then incrementally re-render the data?
  // (keeping the same canvas across datasets)
  ret.density = function(_) {
    return arguments.length ? ((density = _), ret) : density;
  };
  ret.size = function(_) {
    return arguments.length ? ((size = _), ret) : size;
  };
  ret.color = function(_) {
    return arguments.length ? ((color = _), ret) : color;
  };
  ret.background = function(_) {
    return arguments.length ? ((background = _), ret) : background;
  };
  ret.drawAxes = function(_) {
    return arguments.length ? ((drawAxes = _), ret) : drawAxes;
  };
  ret.xAxisScale = function(_) {
    return arguments.length ? ((xAxisScale = _), ret) : xAxisScale;
  };
  ret.yAxisScale = function(_) {
    return arguments.length ? ((yAxisScale = _), ret) : yAxisScale;
  };
  // ...
  return ret;
}
)}

function _dispatchValue(){return(
(node, value, detail = null) => {
  node.value = value;
  node.dispatchEvent(new CustomEvent('input', { detail }));
}
)}

function _isGenerator(){return(
x => !!x.throw
)}

function _zipGenerators(isGenerator){return(
function* zipGenerators(xs) {
  // accepts an array xs of generators or values.
  // will iterate stepwise through all xs and yield an array of the latest values.
  // scalars are treated as generators of one value.
  // if some sequences are longer than others, this function will continue to yield
  // arrays with the latest value from each x in xs.
  let iters = xs.map(x =>
    isGenerator(x) ? x.next() : { value: x, done: true }
  );
  let values = iters.map(x => x.value);
  while (!iters.every(x => x.done)) {
    for (let i = 0; i < xs.length; i++) {
      if (!iters[i].done) {
        iters[i] = xs[i].next();
        if (!iters[i].done) values[i] = iters[i].value;
      }
    }
    yield values;
  }
  yield values;
}
)}

function _binScale(){return(
(a, b, nbins) => {
  // Returns a scale function with domain [a, b] and integer output range [0, nbins - 1]
  // - the number of bins should be a 32-bit integer, since we use | for a fast floor operation.
  // - d should never be NaN, since the bitwise operation will incorrectly turn it into a zero.
  let eps = 1e-6;
  // this factor scales the range [a, b] to [0, nbins - eps]
  let factor = (nbins - eps) / (b - a);
  return d => ((d - a) * factor) | 0;
}
)}

function _cacheInterpolator(d3){return(
(interpolator, n = 250) =>
  d3.scaleQuantize(d3.quantize(pc => d3.rgb(interpolator(pc)), n))
)}

function _plotLine(plotLineLow,plotLineHigh){return(
function plotLine(x0, y0, x1, y1, plot) {
  if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    if (x0 > x1) plotLineLow(x1, y1, x0, y0, plot);
    else plotLineLow(x0, y0, x1, y1, plot);
  } else {
    if (y0 > y1) plotLineHigh(x1, y1, x0, y0, plot);
    else plotLineHigh(x0, y0, x1, y1, plot);
  }
}
)}

function _plotLineHigh(){return(
function plotLineHigh(x0, y0, x1, y1, plot) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let xi = dx < 0 ? ((dx = -dx), -1) : 1;
  let D = 2 * dx - dy;
  for (let x = x0, y = y0; y <= y1; ++y, D += 2 * dx) {
    plot(x, y);
    if (D > 0) (x += xi), (D -= 2 * dy);
  }
}
)}

function _plotLineLow(){return(
function plotLineLow(x0, y0, x1, y1, plot) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let yi = dy < 0 ? ((dy = -dy), -1) : 1;
  let D = 2 * dy - dx;
  for (let x = x0, y = y0; x <= x1; ++x, D += 2 * dy) {
    plot(x, y);
    if (D > 0) (y += yi), (D -= 2 * dx);
  }
}
)}

function _d3(require){return(
require('d3@6')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("importStatement")).define("importStatement", ["md"], _importStatement);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("pointDensity")).define("pointDensity", ["renderPointsGenerator","renderPoints","d3"], _pointDensity);
  main.variable(observer("renderPoints")).define("renderPoints", ["binScale"], _renderPoints);
  main.variable(observer("renderPointsGenerator")).define("renderPointsGenerator", ["binScale"], _renderPointsGenerator);
  main.variable(observer("nonnegative")).define("nonnegative", _nonnegative);
  main.variable(observer("renderSingleSeries")).define("renderSingleSeries", ["nonnegative","plotLine"], _renderSingleSeries);
  main.variable(observer("seriesDensity")).define("seriesDensity", ["renderSeriesGenerator","renderSeries","d3"], _seriesDensity);
  main.variable(observer("renderSeries")).define("renderSeries", ["binScale","renderSingleSeries"], _renderSeries);
  main.variable(observer("renderSeriesGenerator")).define("renderSeriesGenerator", ["binScale","renderSingleSeries"], _renderSeriesGenerator);
  main.variable(observer("densityPlot")).define("densityPlot", ["cacheInterpolator","d3","DOM","dispatchValue","isGenerator","Generators","zipGenerators"], _densityPlot);
  main.variable(observer("dispatchValue")).define("dispatchValue", _dispatchValue);
  main.variable(observer("isGenerator")).define("isGenerator", _isGenerator);
  main.variable(observer("zipGenerators")).define("zipGenerators", ["isGenerator"], _zipGenerators);
  main.variable(observer("binScale")).define("binScale", _binScale);
  main.variable(observer("cacheInterpolator")).define("cacheInterpolator", ["d3"], _cacheInterpolator);
  main.variable(observer("plotLine")).define("plotLine", ["plotLineLow","plotLineHigh"], _plotLine);
  main.variable(observer("plotLineHigh")).define("plotLineHigh", _plotLineHigh);
  main.variable(observer("plotLineLow")).define("plotLineLow", _plotLineLow);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
