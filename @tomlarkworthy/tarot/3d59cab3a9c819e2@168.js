// https://observablehq.com/@triptych/tarot-utilities@168
function _1(md){return(
md`# Tarot Utilities`
)}

function _2(md){return(
md`Below are some Tarot based utilities you can use to fetch cards for games, readings, and more! Scroll down to see them all.`
)}

function _3(md){return(
md`*Change log*
  - 19/03/2021 [Tom Larkworthy](/@tomlarkworthy): changed downloading and unzipping a 7MB zip to flattening the images in individual File attachments so consuming applications can download just the cards at hand.`
)}

function _4(md){return(
md`## Random Card`
)}

function _5(htl){return(
htl.html`A random card - with image and interpretation. Reload page to see another card. More features soon! `
)}

function _6(md){return(
md`
Usage:
\`\`\`JAVASCRIPT 
import {rndCard} from "@triptych/tarot-utilities"
\`\`\`
`
)}

async function* _rndCard(html,images,fileAttachments)
{
  let cardHTML = html`<div class="card"></div>`;
  yield cardHTML;
  let rnd = Math.floor(Math.random() * 78);
  let card = images.cards[rnd];
  let cardEl = html`
    <div>${card.name}</div>
    ${await fileAttachments[card.img].image()}
    <div><b>Fortune:</b></div>
    <div>${
      card.fortune_telling[
        Math.floor(Math.random() * card.fortune_telling.length)
      ]
    }</div>
  `;
  cardHTML.appendChild(cardEl);
}


function _8(images){return(
images.cards[0]
)}

function _9(md){return(
md`## Get Card`
)}

function _10(md){return(
md`Get a single or many cards. `
)}

function _11(md){return(
md`
Usage:
\`\`\`JAVASCRIPT 
import {getCards} from "@triptych/tarot-utilities"
\`\`\`
`
)}

function _getCards(images,fileAttachments){return(
async (obj) => {
  // obj = {numCards}
  let numCards = obj.numCards || 1;
  let unUsedNums = Array.from(Array(78).keys());

  let retVal = [];
  for (let i = 0; i < numCards; i++) {
    let rnd = unUsedNums.splice(
      Math.floor(Math.random() * unUsedNums.length),
      1
    );
    let card = images.cards[rnd];
    let cardImg = await fileAttachments[card.img].url();
    let fortune =
      card.fortune_telling[
        Math.floor(Math.random() * card.fortune_telling.length)
      ];
    let name = card.name;
    let number = card.number;

    retVal.push({
      imgURL: cardImg,
      name: name,
      fortune: fortune,
      number: number
    });
  }
  return retVal;
}
)}

function _13(md){return(
md`### Example`
)}

function _reading(getCards){return(
getCards({numCards: 4})
)}

function _15(html,reading){return(
html`
<div>
${reading.map((itm,idx,arr)=>{
  return html`<img src="${itm.imgURL}" style="height: 64px;" title="${itm.name}"/>`
})}
</div>`
)}

function _cardNames()
{
  // 01 to 14
  const suitNumbers = Array.from({ length: 14 }).map((_, i) =>
    i < 9 ? "0" + (i + 1) : String(i + 1)
  );
  const minorArcana = ["c", "p", "s", "w"].reduce((cards, suit) => {
    suitNumbers.forEach((num) => cards.push(suit + num));
    return cards;
  }, []);
  // 00 to 21
  const majorArcana = Array.from({ length: 22 }).map((_, i) =>
    i <= 9 ? "m0" + i : "m" + i
  );

  return majorArcana.concat(minorArcana);
}


function _fileAttachments(FileAttachment){return(
{
  "m00.jpg": FileAttachment("m00.jpg"),
  "m01.jpg": FileAttachment("m01.jpg"),
  "m02.jpg": FileAttachment("m02.jpg"),
  "m03.jpg": FileAttachment("m03.jpg"),
  "m04.jpg": FileAttachment("m04.jpg"),
  "m05.jpg": FileAttachment("m05.jpg"),
  "m06.jpg": FileAttachment("m06.jpg"),
  "m07.jpg": FileAttachment("m07.jpg"),
  "m08.jpg": FileAttachment("m08.jpg"),
  "m09.jpg": FileAttachment("m09.jpg"),
  "m10.jpg": FileAttachment("m10.jpg"),
  "m11.jpg": FileAttachment("m11.jpg"),
  "m12.jpg": FileAttachment("m12.jpg"),
  "m13.jpg": FileAttachment("m13.jpg"),
  "m14.jpg": FileAttachment("m14.jpg"),
  "m15.jpg": FileAttachment("m15.jpg"),
  "m16.jpg": FileAttachment("m16.jpg"),
  "m17.jpg": FileAttachment("m17.jpg"),
  "m18.jpg": FileAttachment("m18.jpg"),
  "m19.jpg": FileAttachment("m19.jpg"),
  "m20.jpg": FileAttachment("m20.jpg"),
  "m21.jpg": FileAttachment("m21.jpg"),
  "c01.jpg": FileAttachment("c01.jpg"),
  "c02.jpg": FileAttachment("c02.jpg"),
  "c03.jpg": FileAttachment("c03.jpg"),
  "c04.jpg": FileAttachment("c04.jpg"),
  "c05.jpg": FileAttachment("c05.jpg"),
  "c06.jpg": FileAttachment("c06.jpg"),
  "c07.jpg": FileAttachment("c07.jpg"),
  "c08.jpg": FileAttachment("c08.jpg"),
  "c09.jpg": FileAttachment("c09.jpg"),
  "c10.jpg": FileAttachment("c10.jpg"),
  "c11.jpg": FileAttachment("c11.jpg"),
  "c12.jpg": FileAttachment("c12.jpg"),
  "c13.jpg": FileAttachment("c13.jpg"),
  "c14.jpg": FileAttachment("c14.jpg"),
  "p01.jpg": FileAttachment("p01.jpg"),
  "p02.jpg": FileAttachment("p02.jpg"),
  "p03.jpg": FileAttachment("p03.jpg"),
  "p04.jpg": FileAttachment("p04.jpg"),
  "p05.jpg": FileAttachment("p05.jpg"),
  "p06.jpg": FileAttachment("p06.jpg"),
  "p07.jpg": FileAttachment("p07.jpg"),
  "p08.jpg": FileAttachment("p08.jpg"),
  "p09.jpg": FileAttachment("p09.jpg"),
  "p10.jpg": FileAttachment("p10.jpg"),
  "p11.jpg": FileAttachment("p11.jpg"),
  "p12.jpg": FileAttachment("p12.jpg"),
  "p13.jpg": FileAttachment("p13.jpg"),
  "p14.jpg": FileAttachment("p14.jpg"),
  "s01.jpg": FileAttachment("s01.jpg"),
  "s02.jpg": FileAttachment("s02.jpg"),
  "s03.jpg": FileAttachment("s03.jpg"),
  "s04.jpg": FileAttachment("s04.jpg"),
  "s05.jpg": FileAttachment("s05.jpg"),
  "s06.jpg": FileAttachment("s06.jpg"),
  "s07.jpg": FileAttachment("s07.jpg"),
  "s08.jpg": FileAttachment("s08.jpg"),
  "s09.jpg": FileAttachment("s09.jpg"),
  "s10.jpg": FileAttachment("s10.jpg"),
  "s11.jpg": FileAttachment("s11.jpg"),
  "s12.jpg": FileAttachment("s12.jpg"),
  "s13.jpg": FileAttachment("s13.jpg"),
  "s14.jpg": FileAttachment("s14.jpg"),
  "w01.jpg": FileAttachment("w01.jpg"),
  "w02.jpg": FileAttachment("w02.jpg"),
  "w03.jpg": FileAttachment("w03.jpg"),
  "w04.jpg": FileAttachment("w04.jpg"),
  "w05.jpg": FileAttachment("w05.jpg"),
  "w06.jpg": FileAttachment("w06.jpg"),
  "w07.jpg": FileAttachment("w07.jpg"),
  "w08.jpg": FileAttachment("w08.jpg"),
  "w09.jpg": FileAttachment("w09.jpg"),
  "w10.jpg": FileAttachment("w10.jpg"),
  "w11.jpg": FileAttachment("w11.jpg"),
  "w12.jpg": FileAttachment("w12.jpg"),
  "w13.jpg": FileAttachment("w13.jpg"),
  "w14.jpg": FileAttachment("w14.jpg")
}
)}

function _18(md){return(
md`----
## Codes and stuff`
)}

function _data(d3){return(
d3.json("https://raw.githubusercontent.com/ekelen/tarot-api/master/static/card_data.json")
)}

function _images(FileAttachment){return(
FileAttachment("tarot-images.json").json()
)}

function _21(md){return(
md`---
## References
 * https://www.kaggle.com/lsind18/tarot-json/code (source for archive.zip)
 * https://observablehq.com/@observablehq/fileattachment-zip
 * https://observablehq.com/@triptych/testing-tarot-embed`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["c11.jpg", {url: new URL("./files/0157daa7f3f307b16565fbcc9c990dd4606c9d4f06d85b8044f0785f68a10f44e6b5486acd8af4b35d5c5cc77f38cb438955ddd4e4a5ba31a5346073b0c9db7e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w14.jpg", {url: new URL("./files/3a892fe11c280d76339a9e9ea91b5482f8b360f59e339cf59645d0a21b925b526d835e528fccaffbec65f3481a73e534a2431efcf788630195804b5c638ecf4e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w13.jpg", {url: new URL("./files/523d1d43e36e7744c4726650147d1908d72700f9937138ba1a5148e302a939e4c04757c60625abc7688a2f8c1670fb9f172ada4aaa2f689d59de5cac88a3ee7c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w12.jpg", {url: new URL("./files/c00ecbd7efbfdde1fca0f8ef6431948d7350d0a0c0df8ac402fcfef114c978fd82e7fa62e0cf2d19a3ad486e0bb3cbb64be465690025db53b62b1ace42aef4c9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w11.jpg", {url: new URL("./files/8d3a6960b442b77ddccca1b387dbc4f5be03126aea431e1431b6aaa87ad86e6da9c1bafa075e3743459119c929de608b3139a17f5d336edec8db43f4fafa89fd.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w10.jpg", {url: new URL("./files/4072599114ab9286238bb3e0f535d0d98e4f6705c56372cc1a00ac5c8ade752eeef4d7592de3fd35974456a81afe7064e4c53fd377bbe9fb6a3ccbc60d9b75e9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w09.jpg", {url: new URL("./files/b7f1943b9276bff146854a765d2fe573c65ed710d13f0261c33c3e003abdbf0fbe238bcadfea3ead7192aa77107d861903cabc50f0f3a5a832210f02ef9732dc.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w08.jpg", {url: new URL("./files/d35d45ced1f323afb8961ea8fef53fd6a63a238603310ed26abc0ba0a79d444b051dd195c03fe37f10ff7a9ab1038ab3cd4fff7b724f815249124fd74a592fb6.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w07.jpg", {url: new URL("./files/8746c6ece228f54c63ebad22d0369df178da84631fec057d7f43432c308d9c79fb4287c17e456dfda9fafc14f0b82702e8d2ab614321a60206e0a80eab28d20c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w06.jpg", {url: new URL("./files/c3837f3c375e5495cd027ed85e01922b932e5329b8a6996511c983c28ad774f5ddcdcff2c4c9971f4cfed5f21d95c2593b8c6e2fa2f4a1bd32ced102c53cafd0.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w05.jpg", {url: new URL("./files/78d58e57ac7a2cba613d0b5882ee1debe53bb4bc4fccf49635d5c45e8cd0ba4ea256972d297c5fc01c11d4f850faa57f6e74febf25613cc721618770a5c9c498.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w04.jpg", {url: new URL("./files/ec9f3f418681d9373febc9478bcfa18d1a9bcf999102addf4dac9b18015b31cc6d3787b312a17d04e2e850288da9eeefb4e135752738791541abf0d26d72a074.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w03.jpg", {url: new URL("./files/91e8800284886c9b3213691cb2fb017dca45c31e334b7e6cc6a45e0a7116074ef2ace03af0d641f92984054b55ac3df9b67acfd43ad3a80ad5e832236a0900c3.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w02.jpg", {url: new URL("./files/2137b33a40cf7be9d130ba618bfddc4908cc54c01c7d28217f2a52d96fb6ad07cb19bbf9eb2619e211998d003b7043bb57e26697af231d6fe0db08130d76a5a0.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["w01.jpg", {url: new URL("./files/4dd03d48476fee6e205d780faa0658813c6fe001012cedea134331afd036e591a9c52c8eccfa1dabd685ca5c8d441bd9a5d96fd6738d757f09b80ddf71421844.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["tarot-images.json", {url: new URL("./files/7e67558733f0c9ff2407332d9acafce4f3bbf2a340f246b6acd85266e7df3d0389d055d852f53485c86e2cd1c1510326660e678487b8163a419b18c71e14836d.json", import.meta.url), mimeType: "application/json", toString}],
    ["s14.jpg", {url: new URL("./files/b36a013fbcb17f9540f3439ad0ce0ced9f971c1c67c0eb0242a30f54b7e0302dd566074adea3e8562c34242ac7e21aa7f9dda293babfd27b70b3fd174a448258.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s13.jpg", {url: new URL("./files/ae08ea74a063d52cb18f8c29c0b6f0787cea548d164a34d2298afd5a8f87dbcac145162c666ffe0ece9427e12f5c2fbdb18768819038d6dc3862f3262f61ee98.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s12.jpg", {url: new URL("./files/9194de29b58acc445105a04f0cf1a7f386fb80dc008272384807e9ef646454748488ec8f272c0b6019245c34d919c3a4bdec68a3dce99069006f1989f12a4e92.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s11.jpg", {url: new URL("./files/fd23911011f96c14e06379a7619b1c7a2c832fd2d9f48460f94bcb0883467d7d265b0ea9d04ce931500589e252773233224f64182c28505e3b11b8e92be846ff.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s10.jpg", {url: new URL("./files/8e72c53cd64be29ba88518ac3230eacee56396a8acb8fd68c7286325803608306f37b31a22d3b7a42521c3f314fdeea392bca28e890b6f054c281dedba2e7374.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s09.jpg", {url: new URL("./files/3427984336facd07f393bf311fc819cd4469c3a1f34a14bd634eec9765f3682b4c6e01229616e2f7b850ba68ba0b18e367a85cdcd497ca628d348cdf0cc837e2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s08.jpg", {url: new URL("./files/18784b4cd1f481eb1f3d25e9d5dbe2a62445b7663d60ef76b800da64fc1a9128303276250ff045f06e4359c3dd46d1bb3fcfbcb13b01c960e8d926e1b937473e.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s07.jpg", {url: new URL("./files/52f34d64f158a21c0652644da480e576ba1755af532353725edc4f8f00e276fe51f1164a3f05f5ec78b66d749b1295134962a7bb2b04725b72bc1dff462c1a15.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s06.jpg", {url: new URL("./files/b507b8ddaca8d8d43df9672c960333503dbdee6e6d21f168738ce184d6c9fd526218c5f5cac07fd1f1f2cc3ed81f3b85bb4a94bcade379cbdd73bf620c445cd9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s05.jpg", {url: new URL("./files/b818d4f9589c983a4a43510af0ef6b1a3b2dc3f69cf794263a996e5d48f69fdd148001ce47ef7cd559668ba17f898b25b3c5abf4289a5c9b24f986e0c5232126.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s04.jpg", {url: new URL("./files/a024b54ad7919619bfbc6309653aea8d2b00b503093779c2823bcef54f5299f13cae10d4f18e63340a7fc724f6be1fbfd67eb409c39c3c6cd8c7e989abfa141b.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s03.jpg", {url: new URL("./files/e81a71c4afb6200080a928ace32c1c6460c7a2171ded3b936b9917130573d1f09f093269944d590b627d53a30beaa9fe6bf0b0c2c58b28566f1545666f7150a4.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s02.jpg", {url: new URL("./files/fc0a370a3e76459c8d5a4c5167925b4042f3a2d3134c0aac1d14abec35241b028469e3241f1dded03cd907ecf0a490c106d3da4b8859df1d8937f2747cf20ac6.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["s01.jpg", {url: new URL("./files/b932b52ac5a6b6e8a7c0ade3c323ef806cd5f69e2bac09e650f4d7e289ac07b1d63550fe57c6840fc7b5e4f42ae4cd56ddb4ba4beb1dad58913e824f863da85c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p14.jpg", {url: new URL("./files/f0446751934ddc3b8f7459361b3896d1cfecca0dc5593f3a856be4d8139c176f0557c1ecb22985edd2a031d3450872ff4c11a3b50a72a04ab07f8854ac1babe2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p13.jpg", {url: new URL("./files/15ace83e24446cd878b4ff616e79b48317a10b557faa92fb4d1019551a67bb78205b7287edc5055b2c0f1a21c11232b27305e0ccd495eb2fe27d2a80bd2a2b1b.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p12.jpg", {url: new URL("./files/14cda546b91e5463faca1c8093a44e75e9a4dd23e72fa003f10d1c17b9e82dde323cf879e9480bcba5f1500a0bb944aa578046791f3d2cfeef45c333418aa2af.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p11.jpg", {url: new URL("./files/eeed5d15411ab575a313392869747a8dc15c01a09850efe2c212b3b845ed559914888ab18ea3f3ece312c29a41b92366749ddc1f2a97ce20d9f2f27b2bd9860f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p10.jpg", {url: new URL("./files/099c1a406182a9e8d3f7afc5c5ddb37c025a7291374154a7a08a795a1b9c5fde1f101219794c4618faaff2c0708c866130a82e1cd3fab15aa57edf726a0f425f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p09.jpg", {url: new URL("./files/e3843a3e708785c61440ce7886b12f89a3646dba257546549cdfecedad6daf4758fe509bae6238c8d5b5b6f6628cd2254d71e4dc05fb0e7a23f7c5d6744a33d0.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p08.jpg", {url: new URL("./files/303da56f2881b619ebb6930f4962ad3c3f981fa5f9e77a2fd1b550ba9d9d3a130509627ba50dbf824fa29d3a170e437f492c42ea4659ea450a2e94be90da25b1.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p07.jpg", {url: new URL("./files/660fdadc3da0af652b02018f33c023dfac65c2f183e937ee7959be1b943d2fb5ac8e33c68df8e7bdfca327069668557cf9d12db463ce8656bce38614dbbb3675.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p06.jpg", {url: new URL("./files/97a01d2465b67532be14caea37ba8b71e8a27e810d280a5f9654095a56c5e2c1adb5bd00af6cbbfa06b921642309327889ad1ca209816993321f09219f4b7064.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p05.jpg", {url: new URL("./files/7095ada1843ee28407548f5bc7b2bd11f44fb849b40f18bca99758fe3f0e43ff9bca33aa155433dfcd8612484caf4a734a9716b0bc21d9038491c4f604e4b128.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p04.jpg", {url: new URL("./files/d1a2ea56116e4d967412605608128061ca944aa911bb6a6f70370fe865e54da3d6cc0b5c17a4e09efc1d385904bf8e3a271f5badd555bcebcee06098f543dbf4.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p03.jpg", {url: new URL("./files/c487aea441ced318fcb15cf88fd108d03bf86584f4a6c4b1cc9b764a42915c72449ec52491d66ddbf89f72e1c98bbe62cce7bcf7a00e36b2a1a928432e9319aa.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p02.jpg", {url: new URL("./files/cf5597f95261d73fb04bbb9a91a71be00cac2f71231383ec9f611196a4d4a86c36a6fd6d69fa403680c382ddf7e33c782077b54e1a690e6fb5f3951eebf217cc.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["p01.jpg", {url: new URL("./files/1f371aab617ee2d2a5790413e6f30b2f58deb7d80818793fb8941f7b5fce3fd4788fa3e546b613b7942d1023772179dd43353ae71c070b5b28f84f0930968782.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m21.jpg", {url: new URL("./files/d49cce30f477214c297b489e459f653d4a6144aa6bfa08802192834d0b744444b1ea61772d95e97937818655e19627ce46a6c71bce2734ce562b3df6ce240a89.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m20.jpg", {url: new URL("./files/19390982c7d8d600187a062472b2b2862fe9846844f23fe4b37f798399380ae377dcd0f611606bd0061d329ed2010da5adf635819ad998d31acac28a5852436c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m19.jpg", {url: new URL("./files/1878304b58d0b56595fc8e90af6c544e8062eb09f3cebd27201fa71b952b65b8ba9da161374fbf3329a54213ea0b12c21963b41c38cb14dfa50bcf35c64cba56.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m18.jpg", {url: new URL("./files/e8e680a7b9e2074b00f49b5f40ea6690be35b4a654ca65cfaf963e0e212816dd2ace55a35e2e2488851611eac08aac3d24c442b873009de659ba42671895bce5.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m17.jpg", {url: new URL("./files/6bcf75105cb7be7640a12b7582f43a72de4c512c8ec075abd532f396838ff0d35791bd336514b1072e70d4f75dfdd4a477d3418cc2a8548b8ed710a8c231c1d2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m16.jpg", {url: new URL("./files/4d8f03704c6eab7b0e2c62e0d1eaa31adf72e0f435533c7e56262fa27d04fe4a099f7fffde03083e5db9b2e1b4851dd1ebbdf54e1d6d47675e8d1d8aa65346f9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m15.jpg", {url: new URL("./files/ffaca2f2fd7b1ef74be547bfe671cda624692daff8ad2d0f4789fd6a8d430c1d0a95744316c02845a544972bec55c0c878d925c4e4c4226140160f88c064b236.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m14.jpg", {url: new URL("./files/bcb7cafbf9653bb1aea6237f8134fd6324d3eb41067820a520d6e4f235aa693d82a0b62ca8c911fbbde8aade71dd928ff389d51b464e06e38eea3bb79060c452.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m13.jpg", {url: new URL("./files/7599e3645dc9f0c0691684258bf5d61d96629af54c856442ba4dbf0385385552dbdf54205f2e13361fb93b2254f11628b139e21ea2f0c8fe0c7c059d75fe0d8a.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m12.jpg", {url: new URL("./files/4e1f4280936f7ea60efa19598b7786e89fedd68099711a24d147f169009bc5e13c816d1b3ce5d662673ff0899b57036d9d21034752dbec5d4e529b1a1eb73592.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m11.jpg", {url: new URL("./files/ce6af9fe4c88ee3c8112c01552dbaa2f4b147fe44c8c520759f2ca3a166e72863bf226db96d2ecc281e82e124b2d9ab3556fbf15321ef505aae6c5ddd7e3dab8.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m10.jpg", {url: new URL("./files/890aad7a9fe5f2cd91df9b2c670faea141d781ce432415e5210b809a3360e45a4f1ab9a016021d1a1af6565380ad1a16256ec110285e47005d740197bd4f8b68.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m09.jpg", {url: new URL("./files/0b63dfaa06dd23ad55ba526dc0b32f2eacbba7e2caa0c8dceaa42c717454d98aad04ecda46c68c287a013a10313606c40f34946295d3d45de3ad11c38b29c1b9.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m08.jpg", {url: new URL("./files/117a72e20a19f973b04859b22d20d2ec225dfa99634ced29a46b3ec1bcb788ab53b9c9d33c975e3c6b11a0fbd801ab72a252f65164109e3b7464f10f24817965.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m07.jpg", {url: new URL("./files/22167e8349b5e8420ff6b180f28a78ee992b441101c5ca6c4154ba84db4d7b37bf45e09408ff7e88a2a9621ca2a410f845b52443e8cfabcd7d46af4b3704b23d.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m06.jpg", {url: new URL("./files/decfa535bad3d245c52097d72bfbc3c6fffc252c204653fd4af919d0259aadfafd4fdc7e97b30c3c89b454f897deae8d3c6dcbd6998b65df7f77efa6c38e8413.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m05.jpg", {url: new URL("./files/6d99309c05563ba353195c2e08dffae0f5119fa5a05a33e476124b336b542f743bb4f80288775489c6ea81cd56bfc293de3da1e9313f98f88cb639148a006729.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m04.jpg", {url: new URL("./files/b3139327f32716f5cf57cd227763088341190f1f426b41b44a6afb31df67119919ae049f028157436aaf600f9feb0540b627ed375374957d3ddb10a75de17d21.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m03.jpg", {url: new URL("./files/5e3f3777c2d658dbd4e76afbe66cdc2c5bfa666e21ff5cc6683196640948743259cffa09332299f5eedf507d40bbd3fd9af1554cd9740f5d5dc3507b91866d0f.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m02.jpg", {url: new URL("./files/672de25988627ec10991f51eb3c7b196edf8f6592bd3b1a538af8cb47c729608e45ac854febe9f949cad4e2024a33ae49ed4919c8678ddea461acc7fda09790c.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m01.jpg", {url: new URL("./files/0af72b340d7df3cd5cddb8f2aec5fcb5fc8c7c52d0218e1e0de32ecba720d2db042071a490d3ebaf2039bc66f2f3c89afae7b634b9f884eeb2f7adb5e1c6f9d5.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["m00.jpg", {url: new URL("./files/16665d6c041592d9d0566291f788a616ae5a5187838afeab6f5fb236dd2cce2defd273913990a16148ecf705c7fd8cfc6703bcf51cb057bbf1b85b892601ded4.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c14.jpg", {url: new URL("./files/07371c6234a8d8af12cc1f3f5d0a50ec3b8095ddda7c9f5fe05ac484ce1b41102ea6b9d1309840c01d1f24fbc6866c78359796ce68d31590cf454285acc464cc.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c13.jpg", {url: new URL("./files/b85957671d68b005473d05dfd9186ae0d5a18fc753b1da3a3d64cea4f526ef43c9cb5359580462f0424f15f1d26ac3a180d941244ac74e5153a8291c3c1ad6c7.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c12.jpg", {url: new URL("./files/dab01a2fe751078f72722b0be34b46162e2dc11fd1e3f6381878f4e81f32a69076b577b275d850cd98692ea65b491497b915b1f5a6b9283d9ab6af04b0ff9440.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c09.jpg", {url: new URL("./files/010b7bd892f068c596eb5b44f58030e2753e6c5d78e014a333f89ce85f93cfe77c3af01344a72b30e55fd0b0007e2b4ee4af7011cc656374424a30853387c873.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c08.jpg", {url: new URL("./files/0ad40a4a40c7b8db4937540add4f0dfc4b8ce1d806c49e1b0fd0d90302c9590fc7cd83cab39c1ba98099f777f4081e3d6c81fc7a57475b718ea8d116dc52c2f3.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c07.jpg", {url: new URL("./files/a81cc71fb9c72291a0b738b838cf239df35e8343df6202cf71b9301fbf05dd50f49575323141d70cd1a4cd0c4185e87fe8254af3c2ea0d716fbad8785a00ca16.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c06.jpg", {url: new URL("./files/41214538a6e0cd7a9b70103f5684800520c519112da2a673668a5af82231a55ed69afe77d6adaa9d7350f17ebf65e984f4fca132995d5c60b3cd6075f3767d96.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c05.jpg", {url: new URL("./files/e1052d5b639c385a1b8c54ec284c6338ca1977a5432f32b90f94339aa43efea09e4a27cf8ac595da2446e7311302a59cbe3c36782f53fa8e017129bd71cfd047.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c04.jpg", {url: new URL("./files/16194fcfa350eaecf291f11238eac18206068ddd821aafa984d1de5b026b62ed32157cc88aa177f7ba2024afccd262835929b4fffa794b4c08a4a8d0224393c2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c03.jpg", {url: new URL("./files/3e2cd5395ec751c7e9c96677d38a3c8d2643503739613b45a719462fce1c346c2b03fea9a240804d9615eede7471c00043b4cd29d0bcbcbcf76a95d99828e4e2.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c02.jpg", {url: new URL("./files/7aa055d710b0b67c2713f8d793fb6ef480aab6b09b29f6e5ed44bd5d8bb2f153d419dba38da4341af85259f7ce78c8e6ff2bb512c87129fb234c2792a73a7030.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c01.jpg", {url: new URL("./files/b712c4e7e43ee346e2cb739495a927af210acdaa63ab61b8709f09419774dda6b3639120b2424c82649e505b02f3362669df19c31b7dbe53526751bafd576204.jpeg", import.meta.url), mimeType: "image/jpeg", toString}],
    ["c10.jpg", {url: new URL("./files/05fa625cfde0efdfc0afd48f27e69ab1580a8a90fbf36014feaebcfa7669ab173fd8f10286d56fafd3495a83c3df98642f3af2fa69daa6e1a0860d0adb483d19.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("rndCard")).define("rndCard", ["html","images","fileAttachments"], _rndCard);
  main.variable(observer()).define(["images"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("getCards")).define("getCards", ["images","fileAttachments"], _getCards);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("reading")).define("reading", ["getCards"], _reading);
  main.variable(observer()).define(["html","reading"], _15);
  main.variable(observer("cardNames")).define("cardNames", _cardNames);
  main.variable(observer("fileAttachments")).define("fileAttachments", ["FileAttachment"], _fileAttachments);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("data")).define("data", ["d3"], _data);
  main.variable(observer("images")).define("images", ["FileAttachment"], _images);
  main.variable(observer()).define(["md"], _21);
  return main;
}
