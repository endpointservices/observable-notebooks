function _1(md){return(
md`# Sortable Notebook List

Enter a user or team name in the text field below to view all of their published notebooks in a sortable table. Click any column name to change the sort order.

Related feature requests:
- [Let me sort my notebook list by creation date](https://github.com/observablehq/feedback/issues/30)
- [use GUI file-manager style list for notebook list views](https://github.com/observablehq/feedback/issues/35)

The data is retrieved from Observable's internal API, using a [CORS proxy](https://glitch.com/edit/#!/observablehq-api). Note that all results have to be retrieved beforehand, and that the proxy may require a few seconds to start.

---
`
)}

function _username(Inputs,param)
{
  const n = Inputs.Text({
    submit: 'Search',
    placeholder: 'Enter a username',
    pattern: '@?[a-zA-Z0-9-_]+',
    required: true,
    value: param('username', v => v || 'mootari'),
  });
  // Allow input to be resubmitted without changing its value.
  const b = n.querySelector('button');
  b.disabled = false;
  Object.defineProperty(b, 'disabled', {get: () => false, set: () => {}});
  // Browser autocomplete suggestions may hide indexing status.
  const i = n.querySelector('input[type="text"]');
  n.addEventListener('input', e => { i.blur() });
  return n;
}


function _user(html,api,username,themeProfile)
{
  const $progress = html`<progress style="margin-right:.5em;width:5em">`,
        $status = html`<output style="font:13px var(--sans-serif)">Waiting for proxy to start ...`,
        $view = html`<div style="padding-bottom:.5em">${$progress}${$status}`;
  
  $view.value = new Promise(async (resolve, reject) => {
    const r = await api(`user/@${username.replace(/^@/, '')}`);
    $progress.remove();
    if(!r || r.errors) {
      $status.value = `User "${username}" not found.`;
      $status.style.cssText += 'color:red';
      return;
    }
    $status.replaceWith(themeProfile(r));
    resolve(r);
  });

  return $view;
}


function _notebooks(html,apiPager,user,invalidation)
{
  const $status = html`<output>`,
        $progress = html`<progress style="margin-right:.5em;width:5em">`,
        $view = html`<div style="font:13px var(--sans-serif)">${$progress} ${$status}`,
        results = new Map,
        pager = apiPager(`documents/@${user.login}`);
  
  let abort = false;
  invalidation.then(() => {
    abort = true;
    $view.style.display = 'none';
  });
  
  $view.value = new Promise(async resolve => {
    $status.value = 'Waiting for proxy ...';
    for await(const r of pager) {
      if(abort) return;
      for(const d of r.results) results.set(d.id, d);
      const current = Math.min(r.total, r.page * r.per_page);
      $progress.value = current;
      $progress.max = r.total;
      $status.value = `Indexed ${current} / ${r.total} results ...`;
    }
    $progress.remove();
    $status.value = `Indexing complete. ${results.size} published notebooks found.`;
    $view.prepend(html`<span style="color:#0a0;font-size:25px;vertical-align:sub;line-height:0">✓`)
    resolve(Array.from(results.values()));
  });
    
  return $view;
}


function _options(param,Inputs)
{
  const opts = {
    relTime: {label: 'Use relative dates', value: true},
    teamMeta: {label: 'Display authors / teams', value: false},
  };
  const value = [];
  for(const [key, def] of Object.entries(opts)) {
    const p = param(key, v => v == null ? null : v === 'true');
    if(p !== null ? p : def.value) value.push(key);
  }
  
  return Inputs.Checkbox(Object.keys(opts), {
    //label: 'Options',
    value,
    format: key => opts[key].label,
  });
}


function _selection(notebookTable,notebooks,options,user,$0,$1,param)
{
  // Legacy column names.
  const columnAliases = {
    update_time: 'updated',
    publish_time: 'published',
    fork_of: 'fork',
    comment_count: 'comments',
  };
  
  const table = notebookTable(notebooks, {
    relativeDate: options.includes('relTime'),
    showCreator: options.includes('teamMeta') && user.type === 'team',
    showOwner: options.includes('teamMeta') && user.type !== 'team',
    showUpdated: true,
    tableOptions: {
      sort: (columnAliases[$0.value] || $0.value),
      reverse: ($1.value),
      rows: param('rows', v => +v || 25),
    },
  });

  table.addEventListener('sort', e => {
    $1.value = e.detail.reverse;
    $0.value = e.detail.sort;
  });
  
  return table;  
}


function _7(html,permLink){return(
html`<a
style="border-top:1px solid #ccc; padding-top:1em; display:block;font:14px var(--sans-serif);" href="${permLink}">Permanent link for current settings`
)}

function _8(md){return(
md`---
### Notebook data`
)}

function _9(notebooks){return(
notebooks
)}

function _10(md){return(
md`---
### API helpers`
)}

function _proxyStats(html)
{
  let age, req;
  const $age = html`<output>?`,
        $req = html`<output>?`,
        $view = html`<div style="font: 14px var(--sans-serif)">Proxy instance was started ${$age} ago and has served ${$req} requests.`;
  $view.value = {};
  Object.defineProperty($view, 'value', {
    get: () => ({age: age, requests: req}),
    set: ({age, requests}) => {
      age = +age;
      const m = Math.floor(age / 60), s = age % 60;
      $age.value = `${m}m ${s}s`;
      req = +requests;
      $req.value = requests;
    },
  });
  return $view;
}


function _api($0,Event){return(
route => fetch(`https://observablehq-api.glitch.me/${route}`).then(r => {
  $0.value = {
    age: +r.headers.get('x-glitch-instance-age'),
    requests: +r.headers.get('x-glitch-instance-requests'),
  };
  $0.dispatchEvent(new Event('input'), {bubbles: true});
  return r.json();
})
)}

function _apiPager(api){return(
async function* apiPager(route) {
  let n = 0, pages = 1;
  const glue = route.match(/\?/) ? '&' : '?';
  while(++n <= pages) {
    const r = await api(`${route}${glue}page=${n}`);
    if(!r || r.errors) break;
    pages = Math.ceil(r.total / r.per_page);
    yield {page: n, pages, per_page: r.per_page, total: r.total, results: r.results};
  }
}
)}

function _apiList(apiPager,invalidation){return(
async function apiList(route, key = 'id') {
  const results = new Map, i = apiPager(route);
  let abort = false;
  invalidation.then(() => abort = true);
  for await(const r of i) {
    for(const d of r.results) results.set(d[key], d);
    if(abort) break;
  }
  return Array.from(results.values());
}
)}

function _15(md){return(
md`---
### Presentation helpers
`
)}

function _notebookTable(formatDate,html,timeAgo,themeAccount,objectMapper,Inputs,pluginPerColumnOptions,themeTitle,pluginVerticalAlign,pluginIconHeader,icons,pluginSortEvent){return(
function notebookTable(data, options = {}) {
  
  const {
    relativeDate = false,
    showCreator = false,
    showOwner = false,
    showPublished = true,
    showUpdated = false,
    dateColumnType = (relative = false) => ({
      width: relative ? '8em' : '11em',
      format: v => {
        const d = formatDate(v);
        return html`<span title="${relative ? d : timeAgo(v)}">${relative ? timeAgo(v) : d}`;
      },
    }),
    accountColumnType = key => ({
      format: (v, i, arr) => !v.length ? '' : themeAccount(arr[i][key]),
      width: '11em',
    }),
    // Adds presentational column names, sortable teams / authors.
    mapper = objectMapper({
      author: d => showCreator !== 'always' && d.owner.login === d.creator.login ? '' : d.creator.login,
      team: d => showOwner !== 'always' && d.owner.login === d.creator.login ? '' : d.owner.login,
      updated: d => d.update_time,
      published: d => d.publish_time,
      comments: d => d.comment_count,
      fork: d => d.fork_of,
    }),
    
    tableOptions = {}
  } = options;
  
  const table = Inputs.Table(data.map(mapper), pluginPerColumnOptions({
    columns: {
      title: {format: (v, i, arr) => themeTitle(arr[i])},
      ...(!showCreator   ? {} : {author: accountColumnType('creator')}),
      ...(!showOwner     ? {} : {team: accountColumnType('owner')}),
      ...(!showPublished ? {} : {published: dateColumnType(relativeDate)}),
      ...(!showUpdated   ? {} : {updated: dateColumnType(relativeDate)}),
      version:  {width: '4em', format: v => v},
      likes:    {width: '3em', format: v => v || ''},
      comments: {width: '3em', format: v => v || ''},
      fork:     {width: '3em', align: 'center', format: v => v ? html`<strong>✓` : ''},
    },
    sort: 'published',
    reverse: true,
    rows: 30,
    ...tableOptions,
  }));

  pluginVerticalAlign(table);
  pluginIconHeader(table, {likes: icons.like, comments: icons.comment, fork: icons.fork});
  pluginSortEvent(table);

  return table;
}
)}

function _themeProfile(DOM,html){return(
function themeProfile(user) {
  const {bio, home_url, name, login, avatar_url} = user,
        at_name = `@${login}`,
        home_short = !home_url ? '' : home_url.replace(/^https?:\/\//, ''),
        ns = DOM.uid().id;
  
  const $style = html`<style>
#${ns} {font-family: var(--sans-serif);}
#${ns} .br-100 {border-radius: 100%;}
#${ns} .dib {display: inline-block;}
#${ns} .f6 {font-size: .875rem;}
#${ns} .flex {display: flex;}
#${ns} .flex-shrink-0 {flex-shrink: 0;}
#${ns} .fw4 {font-weight: 400;}
#${ns} .fw7 {font-weight: 700;}
#${ns} .hover-blue:focus, #${ns} .hover-blue:hover {color: #3b5fc0;}
#${ns} .inline-flex {display: inline-flex;}
#${ns} .items-center {align-items: center;}
#${ns} .items-top {}
#${ns} .lh-f6 {line-height: 1.25rem;}
#${ns} .lh-f7 {line-height: 1rem;}
#${ns} .light-gray {color: #e2e2e2;}
#${ns} .line-clamp-2 {display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; -webkit-line-clamp: 2;}
#${ns} .mh1 {margin-left: .25rem; margin-right: .25rem}
#${ns} .mid-gray {color: #6e6e6e;}
#${ns} .mw-100 {max-width: 100%;}
#${ns} .mw-none {max-width: none;}
#${ns} .near-black {color: #1c1c1c;}
#${ns} .no-underline {text-decoration: none;}
#${ns} .overflow-hidden {overflow: hidden;}
#${ns} .pl2 {padding-left: var(--spacing-small);}
#${ns} .truncate {white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
`;
  
  return html`<div id="${ns}">${$style}<div class="flex items-center items-top"><a class="inline-flex" href="/${at_name}"><img alt="${at_name}" src="${avatar_url}" loading="lazy" class="br-100 mw-none" style="width: 46px; height: 46px; max-width: none; flex-shrink: 0;"></a><div class="pl2 f6 lh-f6 overflow-hidden" style="padding-left: 10px;"><div class="flex items-center"><a class="truncate dib items-center fw7 no-underline near-black hover-blue flex-shrink-0 mw-100" href="/${at_name}">${DOM.text(name || login)}</a>${!home_url?'':html`<span class="mh1 light-gray">•</span><a title="${home_url}" href="${home_url}" rel="noopener noreferrer" target="_blank" class="truncate f6 fw4 no-underline mid-gray hover-blue">${DOM.text(home_short)}</a>`}</div>${!bio?'':html`<div class="line-clamp-2 fw4 f6 lh-f7 mid-gray" style="text-overflow: ellipsis;">${DOM.text(bio)}</div>`}</div></div>`;
}
)}

function _themeAccount(html,DOM){return(
function themeAccount(d) {
  const $i = html`<span style="width:16px;height:16px;border-radius:16px;background:#0000 url(${d.avatar_url}) center/cover no-repeat;margin-right:5px;display:inline-block;vertical-align:middle">`;
  const $a = html`<a style="color:inherit;text-overflow:ellipsis;overflow:hidden" href="/@${d.login}">${$i}${DOM.text(d.login)}`;
  $a.setAttribute('title', `${d.name} (@${d.login})`);
  return $a;
}
)}

function _themeTitle(html,DOM){return(
function themeTitle(d) {
  const $a = html`<a href="/@${d.owner.login}/${d.slug}" style="color:inherit;font-weight:bold;vertical-align:middle">${d.title != null && d.title.length ? DOM.text(d.title) : html`<em style="font-weight:normal">(no title)`}`;
  $a.setAttribute('title', d.title);
  
  return html`<img width=40 height=25 style="display:inline-block;vertical-align:middle;margin-right:.5em" src="https://static.observableusercontent.com/thumbnail/${d.thumbnail}.jpg">${$a}`;
}
)}

function _objectMapper(){return(
function objectMapper(map) {
  map = new Map(Object.entries(map));
  
  return item => {
    const o = new Map(Object.entries(item));
    for(const [key, fn] of map) o.set(key, fn(item));
    return Object.fromEntries(o.entries());
  };
}
)}

function _formatDate()
{
  const f = new Intl.DateTimeFormat('en-US', {
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    formatMatcher: 'basic',
  });
  
  return date => {
    const [m,,d,,y,,h,,i] = f.formatToParts(new Date(date));
    return `${y.value}-${m.value}-${d.value}, ${h.value}:${i.value}`;
  };
}


async function _icons(FileAttachment){return(
{
  fork: await FileAttachment("icon_fork.svg").url(),
  comment: await FileAttachment("icon_comment.svg").url(),
  like: await FileAttachment("icon_like.svg").url(),
}
)}

function _doc_table_ext(md){return(
md`---
### Table extensions`
)}

function _pluginPerColumnOptions(){return(
function pluginPerColumnOptions(options) {
  if(!('columns' in options) || Array.isArray(options.columns)) return {...options};
  
  const columns = [],
        format = new Map,
        align = new Map,
        width = new Map,
        merge = (o, map) => { for(const [k, v] of Object.entries(o)) map.set(k, v) },
        optional = (key, map) => (map.size ? {[key]: Object.fromEntries(map)} : {});

  // Expand per column definitions.
  for(const [key, def] of Object.entries(options.columns)) {
    columns.push(key);
    if(def.format !== undefined) format.set(key, def.format);
    if(def.align !== undefined) align.set(key, def.align);
    if(def.width !== undefined) width.set(key, def.width);
  }
  
  // Merge global column options.
  if(options.format) merge(options.format, format);
  if(options.align) merge(options.align, align);
  if('width' in options) {
    // Global width overrides per-column values.
    if(typeof width !== 'object') width.clear();
    else merge(options.width, width);
  }
  
  return {
    ...options,
    columns,
    ...optional('format', format),
    ...optional('align', align),
    ...optional('width', width),
  };
}
)}

function _pluginIconHeader(html){return(
function pluginIconHeader(table, icons) {
  const entries = Object.entries(icons),
        select = col => `#${table.id} th[title="${col}"]`,
        selectAll = (suffix = '') => entries.map(([col]) => select(col) + suffix).join(',');

  table.appendChild(html`<style>
${selectAll()} {
  color:transparent;
  letter-spacing:-1000px;
}
${selectAll('>span')} {
  color:#111;
}
${selectAll(':after')} {
  content: "";
  width:16px;
  height:16px;
  display:inline-block;
  color:#111;
  vertical-align: text-bottom;
  visibility: visible;
  margin-left: 5px;
}
${entries.map(([col, url]) => `
${select(col)}:after { background: transparent url(${url}) center no-repeat; }
`)}
 `);
  return table;
}
)}

function _pluginSortEvent(HTMLSpanElement,Text){return(
function pluginSortEvent(table, invalidation = null) {
  const handler = e => {
    if(e.target.tagName !== 'TH') return;
    const c = e.target.childNodes;
    if(!(c[0] instanceof HTMLSpanElement) || !(c[1] instanceof Text)) return;
    table.dispatchEvent(new CustomEvent('sort', {
      bubbles: true,
      detail: {
        sort: c[1].textContent,
        reverse: c[0].textContent === '▾',
      },
    }));
  };
  
  const args = ['click', handler, {passive: true}];
  table.addEventListener(...args);
  if(invalidation) invalidation.then(() => table.removeEventListener(...args));
  
  return table;
}
)}

function _pluginVerticalAlign(html){return(
function pluginVerticalAlign(table) {
  table.appendChild(html`<style>
#${table.id} td { vertical-align: text-top; }
  `);
  return table;
}
)}

function _28(md){return(
md`---
### Preset helpers`
)}

function _param()
{
  const search = new URL(document.baseURI).searchParams;
  return (name, map) => map(search.get(name));
}


function _sort(param){return(
param('sort', v => v || 'published')
)}

function _reverse(param){return(
param('reverse', v => v !== 'false')
)}

function _permLink(username,options,sort,reverse)
{
  const url = new URL(document.baseURI), s = url.searchParams;
  s.set('username', username);
  s.set('relTime', options.includes('relTime'));
  s.set('teamMeta', options.includes('teamMeta'));
  s.set('sort', sort);
  s.set('reverse', reverse);
  return `${url}`;
}


function _33(md){return(
md`---
### Dependencies`
)}

async function _timeAgo(require){return(
(await require('timeago.js@4.0.2/dist/timeago.min.js')).format
)}

function _Inputs(require){return(
require('@observablehq/inputs@0.7.22')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["icon_comment.svg", {url: new URL("./files/7ddf2ee868df82d98f9ce22f14d22b7ec3ae5fa1972033df2cdd27fce01fd99833174ee4d33717dd76b9316bd70e4ef2e6a7fa232b1522f0e92e4e19aca5d128.svg", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["icon_like.svg", {url: new URL("./files/b1040c58d4c64356034215774a3e61d1d76985d9d30e7e60fcb6598ff6a12057f88275d48214fcead18db57eb9a5208377a60fc98f1e45a0784865a7d591f989.svg", import.meta.url), mimeType: "image/svg+xml", toString}],
    ["icon_fork.svg", {url: new URL("./files/9f8da7bfaec808d3acf9764cf52d3ac8cd815a0811f28fd8e790772693f1d346a6e4fc9ef8a990f5ad121f72452f66fe99459c8ef1dab23d8c1fe9d2b83668f6.svg", import.meta.url), mimeType: "image/svg+xml", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof username")).define("viewof username", ["Inputs","param"], _username);
  main.variable(observer("username")).define("username", ["Generators", "viewof username"], (G, _) => G.input(_));
  main.variable(observer("viewof user")).define("viewof user", ["html","api","username","themeProfile"], _user);
  main.variable(observer("user")).define("user", ["Generators", "viewof user"], (G, _) => G.input(_));
  main.variable(observer("viewof notebooks")).define("viewof notebooks", ["html","apiPager","user","invalidation"], _notebooks);
  main.variable(observer("notebooks")).define("notebooks", ["Generators", "viewof notebooks"], (G, _) => G.input(_));
  main.variable(observer("viewof options")).define("viewof options", ["param","Inputs"], _options);
  main.variable(observer("options")).define("options", ["Generators", "viewof options"], (G, _) => G.input(_));
  main.variable(observer("viewof selection")).define("viewof selection", ["notebookTable","notebooks","options","user","mutable sort","mutable reverse","param"], _selection);
  main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","permLink"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["notebooks"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof proxyStats")).define("viewof proxyStats", ["html"], _proxyStats);
  main.variable(observer("proxyStats")).define("proxyStats", ["Generators", "viewof proxyStats"], (G, _) => G.input(_));
  main.variable(observer("api")).define("api", ["viewof proxyStats","Event"], _api);
  main.variable(observer("apiPager")).define("apiPager", ["api"], _apiPager);
  main.variable(observer("apiList")).define("apiList", ["apiPager","invalidation"], _apiList);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("notebookTable")).define("notebookTable", ["formatDate","html","timeAgo","themeAccount","objectMapper","Inputs","pluginPerColumnOptions","themeTitle","pluginVerticalAlign","pluginIconHeader","icons","pluginSortEvent"], _notebookTable);
  main.variable(observer("themeProfile")).define("themeProfile", ["DOM","html"], _themeProfile);
  main.variable(observer("themeAccount")).define("themeAccount", ["html","DOM"], _themeAccount);
  main.variable(observer("themeTitle")).define("themeTitle", ["html","DOM"], _themeTitle);
  main.variable(observer("objectMapper")).define("objectMapper", _objectMapper);
  main.variable(observer("formatDate")).define("formatDate", _formatDate);
  main.variable(observer("icons")).define("icons", ["FileAttachment"], _icons);
  main.variable(observer("doc_table_ext")).define("doc_table_ext", ["md"], _doc_table_ext);
  main.variable(observer("pluginPerColumnOptions")).define("pluginPerColumnOptions", _pluginPerColumnOptions);
  main.variable(observer("pluginIconHeader")).define("pluginIconHeader", ["html"], _pluginIconHeader);
  main.variable(observer("pluginSortEvent")).define("pluginSortEvent", ["HTMLSpanElement","Text"], _pluginSortEvent);
  main.variable(observer("pluginVerticalAlign")).define("pluginVerticalAlign", ["html"], _pluginVerticalAlign);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("param")).define("param", _param);
  main.define("initial sort", ["param"], _sort);
  main.variable(observer("mutable sort")).define("mutable sort", ["Mutable", "initial sort"], (M, _) => new M(_));
  main.variable(observer("sort")).define("sort", ["mutable sort"], _ => _.generator);
  main.define("initial reverse", ["param"], _reverse);
  main.variable(observer("mutable reverse")).define("mutable reverse", ["Mutable", "initial reverse"], (M, _) => new M(_));
  main.variable(observer("reverse")).define("reverse", ["mutable reverse"], _ => _.generator);
  main.variable(observer("permLink")).define("permLink", ["username","options","sort","reverse"], _permLink);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("timeAgo")).define("timeAgo", ["require"], _timeAgo);
  main.variable(observer("Inputs")).define("Inputs", ["require"], _Inputs);
  return main;
}
