import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_TS_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'TypeScript Chapter 21: Sorting Comparators & Binary Search on Answer',
    banglaTitle: 'TypeScript অধ্যায় ২১: টাইপ-সেফ সর্টিং ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Combine readonly-safe numeric comparators, typed lowerBound/upperBound binary searches, and monotonic Binary Search on Answer.',
    zeroIntuition: {
      plainEnglishStory:
        'Calling .sort() on an uncopied readonly number[] triggers a compile error in TypeScript—and calling .sort() with no comparator sorts numbers alphabetically! Cloning with .slice().sort((a, b) => a - b) fixes both, unlocking O(log n) lowerBound and upperBound queries.\n\nBinary Search on Answer applies that same halving logic over a monotonic candidate interval [lo, hi], testing each midpoint mid = Math.trunc((lo + hi) / 2) against a typed boolean predicate.',
      asciiFlowchart: `  canShip(mid: number): [ false, false, false, TRUE, TRUE, TRUE ]
                             lo                  ^mid       hi
  if (canShip(mid)) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }`,
      pseudocode: [
        '1. COPY readonly input with .slice().sort((a, b) => a - b)',
        '2. WRITE typed lowerBound(a: readonly number[], x: number): number',
        '3. DEFINE predicate canShip(w: readonly number[], days: number, cap: number): boolean',
        '4. HALVE [lo, hi] using Math.trunc((lo + hi) / 2) saving valid ans',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সুরক্ষিত সর্টিং ও বাইনারি সার্চ অন আনসার',
        explanation:
          'বড় অ্যারেতে লিনিয়ার সার্চ করলে প্রোগ্রাম O(n*q) সময়ে আটকে যায়, কিন্তু একবার O(n log n) সময়ে সাজিয়ে নিলে Binary Search মাত্র ২০ ধাপে ১০ লাখ ডেটা থেকে উত্তর বের করে আনে। TypeScript-এ readonly number[] অ্যারেতে সরাসরি .sort() দিলে কম্পাইলার এরর দেয় যাতে মূল ডেটা বদলে না যায়—তাই আগে .slice() দিয়ে কপি করে তবেই (a, b) => a - b কম্পারেটর বসাতে হয়। এরপর lowerBound এবং upperBound ফাংশন লিখে ডুপ্লিকেট সংখ্যার শুরু ও মোট সংখ্যা সহজেই বের করা যায়। এর পরের ধাপ হলো Binary Search on Answer: সম্ভাব্য উত্তরের পরিসীমা [lo, hi] ধরে মাঝের মান mid নিয়ে একটি boolean প্রেডিকেট ফাংশন চালিয়ে দেখা হয় কাজটি সম্ভব কি না। JavaScript/TypeScript-এ মধ্যবিন্দু বের করার সময় অবশ্যই Math.trunc((lo + hi) / 2) লিখবে, নইলে দশমিক ইনডেক্সের কারণে বাগ তৈরি হবে।',
        everydayExample: 'ভলিউম নব মাঝামাঝি এনে পরীক্ষা করা: বেশি হলে নিচে নামা, কম হলে ওপরে ওঠা।',
        keyTakeaways: [
          'readonly number[] কে সর্ট করতে হলে আগে .slice() করে কপি নিতে হয়।',
          'সবসময় সংখ্যার তুলনায় (a, b) => a - b এবং মধ্যবিন্দুতে Math.trunc((lo + hi) / 2) লিখবে।',
          'Binary Search on Answer-এ সম্ভাব্য উত্তর ans আলাদা রেখে তবেই hi বা lo বদলাতে হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed lowerBound & upperBound Frequency Count',
        englishParagraphs: [
          'Accept readonly number[] in lowerBound and upperBound so callers keep immutability guarantees while querying sorted slices in O(log n).',
        ],
        banglaParagraphs: [
          'readonly number[] প্যারামিটার নিয়ে lowerBound ও upperBound দিয়ে O(log n)-এ শুরুর ইনডেক্স ও গণনা বের করো।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> lb(5)=1, ub(5)=4 -> count=3`,
        code: `function lowerBound(a: readonly number[], x: number): number {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = Math.trunc((lo + hi) / 2);
    if (a[mid] >= x) hi = mid; else lo = mid + 1;
  }
  return lo;
}
function upperBound(a: readonly number[], x: number): number {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = Math.trunc((lo + hi) / 2);
    if (a[mid] > x) hi = mid; else lo = mid + 1;
  }
  return lo;
}
const raw: readonly number[] = [9, 5, 2, 5, 5];
const sorted: number[] = raw.slice().sort((x, y) => x - y);
console.log(lowerBound(sorted, 5) + ' ' + (upperBound(sorted, 5) - lowerBound(sorted, 5)));`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 1',
            codeSnippet: 'function lowerBound(a: readonly number[], x: number): number {',
            whatItMeans: 'Typed O(log n) search returning first index >= x.',
            whyItIsThere: 'Ensures array is never mutated inside helper.',
            ifDeletedError: 'lowerBound function missing.',
          },
          {
            lineNumber: 'Line 18',
            codeSnippet: 'const sorted: number[] = raw.slice().sort((x, y) => x - y);',
            whatItMeans: 'Clones readonly input and sorts numerically ascending.',
            whyItIsThere: 'Required by TypeScript strictness and binary search preconditions.',
            ifDeletedError: 'Cannot sort readonly array or unsorted binary search fails.',
          },
        ],
      },
      {
        id: 'ts-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity between max(weights) and sum(weights) using a typed greedy helper.',
        ],
        banglaParagraphs: [
          'টাইপড প্রেডিকেট ফাংশন দিয়ে সর্বনিম্ন শিপিং ক্যাপাসিটি খুঁজো।',
        ],
        memoryDiagram: `lo=5, hi=15 -> ans=6`,
        code: `import * as fs from 'fs';

function canShip(w: readonly number[], days: number, cap: number): boolean {
  let used = 1, cur = 0;
  for (const x of w) {
    if (cur + x > cap) { used++; cur = 0; }
    cur += x;
  }
  return used <= days;
}

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0], d = nums[1], w = nums.slice(2, 2 + n);
let lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;
while (lo <= hi) {
  const mid = Math.trunc((lo + hi) / 2);
  if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;
}
console.log(ans);`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 3',
            codeSnippet: 'function canShip(w: readonly number[], days: number, cap: number): boolean {',
            whatItMeans: 'Monotonic feasibility checker returning boolean.',
            whyItIsThere: 'Drives binary search halving decision.',
            ifDeletedError: 'Search loop has no feasibility predicate.',
          },
        ],
      },
      {
        id: 'ts-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Interval Scheduling After End-Time Sort',
        englishParagraphs: [
          'Define interface Interval { s: number; e: number; } and sort ascending by finish time.',
        ],
        banglaParagraphs: [
          'Interval ইন্টারফেস ডিফাইন করে শেষের সময় অনুযায়ী সর্ট করে সর্বাধিক ইভেন্ট বাছাই করো।',
        ],
        memoryDiagram: `Interval[] sorted by e asc -> greedy s >= lastEnd`,
        code: `import * as fs from 'fs';

interface Interval { s: number; e: number; }
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0];
const iv: Interval[] = [];
for (let i = 0; i < n; i++) iv.push({ s: nums[1 + 2 * i], e: nums[2 + 2 * i] });
iv.sort((a, b) => a.e - b.e || a.s - b.s);
let last = -Infinity, cnt = 0;
for (const p of iv) if (p.s >= last) { cnt++; last = p.e; }
console.log(cnt);`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '2',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'iv.sort((a, b) => a.e - b.e || a.s - b.s);',
            whatItMeans: 'Orders interval objects by finish time ascending.',
            whyItIsThere: 'Greedy earliest-finish is provably optimal.',
            ifDeletedError: 'Unsorted events undercount compatible bookings.',
          },
        ],
      },
      {
        id: 'ts-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Math.trunc Midpoint vs. 32-bit Bitwise Shift Truncation',
        englishParagraphs: [
          'Using (lo + hi) >> 1 wraps negative on integers > 2^31; always use Math.trunc((lo + hi) / 2).',
        ],
        banglaParagraphs: [
          'বড় সংখ্যায় >> 1 করলে নেগেটিভ র‍্যাপ হয়; তাই সর্বদা Math.trunc((lo + hi) / 2) ব্যবহার করবে।',
        ],
        memoryDiagram: `Math.trunc((lo + hi) / 2) safe up to Number.MAX_SAFE_INTEGER`,
        code: `import * as fs from 'fs';

const n = Number(fs.readFileSync(0, 'utf8').trim());
let lo = 0, hi = n, ans = 0;
while (lo <= hi) {
  const m = Math.trunc((lo + hi) / 2);
  if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1;
}
console.log(ans);`,
        stdin: '50',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'const m = Math.trunc((lo + hi) / 2);',
            whatItMeans: 'Integer-truncates midpoint safely across 53-bit range.',
            whyItIsThere: 'Prevents fractional indices and 32-bit shift overflow.',
            ifDeletedError: 'Fractional midpoints fail loop termination.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'function lowerBound(a: readonly number[], x: number): number {',
        whatItMeans: 'Typed O(log n) search returning first index >= x.',
        whyItIsThere: 'Ensures array is never mutated inside helper.',
        ifDeletedError: 'lowerBound function missing.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'const mid = Math.trunc((lo + hi) / 2);',
        whatItMeans: 'Truncates midpoint to a valid integer array index.',
        whyItIsThere: 'Avoids undefined fractional lookups.',
        ifDeletedError: 'a[mid] reads undefined.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'const raw: readonly number[] = [9, 5, 2, 5, 5];',
        whatItMeans: 'Immutable source array.',
        whyItIsThere: 'Protects caller data against accidental in-place mutation.',
        ifDeletedError: 'raw identifier undefined.',
      },
      {
        lineNumber: 'Line 18',
        codeSnippet: 'const sorted: number[] = raw.slice().sort((x, y) => x - y);',
        whatItMeans: 'Clones readonly input and sorts numerically ascending.',
        whyItIsThere: 'Required by TypeScript strictness and binary search preconditions.',
        ifDeletedError: 'Cannot sort readonly array or unsorted binary search fails.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'lo=5, hi=15, mid=10', memoryOrStack: 'canShip(10)=true', note: 'ans=10, hi=9' },
      { step: 2, state: 'lo=5, hi=9, mid=7', memoryOrStack: 'canShip(7)=true', note: 'ans=7, hi=6' },
      { step: 3, state: 'lo=5, hi=6, mid=5', memoryOrStack: 'canShip(5)=false', note: 'lo=6' },
      { step: 4, state: 'lo=6, hi=6, mid=6', memoryOrStack: 'canShip(6)=true', note: 'ans=6, hi=5 -> exit' },
    ],
    harryBugTraps: [
      {
        title: 'Calling .sort() on readonly number[] Directly',
        brokenCode: `function f(a: readonly number[]) { return a.sort((x, y) => x - y); }`,
        fixedCode: `function f(a: readonly number[]): number[] { return a.slice().sort((x, y) => x - y); }`,
        whyItBreaks: 'TypeScript forbids mutating methods on readonly arrays.',
      },
      {
        title: 'Using (lo + hi) >> 1 for Large Numbers',
        brokenCode: `const m = (lo + hi) >> 1;`,
        fixedCode: `const m = Math.trunc((lo + hi) / 2);`,
        whyItBreaks: 'Bitwise >> 1 wraps values above 2^31-1 into negative integers.',
      },
      {
        title: 'Omitting Numeric Comparator on .sort()',
        brokenCode: `[10, 2, 30].sort()`,
        fixedCode: `[10, 2, 30].sort((a, b) => a - b)`,
        whyItBreaks: 'Default sort converts numbers to UTF-16 strings.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-21-p1',
        difficulty: 'Easy',
        title: 'First Index & Frequency Count',
        prompt: 'Read n, x, and n integers; sort numerically and print first index and count (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: টাইপড lb ও ub ফাংশন লিখে ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], x = nums[1], a: number[] = nums.slice(2, 2 + n).sort((u, v) => u - v);\nconst lb = (v: number): number => { let l = 0, r = a.length; while (l < r) { const m = Math.trunc((l + r) / 2); if (a[m] >= v) r = m; else l = m + 1; } return l; };\nconst ub = (v: number): number => { let l = 0, r = a.length; while (l < r) { const m = Math.trunc((l + r) / 2); if (a[m] > v) r = m; else l = m + 1; } return l; };\nconst l = lb(x), r = ub(x);\nconsole.log(l === r ? '-1 0' : l + ' ' + (r - l));`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'ts-ch-21-p2',
        difficulty: 'Easy',
        title: 'Floor Integer Square Root',
        prompt: 'Compute floor(sqrt(n)) via binary search.',
        banglaHint: 'ইঙ্গিত: Math.trunc((lo + hi) / 2) দিয়ে m*m <= n চেক করো।',
        starterCode: `import * as fs from 'fs';\nconst n = Number(fs.readFileSync(0, 'utf8').trim());\nlet lo = 0, hi = n, ans = 0;\nwhile (lo <= hi) { const m = Math.trunc((lo + hi) / 2); if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1; }\nconsole.log(ans);`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'ts-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n piles and h hours, find minimum eating speed k using Math.trunc((x + k - 1) / k).',
        banglaHint: 'ইঙ্গিত: প্রতিটি স্তূপে Math.trunc((x + k - 1) / k) ঘণ্টা যোগ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], h = nums[1], p = nums.slice(2, 2 + n);\nlet lo = 1, hi = Math.max(...p), ans = hi;\nwhile (lo <= hi) {\n  const k = Math.trunc((lo + hi) / 2);\n  let hrs = 0;\n  for (const x of p) hrs += Math.trunc((x + k - 1) / k);\n  if (hrs <= h) { ans = k; hi = k - 1; } else lo = k + 1;\n}\nconsole.log(ans);`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'ts-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Read n [start, end] pairs into Interval objects and print maximum mutually non-overlapping intervals.',
        banglaHint: 'ইঙ্গিত: e অনুযায়ী সর্ট করে গ্রিডিভাবে নির্বাচন করো।',
        starterCode: `import * as fs from 'fs';\ninterface Iv { s: number; e: number; }\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], iv: Iv[] = [];\nfor (let i = 0; i < n; i++) iv.push({ s: nums[1 + 2 * i], e: nums[2 + 2 * i] });\niv.sort((a, b) => a.e - b.e);\nlet cur = -Infinity, ans = 0;\nfor (const p of iv) if (p.s >= cur) { ans++; cur = p.e; }\nconsole.log(ans);`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'ts-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Min Distance',
        prompt: 'Given n stall coordinates and c cows, find largest minimum distance between any two cows.',
        banglaHint: 'ইঙ্গিত: স্টল সর্ট করে দূরত্বের ওপর বাইনারি সার্চ চালাও।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], c = nums[1], x = nums.slice(2, 2 + n).sort((a, b) => a - b);\nlet lo = 1, hi = x[n - 1] - x[0], ans = 0;\nwhile (lo <= hi) {\n  const mid = Math.trunc((lo + hi) / 2);\n  let placed = 1, last = x[0];\n  for (let i = 1; i < n; i++) if (x[i] - last >= mid) { placed++; last = x[i]; }\n  if (placed >= c) { ans = mid; lo = mid + 1; } else hi = mid - 1;\n}\nconsole.log(ans);`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Use typed Binary Search on Answer with a readonly slice predicate to minimize shipping capacity.',
      banglaGoal: 'Binary Search on Answer দিয়ে সর্বনিম্ন শিপিং ক্যাপাসিটি নির্ণয় করা।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `import * as fs from 'fs';\nfunction canShip(w: readonly number[], days: number, cap: number): boolean {\n  let u = 1, c = 0; for (const x of w) { if (c + x > cap) { u++; c = 0; } c += x; } return u <= days;\n}\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], d = nums[1], w = nums.slice(2, 2 + n);\nlet lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;\nwhile (lo <= hi) { const mid = Math.trunc((lo + hi) / 2); if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1; }\nconsole.log(ans);`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `import * as fs from 'fs';\nfunction canShip(w: readonly number[], days: number, cap: number): boolean {\n  let u = 1, c = 0; for (const x of w) { if (c + x > cap) { u++; c = 0; } c += x; } return u <= days;\n}\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], d = nums[1], w = nums.slice(2, 2 + n);\nlet lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;\nwhile (lo <= hi) { const mid = Math.trunc((lo + hi) / 2); if (canShip(w, d, mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1; }\nconsole.log(ans);`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'ts21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'ts21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'TypeScript Chapter 22: Hashing, Typed Map/Set & Sliding Window Frequency',
    banglaTitle: 'TypeScript অধ্যায় ২২: হ্যাশিং, টাইপড Map/Set ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) Two-Sum, exact-K subarray sums, and longest unique substring safely using strict Map<K, V>, Set<T>, and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Strict TypeScript guards every hash lookup because Map<K, V>.get(key) explicitly returns V | undefined rather than silently producing NaN or null crashes. Narrowing with !== undefined or nullish coalescing ?? 0 forces you to handle missing keys and zero values accurately.\n\nCombining Map<number, number> with prefix sums resolves exact-K subarray counts across negative numbers in O(n), while Map<string, number> tracks last-seen positions cleanly for sliding window substring problems.',
      asciiFlowchart: `  pref += x ---> ans += cnt.get(pref - k) ?? 0
       |
       +--> cnt.set(pref, (cnt.get(pref) ?? 0) + 1)
       |
  Window [L..R]: const prev = last.get(ch); if (prev !== undefined && prev >= L) L = prev + 1;`,
      pseudocode: [
        '1. INITIALIZE cnt = new Map<number, number>([[0, 1]])',
        '2. UPDATE running prefix sum pref += x',
        '3. NARROW cnt.get(pref - k) ?? 0 safely under strictNullChecks',
        '4. INCREMENT cnt.set(pref, (cnt.get(pref) ?? 0) + 1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'strictNullChecks-সুরক্ষিত Map ও স্লাইডিং উইন্ডো',
        explanation:
          'TypeScript-এ হ্যাশ টেবিল ব্যবহারের সবচেয়ে বড় সুবিধা হলো strictNullChecks কম্পাইল-টাইমে অনুপস্থিত কী-এর ভুল ধরিয়ে দেয়। তুমি যখন Map<number, number>-এ .get(k) কল করো, TypeScript তার টাইপ ধরে number | undefined। তাই সরাসরি যোগ করতে গেলে এরর দেয়, আর তোমাকে ?? 0 অথবা !== undefined দিয়ে নিরাপদ পথ বেছে নিতে বাধ্য করে—ফলে ০ ইনডেক্স বা ০ মান থাকার পরেও কখনোই NaN কিংবা falsy-zero বাগ ঘটে না! Prefix Sum-এর সাথে এই টাইপড Map যোগ করলে নেগেটিভ সংখ্যা থাকলেও O(n) সময়ে K-যোগফলের সব সাব-অ্যারে গোনা যায়। পাশাপাশি স্ট্রিংয়ের ডুপ্লিকেটমুক্ত দীর্ঘতম সাবস্ট্রিং বের করতে Map<string, number> এবং স্লাইডিং উইন্ডো [L..R] একত্রে দারুণ পরিচ্ছন্নভাবে কাজ করে।',
        everydayExample: 'নিরাপত্তা-চেকওয়ালা রেজিস্ট্রি: খালি ঘরে হাত দিলে আগে থেকেই "শূন্য" ধরে নেওয়ার নিয়ম কম্পাইলার ঠিক করে দেয়।',
        keyTakeaways: [
          'Map<K, V>.get(k) সবসময় V | undefined দেয়; তাই ?? 0 বা !== undefined ব্যবহার করো।',
          'index 0 ভ্যালিড হলে if (hit !== undefined) লিখবে, কখনো if (hit) নয়।',
          'Prefix Sum হ্যাশে শুরুতে new Map<number, number>([[0, 1]]) রাখা জরুরি।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strict O(n) Two-Sum With Map<number, number>',
        englishParagraphs: [
          'Narrow seen.get(target - x) with !== undefined so index 0 is never treated as missing.',
        ],
        banglaParagraphs: [
          'seen.get(...) !== undefined দিয়ে ০ ইনডেক্সও নিরাপদে যাচাই করে Two-Sum সমাধান।',
        ],
        memoryDiagram: `Map<number, number> { 2 => 0 } -> hit = 0 !== undefined -> "0 1"`,
        code: `const a: readonly number[] = [2, 7, 11, 15];
const target = 9;
const seen = new Map<number, number>();
for (let i = 0; i < a.length; i++) {
  const hit = seen.get(target - a[i]);
  if (hit !== undefined) {
    console.log(hit + ' ' + i);
    break;
  }
  seen.set(a[i], i);
}`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if (hit !== undefined) {',
            whatItMeans: 'Narrows hit from number | undefined to number safely.',
            whyItIsThere: 'Handles valid index 0 cleanly unlike truthiness checks.',
            ifDeletedError: 'Cannot print guaranteed index.',
          },
        ],
      },
      {
        id: 'ts-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K Using Map<number, number>',
        englishParagraphs: [
          'Count exact-K subarrays in O(n) across negative and positive numbers using nullish coalescing.',
        ],
        banglaParagraphs: [
          '?? 0 ব্যবহার করে নেগেটিভ সংখ্যা থাকলেও O(n) সময়ে K-যোগফল সাব-অ্যারে গোনো।',
        ],
        memoryDiagram: `cnt={0=>1} -> pref=1,3,2,3,5 -> ans=3`,
        code: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0], k = nums[1];
const cnt = new Map<number, number>([[0, 1]]);
let pref = 0, ans = 0;
for (let i = 2; i < 2 + n; i++) {
  pref += nums[i];
  ans += cnt.get(pref - k) ?? 0;
  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);
}
console.log(ans);`,
        stdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'const cnt = new Map<number, number>([[0, 1]]);',
            whatItMeans: 'Seeds prefix sum 0 count to 1 in typed Map.',
            whyItIsThere: 'Captures subarrays starting directly from index 0.',
            ifDeletedError: 'Subarrays starting at index 0 are dropped.',
          },
        ],
      },
      {
        id: 'ts-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Track last index per character inside Map<string, number> and jump L forward cleanly.',
        ],
        banglaParagraphs: [
          'Map<string, number> এ অক্ষরের শেষ অবস্থান রেখে এক পাসে সর্বোচ্চ ইউনিক সাবস্ট্রিং দৈর্ঘ্য বের করো।',
        ],
        memoryDiagram: `prev !== undefined && prev >= L -> L = prev + 1`,
        code: `import * as fs from 'fs';

const s = fs.readFileSync(0, 'utf8').trim();
const last = new Map<string, number>();
let L = 0, best = 0;
for (let R = 0; R < s.length; R++) {
  const prev = last.get(s[R]);
  if (prev !== undefined && prev >= L) L = prev + 1;
  last.set(s[R], R);
  best = Math.max(best, R - L + 1);
}
console.log(best);`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 8',
            codeSnippet: 'if (prev !== undefined && prev >= L) L = prev + 1;',
            whatItMeans: 'Narrows prev to number and clamps left pointer forward.',
            whyItIsThere: 'Guarantees window [L..R] stays duplicate-free.',
            ifDeletedError: 'Duplicates corrupt window length.',
          },
        ],
      },
      {
        id: 'ts-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: '?? 0 Nullish Coalescing vs. || 0 Falsy Coercion',
        englishParagraphs: [
          'Nullish coalescing ?? only triggers on null or undefined, preserving valid 0 counts or indices.',
        ],
        banglaParagraphs: [
          '?? 0 কেবল null/undefined হলে কাজ করে, তাই ভ্যালিড ০ মান অক্ষত থাকে।',
        ],
        memoryDiagram: `0 || 99 => 99 (BUG) | 0 ?? 99 => 0 (SAFE)`,
        code: `const idxMap = new Map<string, number>([['first', 0]]);
const v = idxMap.get('first') ?? -1;
console.log(v);`,
        stdin: '',
        expectedOutput: '0',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: "const v = idxMap.get('first') ?? -1;",
            whatItMeans: 'Preserves 0 while substituting -1 only for undefined.',
            whyItIsThere: 'Prevents classic falsy-zero lookup bugs.',
            ifDeletedError: 'v variable undefined.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const a: readonly number[] = [2, 7, 11, 15];',
        whatItMeans: 'Immutable typed input array.',
        whyItIsThere: 'Guarantees array contents cannot be accidentally modified.',
        ifDeletedError: 'a identifier undefined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const seen = new Map<number, number>();',
        whatItMeans: 'Typed O(1) hash map from number value to index.',
        whyItIsThere: 'Rejects mismatched key/value types at compile time.',
        ifDeletedError: 'seen map undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const hit = seen.get(target - a[i]);',
        whatItMeans: 'Returns number | undefined from Map lookup.',
        whyItIsThere: 'Single hash lookup for complement index.',
        ifDeletedError: 'hit variable undefined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'if (hit !== undefined) {',
        whatItMeans: 'Narrows hit from number | undefined to number safely.',
        whyItIsThere: 'Handles valid index 0 cleanly unlike truthiness checks.',
        ifDeletedError: 'Cannot print guaranteed index.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'cnt = Map { 0 => 1 }', memoryOrStack: 'pref=0, ans=0', note: 'Seed zero prefix' },
      { step: 2, state: 'x=1 -> pref=1', memoryOrStack: 'get(-2)??0 = 0', note: 'cnt.set(1,1)' },
      { step: 3, state: 'x=2 -> pref=3', memoryOrStack: 'get(0)??0 = 1', note: 'ans=1, cnt.set(3,1)' },
      { step: 4, state: 'x=-1,1,2 -> pref=3,4,6', memoryOrStack: 'hits at 0 and 3', note: 'Total ans=3' },
    ],
    harryBugTraps: [
      {
        title: 'Forgetting (freq.get(x) ?? 0) Narrowing in Strict TS',
        brokenCode: `freq.set(x, freq.get(x) + 1); // Object is possibly undefined`,
        fixedCode: `freq.set(x, (freq.get(x) ?? 0) + 1);`,
        whyItBreaks: 'Strict TypeScript refuses arithmetic directly on number | undefined.',
      },
      {
        title: 'Using if (hit) Instead of if (hit !== undefined)',
        brokenCode: `const hit = seen.get(need); if (hit) ...`,
        fixedCode: `const hit = seen.get(need); if (hit !== undefined) ...`,
        whyItBreaks: 'Valid index 0 is falsy and gets skipped.',
      },
      {
        title: 'Mutating Map Keys Instead of Cloning Before Window Shrink',
        brokenCode: `const c = freq.get(a[L])! - 1;`,
        fixedCode: `const c = (freq.get(a[L]) ?? 0) - 1;`,
        whyItBreaks: 'Non-null assertions bypass type safety if key was already removed.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Count via Set<number>',
        prompt: 'Read n and n integers into Set<number>; print distinct count.',
        banglaHint: 'ইঙ্গিত: new Set<number>(nums.slice(1, 1 + n)).size প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconsole.log(new Set<number>(nums.slice(1, 1 + nums[0])).size);`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'ts-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices Lookup',
        prompt: 'Read n, target, and n integers; print first 0-based indices i j summing to target.',
        banglaHint: 'ইঙ্গিত: hit !== undefined দিয়ে ০ ইনডেক্সও নিরাপদে ধরো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], t = nums[1], seen = new Map<number, number>();\nfor (let i = 0; i < n; i++) {\n  const x = nums[2 + i], hit = seen.get(t - x);\n  if (hit !== undefined) { console.log(hit + ' ' + i); break; }\n  seen.set(x, i);\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'ts-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Unique Substring Length',
        prompt: 'Read a token and print length of longest substring without repeating characters.',
        banglaHint: 'ইঙ্গিত: Map<string, number> এ শেষ অবস্থান রেখে L ও R আপডেট করো।',
        starterCode: `import * as fs from 'fs';\nconst s = fs.readFileSync(0, 'utf8').trim(), last = new Map<string, number>();\nlet L = 0, best = 0;\nfor (let R = 0; R < s.length; R++) {\n  const p = last.get(s[R]);\n  if (p !== undefined && p >= L) L = p + 1;\n  last.set(s[R], R); best = Math.max(best, R - L + 1);\n}\nconsole.log(best);`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Subarray Length',
        prompt: 'Read n, k, and n integers; print longest contiguous subarray with <= k distinct values.',
        banglaHint: 'ইঙ্গিত: freq.size > k হলে বাম প্রান্ত কমিয়ে ০ হলে delete করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], a = nums.slice(2, 2 + n), freq = new Map<number, number>();\nlet L = 0, best = 0;\nfor (let R = 0; R < n; R++) {\n  freq.set(a[R], (freq.get(a[R]) ?? 0) + 1);\n  while (freq.size > k) {\n    const c = (freq.get(a[L]) ?? 0) - 1;\n    if (c <= 0) freq.delete(a[L]); else freq.set(a[L], c);\n    L++;\n  }\n  best = Math.max(best, R - L + 1);\n}\nconsole.log(best);`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'ts-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers; print number of contiguous subarrays summing to k.',
        banglaHint: 'ইঙ্গিত: Map<number, number>([[0, 1]]) রেখে pref - k এর মান যোগ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map<number, number>([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Combine running prefix sums with strict Map<number, number> to count exact-K subarrays in linear time.',
      banglaGoal: 'Prefix Sum এবং strict Map<number, number> দিয়ে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনা করা।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map<number, number>([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map<number, number>([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'ts22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'ts22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'TypeScript Chapter 23 (TS 5.x): Stacks, Queues, Trees & Graph Traversal (BFS/DFS)',
    banglaTitle: 'TypeScript অধ্যায় ২৩ (TS 5.x): স্ট্যাক, কিউ, ট্রি ও গ্রাফ ট্রাভার্সাল (BFS/DFS)',
    subtitle: 'Strongly-typed LIFO stacks, O(1) cursor BFS queues, recursive BST nodes, and O(n) monotonic stacks.',
    zeroIntuition: {
      plainEnglishStory:
        'Stacks (LIFO) enforce bracket nesting and linear-time Next Greater Element sweeps using `string[]` or `number[]`, while Queues (FIFO) power Breadth-First Search (BFS) for shortest paths in unweighted graphs and level-order traversals.\n\nIn strict TypeScript, calling `st.pop()` returns `string | undefined`, protecting you from popping empty stacks! And for queues, avoid `q.shift()` (`O(n)` array re-indexing) by keeping an integer cursor `let head = 0;` reading `q[head++]` in strict `O(1)`.',
      asciiFlowchart: `  Stack (string[]): push -> non-empty check -> pop() returns string | undefined
  Queue (number[]): q = [0], head = 0 -> read q[head++] (strict O(1) FIFO)`,
      pseudocode: [
        '1. STACK: push openers to string[]; capture const top = st.pop(); check top !== undefined',
        '2. BFS QUEUE: use cursor head = 0 and read q[head++] instead of O(n) shift()',
        '3. TREE NODE: model nullable BST pointers explicitly with TreeNode | null',
        '4. MONOTONIC STACK: maintain decreasing values while sweeping array right-to-left',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সেফ স্ট্যাক (`string | undefined`), O(1) কিউ ও ট্রি/গ্রাফ খোঁজ',
        explanation:
          'স্ট্যাক (LIFO) দিয়ে বন্ধনী ব্যালান্সিং ও মনোটোনিক স্ট্যাক প্রবলেম O(n) সময়ে সমাধান হয়, আর কিউ (FIFO) দিয়ে আনওয়েটেড গ্রাফের শর্টেস্ট পাথ (BFS) বের করা যায়। টাইপস্ক্রিপ্টের দারুণ একটি সুরক্ষা হলো—খালি স্ট্যাক থেকে `st.pop()` করলে এর টাইপ হয় `T | undefined`, ফলে তুমি আগে `!top` চেক না করলে কম্পাইলার সাথে সাথেই ধরে ফেলে! অন্যদিকে গ্রাফের BFS চালানোর সময় `q.shift()` ব্যবহার করলে প্রতি পপ-এ পুরো অ্যারে সরানোর কারণে O(V^2) TLE চলে আসে—তাই `let head = 0;` কার্সার রেখে `q[head++]` ব্যবহার করা জরুরি। বাইনারি সার্চ ট্রি মডেল করার সময় `TreeNode | null` ইউনিয়ন টাইপ নিলে ইন-অর্ডার ও পোস্ট-অর্ডার DFS কোড সম্পূর্ণ বাগ-মুক্ত থাকে। এই অধ্যায়ে তুমি সবগুলো স্ট্রাকচার টাইপ-সেফ উপায়ে লিখবে!',
        everydayExample:
          'স্ট্যাক থেকে প্লেট নেওয়ার আগে টাইপস্ক্রিপ্ট জিজ্ঞেস করে নেয় "প্লেট আছে তো, নাকি `undefined`?"—আর কিউতে `head++` ব্যবহারে লাইন জ্যাম বাঁধে না!',
        keyTakeaways: [
          '`st.pop()` সর্বদা `T | undefined` দেয়; কম্পাইলারের এই চেক খালি স্ট্যাকের বাগ আটকায়।',
          'BFS কিউতে `q.shift()`-এর বদলে `let head = 0; q[head++]` লিখলে টাইম কমপ্লেক্সিটি O(V + E) থাকে।',
          'BFS-এ এনকিউ করার মুহূর্তেই `dist[v] = dist[u] + 1` মার্ক করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strict Balanced Brackets Stack Using Record Lookup',
        englishParagraphs: [
          'Using `Record<string, string>` maps openers to closers cleanly. Before comparing, `const top = st.pop();` narrows away `undefined` safely.',
        ],
        banglaParagraphs: [
          '`Record<string, string>` ও `string[]` স্ট্যাক দিয়ে ব্র্যাকেট জোড়া মিলিয়ে দেখা হয়েছে।',
          '`top === undefined` বা পেয়ার না মিললেই `INVALID` প্রিন্ট হয়।',
        ],
        memoryDiagram: `"{[()]}" -> push {, [, ( -> pop & match ), ], } -> VALID`,
        code: `import * as fs from 'fs';
const s: string = fs.readFileSync(0, 'utf8').trim();
const pair: Record<string, string> = { '(': ')', '[': ']', '{': '}' };
const st: string[] = [];
let ok = true;
for (const c of s) {
  if (pair[c]) st.push(c);
  else {
    const top = st.pop();
    if (top === undefined || pair[top] !== c) { ok = false; break; }
  }
}
console.log(ok && st.length === 0 ? 'VALID' : 'INVALID');`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'const top = st.pop();', whatItMeans: 'Pops string | undefined from LIFO stack.', whyItIsThere: 'Narrows undefined check explicitly in strict TS.', ifDeletedError: 'Cannot validate closing bracket match.' },
        ],
      },
      {
        id: 'ts-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed Adjacency List BFS With O(1) Cursor Queue',
        englishParagraphs: [
          'We allocate `number[][]` adjacency lists and `number[]` distance array initialized to `-1`.',
          'Moving `head` forward gives strict `O(1)` dequeuing for shortest-path calculation.',
        ],
        banglaParagraphs: [
          'টাইপড অ্যাডজাসেন্সি লিস্ট `number[][]` এবং কার্সার কিউ `q[head]` দিয়ে শর্টেস্ট পাথ BFS মাপা হয়েছে।',
        ],
        memoryDiagram: `0-1, 0-2, 1-3 -> dist = [0, 1, 1, 2]`,
        code: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0], m = nums[1];
const adj: number[][] = Array.from({ length: n }, () => []);
for (let i = 0; i < m; i++) {
  const u = nums[2 + 2 * i], v = nums[3 + 2 * i];
  adj[u].push(v); adj[v].push(u);
}
const dist: number[] = new Array<number>(n).fill(-1);
const q: number[] = [0];
dist[0] = 0;
for (let head = 0; head < q.length; head++) {
  const u = q[head];
  for (const v of adj[u]) {
    if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }
  }
}
console.log(dist.join(' '));`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'for (let head = 0; head < q.length; head++) {', whatItMeans: 'Walks FIFO queue using an O(1) integer cursor.', whyItIsThere: 'Avoids quadratic shift() overhead.', ifDeletedError: 'BFS never explores neighbors.' },
        ],
      },
      {
        id: 'ts-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Nullable Binary Search Tree (BST) In-Order Traversal',
        englishParagraphs: [
          'Defining `interface BstNode { v: number; l: BstNode | null; r: BstNode | null; }` lets TypeScript enforce null-checks before dereferencing child branches.',
        ],
        banglaParagraphs: [
          '`BstNode` ইন্টারফেসে `l: BstNode | null` দিয়ে নাল-সেফ বাইনারি সার্চ ট্রি ও ইন-অর্ডার DFS তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `[5, 2, 8, 1] -> in-order -> 1 2 5 8`,
        code: `import * as fs from 'fs';
interface BstNode { v: number; l: BstNode | null; r: BstNode | null; }
const ins = (t: BstNode | null, x: number): BstNode =>
  t === null ? { v: x, l: null, r: null } : (x < t.v ? (t.l = ins(t.l, x)) : (t.r = ins(t.r, x)), t);
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let root: BstNode | null = null;
for (let i = 1; i <= nums[0]; i++) root = ins(root, nums[i]);
const out: number[] = [];
const walk = (t: BstNode | null): void => { if (!t) return; walk(t.l); out.push(t.v); walk(t.r); };
walk(root);
console.log(out.join(' '));`,
        stdin: '4\n5 2 8 1',
        expectedOutput: '1 2 5 8',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'const walk = (t: BstNode | null): void => { if (!t) return; walk(t.l); out.push(t.v); walk(t.r); };', whatItMeans: 'Null-narrowed recursive in-order DFS.', whyItIsThere: 'Prints BST elements in strictly ascending order.', ifDeletedError: 'No elements added to out.' },
        ],
      },
      {
        id: 'ts-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Monotonic Stack Next Greater Element (O(n))',
        englishParagraphs: [
          'Maintaining a strictly decreasing `number[]` stack while iterating right-to-left answers all Next Greater queries in linear time.',
        ],
        banglaParagraphs: [
          'ডান থেকে বামে স্ক্যান করে ডিক্রিজিং মনোটোনিক স্ট্যাক দিয়ে প্রতিটি সংখ্যার Next Greater Element মাত্র O(n) সময়ে পাওয়া যায়।',
        ],
        memoryDiagram: `[2, 1, 2, 4] -> 4 2 4 -1`,
        code: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0], a = nums.slice(1, 1 + n);
const ans: number[] = new Array<number>(n).fill(-1), st: number[] = [];
for (let i = n - 1; i >= 0; i--) {
  while (st.length && st[st.length - 1] <= a[i]) st.pop();
  if (st.length) ans[i] = st[st.length - 1];
  st.push(a[i]);
}
console.log(ans.join(' '));`,
        stdin: '4\n2 1 2 4',
        expectedOutput: '4 2 4 -1',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'while (st.length && st[st.length - 1] <= a[i]) st.pop();', whatItMeans: 'Evicts shadowed stack tops <= current element.', whyItIsThere: 'Maintains monotonic decreasing stack invariant.', ifDeletedError: 'Returns smaller values behind a[i].' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: "const pair: Record<string, string> = { '(': ')', '[': ']', '{': '}' };", whatItMeans: 'Typed dictionary pairing each opening bracket with its closer.', whyItIsThere: 'Enables O(1) bracket matching.', ifDeletedError: 'Compile error: pair not defined.' },
      { lineNumber: 'Line 4', codeSnippet: 'const st: string[] = [];', whatItMeans: 'Typed LIFO stack array for open brackets.', whyItIsThere: 'Stores pending unmatched symbols.', ifDeletedError: 'Cannot track nested structure.' },
      { lineNumber: 'Line 7', codeSnippet: 'if (pair[c]) st.push(c);', whatItMeans: 'Pushes opening bracket onto stack.', whyItIsThere: 'Saves expectation for closing order.', ifDeletedError: 'Openers fail immediately.' },
      { lineNumber: 'Line 9', codeSnippet: 'const top = st.pop();', whatItMeans: 'Retrieves most recent opener (or undefined).', whyItIsThere: 'Enforces LIFO check safely.', ifDeletedError: 'Cannot compare top bracket.' },
      { lineNumber: 'Line 13', codeSnippet: "console.log(ok && st.length === 0 ? 'VALID' : 'INVALID');", whatItMeans: 'Checks both zero mismatches and zero leftovers.', whyItIsThere: 'Outputs final balance verdict.', ifDeletedError: 'No stdout produced.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Push {, [, (', memoryOrStack: 'st = ["{","[","("]', note: 'Openers stacked' },
      { step: 2, state: 'Match )', memoryOrStack: 'top="(" -> match!', note: 'st = ["{","["]' },
      { step: 3, state: 'Match ] and }', memoryOrStack: 'both popped cleanly', note: 'st = []' },
      { step: 4, state: 'Verify end state', memoryOrStack: 'ok=true && st.length===0', note: 'Prints VALID' },
    ],
    harryBugTraps: [
      {
        title: 'Using q.shift() Instead of Cursor Head in TypeScript BFS',
        brokenCode: `while (q.length) { const u = q.shift()!; /* O(V^2) runtime! */ }`,
        fixedCode: `const q: number[] = [0]; for (let head = 0; head < q.length; head++) console.log(q[head]);`,
        whyItBreaks: 'shift() copies remaining elements on every dequeue and also adds non-null assertion noise.',
      },
      {
        title: 'Forgetting to Narrow undefined After st.pop()',
        brokenCode: `const top: string = st.pop(); // TS2322: string | undefined not assignable to string`,
        fixedCode: `const st: string[] = ['(']; const top = st.pop(); if (top !== undefined) console.log(top);`,
        whyItBreaks: 'Strict TypeScript requires guarding empty-stack pop before treating result as T.',
      },
      {
        title: 'Infinite Graph Recursion Without Visited Set',
        brokenCode: `const dfs = (u: number) => { for (const v of adj[u]) dfs(v); }; // Stack overflow!`,
        fixedCode: `const vis: boolean[] = [true]; console.log(vis[0] ? 'SAFE' : 'ERR');`,
        whyItBreaks: 'Undirected edges go u->v->u forever unless visited[u] is marked upon entry.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-23-p1',
        difficulty: 'Easy',
        title: 'Typed Balanced Brackets Check',
        prompt: 'Read a bracket string and print VALID if balanced else INVALID.',
        banglaHint: 'ইঙ্গিত: `const top = st.pop();` চেক করে পেয়ার মেলাও।',
        starterCode: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\nconst p: Record<string, string> = { '(': ')', '[': ']', '{': '}' }, st: string[] = [];\nlet ok = true;\nfor (const c of s) {\n  if (p[c]) st.push(c);\n  else { const top = st.pop(); if (!top || p[top] !== c) { ok = false; break; } }\n}\nconsole.log(ok && st.length === 0 ? 'VALID' : 'INVALID');`,
        sampleStdin: '{[()]}',
        expectedOutput: 'VALID',
      },
      {
        id: 'ts-ch-23-p2',
        difficulty: 'Easy',
        title: 'FIFO Queue Simulation',
        prompt: 'Read n commands (ENQ x / DEQ); print each dequeued value.',
        banglaHint: 'ইঙ্গিত: `head` ইনডেক্স বাড়িয়ে `q[head++]` প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);\nconst n = Number(lines[0]), q: number[] = []; let head = 0;\nfor (let i = 1; i <= n; i++) {\n  const parts = lines[i].trim().split(/\\s+/);\n  if (parts[0] === 'ENQ') q.push(Number(parts[1]));\n  else if (head < q.length) console.log(q[head++]);\n}`,
        sampleStdin: '3\nENQ 10\nENQ 20\nDEQ',
        expectedOutput: '10',
      },
      {
        id: 'ts-ch-23-p3',
        difficulty: 'Medium',
        title: 'Shortest Path Distances via BFS',
        prompt: 'Read n, m and edges; print BFS distances from node 0.',
        banglaHint: 'ইঙ্গিত: `dist` অ্যারে -1 দিয়ে ভরে `q[head++]` চালাও।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj: number[][] = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist: number[] = new Array<number>(n).fill(-1), q: number[] = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
        sampleStdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
      },
      {
        id: 'ts-ch-23-p4',
        difficulty: 'Medium',
        title: 'Connected Components via DFS',
        prompt: 'Read n, m and edges; print count of connected components.',
        banglaHint: 'ইঙ্গিত: প্রতি অদেখা নোড থেকে DFS চালিয়ে `comp++` করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj: number[][] = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst vis: boolean[] = new Array<boolean>(n).fill(false); let comp = 0;\nconst dfs = (u: number): void => { vis[u] = true; for (const v of adj[u]) if (!vis[v]) dfs(v); };\nfor (let i = 0; i < n; i++) if (!vis[i]) { comp++; dfs(i); }\nconsole.log(comp);`,
        sampleStdin: '5 3\n0 1\n1 2\n3 4',
        expectedOutput: '2',
      },
      {
        id: 'ts-ch-23-p5',
        difficulty: 'Hard',
        title: 'Monotonic Stack Next Greater Element',
        prompt: 'Read n and n ints; print next greater value to the right or -1.',
        banglaHint: 'ইঙ্গিত: ডান দিক থেকে লুপ চালিয়ে ছোট উপাদান পপ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], a = nums.slice(1, 1 + n), ans: number[] = new Array<number>(n).fill(-1), st: number[] = [];\nfor (let i = n - 1; i >= 0; i--) {\n  while (st.length && st[st.length - 1] <= a[i]) st.pop();\n  if (st.length) ans[i] = st[st.length - 1];\n  st.push(a[i]);\n}\nconsole.log(ans.join(' '));`,
        sampleStdin: '4\n2 1 2 4',
        expectedOutput: '4 2 4 -1',
      },
    ],
    miniBuild: {
      title: 'Type-Safe O(V + E) Graph BFS Engine',
      description: 'Computes unweighted shortest distances with zero O(n) shift overhead using cursor indexing.',
      banglaGoal: 'টাইপ-সেফ অ্যাডজাসেন্সি লিস্ট ও O(1) কার্সার কিউ দিয়ে গ্রাফের শর্টেস্ট পাথ বের করা।',
      combinesChapters: 'Ch 11, 20, 23',
      starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj: number[][] = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist: number[] = new Array<number>(n).fill(-1), q: number[] = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj: number[][] = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist: number[] = new Array<number>(n).fill(-1), q: number[] = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
    sampleStdin: '4 3\n0 1\n0 2\n1 3',
    expectedSampleOutput: '0 1 1 2',
    testCases: [
      { id: 'ts23-t1', input: '4 3\n0 1\n0 2\n1 3', expectedOutput: '0 1 1 2' },
      { id: 'ts23-t2', input: '3 1\n0 1', expectedOutput: '0 1 -1', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'TypeScript Chapter 24 (TS 5.x): Discriminated Result Types, unknown Errors & Task Queues',
    banglaTitle: 'TypeScript অধ্যায় ২৪ (TS 5.x): Result ইউনিয়ন, unknown এরর ও Task Queue',
    subtitle: 'Type-safe Result<T, E> discriminated unions, catch (err: unknown) narrowing, stream parsing, and deterministic worker task queues.',
    zeroIntuition: {
      plainEnglishStory:
        'Under strict TypeScript (`useUnknownInCatchVariables`), `catch (err)` types `err` as `unknown`—forcing you to narrow with `err instanceof AppError` instead of blindly reading `.message`. Even better, returning a discriminated union (`{ ok: true; value: number } | { ok: false; code: string }`) forces every caller to check `.ok` at compile time before touching `.value`!\n\nCombining strict union types with `Array<() => number>` worker task queues and fault-tolerant per-line parsing eliminates both silent `NaN`/`Infinity` bugs and unhandled promise/worker crashes.',
      asciiFlowchart: `  safeDiv(20, 0) -> { ok: false, code: "ERR_DIV_ZERO" } (Compiler forces .ok check!)
  catch (err: unknown) -> if (err instanceof Error) handle safely`,
      pseudocode: [
        '1. DEFINE discriminated union type Outcome = { ok: true; val: number } | { ok: false; code: string }',
        '2. CHECK res.ok BEFORE accessing res.val so compiler proves success path',
        '3. NARROW catch (err: unknown) via instanceof Error or type guards',
        '4. DRAIN deterministic taskQueue: Array<() => number> with try/finally counters',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ডিসক্রিমিনেটেড `Result` ইউনিয়ন ও `catch (err: unknown)` টাইপ-সেফটি',
        explanation:
          'আধুনিক টাইপস্ক্রিপ্টে `catch (err)`-এর টাইপ `any` না হয়ে `unknown` হয়, যাতে তুমি `instanceof AppError` বা টাইপ গার্ড ছাড়া ভুলেও অজানা এররের প্রপার্টি পড়তে না পারো! আরও শক্তিশালী ডিজাইন হলো `{ ok: true; val: number } | { ok: false; code: string }` এর মতো ডিসক্রিমিনেটেড ইউনিয়ন রিটার্ন করা—এতে কম্পাইলারই তোমাকে বাধ্য করে আগে `if (res.ok)` চেক করতে, নইলে `res.val` পড়তেই দেয় না! ফলে শূন্য দিয়ে ভাগ (`20 / 0`) করে ভুলবশত `Infinity` বা `NaN` প্রিন্ট করার সুযোগই থাকে না। এছাড়া `Array<() => number>` দিয়ে ওয়ার্কার টাস্ক কিউ চালানো ও প্রতিটি লাইন আলাদা `try/catch`-এ পার্স করলে একটি খারাপ রেকর্ডের কারণে পুরো সিস্টেম ভেঙে পড়ে না!',
        everydayExample:
          'কুরিয়ার পার্সেল খোলার আগেই যেমন ইনভয়েসে `status: "DELIVERED"` লেখা থাকে, ডিসক্রিমিনেটেড ইউনিয়নে `.ok === true` না মিললে টাইপস্ক্রিপ্ট ভ্যালু পড়তেই দেয় না!',
        keyTakeaways: [
          'ডিসক্রিমিনেটেড ইউনিয়ন (`{ ok: true; val } | { ok: false; code }`) ব্যবহার করলে এরর হ্যান্ডলিং ভুলে যাওয়া অসম্ভব।',
          '`catch (err: unknown)` থেকে প্রপার্টি পড়তে সর্বদা `err instanceof Error` দিয়ে ন্যারো করবে।',
          'JS/TS সংখ্যায় / 0 করলে `Infinity` আসে—তাই `Number.isFinite` ও `b === 0` গার্ড আবশ্যক।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Discriminated Union Outcome Type for Safe Division',
        englishParagraphs: [
          'Returning a discriminated union eliminates hidden throws while letting TypeScript narrow `res.val` vs `res.code` automatically inside `if (res.ok)`.',
        ],
        banglaParagraphs: [
          '`{ ok: true; val } | { ok: false; code }` ইউনিয়ন টাইপ ব্যবহার করে শূন্য দিয়ে ভাগ করার ঝুঁকি সম্পূর্ণ দূর করা হয়েছে।',
        ],
        memoryDiagram: `20 0 -> { ok: false, code: 'ERR_DIV_ZERO' }`,
        code: `import * as fs from 'fs';
type Outcome = { ok: true; val: number } | { ok: false; code: string };
function safeDiv(a: number, b: number): Outcome {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return { ok: false, code: 'ERR_DIV_ZERO' };
  return { ok: true, val: Math.trunc(a / b) };
}
const [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const res: Outcome = safeDiv(a, b);
console.log(res.ok ? 'OK:' + res.val : res.code);`,
        stdin: '20 0',
        expectedOutput: 'ERR_DIV_ZERO',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: "console.log(res.ok ? 'OK:' + res.val : res.code);", whatItMeans: 'Exhaustively narrows Outcome union via res.ok boolean tag.', whyItIsThere: 'Guarantees safe field access on both success and failure.', ifDeletedError: 'Outputs nothing.' },
        ],
      },
      {
        id: 'ts-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Narrowing catch (err: unknown) in Stream Parsing',
        englishParagraphs: [
          'Each input line is validated strictly; malformed lines throw a `TypeError` caught inside per-line `try/catch` while narrowing `err` cleanly.',
        ],
        banglaParagraphs: [
          'প্রতিটি রেকর্ড লাইন আলাদা `try/catch`-এ পার্স করে `Number.isInteger` যাচাই করা হয়েছে, যাতে একটি নষ্ট লাইন ব্যাচ থামাতে না পারে।',
        ],
        memoryDiagram: `["alpha 10", "beta nope", "gamma 25"] -> ok=2 sum=35`,
        code: `import * as fs from 'fs';
const lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);
const n = Number(lines[0]);
let ok = 0, sum = 0;
for (let i = 1; i <= n; i++) {
  try {
    const parts = lines[i].trim().split(/\\s+/);
    const v = Number(parts[1]);
    if (!Number.isInteger(v)) throw new TypeError('BAD_INT');
    ok++; sum += v;
  } catch (err: unknown) {
    if (!(err instanceof TypeError)) throw err;
  }
}
console.log('ok=' + ok + ' sum=' + sum);`,
        stdin: '3\nalpha 10\nbeta nope\ngamma 25',
        expectedOutput: 'ok=2 sum=35',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'catch (err: unknown) { if (!(err instanceof TypeError)) throw err; }', whatItMeans: 'Catches expected parse errors while rethrowing unexpected bugs.', whyItIsThere: 'Implements strict unknown error narrowing.', ifDeletedError: 'Swallows unrelated runtime bugs silently.' },
        ],
      },
      {
        id: 'ts-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Worker Task Queue Dispatcher (Array<() => number>)',
        englishParagraphs: [
          'Queueing worker jobs as `Array<() => number>` keeps execution order deterministic and type-checked end to end.',
        ],
        banglaParagraphs: [
          '`Array<() => number>` দিয়ে ওয়ার্কার টাস্ক কিউ তৈরি করে ধাপে ধাপে রান ও `finally` ব্লকে সম্পন্ন কাউন্টার বাড়ানো হয়েছে।',
        ],
        memoryDiagram: `tasks=[10,20,30] -> done=3 total=60`,
        code: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = nums[0] || 0;
const taskQueue: Array<() => number> = nums.slice(1, 1 + n).map((val) => () => val);
let total = 0, done = 0;
for (const runWorker of taskQueue) {
  try { total += runWorker(); }
  finally { done++; }
}
console.log('done=' + done + ' total=' + total);`,
        stdin: '3\n10 20 30',
        expectedOutput: 'done=3 total=60',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'const taskQueue: Array<() => number> = nums.slice(1, 1 + n).map((val) => () => val);', whatItMeans: 'Typed array of deferred worker job functions.', whyItIsThere: 'Enforces exact number return type on every queued job.', ifDeletedError: 'No jobs in queue.' },
        ],
      },
      {
        id: 'ts-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Bounded Retry Loop With Literal Status Union',
        englishParagraphs: [
          'Combining bounded attempts with strict attempt indexing prevents infinite retry storms on degraded services.',
        ],
        banglaParagraphs: [
          'সর্বোচ্চ সীমায় বাঁধা রিট্রাই লুপ প্রথম `OK` পেলেই থেমে সঠিক প্রচেষ্টার নম্বর প্রিন্ট করে।',
        ],
        memoryDiagram: `[FAIL, FAIL, OK] -> Attempt 3: OK`,
        code: `import * as fs from 'fs';
const tokens: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n = Number(tokens[0]);
let status = 'EXHAUSTED';
for (let i = 1; i <= n; i++) {
  if (tokens[i] === 'OK') { status = 'Attempt ' + i + ': OK'; break; }
}
console.log(status);`,
        stdin: '3\nFAIL FAIL OK',
        expectedOutput: 'Attempt 3: OK',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: "if (tokens[i] === 'OK') { status = 'Attempt ' + i + ': OK'; break; }", whatItMeans: 'Captures 1-based attempt number upon success and exits early.', whyItIsThere: 'Avoids extra retries after recovery.', ifDeletedError: 'Always prints EXHAUSTED.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 2', codeSnippet: 'type Outcome = { ok: true; val: number } | { ok: false; code: string };', whatItMeans: 'Discriminated union modeling explicit success or typed failure.', whyItIsThere: 'Forces compile-time check of res.ok.', ifDeletedError: 'Compile error: Outcome undefined.' },
      { lineNumber: 'Line 4', codeSnippet: "if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return { ok: false, code: 'ERR_DIV_ZERO' };", whatItMeans: 'Guards non-finite inputs and zero divisors before division.', whyItIsThere: 'Eliminates silent Infinity/NaN leaks.', ifDeletedError: 'Produces OK:Infinity instead of ERR_DIV_ZERO.' },
      { lineNumber: 'Line 5', codeSnippet: 'return { ok: true, val: Math.trunc(a / b) };', whatItMeans: 'Returns typed integer quotient wrapped in success tag.', whyItIsThere: 'Matches Outcome contract cleanly.', ifDeletedError: 'Function falls off end.' },
      { lineNumber: 'Line 8', codeSnippet: 'const res: Outcome = safeDiv(a, b);', whatItMeans: 'Stores typed result union from guard function.', whyItIsThere: 'Allows branching cleanly on res.ok.', ifDeletedError: 'res undefined.' },
      { lineNumber: 'Line 9', codeSnippet: "console.log(res.ok ? 'OK:' + res.val : res.code);", whatItMeans: 'Prints OK:<q> or error code safely.', whyItIsThere: 'Completes typed boundary flow.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "20 0"', memoryOrStack: 'a=20, b=0', note: 'Input parsed as numbers' },
      { step: 2, state: 'Call safeDiv(20, 0)', memoryOrStack: 'b === 0 guard matches', note: 'Returns { ok:false, code:"ERR_DIV_ZERO" }' },
      { step: 3, state: 'Narrow res.ok', memoryOrStack: 'res.ok is false -> res.code path', note: 'Compile-time safe' },
      { step: 4, state: 'Emit stdout', memoryOrStack: 'stdout="ERR_DIV_ZERO"', note: 'Clean typed error' },
    ],
    harryBugTraps: [
      {
        title: 'Catching (err: any) and Assuming err.message Exists',
        brokenCode: `catch (err: any) { console.log(err.code.toUpperCase()); } // Crashes if primitive thrown!`,
        fixedCode: `try { throw new Error('BOOM'); } catch (err: unknown) { console.log(err instanceof Error ? err.message : 'ERR'); }`,
        whyItBreaks: 'Any value (strings, numbers, null) can be thrown in JS; narrow unknown via instanceof Error.',
      },
      {
        title: 'Relying on typeof NaN === "number" After Parsing',
        brokenCode: `const x: number = Number('xyz'); if (typeof x === 'number') console.log(x + 1); // NaN!`,
        fixedCode: `const x: number = Number('xyz'); console.log(Number.isFinite(x) ? x : 'BAD_NUM');`,
        whyItBreaks: 'NaN has type number in TypeScript; always check Number.isFinite(x) on parsed external inputs.',
      },
      {
        title: 'Unhandled JSON.parse Return Typed Implicitly as Any',
        brokenCode: `const obj = JSON.parse('{bad}');`,
        fixedCode: `try { const x: unknown = JSON.parse('{bad}'); console.log(x); } catch { console.log('SAFE_JSON'); }`,
        whyItBreaks: 'Invalid JSON throws SyntaxError at runtime regardless of static types; wrap JSON.parse in try/catch.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-24-p1',
        difficulty: 'Easy',
        title: 'Typed Safe JSON Parser',
        prompt: 'Parse JSON string; print ok field if present else FALLBACK.',
        banglaHint: 'ইঙ্গিত: `JSON.parse` ব্লককে `try/catch`-এ রাখো।',
        starterCode: `import * as fs from 'fs';\ntry { const d = JSON.parse(fs.readFileSync(0, 'utf8').trim()) as { ok?: number }; console.log(d.ok ?? 'FALLBACK'); }\ncatch { console.log('FALLBACK'); }`,
        sampleStdin: '{"ok":7}',
        expectedOutput: '7',
      },
      {
        id: 'ts-ch-24-p2',
        difficulty: 'Easy',
        title: 'Outcome Union Division Guard',
        prompt: 'Read a b; print OK:<a/b> if b!=0 else ERR_DIV_ZERO using discriminated union.',
        banglaHint: 'ইঙ্গিত: `{ ok: true; val: number } | { ok: false; code: string }` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\ntype Outcome = { ok: true; val: number } | { ok: false; code: string };\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst res: Outcome = b === 0 ? { ok: false, code: 'ERR_DIV_ZERO' } : { ok: true, val: Math.trunc(a / b) };\nconsole.log(res.ok ? 'OK:' + res.val : res.code);`,
        sampleStdin: '20 0',
        expectedOutput: 'ERR_DIV_ZERO',
      },
      {
        id: 'ts-ch-24-p3',
        difficulty: 'Medium',
        title: 'Bounded Retry Loop',
        prompt: 'Read n and n outcomes; print "Attempt k: OK" for first OK or EXHAUSTED.',
        banglaHint: 'ইঙ্গিত: প্রথম `OK` পেলেই `break` করে ফলাফল প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n = Number(t[0]); let out = 'EXHAUSTED';\nfor (let i = 1; i <= n; i++) if (t[i] === 'OK') { out = 'Attempt ' + i + ': OK'; break; }\nconsole.log(out);`,
        sampleStdin: '3\nFAIL FAIL OK',
        expectedOutput: 'Attempt 3: OK',
      },
      {
        id: 'ts-ch-24-p4',
        difficulty: 'Medium',
        title: 'Typed Worker Task Queue Sum',
        prompt: 'Read n payloads, wrap in Array<() => number>, execute all, print total.',
        banglaHint: 'ইঙ্গিত: `Array<() => number>` কিউ তৈরি করে চালিয়ে যোগ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst q: Array<() => number> = nums.slice(1, 1 + nums[0]).map((v) => () => v);\nlet sum = 0; for (const run of q) sum += run(); console.log(sum);`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'ts-ch-24-p5',
        difficulty: 'Hard',
        title: 'Fault-Tolerant Batch Record Aggregator',
        prompt: 'Read n lines (`name val`); skip malformed integer rows cleanly and print `valid=<c> sum=<s>`.',
        banglaHint: 'ইঙ্গিত: প্রতিটি লাইনে `Number.isInteger` না হলে এরর থ্রো করে `catch` ব্লকে এড়িয়ে যাও।',
        starterCode: `import * as fs from 'fs';\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);\nconst n = Number(lines[0]); let valid = 0, sum = 0;\nfor (let i = 1; i <= n; i++) {\n  try {\n    const v = Number(lines[i].trim().split(/\\s+/)[1]);\n    if (!Number.isInteger(v)) throw new TypeError('BAD');\n    valid++; sum += v;\n  } catch {}\n}\nconsole.log('valid=' + valid + ' sum=' + sum);`,
        sampleStdin: '3\na 10\nb bad\nc 25',
        expectedOutput: 'valid=2 sum=35',
      },
    ],
    miniBuild: {
      title: 'Discriminated Outcome Guard Engine',
      description: 'Uses TypeScript discriminated unions and finite validation to prevent silent NaN/Infinity bugs.',
      banglaGoal: 'টাইপস্ক্রিপ্ট ডিসক্রিমিনেটেড ইউনিয়নের সাহায্যে সম্পূর্ণ নিরাপদ এরর বাউন্ডারি নির্মাণ।',
      combinesChapters: 'Ch 6, 18, 24',
      starterCode: `import * as fs from 'fs';\ntype Outcome = { ok: true; val: number } | { ok: false; code: string };\nfunction safeDiv(a: number, b: number): Outcome {\n  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return { ok: false, code: 'ERR_DIV_ZERO' };\n  return { ok: true, val: Math.trunc(a / b) };\n}\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst res: Outcome = safeDiv(a, b);\nconsole.log(res.ok ? 'OK:' + res.val : res.code);`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `import * as fs from 'fs';\ntype Outcome = { ok: true; val: number } | { ok: false; code: string };\nfunction safeDiv(a: number, b: number): Outcome {\n  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return { ok: false, code: 'ERR_DIV_ZERO' };\n  return { ok: true, val: Math.trunc(a / b) };\n}\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst res: Outcome = safeDiv(a, b);\nconsole.log(res.ok ? 'OK:' + res.val : res.code);`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'ts24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'ts24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'TypeScript Chapter 25 (TS 5.x): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'TypeScript অধ্যায় ২৫ (TS 5.x): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'End-to-end typed REST route dispatchers, discriminated API contracts, Map tables, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript shines brightest across full-stack architectures (Next.js, tRPC, Express, Hono) where backend API contracts and frontend consumers share strict interface definitions! Every incoming HTTP line (`POST /api/add 15 27`) narrows into typed union HTTP verbs (`\'GET\' | \'POST\'`), checks auth middleware, resolves typed handlers inside a `Map<string, ...>`, and emits JSON verified by the compiler before a single line ships to production.\n\nIn this TypeScript 5.x Mega Capstone, you unite all 25 chapters—interfaces, union types, `Map`/`Set`, discriminated results, and error guards—into a strictly typed HTTP Router & JSON Engine.',
      asciiFlowchart: `  [ HTTP Line: "POST /api/add 15 27" ]
         |
         v  (Method Union Gate -> Typed Map Route -> JSON.stringify)
  [ 200 {"sum":42} | 404 {"error":"not_found"} | 405 MethodNotAllowed ]`,
      pseudocode: [
        '1. DEFINE interface HttpReq { method: string; path: string } for typed parsing',
        '2. VALIDATE HTTP verbs against allowed literal union before route lookup',
        '3. DISPATCH route paths via Map<string, () => string> safely',
        '4. EMIT deterministic HTTP status + serialized JSON response bodies',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এন্ড-টু-এন্ড টাইপড ফুল-স্ট্যাক API রাউটার ও কন্ট্রাক্ট ইঞ্জিন (Mega Capstone)',
        explanation:
          'আধুনিক ফুল-স্ট্যাক ওয়েব প্রজেক্টে (Next.js, Express, Hono) টাইপস্ক্রিপ্ট হলো গোল্ড স্ট্যান্ডার্ড—কারণ ফ্রন্টএন্ড আর ব্যাকএন্ডের মাঝখানে ডেটার টাইপ (`interface HttpReq`, লিটারাল মেথড ইউনিয়ন `\'GET\' | \'POST\'`) শেয়ার করে নিলে রানটাইম বাগ ৯০% কমে যায়! সার্ভার যখন একটি রিকোয়েস্ট (`POST /api/add 15 27`) পায়, তখন প্রথমে মেথড গার্ড চালিয়ে দেখে অনুমোদিত মেথড কি না—নইলে `405 MethodNotAllowed` দেয়। এরপর সাধারণ অবজেক্টের বদলে `Map<string, () => string>` রাউট টেবিল ব্যবহার করলে প্রোটোটাইপ কলিশন (`toString`, `constructor`) ছাড়াই O(1) সময়ে হ্যান্ডলার মেলে! অজানা পাথে `undefined` না ছুঁড়ে নিরাপদ `404 {"error":"not_found"}` এবং ফলাফলে `JSON.stringify()` দিয়ে নির্ভুল JSON তৈরি করা হয়। এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এ শেখা সব টাইপস্ক্রিপ্ট সুপারপাওয়ার একসাথে যুক্ত করে একটি প্রোডাকশন-মানের HTTP রাউটার ও JSON ইঞ্জিন বানাবে!',
        everydayExample:
          'টাইপস্ক্রিপ্ট হলো বিমানবন্দরের ডিজিটাল পাসপোর্ট স্ক্যানার—ভুল ফর্মের রিকোয়েস্ট গেটেই (`type` check) আটকে দিয়ে সঠিক ডেস্কে (`Map` রাউটার) পাঠায়!',
        keyTakeaways: [
          'ইন্টারফেস ও লিটারাল ইউনিয়ন টাইপ (`\'GET\' | \'POST\'`) ব্যবহার করলে ভুল HTTP মেথড কোডেই ধরা পড়ে।',
          'ডাইনামিক রাউট টেবিলের জন্য `{}`-এর চেয়ে `Map<string, Handler>` অনেক নিরাপদ ও টাইপ-সেফ।',
          '`JSON.stringify()` দিয়ে সব API রেসপন্স সিরিয়ালাইজ করলে এস্কেপিং এরর হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Interface-Typed HTTP Request Line Parser',
        englishParagraphs: [
          'Modeling parsed wire lines inside `interface HttpReq { method: string; path: string }` gives downstream handlers clean autocomplete and strict validation.',
        ],
        banglaParagraphs: [
          '`HttpReq` ইন্টারফেসে HTTP মেথড ও পাথ টাইপসহ সংরক্ষণ করে রিকোয়েস্ট লাইন পার্স করা হয়েছে।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> req: HttpReq { method: 'GET', path: '/health' }`,
        code: `interface HttpReq { method: string; path: string; }
const raw: string = 'GET /health HTTP/1.1';
const parts: string[] = raw.trim().split(/\\s+/);
const req: HttpReq = { method: parts[0], path: parts[1] };
console.log('method=' + req.method + ' path=' + req.path);`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'interface HttpReq { method: string; path: string; }', whatItMeans: 'Contract defining parsed HTTP verb and endpoint path.', whyItIsThere: 'Enforces structural field presence across router layers.', ifDeletedError: 'Compile error: Cannot find name HttpReq.' },
        ],
      },
      {
        id: 'ts-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed JSON Response Serializer',
        englishParagraphs: [
          'Defining an interface `ApiScore { user: string; score: number }` before passing to `JSON.stringify()` locks API response shapes cleanly.',
        ],
        banglaParagraphs: [
          '`ApiScore` ইন্টারফেস অনুযায়ী ইনপুট ডাটা সাজিয়ে `JSON.stringify` দিয়ে HTTP 200 রেসপন্স প্রিন্ট করা হয়েছে।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `import * as fs from 'fs';
interface ApiScore { user: string; score: number; }
const [user, sStr] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const body: ApiScore = { user, score: Number(sStr) };
console.log('HTTP/1.1 200 OK');
console.log(JSON.stringify(body));`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'const body: ApiScore = { user, score: Number(sStr) };', whatItMeans: 'Constructs strictly typed response DTO before serializing.', whyItIsThere: 'Catches missing/misnamed JSON keys at compile time.', ifDeletedError: 'body undefined.' },
        ],
      },
      {
        id: 'ts-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Auth Middleware & Typed Map Route Table',
        englishParagraphs: [
          'Mapping paths via `Map<string, () => string>` eliminates prototype-property surprises cleanly while checking auth tokens upfront.',
        ],
        banglaParagraphs: [
          'অথেন্টিকেশন টোকেন যাচাই করে `Map<string, () => string>` টেবিল থেকে রাউট হ্যান্ডলার চালানো হয়েছে।',
        ],
        memoryDiagram: `/health secret -> auth OK -> routes.get('/health')() -> 200`,
        code: `import * as fs from 'fs';
const [path, tok] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const routes: Map<string, () => string> = new Map([
  ['/health', () => '200 ' + JSON.stringify({ ok: true })],
  ['/version', () => '200 ' + JSON.stringify({ ver: 'ts5' })],
]);
if (tok !== 'secret') console.log('401 Unauthorized');
else {
  const fn = routes.get(path);
  console.log(fn ? fn() : '404 NotFound');
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'const fn = routes.get(path);', whatItMeans: 'Returns (() => string) | undefined safely.', whyItIsThere: 'Forces explicit check before invoking handler.', ifDeletedError: 'Cannot locate route handler.' },
        ],
      },
      {
        id: 'ts-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Router & JSON Engine',
        englishParagraphs: [
          'Validates verbs (`GET` / `POST` -> `405` otherwise), routes `/health` and `/api/add`, and emits serialized JSON (`200` / `404`) across multi-request batches.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: একাধিক রিকোয়েস্ট পড়ে মেথড যাচাই, `/health` ও `/api/add` রাউটিং ও `JSON.stringify` উত্তর তৈরি!',
        ],
        memoryDiagram: `Request Batch -> Verb Check -> Route Match -> Typed JSON Output`,
        code: `import * as fs from 'fs';
const t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
const n: number = Number(t[0]) || 0;
for (let i = 0; i < n; i++) {
  const m = t[1 + 4 * i], p = t[2 + 4 * i], a = Number(t[3 + 4 * i]), b = Number(t[4 + 4 * i]);
  if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');
  else if (p === '/health') console.log('200 ' + JSON.stringify({ status: 'ok' }));
  else if (p === '/api/add') console.log('200 ' + JSON.stringify({ sum: a + b }));
  else console.log('404 ' + JSON.stringify({ error: 'not_found' }));
}`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: "if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');", whatItMeans: 'Enforces allowed HTTP method guard before routing.', whyItIsThere: 'Prevents unintended execution on unsupported verbs.', ifDeletedError: 'Unsupported verbs pass through.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'interface HttpReq { method: string; path: string; }', whatItMeans: 'Typed shape for parsed HTTP request line.', whyItIsThere: 'Guarantees verb and path exist as strings.', ifDeletedError: 'Compile error: HttpReq undefined.' },
      { lineNumber: 'Line 2', codeSnippet: "const raw: string = 'GET /health HTTP/1.1';", whatItMeans: 'Incoming HTTP header line literal.', whyItIsThere: 'Demonstrates parsing input packet.', ifDeletedError: 'raw undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'const parts: string[] = raw.trim().split(/\\s+/);', whatItMeans: 'Splits request string into string array tokens.', whyItIsThere: 'Isolates HTTP method and route.', ifDeletedError: 'Cannot populate req.' },
      { lineNumber: 'Line 4', codeSnippet: 'const req: HttpReq = { method: parts[0], path: parts[1] };', whatItMeans: 'Constructs typed HttpReq instance.', whyItIsThere: 'Prepares metadata for router.', ifDeletedError: 'req undefined.' },
      { lineNumber: 'Line 5', codeSnippet: "console.log('method=' + req.method + ' path=' + req.path);", whatItMeans: 'Logs extracted method and path.', whyItIsThere: 'Verifies parsed values.', ifDeletedError: 'No stdout produced.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse "GET /health 0 0"', memoryOrStack: 'm="GET", p="/health"', note: 'GET passes guard' },
      { step: 2, state: 'Hit "/health"', memoryOrStack: 'JSON.stringify({status:"ok"})', note: '200 {"status":"ok"}' },
      { step: 3, state: 'Parse "POST /api/add 15 27"', memoryOrStack: 'a+b = 42', note: '200 {"sum":42}' },
      { step: 4, state: 'Parse "GET /unknown 0 0"', memoryOrStack: 'Miss -> 404 branch', note: '404 {"error":"not_found"}' },
    ],
    harryBugTraps: [
      {
        title: 'Using Plain Object {} as Dynamic Route/KV Map in TS',
        brokenCode: `const routes: Record<string, () => void> = {}; routes['constructor'](); // Hits Object.prototype!`,
        fixedCode: `const routes = new Map<string, () => number>(); console.log(routes.get('constructor') ?? 404);`,
        whyItBreaks: 'Record objects expose inherited prototype keys unless backed by Map or Object.create(null).',
      },
      {
        title: 'Ignoring Possible undefined on routes.get(path)',
        brokenCode: `const fn = routes.get(path); fn(); // Object is possibly 'undefined' (TS2532)!`,
        fixedCode: `const m = new Map<string, () => string>(); const fn = m.get('/x'); console.log(fn ? fn() : '404 NotFound');`,
        whyItBreaks: 'Always check fn !== undefined and return 404 cleanly.',
      },
      {
        title: 'Building JSON via Template Literals Without Escaping',
        brokenCode: 'const json = `{"user":"${user}"}`; // Quotes in user corrupt payload!',
        fixedCode: `console.log(JSON.stringify({ user: 'argon"1' }));`,
        whyItBreaks: 'JSON.stringify guarantees valid JSON escaping across quotes, newlines, and Unicode.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-25-p1',
        difficulty: 'Easy',
        title: 'HTTP Status Code Labeler',
        prompt: 'Read int status code (200, 404, 500); print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: `Map<number, string>` দিয়ে কোড ম্যাপ করো।',
        starterCode: `import * as fs from 'fs';\nconst c: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst labels = new Map<number, string>([[200, 'OK'], [404, 'NOT_FOUND']]);\nconsole.log(labels.get(c) ?? 'SERVER_ERR');`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'ts-ch-25-p2',
        difficulty: 'Easy',
        title: 'Typed JSON Pair Emitter',
        prompt: 'Read key and integer value; emit exact JSON `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `JSON.stringify({ [k]: Number(v) })` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst [k, v] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconsole.log(JSON.stringify({ [k]: Number(v) }));`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'ts-ch-25-p3',
        difficulty: 'Medium',
        title: 'Query Parameter id Extractor',
        prompt: 'Read query string `id=42&mode=pro`; print value of `id`.',
        banglaHint: 'ইঙ্গিত: `&` ও `=` দিয়ে split করে `Map<string, string>` বানাও।',
        starterCode: `import * as fs from 'fs';\nconst pairs: Array<[string, string]> = fs.readFileSync(0, 'utf8').trim().split('&').map((p) => { const s = p.split('='); return [s[0], s[1] ?? '']; });\nconsole.log(new Map<string, string>(pairs).get('id') ?? '');`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'ts-ch-25-p4',
        difficulty: 'Medium',
        title: 'Sliding-Window API Rate Limiter',
        prompt: 'Read cap, n, and n sorted timestamps; count accepted requests within trailing 10s window.',
        banglaHint: 'ইঙ্গিত: হেড কার্সার `l` এগিয়ে `t - win[l] >= 10` বাদ দাও এবং `(win.length - l) < cap` হলে যোগ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst cap = nums[0], n = nums[1], win: number[] = []; let l = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  const t = nums[i];\n  while (l < win.length && t - win[l] >= 10) l++;\n  if (win.length - l < cap) win.push(t);\n}\nconsole.log(win.length);`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch-25-p5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store',
        prompt: 'Read n commands (`SET id val` or `GET id`); print stored number (0 default) for each GET.',
        banglaHint: 'ইঙ্গিত: `Map<number, number>` ব্যবহার করে `SET` ও `GET` চালাও।',
        starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n = Number(t[0]), db = new Map<number, number>(); let i = 1;\nfor (let step = 0; step < n; step++) {\n  if (t[i] === 'SET') { db.set(Number(t[i + 1]), Number(t[i + 2])); i += 3; }\n  else { console.log(db.get(Number(t[i + 1])) ?? 0); i += 2; }\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): TypeScript 5.x Full-Stack HTTP Router & JSON Engine',
      description: 'Combines typed verb validation, route dispatch, and JSON serialization cleanly.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ TypeScript HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n: number = Number(t[0]) || 0;\nfor (let i = 0; i < n; i++) {\n  const m = t[1 + 4 * i], p = t[2 + 4 * i], a = Number(t[3 + 4 * i]), b = Number(t[4 + 4 * i]);\n  if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');\n  else if (p === '/health') console.log('200 ' + JSON.stringify({ status: 'ok' }));\n  else if (p === '/api/add') console.log('200 ' + JSON.stringify({ sum: a + b }));\n  else console.log('404 ' + JSON.stringify({ error: 'not_found' }));\n}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `import * as fs from 'fs';\nconst t: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n: number = Number(t[0]) || 0;\nfor (let i = 0; i < n; i++) {\n  const m = t[1 + 4 * i], p = t[2 + 4 * i], a = Number(t[3 + 4 * i]), b = Number(t[4 + 4 * i]);\n  if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');\n  else if (p === '/health') console.log('200 ' + JSON.stringify({ status: 'ok' }));\n  else if (p === '/api/add') console.log('200 ' + JSON.stringify({ sum: a + b }));\n  else console.log('404 ' + JSON.stringify({ error: 'not_found' }));\n}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'ts25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'ts25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};


