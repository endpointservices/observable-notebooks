// https://observablehq.com/@tomlarkworthy/wave-function-collapse@574
import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Wave Function Collapse 

Port of Maxim Gumin’s WaveFunctionCollapse (WFC) algorithm as found on [Github](https://github.com/mxgmn/WaveFunctionCollapse) for experimentation in the browser.

Commit at time of port 87ad48afb87530c5ec479e859c0ebb95bb5f1ca2

This notebook loads the original samples as found on Github. If you want to write your own WFC, fork
the repository and change the base_url to your Github repo.

Note: I have only ported the simpletiled version of WFC so far. More soon!

This is for an upcoming fully autonomous robot ship fighting game, Corepox (for mobile). Find out more at [corepox.net](https://www.corepox.net), or sign up for news of the 2019 release [here](https://groups.google.com/forum/#!forum/corepox-news)
`
)}

function _base_url(){return(
"https://raw.githubusercontent.com/mxgmn/WaveFunctionCollapse/master/"
)}

function _sample(select,$,samples_xml,XMLSerializer){return(
select({
  title: "Choose from the sample.xml",
  options: $($.parseXML(samples_xml))
    .find(":root>simpletiled")
    .map((index, sample) => new Object({
        "label": $(sample).attr("name") + " - " + $(sample).attr("subset"),
        "value": (new XMLSerializer()).serializeToString(sample) // sucks we can't pass around objects ATM
      })
    )
    .toArray()
})
)}

function _animated(checkbox){return(
checkbox({
  description: "Show intermediate steps, WARNING CPU Intensive",
  options: [{ value: true, label: "Animated" }],
  value: false
})
)}

function _tiles_used(choice,$doc,$,checkbox)
{
  let tiles = [];
  if (choice.subset) {
    let xsubset = $doc.find(`:root>subsets>subset[name='${choice.subset}']`); 
    if (xsubset.length == 0) console.error(`ERROR: subset ${choice.subset} is not found`);
    else tiles = $(xsubset).find("tile").map((index, x) => $(x).attr("name")).toArray();
  } else {
     $doc.find(":root>tiles>tile").each((index, xtile) => {
      tiles.push($(xtile).attr("name"));
     });
  }
  
  return checkbox({
    title: 'Tiles Used',
    options: tiles,
    value: tiles
  });
}


function* _wfc(choice,SimpleTiledModel,animated)
{
  if (choice.type == 'overlapping') {
    var model = undefined 
    } else if (choice.type == 'simpletiled') {
      var model = new SimpleTiledModel(choice.name, choice.width, choice.height, choice.periodic, choice.black);
    }
  
  console.log("model setup")
  for (let k = 0; k < 10; k++) {
    // TODO seed
    let seed = Math.random();
    let stepper = model.Run(seed, choice.limit);

    let step = stepper.next();
    let iter = 0;
    while(!step.done) {
      step = stepper.next();
      if (animated && iter++ % 10 == 0) yield model.Graphics();
    }

    let finished = step.value;
    if (finished === true) {
      console.log("DONE");
      let canvas = model.Graphics();
      if (choice.type == "simpletiled" && choice.textOutput) {
        console.log(model.TextOutput())
      }
      yield canvas;
      return canvas;
    } else if (finished === false){
      console.log("CONTRADICTION");
    }
  }
}


function _choice($,sample)
{
  let $choice = $($.parseXML(sample)).find(":root");
  
  const type = $choice.prop("tagName");
  
  const bool = (name, default_value) =>
        $choice.attr(name)
        ? JSON.parse($choice.attr(name).toLowerCase()) 
        : default_value || false
  
  
  const int = (name, default_value) =>
        $choice.attr(name)
        ? JSON.parse($choice.attr(name)) 
        : default_value || 0
  
  return {
    type: type,
    name: $choice.attr("name"),
    subset: $choice.attr("subset"),
    limit: int("limit", 0),
    width: int("width"),
    height: int("height"),
    screenshots: int("screenshots", 2),
    periodic: bool("periodic"),
    textOutput: bool("textOutput"),
    black: bool("black"),
    N: parseInt($choice.attr("N")) || 2,
  }
}


function _imageCache($,data_xml,DOM,base_url,choice)
{
  const cache = {};
  const $doc = $($.parseXML(data_xml));
  const unique = $doc.find(":root").attr("unique") || false;
  let promises = [];
  $doc.find(":root>tiles>tile").each((index, xtile) => {
    let tilename = $(xtile).attr("name");
    // TODO
    // if (subset !== null && !subset.Contains(tilename)) continue;

    let sym = $(xtile).attr("symmetry") || 'X';
    if (sym == 'L') {
      var cardinality = 4;
    } else if (sym == 'T') {
      var cardinality = 4;
    } else if (sym == 'I') {
      var cardinality = 2;
    } else if (sym == '\\') {
      var cardinality = 2;
    } else {
      var cardinality = 1;
    }

    function lazyLoad(imagePath) {
      if (cache[imagePath] === undefined) {
        promises.push(new Promise(resolve => {
          const img = DOM.element("img", {
            crossOrigin: "anonymous",
            src: imagePath
          })
          img.onload = () => resolve({
            imagePath, status: 'ok'
          });
          img.onerror = () => resolve({
            imagePath, status: 'error'
          });
          cache[imagePath] = img;
          img.src = imagePath;
        }));
      }
    }
    if (unique) {
      for (let t = 0; t < cardinality; t++) {
        lazyLoad(`${base_url}samples/${choice.name}/${tilename} ${t}.png`)
      }
    } else {
      lazyLoad(`${base_url}samples/${choice.name}/${tilename}.png`)
    }
  });

  return Promise.all(promises).then(_ => cache);
}


function _Model(normalizeAndPick){return(
class Model {
  constructor(width, height) {
    this.FMX = width;
    this.FMY = height;

    // Previously statics
    this.DX = [-1, 0, 1, 0];
    this.DY = [0, 1, 0, -1];
    this.opposite = [2, 3, 0, 1];
  }

  Init() {
    this.wave = new Array(this.FMX * this.FMY);
    this.compatible = new Array(this.wave.length);
    for (let i = 0; i < this.wave.length; i++) {
      this.wave[i] = new Array(this.T);
      this.compatible[i] = new Array(this.T);
      for (let t = 0; t < this.T; t++) this.compatible[i][t] = new Array(4);
    }

    this.weightLogWeights = new Array(this.T);
    this.sumOfWeights = 0;
    this.sumOfWeightLogWeights = 0;

    for (let t = 0; t < this.T; t++) {
      this.weightLogWeights[t] = this.weights[t] * Math.log(this.weights[t]);
      this.sumOfWeights += this.weights[t];
      this.sumOfWeightLogWeights += this.weightLogWeights[t];
    }

    this.startingEntropy = Math.log(this.sumOfWeights) - this.sumOfWeightLogWeights / this.sumOfWeights;

    this.sumsOfOnes = new Array(this.FMX * this.FMY);
    this.sumsOfWeights = new Array(this.FMX * this.FMY);
    this.sumsOfWeightLogWeights = new Array(this.FMX * this.FMY);
    this.entropies = new Array(this.FMX * this.FMY);

    this.stack = new Array(this.wave.length * this.T);
    this.stacksize = 0;
  }

  // Returns true false or null
  Observe() {
    let min = 1E+3;
    let argmin = -1;

    for (let i = 0; i < this.wave.length; i++) {
      if (this.OnBoundary(i % this.FMX, Math.floor(i / this.FMX))) continue;

      const amount = this.sumsOfOnes[i];
      if (amount == 0) return false;

      const entropy = this.entropies[i];
      if (amount > 1 && entropy <= min) {
        const noise = 1E-6 * Math.random();
        if (entropy + noise < min) {
          min = entropy + noise;
          argmin = i;
        }
      }
    }

    if (argmin == -1) {
      this.observed = new Array(this.FMX * this.FMY);
      for (let i = 0; i < this.wave.length; i++)
        for (let t = 0; t < this.T; t++)
          if (this.wave[i][t]) {
            this.observed[i] = t;
            break;
          }
      return true;
    }

    const distribution = new Array(this.T);
    for (let t = 0; t < this.T; t++) distribution[t] = this.wave[argmin][t] ? this.weights[t] : 0;
    const r = normalizeAndPick(distribution, Math.random());

    const w = this.wave[argmin];
    for (let t = 0; t < this.T; t++)
      if (w[t] != (t == r))
        this.Ban(argmin, t);

    return null
  }

  Propagate() {
    while (this.stacksize > 0) {
      var e1 = this.stack[this.stacksize - 1];
      this.stacksize--;

      let i1 = e1[0];
      let x1 = i1 % this.FMX,
        y1 = Math.floor(i1 / this.FMX);

      for (let d = 0; d < 4; d++) {
        let dx = this.DX[d],
          dy = this.DY[d];
        let x2 = x1 + dx,
          y2 = y1 + dy;
        if (this.OnBoundary(x2, y2)) continue;

        if (x2 < 0) x2 += this.FMX;
        else if (x2 >= this.FMX) x2 -= this.FMX;
        if (y2 < 0) y2 += this.FMY;
        else if (y2 >= this.FMY) y2 -= this.FMY;

        let i2 = x2 + y2 * this.FMX;
        let p = this.propagator[d][e1[1]];
        let compat = this.compatible[i2];

        for (let l = 0; l < p.length; l++) {
          let t2 = p[l];
          let comp = compat[t2];

          comp[d] --;
          if (comp[d] == 0) this.Ban(i2, t2);
        }
      }
    }
  }

  // Generates true or false or null
  *Run( /* TODO */ seed, limit) {
    if (this.wave == null) this.Init();

    this.Clear();

    // TODO: use a RNG that allows seeding
    // random = new Random(seed);

    for (let l = 0; l < limit || limit == 0; l++) {
      const result = this.Observe();
      if (result !== null) return result;
      this.Propagate();
      
      yield null;
    }

    return true;
  }

  Ban(i, t) {
    this.wave[i][t] = false;

    let comp = this.compatible[i][t];
    for (let d = 0; d < 4; d++) comp[d] = 0;
    this.stack[this.stacksize] = [i, t];
    this.stacksize++;

    let sum = this.sumsOfWeights[i];
    this.entropies[i] += this.sumsOfWeightLogWeights[i] / sum - Math.log(sum);

    this.sumsOfOnes[i] -= 1;
    this.sumsOfWeights[i] -= this.weights[t];
    this.sumsOfWeightLogWeights[i] -= this.weightLogWeights[t];

    sum = this.sumsOfWeights[i];
    this.entropies[i] -= this.sumsOfWeightLogWeights[i] / sum - Math.log(sum);
  }

  Clear() {
    for (let i = 0; i < this.wave.length; i++) {
      for (let t = 0; t < this.T; t++) {
        this.wave[i][t] = true;
        for (let d = 0; d < 4; d++) this.compatible[i][t][d] = this.propagator[this.opposite[d]][t].length;
      }

      this.sumsOfOnes[i] = this.weights.length;
      this.sumsOfWeights[i] = this.sumOfWeights;
      this.sumsOfWeightLogWeights[i] = this.sumOfWeightLogWeights;
      this.entropies[i] = this.startingEntropy;
    }
  }

  OnBoundary(x, y) {
    throw "Unimplemented"
  }
}
)}

function _SimpleTiledModel(Model,$doc,DOM,tiles_used,$,imageCache,base_url){return(
class SimpleTiledModel extends Model {
  constructor(name, width, height, periodic, black) {
    super(width, height);
    this.periodic = periodic;
    this.black = black;

    this.tilesize = $doc.find(":root").attr("size") || 16
    const unique = $doc.find(":root").attr("unique") || false;
    
    var tile_context = DOM.context2d(this.tilesize, this.tilesize);
    tile_context.canvas.width = this.tilesize;
    tile_context.canvas.height = this.tilesize;
    
    const self = this;

    const tile_used_index = tiles_used.reduce(
      (idx, tile) => {idx[tile] = true; return idx},
      {}
    )
    
    console.log("tile_used_index", tile_used_index);
    
    function tile(f) {
      const result = new Array(self.tilesize * self.tilesize);
      for (let y = 0; y < self.tilesize; y++)
        for (let x = 0; x < self.tilesize; x++)
          result[x + y * self.tilesize] = f(x, y);
      return result;
    };

    function rotate(array) {
      return tile((x, y) => array[self.tilesize - 1 - y + x * self.tilesize]);
    }

    this.tiles = [];
    this.tilenames = [];
    var tempStationary = [];

    let action = [];
    let firstOccurrence = {};

    $doc.find(":root>tiles>tile").each((index, xtile) => {
      let tilename = $(xtile).attr("name");
      
      if (!tile_used_index[tilename]) return;

      let sym = $(xtile).attr("symmetry") || 'X';
      if (sym == 'L') {
        var cardinality = 4;
        var a = i => (i + 1) % 4;
        var b = i => i % 2 == 0 ? i + 1 : i - 1;
      } else if (sym == 'T') {
        var cardinality = 4;
        var a = i => (i + 1) % 4;
        var b = i => i % 2 == 0 ? i : 4 - i;
      } else if (sym == 'I') {
        var cardinality = 2;
        var a = i => 1 - i;
        var b = i => i;
      } else if (sym == '\\') {
        var cardinality = 2;
        var a = i => 1 - i;
        var b = i => 1 - i;
      } else {
        var cardinality = 1;
        var a = i => i;
        var b = i => i;
      }

      this.T = action.length;
      firstOccurrence[tilename] = this.T;

      let map = new Array(cardinality);
      for (let t = 0; t < cardinality; t++) {
        map[t] = new Array(8);

        map[t][0] = t;
        map[t][1] = a(t);
        map[t][2] = a(a(t));
        map[t][3] = a(a(a(t)));
        map[t][4] = b(t);
        map[t][5] = b(a(t));
        map[t][6] = b(a(a(t)));
        map[t][7] = b(a(a(a(t))));

        for (let s = 0; s < 8; s++) map[t][s] += this.T;

        action.push(map[t]);
      }
      
      if (unique) {
        for (let t = 0; t < cardinality; t++) {
          let img = imageCache[`${base_url}samples/${name}/${tilename} ${t}.png`];
          tile_context.drawImage(img, 0, 0);
          this.tiles.push(tile((x, y) => tile_context.getImageData(x, y, 1, 1).data));
          this.tilenames.push(`${tilename} ${t}`);
        }
      } else {
        let img = imageCache[`${base_url}samples/${name}/${tilename}.png`]
        if (!img) console.error(img, `${base_url}samples/${name}/${tilename}.png`)
        tile_context.drawImage(img, 0, 0);
        
        this.tiles.push(tile((x, y) => tile_context.getImageData(x, y, 1, 1).data));
        this.tilenames.push(`${tilename} 0`);

        for (let t = 1; t < cardinality; t++) {
          this.tiles.push(rotate(this.tiles[this.T + t - 1]));
          this.tilenames.push(`${tilename} ${t}`);
        }
      }

      for (let t = 0; t < cardinality; t++) tempStationary.push(JSON.parse($(xtile).attr("weight") || "1"));
    });
    
    this.T = action.length;
    this.weights = tempStationary;

    this.propagator = new Array(4);
    let tempPropagator = new Array(4);
    for (let d = 0; d < 4; d++) {
      tempPropagator[d] = new Array(this.T);
      this.propagator[d] = new Array(this.T);
      for (let t = 0; t < this.T; t++) tempPropagator[d][t] = new Array(this.T);
    }

    $doc.find(":root>neighbors>neighbor").each((index, xneighbor) => {
      let left = $(xneighbor).attr("left").split(' ');
      let right = $(xneighbor).attr("right").split(' ');

      if (!tile_used_index[left[0]] || !tile_used_index[right[0]]) return;
 
      let L = action[firstOccurrence[left[0]]][left.length == 1 ? 0 : parseInt(left[1])],
        D = action[L][1];
      let R = action[firstOccurrence[right[0]]][right.length == 1 ? 0 : parseInt(right[1])],
        U = action[R][1];

      tempPropagator[0][R][L] = true;
      tempPropagator[0][action[R][6]][action[L][6]] = true;
      tempPropagator[0][action[L][4]][action[R][4]] = true;
      tempPropagator[0][action[L][2]][action[R][2]] = true;

      tempPropagator[1][U][D] = true;
      tempPropagator[1][action[D][6]][action[U][6]] = true;
      tempPropagator[1][action[U][4]][action[D][4]] = true;
      tempPropagator[1][action[D][2]][action[U][2]] = true;
    });

    for (let t2 = 0; t2 < this.T; t2++)
      for (let t1 = 0; t1 < this.T; t1++) {
        tempPropagator[2][t2][t1] = tempPropagator[0][t1][t2];
        tempPropagator[3][t2][t1] = tempPropagator[1][t1][t2];
      }

    let sparsePropagator = new Array(4);
    for (let d = 0; d < 4; d++) {
      sparsePropagator[d] = new Array(this.T);
      for (let t = 0; t < this.T; t++) sparsePropagator[d][t] = [];
    }

    for (let d = 0; d < 4; d++)
      for (let t1 = 0; t1 < this.T; t1++) {
        let sp = sparsePropagator[d][t1];
        let tp = tempPropagator[d][t1];

        for (let t2 = 0; t2 < this.T; t2++)
          if (tp[t2]) sp.push(t2);

        let ST = sp.length;
        this.propagator[d][t1] = new Array(ST);
        for (let st = 0; st < ST; st++) this.propagator[d][t1][st] = sp[st];
      }
  }

  OnBoundary(x, y) {
    return !this.periodic && (x < 0 || y < 0 || x >= this.FMX || y >= this.FMY);
  }

  Graphics() {
    const width = this.FMX * this.tilesize;
    const height = this.FMY * this.tilesize;
    
    let result = this.canvas;
    
    if (!result) {
      result = DOM.context2d(width, height);
      result.canvas.width = width;
      result.canvas.height = height;
      this.canvas = result;
    }
    
    let bitmapData = new Uint8ClampedArray(width * height * 4);
    
    function setPixel(index, r, g, b) {
      bitmapData[index * 4] = r;
      bitmapData[index * 4 + 1] = g;
      bitmapData[index * 4 + 2] = b;
      bitmapData[index * 4 + 3] = 255;  
    }

    if (this.observed != null) {
      for (let x = 0; x < this.FMX; x++)
        for (let y = 0; y < this.FMY; y++) {
          let tile = this.tiles[this.observed[x + y * this.FMX]];
          for (let yt = 0; yt < this.tilesize; yt++)
            for (let xt = 0; xt < this.tilesize; xt++) {
              let c = tile[xt + yt * this.tilesize];
              
              //bitmapData[x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize] =
                //	unchecked((int)0xff000000 | (c.R << 16) | (c.G << 8) | c.B);
                //(0xff000000 | (c.R << 16) | (c.G << 8) | c.B);
              setPixel(x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize,
                  c[0], c[1], c[2]);
              
            }
        }
    } else {
      for (let x = 0; x < this.FMX; x++)
        for (let y = 0; y < this.FMY; y++) {
          let a = this.wave[x + y * this.FMX]; // array of booleans
          // let amount = (from b in a where b select 1).Sum();
          let amount = a.reduce((total, element) => total + element ? 1 : 0, 0);
          //let lambda = 1.0 / (from t in Enumerable.Range(0, T) where a[t] select weights[t]).Sum();
          let lambda = 1.0 / this.weights.reduce((total, weight, t) => total + a[t] ? weight : 0);

          for (let yt = 0; yt < this.tilesize; yt++)
            for (let xt = 0; xt < this.tilesize; xt++) {
              if (this.black && amount == this.T) {
                setPixel(x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize,
                  1, 1, 1);
              } else {
                let r = 0,
                  g = 0,
                  b = 0;
                for (let t = 0; t < this.T; t++)
                  if (this.wave[x + y * this.FMX][t]) {
                    let c = this.tiles[t][xt + yt * this.tilesize];
                    r += c[0] * this.weights[t] * lambda;
                    g += c[1] * this.weights[t] * lambda;
                    b += c[2] * this.weights[t] * lambda;
                  }
                setPixel(x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize,
                  r, g, b);
              }
            }
        }
    }
    
    result.putImageData(new ImageData(bitmapData, width, height), 0, 0);
    return result.canvas;
  }

  TextOutput() {
    let result = "";

    for (let y = 0; y < this.FMY; y++) {
      for (let x = 0; x < this.FMX; x++)
        result += this.tilenames[this.observed[x + y * this.FMX]];
      result += '\n'
    }

    return result;
  }
}
)}

function _normalizeAndPick(){return(
function(a, rnd) {
  let sum = a.reduce((total, val) => total + val, 0);

  if (sum == 0)
  {
    for (let j = 0; j < a.length; j++) a[j] = 1;
    sum = a.length;
  }

  for (let j = 0; j < a.length; j++) a[j] /= sum;

  let i = 0, x = 0;
  while (i < a.length)
  {
    x += a[i];
    if (rnd <= x) return i;
    i++;
  }

  return 0;
}
)}

function _samples_xml(base_url){return(
fetch(`${base_url}samples.xml`)
  .then(resp => resp.text())
)}

function _data_xml(base_url,choice){return(
fetch(`${base_url}/samples/${choice.name}/data.xml`)
  .then(resp => resp.text())
)}

function _$doc($,data_xml){return(
$($.parseXML(data_xml))
)}

function _$(require){return(
require('jquery')
)}

function _18(md){return(
md`

The MIT License(MIT)

Copyright(c) mxgmn 2016.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("base_url")).define("base_url", _base_url);
  main.variable(observer("viewof sample")).define("viewof sample", ["select","$","samples_xml","XMLSerializer"], _sample);
  main.variable(observer("sample")).define("sample", ["Generators", "viewof sample"], (G, _) => G.input(_));
  main.variable(observer("viewof animated")).define("viewof animated", ["checkbox"], _animated);
  main.variable(observer("animated")).define("animated", ["Generators", "viewof animated"], (G, _) => G.input(_));
  main.variable(observer("viewof tiles_used")).define("viewof tiles_used", ["choice","$doc","$","checkbox"], _tiles_used);
  main.variable(observer("tiles_used")).define("tiles_used", ["Generators", "viewof tiles_used"], (G, _) => G.input(_));
  main.variable(observer("viewof wfc")).define("viewof wfc", ["choice","SimpleTiledModel","animated"], _wfc);
  main.variable(observer("wfc")).define("wfc", ["Generators", "viewof wfc"], (G, _) => G.input(_));
  main.variable(observer("choice")).define("choice", ["$","sample"], _choice);
  main.variable(observer("imageCache")).define("imageCache", ["$","data_xml","DOM","base_url","choice"], _imageCache);
  main.variable(observer("Model")).define("Model", ["normalizeAndPick"], _Model);
  main.variable(observer("SimpleTiledModel")).define("SimpleTiledModel", ["Model","$doc","DOM","tiles_used","$","imageCache","base_url"], _SimpleTiledModel);
  main.variable(observer("normalizeAndPick")).define("normalizeAndPick", _normalizeAndPick);
  main.variable(observer("samples_xml")).define("samples_xml", ["base_url"], _samples_xml);
  main.variable(observer("data_xml")).define("data_xml", ["base_url","choice"], _data_xml);
  main.variable(observer("$doc")).define("$doc", ["$","data_xml"], _$doc);
  main.variable(observer("$")).define("$", ["require"], _$);
  const child1 = runtime.module(define1);
  main.import("select", child1);
  const child2 = runtime.module(define1);
  main.import("checkbox", child2);
  main.variable(observer()).define(["md"], _18);
  return main;
}
