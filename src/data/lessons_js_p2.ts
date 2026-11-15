import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JS_P2: Record<number, AtomicLessonOverride> = {
  6: {
    chapterNumber: 6,
    title: 'JavaScript Chapter 6 (ES2025): Conditional Branching (if / else, switch & ===)',
    banglaTitle: 'JavaScript অধ্যায় ৬ (ES2025): কন্ডিশনাল ব্রাঞ্চিং (if / else, switch ও ===)',
    subtitle: 'Strict equality === vs == coercion traps, nullish ?? vs logical ||, guard clauses, and switch dispatch.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript conditional routing requires understanding TWO critical JS superpowers—and two famous traps! First, ALWAYS use strict equality `===` (and `!==`) instead of loose `==`, because `0 == ""` and `false == "0"` silently coerce types into confusing `true` results.\n\nSecond, distinguish logical OR `||` (falls back on ANY falsy value like `0` or `""`) from Nullish Coalescing `??` (falls back ONLY on `null` or `undefined`!). Combine guard clauses at the top of functions with clean `switch` break-blocks or lookup objects for crystal-clear branching.',
      asciiFlowchart: `  [ Input: rawScore ]
         |
         +--> (Number.isNaN(s) || s < 0 || s > 100) --YES--> "INVALID"
         |
        NO
         v
  [ s >= 90 ] --YES--> "A+" | else if [ s >= 80 ] --> "A" | else "Pass/Fail"`,
      pseudocode: [
        '1. READ and parse input via readAllStdin/fs shim',
        '2. GUARD NaN or out-of-range inputs with early checks',
        '3. COMPARE values strictly with === (never loose ==)',
        '4. USE ?? instead of || whenever 0 or "" is valid',
        '5. EMIT exact output via console.log()',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কঠোর পাসপোর্ট চেক (===) ও Nullish দারোয়ান (??)',
        explanation:
          'JavaScript-এ `if / else if / else` দিয়ে সিদ্ধান্ত নেওয়ার সময় একটি ঐতিহাসিক ফাঁদ রয়েছে: কখনোই ডাবল ইকুয়াল `==` দেবে না! কারণ `0 == ""` বা `"5" == 5` লিখলে JS জোর করে টাইপ বদলে True বলে দেয়, যা বড় প্রজেক্টে ভয়ংকর বাগ তৈরি করে। তাই সব সময় ট্রিপল ইকুয়াল `===` এবং `!==` ব্যবহার করবে। আরেকটি আধুনিক ES2025 কৌশল হলো `??` (Nullish Coalescing) অপারেটর। ধরো গেমের স্কোর `0` এসেছে—তুমি যদি `score || 100` লিখো তবে JS `0`-কে মিথ্যা ভেবে `100` বানিয়ে দেবে! কিন্তু `score ?? 100` লিখলে কেবল `null` বা `undefined` হলেই `100` বসাবে, আর `0` হলে `0`-ই থাকবে। ডিসক্রিট অপশন যেমন `+`, `-`, `*`, `/` হ্যান্ডল করতে `switch` ব্যবহার করবে ও প্রতি কেস শেষে `break;` দেবে (অথবা ফাংশনের ভেতরে সরাসরি `return`)। শুরুতেই `Number.isNaN(s)` ও রেঞ্জ গার্ড দিলে কোড অপ্রয়োজনীয় নেস্টিং থেকে বেঁচে যায়। মনে রাখবে `[]` এবং `{}` JavaScript-এ কিন্তু সত্য (Truthy)! তাই অ্যারে খালি কি না জানতে `if (arr.length === 0)` লিখতে হয়।',
        everydayExample:
          'পরীক্ষায় ০ পেলে সেটিকে "অনুপস্থিত (null)" হিসেবে ধরার ভুল হলো `||`, আর ০-কে বৈধ ০ হিসেবেই ধরে শুধু অনুপস্থিত হলে ডিফল্ট মান দেওয়া হলো `??`।',
        keyTakeaways: [
          'সর্বদা কঠোর তুলনা `===` এবং `!==` ব্যবহার করবে—`==` এড়িয়ে চলবে।',
          'যখন `0` বা `""` বৈধ মান, তখন `||` নয় বরং `??` ব্যবহার করবে।',
          'অ্যারে খালি কি না চেক করতে `if (arr)` নয়, `if (arr.length === 0)` লিখবে!',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-6-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Guard Clause & Descending Else-If Classifier',
        englishParagraphs: [
          'Checking `!Number.isFinite(score) || score < 0 || score > 100` up front catches NaN, Infinity, and out-of-range inputs in one guard.',
          'Descending `else if` thresholds evaluate cleanly top-to-bottom.',
        ],
        banglaParagraphs: [
          '`Number.isFinite(score)` ও সীমা `[0, 100]` শুরুতেই যাচাই করে নিলে `NaN` বা ভুল ইনপুট ভেতরে ঢুকতে পারে না।',
          'এরপর বড় থেকে ছোট (`>= 90`, `>= 80`) শর্ত যাচাই করা হয়েছে।',
        ],
        memoryDiagram: `score=85 -> finite & in [0,100] -> >=90 false -> >=80 true -> "A"`,
        code: `function classify(score) {
  if (!Number.isFinite(score) || score < 0 || score > 100) return "INVALID";
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  return "Pass/Fail";
}
console.log(classify(85));`,
        stdin: '',
        expectedOutput: 'A',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'if (!Number.isFinite(score) || score < 0 || score > 100) return "INVALID";', whatItMeans: 'Guard clause catching NaN and out-of-range values.', whyItIsThere: 'Early return prevents nested else pyramids.', ifDeletedError: 'NaN or 150 falls through.' },
          { lineNumber: 'Line 4', codeSnippet: 'if (score >= 80) return "A";', whatItMeans: 'Matches 80..89 band after >=90 check.', whyItIsThere: 'Clean flat guard structure.', ifDeletedError: '85 returns Pass/Fail.' },
        ],
      },
      {
        id: 'js-ch-6-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Strict switch Calculator With Zero Guard',
        englishParagraphs: [
          'JavaScript’s `switch` performs strict `===` matching against case labels automatically.',
          'Always check `b !== 0` before `/` because in JavaScript `10 / 0` does NOT throw—it silently produces `Infinity`!',
        ],
        banglaParagraphs: [
          'জাভাস্ক্রিপ্টে `10 / 0` দিলে এরর না দিয়ে নীরবে `Infinity` আসে! তাই ভাগ করার আগে অবশ্যই `b !== 0` চেক করতে হবে।',
          'প্রতিটি `case` শেষে `break;` দিয়ে পরের কেসে যাওয়া বন্ধ করা হয়েছে।',
        ],
        memoryDiagram: `stdin: "12 * 4" -> switch("*") -> 12 * 4 = 48`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [aS, op, bS] = raw.trim().split(/\\s+/);
const a = Number(aS), b = Number(bS);
let out = "UNKNOWN";
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
          { lineNumber: 'Line 6', codeSnippet: 'switch (op) {', whatItMeans: 'Dispatches using strict === equality.', whyItIsThere: 'Avoids type-coercion bugs.', ifDeletedError: 'Syntax error on cases.' },
          { lineNumber: 'Line 10', codeSnippet: 'case "/": out = b !== 0 ? String(Math.trunc(a / b)) : "DIV_ZERO"; break;', whatItMeans: 'Prevents silent Infinity division-by-zero bug.', whyItIsThere: 'JS divides by zero to Infinity without throwing.', ifDeletedError: 'Prints Infinity on "12 / 0".' },
        ],
      },
      {
        id: 'js-ch-6-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Nullish Coalescing (??) vs OR (||) & Tier Router',
        englishParagraphs: [
          'When configuring user quotas or shipping weights where `0` is meaningful, `val ?? 10` preserves `0` whereas `val || 10` overwrites `0` with `10`!',
          'Guard negative/zero weights before computing shipping fees.',
        ],
        banglaParagraphs: [
          'ডিসকাউন্ট বা স্কোর `0` হতে পারে—এমন ক্ষেত্রে `||` ব্যবহার করলে `0` হারিয়ে যায়, কিন্তু `??` কেবল `null`/`undefined` হলেই ডিফল্ট দেয়।',
          'এখানে পার্সেলের ওজন থেকে চার্জ বের করা হয়েছে।',
        ],
        memoryDiagram: `parsed=0 -> 0 ?? 10 stays 0 | weight=7 -> Fee=120`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
const w = Number(tokens[0] ?? 0);
const discount = tokens[1] !== undefined ? Number(tokens[1]) : null;
if (w <= 0) {
  console.log("INVALID");
} else {
  const base = w <= 5 ? 60 : (w <= 20 ? 120 : 250);
  const finalFee = Math.max(0, base - (discount ?? 0));
  console.log(\`Fee=\${finalFee}\`);
}`,
        stdin: '7 0',
        expectedOutput: 'Fee=120',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'const finalFee = Math.max(0, base - (discount ?? 0));', whatItMeans: 'Uses ?? so discount=0 stays 0 without falling back.', whyItIsThere: 'Safe nullish fallback pattern.', ifDeletedError: 'Discount ignored.' },
        ],
      },
      {
        id: 'js-ch-6-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Loose == & Watermelon Split Check (CF 4A)',
        englishParagraphs: [
          'Never trust loose `==`: in JS `"0" == false` is `true`, and `[] == 0` is `true`! Always enforce `===`.',
          'Below we verify the `w > 2 && w % 2 === 0` parity boundary cleanly.',
        ],
        banglaParagraphs: [
          '`[] == 0` কিংবা `"0" == false` JS-এ true হয়ে যায়—তাই সর্বদা `===` লিখবে।',
          'নিচে Watermelon (w=2 -> NO) শর্তটি নির্ভুলভাবে যাচাই করা হয়েছে।',
        ],
        memoryDiagram: `w=2 -> (2 > 2 && 2 % 2 === 0) -> false -> "NO"`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const w = Number(raw.trim());
console.log((w > 2 && w % 2 === 0) ? "YES" : "NO");`,
        stdin: '2',
        expectedOutput: 'NO',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: '(w > 2 && w % 2 === 0) ? "YES" : "NO"', whatItMeans: 'Uses strict === zero remainder check together with w > 2.', whyItIsThere: 'Handles boundary w=2 cleanly.', ifDeletedError: 'Returns YES for w=2.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'function classify(score) {', whatItMeans: 'Defines decision helper accepting numeric score.', whyItIsThere: 'Allows clean early returns per branch.', ifDeletedError: 'Cannot use return statements at top level.' },
      { lineNumber: 'Line 2', codeSnippet: 'if (!Number.isFinite(score) || score < 0 || score > 100) return "INVALID";', whatItMeans: 'Guard clause catching NaN, Infinity, and out-of-bounds.', whyItIsThere: 'Keeps grade checks concise and flat.', ifDeletedError: 'NaN falls through to Pass/Fail; 120 gets A+.' },
      { lineNumber: 'Line 3', codeSnippet: 'if (score >= 90) return "A+";', whatItMeans: 'Matches top band first.', whyItIsThere: 'Strict ordering guarantees >=90 priority.', ifDeletedError: '95 returns A.' },
      { lineNumber: 'Line 4', codeSnippet: 'if (score >= 80) return "A";', whatItMeans: 'Matches 80..89 band.', whyItIsThere: 'Runs only when score < 90.', ifDeletedError: '85 returns Pass/Fail.' },
      { lineNumber: 'Line 5', codeSnippet: 'return "Pass/Fail";', whatItMeans: 'Default branch for scores below 80.', whyItIsThere: 'Guarantees deterministic return string.', ifDeletedError: 'Returns undefined.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call classify(85)', memoryOrStack: 'score=85', note: 'Number finite' },
      { step: 2, state: 'Guard check', memoryOrStack: 'false', note: 'Inside [0, 100]' },
      { step: 3, state: 'score >= 90', memoryOrStack: 'false', note: 'Skip A+' },
      { step: 4, state: 'score >= 80', memoryOrStack: 'TRUE -> "A"', note: 'Logs A' },
    ],
    harryBugTraps: [
      { title: 'Using Loose Equality == Instead of ===', brokenCode: 'console.log("" == 0, "0" == false); // true true!', fixedCode: 'console.log("" === 0, "0" === false); // false false', whyItBreaks: 'Loose == coerces operands silently across unrelated types.' },
      { title: 'Empty Array [] Being Truthy in if (arr)', brokenCode: 'const arr = [];\nif (arr) console.log("Has items!"); // prints even when empty!', fixedCode: 'if (arr.length > 0) console.log("Has items!");', whyItBreaks: 'Every object (including [] and {}) is truthy in JS.' },
      { title: 'Overwriting Valid 0 With || Fallback', brokenCode: 'const val = 0;\nconst finalVal = val || 50; // becomes 50!', fixedCode: 'const finalVal = val ?? 50; // stays 0!', whyItBreaks: '|| treats 0 and "" as falsy; ?? only triggers on null/undefined.' },
    ],
    practiceSheet: [
      { id: 'js-ch-6-q1', difficulty: 'Easy', title: '1. Sign Classifier', prompt: 'Read integer n and print POSITIVE, NEGATIVE, or ZERO.', banglaHint: 'if / else if / else ও strict === ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst n = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nif (n > 0) console.log("POSITIVE");\nelse if (n < 0) console.log("NEGATIVE");\nelse console.log("ZERO");`, sampleStdin: '-42', expectedOutput: 'NEGATIVE' },
      { id: 'js-ch-6-q2', difficulty: 'Easy', title: '2. Maximum of Three Numbers', prompt: 'Read 3 numbers and print the largest using conditional logic.', banglaHint: 'let mx = a; দিয়ে তুলনা করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst [a, b, c] = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);\nlet mx = a; if (b > mx) mx = b; if (c > mx) mx = c;\nconsole.log(mx);`, sampleStdin: '12 99 45', expectedOutput: '99' },
      { id: 'js-ch-6-q3', difficulty: 'Medium', title: '3. Switch Day Router', prompt: 'Read 1..3 (1=Mon, 2=Tue, 3=Wed, else INVALID) via switch.', banglaHint: 'প্রতি case শেষে break; দাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst d = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nswitch (d) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n  case 3: console.log("Wed"); break;\n  default: console.log("INVALID");\n}`, sampleStdin: '2', expectedOutput: 'Tue' },
      { id: 'js-ch-6-q4', difficulty: 'Medium', title: '4. Valid Triangle Check', prompt: 'Read sides a, b, c and print YES if valid triangle else NO.', banglaHint: 'a > 0 && b > 0 && c > 0 এবং দুই বাহুর যোগফল > তৃতীয় বাহু।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst [a, b, c] = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);\nconsole.log((a > 0 && b > 0 && c > 0 && a + b > c && b + c > a && c + a > b) ? "YES" : "NO");`, sampleStdin: '3 4 5', expectedOutput: 'YES' },
      { id: 'js-ch-6-q5', difficulty: 'Hard', title: '5. Watermelon Boundary Split (CF 4A)', prompt: 'Read w and output YES if splittable into two positive even numbers else NO.', banglaHint: 'w > 2 && w % 2 === 0 যাচাই করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst w = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nconsole.log((w > 2 && w % 2 === 0) ? "YES" : "NO");`, sampleStdin: '2', expectedOutput: 'NO' },
    ],
    miniBuild: {
      title: 'JavaScript ES2025 Tiered Grade & Guard-Clause Router',
      description: 'Validates numeric input with Number.isFinite and routes grade tiers strictly.',
      banglaGoal: 'গার্ড ক্লজ ও === তুলনা ব্যবহার করে নিরাপদ গ্রেড রাউটার চালানো।',
      combinesChapters: 'Ch 1–6',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const score = Number(raw.trim());
if (!Number.isFinite(score) || score < 0 || score > 100) console.log("INVALID");
else if (score >= 90) console.log("A+");
else if (score >= 80) console.log("A");
else console.log("PASS");`,
      sampleStdin: '92',
      expectedOutput: 'A+',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const score = Number(raw.trim());
if (!Number.isFinite(score) || score < 0 || score > 100) console.log("INVALID");
else if (score >= 90) console.log("A+");
else if (score >= 80) console.log("A");
else console.log("PASS");`,
    sampleStdin: '92',
    expectedSampleOutput: 'A+',
    testCases: [
      { id: 'js6-t1', input: '92', expectedOutput: 'A+' },
      { id: 'js6-t2', input: '105', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  7: {
    chapterNumber: 7,
    title: 'JavaScript Chapter 7 (ES2025): Loops (for, while, do-while, for..of)',
    banglaTitle: 'JavaScript অধ্যায় ৭ (ES2025): লুপ মাস্টারি (for, while, do-while ও for..of)',
    subtitle: 'for vs while vs do-while, ES6 for..of vs for..in object trap, break/continue, and Math.trunc digit loops.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript supports both classic C-style loops (`for`, `while`, `do-while`) AND modern iteration loops (`for...of`). A critical JS pitfall: ALWAYS use `for (const val of arr)` (NOT `for...in`!) for arrays, because `for...in` iterates over string keys like `"0"`, `"1"`, plus any custom properties—and breaks numeric indexing!\n\nAlso remember JavaScript divides integers as 64-bit floats (`7 / 2 === 3.5`), so integer digit-stripping loops MUST use `Math.trunc(x / 10)` (or `Math.floor` for positive ints) instead of `x /= 10`, otherwise `7042` shrinks infinitely to `0.00000001` instead of `0`!',
      asciiFlowchart: `  [ n = 7042 ]
        |
        +--> BAD:  n /= 10        --> 704.2 -> 70.42 -> ... NEVER reaches 0! (TLE!)
        +--> GOOD: n = Math.trunc(n / 10) --> 704 -> 70 -> 7 -> 0 (Stops cleanly!)`,
      pseudocode: [
        '1. INITIALIZE let sum = 0 before entering loop',
        '2. USE classic for or for..of for arrays (never for..in)',
        '3. STRIP integer digits cleanly with Math.trunc(n / 10)',
        '4. USE do-while when zero inputs need 1 guaranteed pass',
        '5. BATCH loop output via array.join("\\n") for bulk speed',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ফ্লোট ভাগ থেকে বাঁচা (Math.trunc) ও for..of বনাম for..in',
        explanation:
          'JavaScript-এ সব সংখ্যাই ফ্লোটিং পয়েন্ট—তাই C বা Python-এর মতো `x /= 10` লিখলে `7042` কখনো `0` হয় না, বরং `704.2`, `70.42` হয়ে অনন্তকাল চলতেই থাকে (Infinite Loop)! তাই পূর্ণসংখ্যার অঙ্ক বাদ দিতে অবশ্যই `x = Math.trunc(x / 10)` লিখতে হবে। JavaScript-এ আমরা `for`, `while` এবং `do-while` তিন ধরনের লুপই পাই। অ্যারের প্রতিটি মানের ওপর ঘুরতে `for (const x of arr)` হলো সেরা ও আধুনিক পদ্ধতি। এখানে ভুলেও `for (const x in arr)` লিখবে না, কারণ `for..in` মান নয় বরং অ্যারের ইনডেক্স স্ট্রিং `"0"`, `"1"` দেয় এবং ধীরগতির। ইনপুট `0` দিলেও অন্তত ১ বার কাজ করার জন্য `do { ... } while (x > 0);` ব্যবহার করা হয়। আর কনটেস্টে লুপের ভেতর হাজার বার `console.log()` না ডেকে সব উত্তর একটি অ্যারেতে `push` করে শেষে `console.log(out.join("\\n"))` করলে কোড অনেক দ্রুত চলে।',
        everydayExample:
          'কয়েন ভাঙিয়ে ১ টাকা বাদ দিতে গেলে দশমিক পয়সা রাখলে চলবে না—Math.trunc দিয়ে দশমিক ছেঁটে পূর্ণ টাকা রাখতেই হবে।',
        keyTakeaways: [
          'অ্যারের মান পড়তে সর্বদা `for (const v of arr)` ব্যবহার করবে (`for..in` নয়)।',
          'JS-এ পূর্ণভাগ করতে `Math.trunc(x / 10)` লিখতেই হবে, নইলে অসীম লুপ হবে!',
          'হাজারটা লাইন প্রিন্ট করতে `out.push(...)` করে শেষে `join("\\n")` করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-7-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Standard for Loop Summation',
        englishParagraphs: [
          'Classic `for (let i = 1; i <= 5; i++)` scopes `let i` safely inside the loop header—unlike legacy `var`, which leaked globally!',
          'Initializing `let sum = 0` outside accumulates `1..5` cleanly.',
        ],
        banglaParagraphs: [
          'লুপের কাউন্টার হিসেবে সব সময় `let i` ব্যবহার করবে (`var` নয়), যাতে ভ্যারিয়েবলটি কেবল লুপের ভেতরেই থাকে।',
          '১ থেকে ৫ পর্যন্ত যোগ করে `sum=15` প্রিন্ট করা হয়েছে।',
        ],
        memoryDiagram: `let i=1..5 -> sum: 0 -> 1 -> 3 -> 6 -> 10 -> 15`,
        code: `let sum = 0;
for (let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(\`sum=\${sum}\`);`,
        stdin: '',
        expectedOutput: 'sum=15',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'let sum = 0;', whatItMeans: 'Initializes mutable accumulator before loop starts.', whyItIsThere: 'Tracks total across passes.', ifDeletedError: 'ReferenceError: sum is not defined.' },
          { lineNumber: 'Line 2', codeSnippet: 'for (let i = 1; i <= 5; i++) {', whatItMeans: 'Block-scoped loop counter from 1 to 5.', whyItIsThere: 'Prevents global variable pollution.', ifDeletedError: 'Loop never executes.' },
          { lineNumber: 'Line 3', codeSnippet: 'sum += i;', whatItMeans: 'Adds i into running sum.', whyItIsThere: 'Updates triangular total.', ifDeletedError: 'Outputs sum=0.' },
        ],
      },
      {
        id: 'js-ch-7-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'do-while Digit Counter With Math.trunc',
        englishParagraphs: [
          'Exit-controlled `do { ... } while (x > 0);` runs once even for `0`, while `Math.trunc(x / 10)` chops decimals cleanly so the loop always stops.',
        ],
        banglaParagraphs: [
          'JS-এ `Math.trunc(x / 10)` দিয়ে পূর্ণভাগ নিশ্চিত করে `do-while` দিয়ে `0`-সহ সব সংখ্যার অঙ্ক গোনা হয়েছে।',
        ],
        memoryDiagram: `x=7042 -> 704(1) -> 70(2) -> 7(3) -> 0(4) -> stop`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let x = Math.abs(Math.trunc(Number(raw.trim())));
let digits = 0;
do {
  digits++;
  x = Math.trunc(x / 10);
} while (x > 0);
console.log(\`digits=\${digits}\`);`,
        stdin: '7042',
        expectedOutput: 'digits=4',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'x = Math.trunc(x / 10);', whatItMeans: 'Drops fractional decimal part after dividing by 10.', whyItIsThere: 'Plain x /= 10 never hits integer 0 and causes an infinite loop!', ifDeletedError: 'Loop hangs forever!' },
        ],
      },
      {
        id: 'js-ch-7-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(sqrt(n)) Prime Checker With Early break',
        englishParagraphs: [
          'Using `for (let d = 2; d <= Math.floor(n / d); d++)` tests all potential prime factors cleanly without exceeding integer precision.',
        ],
        banglaParagraphs: [
          'বর্গমূল পর্যন্ত ভাজক পরীক্ষা করে প্রাইম কি না বের করা হয়েছে এবং ভাজক পাওয়ামাত্রই `break` করা হয়েছে।',
        ],
        memoryDiagram: `n=29 -> d=2..5 -> no remainder 0 -> PRIME`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
let prime = Number.isInteger(n) && n >= 2;
for (let d = 2; d * d <= n; d++) {
  if (n % d === 0) {
    prime = false;
    break;
  }
}
console.log(prime ? "PRIME" : "COMPOSITE");`,
        stdin: '29',
        expectedOutput: 'PRIME',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (let d = 2; d * d <= n; d++) {', whatItMeans: 'Checks divisors only up to sqrt(n).', whyItIsThere: 'Reduces runtime from O(n) down to O(sqrt(n)).', ifDeletedError: 'O(n) scan hangs for large numbers.' },
        ],
      },
      {
        id: 'js-ch-7-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'for..of vs for..in Trap & continue Odd Filter',
        englishParagraphs: [
          'Iterating arrays with `for (const x of nums)` yields actual numbers directly; `for..in` yields string keys `"0"`, `"1"` which turns `sum += x` into string concatenation `"0012"`!',
        ],
        banglaParagraphs: [
          'অ্যারেতে `for..in` ব্যবহার করলে সংখ্যা যোগের বদলে স্ট্রিং জোড়া লেগে যাওয়ার ভয়ংকর বাগ হয়—তাই সর্বদা `for (const x of nums)` ব্যবহার করবে।',
        ],
        memoryDiagram: `nums=[2,5,8,7,3] -> for..of + skip even -> oddSum=15`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
let oddSum = 0;
for (const x of nums.slice(1, 1 + nums[0])) {
  if (x % 2 === 0) continue;
  oddSum += x;
}
console.log(oddSum);`,
        stdin: '5\n2 5 8 7 3',
        expectedOutput: '15',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (const x of nums.slice(1, 1 + nums[0])) {', whatItMeans: 'Iterates numeric values cleanly with ES6 for..of.', whyItIsThere: 'for..in iterates string keys and breaks math.', ifDeletedError: 'for..in sums indices as strings!' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'let sum = 0;', whatItMeans: 'Accumulator initialized outside loop.', whyItIsThere: 'Preserves running total.', ifDeletedError: 'ReferenceError: sum undeclared.' },
      { lineNumber: 'Line 2', codeSnippet: 'for (let i = 1; i <= 5; i++) {', whatItMeans: 'Block-scoped loop counter 1..5.', whyItIsThere: 'Controls exact iteration range cleanly.', ifDeletedError: 'Body does not repeat.' },
      { lineNumber: 'Line 3', codeSnippet: 'sum += i;', whatItMeans: 'Accumulates i each pass.', whyItIsThere: 'Builds triangular sum.', ifDeletedError: 'Logs sum=0.' },
      { lineNumber: 'Line 5', codeSnippet: 'console.log(`sum=${sum}`);', whatItMeans: 'Logs formatted total once loop exits.', whyItIsThere: 'Emits single clean line.', ifDeletedError: 'Nothing printed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Init sum=0, i=1', memoryOrStack: 'sum=0, i=1', note: '1<=5 true' },
      { step: 2, state: 'Passes 1..3', memoryOrStack: 'sum=6, i=4', note: '0+1+2+3' },
      { step: 3, state: 'Passes 4..5', memoryOrStack: 'sum=15, i=6', note: '6<=5 false' },
      { step: 4, state: 'console.log', memoryOrStack: 'stdout="sum=15"', note: 'Exit 0' },
    ],
    harryBugTraps: [
      { title: 'Forgetting Math.trunc in Digit Loops (x /= 10)', brokenCode: 'let x = 123; while (x > 0) x /= 10; // INFINITE LOOP!', fixedCode: 'let x = 123; while (x > 0) x = Math.trunc(x / 10);', whyItBreaks: 'JS division produces floats (12.3, 1.23, 0.123...), taking ~323 iterations to underflow to 0!' },
      { title: 'Using for..in Instead of for..of on Arrays', brokenCode: 'for (const v in [10, 20]) console.log(v); // prints "0", "1"!', fixedCode: 'for (const v of [10, 20]) console.log(v);', whyItBreaks: 'for..in iterates enumerable property names (indices as strings), not element values.' },
      { title: 'Classic var Closure Bug Inside Async/Callback Loops', brokenCode: 'for (var i = 0; i < 3; i++) { /* i leaks as 3! */ }', fixedCode: 'for (let i = 0; i < 3; i++) { /* fresh i per iteration */ }', whyItBreaks: 'var shares one function-scoped binding across all iterations.' },
    ],
    practiceSheet: [
      { id: 'js-ch-7-q1', difficulty: 'Easy', title: '1. Factorial via Loop', prompt: 'Read n (0..20) and print n!.', banglaHint: 'let f = 1; নিয়ে 2..n পর্যন্ত গুণ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst n = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nlet f = 1; for (let i = 2; i <= n; i++) f *= i;\nconsole.log(f);`, sampleStdin: '5', expectedOutput: '120' },
      { id: 'js-ch-7-q2', difficulty: 'Easy', title: '2. Reverse Digits With Math.trunc', prompt: 'Read non-negative integer n and output reversed integer.', banglaHint: 'rev = rev * 10 + (n % 10); ও Math.trunc(n / 10) ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nlet n = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nlet rev = 0;\ndo { rev = rev * 10 + (n % 10); n = Math.trunc(n / 10); } while (n > 0);\nconsole.log(rev);`, sampleStdin: '1234', expectedOutput: '4321' },
      { id: 'js-ch-7-q3', difficulty: 'Medium', title: '3. Sum of Digits', prompt: 'Read non-negative integer n and print digit sum.', banglaHint: 'Math.trunc(n / 10) দিয়ে অঙ্ক আলাদা করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nlet n = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nlet s = 0; while (n > 0) { s += n % 10; n = Math.trunc(n / 10); }\nconsole.log(s);`, sampleStdin: '9085', expectedOutput: '22' },
      { id: 'js-ch-7-q4', difficulty: 'Medium', title: '4. Filtered Maximum Among Evens', prompt: 'Read n and n ints; output max even integer or -1.', banglaHint: 'for..of লুপ ও continue ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst arr = (typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim().split(/\\s+/).map(Number);\nlet mx = null;\nfor (const x of arr.slice(1, 1 + arr[0])) {\n  if (x % 2 !== 0) continue;\n  if (mx === null || x > mx) mx = x;\n}\nconsole.log(mx ?? -1);`, sampleStdin: '5\n3 10 7 4 9', expectedOutput: '10' },
      { id: 'js-ch-7-q5', difficulty: 'Hard', title: '5. O(sqrt(n)) Prime Test', prompt: 'Read n and output PRIME or COMPOSITE.', banglaHint: 'd * d <= n লুপ ও break ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst n = Number((typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8')).trim());\nlet ok = n >= 2;\nfor (let d = 2; d * d <= n; d++) if (n % d === 0) { ok = false; break; }\nconsole.log(ok ? "PRIME" : "COMPOSITE");`, sampleStdin: '97', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'JavaScript ES2025 Digit Counter & Loop Invariant Engine',
      description: 'Counts digits reliably for any integer including 0 using Math.trunc inside do-while.',
      banglaGoal: 'Math.trunc ও do-while দিয়ে নির্ভুল অঙ্ক-গণনা তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let x = Math.abs(Math.trunc(Number(raw.trim())));
let digits = 0;
do { digits++; x = Math.trunc(x / 10); } while (x > 0);
console.log(\`digits=\${digits}\`);`,
      sampleStdin: '7042',
      expectedOutput: 'digits=4',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
let x = Math.abs(Math.trunc(Number(raw.trim())));
let digits = 0;
do { digits++; x = Math.trunc(x / 10); } while (x > 0);
console.log(\`digits=\${digits}\`);`,
    sampleStdin: '7042',
    expectedSampleOutput: 'digits=4',
    testCases: [
      { id: 'js7-t1', input: '7042', expectedOutput: 'digits=4' },
      { id: 'js7-t2', input: '0', expectedOutput: 'digits=1', isHidden: true },
    ],
  },
  8: {
    chapterNumber: 8,
    title: 'JavaScript Chapter 8 (ES2025): Nested Loops, Patterns & 2D Matrices',
    banglaTitle: 'JavaScript অধ্যায় ৮ (ES2025): নেস্টেড লুপ, প্যাটার্ন ও ২ডি ম্যাট্রিক্স',
    subtitle: 'Outer-row / inner-column geometry, Array line buffering, and labeled loop breaks.',
    zeroIntuition: {
      plainEnglishStory:
        'A nested loop traverses two dimensions simultaneously: the outer loop advances through rows `i`, while inner loops sweep across spaces, symbols, or matrix columns `j` on each row.\n\nIn JavaScript, calling `console.log()` for every individual star automatically inserts a newline each time—breaking horizontal row formatting! Pushing row strings into an `out` array and calling `console.log(out.join("\\n"))` once renders crisp aligned patterns effortlessly.',
      asciiFlowchart: `Outer loop i = 1 .. N (Rows)
   |
   +--> Inner loop 1: spaces = " ".repeat(n - i)
   +--> Inner loop 2: stars  = "*".repeat(2*i - 1)
   +--> Push line into rows[] -> console.log(rows.join("\\n"))`,
      pseudocode: [
        '1. INITIALIZE rows = [] array buffer',
        '2. LOOP outer row index i from 1 to N',
        '3. BUILD each row string using inner loops or String.repeat',
        '4. PUSH finished row into rows',
        '5. EMIT console.log(rows.join("\\n")) once at end',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দালানের তলা-কামরা ও লাইন বাফারিং',
        explanation:
          'সিনেমা হলের সিটের কথা ভাবো: সারি A-এর ১ থেকে ১০ পর্যন্ত সিট মিলিয়ে তবেই সারি B শুরু হয়। প্রোগ্রামিংয়ে নেস্টেড লুপ ঠিক এই ২ডি স্থানাঙ্কের মতো কাজ করে—বাইরের লুপ `i` ঠিক করে তুমি কত নম্বর সারিতে আছো, আর ভেতরের লুপ `j` ওই সারির প্রতিটি ঘর বা কলাম পূরণ করে। JavaScript-এ কিন্তু একটি বিশেষ আচরণ আছে: প্রতিবার `console.log("*")` ডাকলে সে স্বয়ংক্রিয়ভাবে পরের লাইনে চলে যায়! তাই স্টারগুলোকে এক লাইনে পাশাপাশি বসাতে ভেতরের লুপে প্রথমে একটি স্ট্রিং বা অ্যারে-তে এক সারির সব অক্ষর জোড়া লাগাতে হয়, এবং বাইরের লুপ শেষে পুরো প্যাটার্ন `rows.join("\\n")` দিয়ে একবারে প্রিন্ট করতে হয়। এছাড়া ES2025-এ `"*".repeat(i)` মেথড থাকায় সহজ প্যাটার্ন আরও সংক্ষেপে লেখা যায়, তবে কন্ডিশনাল ফাঁকা বাক্স বা নম্বর প্যাটার্নে ভেতরের লুপের যুক্তি বোঝা খুবই জরুরি। কখনো দ্বিমাত্রিক লুপ থেকে একসাথে বের হতে চাইলে JavaScript-এ `outer: for (...)` লেবেল বসিয়ে `break outer;` ব্যবহার করা যায়। মনে রাখবে `N` বড় হলে নেস্টেড লুপের মোট কাজ `N * N` হারে বাড়ে, তাই `N <= 2000`-এর বেশি হলে সাবধান থাকবে। সারি ও কলামের সম্পর্ক কাগজে এঁকে নিলে যেকোনো হীরক বা ত্রিভুজ প্যাটার্ন তৈরি করা পানির মতো সহজ হবে।',
        everydayExample:
          'ক্যালেন্ডারের মাসের ছকের মতো: বাইরের লুপ সপ্তাহ (সারি) এবং ভেতরের লুপ ৭টি দিন (কলাম) সাজায়।',
        keyTakeaways: [
          'JavaScript-এ `console.log` প্রতিবার নতুন লাইন দেয়, তাই পুরো সারি বানিয়ে প্রিন্ট করতে হয়।',
          '`rows.push(line)` ও `rows.join("\\n")` দিয়ে পরিচ্ছন্ন প্যাটার্ন আউটপুট তৈরি হয়।',
          '`outer:` লেবেল দিয়ে ভেতরের লুপ থেকে সরাসরি বাইরের লুপ থামানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-8-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Right Triangle via Row Array Buffer',
        englishParagraphs: [
          'Outer loop `i = 1..n` steps down each row while inner loop `j = 1..i` builds that row’s stars.',
          'Joining `rows` with `"\\n"` prints cleanly in a single `console.log`.',
        ],
        banglaParagraphs: [
          'বাইরের লুপ `i` সারি নিয়ন্ত্রণ করে এবং ভেতরের লুপ `j` প্রতিটি সারিতে `i`-সংখ্যক তারা যোগ করে।',
          '`rows.join("\\n")` একবারে সম্পূর্ণ ত্রিভুজ প্রিন্ট করে।',
        ],
        memoryDiagram: `i=1->"*", i=2->"**", i=3->"***" -> joined by \\n`,
        code: `const n = 4;
const rows = [];
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
        stdin: '',
        expectedOutput: '*\n**\n***\n****',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const rows = [];', whatItMeans: 'Holds completed pattern rows.', whyItIsThere: 'Prevents premature console.log line breaks.', ifDeletedError: 'ReferenceError on rows.push.' },
          { lineNumber: 'Line 5', codeSnippet: 'for (let j = 1; j <= i; j++) line += \'*\';', whatItMeans: 'Appends i stars to current row string.', whyItIsThere: 'Links row width to row index i.', ifDeletedError: 'Prints empty lines.' },
        ],
      },
      {
        id: 'js-ch-8-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Centered Pyramid From Stdin',
        englishParagraphs: [
          'Row `i` (`1..n`) needs `n - i` leading spaces and `2*i - 1` asterisks.',
          'Two sequential inner loops compute spaces first, then stars, cleanly aligning the triangle.',
        ],
        banglaParagraphs: [
          'পিরামিডের `i`-তম সারিতে `n - i`টি ফাঁকা ঘর ও `2*i - 1`টি তারা বসাতে হয়।',
          'ভেতরের দুটি আলাদা লুপ স্পেস ও তারা গুছিয়ে যুক্ত করে।',
        ],
        memoryDiagram: `n=3: "  *", " ***", "*****"`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
const rows = [];
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let s = 1; s <= n - i; s++) line += ' ';
  for (let k = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
        stdin: '3',
        expectedOutput: '  *\n ***\n*****',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (let s = 1; s <= n - i; s++) line += \' \';', whatItMeans: 'Adds n-i centering spaces.', whyItIsThere: 'Aligns star apex centered over base.', ifDeletedError: 'Pyramid collapses to left margin.' },
        ],
      },
      {
        id: 'js-ch-8-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: '2D Coordinate Pair Match & Labeled Break',
        englishParagraphs: [
          'Nested loops explore all `(i, j)` matrix cells cleanly.',
          'Adding a label like `outer:` lets `break outer;` halt both loops the instant the first match is found.',
        ],
        banglaParagraphs: [
          'নেস্টেড লুপ দিয়ে গ্রিডের সব `(i, j)` জোড়া পরীক্ষা করা যায়।',
          '`outer:` লেবেল থাকলে প্রথম শর্ত মেলামাত্র দুটি লুপই সাথে সাথে থামানো যায়।',
        ],
        memoryDiagram: `i=1..4, j=1..4, find first i*j === 6 -> (2,3) -> break outer`,
        code: `let found = '';
outer: for (let i = 2; i <= 5; i++) {
  for (let j = 2; j <= 5; j++) {
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
          { lineNumber: 'Line 2', codeSnippet: 'outer: for (let i = 2; i <= 5; i++) {', whatItMeans: 'Labels the outer loop for multi-level exit.', whyItIsThere: 'Normal break only exits inner loop j.', ifDeletedError: 'Syntax error on break outer.' },
          { lineNumber: 'Line 6', codeSnippet: 'break outer;', whatItMeans: 'Exits both nested loops immediately.', whyItIsThere: 'Stops at lexicographically first pair.', ifDeletedError: 'Overwrites with later pair 3,2.' },
        ],
      },
      {
        id: 'js-ch-8-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Console-Per-Star Trap vs Buffered Number Grid',
        englishParagraphs: [
          'Calling `console.log(j)` inside an inner loop puts every number on its own line instead of printing a horizontal grid row.',
          'Collecting elements per row first produces exact matrix formatting.',
        ],
        banglaParagraphs: [
          'ভেতরের লুপে সরাসরি `console.log(j)` লিখলে পাশাপাশি না বসে প্রতিটা সংখ্যা নতুন লাইনে চলে যায়।',
          'তাই প্রতিটি সারি আগে একটি স্ট্রিং বা অ্যারে-তে জমা করে প্রিন্ট করতে হয়।',
        ],
        memoryDiagram: `row1: "1" | row2: "12" | row3: "123"`,
        code: `const rows = [];
for (let i = 1; i <= 3; i++) {
  const row = [];
  for (let j = 1; j <= i; j++) row.push(j);
  rows.push(row.join(''));
}
console.log(rows.join('\\n'));`,
        stdin: '',
        expectedOutput: '1\n12\n123',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'rows.push(row.join(\'\'));', whatItMeans: 'Serializes row digits into one string.', whyItIsThere: 'Builds clean single line per row.', ifDeletedError: 'rows stays empty.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'const rows = [];', whatItMeans: 'Initializes array of formatted lines.', whyItIsThere: 'Avoids console.log breaking lines mid-row.', ifDeletedError: 'Cannot push rows.' },
      { lineNumber: 'Line 3', codeSnippet: 'for (let i = 1; i <= n; i++) {', whatItMeans: 'Outer loop iterating row numbers 1..N.', whyItIsThere: 'Controls triangle height.', ifDeletedError: 'Only one row created.' },
      { lineNumber: 'Line 5', codeSnippet: 'for (let j = 1; j <= i; j++) line += \'*\';', whatItMeans: 'Inner loop appending i asterisks.', whyItIsThere: 'Builds triangular width per row.', ifDeletedError: 'Empty strings pushed.' },
      { lineNumber: 'Line 8', codeSnippet: 'console.log(rows.join(\'\\n\'));', whatItMeans: 'Joins all rows cleanly with newlines.', whyItIsThere: 'Outputs exact multi-line pattern.', ifDeletedError: 'Prints nothing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i = 1', memoryOrStack: 'line = "*"', note: 'rows = ["*"]' },
      { step: 2, state: 'i = 2', memoryOrStack: 'line = "**"', note: 'rows = ["*", "**"]' },
      { step: 3, state: 'i = 3', memoryOrStack: 'line = "***"', note: 'rows = ["*", "**", "***"]' },
      { step: 4, state: 'i = 4', memoryOrStack: 'line = "****"', note: 'Prints 4-line triangle' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Calling console.log Inside Inner Column Loop', brokenCode: `for(let j=1;j<=i;j++) console.log('*');`, fixedCode: `let line = ''; for(let j=1;j<=i;j++) line += '*'; console.log(line);`, whyItBreaks: 'console.log always appends a trailing newline after every call.' },
      { title: 'Trap 2: Reusing let i in Nested Loop', brokenCode: `for(let i=0;i<3;i++) for(let i=0;i<3;i++) {}`, fixedCode: `for(let i=0;i<3;i++) for(let j=0;j<3;j++) {}`, whyItBreaks: 'Shadowing i hides the outer row index and causes subtle logic bugs.' },
      { title: 'Trap 3: Inner Loop Without Resetting Row Buffer', brokenCode: `let line=''; for(let i=1;i<=3;i++){ for(let j=1;j<=i;j++) line+='*'; console.log(line); }`, fixedCode: `for(let i=1;i<=3;i++){ let line=''; for(let j=1;j<=i;j++) line+='*'; console.log(line); }`, whyItBreaks: 'Not resetting line accumulates previous rows onto later rows.' },
    ],
    practiceSheet: [
      { id: 'js-ch8-p1', difficulty: 'Easy', title: 'N×N Star Box', prompt: 'Read N and print an N×N box of `*`.', banglaHint: 'বাইরের ও ভেতরের উভয় লুপ `1..n` চালিয়ে প্রিন্ট করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst rows = [];\nfor (let i = 0; i < n; i++) rows.push('*'.repeat(n));\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '***\n***\n***' },
      { id: 'js-ch8-p2', difficulty: 'Easy', title: 'Inverted Triangle', prompt: 'Read N and print N down to 1 stars per line.', banglaHint: 'সারি `i`-তে `n - i + 1`টি তারা বসাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst rows = [];\nfor (let i = n; i >= 1; i--) rows.push('*'.repeat(i));\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '***\n**\n*' },
      { id: 'js-ch8-p3', difficulty: 'Medium', title: 'Number Triangle 1..i', prompt: 'Print `1` on row 1, `12` on row 2, up to N rows.', banglaHint: 'ভেতরের লুপ `1..i` চালিয়ে `j` যোগ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst rows = [];\nfor (let i = 1; i <= n; i++) { let s = ''; for (let j = 1; j <= i; j++) s += j; rows.push(s); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '1\n12\n123' },
      { id: 'js-ch8-p4', difficulty: 'Medium', title: 'Floyd Counter Triangle', prompt: 'Print sequential integers 1, 2 3, 4 5 6 across N rows.', banglaHint: 'বাইরে `let k = 1` রেখে ভেতরে বাড়াও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nlet k = 1; const rows = [];\nfor (let i = 1; i <= n; i++) { const r = []; for (let j = 1; j <= i; j++) r.push(k++); rows.push(r.join(' ')); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '1\n2 3\n4 5 6' },
      { id: 'js-ch8-p5', difficulty: 'Hard', title: 'Checkerboard Parity Grid', prompt: 'Print an N×N grid alternating `1` and `0` using `(i + j) % 2`.', banglaHint: '`(i + j) % 2 === 0` হলে `1` নতুবা `0`।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst rows = [];\nfor (let i = 0; i < n; i++) { let s = ''; for (let j = 0; j < n; j++) s += (i + j) % 2 === 0 ? '1' : '0'; rows.push(s); }\nconsole.log(rows.join('\\n'));`, sampleStdin: '3', expectedOutput: '101\n010\n101' },
    ],
    miniBuild: {
      title: 'Mini-Build: Centered Pyramid Builder',
      description: 'Read height N and output a clean centered star pyramid using buffered row arrays.',
      banglaGoal: 'স্পেস ও স্টার লুপ মিলিয়ে একটি নিখুঁত পিরামিড প্রিন্ট করো।',
      combinesChapters: 'JS Ch 1–8',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
const rows = [];
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let s = 1; s <= n - i; s++) line += ' ';
  for (let k = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
      sampleStdin: '3',
      expectedOutput: '  *\n ***\n*****',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
const rows = [];
for (let i = 1; i <= n; i++) {
  let line = '';
  for (let s = 1; s <= n - i; s++) line += ' ';
  for (let k = 1; k <= 2 * i - 1; k++) line += '*';
  rows.push(line);
}
console.log(rows.join('\\n'));`,
    sampleStdin: '3',
    expectedSampleOutput: '  *\n ***\n*****',
    testCases: [
      { id: 'js8-t1', input: '3', expectedOutput: '  *\n ***\n*****' },
      { id: 'js8-t2', input: '2', expectedOutput: ' *\n***', isHidden: true },
    ],
  },
  9: {
    chapterNumber: 9,
    title: 'JavaScript Chapter 9 (ES2025): Functions, Arrow Syntax & Lexical Closures',
    banglaTitle: 'JavaScript অধ্যায় ৯ (ES2025): ফাংশন, অ্যারো সিনট্যাক্স ও ক্লোজার স্কোপ',
    subtitle: 'First-class functions, default parameters, block vs lexical scope, and closure call frames.',
    zeroIntuition: {
      plainEnglishStory:
        'In JavaScript, functions are first-class citizens: you can declare `function gcd(a, b)`, write concise ES2025 arrow expressions `const sq = (x) => x * x`, pass callbacks into array methods, or even return a new function that remembers variables from its outer scope (a **Closure**).\n\nWhenever a function runs, the V8 engine pushes an Execution Context onto the Call Stack holding its `let`/`const` block-scoped variables. Remember two classic JS traps: referencing `let`/`const` before initialization hits the Temporal Dead Zone (`ReferenceError`), and omitting `return` yields `undefined` rather than the last computed expression!',
      asciiFlowchart: `Global Frame -> calls lcm(24, 36)
   |
   +--> lcm frame [a=24, b=36] calls gcd(24, 36)
          |
          +--> gcd frame returns 12 (popped)
   v
lcm frame computes (24 / 12) * 36 = 72 (popped)`,
      pseudocode: [
        '1. EXTRACT focused logic into pure helper functions (gcd, lcm, isPrime)',
        '2. USE default parameters (= 0) safely for optional inputs',
        '3. PREFER const/let block scope over hoisted var',
        '4. ALWAYS write explicit return in braced multi-line arrow/regular functions',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রন্ধনশালার আলাদা স্টেশন ও ক্লোজার ব্যাকপ্যাক',
        explanation:
          'JavaScript-এ ফাংশন শুধু কোডের একটি ব্লক নয়, বরং একটি ভ্যালু বা যন্ত্রের মতো—যাকে ভ্যারিয়েবলে রাখা যায় এবং অন্য ফাংশনে পাঠানো যায়। আধুনিক ES2025-এ আমরা `function name() {}` বা সংক্ষিপ্ত Arrow Function `const f = (x) => x * x` ব্যবহার করি। প্রতিটি ফাংশন কল হলে V8 ইঞ্জিনের Call Stack-এ একটি নতুন Execution Context তৈরি হয় এবং `return` করলেই সেটি মুছে যায়। তবে JavaScript-এর দারুণ একটি শক্তি হলো **Closure**: একটি ভেতরের ফাংশন তার বাইরের ফাংশনের ভ্যারিয়েবলকে যেন ছোট একটি ব্যাকপ্যাকে ভরে সাথে নিয়ে ঘুরতে পারে, এমনকি বাইরের ফাংশন শেষ হয়ে যাওয়ার পরও! স্কোপের ক্ষেত্রে অবশ্যই `var`-এর বদলে সবসময় `const` ও `let` ব্যবহার করবে, কারণ `var` ব্লক `{}` মানে না এবং অনাকাঙ্ক্ষিত Hoisting বাগ তৈরি করে। আরেকটি সাধারণ ভুল হলো multi-line অ্যারো ফাংশন `{ ... }`-এর ভেতর `return` লিখতে ভুলে যাওয়া—তখন ফাংশন চুপচাপ `undefined` ফেরত দেয়। প্যারামিটার না পাঠালে সুরক্ষিত রাখতে Default Parameter যেমন `(rate = 0.15)` লেখা যায়। জটিল অঙ্কগুলো ছোট ছোট পিওর ফাংশনে ভাগ করলে টেস্টিং ও ডিবাগিং ১০ গুণ সহজ হয়।',
        everydayExample:
          'টিফিন বক্স নিয়ে বাইরে যাওয়া শিক্ষার্থীর মতো: ক্লাস (বাইরের ফাংশন) শেষ হলেও সে ব্যাকপ্যাকের (Closure) ভেতরের খাবার ব্যবহার করতে পারে।',
        keyTakeaways: [
          'অ্যারো ফাংশনে `{ }` ব্র্যাকেট দিলে অবশ্যই `return` লিখতে হবে, নইলে `undefined` আসবে।',
          '`var` এড়িয়ে সবসময় ব্লক-স্কোপড `const` ও `let` ব্যবহার করো।',
          'Closure-এর মাধ্যমে ইনার ফাংশন তার জন্মস্থানের বাইরের ভ্যারিয়েবল মনে রাখতে পারে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-9-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Pure Arrow & Declaration Functions',
        englishParagraphs: [
          'Concise expression arrow functions `(x) => x * x` return their expression implicitly without braces.',
          'Wrapping statements inside `{ ... }` switches to block mode, requiring an explicit `return`.',
        ],
        banglaParagraphs: [
          'এক-লাইনের অ্যারো ফাংশন `(x) => x * x`-এ `{}` না থাকায় স্বয়ংক্রিয়ভাবে মান রিটার্ন হয়।',
          'একাধিক লাইনে `{ }` ব্যবহার করলে অবশ্যই `return` লিখতে হবে।',
        ],
        memoryDiagram: `square(7) -> 49 | cube(3) -> 27`,
        code: `const square = (x) => x * x;
function cube(x) {
  return x * x * x;
}
console.log(\`\${square(7)} \${cube(3)}\`);`,
        stdin: '',
        expectedOutput: '49 27',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const square = (x) => x * x;', whatItMeans: 'Concise arrow function with implicit return.', whyItIsThere: 'Clean syntax for single-expression transforms.', ifDeletedError: 'ReferenceError on square(7).' },
          { lineNumber: 'Line 3', codeSnippet: 'return x * x * x;', whatItMeans: 'Explicitly returns cubed result.', whyItIsThere: 'Block bodies return undefined without return.', ifDeletedError: 'cube(3) outputs undefined.' },
        ],
      },
      {
        id: 'js-ch-9-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Modular GCD & Overflow-Safe LCM Helpers',
        englishParagraphs: [
          'Breaking `gcd` and `lcm` into small functions allows `lcm` to divide `a` before multiplying by `b`, keeping numbers cleanly inside safe `Number` integer precision (`<= 2^53 - 1`).',
          'Remember `Math.trunc` or `let a, b` assignments inside `while (b !== 0)`.',
        ],
        banglaParagraphs: [
          '`gcd` ও `lcm` আলাদা ফাংশনে রাখলে কোড পরিচ্ছন্ন থাকে এবং আগে ভাগ করে নিলে জায়ান্ট প্রিসিশন সীমার মধ্যে থাকে।',
          'ইনপুট থেকে দুটি সংখ্যা ভেঙে ফাংশনে পাস করা হচ্ছে।',
        ],
        memoryDiagram: `gcd(24,36)->12 -> lcm(24,36)=(24/12)*36=72`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

const lcm = (a, b) => (a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b);

const [a, b] = raw.trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(a, b)} lcm=\${lcm(a, b)}\`);`,
        stdin: '24 36',
        expectedOutput: 'gcd=12 lcm=72',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'while (b !== 0) [a, b] = [b, a % b];', whatItMeans: 'Simultaneously updates a and b via array destructuring.', whyItIsThere: 'Clean Euclidean step without temp variable.', ifDeletedError: 'Infinite loop.' },
        ],
      },
      {
        id: 'js-ch-9-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Lexical Closures & Stateful Counter Factory',
        englishParagraphs: [
          'When `makeCounter(start)` returns an inner arrow function, that inner function retains live access to `count` even after `makeCounter` has returned.',
          'Each invocation of `makeCounter` creates an independent isolated closure state.',
        ],
        banglaParagraphs: [
          '`makeCounter` একটি ভেতরের ফাংশন রিটার্ন করলে সেটি বাইরের `count` ভ্যারিয়েবলটিকে মনে রেখে দেয়—একেই ক্লোজার বলে।',
          'প্রতিবার `makeCounter` কল করলে সম্পূর্ণ আলাদা কাউন্টার তৈরি হয়।',
        ],
        memoryDiagram: `c = makeCounter(10) -> closure{count:10} -> c()=11 -> c()=12`,
        code: `function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}
const c = makeCounter(10);
console.log(c(), c());`,
        stdin: '',
        expectedOutput: '11 12',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'return () => ++count;', whatItMeans: 'Returns closure retaining reference to count.', whyItIsThere: 'Encapsulates private mutable counter cleanly.', ifDeletedError: 'c is not a function.' },
        ],
      },
      {
        id: 'js-ch-9-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Braced Arrow Undefined Trap vs Object Literal Return',
        englishParagraphs: [
          'Writing `const make = (x) => { val: x }` traps beginners: JavaScript parses `{ val: x }` as a function block with a label `val:`, returning `undefined`!',
          'Wrap object literal returns in parentheses `({ val: x })` or use `return`.',
        ],
        banglaParagraphs: [
          '`(x) => { val: x }` লিখলে ব্রাউজার `{}`-কে অবজেক্ট না ভেবে ফাংশন ব্লক ভেবে `undefined` রিটার্ন করে!',
          'অবজেক্ট রিটার্ন করতে হলে চারপাশে প্রথম বন্ধনী `({ val: x })` দিতে হয়।',
        ],
        memoryDiagram: `x => { a: 1 } -> undefined! | x => ({ a: 1 }) -> { a: 1 }`,
        code: `const makePair = (a, b) => ({ sum: a + b, diff: a - b });
const res = makePair(9, 4);
console.log(\`\${res.sum} \${res.diff}\`);`,
        stdin: '',
        expectedOutput: '13 5',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const makePair = (a, b) => ({ sum: a + b, diff: a - b });', whatItMeans: 'Parentheses force expression parsing of object literal.', whyItIsThere: 'Prevents block-statement undefined trap.', ifDeletedError: 'Returns undefined and crashes on res.sum.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const square = (x) => x * x;', whatItMeans: 'Concise ES2025 arrow function expression.', whyItIsThere: 'Implicitly returns x * x.', ifDeletedError: 'square is not defined.' },
      { lineNumber: 'Line 2', codeSnippet: 'function cube(x) {', whatItMeans: 'Named function declaration hoisted within scope.', whyItIsThere: 'Groups multi-line logic with clear contract.', ifDeletedError: 'cube is not defined.' },
      { lineNumber: 'Line 3', codeSnippet: 'return x * x * x;', whatItMeans: 'Returns value back to caller frame.', whyItIsThere: 'Ends execution context and sends output.', ifDeletedError: 'cube returns undefined.' },
    ],
    dryRunTable: [
      { step: 1, state: 'call square(7)', memoryOrStack: 'frame{x:7}', note: 'Evaluates 7 * 7 -> 49' },
      { step: 2, state: 'pop square', memoryOrStack: 'return 49', note: 'Stack frame released' },
      { step: 3, state: 'call cube(3)', memoryOrStack: 'frame{x:3}', note: 'Evaluates 3 * 3 * 3 -> 27' },
      { step: 4, state: 'log "49 27"', memoryOrStack: 'stdout', note: 'Template literal prints 49 27' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Braced Arrow Function Missing return', brokenCode: `const dbl = (x) => { x * 2; };`, fixedCode: `const dbl = (x) => x * 2;`, whyItBreaks: 'Once curly braces `{}` are present, JS requires explicit `return`, otherwise returning `undefined`.' },
      { title: 'Trap 2: Returning Object Literal Without Parentheses', brokenCode: `const wrap = (x) => { val: x };`, fixedCode: `const wrap = (x) => ({ val: x });`, whyItBreaks: '`{ val: x }` is parsed as a labeled block returning `undefined`.' },
      { title: 'Trap 3: Classic var Loop Closure Sharing', brokenCode: `for (var i = 0; i < 3; i++) fns.push(() => i);`, fixedCode: `for (let i = 0; i < 3; i++) fns.push(() => i);`, whyItBreaks: 'var has function scope so all closures read final i=3; let creates fresh binding per iteration.' },
    ],
    practiceSheet: [
      { id: 'js-ch9-p1', difficulty: 'Easy', title: 'Max of Three Helper', prompt: 'Write a function `max3(a, b, c)` returning the largest number.', banglaHint: '`Math.max(a, b, c)` ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst max3 = (a, b, c) => Math.max(a, b, c);\nconst [a, b, c] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(max3(a, b, c));`, sampleStdin: '4 19 7', expectedOutput: '19' },
      { id: 'js-ch9-p2', difficulty: 'Easy', title: 'Default Tax Price Calculator', prompt: 'Write `total(price, rate = 0.1)` returning `Math.round(price * (1 + rate))`.', banglaHint: 'ডিফল্ট প্যারামিটার `rate = 0.1` রাখো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst total = (price, rate = 0.1) => Math.round(price * (1 + rate));\nconsole.log(total(Number(raw.trim())));`, sampleStdin: '200', expectedOutput: '220' },
      { id: 'js-ch9-p3', difficulty: 'Medium', title: 'Closure Stepper', prompt: 'Create `makeStepper(step)` closure adding `step` each call and invoke twice starting from 0.', banglaHint: 'ভেতরের ফাংশনে `acc += step` করে রিটার্ন করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst makeStepper = (s) => { let v = 0; return () => (v += s); };\nconst step = makeStepper(Number(raw.trim()));\nconsole.log(step(), step());`, sampleStdin: '5', expectedOutput: '5 10' },
      { id: 'js-ch9-p4', difficulty: 'Medium', title: 'GCD & LCM Pair', prompt: 'Implement `gcd(a, b)` and `lcm(a, b)` and print `gcd lcm`.', banglaHint: 'ইউক্লিডীয় লুপ দিয়ে `gcd` বের করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst gcd = (a, b) => { while (b !== 0) [a, b] = [b, a % b]; return a; };\nconst lcm = (a, b) => (a / gcd(a, b)) * b;\nconst [a, b] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(\`\${gcd(a, b)} \${lcm(a, b)}\`);`, sampleStdin: '12 18', expectedOutput: '6 36' },
      { id: 'js-ch9-p5', difficulty: 'Hard', title: 'Function Composition Pipe', prompt: 'Given x, apply `add3(x)` then `mul2(...)` via a composed helper `applyTwice`.', banglaHint: 'একটি ফাংশনকে আরেকটির আর্গুমেন্ট হিসেবে পাস করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst pipe = (f, g) => (x) => g(f(x));\nconst fn = pipe((x) => x + 3, (x) => x * 2);\nconsole.log(fn(Number(raw.trim())));`, sampleStdin: '5', expectedOutput: '16' },
    ],
    miniBuild: {
      title: 'Mini-Build: Modular GCD & LCM Utility',
      description: 'Read two integers and compute GCD and overflow-safe LCM using modular helper functions.',
      banglaGoal: 'পিওর ফাংশন দিয়ে পরিচ্ছন্ন GCD ও LCM ক্যালকুলেটর তৈরি করো।',
      combinesChapters: 'JS Ch 1–9',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
const lcm = (a, b) => (a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b);

const [a, b] = raw.trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(a, b)} lcm=\${lcm(a, b)}\`);`,
      sampleStdin: '24 36',
      expectedOutput: 'gcd=12 lcm=72',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}
const lcm = (a, b) => (a === 0 || b === 0 ? 0 : (a / gcd(a, b)) * b);

const [a, b] = raw.trim().split(/\\s+/).map(Number);
console.log(\`gcd=\${gcd(a, b)} lcm=\${lcm(a, b)}\`);`,
    sampleStdin: '24 36',
    expectedSampleOutput: 'gcd=12 lcm=72',
    testCases: [
      { id: 'js9-t1', input: '24 36', expectedOutput: 'gcd=12 lcm=72' },
      { id: 'js9-t2', input: '14 21', expectedOutput: 'gcd=7 lcm=42', isHidden: true },
    ],
  },
  10: {
    chapterNumber: 10,
    isMilestoneMerger: true,
    title: 'JavaScript Chapter 10 (ES2025): Time & Space Complexity (Big-O & 10^8 Rule)',
    banglaTitle: 'JavaScript অধ্যায় ১০ (ES2025): টাইম ও স্পেস কমপ্লেক্সিটি (Big-O ও ১০^৮ রুল)',
    subtitle: 'V8 JIT budgets, O(1) safe integers vs BigInt, Set/Map O(1) lookups, and avoiding O(N^2) traps.',
    zeroIntuition: {
      plainEnglishStory:
        'Big-O measures how operation count grows as input size `N` increases. V8 JIT compiles numeric loops efficiently (~5×10^7–10^8 simple ops/sec), meaning `O(N^2)` fails whenever `N >= 10^4` while `O(N)` and `O(1)` solve massive constraints instantaneously.\n\nIn JavaScript, watch two language-specific Big-O traps: calling `arr.includes(x)` or `arr.shift()` inside an `N`-step loop silently produces `O(N^2)` work (use `Set`/`Map` for `O(1)` lookup), and `Number` loses precision past `2^53 - 1` (`9,007,199,254,740,991`), where `BigInt` (`1n`) guarantees exact arithmetic.',
      asciiFlowchart: `N = 100,000 (Judge 1s budget ≈ 5×10^7–10^8 ops)
   |
   +--> O(N^2) nested / arr.includes : 10^10 ops  ==> TLE!
   +--> O(N log N) .sort()           : 1.7×10^6   ==> AC!
   +--> O(N) Set/Map pass            : 10^5 ops   ==> Instant AC!
   +--> O(1) n*(n+1)/2 algebra       : 3 ops      ==> <1ms AC!`,
      pseudocode: [
        '1. INSPECT constraint N before picking nested loops',
        '2. USE Set/Map instead of Array.includes/indexOf inside loops',
        '3. REPLACE linear 1..N summation with O(1) algebraic formula',
        '4. USE BigInt when products exceed Number.MAX_SAFE_INTEGER (2^53 - 1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'V8 ইঞ্জিনের সময় বাজেট ও গোপন O(N^2) ফাঁদ',
        explanation:
          'ধরো ১ লাখ মানুষের মধ্যে কে কার সাথে হাত মেলালো তা গুনে বের করতে বলা হলো। প্রতিটি জোড়া গুনতে গেলে (`O(N^2)`) ১ হাজার কোটি ধাপ লাগবে যা জাজে নিশ্চিত TLE (Time Limit Exceeded) দেবে, অথচ সূত্র দিয়ে `n * (n - 1) / 2` লিখলে মাত্র `O(1)` সময়েই উত্তর চলে আসে! JavaScript-এর V8 ইঞ্জিন দ্রুত হলেও `N = 10^5` হলে `O(N^2)` লুপ চালানো যাবে না। JavaScript-এ কিছু লুকানো `O(N^2)` ফাঁদ আছে যা অনেকেই ধরতে পারে না: লুপের ভেতর `arr.includes(x)` বা `arr.shift()` চালালে সেগুলো প্রতিটি ধাপে `O(N)` সময় নেয়—সব মিলিয়ে কোড হয়ে যায় `O(N^2)`! তাই খোঁজার কাজের জন্য সবসময় `Set` বা `Map` (`O(1)`) ব্যবহার করবে। আরেকটি বড় বিষয় হলো `Number`-এর সর্বোচ্চ নিরাপদ পূর্ণসংখ্যা সীমা (`9×10^15`); এর চেয়ে বড় গুণফলের জন্য `BigInt` (`100000n`) ব্যবহার করলে প্রিসিশন হারায় না। ভাজক খোঁজার মতো লুপে `d * d <= n` লিখলে `10^10` পর্যন্ত সংখ্যাতেও মাত্র কয়েক হাজার ধাপ (`O(sqrt(N))`) লাগে। আবার এক লাখ লাইন প্রিন্ট করতে `rows.push()` করে শেষে `rows.join("\\n")` করলে I/O সুপারফাস্ট হয়। কোড করার আগে সবসময় `N` দেখেই সঠিক Big-O বেছে নেবে।',
        everydayExample:
          'লম্বা খাতায় নাম খোঁজা হলো `arr.includes` (`O(N)`), আর ডিকশনারির সরাসরি পাতা খোলা হলো `Set.has` (`O(1)`)।',
        keyTakeaways: [
          'লুপের ভেতর `arr.includes` বা `arr.shift` এড়িয়ে `Set`/`Map` ব্যবহার করো (`O(1)`)।',
          '`2^53 - 1`-এর চেয়ে বড় পূর্ণসংখ্যায় `BigInt` (`1n`) ব্যবহার করলে নির্ভুল মান থাকে।',
          'ভাজক বা প্রাইম চেক `d * d <= n` (`O(sqrt(N))`) পদ্ধতিতে দ্রুত হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-10-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(1) Safe Integer Sum vs O(N) Loop',
        englishParagraphs: [
          'Dividing the even factor before multiplying keeps intermediate values within `Number.MAX_SAFE_INTEGER` for larger `N` while computing the sum in constant `O(1)` time.',
          'Always use `Math.trunc` or parity check rather than sloppy floating-point division.',
        ],
        banglaParagraphs: [
          'জোড় সংখ্যাকে আগে ২ দিয়ে ভাগ করে নিলে প্রিসিশন সীমার মধ্যে থেকেই `O(1)` সময়ে যোগফল বের হয়।',
          '১ থেকে `100000` যোগ করতে কোনো লুপের প্রয়োজনই নেই।',
        ],
        memoryDiagram: `n=100000 -> (100000/2)*100001 = 5000050000 in 3 ops`,
        code: `const n = 100000;
const ans = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
console.log(ans);`,
        stdin: '',
        expectedOutput: '5000050000',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const ans = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'Constant-time O(1) Gaussian sum.', whyItIsThere: 'Avoids O(N) loop and halves intermediate product.', ifDeletedError: 'ans undefined.' },
        ],
      },
      {
        id: 'js-ch-10-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(sqrt(N)) Divisor Counting',
        englishParagraphs: [
          'Stepping `d` while `d * d <= n` inspects only factors up to `sqrt(N)` and counts each paired cofactor `n / d`.',
          'This handles inputs up to `10^12` cleanly in milliseconds inside V8.',
        ],
        banglaParagraphs: [
          '`d * d <= n` শর্ত ব্যবহার করলে মাত্র `sqrt(N)` ধাপেই সব ভাজক গুনে ফেলা যায়।',
          '`10^12` ইনপুটেও এটি কয়েক মিলিসেকেন্ডেই পাস করে।',
        ],
        memoryDiagram: `n=36 -> d=1,2,3,4,6 -> total 9 divisors`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
let cnt = 0;
for (let d = 1; d * d <= n; d++) {
  if (n % d === 0) cnt += d * d === n ? 1 : 2;
}
console.log(cnt);`,
        stdin: '36',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'for (let d = 1; d * d <= n; d++) {', whatItMeans: 'Runs O(sqrt(n)) divisor scan.', whyItIsThere: 'Avoids O(n) TLE on large inputs.', ifDeletedError: 'Would take N steps.' },
        ],
      },
      {
        id: 'js-ch-10-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Set O(1) Lookup vs Array.includes O(N)',
        englishParagraphs: [
          'Checking membership in an Array takes `O(N)` linear scan, turning two-array intersections into `O(N^2)`.',
          'Converting the lookup pool into `new Set(pool)` reduces every check to `O(1)` average time.',
        ],
        banglaParagraphs: [
          'অ্যারে-তে `includes` চালালে প্রতিবার পুরো তালিকা ঘুরতে হয় (`O(N)`), কিন্তু `Set.has` কাজ করে `O(1)` সময়ে।',
          'দুটি তালিকা মেলানোর সময় `Set` ব্যবহার করলে স্পিড বহুগুণ বাড়ে।',
        ],
        memoryDiagram: `new Set([10,20,30]).has(x) -> O(1) hash lookup`,
        code: `const pool = new Set([10, 20, 30, 40]);
const queries = [15, 20, 40];
let hits = 0;
for (const q of queries) {
  if (pool.has(q)) hits++;
}
console.log(hits);`,
        stdin: '',
        expectedOutput: '2',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const pool = new Set([10, 20, 30, 40]);', whatItMeans: 'Builds O(1) hash set.', whyItIsThere: 'Prevents quadratic queries.includes scan.', ifDeletedError: 'ReferenceError: pool not defined.' },
        ],
      },
      {
        id: 'js-ch-10-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Safe BigInt Binary Exponentiation O(log B)',
        englishParagraphs: [
          'Computing `(a ** b) % mod` with standard Numbers past `2^53` silently corrupts lower bits!',
          'Using `BigInt` binary exponentiation (`1n`) computes exact `(base^exp) % mod` cleanly in `O(log exp)` steps.',
        ],
        banglaParagraphs: [
          'সাধারণ `Number`-এ `2^53`-এর পর নিচের ডিজিটগুলো নষ্ট হয়ে যায়, কিন্তু `BigInt` (`1n`) দিয়ে বাইনারি এক্সপোনেনশিয়েশন নিখুঁত থাকে।',
          'এটি মাত্র `O(log exp)` ধাপে `mod` করে উত্তর দেয়।',
        ],
        memoryDiagram: `modPow(2n, 10n, 1000000007n) -> 1024`,
        code: `function modPow(base, exp, mod) {
  let res = 1n % mod;
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
          { lineNumber: 'Line 5', codeSnippet: 'if (exp & 1n) res = (res * base) % mod;', whatItMeans: 'Bitwise BigInt parity check.', whyItIsThere: 'Avoids precision loss during huge modular products.', ifDeletedError: 'Always prints 1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const n = 100000;', whatItMeans: 'Sets problem input size N.', whyItIsThere: 'Demonstrates 10^5 benchmark scale.', ifDeletedError: 'ReferenceError.' },
      { lineNumber: 'Line 2', codeSnippet: 'const ans = n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);', whatItMeans: 'O(1) arithmetic sum formula.', whyItIsThere: 'Computes 1..N without iterating.', ifDeletedError: 'ans missing.' },
      { lineNumber: 'Line 3', codeSnippet: 'console.log(ans);', whatItMeans: 'Prints exact sum 5000050000.', whyItIsThere: 'Emits result to judge.', ifDeletedError: 'No output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'n = 100000', memoryOrStack: 'n % 2 === 0 -> true', note: 'Choose even-halving branch' },
      { step: 2, state: 'n / 2 = 50000', memoryOrStack: '50000', note: 'Safe exact division' },
      { step: 3, state: '50000 * 100001', memoryOrStack: '5000050000 < 2^53', note: 'Within Number.MAX_SAFE_INTEGER' },
      { step: 4, state: 'log(5000050000)', memoryOrStack: 'O(1) ops', note: 'Instant execution' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Array.includes Inside Loop Turning O(N) into O(N^2)', brokenCode: `for (const x of queries) if (bigArr.includes(x)) hits++;`, fixedCode: `const set = new Set(bigArr);\nfor (const x of queries) if (set.has(x)) hits++;`, whyItBreaks: 'bigArr.includes scans linearly every query.' },
      { title: 'Trap 2: Precision Loss Beyond Number.MAX_SAFE_INTEGER', brokenCode: `console.log(1000000000 * 1000000000 % 1000000007);`, fixedCode: `console.log((1000000000n * 1000000000n % 1000000007n).toString());`, whyItBreaks: '10^18 exceeds 2^53 so standard floats round low digits wrongly.' },
      { title: 'Trap 3: Calling arr.shift() Inside While Queue Loop', brokenCode: `while (q.length) { const cur = q.shift(); } // O(N^2)!`, fixedCode: `let head = 0; while (head < q.length) { const cur = q[head++]; } // O(N)!`, whyItBreaks: 'Array.shift copies every remaining element down one slot per pop.' },
    ],
    practiceSheet: [
      { id: 'js-ch10-p1', difficulty: 'Easy', title: 'O(1) Safe Sum 1..N', prompt: 'Read N and output `1 + ... + N` in O(1).', banglaHint: 'জোড় সংখ্যাকে আগে ২ দিয়ে ভাগ করে গুণ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconsole.log(n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2));`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'js-ch10-p2', difficulty: 'Easy', title: 'O(sqrt(N)) Divisor Count', prompt: 'Count positive divisors of N.', banglaHint: '`d * d <= n` লুপ চালাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nlet c = 0;\nfor (let d = 1; d * d <= n; d++) if (n % d === 0) c += d * d === n ? 1 : 2;\nconsole.log(c);`, sampleStdin: '12', expectedOutput: '6' },
      { id: 'js-ch10-p3', difficulty: 'Medium', title: 'BigInt Modular Power', prompt: 'Compute `(A^B) % 1000000007` using BigInt O(log B).', banglaHint: '`BigInt` দিয়ে `e & 1n` ও `e >>= 1n` চালাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nlet [a, b] = raw.trim().split(/\\s+/).map(BigInt);\nconst m = 1000000007n; a %= m; let r = 1n;\nwhile (b > 0n) { if (b & 1n) r = (r * a) % m; a = (a * a) % m; b >>= 1n; }\nconsole.log(r.toString());`, sampleStdin: '3 4', expectedOutput: '81' },
      { id: 'js-ch10-p4', difficulty: 'Medium', title: 'O(1) Range Sum [L, R]', prompt: 'Compute sum L..R in O(1).', banglaHint: '`pref(r) - pref(l - 1)` বের করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = (n) => (n <= 0 ? 0 : n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2));\nconst [l, r] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(s(r) - s(l - 1));`, sampleStdin: '3 7', expectedOutput: '25' },
      { id: 'js-ch10-p5', difficulty: 'Hard', title: 'Fast Prime Check O(sqrt(N))', prompt: 'Print `PRIME` or `COMPOSITE` for N.', banglaHint: '`n >= 2` এবং `d * d <= n` পর্যন্ত চেক করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nlet p = n >= 2;\nfor (let d = 2; p && d * d <= n; d++) if (n % d === 0) p = false;\nconsole.log(p ? 'PRIME' : 'COMPOSITE');`, sampleStdin: '29', expectedOutput: 'PRIME' },
    ],
    miniBuild: {
      title: 'Milestone Merger 2: O(1) Fast Range Sum Engine (Phase 1–2)',
      description: 'Combine guard checks, modular helper functions, and O(1) summation to resolve [L, R] queries instantaneously.',
      banglaGoal: 'গার্ড ক্লজ, ফাংশন ও `O(1)` সূত্র মিলিয়ে দ্রুত রেঞ্জ-সাম প্রোগ্রাম তৈরি করো।',
      combinesChapters: 'JS Ch 1–10 (Phase 2 Milestone Merger)',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function prefixSum(n) {
  if (n <= 0) return 0;
  return n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

const [l, r] = raw.trim().split(/\\s+/).map(Number);
console.log(l > r ? 0 : prefixSum(r) - prefixSum(l - 1));`,
      sampleStdin: '1 100000',
      expectedOutput: '5000050000',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');

function prefixSum(n) {
  if (n <= 0) return 0;
  return n % 2 === 0 ? (n / 2) * (n + 1) : n * ((n + 1) / 2);
}

const [l, r] = raw.trim().split(/\\s+/).map(Number);
console.log(l > r ? 0 : prefixSum(r) - prefixSum(l - 1));`,
    sampleStdin: '1 100000',
    expectedSampleOutput: '5000050000',
    testCases: [
      { id: 'js10-t1', input: '1 100000', expectedOutput: '5000050000' },
      { id: 'js10-t2', input: '10 20', expectedOutput: '165', isHidden: true },
    ],
  },
};


