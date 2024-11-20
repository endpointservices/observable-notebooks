import define1 from "./115f2c4ec1a42d7e@373.js";
import define2 from "./293899bef371e135@293.js";

function _1(md){return(
md`# Fast Circular Barcode Scanner`
)}

function _offset_pinhole(Inputs){return(
Inputs.range([-0.5, 0.5], {
  label: "offset",
  value: 0.001
})
)}

function _scale_pinhole(Inputs){return(
Inputs.range([0, 1.5], { label: "scale", value: 0.5 })
)}

function _angle_pinhole(Inputs){return(
Inputs.range([-Math.PI, Math.PI], {
  label: "angle",
  value: 0.3
})
)}

function _fov_pinhole(Inputs){return(
Inputs.range([0.00001, Math.PI], {
  label: "field-of-view (radians)"
})
)}

function _pinhole(fov_pinhole){return(
(
  template,
  px,
  model = {
    angle: 0,
    offset: 0,
    scale: 1
  }
) => {
  const angleCorrection = (px) => {
    // flatten the image against an image plane, distance d from focal point
    // tan(angle) = opposite / adjacent
    // -fov / 2 is the extreme, -0.5 is extreme of image coords
    //    tan(-fov / 2) = -0.5 / d
    // => d = -0.5 / tan(-fov * 0.5)
    // Now we d we can go forward, preserving image coordinates
    const d = -0.5 / Math.tan(-0.5 * fov_pinhole);
    return Math.atan((px - model.offset) / d) / fov_pinhole;
  };
  const pinhole = (angle) => {
    angle -= model.offset;
    const x = angle * fov_pinhole; // range: [-0.5, -0.5]
    const a = model.angle + Math.PI / 2;
    const b = 0.5 / (Math.cos(a) - (Math.sin(a) * Math.cos(x)) / Math.sin(x));
    return (b / model.scale / fov_pinhole + 0.5) * template.length;
  };
  const angle = angleCorrection(px);
  const pinholeX = pinhole(angle);
  return {
    angle,
    ix: px + 0.5,
    tx: pinholeX / template.length,
    y: template[Math.round(pinholeX)]
  };
}
)}

function _template()
{
  const half = [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1,
    1, 1
  ];
  return [...half, 1, 1, ...[...half].reverse()];
}


function _templateData(template){return(
template.flatMap((v, i) => [
  { x: i, y: v },
  { x: i + 1, y: v }
])
)}

function _projectedPinholeData(width,pinhole,template,offset_pinhole,scale_pinhole,angle_pinhole){return(
Array.from({ length: width }).map((_, x) => ({
  x: x,
  ...pinhole(template, x / width - 0.5, {
    offset: offset_pinhole,
    scale: scale_pinhole,
    angle: angle_pinhole
  })
}))
)}

function _10(Plot,projectedPinholeData){return(
Plot.auto(projectedPinholeData, {x: "x", y: "y", color: "#55ac3e"}).plot()
)}

function _11(md){return(
md`### Edge detection image features`
)}

function _features(pinhole,template,offset_pinhole,scale_pinhole,angle_pinhole,width)
{
  const STEP = 0.1;
  const features = [];
  let previousY = pinhole(template, 0, {
    offset: offset_pinhole,
    scale: scale_pinhole,
    angle: angle_pinhole
  });
  for (let x = 0 + STEP; x < width; x += STEP) {
    const y = pinhole(template, x / width - 0.5, {
      offset: offset_pinhole,
      scale: scale_pinhole,
      angle: angle_pinhole
    });
    if (y.y !== undefined && previousY.y !== y.y) {
      features.push({
        x,
        ...y
      });
      previousY = y;
    }
  }
  return features;
}


function _13(md){return(
md`## Eyeballing the forward model`
)}

function _14(Inputs,$0){return(
Inputs.bind(
  Inputs.range([-0.5, 0.5], {
    label: "offset",
    value: 0.001
  }),
  $0
)
)}

function _15(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 1.5], { label: "scale", value: 0.5 }),
  $0
)
)}

function _16(Inputs,$0){return(
Inputs.bind(
  Inputs.range([-Math.PI, Math.PI], {
    label: "angle",
    value: 0.3
  }),
  $0
)
)}

function _17(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0.00001, Math.PI], {
    label: "field-of-view (radians)"
  }),
  $0
)
)}

function _18(md){return(
md`### Regular spaced intervals

Ignore template and concentrate on the transform. The following graph shows how a given template space (tx) is mapped to image space (ix) for a given configuration.`
)}

function _grid(pinhole,template,offset_pinhole,scale_pinhole,angle_pinhole){return(
Array.from({ length: 100 })
  .map((x, i) =>
    pinhole(template, (i - 20) / 40 - 0.5, {
      offset: offset_pinhole,
      scale: scale_pinhole,
      angle: angle_pinhole
    })
  )
  .filter((x) => x.y != undefined)
)}

function _20(Plot,grid){return(
Plot.auto(grid, {x: "tx", y: "ix", mark: "dot"}).plot()
)}

function _21(md){return(
md`## Learning the inverse model

What we actually want to do is the inverse, from a given set of image/template observation pairs \`(ix, tx)\`, figure out which curve we are on (offset, angle, scale).

I think we only need three pairs to figure it out. So lets try generating a training set of three pairs of ix,tx (6 dimensions) mapped to the offset, scale, angle parameters. As we have the forward model, we can sample from that an re-arrange it. 

`
)}

function _random_params(randomBetween,offset_range,angle_range,scale_range){return(
() => ({
  offset: randomBetween(offset_range),
  angle: randomBetween(angle_range),
  scale: randomBetween(scale_range)
})
)}

function _training_sample(pinhole,template,random_params){return(
() => {
  const samplePoint = () => pinhole(template, Math.random(), y);
  let points, y;
  do {
    y = random_params();
    points = [samplePoint(), samplePoint(), samplePoint()]
      .filter((x) => x.y !== undefined)
      .sort((a, b) => a.tx - b.tx)
      .flatMap((x) => [x.tx, x.ix]);
  } while (points.length !== 6);
  return [points, [y.offset, y.scale, y.angle]];
}
)}

function _example_training_sample(training_sample){return(
training_sample()
)}

function _training_set(training_sample){return(
Array.from({ length: 20000 })
  .map(training_sample)
  .reduce(
    (dataset, [x, y]) => {
      dataset.x.push(x);
      dataset.y.push(y);
      return dataset;
    },
    { x: [], y: [] }
  )
)}

function _26(md){return(
md`### 2 Layer Neural Network

Lets try a simple model`
)}

function _model(tf)
{
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 12, inputDim: 6 }));
  model.add(tf.layers.dense({ units: 3, inputDim: 12 }));
  model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
  return model;
}


function _28(model,tf,training_sample){return(
model.predict(tf.tensor([training_sample()[0]])).data()
)}

function _29(md){return(
md`Click the button to train it`
)}

function _trained(Inputs,model,tf,training_set){return(
Inputs.button("fit model", {
  reduce: () => {
    return model.fit(tf.tensor(training_set.x), tf.tensor(training_set.y), {
      epochs: 20,
      batchSize: 32
    });
  }
})
)}

function _predicted_params(trained,model,tf,grid)
{
  trained;
  return model
    .predict(
      tf.tensor([
        [
          grid[0].tx,
          grid[0].ix,
          grid[grid.length / 2].tx,
          grid[grid.length / 2].ix,
          grid.at(-1).tx,
          grid.at(-1).ix
        ].sort((a, b) => a.tx - b.tx)
      ])
    )
    .data();
}


function _evaluation(grid,pinhole,template,predicted_params){return(
grid.map((d) => ({
  ...d,
  px: pinhole(template, d.ix, {
    offset: predicted_params[0],
    scale: predicted_params[1],
    angle: predicted_params[2]
  }).tx
}))
)}

function _33(Plot,evaluation){return(
Plot.plot({
  marks: [
    Plot.dot(evaluation, { x: "tx", y: "ix", tip: true }),
    Plot.dot(evaluation, { x: "px", y: "ix", fill: "red", tip: true })
  ]
})
)}

function _34(Inputs,$0){return(
Inputs.bind(
  Inputs.range([-0.5, 0.5], {
    label: "offset",
    value: 0.001
  }),
  $0
)
)}

function _35(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0, 1.5], { label: "scale", value: 0.5 }),
  $0
)
)}

function _36(Inputs,$0){return(
Inputs.bind(
  Inputs.range([-Math.PI, Math.PI], {
    label: "angle",
    value: 0.3
  }),
  $0
)
)}

function _37(Inputs,$0){return(
Inputs.bind(
  Inputs.range([0.00001, Math.PI], {
    label: "field-of-view (radians)"
  }),
  $0
)
)}

function _38(md){return(
md`## Estimating parameters from three points

If we some known template ordinates and their projected positions in image space, we can estimate the model. In the special case of three parameters, this is a closed form solution. With more than three points we define an error function and find the best fit.`
)}

function _scanToTemplate(fov_pinhole){return(
(
  sx,
  model = {
    angle: 0,
    offset: 0,
    scale: 1
  }
) => {
  let q = 2 * (sx - model.offset - 0.5);
  let angle =
    Math.atan(q * Math.tan(0.5 * fov_pinhole)) - model.offset * fov_pinhole;
  const a = model.angle;
  const b =
    -Math.sin(angle) /
    (2 *
      model.scale *
      fov_pinhole *
      (Math.sin(a) * Math.sin(angle) + Math.cos(a) * Math.cos(angle)));

  return b + 0.5;
}
)}

function _data(features,scanToTemplate,offset_pinhole,scale_pinhole,angle_pinhole,scanToTemplateTf,tf,tf_offset,tf_scale,tf_angle){return(
Promise.all(
  features.map(async (d) => ({
    ix: d.ix,
    tx: d.tx,
    fwd: scanToTemplate(d.ix, {
      offset: offset_pinhole,
      scale: scale_pinhole,
      angle: angle_pinhole
    }),
    /*
    fwd_py: scanToTemplatePy(d.ix, {
      offset: offset_pinhole,
      scale: scale_pinhole,
      angle: angle_pinhole,
      fov: fov_pinhole
    }),
    fwd_py_flat: scanToTemplateFlat(
      d.ix,
      offset_pinhole,
      scale_pinhole,
      angle_pinhole,
      fov_pinhole
    ),
    fit: scanToTemplateFlat(
      d.ix,
      best_fit[0],
      best_fit[1],
      best_fit[2],
      fov_pinhole
    ),*/
    fit_tf: (
      await scanToTemplateTf(tf.tensor1d([d.ix]), {
        offset: tf_offset,
        scale: tf_scale,
        angle: tf_angle
      }).data()
    )[0]
  }))
)
)}

function _41(__query,data,invalidation){return(
__query(data,{from:{table:"data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"data")
)}

function _42(md){return(
md`## Switch to Python`
)}

function _scanToTemplatePy(py){return(
py`
import math as Math
def scanToTemplate (
  sx,
  model
):
  q = 2 * (sx - model.offset - 0.5)
  angle = Math.atan(q * Math.tan(0.5 * model.fov)) - model.offset * model.fov
  a = model.angle
  b = (-Math.sin(angle) /
    (2 *
      model.scale *
      model.fov *
      (Math.sin(a) * Math.sin(angle) + Math.cos(a) * Math.cos(angle)))
  )

  return b + 0.5;

scanToTemplate
`
)}

function _46(scanToTemplatePy,offset_pinhole,scale_pinhole,angle_pinhole,fov_pinhole){return(
scanToTemplatePy(0.5, {
  offset: offset_pinhole,
  scale: scale_pinhole,
  angle: angle_pinhole,
  fov: fov_pinhole
})
)}

function _47(md){return(
md`## Autograd`
)}

function _scanToTemplateFlat(py){return(
py`
import autograd.numpy as np  # Thinly-wrapped numpy
from autograd import grad    # The only autograd function you may ever need

def scanToTemplate (
  sx,
  offset,
  scale,
  angle,
  fov
):
  q = 2 * (sx - offset - 0.5)
  angle_inner = np.arctan(q * np.tan(0.5 * fov)) - offset * fov
  a = angle
  b = (-np.sin(angle_inner) /
    (2 *
      scale *
      fov *
      (np.sin(a) * np.sin(angle_inner) + np.cos(a) * np.cos(angle_inner)))
  )

  return b + 0.5;
scanToTemplate
`
)}

function _49(scanToTemplateFlat,offset_pinhole,scale_pinhole,angle_pinhole,fov_pinhole){return(
scanToTemplateFlat(
  0.5,
  offset_pinhole,
  scale_pinhole,
  angle_pinhole,
  fov_pinhole
)
)}

function _best_fit_autograd(py,data,offset_pinhole,fov_pinhole,best_fit){return(
py`
import autograd.numpy as np  # Thinly-wrapped numpy
from autograd import grad    # The only autograd function you may ever need

def scanToTemplate (
  sx,
  offset,
  scale,
  angle,
  fov
):
  q = 2 * (sx - offset - 0.5)
  angle_inner = np.arctan(q * np.tan(0.5 * fov)) - offset * fov
  a = angle
  b = (-np.sin(angle_inner) /
    (2 *
      scale *
      fov *
      (np.sin(a) * np.sin(angle_inner) + np.cos(a) * np.cos(angle_inner)))
  )

  return b + 0.5;

inputs = np.array([[${data[0].ix}],
                   [${data[1].ix}],
                   [${data.at(-5).ix}],
                   [${data.at(-1).ix}]])
targets = np.array([
  ${data[0].tx},
  ${data[1].tx},
  ${data.at(-5).tx},
  ${data.at(-1).tx}])


def training_loss(model):
    preds = np.squeeze(scanToTemplate(inputs, ${offset_pinhole}, model[1], model[2], ${fov_pinhole}))
    return np.sum(np.square(preds - targets))

training_gradient_fun = grad(training_loss)

model = np.array(${best_fit})
current_loss = training_loss(model)
print("Initial loss:", current_loss)
for i in range(10000):
    loss = training_loss(model)
    if (loss > current_loss + 0.0001):
      break
    current_loss = loss
    model -= training_gradient_fun(model) * 0.001

model
`
)}

function _best_fit(offset_pinhole){return(
new Float32Array([offset_pinhole, 1, 0])
)}

function _52(best_fit_autograd){return(
best_fit_autograd
)}

function _53(scanToTemplateFlat,data,best_fit,fov_pinhole){return(
scanToTemplateFlat(
  data[0].ix,
  best_fit[0],
  best_fit[1],
  best_fit[2],
  fov_pinhole
)
)}

function _54(Inputs,$0,best_fit_autograd){return(
Inputs.button("update fit", {
  reduce: () => ($0.value = best_fit_autograd)
})
)}

function _55(md){return(
md`## Tensorflow

python kinda works but is slow, maybe tensorflow?`
)}

function _tf(require){return(
require("@tensorflow/tfjs@4.16.0")
)}

function _tf_offset(tf,initial_guess){return(
tf.variable(tf.scalar(initial_guess.offset))
)}

function _tf_scale(tf,initial_guess){return(
tf.variable(tf.scalar(initial_guess.scale))
)}

function _tf_angle(tf,initial_guess){return(
tf.variable(tf.scalar(initial_guess.angle))
)}

function _tf_fov(tf,fov_pinhole){return(
tf.variable(tf.scalar(fov_pinhole))
)}

function _scanToTemplateTf(tf,tf_fov){return(
(sx, model) => {
  // const q = 2 * (sx - model.offset - 0.5);
  const q = tf.scalar(2).mul(sx.sub(model.offset).add(tf.scalar(-0.5)));
  //const angle =
  //  Math.atan(q * Math.tan(0.5 * fov_pinhole)) - model.offset * fov_pinhole;
  const angle = tf
    .atan(q.mul(tf.tan(tf_fov.mul(tf.scalar(0.5)))))
    .sub(model.offset.mul(tf_fov));
  const a = model.angle;
  /*
  const b =
    Math.sin(angle) /
    (-2 *
      model.scale *
      fov_pinhole *
      (Math.sin(a) * Math.sin(angle) + Math.cos(a) * Math.cos(angle)));*/

  const b = tf.sin(angle).div(
    tf
      .scalar(-2)
      .mul(model.scale)
      .mul(tf_fov)
      .mul(
        tf
          .sin(a)
          .mul(tf.sin(angle))
          .add(tf.cos(a).mul(tf.cos(angle)))
      )
  );

  return b.add(tf.scalar(0.5));
}
)}

function _test_x(Inputs){return(
Inputs.range()
)}

function _63(scanToTemplate,test_x,offset_pinhole,scale_pinhole,angle_pinhole){return(
scanToTemplate(test_x, {
  offset: offset_pinhole,
  scale: scale_pinhole,
  angle: angle_pinhole
})
)}

function _64(scanToTemplateTf,tf,test_x,tf_offset,tf_scale,tf_angle)
{
  debugger;
  return scanToTemplateTf(tf.tensor1d([test_x]), {
    offset: tf_offset,
    scale: tf_scale,
    angle: tf_angle
  }).data();
}


function _lossFunction(){return(
(preds, labels) => {
  // Use mean squared error as an example
  return preds.sub(labels).square().mean();
}
)}

function _inputTensor(tf,features){return(
tf.tensor1d(features.map((d) => d.ix))
)}

function _outputTensor(tf,features){return(
tf.tensor1d(features.map((d) => d.tx))
)}

function _training(){return(
[]
)}

function _69(Plot,training){return(
Plot.auto(training, {x: "i", y: "loss"}).plot()
)}

function _70(Inputs,$0,tf,scanToTemplateTf,inputTensor,tf_offset,tf_scale,tf_angle,lossFunction,outputTensor){return(
Inputs.button("optimize_tf", {
  reduce: async () => {
    {
      $0.value = [];
      const optimizer =
        /*tf.train.adam(0.8)*/ /*tf.train.rmsprop(0.1)*/ tf.train.sgd(0.1);
      for (let i = 0; i < 200; i++) {
        let loss = optimizer.minimize(() => {
          // Forward pass
          const preds = scanToTemplateTf(inputTensor, {
            offset: tf_offset,
            scale: tf_scale,
            angle: tf_angle
          });

          // Calculate loss
          return lossFunction(preds, outputTensor);
        }, true);

        $0.value.push({ i, loss: (await loss.data())[0] });
        $0.value = $0.value;
      }
    }
  }
})
)}

async function _71(tf_offset,tf_scale,tf_angle){return(
(await Promise.all([tf_offset.data(), tf_scale.data(), tf_angle.data()])).map(
  (d) => d[0]
)
)}

function _72(md){return(
md`## Better initial guess`
)}

function _offset_range(){return(
[-0.5, 0.5]
)}

function _angle_range(){return(
[-0.5, 0.5]
)}

function _scale_range(){return(
[0.3, 1.5]
)}

function _randomBetween(){return(
function randomBetween(range) {
  const [min, max] = range;
  return Math.random() * (max - min) + min;
}
)}

function _initial_guess(dasds,random_params,scanToTemplateTf,inputTensor,tf,lossFunction,outputTensor)
{
  dasds;
  let best = random_params(),
    lowest_loss = Number.MAX_VALUE;
  for (let i = 0; i < 1000; i++) {
    const guess = random_params();
    const preds = scanToTemplateTf(inputTensor, {
      offset: tf.scalar(guess.offset),
      scale: tf.scalar(guess.scale),
      angle: tf.scalar(guess.angle)
    });
    const loss = lossFunction(preds, outputTensor);
    if (loss < lowest_loss) {
      best = guess;
      lowest_loss = loss;
    }
  }
  return best;
}


function _79(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof offset_pinhole")).define("viewof offset_pinhole", ["Inputs"], _offset_pinhole);
  main.variable(observer("offset_pinhole")).define("offset_pinhole", ["Generators", "viewof offset_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof scale_pinhole")).define("viewof scale_pinhole", ["Inputs"], _scale_pinhole);
  main.variable(observer("scale_pinhole")).define("scale_pinhole", ["Generators", "viewof scale_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof angle_pinhole")).define("viewof angle_pinhole", ["Inputs"], _angle_pinhole);
  main.variable(observer("angle_pinhole")).define("angle_pinhole", ["Generators", "viewof angle_pinhole"], (G, _) => G.input(_));
  main.variable(observer("viewof fov_pinhole")).define("viewof fov_pinhole", ["Inputs"], _fov_pinhole);
  main.variable(observer("fov_pinhole")).define("fov_pinhole", ["Generators", "viewof fov_pinhole"], (G, _) => G.input(_));
  main.variable(observer("pinhole")).define("pinhole", ["fov_pinhole"], _pinhole);
  main.variable(observer("template")).define("template", _template);
  main.variable(observer("templateData")).define("templateData", ["template"], _templateData);
  main.variable(observer("projectedPinholeData")).define("projectedPinholeData", ["width","pinhole","template","offset_pinhole","scale_pinhole","angle_pinhole"], _projectedPinholeData);
  main.variable(observer()).define(["Plot","projectedPinholeData"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("features")).define("features", ["pinhole","template","offset_pinhole","scale_pinhole","angle_pinhole","width"], _features);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Inputs","viewof offset_pinhole"], _14);
  main.variable(observer()).define(["Inputs","viewof scale_pinhole"], _15);
  main.variable(observer()).define(["Inputs","viewof angle_pinhole"], _16);
  main.variable(observer()).define(["Inputs","viewof fov_pinhole"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("grid")).define("grid", ["pinhole","template","offset_pinhole","scale_pinhole","angle_pinhole"], _grid);
  main.variable(observer()).define(["Plot","grid"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("random_params")).define("random_params", ["randomBetween","offset_range","angle_range","scale_range"], _random_params);
  main.variable(observer("training_sample")).define("training_sample", ["pinhole","template","random_params"], _training_sample);
  main.variable(observer("example_training_sample")).define("example_training_sample", ["training_sample"], _example_training_sample);
  main.variable(observer("training_set")).define("training_set", ["training_sample"], _training_set);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("model")).define("model", ["tf"], _model);
  main.variable(observer()).define(["model","tf","training_sample"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("viewof trained")).define("viewof trained", ["Inputs","model","tf","training_set"], _trained);
  main.variable(observer("trained")).define("trained", ["Generators", "viewof trained"], (G, _) => G.input(_));
  main.variable(observer("predicted_params")).define("predicted_params", ["trained","model","tf","grid"], _predicted_params);
  main.variable(observer("evaluation")).define("evaluation", ["grid","pinhole","template","predicted_params"], _evaluation);
  main.variable(observer()).define(["Plot","evaluation"], _33);
  main.variable(observer()).define(["Inputs","viewof offset_pinhole"], _34);
  main.variable(observer()).define(["Inputs","viewof scale_pinhole"], _35);
  main.variable(observer()).define(["Inputs","viewof angle_pinhole"], _36);
  main.variable(observer()).define(["Inputs","viewof fov_pinhole"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("scanToTemplate")).define("scanToTemplate", ["fov_pinhole"], _scanToTemplate);
  main.variable(observer("data")).define("data", ["features","scanToTemplate","offset_pinhole","scale_pinhole","angle_pinhole","scanToTemplateTf","tf","tf_offset","tf_scale","tf_angle"], _data);
  main.variable(observer()).define(["__query","data","invalidation"], _41);
  main.variable(observer()).define(["md"], _42);
  const child1 = runtime.module(define1);
  main.import("py", "_py", child1);
  main.import("pyodide", "_pyodide", child1);
  main.variable(observer("scanToTemplatePy")).define("scanToTemplatePy", ["py"], _scanToTemplatePy);
  main.variable(observer()).define(["scanToTemplatePy","offset_pinhole","scale_pinhole","angle_pinhole","fov_pinhole"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer("scanToTemplateFlat")).define("scanToTemplateFlat", ["py"], _scanToTemplateFlat);
  main.variable(observer()).define(["scanToTemplateFlat","offset_pinhole","scale_pinhole","angle_pinhole","fov_pinhole"], _49);
  main.variable(observer("best_fit_autograd")).define("best_fit_autograd", ["py","data","offset_pinhole","fov_pinhole","best_fit"], _best_fit_autograd);
  main.define("initial best_fit", ["offset_pinhole"], _best_fit);
  main.variable(observer("mutable best_fit")).define("mutable best_fit", ["Mutable", "initial best_fit"], (M, _) => new M(_));
  main.variable(observer("best_fit")).define("best_fit", ["mutable best_fit"], _ => _.generator);
  main.variable(observer()).define(["best_fit_autograd"], _52);
  main.variable(observer()).define(["scanToTemplateFlat","data","best_fit","fov_pinhole"], _53);
  main.variable(observer()).define(["Inputs","mutable best_fit","best_fit_autograd"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("tf")).define("tf", ["require"], _tf);
  main.variable(observer("tf_offset")).define("tf_offset", ["tf","initial_guess"], _tf_offset);
  main.variable(observer("tf_scale")).define("tf_scale", ["tf","initial_guess"], _tf_scale);
  main.variable(observer("tf_angle")).define("tf_angle", ["tf","initial_guess"], _tf_angle);
  main.variable(observer("tf_fov")).define("tf_fov", ["tf","fov_pinhole"], _tf_fov);
  main.variable(observer("scanToTemplateTf")).define("scanToTemplateTf", ["tf","tf_fov"], _scanToTemplateTf);
  main.variable(observer("viewof test_x")).define("viewof test_x", ["Inputs"], _test_x);
  main.variable(observer("test_x")).define("test_x", ["Generators", "viewof test_x"], (G, _) => G.input(_));
  main.variable(observer()).define(["scanToTemplate","test_x","offset_pinhole","scale_pinhole","angle_pinhole"], _63);
  main.variable(observer()).define(["scanToTemplateTf","tf","test_x","tf_offset","tf_scale","tf_angle"], _64);
  main.variable(observer("lossFunction")).define("lossFunction", _lossFunction);
  main.variable(observer("inputTensor")).define("inputTensor", ["tf","features"], _inputTensor);
  main.variable(observer("outputTensor")).define("outputTensor", ["tf","features"], _outputTensor);
  main.define("initial training", _training);
  main.variable(observer("mutable training")).define("mutable training", ["Mutable", "initial training"], (M, _) => new M(_));
  main.variable(observer("training")).define("training", ["mutable training"], _ => _.generator);
  main.variable(observer()).define(["Plot","training"], _69);
  main.variable(observer()).define(["Inputs","mutable training","tf","scanToTemplateTf","inputTensor","tf_offset","tf_scale","tf_angle","lossFunction","outputTensor"], _70);
  main.variable(observer()).define(["tf_offset","tf_scale","tf_angle"], _71);
  main.variable(observer()).define(["md"], _72);
  main.variable(observer("offset_range")).define("offset_range", _offset_range);
  main.variable(observer("angle_range")).define("angle_range", _angle_range);
  main.variable(observer("scale_range")).define("scale_range", _scale_range);
  main.variable(observer("randomBetween")).define("randomBetween", _randomBetween);
  main.variable(observer("initial_guess")).define("initial_guess", ["dasds","random_params","scanToTemplateTf","inputTensor","tf","lossFunction","outputTensor"], _initial_guess);
  const child2 = runtime.module(define2);
  main.import("footer", child2);
  main.variable(observer()).define(["footer"], _79);
  return main;
}
