function _1(md){return(
md`# Lorem Ipsum`
)}

async function _loremIpsum(require){return(
(await require("https://bundle.run/lorem-ipsum@2.0.4")).loremIpsum
)}

function _example(loremIpsum){return(
loremIpsum({
  count: 3, // Number of "words", "sentences", or "paragraphs"
  format: "plain", // "plain" or "html"
  paragraphLowerBound: 3, // Min. number of sentences per paragraph.
  paragraphUpperBound: 7, // Max. number of sentences per paragarph.
  random: Math.random, // A PRNG function
  sentenceLowerBound: 5, // Min. number of words per sentence.
  sentenceUpperBound: 15, // Max. number of words per sentence.
  suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
  units: "paragraph" // paragraph(s), "sentence(s)", or "word(s)"
  // words: ["ad", ...]       // Array of words to draw from
})
)}

function _4(example,md){return(
md`${
  // We need two newlines to start new paragraphs in Markdown, whereas the generator only generate one newline per paragraph
  example.replaceAll("\n", "\n\n")
}`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("loremIpsum")).define("loremIpsum", ["require"], _loremIpsum);
  main.variable(observer("example")).define("example", ["loremIpsum"], _example);
  main.variable(observer()).define(["example","md"], _4);
  return main;
}
