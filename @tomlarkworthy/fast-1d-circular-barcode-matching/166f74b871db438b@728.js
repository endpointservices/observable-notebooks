import define1 from "./4fe413fb2e36d2a3@3101.js";
import define2 from "./f109935193c0deba@4551.js";

function _1(md){return(
md`# Fast 1D Circular Barcode Matching
## with the Möbius transform


The aim of this notebook is to prototype a way of quickly detecting the center and tilt of a circular barcode passing through a scan line. This will be a building block of a localization algorithm.

Part II of a long quest to create a cheap high speed optical localization system. Part I is [here](https://observablehq.com/@tomlarkworthy/circular-barcode-simulator).`
)}

function _3(md){return(
md`### Final Matched Barcode projection
It works! If the scanline passed through the centre of a circular barcode, this matches the pattern.`
)}

function _4(Plot,width,autoFitProjectedTemplate){return(
Plot.plot({
  width,
  height: 100,
  y: { axis: false },
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(autoFitProjectedTemplate, {
      x: (d) => d.x
    })
  ]
})
)}

function _5($0){return(
$0
)}

function _6(canvas,htl){return(
htl.html`<div style="scale: 0.96">
  ${canvas}
</div>`
)}

function _7(md){return(
md`## Implementation`
)}

function _8(md){return(
md`#### Pixel intensity through scan line`
)}

function _scanLinePlot(Plot,width,scanLineBuffer){return(
Plot.plot({
  width,
  marks: [Plot.tickX(scanLineBuffer, { x: (d, i) => i, stroke: (d) => d })]
})
)}

function _scanLineBuffer(scanline){return(
new Uint8Array(scanline.map((p) => p.v))
)}

function _scanEdges(edges1D,scanLineBuffer){return(
edges1D(scanLineBuffer, 20)
)}

function _12(md){return(
md`#### (manual) Find three known edges`
)}

async function _13(FileAttachment,md){return(
md`In the three charts below, click the leftmost side of the a barcode's circular pattern, the rightmost side and then the right of the middle as the three rings to fit mobius to. The larger point of this notebook is to figure out an efficient way to initialize the algorithm *without* manual initialization, but to get there it is useful to first concentrate on the easier problem of an already initialized fit.

<details>
  <summary>example</summary>
  ![image.png](${await FileAttachment("image.png").url()})
</details>`
)}

function _leftmost(Plot,width,scanEdges){return(
Plot.plot({
  width,
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(scanEdges, { x: (d) => d.x, stroke: (d) => d.s, tip: true }),
    Plot.dot(scanEdges, Plot.pointer({ x: (d) => d.x }))
  ]
})
)}

function _rightmost(Plot,width,scanEdges){return(
Plot.plot({
  width,
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(scanEdges, { x: (d) => d.x, stroke: (d) => d.s, tip: true }),
    Plot.dot(scanEdges, Plot.pointer({ x: (d) => d.x }))
  ]
})
)}

function _middle_right(Plot,width,scanEdges){return(
Plot.plot({
  width,
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(scanEdges, { x: (d) => d.x, stroke: (d) => d.s, tip: true }),
    Plot.dot(scanEdges, Plot.pointer({ x: (d) => d.x }))
  ]
})
)}

function _17(md){return(
md`#### Initial Mobius Fit to 3 anchors`
)}

function _18(md){return(
md`Predicted template positions given pqrs fit to anchors.`
)}

function _19(Plot,width,template_projection){return(
Plot.plot({
  width,
  height: 100,
  y: { axis: false },
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(template_projection, {
      x: (d) => d.x
    })
  ]
})
)}

function _20(md){return(
md`##### Residuals on initial template fit`
)}

function _21(Plot,width,initialAlignment){return(
Plot.plot({
  width,
  height: 100,
  color: {
    domain: [0, 1]
  },
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.ruleX(initialAlignment.pairs, {
      x: (d) => d.xt,
      y: (d) => (d.cost == 20 ? 0 : d.cost),
      stroke: (d) => (d.cost == 20 ? 0 : d.cost)
    })
  ]
})
)}

function _22(md){return(
md`### Least squares Möbius fit to template match`
)}

function _23(Plot,width,mobiusLSFit){return(
Plot.plot({
  width,
  height: 100,
  y: { axis: false },
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.tickX(mobiusLSFit.fittedProjection, {
      x: (d) => d.x
    })
  ]
})
)}

function _24(mobiusLSFit,md){return(
md`##### Residuals on LS template fit: kRMSE ${mobiusLSFit.kRMSE}`
)}

function _25(Plot,width,residualsLS){return(
Plot.plot({
  width,
  height: 100,
  color: {
    domain: [0, 1]
  },
  x: {
    domain: [0, width]
  },
  marks: [
    Plot.ruleX(residualsLS, {
      x: (d) => d.x,
      y: (d) => (d.cost == 20 ? 0 : d.cost),
      stroke: (d) => (d.cost == 20 ? 0 : d.cost)
    })
  ]
})
)}

function _26(md){return(
md`# Code`
)}

function _27(md){return(
md`### fit a Möbius transform to three points`
)}

function _fitMobius(){return(
function fitMobius(pairs) {
  if (pairs.length < 3) throw new Error("need >=3 pairs");
  const a = pairs[0],
    b = pairs[1],
    c = pairs[2];
  // guard degeneracies
  if (a.x === b.x || a.x === c.x || b.x === c.x)
    throw new Error("x must be distinct");
  if (b.k === a.k || b.k === c.k) throw new Error("k must satisfy B≠A and B≠C");

  const A = a.k,
    B = b.k,
    C = c.k;
  const alpha = (B - C) / (B - A);

  // M(z) = CR(z; a.x,b.x,c.x) = ((b-c)z - (b-c)a) / ((b-a)z - (b-a)c)
  const m11 = b.x - c.x;
  const m12 = -a.x * (b.x - c.x);
  const m21 = b.x - a.x;
  const m22 = -c.x * (b.x - a.x);

  // L(w) = (C w - alpha A) / (w - alpha)  maps {0,1,∞} -> {A,B,C}
  const l11 = C,
    l12 = -alpha * A,
    l21 = 1,
    l22 = -alpha;

  // Composition T = L ∘ M  ⇒  [p q; r s] = L · M  (up to scale)
  let p = l11 * m11 + l12 * m21;
  let q = l11 * m12 + l12 * m22;
  let r = l21 * m11 + l22 * m21;
  let s = l21 * m12 + l22 * m22;

  // normalize scale
  if (Math.abs(s) > 1e-12) {
    p /= s;
    q /= s;
    r /= s;
    s = 1;
  } else {
    const norm = Math.hypot(p, q, r, s) || 1;
    p /= norm;
    q /= norm;
    r /= norm;
    s /= norm;
  }
  return { p, q, r, s };
}
)}

function _pqrs(fitMobius,leftmost,middle_right,rightmost){return(
fitMobius([
  { ...leftmost, k: -27 },
  { ...middle_right, k: 5 },
  { ...rightmost, k: 27 }
])
)}

function _30(md){return(
md`### Predict template edges given fit`
)}

function _template_edges(binaryToEdges,template){return(
binaryToEdges(template)
)}

function _xFromK(){return(
function xFromK(pqrs, k) {
  const denom = k * pqrs.r - pqrs.p;
  if (Math.abs(denom) < 1e-12) return NaN; // parallel / undefined
  return (pqrs.q - k * pqrs.s) / denom;
}
)}

function _template_projection(template_edges,xFromK,pqrs){return(
template_edges.map((k) => ({ k, x: xFromK(pqrs, k) }))
)}

function _34(md){return(
md`### Obtain closest matching edges to initial Möbius estimate`
)}

function _dpAlign(){return(
function dpAlign(template, scan, opts = {}) {
  // Needleman-Wunsch style dynamic programming alignment for 1D positions.
  // template: array of numbers or objects with .x and optional .s (polarity)
  // scan:     array of numbers or objects with .x and optional .s (polarity)
  // opts:
  //   gapPenalty (number) default 20
  //   polarityPenalty (number) default 50
  //   matchCost (fn) optional custom cost fn (xt, xs) -> number; defaults to abs difference
  //   matchThreshold (number) if provided, matches with cost > threshold are discouraged (treated normally by DP)
  const {
    gapPenalty = 20,
    polarityPenalty = 50,
    matchCost = (a, b) => Math.abs(a - b),
    matchThreshold = Infinity
  } = opts;

  const N = template.length,
    M = scan.length;
  // helpers to extract x and polarity
  const getX = (v) =>
    typeof v === "number" ? v : v && ("x" in v ? v.x : v.x === 0 ? 0 : v);
  const getS = (v) =>
    typeof v === "number"
      ? v
      : v && "s" in v
      ? v.s
      : v && "sign" in v
      ? v.sign
      : 0;

  // DP matrices: use flat arrays for speed
  const rows = N + 1,
    cols = M + 1;
  const D = new Float64Array(rows * cols); // cost matrix
  const PTR = new Int8Array(rows * cols); // 0 = diag, 1 = up (delete template / gap in scan), 2 = left (insert / gap in template)

  const idx = (i, j) => i * cols + j;

  // initialize
  for (let i = 1; i <= N; i++) {
    D[idx(i, 0)] = i * gapPenalty;
    PTR[idx(i, 0)] = 1; // from up
  }
  for (let j = 1; j <= M; j++) {
    D[idx(0, j)] = j * gapPenalty;
    PTR[idx(0, j)] = 2; // from left
  }

  // fill
  for (let i = 1; i <= N; i++) {
    const xt = getX(template[i - 1]);
    const st = getS(template[i - 1]);
    for (let j = 1; j <= M; j++) {
      const xs = getX(scan[j - 1]);
      const ss = getS(scan[j - 1]);
      let mcost = matchCost(xt, xs);
      // polarity penalty (if either side has a defined sign and they differ)
      if (st && ss && Math.sign(st) !== Math.sign(ss)) mcost += polarityPenalty;
      // match threshold can be used by caller to interpret results (we don't hard forbid >threshold here)
      const diag = D[idx(i - 1, j - 1)] + mcost;
      const up = D[idx(i - 1, j)] + gapPenalty; // skip template[i-1]
      const left = D[idx(i, j - 1)] + gapPenalty; // skip scan[j-1]
      // choose minimum (prefer diag on ties, then up)
      let best = diag,
        ptr = 0;
      if (up < best || (up === best && ptr !== 0 && ptr !== 1)) {
        best = up;
        ptr = 1;
      }
      if (left < best) {
        best = left;
        ptr = 2;
      }
      D[idx(i, j)] = best;
      PTR[idx(i, j)] = ptr;
    }
  }

  // backtrace
  let i = N,
    j = M;
  const pairs = []; // aligned pairs (ti, sj, cost)
  while (i > 0 || j > 0) {
    const p = PTR[idx(i, j)];
    if (p === 0) {
      // diagonal => match template[i-1] with scan[j-1]
      const xt = getX(template[i - 1]),
        xs = getX(scan[j - 1]);
      let c = matchCost(xt, xs);
      const st = getS(template[i - 1]),
        ss = getS(scan[j - 1]);
      if (st && ss && Math.sign(st) !== Math.sign(ss)) c += polarityPenalty;
      pairs.push({ ti: i - 1, sj: j - 1, cost: c, xt, xs, st, ss });
      i--;
      j--;
    } else if (p === 1) {
      // up => gap in scan (template element skipped)
      pairs.push({
        ti: i - 1,
        sj: null,
        cost: gapPenalty,
        xt: getX(template[i - 1]),
        xs: null,
        st: getS(template[i - 1]),
        ss: null
      });
      i--;
    } else {
      // left => gap in template (scan element skipped)
      pairs.push({
        ti: null,
        sj: j - 1,
        cost: gapPenalty,
        xt: null,
        xs: getX(scan[j - 1]),
        st: null,
        ss: getS(scan[j - 1])
      });
      j--;
    }
  }
  pairs.reverse();

  // Build template->scan mapping (one-to-one or null). If multiple matches to same scan occur (shouldn't for NW),
  // prefer the diagonal matches.
  const templateToScan = new Array(N).fill(null);
  const scanToTemplate = new Array(M).fill(null);
  for (const p of pairs) {
    if (p.ti != null && p.sj != null) {
      templateToScan[p.ti] = p.sj;
      scanToTemplate[p.sj] = p.ti;
    }
  }

  return {
    score: D[idx(N, M)],
    pairs,
    templateToScan,
    scanToTemplate,
    // expose DP dimensions so caller can inspect if desired
    N,
    M
  };
}
)}

function _initialAlignment(dpAlign,template_projection,scanEdges){return(
dpAlign(
  template_projection.map((t) => t.x),
  scanEdges.map((s) => s.x)
)
)}

function _37(md){return(
md`### Least squares mobius fit to paired edges`
)}

function _fitMobiusLS(SVD){return(
function fitMobiusLS(pairs) {
  const N = pairs.length;
  if (N < 3) throw new Error("need >=3 points");

  // Build A as N×4 array
  const A = new Array(N);
  for (let i = 0; i < N; i++) {
    const { x, k } = pairs[i];
    A[i] = [x, 1, -k * x, -k];
  }

  // SVD: A = U Σ Vᵀ
  const { v } = SVD(A);

  // v is 4×4; columns are right singular vectors
  // The column corresponding to the smallest singular value is the nullspace vector
  const smallestColIndex = 3; // svd-js returns singular values in descending order
  let p = v[0][smallestColIndex];
  let q = v[1][smallestColIndex];
  let r = v[2][smallestColIndex];
  let s = v[3][smallestColIndex];

  // normalize so s = 1
  if (Math.abs(s) > 1e-12) {
    p /= s;
    q /= s;
    r /= s;
    s = 1;
  }

  return { p, q, r, s };
}
)}

function _mobiusLSFit(initialAlignment,scanEdges,template_projection,fitMobiusLS,xFromK)
{
  const matches = initialAlignment.pairs.filter(
    (p) => p.ti != null && p.sj != null
  );
  const pairs = matches.map((p) => ({
    x: scanEdges[p.sj].x,
    k: template_projection[p.ti].k
  }));
  if (pairs.length < 3) throw new Error("need >=3 matched pairs for mobiusLS");
  const mobiusLS = fitMobiusLS(pairs);
  // compute residuals in k-space (mapped k from x) and attach diagnostics
  const { p, q, r, s } = mobiusLS;
  const kErrs = pairs.map(({ x, k }) => {
    const khat = (p * x + q) / (r * x + s);
    return khat - k;
  });
  const kRMSE = Math.sqrt(kErrs.reduce((a, b) => a + b * b, 0) / kErrs.length);
  const fittedProjection = template_projection.map((t) => ({
    k: t.k,
    x: xFromK(mobiusLS, t.k)
  }));
  mobiusLS.kRMSE = kRMSE;
  mobiusLS.pairsUsed = pairs.length;
  mobiusLS.fittedProjection = fittedProjection;
  return mobiusLS;
}


function _calculatLSResiduals(initialAlignment,template_projection,scanEdges){return(
function calculatLSResiduals(fitted) {
  const N = fitted.length;
  const map = initialAlignment.templateToScan || [];
  const out = new Array(N);
  for (let i = 0; i < N; i++) {
    const tplX = template_projection[i].x;
    const predX = fitted[i] ? fitted[i].x : NaN;
    const sj = map[i];
    if (sj != null) {
      const actualX = scanEdges[sj].x;
      out[i] = {
        x: tplX,
        cost: Math.abs(predX - actualX),
        matched: true,
        predictedX: predX,
        actualX
      };
    } else {
      out[i] = {
        x: tplX,
        cost: 20,
        matched: false,
        predictedX: predX,
        actualX: null
      };
    }
  }
  return out;
}
)}

function _residualsLS(calculatLSResiduals,mobiusLSFit){return(
calculatLSResiduals(mobiusLSFit.fittedProjection)
)}

function _42(md){return(
md`## Auto fit anchors`
)}

function _computeAnchorCandidatesFast(fitMobiusLS){return(
function computeAnchorCandidatesFast(
  template_edges,
  scanEdges,
  opts = {}
) {
  const kSorted = template_edges.slice().sort((a, b) => a - b);
  if (kSorted.length < 4) throw new Error("need >=4 template edges");
  const kMin = kSorted[0],
    kMax = kSorted[kSorted.length - 1],
    kLeftInner = kSorted[1],
    kRightInner = kSorted[kSorted.length - 2];
  const sLen = scanEdges.length;
  if (sLen < 4) return [];
  const innerExpected = kSorted.length - 2;
  const minBetween = Math.max(2, opts.minBetween ?? innerExpected - 1);
  const maxBetween = Math.min(sLen - 2, opts.maxBetween ?? innerExpected + 1);
  const topK = opts.topK ?? 10;
  const scanX = scanEdges.map((e) => (typeof e === "number" ? e : e.x));
  const candidates = [];
  for (let i = 0; i < sLen - 1; i++) {
    const jMin = i + 1 + minBetween;
    const jMax = Math.min(sLen - 1, i + 1 + maxBetween);
    if (jMin >= sLen) continue;
    for (let j = jMin; j <= jMax; j++) {
      if (i + 1 >= j) continue;
      const pairs4 = [
        { x: scanX[i], k: kMin },
        { x: scanX[i + 1], k: kLeftInner },
        { x: scanX[j - 1], k: kRightInner },
        { x: scanX[j], k: kMax }
      ];
      let mob;
      try {
        mob = fitMobiusLS(pairs4);
        if (
          !(
            isFinite(mob.p) &&
            isFinite(mob.q) &&
            isFinite(mob.r) &&
            isFinite(mob.s)
          )
        )
          continue;
      } catch {
        continue;
      }
      const kErrs = new Array(pairs4.length);
      let bad = false;
      for (let t = 0; t < pairs4.length; t++) {
        const x = pairs4[t].x,
          k = pairs4[t].k;
        const den = mob.r * x + mob.s;
        if (Math.abs(den) < 1e-12) {
          bad = true;
          kErrs[t] = Infinity;
        } else {
          const khat = (mob.p * x + mob.q) / den;
          kErrs[t] = khat - k;
        }
      }
      const finiteErrs = kErrs.filter((v) => isFinite(v));
      const kRMSE = finiteErrs.length
        ? Math.sqrt(
            finiteErrs.reduce((a, b) => a + b * b, 0) / finiteErrs.length
          )
        : Infinity;
      candidates.push({
        startIndex: i,
        endIndex: j,
        pairs4,
        mobiusInitial: mob,
        kRMSE
      });
    }
  }
  candidates.sort((a, b) => {
    const ka = a.kRMSE === undefined ? Infinity : a.kRMSE;
    const kb = b.kRMSE === undefined ? Infinity : b.kRMSE;
    return ka - kb;
  });
  return candidates.slice(0, topK);
}
)}

function _anchorCandidatesFast(computeAnchorCandidatesFast,template_edges,scanEdges){return(
computeAnchorCandidatesFast(template_edges, scanEdges, {
  topK: 20
})
)}

function _refineAnchorCandidates(xFromK,dpAlign,fitMobiusLS){return(
function refineAnchorCandidates(
  candidates,
  template_edges,
  scanEdges,
  opts = {}
) {
  const topK = opts.topK ?? candidates.length;
  if (!Array.isArray(candidates) || candidates.length === 0) return [];
  const kSorted = template_edges.slice().sort((a, b) => a - b);
  const scanX = scanEdges.map((e) => (typeof e === "number" ? e : e.x));
  const dpOpts = {
    gapPenalty: opts.gapPenalty ?? 20,
    polarityPenalty: opts.polarityPenalty ?? 0,
    matchCost: (a, b) => Math.abs(a - b),
    matchThreshold: Infinity
  };
  const out = [];
  for (const cand of candidates) {
    const mobInit = cand.mobiusInitial ?? cand.mobius;
    if (!mobInit) continue;
    const proj = kSorted.map((k) => {
      const x = xFromK(mobInit, k);
      return x;
    });
    const alignment = dpAlign(proj, scanX, dpOpts);
    const map = alignment.templateToScan || [];
    const matchedPairs = [];
    for (let t = 0; t < kSorted.length; t++) {
      const sIdx = map[t];
      if (sIdx != null) matchedPairs.push({ x: scanX[sIdx], k: kSorted[t] });
    }
    if (matchedPairs.length < 3) continue;
    let mobRefined;
    try {
      mobRefined = fitMobiusLS(matchedPairs);
    } catch {
      continue;
    }
    const { p, q, r, s } = mobRefined;
    const kErrs = [];
    const xErrs = [];
    for (let t = 0; t < kSorted.length; t++) {
      const sIdx = map[t];
      if (sIdx == null) continue;
      const x = scanX[sIdx];
      const kTrue = kSorted[t];
      const den = r * x + s;
      if (!isFinite(den) || Math.abs(den) < 1e-12) continue;
      const khat = (p * x + q) / den;
      kErrs.push(khat - kTrue);
      const predX = xFromK(mobRefined, kTrue);
      if (isFinite(predX)) xErrs.push(predX - x);
    }
    if (kErrs.length === 0) continue;
    const kRMSE = Math.sqrt(
      kErrs.reduce((a, b) => a + b * b, 0) / kErrs.length
    );
    const xRMSE = xErrs.length
      ? Math.sqrt(xErrs.reduce((a, b) => a + b * b, 0) / xErrs.length)
      : Infinity;
    out.push({
      startIndex: cand.startIndex,
      endIndex: cand.endIndex,
      pairs4: cand.pairs4,
      mobiusInitial: cand.mobiusInitial,
      mobiusRefined: mobRefined,
      kRMSE_full: kRMSE,
      xRMSE_full: xRMSE,
      pairsUsed: matchedPairs.length
    });
  }
  out.sort(
    (a, b) => a.kRMSE_full - b.kRMSE_full || a.xRMSE_full - b.xRMSE_full
  );
  return out.slice(0, topK);
}
)}

function _autoFit(refineAnchorCandidates,anchorCandidatesFast,template_edges,scanEdges){return(
refineAnchorCandidates(
  anchorCandidatesFast,
  template_edges,
  scanEdges,
  {
    topK: 1
  }
)[0]
)}

function _autoFitProjectedTemplate(autoFit,template_edges,xFromK)
{
  const mob =
    autoFit &&
    (autoFit.mobiusRefined ?? autoFit.mobiusInitial ?? autoFit.mobius);
  if (!mob) return [];
  return template_edges.map((k) => ({ k, x: xFromK(mob, k) }));
}


function _autoFitResiduals(autoFitProjectedTemplate,scanEdges,dpAlign)
{
  const projectedTemplate = autoFitProjectedTemplate;
  if (!projectedTemplate || projectedTemplate.length === 0) return [];
  const tplX = projectedTemplate.map((t) => t.x);
  const scanX = scanEdges.map((e) => (typeof e === "number" ? e : e.x));
  const alignment = dpAlign(tplX, scanX);
  const map = alignment.templateToScan || [];
  const out = new Array(projectedTemplate.length);
  for (let i = 0; i < projectedTemplate.length; i++) {
    const pred = projectedTemplate[i].x;
    const sj = map[i];
    if (sj != null) {
      const actual = scanX[sj];
      out[i] = {
        k: projectedTemplate[i].k,
        predictedX: pred,
        actualX: actual,
        cost: Math.abs(pred - actual),
        matched: true,
        sj
      };
    } else {
      out[i] = {
        k: projectedTemplate[i].k,
        predictedX: pred,
        actualX: null,
        cost: 20,
        matched: false,
        sj: null
      };
    }
  }
  return out;
}


function _49(md){return(
md`## End to end function`
)}

function _autoFitScanline(binaryToEdges,edges1D,computeAnchorCandidatesFast,refineAnchorCandidates,xFromK,dpAlign){return(
function autoFitScanline(scanLine, template, opts = {}) {
  if (!scanLine.length) throw new Error("scanLine must be an array");
  if (!Array.isArray(template))
    throw new Error(
      "template must be an array (either binary mask or template k-values)"
    );
  const edgeThr = opts.edgeThreshold ?? 6;
  const topK = opts.topK ?? 10;
  const topKRefine = opts.topKRefine ?? 5;
  const minBetween = opts.minBetween;
  const maxBetween = opts.maxBetween;
  const gapPenalty = opts.gapPenalty;
  const polarityPenalty = opts.polarityPenalty;
  let template_edges;
  if (opts.templateIsBinary === true) {
    template_edges = binaryToEdges(template);
  } else {
    const allZerosOnes = template.every((v) => v === 0 || v === 1);
    if (allZerosOnes) template_edges = binaryToEdges(template);
    else template_edges = template.slice();
  }
  const scanEdges = edges1D(scanLine, edgeThr);
  if (!scanEdges || scanEdges.length < 3)
    return {
      success: false,
      reason: "not_enough_scan_edges",
      scanEdges,
      template_edges
    };
  const candidates = computeAnchorCandidatesFast(template_edges, scanEdges, {
    topK,
    minBetween,
    maxBetween
  });
  const refined = refineAnchorCandidates(
    candidates,
    template_edges,
    scanEdges,
    {
      topK: topKRefine,
      gapPenalty,
      polarityPenalty
    }
  );
  const chosen =
    refined && refined.length
      ? refined[0]
      : candidates && candidates.length
      ? candidates[0]
      : null;
  const mob = chosen
    ? chosen.mobiusRefined ?? chosen.mobiusInitial ?? chosen.mobius
    : null;
  const projectedTemplate = mob
    ? template_edges.map((k) => ({ k, x: xFromK(mob, k) }))
    : [];
  const tplX = projectedTemplate.map((t) => t.x);
  const scanX = scanEdges.map((e) => (typeof e === "number" ? e : e.x));
  const alignment = dpAlign(tplX, scanX);
  const map = alignment.templateToScan || [];
  const residuals = projectedTemplate.map((t, i) => {
    const sj = map[i];
    if (sj != null) {
      const actual = scanX[sj];
      return {
        k: t.k,
        predictedX: t.x,
        actualX: actual,
        cost: Math.abs(t.x - actual),
        matched: true,
        sj
      };
    } else {
      return {
        k: t.k,
        predictedX: t.x,
        actualX: null,
        cost: 20,
        matched: false,
        sj: null
      };
    }
  });
  return {
    success: true,
    template_edges,
    scanEdges,
    candidates,
    refined,
    chosen,
    mobius: mob,
    projectedTemplate,
    alignment,
    residuals
  };
}
)}

function _51(autoFitScanline,scanLineBuffer,template){return(
autoFitScanline(scanLineBuffer, template)
)}

function _52(md){return(
md`---`
)}

function _binaryToEdges(){return(
function binaryToEdges(arr) {
  const edges = [];
  const n = arr.length;

  // transitions
  for (let i = 1; i < n; i++) {
    if (arr[i] !== arr[i - 1]) edges.push(i);
  }

  return edges.map((i) => i - arr.length / 2);
}
)}

function _grey(renders,rgbaToGray,pixelBuffer)
{
  renders;
  return rgbaToGray(pixelBuffer);
}


function _edges(renders,canny,grey,width)
{
  renders;
  return canny(grey, width);
}


function _test_fitMobius(fitMobius)
{
  // Ground truth params
  const p = 0.5,
    q = 2,
    r = 0.05,
    s = 1;

  // Make 4 points from the model
  const pts = [0, 10, 20, 30].map((x) => ({ x, k: (p * x + q) / (r * x + s) }));

  return fitMobius(pts);
}


function _solve3(){return(
function solve3(A, b) {
  const [a, b1, c, d, e, f, g, h, i] = [
    A[0][0],
    A[0][1],
    A[0][2],
    A[1][0],
    A[1][1],
    A[1][2],
    A[2][0],
    A[2][1],
    A[2][2]
  ];
  const D = a * (e * i - f * h) - b1 * (d * i - f * g) + c * (d * h - e * g);
  if (Math.abs(D) < 1e-8) return [0, 0, 0];
  const dx =
    (b[0] * (e * i - f * h) -
      b1 * (b[1] * i - f * b[2]) +
      c * (b[1] * h - e * b[2])) /
    D;
  const dy =
    (a * (b[1] * i - f * b[2]) -
      b[0] * (d * i - f * g) +
      c * (d * b[2] - b[1] * g)) /
    D;
  const dz =
    (a * (e * b[2] - b[1] * h) -
      b1 * (d * b[2] - b[1] * g) +
      b[0] * (d * h - e * g)) /
    D;
  return [dx, dy, dz];
}
)}

function _sampleLine(){return(
function sampleLine(gray, w, cx, cy, theta, len) {
  const h = (gray.length / w) | 0;
  const dx = Math.cos(theta),
    dy = Math.sin(theta);
  const half = (len / 2) | 0;
  const out = new Float32Array(len);
  for (let t = -half, j = 0; j < len; t++, j++) {
    const xf = cx + t * dx,
      yf = cy + t * dy;
    const x0 = Math.floor(xf),
      y0 = Math.floor(yf);
    if (x0 < 0 || x0 >= w - 1 || y0 < 0 || y0 >= h - 1) {
      out[j] = 0;
      continue;
    }
    const a = xf - x0,
      b = yf - y0;
    const i = y0 * w + x0;
    const p00 = gray[i],
      p10 = gray[i + 1],
      p01 = gray[i + w],
      p11 = gray[i + w + 1];
    out[j] =
      (1 - a) * (1 - b) * p00 +
      a * (1 - b) * p10 +
      (1 - a) * b * p01 +
      a * b * p11;
  }
  return out;
}
)}

function _rgbaToGray(){return(
function rgbaToGray(rgba) {
  if (rgba.length % 4 !== 0) throw new Error("RGBA length not multiple of 4");
  const gray = new Uint8Array(rgba.length / 4);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j++) {
    const r = rgba[i],
      g = rgba[i + 1],
      b = rgba[i + 2];
    gray[j] = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
  }
  return gray;
}
)}

function _canny(gaussianKernel1D,clamp){return(
function canny(src, w, opts = {}) {
  const { sigma = 1.0, low = 20, high = 60 } = opts;
  if (!Number.isInteger(w) || w <= 0)
    throw new Error("w must be positive integer");
  const h = (src.length / w) | 0;
  if (w * h !== src.length) throw new Error("buffer length not divisible by w");

  // 1) Gaussian blur, separable
  const k = gaussianKernel1D(sigma);
  const tmp = new Float32Array(w * h);
  const blur = new Float32Array(w * h);

  // horizontal
  for (let y = 0; y < h; y++) {
    const base = y * w;
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let i = -k.half; i <= k.half; i++) {
        const xx = clamp(x + i, 0, w - 1);
        acc += k.data[i + k.half] * src[base + xx];
      }
      tmp[base + x] = acc;
    }
  }
  // vertical
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let acc = 0;
      for (let i = -k.half; i <= k.half; i++) {
        const yy = clamp(y + i, 0, h - 1);
        acc += k.data[i + k.half] * tmp[yy * w + x];
      }
      blur[y * w + x] = acc;
    }
  }

  // 2) Sobel gradients
  const gx = new Float32Array(w * h);
  const gy = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const ym1 = Math.max(0, y - 1),
      yp1 = Math.min(h - 1, y + 1);
    for (let x = 0; x < w; x++) {
      const xm1 = Math.max(0, x - 1),
        xp1 = Math.min(w - 1, x + 1);
      const a = blur[ym1 * w + xm1],
        b = blur[ym1 * w + x],
        c = blur[ym1 * w + xp1];
      const d = blur[y * w + xm1],
        /* e = blur[y*w + x] */ f = blur[y * w + xp1];
      const g = blur[yp1 * w + xm1],
        hh = blur[yp1 * w + x],
        i = blur[yp1 * w + xp1];
      gx[y * w + x] = c + 2 * f + i - (a + 2 * d + g);
      gy[y * w + x] = g + 2 * hh + i - (a + 2 * b + c);
    }
  }

  // gradient magnitude (L2), scaled to 0..255 for thresholding
  const mag = new Float32Array(w * h);
  let maxMag = 0;
  for (let idx = 0; idx < mag.length; idx++) {
    const m = Math.hypot(gx[idx], gy[idx]);
    mag[idx] = m;
    if (m > maxMag) maxMag = m;
  }
  const scale = maxMag > 0 ? 255 / maxMag : 0;

  // 3) Non-maximum suppression along quantized directions (0,45,90,135)
  const thin = new Uint8Array(w * h); // holds scaled magnitude at local maxima
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const gxx = gx[idx],
        gyy = gy[idx];
      const m = mag[idx] * scale;

      // direction sector
      const angle = Math.atan2(gyy, gxx) * (180 / Math.PI);
      const a = angle < 0 ? angle + 180 : angle;
      let n1 = 0,
        n2 = 0;
      if ((a >= 0 && a < 22.5) || (a >= 157.5 && a < 180)) {
        n1 = mag[idx - 1] * scale;
        n2 = mag[idx + 1] * scale; // horizontal
      } else if (a >= 22.5 && a < 67.5) {
        n1 = mag[idx - w - 1] * scale;
        n2 = mag[idx + w + 1] * scale; // 45°
      } else if (a >= 67.5 && a < 112.5) {
        n1 = mag[idx - w] * scale;
        n2 = mag[idx + w] * scale; // vertical
      } else {
        // 112.5..157.5
        n1 = mag[idx - w + 1] * scale;
        n2 = mag[idx + w - 1] * scale; // 135°
      }
      thin[idx] = m >= n1 && m >= n2 ? m | 0 : 0;
    }
  }

  // 4) Hysteresis thresholding via stack flood fill
  const STRONG = 255;
  const WEAK = 128;
  const out = new Uint8Array(w * h);
  const stack = new Int32Array(w * h);
  let sp = 0;

  for (let i = 0; i < thin.length; i++) {
    const v = thin[i];
    if (v >= high) {
      out[i] = STRONG;
      stack[sp++] = i;
    } else if (v >= low) {
      out[i] = WEAK;
    }
  }

  // promote weak connected to strong (8-connectivity)
  while (sp > 0) {
    const idx = stack[--sp];
    const y = (idx / w) | 0,
      x = idx % w;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const xx = x + dx,
          yy = y + dy;
        if (xx < 0 || xx >= w || yy < 0 || yy >= h) continue;
        const j = yy * w + xx;
        if (out[j] === WEAK) {
          out[j] = STRONG;
          stack[sp++] = j;
        }
      }
    }
  }

  // suppress remaining weak
  for (let i = 0; i < out.length; i++) out[i] = out[i] === STRONG ? 255 : 0;
  return out;
}
)}

function _edges1D(){return(
function edges1D(sig, thr = 6) {
  const n = sig.length;
  const d = new Float32Array(n);
  for (let i = 1; i < n; i++) d[i] = sig[i] - sig[i - 1];
  const idx = [];
  for (let i = 2; i < n - 2; i++) {
    const v = d[i];
    if (Math.abs(v) < thr) continue;
    if (
      (v > 0 && d[i] >= d[i - 1] && d[i] >= d[i + 1]) ||
      (v < 0 && d[i] <= d[i - 1] && d[i] <= d[i + 1])
    ) {
      idx.push({ x: i, s: Math.sign(v) });
    }
  }
  return idx;
}
)}

function _canvasFromGrayU8(){return(
function canvasFromGrayU8(gray, w) {
  if (!Number.isInteger(w) || w <= 0) throw new Error("w invalid");
  const h = (gray.length / w) | 0;
  if (w * h !== gray.length) throw new Error("buffer size mismatch");

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(w, h);
  const dst = img.data; // RGBA

  for (let i = 0, j = 0; i < gray.length; i++, j += 4) {
    const v = gray[i];
    dst[j] = v;
    dst[j + 1] = v;
    dst[j + 2] = v;
    dst[j + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
)}

function _gaussianKernel1D(){return(
function gaussianKernel1D(sigma) {
  const s = Math.max(0.3, sigma);
  const half = Math.max(1, Math.round(s * 3));
  const size = 2 * half + 1;
  const data = new Float32Array(size);
  const a = 1 / (Math.sqrt(2 * Math.PI) * s);
  const twoSigma2 = 2 * s * s;
  let sum = 0;
  for (let i = -half; i <= half; i++) {
    const v = a * Math.exp(-(i * i) / twoSigma2);
    data[i + half] = v;
    sum += v;
  }
  for (let i = 0; i < size; i++) data[i] /= sum;
  return { data, half };
}
)}

function _64(md){return(
md`Here are several algorithms / strategies you can use to assign every template_edge to a subset of scan edges.  Which is best depends on constraints you want to enforce (ordering, polarity, one‑to‑one), the expected amount of outliers/missing edges, and how big the problem is.

...

4) Dynamic programming (sequence alignment) — preserves order, allows gaps
- If template edges must map in order to scan edges (monotone mapping) and you allow insertions/deletions, use DP (Needleman‑Wunsch style):
  cost(i,j) = min( cost(i-1,j-1) + match_cost(x_ti,x_sj),
                   cost(i-1,j) + gap_penalty,   // skip template
                   cost(i,j-1) + gap_penalty )  // skip scan
- match_cost could be |x_ti - x_sj| (possibly squared, and include polarity mismatch penalty).
- Complexity O(N*M) (N = #template edges, M = #scan edges).
- Pros: optimal under the chosen cost, enforces monotonicity, handles missing edges.
- Cons: quadratic; choose gap_penalty carefully.

...
`
)}

function _clamp(){return(
function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}
)}

function _66(overlay){return(
overlay
)}

async function _SVD(require)
{
  return (await require("svd-js")).SVD;
}


function _69(robocoop){return(
robocoop
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["image.png", {url: new URL("./files/761b4331b51bb160fe71de3b320d5fd4b3afab5f04b079862051dc2a60264ad23e154d0e2deb3a18f9c7e982b5e2a8bc0837599de53e888fe7744a23a842b0d7.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("viewof scanY", child1);
  main.import("scanY", child1);
  main.import("canvas", child1);
  main.import("pixelBuffer", child1);
  main.import("renders", child1);
  main.import("scanline", child1);
  main.import("overlay", child1);
  main.import("template", child1);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["Plot","width","autoFitProjectedTemplate"], _4);
  main.variable(observer()).define(["viewof scanY"], _5);
  main.variable(observer()).define(["canvas","htl"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("viewof scanLinePlot")).define("viewof scanLinePlot", ["Plot","width","scanLineBuffer"], _scanLinePlot);
  main.variable(observer("scanLinePlot")).define("scanLinePlot", ["Generators", "viewof scanLinePlot"], (G, _) => G.input(_));
  main.variable(observer("scanLineBuffer")).define("scanLineBuffer", ["scanline"], _scanLineBuffer);
  main.variable(observer("scanEdges")).define("scanEdges", ["edges1D","scanLineBuffer"], _scanEdges);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["FileAttachment","md"], _13);
  main.variable(observer("viewof leftmost")).define("viewof leftmost", ["Plot","width","scanEdges"], _leftmost);
  main.variable(observer("leftmost")).define("leftmost", ["Generators", "viewof leftmost"], (G, _) => G.input(_));
  main.variable(observer("viewof rightmost")).define("viewof rightmost", ["Plot","width","scanEdges"], _rightmost);
  main.variable(observer("rightmost")).define("rightmost", ["Generators", "viewof rightmost"], (G, _) => G.input(_));
  main.variable(observer("viewof middle_right")).define("viewof middle_right", ["Plot","width","scanEdges"], _middle_right);
  main.variable(observer("middle_right")).define("middle_right", ["Generators", "viewof middle_right"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["Plot","width","template_projection"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["Plot","width","initialAlignment"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["Plot","width","mobiusLSFit"], _23);
  main.variable(observer()).define(["mobiusLSFit","md"], _24);
  main.variable(observer()).define(["Plot","width","residualsLS"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("fitMobius")).define("fitMobius", _fitMobius);
  main.variable(observer("pqrs")).define("pqrs", ["fitMobius","leftmost","middle_right","rightmost"], _pqrs);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("template_edges")).define("template_edges", ["binaryToEdges","template"], _template_edges);
  main.variable(observer("xFromK")).define("xFromK", _xFromK);
  main.variable(observer("template_projection")).define("template_projection", ["template_edges","xFromK","pqrs"], _template_projection);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("dpAlign")).define("dpAlign", _dpAlign);
  main.variable(observer("initialAlignment")).define("initialAlignment", ["dpAlign","template_projection","scanEdges"], _initialAlignment);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer("fitMobiusLS")).define("fitMobiusLS", ["SVD"], _fitMobiusLS);
  main.variable(observer("mobiusLSFit")).define("mobiusLSFit", ["initialAlignment","scanEdges","template_projection","fitMobiusLS","xFromK"], _mobiusLSFit);
  main.variable(observer("calculatLSResiduals")).define("calculatLSResiduals", ["initialAlignment","template_projection","scanEdges"], _calculatLSResiduals);
  main.variable(observer("residualsLS")).define("residualsLS", ["calculatLSResiduals","mobiusLSFit"], _residualsLS);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("computeAnchorCandidatesFast")).define("computeAnchorCandidatesFast", ["fitMobiusLS"], _computeAnchorCandidatesFast);
  main.variable(observer("anchorCandidatesFast")).define("anchorCandidatesFast", ["computeAnchorCandidatesFast","template_edges","scanEdges"], _anchorCandidatesFast);
  main.variable(observer("refineAnchorCandidates")).define("refineAnchorCandidates", ["xFromK","dpAlign","fitMobiusLS"], _refineAnchorCandidates);
  main.variable(observer("autoFit")).define("autoFit", ["refineAnchorCandidates","anchorCandidatesFast","template_edges","scanEdges"], _autoFit);
  main.variable(observer("autoFitProjectedTemplate")).define("autoFitProjectedTemplate", ["autoFit","template_edges","xFromK"], _autoFitProjectedTemplate);
  main.variable(observer("autoFitResiduals")).define("autoFitResiduals", ["autoFitProjectedTemplate","scanEdges","dpAlign"], _autoFitResiduals);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("autoFitScanline")).define("autoFitScanline", ["binaryToEdges","edges1D","computeAnchorCandidatesFast","refineAnchorCandidates","xFromK","dpAlign"], _autoFitScanline);
  main.variable(observer()).define(["autoFitScanline","scanLineBuffer","template"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("binaryToEdges")).define("binaryToEdges", _binaryToEdges);
  main.variable(observer("grey")).define("grey", ["renders","rgbaToGray","pixelBuffer"], _grey);
  main.variable(observer("edges")).define("edges", ["renders","canny","grey","width"], _edges);
  main.variable(observer("test_fitMobius")).define("test_fitMobius", ["fitMobius"], _test_fitMobius);
  main.variable(observer("solve3")).define("solve3", _solve3);
  main.variable(observer("sampleLine")).define("sampleLine", _sampleLine);
  main.variable(observer("rgbaToGray")).define("rgbaToGray", _rgbaToGray);
  main.variable(observer("canny")).define("canny", ["gaussianKernel1D","clamp"], _canny);
  main.variable(observer("edges1D")).define("edges1D", _edges1D);
  main.variable(observer("canvasFromGrayU8")).define("canvasFromGrayU8", _canvasFromGrayU8);
  main.variable(observer("gaussianKernel1D")).define("gaussianKernel1D", _gaussianKernel1D);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("clamp")).define("clamp", _clamp);
  main.variable(observer()).define(["overlay"], _66);
  main.variable(observer("SVD")).define("SVD", ["require"], _SVD);
  const child2 = runtime.module(define2);
  main.import("robocoop", child2);
  main.variable(observer()).define(["robocoop"], _69);
  return main;
}
