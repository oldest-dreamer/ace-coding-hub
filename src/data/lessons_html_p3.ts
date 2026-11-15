import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_HTML_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'HTML Chapter 11 (HTML5/CSS3): CSS Flexbox 1D Layouts & Alignment',
    banglaTitle: 'HTML অধ্যায় ১১ (HTML5/CSS3): CSS ফ্লেক্সবক্স (১ডি লেআউট ও অ্যালাইনমেন্ট)',
    subtitle: 'Main vs Cross axis geometry, justify-content, align-items, flex: 1 / flex-wrap, and gap spacing.',
    zeroIntuition: {
      plainEnglishStory:
        'Before **Flexbox**, centering cards vertically or spacing navigation items required brittle `float: left` hacks and negative margin math. Setting `display: flex` on a container transforms its direct children into flexible items laid along a **1-Dimensional Main Axis** (`row` horizontally by default, or `column` vertically) plus a perpendicular **Cross Axis**.\n\nTwo rules explain 95% of Flexbox: `justify-content` aligns items along the *Main Axis* (`space-between`, `center`, `flex-start`), while `align-items` aligns along the *Cross Axis*. Adding `flex-wrap: wrap` lets responsive cards drop cleanly onto new rows without overflowing small mobile screens.',
      asciiFlowchart: `.flex-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
   Main Axis (Left --------> Right): justify-content controls horizontal spacing!
   +--------+                  +--------------+                  +--------+
   |  Logo  |   (auto gap!)    |  Nav Links   |   (auto gap!)    | Action |
   +--------+                  +--------------+                  +--------+
   Cross Axis (Top -> Bottom): align-items: center aligns all heights vertically!`,
      pseudocode: [
        '1. DECLARE display: flex and flex-direction (row or column) on parent container',
        '2. ALIGN along Main Axis with justify-content and Cross Axis with align-items',
        '3. ADD flex-wrap: wrap and gap: 12px for clean responsive multi-line rows',
        '4. APPLY flex: 1 1 220px (grow shrink basis) on child cards for equal fluid widths',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির বগির সারি ও রাবার-ইলাস্টিক ফিতা',
        explanation:
          'পুরনো আমলে ওয়েবসাইটের পাশাপাশি বাটন বা কার্ড সাজাতে `float: left` লিখে কত যে ঝামেলা হতো! **CSS Flexbox** হলো ঠিক একটি সোজা ১ডি রেললাইন (`flex-direction: row` হলে আনুভূমিক, আর `column` হলে উল্লম্ব), যেখানে প্যারেন্ট কন্টেইনারে `display: flex;` লিখলেই তার ভেতরের সরাসরি চাইল্ডগুলো রাবার-ইলাস্টিকের মতো নমনীয় হয়ে যায়। এখানে দুটি অক্ষ মনে রাখলেই সব সহজ: প্রধান লাইন বা **Main Axis** বরাবর জায়গা বণ্টন করে `justify-content` (যেমন দুই প্রান্তে পাঠাতে `space-between` বা মাঝে আনতে `center`), আর লম্বালম্বি অক্ষ বা **Cross Axis** বরাবর সোজা করে `align-items` (`center` দিলে উপর-নিচে একদম মাঝখানে বসে)। আগে মাঝখানের ফাঁকা রাখতে মার্জিন হিসাব করতে হতো, এখন স্রেফ `gap: 12px;` দিলেই চমৎকার দূরত্ব তৈরি হয়। ছোট স্ক্রিনে কার্ডগুলো যেন বাইরে বেরিয়ে স্ক্রলবার না বানায়, তাই `flex-wrap: wrap;` আর চাইল্ড কার্ডে `flex: 1 1 200px;` দিলে স্ক্রিন অনুযায়ী কার্ডগুলো সমান প্রস্থ নিয়ে পরের সারিতে সুন্দরভাবে নেমে আসে। মনে রাখবে `flex: 1` দেওয়া চাইল্ড যদি লম্বা টেক্সট থাকে, তাহলে সংকুচিত হওয়ার জন্য অনেকসময় `min-width: 0` দিতে হয়।',
        everydayExample:
          'বইয়ের তাকে এক সারিতে বই সাজালে `justify-content` বইগুলোকে ডানে-বামে ছড়িয়ে দেয়, আর `align-items` ছোট-বড় বইগুলোকে মাঝ-বরাবর সোজা রাখে।',
        keyTakeaways: [
          '`justify-content` সবসময় **Main Axis** (ডিফল্ট আনুভূমিক) এবং `align-items` **Cross Axis** নিয়ন্ত্রণ করে।',
          '`flex-direction: column` করলে অক্ষ দুটি উল্টে যায়—তখন `justify-content` উপর-নিচে কাজ করে!',
          'রেসপন্সিভ ফ্লেক্স রোতে `flex-wrap: wrap` ও `gap` দিলে মার্জিনের ঝামেলা থাকে না।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Navbar Alignment via justify-content & align-items',
        englishParagraphs: [
          'A single `display: flex; justify-content: space-between; align-items: center;` rule powers almost every modern responsive top navbar.',
          '`gap` spaces adjacent nav items cleanly without first-child/last-child margin hacks.',
        ],
        banglaParagraphs: [
          'মাত্র এক লাইন `display: flex` সাথে `space-between` ও `align-items: center` দিয়ে লোগো ও মেনু লিংক দুই প্রান্তে সুন্দরভাবে সাজানো যায়।',
          '`gap: 12px` মাঝের ব্যবধান ঠিক রাখে।',
        ],
        memoryDiagram: `header.nav -> [Brand] <--- space-between ---> [Docs | Arena]`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .navbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 18px; background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; border-radius: 10px; }
    .links { display: flex; gap: 14px; }
    a { color: #34d399; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <header class="navbar">
    <strong>ArgonCode</strong>
    <nav class="links"><a href="#tracks">Tracks</a><a href="#arena">Arena</a></nav>
  </header>
  <h1>Flexbox Navbar Ready</h1>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Flexbox Navbar Ready',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'display: flex; justify-content: space-between; align-items: center;', whatItMeans: 'Lays children horizontally, separates edges, and centers vertically.', whyItIsThere: 'Canonical 1D navbar alignment.', ifDeletedError: 'Children stack vertically as block elements.' },
        ],
      },
      {
        id: 'html-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Wrapping Equal-Growth Card Row (flex: 1 1 180px)',
        englishParagraphs: [
          '`flex-wrap: wrap` combined with `flex: 1 1 180px` creates fluid rows that wrap naturally whenever containers shrink under 180px per card.',
          'Each card automatically expands to share leftover row space equally.',
        ],
        banglaParagraphs: [
          '`flex-wrap: wrap` ও চাইল্ডে `flex: 1 1 180px` ব্যবহার করলে স্ক্রিন ছোট হওয়া মাত্র কার্ডগুলো পরের লাইনে নেমে আসে।',
          'প্রতিটি সারির বাকি ফাঁকা জায়গা কার্ডগুলো সমানভাবে ভাগ করে নেয়।',
        ],
        memoryDiagram: `row[flex-wrap: wrap] -> Card(flex: 1 1 180px) grows evenly`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .row { display: flex; flex-wrap: wrap; gap: 12px; }
    .card { flex: 1 1 180px; padding: 14px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Responsive Flex Cards</h1>
  <section class="row">
    <article class="card"><h2>Phase 1</h2><p>Foundations</p></article>
    <article class="card"><h2>Phase 2</h2><p>Algorithms</p></article>
    <article class="card"><h2>Phase 3</h2><p>Data Structures</p></article>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Responsive Flex Cards',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '.card { flex: 1 1 180px; ... }', whatItMeans: 'Sets flex-grow: 1, flex-shrink: 1, flex-basis: 180px.', whyItIsThere: 'Auto-wraps cards without fixed media queries.', ifDeletedError: 'Cards shrink down tightly around text content only.' },
        ],
      },
      {
        id: 'html-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Sticky Footer & Pinned Action Button via margin-top: auto',
        englishParagraphs: [
          'Setting `display: flex; flex-direction: column;` inside a card lets you put `margin-top: auto` on the footer button.',
          'All cards in a row align their CTA buttons cleanly along the exact same bottom baseline!',
        ],
        banglaParagraphs: [
          'কার্ডের ভেতরে `flex-direction: column` রেখে শেষ বাটনে `margin-top: auto` দিলে সব কার্ডের বাটন একই নিচের লাইনে থাকে!',
          'লেখার পরিমাণ কম-বেশি হলেও লেআউট অসমান দেখায় না।',
        ],
        memoryDiagram: `.card[column] -> p -> button(margin-top: auto pushed cleanly to bottom!)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .grid { display: flex; gap: 12px; font-family: system-ui, sans-serif; }
    .tile { flex: 1; display: flex; flex-direction: column; min-height: 150px; padding: 14px; border: 1px solid #94a3b8; border-radius: 8px; }
    .cta { margin-top: auto; padding: 8px 12px; background: #059669; color: #fff; border: 0; border-radius: 6px; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Column Flex Baseline Alignment</h1>
  <div class="grid">
    <div class="tile"><p>Short description.</p><button class="cta" type="button">Launch</button></div>
    <div class="tile"><p>Much longer description wrapping across lines cleanly.</p><button class="cta" type="button">Launch</button></div>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Column Flex Baseline Alignment',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '.cta { margin-top: auto; ... }', whatItMeans: 'Consumes all free vertical flex space above button.', whyItIsThere: 'Pins button to exact bottom of variable-text card.', ifDeletedError: 'Button sits directly beneath short paragraph.' },
        ],
      },
      {
        id: 'html-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Flex Overflow Blowout Trap vs min-width: 0 Truncation',
        englishParagraphs: [
          'Flex items default to `min-width: auto`, meaning long unbroken code tokens push a `flex: 1` column wider than the screen!',
          'Adding `min-width: 0;` onto shrinking flex items lets `overflow: hidden; text-overflow: ellipsis;` clamp text cleanly.',
        ],
        banglaParagraphs: [
          'ফ্লেক্স আইটেমে ডিফল্টভাবে `min-width: auto` থাকে, তাই লম্বা কোড বা URL থাকলে `flex: 1` কলাম স্ক্রিন ছাড়িয়ে বেরিয়ে যায়!',
          'অবশ্যই `min-width: 0` যোগ করলে টেক্সট সুন্দরভাবে ট্রাংকেট হয়।',
        ],
        memoryDiagram: `TRAP: flex: 1 overflows parent | FIX: flex: 1; min-width: 0;`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .bar { display: flex; gap: 10px; max-width: 340px; padding: 10px; border: 1px solid #059669; font-family: system-ui, sans-serif; }
    .label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  </style>
</head>
<body>
  <h1>Safe Flex Shrink (min-width: 0)</h1>
  <div class="bar"><span class="label">super_long_identifier_without_spaces_truncated_cleanly</span><span>OK</span></div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Safe Flex Shrink (min-width: 0)',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'flex: 1; min-width: 0;', whatItMeans: 'Overrides default min-width: auto on flex child.', whyItIsThere: 'Allows text-overflow: ellipsis to shrink inside bounded parent.', ifDeletedError: 'Long string forces container horizontally past 340px.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 6', codeSnippet: '.navbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; ... }', whatItMeans: 'Creates horizontal flex formatting context on header.', whyItIsThere: 'Aligns logo left and links right cleanly.', ifDeletedError: 'Items stack vertically.' },
      { lineNumber: 'Line 7', codeSnippet: '.links { display: flex; gap: 14px; }', whatItMeans: 'Nested horizontal flex container with 14px uniform gap.', whyItIsThere: 'Spaces navigation links evenly without margin hacks.', ifDeletedError: 'Links touch with 0 spacing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'header display: flex', memoryOrStack: 'Main Axis = horizontal', note: 'Direct children become flex items' },
      { step: 2, state: 'justify-content: space-between', memoryOrStack: 'Brand left, .links right', note: 'Free width pushed between items' },
      { step: 3, state: 'align-items: center', memoryOrStack: 'Cross Axis centered', note: 'Vertical middles aligned cleanly' },
      { step: 4, state: 'Paint .navbar', memoryOrStack: '12px gap respected', note: 'Single-pass 1D layout done' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Long Unbroken Text Breaking flex: 1 Bounds', brokenCode: `.col { flex: 1; overflow: hidden; } /* Still overflows! */`, fixedCode: `.col { flex: 1; min-width: 0; overflow: hidden; }`, whyItBreaks: 'Flex items enforce min-width: auto unless explicitly reset to 0.' },
      { title: 'Trap 2: Forgetting Main/Cross Axis Swap on flex-direction: column', brokenCode: `.col { display: flex; flex-direction: column; align-items: center; } /* Centers horizontally, NOT vertically! */`, fixedCode: `.col { display: flex; flex-direction: column; justify-content: center; }`, whyItBreaks: 'Changing direction to column rotates justify-content vertical and align-items horizontal.' },
      { title: 'Trap 3: Expecting justify-content: center Without Multi-Child Wrapping', brokenCode: `.row { display: flex; } /* Overflow scrollbar on narrow phone! */`, fixedCode: `.row { display: flex; flex-wrap: wrap; gap: 12px; }`, whyItBreaks: 'Flex containers default to nowrap unless flex-wrap: wrap is enabled.' },
    ],
    practiceSheet: [
      { id: 'html-ch11-p1', difficulty: 'Easy', title: 'Space-Between Top Header', prompt: 'Align a title on the left and a status badge on the right inside a single `display: flex` bar.', banglaHint: '`display: flex; justify-content: space-between; align-items: center;` দাও।', starterCode: `<!doctype html><html><head><style>.top{display:flex;justify-content:space-between;align-items:center;padding:12px;background:#0f172a;color:#fff;}</style></head><body><header class="top"><h1>Flex Header</h1><span>Online</span></header></body></html>`, sampleStdin: '', expectedOutput: 'Flex Header' },
      { id: 'html-ch11-p2', difficulty: 'Easy', title: 'Perfect Vertical & Horizontal Center', prompt: 'Center a badge inside a 180px tall hero box using Flexbox.', banglaHint: '`display: flex; justify-content: center; align-items: center;` ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.hero{display:flex;justify-content:center;align-items:center;height:180px;background:#ecfdf5;}</style></head><body><h1>Centered Box</h1><div class="hero"><span>Dead Center</span></div></body></html>`, sampleStdin: '', expectedOutput: 'Centered Box' },
      { id: 'html-ch11-p3', difficulty: 'Medium', title: 'Wrapping Card Deck', prompt: 'Build 3 equal cards with `flex-wrap: wrap` and `flex: 1 1 160px`.', banglaHint: '`flex: 1 1 160px;` দিয়ে সমান প্রস্থের কার্ড বানাও।', starterCode: `<!doctype html><html><head><style>.deck{display:flex;flex-wrap:wrap;gap:12px;}.c{flex:1 1 160px;padding:12px;border:1px solid #059669;}</style></head><body><h1>Wrap Deck</h1><div class="deck"><div class="c">A</div><div class="c">B</div><div class="c">C</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Wrap Deck' },
      { id: 'html-ch11-p4', difficulty: 'Medium', title: 'Column Card With Bottom CTA', prompt: 'Use `flex-direction: column` and `margin-top: auto` on a footer button.', banglaHint: 'বাটনে `margin-top: auto` বসিয়ে নিচে আটকে দাও।', starterCode: `<!doctype html><html><head><style>.card{display:flex;flex-direction:column;height:150px;padding:12px;border:1px solid #64748b;}.btn{margin-top:auto;}</style></head><body><h1>Pinned CTA</h1><article class="card"><p>Content</p><button class="btn">Open</button></article></body></html>`, sampleStdin: '', expectedOutput: 'Pinned CTA' },
      { id: 'html-ch11-p5', difficulty: 'Hard', title: 'Ellipsis Truncation Inside Flex Row', prompt: 'Truncate a long title safely inside a 280px flex bar using `min-width: 0`.', banglaHint: 'টেক্সট চাইল্ডে অবশ্যই `min-width: 0` রাখবে।', starterCode: `<!doctype html><html><head><style>.row{display:flex;max-width:280px;gap:8px;}.txt{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}</style></head><body><h1>Safe Shrink</h1><div class="row"><span class="txt">very_long_token_truncated_cleanly</span><span>Tag</span></div></body></html>`, sampleStdin: '', expectedOutput: 'Safe Shrink' },
    ],
    miniBuild: {
      title: 'Mini-Build: Responsive Flex Navbar & Card Row',
      description: 'Combine space-between navbar, responsive wrapping cards, and bottom-pinned action links using Flexbox.',
      banglaGoal: 'ফ্লেক্সবক্স দিয়ে একটি রেসপন্সিভ ন্যাভবার ও কার্ড সারি ডিজাইন করো।',
      combinesChapters: 'HTML Ch 1–11',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .nav { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0f172a; color: #fff; border-radius: 8px; }
    .deck { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; }
    .card { flex: 1 1 180px; display: flex; flex-direction: column; min-height: 120px; padding: 14px; border: 1px solid #10b981; border-radius: 8px; }
    .go { margin-top: auto; color: #059669; font-weight: 700; }
  </style>
</head>
<body>
  <header class="nav"><h1>Flexbox Studio</h1><span>v3</span></header>
  <section class="deck">
    <article class="card"><h2>Basics</h2><a class="go" href="#b">Start</a></article>
    <article class="card"><h2>Wrap & Grow</h2><a class="go" href="#w">Start</a></article>
  </section>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Flexbox Studio',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .nav { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #0f172a; color: #fff; border-radius: 8px; }
    .deck { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; }
    .card { flex: 1 1 180px; display: flex; flex-direction: column; min-height: 120px; padding: 14px; border: 1px solid #10b981; border-radius: 8px; }
    .go { margin-top: auto; color: #059669; font-weight: 700; }
  </style>
</head>
<body>
  <header class="nav"><h1>Flexbox Studio</h1><span>v3</span></header>
  <section class="deck">
    <article class="card"><h2>Basics</h2><a class="go" href="#b">Start</a></article>
    <article class="card"><h2>Wrap & Grow</h2><a class="go" href="#w">Start</a></article>
  </section>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Flexbox Studio',
    testCases: [
      { id: 'html11-t1', input: '', expectedOutput: 'Flexbox Studio' },
      { id: 'html11-t2', input: '', expectedOutput: 'Wrap & Grow', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'HTML Chapter 12 (HTML5/CSS3): CSS Grid 2D Templates, fr Units & Subgrid',
    banglaTitle: 'HTML অধ্যায় ১২ (HTML5/CSS3): CSS গ্রিড (২ডি টেমপ্লেট, fr ও সাবগ্রিড)',
    subtitle: '2D grid-template-columns, repeat(auto-fit, minmax(220px, 1fr)), named grid-template-areas, and grid-template-rows: subgrid.',
    zeroIntuition: {
      plainEnglishStory:
        'While Flexbox solves 1D rows OR columns, **CSS Grid** controls **2-Dimensional rows AND columns simultaneously**. You define exact column tracks (`grid-template-columns: 220px 1fr;`), span items across multiple tracks (`grid-column: span 2`), and build zero-media-query responsive card grids with `repeat(auto-fit, minmax(220px, 1fr))`.\n\nThe `fr` (fraction) unit distributes remaining space cleanly after fixed columns and `gap` are subtracted—solving the math `width: 33.3%` bugs forever! Furthermore, `grid-template-rows: subgrid;` lets nested cards align their internal titles and footers across sibling columns.',
      asciiFlowchart: `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;
   Col 1 (1fr)        Col 2 (1fr)        Col 3 (1fr)
  +--------------+   +--------------+   +--------------+
  | Track Card 1 |   | Track Card 2 |   | Track Card 3 |
  +--------------+   +--------------+   +--------------+`,
      pseudocode: [
        '1. DEFINE 2D layout tracks with display: grid and grid-template-columns / rows',
        '2. USE repeat(auto-fit, minmax(200px, 1fr)) for responsive fluid columns',
        '3. MAP page shells cleanly via named grid-template-areas',
        '4. SPAN featured tiles cleanly using grid-column: span 2 or grid-row: span 2',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দাবা বোর্ডের ছক ও অটো-ফিট গ্রিড',
        explanation:
          'ফ্লেক্সবক্স ছিল একটি সরলরেখা (১ডি), আর **CSS Grid** হলো ঠিক একটি ২-মাত্রিক দাবার বোর্ড বা এক্সেল শিট—যেখানে একই সাথে সারি (Row) এবং কলাম (Column) দুটি দিকই প্যারেন্ট থেকে নিয়ন্ত্রণ করা যায়! তুমি যদি `width: 33.33%` আর `margin` দিয়ে ৩ কলাম বানাতে যাও, তাহলে গ্যাপ যোগ হয়ে তৃতীয় কলাম নিচে ভেঙে পড়ে। কিন্তু CSS Grid-এর বিশেষ একক **`fr` (Fraction)** আগে `gap` ও ফিক্সড কলাম বাদ দিয়ে বাকি ফাঁকা জায়গা সমানভাবে ভাগ করে নেয়! এর সবচেয়ে শক্তিশালী সূত্র হলো `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`—যা কোনো মিডিয়া কুয়েরি ছাড়াই মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম এবং ল্যাপটপে ৩–৪ কলামে স্বয়ংক্রিয়ভাবে সেজে যায়! সম্পূর্ণ পেজ লেআউট (Header, Sidebar, Main, Footer) বানাতে চাইলে `grid-template-areas` দিয়ে ASCII আর্টের মতো ছক এঁকে দিলেই পুরো পেজের কাঠামো দাঁড়িয়ে যায়। আর কোনো কার্ডের ভেতরে `subgrid` দিলে পাশাপাশি সব কার্ডের শিরোনাম আর ফুটার একই সারিতে মিলে থাকে। তবে মনে রাখবে `minmax(200px, 1fr)` কখনো `200px`-এর ছোট স্ক্রিনে ওভারফ্লো করতে পারে—তাই নিরাপদ সূত্র হলো `minmax(min(200px, 100%), 1fr)`।',
        everydayExample:
          'মৌচাক বা শহরের বর্গাকার ব্লকগুলোর মতো প্রতিটি ঘরের মাপ ও রাস্তা (`gap`) আগে থেকেই ছক করা থাকে, ফলে কার্ড কম-বেশি হলেও সারি-কলাম নড়ে না।',
        keyTakeaways: [
          '`1fr` মানে বাকি থাকা ফাঁকা জায়গার ভাগ—এটি `gap` হিসাব করেই কলাম বানায়, তাই ৩৩% ওভারফ্লো বাগ হয় না।',
          '`repeat(auto-fit, minmax(min(220px, 100%), 1fr))` ছোট স্ক্রিনেও ওভারফ্লো-মুক্ত রেসপন্সিভ গ্রিড দেয়।',
          '`grid-template-areas` দিয়ে অক্ষরের ছকে পুরো ওয়েবসাইটের ড্যাশবোর্ড লেআউট কয়েক লাইনেই লেখা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Responsive Grid via repeat(auto-fit, minmax(...))',
        englishParagraphs: [
          '`repeat(auto-fit, minmax(min(180px, 100%), 1fr))` fits as many `>=180px` tracks as the container allows while expanding them equally to fill `100%`.',
          'Adding `min(180px, 100%)` prevents horizontal scrollbars even on narrow viewports.',
        ],
        banglaParagraphs: [
          '`repeat(auto-fit, minmax(min(180px, 100%), 1fr))` স্ক্রিনের জায়গা অনুযায়ী কলাম বাড়ায়-কমায় এবং ফাঁকা জায়গা সমানভাবে ভরে দেয়।',
          'খুব ছোট স্ক্রিনেও সাইড-স্ক্রলবার আসে না।',
        ],
        memoryDiagram: `auto-fit tracks >=180px -> grow evenly with 1fr`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 12px; }
    .box { padding: 16px; background: #ecfdf5; border: 1px solid #059669; border-radius: 8px; font-weight: 700; }
  </style>
</head>
<body>
  <h1>CSS Grid Auto-Fit Matrix</h1>
  <section class="grid">
    <div class="box">Module 01</div>
    <div class="box">Module 02</div>
    <div class="box">Module 03</div>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'CSS Grid Auto-Fit Matrix',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));', whatItMeans: 'Automatically computes column count dynamically from viewport width.', whyItIsThere: 'Media-query-free responsive card grid.', ifDeletedError: 'Grid collapses into single vertical column.' },
        ],
      },
      {
        id: 'html-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Named Page Shell via grid-template-areas',
        englishParagraphs: [
          '`grid-template-areas` draws the 2D layout visually right inside CSS (`"head head"`, `"side main"`).',
          'Assigning `grid-area: side;` places each semantic tag cleanly into its named slot.',
        ],
        banglaParagraphs: [
          '`grid-template-areas` ব্যবহার করে সরাসরি CSS-এর ভেতরেই হেডার, সাইডবার ও মেইন কনটেন্টের ২ডি মানচিত্র এঁকে দেওয়া যায়।',
          'এতে HTML-এর ভেতর অতিরিক্ত wrapper div লাগে না।',
        ],
        memoryDiagram: `"head head" / "side main" (220px | 1fr)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .shell { display: grid; grid-template-columns: 180px 1fr; grid-template-areas: "head head" "side main"; gap: 10px; font-family: system-ui, sans-serif; }
    header { grid-area: head; background: #0f172a; color: #fff; padding: 12px; border-radius: 8px; }
    aside { grid-area: side; background: #f1f5f9; padding: 12px; border-radius: 8px; }
    main { grid-area: main; background: #ecfdf5; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="shell">
    <header><h1>Grid Areas Dashboard</h1></header>
    <aside>Sidebar Nav</aside>
    <main>Primary Workspace</main>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Grid Areas Dashboard',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'grid-template-areas: "head head" "side main";', whatItMeans: 'Defines 2x2 visual region map.', whyItIsThere: 'Makes dashboard layout self-documenting and easy to rearrange.', ifDeletedError: 'Named grid-area placements fall back to auto-flow.' },
        ],
      },
      {
        id: 'html-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Bento Spotlight Dashboard With grid-column: span 2 & Subgrid',
        englishParagraphs: [
          'Combining `grid-column: span 2` for a featured card with `grid-auto-flow: dense` packs mixed-size tiles neatly without holes.',
          '`place-items: center` centers single elements cleanly in one shorthand property.',
        ],
        banglaParagraphs: [
          'বিশেষ কার্ডকে `grid-column: span 2` দিলে সেটি দুই কলাম জুড়ে বসে বেন্টো-বক্স ড্যাশবোর্ড বানায়।',
          '`grid-auto-flow: dense` মাঝের খালি জায়গাগুলো স্বয়ংক্রিয়ভাবে ভরাট করে দেয়।',
        ],
        memoryDiagram: `Featured -> grid-column: span 2 | standard cards -> 1 track each`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .bento { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-flow: dense; gap: 10px; font-family: system-ui, sans-serif; }
    .tile { padding: 14px; border-radius: 8px; background: #1e293b; color: #f8fafc; }
    .wide { grid-column: span 2; background: #059669; }
  </style>
</head>
<body>
  <h1>Bento Grid Layout</h1>
  <section class="bento">
    <article class="tile wide">Featured Arena (2 Cols)</article>
    <article class="tile">XP Streak</article>
    <article class="tile">Drills</article>
    <article class="tile">Badges</article>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Bento Grid Layout',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: '.wide { grid-column: span 2; ... }', whatItMeans: 'Expands card across two adjacent grid column tracks.', whyItIsThere: 'Builds visual hierarchy in bento grids.', ifDeletedError: 'Featured tile shrinks to single column.' },
        ],
      },
      {
        id: 'html-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Percentage Width + Gap Overflow & Track Blowout vs minmax(0, 1fr)',
        englishParagraphs: [
          'By default, `1fr` behaves like `minmax(auto, 1fr)`, so giant `<pre>` blocks can force a grid column wider than intended!',
          'Using `minmax(0, 1fr)` (and avoiding `33.3% + gap`) guarantees tracks never exceed their allotted viewport fraction.',
        ],
        banglaParagraphs: [
          'ডিফল্ট `1fr` আসলে `minmax(auto, 1fr)`, তাই লম্বা `<pre>` কোড কলামের মাপ ভেঙে বাইরে চলে যেতে পারে!',
          'সুরক্ষিত থাকতে `minmax(0, 1fr)` ব্যবহার করা উচিত এবং কলাম মাপতে `%` না দিয়ে `1fr` দেবে।',
        ],
        memoryDiagram: `TRAP: 1fr blows out on <pre> | FIX: grid-template-columns: minmax(0, 1fr) 220px;`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    .split { display: grid; grid-template-columns: minmax(0, 1fr) 160px; gap: 12px; font-family: system-ui, sans-serif; }
    pre { overflow-x: auto; background: #0f172a; color: #34d399; padding: 10px; border-radius: 6px; margin: 0; }
    aside { background: #ecfdf5; padding: 10px; border-radius: 6px; }
  </style>
</head>
<body>
  <h1>Grid Track Overflow Guard</h1>
  <div class="split"><pre>const veryLongCodeLineThatScrollsCleanlyWithoutBreakingTrack = 42;</pre><aside>Inspector</aside></div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Grid Track Overflow Guard',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'grid-template-columns: minmax(0, 1fr) 160px;', whatItMeans: 'Lets first column shrink to 0 instead of minimum content width.', whyItIsThere: 'Allows internal <pre> scrolling without blowing out 2D layout.', ifDeletedError: 'Long <pre> line breaks column alignment.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 7', codeSnippet: '.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 12px; }', whatItMeans: 'Creates responsive auto-fitting 2D grid tracks with 12px gutters.', whyItIsThere: 'Adapts cleanly from 1 to N columns without media queries.', ifDeletedError: 'Children stack vertically as plain blocks.' },
      { lineNumber: 'Line 8', codeSnippet: '.box { padding: 16px; background: #ecfdf5; border: 1px solid #059669; border-radius: 8px; font-weight: 700; }', whatItMeans: 'Visual card styling inside each auto-placed grid cell.', whyItIsThere: 'Shows grid track boundaries cleanly.', ifDeletedError: 'Cards appear unstyled.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Container width 620px', memoryOrStack: 'min track = 180px + 12px gap', note: 'Fits 3 tracks cleanly' },
      { step: 2, state: 'Distribute 1fr', memoryOrStack: '3 tracks grow evenly', note: 'Gap subtracted before fraction split' },
      { step: 3, state: 'Narrow phone 300px', memoryOrStack: 'min(180px, 100%) = 180px', note: 'Drops smoothly to 1 column' },
      { step: 4, state: 'Render 3 .box nodes', memoryOrStack: 'Zero horizontal scrollbars', note: 'Responsive 2D grid complete' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Combining grid-template-columns: 33.3% 33.3% 33.3% With gap', brokenCode: `grid-template-columns: 33.33% 33.33% 33.33%; gap: 16px; /* Total > 100%! */`, fixedCode: `grid-template-columns: repeat(3, 1fr); gap: 16px;`, whyItBreaks: 'Percentages ignore gap width, overflowing the grid container by 32px.' },
      { title: 'Trap 2: Raw 1fr Blowing Out on <pre> or Long Strings', brokenCode: `grid-template-columns: 1fr 240px;`, fixedCode: `grid-template-columns: minmax(0, 1fr) 240px;`, whyItBreaks: '1fr implies minimum size auto, letting wide unbreakable content push aside the sidebar.' },
      { title: 'Trap 3: Non-Rectangular Regions in grid-template-areas', brokenCode: `grid-template-areas: "a a" "a b"; /* L-shape INVALID! */`, fixedCode: `grid-template-areas: "a a" "c b";`, whyItBreaks: 'Every named grid area must form an unbroken rectangle or the browser ignores the whole rule.' },
    ],
    practiceSheet: [
      { id: 'html-ch12-p1', difficulty: 'Easy', title: '3-Column fr Grid', prompt: 'Create a 3-column grid using `repeat(3, 1fr)` and `gap: 12px`.', banglaHint: '`grid-template-columns: repeat(3, 1fr); gap: 12px;` লেখো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}.c{padding:12px;border:1px solid #059669;}</style></head><body><h1>3 Column Grid</h1><div class="g"><div class="c">1</div><div class="c">2</div><div class="c">3</div></div></body></html>`, sampleStdin: '', expectedOutput: '3 Column Grid' },
      { id: 'html-ch12-p2', difficulty: 'Easy', title: 'Responsive Auto-Fit Cards', prompt: 'Use `repeat(auto-fit, minmax(min(180px, 100%), 1fr))` on a card container.', banglaHint: '`auto-fit` ও `minmax` সূত্র ব্যবহার করো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(180px,100%),1fr));gap:12px;}.c{padding:12px;background:#ecfdf5;}</style></head><body><h1>AutoFit Grid</h1><div class="g"><div class="c">A</div><div class="c">B</div></div></body></html>`, sampleStdin: '', expectedOutput: 'AutoFit Grid' },
      { id: 'html-ch12-p3', difficulty: 'Medium', title: 'Named Areas App Shell', prompt: 'Place `<header>`, `<aside>`, and `<main>` using `grid-template-areas`.', banglaHint: '`"head head" "side main"` হিসেবে এরিয়া সাজাও।', starterCode: `<!doctype html><html><head><style>.app{display:grid;grid-template-columns:160px 1fr;grid-template-areas:"h h" "s m";gap:8px;}header{grid-area:h;}aside{grid-area:s;}main{grid-area:m;}</style></head><body><div class="app"><header><h1>Areas Shell</h1></header><aside>Nav</aside><main>Body</main></div></body></html>`, sampleStdin: '', expectedOutput: 'Areas Shell' },
      { id: 'html-ch12-p4', difficulty: 'Medium', title: 'Featured Tile Spanning 2 Columns', prompt: 'Make the first bento card span 2 columns via `grid-column: span 2`.', banglaHint: 'প্রথম কার্ডে `grid-column: span 2;` যোগ করো।', starterCode: `<!doctype html><html><head><style>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}.w{grid-column:span 2;background:#ecfdf5;}</style></head><body><h1>Bento Span</h1><div class="g"><div class="w">Hero Span 2</div><div>Side</div></div></body></html>`, sampleStdin: '', expectedOutput: 'Bento Span' },
      { id: 'html-ch12-p5', difficulty: 'Hard', title: 'Overflow-Safe Code Editor Split', prompt: 'Prevent a long `<pre>` block from stretching a sidebar grid using `minmax(0, 1fr)`.', banglaHint: '`minmax(0, 1fr)` দিয়ে মূল কলামটি আটকে দাও।', starterCode: `<!doctype html><html><head><style>.ide{display:grid;grid-template-columns:minmax(0,1fr) 140px;gap:10px;}pre{overflow-x:auto;margin:0;}</style></head><body><h1>Safe IDE Grid</h1><div class="ide"><pre>long_code_without_breaking_sidebar</pre><aside>Tests</aside></div></body></html>`, sampleStdin: '', expectedOutput: 'Safe IDE Grid' },
    ],
    miniBuild: {
      title: 'Mini-Build: Bento Dashboard Shell With Grid Areas & minmax',
      description: 'Combine grid-template-areas for overall shell and minmax(0, 1fr) responsive inner cards cleanly.',
      banglaGoal: '`grid-template-areas` ও `auto-fit minmax` দিয়ে একটি আধুনিক ড্যাশবোর্ড লেআউট তৈরি করো।',
      combinesChapters: 'HTML Ch 1–12',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .shell { display: grid; grid-template-columns: 160px minmax(0, 1fr); grid-template-areas: "head head" "side main"; gap: 12px; }
    header { grid-area: head; padding: 12px; background: #0f172a; color: #fff; border-radius: 8px; }
    aside { grid-area: side; padding: 12px; background: #f1f5f9; border-radius: 8px; }
    main { grid-area: main; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr)); gap: 10px; }
    .stat { padding: 12px; background: #ecfdf5; border: 1px solid #059669; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="shell">
    <header><h1>CSS Grid Studio</h1></header>
    <aside>Sidebar Modules</aside>
    <main><div class="stat">Track A</div><div class="stat">Track B</div></main>
  </div>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'CSS Grid Studio',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: system-ui, sans-serif; margin: 16px; }
    .shell { display: grid; grid-template-columns: 160px minmax(0, 1fr); grid-template-areas: "head head" "side main"; gap: 12px; }
    header { grid-area: head; padding: 12px; background: #0f172a; color: #fff; border-radius: 8px; }
    aside { grid-area: side; padding: 12px; background: #f1f5f9; border-radius: 8px; }
    main { grid-area: main; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr)); gap: 10px; }
    .stat { padding: 12px; background: #ecfdf5; border: 1px solid #059669; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="shell">
    <header><h1>CSS Grid Studio</h1></header>
    <aside>Sidebar Modules</aside>
    <main><div class="stat">Track A</div><div class="stat">Track B</div></main>
  </div>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'CSS Grid Studio',
    testCases: [
      { id: 'html12-t1', input: '', expectedOutput: 'CSS Grid Studio' },
      { id: 'html12-t2', input: '', expectedOutput: 'Sidebar Modules', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'CSS Positioning, Sticky Bars & Z-Index Stacking',
    banglaTitle: 'CSS পজিশনিং, স্টিকি নেভবার ও Z-Index লেয়ারিং',
    subtitle: 'relative anchors, absolute badges, sticky headers, fixed overlays, and stacking contexts',
    zeroIntuition: {
      plainEnglishStory:
        'Normally every HTML box sits inside normal document flow stacked block-by-block. Changing `position` lets specific UI elements step out of flow: `position: relative` keeps its original slot while becoming a coordinate anchor, and `position: absolute` positions an inner badge relative to its nearest positioned ancestor rather than the whole viewport.\n\nMeanwhile `position: sticky` behaves like normal flow until scroll hits a threshold like `top: 0`, whereas `z-index` controls front-to-back layering strictly within the same stacking context (watch out for `overflow: hidden` or `transform` creating traps!).',
      asciiFlowchart:
        'position: relative (Card Anchor)\n  +-- position: absolute (top: 8px; right: 8px) -> Badge\nposition: sticky (top: 0; z-index: 20) -> Pinned Header',
      pseudocode: [".card { position: relative; }",".badge { position: absolute; top: 8px; right: 8px; }",".topbar { position: sticky; top: 0; z-index: 10; }"],
      banglaZeroToHero: {
        analogyTitle: 'নোটিশ বোর্ডে পিন লাগানো কার্ড ও পর্দার স্তর',
        explanation:
          'ওয়েবপেজের প্রতিটি এলিমেন্ট সাধারণত ওপর থেকে নিচে একটার পর একটা সাজানো থাকে, যাকে নরমাল ডকুমেন্ট ফ্লো বলে। কিন্তু কোনো কার্ডের কোণায় একটি ডিসকাউন্ট ব্যাজ বসাতে বা স্ক্রল করলেও হেডার ওপরে আটকে রাখতে `position` প্রোপার্টি দরকার হয়। কোনো প্যারেন্ট বক্সে `position: relative` দিলে সেটি নিজের জায়গা ঠিক রেখে ভেতরের চাইল্ডগুলোর জন্য মূল বিন্দু বা অ্যাঙ্কর হয়ে যায়। এরপর ভেতরের ব্যাজে `position: absolute; top: 8px; right: 8px;` দিলে ব্যাজটি পুরো স্ক্রিনের কোণায় না গিয়ে ঠিক ওই কার্ডের কোণায় বসে। `position: sticky` স্ক্রল শুরু হওয়ার আগ পর্যন্ত সাধারণভাবে থাকে এবং `top: 0` স্পর্শ করলেই স্ক্রিনের ওপরে আটকে যায়—নেভবার বা টেবিল হেডারে এটি দারুণ কাজ করে। প্যারেন্টে `overflow: hidden` থাকলে অনেক সময় স্টিকি কাজ করা বন্ধ করে দেয়, তাই `overflow: clip` ব্যবহার করা নিরাপদ। কোন উপাদান কার ওপরে থাকবে তা ঠিক করে `z-index`, তবে এটি কেবল তখনই কাজ করে যখন দুটি এলিমেন্ট একই স্ট্যাকিং কনটেক্সটে থাকে। আজকের অধ্যায়ে তুমি রিলেটিভ-অ্যাবসলিউট পেয়ারিং, স্টিকি হেডার এবং লেয়ার অর্ডারিং একদম পরিষ্কারভাবে শিখবে।',
        everydayExample: 'একটি দেয়াল বোর্ডের কার্ডের কোণায় ছোট স্টিকার পিন করা (`relative` কার্ড + `absolute` স্টিকার) আর বইয়ের ওপরের মলাটে সূচিপত্র স্থির রাখা।',
        keyTakeaways: [
          'অবশ্যই প্যারেন্টে `position: relative` রাখো, নাহলে `absolute` চাইল্ড পুরো পেজের কোণায় চলে যাবে।',
          '`position: sticky` কাজ করতে হলে অন্তত একটি দিক (`top: 0`) ও স্ক্রলযোগ্য প্যারেন্ট থাকতে হবে।',
          '`z-index` কেবল non-static (`relative`, `absolute`, `sticky`, `fixed`) বা flex/grid আইটেমেই কাজ করে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch13-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Relative Card Anchor with Absolute Corner Badge',
        englishParagraphs: [
          'Pairing `.card { position: relative }` with `.badge { position: absolute; top: 10px; right: 10px }` pins a status pill directly inside the card corner.',
        ],
        banglaParagraphs: [
          'কার্ডে `position: relative` এবং ব্যাজে `position: absolute` দিলে ব্যাজটি কার্ডের ভেতরের নির্দিষ্ট কোণায় নিখুঁতভাবে বসে।',
        ],
        memoryDiagram: '.card (relative) contains .badge (absolute top:10px right:10px)',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #0f172a; color: #f8fafc; }\n  .card { position: relative; max-width: 320px; padding: 20px; background: #1e293b; border-radius: 12px; }\n  .badge { position: absolute; top: 10px; right: 10px; background: #10b981; color: #052e16; font-weight: 700; padding: 2px 8px; border-radius: 6px; }\n</style>\n</head>\n<body>\n  <article class="card">\n    <span class="badge">LIVE</span>\n    <h1>Positioned Card</h1>\n    <p>Badge stays anchored to this card box.</p>\n  </article>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Positioned Card',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .card { position: relative; max-width: 320px; padding: 20px; background: #1e293b; border-radius: 12px; }","whatItMeans":"Establishes containing block for positioned descendants.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`.badge` jumps to the viewport top-right corner instead of the card."},
          {"lineNumber":"Line 7","codeSnippet":"  .badge { position: absolute; top: 10px; right: 10px; background: #10b981; color: #052e16; font-weight: 700; padding: 2px 8px; border-radius: 6px; }","whatItMeans":"Pins badge 10px from top and right edges of `.card`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Badge sits inline inside normal text flow."},
        ],
      },
      {
        id: 'html-ch13-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Sticky Section Header Inside Scroll Container',
        englishParagraphs: [
          'Combine `position: sticky; top: 0` on section titles so headings remain legible while scrolling long lists.',
        ],
        banglaParagraphs: [
          'লম্বা তালিকায় স্ক্রল করার সময় শিরোনাম ওপরে আটকে রাখতে `position: sticky; top: 0` ব্যবহার করো।',
        ],
        memoryDiagram: 'header { position: sticky; top: 0; z-index: 10; }',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { margin: 0; font-family: system-ui; background: #111827; color: #f9fafb; }\n  header { position: sticky; top: 0; z-index: 10; padding: 12px 20px; background: #064e3b; }\n  main { padding: 16px 20px; height: 220px; }\n</style>\n</head>\n<body>\n  <header><h1>Sticky Command Bar</h1></header>\n  <main><p>Content scrolls smoothly underneath the pinned bar.</p></main>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Sticky Command Bar',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  header { position: sticky; top: 0; z-index: 10; padding: 12px 20px; background: #064e3b; }","whatItMeans":"Locks header to top edge while scrolling and layers it above content.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Header scrolls off-screen immediately."},
        ],
      },
      {
        id: 'html-ch13-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Layered Z-Index Notification Stack',
        englishParagraphs: [
          'Use explicit `z-index` values plus subtle offsets to layer toast cards cleanly front-to-back without z-fighting.',
        ],
        banglaParagraphs: [
          '`z-index` ব্যবহার করে নোটিফিকেশন কার্ডগুলোকে একটার ওপরে আরেকটা পরিষ্কার স্তরে সাজাও।',
        ],
        memoryDiagram: 'layer-front (z:30) > layer-mid (z:20) > layer-back (z:10)',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  .stack { position: relative; height: 140px; font-family: system-ui; }\n  .toast { position: absolute; width: 220px; padding: 12px; border-radius: 10px; color: #fff; }\n  .back { top: 0; left: 0; background: #334155; z-index: 10; }\n  .front { top: 24px; left: 24px; background: #059669; z-index: 20; }\n</style>\n</head>\n<body>\n  <h1>Notification Layers</h1>\n  <div class="stack">\n    <div class="toast back">Queued Build</div>\n    <div class="toast front">Deploy Ready</div>\n  </div>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Notification Layers',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  .back { top: 0; left: 0; background: #334155; z-index: 10; }","whatItMeans":"Places background toast in lower stacking layer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Back toast overlaps unpredictably."},
          {"lineNumber":"Line 8","codeSnippet":"  .front { top: 24px; left: 24px; background: #059669; z-index: 20; }","whatItMeans":"Higher `z-index: 20` lifts active toast above `.back`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Active card loses foreground priority."},
        ],
      },
      {
        id: 'html-ch13-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Overflow Clip Instead of Overflow Hidden for Sticky',
        englishParagraphs: [
          'Setting `overflow: hidden` on an ancestor kills `position: sticky` silently. Using `overflow-x: clip` clips wide decorations while preserving sticky behavior.',
        ],
        banglaParagraphs: [
          'প্যারেন্টে `overflow: hidden` দিলে স্টিকি হেডার ভেঙে যায়; এর বদলে `overflow-x: clip` দিলে ডিজাইন ও স্টিকি দুটিই ঠিক থাকে।',
        ],
        memoryDiagram: 'wrapper { overflow-x: clip; } preserves sticky child',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  .wrapper { overflow-x: clip; font-family: system-ui; padding: 16px; background: #0f172a; color: #e2e8f0; }\n  .sticky-nav { position: sticky; top: 0; background: #0d9488; padding: 10px; border-radius: 8px; }\n</style>\n</head>\n<body>\n  <section class="wrapper">\n    <nav class="sticky-nav"><h1>Clip-Safe Sticky Nav</h1></nav>\n    <p>Works cleanly without breaking sticky positioning.</p>\n  </section>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Clip-Safe Sticky Nav',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"  .wrapper { overflow-x: clip; font-family: system-ui; padding: 16px; background: #0f172a; color: #e2e8f0; }","whatItMeans":"Clips horizontal bleed without creating a scroll container that traps `sticky`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Wide child overflow causes horizontal page scroll."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"<!doctype html>","whatItMeans":"Standards mode ensures predictable box positioning.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Quirks mode box sizing breaks offsets."},
      {"lineNumber":"Line 6","codeSnippet":"  .card { position: relative; max-width: 320px; padding: 20px; background: #1e293b; border-radius: 12px; }","whatItMeans":"Turns `.card` into the coordinate parent for `.badge`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Badge escapes to page corner."},
      {"lineNumber":"Line 7","codeSnippet":"  .badge { position: absolute; top: 10px; right: 10px; background: #10b981; color: #052e16; font-weight: 700; padding: 2px 8px; border-radius: 6px; }","whatItMeans":"Pins badge relative to `.card`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Badge drops into text flow."},
      {"lineNumber":"Line 12","codeSnippet":"    <span class=\"badge\">LIVE</span>","whatItMeans":"Rendered badge element.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No status indicator visible."},
    ],
    dryRunTable: [
      { step: 1, state: '.card { position: relative }', memoryOrStack: 'Anchor Box (320px)', note: 'Stays in normal flow, sets coordinate origin' },
      { step: 2, state: '.badge { position: absolute }', memoryOrStack: 'Removed from flow', note: 'Text inside card does not wrap around badge' },
      { step: 3, state: 'top: 10px; right: 10px', memoryOrStack: 'Anchored to .card edge', note: 'Measured inward from .card padding box' },
      { step: 4, state: 'sticky top: 0', memoryOrStack: 'Pinned on scroll', note: 'Active unless blocked by overflow: hidden' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Forgetting `position: relative` on Parent of Absolute Badge',
        brokenCode: '<div class="card"><span style="position:absolute;top:0;right:0">NEW</span></div>',
        fixedCode: '<div class="card" style="position:relative"><span style="position:absolute;top:0;right:0">NEW</span></div>',
        whyItBreaks: 'Without a positioned ancestor, `absolute` attaches to `<html>` at the top-right of the entire screen.',
      },
      {
        title: 'Trap 2: Expecting `z-index` to Work on `position: static`',
        brokenCode: '.box { z-index: 999; }',
        fixedCode: '.box { position: relative; z-index: 999; }',
        whyItBreaks: 'Static elements ignore `z-index` completely.',
      },
      {
        title: 'Trap 3: Breaking `position: sticky` with `overflow: hidden`',
        brokenCode: 'body { overflow-x: hidden; }',
        fixedCode: 'body { overflow-x: clip; }',
        whyItBreaks: 'Setting `overflow: hidden` on an ancestor disables sticky pinning across browsers.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch13-p1',
        difficulty: 'Easy',
        title: 'Sale Corner Ribbon',
        prompt: 'Create a relative product card with an absolute `20% OFF` tag pinned to `top: 12px; left: 12px`.',
        banglaHint: 'প্যারেন্ট `.product`-এ `position: relative` এবং ট্যাগে `position: absolute` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.product{position:relative;padding:32px;background:#1e293b;color:#fff}.tag{position:absolute;top:12px;left:12px;background:#f59e0b;color:#000;padding:2px 6px}</style></head><body><div class="product"><span class="tag">20% OFF</span><h1>Corner Ribbon</h1></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Corner Ribbon',
      },
      {
        id: 'html-ch13-p2',
        difficulty: 'Easy',
        title: 'Sticky Table Column Header',
        prompt: 'Build a semantic `<table>` whose `<thead> th` elements have `position: sticky; top: 0`.',
        banglaHint: '`th { position: sticky; top: 0; background: #0f172a; }` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>th{position:sticky;top:0;background:#0f172a;color:#34d399;padding:8px}</style></head><body><h1>Sticky Table</h1><table><thead><tr><th>Track</th><th>Count</th></tr></thead><tbody><tr><td>Rust</td><td>25</td></tr></tbody></table></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Sticky Table',
      },
      {
        id: 'html-ch13-p3',
        difficulty: 'Medium',
        title: 'Avatar Online Dot Indicator',
        prompt: 'Render a circular avatar wrapper (`position: relative`) with a green online dot pinned to `bottom: 2px; right: 2px`.',
        banglaHint: '`border-radius: 50%` ও `bottom: 2px; right: 2px` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.avatar{position:relative;width:64px;height:64px;border-radius:50%;background:#334155}.dot{position:absolute;bottom:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#10b981;border:2px solid #0f172a}</style></head><body><h1>Avatar Status</h1><div class="avatar"><span class="dot"></span></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Avatar Status',
      },
      {
        id: 'html-ch13-p4',
        difficulty: 'Medium',
        title: 'Centered Fixed Modal Backdrop',
        prompt: 'Create a `position: fixed; inset: 0` overlay using Flexbox centering to display a dialog card.',
        banglaHint: '`inset: 0; display: flex; place-items: center; justify-content: center` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6)}.modal{background:#fff;color:#111;padding:24px;border-radius:12px}</style></head><body><div class="overlay"><div class="modal" role="dialog"><h1>Centered Modal</h1></div></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Centered Modal',
      },
      {
        id: 'html-ch13-p5',
        difficulty: 'Hard',
        title: 'Stacking Context Isolation Fix',
        prompt: 'Keep a dropdown menu visible above sibling cards by assigning explicit `z-index` on the active parent wrapper.',
        banglaHint: 'অ্যাকটিভ কার্ডে উচ্চ `z-index` রাখলে এর ভেতরের অ্যাবসলিউট ড্রপডাউন নিচের কার্ডে ঢাকা পড়ে না।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.card{position:relative;padding:16px;background:#1e293b;color:#fff;margin:8px}.active{z-index:20}.menu{position:absolute;top:100%;left:0;background:#10b981;color:#052e16;padding:8px}</style></head><body><h1>Stacking Context</h1><div class="card active">Top Card<div class="menu">Action Menu</div></div><div class="card">Lower Card</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Stacking Context',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Product Card Grid with Pinned Badges & Sticky Topbar',
      description: 'Combine sticky navigation, relative card containers, and absolute corner badges inside a clean product showcase.',
      banglaGoal: 'স্টিকি টপবার ও ব্যাজযুক্ত রিলেটিভ কার্ড মিলিয়ে একটি সম্পূর্ণ প্রোডাক্ট শোকেস তৈরি করো।',
      combinesChapters: "Ch 12, 13",
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;font-family:system-ui;background:#090d16;color:#f8fafc}.bar{position:sticky;top:0;z-index:20;padding:12px 20px;background:#065f46}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:20px}.card{position:relative;padding:20px;background:#1e293b;border-radius:12px}.pill{position:absolute;top:10px;right:10px;background:#34d399;color:#022c22;padding:2px 8px;border-radius:6px;font-weight:700}</style></head><body><header class="bar"><h1>Positioning Storefront</h1></header><main class="grid"><article class="card"><span class="pill">PRO</span><h2>Motion Kit</h2></article><article class="card"><span class="pill">NEW</span><h2>Grid Pack</h2></article></main></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Positioning Storefront',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;font-family:system-ui;background:#090d16;color:#f8fafc}.bar{position:sticky;top:0;z-index:20;padding:12px 20px;background:#065f46}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:20px}.card{position:relative;padding:20px;background:#1e293b;border-radius:12px}.pill{position:absolute;top:10px;right:10px;background:#34d399;color:#022c22;padding:2px 8px;border-radius:6px;font-weight:700}</style></head><body><header class="bar"><h1>Positioning Storefront</h1></header><main class="grid"><article class="card"><span class="pill">PRO</span><h2>Motion Kit</h2></article><article class="card"><span class="pill">NEW</span><h2>Grid Pack</h2></article></main></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Positioning Storefront',
    testCases: [
      { id: 'html13-t1', input: '', expectedOutput: 'Positioning Storefront' },
      { id: 'html13-t2', input: '', expectedOutput: 'Motion Kit', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'Responsive Images, Picture Art Direction & SVG',
    banglaTitle: 'রেসপন্সিভ ইমেজ, Picture ও ভেক্টর SVG',
    subtitle: 'max-width: 100%, aspect-ratio CLS prevention, srcset/sizes, and crisp inline SVG',
    zeroIntuition: {
      plainEnglishStory:
        'Unconstrained images overflow mobile screens or jump vertically while downloading, hurting Cumulative Layout Shift (CLS). Setting `img { max-width: 100%; height: auto; display: block; }` together with explicit `width`/`height` or `aspect-ratio` reserves exact space before pixels arrive.\n\nFor bandwidth optimization, `srcset` and `sizes` let the browser pick a smaller image on phones and a sharp one on Retina laptops, `<picture>` swaps completely different crops via `<source media="...">`, and inline `<svg viewBox="...">` renders crisp icons at any zoom.',
      asciiFlowchart:
        '<picture>\n  <source media="(min-width: 800px)" srcset="wide.webp">\n  <img src="mobile.webp" alt="..." style="max-width:100%; aspect-ratio:16/9">\n</picture>',
      pseudocode: ["img { max-width: 100%; height: auto; object-fit: cover; }","figure > img + figcaption (semantic media caption)"],
      banglaZeroToHero: {
        analogyTitle: 'স্ক্রিন অনুযায়ী ফ্রেমে মানিয়ে নেওয়া স্মার্ট ছবির অ্যালবাম',
        explanation:
          'একটি বিশাল ১৬০০ পিক্সেলের ছবি যদি ৩৭৫ পিক্সেলের মোবাইলে বসানো হয়, তাহলে সেটি স্ক্রিন ভেঙে ডানে বেরিয়ে যাবে এবং পেজ লোড হওয়ার সময় টেক্সট নিচে লাফিয়ে পড়বে। এই সমস্যার প্রথম সমাধান হলো `max-width: 100%; height: auto;` এবং সাথে `aspect-ratio` বা `width`/`height` অ্যাট্রিবিউট দেওয়া, যাতে ছবি লোড হওয়ার আগেই ব্রাউজার জায়গা মেপে রাখতে পারে। কার্ডের ভেতর যেকোনো সাইজের ছবিকে না চ্যাপ্টা করে সুন্দরভাবে ভরাট করতে `object-fit: cover` জাদুর মতো কাজ করে। মোবাইল ও ডেস্কটপের ব্যান্ডউইথ বাঁচাতে `<img>`-এ `srcset` ও `sizes` দিলে ব্রাউজার নিজেই ডিভাইস অনুযায়ী উপযুক্ত ছবিটি ডাউনলোড করে। স্ক্রিনের আকার বদলালে ছবির ক্রপ বদলাতে চাইলে `<picture>` ট্যাগের ভেতরে একাধিক `<source media="...">` ব্যবহার করা হয়। লোগো ও আইকনের মতো গ্রাফিক্সে পিক্সেল ফাটা এড়াতে `viewBox` সহ ইনলাইন `<svg>` ব্যবহার করলে যেকোনো জুম লেভেলেও ছবি ঝকঝকে থাকে। প্রতিটি অর্থবহ ছবির জন্য অবশ্যই পরিষ্কার `alt` টেক্সট এবং প্রয়োজনে `<figure>` ও `<figcaption>` ব্যবহার করতে হবে। আজকের অধ্যায়ে রেসপন্সিভ মিডিয়া, CLS প্রতিরোধ এবং ভেক্টর আইকনের পূর্ণ কৌশল শেখা হবে।',
        everydayExample: 'বইয়ের ছাপার জন্য বড় পোস্টার এবং মোবাইল পড়ার জন্য ছোট কার্ড সাইজের ছবি আলাদাভাবে তৈরি রাখা, যাতে কোনোটিই ঝাপসা বা ভারী না হয়।',
        keyTakeaways: [
          'সব সময় `max-width: 100%; height: auto; display: block;` ব্যবহার করে ইমেজের ওভারফ্লো এবং নিচের বাড়তি গ্যাপ বন্ধ করো।',
          'কার্ড থাম্বনেইলে ছবি বিকৃত হওয়া ঠেকাতে `aspect-ratio: 16 / 9` ও `object-fit: cover` ব্যবহার করো।',
          'ইনলাইন `<svg>`-এ সর্বদা `viewBox` এবং স্ক্রিন রিডারের জন্য `aria-hidden="true"` বা `role="img"` যোগ করো।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch14-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'CLS-Free Aspect Ratio Figure & Inline SVG Graphic',
        englishParagraphs: [
          'Wrapping an inline SVG inside `<figure>` with `aspect-ratio: 16 / 9` demonstrates responsive scaling with zero layout shift.',
        ],
        banglaParagraphs: [
          '`<figure>` ও `aspect-ratio` সহ ইনলাইন SVG গ্রাফিক্স কীভাবে যেকোনো স্ক্রিনে সমানুপাতিক থাকে তা দেখো।',
        ],
        memoryDiagram: 'figure > svg[viewBox="0 0 320 180"] + figcaption',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #0f172a; color: #f8fafc; }\n  figure { max-width: 400px; margin: 0; }\n  svg { width: 100%; height: auto; aspect-ratio: 16 / 9; display: block; border-radius: 12px; background: #1e293b; }\n  figcaption { margin-top: 8px; color: #94a3b8; font-size: 0.9rem; }\n</style>\n</head>\n<body>\n  <h1>Responsive Vector Media</h1>\n  <figure>\n    <svg viewBox="0 0 320 180" role="img" aria-label="Emerald gradient wave">\n      <circle cx="160" cy="90" r="56" fill="#10b981" />\n    </svg>\n    <figcaption>Crisp scaling via viewBox and aspect-ratio.</figcaption>\n  </figure>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Responsive Vector Media',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  svg { width: 100%; height: auto; aspect-ratio: 16 / 9; display: block; border-radius: 12px; background: #1e293b; }","whatItMeans":"Scales vector smoothly across widths while locking 16:9 box height.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Graphic loses responsive ratio and rounded frame."},
          {"lineNumber":"Line 14","codeSnippet":"    <svg viewBox=\"0 0 320 180\" role=\"img\" aria-label=\"Emerald gradient wave\">","whatItMeans":"Defines coordinate system and accessible label for screen readers.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Vector fails to scale proportionally inside container."},
        ],
      },
      {
        id: 'html-ch14-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Art-Directed Picture with Srcset Descriptors',
        englishParagraphs: [
          'The `<picture>` element pairs `<source>` media breakpoints with a mandatory fallback `<img>` carrying `alt`, `width`, `height`, and `loading="lazy"`.',
        ],
        banglaParagraphs: [
          '`<picture>` ট্যাগে `<source media="...">` ও ফলব্যাক `<img>`-এর সঠিক গঠন দেখো।',
        ],
        memoryDiagram: '<picture> -> <source media="(min-width: 768px)"> -> <img alt="...">',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  img { max-width: 100%; height: auto; display: block; border-radius: 10px; }\n</style>\n</head>\n<body>\n  <h1>Adaptive Picture Showcase</h1>\n  <picture>\n    <source media="(min-width: 768px)" srcset="https://via.placeholder.com/800x400" />\n    <img src="https://via.placeholder.com/400x300" alt="Responsive hero artwork" width="400" height="300" loading="lazy" />\n  </picture>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Adaptive Picture Showcase',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"    <source media=\"(min-width: 768px)\" srcset=\"https://via.placeholder.com/800x400\" />","whatItMeans":"Serves widescreen asset on tablet/desktop viewports.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"All screen sizes download only the fallback image."},
          {"lineNumber":"Line 12","codeSnippet":"    <img src=\"https://via.placeholder.com/400x300\" alt=\"Responsive hero artwork\" width=\"400\" height=\"300\" loading=\"lazy\" />","whatItMeans":"Provides fallback `src`, `alt` accessibility text, and intrinsic ratio.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`<picture>` renders nothing because `<img>` holds the box."},
        ],
      },
      {
        id: 'html-ch14-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Object-Fit Cover Thumbnail Gallery',
        englishParagraphs: [
          'Use `object-fit: cover` and `object-position: center` inside fixed-ratio frames so mixed-orientation thumbnails align in uniform rows.',
        ],
        banglaParagraphs: [
          'ভিন্ন ভিন্ন মাপের ছবিকে কার্ড গ্রিডে এক মাপের দেখাতে `aspect-ratio: 4 / 3` এবং `object-fit: cover` ব্যবহার করো।',
        ],
        memoryDiagram: '.thumb { aspect-ratio: 4/3; object-fit: cover; }',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-family: system-ui; }\n  .frame { aspect-ratio: 4 / 3; overflow: hidden; border-radius: 10px; background: #1e293b; }\n  .frame svg { width: 100%; height: 100%; object-fit: cover; display: block; }\n</style>\n</head>\n<body>\n  <h1>Uniform Thumbnail Grid</h1>\n  <div class="gallery">\n    <div class="frame"><svg viewBox="0 0 100 75"><rect width="100" height="75" fill="#0d9488"/></svg></div>\n    <div class="frame"><svg viewBox="0 0 100 75"><rect width="100" height="75" fill="#7c3aed"/></svg></div>\n  </div>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Uniform Thumbnail Grid',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .frame { aspect-ratio: 4 / 3; overflow: hidden; border-radius: 10px; background: #1e293b; }","whatItMeans":"Enforces identical 4:3 thumbnail containers.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cards vary in height when media ratios differ."},
          {"lineNumber":"Line 7","codeSnippet":"  .frame svg { width: 100%; height: 100%; object-fit: cover; display: block; }","whatItMeans":"Crops excess cleanly without stretching artwork.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Artwork distorts or leaves blank padding."},
        ],
      },
      {
        id: 'html-ch14-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Preventing Squished Photos & Baseline Gaps',
        englishParagraphs: [
          'Images default to `display: inline`, leaving a mysterious 4px descender gap below them, and fixed heights without `object-fit: cover` squish faces.',
        ],
        banglaParagraphs: [
          'ডিফল্ট `display: inline`-এর কারণে ছবির নিচে যে বাড়তি ফাঁকা জায়গা থাকে, `display: block` দিলে তা দূর হয়।',
        ],
        memoryDiagram: 'display: block removes inline baseline descender space',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  .box { display: inline-block; border: 3px solid #10b981; background: #0f172a; }\n  .box svg { display: block; width: 180px; height: auto; }\n</style>\n</head>\n<body>\n  <h1>Zero Baseline Gap</h1>\n  <div class="box"><svg viewBox="0 0 180 90"><rect width="180" height="90" fill="#1e293b"/></svg></div>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Zero Baseline Gap',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .box svg { display: block; width: 180px; height: auto; }","whatItMeans":"Removes 4px inline typography baseline gap underneath media.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Thin dark gap appears between graphic bottom and green border."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 6","codeSnippet":"  figure { max-width: 400px; margin: 0; }","whatItMeans":"Caps container width while stripping default browser margins.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Browser adds 40px horizontal margins around `<figure>`."},
      {"lineNumber":"Line 7","codeSnippet":"  svg { width: 100%; height: auto; aspect-ratio: 16 / 9; display: block; border-radius: 12px; background: #1e293b; }","whatItMeans":"Reserves 16:9 geometry responsively.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Aspect box collapses before content renders."},
      {"lineNumber":"Line 14","codeSnippet":"    <svg viewBox=\"0 0 320 180\" role=\"img\" aria-label=\"Emerald gradient wave\">","whatItMeans":"Makes inline vector scalable and accessible.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Screen readers skip image context."},
      {"lineNumber":"Line 17","codeSnippet":"    <figcaption>Crisp scaling via viewBox and aspect-ratio.</figcaption>","whatItMeans":"Links descriptive caption semantically to figure.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Caption becomes detached plain text."},
    ],
    dryRunTable: [
      { step: 1, state: 'figure max-width:400px', memoryOrStack: 'Width <= 400px', note: 'Shrinks smoothly on narrow mobile screens' },
      { step: 2, state: 'aspect-ratio: 16 / 9', memoryOrStack: 'Reserved height', note: 'Prevents CLS layout shift before paint' },
      { step: 3, state: 'viewBox="0 0 320 180"', memoryOrStack: 'Vector scale', note: 'Sharp rendering at 1x, 2x, 3x DPR' },
      { step: 4, state: 'display: block', memoryOrStack: 'No descender gap', note: 'Flush alignment inside bordered containers' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Setting Fixed Width & Height Without `object-fit: cover`',
        brokenCode: 'img { width: 200px; height: 200px; }',
        fixedCode: 'img { width: 200px; height: 200px; object-fit: cover; }',
        whyItBreaks: 'Non-square images look stretched and squished when both dimensions are forced.',
      },
      {
        title: 'Trap 2: Omitting `<img>` Inside `<picture>`',
        brokenCode: '<picture><source srcset="hero.webp"></picture>',
        fixedCode: '<picture><source srcset="hero.webp"><img src="hero.jpg" alt="Hero"></picture>',
        whyItBreaks: '`<source>` never renders on its own; `<img>` provides the actual rendered frame and fallback.',
      },
      {
        title: 'Trap 3: Missing `alt` Attribute on Content Images',
        brokenCode: '<img src="chart.png">',
        fixedCode: '<img src="chart.png" alt="Quarterly revenue growth chart">',
        whyItBreaks: 'Fails accessibility audits and leaves blind users or broken links with zero context.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch14-p1',
        difficulty: 'Easy',
        title: 'Accessible Figure Card',
        prompt: 'Build a semantic `<figure>` containing an inline SVG badge and a `<figcaption>` inside a styled card.',
        banglaHint: '`<figure>`-এর ভেতর `<svg viewBox="...">` এবং `<figcaption>` যোগ করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Figure Card</h1><figure><svg width="160" height="90" viewBox="0 0 160 90" role="img" aria-label="Badge"><rect width="160" height="90" rx="10" fill="#10b981"/></svg><figcaption>Emerald Surface</figcaption></figure></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Figure Card',
      },
      {
        id: 'html-ch14-p2',
        difficulty: 'Easy',
        title: 'Fluid SVG Icon Row',
        prompt: 'Create 3 crisp inline SVG icons aligned in a Flexbox row with `aria-hidden="true"` and button labels.',
        banglaHint: '`display: flex; gap: 12px` এবং `<svg aria-hidden="true">` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.row{display:flex;gap:12px}</style></head><body><h1>Vector Icons</h1><div class="row"><button><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#10b981"/></svg> Play</button></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Vector Icons',
      },
      {
        id: 'html-ch14-p3',
        difficulty: 'Medium',
        title: '16:9 Media Placeholder Skeleton',
        prompt: 'Design a responsive `.media-box` locked to `aspect-ratio: 16 / 9` with `max-width: 100%`.',
        banglaHint: '`aspect-ratio: 16 / 9; max-width: 560px; width: 100%` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.media-box{width:100%;max-width:560px;aspect-ratio:16/9;background:#1e293b;border-radius:12px;display:grid;place-items:center;color:#fff}</style></head><body><div class="media-box"><h1>16:9 Frame</h1></div></body></html>`,
        sampleStdin: '',
        expectedOutput: '16:9 Frame',
      },
      {
        id: 'html-ch14-p4',
        difficulty: 'Medium',
        title: 'Dark/Light Adaptive Picture',
        prompt: 'Write a `<picture>` block using `prefers-color-scheme: dark` on `<source>` plus a fallback `<img>`.',
        banglaHint: '`media="(prefers-color-scheme: dark)"` দিয়ে `<source>` লেখো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Theme Picture</h1><picture><source media="(prefers-color-scheme: dark)" srcset="dark.png"><img src="light.png" alt="Adaptive preview" width="320" height="180"></picture></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Theme Picture',
      },
      {
        id: 'html-ch14-p5',
        difficulty: 'Hard',
        title: 'Responsive Split Feature Banner',
        prompt: 'Combine CSS Grid and a responsive `viewBox` graphic inside a dark editorial hero banner.',
        banglaHint: 'ডান পাশে `svg` ও বাম পাশে টেক্সট রেখে `grid-template-columns: 1fr 1fr` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.hero{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;align-items:center;padding:24px;background:#090d16;color:#f8fafc}</style></head><body><section class="hero"><div><h1>Media Architecture</h1><p>Zero CLS responsive layout.</p></div><svg viewBox="0 0 240 135" role="img" aria-label="Hero diagram"><rect width="240" height="135" rx="12" fill="#065f46"/></svg></section></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Media Architecture',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Responsive Media Showcase Card',
      description: 'Assemble an accessible `<figure>` showcase with `aspect-ratio`, `viewBox` artwork, and semantic caption.',
      banglaGoal: 'রেসপন্সিভ অ্যাস্পেক্ট রেশিও এবং ক্যাপশনসহ একটি পরিচ্ছন্ন মিডিয়া কার্ড বানাও।',
      combinesChapters: "Ch 11, 14",
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.card{max-width:440px;padding:18px;border-radius:14px;background:#111827}svg{width:100%;height:auto;aspect-ratio:16/9;display:block;border-radius:10px;background:#064e3b}</style></head><body><article class="card"><h1>Responsive Media Studio</h1><figure style="margin:0"><svg viewBox="0 0 320 180" role="img" aria-label="Emerald waves"><circle cx="160" cy="90" r="48" fill="#10b981"/></svg><figcaption style="margin-top:8px;color:#94a3b8">Aspect-ratio locked graphic</figcaption></figure></article></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Responsive Media Studio',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.card{max-width:440px;padding:18px;border-radius:14px;background:#111827}svg{width:100%;height:auto;aspect-ratio:16/9;display:block;border-radius:10px;background:#064e3b}</style></head><body><article class="card"><h1>Responsive Media Studio</h1><figure style="margin:0"><svg viewBox="0 0 320 180" role="img" aria-label="Emerald waves"><circle cx="160" cy="90" r="48" fill="#10b981"/></svg><figcaption style="margin-top:8px;color:#94a3b8">Aspect-ratio locked graphic</figcaption></figure></article></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Responsive Media Studio',
    testCases: [
      { id: 'html14-t1', input: '', expectedOutput: 'Responsive Media Studio' },
      { id: 'html14-t2', input: '', expectedOutput: 'Aspect-ratio locked graphic', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Nested Semantic Components & Typography Hierarchy',
    banglaTitle: 'নেস্টেড সেমান্টিক কম্পোনেন্ট ও টাইপোগ্রাফি হায়ারার্কি (মাইলস্টোন ৩)',
    subtitle: 'Modular CSS cards, fluid clamp() type scales, CSS custom properties, and nested landmarks',
    zeroIntuition: {
      plainEnglishStory:
        'Great UI architecture treats every interface section like a recursive tree of reusable semantic components—a dashboard contains grid regions, grid regions hold cards, and each card nests a header, responsive media figure, body summary, and footer actions.\n\nInstead of hardcoding random pixel sizes inside every card, define CSS custom properties (`--space-md`, `--accent`, `--radius`) on `:root` and use fluid `clamp()` typography (`clamp(1.25rem, 2.5vw, 2rem)`) so nested components scale harmoniously from mobile phones to ultrawide displays without overlapping.',
      asciiFlowchart:
        ':root { --surface; --ink; --accent }\n  +-- <main class="grid">\n        +-- <article class="card"> (relative anchor)\n              +-- <header> + <figure> + <p> + <footer>',
      pseudocode: [":root { --pad: 1.25rem; --gap: 1rem; }","h1 { font-size: clamp(1.5rem, 3vw, 2.25rem); }",".card { display: flex; flex-direction: column; gap: var(--gap); }"],
      banglaZeroToHero: {
        analogyTitle: 'লেগো ব্লকের মতো ছোট ছোট ডিজাইন কম্পোনেন্ট জুড়ে বড় পেজ তৈরি',
        explanation:
          'একটি বড় ওয়েবপেজ একসাথে এলোমেলো ডিভ দিয়ে বানানোর বদলে ছোট ছোট পুনরায় ব্যবহারযোগ্য কম্পোনেন্টে ভাগ করা অনেক সহজ ও পেশাদার। যেমন একটি `<article class="card">` কম্পোনেন্টের ভেতরে হেডার, অ্যাস্পেক্ট-লকড `<figure>` ছবি, `clamp()` ফ্লুইড শিরোনাম ও অ্যাকশন ফুটার একটার ভেতর আরেকটা পরিষ্কারভাবে সাজানো থাকে। বারবার রঙ বা স্পেসিং কোডে না লিখে `:root`-এ `--surface`, `--accent`, `--radius`-এর মতো CSS ভ্যারিয়েবল রাখলে একটি লাইন বদলালেই পুরো ডিজাইন সিস্টেম আপডেট হয়ে যায়। মোবাইল থেকে ডেস্কটপ পর্যন্ত ফন্টের আকার স্বয়ংক্রিয়ভাবে সুন্দর রাখতে `font-size: clamp(1.25rem, 2.5vw, 2rem)` ব্যবহার করলে আলাদা মিডিয়া কুয়েরির ঝামেলা কমে। প্যারেন্ট কার্ডে `position: relative` আর ভেতরে `display: flex; flex-direction: column; justify-content: space-between` দিলে সব কার্ডের ফুটার সমান নিচে সারিবদ্ধ থাকে। নেস্টেড কম্পোনেন্টের ভেতরেও অবশ্যই একটি মাত্র `<h1>` ও সঠিক ক্রমে `<h2>`, `<h3>` হেডিং রাখতে হবে যেন স্ক্রিন রিডার সহজেই কাঠামো বুঝতে পারে। এই মাইলস্টোন ৩ অধ্যায়ে আমরা ফেজ ৩-এর গ্রিড, ফ্লেক্স, পজিশনিং, ইমেজ ও ডিজাইন টোকেন একসাথে জুড়ে একটি সম্পূর্ণ ড্যাশবোর্ড কম্পোনেন্ট তৈরি করব।',
        everydayExample: 'একটি মডুলার রান্নাঘরের তাক—প্রতিটি ড্রয়ারের ভেতর চামচ বা মশলার আলাদা বক্স সাজানো, যেখানে বাইরে থেকে শুধু একরঙা হ্যান্ডেল দেখা যায়।',
        keyTakeaways: [
          '`:root` কাস্টম প্রোপার্টি (`--accent`, `--gap`) নেস্টেড কম্পোনেন্ট জুড়ে একই ডিজাইন ভাষা বজায় রাখে।',
          '`clamp(min, preferred, max)` মিডিয়া কুয়েরি ছাড়াই মসৃণ রেসপন্সিভ টাইপোগ্রাফি দেয়।',
          'কার্ডের ভেতর `flex-direction: column` ও `margin-top: auto` ব্যবহার করলে ফুটার বাটনগুলো সব কার্ডে সমান উচ্চতায় বসে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch15-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Root Design Tokens & Fluid Clamp Heading',
        englishParagraphs: [
          'Declare `:root` color and spacing tokens once, then apply fluid `clamp()` sizing so the component heading adapts cleanly to viewport width.',
        ],
        banglaParagraphs: [
          '`:root`-এ CSS ভ্যারিয়েবল সংজ্ঞায়িত করে এবং `clamp()` ব্যবহার করে রেসপন্সিভ টাইপোগ্রাফি তৈরি করো।',
        ],
        memoryDiagram: ':root tokens -> .panel uses var(--surface) + clamp()',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  :root { --bg: #090d16; --surface: #111827; --accent: #10b981; --ink: #f8fafc; }\n  body { margin: 0; padding: 24px; font-family: system-ui; background: var(--bg); color: var(--ink); }\n  .panel { max-width: 520px; padding: 20px; background: var(--surface); border: 1px solid #1f2937; border-radius: 14px; }\n  h1 { margin: 0 0 8px; font-size: clamp(1.35rem, 3vw, 2rem); color: var(--accent); }\n</style>\n</head>\n<body>\n  <section class="panel">\n    <h1>Design Token System</h1>\n    <p>Consistent CSS variables drive every nested component.</p>\n  </section>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Design Token System',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"  :root { --bg: #090d16; --surface: #111827; --accent: #10b981; --ink: #f8fafc; }","whatItMeans":"Centralizes palette tokens at document root.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`var(...)` colors fall back to unstyled defaults."},
          {"lineNumber":"Line 8","codeSnippet":"  h1 { margin: 0 0 8px; font-size: clamp(1.35rem, 3vw, 2rem); color: var(--accent); }","whatItMeans":"Clamps heading smoothly between 1.35rem and 2rem.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Heading stays fixed size across viewports."},
        ],
      },
      {
        id: 'html-ch15-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Uniform Flex-Column Nested Card with Pushed Footer',
        englishParagraphs: [
          'Setting `display: flex; flex-direction: column` on `.card` plus `margin-top: auto` on `footer` keeps action links aligned along the bottom edge even when titles wrap.',
        ],
        banglaParagraphs: [
          'কার্ডে `flex-direction: column` ও ফুটারে `margin-top: auto` দিলে লেখার দৈর্ঘ্য ভিন্ন হলেও বাটনগুলো নিচে এক লাইনে থাকে।',
        ],
        memoryDiagram: '.card (flex column) -> header + p + footer(margin-top:auto)',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  .row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; font-family: system-ui; }\n  .card { display: flex; flex-direction: column; min-height: 170px; padding: 16px; border-radius: 12px; background: #1e293b; color: #f8fafc; }\n  footer { margin-top: auto; color: #34d399; font-weight: 700; }\n</style>\n</head>\n<body>\n  <h1>Aligned Card Footers</h1>\n  <div class="row">\n    <article class="card"><h2>Short</h2><footer>Open Module</footer></article>\n    <article class="card"><h2>Longer Multi-Line Card Heading</h2><footer>Open Module</footer></article>\n  </div>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Aligned Card Footers',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .card { display: flex; flex-direction: column; min-height: 170px; padding: 16px; border-radius: 12px; background: #1e293b; color: #f8fafc; }","whatItMeans":"Turns each card into a vertical flex stack.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cards fail to push footers evenly."},
          {"lineNumber":"Line 7","codeSnippet":"  footer { margin-top: auto; color: #34d399; font-weight: 700; }","whatItMeans":"Absorbs extra vertical space above the footer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Footers float awkwardly in middle of shorter cards."},
        ],
      },
      {
        id: 'html-ch15-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Modular Typography Scale & Readable Measure',
        englishParagraphs: [
          'Long-form study paragraphs are easiest to scan when capped at `max-width: 65ch` with generous `line-height: 1.65` and crisp typographic contrast.',
        ],
        banglaParagraphs: [
          'পড়ার সুবিধার জন্য প্যারাগ্রাফে `max-width: 65ch` ও `line-height: 1.65` রাখলে প্রতিটি লাইন চোখে আরামদায়ক হয়।',
        ],
        memoryDiagram: 'article > .prose { max-width: 65ch; line-height: 1.65 }',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; background: #0f172a; color: #e2e8f0; padding: 24px; }\n  .prose { max-width: 65ch; line-height: 1.65; }\n  .eyebrow { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; color: #34d399; }\n</style>\n</head>\n<body>\n  <article class="prose">\n    <span class="eyebrow">Module 03</span>\n    <h1>Readable Editorial Hierarchy</h1>\n    <p>Capping line length around 65 characters prevents eye fatigue during deep reading.</p>\n  </article>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Readable Editorial Hierarchy',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .prose { max-width: 65ch; line-height: 1.65; }","whatItMeans":"Locks line measure near ideal 60–70 character comfort width.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Text stretches uncomfortably across wide monitors."},
          {"lineNumber":"Line 7","codeSnippet":"  .eyebrow { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; color: #34d399; }","whatItMeans":"Creates distinct visual anchor above primary headline.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Category label blends into body text."},
        ],
      },
      {
        id: 'html-ch15-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Skipping Heading Levels vs. Strict H1 -> H2 -> H3 Tree',
        englishParagraphs: [
          'Never pick `<h4>` purely for smaller font size; keep strict `h1 -> h2 -> h3` semantic order and control visual size with utility CSS classes.',
        ],
        banglaParagraphs: [
          'ছোট ফন্ট পাওয়ার জন্য `<h1>`-এর পর সরাসরি `<h4>` ব্যবহার না করে সঠিক ক্রমে `<h2>` ব্যবহার করে CSS ক্লাস দিয়ে আকার বদলাও।',
        ],
        memoryDiagram: 'h1 (Page) -> h2 (Section) -> h3 (Card), styled via .title-sm',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 20px; background: #090d16; color: #f8fafc; }\n  .title-sm { font-size: 1rem; color: #94a3b8; margin: 4px 0; }\n</style>\n</head>\n<body>\n  <h1>Semantic Heading Tree</h1>\n  <section>\n    <h2>Primary Track</h2>\n    <h3 class="title-sm">Nested Subcard</h3>\n  </section>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Semantic Heading Tree',
        lineByLine: [
          {"lineNumber":"Line 12","codeSnippet":"    <h2>Primary Track</h2>","whatItMeans":"Preserves unbroken semantic outline between `<h1>` and `<h3>`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Accessibility tree shows broken heading hierarchy."},
          {"lineNumber":"Line 13","codeSnippet":"    <h3 class=\"title-sm\">Nested Subcard</h3>","whatItMeans":"Decouples visual font size (`.title-sm`) from semantic rank (`<h3>`).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Subcard lacks a structural landmark heading."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 5","codeSnippet":"  :root { --bg: #090d16; --surface: #111827; --accent: #10b981; --ink: #f8fafc; }","whatItMeans":"Defines shared theme tokens.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Colors break across nested elements."},
      {"lineNumber":"Line 7","codeSnippet":"  .panel { max-width: 520px; padding: 20px; background: var(--surface); border: 1px solid #1f2937; border-radius: 14px; }","whatItMeans":"Contained component surface.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Panel lacks visual boundary."},
      {"lineNumber":"Line 8","codeSnippet":"  h1 { margin: 0 0 8px; font-size: clamp(1.35rem, 3vw, 2rem); color: var(--accent); }","whatItMeans":"Fluid responsive title sizing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Heading lacks fluid scale."},
      {"lineNumber":"Line 13","codeSnippet":"    <h1>Design Token System</h1>","whatItMeans":"Primary semantic page heading.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Page misses top-level heading."},
    ],
    dryRunTable: [
      { step: 1, state: ':root tokens', memoryOrStack: 'CSS Custom Props', note: 'Inherited down entire DOM tree' },
      { step: 2, state: 'Grid + Flex card', memoryOrStack: 'Two-level layout', note: 'Grid tracks columns; Flex aligns card footer' },
      { step: 3, state: 'clamp(1.35rem, 3vw, 2rem)', memoryOrStack: 'Fluid scaling', note: 'Smooth transition between mobile and desktop' },
      { step: 4, state: 'h1 -> h2 -> h3', memoryOrStack: 'Document outline', note: 'Zero skipped heading ranks for screen readers' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Skipping Heading Ranks (`<h1>` Straight to `<h4>`)',
        brokenCode: '<h1>Catalog</h1><h4>Card Title</h4>',
        fixedCode: '<h1>Catalog</h1><h2 class="card-title">Card Title</h2>',
        whyItBreaks: 'Screen reader outline navigation relies on sequential heading levels without gaps.',
      },
      {
        title: 'Trap 2: Hardcoding Fixed `px` Font Sizes Ignoring User Zoom',
        brokenCode: 'p { font-size: 13px; }',
        fixedCode: 'p { font-size: clamp(0.95rem, 1.2vw, 1.05rem); }',
        whyItBreaks: 'Pixel font sizes override user browser `rem` accessibility scale preferences.',
      },
      {
        title: 'Trap 3: Putting Fixed Heights on Cards Containing Dynamic Text',
        brokenCode: '.card { height: 140px; }',
        fixedCode: '.card { min-height: 140px; display: flex; flex-direction: column; }',
        whyItBreaks: 'Fixed `height` causes wrapped text to overflow right out of the card border.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch15-p1',
        difficulty: 'Easy',
        title: 'CSS Variable Alert Component',
        prompt: 'Build a reusable `.alert` component driven by `--alert-bg` and `--alert-accent` custom properties.',
        banglaHint: '`:root` বা ক্লাসে `--alert-accent` সেট করে `border-left: 4px solid var(--alert-accent)` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>:root{--alert-bg:#064e3b;--alert-accent:#10b981}.alert{background:var(--alert-bg);border-left:4px solid var(--alert-accent);padding:14px;color:#fff}</style></head><body><div class="alert" role="status"><h1>Variable Alert</h1></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Variable Alert',
      },
      {
        id: 'html-ch15-p2',
        difficulty: 'Easy',
        title: 'Fluid Clamp Hero Title',
        prompt: 'Create a hero header whose `<h1>` uses `clamp(1.5rem, 4vw, 2.75rem)` and comfortable `60ch` subtext.',
        banglaHint: '`font-size: clamp(1.5rem, 4vw, 2.75rem)` এবং `max-width: 60ch` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>h1{font-size:clamp(1.5rem,4vw,2.75rem)}p{max-width:60ch}</style></head><body><header><h1>Fluid Hero Title</h1><p>Scales gracefully from 360px phones to wide screens.</p></header></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Fluid Hero Title',
      },
      {
        id: 'html-ch15-p3',
        difficulty: 'Medium',
        title: 'Equal-Height Flex Cards in Grid',
        prompt: 'Place 2 nested `<article>` cards in a Grid row where every card footer stays pinned to the bottom edge.',
        banglaHint: 'কার্ডে `display:flex; flex-direction:column` এবং ফুটারে `margin-top:auto` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.card{display:flex;flex-direction:column;min-height:140px;padding:14px;background:#1e293b;color:#fff}footer{margin-top:auto;color:#34d399}</style></head><body><h1>Equal Cards</h1><div class="grid"><article class="card"><h2>One</h2><footer>Action</footer></article><article class="card"><h2>Two Wrapped Lines Here</h2><footer>Action</footer></article></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Equal Cards',
      },
      {
        id: 'html-ch15-p4',
        difficulty: 'Medium',
        title: 'Nested Card with Corner Badge & Vector Figure',
        prompt: 'Combine relative/absolute badge positioning with an embedded 16:9 SVG `<figure>` inside one nested card.',
        banglaHint: 'কার্ডে `position: relative`, ব্যাজে `position: absolute` এবং গ্রাফিকে `aspect-ratio: 16/9` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.card{position:relative;max-width:340px;padding:16px;background:#111827;color:#fff;border-radius:12px}.tag{position:absolute;top:10px;right:10px;background:#10b981;color:#022c22;padding:2px 8px;border-radius:6px}</style></head><body><article class="card"><span class="tag">PRO</span><figure style="margin:0"><svg viewBox="0 0 160 90" style="width:100%;aspect-ratio:16/9;background:#064e3b"></svg><figcaption>Vector Preview</figcaption></figure><h1>Composite Card</h1></article></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Composite Card',
      },
      {
        id: 'html-ch15-p5',
        difficulty: 'Hard',
        title: 'Strict Semantic Outline Multi-Section Page',
        prompt: 'Author a multi-section article using unbroken `h1 -> h2 -> h3` ranks, `:root` tokens, and `65ch` reading width.',
        banglaHint: 'হেডিংয়ের কোনো লেভেল বাদ না দিয়ে `.prose` মাপ (`65ch`) বজায় রাখো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>:root{--accent:#10b981}main{max-width:65ch;font-family:system-ui}h1{color:var(--accent)}</style></head><body><main><h1>Architecture Outline</h1><section><h2>Core Grid</h2><h3>Track Sizing</h3></section></main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Architecture Outline',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Multi-Component Academy Course Dashboard',
      description: 'Combine Phase 3 CSS Grid, Flexbox card alignment, sticky navigation, aspect-locked SVG media, and fluid `:root` tokens into one cohesive dashboard.',
      banglaGoal: 'ফেজ ৩-এর গ্রিড, ফ্লেক্স, স্টিকি নেভবার, অ্যাস্পেক্ট-লকড SVG এবং `:root` ডিজাইন টোকেন একত্র করে একটি আধুনিক কোর্স ড্যাশবোর্ড বানাও।',
      combinesChapters: "Ch 11, 12, 13, 14, 15",
      starterCode: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  :root { --bg: #070b14; --card: #111827; --accent: #10b981; --ink: #f8fafc; }\n  body { margin: 0; font-family: system-ui; background: var(--bg); color: var(--ink); }\n  .topbar { position: sticky; top: 0; z-index: 20; padding: 14px 24px; background: #064e3b; }\n  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; padding: 24px; }\n  .card { position: relative; display: flex; flex-direction: column; min-height: 220px; padding: 18px; border-radius: 14px; background: var(--card); }\n  .badge { position: absolute; top: 12px; right: 12px; background: var(--accent); color: #022c22; padding: 2px 8px; border-radius: 6px; font-weight: 700; }\n  svg { width: 100%; height: auto; aspect-ratio: 16 / 9; display: block; border-radius: 8px; background: #1e293b; }\n  footer { margin-top: auto; padding-top: 12px; color: var(--accent); font-weight: 600; }\n</style>\n</head>\n<body>\n  <header class="topbar"><h1>Milestone 3 Course Studio</h1></header>\n  <main class="grid">\n    <article class="card"><span class="badge">CH 15</span><figure style="margin:0"><svg viewBox="0 0 160 90"><circle cx="80" cy="45" r="24" fill="#10b981"/></svg></figure><h2>Semantic Components</h2><footer>Phase 3 Complete</footer></article>\n    <article class="card"><span class="badge">GRID</span><figure style="margin:0"><svg viewBox="0 0 160 90"><rect x="30" y="25" width="100" height="40" rx="8" fill="#34d399"/></svg></figure><h2>Responsive Architecture</h2><footer>Ready for Phase 4</footer></article>\n  </main>\n</body>\n</html>`,
      sampleStdin: '',
      expectedOutput: 'Milestone 3 Course Studio',
    },
    starterCode: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  :root { --bg: #070b14; --card: #111827; --accent: #10b981; --ink: #f8fafc; }\n  body { margin: 0; font-family: system-ui; background: var(--bg); color: var(--ink); }\n  .topbar { position: sticky; top: 0; z-index: 20; padding: 14px 24px; background: #064e3b; }\n  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; padding: 24px; }\n  .card { position: relative; display: flex; flex-direction: column; min-height: 220px; padding: 18px; border-radius: 14px; background: var(--card); }\n  .badge { position: absolute; top: 12px; right: 12px; background: var(--accent); color: #022c22; padding: 2px 8px; border-radius: 6px; font-weight: 700; }\n  svg { width: 100%; height: auto; aspect-ratio: 16 / 9; display: block; border-radius: 8px; background: #1e293b; }\n  footer { margin-top: auto; padding-top: 12px; color: var(--accent); font-weight: 600; }\n</style>\n</head>\n<body>\n  <header class="topbar"><h1>Milestone 3 Course Studio</h1></header>\n  <main class="grid">\n    <article class="card"><span class="badge">CH 15</span><figure style="margin:0"><svg viewBox="0 0 160 90"><circle cx="80" cy="45" r="24" fill="#10b981"/></svg></figure><h2>Semantic Components</h2><footer>Phase 3 Complete</footer></article>\n    <article class="card"><span class="badge">GRID</span><figure style="margin:0"><svg viewBox="0 0 160 90"><rect x="30" y="25" width="100" height="40" rx="8" fill="#34d399"/></svg></figure><h2>Responsive Architecture</h2><footer>Ready for Phase 4</footer></article>\n  </main>\n</body>\n</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Milestone 3 Course Studio',
    testCases: [
      { id: 'html15-t1', input: '', expectedOutput: 'Milestone 3 Course Studio' },
      { id: 'html15-t2', input: '', expectedOutput: 'Semantic Components', isHidden: true },
    ],
  },
};
