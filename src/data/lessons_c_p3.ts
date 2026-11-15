import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_C_P3: Record<number, AtomicLessonOverride> = {
  11: {
    chapterNumber: 11,
    title: 'C Chapter 11 (C23): 1D Arrays, Traversal & Frequency Counting',
    banglaTitle: 'C অধ্যায় ১১ (C23): ১ডি অ্যারে, ট্রাভার্সাল ও ফ্রিকোয়েন্সি কাউন্টিং',
    subtitle: 'Contiguous O(1) RAM indexing, L1 cache locality, frequency bucket arrays, and stack vs static storage limits.',
    zeroIntuition: {
      plainEnglishStory:
        'Suppose you need to store 100,000 test scores. Creating 100,000 separate variables (`s1`, `s2`, ...) is impossible—an array reserves ONE contiguous slab of RAM where element `i` sits at exact byte address `base + i * sizeof(elem)`.\n\nBecause every slot lives side-by-side in memory, CPU hardware prefetchers load upcoming elements into L1 cache ahead of time. Paired with a frequency array `freq[val]++`, you can count occurrences and detect duplicates in O(n) time instead of O(n^2) nested scans.',
      asciiFlowchart: `  Contiguous RAM Layout: int a[5] = {1, 2, 3, 2, 2}
  Addr:  0x100   0x104   0x108   0x10C   0x110
  Slot: [  1  |   2   |   3   |   2   |   2  ]
  Idx:    [0]     [1]     [2]     [3]     [4]   --> freq[2] == 3`,
      pseudocode: [
        '1. READ n and target value (check bounds before indexing)',
        '2. ALLOCATE contiguous array (static/heap if n > 10^5)',
        '3. SWEEP index 0..n-1 tracking max element and target frequency',
        '4. PRINT result in O(n) single pass',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এক সারিতে সাজানো নম্বরযুক্ত লকার ও ভোটের ব্যালট বক্স (1D Array)',
        explanation:
          'কল্পনা করো একই সারিতে ১০০টি লকার পাশাপাশি বসানো আছে এবং প্রতিটির গায়ে `0` থেকে `99` নম্বর লেখা। প্রথম লকারের ঠিকানা জানা থাকলে `47` নম্বর লকারে পৌঁছাতে ১ থেকে ৪৬ পর্যন্ত প্রতিটি দরজা খুলে দেখার দরকার নেই—সিধা `base + 47 * size` সূত্রে ১ ধাপেই অর্থাৎ `O(1)` সময়ে পৌঁছে যাওয়া যায়! C ভাষায় অ্যারের ইনডেক্স সবসময় `0` থেকে শুরু হয়ে `n - 1` এ শেষ হয়; ভুলেও `a[n]` অ্যাক্সেস করলে মেমোরির বাইরের জায়গায় ঢুকে Segmentation Fault বা অদ্ভুত বাগ তৈরি হবে। ফ্রিকোয়েন্সি অ্যারে হলো এই ইনডেক্সিংয়ের এক অসাধারণ প্রয়োগ: কোন সংখ্যা বা অক্ষর কতবার এসেছে তা বের করতে `freq[x]++` লিখলেই মাত্র এক লুপে হিসাব হয়ে যায়। উদাহরণস্বরূপ `"banana"`-তে প্রতিটি অক্ষর কতবার আছে তা `freq[ch - \'a\']++` দিয়ে `O(n)` সময়ে বের করা যায়! তবে C-তে একটি বড় সতর্কতা হলো লোকাল ফাংশনের ভেতর `int a[1000000]` ঘোষণা করলে ১-৮ মেগাবাইট স্ট্যাক উপচে পড়ে প্রোগ্রাম ক্র্যাশ (Stack Overflow) করবে। তাই বড় অ্যারে সবসময় `main()`-এর বাইরে গ্লোবাল/`static` হিসেবে অথবা `malloc` দিয়ে হিপে রাখতে হয়। আর অ্যারে ঘোষণা করার সাথে সাথে `{0}` দিয়ে শূন্য না বসালে ভেতরে আগের আবর্জনা (Garbage Value) থেকে যাবে!',
        everydayExample:
          'নির্বাচনের ভোট গণনায় ১০টি প্রার্থীর জন্য ১ থেকে ১০ নম্বর ব্যালট বক্স রাখা হলো—প্রতিটি ভোট পেলেই ওই বক্সে টালি `+1` করা হলো `freq[vote]++`!',
        keyTakeaways: [
          'C অ্যারের ইনডেক্স `0` থেকে `n - 1`; `a[n]` লেখা মারাত্মক Out-of-Bounds বাগ।',
          'লোকাল স্ট্যাকে বড় অ্যারে (`> 10^5` উপাদান) রাখবে না; গ্লোবাল বা `static` ব্যবহার করো।',
          'লোকাল অ্যারে `{0}` দিয়ে ইনিশিয়ালাইজ করো নইলে `freq[i]++` আবর্জনা মান বাড়াবে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-11-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Contiguous Array Indexing & Zero-Initialization {0}',
        englishParagraphs: [
          'Writing `int a[5] = {10, 20, 30, 40, 50};` packs 20 consecutive bytes on the stack. Partial initialization like `int freq[10] = {0};` zeroes every single slot cleanly.',
          'Always maintain loop bound `i < n` so index `n` is never dereferenced.',
        ],
        banglaParagraphs: [
          'এই প্রোগ্রামে `int a[4] = {10, 20, 30, 40};` দিয়ে ৪টি সংখ্যা পাশাপাশি রাখা হয়েছে এবং `i = 0` থেকে `i < 4` লুপে যোগফল বের করা হয়েছে।',
          '`int freq[5] = {0};` লিখলে পুরো অ্যারের সব ঘর শুরুতেই ০ হয়ে যায়।',
        ],
        memoryDiagram: `a[0]=10, a[1]=20, a[2]=30, a[3]=40 -> sum = 100`,
        code: `#include <stdio.h>

int main(void) {
    int a[4] = {10, 20, 30, 40};
    long long sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += a[i];
    }
    printf("sum=%lld\\n", sum);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum=100',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int a[4] = {10, 20, 30, 40};', whatItMeans: 'Allocates 4 contiguous integers (16 bytes) initialized cleanly.', whyItIsThere: 'Guarantees zero garbage values in array slots.', ifDeletedError: 'Compile error: a undeclared.' },
          { lineNumber: 'Line 6', codeSnippet: 'for (int i = 0; i < 4; i++) {', whatItMeans: 'Sweeps exact valid indices 0, 1, 2, 3.', whyItIsThere: 'Strict `< 4` prevents reading past a[3].', ifDeletedError: 'Loop missing; sum remains 0.' },
          { lineNumber: 'Line 7', codeSnippet: 'sum += a[i];', whatItMeans: 'Reads slot at base + i * 4 bytes in O(1) and adds to sum.', whyItIsThere: 'Accumulates total across all elements.', ifDeletedError: 'Prints sum=0.' },
        ],
      },
      {
        id: 'c-ch-11-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Single-Pass Max Element & Target Frequency Counter',
        englishParagraphs: [
          'Reading `n` and `target`, we can track the running maximum and count how often `target` occurs in a single `O(n)` pass.',
          'Initializing `mx` using `i == 0` ensures negative arrays like `[-10, -3, -7]` report `-3`, not bogus `0`!',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে অ্যারের বড় সংখ্যা এবং একটি নির্দিষ্ট `target` সংখ্যা কতবার আছে তা মাত্র ১টি লুপেই বের করা হয়েছে।',
          'খেয়াল রাখবে সব সংখ্যা নেগেটিভ হতে পারে বলে `mx = 0` না ধরে প্রথম উপাদান `a[0]` দিয়ে `mx` শুরু করতে হয়!',
        ],
        memoryDiagram: `a=[1, 2, 3, 2, 2], target=2 -> mx=3, freq=3`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) == 2 && n > 0) {
        long long mx = 0;
        int freq = 0;
        for (int i = 0; i < n; i++) {
            long long x = 0;
            if (scanf("%lld", &x) != 1) break;
            if (i == 0 || x > mx) mx = x;
            if (x == target) freq++;
        }
        printf("%lld %d\\n", mx, freq);
    }
    return 0;
}`,
        stdin: '5 2\n1 2 3 2 2',
        expectedOutput: '3 3',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (i == 0 || x > mx) mx = x;', whatItMeans: 'Seeds max with first element instead of hardcoding 0.', whyItIsThere: 'Handles all-negative inputs accurately.', ifDeletedError: 'All-negative arrays print false max 0!' },
        ],
      },
      {
        id: 'c-ch-11-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Frequency Histogram Buckets (Grades 0..10)',
        englishParagraphs: [
          'Quiz grading tools count how many students earned each score `0..10` using a fixed 11-slot bucket array `cnt[11] = {0}`.',
          'Adding a range guard `if (v >= 0 && v <= 10)` prevents malformed data from writing out of bounds.',
        ],
        banglaParagraphs: [
          '০ থেকে ১০ নম্বরের একটি পরীক্ষায় কোন নম্বর কতজন পেয়েছে তা `cnt[11] = {0}` বাকেট অ্যারে দিয়ে মুহূর্তেই গুনে ফেলা যায়।',
          'ইনডেক্স বসানোর আগে `v >= 0 && v <= 10` চেক করা নিরাপদ কোডিংয়ের নিয়ম।',
        ],
        memoryDiagram: `scores=[7, 10, 7, 5, 7] -> cnt[5]=1, cnt[7]=3, cnt[10]=1`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    int cnt[11] = {0};
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n; i++) {
            int s = 0;
            if (scanf("%d", &s) == 1 && s >= 0 && s <= 10) cnt[s]++;
        }
        printf("5:%d 7:%d 10:%d\\n", cnt[5], cnt[7], cnt[10]);
    }
    return 0;
}`,
        stdin: '5\n7 10 7 5 7',
        expectedOutput: '5:1 7:3 10:1',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'int cnt[11] = {0};', whatItMeans: 'Zero-initializes all 11 frequency buckets 0..10.', whyItIsThere: 'Prevents uninitialized garbage counts.', ifDeletedError: 'Buckets hold random stack garbage.' },
        ],
      },
      {
        id: 'c-ch-11-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'In-Place Array Reverse & Static Large Buffer Pattern',
        englishParagraphs: [
          'Competitive programming constraints frequently reach `n = 200,000`. Declaring `long long a[200000]` inside `main()` risks Stack Overflow, whereas `static long long a[200005];` places it safely in the BSS data segment zeroed automatically by the OS!',
          'Reversing in place uses two indices `i < n / 2` swapping `a[i]` and `a[n - 1 - i]`.',
        ],
        banglaParagraphs: [
          'কনটেস্টে `n = 200,000` সাইজের অ্যারে `main()`-এর ভেতরে রাখলে স্ট্যাক ওভারফ্লো হতে পারে; তাই `static` বা গ্লোবাল অ্যারে ব্যবহার করা নিরাপদ।',
          'অ্যারে উল্টাতে নতুন অ্যারে না বানিয়ে `a[i]` আর `a[n - 1 - i]` অদলবদল করলেই `O(1)` অতিরিক্ত মেমোরিতে কাজ শেষ হয়!',
        ],
        memoryDiagram: `[10, 20, 30, 40] -> swap(0,3), swap(1,2) -> [40, 30, 20, 10]`,
        code: `#include <stdio.h>

static long long a[200005];

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n > 0 && n <= 200000) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        for (int i = 0; i < n / 2; i++) {
            long long t = a[i];
            a[i] = a[n - 1 - i];
            a[n - 1 - i] = t;
        }
        for (int i = 0; i < n; i++) printf("%lld%s", a[i], i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'static long long a[200005];', whatItMeans: 'Allocates 1.6 MB array in BSS segment instead of limited stack.', whyItIsThere: 'Prevents Stack Overflow and auto-initializes all entries to 0.', ifDeletedError: 'Compile error: a undeclared.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Loads standard I/O header for printf.', whyItIsThere: 'Makes console output available.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'int main(void) {', whatItMeans: 'Program start function.', whyItIsThere: 'Entry point for OS runtime.', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 4', codeSnippet: 'int a[4] = {10, 20, 30, 40};', whatItMeans: 'Creates contiguous 4-element int array in RAM.', whyItIsThere: 'Stores indexed elements sequentially in L1-friendly layout.', ifDeletedError: 'Compile error: a undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long sum = 0;', whatItMeans: '64-bit accumulator initialized to 0.', whyItIsThere: 'Avoids overflow and garbage initial value.', ifDeletedError: 'Compile error: sum undeclared.' },
      { lineNumber: 'Line 6', codeSnippet: 'for (int i = 0; i < 4; i++) {', whatItMeans: 'Iterates indices 0, 1, 2, 3 safely.', whyItIsThere: 'Strict `< 4` respects zero-based upper boundary.', ifDeletedError: 'Array slots never summed.' },
      { lineNumber: 'Line 7', codeSnippet: 'sum += a[i];', whatItMeans: 'Fetches element i in O(1) and accumulates.', whyItIsThere: 'Computes total sum across all array slots.', ifDeletedError: 'Prints sum=0.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Init array a[4]', memoryOrStack: 'a={10,20,30,40}, sum=0', note: 'Contiguous 16 bytes' },
      { step: 2, state: 'i = 0, 1', memoryOrStack: 'sum = 0+10+20 = 30', note: 'Reads a[0], a[1]' },
      { step: 3, state: 'i = 2, 3', memoryOrStack: 'sum = 30+30+40 = 100', note: 'Reads a[2], a[3]' },
      { step: 4, state: 'i = 4 terminates loop', memoryOrStack: 'stdout="sum=100"', note: 'Zero out-of-bounds access' },
    ],
    harryBugTraps: [
      {
        title: 'Off-By-One Loop Condition (i <= n)',
        brokenCode: `int a[5] = {1,2,3,4,5}; for (int i = 0; i <= 5; i++) printf("%d", a[i]);`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int a[5] = {1, 2, 3, 4, 5};\n    for (int i = 0; i < 5; i++) printf("%d ", a[i]);\n    return 0;\n}`,
        whyItBreaks: 'Valid indices for size 5 are 0..4; accessing a[5] reads out-of-bounds garbage or crashes (SIGSEGV).',
      },
      {
        title: 'Forgetting {0} Initialization on Local Frequency Array',
        brokenCode: `int freq[26]; freq[0]++; // reads garbage!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int freq[26] = {0};\n    freq[0]++;\n    printf("%d\\n", freq[0]);\n    return 0;\n}`,
        whyItBreaks: 'Local stack arrays hold random leftover bytes unless explicitly initialized with = {0}.',
      },
      {
        title: 'Indexing Negative Values Directly Into freq[]',
        brokenCode: `int freq[100] = {0}; int x = -5; freq[x]++;`,
        fixedCode: `#include <stdio.h>\n#define OFF 100\nint main(void) {\n    int freq[205] = {0}; int x = -5;\n    freq[x + OFF]++;\n    printf("%d\\n", freq[x + OFF]);\n    return 0;\n}`,
        whyItBreaks: 'Negative index accesses memory before the start of the array, corrupting neighboring stack variables.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Minimum & Maximum Difference',
        prompt: 'Read n then n integers; print (max - min) in one O(n) pass.',
        banglaHint: 'প্রথম সংখ্যাকে mx ও mn দুটোই ধরে নিয়ে বাকিগুলো তুলনা করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1 && n > 0) {\n        long long x = 0, mn = 0, mx = 0;\n        scanf("%lld", &x); mn = mx = x;\n        for (int i = 1; i < n && scanf("%lld", &x) == 1; i++) {\n            if (x < mn) mn = x; if (x > mx) mx = x;\n        }\n        printf("%lld\\n", mx - mn);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n4 9 1 7 3',
        expectedOutput: '8',
      },
      {
        id: 'c-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Count Elements Strictly Above Average',
        prompt: 'Read n then n integers; print count of elements strictly greater than array mean.',
        banglaHint: 'ফ্লোটিং পয়েন্ট এড়াতে `a[i] * n > sum` সূত্র দিয়ে চেক করো!',
        starterCode: `#include <stdio.h>\nstatic long long a[100005];\nint main(void) {\n    int n = 0; long long sum = 0;\n    if (scanf("%d", &n) == 1 && n > 0) {\n        for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); sum += a[i]; }\n        int cnt = 0;\n        for (int i = 0; i < n; i++) if (a[i] * n > sum) cnt++;\n        printf("%d\\n", cnt);\n    }\n    return 0;\n}`,
        sampleStdin: '4\n2 4 6 8',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-11-q3',
        difficulty: 'Medium',
        title: '3. Second Largest Distinct Element',
        prompt: 'Read n then n integers; print the second largest distinct value, or -1 if none.',
        banglaHint: 'প্রথম ও দ্বিতীয় সর্বোচ্চ মান আলাদা ভ্যারিয়েবলে রাখো এবং ডুপ্লিকেট `x == best1` এড়িয়ে চলো।',
        starterCode: `#include <stdio.h>\n#include <limits.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        long long b1 = LLONG_MIN, b2 = LLONG_MIN, x = 0;\n        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) {\n            if (x > b1) { b2 = b1; b1 = x; }\n            else if (x < b1 && x > b2) b2 = x;\n        }\n        printf("%lld\\n", b2 == LLONG_MIN ? -1 : b2);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n8 10 10 4 9',
        expectedOutput: '9',
      },
      {
        id: 'c-ch-11-q4',
        difficulty: 'Medium',
        title: '4. Missing Number in 1..N Permutation',
        prompt: 'Read n followed by n-1 distinct numbers from 1..n; print the missing number.',
        banglaHint: 'মোট যোগফল `n*(n+1)/2` থেকে সব ইনপুটের যোগফল বিয়োগ করলেই হারানো সংখ্যা পাওয়া যায়!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n = 0, x = 0, got = 0;\n    if (scanf("%lld", &n) == 1) {\n        for (long long i = 0; i < n - 1 && scanf("%lld", &x) == 1; i++) got += x;\n        printf("%lld\\n", n * (n + 1) / 2 - got);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n1 5 2 4',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Most Frequent Value in Bounded Range [0..1000]',
        prompt: 'Read n then n numbers in [0..1000]; print the most frequent number (smallest tie-breaker).',
        banglaHint: '`freq[1001] = {0}` ব্যবহার করে বাম থেকে ডানে সর্বোচ্চ ফ্রিকোয়েন্সি খুঁজে নাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0, freq[1001] = {0}, x = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) if (x >= 0 && x <= 1000) freq[x]++;\n        int best = 0;\n        for (int v = 1; v <= 1000; v++) if (freq[v] > freq[best]) best = v;\n        printf("%d\\n", best);\n    }\n    return 0;\n}`,
        sampleStdin: '6\n4 7 4 9 7 4',
        expectedOutput: '4',
      },
    ],
    miniBuild: {
      title: '1D Array Max & Frequency Scanner',
      description: 'Computes array peak and frequency count in one cache-friendly O(n) scan.',
      banglaGoal: 'একটি O(n) পাসে অ্যারের সর্বোচ্চ মান ও নির্দিষ্ট সংখ্যার ফ্রিকোয়েন্সি বের করা।',
      combinesChapters: 'Ch 1–11',
      starterCode: `#include <stdio.h>

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long mx = 0;
    int freq = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        if (i == 0 || x > mx) mx = x;
        if (x == target) freq++;
    }
    printf("%lld %d\\n", mx, freq);
    return 0;
}`,
      sampleStdin: '5 2\n1 2 3 2 2',
      expectedOutput: '3 3',
    },
    starterCode: `#include <stdio.h>

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long mx = 0;
    int freq = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        if (i == 0 || x > mx) mx = x;
        if (x == target) freq++;
    }
    printf("%lld %d\\n", mx, freq);
    return 0;
}`,
    sampleStdin: '5 2\n1 2 3 2 2',
    expectedSampleOutput: '3 3',
    testCases: [
      { id: 'c11-t1', input: '5 2\n1 2 3 2 2', expectedOutput: '3 3' },
      { id: 'c11-t2', input: '4 9\n4 9 1 5', expectedOutput: '9 1', isHidden: true },
    ],
  },

  12: {
    chapterNumber: 12,
    title: 'C Chapter 12 (C23): Two-Pointer & Sliding Window Basics',
    banglaTitle: 'C অধ্যায় ১২ (C23): টু-পয়েন্টার ও স্লাইডিং উইন্ডো বেসিকস',
    subtitle: 'Opposite-end converging pointers, same-direction slow/fast compaction, and O(n) fixed/variable sliding windows.',
    zeroIntuition: {
      plainEnglishStory:
        'Suppose you must find whether a sorted array contains two numbers summing to `target`, or find the maximum sum of `k` consecutive items. Brute forcing every pair `(i, j)` costs `O(n^2)`—too slow for `n = 200,000`!\n\nTwo Pointers turns sorted search into `O(n)`: start `l = 0` and `r = n - 1`. If `a[l] + a[r] > target`, ONLY moving `r--` can reduce the sum; if too small, move `l++`. Likewise, Sliding Window maintains a running window sum across `[l..r]` by adding incoming `a[r]` and subtracting outgoing `a[l]`—each pointer advances at most `n` steps total!',
      asciiFlowchart: `  Sorted Array: [ 2 | 4 | 7 | 11 | 15 ], target = 15
                  ^l=0             ^r=4
  2 + 15 = 17 > 15 --> move r-- (too big!)
  2 + 11 = 13 < 15 --> move l++ (too small!)
  4 + 11 = 15 == 15 --> FOUND in O(n)!`,
      pseudocode: [
        '1. INITIALIZE two indices l = 0 and r = n - 1 (or sliding window l = 0, r = 0)',
        '2. COMPUTE current pair/window invariant in O(1)',
        '3. ADVANCE l++ or r-- monotonically using ordering / positivity property',
        '4. NEVER reset pointers backwards so total steps <= 2n = O(n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'দুই প্রান্ত থেকে এগোনো হাত ও ট্রেনের চলমান জানালা (Two Pointers & Window)',
        explanation:
          'ধরো একটি ছোট থেকে বড় সাজানো (Sorted) তালিকায় এমন দুটি সংখ্যা খুঁজতে হবে যাদের যোগফল ঠিক `target`। সাধারণ দুটি লুপ চালালে `O(n^2)` সময় লাগবে। কিন্তু বাম মাথায় `l = 0` আর ডান মাথায় `r = n - 1` বসালে ম্যাজিক শুরু হয়: যদি `a[l] + a[r]` যোগফল `target`-এর চেয়ে বড় হয় তবে ডান দিক থেকে `r--` কমাও, আর ছোট হলে `l++` বাড়াও—এভাবে মাত্র `O(n)` সময়েই জোড়া মিলে যাবে! ঠিক একইভাবে, পাশাপাশি `k`টি ঘরের সর্বোচ্চ যোগফল বের করতে প্রতিবার নতুন করে `k`টি সংখ্যা যোগ না করে চলমান জানালা (Sliding Window) ব্যবহার করো: ডানে নতুন ঘর ঢুকলে সেটি যোগ করো আর বাম থেকে বেরিয়ে যাওয়া ঘরটি বিয়োগ করো (`sum += a[r] - a[r - k]`)! আবার ভ্যারিয়েবল উইন্ডোতে `while (sum > S)` লুপ থাকলেও ভয় পাবে না—কারণ পুরো প্রোগ্রাম জুড়ে `l` এবং `r` কেউই পিছু হটে না, দুজনেই সর্বোচ্চ `n` ধাপ সামনে যায়; তাই মোট কাজ `2n` অর্থাৎ строго `O(n)` থাকে! তবে একটি বড় নিয়ম মনে রাখবে: অ্যারেতে নেগেটিভ সংখ্যা থাকলে ডানে গেলে যোগফল বাড়বে না কমবে তা নিশ্চিত নয়, তাই ভ্যারিয়েবল স্লাইডিং উইন্ডো কেবল অ-ঋণাত্মক (Non-negative) সংখ্যায় নির্ভুল কাজ করে। এছাড়াও ইন-প্লেস অ্যারে থেকে ডুপ্লিকেট সরাতে Slow-Fast দুই পয়েন্টার দারুণ কাজে দেয়।',
        everydayExample:
          'ট্রেইনের জানালা দিয়ে একসাথে ৩টি বগি দেখা যাচ্ছে; ট্রেন ১ বগি সামনে এগোলে সামনে ১টি নতুন বগি যোগ হয় আর পেছন থেকে ১টি পুরোনো বগি বাদ পড়ে—প্রতিবার সব বগি নতুন করে গুনতে হয় না!',
        keyTakeaways: [
          'সর্টেড অ্যারেতে `while (l < r)` দুটি আলাদা উপাদান চেক করে, প্যালিনড্রোম ও পেয়ার-সামে সেরা।',
          'প্রতিটি পয়েন্টার কেবল সামনের দিকেই এগোয়, তাই নেস্টেড `while` সত্ত্বেও কমপ্লেক্সিটি `O(n)`।',
          'ভ্যারিয়েবল সাম উইন্ডোতে নেগেটিভ সংখ্যা থাকলে মনোটনিসিটি ভাঙে—তখন Prefix Sum + Hash Map লাগে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-12-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Fixed-Size K Sliding Window Maximum Sum',
        englishParagraphs: [
          'First sum the initial `k` elements `[0..k-1]`. Then slide `i` from `k` to `n - 1`: add `a[i]` and subtract `a[i - k]` in O(1) per step.',
          'Total work drops from `O(n * k)` down to `O(n)` with zero nested loops.',
        ],
        banglaParagraphs: [
          'প্রথমে প্রথম `k`টি উপাদানের যোগফল নিয়ে তারপর প্রতিটি ধাপে `sum += a[i] - a[i - k]` করলে একদম ১ লাইনে জানালা সরে যায়।',
          '`n = 10^5, k = 50,000` হলেও মাত্র ১ লক্ষ যোগ-বিয়োগেই উত্তর বের হয়ে আসে!',
        ],
        memoryDiagram: `[2, 1, 5, 1, 3, 2], k=3 -> [2,1,5]=8 -> [1,5,1]=7 -> [5,1,3]=9 (max!)`,
        code: `#include <stdio.h>

int main(void) {
    int a[6] = {2, 1, 5, 1, 3, 2};
    int n = 6, k = 3;
    long long win = 0;
    for (int i = 0; i < k; i++) win += a[i];
    long long best = win;
    for (int i = k; i < n; i++) {
        win += a[i] - a[i - k];
        if (win > best) best = win;
    }
    printf("max_window=%lld\\n", best);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'max_window=9',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'for (int i = 0; i < k; i++) win += a[i];', whatItMeans: 'Seeds first window [0..k-1].', whyItIsThere: 'Establishes initial sliding state.', ifDeletedError: 'win starts at 0 and produces wrong window sums.' },
          { lineNumber: 'Line 10', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Adds incoming element a[i] and removes outgoing a[i-k].', whyItIsThere: 'Updates window sum in O(1) instead of re-summing k elements.', ifDeletedError: 'Window sum freezes at initial value.' },
        ],
      },
      {
        id: 'c-ch-12-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Opposite-End Two Pointers on Sorted Array (Pair Sum)',
        englishParagraphs: [
          'Given sorted input, `l = 0` and `r = n - 1` converge toward the center. Strict `l < r` guarantees two distinct array positions.',
          'Using 64-bit `long long` prevents overflow when summing `a[l] + a[r]`.',
        ],
        banglaParagraphs: [
          'সর্টেড অ্যারেতে দুটি সংখ্যার যোগফল `target` কি না দেখতে বাম `l = 0` ও ডান `r = n - 1` চালানো হয়েছে।',
          '`a[l] + a[r]` বড় হলে `r--`, ছোট হলে `l++`—মাত্র `O(n)` সময়েই সমাধান হয়।',
        ],
        memoryDiagram: `arr=[1,3,4,6,8], target=10 -> 1+8=9(<10)->l++ -> 3+8=11(>10)->r-- -> 4+6=10 FOUND`,
        code: `#include <stdio.h>

static long long a[200005];

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) == 2 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        int l = 0, r = n - 1, found = 0;
        while (l < r) {
            long long s = a[l] + a[r];
            if (s == target) { found = 1; break; }
            if (s < target) l++;
            else r--;
        }
        printf("%s\\n", found ? "YES" : "NO");
    }
    return 0;
}`,
        stdin: '5 10\n1 3 4 6 8',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'while (l < r) {', whatItMeans: 'Continues while at least two distinct indices remain.', whyItIsThere: 'Prevents pairing element a[i] with itself.', ifDeletedError: 'Cannot iterate pointers inward.' },
        ],
      },
      {
        id: 'c-ch-12-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Slow & Fast Pointers: In-Place Sorted Deduplication',
        englishParagraphs: [
          'Streaming deduplicators compress sorted duplicate logs in-place with O(1) auxiliary space: `write` tracks the end of the unique prefix while `read` scans forward.',
          'Whenever `a[read] != a[write]`, advance `write++` and copy `a[read]` forward.',
        ],
        banglaParagraphs: [
          'লগ ফাইল বা সর্টেড ডেটা থেকে নতুন অ্যারে না বানিয়েই ডুপ্লিকেট সরাতে Slow (`write`) ও Fast (`read`) দুই পয়েন্টার ব্যবহার করা হয়।',
          'নতুন ভিন্ন মান পেলেই `write` এক ঘর বাড়িয়ে মানটি বসিয়ে দেওয়া হয়—এতে মেমোরি খরচ `O(1)` থাকে!',
        ],
        memoryDiagram: `[1,1,2,2,2,5] -> write stops at idx 2 -> unique prefix=[1,2,5] len=3`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n > 0 && n <= 1000) {
        int a[1000];
        for (int i = 0; i < n; i++) scanf("%d", &a[i]);
        int w = 0;
        for (int r = 1; r < n; r++) {
            if (a[r] != a[w]) a[++w] = a[r];
        }
        printf("unique=%d\\n", w + 1);
    }
    return 0;
}`,
        stdin: '6\n1 1 2 2 2 5',
        expectedOutput: 'unique=3',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'if (a[r] != a[w]) a[++w] = a[r];', whatItMeans: 'Copies next distinct element into next unique slot.', whyItIsThere: 'Compacts unique items into front of array in O(1) RAM.', ifDeletedError: 'Always prints unique=1.' },
        ],
      },
      {
        id: 'c-ch-12-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Dynamic Sliding Window: Longest Subarray With Sum <= S',
        englishParagraphs: [
          'When all array values are `>= 0`, expanding `r` only increases sum while shrinking `l` decreases sum. Thus `while (sum > S) sum -= a[l++];` restores validity cleanly.',
          'Each pointer visits every index at most once, keeping total operations strictly `<= 2n`.',
        ],
        banglaParagraphs: [
          'সব সংখ্যা পজিটিভ বা অ-ঋণাত্মক হলে ভ্যারিয়েবল সাইজের স্লাইডিং উইন্ডো দিয়ে `sum <= S` শর্তে দীর্ঘতম সাবঅ্যারে `O(n)` সময়ে বের করা যায়।',
          'মনে রাখবে `while (sum > S)` ভেতরে থাকলেও `l` কখনো পেছনে ফেরে না, তাই মোট সময় `O(n)`!',
        ],
        memoryDiagram: `a=[3,1,2,7,4], S=6 -> [3,1,2]=6 (len=3) -> +7=13 -> shrink to [7]>6 -> [] -> [4] => best=3`,
        code: `#include <stdio.h>

static long long arr[200005];

int main(void) {
    int n = 0; long long S = 0;
    if (scanf("%d %lld", &n, &S) == 2 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
        long long sum = 0;
        int l = 0, best = 0;
        for (int r = 0; r < n; r++) {
            sum += arr[r];
            while (l <= r && sum > S) {
                sum -= arr[l++];
            }
            if (r - l + 1 > best) best = r - l + 1;
        }
        printf("%d\\n", best);
    }
    return 0;
}`,
        stdin: '5 6\n3 1 2 7 4',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'while (l <= r && sum > S) sum -= arr[l++];', whatItMeans: 'Shrinks left edge until window sum satisfies <= S.', whyItIsThere: 'Monotonically restores invariant without resetting r.', ifDeletedError: 'Window violates sum <= S limit.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Includes printf definition.', whyItIsThere: 'Enables formatted console output.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 4', codeSnippet: 'int a[6] = {2, 1, 5, 1, 3, 2};', whatItMeans: 'Sample array containing 6 elements.', whyItIsThere: 'Demonstrates fixed-width sliding window trace.', ifDeletedError: 'Compile error: a undeclared.' },
      { lineNumber: 'Line 7', codeSnippet: 'for (int i = 0; i < k; i++) win += a[i];', whatItMeans: 'Computes initial sum of first k=3 elements.', whyItIsThere: 'Avoids branching inside the sliding loop.', ifDeletedError: 'Initial window missing; win starts at 0.' },
      { lineNumber: 'Line 8', codeSnippet: 'long long best = win;', whatItMeans: 'Initializes best using the very first valid window.', whyItIsThere: 'Never assume 0 if array can contain negative numbers!', ifDeletedError: 'Compile error: best undeclared.' },
      { lineNumber: 'Line 10', codeSnippet: 'win += a[i] - a[i - k];', whatItMeans: 'Slides window right by 1 slot in O(1) time.', whyItIsThere: 'Adds new right edge a[i] and drops old left edge a[i-k].', ifDeletedError: 'Best stays stuck on first window (8 instead of 9).' },
      { lineNumber: 'Line 13', codeSnippet: 'printf("max_window=%lld\\n", best);', whatItMeans: 'Outputs maximum window sum.', whyItIsThere: 'Emits exact verified result.', ifDeletedError: 'No stdout produced.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Init window [0..2]', memoryOrStack: 'win=2+1+5=8, best=8', note: 'First 3 elements summed' },
      { step: 2, state: 'Slide i=3 (+1, -2)', memoryOrStack: 'win=8+1-2=7, best=8', note: 'Window [1,5,1]' },
      { step: 3, state: 'Slide i=4 (+3, -1)', memoryOrStack: 'win=7+3-1=9, best=9', note: 'New max found!' },
      { step: 4, state: 'Slide i=5 (+2, -5)', memoryOrStack: 'win=9+2-5=6, best=9', note: 'Prints max_window=9' },
    ],
    harryBugTraps: [
      {
        title: 'Initializing max_window = 0 on Arrays With Negatives',
        brokenCode: `long long best = 0; // fails if all window sums are negative!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int a[4] = {-5, -2, -3, -4}, k = 2;\n    long long win = a[0] + a[1], best = win;\n    for (int i = k; i < 4; i++) { win += a[i] - a[i - k]; if (win > best) best = win; }\n    printf("%lld\\n", best);\n    return 0;\n}`,
        whyItBreaks: 'When every subarray sum is negative (e.g. -5), initializing best = 0 falsely prints 0 instead of -5.',
      },
      {
        title: 'Applying Variable Sliding Window on Negative Numbers',
        brokenCode: `// Negative numbers break monotonic shrinking when sum > S`,
        fixedCode: `#include <stdio.h>\n// Only use while(sum > S) shrink when all a[i] >= 0; for negatives use prefix sums\nint main(void) {\n    int a[4] = {2, 1, 3, 1}, S = 4, l = 0, sum = 0, best = 0;\n    for (int r = 0; r < 4; r++) { sum += a[r]; while (sum > S) sum -= a[l++]; if (r - l + 1 > best) best = r - l + 1; }\n    printf("%d\\n", best);\n    return 0;\n}`,
        whyItBreaks: 'With negative elements, shrinking `l` can actually INCREASE the window sum and miss optimal valid subarrays.',
      },
      {
        title: 'Using l <= r Instead of l < r in Two-Sum Pair Check',
        brokenCode: `while (l <= r) { if (a[l] + a[r] == target) ... } // pairs element with itself!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int a[3] = {2, 5, 9}, target = 10, l = 0, r = 2, ok = 0;\n    while (l < r) { int s = a[l] + a[r]; if (s == target) { ok = 1; break; } if (s < target) l++; else r--; }\n    printf("%d\\n", ok);\n    return 0;\n}`,
        whyItBreaks: 'When l == r at index 1 (value 5), a[1] + a[1] == 10 falsely reports a valid pair using one element twice.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-12-q1',
        difficulty: 'Easy',
        title: '1. Minimum Sum Window of Size K',
        prompt: 'Read n, k, then n integers; print minimum sum of any contiguous subarray of length k.',
        banglaHint: 'প্রথম `k`টি যোগ করে `win += a[i] - a[i - k]` দিয়ে সর্বনিম্ন মান বের করো।',
        starterCode: `#include <stdio.h>\nstatic long long a[200005];\nint main(void) {\n    int n = 0, k = 0;\n    if (scanf("%d %d", &n, &k) != 2 || k <= 0 || k > n) return 0;\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    long long w = 0;\n    for (int i = 0; i < k; i++) w += a[i];\n    long long mn = w;\n    for (int i = k; i < n; i++) { w += a[i] - a[i - k]; if (w < mn) mn = w; }\n    printf("%lld\\n", mn);\n    return 0;\n}`,
        sampleStdin: '5 2\n4 -1 2 -5 6',
        expectedOutput: '-3',
      },
      {
        id: 'c-ch-12-q2',
        difficulty: 'Easy',
        title: '2. Merge Two Sorted Arrays in O(n + m)',
        prompt: 'Read n, m, sorted A[n], sorted B[m]; output merged sorted sequence.',
        banglaHint: '`i < n && j < m` থাকা পর্যন্ত ছোট মান প্রিন্ট করে তারপর বাকি থাকা অংশ প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nstatic long long a[100005], b[100005];\nint main(void) {\n    int n = 0, m = 0;\n    if (scanf("%d %d", &n, &m) != 2) return 0;\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    for (int j = 0; j < m; j++) scanf("%lld", &b[j]);\n    int i = 0, j = 0, first = 1;\n    while (i < n || j < m) {\n        long long v = (j == m || (i < n && a[i] <= b[j])) ? a[i++] : b[j++];\n        printf("%s%lld", first ? "" : " ", v); first = 0;\n    }\n    printf("\\n");\n    return 0;\n}`,
        sampleStdin: '3 2\n1 4 7\n2 5',
        expectedOutput: '1 2 4 5 7',
      },
      {
        id: 'c-ch-12-q3',
        difficulty: 'Medium',
        title: '3. Move All Zeros to End Preserving Order',
        prompt: 'Read n then n integers; move all 0s to end using slow/fast two pointers.',
        banglaHint: 'শূন্য ছাড়া মানগুলো `w++` ইনডেক্সে সরিয়ে শেষে `n - w` সংখ্যক `0` বসাও।',
        starterCode: `#include <stdio.h>\nstatic long long a[100005];\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    int w = 0;\n    for (int r = 0; r < n; r++) if (a[r] != 0) a[w++] = a[r];\n    while (w < n) a[w++] = 0;\n    for (int i = 0; i < n; i++) printf("%lld%s", a[i], i + 1 == n ? "\\n" : " ");\n    return 0;\n}`,
        sampleStdin: '5\n0 3 0 1 2',
        expectedOutput: '3 1 2 0 0',
      },
      {
        id: 'c-ch-12-q4',
        difficulty: 'Medium',
        title: '4. Count Pairs With Sum <= Target in Sorted Array',
        prompt: 'Read n, target, then sorted A[n]; count pairs (i < j) with a[i] + a[j] <= target.',
        banglaHint: '`a[l] + a[r] <= target` হলে `l` থেকে `r-1` সবার সাথে `r` মিলে যায়, তাই `cnt += (r - l)` ও `l++`!',
        starterCode: `#include <stdio.h>\nstatic long long a[100005];\nint main(void) {\n    int n = 0; long long t = 0;\n    if (scanf("%d %lld", &n, &t) != 2) return 0;\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    int l = 0, r = n - 1; long long cnt = 0;\n    while (l < r) {\n        if (a[l] + a[r] <= t) { cnt += (r - l); l++; }\n        else r--;\n    }\n    printf("%lld\\n", cnt);\n    return 0;\n}`,
        sampleStdin: '4 7\n1 2 4 6',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-12-q5',
        difficulty: 'Hard',
        title: '5. Container With Most Water (Two-Pointer Greedy)',
        prompt: 'Read n heights; print max (j - i) * min(h[i], h[j]) in O(n).',
        banglaHint: 'যে দিকের উচ্চতা ছোট, শুধু সেই পয়েন্টারটি ভেতরের দিকে সরাও!',
        starterCode: `#include <stdio.h>\nstatic long long h[100005];\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);\n    int l = 0, r = n - 1; long long best = 0;\n    while (l < r) {\n        long long mn = h[l] < h[r] ? h[l] : h[r];\n        long long area = mn * (r - l);\n        if (area > best) best = area;\n        if (h[l] < h[r]) l++; else r--;\n    }\n    printf("%lld\\n", best);\n    return 0;\n}`,
        sampleStdin: '9\n1 8 6 2 5 4 8 3 7',
        expectedOutput: '49',
      },
    ],
    miniBuild: {
      title: 'Two-Pointer Sorted Pair & Window Engine',
      description: 'Solves O(n^2) search tasks in O(n) using converging two pointers and sliding window updates.',
      banglaGoal: 'টু-পয়েন্টার ও স্লাইডিং উইন্ডো ব্যবহার করে O(n) সময়ে রেঞ্জ/পেয়ার সমাধান।',
      combinesChapters: 'Ch 1–12',
      starterCode: `#include <stdio.h>

static long long a[200005];

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) == 2 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        int l = 0, r = n - 1, found = 0;
        while (l < r) {
            long long s = a[l] + a[r];
            if (s == target) { found = 1; break; }
            if (s < target) l++;
            else r--;
        }
        printf("%s\\n", found ? "YES" : "NO");
    }
    return 0;
}`,
      sampleStdin: '5 10\n1 3 4 6 8',
      expectedOutput: 'YES',
    },
    starterCode: `#include <stdio.h>

static long long a[200005];

int main(void) {
    int n = 0;
    long long target = 0;
    if (scanf("%d %lld", &n, &target) == 2 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        int l = 0, r = n - 1, found = 0;
        while (l < r) {
            long long s = a[l] + a[r];
            if (s == target) { found = 1; break; }
            if (s < target) l++;
            else r--;
        }
        printf("%s\\n", found ? "YES" : "NO");
    }
    return 0;
}`,
    sampleStdin: '5 10\n1 3 4 6 8',
    expectedSampleOutput: 'YES',
    testCases: [
      { id: 'c12-t1', input: '5 10\n1 3 4 6 8', expectedOutput: 'YES' },
      { id: 'c12-t2', input: '4 100\n1 2 3 4', expectedOutput: 'NO', isHidden: true },
    ],
  },

  13: {
    chapterNumber: 13,
    title: 'C Chapter 13 (C23): Prefix Sums & Difference Arrays (CP Game-Changers)',
    banglaTitle: 'C অধ্যায় ১৩ (C23): প্রিফিক্স সাম ও ডিফারেন্স অ্যারে (CP গেম-চেঞ্জার)',
    subtitle: '1-indexed O(1) range queries pref[R+1] - pref[L], 64-bit overflow prevention, and O(Q+N) difference arrays.',
    zeroIntuition: {
      plainEnglishStory:
        'Suppose a judge gives an array of `200,000` values followed by `200,000` queries asking for the sum between indices `[L, R]`. Looping from `L` to `R` per query costs `O(N * Q) = 4×10^10` steps—guaranteed TLE!\n\nA Prefix Sum array precomputes cumulative totals in one `O(N)` pass using 1-indexed padding `pref[0] = 0`, `pref[i + 1] = pref[i] + a[i]`. Every `[L, R]` query drops to `pref[R + 1] - pref[L]` in `O(1)` time! Its dual, the Difference Array, applies `+val` at `diff[L]` and `-val` at `diff[R + 1]`, turning `Q` range-increment updates into a single `O(N + Q)` sweep.',
      asciiFlowchart: `  Original a[]:    [  3 |  1 |  4 |  2 |  5 ]
  Prefix pref[]: [ 0 | 3 | 4 | 8 | 10 | 15 ]
  Query sum(L=1..R=3): pref[4] - pref[1] = 10 - 3 = 7  (1+4+2 = 7 in O(1)!)`,
      pseudocode: [
        '1. ALLOCATE static 64-bit pref[n + 1] with pref[0] = 0',
        '2. BUILD prefix sums: pref[i + 1] = pref[i] + a[i] in O(n)',
        '3. ANSWER each 0-indexed [L, R] sum in O(1): pref[R + 1] - pref[L]',
        '4. FOR range adds: diff[L] += v; diff[R + 1] -= v; then prefix-sum diff[]',
      ],
      banglaZeroToHero: {
        analogyTitle: 'হাইওয়ের মাইলফলক ও ব্যাঙ্কের দৈনিক ব্যালেন্স (Prefix & Difference Array)',
        explanation:
          'কল্পনা করো ঢাকার জিরো পয়েন্ট থেকে চট্টগ্রামের হাইওয়েতে প্রতিটি শহরের দূরত্ব লেখা মাইলফলক আছে: কুমিল্লা ৯৭ কিমি, ফেনী ১৫২ কিমি। এখন কুমিল্লা থেকে ফেনী কত দূর জানতে তোমাকে রাস্তা মাপতে হবে না—কেবল `152 - 97 = 55` বিয়োগ করলেই `O(1)` সময়ে উত্তর চলে আসবে! প্রোগ্রামিংয়ে Prefix Sum ঠিক এই কাজই করে। `200,000` সংখ্যার ওপর `200,000`টি রেঞ্জ-সাম কুয়েরি সাধারণ লুপে করলে `O(N*Q)` সময়ে নিশ্চিত TLE খাবে। অথচ একবার `pref[0] = 0` ধরে `pref[i + 1] = pref[i] + a[i]` বানিয়ে নিলে যেকোনো `[L, R]` রেঞ্জের যোগফল মাত্র এক বিয়োগ `pref[R + 1] - pref[L]` দিয়েই বের হয়ে আসে! মনে রাখবে: কখনোই `int pref[]` নেবে না, কারণ `2×10^5` টি `10^9` সংখ্যা যোগ করলে `2×10^14` হয় যা `int` উপচে (Overflow) ফেলে—তাই `long long` বাধ্যতামূলক। আরেকটি শক্তিশালী কৌশল হলো Difference Array: যদি কোনো প্রোগ্রামে `[L, R]` রেঞ্জের সব ঘরে `+val` যোগ করতে বলে, তবে লুপ না চালিয়ে শুধু `diff[L] += val` আর `diff[R + 1] -= val` লিখে শেষে একবার Prefix Sum চালালেই `O(N + Q)` সময়ে পুরো রেঞ্জ আপডেট হয়ে যায়! তবে খেয়াল রাখবে `diff[]` অ্যারে কমপক্ষে `n + 2` সাইজের নিতে হবে যাতে `diff[R + 1]` মেমোরির বাইরে না যায়।',
        everydayExample:
          'গাড়ির ওডোমিটার রিডিং শুরুতে ১২০০ কিমি ও গন্তব্যে ১২৮৫ কিমি থাকলে শুধু বিয়োগ (`1285 - 1200 = 85` কিমি) করেই ভ্রমণের দূরত্ব পাওয়া যায়!',
        keyTakeaways: [
          '`pref[0] = 0` রেখে ১-ইনডেক্সড করলে `L == 0` নিয়ে আলাদা `if` লিখতে হয় না।',
          'যোগফল `10^14` ছাড়াতে পারে তাই `pref[]` ও `diff[]` সবসময় `long long` রাখবে।',
          'ডিফারেন্স অ্যারেতে `diff[R + 1]` অ্যাক্সেস করতে অ্যারের সাইজ কমপক্ষে `n + 2` নাও।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-13-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Building a 1-Indexed 64-Bit Prefix Sum Array',
        englishParagraphs: [
          'Padding index `0` with `pref[0] = 0` shifts prefix sums one slot ahead so the sum over 0-based `[l, r]` is ALWAYS `pref[r + 1] - pref[l]`.',
          'Even when `l == 0`, subtracting `pref[0]` (`0`) needs zero conditional branches!',
        ],
        banglaParagraphs: [
          'এই উদাহরণে `pref[0] = 0` রেখে ১ থেকে `n` পর্যন্ত ক্রমযোজিত যোগফল বানানো হয়েছে এবং `pref[4] - pref[1]` দিয়ে `[1..3]` রেঞ্জের যোগফল O(1)-এ বের করা হয়েছে।',
          '`long long` ব্যবহার করায় বড় সংখ্যায় ওভারফ্লো হবে না।',
        ],
        memoryDiagram: `a=[3,1,4,2,5] -> pref=[0,3,4,8,10,15] -> [1..3] = 10 - 3 = 7`,
        code: `#include <stdio.h>

int main(void) {
    long long a[5] = {3, 1, 4, 2, 5};
    long long pref[6] = {0};
    for (int i = 0; i < 5; i++) {
        pref[i + 1] = pref[i] + a[i];
    }
    printf("sum[1..3]=%lld\\n", pref[4] - pref[1]);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'sum[1..3]=7',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'long long pref[6] = {0};', whatItMeans: 'Creates n+1 prefix array with pref[0] initialized to 0.', whyItIsThere: '64-bit prevents overflow and padding removes l==0 edge case.', ifDeletedError: 'Compile error: pref undeclared.' },
          { lineNumber: 'Line 7', codeSnippet: 'pref[i + 1] = pref[i] + a[i];', whatItMeans: 'Recurrence computing cumulative prefix sums in O(n).', whyItIsThere: 'Precomputes every prefix boundary cleanly.', ifDeletedError: 'All prefix slots remain 0.' },
          { lineNumber: 'Line 9', codeSnippet: 'pref[4] - pref[1]', whatItMeans: 'Queries sum of elements a[1] + a[2] + a[3] in O(1).', whyItIsThere: 'Cancels prefix before index 1 cleanly.', ifDeletedError: 'Result not emitted.' },
        ],
      },
      {
        id: 'c-ch-13-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Answering Q Range-Sum Queries in O(N + Q)',
        englishParagraphs: [
          'Online judges pass `n`, `q`, the `n` values, and `q` queries `[l, r]` (1-based or 0-based).',
          'After an O(n) prefix build, each query answers via one subtraction in O(1)—scoring AC easily under 50ms even for `200,000` queries!',
        ],
        banglaParagraphs: [
          'কনটেস্টে `q` সংখ্যক রেঞ্জ-সাম কুয়েরি [l, r] ইনপুট নিয়ে প্রতিটি প্রশ্নের উত্তর O(1) সময়ে প্রিন্ট করা হয়েছে।',
          '`200,000` কুয়েরি থাকলেও এটি লুপের বদলে মাত্র এক বিয়োগেই কাজ শেষ করে!',
        ],
        memoryDiagram: `pref=[0,2,7,8,12] | Q(1,3)->12-2=10 | Q(0,2)->8-0=8`,
        code: `#include <stdio.h>

static long long pref[200005];

int main(void) {
    int n = 0, q = 0;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    pref[0] = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        pref[i + 1] = pref[i] + x;
    }
    while (q--) {
        int l = 0, r = 0;
        if (scanf("%d %d", &l, &r) == 2) {
            printf("%lld\\n", pref[r + 1] - pref[l]);
        }
    }
    return 0;
}`,
        stdin: '4 2\n2 5 1 4\n1 3\n0 2',
        expectedOutput: '10\n8',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'printf("%lld\\n", pref[r + 1] - pref[l]);', whatItMeans: 'Answers 0-indexed inclusive range [l, r] in O(1).', whyItIsThere: 'Eliminates inner loop over [l..r].', ifDeletedError: 'Queries produce no output.' },
        ],
      },
      {
        id: 'c-ch-13-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Difference Array: Batch Range Increments in O(N + Q)',
        englishParagraphs: [
          'Suppose `q` promotions add `delta` bonus points to employees `[l..r]`. Adding `diff[l] += delta` and `diff[r + 1] -= delta`, then running one prefix sum reconstructs all final balances cleanly in O(n + q)!',
          'Size `diff[]` at `n + 2` so `r + 1` never writes past buffer end.',
        ],
        banglaParagraphs: [
          'কোনো গেম বা সেলারি সিস্টেমে `[l..r]` রেঞ্জের সবাইকে `delta` বোনাস দিতে হলে বারবার লুপ না চালিয়ে `diff[l] += delta; diff[r + 1] -= delta;` লিখে শেষে একবার প্রিফিক্স সাম করলেই পুরো অ্যারে আপডেট হয়ে যায়!',
          'এতে `2×10^5` রেঞ্জ আপডেটও মিলিসেকেন্ডে সম্পন্ন হয়।',
        ],
        memoryDiagram: `add(1,3,+5) -> diff=[0,+5,0,0,-5,0] -> prefix -> [0,5,5,5,0]`,
        code: `#include <stdio.h>

static long long diff[200005];

int main(void) {
    int n = 0, q = 0;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    while (q--) {
        int l = 0, r = 0; long long v = 0;
        if (scanf("%d %d %lld", &l, &r, &v) == 3) {
            diff[l] += v;
            diff[r + 1] -= v;
        }
    }
    long long run = 0;
    for (int i = 0; i < n; i++) {
        run += diff[i];
        printf("%lld%s", run, i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '5 2\n1 3 5\n0 2 2',
        expectedOutput: '2 7 7 5 0',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'diff[l] += v; diff[r + 1] -= v;', whatItMeans: 'Marks range start +v and post-end cancellation -v in O(1).', whyItIsThere: 'Turns O(n) range update into O(1) marker pair.', ifDeletedError: 'All final elements stay 0.' },
        ],
      },
      {
        id: 'c-ch-13-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Equilibrium Pivot Index Using Total Sum & Prefix Sum',
        englishParagraphs: [
          'To find an index `i` where `left_sum == right_sum`, note `right_sum = total - left_sum - a[i]`. No nested loops or even extra array storage is needed—just track `left` dynamically!',
          'Watch out for `int` overflow if array entries reach 10^9.',
        ],
        banglaParagraphs: [
          'অ্যারের কোন ইনডেক্সের বামের যোগফল ও ডানের যোগফল সমান তা বের করতে `right = total - left - a[i]` সূত্র ব্যবহার করে O(n) সময়ে সমাধান করা হয়েছে।',
          'কোনো অতিরিক্ত অ্যারে ছাড়াই শুধু `total` ও `left` দিয়েই পিভট পাওয়া যায়!',
        ],
        memoryDiagram: `[1,7,3,6,5,6] total=28 -> at i=3(val=6): left=11, right=28-11-6=11 => pivot=3`,
        code: `#include <stdio.h>

static long long a[200005];

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long total = 0;
    for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); total += a[i]; }
    long long left = 0;
    int pivot = -1;
    for (int i = 0; i < n; i++) {
        if (left == total - left - a[i]) { pivot = i; break; }
        left += a[i];
    }
    printf("%d\\n", pivot);
    return 0;
}`,
        stdin: '6\n1 7 3 6 5 6',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (left == total - left - a[i])', whatItMeans: 'Compares strict left sum with strict right sum in O(1).', whyItIsThere: 'Eliminates inner summation loops cleanly.', ifDeletedError: 'Always prints -1.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides printf declaration.', whyItIsThere: 'Enables standard console output.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 4', codeSnippet: 'long long a[5] = {3, 1, 4, 2, 5};', whatItMeans: 'Source array of 5 64-bit numbers.', whyItIsThere: 'Input data for prefix construction.', ifDeletedError: 'Compile error: a undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long pref[6] = {0};', whatItMeans: 'Zero-padded prefix array of length n + 1.', whyItIsThere: 'pref[0] = 0 eliminates l == 0 special branches.', ifDeletedError: 'Compile error: pref undeclared.' },
      { lineNumber: 'Line 7', codeSnippet: 'pref[i + 1] = pref[i] + a[i];', whatItMeans: 'Stores cumulative sum up to index i inside pref[i + 1].', whyItIsThere: 'Builds O(1) query structure in single O(n) sweep.', ifDeletedError: 'All prefix sums remain 0.' },
      { lineNumber: 'Line 9', codeSnippet: 'printf("sum[1..3]=%lld\\n", pref[4] - pref[1]);', whatItMeans: 'Computes range [1..3] sum via one subtraction.', whyItIsThere: 'Demonstrates O(1) constant-time range query.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Pad pref[0] = 0', memoryOrStack: 'pref[0] = 0', note: 'Sentinel start' },
      { step: 2, state: 'Build i = 0, 1, 2', memoryOrStack: 'pref[1]=3, [2]=4, [3]=8', note: 'Cumulative totals' },
      { step: 3, state: 'Build i = 3, 4', memoryOrStack: 'pref[4]=10, [5]=15', note: 'Prefix build complete' },
      { step: 4, state: 'Query [1..3]', memoryOrStack: 'pref[4] - pref[1] = 10 - 3 = 7', note: 'Matches 1+4+2=7 in O(1)' },
    ],
    harryBugTraps: [
      {
        title: 'Using 32-Bit int for Prefix Sum Array',
        brokenCode: `int pref[200005]; // overflows past 2.14e9 when N*max(a) ~ 10^14!`,
        fixedCode: `#include <stdio.h>\nstatic long long pref[200005];\nint main(void) {\n    pref[1] = 1000000000LL * 5;\n    printf("%lld\\n", pref[1]);\n    return 0;\n}`,
        whyItBreaks: 'Sums of 10^5 large integers routinely reach 10^14, silently overflowing 32-bit int into negative values.',
      },
      {
        title: 'Off-By-One Subtraction pref[r] - pref[l] on 0-Indexed Input',
        brokenCode: `sum = pref[r] - pref[l]; // drops a[l] or misses a[r]!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    long long a[3] = {4, 5, 6}, p[4] = {0};\n    for (int i = 0; i < 3; i++) p[i + 1] = p[i] + a[i];\n    printf("%lld\\n", p[2 + 1] - p[0]);\n    return 0;\n}`,
        whyItBreaks: 'With 1-indexed padded p[], inclusive 0-based [l, r] is always p[r + 1] - p[l], never p[r] - p[l].',
      },
      {
        title: 'Out-of-Bounds Write diff[r + 1] When r == n - 1',
        brokenCode: `int diff[5] = {0}; diff[4 + 1] -= 10; // writes diff[5] out of bounds!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int diff[7] = {0}; diff[1] += 10; diff[4 + 1] -= 10;\n    printf("%d\\n", diff[1]);\n    return 0;\n}`,
        whyItBreaks: 'diff[n] is accessed whenever r == n - 1, so allocate at least n + 2 slots safely.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-13-q1',
        difficulty: 'Easy',
        title: '1. Running Sum Array Printer',
        prompt: 'Read n then n integers; print the running cumulative sums separated by spaces.',
        banglaHint: '`run += x` করে প্রতিটি ধাপেই প্রিন্ট করে দাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) == 1) {\n        long long run = 0, x = 0;\n        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) {\n            run += x; printf("%lld%s", run, i + 1 == n ? "\\n" : " ");\n        }\n    }\n    return 0;\n}`,
        sampleStdin: '4\n1 2 3 4',
        expectedOutput: '1 3 6 10',
      },
      {
        id: 'c-ch-13-q2',
        difficulty: 'Easy',
        title: '2. Even-Index Prefix Range Sum',
        prompt: 'Read n, array, then 0-based L R; print sum of elements at EVEN indices in [L, R].',
        banglaHint: 'জোড় ইনডেক্স ছাড়া বাকিগুলো ০ ধরে আরেকটি প্রিফিক্স সাম বানাও।',
        starterCode: `#include <stdio.h>\nstatic long long p[100005];\nint main(void) {\n    int n = 0, l = 0, r = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) { long long x = 0; scanf("%lld", &x); p[i + 1] = p[i] + ((i % 2 == 0) ? x : 0); }\n        if (scanf("%d %d", &l, &r) == 2) printf("%lld\\n", p[r + 1] - p[l]);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n10 20 30 40 50\n1 4',
        expectedOutput: '80',
      },
      {
        id: 'c-ch-13-q3',
        difficulty: 'Medium',
        title: '3. Equilibrium Index Counter',
        prompt: 'Read n then n integers; count indices where left sum strictly equals right sum.',
        banglaHint: 'সবাইকে যোগ করে `total` রাখো; তারপর `left == total - left - a[i]` চেক করো।',
        starterCode: `#include <stdio.h>\nstatic long long a[100005];\nint main(void) {\n    int n = 0; long long tot = 0, left = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) { scanf("%lld", &a[i]); tot += a[i]; }\n        int cnt = 0;\n        for (int i = 0; i < n; i++) { if (left == tot - left - a[i]) cnt++; left += a[i]; }\n        printf("%d\\n", cnt);\n    }\n    return 0;\n}`,
        sampleStdin: '3\n1 -1 0',
        expectedOutput: '1',
      },
      {
        id: 'c-ch-13-q4',
        difficulty: 'Medium',
        title: '4. 1D Difference Array Maximum Peak',
        prompt: 'Start with n zeros, apply q range adds (0-based l r v), and print maximum final element.',
        banglaHint: '`diff[l] += v; diff[r+1] -= v;` করার পর প্রিফিক্স সাম চালিয়ে সর্বোচ্চ মান বের করো।',
        starterCode: `#include <stdio.h>\nstatic long long d[100005];\nint main(void) {\n    int n = 0, q = 0;\n    if (scanf("%d %d", &n, &q) != 2) return 0;\n    while (q--) { int l = 0, r = 0; long long v = 0; scanf("%d %d %lld", &l, &r, &v); d[l] += v; d[r + 1] -= v; }\n    long long cur = 0, best = 0;\n    for (int i = 0; i < n; i++) { cur += d[i]; if (i == 0 || cur > best) best = cur; }\n    printf("%lld\\n", best);\n    return 0;\n}`,
        sampleStdin: '5 2\n0 2 10\n1 4 5',
        expectedOutput: '15',
      },
      {
        id: 'c-ch-13-q5',
        difficulty: 'Hard',
        title: '5. Count Subarrays With Sum Zero (Positive/Zero/Neg via Prefix Sort/Pairs)',
        prompt: 'Read n <= 1000 then integers; compute prefix sums and count subarrays summing to 0.',
        banglaHint: 'যদি `pref[j] == pref[i]` (যেখানে `i < j`) হয়, তবে `[i..j-1]` সাবঅ্যারের যোগফল ০!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    long long p[1005] = {0}, x = 0;\n    for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) p[i + 1] = p[i] + x;\n    long long cnt = 0;\n    for (int i = 0; i <= n; i++)\n        for (int j = i + 1; j <= n; j++) if (p[i] == p[j]) cnt++;\n    printf("%lld\\n", cnt);\n    return 0;\n}`,
        sampleStdin: '5\n1 -1 2 -2 0',
        expectedOutput: '6',
      },
    ],
    miniBuild: {
      title: 'O(1) Range-Query Prefix Engine',
      description: 'Answers batch [L, R] sum queries in constant O(1) time via 64-bit padded prefix sums.',
      banglaGoal: '৬৪-বিট প্রিফিক্স সাম দিয়ে O(1) সময়ে রেঞ্জ কুয়েরি প্রসেস করা।',
      combinesChapters: 'Ch 1–13',
      starterCode: `#include <stdio.h>

static long long pref[200005];

int main(void) {
    int n = 0, q = 0;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    pref[0] = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        pref[i + 1] = pref[i] + x;
    }
    while (q--) {
        int l = 0, r = 0;
        if (scanf("%d %d", &l, &r) == 2) {
            printf("%lld\\n", pref[r + 1] - pref[l]);
        }
    }
    return 0;
}`,
      sampleStdin: '4 2\n2 5 1 4\n1 3\n0 2',
      expectedOutput: '10\n8',
    },
    starterCode: `#include <stdio.h>

static long long pref[200005];

int main(void) {
    int n = 0, q = 0;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    pref[0] = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        pref[i + 1] = pref[i] + x;
    }
    while (q--) {
        int l = 0, r = 0;
        if (scanf("%d %d", &l, &r) == 2) {
            printf("%lld\\n", pref[r + 1] - pref[l]);
        }
    }
    return 0;
}`,
    sampleStdin: '4 2\n2 5 1 4\n1 3\n0 2',
    expectedSampleOutput: '10\n8',
    testCases: [
      { id: 'c13-t1', input: '4 2\n2 5 1 4\n1 3\n0 2', expectedOutput: '10\n8' },
      { id: 'c13-t2', input: '3 1\n10 20 30\n0 2', expectedOutput: '60', isHidden: true },
    ],
  },

  14: {
    chapterNumber: 14,
    title: 'C Chapter 14 (C23): Strings, Character Arrays & String Manipulation',
    banglaTitle: 'C অধ্যায় ১৪ (C23): স্ট্রিং, ক্যারেক্টার অ্যারে ও স্ট্রিং ম্যানিপুলেশন',
    subtitle: 'Null-terminated char[] arrays (\\0 sentinel), ASCII math (c - \'a\'), buffer overflow guards (%Ns / fgets), and O(n) palindrome/anagram logic.',
    zeroIntuition: {
      plainEnglishStory:
        'C has no built-in high-level `String` object—a C string is simply a contiguous `char[]` array terminated by a special 0-byte sentinel (`\'\\0\'`). Functions like `printf("%s", s)` and `strlen(s)` keep reading byte by byte until hitting `\'\\0\'`.\n\nForgetting space for that extra `\'\\0\'` byte or writing `scanf("%s", s)` without a width specifier (`%31s`) opens classic buffer-overflow security holes. Meanwhile, mapping lowercase characters via `c - \'a\'` into `[0..25]` solves palindrome, vowel, and anagram checks cleanly in `O(n)` time.',
      asciiFlowchart: `  char s[6] = "hello";
  Bytes: [ 'h' | 'e' | 'l' | 'l' | 'o' | '\\0' ]   <-- Needs 5 + 1 = 6 bytes!
  Index:   [0]   [1]   [2]   [3]   [4]   [5]
  ASCII:   104   101   108   108   111     0  (Null sentinel stops printf/strlen)`,
      pseudocode: [
        '1. ALLOCATE char buffer of size maxLen + 1 for trailing \\0 byte',
        '2. READ bounded word via scanf("%255s", s) or full line via fgets()',
        '3. CACHE length n = strlen(s) BEFORE loop to avoid O(n^2) re-scanning',
        '4. USE ASCII offset (c - \'a\') and two pointers for O(n) character algorithms',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেলগাড়ির শেষ লাল পতাকা (\\0 Null Sentinel) ও বাফার সেফটি',
        explanation:
          'C ভাষায় Python বা Java-র মতো আলাদা কোনো `String` ডেটা টাইপ নেই; বরং C-তে স্ট্রিং হলো সারি বাঁধা `char` অ্যারে যার একেবারে শেষে একটি অদৃশ্য `\'\\0\'` (Null Byte = 0) থাকে! `printf("%s")` বা `strlen()` যখন কাজ করে, তখন তারা `0` নম্বর ঘর থেকে পড়া শুরু করে এবং `\'\\0\'` দেখা মাত্রই থেমে যায়—যেমন ট্রেনের শেষ বগিতে লাল বাতি দেখে স্টেশন মাস্টার বোঝে ট্রেন শেষ হয়েছে! তাই "Argon" রাখতে ৫ নয়, `\\0`-সহ অন্তত ৬ বাইটের `char s[6]` নিতে হয়। `\'\\0\'` ভুলে গেলে `printf` মেমোরির পাশের আবর্জনা পড়তে থাকবে বা প্রোগ্রাম ক্র্যাশ করবে! বড়দের মতো নিরাপদ C কোড লিখতে হলে কখনোই `scanf("%s", s)` খালি লিখবে না; বাফার সাইজ ৩২ হলে অবশ্যই `scanf("%31s", s)` লিখতে হবে, নইলে বড় ইনপুটে Buffer Overflow হবে। আর অক্ষর নিয়ে কাজ করতে ASCII কোড দারুণ সহায়ক: যেকোনো ছোট হাতের অক্ষর থেকে `\'a\'` বিয়োগ করলে (`c - \'a\'`) `0` থেকে `25` পর্যন্ত সংখ্যা পাওয়া যায়—যা দিয়ে অ্যানাগ্রাম (Anagram) বা ফ্রিকোয়েন্সি কাউন্ট মুহূর্তেই `O(n)` সময়ে করা যায়! আরেকটি সতর্কতা: স্ট্রিং তুলনা করতে `s1 == s2` লিখলে অক্ষর নয় বরং মেমোরির ঠিকানা তুলনা হয়! দুটি স্ট্রিং সমান কি না দেখতে অবশ্যই `<string.h>`-এর `strcmp(s1, s2) == 0` ব্যবহার করবে।',
        everydayExample:
          'মালবাহী ট্রেনের একদম পেছনের বগিতে লাল ফ্ল্যাগ (`\\0`) না থাকলে সিগন্যালম্যান বুঝতেই পারবে না ট্রেনটি কোথায় শেষ হয়েছে!',
        keyTakeaways: [
          'সবসময় `len + 1` সাইজের `char` অ্যারে নেবে যাতে শেষের `\'\\0\'` নাল বাইটের জায়গা থাকে।',
          'দুটি C স্ট্রিং তুলনায় `s1 == s2` ভুল—সর্বদা `strcmp(s1, s2) == 0` ব্যবহার করবে।',
          'বড় ইনপুটে বাফার ওভারফ্লো ঠেকাতে `scanf("%255s", s)` বা `fgets()` ব্যবহার করো।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-14-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Null-Terminated String Length & In-Place Uppercase',
        englishParagraphs: [
          'In ASCII, lowercase `\'a\'` (97) and uppercase `\'A\'` (65) sit exactly 32 apart (`c - \'a\' + \'A\'`), or use `<ctype.h>` `toupper((unsigned char)c)`.',
          'Notice how walking `s[i] != \'\\0\'` runs in strict O(n) without calling `strlen` repeatedly.',
        ],
        banglaParagraphs: [
          'এখানে একটি স্ট্রিংয়ের শেষ `\'\\0\'` পর্যন্ত ঘুরে দৈর্ঘ্য মাপা হয়েছে এবং সব ছোট হাতের অক্ষরকে বড় হাতে রূপান্তর করা হয়েছে।',
          '`toupper((unsigned char)c)` ব্যবহার করলে কোনো অ-ইংরেজি চিহ্নে Undefined Behavior হয় না।',
        ],
        memoryDiagram: `"argon\\0" -> 'a'->'A', 'r'->'R', ... -> "ARGON\\0" (len=5)`,
        code: `#include <ctype.h>
#include <stdio.h>

int main(void) {
    char s[] = "argon";
    int len = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        s[i] = (char)toupper((unsigned char)s[i]);
        len++;
    }
    printf("%s %d\\n", s, len);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'ARGON 5',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'char s[] = "argon";', whatItMeans: 'Allocates 6 writable bytes including automatic trailing \\0.', whyItIsThere: 'char[] array is mutable on stack, unlike string literal pointers.', ifDeletedError: 'Compile error: s undeclared.' },
          { lineNumber: 'Line 7', codeSnippet: "for (int i = 0; s[i] != '\\0'; i++) {", whatItMeans: 'Walks characters cleanly until hitting null sentinel.', whyItIsThere: 'Single O(n) pass without redundant strlen calls.', ifDeletedError: 'Loop never transforms or counts string.' },
          { lineNumber: 'Line 8', codeSnippet: 's[i] = (char)toupper((unsigned char)s[i]);', whatItMeans: 'Converts ASCII lowercase safely in place.', whyItIsThere: 'Casting to unsigned char prevents UB on negative char platforms.', ifDeletedError: 'String stays lowercase "argon".' },
        ],
      },
      {
        id: 'c-ch-14-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Two-Pointer Palindrome & Vowel Analyzer',
        englishParagraphs: [
          'Caching `size_t len = strlen(s)` before looping lets us verify palindrome symmetry from both ends in O(n) time and count vowels simultaneously.',
          'Bounded format `%255s` guarantees `char s[256]` never overflows.',
        ],
        banglaParagraphs: [
          'ইনপুট স্ট্রিংটি উল্টো করলেও একই থাকে কি না (Palindrome) তা দুই প্রান্ত `s[i] == s[len - 1 - i]` মিলিয়ে যাচাই করা হয়েছে এবং সাথে স্বরবর্ণ গোনা হয়েছে।',
          '`%255s` দিয়ে ইনপুট নেওয়ায় ২৫৬ বাইটের অ্যারে কখনো উপচে পড়বে না।',
        ],
        memoryDiagram: `"racecar" -> r==r, a==a, c==c, e -> YES, vowels=3`,
        code: `#include <ctype.h>
#include <stdio.h>
#include <string.h>

int is_vowel(char ch) {
    char c = (char)tolower((unsigned char)ch);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    char s[256];
    if (scanf("%255s", s) == 1) {
        size_t len = strlen(s);
        int ok = 1, vowels = 0;
        for (size_t i = 0; i < len; i++) {
            if (is_vowel(s[i])) vowels++;
            if (s[i] != s[len - 1 - i]) ok = 0;
        }
        printf("%s %d\\n", ok ? "YES" : "NO", vowels);
    }
    return 0;
}`,
        stdin: 'racecar',
        expectedOutput: 'YES 3',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'size_t len = strlen(s);', whatItMeans: 'Computes length once before entering loop.', whyItIsThere: 'Avoids O(n^2) repeated scanning of string length.', ifDeletedError: 'len undeclared for mirror index.' },
        ],
      },
      {
        id: 'c-ch-14-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'ASCII Frequency Anagram Checker (26-Slot Bucket)',
        englishParagraphs: [
          'Two lowercase words are anagrams iff every letter `\'a\'..\'z\'` occurs the exact same number of times. Incrementing `freq[a[i] - \'a\']++` and decrementing `freq[b[i] - \'a\']--` checks this in O(n) time without sorting!',
          'Guard first by verifying `strlen(a) == strlen(b)` in O(n).',
        ],
        banglaParagraphs: [
          'দুটি শব্দের অক্ষরগুলো সাজিয়ে একই শব্দ বানানো যায় কি না (Anagram) তা মাত্র ২৬ ঘরের ফ্রিকোয়েন্সি অ্যারে দিয়ে `O(n)` সময়ে বের করা যায়।',
          'প্রথম শব্দের অক্ষরে `+1` ও দ্বিতীয় শব্দের অক্ষরে `-1` করলে সব ঘর `0` হলেই তারা Anagram!',
        ],
        memoryDiagram: `"listen" (+1) & "silent" (-1) -> all 26 freq[] == 0 -> ANAGRAM`,
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[256], b[256];
    if (scanf("%255s %255s", a, b) == 2) {
        size_t la = strlen(a), lb = strlen(b);
        int ok = (la == lb);
        int f[26] = {0};
        for (size_t i = 0; ok && i < la; i++) {
            f[a[i] - 'a']++;
            f[b[i] - 'a']--;
        }
        for (int c = 0; ok && c < 26; c++) if (f[c] != 0) ok = 0;
        printf("%s\\n", ok ? "YES" : "NO");
    }
    return 0;
}`,
        stdin: 'listen silent',
        expectedOutput: 'YES',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: "f[a[i] - 'a']++; f[b[i] - 'a']--;", whatItMeans: 'Cancels identical character counts across both strings.', whyItIsThere: 'Solves anagram detection in O(n) time and O(1) space.', ifDeletedError: 'All equal-length strings falsely print YES.' },
        ],
      },
      {
        id: 'c-ch-14-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'String Equality Trap (== vs strcmp) & Safe Concatenation',
        englishParagraphs: [
          'Writing `if (cmd == "PING")` in C compares two memory pointers—ALWAYS false even when `cmd` holds `"PING"`! Always compare C strings with `strcmp(cmd, "PING") == 0`.',
          'Also avoid calling `strcat` inside loops (`O(n^2)`): track the write cursor `pos` manually for O(n) string building.',
        ],
        banglaParagraphs: [
          'C-তে `if (cmd == "PING")` লেখা একটি মারাত্মক ভুল, কারণ `==` দুটো স্ট্রিংয়ের ভেতরের লেখা না মিলিয়ে কেবল মেমোরির ঠিকানা মিলায়!',
          'সবসময় `strcmp(cmd, "PING") == 0` লিখবে এবং নাল-বাইটের নিরাপত্তা নিশ্চিত করবে।',
        ],
        memoryDiagram: `cmd == "PING" (compares 0x7ff0 == 0x4020 -> FALSE!) | strcmp(cmd,"PING")==0 -> TRUE!`,
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char cmd[32];
    if (scanf("%31s", cmd) == 1) {
        if (strcmp(cmd, "PING") == 0) printf("PONG\\n");
        else printf("ECHO:%s\\n", cmd);
    }
    return 0;
}`,
        stdin: 'PING',
        expectedOutput: 'PONG',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'if (strcmp(cmd, "PING") == 0)', whatItMeans: 'Compares character contents byte-by-byte until \\0.', whyItIsThere: 'Returns 0 specifically when both strings match identically.', ifDeletedError: 'Cannot recognize PING command.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <ctype.h>', whatItMeans: 'Imports character classification/case helpers like toupper.', whyItIsThere: 'Provides portable ASCII case conversion.', ifDeletedError: 'Compile error: implicit declaration of toupper.' },
      { lineNumber: 'Line 2', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides printf declaration.', whyItIsThere: 'Outputs converted string and length.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 5', codeSnippet: 'char s[] = "argon";', whatItMeans: 'Declares mutable 6-byte stack char array ending with \\0.', whyItIsThere: 'Allows in-place character modification safely.', ifDeletedError: 'Compile error: s undeclared.' },
      { lineNumber: 'Line 7', codeSnippet: "for (int i = 0; s[i] != '\\0'; i++) {", whatItMeans: 'Loops until null sentinel byte 0 is reached.', whyItIsThere: 'Processes exact string length in O(n) time.', ifDeletedError: 'String stays lowercase.' },
      { lineNumber: 'Line 8', codeSnippet: 's[i] = (char)toupper((unsigned char)s[i]);', whatItMeans: 'Converts character s[i] to uppercase safely.', whyItIsThere: 'unsigned char cast prevents negative char UB.', ifDeletedError: 'Output remains lowercase "argon".' },
      { lineNumber: 'Line 11', codeSnippet: 'printf("%s %d\\n", s, len);', whatItMeans: 'Prints modified C string and counted length.', whyItIsThere: 'Displays final result cleanly.', ifDeletedError: 'Empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Init s[] = "argon\\0"', memoryOrStack: 's[0..5], len=0', note: 'Null sentinel at s[5]' },
      { step: 2, state: 'i=0..2', memoryOrStack: 's[0..2]="ARG", len=3', note: 'Uppercase in place' },
      { step: 3, state: 'i=3..4', memoryOrStack: 's[3..4]="ON", len=5', note: 'Next byte is \\0' },
      { step: 4, state: 's[5] == \\0 exits', memoryOrStack: 'stdout="ARGON 5"', note: 'Clean O(n) pass' },
    ],
    harryBugTraps: [
      {
        title: 'Comparing Two Strings Using == Operator',
        brokenCode: `if (s == "admin") printf("OK"); // compares memory addresses!`,
        fixedCode: `#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char s[] = "admin";\n    if (strcmp(s, "admin") == 0) printf("OK\\n");\n    return 0;\n}`,
        whyItBreaks: 's == "admin" checks whether two pointers occupy the same address in memory, not whether their characters match.',
      },
      {
        title: 'Forgetting +1 Byte for Trailing Null Character \\0',
        brokenCode: `char s[5] = "hello"; // zero room for \\0!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    char s[6] = "hello";\n    printf("%s\\n", s);\n    return 0;\n}`,
        whyItBreaks: 'Without \\0, printf/strlen keeps reading adjacent stack memory until crashing or printing garbage.',
      },
      {
        title: 'Mutating a Read-Only String Literal Pointer (char *s)',
        brokenCode: `char *s = "argon"; s[0] = 'A'; // Segmentation Fault!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    char s[] = "argon";\n    s[0] = 'A';\n    printf("%s\\n", s);\n    return 0;\n}`,
        whyItBreaks: 'String literals live in read-only memory (.rodata); declare char s[] to copy into writable stack memory.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-14-q1',
        difficulty: 'Easy',
        title: '1. Reverse a String In-Place',
        prompt: 'Read word s (no spaces) and print its reversed string.',
        banglaHint: 'বাম `l = 0` ও ডান `r = strlen(s) - 1` পয়েন্টার দিয়ে `s[l]` ও `s[r]` অদলবদল করো।',
        starterCode: `#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char s[256];\n    if (scanf("%255s", s) == 1) {\n        size_t l = 0, r = strlen(s);\n        if (r > 0) { r--; while (l < r) { char t = s[l]; s[l++] = s[r]; s[r--] = t; } }\n        printf("%s\\n", s);\n    }\n    return 0;\n}`,
        sampleStdin: 'coding',
        expectedOutput: 'gnidoc',
      },
      {
        id: 'c-ch-14-q2',
        difficulty: 'Easy',
        title: '2. Palindrome & Vowel Counter',
        prompt: 'Read word s and print "YES <vowels>" or "NO <vowels>".',
        banglaHint: 'দুই প্রান্ত থেকে `s[i] != s[len - 1 - i]` এবং vowel চেক করো।',
        starterCode: `#include <ctype.h>\n#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char s[256];\n    if (scanf("%255s", s) == 1) {\n        size_t len = strlen(s); int ok = 1, v = 0;\n        for (size_t i = 0; i < len; i++) {\n            char c = (char)tolower((unsigned char)s[i]);\n            if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u') v++;\n            if (s[i] != s[len - 1 - i]) ok = 0;\n        }\n        printf("%s %d\\n", ok ? "YES" : "NO", v);\n    }\n    return 0;\n}`,
        sampleStdin: 'madam',
        expectedOutput: 'YES 2',
      },
      {
        id: 'c-ch-14-q3',
        difficulty: 'Medium',
        title: '3. First Non-Repeating Lowercase Character',
        prompt: 'Read lowercase word s; print first character appearing exactly once, or "-".',
        banglaHint: 'প্রথম লুপে `freq[c - \'a\']++`, দ্বিতীয় লুপে আবার স্ট্রিং ধরে `freq == 1` খুঁজো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char s[1005]; int f[26] = {0};\n    if (scanf("%1004s", s) == 1) {\n        for (int i = 0; s[i]; i++) f[s[i] - 'a']++;\n        char ans = '-';\n        for (int i = 0; s[i]; i++) if (f[s[i] - 'a'] == 1) { ans = s[i]; break; }\n        printf("%c\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: 'swiss',
        expectedOutput: 'w',
      },
      {
        id: 'c-ch-14-q4',
        difficulty: 'Medium',
        title: '4. Run-Length Character Compressor',
        prompt: 'Read word s and print compressed form like "aaabbc" -> "a3b2c1".',
        banglaHint: 'একই অক্ষর যতক্ষণ মিলবে কাউন্ট বাড়াও, ভিন্ন অক্ষর এলে অক্ষর ও কাউন্ট প্রিন্ট করে রিসেট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char s[1005];\n    if (scanf("%1004s", s) == 1) {\n        for (int i = 0; s[i]; ) {\n            char ch = s[i]; int cnt = 0;\n            while (s[i] == ch) { cnt++; i++; }\n            printf("%c%d", ch, cnt);\n        }\n        printf("\\n");\n    }\n    return 0;\n}`,
        sampleStdin: 'aaabbc',
        expectedOutput: 'a3b2c1',
      },
      {
        id: 'c-ch-14-q5',
        difficulty: 'Hard',
        title: '5. Pangram Checker (All 26 Letters Present)',
        prompt: 'Read lowercase word s; print "YES" if all 26 English letters appear at least once, else "NO".',
        banglaHint: '২৬ ঘরের `seen[26]` বুলিয়ান অ্যারেতে প্রথমবার দেখলেই `distinct++` বাড়াও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char s[2048]; int seen[26] = {0}, distinct = 0;\n    if (scanf("%2047s", s) == 1) {\n        for (int i = 0; s[i]; i++) {\n            int idx = s[i] - 'a';\n            if (idx >= 0 && idx < 26 && !seen[idx]) { seen[idx] = 1; distinct++; }\n        }\n        printf("%s\\n", distinct == 26 ? "YES" : "NO");\n    }\n    return 0;\n}`,
        sampleStdin: 'thequickbrownfoxjumpsoverthelazydog',
        expectedOutput: 'YES',
      },
    ],
    miniBuild: {
      title: 'Palindrome & Vowel String Analyzer',
      description: 'Checks string symmetry and vowel counts in a single O(n) pass with buffer bounds.',
      banglaGoal: 'বাফার বাউন্ড রক্ষা করে স্ট্রিংয়ের প্যালিনড্রোম ও স্বরবর্ণ বিশ্লেষক বানানো।',
      combinesChapters: 'Ch 1–14',
      starterCode: `#include <ctype.h>
#include <stdio.h>
#include <string.h>

int is_vowel(char ch) {
    char c = (char)tolower((unsigned char)ch);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    char s[256];
    if (scanf("%255s", s) == 1) {
        size_t len = strlen(s);
        int ok = 1, vowels = 0;
        for (size_t i = 0; i < len; i++) {
            if (is_vowel(s[i])) vowels++;
            if (s[i] != s[len - 1 - i]) ok = 0;
        }
        printf("%s %d\\n", ok ? "YES" : "NO", vowels);
    }
    return 0;
}`,
      sampleStdin: 'racecar',
      expectedOutput: 'YES 3',
    },
    starterCode: `#include <ctype.h>
#include <stdio.h>
#include <string.h>

int is_vowel(char ch) {
    char c = (char)tolower((unsigned char)ch);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    char s[256];
    if (scanf("%255s", s) == 1) {
        size_t len = strlen(s);
        int ok = 1, vowels = 0;
        for (size_t i = 0; i < len; i++) {
            if (is_vowel(s[i])) vowels++;
            if (s[i] != s[len - 1 - i]) ok = 0;
        }
        printf("%s %d\\n", ok ? "YES" : "NO", vowels);
    }
    return 0;
}`,
    sampleStdin: 'racecar',
    expectedSampleOutput: 'YES 3',
    testCases: [
      { id: 'c14-t1', input: 'racecar', expectedOutput: 'YES 3' },
      { id: 'c14-t2', input: 'argon', expectedOutput: 'NO 2', isHidden: true },
    ],
  },

  15: {
    chapterNumber: 15,
    title: 'C Chapter 15 (C23): Recursion & Call Stack Visualization (Milestone Merger 3)',
    banglaTitle: 'C অধ্যায় ১৫ (C23): রিকার্সন ও কল স্ট্যাক ভিজ্যুয়ালাইজেশন (মাইলস্টোন মার্জার ৩)',
    subtitle: 'Stack frames, base cases, Fibonacci call trees, memoization cache, and Phase 3 Milestone Merger.',
    zeroIntuition: {
      plainEnglishStory:
        'When a function calls itself, the CPU does NOT magically confuse variables across calls. Each call pushes a brand-new Stack Frame onto the Call Stack holding its own local parameters and return address, then unwinds bottom-up once a Base Case returns.\n\nWithout a reachable base case, stack frames pile up until RAM overflows (Stack Overflow / SIGSEGV). And naive overlapping recursion like `fib(n-1) + fib(n-2)` explodes to `O(2^n)` unless you cache repeated subproblems with a memo array!',
      asciiFlowchart: `  fact(3) -> pushes frame(n=3)
    |--> fact(2) -> pushes frame(n=2)
           |--> fact(1) -> BASE CASE returns 1!
         unwinds: 2 * 1 = 2
  unwinds: 3 * 2 = 6`,
      pseudocode: [
        '1. DEFINE stopping Base Case FIRST (e.g., if (n <= 1) return 1;)',
        '2. SHRINK problem argument toward base case on every recursive call',
        '3. CACHE overlapping results in memo[] array to turn O(2^n) into O(n)',
        '4. WATCH stack depth (< ~10^5 frames) so C stack never overflows',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রাশিয়ান পুতুল খোলা ও কল স্ট্যাকের থালা সাজানো (Recursion & Call Stack)',
        explanation:
          'একটি বড় বাক্সের ভেতর ছোট বাক্স, তার ভেতর আরও ছোট বাক্স—একেবারে ভেতরের চাবিটি না পাওয়া পর্যন্ত তুমি প্রতিটি ধাপ খুলে যাও, তারপর এক এক করে বাক্সগুলো বন্ধ করে ফিরে আসো। প্রোগ্রামিংয়ে কোনো ফাংশন যখন নিজেকেই কল করে, তাকে Recursion বলে! প্রতিটি কলে CPU-র Call Stack মেমোরিতে একটি করে নতুন প্লেট বা Stack Frame জমা হয়, যেখানে ওই কলের নিজস্ব `n` ও ফিরে আসার ঠিকানা লেখা থাকে। সবচেয়ে নিচের Base Case-এ পৌঁছালে আর নতুন কল হয় না; বরং মান রিটার্ন হতে হতে ওপরের প্লেটগুলো একে একে নামতে শুরু করে। যদি Base Case লিখতে ভুলে যাও বা শর্ত কখনো মিথ্যা না হয়, তবে কল স্ট্যাক উপচে গিয়ে Stack Overflow এরর হয়ে প্রোগ্রাম ক্র্যাশ করবে! আরেকটি অসাধারণ ট্রিক হলো Memoization: সাধারণ `fib(n - 1) + fib(n - 2)` একই মান কোটি বার হিসাব করে `O(2^n)` সময়ে আটকে যায়, কিন্তু একটি `memo[100]` অ্যারেতে উত্তর জমিয়ে রাখলেই তা নিমিষে `O(n)` হয়ে যায়! C-তে রিকার্সন দিয়ে ফ্যাক্টোরিয়াল, দ্রুত পাওয়ার (`a^b mod m`), এবং ব্যাকট্র্যাকিংয়ের মতো জটিল সমস্যা খুব পরিষ্কারভাবে লেখা যায়। তবে মনে রাখবে `n > 10^5` গভীর রিকার্সন C স্ট্যাকে ধরবে না; তখন সাধারণ `for`/`while` লুপ ব্যবহার করা নিরাপদ।',
        everydayExample:
          'একসারি ডোমিনো বা সিঁড়ি বেয়ে নিচে নেমে চাবি নিয়ে আবার একই ধাপ বেয়ে ওপরে উঠে আসা—নেমে যাওয়া হলো Recursive Call, আর ফিরে আসা হলো Return Unwinding!',
        keyTakeaways: [
          'প্রতিটি রিকার্সিভ ফাংশনের প্রথম লাইনই হওয়া উচিত সুস্পষ্ট Base Case।',
          'প্রতি ধাপে ইনপুট ছোট হতে হতে Base Case-এ পৌঁছাতেই হবে, নইলে Stack Overflow হবে।',
          'একই সাব-প্রবলেম বারবার এলে `memo[]` অ্যারে ব্যবহার করে সময় `O(2^n)` থেকে `O(n)`-এ নামিয়ে আনো।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-15-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Tracing Stack Frames With Recursive Factorial',
        englishParagraphs: [
          'Every call `fact(k)` allocates a separate stack frame with its own local `k`. When `k <= 1` hits the base case, it returns `1` upward to `fact(2)`, which multiplies `2 * 1`, all the way back to `main()`.',
          'Using `long long` keeps factorials exact up to `20!`.',
        ],
        banglaParagraphs: [
          'এখানে `fact(5)` কীভাবে কল স্ট্যাকে ৫টি আলাদা ফ্রেম তৈরি করে এবং `n <= 1` বেস কেসে পৌঁছে `120` হিসাব করে তা দেখানো হয়েছে।',
          'প্রতিটি কলের `n` নিজস্ব স্ট্যাক ফ্রেমে আলাদাভাবে সুরক্ষিত থাকে।',
        ],
        memoryDiagram: `fact(5) -> fact(4) -> fact(3) -> fact(2) -> fact(1)=1 -> unwinds 120`,
        code: `#include <stdio.h>

long long fact(int n) {
    if (n <= 1) return 1;
    return (long long)n * fact(n - 1);
}

int main(void) {
    printf("5!=%lld\\n", fact(5));
    return 0;
}`,
        stdin: '',
        expectedOutput: '5!=120',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'if (n <= 1) return 1;', whatItMeans: 'Base case halting infinite recursive calls.', whyItIsThere: 'Terminates stack growth when n reaches 1 or 0.', ifDeletedError: 'Infinite recursion triggers Stack Overflow (SIGSEGV).' },
          { lineNumber: 'Line 5', codeSnippet: 'return (long long)n * fact(n - 1);', whatItMeans: 'Waits for subproblem fact(n-1) then multiplies by n.', whyItIsThere: 'Combines current frame value with unwound child result.', ifDeletedError: 'Compile error: missing return statement.' },
        ],
      },
      {
        id: 'c-ch-15-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Recursive Binary Exponentiation (O(log e) Fast Power)',
        englishParagraphs: [
          'Computing `(base^exp) % mod` recursively splits `exp` in half each step: `half = modpow(base, exp / 2, mod)`, squaring `half * half`, and multiplying once more by `base` if `exp` is odd.',
          'For `exp = 10^9`, recursion depth is only ~30 stack frames!',
        ],
        banglaParagraphs: [
          'বড় ঘাত `(a^b) % mod` বের করতে `O(b)` লুপের বদলে রিকার্সিভ বাইনারি এক্সপোনেনসিয়েশন মাত্র `log2(b)` ধাপে উত্তর দেয়!',
          '`b = 10^9` হলেও কল স্ট্যাকে মাত্র ৩০টি ফ্রেম লাগে।',
        ],
        memoryDiagram: `pow(2,10) -> half=pow(2,5) -> half=pow(2,2) -> half=pow(2,1) => 1024`,
        code: `#include <stdio.h>

long long modpow(long long b, long long e, long long m) {
    if (e == 0) return 1 % m;
    long long h = modpow(b % m, e / 2, m);
    long long res = (h * h) % m;
    if (e & 1LL) res = (res * (b % m)) % m;
    return res;
}

int main(void) {
    long long b = 0, e = 0, m = 1000000007LL;
    if (scanf("%lld %lld", &b, &e) == 2) {
        printf("%lld\\n", modpow(b, e, m));
    }
    return 0;
}`,
        stdin: '2 10',
        expectedOutput: '1024',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'long long h = modpow(b % m, e / 2, m);', whatItMeans: 'Solves half-exponent subproblem ONCE and stores in h.', whyItIsThere: 'Calling modpow twice would degrade O(log e) back to O(e)!', ifDeletedError: 'Exponential O(e) calls instead of O(log e).' },
        ],
      },
      {
        id: 'c-ch-15-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Memoized Recursive Fibonacci (Turning O(2^n) Into O(n))',
        englishParagraphs: [
          'Naive `fib(n-1) + fib(n-2)` recomputes identical values exponentially. Storing computed results inside `static long long memo[95]` turns every subproblem into an O(1) cache lookup.',
          'Remember `memo[n] = -1` sentinel distinguishes uncomputed states from `fib(0) = 0`!',
        ],
        banglaParagraphs: [
          'সাধারণ রিকার্সিভ ফিবোনাচি `n = 45` হলেই কয়েক সেকেন্ড হ্যাং হয়ে যায়, কিন্তু `memo[]` অ্যারেতে একবার পাওয়া ফল সেভ রাখলে ১ মিলিসেকেন্ডেরও কম সময়ে উত্তর আসে!',
          'এটিকে Dynamic Programming-এর Top-Down Memoization কৌশল বলে।',
        ],
        memoryDiagram: `fib(6) caches memo[2..6] once -> zero duplicate branches -> 8`,
        code: `#include <stdio.h>

static long long memo[95];
static int ready = 0;

long long fib(int n) {
    if (!ready) { for (int i = 0; i < 95; i++) memo[i] = -1; ready = 1; }
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n >= 0 && n <= 90) printf("%lld\\n", fib(n));
    return 0;
}`,
        stdin: '10',
        expectedOutput: '55',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (memo[n] != -1) return memo[n];', whatItMeans: 'Returns cached value immediately without descending again.', whyItIsThere: 'Eliminates redundant overlapping tree branches.', ifDeletedError: 'Reverts to slow O(2^n) recursion (TLE for n > 40).' },
        ],
      },
      {
        id: 'c-ch-15-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 3: Recursive Palindrome + Digit-Sum Engine',
        englishParagraphs: [
          'Combining Phase 3 concepts (1D arrays, two pointers, prefix tracking, strings, recursion): a recursive two-pointer check tests whether `s[l..r]` is a palindrome while recursively folding digit sum.',
          'Always verify `l >= r` base case BEFORE indexing `s[l]` or `s[r]`.',
        ],
        banglaParagraphs: [
          'ফেইজ ৩ মার্জার: স্ট্রিং ও টু-পয়েন্টার রিকার্সনের সমন্বয়ে `l >= r` বেস কেস ব্যবহার করে প্যালিনড্রোম এবং ডিজিট সাম একসাথে সমাধান করা হয়েছে।',
          'বেস কেস `l >= r` সবার আগে না থাকলে অসীম লুপে ক্র্যাশ ঘটবে!',
        ],
        memoryDiagram: `is_pal("madam",0,4) -> m==m -> is_pal(1,3) -> a==a -> is_pal(2,2)->1`,
        code: `#include <stdio.h>
#include <string.h>

int is_pal(const char *s, int l, int r) {
    if (l >= r) return 1;
    if (s[l] != s[r]) return 0;
    return is_pal(s, l + 1, r - 1);
}

long long digit_sum(long long n) {
    if (n == 0) return 0;
    return (n % 10) + digit_sum(n / 10);
}

int main(void) {
    char s[256]; long long num = 0;
    if (scanf("%255s %lld", s, &num) == 2) {
        int n = (int)strlen(s);
        printf("%s %lld\\n", is_pal(s, 0, n - 1) ? "YES" : "NO", digit_sum(num < 0 ? -num : num));
    }
    return 0;
}`,
        stdin: 'madam 459',
        expectedOutput: 'YES 18',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'if (l >= r) return 1;', whatItMeans: 'Base case when left and right indices meet or cross.', whyItIsThere: 'Handles both odd and even length palindromes cleanly.', ifDeletedError: 'Out-of-bounds recursion until crash.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Includes standard I/O header for printf.', whyItIsThere: 'Allows printing factorial output.', ifDeletedError: 'Compile error: implicit printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'long long fact(int n) {', whatItMeans: 'Declares recursive factorial function returning 64-bit integer.', whyItIsThere: 'Factorials > 12! overflow 32-bit int.', ifDeletedError: 'Compile error: fact undeclared.' },
      { lineNumber: 'Line 4', codeSnippet: 'if (n <= 1) return 1;', whatItMeans: 'Base case stopping recursion cleanly at n=1 or n=0.', whyItIsThere: 'Without base case, stack overflows immediately.', ifDeletedError: 'SIGSEGV Stack Overflow at runtime.' },
      { lineNumber: 'Line 5', codeSnippet: 'return (long long)n * fact(n - 1);', whatItMeans: 'Reduces problem size by 1 and multiplies on unwind.', whyItIsThere: 'Forms n * (n-1) * ... * 1 recursively.', ifDeletedError: 'Compile error: missing return value.' },
      { lineNumber: 'Line 9', codeSnippet: 'printf("5!=%lld\\n", fact(5));', whatItMeans: 'Triggers top-level call fact(5) and prints unwound result.', whyItIsThere: 'Initiates call stack trace and emits stdout.', ifDeletedError: 'No stdout printed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call fact(5) -> fact(4) -> ... -> fact(1)', memoryOrStack: '5 frames stacked', note: 'Descending toward base case' },
      { step: 2, state: 'fact(1) hits base case', memoryOrStack: 'returns 1', note: 'Deepest frame pops' },
      { step: 3, state: 'Unwind 2*1 -> 3*2 -> 4*6 -> 5*24', memoryOrStack: 'res=2 -> 6 -> 24 -> 120', note: 'Frames pop cleanly' },
      { step: 4, state: 'Back in main()', memoryOrStack: 'stdout="5!=120"', note: 'Call stack empty' },
    ],
    harryBugTraps: [
      {
        title: 'Missing or Unreachable Base Case (Infinite Stack Overflow)',
        brokenCode: `int f(int n) { return n * f(n - 1); } // no if (n <= 1)!`,
        fixedCode: `#include <stdio.h>\nint f(int n) { return n <= 1 ? 1 : n * f(n - 1); }\nint main(void) { printf("%d\\n", f(5)); return 0; }`,
        whyItBreaks: 'Calling f(0), f(-1), f(-2)... pushes millions of frames until OS kills the process with SIGSEGV.',
      },
      {
        title: 'Calling Recursive Subproblem Twice in Fast Power',
        brokenCode: `long long p(long long b, long long e) { return e==0 ? 1 : p(b,e/2)*p(b,e/2); }`,
        fixedCode: `#include <stdio.h>\nlong long p(long long b, long long e) { if (e==0) return 1; long long h = p(b, e/2); return (e&1) ? b*h*h : h*h; }\nint main(void) { printf("%lld\\n", p(2, 10)); return 0; }`,
        whyItBreaks: 'Calling p(b, e/2) twice executes two identical exponential branches, degrading O(log e) to O(e).',
      },
      {
        title: 'Caching Zero Without Sentinel (-1) Initialization',
        brokenCode: `static long long memo[50]; if (memo[n]) return memo[n]; // fails when fib(0)==0!`,
        fixedCode: `#include <stdio.h>\n// Initialize memo to -1 so valid 0 values are recognized as cached!\nint main(void) { printf("Use -1 sentinel\\n"); return 0; }`,
        whyItBreaks: 'If valid answers can be 0 (e.g., fib(0) == 0 or count == 0), checking `if (memo[n])` misses the cache and recomputes.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-15-q1',
        difficulty: 'Easy',
        title: '1. Recursive Sum 1..N',
        prompt: 'Write `long long rec_sum(int n)` returning 1 + 2 + ... + n recursively.',
        banglaHint: '`n <= 0` হলে `0`, নইলে `n + rec_sum(n - 1)` রিটার্ন করো।',
        starterCode: `#include <stdio.h>\nlong long rec_sum(int n) { return n <= 0 ? 0 : n + rec_sum(n - 1); }\nint main(void) { int n=0; if (scanf("%d", &n)==1) printf("%lld\\n", rec_sum(n)); return 0; }`,
        sampleStdin: '10',
        expectedOutput: '55',
      },
      {
        id: 'c-ch-15-q2',
        difficulty: 'Easy',
        title: '2. Recursive Digit Count',
        prompt: 'Read non-negative integer n and return number of digits recursively (0 has 1 digit).',
        banglaHint: '`n < 10` হলে বেস কেস `1`, নইলে `1 + digits(n / 10)`।',
        starterCode: `#include <stdio.h>\nint digits(long long n) { return n < 10 ? 1 : 1 + digits(n / 10); }\nint main(void) { long long n=0; if (scanf("%lld", &n)==1) printf("%d\\n", digits(n < 0 ? -n : n)); return 0; }`,
        sampleStdin: '90421',
        expectedOutput: '5',
      },
      {
        id: 'c-ch-15-q3',
        difficulty: 'Medium',
        title: '3. Recursive Euclidean GCD',
        prompt: 'Read a and b; print gcd(a, b) via `b == 0 ? a : gcd(b, a % b)`.',
        banglaHint: 'ইউক্লিডের রিকার্সিভ সূত্র `gcd(b, a % b)` মাত্র O(log min(a,b)) ধাপে উত্তর দেয়।',
        starterCode: `#include <stdio.h>\nlong long gcd(long long a, long long b) { return b == 0 ? a : gcd(b, a % b); }\nint main(void) { long long a=0, b=0; if (scanf("%lld %lld", &a, &b)==2) printf("%lld\\n", gcd(a, b)); return 0; }`,
        sampleStdin: '48 18',
        expectedOutput: '6',
      },
      {
        id: 'c-ch-15-q4',
        difficulty: 'Medium',
        title: '4. Recursive Binary Search on Sorted Array',
        prompt: 'Read n, target, and sorted A[n]; return index of target via recursive `bs(a, lo, hi, t)` or -1.',
        banglaHint: '`lo > hi` বেস কেসে `-1` ফেরত দাও।',
        starterCode: `#include <stdio.h>\nint bs(const long long *a, int lo, int hi, long long t) {\n    if (lo > hi) return -1;\n    int m = lo + (hi - lo) / 2;\n    if (a[m] == t) return m;\n    return a[m] < t ? bs(a, m + 1, hi, t) : bs(a, lo, m - 1, t);\n}\nint main(void) {\n    int n=0; long long t=0, a[1000];\n    if (scanf("%d %lld", &n, &t)==2) { for(int i=0;i<n;i++) scanf("%lld",&a[i]); printf("%d\\n", bs(a,0,n-1,t)); }\n    return 0;\n}`,
        sampleStdin: '5 14\n2 6 10 14 20',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-15-q5',
        difficulty: 'Hard',
        title: '5. Climbing Stairs With 1, 2 or 3 Steps (Memoized)',
        prompt: 'Read N (0..60); count ways to reach step N using jumps of 1, 2, or 3 with memoization.',
        banglaHint: '`ways(n) = ways(n-1) + ways(n-2) + ways(n-3)` এবং `memo[]` অ্যারে দিয়ে সংরক্ষণ করো!',
        starterCode: `#include <stdio.h>\nstatic long long m[65];\nlong long ways(int n) {\n    if (n < 0) return 0;\n    if (n == 0) return 1;\n    if (m[n]) return m[n];\n    return m[n] = ways(n - 1) + ways(n - 2) + ways(n - 3);\n}\nint main(void) { int n=0; if (scanf("%d", &n)==1) printf("%lld\\n", ways(n)); return 0; }`,
        sampleStdin: '4',
        expectedOutput: '7',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 3: Phase 3 Recursive & String Analyzer',
      description: 'Merges strings, two pointers, recursion, and call-stack base cases into an interactive analyzer.',
      banglaGoal: 'ফেইজ ৩ মার্জার: স্ট্রিং প্যালিনড্রোম, টু-পয়েন্টার এবং রিকার্সিভ ডিজিট-সাম একত্রে সমাধান।',
      combinesChapters: 'Ch 11–15',
      starterCode: `#include <stdio.h>
#include <string.h>

int is_pal(const char *s, int l, int r) {
    if (l >= r) return 1;
    if (s[l] != s[r]) return 0;
    return is_pal(s, l + 1, r - 1);
}

long long digit_sum(long long n) {
    if (n == 0) return 0;
    return (n % 10) + digit_sum(n / 10);
}

int main(void) {
    char s[256]; long long num = 0;
    if (scanf("%255s %lld", s, &num) == 2) {
        int n = (int)strlen(s);
        printf("%s %lld\\n", is_pal(s, 0, n - 1) ? "YES" : "NO", digit_sum(num < 0 ? -num : num));
    }
    return 0;
}`,
      sampleStdin: 'madam 459',
      expectedOutput: 'YES 18',
    },
    starterCode: `#include <stdio.h>
#include <string.h>

int is_pal(const char *s, int l, int r) {
    if (l >= r) return 1;
    if (s[l] != s[r]) return 0;
    return is_pal(s, l + 1, r - 1);
}

long long digit_sum(long long n) {
    if (n == 0) return 0;
    return (n % 10) + digit_sum(n / 10);
}

int main(void) {
    char s[256]; long long num = 0;
    if (scanf("%255s %lld", s, &num) == 2) {
        int n = (int)strlen(s);
        printf("%s %lld\\n", is_pal(s, 0, n - 1) ? "YES" : "NO", digit_sum(num < 0 ? -num : num));
    }
    return 0;
}`,
    sampleStdin: 'madam 459',
    expectedSampleOutput: 'YES 18',
    testCases: [
      { id: 'c15-t1', input: 'madam 459', expectedOutput: 'YES 18' },
      { id: 'c15-t2', input: 'argon 1024', expectedOutput: 'NO 7', isHidden: true },
    ],
  },
};


