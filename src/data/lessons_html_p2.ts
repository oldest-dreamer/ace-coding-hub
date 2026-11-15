import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_HTML_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'HTML Chapter 6 (HTML5/CSS3): Responsive Media Queries & Conditional Styling',
    banglaTitle: 'HTML অধ্যায় ৬ (HTML5/CSS3): রেসপন্সিভ মিডিয়া কোয়েরি ও কন্ডিশনাল স্টাইলিং',
    subtitle: 'Mobile-first @media (min-width) branches, @container queries, and OS dark/reduced-motion rules.',
    zeroIntuition: {
      plainEnglishStory:
        'Imagine designing a printed broadsheet that automatically folds into a pocket-sized card deck when carried on a commute and expands back into three columns on a studio desk. That is what CSS conditional branching achieves for web interfaces: you write one semantic HTML tree and use `@media` and `@container` rules as declarative `if / else if` forks for layout geometry, typography scale, and accessibility preferences.\n\nModern responsive engineering follows a mobile-first cascade: default base rules define a crisp single-column reading stack for narrow phones, while progressive `@media (min-width: 640px)` and `@media (min-width: 1024px)` branches unlock multi-column grids as viewport width expands. Pairing `@container (min-width: ...)` queries with `prefers-color-scheme` and `prefers-reduced-motion` ensures components adapt both to parent slot geometry and OS eye-comfort settings.',
      asciiFlowchart: `Viewport / Container Width Check
   |
   +--> (width < 640px)  --> Base Mobile CSS (1-column stack)
   +--> (width >= 640px) --> @media (min-width: 640px)  --> 2-column grid
   +--> (width >= 960px) --> @media (min-width: 960px)  --> 3-column grid

OS Preference Branch
   +--> prefers-color-scheme: dark     --> Switch CSS surface tokens
   +--> prefers-reduced-motion: reduce --> Disable hover/keyframe transitions`,
      pseudocode: [
        '1. DECLARE <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '2. STYLE base 1-column mobile flow outside any @media block',
        '3. ADD progressive @media (min-width: 640px / 960px) grid branches',
        '4. USE @container (min-width: ...) for slot-aware reusable cards',
        '5. GUARD animations with @media (prefers-reduced-motion: reduce)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলস্টেশনের ডিজিটাল বোর্ড ও ভাঁজ করা ছাতা',
        explanation:
          'HTML ও CSS-এ আমরা মোবাইল আর ল্যাপটপের জন্য আলাদা আলাদা ওয়েবসাইট বানাই না। বরং একটিই HTML কাঠামো লিখে CSS দিয়ে শর্ত জুড়ে দিই—একে বলে Responsive Media Query। মনে করো একটি ভাঁজ করা ছাতার কথা: ব্যাগে থাকলে ছোট জায়গা নেয়, আর বৃষ্টিতে খুললে বড় হয়ে যায়। ঠিক তেমনি মোবাইলের সরু স্ক্রিনে ওয়েবসাইটের কার্ডগুলো একটার নিচে আরেকটা (১ কলাম) দেখাবে, আর ট্যাবলেট বা বড় মনিটরে পাশাপাশি ২ বা ৩ কলামে সাজানো থাকবে। আধুনিক পদ্ধতি হলো Mobile-First ডিজাইন, যেখানে প্রথমে ছোট স্ক্রিনের জন্য সাধারণ স্টাইল লেখা হয়। তারপর `@media (min-width: 640px)` শর্ত দিয়ে বড় স্ক্রিনের জন্য অতিরিক্ত কলাম যোগ করা হয়। এর পাশাপাশি নতুন `@container` কুয়েরি ব্যবহার করলে একটি কার্ড নিজেই নিজের প্যারেন্ট বক্সের প্রস্থ মেপে রূপ বদলাতে পারে। আবার ব্যবহারকারীর ফোনে ডার্ক মোড বা Reduced Motion চালু থাকলে `@media (prefers-color-scheme)` ও `@media (prefers-reduced-motion)` স্বয়ংক্রিয়ভাবে তা মেনে নেয়। সঠিকভাবে viewport মেটা ট্যাগ না দিলে কিন্তু মোবাইলে কোনো শর্তই ঠিকমতো কাজ করবে না। তাই প্রতিটি HTML5 পেজের `<head>`-এ `width=device-width` মেটা ট্যাগ থাকা চাই-ই চাই।',
        everydayExample:
          'রেলস্টেশনের ডিসপ্লে বোর্ড ছোট ফোনে শুধু ট্রেনের নাম ও সময় দেখায়, কিন্তু বড় টিভিতে প্ল্যাটফর্ম নম্বর ও বগির অবস্থানও পাশাপাশি দেখায়।',
        keyTakeaways: [
          '<head>-এ viewport meta tag ছাড়া মোবাইলে @media query সঠিকভাবে কাজ করে না।',
          'Mobile-first মানে আগে ১-কলাম বেস CSS, পরে `min-width` দিয়ে বড় স্ক্রিনের শাখা।',
          '`prefers-reduced-motion` ও `prefers-color-scheme` ব্যবহারকারীর চোখ ও সুরক্ষাকে সম্মান করে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Mobile-First Breakpoint Grid (1 -> 2 -> 3 Columns)',
        englishParagraphs: [
          'A mobile-first layout starts with `grid-template-columns: 1fr` as the base rule so 360px phones render cleanly without horizontal scrolling.',
          'Once viewport width crosses `640px` and `960px`, progressive `@media (min-width: ...)` branches upgrade `.cards` into two and three equal tracks.',
        ],
        banglaParagraphs: [
          'Mobile-first ডিজাইনে ডিফল্টভাবে কার্ডগুলো ১ কলামে নিচে নিচে থাকে যাতে সরু স্ক্রিনে লেখা কেটে না যায়।',
          'স্ক্রিন ৬৪০px ও ৯৬০px ছাড়ালে `@media (min-width)` স্বয়ংক্রিয়ভাবে ২ ও ৩ কলাম চালু করে।',
        ],
        memoryDiagram: `375px -> .cards { 1fr } | 768px -> repeat(2, 1fr) | 1200px -> repeat(3, 1fr)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; background: #0f172a; color: #f8fafc; }
    .cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
    .card { padding: 14px; border-radius: 10px; background: #1e293b; border: 1px solid #334155; }
    @media (min-width: 640px) { .cards { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 960px) { .cards { grid-template-columns: repeat(3, 1fr); } }
  </style>
</head>
<body>
  <h1>Responsive Course Tracks</h1>
  <section class="cards">
    <article class="card">C23 Systems</article>
    <article class="card">Python 3.13</article>
    <article class="card">Rust 2024</article>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Responsive Course Tracks',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0" />', whatItMeans: 'Matches CSS pixel width to physical device screen.', whyItIsThere: 'Prevents mobile browsers from simulating a 980px viewport.', ifDeletedError: 'Smartphone ignores @media (min-width: 640px) accuracy.' },
          { lineNumber: 'Line 8', codeSnippet: '.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }', whatItMeans: 'Sets default 1-column mobile layout.', whyItIsThere: 'Mobile-first base before media branches.', ifDeletedError: 'Cards lose grid gap and responsive structure.' },
          { lineNumber: 'Line 10', codeSnippet: '@media (min-width: 640px) { .cards { grid-template-columns: repeat(2, 1fr); } }', whatItMeans: 'Conditional 2-column tablet branch.', whyItIsThere: 'Utilizes extra horizontal width cleanly.', ifDeletedError: 'Tablets stay stuck in 1 narrow column.' },
        ],
      },
      {
        id: 'html-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Slot-Aware Component Layout with @container Queries',
        englishParagraphs: [
          'Traditional `@media` only reads browser window width, which fails when a card sits inside a narrow sidebar on a wide desktop screen.',
          'Marking a wrapper with `container-type: inline-size` enables `@container (min-width: 400px)` so the widget switches between column and row cleanly.',
        ],
        banglaParagraphs: [
          '`@media` শুধু পুরো উইন্ডো মাপে, কিন্তু বড় মনিটরের সরু সাইডবারে কার্ড রাখলে তা ভেঙে যেতে পারে।',
          '`container-type: inline-size` ও `@container` দিলে কার্ড নিজের প্যারেন্টের প্রস্থ মেপে ডিজাইন বদলায়।',
        ],
        memoryDiagram: `.slot (inline-size) < 400px -> flex-direction: column | >= 400px -> row`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .slot { container-type: inline-size; max-width: 480px; border: 1px dashed #64748b; padding: 12px; }
    .profile { display: flex; flex-direction: column; gap: 10px; padding: 14px; background: #1e293b; color: #f8fafc; border-radius: 10px; }
    @container (min-width: 400px) { .profile { flex-direction: row; align-items: center; } }
  </style>
</head>
<body>
  <h1>Container Query Profile</h1>
  <div class="slot">
    <article class="profile"><strong>AC</strong><span>Adapts to parent width!</span></article>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Container Query Profile',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: '.slot { container-type: inline-size; ... }', whatItMeans: 'Registers .slot as a tracked size container.', whyItIsThere: 'Allows descendant @container queries to read .slot width.', ifDeletedError: '@container rule never activates.' },
          { lineNumber: 'Line 8', codeSnippet: '@container (min-width: 400px) { .profile { flex-direction: row; align-items: center; } }', whatItMeans: 'Switches profile card to horizontal row layout inside wide slots.', whyItIsThere: 'Component remains modular in sidebars or main grids.', ifDeletedError: 'Card stays vertically stacked regardless of container size.' },
        ],
      },
      {
        id: 'html-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'OS Theme Tokens & Reduced Motion Safety Branch',
        englishParagraphs: [
          'Browsers expose OS-level dark mode and vestibular motion preferences straight to CSS media features.',
          'Pairing `prefers-color-scheme: dark` with `prefers-reduced-motion: reduce` respects user comfort natively without JavaScript.',
        ],
        banglaParagraphs: [
          'ব্যবহারকারীর ডিভাইসে ডার্ক মোড বা রিডিউসড মোশন অন থাকলে ব্রাউজার সরাসরি CSS-কে তা জানিয়ে দেয়।',
          '`prefers-color-scheme` ও `prefers-reduced-motion` দিয়ে চোখ ও মাথাব্যথা থেকে সুরক্ষিত UI বানানো যায়।',
        ],
        memoryDiagram: `OS dark -> --bg:#070b14 | OS reduced-motion -> transition: none`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --bg: #f7f3e8; --ink: #1c1917; --btn: #059669; }
    @media (prefers-color-scheme: dark) { :root { --bg: #070b14; --ink: #f8fafc; --btn: #10b981; } }
    body { background: var(--bg); color: var(--ink); font-family: system-ui, sans-serif; padding: 20px; }
    .cta { background: var(--btn); color: #fff; padding: 10px 18px; border: 0; border-radius: 8px; transition: transform 0.2s; }
    @media (prefers-reduced-motion: reduce) { .cta { transition: none; } }
  </style>
</head>
<body>
  <h1>Adaptive Preference Banner</h1>
  <button class="cta" type="button">Launch Lesson</button>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Adaptive Preference Banner',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '@media (prefers-color-scheme: dark)', whatItMeans: 'Detects system dark theme setting.', whyItIsThere: 'Updates CSS variables cleanly in one block.', ifDeletedError: 'Page stays bright paper theme even in dark OS mode.' },
          { lineNumber: 'Line 10', codeSnippet: '@media (prefers-reduced-motion: reduce)', whatItMeans: 'Detects OS motion-reduction accessibility toggle.', whyItIsThere: 'Removes transitions for sensitive users.', ifDeletedError: 'Animated movement continues despite OS preference.' },
        ],
      },
      {
        id: 'html-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Media Queries Level 4 Range Syntax vs. Overlap Trap',
        englishParagraphs: [
          'Using legacy `max-width: 768px` alongside `min-width: 768px` creates an exact 1px boundary collision at 768px.',
          'Media Queries Level 4 range inequalities (`640px <= width < 1024px`) express clean half-open intervals with zero ambiguity.',
        ],
        banglaParagraphs: [
          'পুরোনো `max-width: 768px` ও `min-width: 768px` পাশাপাশি লিখলে ঠিক ৭৬৮px প্রস্থে দুটি নিয়মই সংঘর্ষ করে।',
          'নতুন CSS রেঞ্জ সিনট্যাক্স (`640px <= width < 1024px`) দিয়ে নিখুঁত ব্যবধান নির্ধারণ করা যায়।',
        ],
        memoryDiagram: `TRAP: min=768 & max=768 clash | FIX: @media (640px <= width < 1024px)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    .band { padding: 14px; border-radius: 8px; background: #0f766e; color: #fff; font-family: system-ui, sans-serif; }
    @media (640px <= width < 1024px) { .band { background: #b45309; } }
    @media (width >= 1024px) { .band { background: #1d4ed8; } }
  </style>
</head>
<body>
  <h1>Media Range Syntax</h1>
  <div class="band">Tablet range uses half-open inequality bounds.</div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Media Range Syntax',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '@media (640px <= width < 1024px)', whatItMeans: 'Half-open width check excluding 1024px.', whyItIsThere: 'Prevents tablet and desktop rules overlapping at 1024px.', ifDeletedError: 'Tablet band inherits mobile teal styling.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 5', codeSnippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0" />', whatItMeans: 'Binds CSS viewport width to device physical CSS pixels.', whyItIsThere: 'Required so mobile breakpoints trigger accurately.', ifDeletedError: 'Phones zoom out a 980px layout and ignore mobile breakpoints.' },
      { lineNumber: 'Line 8', codeSnippet: '.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }', whatItMeans: 'Mobile-first single-column base grid.', whyItIsThere: 'Avoids overriding multi-column complexity downward.', ifDeletedError: 'Cards stack as unspaced raw blocks.' },
      { lineNumber: 'Line 10', codeSnippet: '@media (min-width: 640px) { .cards { grid-template-columns: repeat(2, 1fr); } }', whatItMeans: 'Tablet two-column layout branch.', whyItIsThere: 'Activates smoothly at 640px and wider.', ifDeletedError: 'Tablet layout under-utilizes horizontal screen width.' },
      { lineNumber: 'Line 11', codeSnippet: '@media (min-width: 960px) { .cards { grid-template-columns: repeat(3, 1fr); } }', whatItMeans: 'Desktop three-column grid branch.', whyItIsThere: 'Matches later in cascade than 640px rule.', ifDeletedError: 'Wide monitors stay capped at two columns.' },
    ],
    dryRunTable: [
      { step: 1, state: 'viewport = 375px', memoryOrStack: 'min-width:640px -> false', note: 'Applies base 1fr single column' },
      { step: 2, state: 'viewport = 768px', memoryOrStack: 'min-width:640px -> true, 960px -> false', note: 'Applies repeat(2, 1fr)' },
      { step: 3, state: 'viewport = 1280px', memoryOrStack: 'min-width:960px -> true', note: 'Applies repeat(3, 1fr)' },
      { step: 4, state: 'OS dark = true', memoryOrStack: 'prefers-color-scheme:dark', note: 'Switches :root color tokens' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Missing Viewport Meta Tag', brokenCode: `<head><style>@media (max-width:600px){...}</style></head>`, fixedCode: `<head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>...</style></head>`, whyItBreaks: 'Phones pretend to be ~980px wide without viewport meta, so narrow media queries miss completely.' },
      { title: 'Trap 2: Cascade Inversion Overwriting Media Branch', brokenCode: `@media (min-width:768px){ .box{ padding:32px; } }\n.box{ padding:12px; }`, fixedCode: `.box{ padding:12px; }\n@media (min-width:768px){ .box{ padding:32px; } }`, whyItBreaks: 'Equal-specificity rules evaluated later override earlier @media blocks.' },
      { title: 'Trap 3: Desktop Hover Menus Unreachable on Touch', brokenCode: `.tip:hover .menu { display: block; }`, fixedCode: `@media (hover: hover) { .tip:hover .menu { display: block; } }`, whyItBreaks: 'Touch devices lack persistent hover; gating hover enhancements avoids stuck menus.' },
    ],
    practiceSheet: [
      { id: 'html-ch6-p1', difficulty: 'Easy', title: 'Mobile-First Two-Column Switch', prompt: 'Include `<meta name="viewport">` and switch `.row` to 2 columns at `min-width: 600px`.', banglaHint: 'বেস CSS-এ 1fr দিয়ে পরে @media (min-width: 600px) লেখো।', starterCode: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>.row{display:grid;grid-template-columns:1fr;}@media (min-width:600px){.row{grid-template-columns:1fr 1fr;}}</style></head><body><h1>Two Col Grid</h1><div class="row"><div>A</div><div>B</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Two Col Grid' },
      { id: 'html-ch6-p2', difficulty: 'Easy', title: 'Hide Buttons in Print Mode', prompt: 'Hide `.no-print` buttons when printing via `@media print`.', banglaHint: '@media print { .no-print { display: none; } } ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>@media print{.no-print{display:none;}}</style></head><body><h1>Invoice Summary</h1><button class="no-print">Print</button></body></html>`, sampleStdin: '', expectedOutput: 'Invoice Summary' },
      { id: 'html-ch6-p3', difficulty: 'Medium', title: 'Slot-Based Container Card', prompt: 'Use `container-type: inline-size` and `@container (min-width: 380px)` on `.stat`.', banglaHint: 'প্যারেন্টে container-type: inline-size দাও।', starterCode: `<!doctype html><html><head><style>.wrap{container-type:inline-size;}@container (min-width:380px){.stat{display:flex;}}</style></head><body><h1>Container Card</h1><div class="wrap"><div class="stat">Active</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Container Card' },
      { id: 'html-ch6-p4', difficulty: 'Medium', title: 'Reduced Motion Guard', prompt: 'Disable transitions inside `@media (prefers-reduced-motion: reduce)`.', banglaHint: 'সকল ট্রানজিশন বন্ধ করতে prefers-reduced-motion: reduce যোগ করো।', starterCode: `<!doctype html><html><head><style>@media (prefers-reduced-motion:reduce){*{transition:none;animation:none;}}</style></head><body><h1>Motion Guard</h1></body></html>`, sampleStdin: '', expectedOutput: 'Motion Guard' },
      { id: 'html-ch6-p5', difficulty: 'Hard', title: 'Range Breakpoints + Dark Tokens', prompt: 'Combine `(640px <= width < 1024px)` layout rules with `prefers-color-scheme: dark` variables.', banglaHint: 'রেঞ্জ ইনইকুয়ালিটি ও ডার্ক টোকেন একসাথে সাজাও।', starterCode: `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>:root{--c:#111;}@media (prefers-color-scheme:dark){:root{--c:#f8fafc;}}</style></head><body><h1>Adaptive Shell</h1></body></html>`, sampleStdin: '', expectedOutput: 'Adaptive Shell' },
    ],
    miniBuild: {
      title: 'Mini-Build: Adaptive Course Catalog Grid',
      description: 'Combine viewport metadata, mobile-first grid rules, and reduced-motion accessibility in one semantic catalog page.',
      banglaGoal: 'মোবাইল-ফার্স্ট মিডিয়া কোয়েরি ও ডার্ক-মোড সাপোর্টসহ একটি রেসপন্সিভ কোর্স ক্যাটালগ তৈরি করো।',
      combinesChapters: 'HTML Ch 1–6',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .catalog { display: grid; grid-template-columns: 1fr; gap: 12px; }
    .item { padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; }
    @media (min-width: 700px) { .catalog { grid-template-columns: repeat(3, 1fr); } }
  </style>
</head>
<body>
  <h1>Adaptive Catalog</h1>
  <section class="catalog">
    <article class="item">Track A</article>
    <article class="item">Track B</article>
    <article class="item">Track C</article>
  </section>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Adaptive Catalog',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .catalog { display: grid; grid-template-columns: 1fr; gap: 12px; }
    .item { padding: 14px; border: 1px solid #cbd5e1; border-radius: 8px; }
    @media (min-width: 700px) { .catalog { grid-template-columns: repeat(3, 1fr); } }
  </style>
</head>
<body>
  <h1>Adaptive Catalog</h1>
  <section class="catalog">
    <article class="item">Track A</article>
    <article class="item">Track B</article>
    <article class="item">Track C</article>
  </section>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Adaptive Catalog',
    testCases: [
      { id: 'html6-t1', input: '', expectedOutput: 'Adaptive Catalog' },
      { id: 'html6-t2', input: '', expectedOutput: 'Track C', isHidden: true },
    ],
  },
  7: {
    chapterNumber: 7,
    title: 'HTML Chapter 7 (HTML5/CSS3): CSS Counters, Keyframes & Grid Iteration',
    banglaTitle: 'HTML অধ্যায় ৭ (HTML5/CSS3): CSS কাউন্টার, অ্যানিমেশন লুপ ও গ্রিড ইটারেশন',
    subtitle: 'Auto-numbering DOM lists with counter(), fluid repeat(auto-fit), and infinite GPU keyframes.',
    zeroIntuition: {
      plainEnglishStory:
        'Imperative languages like C++ or Python repeat instructions with `for` and `while` loops. HTML and CSS achieve declarative iteration: instead of manually typing `"01"`, `"02"`, `"03"` or writing ten fixed column breakpoints, you instruct the browser layout engine to iterate across sibling DOM nodes automatically.\n\nThree declarative iteration engines power modern stylesheets: CSS Counters (`counter-reset` / `counter-increment` / `counters()`) automatically maintain sequential numbering across sections; `repeat(auto-fit, minmax(180px, 1fr))` iterates Grid columns dynamically across any container width; and `@keyframes` with `infinite` runs GPU-composited feedback loops smoothly without JavaScript intervals.',
      asciiFlowchart: `.steps { counter-reset: mod 0; }
   |
   +--> .step #1 -> counter-increment -> ::before paints "01"
   +--> .step #2 -> counter-increment -> ::before paints "02"
   +--> .step #3 -> counter-increment -> ::before paints "03"

Grid Auto-Loop: repeat(auto-fit, minmax(180px, 1fr)) -> packs N columns automatically`,
      pseudocode: [
        '1. INITIALIZE counter on parent list via counter-reset: step 0',
        '2. INCREMENT counter on every repeated child via counter-increment: step',
        '3. RENDER counter(step, decimal-leading-zero) inside ::before',
        '4. USE repeat(auto-fit, minmax(180px, 1fr)) for responsive column loops',
        '5. ANIMATE transform/opacity inside @keyframes ... infinite safely',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় টোকেন মেশিন ও অসীম ঘূর্ণন',
        explanation:
          'C বা Python-এ আমরা যেমন `for loop` দিয়ে ১, ২, ৩ করে গুনি, HTML ও CSS-এও ঠিক তেমনি কোড না দুপি্লিকেট করে স্বয়ংক্রিয়ভাবে সংখ্যা গোনা ও পুনরাবৃত্তি করা যায়! ধরো তোমার ওয়েবপেজে ১০টি পাঠের তালিকা আছে—মাঝে নতুন একটি পাঠ যোগ করলে হাতে লেখা সব নম্বর আবার বদলাতে হতো। কিন্তু CSS-এ `counter-reset` আর `counter-increment` ব্যবহার করলে ব্রাউজার নিজেই প্রতিটি কার্ডের সামনে `01`, `02`, `03` বসিয়ে দেয়। শুধু তাই নয়, CSS Grid-এর ভেতর `repeat(auto-fit, minmax(180px, 1fr))` লিখলে লেআউট ইঞ্জিন নিজেই লুপ চালিয়ে জায়গা অনুযায়ী কলাম তৈরি করে নেয়। আবার নেস্টেড লিস্টের জন্য বহুবচন `counters(sec, ".")` লিখলে স্বয়ংক্রিয়ভাবে `1.1`, `1.2`, `2.1` ধাঁচের সিরিয়াল তৈরি হয়। লোডিং স্পিনার বা স্ট্যাটাস পালসের মতো ধারাবাহিক ভিজ্যুয়াল লুপ চালাতে চাইলে `@keyframes` ও `infinite` ব্যবহার করলেই হয়—জাভাস্ক্রিপ্ট `setInterval` লাগে না। মনে রাখবে অ্যানিমেশনে `margin` না বদলে শুধু `transform` ও `opacity` বদলালে ব্রাউজারের GPU কাজটি মাখনের মতো মসৃণ রাখে। এভাবে পুনরাবৃত্তিমূলক স্টাইলিং ব্রাউজারের ওপর ছেড়ে দেওয়াই প্রফেশনাল ফ্রন্টএন্ড কৌশল।',
        everydayExample:
          'ব্যাংকের ডিজিটাল টোকেন মেশিনের মতো: নতুন কেউ ঢুকলেই মেশিন নিজে থেকেই পরের ক্রমিক নম্বর দিয়ে দেয়।',
        keyTakeaways: [
          '`counter-reset` প্যারেন্ট এলিমেন্টে একবার সেট করে প্রতিটি চাইল্ডে `counter-increment` চালাতে হয়।',
          '`repeat(auto-fit, minmax(min, 1fr))` মিডিয়া কুয়েরি ছাড়াই রেসপন্সিভ গ্রিড তৈরি করে।',
          'GPU-মসৃণ অ্যানিমেশন লুপের জন্য শুধু `transform` ও `opacity` অ্যানিমেট করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Auto-Numbered Roadmap Steps via CSS Counters',
        englishParagraphs: [
          'Initializing `counter-reset: roadmap 0` on `.steps` and advancing `counter-increment: roadmap` on each `.step` lets CSS track item indices natively.',
          '`counter(roadmap, decimal-leading-zero)` renders crisp `01`, `02`, `03` badges via `::before`.',
        ],
        banglaParagraphs: [
          '`.steps`-এ `counter-reset` এবং প্রতিটি `.step`-এ `counter-increment` বসালে ব্রাউজার নিজেই প্রতিটি আইটেমের ক্রম গুনে নেয়।',
          '`decimal-leading-zero` ব্যবহার করলে সুন্দর `01`, `02`, `03` ব্যাজ তৈরি হয়।',
        ],
        memoryDiagram: `.steps (roadmap=0) -> li#1 (1="01") -> li#2 (2="02") -> li#3 (3="03")`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
    .steps { counter-reset: roadmap 0; list-style: none; padding: 0; display: grid; gap: 10px; }
    .step { counter-increment: roadmap; display: flex; align-items: center; gap: 12px; background: #1e293b; padding: 12px 16px; border-radius: 10px; }
    .step::before { content: counter(roadmap, decimal-leading-zero); background: #10b981; color: #052e16; font-weight: 800; padding: 4px 10px; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Auto-Numbered Learning Steps</h1>
  <ol class="steps">
    <li class="step">Read Zero Intuition</li>
    <li class="step">Trace Memory Table</li>
    <li class="step">Pass Judge Tests</li>
  </ol>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Auto-Numbered Learning Steps',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '.steps { counter-reset: roadmap 0; ... }', whatItMeans: 'Initializes counter named roadmap to zero.', whyItIsThere: 'Restarts numbering per roadmap block.', ifDeletedError: 'Separate lists continue counting awkwardly.' },
          { lineNumber: 'Line 8', codeSnippet: '.step { counter-increment: roadmap; ... }', whatItMeans: 'Adds 1 to roadmap for every step item.', whyItIsThere: 'Advances counter across siblings.', ifDeletedError: 'All items print 00.' },
          { lineNumber: 'Line 9', codeSnippet: '.step::before { content: counter(roadmap, decimal-leading-zero); ... }', whatItMeans: 'Paints formatted 01, 02 badge.', whyItIsThere: 'Displays counter cleanly without touching HTML text.', ifDeletedError: 'Numbers stay invisible.' },
        ],
      },
      {
        id: 'html-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Queryless Fluid Column Loop with repeat(auto-fit)',
        englishParagraphs: [
          '`repeat(auto-fit, minmax(180px, 1fr))` calculates the maximum number of `>=180px` columns fitting the row and wraps extras onto new rows automatically.',
          'Wrapping `minmax(min(180px, 100%), 1fr)` prevents overflow even on tiny 160px widgets.',
        ],
        banglaParagraphs: [
          '`repeat(auto-fit, minmax(180px, 1fr))` কন্টেইনারের প্রস্থ অনুযায়ী স্বয়ংক্রিয়ভাবে কলাম সংখ্যা ঠিক করে।',
          '`min(180px, 100%)` দিলে সরু স্ক্রিনেও কোনো কার্ড বেরিয়ে যায় না।',
        ],
        memoryDiagram: `600px slot -> 3 columns of 200px | 380px slot -> 2 columns of 190px`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .auto-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 12px; }
    .tile { padding: 18px; border-radius: 8px; background: #ecfdf5; border: 1px solid #10b981; color: #064e3b; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Auto-Fit Fluid Grid</h1>
  <div class="auto-grid">
    <div class="tile">Module 01</div>
    <div class="tile">Module 02</div>
    <div class="tile">Module 03</div>
    <div class="tile">Module 04</div>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Auto-Fit Fluid Grid',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));', whatItMeans: 'Dynamically packs columns without fixed breakpoints.', whyItIsThere: 'Adapts cleanly across every pixel width.', ifDeletedError: 'All tiles stack vertically.' },
        ],
      },
      {
        id: 'html-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Infinite GPU-Composited @keyframes Pulse Indicator',
        englishParagraphs: [
          'A live runner heartbeat indicator uses CSS `@keyframes` with `infinite` iteration instead of JavaScript timers.',
          'Animating `transform` and `opacity` runs directly on the GPU compositor without triggering DOM layout reflow.',
        ],
        banglaParagraphs: [
          'লাইভ স্ট্যাটাস ডট জ্বলজ্বল করতে জাভাস্ক্রিপ্ট টাইমার ছাড়াই `@keyframes` ও `infinite` ব্যবহার করা হয়।',
          '`transform` ও `opacity` অ্যানিমেট করলে পেজ রেন্ডারিং ল্যাগ হয় না।',
        ],
        memoryDiagram: `0%, 100% -> scale(1) opacity:1 | 50% -> scale(1.35) opacity:0.45`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #090d16; color: #e2e8f0; padding: 24px; }
    .status { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 999px; background: #1e293b; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #10b981; animation: pulse 1.4s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.35); opacity: 0.45; } }
  </style>
</head>
<body>
  <h1>Live Engine Status</h1>
  <div class="status"><span class="dot"></span><span>Compiler Ready</span></div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Live Engine Status',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'animation: pulse 1.4s ease-in-out infinite;', whatItMeans: 'Repeats the keyframe cycle forever at 1.4s intervals.', whyItIsThere: 'Provides calm live status feedback.', ifDeletedError: 'Dot remains static.' },
          { lineNumber: 'Line 9', codeSnippet: '@keyframes pulse { ... }', whatItMeans: 'Defines scale and opacity checkpoints.', whyItIsThere: 'Uses GPU-composited properties only.', ifDeletedError: 'Animation name pulse resolves to nothing.' },
        ],
      },
      {
        id: 'html-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Nested counter() Scope Trap vs. Plural counters()',
        englishParagraphs: [
          'Using singular `counter(sec)` inside nested `<ol>` lists hides parent hierarchy and prints flat `1, 2` inside sub-sections.',
          'Switching to plural `counters(sec, ".")` joins all active ancestor scopes cleanly (`1.1`, `1.2`, `2.1`).',
        ],
        banglaParagraphs: [
          'নেস্টেড লিস্টের ভেতর শুধু `counter(sec)` দিলে `১.১`-এর বদলে কেবল `১` দেখায়।',
          'বহুবচন `counters(sec, ".")` ব্যবহার করলে প্যারেন্ট-চাইল্ড স্তর মিলে `১.১`, `১.২` নিখুঁত দেখায়।',
        ],
        memoryDiagram: `outer sec=1 -> inner sec=1 => counters(sec, ".") = "1.1"`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .doc-list { counter-reset: sec; list-style: none; padding-left: 18px; font-family: system-ui, sans-serif; }
    .doc-list li { counter-increment: sec; margin: 4px 0; }
    .doc-list li::before { content: counters(sec, ".") ". "; font-weight: 700; color: #059669; }
  </style>
</head>
<body>
  <h1>Hierarchical Section Counters</h1>
  <ol class="doc-list">
    <li>Foundations
      <ol class="doc-list">
        <li>Syntax</li>
        <li>Semantics</li>
      </ol>
    </li>
    <li>Layouts</li>
  </ol>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Hierarchical Section Counters',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'content: counters(sec, ".") ". ";', whatItMeans: 'Joins nested sec counters separated by dots.', whyItIsThere: 'Automatically tracks multi-level outline numbering.', ifDeletedError: 'Sub-items show unnumbered bulletless lines.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 7', codeSnippet: '.steps { counter-reset: roadmap 0; list-style: none; padding: 0; display: grid; gap: 10px; }', whatItMeans: 'Creates counter roadmap initialized to 0.', whyItIsThere: 'Parent list owns counter initialization scope.', ifDeletedError: 'Counter fails to reset across multiple lists.' },
      { lineNumber: 'Line 8', codeSnippet: '.step { counter-increment: roadmap; ... }', whatItMeans: 'Increments roadmap by 1 per step node.', whyItIsThere: 'Tracks DOM iteration index natively.', ifDeletedError: 'Every badge stays stuck on 00.' },
      { lineNumber: 'Line 9', codeSnippet: '.step::before { content: counter(roadmap, decimal-leading-zero); ... }', whatItMeans: 'Renders zero-padded sequential badge.', whyItIsThere: 'Separates presentation numbers from semantic text.', ifDeletedError: 'No step numbers appear on screen.' },
    ],
    dryRunTable: [
      { step: 1, state: 'roadmap = 0', memoryOrStack: '.steps container', note: 'Counter initialized on list parent' },
      { step: 2, state: 'roadmap = 1', memoryOrStack: '1st .step::before', note: 'Paints "01" before "Read Zero Intuition"' },
      { step: 3, state: 'roadmap = 2', memoryOrStack: '2nd .step::before', note: 'Paints "02" before "Trace Memory Table"' },
      { step: 4, state: 'roadmap = 3', memoryOrStack: '3rd .step::before', note: 'Paints "03" before "Pass Judge Tests"' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Resetting Counter on the Child Item', brokenCode: `.step { counter-reset: n; counter-increment: n; }`, fixedCode: `.steps { counter-reset: n; }\n.step { counter-increment: n; }`, whyItBreaks: 'Resetting on every child forces every badge back to 1 instead of 1, 2, 3.' },
      { title: 'Trap 2: Animating margin Instead of transform', brokenCode: `@keyframes slide { to { margin-left: 40px; } }`, fixedCode: `@keyframes slide { to { transform: translateX(40px); } }`, whyItBreaks: 'Margin animations force costly browser layout recalculations every frame.' },
      { title: 'Trap 3: Fixed repeat(4, 240px) Overflowing Phones', brokenCode: `.g { grid-template-columns: repeat(4, 240px); }`, fixedCode: `.g { grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); }`, whyItBreaks: '960px fixed width breaks narrow mobile viewports.' },
    ],
    practiceSheet: [
      { id: 'html-ch7-p1', difficulty: 'Easy', title: 'CSS Card Counter', prompt: 'Number `.card` siblings automatically via `counter-reset` and `counter-increment`.', banglaHint: 'প্যারেন্টে counter-reset এবং .card::before-এ counter() বসাও।', starterCode: `<!doctype html><html><head><style>.list{counter-reset:c;}.card{counter-increment:c;}.card::before{content:counter(c) ". ";}</style></head><body><h1>Auto Cards</h1><div class="list"><div class="card">Alpha</div><div class="card">Beta</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Auto Cards' },
      { id: 'html-ch7-p2', difficulty: 'Easy', title: 'Zebra Table Rows', prompt: 'Stripe even `<tr>` elements cleanly using `:nth-child(even)`.', banglaHint: 'tr:nth-child(even) সিলেক্টরে ব্যাকগ্রাউন্ড রঙ দাও।', starterCode: `<!doctype html><html><head><style>tr:nth-child(even){background:#e2e8f0;}</style></head><body><h1>Zebra Rows</h1><table><tr><td>Row 1</td></tr><tr><td>Row 2</td></tr></table></body></html>`, sampleStdin: '', expectedOutput: 'Zebra Rows' },
      { id: 'html-ch7-p3', difficulty: 'Medium', title: 'Auto-Fit Fluid Gallery', prompt: 'Use `repeat(auto-fit, minmax(160px, 1fr))` for a responsive tile gallery.', banglaHint: 'grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;}</style></head><body><h1>Gallery Grid</h1><div class="g"><div>1</div><div>2</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Gallery Grid' },
      { id: 'html-ch7-p4', difficulty: 'Medium', title: 'Infinite Spinner Loop', prompt: 'Rotate a circular `.spin` indicator continuously via `@keyframes spin`.', banglaHint: 'transform: rotate(360deg) সহ linear infinite অ্যানিমেশন দাও।', starterCode: `<!doctype html><html><head><style>.spin{width:24px;height:24px;border:3px solid #10b981;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;}@keyframes spin{to{transform:rotate(360deg);}}</style></head><body><h1>CSS Loop Spinner</h1><div class="spin"></div></body></html>`, sampleStdin: '', expectedOutput: 'CSS Loop Spinner' },
      { id: 'html-ch7-p5', difficulty: 'Hard', title: 'Hierarchical Syllabus Outline', prompt: 'Format nested `<ol>` chapters using `counters(item, ".")`.', banglaHint: 'প্রতিটি ol-এ counter-reset: item; রেখে li::before-এ counters(item, ".") ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>ol{counter-reset:item;list-style:none;}li{counter-increment:item;}li::before{content:counters(item,".") " ";}</style></head><body><h1>Nested Outline</h1><ol><li>Phase 1<ol><li>Ch 1</li></ol></li></ol></body></html>`, sampleStdin: '', expectedOutput: 'Nested Outline' },
    ],
    miniBuild: {
      title: 'Mini-Build: Automated Curriculum Stepper',
      description: 'Render auto-numbered step cards packed dynamically in an auto-fit grid.',
      banglaGoal: 'স্বয়ংক্রিয় কাউন্টার ও auto-fit গ্রিডের সমন্বয়ে একটি পাঠ-ক্রম স্টেপার বানাও।',
      combinesChapters: 'HTML Ch 1–7',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .stepper { counter-reset: mod; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
    .step-card { counter-increment: mod; border: 1px solid #10b981; border-radius: 8px; padding: 12px; }
    .step-card::before { content: "Step " counter(mod, decimal-leading-zero) ": "; font-weight: 700; color: #059669; }
  </style>
</head>
<body>
  <h1>Curriculum Stepper</h1>
  <div class="stepper">
    <div class="step-card">Setup</div>
    <div class="step-card">Code</div>
    <div class="step-card">Verify</div>
  </div>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Curriculum Stepper',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .stepper { counter-reset: mod; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
    .step-card { counter-increment: mod; border: 1px solid #10b981; border-radius: 8px; padding: 12px; }
    .step-card::before { content: "Step " counter(mod, decimal-leading-zero) ": "; font-weight: 700; color: #059669; }
  </style>
</head>
<body>
  <h1>Curriculum Stepper</h1>
  <div class="stepper">
    <div class="step-card">Setup</div>
    <div class="step-card">Code</div>
    <div class="step-card">Verify</div>
  </div>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Curriculum Stepper',
    testCases: [
      { id: 'html7-t1', input: '', expectedOutput: 'Curriculum Stepper' },
      { id: 'html7-t2', input: '', expectedOutput: 'Verify', isHidden: true },
    ],
  },
  8: {
    chapterNumber: 8,
    title: 'HTML Chapter 8 (HTML5/CSS3): Nested Layout Matrices & Gallery Grids',
    banglaTitle: 'HTML অধ্যায় ৮ (HTML5/CSS3): নেস্টেড লেআউট ম্যাট্রিক্স ও গ্যালারি গ্রিড',
    subtitle: 'Composing outer page grids with nested card flexboxes, aspect-ratio frames, and card symmetry.',
    zeroIntuition: {
      plainEnglishStory:
        'Just as nested `for` loops iterate outer rows `i` and inner columns `j`, modern web layouts nest structural engines: an outer 2D CSS Grid coordinates rows and columns of gallery cards, while an inner Flex row aligns each card’s avatar, metadata tags, and footer buttons cleanly.\n\nNesting Grid inside Flex (or Flex inside Grid) cleanly without `margin`-based hacks gives rock-solid alignment at every screen width. Pairing `aspect-ratio: 16 / 9` and `object-fit: cover` prevents jagged card heights when media dimensions vary.',
      asciiFlowchart: `Outer 2D Gallery (.board -> display: grid; 3 cols x 2 rows)
   |
   +--> Card [r, c] (display: flex; flex-direction: column)
          |-- Media Box (aspect-ratio: 16/9)
          |-- Content Body (flex: 1 pushes footer down!)
          +-- Card Footer (display: flex; justify-content: space-between)`,
      pseudocode: [
        '1. DEFINE outer 2D grid matrix using grid-template-columns',
        '2. TURN each grid cell into a vertical flex column (flex-direction: column)',
        '3. APPLY flex: 1 on card body so all card footers align horizontally',
        '4. LOCK image/thumb boxes with aspect-ratio + object-fit: cover',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দোতলা তাকের প্রতিটি খোপে সাজানো বক্স',
        explanation:
          'একটি বড় শপিং মলের ডিসপ্লে র‍্যাকের কথা ভাবো: বাইরে থেকে দেখলে ওটা সারি ও কলামের বড় একটি ম্যাট্রিক্স (CSS Grid), আবার প্রতিটি খোপের ভেতরে পণ্যের ছবি, নাম ও দাম ওপর-নিচ সুন্দর করে সাজানো (Flexbox)। ওয়েব ডিজাইনে আমরা ঠিক এভাবেই নেস্টেড লেআউট তৈরি করি। বাইরের `.gallery` কন্টেইনারটি `display: grid` দিয়ে পুরো ছক সামলায়, আর ভেতরের প্রতিটি `.card` নিজেই একটি `display: flex; flex-direction: column` হয়ে নিজের ভেতরের উপাদানগুলো গোছায়। একটি চমৎকার প্রো কৌশল হলো কার্ডের মূল লেখার অংশে `flex: 1` দেওয়া—এর ফলে কোনো কার্ডে ২ লাইন লেখা আর পাশের কার্ডে ৫ লাইন লেখা থাকলেও সব কার্ডের নিচের বাটন একদম সমান লাইনে থাকে! ছবির উচ্চতা এলোমেলো হওয়া ঠেকাতে `aspect-ratio: 16 / 9` ও `object-fit: cover` ব্যবহার করলে ম্যাট্রিক্সের সব ঘর সমান দেখায়। তবে সাবধান: কখনো অপ্রয়োজনে ৫-৬ স্তরের গভীর নেস্টেড `<div>` বানাবে না—তাতে DOM ভারী হয়। সবসময় `gap` দিয়ে ফাঁকা জায়গা তৈরি করবে, `margin` দিয়ে নয়। এভাবে Grid আর Flex মিলিয়ে কাজ করলে যেকোনো ড্যাশবোর্ড বা ই-কমার্স গ্যালারি মুহূর্তেই নিখুঁত হয়ে উঠবে।',
        everydayExample:
          'ক্লাসের রিপোর্ট কার্ড বোর্ডের মতো: বোর্ডে ৩×২ ছকে ৬টি কার্ড সাজানো (Grid), আর প্রতি কার্ডের ভেতরে হেডার, নম্বর ও স্বাক্ষর সারিবদ্ধ (Flex)।',
        keyTakeaways: [
          'বাইরের ২ডি ছকের জন্য CSS Grid ও প্রতিটি কার্ডের ভেতরের জন্য Flexbox ব্যবহার করা সেরা প্যাটার্ন।',
          'কার্ডের বডিতে `flex: 1` দিলে সব কার্ডের নিচের বাটন সমান উচ্চতায় থাকে।',
          'সমান উচ্চতার মিডিয়া বক্সের জন্য `aspect-ratio` ও `object-fit: cover` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Outer CSS Grid + Inner Flex Card Symmetry',
        englishParagraphs: [
          'Using CSS Grid for the outer 3-column matrix and Flexbox inside each `.card` aligns card footers along one crisp bottom baseline regardless of paragraph length.',
          '`flex: 1` on `.card-body` absorbs extra vertical space inside shorter cards.',
        ],
        banglaParagraphs: [
          'বাইরের `.matrix` গ্রিডের ভেতরে প্রতিটি `.card`-এ `flex-direction: column` ও বডিতে `flex: 1` দিলে সব কার্ডের বাটন একই সরলরেখায় থাকে।',
          'লেখা কম-বেশি হলেও লেআউট ভেঙে যায় না।',
        ],
        memoryDiagram: `.matrix(grid 3 cols) -> .card(flex col) -> .body(flex:1) -> footer aligned!`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 16px; }
    .matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .card { display: flex; flex-direction: column; background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 14px; }
    .card-body { flex: 1; }
    .card-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; color: #34d399; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Nested Matrix Cards</h1>
  <div class="matrix">
    <article class="card"><div class="card-body"><h2>Phase 1</h2><p>Short intro.</p></div><footer class="card-foot"><span>5 Ch</span><span>100 XP</span></footer></article>
    <article class="card"><div class="card-body"><h2>Phase 2</h2><p>Loops, nested matrices, functions and Big-O complexity.</p></div><footer class="card-foot"><span>5 Ch</span><span>150 XP</span></footer></article>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Nested Matrix Cards',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '.matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }', whatItMeans: 'Outer 2D grid organizing cards into columns and rows.', whyItIsThere: 'Guarantees equal row heights across sibling cards.', ifDeletedError: 'Cards lose multi-column layout.' },
          { lineNumber: 'Line 9', codeSnippet: '.card-body { flex: 1; }', whatItMeans: 'Expands middle body region to fill extra vertical height.', whyItIsThere: 'Pins .card-foot cleanly to the bottom of every card.', ifDeletedError: 'Footers float unevenly when text lengths differ.' },
        ],
      },
      {
        id: 'html-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Uniform Media Gallery Using aspect-ratio & object-fit',
        englishParagraphs: [
          'Gallery grids break visually when portrait and landscape images mix.',
          'Wrapping thumbnails in `aspect-ratio: 16 / 9` and `overflow: hidden` keeps every cell aligned cleanly.',
        ],
        banglaParagraphs: [
          'ছবির অনুপাত আলাদা হলে গ্যালারি গ্রিড উঁচু-নিচু হয়ে যায়।',
          '`aspect-ratio: 16 / 9` ও `overflow: hidden` দিলে সব থাম্বনেইল হুবহু সমান অনুপাতে থাকে।',
        ],
        memoryDiagram: `.thumb { aspect-ratio: 16 / 9; overflow: hidden; } -> uniform grid tiles`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-family: system-ui, sans-serif; }
    .tile { border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
    .thumb { aspect-ratio: 16 / 9; background: linear-gradient(135deg, #059669, #0284c7); display: grid; place-items: center; color: #fff; font-weight: 700; }
    .cap { padding: 8px; font-size: 13px; }
  </style>
</head>
<body>
  <h1>Uniform Gallery Matrix</h1>
  <div class="gallery">
    <figure class="tile"><div class="thumb">16:9 A</div><figcaption class="cap">Node Graph</figcaption></figure>
    <figure class="tile"><div class="thumb">16:9 B</div><figcaption class="cap">Stack Frame</figcaption></figure>
    <figure class="tile"><div class="thumb">16:9 C</div><figcaption class="cap">Grid Pattern</figcaption></figure>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Uniform Gallery Matrix',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'aspect-ratio: 16 / 9;', whatItMeans: 'Locks height proportional to column width.', whyItIsThere: 'Prevents layout shift (CLS) and uneven gallery tiles.', ifDeletedError: 'Tile height collapses to text height.' },
        ],
      },
      {
        id: 'html-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Spanning Feature Cells Across Matrix Rows & Columns',
        englishParagraphs: [
          'Using `grid-column: span 2` or `grid-row: span 2` transforms uniform grids into editorial bento dashboards.',
          'Always guard spanning rules inside `@media (min-width: ...)` if single-column mobile grids are used.',
        ],
        banglaParagraphs: [
          '`grid-column: span 2` বা `grid-row: span 2` ব্যবহার করে সাধারণ গ্রিডকে আধুনিক বেন্টো (Bento) ড্যাশবোর্ডে রূপ দেওয়া যায়।',
          'প্রথম ফিচার্ড কার্ডটি ২টি ঘরের জায়গা নেয়।',
        ],
        memoryDiagram: `[Featured (span 2) ] [Side A]\n[Cell B] [Cell C]  [Side D]`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-family: system-ui, sans-serif; }
    .box { background: #1e293b; color: #f8fafc; padding: 14px; border-radius: 8px; }
    .hero { grid-column: span 2; background: #047857; }
  </style>
</head>
<body>
  <h1>Bento Matrix Layout</h1>
  <section class="bento">
    <div class="box hero">Featured Track</div>
    <div class="box">Quick Drill</div>
    <div class="box">CP Arena</div>
    <div class="box">Interview</div>
    <div class="box">Blueprint</div>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Bento Matrix Layout',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '.hero { grid-column: span 2; background: #047857; }', whatItMeans: 'Spans featured cell across two columns.', whyItIsThere: 'Creates visual hierarchy in 2D matrices.', ifDeletedError: 'Hero shrinks to 1 narrow cell.' },
        ],
      },
      {
        id: 'html-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Intrinsic Min-Content Blowout Trap vs minmax(0, 1fr)',
        englishParagraphs: [
          'By default `1fr` actually means `minmax(auto, 1fr)`! A wide `<pre>` code block inside a grid cell stretches that column far past `1fr` and breaks symmetry.',
          'Using `minmax(0, 1fr)` or `min-width: 0` on the cell allows text/code scrolling cleanly inside its column.',
        ],
        banglaParagraphs: [
          'সাধারণ `1fr` আসলে `minmax(auto, 1fr)` হিসেবে কাজ করে, ফলে কোনো সেলের ভেতর লম্বা কোড বা URL থাকলে কলামটা ফেঁপে পুরো গ্রিড নষ্ট করে দেয়!',
          '`minmax(0, 1fr)` ও `min-width: 0` দিলে সেল নিজের প্রস্থের ভেতরেই আটকে থাকে।',
        ],
        memoryDiagram: `TRAP: 1fr expands with long <pre> | FIX: minmax(0, 1fr) + min-width: 0`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .safe-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; font-family: system-ui, sans-serif; }
    .cell { border: 1px solid #334155; padding: 10px; border-radius: 8px; overflow: hidden; }
    pre { overflow-x: auto; margin: 0; }
  </style>
</head>
<body>
  <h1>Overflow-Safe Matrix</h1>
  <div class="safe-grid">
    <div class="cell"><pre>very_long_continuous_token_without_spaces_0123456789</pre></div>
    <div class="cell">Balanced Right Column</div>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Overflow-Safe Matrix',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'grid-template-columns: repeat(2, minmax(0, 1fr));', whatItMeans: 'Allows grid tracks to shrink down to 0 before wrapping/scrolling.', whyItIsThere: 'Prevents long unbroken tokens from blowing out symmetric columns.', ifDeletedError: 'Left column expands awkwardly past 50% width.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 7', codeSnippet: '.matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }', whyItIsThere: 'Coordinates outer 2D grid columns with consistent spacing.', whatItMeans: 'Responsive matrix layout.', ifDeletedError: 'Cards lose column alignment.' },
      { lineNumber: 'Line 8', codeSnippet: '.card { display: flex; flex-direction: column; ... }', whatItMeans: 'Turns each matrix cell into a vertical Flex column.', whyItIsThere: 'Organizes header, body, and footer internally.', ifDeletedError: 'Card body cannot stretch with flex: 1.' },
      { lineNumber: 'Line 9', codeSnippet: '.card-body { flex: 1; }', whatItMeans: 'Stretches content wrapper to equalize footer positions.', whyItIsThere: 'Aligns card footers across rows.', ifDeletedError: 'Footer buttons misalign vertically across cards.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Outer .matrix layout', memoryOrStack: '2 equal grid tracks', note: 'Browser computes equal row height from tallest card' },
      { step: 2, state: 'Card 1 (.card-body)', memoryOrStack: 'flex: 1 absorbs height', note: 'Pushes footer flush to Card 1 bottom' },
      { step: 3, state: 'Card 2 (.card-body)', memoryOrStack: 'flex: 1 stretches less', note: 'Both .card-foot lines sit on identical Y baseline' },
      { step: 4, state: 'Paint complete', memoryOrStack: 'Clean 2D card matrix', note: 'Zero uneven edges' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Grid 1fr Blowout on Long Code/URL', brokenCode: `grid-template-columns: 1fr 1fr; /* pre stretches col 1! */`, fixedCode: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);`, whyItBreaks: '1fr defaults to minmax(auto, 1fr), respecting intrinsic min-content width.' },
      { title: 'Trap 2: Uneven Margin Hacks Instead of gap', brokenCode: `.card { width: 33.33%; margin-right: 12px; }`, fixedCode: `.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }`, whyItBreaks: '33.33% + 12px margins exceed 100% and force the 3rd card onto the next row.' },
      { title: 'Trap 3: Missing Figure/Caption Semantic Elements', brokenCode: `<div class="tile"><img ...><div>Caption</div></div>`, fixedCode: `<figure class="tile"><img ...><figcaption>Caption</figcaption></figure>`, whyItBreaks: 'figure/figcaption links caption semantics directly to the visual media for assistive tech.' },
    ],
    practiceSheet: [
      { id: 'html-ch8-p1', difficulty: 'Easy', title: 'Nested Flex Card Matrix', prompt: 'Build a 2-column `.grid` where each `.card` uses vertical Flex and `.body { flex: 1; }`.', banglaHint: 'গ্রিডের ভেতর প্রতিটি কার্ডকে `display: flex; flex-direction: column;` দাও।', starterCode: `<!doctype html><html><head><style>.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}.card{display:flex;flex-direction:column;border:1px solid #999;padding:8px;}.body{flex:1;}</style></head><body><h1>Matrix Cards</h1><div class="grid"><div class="card"><div class="body">A</div><footer>Go</footer></div><div class="card"><div class="body">Longer<br>text</div><footer>Go</footer></div></div></body></html>`, sampleStdin: '', expectedOutput: 'Matrix Cards' },
      { id: 'html-ch8-p2', difficulty: 'Easy', title: '3×2 Uniform Tile Grid', prompt: 'Create a 3-column grid with `aspect-ratio: 16 / 9` tiles.', banglaHint: '`grid-template-columns: repeat(3, 1fr)` ও `aspect-ratio: 16 / 9` দাও।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}.t{aspect-ratio:16/9;background:#0f766e;color:#fff;}</style></head><body><h1>Tile Grid</h1><div class="g"><div class="t">1</div><div class="t">2</div><div class="t">3</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Tile Grid' },
      { id: 'html-ch8-p3', difficulty: 'Medium', title: 'Bento Hero Span Cell', prompt: 'Make `.hero` span 2 columns (`grid-column: span 2`) inside a 3-column bento matrix.', banglaHint: '.hero ক্লাসে `grid-column: span 2;` যোগ করো।', starterCode: `<!doctype html><html><head><style>.b{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}.hero{grid-column:span 2;background:#10b981;}</style></head><body><h1>Bento Board</h1><div class="b"><div class="hero">Hero</div><div>Side</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Bento Board' },
      { id: 'html-ch8-p4', difficulty: 'Medium', title: 'Overflow-Safe Pre Cell', prompt: 'Prevent a `<pre>` element from expanding its Grid column past 50% using `minmax(0, 1fr)`.', banglaHint: '`minmax(0, 1fr)` ও `pre { overflow-x: auto; }` ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}pre{overflow-x:auto;}</style></head><body><h1>Safe Code Cell</h1><div class="g"><pre>long_token_1234567890</pre><div>Col 2</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Safe Code Cell' },
      { id: 'html-ch8-p5', difficulty: 'Hard', title: 'Full Responsive Gallery Card Deck', prompt: 'Combine semantic `<figure>`/`<figcaption>`, `aspect-ratio`, and `repeat(auto-fit, minmax(180px, 1fr))`.', banglaHint: 'figure-এর ভেতর থাম্বনেইল বক্স ও figcaption রাখো।', starterCode: `<!doctype html><html><head><style>.gal{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;}.pic{aspect-ratio:4/3;background:#334155;color:#fff;display:grid;place-items:center;}</style></head><body><h1>Gallery Deck</h1><section class="gal"><figure><div class="pic">A</div><figcaption>Cap A</figcaption></figure><figure><div class="pic">B</div><figcaption>Cap B</figcaption></figure></section></body></html>`, sampleStdin: '', expectedOutput: 'Gallery Deck' },
    ],
    miniBuild: {
      title: 'Mini-Build: Bento Academy Matrix Dashboard',
      description: 'Combine an outer responsive CSS Grid with inner Flex cards and a spanning hero module.',
      banglaGoal: 'বেন্টো স্প্যানিং কার্ড ও ফ্লেক্স ফুটার সমন্বয়ে একটি আকর্ষণীয় ম্যাট্রিক্স ড্যাশবোর্ড বানাও।',
      combinesChapters: 'HTML Ch 1–8',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
    .board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .card { display: flex; flex-direction: column; background: #1e293b; padding: 14px; border-radius: 10px; }
    .hero { grid-column: span 2; background: #065f46; }
    .body { flex: 1; }
  </style>
</head>
<body>
  <h1>Academy Matrix Board</h1>
  <section class="board">
    <article class="card hero"><div class="body"><h2>Featured Track</h2></div><footer>Active</footer></article>
    <article class="card"><div class="body"><h2>Practice</h2></div><footer>Ready</footer></article>
  </section>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Academy Matrix Board',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
    .board { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
    .card { display: flex; flex-direction: column; background: #1e293b; padding: 14px; border-radius: 10px; }
    .hero { grid-column: span 2; background: #065f46; }
    .body { flex: 1; }
  </style>
</head>
<body>
  <h1>Academy Matrix Board</h1>
  <section class="board">
    <article class="card hero"><div class="body"><h2>Featured Track</h2></div><footer>Active</footer></article>
    <article class="card"><div class="body"><h2>Practice</h2></div><footer>Ready</footer></article>
  </section>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Academy Matrix Board',
    testCases: [
      { id: 'html8-t1', input: '', expectedOutput: 'Academy Matrix Board' },
      { id: 'html8-t2', input: '', expectedOutput: 'Featured Track', isHidden: true },
    ],
  },
  9: {
    chapterNumber: 9,
    title: 'HTML Chapter 9 (HTML5/CSS3): CSS Custom Properties, calc()/clamp() & Cascade Scope',
    banglaTitle: 'HTML অধ্যায় ৯ (HTML5/CSS3): CSS ভ্যারিয়েবল, calc()/clamp() ফাংশন ও স্কোপ',
    subtitle: 'Reusable design tokens (--var), fluid clamp() math functions, local component scope, and @layer.',
    zeroIntuition: {
      plainEnglishStory:
        'In imperative code, functions accept parameters and encapsulate local scope. Modern CSS provides its own functional design system: **Custom Properties** (`--accent: #10b981;`) act as runtime design tokens inherited down the DOM tree, while built-in CSS math functions like `clamp(min, preferred, max)` and `calc()` compute fluid typography and spacing dynamically inside the browser engine.\n\nJust like variable scope in C++ or JavaScript, defining `--card-bg` on `:root` creates a global token, while redefining `--card-bg` on `.card--emerald` overrides it strictly within that component’s local DOM subtree. Pairing tokens with `@layer base, components, utilities;` guarantees predictable cascade priority without `!important` wars.',
      asciiFlowchart: `:root { --accent: #059669; --pad: clamp(12px, 3vw, 28px); }  <-- Global Scope
   |
   +--> body -> inherits --accent (#059669)
   +--> .alert { --accent: #dc2626; }  <-- Local Component Scope Override!
          +-- button { background: var(--accent); } -> paints #dc2626 only here!`,
      pseudocode: [
        '1. DECLARE global palette & spacing tokens inside :root',
        '2. USE fluid CSS functions clamp(min, vw, max) & calc() for responsive sizing',
        '3. OVERRIDE --var tokens inside local component classes for instant theming',
        '4. ORGANIZE stylesheet specificity cleanly with @layer blocks',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রঙের প্যালেট মাস্টার কার্ড ও অটো-স্কেল ফাংশন',
        explanation:
          'ধরো তোমার ওয়েবসাইটে ৫০টি বাটন আর কার্ড আছে, এবং ক্লায়েন্ট হঠাৎ বললো সব নীল রঙ বদলে সবুজ করতে হবে! এক এক করে ৫০ জায়গায় রঙ না বদলে `:root`-এ `--brand: #10b981;` ভ্যারিয়েবল রেখে সব জায়গায় `var(--brand)` ব্যবহার করলে মাত্র এক লাইন বদলেই পুরো সাইটের রঙ পাল্টে যায়। ঠিক C বা JS-এর লোকাল স্কোপের মতো, কোনো নির্দিষ্ট `.danger-card`-এর ভেতরে `--brand: #ef4444;` লিখলে কেবল ওই কার্ড ও তার ভেতরের চাইল্ডগুলোই লাল হবে, বাইরের পেজ আগের মতোই সবুজ থাকবে! এর পাশাপাশি CSS-এর নিজস্ব ম্যাথ ফাংশন যেমন `clamp(16px, 2.5vw, 32px)` স্ক্রিনের প্রস্থ অনুযায়ী ফন্ট সাইজ মসৃণভাবে ছোট-বড় করে—কিন্তু ১৬px-এর নিচে বা ৩২px-এর ওপরে যেতে দেয় না। আবার `calc(100% - 2rem)` দিয়ে আলাদা একক (`%` আর `rem`) সহজেই যোগ-বিয়োগ করা যায়। আরেকটি শক্তিশালী নিয়ম হলো `@layer`: এটি স্টাইলশিটের ভেতর লেয়ার বা স্তর তৈরি করে, ফলে `!important` ব্যবহার না করেই নির্ভুলভাবে প্রায়োরিটি নিয়ন্ত্রণ করা যায়। ডিজাইন টোকেন আর `clamp()` শিখে গেলে তোমার ওয়েবসাইট দেখতে পেশাদার ডিজাইন সিস্টেমের মতো হবে।',
        everydayExample:
          'বাড়ির মেইন বৈদ্যুতিক সুইচবোর্ডের (`:root`) ভোল্টেজ ঠিক থাকলে পুরো বাড়ি চলে, আর পড়ার টেবিলের নিজস্ব ডিমার সুইচ শুধু টেবিলের আলোটুকুই (`Local --var Scope`) কমায়-বাড়ায়।',
        keyTakeaways: [
          '`:root`-এ `--token` গ্লোবাল হয়, আর কোনো ক্লাসের ভেতরে লিখলে সেটি কেবল তার চাইল্ডদের ওপর কাজ করে (Local Scope)।',
          '`clamp(min, preferred, max)` মিডিয়া কুয়েরি ছাড়াই মসৃণ ফ্লুইড ফন্ট ও স্পেসিং দেয়।',
          '`var(--accent, #10b981)`-এ কমা দিয়ে ফলব্যাক ডিফল্ট মান দেওয়া যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Global Tokens (:root) & Local Component Scope Override',
        englishParagraphs: [
          'Custom properties inherit down the DOM tree: `.btn` reads `var(--tone)` from its nearest ancestor.',
          'Overriding `--tone` inside `.theme-amber` rethemes nested buttons without duplicating `.btn` CSS rules.',
        ],
        banglaParagraphs: [
          '`:root`-এ রাখা `--tone` পুরো পেজে কাজ করে, কিন্তু `.theme-amber` ব্লকে আবার `--tone` দিলে কেবল তার ভেতরের বাটন কমলা হয়ে যায়।',
          'এতে একই বাটনের জন্য আলাদা আলাদা রঙের ক্লাস লিখতে হয় না।',
        ],
        memoryDiagram: `:root(--tone: #10b981) -> .theme-amber(--tone: #d97706) shadows globally`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --tone: #10b981; }
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .btn { background: var(--tone); color: #fff; border: 0; padding: 10px 16px; border-radius: 8px; font-weight: 700; }
    .theme-amber { --tone: #d97706; margin-top: 12px; }
  </style>
</head>
<body>
  <h1>Scoped CSS Custom Properties</h1>
  <button class="btn" type="button">Emerald Token</button>
  <div class="theme-amber"><button class="btn" type="button">Amber Scoped Token</button></div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Scoped CSS Custom Properties',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: ':root { --tone: #10b981; }', whatItMeans: 'Defines global CSS variable on document root.', whyItIsThere: 'Single source of truth for palette.', ifDeletedError: 'var(--tone) resolves empty without fallback.' },
          { lineNumber: 'Line 9', codeSnippet: '.theme-amber { --tone: #d97706; ... }', whatItMeans: 'Locally overrides --tone inside subtree.', whyItIsThere: 'Component theming with zero extra button rules.', ifDeletedError: 'Second button stays emerald.' },
        ],
      },
      {
        id: 'html-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fluid Typography & Padding via clamp() and calc()',
        englishParagraphs: [
          '`clamp(1.25rem, 3vw, 2.25rem)` acts like `max(1.25rem, min(3vw, 2.25rem))`—scaling typography smoothly across phones and wide monitors.',
          'Remember `calc(100% - 32px)` strictly requires spaces around `+` and `-` operators!',
        ],
        banglaParagraphs: [
          '`clamp(min, preferred, max)` স্ক্রিন বড়-ছোট হওয়ার সাথে ফন্ট ও প্যাডিং নিজে থেকেই অনুপাতিক করে নেয়।',
          '`calc(100% - 32px)` লেখার সময় `+` এবং `-` চিহ্নের দুপাশে অবশ্যই স্পেস রাখতে হয়!',
        ],
        memoryDiagram: `clamp(20px, 3vw, 36px): min=20px | fluid=3vw | cap=36px`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: clamp(12px, 3vw, 32px); }
    h1 { font-size: clamp(1.25rem, 3.2vw, 2.25rem); margin: 0 0 12px; }
    .box { width: calc(100% - 16px); padding: 14px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Fluid Clamp & Calc Sizing</h1>
  <div class="box">Width dynamically tracks calc(100% - 16px) seamlessly.</div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Fluid Clamp & Calc Sizing',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'font-size: clamp(1.25rem, 3.2vw, 2.25rem);', whatItMeans: 'Fluid font scaling clamped safely between min and max.', whyItIsThere: 'Readable on tiny phones and giant monitors alike.', ifDeletedError: 'Reverts to fixed browser heading size.' },
          { lineNumber: 'Line 8', codeSnippet: 'width: calc(100% - 16px);', whatItMeans: 'Combines percentage and pixel units dynamically.', whyItIsThere: 'Mixes fluid parent width with fixed gutters.', ifDeletedError: 'Div expands to 100% edge.' },
        ],
      },
      {
        id: 'html-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Predictable Cascade Ordering Using @layer',
        englishParagraphs: [
          'Declaring `@layer base, components, utilities;` establishes strict layer precedence regardless of selector complexity inside earlier layers.',
          'Rules inside `utilities` cleanly win over `components` without scattering `!important`.',
        ],
        banglaParagraphs: [
          '`@layer base, components, utilities;` ঘোষণা করলে পরের লেয়ারের নিয়ম সবসময় আগের লেয়ারের চেয়ে অগ্রাধিকার পায়।',
          'এতে `!important` ছাড়াই স্টাইল ওভাররাইড পরিচ্ছন্ন থাকে।',
        ],
        memoryDiagram: `@layer order: base -> components -> utilities (highest wins cleanly!)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    @layer base, components, utilities;
    @layer utilities { .bg-emerald { background: #059669; color: #fff; } }
    @layer components { div.pill { background: #475569; padding: 10px 14px; border-radius: 8px; } }
  </style>
</head>
<body>
  <h1>CSS Cascade Layers</h1>
  <div class="pill bg-emerald">Utilities layer wins cleanly despite lower specificity!</div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'CSS Cascade Layers',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: '@layer base, components, utilities;', whatItMeans: 'Sets explicit cascade precedence order.', whyItIsThere: 'Prevents specificity escalation across stylesheets.', ifDeletedError: 'div.pill (higher specificity) overrides .bg-emerald!' },
        ],
      },
      {
        id: 'html-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'calc() Missing Space Trap & Variable Fallbacks',
        englishParagraphs: [
          'Writing `calc(100%-20px)` without spaces around `-` causes CSS parsers to tokenize `-20px` as a negative dimension and drop the entire property silently!',
          'Always place whitespace around `+` and `-` inside `calc()`, and provide safe fallbacks like `var(--pad, 16px)`.',
        ],
        banglaParagraphs: [
          '`calc(100%-20px)` স্পেস ছাড়া লিখলে ব্রাউজার পুরো নিয়মটাই বাতিল করে দেয়! `+` এবং `-`-এর দুপাশে স্পেস থাকা বাধ্যতামূলক।',
          'ভ্যারিয়েবলে `var(--space, 16px)` এভাবে ফলব্যাক মান রাখা ভালো অভ্যাস।',
        ],
        memoryDiagram: `TRAP: calc(100%-20px) INVALID | FIX: calc(100% - 20px) + var(--p, 16px)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .panel { padding: var(--panel-pad, 16px); width: calc(100% - 24px); background: #1e293b; color: #f8fafc; border-radius: 8px; font-family: system-ui, sans-serif; }
  </style>
</head>
<body>
  <h1>Fallback & Safe Calc</h1>
  <div class="panel">Fallback value 16px kicks in cleanly when --panel-pad is unset.</div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Fallback & Safe Calc',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'padding: var(--panel-pad, 16px);', whatItMeans: 'Supplies 16px default if --panel-pad is undefined.', whyItIsThere: 'Keeps components resilient when embedded standalone.', ifDeletedError: 'Uses 0 padding if token missing.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: ':root { --tone: #10b981; }', whatItMeans: 'Global CSS custom property on document root.', whyItIsThere: 'Centralizes theme colors for reuse.', ifDeletedError: 'var(--tone) resolves invalid.' },
      { lineNumber: 'Line 8', codeSnippet: '.btn { background: var(--tone); ... }', whatItMeans: 'Reads inherited --tone value dynamically at runtime.', whyItIsThere: 'Decouples button structure from palette values.', ifDeletedError: 'Button loses themed background.' },
      { lineNumber: 'Line 9', codeSnippet: '.theme-amber { --tone: #d97706; margin-top: 12px; }', whatItMeans: 'Shadows --tone locally for children inside .theme-amber.', whyItIsThere: 'Demonstrates DOM-scoped CSS variables.', ifDeletedError: 'Child button inherits global emerald instead.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Evaluate :root', memoryOrStack: '--tone = #10b981', note: 'Root scope bound globally' },
      { step: 2, state: '1st button.btn', memoryOrStack: 'nearest --tone = #10b981', note: 'Renders emerald button' },
      { step: 3, state: 'Enter .theme-amber', memoryOrStack: 'local --tone = #d97706', note: 'Shadows global token in subtree' },
      { step: 4, state: '2nd button.btn', memoryOrStack: 'nearest --tone = #d97706', note: 'Renders amber button with identical .btn CSS' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Missing Spaces Around + / - Inside calc()', brokenCode: `width: calc(100%-24px);`, fixedCode: `width: calc(100% - 24px);`, whyItBreaks: 'CSS tokenizer parses 100%-24px as invalid syntax without whitespace around binary + or -.' },
      { title: 'Trap 2: Concatenating Units After var(--n) Instead of Multiplying', brokenCode: `font-size: var(--size)px; /* INVALID! */`, fixedCode: `font-size: calc(var(--size) * 1px);`, whyItBreaks: 'Adding unit text after var() inserts a token space; multiply by 1px inside calc() instead.' },
      { title: 'Trap 3: Putting Variables Only Inside body Blocking :root Reuse', brokenCode: `html { font-size: var(--base); } body { --base: 16px; }`, fixedCode: `:root { --base: 16px; } html { font-size: var(--base); }`, whyItBreaks: 'Variables inherit downward—body values cannot cascade upward to html.' },
    ],
    practiceSheet: [
      { id: 'html-ch9-p1', difficulty: 'Easy', title: 'Global & Local Button Tokens', prompt: 'Define `--brand: #059669` on `:root` and locally override it inside `.warn` for a nested button.', banglaHint: '`:root`-এ ডিফল্ট দিয়ে `.warn` ক্লাসের ভেতর `--brand` বদলে দাও।', starterCode: `<!doctype html><html><head><style>:root{--brand:#059669;}.b{background:var(--brand);color:#fff;}.warn{--brand:#dc2626;}</style></head><body><h1>Token Scope</h1><button class="b">OK</button><div class="warn"><button class="b">Warn</button></div></body></html>`, sampleStdin: '', expectedOutput: 'Token Scope' },
      { id: 'html-ch9-p2', difficulty: 'Easy', title: 'var() With Safe Fallback', prompt: 'Use `var(--card-gap, 16px)` inside a grid so spacing works even before `--card-gap` is defined.', banglaHint: '`gap: var(--card-gap, 16px);` ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;gap:var(--card-gap,16px);}</style></head><body><h1>Fallback Token</h1><div class="g"><div>1</div><div>2</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Fallback Token' },
      { id: 'html-ch9-p3', difficulty: 'Medium', title: 'Fluid clamp() Hero Title', prompt: 'Scale `h1` font size fluently with `clamp(1.25rem, 3vw, 2.5rem)`.', banglaHint: '`h1 { font-size: clamp(1.25rem, 3vw, 2.5rem); }` লেখো।', starterCode: `<!doctype html><html><head><style>h1{font-size:clamp(1.25rem,3vw,2.5rem);}</style></head><body><h1>Fluid Clamp Title</h1></body></html>`, sampleStdin: '', expectedOutput: 'Fluid Clamp Title' },
      { id: 'html-ch9-p4', difficulty: 'Medium', title: 'Unit-Safe calc() Gutter', prompt: 'Size `.panel` width to `calc(100% - 32px)` with valid whitespace around `-`.', banglaHint: '`calc(100% - 32px)`-এ `-`-এর দুপাশে স্পেস দাও।', starterCode: `<!doctype html><html><head><style>.panel{width:calc(100% - 32px);padding:12px;border:1px solid #10b981;}</style></head><body><h1>Calc Panel</h1><div class="panel">Ready</div></body></html>`, sampleStdin: '', expectedOutput: 'Calc Panel' },
      { id: 'html-ch9-p5', difficulty: 'Hard', title: '@layer Cascade Design System', prompt: 'Declare `@layer base, components, utilities;` and let a utility class override a component class cleanly.', banglaHint: '`@layer base, components, utilities;` সবার ওপরে ঘোষণা করো।', starterCode: `<!doctype html><html><head><style>@layer base,components,utilities;@layer utilities{.u-teal{background:#0f766e;color:#fff;}}@layer components{div.card{background:#334155;padding:12px;}}</style></head><body><h1>Cascade Layers</h1><div class="card u-teal">Layered</div></body></html>`, sampleStdin: '', expectedOutput: 'Cascade Layers' },
    ],
    miniBuild: {
      title: 'Mini-Build: Scoped Token & Fluid Design Kit',
      description: 'Combine :root global tokens, local subtree token overrides, and fluid clamp() typography in one themed component showcase.',
      banglaGoal: 'গ্লোবাল ও লোকাল CSS ভ্যারিয়েবল এবং `clamp()` দিয়ে একটি থিম-সিস্টেম তৈরি করো।',
      combinesChapters: 'HTML Ch 1–9',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --accent: #059669; --pad: clamp(12px, 2.5vw, 24px); }
    body { font-family: system-ui, sans-serif; padding: var(--pad); }
    .chip { display: inline-block; background: var(--accent); color: #fff; padding: 8px 14px; border-radius: 8px; font-weight: 700; }
    .local { --accent: #7c3aed; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Scoped Design Tokens</h1>
  <div class="chip">Global Token</div>
  <div class="local"><div class="chip">Local Override Token</div></div>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Scoped Design Tokens',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --accent: #059669; --pad: clamp(12px, 2.5vw, 24px); }
    body { font-family: system-ui, sans-serif; padding: var(--pad); }
    .chip { display: inline-block; background: var(--accent); color: #fff; padding: 8px 14px; border-radius: 8px; font-weight: 700; }
    .local { --accent: #7c3aed; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Scoped Design Tokens</h1>
  <div class="chip">Global Token</div>
  <div class="local"><div class="chip">Local Override Token</div></div>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Scoped Design Tokens',
    testCases: [
      { id: 'html9-t1', input: '', expectedOutput: 'Scoped Design Tokens' },
      { id: 'html9-t2', input: '', expectedOutput: 'Local Override Token', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'HTML Chapter 10 (HTML5/CSS3): Web Performance, Critical Rendering Path & DOM Complexity — Merger 2',
    banglaTitle: 'HTML অধ্যায় ১০ (HTML5/CSS3): ওয়েব পারফরম্যান্স, রেন্ডারিং পাথ ও DOM কমপ্লেক্সিটি — মার্জার ২',
    subtitle: 'Milestone Merger 2: Critical Rendering Path, Reflow vs Repaint, LCP/CLS optimization, and O(N) vs O(N^2) DOM complexity.',
    zeroIntuition: {
      plainEnglishStory:
        'Just as algorithms obey the $10^8$ operations rule in C++ or Python, browser rendering engines obey the **16.6 ms Frame Budget** (60 FPS). Every page load traverses the **Critical Rendering Path**: parsing HTML into the DOM Tree, parsing CSS into the CSSOM Tree, merging them into the Render Tree, computing Layout (geometry), Painting pixels, and Compositing GPU layers.\n\nExpensive selectors, missing `<img width height>` attributes (causing Cumulative Layout Shift / CLS), render-blocking scripts in `<head>`, or appending 5,000 DOM nodes one-by-one inside a loop trigger repeated O(N^2) **Layout Thrashing (Reflow)**! By combining semantic landmarks (Ch 1–5), responsive fluid CSS tokens (Ch 6–9), `defer`/`loading="lazy"`, and `content-visibility: auto`, you build pages that paint Largest Contentful Paint (LCP) fast and stay buttery smooth.',
      asciiFlowchart: `HTML Bytes -> DOM Tree ----+
                           +--> Render Tree -> Layout (Geometry) -> Paint -> GPU Composite (16.6ms!)
CSS Bytes  -> CSSOM Tree --+       ^                                    ^
                                   |-- Reading offsetHeight inside loop forces Layout Thrashing (O(N^2))!
  Optimize: <script defer> + explicit width/height (0 CLS) + transform/opacity (Compositor only!)`,
      pseudocode: [
        '1. KEEP <head> lean: inline critical styles or defer non-essential <script defer>',
        '2. RESERVE explicit width & height on media containers to guarantee CLS = 0',
        '3. ANIMATE transform & opacity (Compositor) instead of top/left/width (Reflow)',
        '4. APPLY content-visibility: auto on offscreen sections to skip wasted layout work',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্লুইড সিনেমা প্রজেক্টর ও ১৬.৬ মিলিসেকেন্ডের বাজেট',
        explanation:
          'প্রতি সেকেন্ডে ৬০ ফ্রেম (60 FPS) মসৃণ অ্যানিমেশন দেখাতে হলে ব্রাউজার প্রতিটি ফ্রেম আঁকার জন্য মাত্র ১৬.৬ মিলিসেকেন্ড সময় পায়! যখন ব্রাউজার কোনো ওয়েবপেজ লোড করে, তখন সে HTML পড়ে **DOM Tree** এবং CSS পড়ে **CSSOM Tree** বানায়, তারপর দুটো মিলিয়ে **Render Tree** তৈরি করে লেআউট (জ্যামিতি হিসাব), পেইন্ট ও কম্পোজিটিং করে। কিন্তু তুমি যদি `<head>`-এর মধ্যে `defer` ছাড়া ভারী জাভাস্ক্রিপ্ট রাখো, কিংবা ছবির `width`/`height` না দাও, তাহলে ব্রাউজার আটকে যায় এবং হঠাৎ করে লেখা লাফ দিয়ে নিচে নেমে যায়—যাকে **CLS (Cumulative Layout Shift)** বলে! ঠিক অ্যালগরিদমের Big-O কমপ্লেক্সিটির মতো, লুপের ভেতরে বারবার DOM এলিমেন্টের মাপ পড়ে আবার মাপ বদলালে ব্রাউজার বাধ্য হয়ে `O(N^2)` বার **Reflow (Layout Thrashing)** চালায়, ফলে মোবাইল হ্যাং করতে থাকে। এর বদলে সবসময় `transform` ও `opacity` অ্যানিমেট করলে কাজটি সরাসরি GPU কম্পোজিটর স্তরে `O(1)` খরচে হয়ে যায়, লেআউট নড়ে না! পাশাপাশি অফস্ক্রিন সেকশনে `content-visibility: auto` এবং ভারী ছবিতে `loading="lazy"` ও `fetchpriority="high"` দিলে **LCP (Largest Contentful Paint)** চোখের পলকে হয়ে যায়। অধ্যায় ১ থেকে ৯ পর্যন্ত শেখা সব সেমান্টিক ট্যাগ, গ্রিড, ফ্লেক্স এবং CSS ভ্যারিয়েবল একসাথে অপ্টিমাইজ করাই হলো এই **Milestone Merger 2**।',
        everydayExample:
          'দোকানের সাজানো তাকে যদি প্রতিটি নতুন বই রাখার সময় পুরো আলমারি ভেঙে আবার মাপজোখ করো (Reflow), দিন কাবার হয়ে যাবে; কিন্তু প্রতিটি বইয়ের জায়গা আগে থেকে মাপা থাকলে (`width/height` রিজার্ভড) শুধু বইটা বসিয়ে দিলেই (`Composite`) কাজ শেষ!',
        keyTakeaways: [
          'সব `<script>`-এ `defer` এবং হিরো ইমেজে `fetchpriority="high"` + `width`/`height` দেওয়া LCP ও CLS শূন্য রাখে।',
          '`width/top/left` বদলালে পুরো Layout (Reflow) নতুন করে হিসাব হয়; `transform`/`opacity` কেবল GPU স্তরে আঁকা হয়।',
          '`content-visibility: auto` নিচের অফস্ক্রিন DOM সেকশনের প্রারম্ভিক রেন্ডারিং খরচ বাঁচিয়ে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Zero-CLS Aspect Ratio Reservation & Script Defer Blueprint',
        englishParagraphs: [
          'Adding explicit `width` and `height` (or `aspect-ratio: 16 / 9`) reserves exact vertical layout space before media loads, preventing Cumulative Layout Shift.',
          'Using `<script defer>` lets the HTML parser build the entire DOM uninterrupted without blocking First Contentful Paint.',
        ],
        banglaParagraphs: [
          'মিডিয়া বক্সে `aspect-ratio` বা `width`/`height` আগে থেকেই দিয়ে রাখলে কন্টেন্ট লোড হওয়ার পর পেজ নিচে লাফ দেয় না (CLS = 0)।',
          'নন-ক্রিটিক্যাল স্ক্রিপ্টে `defer` দিলে HTML পার্সিং আটকে না থেকে দ্রুত স্ক্রিনে দেখায়।',
        ],
        memoryDiagram: `aspect-ratio: 16/9 -> layout space locked pre-load -> 0 Reflow jumps`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Zero CLS Performance</title>
  <style>
    :root { --accent: #059669; }
    body { font-family: system-ui, sans-serif; margin: 24px; color: #0f172a; }
    .hero-slot { width: 100%; max-width: 480px; aspect-ratio: 16 / 9; background: #ecfdf5; border: 2px solid var(--accent); border-radius: 10px; display: grid; place-items: center; font-weight: 700; }
  </style>
</head>
<body>
  <main>
    <h1>Critical Rendering Path Ready</h1>
    <div class="hero-slot">Reserved 16:9 LCP Slot (CLS = 0.00)</div>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Critical Rendering Path Ready',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'aspect-ratio: 16 / 9;', whatItMeans: 'Pre-computes exact box height from container width before child assets paint.', whyItIsThere: 'Eliminates layout shifts (CLS = 0) during progressive loading.', ifDeletedError: 'Container collapses to 0 height then jumps downward on load.' },
        ],
      },
      {
        id: 'html-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'GPU-Composited Transform Hover vs Reflow Properties',
        englishParagraphs: [
          'Changing `margin-top` or `height` forces the browser Layout phase to recalculate sibling positions.',
          'Animating `transform: translateY(-4px)` with `will-change: transform` promotes the element onto a GPU compositor layer cleanly.',
        ],
        banglaParagraphs: [
          '`margin` বা `height` বদলালে ব্রাউজারকে আশেপাশের সব এলিমেন্টের জায়গা নতুন করে মাপতে হয় (Reflow)।',
          'কিন্তু `transform` ও `opacity` কেবল GPU কম্পোজিটর স্তরে বদলায়, তাই ৬০ FPS বজায় থাকে।',
        ],
        memoryDiagram: `height/margin change -> Layout+Paint+Composite | transform -> Composite ONLY!`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; }
    .card { padding: 16px; border-radius: 10px; background: #0f172a; color: #ecfdf5; transition: transform 0.2s ease, opacity 0.2s ease; will-change: transform; }
    .card:hover { transform: translateY(-4px); opacity: 0.96; }
  </style>
</head>
<body>
  <h1>GPU Compositor Card</h1>
  <article class="card">Hover lifts via transform without triggering Reflow.</article>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'GPU Compositor Card',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'transition: transform 0.2s ease, opacity 0.2s ease;', whatItMeans: 'Restricts animation strictly to compositor-friendly properties.', whyItIsThere: 'Guarantees 16.6ms frame budget smoothness.', ifDeletedError: 'Motion becomes instant jump rather than composited glide.' },
        ],
      },
      {
        id: 'html-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Deferred Below-the-Fold Sections Using content-visibility: auto',
        englishParagraphs: [
          'Large dashboards with hundreds of DOM nodes spend excessive startup time laying out off-screen cards.',
          'Setting `content-visibility: auto; contain-intrinsic-size: auto 220px;` skips layout and paint until a section nears the viewport.',
        ],
        banglaParagraphs: [
          'লম্বা পেজের নিচের দিকের অফস্ক্রিন সেকশনগুলোতে `content-visibility: auto` দিলে শুরুতে অহেতুক লেআউট ও পেইন্ট সময় নষ্ট হয় না।',
          '`contain-intrinsic-size` আনুমানিক উচ্চতা ধরে রেখে স্ক্রলবার স্থির রাখে।',
        ],
        memoryDiagram: `Offscreen section -> content-visibility: auto -> skipped until scrolled near`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; }
    .heavy-section { content-visibility: auto; contain-intrinsic-size: auto 180px; border: 1px solid #cbd5e1; padding: 16px; border-radius: 10px; margin-top: 12px; }
  </style>
</head>
<body>
  <h1>Virtual Rendering Budget</h1>
  <section class="heavy-section"><h2>Archive Analytics</h2><p>Browser skips offscreen paint automatically.</p></section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Virtual Rendering Budget',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'content-visibility: auto; contain-intrinsic-size: auto 180px;', whatItMeans: 'Defers layout/paint for offscreen DOM subtree with placeholder scroll height.', whyItIsThere: 'Cuts initial rendering work from O(TotalDOM) to O(VisibleDOM).', ifDeletedError: 'Browser renders every offscreen section eagerly on load.' },
        ],
      },
      {
        id: 'html-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Deep Universal Selectors & Layout Thrashing vs Flat BEM Tokens',
        englishParagraphs: [
          'Complex descendant chains like `body main section div ul li a span` force the CSSOM selector matcher (right-to-left!) to inspect ancestors across the DOM.',
          'Flat semantic classes (`.nav-link`) match in `O(1)` hash-bucket lookups inside the style engine, just like keeping algorithms below $10^8$ ops.',
        ],
        banglaParagraphs: [
          'অতিরিক্ত দীর্ঘ ডিসেন্ড্যান্ট সিলেক্টর লিখলে ব্রাউজার ডান থেকে বামে প্রতিটি অ্যানসেস্টর পরীক্ষা করতে বাড়তি সময় নেয়।',
          'ফ্ল্যাট ক্লাস সিলেক্টর `.badge-ok` প্রায় `O(1)` গতিতে ম্যাচ হয়।',
        ],
        memoryDiagram: `TRAP: main div ul li span (deep walk) | FIX: .badge-ok (O(1) class lookup)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .badge-ok { display: inline-block; padding: 6px 12px; border-radius: 6px; background: #059669; color: #fff; font-family: system-ui, sans-serif; font-weight: 700; }
  </style>
</head>
<body>
  <h1>O(1) Flat Class Matching</h1>
  <span class="badge-ok">Fast Style Recalc</span>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'O(1) Flat Class Matching',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: '.badge-ok { ... }', whatItMeans: 'Single flat class selector matched via browser Bloom/hash bucket.', whyItIsThere: 'Avoids deep DOM ancestor traversal during style recalculation.', ifDeletedError: 'Span loses flat badge styling.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 7', codeSnippet: ':root { --accent: #059669; }', whatItMeans: 'Scoped root color token reused across critical components.', whyItIsThere: 'Keeps critical inline CSS tiny and consistent.', ifDeletedError: 'Accent resolves invalid.' },
      { lineNumber: 'Line 9', codeSnippet: '.hero-slot { ... aspect-ratio: 16 / 9; ... }', whatItMeans: 'Locks geometry aspect ratio before media bytes decode.', whyItIsThere: 'Prevents CLS (Cumulative Layout Shift) completely.', ifDeletedError: 'Hero box height jumps dynamically after load.' },
      { lineNumber: 'Line 13', codeSnippet: '<h1>Critical Rendering Path Ready</h1>', whatItMeans: 'Primary Largest Contentful Paint text element inside <main>.', whyItIsThere: 'Paints immediately without script blocking.', ifDeletedError: 'Missing primary semantic heading.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse HTML -> DOM', memoryOrStack: '<head><style> -> <main>', note: 'Zero blocking external scripts' },
      { step: 2, state: 'Parse CSS -> CSSOM', memoryOrStack: ':root + .hero-slot', note: 'Flat O(1) class lookup' },
      { step: 3, state: 'Layout Phase', memoryOrStack: '16:9 box reserved upfront', note: 'CLS = 0.00 guaranteed' },
      { step: 4, state: 'Paint & Composite', memoryOrStack: '< 16.6ms single frame', note: 'First & Largest Contentful Paint ready' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Blocking <head> With Synchronous <script>', brokenCode: `<head><script src="heavy-chart.js"></script></head>`, fixedCode: `<head><script defer src="heavy-chart.js"></script></head>`, whyItBreaks: 'Without defer or async, the HTML parser freezes until the script downloads and executes.' },
      { title: 'Trap 2: Omitting width/height on Images Causing CLS Jumps', brokenCode: `<img src="banner.jpg" alt="Banner" />`, fixedCode: `<img src="banner.jpg" alt="Banner" width="800" height="450" loading="lazy" />`, whyItBreaks: 'Browser allocates 0px height initially and pushes text downward once image headers arrive.' },
      { title: 'Trap 3: Animating Layout Properties (top/left/width) Instead of transform', brokenCode: `.card:hover { margin-top: -6px; } /* Triggers Reflow! */`, fixedCode: `.card:hover { transform: translateY(-6px); }`, whyItBreaks: 'Margin/width shifts force sibling layout recalculation every animation frame.' },
    ],
    practiceSheet: [
      { id: 'html-ch10-p1', difficulty: 'Easy', title: 'Zero-CLS Aspect Box', prompt: 'Reserve a `16 / 9` hero placeholder box so layout height is known before image load.', banglaHint: '`aspect-ratio: 16 / 9;` দিয়ে উচ্চতা আগে থেকেই ফিক্স করো।', starterCode: `<!doctype html><html><head><style>.slot{width:320px;aspect-ratio:16/9;background:#ecfdf5;border:1px solid #059669;}</style></head><body><h1>Zero CLS Box</h1><div class="slot">Reserved</div></body></html>`, sampleStdin: '', expectedOutput: 'Zero CLS Box' },
      { id: 'html-ch10-p2', difficulty: 'Easy', title: 'Flat Class Selector Optimization', prompt: 'Replace deep ancestor chains with a flat `.status-chip` class for `O(1)` matching.', banglaHint: 'লম্বা `div ul li span` বাদ দিয়ে সরাসরি `.status-chip` লেখো।', starterCode: `<!doctype html><html><head><style>.status-chip{padding:6px 10px;background:#0f172a;color:#34d399;border-radius:6px;}</style></head><body><h1>Flat Selector</h1><span class="status-chip">O(1) Style</span></body></html>`, sampleStdin: '', expectedOutput: 'Flat Selector' },
      { id: 'html-ch10-p3', difficulty: 'Medium', title: 'Compositor-Only Card Lift', prompt: 'Animate hover lift using `transform: translateY(-4px)` and `opacity` instead of `margin`.', banglaHint: '`margin` না বদলে `transform: translateY(-4px)` ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.tile{padding:14px;background:#1e293b;color:#fff;transition:transform 0.2s;}.tile:hover{transform:translateY(-4px);}</style></head><body><h1>Compositor Lift</h1><div class="tile">Hover Ready</div></body></html>`, sampleStdin: '', expectedOutput: 'Compositor Lift' },
      { id: 'html-ch10-p4', difficulty: 'Medium', title: 'Virtual Offscreen Section', prompt: 'Add `content-visibility: auto` and `contain-intrinsic-size: auto 200px` to an archive section.', banglaHint: 'অফস্ক্রিন সেকশনে `content-visibility: auto` যোগ করো।', starterCode: `<!doctype html><html><head><style>.lazy-sec{content-visibility:auto;contain-intrinsic-size:auto 200px;padding:12px;border:1px solid #94a3b8;}</style></head><body><h1>Deferred Paint</h1><section class="lazy-sec">Archive Ready</section></body></html>`, sampleStdin: '', expectedOutput: 'Deferred Paint' },
      { id: 'html-ch10-p5', difficulty: 'Hard', title: 'LCP Priority Hero & Tokens Merger', prompt: 'Combine `:root` tokens, semantic `<main>`, `aspect-ratio`, and `clamp()` into a zero-CLS performance shell.', banglaHint: '`:root` টোকেন, `<main>`, `clamp()` ও `aspect-ratio` একসাথে ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>:root{--brand:#059669;}h1{font-size:clamp(1.2rem,3vw,2rem);}.hero{aspect-ratio:16/9;background:#ecfdf5;border:2px solid var(--brand);padding:16px;}</style></head><body><main><h1>Performance Shell</h1><div class="hero">LCP Locked</div></main></body></html>`, sampleStdin: '', expectedOutput: 'Performance Shell' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: 60FPS Zero-CLS Performance Landing Shell',
      description: 'Combine Ch 1–10: semantic landmarks, CSS variables, fluid clamp(), GPU compositor hover, aspect-ratio locking, and content-visibility.',
      banglaGoal: 'অধ্যায় ১–১০ মিলিয়ে শূন্য-CLS, GPU কম্পোজিটেড এবং ফ্লুইড টোকেনসমৃদ্ধ একটি পারফরম্যান্স শেল তৈরি করো।',
      combinesChapters: 'HTML Ch 1–10 (Milestone Merger 2)',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --emerald: #059669; --ink: #0f172a; }
    body { font-family: system-ui, sans-serif; color: var(--ink); margin: 0; padding: clamp(14px, 3vw, 28px); }
    h1 { font-size: clamp(1.3rem, 3vw, 2.2rem); margin: 0 0 12px; }
    .hero-frame { aspect-ratio: 16 / 9; max-width: 520px; border: 2px solid var(--emerald); border-radius: 12px; padding: 16px; background: #ecfdf5; transition: transform 0.2s ease; }
    .hero-frame:hover { transform: translateY(-3px); }
    .below-fold { margin-top: 16px; content-visibility: auto; contain-intrinsic-size: auto 120px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 10px; }
  </style>
</head>
<body>
  <main>
    <h1>Milestone 2: 60FPS Web Engine</h1>
    <section class="hero-frame">LCP Reserved 16:9 Frame (CLS = 0)</section>
    <section class="below-fold">Offscreen Section Deferred via content-visibility</section>
  </main>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Milestone 2: 60FPS Web Engine',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    :root { --emerald: #059669; --ink: #0f172a; }
    body { font-family: system-ui, sans-serif; color: var(--ink); margin: 0; padding: clamp(14px, 3vw, 28px); }
    h1 { font-size: clamp(1.3rem, 3vw, 2.2rem); margin: 0 0 12px; }
    .hero-frame { aspect-ratio: 16 / 9; max-width: 520px; border: 2px solid var(--emerald); border-radius: 12px; padding: 16px; background: #ecfdf5; transition: transform 0.2s ease; }
    .hero-frame:hover { transform: translateY(-3px); }
    .below-fold { margin-top: 16px; content-visibility: auto; contain-intrinsic-size: auto 120px; padding: 14px; border: 1px solid #cbd5e1; border-radius: 10px; }
  </style>
</head>
<body>
  <main>
    <h1>Milestone 2: 60FPS Web Engine</h1>
    <section class="hero-frame">LCP Reserved 16:9 Frame (CLS = 0)</section>
    <section class="below-fold">Offscreen Section Deferred via content-visibility</section>
  </main>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Milestone 2: 60FPS Web Engine',
    testCases: [
      { id: 'html10-t1', input: '', expectedOutput: 'Milestone 2: 60FPS Web Engine' },
      { id: 'html10-t2', input: '', expectedOutput: 'LCP Reserved 16:9 Frame', isHidden: true },
    ],
  },
};


