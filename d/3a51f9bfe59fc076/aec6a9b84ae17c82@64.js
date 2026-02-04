import define1 from "./24d44701a38923c7@1217.js";
import define2 from "./13b21d7027573d80@617.js";
import define3 from "./c8a3fa7d5bab7fdc@753.js";
import define4 from "./87d38bde8d0937ca@326.js";
import define5 from "./ab5a63c64de95b0d@1067.js";

function _1(md){return(
md`# Lopecode - Substrate 2026
## Substrate 2026, Tom Larkworthy`
)}

function _7(md){return(
md`Relevant modules

"@tomlarkworthy/lopecode-vision"
"@tomlarkworthy/micro-kernel-design"
"@tomlarkworthy/lopecode-tour"

Technical contributions

"@tomlarkworthy/robocoop-3"
"@tomlarkworthy/editable-md"
"@tomlarkworthy/dataflow-templating"
"@tomlarkworthy/jumpgate",
`
)}

function _8(md){return(
md`## Call for Contributions

An increasing number of researchers see their work as interactive authoring tools or software substrates for interactive computational media. By talking about “authoring tools”, we remove the divide between programmers and users; “software substrates” let us look beyond conventional programming languages and systems; and “interactive computational media” promises a more malleable and adaptable notion of tools for thought we are striving for. This workshop aims to bring together a wide range of perspectives on these matters.

Researchers in education, design, and software systems alike have long explored how computation can become visible and adaptable to its users, from diSessa’s learner-centered Boxer microworlds of the 80s, Hypercard, and Maclean et al’s Buttons. Even mundane systems such as spreadsheets blur the distinction between use and creation.

The notion of a substrate is an umbrella for many different traditions which are bringing local agency over software systems.

Our values are aligned with the Malleable Systems community who consider that software should be as easy to change as it is to use – a well-received essay on malleable software coincided with last year’s workshop. Another alignment is with the local-first community who declare that you own your own data, in spite of the cloud.

Substrates are not limited to interactive systems with a user interface. Kell’s (2009) concept of an integration domain stretches the domain of substrates to link-time transformations of executable binaries and the lowest levels of the operating system (should there be one?). This leads us on to the core role of a substrate in establishing a relationship between the inside and outside of a running system. The notions of addressability and externalisability from Basman et al (2018) explain how to refer to and transmit the contents of a substrate from place to place, and open authorship which compiles substrate contents from an ecology of authors rather than insisting one author’s expression has authority over another. This notion of compilation derives from the data feminism framework of D’Ignazio and Klein (2020) which challenges differentials of power in data ecologies.

The common theme amongst all of these alignments of the substrate movement is that the full capabilities of the system, whether these relate to visibility, adaptation or transmission, should be placed at the disposal of the user rather than hidden behind abstraction or implementation boundaries, which positions substrates as a political project. The framework of Ecofeminism (Shiva & Mies, 1993) provides a clear feminist lens with which to see the importance of promoting local agency and user creativity in an ecology of artefacts:

Dominant economics is unable to take [self-provision] into account because it counts as production only that in which the producer and consumer are different, that means that only commodity production is production, and self-provisioning is non-productive work. This is the viewpoint that counts women’s heavy work-load as non-work.

At odds with the substrate movement are popular idioms such as functional programming and object-oriented programming which rely on creating impermeable boundaries between producers and consumers. Because of this, environments based on different idioms such as reactive programming or edit calculi are especially of interest to the substrate community. However, we are also interested both in tools made with other paradigms that exhibit substrate ideas as well as discussing the underlying trade-offs offered to substrates by different paradigms, and paradigm combinations.

A timely issue is the relationship of the substrates programme with software construction by AI. If the majority of code in future systems is synthesized by AI, some might say there is no purpose to developing fresh programming language notations. Others argue that the time has never been more promising for this, and that better notations and substrate transparency may assist AI and human designers alike. Early results from the lopecode substrate and its AI integration, robocoop, support this. Cao et al (2025) have recently written on the importance of substrates as a locus of human-AI cooperation.

The range of vision statements we received in Substrates-25 spanned from the most abstract in which substrate nature can be read into essentially any runtime, to the most concrete which considered that a successful substrate, once fully elaborated, might prove to have a unique canonical structure. We expect Substrates-26 to continue to explore this tension rather than force a collapse onto a particular vision, since a most important aspect to our research programme is to establish how substrate-oriented systems are expected to coexist with and interpenetrate those developed using conventional programming languages.

Substrates-26 also seeks to broaden participation beyond those who might traditionally identify as academic researchers. It is a perennial problem in our communities that work continues in separated self-citing silos who remain unaware of each other’s work over long timescales. It is our aim to create a forgiving, welcoming venue where workers with greatly divergent backgrounds can encounter and enrich each other.

We welcome participation from workers from academia, industry, independent scholars, and others, from any of the communities named above, and from any others who can see their goals reflected in the substrate agenda.

## How to participate: Call for Contributions
The day-long workshop will be structured in 3 phases:

Firstly a phase of introductions where each participant can take up to two minutes to explain their programme, background or system.

Secondly, presentations of materials from accepted submissions. These presentations can be short talks, demos, or videos, and will be represented in the workshop proceedings. Each submission will receive a critical response of reflective, constructive feedback from a member of the programme which will be presented after the submission.

Thirdly, we will accept suggestions for “lightning” talks or works in progress, which will not receive a written critical response.

Accordingly, we ask for 3 kinds of contributions:

i) A short introduction, positioning the submitter’s background or projects against the substrates agenda. We’d like all attendees to provide this.

ii) A submitted artefact, which will be reviewed by the programme committee for inclusion in the workshop. Suggestions for a form of the contribution are a paper of 2-4 pages, a video of up to 10 minutes, or a brief description of a working demo, to be presented at the workshop, but this is not exhaustive - submitters should feel free to produce a contribution of any form which could gracefully be accommodated into the schedule.

iii) A proposal for a lightning talk, demo or more lightweight update on work or thought in progress, which will not receive a written critical response from the committee.

The workshop will have a hybrid format and welcomes submissions to be delivered online by those unable to attend in person.`
)}

function _9(md){return(
md`## Plan

### What Lopecode “is” as a Substrates-26 contribution (positioning)
Present Lopecode as a **working reference substrate** that operationalizes three claims in a way most substrate papers only argue for:

1) **Runtime-as-source-of-truth**  
   The canonical artifact is the *live dataflow graph* (modules + variables + definitions), not external source files. Editing, debugging, testing, and serialization all target this runtime graph.

2) **μ-kernel + userspace programming system**  
   The kernel is the Observable Runtime (reactive, late-bound dependency graph, module loading). Everything people normally treat as “the environment” (notebook UI, editor, debugger, exporter, tests, agent) is *userspace modules* that you can inspect and hot-edit.

3) **Durable, offline-first distribution + stateful artifacts**  
   Single-file HTML export that runs from \`file://\` (no server, no network), plus **writable file attachments** so an artifact can carry forward state across exports (so it’s not “just a demo,” it’s a durable computational medium).

That combination is unusually aligned with the workshop’s language about **addressability/externalisability**, **open authorship**, **local agency**, and the “relationship between inside and outside of a running system.”

---

### Contribution ideas that would land best at Substrates-26 (pick 1 primary + 1 supporting)

#### A) “A substrate you can download and keep forever” (most impact with broad audience)
**Core message:** Lopecode is a substrate that makes computational media durable *without infrastructure*.

- Show: download → open offline → modify → re-export → it still works.
- Emphasize: no toolchain, no server, no npm install; the “artifact is the environment.”

**Why it hits:** it’s legible to educators, designers, and systems people; it’s political/local-first; it’s an immediate contrast to most research prototypes.

#### B) “Userspace tools as first-class substrate research” (most impact with substrate specialists)
**Core message:** The key novelty is not *a new runtime* but *moving the entire programming system into userspace* atop an existing kernel.

- Show: replace the visualizer, patch the editor, add a new projection of state.
- Tie to: malleable systems, Smalltalk-style moldability, Kell-style integration domains.

**Why it hits:** it reframes research contributions from “build a whole environment” to “build tools as modules” that can compose.

#### C) “Human–AI co-programming inside the substrate” (flashiest demo)
**Core message:** Robocoop-style agents work best when the substrate is reflective and editable from within.

- Show: ask the agent to locate a variable, patch it, run tests, iterate.
- Emphasize: tools are *runtime actions* (list variables, upsert variables), not text diffs.

**Why it hits:** it’s timely; and it demonstrates that substrate transparency supports AI *and* human debugging.

My recommendation: **A as the headline**, **B as the technical spine**, and **C as the closing demo**.

---

### How to present for biggest impact (structure of the submission + demo)
#### 1) Title that signals the “payload”
Good patterns:
- **“Lopecode: a Durable, Offline-First, Self-Hosting Reactive Substrate (Runtime-as-Source-of-Truth)”**
- **“Userspace Programming Systems on a Reactive μ-Kernel: Lopecode”**

#### 2) A 3-minute demo arc (the “wow” sequence)
1. **Start offline** (literally disable network / airplane mode).  
   Open the single HTML file. It runs.

2. **Show substrate visibility**  
   Open module explorer / runtime graph. Show that the system can *see itself*.

3. **Edit in place**  
   Use inline editable markdown or the userspace editor to change a definition. Watch dependents update.

4. **Persist state**  
   Change a “writable attachment” note/config; export; reopen the exported file; the state remains.

5. **(Optional) Agent assist**  
   Ask robocoop to implement a tiny change and run tests.

That demo tells a complete story: *durable artifact → reflective substrate → live change → persistence → scalable modification assistance.*

#### 3) Make the research claim explicit (don’t let it be “a cool notebook”)
Frame it as evaluable contributions:
- A **design principle**: runtime is canonical.
- A **system architecture**: μ-kernel + userspace tools.
- A **mechanism**: decompile/compile/hot-patch loop; exporter; writable attachments.
- A **research method**: tools and experiments are themselves shareable modules in the substrate.

#### 4) Name the “substrate values” it supports (map to the CFP language)
- **Addressability**: any variable/module can be located and operated on programmatically.
- **Externalisability**: whole runtime can be serialized to a portable artifact.
- **Open authorship**: the environment is composed from an ecology of modules; no privileged editor.
- **Local agency / local-first**: run and modify without a cloud.

---

### What to submit
- **2–4 page lopecode document**: strongest for impact. Include architecture diagram + 2 short interactive “vignettes” (offline durable artifact; userspace tool replacement; AI patch loop).
- **10-minute video**: great if you can show the offline + re-export loop cleanly.
`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("_0", child1);
  const child2 = runtime.module(define2);
  main.import("_1", child2);
  const child3 = runtime.module(define3);
  main.import("_2", child3);
  const child4 = runtime.module(define4);
  main.import("_3", child4);
  const child5 = runtime.module(define5);
  main.import("_4", child5);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  return main;
}
