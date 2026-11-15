import type { AtomicLessonOverride } from './atomicLessonTypes';
import { LESSONS_TS_P2 } from './lessons_ts_p2';
import { LESSONS_TS_P3 } from './lessons_ts_p3';
import { LESSONS_TS_P4 } from './lessons_ts_p4';
import { LESSONS_TS_P5 } from './lessons_ts_p5';

export const LESSONS_TS: Record<number, AtomicLessonOverride> = {
  1: {
    chapterNumber: 1,
    title: 'TypeScript Chapter 1 (TS 5.x): Static Type Erasure & First Typed Program',
    banglaTitle: 'TypeScript অধ্যায় ১ (TS 5.x): স্ট্যাটিক টাইপ চেকিং ও প্রথম প্রোগ্রাম',
    subtitle: 'How tsc validates type contracts before running JS, zero runtime cost, and typed stdin parsing.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript is JavaScript reinforced with an architectural compile-time type checker! Before a single line ever runs in Node.js or Chrome V8, tsc inspects every variable, function argument, and interface contract to catch string-plus-number bugs, missing object keys, and potential undefined errors right inside your editor.\n\nOnce type validation passes, tsc performs complete type erasure—stripping `: string`, `: number`, and `interface` blocks cleanly away so the emitted JavaScript executes at full native speed with zero runtime overhead. Annotating stdin values strictly right after parsing ensures arithmetic stays rock-solid.',
      asciiFlowchart: `  [ main.ts ] --(tsc static type checker)--> [ Catches typos & null bugs! ]
        |
        v (Type Erasure: ": string", ": number" stripped!)
  [ main.js ] ---> [ V8 Engine / Node / Browser ] ---> ( stdout )`,
      pseudocode: [
        '1. ANNOTATE variables cleanly (const name: string, const score: number)',
        '2. COMPILE/VALIDATE contracts at edit/build time with tsc',
        '3. ERASE types cleanly into fast JavaScript for execution',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্লাইট ওড়ার আগে নিরাপত্তা চেকলিস্ট',
        explanation:
          'সাধারণ JavaScript-এ ভুল টাইপের ডেটা দিলে বা অবজেক্টের কোনো প্রোপার্টির নাম বানান ভুল করলে প্রোগ্রাম রান করার সময় ইউজারের সামনে গিয়ে ক্র্যাশ করে। কিন্তু TypeScript বিমানের ফ্লাইট ওড়ার আগের চেকলিস্টের মতো—কোড চালানোর আগেই tsc কম্পাইলার পুরো প্রোগ্রামের প্রতিটি টাইপ মিলিয়ে দেখে এবং কোড এডিটরেই লাল দাগ দিয়ে ভুল ধরিয়ে দেয়! সবচেয়ে দারুণ ব্যাপার হলো, চেকিং শেষ হয়ে গেলে tsc সব `: string`, `: number`, বা `interface` চিহ্ন মুছে সাধারণ দ্রুতগতির JavaScript তৈরি করে, ফলে রানটাইমে স্পিডের কোনো ক্ষতিই হয় না। তাই শুরু থেকেই `any` এড়িয়ে স্পষ্ট টাইপ ও `import * as fs` দিয়ে টাইপ-সেফ ইনপুট নেওয়ার অভ্যাস গড়ে তুলতে হবে।',
        everydayExample:
          'বাক্সের গায়ে "শুধুমাত্র কাঁচের জিনিস" লিখে রাখলে লোডার কখনোই সেখানে পাথর ঢোকাবে না।',
        keyTakeaways: [
          ': string, : number, : boolean দিয়ে টাইপ নিশ্চিত করা যায়।',
          'রানটাইমে TypeScript-এর কোনো অতিরিক্ত স্পিড খরচ (overhead) নেই।',
          'import * as fs from "fs"; দিয়ে টাইপ-সেফ stdin পড়া যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-1-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Explicit Type Annotations & Template Output',
        englishParagraphs: [
          'Adding : string, : number, or : boolean prevents accidentally passing text into numeric math. Even when omitted, TS infers types automatically.',
        ],
        banglaParagraphs: [
          'ভ্যারিয়েবলের নামের পর কোলন (:) দিয়ে তার টাইপ বলে দেওয়া হয়, যাতে ভুলে ভুল ডেটা ঢুকে না পড়ে।',
        ],
        memoryDiagram: `tsc Check: lang="TypeScript 5.x" (string) | ver=5 (number) -> Emit clean JS`,
        code: `const lang: string = "TypeScript 5.x";
const active: boolean = true;
console.log(\`Hello from \${lang} | ready=\${active}\`);`,
        stdin: '',
        expectedOutput: 'Hello from TypeScript 5.x | ready=true',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'const lang: string = "TypeScript 5.x";',
            whatItMeans: 'Binds string-typed constant enforced by tsc.',
            whyItIsThere: 'Prevents assigning a number or null to lang later.',
            ifDeletedError: 'Compile error: cannot find name lang.',
          },
        ],
      },
      {
        id: 'ts-ch-1-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed stdin Parsing With import * as fs',
        englishParagraphs: [
          'Reading stdin in TypeScript parses tokens into explicit string and number bindings before arithmetic so string + number mistakes are caught statically.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে পাওয়া স্ট্রিংকে Number() দিয়ে : number-এ রূপান্তর করে নিলে পরে আর স্ট্রিং যোগ হওয়ার ভুল থাকে না।',
        ],
        memoryDiagram: `fs.readFileSync -> [name: string, scoreStr: string] -> score: number`,
        code: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8').trim();
const [name, scoreStr] = raw.split(/\\s+/);
if (name && scoreStr) {
  const score: number = Number(scoreStr);
  console.log(\`Coder \${name} scored \${score * 2}\`);
}`,
        stdin: 'Argon 21',
        expectedOutput: 'Coder Argon scored 42',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: "const raw: string = fs.readFileSync(0, 'utf8').trim();",
            whatItMeans: 'Reads stdin cleanly as a trimmed UTF-8 string.',
            whyItIsThere: 'Guarantees string type for .split().',
            ifDeletedError: 'Cannot read input tokens.',
          },
        ],
      },
      {
        id: 'ts-ch-1-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Structured Object Interfaces & Compile-Time Contracts',
        englishParagraphs: [
          'Defining interface BootReport guarantees every required field is present when emitting API payloads or logs.',
        ],
        banglaParagraphs: [
          'interface ব্যবহার করে অবজেক্টের একটি নির্দিষ্ট ছাঁচ বানানো যায়—কোনো ফিল্ড বাদ পড়লে tsc সাথে সাথে ধরিয়ে দেয়।',
        ],
        memoryDiagram: `interface BootReport -> erased at runtime -> pure JSON payload`,
        code: `interface BootReport {
  engine: string;
  strict: boolean;
}
const report: BootReport = { engine: "tsc 5", strict: true };
console.log(\`Engine=\${report.engine} strict=\${report.strict}\`);`,
        stdin: '',
        expectedOutput: 'Engine=tsc 5 strict=true',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'interface BootReport {',
            whatItMeans: 'Compile-time object shape contract.',
            whyItIsThere: 'Catches missing properties or misspelled keys at edit time.',
            ifDeletedError: 'No structural contract verification.',
          },
        ],
      },
      {
        id: 'ts-ch-1-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Multi-Line Typed Pair Adder (EOF Safe)',
        englishParagraphs: [
          'Splitting with .filter(Boolean) ensures empty trailing lines never slip into typed calculations as NaN.',
        ],
        banglaParagraphs: [
          '.filter(Boolean) ব্যবহার করে বাড়তি ফাঁকা লাইন ছেঁকে ফেলে প্রতিটি লাইনের সংখ্যা যোগ করা হয়েছে।',
        ],
        memoryDiagram: `lines: string[] -> [a: number, b: number] -> stdout`,
        code: `import * as fs from 'fs';

const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/).filter(Boolean);
for (const line of lines) {
  const [a, b] = line.trim().split(/\\s+/).map(Number);
  console.log(a + b);
}`,
        stdin: '3 4\n10 20',
        expectedOutput: '7\n30',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const lines: string[] =',
            whatItMeans: 'Typed array of non-empty input lines.',
            whyItIsThere: 'Prevents trailing empty line NaN bug.',
            ifDeletedError: 'Empty line outputs NaN.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const raw: string = fs.readFileSync(0, "utf8").trim();',
        whatItMeans: 'Explicitly typed stdin buffer.',
        whyItIsThere: 'Ensures string methods like .split exist safely.',
        ifDeletedError: 'Cannot parse test inputs.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'const score: number = Number(scoreStr);',
        whatItMeans: 'Converts input string to number.',
        whyItIsThere: 'TypeScript rejects multiplying a string directly!',
        ifDeletedError: 'Compile error: The left-hand side of * must be number.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'tsc type-check passes', memoryOrStack: 'Zero runtime types', note: 'Static verification OK' },
      { step: 2, state: 'Read "Argon 42"', memoryOrStack: 'raw="Argon 42"', note: 'Split into 2 tokens' },
      { step: 3, state: 'score = Number("42")', memoryOrStack: 'score: number = 42', note: 'Safe numeric binding' },
      { step: 4, state: 'console.log(...)', memoryOrStack: 'stdout', note: 'Welcome, Argon! Score: 84' },
    ],
    harryBugTraps: [
      {
        title: 'Overusing any Defeats TypeScript',
        brokenCode: 'const data: any = "42"; console.log(data.nonExistent()); // compiles, then crashes!',
        fixedCode: 'const data: string = "42"; console.log(data.length);',
        whyItBreaks: 'Using any disables all compiler checks—prefer unknown or explicit types.',
      },
      {
        title: 'Thinking Interfaces Exist at Runtime',
        brokenCode: 'if (obj instanceof BootReport) {} // Compile error!',
        fixedCode: 'if ("engine" in obj) {}',
        whyItBreaks: 'Interfaces are completely erased during JS compilation.',
      },
      {
        title: 'Leaving Unchecked Undefined Destructuring',
        brokenCode: 'const [a] = "".split(" "); // a may be empty string',
        fixedCode: 'if (name && scoreStr) { ... }',
        whyItBreaks: 'Always guard parsed stdin tokens before arithmetic.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-1-q1',
        difficulty: 'Easy',
        title: 'Typed Welcome Output',
        prompt: 'Declare const title: string = "ArgonCode TS" and log it.',
        banglaHint: ': string টাইপ অ্যানোটেশন যোগ করো।',
        starterCode: `const title: string = "ArgonCode TS";\nconsole.log(title);`,
        sampleStdin: '',
        expectedOutput: 'ArgonCode TS',
      },
      {
        id: 'ts-ch-1-q2',
        difficulty: 'Easy',
        title: 'Typed Score Greeter',
        prompt: 'Read name and score from stdin and log "<name>: <score>".',
        banglaHint: 'fs.readFileSync(0, "utf8") ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [name, s] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst score: number = Number(s);\nconsole.log(\`\${name}: \${score}\`);`,
        sampleStdin: 'Dhaka 99',
        expectedOutput: 'Dhaka: 99',
      },
      {
        id: 'ts-ch-1-q3',
        difficulty: 'Medium',
        title: 'Interface Config Printer',
        prompt: 'Define interface AppMeta { name: string; port: number } and print "<name>@<port>".',
        banglaHint: 'interface AppMeta তৈরি করে প্রিন্ট করো।',
        starterCode: `interface AppMeta { name: string; port: number; }\nconst m: AppMeta = { name: "Argon", port: 3000 };\nconsole.log(\`\${m.name}@\${m.port}\`);`,
        sampleStdin: '',
        expectedOutput: 'Argon@3000',
      },
      {
        id: 'ts-ch-1-q4',
        difficulty: 'Medium',
        title: 'Multi-Line Typed Adder',
        prompt: 'Read multiple lines of "a b" and print each sum cleanly.',
        banglaHint: '.filter(Boolean) দিয়ে খালি লাইন বাদ দাও।',
        starterCode: `import * as fs from 'fs';\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/).filter(Boolean);\nfor (const line of lines) {\n  const [a, b] = line.trim().split(/\\s+/).map(Number);\n  console.log(a + b);\n}`,
        sampleStdin: '5 7\n10 25',
        expectedOutput: '12\n35',
      },
    ],
    miniBuild: {
      title: 'TS Mini Build: Type-Safe Score Greeter',
      description: 'Read name and score with strict string/number annotations and print doubled score.',
      banglaGoal: 'টাইপ-সেফ ইনপুট পার্সিং করে দ্বিগুণ স্কোর প্রিন্ট করা।',
      combinesChapters: 'Ch 1',
      starterCode: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8').trim();
const [name, scoreStr] = raw.split(/\\s+/);
if (name && scoreStr) {
  const score: number = Number(scoreStr);
  console.log(\`Welcome, \${name}! Score: \${score * 2}\`);
}`,
      sampleStdin: 'Argon 42',
      expectedOutput: 'Welcome, Argon! Score: 84',
    },
    starterCode: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8').trim();
const [name, scoreStr] = raw.split(/\\s+/);
if (name && scoreStr) {
  const score: number = Number(scoreStr);
  console.log(\`Welcome, \${name}! Score: \${score * 2}\`);
}`,
    sampleStdin: 'Argon 42',
    expectedSampleOutput: 'Welcome, Argon! Score: 84',
    testCases: [
      { id: 'ts-c1-t1', input: 'Argon 42', expectedOutput: 'Welcome, Argon! Score: 84' },
      { id: 'ts-c1-t2', input: 'Dhaka 10', expectedOutput: 'Welcome, Dhaka! Score: 20', isHidden: true },
    ],
  },

  2: {
    chapterNumber: 2,
    title: 'TypeScript Chapter 2 (TS 5.x): Typed Stream Parsing, Tuple Contracts & Formatting',
    banglaTitle: 'TypeScript অধ্যায় ২ (TS 5.x): টাইপড স্ট্রিম পার্সিং ও ফরম্যাটিং',
    subtitle: 'Cursor tokenizers with strict types, [string, number] tuples, .toFixed(2), and batched stdout.',
    zeroIntuition: {
      plainEnglishStory:
        'In TypeScript 5.x, combining an O(1) array cursor (`tokens[idx++]`) with explicit tuple contracts (`[string, number]`) keeps contest input parsing both type-safe and linear-time. Unlike `.shift()`, which shifts every remaining element on each read in O(N^2) total work, an integer cursor index advances cleanly through millions of tokens.\n\nWhen formatting output, keep in mind that `.toFixed(2)` returns a `string`, not a `number`—tsc immediately blocks any accidental attempt to add numbers to formatted currency strings! Batch formatted lines inside `out: string[]` and emit once with `console.log(out.join("\\n"))`.',
      asciiFlowchart: `  stdin -> tokens: string[] -> idx: number cursor -> typed variables
                                  |
                                  v
  out: string[] ---> console.log(out.join("\\n"))`,
      pseudocode: [
        '1. TOKENIZE stdin once into string[]',
        '2. CONSUME nextNum(): number using idx++ cursor',
        '3. FORMAT rows using typed tuples [string, number]',
        '4. FLUSH out.join("\\n") once',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপড টিকিট কাউন্টার ও Tuple প্যাকেট',
        explanation:
          'অনেকে বড় ইনপুট পড়ার জন্য `tokens.shift()` ব্যবহার করেন, যা প্রতিবার অ্যারের প্রথম উপাদান মুছে বাকি সব উপাদান সরাতে গিয়ে কোডকে O(N^2) ধীর করে দেয়। তার বদলে সব টোকেন একবারে `tokens: string[]` অ্যারেতে রেখে `idx: number = 0` কার্সর দিয়ে `tokens[idx++]` করে পড়লে O(N) গতি পাওয়া যায়। এ ছাড়া `[string, number]` টাপল ব্যবহার করলে কোন পজিশনে নাম আর কোন পজিশনে সংখ্যা থাকবে তা কম্পাইলার আগেই নিশ্চিত করে। আরেকটি দারুণ সুবিধা হলো: `.toFixed(2)` ব্যবহার করলে তা string ফেরত দেয়, তাই ভুলে পরের লাইনে তার সাথে সংখ্যা যোগ করতে গেলে tsc সাথে সাথেই তোমাকে থামিয়ে দেবে! শেষে সব লাইন `out: string[]`-এ জমিয়ে একবারে প্রিন্ট করবে।',
        everydayExample:
          'ট্রেইনের বগি নম্বর ও সিট নম্বর একসাথে জোড়া হিসেবে [string, number] রাখা।',
        keyTakeaways: [
          'tokens: string[] এবং idx: number দিয়ে দ্রুত ও টাইপ-সেফ পার্সিং হয়।',
          'tuple টাইপ [string, number] দিয়ে জোড়া ডেটা সাজানো সহজ।',
          'out: string[] অ্যারেতে আউটপুট জমিয়ে একবারে প্রিন্ট করো।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-2-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Fixed Decimals & String Escape Sequences',
        englishParagraphs: [
          'Calling .toFixed(2) returns a string—TypeScript catches any accidental attempt to do math on the formatted string afterward!',
        ],
        banglaParagraphs: [
          '.toFixed(2) সব সময় string রিটার্ন করে; TypeScript তোমাকে ভুলে তার সাথে সংখ্যা যোগ করতে দেবে না।',
        ],
        memoryDiagram: `price: number -> price.toFixed(2): string -> stdout`,
        code: `const price: number = 149.456;
const label: string = price.toFixed(2);
console.log(\`Item:\\t\\"Notebook\\"\\nTotal:\\t\${label} BDT\`);`,
        stdin: '',
        expectedOutput: 'Item:\t"Notebook"\nTotal:\t149.46 BDT',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const label: string = price.toFixed(2);',
            whatItMeans: 'Explicitly records that .toFixed returns a string.',
            whyItIsThere: 'Prevents accidental numeric operations on formatted strings.',
            ifDeletedError: 'Cannot print formatted currency.',
          },
        ],
      },
      {
        id: 'ts-ch-2-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed O(1) Cursor Input Parser',
        englishParagraphs: [
          'Annotating idx: number and tokens: string[] ensures linear parsing without shift().',
        ],
        banglaParagraphs: [
          'টাইপড কার্সর ব্যবহার করে দুটি সংখ্যা পড়ে তাদের যোগফল ও গড় প্রিন্ট করা হলো।',
        ],
        memoryDiagram: `tokens: string[] | idx: number -> a: number, b: number`,
        code: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx: number = 0;
const a: number = Number(tokens[idx++]);
const b: number = Number(tokens[idx++]);
console.log(\`Sum=\${a + b} | Avg=\${((a + b) / 2).toFixed(1)}\`);`,
        stdin: '15 24',
        expectedOutput: 'Sum=39 | Avg=19.5',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'let idx: number = 0;',
            whatItMeans: 'Typed index cursor into token array.',
            whyItIsThere: 'Avoids O(N) Array.shift() cost.',
            ifDeletedError: 'Cannot iterate tokens sequentially.',
          },
        ],
      },
      {
        id: 'ts-ch-2-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Tuple Table Formatter ([string, number][])',
        englishParagraphs: [
          'Tuples enforce fixed-length heterogeneous rows so every row in our terminal report guarantees a string name followed by a numeric year.',
        ],
        banglaParagraphs: [
          'টাপল [string, number] নিশ্চিত করে যে প্রতিটি সারির প্রথম উপাদান স্ট্রিং এবং দ্বিতীয় উপাদান সংখ্যা।',
        ],
        memoryDiagram: `rows: [string, number][] -> formatted table lines`,
        code: `const rows: [string, number][] = [
  ["JS", 1995],
  ["TS", 2012],
  ["Rust", 2015],
];
const out: string[] = ["Lang   | Year"];
for (const [lang, yr] of rows) {
  out.push(\`\${lang.padEnd(6)} | \${String(yr).padStart(4)}\`);
}
console.log(out.join("\\n"));`,
        stdin: '',
        expectedOutput: 'Lang   | Year\nJS     | 1995\nTS     | 2012\nRust   | 2015',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'const rows: [string, number][] = [',
            whatItMeans: 'Array of strict [string, number] tuples.',
            whyItIsThere: 'Compiler rejects swapped or missing tuple elements.',
            ifDeletedError: 'Unconstrained arrays allow invalid row shapes.',
          },
        ],
      },
      {
        id: 'ts-ch-2-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Typed Batched Running Sum for Large Inputs',
        englishParagraphs: [
          'Batching string lines into out: string[] keeps TypeScript/Node submissions fast under strict 1000ms CP limits.',
        ],
        banglaParagraphs: [
          'out: string[] অ্যারেতে আউটপুট লাইন জমিয়ে শেষে join("\\n") করলে ১ লক্ষ লাইনও কয়েক মিলিসেকেন্ডে প্রিন্ট হয়।',
        ],
        memoryDiagram: `out: string[] -> push(String(running)) -> single flush`,
        code: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx: number = 0;
const n: number = Number(tokens[idx++]);
const out: string[] = [];
let running: number = 0;
for (let i: number = 0; i < n; i++) {
  running += Number(tokens[idx++]);
  out.push(String(running));
}
console.log(out.join("\\n"));`,
        stdin: '4 10 20 30 40',
        expectedOutput: '10\n30\n60\n100',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'const out: string[] = [];',
            whatItMeans: 'Typed output buffer collecting formatted lines.',
            whyItIsThere: 'Batches I/O into one stdout syscall.',
            ifDeletedError: 'Repeated console.log slows down large runs.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const tokens: string[] = fs.readFileSync(0, "utf8").trim().split(/\\s+/);',
        whatItMeans: 'Tokenizes entire stdin safely.',
        whyItIsThere: 'Linear O(N) tokenization.',
        ifDeletedError: 'Cannot parse multi-token stream.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'console.log(out.join("\\n"));',
        whatItMeans: 'Single output flush.',
        whyItIsThere: 'Avoids per-line flush latency.',
        ifDeletedError: 'No stdout emitted.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'tokens = ["4","10","20","30","40"]', memoryOrStack: 'idx = 0', note: 'Typed string[]' },
      { step: 2, state: 'n = 4', memoryOrStack: 'idx = 1', note: 'Header parsed' },
      { step: 3, state: '4 iterations', memoryOrStack: 'out=["10","30","60","100"]', note: 'Accumulates sums' },
      { step: 4, state: 'out.join("\\n")', memoryOrStack: 'stdout', note: 'Single clean output' },
    ],
    harryBugTraps: [
      {
        title: 'Assigning .toFixed(2) Result to number',
        brokenCode: 'const avg: number = (10 / 3).toFixed(2); // Compile Error!',
        fixedCode: 'const avgText: string = (10 / 3).toFixed(2);',
        whyItBreaks: '.toFixed returns string, which TypeScript forbids storing in a number variable.',
      },
      {
        title: 'Pushing Mixed Types Into string[]',
        brokenCode: 'const out: string[] = []; out.push(42); // Compile Error!',
        fixedCode: 'out.push(String(42));',
        whyItBreaks: 'Strict string[] rejects raw numbers unless converted with String().',
      },
      {
        title: 'Using .shift() on Huge Input Arrays',
        brokenCode: 'const val = tokens.shift();',
        fixedCode: 'const val = tokens[idx++];',
        whyItBreaks: 'shift() copies the array every call, degrading O(n) to O(n^2).',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-2-q1',
        difficulty: 'Easy',
        title: 'Escaped String Literal',
        prompt: 'Print: Path: "C:\\TS\\main.ts"',
        banglaHint: 'ব্যাকস্ল্যাশ ও কোট এস্কেপ ব্যবহার করো।',
        starterCode: `const p: string = 'Path: "C:\\\\TS\\\\main.ts"';\nconsole.log(p);`,
        sampleStdin: '',
        expectedOutput: 'Path: "C:\\TS\\main.ts"',
      },
      {
        id: 'ts-ch-2-q2',
        difficulty: 'Easy',
        title: 'Typed Average Formatter',
        prompt: 'Read 3 numbers and print average rounded to 2 decimal places.',
        banglaHint: '.toFixed(2) ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, b, c] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst res: string = ((a + b + c) / 3).toFixed(2);\nconsole.log(res);`,
        sampleStdin: '10 20 31',
        expectedOutput: '20.33',
      },
      {
        id: 'ts-ch-2-q3',
        difficulty: 'Medium',
        title: 'Cursor Running Total',
        prompt: 'Use typed cursor idx: number to sum n values and log Total=<sum>.',
        banglaHint: 'tokens[idx++] দিয়ে যোগ করো।',
        starterCode: `import * as fs from 'fs';\nconst tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nlet idx: number = 0;\nconst n: number = Number(tokens[idx++]);\nlet sum: number = 0;\nfor (let i: number = 0; i < n; i++) sum += Number(tokens[idx++]);\nconsole.log(\`Total=\${sum}\`);`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: 'Total=50',
      },
      {
        id: 'ts-ch-2-q4',
        difficulty: 'Medium',
        title: 'Typed Tuple Row Format',
        prompt: 'Create a [string, number] tuple from stdin and log "<name> -> <score>.0".',
        banglaHint: 'score.toFixed(1) ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [k, v] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst row: [string, number] = [k, Number(v)];\nconsole.log(\`\${row[0]} -> \${row[1].toFixed(1)}\`);`,
        sampleStdin: 'Rank 5',
        expectedOutput: 'Rank -> 5.0',
      },
    ],
    miniBuild: {
      title: 'TS Mini Build: Typed Stream Receipt Printer',
      description: 'Read n prices with typed cursor and format Total and Avg to 2 decimal places.',
      banglaGoal: 'টাইপড কার্সর দিয়ে দ্রুত ইনপুট পড়ে ২ দশমিক স্থানে মোট ও গড় প্রিন্ট।',
      combinesChapters: 'Ch 1–2',
      starterCode: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx: number = 0;
const n: number = Number(tokens[idx++]);
let total: number = 0;
for (let i: number = 0; i < n; i++) total += Number(tokens[idx++]);
console.log(\`Total=\${total.toFixed(2)} Avg=\${(total / n).toFixed(2)}\`);`,
      sampleStdin: '3\n10.5 20.0 29.5',
      expectedOutput: 'Total=60.00 Avg=20.00',
    },
    starterCode: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx: number = 0;
const n: number = Number(tokens[idx++]);
let total: number = 0;
for (let i: number = 0; i < n; i++) total += Number(tokens[idx++]);
console.log(\`Total=\${total.toFixed(2)} Avg=\${(total / n).toFixed(2)}\`);`,
    sampleStdin: '3\n10.5 20.0 29.5',
    expectedSampleOutput: 'Total=60.00 Avg=20.00',
    testCases: [
      { id: 'ts-c2-t1', input: '3\n10.5 20.0 29.5', expectedOutput: 'Total=60.00 Avg=20.00' },
      { id: 'ts-c2-t2', input: '2\n5.0 10.0', expectedOutput: 'Total=15.00 Avg=7.50', isHidden: true },
    ],
  },

  3: {
    chapterNumber: 3,
    title: 'TypeScript Chapter 3 (TS 5.x): number vs bigint, Literal Unions & Type Guard Safety',
    banglaTitle: 'TypeScript অধ্যায় ৩ (TS 5.x): number বনাম bigint, ইউনিয়ন টাইপ ও প্রিসিশন',
    subtitle: 'Preventing accidental number + bigint mixing at compile time, MAX_SAFE_INTEGER, and narrow union types.',
    zeroIntuition: {
      plainEnglishStory:
        'At runtime, JavaScript throws a TypeError if you mix Number and BigInt in arithmetic—but TypeScript catches `number + bigint` red-handed right inside your IDE before execution! Remember that `number` is an IEEE-754 double whose exact integer precision stops at `Number.MAX_SAFE_INTEGER` (2^53 - 1 ≈ 9 × 10^15).\n\nWhenever contest bounds exceed 10^15—such as multiplying two 10^9 inputs or computing modular factorials—type those variables strictly as `: bigint` using the `1n` suffix. Alongside numeric precision, TS Literal Unions like `type Currency = "BDT" | "USD"` prevent typo strings at compile time.',
      asciiFlowchart: `  number (53-bit exact max 9e15)  |  bigint (Unlimited n-suffixed)
  tsc FORBIDS: a: number + b: bigint (Caught at compile time!)
  type Role = "admin" | "student"    (Exhaustive union protection!)`,
      pseudocode: [
        '1. ANNOTATE huge values strictly as bigint',
        '2. LET tsc catch any accidental number + bigint mix',
        '3. DEFINE literal union types instead of arbitrary magic strings',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কম্পাইলারের দুই রঙের সীল ও bigint সুরক্ষা',
        explanation:
          'TypeScript-এ `number` এবং `bigint` সম্পূর্ণ দুটি আলাদা টাইপ। JavaScript-এ এই দুটি মিশিয়ে যোগ করলে রানটাইমে ক্র্যাশ করে, কিন্তু TypeScript কোড চালানোর আগেই লাল দাগ দেখিয়ে TS2365 এরর ধরে ফেলে! মনে রাখবে `number` মূলত ৬৪-বিট ফ্লোট হওয়ায় কেবল ২^৫৩ - ১ (প্রায় ৯×১০^১৫) পর্যন্ত পূর্ণসংখ্যা নির্ভুল রাখতে পারে; এর বড় হলেই নিচের ডিজিটগুলো নষ্ট হয়ে যায়। তাই ১ লক্ষ × ১ লক্ষ বা ১০^১৮ হিসাবের জন্য অবশ্যই `: bigint` (যেমন `2n`) ব্যবহার করবে। এর পাশাপাশি লিটারেল ইউনিয়ন টাইপ (`"BDT" | "USD"`) ও `readonly` ব্যবহার করলে কোডের বানান ভুল বা অপ্রত্যাশিত মান পরিবর্তন সম্পূর্ণ বন্ধ হয়।',
        everydayExample:
          'টাকা আর ডলারের মুদ্রা সরাসরি যোগ না করে আগে একই মুদ্রায় বদলে নেওয়ার মতো।',
        keyTakeaways: [
          '১৫-১৬ ডিজিটের বেশি সংখ্যায় : bigint টাইপ বাধ্যতামূলক।',
          'readonly বা as const দিয়ে মান অপরিবর্তনীয় রাখা যায়।',
          'unknown টাইপ চেক ছাড়া ব্যবহার করা যায় না, তাই এটি any-এর চেয়ে অনেক নিরাপদ।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-3-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'number vs bigint & Safe Integer Boundary',
        englishParagraphs: [
          'TypeScript statically separates number from bigint so lossy coercion never slips past review silently.',
        ],
        banglaParagraphs: [
          'number টাইপের সর্বোচ্চ নির্ভুল সীমা ৯×১০^১৫ এবং তার পরেই bigint ব্যবহার করতে হয়।',
        ],
        memoryDiagram: `maxSafe: number (9e15) | exactBig: bigint (9007199254740993n)`,
        code: `const maxSafe: number = Number.MAX_SAFE_INTEGER;
const exactBig: bigint = BigInt(maxSafe) + 2n;
console.log(\`maxSafe=\${maxSafe} exactBig=\${exactBig}\`);`,
        stdin: '',
        expectedOutput: 'maxSafe=9007199254740991 exactBig=9007199254740993',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'const exactBig: bigint = BigInt(maxSafe) + 2n;',
            whatItMeans: 'Explicitly stores arbitrary-precision result in bigint.',
            whyItIsThere: 'Avoids 53-bit float rounding above MAX_SAFE_INTEGER.',
            ifDeletedError: 'Precision lost if typed as number.',
          },
        ],
      },
      {
        id: 'ts-ch-3-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed BigInt Input Multiplication',
        englishParagraphs: [
          'Parsing stdin straight into bigint prevents 53-bit truncation when multiplying two 10^9 inputs.',
        ],
        banglaParagraphs: [
          'ইনপুট স্ট্রিং সরাসরি BigInt() করে : bigint-এ রাখলে ১৮-২০ ডিজিট পর্যন্ত নির্ভুল থাকে।',
        ],
        memoryDiagram: `a: bigint * b: bigint -> exact 19-digit string`,
        code: `import * as fs from 'fs';

const [aStr, bStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const a: bigint = BigInt(aStr);
const b: bigint = BigInt(bStr);
console.log((a * b).toString());`,
        stdin: '1000000000 1000000007',
        expectedOutput: '1000000007000000000',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const a: bigint = BigInt(aStr);',
            whatItMeans: 'Enforces bigint type from the start.',
            whyItIsThere: 'Prevents float precision decay.',
            ifDeletedError: 'Last 3 digits corrupt in regular number.',
          },
        ],
      },
      {
        id: 'ts-ch-3-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Literal Union Types & Readonly Financial Cents',
        englishParagraphs: [
          'Union types like type Currency = "BDT" | "USD" prevent typo bugs like "BTD" at compile time while integer cents protect math accuracy.',
        ],
        banglaParagraphs: [
          'ইউনিয়ন টাইপ ("BDT" | "USD") বানানের ভুল সাথে সাথে ধরে ফেলে এবং পূর্ণসংখ্যায় পয়সা হিসাব করে ফ্লোট এরর দূর করে।',
        ],
        memoryDiagram: `type Currency = "BDT" | "USD" -> integer cents=30 -> "0.30 BDT"`,
        code: `type Currency = "BDT" | "USD";
const unit: Currency = "BDT";
const poisha: number = 10 + 20;
console.log(\`\${(poisha / 100).toFixed(2)} \${unit}\`);`,
        stdin: '',
        expectedOutput: '0.30 BDT',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'type Currency = "BDT" | "USD";',
            whatItMeans: 'Restricts variable to exact allowed strings.',
            whyItIsThere: 'Catches invalid currency codes during compilation.',
            ifDeletedError: 'Any typo string passes unchecked.',
          },
        ],
      },
      {
        id: 'ts-ch-3-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Exact 1..N Arithmetic Sum With bigint',
        englishParagraphs: [
          'For n = 10^9, computing (n * (n + 1n)) / 2n inside bigint avoids MAX_SAFE_INTEGER corruption cleanly.',
        ],
        banglaParagraphs: [
          'n = 10^9 হলে (n * (n + 1n)) / 2n টাইপ-সেফ bigint-এ নির্ভুল ১৮ ডিজিট আউটপুট দেয়।',
        ],
        memoryDiagram: `n: bigint = 1000000000n -> sum = 500000000500000000n`,
        code: `import * as fs from 'fs';

const n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());
const sum: bigint = (n * (n + 1n)) / 2n;
console.log(sum.toString());`,
        stdin: '1000000000',
        expectedOutput: '500000000500000000',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const sum: bigint = (n * (n + 1n)) / 2n;',
            whatItMeans: 'BigInt arithmetic with strict bigint typing.',
            whyItIsThere: 'Prevents regular number precision overflow.',
            ifDeletedError: 'Corrupts low digits above 9e15.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const n: bigint = BigInt(...);',
        whatItMeans: 'Typed arbitrary-precision integer.',
        whyItIsThere: 'Protects values above 9e15.',
        ifDeletedError: 'Precision loss in 53-bit number.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'type Currency = "BDT" | "USD";',
        whatItMeans: 'Compile-time literal union type.',
        whyItIsThere: 'Prevents typo bugs.',
        ifDeletedError: 'Arbitrary invalid strings allowed.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse n: bigint', memoryOrStack: '1000000000n', note: 'Typed bigint' },
      { step: 2, state: 'n + 1n', memoryOrStack: '1000000001n', note: 'tsc enforces 1n' },
      { step: 3, state: 'n * (n + 1n) / 2n', memoryOrStack: '500000000500000000n', note: 'Exact 18 digits' },
      { step: 4, state: 'sum.toString()', memoryOrStack: 'stdout', note: 'Clean string print' },
    ],
    harryBugTraps: [
      {
        title: 'Mixing number and bigint in TypeScript',
        brokenCode: 'const a: bigint = 10n; const b: number = 5; console.log(a + b);',
        fixedCode: 'console.log(a + BigInt(b));',
        whyItBreaks: 'TS immediately raises error TS2365: Operator + cannot be applied to bigint and number.',
      },
      {
        title: 'Trusting Number() for 18-Digit Inputs',
        brokenCode: 'const id: number = Number("9007199254740993");',
        fixedCode: 'const id: bigint = BigInt("9007199254740993");',
        whyItBreaks: 'IEEE-754 floats round digits past 2^53 - 1.',
      },
      {
        title: 'Using any Instead of unknown',
        brokenCode: 'function parse(x: any) { return x.toFixed(2); }',
        fixedCode: 'function parse(x: unknown) { return typeof x === "number" ? x.toFixed(2) : "0.00"; }',
        whyItBreaks: 'any disables safety; unknown forces proper runtime type narrowing.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-3-q1',
        difficulty: 'Easy',
        title: 'BigInt Typed Multiplier',
        prompt: 'Read two integers from stdin as bigint and log their exact product.',
        banglaHint: ': bigint অ্যানোটেশন ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [aStr, bStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst prod: bigint = BigInt(aStr) * BigInt(bStr);\nconsole.log(prod.toString());`,
        sampleStdin: '100000 100000',
        expectedOutput: '10000000000',
      },
      {
        id: 'ts-ch-3-q2',
        difficulty: 'Easy',
        title: 'Safe Integer Check',
        prompt: 'Check if 42 is a safe integer with Number.isSafeInteger.',
        banglaHint: 'const ok: boolean = Number.isSafeInteger(42);',
        starterCode: `const ok: boolean = Number.isSafeInteger(42);\nconsole.log(ok);`,
        sampleStdin: '',
        expectedOutput: 'true',
      },
      {
        id: 'ts-ch-3-q3',
        difficulty: 'Medium',
        title: '2^100 BigInt Power',
        prompt: 'Compute 2n ** 100n with explicit bigint type.',
        banglaHint: 'const p: bigint = 2n ** 100n;',
        starterCode: `const p: bigint = 2n ** 100n;\nconsole.log(p.toString());`,
        sampleStdin: '',
        expectedOutput: '1267650600228229401496703205376',
      },
      {
        id: 'ts-ch-3-q4',
        difficulty: 'Medium',
        title: 'Exact 1..N Formula',
        prompt: 'Read n as bigint and print (n * (n + 1n)) / 2n.',
        banglaHint: 'bigint দিয়ে গুণ ও ভাগ করো।',
        starterCode: `import * as fs from 'fs';\nconst n: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());\nconst ans: bigint = (n * (n + 1n)) / 2n;\nconsole.log(ans.toString());`,
        sampleStdin: '1000000',
        expectedOutput: '500000500000',
      },
    ],
    miniBuild: {
      title: 'TS Mini Build: Typed BigInt Product Engine',
      description: 'Read two integers safely as bigint and print their exact product without float drift.',
      banglaGoal: 'টাইপড bigint দিয়ে ৫৩-বিট ওভারফ্লো ছাড়াই গুণফল নির্ণয়।',
      combinesChapters: 'Ch 1–3',
      starterCode: `import * as fs from 'fs';

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const ans: bigint = BigInt(a) * BigInt(b);
console.log(ans.toString());`,
      sampleStdin: '100000 100000',
      expectedOutput: '10000000000',
    },
    starterCode: `import * as fs from 'fs';

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const ans: bigint = BigInt(a) * BigInt(b);
console.log(ans.toString());`,
    sampleStdin: '100000 100000',
    expectedSampleOutput: '10000000000',
    testCases: [
      { id: 'ts-c3-t1', input: '100000 100000', expectedOutput: '10000000000' },
      { id: 'ts-c3-t2', input: '250000 40000', expectedOutput: '10000000000', isHidden: true },
    ],
  },

  4: {
    chapterNumber: 4,
    title: 'TypeScript Chapter 4 (TS 5.x): Narrowing Operators, ??, Optional Chaining & Modulo',
    banglaTitle: 'TypeScript অধ্যায় ৪ (TS 5.x): টাইপ ন্যারোয়িং অপারেটর, ?? ও মডুলো',
    subtitle: 'How === and typeof narrow union types automatically, ?? nullish guards, and BigInt ceiling math.',
    zeroIntuition: {
      plainEnglishStory:
        'In TypeScript, comparison and guard operators do double duty: they run logic at runtime AND teach the compiler’s Control Flow Analysis to narrow union types! Writing `if (typeof x === "number")` narrows `x: number | string` down to pure `number` inside that block so arithmetic compiles cleanly.\n\nSimilarly, combine optional chaining (`?.`) with nullish coalescing (`??`) rather than logical OR (`||`), because `0 ?? 10` preserves valid zero values while safely turning `(T | null | undefined)` into concrete `T`. Always normalize cyclic remainders via `((a % m) + m) % m` and wrap integer division in `Math.floor()`.',
      asciiFlowchart: `  val: number | null
     |-- if (val !== null) --> val narrowed to pure number!
     |-- val ?? 0          --> type is guaranteed number!`,
      pseudocode: [
        '1. NARROW union types via typeof / === / !== null',
        '2. APPLY ?? to turn (T | null | undefined) into concrete T',
        '3. NORMALIZE negative modulo with ((a % m) + m) % m',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ ন্যারোয়িং গোয়েন্দা ও নিরাপদ ?.',
        explanation:
          'যদি কোনো ভ্যারিয়েবল `number | string` উভয়ই হতে পারে, তাহলে `if (typeof x === "number")` লেখার সাথে সাথে TypeScript বুদ্ধিমানের মতো বুঝে নেয় (Control Flow Narrowing) যে এই ব্লকের ভেতরে `x` কেবলই `number`—তাই এর ওপর সরাসরি গুণ-ভাগ করা যায়! আবার অপশনাল প্রোপার্টি পড়ার সময় `?.` ও ডিফল্ট মানের জন্য `||`-এর বদলে `??` ব্যবহার করবে, কারণ `score || 10` দিলে `0` কেও ফলস ভেবে `10` বসিয়ে দেয়, অথচ `0 ?? 10` দিলে `0` অক্ষত থাকে এবং টাইপ থেকে `null | undefined` বাদ হয়ে যায়। আর ঋণাত্মক মডুলো ঠিক রাখতে `((a % m) + m) % m` ও মিডপয়েন্ট বের করতে `Math.floor()` ভুলবে না!',
        everydayExample:
          'ব্যাগ চেক করে নিশ্চিত হওয়া যে ভেতরে কেবল বই-ই আছে—এরপর নিশ্চিন্তে পড়া শুরু করা।',
        keyTakeaways: [
          'typeof এবং !== null দিয়ে TypeScript নিজেই টাইপ সংকুচিত (Narrowing) করে।',
          'val ?? fallback দিয়ে nullable টাইপ থেকে নন-নাল টাইপ পাওয়া যায়।',
          'ঋণাত্মক মডুলো ঠিক করতে ((a % m) + m) % m ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-4-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'typeof Type Narrowing & ?? Defaulting',
        englishParagraphs: [
          'TypeScript control-flow analysis narrows union parameters automatically inside typeof guards.',
        ],
        banglaParagraphs: [
          'typeof === "number" চেকের ভেতরে TypeScript সরাসরি গাণিতিক অপারেশন করার অনুমতি দেয়।',
        ],
        memoryDiagram: `x: number | string -> typeof x==="number" -> x*2 allowed!`,
        code: `const input: number | string = 21;
const doubled: number = typeof input === "number" ? input * 2 : Number(input) * 2;
const score: number | null = 0;
console.log(\`doubled=\${doubled} score=\${score ?? 100}\`);`,
        stdin: '',
        expectedOutput: 'doubled=42 score=0',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: 'typeof input === "number" ? input * 2 : Number(input) * 2',
            whatItMeans: 'Narrows union to number on true branch and string on false.',
            whyItIsThere: 'TS forbids * directly on number | string.',
            ifDeletedError: 'Compile error: Arithmetic operand must be number.',
          },
        ],
      },
      {
        id: 'ts-ch-4-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed Positive Modulo Helper',
        englishParagraphs: [
          'Normalizing ((a % m) + m) % m inside typed arithmetic guarantees non-negative cyclic indices.',
        ],
        banglaParagraphs: [
          'ঋণাত্মক সংখ্যাকেও ((a % m) + m) % m দিয়ে ০ থেকে m-1 রেঞ্জে আনা হয়েছে।',
        ],
        memoryDiagram: `a=-3, m=5 -> posMod = 2`,
        code: `import * as fs from 'fs';

const [a, m] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const posMod: number = ((a % m) + m) % m;
console.log(\`raw=\${a % m} posMod=\${posMod}\`);`,
        stdin: '-3 5',
        expectedOutput: 'raw=-3 posMod=2',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const posMod: number = ((a % m) + m) % m;',
            whatItMeans: 'Computes non-negative mathematical modulo.',
            whyItIsThere: 'Eliminates negative remainders on cyclic wrapping.',
            ifDeletedError: 'Negative indices break array access.',
          },
        ],
      },
      {
        id: 'ts-ch-4-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Optional Interface + ?. + ?? Fallback',
        englishParagraphs: [
          'Optional interface properties (`theme?: string`) pair cleanly with `?.` and `??` so missing fields fall back deterministically.',
        ],
        banglaParagraphs: [
          'অবজেক্টে অপশনাল ফিল্ড (theme?: string) থাকলে ?. এবং ?? ব্যবহার করে নিরাপদে ডিফল্ট মান নেওয়া যায়।',
        ],
        memoryDiagram: `cfg?.theme ?? "obsidian" -> "obsidian"`,
        code: `interface Config {
  theme?: string | null;
}
const cfg: Config = { theme: null };
const active: string = cfg?.theme ?? "obsidian";
console.log(\`active=\${active}\`);`,
        stdin: '',
        expectedOutput: 'active=obsidian',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'const active: string = cfg?.theme ?? "obsidian";',
            whatItMeans: 'Resolves string | null | undefined directly to string.',
            whyItIsThere: 'TypeScript infers active is strictly string.',
            ifDeletedError: 'Nullable type propagates downstream.',
          },
        ],
      },
      {
        id: 'ts-ch-4-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Exact Integer Ceil Grid Calculation With bigint',
        englishParagraphs: [
          'Using (n + a - 1n) / a on bigint tokens avoids float rounding errors up to arbitrary scales.',
        ],
        banglaParagraphs: [
          'বড় গ্রিডের জন্য bigint-এ (n + a - 1n) / a ব্যবহার করলে দশমিক এররের কোনো সুযোগ নেই।',
        ],
        memoryDiagram: `n=6n, m=6n, a=4n -> tx=2n, ty=2n -> 4n`,
        code: `import * as fs from 'fs';

const [n, m, a] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);
const tx: bigint = (n + a - 1n) / a;
const ty: bigint = (m + a - 1n) / a;
console.log((tx * ty).toString());`,
        stdin: '6 6 4',
        expectedOutput: '4',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const tx: bigint = (n + a - 1n) / a;',
            whatItMeans: 'BigInt ceiling division typed strictly as bigint.',
            whyItIsThere: 'Exact count of tiles across any large dimension.',
            ifDeletedError: 'Float truncation errors above 9e15.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'typeof input === "number"',
        whatItMeans: 'TypeScript control-flow narrowing guard.',
        whyItIsThere: 'Proves safe arithmetic inside branch.',
        ifDeletedError: 'Compiler rejects math on union type.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: '((a % m) + m) % m',
        whatItMeans: 'Normalized positive modulo.',
        whyItIsThere: 'Prevents negative remainder bugs.',
        ifDeletedError: 'Negative values fail index bounds.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Read n=6n, m=6n, a=4n', memoryOrStack: 'bigint tuple', note: 'Mapped via BigInt' },
      { step: 2, state: 'tx = (6n+3n)/4n', memoryOrStack: 'tx = 2n', note: 'BigInt division' },
      { step: 3, state: 'ty = (6n+3n)/4n', memoryOrStack: 'ty = 2n', note: 'BigInt division' },
      { step: 4, state: '(tx * ty).toString()', memoryOrStack: '"4"', note: 'Exact grid count' },
    ],
    harryBugTraps: [
      {
        title: 'Using == Between Unrelated Types in TS',
        brokenCode: 'if ("5" === 5) {} // TS catches this immediately!',
        fixedCode: 'if (Number("5") === 5) {}',
        whyItBreaks: 'TS refuses comparing unrelated types with ===, catching logic bugs before execution.',
      },
      {
        title: 'Overusing Non-Null Assertion ! Everywhere',
        brokenCode: 'const len = maybeStr!.length; // crashes if undefined!',
        fixedCode: 'const len = maybeStr?.length ?? 0;',
        whyItBreaks: '! silences the compiler without adding any runtime null safety.',
      },
      {
        title: 'Integer Midpoint Without Math.floor',
        brokenCode: 'const mid: number = (l + r) / 2; // can be 2.5!',
        fixedCode: 'const mid: number = Math.floor((l + r) / 2);',
        whyItBreaks: 'TS number includes floats; fractional indices return undefined.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-4-q1',
        difficulty: 'Easy',
        title: 'Positive Modulo',
        prompt: 'Read a and m and print ((a % m) + m) % m.',
        banglaHint: '((a % m) + m) % m ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, m] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(((a % m) + m) % m);`,
        sampleStdin: '-17 5',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch-4-q2',
        difficulty: 'Easy',
        title: 'Nullish Coalescing Guard',
        prompt: 'Given const points: number | null = 0, log points ?? 10.',
        banglaHint: 'points ?? 10 লিখলে 0 ঠিক থাকবে।',
        starterCode: `const points: number | null = 0;\nconsole.log(points ?? 10);`,
        sampleStdin: '',
        expectedOutput: '0',
      },
      {
        id: 'ts-ch-4-q3',
        difficulty: 'Medium',
        title: 'Leap Year Checker',
        prompt: 'Read year y and print YES if leap else NO.',
        banglaHint: '(y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)',
        starterCode: `import * as fs from 'fs';\nconst y: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log((y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0)) ? "YES" : "NO");`,
        sampleStdin: '2024',
        expectedOutput: 'YES',
      },
      {
        id: 'ts-ch-4-q4',
        difficulty: 'Medium',
        title: 'BigInt Ceil Division',
        prompt: 'Read a and b as bigint and log (a + b - 1n) / b.',
        banglaHint: 'BigInt সিলিং ফর্মুলা প্রয়োগ করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\nconsole.log(((a + b - 1n) / b).toString());`,
        sampleStdin: '10 3',
        expectedOutput: '4',
      },
    ],
    miniBuild: {
      title: 'TS Mini Build: Modulo & Ceiling Calculator',
      description: 'Read a, b and emit normalized positive modulo plus exact integer ceil.',
      banglaGoal: 'টাইপ-সেফ পজিটিভ মডুলো এবং ইন্টিজার সিলিং হিসাব।',
      combinesChapters: 'Ch 1–4',
      starterCode: `import * as fs from 'fs';

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const mod: number = ((a % b) + b) % b;
const ceil: number = Math.floor((Math.abs(a) + b - 1) / b);
console.log(\`mod=\${mod} ceil=\${ceil}\`);`,
      sampleStdin: '-7 4',
      expectedOutput: 'mod=1 ceil=2',
    },
    starterCode: `import * as fs from 'fs';

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const mod: number = ((a % b) + b) % b;
const ceil: number = Math.floor((Math.abs(a) + b - 1) / b);
console.log(\`mod=\${mod} ceil=\${ceil}\`);`,
    sampleStdin: '-7 4',
    expectedSampleOutput: 'mod=1 ceil=2',
    testCases: [
      { id: 'ts-c4-t1', input: '-7 4', expectedOutput: 'mod=1 ceil=2' },
      { id: 'ts-c4-t2', input: '10 3', expectedOutput: 'mod=1 ceil=4', isHidden: true },
    ],
  },

  5: {
    chapterNumber: 5,
    title: 'TypeScript Chapter 5 (TS 5.x): Bitwise Masks, 32-Bit Trap & Branded BigInt Flags',
    banglaTitle: 'TypeScript অধ্যায় ৫ (TS 5.x): বিটওয়াইজ মাস্ক ও BigInt ফ্ল্যাগ',
    subtitle: '32-bit JS/TS bitwise semantics, >>> 0 unsigned masks, and 1n << k bigint bitmasks.',
    isMilestoneMerger: true,
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript inherits V8’s 32-bit signed bitwise semantics whenever you apply `&`, `|`, `^`, or `<<` to plain `number` values—meaning `1 << 40` wraps the shift amount modulo 32 and silently evaluates to `256` without any compiler warning! Similarly, `(1 << 31)` evaluates to negative `-2147483648` unless unsigned-shifted with `>>> 0`.\n\nWhenever a contest bitmask exceeds 30 flags or values surpass 2^31 - 1, explicitly type your accumulator and masks as `bigint` (`1n << 40n`). Notice also that TS catches operator-precedence bugs like `x & 1 === 0` at compile time because `===` returns a `boolean` incompatible with `&`.',
      asciiFlowchart: `  number bitops: strictly 32-bit signed (& | ^ << >>)
  (1 << 31) >>> 0  ---> 2147483648 (unsigned uint32)
  mask: bigint     ---> 1n << 40n   (Safe 64-bit+ flag space!)`,
      pseudocode: [
        '1. GUARD small <=30 bit masks as number and large masks as bigint',
        '2. CHECK power of two via x > 0 && (x & (x - 1)) === 0',
        '3. ACCUMULATE XOR cancellation in bigint for 10^18 inputs',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বিটমাস্কে number বনাম bigint টাইপ সীল',
        explanation:
          'JavaScript-এর মতো TypeScript-এও সাধারণ `number` টাইপের ওপর বিটওয়াইজ অপারেটর (`&`, `|`, `^`, `<<`) প্রয়োগ করলে তা ৩২-বিট সাইনড ইন্টিজার হিসেবে কাজ করে! ফলে `1 << 40` লিখলে উত্তর ২^৪০ না হয়ে ৩২ দিয়ে মডুলো হয়ে মাত্র ২৫৬ আসে—এটা কিন্তু tsc-ও সব সময় ধরতে পারে না। তাই ৩১ বা তার বেশি বিটমাস্ক (যেমন `1n << 40n`) নিয়ে কাজ করলে ভ্যারিয়েবলের টাইপ অবশ্যই `bigint` রাখতে হবে। আর একটি দারুণ বিষয় হলো: `if (x & 1 === 0)` লিখলে JavaScript চুপচাপ ভুল ফল দেয়, কিন্তু TypeScript সাথে সাথে `number & boolean` এরর দিয়ে তোমাকে `(x & 1) === 0` লিখতে বাধ্য করে! Milestone Merger 1-এ Ch 1–5 মিলিয়ে আমরা এই সব নিয়ম ব্যবহার করবো।',
        everydayExample:
          '৩০টি সুইচের বোর্ড হলে number, আর ৬৪টি সুইচের বোর্ড হলে bigint!',
        keyTakeaways: [
          '১ << ৪০ সাধারণ number-এ দিলে উত্তর ২৫৬ হয়; 1n << 40n দিলে সঠিক মান দেয়।',
          'XOR দিয়ে O(n) টাইম ও O(1) মেমোরিতে জোড়াহীন সংখ্যা খুঁজে পাওয়া যায়।',
          'Milestone Merger 1: Ch 1–5 এর সব টুল মিলে তৈরি হচ্ছে ফাস্ট বিট-অ্যানালাইজার।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-5-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Core Bitwise Ops & Unsigned >>> 0',
        englishParagraphs: [
          'Typed bitwise expressions execute identically to JavaScript at zero runtime cost.',
        ],
        banglaParagraphs: [
          'টাইপ চেকিং শেষে রানটাইমে বিটওয়াইজ অপারেটর সরাসরি হার্ডওয়্যারের গতিতে কাজ করে।',
        ],
        memoryDiagram: `a=12, b=10 -> a&b=8 | a|b=14 | a^b=6 | (1<<31)>>>0 = 2147483648`,
        code: `const a: number = 12;
const b: number = 10;
const u31: number = (1 << 31) >>> 0;
console.log(\`AND=\${a & b} OR=\${a | b} XOR=\${a ^ b} u31=\${u31}\`);`,
        stdin: '',
        expectedOutput: 'AND=8 OR=14 XOR=6 u31=2147483648',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const u31: number = (1 << 31) >>> 0;',
            whatItMeans: 'Forces unsigned 32-bit interpretation.',
            whyItIsThere: '1 << 31 alone evaluates to negative -2147483648.',
            ifDeletedError: 'Signed negative value printed.',
          },
        ],
      },
      {
        id: 'ts-ch-5-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Power-of-Two & Kernighan Popcount Counter',
        englishParagraphs: [
          'Counting 1-bits via x &= (x - 1) finishes in exact proportion to the number of set bits.',
        ],
        banglaParagraphs: [
          'x &= (x - 1) দিয়ে যতগুলো ১ বিট আছে ঠিক ততবারই লুপ ঘুরে বিট গোনা যায়।',
        ],
        memoryDiagram: `16 -> pow2=true | bit4=1 | pop=1`,
        code: `import * as fs from 'fs';

const [x, k] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const pow2: boolean = x > 0 && (x & (x - 1)) === 0;
let cnt: number = 0;
let tmp: number = x;
while (tmp > 0) {
  tmp &= tmp - 1;
  cnt++;
}
console.log(\`pow2=\${pow2} bit\${k}=\${(x >> k) & 1} pop=\${cnt}\`);`,
        stdin: '16 4',
        expectedOutput: 'pow2=true bit4=1 pop=1',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const pow2: boolean = x > 0 && (x & (x - 1)) === 0;',
            whatItMeans: 'O(1) bitwise power-of-two predicate.',
            whyItIsThere: 'Single bit set iff x & (x - 1) === 0.',
            ifDeletedError: 'Would require division loop.',
          },
        ],
      },
      {
        id: 'ts-ch-5-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed BigInt Feature Permission Flags',
        englishParagraphs: [
          'Separating 64-bit feature flags with bigint protects multi-module apps from silent 32-bit collisions.',
        ],
        banglaParagraphs: [
          'bigint টাইপ ব্যবহার করে ৩২-টির বেশি পারমিশন ফ্ল্যাগ নিরাপদে চেক করা যায়।',
        ],
        memoryDiagram: `READ=1n | WRITE=2n | CLOUD=1n<<40n -> checked safely`,
        code: `const READ: bigint = 1n << 0n;
const WRITE: bigint = 1n << 1n;
const CLOUD: bigint = 1n << 40n;
const mask: bigint = READ | WRITE | CLOUD;
console.log(\`hasWrite=\${(mask & WRITE) !== 0n} hasCloud=\${(mask & CLOUD) !== 0n}\`);`,
        stdin: '',
        expectedOutput: 'hasWrite=true hasCloud=true',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'const CLOUD: bigint = 1n << 40n;',
            whatItMeans: 'Bit 40 stored in arbitrary-precision bigint.',
            whyItIsThere: '1 << 40 wraps mod 32 in number!',
            ifDeletedError: 'Collides with bit 8.',
          },
        ],
      },
      {
        id: 'ts-ch-5-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 1: BigInt XOR Unique Finder',
        englishParagraphs: [
          'Accumulating `xorAll ^= BigInt(tokens[i])` finds the single unpaired element in O(n) time and O(1) space cleanly up to any digit count.',
        ],
        banglaParagraphs: [
          'Ch 1–5 এর সব টুল মিলিয়ে bigint XOR দিয়ে O(1) মেমোরিতে জোড়াহীন সংখ্যা খুঁজে বের করা।',
        ],
        memoryDiagram: `12n ^ 5n ^ 12n ^ 9n ^ 5n -> 9n`,
        code: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tokens[0]);
let unique: bigint = 0n;
for (let i: number = 1; i <= n; i++) unique ^= BigInt(tokens[i]);
console.log(\`unique=\${unique} bit40=\${1n << 40n}\`);`,
        stdin: '5\n12 5 12 9 5',
        expectedOutput: 'unique=9 bit40=1099511627776',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'for (let i: number = 1; i <= n; i++) unique ^= BigInt(tokens[i]);',
            whatItMeans: '64-bit+ XOR sweep.',
            whyItIsThere: 'Pairs cancel to 0n leaving unique element.',
            ifDeletedError: 'Cannot isolate unpaired value.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const CLOUD: bigint = 1n << 40n;',
        whatItMeans: 'BigInt shift for bit indices >= 31.',
        whyItIsThere: 'Regular number shifts wrap modulo 32.',
        ifDeletedError: 'Silent bit collision.',
      },
      {
        lineNumber: 'Line 2',
        codeSnippet: 'unique ^= BigInt(tokens[i]);',
        whatItMeans: 'XOR cancellation in bigint.',
        whyItIsThere: 'Preserves full 64-bit+ numbers.',
        ifDeletedError: 'Truncates values > 2^31 - 1.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'unique = 0n', memoryOrStack: '0n', note: 'Typed bigint identity' },
      { step: 2, state: '12n ^ 5n ^ 12n', memoryOrStack: '5n', note: '12n cancels' },
      { step: 3, state: '5n ^ 9n ^ 5n', memoryOrStack: '9n', note: '5n cancels' },
      { step: 4, state: '1n << 40n', memoryOrStack: '1099511627776n', note: 'Exact bit 40' },
    ],
    harryBugTraps: [
      {
        title: '1 << 40 Without n Suffix',
        brokenCode: 'const mask: number = 1 << 40; // evaluates to 256!',
        fixedCode: 'const mask: bigint = 1n << 40n;',
        whyItBreaks: 'JS/TS number bitwise shifts reduce shift distance modulo 32.',
      },
      {
        title: 'Comparing (x & 1 === 0) Without Parentheses',
        brokenCode: 'if (x & 1 === 0) {} // TS catches number & boolean error!',
        fixedCode: 'if ((x & 1) === 0) {}',
        whyItBreaks: '=== has higher precedence than &; TypeScript catches the invalid boolean operand.',
      },
      {
        title: 'Bitwise NOT ~ Misconception',
        brokenCode: '~5 // equals -6, not 2!',
        fixedCode: '5 ^ 7 // flips bottom 3 bits -> 2',
        whyItBreaks: '~ flips all 32 bits including the sign bit; use XOR with a fixed-width mask instead.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-5-q1',
        difficulty: 'Easy',
        title: 'Bitwise Odd/Even',
        prompt: 'Read n and output EVEN if (n & 1) === 0 else ODD.',
        banglaHint: '(n & 1) === 0 চেক করো।',
        starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log((n & 1) === 0 ? "EVEN" : "ODD");`,
        sampleStdin: '17',
        expectedOutput: 'ODD',
      },
      {
        id: 'ts-ch-5-q2',
        difficulty: 'Easy',
        title: 'Power of Two',
        prompt: 'Read n and print YES if power of two else NO.',
        banglaHint: 'n > 0 && (n & (n - 1)) === 0',
        starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log((n > 0 && (n & (n - 1)) === 0) ? "YES" : "NO");`,
        sampleStdin: '64',
        expectedOutput: 'YES',
      },
      {
        id: 'ts-ch-5-q3',
        difficulty: 'Medium',
        title: '64-Bit BigInt Shift',
        prompt: 'Read k and print 1n << BigInt(k).',
        banglaHint: 'BigInt শিফট ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst k: bigint = BigInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log((1n << k).toString());`,
        sampleStdin: '40',
        expectedOutput: '1099511627776',
      },
      {
        id: 'ts-ch-5-q4',
        difficulty: 'Hard',
        title: 'XOR Unique Element',
        prompt: 'Read n and n numbers where every element appears twice except one; print unique.',
        banglaHint: 'bigint XOR চালাও।',
        starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n: number = Number(t[0]);\nlet ans: bigint = 0n;\nfor (let i: number = 1; i <= n; i++) ans ^= BigInt(t[i]);\nconsole.log(ans.toString());`,
        sampleStdin: '5\n7 3 9 3 7',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 1 (TS Ch 1–5): Typed Bitwise Odd-One-Out Engine',
      description: 'Combine TypeScript strict bindings, O(1) cursor parsing, and bigint XOR cancellation.',
      banglaGoal: 'অধ্যায় ১–৫ মিলিয়ে সম্পূর্ণ TypeScript বিট-অ্যানালাইজার।',
      combinesChapters: 'Ch 1–5',
      starterCode: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tokens[0]);
let unique: bigint = 0n;
for (let i: number = 1; i <= n; i++) unique ^= BigInt(tokens[i]);
console.log(\`unique=\${unique}\`);`,
      sampleStdin: '5\n12 5 12 9 5',
      expectedOutput: 'unique=9',
    },
    starterCode: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(tokens[0]);
let unique: bigint = 0n;
for (let i: number = 1; i <= n; i++) unique ^= BigInt(tokens[i]);
console.log(\`unique=\${unique}\`);`,
    sampleStdin: '5\n12 5 12 9 5',
    expectedSampleOutput: 'unique=9',
    testCases: [
      { id: 'ts-c5-t1', input: '5\n12 5 12 9 5', expectedOutput: 'unique=9' },
      { id: 'ts-c5-t2', input: '3\n7 10 10', expectedOutput: 'unique=7', isHidden: true },
    ],
  },
  ...LESSONS_TS_P2,
  ...LESSONS_TS_P3,
  ...LESSONS_TS_P4,
  ...LESSONS_TS_P5,
};
