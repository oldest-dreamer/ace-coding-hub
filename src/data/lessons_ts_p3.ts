import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_TS_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'TS Chapter 11 (TypeScript 5.x): 1D Typed Arrays, Traversal & Frequency Counting',
    banglaTitle: 'TS অধ্যায় ১১ (TypeScript 5.x): ১ডি টাইপড অ্যারে, ট্রাভার্সাল ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'number[] vs readonly number[], Int32Array typed buffers, O(N) frequency arrays, and safe bounds.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript gives JavaScript arrays static element guarantees: `const arr: number[] = [4, 9, 2]` catches accidental string insertions (`arr.push("hi")`) at compile time, while `readonly number[]` prevents accidental helper mutations.\n\nWhen counting bounded integers (`0..100`), pre-allocating `const freq: number[] = new Array(101).fill(0)` lets a single `O(N)` scan build an instant frequency table with `O(1)` bucket lookups—completely avoiding `O(N^2)` nested loops.',
      asciiFlowchart: `const arr: number[] = [3, 1, 3, 2, 3];
   |
   +--> const freq: number[] = new Array(4).fill(0);
   +--> Single O(N) scan: freq[x]++ -> [0, 1, 1, 3]`,
      pseudocode: [
        '1. PARSE typed number[] from stdin tokens',
        '2. ALLOCATE typed frequency array number[] = new Array(K + 1).fill(0)',
        '3. ACCUMULATE sum, best (seeded from arr[0]), and freq[x]++ in O(N)',
        '4. MUTATE or reverse strictly inside non-readonly number[] via tuple swap',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-চেক করা নম্বরযুক্ত লকার ও ট্যালি খাতা',
        explanation:
          'টাইপস্ক্রিপ্টে অ্যারে হলো `number[]` বা `Array<number>`, যা কম্পাইল করার সময়েই নিশ্চিত করে অ্যারের ভেতর কেবল সংখ্যাই ঢুকছে—ভুলেও কোনো স্ট্রিং বা `null` ঢুকে রানটাইমে `NaN` তৈরি করতে পারবে না! আর কোনো ফাংশনে অ্যারে পাঠানোর সময় যদি তা বদলানো না লাগে, তাহলে প্যারামিটারে `readonly number[]` লিখলে কম্পাইলার দুর্ঘটনাবশত মিউটেশন আটকে দেয়। এখন ১,০০০টি সংখ্যার ভেতরে কোন সংখ্যাটি কতবার এসেছে তা গুনতে গেলে প্রতিটি সংখ্যার জন্য পুরো অ্যারে বারবার খোঁজা `O(N^2)` সময়ের অপচয়। এর বদলে আমরা `const freq: number[] = new Array(101).fill(0)` নামে শূন্য-ভরা একটি ফ্রিকোয়েন্সি অ্যারে বানিয়ে মাত্র একবার লুপ চালিয়ে `freq[x]++` করি। সাথে প্রথম মান `arr[0]` দিয়ে `best` শুরু করলে সবগুলো সংখ্যা ঋণাত্মক হলেও সর্বোচ্চ মান নিখুঁতভাবে বের হয়। দুই প্রান্তের ইনডেক্স অদলবদল করে বাড়তি মেমোরি ছাড়াই `O(1)` স্পেসে অ্যারে উল্টানো যায়।',
        everydayExample:
          'ব্যাংকের প্রতিটি লকারে কেবল নির্দিষ্ট ধরন (`number[]`) রাখার সাইনবোর্ড লাগানো থাকলে ভুল জিনিস ঢোকার সুযোগই থাকে না।',
        keyTakeaways: [
          '`const freq: number[] = new Array(101).fill(0)` লিখতে কখনো `.fill(0)` ভুলবে না, নইলে `undefined + 1 = NaN` হবে।',
          '`readonly number[]` ব্যবহার করলে অপ্রত্যাশিত ইন-প্লেস মিউটেশন কম্পাইল টাইমেই ধরা পড়ে।',
          'অ্যারে সর্ট করার সময় সংখ্যার জন্য সবসময় `.sort((a, b) => a - b)` কম্পারেটর দেবে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed number[] Sum, Max & In-Place Reversal',
        englishParagraphs: [
          'Seed `best` with `arr[0]` rather than `0` so negative inputs work cleanly.',
          'TypeScript checks index types and destructuring tuple swaps statically.',
        ],
        banglaParagraphs: [
          'প্রথম মান `arr[0]` দিয়ে `best` শুরু করা হয়েছে যাতে ঋণাত্মক অ্যারেতেও সঠিক ফলাফল আসে।',
          'ডি-স্ট্রাকচারিং সোয়াপ দিয়ে `O(1)` অতিরিক্ত স্পেসে অ্যারে উল্টানো হয়েছে।',
        ],
        memoryDiagram: `arr: number[] = [4, 9, 2, 7] -> sum=22 max=9 -> [7, 2, 9, 4]`,
        code: `const arr: number[] = [4, 9, 2, 7];
let sum: number = 0;
let best: number = arr[0];
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
  if (arr[i] > best) best = arr[i];
}
for (let l = 0, r = arr.length - 1; l < r; l++, r--) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}
console.log("sum=" + sum + " max=" + best);
console.log(arr.join(" "));`,
        stdin: '',
        expectedOutput: 'sum=22 max=9\n7 2 9 4',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const arr: number[] = [4, 9, 2, 7];', whatItMeans: 'Declares strictly typed mutable numeric array.', whyItIsThere: 'Prevents non-numeric insertions at compile time.', ifDeletedError: 'Cannot find name arr.' },
        ],
      },
      {
        id: 'ts-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed Frequency Counting From Stdin',
        englishParagraphs: [
          'Reads `N` and `N` numbers via `fs.readFileSync(0, "utf8")`, tallying `freq: number[]` in `O(N)`.',
          'Iterating `0..100` prints all non-zero frequencies in ascending key order.',
        ],
        banglaParagraphs: [
          'স্ট্যান্ডার্ড ইনপুট থেকে সংখ্যাগুলো পড়ে `freq: number[]` অ্যারেতে এক পাসে গণনা করা হয়েছে।',
          'পরে `0` থেকে `100` লুপ চালিয়ে উপস্থিত মানগুলো সাজানো অবস্থায় প্রিন্ট হয়েছে।',
        ],
        memoryDiagram: `input=[5, 3, 5, 1] -> 1:1, 3:1, 5:2`,
        code: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8');
const tokens: number[] = raw.trim().split(/\\s+/).map(Number);
const n: number = tokens[0] || 0;
const freq: number[] = new Array(101).fill(0);
for (let i = 1; i <= n; i++) {
  freq[tokens[i]]++;
}
for (let v = 0; v <= 100; v++) {
  if (freq[v] > 0) console.log(v + ":" + freq[v]);
}`,
        stdin: '4\n5 3 5 1',
        expectedOutput: '1:1\n3:1\n5:2',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'const freq: number[] = new Array(101).fill(0);', whatItMeans: 'Allocates 101 zeroed integer frequency buckets.', whyItIsThere: 'Ensures slots start at 0 rather than undefined.', ifDeletedError: 'freq undeclared.' },
        ],
      },
      {
        id: 'ts-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed Right Cyclic Rotation via Helper Function',
        englishParagraphs: [
          'Using a typed helper `revRange(a: number[], l: number, r: number): void` reverses three sub-slices in `O(1)` extra space.',
          'Normalizing `k = k % nums.length` keeps shifts safe when `k >= n`.',
        ],
        banglaParagraphs: [
          'তিন ধাপের রিভার্স (`0..n-1`, `0..k-1`, `k..n-1`) দিয়ে বাড়তি অ্যারে ছাড়াই `O(N)` সময়ে রোটেট করা হয়েছে।',
          '`k % nums.length` অতিরিক্ত ঘূর্ণন সীমিত রাখে।',
        ],
        memoryDiagram: `[1,2,3,4,5] rot 2 -> [4, 5, 1, 2, 3]`,
        code: `function revRange(a: number[], l: number, r: number): void {
  while (l < r) {
    const tmp: number = a[l];
    a[l] = a[r];
    a[r] = tmp;
    l++;
    r--;
  }
}
const nums: number[] = [1, 2, 3, 4, 5];
const k: number = 2 % nums.length;
revRange(nums, 0, nums.length - 1);
revRange(nums, 0, k - 1);
revRange(nums, k, nums.length - 1);
console.log(nums.join(" "));`,
        stdin: '',
        expectedOutput: '4 5 1 2 3',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'function revRange(a: number[], l: number, r: number): void {', whatItMeans: 'Explicit parameter and void return types for in-place slice reverse.', whyItIsThere: 'Guarantees type-safe index operations.', ifDeletedError: 'revRange undefined.' },
        ],
      },
      {
        id: 'ts-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Unfilled Array(N) NaN & Reference Aliasing vs readonly Clone',
        englishParagraphs: [
          'Accepting `readonly number[]` inside pure analytics functions stops helpers from mutating caller state silently.',
          'Spread cloning `[...orig]` allocates an independent typed copy cleanly.',
        ],
        banglaParagraphs: [
          '`readonly number[]` দিলে ভেতরে ভুলে `a[0] = 99` লিখলেও কম্পাইলার সাথে সাথে এরর দেখায়।',
          'আসল ডেটা ঠিক রাখতে `[...orig]` দিয়ে শ্যালো কপি তৈরি করা হয়।',
        ],
        memoryDiagram: `readonly number[] blocks mutation | [...data] isolates clone`,
        code: `function sumAll(xs: readonly number[]): number {
  let total: number = 0;
  for (const x of xs) total += x;
  return total;
}
const orig: number[] = [2, 5, 3];
const copy: number[] = [...orig];
copy[0] = 99;
console.log("origSum=" + sumAll(orig) + " copy0=" + copy[0]);`,
        stdin: '',
        expectedOutput: 'origSum=10 copy0=99',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'function sumAll(xs: readonly number[]): number {', whatItMeans: 'Marks array read-only within sumAll scope.', whyItIsThere: 'Enforces immutability contract at compile time.', ifDeletedError: 'sumAll undefined.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const arr: number[] = [4, 9, 2, 7];', whatItMeans: 'Creates strongly typed numeric 1D array.', whyItIsThere: 'Enforces number elements statically.', ifDeletedError: 'arr undeclared.' },
      { lineNumber: 'Line 3', codeSnippet: 'let best: number = arr[0];', whatItMeans: 'Seeds running maximum with first valid element.', whyItIsThere: 'Safe even for negative-only arrays.', ifDeletedError: 'best undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'for (let i = 0; i < arr.length; i++) {', whatItMeans: 'Traverses 0 .. arr.length - 1 once in O(N).', whyItIsThere: 'Accumulates sum and max cleanly.', ifDeletedError: 'Totals stay zero.' },
      { lineNumber: 'Line 8', codeSnippet: 'for (let l = 0, r = arr.length - 1; l < r; l++, r--) {', whatItMeans: 'Converges opposite pointers to reverse in-place.', whyItIsThere: 'O(1) extra memory reversal.', ifDeletedError: 'Array stays unreversed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i=0: 4', memoryOrStack: 'sum=4, best=4', note: 'Typed number state' },
      { step: 2, state: 'i=1..3: 9, 2, 7', memoryOrStack: 'sum=22, best=9', note: 'Single O(N) pass' },
      { step: 3, state: 'l=0, r=3 swap', memoryOrStack: '[7, 9, 2, 4]', note: 'Outer endpoints swapped' },
      { step: 4, state: 'l=1, r=2 swap', memoryOrStack: '[7, 2, 9, 4]', note: 'Reversal complete' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Omitting .fill(0) on Typed Frequency Array', brokenCode: `const freq: number[] = new Array(10); freq[2]++; // NaN!`, fixedCode: `const freq: number[] = new Array(10).fill(0);`, whyItBreaks: 'Sparse array slots initialize to undefined, causing NaN arithmetic.' },
      { title: 'Trap 2: Default .sort() Without Numeric Comparator', brokenCode: `const a: number[] = [10, 2, 1]; a.sort(); // [1, 10, 2]!`, fixedCode: `a.sort((x: number, y: number) => x - y);`, whyItBreaks: 'Runtime JS Array.sort() compares stringified numbers lexicographically.' },
      { title: 'Trap 3: Off-by-One Access at arr[arr.length]', brokenCode: `for (let i = 0; i <= arr.length; i++) sum += arr[i]; // NaN!`, fixedCode: `for (let i = 0; i < arr.length; i++) sum += arr[i];`, whyItBreaks: 'Last index is arr.length - 1.' },
    ],
    practiceSheet: [
      { id: 'ts-ch11-p1', difficulty: 'Easy', title: 'Array Sum & Maximum', prompt: 'Read `N` and `N` numbers, print `<sum> <max>`.', banglaHint: '`best = a[0]` রেখে একবার লুপ চালাও।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0]; let sum: number = 0, mx: number = t[1];\nfor (let i = 1; i <= n; i++) { sum += t[i]; if (t[i] > mx) mx = t[i]; }\nconsole.log(sum + " " + mx);`, sampleStdin: '4\n-5 -2 -9 -3', expectedOutput: '-19 -2' },
      { id: 'ts-ch11-p2', difficulty: 'Easy', title: 'Reverse Array In-Place', prompt: 'Read `N` and `N` ints, print reversed space-separated.', banglaHint: '`l < r` শর্তে প্রান্তগুলো অদলবদল করো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst a: number[] = t.slice(1, 1 + t[0]);\nfor (let l = 0, r = a.length - 1; l < r; l++, r--) [a[l], a[r]] = [a[r], a[l]];\nconsole.log(a.join(" "));`, sampleStdin: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { id: 'ts-ch11-p3', difficulty: 'Medium', title: 'Most Frequent Value (0..100)', prompt: 'Read `N` numbers in `0..100`, print modal value (smallest on ties).', banglaHint: '`new Array(101).fill(0)` দিয়ে ফ্রিকোয়েন্সি গোনো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst freq: number[] = new Array(101).fill(0);\nfor (let i = 1; i <= t[0]; i++) freq[t[i]]++;\nlet ans: number = 0;\nfor (let v = 1; v <= 100; v++) if (freq[v] > freq[ans]) ans = v;\nconsole.log(ans);`, sampleStdin: '6\n4 2 4 3 2 4', expectedOutput: '4' },
      { id: 'ts-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct Element', prompt: 'Print second largest distinct value (`-1` if absent).', banglaHint: '`first` ও `second` ভ্যারিয়েবল রেখে ডুপ্লিকেট বাদ দাও।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet f: number = -Infinity, s: number = -Infinity;\nfor (let i = 1; i <= t[0]; i++) { const x = t[i]; if (x > f) { s = f; f = x; } else if (x < f && x > s) s = x; }\nconsole.log(s === -Infinity ? -1 : s);`, sampleStdin: '5\n10 5 10 8 3', expectedOutput: '8' },
      { id: 'ts-ch11-p5', difficulty: 'Hard', title: 'Missing Value in 0..N', prompt: 'Given `N` and `N` distinct numbers from `0..N`, return the missing number in `O(N)`.', banglaHint: '`Math.trunc(n * (n + 1) / 2)` থেকে প্রাপ্ত যোগফল বিয়োগ করো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0]; let got: number = 0;\nfor (let i = 1; i <= n; i++) got += t[i];\nconsole.log(Math.trunc((n * (n + 1)) / 2) - got);`, sampleStdin: '4\n3 0 1 4', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Typed Frequency & Mode Analyzer',
      description: 'Read N integers (0..1000) into typed buckets and print the modal value with its count.',
      banglaGoal: 'টাইপড ফ্রিকোয়েন্সি অ্যারে দিয়ে `O(N)` সময়ে মোড ও কাউন্ট প্রিন্ট করো।',
      combinesChapters: 'TS Ch 1–11',
      starterCode: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8');
const tokens: number[] = raw.trim().split(/\\s+/).map(Number);
const n: number = tokens[0] || 0;
const freq: number[] = new Array(1001).fill(0);
for (let i = 1; i <= n; i++) freq[tokens[i]]++;
let bestVal: number = 0;
for (let v = 1; v <= 1000; v++) {
  if (freq[v] > freq[bestVal]) bestVal = v;
}
console.log(bestVal + " " + freq[bestVal]);`,
      sampleStdin: '6\n5 2 5 8 2 5',
      expectedOutput: '5 3',
    },
    starterCode: `import * as fs from 'fs';

const raw: string = fs.readFileSync(0, 'utf8');
const tokens: number[] = raw.trim().split(/\\s+/).map(Number);
const n: number = tokens[0] || 0;
const freq: number[] = new Array(1001).fill(0);
for (let i = 1; i <= n; i++) freq[tokens[i]]++;
let bestVal: number = 0;
for (let v = 1; v <= 1000; v++) {
  if (freq[v] > freq[bestVal]) bestVal = v;
}
console.log(bestVal + " " + freq[bestVal]);`,
    sampleStdin: '6\n5 2 5 8 2 5',
    expectedSampleOutput: '5 3',
    testCases: [
      { id: 'ts11-t1', input: '6\n5 2 5 8 2 5', expectedOutput: '5 3' },
      { id: 'ts11-t2', input: '4\n7 7 1 2', expectedOutput: '7 2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'TS Chapter 12 (TypeScript 5.x): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'TS অধ্যায় ১২ (TypeScript 5.x): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিকস',
    subtitle: 'Opposite-end sorted pointer convergence, O(N) fixed K-window sliding, variable windows, and slow/fast pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'Using nested loops (`O(N^2)`) or `.slice()` inside loops (`O(N * K)`) quickly triggers Time Limit Exceeded when $N = 10^5$. Replacing brute-force pair checks with **Opposite-End Two Pointers** on sorted `readonly number[]` and **Sliding Window** delta shifts brings execution down to pure linear `O(N)` time.\n\nWhen the input is sorted, `sum < target` eliminates the entire row of pairs for `l` (`l++`), while `sum > target` eliminates `r` (`r--`). For contiguous windows of width `K`, computing the first `K` sum once lets every shift execute `win += a[i] - a[i - k]` in `O(1)`.',
      asciiFlowchart: `Sorted a: readonly number[] = [2, 4, 7, 10, 15], target = 14
  l=0 (2)                  r=4 (15) -> 17 > 14 -> r--
  l=0 (2)            r=3 (10)       -> 12 < 14 -> l++
       l=1 (4)       r=3 (10)       -> 14 == MATCH!`,
      pseudocode: [
        '1. SORT if unsorted via a.sort((x, y) => x - y), then loop while l < r',
        '2. SLIDE fixed K-window via win += a[i] - a[i - k] in O(N) total',
        '3. CONTRACT variable non-negative window via while (sum > S) sum -= a[l++]',
        '4. DEDUPLICATE sorted arrays in-place via write pointer w and read pointer r',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই দিকের চিমটি ও চলন্ত ক্যামেরার ফ্রেম',
        explanation:
          'সাজানো তালিকায় (`[2, 4, 7, 10, 15]`) দুটি সংখ্যার যোগফল ১৪ খুঁজতে প্রতিটি জোড়া মিলিয়ে দেখা `O(N^2)` ধাপের কাজ। এর বদলে বামে `l = 0` ও ডানে `r = n - 1` নিয়ে `while (l < r)` লুপ চালাও: যোগফল বেশি হলে বড় সংখ্যাটি কমাতে `r--`, আর কম হলে ছোট সংখ্যাটি বাড়াতে `l++`! মাত্র `O(N)` ধাপেই সঠিক জোড়া মেলে। দ্বিতীয় কৌশল হলো **Sliding Window**: `K = 3`টি টানা উপাদানের সর্বোচ্চ যোগফল বের করতে লুপের ভেতরে `.slice(i, i + k)` করলে `O(N*K)` সময় ও মেমোরি নষ্ট হয়! তার চেয়ে শুরুতে প্রথম `K`টি যোগ করে এরপর প্রতিটি ধাপে কেবল সামনের নতুন উপাদান যোগ এবং পেছনের পুরনো উপাদান বিয়োগ (`win += a[i] - a[i - k]`) করলে পুরো কাজটি `O(N)` সময়ে চলে। আর ধনাত্মক অ্যারেতে ভ্যারিয়েবল উইন্ডোর যোগফল `S` ছাড়ালে `while (sum > S) sum -= a[l++]` দিয়ে সহজেই দীর্ঘতম বৈধ সাব-অ্যারে পাওয়া যায়।',
        everydayExample:
          'রেলগাড়ির জানালা এক বগি সামনে সরলে সামনের বগির যাত্রী ফ্রেমে ঢোকে আর পেছনের বগির যাত্রী বেরিয়ে যায়—পুরো ট্রেন নতুন করে গুনতে হয় না।',
        keyTakeaways: [
          'অ-সাজানো অ্যারেতে Two-Pointer চালানোর আগে অবশ্যই `.sort((x: number, y: number) => x - y)` চালাবে।',
          '`win += a[i] - a[i - k]` ফিক্সড উইন্ডো `O(N)` সময়ে সমাধান করে (কখনো `.slice()` করবে না)।',
          'দুটি আলাদা উপাদান যোগ করতে `while (l < r)` রাখতে হয়—`l <= r` দিলে একই উপাদান দুবার যোগ হয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Opposite-End Two-Sum in Sorted number[]',
        englishParagraphs: [
          'Type annotations guarantee indices stay numeric and comparisons never coerce strings.',
          'Loop runs strictly while `l < r`, visiting at most `N` positions total.',
        ],
        banglaParagraphs: [
          'দুই প্রান্তে `l = 0` ও `r = a.length - 1` রেখে `while (l < r)` চালালে একটি সংখ্যা নিজের সাথে যোগ হওয়ার ভুল হয় না।',
          'প্রতি ধাপে অন্তত একটি প্রান্ত ভেতরে সরে আসায় জটিলতা মাত্র `O(N)`।',
        ],
        memoryDiagram: `[2, 4, 7, 10, 15], target=14 -> 4 10`,
        code: `const a: readonly number[] = [2, 4, 7, 10, 15];
const target: number = 14;
let l: number = 0, r: number = a.length - 1;
while (l < r) {
  const s: number = a[l] + a[r];
  if (s === target) {
    console.log(a[l] + " " + a[r]);
    break;
  }
  if (s < target) l++;
  else r--;
}`,
        stdin: '',
        expectedOutput: '4 10',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'while (l < r) {', whatItMeans: 'Restricts search to pairs with distinct indices l < r.', whyItIsThere: 'Prevents adding a[l] to itself when l === r.', ifDeletedError: 'Loop missing.' },
        ],
      },
      {
        id: 'ts-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fixed K-Window Maximum Sum via Stdin',
        englishParagraphs: [
          'Reads `n, k` and `n` numbers, sums `[0..k-1]` once, and shifts window right via `a[i] - a[i - k]`.',
          'Time complexity stays strict `O(N)` even when `K = N / 2`.',
        ],
        banglaParagraphs: [
          'শুরুতে প্রথম `k` উপাদান যোগ করে এরপর `win += a[i] - a[i - k]` দিয়ে `O(1)` সময়ে জানালা সরানো হয়েছে।',
          '`K` যত বড়ই হোক, প্রোগ্রামটি লিনিয়ার সময়েই চলে।',
        ],
        memoryDiagram: `[5,2,8,1,9], k=3 -> 18`,
        code: `import * as fs from 'fs';

const t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = t[0] || 0, k: number = t[1] || 0;
const a: number[] = t.slice(2, 2 + n);
let win: number = 0;
for (let i = 0; i < k; i++) win += a[i];
let best: number = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Adds incoming right element and drops exiting left element.', whyItIsThere: 'Maintains O(N) runtime regardless of K.', ifDeletedError: 'best never updates past initial K sum.' },
        ],
      },
      {
        id: 'ts-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Variable Sliding Window (Longest Subarray Sum <= S)',
        englishParagraphs: [
          'Right index `r` adds non-negative values while left index `l` trims excess whenever `sum > S`.',
          'Both pointers advance monotonically so total work is `O(N)`.',
        ],
        banglaParagraphs: [
          'অঋণাত্মক সংখ্যায় `sum > S` হলে `l` ডানে এগিয়ে জানালা ছোট করা হয়েছে।',
          'প্রতি ধাপে সর্বোচ্চ বৈধ দৈর্ঘ্য `r - l + 1` সংরক্ষণ করা হয়েছে।',
        ],
        memoryDiagram: `[3, 1, 2, 7, 4], S=6 -> [3, 1, 2] len=3`,
        code: `const a: readonly number[] = [3, 1, 2, 7, 4];
const limit: number = 6;
let sum: number = 0, l: number = 0, best: number = 0;
for (let r = 0; r < a.length; r++) {
  sum += a[r];
  while (sum > limit) sum -= a[l++];
  if (r - l + 1 > best) best = r - l + 1;
}
console.log(best);`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'while (sum > limit) sum -= a[l++];', whatItMeans: 'Contracts window left edge until valid again.', whyItIsThere: 'Restores sum <= limit invariant.', ifDeletedError: 'Returns oversized window length.' },
        ],
      },
      {
        id: 'ts-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Lexicographic .sort() Trap vs In-Place Deduplication',
        englishParagraphs: [
          'Forgetting the numeric comparator `(x, y) => x - y` before opposite-end pointers breaks sorted order (`"10" < "2"`).',
          'Slow/fast same-direction pointers remove sorted duplicates in `O(1)` extra space.',
        ],
        banglaParagraphs: [
          'নম্বর সর্টিংয়ে `(x, y) => x - y` না দিলে `10`, `2`-এর আগে চলে এসে টু-পয়েন্টার ভেঙে দেয়!',
          'স্লো/ফাস্ট পয়েন্টারে বাড়তি মেমোরি ছাড়াই ইউনিক উপাদান আলাদা করা যায়।',
        ],
        memoryDiagram: `[1,1,2,2,2,5,5] -> unique=3`,
        code: `const a: number[] = [1, 1, 2, 2, 2, 5, 5];
let w: number = 0;
for (let r = 0; r < a.length; r++) {
  if (w === 0 || a[r] !== a[w - 1]) a[w++] = a[r];
}
console.log("unique=" + w);`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'if (w === 0 || a[r] !== a[w - 1]) a[w++] = a[r];', whatItMeans: 'Compacts distinct sorted values toward front.', whyItIsThere: 'O(N) deduplication in O(1) space.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const a: readonly number[] = [2, 4, 7, 10, 15];', whatItMeans: 'Read-only sorted number array for two-pointer search.', whyItIsThere: 'Guarantees monotonic pointer movement without mutation.', ifDeletedError: 'a undeclared.' },
      { lineNumber: 'Line 3', codeSnippet: 'let l: number = 0, r: number = a.length - 1;', whatItMeans: 'Initializes opposing endpoints cleanly.', whyItIsThere: 'Covers full range first.', ifDeletedError: 'Pointers undefined.' },
      { lineNumber: 'Line 10', codeSnippet: 'if (s < target) l++; else r--;', whatItMeans: 'Eliminates one bound strictly each step.', whyItIsThere: 'Guarantees linear O(N) termination.', ifDeletedError: 'Infinite loop.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'r-- to 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'l++ to 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Outputs 4 10' },
      { step: 4, state: 'break', memoryOrStack: '3 iterations', note: 'O(N) complete' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: .sort() Without Comparator Before Two Pointers', brokenCode: `nums.sort(); // [10, 2, 4]!`, fixedCode: `nums.sort((x: number, y: number) => x - y);`, whyItBreaks: 'Default Array.sort converts numbers to UTF-16 strings.' },
      { title: 'Trap 2: Re-Summing Slices Inside K-Window Loop', brokenCode: `for (let i = 0; i <= n - k; i++) a.slice(i, i + k)...`, fixedCode: `win += a[i] - a[i - k];`, whyItBreaks: 'Allocating slices every step explodes time complexity to O(N * K).' },
      { title: 'Trap 3: Allowing l <= r When Two Distinct Indices Required', brokenCode: `while (l <= r) ...`, fixedCode: `while (l < r) ...`, whyItBreaks: 'At l === r the same item is summed twice.' },
    ],
    practiceSheet: [
      { id: 'ts-ch12-p1', difficulty: 'Easy', title: 'Sorted Two-Sum Check', prompt: 'Given `N`, `target`, and sorted array, output `YES` if pair sums to `target` else `NO`.', banglaHint: '`while (l < r)` চালিয়ে `a[l] + a[r]` যাচাই করো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0], target: number = t[1], a: number[] = t.slice(2, 2 + n);\nlet l = 0, r = n - 1, ok = false;\nwhile (l < r) { const s = a[l] + a[r]; if (s === target) { ok = true; break; } if (s < target) l++; else r--; }\nconsole.log(ok ? "YES" : "NO");`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'ts-ch12-p2', difficulty: 'Easy', title: 'Max K-Window Sum', prompt: 'Find max sum of `K` consecutive values in `O(N)`.', banglaHint: '`win += a[i] - a[i - k]` সূত্র ব্যবহার করো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0], k: number = t[1], a: number[] = t.slice(2, 2 + n);\nlet w = 0; for (let i = 0; i < k; i++) w += a[i];\nlet b = w; for (let i = k; i < n; i++) { w += a[i] - a[i - k]; if (w > b) b = w; }\nconsole.log(b);`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'ts-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Output max length subarray of non-negatives with sum `<= S`.', banglaHint: '`while (sum > S) sum -= a[l++];` করো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0], S: number = t[1], a: number[] = t.slice(2, 2 + n);\nlet sum = 0, l = 0, best = 0;\nfor (let r = 0; r < n; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; if (r - l + 1 > best) best = r - l + 1; }\nconsole.log(best);`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'ts-ch12-p4', difficulty: 'Medium', title: 'Move Zeros to End', prompt: 'Move zeros to back preserving non-zero relative order.', banglaHint: '`w` রাইট-পয়েন্টার দিয়ে অ-শূন্য উপাদান সামনে আনো।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0], a: number[] = t.slice(1, 1 + n);\nlet w = 0; for (let r = 0; r < n; r++) if (a[r] !== 0) { [a[w], a[r]] = [a[r], a[w]]; w++; }\nconsole.log(a.join(" "));`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'ts-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Compute max `Math.min(h[l], h[r]) * (r - l)`.', banglaHint: 'ছোট উচ্চতার প্রান্তটি ভেতরের দিকে সরাও।', starterCode: `import * as fs from 'fs';\nconst t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n: number = t[0], h: number[] = t.slice(1, 1 + n);\nlet l = 0, r = n - 1, best = 0;\nwhile (l < r) { const area = Math.min(h[l], h[r]) * (r - l); if (area > best) best = area; if (h[l] < h[r]) l++; else r--; }\nconsole.log(best);`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Typed K-Window Sliding Engine',
      description: 'Read N, K and typed numbers from stdin and calculate max K-window sum in O(N) time.',
      banglaGoal: 'স্লাইডিং উইন্ডো পদ্ধতিতে `O(N)` সময়ে `K` দৈর্ঘ্যের সর্বোচ্চ সাব-অ্যারে সাম বের করো।',
      combinesChapters: 'TS Ch 1–12',
      starterCode: `import * as fs from 'fs';

const t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = t[0] || 0, k: number = t[1] || 0;
const a: number[] = t.slice(2, 2 + n);
let win: number = 0;
for (let i = 0; i < k; i++) win += a[i];
let best: number = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `import * as fs from 'fs';

const t: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n: number = t[0] || 0, k: number = t[1] || 0;
const a: number[] = t.slice(2, 2 + n);
let win: number = 0;
for (let i = 0; i < k; i++) win += a[i];
let best: number = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'ts12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'ts12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'Prefix Sums & Difference Arrays',
    banglaTitle: 'প্রিফিক্স সাম ও ডিফারেন্স অ্যারে',
    subtitle: 'Typed number[] prefix tables, O(1) range sums, and offline interval difference updates',
    zeroIntuition: {
      plainEnglishStory:
        'A 1-based prefix sum array `pref: number[]` of length `n + 1` records cumulative totals `pref[i + 1] = pref[i] + arr[i]`. Once constructed in `O(n)`, any slice sum from `l` to `r` takes constant `O(1)` time via `pref[r + 1] - pref[l]`.\n\nA difference array `diff: number[]` solves the dual problem: instead of running nested loops to add `val` across `[l, r]` for `m` queries, you update just two endpoints (`diff[l] += val`, `diff[r + 1] -= val`) and run one final prefix pass.',
      asciiFlowchart:
        'arr  = [4, 2, 7, 1]\npref = [0, 4, 6, 13, 14]\nsum(1..2) = pref[3] - pref[1] = 13 - 4 = 9',
      pseudocode: ["const pref: number[] = new Array(n + 1).fill(0)","for i = 0..n-1: pref[i+1] = pref[i] + arr[i]","query(l, r) -> pref[r+1] - pref[l]"],
      banglaZeroToHero: {
        analogyTitle: 'রেলস্টেশনের ক্রমবর্ধমান দূরত্ব ফলক দেখে এক বিয়োগে দূরত্ব বের করা',
        explanation:
          'কল্পনা করো একটি হাইওয়ের প্রতিটি মাইলফলকে ঢাকা থেকে মোট দূরত্ব লেখা আছে—যেমন কুমিল্লা ৯৫ কিমি এবং ফেনী ১৪৫ কিমি। এখন কুমিল্লা থেকে ফেনীর দূরত্ব বের করতে তোমাকে ফিতা নিয়ে মাপতে হবে না, শুধু ১৪৫ থেকে ৯৫ বিয়োগ করলেই ৫০ কিমি পেয়ে যাবে। প্রিফিক্স সাম ঠিক এই ধারণাই ব্যবহার করে: আগে `pref: number[]` অ্যারেতে প্রথম ঘর `0` রেখে প্রতিটি ইনডেক্স পর্যন্ত যোগফল জমিয়ে রাখে। এতে হাজার হাজার রেঞ্জ সাম কুয়েরির প্রতিটির উত্তর `O(n)` লুপের বদলে `O(1)` সময়ে `pref[r + 1] - pref[l]` দিয়ে বের হয়। টাইপস্ক্রিপ্টে `new Array<number>(n + 1).fill(0)` লিখলে প্রতিটি ঘরে সংখ্যা থাকার নিশ্চয়তা কম্পাইল টাইমেই মিলে এবং `undefined` বাগ আসে না। আর ডিফারেন্স অ্যারে হলো প্রিফিক্স সামের বিপরীত: একাধিক `[l, r]` রেঞ্জে `+v` যোগ করতে হলে শুধু `diff[l] += v` এবং `diff[r + 1] -= v` করে শেষে একবার প্রিফিক্স স্ক্যান করলেই হয়। নেগেটিভ সংখ্যা থাকলে প্রিফিক্স সামের সাথে `Map<number, number>` জুড়ে দিলে টার্গেট যোগফলের সাবঅ্যারে গোনা খুব সহজ হয়ে যায়। এই অধ্যায়ে আমরা টাইপ-সেফ প্রিফিক্স সাম ও ডিফারেন্স অ্যারের বাস্তব ব্যবহার শিখব।',
        everydayExample: 'দৈনিক আয়ের স্টেটমেন্টে ক্রমবর্ধমান মোট আয় লেখা থাকলে যেকোনো সপ্তাহের মোট আয় শেষ দিনের মোট থেকে আগের সপ্তাহের মোট বিয়োগ করলেই পাওয়া যায়।',
        keyTakeaways: [
          '১-বেসড `pref` অ্যারে (`pref[0] = 0`) সব রেঞ্জ `[l, r]`-কে ব্রাঞ্চ ছাড়াই `pref[r + 1] - pref[l]` করে দেয়।',
          'ডিফারেন্স অ্যারের সাইজ `n + 2` রাখলে ১-বেসড `r = n` হলেও `diff[r + 1]` নিরাপদ থাকে।',
          'সাবঅ্যারে সাম `= k` বের করতে `Map<number, number>`-এ অবশ্যই আগে `map.set(0, 1)` বসাতে হবে।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch13-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Typed Prefix Sum Array Construction',
        englishParagraphs: [
          'Initializing `pref` with `new Array<number>(arr.length + 1).fill(0)` guarantees numeric slots so TypeScript prevents `undefined` arithmetic.',
        ],
        banglaParagraphs: [
          '`new Array<number>(arr.length + 1).fill(0)` দিয়ে প্রিফিক্স অ্যারে তৈরি করে O(1) সময়ে রেঞ্জ যোগফল বের করো।',
        ],
        memoryDiagram: 'arr=[2,5,3,8] -> pref=[0,2,7,10,18]',
        code: `const arr: number[] = [2, 5, 3, 8];\nconst pref: number[] = new Array(arr.length + 1).fill(0);\nfor (let i = 0; i < arr.length; i++) {\n  pref[i + 1] = pref[i] + arr[i];\n}\nconsole.log(pref[4] - pref[1]);`,
        stdin: '',
        expectedOutput: '16',
        lineByLine: [
          {"lineNumber":"Line 2","codeSnippet":"const pref: number[] = new Array(arr.length + 1).fill(0);","whatItMeans":"Creates 1-based typed zero-filled prefix array.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix slots default to `undefined`, producing `NaN`."},
          {"lineNumber":"Line 4","codeSnippet":"  pref[i + 1] = pref[i] + arr[i];","whatItMeans":"Accumulates running prefix total in O(n).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix array remains all zeros."},
          {"lineNumber":"Line 6","codeSnippet":"console.log(pref[4] - pref[1]);","whatItMeans":"Computes inclusive sum of indices `1..3` in O(1).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output printed."},
        ],
      },
      {
        id: 'ts-ch13-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Batch Range Query Solver',
        englishParagraphs: [
          'Parse `n`, `q`, the initial array, and `q` 1-based `(l, r)` queries from stdin, printing all query totals quickly.',
        ],
        banglaParagraphs: [
          'একবার প্রিফিক্স অ্যারে বানিয়ে অনেকগুলো `(l, r)` কুয়েরির উত্তর দ্রুত প্রিন্ট করো।',
        ],
        memoryDiagram: 'query(l, r) -> pref[r] - pref[l - 1]',
        code: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet p = 0;\nconst n = nums[p++], q = nums[p++];\nconst pref: number[] = new Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + nums[p++];\nconst out: number[] = [];\nfor (let k = 0; k < q; k++) {\n  const l = nums[p++], r = nums[p++];\n  out.push(pref[r] - pref[l - 1]);\n}\nconsole.log(out.join('\\n'));`,
        stdin: '5 2\n3 1 4 1 5\n2 4\n1 5',
        expectedOutput: '6\n14',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + nums[p++];","whatItMeans":"Constructs 1-indexed prefix sums directly from input cursor.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix values stay zero."},
          {"lineNumber":"Line 10","codeSnippet":"  out.push(pref[r] - pref[l - 1]);","whatItMeans":"Answers each interval sum in constant time.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Output buffer remains empty."},
        ],
      },
      {
        id: 'ts-ch13-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Difference Array Bandwidth Peak Analyzer',
        englishParagraphs: [
          'Apply `m` bandwidth reservations `[l, r, v]` in O(1) each via `diff`, then sweep once to locate maximum simultaneous usage.',
        ],
        banglaParagraphs: [
          'ডিফারেন্স অ্যারে দিয়ে সব রিজার্ভেশন যোগ করে একবার স্ক্যানেই সর্বোচ্চ ব্যান্ডউইথ লোড বের করো।',
        ],
        memoryDiagram: 'diff[l]+=v, diff[r+1]-=v -> sweep max',
        code: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet p = 0;\nconst n = nums[p++], m = nums[p++];\nconst diff: number[] = new Array(n + 2).fill(0);\nfor (let i = 0; i < m; i++) {\n  const l = nums[p++], r = nums[p++], v = nums[p++];\n  diff[l] += v;\n  diff[r + 1] -= v;\n}\nlet cur = 0, best = 0;\nfor (let i = 1; i <= n; i++) {\n  cur += diff[i];\n  if (cur > best) best = cur;\n}\nconsole.log(best);`,
        stdin: '5 3\n1 3 10\n2 5 5\n3 4 7',
        expectedOutput: '22',
        lineByLine: [
          {"lineNumber":"Line 5","codeSnippet":"const diff: number[] = new Array(n + 2).fill(0);","whatItMeans":"Allocates `n + 2` slots so `r + 1` never turns undefined.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing difference array."},
          {"lineNumber":"Line 9","codeSnippet":"  diff[r + 1] -= v;","whatItMeans":"Ends the effect of `+v` immediately after index `r`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Added bandwidth carries past `r`."},
        ],
      },
      {
        id: 'ts-ch13-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Prefix Sum + Map Subarray Count Equals K',
        englishParagraphs: [
          'Track seen prefix sums in `Map<number, number>` seeded with `0 -> 1` so subarrays with negative numbers summing to `k` are counted in `O(n)`.',
        ],
        banglaParagraphs: [
          '`Map<number, number>`-এ `(0, 1)` রেখে প্রিফিক্স সাম ব্যবহার করলে নেগেটিভ সংখ্যাসহ সাবঅ্যারেও O(n) সময়ে গোনা যায়।',
        ],
        memoryDiagram: 'seen.get(pref - k) adds count before storing seen[pref]',
        code: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1];\nconst seen = new Map<number, number>([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 0; i < n; i++) {\n  pref += nums[2 + i];\n  ans += seen.get(pref - k) ?? 0;\n  seen.set(pref, (seen.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
        stdin: '5 3\n1 2 -1 2 1',
        expectedOutput: '3',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"const seen = new Map<number, number>([[0, 1]]);","whatItMeans":"Seeds empty prefix sum `0` once.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefixes equaling `k` from index 0 are missed."},
          {"lineNumber":"Line 8","codeSnippet":"  ans += seen.get(pref - k) ?? 0;","whatItMeans":"Safely unwraps undefined Map lookups with nullish coalescing.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Matches are never summed into `ans`."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"const arr: number[] = [2, 5, 3, 8];","whatItMeans":"Typed numeric input array.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No source numbers."},
      {"lineNumber":"Line 2","codeSnippet":"const pref: number[] = new Array(arr.length + 1).fill(0);","whatItMeans":"Zero-initialized 1-based prefix table.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix slots start `undefined`."},
      {"lineNumber":"Line 3","codeSnippet":"for (let i = 0; i < arr.length; i++) {","whatItMeans":"Scans source array sequentially.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prefix totals remain zero."},
      {"lineNumber":"Line 4","codeSnippet":"  pref[i + 1] = pref[i] + arr[i];","whatItMeans":"Stores running total at `i + 1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No accumulation."},
      {"lineNumber":"Line 6","codeSnippet":"console.log(pref[4] - pref[1]);","whatItMeans":"Outputs `16` in O(1).","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing printed."},
    ],
    dryRunTable: [
      { step: 1, state: 'fill(0)', memoryOrStack: 'pref=[0,0,0,0,0]', note: 'Guarded length n+1 array' },
      { step: 2, state: 'i=0..1', memoryOrStack: 'pref=[0,2,7,0,0]', note: 'Accumulated first two items' },
      { step: 3, state: 'i=2..3', memoryOrStack: 'pref=[0,2,7,10,18]', note: 'Prefix array completed' },
      { step: 4, state: 'pref[4]-pref[1]', memoryOrStack: '18 - 2 = 16', note: 'Constant-time range query' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Unfilled `new Array(n + 1)` Leaving `undefined` Slots',
        brokenCode: 'const pref = new Array<number>(n + 1); pref[0] = 0;',
        fixedCode: 'const pref = new Array<number>(n + 1).fill(0);',
        whyItBreaks: 'Missing `.fill(0)` on sparse arrays yields `NaN` whenever `undefined + x` runs.',
      },
      {
        title: 'Trap 2: Omitting `0 -> 1` in Prefix Sum HashMap',
        brokenCode: 'const seen = new Map<number, number>();',
        fixedCode: 'const seen = new Map<number, number>([[0, 1]]);',
        whyItBreaks: 'Subarrays beginning at index `0` require an empty prefix `0` to be matched.',
      },
      {
        title: 'Trap 3: Modifying `diff` Array Without Trailing Extra Slot',
        brokenCode: 'const diff = new Array<number>(n + 1).fill(0); diff[n + 1] -= v;',
        fixedCode: 'const diff = new Array<number>(n + 2).fill(0); diff[n + 1] -= v;',
        whyItBreaks: 'For 1-based `r == n`, `diff[r + 1]` writes past length `n + 1` and corrupts trailing reads.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch13-p1',
        difficulty: 'Easy',
        title: 'Running Prefix Sum Array',
        prompt: 'Given `n` and `n` numbers, print the running sum array separated by spaces.',
        banglaHint: '`acc` ভ্যারিয়েবলে যোগফল জমিয়ে প্রতিটি ধাপে প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0];\nlet acc = 0;\nconst out: number[] = [];\nfor (let i = 1; i <= n; i++) { acc += nums[i]; out.push(acc); }\nconsole.log(out.join(' '));`,
        sampleStdin: '4\n1 2 3 4',
        expectedOutput: '1 3 6 10',
      },
      {
        id: 'ts-ch13-p2',
        difficulty: 'Easy',
        title: 'Equilibrium Pivot Index',
        prompt: 'Print the smallest 0-based index where left sum equals right sum, or `-1`.',
        banglaHint: '`left === total - left - arr[i]` শর্তটি পরীক্ষা করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst arr = nums.slice(1, 1 + nums[0]);\nconst total = arr.reduce((a, b) => a + b, 0);\nlet left = 0, ans = -1;\nfor (let i = 0; i < arr.length; i++) {\n  if (left === total - left - arr[i]) { ans = i; break; }\n  left += arr[i];\n}\nconsole.log(ans);`,
        sampleStdin: '6\n1 7 3 6 5 6',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch13-p3',
        difficulty: 'Medium',
        title: 'Offline Range Additions',
        prompt: 'Apply `m` updates `[l, r, v]` (1-indexed) to `n` zeros and print the resulting array.',
        banglaHint: '`diff[l] += v; diff[r + 1] -= v;` করে শেষে প্রিফিক্স স্ক্যান করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet p = 0;\nconst n = nums[p++], m = nums[p++];\nconst diff: number[] = new Array(n + 2).fill(0);\nfor (let i = 0; i < m; i++) {\n  const l = nums[p++], r = nums[p++], v = nums[p++];\n  diff[l] += v; diff[r + 1] -= v;\n}\nlet cur = 0;\nconst out: number[] = [];\nfor (let i = 1; i <= n; i++) { cur += diff[i]; out.push(cur); }\nconsole.log(out.join(' '));`,
        sampleStdin: '5 2\n1 3 2\n2 5 3',
        expectedOutput: '2 5 5 3 3',
      },
      {
        id: 'ts-ch13-p4',
        difficulty: 'Medium',
        title: 'Subarrays Divisible by K',
        prompt: 'Count non-empty subarrays whose sum is divisible by `k`.',
        banglaHint: 'নেগেটিভ মোড এড়াতে `((pref % k) + k) % k` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1];\nconst cnt: number[] = new Array(k).fill(0);\ncnt[0] = 1;\nlet pref = 0, ans = 0;\nfor (let i = 0; i < n; i++) {\n  pref += nums[2 + i];\n  const r = ((pref % k) + k) % k;\n  ans += cnt[r];\n  cnt[r]++;\n}\nconsole.log(ans);`,
        sampleStdin: '6 5\n4 5 0 -2 -3 1',
        expectedOutput: '7',
      },
      {
        id: 'ts-ch13-p5',
        difficulty: 'Hard',
        title: '2D Matrix Subrectangle Query',
        prompt: 'Read `r`, `c`, an `r x c` matrix, and `(r1, c1, r2, c2)` (1-indexed). Print submatrix sum.',
        banglaHint: '`p[r2][c2] - p[r1-1][c2] - p[r2][c1-1] + p[r1-1][c1-1]` সূত্র প্রয়োগ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet ptr = 0;\nconst r = nums[ptr++], c = nums[ptr++];\nconst p: number[][] = Array.from({ length: r + 1 }, () => new Array(c + 1).fill(0));\nfor (let i = 1; i <= r; i++) {\n  for (let j = 1; j <= c; j++) {\n    p[i][j] = nums[ptr++] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];\n  }\n}\nconst r1 = nums[ptr++], c1 = nums[ptr++], r2 = nums[ptr++], c2 = nums[ptr++];\nconsole.log(p[r2][c2] - p[r1 - 1][c2] - p[r2][c1 - 1] + p[r1 - 1][c1 - 1]);`,
        sampleStdin: '3 3\n1 2 3\n4 5 6\n7 8 9\n2 2 3 3',
        expectedOutput: '28',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Difference Update + Range Query Dashboard',
      description: 'Apply `m` range additions and answer `q` range sum queries using a 1-based prefix sum table.',
      banglaGoal: 'ডিফারেন্স অ্যারে দিয়ে রেঞ্জ আপডেট করে প্রিফিক্স সামের মাধ্যমে একাধিক রেঞ্জ সাম কুয়েরির উত্তর দাও।',
      combinesChapters: "Ch 11, 13",
      starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet ptr = 0;\nconst n = nums[ptr++], m = nums[ptr++], q = nums[ptr++];\nconst diff: number[] = new Array(n + 2).fill(0);\nfor (let i = 0; i < m; i++) {\n  const l = nums[ptr++], r = nums[ptr++], v = nums[ptr++];\n  diff[l] += v; diff[r + 1] -= v;\n}\nconst pref: number[] = new Array(n + 1).fill(0);\nlet cur = 0;\nfor (let i = 1; i <= n; i++) { cur += diff[i]; pref[i] = pref[i - 1] + cur; }\nconst out: number[] = [];\nfor (let i = 0; i < q; i++) {\n  const l = nums[ptr++], r = nums[ptr++];\n  out.push(pref[r] - pref[l - 1]);\n}\nconsole.log(out.join('\\n'));`,
      sampleStdin: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5',
      expectedOutput: '16\n4',
    },
    starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nlet ptr = 0;\nconst n = nums[ptr++], m = nums[ptr++], q = nums[ptr++];\nconst diff: number[] = new Array(n + 2).fill(0);\nfor (let i = 0; i < m; i++) {\n  const l = nums[ptr++], r = nums[ptr++], v = nums[ptr++];\n  diff[l] += v; diff[r + 1] -= v;\n}\nconst pref: number[] = new Array(n + 1).fill(0);\nlet cur = 0;\nfor (let i = 1; i <= n; i++) { cur += diff[i]; pref[i] = pref[i - 1] + cur; }\nconst out: number[] = [];\nfor (let i = 0; i < q; i++) {\n  const l = nums[ptr++], r = nums[ptr++];\n  out.push(pref[r] - pref[l - 1]);\n}\nconsole.log(out.join('\\n'));`,
    sampleStdin: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5',
    expectedSampleOutput: '16\n4',
    testCases: [
      { id: 'ts13-t1', input: '5 2 2\n1 3 4\n2 5 2\n1 3\n4 5', expectedOutput: '16\n4' },
      { id: 'ts13-t2', input: '4 1 1\n2 4 5\n1 4', expectedOutput: '15', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'Strings, Template Types & Parsing',
    banglaTitle: 'স্ট্রিং, টেমপ্লেট লিটারেল ও পার্সিং',
    subtitle: 'Immutable strings, character code arithmetic, regex normalization, and string builders',
    zeroIntuition: {
      plainEnglishStory:
        'Strings in TypeScript are immutable UTF-16 sequences with rich built-in methods (`.trim()`, `.split()`, `.slice()`, `.charCodeAt()`). Because every modification returns a new string rather than mutating in place, building strings inside loops via `+=` can degrade if not gathered into an array first.\n\nTyped patterns—such as template literal unions (`"info" | "warn" | "error"`) and strict `string[]` tokenization—help catch malformed keys or invalid formats before runtime while keeping algorithmic tasks fast via `charCodeAt(i) - 97`.',
      asciiFlowchart:
        '"RaceCar!".toLowerCase().replace(/[^a-z0-9]/g, "")\n   -> "racecar" -> charCodeAt(0) === 114',
      pseudocode: ["clean = raw.trim().toLowerCase()","counts = new Array(26).fill(0)","for ch of clean: counts[ch.charCodeAt(0) - 97]++"],
      banglaZeroToHero: {
        analogyTitle: 'ছাপানো বইয়ের পৃষ্ঠা—কলম দিয়ে কাটলে নতুন পৃষ্ঠা ছাপাতে হয়',
        explanation:
          'টাইপস্ক্রিপ্ট বা জাভাস্ক্রিপ্টের স্ট্রিং হলো ছাপাখানায় ছাপানো কাগজের মতো অপরিবর্তনযোগ্য (`immutable`); তুমি `s[0] = "A"` লিখে ভেতরের অক্ষর বদলাতে পারবে না। যেকোনো পরিবর্তন করলে স্ট্রিংয়ের একটি নতুন কপি তৈরি হয়। তাই লুপের ভেতর হাজারবার স্ট্রিং `+` করার বদলে `parts: string[]` অ্যারেতে জমিয়ে শেষে `parts.join("")` ব্যবহার করা অনেক দ্রুত ও পরিচ্ছন্ন। অক্ষরের ফ্রিকোয়েন্সি গুনতে `s.charCodeAt(i) - 97` ব্যবহার করলে সরাসরি `0..25` ইনডেক্স পাওয়া যায়। ইনপুট পার্স করার সময় `.trim().split(/\\s+/)` ব্যবহার করলে অতিরিক্ত স্পেস বা উইন্ডোজের `\\r\\n` নিয়ে কোনো সমস্যা হয় না। আবার টাইপস্ক্রিপ্টের টেমপ্লেট লিটারেল টাইপ এবং স্ট্রিং মেথডগুলোর রিটার্ন টাইপ (`string | undefined`) আগে থেকেই নিরাপদ কোড লেখায় সাহায্য করে। রেগুলার এক্সপ্রেশন দিয়ে অপ্রয়োজনীয় চিহ্ন বাদ দিয়ে স্লাগ বা টোকেন তৈরি করা বাস্তব প্রজেক্টের প্রতিদিনের কাজ। এই অধ্যায়ে আমরা পরিষ্কার টেক্সট পার্সিং ও ফ্রিকোয়েন্সি প্যাটার্ন আয়ত্ত করব।',
        everydayExample: 'একটি রিসিপ্ট একবার প্রিন্ট হয়ে গেলে তাতে কলম দিয়ে ঘষামাজা না করে সংশোধিত নতুন কপি প্রিন্ট করতে হয়।',
        keyTakeaways: [
          'টাইপস্ক্রিপ্টে স্ট্রিং immutable—`s[i] = "x"` নিঃশব্দে কাজ করে না বা strict মোডে এরর দেয়।',
          'অ্যারেতে পুশ করে `.join("")` করলে স্ট্রিং কনক্যাটেনেশনের অপ্রয়োজনীয় মেমোরি কপি বাঁচে।',
          'লোয়ারকেস অক্ষর ম্যাপ করতে `s.charCodeAt(i) - 97` সরাসরি `0..25` ইনডেক্স দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch14-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Immutable String Slicing & Char Codes',
        englishParagraphs: [
          'Inspect how `slice`, `toUpperCase`, and `charCodeAt` read and transform text into new strings without altering the original reference.',
        ],
        banglaParagraphs: [
          '`slice`, `toUpperCase` এবং `charCodeAt` কীভাবে মূল স্ট্রিং অপরিবর্তিত রেখে নতুন স্ট্রিং তৈরি করে তা দেখো।',
        ],
        memoryDiagram: 'raw="argon" -> upper="ARGON", code(0)=97',
        code: `const raw: string = 'argon';\nconst upper: string = raw.slice(0, 1).toUpperCase() + raw.slice(1);\nconsole.log(upper + ' ' + raw + ' ' + raw.charCodeAt(0));`,
        stdin: '',
        expectedOutput: 'Argon argon 97',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"const raw: string = 'argon';","whatItMeans":"Binds typed immutable string literal.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`raw` missing."},
          {"lineNumber":"Line 2","codeSnippet":"const upper: string = raw.slice(0, 1).toUpperCase() + raw.slice(1);","whatItMeans":"Capitalizes first character into a brand new string.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"`upper` undefined."},
          {"lineNumber":"Line 3","codeSnippet":"console.log(upper + ' ' + raw + ' ' + raw.charCodeAt(0));","whatItMeans":"Shows `raw` stayed unchanged and prints ASCII code 97.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nothing printed."},
        ],
      },
      {
        id: 'ts-ch14-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Run-Length Encoding Builder',
        englishParagraphs: [
          'Group consecutive identical characters using an outer/inner pointer and collect tokens into a typed `string[]` before `.join("")`.',
        ],
        banglaParagraphs: [
          'একই অক্ষরের ধারাবাহিক অংশ গুনে একটি `string[]` অ্যারেতে জমিয়ে `.join("")` দিয়ে ফরম্যাটেড আউটপুট তৈরি করো।',
        ],
        memoryDiagram: 'aaabbc -> ["a3", "b2", "c1"] -> "a3b2c1"',
        code: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\nconst parts: string[] = [];\nlet i = 0;\nwhile (i < s.length) {\n  let j = i;\n  while (j < s.length && s[j] === s[i]) j++;\n  parts.push(s[i] + String(j - i));\n  i = j;\n}\nconsole.log(parts.join(''));`,
        stdin: 'aaabbc',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"const parts: string[] = [];","whatItMeans":"Buffers string chunks cleanly without quadratic concatenation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No output array available."},
          {"lineNumber":"Line 8","codeSnippet":"  parts.push(s[i] + String(j - i));","whatItMeans":"Records run character and its run length.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Compressed runs are skipped."},
        ],
      },
      {
        id: 'ts-ch14-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Slug & Tag Normalizer',
        englishParagraphs: [
          'Sanitize messy article titles into URL-safe kebab-case slugs using lowercasing and regex collapsing.',
        ],
        banglaParagraphs: [
          'বড় হাতের অক্ষর, বাড়তি স্পেস এবং চিহ্ন সরিয়ে পরিষ্কার URL-ফ্রেন্ডলি কেবাব-কেস স্লাগ বানাও।',
        ],
        memoryDiagram: '"  TypeScript 5: Strict! " -> "typescript-5-strict"',
        code: `import * as fs from 'fs';\nconst raw: string = fs.readFileSync(0, 'utf8');\nconst slug = raw\n  .trim()\n  .toLowerCase()\n  .replace(/[^a-z0-9]+/g, '-')\n  .replace(/^-+|-+$/g, '');\nconsole.log(slug);`,
        stdin: '  TypeScript 5: Strict! ',
        expectedOutput: 'typescript-5-strict',
        lineByLine: [
          {"lineNumber":"Line 6","codeSnippet":"  .replace(/[^a-z0-9]+/g, '-')","whatItMeans":"Replaces any non-alphanumeric sequence with a single hyphen.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Spaces and colons stay inside the URL."},
          {"lineNumber":"Line 7","codeSnippet":"  .replace(/^-+|-+$/g, '');","whatItMeans":"Trims leading or trailing hyphens.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Trailing `!` leaves a hanging `-`."},
        ],
      },
      {
        id: 'ts-ch14-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'O(n) Frequency Anagram Check',
        englishParagraphs: [
          'Avoid `split("").sort().join("")` (`O(n log n)`). Subtract `charCodeAt(i) - 97` into a 26-element `number[]` for linear speed.',
        ],
        banglaParagraphs: [
          'স্ট্রিং সর্ট করার চেয়ে ২৬-ঘরের অ্যারেতে অক্ষরের ফ্রিকোয়েন্সি হিসাব করলে কাজটি O(n) সময়ে হয়।',
        ],
        memoryDiagram: 'cnt[a.charCodeAt(i)-97]++ / cnt[b.charCodeAt(i)-97]--',
        code: `import * as fs from 'fs';\nconst [a = '', b = ''] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nif (a.length !== b.length) {\n  console.log('NO');\n} else {\n  const cnt: number[] = new Array(26).fill(0);\n  for (let i = 0; i < a.length; i++) {\n    cnt[a.charCodeAt(i) - 97]++;\n    cnt[b.charCodeAt(i) - 97]--;\n  }\n  console.log(cnt.every((x) => x === 0) ? 'YES' : 'NO');\n}`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"    cnt[a.charCodeAt(i) - 97]++;","whatItMeans":"Maps `a`..`z` directly to indices `0..25`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"First string characters are not tallied."},
          {"lineNumber":"Line 11","codeSnippet":"  console.log(cnt.every((x) => x === 0) ? 'YES' : 'NO');","whatItMeans":"Confirms both strings share exact character counts.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Prints no verdict."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"const raw: string = 'argon';","whatItMeans":"Initializes typed immutable string.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"ReferenceError on `raw`."},
      {"lineNumber":"Line 2","codeSnippet":"const upper: string = raw.slice(0, 1).toUpperCase() + raw.slice(1);","whatItMeans":"Builds capitalized copy.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing `upper`."},
      {"lineNumber":"Line 3","codeSnippet":"console.log(upper + ' ' + raw + ' ' + raw.charCodeAt(0));","whatItMeans":"Outputs capitalized, original, and UTF-16 code 97.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No stdout."},
    ],
    dryRunTable: [
      { step: 1, state: "raw='argon'", memoryOrStack: 'raw="argon"', note: 'Immutable string assigned' },
      { step: 2, state: 'raw.slice(0,1).toUpperCase()', memoryOrStack: '"A"', note: 'First character uppercased' },
      { step: 3, state: 'upper', memoryOrStack: '"Argon"', note: 'Joined with "rgon"' },
      { step: 4, state: 'raw.charCodeAt(0)', memoryOrStack: '97', note: 'Original string remains lowercase' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Mutate String Index `s[0] = "A"`',
        brokenCode: 'const s = "abc"; s[0] = "z";',
        fixedCode: 'const arr = s.split(""); arr[0] = "z"; const res = arr.join("");',
        whyItBreaks: 'Strings are immutable in TypeScript/JS; direct index assignment throws in strict mode.',
      },
      {
        title: 'Trap 2: Forgetting Global `/g` Flag in `.replace()`',
        brokenCode: 's.replace("-", "_")',
        fixedCode: 's.replace(/-/g, "_")',
        whyItBreaks: 'Without `/g`, only the very first occurrence gets replaced.',
      },
      {
        title: 'Trap 3: Comparing Words Without `.trim()` on Stdin',
        brokenCode: 'const lines = raw.split("\\n");',
        fixedCode: 'const lines = raw.trim().split(/\\r?\\n/);',
        whyItBreaks: 'Trailing newlines or `\\r` from Windows CRLF corrupt string lengths.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch14-p1',
        difficulty: 'Easy',
        title: 'Count ASCII Vowels',
        prompt: 'Read a line of text and print how many vowels (`a,e,i,o,u`) it contains.',
        banglaHint: '`toLowerCase()` করে `aeiou` সেটের মধ্যে আছে কি না দেখো।',
        starterCode: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').toLowerCase();\nlet cnt = 0;\nfor (const ch of s) if ('aeiou'.includes(ch)) cnt++;\nconsole.log(cnt);`,
        sampleStdin: 'ArgonCode Academy',
        expectedOutput: '7',
      },
      {
        id: 'ts-ch14-p2',
        difficulty: 'Easy',
        title: 'Reverse Word Order',
        prompt: 'Read a sentence and print its words in reverse order joined by single spaces.',
        banglaHint: '`.trim().split(/\\s+/).reverse().join(" ")` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';\nconst words = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconsole.log(words.reverse().join(' '));`,
        sampleStdin: 'hello ts world',
        expectedOutput: 'world ts hello',
      },
      {
        id: 'ts-ch14-p3',
        difficulty: 'Medium',
        title: 'First Unique Character',
        prompt: 'Print the first lowercase letter with frequency 1, or `-1` if none exists.',
        banglaHint: '`freq` অ্যারেতে প্রতিটি অক্ষর গুনে প্রথমে যে অক্ষরের মান ১ সেটি প্রিন্ট করো।',
        starterCode: `import * as fs from 'fs';\nconst s = fs.readFileSync(0, 'utf8').trim();\nconst f: number[] = new Array(26).fill(0);\nfor (let i = 0; i < s.length; i++) f[s.charCodeAt(i) - 97]++;\nlet ans = '-1';\nfor (let i = 0; i < s.length; i++) {\n  if (f[s.charCodeAt(i) - 97] === 1) { ans = s[i]; break; }\n}\nconsole.log(ans);`,
        sampleStdin: 'swiss',
        expectedOutput: 'w',
      },
      {
        id: 'ts-ch14-p4',
        difficulty: 'Medium',
        title: 'Longest Common Prefix',
        prompt: 'Read `n` words and output their longest common prefix, or `NONE` if empty.',
        banglaHint: 'শব্দগুলো সর্ট করে প্রথম ও শেষ শব্দের মিল যতদূর থাকে তা বের করো।',
        starterCode: `import * as fs from 'fs';\nconst parts = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nconst n = Number(parts[0]);\nconst words = parts.slice(1, 1 + n).sort();\nconst a = words[0], b = words[n - 1];\nlet k = 0;\nwhile (k < a.length && k < b.length && a[k] === b[k]) k++;\nconsole.log(k === 0 ? 'NONE' : a.slice(0, k));`,
        sampleStdin: '3\nflower flow flight',
        expectedOutput: 'fl',
      },
      {
        id: 'ts-ch14-p5',
        difficulty: 'Hard',
        title: 'KMP LPS Last Value',
        prompt: 'Compute the KMP longest proper prefix-suffix (`lps`) array for `s` and print its final entry.',
        banglaHint: 'মিসম্যাচ হলে `j = lps[j - 1]` দিয়ে পেছনে ফিরে O(n) সময়ে LPS বের করো।',
        starterCode: `import * as fs from 'fs';\nconst s = fs.readFileSync(0, 'utf8').trim();\nconst lps: number[] = new Array(s.length).fill(0);\nlet j = 0;\nfor (let i = 1; i < s.length; i++) {\n  while (j > 0 && s[i] !== s[j]) j = lps[j - 1];\n  if (s[i] === s[j]) j++;\n  lps[i] = j;\n}\nconsole.log(lps.length ? lps[lps.length - 1] : 0);`,
        sampleStdin: 'abacaba',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Mini-Build: Cleaned Word Palindrome Counter',
      description: 'Tokenize input text, strip non-alphanumeric characters, lowercase each word, and count valid palindromes.',
      banglaGoal: 'প্রতিটি শব্দ ক্লিন করে টু-পয়েন্টারের মাধ্যমে মোট কতটি প্যালিনড্রোম শব্দ আছে তা গণনা করো।',
      combinesChapters: "Ch 12, 14",
      starterCode: `import * as fs from 'fs';\nfunction isPal(w: string): boolean {\n  let l = 0, r = w.length - 1;\n  while (l < r) {\n    if (w[l] !== w[r]) return false;\n    l++; r--;\n  }\n  return w.length > 0;\n}\nconst tokens = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nlet count = 0;\nfor (const tok of tokens) {\n  const clean = tok.toLowerCase().replace(/[^a-z0-9]/g, '');\n  if (isPal(clean)) count++;\n}\nconsole.log(count);`,
      sampleStdin: 'Level! hello Noon rust Civic.',
      expectedOutput: '3',
    },
    starterCode: `import * as fs from 'fs';\nfunction isPal(w: string): boolean {\n  let l = 0, r = w.length - 1;\n  while (l < r) {\n    if (w[l] !== w[r]) return false;\n    l++; r--;\n  }\n  return w.length > 0;\n}\nconst tokens = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);\nlet count = 0;\nfor (const tok of tokens) {\n  const clean = tok.toLowerCase().replace(/[^a-z0-9]/g, '');\n  if (isPal(clean)) count++;\n}\nconsole.log(count);`,
    sampleStdin: 'Level! hello Noon rust Civic.',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'ts14-t1', input: 'Level! hello Noon rust Civic.', expectedOutput: '3' },
      { id: 'ts14-t2', input: 'alpha beta', expectedOutput: '0', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Recursion & Call Stack Visualization',
    banglaTitle: 'রিকার্সন ও কল স্ট্যাক ভিজ্যুয়ালাইজেশন (মাইলস্টোন ৩)',
    subtitle: 'Typed recursive contracts, base cases, V8 call frames, and memoized backtracking',
    zeroIntuition: {
      plainEnglishStory:
        'A recursive TypeScript function decomposes an input into a smaller instance of itself, relying on an explicit return type annotation (`: number`, `: boolean`, `: void`) so TypeScript catches missing return branches along any base or recursive path.\n\nEach invocation pushes a fresh execution context onto the V8 call stack, holding its own local arguments until deeper child calls resolve. Pairing explicit base cases with `Map<string, number>` or typed memo arrays collapses exponential branching trees down to linear or polynomial time.',
      asciiFlowchart:
        'sumUp(3) -> pushes frame(3)\n  sumUp(2) -> pushes frame(2)\n    sumUp(1) -> pushes frame(1)\n      sumUp(0) -> returns 0\n    returns 1 -> returns 3 -> returns 6',
      pseudocode: ["function solve(n: number): number {","if (n <= 0) return 0;","return n + solve(n - 1);","}"],
      banglaZeroToHero: {
        analogyTitle: 'একটার ভেতর আরেকটা রাখা রিকার্সিভ টিফিন বক্স ও টাইপ গার্ড',
        explanation:
          'রিকার্সনকে ভাবতে পারো একটার ভেতর আরেকটা রাখা পাঁচটি টিফিন বক্স খোলার মতো—বড় বক্স খুলে ছোট বক্স পাও, আর সবচেয়ে ভেতরের বক্সে পৌঁছালে কাঙ্ক্ষিত উত্তর পেয়ে একের পর এক বক্স বন্ধ করে বাইরে আসো। টাইপস্ক্রিপ্টে প্রতিটি ফাংশন কলের রিটার্ন টাইপ (`: number`) আগে থেকেই লিখে দিলে কম্পাইলার নিশ্চিত করে যে বেস কেস বা অন্য কোনো ব্রাঞ্চে তুমি `return` দিতে ভুলে যাওনি। V8 কল স্ট্যাক প্রতিটি কলের জন্য আলাদা ফ্রেম তৈরি করে, তাই ওপরের ফ্রেমের লোকাল ভ্যারিয়েবল নিচের ফ্রেমে মিশে যায় না। কিন্তু বেস কেস ঠিক না থাকলে বা ইনপুট প্রতি ধাপে ছোট না হলে স্ট্যাক ভরে গিয়ে `Maximum call stack size exceeded` এরর ঘটে। ফিবোনাচ্চির মতো ওভারল্যাপিং সাবপ্রবলেমে বারবার একই হিসাব না করে `number[]` বা `Map` মেমো টেবিল ব্যবহার করলে এক্সপোনেনশিয়াল কোড মুহূর্তেই লিনিয়ার হয়ে যায়। আবার ব্যাকট্র্যাকিংয়ে আমরা একটি অ্যারেতে অপশন `push` করে নিচে যাই এবং ফেরার সময় `pop` করে আগের অবস্থায় ফিরে আসি। এই মাইলস্টোন ৩ অধ্যায়ে ফেজ ৩-এর অ্যারে, প্রিফিক্স, টু-পয়েন্টার, স্ট্রিং ও রিকার্সন একসাথে যুক্ত হবে।',
        everydayExample: 'নেস্টেড কমেন্ট থ্রেড বা ফোল্ডার ট্রি পড়া—মূল ফোল্ডার থেকে সাব-ফোল্ডারে নামা এবং প্রতিটি সাব-ফোল্ডার শেষ করে ফিরে আসা।',
        keyTakeaways: [
          'সব সময় রিকার্সিভ ফাংশনের রিটার্ন টাইপ লিখে দাও যেন কোনো ব্রাঞ্চে `return` বাদ না পড়ে।',
          'বেস কেস ও প্রতি ধাপে ছোট হওয়া ইনপুট ছাড়া কল স্ট্যাক উপচে যায়।',
          'মেমোইজেশন আর ব্যাকট্র্যাকিং (`push` + রিকার্সন + `pop`) ডাইনামিক প্রোগ্রামিং ও সার্চের মূল ভিত্তি।',
        ],
      },
    },
    topics: [
      {
        id: 'ts-ch15-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Call Stack Wind & Unwind Trace',
        englishParagraphs: [
          'Trace pre-call logs (descending into child frames) versus post-call logs (unwinding in reverse LIFO order back to the caller).',
        ],
        banglaParagraphs: [
          'রিকার্সিভ কলের আগে ও পরে `console.log` চালিয়ে কল স্ট্যাকে নামা ও ওঠার ক্রমটি পরিষ্কারভাবে দেখো।',
        ],
        memoryDiagram: 'enter 3 -> enter 2 -> enter 1 -> exit 1 -> exit 2 -> exit 3',
        code: `function sumUpTo(n: number): number {\n  if (n <= 0) return 0;\n  console.log('enter ' + n);\n  const sub = sumUpTo(n - 1);\n  const total = n + sub;\n  console.log('exit ' + n + ' => ' + total);\n  return total;\n}\nconsole.log('ans=' + sumUpTo(3));`,
        stdin: '',
        expectedOutput: 'enter 3\nenter 2\nenter 1\nexit 1 => 1\nexit 2 => 3\nexit 3 => 6\nans=6',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"function sumUpTo(n: number): number {","whatItMeans":"Explicit numeric return type verifies every branch returns a number.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
          {"lineNumber":"Line 2","codeSnippet":"  if (n <= 0) return 0;","whatItMeans":"Base case stops downward recursion.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Infinite stack overflow."},
          {"lineNumber":"Line 4","codeSnippet":"  const sub = sumUpTo(n - 1);","whatItMeans":"Suspends frame until `n - 1` finishes.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Subproblem is not evaluated."},
          {"lineNumber":"Line 7","codeSnippet":"  return total;","whatItMeans":"Hands summed result back to parent frame.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"TypeScript reports missing return value."},
        ],
      },
      {
        id: 'ts-ch15-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Typed Recursive Binary Search',
        englishParagraphs: [
          'Pass `arr: number[]`, bounds `lo`, `hi`, and `target` cleanly while using `Math.trunc` for integer midpoint math.',
        ],
        banglaParagraphs: [
          '`Math.trunc` ব্যবহার করে সর্টেড অ্যারের ওপর O(log n) গভীরতার রিকার্সিভ বাইনারি সার্চ লেখো।',
        ],
        memoryDiagram: 'bsearch(0, n-1) -> mid -> narrows to half each call',
        code: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0];\nconst arr: number[] = nums.slice(1, 1 + n);\nconst target = nums[1 + n];\nfunction bsearch(lo: number, hi: number): number {\n  if (lo > hi) return -1;\n  const mid = lo + Math.trunc((hi - lo) / 2);\n  if (arr[mid] === target) return mid;\n  return arr[mid] < target ? bsearch(mid + 1, hi) : bsearch(lo, mid - 1);\n}\nconsole.log(bsearch(0, n - 1));`,
        stdin: '5\n4 9 20 31 45\n20',
        expectedOutput: '2',
        lineByLine: [
          {"lineNumber":"Line 7","codeSnippet":"  if (lo > hi) return -1;","whatItMeans":"Empty range terminates search with `-1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Infinite recursion when missing."},
          {"lineNumber":"Line 8","codeSnippet":"  const mid = lo + Math.trunc((hi - lo) / 2);","whatItMeans":"Safe integer midpoint avoiding float indices.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Fractional index returns `undefined`."},
        ],
      },
      {
        id: 'ts-ch15-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Typed File Tree Flattener',
        englishParagraphs: [
          'Define a lightweight `TreeNode` interface with recursive `children: TreeNode[]` and collect full file paths cleanly.',
        ],
        banglaParagraphs: [
          'রিকার্সিভ `TreeNode` ইন্টারফেস ব্যবহার করে যেকোনো গভীরতার ফোল্ডার ট্রি ফ্ল্যাট করো।',
        ],
        memoryDiagram: 'TreeNode { name: string; children: TreeNode[] }',
        code: `interface TreeNode {\n  name: string;\n  children: TreeNode[];\n}\nconst tree: TreeNode = {\n  name: 'root',\n  children: [\n    { name: 'src', children: [{ name: 'index.ts', children: [] }] },\n    { name: 'tsconfig.json', children: [] },\n  ],\n};\nconst paths: string[] = [];\nfunction walk(node: TreeNode, prefix: string): void {\n  const cur = prefix ? prefix + '/' + node.name : node.name;\n  if (node.children.length === 0) {\n    paths.push(cur);\n    return;\n  }\n  for (const child of node.children) walk(child, cur);\n}\nwalk(tree, '');\nconsole.log(paths.join('\\n'));`,
        stdin: '',
        expectedOutput: 'root/src/index.ts\nroot/tsconfig.json',
        lineByLine: [
          {"lineNumber":"Line 15","codeSnippet":"  if (node.children.length === 0) {","whatItMeans":"Records complete path at leaf files.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Leaves never append to `paths`."},
          {"lineNumber":"Line 19","codeSnippet":"  for (const child of node.children) walk(child, cur);","whatItMeans":"Visits every subdirectory cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nested nodes stay unexplored."},
        ],
      },
      {
        id: 'ts-ch15-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Memoized Fibonacci Cache Array',
        englishParagraphs: [
          'Storing solved states in `memo: number[]` turns the naive exponential recursion tree into a clean O(n) pass.',
        ],
        banglaParagraphs: [
          '`memo: number[]` অ্যারেতে প্রতিটি মান সংরক্ষণ করলে ফিবোনাচ্চি `O(n)` সময়েই সমাধান হয়।',
        ],
        memoryDiagram: 'memo[k] !== -1 -> returns O(1) cached state',
        code: `import * as fs from 'fs';\nconst n = Number(fs.readFileSync(0, 'utf8').trim());\nconst memo: number[] = new Array(n + 1).fill(-1);\nfunction fib(k: number): number {\n  if (k <= 1) return k;\n  if (memo[k] !== -1) return memo[k];\n  memo[k] = fib(k - 1) + fib(k - 2);\n  return memo[k];\n}\nconsole.log(fib(n));`,
        stdin: '40',
        expectedOutput: '102334155',
        lineByLine: [
          {"lineNumber":"Line 3","codeSnippet":"const memo: number[] = new Array(n + 1).fill(-1);","whatItMeans":"Pre-allocates cache with `-1` sentinel.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Exponential recomputation causes TLE."},
          {"lineNumber":"Line 6","codeSnippet":"  if (memo[k] !== -1) return memo[k];","whatItMeans":"Returns cached result immediately.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Saved values are never reused."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"function sumUpTo(n: number): number {","whatItMeans":"Typed recursive signature.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Function undefined."},
      {"lineNumber":"Line 2","codeSnippet":"  if (n <= 0) return 0;","whatItMeans":"Base case breaks recursion.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Stack overflow crash."},
      {"lineNumber":"Line 4","codeSnippet":"  const sub = sumUpTo(n - 1);","whatItMeans":"Recurses on `n - 1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No recursive breakdown."},
      {"lineNumber":"Line 7","codeSnippet":"  return total;","whatItMeans":"Propagates accumulated total up stack.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Compiler error on missing return."},
    ],
    dryRunTable: [
      { step: 1, state: 'sumUpTo(3)', memoryOrStack: '[f(3)]', note: 'Prints enter 3; pauses at f(2)' },
      { step: 2, state: 'sumUpTo(2)', memoryOrStack: '[f(3), f(2)]', note: 'Prints enter 2; pauses at f(1)' },
      { step: 3, state: 'sumUpTo(0)', memoryOrStack: '[f(3), f(2), f(1), f(0)]', note: 'Returns 0' },
      { step: 4, state: 'Unwind', memoryOrStack: '[]', note: 'Prints exit 1=>1, 2=>3, 3=>6' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Pushing Mutable Reference Into Results Array Without Copy',
        brokenCode: 'if (done) { out.push(cur); return; }',
        fixedCode: 'if (done) { out.push([...cur]); return; }',
        whyItBreaks: 'Later `cur.pop()` calls empty the same array stored inside `out`.',
      },
      {
        title: 'Trap 2: Omitting `return` on Recursive Branch',
        brokenCode: 'function solve(n: number) { if (n === 0) return 1; solve(n - 1); }',
        fixedCode: 'function solve(n: number): number { if (n === 0) return 1; return solve(n - 1); }',
        whyItBreaks: 'Without `return`, outer frames return `undefined` while explicit `: number` catches it early.',
      },
      {
        title: 'Trap 3: Calling `fn(n--)` Instead of `fn(n - 1)`',
        brokenCode: 'function go(n: number) { if (n > 0) go(n--); }',
        fixedCode: 'function go(n: number) { if (n > 0) go(n - 1); }',
        whyItBreaks: 'Post-decrement forwards the old `n` endlessly until V8 crashes.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch15-p1',
        difficulty: 'Easy',
        title: 'Fast Modular Power',
        prompt: 'Compute `a^b mod 1000000007` recursively using BigInt binary exponentiation.',
        banglaHint: '`exp / 2n` দিয়ে অর্ধেক পাওয়ার বের করে স্কয়ার করো।',
        starterCode: `import * as fs from 'fs';\nconst [a, b] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(BigInt);\nconst MOD = 1000000007n;\nfunction modPow(base: bigint, exp: bigint): bigint {\n  if (exp === 0n) return 1n;\n  const half = modPow(base, exp / 2n);\n  let ans = (half * half) % MOD;\n  if (exp % 2n === 1n) ans = (ans * (base % MOD)) % MOD;\n  return ans;\n}\nconsole.log(modPow(a, b).toString());`,
        sampleStdin: '2 10',
        expectedOutput: '1024',
      },
      {
        id: 'ts-ch15-p2',
        difficulty: 'Easy',
        title: 'Recursive Palindrome Check',
        prompt: 'Check recursively whether string `s` is a palindrome (`YES` or `NO`).',
        banglaHint: 'দুই প্রান্ত সমান না হলে `false`, আর `l >= r` হলে `true` দাও।',
        starterCode: `import * as fs from 'fs';\nconst s: string = fs.readFileSync(0, 'utf8').trim();\nfunction isPal(l: number, r: number): boolean {\n  if (l >= r) return true;\n  if (s[l] !== s[r]) return false;\n  return isPal(l + 1, r - 1);\n}\nconsole.log(isPal(0, s.length - 1) ? 'YES' : 'NO');`,
        sampleStdin: 'madam',
        expectedOutput: 'YES',
      },
      {
        id: 'ts-ch15-p3',
        difficulty: 'Medium',
        title: 'Balanced Parentheses Generator',
        prompt: 'Print all valid `n` pairs of parentheses in lexicographical order.',
        banglaHint: '`open < n` হলে `(` যোগ করে এবং `close < open` হলে `)` যোগ করে রিকার্সন চালাও।',
        starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst out: string[] = [];\nfunction gen(open: number, close: number, cur: string): void {\n  if (cur.length === 2 * n) { out.push(cur); return; }\n  if (open < n) gen(open + 1, close, cur + '(');\n  if (close < open) gen(open, close + 1, cur + ')');\n}\ngen(0, 0, '');\nconsole.log(out.join('\\n'));`,
        sampleStdin: '2',
        expectedOutput: '(())\n()()',
      },
      {
        id: 'ts-ch15-p4',
        difficulty: 'Medium',
        title: 'Memoized Subset Sum Count',
        prompt: 'Given `n`, target `k`, and `n` integers, count subsets summing to `k`.',
        banglaHint: '`Map<string, number>`-এ `"i,rem"` কী রেখে মেমোইজ করো।',
        starterCode: `import * as fs from 'fs';\nconst nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1];\nconst arr: number[] = nums.slice(2, 2 + n);\nconst memo = new Map<string, number>();\nfunction ways(i: number, rem: number): number {\n  if (rem === 0) return 1;\n  if (rem < 0 || i === n) return 0;\n  const key = i + ',' + rem;\n  const hit = memo.get(key);\n  if (hit !== undefined) return hit;\n  const ans = ways(i + 1, rem) + ways(i + 1, rem - arr[i]);\n  memo.set(key, ans);\n  return ans;\n}\nconsole.log(ways(0, k));`,
        sampleStdin: '4 5\n1 2 3 4',
        expectedOutput: '2',
      },
      {
        id: 'ts-ch15-p5',
        difficulty: 'Hard',
        title: 'N-Queens Solutions Counter',
        prompt: 'Print the number of distinct non-attacking placements of `n` queens on an `n x n` chessboard.',
        banglaHint: '`col`, `d1`, `d2` তিনটি boolean অ্যারে দিয়ে আক্রমণ পরীক্ষা করে ব্যাকট্র্যাক করো।',
        starterCode: `import * as fs from 'fs';\nconst n: number = Number(fs.readFileSync(0, 'utf8').trim());\nconst col: boolean[] = new Array(n).fill(false);\nconst d1: boolean[] = new Array(2 * n).fill(false);\nconst d2: boolean[] = new Array(2 * n).fill(false);\nlet ways = 0;\nfunction solve(r: number): void {\n  if (r === n) { ways++; return; }\n  for (let c = 0; c < n; c++) {\n    if (col[c] || d1[r - c + n] || d2[r + c]) continue;\n    col[c] = d1[r - c + n] = d2[r + c] = true;\n    solve(r + 1);\n    col[c] = d1[r - c + n] = d2[r + c] = false;\n  }\n}\nsolve(0);\nconsole.log(ways);`,
        sampleStdin: '4',
        expectedOutput: '2',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Typed Palindrome & Unique Subset Sum Analyzer',
      description: 'Merge Phase 3 typed arrays, sorting, string sanitization, and recursive backtracking to validate palindromes and count unique subset sums.',
      banglaGoal: 'ফেজ ৩-এর অ্যারে, সর্টিং, স্ট্রিং ক্লিনিং এবং রিকার্সন মিলিয়ে টাইপ-সেফ প্যালিনড্রোম + সাবসেট কাউন্টার বানাও।',
      combinesChapters: "Ch 11, 12, 13, 14, 15",
      starterCode: `import * as fs from 'fs';\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);\nconst word: string = lines[0].toLowerCase().replace(/[^a-z0-9]/g, '');\nconst [n, target] = lines[1].trim().split(/\\s+/).map(Number);\nconst arr: number[] = lines[2].trim().split(/\\s+/).map(Number);\narr.sort((a, b) => a - b);\nfunction isPal(l: number, r: number): boolean {\n  if (l >= r) return true;\n  return word[l] === word[r] && isPal(l + 1, r - 1);\n}\nlet count = 0;\nfunction countSubsets(i: number, rem: number): void {\n  if (rem === 0) { count++; return; }\n  if (rem < 0 || i === n) return;\n  countSubsets(i + 1, rem - arr[i]);\n  let next = i + 1;\n  while (next < n && arr[next] === arr[i]) next++;\n  countSubsets(next, rem);\n}\ncountSubsets(0, target);\nconsole.log((word.length > 0 && isPal(0, word.length - 1) ? 'PAL' : 'NOT_PAL') + ' ' + count);`,
      sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
      expectedOutput: 'PAL 3',
    },
    starterCode: `import * as fs from 'fs';\nconst lines: string[] = fs.readFileSync(0, 'utf8').trim().split(/\\r?\\n/);\nconst word: string = lines[0].toLowerCase().replace(/[^a-z0-9]/g, '');\nconst [n, target] = lines[1].trim().split(/\\s+/).map(Number);\nconst arr: number[] = lines[2].trim().split(/\\s+/).map(Number);\narr.sort((a, b) => a - b);\nfunction isPal(l: number, r: number): boolean {\n  if (l >= r) return true;\n  return word[l] === word[r] && isPal(l + 1, r - 1);\n}\nlet count = 0;\nfunction countSubsets(i: number, rem: number): void {\n  if (rem === 0) { count++; return; }\n  if (rem < 0 || i === n) return;\n  countSubsets(i + 1, rem - arr[i]);\n  let next = i + 1;\n  while (next < n && arr[next] === arr[i]) next++;\n  countSubsets(next, rem);\n}\ncountSubsets(0, target);\nconsole.log((word.length > 0 && isPal(0, word.length - 1) ? 'PAL' : 'NOT_PAL') + ' ' + count);`,
    sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
    expectedSampleOutput: 'PAL 3',
    testCases: [
      { id: 'ts15-t1', input: 'RaceCar!\n5 6\n1 2 3 4 5', expectedOutput: 'PAL 3' },
      { id: 'ts15-t2', input: 'Hello\n4 5\n1 1 3 4', expectedOutput: 'NOT_PAL 2', isHidden: true },
    ],
  },
};
