import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_PYTHON_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'Python Chapter 21: Sorting, bisect & Binary Search on Answer',
    banglaTitle: 'Python অধ্যায় ২১: সর্টিং, bisect ও বাইনারি সার্চ অন আনসার',
    subtitle: 'Master TimSort key functions, the standard bisect module, and monotonic Binary Search on Answer in O(n log MaxVal).',
    zeroIntuition: {
      plainEnglishStory:
        'Scanning an unsorted list with x in arr takes O(n) every query. Python’s built-in TimSort orders lists in O(n log n) while the bisect module (bisect_left and bisect_right) answers range counts and ceiling lookups in O(log n).\n\nWhen searching for an optimal threshold—like the minimum shipping capacity to finish within D days—you binary-search the monotonic answer interval [lo, hi] directly and verify each midpoint with an O(n) greedy predicate.',
      asciiFlowchart: `  feasible(mid): [ False, False, False, True, True, True ]
                    lo                  ^mid       hi
  if feasible(mid): ans = mid; hi = mid - 1  else:  lo = mid + 1`,
      pseudocode: [
        '1. SORT input values or intervals with custom lambda key',
        '2. USE bisect_left / bisect_right for O(log n) boundaries',
        '3. DEFINE monotonic predicate ok(mid) for threshold problems',
        '4. LOOP while lo <= hi tracking best feasible answer',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সাজানো ডিকশনারি খোঁজা ও নিখুঁত থ্রেশহোল্ড নির্ণয় (Binary Search)',
        explanation:
          'ধরো একটি ১০ লাখ নামের তালিকায় তুমি একটি নির্দিষ্ট নাম বা সীমা খুঁজছো। প্রতিবার প্রথম থেকে খুঁজলে প্রোগ্রাম অনেক স্লো হয়ে যাবে। Python-এ তালিকা একবার sort() করলে তা O(n log n) সময়ে সাজিয়ে যায়, এরপর বিল্ট-ইন bisect_left আর bisect_right ফাংশন মাত্র ২০ ধাপেই যেকোনো সংখ্যার অবস্থান বা ফ্রিকোয়েন্সি বলে দেয়! এর চেয়েও শক্তিশালী টেকনিক হলো Binary Search on Answer। যখনই প্রশ্নে "সর্বনিম্ন কত ক্যাপাসিটি হলে D দিনে সব কাজ শেষ হবে" বা "সর্বোচ্চ কত দূরত্ব রাখা যাবে" এ ধরনের শর্ত থাকে, তখন সম্ভাব্য উত্তরের পরিসীমা [lo, hi] ধরে মাঝের মান mid পরীক্ষা করা হয়। যদি mid-এ কাজটি সম্ভব হয়, তবে উত্তর আরও ছোট করার চেষ্টা করতে ডান দিক বাদ দিয়ে hi = mid - 1 করা হয়। আর সম্ভব না হলে lo = mid + 1 করে বড় মান খোঁজা হয়। প্রতিটি ধাপে অর্ধেক সম্ভাবনা বাদ পড়ে বলে বিশাল রেঞ্জও চোখের পলকে সমাধান হয়ে যায়। Python-এ পূর্ণসংখ্যা কখনো ওভারফ্লো করে না, তবুও // ২ দিয়ে পরিষ্কার ফ্লোর ডিভিশন করাই আদর্শ নিয়ম।',
        everydayExample: 'ইন্টারনেট স্পিড টেস্ট বা ভলিউম অ্যাডজাস্ট: মাঝামাঝি থেকে বাড়িয়ে-কমিয়ে ঠিক আরামদায়ক লেভেল খুঁজে বের করা।',
        keyTakeaways: [
          'bisect_right(a, x) - bisect_left(a, x) দিয়ে O(log n)-এ x-এর সংখ্যা পাওয়া যায়।',
          'Binary Search on Answer তখনই চলে যখন প্রেডিকেট ফাংশন monotonic (False..False -> True..True) হয়।',
          'প্রথমে সম্ভাব্য উত্তর ans = mid সংরক্ষণ করে তবেই রেঞ্জ ছোট করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'bisect_left & bisect_right Range Frequency',
        englishParagraphs: [
          'After sorting a list, bisect_left returns the first index >= x while bisect_right returns the first index > x.',
        ],
        banglaParagraphs: [
          'সর্টেড লিস্টে bisect_right এবং bisect_left-এর বিয়োগফল থেকেই O(log n)-এ x-এর সংখ্যা মেলে।',
        ],
        memoryDiagram: `[2, 5, 5, 5, 9] -> bisect_left(5)=1, bisect_right(5)=4 -> count=3`,
        code: `from bisect import bisect_left, bisect_right

a = sorted([9, 5, 2, 5, 5])
lo = bisect_left(a, 5)
hi = bisect_right(a, 5)
print(lo, hi - lo)`,
        stdin: '',
        expectedOutput: '1 3',
        lineByLine: [
          {
            lineNumber: 'Line 4',
            codeSnippet: 'lo = bisect_left(a, 5)',
            whatItMeans: 'Finds leftmost insertion index for 5 in sorted list a.',
            whyItIsThere: 'Resolves start index in O(log n).',
            ifDeletedError: 'lo boundary is undefined.',
          },
          {
            lineNumber: 'Line 5',
            codeSnippet: 'hi = bisect_right(a, 5)',
            whatItMeans: 'Finds rightmost boundary strictly after 5.',
            whyItIsThere: 'hi - lo yields exact frequency of 5.',
            ifDeletedError: 'Cannot count occurrences without linear scan.',
          },
        ],
      },
      {
        id: 'py-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Minimum Capacity to Ship Packages Within D Days',
        englishParagraphs: [
          'Binary search capacity between max(weights) and sum(weights) using a greedy simulation predicate.',
        ],
        banglaParagraphs: [
          'সর্বোচ্চ ওজন থেকে মোট ওজন পর্যন্ত বাইনারি সার্চ করে D দিনে ডেলিভারির সর্বনিম্ন ক্যাপাসিটি বের করো।',
        ],
        memoryDiagram: `lo=max(w)=5, hi=sum(w)=15 -> ans=6`,
        code: `import sys

def can_ship(w: list[int], days: int, cap: int) -> bool:
    used, cur = 1, 0
    for x in w:
        if cur + x > cap:
            used += 1
            cur = 0
        cur += x
    return used <= days

nums = list(map(int, sys.stdin.read().split()))
n, d = nums[0], nums[1]
w = nums[2:2 + n]
lo, hi = max(w), sum(w)
ans = hi
while lo <= hi:
    mid = (lo + hi) // 2
    if can_ship(w, d, mid):
        ans = mid
        hi = mid - 1
    else:
        lo = mid + 1
print(ans)`,
        stdin: '5 3\n1 2 3 4 5',
        expectedOutput: '6',
        lineByLine: [
          {
            lineNumber: 'Line 18',
            codeSnippet: 'mid = (lo + hi) // 2',
            whatItMeans: 'Splits current search interval cleanly using integer floor division.',
            whyItIsThere: 'Halves candidate space every iteration.',
            ifDeletedError: 'Loop lacks midpoint test.',
          },
        ],
      },
      {
        id: 'py-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Interval Scheduling With Custom Sort Key',
        englishParagraphs: [
          'Sort intervals by (end, start) tuple key to maximize non-overlapping bookings greedily.',
        ],
        banglaParagraphs: [
          'মিটিংয়ের শেষ সময় (end) ধরে সর্ট করলে গ্রিডি পদ্ধতিতে সর্বোচ্চ নন-ওভারল্যাপিং স্লট পাওয়া যায়।',
        ],
        memoryDiagram: `sorted(iv, key=lambda p: (p[1], p[0])) -> greedy count`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
iv = [(nums[1 + 2*i], nums[2 + 2*i]) for i in range(n)]
iv.sort(key=lambda p: (p[1], p[0]))
last_end = -10**18
cnt = 0
for s, e in iv:
    if s >= last_end:
        cnt += 1
        last_end = e
print(cnt)`,
        stdin: '4\n1 5\n2 3\n3 6\n5 8',
        expectedOutput: '2',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'iv.sort(key=lambda p: (p[1], p[0]))',
            whatItMeans: 'Sorts interval tuples by finish time ascending.',
            whyItIsThere: 'Greedy earliest-finish choice is provably optimal.',
            ifDeletedError: 'Arbitrary input order misses valid combinations.',
          },
        ],
      },
      {
        id: 'py-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Exact Integer Binary Search vs. Floating-Point math.sqrt Drift',
        englishParagraphs: [
          'float(math.isqrt) or integer binary search avoids 53-bit float precision errors for integers > 2^53.',
        ],
        banglaParagraphs: [
          'অনেক বড় সংখ্যায় float sqrt নির্ভুল থাকে না; বাইনারি সার্চে সবসময় নিখুঁত পূর্ণসংখ্যার উত্তর পাওয়া যায়।',
        ],
        memoryDiagram: `lo=0, hi=n -> mid * mid <= n exact integer arithmetic`,
        code: `import sys

n = int(sys.stdin.read().strip())
lo, hi, ans = 0, n, 0
while lo <= hi:
    mid = (lo + hi) // 2
    if mid * mid <= n:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)`,
        stdin: '50',
        expectedOutput: '7',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'if mid * mid <= n:',
            whatItMeans: 'Tests exact arbitrary-precision integer square against n.',
            whyItIsThere: 'Zero IEEE-754 mantissa rounding error.',
            ifDeletedError: 'No monotonic condition drives search direction.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'from bisect import bisect_left, bisect_right',
        whatItMeans: 'Imports C-implemented O(log n) binary search helpers.',
        whyItIsThere: 'Avoids re-implementing index searches on sorted lists.',
        ifDeletedError: 'NameError: name bisect_left is not defined.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'a = sorted([9, 5, 2, 5, 5])',
        whatItMeans: 'Produces a new sorted list [2, 5, 5, 5, 9] in O(n log n).',
        whyItIsThere: 'bisect requires a sorted ascending list.',
        ifDeletedError: 'bisect returns invalid positions on unsorted lists.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'lo = bisect_left(a, 5)',
        whatItMeans: 'Finds leftmost insertion index for 5 in sorted list a.',
        whyItIsThere: 'Resolves start index in O(log n).',
        ifDeletedError: 'lo boundary is undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'hi = bisect_right(a, 5)',
        whatItMeans: 'Finds rightmost boundary strictly after 5.',
        whyItIsThere: 'hi - lo yields exact frequency of 5.',
        ifDeletedError: 'Cannot count occurrences without linear scan.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'lo=5, hi=15, mid=10', memoryOrStack: 'can_ship(10)=True', note: 'ans=10, hi=9' },
      { step: 2, state: 'lo=5, hi=9, mid=7', memoryOrStack: 'can_ship(7)=True', note: 'ans=7, hi=6' },
      { step: 3, state: 'lo=5, hi=6, mid=5', memoryOrStack: 'can_ship(5)=False', note: 'lo=6' },
      { step: 4, state: 'lo=6, hi=6, mid=6', memoryOrStack: 'can_ship(6)=True', note: 'ans=6, hi=5 -> exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using bisect on an Unsorted List',
        brokenCode: `idx = bisect_left([9, 1, 5], 5)`,
        fixedCode: `a = sorted([9, 1, 5]); idx = bisect_left(a, 5)`,
        whyItBreaks: 'bisect inspects only midpoints assuming ascending order and returns garbage otherwise.',
      },
      {
        title: 'Using / Instead of // in Binary Search Midpoint',
        brokenCode: `mid = (lo + hi) / 2`,
        fixedCode: `mid = (lo + hi) // 2`,
        whyItBreaks: 'Single slash produces floats like 5.5, causing TypeError on list indexing and bad comparisons.',
      },
      {
        title: 'Starting lo = 0 When Predicate Requires At Least max(weights)',
        brokenCode: `lo, hi = 0, sum(w)`,
        fixedCode: `lo, hi = max(w), sum(w)`,
        whyItBreaks: 'A capacity smaller than the heaviest single item makes can_ship trap or miscount days.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-21-p1',
        difficulty: 'Easy',
        title: 'First Index & Count via bisect',
        prompt: 'Read n, target x, and n integers; sort and print first index and count (-1 0 if absent).',
        banglaHint: 'ইঙ্গিত: bisect_left এবং bisect_right ব্যবহার করো।',
        starterCode: `import sys\nfrom bisect import bisect_left, bisect_right\nnums = list(map(int, sys.stdin.read().split()))\nn, x = nums[0], nums[1]\na = sorted(nums[2:2 + n])\nlo, hi = bisect_left(a, x), bisect_right(a, x)\nprint("-1 0" if lo == hi else f"{lo} {hi - lo}")`,
        sampleStdin: '6 4\n7 4 1 4 9 4',
        expectedOutput: '1 3',
      },
      {
        id: 'py-ch-21-p2',
        difficulty: 'Easy',
        title: 'Integer Floor Square Root',
        prompt: 'Compute floor(sqrt(n)) via binary search without float rounding.',
        banglaHint: 'ইঙ্গিত: while lo <= hi লুপে mid * mid <= n পরীক্ষা করো।',
        starterCode: `import sys\nn = int(sys.stdin.read().strip())\nlo, hi, ans = 0, n, 0\nwhile lo <= hi:\n    m = (lo + hi) // 2\n    if m * m <= n: ans = m; lo = m + 1\n    else: hi = m - 1\nprint(ans)`,
        sampleStdin: '101',
        expectedOutput: '10',
      },
      {
        id: 'py-ch-21-p3',
        difficulty: 'Medium',
        title: 'Koko Eating Bananas Speed Search',
        prompt: 'Given n, h, and n piles, compute minimum eating speed k to finish within h hours.',
        banglaHint: 'ইঙ্গিত: প্রতিটি স্তূপে (p + k - 1) // k ঘণ্টা যোগ করে h এর সাথে তুলনা করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, h = nums[0], nums[1]\np = nums[2:2 + n]\nlo, hi = 1, max(p)\nans = hi\nwhile lo <= hi:\n    k = (lo + hi) // 2\n    if sum((x + k - 1) // k for x in p) <= h:\n        ans = k; hi = k - 1\n    else:\n        lo = k + 1\nprint(ans)`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-21-p4',
        difficulty: 'Medium',
        title: 'Max Non-Overlapping Events',
        prompt: 'Given n [start, end] pairs, print maximum non-overlapping meetings.',
        banglaHint: 'ইঙ্গিত: end অনুযায়ী সর্ট করে s >= cur হলে কাউন্ট বাড়াও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn = nums[0]\niv = sorted(((nums[1 + 2*i], nums[2 + 2*i]) for i in range(n)), key=lambda p: p[1])\ncur, ans = -10**18, 0\nfor s, e in iv:\n    if s >= cur: ans += 1; cur = e\nprint(ans)`,
        sampleStdin: '4\n1 4\n2 3\n3 5\n4 6',
        expectedOutput: '2',
      },
      {
        id: 'py-ch-21-p5',
        difficulty: 'Hard',
        title: 'Aggressive Cows Max Min Distance',
        prompt: 'Given n stall coordinates and c cows, find the largest minimum distance between cows.',
        banglaHint: 'ইঙ্গিত: স্টল সর্ট করে সম্ভাব্য দূরত্বের ওপর বাইনারি সার্চ চালাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, c = nums[0], nums[1]\nx = sorted(nums[2:2 + n])\nlo, hi, ans = 1, x[-1] - x[0], 0\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    placed, last = 1, x[0]\n    for pos in x[1:]:\n        if pos - last >= mid:\n            placed += 1; last = pos\n    if placed >= c: ans = mid; lo = mid + 1\n    else: hi = mid - 1\nprint(ans)`,
        sampleStdin: '5 3\n1 2 8 4 9',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Binary Search on Answer Capacity Solver',
      description: 'Find the minimum daily capacity needed to ship ordered packages within D days.',
      banglaGoal: 'Binary Search on Answer ব্যবহার করে নির্দিষ্ট দিনে প্যাক পাঠানোর সর্বনিম্ন ক্যাপাসিটি নির্ণয়।',
      combinesChapters: 'Ch 11, 20, 21',
      starterCode: `import sys\ndef can_ship(w: list[int], days: int, cap: int) -> bool:\n    used, cur = 1, 0\n    for x in w:\n        if cur + x > cap: used += 1; cur = 0\n        cur += x\n    return used <= days\nnums = list(map(int, sys.stdin.read().split()))\nn, d = nums[0], nums[1]\nw = nums[2:2 + n]\nlo, hi = max(w), sum(w)\nans = hi\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if can_ship(w, d, mid): ans = mid; hi = mid - 1\n    else: lo = mid + 1\nprint(ans)`,
      sampleStdin: '5 3\n1 2 3 4 5',
      expectedOutput: '6',
    },
    starterCode: `import sys\ndef can_ship(w: list[int], days: int, cap: int) -> bool:\n    used, cur = 1, 0\n    for x in w:\n        if cur + x > cap: used += 1; cur = 0\n        cur += x\n    return used <= days\nnums = list(map(int, sys.stdin.read().split()))\nn, d = nums[0], nums[1]\nw = nums[2:2 + n]\nlo, hi = max(w), sum(w)\nans = hi\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if can_ship(w, d, mid): ans = mid; hi = mid - 1\n    else: lo = mid + 1\nprint(ans)`,
    sampleStdin: '5 3\n1 2 3 4 5',
    expectedSampleOutput: '6',
    testCases: [
      { id: 'py21-t1', input: '5 3\n1 2 3 4 5', expectedOutput: '6' },
      { id: 'py21-t2', input: '4 2\n10 10 10 10', expectedOutput: '20', isHidden: true },
    ],
  },
  22: {
    chapterNumber: 22,
    title: 'Python Chapter 22: Hashing, Dictionaries, Sets & Sliding Window Frequency',
    banglaTitle: 'Python অধ্যায় ২২: হ্যাশিং, ডিকশনারি, সেট ও স্লাইডিং উইন্ডো ফ্রিকোয়েন্সি',
    subtitle: 'Solve O(n) Two-Sum, longest unique substring, and exact-K subarray sum problems with dict/set hashing and sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Testing every pair or subarray with nested loops takes O(n^2) time and times out as soon as n reaches 10^5. Python dictionaries (dict) and sets (set) use open-addressed hash tables to deliver O(1) expected membership and key lookups.\n\nPairing a running prefix sum with a hash frequency table counts exact-K subarrays—even with negative values—in a single linear pass, while a sliding window [L..R] paired with a last-seen index map solves longest-unique-substring cleanly in O(n).',
      asciiFlowchart: `  Prefix P[r] ---> lookup seen.get(P[r] - K, 0)  (O(1) hash hit!)
        |
        +--> seen[P[r]] = seen.get(P[r], 0) + 1
        |
  Window [L..R]: advance L when duplicate enters active window`,
      pseudocode: [
        '1. SEED hash dictionary cnt = {0: 1} before iterating prefix sums',
        '2. UPDATE running prefix += x for every element',
        '3. ADD cnt.get(prefix - k, 0) to subarray match count',
        '4. RECORD cnt[prefix] = cnt.get(prefix, 0) + 1 in O(1)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুপারশপের বারকোড স্ক্যানার ও চলমান জানালা (Hashing + Sliding Window)',
        explanation:
          'ধরো একটি বিশাল গুদামে লাখ লাখ বইয়ের মধ্য থেকে একটি নির্দিষ্ট বই খুঁজতে বলা হলো। প্রতিটি শেলফ খুঁজতে গেলে দিন পার হয়ে যাবে, কিন্তু কম্পিউটারের হ্যাশ টেবিল (dict ও set) বইয়ের নাম দেখেই ঠিক কোন তাকে আছে তা O(1) সময়ে বলে দেয়। এই O(1) লুকআপ ক্ষমতা দিয়ে আমরা O(n^2)-এর কঠিন সমস্যাগুলোকে মুহূর্তেই O(n)-এ নামিয়ে আনতে পারি। যেমন Two-Sum সমস্যায় প্রতিটি সংখ্যা x-এর জন্য target - x আগে এসেছে কি না হ্যাশ ম্যাপে খুঁজলেই হয়। আবার সাব-অ্যারের যোগফল K গুনে বের করতে Prefix Sum ও dict একসাথে কাজ করে: নেগেটিভ সংখ্যা থাকলেও pref - k আগে কতবার এসেছে তা দেখলেই উত্তর মেলে! স্ট্রিংয়ে পুনরাবৃত্তি ছাড়া সবচেয়ে বড় অংশ খুঁজতে দুই দিকের পয়েন্টার L এবং R দিয়ে স্লাইডিং উইন্ডো চালানো হয়। তবে মনে রাখবে, Python সেট বা ডিকশনারির কী হতে হলে অবজেক্টটি অবশ্যই immutable বা hashable হতে হবে—যেমন tuple কী হতে পারে, কিন্তু list পারে না।',
        everydayExample: 'লাইব্রেরির কল-নম্বর কার্ড: বইয়ের শিরোনাম হ্যাশ করে সরাসরি ঠিক শেলফের নম্বর পেয়ে যাওয়া।',
        keyTakeaways: [
          'in অপারেটর list-এ O(n), কিন্তু set ও dict-এ O(1) সময়ে কাজ করে।',
          'Prefix-Sum সাব-অ্যারে গণনায় শুরুতে cnt = {0: 1} রাখা বাধ্যতামূলক।',
          'স্লাইডিং উইন্ডোতে ডুপ্লিকেট পেলে L-কে কখনো পেছনে নেওয়া যাবে না (L = max(L, last[c] + 1))।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'O(n) Two-Sum With Dictionary Lookup',
        englishParagraphs: [
          'Store each element’s index in a dict after checking if (target - x) already exists in O(1) expected time.',
        ],
        banglaParagraphs: [
          'dict-এ আগে দেখা সংখ্যার ইনডেক্স রেখে O(n) সময়ে Two-Sum সমাধান করো।',
        ],
        memoryDiagram: `seen = {2: 0} -> x=7 checks (9-7=2 in seen) -> prints "0 1"`,
        code: `nums = [2, 7, 11, 15]
target = 9
seen: dict[int, int] = {}
for i, x in enumerate(nums):
    need = target - x
    if need in seen:
        print(seen[need], i)
        break
    seen[x] = i`,
        stdin: '',
        expectedOutput: '0 1',
        lineByLine: [
          {
            lineNumber: 'Line 6',
            codeSnippet: 'if need in seen:',
            whatItMeans: 'Performs O(1) expected hash lookup in dictionary seen.',
            whyItIsThere: 'Avoids nested loop to find matching earlier number.',
            ifDeletedError: 'Cannot detect matching pair.',
          },
        ],
      },
      {
        id: 'py-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Subarray Sums Equals K Using Prefix Hash Map',
        englishParagraphs: [
          'Seed cnt = {0: 1}, accumulate prefix sums, and add cnt.get(pref - k, 0) per element.',
        ],
        banglaParagraphs: [
          'cnt = {0: 1} সেট করে চলমান যোগফল থেকে pref - k কতবার এসেছে তা যোগ করো।',
        ],
        memoryDiagram: `cnt={0:1} -> x=1,2,-1,1,2 -> ans=3`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
n, k = nums[0], nums[1]
cnt: dict[int, int] = {0: 1}
pref = ans = 0
for x in nums[2:2 + n]:
    pref += x
    ans += cnt.get(pref - k, 0)
    cnt[pref] = cnt.get(pref, 0) + 1
print(ans)`,
        stdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'cnt: dict[int, int] = {0: 1}',
            whatItMeans: 'Counts prefix sum 0 once before scanning elements.',
            whyItIsThere: 'Allows subarrays starting at index 0 to match pref == k.',
            ifDeletedError: 'Prefixes directly equaling k from index 0 are ignored.',
          },
        ],
      },
      {
        id: 'py-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Substring Without Repeating Characters',
        englishParagraphs: [
          'Track last index of each character in a dict and clamp L forward so duplicates drop cleanly.',
        ],
        banglaParagraphs: [
          'প্রতিটি অক্ষরের শেষ অবস্থান dict-এ রেখে ডুপ্লিকেট বাদ দিয়ে সর্বোচ্চ দৈর্ঘ্য বের করো।',
        ],
        memoryDiagram: `last[ch]=idx -> if last.get(ch, -1) >= L: L = last[ch] + 1`,
        code: `import sys

s = sys.stdin.read().strip()
last: dict[str, int] = {}
L = best = 0
for R, ch in enumerate(s):
    if last.get(ch, -1) >= L:
        L = last[ch] + 1
    last[ch] = R
    best = max(best, R - L + 1)
print(best)`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          {
            lineNumber: 'Line 7',
            codeSnippet: 'if last.get(ch, -1) >= L:',
            whatItMeans: 'Checks if duplicate occurred inside the active [L..R] window.',
            whyItIsThere: 'Prevents shrinking L backward to stale indices.',
            ifDeletedError: 'Window includes repeated characters.',
          },
        ],
      },
      {
        id: 'py-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. Production Pattern',
        title: 'Set Lookup O(1) vs. List Membership Scan O(n)',
        englishParagraphs: [
          'Checking x in big_list inside a loop triggers O(n^2) TLE; convert to a set once for O(1) checks.',
        ],
        banglaParagraphs: [
          'বড় লিস্টের ওপর বারবার x in my_list চালালে O(n^2) হয়ে যায়; সবসময় set ব্যবহার করবে।',
        ],
        memoryDiagram: `x in list -> O(n) linear scan | x in set -> O(1) hash lookup`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
a = set(nums[1:1 + n])
b = nums[2 + n:]
hits = sum(1 for x in set(b) if x in a)
print(hits)`,
        stdin: '4 10 20 30 40 3 20 50 40',
        expectedOutput: '2',
        lineByLine: [
          {
            lineNumber: 'Line 5',
            codeSnippet: 'a = set(nums[1:1 + n])',
            whatItMeans: 'Builds O(1)-lookup hash set from first array.',
            whyItIsThere: 'Makes intersection check O(n + m) instead of O(n * m).',
            ifDeletedError: 'Lookup drops to quadratic time on lists.',
          },
        ],
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'seen: dict[int, int] = {}',
        whatItMeans: 'Initializes hash map mapping value -> array index.',
        whyItIsThere: 'Replaces inner O(n) scan with O(1) complement lookup.',
        ifDeletedError: 'seen dict undefined.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'need = target - x',
        whatItMeans: 'Computes required partner value.',
        whyItIsThere: 'Turns sum x + y == target into direct equality query y == target - x.',
        ifDeletedError: 'need variable undefined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'if need in seen:',
        whatItMeans: 'Performs O(1) expected hash lookup in dictionary seen.',
        whyItIsThere: 'Avoids nested loop to find matching earlier number.',
        ifDeletedError: 'Cannot detect matching pair.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'seen[x] = i',
        whatItMeans: 'Stores current number after checking complement.',
        whyItIsThere: 'Prevents element i from pairing with itself.',
        ifDeletedError: 'Subsequent numbers cannot find x.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'init cnt={0:1}, pref=0', memoryOrStack: 'cnt={0:1}, ans=0', note: 'Seed zero prefix' },
      { step: 2, state: 'x=1 -> pref=1', memoryOrStack: 'get(1-3=-2, 0)=0', note: 'cnt[1]=1' },
      { step: 3, state: 'x=2 -> pref=3', memoryOrStack: 'get(3-3=0, 0)=1', note: 'ans=1, cnt[3]=1' },
      { step: 4, state: 'x=-1,1,2 -> pref=3,4,6', memoryOrStack: 'hits at 0 and 3', note: 'Total ans=3' },
    ],
    harryBugTraps: [
      {
        title: 'Using list Instead of set for Repeated "in" Membership Checks',
        brokenCode: `for x in queries: if x in seen_list: ... # O(N^2)!`,
        fixedCode: `seen_set = set(seen_list)\nfor x in queries: if x in seen_set: ... # O(N)`,
        whyItBreaks: 'Membership on Python lists scans element-by-element linearly.',
      },
      {
        title: 'Using a Mutable list as a dict Key',
        brokenCode: `groups[[1, 2]] = 5`,
        fixedCode: `groups[(1, 2)] = 5`,
        whyItBreaks: 'Lists are unhashable and immediately raise TypeError: unhashable type: list.',
      },
      {
        title: 'Forgetting L = max(L, last[ch] + 1) in Unique Substring Window',
        brokenCode: `L = last[ch] + 1`,
        fixedCode: `if last.get(ch, -1) >= L: L = last[ch] + 1`,
        whyItBreaks: 'Occurrences left of L pull the sliding window backward into stale duplicates.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-22-p1',
        difficulty: 'Easy',
        title: 'Distinct Count via Set',
        prompt: 'Read n and n integers; print count of distinct values.',
        banglaHint: 'ইঙ্গিত: set()-এ ভরে len() প্রিন্ট করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nprint(len(set(nums[1:1 + nums[0]])))`,
        sampleStdin: '6\n10 20 10 30 20 40',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-22-p2',
        difficulty: 'Easy',
        title: 'Two-Sum Indices',
        prompt: 'Read n, target, and n integers; print first 0-based pair i j summing to target.',
        banglaHint: 'ইঙ্গিত: dict-এ প্রতিটি সংখ্যার ইনডেক্স রেখে target - x আগে আছে কি না দেখো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, target = nums[0], nums[1]\nseen = {}\nfor i, x in enumerate(nums[2:2 + n]):\n    if target - x in seen:\n        print(seen[target - x], i); break\n    seen[x] = i`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'py-ch-22-p3',
        difficulty: 'Medium',
        title: 'Longest Unique Substring Length',
        prompt: 'Print length of longest substring without repeating characters.',
        banglaHint: 'ইঙ্গিত: last dict-এ শেষ ইনডেক্স রেখে L ও R আপডেট করো।',
        starterCode: `import sys\ns = sys.stdin.read().strip()\nlast = {}; L = best = 0\nfor R, ch in enumerate(s):\n    if last.get(ch, -1) >= L: L = last[ch] + 1\n    last[ch] = R; best = max(best, R - L + 1)\nprint(best)`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'py-ch-22-p4',
        difficulty: 'Medium',
        title: 'At-Most-K Distinct Subarray Length',
        prompt: 'Read n, k, and n integers; print longest subarray length containing <= k distinct values.',
        banglaHint: 'ইঙ্গিত: dict-এ উইন্ডো ফ্রিকোয়েন্সি রেখে len(freq) > k হলে বাম প্রান্ত কমাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]\na = nums[2:2 + n]\nfreq = {}; L = best = 0\nfor R, x in enumerate(a):\n    freq[x] = freq.get(x, 0) + 1\n    while len(freq) > k:\n        freq[a[L]] -= 1\n        if freq[a[L]] == 0: del freq[a[L]]\n        L += 1\n    best = max(best, R - L + 1)\nprint(best)`,
        sampleStdin: '6 2\n1 2 1 2 3 3',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-22-p5',
        difficulty: 'Hard',
        title: 'Subarray Sums Equals K Counter',
        prompt: 'Read n, k, and n integers; print number of subarrays summing to k.',
        banglaHint: 'ইঙ্গিত: cnt = {0: 1} রেখে pref - k কতবার এসেছে যোগ করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]\ncnt = {0: 1}; pref = ans = 0\nfor x in nums[2:2 + n]:\n    pref += x; ans += cnt.get(pref - k, 0); cnt[pref] = cnt.get(pref, 0) + 1\nprint(ans)`,
        sampleStdin: '5 3\n1 2 -1 1 2',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'O(n) Subarray Sum = K Hash Engine',
      description: 'Use prefix sums and a Python hash dict to count exact-K subarrays in linear time.',
      banglaGoal: 'Prefix Sum এবং Python dict দিয়ে O(n) সময়ে K-যোগফল সাব-অ্যারে গণনা করা।',
      combinesChapters: 'Ch 13, 20, 22',
      starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]\ncnt = {0: 1}; pref = ans = 0\nfor x in nums[2:2 + n]:\n    pref += x; ans += cnt.get(pref - k, 0); cnt[pref] = cnt.get(pref, 0) + 1\nprint(ans)`,
      sampleStdin: '5 3\n1 2 -1 1 2',
      expectedOutput: '3',
    },
    starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]\ncnt = {0: 1}; pref = ans = 0\nfor x in nums[2:2 + n]:\n    pref += x; ans += cnt.get(pref - k, 0); cnt[pref] = cnt.get(pref, 0) + 1\nprint(ans)`,
    sampleStdin: '5 3\n1 2 -1 1 2',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'py22-t1', input: '5 3\n1 2 -1 1 2', expectedOutput: '3' },
      { id: 'py22-t2', input: '3 0\n0 0 0', expectedOutput: '6', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'Python Chapter 23 (3.13+): Stacks, deque Queues, Trees & Graph BFS/DFS',
    banglaTitle: 'Python অধ্যায় ২৩ (3.13+): স্ট্যাক, deque কিউ, ট্রি ও গ্রাফ BFS/DFS',
    subtitle: 'O(1) list stacks vs collections.deque queues, monotonic stack NGE, unweighted BFS shortest paths, and DFS recursion/iterative traversal.',
    zeroIntuition: {
      plainEnglishStory:
        'In Python, a plain `list` works cleanly as an O(1) LIFO Stack (`append()` and `pop()`), but calling `list.pop(0)` for a FIFO Queue shifts every element in O(n)—turning a 10^5 BFS into guaranteed Time Limit Exceeded! Always import `collections.deque` so `popleft()` stays strictly O(1).\n\nAlso remember Python sets its default recursion limit to `1000` frames: on chain-like `10^5`-node trees/graphs, recursive DFS triggers `RecursionError` unless you raise `sys.setrecursionlimit` OR write an iterative DFS/BFS!',
      asciiFlowchart: `  Stack (list): append() / pop() -> O(1)
  Queue (deque): append() / popleft() -> O(1)  [NEVER list.pop(0)!]
  BFS(0): dist=[0, -1, ...] -> on neighbor v with dist[v]==-1: set dist[v]=dist[u]+1 BEFORE q.append(v)`,
      pseudocode: [
        '1. USE list.append()/pop() for LIFO Stack; NEVER list.pop(0) for Queue',
        '2. IMPORT collections.deque and use popleft() for O(1) BFS queue',
        '3. MARK visited / dist[v] when pushing onto deque, NOT after popping',
        '4. GUARD recursion depth or use iterative stack for huge 10^5 trees/graphs',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Python লিস্ট স্ট্যাক, deque কিউ ও রিকার্সন সীমার সতর্কতা (BFS/DFS)',
        explanation:
          'Python-এ সাধারণ `list`-এ `append()` এবং `pop()` করলে শেষ থেকে কাজ হয় বলে এটি O(1) সময়ে নিখুঁত স্ট্যাকের মতো চলে। কিন্তু কেউ যদি কিউ (Queue) বানাতে গিয়ে `q.pop(0)` লেখে, তবে প্রথম আইটেম সরানোর পর বাকি ১ লক্ষ আইটেম এক ঘর করে বামে সরাতে (`O(n)`) পুরো কোড TLE খাবে! এর নির্ভুল সমাধান হলো `from collections import deque` ব্যবহার করা, যেখানে `q.popleft()` সবসময়ই O(1)! BFS-এ শর্টেস্ট দূরত্ব বের করতে `dist = [-1] * n` নিয়ে শুরুর নোডে `dist[s] = 0` বসিয়ে কিউতে `append` করবে—আর প্রতিবেশী `v` কিউতে ঢোকানোর সাথে সাথেই `dist[v] = dist[u] + 1` লিখে দেবে, বের করার সময় নয়। আরেকটি বিশেষ Python সতর্কতা হলো রিকার্সন লিমিট: বাই ডিফল্ট Python ১০০০-এর বেশি গভীর ফাংশন কল (`RecursionError`) হতে দেয় না, তাই বড় গ্রাফের DFS-এ `sys.setrecursionlimit(200000)` বাড়িয়ে নিতে বা ইটারেটিভ স্ট্যাক দিয়ে DFS করতে হয়!',
        everydayExample:
          'লম্বা লাইনের প্রথম জনকে বাদ দিলে পেছনের সবাইকে এক কদম সামনে এগোতে হলে প্রচুর সময় নষ্ট হয় (`list.pop(0)`), কিন্তু দ্বিমুখী দরজা (`deque.popleft()`) থাকলে মুহূর্তেই প্রথম জন বেরিয়ে যায়!',
        keyTakeaways: [
          'BFS-এ কখনো `list.pop(0)` ব্যবহার করবে না; সর্বদা `collections.deque` এবং `popleft()` নেবে।',
          'স্ট্যাক থেকে পপ করার আগে `if stack:` যাচাই করবে, নইলে `IndexError` হবে।',
          'গভীর গ্রাফে `RecursionError` এড়াতে ইটারেটিভ স্ট্যাক DFS অথবা `sys.setrecursionlimit` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Balanced Brackets Using O(1) List Stack',
        englishParagraphs: [
          'A `dict` mapping closing brackets to their expected opening mates keeps bracket validation to 10 crystal-clear lines.',
        ],
        banglaParagraphs: [
          'ডিকশনারি ম্যাপ ও লিস্ট স্ট্যাক দিয়ে মাত্র কয়েক লাইনে ব্র্যাকেট ব্যালান্সিং যাচাই।',
        ],
        memoryDiagram: `"{[()]}" -> stack=['{','[','('] -> pops on ) ] } -> empty => VALID`,
        code: `import sys

s = sys.stdin.read().strip()
pair = {")": "(", "]": "[", "}": "{"}
st = []
ok = True
for ch in s:
    if ch in "([{":
        st.append(ch)
    elif not st or st.pop() != pair.get(ch):
        ok = False
        break
print("VALID" if ok and not st else "INVALID")`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'elif not st or st.pop() != pair.get(ch):', whatItMeans: 'Short-circuits empty stack check before calling st.pop().', whyItIsThere: 'Prevents IndexError on unmatched closing brackets.', ifDeletedError: 'Unclosed closer crashes with IndexError.' },
          { lineNumber: 'Line 13', codeSnippet: 'print("VALID" if ok and not st else "INVALID")', whatItMeans: 'Ensures both zero mismatches and empty stack.', whyItIsThere: 'Rejects unclosed openers like "((".', ifDeletedError: 'Misclassifies "((" as VALID.' },
        ],
      },
      {
        id: 'py-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(V + E) Shortest-Path BFS With collections.deque',
        englishParagraphs: [
          'Building `adj = [[] for _ in range(n)]` and queuing with `deque([0])` computes shortest hops cleanly in linear time.',
        ],
        banglaParagraphs: [
          '`collections.deque`-এর `popleft()` দিয়ে গ্রাফের শর্টেস্ট দূরত্ব O(V+E) সময়ে বের করা হয়েছে।',
        ],
        memoryDiagram: `0-1, 0-2, 1-3 -> dist=[0, 1, 1, 2]`,
        code: `import sys
from collections import deque

nums = list(map(int, sys.stdin.read().split()))
if nums:
    n, m = nums[0], nums[1]
    adj = [[] for _ in range(n)]
    idx = 2
    for _ in range(m):
        u, v = nums[idx], nums[idx + 1]
        idx += 2
        adj[u].append(v)
        adj[v].append(u)
    dist = [-1] * n
    dist[0] = 0
    q = deque([0])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    print(" ".join(map(str, dist)))`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: 'u = q.popleft()', whatItMeans: 'Dequeues next vertex in guaranteed O(1) time.', whyItIsThere: 'Avoids O(n) shift cost of list.pop(0).', ifDeletedError: 'BFS degrades to quadratic O(V^2) runtime.' },
        ],
      },
      {
        id: 'py-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Monotonic Stack: Next Greater Element in O(n)',
        englishParagraphs: [
          'Storing unresolved indices in `st` resolves each smaller prior bar as soon as a taller bar arrives.',
        ],
        banglaParagraphs: [
          'মনোটনিক স্ট্যাকে ইনডেক্স রেখে প্রতিটি সংখ্যার ডানের প্রথম বড় মান O(n) সময়ে নির্ণয়।',
        ],
        memoryDiagram: `[4, 5, 2, 25] -> [5, 25, 25, -1]`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if nums:
    n = nums[0]
    a = nums[1:1 + n]
    ans = [-1] * n
    st = []
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            ans[st.pop()] = x
        st.append(i)
    print(" ".join(map(str, ans)))`,
        stdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'while st and a[st[-1]] < x:', whatItMeans: 'Pops every index whose value is strictly smaller than x.', whyItIsThere: 'Each element enters and leaves stack once -> O(n) total.', ifDeletedError: 'Fails to resolve prior smaller elements.' },
        ],
      },
      {
        id: 'py-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Iterative DFS Connected Components (Zero RecursionError)',
        englishParagraphs: [
          'Using an explicit Python `list` stack for DFS guarantees ZERO `RecursionError` even on a 100,000-node straight line graph!',
        ],
        banglaParagraphs: [
          'রিকার্সনের বদলে সরাসরি স্ট্যাক দিয়ে ইটারেটিভ DFS চালালে ১ লক্ষ নোডের লম্বা গ্রাফেও কখনো `RecursionError` হয় না।',
        ],
        memoryDiagram: `stack DFS from unvisited i -> marks full component in O(V+E)`,
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
if nums:
    n, m = nums[0], nums[1]
    adj = [[] for _ in range(n)]
    for k in range(2, 2 + 2 * m, 2):
        u, v = nums[k], nums[k + 1]
        adj[u].append(v)
        adj[v].append(u)
    vis = [False] * n
    comps = 0
    for i in range(n):
        if not vis[i]:
            comps += 1
            vis[i] = True
            st = [i]
            while st:
                u = st.pop()
                for v in adj[u]:
                    if not vis[v]:
                        vis[v] = True
                        st.append(v)
    print(comps)`,
        stdin: '5 2\n0 1\n2 3',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 22', codeSnippet: 'if not vis[v]: vis[v] = True; st.append(v)', whatItMeans: 'Marks node visited upon stack push cleanly.', whyItIsThere: 'Avoids pushing duplicate neighbors.', ifDeletedError: 'Cycle spins indefinitely.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 's = sys.stdin.read().strip()', whatItMeans: 'Reads full bracket expression cleanly without trailing newline.', whyItIsThere: 'Handles whitespace safely.', ifDeletedError: 'NameError: s not defined.' },
      { lineNumber: 'Line 4', codeSnippet: 'pair = {")": "(", "]": "[", "}": "{"}', whatItMeans: 'Constant lookup table matching closers to openers.', whyItIsThere: 'Eliminates repetitive nested if chains.', ifDeletedError: 'NameError: pair not defined.' },
      { lineNumber: 'Line 8', codeSnippet: 'if ch in "([{": st.append(ch)', whatItMeans: 'Pushes opening bracket onto LIFO stack in O(1).', whyItIsThere: 'Tracks innermost unclosed opener.', ifDeletedError: 'Stack remains empty.' },
      { lineNumber: 'Line 10', codeSnippet: 'elif not st or st.pop() != pair.get(ch):', whatItMeans: 'Checks non-empty stack then pops top and verifies match.', whyItIsThere: 'Prevents IndexError and detects mismatches.', ifDeletedError: 'Runtime crash on extra closer.' },
      { lineNumber: 'Line 13', codeSnippet: 'print("VALID" if ok and not st else "INVALID")', whatItMeans: 'Requires balanced empty stack at end.', whyItIsThere: 'Rejects unclosed openers like "((".', ifDeletedError: 'Zero output emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{[("', memoryOrStack: "st = ['{', '[', '(']", note: 'Openers pushed LIFO' },
      { step: 2, state: 'Read ")"', memoryOrStack: "st.pop() == '(' matches", note: "st = ['{', '[']" },
      { step: 3, state: 'Read "]}"', memoryOrStack: 'Matches "[" then "{"', note: 'st is empty' },
      { step: 4, state: 'Check ok and not st', memoryOrStack: 'True -> stdout = VALID', note: 'Clean completion' },
    ],
    harryBugTraps: [
      {
        title: 'Using list.pop(0) Instead of collections.deque.popleft()',
        brokenCode: 'q = [0]; u = q.pop(0) # O(n) every pop -> TLE at n=10^5!',
        fixedCode: 'from collections import deque\nq = deque([0])\nprint(q.popleft())',
        whyItBreaks: 'Python list stores contiguous elements, so popping index 0 shifts every remaining item left in O(n).',
      },
      {
        title: 'Using [[]] * n to Build Adjacency Lists (Shared Sublist Bug!)',
        brokenCode: 'adj = [[]] * 4\nadj[0].append(1) # Appends 1 to ALL 4 lists!',
        fixedCode: 'adj = [[] for _ in range(4)]\nadj[0].append(1)\nprint(adj)',
        whyItBreaks: '[[]] * n copies the SAME inner list reference n times instead of creating n independent lists.',
      },
      {
        title: 'Calling st.pop() on Empty Stack Without Guard',
        brokenCode: 'st = []; top = st.pop() # IndexError!',
        fixedCode: 'st = []\nprint(st.pop() if st else "EMPTY")',
        whyItBreaks: 'Popping an empty list raises unhandled IndexError immediately.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-23-q1',
        difficulty: 'Easy',
        title: '1. Reverse Sequence Using Stack',
        prompt: 'Read n and n ints; push into list stack and pop to print reversed space-separated integers.',
        banglaHint: '`st.append(x)` করে শেষে `while st: out.append(st.pop())` চালাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn = nums[0]\nst = nums[1:1 + n]\nout = []\nwhile st:\n    out.append(str(st.pop()))\nprint(" ".join(out))`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'py-ch-23-q2',
        difficulty: 'Easy',
        title: '2. Queue Rotation Survivor (Josephus)',
        prompt: 'Read n and k; rotate a `deque(range(1, n+1))` k-1 times and remove k-th until 1 remains.',
        banglaHint: '`deque`-এর `q.rotate(-(k - 1))` বা `q.append(q.popleft())` ব্যবহার করো।',
        starterCode: `import sys\nfrom collections import deque\nn, k = map(int, sys.stdin.read().split())\nq = deque(range(1, n + 1))\nwhile len(q) > 1:\n    for _ in range(k - 1):\n        q.append(q.popleft())\n    q.popleft()\nprint(q[0])`,
        sampleStdin: '5 2',
        expectedOutput: '3',
      },
      {
        id: 'py-ch-23-q3',
        difficulty: 'Medium',
        title: '3. Next Greater Element (Monotonic Stack)',
        prompt: 'Read n and array; output first greater value to the right of each index or -1.',
        banglaHint: 'স্ট্যাকে ইনডেক্স জমা রেখে `a[st[-1]] < x` হলে পপ করে উত্তর বসাও।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn = nums[0]; a = nums[1:1 + n]\nans = [-1] * n; st = []\nfor i, x in enumerate(a):\n    while st and a[st[-1]] < x:\n        ans[st.pop()] = x\n    st.append(i)\nprint(" ".join(map(str, ans)))`,
        sampleStdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
      },
      {
        id: 'py-ch-23-q4',
        difficulty: 'Medium',
        title: '4. Shortest Distance S to T via BFS',
        prompt: 'Read n, m, S, T and m edges; print shortest edge count from S to T or -1.',
        banglaHint: '`deque([S])` দিয়ে BFS চালিয়ে `dist[T]` প্রিন্ট করো।',
        starterCode: `import sys\nfrom collections import deque\nnums = list(map(int, sys.stdin.read().split()))\nn, m, S, T = nums[0], nums[1], nums[2], nums[3]\nadj = [[] for _ in range(n)]\nfor i in range(4, 4 + 2 * m, 2):\n    adj[nums[i]].append(nums[i + 1]); adj[nums[i + 1]].append(nums[i])\ndist = [-1] * n; dist[S] = 0; q = deque([S])\nwhile q:\n    u = q.popleft()\n    for v in adj[u]:\n        if dist[v] == -1:\n            dist[v] = dist[u] + 1; q.append(v)\nprint(dist[T])`,
        sampleStdin: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
      },
      {
        id: 'py-ch-23-q5',
        difficulty: 'Hard',
        title: '5. Tree Height via Iterative BFS Level Sweep',
        prompt: 'Read n nodes (0..n-1) rooted at 0 and n-1 edges; print max distance from root 0.',
        banglaHint: '`0` থেকে BFS চালিয়ে সব নোডের সর্বোচ্চ `dist` (`max(dist)`) প্রিন্ট করো।',
        starterCode: `import sys\nfrom collections import deque\nnums = list(map(int, sys.stdin.read().split()))\nn = nums[0]\nadj = [[] for _ in range(n)]\nfor i in range(1, 1 + 2 * (n - 1), 2):\n    adj[nums[i]].append(nums[i + 1]); adj[nums[i + 1]].append(nums[i])\ndist = [-1] * n; dist[0] = 0; q = deque([0])\nwhile q:\n    u = q.popleft()\n    for v in adj[u]:\n        if dist[v] == -1:\n            dist[v] = dist[u] + 1; q.append(v)\nprint(max(dist))`,
        sampleStdin: '5\n0 1\n0 2\n1 3\n3 4',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Stack & deque BFS Graph Analyzer',
      description: 'Validates balanced delimiters and solves shortest graph path with O(1) deque queues.',
      banglaGoal: 'লিস্ট স্ট্যাক ও `collections.deque` দিয়ে ব্র্যাকেট যাচাই ও গ্রাফ শর্টেস্ট পাথ সমাধান।',
      combinesChapters: 'Ch 1–23',
      starterCode: `import sys\nfrom collections import deque\nnums = list(map(int, sys.stdin.read().split()))\nif nums:\n    n, m = nums[0], nums[1]\n    adj = [[] for _ in range(n)]\n    for i in range(2, 2 + 2 * m, 2):\n        adj[nums[i]].append(nums[i + 1]); adj[nums[i + 1]].append(nums[i])\n    dist = [-1] * n; dist[0] = 0; q = deque([0])\n    while q:\n        u = q.popleft()\n        for v in adj[u]:\n            if dist[v] == -1:\n                dist[v] = dist[u] + 1; q.append(v)\n    print(" ".join(map(str, dist)))`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `import sys\ns = sys.stdin.read().strip()\npair = {")": "(", "]": "[", "}": "{"}\nst = []; ok = True\nfor ch in s:\n    if ch in "([{": st.append(ch)\n    elif not st or st.pop() != pair.get(ch): ok = False; break\nprint("VALID" if ok and not st else "INVALID")`,
    sampleStdin: '{[()]}',
    expectedSampleOutput: 'VALID',
    testCases: [
      { id: 'py23-t1', input: '{[()]}', expectedOutput: 'VALID' },
      { id: 'py23-t2', input: '([)]', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'Python Chapter 24 (3.13+): Context Managers, Exceptions, Asyncio & Modules',
    banglaTitle: 'Python অধ্যায় ২৪ (3.13+): কনটেক্সট ম্যানেজার, এক্সেপশন, Asyncio ও মডিউল',
    subtitle: 'with open() cleanup, narrow try/except ZeroDivisionError/ValueError, asyncio.gather concurrency, and clean module guards.',
    zeroIntuition: {
      plainEnglishStory:
        'Python manages external handles via context managers (`with open(...) as f:`) so OS descriptors close automatically even when exceptions fire midway! Never write bare `except:`—catching broad `BaseException` accidentally swallows `KeyboardInterrupt`! Always catch exact error classes like `(ValueError, ZeroDivisionError)`.\n\nFor I/O-heavy applications (fetching APIs or inspecting streams), sequential `await` executes slowly one after another (`t1 + t2`), whereas `asyncio.gather()` schedules coroutines concurrently (`max(t1, t2)`). And guarding reusable files with `if __name__ == "__main__":` lets modules be cleanly imported without triggering scripts.',
      asciiFlowchart: `  try: parse_row(line)
    |-- ValueError / ZeroDivisionError --> structured error string, loop continues!
    +-- clean data ----------------------> append result; context manager auto-closes handles`,
      pseudocode: [
        '1. WRAP resource handles in `with ...:` context managers for leak-proof teardown',
        '2. CATCH specific exceptions like (ValueError, ZeroDivisionError), NEVER bare except:',
        '3. PARSE untrusted streams defensively with try/except per record',
        '4. RUN concurrent async jobs cleanly via asyncio.gather() + __main__ guards',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় `with` কনটেক্সট, নিখুঁত এক্সেপশন ও `asyncio` কনকারেন্সি (Python)',
        explanation:
          'Python-এ ফাইল খুলে কাজ শেষে `close()` ভুলে গেলে মেমোরি ও ফাইল ডেসক্রিপ্টর লিক হয়—তাই সবসময় `with open(...) as f:` (Context Manager) ব্যবহার করতে হয়, যা এরর হলেও ফাইল আপনাআপনি বন্ধ করে দেয়! এরর হ্যান্ডলিংয়ের সময় কখনোই খালি `except:` লিখবে না; বরং নির্দিষ্ট এরর যেমন `except (ValueError, ZeroDivisionError):` ধরবে যাতে অপ্রত্যাশিত প্রোগ্রামিং ভুল চাপা পড়ে না যায়। এছাড়াও একাধিক নেটওয়ার্ক কল বা I/O কাজ একটার পর একটা (`await`) না করে `asyncio.gather()` দিয়ে একসাথে চালালে মোট সময় অনেক কমে যায়। আর বড় প্রজেক্টে মডিউল ভাগ করার সময় অবশ্যই `if __name__ == "__main__":` গার্ড বসাবে যাতে অন্য ফাইলে `import` করলে মেইন কোড নিজে থেকেই চলে না ওঠে!',
        everydayExample: 'হোটেল থেকে বের হওয়ার সময় চাবি জমা না দিলেও `with` সিস্টেমে দরজা আপনাআপনি লক হয়ে যাওয়া এবং চুলায় ভাত আর ডাল একসাথে (`asyncio.gather`) বসানো!',
        keyTakeaways: [
          'কখনো খালি `except:` লিখবে না; সর্বদা সুনির্দিষ্ট `except ValueError:` বা `except Exception as e:` ধরবে।',
          '`with` স্টেটমেন্ট যেকোনো ফাইল বা স্ট্রিম হ্যান্ডেল এক্সেপশন হলেও স্বয়ংক্রিয়ভাবে বন্ধ করে।',
          '`asyncio.gather()` একাধিক অ্যাসিঙ্ক টাস্ক সমান্তরালে চালিয়ে latency অনেক কমিয়ে দেয়।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Narrow try/except (ValueError, ZeroDivisionError) Handler',
        englishParagraphs: [
          'Catching exact error types lets valid arithmetic succeed while malformed inputs or zero divisors emit clear diagnostic tokens cleanly.',
        ],
        banglaParagraphs: [
          'খালি `except:` না লিখে সুনির্দিষ্ট `ValueError` ও `ZeroDivisionError` হ্যান্ডল করার সঠিক রীতি।',
        ],
        memoryDiagram: `safe_div("20", "4") -> "OK:5" | safe_div("20", "0") -> "ERR_DIV_ZERO"`,
        code: `import sys

def safe_div(a_str: str, b_str: str) -> str:
    try:
        a = int(a_str)
        b = int(b_str)
        return f"OK:{a // b}"
    except ZeroDivisionError:
        return "ERR_DIV_ZERO"
    except ValueError:
        return "ERR_VALUE"

parts = sys.stdin.read().split()
if len(parts) >= 2:
    print(safe_div(parts[0], parts[1]))`,
        stdin: '20 4',
        expectedOutput: 'OK:5',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'except ZeroDivisionError:', whatItMeans: 'Handles division by zero specifically without hiding syntax/type bugs.', whyItIsThere: 'Preserves clean failure differentiation.', ifDeletedError: 'Zero divisor crashes script.' },
        ],
      },
      {
        id: 'py-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Resilient In-Memory File Stream (io.StringIO + with Context)',
        englishParagraphs: [
          'Using `with io.StringIO(...) as stream:` mimics disk file parsing deterministically inside single-file judges with automatic teardown.',
        ],
        banglaParagraphs: [
          '`with` কনটেক্সট ম্যানেজার দিয়ে ইনপুট স্ট্রিম পড়ে প্রতিটি লাইনের ত্রুটি আলাদাভাবে যাচাই।',
        ],
        memoryDiagram: `with StringIO(stdin) as f -> parses "4 6"->SUM=10, "bad"->SKIP_INVALID`,
        code: `import io
import sys

raw = sys.stdin.read()
with io.StringIO(raw) as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            a, b = map(int, line.split())
            print(f"SUM={a + b}")
        except ValueError:
            print("SKIP_INVALID")`,
        stdin: '4 6\nbad_line\n10 5',
        expectedOutput: 'SUM=10\nSKIP_INVALID\nSUM=15',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'with io.StringIO(raw) as f:', whatItMeans: 'Opens a stream inside deterministic RAII context.', whyItIsThere: 'Closes stream automatically on exit.', ifDeletedError: 'Must manually close resource.' },
        ],
      },
      {
        id: 'py-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Concurrent Coroutines With asyncio.gather()',
        englishParagraphs: [
          'Wrapping async worker tasks in `asyncio.gather(*tasks)` runs independent I/O waits concurrently and collects results in input order!',
        ],
        banglaParagraphs: [
          '`asyncio.gather()` দিয়ে একাধিক অ্যাসিঙ্ক টাস্ক একসাথে চালিয়ে অর্ডার বজায় রেখে ফলাফল সংগ্রহ।',
        ],
        memoryDiagram: `asyncio.run(main()) -> gather(worker(10), worker(20), worker(30)) -> sum=60`,
        code: `import asyncio
import sys

async def run_job(x: int) -> int:
    await asyncio.sleep(0)
    return x

async def main() -> None:
    nums = list(map(int, sys.stdin.read().split()))
    n = nums[0] if nums else 0
    results = await asyncio.gather(*(run_job(x) for x in nums[1:1 + n]))
    print(sum(results))

if __name__ == "__main__":
    asyncio.run(main())`,
        stdin: '3\n10 20 30',
        expectedOutput: '60',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'results = await asyncio.gather(*(run_job(x) for x in nums[1:1 + n]))', whatItMeans: 'Schedules all coroutines concurrently on the event loop.', whyItIsThere: 'Avoids sequential latency stacking.', ifDeletedError: 'Results list missing.' },
        ],
      },
      {
        id: 'py-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom __enter__/__exit__ Context Guard (Rollback Safety)',
        englishParagraphs: [
          'Implementing `__enter__` and `__exit__` lets custom transactions roll back automatically whenever an exception interrupts the `with` block.',
        ],
        banglaParagraphs: [
          'নিজস্ব কনটেক্সট ম্যানেজার ক্লাস বানিয়ে এক্সেপশন ঘটলে অটোমেটিক রোলব্যাক নিশ্চিত করার পদ্ধতি।',
        ],
        memoryDiagram: `with Tx("DB") -> raises error -> __exit__ sees exc_type -> emits ROLLBACK`,
        code: `import sys

class Tx:
    def __init__(self, name: str):
        self.name = name
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"{self.name}:{'ROLLBACK' if exc_type else 'COMMIT'}")
        return True

mode = sys.stdin.read().strip()
with Tx("DB"):
    if mode == "fail":
        raise RuntimeError("boom")`,
        stdin: 'fail',
        expectedOutput: 'DB:ROLLBACK',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'def __exit__(self, exc_type, exc_val, exc_tb):', whatItMeans: 'Teardown hook invoked cleanly whether block succeeded or raised.', whyItIsThere: 'Automates commit vs rollback cleanup.', ifDeletedError: 'TypeError: object does not support context manager protocol.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'def safe_div(a_str: str, b_str: str) -> str:', whatItMeans: 'Type-annotated helper wrapping risky parsing and division.', whyItIsThere: 'Encapsulates validation cleanly.', ifDeletedError: 'Function safe_div undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'try:', whatItMeans: 'Marks protected execution scope.', whyItIsThere: 'Prevents raw errors from crashing script.', ifDeletedError: 'Syntax error with except clauses.' },
      { lineNumber: 'Line 7', codeSnippet: 'return f"OK:{a // b}"', whatItMeans: 'Formats integer quotient when divisor != 0.', whyItIsThere: 'Standardizes success output.', ifDeletedError: 'Returns None on success.' },
      { lineNumber: 'Line 8', codeSnippet: 'except ZeroDivisionError:', whatItMeans: 'Catches zero divisor cleanly.', whyItIsThere: 'Returns predictable ERR_DIV_ZERO tag.', ifDeletedError: 'Uncaught ZeroDivisionError crash.' },
      { lineNumber: 'Line 10', codeSnippet: 'except ValueError:', whatItMeans: 'Catches non-numeric string conversion failure.', whyItIsThere: 'Handles bad user tokens gracefully.', ifDeletedError: 'Non-digits crash script.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call safe_div("20", "4")', memoryOrStack: 'a=20, b=4', note: 'Valid integer parse' },
      { step: 2, state: 'Compute 20 // 4', memoryOrStack: '5 (no ZeroDivisionError)', note: 'Returns "OK:5"' },
      { step: 3, state: 'On "20", "0"', memoryOrStack: '20 // 0 raises ZeroDivisionError', note: 'Caught cleanly -> "ERR_DIV_ZERO"' },
      { step: 4, state: 'print output', memoryOrStack: 'stdout="OK:5"', note: 'Clean exit 0' },
    ],
    harryBugTraps: [
      {
        title: 'Writing Bare except: (Masks Bugs & Ctrl+C)',
        brokenCode: 'try: x = int(s)\nexcept: pass # swallows everything including typos!',
        fixedCode: 'try:\n    x = int("bad")\nexcept ValueError:\n    print("INVALID_INT")',
        whyItBreaks: 'Bare except catches SystemExit and KeyboardInterrupt as well as hidden NameError typos.',
      },
      {
        title: 'Awaiting Independent Async Tasks Sequentially',
        brokenCode: 'a = await job1()\nb = await job2() # takes t1 + t2 instead of max(t1, t2)!',
        fixedCode: 'import asyncio\nasync def f(v): return v\nasync def run(): print(await asyncio.gather(f(1), f(2)))\nasyncio.run(run())',
        whyItBreaks: 'Sequential awaits block on each I/O turn individually instead of running concurrently on the event loop.',
      },
      {
        title: 'Using open() Without a `with` Context Block',
        brokenCode: 'f = open("missing.txt")\ndata = f.read() # never closed if error hits before f.close()!',
        fixedCode: 'try:\n    with open("missing.txt") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print("SAFE_HANDLED")',
        whyItBreaks: 'Exceptions raised before manual f.close() leak open OS file descriptors.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-24-q1',
        difficulty: 'Easy',
        title: '1. Safe Integer Division Wrapper',
        prompt: 'Read two tokens a and b; print `OK:<a//b>` or `ERR_DIV_ZERO` using specific exception blocks.',
        banglaHint: '`try` ভেতরে `int()` ও `a // b` করো এবং `except ZeroDivisionError:` ধরো।',
        starterCode: `import sys\np = sys.stdin.read().split()\ntry:\n    print(f"OK:{int(p[0]) // int(p[1])}")\nexcept ZeroDivisionError:\n    print("ERR_DIV_ZERO")`,
        sampleStdin: '20 4',
        expectedOutput: 'OK:5',
      },
      {
        id: 'py-ch-24-q2',
        difficulty: 'Easy',
        title: '2. Fault-Tolerant Multi-Line Pair Summer',
        prompt: 'Read lines from stdin; output `a + b` for valid two-integer lines or `BAD` on `ValueError`.',
        banglaHint: 'প্রতি লাইনের জন্য `try: a, b = map(int, line.split())` এবং `except ValueError:` লিখো।',
        starterCode: `import sys\nfor line in sys.stdin.read().splitlines():\n    if not line.strip(): continue\n    try:\n        a, b = map(int, line.split())\n        print(a + b)\n    except ValueError:\n        print("BAD")`,
        sampleStdin: '3 7\nhello\n10 -2',
        expectedOutput: '10\nBAD\n8',
      },
      {
        id: 'py-ch-24-q3',
        difficulty: 'Medium',
        title: '3. Strict Float-Safe Config Parser',
        prompt: 'Read n key=int tokens; catch invalid numbers with `except ValueError` and print total sum of valid values.',
        banglaHint: 'প্রতিটি টোকেন `=` দিয়ে ভেঙে মানটিকে `int()` করার সময় `ValueError` সামলাও।',
        starterCode: `import sys\ntokens = sys.stdin.read().split()\ntotal = 0\nfor t in tokens[1:]:\n    try:\n        _, v = t.split("=")\n        total += int(v)\n    except ValueError:\n        pass\nprint(total)`,
        sampleStdin: '3\na=10 b=abc c=25',
        expectedOutput: '35',
      },
      {
        id: 'py-ch-24-q4',
        difficulty: 'Medium',
        title: '4. Asyncio Concurrent Sum via gather()',
        prompt: 'Read n and n ints; run an `async def double(x)` coroutine concurrently via `asyncio.gather` and print sum.',
        banglaHint: '`asyncio.gather(*(double(x) for x in arr))` ব্যবহার করে মোট যোগফল প্রিন্ট করো।',
        starterCode: `import asyncio\nimport sys\nasync def double(x: int) -> int:\n    await asyncio.sleep(0)\n    return x * 2\nasync def main() -> None:\n    nums = list(map(int, sys.stdin.read().split()))\n    res = await asyncio.gather(*(double(x) for x in nums[1:1 + nums[0]]))\n    print(sum(res))\nasyncio.run(main())`,
        sampleStdin: '3\n2 4 6',
        expectedOutput: '24',
      },
      {
        id: 'py-ch-24-q5',
        difficulty: 'Hard',
        title: '5. Custom Context Manager Transaction Guard',
        prompt: 'Implement a class with `__enter__`/`__exit__` that prints `COMMIT` normally or `ROLLBACK` on `fail`.',
        banglaHint: '`__exit__`-এ `exc_type is not None` হলে `ROLLBACK` প্রিন্ট করে `return True` দাও।',
        starterCode: `import sys\nclass Guard:\n    def __enter__(self): return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print("ROLLBACK" if exc_type else "COMMIT")\n        return True\nmode = sys.stdin.read().strip()\nwith Guard():\n    if mode == "fail": raise RuntimeError("err")`,
        sampleStdin: 'fail',
        expectedOutput: 'ROLLBACK',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Resilient Exception & Context Pipeline',
      description: 'Validates division & stream parsing safely with narrow exception classes and clean exit codes.',
      banglaGoal: 'সুনির্দিষ্ট এক্সেপশন ও কনটেক্সট ম্যানেজার দিয়ে নিরাপদ ডেটা প্রসেসিং পাইপলাইন তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `import sys\ndef safe_div(a_str: str, b_str: str) -> str:\n    try:\n        return f"OK:{int(a_str) // int(b_str)}"\n    except ZeroDivisionError:\n        return "ERR_DIV_ZERO"\n    except ValueError:\n        return "ERR_VALUE"\nparts = sys.stdin.read().split()\nif len(parts) >= 2:\n    print(safe_div(parts[0], parts[1]))`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `import sys\ndef safe_div(a_str: str, b_str: str) -> str:\n    try:\n        return f"OK:{int(a_str) // int(b_str)}"\n    except ZeroDivisionError:\n        return "ERR_DIV_ZERO"\n    except ValueError:\n        return "ERR_VALUE"\nparts = sys.stdin.read().split()\nif len(parts) >= 2:\n    print(safe_div(parts[0], parts[1]))`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'py24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'py24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'Python Chapter 25 (3.13+): Full-Stack Website Architecture Blueprint (Mega Capstone)',
    banglaTitle: 'Python অধ্যায় ২৫ (3.13+): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ব্লুপ্রিন্ট (মেগা ক্যাপস্টোন)',
    subtitle: 'FastAPI/Flask routing patterns, dict dispatch tables, json.dumps serialization, rate limiting, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'Python powers modern web backends (FastAPI, Django, Flask) and AI API gateways by sitting cleanly between HTML/React clients and relational/vector databases. Every browser request enters as an HTTP verb + path + payload (`POST /api/add 15 27`), passes through auth/validation middleware, resolves a route handler inside a dictionary dispatch table, and returns serialized JSON via `json.dumps()`.\n\nIn this Python 3.13 Mega Capstone, you unify all 25 chapters—data structures, dicts, functions, sliding rate-limiters, and clean exception boundaries—into an end-to-end HTTP Router and JSON API engine.',
      asciiFlowchart: `  [ Client HTTP Request: "POST /api/add 15 27" ]
         |
         v  (Method Gate -> Dict Route Table -> json.dumps(..., separators=(",", ":")))
  [ 200 {"sum":42} | 404 {"error":"not_found"} | 405 MethodNotAllowed ]`,
      pseudocode: [
        '1. PARSE HTTP request fields (method, path, a, b) from stdin tokens',
        '2. VALIDATE allowed HTTP methods ("GET", "POST") -> reject others with 405',
        '3. DISPATCH routes via dictionary table (/health, /api/add) or return 404 JSON',
        '4. SERIALIZE deterministic compact JSON using json.dumps(..., separators=(",", ":"))',
      ],
      banglaZeroToHero: {
        analogyTitle: 'FastAPI/Django ব্যাকএন্ড, ডিকশনারি রাউটিং ও JSON ইঞ্জিন (Mega Capstone)',
        explanation:
          'বিশ্বের বেশিরভাগ আধুনিক AI এবং ওয়েব ব্যাকএন্ড (FastAPI, Django, Flask) পাইথন দিয়েই তৈরি! যখন একটি ব্রাউজার বা মোবাইল অ্যাপ সার্ভারে ক্লিক করে, তখন সেটি HTTP মেথড (`GET`/`POST`), URL পাথ (`/api/add`) ও ডেটা পাঠায়। পাইথন সার্ভার প্রথমে দেখে মেথডটি অনুমোদিত কি না—ভুল মেথড হলে `405 MethodNotAllowed` ফেরত দেয়। এরপর একটি `dict` রাউট টেবিল থেকে সঠিক ফাংশনটি খুঁজে চালিয়ে পাইথনের নিজস্ব `json.dumps()` দিয়ে নিখুঁত JSON স্ট্রিং তৈরি করে! মনে রাখবে, কখনোই হাতে স্ট্রিং জোড়া লাগিয়ে JSON বানাবে না, কারণ ইউজার ইনপুটে ডাবল কোট থাকলে ফরম্যাট ভেঙে যাবে—`json.dumps(..., separators=(",", ":"))` সবকিছু নিরাপদে এস্কেপ করে কমপ্যাক্ট JSON দেয়! এছাড়া উৎপাদনশীল এপিআই-তে প্রতি ইউজারের রিকোয়েস্ট সংখ্যা নিয়ন্ত্রণ করতে `deque` দিয়ে স্লাইডিং উইন্ডো রেট-লিমিটার বসানো হয়। এই মেগা ক্যাপস্টোনে তুমি ১ থেকে ২৪ অধ্যায়ের সব শেখা টুল একসাথে জুড়ে একটি পূর্ণাঙ্গ পাইথন API সার্ভার সিমুলেটর বানাবে!',
        everydayExample:
          'সচিবালয়ের রিসিপশনিস্ট (`dict` রাউট টেবিল) আবেদনপত্রের ধরন (`GET`/`POST`) ও বিভাগ (`/api/add`) দেখে সঠিক অফিসে পাঠিয়ে সিলমোহর (`json.dumps`) দিয়ে ফিরিয়ে দেয়!',
        keyTakeaways: [
          'JSON বানাতে সর্বদা `json.dumps(..., separators=(",", ":"))` ব্যবহার করবে, ম্যানুয়াল স্ট্রিং কনক্যাটেনেশন নয়।',
          'মেথড ও অথেন্টিকেশন চেক সর্বদা রাউট হ্যান্ডলারের আগে মিডলওয়্যার লেভেলে করবে।',
          '`dict` রাউট টেবিল ও `collections.deque` রেট-লিমিটার দিয়ে উচ্চ-ক্ষমতাসম্পন্ন ব্যাকএন্ড বানানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Parsing HTTP Request Lines Into Typed Named Records',
        englishParagraphs: [
          'Splitting `"GET /health HTTP/1.1"` cleanly unpacks HTTP method, path, and protocol version for middleware inspection.',
        ],
        banglaParagraphs: [
          'HTTP রিকোয়েস্ট লাইন ভেঙে `method` ও `path` আলাদা করে নেওয়ার পরিচ্ছন্ন পদ্ধতি এটি।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> method='GET', path='/health'`,
        code: `raw = "GET /health HTTP/1.1"
parts = raw.split()
if len(parts) >= 2:
    method, path = parts[0], parts[1]
    print(f"method={method} path={path}")`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'parts = raw.split()', whatItMeans: 'Splits request line by whitespace into verb, path, and protocol.', whyItIsThere: 'Decouples raw HTTP wire text from application logic.', ifDeletedError: 'NameError: parts is not defined.' },
        ],
      },
      {
        id: 'py-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Safe JSON Serialization With json.dumps()',
        englishParagraphs: [
          'Using Python’s standard `json.dumps` guarantees valid escaping and clean compact JSON via `separators=(",", ":")`.',
        ],
        banglaParagraphs: [
          '`json.dumps` ব্যবহার করলে বিশেষ অক্ষর নিরাপদে এস্কেপ হয় এবং নিখুঁত JSON তৈরি হয়।',
        ],
        memoryDiagram: `"argon 95" -> HTTP/1.1 200 OK + {"user":"argon","score":95}`,
        code: `import json, sys
parts = sys.stdin.read().split()
if len(parts) >= 2:
    payload = json.dumps({"user": parts[0], "score": int(parts[1])}, separators=(",", ":"))
    print("HTTP/1.1 200 OK")
    print(payload)`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'payload = json.dumps({"user": parts[0], "score": int(parts[1])}, separators=(",", ":"))', whatItMeans: 'Serializes Python dict into compact valid JSON.', whyItIsThere: 'Prevents broken quotes and spacing discrepancies.', ifDeletedError: 'Payload variable missing.' },
        ],
      },
      {
        id: 'py-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Auth Middleware & Dictionary Route Table',
        englishParagraphs: [
          'Mapping paths in a dictionary (`routes[path]`) mimics Flask/FastAPI route registration cleanly without bloated conditional trees.',
        ],
        banglaParagraphs: [
          'মিডলওয়্যারে `secret` টোকেন যাচাই করে `routes` ডিকশনারি থেকে সঠিক ফাংশন কল করা হয়েছে।',
        ],
        memoryDiagram: `req -> auth check -> routes.get(path) -> 200 / 404`,
        code: `import json, sys
routes = {
    "/health": lambda: "200 " + json.dumps({"ok": True}, separators=(",", ":")),
    "/version": lambda: "200 " + json.dumps({"ver": "py313"}, separators=(",", ":")),
}
parts = sys.stdin.read().split()
if len(parts) >= 2:
    path, tok = parts[0], parts[1]
    if tok != "secret":
        print("401 Unauthorized")
    else:
        handler = routes.get(path)
        print(handler() if handler else "404 NotFound")`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'handler = routes.get(path)', whatItMeans: 'Looks up route handler safely in O(1) without raising KeyError.', whyItIsThere: 'Allows fallback to 404 NotFound.', ifDeletedError: 'Raises KeyError on unknown routes.' },
        ],
      },
      {
        id: 'py-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Router & JSON API Engine',
        englishParagraphs: [
          'Processes batched requests (`METHOD /path a b`), enforces HTTP verbs (`405`), dispatches `/health` & `/api/add`, and formats exact compact JSON responses (`200` / `404`).',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন: একাধিক HTTP রিকোয়েস্ট পড়ে মেথড যাচাই, ডিকশনারি রাউটিং ও `json.dumps` রেসপন্স জেনারেটর!',
        ],
        memoryDiagram: `Batch Stream -> Verb Check -> Route Match -> Compact JSON Output`,
        code: `import json, sys
tokens = sys.stdin.read().split()
if tokens:
    n = int(tokens[0])
    for i in range(n):
        base = 1 + 4 * i
        method, path, a, b = tokens[base], tokens[base + 1], int(tokens[base + 2]), int(tokens[base + 3])
        if method not in ("GET", "POST"):
            print("405 MethodNotAllowed")
        elif path == "/health":
            print("200 " + json.dumps({"status": "ok"}, separators=(",", ":")))
        elif path == "/api/add":
            print("200 " + json.dumps({"sum": a + b}, separators=(",", ":")))
        else:
            print("404 " + json.dumps({"error": "not_found"}, separators=(",", ":")))`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'if method not in ("GET", "POST"):', whatItMeans: 'Rejects disallowed HTTP verbs before dispatching handlers.', whyItIsThere: 'Implements REST API method validation.', ifDeletedError: 'DELETE/PUT execute route logic silently.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'raw = "GET /health HTTP/1.1"', whatItMeans: 'Simulated raw HTTP request status line.', whyItIsThere: 'Demonstrates parsing incoming web requests.', ifDeletedError: 'NameError: raw not defined.' },
      { lineNumber: 'Line 2', codeSnippet: 'parts = raw.split()', whatItMeans: 'Tokenizes request string on whitespace.', whyItIsThere: 'Extracts HTTP method, route path, and version.', ifDeletedError: 'NameError: parts not defined.' },
      { lineNumber: 'Line 3', codeSnippet: 'if len(parts) >= 2:', whatItMeans: 'Guards against malformed or empty request lines.', whyItIsThere: 'Prevents IndexError on truncated packets.', ifDeletedError: 'Crashes on blank input lines.' },
      { lineNumber: 'Line 4', codeSnippet: 'method, path = parts[0], parts[1]', whatItMeans: 'Tuple unpacking assigns request verb and URL route.', whyItIsThere: 'Clarifies downstream handler signatures.', ifDeletedError: 'Variables method/path undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'print(f"method={method} path={path}")', whatItMeans: 'Prints formatted request metadata.', whyItIsThere: 'Verifies parser extracted fields properly.', ifDeletedError: 'No stdout produced.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "GET /health 0 0"', memoryOrStack: 'method="GET", path="/health"', note: 'GET allowed' },
      { step: 2, state: 'Match "/health"', memoryOrStack: 'json.dumps({"status":"ok"})', note: 'Prints 200 {"status":"ok"}' },
      { step: 3, state: 'Read "POST /api/add 15 27"', memoryOrStack: 'a+b = 42', note: 'Prints 200 {"sum":42}' },
      { step: 4, state: 'Read "GET /unknown 0 0"', memoryOrStack: 'No route matched', note: 'Prints 404 {"error":"not_found"}' },
    ],
    harryBugTraps: [
      {
        title: 'Using str(dict) Instead of json.dumps(dict) for JSON Responses',
        brokenCode: `print(str({"ok": True})) # Prints "{'ok': True}" (single quotes & capitalized True -> INVALID JSON!)`,
        fixedCode: `import json\nprint(json.dumps({"ok": True}, separators=(",", ":")))`,
        whyItBreaks: 'Python dict stringification uses single quotes and True/False; browsers reject it as invalid JSON.',
      },
      {
        title: 'Indexing routes[path] Without .get() on Missing URLs',
        brokenCode: `handler = routes["/missing"] # KeyError crashes the whole server worker!`,
        fixedCode: `routes = {"/health": 200}\nprint(routes.get("/missing", 404))`,
        whyItBreaks: 'Direct dict indexing raises unhandled KeyError on client 404 requests.',
      },
      {
        title: 'Evaluating Query Expressions With eval() (Critical RCE Vulnerability)',
        brokenCode: `val = eval(user_query) # Remote Code Execution vulnerability!`,
        fixedCode: `val = int("42")\nprint(val)`,
        whyItBreaks: 'Never pass user query params into eval(); parse strictly with int(), json.loads(), or urllib.parse.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-25-q1',
        difficulty: 'Easy',
        title: 'HTTP Status Code Labeler',
        prompt: 'Read int code (200, 404, 500) and print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: 'ইঙ্গিত: ডিকশনারি ম্যাপ `{200: "OK", 404: "NOT_FOUND"}.get(c, "SERVER_ERR")` ব্যবহার করো।',
        starterCode: `c = int(input().strip())\nprint({200: "OK", 404: "NOT_FOUND"}.get(c, "SERVER_ERR"))`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'py-ch-25-q2',
        difficulty: 'Easy',
        title: 'Compact JSON Serializer',
        prompt: 'Read key and integer val; emit compact JSON `{"<key>":<val>}`.',
        banglaHint: 'ইঙ্গিত: `json.dumps({k: int(v)}, separators=(",", ":"))` ব্যবহার করো।',
        starterCode: `import json, sys\nk, v = sys.stdin.read().split()\nprint(json.dumps({k: int(v)}, separators=(",", ":")))`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'py-ch-25-q3',
        difficulty: 'Medium',
        title: 'Query Parameter Extractor',
        prompt: 'Read query string like `id=42&mode=pro`; print integer value of `id`.',
        banglaHint: 'ইঙ্গিত: `&` ও `=` দিয়ে `.split()` করে কী-ভ্যালু ম্যাপ বানাও।',
        starterCode: `q = input().strip()\nparams = dict(p.split("=", 1) for p in q.split("&") if "=" in p)\nprint(params.get("id", ""))`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'py-ch-25-q4',
        difficulty: 'Medium',
        title: 'Sliding-Window API Rate Limiter',
        prompt: 'Read cap and n sorted timestamps; count accepted requests with < cap inside trailing 10s window.',
        banglaHint: 'ইঙ্গিত: `deque` রেখে `t - q[0] >= 10` হলে `popleft()` করো।',
        starterCode: `from collections import deque\nimport sys\nnums = list(map(int, sys.stdin.read().split()))\ncap, n = nums[0], nums[1]\nwin, ok = deque(), 0\nfor t in nums[2:2 + n]:\n    while win and t - win[0] >= 10:\n        win.popleft()\n    if len(win) < cap:\n        win.append(t)\n        ok += 1\nprint(ok)`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'py-ch-25-q5',
        difficulty: 'Hard',
        title: 'In-Memory REST KV Store Simulator',
        prompt: 'Read n commands (`SET id val` or `GET id`); print stored integer for each GET (0 default).',
        banglaHint: 'ইঙ্গিত: একটি `db = {}` ডিকশনারিতে মান সংরক্ষণ করে `db.get(id, 0)` প্রিন্ট করো।',
        starterCode: `import sys\ntokens = sys.stdin.read().split()\nn = int(tokens[0])\ni, db = 1, {}\nfor _ in range(n):\n    cmd = tokens[i]\n    if cmd == "SET":\n        db[int(tokens[i + 1])] = int(tokens[i + 2])\n        i += 3\n    else:\n        print(db.get(int(tokens[i + 1]), 0))\n        i += 2`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): Python 3.13 Full-Stack HTTP Router & JSON Engine',
      description: 'Validates HTTP verbs, dispatches API routes cleanly, and serializes strict JSON responses.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ পাইথন HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `import json, sys\ntokens = sys.stdin.read().split()\nif tokens:\n    n = int(tokens[0])\n    for i in range(n):\n        base = 1 + 4 * i\n        m, p, a, b = tokens[base], tokens[base + 1], int(tokens[base + 2]), int(tokens[base + 3])\n        if m not in ("GET", "POST"): print("405 MethodNotAllowed")\n        elif p == "/health": print("200 " + json.dumps({"status": "ok"}, separators=(",", ":")))\n        elif p == "/api/add": print("200 " + json.dumps({"sum": a + b}, separators=(",", ":")))\n        else: print("404 " + json.dumps({"error": "not_found"}, separators=(",", ":")))`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `import json, sys\ntokens = sys.stdin.read().split()\nif tokens:\n    n = int(tokens[0])\n    for i in range(n):\n        base = 1 + 4 * i\n        m, p, a, b = tokens[base], tokens[base + 1], int(tokens[base + 2]), int(tokens[base + 3])\n        if m not in ("GET", "POST"): print("405 MethodNotAllowed")\n        elif p == "/health": print("200 " + json.dumps({"status": "ok"}, separators=(",", ":")))\n        elif p == "/api/add": print("200 " + json.dumps({"sum": a + b}, separators=(",", ":")))\n        else: print("404 " + json.dumps({"error": "not_found"}, separators=(",", ":")))`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'py25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'py25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};

