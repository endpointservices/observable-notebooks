// https://observablehq.com/@tomlarkworthy/womens-suffrage@927
import define1 from "./3df1b33bb2cfcd3c@475.js";
import define2 from "./17567518d319e006@159.js";
import define3 from "./450051d7f1174df8@255.js";
import define4 from "./a2e58f97fd5e8d7c@756.js";
import define5 from "./ef672b935bd480fc@623.js";
import define6 from "./0905542adbad836e@55.js";
import define7 from "./5f38aacddde02285@80.js";
import define8 from "./c2dae147641e012a@46.js";

function _1(md){return(
md`# World History of Women's Suffrage

See how women's sufferage spread around the world. See how the World Wars rapidly changed the worlds attitude's towards women. Underneath the graphic important caveats are cross-linked with Wikipedia and external data sources.

For [2021 Women's history dataviz competition](https://observablehq.com/@observablehq/womens-history-month-dataviz-contest)
`
)}

function _2(md){return(
md`## Interactive Dataviz
`
)}

function _3(svg,w,h,map,year){return(
svg`
<div style="width: ${w}px; height:${h}px;">
  <div style="position:absolute; top:0; left:0;">
    <svg width=${w} height=${h} viewbox="0 0 1200 675">
    <defs>
      <linearGradient id="water" gradientTransform="rotate(90)">
        <stop offset="5%"  stop-color="#6eb6ff" />
        <stop offset="50%" stop-color="#7098da" />
        <stop offset="95%" stop-color="#6eb6ff" />
      </linearGradient>
    </defs>
      <rect width="1200" height="675" fill="url('#water')" />
    </svg>
  </div>
  <div style="position:absolute; top:0; left:0;">
    ${map}
  </div>
  <div style="position:absolute; top:0; left:0;">
    <svg width=${w} height=${h} viewbox="0 0 1200 675">
      <rect x="20" y="20" width="930" height="130" fill="#ffe" />
      <rect x="20" y="140" width="270" height="100" fill="#ffe" />
      <text x="40" y="220" style="font: bold 100px sans-serif; fill: #f25f29;">${year}
      </text><text x="40" y="120" style="font: bold 100px sans-serif; fill: #f25244; background-color: #f25f29;">Women's Suffrage</text>
    </svg>
  </div>
</div>`
)}

function _year(Scrubber,years,localStorage,begin){return(
Scrubber(years, {
  autoplay: false,
  delay: 300,
  loop: false,
  initial: Number.parseInt(localStorage.getItem("year") || `${begin}`) - begin
})
)}

function _5(md){return(
md`### Noteworthy recent events`
)}

function _noteworthy(Table,recentEvents,html,wiki,refsToWiki){return(
Table(
  recentEvents.map(d => ({
    ...d,
    country: d.country.match(/{{[^|]*\|([^|}]*)/)[1]
  })),
  {
    columns: ['year', 'country', 'notes'],
    sort: 'country',
    width: {
      country: 120,
      year: 50
    },
    format: {
      notes: e =>
        html`<div style="white-space: normal;" >${wiki`${refsToWiki(
          e
        )}`}</div>`,
      year: y => `${y}`
    }
  }
)
)}

function _7(noteworthy){return(
noteworthy.style.maxHeight = "1500px"
)}

function _8(md){return(
md`---
## Implementation
`
)}

function _controls(html){return(
html`<div id="bind"></div>`
)}

function _years(begin){return(
new Array(2020 - begin).fill(0).map((_, i) => begin + i)
)}

function _begin(){return(
1900
)}

function _recentEvents(){return(
[]
)}

function _updateMap(mapCodes,year,events,codeGroup,_,$0,$1,localStorage)
{
  //['#ffaaa5', '#ffd3b6', '#fdffab', '#a8e6cf']
  const newColors = {};
  mapCodes.map(code => (newColors[code] = "#625772"));
  const newRecentEvents = [];
  for (let y = 1838; y <= year; y++) {
    events[y] &&
      events[y].map(event => {
        newColors[event.code] = "#fdffab";
        if (event.notes) newRecentEvents.push(event);
        // Some codes have changed in the past so we map them to modern ones
        (codeGroup[event.code] || []).forEach(c => {
          newColors[c] = "#fdffab";
        });
      });
  }
  newRecentEvents;
  while (newRecentEvents.length > 5) newRecentEvents.shift();
  newRecentEvents.forEach(recent => (newColors[recent.code] = "#a8e6cf"));

  // Has this changed what is the current coloring?
  if (!_.isEqual(newColors, $0.value)) {
    $0.value = newColors;
    $0.dispatchEvent();
  }

  if (!_.isEqual(newRecentEvents, $1.value)) {
    $1.value = newRecentEvents;
  }
  localStorage.setItem("year", year);
}


function _14(md){return(
md`## Dataset joining`
)}

function _iso3166(FileAttachment){return(
FileAttachment("3166.json").json()
)}

function _countryCodeIndex(iso3166){return(
iso3166.reduce((acc, row) => {
  acc[row['country-code']] = row;
  return acc;
}, {})
)}

function _findCode(iso3166){return(
function findCode(row) {
  if (row.country.includes('Papua New Guinea')) return "598";
  if (row.country.includes('Nigeria')) return "566";
  if (row.country.includes('United Kingdom')) return "826";
  if (row.country.includes('Palestine')) return "275";
  if (row.country.includes('United States')) return "840";
  if (row.country.includes('Russia')) return "643";
  if (row.country.includes('Taiwan')) return "158";
  if (row.country.includes('Iran')) return "364";
  if (row.country.includes('Bolivia')) return "068";
  if (row.country.includes('Brunei')) return "096";
  if (row.country.includes('Burma')) return "104";
  if (row.country.includes('Cape Verde')) return "132";
  if (row.country.includes('Weimar Republic')) return undefined;
  if (row.country.includes('Hawaii')) return undefined;
  if (row.country.includes('Hungarian')) return "348";
  if (row.country.includes('Kazakh')) return "398";
  if (row.country.includes('Korea, North')) return "408";
  if (row.country.includes('Korea, South')) return "410";
  if (row.country.includes('Kyrgyz')) return "417";
  if (row.country.includes('Laos')) return "418";
  if (row.country.includes('Micronesia')) return "583";
  if (row.country.includes('Moldova')) return "498";
  if (row.country.includes('São Tomé')) return "678";
  if (row.country.includes('Swaziland')) return "748";
  if (row.country.includes('Syria')) return "760";
  if (row.country.includes('Tuscany')) return "";
  if (row.country.includes('Tajik')) return "762";
  if (row.country.includes('Tanzania')) return "834";
  if (row.country.includes('Turkmen')) return "795";
  if (row.country.includes('Ukrainian')) return "804";
  if (row.country.includes('Uzbek')) return "860";
  if (row.country.includes('Vatican City')) return undefined;
  if (row.country.includes('Venezuela')) return "862";
  if (row.country.includes('Vietnam')) return "704";
  if (row.country.includes('Yugoslavia')) return "070";
  // Do some kind of similarity
  const found = iso3166.find(e => {
    return row.country.includes(e.name);
  });
  return (found || {})['country-code'];
}
)}

function _codeGroup(){return(
{
  '250': ['260', '540'], // France
  '070': ['807', '191', '499', '729', '688', '705'], // Yugoslavia
  '178': ['180'],
  '212': ['214'],
  '232': ['231'], //Ethiopia
  '324': ['624'],
  '208': ['352'],
  '826': ['238'], // Britain
  '504': ['732'],
  '729': ['728'],
  '528': ['740'], // Netherlands
  '203': ['703'],
  '784': ['-99'] // UAE
}
)}

function _19(md){return(
md`## World map`
)}

function _20(width){return(
width
)}

function _w(width){return(
width
)}

function _h(width){return(
(width * 675) / 1200
)}

function _map(embed,spec,controls){return(
embed(spec, { bind: controls })
)}

async function _spec(w,h,mapColors,FileAttachment){return(
{
  $schema: "https://vega.github.io/schema/vega/v5.json",
  description: "A configurable map of countries of the world.",
  width: w,
  height: h,
  autosize: "none",

  signals: [
    {
      name: "type",
      value: "mercator",
      bind: {
        input: "select",
        options: [
          "albers",
          "albersUsa",
          "azimuthalEqualArea",
          "azimuthalEquidistant",
          "conicConformal",
          "conicEqualArea",
          "conicEquidistant",
          "equalEarth",
          "equirectangular",
          "gnomonic",
          "mercator",
          "naturalEarth1",
          "orthographic",
          "stereographic",
          "transverseMercator"
        ]
      }
    },
    {
      name: "scale",
      value: (190 * w) / 1200,
      bind: { input: "range", min: 50, max: 2000, step: 1 }
    },
    {
      name: "center0",
      value: 0,
      bind: { input: "range", min: -180, max: 180, step: 1 }
    },
    {
      name: "center1",
      value: 27,
      bind: { input: "range", min: -90, max: 90, step: 1 }
    },
    { name: "translate0", update: "width / 2" },
    { name: "translate1", update: "height / 2" },
    {
      name: "colors",
      value: mapColors
    }
  ],

  projections: [
    {
      name: "projection",
      type: { signal: "type" },
      scale: { signal: "scale" },
      center: [{ signal: "center0" }, { signal: "center1" }],
      translate: [{ signal: "translate0" }, { signal: "translate1" }]
    }
  ],

  data: [
    {
      name: "world",
      url: await FileAttachment("world-110m.v1.json").url(),
      format: {
        type: "topojson",
        feature: "countries"
      }
    }
  ],

  marks: [
    {
      type: "shape",
      from: { data: "world" },
      encode: {
        update: {
          fill: { signal: "colors[datum.id]" },
          zindex: { value: 0 }
        },
        hover: {
          strokeWidth: { signal: "warn(datum.id, 2)" }
        }
      },
      transform: [{ type: "geoshape", projection: "projection" }]
    }
  ]
}
)}

async function _geo(){return(
(await fetch(
  "https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json"
)).json()
)}

function _mapCodes(geo){return(
geo.objects.countries.geometries.map(g => g.id)
)}

function _mapColors(View,mapCodes){return(
new View(
  mapCodes.reduce(
    (acc, row) =>
      Object.defineProperty(acc, row, {
        value: "red",
        enumerable: true,
        writable: true
      }),
    {}
  )
)
)}

function _embed(require){return(
require('vega-embed@6')
)}

function _30(md){return(
md`### Hostorical Data from [Wikipedia](https://en.wikipedia.org/wiki/Women%27s_suffrage) `
)}

function _events(timeline){return(
timeline.rows
  .sort((a, b) => a.year - b.year)
  .reduce((acc, row) => {
    acc[row.year] = (acc[row.year] || []).concat(row);
    return acc;
  }, {})
)}

function _timeline(wikitable,findCode){return(
wikitable.split("\n").reduce(
  (d, line) => {
    if (line.startsWith("|-")) {
      if (d.colIndex != 0) d.rows.push(d.current);
      d.colIndex = 0;
      d.current = {};
    } else if (line.startsWith("! ")) {
      // d.cols.push(line);
    } else if (line.startsWith("| ")) {
      const col = d.cols[d.colIndex++];
      d.current[col] =
        col == "year"
          ? Number.parseInt(line.match(/(\d{4})/)[1])
          : line.substring(2);
      if (col == "country") {
        d.current.code = findCode(d.current);
      }
    }
    return d;
  },
  {
    cols: ["country", "year", "notes"],
    rows: [],
    colIndex: 0
  }
)
)}

function _wikitable(){return(
`{| class="wikitable sortable"
|-
! Country
! Year&nbsp;women&nbsp;first&nbsp;granted&nbsp;suffrage at&nbsp;national&nbsp;level
! Notes
|-
| {{flagicon|Kingdom of Afghanistan}} [[Kingdom of Afghanistan|Afghanistan]]
| 1965
|
|-
| {{flagicon image|Flag of Albania (1944–1946).svg}} [[Democratic Government of Albania|Albania]]<ref>{{Cite web|url=http://tesheshi.com/grate-ne-politiken-shqiptare-nga-ahmet-zogu-te-edi-rama-ja-emrat-me-te-spikatur/|title=Gratë në politikën shqiptare: Nga Ahmet Zogu te Edi Rama – ja emrat më të spikatur {{!}} Te Sheshi|language=en-US|access-date=March 8, 2020}}</ref>
| 1945
| Albanian women voted for the first time in the [[1945 Albanian parliamentary election|1945 election]]. 
|-
| {{flag|Algeria}}
| 1962
| In 1962, on its independence from France, Algeria granted equal voting rights to all men and women.
|-
| {{flag|Andorra}}
| 1970
|
|-
| {{flagicon|Angola}} [[People's Republic of Angola|Angola]]
| 1975

|
|-
| {{flag|Argentina}}
| 1947<ref>Gregory Hammond, ''The Women's Suffrage Movement and Feminism in Argentina From Roca to Peron'' (U of New Mexico Press; 2011)</ref>
| On September 23, 1947, the Female Enrollment Act (number 13,010) was enacted in the government of [[Juan Perón]]
|-
| {{flag|Armenia}}
| 1917 (by application of the Russian legislation)<br />1919 March (by adoption of its own legislation)<ref>[[Simon Vratsian]] ''Hayastani Hanrapetutyun'' (The Republic of Armenia, ''Arm.''), Yerevan, 1993, p. 292.</ref>
|On June 21 and 23, 1919, first direct parliamentary elections were held in Armenia under universal suffrage - every person over the age of 20 had the right to vote regardless of gender, ethnicity or religious beliefs. The 80-seat legislature contained three women deputies: [[Katarine Zalyan-Manukyan]], [[Perchuhi Partizpanyan-Barseghyan]] and [[Varvara Sahakyan]]. <ref>{{cite web|author=Badalyan, Lena|date=5 December 2018|title=Women's Suffrage: The Armenian Formula|url=https://chai-khana.org/en/womens-suffrage-the-armenian-formula|access-date=30 November 2018|publisher=Chai Khana}}</ref><ref name="Harutyunyan">{{cite web|last1=Harutyunyan|first1=Anahit|date=8 March 2018|script-title=hy:Առաջին խորհրդարանի (1919-1920) երեք կին պատգամավորները|url=https://www.aniarc.am/2018/03/08/women-1919-1920-mp/|archive-url=https://web.archive.org/web/20180504044633/https://www.aniarc.am/2018/03/08/women-1919-1920-mp/|archive-date=4 May 2018|access-date=11 January 2019|website=aniarc.am|publisher=Armenian Research Center for Anteriology|location=Yerevan, Armenia|language=hy|quote=Three female deputies of the first parliament (1919-1920)}}</ref>
|-
| {{flag|Australia}}
| 1902 (Non-indigenous only)
1962 (full)
|[[Colony of South Australia]] 1894, [[Swan River Colony|Colony of Western Australia]] 1899, the remaining Australian states for non-indigenous women 1902. Indigenous Australian women (and men) were granted the vote in South Australia in 1895, but this right was revoked in 1902 for any Aboriginal person not already enrolled. Indigenous Australians were not given the right to vote in all states until 1962.<ref>{{cite web|title=Electoral milestones for Indigenous Australians|date=April 8, 2019|url=https://www.aec.gov.au/indigenous/milestones.htm|publisher=[[Australian Electoral Commission]]|access-date=June 11, 2019}}</ref><ref name=ag>{{cite news |last1=Taylor |first1=Alyce |title=On this day: SA gives women the vote |url=http://www.australiangeographic.com.au/blogs/on-this-day/2012/12/on-this-day-sa-gives-women-the-vote/ |access-date=June 16, 2018 |work=Australian Geographic |date=December 18, 2012 |archive-url=https://web.archive.org/web/20180616030349/http://www.australiangeographic.com.au/blogs/on-this-day/2012/12/on-this-day-sa-gives-women-the-vote/ |archive-date=June 16, 2018 |url-status=dead }}</ref> 
|-
| {{flag|Austria}}
| 1918
|The Electoral Code was changed in December 1918.<ref name="demokratiezentrum.org">{{Cite web|url=http://www.demokratiezentrum.org/de/themen/demokratieentwicklung/frauenwahlrecht/frauenwahlrecht.html|title=Frauenwahlrecht – Demokratiezentrum Wien|website=www.demokratiezentrum.org|access-date=June 14, 2019}}</ref> First election was in February 1919.<ref>{{Cite web|url=http://www.onb.ac.at/ariadne/projekte/frauen_waehlet/index.html|title=85 Jahre allgemeines Frauenwahlrecht in Österreich|date=March 6, 2011|archive-url=https://web.archive.org/web/20110306075818/http://www.onb.ac.at/ariadne/projekte/frauen_waehlet/index.html|access-date=June 14, 2019|archive-date=March 6, 2011}}</ref>
|-
| {{flagicon|Azerbaijan}} [[Azerbaijan Democratic Republic|Azerbaijan]]
| 1918
|Azerbaijan was the first Muslim-majority country to enfranchise women.<ref name="Tadeusz Swietochowski 2004. p. 144">Tadeusz Swietochowski. Russian Azerbaijan 1905–1920: The Shaping of a National Identity in a Muslim Community. Cambridge University Press, 2004. {{ISBN|0-521-52245-5|978-0-521-52245-8}}, p. 144</ref>
|-
| {{flag|Bahamas}}
| 1960
|
|-
| {{flag|Bahrain}}
| 2002
|No elections were held in Bahrain prior to 2002 since 1973.
|-
| {{flag|Bangladesh}}
| 1971 (upon [[Bangladeshi Declaration of Independence|its independence]])
| 
|-
| {{flag|Barbados|1885}}
| 1950
|
|-
| {{flag|Germany}}
| 1918
|
|-
| {{flagicon image|Missing Blue Ensign.svg}} [[British Leeward Islands]] <small>(Today: [[Antigua and Barbuda]], [[British Virgin Islands]], [[Montserrat]], [[Saint Kitts and Nevis]], [[Anguilla]])</small>
| 1951
|
|-
| {{flagicon image|Flag of the British Windward Islands (1903-1953).svg}} [[British Windward Islands]] <small>(Today: [[Grenada]], [[Saint Lucia|St Lucia]], [[Saint Vincent and the Grenadines|St Vincent and the Grenadines]], [[Dominica]])</small>
| 1951
|
|-
| {{flagicon|Belarus|1991}} [[Belarusian People's Republic]]
| 1919
|
|-
| {{flag|Belgium}}
| 1919/1948
| Was granted in the constitution in 1919, for communal voting. Suffrage for the provincial councils and the national parliament only came in 1948.
|-
| {{flag|British Honduras}} <small>(Today: [[Belize]])</small>
| 1954
|
|-
| {{flagicon|Benin}} [[Republic of Dahomey|Dahomey]] <small> (Today: [[Benin]])</small>
| 1956
|
|-
| {{flag|Bermuda}}
| 1944
|
|-
| {{flag|Bhutan}}
| 1953
|
|-
| {{flag|Bolivia}}
| 1938/1952
|Limited women's suffrage in 1938 (only for literate women and those with a certain level of income). On equal terms with men since 1952.<ref name="womensuffrage.org">{{cite web|url=http://womensuffrage.org/?page_id=109|title=Central & South America |work=Women Suffrage and Beyond}}</ref>
|-
| {{flag|Botswana}}
| 1965
|
|-
| {{flag|Brazil}}
| 1932
|
|- style="background: #F99"
| {{flag|Brunei}}
| 1959
| Elections currently suspended since [[1962 Bruneian district council election|1962]] and 1965. Both men and women have voting rights only for local elections.<ref>{{cite web|url=https://www.cia.gov/library/publications/the-world-factbook/fields/2123.html|title=The World Factbook}}</ref>
|-
| {{flag|Kingdom of Bulgaria}}
| 1937/1944
|Married women (and by default widowed women) gained the right to vote on January 18, 1937, in local elections, but could not run for office. Single women were excluded from voting. Full voting rights were bestowed by the communist regime in September 1944 and reaffirmed by an electoral law reform on June 15, 1945.<ref name="RuizRubio-Marín2012">{{cite book|last1=Ruiz|first1=Blanca Rodriguez|last2=Rubio-Marín|first2=Ruth|title=The Struggle for Female Suffrage in Europe: Voting to Become Citizens|url=https://books.google.com/books?id=3KIMwdbG0EcC&pg=PA330|year=2012|publisher=BRILL|location=Leiden, The Netherlands|isbn=978-90-04-22425-4|pages=329–30}}</ref>
|-
| {{flag|Upper Volta}} <small>(Today: [[Burkina Faso]])</small>
| 1958
|
|-
| {{flagicon image|British Burma 1937 flag.svg}} [[British rule in Burma|Burma]]
| 1922
|
|-
| {{flag|Burundi}}
| 1961
|
|-
| {{flagicon|Cambodia}} [[Kingdom of Cambodia (1953–1970)|Kingdom of Cambodia]]
| 1955
|
|-
| {{flagicon image|British Cameroon Flag.svg}} [[British Cameroons]] <small>(Today: [[Cameroon]])</small>
| 1946
|
|-
| {{flag|Canada|2020}}
| 1917–1919 for most of Canada; Prince Edward Island in 1922; Newfoundland in 1925; Quebec in 1940; 1960 for Aboriginal People without requiring them to give up their status as before
| To help win a [[Conscription Crisis of 1917|mandate for conscription]] during World War I, the federal [[Conservative Party of Canada (1867–1942)|Conservative]] government of [[Robert Borden]] granted the vote in 1917 to war widows, women serving overseas, and the female relatives of men serving overseas. However, the same legislation, the [[Wartime Elections Act]], disenfranchised those who became naturalized Canadian citizens after 1902. Women over 21 who were "not alien-born" and who met certain property qualifications were allowed to vote in federal elections in 1918. Women first won the vote provincially in Manitoba, Saskatchewan, and Alberta in 1916; British Columbia and Ontario in 1917; Nova Scotia in 1918; New Brunswick in 1919 (women could not run for New Brunswick provincial office until 1934); Prince Edward Island in 1922; Newfoundland in 1925 (which did not join Confederation until 1949); and Quebec in 1940.<ref>{{cite encyclopedia|url=http://www.thecanadianencyclopedia.com/articles/womens-suffrage |title=Women's Suffrage| encyclopedia=Canadian Encyclopedia| archive-url=https://web.archive.org/web/20151016084447/http://www.thecanadianencyclopedia.com/en/article/womens-suffrage/|archive-date=October 16, 2015|access-date=March 8, 2012|url-status=live}}</ref>
Aboriginal men and women were not given the right to vote until 1960; previously, they could only vote if they gave up their treaty status. It was not until 1948, when Canada signed the UN's Universal Declaration of Human Rights, that it was forced to examine the issue of discrimination against Aboriginal people.<ref>{{cite web|url=http://www.canadiana.ca/citm/themes/aboriginals/aboriginals12_e.html|title=Canada in the Making – Aboriginals: Treaties & Relations|work=canadiana.ca|url-status=dead|archive-url=https://web.archive.org/web/20150309131216/http://www.canadiana.ca/citm/themes/aboriginals/aboriginals12_e.html|archive-date=March 9, 2015}}</ref>
|-
| {{flag|Cape Verde}}
| 1975 (upon [[Cape Verde#Independence (1975)|its independence]])
|
|-
| {{flag|Cayman Islands}}
| 1957
|
|-
| {{flag|Central African Republic}}
| 1986
|
|-
| {{flag|Chad}}
| 1958
|
|-
| {{flag|Chile}}
| 1949
| From 1934 to 1949, women could vote in local elections at 25, while men could vote in all elections at 21. In both cases, literacy was required.
|- style="background: #F99"
| {{flag|China}} (PRC)
| 1947
| In 1947, women won the suffrage under the Constitution of the Republic of China (ROC). In 1949, the Government of the Republic of China (ROC) lost mainland China and moved to Taiwan. The later Constitution of the People's Republic of China (PRC) recognizes that women and men have equal political rights, but it does not adopt a completely democratic system. Individuals can only vote through restricted indirect elections. The right to be elected is also restricted, and people here have essentially never have a complete and rational right to vote.
|-
| {{flag|Colombia}}
| 1954
|
|-
| {{flag|Comoros}}
| 1956
|
|-
| {{flag|Zaire}} <small>(Today: [[Democratic Republic of the Congo]])</small>
| 1967
|
|-
| {{flag|Congo, Republic of the}}
| 1963
|
|-
| {{flag|Cook Islands}}
| 1893
|
|-
| {{flag|Costa Rica}}
| 1949
|
|-
| {{flag|Côte d'Ivoire}}
| 1952
|
|-
| {{flag|Cuba}}
| 1934
|
|-
| {{flag|Cyprus}}
| 1960
|
|-
| {{flag|Czechoslovakia}} <small>(Today: [[Czechia]], [[Slovakia]])</small>
| 1920
| The Czechoslovak Constitution adopted on 29 February 1920 guaranteed the universal vote for every citizen including women to every electable body.<ref>[https://english.radio.cz/frantiska-plaminkova-feminist-suffragette-who-ensured-czechoslovakias-8106811 Františka Plamínková: the feminist suffragette who ensured Czechoslovakia’s Constitution of 1920 lived up to the principle of equality, Czech Radio (2020).]</ref>
|-
| {{flag|Kingdom of Denmark}} <small>(Including the [[Faroe Islands]] and, at that time, [[Iceland]])</small>
| 1908 at local elections, 1915 at national parliamentary elections
|
|-
| {{flag|Djibouti}}
| 1946
|
|-
| {{flag|Dominican Republic}}
| 1942
|
|-
| {{flag|Ecuador}}
| 1929/1967
|Despite that Ecuador granted women suffrage in 1929, which was earlier than most independent countries in Latin America (except for Uruguay, which granted women suffrage in 1917), differences between men's and women's suffrage in Ecuador were only removed in 1967 (before 1967 women's vote was optional, while that of men was compulsory; since 1967 it is compulsory for both sexes).<ref name="womensuffrage.org"/><ref>{{cite thesis|author=Villavicencio, VPV|title=Women in Ecuador: Exercise of political power since the return to democracy|url=http://dspace.uazuay.edu.ec/bitstream/datos/4210/2/10771_ing.pdf}}</ref>
|-
| {{flag|Egypt}}
| 1956
|
|-
| {{flag|El Salvador}}
| 1939/1950
|Women obtained in 1939 suffrage with restrictions requiring literacy and a higher age. All restrictions were lifted in 1950 allowing women to vote, but women obtained the right to stand for elections only in 1961.<ref>{{cite web|url=http://pdf.usaid.gov/pdf_docs/Pnabu661.pdf|title=Situacion de la mujer rural en El Salvador|language=es|date=November 1994}}</ref>
|-
| {{flag|Equatorial Guinea}}
| 1963
|Effectively a [[one-party state]] under the [[Democratic Party of Equatorial Guinea]] since 1987; [[elections in Equatorial Guinea]] are not considered to be free or fair.
|-
| {{flag|Estonia}}
| 1917
|
|-
| {{flagcountry|Ethiopian Empire}} <small>(Then including [[Eritrea]])</small>
| 1955
|
|-
| {{flag|Fiji}}
| 1963
|
|-
| {{flagicon|Finland}} [[Grand Duchy of Finland]]
| 1906
|Women retained the right to vote when [[Finland]] gained its independence from Russia in 1917.
|-
| {{flag|France}}
| 1944
|
|-
| {{flag|Gabon}}
| 1956
|
|-
| {{flag|Gambia, The}}
| 1960
|
|-
| {{flagicon|Georgia|1990}} [[Democratic Republic of Georgia]]
| 1918
|
|-
| {{flagcountry|Weimar Republic}}
| 1918
|
|-
| {{flag|Ghana}}
| 1954
|
|-
| {{flag|Greece|old}}
| 1930 <small>(Local Elections, Literate Only)</small>, 1952 <small>(Unconditional)</small>
|
|-
| {{flag|Greenland}}
| 1948 <ref name="naalakkersuisut.gl">{{cite web|url=https://naalakkersuisut.gl//da/Naalakkersuisut/Nyheder/2015/03/060315_kampdag|title=Kvindernes internationale kampdag (Government of Greenland, 2015) }}</ref>
|
|-
| {{flag|Guatemala}}
| 1945/1965
|Women could vote from 1945, but only if literate. Restrictions on women's suffrage were lifted in 1965.<ref>{{cite web|url=http://www.idea.int/publications/wip/upload/montenegro-CS-Guatemala.pdf|title=Publications – International IDEA|website=www.idea.int}}</ref>
|-
| {{flag|Guinea}}
| 1958
|
|-
| {{flag|Guinea-Bissau}}
| 1977
|
|-
| {{flag|Guyana}}
| 1953
|
|-
| {{flag|Haiti|1859}}
| 1950
|
|-
| {{flag|Kingdom of Hawaii}}
| 1840–1852
| Universal suffrage was established in 1840, which meant that women could vote. Opposition resulted in a specific denial of women's suffrage in the 1852 constitution.
|-
| {{flag|Honduras}}
| 1955
|
|-
| {{flag|Hong Kong|1910}}
| 1949
|
|-
| {{flagcountry|Hungarian People's Republic (1918–19)}}
| 1919 (partial)<br />1945 (full)
| After 1919 men could vote from the age of 24 while women only gained the right to vote from the age of 30. There were also educational and economical criteria set for both genders, but all criteria were higher for women.<br />After 1945 both men and women gained universal suffrage from the age of 20.
|-
| {{flagicon|India}} [[India]] (upon its independence)
| 1947
| In 1947, on its independence from the United Kingdom, India granted equal voting rights to all men and women.
|-
| {{flag|Indonesia}}
| 1937 (for Europeans only)<br />1945 (for all citizens, granted upon independence)
|
|-
| {{flag|Iran|1925}}
| 1963
|In 1945, during the one-year rule of the Azerbaijani Democratic Party, Iranian Azerbaijani women were allowed to vote and be elected.

|-
| {{flag|Iraq|1963}}
| 1980
|
|-
| {{flag|Ireland}}<!-- Used without date to produce link to Republic of Ireland article. 1918 links to article on the island as a whole; so does 1922 even though IMO it *should* link to the Irish Free State article (predecessor of Ireland the *nation*, i.e., the Republic). As this line relates to the present-day Republic (Northern Ireland is covered under the UK below), it is better linked to the article on the Republic – even though it didn't exist till 1937 (constitution) or 1948 (declared a republic) – than to the island. -->
| 1918 (partial)<br />1922 (full)
| From 1918, with the rest of the United Kingdom, women could vote at 30 with property qualifications or in university constituencies, while men could vote at 21 with no qualification. From separation in 1922, the [[Irish Free State]] gave equal voting rights to men and women.<ref>{{Cite news|url=http://www.thejournal.ie/100-years-centenary-women-vote-3828133-Feb2018/|title=On this day 100 years ago, Irish women got the vote|last=Barry|first=Aoife|work=TheJournal.ie|access-date=October 8, 2018|language=en}}</ref>
|-
| {{flagicon|IMN}} [[Isle of Man]]
| 1881
|
|-
| {{flag|Israel}}
| 1948
|Women's suffrage was granted with the [[Israeli Declaration of Independence|declaration of independence]]. But prior to that in the Jewish settlement in Palestine, suffrage was granted in 1920.
|-
| {{flag|Italy}}
| 1925 (partial), 1945 (full)
|Local elections in 1925. Full suffrage in 1945.
|-
| {{flag|Jamaica|1906}}
| 1944
|
|-
| {{flag|Japan}}
| 1946
|[[1946 Japanese general election]]
|-
| {{flag|Jersey|old}}
| 1919<ref>''Loi sur les Droits Electoraux'', 1919</ref>
| Restrictions on franchise applied to men and women until after Liberation in 1945.
|-
| {{flag|Jordan}}
| 1974
|
|-
| {{flag|Kazakh SSR}}
| 1924
|
|-
| {{flag|Kenya}}
| 1963
|
|-
| {{flag|Kiribati}}
| 1967
|
|-
| {{flag|Korea, North}}
| 1946<ref>{{cite web|url=http://www.ipu.org/wmn-e/suffrage.htm |title=Women's Suffrage |publisher=Ipu.org |date=May 2, 1997|access-date=May 6, 2013}}</ref>
|
|-
| {{flag|Korea, South}}
| 1948
|
|-
| {{flag|Kuwait}}
| 2005<ref>{{cite web|url=https://www.nytimes.com/2005/05/17/world/middleeast/kuwait-grants-political-rights-to-its-women.html|date=May 17, 2005|title=Kuwait Grants Political Rights to Its Women|work=The New York Times}}</ref>
|All voters must have been citizens of Kuwait for at least 20 years.<ref>{{cite web|url=https://www.cia.gov/the-world-factbook/countries/kuwait/|title=The World Factbook}}</ref>
|-
| {{flag|Kyrgyz SSR}}
| 1918
|
|-
| {{flagicon|Laos|1952}} [[Kingdom of Laos]]
| 1958
|
|-
| {{flag|Latvia}}
| 1917
|
|-
| {{flag|Lebanon}}
| 1952<ref>{{cite news |first=Dana |last=Khraiche |url=http://www.dailystar.com.lb/News/Local-News/2012/Feb-24/164431-womens-spring-is-lebanon-ready-for-a-feminist-political-party.ashx#ixzz1rkch52gR |title=Women's spring: Is Lebanon ready for a feminist political party? |newspaper=[[The Daily Star (Lebanon)|The Daily Star]] |date=February 4, 2012 |access-date=August 2, 2015}}</ref>
| In 1952, after a 30-year long battle for suffrage, the bill allowing Lebanese women to vote passed.<ref>{{Cite web|url=https://lebanesestudies.news.chass.ncsu.edu/2014/12/03/lebanese-women-and-the-right-to-vote/|title=Lebanese Women and the Right to Vote|last=Muglia|first=Caroline|date=December 3, 2014|website=Moise A. Khayrallah Center for Lebanese Diaspora Studies at NCSU}}</ref> In 1957 a requirement for women (but not men) to have elementary education before voting was dropped, as was voting being compulsory for men.<ref>{{cite book|title=Elections in Asia and the Pacific: A Data Handbook : Volume I: Middle East, Central Asia, and South Asia|year=2001|publisher=Oxford University Press|isbn=978-0-19-153041-8|page=174|url=https://books.google.com/books?id=BVFBXa69tWMC&q=educationa&pg=PA174}}</ref>
|-
| {{flag|Lesotho}}
| 1965
|
|-
| {{flag|Liberia}}
| 1946
|
|-
| {{flagicon|Libya|1963}} [[Kingdom of Libya]]
| 1963 (1951 local)
|<ref>Simone Bernini, ''Le elezioni politiche del 1952 in Libia'', "Oriente Moderno" Nuova serie, Anno 17 (78), Nr. 2 (1998), pp. 337–51, Fn. 10, p. 339.</ref>
|-
| {{flag|Liechtenstein}}
| 1984
|
|-
| {{flag|Lithuania}}
| 1918
|
|-
| {{flag|Luxembourg}}
| 1919
|Women gained the vote on May 15, 1919, through amendment of Article 52 of Luxembourg's constitution.
|-
| {{flag|Madagascar}}
| 1959
|
|-
| {{flag|Malawi|1964}}
| 1961
|
|-
| {{flagicon|Malaya}} [[Federation of Malaya]] <small>(Today: [[Malaysia]])</small>
| 1955
|First general election for the Federal Legislative Council, two years before independence in 1957
|-
| {{flagicon image|Old State Flag of Maldives.svg}} [[Maldives]]
| 1932
|
|-
| {{flag|Mali}}
| 1956
|
|-
| {{flag|Malta}}
| 1947
|
|-
| {{flag|Marshall Islands}}
| 1979
|
|-
| {{flag|Mauritania}}
| 1961
|
|-
| {{flag|Mauritius|1923}}
| 1956
|
|-
| {{flag|Mexico}}
| 1953
|
|-
| {{flag|Micronesia, Federated States of}}
| 1979
|
|-
| {{flag|Moldova}}
| 1929/1940
| As part of the [[Kingdom of Romania]], women who met certain qualifications were allowed to vote in local elections, starting in 1929. After the [[1938 Constitution of Romania|Constitution of 1938]], voting rights were extended to women for general elections by the Electoral Law 1939.<ref name="impowr.org">{{cite web |url=http://www.impowr.org/content/summary-rights-vote-romania |title=Summary: Rights to Vote in Romania |publisher=impowr.org |access-date=September 1, 2015 |archive-url=https://web.archive.org/web/20141009181905/http://www.impowr.org/content/summary-rights-vote-romania |archive-date=October 9, 2014 |url-status=dead }}</ref> In 1940, after the formation of the [[Moldavian Soviet Socialist Republic|Moldavian SSR]], equal voting rights were granted to men and women.
|-
| {{flag|Monaco}}
| 1962
|
|-
| {{flagicon|Mongolia|1924}} [[Mongolian People's Republic]]
| 1924
|
|-
| {{flag|Morocco}}
| 1963
|
|-
| {{flagicon|Mozambique|1975}} [[People's Republic of Mozambique]]
| 1975
|
|-
| {{flag|Namibia}}
| 1989 (upon its independence)
| At independence from South Africa.
|-
| {{flag|Nauru}}
| 1968
|
|-
| {{flag|Nepal}}
| 1951 (upon gaining Democracy)
|
|-
| {{flag|Netherlands}}
| 1917
|Women have been allowed to vote since 1919. Since 1917 women have been allowed to be voted into office.
|-
| {{flag|Netherlands Antilles}}
| 1949
|
|-
| {{flag|New Zealand}}
| 1893
|
|-
| {{flag|Nicaragua}}
| 1955
|
|-
| {{flag|Niger}}
| 1948
|
|-
| {{flag|Nigeria}}
| 1958
|
|-
| {{flag|Norway}}
| 1913
|
|-
| {{flag|Oman}}
| 1994
|
|-
| {{flag|Pakistan}}
| 1947
| In 1947, on its creation at the [[partition of India]], Pakistan granted full voting rights to men and women.
|-
| {{flag|Palau}}
| 1979
|
|-
|- style="background: #F99"
| {{flag|Palestine}}
| 1996
| Women first voted in local elections in the [[West Bank]] in 1976. Women (and men) first elected a Palestinian parliament in [[1996 Palestinian general election|1996]]. However, the last general election was in [[2006 Palestinian legislative election|2006]]; there was supposed to be another in 2014 but elections have been delayed indefinitely.
|-
| {{flag|Panama}}
| 1941/1946
|Limited women's suffrage from 1941 (conditioned by level of education) equal women's suffrage from 1946.<ref name="womensuffrage.org"/>
|-
| {{flag|Papua New Guinea}}
| 1964
|
|-
| {{flag|Paraguay}}
| 1961
|
|-
| {{flag|Peru}}
| 1955
|
|-
| {{flag|Philippines}}
| 1937
|Filipino women voted in [[1937 Philippine women's suffrage plebiscite|a 1937 plebiscite]] for their right to vote; women first voted in [[1937 Philippine local elections|local elections later that year]].
|-
| {{flag|Pitcairn Islands}}
| 1838
|
|-
| {{flag|Poland}}
| 1918
|
|-
| {{flag|Portugal}}
| 1911/1931/1976
|With restrictions in 1911, later made illegal again until 1931 when it was reinstated with restrictions,<ref name=idea.int>{{cite web|last1=Seppälä|first1=Nina|title=Women and the Vote in Western Europe|url=http://www.idea.int/publications/voter_turnout_weurope/upload/chapter%204.pdf|website=idea.int|access-date=July 8, 2015|archive-url=https://web.archive.org/web/20061101183909/http://www.idea.int/publications/voter_turnout_weurope/upload/chapter%204.pdf|archive-date=November 1, 2006|pages=33–35|url-status=live}}</ref> restrictions other than age requirements lifted in 1976.<ref name=idea.int/><ref name="bbc.co.uk">{{cite web|url=http://www.bbc.co.uk/radio4/womanshour/timeline/votes_to_women.shtml|title=BBC – Radio 4 Woman's Hour – Timeline: When women got the vote|author=BBC|work=bbc.co.uk}}</ref>
|-
| {{flag|Puerto Rico}}
| 1929/1935
|Limited suffrage was passed for women, restricted to those who were literate. In 1935 the legislature approved suffrage for all women.
|- style="background: #F99"
| {{flag|Qatar}}
| 1997
| While required by the constitution, [[Next Qatari general election|general elections]] have been repeatedly delayed.<ref name="qatar-dohanews">{{Cite web|url=https://dohanews.co/legislative-elections-in-qatar-postponed-until-at-least-2019/|title=Legislative elections in Qatar postponed until at least 2019|date=June 1, 2016|access-date=October 2, 2017}}</ref> Only municipal elections have been held thus far.
|-
| {{flag|Romania}}
| 1929/1939/1946
| Starting in 1929, women who met certain qualifications were allowed to vote in local elections. After the [[1938 Constitution of Romania|Constitution from 1938]], the voting rights were extended to women for general elections by the Electoral Law 1939. Women could vote on equal terms with men, but both men and women had restrictions, and in practice the restrictions affected women more than men. In 1946, full equal voting rights were granted to men and women.<ref name="impowr.org"/>
|-
| {{flagicon|Russia}} [[Russian Republic]]
| 1917
| On July 20, 1917, under the [[Russian Provisional Government|Provisional Government]].
|-
| {{flag|Rwanda}}
| 1961
|
|- style="background: #F99"
| {{flag|Saudi Arabia}}
| 2015
| In [[2015 Saudi Arabian municipal elections|December 2015]], women were first allowed to vote and run for office. Suffrage for both men and women is limited to municipal elections.
|-
| {{flag|Samoa}}
| 1990
|
|-
| {{flag|San Marino}}
| 1959
|
|-
| {{flag|São Tomé and Príncipe}}
| 1975
|
|-
| {{flag|Senegal}}
| 1945
|
|-
| {{flag|Seychelles|1976}}
| 1948
|
|-
| {{flag|Sierra Leone}}
| 1961
| In the 1790s, while Sierra Leone was still a colony, women voted in the elections.<ref>{{cite news| url=https://www.economist.com/node/12775514?story_id=12775514 | work=The Economist | title=Life on 70 cents a day | date=December 1, 2008}}</ref>
|-
| {{flag|Singapore|colonial}}
| 1947
|
|-
| {{flag|Solomon Islands}}
| 1974
|
|-
| {{flag|Somalia}}
| 1956
|
|-
| {{flag|South Africa}}
| 1930 (European and Asian women)<br />1994 (all women)
| Women of other races were enfranchised in 1994, at the same time as men of all races.
|-
| {{flag|Spain|1931}}
| 1924<ref name=":0">{{Cite web|url=http://www.congreso.es/portal/page/portal/Congreso/Congreso/Hist_Normas/PapHist/PrimoRiv/legis_1927_1929/docs12091927|title=Documentos Elecciones 12 de septiembre de 1927|last=Congress|website=Congreso de los Diputados|publisher=Congreso de los Diputados|access-date=February 24, 2019}}</ref><ref>{{Cite web|url=https://www.eldiario.es/norte/cantabria/amberes/mujer-voto-Espana_6_596400372.html|title=La mujer y el voto en España|last=Martínez|first=Keruin P.|date=December 30, 2016|website=[[El Diaro (Spain)|El Diaro]]|language=es|access-date=February 25, 2019}}</ref><ref>{{Cite journal|date=2004|title=Los orígenes del sufragismo en España|url=https://www.ucm.es/data/cont/docs/995-2015-01-09-sufragismo.pdf|journal=Espacio, Tiempo y Forma|language=es|location=Madrid|publisher=[[UNED]]|publication-date=January 2015|volume=16|pages=455–482|access-date=February 25, 2019}}</ref> /October 1, 1931<ref name=":0" /><ref name=":1">{{Cite web|url=https://www.20minutos.es/noticia/157744/0/aniversario/sufragio/femenino/|title=75 años del sufragio femenino en España|last=20Minutos|date=October 1, 2006|website=20minutos.es – Últimas Noticias|language=es|access-date=February 25, 2019}}</ref><ref name=":2">{{Cite web|url=https://www.elespanol.com/cultura/historia/20181119/voto-femenino-espana-triunfo-clara-campoamor-acabo/354464821_0.html|title=85 años del voto femenino en España: el triunfo de Clara Campoamor que acabó con ella|date=November 19, 2018|website=[[El Español]]|language=es-ES|access-date=February 25, 2019}}</ref> 1977<ref name=":1"/>
|Women briefly held the right to vote from 1924 to 1926, but an absence of elections mean they never had the opportunity to go to the polls until 1933, after earning the right to vote in the 1931 Constitution passed after the elections.<ref name=":0" /><ref name=":1"/><ref name=":2" /> The government fell after only two elections where women could vote, and no one would vote again until after the death of [[Francisco Franco]].<ref name=":1"/>
|-
| {{flag|Sri Lanka}} <small>(Formerly: [[Ceylon]])</small>
| 1931
|
|-
| {{flag|Sudan}}
| 1964
|
|-
| [[File:Flag of the Netherlands.svg|22px]] [[Surinam (Dutch colony)|Suriname]]
| 1948
|
|-
| {{flag|Swaziland}}
| 1968
|
|-
| {{flag|Sweden}}
| 1919
|
|-
| {{flag|Switzerland}}
| 1971 at federal level, between 1959 and 1990 at local canton level
| Women obtained the right to vote in national elections in 1971.<ref>{{cite news|url=http://news.bbc.co.uk/onthisday/hi/dates/stories/february/7/newsid_2738000/2738475.stm|title=BBC ON THIS DAY – 7 – 1971: Swiss women get the vote|work=bbc.co.uk}}</ref> Women obtained the right to vote at local [[Cantons of Switzerland|canton]] level between 1959 ([[Canton of Vaud|Vaud]] and [[Canton of Neuchâtel|Neuchâtel]] in that year) and 1972, except for 1989 in [[Appenzell Ausserrhoden]] and 1990 in [[Appenzell Innerrhoden]].<ref name="Women dominate new Swiss cabinet">{{cite news|url=https://www.bbc.com/news/world-europe-11387996|title=Women dominate new Swiss cabinet|newspaper=BBC News|date=September 2, 2010}}</ref> See also [[Women's suffrage in Switzerland]].
|-
| {{flag|Syria|1932}}
| 1949
|
|-
| [[File:Flag of the Grand Duchy of Tuscany (1840).svg|23px|border]] [[Grand Duchy of Tuscany]]
| 1848
|
|-
| {{flag|Taiwan}}
| 1947
| In 1945, the island of Taiwan was returned from Japan to China. In 1947, women won the suffrage under the [[Constitution of the Republic of China]]. In 1949, the Government of the Republic of China (ROC) lost mainland China and moved to Taiwan.
|-
| {{flag|Tajik SSR}}
| 1924
|
|-
| {{flag|Tanzania}}
| 1959
|
|-
| {{flag|Thailand}}
| 1932
|
|-
| {{flag|Timor-Leste}}
| 1976
|
|-
| {{flag|Togo}}
| 1945
|
|-
| {{flag|Tonga}}
| 1960
|
|-
| {{flag|Trinidad and Tobago}}
| 1925
|Suffrage was granted for the first time in 1925 to either sex, to men over the age of 21 and women over the age of 30, as in Great Britain (the "Mother Country", as Trinidad and Tobago was still a colony at the time)<ref>{{cite book| author = Kirk Meighoo| title = Politics in a 'Half-Made Society': Trinidad and Tobago, 1925–2001| publisher = James Curry, Oxford| isbn = 978-0-85255-873-7| year = 2003| page = 11}}</ref> In 1945 full suffrage was granted to women.<ref>{{cite web|url=http://www.nzhistory.net.nz/politics/womens-suffrage/world-suffrage-timeline|title=World suffrage timeline – Women and the vote |work=nzhistory.net.nz}}</ref>
|-
| {{flag|Tunisia}}
| 1957
|
|-
| {{flag|Turkey}}
| 1930 (for local elections), 1934 (for national elections)
|
|-
| {{flag|Turkmen SSR}}
| 1924
|
|-
| {{flag|Tuvalu}}
| 1967
|
|-
| {{flag|Uganda}}
| 1962
|
|-
| {{flag|Ukrainian SSR}}
| 1919
|
|- style="background: #F99"
| {{flag|United Arab Emirates}}
| 2006
| Limited suffrage for both men and women.<ref>[[2011 United Arab Emirates parliamentary election]]</ref><ref>{{cite web |url=http://www.realclearworld.com/news/reuters/international/2011/Sep/24/uae_s_second_election_has_low_turnout.html |title=UAE's second election has low turnout |work=Real Clear World |date=September 2, 2011|access-date=September 27, 2011 |url-status=dead |archive-url=https://web.archive.org/web/20120407131133/http://www.realclearworld.com/news/reuters/international/2011/Sep/24/uae_s_second_election_has_low_turnout.html |archive-date=April 7, 2012 }}</ref>
|-
| {{flag|United Kingdom}}
| 1918 (partial)<br />1928 (full)
| From 1918 to 1928, women could vote at 30 with property qualifications or as graduates of UK universities, while men could vote at 21 with no qualification. From 1928 women had equal suffrage with men.
|-
| {{flag|United States|1912}}
| 1920 (partial)<br />1965 (full)
| Before the ratification of the [[Nineteenth Amendment to the United States Constitution|Nineteenth Amendment]] in 1920, individual states had passed legislation that allowed women to vote in different types of elections; some only allowed women to vote in school or municipal elections, some required that women owned property if they wanted to vote, and some territories extended full suffrage to women, only to take it away once they became states.<ref>{{cite web |url=http://depts.washington.edu/moves/WomanSuffrage_map.shtml |title= Timeline and Map of Woman Suffrage Legislation State by State 1838–1919}}</ref> Although legally entitled to vote, black women were effectively [[Segregation in the United States|denied voting rights]] in numerous Southern states until 1965.
|-
| {{flag|United States Virgin Islands}}
| 1936
| Beginning in 1936 women could vote; however, this vote, as with men, was limited to those who could prove they had an income of $300 per year or more.
|-
| {{flag|Uruguay}}
| 1917/1927
| Uruguay was the first country in all of the Americas&nbsp;– and one of the first in the world&nbsp;– to grant women fully equal civil rights and universal suffrage (in its Constitution of 1917), though this suffrage was first exercised in 1927, in the plebiscite of [[Cerro Chato]].<ref>{{cite web|url=http://www.lr21.com.uy/comunidad/263868-el-voto-femenino-cumple-ochenta-anos-en-uruguay |title=El voto femenino cumple ochenta años en Uruguay – Noticias Uruguay LARED21 |publisher=Lr21.com.uy |date=July 3, 2007 |access-date=October 25, 2015|language=es}}</ref>
|-
| {{flag|Uzbek SSR}}
| 1938
|
|-
| {{flag|Vanuatu}}
| 1975
|
|- style="background: #F99"
| {{flag|Vatican City}}
| data-sort-value="9999"|No voting
| The Pope, elected by the all-male [[College of Cardinals]] through a secret ballot, is the leader of the Catholic Church, and exercises ex officio supreme legislative, executive, and judicial power over the State of the Vatican City.<ref>{{cite web|url=http://www.wipo.int/wipolex/en/text.jsp?file_id=220612|title=Fundamental Law of the Vatican City State}}</ref>
|-
| {{flag|Venezuela}}
| 1946
|
|-
| {{flag|Vietnam}}
| 1946
|
|-
| {{flag|North Yemen}} <small>(Today: [[Yemen]])</small>
| 1970
|
|-
| {{flag|South Yemen}} <small>(Today: [[Yemen]])</small>
| 1967
|
|-
| {{flag|Zambia}}
| 1962 (then [[Northern Rhodesia]])
|Women's suffrage granted in [[Northern Rhodesia]] in 1962.<ref>{{cite web|title=Country Profil: Zambia|work=Action for Southern Africa|url=http://www.actsa.org/Pictures/UpImages/pdfs/ACTSA_Country_Profile_Zambia_Aug10.pdf}}</ref>
|-
| {{flag|Southern Rhodesia}} <small>(Today: [[Zimbabwe]])</small>
| 1919 (whites only)
| 1978 (full)
|-
| {{flag|Yugoslavia}} <small>(Today: [[Serbia]], [[Montenegro]], [[Croatia]], [[Slovenia]], [[Bosnia and Herzegovina]], [[North Macedonia]])</small>
| 1945
|
|-}`
)}

function _refsToWiki(){return(
function refsToWiki(text) {
  return text
    .replace(/<ref[^>]*>{{(.*)}}<\/ref>/, (outer, str) => {
      const decoded = str.split("|").reduce((wip, part) => {
        let kv = part.match(/([^=]*)=(.*)/);
        if (kv) {
          wip[kv[1]] = kv[2];
        }
        return wip;
      }, {});

      return `(source [[${decoded.url}|${decoded.title}]])`;
    })
    .replace(/<ref[^>]*>(.*)<\/ref>/, (str, inside) => {
      const url = inside.split(' ')[0];
      const rest = inside
        .split(' ')
        .slice(1)
        .join(' ');
      return `(source [${url}|${rest}])`;
    })
    .replace(/<ref [^>]*\/>/, '');
}
)}

function _36(refsToWiki){return(
refsToWiki(
  '<ref>{{cite web |url=http://depts.washington.edu/moves/WomanSuffrage_map.shtml |title= Timeline and Map of Woman Suffrage Legislation State by State 1838–1919}}</ref>'
)
)}

function _37(md){return(
md`## Thanks to everyone

Thank you Observable for organizing this event.

Thank you https://vega.github.io/vega/examples/world-map/

Thank you https://github.com/topojson/world-atlas

Thank you [@mbostock](https://observablehq.com/@tomlarkworthy) for everything.

Thank you https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes

Thank you https://observablehq.com/@makio135/give-me-colors

Thank you https://observablehq.com/@vega/how-vega-works

Thank you https://observablehq.com/@manzt/mcv-choropleth-map-with-barchart-using-vega-embed
`
)}

function _38(md){return(
md`## Imports`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["3166.json", {url: new URL("./files/bae0c4fd86fee87a2fb1193094b9c9deb2ec1fe48e4de742816c3bb0a2686d3667d4f64a6c4772f23a350b7f638fc8da9ac21059a5436a212e8f77c212caa1a6.json", import.meta.url), mimeType: "application/json", toString}],
    ["world-110m.v1.json", {url: new URL("./files/0ca9148938fe656b24d3cd9474fc7190de67f0c2fa0c6940f93f874da1572341e3691665fd40b708cdd5573317e4b18f96bfc1d3617464cb0dc2d8b607c3bddd.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["svg","w","h","map","year"], _3);
  main.variable(observer("viewof year")).define("viewof year", ["Scrubber","years","localStorage","begin"], _year);
  main.variable(observer("year")).define("year", ["Generators", "viewof year"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("noteworthy")).define("noteworthy", ["Table","recentEvents","html","wiki","refsToWiki"], _noteworthy);
  main.variable(observer()).define(["noteworthy"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("controls")).define("controls", ["html"], _controls);
  main.variable(observer("years")).define("years", ["begin"], _years);
  main.variable(observer("begin")).define("begin", _begin);
  main.define("initial recentEvents", _recentEvents);
  main.variable(observer("mutable recentEvents")).define("mutable recentEvents", ["Mutable", "initial recentEvents"], (M, _) => new M(_));
  main.variable(observer("recentEvents")).define("recentEvents", ["mutable recentEvents"], _ => _.generator);
  main.variable(observer("updateMap")).define("updateMap", ["mapCodes","year","events","codeGroup","_","viewof mapColors","mutable recentEvents","localStorage"], _updateMap);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("iso3166")).define("iso3166", ["FileAttachment"], _iso3166);
  main.variable(observer("countryCodeIndex")).define("countryCodeIndex", ["iso3166"], _countryCodeIndex);
  main.variable(observer("findCode")).define("findCode", ["iso3166"], _findCode);
  main.variable(observer("codeGroup")).define("codeGroup", _codeGroup);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["width"], _20);
  main.variable(observer("w")).define("w", ["width"], _w);
  main.variable(observer("h")).define("h", ["width"], _h);
  main.variable(observer("map")).define("map", ["embed","spec","controls"], _map);
  main.variable(observer("spec")).define("spec", ["w","h","mapColors","FileAttachment"], _spec);
  main.variable(observer("geo")).define("geo", _geo);
  main.variable(observer("mapCodes")).define("mapCodes", ["geo"], _mapCodes);
  main.variable(observer("viewof mapColors")).define("viewof mapColors", ["View","mapCodes"], _mapColors);
  main.variable(observer("mapColors")).define("mapColors", ["Generators", "viewof mapColors"], (G, _) => G.input(_));
  main.variable(observer("embed")).define("embed", ["require"], _embed);
  const child1 = runtime.module(define1);
  main.import("View", child1);
  main.variable(observer()).define(["md"], _30);
  const child2 = runtime.module(define2);
  main.import("tableExtractor", child2);
  main.variable(observer("events")).define("events", ["timeline"], _events);
  main.variable(observer("timeline")).define("timeline", ["wikitable","findCode"], _timeline);
  main.variable(observer("wikitable")).define("wikitable", _wikitable);
  main.variable(observer("refsToWiki")).define("refsToWiki", _refsToWiki);
  main.variable(observer()).define(["refsToWiki"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  const child3 = runtime.module(define3);
  main.import("Scrubber", child3);
  const child4 = runtime.module(define4);
  main.import("Table", child4);
  const child5 = runtime.module(define5);
  main.import("fetchp", child5);
  const child6 = runtime.module(define6);
  main.import("_", child6);
  const child7 = runtime.module(define7);
  main.import("wiki", child7);
  const child8 = runtime.module(define8);
  main.import("localStorage", child8);
  return main;
}
