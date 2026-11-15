import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JS_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'JS Chapter 11 (ES2025): 1D Arrays, Traversal & Frequency Counting',
    banglaTitle: 'JS অধ্যায় ১১ (ES2025): ১ডি অ্যারে, ট্রাভার্সাল ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Indexed JS Arrays, in-place reversals, Int32Array/bucket frequency arrays, and single-pass min/max analytics.',
    zeroIntuition: {
      plainEnglishStory:
        'A JavaScript **Array** lets you store an ordered list of values accessed in `O(1)` by zero-based index (`arr[0]`, `arr[1]`, ..., `arr[arr.length - 1]`). Under the hood in V8, dense homogeneous arrays of small integers (`[10, 20, 30]`) are stored as packed contiguous slots (`PACKED_SMI_ELEMENTS`), making `for (let i = 0; i < arr.length; i++)` blazingly fast.\n\nInstead of sorting or scanning an array repeatedly (`O(N^2)`), you can allocate a tiny **Frequency Bucket Array** `new Array(maxVal + 1).fill(0)` (or `Int32Array`) and increment `freq[x]++` in a single `O(N)` pass! One loop reads values, and a second loop answers mode, duplicates, or missing values instantaneously.',
      asciiFlowchart: `arr = [3, 1, 3, 2, 3]   (length = 5, indices 0..4)
   |
   +--> freq = [0, 0, 0, 0]   (indices 0..3)
   +--> Single O(N) pass: freq[3]++, freq[1]++, freq[3]++, freq[2]++, freq[3]++
   +--> Result freq = [0, 1, 1, 3]  --> value 3 appears 3 times!`,
      pseudocode: [
        '1. PARSE N and N integers from stdin using a whitespace regex split',
        '2. ALLOCATE frequency array freq = new Array(limit).fill(0)',
        '3. SCAN once: increment freq[val]++ while tracking running sum / max',
        '4. QUERY frequency buckets in O(1) per value without nested loops',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শূন্য থেকে গণনা করা নম্বরযুক্ত লকার ও ট্যালি খাতা',
        explanation:
          'ধরো ক্লাসের ১,০০০ শিক্ষার্থীর ০ থেকে ১০ পর্যন্ত কুইজের নম্বর একটি লম্বা তালিকায় লেখা আছে। জাভাস্ক্রিপ্টে এই তালিকাকে বলে **Array** (`const scores = [7, 9, 7, 10]`), যেখানে প্রথম ঘরটির ঠিকানা `scores[0]` এবং শেষ ঘর `scores[scores.length - 1]`। মজার ব্যাপার হলো, আধুনিক V8 ইঞ্জিন নিরেট সংখ্যার অ্যারেকে র‍্যামে পাশাপাশি খুব দ্রুতগতির স্লটে সাজিয়ে রাখে যাতে `O(1)` সময়ে যেকোনো ইনডেক্স পড়া যায়। এখন যদি প্রশ্ন হয় "কতজন ছাত্র ৭ পেয়েছে?", তার জন্য প্রতিবার পুরো তালিকা ঘুরে দেখা মানে `O(N^2)` সময়ের অপচয়! এর বদলে আমরা ১১টি ঘরের (`0` থেকে `10`) একটি খালি **Frequency Bucket** (`new Array(11).fill(0)`) বানাবো এবং তালিকা ধরে একবার হেঁটে গিয়ে `freq[score]++` লিখবো। ঠিক ভোট গণনার ব্যালট বাক্সের মতো—৭ দেখলেই ৭ নম্বর বাক্সে একটি ট্যালি দাগ বাড়িয়ে দেব! মাত্র একবার লুপ চালালেই পুরো হিসাব `O(N)` সময়ে তৈরি হয়ে যায় এবং তারপর যেকোনো নম্বরের সংখ্যা চোখের পলকে `O(1)` সময়ে বলে দেওয়া যায়। একইভাবে `left` আর `right` ইনডেক্স অদলবদল করে পুরো অ্যারেকে কোনো বাড়তি মেমোরি ছাড়াই (`O(1)` স্পেস) উল্টে দেওয়া যায়।',
        everydayExample:
          'নির্বাচনের ভোট গণনায় ১০টি প্রার্থীর জন্য ১০টি আলাদা ট্যালি বক্স (`freq[0..9]`) রাখলে প্রতি ব্যালট পড়ে শুধু নির্দিষ্ট বাক্সে দাগ দিলেই একবারেই চূড়ান্ত ফলাফল পাওয়া যায়।',
        keyTakeaways: [
          'অ্যারের ইনডেক্স `0` থেকে `arr.length - 1` পর্যন্ত—কখনোই `arr.length`-এ পড়বে না (নইলে `undefined` আসে)।',
          'ছোট রেঞ্জের মান গুনতে `new Array(K + 1).fill(0)` দিয়ে `freq[x]++` করলে নেস্টেড লুপ ছাড়াই `O(N)` সমাধান মেলে।',
          '`for..in` ব্যবহার না করে সবসময় `for (let i = 0; i < arr.length; i++)` অথবা `for (const x of arr)` ব্যবহার করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Array Traversal, Sum, Max & In-Place Swap',
        englishParagraphs: [
          'A single index loop computes sum and maximum simultaneously while keeping `Math.max` safe against negative numbers by seeding `best = arr[0]`.',
          'Destructuring swap `[arr[l], arr[r]] = [arr[r], arr[l]]` reverses an array cleanly without mutating a copy.',
        ],
        banglaParagraphs: [
          'অ্যারের প্রথম উপাদান `arr[0]` দিয়ে `best` শুরু করলে ঋণাত্মক সংখ্যাতেও সর্বোচ্চ মান নির্ণয় নির্ভুল থাকে।',
          'ডি-স্ট্রাকচারিং `[a[l], a[r]] = [a[r], a[l]]` দিয়ে বাড়তি অ্যারে ছাড়াই উল্টানো যায়।',
        ],
        memoryDiagram: `arr = [4, 9, 2, 7] -> sum=22, max=9 -> reversed = [7, 2, 9, 4]`,
        code: `const arr = [4, 9, 2, 7];
let sum = 0;
let best = arr[0];
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
          { lineNumber: 'Line 3', codeSnippet: 'let best = arr[0];', whatItMeans: 'Seeds maximum tracker with actual first array item.', whyItIsThere: 'Prevents wrong 0 answer when all inputs are negative.', ifDeletedError: 'ReferenceError when comparing best.' },
          { lineNumber: 'Line 9', codeSnippet: '[arr[l], arr[r]] = [arr[r], arr[l]];', whatItMeans: 'Swaps opposite endpoints in place using ES destructuring.', whyItIsThere: 'Reverses array in O(1) extra memory.', ifDeletedError: 'Array stays unreversed.' },
        ],
      },
      {
        id: 'js-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Single-Pass Frequency Counting From Stdin',
        englishParagraphs: [
          'Read `N` followed by `N` numbers (`0..100`) from stdin, tally occurrences inside `freq`, and output non-zero value counts in ascending order.',
          'Bucket traversal runs in `O(N + K)` time where `K = 100`, beating `O(N^2)` nested scans cleanly.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে `N` ও সংখ্যাগুলো পড়ে `freq[x]++` বসিয়ে একবারেই প্রতিটি মানের উপস্থিতি গোনা হয়েছে।',
          'তারপর `0` থেকে `100` পর্যন্ত চালিয়ে কেবল যেগুলোর সংখ্যা `> 0` সেগুলো প্রিন্ট করা হয়েছে।',
        ],
        memoryDiagram: `input=[5, 3, 5, 1] -> freq[1]=1, freq[3]=1, freq[5]=2`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(Number);
const n = tokens[0] || 0;
const freq = new Array(101).fill(0);
for (let i = 1; i <= n; i++) {
  freq[tokens[i]]++;
}
for (let v = 0; v <= 100; v++) {
  if (freq[v] > 0) console.log(v + ":" + freq[v]);
}`,
        stdin: '4\n5 3 5 1',
        expectedOutput: '1:1\n3:1\n5:2',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'const freq = new Array(101).fill(0);', whatItMeans: 'Allocates zeroed count slots for keys 0 through 100.', whyItIsThere: 'Uninitialized array slots contain undefined, turning ++ into NaN.', ifDeletedError: 'freq is undeclared.' },
        ],
      },
      {
        id: 'js-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Right Cyclic Rotation by K Steps Using Triple Reverse',
        englishParagraphs: [
          'Rotating `[1, 2, 3, 4, 5]` right by `k = 2` yields `[4, 5, 1, 2, 3]`. Normalizing `k = k % n` handles `k >= n` safely.',
          'Reversing `[0..n-1]`, `[0..k-1]`, and `[k..n-1]` runs in `O(N)` time and `O(1)` extra space.',
        ],
        banglaParagraphs: [
          'পুরো অ্যারে, প্রথম `k` অংশ এবং বাকি `n-k` অংশ—এই তিনটি রিভার্স চালালে কোনো বাড়তি মেমোরি ছাড়াই `O(N)` সময়ে রোটেট হয়।',
          'আগে `k = k % n` করে নেওয়ায় `k` বড় হলেও সমস্যা হয় না।',
        ],
        memoryDiagram: `[1,2,3,4,5] -> rev all [5,4,3,2,1] -> rev 0..1 [4,5,3,2,1] -> rev 2..4 [4,5,1,2,3]`,
        code: `function rev(a, l, r) {
  while (l < r) {
    [a[l], a[r]] = [a[r], a[l]];
    l++;
    r--;
  }
}
const nums = [1, 2, 3, 4, 5];
const k = 2 % nums.length;
rev(nums, 0, nums.length - 1);
rev(nums, 0, k - 1);
rev(nums, k, nums.length - 1);
console.log(nums.join(" "));`,
        stdin: '',
        expectedOutput: '4 5 1 2 3',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'const k = 2 % nums.length;', whatItMeans: 'Wraps shift steps cleanly within array bounds.', whyItIsThere: 'Rotating by length returns original order.', ifDeletedError: 'Out-of-range slice indices when k > length.' },
        ],
      },
      {
        id: 'js-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Reference Aliasing & Unfilled Sparse Slot Trap vs Pre-Filled Array',
        englishParagraphs: [
          'Calling `new Array(10)` without `.fill(0)` leaves empty holes (`undefined`), so `counts[x]++` evaluates `undefined + 1 === NaN`!',
          'Similarly, `const copy = orig;` aliases the SAME array reference—mutating `copy` mutates `orig` unless you clone via `[...orig]` or `.slice()`.',
        ],
        banglaParagraphs: [
          '`new Array(10)` লিখে `.fill(0)` না দিলে ভেতরে `undefined` থাকে, ফলে `counts[x]++` করলে `NaN` হয়ে যায়!',
          'আবার `const b = a` করলে নতুন অ্যারে হয় না—একই রেফারেন্স শেয়ার করে।',
        ],
        memoryDiagram: `new Array(5)[0] + 1 === NaN | new Array(5).fill(0)[0] + 1 === 1`,
        code: `const data = [2, 0, 2, 1];
const freq = new Array(3).fill(0);
for (const x of data) freq[x]++;
const copy = [...data];
copy[0] = 99;
console.log("orig0=" + data[0] + " copy0=" + copy[0] + " freq2=" + freq[2]);`,
        stdin: '',
        expectedOutput: 'orig0=2 copy0=99 freq2=2',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'const copy = [...data];', whatItMeans: 'Shallow-clones elements into a separate array reference.', whyItIsThere: 'Prevents mutating original data array unexpectedly.', ifDeletedError: 'copy[0] = 99 overwrites data[0] too!' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const arr = [4, 9, 2, 7];', whatItMeans: 'Initializes packed 1D number array of length 4.', whyItIsThere: 'Stores sample dataset contiguously in V8 memory.', ifDeletedError: 'ReferenceError: arr is not defined.' },
      { lineNumber: 'Line 3', codeSnippet: 'let best = arr[0];', whatItMeans: 'Starts running max from index 0 instead of 0 literal.', whyItIsThere: 'Handles all-negative datasets accurately.', ifDeletedError: 'best undefined inside comparison.' },
      { lineNumber: 'Line 4', codeSnippet: 'for (let i = 0; i < arr.length; i++) {', whatItMeans: 'Strict zero-indexed traversal stopping before arr.length.', whyItIsThere: 'Visits every slot once in O(N) time.', ifDeletedError: 'Loop missing.' },
      { lineNumber: 'Line 8', codeSnippet: 'for (let l = 0, r = arr.length - 1; l < r; l++, r--) {', whatItMeans: 'Two-ended index convergence swapping pairs.', whyItIsThere: 'Reverses arr in-place without secondary allocation.', ifDeletedError: 'Array remains in original order.' },
    ],
    dryRunTable: [
      { step: 1, state: 'i=0: arr[0]=4', memoryOrStack: 'sum=4, best=4', note: 'Seeded best from arr[0]' },
      { step: 2, state: 'i=1: arr[1]=9', memoryOrStack: 'sum=13, best=9', note: '9 > 4 updates best' },
      { step: 3, state: 'i=2..3: 2, 7', memoryOrStack: 'sum=22, best=9', note: 'Scan completes in O(N)' },
      { step: 4, state: 'Swap l=0..1', memoryOrStack: 'arr=[7, 2, 9, 4]', note: 'In-place reversal complete' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Forgetting .fill(0) on new Array(N)', brokenCode: `const freq = new Array(10);\nfreq[3]++; // NaN!`, fixedCode: `const freq = new Array(10).fill(0);\nfreq[3]++; // 1`, whyItBreaks: 'Undefined slots produce NaN when incremented with ++.' },
      { title: 'Trap 2: Off-by-One Loop Condition (i <= arr.length)', brokenCode: `for (let i = 0; i <= arr.length; i++) sum += arr[i]; // NaN!`, fixedCode: `for (let i = 0; i < arr.length; i++) sum += arr[i];`, whyItBreaks: 'arr[arr.length] is undefined, corrupting arithmetic into NaN.' },
      { title: 'Trap 3: Sorting Numbers With Bare .sort()', brokenCode: `[10, 2, 1].sort(); // [1, 10, 2] lexicographic!`, fixedCode: `[10, 2, 1].sort((a, b) => a - b);`, whyItBreaks: 'Default JS .sort() converts numbers to strings unless given a comparator.' },
    ],
    practiceSheet: [
      { id: 'js-ch11-p1', difficulty: 'Easy', title: 'Array Sum & Maximum', prompt: 'Read `N` and `N` integers, then print `<sum> <max>`.', banglaHint: 'প্রথম উপাদান `a[0]` দিয়ে `mx` শুরু করে একবার লুপ চালাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0];\nlet sum = 0, mx = t[1];\nfor (let i = 1; i <= n; i++) { sum += t[i]; if (t[i] > mx) mx = t[i]; }\nconsole.log(sum + " " + mx);`, sampleStdin: '4\n-5 -2 -9 -3', expectedOutput: '-19 -2' },
      { id: 'js-ch11-p2', difficulty: 'Easy', title: 'Reverse Array In-Place', prompt: 'Read `N` and `N` integers and output them reversed separated by spaces.', banglaHint: '`l = 0, r = n - 1` রেখে সোয়াপ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst a = t.slice(1, 1 + t[0]);\nfor (let l = 0, r = a.length - 1; l < r; l++, r--) [a[l], a[r]] = [a[r], a[l]];\nconsole.log(a.join(" "));`, sampleStdin: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1' },
      { id: 'js-ch11-p3', difficulty: 'Medium', title: 'Most Frequent Element (0..100)', prompt: 'Read `N` and `N` ints (`0..100`), print the value with highest frequency (smallest on ties).', banglaHint: '`new Array(101).fill(0)` বানিয়ে `freq[x]++` গোনো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst freq = new Array(101).fill(0);\nfor (let i = 1; i <= t[0]; i++) freq[t[i]]++;\nlet ans = 0;\nfor (let v = 1; v <= 100; v++) if (freq[v] > freq[ans]) ans = v;\nconsole.log(ans);`, sampleStdin: '6\n4 2 4 3 2 4', expectedOutput: '4' },
      { id: 'js-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct Element', prompt: 'Find the second largest distinct integer (`-1` if none exists).', banglaHint: '`first` ও `second` ট্র্যাক করে ডুপ্লিকেট বাদ দাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nlet f = -Infinity, s = -Infinity;\nfor (let i = 1; i <= t[0]; i++) {\n  const x = t[i];\n  if (x > f) { s = f; f = x; }\n  else if (x < f && x > s) s = x;\n}\nconsole.log(s === -Infinity ? -1 : s);`, sampleStdin: '5\n10 5 10 8 3', expectedOutput: '8' },
      { id: 'js-ch11-p5', difficulty: 'Hard', title: 'Missing Number in 0..N Permutation', prompt: 'Given `N` and `N` distinct numbers from `0..N`, find the single missing integer in `O(N)` time.', banglaHint: 'মোট যোগফল `n*(n+1)/2` থেকে সব উপাদানের যোগফল বিয়োগ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0];\nlet got = 0;\nfor (let i = 1; i <= n; i++) got += t[i];\nconsole.log(Math.trunc((n * (n + 1)) / 2) - got);`, sampleStdin: '4\n3 0 1 4', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Frequency & Mode Analyzer',
      description: 'Read N integers (0..1000) and report the modal value and its exact count.',
      banglaGoal: 'ফ্রিকোয়েন্সি অ্যারে ব্যবহার করে `O(N)` সময়ে মোড (সবচেয়ে বেশি আসা সংখ্যা) ও তার সংখ্যা প্রিন্ট করো।',
      combinesChapters: 'JS Ch 1–11',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(Number);
const n = tokens[0] || 0;
const freq = new Array(1001).fill(0);
for (let i = 1; i <= n; i++) freq[tokens[i]]++;
let bestVal = 0;
for (let v = 1; v <= 1000; v++) {
  if (freq[v] > freq[bestVal]) bestVal = v;
}
console.log(bestVal + " " + freq[bestVal]);`,
      sampleStdin: '6\n5 2 5 8 2 5',
      expectedOutput: '5 3',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(Number);
const n = tokens[0] || 0;
const freq = new Array(1001).fill(0);
for (let i = 1; i <= n; i++) freq[tokens[i]]++;
let bestVal = 0;
for (let v = 1; v <= 1000; v++) {
  if (freq[v] > freq[bestVal]) bestVal = v;
}
console.log(bestVal + " " + freq[bestVal]);`,
    sampleStdin: '6\n5 2 5 8 2 5',
    expectedSampleOutput: '5 3',
    testCases: [
      { id: 'js11-t1', input: '6\n5 2 5 8 2 5', expectedOutput: '5 3' },
      { id: 'js11-t2', input: '4\n7 7 1 2', expectedOutput: '7 2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'JS Chapter 12 (ES2025): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'JS অধ্যায় ১২ (ES2025): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিকস',
    subtitle: 'Opposite-end sorted two-sum, O(N) fixed K-window sliding, variable monotonic windows, and fast/slow pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'Testing every pair `(i, j)` or re-summing every `K`-element slice takes `O(N^2)` or `O(N * K)` operations—which times out cleanly above $N = 10^4$ in Node.js contests. **Two Pointers** and **Sliding Window** slash that work down to linear `O(N)` time and `O(1)` extra space.\n\nFor a sorted array, placing `l = 0` and `r = n - 1` guarantees every step moves strictly closer to the answer (`sum < target => l++`, `sum > target => r--`). For contiguous windows of length `K`, sliding forward adds the new right element `a[i]` and drops the exiting left element `a[i - k]` in `O(1)` time.',
      asciiFlowchart: `Sorted a = [2, 4, 7, 10, 15], target = 14
   l=0 (2)                    r=4 (15) -> 2+15 = 17 > 14 -> r--
   l=0 (2)             r=3 (10)        -> 2+10 = 12 < 14 -> l++
        l=1 (4)        r=3 (10)        -> 4+10 = 14 == MATCH!`,
      pseudocode: [
        '1. OPPOSITE-END: start l = 0, r = n - 1 on sorted array; loop while l < r',
        '2. FIXED WINDOW: compute first K elements once, then slide win += a[i] - a[i - k]',
        '3. VARIABLE WINDOW: expand r++ while valid; shrink while sum > S via l++',
        '4. SLOW/FAST: advance write pointer w only on unique or matching items',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির জানালার ফ্রেম ও দুই দিকের চিমটি',
        explanation:
          'ধরো একটি সাজানো তালিকায় (`[2, 4, 7, 10, 15]`) দুটি সংখ্যা খুঁজে বের করতে হবে যাদের যোগফল ১৪। প্রতিটি জোড়া পরীক্ষা করতে গেলে `O(N^2)` সময় লাগবে! এর বদলে দুই প্রান্তে দুজন প্রহরী বসাও: বামে সবচেয়ে ছোট সংখ্যায় `l = 0` এবং ডানে সবচেয়ে বড় সংখ্যায় `r = n - 1`। যোগফল যদি ১৪-এর চেয়ে বড় হয় (`2 + 15 = 17`), তাহলে ডান দিকের বড় সংখ্যাটা এক ঘর বামে (`r--`) আনো; আর যদি ছোট হয় (`2 + 10 = 12`), তাহলে বাম দিকের ছোট সংখ্যাটা এক ঘর ডানে (`l++`) নাও! মাত্র ৩ ধাপেই মিলে যাবে `4 + 10 = 14`! এবার দ্বিতীয় জাদু হলো **Sliding Window**: ধরো `K = 3`টি টানা ঘরের সর্বোচ্চ যোগফল বের করতে হবে। চলন্ত ট্রেনের জানালা এক ঘর সামনে এগোলে সামনের নতুন একটি ঘর (`+ a[i]`) জানালার ভেতরে ঢোকে আর পেছনের পুরনো একটি ঘর (`- a[i - k]`) বেরিয়ে যায়! প্রতিবার পুরো `K` ঘর নতুন করে যোগ না করে মাত্র একটি যোগ ও একটি বিয়োগ করলেই পুরো `O(N)` সময়ে সমাধান হয়ে যায়। জাভাস্ক্রিপ্টে `slice().reduce()` লুপের ভেতরে ব্যবহার করলে তা `O(N*K)` হয়ে টাইম লিমিট খায়—তাই স্লাইডিং ফর্মুলাই প্রো পদ্ধতি।',
        everydayExample:
          'সিনেমার ক্যামেরা ফ্রেম এক পা ডানে সরালে ডানে একজন নতুন অভিনেতা ফ্রেমে ঢোকে এবং বাম পাশ থেকে একজন বেরিয়ে যায়—মাঝখানের সবাই একই থাকে!',
        keyTakeaways: [
          'Opposite-End Two Pointers চালাতে হলে অ্যারেটি অবশ্যই `.sort((a, b) => a - b)` করে সাজানো হতে হবে।',
          'ফিক্সড উইন্ডোতে লুপের ভেতর `slice()` বা `reduce()` নয়, `win += a[i] - a[i - k]` চালাতে হয়।',
          'ভ্যারিয়েবল উইন্ডোতে `while (sum > S) sum -= a[l++]` কেবল ধনাত্মক (অঋণাত্মক) সংখ্যার ক্ষেত্রেই সঠিক কাজ করে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Opposite-End Two-Sum in Sorted Array',
        englishParagraphs: [
          'Because `a` is sorted non-decreasingly, incrementing `l` strictly cannot decrease the sum, and decrementing `r` cannot increase it.',
          'The strict `l < r` condition ensures an element is never paired with itself.',
        ],
        banglaParagraphs: [
          'সাজানো অ্যারেতে `l < r` শর্তে চালালে একই সংখ্যা দুবার ব্যবহৃত হওয়ার সুযোগ থাকে না।',
          'প্রতি ধাপে অন্তত একটি ইনডেক্স ভেতরে ঢোকে, তাই লুপ সর্বোচ্চ `N` বার চলে।',
        ],
        memoryDiagram: `[2, 4, 7, 10, 15], target=14 -> l=1(4), r=3(10)`,
        code: `const a = [2, 4, 7, 10, 15];
const target = 14;
let l = 0, r = a.length - 1;
while (l < r) {
  const s = a[l] + a[r];
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
          { lineNumber: 'Line 4', codeSnippet: 'while (l < r) {', whatItMeans: 'Iterates only while left index stays strictly before right index.', whyItIsThere: 'Guarantees two distinct indices are chosen.', ifDeletedError: 'Loop never runs.' },
        ],
      },
      {
        id: 'js-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fixed-Length K-Window Maximum Sum via Stdin',
        englishParagraphs: [
          'Seed `win` with the initial `K` values once, then slide across indices `k .. n - 1` adding `a[i]` and subtracting `a[i - k]`.',
          'Total operations stay strictly `O(N)` regardless of how large `K` is.',
        ],
        banglaParagraphs: [
          'শুরুতে প্রথম `K`টি উপাদান যোগ করে নিয়ে এরপর প্রতিটি ধাপে নতুন ডান মান যোগ ও বেরিয়ে যাওয়া বাম মান বিয়োগ করা হয়েছে।',
          '`K` যত বড়ই হোক, সময় লাগে কেবল `O(N)`।',
        ],
        memoryDiagram: `[5,2,8,1,9], k=3 -> 15 -> 11 -> 18 => max=18`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/).map(Number);
const n = t[0], k = t[1];
const a = t.slice(2, 2 + n);
let win = 0;
for (let i = 0; i < k; i++) win += a[i];
let best = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Slides frame right by 1 element in O(1).', whyItIsThere: 'Eliminates inner K-iteration resumming.', ifDeletedError: 'best remains fixed at initial window sum.' },
        ],
      },
      {
        id: 'js-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Variable Sliding Window (Longest Subarray Sum <= S)',
        englishParagraphs: [
          'With non-negative elements, expanding `r` monotonically grows `sum` while shrinking `l` monotonically lowers `sum`.',
          'Total increments of `l` across the entire execution cannot exceed `N`.',
        ],
        banglaParagraphs: [
          'অঋণাত্মক সংখ্যার ক্ষেত্রে যোগফল `S` ছাড়ালেই `l++` করে জানালা ছোট করলে একবারেই সর্বোচ্চ বৈধ দৈর্ঘ্য মেলে।',
          '`l` পুরো প্রোগ্রামে সর্বোচ্চ `N` বারই এগোয়, তাই এটিও `O(N)`।',
        ],
        memoryDiagram: `[3, 1, 2, 7, 4], S=6 -> [3, 1, 2] len=3`,
        code: `const a = [3, 1, 2, 7, 4];
const S = 6;
let sum = 0, l = 0, best = 0;
for (let r = 0; r < a.length; r++) {
  sum += a[r];
  while (sum > S) sum -= a[l++];
  if (r - l + 1 > best) best = r - l + 1;
}
console.log(best);`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'while (sum > S) sum -= a[l++];', whatItMeans: 'Shrinks left window border until constraint sum <= S holds.', whyItIsThere: 'Restores subarray validity in amortized O(1).', ifDeletedError: 'Accepts subarrays exceeding budget S.' },
        ],
      },
      {
        id: 'js-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Slicing Inside Loops Trap vs Slow/Fast In-Place Deduplication',
        englishParagraphs: [
          'Calling `a.slice(i, i + k)` inside a loop allocates `N` temporary subarrays (`O(N * K)` time and memory churn).',
          'Same-direction slow/fast pointers deduplicate sorted arrays cleanly in `O(1)` extra space without extra arrays.',
        ],
        banglaParagraphs: [
          'লুপের ভেতর `slice()` কল করলে প্রতিবার নতুন সাব-অ্যারে তৈরি হয়ে `O(N*K)` সময় ও মেমোরি নষ্ট করে!',
          'স্লো/ফাস্ট পয়েন্টার দিয়ে সাজানো অ্যারেতে ইন-প্লেস ইউনিক গণনা `O(1)` মেমোরিতেই হয়।',
        ],
        memoryDiagram: `[1,1,2,2,2,5,5] -> write pointer w=3`,
        code: `const a = [1, 1, 2, 2, 2, 5, 5];
let w = 0;
for (let r = 0; r < a.length; r++) {
  if (w === 0 || a[r] !== a[w - 1]) a[w++] = a[r];
}
console.log("unique=" + w);`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'if (w === 0 || a[r] !== a[w - 1]) a[w++] = a[r];', whatItMeans: 'Copies only distinct sorted elements forward in-place.', whyItIsThere: 'O(N) deduplication with zero auxiliary arrays.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const a = [2, 4, 7, 10, 15];', whatItMeans: 'Sorted array prerequisite for opposite-end convergence.', whyItIsThere: 'Monotonic order proves l++ increases sum and r-- shrinks it.', ifDeletedError: 'a undeclared.' },
      { lineNumber: 'Line 3', codeSnippet: 'let l = 0, r = a.length - 1;', whatItMeans: 'Sets pointers to extreme ends of sorted array.', whyItIsThere: 'Starts search over widest span.', ifDeletedError: 'Pointers undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'while (l < r) {', whatItMeans: 'Maintains two distinct elements.', whyItIsThere: 'Stops cleanly when pointers meet.', ifDeletedError: 'Pairs checked 0 times.' },
      { lineNumber: 'Line 10', codeSnippet: 'if (s < target) l++; else r--;', whatItMeans: 'Narrows search interval monotonically in O(1).', whyItIsThere: 'Guarantees linear convergence.', ifDeletedError: 'Infinite loop when sum != target.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'Decrement r to 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'Increment l to 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Found pair -> print 4 10' },
      { step: 4, state: 'break', memoryOrStack: '3 steps', note: 'O(N) termination' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Slicing Inside Sliding Window Loop', brokenCode: `for (let i = 0; i <= n - k; i++) a.slice(i, i + k).reduce((x,y)=>x+y); // O(N*K)!`, fixedCode: `win += a[i] - a[i - k]; // O(N) total`, whyItBreaks: 'Allocating slices every step turns O(N) into O(N*K) and triggers GC pauses.' },
      { title: 'Trap 2: Two Pointers Without Numeric Comparator Sort', brokenCode: `a.sort(); // Alphabetical sort [10, 2, 4]!`, fixedCode: `a.sort((x, y) => x - y);`, whyItBreaks: 'JS .sort() without comparator sorts numbers as strings, breaking monotonicity.' },
      { title: 'Trap 3: Inclusive l <= r Allowing Self-Addition', brokenCode: `while (l <= r) { if (a[l] + a[r] === target) ... }`, fixedCode: `while (l < r) { ... }`, whyItBreaks: 'When l === r, a single element is counted twice against itself.' },
    ],
    practiceSheet: [
      { id: 'js-ch12-p1', difficulty: 'Easy', title: 'Sorted Two-Sum Check', prompt: 'Given `N`, `target`, and sorted array, print `YES` if any pair sums to `target`, else `NO`.', banglaHint: 'সাজানো অ্যারেতে `l=0, r=n-1` নিয়ে `while (l < r)` চালাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], target = t[1];\nconst a = t.slice(2, 2 + n);\nlet l = 0, r = n - 1, ok = false;\nwhile (l < r) { const s = a[l] + a[r]; if (s === target) { ok = true; break; } if (s < target) l++; else r--; }\nconsole.log(ok ? "YES" : "NO");`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'js-ch12-p2', difficulty: 'Easy', title: 'Maximum K-Window Sum', prompt: 'Given `N`, `K`, and `N` integers, output max sum over `K` consecutive slots.', banglaHint: '`win += a[i] - a[i - k]` সূত্র ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], k = t[1], a = t.slice(2, 2 + n);\nlet w = 0; for (let i = 0; i < k; i++) w += a[i];\nlet b = w; for (let i = k; i < n; i++) { w += a[i] - a[i - k]; if (w > b) b = w; }\nconsole.log(b);`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'js-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Given `N`, `S`, and positive ints, print max subarray length with sum `<= S`.', banglaHint: '`while (sum > S) sum -= a[l++];` করে উইন্ডো ছোট করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], S = t[1], a = t.slice(2, 2 + n);\nlet sum = 0, l = 0, best = 0;\nfor (let r = 0; r < n; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; if (r - l + 1 > best) best = r - l + 1; }\nconsole.log(best);`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'js-ch12-p4', difficulty: 'Medium', title: 'Move Zeros to End', prompt: 'Shift non-zero elements forward keeping order, moving zeros to the back.', banglaHint: '`w` রাইট পয়েন্টার রেখে অ-শূন্য উপাদান সামনে সোয়াপ করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], a = t.slice(1, 1 + n);\nlet w = 0;\nfor (let r = 0; r < n; r++) if (a[r] !== 0) { [a[w], a[r]] = [a[r], a[w]]; w++; }\nconsole.log(a.join(" "));`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'js-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Compute maximum `Math.min(h[l], h[r]) * (r - l)` using two pointers.', banglaHint: 'দুই প্রান্তের যে দেয়াল ছোট সেটি ভেতরে সরাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], h = t.slice(1, 1 + n);\nlet l = 0, r = n - 1, best = 0;\nwhile (l < r) { const area = Math.min(h[l], h[r]) * (r - l); if (area > best) best = area; if (h[l] < h[r]) l++; else r--; }\nconsole.log(best);`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Max K-Window Sliding Engine',
      description: 'Read N, K and N integers from stdin and compute max contiguous K-window sum in O(N).',
      banglaGoal: 'স্লাইডিং উইন্ডো পদ্ধতিতে `O(N)` সময়ে `K` দৈর্ঘ্যের সর্বোচ্চ যোগফল নির্ণয় করো।',
      combinesChapters: 'JS Ch 1–12',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(Number);
const n = tokens[0] || 0;
const k = tokens[1] || 0;
const a = tokens.slice(2, 2 + n);
let win = 0;
for (let i = 0; i < k; i++) win += a[i];
let best = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/).map(Number);
const n = tokens[0] || 0;
const k = tokens[1] || 0;
const a = tokens.slice(2, 2 + n);
let win = 0;
for (let i = 0; i < k; i++) win += a[i];
let best = win;
for (let i = k; i < n; i++) {
  win += a[i] - a[i - k];
  if (win > best) best = win;
}
console.log(best);`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'js12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'js12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'JS Chapter 13 (ES2025): Prefix Sums & Difference Arrays',
    banglaTitle: 'JS অধ্যায় ১৩ (ES2025): প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    subtitle: '1-based cumulative prefix arrays pref[r] - pref[l - 1] and O(1) difference-array range increments.',
    zeroIntuition: {
      plainEnglishStory:
        'Answering `Q = 10^5` range sum queries by slicing and reducing `a.slice(l, r + 1)` repeats `O(N)` work per query (`O(N * Q)` TLE). Building a **1-based Prefix Sum Array** `const pref = new Array(n + 1).fill(0)` computes running sums once in `O(N)`, letting every 1-based `[l, r]` query finish in `O(1)` via `pref[r] - pref[l - 1]`.\n\nReversing the operation, a **Difference Array** `diff = new Array(n + 2).fill(0)` applies `[l, r] += v` range increments in two `O(1)` ticks (`diff[l] += v; diff[r + 1] -= v;`), followed by a single final prefix reconstruction loop.',
      asciiFlowchart: `a = [3, 2, 5, 1] -> pref = [0, 3, 5, 10, 11]  (index 0 = padded 0)
Query [2..4]: pref[4] - pref[1] = 11 - 3 = 8  (O(1) instant!)
Range [l..r] += v: diff[l] += v; diff[r + 1] -= v; -> prefix sweep!`,
      pseudocode: [
        '1. ALLOCATE 1-based pref = new Array(n + 1).fill(0)',
        '2. PRECOMPUTE pref[i] = pref[i - 1] + a[i - 1] once in O(N)',
        '3. QUERY any 1-based [l, r] sum via pref[r] - pref[l - 1] in O(1)',
        '4. APPLY range add [l, r] += v in diff[l] += v; diff[r + 1] -= v (size n + 2)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'মাইলফলকের তালিকা ও রেঞ্জ গেট-পাস',
        explanation:
          'লুপের ভেতরে বারবার `slice().reduce()` চালিয়ে `[L, R]` যোগফল বের করলে `O(N * Q)` সময় নষ্ট হয়ে টাইম লিমিট খায়। এর সমাধান হলো **Prefix Sum**: `new Array(n + 1).fill(0)` দিয়ে ১-বেসড `pref` বানিয়ে `pref[i] = pref[i - 1] + a[i - 1]` জমা রাখো। তখন ১-বেসড যেকোনো `[L, R]` যোগফল মাত্র এক বিয়োগেই (`pref[r] - pref[l - 1]`) `O(1)` সময়ে বের হয়! মনে রাখবে `new Array(n + 1)`-এ `.fill(0)` না দিলে `pref[0]` `undefined` থেকে `NaN` হয়ে যাবে। আর `Q = 10^5` উত্তর প্রতি লাইনে `console.log` না করে `out.push()` ও `out.join("\\n")` করবে। অন্যদিকে বহু `[L, R] += v` আপডেটের জন্য `diff = new Array(n + 2).fill(0)` নিয়ে `diff[l] += v; diff[r + 1] -= v;` করে শেষে একবার প্রিফিক্স চালালেই `O(N + U)` সময়ে উত্তর মিলে।',
        everydayExample:
          'প্রতিটি স্টেশনের শুরু থেকে মোট দূরত্ব লেখা থাকলে মাঝের যেকোনো দুই স্টেশনের দূরত্ব স্রেফ দুটি সংখ্যার বিয়োগেই পাওয়া যায়।',
        keyTakeaways: [
          '`new Array(n + 1).fill(0)` দিয়ে ১-বেসড `pref` রাখলে `L = 1` কেসে `pref[L - 1]` সবসময় `0` পায়।',
          'বড় সংখ্যার কুয়েরি উত্তর `out.push(...)` করে শেষে `console.log(out.join("\\n"))` করলে দ্রুত প্রিন্ট হয়।',
          '`diff` অ্যারের সাইজ `n + 2` ও `.fill(0)` না রাখলে `diff[r + 1]` `NaN` হয়ে যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-13-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1-Based Prefix Sum & O(1) Range Queries',
        englishParagraphs: [
          'Padding `pref[0] = 0` avoids `if (l === 0)` special branches cleanly.',
          'Each query resolves via one array subtraction in `O(1)`.',
        ],
        banglaParagraphs: [
          '`pref[0] = 0` রাখায় `l = 1` হলেও কোনো অতিরিক্ত `if` ছাড়াই `pref[r] - pref[l - 1]` কাজ করে।',
          'যেকোনো দৈর্ঘ্যের রেঞ্জ `O(1)` সময়ে বের হয়।',
        ],
        memoryDiagram: `a=[3,2,5,1] -> pref=[0,3,5,10,11] -> sum(2..4)=8`,
        code: `const a = [3, 2, 5, 1];
const n = a.length;
const pref = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];
console.log("sum(2..4)=" + (pref[4] - pref[1]));
console.log("sum(1..3)=" + (pref[3] - pref[0]));`,
        stdin: '',
        expectedOutput: 'sum(2..4)=8\nsum(1..3)=10',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'const pref = new Array(n + 1).fill(0);', whatItMeans: 'Allocates 1-based cumulative array initialized to zero.', whyItIsThere: 'Uninitialized slots produce NaN when summed.', ifDeletedError: 'pref undefined.' },
        ],
      },
      {
        id: 'js-ch-13-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Batched Q Range Queries From Stdin',
        englishParagraphs: [
          'Builds `pref` in one loop, pushes answers into `out[]`, and prints once with `out.join("\\n")`.',
          'Runs cleanly in `O(N + Q)` time.',
        ],
        banglaParagraphs: [
          'ইনপুট পড়ে `pref` বানিয়ে সব কুয়েরির উত্তর `out` অ্যারেতে রেখে শেষে একবারে প্রিন্ট করা হয়েছে।',
          'সময় জটিলতা মাত্র `O(N + Q)`।',
        ],
        memoryDiagram: `pref=[0,2,6,7,12] -> 10\\n7`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/).map(Number);
const n = t[0] || 0, q = t[1] || 0;
const pref = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + t[1 + i];
const out = [];
let idx = 2 + n;
for (let k = 0; k < q; k++) {
  const l = t[idx++], r = t[idx++];
  out.push(pref[r] - pref[l - 1]);
}
console.log(out.join("\\n"));`,
        stdin: '4 2\n2 4 1 5\n2 4\n1 3',
        expectedOutput: '10\n7',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'out.push(pref[r] - pref[l - 1]);', whatItMeans: 'Computes range sum in O(1) and batches output.', whyItIsThere: 'Prevents repeated console flush latency.', ifDeletedError: 'Prints empty output.' },
        ],
      },
      {
        id: 'js-ch-13-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(1) Range Updates via Difference Array',
        englishParagraphs: [
          'Records interval additions cleanly via `diff[l] += v; diff[r + 1] -= v;` in an `n + 2` zero-filled array.',
          'Reconstructs all final element totals in one linear sweep.',
        ],
        banglaParagraphs: [
          '`n + 2` সাইজের `diff` অ্যারেতে `[l, r] += v` আপডেট দুটি চিহ্নে সংরক্ষণ করে শেষে একবার প্রিফিক্স সাম চালানো হয়েছে।',
          'সবগুলো ঘরের চূড়ান্ত মান একসাথে মেলে।',
        ],
        memoryDiagram: `[1..3]+=2, [2..5]+=3 -> 2 5 5 3 3`,
        code: `const n = 5;
const diff = new Array(n + 2).fill(0);
for (const [l, r, v] of [[1, 3, 2], [2, 5, 3]]) {
  diff[l] += v;
  diff[r + 1] -= v;
}
let run = 0;
const res = [];
for (let i = 1; i <= n; i++) {
  run += diff[i];
  res.push(run);
}
console.log(res.join(" "));`,
        stdin: '',
        expectedOutput: '2 5 5 3 3',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'diff[r + 1] -= v;', whatItMeans: 'Stops range addition immediately past index r.', whyItIsThere: 'Requires diff length n + 2 for r === n.', ifDeletedError: 'Tail receives unwanted +v.' },
        ],
      },
      {
        id: 'js-ch-13-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'NaN Prefix Trap & Equilibrium Pivot Index',
        englishParagraphs: [
          'Forgetting `.fill(0)` turns `pref[0]` into `undefined`, poisoning every prefix value with `NaN`!',
          'With clean 1-based prefix totals, left sum equals right sum whenever `p[i - 1] === p[n] - p[i]`.',
        ],
        banglaParagraphs: [
          '`.fill(0)` না দিলে `pref[0]` থাকে `undefined`, ফলে পুরো প্রিফিক্স অ্যারেই `NaN` হয়ে যায়!',
          'সঠিক প্রিফিক্স দিয়ে বাম ও ডান সমান যোগফলের পিভট `O(N)` সময়েই পাওয়া যায়।',
        ],
        memoryDiagram: `[1,7,3,6,5,6] -> pivot=3`,
        code: `const a = [1, 7, 3, 6, 5, 6];
const n = a.length;
const p = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) p[i] = p[i - 1] + a[i - 1];
let pivot = -1;
for (let i = 1; i <= n; i++) {
  if (p[i - 1] === p[n] - p[i]) { pivot = i - 1; break; }
}
console.log("pivot=" + pivot);`,
        stdin: '',
        expectedOutput: 'pivot=3',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if (p[i - 1] === p[n] - p[i])', whatItMeans: 'Compares left prefix vs right suffix in O(1).', whyItIsThere: 'Finds equilibrium pivot cleanly in linear time.', ifDeletedError: 'pivot remains -1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'const pref = new Array(n + 1).fill(0);', whatItMeans: 'Zero-initialized 1-based prefix sum array.', whyItIsThere: 'Avoids undefined -> NaN arithmetic and negative indices.', ifDeletedError: 'pref undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i - 1];', whatItMeans: 'Precomputes cumulative sums in O(N).', whyItIsThere: 'Enables O(1) range subtraction.', ifDeletedError: 'Queries return 0.' },
      { lineNumber: 'Line 5', codeSnippet: 'console.log("sum(2..4)=" + (pref[4] - pref[1]));', whatItMeans: 'Outputs range sum [2..4] in O(1).', whyItIsThere: 'Replaces repeated linear summing.', ifDeletedError: 'Missing output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'fill(0)', memoryOrStack: 'pref=[0,0,0,0,0]', note: 'Safe zero base' },
      { step: 2, state: 'i=1..2', memoryOrStack: 'pref[1]=3, pref[2]=5', note: 'Cumulative pass' },
      { step: 3, state: 'i=3..4', memoryOrStack: 'pref[3]=10, pref[4]=11', note: 'Ready for queries' },
      { step: 4, state: 'pref[4] - pref[1]', memoryOrStack: '11 - 3 = 8', note: 'O(1) answer' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Omitting .fill(0) on Prefix Array', brokenCode: `const pref = new Array(n + 1); // pref[0] === undefined -> NaN!`, fixedCode: `const pref = new Array(n + 1).fill(0);`, whyItBreaks: 'undefined + number produces NaN across the entire prefix array.' },
      { title: 'Trap 2: Slicing & Reducing Inside Query Loop', brokenCode: `for (const [l, r] of queries) console.log(a.slice(l, r + 1).reduce((x,y)=>x+y));`, fixedCode: `out.push(pref[r] - pref[l - 1]);`, whyItBreaks: 'Repeats O(N) slicing and summing on every query.' },
      { title: 'Trap 3: Calling diff = new Array(n + 1).fill(0) Without + 2', brokenCode: `diff[r + 1] -= v; // Writes past intended bounds when r === n!`, fixedCode: `const diff = new Array(n + 2).fill(0);`, whyItBreaks: 'r === n accesses index n + 1.' },
    ],
    practiceSheet: [
      { id: 'js-ch13-p1', difficulty: 'Easy', title: '1-Based Range Sum Queries', prompt: 'Given `N, Q`, array, and `Q` pairs `(l, r)`, output each range sum in `O(1)`.', banglaHint: '`pref[r] - pref[l - 1]` সূত্রটি `out` অ্যারেতে জমা করে প্রিন্ট করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], q = t[1], p = new Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) p[i] = p[i - 1] + t[1 + i];\nconst out = []; let idx = 2 + n;\nfor (let k = 0; k < q; k++) { out.push(p[t[idx + 1]] - p[t[idx] - 1]); idx += 2; }\nconsole.log(out.join("\\n"));`, sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'js-ch13-p2', difficulty: 'Easy', title: 'Equilibrium / Pivot Index', prompt: 'Find first 0-based index whose left sum equals right sum (`-1` if none).', banglaHint: '`p[i - 1] === p[n] - p[i]` যাচাই করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], p = new Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) p[i] = p[i - 1] + t[i];\nlet ans = -1; for (let i = 1; i <= n; i++) if (p[i - 1] === p[n] - p[i]) { ans = i - 1; break; }\nconsole.log(ans);`, sampleStdin: '6\n1 7 3 6 5 6', expectedOutput: '3' },
      { id: 'js-ch13-p3', difficulty: 'Medium', title: 'Difference Array Range Updates', prompt: 'Apply `U` updates `(l, r, v)` on zero array of size `N` and print final state.', banglaHint: '`new Array(n + 2).fill(0)` নিয়ে `diff[l] += v; diff[r + 1] -= v;` করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], u = t[1], d = new Array(n + 2).fill(0);\nlet idx = 2; for (let k = 0; k < u; k++) { const l = t[idx++], r = t[idx++], v = t[idx++]; d[l] += v; d[r + 1] -= v; }\nlet run = 0; const res = []; for (let i = 1; i <= n; i++) { run += d[i]; res.push(run); }\nconsole.log(res.join(" "));`, sampleStdin: '5 2\n1 3 2\n2 5 3', expectedOutput: '2 5 5 3 3' },
      { id: 'js-ch13-p4', difficulty: 'Medium', title: 'Running Prefix Maximum', prompt: 'Output cumulative maximum after each array item.', banglaHint: '`mx = Math.max(mx, x)` আপডেট করে `res` অ্যারেতে রাখো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0]; let mx = t[1]; const out = [];\nfor (let i = 1; i <= n; i++) { if (t[i] > mx) mx = t[i]; out.push(mx); }\nconsole.log(out.join(" "));`, sampleStdin: '5\n3 1 5 2 6', expectedOutput: '3 3 5 5 6' },
      { id: 'js-ch13-p5', difficulty: 'Hard', title: 'Subarrays Divisible by K', prompt: 'Count non-empty subarrays whose sum is divisible by `K`.', banglaHint: '`((s + x) % k + k) % k` রিমাইন্ডারের ফ্রিকোয়েন্সি গোনো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/).map(Number);\nconst n = t[0], k = t[1], cnt = new Array(k).fill(0); cnt[0] = 1;\nlet s = 0, ans = 0; for (let i = 1; i <= n; i++) { s = ((s + t[i]) % k + k) % k; ans += cnt[s]; cnt[s]++; }\nconsole.log(ans);`, sampleStdin: '5 3\n4 5 0 2 1', expectedOutput: '6' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N + Q) Prefix Range Query Engine',
      description: 'Precompute 1-based prefix sums and flush Q [l, r] answers in O(1) per query.',
      banglaGoal: '১-বেসড প্রিফিক্স সাম তৈরি করে প্রতিটি রেঞ্জ যোগফল `O(1)` সময়ে বের করো।',
      combinesChapters: 'JS Ch 1–13',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/).map(Number);
const n = t[0] || 0, q = t[1] || 0;
const pref = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + t[1 + i];
const out = [];
let idx = 2 + n;
for (let k = 0; k < q; k++) {
  const l = t[idx++], r = t[idx++];
  out.push(pref[r] - pref[l - 1]);
}
console.log(out.join("\\n"));`,
      sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
      expectedOutput: '10\n7',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/).map(Number);
const n = t[0] || 0, q = t[1] || 0;
const pref = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) pref[i] = pref[i - 1] + t[1 + i];
const out = [];
let idx = 2 + n;
for (let k = 0; k < q; k++) {
  const l = t[idx++], r = t[idx++];
  out.push(pref[r] - pref[l - 1]);
}
console.log(out.join("\\n"));`,
    sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
    expectedSampleOutput: '10\n7',
    testCases: [
      { id: 'js13-t1', input: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'js13-t2', input: '3 1\n10 20 30\n1 3', expectedOutput: '60', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'JS Chapter 14 (ES2025): Strings, UTF-16 & Manipulation',
    banglaTitle: 'JS অধ্যায় ১৪ (ES2025): স্ট্রিং, UTF-16 ও ম্যানিপুলেশন',
    subtitle: 'Immutable JS Strings, O(N) parts.join(""), charCodeAt() 26-bucket anagrams, and string-method gotchas.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript strings are **immutable sequences of UTF-16 code units**: attempting `s[0] = "A"` fails silently (or throws `TypeError` in strict mode). To assemble dynamic text across thousands of iterations cleanly, collect pieces inside `const parts = []` and join once with `parts.join("")`.\n\nMeanwhile, lowercase ASCII letters map neatly via `s.charCodeAt(i) - 97` (`"a".charCodeAt(0) === 97`) into a 26-slot `new Array(26).fill(0)` frequency array, enabling `O(N)` palindrome and anagram checks without expensive splits or sorts.',
      asciiFlowchart: `s = "racecar"   (Immutable UTF-16 string)
  "a".charCodeAt(0) = 97  -->  freq[ch.charCodeAt(0) - 97]++
  parts.push(...) ---> parts.join("")  (Clean O(N) assembly!)`,
      pseudocode: [
        '1. STORE mutated string result inside parts = [] then return parts.join("")',
        '2. MAP lowercase letters via s.charCodeAt(i) - 97 into 26-slot array',
        '3. ASSIGN returned values from .trim() / .toLowerCase() back to variables',
        '4. COMPARE palindromes via two pointers l < r for O(1) space',
      ],
      banglaZeroToHero: {
        analogyTitle: 'অপরিবর্তনীয় অক্ষরের ফিতা ও ৯৭ কোড-কার্ড',
        explanation:
          'জাভাস্ক্রিপ্টে স্ট্রিং হলো **Immutable**—অর্থাৎ `s[0] = "A"` লিখলে স্ট্রিংয়ের প্রথম অক্ষর কখনোই বদলায় না, বরং স্ট্রিক্ট মোডে এরর আসে! তাই যখন অনেকগুলো অক্ষর জোড়া দিয়ে নতুন স্ট্রিং বানাতে হবে, তখন `const parts = []` অ্যারেতে `.push()` করে রেখে শেষে `parts.join("")` করাই সবচেয়ে পরিচ্ছন্ন `O(N)` পদ্ধতি। ইংরেজি ছোট হাতের বর্ণ (`a`–`z`) গুনতে `"a".charCodeAt(0)` যার মান `97`, তা বিয়োগ করে `s.charCodeAt(i) - 97` দিলেই ২৬ ঘরের একটি ফ্রিকোয়েন্সি অ্যারে (`new Array(26).fill(0)`) বানিয়ে `O(N)` সময়ে অ্যানাগ্রাম বা প্রথম ইউনিক অক্ষর বের করা যায়। মনে রাখবে `s.toLowerCase()` বা `s.trim()` মূল স্ট্রিং `s`-কে বদলায় না—বরং নতুন স্ট্রিং ফেরত দেয়, তাই ফলাফল আবার ভ্যারিয়েবলে সেভ করতে হবে! আর `.split(" ")` না দিয়ে `.split(/\\s+/)` দিলে একাধিক স্পেস বা নিউলাইনেও ভাঙা সহজ হয়।',
        everydayExample:
          'ক্রেডিট কার্ডে খোদাই করা অক্ষর (`string`) মুছে বদলানো যায় না—নতুন কার্ড প্রিন্ট করতে অক্ষরগুলো একসাথে অ্যারেতে রেখে `parts.join("")` করতে হয়।',
        keyTakeaways: [
          '`s.toLowerCase()` ও `s.trim()` নতুন স্ট্রিং ফেরত দেয়, তাই `s = s.trim().toLowerCase()` লিখতে হয়।',
          '`s.charCodeAt(i) - 97` ব্যবহার করে ২৬ ঘরের ফ্রিকোয়েন্সি অ্যারেতে `O(N)` অ্যানাগ্রাম চেক করা যায়।',
          'অ্যারের ভেতর অক্ষর জমিয়ে `parts.join("")` করলে লুপের ভেতরে `O(N^2)` কপি এড়ানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-14-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Case-Insensitive Two-Pointer Palindrome Check',
        englishParagraphs: [
          'Assign `const s = "RaceCar".toLowerCase()` so both sides compare cleanly in lowercase.',
          'Two opposing indices verify symmetry in `O(1)` extra space.',
        ],
        banglaParagraphs: [
          '`"RaceCar".toLowerCase()` দিয়ে সব অক্ষর ছোট হাতে এনে দুই প্রান্ত থেকে `l < r` তুলনা করা হয়েছে।',
          'যেকোনো অমিল পেলেই `break` দিয়ে বেরিয়ে যায়।',
        ],
        memoryDiagram: `"RaceCar" -> "racecar" -> PALINDROME`,
        code: `const s = "RaceCar".toLowerCase();
let l = 0, r = s.length - 1;
let ok = true;
while (l < r) {
  if (s[l++] !== s[r--]) { ok = false; break; }
}
console.log(s + " -> " + (ok ? "PALINDROME" : "NO"));`,
        stdin: '',
        expectedOutput: 'racecar -> PALINDROME',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'const s = "RaceCar".toLowerCase();', whatItMeans: 'Creates normalized lowercase string.', whyItIsThere: 'String methods never mutate in place.', ifDeletedError: 's undefined.' },
        ],
      },
      {
        id: 'js-ch-14-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(N) Anagram Checker Using charCodeAt(i) - 97',
        englishParagraphs: [
          'Parse both strings cleanly, guard unequal lengths, and balance a 26-slot zero-filled array.',
          '`freq.every((c) => c === 0)` confirms identical multiset of letters.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে দুটি শব্দ পড়ে দৈর্ঘ্য সমান হলে ২৬ ঘরের অ্যারেতে `+1` ও `-1` করে `O(N)` সময়ে অ্যানাগ্রাম দেখা হয়েছে।',
          'সব ঘর `0` হলে তবেই `YES` প্রিন্ট হয়।',
        ],
        memoryDiagram: `"listen" +1 / "silent" -1 -> every(0) => YES`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
if (a.length !== b.length) {
  console.log("NO");
} else {
  const freq = new Array(26).fill(0);
  for (let i = 0; i < a.length; i++) {
    freq[a.charCodeAt(i) - 97]++;
    freq[b.charCodeAt(i) - 97]--;
  }
  console.log(freq.every((c) => c === 0) ? "YES" : "NO");
}`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'freq[a.charCodeAt(i) - 97]++;', whatItMeans: 'Maps lowercase ASCII character code into 0..25 index.', whyItIsThere: 'O(N) counting beats O(N log N) split().sort().', ifDeletedError: 'freq remains 0.' },
        ],
      },
      {
        id: 'js-ch-14-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Run-Length Compression via parts.join("")',
        englishParagraphs: [
          'Groups identical consecutive chars cleanly and buffers pieces inside `parts` before one `.join("")`.',
          'Avoids quadratic string allocations on long inputs.',
        ],
        banglaParagraphs: [
          'একই অক্ষর পরপর কতবার আছে তা গুনে `parts` অ্যারেতে রেখে শেষে `parts.join("")` করা হয়েছে।',
          'এতে জটিলতা পুরোপুরি `O(N)` থাকে।',
        ],
        memoryDiagram: `"aaabbc" -> parts=["a",3,"b",2,"c",1] -> "a3b2c1"`,
        code: `const s = "aaabbc";
const parts = [];
for (let i = 0; i < s.length; ) {
  let j = i;
  while (j < s.length && s[j] === s[i]) j++;
  parts.push(s[i], j - i);
  i = j;
}
console.log(parts.join(""));`,
        stdin: '',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'parts.push(s[i], j - i);', whatItMeans: 'Buffers char and run count in O(1).', whyItIsThere: 'Defers concatenation to single final join.', ifDeletedError: 'Output stays empty.' },
        ],
      },
      {
        id: 'js-ch-14-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Discarded Return Value & Mutation Trap vs Array Conversion',
        englishParagraphs: [
          'Calling `s.trim()` without reassigning `s = s.trim()` leaves original whitespace untouched!',
          'Converting to `const chars = s.split("")` enables index swaps cleanly before `.join("")`.',
        ],
        banglaParagraphs: [
          'কেবল `s.trim()` লিখলে `s` বদলায় না, `s = s.trim()` লিখতে হয়!',
          'অক্ষর অদলবদল করতে `s.split("")` দিয়ে অ্যারে বানিয়ে নিতে হয়।',
        ],
        memoryDiagram: `s.trim() ignored | clean = s.trim().toLowerCase()`,
        code: `const raw = "  Argon  ";
const chars = raw.trim().toLowerCase().split("");
chars[0] = chars[0].toUpperCase();
console.log(chars.join(""));`,
        stdin: '',
        expectedOutput: 'Argon',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const chars = raw.trim().toLowerCase().split("");', whatItMeans: 'Cleans whitespace, lowercases, and splits into mutable array.', whyItIsThere: 'Allows chars[0] mutation unlike immutable strings.', ifDeletedError: 'Direct raw[0] mutation silently fails.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'const s = "RaceCar".toLowerCase();', whatItMeans: 'Captures normalized lowercase string copy.', whyItIsThere: 'Allows case-insensitive comparison.', ifDeletedError: 's undeclared.' },
      { lineNumber: 'Line 2', codeSnippet: 'let l = 0, r = s.length - 1;', whatItMeans: 'Sets opposing index pointers.', whyItIsThere: 'Compares symmetric ends in O(1) space.', ifDeletedError: 'Pointers missing.' },
      { lineNumber: 'Line 5', codeSnippet: 'if (s[l++] !== s[r--]) { ok = false; break; }', whatItMeans: 'Checks mirror chars and moves both pointers inward.', whyItIsThere: 'Halts immediately on first mismatch.', ifDeletedError: 'Always outputs PALINDROME.' },
    ],
    dryRunTable: [
      { step: 1, state: 'toLowerCase()', memoryOrStack: 's="racecar"', note: 'New string allocated' },
      { step: 2, state: 'l=0, r=6', memoryOrStack: '"r" === "r"', note: 'l=1, r=5' },
      { step: 3, state: 'l=1..2', memoryOrStack: '"a"==="a", "c"==="c"', note: 'l=3, r=3' },
      { step: 4, state: 'done', memoryOrStack: 'ok=true', note: 'Outputs racecar -> PALINDROME' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Trying s[0] = "A" Directly on Immutable String', brokenCode: `let s = "argon"; s[0] = "A"; // Fails silently / TypeError!`, fixedCode: `const chars = s.split(""); chars[0] = "A"; s = chars.join("");`, whyItBreaks: 'JavaScript primitive strings are immutable.' },
      { title: 'Trap 2: Forgetting to Reassign .toLowerCase() / .trim()', brokenCode: `let s = "  HI  "; s.trim(); console.log(s); // Still "  HI  "!`, fixedCode: `s = s.trim().toLowerCase();`, whyItBreaks: 'String transformation methods always return a brand-new string.' },
      { title: 'Trap 3: Breaking Spaces With .split(" ")', brokenCode: `"a  b".split(" ") // ["a", "", "b"]!`, fixedCode: `"a  b".trim().split(/\\s+/) // ["a", "b"]`, whyItBreaks: 'Literal " " does not collapse consecutive whitespace characters.' },
    ],
    practiceSheet: [
      { id: 'js-ch14-p1', difficulty: 'Easy', title: 'Reverse Word Cleanly', prompt: 'Read a single word from stdin and print it reversed.', banglaHint: '`.split("").reverse().join("")` ব্যবহার করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconsole.log(raw.trim().split("").reverse().join(""));`, sampleStdin: 'argon', expectedOutput: 'nogra' },
      { id: 'js-ch14-p2', difficulty: 'Easy', title: 'Count Vowels in Line', prompt: 'Read a line of text and print count of vowels (`a, e, i, o, u`).', banglaHint: '`.toLowerCase()` করে প্রতিটি অক্ষর `"aeiou".includes(c)` দিয়ে দেখো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nlet c = 0; for (const ch of raw.trim().toLowerCase()) if ("aeiou".includes(ch)) c++;\nconsole.log(c);`, sampleStdin: 'Hello Argon', expectedOutput: '4' },
      { id: 'js-ch14-p3', difficulty: 'Medium', title: 'Anagram Check (26-Bucket)', prompt: 'Read two lowercase strings and print `YES` if anagrams else `NO`.', banglaHint: '`charCodeAt(i) - 97` দিয়ে ২৬ ঘরের কাউন্ট মেলাও।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/);\nif (a.length !== b.length) console.log("NO");\nelse { const f = new Array(26).fill(0); for (let i = 0; i < a.length; i++) { f[a.charCodeAt(i) - 97]++; f[b.charCodeAt(i) - 97]--; } console.log(f.every((x) => x === 0) ? "YES" : "NO"); }`, sampleStdin: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'js-ch14-p4', difficulty: 'Medium', title: 'Run-Length String Compression', prompt: 'Compress consecutive identical chars (`aaabbc` -> `a3b2c1`).', banglaHint: '`parts.push(s[i], j - i)` রেখে শেষে `parts.join("")` করো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim(), p = [];\nfor (let i = 0; i < s.length; ) { let j = i; while (j < s.length && s[j] === s[i]) j++; p.push(s[i], j - i); i = j; }\nconsole.log(p.join(""));`, sampleStdin: 'aaabbc', expectedOutput: 'a3b2c1' },
      { id: 'js-ch14-p5', difficulty: 'Hard', title: 'First Unique Character Index', prompt: 'Print 0-based index of first unique lowercase character (`-1` if none).', banglaHint: 'প্রথম লুপে ২৬ ঘরের ফ্রিকোয়েন্সি ও দ্বিতীয় লুপে প্রথম `freq === 1` খুঁজো।', starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim(), f = new Array(26).fill(0);\nfor (let i = 0; i < s.length; i++) f[s.charCodeAt(i) - 97]++;\nlet ans = -1; for (let i = 0; i < s.length; i++) if (f[s.charCodeAt(i) - 97] === 1) { ans = i; break; }\nconsole.log(ans);`, sampleStdin: 'loveleetcode', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Anagram & Frequency Inspector',
      description: 'Compare two lowercase strings using a 26-bucket charCodeAt array in O(N) time.',
      banglaGoal: '`charCodeAt(i) - 97` ব্যবহার করে `O(N)` সময়ে অ্যানাগ্রাম যাচাই করো।',
      combinesChapters: 'JS Ch 1–14',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
if (a.length !== b.length) {
  console.log("NO");
} else {
  const freq = new Array(26).fill(0);
  for (let i = 0; i < a.length; i++) {
    freq[a.charCodeAt(i) - 97]++;
    freq[b.charCodeAt(i) - 97]--;
  }
  console.log(freq.every((c) => c === 0) ? "YES" : "NO");
}`,
      sampleStdin: 'listen\nsilent',
      expectedOutput: 'YES',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [a, b] = raw.trim().split(/\\s+/);
if (a.length !== b.length) {
  console.log("NO");
} else {
  const freq = new Array(26).fill(0);
  for (let i = 0; i < a.length; i++) {
    freq[a.charCodeAt(i) - 97]++;
    freq[b.charCodeAt(i) - 97]--;
  }
  console.log(freq.every((c) => c === 0) ? "YES" : "NO");
}`,
    sampleStdin: 'listen\nsilent',
    expectedSampleOutput: 'YES',
    testCases: [
      { id: 'js14-t1', input: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'js14-t2', input: 'rat\ncar', expectedOutput: 'NO', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Recursion & Call Stack Visualization',
    banglaTitle: 'রিকার্সন ও কল স্ট্যাক ভিজ্যুয়ালাইজেশন (মাইলস্টোন ৩)',
    subtitle: 'Base cases, V8 stack frames, memoized branching, and backtracking trees',
    zeroIntuition: {
      plainEnglishStory:
        'Recursion happens when a JavaScript function breaks a problem down into a smaller copy of itself and pushes a fresh execution context onto the V8 call stack. Each call pauses at the exact recursive line, keeps its own private lexical environment (parameters and local `const`/`let` bindings), and waits until the nested call returns a value before resuming.\n\nEvery valid recursive function rests on two pillars: a base case that returns immediately without recursing, and a strictly smaller recursive step that moves toward that base case. In Node.js and browsers, the V8 call stack usually caps around 10,000 frames, so deep linear recursion throws RangeError: Maximum call stack size exceeded unless you convert it to iteration or use memoization for overlapping subproblems.',
      asciiFlowchart:
        'fact(3)\n  |-- pushes frame(n=3) -> waits for fact(2)\n        |-- pushes frame(n=2) -> waits for fact(1)\n              |-- pushes frame(n=1) -> returns 1 (Base Case)\n        |-- resumes frame(n=2): 2 * 1 -> returns 2\n  |-- resumes frame(n=3): 3 * 2 -> returns 6',
      pseudocode: ["function solve(state):","if isBaseCase(state): return baseValue","smaller = reduce(state)","return combine(state, solve(smaller))"],
      banglaZeroToHero: {
        analogyTitle: 'রিকার্সন হলো একের ভেতর আরেকটি টিফিন বক্স খোলা ও বন্ধ করা',
        explanation:
          'রিকার্সনকে ভাবতে পারো একটার ভেতর আরেকটা রাখা পাঁচটি টিফিন বক্সের মতো, যেখানে সবচেয়ে ভেতরের বক্সে একটি চাবি লুকানো আছে। তুমি প্রথম বক্স খুলে দ্বিতীয়টি পাও, দ্বিতীয়টি খুলে তৃতীয়টি পাও, এভাবে সবচেয়ে ছোট বক্সে পৌঁছানো পর্যন্ত থামো না। জাভাস্ক্রিপ্টের V8 ইঞ্জিন প্রতিটি ফাংশন কলকে কল স্ট্যাক নামের একটি স্তূপের ওপরে রাখে এবং ভেতরের কল শেষ না হওয়া পর্যন্ত বাইরের ফাংশনটি অপেক্ষা করে। প্রতিটি ফ্রেমে নিজস্ব প্যারামিটার ও লোকাল ভ্যারিয়েবল আলাদাভাবে সংরক্ষিত থাকে, তাই এক লেভেলের মান অন্য লেভেলের মানকে নষ্ট করে না। সবচেয়ে ছোট বক্সে পৌঁছালে যে শর্তে আর ভেতরে যাওয়ার দরকার হয় না, তাকেই বেস কেস বলে এবং এখান থেকেই উত্তর ওপরের দিকে ফিরতে শুরু করে। বেস কেস না থাকলে বা ইনপুট ছোট না হলে ফাংশন অনন্তকাল নিজেকে ডাকতে থাকে এবং স্ট্যাক ভরে গিয়ে Maximum call stack size exceeded এরর দেয়। ফিবোনাচ্চির মতো সমস্যায় একই মান বারবার হিসাব না করে Map বা অ্যারেতে সেভ করে রাখাকে মেমোইজেশন বলে। ব্যাকট্র্যাকিংয়ে আমরা একটি সিদ্ধান্ত নিই, রিকার্সিভভাবে নিচে যাই, এবং ফিরে এসে সেই সিদ্ধান্ত ফিরিয়ে নিয়ে অন্য পথ পরীক্ষা করি। অ্যারে, প্রিফিক্স এবং স্ট্রিংয়ের ওপর ভিত্তি করে রিকার্সন শিখলে ট্রি, গ্রাফ এবং ডাইনামিক প্রোগ্রামিং একদম সহজ হয়ে যায়। এই অধ্যায়ে তুমি কল স্ট্যাকের প্রতিটি ধাপ চোখে দেখে বুঝতে পারবে এবং ফেজ ৩-এর সব টপিক একত্রে ব্যবহার করবে।',
        everydayExample: 'একটি বড় পেঁয়াজের খোসা ছাড়াতে ছাড়াতে কেন্দ্রে পৌঁছানো, অথবা ফাইলের ফোল্ডারের ভেতরে সাব-ফোল্ডার খুঁজে শেষ ফাইল পর্যন্ত যাওয়া।',
        keyTakeaways: [
          'বেস কেস (Base Case) ছাড়া রিকার্সন লিখলে কল স্ট্যাক উপচে RangeError হয়।',
          'মেমোইজেশন ওভারল্যাপিং সাবপ্রবলেমের টাইম কমপ্লেক্সিটি O(2^n) থেকে O(n)-এ নামিয়ে আনে।',
          'ব্যাকট্র্যাকিং মানে এগিয়ে যাওয়া, গভীর থেকে উত্তর আনা, এবং ফিরে এসে স্টেট রিসেট করা।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch15-t1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Call Stack Trace for Recursive Sum',
        englishParagraphs: [
          'Before computing complex trees, trace how a single recursive function winds down to `n === 0` and unwinds back up. Notice how every `console.log` before the recursive call prints going down, while every line after runs in reverse order during unwinding.',
        ],
        banglaParagraphs: [
          'প্রথমে সরল রিকার্সিভ যোগফলের মাধ্যমে কল স্ট্যাকে নামা এবং ফেরার ক্রমটি দেখো। রিকার্সিভ কলের আগের লাইনগুলো ওপর থেকে নিচে চলে এবং পরের লাইনগুলো নিচ থেকে ওপরে ফেরার সময় চলে।',
        ],
        memoryDiagram: 'Stack Top: sum(1) -> sum(2) -> sum(3) -> global',
        code: `function sumUpTo(n) {\n  if (n <= 0) return 0;\n  console.log('enter ' + n);\n  const sub = sumUpTo(n - 1);\n  const total = n + sub;\n  console.log('exit ' + n + ' => ' + total);\n  return total;\n}\nconsole.log('ans=' + sumUpTo(3));`,
        stdin: '',
        expectedOutput: 'enter 3\nenter 2\nenter 1\nexit 1 => 1\nexit 2 => 3\nexit 3 => 6\nans=6',
        lineByLine: [
          {"lineNumber":"Line 1","codeSnippet":"function sumUpTo(n) {","whatItMeans":"Declares recursive helper receiving current frame value `n`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"ReferenceError when calling `sumUpTo`."},
          {"lineNumber":"Line 2","codeSnippet":"  if (n <= 0) return 0;","whatItMeans":"Base case halts recursion and starts unwinding.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Infinite recursion throws Maximum call stack size exceeded."},
          {"lineNumber":"Line 4","codeSnippet":"  const sub = sumUpTo(n - 1);","whatItMeans":"Pauses current frame and pushes smaller subproblem onto V8 stack.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"No recursion happens and subproblem sum is missing."},
          {"lineNumber":"Line 5","codeSnippet":"  const total = n + sub;","whatItMeans":"Combines current `n` with returned value once child frame finishes.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cannot compute cumulative total."},
        ],
      },
      {
        id: 'js-ch15-t2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Recursive Binary Search on Sorted Input',
        englishParagraphs: [
          'Binary search cuts the search window in half each stack frame, keeping stack depth at `O(log n)`—at most ~30 frames even for a billion elements.',
        ],
        banglaParagraphs: [
          'সর্টেড অ্যারেতে রিকার্সিভ বাইনারি সার্চ প্রতি ধাপে সার্চ রেঞ্জ অর্ধেক করে ফেলে, ফলে স্ট্যাকের গভীরতা মাত্র O(log n) থাকে।',
        ],
        memoryDiagram: 'bsearch(arr, 0, 4, 20) -> mid=2 -> returns 2',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0];\nconst arr = nums.slice(1, 1 + n);\nconst target = nums[1 + n];\nfunction bsearch(lo, hi) {\n  if (lo > hi) return -1;\n  const mid = lo + Math.trunc((hi - lo) / 2);\n  if (arr[mid] === target) return mid;\n  return arr[mid] < target ? bsearch(mid + 1, hi) : bsearch(lo, mid - 1);\n}\nconsole.log(bsearch(0, n - 1));`,
        stdin: '5\n4 9 20 31 45\n20',
        expectedOutput: '2',
        lineByLine: [
          {"lineNumber":"Line 8","codeSnippet":"  if (lo > hi) return -1;","whatItMeans":"Empty window base case when target does not exist.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Infinite calls when target is absent."},
          {"lineNumber":"Line 9","codeSnippet":"  const mid = lo + Math.trunc((hi - lo) / 2);","whatItMeans":"Finds integer midpoint cleanly using Math.trunc.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Fractional index produces `undefined` array access."},
        ],
      },
      {
        id: 'js-ch15-t3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Nested Category Tree Flattener & Path Builder',
        englishParagraphs: [
          'Web apps store menus, folder trees, and JSON comments as nested objects of arbitrary depth. Recursion walks every branch naturally without needing fixed nested loops.',
        ],
        banglaParagraphs: [
          'মেনু, ফোল্ডার বা কমেন্টের মতো যেকোনো গভীরতার নেস্টেড ডাটা ট্রাভার্স করতে ফিক্সড লুপ কাজ করে না; রিকার্সন এখানে সবচেয়ে পরিষ্কার সমাধান দেয়।',
        ],
        memoryDiagram: 'root -> docs -> guide.md (path accumulates per frame)',
        code: `const tree = {\n  name: 'root',\n  children: [\n    { name: 'src', children: [{ name: 'app.js', children: [] }] },\n    { name: 'README.md', children: [] },\n  ],\n};\nconst paths = [];\nfunction walk(node, prefix) {\n  const cur = prefix ? prefix + '/' + node.name : node.name;\n  if (node.children.length === 0) {\n    paths.push(cur);\n    return;\n  }\n  for (const child of node.children) walk(child, cur);\n}\nwalk(tree, '');\nconsole.log(paths.join('\\n'));`,
        stdin: '',
        expectedOutput: 'root/src/app.js\nroot/README.md',
        lineByLine: [
          {"lineNumber":"Line 11","codeSnippet":"  if (node.children.length === 0) {","whatItMeans":"Leaf node condition records complete path string.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Leaves are never added to `paths`."},
          {"lineNumber":"Line 15","codeSnippet":"  for (const child of node.children) walk(child, cur);","whatItMeans":"Visits every branch while passing current immutable path string.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Nested children remain unvisited."},
        ],
      },
      {
        id: 'js-ch15-t4',
        badge: 'Example 4: Bug Trap vs. CP/Production Pattern',
        title: 'Exponential Naive Fibonacci vs. Memoized DP',
        englishParagraphs: [
          'Naive `fib(n - 1) + fib(n - 2)` recalculates the same branches exponentially (`O(2^n)`). Caching solved states in a `Map` or `Array` turns the recursion tree into a linear `O(n)` DAG.',
        ],
        banglaParagraphs: [
          'সাধারণ রিকার্সিভ ফিবোনাচ্চি একই মান কোটিবার হিসাব করে টাইম লিমিট এক্সিড করে। Memoization টেবিল ব্যবহার করলে প্রতিটি সাবপ্রবলেম মাত্র একবার হিসাব হয়।',
        ],
        memoryDiagram: 'memo[k] stores fib(k) once; shared across all branches',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst memo = new Array(n + 1).fill(-1);\nfunction fib(k) {\n  if (k <= 1) return k;\n  if (memo[k] !== -1) return memo[k];\n  memo[k] = fib(k - 1) + fib(k - 2);\n  return memo[k];\n}\nconsole.log(fib(n));`,
        stdin: '40',
        expectedOutput: '102334155',
        lineByLine: [
          {"lineNumber":"Line 4","codeSnippet":"const memo = new Array(n + 1).fill(-1);","whatItMeans":"Pre-allocates cache initialized with sentinel `-1`.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Repeated calls blow up to O(2^n) runtime."},
          {"lineNumber":"Line 7","codeSnippet":"  if (memo[k] !== -1) return memo[k];","whatItMeans":"Returns cached value immediately in O(1) time.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Cache is never read even if written."},
        ],
      },
    ],
    lineByLineAnatomy: [
      {"lineNumber":"Line 1","codeSnippet":"function sumUpTo(n) {","whatItMeans":"Creates a new frame boundary per invocation.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"SyntaxError/ReferenceError."},
      {"lineNumber":"Line 2","codeSnippet":"  if (n <= 0) return 0;","whatItMeans":"Base case stops downward recursion cleanly.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Stack overflow crash."},
      {"lineNumber":"Line 4","codeSnippet":"  const sub = sumUpTo(n - 1);","whatItMeans":"Shrinks argument toward base case before combining.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Does not recurse."},
      {"lineNumber":"Line 5","codeSnippet":"  const total = n + sub;","whatItMeans":"Computes parent result after child returns.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Missing accumulation step."},
      {"lineNumber":"Line 7","codeSnippet":"  return total;","whatItMeans":"Sends computed sum up to caller frame.","whyItIsThere":"Core execution step in this pattern.","ifDeletedError":"Caller receives `undefined`, yielding `NaN`."},
    ],
    dryRunTable: [
      { step: 1, state: 'sumUpTo(3)', memoryOrStack: '[f(3)]', note: 'Prints enter 3; pauses at sumUpTo(2)' },
      { step: 2, state: 'sumUpTo(2)', memoryOrStack: '[f(3), f(2)]', note: 'Prints enter 2; pauses at sumUpTo(1)' },
      { step: 3, state: 'sumUpTo(0)', memoryOrStack: '[f(3), f(2), f(1), f(0)]', note: 'Base case returns 0 immediately' },
      { step: 4, state: 'Unwind f(1)->f(3)', memoryOrStack: '[]', note: 'Exits 1=>1, 2=>3, 3=>6 in reverse stack order' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Mutating Shared Reference Without Backtracking Pop',
        brokenCode: 'function gen(i, cur) {\n  if (i === 2) { res.push(cur); return; }\n  cur.push(i); gen(i + 1, cur);\n}',
        fixedCode: 'function gen(i, cur) {\n  if (i === 2) { res.push([...cur]); return; }\n  cur.push(i); gen(i + 1, cur); cur.pop();\n}',
        whyItBreaks: 'Pushing `cur` by reference without `[...cur]` and `cur.pop()` leaks mutations across every branch.',
      },
      {
        title: 'Trap 2: Decrementing `n--` Instead of `n - 1`',
        brokenCode: 'function count(n) { if (n > 0) count(n--); }',
        fixedCode: 'function count(n) { if (n > 0) count(n - 1); }',
        whyItBreaks: 'Post-decrement `n--` passes the unchanged `n` forever and triggers infinite stack overflow.',
      },
      {
        title: 'Trap 3: Missing `return` Before Recursive Call',
        brokenCode: 'function find(i) { if (i === 3) return 99; find(i + 1); }',
        fixedCode: 'function find(i) { if (i === 3) return 99; return find(i + 1); }',
        whyItBreaks: 'Without `return`, outer frames discard the base-case result and return `undefined`.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch15-p1',
        difficulty: 'Easy',
        title: 'Recursive Power (Fast Exponentiation)',
        prompt: 'Given base `a` and non-negative integer `b`, compute `a^b` modulo 1000000007 using O(log b) binary exponentiation.',
        banglaHint: 'b জোড় হলে half = modPow(a, b/2) বের করে (half * half) % MOD রিটার্ন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/).map(BigInt);\nconst MOD = 1000000007n;\nfunction modPow(base, exp) {\n  if (exp === 0n) return 1n;\n  const half = modPow(base, exp / 2n);\n  let ans = (half * half) % MOD;\n  if (exp % 2n === 1n) ans = (ans * (base % MOD)) % MOD;\n  return ans;\n}\nconsole.log(modPow(a, b).toString());`,
        sampleStdin: '2 10',
        expectedOutput: '1024',
      },
      {
        id: 'js-ch15-p2',
        difficulty: 'Easy',
        title: 'Recursive Palindrome Check',
        prompt: 'Check recursively whether a trimmed string `s` is a palindrome (`YES` or `NO`).',
        banglaHint: 'দুই প্রান্ত l এবং r সমান না হলে NO, আর l >= r হলে YES রিটার্ন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim();\nfunction isPal(l, r) {\n  if (l >= r) return true;\n  if (s[l] !== s[r]) return false;\n  return isPal(l + 1, r - 1);\n}\nconsole.log(isPal(0, s.length - 1) ? 'YES' : 'NO');`,
        sampleStdin: 'madam',
        expectedOutput: 'YES',
      },
      {
        id: 'js-ch15-p3',
        difficulty: 'Medium',
        title: 'All Balanced Parentheses Generator',
        prompt: 'Given `n` (`1 <= n <= 5`), print all valid strings of `n` pairs of parentheses in lexicographical order (`(` before `)`).',
        banglaHint: 'open < n হলে "(" যোগ করো, আর close < open হলে ")" যোগ করে রিকার্সন চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst out = [];\nfunction gen(open, close, cur) {\n  if (cur.length === 2 * n) { out.push(cur); return; }\n  if (open < n) gen(open + 1, close, cur + '(');\n  if (close < open) gen(open, close + 1, cur + ')');\n}\ngen(0, 0, '');\nconsole.log(out.join('\\n'));`,
        sampleStdin: '2',
        expectedOutput: '(())\n()()',
      },
      {
        id: 'js-ch15-p4',
        difficulty: 'Medium',
        title: 'Subset Sum Count via Recursion + Memoization',
        prompt: 'Given `n`, target `k`, and `n` integers, count how many subsets sum to `k`.',
        banglaHint: 'প্রতিটি এলিমেন্ট হয় নাও অথবা বাদ দাও; "i,rem" কী ব্যবহার করে Map-এ মেমো রাখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1];\nconst arr = nums.slice(2, 2 + n);\nconst memo = new Map();\nfunction ways(i, rem) {\n  if (rem === 0) return 1;\n  if (rem < 0 || i === n) return 0;\n  const key = i + ',' + rem;\n  if (memo.has(key)) return memo.get(key);\n  const ans = ways(i + 1, rem) + ways(i + 1, rem - arr[i]);\n  memo.set(key, ans);\n  return ans;\n}\nconsole.log(ways(0, k));`,
        sampleStdin: '4 5\n1 2 3 4',
        expectedOutput: '2',
      },
      {
        id: 'js-ch15-p5',
        difficulty: 'Hard',
        title: 'N-Queens Valid Board Counter',
        prompt: 'Given `n` (`1 <= n <= 10`), print the number of distinct ways to place `n` non-attacking queens on an `n x n` chessboard.',
        banglaHint: 'কলাম, মূল কর্ণ (r - c + n) এবং বিপরীত কর্ণ (r + c) এর জন্য তিনটি boolean অ্যারে ট্র্যাক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nconst col = new Array(n).fill(false);\nconst d1 = new Array(2 * n).fill(false);\nconst d2 = new Array(2 * n).fill(false);\nlet ways = 0;\nfunction solve(r) {\n  if (r === n) { ways++; return; }\n  for (let c = 0; c < n; c++) {\n    if (col[c] || d1[r - c + n] || d2[r + c]) continue;\n    col[c] = d1[r - c + n] = d2[r + c] = true;\n    solve(r + 1);\n    col[c] = d1[r - c + n] = d2[r + c] = false;\n  }\n}\nsolve(0);\nconsole.log(ways);`,
        sampleStdin: '4',
        expectedOutput: '2',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Recursive Subarray Target & String Validator Engine',
      description: 'Combine Phase 3 mastery—arrays, two pointers, prefix sums, string cleaning, and recursive backtracking—to check if normalized words are palindromes and recursively find all sorted pair combinations summing to target `T`.',
      banglaGoal: 'ফেজ ৩-এর অ্যারে, টু-পয়েন্টার, প্রিফিক্স সাম, স্ট্রিং ও রিকার্সন মিলিয়ে একটি প্যালিনড্রোম + টার্গেট কম্বিনেশন ইঞ্জিন তৈরি করো।',
      combinesChapters: "Ch 11, 12, 13, 14, 15",
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines = raw.trim().split(/\\r?\\n/);\nconst word = lines[0].toLowerCase().replace(/[^a-z0-9]/g, '');\nconst [n, target] = lines[1].trim().split(/\\s+/).map(Number);\nconst arr = lines[2].trim().split(/\\s+/).map(Number);\narr.sort((a, b) => a - b);\nfunction isPal(l, r) {\n  if (l >= r) return true;\n  return word[l] === word[r] && isPal(l + 1, r - 1);\n}\nlet count = 0;\nfunction countSubsets(i, rem) {\n  if (rem === 0) { count++; return; }\n  if (rem < 0 || i === n) return;\n  countSubsets(i + 1, rem - arr[i]);\n  let next = i + 1;\n  while (next < n && arr[next] === arr[i]) next++;\n  countSubsets(next, rem);\n}\ncountSubsets(0, target);\nconsole.log((isPal(0, word.length - 1) ? 'PAL' : 'NOT_PAL') + ' ' + count);`,
      sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
      expectedOutput: 'PAL 3',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines = raw.trim().split(/\\r?\\n/);\nconst word = lines[0].toLowerCase().replace(/[^a-z0-9]/g, '');\nconst [n, target] = lines[1].trim().split(/\\s+/).map(Number);\nconst arr = lines[2].trim().split(/\\s+/).map(Number);\narr.sort((a, b) => a - b);\nfunction isPal(l, r) {\n  if (l >= r) return true;\n  return word[l] === word[r] && isPal(l + 1, r - 1);\n}\nlet count = 0;\nfunction countSubsets(i, rem) {\n  if (rem === 0) { count++; return; }\n  if (rem < 0 || i === n) return;\n  countSubsets(i + 1, rem - arr[i]);\n  let next = i + 1;\n  while (next < n && arr[next] === arr[i]) next++;\n  countSubsets(next, rem);\n}\ncountSubsets(0, target);\nconsole.log((isPal(0, word.length - 1) ? 'PAL' : 'NOT_PAL') + ' ' + count);`,
    sampleStdin: 'RaceCar!\n5 6\n1 2 3 4 5',
    expectedSampleOutput: 'PAL 3',
    testCases: [
      { id: 'js15-t1', input: 'RaceCar!\n5 6\n1 2 3 4 5', expectedOutput: 'PAL 3' },
      { id: 'js15-t2', input: 'Hello\n4 5\n1 1 3 4', expectedOutput: 'NOT_PAL 2', isHidden: true },
    ],
  },
};

