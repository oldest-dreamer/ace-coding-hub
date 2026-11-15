import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_JS_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'JavaScript Chapter 21: Sorting Comparators & Binary Search on Answer',
    banglaTitle: 'JavaScript অধ্যায় ২১: কাস্টম সর্টিং ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Master numeric comparators, O(log n) lowerBound/upperBound binary search, and monotonic Binary Search on Answer.',
    zeroIntuition: {
      plainEnglishStory:
        'Using arr.indexOf(x) or .includes(x) in a loop degrades to O(n*q) TLE on large datasets. Sorting once with an explicit numeric comparator (a, b) => a - b runs in O(n log n), unlocking O(log n) lowerBound and upperBound queries.\n\nBinary Search on Answer halving works over any monotonic decision range [lo, hi]—checking each midpoint mid = Math.trunc((lo + hi) / 2) with an O(n) greedy predicate to isolate the minimum valid capacity or threshold.',
      asciiFlowchart: `  feasible(mid): [ false, false, false, TRUE, TRUE, TRUE ]
                      lo                  ^mid       hi
  if (feasible(mid)) { ans = mid; hi = mid - 1; } else { lo = mid + 1; }`,
      pseudocode: [
        '1. SORT numeric array with explicit (a, b) => a - b comparator',
        '2. WRITE lowerBound / upperBound using Math.trunc((lo + hi) / 2)',
        '3. DEFINE greedy O(n) predicate canShip(weights, days, cap)',
        '4. HALVE interval [lo, hi] saving valid ans before shrinking range',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নির্ভুল সর্টিং ও বাইনারি সার্চ অন আনসার (Binary Search)',
        explanation:
          'JavaScript-এ সংখ্যার অ্যারেতে কোনো কিছু খুঁজতে গেলে ভুলেও .sort() ফাঁকা রাখবে না—কারণ JS ডিফল্টভাবে সংখ্যাকেও বর্ণানুক্রমিক স্ট্রিং হিসেবে সাজায়, ফলে 10 চলে আসে 2-এর আগে! সবসময় (a, b) => a - b লিখে সংখ্যা সাজাতে হয়। একবার সাজানো হয়ে গেলে Binary Search চালিয়ে ১০ লাখ ডেটার মধ্য থেকে মাত্র ২০ ধাপে উত্তর বের করা যায়। আর Binary Search on Answer হলো আরও এক ধাপ এগিয়ে থাকা কৌশল: যখন সরাসরি কোনো অ্যারে না থেকে প্রশ্ন থাকে "সর্বনিম্ন কত ক্ষমতায় D দিনে সব কাজ শেষ হবে", তখন সম্ভাব্য উত্তরের সীমা [lo, hi]-এর ওপর বাইনারি সার্চ চালানো হয়। মনে রাখবে JavaScript-এ সব সংখ্যা float64, তাই (lo + hi) / 2 দশমিক সংখ্যা দেয়; অ্যারে ইনডেক্স বা পূর্ণসংখ্যার মধ্যবিন্দু নিতে অবশ্যই Math.trunc((lo + hi) / 2) ব্যবহার করবে।',
        everydayExample: 'ভলিউম নব মাঝখানে এনে টেস্ট করা: বেশি হলে অর্ধেক কমানো, কম হলে অর্ধেক বাড়ানো।',
        keyTakeaways: [
          'সংখ্যার সর্টিংয়ে সবসময় .sort((a, b) => a - b) লিখবে।',
          'JS-এ (lo + hi) / 2 ভগ্নাংশ দেয়; সবসময় Math.trunc((lo + hi) / 2) বা ((lo + hi) >> 1) লাগবে।',
          'Binary Search on Answer-এ সম্ভাব্য উত্তর ans আলাদা রেখে তবেই hi বা lo আপডেট করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'lowerBound & upperBound Frequency Count',
        englishParagraphs: [
          'Sort numerically first, then compute lowerBound (>= x) and upperBound (> x) in O(log n).',
        ],
        banglaParagraphs: [
          'সংখ্যা সর্ট করে lowerBound ও upperBound দিয়ে O(log n) সময়ে শুরুর ইনডেক্স ও ফ্রিকোয়েন্সি বের করো।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> lb(5)=1, ub(5)=4 -> count=3`,
        code: `function lowerBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = Math.trunc((lo + hi) / 2);
    if (a[mid] >= x) hi = mid; else lo = mid + 1;
  }
  return lo;
}
function upperBound(a, x) {
  let lo = 0, hi = a.length;
  while (lo < hi) {
    const mid = Math.trunc((lo + hi) / 2);
    if (a[mid] > x) hi = mid; else lo = mid + 1;
  }
  return lo;
}
const a = [9, 5, 2, 5, 5].sort((x, y) => x - y);
const lo = lowerBound(a, 5), hi = upperBound(a, 5);
console.log(lo + ' ' + (hi - lo));`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'const mid = Math.trunc((lo + hi) / 2);',
            whatItMeans: 'Computes exact integer midpoint in JavaScript.',
            whyItIsThere: 'Prevents floating-point array index undefined bugs.',
            ifDeletedError: 'a[mid] reads undefined for fractional indices.',
          },
          {
            lineNumber: 'Line 17',
            codeSnippet: 'const a = [9, 5, 2, 5, 5].sort((x, y) => x - y);',
            whatItMeans: 'Sorts numbers ascending before binary search.',
            whyItIsThere: 'Default .sort() compares strings lexicographically.',
            ifDeletedError: 'Binary search fails on unsorted order.',
          },
        ],
      },
      {
        id: 'js-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity between max(weights) and sum(weights) using a greedy day counter.',
        ],
        banglaParagraphs: [
          'সর্বোচ্চ ওজন থেকে মোট ওজনের মধ্যে বাইনারি সার্চ চালিয়ে সর্বনিম্ন শিপিং ক্যাপাসিটি বের করো।',
        ],
        memoryDiagram: `lo=5, hi=15 -> ans=6`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0], d = nums[1];
const w = nums.slice(2, 2 + n);
function canShip(cap) {
  let used = 1, cur = 0;
  for (const x of w) {
    if (cur + x > cap) { used++; cur = 0; }
    cur += x;
  }
  return used <= d;
}
let lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;
while (lo <= hi) {
  const mid = Math.trunc((lo + hi) / 2);
  if (canShip(mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;
}
console.log(ans);`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 17',
            codeSnippet: 'if (canShip(mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1;',
            whatItMeans: 'Saves feasible mid and searches strictly smaller capacities.',
            whyItIsThere: 'Converges cleanly to minimum valid shipping capacity.',
            ifDeletedError: 'Binary search loop never shrinks range.',
          },
        ],
      },
      {
        id: 'js-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Greedy Interval Scheduling After End-Time Sort',
        englishParagraphs: [
          'Sort [start, end] pairs by finish time ascending to pick maximum non-overlapping meetings.',
        ],
        banglaParagraphs: [
          'শেষের সময় অনুযায়ী ইভেন্ট সাজিয়ে সর্বাধিক নন-ওভারল্যাপিং স্লট বাছাই করো।',
        ],
        memoryDiagram: `sort((a,b) => a[1] - b[1]) -> greedy start >= lastEnd`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0];
const iv = [];
for (let i = 0; i < n; i++) iv.push([nums[1 + 2 * i], nums[2 + 2 * i]]);
iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
let last = -Infinity, cnt = 0;
for (const [s, e] of iv) if (s >= last) { cnt++; last = e; }
console.log(cnt);`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '2',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'iv.sort((a, b) => a[1] - b[1] || a[0] - b[0]);',
            whatItMeans: 'Orders pairs by end time ascending, breaking ties by start.',
            whyItIsThere: 'Greedy earliest-finish guarantees maximum meeting count.',
            ifDeletedError: 'Wrong order misses valid combinations.',
          },
        ],
      },
      {
        id: 'js-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Math.trunc Midpoint vs. Float Fractional Indexing',
        englishParagraphs: [
          'Omitting Math.trunc produces mid = 2.5, reading undefined from arrays and breaking binary search silently.',
        ],
        banglaParagraphs: [
          'Math.trunc ছাড়া (lo + hi) / 2 দিলে ভগ্নাংশ ইনডেক্সে undefined আসে, তাই অবশ্যই Math.trunc ব্যবহার করো।',
        ],
        memoryDiagram: `(0 + 5) / 2 === 2.5 -> arr[2.5] === undefined!`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const n = Number(raw.trim());
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
            whatItMeans: 'Truncates midpoint toward zero as a true integer.',
            whyItIsThere: 'Avoids fractional loops and keeps 53-bit precision up to 9e15.',
            ifDeletedError: 'm becomes floating-point and loops endlessly.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'function lowerBound(a, x) {',
        whatItMeans: 'Binary search helper finding first index >= x.',
        whyItIsThere: 'Resolves duplicate boundaries cleanly in O(log n).',
        ifDeletedError: 'lowerBound function missing.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'const mid = Math.trunc((lo + hi) / 2);',
        whatItMeans: 'Computes exact integer midpoint in JavaScript.',
        whyItIsThere: 'Prevents floating-point array index undefined bugs.',
        ifDeletedError: 'a[mid] reads undefined for fractional indices.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'if (a[mid] >= x) hi = mid; else lo = mid + 1;',
        whatItMeans: 'Moves right bound to mid when >= x, else shifts lo past mid.',
        whyItIsThere: 'Shrinks interval strictly until lo === hi.',
        ifDeletedError: 'Search fails to narrow toward first duplicate.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'const a = [9, 5, 2, 5, 5].sort((x, y) => x - y);',
        whatItMeans: 'Sorts numbers ascending before binary search.',
        whyItIsThere: 'Default .sort() compares strings lexicographically.',
        ifDeletedError: 'Binary search fails on unsorted order.',
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
        title: 'Using (lo + hi) >> 1 on Values > 2^31',
        brokenCode: `const mid = (lo + hi) >> 1; // wraps negative above 2.14e9!`,
        fixedCode: `const mid = Math.trunc((lo + hi) / 2);`,
        whyItBreaks: 'Bitwise shifts coerce JS numbers into signed 32-bit integers.',
      },
      {
        title: 'Calling .sort() on Numbers Without Comparator',
        brokenCode: `[10, 2, 5].sort()`,
        fixedCode: `[10, 2, 5].sort((a, b) => a - b)`,
        whyItBreaks: 'String comparison puts "10" ahead of "2", corrupting binary search.',
      },
      {
        title: 'Forgetting Math.max(...w) Lower Bound on Capacity Search',
        brokenCode: `let lo = 0;`,
        fixedCode: `let lo = Math.max(...w);`,
        whyItBreaks: 'A capacity smaller than the heaviest box violates single-item feasibility.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-21-p1',
        difficulty: 'Easy',
        title: 'First Index & Frequency Count',
        prompt: 'Read n, x, and n integers; sort numerically and print first index and count (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: lowerBound ও upperBound লিখে ব্যবধান বের করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], x = nums[1], a = nums.slice(2, 2 + n).sort((u, v) => u - v);\nconst lb = (v) => { let l = 0, r = a.length; while (l < r) { const m = Math.trunc((l + r) / 2); if (a[m] >= v) r = m; else l = m + 1; } return l; };\nconst ub = (v) => { let l = 0, r = a.length; while (l < r) { const m = Math.trunc((l + r) / 2); if (a[m] > v) r = m; else l = m + 1; } return l; };\nconst l = lb(x), r = ub(x);\nconsole.log(l === r ? '-1 0' : l + ' ' + (r - l));`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'js-ch-21-p2',
        difficulty: 'Easy',
        title: 'Floor Integer Square Root',
        prompt: 'Find largest integer m with m*m <= n using binary search.',
        banglaHint: 'ইঙ্গিত: Math.trunc((lo + hi) / 2) ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst n = Number(raw.trim());\nlet lo = 0, hi = n, ans = 0;\nwhile (lo <= hi) { const m = Math.trunc((lo + hi) / 2); if (m * m <= n) { ans = m; lo = m + 1; } else hi = m - 1; }\nconsole.log(ans);`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'js-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n piles and h hours, find minimum eating speed k using Math.trunc((x + k - 1) / k).',
        banglaHint: 'ইঙ্গিত: প্রতিটি স্তূপে Math.ceil বা Math.trunc((x + k - 1) / k) সময় যোগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], h = nums[1], p = nums.slice(2, 2 + n);\nlet lo = 1, hi = Math.max(...p), ans = hi;\nwhile (lo <= hi) {\n  const k = Math.trunc((lo + hi) / 2);\n  let hrs = 0;\n  for (const x of p) hrs += Math.trunc((x + k - 1) / k);\n  if (hrs <= h) { ans = k; hi = k - 1; } else lo = k + 1;\n}\nconsole.log(ans);`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Read n [start, end] pairs and print maximum non-overlapping meetings.',
        banglaHint: 'ইঙ্গিত: end সময় অনুযায়ী সর্ট করে গ্রিডিভাবে নির্বাচন করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], iv = [];\nfor (let i = 0; i < n; i++) iv.push([nums[1 + 2 * i], nums[2 + 2 * i]]);\niv.sort((a, b) => a[1] - b[1]);\nlet cur = -Infinity, ans = 0;\nfor (const [s, e] of iv) if (s >= cur) { ans++; cur = e; }\nconsole.log(ans);`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'js-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Min Distance',
        prompt: 'Given n stall coordinates and c cows, print largest minimum distance between any two cows.',
        banglaHint: 'ইঙ্গিত: স্টলগুলো সর্ট করে দূরত্বের ওপর বাইনারি সার্চ চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], c = nums[1], x = nums.slice(2, 2 + n).sort((a, b) => a - b);\nlet lo = 1, hi = x[n - 1] - x[0], ans = 0;\nwhile (lo <= hi) {\n  const mid = Math.trunc((lo + hi) / 2);\n  let placed = 1, last = x[0];\n  for (let i = 1; i < n; i++) if (x[i] - last >= mid) { placed++; last = x[i]; }\n  if (placed >= c) { ans = mid; lo = mid + 1; } else hi = mid - 1;\n}\nconsole.log(ans);`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Find the minimum shipping capacity to deliver ordered weights within D days.',
      banglaGoal: 'Binary Search on Answer দিয়ে সর্বনিম্ন শিপিং ক্যাপাসিটি নির্ণয় করা।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], d = nums[1], w = nums.slice(2, 2 + n);\nfunction canShip(cap) { let u = 1, c = 0; for (const x of w) { if (c + x > cap) { u++; c = 0; } c += x; } return u <= d; }\nlet lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;\nwhile (lo <= hi) { const mid = Math.trunc((lo + hi) / 2); if (canShip(mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1; }\nconsole.log(ans);`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], d = nums[1], w = nums.slice(2, 2 + n);\nfunction canShip(cap) { let u = 1, c = 0; for (const x of w) { if (c + x > cap) { u++; c = 0; } c += x; } return u <= d; }\nlet lo = Math.max(...w), hi = w.reduce((a, b) => a + b, 0), ans = hi;\nwhile (lo <= hi) { const mid = Math.trunc((lo + hi) / 2); if (canShip(mid)) { ans = mid; hi = mid - 1; } else lo = mid + 1; }\nconsole.log(ans);`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'js21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'js21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'JavaScript Chapter 22: Hashing, Map/Set & Sliding Window Frequency',
    banglaTitle: 'JavaScript অধ্যায় ২২: হ্যাশিং, Map/Set ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) Two-Sum, exact-K subarray sums, and longest unique substring cleanly with ES6 Map, Set, and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Scanning earlier elements with nested loops turns O(n) work into O(n^2) timeouts. ES6 Map and Set store hashed entries with O(1) expected lookups and preserve clean separation from Object.prototype keys.\n\nBy storing prefix-sum counts in a Map seeded with 0 => 1, you count exact-K subarrays in linear time even when negative numbers exist; and pairing a sliding window [L..R] with a last-seen Map solves longest-unique-substring cleanly.',
      asciiFlowchart: `  pref += x ---> Map.get(pref - k) ?? 0  (O(1) hash hit!)
       |
       +--> map.set(pref, (map.get(pref) ?? 0) + 1)
       |
  Window [L..R]: last.get(ch) >= L -> L = last.get(ch) + 1`,
      pseudocode: [
        '1. SEED cnt = new Map([[0, 1]]) before scanning array',
        '2. ACCUMULATE running sum pref += x',
        '3. ADD (cnt.get(pref - k) ?? 0) to subarray answer',
        '4. INCREMENT cnt.set(pref, (cnt.get(pref) ?? 0) + 1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ES6 Map লকারবক্স ও চলমান জানালা (Hashing + Sliding Window)',
        explanation:
          'বড় অ্যারে বা স্ট্রিংয়ের ভেতর প্রতিটি উপাদানের জন্য পেছনের সব উপাদান পরীক্ষা করলে O(n^2) সময়ে প্রোগ্রাম আটকে যায়। JavaScript-এর ES6 Map এবং Set হ্যাশিং ব্যবহার করে O(1) সময়ে যেকোনো মান বা যোগফল খুঁজে দেয়। বিশেষ করে Prefix Sum-এর সাথে Map জুড়ে দিলে দারুণ কাজ হয়: শুরুতে cnt.set(0, 1) বসিয়ে রেখে প্রতিটি সংখ্যা যোগ করার পর cnt.get(pref - k) দেখলেই নেগেটিভ সংখ্যা থাকলেও ঠিক K যোগফলের সব সাব-অ্যারে গোনা যায়! আর স্ট্রিংয়ে ডুপ্লিকেট ছাড়া সবচেয়ে বড় অংশ বের করতে L ও R পয়েন্টার দিয়ে Sliding Window চালাতে হয়। মনে রাখবে, Map-এ শূন্য মানও ভ্যালিড হতে পারে, তাই কখনো || 0 না লিখে সবসময় nullish coalescing (?? 0) ব্যবহার করবে।',
        everydayExample: 'স্মার্ট টোল গেট: গাড়ির নম্বরপ্লেট হ্যাশ করে মুহূর্তে জানা আগে এই রাস্তা পার হয়েছে কি না।',
        keyTakeaways: [
          'Prefix Sum হ্যাশে শুরুতে new Map([[0, 1]]) রাখা বাধ্যতামূলক।',
          'Map.get(k) এ মান ০ হলে || 0 ভুল দেয়; সবসময় ?? 0 ব্যবহার করবে।',
          'স্লাইডিং উইন্ডোতে L কেবল সামনের দিকেই এগোবে (L = Math.max(L, prev + 1))।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(n) Two-Sum Using ES6 Map',
        englishParagraphs: [
          'Check if (target - a[i]) is already stored in Map before setting a[i] => i.',
        ],
        banglaParagraphs: [
          'Map-এ মান ও ইনডেক্স রেখে O(n) সময়ে Two-Sum সমাধান করো।',
        ],
        memoryDiagram: `Map { 2 => 0 } -> x=7 checks seen.has(2) -> prints "0 1"`,
        code: `const a = [2, 7, 11, 15];
const target = 9;
const seen = new Map();
for (let i = 0; i < a.length; i++) {
  const need = target - a[i];
  if (seen.has(need)) {
    console.log(seen.get(need) + ' ' + i);
    break;
  }
  seen.set(a[i], i);
}`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if (seen.has(need)) {',
            whatItMeans: 'Checks Map key presence cleanly even when stored index is 0.',
            whyItIsThere: 'Avoids falsy 0 trap of if (seen.get(need)).',
            ifDeletedError: 'Pair match is never detected.',
          },
        ],
      },
      {
        id: 'js-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K Using Prefix Map',
        englishParagraphs: [
          'Seed cnt = new Map([[0, 1]]), track running prefix sum, and accumulate cnt.get(pref - k) ?? 0.',
        ],
        banglaParagraphs: [
          'new Map([[0, 1]]) দিয়ে শুরু করে নেগেটিভ সংখ্যা থাকলেও K-যোগফল সাব-অ্যারে গোনো।',
        ],
        memoryDiagram: `cnt={0=>1} -> pref=1,3,2,3,5 -> ans=3`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0], k = nums[1];
const cnt = new Map([[0, 1]]);
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
            codeSnippet: 'const cnt = new Map([[0, 1]]);',
            whatItMeans: 'Seeds prefix sum 0 count to 1 before loop.',
            whyItIsThere: 'Handles subarrays starting at index 0 cleanly.',
            ifDeletedError: 'Subarrays beginning at index 0 are missed.',
          },
        ],
      },
      {
        id: 'js-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Track each character’s last seen index inside a Map and advance L past duplicates in one pass.',
        ],
        banglaParagraphs: [
          'Map-এ প্রতিটি অক্ষরের শেষ অবস্থান রেখে এক পাসে ডুপ্লিকেটমুক্ত সর্বোচ্চ দৈর্ঘ্য বের করো।',
        ],
        memoryDiagram: `last.get(ch) >= L -> L = last.get(ch) + 1`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const s = raw.trim();
const last = new Map();
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
            whatItMeans: 'Advances left edge only if previous occurrence sits inside window.',
            whyItIsThere: 'Safely handles index 0 (not falsy) and avoids shrinking backward.',
            ifDeletedError: 'Duplicates stay inside active window.',
          },
        ],
      },
      {
        id: 'js-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Index-0 Falsy Trap (seen.get vs. seen.has)',
        englishParagraphs: [
          'Writing if (seen.get(need)) fails whenever need lives at index 0 because 0 is falsy in JavaScript! Always use seen.has().',
        ],
        banglaParagraphs: [
          'if (seen.get(need)) লিখলে ০ ইনডেক্সে থাকা মানকে মিথ্যা ধরে! তাই সবসময় seen.has(need) লিখবে।',
        ],
        memoryDiagram: `seen.get(x) === 0 (FALSY!) vs seen.has(x) === true`,
        code: `const seen = new Map([[4, 0]]);
console.log(Boolean(seen.get(4)) + ' ' + seen.has(4));`,
        stdin: '',
        expectedOutput: 'false true',
        lineByLine: [
          {
            lineNumber: 'Line 2',
            codeSnippet: "console.log(Boolean(seen.get(4)) + ' ' + seen.has(4));",
            whatItMeans: 'Demonstrates 0 coercion trap vs exact Map.has() check.',
            whyItIsThere: 'Prevents classic Two-Sum off-by-one bug at index 0.',
            ifDeletedError: 'No comparison output printed.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'const seen = new Map();',
        whatItMeans: 'Creates O(1) hash map for value -> index.',
        whyItIsThere: 'Avoids nested loop complement search.',
        ifDeletedError: 'seen is undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const need = target - a[i];',
        whatItMeans: 'Computes required partner value.',
        whyItIsThere: 'Converts pair sum into single key lookup.',
        ifDeletedError: 'need variable undefined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'if (seen.has(need)) {',
        whatItMeans: 'Checks Map key presence cleanly even when stored index is 0.',
        whyItIsThere: 'Avoids falsy 0 trap of if (seen.get(need)).',
        ifDeletedError: 'Pair match is never detected.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'seen.set(a[i], i);',
        whatItMeans: 'Stores value index after checking complement.',
        whyItIsThere: 'Prevents element i from matching itself.',
        ifDeletedError: 'Subsequent iterations fail to find a[i].',
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
        title: 'Using if (seen.get(k)) When Index 0 Is Valid',
        brokenCode: `if (seen.get(need)) return [seen.get(need), i];`,
        fixedCode: `if (seen.has(need)) return [seen.get(need), i];`,
        whyItBreaks: 'Index 0 evaluates to false in boolean context, silently skipping matches with the first element.',
      },
      {
        title: 'Using .includes() on an Array Inside a Loop',
        brokenCode: `for (const x of b) if (arrA.includes(x)) cnt++; // O(N^2)`,
        fixedCode: `const setA = new Set(arrA); for (const x of b) if (setA.has(x)) cnt++;`,
        whyItBreaks: 'Array.prototype.includes scans linearly every time.',
      },
      {
        title: 'Using || 0 When Reading Counts or Zero Values',
        brokenCode: `const val = map.get(k) || fallback;`,
        fixedCode: `const val = map.get(k) ?? fallback;`,
        whyItBreaks: 'Valid 0 entries get overwritten by fallback.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Count via Set',
        prompt: 'Read n and n integers; print count of distinct values using Set.',
        banglaHint: 'ইঙ্গিত: new Set(nums.slice(1, 1 + n)).size প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconsole.log(new Set(nums.slice(1, 1 + nums[0])).size);`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices Lookup',
        prompt: 'Read n, target, and n integers; print first 0-based indices i j summing to target.',
        banglaHint: 'ইঙ্গিত: seen.has(t - x) দিয়ে ০ ইনডেক্সও নিরাপদে চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], t = nums[1], seen = new Map();\nfor (let i = 0; i < n; i++) {\n  const x = nums[2 + i];\n  if (seen.has(t - x)) { console.log(seen.get(t - x) + ' ' + i); break; }\n  seen.set(x, i);\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'js-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Unique Substring Length',
        prompt: 'Read a token and print length of longest substring with all unique characters.',
        banglaHint: 'ইঙ্গিত: last Map এ অক্ষরের শেষ ইনডেক্স রেখে L ও R আপডেট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim(), last = new Map();\nlet L = 0, best = 0;\nfor (let R = 0; R < s.length; R++) {\n  const p = last.get(s[R]);\n  if (p !== undefined && p >= L) L = p + 1;\n  last.set(s[R], R); best = Math.max(best, R - L + 1);\n}\nconsole.log(best);`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'js-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Subarray Length',
        prompt: 'Read n, k, and n ints; print longest subarray length containing at most k distinct values.',
        banglaHint: 'ইঙ্গিত: freq.size > k হলে বাম দিকের মান কমিয়ে ০ হলে delete() করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], a = nums.slice(2, 2 + n), freq = new Map();\nlet L = 0, best = 0;\nfor (let R = 0; R < n; R++) {\n  freq.set(a[R], (freq.get(a[R]) ?? 0) + 1);\n  while (freq.size > k) {\n    const c = freq.get(a[L]) - 1;\n    if (c === 0) freq.delete(a[L]); else freq.set(a[L], c);\n    L++;\n  }\n  best = Math.max(best, R - L + 1);\n}\nconsole.log(best);`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'js-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers; print count of subarrays whose sum equals k.',
        banglaHint: 'ইঙ্গিত: new Map([[0, 1]]) রেখে pref - k এর ফ্রিকোয়েন্সি যোগ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Combine running prefix sums with ES6 Map to count exact-K subarrays cleanly in O(n).',
      banglaGoal: 'Prefix Sum ও ES6 Map ব্যবহার করে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনা করা।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], k = nums[1], cnt = new Map([[0, 1]]);\nlet pref = 0, ans = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  pref += nums[i];\n  ans += cnt.get(pref - k) ?? 0;\n  cnt.set(pref, (cnt.get(pref) ?? 0) + 1);\n}\nconsole.log(ans);`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'js22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'js22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'JavaScript Chapter 23 (ES2025): Stacks, Queues, Trees & Graph Traversal (BFS/DFS)',
    banglaTitle: 'JavaScript অধ্যায় ২৩ (ES2025): স্ট্যাক, কিউ, ট্রি ও গ্রাফ ট্রাভার্সাল (BFS/DFS)',
    subtitle: 'LIFO stacks, O(1) head-pointer BFS queues, monotonic stacks, and connected-component DFS without slow Array.shift().',
    zeroIntuition: {
      plainEnglishStory:
        'Stacks (LIFO: Last-In First-Out) handle bracket validation, undo history, and Next Greater Element queries in `O(n)` using an ordinary array with `push()` and `pop()`. Queues (FIFO: First-In First-Out) drive Breadth-First Search (BFS) for shortest paths in unweighted graphs and level-order tree traversals.\n\nA classic JavaScript performance trap is calling `queue.shift()` inside a `10^5`-node BFS loop! `Array.shift()` shifts every remaining element forward in `O(n)` time, turning an `O(V + E)` BFS into `O(V^2)` TLE. Using an array `q` with a moving integer `head` cursor (`const u = q[head++];`) keeps dequeue strictly `O(1)`.',
      asciiFlowchart: `  Stack (LIFO): st.push('['), st.push('(') -> see ')' -> st.pop() === '('
  BFS Queue (O(1) cursor):
    q = [0], head = 0, dist[0] = 0
    u = q[head++] -> push unvisited neighbor v with dist[v] = dist[u] + 1`,
      pseudocode: [
        '1. STACK: push openers; on closer verify st.length > 0 BEFORE comparing st.pop()',
        '2. QUEUE: maintain integer cursor head=0 and read q[head++] instead of q.shift()',
        '3. BFS: set dist[v] = dist[u] + 1 immediately upon enqueueing v so cycles never re-push',
        '4. MONOTONIC STACK: pop smaller elements when a larger bar arrives to answer NGE in O(n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'প্লেটের স্তূপ (Stack), টিকিট লাইন (Queue) ও `shift()` ফাঁদ বর্জন',
        explanation:
          'স্ট্যাক হলো প্লেটের স্তূপ (LIFO — শেষে রাখা জিনিস সবার আগে তোলা হয়), যা দিয়ে ব্র্যাকেট ব্যালান্স চেক, ব্রাউজার ব্যাক বাটন আর নেক্সট গ্রেটার এলিমেন্ট O(n) সময়ে সমাধান হয়। অন্যদিকে কিউ হলো ব্যাংকের কাউন্টার লাইন (FIFO — আগে এলে আগে সার্ভিস), যা গ্রাফের শর্টেস্ট পাথ (BFS) বের করার মূল হাতিয়ার। জাভাস্ক্রিপ্টে নতুনরা প্রায়ই `q.shift()` ব্যবহার করে কিউ থেকে ডেটা বের করে—কিন্তু `shift()` প্রথম ঘর ফাঁকা করে বাকি লাখো উপাদান এক ঘর সামনে টেনে আনে বলে এটি O(n) সময় নেয় এবং পুরো BFS-কে O(n^2) স্লো করে TLE ঘটায়! তাই সবসময় একটি সাধারণ `let head = 0;` ইনডেক্স রেখে `const u = q[head++];` দিয়ে O(1) সময়ে ডিকিউ করবে। এছাড়া BFS চালানোর সময় কিউতে `push` করার মুহূর্তেই `dist[v] = dist[u] + 1` মার্ক করে দিলে গ্রাফে সাইকেল থাকলেও অসীম লুপ হবে না। এই অধ্যায়ে তুমি স্ট্যাক, কিউ, BST ইন-অর্ডার ও গ্রাফ BFS—সবগুলো হাতে-কলমে শিখবে!',
        everydayExample:
          'টিকিট লাইনের শুরু থেকে মানুষ সরাতে `head++` করা মানে কাউন্টারের কর্মচারী সামনে হাঁটা—পুরো লাইন ধাক্কা দিয়ে সরানোর চেয়ে (`shift()`) শতগুণ দ্রুত!',
        keyTakeaways: [
          'BFS কিউতে কখনোই `q.shift()` ব্যবহার করবে না; `let head = 0; q[head++]` সবসময় O(1)।',
          'স্ট্যাক থেকে `pop()` করার আগে সর্বদা `st.length > 0` পরীক্ষা করো।',
          'গ্রাফে visited/distance অ্যারে এনকিউ করার মুহূর্তেই আপডেট করলে ডুপ্লিকেট প্রসেসিং হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Balanced Brackets Validator Using Array Stack',
        englishParagraphs: [
          'Push every opening symbol `(`, `[`, `{` onto `st`. When a closing bracket arrives, check `!st.length` or mismatch against `pairs[st.pop()]`.',
          'At loop end, `ok && st.length === 0` confirms zero unclosed brackets remain.',
        ],
        banglaParagraphs: [
          'ওপেনিং ব্র্যাকেট এলে স্ট্যাকে পুশ করে ক্লোজিং এলে `st.pop()`-এর সাথে পেয়ার মিলিয়ে দেখা হয়েছে।',
          'শেষে স্ট্যাক খালি (`st.length === 0`) হলে তবেই স্ট্রিংটি `VALID`।',
        ],
        memoryDiagram: `"{[()]}" -> push { [ ( -> match ) ] } -> st=[] -> VALID`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const s = raw.trim();
const match = { '(': ')', '[': ']', '{': '}' };
const st = [];
let ok = true;
for (const c of s) {
  if (match[c]) st.push(c);
  else if (!st.length || match[st.pop()] !== c) { ok = false; break; }
}
console.log(ok && st.length === 0 ? 'VALID' : 'INVALID');`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'else if (!st.length || match[st.pop()] !== c) { ok = false; break; }', whatItMeans: 'Rejects stray closing brackets or mismatched top-of-stack.', whyItIsThere: 'Guarantees LIFO nesting order strictly.', ifDeletedError: 'Accepts broken strings like "[(])" or ")".' },
        ],
      },
      {
        id: 'js-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(V + E) Shortest-Path BFS With O(1) Cursor Queue',
        englishParagraphs: [
          'Instead of `q.shift()`, we keep `let head = 0;` and read `const u = q[head++];`.',
          'For each neighbor `v` with `dist[v] === -1`, we set `dist[v] = dist[u] + 1` before pushing `v`.',
        ],
        banglaParagraphs: [
          '`q.shift()` না ডেকে `head++` কার্সার দিয়ে O(1) ডিকিউ করে আনওয়েটেড গ্রাফের শর্টেস্ট দূরত্ব মাপা হয়েছে।',
          'পৌঁছানো না গেলে দূরত্ব `-1` থাকে।',
        ],
        memoryDiagram: `edges: 0-1, 0-2, 1-3 -> dist = [0, 1, 1, 2]`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0], m = nums[1];
const adj = Array.from({ length: n }, () => []);
for (let i = 0; i < m; i++) {
  const u = nums[2 + 2 * i], v = nums[3 + 2 * i];
  adj[u].push(v); adj[v].push(u);
}
const dist = new Array(n).fill(-1);
const q = [0];
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
          { lineNumber: 'Line 13', codeSnippet: 'for (let head = 0; head < q.length; head++) {', whatItMeans: 'Walks FIFO queue using an index cursor instead of mutating array front.', whyItIsThere: 'Eliminates O(n) shift overhead in JavaScript arrays.', ifDeletedError: 'Graph is never traversed.' },
        ],
      },
      {
        id: 'js-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Binary Search Tree Insert & In-Order DFS Traversal',
        englishParagraphs: [
          'Representing tree nodes as plain `{ v, l, r }` objects makes inserting keys and executing `left -> node -> right` DFS effortless.',
          'Collecting visited keys into `out` prints the sorted sequence in ascending order.',
        ],
        banglaParagraphs: [
          'জাভাস্ক্রিপ্ট অবজেক্ট `{ v, l, r }` দিয়ে বাইনারি সার্চ ট্রি বানিয়ে ইন-অর্ডার DFS চালানো হয়েছে।',
          'সব সংখ্যা ছোট থেকে বড় সাজানো অবস্থায় আউটপুট আসে।',
        ],
        memoryDiagram: `[5, 2, 8, 1] -> in-order DFS -> 1 2 5 8`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const insert = (t, x) => !t ? { v: x, l: null, r: null } : (x < t.v ? (t.l = insert(t.l, x)) : (t.r = insert(t.r, x)), t);
let root = null;
for (let i = 1; i <= nums[0]; i++) root = insert(root, nums[i]);
const out = [];
const inorder = (t) => { if (!t) return; inorder(t.l); out.push(t.v); inorder(t.r); };
inorder(root);
console.log(out.join(' '));`,
        stdin: '4\n5 2 8 1',
        expectedOutput: '1 2 5 8',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'const inorder = (t) => { if (!t) return; inorder(t.l); out.push(t.v); inorder(t.r); };', whatItMeans: 'Recursive left-root-right tree walk.', whyItIsThere: 'Yields all BST keys in sorted ascending order.', ifDeletedError: 'Output list remains empty.' },
        ],
      },
      {
        id: 'js-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Monotonic Stack: Next Greater Element in O(n)',
        englishParagraphs: [
          'Checking every pair to the right takes `O(n^2)`. Scanning from right to left while keeping a strictly decreasing stack finds the Next Greater Element for every index in one linear `O(n)` pass!',
          'Each element enters and leaves the stack at most once.',
        ],
        banglaParagraphs: [
          'ডান দিক থেকে স্ক্যান করে ডিক্রিজিং মনোটোনিক স্ট্যাক ব্যবহার করলে প্রতি উপাদানের পরবর্তী বড় সংখ্যা মাত্র O(n) সময়ে মেলে!',
          'প্রতিটি উপাদান সর্বোচ্চ একবার পুশ ও একবার পপ হয়।',
        ],
        memoryDiagram: `[2, 1, 2, 4] -> NGE: [4, 2, 4, -1]`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0], a = nums.slice(1, 1 + n);
const ans = new Array(n).fill(-1), st = [];
for (let i = n - 1; i >= 0; i--) {
  while (st.length && st[st.length - 1] <= a[i]) st.pop();
  if (st.length) ans[i] = st[st.length - 1];
  st.push(a[i]);
}
console.log(ans.join(' '));`,
        stdin: '4\n2 1 2 4',
        expectedOutput: '4 2 4 -1',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'while (st.length && st[st.length - 1] <= a[i]) st.pop();', whatItMeans: 'Discards stack values <= current element that can never be NGE for anything left of i.', whyItIsThere: 'Maintains monotonic decreasing stack invariant in amortized O(1).', ifDeletedError: 'Returns wrong smaller elements ahead.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 4', codeSnippet: "const match = { '(': ')', '[': ']', '{': '}' };", whatItMeans: 'Lookup table mapping opening symbols to expected closing symbols.', whyItIsThere: 'Replaces noisy nested if/else checks.', ifDeletedError: 'Runtime ReferenceError on match.' },
      { lineNumber: 'Line 5', codeSnippet: 'const st = [];', whatItMeans: 'Array acting as LIFO stack storing unmatched openers.', whyItIsThere: 'Tracks most recently opened bracket.', ifDeletedError: 'Cannot push or pop symbols.' },
      { lineNumber: 'Line 8', codeSnippet: 'if (match[c]) st.push(c);', whatItMeans: 'Pushes opening bracket onto top of stack.', whyItIsThere: 'Defers matching until corresponding closer appears.', ifDeletedError: 'Openers are treated as closers and fail.' },
      { lineNumber: 'Line 9', codeSnippet: 'else if (!st.length || match[st.pop()] !== c) { ok = false; break; }', whatItMeans: 'Guards empty stack before popping and verifies exact pair.', whyItIsThere: 'Catches both premature closers and wrong bracket types.', ifDeletedError: 'Invalid sequences slip through.' },
      { lineNumber: 'Line 11', codeSnippet: "console.log(ok && st.length === 0 ? 'VALID' : 'INVALID');", whatItMeans: 'Prints VALID only when all openers closed in proper order.', whyItIsThere: 'Rejects unclosed trailing openers like "((("', ifDeletedError: 'Outputs nothing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{", "[", "("', memoryOrStack: 'st = ["{", "[", "("]', note: 'All openers pushed' },
      { step: 2, state: 'Read ")"', memoryOrStack: 'pop "(" -> matches ")"', note: 'st = ["{", "["]' },
      { step: 3, state: 'Read "]", "}"', memoryOrStack: 'pop "[" then "{" -> match', note: 'st = []' },
      { step: 4, state: 'Loop ends', memoryOrStack: 'ok=true, st.length=0', note: 'Prints VALID' },
    ],
    harryBugTraps: [
      {
        title: 'Using Array.shift() Inside a Large BFS Queue Loop',
        brokenCode: `while (q.length) { const u = q.shift(); /* O(V) per pop -> O(V^2) TLE! */ }`,
        fixedCode: `const q = [0]; for (let head = 0; head < q.length; head++) { const u = q[head]; console.log(u); }`,
        whyItBreaks: 'q.shift() re-indexes all remaining elements on every dequeue, causing O(V^2) timeouts on big graphs.',
      },
      {
        title: 'Marking Visited on Dequeue Instead of Enqueue in BFS',
        brokenCode: `const u = q[head++]; if (vis[u]) continue; vis[u] = true; // pushes duplicates many times!`,
        fixedCode: `const dist = [0, -1]; const q = [0]; if (dist[1] === -1) { dist[1] = 1; q.push(1); } console.log(dist.join(' '));`,
        whyItBreaks: 'Multiple neighbors push the same unvisited node before it is ever popped, blowing up queue memory and runtime.',
      },
      {
        title: 'Forgetting !st.length Before Checking Bracket Pair',
        brokenCode: `if (match[st.pop()] !== c) ok = false; // undefined !== c misses logic clarity`,
        fixedCode: `const st = []; const s = ')'; console.log(!st.length ? 'INVALID' : 'OK');`,
        whyItBreaks: 'Always check stack emptiness explicitly before popping or peeking top elements.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-23-p1',
        difficulty: 'Easy',
        title: 'Balanced Parentheses Validator',
        prompt: 'Read a bracket string and print VALID if balanced else INVALID.',
        banglaHint: 'ইঙ্গিত: স্ট্যাকে ওপেনিং ব্র্যাকেট পুশ করে ক্লোজিং ব্র্যাকেটে পপ ও ম্যাচ চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst s = raw.trim(), match = { '(': ')', '[': ']', '{': '}' }, st = [];\nlet ok = true;\nfor (const c of s) {\n  if (match[c]) st.push(c);\n  else if (!st.length || match[st.pop()] !== c) { ok = false; break; }\n}\nconsole.log(ok && st.length === 0 ? 'VALID' : 'INVALID');`,
        sampleStdin: '{[()]}',
        expectedOutput: 'VALID',
      },
      {
        id: 'js-ch-23-p2',
        difficulty: 'Easy',
        title: 'FIFO Queue Simulation (Cursor Mode)',
        prompt: 'Read n commands (ENQ x / DEQ); print each dequeued integer on its own line.',
        banglaHint: 'ইঙ্গিত: `q.push(x)` ও `q[head++]` ব্যবহার করো যাতে O(1) সময়ে ডিকিউ হয়।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines = raw.trim().split(/\\r?\\n/), n = Number(lines[0]);\nconst q = []; let head = 0;\nfor (let i = 1; i <= n; i++) {\n  const parts = lines[i].trim().split(/\\s+/);\n  if (parts[0] === 'ENQ') q.push(Number(parts[1]));\n  else if (head < q.length) console.log(q[head++]);\n}`,
        sampleStdin: '3\nENQ 10\nENQ 20\nDEQ',
        expectedOutput: '10',
      },
      {
        id: 'js-ch-23-p3',
        difficulty: 'Medium',
        title: 'Shortest Path Distances via BFS',
        prompt: 'Read n, m and m undirected edges; print BFS distances from node 0.',
        banglaHint: 'ইঙ্গিত: এনকিউ করার সময়ই `dist[v] = dist[u] + 1` বসাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist = new Array(n).fill(-1), q = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
        sampleStdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
      },
      {
        id: 'js-ch-23-p4',
        difficulty: 'Medium',
        title: 'Connected Components Counter (DFS)',
        prompt: 'Read n, m and m undirected edges; print total number of connected components.',
        banglaHint: 'ইঙ্গিত: প্রতিটি অদেখা নোড থেকে DFS/BFS চালিয়ে `comp++` গুনো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1], adj = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst vis = new Uint8Array(n); let comp = 0;\nconst dfs = (u) => { vis[u] = 1; for (const v of adj[u]) if (!vis[v]) dfs(v); };\nfor (let i = 0; i < n; i++) if (!vis[i]) { comp++; dfs(i); }\nconsole.log(comp);`,
        sampleStdin: '5 3\n0 1\n1 2\n3 4',
        expectedOutput: '2',
      },
      {
        id: 'js-ch-23-p5',
        difficulty: 'Hard',
        title: 'Next Greater Element (Monotonic Stack)',
        prompt: 'Read n and n integers; print next greater element to the right (or -1) for each.',
        banglaHint: 'ইঙ্গিত: ডান দিক থেকে লুপ চালিয়ে ছোট উপাদানগুলো স্ট্যাক থেকে পপ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], a = nums.slice(1, 1 + n), ans = new Array(n).fill(-1), st = [];\nfor (let i = n - 1; i >= 0; i--) {\n  while (st.length && st[st.length - 1] <= a[i]) st.pop();\n  if (st.length) ans[i] = st[st.length - 1];\n  st.push(a[i]);\n}\nconsole.log(ans.join(' '));`,
        sampleStdin: '4\n2 1 2 4',
        expectedOutput: '4 2 4 -1',
      },
    ],
    miniBuild: {
      title: 'Zero-Shift O(V + E) Graph BFS Path Engine',
      description: 'Computes single-source shortest unweighted paths in JavaScript using an O(1) cursor queue.',
      banglaGoal: '`shift()` ছাড়াই O(1) কার্সার কিউ ব্যবহার করে গ্রাফের শর্টেস্ট পাথ BFS ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 11, 20, 23',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1];\nconst adj = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist = new Array(n).fill(-1), q = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst n = nums[0], m = nums[1];\nconst adj = Array.from({ length: n }, () => []);\nfor (let i = 0; i < m; i++) { adj[nums[2 + 2 * i]].push(nums[3 + 2 * i]); adj[nums[3 + 2 * i]].push(nums[2 + 2 * i]); }\nconst dist = new Array(n).fill(-1), q = [0]; dist[0] = 0;\nfor (let head = 0; head < q.length; head++) {\n  const u = q[head];\n  for (const v of adj[u]) if (dist[v] === -1) { dist[v] = dist[u] + 1; q.push(v); }\n}\nconsole.log(dist.join(' '));`,
    sampleStdin: '4 3\n0 1\n0 2\n1 3',
    expectedSampleOutput: '0 1 1 2',
    testCases: [
      { id: 'js23-t1', input: '4 3\n0 1\n0 2\n1 3', expectedOutput: '0 1 1 2' },
      { id: 'js23-t2', input: '3 1\n0 1', expectedOutput: '0 1 -1', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'JavaScript Chapter 24 (ES2025): Error Boundaries, Stream Parsing & Task Queues',
    banglaTitle: 'JavaScript অধ্যায় ২৪ (ES2025): Error হ্যান্ডলিং, Stream পার্সিং ও Task Queue',
    subtitle: 'Custom Error subclasses, try/catch/finally cleanup, fault-tolerant stream parsing, and deterministic event-loop task queues.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript applications run inside an event loop where unhandled exceptions or malformed JSON payloads can halt an entire worker unless isolated behind `try / catch / finally` boundaries. Instead of checking `if (x / y === Infinity)` everywhere (because JS silently returns `Infinity` or `NaN`!), domain guards throw explicit `RangeError` or custom `AppError` subclasses carrying machine-readable error codes.\n\nFor deterministic batching and `Promise.all` worker pipelines, representing queued work items as synchronous/resolvable task thunks let you aggregate results, recover from bad rows, and verify deterministic ordering cleanly without race conditions.',
      asciiFlowchart: `  Task Queue -> [Thunk 1] [Thunk 2 (bad)] [Thunk 3]
        |
        +--> try { run(task) } catch (err) { log code } finally { cleanup }`,
      pseudocode: [
        '1. GUARD invalid inputs (b === 0, NaN, bad JSON) BEFORE arithmetic produces Infinity/NaN',
        '2. SUBCLASS Error (class AppError extends Error) so catch blocks branch on err.code',
        '3. ISOLATE per-record parsing inside try/catch so one corrupt row never crashes batch',
        '4. DRAIN task queue thunks deterministically and release locks inside finally',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সার্কিট ব্রেকার (`try/catch`), `Infinity` ফাঁদ ও টাস্ক কিউ ডিসপ্যাচার',
        explanation:
          'জাভাস্ক্রিপ্টে `20 / 0` লিখলে প্রোগ্রাম ক্র্যাশ না করে চুপচাপ `Infinity` বা `NaN` ফেরত দেয়, যা পরবর্তীতে পুরো ডাটাবেস বা ফাইন্যান্স হিসাব নষ্ট করে দিতে পারে! তাই `b === 0` হলে নিজস্ব `Error` ক্লাস থ্রো করে `try / catch` দিয়ে ধরাটাই প্রফেশনাল পদ্ধতি। একইভাবে বাইরে থেকে আসা CSV বা JSON লাইনের ভেতর একটি লাইন খারাপ থাকলে পুরো প্রসেস বন্ধ না করে প্রতিটি লাইন আলাদা `try / catch` ব্লকে পার্স করলে বাকি সব সঠিক ডাটা নিরাপদে প্রসেস হয়। ব্রাউজার বা Node.js-এ ইভেন্ট লুপ ও `async/await` / `Promise.all` মূলত মাইক্রোটাস্ক কিউয়ে ফাংশন সাজিয়ে একটির পর একটি চালায়। স্যান্ডবক্স বা ডিটারমিনিস্টিক ওয়ার্কার কিউয়ে আমরা সেই কাজগুলো থাঙ্ক (`() => value`) আকারে কিউতে রেখে `finally` ব্লকে রিসোর্স ক্লিনআপ নিশ্চিত করি!',
        everydayExample:
          'বাড়ির প্রতিটি রুমে আলাদা সার্কিট ব্রেকার (`try/catch`) থাকলে একটি ফ্যান শর্ট-সার্কিট হলে শুধু সেই রুম বন্ধ হয়, পুরো শহরের বিদ্যুৎ চলে যায় না!',
        keyTakeaways: [
          'জাভাস্ক্রিপ্টে শূন্য দিয়ে ভাগ করলে `Infinity` আসে—তাই ডোমেইন গার্ডে নিজে `throw new Error(...)` করবে।',
          '`try / catch / finally` ব্লকে `finally` অংশটি এরর আসুক বা না আসুক সবসময় রান করে।',
          'প্রতিটি স্ট্রিম/ইনপুট লাইন আলাদা `try/catch`-এ পার্স করলে একটি খারাপ রেকর্ড পুরো ব্যাচ থামায় না।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Custom Domain Error & Safe Division Boundary',
        englishParagraphs: [
          'Because JavaScript returns `Infinity` instead of throwing on `20 / 0`, `safeDiv` explicitly validates finite operands and `b !== 0`.',
          'Catching the custom error code prints `OK:<q>` on valid inputs and `ERR_DIV_ZERO` cleanly on zero divisors.',
        ],
        banglaParagraphs: [
          'JS-এ শূন্য দিয়ে ভাগ করলে এরর দেয় না, বরং `Infinity` আসে—তাই `safeDiv` আগে থেকেই চেক করে `AppError` থ্রো করে।',
          'ধরা পড়লে `ERR_DIV_ZERO` প্রিন্ট হয়।',
        ],
        memoryDiagram: `20 4 -> OK:5 | 20 0 -> throw AppError("ERR_DIV_ZERO") -> catch`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
class AppError extends Error {
  constructor(code) { super(code); this.code = code; }
}
const safeDiv = (a, b) => {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new AppError('ERR_DIV_ZERO');
  return Math.trunc(a / b);
};
const [a, b] = raw.trim().split(/\\s+/).map(Number);
try { console.log('OK:' + safeDiv(a, b)); }
catch (err) { console.log(err.code || 'ERR'); }`,
        stdin: '20 0',
        expectedOutput: 'ERR_DIV_ZERO',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: "if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new AppError('ERR_DIV_ZERO');", whatItMeans: 'Prevents silent Infinity/NaN propagation.', whyItIsThere: 'JS arithmetic does not throw on divide-by-zero automatically.', ifDeletedError: 'Outputs "OK:Infinity" instead of failing cleanly.' },
        ],
      },
      {
        id: 'js-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fault-Tolerant Line Stream Parser (Skip Malformed Records)',
        englishParagraphs: [
          'Real log streams frequently contain one corrupted line among thousands of clean ones.',
          'Wrapping each record parse in its own `try / catch` counts valid records and sums scores without crashing.',
        ],
        banglaParagraphs: [
          'একাধিক ইনপুট লাইনের মধ্যে কোনো একটি লাইন নষ্ট থাকলেও পুরো প্রসেস ক্র্যাশ না করে `try/catch` দিয়ে সেটিকে স্কিপ করা হয়েছে।',
          'সঠিক রেকর্ডগুলোর সংখ্যা ও যোগফল আউটপুট দেয়।',
        ],
        memoryDiagram: `["alpha 10", "beta nope", "gamma 25"] -> ok=2 sum=35`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines = raw.trim().split(/\\r?\\n/), n = Number(lines[0]);
let ok = 0, sum = 0;
for (let i = 1; i <= n; i++) {
  try {
    const [, vStr] = lines[i].trim().split(/\\s+/);
    const v = Number(vStr);
    if (!Number.isInteger(v)) throw new TypeError('BAD_NUM');
    ok++; sum += v;
  } catch (_) {}
}
console.log('ok=' + ok + ' sum=' + sum);`,
        stdin: '3\nalpha 10\nbeta nope\ngamma 25',
        expectedOutput: 'ok=2 sum=35',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: "if (!Number.isInteger(v)) throw new TypeError('BAD_NUM');", whatItMeans: 'Rejects NaN/non-integer strings parsed via Number().', whyItIsThere: 'Number("nope") evaluates to NaN instead of throwing automatically.', ifDeletedError: 'sum becomes NaN!' },
        ],
      },
      {
        id: 'js-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Deterministic Task Queue Dispatcher & Result Aggregator',
        englishParagraphs: [
          'Just like `Promise.all` collects results from concurrent worker tasks into an ordered array, building a task thunk queue lets us enqueue jobs, run them safely with `finally` accounting, and print the combined summary.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে কাজের কিউ (`taskQueue`) সাজিয়ে প্রতিটি জব ধাপে ধাপে রান করে মোট ফলাফল জমানো হয়েছে।',
          '`finally` ব্লকের মাধ্যমে প্রতিটি জব সম্পন্ন হওয়ার পর স্টেট আপডেট নিশ্চিত করা হয়।',
        ],
        memoryDiagram: `tasks: [10, 20, 30] -> run sequentially -> done=3 total=60`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0] || 0;
const taskQueue = nums.slice(1, 1 + n).map((val) => () => val);
let total = 0, done = 0;
for (const runWorker of taskQueue) {
  try { total += runWorker(); }
  finally { done++; }
}
console.log('done=' + done + ' total=' + total);`,
        stdin: '3\n10 20 30',
        expectedOutput: 'done=3 total=60',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'const taskQueue = nums.slice(1, 1 + n).map((val) => () => val);', whatItMeans: 'Converts payload values into deferred worker thunks.', whyItIsThere: 'Decouples job scheduling from job execution.', ifDeletedError: 'No task thunks exist to drain.' },
        ],
      },
      {
        id: 'js-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Structured Retry Loop With Bounded Attempts',
        englishParagraphs: [
          'Never write unbounded `while (true)` retries! Cap retries cleanly and report the exact attempt that succeeded or abort deterministically when `maxAttempts` exhausts.',
        ],
        banglaParagraphs: [
          'অসীম `while(true)` রিট্রাই লুপ না লিখে নির্দিষ্ট `maxAttempts` সীমার মধ্যে নিরাপদ রিট্রাই হ্যান্ডলার তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `[FAIL, FAIL, OK] -> Attempt 3: OK`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const tokens = raw.trim().split(/\\s+/);
const n = Number(tokens[0]), states = tokens.slice(1, 1 + n);
let result = 'EXHAUSTED';
for (let i = 0; i < states.length; i++) {
  try {
    if (states[i] !== 'OK') throw new Error('TRANSIENT');
    result = 'Attempt ' + (i + 1) + ': OK';
    break;
  } catch (_) {}
}
console.log(result);`,
        stdin: '3\nFAIL FAIL OK',
        expectedOutput: 'Attempt 3: OK',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: "result = 'Attempt ' + (i + 1) + ': OK'; break;", whatItMeans: 'Stops retry loop immediately on first healthy response.', whyItIsThere: 'Avoids redundant calls after recovery.', ifDeletedError: 'Never reports success or keeps looping.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'class AppError extends Error { constructor(code) { super(code); this.code = code; } }', whatItMeans: 'Custom domain error inheriting JS stack trace plus stable .code.', whyItIsThere: 'Allows callers to inspect error codes cleanly without string parsing.', ifDeletedError: 'ReferenceError: AppError is not defined.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new AppError(\'ERR_DIV_ZERO\');', whatItMeans: 'Explicit division guard preventing silent Infinity/NaN.', whyItIsThere: 'Maintains strict error contract.', ifDeletedError: '20/0 evaluates to Infinity instead of triggering catch.' },
      { lineNumber: 'Line 8', codeSnippet: 'return Math.trunc(a / b);', whatItMeans: 'Truncates quotient toward zero as integer division.', whyItIsThere: 'Matches integer semantics cleanly without floating noise.', ifDeletedError: 'Returns undefined.' },
      { lineNumber: 'Line 11', codeSnippet: "try { console.log('OK:' + safeDiv(a, b)); }", whatItMeans: 'Executes risky domain operation inside protected try scope.', whyItIsThere: 'Routes exceptions into catch handler rather than crashing.', ifDeletedError: 'Uncaught exception terminates program.' },
      { lineNumber: 'Line 12', codeSnippet: "catch (err) { console.log(err.code || 'ERR'); }", whatItMeans: 'Handles thrown AppError cleanly.', whyItIsThere: 'Produces deterministic fallback output.', ifDeletedError: 'Syntax error: try requires catch or finally.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Parse stdin "20 0"', memoryOrStack: 'a=20, b=0', note: 'Divisor is zero' },
      { step: 2, state: 'Call safeDiv(20, 0)', memoryOrStack: 'b === 0 triggers throw', note: 'AppError("ERR_DIV_ZERO") thrown' },
      { step: 3, state: 'Unwind to catch (err)', memoryOrStack: 'err.code === "ERR_DIV_ZERO"', note: 'try block aborted' },
      { step: 4, state: 'Print error code', memoryOrStack: 'stdout="ERR_DIV_ZERO"', note: 'Zero Infinity leakage' },
    ],
    harryBugTraps: [
      {
        title: 'Silent Infinity / NaN From Unchecked Division in JS',
        brokenCode: `console.log(20 / 0); // Prints "Infinity" — silently corrupts downstream sums!`,
        fixedCode: `const b = 0; console.log(b === 0 ? 'ERR_DIV_ZERO' : 20 / b);`,
        whyItBreaks: 'JavaScript IEEE-754 numbers do not throw on / 0; validate divisors explicitly before dividing.',
      },
      {
        title: 'Checking typeof x === "number" Without Rejecting NaN',
        brokenCode: `const x = Number("abc"); console.log(typeof x === 'number'); // true!!`,
        fixedCode: `const x = Number('abc'); console.log(Number.isFinite(x) ? x : 'ERR_NAN');`,
        whyItBreaks: 'In JavaScript, typeof NaN is "number"! Always use Number.isFinite(x) or Number.isInteger(x).',
      },
      {
        title: 'Bare JSON.parse() on Untrusted Strings Crashing the Worker',
        brokenCode: `const data = JSON.parse("{bad"); // Uncaught SyntaxError halts process!`,
        fixedCode: `try { JSON.parse('{bad'); } catch { console.log('SAFE_FALLBACK'); }`,
        whyItBreaks: 'Always wrap JSON.parse on user/network strings inside try/catch with a fallback value.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-24-p1',
        difficulty: 'Easy',
        title: 'Safe JSON Value Extractor',
        prompt: 'Read a JSON string; print data.ok if valid JSON else FALLBACK.',
        banglaHint: 'ইঙ্গিত: `try { JSON.parse(...) } catch { ... }` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\ntry { const d = JSON.parse(raw.trim()); console.log(d.ok ?? 'FALLBACK'); }\ncatch { console.log('FALLBACK'); }`,
        sampleStdin: '{"ok":7}',
        expectedOutput: '7',
      },
      {
        id: 'js-ch-24-p2',
        difficulty: 'Easy',
        title: 'Strict Integer Division Guard',
        prompt: 'Read a b; print OK:<a/b> if b!=0 else ERR_DIV_ZERO.',
        banglaHint: 'ইঙ্গিত: `b === 0` হলে Custom Error থ্রো করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [a, b] = raw.trim().split(/\\s+/).map(Number);\ntry { if (b === 0) throw new Error('ERR_DIV_ZERO'); console.log('OK:' + Math.trunc(a / b)); }\ncatch (e) { console.log(e.message); }`,
        sampleStdin: '20 0',
        expectedOutput: 'ERR_DIV_ZERO',
      },
      {
        id: 'js-ch-24-p3',
        difficulty: 'Medium',
        title: 'Bounded Retry Handler',
        prompt: 'Read n and n attempt outcomes (FAIL/OK); print "Attempt k: OK" for first OK or EXHAUSTED.',
        banglaHint: 'ইঙ্গিত: লুপে প্রথম `OK` পেলেই রেজাল্ট সেভ করে `break` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/), n = Number(t[0]);\nlet out = 'EXHAUSTED';\nfor (let i = 1; i <= n; i++) if (t[i] === 'OK') { out = 'Attempt ' + i + ': OK'; break; }\nconsole.log(out);`,
        sampleStdin: '3\nFAIL FAIL OK',
        expectedOutput: 'Attempt 3: OK',
      },
      {
        id: 'js-ch-24-p4',
        difficulty: 'Medium',
        title: 'Ordered Task Queue Sum',
        prompt: 'Read n worker values, enqueue thunks, drain queue, and print total sum.',
        banglaHint: 'ইঙ্গিত: `.map(v => () => v)` দিয়ে টাস্ক কিউ বানিয়ে লুপে চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst tasks = nums.slice(1, 1 + nums[0]).map((v) => () => v);\nlet sum = 0; for (const run of tasks) sum += run(); console.log(sum);`,
        sampleStdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'js-ch-24-p5',
        difficulty: 'Hard',
        title: 'Fault-Tolerant Batch Record Aggregator',
        prompt: 'Read n lines (`name val`); skip non-integer lines via try/catch and print `valid=<c> sum=<s>`.',
        banglaHint: 'ইঙ্গিত: প্রতিটি লাইনে `Number.isInteger(v)` না হলে `throw` করে `catch`-এ স্কিপ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines = raw.trim().split(/\\r?\\n/), n = Number(lines[0]);\nlet valid = 0, sum = 0;\nfor (let i = 1; i <= n; i++) {\n  try {\n    const v = Number(lines[i].trim().split(/\\s+/)[1]);\n    if (!Number.isInteger(v)) throw new Error('BAD');\n    valid++; sum += v;\n  } catch {}\n}\nconsole.log('valid=' + valid + ' sum=' + sum);`,
        sampleStdin: '3\na 10\nb bad\nc 25',
        expectedOutput: 'valid=2 sum=35',
      },
    ],
    miniBuild: {
      title: 'Safe Division & Domain Error Boundary',
      description: 'Prevents silent Infinity/NaN corruption by routing divide-by-zero into structured AppError handling.',
      banglaGoal: 'ডোমেইন ভ্যালিডেশন ও কাস্টম এরর বাউন্ডারির মাধ্যমে নিরাপদ ভাগ ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 6, 18, 24',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass AppError extends Error { constructor(code) { super(code); this.code = code; } }\nconst [a, b] = raw.trim().split(/\\s+/).map(Number);\ntry {\n  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new AppError('ERR_DIV_ZERO');\n  console.log('OK:' + Math.trunc(a / b));\n} catch (e) { console.log(e.code || 'ERR'); }`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nclass AppError extends Error { constructor(code) { super(code); this.code = code; } }\nconst [a, b] = raw.trim().split(/\\s+/).map(Number);\ntry {\n  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) throw new AppError('ERR_DIV_ZERO');\n  console.log('OK:' + Math.trunc(a / b));\n} catch (e) { console.log(e.code || 'ERR'); }`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'js24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'js24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'JavaScript Chapter 25 (ES2025): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'JavaScript অধ্যায় ২৫ (ES2025): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'Full-stack Express/Node HTTP routing, Map route tables, JSON.stringify serialization, rate limiting, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript sits at EVERY layer of a modern full-stack website—from DOM events & `fetch()` in the browser to REST/JSON routers on Node.js, Deno, and Cloudflare Workers. When a client fires `POST /api/add 15 27`, the server parses the request line, enforces HTTP method & auth middleware, looks up the endpoint in a `Map` route table (avoiding prototype-pollution traps on plain objects!), executes the handler, and emits serialized JSON via `JSON.stringify()`.\n\nIn this JavaScript Mega Capstone, you unite all 25 chapters—ES6 `Map`/`Set`, destructuring, sliding-window rate limits, custom error boundaries, and deterministic route dispatching—into a live synchronous HTTP Router & JSON API simulator.',
      asciiFlowchart: `  [ Browser fetch() -> "POST /api/add 15 27" ]
         |
         v  (Method Gate -> new Map() Route Lookup -> JSON.stringify())
  [ 200 {"sum":42} | 404 {"error":"not_found"} | 405 MethodNotAllowed ]`,
      pseudocode: [
        '1. PARSE HTTP request line into { method, path, args } safely',
        '2. VALIDATE HTTP verbs (GET / POST) and auth headers BEFORE handler dispatch',
        '3. ROUTE paths through ES6 Map so keys like "toString" or "__proto__" cannot collide',
        '4. SERIALIZE response payloads cleanly with JSON.stringify() or 404 JSON fallback',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Node/Express ফুল-স্ট্যাক রাউটার, `Map` নিরাপত্তা ও JSON ইঞ্জিন (Mega Capstone)',
        explanation:
          'জাভাস্ক্রিপ্ট হলো ওয়েবের একমাত্র ভাষা যা ক্লায়েন্টের ব্রাউজার (Frontend) এবং Node.js/Cloudflare সার্ভার (Backend) উভয় জায়গাতেই একসাথে চলে! ব্রাউজার যখন `fetch()` দিয়ে কোনো রিকোয়েস্ট (`POST /api/add 15 27`) পাঠায়, তখন ব্যাকএন্ড রাউটার প্রথমে মেথড ও অথেন্টিকেশন যাচাই করে—অনুমোদিত মেথড না হলে `405 MethodNotAllowed` ফেরত দেয়। এরপর সাধারণ `{}` অবজেক্টের বদলে `new Map()` দিয়ে তৈরি রাউট টেবিলে O(1) সময়ে পাথ খোঁজা হয় (কারণ সাধারণ অবজেক্টে `"constructor"` বা `"toString"` কী দিলে বাগ হতে পারে!) এবং শেষে `JSON.stringify()` দিয়ে নিরাপদ JSON আউটপুট পাঠানো হয়। অজানা পাথে ক্র্যাশ না করে `404 {"error":"not_found"}` উত্তর দেওয়া হয়। এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এর সব কৌশল একসাথে মিলিয়ে একটি সম্পূর্ণ ওয়েব এপিআই রাউটার ও JSON ইঞ্জিন তৈরি করবে!',
        everydayExample:
          'হোটেলের গেটে নিরাপত্তা কর্মী (Method/Auth Middleware) পাস যাচাই করে অভ্যর্থনা ডেস্কে (`Map` রাউটার) পাঠায়, আর ডেস্ক সঠিক সেবা বা `404` স্লিপ প্রিন্ট করে দেয়!',
        keyTakeaways: [
          'ডাইনামিক রাউট/ডাটা স্টোরেজের জন্য `{}`-এর চেয়ে `new Map()` ব্যবহার করা নিরাপদ (প্রোটোটাইপ কলিশন হয় না)।',
          'JSON আউটপুট বানাতে হাতে স্ট্রিং জোড়া না দিয়ে `JSON.stringify()` ব্যবহার করবে।',
          'মিডলওয়্যারে মেথড ও টোকেন চেক করলে সব প্রাইভেট এন্ডপয়েন্ট একসাথে সুরক্ষিত থাকে।',
        ],
      },
    },
    topics: [
      {
        id: 'js-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'HTTP Request Line Parser via Destructuring',
        englishParagraphs: [
          'Splitting an HTTP/1.1 request line with array destructuring captures `method` and `path` cleanly in one statement.',
        ],
        banglaParagraphs: [
          'অ্যারে ডিস্ট্রাকচারিং দিয়ে HTTP রিকোয়েস্ট লাইন থেকে মেথড ও পাথ আলাদা করে নেওয়া হয়েছে।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> { method: "GET", path: "/health" }`,
        code: `const raw = 'GET /health HTTP/1.1';
const [method, path] = raw.trim().split(/\\s+/);
console.log('method=' + method + ' path=' + path);`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'const [method, path] = raw.trim().split(/\\s+/);', whatItMeans: 'Destructures HTTP verb and route path from request line.', whyItIsThere: 'Provides clean named tokens for router matching.', ifDeletedError: 'ReferenceError on method/path.' },
        ],
      },
      {
        id: 'js-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe JSON Response Builder Using JSON.stringify',
        englishParagraphs: [
          '`JSON.stringify` handles string escaping, numbers, and booleans automatically without broken quotes.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে ডাটা নিয়ে `JSON.stringify` দিয়ে নির্ভুল HTTP 200 ও JSON বডি তৈরি করা হয়েছে।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [user, score] = raw.trim().split(/\\s+/);
console.log('HTTP/1.1 200 OK');
console.log(JSON.stringify({ user, score: Number(score) }));`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'console.log(JSON.stringify({ user, score: Number(score) }));', whatItMeans: 'Serializes response payload safely into valid JSON.', whyItIsThere: 'Prevents syntax errors from unescaped quotes.', ifDeletedError: 'No JSON body printed.' },
        ],
      },
      {
        id: 'js-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Auth Middleware & ES6 Map Route Dispatch Table',
        englishParagraphs: [
          'Storing endpoint handlers in `new Map()` prevents prototype keys like `toString` from matching accidentally while keeping `O(1)` lookup.',
        ],
        banglaParagraphs: [
          'টোকেন যাচাই করে `new Map()` রাউট টেবিল থেকে O(1) সময়ে হ্যান্ডলার ফাংশন চালানো হয়েছে।',
        ],
        memoryDiagram: `/health secret -> auth OK -> routes.get('/health')() -> 200`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const [path, tok] = raw.trim().split(/\\s+/);
const routes = new Map([
  ['/health', () => '200 ' + JSON.stringify({ ok: true })],
  ['/version', () => '200 ' + JSON.stringify({ ver: 'es2025' })],
]);
if (tok !== 'secret') console.log('401 Unauthorized');
else {
  const fn = routes.get(path);
  console.log(fn ? fn() : '404 NotFound');
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'const fn = routes.get(path);', whatItMeans: 'Safely looks up handler in ES6 Map without prototype collisions.', whyItIsThere: 'Avoids triggering Object.prototype keys like constructor.', ifDeletedError: 'Cannot invoke route handler.' },
        ],
      },
      {
        id: 'js-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Router & JSON API Engine',
        englishParagraphs: [
          'Processes `n` requests (`METHOD /path a b`), validates HTTP verbs (`405`), dispatches `/health` and `/api/add`, and emits serialized JSON responses cleanly.',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: একটানা HTTP রিকোয়েস্ট পড়ে মেথড যাচাই, রাউট ডিসপ্যাচ ও `JSON.stringify` উত্তর জেনারেটর!',
        ],
        memoryDiagram: `Request Stream -> Method Guard -> Route Handler -> JSON Response`,
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const t = raw.trim().split(/\\s+/), n = Number(t[0]) || 0;
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
          { lineNumber: 'Line 6', codeSnippet: "if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');", whatItMeans: 'Enforces allowed HTTP verb policy before dispatch.', whyItIsThere: 'Prevents invalid methods from reaching handlers.', ifDeletedError: 'DELETE falls into route logic.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: "const raw = 'GET /health HTTP/1.1';", whatItMeans: 'Incoming raw HTTP request line.', whyItIsThere: 'Provides sample packet to parse.', ifDeletedError: 'raw is undefined.' },
      { lineNumber: 'Line 2', codeSnippet: 'const [method, path] = raw.trim().split(/\\s+/);', whatItMeans: 'Extracts HTTP verb and route path via destructuring.', whyItIsThere: 'Prepares tokens for route lookup.', ifDeletedError: 'Variables method and path missing.' },
      { lineNumber: 'Line 3', codeSnippet: "console.log('method=' + method + ' path=' + path);", whatItMeans: 'Outputs parsed request fields.', whyItIsThere: 'Confirms extraction cleanly.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Receive "GET /health 0 0"', memoryOrStack: 'm="GET", p="/health"', note: 'Valid HTTP verb' },
      { step: 2, state: 'Route "/health"', memoryOrStack: 'JSON.stringify({status:"ok"})', note: '200 {"status":"ok"}' },
      { step: 3, state: 'Receive "POST /api/add 15 27"', memoryOrStack: 'a+b = 42', note: '200 {"sum":42}' },
      { step: 4, state: 'Receive "GET /unknown 0 0"', memoryOrStack: 'No match -> 404 branch', note: '404 {"error":"not_found"}' },
    ],
    harryBugTraps: [
      {
        title: 'Using Plain Object {} Lookup That Matches Prototype Properties',
        brokenCode: `const routes = { '/health': fn }; const h = routes['toString']; // Returns Object.prototype.toString!`,
        fixedCode: `const routes = new Map([['/health', () => 200]]); console.log(routes.get('toString') ?? 404);`,
        whyItBreaks: 'Plain objects inherit Object.prototype properties; calling a user-controlled key like toString causes crashes or security flaws.',
      },
      {
        title: 'Hand-Concatenating Unescaped Strings Inside JSON',
        brokenCode: `const json = '{"user":"' + user + '"}'; // Quotes inside user break JSON syntax!`,
        fixedCode: `console.log(JSON.stringify({ user: 'argon"1' }));`,
        whyItBreaks: 'Always use JSON.stringify() so quotes, backslashes, and control bytes are properly escaped.',
      },
      {
        title: 'Returning Empty Undefined When Route Parameter Is Missing Instead of 400/404',
        brokenCode: `const fn = routes.get('/x'); fn(); // TypeError: fn is not a function!`,
        fixedCode: `const r = new Map(); const fn = r.get('/x'); console.log(fn ? fn() : '404 NotFound');`,
        whyItBreaks: 'Check handler existence before calling it to return clean 404 semantics.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-25-p1',
        difficulty: 'Easy',
        title: 'HTTP Status Labeler',
        prompt: 'Read int code (200, 404, 500); print OK, NOT_FOUND, or SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: `new Map([[200,"OK"],[404,"NOT_FOUND"]])` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst c = Number(raw.trim());\nconsole.log(new Map([[200, 'OK'], [404, 'NOT_FOUND']]).get(c) ?? 'SERVER_ERR');`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'js-ch-25-p2',
        difficulty: 'Easy',
        title: 'JSON Pair Emitter',
        prompt: 'Read key and int value; emit exact JSON string `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `JSON.stringify({ [k]: Number(v) })` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [k, v] = raw.trim().split(/\\s+/);\nconsole.log(JSON.stringify({ [k]: Number(v) }));`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'js-ch-25-p3',
        difficulty: 'Medium',
        title: 'Query Parameter id Extractor',
        prompt: 'Read query string `id=42&mode=pro`; extract and print value of `id`.',
        banglaHint: 'ইঙ্গিত: `&` ও `=` দিয়ে `.split()` করে `id` খুঁজে বের করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst map = new Map(raw.trim().split('&').map((p) => p.split('=')));\nconsole.log(map.get('id') ?? '');`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'js-ch-25-p4',
        difficulty: 'Medium',
        title: 'Sliding-Window API Rate Limiter',
        prompt: 'Read cap, n, and n sorted timestamps; count accepted requests within trailing 10s window.',
        banglaHint: 'ইঙ্গিত: কিউ হেড ইনডেক্স `l` এগিয়ে `t - win[l] >= 10` বাদ দাও এবং `(win.length - l) < cap` চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number), cap = nums[0], n = nums[1];\nconst win = []; let l = 0;\nfor (let i = 2; i < 2 + n; i++) {\n  const t = nums[i];\n  while (l < win.length && t - win[l] >= 10) l++;\n  if (win.length - l < cap) win.push(t);\n}\nconsole.log(win.length);`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'js-ch-25-p5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store',
        prompt: 'Read n commands (`SET id val` or `GET id`); print stored integer for each GET (0 default).',
        banglaHint: 'ইঙ্গিত: `new Map()` দিয়ে ডাটাবেস রেখে `db.get(id) ?? 0` প্রিন্ট করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/), n = Number(t[0]), db = new Map();\nlet i = 1;\nfor (let step = 0; step < n; step++) {\n  if (t[i] === 'SET') { db.set(Number(t[i + 1]), Number(t[i + 2])); i += 3; }\n  else { console.log(db.get(Number(t[i + 1])) ?? 0); i += 2; }\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): JavaScript ES2025 Full-Stack HTTP Router & JSON Engine',
      description: 'Validates HTTP verbs, dispatches REST routes cleanly, and serializes structured JSON responses.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ JavaScript HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/), n = Number(t[0]) || 0;\nfor (let i = 0; i < n; i++) {\n  const m = t[1 + 4 * i], p = t[2 + 4 * i], a = Number(t[3 + 4 * i]), b = Number(t[4 + 4 * i]);\n  if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');\n  else if (p === '/health') console.log('200 ' + JSON.stringify({ status: 'ok' }));\n  else if (p === '/api/add') console.log('200 ' + JSON.stringify({ sum: a + b }));\n  else console.log('404 ' + JSON.stringify({ error: 'not_found' }));\n}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim().split(/\\s+/), n = Number(t[0]) || 0;\nfor (let i = 0; i < n; i++) {\n  const m = t[1 + 4 * i], p = t[2 + 4 * i], a = Number(t[3 + 4 * i]), b = Number(t[4 + 4 * i]);\n  if (m !== 'GET' && m !== 'POST') console.log('405 MethodNotAllowed');\n  else if (p === '/health') console.log('200 ' + JSON.stringify({ status: 'ok' }));\n  else if (p === '/api/add') console.log('200 ' + JSON.stringify({ sum: a + b }));\n  else console.log('404 ' + JSON.stringify({ error: 'not_found' }));\n}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'js25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'js25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};


