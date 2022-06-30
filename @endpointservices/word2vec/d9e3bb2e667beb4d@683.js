// https://observablehq.com/@endpointservices/word2vec@683
import define1 from "./6eda90668ae03044@830.js";
import define2 from "./777fe85658e39c55@470.js";
import define3 from "./b8a500058f806a6b@11.js";
import define4 from "./293899bef371e135@271.js";

function _1(md){return(
md`# word2vec`
)}

function _2(html,sampleVectors,sample,Plot){return(
html`${sampleVectors.slice(10).map((vector, sample_i) => html`<div style="position: relative;">
  <div style="position: absolute; color: white; -webkit-text-stroke: 1px black; font: bold 20px/33px var(--sans-serif); padding: 0 38px;">${sample[sample_i]}</div>${Plot.plot({
  height: 38,
  color: {
    color: 'linear',
    type: "diverging",
  },
  x: {
    round: true,
    padding: 0,
    axis: null
  },
  marks: [
    Plot.cellX({length: 300}, {x: (d, i) => i, fill: (d, i) => (sampleVectors[sample_i]|| [])[i]})
  ]
})}`)}`
)}

function _3(md){return(
md` 
Access Google's seminal 2013 work - [word2vec](https://en.wikipedia.org/wiki/Word2vec) [Mikolov *et al.*]. While language understanding has moved on, it still remains an extremely convenient way of handling and understanding words programatically. I recommend Jay Alammar's [Illustrated word2vec](https://jalammar.github.io/illustrated-word2vec/) for a good introduction (but note: it does push a common misunderstanding that each dimension is an independent feature [[1](https://news.ycombinator.com/item?id=19498863)]). And so one day I found myself wanting a way of converting words to vectors for analysis but to my surprise there are not really any free full-bodied word2vec API services for this.

Dennis Heihoff has a nice word2vec notebook [on Observable](/@den1k/word2vec), but loads a small word2vec dataset into memory, and so its only got 10k words. 😢  

So I wrote this notebook as I wanted access to the full pre-trained 3Gb word2vec model (trained on 100 billion words of Google News) [[1](https://code.google.com/archive/p/word2vec/)]. So now you can access ALL 3 MILLION WORDS, each a 300 element vector, remotely. 🤘

However, because you can't load all the data into memory there is no way to do nearest word queries etc. (note: maybe we can figure out a way if its important, talk to me). We can at least iterate from a starting cursor.

Even so, this is still very useful for clustering documents or for generating features for a downstream classifier. This makes working with words that little bit easier and it works both inside and outside of [Observablehq](https://observablehq.com/), it is MIT licensed and all steps to replicate are in this notebook. I hope it helps.

### Read more

- *[Illustrated word2vec](https://jalammar.github.io/illustrated-word2vec/)* - Jay Alammar
- *[Word Embedding Analogies: Understanding King - Man + Woman = Queen](https://kawine.github.io/blog/nlp/2019/06/21/word-analogies.html)* - Kawin Ethayarajh
- *[Understanding Word Vectors](https://observablehq.com/@dhowe/understanding-word-vectors)* - Allison Parrish / Daniel Howe

### Other APIs

- You can get access to distilBERT API for whole sentance feature extraction at https://huggingface.co/julien-c/distilbert-feature-extraction. 

### Using in a notebook

~~~js
import {word2vec, query} from '@endpointservices/word2vec'
~~~

You call *word2vec* with a single word argument, or, because it involves a network trip, you can also call it with an array of words and massively save on overheads.

### The backend is *this* notebook.

The service backend (implemented as a [serverless cell](/@endpointservices/serverless-cells)) and the API is all in this notebook.

### Using anywhere

This is a public internet service so you can also use any http client such as *curl*.

~~~sh
curl 'https://webcode.run/observablehq.com/@endpointservices/word2vec?words=Servando_Gomez,hysteroscopic_procedures' 

curl 'https://webcode.run/observablehq.com/@endpointservices/word2vec?from=Servando_Gomez' 

~~~
`
)}

function _4(md){return(
md`## Examples

The following examples are only run when requested`
)}

function _runSamples(Inputs)
{
  let resolve = null;
  const ui = Inputs.button("run examples", {
    reduce: () => resolve()
  });
  ui.value = new Promise(_resolve => (resolve = _resolve));
  return ui;
}


function _6(runSamples,word2vec){return(
runSamples, word2vec('babalik')
)}

function _7(word2vec){return(
word2vec('babalik')
)}

function _8(runSamples,word2vec){return(
runSamples, word2vec(['queen', 'king', 'woman', 'man', 'boy', 'girl'])
)}

function _9(md){return(
md`Google News dataset joins common phrases together with an _, and it contains a lot of names`
)}

function _10(runSamples,word2vec){return(
runSamples, word2vec(["Servando_Gomez", "hysteroscopic_procedures"])
)}

function _11(md){return(
md`### Tokenizing a paragraph

As you can see the full dataset has excellent coverage of phrases taken from the wild. This example text was taken from the welcome post in the Observable [forum](https://talk.observablehq.com/t/welcome-to-the-observable-forum/8).
`
)}

function _source(){return(
"This is a place for everyone to meet, discuss and share their work, and help one another. You will find answers to common questions, examples of techniques, and general discussion about data science, visualization, programming, and more."
  .split(/[\s,.]+/)
  .filter(word => word.length > 0)
)}

function _sourceVectors(runSamples,word2vec,source){return(
runSamples, word2vec(source)
)}

function _14(html,source,Plot,width,sourceVectors){return(
html`${source.map((vector, sample_i) => html`<div style="position: absolute; color: white; -webkit-text-stroke: 1px black; font: bold 20px/33px var(--sans-serif); padding: 0 38px;">${source[sample_i]}</div>${Plot.plot({
  height: 33,
  width: width,
  color: {
    color: 'linear',
    type: "diverging",
  },
  x: {
    round: true,
    padding: 0,
    axis: null
  },
  marks: [
    Plot.cellX({length: 300}, {x: (d, i) => i, fill: (d, i) => (sourceVectors[sample_i]|| [])[i]})
  ]
})}`)}`
)}

function _15(md){return(
md`### Range query `
)}

function _16(md){return(
md`To help orientate inside the dataset you can do a prefix query which returns the next 1000 word2vec matches lexicographically. As you will see the underlying data is fairly messy`
)}

async function _sample(query){return(
await query({
  from: "lea"
})
)}

function _sampleVectors(word2vec,sample){return(
word2vec(sample.slice(0, 20))
)}

function _19(md){return(
md`Plot is a great tool for visualizing the raw vectors. Note "leach metro philadelphia" jumps out, which I think is because it is referring to "Daylin Leach" a public figure from Philadelphia. `
)}

function _20(Plot){return(
Plot
)}

function _plot(html,sampleVectors,sample,Plot,width){return(
html`${sampleVectors.map(
  (vector, sample_i) => html`<div style="position: relative;">
  <div style="position: absolute; color: white; -webkit-text-stroke: 1px black; font: bold 20px/33px var(--sans-serif); padding: 0 38px;">${
    sample[sample_i]
  }</div>${Plot.plot({
    height: 33,
    width: width,
    color: {
      color: 'linear',
      type: "diverging"
    },
    x: {
      round: true,
      padding: 0,
      axis: null
    },
    marks: [
      Plot.cellX(
        { length: 300 },
        { x: (d, i) => i, fill: (d, i) => (sampleVectors[sample_i] || [])[i] }
      )
    ]
  })}`
)}`
)}

function _22(md){return(
md`### word2vec client`
)}

function _word2vec(service){return(
async (wordOrWords) => {
  const CACHE_BUSTER = "4"
  if (typeof wordOrWords === 'string') {
    const word = wordOrWords;
    const response = await fetch(`${service.href}?v=${CACHE_BUSTER}&word=${encodeURIComponent(word)}`)
    if (response.status === 404) return undefined;
    if (response.status !== 200) throw new Error(`Status ${response.status} ${await response.text()}`)
    return await response.json();
  } else if (Array.isArray(wordOrWords)) {
    const words = wordOrWords;
    const encodedWords = words.map(word => encodeURIComponent(word));
    const response = await fetch(`${service.href}?v=${CACHE_BUSTER}&words=${encodedWords.join(",")}`)
    return await response.json();
  } else {
    throw new Error(`Unrecognised type: ${typeof wordOrWords}`)
  }
}
)}

function _query(service){return(
async ({from} = {}) => {
  const response = await fetch(`${service.href}?v=3&from=${encodeURIComponent(from)}`)
  if (response.status !== 200) throw new Error(`Status ${response.status} ${await response.text()}`)
  return (await response.json()).map(_ => decodeURIComponent(_));
}
)}

function _25(md){return(
md`### Service Implementation`
)}

function _CACHE_SECONDS(){return(
60 * 60
)}

function _service(deploy,createGapi,CACHE_SECONDS,promiseRecursive){return(
deploy("default", async (req, res, ctx) => {
  const VEC_LENGTH = 300;
  const PREFIX = 'datasets/GoogleNews-vectors-negative300/';
  const gapi = await createGapi({
    apiKey: "AIzaSyC4q-5jTXGPmPg7-S49QxdFgWHSleGF4xw",
    discoveryDocs: [
      "https://storage.googleapis.com/$discovery/rest?version=v1"
    ],
    service_account_key: JSON.parse(
      ctx.secrets["endpointservices_secretadmin_service_account_key"]
    )
  });

  const word2json = async word => {
    let response = null;
    try {
      response = await gapi.storage.objects.get({
        project: 'endpointservice',
        bucket: 'word2vec_data',
        object: `${PREFIX}${encodeURIComponent(word)}`,
        alt: "media"
      });
    } catch (err) {
      if (err.status === 404) return undefined;
      else throw err;
    }

    const uintArray = new Uint8Array(response.body.length).map((_, i) =>
      response.body.charCodeAt(i)
    );
    const dv = new DataView(uintArray.buffer);
    return new Array(VEC_LENGTH)
      .fill(0)
      .map((_, i) => dv.getFloat32(i * 4, /*little edian*/ true));
  };

  if (req.query.word) {
    const vec = await word2json(req.query.word);
    res.header('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
    if (vec) res.json(vec);
    else res.status(404).send("Not found");
  } else if (req.query.words) {
    const words = req.query.words.split(",");
    const results = await promiseRecursive(words.map(word => word2json(word)));
    res.header('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
    res.json(results);
  } else if (req.query.from) {
    const response = await gapi.storage.objects.list({
      project: 'endpointservice',
      bucket: 'word2vec_data',
      prefix: PREFIX,
      fields: 'items/name',
      startOffset: `${PREFIX}${encodeURIComponent(req.query.from)}`
    });

    if (response.status !== 200)
      return res.status(response.status).send(response.body);
    res.header('Cache-Control', `public, max-age=${CACHE_SECONDS}`);
    res.json(
      JSON.parse(response.body).items.map(item =>
        item.name.substring(PREFIX.length)
      )
    );
  } else {
    return res.status(400).send("No word(s) specified");
  }
})
)}

function _28(md){return(
md`### Service Preparation

These are the steps used to setup this service. Basically,the word2vec model is unpacked and upload to Cloud Storage on word at a time. We give each word vector its own file named after the word, with a space efficient binary encoding for the vector. The result is that we are able to query Cloud storage by key, which is cheaper than using a database. Very little code but it took 24 hours to synchronize 3.7m files totaling 3 GiB.

The access to cloud storage is mediated through a [serverless cell](/@endpointservices/serverless-cells) which is provided a service account as a [secret](/@endpointservices/secrets). While at this time I have not put any protections against abuse, by having notebook code on the serving path I could add some controls later if needed.

`
)}

function _29(md){return(
md`
#### Python program to extract pretrained model into a files

~~~py
import gensim
import urllib.parse

FILENAME = 'GoogleNews-vectors-negative300.bin'
OUTPUTDIR = 'GoogleNews-vectors-negative300'
model = gensim.models.word2vec.KeyedVectors.load_word2vec_format(FILENAME, binary=True)
normed = model.get_normed_vectors()

for i in range(len(normed)): 
    name = urllib.parse.quote(model.index_to_key[i], safe='')
    try:
        with open(OUTPUTDIR + "/" + name, "wb") as f:
            d = normed[i, :].tobytes(order='C')
            f.write(bytearray(d))
    except (FileNotFoundError, NotADirectoryError, OSError) as err:
        print(err)
~~~

`
)}

function _30(md){return(
md`### Bash command to upload extracted dataset to GCS

While it is only one line it actually took >48 hours to complete, but it did survive several transient internet outages. Good work \`gsutil\`!

~~~sh
gsutil -m cp -r GoogleNews-vectors-negative300 gs://word2vec_data/datasets/GoogleNews-vectors-negative300
~~~
`
)}

function _31(md){return(
md`#### Verification

We fetch some example vectors just to test we have our Endianness right.
~~~py
import gensim

model = gensim.models.word2vec.KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
normed = model.get_normed_vectors()

normed[model.key_to_index['babalik'], :]
array([-7.36967176e-02,  1.00994930e-02,  7.97817707e-02,  5.40893339e-02,
        3.48200090e-02,  5.47654517e-02,  4.90184575e-02,  2.48472877e-02,
       -1.48745673e-02,  3.31297182e-02, -1.14939837e-02,  1.90157816e-02,
       -6.65974915e-02,  9.46563333e-02, -3.19465138e-02,  9.66846868e-02,
        7.94437081e-02,  3.78625356e-02, -6.79497272e-02,  1.87622383e-02,
       -4.00599129e-02, -5.81460334e-02,  1.00065269e-01,  3.93837951e-02,
       -2.92420462e-02, -1.04798086e-01,  7.09922537e-02,  9.50789108e-05,
       -6.89639002e-02, -7.97817707e-02, -2.08117161e-03,  2.82278713e-02,
        1.04798086e-01, -4.17502038e-02, -5.54415658e-02, -1.17644303e-01,
        2.56924331e-02,  4.66520488e-02,  1.09023815e-02, -8.92473981e-02,
       -1.49590811e-02, -3.16084549e-02,  7.94437081e-02,  1.01840077e-02,
       -4.52998169e-02,  3.80315632e-03, -5.64557426e-02, -4.96945754e-02,
       -8.19791481e-03,  9.12757516e-02, -5.54415658e-02,  6.62594363e-02,
        4.46236990e-02,  8.85712877e-02, -6.72736093e-02,  4.32714671e-02,
       -1.10883132e-01, -4.86804023e-02,  8.04578811e-02, -4.90184575e-02,
       -7.30205998e-02,  1.42829651e-02, -1.23391291e-02,  9.05996338e-02,
        8.45145807e-02, -6.08505011e-02,  1.19165564e-02, -6.62594363e-02,
        7.74153620e-02,  3.58341821e-02,  4.59759347e-02,  2.26499084e-02,
        1.03530362e-02,  7.87675902e-02, -6.18646741e-02, -1.20348766e-01,
       -3.07633094e-02, -1.11559249e-01,  6.86258450e-02,  4.63139936e-02,
       -1.52126253e-02,  4.69901077e-02, -3.11013665e-02, -6.49072006e-02,
        1.15784984e-02,  4.73281667e-02,  3.58341821e-02,  1.12911485e-01,
        5.57796247e-02,  4.26798640e-03, -2.43402012e-02, -2.46782582e-02,
       -2.08751019e-02, -8.83177388e-03,  1.17475269e-02, -5.54415658e-02,
        4.36095260e-02,  3.26226279e-02,  8.01198259e-02, -8.38384703e-02,
       -6.01743832e-02,  5.78079745e-02,  4.94410330e-03,  3.61299841e-03,
       -1.68184023e-02,  6.65974915e-02, -3.04252505e-02,  5.84840924e-02,
        3.09323370e-02,  9.87130329e-02, -4.90184575e-02, -1.39280036e-01,
        1.24405466e-01, -3.71864177e-02, -7.20064268e-02,  9.73608047e-02,
       -1.08854786e-01, -1.24405466e-01,  1.40294209e-02, -4.31024395e-02,
        5.20609841e-02,  2.01989859e-02, -1.21024884e-01,  2.45092288e-02,
        6.38930276e-02, -1.58887412e-02, -6.38930276e-02,  6.15266189e-02,
        1.39449062e-02,  5.67938015e-02, -6.08505011e-02,  3.66793312e-02,
        5.67938015e-02, -5.88221513e-02, -8.65429342e-02, -1.84875657e-03,
        3.44819501e-02, -1.92693248e-02,  9.46563333e-02,  2.24808790e-02,
        8.45145842e-04, -7.13303089e-02,  1.09868962e-02, -5.07087521e-02,
       -2.46782582e-02, -9.50789108e-05, -8.72190520e-02,  8.58668163e-02,
        2.89039873e-02, -1.06150314e-01,  9.26279873e-02, -3.41438912e-02,
        1.99454427e-02, -1.67338885e-02,  1.96918976e-02, -9.66846868e-02,
        3.08478228e-03,  4.29334082e-02,  2.21428219e-02, -1.06150314e-01,
        2.11286452e-02,  1.99454427e-02, -4.43701586e-03,  4.02289405e-02,
       -5.40893339e-02, -6.25407919e-02,  6.05124421e-02,  1.58887412e-02,
        1.89312678e-02,  8.55287611e-02, -2.14667041e-02,  2.48472877e-02,
        4.64830222e-03, -7.90211372e-03, -9.39802155e-02,  7.33586624e-02,
        1.12911485e-01, -2.35584402e-03,  3.02562211e-02, -6.93019554e-02,
       -5.57796247e-02,  2.70446669e-02,  4.63139936e-02, -2.58614626e-02,
       -6.33859402e-03,  5.78924920e-03, -2.90730167e-02, -1.02093615e-01,
        2.85659302e-02,  5.27371019e-02, -6.05124421e-02,  1.96073838e-02,
       -3.61722410e-02,  7.30205998e-02,  1.48745671e-01,  5.44273928e-02,
       -5.07087521e-02,  3.19465138e-02, -2.13821903e-02, -1.13249542e-02,
       -1.89312678e-02,  6.62594363e-02, -2.16357335e-02, -6.59213737e-02,
        4.63139936e-02, -1.85255975e-01,  2.02834997e-02,  1.49881336e-04,
       -4.73281667e-02,  3.66793312e-02, -2.12976746e-02,  4.12008585e-03,
       -7.36967176e-02,  2.51853466e-02,  3.04252505e-02,  6.18646741e-02,
       -6.35549650e-02,  1.07756099e-02,  2.07060738e-03, -1.20010711e-02,
       -6.15266189e-02,  1.97764132e-02, -2.18047630e-02, -1.85086932e-02,
        3.51580679e-02, -1.16630122e-02,  4.93565165e-02,  2.83969007e-02,
        3.16929701e-03, -1.78325772e-02,  1.53816547e-02,  3.95528264e-02,
       -1.08854786e-01,  9.08531807e-03,  5.84840924e-02,  2.91575305e-03,
       -3.05942800e-02,  9.87130329e-02,  7.74153620e-02,  9.05996338e-02,
       -1.44731230e-03, -1.00361067e-03,  3.07633094e-02,  1.15784984e-02,
       -4.63139936e-02, -6.69355541e-02, -5.67938015e-02,  1.07502550e-01,
       -4.86804023e-02, -6.42310828e-02, -1.56351980e-02, -3.90457362e-02,
        5.47654517e-02, -5.78924920e-03, -1.49590811e-02, -3.34677771e-02,
        3.46509777e-02, -5.91602102e-02, -4.96945754e-02, -3.44819501e-02,
        4.39475849e-02,  1.81706361e-02,  4.80042845e-02, -2.68756375e-02,
        4.50040167e-03,  1.17475269e-02,  5.23990439e-03, -1.02769732e-01,
       -5.67938015e-02, -1.86777227e-02, -7.06541911e-02, -1.45365084e-02,
       -1.74945183e-02,  6.89639002e-02,  9.26279873e-02,  4.03979719e-02,
       -1.10207021e-01,  8.65429342e-02, -1.08854786e-01,  1.58887412e-02,
       -9.60085690e-02, -2.46782582e-02, -6.69355541e-02, -2.40021423e-02,
        4.05669995e-02, -1.20010711e-02,  6.79497272e-02,  2.46782582e-02,
       -6.76116645e-02,  5.34132160e-02,  9.29660443e-03,  9.12757497e-03,
       -5.47654517e-02, -8.45145842e-04, -6.82877824e-02, -1.30997607e-02,
       -1.20348766e-01, -1.49590811e-02,  7.16683641e-02,  2.92420462e-02],
      dtype=float32)

normed[model.key_to_index['babysat'], :]
array([-0.09727119, -0.00750795, -0.01176025,  0.0988658 , -0.02498222,
        0.05979786,  0.00797305, -0.03747333,  0.00162783,  0.0075744 ,
        0.07282051, -0.09673966,  0.04013101,  0.03747333,  0.03454988,
        0.00674387, -0.00717574,  0.08664046,  0.01116227, -0.02338761,
        0.07175744,  0.02790567,  0.0829197 , -0.00362109,  0.01362062,
       -0.03308815, -0.04199139, -0.00621233, -0.05262212, -0.00538181,
        0.00428551, -0.0494329 , -0.02006551,  0.05581134, -0.02352049,
       -0.11853265,  0.04996444, -0.09461351, -0.05129328,  0.02644394,
        0.01428504,  0.00800627,  0.07973048, -0.07654127,  0.0544825 ,
       -0.0088368 , -0.0712259 , -0.03827063,  0.00700964, -0.02232454,
       -0.00425229, -0.05953209, -0.03667602,  0.00390347, -0.00574724,
       -0.02950028, -0.00754118,  0.06006363, -0.02139435,  0.00508282,
        0.0393337 ,  0.18497473, -0.0301647 , -0.01793936,  0.01056429,
       -0.00139528, -0.04571214, -0.01136159,  0.00053984, -0.0318922 ,
        0.07654127,  0.01913532, -0.05474827,  0.05262212,  0.02285607,
        0.04650945,  0.03481564,  0.0243178 ,  0.02976605,  0.0121589 ,
       -0.06909975,  0.0385364 , -0.07069436,  0.09939734, -0.0268426 ,
       -0.0494329 ,  0.0887666 ,  0.06723937,  0.01328841, -0.03401834,
       -0.02710836, -0.01900243, -0.02538087, -0.06484746, -0.00817237,
       -0.09036122,  0.02617818, -0.00903612,  0.0159461 ,  0.00254141,
        0.0326895 , -0.0770728 , -0.03827063,  0.01381995,  0.02471645,
       -0.06112671, -0.02617818,  0.0887666 , -0.01063073,  0.05926633,
        0.06511323,  0.08345124, -0.04172562, -0.08026202, -0.00217598,
       -0.09939734,  0.05129328, -0.02657683,  0.07441512, -0.01700917,
        0.00770728,  0.03694179,  0.05953209,  0.03880217, -0.03069624,
       -0.01740782,  0.02046416,  0.00461772,  0.0443833 ,  0.00046302,
       -0.08451431, -0.03096201,  0.01581321,  0.07654127, -0.07973048,
        0.08451431, -0.001578  , -0.03149354, -0.00224242,  0.05368519,
        0.05926633,  0.03827063,  0.00627878, -0.09248737, -0.02219165,
        0.09673966, -0.0494329 , -0.00275735,  0.07547819, -0.04544638,
        0.10630731,  0.05155905, -0.00910256,  0.10099195, -0.02670971,
        0.08770353, -0.08664046, -0.02126146,  0.03162643, -0.06644207,
        0.00857103,  0.09142429,  0.04836983,  0.11002807,  0.05554557,
        0.00817237,  0.02006551, -0.00624555,  0.06909975,  0.02152723,
       -0.02896874,  0.04225716,  0.0770728 ,  0.02950028, -0.08238817,
        0.01694273,  0.04252293,  0.0019019 , -0.02976605,  0.13926257,
        0.03561295,  0.03534718,  0.01136159,  0.02033127,  0.07228898,
       -0.0770728 ,  0.07069436, -0.01302265, -0.05873479,  0.03308815,
       -0.02312184, -0.02338761,  0.02445068, -0.01009919,  0.12437955,
        0.11215422,  0.02564664, -0.00657777,  0.05395096, -0.03322104,
       -0.03229085,  0.0268426 ,  0.02896874, -0.15308253, -0.03641025,
       -0.08717199, -0.02391914,  0.04491484,  0.03043047, -0.00514926,
        0.05315366,  0.00428551,  0.06537899, -0.01395283,  0.06192401,
       -0.04571214, -0.03069624,  0.01156092, -0.04518061, -0.05953209,
        0.0385364 ,  0.05155905,  0.07282051,  0.00740829,  0.04172562,
       -0.04278869, -0.01043141,  0.04890136, -0.05634287, -0.08664046,
        0.0011129 ,  0.05182482,  0.04385177, -0.06192401,  0.01847089,
        0.00491671,  0.01940108, -0.19135316, -0.05581134,  0.00122087,
       -0.03694179,  0.03308815,  0.02046416, -0.02870297, -0.03003182,
        0.18922701, -0.03242373,  0.00116274, -0.01727494, -0.13394721,
       -0.00793983,  0.04677522,  0.06963129,  0.08238817,  0.01355418,
        0.02219165, -0.10683885, -0.04066255, -0.07069436, -0.10258655,
       -0.03880217, -0.0544825 , -0.00265768, -0.08079356,  0.03242373,
        0.1047127 , -0.01242467,  0.02857009,  0.02524799, -0.00249158,
        0.01302265,  0.10046041,  0.01275688,  0.1541456 ,  0.09195583,
       -0.17221785, -0.04199139,  0.02817144, -0.02272319, -0.13554183,
        0.00578046,  0.01979974,  0.02950028,  0.07016283,  0.03096201,
       -0.15095638,  0.00211784,  0.05687441, -0.01860378,  0.13819951,
       -0.00790661, -0.05581134,  0.0276399 ,  0.05740595, -0.12331648,
       -0.05129328, -0.02657683, -0.04571214,  0.00581368, -0.02777279],
      dtype=float32)
~~~
`
)}

function _36(footer){return(
footer
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","sampleVectors","sample","Plot"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof runSamples")).define("viewof runSamples", ["Inputs"], _runSamples);
  main.variable(observer("runSamples")).define("runSamples", ["Generators", "viewof runSamples"], (G, _) => G.input(_));
  main.variable(observer()).define(["runSamples","word2vec"], _6);
  main.variable(observer()).define(["word2vec"], _7);
  main.variable(observer()).define(["runSamples","word2vec"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["runSamples","word2vec"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("source")).define("source", _source);
  main.variable(observer("sourceVectors")).define("sourceVectors", ["runSamples","word2vec","source"], _sourceVectors);
  main.variable(observer()).define(["html","source","Plot","width","sourceVectors"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("sample")).define("sample", ["query"], _sample);
  main.variable(observer("sampleVectors")).define("sampleVectors", ["word2vec","sample"], _sampleVectors);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["Plot"], _20);
  main.variable(observer("plot")).define("plot", ["html","sampleVectors","sample","Plot","width"], _plot);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("word2vec")).define("word2vec", ["service"], _word2vec);
  main.variable(observer("query")).define("query", ["service"], _query);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("CACHE_SECONDS")).define("CACHE_SECONDS", _CACHE_SECONDS);
  main.variable(observer("service")).define("service", ["deploy","createGapi","CACHE_SECONDS","promiseRecursive"], _service);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  const child1 = runtime.module(define1);
  main.import("deploy", child1);
  const child2 = runtime.module(define2);
  main.import("createGapi", child2);
  const child3 = runtime.module(define3);
  main.import("promiseRecursive", child3);
  const child4 = runtime.module(define4);
  main.import("footer", child4);
  main.variable(observer()).define(["footer"], _36);
  return main;
}
