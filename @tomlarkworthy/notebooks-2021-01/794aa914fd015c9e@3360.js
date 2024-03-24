import define1 from "./9bed702f80a3797e@402.js";

function _1(md){return(
md`# Plot Cheatsheets - Utilities
## A set of utilities for the collection`
)}

function _2(toc){return(
toc({ headers: "h2", skip: "A set of utilities for the collection" })
)}

function _3(md){return(
md`## Demos`
)}

function _4(md){return(
md`Each concept will be demonstrated in the structure below (interactive code | chart)`
)}

function _5(createDemo,histConfig){return(
createDemo(histConfig)
)}

function _6(md){return(
md`Below is the configuration that describes the example:`
)}

function _histConfig(plotWidth){return(
{
  // Control panel (the code on the left): an array of controls, one for each line (including text)
  controls: [
    { type: "text", value: "Plot.rectY(data,", indent: 0 },
    { type: "text", value: "Plot.binX({", indent: 1 },

    {
      param: "reducer",
      label: "y",
      type: "select",
      options: ["sum", "count"],
      value: "count"
    },
    { type: "text", value: "},{", indent: 1},
    { param: "x", value: "date" },
    {
      param: "fill",
      value: "blue",
      type: "color", 
      width: 50
    },
    {
      param: "thresholds",
      options: [10, 50, "d3.utcDay", "d3.utcWeek", "d3.utcMonth"],
      type: "select"
    },
    {
      param: "fillOpacity",
      type: "range",
      min: 0.1,
      max: 1,
      value: 0.5,
      step: 0.05,
    },
    { type: "text", value: "}", indent: 1 },
    { type: "text", value: "})" }
  ],
  
  // Function that returns a string of the plot code: input is key/value pairs of the controls
  plot: (config) => `Plot.plot({
  marks: [
    Plot.rectY(data, Plot.binX({ y: "${config.reducer}"}, 
    {x: "date", y:"price_in_usd", fill:"${config.fill}", fillOpacity:${
    config.fillOpacity
  }, thresholds: ${config.thresholds}}))
  ], 
  marginLeft:100, 
  width: ${plotWidth}
})`
}
)}

function _8(md){return(
md`---`
)}

function _9(md){return(
md`There are also some utilities for repeated text content and layout, for example:`
)}

function _10(welcomeBox){return(
welcomeBox()
)}

function _11(intro,samplePng,md){return(
intro(samplePng, md`<div>Here is a sample introduction callout</div>`)
)}

function _12(md){return(
md`## Implementation`
)}

function _createInput(htl,Inputs,_,md,Inputs_const){return(
({
  param,
  type,
  label = param,
  min = 0,
  max = 1,
  options,
  width = 100,
  indent = 0,
  ...rest
}) => {
  switch (type) {
    case "range":
      return htl.html`${Inputs.range([min, max], {
        label: htl.html`${label}:`,
        width: 100,
        ...rest
      })}`;
    case "select":
      return Inputs.select(options, {
        label: htl.html`${label}:`,
        ...rest
      });
    case "toggle":
      return Inputs.toggle({
        label: htl.html`${label}:`,
        ...rest
      });

    case "radio":
      return Inputs.radio(options, {
        label: htl.html`${label}:`,
        ...rest
      });
    case "textInput":
      return Inputs.text({
        label: htl.html`${label}:`,
        ...rest
      });
    case "color":
      return Inputs.color({
        label: htl.html`${label}:`,
        width: width,
        value: rest.value
      });
    case "text":
      const space = _.range(indent)
        .map((d) => "  ")
        .join("");
      return md`~~~js\n${space}${rest.value}\n~~~`;
    default:
      return Inputs_const({ label, ...rest });
  }
}
)}

function _createForm(id_generator,createInput,d3,Inputs,htl,controlWidth){return(
(config) => {
  // Get inputs
  const inputs = Object.fromEntries(
    config.map((row) => [row.param || id_generator(), createInput(row)])
  );

  // Create form
  const form = d3.select(Inputs.form(inputs));

  // Assign randomly generated input classname to custom input element
  form.classed("newInput", true);
  const className = d3.select(Inputs.select([])).attr("class");
  form.selectAll("form").attr("class", className);

  return htl.html`<div class="code_form">
${form.node()}
<style>
  .code_form {width: ${controlWidth}px; margin-top:0px; padding-top:0px;background-color: #f3f3f3; display:inline-block;} 
  .newInput form { margin-left: 3em; padding-top: .5em; margin-bottom:0px; padding:0px}
  .newInput pre { margin-top: 3px; margin-bottom:0px; padding:0px; }
  .code_form p { margin-top: 3px; margin-bottom:0px; padding:0px; font-size: 15px; }  
  .code_form form.${className} label {
    width: 80px;
  }
  .code_form form.${className} {
    width: auto;
  }
  .code_form pre {
    margin:0px;
  }
  form.${className} input[type=color] {
    width: 50px;
  }
`;
}
)}

function _createDemo(wrapperStyles,htl,copyButtonStyles,createForm,d3,evalCodeStr,makeCopyIcon){return(
(config) => {
  const wStyles = Object.assign({}, wrapperStyles, config.wrapper); // additional configuration for the styles
  const wrapper = htl.html`<div class="demo-wrapper" style=${wStyles}></div>`;
  const buttonStyles =
    config.copyButton === undefined ? copyButtonStyles : config.copyButton;

  // Append containers for the plot, code, and copy button
  const plotWrapper = htl.html`<div style="flex-grow:1; padding-left: 15px; margin:10px 0 10px 0; ">`;
  const buttonWrapper = htl.html`<div style=${buttonStyles}>`;
  const controlsWrapper = htl.html`<div style="padding:10px 10px 0px 10px; background-color:#f3f3f3; min-width:250px; position:relative">`;

  // Reset button
  const reset = htl.html`<text style="position:absolute; cursor: pointer; bottom: 3px; right: 10px;font-family: sans-serif; font-size: 13px; opacity: .7;">reset`;
  reset.onclick = () => {
    // Replace the form
    const newControls = createForm(config.controls);
    controlsWrapper.replaceChild(
      newControls,
      controlsWrapper.querySelector(".code_form")
    );

    // Reconnet the form to the chart.
    const form = d3.select(newControls).select(".newInput");

    // Add event listener
    form.on("input", function () {
      render(this.value);
    });

    // Render the plot
    form.dispatch("input");
  };
  const controls = createForm(config.controls);
  controlsWrapper.append(controls);
  controlsWrapper.append(buttonWrapper);
  controlsWrapper.append(reset);
  wrapper.appendChild(controlsWrapper);
  wrapper.appendChild(plotWrapper);

  // Function to update the plot, code, and copy button
  const render = (inputValue) => {
    // Get the updated code
    const plotCode = config.plot(inputValue);
    plotWrapper.replaceChildren(evalCodeStr(plotCode));

    // Update the copy button
    const copyButton = makeCopyIcon(plotCode, {
      instructions: `copy`
    });
    buttonWrapper.replaceChildren(copyButton);
  };

  const form = d3.select(controls).select(".newInput");

  // Add event listener
  form.on("input", function () {
    render(this.value);
  });

  // Render the plot
  form.dispatch("input");
  return wrapper;
}
)}

function _controlWidth(){return(
250
)}

function _plotWidth(width,controlWidth){return(
(width - controlWidth - 100) < 250 ? 250 : (width - controlWidth - 100)
)}

function _18(md){return(
md`## Helpers`
)}

function _evalCodeStr(data,Plot,width,d3){return(
(str) => {
  const func = new Function("data", "Plot", "width",  "d3", `return ${str}`)
  return func(data, Plot, width, d3);
}
)}

function _Inputs_const(htl,md){return(
({ label = "some label", value = "output" } = {}) => {
  const form = htl.html`<form><label>${label}:</label>${md`~~~js\n"${value}"~~~`}`
  return Object.assign(form, { value })  
}
)}

function _id_generator(){return(
() => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return "a" + S4() + S4();
}
)}

function _22(md){return(
md`## Styles`
)}

function _inputStyles(htl,Inputs){return(
htl.html`
  <style> 
    .${Inputs.text().classList[0]}-input > input[type="number"] {
      flex-shrink: 1;
    }
  </style>
`
)}

function _wrapperStyles(width){return(
{
  fontFamily: "monospace",
  display: "flex",
  alignItems: "top",
  width: width - 10 + "px",
  boxShadow: "0 0 0 1px #d3d3d3",
  margin: "0 0 1px 1px",
  fontSize: "18px",
  flexWrap: "wrap",
  position: "relative",
  overflow: "visible"
}
)}

function _25(md){return(
md`## Copy Icon`
)}

function _26(makeCopyIcon){return(
makeCopyIcon()
)}

function _makeCopyIcon(htl,d3,copyIcon,copyStyle){return(
(
  text = "Sample Text",
  { instructions = "copy", completed = "Copied" } = {}
) => {
  const wrapper = htl.html`<div style="position:relative; white-space:nowrap;"></div>`;

  // Select wrapper
  const wrapperSelected = d3.select(wrapper);
  // Icon
  
  const icon = htl.html`<div  style="float:right;">${copyIcon()}</div>`;
  wrapper.onclick = (event) => {
    event.stopPropagation();
    wrapperSelected.selectAll(".hover-tip").style("opacity", 1);
    wrapperSelected.selectAll(".hover-tip").select("text").text(completed);
    navigator.clipboard.writeText(typeof text === "function" ? text() : text);
  };

  const displayText = htl.html`<div class="hover-tip arrow_box" style="opacity:0; position:absolute;pointer-events:none;right:0px; top:-40px"><text>${instructions}</text></div>`;
  wrapper.append(displayText);
  wrapper.append(icon);

  d3.select(icon).on("mouseleave", function (event) {
    wrapperSelected.selectAll(".hover-tip").style("opacity", 0);
  });

  wrapper.append(copyStyle);

  return wrapper;
}
)}

function _copyStyle(htl){return(
htl.html`
<style>
.arrow_box {
	position: relative;
	background: #f3f3f3;
	border: 1px solid #d3d3d3;
  border-radius:5px;
  font-family: monospace;
  padding:3px;
}
.arrow_box:after, .arrow_box:before {
	top: 100%;
	left: 50%;
	border: solid transparent;
	content: "";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}

.arrow_box:after {
	border-color: rgba(83, 112, 130, 0);
	border-top-color: #f3f3f3;
	border-width: 8px;
	margin-left: -8px;
}
.arrow_box:before {
	border-color: rgba(211, 211, 211, 0);
	border-top-color: #d3d3d3;
	border-width: 9px;
	margin-left: -9px;
}
 .copy-icon {
    opacity:.7;
  }
  .copy-icon:hover {
    opacity:1;
  }
</style>`
)}

function _copyIcon(htl){return(
() => htl.html`<div class="copy-icon" style="cursor:pointer;"><svg width="65" height="30" viewBox="0 0 73 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.323242 4.12427C0.323242 1.91513 2.1141 0.124268 4.32324 0.124268H68.3232C70.5324 0.124268 72.3232 1.91513 72.3232 4.12427V28.1243C72.3232 30.3334 70.5324 32.1243 68.3232 32.1243H4.32324C2.11411 32.1243 0.323242 30.3334 0.323242 28.1243V4.12427Z" fill="#E8E8E8"/>
<path d="M10.3232 17.1243V14.0188C10.3232 13.4665 10.771 13.0188 11.3232 13.0188H18.3232C18.8755 13.0188 19.3232 13.4665 19.3232 14.0188V22.0188C19.3232 22.5711 18.8755 23.0188 18.3232 23.0188H16.3232" stroke="black" stroke-width="2"/>
<line x1="12.3232" y1="18.1243" x2="12.3232" y2="24.1243" stroke="black" stroke-width="2"/>
<path d="M13.3232 11.1243L13.3232 10.1243L20.3232 10.1243C21.4278 10.1243 22.3232 11.0197 22.3232 12.1243V20.1243H21.3232" stroke="black" stroke-width="2" stroke-linejoin="round"/>
<line x1="15.3232" y1="21.1243" x2="9.32324" y2="21.1243" stroke="black" stroke-width="2"/>
<path d="M33.6553 21.3704C35.9316 21.3704 37.5996 20.0237 37.832 18.0276H36.0957C35.8564 19.135 34.9062 19.8391 33.6553 19.8391C31.9736 19.8391 30.9277 18.4377 30.9277 16.1887C30.9277 13.9465 31.9736 12.5452 33.6484 12.5452C34.8926 12.5452 35.8428 13.3176 36.0889 14.5071H37.8252C37.6201 12.4631 35.8906 11.0139 33.6484 11.0139C30.8525 11.0139 29.123 12.9895 29.123 16.1956C29.123 19.3879 30.8594 21.3704 33.6553 21.3704ZM42.8428 21.2747C45.0781 21.2747 46.4385 19.8118 46.4385 17.385C46.4385 14.9719 45.0713 13.509 42.8428 13.509C40.6211 13.509 39.2471 14.9788 39.2471 17.385C39.2471 19.8118 40.6006 21.2747 42.8428 21.2747ZM42.8428 19.887C41.6602 19.887 40.9834 18.9709 40.9834 17.3918C40.9834 15.8127 41.6602 14.8967 42.8428 14.8967C44.0186 14.8967 44.6953 15.8127 44.6953 17.3918C44.6953 18.9709 44.0254 19.887 42.8428 19.887ZM52.2217 13.5295C51.1963 13.5295 50.3281 14.0422 49.8975 14.8899H49.7812V13.6526H48.1475V23.6057H49.8428V19.9895H49.959C50.3418 20.7825 51.1689 21.2473 52.2422 21.2473C54.1289 21.2473 55.3047 19.7639 55.3047 17.3918C55.3047 14.9993 54.1152 13.5295 52.2217 13.5295ZM51.6885 19.8391C50.5332 19.8391 49.8154 18.9026 49.8086 17.3918C49.8154 15.8811 50.54 14.9446 51.6953 14.9446C52.8574 14.9446 53.5615 15.8606 53.5615 17.3918C53.5615 18.9231 52.8643 19.8391 51.6885 19.8391ZM57.5264 23.8313C59.2012 23.8313 60.001 23.2229 60.6367 21.384L63.3369 13.6526H61.5459L59.8027 19.5178H59.6865L57.9365 13.6526H56.0771L58.75 21.1516L58.6611 21.5002C58.4424 22.2043 58.0391 22.4778 57.3213 22.4778C57.2051 22.4778 56.9521 22.4709 56.8564 22.4573V23.804C56.9658 23.8245 57.4238 23.8313 57.5264 23.8313Z" fill="#454545"/>
</svg>

</div>`
)}

function _copyButtonStyles(){return(
{
  position: "absolute",
  top: "0px",
  right: "0px",
  width: "0px"
}
)}

function _31(md){return(
md`## Text and buttons`
)}

function _intro(width,htl,download,notebookLink){return(
async (
  png,
  paragraph,
  {
    fileName = "cheatsheet",
    label = "Download the PDF",
    src = "https://github.com/observablehq/plot-cheatsheets/raw/main/plot-cheatsheets.pdf",
    notebookUrl = null
  } = {}
) => {
  // Create icon wrapper
  const rotate = width < 920 ? 0 : 10;
  const img = await png.image({ width: 200, style: "border: 1px solid black" });
  const imgWrapper = htl.html`<div style="width:280px; transform: rotate(${rotate}deg)">`;
  imgWrapper.append(img);

  // Text on the left
  const textWrapper = htl.html`<div style="width:640px">`;
  const text = htl.html`<div style="margin-bottom:25px;">`;
  text.append(paragraph);

  const button = download({ label, src });
  if (notebookUrl !== null) text.append(notebookLink(notebookUrl));
  text.append(button);
  textWrapper.append(text);
  // Wrapper
  const wrapper = htl.html`<div style="display: flex; max-width: 920px; flex-wrap: wrap;">`;
  wrapper.append(textWrapper);
  wrapper.append(imgWrapper);
  return wrapper;
}
)}

function _dataDescription(md){return(
() => md`
This notebook uses purchase data from the [Google Merchandise Store](https://shop.googlemerchandisestore.com/). See [this notebook](https://observablehq.com/@observablehq/google-merchandise-sales-data) for more details.`
)}

function _download(htl,downloadIcon){return(
({
  label = "Download PDF",
  src = "https://github.com/observablehq/plot-cheatsheets/raw/main/plot-cheatsheets.pdf"
} = {}) => {
  return htl.html`<a href="${src}" style="text-decoration: none;"><div style="cursor: pointer; padding: 6px 10px; display: inline-flex; border-radius: 5px; color: #2d48b2; border: 1px solid #d3d3d3; font-family: sans-serif;font-weight:600; font-size:14px;">${label} &nbsp; ${downloadIcon()}</div></a>`;
}
)}

function _downloadIcon(svg){return(
() => svg`<svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 14L3.99999 14C3.44771 14 2.99999 13.5523 2.99999 13L2.99999 3C3 2.44771 3.44771 2 3.99999 2L10 2M10 2L13 5M10 2L10 5L13 5M13 5L13 7.5" stroke="#2d48b2" stroke-width="2"/>
<path d="M8 12L11 14.5L14 12" stroke="#2d48b2" stroke-width="2"/>
<line x1="11" y1="9" x2="11" y2="15" stroke="#2d48b2" stroke-width="2"/>
</svg>`
)}

function _notebookLink(htl,rightArrow){return(
(url) =>
  htl.html`<a href="${url}" target="_blank"><div style="cursor: pointer; padding:7px 10px 7px 15px; display: inline-flex; border-radius: 5px; color: white; background-color:#2d48b2; font-family: sans-serif;font-weight:600; font-size:14px; margin-right: 10px;">Explore interactively${rightArrow()}</div></a>`
)}

function _rightArrow(svg){return(
() => svg`<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 11L11 8L8.5 5" stroke="white" stroke-width="1.6"/>
<line x1="4" y1="7.99999" x2="11" y2="7.99999" stroke="white" stroke-width="1.6"/>
</svg>
`
)}

function _welcomeBox(htl){return(
(intro = "This notebooks is part of the") => {
  const boxStyles = {
    background: "#F5F5F5",
    borderRadius: "5px",
    padding: "15px",
    width: "100%",
    maxWidth: "640px",
    minWidth: "250px"
  };

  return htl.html`
    <div style=${boxStyles}>${intro} <a href="https://observablehq.com/@observablehq/plot-cheatsheets?collection=@observablehq/plot-cheatsheets">Plot Cheatsheets collection</a>. Each notebook in the collection provides an <em>interactive overview</em> of core Plot techniques, as well as a <em>downloadable PDF</em> for quick reference.</div>
`;
}
)}

function _39(md){return(
md`## Cards`
)}

function _40(deck){return(
deck()
)}

function _deck(cards,html){return(
(highlight, { elements = cards } = {}) => {
  const topOffset = [30, 9, 0, 10, 40];
  const single = highlight !== undefined;
  const order = [
    elements.filter((d) => !d.url.match(highlight)),
    elements.filter((d) => d.url.match(highlight))
  ].flat();
  return html`<style>
  .fan {width: 740px; height: 300px}
  .card {box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.13); position: absolute; transition: margin-top ease 0.3s; width: 380px}
  .card:hover {margin-top: -10px;}
  @media screen and (max-width: 30em) {
    .fan {width: 100vw; height: 45vw;}
    .card {width: 150px}
  }
</style>
<div class="fan" style="border: 1px solid white; position:relative; overflow: hidden;border-radius:4px;">
${order.map((card, i) => {
  // Get properties based on the highlighted item
  const [top, zIndex, brightness, pointerEvents] = card.url.match(highlight)
    ? [25, i + 10, 100, single ? "none" : "all"] //
    : [75, i, single ? 80 : 100, "all"];
  
  return `<div class="card" style="top: ${topOffset[i] + top}px; left: ${
    12 + i * 7
  }%; 
    z-index: ${zIndex}; transform: rotate(${-18 + 7 * i}deg)">
    <a style="pointer-events:${pointerEvents}" href=${
    card.url
  }><img width=100% style="filter: brightness(${brightness}%);" src=${
    card.image.currentSrc
  }></a>
  </div>`;
})}</div>`;
}
)}

async function _cards(colorsPng,layoutsPng,transformsPng,scalesPng,marksPng){return(
[  
  {
    image: await colorsPng.image(),
    url: "https://observablehq.com/@observablehq/plot-cheatsheets-colors?collection=@observablehq/plot-cheatsheets"
  }, 
  {
    image: await layoutsPng.image(),
    url: "https://observablehq.com/@observablehq/plot-cheatsheets-layouts?collection=@observablehq/plot-cheatsheets",
  },
  {
    image: await transformsPng.image(),
    url: "https://observablehq.com/@observablehq/plot-cheatsheets-transforms?collection=@observablehq/plot-cheatsheets",
  },
  {
    image: await scalesPng.image(),
    url: "https://observablehq.com/@observablehq/plot-cheatsheets-scales?collection=@observablehq/plot-cheatsheets"
  },
  {
    image: await marksPng.image(),
    url: "https://observablehq.com/@observablehq/plot-cheatsheets-marks?collection=@observablehq/plot-cheatsheets"
  }
]
)}

function _43(md){return(
md`## Appendix`
)}

function _44(md){return(
md`### Imports`
)}

function _46(md){return(
md`### File attachments`
)}

function _data(FileAttachment){return(
FileAttachment("purchase_data.csv").csv({ typed: true })
)}

function _samplePng(FileAttachment){return(
FileAttachment("scales-cheatsheet.png")
)}

function _colorsPdf(FileAttachment){return(
FileAttachment("colors.pdf")
)}

function _colorsPng(FileAttachment){return(
FileAttachment("colors@3.png")
)}

function _layoutsPdf(FileAttachment){return(
FileAttachment("layouts.pdf")
)}

function _layoutsPng(FileAttachment){return(
FileAttachment("layouts@2.png")
)}

function _marksPdf(FileAttachment){return(
FileAttachment("marks.pdf")
)}

function _marksPng(FileAttachment){return(
FileAttachment("marks@3.png")
)}

function _scalesPdf(FileAttachment){return(
FileAttachment("scales.pdf")
)}

function _scalesPng(FileAttachment){return(
FileAttachment("scales@2.png")
)}

function _transformsPdf(FileAttachment){return(
FileAttachment("transforms.pdf")
)}

function _transformsPng(FileAttachment){return(
FileAttachment("transforms@2.png")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["scales-cheatsheet.png", {url: new URL("./files/7b3826caa2162bc4270f870a247bed2b3e38d45fcdd787e27b2ac042b07c163e6305308d7d94b4bb67d4457321cb5fe73b472d1d7c993f4b42d6632d5d54c438.png", import.meta.url), mimeType: "image/png", toString}],
    ["purchase_data.csv", {url: new URL("./files/f06990c669c6571a25995fd1282640b5b352f0608e78914239554db701641dd2db875745e588bc35546ecedf8ddffa56e25af3f702b4f500bf4d57d8024baa34.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["colors.pdf", {url: new URL("./files/5ce4046508844d70cfbe0bcc43ea00964479331ea32d31afb7128ebdaaed14456c00d8bef290a6c8d14618e4d2e6a15e127414f3133103a7ae2fb35fdc76764b.pdf", import.meta.url), mimeType: "application/pdf", toString}],
    ["scales.pdf", {url: new URL("./files/ed4d482ef40f736df5f3f4000880e4de30fd3ea691be654d5178ceb7ef2b966351d87da136cf3ade106453ecef9806c3c275086a4d88394335fd3e9d3804985e.pdf", import.meta.url), mimeType: "application/pdf", toString}],
    ["marks.pdf", {url: new URL("./files/a92002416ea5a6594baf95fdd1bb2ec49c84ea3f19aaf6c618f355aca862733be01a73702192db5bdea611a982c6e35e120c748af8dd4e34e75e372f9c02ada7.pdf", import.meta.url), mimeType: "application/pdf", toString}],
    ["layouts.pdf", {url: new URL("./files/b3f56c18eed4c9a7f2a774847f02245ddc45ac25e9061b30190f39464bfa15e6266ba280ee22c8be3b8fe50e574fb15254954e1cf4174d291ca2f26840ace4d5.pdf", import.meta.url), mimeType: "application/pdf", toString}],
    ["transforms.pdf", {url: new URL("./files/ea0a5c1e1057cb7ccb9511d572708c90067d2857b5b300dd7f6083bf618e50b982942fc7b28106d6e567d1030b20b456a46d2d42e8f546ac041d5693e8a2e62e.pdf", import.meta.url), mimeType: "application/pdf", toString}],
    ["scales@2.png", {url: new URL("./files/806e55e663f35b274fd8294c6c49862dc18a4f566197175c48b925e5f0ce82033e8f49b2ffb1622cdb59ba9f49b6ae3586383cd46600ee07132e9803dd817cff.png", import.meta.url), mimeType: "image/png", toString}],
    ["transforms@2.png", {url: new URL("./files/a37fe83c1713cd4b241210b334c89ccf1a1f24dca79b4c161154e2083d97b5458918b06aea2e924ad3a63441c9b29cd4a7a52006d40cfb424c8bac92c0894cdd.png", import.meta.url), mimeType: "image/png", toString}],
    ["marks@3.png", {url: new URL("./files/3faba7b84bf90596b137a54da06195b3daa32fd8a15e1408eb755e41f19ed6e0ea85e2b7ca7f2497d0c99dc4373d612659edad8500837912ee7369cf47a7481a.png", import.meta.url), mimeType: "image/png", toString}],
    ["layouts@2.png", {url: new URL("./files/92bee5cb8c19f0cf8c669032c041add876e2e74fb5aa446fae57dd4e8925f878c348f5cd3bdfac17ab3ef30b62e10978670659841e4295e4a247d1d3fbf58bd0.png", import.meta.url), mimeType: "image/png", toString}],
    ["colors@3.png", {url: new URL("./files/16772f264b849f64f611f9400a9a17213627ceffac2b9a0aae946aae57cdfd278eec6d28d1a69c3dbbc1a006d7aadd4390adeee7cdab471531da029ffa643850.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["toc"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["createDemo","histConfig"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("histConfig")).define("histConfig", ["plotWidth"], _histConfig);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["welcomeBox"], _10);
  main.variable(observer()).define(["intro","samplePng","md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("createInput")).define("createInput", ["htl","Inputs","_","md","Inputs_const"], _createInput);
  main.variable(observer("createForm")).define("createForm", ["id_generator","createInput","d3","Inputs","htl","controlWidth"], _createForm);
  main.variable(observer("createDemo")).define("createDemo", ["wrapperStyles","htl","copyButtonStyles","createForm","d3","evalCodeStr","makeCopyIcon"], _createDemo);
  main.variable(observer("controlWidth")).define("controlWidth", _controlWidth);
  main.variable(observer("plotWidth")).define("plotWidth", ["width","controlWidth"], _plotWidth);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("evalCodeStr")).define("evalCodeStr", ["data","Plot","width","d3"], _evalCodeStr);
  main.variable(observer("Inputs_const")).define("Inputs_const", ["htl","md"], _Inputs_const);
  main.variable(observer("id_generator")).define("id_generator", _id_generator);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("inputStyles")).define("inputStyles", ["htl","Inputs"], _inputStyles);
  main.variable(observer("wrapperStyles")).define("wrapperStyles", ["width"], _wrapperStyles);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["makeCopyIcon"], _26);
  main.variable(observer("makeCopyIcon")).define("makeCopyIcon", ["htl","d3","copyIcon","copyStyle"], _makeCopyIcon);
  main.variable(observer("copyStyle")).define("copyStyle", ["htl"], _copyStyle);
  main.variable(observer("copyIcon")).define("copyIcon", ["htl"], _copyIcon);
  main.variable(observer("copyButtonStyles")).define("copyButtonStyles", _copyButtonStyles);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("intro")).define("intro", ["width","htl","download","notebookLink"], _intro);
  main.variable(observer("dataDescription")).define("dataDescription", ["md"], _dataDescription);
  main.variable(observer("download")).define("download", ["htl","downloadIcon"], _download);
  main.variable(observer("downloadIcon")).define("downloadIcon", ["svg"], _downloadIcon);
  main.variable(observer("notebookLink")).define("notebookLink", ["htl","rightArrow"], _notebookLink);
  main.variable(observer("rightArrow")).define("rightArrow", ["svg"], _rightArrow);
  main.variable(observer("welcomeBox")).define("welcomeBox", ["htl"], _welcomeBox);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["deck"], _40);
  main.variable(observer("deck")).define("deck", ["cards","html"], _deck);
  main.variable(observer("cards")).define("cards", ["colorsPng","layoutsPng","transformsPng","scalesPng","marksPng"], _cards);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  const child1 = runtime.module(define1);
  main.import("toc", child1);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("samplePng")).define("samplePng", ["FileAttachment"], _samplePng);
  main.variable(observer("colorsPdf")).define("colorsPdf", ["FileAttachment"], _colorsPdf);
  main.variable(observer("colorsPng")).define("colorsPng", ["FileAttachment"], _colorsPng);
  main.variable(observer("layoutsPdf")).define("layoutsPdf", ["FileAttachment"], _layoutsPdf);
  main.variable(observer("layoutsPng")).define("layoutsPng", ["FileAttachment"], _layoutsPng);
  main.variable(observer("marksPdf")).define("marksPdf", ["FileAttachment"], _marksPdf);
  main.variable(observer("marksPng")).define("marksPng", ["FileAttachment"], _marksPng);
  main.variable(observer("scalesPdf")).define("scalesPdf", ["FileAttachment"], _scalesPdf);
  main.variable(observer("scalesPng")).define("scalesPng", ["FileAttachment"], _scalesPng);
  main.variable(observer("transformsPdf")).define("transformsPdf", ["FileAttachment"], _transformsPdf);
  main.variable(observer("transformsPng")).define("transformsPng", ["FileAttachment"], _transformsPng);
  return main;
}
