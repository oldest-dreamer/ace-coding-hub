import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_PYTHON_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'Python Chapter 11 (Python 3.13): 1D Lists, Slicing & Frequency Counting',
    banglaTitle: 'Python অধ্যায় ১১ (Python 3.13): ১ডি লিস্ট, স্লাইসিং ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Dynamic list memory pointer arrays, O(1) indexing, Counter/dict histograms, and list slicing traps.',
    zeroIntuition: {
      plainEnglishStory:
        'A Python `list` (`nums = [12, 5, 27, 9]`) stores a contiguous array of PyObject pointers under the hood, giving `O(1)` random index access (`nums[i]`), `O(1)` amortized `.append()`, and negative reverse indexing (`nums[-1]`).\n\nFor frequency counting, small non-negative bounded integers use a flat bucket list `freq = [0] * (max_val + 1)`, while arbitrary large numbers or strings use `dict` / `collections.Counter(nums)` in `O(N)` expected time. Watch out for one notorious Python reference trap: `[ [0] * 3 ] * 3` duplicates the *exact same inner list reference* three times!',
      asciiFlowchart: `nums = [12, 5, 27, 9]   (Contiguous PyObject* pointer slots)
   idx:    0     1     2     3
   neg:   -4    -3    -2    -1

Frequency Dict / Bucket:
   Counter([3, 1, 3, 2, 3]) -> {3: 3, 1: 1, 2: 1}  (O(N) time!)`,
      pseudocode: [
        '1. READ array cleanly via nums = list(map(int, input().split()))',
        '2. SEED min/max with nums[0] so negative arrays never break',
        '3. COUNT frequencies via bucket list [0] * (K + 1) or collections.Counter',
        '4. AVOID list comprehension traps like [[0]*C]*R (use [[0]*C for _ in range(R)])',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির বগির তালিকা ও ফ্রিকোয়েন্সি টালি',
        explanation:
          'পাইথনের `list` হলো একটি নমনীয় লকার সারি যেখানে প্রতিটি ঘরের নম্বর `0, 1, 2...` ধরে সোজা `O(1)` সময়ে পৌঁছানো যায়। চমৎকার একটি সুবিধা হলো পেছন দিক থেকে `-1, -2` দিয়েও উপাদান পড়া যায় (`nums[-1]` মানে শেষ উপাদান)! এক লুপেই `sum(nums)`, `max(nums)` কিংবা `min(nums)` বের করা সম্ভব। আর একটি তালিকায় কোন সংখ্যা কতবার এসেছে তা গুনতে ছোট রেঞ্জে `freq = [0] * 101` এবং বড় বা অজানা রেঞ্জে `collections.Counter(nums)` ব্যবহার করলে `O(N)` সময়েই ডুপ্লিকেট বা মোড বের হয়ে যায়। তবে পাইথনে লিস্ট ব্যবহারের দুটি সূক্ষ্ম ফাঁদ আছে: প্রথমত, `freq = [0] * n` কাজ করে কারণ `0` ইমিউটেবল, কিন্তু `grid = [[0] * m] * n` লিখলে সব সারি একই মেমোরি শেয়ার করে—একটা ঘর বদলালে সব সারি বদলে যাবে! এর বদলে সবসময় `[[0] * m for _ in range(n)]` লিখবে। দ্বিতীয়ত, `b = a` করলে নতুন কপি তৈরি হয় না বরং দুটো নাম একই লিস্টকে নির্দেশ করে; সত্যিকারের কপি করতে `b = a.copy()` বা `a[:]` নিতে হয়। আর `nums.pop(0)` বা `x in list` লুপের ভেতর চালালে তা `O(N^2)` হয়ে TLE দেয়। এই নিয়মগুলো মাথায় রাখলে পাইথনে লিস্ট-ভিত্তিক যেকোনো সমস্যাই সহজে সমাধান করতে পারবে।',
        everydayExample:
          'ক্লাসের রোল নম্বরের রেজিস্টার: রোল ৫-এ চোখ রাখলে সাথে সাথে নাম দেখা যায় (`O(1)`), আর প্রতিটি রঙের ভোট আলাদা টালি খাতায় (`Counter`) গোনা হয়।',
        keyTakeaways: [
          'সবসময় `b = a.copy()` ব্যবহার করবে, নতুবা `b = a` আসল লিস্টও বদলে দেবে।',
          'ফ্রিকোয়েন্সি গুনতে ছোট রেঞ্জে `[0] * (M+1)` অথবা `collections.Counter` ব্যবহার করো (`O(N)`)।',
          '২ডি লিস্টে কখনো `[[0]*C]*R` নয়, বরং `[[0]*C for _ in range(R)]` লিখবে।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1D List Traversal, Negative Indexing & Max/Sum',
        englishParagraphs: [
          'Stepping directly over `nums` computes total sum and running maximum in one `O(N)` pass without manual index arithmetic.',
          'Initializing `mx = nums[0]` avoids assuming all inputs are positive.',
        ],
        banglaParagraphs: [
          'লিস্টের ওপর সরাসরি `for x in nums:` লুপ চালিয়ে যোগফল ও সর্বোচ্চ মান একবারেই বের করা যায়।',
          '`mx = nums[0]` দিলে সব সংখ্যা নেগেটিভ হলেও সঠিক উত্তর মেলে।',
        ],
        memoryDiagram: `nums=[12, 5, 27, 9] -> sum=53, max=27`,
        code: `nums = [12, 5, 27, 9]
total = 0
mx = nums[0]
for x in nums:
    total += x
    if x > mx:
        mx = x
print(f"sum={total} max={mx}")`,
        stdin: '',
        expectedOutput: 'sum=53 max=27',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'mx = nums[0]', whatItMeans: 'Seeds maximum from actual list item.', whyItIsThere: 'Protects negative-only inputs.', ifDeletedError: 'NameError: mx undefined.' },
          { lineNumber: 'Line 4', codeSnippet: 'for x in nums:', whatItMeans: 'Iterates directly over each PyObject slot.', whyItIsThere: 'Cleaner and faster than range(len(nums)).', ifDeletedError: 'Loop missing.' },
        ],
      },
      {
        id: 'py-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Frequency Histogram via Bucket / Counter',
        englishParagraphs: [
          'Counting occurrences inside `freq = [0] * 101` runs in exact `O(N)` time.',
          'Scanning `0..100` breaks ties deterministically toward the smallest mode value.',
        ],
        banglaParagraphs: [
          'সীমিত রেঞ্জের (`0..100`) জন্য `[0] * 101` বাকেট অ্যারে খুব দ্রুত কাজ করে।',
          'ছোট থেকে বড় স্ক্যান করলে টাই হলে স্বয়ংক্রিয়ভাবে ছোট মোডটি নির্বাচিত হয়।',
        ],
        memoryDiagram: `[3, 1, 3, 2, 3] -> freq[3] = 3 -> mode=3 count=3`,
        code: `n = int(input())
arr = list(map(int, input().split()))
freq = [0] * 101
for x in arr[:n]:
    if 0 <= x <= 100:
        freq[x] += 1
mode = 0
for v in range(1, 101):
    if freq[v] > freq[mode]:
        mode = v
print(f"mode={mode} count={freq[mode]}")`,
        stdin: '5\n3 1 3 2 3',
        expectedOutput: 'mode=3 count=3',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'freq = [0] * 101', whatItMeans: 'Allocates 101 zero-count buckets.', whyItIsThere: 'O(1) frequency updates per value.', ifDeletedError: 'NameError: freq not defined.' },
        ],
      },
      {
        id: 'py-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'In-Place Reversal & Slicing Rotations',
        englishParagraphs: [
          'Swapping `a[l], a[r] = a[r], a[l]` inward reverses a list in-place with `O(1)` auxiliary memory.',
          'Tuple unpacking in Python performs the swap atomically without a temporary variable.',
        ],
        banglaParagraphs: [
          '`a[l], a[r] = a[r], a[l]` দিয়ে কোনো বাড়তি ভ্যারিয়েবল ছাড়াই লিস্ট ইন-প্লেস উল্টে ফেলা যায়।',
          'এতে বাড়তি স্পেস লাগে মাত্র `O(1)`।',
        ],
        memoryDiagram: `[10, 20, 30, 40] -> [40, 30, 20, 10]`,
        code: `a = [10, 20, 30, 40]
l, r = 0, len(a) - 1
while l < r:
    a[l], a[r] = a[r], a[l]
    l += 1
    r -= 1
print(*a)`,
        stdin: '',
        expectedOutput: '40 30 20 10',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'a[l], a[r] = a[r], a[l]', whatItMeans: 'Tuple-swap symmetric indices.', whyItIsThere: 'In-place O(1) extra space reversal.', ifDeletedError: 'List stays unchanged.' },
        ],
      },
      {
        id: 'py-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Aliased Shallow Copy Trap vs .copy()',
        englishParagraphs: [
          'Assigning `b = a` only copies the reference—mutating `b[0] = 99` mutates `a[0]` too!',
          'Use `b = a.copy()` (or `a[:]`) whenever an independent list clone is needed.',
        ],
        banglaParagraphs: [
          '`b = a` লিখলে নতুন লিস্ট তৈরি হয় না—`b` বদলালে `a`-ও বদলে যায়!',
          'আলাদা কপি বানাতে হলে অবশ্যই `b = a.copy()` বা `a[:]` লিখবে।',
        ],
        memoryDiagram: `b = a (ALIAS!) vs b = a.copy() (INDEPENDENT LIST)`,
        code: `a = [1, 2, 3]
b = a.copy()
b[0] = 99
print(a[0], b[0])`,
        stdin: '',
        expectedOutput: '1 99',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'b = a.copy()', whatItMeans: 'Allocates distinct shallow copy list.', whyItIsThere: 'Prevents mutating original array a.', ifDeletedError: 'b = a prints 99 99.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'nums = [12, 5, 27, 9]', whatItMeans: 'Creates dynamic Python list with 4 integers.', whyItIsThere: 'Holds contiguous sequence of PyObject pointers.', ifDeletedError: 'NameError: nums undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'mx = nums[0]', whatItMeans: 'Initializes maximum to first element.', whyItIsThere: 'Correct even when all values are negative.', ifDeletedError: 'mx = 0 gives wrong answer on negative arrays.' },
      { lineNumber: 'Line 4', codeSnippet: 'for x in nums:', whatItMeans: 'Loops over list elements in O(N).', whyItIsThere: 'Clean Pythonic iteration.', ifDeletedError: 'No aggregation.' },
      { lineNumber: 'Line 8', codeSnippet: 'print(f"sum={total} max={mx}")', whatItMeans: 'Formats and prints aggregate stats.', whyItIsThere: 'Outputs final answer.', ifDeletedError: 'Silent output.' },
    ],
    dryRunTable: [
      { step: 1, state: 'init', memoryOrStack: 'total=0, mx=12', note: 'Start with nums[0]' },
      { step: 2, state: 'x = 5', memoryOrStack: 'total=17, mx=12', note: '5 > 12 false' },
      { step: 3, state: 'x = 27', memoryOrStack: 'total=44, mx=27', note: '27 > 12 true -> update mx' },
      { step: 4, state: 'x = 9', memoryOrStack: 'total=53, mx=27', note: 'Prints sum=53 max=27' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Duplicating Mutable Lists via * Operator', brokenCode: `grid = [[0] * 3] * 3\ngrid[0][0] = 5 # mutates ALL 3 rows!`, fixedCode: `grid = [[0] * 3 for _ in range(3)]\ngrid[0][0] = 5`, whyItBreaks: '* repeats the reference to the exact same inner list object.' },
      { title: 'Trap 2: Aliasing b = a Instead of .copy()', brokenCode: `b = a; b.sort() # also sorts a!`, fixedCode: `b = sorted(a) # or b = a.copy()`, whyItBreaks: 'Assignment only binds a second variable name to the same list.' },
      { title: 'Trap 3: Removing Items While Iterating Forward', brokenCode: `for x in nums: if x == 0: nums.remove(x) # skips elements!`, fixedCode: `nums = [x for x in nums if x != 0]`, whyItBreaks: 'Mutating a list shifts indices leftward during iteration, skipping adjacent elements.' },
    ],
    practiceSheet: [
      { id: 'py-ch11-p1', difficulty: 'Easy', title: 'List Min & Max', prompt: 'Read N and N integers, print `min max`.', banglaHint: '`min(a)` ও `max(a)` ব্যবহার করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\nprint(min(a), max(a))`, sampleStdin: '4\n-5 12 3 9', expectedOutput: '-5 12' },
      { id: 'py-ch11-p2', difficulty: 'Easy', title: 'Reverse Order Print', prompt: 'Print N input integers in reverse order.', banglaHint: '`a[::-1]` স্লাইসিং বা `reversed(a)` ব্যবহার করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\nprint(*a[::-1])`, sampleStdin: '4\n1 2 3 4', expectedOutput: '4 3 2 1' },
      { id: 'py-ch11-p3', difficulty: 'Medium', title: 'Distinct Element Count', prompt: 'Count how many unique numbers appear in N inputs.', banglaHint: '`len(set(a))` অথবা ফ্রিকোয়েন্সি বাকেট ব্যবহার করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\nprint(len(set(a)))`, sampleStdin: '6\n5 2 5 9 2 1', expectedOutput: '4' },
      { id: 'py-ch11-p4', difficulty: 'Medium', title: 'Second Largest Distinct Element', prompt: 'Print second largest strictly smaller than max (or -1 if none).', banglaHint: '`m1` ও `m2` ট্র্যাক করো বা `sorted(set(a))` দেখো।', starterCode: `n = int(input())\na = sorted(set(list(map(int, input().split()))[:n]))\nprint(a[-2] if len(a) >= 2 else -1)`, sampleStdin: '5\n10 20 20 8 15', expectedOutput: '15' },
      { id: 'py-ch11-p5', difficulty: 'Hard', title: 'Missing Number in 1..N', prompt: 'Given N and N-1 unique numbers from 1..N, find the missing one in O(N).', banglaHint: '`n*(n+1)//2 - sum(a)` ব্যবহার করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))\nprint(n * (n + 1) // 2 - sum(a))`, sampleStdin: '5\n1 2 4 5', expectedOutput: '3' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Mode & Frequency Counter',
      description: 'Build an O(N) frequency bucket array over [0, 100] and report the mode value and frequency.',
      banglaGoal: 'বাকেট ফ্রিকোয়েন্সি অ্যারে দিয়ে `O(N)` সময়ে মোড নির্ণয় করো।',
      combinesChapters: 'Python Ch 1–11',
      starterCode: `n = int(input())
arr = list(map(int, input().split()))
freq = [0] * 101
for x in arr[:n]:
    if 0 <= x <= 100:
        freq[x] += 1
mode = 0
for v in range(1, 101):
    if freq[v] > freq[mode]:
        mode = v
print(f"mode={mode} count={freq[mode]}")`,
      sampleStdin: '5\n3 1 3 2 3',
      expectedOutput: 'mode=3 count=3',
    },
    starterCode: `n = int(input())
arr = list(map(int, input().split()))
freq = [0] * 101
for x in arr[:n]:
    if 0 <= x <= 100:
        freq[x] += 1
mode = 0
for v in range(1, 101):
    if freq[v] > freq[mode]:
        mode = v
print(f"mode={mode} count={freq[mode]}")`,
    sampleStdin: '5\n3 1 3 2 3',
    expectedSampleOutput: 'mode=3 count=3',
    testCases: [
      { id: 'py11-t1', input: '5\n3 1 3 2 3', expectedOutput: 'mode=3 count=3' },
      { id: 'py11-t2', input: '4\n7 7 2 2', expectedOutput: 'mode=2 count=2', isHidden: true },
    ],
  },
  12: {
    chapterNumber: 12,
    title: 'Python Chapter 12 (Python 3.13): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'Python অধ্যায় ১২ (Python 3.13): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিক',
    subtitle: 'Opposite-end pointer convergence, O(N) fixed K-windows, and variable non-negative shrinking.',
    zeroIntuition: {
      plainEnglishStory:
        'A double loop over pairs `(l, r)` in Python times out rapidly past `N = 3000`. Two Pointers replaces that quadratic scan with `O(N)` linear work whenever order/monotonicity lets us discard one whole row or column per step.\n\nIn a Sliding Window of size `K`, reusing the previous sum (`win += a[i] - a[i - k]`) avoids calling `sum(a[i-k+1:i+1])`—which would secretly copy a slice of size `K` every iteration (`O(N * K)`!). Track just running integers and index pointers `l`, `r` for pure `O(N)` CPython speed.',
      asciiFlowchart: `Sorted Two-Sum [2, 4, 7, 10, 15], target=14
   l=0 (2) + r=4 (15) = 17 > 14 -> r -= 1
   l=0 (2) + r=3 (10) = 12 < 14 -> l += 1
   l=1 (4) + r=3 (10) = 14 == target -> FOUND!

Fixed Window K=3:
   sum(a[0:3]) once, then win += a[i] - a[i - k] (NO slice copying!)`,
      pseudocode: [
        '1. TWO POINTERS: start l = 0, r = len(a) - 1 on sorted list',
        '2. ADVANCE l += 1 if a[l]+a[r] < target, else r -= 1',
        '3. SLIDING WINDOW: compute sum(a[:k]) once, then slide += a[i] - a[i-k]',
        '4. VARIABLE WINDOW: expand r; while sum > S subtract a[l] and l += 1',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই প্রান্তের ক্লিপ ও স্লাইসিং ছাড়া চলন্ত জানালা',
        explanation:
          'পাইথনে লিস্ট স্লাইস `sum(a[i:i+k])` লেখা দেখতে খুব সহজ মনে হলেও প্রতি ধাপে এটি `k`-সংখ্যক উপাদান নতুন করে কপি ও যোগ করে—ফলে সময় লেগে যায় `O(N * K)` যা বড় ইনপুটে TLE দেয়! তার বদলে **Sliding Window** কৌশলে একবার প্রথম `k`টি যোগ করার পর পরের ধাপে কেবল `win += a[i] - a[i - k]` লিখলেই `O(N)` সময়ে কাজ শেষ হয়। একইভাবে সাজানো তালিকায় নির্দিষ্ট যোগফল খুঁজতে **Two Pointers** পদ্ধতিতে `l = 0` ও `r = n - 1` বসিয়ে যোগফল বড় হলে `r -= 1` এবং ছোট হলে `l += 1` করলে মাত্র এক পাসে উত্তর মেলে। আর পজিটিভ সংখ্যার তালিকায় যোগফল `<= S` রেখে সবচেয়ে বড় সাব-অ্যারে খুঁজতে ডান পয়েন্টার `r` এগিয়ে নেওয়া হয় এবং যোগফল `S` ছাড়ালে `while total > S:` লুপে `l += 1` করে বাঁ দিক ছাড়া হয়। প্রতিটি উপাদান একবার ঢোকে ও একবার বের হয় বলে মোট কাজ থাকে মাত্র `O(N)`। কোড করার সময় অবশ্যই খেয়াল রাখবে যেন কখনো `l <= r` ভুল করে একই উপাদান দুবার না ধরে এবং অসাজানো ইনপুটে Two-Pointer চালানোর আগে `.sort()` করে নেওয়া হয়।',
        everydayExample:
          'স্লাইডিং দরজার মতো: ভেতরে একজনের জায়গা খালি করতে ডান পাশ দিয়ে একজন ঢুকলে বাঁ পাশ দিয়ে একজন বের হয়ে যায়—পুরো দল নতুন করে গুনতে হয় না।',
        keyTakeaways: [
          'লুপের ভেতর `sum(a[i:i+k])` লিখবে না (`O(N*K)`), বরং `win += a[i] - a[i-k]` (`O(N)`) ব্যবহার করো।',
          'দুটি ভিন্ন উপাদানের টু-পয়েন্টারে শর্ত সবসময় `while l < r:` রাখবে।',
          'ভ্যারিয়েবল উইন্ডো সঙ্কুচিত করার আগে উপাদানগুলো অ-ঋণাত্মক কি না যাচাই করবে।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Sorted Two-Sum via Left/Right Pointers',
        englishParagraphs: [
          'Opposite-end pointers exploit sorted order to find two distinct indices summing to `target` in `O(N)` time and `O(1)` extra space.',
          'Looping `while l < r` guarantees `l` and `r` never reuse the same slot.',
        ],
        banglaParagraphs: [
          'সাজানো তালিকায় `l` ও `r` পয়েন্টার দুই প্রান্ত থেকে ভেতরের দিকে সরে এসে `O(N)` সময়েই জোড়া খুঁজে বের করে।',
          '`l < r` শর্তের ফলে একই সংখ্যা দুবার যোগ হয় না।',
        ],
        memoryDiagram: `[2,4,7,10,15], t=14 -> l=1(4), r=3(10)`,
        code: `a = [2, 4, 7, 10, 15]
target = 14
l, r = 0, len(a) - 1
ans = None
while l < r:
    s = a[l] + a[r]
    if s == target:
        ans = (a[l], a[r])
        break
    if s < target:
        l += 1
    else:
        r -= 1
print(f"{ans[0]} {ans[1]}" if ans else "NONE")`,
        stdin: '',
        expectedOutput: '4 10',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'while l < r:', whatItMeans: 'Squeezes distinct indices inward.', whyItIsThere: 'Terminates in at most N steps.', ifDeletedError: 'Cannot advance pointers.' },
          { lineNumber: 'Line 10', codeSnippet: 'if s < target:', whatItMeans: 'Moves left pointer upward to increase pair sum.', whyItIsThere: 'Every smaller partner with r would also be < target.', ifDeletedError: 'Infinite loop.' },
        ],
      },
      {
        id: 'py-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Max Sum Subarray of Length K (O(N))',
        englishParagraphs: [
          'Computing `win = sum(a[:k])` once and sliding `win += a[i] - a[i - k]` avoids quadratic slicing inside Python loops.',
          'Runs cleanly in linear `O(N)` time even when `N = 200,000, K = 100,000`.',
        ],
        banglaParagraphs: [
          'প্রথমে শুধু `sum(a[:k])` একবার বের করে পরে প্রতিটি ধাপে `a[i] - a[i - k]` আপডেট করলে সময় লাগে মাত্র `O(N)`।',
          'প্রতিবার স্লাইস কপি না হওয়ায় বড় `K`-তেও TLE হয় না।',
        ],
        memoryDiagram: `[5,2,8,1,9] k=3 -> 15 -> 11 -> 18`,
        code: `n, k = map(int, input().split())
a = list(map(int, input().split()))
win = sum(a[:k])
best = win
for i in range(k, n):
    win += a[i] - a[i - k]
    if win > best:
        best = win
print(best)`,
        stdin: '5 3\n5 2 8 1 9',
        expectedOutput: '18',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'win += a[i] - a[i - k]', whatItMeans: 'Incremental O(1) window slide.', whyItIsThere: 'Replaces O(K) slice resumming.', ifDeletedError: 'best stays stuck at initial window.' },
        ],
      },
      {
        id: 'py-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Longest Contiguous Subarray With Sum <= S',
        englishParagraphs: [
          'Expanding right boundary `r` and shrinking left boundary `l` while `cur > S` solves longest valid window in `O(N)`.',
          'Requires non-negative array items so advancing `l` never increases `cur`.',
        ],
        banglaParagraphs: [
          'পজিটিভ সংখ্যার তালিকায় ডান প্রান্ত `r` বাড়িয়ে এবং `cur > S` হলে বাঁ প্রান্ত `l` এগিয়ে সর্বোচ্চ দৈর্ঘ্য বের করা হয়।',
          'পুরো প্রোগ্রামে দুটি পয়েন্টারই কেবল সামনের দিকে যায়।',
        ],
        memoryDiagram: `[3,1,2,7,4], S=6 -> [3,1,2] len=3`,
        code: `a = [3, 1, 2, 7, 4]
S = 6
l = 0
cur = 0
best = 0
for r, x in enumerate(a):
    cur += x
    while cur > S:
        cur -= a[l]
        l += 1
    best = max(best, r - l + 1)
print(best)`,
        stdin: '',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'while cur > S:', whatItMeans: 'Advances left boundary until window is valid.', whyItIsThere: 'Restores sum <= S invariant.', ifDeletedError: 'Overcounts invalid windows.' },
        ],
      },
      {
        id: 'py-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Slicing O(N*K) Trap vs In-Place Deduplication',
        englishParagraphs: [
          'Calling `sum(a[i:i+k])` in a loop costs `O(N*K)` and TLEs on big test cases.',
          'Two same-direction pointers (`write` and `read`) also deduplicate sorted arrays cleanly in `O(N)` time and `O(1)` extra space.',
        ],
        banglaParagraphs: [
          'লুপে স্লাইসিং করলে অযথা `O(N*K)` সময় নষ্ট হয়।',
          'একই দিকে চলমান দুটি পয়েন্টার দিয়ে সাজানো তালিকা থেকে বাড়তি মেমোরি ছাড়াই ডুপ্লিকেট সরানো যায়।',
        ],
        memoryDiagram: `[1,1,2,2,2,5,5] -> w=3 unique elements`,
        code: `a = [1, 1, 2, 2, 2, 5, 5]
w = 0
for x in a:
    if w == 0 or x != a[w - 1]:
        a[w] = x
        w += 1
print(f"unique={w}")`,
        stdin: '',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'if w == 0 or x != a[w - 1]:', whatItMeans: 'Writes next unseen unique value in-place.', whyItIsThere: 'Avoids extra set memory when sorted.', ifDeletedError: 'w remains 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'a = [2, 4, 7, 10, 15]', whatItMeans: 'Sorted integer list prerequisite.', whyItIsThere: 'Guarantees monotonic sum changes when shifting pointers.', ifDeletedError: 'NameError: a undefined.' },
      { lineNumber: 'Line 3', codeSnippet: 'l, r = 0, len(a) - 1', whatItMeans: 'Initializes two opposite-end indices.', whyItIsThere: 'Covers full range first.', ifDeletedError: 'Pointers missing.' },
      { lineNumber: 'Line 5', codeSnippet: 'while l < r:', whatItMeans: 'Loops until pointers meet.', whyItIsThere: 'Prevents using one element twice.', ifDeletedError: 'Cannot iterate.' },
      { lineNumber: 'Line 10', codeSnippet: 'if s < target: l += 1', whatItMeans: 'Advances smaller bound when sum is low.', whyItIsThere: 'O(N) search termination.', ifDeletedError: 'Infinite loop.' },
    ],
    dryRunTable: [
      { step: 1, state: 'l=0, r=4', memoryOrStack: '2 + 15 = 17 > 14', note: 'Decrement r to 3' },
      { step: 2, state: 'l=0, r=3', memoryOrStack: '2 + 10 = 12 < 14', note: 'Increment l to 1' },
      { step: 3, state: 'l=1, r=3', memoryOrStack: '4 + 10 = 14 == 14', note: 'Store (4, 10) and break' },
      { step: 4, state: 'print 4 10', memoryOrStack: '3 steps', note: 'Clean exit' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Slicing Inside Sliding Window Loop', brokenCode: `best = max(sum(a[i:i+k]) for i in range(n - k + 1)) # O(N*K) TLE!`, fixedCode: `win = sum(a[:k])\nfor i in range(k, n): win += a[i] - a[i - k]`, whyItBreaks: 'Creating slice a[i:i+k] and calling sum() takes K steps every iteration.' },
      { title: 'Trap 2: Two Pointers Without Sorting Unsorted Input', brokenCode: `a = [10, 2, 15, 4]; l, r = 0, 3`, fixedCode: `a.sort(); l, r = 0, len(a) - 1`, whyItBreaks: 'Opposite-end pointer convergence relies strictly on non-decreasing order.' },
      { title: 'Trap 3: Inclusive l <= r Allowing Self-Pair', brokenCode: `while l <= r: if a[l] + a[r] == target: return True`, fixedCode: `while l < r: ...`, whyItBreaks: 'When l == r, a[l]*2 == target falsely matches a single element.' },
    ],
    practiceSheet: [
      { id: 'py-ch12-p1', difficulty: 'Easy', title: 'Sorted Two-Sum Check', prompt: 'Given N, target, and sorted list, print `YES` if any pair sums to target else `NO`.', banglaHint: 'দুই প্রান্তে `l=0, r=n-1` রেখে যোগফল যাচাই করো।', starterCode: `n, t = map(int, input().split())\na = list(map(int, input().split()))[:n]\nl, r = 0, n - 1\nok = False\nwhile l < r:\n    s = a[l] + a[r]\n    if s == t: ok = True; break\n    if s < t: l += 1\n    else: r -= 1\nprint("YES" if ok else "NO")`, sampleStdin: '5 14\n2 4 7 10 15', expectedOutput: 'YES' },
      { id: 'py-ch12-p2', difficulty: 'Easy', title: 'Max Sum K-Window', prompt: 'Print maximum sum over any K contiguous elements in O(N).', banglaHint: '`win += a[i] - a[i - k]` সূত্র ব্যবহার করো।', starterCode: `n, k = map(int, input().split())\na = list(map(int, input().split()))[:n]\nw = sum(a[:k]); b = w\nfor i in range(k, n): w += a[i] - a[i-k]; b = max(b, w)\nprint(b)`, sampleStdin: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'py-ch12-p3', difficulty: 'Medium', title: 'Longest Subarray Sum <= S', prompt: 'Find max contiguous length with sum <= S (positive elements).', banglaHint: '`cur > S` হলে `while` লুপে `cur -= a[l]; l += 1` করো।', starterCode: `n, s = map(int, input().split())\na = list(map(int, input().split()))[:n]\nl = cur = b = 0\nfor r, x in enumerate(a):\n    cur += x\n    while cur > s: cur -= a[l]; l += 1\n    b = max(b, r - l + 1)\nprint(b)`, sampleStdin: '5 6\n3 1 2 7 4', expectedOutput: '3' },
      { id: 'py-ch12-p4', difficulty: 'Medium', title: 'Move Zeros to End', prompt: 'Shift non-zero items forward in-place keeping order.', banglaHint: '`w` পয়েন্টার দিয়ে অ-শূন্য মান অদলবদল করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\nw = 0\nfor r in range(n):\n    if a[r] != 0: a[w], a[r] = a[r], a[w]; w += 1\nprint(*a)`, sampleStdin: '5\n0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 'py-ch12-p5', difficulty: 'Hard', title: 'Container With Most Water', prompt: 'Compute max `min(h[l], h[r]) * (r - l)`.', banglaHint: 'ছোট উচ্চতার প্রান্তটি এক ধাপ ভেতরে সরাও।', starterCode: `n = int(input())\nh = list(map(int, input().split()))[:n]\nl, r, best = 0, n - 1, 0\nwhile l < r:\n    best = max(best, min(h[l], h[r]) * (r - l))\n    if h[l] < h[r]: l += 1\n    else: r -= 1\nprint(best)`, sampleStdin: '5\n1 8 6 2 5', expectedOutput: '15' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Max K-Window Sliding Engine',
      description: 'Slide a K-element frame across N integers without slicing in O(N) time.',
      banglaGoal: 'স্লাইসিং ছাড়াই `O(N)` সময়ে `K` দৈর্ঘ্যের সর্বোচ্চ সাব-অ্যারে সাম বের করো।',
      combinesChapters: 'Python Ch 1–12',
      starterCode: `n, k = map(int, input().split())
a = list(map(int, input().split()))
win = sum(a[:k])
best = win
for i in range(k, n):
    win += a[i] - a[i - k]
    if win > best:
        best = win
print(best)`,
      sampleStdin: '5 3\n5 2 8 1 9',
      expectedOutput: '18',
    },
    starterCode: `n, k = map(int, input().split())
a = list(map(int, input().split()))
win = sum(a[:k])
best = win
for i in range(k, n):
    win += a[i] - a[i - k]
    if win > best:
        best = win
print(best)`,
    sampleStdin: '5 3\n5 2 8 1 9',
    expectedSampleOutput: '18',
    testCases: [
      { id: 'py12-t1', input: '5 3\n5 2 8 1 9', expectedOutput: '18' },
      { id: 'py12-t2', input: '4 2\n4 1 3 7', expectedOutput: '10', isHidden: true },
    ],
  },
  13: {
    chapterNumber: 13,
    title: 'Python Chapter 13 (Python 3.13+): Prefix Sums & Difference Arrays',
    banglaTitle: 'Python অধ্যায় ১৩ (Python 3.13+): প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    subtitle: '1-based prefix arrays pref[R] - pref[L - 1], itertools.accumulate, and O(1) difference-array range increments.',
    zeroIntuition: {
      plainEnglishStory:
        'Calling `sum(a[l:r+1])` inside a `Q`-query loop takes `O(N * Q)` operations—timing out immediately in Python once $N, Q \\approx 10^5$. Precomputing a **1-based Prefix Sum List** `pref = [0] * (n + 1)` with `pref[i] = pref[i - 1] + a[i - 1]` answers any `[L, R]` range sum in a single `O(1)` subtraction: `pref[r] - pref[l - 1]`.\n\nPython’s arbitrary-precision `int` guarantees zero integer overflow even for $10^5$ large values, and a companion **Difference Array** (`diff[l] += v`, `diff[r + 1] -= v`) turns thousands of `[L, R] += v` updates into `O(1)` ticks followed by one `O(N)` prefix reconstruction sweep.',
      asciiFlowchart: `a = [3, 2, 5, 1]   --> pref = [0, 3, 5, 10, 11]  (index 0 = dummy zero!)
Query sum(1-based 2..4): pref[4] - pref[1] = 11 - 3 = 8  (O(1) instant!)
Range Add [L..R] += v:   diff[L] += v; diff[R + 1] -= v  --> accumulate(diff)`,
      pseudocode: [
        '1. ALLOCATE 1-based prefix list pref = [0] * (n + 1)',
        '2. COMPUTE pref[i] = pref[i - 1] + a[i - 1] once in O(N)',
        '3. ANSWER each 1-based [l, r] query via pref[r] - pref[l - 1] in O(1)',
        '4. APPLY range add [l, r] += v via diff[l] += v and diff[r + 1] -= v',
      ],
      banglaZeroToHero: {
        analogyTitle: 'মাইলফলকের তালিকা ও গেট-পাস কাউন্টার',
        explanation:
          'পাইথনে লুপ চালিয়ে বারবার `sum(a[l:r+1])` করলে প্রতিবার লিস্টের একটি স্লাইস তৈরি হয়ে `O(N * Q)` সময় নষ্ট করে—বড় কুয়েরিতে নিশ্চিত TLE খায়! এর বদলে **Prefix Sum** পদ্ধতিতে শুরুতেই ১-বেসড `pref = [0] * (n + 1)` বানিয়ে প্রতিটি অবস্থানের ক্রমযোজিত যোগফল (`pref[i] = pref[i - 1] + a[i - 1]`) জমা রাখা হয়। তখন ১-বেসড যেকোনো রেঞ্জ `[L, R]`-এর যোগফল জানতে চাইলে কেবল `pref[r] - pref[l - 1]` লিখলেই `O(1)` সময়ে উত্তর পাওয়া যায়—কোনো স্লাইসিং বা লুপের দরকার পড়ে না! পাইথনের `int` অসীম সাইজের হওয়ায় বড় যোগফলে ওভারফ্লো হওয়ারও কোনো ভয় নেই। অন্যদিকে যখন এক লাখ বার বলা হয় `[L, R]` অংশের সবার সাথে `v` যোগ করো, তখন **Difference Array** `diff = [0] * (n + 2)` নিয়ে কেবল শুরুর ঘরে `diff[l] += v` এবং শেষের পরের ঘরে `diff[r + 1] -= v` বসিয়ে দিই! শেষে পুরো `diff` জুড়ে একবার প্রিফিক্স সাম চালালেই আসল মান `O(N)` সময়ে বের হয়ে আসে।',
        everydayExample:
          'বইয়ের প্রতিটি অধ্যায়ের শেষে মোট পাতা লেখা থাকলে মাঝের যেকোনো অধ্যায় থেকে অধ্যায়ের পাতার সংখ্যা স্রেফ বিয়োগ করেই পাওয়া যায়।',
        keyTakeaways: [
          '`pref` লিস্টের সামনে `0` (`[0] * (n + 1)`) রাখলে `L = 1` হলেও `pref[L - 1]` কখনোই ভুল নেগেটিভ ইনডেক্সে যায় না!',
          '`sum(a[l:r+1])` প্রতি কুয়েরিতে `O(N)` নেয়; `pref[r] - pref[l - 1]` নেয় ঠিক `O(1)`।',
          '`diff` লিস্টের সাইজ `n + 2` রাখলে `diff[r + 1] -= v` কখনো `IndexError` দেয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-13-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: '1-Based Prefix Sums & Instant Range Queries',
        englishParagraphs: [
          'Dummy slot `pref[0] = 0` lets `pref[r] - pref[l - 1]` work uniformly even when `l == 1`.',
          'Avoid negative Python indexing bugs by keeping `l` and `r` strictly 1-based here.',
        ],
        banglaParagraphs: [
          'সামনে একটি `0` বসিয়ে `pref` লিস্ট ১-বেসড রাখায় `l == 1` কেসেও পাইথনের `-1` শেষ উপাদান পড়ার ভুল ঘটে না।',
          'প্রতিটি কুয়েরি মাত্র এক বিয়োগে সমাধান হয়।',
        ],
        memoryDiagram: `a=[3,2,5,1] -> pref=[0,3,5,10,11] -> sum(2..4)=8`,
        code: `a = [3, 2, 5, 1]
n = len(a)
pref = [0] * (n + 1)
for i in range(1, n + 1):
    pref[i] = pref[i - 1] + a[i - 1]
print(f"sum(2..4)={pref[4] - pref[1]}")
print(f"sum(1..3)={pref[3] - pref[0]}")`,
        stdin: '',
        expectedOutput: 'sum(2..4)=8\nsum(1..3)=10',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'pref = [0] * (n + 1)', whatItMeans: 'Creates 1-based prefix array with dummy zero at index 0.', whyItIsThere: 'Prevents pref[-1] bug when querying from index 1.', ifDeletedError: 'NameError: pref not defined.' },
        ],
      },
      {
        id: 'py-ch-13-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Fast Q Range Sum Queries Using sys.stdin',
        englishParagraphs: [
          'For $10^5$ queries in Python, collect output lines into a list and flush with `"\\n".join(out)` for instant I/O.',
          '`itertools.accumulate(a, initial=0)` builds `pref` in fast C speed under the hood.',
        ],
        banglaParagraphs: [
          'বড় সংখ্যক কুয়েরিতে ফলাফলগুলো একটি লিস্টে জমা করে শেষে `"\\n".join` দিয়ে প্রিন্ট করলে পাইথনের I/O অনেক দ্রুত হয়।',
          '`itertools.accumulate(a, initial=0)` সি-লেভেল গতিতে প্রিফিক্স তৈরি করে।',
        ],
        memoryDiagram: `a=[2,4,1,5] -> pref=[0,2,6,7,12] -> 10, 7`,
        code: `from itertools import accumulate
import sys

data = list(map(int, sys.stdin.read().split()))
if data:
    n, q = data[0], data[1]
    a = data[2:2 + n]
    pref = list(accumulate(a, initial=0))
    out = []
    idx = 2 + n
    for _ in range(q):
        l, r = data[idx], data[idx + 1]
        idx += 2
        out.append(str(pref[r] - pref[l - 1]))
    print("\\n".join(out))`,
        stdin: '4 2\n2 4 1 5\n2 4\n1 3',
        expectedOutput: '10\n7',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'pref = list(accumulate(a, initial=0))', whatItMeans: 'Builds 1-based prefix sums in native C loop speed.', whyItIsThere: 'Faster than pure-Python for-loop accumulation.', ifDeletedError: 'pref undefined during query loop.' },
        ],
      },
      {
        id: 'py-ch-13-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'O(1) Range Updates With Difference Array',
        englishParagraphs: [
          'Mark interval starts with `+v` and post-ends with `-v` inside `diff = [0] * (n + 2)`.',
          'Reconstruct the updated list cleanly in one running-sum pass.',
        ],
        banglaParagraphs: [
          '`[l, r] += v` কাজের জন্য কেবল `diff[l] += v` এবং `diff[r + 1] -= v` বসিয়ে শেষে একবার প্রিফিক্স সাম নেওয়া হয়েছে।',
          'বাকি সব উপাদান স্বয়ংক্রিয়ভাবে সঠিক মান পায়।',
        ],
        memoryDiagram: `[1..3]+=2, [2..5]+=3 -> final=[2, 5, 5, 3, 3]`,
        code: `n = 5
diff = [0] * (n + 2)
for l, r, v in [(1, 3, 2), (2, 5, 3)]:
    diff[l] += v
    diff[r + 1] -= v
run = 0
res = []
for i in range(1, n + 1):
    run += diff[i]
    res.append(run)
print(*res)`,
        stdin: '',
        expectedOutput: '2 5 5 3 3',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'diff[r + 1] -= v', whatItMeans: 'Stops the +v range effect immediately after index r.', whyItIsThere: 'Prevents increment from propagating past right bound.', ifDeletedError: 'All tail elements receive extra +v.' },
        ],
      },
      {
        id: 'py-ch-13-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Python Negative Indexing Trap (pref[-1]) vs 1-Based Equilibrium',
        englishParagraphs: [
          'In C++ `pref[-1]` segfaults; in Python `pref[-1]` SILENTLY returns the LAST element of the list! Zero-based prefix sums break silently when `l == 0`!',
          'Always pad `pref` with a leading `0` so `l >= 1` and `pref[l - 1]` stays `>= 0`.',
        ],
        banglaParagraphs: [
          'পাইথনে `pref[-1]` করলে এরর দেয় না—চুপচাপ লিস্টের **শেষ উপাদান** ফেরত দেয়! এটি ভয়ংকর সাইড-বাগ।',
          'তাই প্রিফিক্স লিস্টের ০ ইনডেক্সে সবসময় ডামি `0` রাখতে হয়।',
        ],
        memoryDiagram: `TRAP: l=0 -> pref[l-1] reads LAST element silently! | FIX: 1-based pref`,
        code: `a = [1, 7, 3, 6, 5, 6]
n = len(a)
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + a[i - 1]
pivot = -1
for i in range(1, n + 1):
    if p[i - 1] == p[n] - p[i]:
        pivot = i - 1
        break
print(f"pivot={pivot}")`,
        stdin: '',
        expectedOutput: 'pivot=3',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'if p[i - 1] == p[n] - p[i]:', whatItMeans: 'Compares prefix sum strictly left of i against suffix sum strictly right of i.', whyItIsThere: 'Finds equilibrium index cleanly in O(N).', ifDeletedError: 'pivot remains -1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 3', codeSnippet: 'pref = [0] * (n + 1)', whatItMeans: 'Allocates 1-based prefix list padded with zero at slot 0.', whyItIsThere: 'Eliminates Python negative-index wraparound when l = 1.', ifDeletedError: 'pref undefined.' },
      { lineNumber: 'Line 4', codeSnippet: 'for i in range(1, n + 1):', whatItMeans: 'Loops from 1 through n inclusive.', whyItIsThere: 'Fills cumulative totals once in O(N).', ifDeletedError: 'pref remains all zeros.' },
      { lineNumber: 'Line 6', codeSnippet: 'print(f"sum(2..4)={pref[4] - pref[1]}")', whatItMeans: 'Computes range sum via O(1) prefix difference.', whyItIsThere: 'Replaces repeated slice summation.', ifDeletedError: 'Query sum missing.' },
    ],
    dryRunTable: [
      { step: 1, state: 'pref init', memoryOrStack: 'pref = [0, 0, 0, 0, 0]', note: 'Padded index 0' },
      { step: 2, state: 'i=1..2', memoryOrStack: 'pref[1]=3, pref[2]=5', note: 'Cumulative build' },
      { step: 3, state: 'i=3..4', memoryOrStack: 'pref[3]=10, pref[4]=11', note: 'Ready for queries' },
      { step: 4, state: 'pref[4] - pref[1]', memoryOrStack: '11 - 3 = 8', note: 'O(1) answer' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Silent pref[-1] Negative Indexing Bug in Python', brokenCode: `pref = [3, 5, 10]; ans = pref[2] - pref[-1] # Reads 10 instead of 0!`, fixedCode: `pref = [0, 3, 5, 10] # 1-based padded zero`, whyItBreaks: 'Python reads from the end of a list on index -1 without raising an error.' },
      { title: 'Trap 2: Using sum(a[l:r+1]) Inside Query Loop', brokenCode: `for l, r in queries: print(sum(a[l:r+1])) # O(N * Q) TLE!`, fixedCode: `for l, r in queries: print(pref[r + 1] - pref[l])`, whyItBreaks: 'Slicing and summing repeats linear work per query.' },
      { title: 'Trap 3: Difference Array Length n + 1 Crashing at r = n', brokenCode: `diff = [0] * (n + 1); diff[r + 1] -= v # IndexError when r == n!`, fixedCode: `diff = [0] * (n + 2)`, whyItBreaks: 'Canceling at r + 1 requires index n + 1 to exist.' },
    ],
    practiceSheet: [
      { id: 'py-ch13-p1', difficulty: 'Easy', title: '1-Based Range Sum Queries', prompt: 'Given N, Q, array, and Q pairs (l, r), output each sum in O(1).', banglaHint: '`pref = [0] * (n + 1)` বানিয়ে `pref[r] - pref[l - 1]` বের করো।', starterCode: `import sys\nfrom itertools import accumulate\nd = list(map(int, sys.stdin.read().split()))\nn, q = d[0], d[1]\np = list(accumulate(d[2:2+n], initial=0))\nidx = 2 + n\nfor _ in range(q): print(p[d[idx+1]] - p[d[idx]-1]); idx += 2`, sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'py-ch13-p2', difficulty: 'Easy', title: 'Equilibrium / Pivot Index', prompt: 'Find first 0-based index whose left sum equals right sum (`-1` if none).', banglaHint: '`p[i - 1] == p[n] - p[i]` পরীক্ষা করো।', starterCode: `from itertools import accumulate\nn = int(input())\na = list(map(int, input().split()))[:n]\np = list(accumulate(a, initial=0))\nans = -1\nfor i in range(1, n + 1):\n    if p[i - 1] == p[n] - p[i]: ans = i - 1; break\nprint(ans)`, sampleStdin: '6\n1 7 3 6 5 6', expectedOutput: '3' },
      { id: 'py-ch13-p3', difficulty: 'Medium', title: 'Difference Array Increments', prompt: 'Apply U updates `(l, r, v)` on zero array of size N and print final state.', banglaHint: '`diff[l] += v; diff[r + 1] -= v;` করে প্রিফিক্স চালাও।', starterCode: `import sys\nd = list(map(int, sys.stdin.read().split()))\nn, u = d[0], d[1]\ndiff = [0] * (n + 2)\nidx = 2\nfor _ in range(u):\n    l, r, v = d[idx], d[idx+1], d[idx+2]; idx += 3\n    diff[l] += v; diff[r + 1] -= v\nrun = 0; out = []\nfor i in range(1, n + 1): run += diff[i]; out.append(run)\nprint(*out)`, sampleStdin: '5 2\n1 3 2\n2 5 3', expectedOutput: '2 5 5 3 3' },
      { id: 'py-ch13-p4', difficulty: 'Medium', title: 'Running Prefix Maximum', prompt: 'Print running maximum after each array item.', banglaHint: '`mx = max(mx, x)` রেখে প্রতি ধাপে জমা করো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\nmx = a[0]; out = []\nfor x in a: mx = max(mx, x); out.append(mx)\nprint(*out)`, sampleStdin: '5\n3 1 5 2 6', expectedOutput: '3 3 5 5 6' },
      { id: 'py-ch13-p5', difficulty: 'Hard', title: 'Subarrays Divisible by K', prompt: 'Count non-empty subarrays whose sum is divisible by `K`.', banglaHint: '`(pref % K + K) % K` এর রিমাইন্ডার কাউন্ট গোনো।', starterCode: `n, k = map(int, input().split())\na = list(map(int, input().split()))[:n]\ncnt = [0] * k; cnt[0] = 1\ns = ans = 0\nfor x in a: s = (s + x) % k; ans += cnt[s]; cnt[s] += 1\nprint(ans)`, sampleStdin: '5 3\n4 5 0 2 1', expectedOutput: '6' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N + Q) Prefix Range Query Engine',
      description: 'Precompute 1-based prefix totals using accumulate and answer all [l, r] sum queries in O(1).',
      banglaGoal: '১-বেসড প্রিফিক্স সাম বানিয়ে সব কুয়েরির উত্তর `O(1)` সময়ে দাও।',
      combinesChapters: 'Python Ch 1–13',
      starterCode: `from itertools import accumulate
import sys

data = list(map(int, sys.stdin.read().split()))
if data:
    n, q = data[0], data[1]
    a = data[2:2 + n]
    pref = list(accumulate(a, initial=0))
    out = []
    idx = 2 + n
    for _ in range(q):
        l, r = data[idx], data[idx + 1]
        idx += 2
        out.append(str(pref[r] - pref[l - 1]))
    print("\\n".join(out))`,
      sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
      expectedOutput: '10\n7',
    },
    starterCode: `from itertools import accumulate
import sys

data = list(map(int, sys.stdin.read().split()))
if data:
    n, q = data[0], data[1]
    a = data[2:2 + n]
    pref = list(accumulate(a, initial=0))
    out = []
    idx = 2 + n
    for _ in range(q):
        l, r = data[idx], data[idx + 1]
        idx += 2
        out.append(str(pref[r] - pref[l - 1]))
    print("\\n".join(out))`,
    sampleStdin: '4 2\n2 4 1 5\n2 4\n1 3',
    expectedSampleOutput: '10\n7',
    testCases: [
      { id: 'py13-t1', input: '4 2\n2 4 1 5\n2 4\n1 3', expectedOutput: '10\n7' },
      { id: 'py13-t2', input: '3 1\n10 20 30\n1 3', expectedOutput: '60', isHidden: true },
    ],
  },
  14: {
    chapterNumber: 14,
    title: 'Python Chapter 14 (Python 3.13+): Strings, Slicing & Manipulation',
    banglaTitle: 'Python অধ্যায় ১৪ (Python 3.13+): স্ট্রিং, স্লাইসিং ও ম্যানিপুলেশন',
    subtitle: 'Immutable Python str, O(N) "".join() vs quadratic += building, ord() ASCII frequency buckets, and slicing tricks.',
    zeroIntuition: {
      plainEnglishStory:
        'Python `str` is an **immutable Unicode sequence**: you cannot overwrite `s[0] = "A"` directly (`TypeError`), and concatenating `ans += ch` inside huge loops can degrade toward copying strings repeatedly. Instead, append pieces to a `list` and call `"".join(parts)` at the end for guaranteed `O(N)` assembly.\n\nBecause slicing `[::-1]` reverses cleanly, palindromes reduce to `s.lower() == s.lower()[::-1]` (or `O(1)`-space two pointers), while character frequencies map `ord(ch) - ord("a")` into a 26-slot bucket cleanly.',
      asciiFlowchart: `s = "racecar"  (Immutable!)
   s[0] = 'x'   ---> TypeError! Convert to list(s) or build parts = []
   "".join(parts) ---> Single O(N) final allocation!`,
      pseudocode: [
        '1. COLLECT dynamic character mutations inside parts = [] then return "".join(parts)',
        '2. MAP lowercase letters via ord(c) - ord("a") into [0] * 26 frequency list',
        '3. STRIP trailing whitespace cleanly with input().strip()',
        '4. COMPARE palindromes via two pointers l < r for O(1) space',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কাচের ফ্রেমে বাঁধানো অক্ষর ও জোড়া লাগানোর টেকনিক',
        explanation:
          'পাইথনের `str` হলো **Immutable**—মানে একবার বানিয়ে ফেললে ভেতরের একটি অক্ষরও সরাসরি `s[0] = "A"` দিয়ে বদলানো যায় না; বদলাতে গেলে `TypeError` আসে! তাই বড় লুপের ভেতরে বারবার `res += ch` করে নতুন স্ট্রিং বানানোর বদলে সব অংশ একটি লিস্টে `parts.append(ch)` করে রেখে সবার শেষে `"".join(parts)` লিখলে মাত্র একবারেই `O(N)` সময়ে পুরো স্ট্রিং জোড়া লেগে যায়। কোনো শব্দ উল্টাতে চাইলে `s[::-1]` স্লাইস অথবা টু-পয়েন্টার `l < r` ব্যবহার করা যায়। ইংরেজি বর্ণ গণনার জন্য পাইথনের `ord(c) - ord("a")` দিয়ে ২৬ ঘরের `[0] * 26` লিস্ট বানালে অ্যানাগ্রাম বা প্রথম ইউনিক অক্ষর খোঁজা খুব সহজ হয়ে যায়। পাশাপাশি ইনপুট পড়ার সময় `input().strip()` দিলে অপ্রয়োজনীয় স্পেস বা `\r\n` দূর হয়।',
        everydayExample:
          'কাচের ওপরে খোদাই করা লেখা (`str`) ঘষে বদলানো যায় না—নতুন কার্ডে অক্ষরগুলো একসাথে জমিয়ে (`list` + `"".join()`) একবারেই প্রিন্ট করতে হয়।',
        keyTakeaways: [
          'লুপে স্ট্রিং জোড়া দিতে `parts = []` ও `"".join(parts)` ব্যবহার করবে।',
          '`s.lower()` বা `.strip()` আসল স্ট্রিং বদলায় না—নতুন স্ট্রিং ফেরত দেয়, তাই `s = s.strip()` লিখতে হয়!',
          '`ord(c) - ord("a")` দিয়ে `O(N)` সময়ে বর্ণমালার ফ্রিকোয়েন্সি হিসাব করা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-14-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Case-Insensitive Two-Pointer Palindrome Check',
        englishParagraphs: [
          'Lowercase `s` once via `s = s.lower()` and scan inward from `l = 0, r = len(s) - 1`.',
          'Checking in two pointers uses `O(1)` extra space beyond the normalized string.',
        ],
        banglaParagraphs: [
          '`s = s.lower()` করে ছোট হাতের অক্ষরে এনে দুই প্রান্ত থেকে `l < r` মিলিয়ে প্যালিনড্রোম যাচাই করা হয়েছে।',
          'দুটি অক্ষর অমিল পেলেই `break` দিয়ে লুপ থামানো হয়েছে।',
        ],
        memoryDiagram: `"RaceCar" -> "racecar" -> PALINDROME`,
        code: `s = "RaceCar".lower()
l, r = 0, len(s) - 1
ok = True
while l < r:
    if s[l] != s[r]:
        ok = False
        break
    l += 1
    r -= 1
print(f"{s} -> {'PALINDROME' if ok else 'NO'}")`,
        stdin: '',
        expectedOutput: 'racecar -> PALINDROME',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 's = "RaceCar".lower()', whatItMeans: 'Assigns returned lowercase string back to s.', whyItIsThere: '.lower() returns a new string rather than mutating.', ifDeletedError: 's undefined.' },
        ],
      },
      {
        id: 'py-ch-14-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'O(N) Anagram Checker Using ord() Buckets',
        englishParagraphs: [
          'Check equal length first, then balance `[0] * 26` letter buckets in one zip pass.',
          '`all(v == 0 for v in freq)` confirms both strings share exact letter counts.',
        ],
        banglaParagraphs: [
          'দৈর্ঘ্য সমান হলে `zip(a, b)` দিয়ে এক পাসে প্রথম স্ট্রিংয়ে `+1` ও দ্বিতীয়টিতে `-1` করে `O(N)` সময়ে অ্যানাগ্রাম দেখা হয়েছে।',
          'সব ঘর `0` হলে তবেই `YES` প্রিন্ট হয়।',
        ],
        memoryDiagram: `"listen" +1 / "silent" -1 -> all 0 => YES`,
        code: `a = input().strip()
b = input().strip()
if len(a) != len(b):
    print("NO")
else:
    freq = [0] * 26
    base = ord("a")
    for ca, cb in zip(a, b):
        freq[ord(ca) - base] += 1
        freq[ord(cb) - base] -= 1
    print("YES" if all(x == 0 for x in freq) else "NO")`,
        stdin: 'listen\nsilent',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'freq[ord(ca) - base] += 1', whatItMeans: 'Maps lowercase char into 0..25 frequency bucket.', whyItIsThere: 'Avoids O(N log N) sorting overhead.', ifDeletedError: 'freq remains zero falsely.' },
        ],
      },
      {
        id: 'py-ch-14-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Run-Length Compression Using "".join(parts)',
        englishParagraphs: [
          'Group adjacent matching characters cleanly and push fragments into `parts` before a single `"".join(parts)`.',
          'Guarantees linear `O(N)` runtime even on long inputs.',
        ],
        banglaParagraphs: [
          'পাশাপাশি একই অক্ষরের সংখ্যা গুনে `parts` লিস্টে রেখে শেষে `"".join(parts)` দিয়ে এক ধাপে স্ট্রিং তৈরি করা হয়েছে।',
          'এতে কোনো অপ্রয়োজনীয় মেমোরি কপি হয় না।',
        ],
        memoryDiagram: `"aaabbc" -> parts=['a','3','b','2','c','1'] -> "a3b2c1"`,
        code: `s = "aaabbc"
parts = []
i = 0
while i < len(s):
    j = i
    while j < len(s) and s[j] == s[i]:
        j += 1
    parts.append(s[i])
    parts.append(str(j - i))
    i = j
print("".join(parts))`,
        stdin: '',
        expectedOutput: 'a3b2c1',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'print("".join(parts))', whatItMeans: 'Joins buffered substrings in a single O(N) pass.', whyItIsThere: 'Prevents repeated string reallocations.', ifDeletedError: 'Nothing printed.' },
        ],
      },
      {
        id: 'py-ch-14-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Immutable String Mutation & Discarded Return Trap vs Join',
        englishParagraphs: [
          'Writing `s.lower()` without assigning `s = s.lower()` throws the converted string away!',
          'Similarly, mutating `s[0] = "X"` raises `TypeError`—convert to `list(s)` when in-place swaps are needed.',
        ],
        banglaParagraphs: [
          'শুধু `s.strip()` লিখলে `s` বদলায় না, `s = s.strip()` লিখতে হয়!',
          'আবার `s[0] = "X"` চালালে `TypeError` আসে; বদলানোর প্রয়োজন হলে `list(s)` ব্যবহার করবে।',
        ],
        memoryDiagram: `TRAP: s.lower() ignored | FIX: s = s.strip().lower()`,
        code: `raw = "  Argon  "
clean = raw.strip().lower()
chars = list(clean)
chars[0] = chars[0].upper()
print("".join(chars))`,
        stdin: '',
        expectedOutput: 'Argon',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'chars = list(clean)', whatItMeans: 'Creates mutable character list copy from immutable string.', whyItIsThere: 'Enables direct index assignment chars[0] = ...', ifDeletedError: 'Assigning clean[0] raises TypeError.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 's = "RaceCar".lower()', whatItMeans: 'Normalizes string to lowercase and stores returned object.', whyItIsThere: 'Makes uppercase and lowercase letters compare identically.', ifDeletedError: 's undefined.' },
      { lineNumber: 'Line 2', codeSnippet: 'l, r = 0, len(s) - 1', whatItMeans: 'Initializes two opposite-end character indices.', whyItIsThere: 'Prepares O(1)-space palindrome check.', ifDeletedError: 'Indices missing.' },
      { lineNumber: 'Line 4', codeSnippet: 'while l < r:', whatItMeans: 'Compares outer characters toward center.', whyItIsThere: 'Exits immediately on first mismatch.', ifDeletedError: 'Comparison skipped.' },
    ],
    dryRunTable: [
      { step: 1, state: 'lower()', memoryOrStack: 's = "racecar"', note: 'New immutable string' },
      { step: 2, state: 'l=0, r=6', memoryOrStack: "'r' == 'r'", note: 'l=1, r=5' },
      { step: 3, state: 'l=1..2', memoryOrStack: "'a'=='a', 'c'=='c'", note: 'l=3, r=3' },
      { step: 4, state: 'loop ends', memoryOrStack: 'ok = True', note: 'Outputs PALINDROME' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Ignoring Return Value of .lower() or .strip()', brokenCode: `s = "  ABC  "; s.strip().lower(); print(s) # Still "  ABC  "!`, fixedCode: `s = s.strip().lower()`, whyItBreaks: 'Strings are immutable; string methods return new strings rather than editing s in place.' },
      { title: 'Trap 2: Trying s[i] = ch on a Python String', brokenCode: `s = "cat"; s[0] = "b" # TypeError!`, fixedCode: `chars = list(s); chars[0] = "b"; s = "".join(chars)`, whyItBreaks: 'str objects do not support item assignment.' },
      { title: 'Trap 3: Calling input() Split Bugs With Multiple Spaces', brokenCode: `a, b = input().split(" ") # Crashes on double spaces!`, fixedCode: `a, b = input().split()`, whyItBreaks: 'split() with no argument skips arbitrary runs of spaces cleanly.' },
    ],
    practiceSheet: [
      { id: 'py-ch14-p1', difficulty: 'Easy', title: 'Reverse Word Cleanly', prompt: 'Read a single word and print its reverse.', banglaHint: '`s[::-1]` স্লাইস দিয়ে সহজেই উল্টানো যায়।', starterCode: `print(input().strip()[::-1])`, sampleStdin: 'argon', expectedOutput: 'nogra' },
      { id: 'py-ch14-p2', difficulty: 'Easy', title: 'Case-Insensitive Vowel Counter', prompt: 'Read a line of text and count vowels `a, e, i, o, u`.', banglaHint: '`.lower()` করে `"aeiou"` সেটের ভেতর আছে কি না গোনো।', starterCode: `s = input().lower()\nprint(sum(1 for c in s if c in "aeiou"))`, sampleStdin: 'Hello Argon', expectedOutput: '4' },
      { id: 'py-ch14-p3', difficulty: 'Medium', title: 'Anagram Check (26-Bucket)', prompt: 'Read two lowercase strings and print `YES` if anagrams else `NO`.', banglaHint: '`[0] * 26` লিস্টে `ord(c) - ord("a")` দিয়ে কাউন্ট মেলাও।', starterCode: `a = input().strip()\nb = input().strip()\nif len(a) != len(b):\n    print("NO")\nelse:\n    f = [0] * 26; base = ord("a")\n    for x, y in zip(a, b): f[ord(x)-base] += 1; f[ord(y)-base] -= 1\n    print("YES" if all(v == 0 for v in f) else "NO")`, sampleStdin: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'py-ch14-p4', difficulty: 'Medium', title: 'Run-Length String Compression', prompt: 'Compress consecutive identical characters (`aaabbc` -> `a3b2c1`).', banglaHint: '`parts` লিস্টে জমা করে শেষে `"".join(parts)` প্রিন্ট করো।', starterCode: `s = input().strip()\nparts = []; i = 0\nwhile i < len(s):\n    j = i\n    while j < len(s) and s[j] == s[i]: j += 1\n    parts.append(s[i]); parts.append(str(j - i)); i = j\nprint("".join(parts))`, sampleStdin: 'aaabbc', expectedOutput: 'a3b2c1' },
      { id: 'py-ch14-p5', difficulty: 'Hard', title: 'First Unique Character Index', prompt: 'Return 0-based index of first character appearing once (`-1` if none).', banglaHint: 'প্রথম পাসে `[0] * 26` কাউন্ট বানাও, দ্বিতীয় পাসে `cnt == 1` খুঁজো।', starterCode: `s = input().strip()\nf = [0] * 26; base = ord("a")\nfor c in s: f[ord(c) - base] += 1\nans = -1\nfor i, c in enumerate(s):\n    if f[ord(c) - base] == 1: ans = i; break\nprint(ans)`, sampleStdin: 'loveleetcode', expectedOutput: '2' },
    ],
    miniBuild: {
      title: 'Mini-Build: O(N) Anagram & Frequency Inspector',
      description: 'Compare two lowercase strings via a 26-letter ord() frequency array in O(N) time.',
      banglaGoal: '`ord()` ও ২৬ ঘরের ফ্রিকোয়েন্সি লিস্ট ব্যবহার করে অ্যানাগ্রাম যাচাই করো।',
      combinesChapters: 'Python Ch 1–14',
      starterCode: `a = input().strip()
b = input().strip()
if len(a) != len(b):
    print("NO")
else:
    freq = [0] * 26
    base = ord("a")
    for ca, cb in zip(a, b):
        freq[ord(ca) - base] += 1
        freq[ord(cb) - base] -= 1
    print("YES" if all(x == 0 for x in freq) else "NO")`,
      sampleStdin: 'listen\nsilent',
      expectedOutput: 'YES',
    },
    starterCode: `a = input().strip()
b = input().strip()
if len(a) != len(b):
    print("NO")
else:
    freq = [0] * 26
    base = ord("a")
    for ca, cb in zip(a, b):
        freq[ord(ca) - base] += 1
        freq[ord(cb) - base] -= 1
    print("YES" if all(x == 0 for x in freq) else "NO")`,
    sampleStdin: 'listen\nsilent',
    expectedSampleOutput: 'YES',
    testCases: [
      { id: 'py14-t1', input: 'listen\nsilent', expectedOutput: 'YES' },
      { id: 'py14-t2', input: 'rat\ncar', expectedOutput: 'NO', isHidden: true },
    ],
  },
  15: {
    chapterNumber: 15,
    isMilestoneMerger: true,
    title: 'Python Chapter 15 (Python 3.13+): Recursion & Call Stack Visualization — Merger 3',
    banglaTitle: 'Python অধ্যায় ১৫ (Python 3.13+): রিকার্সন ও কল-স্ট্যাক ভিজ্যুয়ালাইজেশন — মার্জার ৩',
    subtitle: 'Milestone Merger 3: Base cases, Python 1000-frame RecursionError guard, @lru_cache memoization, and O(log e) power.',
    zeroIntuition: {
      plainEnglishStory:
        'Every time a Python function calls itself, the interpreter pushes a new **Call Frame** (holding local parameters and instruction offset) onto Python’s call stack until hitting a stopping **Base Case**, then unwinds frame by frame returning computed results.\n\nPython explicitly caps call depth at `1000` (`RecursionError`) to keep CPython’s stack safe—and even more critically, naive branching like `fib(n - 1) + fib(n - 2)` explodes to `O(2^N)` unless cached via `functools.lru_cache(maxsize=None)` or a memo dictionary! Combining Phase 1–3 arrays, strings, prefixes, and memoized recursion marks **Milestone Merger 3**.',
      asciiFlowchart: `fact(4) pushes Frame(n=4)
  -> Frame(n=3) -> Frame(n=2) -> Frame(n=1) returns 1  [BASE CASE!]
  <- pops Frame(2): 2*1=2 <- pops Frame(3): 6 <- pops Frame(4): 24
Python Guard: default limit = 1000 frames (RecursionError if base case missing!)`,
      pseudocode: [
        '1. WRITE stopping Base Case FIRST before any self-call',
        '2. ENSURE argument strictly shrinks toward Base Case every step',
        '3. CACHE overlapping calls cleanly with @lru_cache(None) or memo dict',
        '4. AVOID slicing sequences in recursive steps (pass indices l, r instead!)',
      ],
      banglaZeroToHero: {
        analogyTitle: '১,০০০ ধাপের লিমিট, কল-স্ট্যাক ও স্মার্ট ক্যাশিং (@lru_cache)',
        explanation:
          'যখন একটি পাইথন ফাংশন ছোট ইনপুট দিয়ে নিজেই নিজেকে ডাকে, তখন প্রতিটি কলের জন্য পাইথনের **Call Stack**-এ একটি নতুন **Stack Frame** যুক্ত হয় এবং একদম **Base Case**-এ পৌঁছে একে একে ওপর থেকে খুলে (`return`) উত্তর দেয়। প্রোগ্রাম যেন অসীম লুপে ক্র্যাশ না করে, সেজন্য পাইথনে ডিফল্টভাবে সর্বোচ্চ **১,০০০টি ফ্রেম** জমার পরই `RecursionError` থামিয়ে দেয়! তাই প্রথমত সবসময় নিখুঁত Base Case রাখতে হবে এবং প্রতিটি ধাপে ইনপুট অবশ্যই ছোট হতে হবে। দ্বিতীয়ত, `fib(n-1) + fib(n-2)` এভাবে লিখলে একই মান লক্ষ-কোটি বার গণনা হয়ে `O(2^N)` হয়ে যায়—পাইথনের `from functools import lru_cache` ডেকোরেটর (`@lru_cache(maxsize=None)`) বসিয়ে দিলেই বা `memo` ডিকশনারিতে জমা রাখলেই তা মুহূর্তেই `O(N)` হয়ে যায়! আরেকটি চমৎকার টিপস: স্ট্রিং বা লিস্ট স্লাইস করে (`s[1:-1]`) রিকার্সন করলে প্রতি ধাপে নতুন কপি তৈরি হয়ে `O(N^2)` খরচ হয়; এর বদলে শুধু ইনডেক্স `l, r` পাস করাই প্রো পদ্ধতি।',
        everydayExample:
          'যদি কেউ সিঁড়ি দিয়ে নামার হিসাব কাগজে লিখে রাখে (`memo`), তাহলে একই ধাপে আবার পৌঁছলে নতুন করে গুনতে হয় না—নোট দেখেই উত্তর বলে দেয়!',
        keyTakeaways: [
          'বেস কেস ভুল থাকলে বা ইনপুট ১,০০০-এর বেশি গভীর হলে পাইথনে `RecursionError` আসে।',
          '`@lru_cache(maxsize=None)` বা `memo` ডিকশনারি `O(2^N)` রিকার্সনকে মুহূর্তেই `O(N)` করে দেয়।',
          'রিকার্সিভ ফাংশনে স্লাইস `a[1:]` না পাঠিয়ে `idx` প্যারামিটার পাঠালে অযথা কপি হয় না।',
        ],
      },
    },
    topics: [
      {
        id: 'py-ch-15-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Recursive Factorial & LIFO Stack Unwind',
        englishParagraphs: [
          'Base case `if n <= 1: return 1` stops recursion cleanly before unwinding multiplications upward.',
          'Python arbitrary-precision ints handle `20!` or even `50!` with zero overflow.',
        ],
        banglaParagraphs: [
          '`if n <= 1: return 1` বেস কেসে পৌঁছানোর পর স্ট্যাক ফ্রেমগুলো খুলে ধাপে ধাপে গুণফল ফেরত আসে।',
          'পাইথনের `int` বড় ফ্যাক্টোরিয়ালেও ওভারফ্লো হয় না।',
        ],
        memoryDiagram: `fact(5) -> 5*fact(4) -> ... -> base 1 => 120`,
        code: `def fact(n: int) -> int:
    if n <= 1:
        return 1
    return n * fact(n - 1)

print(f"5!={fact(5)}")`,
        stdin: '',
        expectedOutput: '5!=120',
        lineByLine: [
          { lineNumber: 'Line 2', codeSnippet: 'if n <= 1: return 1', whatItMeans: 'Base case stopping recursive frame pushes.', whyItIsThere: 'Prevents RecursionError maximum depth exceeded.', ifDeletedError: 'Raises RecursionError immediately.' },
        ],
      },
      {
        id: 'py-ch-15-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Divide-and-Conquer Fast Modular Power (O(log e))',
        englishParagraphs: [
          'Halving exponent `e // 2` solves `a^e % m` in roughly 30 call frames even for `e = 10^9`!',
          'Stores `half` once per call so work never branches into `O(e)`.',
        ],
        banglaParagraphs: [
          'প্রতি ধাপে `e // 2` করে নামায় `e = 10^9` হলেও স্ট্যাকে মাত্র ৩০টি ফ্রেম লাগে।',
          '`half = mod_pow(a, e // 2, m)` একবারই কল করে স্কয়ার করা হয়েছে।',
        ],
        memoryDiagram: `mod_pow(2, 10, 1000) -> 24 in 4 recursive frames`,
        code: `def mod_pow(a: int, e: int, m: int) -> int:
    if e == 0:
        return 1 % m
    half = mod_pow(a, e // 2, m)
    res = (half * half) % m
    if e & 1:
        res = (res * (a % m)) % m
    return res

a, e, m = map(int, input().split())
print(mod_pow(a, e, m))`,
        stdin: '2 10 1000',
        expectedOutput: '24',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'half = mod_pow(a, e // 2, m)', whatItMeans: 'Recursively solves half-exponent subproblem once.', whyItIsThere: 'Guarantees O(log e) depth and speed.', ifDeletedError: 'Calling mod_pow twice triggers O(e) branching.' },
        ],
      },
      {
        id: 'py-ch-15-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Memoized Fibonacci With @lru_cache(maxsize=None)',
        englishParagraphs: [
          'Adding `@lru_cache(maxsize=None)` caches every `fib(k)` output automatically in a hash table.',
          'Turns `fib(40)` from billions of calls into just 41 cached calls.',
        ],
        banglaParagraphs: [
          '`@lru_cache(maxsize=None)` ডেকোরেটর ব্যবহার করলে প্রতিটি `fib(k)` একবারেই হিসাব হয়ে ক্যাশে জমা থাকে।',
          '`O(2^N)` কমে সরাসরি `O(N)` হয়ে যায়।',
        ],
        memoryDiagram: `fib(40) cached -> 102334155 in ~40 dictionary hits`,
        code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(f"fib(40)={fib(40)}")`,
        stdin: '',
        expectedOutput: 'fib(40)=102334155',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: '@lru_cache(maxsize=None)', whatItMeans: 'Memoizes function outputs keyed by input arguments.', whyItIsThere: 'Eliminates exponential duplicate subcalls.', ifDeletedError: 'fib(40) stalls computing ~10^9 calls.' },
        ],
      },
      {
        id: 'py-ch-15-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'List/String Slicing Inside Recursion Trap vs Index Bounds',
        englishParagraphs: [
          'Calling `pal(s[1:-1])` allocates a new slice copy on every frame (`O(N^2)` memory & time).',
          'Passing indices `(s, l, r)` keeps every recursive frame `O(1)` in memory.',
        ],
        banglaParagraphs: [
          'রিকার্সিভ কলের ভেতরে `s[1:-1]` স্লাইস বানালে প্রতি ধাপে পুরো স্ট্রিং কপি হয়!',
          'তার চেয়ে ইনডেক্স `l` ও `r` পাস করলেই `O(1)` ফ্রেমে কাজ চলে।',
        ],
        memoryDiagram: `TRAP: pal(s[1:-1]) O(N^2) | FIX: is_pal(s, l, r) O(1) per frame`,
        code: `def is_pal(s: str, l: int, r: int) -> bool:
    if l >= r:
        return True
    if s[l] != s[r]:
        return False
    return is_pal(s, l + 1, r - 1)

word = "madam"
print("YES" if is_pal(word, 0, len(word) - 1) else "NO")`,
        stdin: '',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 1', codeSnippet: 'def is_pal(s: str, l: int, r: int) -> bool:', whatItMeans: 'Passes outer bounds instead of slicing copies.', whyItIsThere: 'Avoids O(N^2) copy allocation across call depth.', ifDeletedError: 'Function missing.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: 'def fact(n: int) -> int:', whatItMeans: 'Defines recursive function accepting integer n.', whyItIsThere: 'Encapsulates self-similar problem breakdown.', ifDeletedError: 'NameError: fact undefined.' },
      { lineNumber: 'Line 2', codeSnippet: 'if n <= 1:', whatItMeans: 'Stopping base condition.', whyItIsThere: 'Halts stack growth before hitting negative numbers.', ifDeletedError: 'RecursionError crash.' },
      { lineNumber: 'Line 4', codeSnippet: 'return n * fact(n - 1)', whatItMeans: 'Delegates (n - 1)! to child stack frame.', whyItIsThere: 'Reduces problem strictly by 1 each call.', ifDeletedError: 'Returns None on n > 1.' },
    ],
    dryRunTable: [
      { step: 1, state: 'call fact(5)', memoryOrStack: 'stack: [5]', note: 'Waits on fact(4)' },
      { step: 2, state: 'descend 4..2', memoryOrStack: 'stack: [5,4,3,2]', note: '4 active frames' },
      { step: 3, state: 'fact(1) == 1', memoryOrStack: 'Base case met', note: 'Starts popping' },
      { step: 4, state: 'unwind to top', memoryOrStack: '2 -> 6 -> 24 -> 120', note: 'Outputs 5!=120' },
    ],
    harryBugTraps: [
      { title: 'Trap 1: Hitting Python 1000-Frame RecursionError', brokenCode: `def s(n): return 0 if n == 0 else n + s(n - 1)\ns(5000) # RecursionError!`, fixedCode: `# Use loop or sys.setrecursionlimit(20000) only for <= ~10^4 depth`, whyItBreaks: 'CPython caps call depth at 1000 by default to prevent OS stack overflow.' },
      { title: 'Trap 2: O(2^N) Branching Without @lru_cache', brokenCode: `def fib(n): return n if n <= 1 else fib(n-1) + fib(n-2) # Freezes at n=40!`, fixedCode: `@lru_cache(maxsize=None)\ndef fib(n): ...`, whyItBreaks: 'Recomputing overlapping subproblems multiplies calls exponentially.' },
      { title: 'Trap 3: Slicing Sequences on Every Recursive Step', brokenCode: `def rec(arr): return 0 if not arr else arr[0] + rec(arr[1:])`, fixedCode: `def rec(arr, i): return 0 if i == len(arr) else arr[i] + rec(arr, i + 1)`, whyItBreaks: 'arr[1:] copies the remaining slice on every frame, causing O(N^2) runtime.' },
    ],
    practiceSheet: [
      { id: 'py-ch15-p1', difficulty: 'Easy', title: 'Recursive Factorial', prompt: 'Read `n` and recursively compute `n!`.', banglaHint: '`n <= 1` হলে `1` রিটার্ন করো।', starterCode: `def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)\nprint(fact(int(input())))`, sampleStdin: '6', expectedOutput: '720' },
      { id: 'py-ch15-p2', difficulty: 'Easy', title: 'Recursive Digit Sum', prompt: 'Sum digits of integer `n` recursively.', banglaHint: '`0` হলে `0`, নইলে `(n % 10) + dsum(n // 10)`।', starterCode: `def dsum(n):\n    return 0 if n == 0 else (n % 10) + dsum(n // 10)\nprint(dsum(int(input())))`, sampleStdin: '9421', expectedOutput: '16' },
      { id: 'py-ch15-p3', difficulty: 'Medium', title: 'Recursive Array Sum by Index', prompt: 'Read `N` and list, compute sum recursively passing index `i` (no slicing).', banglaHint: 'লিস্ট স্লাইস না করে `i == len(a)` বেস কেস রাখো।', starterCode: `n = int(input())\na = list(map(int, input().split()))[:n]\ndef rsum(i):\n    return 0 if i == len(a) else a[i] + rsum(i + 1)\nprint(rsum(0))`, sampleStdin: '4\n3 7 2 8', expectedOutput: '20' },
      { id: 'py-ch15-p4', difficulty: 'Medium', title: 'Memoized Fibonacci N', prompt: 'Read `n` (`0..50`) and print `fib(n)` using `@lru_cache(maxsize=None)`.', banglaHint: '`from functools import lru_cache` ব্যবহার করো।', starterCode: `from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n <= 1 else fib(n - 1) + fib(n - 2)\nprint(fib(int(input())))`, sampleStdin: '10', expectedOutput: '55' },
      { id: 'py-ch15-p5', difficulty: 'Hard', title: 'Fast Binary Modular Power', prompt: 'Read `a, e, m` and recursively compute `(a^e) % m` in `O(log e)`.', banglaHint: '`half = mp(a, e // 2, m)` একবারই বের করে স্কয়ার করো।', starterCode: `def mp(a, e, m):\n    if e == 0: return 1 % m\n    h = mp(a, e // 2, m)\n    r = (h * h) % m\n    if e & 1: r = (r * (a % m)) % m\n    return r\na, e, m = map(int, input().split())\nprint(mp(a, e, m))`, sampleStdin: '2 10 1000', expectedOutput: '24' },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Memoized Climbing Stairs Solver',
      description: 'Combine Ch 1–15: cached recursion (@lru_cache) to count distinct ways to climb N steps (1 or 2 at a time).',
      banglaGoal: 'অধ্যায় ১–১৫ মিলিয়ে মেমোয়াইজড রিকার্সনে `N` তম সিঁড়িতে ওঠার মোট উপায় নির্ণয় করো।',
      combinesChapters: 'Python Ch 1–15 (Milestone Merger 3)',
      starterCode: `from functools import lru_cache

@lru_cache(maxsize=None)
def ways(n: int) -> int:
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

n = int(input().strip())
print(ways(n))`,
      sampleStdin: '5',
      expectedOutput: '8',
    },
    starterCode: `from functools import lru_cache

@lru_cache(maxsize=None)
def ways(n: int) -> int:
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

n = int(input().strip())
print(ways(n))`,
    sampleStdin: '5',
    expectedSampleOutput: '8',
    testCases: [
      { id: 'py15-t1', input: '5', expectedOutput: '8' },
      { id: 'py15-t2', input: '10', expectedOutput: '89', isHidden: true },
    ],
  },
};


