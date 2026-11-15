import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_TS_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'TypeScript Chapter 6 (TS 5.x): Control-Flow Narrowing, switch Exhaustiveness & ===',
    banglaTitle: 'TypeScript অধ্যায় ৬ (TS 5.x): কন্ট্রোল-ফ্লো ন্যারোয়িং, switch ও ===',
    subtitle: 'TypeScript control-flow narrowing inside if/else, discriminated switch, strict === checks, and nullish ??.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript makes branching far smarter than plain JavaScript through **Control-Flow Type Narrowing**. Once you write an early guard `if (score === null) return "MISSING";`, `tsc` mathematically proves `score` is strictly `number` on every line below—preventing runtime `null`/`undefined` crashes at compile time!\n\nPair early guard clauses with strict equality `===` and Nullish Coalescing `??` so valid `0` or `""` never gets erased, and let TypeScript validate `switch` branches cleanly against string/union types.',
      asciiFlowchart: `  [ raw: string | null ]
         |
         +--> if (raw === null) return "MISSING";
         |
         v  TypeScript narrows type below this line strictly to: string!
  [ score: number ] ---> >= 90 -> "A+" | >= 80 -> "A" | else -> "Pass/Fail"`,
      pseudocode: [
        '1. PARSE typed numeric/command inputs from fs.readFileSync',
        '2. GUARD invalid/NaN values early so TS narrows remaining paths cleanly',
        '3. COMPARE union literals strictly using === and switch',
        '4. PRESERVE valid 0 values using ?? instead of ||',
        '5. EMIT typed result cleanly via console.log()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্মার্ট টাইপ-ন্যারোয়িং ফিল্টার ও স্ট্রিক্ট গার্ড',
        explanation:
          'TypeScript-এ `if / else if / else` ও `switch` শুধু প্রোগ্রামের গতিপথই ঠিক করে না, বরং ভেতরের ভ্যারিয়েবলের টাইপকেও আরও নিখুঁত (Narrow) করে দেয়! যেমন কোনো ভ্যারিয়েবল `number | null` হলে তুমি শুরুতেই `if (val === null) return;` লিখে গার্ড ক্লজ বসালে পরের সব লাইনে `tsc` বুঝে নেয় যে `val` এখন শতভাগ `number`! JavaScript-এর মতো এখানেও কখনোই ঢিলেঢালা `==` ব্যবহার করবে না—সর্বদা কঠোর `===` ব্যবহার করবে। তাছাড়া যখন `0` একটি বৈধ নম্বর হতে পারে, তখন `val || 10`-এর বদলে `val ?? 10` (Nullish Coalescing) ব্যবহার করবে যাতে `0` হারিয়ে না যায়। ডিসক্রিট কমান্ড বা অপারেটর (`"+"`, `"-"`, `"*"`, `"/"`) সামলাতে `switch` ব্যবহার করলে প্রতিটি কেস পরিষ্কার থাকে এবং প্রতি কেস শেষে `break;` দিতে ভুলবে না। আমাদের বাগ-মুক্ত গার্ড ক্লজ প্যাটার্নে কম্পাইল টাইমেই অসাধ্য টাইপ এরর ধরা পড়ে, আর রানটাইমে কোড চলে সাধারণ দ্রুতগতির JavaScript হিসেবে!',
        everydayExample:
          'বিমানবন্দরের নিরাপত্তা গেটে "অবৈধ টিকিট" গার্ডে আটকে গেলে ভেতরের যাত্রীরা যে সবাই বৈধ তা আর বারবার চেক করতে হয় না—এটাই Control-Flow Narrowing।',
        keyTakeaways: [
          'গার্ড ক্লজ (`if (x === null) return;`) লিখলে নিচের কোডে টাইপ স্বয়ংক্রিয়ভাবে ন্যারো হয়ে যায়।',
          'যখন `0` বৈধ মান, তখন `||` নয় বরং `??` ব্যবহার করো।',
          'ইউনিয়ন টাইপ (`"+" | "-" | "*" | "/"`) `switch` করলে টাইপো সাথে সাথেই ধরা পড়ে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Control-Flow Guard Narrowing & Grade Classifier',
        englishParagraphs: [
          'By checking `score === null || !Number.isFinite(score)` first, TypeScript narrows `score` from `number | null` to strict `number` automatically below the guard.',
          'Descending thresholds classify grades in a single flat pass.',
        ],
        banglaParagraphs: [
          '`score: number | null` থেকে শুরুতেই গার্ড ক্লজ দিয়ে `null` বাদ দিলে নিচের সব লাইনে `score` স্বয়ংক্রিয়ভাবে নির্ভুল `number` হয়ে যায়।',
        ],
        memoryDiagram: `score: number|null -> guard -> narrowed to number -> 85 -> "A"`,
        code: `function classify(score: number | null): string {
  if (score === null || !Number.isFinite(score) || score < 0 || score > 100) {
    return "INVALID";
  }
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  return "Pass/Fail";
}
console.log(classify(85));`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'function classify(score: number | null): string {', whatItMeans: 'Accepts nullable number and returns string.', whyItIsThere: 'Models real-world optional numeric inputs safely.', ifDeletedError: 'Compile error: classify undefined.' },
          { lineNumber: 'Line 2', codeSnippet: 'if (score === null || !Number.isFinite(score) || score < 0 || score > 100) {', whatItMeans: 'Guard clause narrowing score to safe number inside [0, 100].', whyItIsThere: 'Prevents null math and invalid boundaries.', ifDeletedError: 'tsc rejects arithmetic on nullable score.' },
          { lineNumber: 'Line 6', codeSnippet: 'if (score >= 80) return "A";', whatItMeans: 'Evaluates 80..89 band on narrowed number.', whyItIsThere: 'Clean flat classifier.', ifDeletedError: '85 returns Pass/Fail.' },
        ],
      },
      {
        id: 'ts-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed switch Calculator With Zero-Divisor Protection',
        englishParagraphs: [
          'Parsing operator token and dispatching inside a strict `switch` avoids coercion traps and guards `b !== 0` cleanly.',
        ],
        banglaParagraphs: [
          'স্ট্রিক্ট `switch` ব্যবহার করে অপারেটর অনুযায়ী ফলাফল নির্ণয় করা হয়েছে এবং `b !== 0` দিয়ে শূন্য-বিভাজন আটকানো হয়েছে।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> switch("*") -> "48"`,
        code: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8').trim();
const parts: string[] = raw.split(/\\s+/);
const a: number = Number(parts[0] ?? 0);
const op: string = parts[1] ?? "";
const b: number = Number(parts[2] ?? 0);
let out: string = "UNKNOWN";
switch (op) {
  case "+": out = String(a + b); break;
  case "-": out = String(a - b); break;
  case "*": out = String(a * b); break;
  case "/": out = b !== 0 ? String(Math.trunc(a / b)) : "DIV_ZERO"; break;
}
console.log(out);`,
        stdin: '12 * 4',
        expectedOutput: '48',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'case "/": out = b !== 0 ? String(Math.trunc(a / b)) : "DIV_ZERO"; break;', whatItMeans: 'Guards zero denominator so JS never prints Infinity.', whyItIsThere: 'Produces deterministic DIV_ZERO output.', ifDeletedError: '12 / 0 prints Infinity.' },
        ],
      },
      {
        id: 'ts-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Nullish Coalescing (??) & Tiered Shipping Fee Calculator',
        englishParagraphs: [
          'TypeScript warns if `??` operands are redundant and protects `discount: number | null` so `0` discount never triggers fallback defaults.',
        ],
        banglaParagraphs: [
          '`number | null` টাইপ থেকে `discount ?? 0` ব্যবহার করে `0` মানটিকেও অক্ষত রেখে ডেলিভারি ফি হিসাব করা হয়েছে।',
        ],
        memoryDiagram: `w=7, discount=0 -> base=120 -> Fee=120`,
        code: `import * as fs from 'fs';

const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const w: number = Number(tokens[0] ?? 0);
const discount: number | null = tokens[1] !== undefined ? Number(tokens[1]) : null;
if (w <= 0) {
  console.log("INVALID");
} else {
  const base: number = w <= 5 ? 60 : (w <= 20 ? 120 : 250);
  const finalFee: number = Math.max(0, base - (discount ?? 0));
  console.log(\`Fee=\${finalFee}\`);
}`,
        stdin: '7 0',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'const finalFee: number = Math.max(0, base - (discount ?? 0));', whatItMeans: 'Applies 0 fallback only when discount is strictly null.', whyItIsThere: 'Preserves numeric 0 cleanly.', ifDeletedError: 'Compile error subtracting null from number.' },
        ],
      },
      {
        id: 'ts-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Strict === Equality & Watermelon Boundary Check (CF 4A)',
        englishParagraphs: [
          'TypeScript flags accidental comparisons between `number` and `string` (`5 === "5"`) at compile time! Combined with `w > 2 && w % 2 === 0`, boundary `w = 2` returns `NO`.',
        ],
        banglaParagraphs: [
          'TypeScript-এ ভুল করে স্ট্রিং ও সংখ্যার `===` তুলনা করলে কম্পাইলারই এরর ধরিয়ে দেয়। নিচে `w = 2` এজ-কেস যাচাই করা হয়েছে।',
        ],
        memoryDiagram: `w=2 -> (2 > 2 && 2 % 2 === 0) -> "NO"`,
        code: `import * as fs from 'fs';

const w: number = Number(fs.readFileSync(0, 'utf8').trim());
console.log((w > 2 && w % 2 === 0) ? "YES" : "NO");`,
        stdin: '2',
        expectedOutput: 'NO',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: '(w > 2 && w % 2 === 0) ? "YES" : "NO"', whatItMeans: 'Typed boolean expression checking even split above 2.', whyItIsThere: 'Catches w=2 boundary bug cleanly.', ifDeletedError: 'Returns YES for w=2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'function classify(score: number | null): string {', whatItMeans: 'Typed classifier accepting nullable number and returning string.', whyItIsThere: 'Demonstrates union guard narrowing.', ifDeletedError: 'Function missing.' },
      { lineNumber: 'Line 2', codeSnippet: 'if (score === null || !Number.isFinite(score) || score < 0 || score > 100) {', whatItMeans: 'Narrows score to valid finite number inside [0, 100].', whyItIsThere: 'Eliminates null/NaN edge crashes early.', ifDeletedError: 'Arithmetic fails static null check.' },
      { lineNumber: 'Line 5', codeSnippet: 'if (score >= 90) return "A+";', whatItMeans: 'Checks highest threshold first.', whyItIsThere: 'Strict ordering guarantees >=90 priority.', ifDeletedError: '95 drops to lower grade.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (score >= 80) return "A";', whatItMeans: 'Matches 80..89 grade band.', whyItIsThere: 'Runs when score < 90.', ifDeletedError: '85 outputs Pass/Fail.' },
      { lineNumber: 'Line 7', codeSnippet: 'return "Pass/Fail";', whatItMeans: 'Fallback string return.', whyItIsThere: 'Satisfies explicit string return type.', ifDeletedError: 'Compile error: not all code paths return a value.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call classify(85)', memoryOrStack: 'score: number|null = 85', note: 'Entered guard check' },
      { step: 2, state: 'Guard false', memoryOrStack: 'score narrowed -> number', note: 'Guaranteed finite [0..100]' },
      { step: 3, state: '85 >= 90', memoryOrStack: 'false', note: 'Proceed' },
      { step: 4, state: '85 >= 80', memoryOrStack: 'TRUE -> "A"', note: 'Logs A' },
    ],
    harryBugTraps: [
      { title: 'Forgetting Return on One Branch of Typed Function', brokenCode: 'function f(x: number): string { if (x > 0) return "POS"; }', fixedCode: 'function f(x: number): string { return x > 0 ? "POS" : "NONPOS"; }', whyItBreaks: 'Missing return path returns undefined and fails strict TypeScript compilation.' },
      { title: 'Erasing Valid 0 Using Logical OR ||', brokenCode: 'const n: number = 0; const out = n || 100; // 100!', fixedCode: 'const out: number = n ?? 100; // 0!', whyItBreaks: '|| treats 0 as falsy; ?? only triggers on null/undefined.' },
      { title: 'Testing Empty Arrays via if (arr)', brokenCode: 'const arr: number[] = []; if (arr) ... // always true!', fixedCode: 'if (arr.length > 0) ...', whyItBreaks: 'Object references like [] are always truthy in JS/TS.' },
    ],
    practiceSheet: [
      { id: 'ts-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read number n and log POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / else if / else ও strict === ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nif (n > 0) console.log("POSITIVE");\nelse if (n < 0) console.log("NEGATIVE");\nelse console.log("ZERO");`, sampleStdin: '-42', expectedOutput: 'NEGATIVE' },
      { id: 'ts-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Numbers', prompt: 'Read 3 numbers and print the maximum.', banglaHint: 'let mx: number = a; দিয়ে তুলনা করো।', starterCode: `import * as fs from 'fs';\nconst [a, b, c] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet mx: number = a; if (b > mx) mx = b; if (c > mx) mx = c;\nconsole.log(mx);`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'ts-ch-6-q3', difficulty: 'Medium', title: '3. Typed Switch Day Router', prompt: 'Read 1..3 (1=Mon, 2=Tue, 3=Wed, else INVALID) via switch.', banglaHint: 'switch (d) ও break; ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst d: number = Number(fs.readFileSync(0, 'utf8').trim());\nswitch (d) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n  case 3: console.log("Wed"); break;\n  default: console.log("INVALID");\n}`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'ts-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Sides', prompt: 'Read sides a, b, c; print YES if valid triangle else NO.', banglaHint: 'ধনাত্মক ও ত্রিভুজ অসমতা যাচাই করো।', starterCode: `import * as fs from 'fs';\nconst [a, b, c] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log((a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b) ? "YES" : "NO");`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'ts-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Boundary Split (CF 4A)', prompt: 'Read w and output YES if splittable into two positive even ints else NO.', banglaHint: 'w > 2 && w % 2 === 0 যাচাই করো।', starterCode: `import * as fs from 'fs';\nconst w: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log((w > 2 && w % 2 === 0) ? "YES" : "NO");`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'TypeScript 5.x Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric score input with narrowed type guards cleanly.',
      banglaGoal: 'টাইপ-ন্যারোয়িং ও গার্ড ক্লজ দিয়ে গ্রেড রাউটার তৈরি।',
      combinesChapters: 'Ch 1–6',
      starterCode: `import * as fs from 'fs';

const score: number = Number(fs.readFileSync(0, 'utf8').trim());
if (!Number.isFinite(score) || score < 0 || score > 100) console.log("INVALID");
else if (score >= 90) console.log("A+");
else if (score >= 80) console.log("A");
else console.log("PASS");`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `import * as fs from 'fs';

const score: number = Number(fs.readFileSync(0, 'utf8').trim());
if (!Number.isFinite(score) || score < 0 || score > 100) console.log("INVALID");
else if (score >= 90) console.log("A+");
else if (score >= 80) console.log("A");
else console.log("PASS");`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'ts6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'ts6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'TypeScript Chapter 7 (TS 5.x): Typed Loops (for, while, do-while & for..of)',
    banglaTitle: 'TypeScript অধ্যায় ৭ (TS 5.x): টাইপড লুপ মাস্টারি (for, while, do-while ও for..of)',
    subtitle: 'Typed counters, for..of over readonly arrays, Math.trunc digit convergence, and no-for..in discipline.',
    zeroIntuition: {
      plainEnglishStory:
        'Loops in TypeScript combine V8 speed with static type safety: `for (const item of items)` infers `item`’s exact element type automatically—whether `number`, `string`, or an object—so accessing wrong properties or treating values as array keys is caught before runtime!\n\nLike JavaScript, TypeScript numbers are 64-bit IEEE-754 floats under the hood, so digit-stripping `while` / `do-while` loops MUST use `Math.trunc(x / 10)` so `x` reaches integer `0` cleanly instead of hanging in sub-1 fractional decimals.',
      asciiFlowchart: `  [ const nums: readonly number[] ]
         |
         v  for (const x of nums)  --> tsc infers x: number automatically!
  [ x % 2 === 0 -> continue ]
         |
         v
  [ oddSum += x ] ---> typed numeric accumulation (zero string coercion!)`,
      pseudocode: [
        '1. ANNOTATE accumulator (let sum: number = 0) before loop',
        '2. USE for..of on typed arrays so element type is inferred cleanly',
        '3. TRUNCATE integer digit steps explicitly via Math.trunc(x / 10)',
        '4. USE do-while when zero inputs require 1 guaranteed pass',
        '5. BATCH bulk loop outputs cleanly via string[] + join("\\n")',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সুরক্ষিত কনভেয়ার বেল্ট ও Math.trunc পূর্ণভাগ',
        explanation:
          'TypeScript-এ `for`, `while`, `do-while` এবং `for...of` লুপ ঠিক JavaScript-এর মতোই চলে, তবে এর ওপর যুক্ত থাকে স্ট্যাটিক টাইপ নিরাপত্তা। তুমি যখন `const arr: number[]` অ্যারের ওপর `for (const x of arr)` চালাও, তখন `tsc` নিজে থেকেই জেনে নেয় প্রতিটি `x`-এর টাইপ হলো `number`—তাই ভুল করে স্ট্রিং মেথড কল করলে বা ইনডেক্স হিসেবে `for..in` দিয়ে স্ট্রিং কি নিয়ে যোগ করতে গেলে কম্পাইলারই বাধা দেয়! আরেকটি গুরুত্বপূর্ণ বিষয় হলো JS ও TS উভয় ভাষাতেই `number` আসলে ৬৪-বিট ফ্লোট। তাই অঙ্ক গোনার লুপে `x /= 10` লিখলে `x` ভগ্নাংশ হয়ে অনন্তকাল ঘুরতে থাকবে! এর সমাধান হলো সব সময় `x = Math.trunc(x / 10)` লেখা যাতে `7042 -> 704 -> 70 -> 7 -> 0` হয়ে ঠিক সময়ে লুপ থামে। ইনপুট `0` দিলেও `1` অঙ্ক দেখাতে `do { ... } while (x > 0);` ব্যবহার করবে। আর লুপে হাজারটা স্ট্রিং আউটপুট সংগ্রহ করতে `const out: string[] = [];` নিয়ে শেষে `.join("\\n")` করবে।',
        everydayExample:
          'কারখানার বেল্টে প্রতিটি পণ্যের গায়ে `number` বারকোড বসানো থাকলে রোবট (`for..of`) ভুল করে কাগজের টুকরো তুলতেই পারবে না!',
        keyTakeaways: [
          'অ্যারে ইটারেশনে `for (const x of arr)` ব্যবহার করলে টাইপ নিজেই `number` হিসেবে ইনফার হয়।',
          'অঙ্ক বাদ দেওয়ার লুপে অবশ্যই `x = Math.trunc(x / 10)` লিখবে, `x /= 10` নয়!',
          'হাজারটা লাইন প্রিন্ট করতে `const out: string[] = [];` + `out.join("\\n")` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed for Loop Summation',
        englishParagraphs: [
          'Declaring `let sum: number = 0;` outside the loop preserves the running total cleanly across iterations `1..5`.',
        ],
        banglaParagraphs: [
          'লুপের বাইরে `let sum: number = 0;` রেখে ১ থেকে ৫ পর্যন্ত সংখ্যার যোগফল নির্ণয় করা হয়েছে।',
        ],
        memoryDiagram: `i=1..5 -> sum: 0 -> 1 -> 3 -> 6 -> 10 -> 15`,
        code: `let sum: number = 0;
for (let i: number = 1; i <= 5; i++) {
  sum += i;
}
console.log(\`sum=\${sum}\`);`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'let sum: number = 0;', whatItMeans: 'Typed numeric accumulator initialized before loop.', whyItIsThere: 'Prevents string concatenation or undefined errors.', ifDeletedError: 'Compile error: Cannot find name sum.' },
          { lineNumber: 'Line 2', codeSnippet: 'for (let i: number = 1; i <= 5; i++) {', whatItMeans: 'Block-scoped counter looping 1..5.', whyItIsThere: 'Deterministic iteration count.', ifDeletedError: 'Loop does not run.' },
          { lineNumber: 'Line 3', codeSnippet: 'sum += i;', whatItMeans: 'Adds i to numeric sum.', whyItIsThere: 'Updates total.', ifDeletedError: 'Prints sum=0.' },
        ],
      },
      {
        id: 'ts-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Exit-Controlled do-while Digit Counter With Math.trunc',
        englishParagraphs: [
          'Truncating decimals with `Math.trunc(x / 10)` guarantees exact termination at `0` while `do-while` ensures `0` counts as `1` digit.',
        ],
        banglaParagraphs: [
          '`do-while` ও `Math.trunc(x / 10)` দিয়ে `0`-সহ সব পূর্ণসংখ্যার অঙ্ক সংখ্যা নির্ভুলভাবে গোনা হয়েছে।',
        ],
        memoryDiagram: `x=7042 -> 704(1) -> 70(2) -> 7(3) -> 0(4) -> stop`,
        code: `import * as fs from 'fs';

let x: number = Math.abs(Math.trunc(Number(fs.readFileSync(0, 'utf8').trim())));
let digits: number = 0;
do {
  digits++;
  x = Math.trunc(x / 10);
} while (x > 0);
console.log(\`digits=\${digits}\`);`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'x = Math.trunc(x / 10);', whatItMeans: 'Removes fractional remainder after dividing by 10.', whyItIsThere: 'Prevents infinite sub-zero float loop.', ifDeletedError: 'Loop hangs for ~320 iterations or corrupts count.' },
        ],
      },
      {
        id: 'ts-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Checker With Early break',
        englishParagraphs: [
          'Checking `d * d <= n` cuts divisor scanning down to `O(sqrt(n))` with clean typed boolean flag.',
        ],
        banglaParagraphs: [
          '`d * d <= n` পর্যন্ত পরীক্ষা করে ভাজক পাওয়ামাত্রই `break` দিয়ে প্রাইম যাচাই করা হয়েছে।',
        ],
        memoryDiagram: `n=29 -> d=2..5 -> no divisor -> PRIME`,
        code: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let prime: boolean = Number.isInteger(n) && n >= 2;
for (let d: number = 2; d * d <= n; d++) {
  if (n % d === 0) {
    prime = false;
    break;
  }
}
console.log(prime ? "PRIME" : "COMPOSITE");`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (let d: number = 2; d * d <= n; d++) {', whatItMeans: 'Tests candidate factors up to sqrt(n).', whyItIsThere: 'O(sqrt(n)) efficiency.', ifDeletedError: 'Slow O(n) loop.' },
        ],
      },
      {
        id: 'ts-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Typed for..of vs for..in Key Trap & continue Filter',
        englishParagraphs: [
          'TypeScript immediately warns if you try arithmetic on `for..in` string keys! Using `for (const x of nums.slice(1, 1 + n))` ensures `x` is strictly `number`.',
        ],
        banglaParagraphs: [
          'TypeScript-এ `for..of` দিয়ে অ্যারের প্রকৃত `number` উপাদান নিয়ে `continue` প্রয়োগ করলে টাইপ এরর বা স্ট্রিং যোগের কোনো সুযোগ থাকে না।',
        ],
        memoryDiagram: `nums=[5,2,5,8,7,3] -> slice(1,6) -> oddSum=15`,
        code: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0] ?? 0;
let oddSum: number = 0;
for (const x of nums.slice(1, 1 + n)) {
  if (x % 2 === 0) continue;
  oddSum += x;
}
console.log(oddSum);`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'for (const x of nums.slice(1, 1 + n)) {', whatItMeans: 'Iterates typed number elements cleanly.', whyItIsThere: 'Type-safe iteration avoiding for..in string keys.', ifDeletedError: 'Cannot iterate elements cleanly.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'let sum: number = 0;', whatItMeans: 'Typed numeric accumulator outside loop.', whyItIsThere: 'Preserves sum across iterations.', ifDeletedError: 'Compile error: sum not found.' },
      { lineNumber: 'Line 2', codeSnippet: 'for (let i: number = 1; i <= 5; i++) {', whatItMeans: 'Block-scoped loop counter 1..5.', whyItIsThere: 'Drives exact 5 iterations.', ifDeletedError: 'No iteration.' },
      { lineNumber: 'Line 3', codeSnippet: 'sum += i;', whatItMeans: 'Adds i to running total.', whyItIsThere: 'Computes 1..5 sum.', ifDeletedError: 'Logs sum=0.' },
      { lineNumber: 'Line 5', codeSnippet: 'console.log(`sum=${sum}`);', whatItMeans: 'Prints formatted result after loop.', whyItIsThere: 'Outputs final sum.', ifDeletedError: 'Empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'sum=0, i=1', memoryOrStack: 'sum=0', note: '1<=5 true' },
      { step: 2, state: 'i=1..3', memoryOrStack: 'sum=6', note: '0+1+2+3' },
      { step: 3, state: 'i=4..5', memoryOrStack: 'sum=15', note: 'i becomes 6 -> exit' },
      { step: 4, state: 'console.log', memoryOrStack: 'stdout="sum=15"', note: 'Done' },
    ],
    harryBugTraps: [
      { title: 'Forgetting Math.trunc in Digit Loops (x /= 10)', brokenCode: 'let x = 123; while (x > 0) x /= 10; // underflows slowly!', fixedCode: 'while (x > 0) x = Math.trunc(x / 10);', whyItBreaks: 'TS number is a 64-bit float; dividing by 10 does not truncate decimals.' },
      { title: 'Using for..in on Typed number[] Array', brokenCode: 'for (const k in nums) sum += k; // TS error: string + number!', fixedCode: 'for (const x of nums) sum += x;', whyItBreaks: 'for..in iterates string property keys rather than numeric element values.' },
      { title: 'Infinite Loop With Floating Step (x += 0.1)', brokenCode: 'for (let x = 0; x !== 1.0; x += 0.1) {}', fixedCode: 'for (let i = 0; i < 10; i++) {}', whyItBreaks: '0.1 binary rounding skips 1.0 exactly.' },
    ],
    practiceSheet: [
      { id: 'ts-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via Loop', prompt: 'Read n (0..20) and print n!.', banglaHint: 'let f: number = 1; দিয়ে 2..n পর্যন্ত গুণ করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet f: number = 1; for (let i: number = 2; i <= n; i++) f *= i;\nconsole.log(f);`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'ts-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits With Math.trunc', prompt: 'Read non-negative integer n and output reversed number.', banglaHint: 'Math.trunc(n / 10) দিয়ে অঙ্ক সরাও।', starterCode: `import * as fs from 'fs';\nlet n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet rev: number = 0;\ndo { rev = rev * 10 + (n % 10); n = Math.trunc(n / 10); } while (n > 0);\nconsole.log(rev);`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'ts-ch-7-q3', difficulty: 'Medium', title: '3. Sum of Digits', prompt: 'Read non-negative integer n and print digit sum.', banglaHint: 'while (n > 0) লুপে n % 10 যোগ করো।', starterCode: `import * as fs from 'fs';\nlet n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet s: number = 0; while (n > 0) { s += n % 10; n = Math.trunc(n / 10); }\nconsole.log(s);`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'ts-ch-7-q4', difficulty: 'Medium', title: '4. Filtered Maximum Among Evens', prompt: 'Read n and n ints; print max even int or -1.', banglaHint: 'number | null ও continue ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst arr: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet mx: number | null = null;\nfor (const x of arr.slice(1, 1 + arr[0])) {\n  if (x % 2 !== 0) continue;\n  if (mx === null || x > mx) mx = x;\n}\nconsole.log(mx ?? -1);`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'ts-ch-7-q5', difficulty: 'Hard', title: '5. O(sqrt(n)) Prime Checker', prompt: 'Read n and output PRIME or COMPOSITE.', banglaHint: 'd * d <= n ও break ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet ok: boolean = n >= 2;\nfor (let d: number = 2; d * d <= n; d++) if (n % d === 0) { ok = false; break; }\nconsole.log(ok ? "PRIME" : "COMPOSITE");`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'TypeScript 5.x Digit Counter & Loop Engine',
      description: 'Counts digits reliably including 0 via Math.trunc inside typed do-while.',
      banglaGoal: 'টাইপড do-while ও Math.trunc দিয়ে অঙ্ক-গণক তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `import * as fs from 'fs';

let x: number = Math.abs(Math.trunc(Number(fs.readFileSync(0, 'utf8').trim())));
let digits: number = 0;
do { digits++; x = Math.trunc(x / 10); } while (x > 0);
console.log(\`digits=\${digits}\`);`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `import * as fs from 'fs';

let x: number = Math.abs(Math.trunc(Number(fs.readFileSync(0, 'utf8').trim())));
let digits: number = 0;
do { digits++; x = Math.trunc(x / 10); } while (x > 0);
console.log(\`digits=\${digits}\`);`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'ts7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'ts7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },
  8: {
    chapterNumber: 8,
    title: 'TypeScript Chapter 8 (TS 5.x): Nested Loops, Patterns & Typed Grids',
    banglaTitle: 'TypeScript অধ্যায় ৮ (TS 5.x): নেস্টেড লুপ, প্যাটার্ন ও টাইপড গ্রিড',
    subtitle: 'Strict string[] row buffers, 2D matrix coordinates, and labeled outer breaks.',
    zeroIntuition: {
      plainEnglishStory:
        'A nested loop models two orthogonal axes at once: the outer loop `i` sweeps rows top-to-bottom while inner loops sweep leading spaces, stars, or matrix columns `j` left-to-right.\n\nIn strict TypeScript, annotating `const rows: string[] = [];` ensures only formatted lines enter the output array, and pushing one finished line per row before `console.log(rows.join("\\n"))` avoids premature newlines from multiple `console.log` calls.',
      asciiFlowchart: `Outer loop i = 1 .. N (Rows)
   |
   +--> Inner spaces: 1 .. (n - i)
   +--> Inner stars : 1 .. (2*i - 1)
   +--> rows.push(line) -> console.log(rows.join("\\n"))`,
      pseudocode: [
        '1. DECLARE rows: string[] buffer',
        '2. LOOP row index i from 1 to N',
        '3. BUILD typed row string inside inner loops',
        '4. PUSH row into rows and print rows.join("\\n") once',
        '5. USE outer: label when breaking early from 2D search',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দালানের তলা-কামরা ও টাইপড রো-বাফার',
        explanation:
          'সিনেমা হলের আসনের মতো: বাইরের লুপ `i` ঠিক করে তুমি কত নম্বর সারিতে আছো, আর ভেতরের লুপ `j` ওই সারির প্রতিটি ঘর পূরণ করে। TypeScript-এ `const rows: string[] = []` ব্যবহার করলে ভুল করে সংখ্যা বা `undefined` রো-বাফারে ঢোকার সুযোগ থাকে না। প্রতিটি স্টারের জন্য `console.log` করলে লাইন ভেঙে যায় বলে আগে পুরো সারির স্ট্রিং বানিয়ে `rows.push(line)` করতে হয়, এবং শেষে `console.log(rows.join("\\n"))` দিয়ে সব লাইন একসাথে প্রিন্ট করা হয়। পিরামিড আঁকতে চাইলে প্রতিটি সারি `i`-তে `n - i`টি স্পেস এবং `2*i - 1`টি তারা দিতে হয়। এছাড়া 2D গ্রিড সার্চে প্রথম ম্যাচ পাওয়ামাত্র বের হতে `outer: for` লেবেল ও `break outer;` দারুণ কাজ করে। তবে ইনপুট সাইজ `N` বড় হলে `N * N` সময়ে TLE হতে পারে—তাই প্যাটার্ন ও ছোট ম্যাট্রিক্স (`N <= 1000`) ছাড়া বড় গ্রিডে অকারণ নেস্টেড লুপ এড়িয়ে চলবে। সবসময় কাগজে সারি `i` বনাম স্পেস-তারার হিসাব মিলিয়ে কোড লিখলে প্রথম চেষ্টাতেই নিখুঁত প্যাটার্ন তৈরি হবে।',
        everydayExample:
          'এক্সেল শিটের মতো: সারি (Row `i`) আর কলাম (`j`)—এই দুই স্থানাঙ্ক জানলেই টেবিলের যেকোনো সেলে পৌঁছানো যায়।',
        keyTakeaways: [
          '`const rows: string[] = []` দিয়ে সব সারি জমিয়ে শেষে `rows.join("\\n")` করবে।',
          'ভেতরের লুপের সাথে বাইরের `i`-এর গাণিতিক সম্পর্কই ত্রিভুজ বা পিরামিড বানায়।',
          '`outer:` লেবেল দিয়ে নেস্টেড লুপ থেকে একসাথে বের হওয়া যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed Right Triangle Builder',
        englishParagraphs: [
          'Annotating `const rows: string[] = []` catches accidental non-string pushes at compile time.',
          'Inner loop `j <= i` grows row width linearly from `1` up to `n`.',
        ],
        banglaParagraphs: [
          '`rows: string[]` টাইপ থাকায় ভুল ডেটা ঢোকার আগেই কম্পাইলার সতর্ক করে দেয়।',
          'প্রতি সারিতে `i` সংখ্যক `*` যোগ হয়ে সুন্দর সমকোণী ত্রিভুজ তৈরি হয়।',
        ],
        memoryDiagram: `i=1:"*" | i=2:"**" | i=3:"***" | i=4:"****"`,
        code: `const n: number = 4;
const rows: string[] = [];
for (let i: number = 1; i <= n; i++) {
  let line: string = '';
  for (let j: number = 1; j <= i; j++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const rows: string[] = [];', whatItMeans: 'Typed array storing completed lines.', whyItIsThere: 'Buffers lines before single stdout print.', ifDeletedError: 'Cannot call rows.push.' },
          { lineNumber: 'Line 5', codeSnippet: 'for (let j: number = 1; j <= i; j++) line += \'*\';', whatItMeans: 'Inner loop appending i stars.', whyItIsThere: 'Row length tracks row number.', ifDeletedError: 'Blank strings pushed.' },
        ],
      },
      {
        id: 'ts-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid Driven by Stdin',
        englishParagraphs: [
          'Parsing `n` from stdin drives `n - i` leading spaces and `2*i - 1` stars cleanly.',
          'All variables carry explicit primitive annotations matching TS 5 strict checks.',
        ],
        banglaParagraphs: [
          'ইনপুট `n` পড়ে প্রতি সারিতে `n - i`টি ফাঁকা ঘর ও `2*i - 1`টি তারা বসানো হয়েছে।',
          'সব ভ্যারিয়েবলে স্পষ্ট টাইপ টীকা রয়েছে।',
        ],
        memoryDiagram: `n=3 -> ["  *", " ***", "*****"]`,
        code: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
const rows: string[] = [];
for (let i: number = 1; i <= n; i++) {
  let line: string = '';
  for (let s: number = 1; s <= n - i; s++) line += ' ';
  for (let k: number = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (let s: number = 1; s <= n - i; s++) line += \' \';', whatItMeans: 'Prepends alignment spaces.', whyItIsThere: 'Centers star triangle symmetrically.', ifDeletedError: 'Triangle aligns flush left.' },
        ],
      },
      {
        id: 'ts-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed 2D Grid Search With Labeled Break',
        englishParagraphs: [
          'Iterating `(i, j)` pairs inside a labeled `outer:` loop finds the first matching product cleanly without boolean sentinel flags.',
          'Once found, `break outer;` exits immediately.',
        ],
        banglaParagraphs: [
          '`outer:` লেবেল ব্যবহার করে প্রথম শর্ত-মেলানো `(i, j)` জোড়াটি পাওয়ামাত্র উভয় লুপ বন্ধ করা যায়।',
          'অতিরিক্ত boolean ফ্ল্যাগ ছাড়াই কোড ছোট থাকে।',
        ],
        memoryDiagram: `(2,3) -> 2*3===6 -> found="2,3" -> break outer`,
        code: `let found: string = '';
outer: for (let i: number = 2; i <= 5; i++) {
  for (let j: number = 2; j <= 5; j++) {
    if (i * j === 6) {
      found = \`\${i},\${j}\`;
      break outer;
    }
  }
}
console.log(found);`,
        stdin: '',
        expectedOutput: '2,3',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'outer: for (let i: number = 2; i <= 5; i++) {', whatItMeans: 'Attaches label to outer loop.', whyItIsThere: 'Enables multi-loop break.', ifDeletedError: 'break outer becomes invalid label error.' },
        ],
      },
      {
        id: 'ts-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Row Buffer Reset Trap vs Digit Triangle',
        englishParagraphs: [
          'Forgetting to reset `let line = \'\'` inside the outer loop appends prior rows onto subsequent rows.',
          'Scoped `const row: number[] = []` inside the outer loop resets cleanly every iteration.',
        ],
        banglaParagraphs: [
          'বাইরের লুপের ভেতরে রো-বাফার রিসেট করতে ভুলে গেলে আগের সারির লেখা পরের সারিতেও জুড়ে যায়।',
          'প্রতি সারির শুরুতে নতুন লোকাল `row` নিলে কখনো পুরোনো ডেটা মিশে যায় না।',
        ],
        memoryDiagram: `i=1:[1] | i=2:[1,2] | i=3:[1,2,3]`,
        code: `const rows: string[] = [];
for (let i: number = 1; i <= 3; i++) {
  const row: number[] = [];
  for (let j: number = 1; j <= i; j++) row.push(j);
  rows.push(row.join(''));
}
console.log(rows.join('\\n'));`,
        stdin: '',
        expectedOutput: '1\n12\n123',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'const row: number[] = [];', whatItMeans: 'Fresh typed digit buffer scoped per row.', whyItIsThere: 'Prevents bleeding digits across rows.', ifDeletedError: 'Previous row digits accumulate.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'const rows: string[] = [];', whatItMeans: 'Typed array collecting formatted output lines.', whyItIsThere: 'Joins lines cleanly once at the end.', ifDeletedError: 'Cannot push rows.' },
      { lineNumber: 'Line 3', codeSnippet: 'for (let i: number = 1; i <= n; i++) {', whatItMeans: 'Outer row loop 1..n.', whyItIsThere: 'Controls triangle height.', ifDeletedError: 'Single line only.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (let j: number = 1; j <= i; j++) line += \'*\';', whatItMeans: 'Inner star loop.', whyItIsThere: 'Builds i stars on row i.', ifDeletedError: 'Blank lines pushed.' },
      { lineNumber: 'Line 8', codeSnippet: 'console.log(rows.join(\'\\n\'));', whatItMeans: 'Emits full multi-line triangle.', whyItIsThere: 'Avoids extra per-character newlines.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i = 1', memoryOrStack: 'line="*"', note: 'rows=["*"]' },
      { step: 2, state: 'i = 2', memoryOrStack: 'line="**"', note: 'rows=["*","**"]' },
      { step: 3, state: 'i = 3', memoryOrStack: 'line="***"', note: 'rows=["*","**","***"]' },
      { step: 4, state: 'i = 4', memoryOrStack: 'line="****"', note: 'Emits 4 rows' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Leaking line Variable Across Outer Iterations', brokenCode: `let line=''; for(let i=1;i<=3;i++){ for(let j=1;j<=i;j++) line+='*'; }`, fixedCode: `for(let i=1;i<=3;i++){ let line=''; for(let j=1;j<=i;j++) line+='*'; }`, whyItBreaks: 'Moving line outside accumulates stars from earlier rows into every new row.' },
      { title: 'Trap 2: console.log Inside Column Loop', brokenCode: `for(let j=1;j<=i;j++) console.log('*');`, fixedCode: `let s=''; for(let j=1;j<=i;j++) s+='*'; console.log(s);`, whyItBreaks: 'console.log prints a newline on every call instead of staying on one row.' },
      { title: 'Trap 3: Shadowing Outer i in Inner Loop', brokenCode: `for(let i=0;i<3;i++) for(let i=0;i<3;i++) {}`, fixedCode: `for(let i=0;i<3;i++) for(let j=0;j<3;j++) {}`, whyItBreaks: 'Inner let i shadows outer i, making row index impossible to reference.' },
    ],
    practiceSheet: [
      { id: 'ts-ch8-p1', difficulty: 'Easy', title: 'N×N Typed Star Box', prompt: 'Print an N×N square of `*`.', banglaHint: 'ডবল লুপ বা `\'*\'.repeat(n)` দিয়ে `string[]` পূরণ করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst rows: string[] = [];\nfor (let i: number = 0; i < n; i++) rows.push('*'.repeat(n));\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '***\n***\n***' },
      { id: 'ts-ch8-p2', difficulty: 'Easy', title: 'Inverted Triangle', prompt: 'Print N down to 1 stars per row.', banglaHint: 'সারি `n` থেকে `1` পর্যন্ত কমাও।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst rows: string[] = [];\nfor (let i: number = n; i >= 1; i--) rows.push('*'.repeat(i));\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'ts-ch8-p3', difficulty: 'Medium', title: 'Digit Triangle 1..i', prompt: 'Print `1` on row 1, `12` on row 2, up to N.', banglaHint: 'ভেতরের লুপ `1..i` চালিয়ে `s += j` করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst rows: string[] = [];\nfor (let i: number = 1; i <= n; i++) { let s: string = ''; for (let j: number = 1; j <= i; j++) s += j; rows.push(s); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'ts-ch8-p4', difficulty: 'Medium', title: 'Floyd Counter Triangle', prompt: 'Print sequential numbers 1, 2 3, 4 5 6 across N rows.', banglaHint: 'বাইরে `let k: number = 1` রাখো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet k: number = 1; const rows: string[] = [];\nfor (let i: number = 1; i <= n; i++) { const r: number[] = []; for (let j: number = 1; j <= i; j++) r.push(k++); rows.push(r.join(' ')); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '1\n2 3\n4 5 6' },
      { id: 'ts-ch8-p5', difficulty: 'Hard', title: 'Checkerboard Parity Grid', prompt: 'Print N×N grid alternating `1` and `0` using `(i + j) % 2`.', banglaHint: '`(i + j) % 2 === 0` হলে `1` নতুবা `0` বসাও।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst rows: string[] = [];\nfor (let i: number = 0; i < n; i++) { let s: string = ''; for (let j: number = 0; j < n; j++) s += (i + j) % 2 === 0 ? '1' : '0'; rows.push(s); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '101\n010\n101' },
    ],
    miniBuild: {
      title: 'Mini-Build: Strict Typed Star Pyramid',
      description: 'Parse N and build a centered star pyramid in a strict string[] array buffer.',
      banglaGoal: 'টাইপড নেস্টেড লুপ দিয়ে নিখুঁত পিরামিড আউটপুট তৈরি করো।',
      combinesChapters: 'TS Ch 1–8',
      starterCode: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
const rows: string[] = [];
for (let i: number = 1; i <= n; i++) {
  let line: string = '';
  for (let s: number = 1; s <= n - i; s++) line += ' ';
  for (let k: number = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
      sampleStdin: '3',
      expectedOutput: '  *\n ***\n*****',
    },
    starterCode: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
const rows: string[] = [];
for (let i: number = 1; i <= n; i++) {
  let line: string = '';
  for (let s: number = 1; s <= n - i; s++) line += ' ';
  for (let k: number = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
    sampleStdin: '3',
    expectedSampleOutput: '  *\n ***\n*****',
    testCases: [
      { id: 'ts8-t1', input: '3', expectedOutput: '  *\n ***\n*****' },
      { id: 'ts8-t2', input: '2', expectedOutput: ' *\n***', isHidden: true },
    ],
  },
  9: {
    chapterNumber: 9,
    title: 'TypeScript Chapter 9 (TS 5.x): Typed Functions, Signatures & Scope',
    banglaTitle: 'TypeScript অধ্যায় ৯ (TS 5.x): টাইপড ফাংশন, সিগনেচার ও স্কোপ',
    subtitle: 'Strict parameter/return annotations, optional/default params, closures, and type guards.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript adds compile-time parameter and return contracts on top of JavaScript’s first-class functions: `function gcd(a: number, b: number): number`. If a caller passes a `string` by mistake or if one `if` branch forgets to return a `number`, `tsc` rejects the bug before your code ever executes.\n\nTyped default parameters (`rate: number = 0.1`), `void` helpers that deliberately return nothing, and typed closures (`(): number => ++count`) let you build expressive APIs while retaining strict block scoping (`const`/`let`) across call frames.',
      asciiFlowchart: `Call gcd(a: number, b: number): number
   |
   +--> TS Compiler checks argument types + return paths
   +--> Runtime pushes call frame -> computes Euclidean loop -> returns number`,
      pseudocode: [
        '1. ANNOTATE every parameter type and explicit return type (: number / : void)',
        '2. GUARD edge branches so every path returns the promised type',
        '3. USE default parameters (= 0.1) instead of brittle undefined checks',
        '4. KEEP closures and helper scopes cleanly typed',
      ],
      banglaZeroToHero: {
        analogyTitle: 'চুক্তিবদ্ধ রন্ধনশালা ও রিটার্ন গ্যারান্টি',
        explanation:
          'JavaScript-এ ফাংশনের ইনপুট বা আউটপুট ভুল হলে কোড রান করার পর ক্র্যাশ করে, কিন্তু TypeScript কোড লেখার মুহূর্তেই সেই ভুল ধরে ফেলে! প্রতিটি ফাংশনে `(a: number, b: number): number` এভাবে প্যারামিটার আর রিটার্ন টাইপ বেঁধে দিলে কম্পাইলার নিশ্চিত করে যে সব শর্তের শাখাই সঠিক টাইপ রিটার্ন করছে। কোনো ফাংশন শুধু প্রিন্ট করলে রিটার্ন টাইপ `: void` লিখতে হয়। যদি কোনো প্যারামিটার ঐচ্ছিক রাখতে চাও, তাহলে `rate: number = 0.1` ডিফল্ট ভ্যালু বা `tax?: number` অপশনাল প্যারামিটার ব্যবহার করা যায়—তবে `tax?` নিলে ব্যবহারের আগে `tax ?? 0` দিয়ে নিরাপদ করতে হয়। আধুনিক TS 5-এ অ্যারো ফাংশন `const sq = (x: number): number => x * x` খুব পরিষ্কার দেখায়, এবং ক্লোজারের ভেতরের ভ্যারিয়েবলও পূর্ণ টাইপ-সেফটি পায়। বড় প্রোগ্রামকে ছোট ছোট টাইপড `gcd`, `lcm`, বা `clamp` ফাংশনে ভাগ করলে কোড যেমন সুন্দর হয়, তেমনি বাগ হওয়ার সম্ভাবনাও শূন্যে নেমে আসে।',
        everydayExample:
          'ব্যাংকের ফরমের নির্দিষ্ট ঘরের মতো: "নম্বর" ঘরে অক্ষর লিখলে জমা নেওয়ার আগেই লাল দাগ দেখিয়ে আটকে দেয়।',
        keyTakeaways: [
          'সব প্যারামিটার ও রিটার্ন টাইপ (`: number`, `: boolean`, `: void`) স্পষ্টভাবে লিখবে।',
          'একটি শাখায় `return` ভুলে গেলে TypeScript সাথে সাথে কম্পাইল এরর দেয়।',
          'অপশনাল প্যারামিটার `x?: number`-এর সাথে Nullish Coalescing `x ?? 0` ব্যবহার করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strict Typed Arrow & Declaration Functions',
        englishParagraphs: [
          'Annotating both parameters and return type (`(x: number): number => x * x`) catches silent `any` leaks under `strict` mode.',
          'Explicit signatures document the exact function contract cleanly.',
        ],
        banglaParagraphs: [
          'অ্যারো ও সাধারণ উভয় ফাংশনেই প্যারামিটার এবং রিটার্ন টাইপ লিখে দিলে `strict` মোডে কোনো `any` ফাঁক থাকে না।',
          'ভুল টাইপ পাস করলে রান করার আগেই ধরা পড়ে।',
        ],
        memoryDiagram: `square(7) -> 49 | cube(3) -> 27`,
        code: `const square = (x: number): number => x * x;
function cube(x: number): number {
  return x * x * x;
}
console.log(\`\${square(7)} \${cube(3)}\`);`,
        stdin: '',
        expectedOutput: '49 27',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const square = (x: number): number => x * x;', whatItMeans: 'Typed arrow function returning number.', whyItIsThere: 'Prevents implicit any parameter.', ifDeletedError: 'square undefined.' },
          { lineNumber: 'Line 3', codeSnippet: 'return x * x * x;', whatItMeans: 'Returns typed cube.', whyItIsThere: 'Satisfies : number contract.', ifDeletedError: 'TS2355: Function lacks ending return.' },
        ],
      },
      {
        id: 'ts-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed Euclidean GCD & Overflow-Safe LCM',
        englishParagraphs: [
          'Composing typed `gcd(a, b)` inside `lcm(a, b)` splits division before multiplication cleanly.',
          'Tuple destructuring `const [a, b]` extracts typed numbers from parsed stdin.',
        ],
        banglaParagraphs: [
          'টাইপড `gcd` ও `lcm` ফাংশন আলাদা করলে কোড পরিচ্ছন্ন ও পুনর্ব্যবহারযোগ্য হয়।',
          'গুণ করার আগে ভাগ করলে নির্ভুল মান পাওয়া যায়।',
        ],
        memoryDiagram: `gcd(24,36)->12 | lcm=(24/12)*36=72`,
        code: `import * as fs from 'fs';

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t: number = a % b;
    a = b;
    b = t;
  }
  return a;
}

const lcm = (a: number, b: number): number =>
  a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b;

const parts: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(parts[0], parts[1])} lcm=\${lcm(parts[0], parts[1])}\`);`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'function gcd(a: number, b: number): number {', whatItMeans: 'Typed Euclidean GCD signature.', whyItIsThere: 'Enforces numeric arguments and return.', ifDeletedError: 'lcm fails to resolve gcd.' },
        ],
      },
      {
        id: 'ts-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Closure Counter & Default Params',
        englishParagraphs: [
          'A factory returning `() => number` keeps `count: number` completely encapsulated inside a typed closure.',
          'Default `start: number = 0` lets callers omit the initial seed safely.',
        ],
        banglaParagraphs: [
          'রিটার্ন টাইপ `() => number` দিলে ক্লোজারটি যে প্রতিবার সংখ্যা ফেরত দেবে তা টাইপসিস্টেমে নিশ্চিত থাকে।',
          'ডিফল্ট প্যারামিটার `start: number = 0` থাকলে আর্গুমেন্ট ছাড়াও কল করা যায়।',
        ],
        memoryDiagram: `makeCounter(10) -> () => number closure`,
        code: `function makeCounter(start: number = 0): () => number {
  let count: number = start;
  return (): number => ++count;
}
const c = makeCounter(10);
console.log(c(), c());`,
        stdin: '',
        expectedOutput: '11 12',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'function makeCounter(start: number = 0): () => number {', whatItMeans: 'Declares function returning a zero-arg numeric callback.', whyItIsThere: 'Guarantees return value type of counter calls.', ifDeletedError: 'Counter factory missing.' },
        ],
      },
      {
        id: 'ts-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Optional Parameter undefined Trap vs Nullish Fallback',
        englishParagraphs: [
          'Using an optional parameter `bonus?: number` without checking makes `base + bonus` a strict compile error (`bonus is possibly undefined`)!',
          'Applying `bonus ?? 0` resolves the `number | undefined` union cleanly.',
        ],
        banglaParagraphs: [
          'অপশনাল প্যারামিটার `bonus?: number` সরাসরি যোগ করতে গেলে TypeScript আটকে দেবে কারণ মানটি `undefined` হতে পারে।',
          '`bonus ?? 0` ব্যবহার করলে `undefined` নিরাপদভাবে `0`-এ রূপান্তরিত হয়।',
        ],
        memoryDiagram: `bonus?: number -> number | undefined -> (bonus ?? 0) -> number`,
        code: `function finalScore(base: number, bonus?: number): number {
  return base + (bonus ?? 0);
}
console.log(\`\${finalScore(80)} \${finalScore(80, 15)}\`);`,
        stdin: '',
        expectedOutput: '80 95',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'return base + (bonus ?? 0);', whatItMeans: 'Safely narrows optional number using nullish coalescing.', whyItIsThere: 'Prevents NaN and satisfies strictNullChecks.', ifDeletedError: 'TS18048: bonus is possibly undefined.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const square = (x: number): number => x * x;', whatItMeans: 'Typed arrow function mapping number to number.', whyItIsThere: 'Prevents implicit any under strict TypeScript.', ifDeletedError: 'square undefined.' },
      { lineNumber: 'Line 2', codeSnippet: 'function cube(x: number): number {', whatItMeans: 'Named typed function declaration.', whyItIsThere: 'Documents strict parameter and return contract.', ifDeletedError: 'cube undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'return x * x * x;', whatItMeans: 'Returns numeric product to caller.', whyItIsThere: 'Satisfies : number return annotation.', ifDeletedError: 'Compile error TS2355.' },
    ],
    dryRunTable: [
      { step: 1, state: 'call square(7)', memoryOrStack: 'frame{x:7}', note: '7 * 7 = 49' },
      { step: 2, state: 'pop square', memoryOrStack: 'return 49', note: 'Stack frame released' },
      { step: 3, state: 'call cube(3)', memoryOrStack: 'frame{x:3}', note: '3 * 3 * 3 = 27' },
      { step: 4, state: 'print "49 27"', memoryOrStack: 'stdout', note: 'Clean exit' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Implicit any Parameters Under strict Mode', brokenCode: `const dbl = (x) => x * 2; // TS7006 error`, fixedCode: `const dbl = (x: number): number => x * 2;`, whyItBreaks: 'Strict TypeScript forbids unannotated parameters defaulting to any.' },
      { title: 'Trap 2: Using Optional Parameter Without Narrowing', brokenCode: `function f(a: number, b?: number): number { return a + b; }`, fixedCode: `function f(a: number, b?: number): number { return a + (b ?? 0); }`, whyItBreaks: 'b has type number | undefined and cannot be added to number directly.' },
      { title: 'Trap 3: Missing Return Path in Typed Function', brokenCode: `function tag(n: number): string { if (n > 0) return "POS"; }`, fixedCode: `function tag(n: number): string { return n > 0 ? "POS" : "NONPOS"; }`, whyItBreaks: 'Returning undefined implicitly fails : string contract.' },
    ],
    practiceSheet: [
      { id: 'ts-ch9-p1', difficulty: 'Easy', title: 'Typed max3 Helper', prompt: 'Write `max3(a: number, b: number, c: number): number`.', banglaHint: '`Math.max(a, b, c)` রিটার্ন করো।', starterCode: `import * as fs from 'fs';\nconst max3 = (a: number, b: number, c: number): number => Math.max(a, b, c);\nconst p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(max3(p[0], p[1], p[2]));`, sampleStdin: '4 19 7', expectedOutput: '19' },
      { id: 'ts-ch9-p2', difficulty: 'Easy', title: 'Default Tax Price', prompt: 'Write `total(price: number, rate: number = 0.1): number` rounding `price * (1 + rate)`.', banglaHint: 'ডিফল্ট `rate: number = 0.1` দাও।', starterCode: `import * as fs from 'fs';\nconst total = (price: number, rate: number = 0.1): number => Math.round(price * (1 + rate));\nconsole.log(total(Number(fs.readFileSync(0, 'utf8').trim())));`, sampleStdin: '200', expectedOutput: '220' },
      { id: 'ts-ch9-p3', difficulty: 'Medium', title: 'Typed Closure Stepper', prompt: 'Create `makeStepper(step: number): () => number` incrementing from 0.', banglaHint: 'রিটার্ন টাইপ `: () => number` দাও।', starterCode: `import * as fs from 'fs';\nconst makeStepper = (s: number): () => number => { let v: number = 0; return (): number => (v += s); };\nconst step = makeStepper(Number(fs.readFileSync(0, 'utf8').trim()));\nconsole.log(step(), step());`, sampleStdin: '5', expectedOutput: '5 10' },
      { id: 'ts-ch9-p4', difficulty: 'Medium', title: 'GCD & LCM Pair', prompt: 'Implement typed `gcd` and `lcm` and print `gcd lcm`.', banglaHint: 'দুটি ফাংশনেই `: number` রিটার্ন রাখো।', starterCode: `import * as fs from 'fs';\nconst gcd = (a: number, b: number): number => { while (b !== 0) { const t: number = a % b; a = b; b = t; } return a; };\nconst lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;\nconst p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(\`\${gcd(p[0], p[1])} \${lcm(p[0], p[1])}\`);`, sampleStdin: '12 18', expectedOutput: '6 36' },
      { id: 'ts-ch9-p5', difficulty: 'Hard', title: 'Optional Bonus Scorer', prompt: 'Implement `score(base: number, bonus?: number): number` using `?? 0`.', banglaHint: '`(bonus ?? 0)` যোগ করে রিটার্ন করো।', starterCode: `import * as fs from 'fs';\nconst score = (base: number, bonus?: number): number => base + (bonus ?? 0);\nconst p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(p.length > 1 ? score(p[0], p[1]) : score(p[0]));`, sampleStdin: '80 15', expectedOutput: '95' },
    ],
    miniBuild: {
      title: 'Mini-Build: Typed GCD & LCM Utility',
      description: 'Read two integers and print GCD and overflow-safe LCM using strict typed functions.',
      banglaGoal: 'টাইপড ফাংশন দিয়ে নির্ভুল GCD ও LCM ক্যালকুলেটর তৈরি করো।',
      combinesChapters: 'TS Ch 1–9',
      starterCode: `import * as fs from 'fs';

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t: number = a % b;
    a = b;
    b = t;
  }
  return a;
}

const lcm = (a: number, b: number): number =>
  a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b;

const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(p[0], p[1])} lcm=\${lcm(p[0], p[1])}\`);`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `import * as fs from 'fs';

function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t: number = a % b;
    a = b;
    b = t;
  }
  return a;
}

const lcm = (a: number, b: number): number =>
  a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b;

const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(p[0], p[1])} lcm=\${lcm(p[0], p[1])}\`);`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'ts9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'ts9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'TypeScript Chapter 10 (TS 5.x): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'TypeScript অধ্যায় ১০ (TS 5.x): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'V8 JIT scaling, typed Set<number>/Map<K,V> O(1) lookups, bigint safety, and avoiding O(N^2) traps.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O describes how operations grow as input `N` scales from `10` to `200,000`. Even with V8 JIT compiling hot loops (`~5×10^7` ops/sec), an `O(N^2)` loop on `N = 100,000` executes `10^10` steps and hits TLE, whereas `O(1)` Gaussian summation or `O(N)` `Set<number>` lookups execute in milliseconds.\n\nWatch two TypeScript-specific pitfalls: calling `arr.includes(x)` or `arr.shift()` inside loops turns linear algorithms into `O(N^2)`, and `number` loses exact integer bits past `2^53 - 1` (`Number.MAX_SAFE_INTEGER`)—use `bigint` (`1n`) whenever modular products exceed `~9e15`.',
      asciiFlowchart: `N = 100,000 (Judge 1s budget ≈ 5×10^7–10^8 ops)
   |
   +--> O(N^2) nested / .includes()  : 10^10 ops  ==> TLE!
   +--> O(N log N) .sort((a,b)=>a-b) : 1.7×10^6   ==> AC!
   +--> O(N) Set<number> pass        : 10^5 ops   ==> Instant AC!
   +--> O(1) Gaussian algebra        : 3 ops      ==> <1ms AC!`,
      pseudocode: [
        '1. INSPECT constraint N before writing nested loops',
        '2. REPLACE array.includes/indexOf in loops with typed Set<T> / Map<K, V>',
        '3. COMPUTE arithmetic series in O(1) algebra dividing even factor first',
        '4. USE bigint literals (1n) for exact modular powers beyond 2^53 - 1',
      ],
      banglaZeroToHero: {
        analogyTitle: 'V8 ইঞ্জিনের সময় বাজেট ও টাইপড সেটের গতি',
        explanation:
          'ধরো ১ লাখ মানুষের সবাই সবার সাথে হাত মেলালে (`O(N^2)`) প্রায় এক হাজার কোটি ধাপ লাগে যা যেকোনো জাজে TLE খাবে, অথচ `n * (n - 1) / 2` লিখলে মাত্র `O(1)` সময়েই উত্তর চলে আসে! TypeScript শেষে V8 জাভাস্ক্রিপ্ট হিসেবেই চলে, তাই `N = 10^5` হলে `O(N^2)` লুপ চালানো যাবে না। এখানে দুটি গোপন ফাঁদ আছে: লুপের ভেতর `arr.includes(x)` বা `arr.shift()` লিখলে প্রতি ধাপে `O(N)` খরচ হয়ে কোড গোপনে `O(N^2)` হয়ে যায়—তার বদলে সবসময় `Set<number>` বা `Map<number, number>` ব্যবহার করলে খোঁজা হয় `O(1)` সময়ে! আরেকটি জরুরি বিষয় হলো TypeScript-এ সাধারণ `number` কেবল `9×10^15` (`2^53 - 1`) পর্যন্ত নিখুঁত থাকে; এর চেয়ে বড় গুণফল বা মডুলার পাওয়ারের জন্য `bigint` (`100000n`) নিতে হয়। এছাড়া ভাজক গণনা বা প্রাইম চেক করার সময় `d * d <= n` চালালে `O(N)` কাজ কমে `O(sqrt(N))` হয়ে যায়। কোড লেখার আগেই প্রশ্নের সর্বোচ্চ `N` দেখে টাইম কমপ্লেক্সিটি হিসাব করা চ্যাম্পিয়ন হওয়ার মূল মন্ত্র।',
        everydayExample:
          '১ লাখ নাম খাতায় পাতা উল্টে খোঁজা `O(N)`, আর টাইপড হ্যাশ-সেটের (`Set<string>`) সূচি দেখে সরাসরি পাওয়া `O(1)`।',
        keyTakeaways: [
          'লুপে `Array.includes`/`shift` বাদ দিয়ে `Set<T>` বা `Map<K,V>` (`O(1)`) ব্যবহার করো।',
          '`2^53 - 1`-এর বড় পূর্ণসংখ্যায় `bigint` (`1n`) ব্যবহার করলে প্রিসিশন হারায় না।',
          'ভাজক ও প্রাইম পরীক্ষায় `d * d <= n` (`O(sqrt(N))`) নিয়ম কাজে লাগাও।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) Safe Integer Sum vs Loop',
        englishParagraphs: [
          'Dividing the even term first computes `1 + 2 + ... + N` in constant `O(1)` operations with zero loop overhead.',
          'TypeScript verifies arithmetic expressions cleanly as strict `number`.',
        ],
        banglaParagraphs: [
          'জোড় সংখ্যাটি আগে ২ দিয়ে ভাগ করে নিলে নিরাপদ রেঞ্জের ভেতরেই মাত্র `O(1)` সময়ে যোগফল পাওয়া যায়।',
          'কোনো লুপ ছাড়াই ৫০০০০৫০০০০ প্রিন্ট হয়।',
        ],
        memoryDiagram: `n=100000 -> (100000/2)*100001 = 5000050000 (O(1))`,
        code: `const n: number = 100000;
const ans: number = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
console.log(ans);`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const ans: number = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Constant-time Gaussian summation.', whyItIsThere: 'Replaces O(N) loop safely.', ifDeletedError: 'ans undefined.' },
        ],
      },
      {
        id: 'ts-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counter',
        englishParagraphs: [
          'Iterating `d` while `d * d <= n` counts every paired divisor `(d, n / d)` in `O(sqrt(N))` steps.',
          'Avoids floating-point `Math.sqrt` rounding uncertainty on huge integers.',
        ],
        banglaParagraphs: [
          '`d * d <= n` লুপ ব্যবহার করলে `10^12` পর্যন্ত সংখ্যার ভাজকও মাত্র `sqrt(N)` ধাপে পাওয়া যায়।',
          'পূর্ণসংখ্যা গুণ `d * d <= n` ফ্লোটিং-পয়েন্ট এরর এড়ায়।',
        ],
        memoryDiagram: `n=36 -> d=1,2,3,4,6 -> total 9 divisors`,
        code: `import * as fs from 'fs';

const n: number = Number(fs.readFileSync(0, 'utf8').trim());
let cnt: number = 0;
for (let d: number = 1; d * d <= n; d++) {
  if (n % d === 0) cnt += d * d === n ? 1 : 2;
}
console.log(cnt);`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (let d: number = 1; d * d <= n; d++) {', whatItMeans: 'Halts divisor search at integer sqrt(n).', whyItIsThere: 'O(sqrt(N)) scaling.', ifDeletedError: 'Takes O(N) steps.' },
        ],
      },
      {
        id: 'ts-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Set<number> O(1) Membership Check',
        englishParagraphs: [
          'Using `new Set<number>(...)` turns repeated membership lookups from `O(N)` linear scans into `O(1)` hash lookups.',
          'Type arguments enforce that only numbers can be queried cleanly.',
        ],
        banglaParagraphs: [
          '`Set<number>` ব্যবহার করলে যেকোনো মান আছে কি না তা `O(1)` সময়েই জানা যায়।',
          'অ্যারে-তে `includes` চালানোর তুলনায় এটি বহুগুণ দ্রুত।',
        ],
        memoryDiagram: `Set<number>([10,20,30,40]).has(q) -> O(1) lookup`,
        code: `const pool = new Set<number>([10, 20, 30, 40]);
const queries: number[] = [15, 20, 40];
let hits: number = 0;
for (const q of queries) {
  if (pool.has(q)) hits++;
}
console.log(hits);`,
        stdin: '',
        expectedOutput: '2',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const pool = new Set<number>([10, 20, 30, 40]);', whatItMeans: 'Typed O(1) hash set.', whyItIsThere: 'Avoids quadratic .includes() loops.', ifDeletedError: 'pool undefined.' },
        ],
      },
      {
        id: 'ts-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'BigInt Binary Exponentiation O(log B)',
        englishParagraphs: [
          'Standard `number` squaring overflows `2^53 - 1` when multiplying two 30-bit values (`10^9 * 10^9 = 10^18`).',
          'Typed `bigint` parameters (`base: bigint, exp: bigint, mod: bigint`) stay 100% exact inside `modPow`.',
        ],
        banglaParagraphs: [
          'দুটি `10^9` সংখ্যা গুণ করলে `10^18` হয় যা সাধারণ `number`-এর `2^53` সীমা ভেঙে ফেলে।',
          'তাই `bigint` টাইপ ব্যবহার করলে `(base * base) % mod` শতভাগ নির্ভুল থাকে।',
        ],
        memoryDiagram: `modPow(2n, 10n, 1000000007n) -> 1024`,
        code: `function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res: bigint = 1n % mod;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
}
console.log(modPow(2n, 10n, 1000000007n).toString());`,
        stdin: '',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'function modPow(base: bigint, exp: bigint, mod: bigint): bigint {', whatItMeans: 'Typed arbitrary-precision modular power.', whyItIsThere: 'Prevents float precision corruption above 2^53.', ifDeletedError: 'Precision loss.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const n: number = 100000;', whatItMeans: 'Typed input bound N.', whyItIsThere: 'Represents 10^5 contest scale.', ifDeletedError: 'Undeclared n.' },
      { lineNumber: 'Line 2', codeSnippet: 'const ans: number = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'O(1) arithmetic series sum.', whyItIsThere: 'Eliminates O(N) loop entirely.', ifDeletedError: 'ans undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'console.log(ans);', whatItMeans: 'Prints exact 5000050000.', whyItIsThere: 'Emits result to judge.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'n % 2 === 0 -> true', note: 'Even parity branch selected' },
      { step: 2, state: 'n / 2 = 50000', memoryOrStack: '50000', note: 'Divide before multiply' },
      { step: 3, state: '50000 * 100001', memoryOrStack: '5000050000', note: 'Safe integer < 2^53' },
      { step: 4, state: 'log(ans)', memoryOrStack: 'O(1) ops', note: 'Instant completion' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Using Array.includes Inside O(N) Loop', brokenCode: `for (const q of queries) if (arr.includes(q)) hits++;`, fixedCode: `const set = new Set<number>(arr);\nfor (const q of queries) if (set.has(q)) hits++;`, whyItBreaks: 'arr.includes performs O(N) scan on every query, degrading to O(N^2).' },
      { title: 'Trap 2: Precision Loss Past Number.MAX_SAFE_INTEGER', brokenCode: `const bad: number = 1000000000 * 1000000000 % 1000000007;`, fixedCode: `const ok: bigint = 1000000000n * 1000000000n % 1000000007n;`, whyItBreaks: '10^18 exceeds 53 mantissa bits in IEEE-754 double, rounding low digits.' },
      { title: 'Trap 3: Repeated Array.shift() Queue Drain', brokenCode: `while (q.length > 0) { const x = q.shift(); }`, fixedCode: `let head = 0; while (head < q.length) { const x = q[head++]; }`, whyItBreaks: 'shift() copies remaining array elements every step (O(N^2)).' },
    ],
    practiceSheet: [
      { id: 'ts-ch10-p1', difficulty: 'Easy', title: 'O(1) Typed Sum 1..N', prompt: 'Read N and output `1 + ... + N` in O(1).', banglaHint: 'জোড় ফ্যাক্টর আগে ২ দিয়ে ভাগ করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconsole.log(n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2));`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'ts-ch10-p2', difficulty: 'Easy', title: 'O(sqrt(N)) Divisors', prompt: 'Count positive divisors of N.', banglaHint: '`d * d <= n` লুপ চালাও।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet c: number = 0;\nfor (let d: number = 1; d * d <= n; d++) if (n % d === 0) c += d * d === n ? 1 : 2;\nconsole.log(c);`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'ts-ch10-p3', difficulty: 'Medium', title: 'BigInt Modular Power', prompt: 'Compute `(A^B) % 1000000007` using `bigint` in O(log B).', banglaHint: '`bigint` ও `1n` ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst p: bigint[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\nlet a: bigint = p[0] % 1000000007n, b: bigint = p[1], r: bigint = 1n;\nconst m: bigint = 1000000007n;\nwhile (b > 0n) { if (b & 1n) r = (r * a) % m; a = (a * a) % m; b >>= 1n; }\nconsole.log(r.toString());`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'ts-ch10-p4', difficulty: 'Medium', title: 'O(1) Range Sum [L, R]', prompt: 'Compute sum from L to R in O(1).', banglaHint: '`pref(r) - pref(l - 1)` রিটার্ন করো।', starterCode: `import * as fs from 'fs';\nconst s = (n: number): number => (n <= 0 ? 0 : n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2));\nconst p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(s(p[1]) - s(p[0] - 1));`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'ts-ch10-p5', difficulty: 'Hard', title: 'Fast Prime Check O(sqrt(N))', prompt: 'Print `PRIME` or `COMPOSITE` for N.', banglaHint: '`n >= 2` এবং `d * d <= n` পর্যন্ত ভাগ পরীক্ষা করো।', starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nlet p: boolean = n >= 2;\nfor (let d: number = 2; p && d * d <= n; d++) if (n % d === 0) p = false;\nconsole.log(p ? 'PRIME' : 'COMPOSITE');`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Fast Range Sum Engine (Phase 1–2)',
      description: 'Combine guard checks, typed helpers, and O(1) algebra to compute [L, R] range sums immediately.',
      banglaGoal: 'গার্ড ক্লজ, টাইপড ফাংশন ও O(1) সূত্র মিলিয়ে দ্রুত রেঞ্জ-সাম প্রোগ্রাম তৈরি করো।',
      combinesChapters: 'TS Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `import * as fs from 'fs';

function prefixSum(n: number): number {
  if (n <= 0) return 0;
  return n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(p[0] > p[1] ? 0 : prefixSum(p[1]) - prefixSum(p[0] - 1));`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `import * as fs from 'fs';

function prefixSum(n: number): number {
  if (n <= 0) return 0;
  return n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

const p: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(p[0] > p[1] ? 0 : prefixSum(p[1]) - prefixSum(p[0] - 1));`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'ts10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'ts10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


