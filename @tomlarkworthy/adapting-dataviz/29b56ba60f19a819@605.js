function _1(md){return(
md`# Radar Chart
## Learning D3.js`
)}

function _sampleRadarChart(htl,RadarChart,sampleData,d3)
{
  const width = 640;
  const height = width / 1.333;
  const svg = htl.svg`<svg width=${width} height=${height} viewbox="0 0 ${width} ${height}">`;

  const radarChart = new RadarChart(svg)
    .size(width, height)
    .data(sampleData)
    .field({ axis: "axis", value: "value" })
    // .angleOffset(-Math.PI / 2 + (2 * Math.PI) / 5)
    // .angleOffset(Math.PI / 4)
    .baselineValue(3)
    .curve(d3.curveLinearClosed)
    .render();

  return svg;
}


function _RadarChart(d3,palette,opacify,wrap){return(
class RadarChart {
  constructor(container) {
    this._container = d3.select(container);

    this._data = null;
    this._chartData = [];
    this._width = 640;
    this._height = 640;
    this._margins = {
      top: 140,
      right: 140,
      bottom: 140,
      left: 140
    };
    this._radius = 0;
    this._boundedRadius = 0;
    this._boundedWidth = 0;
    this._boundedHeight = 0;

    this._dotRadius = 4;
    this._baseAngleOffset = -0.5 * Math.PI;
    this._angleOffset = 0;

    this._axesLabels = new Set();
    this._labelWidth = 120;

    this._field = {
      axis: "axis",
      value: "value"
    };

    this._maxValue = 5;
    this._baselineValue = 2.5;
    this._bg = undefined;
    this._curve = d3.curveCardinalClosed;
    this._palette = palette;

    this._strokeDasharray = "2 2";
    this._fontFamily = "system-ui";

    this._axisAccessor = (d) => {
      return d[this._field.axis];
    };

    this._valueAccessor = (d) => {
      return d[this._field.value];
    };

    this._getCoordinatesForAngle = this._getCoordinatesForAngle.bind(this);
  }

  data(_) {
    return arguments.length ? ((this._data = _), this) : this._data;
  }

  field(_) {
    return arguments.length ? ((this._field = _), this) : this._field;
  }

  margins(_) {
    return arguments.length ? ((this.margins = _), this) : this.margins;
  }

  palette(_) {
    return arguments.length ? ((this._palette = _), this) : this._palette;
  }

  curve(_) {
    return arguments.length ? ((this._curve = _), this) : this._curve;
  }

  fontFamily(_) {
    return arguments.length ? ((this._fontFamily = _), this) : this._fontFamily;
  }

  baselineValue(_) {
    return arguments.length
      ? ((this._baselineValue = _), this)
      : this._baselineValue;
  }

  angleOffset(_) {
    return arguments.length
      ? ((this._angleOffset = _), this)
      : this._angleOffset;
  }

  size(w, h) {
    return arguments.length
      ? ((this._width = w), (this._height = h), this)
      : this._field;
  }

  _radiusFromSize(w, h) {
    return Math.floor(Math.max(w, h) / 2);
  }

  _updateBounds() {
    this._radius = this._radiusFromSize(this._width, this._height);
    this._boundedWidth =
      this._width - (this._margins.left + this._margins.right);
    this._boundedHeight =
      this._height - (this._margins.top + this._margins.top);
    this._boundedRadius =
      this._radius -
      Math.max(
        this._margins.top + this._margins.bottom,
        this._margins.left + this._margins.right
      ) /
        2;

    this._bounds = this._container
      .append("g")
      .style(
        "transform",
        `translate(${this._width / 2}px, ${this._height / 2}px)`
      );

    // this._bounds
    //   .append("rect")
    //   .attr("width", this._boundedWidth)
    //   .attr("height", this._boundedHeight)
    //   .attr("x", -this._boundedRadius)
    //   .attr("y", -this._boundedRadius);
  }

  _getCoordinatesForAngle(angle, r = this._boundedRadius, offset = 1) {
    return [Math.cos(angle) * r * offset, Math.sin(angle) * r * offset];
  }

  _process() {
    this._chartData = [...this._data];
  }

  _init() {
    this._updateBounds();

    // Scales
    this._axesLabels = this._chartData.map(this._axisAccessor);

    const effectiveAngleOffset = this._baseAngleOffset + this._angleOffset;

    this._angleScale = d3
      .scaleBand()
      .domain(this._axesLabels)
      .range([effectiveAngleOffset, Math.PI * 2 + effectiveAngleOffset]);

    const maxValue = Math.max(
      this._maxValue,
      ...this._chartData.map(this._valueAccessor)
    );

    this._radiusScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, this._boundedRadius]);

    // Curves
    this._radarLine = d3
      .lineRadial()
      .curve(this._curve)
      .radius((d) => this._radiusScale(this._valueAccessor(d)))
      .angle((d) => Math.PI / 2 + this._angleScale(this._axisAccessor(d)));
  }

  _renderBg() {
    this._container
      .insert("rect", ":first-child")
      .attr("fill", this._palette.bg)
      .attr("width", this._width)
      .attr("height", this._height);
  }

  _renderAxis() {
    const peripherals = this._bounds.append("g").attr("class", "peripherals");

    // Add bg circles
    peripherals
      .append("circle")
      .attr("r", this._boundedRadius)
      .attr("fill", "white");
    peripherals
      .append("circle")
      .attr("r", this._boundedRadius)
      .attr("fill", opacify(this._palette.gridAccent, 0.075));
    peripherals
      .append("circle")
      .attr("r", this._radiusScale(this._baselineValue))
      .attr("fill", "white");

    // Add tick circles
    const ticks = this._radiusScale.ticks(5);
    ticks.forEach((r) => {
      if (!r) return;

      const tick = peripherals.append("g");

      tick
        .append("circle")
        .attr("class", "tick-circle")
        .attr("r", this._radiusScale(r))
        .attr("fill", "none")
        .attr("stroke", this._palette.grid)
        .attr("stroke-dasharray", this._strokeDasharray);
      const [_, max] = this._radiusScale.domain();

      if (r >= max) return; // Don't draw last tick label
      tick
        .append("text")
        .attr("x", 3)
        .attr("y", -this._radiusScale(r) - 4)
        .attr("class", "tick-label")
        .style("fill", opacify(this._palette.text, 0.5))
        .style("font-family", this._fontFamily)
        .style("font-size", "0.75rem")
        .text(r);
    });

    const getCoords = (d) => this._getCoordinatesForAngle(this._angleScale(d));

    // Add grid lines
    peripherals
      .selectAll("line")
      .data(this._axesLabels)
      .join("line")
      .attr("stroke-dasharray", this._strokeDasharray)
      .style("stroke", this._palette.grid)
      .each(function (d) {
        const [x2, y2] = getCoords(d);
        d3.select(this).attr("x2", x2).attr("y2", y2);
      });

    // Add Axis labels
    const labelRadiusScale = 1.1;
    const getCoordsForText = (d) =>
      this._getCoordinatesForAngle(
        this._angleScale(d),
        this._boundedRadius,
        labelRadiusScale
      );
    setTimeout(() => {
      peripherals
        .append("g")
        .attr("class", "axis-labels")
        .selectAll("text")
        .data(this._axesLabels)
        .join("text")
        .each(function (d) {
          const [x, y] = getCoordsForText(d);
          d3.select(this)
            .attr("x", x)
            .attr("y", y)
            .style(
              "text-anchor",
              Math.abs(x) < 5 ? "middle" : x > 0 ? "start" : "end"
            );
        })
        .text((d) => d)
        .style("fill", this._palette.text)
        .style("font-family", this._fontFamily)
        .style("font-size", "0.75rem")
        .style("dominant-baseline", "middle")
        .attr("dy", "0em")
        .call(wrap, this._labelWidth);
    });
  }

  _renderPlots() {
    const plots = this._bounds.append("g");

    const plot = plots.append("g");

    // Add curve
    plot
      .append("g")
      .attr("fill", opacify(this._palette.line, 0.15))
      .attr("stroke", this._palette.line)
      .append("path")
      .attr("d", () => this._radarLine(this._chartData));

    // Add dots
    const getCoordsForPlot = (d) =>
      this._getCoordinatesForAngle(
        this._angleScale(this._axisAccessor(d)),
        this._radiusScale(this._valueAccessor(d))
      );
    plot
      .append("g")
      .attr("fill", this._palette.dot)
      .selectAll("circle")
      .data(this._chartData)
      .join("circle")
      .attr("r", this._dotRadius)
      .each(function (d) {
        const [cx, cy] = getCoordsForPlot(d);
        d3.select(this).attr("cx", cx).attr("cy", cy);
      })
      .attr(
        "title",
        (d) => `${this._axisAccessor(d)}: ${this._valueAccessor(d)}`
      );
  }

  render() {
    this._process();
    this._init();
    this._renderBg();
    this._renderAxis();
    this._renderPlots();
    return this;
  }
}
)}

function _wrap(d3){return(
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.4, // ems
      y = text.attr("y"),
      x = text.attr("x"),
      dy = parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}
)}

function _sampleData(){return(
[
  {
    axis: "Overall",
    value: 2.9
  },
  {
    axis: "Attack",
    value: 1.2
  },
  {
    axis: "Defense",
    value: 3.59
  },
  {
    axis: "Speed",
    value: 4.1
  },
  {
    axis: "Growth Rate",
    value: 2.8
  }
]
)}

function _palette(){return(
{
  text: "#222",
  grid: "#d3d3d3",
  gridAccent: "#C8DA2B",
  dot: "#0099D8",
  line: "#6DCFF6",
  bg: "#f6f6f6"
}
)}

function _opacify(chroma){return(
(c, a) => chroma(c).alpha(a).hex()
)}

function _8(md){return(
md`## References

* [Radar chart by Ben Welsh](https://observablehq.com/@palewire/radar-chart)
* [West Coast weather from Seattle to San Diego by Eric Lo](https://observablehq.com/@analyzer2004/west-coast-weather-from-seattle-to-san-diego#WeatherWheel)
* [Brand Personality Radar Chart by Jacob T. Fisher](https://observablehq.com/@jacobtfisher/brand-identity-radar-chart)`
)}

function _9(md){return(
md`## Imports`
)}

async function _chroma(){return(
(await import("https://cdn.skypack.dev/chroma-js@2.1.2?min")).default
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("sampleRadarChart")).define("sampleRadarChart", ["htl","RadarChart","sampleData","d3"], _sampleRadarChart);
  main.variable(observer("RadarChart")).define("RadarChart", ["d3","palette","opacify","wrap"], _RadarChart);
  main.variable(observer("wrap")).define("wrap", ["d3"], _wrap);
  main.variable(observer("sampleData")).define("sampleData", _sampleData);
  main.variable(observer("palette")).define("palette", _palette);
  main.variable(observer("opacify")).define("opacify", ["chroma"], _opacify);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("chroma")).define("chroma", _chroma);
  return main;
}
