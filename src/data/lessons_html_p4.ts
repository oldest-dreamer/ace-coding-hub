import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_HTML_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'DOM Hierarchy, Semantic Nodes & Interactive Events',
    banglaTitle: 'DOM হায়ারার্কি, সেমান্টিক নোড ও ইন্টারেক্টিভ ইভেন্ট (HTML5)',
    subtitle: 'Document tree references, native <button> vs <div>, data-* hooks, and event delegation',
    zeroIntuition: {
      plainEnglishStory:
        'When the browser parses HTML, it builds a live tree of interconnected DOM node objects (`document -> main -> section -> button`). Every attribute you write—especially `id`, `aria-controls`, and custom `data-*` attributes—becomes a structured hook connecting HTML markup directly to JavaScript event handlers without fragile CSS class scraping.\n\nSemantic interactive controls (`<button type="button">`, `<a href="...">`) automatically receive keyboard Enter/Space support and focusability for free, whereas a clickable `<div onclick="...">` locks out keyboard users. Attaching one delegated listener on a parent container handles bubbling clicks across dynamic lists with minimal memory overhead.',
      asciiFlowchart:
        '<ul id="menu" data-role="delegator">   <-- 1 delegated click listener\n  <li><button type="button" data-action="pin">Pin</button></li>\n</ul>  (click bubbles UP: button -> li -> ul#menu)',
      pseudocode: ["menu.addEventListener(\"click\", (e) => {","const btn = e.target.closest(\"button[data-action]\");","if (btn) handle(btn.dataset.action);","})"],
      banglaZeroToHero: {
        analogyTitle: 'HTML DOM হলো গাছের শাখা-প্রশাখা, আর নেটিভ <button> হলো কীবোর্ড-বান্ধব সুইচ',
        explanation:
          'ব্রাউজার যখন তোমার HTML ফাইল পড়ে, তখন সেটি ভেতরে ভেতরে একটি ডকুমেন্ট অবজেক্ট মডেল বা DOM ট্রি তৈরি করে, যেখানে `<body>`, `<main>`, `<section>` এবং `<button>` একটার ভেতর আরেকটা প্যারেন্ট-চাইল্ড হিসেবে যুক্ত থাকে। অনেকেই ভুল করে ক্লিকেবল বাটন বানাতে `<div class="btn">` লিখে ফেলে—কিন্তু সাধারণ `<div>` কীবোর্ডের `Tab` বা `Enter` চাপলে কাজ করে না এবং স্ক্রিন রিডারও একে বাটন হিসেবে চেনে না। তাই যেকোনো অ্যাকশনের জন্য সর্বদা নেটিভ `<button type="button">` ব্যবহার করা উচিত (এবং ফর্ম সাবমিট না হলে `type="button"` দেওয়া জরুরি)। জাভাস্ক্রিপ্টের সাথে HTML-কে নিরাপদে যুক্ত করতে CSS ক্লাসের ওপর নির্ভর না করে `data-action="delete"` ধরনের `data-*` অ্যাট্রিবিউট ব্যবহার করা পেশাদার নিয়ম। তালিকার ১০০টি আইটেমে আলাদা ইভেন্ট লিসেনার না বসিয়ে প্যারেন্ট `<ul>` বা `<section>`-এ একটিমাত্র লিসেনার রেখে `e.target.closest("[data-action]")` দিয়ে বাবল করা ক্লিক ধরাকে Event Delegation বলে। এতে পেজ খুব হালকা থাকে এবং ডাইনামিকভাবে নতুন আইটেম যোগ করলেও অটোমেটিক কাজ করে। আজকের অধ্যায়ে সেমান্টিক DOM নোড ও নিরাপদ ইভেন্ট হুকিং শিখবে।',
        everydayExample: 'একটি ভবনের প্রতিটি ফ্ল্যাটের দরজায় আলাদা দারোয়ান না বসিয়ে নিচতলার রিসেপশনে (`ul`) একজন দারোয়ান রাখা যিনি ভেতরের সব ডাক সামলান।',
        keyTakeaways: [
          'ক্লিকেবল অ্যাকশনের জন্য কখনো `<div>` নয়, সর্বদা নেটিভ `<button type="button">` বা `<a href>` ব্যবহার করো।',
          'ফর্মের ভেতরে সাধারণ বাটনে `type="button"` না দিলে ক্লিক করলে পুরো পেজ রিলোড/সাবমিট হয়ে যেতে পারে।',
          'Event Delegation-এ `e.target.closest("button")` ব্যবহার করলে বাটনের ভেতরের আইকন `<svg>`-এ ক্লিক পড়লেও সঠিকভাবে বাটনটিই ধরা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch16-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Native Button Event Delegation With data-* Hooks',
        englishParagraphs: [
          'Attach a single delegated click handler to a `<nav data-toolbar>` container reading `btn.dataset.action` via `closest("button")`.',
        ],
        banglaParagraphs: [
          'প্যারেন্ট কন্টেইনারে একটি ইভেন্ট লিসেনার রেখে `data-action` ও `closest("button")` দিয়ে নিরাপদ বাটন হ্যান্ডলিং দেখো।',
        ],
        memoryDiagram: 'nav[data-toolbar] catches click -> target.closest("button")',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }\n  button { padding: 8px 14px; border-radius: 8px; border: 0; background: #10b981; color: #022c22; font-weight: 700; cursor: pointer; }\n</style>\n</head>\n<body>\n  <h1>Delegated Event Toolbar</h1>\n  <div id="toolbar" role="toolbar" aria-label="Editor actions">\n    <button type="button" data-action="save">Save</button>\n    <button type="button" data-action="share">Share</button>\n  </div>\n  <p id="status" aria-live="polite">Ready</p>\n  <script>\n    document.getElementById('toolbar').addEventListener('click', (e) => {\n      const btn = e.target.closest('button[data-action]');\n      if (btn) document.getElementById('status').textContent = 'Action: ' + btn.dataset.action;\n    });\n  </script>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Delegated Event Toolbar',
        lineByLine: [
          {"lineNumber":"Line 12","codeSnippet":"    <button type=\"button\" data-action=\"save\">Save</button>","whatItMeans":"Uses explicit `type=\"button\"` and `data-action` behavior hook.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Action hook unavailable."},
          {"lineNumber":"Line 18","codeSnippet":"      const btn = e.target.closest('button[data-action]');","whatItMeans":"Resolves ancestor `<button>` even if inner icon text is clicked.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nested icon clicks fail to match."},
        ],
      },
      {
        id: 'html-ch16-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Accessible Toggle Button with aria-pressed State',
        englishParagraphs: [
          'Sync visual styling directly to `aria-pressed="true"` using the `[aria-pressed="true"]` CSS attribute selector so accessibility state drives the UI.',
        ],
        banglaParagraphs: [
          'বাটনের `aria-pressed` অ্যাট্রিবিউট বদলিয়ে CSS-এ `[aria-pressed="true"]` সিলেক্টর দিয়ে স্টেট স্টাইল করো।',
        ],
        memoryDiagram: 'button[aria-pressed="true"] drives both CSS and Screen Reader',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #0f172a; color: #fff; }\n  button { padding: 10px 16px; border-radius: 8px; border: 1px solid #334155; background: #1e293b; color: #fff; }\n  button[aria-pressed="true"] { background: #10b981; color: #022c22; font-weight: 700; }\n</style>\n</head>\n<body>\n  <h1>ARIA Pressed Toggle</h1>\n  <button id="fav" type="button" aria-pressed="false">Bookmark Lesson</button>\n  <script>\n    const fav = document.getElementById('fav');\n    fav.addEventListener('click', () => {\n      const on = fav.getAttribute('aria-pressed') === 'true';\n      fav.setAttribute('aria-pressed', String(!on));\n    });\n  </script>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'ARIA Pressed Toggle',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  button[aria-pressed=\"true\"] { background: #10b981; color: #022c22; font-weight: 700; }","whatItMeans":"Ties visual active state straight to semantic ARIA truth.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Pressed state lacks visual indicator."},
          {"lineNumber":"Line 12","codeSnippet":"  <button id=\"fav\" type=\"button\" aria-pressed=\"false\">Bookmark Lesson</button>","whatItMeans":"Announces toggle capability to assistive tech.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No interactive control."},
        ],
      },
      {
        id: 'html-ch16-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Semantic Landmark Tree & Live Count Mutator',
        englishParagraphs: [
          'Connect a semantic `<ul id="list">` container with an `aria-live="polite"` counter badge updated cleanly via DOM textContent.',
        ],
        banglaParagraphs: [
          'সেমান্টিক তালিকা এবং `aria-live="polite"` স্ট্যাটাস কাউন্টারকে DOM নোডের মাধ্যমে যুক্ত করো।',
        ],
        memoryDiagram: 'main -> ul#tasks + p[aria-live="polite"]',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #111827; color: #f8fafc; }\n</style>\n</head>\n<body>\n  <main>\n    <h1>Live DOM Counter</h1>\n    <p id="cnt" aria-live="polite">Items: 2</p>\n    <ul id="tasks"><li>Read Ch 16</li><li>Build Handler</li></ul>\n    <button id="add" type="button">Add Task</button>\n  </main>\n  <script>\n    document.getElementById('add').addEventListener('click', () => {\n      const li = document.createElement('li');\n      li.textContent = 'New Item';\n      const ul = document.getElementById('tasks');\n      ul.appendChild(li);\n      document.getElementById('cnt').textContent = 'Items: ' + ul.children.length;\n    });\n  </script>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Live DOM Counter',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"    <p id=\"cnt\" aria-live=\"polite\">Items: 2</p>","whatItMeans":"Announces updated count politely without interrupting speech.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Screen readers miss dynamic count changes."},
          {"lineNumber":"Line 18","codeSnippet":"      li.textContent = 'New Item';","whatItMeans":"Uses safe `textContent` instead of `innerHTML` to avoid XSS.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Unsafe HTML injection risk."},
        ],
      },
      {
        id: 'html-ch16-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Fixing Clickable Divs With Real Focusable Buttons',
        englishParagraphs: [
          'Replacing `<div class="btn">` with `<button type="button">` provides keyboard Tab navigation, Enter/Space activation, and proper screen reader roles automatically.',
        ],
        banglaParagraphs: [
          '`<div onclick>` এর পরিবর্তে `<button type="button">` ব্যবহার করলে কীবোর্ড ট্যাব ও এন্টার সাপোর্ট বিনা কোডেই চলে আসে।',
        ],
        memoryDiagram: 'button:focus-visible { outline: 2px solid #10b981 }',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #090d16; color: #fff; }\n  button:focus-visible { outline: 3px solid #10b981; outline-offset: 2px; }\n</style>\n</head>\n<body>\n  <h1>Keyboard-First Control</h1>\n  <button type="button">Focusable Action</button>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Keyboard-First Control',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  button:focus-visible { outline: 3px solid #10b981; outline-offset: 2px; }","whatItMeans":"Provides clear high-contrast keyboard focus ring.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Keyboard users lose track of active control."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 10","codeSnippet":"  <h1>Delegated Event Toolbar</h1>","whatItMeans":"Primary semantic heading.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing page heading."},
      {"lineNumber":"Line 12","codeSnippet":"    <button type=\"button\" data-action=\"save\">Save</button>","whatItMeans":"Native accessible trigger with `data-action` hook.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No save button."},
      {"lineNumber":"Line 15","codeSnippet":"  <p id=\"status\" aria-live=\"polite\">Ready</p>","whatItMeans":"Live region announcing event feedback.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Status area absent."},
      {"lineNumber":"Line 18","codeSnippet":"      const btn = e.target.closest('button[data-action]');","whatItMeans":"Safe ancestor matching during bubbling.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Delegation breaks on nested spans/icons."},
    ],
    dryRunTable: [
      { step: 1, state: 'User clicks Save', memoryOrStack: 'target = button[data-action="save"]', note: 'Event starts at button' },
      { step: 2, state: 'Bubbles to #toolbar', memoryOrStack: 'closest() matches button', note: 'Single listener handles click' },
      { step: 3, state: 'btn.dataset.action', memoryOrStack: '"save"', note: 'Reads custom data-* hook' },
      { step: 4, state: 'status.textContent', memoryOrStack: '"Action: save"', note: 'XSS-safe text update in live region' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `<div onclick="...">` Instead of `<button>`',
        brokenCode: '<div class="btn" onclick="run()">Submit</div>',
        fixedCode: '<button type="button" id="runBtn">Submit</button>',
        whyItBreaks: 'A `<div>` is unreachable by keyboard Tab and ignores Enter/Space keys.',
      },
      {
        title: 'Trap 2: Omitting `type="button"` Inside `<form>`',
        brokenCode: '<form><button onclick="openModal()">Help</button></form>',
        fixedCode: '<form><button type="button" id="helpBtn">Help</button></form>',
        whyItBreaks: 'Default `<button>` inside a `<form>` is `type="submit"`, triggering unexpected page reload.',
      },
      {
        title: 'Trap 3: Writing Untrusted Input via `innerHTML`',
        brokenCode: 'statusEl.innerHTML = userInput;',
        fixedCode: 'statusEl.textContent = userInput;',
        whyItBreaks: 'Inserting raw user strings into `innerHTML` opens cross-site scripting (XSS) vulnerabilities.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch16-p1',
        difficulty: 'Easy',
        title: 'Accessible Toolbar with data-* Actions',
        prompt: 'Build a `<div role="toolbar">` containing 2 `<button type="button">` elements with `data-cmd` attributes and a live status paragraph.',
        banglaHint: '`type="button"` ও `data-cmd` দিয়ে বাটন বানিয়ে `aria-live="polite"` রাখো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Command Bar</h1><div role="toolbar"><button type="button" data-cmd="copy">Copy</button><button type="button" data-cmd="run">Run</button></div><p aria-live="polite">Idle</p></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Command Bar',
      },
      {
        id: 'html-ch16-p2',
        difficulty: 'Easy',
        title: 'ARIA Toggle Switch Markup',
        prompt: 'Create a toggle button using `aria-pressed="false"` styled with `[aria-pressed="true"]` and `:focus-visible`.',
        banglaHint: '`button[aria-pressed="true"]` এবং `:focus-visible` রুল যোগ করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>button[aria-pressed="true"]{background:#10b981}button:focus-visible{outline:3px solid #38bdf8}</style></head><body><h1>Toggle Control</h1><button type="button" aria-pressed="false">Dark Mode</button></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Toggle Control',
      },
      {
        id: 'html-ch16-p3',
        difficulty: 'Medium',
        title: 'Delegated List Filter Card',
        prompt: 'Render a `<ul>` list with delegated click detection using `.closest("button")` and safe `textContent` updates.',
        banglaHint: '`e.target.closest("button")` দিয়ে চাইল্ড বাটন চিনে টেক্সট আপডেট করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Delegated List</h1><ul id="items"><li><button type="button" data-id="1">Item 1</button></li></ul><p id="out">None</p><script>document.getElementById('items').addEventListener('click',e=>{const b=e.target.closest('button');if(b)document.getElementById('out').textContent=b.dataset.id;});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Delegated List',
      },
      {
        id: 'html-ch16-p4',
        difficulty: 'Medium',
        title: 'Expanded Disclosure Controls',
        prompt: 'Connect a toggle button to a hidden `<section id="panel" hidden>` via `aria-expanded` and `aria-controls="panel"`.',
        banglaHint: '`aria-controls="panel"` ও `aria-expanded="false"` দিয়ে বাটন আর প্যানেল যুক্ত করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Disclosure Control</h1><button id="tog" type="button" aria-expanded="false" aria-controls="panel">Details</button><section id="panel" hidden><p>Expanded DOM info.</p></section></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Disclosure Control',
      },
      {
        id: 'html-ch16-p5',
        difficulty: 'Hard',
        title: 'Multi-Card Interactive Action Dispatcher',
        prompt: 'Author a card grid where one `<main>` delegated listener reads `data-card` and `data-action` to announce selections safely.',
        banglaHint: 'দুইটি `data-*` অ্যাট্রিবিউট পড়ে `aria-live` রিজিওনে মেসেজ দেখাও।',
        starterCode: `<!doctype html>\n<html lang="en"><body><main id="board"><h1>Action Dispatcher</h1><article data-card="c1"><button type="button" data-action="star">Star</button></article><p id="msg" aria-live="polite">Waiting</p></main><script>document.getElementById('board').addEventListener('click',e=>{const b=e.target.closest('button');if(b)document.getElementById('msg').textContent=b.closest('[data-card]').dataset.card+':'+b.dataset.action;});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Action Dispatcher',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Accessible Interactive DOM Action Panel',
      description: 'Combine semantic landmarks, `data-*` action buttons, `aria-live` announcements, and single-listener delegation.',
      banglaGoal: 'সেমান্টিক বাটন, `aria-live` ও ইভেন্ট ডেলিগেশন একত্র করে একটি সম্পূর্ণ DOM অ্যাকশন প্যানেল তৈরি করো।',
      combinesChapters: "Ch 13, 15, 16",
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.bar{display:flex;gap:10px}button{padding:8px 14px;border-radius:8px;border:0;background:#10b981;color:#022c22;font-weight:700}button:focus-visible{outline:3px solid #38bdf8}</style></head><body><main><h1>DOM Event Studio</h1><div id="bar" class="bar"><button type="button" data-op="build">Build</button><button type="button" data-op="test">Test</button></div><p id="live" aria-live="polite">Status: Ready</p></main><script>document.getElementById('bar').addEventListener('click',e=>{const b=e.target.closest('button[data-op]');if(b)document.getElementById('live').textContent='Status: '+b.dataset.op;});</script></body></html>`,
      sampleStdin: '',
      expectedOutput: 'DOM Event Studio',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.bar{display:flex;gap:10px}button{padding:8px 14px;border-radius:8px;border:0;background:#10b981;color:#022c22;font-weight:700}button:focus-visible{outline:3px solid #38bdf8}</style></head><body><main><h1>DOM Event Studio</h1><div id="bar" class="bar"><button type="button" data-op="build">Build</button><button type="button" data-op="test">Test</button></div><p id="live" aria-live="polite">Status: Ready</p></main><script>document.getElementById('bar').addEventListener('click',e=>{const b=e.target.closest('button[data-op]');if(b)document.getElementById('live').textContent='Status: '+b.dataset.op;});</script></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'DOM Event Studio',
    testCases: [
      { id: 'html16-t1', input: '', expectedOutput: 'DOM Event Studio' },
      { id: 'html16-t2', input: '', expectedOutput: 'Status: Ready', isHidden: true },
    ],
  },
  17: {
    chapterNumber: 17,
    title: 'CSS Transitions, Keyframes & GPU Layer Compositing',
    banglaTitle: 'CSS ট্রানজিশন, কিফ্রেম ও GPU লেয়ার পারফরম্যান্স',
    subtitle: '60fps transform/opacity animations vs layout thrashing, @keyframes, and reduced-motion',
    zeroIntuition: {
      plainEnglishStory:
        'Animating CSS properties like `width`, `height`, `top`, or `left` forces the browser to recompute document layout and repaint pixels every single frame—causing jank on mobile CPUs. By contrast, animating only `transform` (`translate`, `scale`, `rotate`) and `opacity` runs directly on the GPU compositor thread at a buttery 60–120fps.\n\nPair smooth `transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1)` for hover feedback with `@keyframes` for multi-step entrance sequences, and ALWAYS wrap motion rules inside `@media (prefers-reduced-motion: reduce)` so motion-sensitive users never feel dizzy.',
      asciiFlowchart:
        'width / left animation  ==> Layout -> Paint -> Composite (Slow CPU jank)\ntransform / opacity     ==> Composite Only (60fps GPU smooth!)\n@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }',
      pseudocode: [".card { transition: transform 220ms ease, opacity 220ms ease; }",".card:hover { transform: translateY(-4px); }","@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }"],
      banglaZeroToHero: {
        analogyTitle: 'পুরো ঘরের আসবাব না ভেঙে (`layout`) কেবল কাঁচের স্লাইড সরানো (`GPU transform`)',
        explanation:
          'ওয়েবসাইটে কোনো কার্ড বা বাটন নড়াচড়া করার সময় যদি সেটি আঁটকে আঁটকে চলে (jank), তার মূল কারণ হলো ভুল CSS প্রোপার্টি অ্যানিমেট করা। তুমি যদি `width`, `margin` বা `top/left` অ্যানিমেট করো, ব্রাউজার প্রতি সেকেন্ডে ৬০ বার পুরো পেজের জ্যামিতি হিসাব (Layout) এবং রঙ (Paint) করতে গিয়ে CPU-কে হিমশিম খাইয়ে দেয়। এর বদলে কেবল `transform` (`translateY`, `scale`) এবং `opacity` অ্যানিমেট করলে কাজটি সরাসরি GPU কম্পোজিটর লেয়ারে হয়—যা একদম মাখনের মতো ৬০-১২০ এফপিএস গতি দেয়! ছোট হোভার ইফেক্টের জন্য `transition: transform 200ms cubic-bezier(...)` আর লোডিং স্পিনার বা ধারাবাহিক এন্ট্রান্সের জন্য `@keyframes` ব্যবহার করা হয়। তবে অনেক এলিমেন্টে অযথা `will-change: transform` দিয়ে রাখলে ভিডিও র‍্যাম (VRAM) ভরে যায়, তাই কেবল আসল অ্যানিমেটেড এলিমেন্টেই এটি সীমিত রাখা উচিত। সবচেয়ে গুরুত্বপূর্ণ অ্যাক্সেসিবিলিটি নিয়ম হলো `@media (prefers-reduced-motion: reduce)`—যেসব ইউজার মোশন সংবেদনশীলতা বন্ধ রেখেছেন, তাদের জন্য অ্যানিমেশন বন্ধ করে স্থির ট্রানজিশন দিতে হয়। আজকের অধ্যায়ে GPU-অপ্টিমাইজড অ্যানিমেশন ও নিরাপদ মোশন ডিজাইন শিখবে।',
        everydayExample: 'মঞ্চের পুরো দেয়াল ভেঙে নতুন করে না এঁকে প্রজেক্টরের একটি স্লাইড (`transform`) দ্রুত ঘোরানো।',
        keyTakeaways: [
          'সর্বদা ৬০fps অ্যানিমেশনের জন্য কেবল `transform` এবং `opacity` অ্যানিমেট করো; `width`/`top`/`margin` এড়িয়ে চলো।',
          'প্রতিটি অ্যানিমেশন সিস্টেমে `@media (prefers-reduced-motion: reduce)` দিয়ে মোশন বন্ধ করার অপশন রাখা বাধ্যতামূলক।',
          'সর্বত্র `will-change: transform` লিখলে GPU মেমোরি নষ্ট হয়; কেবল ভারী অ্যানিমেটেড উপাদানে ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch17-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Spring-Like Transform Transition on Card Hover',
        englishParagraphs: [
          'Use `transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease` for crisp GPU-composited hover elevation.',
        ],
        banglaParagraphs: [
          'কার্ডে `transform` ও `cubic-bezier` দিয়ে GPU-ভিত্তিক মসৃণ হোভার অ্যানিমেশন তৈরি করো।',
        ],
        memoryDiagram: 'transition: transform + opacity (zero layout/paint cost)',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }\n  .card { max-width: 300px; padding: 20px; border-radius: 14px; background: #1e293b; transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease; }\n  .card:hover { transform: translateY(-6px) scale(1.02); }\n  @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }\n</style>\n</head>\n<body>\n  <article class="card">\n    <h1>GPU Hover Elevation</h1>\n    <p>Animates transform only for smooth 60fps response.</p>\n  </article>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'GPU Hover Elevation',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .card { max-width: 300px; padding: 20px; border-radius: 14px; background: #1e293b; transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease; }","whatItMeans":"Transitions strictly compositor-friendly properties.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Hover jumps instantaneously without smoothness."},
          {"lineNumber":"Line 8","codeSnippet":"  @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }","whatItMeans":"Honors OS reduced-motion accessibility setting.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Motion plays even for vestibular-sensitive users."},
        ],
      },
      {
        id: 'html-ch17-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Keyframe Entrance Slide & Fade-In',
        englishParagraphs: [
          'Author a `@keyframes riseIn` rule animating `opacity: 0 -> 1` and `transform: translateY(20px) -> translateY(0)` cleanly on first paint.',
        ],
        banglaParagraphs: [
          '`@keyframes riseIn` দিয়ে পেজ লোড হওয়ার সময় `opacity` ও `translateY` অ্যানিমেশন চালাও।',
        ],
        memoryDiagram: '@keyframes riseIn { from { opacity:0; translateY(20px) } to { 1, 0 } }',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  @keyframes riseIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }\n  body { font-family: system-ui; padding: 24px; background: #0f172a; color: #f8fafc; }\n  .banner { padding: 20px; border-radius: 12px; background: #064e3b; animation: riseIn 420ms ease-out both; }\n  @media (prefers-reduced-motion: reduce) { .banner { animation: none; } }\n</style>\n</head>\n<body>\n  <section class="banner"><h1>Keyframe Entrance</h1></section>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Keyframe Entrance',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"  @keyframes riseIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }","whatItMeans":"Defines GPU-only keyframe timeline.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Banner pops in abruptly."},
          {"lineNumber":"Line 7","codeSnippet":"  .banner { padding: 20px; border-radius: 12px; background: #064e3b; animation: riseIn 420ms ease-out both; }","whatItMeans":"`both` fill-mode applies `from` state before start and holds `to` state after.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No entrance animation plays."},
        ],
      },
      {
        id: 'html-ch17-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Smooth Transform Pulse Badge',
        englishParagraphs: [
          'Animate a status indicator ring with infinite subtle `transform: scale(...)` keyframes to avoid layout shifts on surrounding text.',
        ],
        banglaParagraphs: [
          'আশেপাশের লেখা না নড়িয়ে `transform: scale()` কিফ্রেম দিয়ে লাইভ স্ট্যাটাস ডট পালস করো।',
        ],
        memoryDiagram: 'dot pulse uses transform scale only -> 0 layout reflow',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.35); opacity: 0.65; } }\n  body { font-family: system-ui; padding: 24px; background: #111827; color: #fff; }\n  .dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #10b981; animation: pulse 1.6s ease-in-out infinite; }\n  @media (prefers-reduced-motion: reduce) { .dot { animation: none; } }\n</style>\n</head>\n<body>\n  <h1><span class="dot" aria-hidden="true"></span> Live Status Ring</h1>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Live Status Ring',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  .dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #10b981; animation: pulse 1.6s ease-in-out infinite; }","whatItMeans":"Runs gentle breathing animation solely in GPU layer.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Dot remains static."},
        ],
      },
      {
        id: 'html-ch17-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Replacing Layout-Thrashing `left` With `transform: translateX`',
        englishParagraphs: [
          'Changing `left` or `margin-left` forces CPU layout recalculation every frame. Always translate elements via `transform: translateX(...)`.',
        ],
        banglaParagraphs: [
          '`margin-left` বা `left` বদলিয়ে সরানোর চেয়ে `transform: translateX()` ব্যবহার করলে কোনো লেআউট ক্যালকুলেশন ছাড়াই উপাদান সরে।',
        ],
        memoryDiagram: 'translateX(24px) bypasses Layout + Paint stages completely',
        code: `<!doctype html>\n<html lang="en">\n<head>\n<style>\n  body { font-family: system-ui; padding: 24px; background: #090d16; color: #f8fafc; }\n  .chip { display: inline-block; padding: 10px 16px; background: #0d9488; border-radius: 8px; transition: transform 200ms ease; }\n  .chip:hover { transform: translateX(18px); }\n</style>\n</head>\n<body>\n  <h1>Zero-Reflow Slide</h1>\n  <div class="chip">GPU Translated Chip</div>\n</body>\n</html>`,
        stdin: '',
        expectedOutput: 'Zero-Reflow Slide',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  .chip:hover { transform: translateX(18px); }","whatItMeans":"Shifts chip visually without pushing neighbor layout boxes.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Hover movement absent."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 6","codeSnippet":"  .card { max-width: 300px; padding: 20px; border-radius: 14px; background: #1e293b; transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease; }","whatItMeans":"Configures GPU compositor transition timing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No smooth curve."},
      {"lineNumber":"Line 7","codeSnippet":"  .card:hover { transform: translateY(-6px) scale(1.02); }","whatItMeans":"Applies hover elevation purely via transform.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Card stays flat on hover."},
      {"lineNumber":"Line 8","codeSnippet":"  @media (prefers-reduced-motion: reduce) { .card { transition: none; } .card:hover { transform: none; } }","whatItMeans":"Disables animation for reduced-motion OS users.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Fails motion accessibility."},
    ],
    dryRunTable: [
      { step: 1, state: 'Initial paint', memoryOrStack: 'Composite layer ready', note: 'Card sits at translateY(0)' },
      { step: 2, state: 'Pointer hovers .card', memoryOrStack: 'transform: translateY(-6px)', note: 'GPU interpolates 240ms ease curve' },
      { step: 3, state: 'Siblings', memoryOrStack: 'Zero reflow triggered', note: 'Surrounding flow stays completely steady' },
      { step: 4, state: 'reduced-motion: reduce', memoryOrStack: 'transition: none', note: 'Safe static experience enforced' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Animating `height` or `width` Instead of `transform`',
        brokenCode: '.panel:hover { width: 320px; transition: width 0.3s; }',
        fixedCode: '.panel:hover { transform: scale(1.04); transition: transform 0.3s; }',
        whyItBreaks: 'Changing width forces layout recalculation and repaints every single animation frame.',
      },
      {
        title: 'Trap 2: Forgetting `@media (prefers-reduced-motion: reduce)`',
        brokenCode: '.hero { animation: spin 2s infinite; }',
        fixedCode: '@media (prefers-reduced-motion: reduce) { .hero { animation: none; } }',
        whyItBreaks: 'Ignores user OS accessibility settings that prevent motion sickness.',
      },
      {
        title: 'Trap 3: Spamming `will-change: transform` on Hundreds of Nodes',
        brokenCode: '* { will-change: transform; }',
        fixedCode: '.active-hero { will-change: transform; }',
        whyItBreaks: 'Promotes every element to a separate GPU texture layer, exhausting device video memory.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch17-p1',
        difficulty: 'Easy',
        title: 'Tactile Transform Button',
        prompt: 'Style a `<button>` that elevates via `translateY(-2px)` on `:hover` and depresses via `scale(0.97)` on `:active`.',
        banglaHint: '`:hover { transform: translateY(-2px); }` এবং `:active { transform: scale(0.97); }` দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>button{padding:10px 18px;transition:transform 160ms ease}button:hover{transform:translateY(-2px)}button:active{transform:scale(0.97)}</style></head><body><h1>Tactile Button</h1><button type="button">Press Me</button></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Tactile Button',
      },
      {
        id: 'html-ch17-p2',
        difficulty: 'Easy',
        title: 'Accessible Reduced-Motion Fade',
        prompt: 'Write a `@keyframes fadeSlide` animation wrapped with `@media (prefers-reduced-motion: reduce)` disabling it.',
        banglaHint: '`@media (prefers-reduced-motion: reduce)` ব্লকের ভেতর `animation: none` লেখো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>@keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}.box{animation:fadeSlide 300ms ease both}@media(prefers-reduced-motion:reduce){.box{animation:none}}</style></head><body><div class="box"><h1>Motion Guard</h1></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Motion Guard',
      },
      {
        id: 'html-ch17-p3',
        difficulty: 'Medium',
        title: 'Staggered Entrance Animation Delay',
        prompt: 'Apply custom CSS variable `--i` so 3 list cards stagger smoothly (`animation-delay: calc(var(--i) * 80ms)`).',
        banglaHint: '`style="--i:0"`, `--i:1` ও `calc(var(--i) * 80ms)` ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>@keyframes in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.item{animation:in 300ms ease both;animation-delay:calc(var(--i)*80ms)}</style></head><body><h1>Staggered Cards</h1><div class="item" style="--i:0">One</div><div class="item" style="--i:1">Two</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Staggered Cards',
      },
      {
        id: 'html-ch17-p4',
        difficulty: 'Medium',
        title: 'GPU Rotating Loader Ring',
        prompt: 'Build a lightweight circular spinner using `transform: rotate(360deg)` without changing width or height.',
        banglaHint: '`border-top-color` ভিন্ন রেখে `transform: rotate(360deg)` ঘোরাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>@keyframes spin{to{transform:rotate(360deg)}}.ring{width:36px;height:36px;border-radius:50%;border:4px solid #334155;border-top-color:#10b981;animation:spin 1s linear infinite}</style></head><body><h1>GPU Loader</h1><div class="ring" role="status" aria-label="Loading"></div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'GPU Loader',
      },
      {
        id: 'html-ch17-p5',
        difficulty: 'Hard',
        title: 'Compositor-Only Sliding Drawer',
        prompt: 'Animate a side panel open/closed strictly with `transform: translateX(-100%)` to `translateX(0)` plus `prefers-reduced-motion`.',
        banglaHint: '`left` বা `width` না বদলে `translateX(-100%)` থেকে `translateX(0)` সরাও।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>.drawer{width:240px;padding:16px;background:#064e3b;color:#fff;transform:translateX(-100%);transition:transform 250ms ease}.drawer.open{transform:translateX(0)}@media(prefers-reduced-motion:reduce){.drawer{transition:none}}</style></head><body><aside class="drawer open"><h1>GPU Drawer</h1></aside></body></html>`,
        sampleStdin: '',
        expectedOutput: 'GPU Drawer',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Motion-Safe GPU Interactive Showcase',
      description: 'Combine `@keyframes` entrance, `transform` hover transitions, and `@media (prefers-reduced-motion: reduce)` safety.',
      banglaGoal: 'GPU-বান্ধব ট্রান্সফর্ম অ্যানিমেশন ও reduced-motion সুরক্ষা মিলিয়ে একটি শোকেস পেজ তৈরি করো।',
      combinesChapters: "Ch 13, 15, 17",
      starterCode: `<!doctype html>\n<html lang="en"><head><style>@keyframes pop{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.card{max-width:360px;padding:20px;border-radius:14px;background:#111827;animation:pop 360ms ease both;transition:transform 200ms ease}.card:hover{transform:translateY(-4px)}@media(prefers-reduced-motion:reduce){.card{animation:none;transition:none}.card:hover{transform:none}}</style></head><body><article class="card"><h1>Motion Layer Studio</h1><p>GPU-accelerated transform &amp; opacity animations.</p></article></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Motion Layer Studio',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>@keyframes pop{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}body{margin:0;padding:24px;font-family:system-ui;background:#090d16;color:#f8fafc}.card{max-width:360px;padding:20px;border-radius:14px;background:#111827;animation:pop 360ms ease both;transition:transform 200ms ease}.card:hover{transform:translateY(-4px)}@media(prefers-reduced-motion:reduce){.card{animation:none;transition:none}.card:hover{transform:none}}</style></head><body><article class="card"><h1>Motion Layer Studio</h1><p>GPU-accelerated transform &amp; opacity animations.</p></article></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Motion Layer Studio',
    testCases: [
      { id: 'html17-t1', input: '', expectedOutput: 'Motion Layer Studio' },
      { id: 'html17-t2', input: '', expectedOutput: 'GPU-accelerated transform', isHidden: true },
    ],
  },
  18: {
    chapterNumber: 18,
    title: 'HTML Chapter 18: Accessible Forms, Fieldsets & Native Validation',
    banglaTitle: 'HTML অধ্যায় ১৮: অ্যাক্সেসিবল ফর্ম, ফিল্ডসেট ও নেটিভ ভ্যালিডেশন',
    subtitle: 'Structure multi-control forms with <fieldset>, <legend>, explicit labels, aria-describedby hints, and HTML5 constraint validation.',
    zeroIntuition: {
      plainEnglishStory:
        'A form is the primary bridge between user intent and backend state, yet most broken web flows come from unlabeled inputs, missing focus outlines, and fragile custom JavaScript regex checks. Native HTML5 constraint attributes (required, minlength, pattern, type="email") validate instantly in the browser before a single line of JS runs.\n\nPairing every <input> with a matching <label for="..."> enlarges the click target and gives screen readers an exact control name, while <fieldset> and <legend> group related controls and aria-describedby links error or helper messages programmatically.',
      asciiFlowchart: `  <form novalidate-or-native>
    <fieldset>
      <legend>Account Setup</legend>
      <label for="email">Email</label> ---> linked by id="email"
      <input id="email" type="email" required aria-describedby="email-hint" />
      <small id="email-hint">Work or student address</small>
    </fieldset>
  </form>`,
      pseudocode: [
        '1. GROUP related fields inside <fieldset> with a descriptive <legend>',
        '2. BIND every control via <label for="id"> and matching id="id"',
        '3. ADD HTML5 constraints (required, minlength, type) + :user-invalid CSS',
        '4. CONNECT helper/error hints using aria-describedby',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সরকারি ফর্মের পরিচ্ছন্ন খণ্ড ও বাধ্যতামূলক ঘর',
        explanation:
          'ধরো তুমি একটি ভর্তি ফর্ম পূরণ করছো যেখানে কোন ঘরের পাশে কী লিখতে হবে তা লেখা নেই, আর লাল কালি দিয়ে ভুল ঘরের নিচে কোনো কারণও দেখানো হয়নি। সাধারণ ব্যবহারকারী তো বিরক্ত হবেই, দৃষ্টিপ্রতিবন্ধী মানুষ স্ক্রিন রিডার দিয়ে কিছুই বুঝতে পারবে না। HTML5-এ <label for="..."> দিলে ইনপুট আর তার নাম একে অপরের সাথে জুড়ে যায়, ফলে নামের ওপর ক্লিক করলেও ইনপুট বক্স অ্যাক্টিভ হয়। সম্পর্কিত ইনপুটগুলোকে <fieldset> ও <legend> দিয়ে একসাথে সাজালে ফর্মের গঠন পরিষ্কার হয়। ইনপুটে required, type="email", minlength="8" দিলে ব্রাউজার নিজেই জাভাস্ক্রিপ্ট ছাড়াই ভুল ফরম্যাট আটকে দেয়। এ ছাড়া aria-describedby ব্যবহার করলে সহায়ক টিপস সরাসরি ইনপুটের সাথে যুক্ত হয়ে যায়। আধুনিক CSS-এ :user-invalid সিউডো-ক্লাস ব্যবহার করলে ব্যবহারকারী টাইপ করে সরে যাওয়ার পরই কেবল লাল বর্ডার দেখানো যায়, শুরুতেই বিরক্ত করে না। autocomplete অ্যাট্রিবিউট দিলে পাসওয়ার্ড ম্যানেজার ও মোবাইল কিবোর্ড দ্রুত তথ্য পূরণ করতে পারে। ভালো ফর্ম মানে কম ভুল, দ্রুত কনভার্শন ও সবার জন্য সমান ব্যবহারযোগ্যতা।',
        everydayExample: 'অনলাইন টিকিট কাটার ফর্ম: নাম, ইমেইল আর সিট পছন্দ আলাদা বক্সে স্পষ্ট নির্দেশনাসহ সাজানো থাকে।',
        keyTakeaways: [
          'প্রতিটি input-এর অবশ্যই matching id ও <label for="..."> থাকতে হবে।',
          'placeholder কখনো label-এর বিকল্প নয়, কারণ টাইপ শুরু করলেই তা উধাও হয়।',
          ':user-invalid ব্যবহার করলে ব্যবহারকারী ইন্টারঅ্যাক্ট করার পরই ভ্যালিডেশন রঙ দেখায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-18-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Label-Bound Fieldset With Native Email Validation',
        englishParagraphs: [
          'A minimal accessible signup block using <fieldset>, <legend>, <label for>, and required type="email".',
        ],
        banglaParagraphs: [
          'সঠিক label ও fieldset ব্যবহার করে অ্যাক্সেসিবল ইমেইল ফর্মের মূল কাঠামো তৈরি।',
        ],
        memoryDiagram: `<fieldset> -> <legend> + <label for="u-email"> <-> <input id="u-email" required>`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#0b1120;color:#e2e8f0}fieldset{border:1px solid #334155;border-radius:10px;padding:16px;max-width:360px}label,input,button{display:block;width:100%;margin-top:8px;box-sizing:border-box}input{padding:8px;border-radius:6px;border:1px solid #475569;background:#1e293b;color:#fff}button{padding:10px;border:0;border-radius:8px;background:#10b981;color:#052e16;font-weight:700}</style></head><body><form><fieldset><legend>Developer Account</legend><label for="u-email">Work Email</label><input id="u-email" type="email" required autocomplete="email" /><button type="submit">Create Profile</button></fieldset></form></body></html>`,
        stdin: '',
        expectedOutput: 'Developer Account',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '<fieldset><legend>Developer Account</legend>',
            whatItMeans: 'Groups related controls and announces the group title to assistive tech.',
            whyItIsThere: 'Provides structural context for screen readers.',
            ifDeletedError: 'Controls lose logical group title.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: '<label for="u-email">Work Email</label>',
            whatItMeans: 'Programmatically associates label text with #u-email.',
            whyItIsThere: 'Enables click-to-focus and accessible naming.',
            ifDeletedError: 'Screen readers announce unlabeled text field.',
          },
        ],
      },
      {
        id: 'html-ch-18-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Helper Hints via aria-describedby & :user-invalid',
        englishParagraphs: [
          'Connect a password rule hint with aria-describedby and highlight invalid state cleanly after user interaction.',
        ],
        banglaParagraphs: [
          'aria-describedby দিয়ে পাসওয়ার্ডের নিয়ম ইনপুটের সাথে বেঁধে দাও এবং :user-invalid এ স্টাইল দাও।',
        ],
        memoryDiagram: `input[aria-describedby="pw-hint"] ---> <small id="pw-hint">Min 8 chars</small>`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#0f172a;color:#f8fafc}input{padding:8px;border-radius:6px;border:2px solid #475569;background:#1e293b;color:#fff}input:user-invalid{border-color:#f43f5e}input:user-valid{border-color:#10b981}small{display:block;color:#94a3b8;margin-top:6px}</style></head><body><form><label for="pw">Passphrase</label><input id="pw" type="password" minlength="8" required aria-describedby="pw-hint" /><small id="pw-hint">Minimum 8 characters required.</small></form></body></html>`,
        stdin: '',
        expectedOutput: 'Passphrase',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'aria-describedby="pw-hint"',
            whatItMeans: 'Points assistive tech to supplementary validation instructions.',
            whyItIsThere: 'Reads out the minimum length rule automatically on focus.',
            ifDeletedError: 'Hint stays disconnected from the input.',
          },
        ],
      },
      {
        id: 'html-ch-18-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Accessible Checkout Radio Choice Card',
        englishParagraphs: [
          'Radio buttons sharing the same name attribute inside a fieldset ensure single-choice keyboard arrow navigation.',
        ],
        banglaParagraphs: [
          'একই name থাকা রেডিও বাটন কিবোর্ডের অ্যারো-কি দিয়েই সহজে সিলেক্ট করা যায়।',
        ],
        memoryDiagram: `<fieldset name="tier"> -> (o) Pro / ( ) Starter`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#090d16;color:#f8fafc}.plan{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid #334155;border-radius:8px;margin-top:8px}</style></head><body><form><fieldset><legend>Select Billing Plan</legend><label class="plan"><input type="radio" name="tier" value="starter" checked />Starter Free</label><label class="plan"><input type="radio" name="tier" value="pro" />Pro Cloud</label></fieldset></form></body></html>`,
        stdin: '',
        expectedOutput: 'Select Billing Plan',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'name="tier"',
            whatItMeans: 'Binds both radio inputs into one mutually exclusive group.',
            whyItIsThere: 'Allows arrow-key cycling and single selection.',
            ifDeletedError: 'Multiple radios can be selected simultaneously.',
          },
        ],
      },
      {
        id: 'html-ch-18-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Explicit Labels & Visible Focus Instead of Placeholder-Only Inputs',
        englishParagraphs: [
          'Never replace <label> with placeholder or strip outline:none without replacing :focus-visible.',
        ],
        banglaParagraphs: [
          'outline:none দিলে কিবোর্ড ব্যবহারকারীরা বুঝতে পারে না ফোকাস কোথায়, তাই :focus-visible রাখা জরুরি।',
        ],
        memoryDiagram: `input:focus-visible { outline: 3px solid #38bdf8; }`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#0f172a;color:#f8fafc}input{padding:8px;border:1px solid #475569;border-radius:6px;background:#1e293b;color:#fff}input:focus-visible{outline:3px solid #38bdf8;outline-offset:2px}</style></head><body><form><label for="handle">GitHub Handle</label><input id="handle" type="text" pattern="[A-Za-z0-9-]{2,20}" required /></form></body></html>`,
        stdin: '',
        expectedOutput: 'GitHub Handle',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: ':focus-visible{outline:3px solid #38bdf8',
            whatItMeans: 'Shows a crisp keyboard focus ring without cluttering mouse clicks.',
            whyItIsThere: 'Meets WCAG 2.2 focus visibility guidelines.',
            ifDeletedError: 'Keyboard Tab navigation becomes invisible.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<!doctype html>',
        whatItMeans: 'Enables HTML5 standards mode and constraint validation API.',
        whyItIsThere: 'Ensures consistent form layout and styling.',
        ifDeletedError: 'Legacy quirks rendering breaks fieldset sizing.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<fieldset><legend>Developer Account</legend>',
        whatItMeans: 'Groups related controls and announces the group title to assistive tech.',
        whyItIsThere: 'Provides structural context for screen readers.',
        ifDeletedError: 'Controls lose logical group title.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<label for="u-email">Work Email</label>',
        whatItMeans: 'Programmatically associates label text with #u-email.',
        whyItIsThere: 'Enables click-to-focus and accessible naming.',
        ifDeletedError: 'Screen readers announce unlabeled text field.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<input id="u-email" type="email" required autocomplete="email" />',
        whatItMeans: 'Enforces email format and non-empty submission natively.',
        whyItIsThere: 'Eliminates manual JS boilerplate for basic validation.',
        ifDeletedError: 'Form accepts blank or malformed email strings.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Page loads', memoryOrStack: 'label <-> #u-email linked', note: 'No premature red invalid border' },
      { step: 2, state: 'User clicks label', memoryOrStack: 'focus -> #u-email', note: 'Cursor activates input box' },
      { step: 3, state: 'User types "abc" & blurs', memoryOrStack: ':user-invalid active', note: 'Native check fails missing @' },
      { step: 4, state: 'User types "a@b.com"', memoryOrStack: 'validity.valid === true', note: 'Submit enabled cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Using placeholder Instead of <label>',
        brokenCode: `<input type="text" placeholder="Full Name" />`,
        fixedCode: `<label for="fn">Full Name</label><input id="fn" type="text" />`,
        whyItBreaks: 'Placeholders disappear as soon as typing begins and have low contrast.',
      },
      {
        title: 'Mismatched for and id Attributes',
        brokenCode: `<label for="mail">Email</label><input id="email" />`,
        fixedCode: `<label for="email">Email</label><input id="email" />`,
        whyItBreaks: 'Click-to-focus and screen reader association silently fail when strings differ.',
      },
      {
        title: 'Global input:invalid Before User Interaction',
        brokenCode: `input:invalid { border-color: red; }`,
        fixedCode: `input:user-invalid { border-color: red; }`,
        whyItBreaks: 'Required inputs glow angry red the instant the page opens before the user touches anything.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-18-p1',
        difficulty: 'Easy',
        title: 'Labeled Search Form',
        prompt: 'Build a search <form> with <label for="q">, <input id="q" type="search" required>, and a submit button.',
        banglaHint: 'ইঙ্গিত: label-এর for ও input-এর id হুবহু এক রেখো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><form><label for="q">Search Docs</label><input id="q" type="search" required /><button type="submit">Go</button></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Search Docs',
      },
      {
        id: 'html-ch-18-p2',
        difficulty: 'Easy',
        title: 'Numeric Range & Age Validation',
        prompt: 'Create an age input constrained between min="13" and max="120" inside a fieldset.',
        banglaHint: 'ইঙ্গিত: type="number" এর সাথে min="13" ও max="120" যোগ করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><form><fieldset><legend>Eligibility</legend><label for="age">Age</label><input id="age" type="number" min="13" max="120" required /></fieldset></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Eligibility',
      },
      {
        id: 'html-ch-18-p3',
        difficulty: 'Medium',
        title: 'aria-describedby Live Rule Hint',
        prompt: 'Link a username pattern input to a helper text paragraph using aria-describedby.',
        banglaHint: 'ইঙ্গিত: helper <p id="u-tip"> তৈরি করে ইনপুটে aria-describedby="u-tip" দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><body><form><label for="uname">Username</label><input id="uname" type="text" pattern="[a-z0-9_]{3,16}" required aria-describedby="u-tip" /><p id="u-tip">3-16 lowercase letters, digits, or underscore.</p></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Username',
      },
      {
        id: 'html-ch-18-p4',
        difficulty: 'Medium',
        title: 'Custom Styled Valid/Invalid States',
        prompt: 'Style an email form with :user-valid emerald border and :user-invalid rose border.',
        banglaHint: 'ইঙ্গিত: <style>-এর ভেতর input:user-valid ও input:user-invalid নিয়ম লেখো।',
        starterCode: `<!doctype html>\n<html lang="en"><head><style>input{border:2px solid #64748b;padding:8px}input:user-valid{border-color:#10b981}input:user-invalid{border-color:#f43f5e}</style></head><body><form><label for="em">Newsletter Email</label><input id="em" type="email" required /></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Newsletter Email',
      },
      {
        id: 'html-ch-18-p5',
        difficulty: 'Hard',
        title: 'Multi-Section Accessible Checkout Form',
        prompt: 'Combine two fieldsets (Contact & Payment Method radio group) with aria-describedby and autocomplete.',
        banglaHint: 'ইঙ্গিত: দুটি <fieldset> এবং রেডিও বাটনগুলোতে অভিন্ন name="pay" ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><form><fieldset><legend>Contact Details</legend><label for="fn">Full Name</label><input id="fn" autocomplete="name" required /><label for="mail">Receipt Email</label><input id="mail" type="email" autocomplete="email" aria-describedby="m-note" required /><small id="m-note">Invoice sent here.</small></fieldset><fieldset><legend>Payment Method</legend><label><input type="radio" name="pay" value="card" checked />Card</label><label><input type="radio" name="pay" value="bkash" />bKash</label></fieldset><button type="submit">Pay Now</button></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Contact Details',
      },
    ],
    miniBuild: {
      title: 'Accessible Onboarding Form Module',
      description: 'Build a complete accessible form with <fieldset>, <legend>, explicit labels, aria-describedby, and native validation.',
      banglaGoal: 'ফিল্ডসেট, লেবেল ও নেটিভ ভ্যালিডেশনসহ একটি পূর্ণাঙ্গ অ্যাক্সেসিবল ফর্ম তৈরি করা।',
      combinesChapters: 'Ch 4, 10, 18',
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#0b1120;color:#e2e8f0}fieldset{border:1px solid #334155;border-radius:10px;padding:16px;max-width:360px}label,input,button{display:block;width:100%;margin-top:8px;box-sizing:border-box}input{padding:8px;border-radius:6px;border:1px solid #475569;background:#1e293b;color:#fff}button{padding:10px;border:0;border-radius:8px;background:#10b981;color:#052e16;font-weight:700}</style></head><body><form><fieldset><legend>Developer Account</legend><label for="u-email">Work Email</label><input id="u-email" type="email" required autocomplete="email" /><button type="submit">Create Profile</button></fieldset></form></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Developer Account',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:20px;background:#0b1120;color:#e2e8f0}fieldset{border:1px solid #334155;border-radius:10px;padding:16px;max-width:360px}label,input,button{display:block;width:100%;margin-top:8px;box-sizing:border-box}input{padding:8px;border-radius:6px;border:1px solid #475569;background:#1e293b;color:#fff}button{padding:10px;border:0;border-radius:8px;background:#10b981;color:#052e16;font-weight:700}</style></head><body><form><fieldset><legend>Developer Account</legend><label for="u-email">Work Email</label><input id="u-email" type="email" required autocomplete="email" /><button type="submit">Create Profile</button></fieldset></form></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Developer Account',
    testCases: [
      { id: 'html18-t1', input: '', expectedOutput: 'Developer Account' },
      { id: 'html18-t2', input: '', expectedOutput: 'Work Email', isHidden: true },
    ],
  },
  19: {
    chapterNumber: 19,
    title: 'HTML Chapter 19: Web Components, <template>, <slot> & Shadow DOM',
    banglaTitle: 'HTML অধ্যায় ১৯: ওয়েব কম্পোনেন্টস, <template>, <slot> ও শ্যাডো DOM',
    subtitle: 'Build zero-framework reusable custom HTML elements using <template>, <slot>, customElements.define, and encapsulated Shadow DOM.',
    zeroIntuition: {
      plainEnglishStory:
        'Before heavy frontend frameworks existed, HTML added native Web Components so you can invent your own tags like <status-badge> or <user-card>. An inert <template> stores reusable markup in memory without rendering until cloned, while attachShadow({ mode: "open" }) isolates a component’s CSS so global page styles never accidentally break its layout.\n\nInside a Shadow Tree, <slot> acts as a projection portal: whatever child text or markup the page author puts inside <status-badge>Live</status-badge> automatically projects into the right spot inside the encapsulated design.',
      asciiFlowchart: `  <template id="tpl">  (inert DOM blueprint)
      +-- <style>.pill { color: #10b981; }</style>   <-- scoped inside Shadow DOM!
      +-- <span class="pill"><slot></slot></span>
  </template>
          | clone + attachShadow
          v
  <status-badge>Deployed</status-badge> ---> renders isolated styled pill`,
      pseudocode: [
        '1. DEFINE inert <template> containing scoped <style> and <slot>',
        '2. SUBCLASS HTMLElement and call this.attachShadow({ mode: "open" })',
        '3. CLONE template.content into shadowRoot inside connectedCallback()',
        '4. REGISTER tag name containing a hyphen via customElements.define',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংসম্পূর্ণ রুম ও পোর্টাল জানালা (Shadow DOM & Slot)',
        explanation:
          'ধরো তুমি একটি বড় ওয়েবসাইটে ৫০ জায়গায় একটি সুন্দর নোটিফিকেশন ব্যাজ ব্যবহার করবে, কিন্তু ভয় পাচ্ছো মূল পেজের CSS-এর কারণে ব্যাজের ডিজাইন নষ্ট হয়ে যাবে। HTML5-এর Web Components ঠিক একটি সাউন্ডপ্রুফ স্টুডিও রুমের মতো সমাধান দেয়। প্রথমে <template> ট্যাগের ভেতরে কম্পোনেন্টের নকশা ও CSS লিখে রাখা হয়, যা শুরুতে স্ক্রিনে দেখা যায় না। এরপর customElements.define দিয়ে নিজের মতো হাইফেন-যুক্ত ট্যাগ যেমন <status-badge> তৈরি করা হয়। attachShadow({ mode: "open" }) কল করলে ওই ট্যাগের ভেতর একটি আলাদা Shadow DOM তৈরি হয়—যার CSS বাইরের পেজকে ছোঁয় না এবং বাইরের CSS ভেতরে ঢুকে ডিজাইন নষ্ট করতে পারে না। আর <slot> ট্যাগ একটি ম্যাজিক জানালার মতো কাজ করে, যার মাধ্যমে ট্যাগের ভেতর লেখা কন্টেন্ট শ্যাডো ট্রি-র নির্দিষ্ট জায়গায় বসে যায়। কোনো React বা Vue ছাড়াই ব্রাউজার নেটিভভাবে এই পুনরায় ব্যবহারযোগ্য কম্পোনেন্ট চালায়। আধুনিক ডিজাইন সিস্টেম ও এমবেডেড উইজেট তৈরিতে এটি অত্যন্ত শক্তিশালী একটি মানদণ্ড।',
        everydayExample: 'টিভি রিমোটের ব্যাটারি কভার: ভেতরের সার্কিট শ্যাডো ডোমের মতো সুরক্ষিত, আর কেবল বাইরের বাটনের স্লট ব্যবহারকারীর জন্য খোলা।',
        keyTakeaways: [
          'সব কাস্টম এলিমেন্টের নামে অবশ্যই একটি হাইফেন (-) থাকতে হবে (যেমন user-card)।',
          'Shadow DOM CSS এনক্যাপসুলেশন নিশ্চিত করে—বাইরের স্টাইল ভেতরে ঢোকে না।',
          '<slot> ব্যবহার করলে কাস্টম ট্যাগের ভেতরের চাইল্ড কন্টেন্ট ডাইনামিকভাবে দেখানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-19-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Custom <status-badge> With Shadow DOM & <slot>',
        englishParagraphs: [
          'Encapsulate pill CSS inside a Shadow Root while projecting inner light-DOM text through <slot>.',
        ],
        banglaParagraphs: [
          '<status-badge> ট্যাগের ভেতর attachShadow ও <slot> দিয়ে সুরক্ষিত ব্যাজ কম্পোনেন্ট তৈরি।',
        ],
        memoryDiagram: `Light DOM: <status-badge>Ready</status-badge> -> Shadow Slot -> Styled Pill`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}</style></head><body><h1>Shadow Badge Host</h1><status-badge>System Online</status-badge><script>class StatusBadge extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const s=this.attachShadow({mode:'open'});s.innerHTML='<style>.pill{display:inline-block;padding:6px 12px;border-radius:999px;background:#064e3b;color:#34d399;font-weight:700}</style><span class="pill"><slot></slot></span>'}}customElements.define('status-badge',StatusBadge);</script></body></html>`,
        stdin: '',
        expectedOutput: 'Shadow Badge Host',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: "this.attachShadow({mode:'open'})",
            whatItMeans: 'Creates an encapsulated DOM subtree isolated from global CSS.',
            whyItIsThere: 'Protects component styling from page-wide rules.',
            ifDeletedError: 'Styles leak in and out of global document.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: "customElements.define('status-badge',StatusBadge)",
            whatItMeans: 'Registers <status-badge> with the browser parser.',
            whyItIsThere: 'Upgrades custom tag instances automatically.',
            ifDeletedError: 'Browser treats tag as plain unstyled unknown element.',
          },
        ],
      },
      {
        id: 'html-ch-19-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Cloned <template> & Named <slot name="title">',
        englishParagraphs: [
          'Named slots direct header and body markup into dedicated regions inside an HTML <template>.',
        ],
        banglaParagraphs: [
          '<template> ক্লোন করে named <slot> এর মাধ্যমে কার্ডের টাইটেল ও বিবরণ আলাদা জায়গায় বসানো।',
        ],
        memoryDiagram: `<slot name="title"> + <slot name="body"> cloned from <template id="card-tpl">`,
        code: `<!doctype html>
<html lang="en"><body><template id="card-tpl"><style>.box{border:1px solid #334155;padding:16px;border-radius:10px;background:#111827;color:#f8fafc;max-width:340px}</style><div class="box"><h2><slot name="title">Default</slot></h2><p><slot></slot></p></div></template><metric-card><span slot="title">Uptime 99.98%</span>Cluster healthy.</metric-card><script>class MetricCard extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const tpl=document.getElementById('card-tpl');this.attachShadow({mode:'open'}).appendChild(tpl.content.cloneNode(true))}}customElements.define('metric-card',MetricCard);</script></body></html>`,
        stdin: '',
        expectedOutput: 'Uptime 99.98%',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'tpl.content.cloneNode(true)',
            whatItMeans: 'Deep-clones inert <template> DOM fragment cleanly.',
            whyItIsThere: 'Avoids re-parsing HTML strings for every component instance.',
            ifDeletedError: 'Moving instead of cloning empties the template after first card.',
          },
        ],
      },
      {
        id: 'html-ch-19-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Attribute-Driven Alert Banner With observedAttributes',
        englishParagraphs: [
          'Web Components react to HTML attribute updates natively via attributeChangedCallback.',
        ],
        banglaParagraphs: [
          'observedAttributes ও attributeChangedCallback দিয়ে HTML অ্যাট্রিবিউট বদলালেই কম্পোনেন্ট আপডেট হয়।',
        ],
        memoryDiagram: `tone="warn" -> observedAttributes -> re-styles banner`,
        code: `<!doctype html>
<html lang="en"><body style="background:#0f172a;color:#fff;padding:20px;font-family:system-ui"><alert-strip tone="ok">Build Passed Zero Errors</alert-strip><script>class AlertStrip extends HTMLElement{static get observedAttributes(){return['tone']}connectedCallback(){if(!this.shadowRoot){this.attachShadow({mode:'open'}).innerHTML='<style>.bar{padding:12px;border-left:4px solid #10b981;background:#1e293b;border-radius:6px}</style><div class="bar"><slot></slot></div>'}}attributeChangedCallback(){}}customElements.define('alert-strip',AlertStrip);</script></body></html>`,
        stdin: '',
        expectedOutput: 'Build Passed Zero Errors',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: "static get observedAttributes(){return['tone']}",
            whatItMeans: 'Lists HTML attributes that trigger reactive callbacks.',
            whyItIsThere: 'Enables declarative attribute-driven state.',
            ifDeletedError: 'Attribute changes do not notify the component class.',
          },
        ],
      },
      {
        id: 'html-ch-19-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'CSS :host Selector & Safe Hyphenated Naming',
        englishParagraphs: [
          'Style the custom element wrapper itself using :host inside Shadow DOM rather than hardcoding external tag margins.',
        ],
        banglaParagraphs: [
          'Shadow DOM-এর ভেতর থেকে কাস্টম এলিমেন্টের মূল বক্সকে স্টাইল করতে :host সিলেক্টর ব্যবহার করতে হয়।',
        ],
        memoryDiagram: `:host { display: block; margin: 12px 0; }`,
        code: `<!doctype html>
<html lang="en"><body><info-panel>Isolated Host Styling Active</info-panel><script>class InfoPanel extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;this.attachShadow({mode:'open'}).innerHTML='<style>:host{display:block;padding:14px;border-radius:10px;background:#1e293b;color:#38bdf8;font-family:system-ui}</style><slot></slot>'}}customElements.define('info-panel',InfoPanel);</script></body></html>`,
        stdin: '',
        expectedOutput: 'Isolated Host Styling Active',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: ':host{display:block;',
            whatItMeans: 'Sets layout properties on the custom element host tag itself.',
            whyItIsThere: 'Custom elements default to display:inline unless :host sets block.',
            ifDeletedError: 'Padding and width collapse on inline custom tag.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<!doctype html>',
        whatItMeans: 'Activates HTML5 parser supporting template and Custom Elements v1.',
        whyItIsThere: 'Ensures consistent DOM upgrade timing.',
        ifDeletedError: 'Quirks layout breaks component sizing.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<status-badge>System Online</status-badge>',
        whatItMeans: 'Custom hyphenated element whose text lives in Light DOM.',
        whyItIsThere: 'Demonstrates declarative custom component usage.',
        ifDeletedError: 'Component is never instantiated on the page.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: "this.attachShadow({mode:'open'})",
        whatItMeans: 'Creates an encapsulated DOM subtree isolated from global CSS.',
        whyItIsThere: 'Protects component styling from page-wide rules.',
        ifDeletedError: 'Styles leak in and out of global document.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: "customElements.define('status-badge',StatusBadge)",
        whatItMeans: 'Registers <status-badge> with the browser parser.',
        whyItIsThere: 'Upgrades custom tag instances automatically.',
        ifDeletedError: 'Browser treats tag as plain unstyled unknown element.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parser sees <status-badge>', memoryOrStack: 'Light DOM text="System Online"', note: 'Element created' },
      { step: 2, state: 'customElements.define runs', memoryOrStack: 'Upgrades <status-badge>', note: 'Calls connectedCallback()' },
      { step: 3, state: 'attachShadow({mode:"open"})', memoryOrStack: 'ShadowRoot attached', note: 'Scoped CSS parsed' },
      { step: 4, state: '<slot> projects text', memoryOrStack: 'Renders pill badge', note: 'Global CSS remains isolated' },
    ],
    harryBugTraps: [
      {
        title: 'Custom Tag Name Without a Hyphen',
        brokenCode: `customElements.define('badge', BadgeClass);`,
        fixedCode: `customElements.define('status-badge', BadgeClass);`,
        whyItBreaks: 'HTML spec forbids single-word custom tags so future native HTML elements never collide.',
      },
      {
        title: 'Appending template.content Without cloneNode(true)',
        brokenCode: `shadow.appendChild(tpl.content);`,
        fixedCode: `shadow.appendChild(tpl.content.cloneNode(true));`,
        whyItBreaks: 'Appending directly moves nodes out of the template, leaving subsequent instances blank.',
      },
      {
        title: 'Creating Shadow Root Repeatedly on Re-Mount',
        brokenCode: `connectedCallback(){ this.attachShadow({mode:'open'}); }`,
        fixedCode: `connectedCallback(){ if(this.shadowRoot) return; this.attachShadow({mode:'open'}); }`,
        whyItBreaks: 'Moving an element in the DOM fires connectedCallback again and throws NotSupportedError.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-19-p1',
        difficulty: 'Easy',
        title: 'Tag Pill Web Component',
        prompt: 'Create a <tag-pill> component with Shadow DOM and default <slot> rendering "TypeScript".',
        banglaHint: 'ইঙ্গিত: customElements.define এ হাইফেনযুক্ত নাম tag-pill ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><tag-pill>TypeScript</tag-pill><script>class TagPill extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;this.attachShadow({mode:'open'}).innerHTML='<style>.t{padding:4px 10px;border-radius:8px;background:#1e293b;color:#38bdf8}</style><span class="t"><slot></slot></span>'}}customElements.define('tag-pill',TagPill);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'TypeScript',
      },
      {
        id: 'html-ch-19-p2',
        difficulty: 'Easy',
        title: 'Inert <template> Cloner',
        prompt: 'Define <template id="row-tpl"> and clone it into Shadow DOM for a <stat-row> custom element.',
        banglaHint: 'ইঙ্গিত: document.getElementById("row-tpl").content.cloneNode(true) ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><template id="row-tpl"><div><strong>Metric:</strong> <slot></slot></div></template><stat-row>42 ms latency</stat-row><script>class StatRow extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const t=document.getElementById('row-tpl');this.attachShadow({mode:'open'}).appendChild(t.content.cloneNode(true))}}customElements.define('stat-row',StatRow);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: '42 ms latency',
      },
      {
        id: 'html-ch-19-p3',
        difficulty: 'Medium',
        title: 'Multi-Slot Profile Header',
        prompt: 'Build <author-chip> with named slot="name" and slot="role" projected inside a card.',
        banglaHint: 'ইঙ্গিত: শ্যাডো টেমপ্লেটে <slot name="name"> এবং <slot name="role"> বসাও।',
        starterCode: `<!doctype html>\n<html lang="en"><body><author-chip><span slot="name">Rafi</span><span slot="role">Systems Engineer</span></author-chip><script>class AuthorChip extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;this.attachShadow({mode:'open'}).innerHTML='<style>:host{display:block;font-family:system-ui}</style><b><slot name="name"></slot></b> — <span><slot name="role"></slot></span>'}}customElements.define('author-chip',AuthorChip);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Systems Engineer',
      },
      {
        id: 'html-ch-19-p4',
        difficulty: 'Medium',
        title: 'Fallback Slot Content',
        prompt: 'Include fallback text inside <slot>No alerts queued</slot> when a <queue-box> has no children, and render an active one too.',
        banglaHint: 'ইঙ্গিত: <slot>Default</slot> লিখলে চাইল্ড না থাকলে ডিফল্ট টেক্সট দেখায়।',
        starterCode: `<!doctype html>\n<html lang="en"><body><queue-box></queue-box><queue-box>Job #19 Running</queue-box><script>class QueueBox extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;this.attachShadow({mode:'open'}).innerHTML='<div style="padding:8px;border:1px solid #334155"><slot>No alerts queued</slot></div>'}}customElements.define('queue-box',QueueBox);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Job #19 Running',
      },
      {
        id: 'html-ch-19-p5',
        difficulty: 'Hard',
        title: 'Reusable Interactive Counter Web Component',
        prompt: 'Create a <step-counter> Web Component with an internal button inside Shadow DOM and custom title slot.',
        banglaHint: 'ইঙ্গিত: shadowRoot.querySelector দিয়ে ভেতরের বাটনে click লিসেনার যোগ করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><step-counter><span slot="label">Deploy Check</span></step-counter><script>class StepCounter extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const s=this.attachShadow({mode:'open'});s.innerHTML='<style>:host{display:inline-block;padding:12px;background:#111827;color:#fff;border-radius:10px}button{margin-left:8px}</style><slot name="label"></slot><button type="button">Count: 0</button>';let c=0;const btn=s.querySelector('button');btn.addEventListener('click',()=>{c++;btn.textContent='Count: '+c;});}}customElements.define('step-counter',StepCounter);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Deploy Check',
      },
    ],
    miniBuild: {
      title: 'Encapsulated Status Badge Component',
      description: 'Build a reusable <status-badge> Web Component using Shadow DOM, scoped CSS, and <slot> projection.',
      banglaGoal: 'Shadow DOM ও <slot> দিয়ে একটি সম্পূর্ণ স্বয়ংসম্পূর্ণ ওয়েব কম্পোনেন্ট তৈরি করা।',
      combinesChapters: 'Ch 16, 17, 19',
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}</style></head><body><h1>Shadow Badge Host</h1><status-badge>System Online</status-badge><script>class StatusBadge extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const s=this.attachShadow({mode:'open'});s.innerHTML='<style>.pill{display:inline-block;padding:6px 12px;border-radius:999px;background:#064e3b;color:#34d399;font-weight:700}</style><span class="pill"><slot></slot></span>'}}customElements.define('status-badge',StatusBadge);</script></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Shadow Badge Host',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}</style></head><body><h1>Shadow Badge Host</h1><status-badge>System Online</status-badge><script>class StatusBadge extends HTMLElement{connectedCallback(){if(this.shadowRoot)return;const s=this.attachShadow({mode:'open'});s.innerHTML='<style>.pill{display:inline-block;padding:6px 12px;border-radius:999px;background:#064e3b;color:#34d399;font-weight:700}</style><span class="pill"><slot></slot></span>'}}customElements.define('status-badge',StatusBadge);</script></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Shadow Badge Host',
    testCases: [
      { id: 'html19-t1', input: '', expectedOutput: 'Shadow Badge Host' },
      { id: 'html19-t2', input: '', expectedOutput: 'System Online', isHidden: true },
    ],
  },
  20: {
    chapterNumber: 20,
    isMilestoneMerger: true,
    title: 'HTML Chapter 20: HTML Forms, Interactive Media & Web APIs — Merger 4',
    banglaTitle: 'HTML অধ্যায় ২০: ফর্ম, মিডিয়া এলিমেন্ট ও ওয়েব API — মার্জার ৪',
    subtitle: 'Milestone Merger 4: Combine accessible forms, native <dialog> modals, <audio>/<video> media controls, and Web Storage/Canvas.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern HTML5 delivers rich native UI superpowers without external libraries: <dialog> provides built-in focus trapping, Escape-to-close, and ::backdrop dimming via showModal(), while <audio> and <video> offer native hardware-accelerated playback with <track kind="captions"> for accessibility.\n\nIn Milestone Merger 4, you bring together semantic landmarks, accessible forms, <dialog> modals, and browser Web APIs like localStorage or <canvas> into one cohesive interactive web studio.',
      asciiFlowchart: `  [ Page Trigger Button ] --(.showModal())--> [ Top-Layer <dialog> ]
          |                                           |
          +--> Native ::backdrop + Esc Key Close <-----+
          +--> Embedded <form method="dialog"> & <video>/<audio> + <track>`,
      pseudocode: [
        '1. STRUCTURE host UI with semantic landmarks (<header>, <main>)',
        '2. INCLUDE accessible <form> controls paired with explicit <label>',
        '3. ADD native <dialog> modal with showModal() and Escape support',
        '4. INTEGRATE native media (<video>/<audio> + <track>) or Web API state',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্রাউজারের নেটিভ স্টুডিও: ডায়ালগ, মিডিয়া ও ফর্ম সমন্বয় (মার্জার ৪)',
        explanation:
          'একসময় মডাল পপআপ বা অডিও-ভিডিও প্লেয়ার বানাতে হলে শত শত লাইনের জাভাস্ক্রিপ্ট ও তৃতীয় পক্ষের প্লাগইন লাগত, তবুও কিবোর্ড ফোকাস বাইরে বেরিয়ে যেত। আধুনিক HTML5 সরাসরি ব্রাউজারের ভেতর নেটিভ <dialog> ট্যাগ দিয়েছে। dialog.showModal() কল করলেই পেজের বাকি অংশ নিষ্ক্রিয় হয়ে যায়, সুন্দর ::backdrop তৈরি হয় এবং Esc চাপলেই মডাল বন্ধ হয়ে ফোকাস আগের বাটনে ফিরে আসে! একইভাবে <video controls> বা <audio controls>-এর ভেতর একাধিক <source> ও শ্রবণপ্রতিবন্ধীদের জন্য <track kind="captions"> দিলে সবার জন্য মানসম্মত মিডিয়া অভিজ্ঞতা তৈরি হয়। আর ফর্মের সাথে method="dialog" ব্যবহার করলে সার্ভার রিলোড ছাড়াই মডাল থেকে ডেটা গ্রহণ করা যায়। মার্জার ৪ অধ্যায়ে আমরা এই সব অ্যাক্সেসিবল ফর্ম, সিমান্টিক ল্যান্ডমার্ক, কাস্টম স্টাইলিং ও নেটিভ ওয়েব API একত্র করে পূর্ণাঙ্গ ইন্টারঅ্যাক্টিভ অ্যাপ মডিউল তৈরি করবো। ভারী লাইব্রেরি ছাড়া দ্রুতগতির ওয়েবসাইট বানানোর এটিই সেরা উপায়।',
        everydayExample: 'স্মার্টফোনের বিল্ট-ইন ক্যামেরা ও অ্যালার্ট ডায়ালগ: বাড়তি অ্যাপ ছাড়াই অপারেটিং সিস্টেম নিজেই নিরাপদ পপআপ দেখায়।',
        keyTakeaways: [
          '<dialog>.showModal() স্বয়ংক্রিয়ভাবে ফোকাস-ট্র্যাপিং ও ::backdrop সাপোর্ট দেয়।',
          'মিডিয়া ট্যাগে সর্বদা controls অ্যাট্রিবিউট ও <track kind="captions"> রাখা উচিত।',
          'ফর্ম ও Web API (যেমন localStorage) একসাথে ব্যবহার করে ক্লায়েন্ট স্টেট সংরক্ষণ করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Native <dialog> Modal With ::backdrop & Form Close',
        englishParagraphs: [
          'Using <dialog> with showModal() and <form method="dialog"> handles Escape close, backdrop dimming, and return focus natively.',
        ],
        banglaParagraphs: [
          'নেটিভ <dialog> এবং form method="dialog" দিয়ে সহজেই অ্যাক্সেসিবল মডাল পপআপ তৈরি হয়।',
        ],
        memoryDiagram: `btn.onclick -> dlg.showModal() -> Top Layer ::backdrop -> Esc/Close -> Focus returns`,
        code: `<!doctype html>
<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}dialog{border:1px solid #334155;border-radius:12px;background:#111827;color:#f8fafc;padding:20px}dialog::backdrop{background:rgba(0,0,0,0.65)}</style></head><body><main><h1>Native Dialog Studio</h1><button id="open" type="button">Open Settings</button><dialog id="dlg"><h2>Workspace Settings</h2><form method="dialog"><label for="theme">Theme</label><input id="theme" value="Obsidian" /><button value="save">Save</button></form></dialog></main><script>const d=document.getElementById('dlg');document.getElementById('open').onclick=()=>d.showModal();</script></body></html>`,
        stdin: '',
        expectedOutput: 'Native Dialog Studio',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '<dialog id="dlg">',
            whatItMeans: 'Creates an HTML5 modal element rendered in the browser top layer.',
            whyItIsThere: 'Guarantees stacking above any z-index without CSS hacks.',
            ifDeletedError: 'Settings dialog does not exist.',
          },
          {
            lineNumber: 'Line 2',
            codeSnippet: 'd.showModal()',
            whatItMeans: 'Opens dialog modally with Escape close and inert background.',
            whyItIsThere: 'Prevents keyboard Tab from escaping behind the popup.',
            ifDeletedError: 'Button click fails to open modal.',
          },
        ],
      },
      {
        id: 'html-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Accessible <video> Player With <track> Captions',
        englishParagraphs: [
          'Provide explicit width/height to prevent layout shift and include <track kind="captions"> for deaf/hard-of-hearing users.',
        ],
        banglaParagraphs: [
          'ভিডিও প্লেয়ারে width/height ও <track kind="captions"> দিলে লেআউট স্থির ও অ্যাক্সেসিবল থাকে।',
        ],
        memoryDiagram: `<video controls> -> <source type="video/mp4"> + <track kind="captions" default>`,
        code: `<!doctype html>
<html lang="en"><body style="background:#0f172a;color:#fff;padding:20px;font-family:system-ui"><section><h1>Media Lecture Player</h1><video controls width="480" height="270" preload="metadata"><source src="lesson.mp4" type="video/mp4" /><track kind="captions" src="bn.vtt" srclang="bn" label="Bangla" default />Your browser does not support HTML5 video.</video></section></body></html>`,
        stdin: '',
        expectedOutput: 'Media Lecture Player',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: '<track kind="captions" src="bn.vtt" srclang="bn" label="Bangla" default />',
            whatItMeans: 'Attaches timed WebVTT captions track to the media timeline.',
            whyItIsThere: 'Makes video lectures accessible for muted playback and screen readers.',
            ifDeletedError: 'Captions toggle is missing from player UI.',
          },
        ],
      },
      {
        id: 'html-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Form + localStorage Draft Persistence',
        englishParagraphs: [
          'Persist form notes locally across refreshes using the Web Storage API cleanly.',
        ],
        banglaParagraphs: [
          'localStorage ওয়েব API ব্যবহার করে ফর্মের নোট ব্রাউজারে সেভ করে রাখা।',
        ],
        memoryDiagram: `<textarea id="note"> --input--> localStorage.setItem("draft", val)`,
        code: `<!doctype html>
<html lang="en"><body style="background:#090d16;color:#f8fafc;padding:20px;font-family:system-ui"><main><h1>Persistent Note Pad</h1><label for="note">Study Draft</label><textarea id="note" rows="4" cols="40">Ready to save notes.</textarea><script>const n=document.getElementById('note');try{const s=localStorage.getItem('argon_draft');if(s)n.value=s;n.addEventListener('input',()=>localStorage.setItem('argon_draft',n.value));}catch(e){}</script></main></body></html>`,
        stdin: '',
        expectedOutput: 'Persistent Note Pad',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: "localStorage.setItem('argon_draft',n.value)",
            whatItMeans: 'Stores string draft inside origin-scoped persistent browser storage.',
            whyItIsThere: 'Prevents accidental form data loss on reload.',
            ifDeletedError: 'Typed notes disappear on page refresh.',
          },
        ],
      },
      {
        id: 'html-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Using <dialog>.showModal() Instead of .open Attribute Alone',
        englishParagraphs: [
          'Setting <dialog open> renders non-modally without ::backdrop or focus trapping; always invoke .showModal() via JS.',
        ],
        banglaParagraphs: [
          'সরাসরি <dialog open> দিলে ::backdrop ও ফোকাস-ট্র্যাপ কাজ করে না; তাই showModal() কল করবে।',
        ],
        memoryDiagram: `showModal() => Top Layer + ::backdrop + Esc | open attribute => inline non-modal`,
        code: `<!doctype html>
<html lang="en"><body style="background:#0f172a;color:#fff;padding:20px;font-family:system-ui"><button id="b" type="button">Launch Modal</button><dialog id="m" aria-labelledby="mt"><h2 id="mt">Confirm Action</h2><form method="dialog"><button>Close</button></form></dialog><script>const m=document.getElementById('m');document.getElementById('b').onclick=()=>m.showModal();</script></body></html>`,
        stdin: '',
        expectedOutput: 'Launch Modal',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'aria-labelledby="mt"',
            whatItMeans: 'Connects modal accessible title directly to the heading inside it.',
            whyItIsThere: 'Announces purpose immediately when screen reader enters dialog.',
            ifDeletedError: 'Dialog announces without a clear accessible name.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<!doctype html>',
        whatItMeans: 'Enables HTML5 standards mode and native <dialog> API.',
        whyItIsThere: 'Guarantees top-layer modal rendering.',
        ifDeletedError: 'Layout quirks distort dialog centering.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<dialog id="dlg">',
        whatItMeans: 'Creates an HTML5 modal element rendered in the browser top layer.',
        whyItIsThere: 'Guarantees stacking above any z-index without CSS hacks.',
        ifDeletedError: 'Settings dialog does not exist.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<form method="dialog">',
        whatItMeans: 'Submitting any button inside closes the dialog automatically without network request.',
        whyItIsThere: 'Captures choice in dlg.returnValue cleanly.',
        ifDeletedError: 'Form submission reloads the page.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'd.showModal()',
        whatItMeans: 'Opens dialog modally with Escape close and inert background.',
        whyItIsThere: 'Prevents keyboard Tab from escaping behind the popup.',
        ifDeletedError: 'Button click fails to open modal.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Page loads', memoryOrStack: '<dialog> hidden', note: 'Inert until opened' },
      { step: 2, state: 'Click "Open Settings"', memoryOrStack: 'd.showModal() called', note: 'Moved to top layer + ::backdrop' },
      { step: 3, state: 'User presses Tab', memoryOrStack: 'Focus stays inside #dlg', note: 'Native focus trap active' },
      { step: 4, state: 'Submit <form method="dialog">', memoryOrStack: 'd.close("save")', note: 'Focus returns to #open button' },
    ],
    harryBugTraps: [
      {
        title: 'Using <video autoplay> Without muted',
        brokenCode: `<video autoplay src="clip.mp4"></video>`,
        fixedCode: `<video controls muted playsinline src="clip.mp4"></video>`,
        whyItBreaks: 'Modern browsers block unmuted autoplay videos by default to protect users from sudden noise.',
      },
      {
        title: 'Using <form> Without method="dialog" Inside <dialog>',
        brokenCode: `<dialog><form><button>Close</button></form></dialog>`,
        fixedCode: `<dialog><form method="dialog"><button>Close</button></form></dialog>`,
        whyItBreaks: 'Default GET form submission reloads the page instead of closing the modal.',
      },
      {
        title: 'Missing <track kind="captions"> on Video Lectures',
        brokenCode: `<video controls src="talk.mp4"></video>`,
        fixedCode: `<video controls><source src="talk.mp4" /><track kind="captions" src="sub.vtt" srclang="en" default /></video>`,
        whyItBreaks: 'Fails accessibility standards and excludes users without audio.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-20-p1',
        difficulty: 'Easy',
        title: 'Native Modal Confirmation Dialog',
        prompt: 'Create a button that calls showModal() on a <dialog> containing a <form method="dialog"> close button.',
        banglaHint: 'ইঙ্গিত: <form method="dialog"> দিলে বাটনে ক্লিক করলেই মডাল বন্ধ হয়।',
        starterCode: `<!doctype html>\n<html lang="en"><body><button id="op" type="button">Delete Item</button><dialog id="cf"><p>Confirm delete?</p><form method="dialog"><button>Cancel</button></form></dialog><script>document.getElementById('op').onclick=()=>document.getElementById('cf').showModal();</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Delete Item',
      },
      {
        id: 'html-ch-20-p2',
        difficulty: 'Easy',
        title: 'Audio Podcast Player With Fallback',
        prompt: 'Build an <audio controls> element with MP3 and OGG <source> tags plus accessible heading.',
        banglaHint: 'ইঙ্গিত: <audio controls> এর ভেতর দুটি <source> ট্যাগ দাও।',
        starterCode: `<!doctype html>\n<html lang="en"><body><section><h2>Episode 20: Web APIs</h2><audio controls preload="metadata"><source src="ep20.mp3" type="audio/mpeg" /><source src="ep20.ogg" type="audio/ogg" />Audio unsupported.</audio></section></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Episode 20: Web APIs',
      },
      {
        id: 'html-ch-20-p3',
        difficulty: 'Medium',
        title: 'Canvas Badge Renderer',
        prompt: 'Draw an emerald rectangle and label on an HTML5 <canvas id="c" width="320" height="120">.',
        banglaHint: 'ইঙ্গিত: canvas.getContext("2d") নিয়ে fillRect ও fillText কল করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><h1>Canvas Telemetry</h1><canvas id="c" width="320" height="120"></canvas><script>const ctx=document.getElementById('c').getContext('2d');ctx.fillStyle='#064e3b';ctx.fillRect(0,0,320,120);ctx.fillStyle='#34d399';ctx.font='bold 20px system-ui';ctx.fillText('Argon Studio',24,68);</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Canvas Telemetry',
      },
      {
        id: 'html-ch-20-p4',
        difficulty: 'Medium',
        title: 'Accessible Form Submission Summary Banner',
        prompt: 'Intercept form submit with preventDefault() and display submitted email in an aria-live="polite" banner.',
        banglaHint: 'ইঙ্গিত: form submit ইভেন্টে event.preventDefault() করে #msg টেক্সট আপডেট করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><form id="f"><label for="em">Subscribe</label><input id="em" type="email" required /><button type="submit">Join</button></form><p id="msg" aria-live="polite">Ready to subscribe</p><script>document.getElementById('f').addEventListener('submit',(e)=>{e.preventDefault();document.getElementById('msg').textContent='Joined!';});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Ready to subscribe',
      },
      {
        id: 'html-ch-20-p5',
        difficulty: 'Hard',
        title: 'Integrated Form + Dialog + Media Hub',
        prompt: 'Combine an accessible <form>, a native <dialog> preview, and a captioned <video> container in one semantic <main>.',
        banglaHint: 'ইঙ্গিত: <main>-এর ভেতর form, dialog ও video ট্যাগ সুন্দরভাবে বিন্যস্ত করো।',
        starterCode: `<!doctype html>\n<html lang="en"><body><main><h1>Creator Hub</h1><form><fieldset><legend>Upload</legend><label for="t">Title</label><input id="t" required /></fieldset></form><video controls width="320"><source src="demo.mp4" type="video/mp4" /><track kind="captions" src="en.vtt" srclang="en" default /></video><dialog id="d"><form method="dialog"><button>Done</button></form></dialog></main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Creator Hub',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Native Dialog, Form & Media Studio',
      description: 'Combine accessible forms, native <dialog> showModal(), and semantic HTML5 landmarks in one integrated module.',
      banglaGoal: 'মার্জার ৪: নেটিভ <dialog>, অ্যাক্সেসিবল ফর্ম ও মিডিয়া ফিচার একত্র করে সম্পূর্ণ স্টুডিও মডিউল বানানো।',
      combinesChapters: 'Ch 16, 18, 19, 20',
      starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}dialog{border:1px solid #334155;border-radius:12px;background:#111827;color:#f8fafc;padding:20px}dialog::backdrop{background:rgba(0,0,0,0.65)}</style></head><body><main><h1>Native Dialog Studio</h1><button id="open" type="button">Open Settings</button><dialog id="dlg"><h2>Workspace Settings</h2><form method="dialog"><label for="theme">Theme</label><input id="theme" value="Obsidian" /><button value="save">Save</button></form></dialog></main><script>const d=document.getElementById('dlg');document.getElementById('open').onclick=()=>d.showModal();</script></body></html>`,
      sampleStdin: '',
      expectedOutput: 'Native Dialog Studio',
    },
    starterCode: `<!doctype html>\n<html lang="en"><head><style>body{font-family:system-ui;padding:24px;background:#090d16;color:#f8fafc}dialog{border:1px solid #334155;border-radius:12px;background:#111827;color:#f8fafc;padding:20px}dialog::backdrop{background:rgba(0,0,0,0.65)}</style></head><body><main><h1>Native Dialog Studio</h1><button id="open" type="button">Open Settings</button><dialog id="dlg"><h2>Workspace Settings</h2><form method="dialog"><label for="theme">Theme</label><input id="theme" value="Obsidian" /><button value="save">Save</button></form></dialog></main><script>const d=document.getElementById('dlg');document.getElementById('open').onclick=()=>d.showModal();</script></body></html>`,
    sampleStdin: '',
    expectedSampleOutput: 'Native Dialog Studio',
    testCases: [
      { id: 'html20-t1', input: '', expectedOutput: 'Native Dialog Studio' },
      { id: 'html20-t2', input: '', expectedOutput: 'Workspace Settings', isHidden: true },
    ],
  },
};
