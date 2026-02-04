import define1 from "./f109935193c0deba@4551.js";
import define2 from "./b316487cf25bf2ee@290.js";

function _1(md){return(
md`# Group Family Lattice
## Constructing p<sup>n</sup> order groups generated with GAP`
)}

function _2(md){return(
md`The default graph setting shows a cleaner version of [this subgroup relations chart](https://groupprops.subwiki.org/wiki/Groups_of_order_16#Subgroup/quotient_relationships) on group props. The radial layout is useful for graphs with lots of nodes. Below are instructions for generating your own data.`
)}

function _data(FileAttachment){return(
FileAttachment("familyLattice@13.json").json()
)}

function _layerCrossingUtils(d3){return(
(() => {
  const bitCountInversions = (values, m) => {
    const n = values.length;
    const bit = new Int32Array(m + 1);
    const add = (i) => {
      for (let x = i + 1; x <= m; x += x & -x) bit[x] += 1;
    };
    const sum = (i) => {
      let s = 0;
      for (let x = i + 1; x > 0; x -= x & -x) s += bit[x];
      return s;
    };
    let inv = 0;
    for (let i = 0; i < n; i++) {
      const v = values[i] | 0;
      inv += i - sum(v);
      add(v);
    }
    return inv;
  };

  const stableOrderForLevel = (nodes, level) =>
    nodes
      .filter(d => d.level === level)
      .slice()
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0) || (a.y ?? 0) - (b.y ?? 0) || String(a.id).localeCompare(String(b.id)))
      .map(d => d.id);

  const buildPairLinks = (nodes, links) => {
    const nodeById = new Map(nodes.map(d => [d.id, d]));
    const byPair = new Map();
    for (const l of links) {
      const s = nodeById.get(l.source);
      const t = nodeById.get(l.target);
      if (!s || !t) continue;
      if (t.level !== s.level + 1) continue;
      const key = `${s.level}|${t.level}`;
      let arr = byPair.get(key);
      if (!arr) byPair.set(key, (arr = []));
      arr.push({source: s.id, target: t.id});
    }
    return {nodeById, byPair};
  };

  const countCrossingsForPair = (orderLower, orderUpper, edges) => {
    if (!edges || edges.length === 0) return {crossings: 0, edges: 0};
    const posL = new Map(orderLower.map((id, i) => [id, i]));
    const posU = new Map(orderUpper.map((id, i) => [id, i]));
    const pairs = [];
    for (const e of edges) {
      const a = posL.get(e.source);
      const b = posU.get(e.target);
      if (a == null || b == null) continue;
      pairs.push([a, b]);
    }
    if (pairs.length === 0) return {crossings: 0, edges: 0};
    pairs.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const upperSeq = new Int32Array(pairs.length);
    for (let i = 0; i < pairs.length; i++) upperSeq[i] = pairs[i][1];
    const crossings = bitCountInversions(upperSeq, orderUpper.length);
    return {crossings, edges: pairs.length};
  };

  const totalCrossings = (levels, ordersByLevel, byPair) => {
    const out = [];
    let total = 0;
    for (let i = 0; i < levels.length - 1; i++) {
      const a = levels[i], b = levels[i + 1];
      const key = `${a}|${b}`;
      const edges = byPair.get(key) || [];
      const ca = countCrossingsForPair(ordersByLevel.get(a), ordersByLevel.get(b), edges);
      out.push({lower: a, upper: b, ...ca});
      total += ca.crossings;
    }
    return {total, pairs: out};
  };

  const barycenterSweep = (levels, ordersByLevel, byPair, direction = "down") => {
    const levelSeq = direction === "down" ? levels.slice(0, -1) : levels.slice(1).slice().reverse();
    for (const L of levelSeq) {
      const A = direction === "down" ? L : L - 1;
      const B = direction === "down" ? L + 1 : L;
      const key = `${A}|${B}`;
      const edges = byPair.get(key) || [];
      if (edges.length === 0) continue;

      const orderA = ordersByLevel.get(A);
      const orderB = ordersByLevel.get(B);
      const posFixed = new Map((direction === "down" ? orderB : orderA).map((id, i) => [id, i]));

      const current = ordersByLevel.get(direction === "down" ? A : B);
      const neighbors = new Map(current.map(id => [id, []]));
      for (const e of edges) {
        if (direction === "down") {
          const arr = neighbors.get(e.source);
          if (arr) {
            const p = posFixed.get(e.target);
            if (p != null) arr.push(p);
          }
        } else {
          const arr = neighbors.get(e.target);
          if (arr) {
            const p = posFixed.get(e.source);
            if (p != null) arr.push(p);
          }
        }
      }

      const scored = current.map((id, i) => {
        const ns = neighbors.get(id) || [];
        const bc = ns.length ? d3.mean(ns) : i;
        return {id, i, bc};
      });

      scored.sort((x, y) => x.bc - y.bc || x.i - y.i);
      ordersByLevel.set(direction === "down" ? A : B, scored.map(d => d.id));
    }
    return ordersByLevel;
  };

  const moveItem = (arr, id, pos) => {
    const k = arr.indexOf(id);
    if (k < 0) return arr.slice();
    const out = arr.slice();
    out.splice(k, 1);
    const p = Math.max(0, Math.min(out.length, pos | 0));
    out.splice(p, 0, id);
    return out;
  };

  const siftLevel = (levels, levelIndex, ordersByLevel, byPair) => {
    const L = levels[levelIndex];
    const orderL = ordersByLevel.get(L);
    if (!orderL || orderL.length <= 2) return ordersByLevel;

    const lowerLevel = levels[levelIndex - 1];
    const upperLevel = levels[levelIndex + 1];
    const edgesLower = lowerLevel != null ? (byPair.get(`${lowerLevel}|${L}`) || []) : [];
    const edgesUpper = upperLevel != null ? (byPair.get(`${L}|${upperLevel}`) || []) : [];

    const costWithOrder = (candidateOrder) => {
      let cost = 0;
      if (lowerLevel != null) cost += countCrossingsForPair(ordersByLevel.get(lowerLevel), candidateOrder, edgesLower).crossings;
      if (upperLevel != null) cost += countCrossingsForPair(candidateOrder, ordersByLevel.get(upperLevel), edgesUpper).crossings;
      return cost;
    };

    let current = orderL.slice();
    for (const v of orderL) {
      const base = current;
      let bestOrder = base;
      let bestCost = costWithOrder(base);
      const oldPos = base.indexOf(v);
      for (let p = 0; p < base.length; p++) {
        if (p === oldPos) continue;
        const cand = moveItem(base, v, p);
        const c = costWithOrder(cand);
        if (c < bestCost) {
          bestCost = c;
          bestOrder = cand;
        }
      }
      current = bestOrder;
      ordersByLevel.set(L, current);
    }
    return ordersByLevel;
  };

  const optimizeOrders = (nodes, links, {sweepPasses = 6, siftPasses = 2} = {}) => {
    const {byPair} = buildPairLinks(nodes, links);
    const levels = Array.from(new Set(nodes.map(d => d.level))).sort((a, b) => a - b);
    const ordersByLevel = new Map(levels.map(L => [L, stableOrderForLevel(nodes, L)]));

    const before = totalCrossings(levels, ordersByLevel, byPair);

    for (let i = 0; i < (sweepPasses | 0); i++) {
      barycenterSweep(levels, ordersByLevel, byPair, "down");
      barycenterSweep(levels, ordersByLevel, byPair, "up");
    }

    for (let p = 0; p < (siftPasses | 0); p++) {
      for (let li = 0; li < levels.length; li++) siftLevel(levels, li, ordersByLevel, byPair);
    }

    const after = totalCrossings(levels, ordersByLevel, byPair);

    return {levels, ordersByLevel, before, after};
  };

  const applyOrdersToIndices = (nodes, ordersByLevel) => {
    const idx = new Map();
    for (const [L, order] of ordersByLevel.entries()) {
      for (let i = 0; i < order.length; i++) idx.set(order[i], i);
    }
    return nodes.map(n => ({...n, index: idx.get(n.id) ?? n.index}));
  };

  return {
    buildPairLinks,
    countCrossingsForPair,
    totalCrossings,
    optimizeOrders,
    applyOrdersToIndices
  };
})()
)}

function _7(robocoop){return(
robocoop
)}

function _crossingSettings(Inputs){return(
Inputs.form(
  {
    enable: Inputs.toggle({
      label: "Minimize crossings (layered sifting)",
      value: true
    }),
    sweepPasses: Inputs.range([0, 12], {
      label: "Barycenter sweeps",
      step: 1,
      value: 6
    }),
    siftPasses: Inputs.range([0, 6], {
      label: "Sift passes",
      step: 1,
      value: 1
    })
  },
  { label: "Crossing minimization" }
)
)}

function _controls(html)
{
  const container = html`<div style="display: flex; align-items: center; gap: 24px; font-family: system-ui, sans-serif; flex-wrap: wrap;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <label style="font-weight: 500; color: #555;">Max Levels:</label>
      <input type="range" min="2" max="6" value="4" style="width: 120px; accent-color: #2563eb;">
      <input type="number" min="2" max="6" value="4" style="width: 56px; padding: 4px 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;">
    </div>
    <div style="display: flex; align-items: center; gap: 8px; padding: 4px; background: #f5f5f5; border-radius: 8px;">
      <button data-layout="linear" style="padding: 6px 14px; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s ease; background: #2563eb; color: white;">Linear</button>
      <button data-layout="radial" style="padding: 6px 14px; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s ease; background: transparent; color: #666;">Radial</button>
    </div>
  </div>`;
  
  const slider = container.querySelector('input[type="range"]');
  const number = container.querySelector('input[type="number"]');
  const linearBtn = container.querySelector('[data-layout="linear"]');
  const radialBtn = container.querySelector('[data-layout="radial"]');
  
  container.value = { maxLevels: 4, layout: 'linear' };
  
  function updateLevels(value) {
    value = Math.max(2, Math.min(6, parseInt(value) || 4));
    slider.value = value;
    number.value = value;
    container.value = { ...container.value, maxLevels: value };
    container.dispatchEvent(new CustomEvent("input"));
  }
  
  function updateLayout(layout) {
    container.value = { ...container.value, layout };
    
    if (layout === 'linear') {
      linearBtn.style.background = '#2563eb';
      linearBtn.style.color = 'white';
      radialBtn.style.background = 'transparent';
      radialBtn.style.color = '#666';
    } else {
      radialBtn.style.background = '#2563eb';
      radialBtn.style.color = 'white';
      linearBtn.style.background = 'transparent';
      linearBtn.style.color = '#666';
    }
    
    container.dispatchEvent(new CustomEvent("input"));
  }
  
  slider.oninput = () => updateLevels(slider.value);
  number.oninput = () => updateLevels(number.value);
  linearBtn.onclick = () => updateLayout('linear');
  radialBtn.onclick = () => updateLayout('radial');
  
  return container;
}


function _crossingMinimizationReport(layoutData,htl,crossingSettings,layerCrossingUtils){return(
(() => {
  if (!layoutData || layoutData.layoutType !== "linear") {
    return htl.html`<div style="font: 12px/1.4 system-ui, sans-serif; color:#444;">
      Crossing minimization here is implemented for the <b>linear (layered)</b> layout. Switch the layout control to <b>Linear</b> to use it.
    </div>`;
  }

  const {nodes, links} = layoutData;
  const {levels, ordersByLevel, before, after} = crossingSettings.enable
    ? layerCrossingUtils.optimizeOrders(nodes, links, crossingSettings)
    : (() => {
        const {byPair} = layerCrossingUtils.buildPairLinks(nodes, links);
        const levels = Array.from(new Set(nodes.map(d => d.level))).sort((a,b) => a - b);
        const ordersByLevel = new Map(levels.map(L => [L, nodes.filter(d => d.level === L).slice().sort((a,b) => (a.index ?? 0) - (b.index ?? 0) || String(a.id).localeCompare(String(b.id))).map(d => d.id)]));
        const before = layerCrossingUtils.totalCrossings(levels, ordersByLevel, byPair);
        return {levels, ordersByLevel, before, after: before};
      })();

  const fmtLevel = (L) => `2^${L}`;
  const rows = after.pairs.map(p => ({
    pair: `${fmtLevel(p.lower)} → ${fmtLevel(p.upper)}`,
    edges: p.edges,
    crossings: p.crossings
  }));

  return htl.html`<div style="font: 12px/1.4 system-ui, sans-serif; color:#1a1a1a; max-width: 900px;">
    <div style="display:flex; gap:18px; align-items:baseline; flex-wrap:wrap;">
      <div><span style="color:#666;">Crossings (before):</span> <b>${before.total}</b></div>
      <div><span style="color:#666;">Crossings (after):</span> <b>${after.total}</b></div>
      <div><span style="color:#666;">Δ:</span> <b style="color:${after.total <= before.total ? "#16a34a" : "#dc2626"};">${after.total - before.total}</b></div>
    </div>
    <div style="margin-top:10px; overflow:auto; border:1px solid #eee; border-radius:8px;">
      <table style="border-collapse:collapse; width:100%; min-width:520px;">
        <thead>
          <tr style="background:#fafafa;">
            <th style="text-align:left; padding:8px 10px; border-bottom:1px solid #eee; font-weight:600; color:#555;">Adjacent levels</th>
            <th style="text-align:right; padding:8px 10px; border-bottom:1px solid #eee; font-weight:600; color:#555;">Edges</th>
            <th style="text-align:right; padding:8px 10px; border-bottom:1px solid #eee; font-weight:600; color:#555;">Crossings</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => htl.html`<tr>
            <td style="padding:7px 10px; border-bottom:1px solid #f1f1f1; color:#333;">${r.pair}</td>
            <td style="padding:7px 10px; border-bottom:1px solid #f1f1f1; text-align:right; color:#333;">${r.edges}</td>
            <td style="padding:7px 10px; border-bottom:1px solid #f1f1f1; text-align:right; color:#333;">${r.crossings}</td>
          </tr>`)}
        </tbody>
      </table>
    </div>
    <div style="margin-top:10px; color:#555;">
      To apply the optimized ordering to your layout, use <code>layerCrossingUtils.applyOrdersToIndices(layoutData.nodes, ordersByLevel)</code> and then recompute Y positions from <code>index</code>.
    </div>
  </div>`;
})()
)}

function _familyChart(width,layoutData,d3)
{
  const containerWidth = width;
  const containerHeight = 800;
  const { nodes, links, config, maxLevel, minLevel, layoutType, toSubscript } = layoutData;

  // Calculate pill sizes
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tempText.setAttribute('font-size', '14px');
  tempText.setAttribute('font-weight', '500');
  tempText.setAttribute('font-family', "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace");
  tempSvg.appendChild(tempText);
  document.body.appendChild(tempSvg);

  nodes.forEach(node => {
    tempText.textContent = node.label;
    const bbox = tempText.getBBox();
    node.textWidth = bbox.width;
    node.pillWidth = bbox.width + 16;
    node.pillHeight = 24;
  });

  document.body.removeChild(tempSvg);

  const nodeById = new Map(nodes.map(n => [n.id, n]));
  const levels = d3.group(nodes, d => d.level);

  // Create SVG
  const svg = d3.create("svg")
    .attr("class", "family-chart")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .attr("viewBox", [0, 0, containerWidth, containerHeight]);

  const zoomableGroup = svg.append('g').attr('class', 'zoomable-content');
  const fixedGroup = svg.append('g').attr('class', 'fixed-content');

  // ============================================
  // LINK PATH GENERATORS
  // ============================================
  
  function getLinearLinkPath(d) {
    const source = nodeById.get(d.source);
    const target = nodeById.get(d.target);
    const midX = (source.x + target.x) / 2;
    return `M ${source.x} ${source.y} C ${midX} ${source.y}, ${midX} ${target.y}, ${target.x} ${target.y}`;
  }

  function getRadialLinkPath(d) {
    const source = nodeById.get(d.source);
    const target = nodeById.get(d.target);
    
    const sx = source.x, sy = source.y;
    const tx = target.x, ty = target.y;
    
    // If source is at center (radius 0), use straight line
    if (source.radius === 0) {
      return `M${sx},${sy} L${tx},${ty}`;
    }
    
    // Calculate angles from center (0,0 in our coordinate system)
    const sourceAngle = Math.atan2(sy, sx);
    const targetAngle = Math.atan2(ty, tx);
    
    // Calculate angle difference (normalize to -π to π)
    let angleDiff = targetAngle - sourceAngle;
    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    
    const absAngleDiff = Math.abs(angleDiff);
    
    // Get radii
    const sourceRadius = source.radius;
    const targetRadius = target.radius;
    
    // Tuning parameters
    const linktangent1 = 1.75;  // Control for simple curves
    const linktangent2 = 3;     // Control for complex curves
    const dMidLinkAngle = -0.1; // Angle offset for mid tangent
    const midLinkHandle = 0.25; // Handle length multiplier
    
    // If angle difference is small, use simple cubic bezier
    if (absAngleDiff < Math.PI / 3) {
      const controlDistance = (targetRadius - sourceRadius) / linktangent1;
      const c1x = sx + controlDistance * Math.cos(sourceAngle);
      const c1y = sy + controlDistance * Math.sin(sourceAngle);
      const c2x = tx - controlDistance * Math.cos(targetAngle);
      const c2y = ty - controlDistance * Math.sin(targetAngle);
      
      return `M${sx},${sy} C${c1x},${c1y} ${c2x},${c2y} ${tx},${ty}`;
    } else {
      // Use two cubic beziers with an intermediate point for larger angle differences
      
      // Calculate midpoint radius - blend between levels
      let midRadius = (sourceRadius + targetRadius) / 2;
      
      // Calculate the midpoint angle
      const midAngle = sourceAngle + angleDiff / 2;
      
      // Intermediate point on the circular path
      const mx = midRadius * Math.cos(midAngle);
      const my = midRadius * Math.sin(midAngle);
      
      // Control distances based on radial distances
      const firstHalfRadialDistance = midRadius - sourceRadius;
      const secondHalfRadialDistance = targetRadius - midRadius;
      
      const controlDistance1 = Math.abs(firstHalfRadialDistance) / linktangent2;
      const controlDistance2 = Math.abs(secondHalfRadialDistance) / linktangent2;
      
      // First control point - radial tangent from source
      const c1x = sx + controlDistance1 * Math.cos(sourceAngle);
      const c1y = sy + controlDistance1 * Math.sin(sourceAngle);
      
      // For the middle knot point, tangent handles should be perpendicular to radial
      // Perpendicular to radial means tangent to the circle at that point
      const tangentAngle = midAngle + (Math.PI / 2 + dMidLinkAngle) * Math.sign(angleDiff);
      
      // Control handle distance for middle point (proportional to arc length)
      const handleLength = absAngleDiff * midRadius * midLinkHandle;
      
      // Second control point - approaching middle from tangent direction
      const c2x = mx - handleLength * Math.cos(tangentAngle);
      const c2y = my - handleLength * Math.sin(tangentAngle);
      
      // Third control point - leaving middle in tangent direction
      const c3x = mx + handleLength * Math.cos(tangentAngle);
      const c3y = my + handleLength * Math.sin(tangentAngle);
      
      // Fourth control point - radial tangent to target
      const c4x = tx - controlDistance2 * Math.cos(targetAngle);
      const c4y = ty - controlDistance2 * Math.sin(targetAngle);
      
      return `M${sx},${sy} C${c1x},${c1y} ${c2x},${c2y} ${mx},${my} C${c3x},${c3y} ${c4x},${c4y} ${tx},${ty}`;
    }
  }

  const getLinkPath = layoutType === 'radial' ? getRadialLinkPath : getLinearLinkPath;

  // ============================================
  // RENDER LINKS
  // ============================================
  
  const linksGroup = zoomableGroup.append('g').attr('class', 'links');

  const linkSelection = linksGroup.selectAll('.link-group')
    .data(links)
    .join('g')
    .attr('class', 'link-group');

  linkSelection.append('path')
    .attr('class', 'link-path')
    .attr('d', getLinkPath)
    .attr('fill', 'none')
    .attr('stroke', d => {
      if (d.type === 'direct') return '#000';
      if (d.type === 'semidirect') return '#2563eb';
      return '#16a34a'; // green for other types
    })
    .attr('stroke-width', 1.5)
    .attr('opacity', 0.25);

  // Link labels
  const linkLabelsGroup = zoomableGroup.append('g').attr('class', 'link-labels');

  const linkLabelSelection = linkLabelsGroup.selectAll('.link-label')
    .data(links)
    .join('text')
    .attr('class', 'link-label')
    .attr('x', d => {
      if (layoutType === 'radial') {
        const source = nodeById.get(d.source);
        const target = nodeById.get(d.target);
        
        // If source is at center (radius 0), use simple average (linear link)
        if (source.radius === 0) {
          return (source.x + target.x) / 2;
        }
        
        // For curved links, use polar coordinates: average radius and mid angle
        const avgRadius = (source.radius + target.radius) / 2;
        
        // Calculate mid angle (handling wrap-around)
        let angleDiff = target.angle - source.angle;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        const midAngle = source.angle + angleDiff / 2;
        
        return avgRadius * Math.cos(midAngle);
      }
      // Linear layout: simple average
      const source = nodeById.get(d.source);
      const target = nodeById.get(d.target);
      return (source.x + target.x) / 2;
    })
    .attr('y', d => {
      if (layoutType === 'radial') {
        const source = nodeById.get(d.source);
        const target = nodeById.get(d.target);
        
        // If source is at center (radius 0), use simple average (linear link)
        if (source.radius === 0) {
          return (source.y + target.y) / 2;
        }
        
        // For curved links, use polar coordinates: average radius and mid angle
        const avgRadius = (source.radius + target.radius) / 2;
        
        // Calculate mid angle (handling wrap-around)
        let angleDiff = target.angle - source.angle;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        const midAngle = source.angle + angleDiff / 2;
        
        return avgRadius * Math.sin(midAngle);
      }
      // Linear layout: simple average
      const source = nodeById.get(d.source);
      const target = nodeById.get(d.target);
      return (source.y + target.y) / 2;
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', '13px')
    .attr('fill', '#1a1a1a')
    .attr('stroke', '#ffffff')
    .attr('stroke-width', 5)
    .attr('paint-order', 'stroke fill')
    .attr('opacity', 0)
    .text(d => d.label);

  // ============================================
  // RENDER NODES
  // ============================================
  
  const classColors = {
    'abelian': '#1a1a1a',
    'non-abelian': '#2563eb'
  };

  // Calculate level widths for hover areas (linear layout)
  const levelWidths = new Map();
  for (const [level, levelNodes] of levels) {
    const maxWidth = d3.max(levelNodes, n => n.pillWidth);
    levelWidths.set(level, maxWidth);
  }

  const labelOffset = 30;
  const nodesGroup = zoomableGroup.append('g').attr('class', 'nodes');

  const nodeSelection = nodesGroup.selectAll('.node-group')
    .data(nodes)
    .join('g')
    .attr('class', 'node-group')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);

  // For radial layout, create an inner group that rotates the pill
  // Text should read outward from center, but never upside down
  const nodeInner = nodeSelection.append('g')
    .attr('class', 'node-inner')
    .attr('transform', d => {
      if (layoutType !== 'radial') return '';
      
      // For center node, no rotation needed
      if (d.radius === 0) return '';
      
      // Calculate rotation angle (in degrees)
      // The angle points outward from center
      let rotationDeg = d.angle * 180 / Math.PI;
      
      // Text is upside down when on the left side of the circle (x < 0)
      // Flip by 180 degrees to make it readable
      if (d.x < 0) {
        rotationDeg += 180;
      }
      
      return `rotate(${rotationDeg})`;
    });

  // Hover targets (simplified for radial)
  if (layoutType === 'linear') {
    nodeInner.append('rect')
      .attr('class', 'hover-target')
      .attr('x', d => -levelWidths.get(d.level) / 2)
      .attr('y', d => {
        const levelNodes = nodes.filter(n => n.level === d.level);
        levelNodes.sort((a, b) => a.y - b.y);
        const nodeIndex = levelNodes.findIndex(n => n.id === d.id);
        if (nodeIndex === 0) return -labelOffset;
        const prevNode = levelNodes[nodeIndex - 1];
        return -(d.y - prevNode.y) / 2;
      })
      .attr('width', d => levelWidths.get(d.level))
      .attr('height', d => {
        const levelNodes = nodes.filter(n => n.level === d.level);
        levelNodes.sort((a, b) => a.y - b.y);
        const nodeIndex = levelNodes.findIndex(n => n.id === d.id);
        let topExtension, bottomExtension;
        if (nodeIndex === 0) {
          topExtension = labelOffset;
        } else {
          const prevNode = levelNodes[nodeIndex - 1];
          topExtension = (d.y - prevNode.y) / 2;
        }
        if (nodeIndex === levelNodes.length - 1) {
          bottomExtension = labelOffset;
        } else {
          const nextNode = levelNodes[nodeIndex + 1];
          bottomExtension = (nextNode.y - d.y) / 2;
        }
        return topExtension + bottomExtension;
      })
      .attr('fill', 'transparent');
  } else {
    // Circular hover target for radial (on the outer group, not rotated)
    nodeSelection.insert('circle', '.node-inner')
      .attr('class', 'hover-target')
      .attr('r', d => Math.max(d.pillWidth, d.pillHeight) / 2 + 8)
      .attr('fill', 'transparent');
  }

  // Node pills
  nodeInner.append('rect')
    .attr('class', 'node-pill')
    .attr('x', d => -d.pillWidth / 2)
    .attr('y', -12)
    .attr('width', d => d.pillWidth)
    .attr('height', d => d.pillHeight)
    .attr('rx', 12)
    .attr('ry', 12)
    .attr('fill', d => classColors[d.class] || '#888')
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);

  // Node labels
  nodeInner.append('text')
    .attr('class', 'node-label')
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', '14px')
    .attr('font-weight', '500')
    .attr('fill', '#ffffff')
    .text(d => d.label);

  // ============================================
  // BUILD CONNECTION DATA FOR UPSTREAM/DOWNSTREAM
  // ============================================
  
  const nodeConnections = new Map();
  nodes.forEach(node => {
    nodeConnections.set(node.id, {
      directUpward: [],    // nodes this connects TO (higher level)
      directDownward: [],  // nodes this connects FROM (lower level)
      fullUpperSet: new Set(),
      fullLowerSet: new Set(),
      combinedSet: new Set(),
      directSet: new Set()
    });
  });
  
  // Record direct connections
  links.forEach(link => {
    // source is lower level, target is higher level
    nodeConnections.get(link.source).directUpward.push(link.target);
    nodeConnections.get(link.target).directDownward.push(link.source);
  });
  
  // Compute transitive closure (upper set - all ancestors)
  function computeUpperSet(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return visited;
    visited.add(nodeId);
    
    const directUp = nodeConnections.get(nodeId).directUpward;
    directUp.forEach(upId => {
      computeUpperSet(upId, visited);
    });
    
    return visited;
  }
  
  // Compute transitive closure (lower set - all descendants)
  function computeLowerSet(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return visited;
    visited.add(nodeId);
    
    const directDown = nodeConnections.get(nodeId).directDownward;
    directDown.forEach(downId => {
      computeLowerSet(downId, visited);
    });
    
    return visited;
  }
  
  // Pre-compute full upper and lower sets for each node
  nodes.forEach(node => {
    const connections = nodeConnections.get(node.id);
    
    // Compute upper set (excluding self)
    const upperSet = computeUpperSet(node.id, new Set());
    upperSet.delete(node.id);
    connections.fullUpperSet = upperSet;
    
    // Compute lower set (excluding self)
    const lowerSet = computeLowerSet(node.id, new Set());
    lowerSet.delete(node.id);
    connections.fullLowerSet = lowerSet;
    
    // Pre-compute combined set (self + upper + lower)
    connections.combinedSet = new Set([node.id]);
    upperSet.forEach(id => connections.combinedSet.add(id));
    lowerSet.forEach(id => connections.combinedSet.add(id));
    
    // Pre-compute direct connections set
    connections.directUpward.forEach(id => connections.directSet.add(id));
    connections.directDownward.forEach(id => connections.directSet.add(id));
  });
  
  // Pre-compute which links are in each node's combined set
  const nodeLinkSets = new Map();
  const nodeDirectLinks = new Map();
  
  nodes.forEach(node => {
    const connections = nodeConnections.get(node.id);
    const combinedSet = connections.combinedSet;
    
    const inSetLinks = [];
    const directLinks = [];
    
    links.forEach((link, i) => {
      const sourceInSet = combinedSet.has(link.source);
      const targetInSet = combinedSet.has(link.target);
      if (sourceInSet && targetInSet) {
        inSetLinks.push(i);
      }
      if (link.source === node.id || link.target === node.id) {
        directLinks.push(i);
      }
    });
    
    nodeLinkSets.set(node.id, inSetLinks);
    nodeDirectLinks.set(node.id, directLinks);
  });

  // ============================================
  // INTERACTION (Optimized)
  // ============================================
  
  // Store references to DOM elements for fast access
  const nodePillElements = nodeSelection.select('.node-pill').nodes();
  const nodeLabelElements = nodeSelection.select('.node-label').nodes();
  const linkPathElements = linkSelection.select('.link-path').nodes();
  const linkLabelElements = linkLabelSelection.nodes();
  
  // Create maps for quick index lookup
  const nodeIndexMap = new Map();
  nodes.forEach((node, i) => nodeIndexMap.set(node.id, i));
  
  let isHovering = false;
  
  nodeSelection
    .on('mouseenter', function(event, d) {
      if (isHovering) return; // Debounce
      isHovering = true;
      
      const connections = nodeConnections.get(d.id);
      const combinedSet = connections.combinedSet;
      const directSet = connections.directSet;
      const inSetLinkIndices = nodeLinkSets.get(d.id);
      const directLinkIndices = nodeDirectLinks.get(d.id);
      
      // Add hovering class to SVG
      svg.classed('hovering', true);
      
      // Batch DOM updates
      requestAnimationFrame(() => {
        // Update nodes
        nodes.forEach((node, i) => {
          const isInSet = combinedSet.has(node.id);
          const isHovered = node.id === d.id;
          const isDirect = directSet.has(node.id);
          
          nodePillElements[i].classList.toggle('in-set', isInSet);
          nodePillElements[i].classList.toggle('is-hovered', isHovered);
          nodePillElements[i].classList.toggle('is-direct', isDirect);
          nodeLabelElements[i].classList.toggle('in-set', isInSet);
        });
        
        // Update links - mark all as not in set first, then mark in-set ones
        const inSetLinkSet = new Set(inSetLinkIndices);
        const directLinkSet = new Set(directLinkIndices);
        
        links.forEach((link, i) => {
          const isInSet = inSetLinkSet.has(i);
          const isDirect = directLinkSet.has(i);
          
          linkPathElements[i].classList.toggle('in-set', isInSet);
          linkLabelElements[i].classList.toggle('is-direct', isDirect);
        });
      });
    })
    .on('mouseleave', function() {
      isHovering = false;
      
      // Remove hovering class
      svg.classed('hovering', false);
      
      requestAnimationFrame(() => {
        // Remove all highlight classes
        nodePillElements.forEach(el => {
          el.classList.remove('in-set', 'is-hovered', 'is-direct');
        });
        nodeLabelElements.forEach(el => {
          el.classList.remove('in-set');
        });
        linkPathElements.forEach(el => {
          el.classList.remove('in-set');
        });
        linkLabelElements.forEach(el => {
          el.classList.remove('is-direct');
        });
      });
    });

  // ============================================
  // LEVEL LABELS (Linear only)
  // ============================================
  
  const levelLabels = zoomableGroup.append('g').attr('class', 'level-labels');
  
  if (layoutType === 'linear') {
    // Linear: labels above each column
    const levelData = [];
    for (let level = minLevel; level <= maxLevel; level++) {
      const levelNodes = nodes.filter(n => n.level === level);
      if (levelNodes.length > 0) {
        const firstNode = levelNodes.reduce((min, n) => n.index < min.index ? n : min, levelNodes[0]);
        levelData.push({
          level,
          label: "Order " + Math.pow(2, level),
          x: firstNode.x,
          y: firstNode.y
        });
      }
    }

    levelLabels.selectAll('.level-label')
      .data(levelData)
      .join('text')
      .attr('class', 'level-label')
      .attr('x', d => d.x)
      .attr('y', d => d.y - 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', '#888')
      .attr('font-weight', '500')
      .text(d => d.label);
  }
  // No level labels for radial layout

  // ============================================
  // DYNAMIC LEGEND
  // ============================================
  
  let legendExpanded = false;
  
  const presentClasses = new Set(nodes.map(n => n.class));
  const colorLegendData = [
    { class: 'abelian', label: 'Abelian', color: '#1a1a1a' },
    { class: 'non-abelian', label: 'Non-abelian', color: '#2563eb' }
  ].filter(item => presentClasses.has(item.class));

  const presentTypes = new Set(links.map(l => l.type));
  const allOperationsData = [
    { type: 'direct', symbol: '×', label: 'Direct product', color: '#000' },
    { type: 'semidirect', symbol: '⋊', label: 'Semidirect product', color: '#2563eb' },
    { type: 'non-split-central', symbol: '↑', label: 'Central extension', color: '#16a34a' },
    { type: 'non-split-non-central', symbol: '⋊̸', label: 'Non-central non-split', color: '#16a34a' }
  ];
  const operationsData = allOperationsData.filter(item => presentTypes.has(item.type));

  const presentGroupTypes = new Set();
  nodes.forEach(node => {
    const desc = node.desc;
    const label = node.label;
    if (/^C\d/.test(desc)) presentGroupTypes.add('cyclic');
    if (/^E\d/.test(label)) presentGroupTypes.add('elementary');
    if (/^D\d/.test(desc)) presentGroupTypes.add('dihedral');
    if (/^Q\d/.test(desc) && !/^QD/.test(desc)) presentGroupTypes.add('quaternion');
    if (/^SD\d/.test(label) || /^QD\d/.test(desc)) presentGroupTypes.add('semidihedral');
    if (/^M\d/.test(label)) presentGroupTypes.add('modular');
    if (/^He\d/.test(label) || /^Γ/.test(desc) || /^Pauli/.test(desc)) presentGroupTypes.add('heisenberg');
  });

  const allNotationData = [
    { type: 'cyclic', symbol: 'Cₙ', label: 'Cyclic' },
    { type: 'elementary', symbol: 'Eₙ', label: 'Elementary abelian' },
    { type: 'dihedral', symbol: 'D₂ₙ', label: 'Dihedral' },
    { type: 'quaternion', symbol: 'Qₙ', label: 'Quaternion' },
    { type: 'semidihedral', symbol: 'SDₙ', label: 'Semi-dihedral' },
    { type: 'modular', symbol: 'Mₙ', label: 'Modular' },
    { type: 'heisenberg', symbol: 'Heₚ', label: 'Heisenberg' }
  ];
  const notationData = allNotationData.filter(item => presentGroupTypes.has(item.type));

  const legendGroup = fixedGroup.append('g')
    .attr('class', 'combined-legend')
    .attr('transform', 'translate(0, 0)');

  // Measure text widths
  const measureSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const measureText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  measureText.setAttribute('font-size', '11px');
  measureText.setAttribute('font-family', "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace");
  measureSvg.appendChild(measureText);
  document.body.appendChild(measureSvg);

  let groupMaxWidth = 0;
  notationData.forEach(item => {
    measureText.textContent = item.symbol + ' ' + item.label;
    const w = measureText.getBBox().width;
    groupMaxWidth = Math.max(groupMaxWidth, w);
  });

  let operationsMaxWidth = 0;
  operationsData.forEach(item => {
    measureText.textContent = item.symbol + ' ' + item.label;
    const w = measureText.getBBox().width + 46;
    operationsMaxWidth = Math.max(operationsMaxWidth, w);
  });

  let classesMaxWidth = 0;
  colorLegendData.forEach(item => {
    measureText.textContent = item.label;
    const textWidth = measureText.getBBox().width;
    const pillWidth = textWidth + 16;
    classesMaxWidth = Math.max(classesMaxWidth, pillWidth);
  });

  document.body.removeChild(measureSvg);

  const hasNotation = notationData.length > 0;
  const hasOperations = operationsData.length > 0;
  const hasClasses = colorLegendData.length > 0;

  // Single column layout
  const leftPadding = 12;
  const rightPadding = 12;
  const sectionSpacing = 16;
  const itemHeight = 20;
  const classItemHeight = 24;
  
  // Calculate total width based on widest content
  const contentWidth = Math.max(groupMaxWidth, operationsMaxWidth, classesMaxWidth);
  const totalWidth = leftPadding + contentWidth + rightPadding;
  
  // Calculate heights for each section
  const groupSectionHeight = hasNotation ? 20 + notationData.length * itemHeight : 0;
  const classSectionHeight = hasClasses ? 20 + colorLegendData.length * classItemHeight : 0;
  const operationsSectionHeight = hasOperations ? 20 + operationsData.length * itemHeight : 0;
  
  // Calculate Y positions for each section (ORDER: GROUP, CLASS, OPERATIONS)
  let currentY = 10;
  const groupY = currentY;
  if (hasNotation) currentY += groupSectionHeight + sectionSpacing;
  const classY = currentY;
  if (hasClasses) currentY += classSectionHeight + sectionSpacing;
  const operationsY = currentY;
  if (hasOperations) currentY += operationsSectionHeight;
  
  const legendContentHeight = currentY + 10;

  const legendBg = legendGroup.append('path')
    .attr('class', 'legend-bg')
    .attr('d', 'M 0 0 L 100 0 L 100 20 Q 100 28, 92 28 L 0 28 Z')
    .attr('fill', '#ffffff')
    .attr('fill-opacity', 0.85)
    .attr('stroke', '#ddd')
    .attr('stroke-width', 1)
    .attr('filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))');

  const toggleButton = legendGroup.append('g')
    .attr('class', 'legend-toggle');

  const toggleBg = toggleButton.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', 28)
    .attr('rx', 8)
    .attr('fill', 'transparent');

  const collapsedTitle = toggleButton.append('text')
    .attr('class', 'collapsed-title')
    .attr('x', 12)
    .attr('y', 14)
    .attr('font-size', '12px')
    .attr('font-weight', '600')
    .attr('fill', '#555')
    .attr('dominant-baseline', 'middle')
    .attr('opacity', 1)
    .text('Legend');

  const toggleIcon = toggleButton.append('path')
    .attr('class', 'toggle-icon')
    .attr('d', 'M -3 0 L 1 4 L -3 8')
    .attr('transform', 'translate(85, 10)')
    .attr('fill', 'none')
    .attr('stroke', '#666')
    .attr('stroke-width', 2)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  const legendContent = legendGroup.append('g')
    .attr('class', 'legend-content')
    .attr('opacity', 0)
    .style('display', 'none');

  // GROUP section
  if (hasNotation) {
    legendContent.append('text')
      .attr('x', leftPadding)
      .attr('y', groupY + 12)
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#888')
      .attr('dominant-baseline', 'middle')
      .text('GROUP');

    const notationItems = legendContent.append('g').attr('class', 'notation-items');
    const notationItemGroups = notationItems.selectAll('.notation-item')
      .data(notationData)
      .join('g')
      .attr('class', 'notation-item')
      .attr('transform', (d, i) => `translate(${leftPadding}, ${groupY + 28 + i * itemHeight})`);

    notationItemGroups.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '15px')
      .attr('font-weight', '500')
      .attr('fill', '#1a1a1a')
      .attr('dominant-baseline', 'middle')
      .text(d => d.symbol);

    notationItemGroups.append('text')
      .attr('x', 28)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('fill', '#666')
      .attr('dominant-baseline', 'middle')
      .text(d => d.label);
  }

  // CLASS section
  if (hasClasses) {
    legendContent.append('text')
      .attr('x', leftPadding)
      .attr('y', classY + 12)
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#888')
      .attr('dominant-baseline', 'middle')
      .text('CLASS');

    // Measure pill widths
    colorLegendData.forEach(d => {
      const tempMeasure = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const tempMeasureText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tempMeasureText.setAttribute('font-size', '11px');
      tempMeasureText.setAttribute('font-weight', '500');
      tempMeasure.appendChild(tempMeasureText);
      document.body.appendChild(tempMeasure);
      tempMeasureText.textContent = d.label;
      const textWidth = tempMeasureText.getBBox().width;
      d.pillWidth = textWidth + 16;
      document.body.removeChild(tempMeasure);
    });

    const colorItems = legendContent.append('g').attr('class', 'color-items');
    const colorItemGroups = colorItems.selectAll('.color-item')
      .data(colorLegendData)
      .join('g')
      .attr('class', 'color-item')
      .attr('transform', (d, i) => `translate(${leftPadding}, ${classY + 28 + i * classItemHeight})`);

    colorItemGroups.append('rect')
      .attr('x', 0)
      .attr('y', -8)
      .attr('width', d => d.pillWidth)
      .attr('height', 16)
      .attr('rx', 8)
      .attr('ry', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5);

    colorItemGroups.append('text')
      .attr('x', d => d.pillWidth / 2)
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('fill', '#ffffff')
      .attr('dominant-baseline', 'middle')
      .text(d => d.label);
  }

  // OPERATIONS section
  if (hasOperations) {
    legendContent.append('text')
      .attr('x', leftPadding)
      .attr('y', operationsY + 12)
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#888')
      .attr('dominant-baseline', 'middle')
      .text('OPERATIONS');

    const operationItems = legendContent.append('g').attr('class', 'operation-items');
    const operationItemGroups = operationItems.selectAll('.operation-item')
      .data(operationsData)
      .join('g')
      .attr('class', 'operation-item')
      .attr('transform', (d, i) => `translate(${leftPadding}, ${operationsY + 28 + i * itemHeight})`);

    operationItemGroups.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 24)
      .attr('y2', 0)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2.5);

    operationItemGroups.append('text')
      .attr('x', 32)
      .attr('y', 0)
      .attr('font-size', '13px')
      .attr('font-weight', '500')
      .attr('fill', '#1a1a1a')
      .attr('dominant-baseline', 'middle')
      .text(d => d.symbol);

    operationItemGroups.append('text')
      .attr('x', 46)
      .attr('y', 0)
      .attr('font-size', '11px')
      .attr('fill', '#666')
      .attr('dominant-baseline', 'middle')
      .text(d => d.label);
  }

  function updateLegendState() {
    const contentOpacity = legendExpanded ? 1 : 0;
    const bgPath = legendExpanded 
      ? `M 0 0 L ${totalWidth} 0 L ${totalWidth} ${legendContentHeight - 8} Q ${totalWidth} ${legendContentHeight}, ${totalWidth - 8} ${legendContentHeight} L 0 ${legendContentHeight} Z`
      : 'M 0 0 L 100 0 L 100 20 Q 100 28, 92 28 L 0 28 Z';
    const toggleWidth = legendExpanded ? totalWidth : 100;
    const arrowPath = legendExpanded ? 'M 0 -3 L 4 1 L 8 -3' : 'M -3 0 L 1 4 L -3 8';
    const arrowTransform = legendExpanded ? `translate(${totalWidth - 24}, 18)` : 'translate(85, 10)';

    legendContent.transition()
      .duration(200)
      .attr('opacity', contentOpacity)
      .on('end', function() {
        if (!legendExpanded) {
          d3.select(this).style('display', 'none');
        }
      });
    
    if (legendExpanded) {
      legendContent.style('display', 'block').attr('opacity', 0);
      legendContent.transition().duration(200).attr('opacity', 1);
    }

    if (legendExpanded) {
      collapsedTitle.transition().duration(200).attr('opacity', 0)
        .on('end', function() { d3.select(this).style('display', 'none'); });
    } else {
      collapsedTitle.style('display', 'block').attr('opacity', 0)
        .transition().duration(200).attr('opacity', 1);
    }

    legendBg.transition()
      .duration(200)
      .attr('d', bgPath);

    toggleBg.transition()
      .duration(200)
      .attr('width', toggleWidth);

    toggleIcon.transition()
      .duration(200)
      .attr('d', arrowPath)
      .attr('transform', arrowTransform);
  }

  toggleButton.on('click', function() {
    legendExpanded = !legendExpanded;
    updateLegendState();
  });

  // ============================================
  // ZOOM AND INITIAL TRANSFORM
  // ============================================
  
  const zoom = d3.zoom()
    .scaleExtent(config.zoomExtent)
    .on('zoom', (event) => {
      zoomableGroup.attr('transform', event.transform);
    });

  svg.call(zoom);

  // Calculate bounding box
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  nodes.forEach(node => {
    const nodeLeft = node.x - node.pillWidth / 2;
    const nodeRight = node.x + node.pillWidth / 2;
    const nodeTop = node.y - node.pillHeight / 2;
    const nodeBottom = node.y + node.pillHeight / 2;
    
    minX = Math.min(minX, nodeLeft);
    maxX = Math.max(maxX, nodeRight);
    minY = Math.min(minY, nodeTop);
    maxY = Math.max(maxY, nodeBottom);
  });
  
  // Add padding for labels
  if (layoutType === 'linear') {
    minY -= 50; // Space for level labels
  } else {
    // For radial, expand bounds symmetrically
    const maxExtent = Math.max(Math.abs(minX), Math.abs(maxX), Math.abs(minY), Math.abs(maxY)) + 50;
    minX = -maxExtent;
    maxX = maxExtent;
    minY = -maxExtent;
    maxY = maxExtent;
  }
  
  const boundingWidth = maxX - minX;
  const boundingHeight = maxY - minY;
  const boundingCenterX = minX + boundingWidth / 2;
  const boundingCenterY = minY + boundingHeight / 2;
  
  const padding = config.boundingPadding;
  const availableWidth = containerWidth - 2 * padding;
  const availableHeight = containerHeight - 2 * padding;
  
  // Calculate scale to fit content
  // Only limit maximum initial zoom for small graphs (3 or fewer levels) to prevent over-zooming
  const numLevels = maxLevel - minLevel + 1;
  let scale = Math.min(
    availableWidth / boundingWidth,
    availableHeight / boundingHeight
  );
  
  // For small graphs, cap the initial zoom to prevent them from being too large
  if (numLevels <= 3) {
    scale = Math.min(scale, 2.0);
  }
  
  const scaledCenterX = boundingCenterX * scale;
  const scaledCenterY = boundingCenterY * scale;
  const viewportCenterX = containerWidth / 2;
  const viewportCenterY = containerHeight / 2;
  
  const translateX = viewportCenterX - scaledCenterX;
  const translateY = viewportCenterY - scaledCenterY;
  
  const initialTransform = d3.zoomIdentity
    .translate(translateX, translateY)
    .scale(scale);
  
  svg.call(zoom.transform, initialTransform);

  return svg.node();
}


function _layoutData(controls,data,d3,crossingSettings,layerCrossingUtils)
{
  const maxLevels = controls.maxLevels;
  const layoutMode = controls.layout;

  function toSubscript(num) {
    const subscripts = "₀₁₂₃₄₅₆₇₈₉";
    return String(num)
      .split("")
      .map((d) => subscripts[parseInt(d)])
      .join("");
  }

  function toSuperscript(num) {
    const superscripts = "⁰¹²³⁴⁵⁶⁷⁸⁹";
    return String(num)
      .split("")
      .map((d) => superscripts[parseInt(d)])
      .join("");
  }

  function simplifyGroupName(desc) {
    let result = desc;
    const p = 2;

    const elementaryPattern2 = /^(C2\s*[@x]\s*)+C2$/;
    if (elementaryPattern2.test(result)) {
      const count = (result.match(/C2/g) || []).length;
      const order = Math.pow(2, count);
      return "E" + order;
    }

    const elementaryPatternP = new RegExp(
      "^(C" + p + "\\s*[@x]\\s*)+C" + p + "$"
    );
    if (elementaryPatternP.test(result)) {
      const count = (result.match(new RegExp("C" + p, "g")) || []).length;
      const order = Math.pow(p, count);
      return "E" + order;
    }

    if (/^C2\s*[@x]\s*C2$/.test(result)) return "E4";

    result = result.replace(/QD(\d+)/g, "SD$1");

    const heisenbergPattern = /^\(C(\d+)\s*[@x]\s*C\1\)\s*[:#]\s*C\1$/;
    const heisMatch = result.match(heisenbergPattern);
    if (heisMatch) {
      const prime = heisMatch[1];
      return "He" + prime;
    }

    return result;
  }

  function formatLabel(desc) {
    let simplified = simplifyGroupName(desc);

    const parts = [];
    const ops = [];
    let current = "";
    let i = 0;

    while (i < simplified.length) {
      const char = simplified[i];
      if (
        char === "@" ||
        char === "#" ||
        char === "." ||
        char === "~" ||
        char === "*" ||
        char === "x"
      ) {
        if (current.trim()) parts.push(current.trim());

        let op = char;
        if (i + 1 < simplified.length && /\d/.test(simplified[i + 1])) {
          let suffix = "";
          i++;
          while (i < simplified.length && /\d/.test(simplified[i])) {
            suffix += simplified[i];
            i++;
          }
          op += suffix;
          i--;
        }

        ops.push(op);
        current = "";
      } else if (char === " ") {
      } else {
        current += char;
      }
      i++;
    }
    if (current.trim()) parts.push(current.trim());

    const allDirect = ops.every(
      (op) => op === "@" || op === "x" || /^@\d+$/.test(op)
    );
    if (allDirect && parts.length > 0) {
      let elementaryOrder = 1;
      const primeCyclics = [];
      const otherParts = [];
      let hasElementary = false;

      parts.forEach((part) => {
        const elemMatch = part.match(/^E(\d+)$/);
        if (elemMatch) {
          elementaryOrder *= parseInt(elemMatch[1]);
          hasElementary = true;
          return;
        }

        const cyclicMatch = part.match(/^C(\d+)$/);
        if (cyclicMatch) {
          const order = parseInt(cyclicMatch[1]);
          const isPrime =
            order > 1 &&
            (() => {
              for (let j = 2; j <= Math.sqrt(order); j++)
                if (order % j === 0) return false;
              return true;
            })();
          if (isPrime) primeCyclics.push({ order, label: part });
          else otherParts.push({ type: "cyclic", order, label: part });
          return;
        }

        const orderMatch = part.match(/(\d+)/);
        const order = orderMatch ? parseInt(orderMatch[1]) : 0;
        otherParts.push({ type: "other", order, label: part });
      });

      const shouldConsolidate = hasElementary || primeCyclics.length > 1;

      if (shouldConsolidate) {
        primeCyclics.forEach((pc) => (elementaryOrder *= pc.order));
        if (elementaryOrder > 1)
          otherParts.push({
            type: "elementary",
            order: elementaryOrder,
            label: "E" + elementaryOrder
          });
      } else {
        primeCyclics.forEach((pc) =>
          otherParts.push({ type: "cyclic", order: pc.order, label: pc.label })
        );
        if (hasElementary && elementaryOrder > 1)
          otherParts.push({
            type: "elementary",
            order: elementaryOrder,
            label: "E" + elementaryOrder
          });
      }

      otherParts.sort((a, b) => b.order - a.order);

      if (otherParts.length > 0)
        simplified = otherParts.map((p) => p.label).join("×");
    }

    return simplified
      .replace(/@/g, "×")
      .replace(/#/g, "⋊")
      .replace(/\./g, "↑")
      .replace(/~/g, "⋊̸")
      .replace(/\*/g, "○")
      .replace(/(\d+)/g, (match) => toSubscript(match))
      .replace(/\s+/g, "");
  }

  function formatFormula(formula, sourceLabel, linkType) {
    let operation = "×";
    if (
      linkType === "semidirect" ||
      linkType === "semidirect product" ||
      linkType === "split non-central"
    )
      operation = "⋊";
    else if (
      linkType === "non-split-central" ||
      linkType === "non-split central" ||
      linkType === "central extension"
    )
      operation = "↑";
    else if (
      linkType === "non-split-non-central" ||
      linkType === "non-split non-central" ||
      linkType === "non-central non-split"
    )
      operation = "⋊̸";

    let operationSuffix = "";
    const suffixMatch = formula.match(/[@#.~]\d+/);
    if (suffixMatch) {
      const digits = suffixMatch[0].match(/\d+/);
      if (digits) operationSuffix = toSubscript(digits[0]);
    }

    return sourceLabel + operation + operationSuffix + "C" + toSubscript(2);
  }

  const typeMap = {
    "direct product": "direct",
    "split central": "direct",
    "semidirect product": "semidirect",
    "split non-central": "semidirect",
    "non-split central": "non-split-central",
    "central extension": "non-split-central",
    "non-split non-central": "non-split-non-central",
    "non-central non-split": "non-split-non-central"
  };

  const nodes = data.nodes
    .filter((node) => Math.log2(node.gapIndex[0]) <= maxLevels)
    .map((node) => ({
      ...node,
      label: formatLabel(node.desc),
      level: Math.log2(node.gapIndex[0]),
      order: node.gapIndex[0],
      class: node.isAbelian ? "abelian" : "non-abelian"
    }));

  const nodeIds = new Set(nodes.map((n) => n.id));
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const links = data.links
    .filter((link) => nodeIds.has(link.source) && nodeIds.has(link.target))
    .map((link) => {
      const sourceNode = nodeMap.get(link.source);
      const mappedType = typeMap[link.type] || link.type;
      return {
        ...link,
        label: formatFormula(
          link.formula,
          sourceNode ? sourceNode.label : "",
          link.type
        ),
        type: mappedType
      };
    });

  const config = {
    levelWidth: 200,
    minNodeSpacing: 36,
    paddingLeft: 50,
    paddingRight: 120,
    paddingY: 70,
    boundingPadding: 20,
    zoomExtent: [0.1, 4],
    transitionDuration: 100,
    radialMinOuterRadius: 150,
    radialLevelSpacing: 60
  };

  function computeLinearLayout(nodes, links, config) {
    const { levelWidth, minNodeSpacing, paddingLeft, paddingRight, paddingY } =
      config;
    const levels = d3.group(nodes, (d) => d.level);
    const maxLevel = d3.max(nodes, (d) => d.level);
    const minLevel = d3.min(nodes, (d) => d.level);

    for (const [level, levelNodes] of levels)
      levelNodes.forEach((node, i) => (node.index = i));

    function getLinksBetweenLevels(lowerLevel, upperLevel) {
      return links.filter((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        return (
          sourceNode &&
          targetNode &&
          sourceNode.level === lowerLevel &&
          targetNode.level === upperLevel
        );
      });
    }

    function optimizeLevel(levelToOptimize, fixedLevel, isUpperFixed) {
      const levelNodes = levels.get(levelToOptimize);
      const fixedNodes = levels.get(fixedLevel);
      const levelLinks = getLinksBetweenLevels(
        isUpperFixed ? levelToOptimize : fixedLevel,
        isUpperFixed ? fixedLevel : levelToOptimize
      );

      levelNodes.forEach((node) => {
        const connectedLinks = levelLinks.filter((link) =>
          isUpperFixed ? link.source === node.id : link.target === node.id
        );
        if (connectedLinks.length > 0) {
          const sum = connectedLinks.reduce((acc, link) => {
            const connectedId = isUpperFixed ? link.target : link.source;
            const connectedNode = fixedNodes.find((n) => n.id === connectedId);
            return acc + (connectedNode ? connectedNode.index : 0);
          }, 0);
          node.barycenter = sum / connectedLinks.length;
        } else node.barycenter = node.index;
      });

      levelNodes.sort((a, b) => a.barycenter - b.barycenter);
      levelNodes.forEach((node, i) => (node.index = i));
    }

    for (let level = maxLevel; level > minLevel; level--)
      optimizeLevel(level - 1, level, true);
    for (let level = minLevel; level < maxLevel; level++)
      optimizeLevel(level + 1, level, false);
    for (let pass = 0; pass < 3; pass++) {
      for (let level = maxLevel; level > minLevel; level--)
        optimizeLevel(level - 1, level, true);
      for (let level = minLevel; level < maxLevel; level++)
        optimizeLevel(level + 1, level, false);
    }

    nodes.forEach(
      (node) => (node.x = paddingLeft + (node.level - minLevel) * levelWidth)
    );

    const highestLevelNodes = levels.get(maxLevel);
    highestLevelNodes.sort((a, b) => a.index - b.index);
    const totalHeight = (highestLevelNodes.length - 1) * minNodeSpacing;

    highestLevelNodes.forEach(
      (node, i) => (node.y = paddingY + i * minNodeSpacing)
    );

    for (let level = maxLevel - 1; level >= minLevel; level--) {
      const currentLevelNodes = levels.get(level);
      currentLevelNodes.sort((a, b) => a.index - b.index);

      currentLevelNodes.forEach((node) => {
        const connectedLinks = links.filter((link) => link.source === node.id);
        const connectedNodes = connectedLinks
          .map((link) => nodes.find((n) => n.id === link.target))
          .filter(Boolean);
        node.y =
          connectedNodes.length > 0
            ? d3.mean(connectedNodes, (n) => n.y)
            : paddingY + node.index * minNodeSpacing;
      });

      currentLevelNodes.sort((a, b) => a.index - b.index);
      for (let i = 1; i < currentLevelNodes.length; i++) {
        const prev = currentLevelNodes[i - 1];
        const curr = currentLevelNodes[i];
        if (curr.y - prev.y < minNodeSpacing) curr.y = prev.y + minNodeSpacing;
      }

      const levelMinY = d3.min(currentLevelNodes, (n) => n.y);
      const levelMaxY = d3.max(currentLevelNodes, (n) => n.y);
      const levelCenter = (levelMinY + levelMaxY) / 2;
      const targetCenter = paddingY + totalHeight / 2;
      const adjustment = (targetCenter - levelCenter) * 0.3;
      currentLevelNodes.forEach((node) => (node.y += adjustment));
    }

    const calculatedWidth =
      paddingLeft + paddingRight + (maxLevel - minLevel) * levelWidth;
    const calculatedHeight = paddingY * 2 + d3.max(nodes, (n) => n.y);

    return {
      nodes,
      links,
      width: calculatedWidth,
      height: calculatedHeight,
      maxLevel,
      minLevel,
      paddingLeft,
      layoutType: "linear"
    };
  }

  function computeRadialLayout(nodes, links, config) {
    const { radialLevelSpacing, radialMinOuterRadius } = config;
    const levels = d3.group(nodes, (d) => d.level);
    const maxLevel = d3.max(nodes, (d) => d.level);
    const minLevel = d3.min(nodes, (d) => d.level);
    const numLevels = maxLevel - minLevel + 1;

    for (const [level, levelNodes] of levels)
      levelNodes.forEach((node, i) => (node.index = i));

    function getLinksBetweenLevels(lowerLevel, upperLevel) {
      return links.filter((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        return (
          sourceNode &&
          targetNode &&
          sourceNode.level === lowerLevel &&
          targetNode.level === upperLevel
        );
      });
    }

    function circularMean(angles) {
      if (angles.length === 0) return 0;
      let sumSin = 0,
        sumCos = 0;
      for (const a of angles) {
        sumSin += Math.sin(a);
        sumCos += Math.cos(a);
      }
      return Math.atan2(sumSin / angles.length, sumCos / angles.length);
    }

    function normalizeAngle(angle) {
      while (angle > Math.PI) angle -= 2 * Math.PI;
      while (angle < -Math.PI) angle += 2 * Math.PI;
      return angle;
    }

    const pillHeight = 24;
    function minAngularGap(radius) {
      if (radius === 0) return 0;
      return (pillHeight * 2) / radius;
    }

    const highestLevelNodes = levels.get(maxLevel);
    highestLevelNodes.forEach((node, i) => (node.index = i));
    const n = highestLevelNodes.length;
    highestLevelNodes.sort((a, b) => a.index - b.index);
    highestLevelNodes.forEach(
      (node, i) => (node.angle = n === 1 ? 0 : (2 * Math.PI * i) / n)
    );

    const levelRadii = new Map();

    const highestCount = highestLevelNodes.length;
    const highestCircumference = highestCount * pillHeight * 2;
    const outerRadius = Math.max(
      radialMinOuterRadius,
      highestCircumference / (2 * Math.PI)
    );
    levelRadii.set(maxLevel, outerRadius);

    const lowestLevelNodes = levels.get(minLevel);
    const lowestCount = lowestLevelNodes.length;
    let innerRadius;
    if (lowestCount === 1) innerRadius = 0;
    else {
      const lowestCircumference = lowestCount * pillHeight * 2;
      innerRadius = lowestCircumference / (2 * Math.PI);
    }
    levelRadii.set(minLevel, innerRadius);

    if (numLevels > 2) {
      const densityRadii = new Map();
      for (let level = minLevel + 1; level < maxLevel; level++) {
        const levelNodes = levels.get(level);
        const nodeCount = levelNodes.length;
        const requiredCircumference = nodeCount * pillHeight * 2;
        densityRadii.set(level, requiredCircumference / (2 * Math.PI));
      }
      const levelSpacing = (outerRadius - innerRadius) / (numLevels - 1);
      for (let level = minLevel + 1; level < maxLevel; level++) {
        const levelIndex = level - minLevel;
        const evenlySpacedRadius = innerRadius + levelIndex * levelSpacing;
        const densityRadius = densityRadii.get(level);
        const blendedRadius = (evenlySpacedRadius + densityRadius) / 2;
        levelRadii.set(level, blendedRadius);
      }
    }

    for (let level = maxLevel - 1; level >= minLevel; level--) {
      const levelNodes = levels.get(level);
      const outerLevel = level + 1;
      const outerNodes = levels.get(outerLevel);
      const levelLinks = getLinksBetweenLevels(level, outerLevel);
      const radius = levelRadii.get(level);

      if (levelNodes.length === 1 && radius === 0) {
        levelNodes[0].angle = 0;
        continue;
      }

      levelNodes.forEach((node) => {
        const connectedLinks = levelLinks.filter(
          (link) => link.source === node.id
        );
        if (connectedLinks.length > 0) {
          const connectedAngles = connectedLinks.map((link) => {
            const connectedNode = outerNodes.find((n) => n.id === link.target);
            return connectedNode ? connectedNode.angle : 0;
          });
          node.targetAngle = circularMean(connectedAngles);
        } else
          node.targetAngle = (2 * Math.PI * node.index) / levelNodes.length;
      });

      levelNodes.sort(
        (a, b) => normalizeAngle(a.targetAngle) - normalizeAngle(b.targetAngle)
      );

      levelNodes.forEach((node, i) => {
        node.index = i;
        node.angle = node.targetAngle;
      });

      const minGap = minAngularGap(radius);
      const maxIterations = 50;

      for (let iter = 0; iter < maxIterations; iter++) {
        let hasOverlap = false;

        for (let i = 0; i < levelNodes.length; i++) {
          const curr = levelNodes[i];
          const next = levelNodes[(i + 1) % levelNodes.length];

          let gap = next.angle - curr.angle;
          if (i === levelNodes.length - 1)
            gap = next.angle + 2 * Math.PI - curr.angle;
          gap = normalizeAngle(gap);
          if (gap < 0) gap += 2 * Math.PI;

          if (gap < minGap) {
            hasOverlap = true;
            const adjustment = (minGap - gap) / 2;
            curr.angle = normalizeAngle(curr.angle - adjustment);
            next.angle = normalizeAngle(next.angle + adjustment);
          }
        }

        levelNodes.forEach((node) => {
          const diff = normalizeAngle(node.targetAngle - node.angle);
          node.angle = normalizeAngle(node.angle + diff * 0.1);
        });

        if (!hasOverlap) break;
      }

      let hasOverlap = false;
      for (let i = 0; i < levelNodes.length; i++) {
        const curr = levelNodes[i];
        const next = levelNodes[(i + 1) % levelNodes.length];
        let gap = next.angle - curr.angle;
        if (i === levelNodes.length - 1)
          gap = next.angle + 2 * Math.PI - curr.angle;
        gap = normalizeAngle(gap);
        if (gap < 0) gap += 2 * Math.PI;
        if (gap < minGap * 0.9) {
          hasOverlap = true;
          break;
        }
      }

      if (hasOverlap) {
        const nodeCount = levelNodes.length;
        let bestNode = levelNodes[0];
        let bestDiff = Math.abs(
          normalizeAngle(levelNodes[0].targetAngle - levelNodes[0].angle)
        );
        levelNodes.forEach((node) => {
          const diff = Math.abs(normalizeAngle(node.targetAngle - node.angle));
          if (diff < bestDiff) {
            bestDiff = diff;
            bestNode = node;
          }
        });

        const startAngle = bestNode.targetAngle;
        const anchorIndex = levelNodes.indexOf(bestNode);
        levelNodes.forEach((node, i) => {
          const offset = i - anchorIndex;
          node.angle = normalizeAngle(
            startAngle + (2 * Math.PI * offset) / nodeCount
          );
        });
      }
    }

    nodes.forEach((node) => {
      const radius = levelRadii.get(node.level);
      node.radius = radius;
      if (radius === 0) {
        node.x = 0;
        node.y = 0;
        node.angle = 0;
      } else {
        node.x = radius * Math.cos(node.angle);
        node.y = radius * Math.sin(node.angle);
      }
    });

    const maxRadius = outerRadius + 60;
    const size = maxRadius * 2 + 100;

    return {
      nodes,
      links,
      width: size,
      height: size,
      maxLevel,
      minLevel,
      centerX: size / 2,
      centerY: size / 2,
      levelRadii,
      layoutType: "radial"
    };
  }

  const result =
    layoutMode === "radial"
      ? computeRadialLayout([...nodes], links, config)
      : computeLinearLayout([...nodes], links, config);

  if (result.layoutType === "linear" && (crossingSettings?.enable ?? true)) {
    const opt = layerCrossingUtils.optimizeOrders(
      result.nodes,
      result.links,
      crossingSettings
    );

    const nodeById = new Map(result.nodes.map((n) => [n.id, n]));
    const byLevel = d3.group(result.nodes, (d) => d.level);

    for (const [L, levelNodes] of byLevel) {
      const order = opt.ordersByLevel.get(L);
      if (!order) continue;

      const oldYs = levelNodes
        .slice()
        .sort((a, b) => (a.y ?? 0) - (b.y ?? 0))
        .map((d) => d.y);

      for (let i = 0; i < order.length; i++) {
        const n = nodeById.get(order[i]);
        if (!n) continue;
        n.index = i;
        n.y =
          oldYs[i] ??
          (oldYs.length
            ? oldYs[oldYs.length - 1] +
              (i - oldYs.length + 1) * config.minNodeSpacing
            : config.paddingY + i * config.minNodeSpacing);
      }
    }
  }

  return { ...result, config, toSubscript };
}


function _styles(html){return(
html`<style>
  .family-chart {
    max-width: 100%;
    height: auto;
    font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
    border: 1px solid #ddd;
  }
  
  .hover-target {
    pointer-events: all;
    cursor: pointer;
  }
  
  .node-group {
    cursor: pointer;
  }
  
  .link-label {
    pointer-events: none;
  }
  
  .legend-toggle {
    cursor: pointer;
  }
  
  /* Performance-optimized hover states */
  .family-chart.hovering .node-pill { opacity: 0.2; }
  .family-chart.hovering .node-label { opacity: 0.2; }
  .family-chart.hovering .link-path { opacity: 0.08; }
  
  .family-chart.hovering .node-pill.in-set { opacity: 1; }
  .family-chart.hovering .node-label.in-set { opacity: 1; }
  .family-chart.hovering .node-pill.is-hovered { stroke-width: 3px; }
  .family-chart.hovering .node-pill.is-direct { stroke-width: 3px; }
  .family-chart.hovering .link-path.in-set { opacity: 0.9; stroke-width: 2.5px; }
  .family-chart.hovering .link-label.is-direct { opacity: 1; }
  
  /* Tooltip styles */
  .node-tooltip {
    position: absolute;
    pointer-events: none;
    background: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
    font-size: 13px;
    z-index: 1000;
    max-width: 320px;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }
  
  .node-tooltip.visible {
    opacity: 1;
  }
  
  .tooltip-row {
    margin-bottom: 8px;
  }
  
  .tooltip-row:last-child {
    margin-bottom: 0;
  }
  
  .tooltip-label {
    font-size: 10px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  
  .tooltip-value {
    font-size: 14px;
    color: #1a1a1a;
  }
  
  .tooltip-gap {
    font-weight: 600;
    color: #2563eb;
  }
  
  .tooltip-presentation {
    font-size: 13px;
    line-height: 1.4;
  }
  
  .tooltip-generators {
    color: #16a34a;
  }
  
  .tooltip-relations {
    color: #1a1a1a;
  }
  
  .code-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .copy-button {
    padding: 8px 16px;
    background: #4a90d9;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .copy-button:hover {
    background: #357abd;
  }
  .copy-button:active {
    background: #2a5f8f;
  }
  .code-scroll {
    max-height: 300px;
    overflow: auto;
    background: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .code-scroll pre {
    margin: 0;
    padding: 16px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.4;
    white-space: pre;
    width: fit-content;
  }
  .highlight-var {
    background-color: #ffeb3b;
    color: black;
    padding: 1px 3px;
    border-radius: 2px;
  }
</style>`
)}

function _14(md){return(
md`## Generate your own group data using GAP`
)}

function _15(md){return(
md`**G**roups, **A**lgorithms, **P**rogramming is a free, open-source system for computational discrete algebra, with particular emphasis on computational group theory. 

Download from the official GAP website: [https://www.gap-system.org](https://www.gap-system.org). 

Then, **right-click + paste** the following code into GAP. Press **enter** to save a JSON file you can upload to this notebook. Higher order groups will take longer to compute.`
)}

function _params(Inputs){return(
Inputs.form({
  p: Inputs.select([2, 3, 5, 7, 11, 13, 17, 19, 23, 29], {
    label: "Prime number",
    value: 2,
    width: "50px"
  }),
  n: Inputs.select([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
    label: "Number of powers",
    value: 3,
    width: "50px"
  }),
  filename: Inputs.text({
    label: "JSON file name",
    value: "lattice"
  }),
  filepath: Inputs.text({
    label: "JSON save folder",
    value: "paste-folder-path-here",
    width: "500px"
  })
})
)}

function _codeDisplay(html,codeData)
{
  const container = html`<div class="code-container">
    <button class="copy-button">Copy Code to Clipboard</button>
    <div class="code-scroll">
      <pre>${html`${codeData.highlighted}`}</pre>
    </div>
  </div>`;
  
  const button = container.querySelector('.copy-button');
  
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeData.gapCode);
      button.textContent = 'Copied!';
      button.style.background = '#34a853';
      setTimeout(() => {
        button.textContent = 'Copy Code to Clipboard';
        button.style.background = '#4a90d9';
      }, 2000);
    } catch (err) {
      button.textContent = 'Failed to copy';
      button.style.background = '#d93025';
      setTimeout(() => {
        button.textContent = 'Copy Code to Clipboard';
        button.style.background = '#4a90d9';
      }, 2000);
    }
  });
  
  return container;
}


function _codeData(params)
{
  const { p, n, filename, filepath } = params;
  const escapedFilepath = filepath.replace(/\\/g, '/');
  const fullPath = `${escapedFilepath}/${filename}.json`;
  
  const gapCode = `# Parameters
p := ${p};
maxPower := ${n};
filepath := "${fullPath}";

# Function to get presentation
GetPresentation := function(G)
    local F, hom, rels, gens;
    
    hom := IsomorphismFpGroup(G);
    F := Image(hom);
    gens := GeneratorsOfGroup(F);
    rels := RelatorsOfFpGroup(F);
    
    return rec(
        generators := JoinStringsWithSeparator(List(gens, String), ", "),
        relations := JoinStringsWithSeparator(List(rels, String), ", ")
    );
end;

# Function to sanitize structure description for consistent format
SanitizeDesc := function(desc)
    local result;
    result := ReplacedString(desc, " x ", " @ ");
    result := ReplacedString(result, " : ", " # ");
    return result;
end;

# Function to get extension type priority (lower = preferred)
ExtensionPriority := function(extType)
    if extType = "direct product" then
        return 1;
    elif extType = "semidirect product" then
        return 2;
    elif extType = "non-split central" then
        return 3;
    else
        return 4;
    fi;
end;

# Helper to build formula from parts
BuildFormula := function(ext, indexStr)
    return Concatenation(
        ext.leftOperand, 
        " ", 
        ext.operator, 
        indexStr, 
        " ", 
        ext.rightOperand
    );
end;

# Collect all data
allNodes := [];
allLinks := [];

for exp in [1..maxPower] do
    ord := p^exp;
    Print("Processing order ", ord, " (", NrSmallGroups(ord), " groups)...\\n");
    for i in [1..NrSmallGroups(ord)] do
        G := SmallGroup(ord, i);
        pres := GetPresentation(G);
        
        Add(allNodes, rec(
            id := [ord, i],
            desc := SanitizeDesc(StructureDescription(G)),
            isAbelian := IsAbelian(G),
            presentation := pres
        ));
        
        if exp > 1 then
            # Approach: Look for ALL ways G can be built as extension
            # For each normal subgroup N, Q = G/N is the base
            # We want links where |N| = p (extending by Cp)
            
            normalSubsOfOrderP := Filtered(NormalSubgroups(G), N -> Size(N) = p);
            
            for N in normalSubsOfOrderP do
                Q := G / N;
                Qid := IdSmallGroup(Q);
                Qdesc := SanitizeDesc(StructureDescription(Q));
                Cp := Concatenation("C", String(p));
                
                centerG := Center(G);
                isNCentral := IsSubgroup(centerG, N);
                complements := ComplementClassesRepresentatives(G, N);
                
                if Length(complements) > 0 then
                    comp := complements[1];
                    if IsNormal(G, comp) then
                        Add(allLinks, rec(
                            parent := Qid,
                            parentDesc := Qdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "direct product",
                                operator := "@",
                                leftOperand := Qdesc,
                                rightOperand := Cp
                            )
                        ));
                    else
                        Add(allLinks, rec(
                            parent := Qid,
                            parentDesc := Qdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "semidirect product",
                                operator := "#",
                                leftOperand := Cp,
                                rightOperand := Qdesc
                            )
                        ));
                    fi;
                else
                    if isNCentral then
                        Add(allLinks, rec(
                            parent := Qid,
                            parentDesc := Qdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "non-split central",
                                operator := ".",
                                leftOperand := Cp,
                                rightOperand := Qdesc
                            )
                        ));
                    else
                        Add(allLinks, rec(
                            parent := Qid,
                            parentDesc := Qdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "non-split non-central",
                                operator := "~",
                                leftOperand := Cp,
                                rightOperand := Qdesc
                            )
                        ));
                    fi;
                fi;
            od;
            
            # ALSO check for semidirect/direct products where |G| = |H| * p
            # and H is normal with complement of order p
            # This catches cases like D8 = C4 : C2 where C4 is normal
            normalSubsOfIndexP := Filtered(NormalSubgroups(G), H -> Index(G, H) = p);
            
            for H in normalSubsOfIndexP do
                complements := ComplementClassesRepresentatives(G, H);
                if Length(complements) > 0 then
                    # G splits as H extended by Cp
                    Hid := IdSmallGroup(H);
                    Hdesc := SanitizeDesc(StructureDescription(H));
                    Cp := Concatenation("C", String(p));
                    comp := complements[1];
                    
                    if IsNormal(G, comp) then
                        Add(allLinks, rec(
                            parent := Hid,
                            parentDesc := Hdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "direct product",
                                operator := "@",
                                leftOperand := Hdesc,
                                rightOperand := Cp
                            )
                        ));
                    else
                        Add(allLinks, rec(
                            parent := Hid,
                            parentDesc := Hdesc,
                            child := [ord, i],
                            childDesc := SanitizeDesc(StructureDescription(G)),
                            extension := rec(
                                type := "semidirect product",
                                operator := "#",
                                leftOperand := Hdesc,
                                rightOperand := Cp
                            )
                        ));
                    fi;
                fi;
            od;
        fi;
    od;
od;

# Deduplicate links, preferring split extensions (direct/semidirect) over non-split
uniqueLinksMap := rec();
for link in allLinks do
    key := Concatenation(String(link.parent), "->", String(link.child));
    if not IsBound(uniqueLinksMap.(key)) then
        uniqueLinksMap.(key) := link;
    else
        # Keep the one with better (lower) priority
        if ExtensionPriority(link.extension.type) < ExtensionPriority(uniqueLinksMap.(key).extension.type) then
            uniqueLinksMap.(key) := link;
        fi;
    fi;
od;

uniqueLinks := [];
for key in RecNames(uniqueLinksMap) do
    Add(uniqueLinks, uniqueLinksMap.(key));
od;

# Sort links for consistent output
SortBy(uniqueLinks, l -> [l.parent, l.child]);

# Group by (source, operator, operands) to find duplicates needing indices
formulaCounts := rec();
for link in uniqueLinks do
    baseFormula := BuildFormula(link.extension, "");
    key := Concatenation(String(link.parent), ":", baseFormula);
    if not IsBound(formulaCounts.(key)) then
        formulaCounts.(key) := [];
    fi;
    Add(formulaCounts.(key), link);
od;

# Assign indexed formulas
for key in RecNames(formulaCounts) do
    links := formulaCounts.(key);
    if Length(links) > 1 then
        SortBy(links, l -> l.child);
        for i in [1..Length(links)] do
            links[i].formula := BuildFormula(
                links[i].extension, 
                String(i)
            );
        od;
    else
        links[1].formula := BuildFormula(links[1].extension, "");
    fi;
od;

Print("\\nTotal nodes: ", Length(allNodes), "\\n");
Print("Total unique links: ", Length(uniqueLinks), "\\n");

# Count by extension type
directCount := Length(Filtered(uniqueLinks, l -> l.extension.type = "direct product"));
semiCount := Length(Filtered(uniqueLinks, l -> l.extension.type = "semidirect product"));
centralCount := Length(Filtered(uniqueLinks, l -> l.extension.type = "non-split central"));
noncentralCount := Length(Filtered(uniqueLinks, l -> l.extension.type = "non-split non-central"));
Print("  Direct products: ", directCount, "\\n");
Print("  Semidirect products: ", semiCount, "\\n");
Print("  Non-split central: ", centralCount, "\\n");
Print("  Non-split non-central: ", noncentralCount, "\\n");

# Save to file
output := OutputTextFile(filepath, false);
SetPrintFormattingStatus(output, false);

PrintTo(output, "{\\n");
AppendTo(output, "  \\"nodes\\": [\\n");
for i in [1..Length(allNodes)] do
    node := allNodes[i];
    AppendTo(output, "    {\\n");
    AppendTo(output, "      \\"id\\": \\"", node.id[1], "_", node.id[2], "\\",\\n");
    AppendTo(output, "      \\"gapIndex\\": [", node.id[1], ", ", node.id[2], "],\\n");
    AppendTo(output, "      \\"desc\\": \\"", node.desc, "\\",\\n");
    AppendTo(output, "      \\"isAbelian\\": ", node.isAbelian, ",\\n");
    AppendTo(output, "      \\"generators\\": \\"", node.presentation.generators, "\\",\\n");
    AppendTo(output, "      \\"relations\\": \\"", node.presentation.relations, "\\"\\n");
    AppendTo(output, "    }");
    if i < Length(allNodes) then AppendTo(output, ","); fi;
    AppendTo(output, "\\n");
od;
AppendTo(output, "  ],\\n");
AppendTo(output, "  \\"links\\": [\\n");
for i in [1..Length(uniqueLinks)] do
    link := uniqueLinks[i];
    AppendTo(output, "    {\\n");
    AppendTo(output, "      \\"source\\": \\"", link.parent[1], "_", link.parent[2], "\\",\\n");
    AppendTo(output, "      \\"target\\": \\"", link.child[1], "_", link.child[2], "\\",\\n");
    AppendTo(output, "      \\"formula\\": \\"", link.formula, "\\",\\n");
    AppendTo(output, "      \\"type\\": \\"", link.extension.type, "\\"\\n");
    AppendTo(output, "    }");
    if i < Length(uniqueLinks) then AppendTo(output, ","); fi;
    AppendTo(output, "\\n");
od;
AppendTo(output, "  ]\\n");
AppendTo(output, "}\\n");

CloseStream(output);
Print("Saved to ", filepath, "\\n");`;

  // Create highlighted version
  let highlighted = gapCode
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  highlighted = highlighted.replace(
    /p := (\d+);/g,
    `p := <span class="highlight-var">${p}</span>;`
  );
  
  highlighted = highlighted.replace(
    /maxPower := (\d+);/g,
    `maxPower := <span class="highlight-var">${n}</span>;`
  );
  
  highlighted = highlighted.replace(
    /filepath := "([^"]+)";/g,
    `filepath := "<span class="highlight-var">${fullPath}</span>";`
  );
  
  return { gapCode, highlighted };
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["familyLattice@13.json", {url: new URL("./files/b2d2407f6a9b4e53c5a69d624aebd2441e9203f5875eca88041d08ec499de0b6abf66c233849444e6f3b43e5e4d55a1cf88503d5b96747b1c40a0dc274ffa6d9.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("robocoop", child1);
  const child2 = runtime.module(define2);
  main.import("spectralCircleOrder", child2);
  main.import("improveOrderSifting", child2);
  main.import("bestOfRandomOrders", child2);
  main.variable(observer("layerCrossingUtils")).define("layerCrossingUtils", ["d3"], _layerCrossingUtils);
  main.variable(observer()).define(["robocoop"], _7);
  main.variable(observer("viewof crossingSettings")).define("viewof crossingSettings", ["Inputs"], _crossingSettings);
  main.variable(observer("crossingSettings")).define("crossingSettings", ["Generators", "viewof crossingSettings"], (G, _) => G.input(_));
  main.variable(observer("viewof controls")).define("viewof controls", ["html"], _controls);
  main.variable(observer("controls")).define("controls", ["Generators", "viewof controls"], (G, _) => G.input(_));
  main.variable(observer("crossingMinimizationReport")).define("crossingMinimizationReport", ["layoutData","htl","crossingSettings","layerCrossingUtils"], _crossingMinimizationReport);
  main.variable(observer("familyChart")).define("familyChart", ["width","layoutData","d3"], _familyChart);
  main.variable(observer("layoutData")).define("layoutData", ["controls","data","d3","crossingSettings","layerCrossingUtils"], _layoutData);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof params")).define("viewof params", ["Inputs"], _params);
  main.variable(observer("params")).define("params", ["Generators", "viewof params"], (G, _) => G.input(_));
  main.variable(observer("codeDisplay")).define("codeDisplay", ["html","codeData"], _codeDisplay);
  main.variable(observer("codeData")).define("codeData", ["params"], _codeData);
  return main;
}
