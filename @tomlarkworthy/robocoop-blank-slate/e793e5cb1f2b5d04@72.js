function _1(md){return(
md`# GPT-3 Encoder
We couldn't get the [official node module](https://github.com/latitudegames/GPT-3-Encoder) to work in the browser so it's copied here.

~~~js
import { encode } from "@codingwithfire/gpt-3-encoder"
~~~`
)}

function _encoder(FileAttachment){return(
FileAttachment("encoder.json").json()
)}

function _bpe_file(FileAttachment){return(
FileAttachment("vocab.bpe.txt").text()
)}

function _range(){return(
(x, y) => {
  const res = Array.from(Array(y).keys()).slice(x)
  return res
}
)}

function _ord(){return(
x => {
  return x.charCodeAt(0)
}
)}

function _chr(){return(
x => {
  return String.fromCharCode(x)
}
)}

function _textEncoder(){return(
new TextEncoder("utf-8")
)}

function _encodeStr(textEncoder){return(
str => {
  return Array.from(textEncoder.encode(str)).map(x => x.toString())
}
)}

function _textDecoder(){return(
new TextDecoder("utf-8")
)}

function _decodeStr(textDecoder){return(
arr => {
  return textDecoder.decode(new Uint8Array(arr));
}
)}

function _dictZip(){return(
(x, y) => {
  const result = {}
  x.map((_, i) => { result[x[i]] = y[i] })
  return result
}
)}

function _bytes_to_unicode(range,ord,chr){return(
function bytes_to_unicode() {
  const bs = range(ord('!'), ord('~') + 1).concat(range(ord('¡'), ord('¬') + 1), range(ord('®'), ord('ÿ') + 1))

  let cs = bs.slice()
  let n = 0
  for (let b = 0; b < 2 ** 8; b++) {
    if (!bs.includes(b)) {
      bs.push(b)
      cs.push(2 ** 8 + n)
      n = n + 1
    }
  }

  cs = cs.map(x => chr(x))

  const result = {}
  bs.map((_, i) => { result[bs[i]] = cs[i] })
  return result
}
)}

function _get_pairs(){return(
function get_pairs(word) {
  const pairs = new Set()
  let prev_char = word[0]
  for (let i = 1; i < word.length; i++) {
    const char = word[i]
    pairs.add([prev_char, char])
    prev_char = char
  }
  return pairs
}
)}

function _pat(){return(
/'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu
)}

function _decoder(encoder)
{
  let decoder = {};
  Object.keys(encoder).map((x) => {
    decoder[encoder[x]] = x;
  });
  return decoder;
}


function _lines(bpe_file){return(
bpe_file.split('\n')
)}

function _bpe_merges(lines){return(
lines.slice(1, lines.length - 1).map(x => {
  return x.split(/(\s+)/).filter(function(e) { return e.trim().length > 0 })
})
)}

function _byte_encoder(bytes_to_unicode){return(
bytes_to_unicode()
)}

function _byte_decoder(byte_encoder)
{
  let byte_decoder = {};
  Object.keys(byte_encoder).map((x) => {
    byte_decoder[byte_encoder[x]] = x;
  });
  return byte_decoder;
}


function _bpe_ranks(dictZip,bpe_merges,range){return(
dictZip(bpe_merges, range(0, bpe_merges.length))
)}

function _cache(){return(
new Map()
)}

function _bpe(cache,get_pairs,bpe_ranks){return(
function bpe(token) {
  if (cache.has(token)) {
    return cache.get(token)
  }``

  let word = token.split('')

  let pairs = get_pairs(word)

  if (!pairs) {
    return token
  }

  while (true) {
    const minPairs = {}
    Array.from(pairs).map(pair => {
      const rank = bpe_ranks[pair]
      minPairs[(isNaN(rank) ? 10e10 : rank)] = pair
    })
    
    const bigram = minPairs[Math.min(...Object.keys(minPairs).map(x => {
      return parseInt(x)
    }
    ))]

    if (!(bigram in bpe_ranks)) {
      break
    }

    const first = bigram[0]
    const second = bigram[1]
    let new_word = []
    let i = 0

    while (i < word.length) {
      const j = word.indexOf(first, i)
      if (j === -1) {
        new_word = new_word.concat(word.slice(i))
        break
      }
      new_word = new_word.concat(word.slice(i, j))
      i = j

      if (word[i] === first && i < word.length - 1 && word[i + 1] === second) {
        new_word.push(first + second)
        i = i + 2
      } else {
        new_word.push(word[i])
        i = i + 1
      }
    }

    word = new_word
    if (word.length === 1) {
      break
    } else {
      pairs = get_pairs(word)
    }
  }

  word = word.join(' ')
  cache.set(token, word)

  return word
}
)}

function _encode(pat,encodeStr,byte_encoder,bpe,encoder){return(
function encode(text) {
  let bpe_tokens = []
  const matches = Array.from(text.matchAll(pat)).map(x => x[0])
  for (let token of matches) {
    token = encodeStr(token).map(x => {
      return byte_encoder[x]
    }).join('')
    
    const new_tokens = bpe(token).split(' ').map(x => encoder[x])
    bpe_tokens = bpe_tokens.concat(new_tokens)
  }
  return bpe_tokens
}
)}

function _decode(decoder,decodeStr,byte_decoder){return(
function decode(tokens) {
  let text = tokens.map(x => decoder[x]).join('')
  text = decodeStr(text.split('').map(x => byte_decoder[x]))
  return text
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["encoder.json", {url: new URL("./files/f0532276473de073124d46b8ecd9040e139a3336ef3dfb512dd9ca848fa9c62556d998deeea10023a80822aaafa8b91135f5b838ad6a757095df76d4787ba208.json", import.meta.url), mimeType: "application/json", toString}],
    ["vocab.bpe.txt", {url: new URL("./files/4a1868a5dc7f5bdf2eb11cedc7d1da5bdb83408e65a7c69a25f91f7fd80c176be02ebdeae7a67fbe01895f42ec59247ada87bbbc7b19159d4f7ab37e4a0a5780.txt", import.meta.url), mimeType: "text/plain", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("encoder")).define("encoder", ["FileAttachment"], _encoder);
  main.variable(observer("bpe_file")).define("bpe_file", ["FileAttachment"], _bpe_file);
  main.variable(observer("range")).define("range", _range);
  main.variable(observer("ord")).define("ord", _ord);
  main.variable(observer("chr")).define("chr", _chr);
  main.variable(observer("textEncoder")).define("textEncoder", _textEncoder);
  main.variable(observer("encodeStr")).define("encodeStr", ["textEncoder"], _encodeStr);
  main.variable(observer("textDecoder")).define("textDecoder", _textDecoder);
  main.variable(observer("decodeStr")).define("decodeStr", ["textDecoder"], _decodeStr);
  main.variable(observer("dictZip")).define("dictZip", _dictZip);
  main.variable(observer("bytes_to_unicode")).define("bytes_to_unicode", ["range","ord","chr"], _bytes_to_unicode);
  main.variable(observer("get_pairs")).define("get_pairs", _get_pairs);
  main.variable(observer("pat")).define("pat", _pat);
  main.variable(observer("decoder")).define("decoder", ["encoder"], _decoder);
  main.variable(observer("lines")).define("lines", ["bpe_file"], _lines);
  main.variable(observer("bpe_merges")).define("bpe_merges", ["lines"], _bpe_merges);
  main.variable(observer("byte_encoder")).define("byte_encoder", ["bytes_to_unicode"], _byte_encoder);
  main.variable(observer("byte_decoder")).define("byte_decoder", ["byte_encoder"], _byte_decoder);
  main.variable(observer("bpe_ranks")).define("bpe_ranks", ["dictZip","bpe_merges","range"], _bpe_ranks);
  main.variable(observer("cache")).define("cache", _cache);
  main.variable(observer("bpe")).define("bpe", ["cache","get_pairs","bpe_ranks"], _bpe);
  main.variable(observer("encode")).define("encode", ["pat","encodeStr","byte_encoder","bpe","encoder"], _encode);
  main.variable(observer("decode")).define("decode", ["decoder","decodeStr","byte_decoder"], _decode);
  return main;
}
