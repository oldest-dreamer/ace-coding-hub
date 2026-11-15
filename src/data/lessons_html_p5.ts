import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_HTML_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'HTML5 Chapter 21: Accessible Data Tables, Sorting Headers & Filterable Grids',
    banglaTitle: 'HTML5 অধ্যায় ২১: অ্যাক্সেসিবল ডেটা টেবিল, সর্টিং হেডার ও ফিল্টার গ্রিড',
    subtitle: 'Semantic <caption>, <thead>, <th scope="col">, aria-sort indicators, and interactive DOM row filtering/sorting.',
    zeroIntuition: {
      plainEnglishStory:
        'Tabular financial reports, contest standings, and comparison matrices belong in a real `<table>`—never stacked `<div>` rows that break screen-reader column announcements! Pairing `<th scope="col">` and `<th scope="row">` inside `<thead>` and `<tbody>` allows assistive technology to announce the exact row and column header for every single cell.\n\nWhen building sortable leaderboards or analytics dashboards, bind click handlers to real `<button>` elements inside `<th aria-sort="ascending|descending|none">` rather than making bare `<th>` nodes unfocusable click targets.',
      asciiFlowchart: `  <table>
    <caption>Contest Leaderboard</caption>
    <thead><tr><th scope="col" aria-sort="descending"><button>Score</button></th></tr></thead>
    <tbody><tr><td>Argon</td><td>950</td></tr></tbody>
  </table>`,
      pseudocode: [
        '1. WRAP tabular data in <table> with <caption>, <thead>, and <tbody>',
        '2. MARK header orientation via <th scope="col"> and <th scope="row">',
        '3. PLACE focusable <button> triggers inside sortable <th> cells with aria-sort',
        '4. FILTER or sort rows cleanly using dataset attributes and append() reordering',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সেমান্টিক ডেটা টেবিল, স্কোপ অ্যাট্রিবিউট ও সর্টেবল লিডারবোর্ড (HTML5)',
        explanation:
          'কনটেস্টের র‍্যাংকিং, মার্কশিট বা প্রাইসিং কম্পারিজন দেখাতে অনেক ডেভেলপার `<div>` দিয়ে সারি ও কলাম সাজিয়ে ফেলেন—ফলে স্ক্রিন রিডার বুঝতে পারে না কোন সংখ্যাটি কোন কলামের! সত্যিকারের সারণিবদ্ধ ডেটার জন্য সর্বদা নেটিভ `<table>`, `<caption>`, `<thead>`, `<tbody>` এবং `<tfoot>` ব্যবহার করতে হয়। প্রতিটি হেডার সেলে `<th scope="col">` (কলাম হেডার) অথবা `<th scope="row">` (সারি হেডার) লিখে দিলে ব্রাউজার ও স্ক্রিন রিডার সেলটির সাথে শিরোনামের সম্পর্ক চিনতে পারে। টেবিলের কোনো কলাম ছোট-থেকে-বড় বা উল্টো সর্ট করতে হলে `<th>`-এর সরাসরি ক্লিক না নিয়ে তার ভেতরে একটি `<button type="button">` বসাতে হবে এবং `<th>`-তে `aria-sort="ascending"` বা `"descending"` আপডেট করতে হবে। এতে কীবোর্ড দিয়ে `Tab` চেপে যেকোনো ইউজার টেবিল সর্ট করতে পারবেন! বড় টেবিল মোবাইল স্ক্রিনে ভেঙে যাওয়া ঠেকাতে টেবিলের চারপাশে `overflow-x: auto` কন্টেইনার রাখা হলো সেরা প্র্যাকটিস।',
        everydayExample: 'রেজাল্ট শিটের ওপরে বিষয়ের নাম (`<th scope="col">`) ও পাশে রোল নম্বর (`<th scope="row">`) লিখে দিলে প্রতি ঘরের নম্বর সহজেই মেলে!',
        keyTakeaways: [
          'টেবিলের শিরোনাম দিতে `<caption>` এবং হেডার/বডি আলাদা করতে `<thead>` ও `<tbody>` ব্যবহার করো।',
          'প্রতিটি হেডার সেলে `scope="col"` বা `scope="row"` দেওয়া অ্যাক্সেসিবিলিটির জন্য অপরিহার্য।',
          'সর্টেবল হেডারে `<button>` রাখো এবং `<th aria-sort="...">` স্টেট আপডেট করো।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch21-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Semantic Table Anatomy with Caption, thead & scope',
        englishParagraphs: [
          'A clean semantic `<table>` separates table title (`<caption>`), header group (`<thead>`), and data body (`<tbody>`) with `scope="col"` and `scope="row"` clarity.',
        ],
        banglaParagraphs: [
          '`<caption>`, `<thead>`, `<tbody>`, ও `scope` ব্যবহার করে একটি নির্ভুল অ্যাক্সেসিবল ডেটা টেবিলের গঠন।',
        ],
        memoryDiagram: 'table -> caption + thead(th[scope="col"]) + tbody(th[scope="row"], td)',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  table { width: 100%; border-collapse: collapse; background: #111827; }
  th, td { border: 1px solid #334155; padding: 10px 14px; text-align: left; }
  thead th { background: #0f172a; color: #34d399; }
</style>
</head>
<body>
  <h1>Contest Standings Table</h1>
  <table>
    <caption>Phase 5 Top Solvers</caption>
    <thead>
      <tr><th scope="col">Coder</th><th scope="col">Solved</th><th scope="col">Rating</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Arafat</th><td>24</td><td>1680</td></tr>
      <tr><th scope="row">Nadia</th><td>25</td><td>1820</td></tr>
    </tbody>
  </table>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Contest Standings Table',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: '<caption>Phase 5 Top Solvers</caption>', whatItMeans: 'Provides an accessible table title linked to the grid.', whyItIsThere: 'Screen readers announce table purpose before reading cells.', ifDeletedError: 'Table lacks semantic summary heading.' },
          { lineNumber: 'Line 16', codeSnippet: '<th scope="col">Coder</th>', whatItMeans: 'Declares column header ownership vertically.', whyItIsThere: 'Links every cell beneath to its header label.', ifDeletedError: 'Ambiguous header association.' },
        ],
      },
      {
        id: 'html-ch21-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Live Search Filter Input Over Table Rows',
        englishParagraphs: [
          'An `<input type="search">` filters `<tbody> tr` rows smoothly by toggling row `hidden` state and updating an `aria-live="polite"` match counter.',
        ],
        banglaParagraphs: [
          '`<input type="search">` দিয়ে টেবিলের সারি লাইভ ফিল্টার করে `hidden` অ্যাট্রিবিউট ও ম্যাচ সংখ্যা দেখানো হয়েছে।',
        ],
        memoryDiagram: 'input#q -> match row.textContent -> row.hidden = !match',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  input { padding: 8px 12px; border-radius: 6px; border: 1px solid #334155; background: #1e293b; color: #fff; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #334155; padding: 8px 12px; text-align: left; }
</style>
</head>
<body>
  <h1>Filterable Topic Directory</h1>
  <label for="q">Filter topics:</label>
  <input id="q" type="search" placeholder="Search (e.g. Tree)" />
  <p id="cnt" aria-live="polite">Showing 3 topics</p>
  <table>
    <thead><tr><th scope="col">Chapter</th><th scope="col">Topic</th></tr></thead>
    <tbody id="rows">
      <tr><td>21</td><td>Sorting &amp; Binary Search</td></tr>
      <tr><td>22</td><td>Hash Maps &amp; Sets</td></tr>
      <tr><td>23</td><td>Trees &amp; Graphs</td></tr>
    </tbody>
  </table>
  <script>
    const q = document.getElementById('q');
    const rows = Array.from(document.querySelectorAll('#rows tr'));
    q.addEventListener('input', () => {
      const term = q.value.trim().toLowerCase();
      let vis = 0;
      for (const r of rows) {
        const ok = r.textContent.toLowerCase().includes(term);
        r.hidden = !ok;
        if (ok) vis++;
      }
      document.getElementById('cnt').textContent = 'Showing ' + vis + ' topics';
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Filterable Topic Directory',
        lineByLine: [
          { lineNumber: 'Line 28', codeSnippet: 'r.hidden = !ok;', whatItMeans: 'Uses native HTML hidden property to conceal non-matching rows.', whyItIsThere: 'Hides rows cleanly from visual layout and screen readers.', ifDeletedError: 'Rows remain visible regardless of filter text.' },
        ],
      },
      {
        id: 'html-ch21-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Keyboard-Sortable Leaderboard with aria-sort',
        englishParagraphs: [
          'Clicking `<th id="scoreTh" aria-sort="none"><button id="sortBtn">Score</button></th>` toggles numeric ascending/descending row order using `data-score` and updates `aria-sort`.',
        ],
        banglaParagraphs: [
          'টেবিল হেডারের ভেতরে `<button>` ও `aria-sort` বসিয়ে স্কোর অনুযায়ী সারিগুলো ছোট-বড় সাজানো হয়েছে।',
        ],
        memoryDiagram: 'th[aria-sort] -> button click -> sort tbody rows by data-score',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #334155; padding: 10px; text-align: left; }
  th button { background: transparent; border: 0; color: #34d399; font-weight: 700; cursor: pointer; font-size: 1rem; }
</style>
</head>
<body>
  <h1>Sortable Leaderboard</h1>
  <table>
    <thead>
      <tr>
        <th scope="col">Player</th>
        <th id="scoreTh" scope="col" aria-sort="descending"><button id="sortBtn" type="button">Score (Toggle)</button></th>
      </tr>
    </thead>
    <tbody id="tb">
      <tr data-score="950"><td>Nadia</td><td>950</td></tr>
      <tr data-score="820"><td>Tariq</td><td>820</td></tr>
      <tr data-score="990"><td>Rafiq</td><td>990</td></tr>
    </tbody>
  </table>
  <script>
    let asc = false;
    document.getElementById('sortBtn').addEventListener('click', () => {
      asc = !asc;
      document.getElementById('scoreTh').setAttribute('aria-sort', asc ? 'ascending' : 'descending');
      const tb = document.getElementById('tb');
      const list = Array.from(tb.rows).sort((a, b) => asc ? a.dataset.score - b.dataset.score : b.dataset.score - a.dataset.score);
      tb.replaceChildren(...list);
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Sortable Leaderboard',
        lineByLine: [
          { lineNumber: 'Line 28', codeSnippet: 'tb.replaceChildren(...list);', whatItMeans: 'Reorders existing TR elements in a single DOM mutation batch.', whyItIsThere: 'Avoids re-creating DOM nodes or using unsafe innerHTML.', ifDeletedError: 'Table rows stay in original order.' },
        ],
      },
      {
        id: 'html-ch21-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Responsive Overflow Scroll Wrapper & Tabular Numerals',
        englishParagraphs: [
          'Wrapping wide tables in `<div class="table-wrap" tabindex="0" role="region" aria-label="...">` with `overflow-x: auto` prevents mobile horizontal page overflow while letting keyboard users scroll!',
          'Setting `font-variant-numeric: tabular-nums` aligns numeric columns vertically down to the pixel.',
        ],
        banglaParagraphs: [
          'মোবাইলে বড় টেবিল ভেঙে যাওয়া ঠেকাতে `<div role="region" tabindex="0">` কন্টেইনারে `overflow-x: auto` এবং সংখ্যা সোজা রাখতে `tabular-nums` ব্যবহার করা হয়।',
        ],
        memoryDiagram: 'div.table-wrap[overflow-x:auto] -> table { font-variant-numeric: tabular-nums }',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  .table-wrap { overflow-x: auto; border: 1px solid #334155; border-radius: 10px; }
  table { width: 100%; min-width: 480px; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { padding: 10px 14px; border-bottom: 1px solid #1e293b; text-align: right; }
  th:first-child, td:first-child { text-align: left; }
</style>
</head>
<body>
  <h1>Responsive Financial Grid</h1>
  <div class="table-wrap" tabindex="0" role="region" aria-label="Quarterly Metrics">
    <table>
      <thead><tr><th scope="col">Quarter</th><th scope="col">Revenue ($)</th><th scope="col">Growth</th></tr></thead>
      <tbody>
        <tr><th scope="row">Q1</th><td>12,450.00</td><td>+14.2%</td></tr>
        <tr><th scope="row">Q2</th><td>18,920.50</td><td>+51.9%</td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Responsive Financial Grid',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: '<div class="table-wrap" tabindex="0" role="region" aria-label="Quarterly Metrics">', whatItMeans: 'Keyboard-scrollable container preventing viewport overflow.', whyItIsThere: 'Satisfies WCAG scrollable-region-focusable rule.', ifDeletedError: 'Table overflows small mobile viewports horizontally.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 12', codeSnippet: '<h1>Contest Standings Table</h1>', whatItMeans: 'Primary document heading describing the data grid.', whyItIsThere: 'Provides structural landmark hierarchy.', ifDeletedError: 'Heading outline incomplete.' },
      { lineNumber: 'Line 13', codeSnippet: '<table>', whatItMeans: 'Native HTML table element communicating row/column grid semantics.', whyItIsThere: 'Enables screen reader cell coordinate navigation.', ifDeletedError: 'Tabular rows lose grid structure.' },
      { lineNumber: 'Line 14', codeSnippet: '<caption>Phase 5 Top Solvers</caption>', whatItMeans: 'Programmatically associated table title.', whyItIsThere: 'Identifies dataset summary before reading cells.', ifDeletedError: 'Screen readers lack table title.' },
      { lineNumber: 'Line 16', codeSnippet: '<tr><th scope="col">Coder</th><th scope="col">Solved</th><th scope="col">Rating</th></tr>', whatItMeans: 'Explicit column header row inside <thead>.', whyItIsThere: 'Maps column labels down to every body cell.', ifDeletedError: 'Columns lack named headings.' },
      { lineNumber: 'Line 19', codeSnippet: '<tr><th scope="row">Arafat</th><td>24</td><td>1680</td></tr>', whatItMeans: 'Row header paired with numeric data cells.', whyItIsThere: 'Associates row identity with stats.', ifDeletedError: 'Stats lose row subject association.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <table> & <caption>', memoryOrStack: 'Grid context initialized', note: 'Screen reader reads caption' },
      { step: 2, state: 'Parse <thead> th[scope="col"]', memoryOrStack: 'Cols = [Coder, Solved, Rating]', note: 'Column map bound' },
      { step: 3, state: 'Parse <tbody> rows', memoryOrStack: 'th[scope="row"] -> Arafat, Nadia', note: 'Row labels bound' },
      { step: 4, state: 'Apply CSS border-collapse', memoryOrStack: 'Unified single-pixel grid lines', note: 'Crisp layout rendered' },
    ],
    harryBugTraps: [
      {
        title: 'Using Div Grid Layouts for True Data Tables',
        brokenCode: '<div class="row"><div>Name</div><div>Score</div></div>',
        fixedCode: '<table><thead><tr><th scope="col">Name</th><th scope="col">Score</th></tr></thead></table>',
        whyItBreaks: 'Stacked divs strip column-row navigation shortcuts from assistive tech and copy-paste spreadsheet tools.',
      },
      {
        title: 'Putting Click Handlers Directly on Non-Interactive <th> Tags',
        brokenCode: '<th onclick="sortCol()">Score</th>',
        fixedCode: '<th scope="col" aria-sort="none"><button type="button">Score</button></th>',
        whyItBreaks: 'Bare <th> cells cannot be reached by Tab or activated with Enter/Space via keyboard.',
      },
      {
        title: 'Omitting Overflow Wrapper on Wide Tables',
        brokenCode: '<table style="width:900px">...</table>',
        fixedCode: '<div style="overflow-x:auto" tabindex="0"><table>...</table></div>',
        whyItBreaks: 'Wide fixed tables cause unwanted horizontal page scrollbars on phones.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-21-p1',
        difficulty: 'Easy',
        title: '1. Semantic Table With Caption & Scope',
        prompt: 'Create a <table> with <caption>, <thead> (`<th scope="col">`), and 2 rows inside <tbody>.',
        banglaHint: '`<caption>`, `<thead>`, `<tbody>` ও `<th scope="col">` দিয়ে সুন্দর টেবিল গঠন করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Language Benchmarks</h1><table><caption>Execution Tiers</caption><thead><tr><th scope="col">Lang</th><th scope="col">Model</th></tr></thead><tbody><tr><th scope="row">C23</th><td>Native Binary</td></tr><tr><th scope="row">Rust</th><td>Native Binary</td></tr></tbody></table></body></html>',
        sampleStdin: '',
        expectedOutput: 'Language Benchmarks',
      },
      {
        id: 'html-ch-21-p2',
        difficulty: 'Easy',
        title: '2. Table Footer Summary Row (<tfoot>)',
        prompt: 'Add a <tfoot> total row showing total points across 2 body rows.',
        banglaHint: 'মোট হিসাব দেখাতে `<tbody>`-এর পর `<tfoot>` ট্যাগ যোগ করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Score Summary</h1><table><thead><tr><th scope="col">Round</th><th scope="col">Points</th></tr></thead><tbody><tr><td>R1</td><td>100</td></tr><tr><td>R2</td><td>150</td></tr></tbody><tfoot><tr><th scope="row">Total</th><td>250</td></tr></tfoot></table></body></html>',
        sampleStdin: '',
        expectedOutput: 'Score Summary',
      },
      {
        id: 'html-ch-21-p3',
        difficulty: 'Medium',
        title: '3. Accessible Sort Header Button with aria-sort',
        prompt: 'Place a <button type="button"> inside a <th scope="col" aria-sort="ascending"> header.',
        banglaHint: '`<th>`-এর ভেতরে `<button>` রেখে `aria-sort` ব্যবহার করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Sortable Column Header</h1><table><thead><tr><th scope="col">User</th><th scope="col" aria-sort="ascending"><button type="button">Rank</button></th></tr></thead><tbody><tr><td>Sam</td><td>1</td></tr></tbody></table></body></html>',
        sampleStdin: '',
        expectedOutput: 'Sortable Column Header',
      },
      {
        id: 'html-ch-21-p4',
        difficulty: 'Medium',
        title: '4. Live Row Search Filter Widget',
        prompt: 'Wire an <input type="search"> that toggles `row.hidden` on matching table rows.',
        banglaHint: 'ইভেন্ট লিসেনার `input`-এ `row.textContent` মিলিয়ে `row.hidden` সেট করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Row Filter</h1><input id="f" type="search" aria-label="Search rows" /><table><tbody id="b"><tr><td>Python</td></tr><tr><td>TypeScript</td></tr></tbody></table><script>document.getElementById("f").addEventListener("input",(e)=>{const v=e.target.value.toLowerCase();for(const r of document.querySelectorAll("#b tr"))r.hidden=!r.textContent.toLowerCase().includes(v);});</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Row Filter',
      },
      {
        id: 'html-ch-21-p5',
        difficulty: 'Hard',
        title: '5. Mobile-Safe Tabular-Nums Analytics Grid',
        prompt: 'Combine an accessible `tabindex="0"` scroll wrapper, `font-variant-numeric: tabular-nums`, and multi-column headers.',
        banglaHint: '`overflow-x: auto`, `role="region"` ও `tabular-nums` একসাথে ব্যবহার করো।',
        starterCode: '<!doctype html>\n<html lang="en"><head><style>table{font-variant-numeric:tabular-nums;border-collapse:collapse;width:100%}th,td{border:1px solid #334155;padding:8px}</style></head><body><h1>Metrics Matrix</h1><div tabindex="0" role="region" aria-label="Latency Table" style="overflow-x:auto"><table><caption>Endpoint Latencies</caption><thead><tr><th scope="col">Route</th><th scope="col">P50 (ms)</th><th scope="col">P99 (ms)</th></tr></thead><tbody><tr><th scope="row">/api/run</th><td>12.4</td><td>41.8</td></tr></tbody></table></div></body></html>',
        sampleStdin: '',
        expectedOutput: 'Metrics Matrix',
      },
    ],
    miniBuild: {
      title: 'Accessible Sortable Contest Standings Grid',
      description: 'Semantic <table> with <caption>, scoped headers, aria-sort buttons, and safe DOM row reordering.',
      banglaGoal: 'ক্যাপশন, স্কোপ হেডার, aria-sort ও বাটন-চালিত সর্টিংসহ অ্যাক্সেসিবল কনটেস্ট টেবিল তৈরি।',
      combinesChapters: 'Ch 1–21',
      starterCode: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { border: 1px solid #334155; padding: 10px 14px; text-align: left; }
  th button { background: none; border: 0; color: #34d399; font-weight: 700; cursor: pointer; }
</style>
</head>
<body>
  <h1>Contest Standings Table</h1>
  <div tabindex="0" role="region" aria-label="Standings" style="overflow-x:auto">
    <table>
      <caption>Weekly Leaderboard</caption>
      <thead><tr><th scope="col">Coder</th><th id="thS" scope="col" aria-sort="descending"><button id="btnS" type="button">Score</button></th></tr></thead>
      <tbody id="tb">
        <tr data-s="950"><th scope="row">Arafat</th><td>950</td></tr>
        <tr data-s="1020"><th scope="row">Nadia</th><td>1020</td></tr>
      </tbody>
    </table>
  </div>
  <script>
    let asc = false;
    document.getElementById('btnS').addEventListener('click', () => {
      asc = !asc;
      document.getElementById('thS').setAttribute('aria-sort', asc ? 'ascending' : 'descending');
      const tb = document.getElementById('tb');
      const rows = Array.from(tb.rows).sort((a, b) => asc ? a.dataset.s - b.dataset.s : b.dataset.s - a.dataset.s);
      tb.replaceChildren(...rows);
    });
  </script>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Contest Standings Table',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  th, td { border: 1px solid #334155; padding: 10px 14px; text-align: left; }
</style>
</head>
<body>
  <h1>Contest Standings Table</h1>
  <table>
    <caption>Phase 5 Top Solvers</caption>
    <thead>
      <tr><th scope="col">Coder</th><th scope="col">Solved</th><th scope="col">Rating</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">Arafat</th><td>24</td><td>1680</td></tr>
      <tr><th scope="row">Nadia</th><td>25</td><td>1820</td></tr>
    </tbody>
  </table>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Contest Standings Table',
    testCases: [
      { id: 'html21-t1', input: '', expectedOutput: 'Contest Standings Table' },
      { id: 'html21-t2', input: '', expectedOutput: 'Phase 5 Top Solvers', isHidden: true },
    ],
  },

  22: {
    chapterNumber: 22,
    title: 'HTML5 Chapter 22: data-* Maps, Keyed DOM Templates & JSON-LD Metadata',
    banglaTitle: 'HTML5 অধ্যায় ২২: data-* ম্যাপ, কি-যুক্ত DOM টেমপ্লেট ও JSON-LD মেটাডেটা',
    subtitle: 'HTML <template> cloning, dataset key lookups, deduplicated Set rendering, and Schema.org JSON-LD.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML `<template>` elements hold inert, pre-parsed DOM subtrees that render ZERO pixels until JavaScript clones them via `tpl.content.cloneNode(true)`—eliminating fragile, XSS-prone `innerHTML` string concatenation! Every stamped element receives a `data-id` key so lookups in `Map` / `querySelector` hit target nodes in `O(1)` without rebuilding the whole list.\n\nMeanwhile, `<script type="application/ld+json">` embeds clean Schema.org JSON-LD right inside `<head>`, turning a webpage into machine-readable structured data for search engines.',
      asciiFlowchart: `  <template id="cardTpl"> -> content.cloneNode(true) -> set dataset.id -> appendChild
  <script type="application/ld+json"> { "@type": "Course", "name": "HTML5" }`,
      pseudocode: [
        '1. DEFINE reusable markup inside inert <template> tag',
        '2. CLONE content safely via tpl.content.cloneNode(true) and populate textContent',
        '3. TAG cloned cards with unique data-key attributes for O(1) Map lookup',
        '4. EMBED structured Schema.org metadata via <script type="application/ld+json">',
      ],
      banglaZeroToHero: {
        analogyTitle: 'HTML <template> ছাঁচ, data-* চাবি ও JSON-LD স্ট্রাকচার্ড ডেটা',
        explanation:
          'জাভাস্ক্রিপ্ট দিয়ে তালিকায় ১০০টি কার্ড যোগ করতে অনেকেই লম্বা স্ট্রিং `innerHTML += "<div>..."` ব্যবহার করে, যা কোড পড়া কঠিন করে এবং XSS হ্যাকের ঝুঁকি তৈরি করে! এর আধুনিক সমাধান হলো HTML5 `<template>` ট্যাগ: এটি ব্রাউজারে একটি অদৃশ্য ছাঁচের মতো পড়ে থাকে—ক্লোন (`tpl.content.cloneNode(true)`) করে ভেতরে নিরাপদে `textContent` বসালেই ঝকঝকে নিরাপদ DOM নোড তৈরি হয়! প্রতিটি নোডে `data-key="item-42"` সেট করে জাভাস্ক্রিপ্টের `Map` বা `Set`-এর সাথে যুক্ত করলে কোনো ডুপ্লিকেট ছাড়াই মুহূর্তের মধ্যে নির্দিষ্ট কার্ডটি আপডেট বা রিমুভ করা যায়। পাশাপাশি গুগল বা সার্চ ইঞ্জিনকে তোমার সাইটের কোর্স, প্রোডাক্ট বা রেসিপি সম্পর্কে নিখুঁত তথ্য দিতে `<head>` সেকশনে `<script type="application/ld+json">` আকারে Schema.org JSON-LD যুক্ত করা হয়—এটি দেখতে সরাসরি JSON হ্যাশ ম্যাপের মতোই, যা পর্দায় কোনো দাগ না ফেলে সার্চ র‍্যাংকিং ও রিচ কার্ড বাড়ায়!',
        everydayExample: 'বিস্কুট বানানোর স্টিলের ছাঁচ (`<template>`) একবার তৈরি রাখলে প্রতিবার একই সুন্দর নকশায় নিরাপদ নতুন কার্ড বের করা যায়!',
        keyTakeaways: [
          '`<template>` ভেতরের HTML পেজ লোডের সময় স্ক্রিনে দেখা যায় না—ক্লোন করে `textContent` বসিয়ে ব্যবহার করতে হয়।',
          '`innerHTML`-এর বদলে `template.content.cloneNode(true)` + `textContent` ব্যবহার করলে XSS নিরাপত্তা নিশ্চিত হয়।',
          '`<script type="application/ld+json">` পেজের SEO ও Schema.org রিচ রেজাল্টের জন্য স্ট্যান্ডার্ড মেটাডেটা পদ্ধতি।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch22-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Inert <template> Cloning & Safe textContent Hydration',
        englishParagraphs: [
          'Stamp a `<template id="rowTpl">` node cleanly using `cloneNode(true)` and populate fields via `.textContent` instead of raw string HTML.',
        ],
        banglaParagraphs: [
          '`<template>` ক্লোন করে `textContent` বসিয়ে XSS-নিরাপদ DOM কার্ড তৈরি করার প্রাথমিক নিয়ম।',
        ],
        memoryDiagram: 'template#card -> cloneNode(true) -> populate textContent -> list.append()',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  li { padding: 8px 12px; margin: 6px 0; background: #1e293b; border-radius: 8px; }
</style>
</head>
<body>
  <h1>Keyed Template Renderer</h1>
  <ul id="list"></ul>
  <template id="itemTpl">
    <li><strong data-field="name"></strong> — <span data-field="tag"></span></li>
  </template>
  <script>
    const tpl = document.getElementById('itemTpl');
    const ul = document.getElementById('list');
    for (const row of [{ id: '1', name: 'HashMap', tag: 'O(1)' }, { id: '2', name: 'HashSet', tag: 'Unique' }]) {
      const frag = tpl.content.cloneNode(true);
      const li = frag.querySelector('li');
      li.dataset.key = row.id;
      frag.querySelector('[data-field="name"]').textContent = row.name;
      frag.querySelector('[data-field="tag"]').textContent = row.tag;
      ul.appendChild(frag);
    }
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Keyed Template Renderer',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: '<template id="itemTpl">', whatItMeans: 'Declares an inert DOM fragment hidden until cloned.', whyItIsThere: 'Separates markup structure cleanly from JS logic.', ifDeletedError: 'Template element missing for cloneNode.' },
          { lineNumber: 'Line 19', codeSnippet: 'const frag = tpl.content.cloneNode(true);', whatItMeans: 'Deep-clones the template DocumentFragment.', whyItIsThere: 'Creates an isolated DOM copy for every data item.', ifDeletedError: 'Cannot append fresh list items.' },
        ],
      },
      {
        id: 'html-ch22-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Set-Deduplicated Tag Pills With data-tag Lookup',
        englishParagraphs: [
          'Maintain a JS `Set` keyed by normalized tag text (`toLowerCase()`) so duplicate additions are rejected in `O(1)` before rendering.',
        ],
        banglaParagraphs: [
          '`Set` দিয়ে ডুপ্লিকেট ট্যাগ ঠেকিয়ে `data-tag` সহ ডায়নামিক চিপ তৈরি।',
        ],
        memoryDiagram: 'Set(["html5","a11y"]) -> reject duplicate -> render button[data-tag]',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  .chip { display: inline-block; margin: 4px; padding: 6px 12px; border-radius: 8px; background: #064e3b; color: #34d399; border: 1px solid #10b981; }
</style>
</head>
<body>
  <h1>Unique Tag Index</h1>
  <div id="tags"></div>
  <script>
    const seen = new Set();
    const wrap = document.getElementById('tags');
    for (const t of ['HTML5', 'ARIA', 'html5', 'JSON-LD']) {
      const k = t.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      const span = document.createElement('span');
      span.className = 'chip';
      span.dataset.tag = k;
      span.textContent = t;
      wrap.appendChild(span);
    }
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Unique Tag Index',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'if (seen.has(k)) continue;', whatItMeans: 'Case-insensitive O(1) duplicate guard using Set.', whyItIsThere: 'Guarantees each normalized tag renders exactly once.', ifDeletedError: 'Duplicate "HTML5" and "html5" tags both render.' },
        ],
      },
      {
        id: 'html-ch22-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Schema.org JSON-LD Structured Course Card',
        englishParagraphs: [
          'Search engines parse `<script type="application/ld+json">` inside `<head>` to extract structured entity maps (`@type`, `name`, `provider`) cleanly without polluting visible markup.',
        ],
        banglaParagraphs: [
          'সার্চ ইঞ্জিনের জন্য `<script type="application/ld+json">` দিয়ে Schema.org কোর্স মেটাডেটা সংযুক্ত করা হয়েছে।',
        ],
        memoryDiagram: 'head -> script[type="application/ld+json"] -> Machine-Readable Map',
        code: `<!doctype html>
<html lang="en">
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "ArgonCode HTML5 Track",
    "description": "25-Chapter semantic HTML5 and accessibility mastery"
  }
  </script>
</head>
<body style="font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc;">
  <h1>JSON-LD Rich Snippet Page</h1>
  <p>Structured metadata embedded cleanly for search crawlers.</p>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'JSON-LD Rich Snippet Page',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: '<script type="application/ld+json">', whatItMeans: 'Declares JSON-LD structured data block ignored by JS runtime.', whyItIsThere: 'Provides canonical Schema.org entity metadata to crawlers.', ifDeletedError: 'Search crawlers miss structured course snippet.' },
        ],
      },
      {
        id: 'html-ch22-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Preventing XSS via textContent vs Unsafe innerHTML Concatenation',
        englishParagraphs: [
          'Concatenating untrusted user names inside `element.innerHTML` executes injected `<img onerror=...>` scripts! Always use `textContent` or `<template>` hydration.',
        ],
        banglaParagraphs: [
          'ইউজারের দেওয়া নাম কখনো `innerHTML` দিয়ে বসানো যাবে না—`<template>` ও `textContent` ব্যবহার করলে কোনো স্ক্রিপ্ট ইনজেকশন হতে পারে না।',
        ],
        memoryDiagram: 'untrusted string -> textContent = literal safe text (0 script execution)',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc;">
  <h1>XSS-Safe Profile Output</h1>
  <p id="out"></p>
  <script>
    const rawUserInput = '<img src=x onerror=alert(1)> Coder';
    document.getElementById('out').textContent = rawUserInput;
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'XSS-Safe Profile Output',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: "document.getElementById('out').textContent = rawUserInput;", whatItMeans: 'Escapes angle brackets automatically as inert text.', whyItIsThere: 'Neutralizes cross-site scripting payloads completely.', ifDeletedError: 'User input never rendered.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 10', codeSnippet: '<h1>Keyed Template Renderer</h1>', whatItMeans: 'Main page heading.', whyItIsThere: 'Defines top-level page landmark title.', ifDeletedError: 'Page lacks primary heading.' },
      { lineNumber: 'Line 11', codeSnippet: '<ul id="list"></ul>', whatItMeans: 'Semantic list target receiving cloned template items.', whyItIsThere: 'Provides ordered/unordered container semantics.', ifDeletedError: 'No mount container for cloned nodes.' },
      { lineNumber: 'Line 12', codeSnippet: '<template id="itemTpl">', whatItMeans: 'Inert HTML template container.', whyItIsThere: 'Pre-parses markup once without rendering until cloned.', ifDeletedError: 'document.getElementById("itemTpl") returns null.' },
      { lineNumber: 'Line 19', codeSnippet: 'const frag = tpl.content.cloneNode(true);', whatItMeans: 'Clones inert template subtree cleanly.', whyItIsThere: 'Avoids raw HTML string concatenation bugs.', ifDeletedError: 'Cannot stamp new items.' },
      { lineNumber: 'Line 21', codeSnippet: 'li.dataset.key = row.id;', whatItMeans: 'Attaches keyed data-key attribute for O(1) element tracking.', whyItIsThere: 'Identifies exact DOM card tied to data map.', ifDeletedError: 'DOM nodes lose data ID correlation.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <template#itemTpl>', memoryOrStack: 'Inert DocumentFragment stored', note: 'Nothing rendered visually yet' },
      { step: 2, state: 'Loop row 1 (HashMap)', memoryOrStack: 'cloneNode(true) creates fresh <li>', note: 'dataset.key = "1"' },
      { step: 3, state: 'Set textContent fields', memoryOrStack: '<strong>HashMap</strong>, <span>O(1)</span>', note: 'XSS-safe literal assignment' },
      { step: 4, state: 'ul.appendChild(frag)', memoryOrStack: '2 keyed <li> nodes live in DOM', note: 'Clean batched insertion' },
    ],
    harryBugTraps: [
      {
        title: 'Using innerHTML += Inside Loops (Wipes Event Listeners & Opens XSS)',
        brokenCode: 'list.innerHTML += `<li>${userInput}</li>`;',
        fixedCode: 'const li = document.createElement("li"); li.textContent = userInput; list.appendChild(li);',
        whyItBreaks: 'innerHTML += re-parses the entire container DOM each iteration, destroying event listeners and executing malicious scripts.',
      },
      {
        title: 'Writing CamelCase Inside data-* Attributes Instead of Kebab-Case',
        brokenCode: '<div data-userId="5"></div> // reads as el.dataset.userid, NOT userId!',
        fixedCode: '<div data-user-id="5"></div> // cleanly maps to el.dataset.userId!',
        whyItBreaks: 'HTML lowercases all attribute names; only kebab-case data-user-id converts to camelCase dataset.userId.',
      },
      {
        title: 'Forgetting cloneNode(true) When Appending Template Content',
        brokenCode: 'list.appendChild(tpl.content); // Empties template on first use!',
        fixedCode: 'list.appendChild(tpl.content.cloneNode(true));',
        whyItBreaks: 'Appending tpl.content directly moves the original children out of the template, leaving subsequent iterations empty.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-22-p1',
        difficulty: 'Easy',
        title: '1. Stamp a Card From <template>',
        prompt: 'Create a `<template>` with a heading and paragraph, clone it once, populate `textContent`, and append to `<main>`.',
        banglaHint: '`tpl.content.cloneNode(true)` ব্যবহার করে নতুন নোড ক্লোন করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Template Stamp</h1><main id="m"></main><template id="t"><article><h2></h2></article></template><script>const f=document.getElementById("t").content.cloneNode(true);f.querySelector("h2").textContent="Cloned!";document.getElementById("m").appendChild(f);</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Template Stamp',
      },
      {
        id: 'html-ch-22-p2',
        difficulty: 'Easy',
        title: '2. Kebab-Case data-user-id Binding',
        prompt: 'Attach `data-user-id="42"` to a button and read `btn.dataset.userId` on click.',
        banglaHint: '`data-user-id` দিলে জাভাস্ক্রিপ্টে `dataset.userId` হিসেবে পাওয়া যায়।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Dataset Lookup</h1><button id="b" type="button" data-user-id="42">Inspect</button><p id="o">ID:</p><script>const b=document.getElementById("b");b.onclick=()=>document.getElementById("o").textContent="ID: "+b.dataset.userId;</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Dataset Lookup',
      },
      {
        id: 'html-ch-22-p3',
        difficulty: 'Medium',
        title: '3. Schema.org JSON-LD Article Block',
        prompt: 'Add a valid `<script type="application/ld+json">` inside `<head>` describing a TechArticle.',
        banglaHint: '`<head>` এর ভেতর `<script type="application/ld+json">` যুক্ত করো।',
        starterCode: '<!doctype html>\n<html lang="en"><head><script type="application/ld+json">{"@context":"https://schema.org","@type":"TechArticle","headline":"Keyed DOM Lists"}</script></head><body><h1>Article Structured Data</h1></body></html>',
        sampleStdin: '',
        expectedOutput: 'Article Structured Data',
      },
      {
        id: 'html-ch-22-p4',
        difficulty: 'Medium',
        title: '4. Map-Backed Keyed List Updater',
        prompt: 'Store DOM elements in a `Map<id, li>` and update the text of an existing item in O(1).',
        banglaHint: '`new Map()`-এ নোডের রেফারেন্স সেভ রেখে সরাসরি টেক্সট আপডেট করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Map Keyed DOM</h1><ul id="u"></ul><script>const m=new Map();const u=document.getElementById("u");for(const k of ["A","B"]){const li=document.createElement("li");li.textContent=k;u.appendChild(li);m.set(k,li);}m.get("B").textContent="B (Updated O(1))";</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Map Keyed DOM',
      },
      {
        id: 'html-ch-22-p5',
        difficulty: 'Hard',
        title: '5. Deduplicated DocumentFragment Batch Render',
        prompt: 'Use `Set` + `DocumentFragment` + `<template>` to stamp 3 unique records in one DOM reflow.',
        banglaHint: '`DocumentFragment`-এ সব ক্লোন জড়ো করে শেষে একবার `appendChild` করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Batch Fragment Feed</h1><ul id="feed"></ul><template id="row"><li data-k=""></li></template><script>const seen=new Set();const frag=document.createDocumentFragment();const tpl=document.getElementById("row");for(const x of ["Alpha","Beta","alpha","Gamma"]){const k=x.toLowerCase();if(seen.has(k))continue;seen.add(k);const c=tpl.content.cloneNode(true);const li=c.querySelector("li");li.dataset.k=k;li.textContent=x;frag.appendChild(c);}document.getElementById("feed").appendChild(frag);</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Batch Fragment Feed',
      },
    ],
    miniBuild: {
      title: 'Keyed <template> + Set Deduplication Engine',
      description: 'Render unique keyed cards safely using HTML <template>, Map/Set deduplication, and Schema.org JSON-LD.',
      banglaGoal: '<template>, data-* কি ও JSON-LD মেটাডেটা মিলিয়ে XSS-নিরাপদ রেন্ডারিং ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–22',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Keyed Templates"}</script>
  <style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}li{padding:8px 12px;margin:6px 0;background:#1e293b;border-radius:8px}</style>
</head>
<body>
  <h1>Keyed Template Renderer</h1>
  <ul id="list"></ul>
  <template id="itemTpl"><li><strong data-field="name"></strong> — <span data-field="tag"></span></li></template>
  <script>
    const tpl = document.getElementById('itemTpl');
    const ul = document.getElementById('list');
    const seen = new Set();
    for (const row of [{ id: '1', name: 'HashMap', tag: 'O(1)' }, { id: '2', name: 'HashSet', tag: 'Unique' }]) {
      if (seen.has(row.id)) continue;
      seen.add(row.id);
      const frag = tpl.content.cloneNode(true);
      frag.querySelector('li').dataset.key = row.id;
      frag.querySelector('[data-field="name"]').textContent = row.name;
      frag.querySelector('[data-field="tag"]').textContent = row.tag;
      ul.appendChild(frag);
    }
  </script>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Keyed Template Renderer',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  li { padding: 8px 12px; margin: 6px 0; background: #1e293b; border-radius: 8px; }
</style>
</head>
<body>
  <h1>Keyed Template Renderer</h1>
  <ul id="list"></ul>
  <template id="itemTpl">
    <li><strong data-field="name"></strong> — <span data-field="tag"></span></li>
  </template>
  <script>
    const tpl = document.getElementById('itemTpl');
    const ul = document.getElementById('list');
    for (const row of [{ id: '1', name: 'HashMap', tag: 'O(1)' }, { id: '2', name: 'HashSet', tag: 'Unique' }]) {
      const frag = tpl.content.cloneNode(true);
      frag.querySelector('li').dataset.key = row.id;
      frag.querySelector('[data-field="name"]').textContent = row.name;
      frag.querySelector('[data-field="tag"]').textContent = row.tag;
      ul.appendChild(frag);
    }
  </script>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Keyed Template Renderer',
    testCases: [
      { id: 'html22-t1', input: '', expectedOutput: 'Keyed Template Renderer' },
      { id: 'html22-t2', input: '', expectedOutput: 'HashMap', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'HTML5 Chapter 23: Accessible Accordions, Disclosure Trees & Navigation Menus',
    banglaTitle: 'HTML5 অধ্যায় ২৩: অ্যাক্সেসিবল অ্যাকর্ডিয়ন, ডিসক্লোজার ট্রি ও নেভিগেশন মেনু',
    subtitle: 'Native <details>/<summary>, nested FAQ/directory trees, aria-expanded menus, and keyboard navigation semantics.',
    zeroIntuition: {
      plainEnglishStory:
        'Before writing 40 lines of accordion toggle JavaScript, reach for native HTML5 `<details>` and `<summary>`! Clicking `<summary>` expands or collapses content natively with keyboard Enter/Space support and automatic `open` state—no JavaScript required! Even better, HTML5 now supports `<details name="faq">` so only one accordion item stays open at a time natively.\n\nWhen building custom dropdown menus or tree navigation sidebars where JS controls visibility, pair `<button aria-expanded="false" aria-controls="menu">` with explicit Escape key closing so screen readers always know whether the subtree is collapsed or expanded.',
      asciiFlowchart: `  <details name="faq" open>
    <summary>What is BFS?</summary>  <-- Keyboard Enter/Space toggles [open]
    <p>Level-order Queue traversal!</p>
  </details>`,
      pseudocode: [
        '1. PREFER native <details> + <summary> for collapsible FAQ & tree disclosure',
        '2. ADD shared name="group" attribute on <details> for exclusive single-open accordions',
        '3. BIND aria-expanded & aria-controls on custom dropdown trigger <button> tags',
        '4. SUPPORT nested <nav aria-label="Breadcrumb"> + aria-current="page" hierarchies',
      ],
      banglaZeroToHero: {
        analogyTitle: 'জাভাস্ক্রিপ্ট ছাড়াই <details>/<summary> অ্যাকর্ডিয়ন ও অ্যাক্সেসিবল ট্রি (HTML5)',
        explanation:
          'FAQ প্রশ্নোত্তর, ফোল্ডার ট্রি বা সাইডবার ড্রপডাউন বানাতে অনেকেই `<div>` লুকিয়ে রেখে ৫০ লাইনের জাভাস্ক্রিপ্ট লেখে—অথচ HTML5-এর নেটিভ `<details>` এবং `<summary>` ট্যাগ এক লাইন জাভাস্ক্রিপ্ট ছাড়াই কীবোর্ড সাপোর্টসহ পুরো অ্যাকর্ডিয়ন কাজ করে! শুধু `<details>`-এর ভেতর সবার আগে একটি `<summary>` রাখতে হয়; ইউজার ক্লিক করলে বা Enter চাপলে স্বয়ংক্রিয়ভাবে `open` অ্যাট্রিবিউট যুক্ত হয় এবং ভেতরের তথ্য খুলে যায়। এমনকি একই `name="faq"` দিলে একসাথে মাত্র একটি প্যানেল খোলা থাকে—একটি খুললে আগেরটি নিজে থেকেই বন্ধ হয়! আর যদি কাস্টম নেভিগেশন মেনু ড্রপডাউন বাটনে জাভাস্ক্রিপ্ট দিয়ে চালাতে হয়, তবে বাটনে অবশ্যই `aria-expanded="false"` এবং `aria-controls="subMenuId"` বসাবে যাতে স্ক্রিন রিডার মেনুটি খোলা না বন্ধ তা ঘোষণা করতে পারে। নেভিগেশন ট্রি বা সাইডবারের বর্তমান পেজটি চিহ্নিত করতে লিংকে `aria-current="page"` বসানো পেশাদার মানদণ্ড!',
        everydayExample: 'বইয়ের ভাঁজ করা সূচিপত্র (`<details>`), যেখানে শিরোনামে (`<summary>`) ক্লিক করলেই ভাঁজ খুলে ভেতরের অধ্যায়গুলো দেখা যায়!',
        keyTakeaways: [
          'অ্যাকর্ডিয়ন বা ডিসক্লোজার বক্সে সবার আগে নেটিভ `<details>` ও `<summary>` ব্যবহার করো।',
          'এক্সক্লুসিভ সিঙ্গেল-ওপেন অ্যাকর্ডিয়নের জন্য সব `<details>`-এ অভিন্ন `name="faq"` যোগ করা যায়।',
          'কাস্টম ড্রপডাউন মেনু বাটনে `aria-expanded` ও `aria-controls` ব্যবহার বাধ্যতামূলক।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch23-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Zero-JS Accordion With Native <details> & <summary>',
        englishParagraphs: [
          'Native `<details>` toggles open/closed state via keyboard or click without a single line of JS, and styling `details[open] summary` highlights active sections cleanly.',
        ],
        banglaParagraphs: [
          'এক ফোঁটা জাভাস্ক্রিপ্ট ছাড়াই `<details>` এবং `<summary>` দিয়ে কীবোর্ড-বান্ধব অ্যাকর্ডিয়ন তৈরি।',
        ],
        memoryDiagram: 'details[open] -> summary shows indicator + reveals panel content',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  details { border: 1px solid #334155; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; background: #111827; }
  summary { font-weight: 700; cursor: pointer; color: #34d399; }
</style>
</head>
<body>
  <h1>Zero-JS Curriculum FAQ</h1>
  <details name="faq" open>
    <summary>When should I choose BFS over DFS?</summary>
    <p>Choose BFS with a FIFO Queue whenever you need the shortest unweighted path.</p>
  </details>
  <details name="faq">
    <summary>When should I choose a Stack?</summary>
    <p>Use a LIFO Stack for bracket matching, undo stacks, and Next Greater Element.</p>
  </details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Zero-JS Curriculum FAQ',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: '<details name="faq" open>', whatItMeans: 'Native disclosure widget grouped by shared name="faq".', whyItIsThere: 'Coordinates single-open accordion behavior without JS.', ifDeletedError: 'Section loses collapsible native behavior.' },
          { lineNumber: 'Line 13', codeSnippet: '<summary>When should I choose BFS over DFS?</summary>', whatItMeans: 'Keyboard-focusable disclosure toggle label.', whyItIsThere: 'Provides Enter/Space and click affordance natively.', ifDeletedError: 'Browser renders generic "Details" fallback label.' },
        ],
      },
      {
        id: 'html-ch23-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Accessible Dropdown Nav With aria-expanded & aria-controls',
        englishParagraphs: [
          'Toggling `aria-expanded` alongside panel `hidden` state keeps visual UI and screen-reader announcements cleanly synchronized.',
        ],
        banglaParagraphs: [
          'ড্রপডাউন বাটনে `aria-expanded` ও প্যানেলে `hidden` যুক্ত করে কীবোর্ড-বান্ধব মেনু নিয়ন্ত্রণ।',
        ],
        memoryDiagram: 'button[aria-expanded] <-> toggles ul#subMenu.hidden + Escape closes',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  button { padding: 8px 14px; border-radius: 8px; border: 0; background: #10b981; color: #022c22; font-weight: 700; cursor: pointer; }
  ul { list-style: none; padding: 8px 14px; background: #1e293b; border-radius: 8px; margin-top: 8px; }
</style>
</head>
<body>
  <h1>Accessible Disclosure Menu</h1>
  <nav aria-label="Track navigation">
    <button id="tog" type="button" aria-expanded="false" aria-controls="menuList">Tracks Menu</button>
    <ul id="menuList" hidden>
      <li><a href="#p4" style="color:#38bdf8">Phase 4: OOP</a></li>
      <li><a href="#p5" style="color:#38bdf8">Phase 5: Algorithms</a></li>
    </ul>
  </nav>
  <script>
    const b = document.getElementById('tog'), m = document.getElementById('menuList');
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      m.hidden = open;
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Accessible Disclosure Menu',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: '<button id="tog" type="button" aria-expanded="false" aria-controls="menuList">Tracks Menu</button>', whatItMeans: 'Links trigger button to target submenu with live expansion state.', whyItIsThere: 'Screen readers announce "Tracks Menu, collapsed/expanded".', ifDeletedError: 'Users receive no audio feedback on toggle.' },
        ],
      },
      {
        id: 'html-ch23-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Nested Hierarchical File Tree Using Nested <details>',
        englishParagraphs: [
          'Nesting `<details>` folders directly models filesystem or syllabus trees natively—preserving clean keyboard Tab order across branches!',
        ],
        banglaParagraphs: [
          'একের ভেতর আরেকটি `<details>` বসিয়ে সম্পূর্ণ ফাইল/ফোল্ডার ট্রি গঠন।',
        ],
        memoryDiagram: 'root details(src/) -> child details(data/) -> leaf code file',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: monospace; padding: 24px; background: #090d16; color: #e2e8f0; }
  details { margin-left: 16px; border-left: 1px dashed #334155; padding-left: 12px; }
  summary { cursor: pointer; color: #34d399; padding: 4px 0; }
</style>
</head>
<body>
  <h1>Nested Syllabus File Tree</h1>
  <details open>
    <summary>src/</summary>
    <details open>
      <summary>data/</summary>
      <div>lessons_html_p5.ts</div>
    </details>
  </details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Nested Syllabus File Tree',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: '<details open>', whatItMeans: 'Root expandable folder node initially expanded.', whyItIsThere: 'Models recursive DOM tree structure cleanly.', ifDeletedError: 'Tree root is missing.' },
        ],
      },
      {
        id: 'html-ch23-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Breadcrumb Trail With aria-current="page"',
        englishParagraphs: [
          'Breadcrumbs sit inside `<nav aria-label="Breadcrumb"><ol>` and flag the active leaf with `aria-current="page"` rather than omitting or mislabeling links.',
        ],
        banglaParagraphs: [
          'ব্রেডক্রাম্ব নেভিগেশনে `<nav aria-label="Breadcrumb"><ol>` এবং বর্তমান পাতায় `aria-current="page"` ব্যবহারের নিয়ম।',
        ],
        memoryDiagram: 'nav[aria-label="Breadcrumb"] -> ol -> li(a[aria-current="page"])',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc;">
  <h1>Semantic Breadcrumb Trail</h1>
  <nav aria-label="Breadcrumb">
    <ol style="display:flex;gap:10px;list-style:none;padding:0;">
      <li><a href="#home" style="color:#38bdf8">Home</a> /</li>
      <li><a href="#html" style="color:#38bdf8">HTML5</a> /</li>
      <li><a href="#ch23" aria-current="page" style="color:#34d399;font-weight:700">Chapter 23</a></li>
    </ol>
  </nav>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Semantic Breadcrumb Trail',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: '<li><a href="#ch23" aria-current="page"', whatItMeans: 'Marks the active page inside navigation tree.', whyItIsThere: 'Tells assistive users their exact current route.', ifDeletedError: 'Active page looks identical to ancestor links.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 11', codeSnippet: '<h1>Zero-JS Curriculum FAQ</h1>', whatItMeans: 'Primary page heading introducing FAQ accordion.', whyItIsThere: 'Provides structural heading hierarchy.', ifDeletedError: 'Page lacks primary H1.' },
      { lineNumber: 'Line 12', codeSnippet: '<details name="faq" open>', whatItMeans: 'Expandable native disclosure box initially open.', whyItIsThere: 'Eliminates manual JS show/hide boilerplate.', ifDeletedError: 'Accordion panel collapses permanently.' },
      { lineNumber: 'Line 13', codeSnippet: '<summary>When should I choose BFS over DFS?</summary>', whatItMeans: 'Interactive button-like disclosure heading.', whyItIsThere: 'Accepts click, Enter, and Space natively.', ifDeletedError: 'Default "Details" text displays instead.' },
      { lineNumber: 'Line 14', codeSnippet: '<p>Choose BFS with a FIFO Queue whenever you need the shortest unweighted path.</p>', whatItMeans: 'Hidden-until-open body content inside details.', whyItIsThere: 'Separates summary question from detailed answer.', ifDeletedError: 'Accordion opens empty box.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Load page', memoryOrStack: 'First <details open> visible; second closed', note: 'Grouped under name="faq"' },
      { step: 2, state: 'User clicks 2nd <summary>', memoryOrStack: 'Browser closes 1st <details>', note: 'Opens 2nd <details> natively' },
      { step: 3, state: 'Screen reader reads toggle', memoryOrStack: 'Announces expanded/collapsed automatically', note: 'Zero ARIA JS needed' },
      { step: 4, state: 'Keyboard Tab + Enter', memoryOrStack: 'Cycles clean focus outline across summaries', note: 'Full WCAG compliance' },
    ],
    harryBugTraps: [
      {
        title: 'Placing Heading Tags Without Native <summary> Wrapper',
        brokenCode: '<div class="accordion-header" onclick="toggle()">Question</div>',
        fixedCode: '<details><summary>Question</summary><p>Answer</p></details>',
        whyItBreaks: 'Clickable divs lack keyboard focus, Enter/Space handlers, and screen-reader expanded state.',
      },
      {
        title: 'Forgetting type="button" on Custom Disclosure Buttons Inside Forms',
        brokenCode: '<form><button aria-expanded="false">Toggle</button></form> // submits form!',
        fixedCode: '<form><button type="button" aria-expanded="false">Toggle</button></form>',
        whyItBreaks: 'A button without type defaults to submit, unexpectedly reloading or submitting surrounding forms.',
      },
      {
        title: 'Hiding Menus With opacity: 0 While Leaving Keyboard Focusable Links Active',
        brokenCode: '.menu { opacity: 0; } // Tab still lands inside invisible menu links!',
        fixedCode: '<ul id="menu" hidden><li><a href="#">Item</a></li></ul>',
        whyItBreaks: 'Keyboard users tab invisibly into hidden elements unless `hidden` or `display: none` removes them.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-23-p1',
        difficulty: 'Easy',
        title: '1. Native <details> & <summary> Disclosure',
        prompt: 'Create a native `<details>` element with `<summary>` and a hidden answer paragraph.',
        banglaHint: '`<details>` ট্যাগের ভেতরে প্রথমে `<summary>` দিয়ে তারপর `<p>` দাও।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Disclosure Box</h1><details><summary>Show Hint</summary><p>Use a Queue for BFS!</p></details></body></html>',
        sampleStdin: '',
        expectedOutput: 'Disclosure Box',
      },
      {
        id: 'html-ch-23-p2',
        difficulty: 'Easy',
        title: '2. Exclusive Accordion Using name="group"',
        prompt: 'Write two `<details name="g">` items where the first starts with `open`.',
        banglaHint: 'উভয় `<details>`-এ অভিন্ন `name="g"` ব্যবহার করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Exclusive FAQ</h1><details name="g" open><summary>Item 1</summary><p>Body 1</p></details><details name="g"><summary>Item 2</summary><p>Body 2</p></details></body></html>',
        sampleStdin: '',
        expectedOutput: 'Exclusive FAQ',
      },
      {
        id: 'html-ch-23-p3',
        difficulty: 'Medium',
        title: '3. Toggle Dropdown With aria-expanded',
        prompt: 'Wire a `<button type="button" aria-expanded="false">` toggling `<ul hidden>` cleanly.',
        banglaHint: 'ক্লিক হলে `aria-expanded` ও `hidden` উল্টে দাও।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>ARIA Dropdown</h1><button id="b" type="button" aria-expanded="false" aria-controls="u">Menu</button><ul id="u" hidden><li>Link 1</li></ul><script>const b=document.getElementById("b"),u=document.getElementById("u");b.onclick=()=>{const o=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",String(!o));u.hidden=o;};</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'ARIA Dropdown',
      },
      {
        id: 'html-ch-23-p4',
        difficulty: 'Medium',
        title: '4. Breadcrumb Navigation With aria-current="page"',
        prompt: 'Build `<nav aria-label="Breadcrumb"><ol>` marking the current route leaf with `aria-current="page"`.',
        banglaHint: 'বর্তমান পেজের লিংকে `aria-current="page"` অ্যাট্রিবিউট যোগ করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Route Breadcrumb</h1><nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/ch23" aria-current="page">Ch 23</a></li></ol></nav></body></html>',
        sampleStdin: '',
        expectedOutput: 'Route Breadcrumb',
      },
      {
        id: 'html-ch-23-p5',
        difficulty: 'Hard',
        title: '5. Multi-Level Folder Tree Accordion',
        prompt: 'Nest two levels of `<details>` elements to represent a collapsible directory tree.',
        banglaHint: 'প্যারেন্ট `<details>`-এর ভেতর আরেকটি `<details>` বসাও।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Tree Directory</h1><details open><summary>workspace/</summary><details open><summary>src/</summary><p>index.html</p></details></details></body></html>',
        sampleStdin: '',
        expectedOutput: 'Tree Directory',
      },
    ],
    miniBuild: {
      title: 'Accessible Accordion, Dropdown & File Tree Navigator',
      description: 'Combines zero-JS native <details> groups, aria-expanded menus, and aria-current breadcrumbs.',
      banglaGoal: 'নেটিভ <details>, aria-expanded মেনু ও ব্রেডক্রাম্ব সমন্বিত অ্যাক্সেসিবল ন্যাভিগেশন তৈরি।',
      combinesChapters: 'Ch 1–23',
      starterCode: `<!doctype html>
<html lang="en">
<head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}details{border:1px solid #334155;border-radius:10px;padding:12px;margin:8px 0;background:#111827}summary{color:#34d399;font-weight:700;cursor:pointer}</style></head>
<body>
  <h1>Zero-JS Curriculum FAQ</h1>
  <nav aria-label="Breadcrumb"><a href="#ch23" aria-current="page" style="color:#38bdf8">Chapter 23: Accordions &amp; Trees</a></nav>
  <details name="faq" open><summary>Stack vs Queue?</summary><p>Stack is LIFO; Queue is FIFO.</p></details>
  <details name="faq"><summary>Nested Directory</summary><details><summary>docs/</summary><p>guide.html</p></details></details>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Zero-JS Curriculum FAQ',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  details { border: 1px solid #334155; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; background: #111827; }
  summary { font-weight: 700; cursor: pointer; color: #34d399; }
</style>
</head>
<body>
  <h1>Zero-JS Curriculum FAQ</h1>
  <details name="faq" open>
    <summary>When should I choose BFS over DFS?</summary>
    <p>Choose BFS with a FIFO Queue whenever you need the shortest unweighted path.</p>
  </details>
  <details name="faq">
    <summary>When should I choose a Stack?</summary>
    <p>Use a LIFO Stack for bracket matching, undo stacks, and Next Greater Element.</p>
  </details>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Zero-JS Curriculum FAQ',
    testCases: [
      { id: 'html23-t1', input: '', expectedOutput: 'Zero-JS Curriculum FAQ' },
      { id: 'html23-t2', input: '', expectedOutput: 'When should I choose BFS over DFS?', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'HTML5 Chapter 24: Async Loading States, aria-busy, Error Alerts & Defer Scripts',
    banglaTitle: 'HTML5 অধ্যায় ২৪: অ্যাসিঙ্ক লোডিং স্টেট, aria-busy, এরর অ্যালার্ট ও ডিফার স্ক্রিপ্ট',
    subtitle: 'Script defer/type="module" non-blocking loading, aria-busy="true" skeletons, role="alert" error boundaries, and async DOM safety.',
    zeroIntuition: {
      plainEnglishStory:
        'A raw `<script src="app.js">` inside `<head>` freezes HTML parsing dead until the entire script downloads and runs! Adding `defer` or `type="module"` lets the browser download scripts in parallel while parsing semantic HTML continuously, executing strictly in order once DOM construction completes.\n\nWhen async fetches run inside a web app, signal active loading cleanly with `aria-busy="true"` on the region container and report failures politely via `<div role="alert">` so both sighted and screen-reader users immediately receive actionable feedback without unhandled UI crashes.',
      asciiFlowchart: `  <script defer src="app.js"> -> Non-blocking HTML Parse + Parallel Fetch -> Runs when DOM ready
  Region State: aria-busy="true" (Skeleton) ---> resolved! ---> aria-busy="false" | role="alert"`,
      pseudocode: [
        '1. LOAD head scripts with `defer` or `type="module"` so HTML parsing never stalls',
        '2. SET aria-busy="true" on active async container while showing CSS loading skeleton',
        '3. WRAP fetch/JSON parsing in try/catch rendering errors inside `role="alert"`',
        '4. DISABLE duplicate form submit actions during in-flight async requests cleanly',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নন-ব্লকিং defer স্ক্রিপ্ট, aria-busy স্কেলিটন ও role="alert" এরর বাউন্ডারি (HTML5)',
        explanation:
          'ওয়েবপেজের `<head>` অংশে সাধারণ `<script src="app.js">` রাখলে স্ক্রিপ্ট ডাউনলোড ও রান হওয়া পর্যন্ত ব্রাউজার বাকি HTML পড়া সম্পূর্ণ বন্ধ করে রাখে—যাকে Render Blocking বলে! এর বদলে `<script defer>` অথবা `<script type="module">` লিখলে HTML পার্সিং থেমে না থেকে সমান্তরালে স্ক্রিপ্ট ডাউনলোড হয় এবং DOM তৈরি শেষে ক্রম অনুযায়ী চলে। বাস্তব ওয়েব অ্যাপে যখন সার্ভার থেকে ডেটা আসে (Async Fetch), তখন লোড হওয়ার সময় কন্টেইনারে `aria-busy="true"` ও সুন্দর স্কেলিটন কার্ড দেখালে ইউজার বুঝতে পারে কাজ চলছে। আর যদি নেটওয়ার্ক ব্যর্থ হয় বা JSON ভুল আসে, তবে প্রোগ্রাম ক্র্যাশ না করে `<div role="alert">` এর ভেতর স্পষ্ট এরর মেসেজ দেখালে স্ক্রিন রিডার সাথে সাথেই সতর্কবার্তা পড়ে শোনায়! এছাড়া ফর্ম সাবমিট করার সময় ডাবল-ক্লিক ঠেকাতে বাটন সাময়িকভাবে `disabled` রাখা বা `aria-busy` ব্যবহার করা প্রোডাকশন UI-এর অপরিহার্য নিয়ম।',
        everydayExample: 'রেস্তোরাঁর রান্না তৈরি হতে থাকলে ওয়েটার টেবিলে "রান্না হচ্ছে..." কার্ড (`aria-busy="true"`) রেখে যায় এবং খাবার না থাকলে স্পষ্ট জানিয়ে দেয় (`role="alert"`)!',
        keyTakeaways: [
          '`<head>` স্ক্রিপ্টে `defer` বা `type="module"` দিলে পেজের প্রথম রেন্ডারিং দ্রুত হয় ও DOM missing এরর হয় না।',
          'অ্যাসিঙ্ক লোডিং চলাকালে কন্টেইনারে `aria-busy="true"` ও কাজ শেষে `"false"` সেট করো।',
          'এরর মেসেজ দেখাতে `<div role="alert">` ব্যবহার করো যাতে অ্যাসিস্টিভ টেক তৎক্ষণাৎ তা ঘোষণা করে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch24-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Loading Skeleton Container With aria-busy="true"',
        englishParagraphs: [
          'Marking an async feed `<section id="feed" aria-busy="true">` communicates active loading semantically while CSS animates clean placeholder shimmer blocks.',
        ],
        banglaParagraphs: [
          '`aria-busy="true"` অ্যাট্রিবিউট ও CSS স্কেলিটন কার্ড ব্যবহার করে অ্যাসিঙ্ক লোডিং অবস্থার নকশা।',
        ],
        memoryDiagram: 'section[aria-busy="true"] -> shows skeleton -> sets aria-busy="false" + content',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  .skel { height: 22px; border-radius: 6px; background: #1e293b; margin: 8px 0; }
</style>
</head>
<body>
  <h1>Async Loading Boundary</h1>
  <section id="feed" aria-busy="true" aria-label="Activity Feed">
    <div class="skel"></div>
    <p id="msg">Loading latest submissions...</p>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Async Loading Boundary',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: '<section id="feed" aria-busy="true" aria-label="Activity Feed">', whatItMeans: 'Signals screen readers that region is mid-update.', whyItIsThere: 'Prevents premature reading of incomplete skeleton DOM.', ifDeletedError: 'Users hear partial UI elements while fetching.' },
        ],
      },
      {
        id: 'html-ch24-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Accessible Error Boundary Using role="alert"',
        englishParagraphs: [
          'Populating `<div id="err" role="alert">...</div>` interrupts politely to warn users immediately when validation or JSON parsing fails.',
        ],
        banglaParagraphs: [
          'ভুল ইনপুট বা পার্স এরর হলে `<div role="alert">`-এ স্পষ্ট সতর্কবার্তা দেখানোর পদ্ধতি।',
        ],
        memoryDiagram: 'try parse JSON -> fail -> alertBox.hidden=false + role="alert"',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  .err { margin-top: 12px; padding: 10px 14px; border-radius: 8px; background: #450a0a; border: 1px solid #ef4444; color: #fecaca; }
</style>
</head>
<body>
  <h1>JSON Payload Guard</h1>
  <button id="test" type="button">Parse Payload</button>
  <div id="err" class="err" role="alert" hidden></div>
  <script>
    document.getElementById('test').addEventListener('click', () => {
      const box = document.getElementById('err');
      try { JSON.parse('{bad_json}'); }
      catch (e) { box.textContent = 'ERR_PARSE: Malformed JSON payload'; box.hidden = false; }
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'JSON Payload Guard',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: '<div id="err" class="err" role="alert" hidden></div>', whatItMeans: 'Live assertive alert banner revealed cleanly upon error.', whyItIsThere: 'Surfaces async/parse failures clearly to all users.', ifDeletedError: 'Silent crash with zero visible error feedback.' },
        ],
      },
      {
        id: 'html-ch24-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Promise.all Parallel Widget Loader State Machine',
        englishParagraphs: [
          'Simulating two async jobs via `Promise.all` resolves concurrently in max-latency time and flips `aria-busy` back to `"false"` inside `finally`!',
        ],
        banglaParagraphs: [
          '`Promise.all` ও `finally` ব্লক দিয়ে অ্যাসিঙ্ক লোডিং শেষে নিশ্চিতভাবে `aria-busy="false"` রিসেট করা।',
        ],
        memoryDiagram: 'aria-busy="true" -> try await Promise.all(...) -> finally aria-busy="false"',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc;">
  <h1>Concurrent Widget Loader</h1>
  <section id="panel" aria-busy="false">
    <p id="out">Idle — click Load</p>
    <button id="go" type="button">Load Both</button>
  </section>
  <script>
    document.getElementById('go').addEventListener('click', async () => {
      const panel = document.getElementById('panel'), out = document.getElementById('out');
      panel.setAttribute('aria-busy', 'true');
      out.textContent = 'Fetching concurrently...';
      try {
        const [a, b] = await Promise.all([Promise.resolve(120), Promise.resolve(30)]);
        out.textContent = 'Loaded total XP: ' + (a + b);
      } finally {
        panel.setAttribute('aria-busy', 'false');
      }
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Concurrent Widget Loader',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: "finally { panel.setAttribute('aria-busy', 'false'); }", whatItMeans: 'Always clears busy indicator whether Promise succeeds or rejects.', whyItIsThere: 'Prevents UI from getting permanently stuck loading.', ifDeletedError: 'Panel remains stuck in aria-busy="true" after errors.' },
        ],
      },
      {
        id: 'html-ch24-t4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Non-Blocking ES Module / Defer Script Ordering',
        englishParagraphs: [
          'Marking scripts with `<script type="module">` automatically defers execution until HTML DOM nodes exist, eliminates global variable leakage, and enables strict ES imports!',
        ],
        banglaParagraphs: [
          '`<script type="module">` ব্যবহার করলে কোড অটোমেটিক `defer` হয় এবং গ্লোবাল স্কোপ দূষিত হয় না।',
        ],
        memoryDiagram: '<script type="module"> -> deferred automatically, module-scoped variables',
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Deferred Module Boot</title>
</head>
<body style="font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc;">
  <h1>Modular Script Lifecycle</h1>
  <p id="boot">Waiting for module...</p>
  <script type="module">
    const target = document.getElementById('boot');
    if (target) target.textContent = 'Module executed cleanly after DOM ready!';
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Modular Script Lifecycle',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: '<script type="module">', whatItMeans: 'Enables ES module scope and automatic deferred DOM parsing.', whyItIsThere: 'Keeps variables encapsulated without polluting window.*', ifDeletedError: 'Inline globals collide across scripts.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 10', codeSnippet: '<h1>Async Loading Boundary</h1>', whatItMeans: 'Main page heading.', whyItIsThere: 'Labels the async feed workspace.', ifDeletedError: 'Missing page heading.' },
      { lineNumber: 'Line 11', codeSnippet: '<section id="feed" aria-busy="true" aria-label="Activity Feed">', whatItMeans: 'Live region flagging pending async load state.', whyItIsThere: 'Communicates busy state cleanly to assistive tools.', ifDeletedError: 'Screen readers lack busy context.' },
      { lineNumber: 'Line 12', codeSnippet: '<div class="skel"></div>', whatItMeans: 'Visual placeholder block matching upcoming content height.', whyItIsThere: 'Prevents jarring layout shift (CLS) when data arrives.', ifDeletedError: 'Page jumps abruptly once content loads.' },
      { lineNumber: 'Line 13', codeSnippet: '<p id="msg">Loading latest submissions...</p>', whatItMeans: 'Clear status fallback text inside busy region.', whyItIsThere: 'Readable fallback for all users.', ifDeletedError: 'Empty placeholder without status context.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Render initial DOM', memoryOrStack: 'section[aria-busy="true"] + .skel', note: 'Immediate zero-CLS frame' },
      { step: 2, state: 'Start async fetch', memoryOrStack: 'Button disabled to prevent double click', note: 'Parallel Promise.all runs' },
      { step: 3, state: 'On failure / bad JSON', memoryOrStack: 'role="alert" reveals exact error', note: 'User notified cleanly' },
      { step: 4, state: 'finally block completes', memoryOrStack: 'aria-busy="false", skeleton replaced', note: 'Accessible interactive state' },
    ],
    harryBugTraps: [
      {
        title: 'Putting Synchronous <script> Before Body Without defer',
        brokenCode: '<head><script>document.getElementById("title").textContent="Hi";</script></head><body><h1 id="title"></h1></body>',
        fixedCode: '<head><script defer src="app.js"></script></head>',
        whyItBreaks: 'Inline or synchronous <head> scripts run BEFORE <body> is parsed, returning null on getElementById!',
      },
      {
        title: 'Forgetting to Reset aria-busy="false" on Failed Fetches',
        brokenCode: 'el.ariaBusy="true"; await fetchData(); el.ariaBusy="false"; // skipped if fetch throws!',
        fixedCode: '<section aria-live="polite" id="s"><p>Wrap cleanup in try { ... } finally { s.setAttribute("aria-busy","false"); }</p></section>',
        whyItBreaks: 'Without a finally block, network rejections leave the UI trapped in loading state permanently.',
      },
      {
        title: 'Showing Errors Only in console.error Without role="alert" UI',
        brokenCode: 'catch (e) { console.error(e); } // Invisible to normal users!',
        fixedCode: '<div role="alert">ERR_NETWORK: Please retry.</div>',
        whyItBreaks: 'Users cannot see DevTools console messages; every user-facing failure needs an accessible alert element.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-24-p1',
        difficulty: 'Easy',
        title: '1. Busy Skeleton Region With aria-busy="true"',
        prompt: 'Create a `<section aria-busy="true" aria-label="Stats">` containing a placeholder status message.',
        banglaHint: '`<section aria-busy="true">` দিয়ে অ্যাসিঙ্ক লোডিং এলাকা চিহ্নিত করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Skeleton Loader</h1><section aria-busy="true" aria-label="Stats"><p>Loading stats...</p></section></body></html>',
        sampleStdin: '',
        expectedOutput: 'Skeleton Loader',
      },
      {
        id: 'html-ch-24-p2',
        difficulty: 'Easy',
        title: '2. Role="alert" Validation Error Box',
        prompt: 'Build an empty `<div id="err" role="alert">` triggered when JSON.parse catches an error.',
        banglaHint: '`try { JSON.parse(...) } catch { ... }` দিয়ে `role="alert"` বক্সে মেসেজ বসাও।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Alert Error Boundary</h1><div id="err" role="alert"></div><script>try{JSON.parse("{")}catch(e){document.getElementById("err").textContent="Parse Error";}</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Alert Error Boundary',
      },
      {
        id: 'html-ch-24-p3',
        difficulty: 'Medium',
        title: '3. ES Module <script type="module"> DOM Update',
        prompt: 'Use `<script type="module">` to isolate scope and safely update an element’s `textContent`.',
        banglaHint: '`<script type="module">` ব্লকের ভেতর `#st` এলিমেন্টের টেক্সট বদলাও।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>ES Module Lifecycle</h1><p id="st">Pending</p><script type="module">document.getElementById("st").textContent="Module Ready";</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'ES Module Lifecycle',
      },
      {
        id: 'html-ch-24-p4',
        difficulty: 'Medium',
        title: '4. Try/Finally Safe Loader Reset',
        prompt: 'Toggle `aria-busy` to `"true"` then guarantee `"false"` inside a `finally` block.',
        banglaHint: '`try { ... } finally { sec.setAttribute("aria-busy", "false"); }` ব্যবহার করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Finally Reset Pattern</h1><section id="s" aria-busy="true"><p id="p">Working</p></section><script>(async()=>{const s=document.getElementById("s");try{await Promise.resolve();document.getElementById("p").textContent="Done";}finally{s.setAttribute("aria-busy","false");}})();</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Finally Reset Pattern',
      },
      {
        id: 'html-ch-24-p5',
        difficulty: 'Hard',
        title: '5. Form Double-Submit Disabled Guard + Alert',
        prompt: 'Prevent double clicks on submit button using `.disabled = true`, try/catch/finally, and `role="alert"`.',
        banglaHint: 'রিকোয়েস্ট চলার সময় বাটন `disabled = true` করে `finally`-তে আবার `false` করো।',
        starterCode: '<!doctype html>\n<html lang="en"><body><h1>Idempotent Async Form</h1><form id="f"><button id="btn" type="submit">Run</button><div id="a" role="alert"></div></form><script>document.getElementById("f").onsubmit=async(e)=>{e.preventDefault();const b=document.getElementById("btn");b.disabled=true;try{document.getElementById("a").textContent="Submitted!";}finally{b.disabled=false;}};</script></body></html>',
        sampleStdin: '',
        expectedOutput: 'Idempotent Async Form',
      },
    ],
    miniBuild: {
      title: 'Accessible Async Skeleton, Alert Boundary & Module App',
      description: 'Demonstrates aria-busy skeletons, try/catch/finally error alerts, and module-scoped DOM bootstrapping.',
      banglaGoal: 'aria-busy স্কেলিটন, role="alert" এরর বাউন্ডারি ও মডিউল স্ক্রিপ্টের সমন্বিত অ্যাসিঙ্ক UI তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `<!doctype html>
<html lang="en">
<head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}.skel{height:18px;background:#1e293b;border-radius:6px;margin:8px 0}</style></head>
<body>
  <h1>Async Loading Boundary</h1>
  <section id="feed" aria-busy="true" aria-label="Activity Feed">
    <div class="skel"></div>
    <p id="msg">Loading latest submissions...</p>
  </section>
  <div id="err" role="alert"></div>
  <script type="module">
    const feed = document.getElementById('feed'), msg = document.getElementById('msg');
    try { await Promise.resolve(); msg.textContent = 'Loaded cleanly!'; }
    catch { document.getElementById('err').textContent = 'ERR_LOAD'; }
    finally { feed.setAttribute('aria-busy', 'false'); }
  </script>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Async Loading Boundary',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }
  .skel { height: 22px; border-radius: 6px; background: #1e293b; margin: 8px 0; }
</style>
</head>
<body>
  <h1>Async Loading Boundary</h1>
  <section id="feed" aria-busy="true" aria-label="Activity Feed">
    <div class="skel"></div>
    <p id="msg">Loading latest submissions...</p>
  </section>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Async Loading Boundary',
    testCases: [
      { id: 'html24-t1', input: '', expectedOutput: 'Async Loading Boundary' },
      { id: 'html24-t2', input: '', expectedOutput: 'Loading latest submissions...', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'HTML5 Chapter 25: Full-Stack Accessible Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'HTML5 অধ্যায় ২৫: পূর্ণাঙ্গ অ্যাক্সেসিবল ওয়েবসাইট আর্কিটেকচার (মেগা ক্যাপস্টোন)',
    subtitle: 'Semantic landmarks, CSS Grid layout, accessible ARIA forms, interactive <dialog>/<details>, and JSON-LD SEO metadata (Ch 1–25).',
    zeroIntuition: {
      plainEnglishStory:
        'A production-ready modern website brings EVERY layer of web craftsmanship together in harmony: semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) for assistive screen readers and search engines; responsive CSS Grid + Custom Properties (`--accent`, `clamp()`) for zero-horizontal-overflow across phones and 4K displays; accessible HTML forms wired with `<label for>`, validation constraints, and `role="alert"` boundaries; progressive native `<details>` and `<dialog>` components; and Schema.org `<script type="application/ld+json">` metadata in `<head>`.\n\nIn this HTML5 Mega Capstone, you unite all 25 chapters into one clean, responsive, accessible Full-Stack Architecture Blueprint ready to connect to any backend API!',
      asciiFlowchart: `  <head>: charset, viewport, description, <script type="application/ld+json">
  <body>:
    <header> (Skip Link + Primary <nav aria-label>)
    <main id="content" class="grid-shell">
      <section> Hero + Live <form aria-describedby> + <article> Cards </section>
      <aside> Quick Stats / <details> FAQ </aside>
    </main>
    <footer> Legal & Status </footer>`,
      pseudocode: [
        '1. DECLARE semantic landmarks (<header>, <nav>, <main>, <aside>, <footer>) + skip link',
        '2. DESIGN responsive 2-column CSS Grid (minmax(0, 1fr)) collapsing cleanly on mobile',
        '3. WIRE accessible <form> inputs with explicit <label for> and live role="status" feedback',
        '4. INCLUDE native <details> FAQ and JSON-LD structured metadata in <head>',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বপ্নের পূর্ণাঙ্গ ওয়েবসাইট আর্কিটেকচার ও প্রোডাকশন চেকলিস্ট (Mega Capstone)',
        explanation:
          'একটি প্রফেশনাল ওয়েবসাইট শুধু সুন্দর ডিজাইনের সমষ্টি নয়—এটি হলো নিখুঁত কাঠামো (Architecture)! প্রথমে `<head>` অংশে UTF-8 মেটা, রেস্পন্সিভ `viewport`, `<title>`, ও গুগল সার্চের জন্য JSON-LD স্কিমা ডেটা থাকে। এরপর `<body>` শুরু হয় একটি কিবোর্ড `Skip to main content` লিংক ও `<header><nav>` দিয়ে। মূল কনটেন্ট থাকে `<main>` ট্যাগের ভেতরে রেস্পন্সিভ CSS Grid লেআউটে—যেখানে বামে প্রধান অ্যাপ বা ফর্ম (`<section>`) আর ডানে সাইডবার (`<aside>`) থাকে, এবং ছোট স্ক্রিনে নিজে থেকেই এক কলামে নেমে আসে! প্রতিটি ইনপুটে বাধ্যতামূলক `<label for>` যুক্ত থাকে, অ্যাসিঙ্ক আপডেটের জন্য `aria-live="polite"` ব্যবহার করা হয়, আর ক্লিক করলেই খোলা-বন্ধ হওয়ার জন্য JavaScript ছাড়াই নেটিভ `<details>` বা `<dialog>` ব্যবহার করা যায়! এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এ শেখা প্রতিটি HTML5 + CSS3 + অ্যাক্সেসিবিলিটি কৌশল একসাথে যুক্ত করে একটি সম্পূর্ণ প্রোডাকশন-রেডি ফুল-স্ট্যাক ল্যান্ডিং ও অ্যাপ শেল তৈরি করবে!',
        everydayExample:
          'একটি আধুনিক শপিং মল—যার সাইনবোর্ড (`<header>/<nav>`), মূল দোকান (`<main>`), ফায়ার এক্সিট (`Skip link`), এবং তথ্য ডেস্ক (`<aside>/<details>`) সব নিখুঁত জায়গায় সাজানো থাকে!',
        keyTakeaways: [
          'কখনো পুরো লেআউট শুধু `<div>` দিয়ে বানাবে না; `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` ল্যান্ডমার্ক দেবে।',
          'CSS Grid কলামে ওভারফ্লো ঠেকাতে `minmax(0, 1fr)` ও অ্যাক্সেসিবিলিটির জন্য `:focus-visible` রিং দেবে।',
          'ফর্ম রেসপন্স ও স্ট্যাটাস মেসেজ স্ক্রিন রিডারে ঘোষণা করতে `aria-live="polite"` বা `role="alert"` ব্যবহার করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch25-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Semantic Document Shell With JSON-LD SEO Metadata',
        englishParagraphs: [
          'Pairing UTF-8 viewport metadata, Schema.org `application/ld+json`, and semantic `<header><main><footer>` landmarks forms the bedrock of every production web page.',
        ],
        banglaParagraphs: [
          '`<head>`-এ মেটা ও JSON-LD স্কিমা এবং `<body>`-তে `<header>`, `<main>`, `<footer>` ল্যান্ডমার্ক বসানো হয়েছে।',
        ],
        memoryDiagram: '<head>(meta + JSON-LD) -> <body>(<header> + <main> + <footer>)',
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Argon Full-Stack Blueprint</title>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"Argon Studio"}</script>
</head>
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <header><h1>Full-Stack Blueprint</h1></header>
  <main><p>Semantic landmark architecture ready for API integration.</p></main>
  <footer><small>Production Shell v1.0</small></footer>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Full-Stack Blueprint',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '<script type="application/ld+json">...</script>', whatItMeans: 'Embeds machine-readable Schema.org metadata for search engines.', whyItIsThere: 'Enables rich search cards without visible clutter.', ifDeletedError: 'Search crawlers lack structured metadata.' },
        ],
      },
      {
        id: 'html-ch25-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Accessible Form Card With Label Association & Live Feedback',
        englishParagraphs: [
          'Connecting `<label for="handle">` to `<input id="handle">` and announcing submission feedback inside `aria-live="polite"` fulfills core WCAG 2.2 accessibility standards.',
        ],
        banglaParagraphs: [
          '`<label for>` ও `aria-live="polite"` ব্যবহার করে স্ক্রিন-রিডার বান্ধব ফর্ম সাবমিশন তৈরি করা হয়েছে।',
        ],
        memoryDiagram: 'form submit -> preventDefault() -> live status announcement',
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h1>Signup Endpoint Form</h1>
  <form id="f">
    <label for="u">Developer Handle</label>
    <input id="u" name="u" required minlength="2" placeholder="argon" />
    <button type="submit">Join Workspace</button>
  </form>
  <p id="status" role="status" aria-live="polite"></p>
  <script>
    document.getElementById('f').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('status').textContent = 'Registered: ' + document.getElementById('u').value;
    });
  </script>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Signup Endpoint Form',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: '<label for="u">Developer Handle</label>', whatItMeans: 'Programmatically links text label to input control.', whyItIsThere: 'Allows screen readers to announce input purpose and expands click hit area.', ifDeletedError: 'Unlabeled input fails accessibility audits.' },
        ],
      },
      {
        id: 'html-ch25-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Responsive CSS Grid Dashboard + Native <details> FAQ',
        englishParagraphs: [
          'Using CSS Grid `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` paired with native `<details><summary>` creates zero-JS responsive cards and accordions.',
        ],
        banglaParagraphs: [
          'CSS Grid `auto-fit` ও নেটিভ `<details>` ব্যবহার করে কোনো ফ্রেমওয়ার্ক ছাড়াই রেস্পন্সিভ কার্ড ও FAQ বানানো হয়েছে।',
        ],
        memoryDiagram: 'CSS Grid (auto-fit, minmax(220px, 1fr)) + native <details>',
        code: `<!doctype html>
<html lang="en">
<head>
<style>
  body { font-family: system-ui; background: #090d16; color: #f8fafc; padding: 24px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .card { padding: 16px; border-radius: 12px; background: #111827; border: 1px solid #334155; }
</style>
</head>
<body>
  <h1>Responsive Grid &amp; Native Accordion</h1>
  <div class="grid">
    <article class="card"><h2>API Latency</h2><p>12ms p99</p></article>
    <article class="card"><h2>Uptime</h2><p>99.98%</p></article>
  </div>
  <details style="margin-top:16px;"><summary>How does auth work?</summary><p>HTTP-only cookies + CSRF guard.</p></details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Responsive Grid & Native Accordion',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));', whatItMeans: 'Automatically wraps grid tracks across mobile and desktop viewports.', whyItIsThere: 'Eliminates brittle manual media queries for card grids.', ifDeletedError: 'Cards stack strictly vertically on wide monitors.' },
        ],
      },
      {
        id: 'html-ch25-t4',
        badge: 'Example 4: Production Capstone',
        title: 'Mega Capstone: Full-Stack Website Architecture Shell',
        englishParagraphs: [
          'Combines semantic `<header>`, `<nav>`, `<main>`, `<aside>`, CSS custom properties, responsive grid shell, accessible interactive API tester form, and footer cleanly inside one self-contained HTML5 document.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): সিমান্টিক ল্যান্ডমার্ক, CSS Grid শেল, অ্যাক্সেসিবল ফর্ম এবং লাইভ UI ফিডব্যাকসহ সম্পূর্ণ ওয়েবসাইট ব্লুপ্রিন্ট!',
        ],
        memoryDiagram: '<header><nav> -> <main>(Grid: Hero + Form + Aside FAQ) -> <footer>',
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Full-Stack App Shell — Mega Capstone</title>
  <style>
    :root { --bg: #07090d; --card: #0e131d; --accent: #10b981; --text: #f8fafc; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
    .shell { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-top: 16px; }
    @media (max-width: 720px) { .shell { grid-template-columns: 1fr; } }
    .panel { background: var(--card); border: 1px solid #1e293b; border-radius: 14px; padding: 18px; }
    .btn { background: var(--accent); color: #052e16; border: 0; border-radius: 8px; padding: 8px 14px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <h1>Full-Stack Website Architecture</h1>
    <nav aria-label="Primary"><a href="#api" style="color:#34d399;">API Playground</a></nav>
  </header>
  <main class="shell">
    <section id="api" class="panel">
      <h2>REST Endpoint Tester</h2>
      <form id="tester">
        <label for="route">Route Path</label>
        <input id="route" value="/api/health" required />
        <button class="btn" type="submit">Dispatch</button>
      </form>
      <p id="res" role="status" aria-live="polite">Ready: 200 OK</p>
    </section>
    <aside class="panel" aria-label="Architecture Notes">
      <h2>Stack Blueprint</h2>
      <details open><summary>Layers</summary><p>HTML5 + CSS Grid + JSON API</p></details>
    </aside>
  </main>
  <footer style="margin-top:16px;color:#94a3b8;"><small>Mega Capstone Blueprint</small></footer>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Full-Stack Website Architecture',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: '.shell { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-top: 16px; }', whatItMeans: '2:1 desktop dashboard grid using minmax(0, ...) to prevent content blowout.', whyItIsThere: 'Separates main workspace and architecture sidebar cleanly.', ifDeletedError: 'Panels lose responsive side-by-side layout.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '<!doctype html>', whatItMeans: 'Triggers standards layout mode in all browsers.', whyItIsThere: 'Prevents legacy quirks-mode CSS box-model bugs.', ifDeletedError: 'Browsers fall back to quirks mode.' },
      { lineNumber: 'Line 8', codeSnippet: ':root { --bg: #07090d; --card: #0e131d; --accent: #10b981; --text: #f8fafc; }', whatItMeans: 'Central CSS custom-property theme palette tokens.', whyItIsThere: 'Maintains consistent colors across dark theme components.', ifDeletedError: 'var(--bg) tokens become invalid.' },
      { lineNumber: 'Line 11', codeSnippet: '.shell { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-top: 16px; }', whatItMeans: 'Creates overflow-safe two-column Grid dashboard layout.', whyItIsThere: 'Balances primary workspace beside complementary sidebar.', ifDeletedError: 'Columns collapse to stacked blocks.' },
      { lineNumber: 'Line 12', codeSnippet: '@media (max-width: 720px) { .shell { grid-template-columns: 1fr; } }', whatItMeans: 'Stacks grid to single column on narrow mobile viewports.', whyItIsThere: 'Ensures mobile legibility without horizontal scroll.', ifDeletedError: 'Columns squeeze too tightly on phones.' },
      { lineNumber: 'Line 26', codeSnippet: '<p id="res" role="status" aria-live="polite">Ready: 200 OK</p>', whatItMeans: 'Polite ARIA live region announcing API test results.', whyItIsThere: 'Surfaces async updates to screen-reader users automatically.', ifDeletedError: 'Status updates remain silent.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse <head>', memoryOrStack: 'Apply CSS :root tokens + Grid', note: 'Non-blocking styles ready' },
      { step: 2, state: 'Render <header> & <nav>', memoryOrStack: 'Landmark banner + Primary nav', note: 'Keyboard accessible' },
      { step: 3, state: 'Layout <main class="shell">', memoryOrStack: 'Desktop 2fr:1fr / Mobile 1fr', note: 'Zero horizontal scroll' },
      { step: 4, state: 'Read live <aside> & <footer>', memoryOrStack: 'Details FAQ + status live region', note: 'Full accessible shell complete' },
    ],
    harryBugTraps: [
      {
        title: 'Using Div Soup Instead of Semantic Landmarks (<main>, <nav>, <header>)',
        brokenCode: `<div class="top"><div class="menu"></div></div><div class="body"></div>`,
        fixedCode: `<header><nav aria-label="Main"></nav></header><main><h1>Page</h1></main><footer></footer>`,
        whyItBreaks: 'Screen readers and SEO crawlers rely on semantic landmark elements to jump directly between navigation and main content.',
      },
      {
        title: 'Using Plain 1fr Columns Without minmax(0, 1fr) Around Code/Pre Blocks',
        brokenCode: `.grid { display: grid; grid-template-columns: 2fr 1fr; } /* Wide <pre> blows out page width! */`,
        fixedCode: `.grid { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }`,
        whyItBreaks: 'In CSS Grid, 1fr implies min-width: auto, letting long unbreakable code lines stretch past viewport edges.',
      },
      {
        title: 'Missing Explicit <label for="..."> Pairing on Form Inputs',
        brokenCode: `<span>Email</span><input type="email" />`,
        fixedCode: `<label for="em">Email</label><input id="em" type="email" />`,
        whyItBreaks: 'Inputs without programmatic labels are unannounced to assistive technologies and fail accessibility compliance.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch25-p1',
        difficulty: 'Easy',
        title: 'Semantic Landmark Page Shell',
        prompt: 'Build an HTML document with <header>, <nav>, <main><h1>Landmark Ready</h1></main>, and <footer>.',
        banglaHint: 'ইঙ্গিত: `div`-এর বদলে `<header>`, `<nav>`, `<main>`, `<footer>` ট্যাগ লেখো।',
        starterCode: `<!doctype html><html><body><header><nav>Menu</nav></header><main><h1>Landmark Ready</h1></main><footer>Foot</footer></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Landmark Ready',
      },
      {
        id: 'html-ch25-p2',
        difficulty: 'Easy',
        title: 'Accessible Form With Live Status',
        prompt: 'Create a form with `<label for="api">API Key</label>`, input, submit button, and `<p role="status">Verified</p>`.',
        banglaHint: 'ইঙ্গিত: `for="api"` ও `id="api"` এক রাখবে এবং `role="status"` যোগ করবে।',
        starterCode: `<!doctype html><html><body><h1>Auth Check</h1><form><label for="api">API Key</label><input id="api" required /><button type="submit">Go</button></form><p role="status">Verified</p></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Auth Check',
      },
      {
        id: 'html-ch25-p3',
        difficulty: 'Medium',
        title: 'Responsive Auto-Fit CSS Grid Cards',
        prompt: 'Render a CSS Grid with `repeat(auto-fit, minmax(200px, 1fr))` containing two `<article>` cards.',
        banglaHint: 'ইঙ্গিত: `.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }` ব্যবহার করো।',
        starterCode: `<!doctype html><html><head><style>.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}</style></head><body><h1>Dashboard Grid</h1><div class="cards"><article>Card A</article><article>Card B</article></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Dashboard Grid',
      },
      {
        id: 'html-ch25-p4',
        difficulty: 'Medium',
        title: 'Native <details> Accordion & Schema JSON-LD',
        prompt: 'Include `<script type="application/ld+json">` in `<head>` and a `<details><summary>` FAQ inside `<main>`.',
        banglaHint: 'ইঙ্গিত: স্কিমা স্ক্রিপ্ট `<head>`-এ এবং `<details><summary>` `<main>`-এ রাখো।',
        starterCode: `<!doctype html><html><head><script type="application/ld+json">{"@type":"WebPage"}</script></head><body><main><h1>FAQ Hub</h1><details open><summary>SLA</summary><p>99.9% uptime</p></details></main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'FAQ Hub',
      },
      {
        id: 'html-ch25-p5',
        difficulty: 'Hard',
        title: 'Full-Stack Two-Column Shell With Skip Link & Aside',
        prompt: 'Build a complete accessible shell with a Skip Link, `<main>` workspace, and `<aside>` architecture card.',
        banglaHint: 'ইঙ্গিত: `<a href="#main">Skip to content</a>` যুক্ত করে `<main id="main">` ও `<aside>` রাখো।',
        starterCode: `<!doctype html><html><body><a href="#main">Skip to content</a><header><h1>App Blueprint</h1></header><main id="main"><section>Workspace Ready</section><aside>Sidebar Ready</aside></main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'App Blueprint',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): Accessible Full-Stack Website Architecture Blueprint',
      description: 'Combines semantic landmarks, overflow-safe CSS Grid, accessible forms, <details>, and live regions.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): সিমান্টিক HTML5, রেস্পন্সিভ CSS Grid ও অ্যাক্সেসিবল অ্যাপ শেল তৈরি।',
      combinesChapters: 'Ch 1–25',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Full-Stack App Shell — Mega Capstone</title>
  <style>
    :root { --bg: #07090d; --card: #0e131d; --accent: #10b981; --text: #f8fafc; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
    .shell { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-top: 16px; }
    @media (max-width: 720px) { .shell { grid-template-columns: 1fr; } }
    .panel { background: var(--card); border: 1px solid #1e293b; border-radius: 14px; padding: 18px; }
    .btn { background: var(--accent); color: #052e16; border: 0; border-radius: 8px; padding: 8px 14px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <h1>Full-Stack Website Architecture</h1>
    <nav aria-label="Primary"><a href="#api" style="color:#34d399;">API Playground</a></nav>
  </header>
  <main class="shell">
    <section id="api" class="panel">
      <h2>REST Endpoint Tester</h2>
      <form id="tester">
        <label for="route">Route Path</label>
        <input id="route" value="/api/health" required />
        <button class="btn" type="submit">Dispatch</button>
      </form>
      <p id="res" role="status" aria-live="polite">Ready: 200 OK</p>
    </section>
    <aside class="panel" aria-label="Architecture Notes">
      <h2>Stack Blueprint</h2>
      <details open><summary>Layers</summary><p>HTML5 + CSS Grid + JSON API</p></details>
    </aside>
  </main>
  <footer style="margin-top:16px;color:#94a3b8;"><small>Mega Capstone Blueprint</small></footer>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: 'Full-Stack Website Architecture',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Full-Stack App Shell — Mega Capstone</title>
  <style>
    :root { --bg: #07090d; --card: #0e131d; --accent: #10b981; --text: #f8fafc; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
    .shell { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-top: 16px; }
    @media (max-width: 720px) { .shell { grid-template-columns: 1fr; } }
    .panel { background: var(--card); border: 1px solid #1e293b; border-radius: 14px; padding: 18px; }
    .btn { background: var(--accent); color: #052e16; border: 0; border-radius: 8px; padding: 8px 14px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <h1>Full-Stack Website Architecture</h1>
    <nav aria-label="Primary"><a href="#api" style="color:#34d399;">API Playground</a></nav>
  </header>
  <main class="shell">
    <section id="api" class="panel">
      <h2>REST Endpoint Tester</h2>
      <form id="tester">
        <label for="route">Route Path</label>
        <input id="route" value="/api/health" required />
        <button class="btn" type="submit">Dispatch</button>
      </form>
      <p id="res" role="status" aria-live="polite">Ready: 200 OK</p>
    </section>
    <aside class="panel" aria-label="Architecture Notes">
      <h2>Stack Blueprint</h2>
      <details open><summary>Layers</summary><p>HTML5 + CSS Grid + JSON API</p></details>
    </aside>
  </main>
  <footer style="margin-top:16px;color:#94a3b8;"><small>Mega Capstone Blueprint</small></footer>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Full-Stack Website Architecture',
    testCases: [
      { id: 'html25-t1', input: '', expectedOutput: 'Full-Stack Website Architecture' },
      { id: 'html25-t2', input: '', expectedOutput: 'Ready: 200 OK', isHidden: true },
    ],
  },
};

