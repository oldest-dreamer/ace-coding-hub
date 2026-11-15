import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_JS_P2 } from './lessons_js_p2';
import { LESSONS_JS_P3 } from './lessons_js_p3';
import { LESSONS_JS_P4 } from './lessons_js_p4';
import { LESSONS_JS_P5 } from './lessons_js_p5';

export const LESSONS_JS: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'JavaScript Chapter 1 (ES2025): V8 JIT Engine, Event Loop & First Script',
    banglaTitle: 'JavaScript অধ্যায় ১ (ES2025): V8 JIT ইঞ্জিন ও প্রথম প্রোগ্রাম',
    subtitle: 'How V8/SpiderMonkey JIT compiles JS on the fly and how ArgonCode’s universal stdin shim runs everywhere.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript powers interactive web browsers, Node.js APIs, and serverless edge runtimes through high-speed JIT engines like Google V8. Rather than requiring an ahead-of-time build binary, V8 parses script text into an Abstract Syntax Tree, launches Ignition bytecode instantaneously, and JIT-compiles hot loops with TurboFan into native machine instructions.\n\nModern ES2025 enforces block scoping with const (default) and let (for reassignment), abandoning leaky var declarations. Template literals (`Hello ${name}`) replace clumsy + concatenation, and checking typeof readAllStdin ensures our scripts read cleanly across both browser sandboxes and Node.js CLI streams.',
      asciiFlowchart: `  [ main.js Source ] ---> [ V8 Parser -> AST -> Ignition Bytecode ]
                                |
                                v (TurboFan JIT optimizes hot paths!)
  [ console.log(...) ] ---> [ Browser DevTools / Node stdout ]`,
      pseudocode: [
        '1. READ input via universal browser + Node.js stdin helper',
        '2. DECLARE immutable const bindings for received tokens',
        '3. COMPUTE result cleanly and log to console.log()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্রাউজারের প্রাণশক্তি ও তাৎক্ষণিক V8 অনুবাদক',
        explanation:
          'HTML ওয়েবসাইটের কঙ্কাল এবং CSS তার পোশাক হলে, JavaScript হলো ওয়েব অ্যাপ ও Node.js সার্ভারের আসল মস্তিষ্ক! C বা Java-র মতো আলাদা কম্পাইল ধাপ না থাকলেও ব্রাউজার ও Node.js-এর V8 ইঞ্জিন মুহূর্তেই কোড পড়ে বাইটকোড চালায় এবং ঘন ঘন চলা লুপগুলোকে TurboFan JIT দিয়ে নেটিভ মেশিন কোডে পরিণত করে। আধুনিক ES2025 নিয়মে ভ্যারিয়েবল না বদলালে সব সময় const আর বদলালে let ব্যবহার করবে—পুরনো var স্কোপ লিক করে বলে তা বর্জনীয়। লেখা ও মান জোড়া দিতে ব্যাকটিক টেমপ্লেট লিটারেল (`Welcome ${name}`) ব্যবহার করবে, ইনপুট স্ট্রিংকে যোগ করার আগে অবশ্যই Number() দিয়ে সংখ্যায় রূপান্তর করবে, আর একাধিক লাইন পড়তে .filter(Boolean) দিয়ে খালি লাইন বাদ দেবে।',
        everydayExample:
          'দোভাষীর মতো সাথে সাথে শুনে অনুবাদ করে দেওয়া—আলাদা করে বই ছাপানোর (compile) দরকার হয় না।',
        keyTakeaways: [
          'ভ্যারিয়েবলের মান না বদলালে সব সময় const ব্যবহার করো, আর বদলালে let। var আর কখনোই নয়!',
          'console.log() আউটপুট দেখায় এবং স্বয়ংক্রিয়ভাবে নতুন লাইন দেয়।',
          'টেমপ্লেট লিটারেল (`Welcome ${name}`) দিয়ে সহজেই স্ট্রিং সাজানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'ES2025 Template Literals & const Bindings',
        englishParagraphs: [
          'Modern ES2025 replaces error-prone string + concatenation with backtick template literals (`...${expr}`).',
          'Always default to const so bindings cannot be accidentally reassigned elsewhere in the script.',
        ],
        banglaParagraphs: [
          'আধুনিক জাভাস্ক্রিপ্টে ব্যাকটিক (`) ব্যবহার করে ভেতরে ${...} লিখে সরাসরি ভ্যারিয়েবল বসানো যায়। এটি + দিয়ে জোড়া দেওয়ার চেয়ে অনেক পরিষ্কার।',
        ],
        memoryDiagram: `V8 Heap: const engine="V8 ES2025" -> Template string -> console.log stdout`,
        code: `const engine = "V8 ES2025";
const year = 2025;
console.log(\`Hello from \${engine} (\${year})!\`);`,
        stdin: '',
        expectedOutput: 'Hello from V8 ES2025 (2025)!',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'const engine = "V8 ES2025";',
            whatItMeans: 'Declares block-scoped constant string reference.',
            whyItIsThere: 'Prevents accidental reassignment bugs.',
            ifDeletedError: 'ReferenceError: engine is not defined.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'console.log(`Hello from ${engine} (${year})!`);',
            whatItMeans: 'Interpolates expressions inside template literal.',
            whyItIsThere: 'Outputs single clean line to stdout.',
            ifDeletedError: 'Nothing printed.',
          },
        ],
      },
      {
        id: 'js-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Universal Browser + Node.js Standard Input Reader',
        englishParagraphs: [
          'In Node.js/Piston, fs.readFileSync(0, "utf8") reads stdin; in our browser sandbox, readAllStdin() supplies stdin directly. Checking typeof readAllStdin === "function" makes every script portable across both.',
        ],
        banglaParagraphs: [
          'নিচের প্যাটার্নটি ব্রাউজার স্যান্ডবক্স এবং Node.js সার্ভার—উভয় জায়গাতেই stdin পড়তে পারে, তাই তুমি সরাসরি ব্রাউজারে মুহূর্তেই টেস্ট করতে পারবে।',
        ],
        memoryDiagram: `readAllStdin() / fs -> "Argon 21" -> split(/\\s+/) -> ["Argon","21"]`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, scoreStr] = raw.trim().split(/\\s+/);
if (name && scoreStr) {
  console.log(\`Coder \${name} scored \${Number(scoreStr) * 2}\`);
}`,
        stdin: 'Argon 21',
        expectedOutput: 'Coder Argon scored 42',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const [name, scoreStr] = raw.trim().split(/\\s+/);',
            whatItMeans: 'Array destructuring extracts first two whitespace tokens.',
            whyItIsThere: 'Cleanly parses inputs in one readable line.',
            ifDeletedError: 'Variables remain undefined.',
          },
        ],
      },
      {
        id: 'js-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Structured Object Payload & JSON Serialization',
        englishParagraphs: [
          'JavaScript powers web APIs because native objects serialize cleanly to JSON.stringify(). Inspecting structured payloads keeps logs clean across browsers and backends.',
        ],
        banglaParagraphs: [
          'API ডেভেলপমেন্টে অবজেক্টকে JSON.stringify() দিয়ে টেক্সটে রূপান্তর করে পাঠানো হয়।',
        ],
        memoryDiagram: `Object { lang, modern } -> JSON.stringify -> compact JSON string`,
        code: `const status = { lang: "JavaScript", es: 2025, ready: true };
console.log(\`Boot: \${JSON.stringify(status)}\`);`,
        stdin: '',
        expectedOutput: 'Boot: {"lang":"JavaScript","es":2025,"ready":true}',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'JSON.stringify(status)',
            whatItMeans: 'Serializes JS object to standard JSON string.',
            whyItIsThere: 'Avoids "[object Object]" coercion trap.',
            ifDeletedError: 'Template literal prints "[object Object]".',
          },
        ],
      },
      {
        id: 'js-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Multi-Line EOF Sum & Number() Trap (Avoid NaN)',
        englishParagraphs: [
          'Calling Number("") returns 0 silently, and split("\\n") on trailing newlines leaves empty strings! Filtering out blank lines with .filter(Boolean) prevents subtle NaN/0 bugs in multi-test inputs.',
        ],
        banglaParagraphs: [
          'ইনপুটের শেষে বাড়তি ফাঁকা লাইন থাকলে split("\\n") একটা খালি স্ট্রিং দেয় যা থেকে অবাঞ্ছিত 0 আসতে পারে। .filter(Boolean) দিয়ে খালি লাইন বাদ দিলে কোড শতভাগ নিরাপদ।',
        ],
        memoryDiagram: `lines=["3 4","10 20",""] -> filter(Boolean) -> ["3 4","10 20"]`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/).filter(Boolean);
for (const line of lines) {
  const [a, b] = line.trim().split(/\\s+/).map(Number);
  console.log(a + b);
}`,
        stdin: '3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const lines = raw.trim().split(/\\r?\\n/).filter(Boolean);',
            whatItMeans: 'Splits by Windows/Unix newlines and drops empty rows.',
            whyItIsThere: 'Prevents NaN when trailing newlines exist.',
            ifDeletedError: 'Extra NaN line printed at end of output.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const raw = typeof readAllStdin === "function" ? readAllStdin() : fs.readFileSync(0, "utf8");',
        whatItMeans: 'Reads stdin across browser sandbox and Node CLI.',
        whyItIsThere: 'Universal stdin compatibility.',
        ifDeletedError: 'Cannot read automated test inputs.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'console.log(`Welcome, ${name}! Score: ${score * 2}`);',
        whatItMeans: 'Emits interpolated result to stdout.',
        whyItIsThere: 'Standard JS output channel.',
        ifDeletedError: 'Empty output.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'readAllStdin()', memoryOrStack: 'raw="Argon 42"', note: 'Reads stdin text' },
      { step: 2, state: 'split(/\\s+/)', memoryOrStack: '["Argon", "42"]', note: 'Destructures tokens' },
      { step: 3, state: 'Number("42") * 2', memoryOrStack: 'score = 84', note: 'Converts string to number' },
      { step: 4, state: 'console.log(...)', memoryOrStack: 'stdout', note: 'Outputs Welcome, Argon! Score: 84' },
    ],
    harryBugTraps: [
      {
        title: 'Concatenating Instead of Adding Strings From stdin',
        brokenCode: 'const a = "3", b = "4"; console.log(a + b); // "34"!',
        fixedCode: 'console.log(Number(a) + Number(b)); // 7',
        whyItBreaks: 'Input tokens are strings; + concatenates strings unless explicitly converted with Number().',
      },
      {
        title: 'Using Legacy var Inside Loops',
        brokenCode: 'for (var i = 0; i < 3; i++) {} console.log(i); // leaks 3!',
        fixedCode: 'for (let i = 0; i < 3; i++) {}',
        whyItBreaks: 'var leaks out of if/for blocks to the enclosing function scope.',
      },
      {
        title: 'Template Literal With Regular Quotes',
        brokenCode: 'console.log("Hi ${name}"); // prints literal ${name}!',
        fixedCode: 'console.log(`Hi ${name}`);',
        whyItBreaks: '${...} interpolation only activates inside backticks (`).',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-1-q1',
        difficulty: 'Easy',
        title: 'ES2025 Greeting',
        prompt: 'Print "ArgonCode JS Ready" using console.log and a const binding.',
        banglaHint: 'const msg = "ArgonCode JS Ready"; ব্যবহার করো।',
        starterCode: `const msg = "ArgonCode JS Ready";\nconsole.log(msg);`,
        sampleStdin: '',
        expectedOutput: 'ArgonCode JS Ready',
      },
      {
        id: 'js-ch-1-q2',
        difficulty: 'Easy',
        title: 'Token Multiplier',
        prompt: 'Read city and count from stdin and output "<city>: <count>".',
        banglaHint: 'raw.trim().split(/\\s+/) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [city, pop] = raw.trim().split(/\\s+/);\nconsole.log(\`\${city}: \${Number(pop)}\`);`,
        sampleStdin: 'Dhaka 22',
        expectedOutput: 'Dhaka: 22',
      },
      {
        id: 'js-ch-1-q3',
        difficulty: 'Medium',
        title: 'Multi-Case Line Adder',
        prompt: 'Read multiple lines of "a b" and print each sum on its own line.',
        banglaHint: '.split(/\\r?\\n/).filter(Boolean) ব্যবহার করে লুপ চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nfor (const line of raw.trim().split(/\\r?\\n/).filter(Boolean)) {\n  const [a, b] = line.trim().split(/\\s+/).map(Number);\n  console.log(a + b);\n}`,
        sampleStdin: '5 7\n10 25',
        expectedOutput: '12\n35',
      },
      {
        id: 'js-ch-1-q4',
        difficulty: 'Medium',
        title: 'JSON Status Formatter',
        prompt: 'Create { lang: "JS", ok: true } and print JSON.stringify of it.',
        banglaHint: 'JSON.stringify({ lang: "JS", ok: true }) প্রিন্ট করো।',
        starterCode: `console.log(JSON.stringify({ lang: "JS", ok: true }));`,
        sampleStdin: '',
        expectedOutput: '{"lang":"JS","ok":true}',
      },
    ],
    miniBuild: {
      title: 'JS Mini Build: Interactive Score Greeter',
      description: 'Parse name and score from stdin and log the doubled greeting cleanly.',
      banglaGoal: 'stdin থেকে নাম ও নম্বর পড়ে দ্বিগুণ স্কোর প্রিন্ট করা।',
      combinesChapters: 'Ch 1',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, scoreStr] = raw.trim().split(/\\s+/);
if (name && scoreStr) {
  console.log(\`Welcome, \${name}! Score: \${Number(scoreStr) * 2}\`);
}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [name, scoreStr] = raw.trim().split(/\\s+/);
if (name && scoreStr) {
  console.log(\`Welcome, \${name}! Score: \${Number(scoreStr) * 2}\`);
}`,
    sampleStdin: 'Argon 42',
    expectedSampleOutput: 'Welcome, Argon! Score: 84',
    testCases: [
      { id: 'js-c1-t1', input: 'Argon 42', expectedOutput: 'Welcome, Argon! Score: 84' },
      { id: 'js-c1-t2', input: 'Dhaka 10', expectedOutput: 'Welcome, Dhaka! Score: 20', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'JavaScript Chapter 2 (ES2025): Buffered I/O, Output Batching & Formatting',
    banglaTitle: 'JavaScript অধ্যায় ২ (ES2025): বাফারড I/O, আউটপুট ব্যাচিং ও ফরম্যাটিং',
    subtitle: 'Single-read token parsing, array .join("\\n") batching, .toFixed(2), padStart/padEnd, and escape sequences.',
    zeroIntuition: {
      plainEnglishStory:
        'When processing 100,000 numbers or output rows in Node.js, naive patterns hit Time Limit Exceeded fast: calling tokens.shift() shifts the entire array left on every pop—turning O(N) into O(N²)—while calling console.log() 10^5 times triggers 10^5 separate stream writes!\n\nFast ES2025 I/O slurps stdin once with raw.trim().split(/\\s+/), advances an O(1) index cursor tokens[idx++], formats fields cleanly with num.toFixed(2) and str.padEnd(w), pushes every output row into an out[] array, and flushes everything at once via console.log(out.join("\\n")).',
      asciiFlowchart: `  [ 10^5 stdout lines ]
     |-- slow --> 100,000 x console.log() calls (TLE!)
     |-- fast --> out.push(line) ---> single console.log(out.join("\\n")) (AC!)`,
      pseudocode: [
        '1. SLURP stdin once and split into token array',
        '2. ADVANCE index idx++ instead of slow Array.shift()',
        '3. FORMAT decimals with .toFixed(2) and align columns with .padEnd()',
        '4. JOIN output lines once at the end',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Array.shift() বনাম idx++ কার্সর',
        explanation:
          'JavaScript-এ বড় ডেটা পড়তে গিয়ে অনেকেই দুটো মারাত্মক ভুল করেন: প্রথমত, tokens.shift() কল করলে প্রতিবার পুরো অ্যারের বাকি সব এলিমেন্ট এক ঘর বামে সরে—যার ফলে ১ লক্ষ সংখ্যায় O(N²) টাইম লেগে TLE হয়! দ্বিতীয়ত, লুপের ভেতর ১ লক্ষ বার console.log() ডাকলে প্রোগ্রাম অনেক ধীর হয়ে যায়। সঠিক প্রফেশনাল পদ্ধতি হলো একবারে পুরো stdin পড়ে .trim().split(/\\s+/) করে একটি idx = 0 কার্সর দিয়ে O(1) সময়ে tokens[idx++] পড়া, এবং সব উত্তর out[] অ্যারেতে জমা করে শেষে একবার console.log(out.join("\\n")) দিয়ে ফ্লাশ করা। পাশাপাশি দশমিক ঠিক ২ ঘর রাখতে .toFixed(2) (যা স্ট্রিং ফেরত দেয়!) এবং কলাম সাজাতে padEnd/padStart ব্যবহার করবে।',
        everydayExample:
          'সিনেমা হলের পুরো লাইনকে সামনে না টেনে টিকিট চেকার নিজে এক ধাপ এক ধাপ সামনে হাঁটে—এটাই idx++।',
        keyTakeaways: [
          'tokens[idx++] হলো O(1), কিন্তু tokens.shift() হলো O(n)—কনটেস্টে shift() বর্জনীয়।',
          'number.toFixed(2) সব সময় ২ ঘর দশমিকের একটি স্ট্রিং রিটার্ন করে।',
          'padStart ও padEnd দিয়ে সুন্দর কলাম টেবিল সাজানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'toFixed(2), String Escapes & Column Padding',
        englishParagraphs: [
          'JavaScript formats fixed decimals with num.toFixed(2) and aligns tables using .padEnd(width) and .padStart(width) without external libraries.',
        ],
        banglaParagraphs: [
          'দশমিকের পর নির্দিষ্ট ঘর দেখাতে .toFixed(2) এবং সুন্দর কলাম বানাতে .padEnd() ও .padStart() ব্যবহার করা হয়।',
        ],
        memoryDiagram: `price=149.456 -> .toFixed(2) -> "149.46" | padEnd(8) -> "Item    "`,
        code: `const price = 149.456;
console.log(\`Item:\\t\\"Notebook\\"\\nTotal:\\t\${price.toFixed(2)} BDT\`);`,
        stdin: '',
        expectedOutput: 'Item:\t"Notebook"\nTotal:\t149.46 BDT',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'price.toFixed(2)',
            whatItMeans: 'Rounds number to 2 decimal places as a formatted string.',
            whyItIsThere: 'Avoids messy floats like 149.45600001.',
            ifDeletedError: 'Raw float precision printed.',
          },
        ],
      },
      {
        id: 'js-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(1) Token Cursor Input Reader & Average Output',
        englishParagraphs: [
          'Splitting stdin once and advancing an integer cursor tokens[idx++] guarantees linear O(N) parsing with zero shift() overhead.',
        ],
        banglaParagraphs: [
          'সব টোকেন একবারে ভাগ করে idx++ কার্সর দিয়ে পড়লে বড় ইনপুটেও গতি একদম ঠিক থাকে।',
        ],
        memoryDiagram: `tokens=["15","24"] | idx=0->15, idx=1->24 -> Sum=39 | Avg=19.5`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
let idx = 0;
const a = Number(tokens[idx++]);
const b = Number(tokens[idx++]);
console.log(\`Sum=\${a + b} | Avg=\${((a + b) / 2).toFixed(1)}\`);`,
        stdin: '15 24',
        expectedOutput: 'Sum=39 | Avg=19.5',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'const a = Number(tokens[idx++]);',
            whatItMeans: 'Reads next token in O(1) time and advances cursor.',
            whyItIsThere: 'O(N) scalable replacement for slow .shift().',
            ifDeletedError: 'Reads wrong token or falls into O(N^2) slowdown.',
          },
        ],
      },
      {
        id: 'js-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Aligned Terminal Leaderboard Table With padEnd / padStart',
        englishParagraphs: [
          'CLI dashboards format cleanly using String.prototype.padEnd and padStart alongside ES2025 array map + join.',
        ],
        banglaParagraphs: [
          'টার্মিনাল টেবিলের প্রতিটি রো সুন্দরভাবে সারিবদ্ধ করতে padEnd এবং padStart ব্যবহার করা হয়েছে।',
        ],
        memoryDiagram: `rows.map(...) -> ["Lang | Year", ...] -> .join("\\n")`,
        code: `const rows = [
  ["JS", 1995],
  ["TS", 2012],
  ["Rust", 2015],
];
const out = ["Lang   | Year"];
for (const [lang, yr] of rows) {
  out.push(\`\${lang.padEnd(6)} | \${String(yr).padStart(4)}\`);
}
console.log(out.join("\\n"));`,
        stdin: '',
        expectedOutput: 'Lang   | Year\nJS     | 1995\nTS     | 2012\nRust   | 2015',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'lang.padEnd(6)',
            whatItMeans: 'Pads spaces on right until string reaches length 6.',
            whyItIsThere: 'Keeps vertical pipe separator aligned.',
            ifDeletedError: 'Columns shift jaggedly.',
          },
        ],
      },
      {
        id: 'js-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Output Batching Template for 100,000 Lines (Zero TLE)',
        englishParagraphs: [
          'Batching stdout lines inside an array and calling console.log(out.join("\\n")) once at completion avoids Node event-loop flush overhead on massive judges.',
        ],
        banglaParagraphs: [
          'লক্ষ লাইনের আউটপুট লুপের ভেতরে console.log না করে আগে অ্যারেতে জমা করে শেষে একবার join("\\n") দিয়ে প্রিন্ট করলে কখনোই TLE হবে না।',
        ],
        memoryDiagram: `out[] accumulates results -> single console.log(out.join("\\n"))`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
let idx = 0;
const n = Number(tokens[idx++]);
const out = [];
let running = 0;
for (let i = 0; i < n; i++) {
  running += Number(tokens[idx++]);
  out.push(running);
}
console.log(out.join("\\n"));`,
        stdin: '4 10 20 30 40',
        expectedOutput: '10\n30\n60\n100',
        lineByLine: [
          {
            lineNumber: 'Line 12',
            codeSnippet: 'console.log(out.join("\\n"));',
            whatItMeans: 'Flushes all accumulated lines in a single call.',
            whyItIsThere: 'Avoids 10^5 stream syscalls.',
            ifDeletedError: 'Multiple slow stdout writes.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const tokens = raw.trim().split(/\\s+/);',
        whatItMeans: 'Tokenizes entire stdin stream once.',
        whyItIsThere: 'Separates inputs cleanly regardless of newlines vs spaces.',
        ifDeletedError: 'Cannot index multiple inputs sequentially.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'console.log(out.join("\\n"));',
        whatItMeans: 'Emits batched output in one flush.',
        whyItIsThere: 'Prevents Node I/O TLE on 10^5 outputs.',
        ifDeletedError: 'No output or slow flushing.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'tokens = ["4","10","20","30","40"]', memoryOrStack: 'idx = 0', note: 'Tokenized once' },
      { step: 2, state: 'n = 4, idx becomes 1', memoryOrStack: 'running=0', note: 'Header read' },
      { step: 3, state: 'Loop i=0..3', memoryOrStack: 'out=[10,30,60,100]', note: 'Accumulates prefix sums' },
      { step: 4, state: 'out.join("\\n")', memoryOrStack: 'stdout', note: 'Single batched write' },
    ],
    harryBugTraps: [
      {
        title: 'Using tokens.shift() Inside a 10^5 Loop',
        brokenCode: 'for (let i = 0; i < n; i++) x = Number(tokens.shift());',
        fixedCode: 'let idx = 0;\nfor (let i = 0; i < n; i++) x = Number(tokens[idx++]);',
        whyItBreaks: 'tokens.shift() moves every remaining array item each step: O(n^2) = 10^10 operations!',
      },
      {
        title: 'Expecting .toFixed(2) to Return a Number',
        brokenCode: 'const total = (10.5).toFixed(2) + 5; // "10.505"!',
        fixedCode: 'const total = (10.5 + 5).toFixed(2); // "15.50"',
        whyItBreaks: '.toFixed() returns a string; adding a number afterward triggers string concatenation!',
      },
      {
        title: 'Forgetting trim() Before split()',
        brokenCode: '"  10 20 ".split(/\\s+/) // ["", "10", "20", ""]',
        fixedCode: '"  10 20 ".trim().split(/\\s+/)',
        whyItBreaks: 'Leading or trailing whitespace creates empty string elements at array edges.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-2-q1',
        difficulty: 'Easy',
        title: 'Escaped File Path',
        prompt: 'Print: Path: "C:\\JS\\app.js"',
        banglaHint: 'ব্যাকস্ল্যাশ ডাবল (\\\\) ও কোট এস্কেপ (\\") করো।',
        starterCode: `console.log('Path: "C:\\\\JS\\\\app.js"');`,
        sampleStdin: '',
        expectedOutput: 'Path: "C:\\JS\\app.js"',
      },
      {
        id: 'js-ch-2-q2',
        difficulty: 'Easy',
        title: 'Fixed 2-Decimal Average',
        prompt: 'Read 3 numbers from stdin and log their average using .toFixed(2).',
        banglaHint: '((a+b+c)/3).toFixed(2) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b, c] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(((a + b + c) / 3).toFixed(2));`,
        sampleStdin: '10 20 31',
        expectedOutput: '20.33',
      },
      {
        id: 'js-ch-2-q3',
        difficulty: 'Medium',
        title: 'O(1) Cursor Running Total',
        prompt: 'Read n and n values using tokens[idx++], logging Total=<sum>.',
        banglaHint: 'tokens[idx++] দিয়ে সবগুলো যোগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/);\nlet idx = 0;\nconst n = Number(t[idx++]);\nlet sum = 0;\nfor (let i = 0; i < n; i++) sum += Number(t[idx++]);\nconsole.log(\`Total=\${sum}\`);`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: 'Total=50',
      },
      {
        id: 'js-ch-2-q4',
        difficulty: 'Medium',
        title: 'Padded Key-Value Column',
        prompt: 'Read label and value, format label padded right to 6 chars with " | " and value.',
        banglaHint: 'label.padEnd(6) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [k, v] = raw.trim().split(/\\s+/);\nconsole.log(\`\${k.padEnd(6)} | \${v}\`);`,
        sampleStdin: 'XP 250',
        expectedOutput: 'XP     | 250',
      },
    ],
    miniBuild: {
      title: 'JS Mini Build: Fast Stream Receipt Printer',
      description: 'Read n prices with an O(1) cursor and output Total and Avg formatted to 2 decimal places.',
      banglaGoal: 'O(1) কার্সর দিয়ে n সংখ্যক দাম পড়ে মোট ও গড় ২ দশমিকে প্রিন্ট করা।',
      combinesChapters: 'Ch 1–2',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
let idx = 0;
const n = Number(tokens[idx++]);
let total = 0;
for (let i = 0; i < n; i++) total += Number(tokens[idx++]);
console.log(\`Total=\${total.toFixed(2)} Avg=\${(total / n).toFixed(2)}\`);`,
      sampleStdin: '3\n10.5 20.0 29.5',
      expectedOutput: 'Total=60.00 Avg=20.00',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
let idx = 0;
const n = Number(tokens[idx++]);
let total = 0;
for (let i = 0; i < n; i++) total += Number(tokens[idx++]);
console.log(\`Total=\${total.toFixed(2)} Avg=\${(total / n).toFixed(2)}\`);`,
    sampleStdin: '3\n10.5 20.0 29.5',
    expectedSampleOutput: 'Total=60.00 Avg=20.00',
    testCases: [
      { id: 'js-c2-t1', input: '3\n10.5 20.0 29.5', expectedOutput: 'Total=60.00 Avg=20.00' },
      { id: 'js-c2-t2', input: '2\n5.0 10.0', expectedOutput: 'Total=15.00 Avg=7.50', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'JavaScript Chapter 3 (ES2025): Number Precision Limit (MAX_SAFE_INTEGER) & BigInt',
    banglaTitle: 'JavaScript অধ্যায় ৩ (ES2025): Number-এর নিরাপদ সীমা ও BigInt',
    subtitle: 'IEEE-754 53-bit integer ceiling (9×10^15), 0.1 + 0.2 rounding, typeof quirks, and BigInt (n).',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript has no native 32-bit int or 64-bit long—every ordinary Number is an IEEE-754 64-bit binary float with only 53 mantissa bits of exact integer precision! Integers stay exact only up to Number.MAX_SAFE_INTEGER (9,007,199,254,740,991 ≈ 9 × 10^15); beyond that, consecutive integers collapse into the same float (MAX_SAFE_INTEGER + 1 === MAX_SAFE_INTEGER + 2 evaluates to true!).\n\nFor 10^18 competitive answers, modular math, or large IDs, wrap raw strings directly in BigInt(str) or suffix literals with n (like 1n, 2n) without passing through Number() first—and remember fintech systems store money in integer cents to dodge 0.1 + 0.2 === 0.30000000000000004.',
      asciiFlowchart: `  Regular Number: 64-bit IEEE-754 Float (53 mantissa bits)
     Exact up to 9,007,199,254,740,991 (~9 x 10^15)
     10^9 * 10^9 = 10^18 ---> loses precision in regular Number!
  BigInt (BigInt(x) / 100n) ---> Unlimited exact digits!`,
      pseudocode: [
        '1. USE BigInt(val) whenever products or sums exceed 9 x 10^15 (e.g. 10^18)',
        '2. NEVER mix Number and BigInt directly in + or * (convert both to BigInt)',
        '3. CHECK Number.isSafeInteger(x) when validating high-precision IDs/scores',
      ],
      banglaZeroToHero: {
        analogyTitle: '৫৩-বিটের প্রিসিশন ফাঁদ ও অসীম BigInt',
        explanation:
          'JavaScript-এ C বা Java-র মতো আলাদা int বা long টাইপ নেই—সাধারণ প্রতিটি Number আসলে ৬৪-বিট IEEE-754 দশমিক সংখ্যা! ফলে এখানে পূর্ণসংখ্যা কেবল Number.MAX_SAFE_INTEGER অর্থাৎ ২^৫৩ - ১ (প্রায় ৯ × ১০^১৫) পর্যন্তই নিখুঁত থাকে। এর ওপর গেলে যেমন 10^9 × 10^9 করলে শেষের অঙ্কগুলো নষ্ট হয়ে যায়, এমনকি MAX_SAFE_INTEGER + 1 === MAX_SAFE_INTEGER + 2 সত্য হয়ে যায়! এই বিপদ থেকে বাঁচতে বড় সংখ্যা অবশ্যই স্ট্রিং থেকে সরাসরি BigInt(str) বা n প্রত্যয় (যেমন 2n ** 100n) দিয়ে হিসাব করবে—কখনোই Number ও BigInt সরাসরি মিশিয়ে যোগ-গুণ করবে না (TypeError দেয়)। পাশাপাশি টাকার হিসাবে 0.1 + 0.2 বাগ এড়াতে পয়সায় পূর্ণসংখ্যায় হিসাব রাখা এবং typeof null === "object" অদ্ভুত বৈশিষ্ট্য সম্পর্কে সতর্ক থাকা জরুরি।',
        everydayExample:
          'বড় আর্থিক ট্রানজেকশন আইডি ১৬ ডিজিটের বেশি হলে সাধারণ Number রাখলে শেষের ডিজিট 0 হয়ে যায়!',
        keyTakeaways: [
          'Number.MAX_SAFE_INTEGER হলো ২^৫৩ - ১ (প্রায় ৯ × ১০^১৫)।',
          'Codeforces-এ উত্তর 10^18 বা modulo 10^9+7 হলেই BigInt ব্যবহার করো।',
          'typeof null === "object" হলো জাভাস্ক্রিপ্টের একটি ঐতিহাসিক বাগ; null চেক করতে === null লিখো।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Dynamic Types, MAX_SAFE_INTEGER & BigInt Basics',
        englishParagraphs: [
          'Inspecting Number.MAX_SAFE_INTEGER reveals the exact 53-bit integer limit. Adding 1 to MAX_SAFE_INTEGER works, but adding 2 rounds back to an even number!',
        ],
        banglaParagraphs: [
          'MAX_SAFE_INTEGER-এর পর +1 আর +2 উভয়েই সমান সংখ্যা হয়ে যায়! অথচ BigInt(MAX_SAFE_INTEGER) দিয়ে যত খুশি নিখুঁতভাবে গণনা করা যায়।',
        ],
        memoryDiagram: `Number: 9007199254740992 === 9007199254740993 (true BUG) | BigInt: exact`,
        code: `const maxSafe = Number.MAX_SAFE_INTEGER;
const brokenSame = (maxSafe + 1) === (maxSafe + 2);
const exactBig = BigInt(maxSafe) + 2n;
console.log(\`maxSafe=\${maxSafe} bugSame=\${brokenSame} exactBig=\${exactBig}\`);`,
        stdin: '',
        expectedOutput: 'maxSafe=9007199254740991 bugSame=true exactBig=9007199254740993',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const brokenSame = (maxSafe + 1) === (maxSafe + 2);',
            whatItMeans: 'Demonstrates 53-bit float rounding beyond MAX_SAFE_INTEGER.',
            whyItIsThere: 'Shows why 10^18 inputs fail with regular Numbers.',
            ifDeletedError: 'Cannot observe precision loss.',
          },
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const exactBig = BigInt(maxSafe) + 2n;',
            whatItMeans: 'Uses BigInt arbitrary precision arithmetic.',
            whyItIsThere: 'Preserves exact unit digit.',
            ifDeletedError: 'Would round down to ...992.',
          },
        ],
      },
      {
        id: 'js-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Multiplying Two 10^9 Numbers With BigInt(token)',
        englishParagraphs: [
          'Wrapping numeric stdin strings directly with BigInt(str) avoids ever passing through a lossy 53-bit float first.',
        ],
        banglaParagraphs: [
          'stdin-এর স্ট্রিংকে সরাসরি BigInt(str) করলে ১% প্রিসিশনও নষ্ট হয় না।',
        ],
        memoryDiagram: `BigInt("1000000000") * BigInt("1000000007") -> exact 19 digits`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [aStr, bStr] = raw.trim().split(/\\s+/);
const prod = BigInt(aStr) * BigInt(bStr);
console.log(prod.toString());`,
        stdin: '1000000000 1000000007',
        expectedOutput: '1000000007000000000',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const prod = BigInt(aStr) * BigInt(bStr);',
            whatItMeans: 'Multiplies arbitrary-precision BigInts.',
            whyItIsThere: 'Regular Number(1e9) * Number(1e9 + 7) corrupts last 3 digits!',
            ifDeletedError: 'Outputs wrong last digits on 10^18 product.',
          },
        ],
      },
      {
        id: 'js-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Currency Cents Integer Pattern (No 0.1 + 0.2 Bug)',
        englishParagraphs: [
          'Because 0.1 + 0.2 equals 0.30000000000000004 in IEEE-754 binary floats, fintech systems convert dollars/taka into integer cents/poisha before summing.',
        ],
        banglaParagraphs: [
          'টাকা বা ডলারের হিসাবে 0.1 + 0.2 করলে 0.30000000000000004 আসে! তাই সব বাস্তব প্রজেক্টে পয়সা বা সেন্টে পূর্ণসংখ্যায় হিসাব করে শেষে ১০০ দিয়ে ভাগ দেখানো হয়।',
        ],
        memoryDiagram: `10 cents + 20 cents = 30 cents -> 30 / 100 -> "0.30"`,
        code: `const floatSum = 0.1 + 0.2;
const cents = 10 + 20;
console.log(\`float=\${floatSum} exactFixed=\${(cents / 100).toFixed(2)}\`);`,
        stdin: '',
        expectedOutput: 'float=0.30000000000000004 exactFixed=0.30',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const cents = 10 + 20;',
            whatItMeans: 'Computes money in integer minor units.',
            whyItIsThere: 'Eliminates floating-point drift in financial totals.',
            ifDeletedError: '0.1 + 0.2 fails strict === 0.3 checks.',
          },
        ],
      },
      {
        id: 'js-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Safe 1..N Formula Beyond 10^8 Using BigInt',
        englishParagraphs: [
          'For n = 10^9, n * (n + 1) / 2 is 5 × 10^17, which exceeds Number.MAX_SAFE_INTEGER (9 × 10^15)! BigInt division truncates cleanly toward zero like C++ integers.',
        ],
        banglaParagraphs: [
          'n = 10^9 হলে n * (n + 1) / 2 হয় 5 × 10^17—যা JavaScript-এর সাধারণ Number-এর সীমা (9 × 10^15) ছাড়িয়ে যায়! তাই এখানে BigInt অপরিহার্য।',
        ],
        memoryDiagram: `n=1000000000n -> n*(n+1n)/2n = 500000000500000000n`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = BigInt(raw.trim());
const ans = (n * (n + 1n)) / 2n;
console.log(ans.toString());`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const ans = (n * (n + 1n)) / 2n;',
            whatItMeans: 'BigInt arithmetic with n-suffixed constants (1n, 2n).',
            whyItIsThere: 'Exact 18-digit output with zero precision corruption.',
            ifDeletedError: 'Throws TypeError if mixing BigInt with regular 1 or 2.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const n = BigInt(raw.trim());',
        whatItMeans: 'Parses string directly into arbitrary-precision BigInt.',
        whyItIsThere: 'Avoids 53-bit float truncation above 9e15.',
        ifDeletedError: 'Precision loss for large inputs.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '(n * (n + 1n)) / 2n',
        whatItMeans: 'Integer arithmetic using BigInt literals.',
        whyItIsThere: 'Matches exact math without IEEE-754 drift.',
        ifDeletedError: 'TypeError: Cannot mix BigInt and other types.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "1000000000"', memoryOrStack: 'n = 1000000000n', note: 'BigInt preserves all digits' },
      { step: 2, state: 'n + 1n', memoryOrStack: '1000000001n', note: 'n-suffix required on literals' },
      { step: 3, state: 'n * (n + 1n)', memoryOrStack: '1000000001000000000n', note: 'Would corrupt in Number!' },
      { step: 4, state: '/ 2n -> .toString()', memoryOrStack: '500000000500000000', note: 'Exact 18-digit output' },
    ],
    harryBugTraps: [
      {
        title: 'Mixing BigInt With Regular Number',
        brokenCode: 'const x = 10n + 5; // TypeError!',
        fixedCode: 'const x = 10n + 5n;',
        whyItBreaks: 'JavaScript forbids implicit mixing between BigInt and float Number to protect precision.',
      },
      {
        title: 'Using Math.max() or JSON.stringify() Directly on BigInt',
        brokenCode: 'JSON.stringify({ val: 10n }); // TypeError!',
        fixedCode: 'JSON.stringify({ val: (10n).toString() });',
        whyItBreaks: 'Math.* functions expect IEEE-754 Numbers, and JSON has no BigInt primitive.',
      },
      {
        title: 'Parsing Big Strings Through Number() First',
        brokenCode: 'const x = BigInt(Number("9007199254740993")); // already corrupted to ...992!',
        fixedCode: 'const x = BigInt("9007199254740993");',
        whyItBreaks: 'Converting to Number first throws away bits beyond 53 before BigInt sees them.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-3-q1',
        difficulty: 'Easy',
        title: 'Exact 10^18 Multiplication',
        prompt: 'Read two integers up to 10^9 and print their exact product using BigInt.',
        banglaHint: 'BigInt(a) * BigInt(b) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/);\nconsole.log((BigInt(a) * BigInt(b)).toString());`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'js-ch-3-q2',
        difficulty: 'Easy',
        title: 'Safe Integer Check',
        prompt: 'Read a token and check Number.isSafeInteger(Number(tok)).',
        banglaHint: 'Number.isSafeInteger() ফাংশন ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconsole.log(Number.isSafeInteger(Number(raw.trim())));`,
        sampleStdin: '42',
        expectedOutput: 'true',
      },
      {
        id: 'js-ch-3-q3',
        difficulty: 'Medium',
        title: '2^100 With BigInt Exponentiation',
        prompt: 'Compute 2n ** 100n and log its exact string.',
        banglaHint: 'BigInt-এ ** অপারেটর সরাসরি কাজ করে।',
        starterCode: `console.log((2n ** 100n).toString());`,
        sampleStdin: '',
        expectedOutput: '1267650600228229401496703205376',
      },
      {
        id: 'js-ch-3-q4',
        difficulty: 'Medium',
        title: 'Exact 1..N Sum With BigInt',
        prompt: 'Read n up to 10^9 and output exact n*(n+1)/2.',
        banglaHint: '(n * (n + 1n)) / 2n সূত্র চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = BigInt(raw.trim());\nconsole.log(((n * (n + 1n)) / 2n).toString());`,
        sampleStdin: '1000000',
        expectedOutput: '500000500000',
      },
    ],
    miniBuild: {
      title: 'JS Mini Build: Arbitrary-Precision BigInt Multiplier',
      description: 'Read two huge integers directly as BigInts from stdin and emit their exact product.',
      banglaGoal: '৫৩-বিট Number-এর সীমা ছাড়িয়ে BigInt দিয়ে নির্ভুল গুণফল বের করা।',
      combinesChapters: 'Ch 1–3',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
console.log((BigInt(a) * BigInt(b)).toString());`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
console.log((BigInt(a) * BigInt(b)).toString());`,
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'js-c3-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'js-c3-t2', input: '250000 40000', expectedOutput: '10000000000', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'JavaScript Chapter 4 (ES2025): Operators, === vs ==, ?? & Negative Modulo',
    banglaTitle: 'JavaScript অধ্যায় ৪ (ES2025): অপারেটর, === বনাম ==, ?? এবং মডুলো',
    subtitle: 'Strict equality ===, nullish coalescing (?? vs ||), integer Math.trunc / Math.ceil, and cyclic modulo.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript’s loose equality (==) silently coerces mismatched types in surprising ways ("" == 0 and "0" == false are both true!), so modern code enforces strict === and !== everywhere. Equally important, the || default operator treats valid zeros and empty strings as missing (0 || 50 -> 50), whereas nullish coalescing (??) falls back strictly on null or undefined.\n\nWatch out for division and modulo too: a / b always produces a float (5 / 2 === 2.5, so wrap array indices in Math.floor), negative dividends keep minus signs under % (fix with ((a % m) + m) % m), and 10^16+ integer ceiling divisions require BigInt (n + a - 1n) / a.',
      asciiFlowchart: `  "5" == 5   ---> true  (DANGEROUS coercion!)
  "5" === 5  ---> false (STRICT: type + value must match!)
  0 || 42    ---> 42    (treats 0 as falsy!)
  0 ?? 42    ---> 0     (Nullish ??: ONLY triggers on null or undefined!)`,
      pseudocode: [
        '1. ALWAYS use === and !== instead of == and !=',
        '2. USE ?? (nullish coalescing) when 0 or "" are valid inputs',
        '3. COMPUTE positive modulo via ((a % m) + m) % m',
      ],
      banglaZeroToHero: {
        analogyTitle: '=== কঠোর তালা আর ?? স্মার্ট ডিফল্ট',
        explanation:
          'JavaScript-এ == অপারেটর ভয়ংকর টাইপ কোয়েরশন করে ("0" == false বা "" == 0 সত্য দেখায়!), তাই সব সময় কঠোর === এবং !== ব্যবহার করবে। আবার ডিফল্ট মান দিতে || ব্যবহার করলে বৈধ 0 স্কোরকেও ফাঁকা ধরে বদলে দেয়—এর বদলে নালিশ কোয়ালেসিং (??) ব্যবহার করলে কেবল null বা undefined হলেই ডিফল্ট বসে। পাশাপাশি মনে রাখবে JS-এ 5 / 2 করলে 2.5 (ফ্লোট) আসে, তাই অ্যারের ইনডেক্স বা বাইনারি সার্চে অবশ্যই Math.floor() ব্যবহার করবে, নইলে arr[2.5] undefined ফেরত দেবে! ঋণাত্মক ভাগশেষ ধনাত্মক করতে ((a % m) + m) % m, নেস্টেড প্রপার্টিতে নিরাপদে পৌঁছাতে ?. (Optional Chaining) এবং বড় সিলিং ভাগে BigInt ব্যবহার করাই সঠিক নিয়ম।',
        everydayExample:
          'পরীক্ষায় কেউ ০ পেলে || বলবে "অনুপস্থিত", কিন্তু ?? বলবে "০ একটি বৈধ নম্বর"!',
        keyTakeaways: [
          'সব সময় === এবং !== ব্যবহার করো।',
          'ডিফল্ট মান বসাতে ||-এর বদলে ?? ব্যবহার করো।',
          'ইন্টিজার ভাগফল পেতে Math.trunc(a / b) এবং সিলিংয়ের জন্য Math.floor((a + b - 1) / b) বা BigInt ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strict ===, Nullish ?? & Exponentiation **',
        englishParagraphs: [
          'Strict === checks both type and value without coercion. Nullish coalescing ?? preserves valid falsy values like 0 or false.',
        ],
        banglaParagraphs: [
          '=== টাইপ ও মান দুটোই মেলায়, আর ?? শূন্য (0) মানকে নিরাপদ রাখে।',
        ],
        memoryDiagram: `0 ?? 10 -> 0 | null ?? 10 -> 10 | "5" === 5 -> false`,
        code: `const score = 0;
const safeScore = score ?? 100;
const strictCheck = ("5" === 5);
console.log(\`score=\${safeScore} strict=\${strictCheck} pow=\${2 ** 5}\`);`,
        stdin: '',
        expectedOutput: 'score=0 strict=false pow=32',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const safeScore = score ?? 100;',
            whatItMeans: 'Falls back to 100 only if score is null or undefined.',
            whyItIsThere: 'Preserves 0 points instead of replacing with 100.',
            ifDeletedError: 'Using || mistakenly gives score=100!',
          },
        ],
      },
      {
        id: 'js-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Positive Mathematical Modulo & Truncating Division',
        englishParagraphs: [
          'Like C++/Java, JavaScript % keeps the dividend sign (-3 % 5 === -3). Wrap with ((a % m) + m) % m to keep cyclic indices non-negative.',
        ],
        banglaParagraphs: [
          'ঋণাত্মক সংখ্যার ভাগশেষ ধনাত্মক রাখতে ((a % m) + m) % m ফর্মুলাটি সবচেয়ে সহজ।',
        ],
        memoryDiagram: `a=-3, m=5 -> raw=-3 | (( -3 % 5 ) + 5) % 5 = 2`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, m] = raw.trim().split(/\\s+/).map(Number);
const posMod = ((a % m) + m) % m;
console.log(\`raw=\${a % m} posMod=\${posMod}\`);`,
        stdin: '-3 5',
        expectedOutput: 'raw=-3 posMod=2',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const posMod = ((a % m) + m) % m;',
            whatItMeans: 'Shifts negative remainder into [0, m - 1].',
            whyItIsThere: 'Prevents arr[-3] === undefined bugs.',
            ifDeletedError: 'Negative array lookups fail silently.',
          },
        ],
      },
      {
        id: 'js-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Optional Chaining (?.) + Nullish Default',
        englishParagraphs: [
          'Combining ?. and ?? reads deeply nested API config fields safely without crashing if an intermediate property is undefined.',
        ],
        banglaParagraphs: [
          'API থেকে আসা অবজেক্টের ভেতরের মান নিরাপদে পড়তে ?. (Optional Chaining) ও ?? জুটি দুর্দান্ত কাজ করে।',
        ],
        memoryDiagram: `user?.profile?.theme ?? "obsidian" -> short-circuits if null`,
        code: `const user = { profile: null };
const theme = user?.profile?.theme ?? "obsidian";
const ok = user?.profile !== undefined && theme === "obsidian";
console.log(\`theme=\${theme} ok=\${ok}\`);`,
        stdin: '',
        expectedOutput: 'theme=obsidian ok=true',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const theme = user?.profile?.theme ?? "obsidian";',
            whatItMeans: 'Safely walks nullable object chain with fallback.',
            whyItIsThere: 'Avoids TypeError: Cannot read properties of null.',
            ifDeletedError: 'Runtime TypeError crash.',
          },
        ],
      },
      {
        id: 'js-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Exact 64-Bit Integer Ceil Division (Theatre Square Trap)',
        englishParagraphs: [
          'For huge inputs near 10^9, multiplying BigInt ceils (n + a - 1n) / a ensures zero floating-point precision loss across large grids.',
        ],
        banglaParagraphs: [
          '১০০ কোটি সাইজের গ্রিডের ক্ষেত্রে BigInt দিয়ে (n + a - 1n) / a চালালে দশমিক ছাড়াই একদম সঠিক টাইলস সংখ্যা পাওয়া যায়।',
        ],
        memoryDiagram: `n=6n, m=6n, a=4n -> (9n/4n) * (9n/4n) = 2n * 2n = 4n`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [n, m, a] = raw.trim().split(/\\s+/).map(BigInt);
const tx = (n + a - 1n) / a;
const ty = (m + a - 1n) / a;
console.log((tx * ty).toString());`,
        stdin: '6 6 4',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const tx = (n + a - 1n) / a;',
            whatItMeans: 'Exact BigInt ceiling division.',
            whyItIsThere: 'Immune to IEEE-754 float errors up to infinity.',
            ifDeletedError: 'Precision errors on 10^16+ products.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '((a % m) + m) % m',
        whatItMeans: 'Positive modulo formula.',
        whyItIsThere: 'JS % preserves negative signs.',
        ifDeletedError: 'Negative array/clock wraparound bug.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'val ?? fallback',
        whatItMeans: 'Nullish coalescing operator.',
        whyItIsThere: 'Does not overwrite 0 or "" like || does.',
        ifDeletedError: '0 mistakenly replaced with fallback.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n=6n, m=6n, a=4n', memoryOrStack: 'BigInt inputs', note: 'Parsed cleanly' },
      { step: 2, state: 'tx = (6n + 3n) / 4n', memoryOrStack: 'tx = 2n', note: 'Truncates fractional .25' },
      { step: 3, state: 'ty = (6n + 3n) / 4n', memoryOrStack: 'ty = 2n', note: 'Truncates fractional .25' },
      { step: 4, state: '(tx * ty).toString()', memoryOrStack: '"4"', note: 'Exact integer count' },
    ],
    harryBugTraps: [
      {
        title: 'Using || When 0 Is a Valid Value',
        brokenCode: 'const limit = userInput || 10; // if userInput=0, limit becomes 10!',
        fixedCode: 'const limit = userInput ?? 10;',
        whyItBreaks: '|| treats 0, "", and false as missing; ?? checks strictly null/undefined.',
      },
      {
        title: 'Forgetting / Is Float Division in JS',
        brokenCode: 'const mid = (0 + 5) / 2; // 2.5 (arr[2.5] === undefined!)',
        fixedCode: 'const mid = Math.floor((0 + 5) / 2); // 2',
        whyItBreaks: 'Indexing an array with a fractional index like 2.5 returns undefined in JS!',
      },
      {
        title: 'Loose == Type Coercion Surprise',
        brokenCode: 'console.log("" == 0); // true!',
        fixedCode: 'console.log("" === 0); // false',
        whyItBreaks: '== converts strings and booleans unpredictably before comparing.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-4-q1',
        difficulty: 'Easy',
        title: 'Positive Modulo Helper',
        prompt: 'Read a and m from stdin and output ((a % m) + m) % m.',
        banglaHint: '((a % m) + m) % m সূত্র ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, m] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(((a % m) + m) % m);`,
        sampleStdin: '-17 5',
        expectedOutput: '3',
      },
      {
        id: 'js-ch-4-q2',
        difficulty: 'Easy',
        title: 'Nullish Coalescing Drill',
        prompt: 'Given const x = 0, use ?? with fallback 50 and log x.',
        banglaHint: 'x ?? 50 লিখলে 0 বজায় থাকবে।',
        starterCode: `const x = 0;\nconsole.log(x ?? 50);`,
        sampleStdin: '',
        expectedOutput: '0',
      },
      {
        id: 'js-ch-4-q3',
        difficulty: 'Medium',
        title: 'Integer Midpoint Truncation',
        prompt: 'Read low and high integers and print Math.floor((low + high) / 2).',
        banglaHint: 'Math.floor() বা bitwise >> 1 ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [l, r] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(Math.floor((l + r) / 2));`,
        sampleStdin: '2 7',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-4-q4',
        difficulty: 'Medium',
        title: 'Leap Year Check',
        prompt: 'Read year y and log YES if leap year else NO.',
        banglaHint: '(y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst y = Number(raw.trim());\nconsole.log((y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0)) ? "YES" : "NO");`,
        sampleStdin: '2024',
        expectedOutput: 'YES',
      },
    ],
    miniBuild: {
      title: 'JS Mini Build: Cyclic Clock & Integer Ceil Calculator',
      description: 'Read a and b from stdin and emit positive modulo plus integer ceiling.',
      banglaGoal: 'সঠিক পজিটিভ মডুলো এবং ইন্টিজার সিলিং একসাথে নির্ণয় করা।',
      combinesChapters: 'Ch 1–4',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/).map(Number);
const mod = ((a % b) + b) % b;
const ceil = Math.floor((Math.abs(a) + b - 1) / b);
console.log(\`mod=\${mod} ceil=\${ceil}\`);`,
      sampleStdin: '-7 4',
      expectedOutput: 'mod=1 ceil=2',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/).map(Number);
const mod = ((a % b) + b) % b;
const ceil = Math.floor((Math.abs(a) + b - 1) / b);
console.log(\`mod=\${mod} ceil=\${ceil}\`);`,
    sampleStdin: '-7 4',
    expectedSampleOutput: 'mod=1 ceil=2',
    testCases: [
      { id: 'js-c4-t1', input: '-7 4', expectedOutput: 'mod=1 ceil=2' },
      { id: 'js-c4-t2', input: '10 3', expectedOutput: 'mod=1 ceil=4', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'JavaScript Chapter 5 (ES2025): Bitwise Ops, Signed 32-Bit Limit & BigInt Masks',
    banglaTitle: 'JavaScript অধ্যায় ৫ (ES2025): বিটওয়াইজ অপারেটর, ৩২-বিট সীমা ও BigInt মাস্ক',
    subtitle: 'Why JS & | ^ << >> coerce numbers to 32-bit signed integers, >>> unsigned shift, and 64-bit BigInt masks.',
    isMilestoneMerger: true,
    zeroIntuition: {
      plainEnglishStory:
        'One of JavaScript’s biggest surprises awaits any developer writing bitmasks: even though regular JS Numbers hold 53 integer bits, ALL standard bitwise operators (&, |, ^, ~, <<, >>) coerce operands down to signed 32-bit integers before executing! Thus (1 << 31) yields -2147483648 and (1 << 40) wraps modulo 32 straight down to 256.\n\nUse (x >>> 0) to interpret 32-bit patterns as unsigned integers, and switch immediately to BigInt bitmasks (1n << 40n, 0n, ^= BigInt(x)) whenever bit indices reach 31+ or values exceed 2^31 - 1. Because JS lacks a built-in popcount(), Brian Kernighan’s x &= (x - 1) loop counts set bits cleanly.',
      asciiFlowchart: `  (1 << 31)     ---> -2147483648 (32-bit signed wrap!)
  (1 << 31)>>>0 --->  2147483648 (unsigned 32-bit!)
  (1n << 40n)   ---> 1099511627776n (Unlimited BigInt bitmask!)`,
      pseudocode: [
        '1. REMEMBER regular bitwise ops are strictly 32-bit signed in JS',
        '2. USE (x >>> 0) to view unsigned 32-bit results',
        '3. USE BigInt (1n << k) when bit index k >= 31',
        '4. APPLY XOR cancellation to isolate unique values in O(n) / O(1)',
      ],
      banglaZeroToHero: {
        analogyTitle: '৩২-বিটের গোপন গিয়ারবক্স ও BigInt বিটমাস্ক',
        explanation:
          'সিনিয়র JavaScript ডেভেলপাররাও এই ফাঁদে পা দেন: সাধারণ Number ৫৩-বিট পর্যন্ত সঠিক হলেও যখনই তুমি &, |, ^, << বা >> বিটওয়াইজ অপারেটর চালাবে, V8 ইঞ্জিন সেটিকে ৩২-বিট সাইনড ইন্টিজারে কেটে ছোট করে ফেলে! তাই (1 << 31) করলে নেগেটিভ -২১৪৭৪৮৩৬৪৮ আসে, আর (1 << 40) করলে বিট ঘুরে মাত্র ২৫৬ হয়ে যায়! তাই ৩১-তম বিট বা ২^৩১-এর বড় যেকোনো বিটমাস্ক বা XOR হিসাবের জন্য অবশ্যই BigInt (যেমন 1n << 40n) ব্যবহার করবে। ৩২-বিটের মধ্যে ধনাত্মক আনসাইনড রূপ দেখতে >>> 0, বিল্ট-ইন পপকাউন্ট না থাকায় ১-বিট গুনতে কার্নিঘান লুপ n &= (n - 1), এবং x & 1 === 0 এর বদলে ব্র্যাকেটে (x & 1) === 0 লেখা অপরিহার্য।',
        everydayExample:
          'হাইওয়েতে ৫০-সিটের বাস চললেও ছোট টোল গেটে ঢোকার সময় ৩২-বিট গেট দিয়ে মাপা হয়—বড় মাস্কের জন্য BigInt আলাদা হাইওয়ে।',
        keyTakeaways: [
          'JS-এ ১ << ৩১ মানে নেগেটিভ, তাই ৩১+ বিটের জন্য 1n << BigInt(k) ব্যবহার করো।',
          'x >>> 0 দিয়ে যেকোনো ৩২-বিট মানকে পজিটিভ আনসাইনড রূপে দেখা যায়।',
          'x > 0 && (x & (x - 1)) === 0 সূত্র এখানেও O(1) পাওয়ার-অফ-টু চেক করে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '32-Bit Bitwise Operators & Unsigned >>> 0',
        englishParagraphs: [
          'Notice how (1 << 31) yields negative -2147483648 in JS, whereas ((1 << 31) >>> 0) preserves unsigned 2147483648.',
        ],
        banglaParagraphs: [
          '১ << ৩১ করলে বিট ৩১ সাইন-বিট হয়ে যাওয়ায় মাইনাস আসে, কিন্তু >>> 0 দিলে আসল পজিটিভ মান দেখা যায়।',
        ],
        memoryDiagram: `1<<31 = -2147483648 | (1<<31)>>>0 = 2147483648`,
        code: `const a = 12, b = 10;
const u31 = (1 << 31) >>> 0;
console.log(\`AND=\${a & b} OR=\${a | b} XOR=\${a ^ b} u31=\${u31}\`);`,
        stdin: '',
        expectedOutput: 'AND=8 OR=14 XOR=6 u31=2147483648',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const u31 = (1 << 31) >>> 0;',
            whatItMeans: 'Shifts 0 bits with unsigned right shift to force uint32.',
            whyItIsThere: 'Prevents negative sign interpretation of bit 31.',
            ifDeletedError: '1 << 31 prints -2147483648.',
          },
        ],
      },
      {
        id: 'js-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Brian Kernighan Bit Counter & Power-of-Two Check',
        englishParagraphs: [
          'Since JS lacks a built-in popcount function, looping x &= (x - 1) counts only the 1-bits in O(popcount) steps.',
        ],
        banglaParagraphs: [
          'JS-এ বিল্ট-ইন popcount না থাকায় n &= (n - 1) চালিয়ে কেবল ১-বিটগুলো গোনা যায়—যা খুবই দ্রুত।',
        ],
        memoryDiagram: `13 (1101) -> 12 (1100) -> 8 (1000) -> 0 (3 steps = 3 bits!)`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [x, k] = raw.trim().split(/\\s+/).map(Number);
const pow2 = x > 0 && (x & (x - 1)) === 0;
let cnt = 0, tmp = x;
while (tmp > 0) { tmp &= (tmp - 1); cnt++; }
console.log(\`pow2=\${pow2} bit\${k}=\${(x >> k) & 1} pop=\${cnt}\`);`,
        stdin: '16 4',
        expectedOutput: 'pow2=true bit4=1 pop=1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'while (tmp > 0) { tmp &= (tmp - 1); cnt++; }',
            whatItMeans: 'Strips lowest set bit each iteration.',
            whyItIsThere: 'Fastest portable bit counter in JavaScript.',
            ifDeletedError: 'Would have to loop all 32 bit positions.',
          },
        ],
      },
      {
        id: 'js-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Permission Flags & BigInt 64-Bit Feature Flags',
        englishParagraphs: [
          'Role-based access permissions fit inside a compact bitmask. Using BigInt masks supports 50+ permission flags cleanly without colliding with 32-bit wrap limits.',
        ],
        banglaParagraphs: [
          'অ্যাপের ইউজার পারমিশন (Read, Write, Admin) বিটমাস্ক দিয়ে এক সংখ্যায় রাখা যায়; আর ৩২-টির বেশি ফ্ল্যাগ হলে BigInt (1n << k) ব্যবহার করা হয়।',
        ],
        memoryDiagram: `READ=1n | WRITE=2n | EXEC=4n -> toggled mask=7n`,
        code: `const READ = 1n << 0n;
const WRITE = 1n << 1n;
const CLOUD = 1n << 40n;
const mask = READ | WRITE | CLOUD;
console.log(\`hasWrite=\${(mask & WRITE) !== 0n} hasCloud=\${(mask & CLOUD) !== 0n}\`);`,
        stdin: '',
        expectedOutput: 'hasWrite=true hasCloud=true',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const CLOUD = 1n << 40n;',
            whatItMeans: 'Sets bit 40 inside an arbitrary-precision BigInt mask.',
            whyItIsThere: '1 << 40 in Number wraps around 32 bits!',
            ifDeletedError: 'Bit 40 collides with bit 8.',
          },
        ],
      },
      {
        id: 'js-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 1: BigInt XOR Single-Number & 1n << k',
        englishParagraphs: [
          'Using BigInt XOR (`^=`) works smoothly even for 10^18 integers without losing low bits! Combining Chapters 1–5 gives us a fast O(N) time, O(1) memory analyzer.',
        ],
        banglaParagraphs: [
          'BigInt-এর ওপর XOR চালালে ১৮ ডিজিটের বড় সংখ্যারও কোনো বিট নষ্ট হয় না।',
        ],
        memoryDiagram: `xorAll = 12n ^ 5n ^ 12n ^ 9n ^ 5n = 9n`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/);
const n = Number(t[0]);
let xorAll = 0n;
for (let i = 1; i <= n; i++) xorAll ^= BigInt(t[i]);
console.log(\`unique=\${xorAll} bit40=\${1n << 40n}\`);`,
        stdin: '5\n12 5 12 9 5',
        expectedOutput: 'unique=9 bit40=1099511627776',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'for (let i = 1; i <= n; i++) xorAll ^= BigInt(t[i]);',
            whatItMeans: 'Accumulates XOR across arbitrarily huge 64-bit numbers.',
            whyItIsThere: 'Regular JS ^ truncates integers above 2^31 - 1.',
            ifDeletedError: 'Corrupts numbers > 2.14e9.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: '1n << 40n',
        whatItMeans: 'Shifts BigInt beyond 32-bit JS limit.',
        whyItIsThere: '1 << 40 evaluates to 256 in regular JS Number!',
        ifDeletedError: 'Silent bitmask collision mod 32.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'xorAll ^= BigInt(t[i]);',
        whatItMeans: '64-bit safe XOR accumulation.',
        whyItIsThere: 'Regular ^ strips upper bits beyond 32.',
        ifDeletedError: 'Fails on inputs > 2^31 - 1.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'xorAll = 0n', memoryOrStack: '0n', note: 'BigInt XOR identity' },
      { step: 2, state: '12n ^ 5n ^ 12n', memoryOrStack: '5n', note: '12n cancels out' },
      { step: 3, state: '5n ^ 9n ^ 5n', memoryOrStack: '9n', note: '5n cancels out' },
      { step: 4, state: '1n << 40n', memoryOrStack: '1099511627776n', note: 'Exact 2^40' },
    ],
    harryBugTraps: [
      {
        title: 'Using (1 << k) for k >= 31 in Regular Number',
        brokenCode: 'console.log(1 << 40); // prints 256!',
        fixedCode: 'console.log((1n << 40n).toString());',
        whyItBreaks: 'JS truncates bitwise shift operands to 32 bits and masks shift count mod 32.',
      },
      {
        title: 'Operator Precedence: & Lower Than ===',
        brokenCode: 'if (x & 1 === 0) // parses as x & (1 === 0) = 0!',
        fixedCode: 'if ((x & 1) === 0)',
        whyItBreaks: '=== runs before &, so wrap bitwise masks in parentheses.',
      },
      {
        title: 'Using Regular ^ on 10^12 Values',
        brokenCode: 'console.log(5000000000 ^ 5000000000); // works only by coincidence, loses high bits!',
        fixedCode: 'console.log((5000000001n ^ 1n).toString());',
        whyItBreaks: '^ throws away bits 32..52 silently.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-5-q1',
        difficulty: 'Easy',
        title: 'Bitwise Parity Check',
        prompt: 'Read n and print EVEN if (n & 1) === 0 else ODD.',
        banglaHint: '(n & 1) অবশ্যই ব্র্যাকেটে রাখবে।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconsole.log((n & 1) === 0 ? "EVEN" : "ODD");`,
        sampleStdin: '17',
        expectedOutput: 'ODD',
      },
      {
        id: 'js-ch-5-q2',
        difficulty: 'Easy',
        title: 'Power of Two Check',
        prompt: 'Read n and output YES if power of two else NO.',
        banglaHint: 'n > 0 && (n & (n - 1)) === 0',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconsole.log((n > 0 && (n & (n - 1)) === 0) ? "YES" : "NO");`,
        sampleStdin: '64',
        expectedOutput: 'YES',
      },
      {
        id: 'js-ch-5-q3',
        difficulty: 'Medium',
        title: '64-Bit Safe Shift 1n << k',
        prompt: 'Read exponent k and print 2^k using BigInt shift.',
        banglaHint: '(1n << BigInt(k)).toString() প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst k = BigInt(raw.trim());\nconsole.log((1n << k).toString());`,
        sampleStdin: '40',
        expectedOutput: '1099511627776',
      },
      {
        id: 'js-ch-5-q4',
        difficulty: 'Hard',
        title: 'Find Unique Number via XOR',
        prompt: 'Read n and n integers where every element appears twice except one; print the unique integer.',
        banglaHint: 'BigInt XOR চালিয়ে একক সংখ্যা বের করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/);\nconst n = Number(t[0]);\nlet ans = 0n;\nfor (let i = 1; i <= n; i++) ans ^= BigInt(t[i]);\nconsole.log(ans.toString());`,
        sampleStdin: '5\n7 3 9 3 7',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (JS Ch 1–5): Fast Bitwise Odd-One-Out Engine',
      description: 'Combine ES2025 I/O cursor, BigInt precision, strict equality, and XOR cancellation.',
      banglaGoal: 'অধ্যায় ১–৫ মিলিয়ে সম্পূর্ণ JS বিটওয়াইজ বিশ্লেষক প্রোগ্রাম।',
      combinesChapters: 'Ch 1–5',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
const n = Number(tokens[0]);
let unique = 0n;
for (let i = 1; i <= n; i++) unique ^= BigInt(tokens[i]);
console.log(\`unique=\${unique}\`);`,
      sampleStdin: '5\n12 5 12 9 5',
      expectedOutput: 'unique=9',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
const n = Number(tokens[0]);
let unique = 0n;
for (let i = 1; i <= n; i++) unique ^= BigInt(tokens[i]);
console.log(\`unique=\${unique}\`);`,
    sampleStdin: '5\n12 5 12 9 5',
    expectedSampleOutput: 'unique=9',
    testCases: [
      { id: 'js-c5-t1', input: '5\n12 5 12 9 5', expectedOutput: 'unique=9' },
      { id: 'js-c5-t2', input: '3\n7 10 10', expectedOutput: 'unique=7', isHidden: true },
    ],
  },
  ...LESSONS_JS_P2,
  ...LESSONS_JS_P3,
  ...LESSONS_JS_P4,
  ...LESSONS_JS_P5,
};
