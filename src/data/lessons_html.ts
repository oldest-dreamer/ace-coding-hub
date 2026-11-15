import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_HTML_P2 } from './lessons_html_p2';
import { LESSONS_HTML_P3 } from './lessons_html_p3';
import { LESSONS_HTML_P4 } from './lessons_html_p4';
import { LESSONS_HTML_P5 } from './lessons_html_p5';

export const LESSONS_HTML: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'HTML Chapter 1 (HTML5): Browser Parser, DOM Tree & Document Anatomy',
    banglaTitle: 'HTML অধ্যায় ১ (HTML5): ব্রাউজার পার্সার, DOM ট্রি ও প্রথম পেজ',
    subtitle: 'How Chromium/Firefox turns HTML5 tags into a live DOM + CSSOM Render Tree on screen.',
    zeroIntuition: {
      plainEnglishStory:
        'Unlike compiled systems languages such as C or Rust, HTML5 is a declarative structural blueprint parsed top-to-bottom by the browser’s HTML5 Parser into a live in-memory DOM (Document Object Model) Tree! Every semantic element—`<header>`, `<main>`, `<article>`, `<h1>`—becomes a node paired with the CSSOM styles to produce the Render Tree painted onto your screen.\n\nAlways start with `<!doctype html>` on line 1 so Chromium, Firefox, and Safari activate Standards Mode instead of 1990s Quirks Mode, set `<meta charset="utf-8" />` inside `<head>` for crisp multilingual scripts, and choose meaningful landmarks over generic `<div>` soup.',
      asciiFlowchart: `  [ index.html ] --(Tokenize + Parse)--> [ DOM Tree (html -> body -> main -> h1) ]
                                               + [ CSSOM Styles ]
                                               v
                                         [ Browser Pixel Viewport ]`,
      pseudocode: [
        '1. DECLARE <!doctype html> so browser activates Modern Standards Mode',
        '2. SEPARATE <head> (title/meta/CSS) from visible <body> content',
        '3. WRAP main content inside semantic landmarks (<main>, <article>)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দালানের নকশা ও DOM গাছ (Tree)',
        explanation:
          'C বা Rust-এর মতো HTML কোনো মেশিন কোডে কম্পাইল হয় না; বরং ব্রাউজার একটি বাড়ির নকশা পড়ার মতো উপর থেকে নিচে HTML কোড পড়ে মেমোরিতে একটি জীবন্ত DOM গাছ (Document Object Model Tree) তৈরি করে এবং CSS-এর সাথে মিশিয়ে স্ক্রিনে ছবি আঁকে! পেজের একদম প্রথম লাইনে `<!doctype html>` না লিখলে ব্রাউজার পুরোনো Quirks Mode-এ চলে গিয়ে লেআউট ভেঙে ফেলে। এ ছাড়া `<head>` অংশে `<meta charset="utf-8" />` দিলে বাংলা লেখা ও ইমোজি নির্ভুলভাবে দেখা যায়। আর শুধু `<div>` ব্যবহার না করে অর্থবহ `<header>`, `<main>`, `<article>` ও সঠিক `<h1> -> <h2>` ক্রম ব্যবহার করলে SEO ও স্ক্রিন রিডার সহজে পেজ বুঝতে পারে!',
        everydayExample:
          '<head> হলো বাড়ির পেছনের কন্ট্রোল রুম (টাইটেল ও স্টাইল), আর <body> হলো ঘরের আসবাব যা দর্শকরা দেখতে পায়।',
        keyTakeaways: [
          '<!doctype html> সব সময় একদম প্রথম লাইনে থাকবে।',
          '<div> ব্যবহার না করে অর্থবহ (<main>, <header>, <section>) ট্যাগ ব্যবহার করলে SEO ও Accessibility ভালো হয়।',
          'মেটা ট্যাগ <meta charset="utf-8" /> দিলে বাংলা ও ইমোজি একদম নিখুঁত দেখায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Minimal HTML5 Document & Standards Mode Boilerplate',
        englishParagraphs: [
          'A valid HTML5 document starts with <!doctype html>, sets lang="en" on <html> for screen readers, sets UTF-8 encoding in <head>, and renders visible elements inside <body>.',
        ],
        banglaParagraphs: [
          'একটি আদর্শ HTML5 ফাইলে <!doctype html>, <html lang="en">, <head> ও <body>—এই চারটি মূল অংশ থাকে। UTF-8 দিলে বাংলা লেখাও ভেঙে যায় না।',
        ],
        memoryDiagram: `DOM Root -> <html> -> [<head>(meta,title), <body>(<main><h1>...</h1></main>)]`,
        code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>HTML5 Hello</title>
</head>
<body>
  <main>
    <h1>Hello, HTML5 World!</h1>
    <p>DOM Tree booted cleanly.</p>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Hello, HTML5 World!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: '<!doctype html>',
            whatItMeans: 'Enables modern HTML5 Standards Mode.',
            whyItIsThere: 'Prevents legacy 1990s Quirks Mode layout bugs.',
            ifDeletedError: 'CSS box sizing and flex layouts behave inconsistently.',
          },
          {
            lineNumber: 'Line 8',
            codeSnippet: '<main>',
            whatItMeans: 'Semantic landmark for primary page content.',
            whyItIsThere: 'Helps search engines and assistive readers jump straight to content.',
            ifDeletedError: 'Generic div lacks accessibility landmark.',
          },
        ],
      },
      {
        id: 'html-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Live Styled Profile Card With Semantic Landmarks',
        englishParagraphs: [
          'Embedded <style> inside <head> populates the CSSOM before first paint, turning semantic tags into styled cards with zero FOUC (flash of unstyled content).',
        ],
        banglaParagraphs: [
          '<head>-এর ভেতর <style> দিলে ব্রাউজার পেজ আঁকার আগেই রঙ, প্যাডিং ও বর্ডার জেনে সুন্দর কার্ড তৈরি করে।',
        ],
        memoryDiagram: `DOM (<main class="card">) + CSSOM (.card styles) -> Painted Card`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
    .card { max-width: 420px; border: 1px solid #334155; border-radius: 12px; padding: 18px; background: #1e293b; }
    h1 { margin: 0 0 8px; font-size: 20px; color: #38bdf8; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Welcome, Argon!</h1>
    <p>Score: <strong>84</strong> | Status: Active</p>
  </main>
</body>
</html>`,
        stdin: 'Argon 42',
        expectedOutput: 'Welcome, Argon!',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: '<style>',
            whatItMeans: 'Defines CSSOM rules matching HTML selectors.',
            whyItIsThere: 'Applies visual theme cleanly to semantic DOM elements.',
            ifDeletedError: 'Page renders unstyled browser default black-on-white.',
          },
        ],
      },
      {
        id: 'html-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Heading Hierarchy (h1 -> h2 -> p) & Accessible Landmarks',
        englishParagraphs: [
          'Keep exactly one <h1> per page for title clarity and nest <h2> subsections underneath cleanly without skipping heading levels.',
        ],
        banglaParagraphs: [
          'একটি পেজে সাধারণত একটি মূল <h1> ও তার নিচে <h2> সাব-হেডিং রাখলে Google SEO ও স্ক্রিন রিডার সহজে কাঠামো বুঝতে পারে।',
        ],
        memoryDiagram: `article -> [ h1 (Title), section -> h2 (Subhead) + p (Copy) ]`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;padding:20px;background:#0f172a;color:#e2e8f0">
  <article>
    <header>
      <h1 style="color:#00f5d4">ArgonCode Dispatch</h1>
    </header>
    <section>
      <h2>Semantic Hierarchy</h2>
      <p>Clean heading trees make navigation effortless.</p>
    </section>
  </article>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'ArgonCode Dispatch',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '<article>',
            whatItMeans: 'Self-contained editorial content unit.',
            whyItIsThere: 'Semantic HTML5 clarity for browsers and bots.',
            ifDeletedError: 'Loses standalone document context.',
          },
        ],
      },
      {
        id: 'html-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fixing Heading-Level Skipping & Missing Alt Accessibility Trap',
        englishParagraphs: [
          'Skipping from <h1> directly to <h4> for font size or leaving <img> without descriptive alt breaks accessibility audits. Style sizes in CSS—never pick headings by size!',
        ],
        banglaParagraphs: [
          'লেখা ছোট দেখানোর জন্য <h1>-এর পর সরাসরি <h4> ব্যবহার করা মারাত্মক ভুল! লেখার আকার CSS দিয়ে ঠিক করবে, আর হেডিংয়ের ক্রম (h1→h2→h3) ঠিক রাখবে।',
        ],
        memoryDiagram: `BAD: h1 -> h4 -> img(no alt) | GOOD: h1 -> h2 + css font-size`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;padding:20px;background:#0f172a;color:#f8fafc">
  <main>
    <h1>Dashboard</h1>
    <h2 style="font-size:14px;color:#94a3b8">Compact Sub-Section (Styled via CSS!)</h2>
    <p>Heading order stays valid h1 -> h2 for assistive tools.</p>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Dashboard',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '<h2 style="font-size:14px;color:#94a3b8">',
            whatItMeans: 'Uses sequential h2 styled visually with CSS.',
            whyItIsThere: 'Preserves logical document outline without sacrificing design.',
            ifDeletedError: 'Sub-heading structure breaks.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<!doctype html>',
        whatItMeans: 'Instructs browser to parse using HTML5 specification.',
        whyItIsThere: 'Prevents Quirks Mode.',
        ifDeletedError: 'Unpredictable box-model sizing.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<main>',
        whatItMeans: 'Primary semantic landmark.',
        whyItIsThere: 'Improves accessibility and SEO structure.',
        ifDeletedError: 'Screen readers lose main landmark jump.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'HTML5 Lexer reads tokens', memoryOrStack: '<!doctype html>', note: 'Enters Standards Mode' },
      { step: 2, state: 'Parses <head>', memoryOrStack: 'CSSOM built', note: 'Styles loaded pre-paint' },
      { step: 3, state: 'Constructs <body> nodes', memoryOrStack: 'DOM: main -> h1, p', note: 'Live tree in memory' },
      { step: 4, state: 'Layout & Paint', memoryOrStack: 'Viewport Pixels', note: 'Renders card crisply' },
    ],
    harryBugTraps: [
      {
        title: 'Using Div Soup Instead of Semantic Tags',
        brokenCode: '<div class="nav">...</div><div class="main">...</div>',
        fixedCode: '<nav>...</nav><main>...</main>',
        whyItBreaks: 'Screen readers and SEO crawlers cannot distinguish navigation from main content in div soup.',
      },
      {
        title: 'Omitting <!doctype html>',
        brokenCode: '<html><body>...</body></html>',
        fixedCode: '<!doctype html>\n<html lang="en"><body>...</body></html>',
        whyItBreaks: 'Triggers browser Quirks Mode where table/box dimensions break silently.',
      },
      {
        title: 'Picking Heading Tags (h1-h6) By Visual Font Size',
        brokenCode: '<h1>Title</h1><h4>Small Subtitle</h4>',
        fixedCode: '<h1>Title</h1><h2 style="font-size:14px">Small Subtitle</h2>',
        whyItBreaks: 'Skips heading hierarchy levels needed by keyboard & screen-reader users.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-1-q1',
        difficulty: 'Easy',
        title: 'HTML5 Semantic Greeting',
        prompt: 'Write a valid HTML5 document with an <h1> containing "ArgonCode HTML5 Ready".',
        banglaHint: '<!doctype html> ও <main><h1>...</h1></main> ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html lang="en">\n<body>\n  <main><h1>ArgonCode HTML5 Ready</h1></main>\n</body>\n</html>`,
        sampleStdin: '',
        expectedOutput: '<h1>ArgonCode HTML5 Ready</h1>',
      },
      {
        id: 'html-ch-1-q2',
        difficulty: 'Easy',
        title: 'Two-Landmark Article',
        prompt: 'Create an <article> containing an <h2> and a descriptive <p> tag.',
        banglaHint: '<article> ট্যাগের ভেতর <h2> ও <p> লেখো।',
        starterCode: `<!doctype html>\n<html>\n<body>\n  <article><h2>Lesson Note</h2><p>DOM parsed cleanly.</p></article>\n</body>\n</html>`,
        sampleStdin: '',
        expectedOutput: '<h2>Lesson Note</h2>',
      },
      {
        id: 'html-ch-1-q3',
        difficulty: 'Medium',
        title: 'Styled Card Component',
        prompt: 'Add a <style> tag giving .card a dark background and rounded border.',
        banglaHint: '<head>-এর ভেতর <style> দিয়ে .card ক্লাস স্টাইল করো।',
        starterCode: `<!doctype html>\n<html>\n<head><style>.card{background:#1e293b;color:#fff;padding:16px;border-radius:10px;}</style></head>\n<body><main class="card"><h1>Styled Card</h1></main></body>\n</html>`,
        sampleStdin: '',
        expectedOutput: '<h1>Styled Card</h1>',
      },
      {
        id: 'html-ch-1-q4',
        difficulty: 'Medium',
        title: 'Proper Heading Hierarchy',
        prompt: 'Fix skipped headings using sequential h1 followed by h2.',
        banglaHint: 'h1 এর পর সরাসরি h2 রাখো।',
        starterCode: `<!doctype html>\n<html>\n<body><main><h1>Root</h1><h2>Subnode</h2></main></body>\n</html>`,
        sampleStdin: '',
        expectedOutput: '<h1>Root</h1>',
      },
    ],
    miniBuild: {
      title: 'HTML Mini Build: Semantic Live DOM Card',
      description: 'Build an accessible HTML5 card with inline <style> CSSOM styling and semantic <main> + <h1>.',
      banglaGoal: 'সিমান্টিক HTML5 ও CSS <style> ব্যবহার করে লাইভ প্রিভিউ কার্ড তৈরি।',
      combinesChapters: 'Ch 1',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .card { max-width: 420px; border: 1px solid #334155; border-radius: 12px; padding: 20px; background: #1e293b; }
    h1 { margin: 0 0 8px; font-size: 20px; color: #38bdf8; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Architecture & Live DOM Stream</h1>
    <p>Welcome, Argon! Score: <strong>84</strong></p>
  </main>
</body>
</html>`,
      sampleStdin: 'Argon 42',
      expectedOutput: '<h1>Architecture & Live DOM Stream</h1>',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
    .card { max-width: 420px; border: 1px solid #334155; border-radius: 12px; padding: 20px; background: #1e293b; }
    h1 { margin: 0 0 8px; font-size: 20px; color: #38bdf8; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Architecture & Live DOM Stream</h1>
    <p>Welcome, Argon! Score: <strong>84</strong></p>
  </main>
</body>
</html>`,
    sampleStdin: 'Argon 42',
    expectedSampleOutput: '<h1>Architecture & Live DOM Stream</h1>',
    testCases: [
      { id: 'html-c1-t1', input: 'Argon 42', expectedOutput: '<h1>Architecture & Live DOM Stream</h1>' },
      { id: 'html-c1-t2', input: 'Dhaka 10', expectedOutput: 'Welcome, Argon!', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'HTML Chapter 2 (HTML5): Formatting Elements, Entities (&lt; &amp;) & Preformatted Text',
    banglaTitle: 'HTML অধ্যায় ২ (HTML5): টেক্সট ফরম্যাটিং, HTML এনটিটি ও <pre> কোড ব্লক',
    subtitle: 'Why browsers collapse spaces/newlines, HTML character entities to stop XSS, and <pre><code> blocks.',
    zeroIntuition: {
      plainEnglishStory:
        'By default, the HTML parser collapses consecutive spaces, tabs, and raw line breaks inside normal text blocks like `<p>` down into a single space! Whenever you need exact code indentation, terminal logs, or ASCII diagrams preserved verbatim, wrap them in `<pre><code>`.\n\nJust as importantly, angle brackets (`<` and `>`) and ampersands (`&`) are control tokens to the HTML tokenizer: writing raw `#include <stdio.h>` tricks the browser into swallowing `<stdio.h>` as an invisible tag—or even worse, opens XSS vulnerabilities with user input! Escape literal brackets cleanly as `&lt;`, `&gt;`, and `&amp;`.',
      asciiFlowchart: `  Raw "<script>" in HTML  ---> Browser parses as executable tag (XSS RISK!)
  Escaped "&lt;script&gt;" ---> Browser renders literal text "<script>" (SAFE!)`,
      pseudocode: [
        '1. ESCAPE literal <, >, & using &lt;, &gt;, &amp; entities',
        '2. USE <pre><code> to preserve whitespace, indentation, and tabs',
        '3. DISTINGUISH <strong> (important) from <b> and <em> from <i>',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফাঁকা স্পেস গিলে ফেলা ও নিরাপদ এনটিটি (&lt;)',
        explanation:
          'HTML-এ সাধারণ `<p>` ট্যাগের ভেতর ১০টা স্পেস বা ৩টা নতুন লাইন দিলেও ব্রাউজার সেগুলোকে সংকুচিত করে মাত্র ১টি স্পেস বানিয়ে ফেলে! কিন্তু `<pre><code>` ট্যাগের ভেতর লিখলে হুবহু স্পেস, ট্যাব ও ইন্ডেন্টেশন ঠিক থাকে। তার চেয়েও গুরুত্বপূর্ণ হলো HTML এনটিটি: ব্রাউজারে সরাসরি `#include <stdio.h>` বা `<vector>` লিখলে পার্সার সেটিকে অজানা HTML ট্যাগ মনে করে গিলে ফেলে—স্ক্রিনে আর দেখাই যায় না এবং ইউজার ইনপুটে XSS ঝুঁকি তৈরি হয়! তাই টেক্সটে `<` দেখাতে `&lt;`, `>` দেখাতে `&gt;` এবং `&` দেখাতে `&amp;` ব্যবহার করতে হয়, আর শর্টকাটের জন্য `<kbd>` ও ফলাফলের জন্য `<samp>` দারুণ কাজ করে।',
        everydayExample:
          'হ্যাকারের স্ক্রিপ্ট আটকাতে < > চিহ্নকে &lt; &gt; দিয়ে নিরাপদ খোলসে মুড়ে দেওয়া।',
        keyTakeaways: [
          '&lt; মানে <, &gt; মানে >, আর &amp; মানে &।',
          '<pre><code> ব্যবহার করে টার্মিনাল আউটপুট বা কোড হুবহু দেখানো যায়।',
          '<kbd> দিয়ে কীবোর্ড শর্টকাট (যেমন Ctrl+Enter) সুন্দরভাবে মার্ক করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Escaped HTML Entities & Preformatted <pre><code> Block',
        englishParagraphs: [
          'Using &lt; and &gt; renders angle brackets safely on screen while <pre> preserves exact indentation and line breaks.',
        ],
        banglaParagraphs: [
          '&lt; ও &gt; ব্যবহার করে C++ কোডের #include <stdio.h> ব্রাউজারে অক্ষত অবস্থায় দেখানো যায়।',
        ],
        memoryDiagram: `&lt;stdio.h&gt; -> HTML Parser Text Node: "<stdio.h>" (no tag parsed!)`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#e2e8f0;padding:20px">
  <h2>Escaped Code Block</h2>
  <pre style="background:#1e293b;padding:14px;border-radius:8px"><code>#include &lt;stdio.h&gt;
int main(void) {
    printf("Hello &amp; Welcome\\n");
}</code></pre>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Escaped Code Block',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: '<pre ...><code>#include &lt;stdio.h&gt;',
            whatItMeans: 'Preserves whitespace and safely renders literal angle brackets.',
            whyItIsThere: 'Without &lt;, <stdio.h> vanishes as an unrecognized tag!',
            ifDeletedError: '<stdio.h> disappears from rendered output!',
          },
        ],
      },
      {
        id: 'html-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Keyboard Hints (<kbd>), Output (<samp>) & Abbreviations',
        englishParagraphs: [
          'Technical docs pair <kbd> for user shortcuts with <samp> for program output and <abbr title="..."> for expandable tooltips.',
        ],
        banglaParagraphs: [
          '<kbd> ট্যাগ কীবোর্ড কী বোঝায়, আর <abbr title="..."> মাউস রাখলে পুরো অর্থ দেখায়।',
        ],
        memoryDiagram: `<kbd>Ctrl</kbd> + <kbd>K</kbd> -> styled keycap UI`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    kbd { background: #334155; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
  </style>
</head>
<body>
  <p>Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to run <abbr title="Standard Input">stdin</abbr>.</p>
  <p>Output: <samp>Sum=39 | Avg=19.5</samp></p>
</body>
</html>`,
        stdin: '15 24',
        expectedOutput: 'Sum=39 | Avg=19.5',
        lineByLine: [
          {
            lineNumber: 'Line 10',
            codeSnippet: '<kbd>Ctrl</kbd>',
            whatItMeans: 'Marks inline keyboard input token semantically.',
            whyItIsThere: 'Allows consistent keycap styling via CSS.',
            ifDeletedError: 'Key names blend into plain prose.',
          },
        ],
      },
      {
        id: 'html-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Semantic Documentation Table With Formatted Units',
        englishParagraphs: [
          'Using <table>, <thead>, <tbody>, <th>, and <td> structures numeric comparison tables accessibly for screen readers.',
        ],
        banglaParagraphs: [
          '<thead> ও <tbody> সহ <table> ট্যাগ ব্যবহার করলে ডেটা টেবিল সব ডিভাইসে সুন্দর ও অ্যাক্সেসিবল হয়।',
        ],
        memoryDiagram: `table -> [ thead(tr>th), tbody(tr>td) ]`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <table border="1" cellpadding="8" style="border-collapse:collapse;border-color:#334155">
    <thead><tr><th>Lang</th><th>Year</th></tr></thead>
    <tbody>
      <tr><td>HTML5</td><td>2014</td></tr>
      <tr><td>CSS3</td><td>2011</td></tr>
    </tbody>
  </table>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'HTML5',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: '<thead><tr><th>Lang</th><th>Year</th></tr></thead>',
            whatItMeans: 'Semantic header row for table columns.',
            whyItIsThere: 'Associates column labels with data cells.',
            ifDeletedError: 'Screen readers cannot map cell headers.',
          },
        ],
      },
      {
        id: 'html-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fixing Missing Entity Escape (Vanishing Tag Trap)',
        englishParagraphs: [
          'Writing `Use <vector> in C++` directly inside HTML makes the browser think `<vector>` is an unknown HTML tag and hides it completely! Always write `&lt;vector&gt;`.',
        ],
        banglaParagraphs: [
          'HTML কোডের ভেতর সরাসরি `<vector>` লিখলে ব্রাউজার সেটিকে লুকানো ট্যাগ ভেবে স্ক্রিনে কিছুই দেখাবে না! তাই সর্বদা `&lt;vector&gt;` লিখতে হয়।',
        ],
        memoryDiagram: `<vector> -> HIDDEN! | &lt;vector&gt; -> Visible "<vector>"`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <h2>Entity Safety Demo</h2>
  <p>Broken raw tag: C++ <vector> vanishes!</p>
  <p>Safe escaped tag: C++ <code>&lt;vector&gt;</code> displays cleanly!</p>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Entity Safety Demo',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '<code>&lt;vector&gt;</code>',
            whatItMeans: 'Escapes angle brackets inside inline code block.',
            whyItIsThere: 'Prevents parser from swallowing <vector> as an HTML element.',
            ifDeletedError: 'Word "<vector>" silently disappears.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '&lt;stdio.h&gt;',
        whatItMeans: 'Character entities for < and >.',
        whyItIsThere: 'Prevents HTML parser from interpreting text as tags.',
        ifDeletedError: 'Text inside <...> vanishes or injects XSS.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<pre><code>...</code></pre>',
        whatItMeans: 'Whitespace-preserving monospace container.',
        whyItIsThere: 'HTML collapses multiple spaces and newlines otherwise.',
        ifDeletedError: 'Code flattens onto a single unreadable line.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parser sees &lt;', memoryOrStack: 'Emits text char "<"', note: 'Does NOT open tag' },
      { step: 2, state: 'Parser sees <pre>', memoryOrStack: 'white-space: pre', note: 'Preserves \\n and spaces' },
      { step: 3, state: 'Parser sees <kbd>', memoryOrStack: 'Inline keycap node', note: 'Semantic shortcut tag' },
      { step: 4, state: 'Render output', memoryOrStack: 'Clean formatted page', note: 'Zero vanished symbols' },
    ],
    harryBugTraps: [
      {
        title: 'Typing Unescaped < or > in Technical Text',
        brokenCode: '<p>If a < b and c > d</p>',
        fixedCode: '<p>If a &lt; b and c &gt; d</p>',
        whyItBreaks: 'HTML treats everything between < b ... > as one giant broken tag and hides it!',
      },
      {
        title: 'Using Deprecated <font> or <center> Tags',
        brokenCode: '<center><font color="red">Alert</font></center>',
        fixedCode: '<p style="text-align:center;color:#f87171">Alert</p>',
        whyItBreaks: '<font> and <center> were removed from HTML5; use CSS for all visual styling.',
      },
      {
        title: 'Using Multiple <br> Tags for Spacing',
        brokenCode: '<p>Line 1</p><br><br><br><p>Line 2</p>',
        fixedCode: '<p style="margin-bottom:24px">Line 1</p><p>Line 2</p>',
        whyItBreaks: 'Vertical gaps belong in CSS margin/gap properties, not repeated <br> breaks.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-2-q1',
        difficulty: 'Easy',
        title: 'Escaped Code Line',
        prompt: 'Render literal `#include <iostream>` safely inside <pre><code>.',
        banglaHint: '&lt; ও &gt; ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body><pre><code>#include &lt;iostream&gt;</code></pre></body></html>`,
        sampleStdin: '',
        expectedOutput: '<pre><code>#include &lt;iostream&gt;</code></pre>',
      },
      {
        id: 'html-ch-2-q2',
        difficulty: 'Easy',
        title: 'Shortcut Documentation',
        prompt: 'Use <kbd> tags to format a shortcut notice.',
        banglaHint: '<kbd>Ctrl</kbd> ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body><p>Run: <kbd>Ctrl</kbd>+<kbd>Enter</kbd></p></body></html>`,
        sampleStdin: '',
        expectedOutput: '<kbd>Ctrl</kbd>',
      },
      {
        id: 'html-ch-2-q3',
        difficulty: 'Medium',
        title: 'Structured Data Table',
        prompt: 'Build a semantic table with <thead> and <tbody> displaying two rows.',
        banglaHint: '<thead> ও <tbody> ট্যাগ রাখো।',
        starterCode: `<!doctype html>\n<html><body><table><thead><tr><th>Item</th><th>Qty</th></tr></thead><tbody><tr><td>Pen</td><td>2</td></tr></tbody></table></body></html>`,
        sampleStdin: '',
        expectedOutput: '<thead>',
      },
      {
        id: 'html-ch-2-q4',
        difficulty: 'Medium',
        title: 'Inequality Entity Guard',
        prompt: 'Safely print the inequality `x < 10 && y > 0` inside <p>.',
        banglaHint: '&lt; &amp; &gt; দিয়ে চিহ্নগুলো নিরাপদ করো।',
        starterCode: `<!doctype html>\n<html><body><p>x &lt; 10 &amp;&amp; y &gt; 0</p></body></html>`,
        sampleStdin: '',
        expectedOutput: '&lt;',
      },
    ],
    miniBuild: {
      title: 'HTML Mini Build: Escaped Code Snippet Showcase',
      description: 'Render preformatted code with safe HTML entities and semantic <kbd> instructions.',
      banglaGoal: 'এনটিটি ও <pre><code> ব্যবহার করে নিরাপদ কোড ডকুমেন্টেশন পেজ তৈরি।',
      combinesChapters: 'Ch 1–2',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
    pre { background: #1e293b; border: 1px solid #334155; padding: 14px; border-radius: 10px; }
  </style>
</head>
<body>
  <main>
    <h1>Safe Snippet Display</h1>
    <pre><code>std::vector&lt;int&gt; nums = {10, 20};</code></pre>
  </main>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: '<h1>Safe Snippet Display</h1>',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; }
    pre { background: #1e293b; border: 1px solid #334155; padding: 14px; border-radius: 10px; }
  </style>
</head>
<body>
  <main>
    <h1>Safe Snippet Display</h1>
    <pre><code>std::vector&lt;int&gt; nums = {10, 20};</code></pre>
  </main>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: '<h1>Safe Snippet Display</h1>',
    testCases: [
      { id: 'html-c2-t1', input: '', expectedOutput: '<h1>Safe Snippet Display</h1>' },
      { id: 'html-c2-t2', input: '', expectedOutput: '&lt;int&gt;', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'HTML Chapter 3 (HTML5): Input Types, Data Attributes & CSS Box-Sizing Overflow',
    banglaTitle: 'HTML অধ্যায় ৩ (HTML5): ইনপুট টাইপ, data-* অ্যাট্রিবিউট ও CSS বক্স ওভারফ্লো',
    subtitle: 'Typed HTML5 <input> controls, custom data-* DOM storage, and preventing layout overflow with box-sizing: border-box.',
    zeroIntuition: {
      plainEnglishStory:
        'Just as integers have byte widths in RAM, every DOM box has layout geometry governed by the CSS Box Model! Under the legacy default (`content-box`), giving a box `width: 100%` plus `padding: 20px` causes it to overflow its parent container horizontally by 40px. Setting `*, *::before, *::after { box-sizing: border-box; }` forces padding and border to stay inside the declared width.\n\nMeanwhile, HTML5 enforces strict types and boundaries natively via `<input type="number" min="0" max="100">`, `<meter>`, and structured `data-*` attributes so DOM nodes carry clean typed metadata.',
      asciiFlowchart: `  content-box (default): 300px content + 40px padding = 344px (OVERFLOWS 300px box!)
  border-box (safe!):    width 300px INCLUDES padding + border = Exact 300px!`,
      pseudocode: [
        '1. APPLY *, *::before, *::after { box-sizing: border-box; } globally',
        '2. PICK semantic <input> types (number, email, range, date) with min/max',
        '3. ATTACH structured metadata safely using data-* attributes',
      ],
      banglaZeroToHero: {
        analogyTitle: 'CSS-এর বক্স ওভারফ্লো এবং data-* গোপন পকেট',
        explanation:
          'C++-এ যেমন `int` ছোট হয়ে উপচে পড়ে (Integer Overflow), CSS-এও `width: 100%` এর সাথে `padding` ও `border` যোগ করলে বক্স তার অভিভাবক প্যানেল ছাড়িয়ে ডানে বেরিয়ে যায় (Layout Overflow)! এর স্থায়ী সমাধান হলো স্টাইলশিটের শুরুতেই `* { box-sizing: border-box; }` ও `max-width: 100%` রাখা—এতে প্যাডিং ও বর্ডার নির্ধারিত প্রস্থের ভেতরেই থাকে। পাশাপাশি ইনপুটে `<input type="number" min="0" max="100">` এবং প্রতিটি ইনপুটের সাথে `<label for="...">` যুক্ত করলে অ্যাক্সেসিবিলিটি ও রেঞ্জ ভ্যালিডেশন নিখুঁত হয়, আর `data-*` অ্যাট্রিবিউট দিয়ে এলিমেন্টের নিজস্ব গোপন পকেটে নিরাপদে ডেটা রাখা যায়!',
        everydayExample:
          'সুটকেসের বাইরের মাপ ঠিক রেখে ভেতরে ফোম বসানোই border-box; আর বাইরের মাপ ফুলে যাওয়াই content-box।',
        keyTakeaways: [
          'সব প্রজেক্টে শুরুতেই `box-sizing: border-box` দিলে লেআউট কখনো ওভারফ্লো হয় না।',
          '<input type="number" min="0" max="100"> ব্যবহার করলে মোবাইল কীবোর্ডে সরাসরি নম্বর প্যাড আসে।',
          'data-id বা data-score দিয়ে HTML এলিমেন্টে টাইপড মেটাডেটা রাখা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'box-sizing: border-box Preventing Container Overflow',
        englishParagraphs: [
          'Compare how border-box keeps a padded 100%-width box cleanly inside its parent frame without triggering horizontal overflow.',
        ],
        banglaParagraphs: [
          'box-sizing: border-box দিলে প্যাডিং দেওয়ার পরও বক্সটি তার মূল ফ্রেমের ভেতর নিখুঁতভাবে ফিট হয়।',
        ],
        memoryDiagram: `Box Model: [ Margin [ Border [ Padding [ Content ] ] ] ] -> total = exact 320px`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    .box { width: 320px; padding: 20px; border: 4px solid #38bdf8; background: #1e293b; color: #f8fafc; border-radius: 10px; }
  </style>
</head>
<body style="background:#0f172a;font-family:system-ui;padding:20px">
  <div class="box"><strong>Exact 320px Border-Box!</strong> Padding &amp; border stay inside.</div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Exact 320px Border-Box!',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: '* { box-sizing: border-box; }',
            whatItMeans: 'Forces width/height to include padding and border.',
            whyItIsThere: 'Prevents 100% + padding horizontal scrollbars.',
            ifDeletedError: 'Box grows to 368px and can overflow parent.',
          },
        ],
      },
      {
        id: 'html-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed HTML5 Inputs & <label for="..."> Binding',
        englishParagraphs: [
          'Connecting <label for="score"> to <input id="score" type="number" min="0" max="100"> focuses the input when clicking the label and restricts numeric bounds natively.',
        ],
        banglaParagraphs: [
          '<label for="..."> আর <input id="..."> মিলিয়ে দিলে টেক্সটে ক্লিক করলেই ইনপুট বক্স অ্যাক্টিভ হয় এবং min/max দিয়ে সীমা ঠিক রাখা যায়।',
        ],
        memoryDiagram: `<label for="score"> ---> binds ---> <input id="score" type="number" min="0" max="100">`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <form>
    <label for="score">Contest Score (0–100):</label>
    <input id="score" type="number" min="0" max="100" value="84" />
  </form>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Contest Score (0–100):',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '<input id="score" type="number" min="0" max="100" value="84" />',
            whatItMeans: 'Bounded numeric input element with default value.',
            whyItIsThere: 'Browser validates range 0..100 before JS runs.',
            ifDeletedError: 'Plain text input allows letters and unbounded numbers.',
          },
        ],
      },
      {
        id: 'html-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Custom data-* Attributes & <meter> Progress Indicator',
        englishParagraphs: [
          'HTML5 `<meter>` displays scalar measurements semantically, while `data-*` attributes attach structured attributes cleanly read by CSS/JS.',
        ],
        banglaParagraphs: [
          '<meter> ট্যাগ দিয়ে ব্যাটারি বা XP বার দেখানো যায় এবং data-* অ্যাট্রিবিউট দিয়ে অতিরিক্ত মেটাডেটা সংরক্ষণ করা হয়।',
        ],
        memoryDiagram: `<meter value="80" min="0" max="100" data-tier="pro">`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <section data-lang="html5" data-level="3">
    <h2>XP Capacity Meter</h2>
    <meter value="80" min="0" max="100">80%</meter>
  </section>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'XP Capacity Meter',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '<section data-lang="html5" data-level="3">',
            whatItMeans: 'Attaches custom DOM metadata attributes safely.',
            whyItIsThere: 'Avoids abusing class names or id strings to store data.',
            ifDeletedError: 'Cannot inspect metadata cleanly via el.dataset.',
          },
        ],
      },
      {
        id: 'html-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Preventing Placeholder-Only Inputs & Mobile Overflow',
        englishParagraphs: [
          'Using `placeholder` WITHOUT a `<label>` disappears as soon as the user starts typing and fails accessibility checks. Always pair visible or `sr-only` `<label>` tags with bounded `max-width: 100%`.',
        ],
        banglaParagraphs: [
          'লেবেল না দিয়ে শুধু `placeholder` দিলে টাইপ শুরু করা মাত্রই ইউজার ভুলে যায় বক্সে কী লিখতে হবে! আর `max-width: 100%` দিলে মোবাইল স্ক্রিনে কার্ড ভেঙে যায় না।',
        ],
        memoryDiagram: `max-width: 100%; box-sizing: border-box -> Zero mobile horizontal scroll!`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    .panel { width: 420px; max-width: 100%; padding: 16px; background: #1e293b; color: #fff; border-radius: 10px; }
  </style>
</head>
<body style="background:#0f172a;font-family:system-ui;padding:16px">
  <div class="panel">
    <label for="handle">Codeforces Handle</label><br/>
    <input id="handle" type="text" placeholder="tourist" style="width:100%;margin-top:6px;padding:8px" />
  </div>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Codeforces Handle',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '.panel { width: 420px; max-width: 100%; ... }',
            whatItMeans: 'Caps card width on small mobile screens cleanly.',
            whyItIsThere: 'Prevents 420px card overflowing 390px phone viewport.',
            ifDeletedError: 'Horizontal scrollbar appears on mobile.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '* { box-sizing: border-box; }',
        whatItMeans: 'Includes padding and border inside declared width.',
        whyItIsThere: 'Stops subtle box-model layout overflow.',
        ifDeletedError: '100% width + padding overflows viewport.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<input type="number" min="0" max="100">',
        whatItMeans: 'Numeric input with built-in browser range bounds.',
        whyItIsThere: 'Provides native keyboard & constraint checks.',
        ifDeletedError: 'Unbounded text accepted.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Apply border-box rule', memoryOrStack: 'box-sizing=border-box', note: 'Padding contained inside width' },
      { step: 2, state: 'Parse <input min=0 max=100>', memoryOrStack: 'value = 84', note: 'Within valid bounds' },
      { step: 3, state: 'Attach data-level="3"', memoryOrStack: 'DOMStringMap dataset', note: 'Typed metadata stored' },
      { step: 4, state: 'Layout & Paint', memoryOrStack: 'Exact 320px box', note: 'Zero horizontal overflow' },
    ],
    harryBugTraps: [
      {
        title: 'Using Width 100% + Padding Without border-box',
        brokenCode: 'input { width: 100%; padding: 12px; } /* overflows parent by 24px! */',
        fixedCode: '* { box-sizing: border-box; } input { width: 100%; padding: 12px; }',
        whyItBreaks: 'Default content-box adds padding outside the 100% width.',
      },
      {
        title: 'Mismatched <label for> and <input id>',
        brokenCode: '<label for="name">Name</label><input id="userName">',
        fixedCode: '<label for="userName">Name</label><input id="userName">',
        whyItBreaks: 'for must match the target element’s exact id attribute.',
      },
      {
        title: 'Placeholder Used as a Replacement for Label',
        brokenCode: '<input type="email" placeholder="Email">',
        fixedCode: '<label for="em">Email</label><input id="em" type="email" placeholder="you@site.com">',
        whyItBreaks: 'Placeholders disappear while typing and hurt screen-reader accessibility.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-3-q1',
        difficulty: 'Easy',
        title: 'Border-Box Layout Guard',
        prompt: 'Write CSS applying box-sizing: border-box to * and render a .card container.',
        banglaHint: '* { box-sizing: border-box; } লিখো।',
        starterCode: `<!doctype html>\n<html><head><style>*{box-sizing:border-box;}.card{width:300px;padding:16px;}</style></head><body><div class="card">Safe Box</div></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Safe Box',
      },
      {
        id: 'html-ch-3-q2',
        difficulty: 'Easy',
        title: 'Bounded Number Input',
        prompt: 'Create a labeled <input type="number" min="1" max="10">.',
        banglaHint: 'min="1" max="10" ও label যোগ করো।',
        starterCode: `<!doctype html>\n<html><body><label for="lvl">Level</label><input id="lvl" type="number" min="1" max="10" value="5" /></body></html>`,
        sampleStdin: '',
        expectedOutput: '<input id="lvl" type="number"',
      },
      {
        id: 'html-ch-3-q3',
        difficulty: 'Medium',
        title: 'Custom data-* Metadata Card',
        prompt: 'Attach data-lang="html" and render an XP <meter>.',
        banglaHint: 'data-lang ও <meter> ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body><div data-lang="html"><meter value="75" min="0" max="100">75%</meter></div></body></html>`,
        sampleStdin: '',
        expectedOutput: '<meter',
      },
      {
        id: 'html-ch-3-q4',
        difficulty: 'Medium',
        title: 'Responsive Max-Width Fix',
        prompt: 'Constrain a 500px card with max-width: 100% so mobile screens never scroll.',
        banglaHint: 'max-width: 100% যোগ করো।',
        starterCode: `<!doctype html>\n<html><head><style>.panel{width:500px;max-width:100%;box-sizing:border-box;}</style></head><body><main class="panel">Responsive Card</main></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Responsive Card',
      },
    ],
    miniBuild: {
      title: 'HTML Mini Build: Bounded Profile Input & Meter Panel',
      description: 'Combine border-box CSS, typed inputs with min/max bounds, and <meter> telemetry.',
      banglaGoal: 'border-box ও টাইপড HTML5 ইনপুট ব্যবহার করে রেসপনসিভ প্রোফাইল প্যানেল তৈরি।',
      combinesChapters: 'Ch 1–3',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    .panel { width: 380px; max-width: 100%; background: #1e293b; padding: 16px; border-radius: 10px; }
  </style>
</head>
<body>
  <main class="panel" data-phase="1">
    <h1>Player Bounded Profile</h1>
    <label for="xp">XP (0–100):</label>
    <input id="xp" type="number" min="0" max="100" value="85" />
    <div style="margin-top:10px"><meter value="85" min="0" max="100">85%</meter></div>
  </main>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: '<h1>Player Bounded Profile</h1>',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    .panel { width: 380px; max-width: 100%; background: #1e293b; padding: 16px; border-radius: 10px; }
  </style>
</head>
<body>
  <main class="panel" data-phase="1">
    <h1>Player Bounded Profile</h1>
    <label for="xp">XP (0–100):</label>
    <input id="xp" type="number" min="0" max="100" value="85" />
    <div style="margin-top:10px"><meter value="85" min="0" max="100">85%</meter></div>
  </main>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: '<h1>Player Bounded Profile</h1>',
    testCases: [
      { id: 'html-c3-t1', input: '', expectedOutput: '<h1>Player Bounded Profile</h1>' },
      { id: 'html-c3-t2', input: '', expectedOutput: 'box-sizing: border-box', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'HTML Chapter 4 (HTML5): Form Validation Attributes, CSS Combinators & ARIA Precedence',
    banglaTitle: 'HTML অধ্যায় ৪ (HTML5): ফর্ম ভ্যালিডেশন, CSS কম্বিনেটর ও ARIA',
    subtitle: 'Declarative constraint validation (required, pattern, minlength), CSS pseudo-classes (:valid, :invalid), and button vs anchor semantics.',
    zeroIntuition: {
      plainEnglishStory:
        'HTML5 ships zero-JavaScript validation operators right inside markup attributes! By adding `required`, `minlength="3"`, or `pattern="[A-Z0-9]{4,8}"` to form controls and pairing them with CSS `:valid` and `:invalid` pseudo-classes, the browser blocks malformed submissions and updates visual feedback automatically.\n\nEqually crucial is control semantics: always use `<a href="...">` strictly for navigation URLs and `<button>` strictly for interactive actions. Inside a `<form>`, a bare `<button>` defaults to `type="submit"`, so always write `type="button"` on non-submitting controls.',
      asciiFlowchart: `  <input required minlength="3">
     |-- empty or < 3 chars ---> matches CSS :invalid (blocks submit!)
     |-- >= 3 valid chars   ---> matches CSS :valid   (allows submit!)`,
      pseudocode: [
        '1. DECLARE form rules natively with required, minlength, pattern',
        '2. STYLE valid/invalid states declaratively via :valid / :invalid',
        '3. ALWAYS use <button type="submit|button"> for actions, <a href> for URLs',
      ],
      banglaZeroToHero: {
        analogyTitle: 'জাভাস্ক্রিপ্ট ছাড়াই ফর্মের দারোয়ান',
        explanation:
          'একটি ফর্মে নাম খালি রাখা যাবে না বা পাসওয়ার্ড কমপক্ষে ৩ অক্ষরের হতে হবে—এর জন্য JavaScript লেখার আগেই HTML5 নিজেই `required`, `minlength`, এবং `pattern` দারোয়ান দেয়! শুধু তাই নয়, CSS-এ `:valid` ও `:invalid` লিখে ইনপুট ঠিক হলে সবুজ বর্ডার ও ভুল হলে সতর্ক রঙ দেখানো যায় বিনা কোডেই। আরেকটি খুব জরুরি নিয়ম হলো: অন্য লিংকে যেতে `<a href="...">` এবং ক্লিক অ্যাকশনের জন্য `<button>` ব্যবহার করবে (কখনোই `<div onclick>` নয়, কারণ কীবোর্ডের Tab/Enter সেখানে কাজ করে না!)। আর `<form>`-এর ভেতর সাধারণ বাটনে অবশ্যই `type="button"` লিখবে, নইলে পেজ রিলোড হয়ে যাবে!',
        everydayExample:
          'দরজায় "টিকিট ছাড়া প্রবেশ নিষেধ (required)" বোর্ড ঝুলিয়ে দিলে ব্রাউজারই চেক করে আটকে দেয়।',
        keyTakeaways: [
          'পেজের ভেতরে ক্লিক অ্যাকশনের জন্য সব সময় <button> (কখনোই <div onclick> নয়!) ব্যবহার করবে।',
          'নতুন পেজ বা লিংকে যেতে <a href="..."> ব্যবহৃত হয়।',
          'একটি ফর্মের ভেতর সাধারণ ক্লিক বাটনে type="button" না দিলে ডিফল্টভাবে ফর্ম সাবমিট হয়ে পেজ রিলোড হয়ে যায়!',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Zero-JS Constraint Validation With :valid / :invalid',
        englishParagraphs: [
          'Combining `required` and `minlength="3"` with CSS `:valid` and `:invalid` gives instant visual feedback with zero JavaScript.',
        ],
        banglaParagraphs: [
          'required এবং minlength="3" দিলে ব্রাউজার নিজেই যাচাই করে এবং CSS :valid / :invalid দিয়ে রঙ বদলায়।',
        ],
        memoryDiagram: `<input required minlength="3"> -> CSS :valid (green) | :invalid (amber)`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    input { padding: 8px; border-radius: 6px; border: 2px solid #475569; outline: none; }
    input:valid { border-color: #10b981; }
    input:invalid { border-color: #f59e0b; }
  </style>
</head>
<body>
  <form>
    <label for="user">Handle (3+ chars):</label>
    <input id="user" type="text" required minlength="3" value="argon" />
    <button type="submit">Validate</button>
  </form>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Handle (3+ chars):',
        lineByLine: [
          {
            lineNumber: 'Line 14',
            codeSnippet: '<input id="user" type="text" required minlength="3" value="argon" />',
            whatItMeans: 'Enforces minimum length and non-empty rule natively.',
            whyItIsThere: 'Stops empty/short form submissions automatically.',
            ifDeletedError: 'Empty input submits silently.',
          },
        ],
      },
      {
        id: 'html-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Regex Pattern Input & Explicit Submit vs Action Buttons',
        englishParagraphs: [
          'Remember: inside a <form>, `<button>` defaults to `type="submit"`. Always set `type="button"` on non-submit actions like Reset/Preview so they never trigger an accidental page reload!',
        ],
        banglaParagraphs: [
          '<form>-এর ভেতর সাধারণ বাটনে type="button" না লিখলে সেটিকে ব্রাউজার submit বাটন ধরে নিয়ে পেজ রিলোড করে দেয়!',
        ],
        memoryDiagram: `<form> -> <button type="button"> (no submit) | <button type="submit"> (validates)`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <form>
    <label for="code">Contest ID (A-Z + digits):</label>
    <input id="code" pattern="[A-Z0-9]{4,8}" value="CF1900" required />
    <button type="button">Check Syntax</button>
    <button type="submit">Join Contest</button>
  </form>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Contest ID (A-Z + digits):',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '<button type="button">Check Syntax</button>',
            whatItMeans: 'Explicit non-submitting button inside form.',
            whyItIsThere: 'Prevents unintended form submit & reload.',
            ifDeletedError: 'Clicking Check Syntax reloads the page.',
          },
        ],
      },
      {
        id: 'html-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Semantic <nav> Links vs Action <button> With ARIA',
        englishParagraphs: [
          'Use `<a href="...">` strictly for navigation destinations and `<button>` strictly for interactive state changes, adding `aria-pressed` or `aria-expanded` where appropriate.',
        ],
        banglaParagraphs: [
          'অন্য পেজে যাওয়ার জন্য <a>, আর কোনো অবস্থা বদলানোর জন্য <button> ব্যবহার করা ওয়েব স্ট্যান্ডার্ডের সোনার নিয়ম।',
        ],
        memoryDiagram: `<nav> -> <a href="#top"> (navigation) | <button aria-pressed="true"> (toggle)`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <nav aria-label="Academy sections">
    <a href="#lobby" style="color:#38bdf8;margin-right:12px">Lobby</a>
    <a href="#arena" style="color:#38bdf8;margin-right:12px">Arena</a>
    <button type="button" aria-pressed="true">Bangla Mode: ON</button>
  </nav>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Bangla Mode: ON',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: '<button type="button" aria-pressed="true">Bangla Mode: ON</button>',
            whatItMeans: 'Accessible native toggle button announcing pressed state.',
            whyItIsThere: 'Keyboard-navigable (Space/Enter) automatically.',
            ifDeletedError: 'Fake <div> toggles lack keyboard focus and ARIA semantics.',
          },
        ],
      },
      {
        id: 'html-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Fixing Clickable <div onclick> Accessibility Anti-Pattern',
        englishParagraphs: [
          'Never use a clickable `<div>` for interactive buttons! `<div>` is invisible to Tab navigation, Space/Enter activation, and screen reader role snapshots.',
        ],
        banglaParagraphs: [
          'কখনোই বাটনের কাজের জন্য `<div onclick>` ব্যবহার করবে না! এতে কীবোর্ডের Tab বাটন কাজ করে না। সর্বদা `<button type="button">` ব্যবহার করো।',
        ],
        memoryDiagram: `BAD: <div onclick="..."> | GOOD: <button type="button">`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <main>
    <h2>Accessible Action Control</h2>
    <button type="button" style="background:#00f5d4;color:#0f172a;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer">
      Run Judge Suite
    </button>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Accessible Action Control',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: '<button type="button" ...>',
            whatItMeans: 'Native focusable button element with built-in keyboard triggers.',
            whyItIsThere: 'Essential for accessibility and clean UI interaction.',
            ifDeletedError: 'Clickable div is skipped by keyboard users.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'required minlength="3"',
        whatItMeans: 'Native browser constraint validation rules.',
        whyItIsThere: 'Blocks invalid submissions without JS boilerplate.',
        ifDeletedError: 'Blank/short inputs pass unvalidated.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<button type="button">',
        whatItMeans: 'Explicit non-submitting interactive button.',
        whyItIsThere: 'Prevents accidental form submits and preserves keyboard accessibility.',
        ifDeletedError: 'Clickable divs break Tab/Enter support.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'User types "ar"', memoryOrStack: 'minlength=3 violated', note: 'Matches :invalid' },
      { step: 2, state: 'User types "argon"', memoryOrStack: 'minlength=3 satisfied', note: 'Matches :valid' },
      { step: 3, state: 'User presses Tab', memoryOrStack: 'Focus lands on <button>', note: 'Native keyboard focus' },
      { step: 4, state: 'User presses Enter', memoryOrStack: 'Triggers action/submit', note: 'Zero JS hacks needed' },
    ],
    harryBugTraps: [
      {
        title: 'Using <div onclick> Instead of <button>',
        brokenCode: '<div class="btn" onclick="submit()">Submit</div>',
        fixedCode: '<button type="button" class="btn">Submit</button>',
        whyItBreaks: '<div> has no focusability, no Space/Enter handling, and no semantic button role.',
      },
      {
        title: 'Missing type="button" Inside Forms',
        brokenCode: '<form><button onclick="preview()">Preview</button></form>',
        fixedCode: '<form><button type="button" onclick="preview()">Preview</button></form>',
        whyItBreaks: 'Default <button> type inside <form> is "submit", causing unexpected page reloads.',
      },
      {
        title: 'Anchor <a> Without Valid href',
        brokenCode: '<a onclick="openModal()">Open Modal</a>',
        fixedCode: '<button type="button">Open Modal</button>',
        whyItBreaks: 'Links without href lose keyboard focus and belong as <button> actions.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-4-q1',
        difficulty: 'Easy',
        title: 'Required Field Constraint',
        prompt: 'Create a form with a required text input of minlength="4" and a submit button.',
        banglaHint: 'required minlength="4" যোগ করো।',
        starterCode: `<!doctype html>\n<html><body><form><label for="u">User</label><input id="u" required minlength="4" /><button type="submit">Save</button></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'minlength="4"',
      },
      {
        id: 'html-ch-4-q2',
        difficulty: 'Easy',
        title: 'Form-Safe Action Button',
        prompt: 'Add a non-submitting <button type="button">Reset</button> inside a form.',
        banglaHint: 'type="button" লিখো।',
        starterCode: `<!doctype html>\n<html><body><form><button type="button">Reset</button></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'type="button"',
      },
      {
        id: 'html-ch-4-q3',
        difficulty: 'Medium',
        title: 'Regex Pattern Attribute',
        prompt: 'Require 4 uppercase letters via pattern="[A-Z]{4}".',
        banglaHint: 'pattern="[A-Z]{4}" ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body><form><label for="c">Code</label><input id="c" pattern="[A-Z]{4}" required /></form></body></html>`,
        sampleStdin: '',
        expectedOutput: 'pattern="[A-Z]{4}"',
      },
      {
        id: 'html-ch-4-q4',
        difficulty: 'Medium',
        title: 'ARIA Pressed Toggle Button',
        prompt: 'Build an accessible toggle <button type="button" aria-pressed="false">Dark Mode</button>.',
        banglaHint: 'aria-pressed="false" যোগ করো।',
        starterCode: `<!doctype html>\n<html><body><button type="button" aria-pressed="false">Dark Mode</button></body></html>`,
        sampleStdin: '',
        expectedOutput: 'aria-pressed="false"',
      },
    ],
    miniBuild: {
      title: 'HTML Mini Build: Zero-JS Validated Registration Form',
      description: 'Combine constraint attributes, CSS :valid/:invalid styling, and accessible button semantics.',
      banglaGoal: 'JS ছাড়াই CSS :valid/:invalid ও HTML5 ভ্যালিডেশনসহ সুন্দর ফর্ম তৈরি।',
      combinesChapters: 'Ch 1–4',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    input { width: 100%; padding: 8px; margin: 6px 0 12px; border: 2px solid #475569; border-radius: 6px; }
    input:valid { border-color: #10b981; }
    input:invalid { border-color: #f59e0b; }
  </style>
</head>
<body>
  <main style="max-width:340px">
    <h1>Contest Sign-Up</h1>
    <form>
      <label for="handle">Handle</label>
      <input id="handle" required minlength="3" value="argon" />
      <button type="submit">Register</button>
    </form>
  </main>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: '<h1>Contest Sign-Up</h1>',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    input { width: 100%; padding: 8px; margin: 6px 0 12px; border: 2px solid #475569; border-radius: 6px; }
    input:valid { border-color: #10b981; }
    input:invalid { border-color: #f59e0b; }
  </style>
</head>
<body>
  <main style="max-width:340px">
    <h1>Contest Sign-Up</h1>
    <form>
      <label for="handle">Handle</label>
      <input id="handle" required minlength="3" value="argon" />
      <button type="submit">Register</button>
    </form>
  </main>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: '<h1>Contest Sign-Up</h1>',
    testCases: [
      { id: 'html-c4-t1', input: '', expectedOutput: '<h1>Contest Sign-Up</h1>' },
      { id: 'html-c4-t2', input: '', expectedOutput: 'minlength="3"', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'HTML Chapter 5 (HTML5): Interactive Checkboxes, Bitmask Flags UI & Native <details>',
    banglaTitle: 'HTML অধ্যায় ৫ (HTML5): চেকবক্স ফ্ল্যাগ UI, <fieldset> ও নেটিভ <details>',
    subtitle: 'Grouping binary flag toggles with <fieldset>/<legend>, CSS :checked state selectors, and zero-JS <details> accordions.',
    isMilestoneMerger: true,
    zeroIntuition: {
      plainEnglishStory:
        'Just as systems code packs binary switches into a compact bitmask integer, HTML UI groups related boolean checkboxes cleanly inside semantic `<fieldset>` and `<legend>` elements! That gives keyboard and screen-reader users explicit context describing what group of flags they are toggling.\n\nEven better, CSS `:checked` combined with the adjacent sibling operator (`input:checked + span`) plus native HTML5 `<details>` and `<summary>` tags power live state highlights and collapsible disclosure panels with ZERO JavaScript!',
      asciiFlowchart: `  <fieldset><legend>Permission Flags</legend>
     [x] READ  (bit 0 = 1)  ---> matches CSS :checked!
     [ ] WRITE (bit 1 = 2)
     [x] EXEC  (bit 2 = 4)
  </fieldset>`,
      pseudocode: [
        '1. GROUP related binary checkbox flags inside <fieldset><legend>',
        '2. STYLE active toggles using CSS input:checked selectors cleanly',
        '3. USE native <details><summary> for accessible expand/collapse blocks',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্ল্যাগ সুইচ বোর্ড ও জিরো-JS <details> অ্যাকর্ডিয়ন',
        explanation:
          'প্রোগ্রামিংয়ে বিটমাস্কের প্রতিটি বিট যেমন একটি অন/অফ সুইচ, ওয়েবপেজে তেমনি চেকবক্স হলো ব্যবহারকারীর অন/অফ সুইচ! অনেকগুলো চেকবক্স বা রেডিও বাটনকে `<fieldset>` ও `<legend>` দিয়ে একসাথে বাঁধলে স্ক্রিন রিডার স্পষ্ট বুঝতে পারে সবগুলো একই গ্রুপের অংশ (এবং রেডিও বাটনে একই `name` দিতে ভুলবে না)। আর বিনা JavaScript-এ দারুণ ইন্টারঅ্যাকটিভ UI বানানো যায় দুটো শক্তিশালী কৌশলে: এক, CSS-এ `input:checked + span` লিখে টিক দেওয়া অবস্থার রঙ বদলানো; দুই, `<details>` ও `<summary>` দিয়ে কীবোর্ড-বান্ধব অ্যাকর্ডিয়ন হিন্ট প্যানেল তৈরি করা! Milestone Merger 1-এ Phase 1-এর সব দক্ষতা এক প্যানেলে সাজানো হয়েছে।',
        everydayExample:
          'বৈদ্যুতিক বোর্ডের সব সুইচ একটি কভার বক্সের (<fieldset>) ভেতর রেখে নাম (<legend>) লিখে দেওয়া।',
        keyTakeaways: [
          'চেকবক্স বা রেডিও বাটনের গ্রুপের জন্য <fieldset> এবং <legend> সেরা।',
          'CSS-এ :checked ব্যবহার করে অন/অফ অবস্থার রঙ বদলানো যায়।',
          '<details> ও <summary> দিয়ে বিনা JavaScript-এ সুন্দর অ্যাকর্ডিয়ন তৈরি হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'html-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Grouped Binary Flags With <fieldset> & <legend>',
        englishParagraphs: [
          'Grouping permission checkboxes inside <fieldset> provides an accessible caption via <legend> for assistive technology.',
        ],
        banglaParagraphs: [
          '<fieldset> এবং <legend> ব্যবহার করলে পারমিশন চেকবক্সগুলো একটি সুন্দর গ্রুপে আবদ্ধ হয়।',
        ],
        memoryDiagram: `<fieldset> -> <legend> -> [ checkbox READ, checkbox WRITE ]`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <fieldset style="border:1px solid #334155;border-radius:10px;padding:14px;max-width:340px">
    <legend style="color:#00f5d4;font-weight:700">Binary Permission Flags</legend>
    <label><input type="checkbox" name="perm" value="1" checked /> READ (bit 0)</label><br/>
    <label><input type="checkbox" name="perm" value="2" /> WRITE (bit 1)</label><br/>
    <label><input type="checkbox" name="perm" value="4" checked /> EXEC (bit 2)</label>
  </fieldset>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Binary Permission Flags',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '<fieldset ...><legend ...>Binary Permission Flags</legend>',
            whatItMeans: 'Groups related boolean controls under a semantic label.',
            whyItIsThere: 'Screen readers announce the group legend on focus.',
            ifDeletedError: 'Checkboxes lose group context.',
          },
        ],
      },
      {
        id: 'html-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero-JS Checked State Styling With CSS :checked',
        englishParagraphs: [
          'Combining `input:checked + span` changes badge color dynamically in pure CSS whenever a user toggles a checkbox.',
        ],
        banglaParagraphs: [
          'CSS-এর :checked + span ব্যবহার করলে চেকবক্সে টিক দেওয়ার সাথে সাথেই টেক্সটের রঙ ও স্টাইল আপডেট হয়।',
        ],
        memoryDiagram: `input:checked + span -> color:#00f5d4; font-weight:700`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; background: #0f172a; color: #94a3b8; padding: 20px; }
    input:checked + span { color: #00f5d4; font-weight: 700; }
  </style>
</head>
<body>
  <label><input type="checkbox" checked /> <span>Bitmask Mode Active</span></label>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Bitmask Mode Active',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'input:checked + span { color: #00f5d4; font-weight: 700; }',
            whatItMeans: 'Adjacent sibling CSS selector matching checked inputs.',
            whyItIsThere: 'Drives reactive UI highlights with zero JS.',
            ifDeletedError: 'Label looks identical whether checked or unchecked.',
          },
        ],
      },
      {
        id: 'html-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Zero-JS Interactive <details> & <summary> Drawer',
        englishParagraphs: [
          'HTML5 `<details>` renders a keyboard-accessible collapsible panel natively across every browser without scripting.',
        ],
        banglaParagraphs: [
          'অ্যাকাডেমির হিন্ট বক্স বা FAQ খুলতে-বন্ধ করতে কোনো JavaScript ছাড়াই `<details>` ট্যাগ চমৎকার কাজ করে।',
        ],
        memoryDiagram: `<details open> -> <summary> (toggle header) + body content`,
        code: `<!doctype html>
<html lang="en">
<body style="font-family:system-ui;background:#0f172a;color:#f8fafc;padding:20px">
  <details open style="background:#1e293b;padding:12px;border-radius:10px;max-width:380px">
    <summary style="cursor:pointer;font-weight:700;color:#38bdf8">Hint 1: Bitwise Parity</summary>
    <p style="margin-top:8px">Check (n &amp; 1) == 0 in a single clock cycle!</p>
  </details>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Hint 1: Bitwise Parity',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: '<details open ...><summary ...>',
            whatItMeans: 'Native collapsible disclosure widget.',
            whyItIsThere: 'Replaces brittle custom JS accordion scripts.',
            ifDeletedError: 'Content stays permanently static.',
          },
        ],
      },
      {
        id: 'html-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 1 (HTML Ch 1–5): Complete Interactive Spec Card',
        englishParagraphs: [
          'Combining Standards Mode, CSS border-box, escaped code entities, accessible form constraints, and grouped `<fieldset>` flags forms a complete zero-JS Phase 1 dashboard.',
        ],
        banglaParagraphs: [
          'অধ্যায় ১ থেকে ৫ পর্যন্ত শেখা সব HTML5 ও CSS টুল মিলিয়ে একটি সম্পূর্ণ অ্যাক্সেসিবল ও নিরাপদ ড্যাশবোর্ড কার্ড তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `Phase 1 Stack: doctype + border-box + entities + constraint form + details`,
        code: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    .card { max-width: 420px; background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Phase 1 Merger Panel</h1>
    <fieldset style="border:1px solid #475569;border-radius:8px;padding:10px">
      <legend>Bit Flags</legend>
      <label><input type="checkbox" checked /> <code>1ULL &lt;&lt; 0</code> Active</label>
    </fieldset>
    <details open style="margin-top:10px">
      <summary>Result</summary>
      <p>unique=9</p>
    </details>
  </main>
</body>
</html>`,
        stdin: '',
        expectedOutput: 'Phase 1 Merger Panel',
        lineByLine: [
          {
            lineNumber: 'Line 14',
            codeSnippet: '<code>1ULL &lt;&lt; 0</code>',
            whatItMeans: 'Safely escapes << inside inline code element.',
            whyItIsThere: 'Merges Ch 2 entity safety with Ch 5 UI flags.',
            ifDeletedError: '<< risks broken tag parsing.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '<fieldset><legend>...</legend>...</fieldset>',
        whatItMeans: 'Accessible control grouping container.',
        whyItIsThere: 'Binds binary flag checkboxes to a shared title.',
        ifDeletedError: 'Related toggles float without context.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '<details open><summary>...</summary></details>',
        whatItMeans: 'Native zero-JS collapsible disclosure element.',
        whyItIsThere: 'Built-in keyboard + screen-reader toggle support.',
        ifDeletedError: 'Cannot collapse or expand sections cleanly.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Apply border-box CSS', memoryOrStack: '420px card', note: 'Zero horizontal overflow' },
      { step: 2, state: 'Render <fieldset> legend', memoryOrStack: 'Bit Flags group', note: 'Screen-reader labeled' },
      { step: 3, state: 'Escape 1ULL &lt;&lt; 0', memoryOrStack: 'Text: 1ULL << 0', note: 'Safe entity output' },
      { step: 4, state: 'Render <details open>', memoryOrStack: 'Expanded summary', note: 'Interactive without JS' },
    ],
    harryBugTraps: [
      {
        title: 'Duplicate radio/checkbox IDs Breaking Label Clicks',
        brokenCode: '<input id="opt" type="checkbox"><input id="opt" type="checkbox">',
        fixedCode: '<input id="opt1" type="checkbox"><input id="opt2" type="checkbox">',
        whyItBreaks: 'Duplicate IDs cause clicking the second label to toggle the first checkbox instead!',
      },
      {
        title: 'Using <div onclick> Accordion Instead of <details>',
        brokenCode: '<div onclick="toggle()">Hint</div>',
        fixedCode: '<details><summary>Hint</summary><p>...</p></details>',
        whyItBreaks: 'Reinventing collapsible blocks with div fails keyboard Enter/Space support.',
      },
      {
        title: 'Omitting name Attribute on Radio Groups',
        brokenCode: '<input type="radio"> A <input type="radio"> B',
        fixedCode: '<input type="radio" name="tier"> A <input type="radio" name="tier"> B',
        whyItBreaks: 'Without a shared name, multiple radio buttons stay selectable simultaneously.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-5-q1',
        difficulty: 'Easy',
        title: 'Grouped Flag Fieldset',
        prompt: 'Create a <fieldset> with <legend>Access</legend> and two checkbox labels.',
        banglaHint: '<fieldset> ও <legend> ব্যবহার করো।',
        starterCode: `<!doctype html>\n<html><body><fieldset><legend>Access</legend><label><input type="checkbox" checked /> Read</label><label><input type="checkbox" /> Write</label></fieldset></body></html>`,
        sampleStdin: '',
        expectedOutput: '<legend>Access</legend>',
      },
      {
        id: 'html-ch-5-q2',
        difficulty: 'Easy',
        title: 'CSS :checked Sibling Highlight',
        prompt: 'Style `input:checked + span` with emerald color `#10b981`.',
        banglaHint: 'input:checked + span সিলেক্টর লিখো।',
        starterCode: `<!doctype html>\n<html><head><style>input:checked+span{color:#10b981;font-weight:700;}</style></head><body><label><input type="checkbox" checked /><span>Flag ON</span></label></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Flag ON',
      },
      {
        id: 'html-ch-5-q3',
        difficulty: 'Medium',
        title: 'Native <details> Hint Panel',
        prompt: 'Build an open <details> disclosure displaying a bitwise hint.',
        banglaHint: '<details open><summary>...</summary></details>',
        starterCode: `<!doctype html>\n<html><body><details open><summary>Hint</summary><p>Use &amp; 1 for parity</p></details></body></html>`,
        sampleStdin: '',
        expectedOutput: '<summary>Hint</summary>',
      },
      {
        id: 'html-ch-5-q4',
        difficulty: 'Medium',
        title: 'Milestone Merger Card',
        prompt: 'Render an HTML5 card showing <h1>Phase 1 Merger</h1> with <fieldset> and <details>.',
        banglaHint: 'Ch 1–5 এর সব ট্যাগ একসাথে সাজাও।',
        starterCode: `<!doctype html>\n<html><body><main><h1>Phase 1 Merger</h1><fieldset><legend>Flags</legend><label><input type="checkbox" checked /> Active</label></fieldset><details open><summary>Note</summary><p>Ready</p></details></main></body></html>`,
        sampleStdin: '',
        expectedOutput: '<h1>Phase 1 Merger</h1>',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (HTML Ch 1–5): Complete Phase 1 Flag & Disclosure Dashboard',
      description: 'Combine HTML5 boilerplate, border-box CSS, safe entities, <fieldset>, and native <details>.',
      banglaGoal: 'অধ্যায় ১–৫ মিলিয়ে সম্পূর্ণ জিরো-JS ইন্টারেক্টিভ HTML5 ড্যাশবোর্ড।',
      combinesChapters: 'Ch 1–5',
      starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    .card { max-width: 420px; background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Phase 1 Merger Panel</h1>
    <fieldset style="border:1px solid #475569;border-radius:8px;padding:10px">
      <legend>Bit Flags</legend>
      <label><input type="checkbox" checked /> <code>1ULL &lt;&lt; 0</code> Active</label>
    </fieldset>
    <details open style="margin-top:10px">
      <summary>Result</summary>
      <p>unique=9</p>
    </details>
  </main>
</body>
</html>`,
      sampleStdin: '',
      expectedOutput: '<h1>Phase 1 Merger Panel</h1>',
    },
    starterCode: `<!doctype html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui; background: #0f172a; color: #f8fafc; padding: 20px; }
    .card { max-width: 420px; background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <main class="card">
    <h1>Phase 1 Merger Panel</h1>
    <fieldset style="border:1px solid #475569;border-radius:8px;padding:10px">
      <legend>Bit Flags</legend>
      <label><input type="checkbox" checked /> <code>1ULL &lt;&lt; 0</code> Active</label>
    </fieldset>
    <details open style="margin-top:10px">
      <summary>Result</summary>
      <p>unique=9</p>
    </details>
  </main>
</body>
</html>`,
    sampleStdin: '',
    expectedSampleOutput: '<h1>Phase 1 Merger Panel</h1>',
    testCases: [
      { id: 'html-c5-t1', input: '', expectedOutput: '<h1>Phase 1 Merger Panel</h1>' },
      { id: 'html-c5-t2', input: '', expectedOutput: '<fieldset', isHidden: true },
    ],
  },
  ...LESSONS_HTML_P2,
  ...LESSONS_HTML_P3,
  ...LESSONS_HTML_P4,
  ...LESSONS_HTML_P5,
};
