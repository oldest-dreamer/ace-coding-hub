import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_C_P5: Record<number, AtomicLessonOverride> = {
  21: {
    chapterNumber: 21,
    title: 'C Chapter 21 (C23): Sorting, Custom Comparators (qsort) & Binary Search on Answer',
    banglaTitle: 'C অধ্যায় ২১ (C23): সর্টিং, কাস্টম কম্পারেটর (qsort) ও বাইনারি সার্চ',
    subtitle: 'Safe qsort three-way comparators (no subtraction overflow!), lower_bound binary search, and monotonic binary search on answer.',
    zeroIntuition: {
      plainEnglishStory:
        'Once an array is sorted in `O(n log n)` via C’s standard `qsort()`, searching drops from `O(n)` down to `O(log n)` via Binary Search—cutting `1,000,000` checks down to at most `20`!\n\nTwo critical C23 rules separate pros from bugs: (1) inside `qsort` comparators, NEVER write `return *(int*)a - *(int*)b;` because subtracting extreme ints like `2000000000 - (-2000000000)` overflows 32-bit `int`! Always write `(va > vb) - (va < vb)`. (2) in Binary Search, compute `mid = lo + (hi - lo) / 2` to avoid `(lo + hi)` overflow.',
      asciiFlowchart: `  qsort([9, 1, 5, 3, 7]) --> [1, 3, 5, 7, 9]
  Lower Bound (>= 7):
    lo=0, hi=4 -> mid=2 (a[2]=5 < 7)  -> lo=3
    lo=3, hi=4 -> mid=3 (a[3]=7 >= 7) -> ans=3, hi=2 => returns index 3!`,
      pseudocode: [
        '1. SORT input array with qsort(a, n, sizeof(*a), cmp_safe)',
        '2. WRITE overflow-proof comparator: return (va > vb) - (va < vb);',
        '3. BINARY SEARCH with lo = 0, hi = n - 1, mid = lo + (hi - lo) / 2',
        '4. RECORD candidate ans when predicate(mid) holds, then shrink hi = mid - 1',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শব্দকোষে শব্দ খোঁজা ও ওভারফ্লো-মুক্ত সর্ট কম্পারেটর (Binary Search)',
        explanation:
          'ধরো ১০ লক্ষ পৃষ্ঠার একটি ডিকশনারিতে একটি শব্দ খুঁজতে হবে—প্রথম পৃষ্ঠা থেকে উল্টাতে গেলে (`O(n)`) সারা দিন লাগবে। কিন্তু ডিকশনারিটি যেহেতু বর্ণানুক্রমে সাজানো (Sorted), তুমি ঠিক মাঝখানের পৃষ্ঠায় খোলো: শব্দটি ডানে থাকলে বামের ৫ লক্ষ পৃষ্ঠা এক নিমিষেই বাদ! এভাবে প্রতি ধাপে অর্ধেক বাদ দিতে থাকলে ১০ লক্ষের ভেতর যেকোনো তথ্য মাত্র ২০ ধাপে (`O(log n)`) পাওয়া যায়! C ভাষায় দ্রুত সর্ট করতে `<stdlib.h>`-এর `qsort()` ফাংশন আছে, কিন্তু এতে কম্পারেটর লেখার সময় নবীনরা একটি বিখ্যাত ভুল করে: তারা `return *a - *b;` লেখে! যদি দুটি সংখ্যা `+2×10^9` ও `-2×10^9` হয়, তবে বিয়োগফল `4×10^9` হয়ে ৩২-বিট `int` ওভারফ্লো করে সর্ট উল্টোপাল্টা করে দেবে! এর শতভাগ নিরাপদ সমাধান হলো `(va > vb) - (va < vb)` লেখা, যা কোনো বিয়োগ ছাড়াই কেবল `-1`, `0`, বা `+1` রিটার্ন করে। বাইনারি সার্চে `mid = (lo + hi) / 2` না লিখে সবসময় `lo + (hi - lo) / 2` লিখবে যাতে `lo + hi` ওভারফ্লো না করে। শুধু অ্যারেতে খোঁজা নয়, বরং "সর্বনিম্ন কত বড় ট্রাকে সব মাল ধরবে?"—এরকম মনোটনিক প্রশ্নে সরাসরি সম্ভাব্য উত্তরের রেঞ্জে বাইনারি সার্চ (Binary Search on Answer) চালিয়ে কঠিন কনটেস্টের সমস্যা সমাধান করা যায়!',
        everydayExample:
          'অক্সফোর্ড ডিকশনারির মাঝামাঝি পাতা খুলে শব্দ আগে না পরে আছে দেখে অর্ধেক বই বাদ দেওয়া হলো Binary Search—একদম প্রথম পাতা থেকে খুঁজতে হয় না!',
        keyTakeaways: [
          '`qsort` কম্পারেটরে কখনো `*a - *b` লিখবে না; সর্বদা `(va > vb) - (va < vb)` লিখবে।',
          'বাইনারি সার্চে ওভারফ্লো এড়াতে সবসময় `mid = lo + (hi - lo) / 2` সূত্র ব্যবহার করো।',
          'Lower Bound (`a[mid] >= target`) প্রথম সমান বা বড় ইনডেক্স খুঁজতে অপরিহার্য।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-21-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Safe qsort() With Overflow-Free Three-Way Comparator',
        englishParagraphs: [
          'C’s `qsort` expects a comparator returning negative if `*a < *b`, zero if equal, and positive if `*a > *b`.',
          'Writing `return (va > vb) - (va < vb);` works identically for `int`, `long long`, and even extreme `INT_MIN` / `INT_MAX` pairs with zero overflow risk.',
        ],
        banglaParagraphs: [
          'এখানে `<stdlib.h>`-এর `qsort()` ব্যবহার করে একটি অ্যারে ছোট থেকে বড় সাজানো হয়েছে এবং নিরাপদ কম্পারেটর `(va > vb) - (va < vb)` ব্যবহার করা হয়েছে।',
          'এতে নেগেটিভ ও বিশাল মান একসাথে থাকলেও কোনো ওভারফ্লো হবে না।',
        ],
        memoryDiagram: `unsorted=[9, 1, 5, 3, 7] -> qsort(..., cmp_ll) -> [1, 3, 5, 7, 9]`,
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a;
    long long vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    long long a[5] = {9, 1, 5, 3, 7};
    qsort(a, 5, sizeof(a[0]), cmp_ll);
    for (int i = 0; i < 5; i++) printf("%lld%s", a[i], i == 4 ? "\\n" : " ");
    return 0;
}`,
        stdin: '',
        expectedOutput: '1 3 5 7 9',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int cmp_ll(const void *a, const void *b) {', whatItMeans: 'Comparator callback invoked by qsort for element pairs.', whyItIsThere: 'qsort is type-agnostic and passes void* element pointers.', ifDeletedError: 'Compile error: cmp_ll undeclared.' },
          { lineNumber: 'Line 7', codeSnippet: 'return (va > vb) - (va < vb);', whatItMeans: 'Returns -1, 0, or +1 cleanly without subtraction overflow.', whyItIsThere: 'Safe even when va - vb exceeds 32-bit int range.', ifDeletedError: 'Comparator missing return value; broken sort order.' },
          { lineNumber: 'Line 12', codeSnippet: 'qsort(a, 5, sizeof(a[0]), cmp_ll);', whatItMeans: 'Sorts 5 elements of size 8 bytes in O(n log n) average time.', whyItIsThere: 'Orders array before O(log n) binary search.', ifDeletedError: 'Array stays unsorted [9, 1, 5, 3, 7].' },
        ],
      },
      {
        id: 'c-ch-21-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Sorting + Lower-Bound Binary Search (>= Target)',
        englishParagraphs: [
          'Reading unsorted input, sorting on heap via `qsort`, then running `while (lo <= hi)` finds the first index `mid` where `a[mid] >= target` in `O(log n)` time.',
          'Tracking `ans = -1` handles targets larger than every array element cleanly.',
        ],
        banglaParagraphs: [
          'ইনপুট অ্যারে আগে `qsort` দিয়ে সাজিয়ে তারপর বাইনারি সার্চ চালিয়ে `target`-এর সমান বা তার চেয়ে বড় প্রথম ইনডেক্স বের করা হয়েছে।',
          'না পাওয়া গেলে স্বয়ংক্রিয়ভাবে `-1` প্রিন্ট হয়।',
        ],
        memoryDiagram: `[1,3,5,7,9], target=7 -> lo=0,hi=4 -> mid=2(5<7)->lo=3 -> mid=3(7>=7)->ans=3`,
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a, vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int n = 0; long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long *a = (long long *)malloc((size_t)n * sizeof(*a));
    if (!a) return 1;
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, (size_t)n, sizeof(*a), cmp_ll);
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= target) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    printf("%d\\n", ans);
    free(a);
    return 0;
}`,
        stdin: '5 7\n9 1 5 3 7',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: 'int mid = lo + (hi - lo) / 2;', whatItMeans: 'Overflow-safe midpoint calculation.', whyItIsThere: 'Prevents signed int overflow when lo + hi > 2.14e9.', ifDeletedError: 'Compile error: mid undeclared.' },
        ],
      },
      {
        id: 'c-ch-21-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Binary Search on Answer: Minimum Ship Capacity in D Days',
        englishParagraphs: [
          'Suppose packages `[w_0..w_{n-1}]` must ship in order within `D` days. We can test any candidate capacity `C` via a linear greedy check `can_ship(C)` in `O(n)`!',
          'Because feasibility is monotonic (`false, false, ..., true, true`), binary searching `[max_w, sum_w]` finds the exact minimum capacity in `O(n log(sum_w))`!',
        ],
        banglaParagraphs: [
          'সব পার্সেল `D` দিনের মধ্যে পাঠাতে ন্যূনতম কত ধারণক্ষমতার জাহাজ লাগবে—এ ধরনের প্রশ্নে সরাসরি উত্তরের ওপর বাইনারি সার্চ (Binary Search on Answer) চালানো হয়!',
          'যেকোনো ক্ষমতা `cap` যাচাই করতে `O(n)` লাগে এবং উত্তর মনোটনিক বলে মাত্র ৩০-৪০ ধাপেই সেরা ক্ষমতা পাওয়া যায়।',
        ],
        memoryDiagram: `weights=[1,2,3,4,5], D=2 -> lo=5, hi=15 -> can_ship(9)=true, can_ship(8)=false => ans=9`,
        code: `#include <stdio.h>

int can_ship(const long long *w, int n, int days, long long cap) {
    int used = 1; long long cur = 0;
    for (int i = 0; i < n; i++) {
        if (cur + w[i] > cap) { used++; cur = 0; }
        cur += w[i];
    }
    return used <= days;
}

int main(void) {
    int n = 0, D = 0; long long w[1000];
    if (scanf("%d %d", &n, &D) != 2) return 0;
    long long lo = 0, hi = 0;
    for (int i = 0; i < n; i++) {
        scanf("%lld", &w[i]);
        if (w[i] > lo) lo = w[i];
        hi += w[i];
    }
    long long ans = hi;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        if (can_ship(w, n, D, mid)) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    printf("%lld\\n", ans);
    return 0;
}`,
        stdin: '5 2\n1 2 3 4 5',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 24', codeSnippet: 'if (can_ship(w, n, D, mid)) { ans = mid; hi = mid - 1; }', whatItMeans: 'Records valid capacity and probes smaller half for tightest minimum.', whyItIsThere: 'Monotonic feasibility property guarantees binary search optimality.', ifDeletedError: 'Always prints sum of all weights.' },
        ],
      },
      {
        id: 'c-ch-21-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Custom Struct Multi-Key qsort & Subtraction Overflow Trap',
        englishParagraphs: [
          'Sorting custom structs with `qsort` sorts on primary key (e.g. score descending) and breaks ties deterministically on secondary key (e.g. id ascending).',
          'Never compare large values using `return a->score - b->score;`—use clean comparisons `(b->score > a->score) - (b->score < a->score)`!',
        ],
        banglaParagraphs: [
          'পয়েন্ট অনুযায়ী বড় থেকে ছোট ও সমান হলে আইডি অনুযায়ী ছোট থেকে বড়—এভাবে একাধিক ফিল্ডে `qsort` করার আসল প্যাটার্ন এটি।',
          'এখানে বিয়োগফল নয়, তুলনামূলক অপারেটর ব্যবহার করায় কখনোই ওভারফ্লো হবে না।',
        ],
        memoryDiagram: `[(1,50),(2,90),(3,90)] -> score desc, id asc -> [(2,90),(3,90),(1,50)]`,
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int id; long long score; } Team;

int cmp_team(const void *pa, const void *pb) {
    const Team *a = (const Team *)pa, *b = (const Team *)pb;
    if (a->score != b->score) return (b->score > a->score) - (b->score < a->score);
    return (a->id > b->id) - (a->id < b->id);
}

int main(void) {
    int n = 0; Team t[100];
    if (scanf("%d", &n) == 1 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%d %lld", &t[i].id, &t[i].score);
        qsort(t, (size_t)n, sizeof(t[0]), cmp_team);
        printf("%d %lld\\n", t[0].id, t[0].score);
    }
    return 0;
}`,
        stdin: '3\n1 50\n3 90\n2 90',
        expectedOutput: '2 90',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'if (a->score != b->score) return (b->score > a->score) - (b->score < a->score);', whatItMeans: 'Orders higher scores first safely without integer subtraction.', whyItIsThere: 'Implements deterministic multi-key leaderboard ordering.', ifDeletedError: 'Winner selection ignores score.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides printf declaration.', whyItIsThere: 'Outputs sorted array.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 2', codeSnippet: '#include <stdlib.h>', whatItMeans: 'Imports qsort standard library declaration.', whyItIsThere: 'Provides built-in O(n log n) generic sort.', ifDeletedError: 'Compile error: implicit declaration of qsort.' },
      { lineNumber: 'Line 4', codeSnippet: 'int cmp_ll(const void *a, const void *b) {', whatItMeans: 'Comparator callback taking two generic element pointers.', whyItIsThere: 'Defines ascending order for qsort.', ifDeletedError: 'Compile error: cmp_ll undefined.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long va = *(const long long *)a;', whatItMeans: 'Casts generic void* safely back to const long long* and dereferences.', whyItIsThere: 'Reads actual numeric value stored at element address.', ifDeletedError: 'Cannot dereference void* directly in C.' },
      { lineNumber: 'Line 7', codeSnippet: 'return (va > vb) - (va < vb);', whatItMeans: 'Returns -1, 0, or +1 cleanly without arithmetic overflow.', whyItIsThere: 'Prevents sign flip when subtracting large extremes.', ifDeletedError: 'Comparator reaches end without return.' },
      { lineNumber: 'Line 12', codeSnippet: 'qsort(a, 5, sizeof(a[0]), cmp_ll);', whatItMeans: 'Sorts 5 long longs in place.', whyItIsThere: 'Executes fast standard library sort.', ifDeletedError: 'Array stays unsorted [9, 1, 5, 3, 7].' },
    ],
    dryRunTable: [
      { step: 1, state: 'qsort([9, 1, 5, 3, 7])', memoryOrStack: 'a=[1, 3, 5, 7, 9]', note: 'Sorted ascending in O(n log n)' },
      { step: 2, state: 'lo=0, hi=4 -> mid=2', memoryOrStack: 'a[2]=5 < 7', note: 'Discard left half -> lo=3' },
      { step: 3, state: 'lo=3, hi=4 -> mid=3', memoryOrStack: 'a[3]=7 >= 7', note: 'Record ans=3, shrink hi=2' },
      { step: 4, state: 'lo(3) > hi(2) stops', memoryOrStack: 'stdout="3"', note: 'First index >= 7 found' },
    ],
    harryBugTraps: [
      {
        title: 'Using *a - *b Inside qsort Comparator',
        brokenCode: `int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }`,
        fixedCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) {\n    int x = *(const int*)a, y = *(const int*)b;\n    return (x > y) - (x < y);\n}\nint main(void) { int a[2]={2000000000,-2000000000}; qsort(a,2,4,cmp); printf("%d\\n",a[0]); return 0; }`,
        whyItBreaks: 'Subtracting 2e9 - (-2e9) overflows 32-bit signed int into a negative number, inverting the comparator result!',
      },
      {
        title: 'Midpoint Overflow in (lo + hi) / 2',
        brokenCode: `int mid = (lo + hi) / 2; // overflows when lo + hi > 2.14e9!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int lo = 1500000000, hi = 2000000000;\n    int mid = lo + (hi - lo) / 2;\n    printf("%d\\n", mid);\n    return 0;\n}`,
        whyItBreaks: 'Adding lo + hi above INT_MAX turns mid negative and crashes array indexing.',
      },
      {
        title: 'Infinite Loop When Assigning hi = mid Instead of hi = mid - 1',
        brokenCode: `while (lo <= hi) { int mid = lo + (hi - lo) / 2; if (a[mid] >= t) hi = mid; }`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int a[3]={2,5,9}, lo=0, hi=2, ans=-1, t=5;\n    while (lo <= hi) { int m = lo + (hi - lo)/2; if (a[m] >= t) { ans = m; hi = m - 1; } else lo = m + 1; }\n    printf("%d\\n", ans);\n    return 0;\n}`,
        whyItBreaks: 'Under while(lo <= hi), when lo == hi == mid and a[mid] >= t, setting hi = mid leaves bounds identical forever (TLE).',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-21-q1',
        difficulty: 'Easy',
        title: '1. Sort & Print K-th Smallest Element',
        prompt: 'Read n, k (1-based), then n integers; sort with qsort and print the k-th smallest.',
        banglaHint: 'অ্যারে সর্ট করে ১-বেজড `k`-তম উপাদান অর্থাৎ `a[k - 1]` প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) { long long x=*(const long long*)a, y=*(const long long*)b; return (x>y)-(x<y); }\nint main(void) {\n    int n=0, k=0; long long a[1000];\n    if (scanf("%d %d", &n, &k) == 2 && k>=1 && k<=n) {\n        for (int i=0; i<n; i++) scanf("%lld", &a[i]);\n        qsort(a, (size_t)n, sizeof(*a), cmp);\n        printf("%lld\\n", a[k - 1]);\n    }\n    return 0;\n}`,
        sampleStdin: '5 3\n40 10 50 20 30',
        expectedOutput: '30',
      },
      {
        id: 'c-ch-21-q2',
        difficulty: 'Easy',
        title: '2. Exact Binary Search Check',
        prompt: 'Read n, target, then sorted A[n]; print index of target or -1.',
        banglaHint: '`a[mid] == target` হলেই ইনডেক্স প্রিন্ট করে ব্রেক করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n=0; long long t=0, a[1000];\n    if (scanf("%d %lld", &n, &t) == 2) {\n        for (int i=0; i<n; i++) scanf("%lld", &a[i]);\n        int lo=0, hi=n-1, ans=-1;\n        while (lo <= hi) {\n            int m = lo + (hi - lo) / 2;\n            if (a[m] == t) { ans = m; break; }\n            if (a[m] < t) lo = m + 1; else hi = m - 1;\n        }\n        printf("%d\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: '5 14\n2 6 10 14 20',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-21-q3',
        difficulty: 'Medium',
        title: '3. Count Occurrences via Lower & Upper Bound',
        prompt: 'Read n, target, then sorted A[n]; print frequency of target in O(log n).',
        banglaHint: 'প্রথম `>= target` এবং প্রথম `> target` ইনডেক্স বের করে বিয়োগ করলেই ফ্রিকোয়েন্সি পাওয়া যায়!',
        starterCode: `#include <stdio.h>\nint lb(const long long *a, int n, long long x, int strict) {\n    int lo=0, hi=n-1, ans=n;\n    while (lo <= hi) { int m=lo+(hi-lo)/2; if (strict ? a[m]>x : a[m]>=x) { ans=m; hi=m-1; } else lo=m+1; }\n    return ans;\n}\nint main(void) {\n    int n=0; long long x=0, a[1000];\n    if (scanf("%d %lld", &n, &x) == 2) {\n        for (int i=0; i<n; i++) scanf("%lld", &a[i]);\n        printf("%d\\n", lb(a, n, x, 1) - lb(a, n, x, 0));\n    }\n    return 0;\n}`,
        sampleStdin: '6 4\n1 4 4 4 7 9',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-21-q4',
        difficulty: 'Medium',
        title: '4. Integer Square Root Floor via Binary Search',
        prompt: 'Read non-negative N up to 10^12 and print floor(sqrt(N)) using binary search (avoid overflow!).',
        banglaHint: '`mid * mid <= n`-এর বদলে `mid <= n / mid` লিখলে কখনো ৬৪-বিট ওভারফ্লো হবে না!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long n=0;\n    if (scanf("%lld", &n) == 1) {\n        if (n < 2) { printf("%lld\\n", n); return 0; }\n        long long lo=1, hi=n, ans=1;\n        while (lo <= hi) {\n            long long m = lo + (hi - lo) / 2;\n            if (m <= n / m) { ans = m; lo = m + 1; } else hi = m - 1;\n        }\n        printf("%lld\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: '50',
        expectedOutput: '7',
      },
      {
        id: 'c-ch-21-q5',
        difficulty: 'Hard',
        title: '5. Koko Eating Bananas (Binary Search on Speed)',
        prompt: 'Read n piles and hours H; find minimum integer eating speed K so total ceil(pile/K) <= H.',
        banglaHint: '`ceil(p / k)` পূর্ণসংখ্যায় `(p + k - 1) / k` এবং স্পিড `[1..max_pile]` এর মধ্যে বাইনারি সার্চ করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n=0; long long H=0, p[1000], mx=1;\n    if (scanf("%d %lld", &n, &H) != 2) return 0;\n    for (int i=0; i<n; i++) { scanf("%lld", &p[i]); if (p[i]>mx) mx=p[i]; }\n    long long lo=1, hi=mx, ans=mx;\n    while (lo <= hi) {\n        long long m = lo + (hi - lo) / 2, hrs = 0;\n        for (int i=0; i<n; i++) hrs += (p[i] + m - 1) / m;\n        if (hrs <= H) { ans = m; hi = m - 1; } else lo = m + 1;\n    }\n    printf("%lld\\n", ans);\n    return 0;\n}`,
        sampleStdin: '4 8\n3 6 7 11',
        expectedOutput: '4',
      },
    ],
    miniBuild: {
      title: 'qsort & Lower-Bound Binary Search Engine',
      description: 'Sorts dynamic heap buffer using overflow-safe qsort and finds lower-bound index in O(log n).',
      banglaGoal: 'নিরাপদ qsort ও লোয়ার-বাউন্ড বাইনারি সার্চ মিলিয়ে O(n log n) সার্চ ইঞ্জিন বানানো।',
      combinesChapters: 'Ch 1–21',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a, vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int n; long long target;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long *a = (long long *)malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, (size_t)n, sizeof(long long), cmp_ll);
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= target) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    printf("%d\\n", ans);
    free(a);
    return 0;
}`,
      sampleStdin: '5 7\n9 1 5 3 7',
      expectedOutput: '3',
    },
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a, vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int n; long long target;
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0) return 0;
    long long *a = (long long *)malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    qsort(a, (size_t)n, sizeof(long long), cmp_ll);
    int lo = 0, hi = n - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] >= target) { ans = mid; hi = mid - 1; }
        else lo = mid + 1;
    }
    printf("%d\\n", ans);
    free(a);
    return 0;
}`,
    sampleStdin: '5 7\n9 1 5 3 7',
    expectedSampleOutput: '3',
    testCases: [
      { id: 'c21-t1', input: '5 7\n9 1 5 3 7', expectedOutput: '3' },
      { id: 'c21-t2', input: '4 10\n2 4 6 8', expectedOutput: '-1', isHidden: true },
    ],
  },

  22: {
    chapterNumber: 22,
    title: 'C Chapter 22 (C23): Hashing, Open-Addressing Tables & Sliding Window Mastery',
    banglaTitle: 'C অধ্যায় ২২ (C23): হ্যাশিং, ওপেন-অ্যাড্রেসিং হ্যাশ টেবিল ও স্লাইডিং উইন্ডো',
    subtitle: 'Building fast O(1) average lookup hash maps in pure C, linear probing, splitmix64 anti-hack hashing, and Two-Sum in O(n).',
    zeroIntuition: {
      plainEnglishStory:
        'Python has `dict`, C++ has `unordered_map`, Java has `HashMap`—yet C’s standard library ships ZERO built-in hash table! Knowing how to build a compact open-addressing hash map in 20 lines of pure C gives you O(1) lookup for Two-Sum, frequency counting of `10^9` values, and subarray sums.\n\nInstead of storing keys from `0..10^9` in an impossible array, hash each key into a power-of-2 bucket table (`mask = CAP - 1`) using SplitMix64 mixing so adversarial Codeforces anti-hash tests cannot trigger O(n^2) collisions, then step linearly `(idx + 1) & mask` on collisions.',
      asciiFlowchart: `  Key k=7 -> SplitMix64(k) & (CAP - 1) -> bucket idx=3
  Slot[3]: { used=1, key=7, val=1 }
  Query complement (target - x): probe slot -> HIT in O(1) average time!`,
      pseudocode: [
        '1. CHOOSE power-of-2 capacity CAP >= 2 * expected_items (load <= 0.5)',
        '2. HASH key cleanly with SplitMix64 bit-mixer + mask = CAP - 1',
        '3. PROBE linearly (idx + 1) & mask until empty slot or matching key',
        '4. STORE/QUERY complement in O(1) amortized time',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লাইব্রেরির ক্যাটালগ বক্স ও সংঘর্ষ এড়ানোর কৌশল (Hash Table & Probing)',
        explanation:
          'কল্পনা করো তুমি ১ কোটি মানুষের ফোন নম্বর রাখতে চাও, কিন্তু ১ কোটি সাইজের অ্যারে বানানো সম্ভব নয়। হ্যাশ টেবিল এমন একটি জাদুকরী ক্যাটালগ যা বিশাল সংখ্যা (`10^9`) বা স্ট্রিংকে একটি ছোট ফর্মুলা (Hash Function) দিয়ে ছোট ইনডেক্সে (`0..CAP-1`) রূপান্তর করে এবং `O(1)` সময়ে খুঁজে দেয়! যেহেতু Python `dict` বা C++ `unordered_map`-এর মতো তৈরি হ্যাশ ম্যাপ C স্ট্যান্ডার্ড লাইব্রেরিতে নেই, তাই C প্রোগ্রামাররা মাত্র ২০ লাইনের Linear Probing Hash Table ব্যবহার করে। যদি হ্যাশ করার পর কোনো ঘরে আগে থেকেই অন্য সংখ্যা বসে থাকে (Collision), তবে ঠিক পরের খালি ঘরে `(idx + 1) & (CAP - 1)` বসে যাওয়াই হলো Open Addressing বা Linear Probing! একটি বড় প্রো-টিপ: কখনোই সাদামাটা `key % 10007` হ্যাশ ফাংশন লিখবে না—প্রতিযোগিতামূলক প্রোগ্রামিংয়ে জাজেরা ইচ্ছাকৃতভাবে `10007`-এর গুণিতক ইনপুট দিয়ে কোডকে `O(n^2)` স্লো করে দেয় (Anti-Hash Test)। তাই সবসময় SplitMix64 নামের বিট-মিক্সার দিয়ে হ্যাশ করলে কলিশন শূন্যের কোঠায় থাকে! এছাড়া হ্যাশ টেবিলের লোড ফ্যাক্টর ৫০%-এর নিচে রাখতে মোট আইটেমের কমপক্ষে দ্বিগুণ সাইজের `CAP` (২-এর ঘাত, যেমন `4096`) নেওয়া উচিত। পাশাপাশি এই হ্যাশ টেবিল দিয়ে স্লাইডিং উইন্ডোতে ডিস্টিংক্ট সংখ্যা গোনা ও `Two Sum` মুহূর্তেই `O(n)` সময়ে সমাধান করা যায়।',
        everydayExample:
          'হোস্টেলের রুম নম্বর (`room = id % 100`) খালি থাকলে ওই রুমে থাকা, আর আগে কেউ থাকলে ঠিক পরের খালি রুমে (`+1`) উঠে পড়া—এটাই Linear Probing!',
        keyTakeaways: [
          'C-তে হ্যাশ টেবিলের সাইজ `CAP` সবসময় ২-এর ঘাত (যেমন `2048`) রাখলে `& (CAP - 1)` মডিউলোর চেয়ে অনেক দ্রুত চলে।',
          'টেবিল যেন ভরে আটকে না যায় সেজন্য উপাদানের সংখ্যার কমপক্ষে ২ গুণ ক্যাপাসিটি নাও।',
          'সহজ মিক্সার (`SplitMix64`) হ্যাশ-কলিশন হ্যাক থেকে প্রোগ্রামকে নিরাপদ রাখে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-22-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Compact Open-Addressing Hash Map in 20 Lines of C',
        englishParagraphs: [
          'Each bucket stores `used` (0 or 1), `key`, and `val`. Because capacity `CAP = 1024` is a power of two, `(idx + 1) & 1023` wraps around cleanly without `%` division.',
          'Inserting and querying take O(1) average CPU cache hits because all buckets live contiguously in one array!',
        ],
        banglaParagraphs: [
          'মাত্র ২০ লাইনের স্ট্রাক্ট অ্যারে দিয়ে তৈরি এই হ্যাশ টেবিলে যেকোনো `long long` কী-এর মান O(1) সময়ে সেভ ও পড়া যাচ্ছে।',
          '`CAP = 1024` হওয়ায় `& (CAP - 1)` দিয়ে মুহূর্তেই বাকেট ইনডেক্স পাওয়া যায়।',
        ],
        memoryDiagram: `put(1000000007, 42) -> hash & 1023 -> Bucket[idx]={used:1,key:10^9+7,val:42}`,
        code: `#include <stdint.h>
#include <stdio.h>

#define CAP 1024
typedef struct { int used; long long key; int val; } Bucket;
static Bucket tbl[CAP];

uint64_t mix64(uint64_t x) {
    x += 0x9e3779b97f4a7c15ULL;
    x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
    return x ^ (x >> 27);
}

void put(long long k, int v) {
    size_t i = (size_t)(mix64((uint64_t)k) & (CAP - 1));
    while (tbl[i].used && tbl[i].key != k) i = (i + 1) & (CAP - 1);
    tbl[i].used = 1; tbl[i].key = k; tbl[i].val = v;
}

int get(long long k) {
    size_t i = (size_t)(mix64((uint64_t)k) & (CAP - 1));
    while (tbl[i].used) {
        if (tbl[i].key == k) return tbl[i].val;
        i = (i + 1) & (CAP - 1);
    }
    return -1;
}

int main(void) {
    put(1000000007LL, 42);
    printf("val=%d miss=%d\\n", get(1000000007LL), get(999));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'val=42 miss=-1',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'size_t i = (size_t)(mix64((uint64_t)k) & (CAP - 1));', whatItMeans: 'Hashes 64-bit key and masks into [0..CAP-1].', whyItIsThere: 'Avoids slow % division and resists anti-hash tests.', ifDeletedError: 'Compile error: i undeclared.' },
          { lineNumber: 'Line 15', codeSnippet: 'while (tbl[i].used && tbl[i].key != k) i = (i + 1) & (CAP - 1);', whatItMeans: 'Linearly probes until finding an empty slot or existing key.', whyItIsThere: 'Handles hash collisions deterministically.', ifDeletedError: 'Overwrites colliding distinct keys!' },
        ],
      },
      {
        id: 'c-ch-22-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Two-Sum in O(n) Using Unsorted Hash Table Lookup',
        englishParagraphs: [
          'For unsorted arrays where sorting would lose original indices, check whether `target - x` already sits inside our hash map before inserting `x -> idx`.',
          'Runs in single-pass `O(n)` time instead of `O(n^2)`.',
        ],
        banglaParagraphs: [
          'অ-সর্টেড অ্যারেতে `Two Sum`-এর দুটি মূল ইনডেক্স O(n) সময়ে খুঁজে বের করতে প্রতিটি সংখ্যা পড়ার সাথে সাথে `target - x` হ্যাশ টেবিলে আছে কি না চেক করা হয়েছে।',
          'পাওয়া গেলেই সাথে সাথে দুজনের ইনডেক্স প্রিন্ট করে লুপ শেষ!',
        ],
        memoryDiagram: `nums=[2,7,11,15], target=9 -> see 2 (put 2->0) -> see 7 (need 2 -> HIT 0, 1!)`,
        code: `#include <stdint.h>
#include <stdio.h>

#define CAP 4096
typedef struct { int used; long long key; int idx; } Entry;
static Entry map[CAP];

uint64_t h64(uint64_t x) { return ((x * 11400714819323198485ULL) >> 32); }

int find_idx(long long k) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used) { if (map[i].key == k) return map[i].idx; i = (i + 1) & (CAP - 1); }
    return -1;
}

void insert_idx(long long k, int idx) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used && map[i].key != k) i = (i + 1) & (CAP - 1);
    map[i].used = 1; map[i].key = k; map[i].idx = idx;
}

int main(void) {
    int n = 0; long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2) return 0;
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        int partner = find_idx(target - x);
        if (partner != -1) { printf("%d %d\\n", partner, i); return 0; }
        insert_idx(x, i);
    }
    printf("-1\\n");
    return 0;
}`,
        stdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
        lineByLine: [
          { lineNumber: 'Line 27', codeSnippet: 'int partner = find_idx(target - x);', whatItMeans: 'Looks up previously seen complement value in O(1).', whyItIsThere: 'Checking BEFORE inserting prevents pairing an element with itself.', ifDeletedError: 'Misses two-sum pair.' },
        ],
      },
      {
        id: 'c-ch-22-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Sliding Window Longest Substring Without Repeating Chars',
        englishParagraphs: [
          'Using a 256-slot ASCII `last_pos[c]` table (a direct hash map for `unsigned char`!), whenever `s[r]` already appeared inside `[l..r-1]`, jump `l` straight to `last_pos[s[r]] + 1`!',
          'This solves one of the most frequent FAANG string questions cleanly in one `O(n)` pass.',
        ],
        banglaParagraphs: [
          'কোনো স্ট্রিংয়ের ভেতর কোনো অক্ষর পুনরাবৃত্তি না করে সবচেয়ে লম্বা সাবস্ট্রিং বের করতে ২৫৬ ঘরের `last_seen[ch]` অ্যারে ব্যবহার করা হয়েছে।',
          'আগে দেখা অক্ষর উইন্ডোর ভেতরে পড়লেই বাম পয়েন্টার `l` এক লাফে পরের ঘরে চলে যায়—মোট সময় মাত্র O(n)!',
        ],
        memoryDiagram: `"abcabcbb" -> "abc" len=3 -> 'a' seen at 0 -> jump l=1`,
        code: `#include <stdio.h>

int main(void) {
    char s[2048];
    if (scanf("%2047s", s) == 1) {
        int last[256];
        for (int i = 0; i < 256; i++) last[i] = -1;
        int l = 0, best = 0;
        for (int r = 0; s[r] != '\\0'; r++) {
            unsigned char ch = (unsigned char)s[r];
            if (last[ch] >= l) l = last[ch] + 1;
            last[ch] = r;
            if (r - l + 1 > best) best = r - l + 1;
        }
        printf("%d\\n", best);
    }
    return 0;
}`,
        stdin: 'abcabcbb',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'if (last[ch] >= l) l = last[ch] + 1;', whatItMeans: 'Jumps window left edge past previous duplicate occurrence.', whyItIsThere: 'Restores all-distinct window invariant in O(1) without inner while loop.', ifDeletedError: 'Counts duplicate characters inside window.' },
        ],
      },
      {
        id: 'c-ch-22-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Counting Distinct Values via Hash Set (Zero Duplicates)',
        englishParagraphs: [
          'If a hash table uses an array without sizing headroom (`used_slots == CAP`), linear probing loops INFINITELY looking for an empty slot! Keep load factor `< 0.7` always.',
          'Here `insert_set` returns `1` only the first time a key enters the set.',
        ],
        banglaParagraphs: [
          'হ্যাশ সেট ব্যবহার করে মাত্র O(n) সময়ে ইউনিক সংখ্যার মোট সংখ্যা গণনা করা হয়েছে।',
          'সতর্কতা: টেবিল ১০০% ভরে গেলে লিনিয়ার প্রোবিং অসীম লুপে আটকে যায়—তাই `CAP` সবসময় উপাদানের দ্বিগুণ নেওয়া জরুরি!',
        ],
        memoryDiagram: `[100, 5, 100, 999999999, 5] -> unique inserts = 3`,
        code: `#include <stdint.h>
#include <stdio.h>

#define CAP 4096
static int used[CAP];
static long long keys[CAP];

int add_unique(long long k) {
    uint64_t h = ((uint64_t)k + 0x9e3779b97f4a7c15ULL) * 0xbf58476d1ce4e5b9ULL;
    size_t i = (size_t)((h ^ (h >> 29)) & (CAP - 1));
    while (used[i]) {
        if (keys[i] == k) return 0;
        i = (i + 1) & (CAP - 1);
    }
    used[i] = 1; keys[i] = k;
    return 1;
}

int main(void) {
    int n = 0, distinct = 0; long long x = 0;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) distinct += add_unique(x);
        printf("%d\\n", distinct);
    }
    return 0;
}`,
        stdin: '5\n100 5 100 999999999 5',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'if (keys[i] == k) return 0;', whatItMeans: 'Detects duplicate key cleanly and returns 0 new additions.', whyItIsThere: 'Maintains mathematical set uniqueness invariant.', ifDeletedError: 'Inserts duplicates and overcounts distinct items.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdint.h>', whatItMeans: 'Provides fixed-width unsigned uint64_t for bit mixing.', whyItIsThere: 'Unsigned 64-bit overflow wraps cleanly per C standard.', ifDeletedError: 'Compile error: unknown type uint64_t.' },
      { lineNumber: 'Line 4', codeSnippet: '#define CAP 1024', whatItMeans: 'Power-of-two bucket table capacity.', whyItIsThere: 'Allows fast bitwise & (CAP - 1) wrap instead of % modulo.', ifDeletedError: 'Compile error: CAP undeclared.' },
      { lineNumber: 'Line 8', codeSnippet: 'uint64_t mix64(uint64_t x) {', whatItMeans: 'SplitMix64 avalanche hash mixer.', whyItIsThere: 'Scatters sequential or multiple keys evenly across buckets.', ifDeletedError: 'Compile error: mix64 undeclared.' },
      { lineNumber: 'Line 15', codeSnippet: 'while (tbl[i].used && tbl[i].key != k) i = (i + 1) & (CAP - 1);', whatItMeans: 'Linear probing resolving collisions by stepping to next free slot.', whyItIsThere: 'Guarantees distinct keys never overwrite each other.', ifDeletedError: 'Colliding keys overwrite previous entries.' },
      { lineNumber: 'Line 22', codeSnippet: 'if (tbl[i].key == k) return tbl[i].val;', whatItMeans: 'Returns mapped value when probe finds matching key.', whyItIsThere: 'Completes O(1) expected-time lookup.', ifDeletedError: 'get() always falls through and returns -1.' },
      { lineNumber: 'Line 30', codeSnippet: 'printf("val=%d miss=%d\\n", get(1000000007LL), get(999));', whatItMeans: 'Verifies stored 10^9+7 lookup and missing-key fallback.', whyItIsThere: 'Confirms both hit and miss paths.', ifDeletedError: 'No stdout emitted.' },
    ],
    dryRunTable: [
      { step: 1, state: 'put(1000000007, 42)', memoryOrStack: 'h=mix64(1e9+7)&1023 -> idx', note: 'Bucket marked used=1' },
      { step: 2, state: 'get(1000000007)', memoryOrStack: 'probe hits same idx -> val=42', note: '1 memory check = O(1)' },
      { step: 3, state: 'get(999)', memoryOrStack: 'bucket used==0 -> miss=-1', note: 'Terminates immediately' },
      { step: 4, state: 'Print summary', memoryOrStack: 'stdout="val=42 miss=-1"', note: 'Clean O(1) dictionary' },
    ],
    harryBugTraps: [
      {
        title: 'Using Plain key % TABLE_SIZE (Vulnerable to Hash Collision Blowup)',
        brokenCode: `size_t h = key % 1024; // Multiples of 1024 ALL collide into slot 0 -> O(n^2)!`,
        fixedCode: `#include <stdint.h>\n#include <stdio.h>\nuint64_t h(uint64_t x) { x += 0x9e3779b97f4a7c15ULL; return (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL; }\nint main(void) { printf("%zu\\n", (size_t)(h(1024) & 1023)); return 0; }`,
        whyItBreaks: 'Adversarial inputs containing multiples of table size chain every insert into one massive cluster, causing TLE.',
      },
      {
        title: 'Inserting Into Full Hash Table Without Load-Factor Margin',
        brokenCode: `while (used[i]) i = (i + 1) % CAP; // Infinite loop if 100% full!`,
        fixedCode: `#include <stdio.h>\n// Allocate CAP >= 2 * max_elements so >= 50% empty slots always terminate probing!\nint main(void) { printf("OK\\n"); return 0; }`,
        whyItBreaks: 'If every bucket has used == 1 and key is absent, linear probing loops infinitely forever.',
      },
      {
        title: 'Allowing Pair-With-Self Inside Two-Sum Hash Lookup',
        brokenCode: `insert(x, i); if (find(target - x) != -1) // matches x itself when 2*x == target!`,
        fixedCode: `#include <stdio.h>\n// Always query find(target - x) BEFORE calling insert(x, i)!\nint main(void) { printf("Check before insert\\n"); return 0; }`,
        whyItBreaks: 'Inserting before querying pairs x with itself whenever target == 2 * x.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-22-q1',
        difficulty: 'Easy',
        title: '1. Duplicate Detector via Hash Set',
        prompt: 'Read n then n integers (up to 10^9); print "YES" if any duplicate exists else "NO".',
        banglaHint: 'হ্যাশ সেটে সংখ্যা ঢোকানোর সময় আগে থেকেই `used && key == x` পেলেই "YES" প্রিন্ট করো!',
        starterCode: `#include <stdint.h>\n#include <stdio.h>\n#define CAP 4096\nstatic int used[CAP]; static long long keys[CAP];\nint main(void) {\n    int n = 0, dup = 0; long long x = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) {\n            size_t idx = (size_t)(((uint64_t)x * 11400714819323198485ULL >> 32) & (CAP - 1));\n            while (used[idx]) { if (keys[idx] == x) { dup = 1; break; } idx = (idx + 1) & (CAP - 1); }\n            if (dup) break;\n            used[idx] = 1; keys[idx] = x;\n        }\n        printf("%s\\n", dup ? "YES" : "NO");\n    }\n    return 0;\n}`,
        sampleStdin: '4\n10 500000000 3 10',
        expectedOutput: 'YES',
      },
      {
        id: 'c-ch-22-q2',
        difficulty: 'Easy',
        title: '2. Longest Substring Without Repeating Chars',
        prompt: 'Read word s; print length of longest substring containing all distinct characters.',
        banglaHint: '`last[256]` অ্যারেতে প্রতিটি অক্ষরের সর্বশেষ ইনডেক্স রেখে `l` আপডেট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char s[2048]; int last[256];\n    for (int i = 0; i < 256; i++) last[i] = -1;\n    if (scanf("%2047s", s) == 1) {\n        int l = 0, best = 0;\n        for (int r = 0; s[r]; r++) {\n            unsigned char c = (unsigned char)s[r];\n            if (last[c] >= l) l = last[c] + 1;\n            last[c] = r;\n            if (r - l + 1 > best) best = r - l + 1;\n        }\n        printf("%d\\n", best);\n    }\n    return 0;\n}`,
        sampleStdin: 'pwwkew',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-22-q3',
        difficulty: 'Medium',
        title: '3. Two-Sum Unsorted Index Pair',
        prompt: 'Read n, target, then n ints; print 0-based i j summing to target or -1.',
        banglaHint: '`insert` করার ঠিক আগে `find(target - x)` চেক করো।',
        starterCode: `#include <stdint.h>\n#include <stdio.h>\n#define CAP 4096\nstatic int u[CAP], v[CAP]; static long long k[CAP];\nsize_t h(long long x) { return (size_t)(((uint64_t)x * 11400714819323198485ULL >> 32) & (CAP - 1)); }\nint main(void) {\n    int n = 0; long long t = 0, x = 0;\n    if (scanf("%d %lld", &n, &t) != 2) return 0;\n    for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) {\n        size_t j = h(t - x);\n        while (u[j]) { if (k[j] == t - x) { printf("%d %d\\n", v[j], i); return 0; } j = (j + 1) & (CAP - 1); }\n        size_t s = h(x); while (u[s] && k[s] != x) s = (s + 1) & (CAP - 1);\n        u[s] = 1; k[s] = x; v[s] = i;\n    }\n    printf("-1\\n");\n    return 0;\n}`,
        sampleStdin: '4 9\n2 7 11 15',
        expectedOutput: '0 1',
      },
      {
        id: 'c-ch-22-q4',
        difficulty: 'Medium',
        title: '4. Frequency Map Mode Finder (Large Keys)',
        prompt: 'Read n <= 1000 integers up to 10^9; print value with highest frequency.',
        banglaHint: 'হ্যাশ ম্যাপে প্রতিটি `key`-এর `cnt` বাড়াও এবং সর্বোচ্চ ফ্রিকোয়েন্সির কী সংরক্ষণ করো।',
        starterCode: `#include <stdint.h>\n#include <stdio.h>\n#define CAP 4096\nstatic int u[CAP], c[CAP]; static long long k[CAP];\nint main(void) {\n    int n = 0, best_c = 0; long long best_k = 0, x = 0;\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) {\n            size_t j = (size_t)(((uint64_t)x * 11400714819323198485ULL >> 32) & (CAP - 1));\n            while (u[j] && k[j] != x) j = (j + 1) & (CAP - 1);\n            u[j] = 1; k[j] = x; c[j]++;\n            if (c[j] > best_c) { best_c = c[j]; best_k = x; }\n        }\n        printf("%lld\\n", best_k);\n    }\n    return 0;\n}`,
        sampleStdin: '5\n1000000 5 1000000 9 1000000',
        expectedOutput: '1000000',
      },
      {
        id: 'c-ch-22-q5',
        difficulty: 'Hard',
        title: '5. Subarray Sum Equals K Counter (Prefix + Hash Map)',
        prompt: 'Read n, K, then n integers (including negatives); count subarrays summing to K in O(n)!',
        banglaHint: '`pref` আপডেট করে হ্যাশ ম্যাপে `pref - K` কতবার এসেছে তা যোগ করে তারপর `pref` ইনসার্ট করো!',
        starterCode: `#include <stdint.h>\n#include <stdio.h>\n#define CAP 4096\nstatic int u[CAP], cnt[CAP]; static long long k[CAP];\nsize_t slot(long long x) { return (size_t)((((uint64_t)x + 0x9e3779b97f4a7c15ULL) * 0xbf58476d1ce4e5b9ULL >> 32) & (CAP - 1)); }\nint getc_h(long long x) { size_t i=slot(x); while(u[i]){if(k[i]==x)return cnt[i]; i=(i+1)&(CAP-1);} return 0; }\nvoid add_h(long long x) { size_t i=slot(x); while(u[i]&&k[i]!=x)i=(i+1)&(CAP-1); u[i]=1; k[i]=x; cnt[i]++; }\nint main(void) {\n    int n = 0; long long K = 0, x = 0, pref = 0, ans = 0;\n    if (scanf("%d %lld", &n, &K) == 2) {\n        add_h(0);\n        for (int i = 0; i < n && scanf("%lld", &x) == 1; i++) { pref += x; ans += getc_h(pref - K); add_h(pref); }\n        printf("%lld\\n", ans);\n    }\n    return 0;\n}`,
        sampleStdin: '4 3\n1 2 3 -3',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'C23 Open-Addressing Hash Map (Two-Sum Engine)',
      description: 'Implements O(1) hash lookup with SplitMix64 hashing to solve Two-Sum in a single pass.',
      banglaGoal: 'বিশুদ্ধ C-তে SplitMix64 ও ওপেন-অ্যাড্রেসিং হ্যাশ ম্যাপ দিয়ে O(n) সময়ে Two-Sum সমাধান।',
      combinesChapters: 'Ch 1–22',
      starterCode: `#include <stdint.h>
#include <stdio.h>

#define CAP 4096
typedef struct { int used; long long key; int idx; } Entry;
static Entry map[CAP];

uint64_t h64(uint64_t x) { return ((x * 11400714819323198485ULL) >> 32); }

int find_idx(long long k) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used) { if (map[i].key == k) return map[i].idx; i = (i + 1) & (CAP - 1); }
    return -1;
}

void insert_idx(long long k, int idx) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used && map[i].key != k) i = (i + 1) & (CAP - 1);
    map[i].used = 1; map[i].key = k; map[i].idx = idx;
}

int main(void) {
    int n = 0; long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2) return 0;
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        int partner = find_idx(target - x);
        if (partner != -1) { printf("%d %d\\n", partner, i); return 0; }
        insert_idx(x, i);
    }
    printf("-1\\n");
    return 0;
}`,
      sampleStdin: '4 9\n2 7 11 15',
      expectedOutput: '0 1',
    },
    starterCode: `#include <stdint.h>
#include <stdio.h>

#define CAP 4096
typedef struct { int used; long long key; int idx; } Entry;
static Entry map[CAP];

uint64_t h64(uint64_t x) { return ((x * 11400714819323198485ULL) >> 32); }

int find_idx(long long k) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used) { if (map[i].key == k) return map[i].idx; i = (i + 1) & (CAP - 1); }
    return -1;
}

void insert_idx(long long k, int idx) {
    size_t i = (size_t)(h64((uint64_t)k) & (CAP - 1));
    while (map[i].used && map[i].key != k) i = (i + 1) & (CAP - 1);
    map[i].used = 1; map[i].key = k; map[i].idx = idx;
}

int main(void) {
    int n = 0; long long target = 0;
    if (scanf("%d %lld", &n, &target) != 2) return 0;
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        int partner = find_idx(target - x);
        if (partner != -1) { printf("%d %d\\n", partner, i); return 0; }
        insert_idx(x, i);
    }
    printf("-1\\n");
    return 0;
}`,
    sampleStdin: '4 9\n2 7 11 15',
    expectedSampleOutput: '0 1',
    testCases: [
      { id: 'c22-t1', input: '4 9\n2 7 11 15', expectedOutput: '0 1' },
      { id: 'c22-t2', input: '3 10\n1 2 3', expectedOutput: '-1', isHidden: true },
    ],
  },

  23: {
    chapterNumber: 23,
    title: 'C Chapter 23 (C23): Stacks, Queues, Trees & Graph Traversal (BFS/DFS)',
    banglaTitle: 'C অধ্যায় ২৩ (C23): স্ট্যাক, কিউ, ট্রি ও গ্রাফ ট্রাভার্সাল (BFS/DFS)',
    subtitle: 'Array-backed monotonic stacks, circular ring-buffer BFS queues, and recursive adjacency-list DFS.',
    zeroIntuition: {
      plainEnglishStory:
        'Stacks (LIFO: Last-In First-Out) power bracket matching, expression parsing, and Next Greater Element problems in O(n), while Queues (FIFO: First-In First-Out) power level-order tree walks and shortest-path Breadth-First Search (BFS)!\n\nIn high-performance C, you rarely need pointer-heavy linked lists with hundreds of slow `malloc()` calls for stacks or queues: a fixed array `int st[MAX]` with `top` or a circular ring `q[MAX]` with `head` and `tail` runs 5x faster with zero memory fragmentation.',
      asciiFlowchart: `  Stack (LIFO): push('[') -> push('(') -> match ')' -> pop -> top='['
  Queue (FIFO): BFS from node 0:
    q = [0] (dist[0]=0) -> pop 0, push neighbors [1,2] (dist=1) -> shortest path!`,
      pseudocode: [
        '1. STACK: push st[top++] = val; pop st[--top]; always check top > 0 before peeking',
        '2. QUEUE BFS: push q[tail++] = start, mark visited[start]=1, pop q[head++] while head < tail',
        '3. DFS TREE/GRAPH: mark visited[u]=1, recurse on unvisited neighbors v',
        '4. GUARD empty stack/queue conditions BEFORE popping to avoid negative index crashes',
      ],
      banglaZeroToHero: {
        analogyTitle: 'থালা সাজানো (Stack), টিকিটের লাইন (Queue) ও ঢেউয়ের মতো খোঁজ (BFS/DFS)',
        explanation:
          'স্ট্যাক হলো বিয়ে বাড়ির প্লেটের স্তূপ (LIFO — শেষে রাখা প্লেট সবার আগে তোলা হয়)। প্রোগ্রামিংয়ে ফাংশন কল, আনডু বাটন এবং `{[()]}` বন্ধনী মিলছে কি না তা যাচাই করতে স্ট্যাক অদ্বিতীয়! অন্যদিকে কিউ হলো রেল স্টেশনের টিকিট কাউন্টারের লাইন (FIFO — যে আগে এসেছে সে আগে সার্ভিস পায়)। ট্রি বা গ্রাফে সবচেয়ে কাছের রাস্তা (Shortest Path in unweighted graph) বের করতে BFS (Breadth-First Search) কিউ ব্যবহার করে ঢেউয়ের মতো স্তর-অনুযায়ী খোঁজ চালায়। আর গোলকধাঁধার এক পথ ধরে শেষ মাথা পর্যন্ত গিয়ে ফিরে আসাই হলো DFS (Depth-First Search), যা রিকার্সন বা স্ট্যাক দিয়ে লেখা হয়। C ভাষায় প্রতিটি নোডের জন্য আলাদা `malloc` লিংকড লিস্ট না বানিয়ে একটি অ্যারে আর `top` অথবা `head`/`tail` ইনডেক্স দিয়ে স্ট্যাক ও কিউ বানালে কোড অনেক ছোট ও ৫ গুণ বেশি দ্রুত চলে! তবে স্ট্যাক বা কিউ থেকে `pop` করার আগে অবশ্যই `top > 0` বা `head < tail` চেক করতে হবে, নইলে খালি অ্যারেতে `st[-1]` পড়ে ক্র্যাশ করবে। এছাড়া গ্রাফে ঘূর্ণায়মান চক্র (Cycle) থাকলে `visited[u]` অ্যারে ছাড়া BFS/DFS অসীম লুপে আটকে যাবে!',
        everydayExample:
          'পুকুরে ঢিল ফেললে যেমন গোল ঢেউ কেন্দ্র থেকে ১ ধাপ, ২ ধাপ করে চারদিকে ছড়ায়—BFS ঠিক সেভাবেই গ্রাফের সব নোডের ন্যূনতম দূরত্ব মাপে!',
        keyTakeaways: [
          'স্ট্যাক থেকে `pop`/`top` পড়ার আগে সর্বদা `top > 0` যাচাই করো।',
          'BFS আনওয়েটেড গ্রাফে O(V + E) সময়ে নিশ্চিতভাবে শর্টেস্ট পাথ দেয়; এনকিউ করার সময়ই `visited[v] = 1` মার্ক করবে!',
          'C-তে কনটেস্ট গ্রাফ ও স্ট্যাক-কিউ লিংকড লিস্টের চেয়ে অ্যারে দিয়ে অনেক দ্রুত ও নিরাপদে লেখা যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-23-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Balanced Brackets Validator Using Array Stack',
        englishParagraphs: [
          'Every opening bracket `(`, `[`, `{` pushes onto `st[top++]`. Every closing bracket checks `top > 0` and verifies the top of stack matches its exact opening mate before popping `top--`.',
          'At the end, the string is valid iff no mismatch occurred AND `top == 0` (zero unclosed openers left).',
        ],
        banglaParagraphs: [
          'সব ওপেনিং ব্র্যাকেট স্ট্যাকে `push` করে ক্লোজিং ব্র্যাকেট এলেই স্ট্যাকের শীর্ষ উপাদানের সাথে মিলিয়ে `pop` করা হয়েছে।',
          'শেষে `top == 0` হলে তবেই ব্র্যাকেটগুলো সঠিকভাবে ব্যালান্সড!',
        ],
        memoryDiagram: `"{[()]}" -> push { [ ( -> ')' matches '(' -> ']' matches '[' -> '}' matches '{' -> top=0 (YES)`,
        code: `#include <stdio.h>

int match(char o, char c) {
    return (o == '(' && c == ')') || (o == '[' && c == ']') || (o == '{' && c == '}');
}

int main(void) {
    char s[2048], st[2048];
    if (scanf("%2047s", s) == 1) {
        int top = 0, ok = 1;
        for (int i = 0; s[i] && ok; i++) {
            char c = s[i];
            if (c == '(' || c == '[' || c == '{') st[top++] = c;
            else if (top == 0 || !match(st[--top], c)) ok = 0;
        }
        printf("%s\\n", (ok && top == 0) ? "VALID" : "INVALID");
    }
    return 0;
}`,
        stdin: '{[()]}',
        expectedOutput: 'VALID',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'else if (top == 0 || !match(st[--top], c)) ok = 0;', whatItMeans: 'Verifies stack is non-empty BEFORE decrementing top and popping.', whyItIsThere: 'Short-circuit prevents out-of-bounds st[-1] access on extra closers.', ifDeletedError: 'Accepts unmatched closing brackets like ")]".' },
        ],
      },
      {
        id: 'c-ch-23-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Shortest-Path BFS Distance Using Array Queue',
        englishParagraphs: [
          'Given an unweighted undirected graph of `n` nodes (`0..n-1`) and `m` edges, BFS starts at node `0` with `dist[0] = 0` and all other `dist[i] = -1`.',
          'Setting `dist[v] = dist[u] + 1` at the moment `v` is ENQUEUED prevents pushing the same vertex multiple times!',
        ],
        banglaParagraphs: [
          '`0` নম্বর নোড থেকে বাকি নোডগুলোর শর্টেস্ট দূরত্ব বের করতে কিউ (`head`/`tail`) ভিত্তিক BFS চালানো হয়েছে।',
          'কিউতে ঢোকানোর সাথে সাথেই `dist[v]` আপডেট করে দেওয়া হয় যাতে একই নোড দুবার না ঢোকে!',
        ],
        memoryDiagram: `0->1, 0->2, 1->3 => dist=[0, 1, 1, 2]`,
        code: `#include <stdio.h>

static int adj[100][100], deg[100], dist[100], q[1000];

int main(void) {
    int n = 0, m = 0;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    for (int i = 0; i < n; i++) dist[i] = -1;
    for (int i = 0, u, v; i < m && scanf("%d %d", &u, &v) == 2; i++) {
        adj[u][deg[u]++] = v; adj[v][deg[v]++] = u;
    }
    int head = 0, tail = 0;
    dist[0] = 0; q[tail++] = 0;
    while (head < tail) {
        int u = q[head++];
        for (int i = 0; i < deg[u]; i++) {
            int v = adj[u][i];
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q[tail++] = v; }
        }
    }
    for (int i = 0; i < n; i++) printf("%d%s", dist[i], i + 1 == n ? "\\n" : " ");
    return 0;
}`,
        stdin: '4 3\n0 1\n0 2\n1 3',
        expectedOutput: '0 1 1 2',
        lineByLine: [
          { lineNumber: 'Line 18', codeSnippet: 'if (dist[v] == -1) { dist[v] = dist[u] + 1; q[tail++] = v; }', whatItMeans: 'Marks distance on enqueue so v never enters queue twice.', whyItIsThere: 'Keeps BFS strictly O(V + E).', ifDeletedError: 'Infinite loop on cycles!' },
        ],
      },
      {
        id: 'c-ch-23-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Binary Search Tree (BST) Insert & In-Order Sorted Traversal',
        englishParagraphs: [
          'A Binary Search Tree stores left children `< node->val` and right children `>= node->val`. An in-order DFS (`left -> root -> right`) visits every key in sorted ascending order!',
          'Be sure to write a post-order `free_tree(root)` helper so every heap node is reclaimed cleanly.',
        ],
        banglaParagraphs: [
          'বাইনারি সার্চ ট্রি-তে ছোট মান বামে ও বড় মান ডানে থাকে, ফলে `In-Order DFS` চালালে সব সংখ্যা ছোট থেকে বড় সাজানো অবস্থায় প্রিন্ট হয়।',
          'কাজ শেষে ট্রি-র সব হিপ নোড `free_tree` দিয়ে মুক্ত করা হয়েছে।',
        ],
        memoryDiagram: `insert [5, 2, 8, 1] -> in-order DFS: 1 2 5 8`,
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int v; struct Node *l, *r; } Node;

Node* ins(Node *t, int x) {
    if (!t) { Node *n = (Node*)calloc(1, sizeof(Node)); n->v = x; return n; }
    if (x < t->v) t->l = ins(t->l, x); else t->r = ins(t->r, x);
    return t;
}

void inorder(const Node *t, int *first) {
    if (!t) return;
    inorder(t->l, first);
    printf("%s%d", (*first)++ ? " " : "", t->v);
    inorder(t->r, first);
}

void free_tree(Node *t) { if (t) { free_tree(t->l); free_tree(t->r); free(t); } }

int main(void) {
    int n = 0, x = 0, first = 0; Node *root = nullptr;
    if (scanf("%d", &n) == 1) {
        for (int i = 0; i < n && scanf("%d", &x) == 1; i++) root = ins(root, x);
        inorder(root, &first); printf("\\n");
        free_tree(root);
    }
    return 0;
}`,
        stdin: '4\n5 2 8 1',
        expectedOutput: '1 2 5 8',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'inorder(t->l, first); printf(...); inorder(t->r, first);', whatItMeans: 'Visits left subtree, current node, then right subtree.', whyItIsThere: 'Produces sorted ascending sequence from BST.', ifDeletedError: 'Tree values are never printed.' },
        ],
      },
      {
        id: 'c-ch-23-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Connected Components Counter via Recursive DFS',
        englishParagraphs: [
          'Counting connected islands/clusters in a graph runs a `visited[u]` DFS from every unvisited node `0..n-1`, incrementing `components++` each time a fresh DFS launches.',
          'Marking `vis[u] = 1` at the start of `dfs(u)` prevents revisiting nodes on cycles.',
        ],
        banglaParagraphs: [
          'একটি গ্রাফে মোট কয়টি আলাদা সংযুক্ত অংশ (Connected Components) আছে তা প্রতিটি অ-পরিদর্শিত নোড থেকে DFS চালিয়ে `O(V + E)` সময়ে বের করা যায়।',
          '`vis[u] = 1` মার্ক না করলে সাইকেলে পড়ে প্রোগ্রাম ক্র্যাশ করবে!',
        ],
        memoryDiagram: `0-1, 2-3, 4 isolated -> 3 connected components`,
        code: `#include <stdio.h>

static int adj[100][100], deg[100], vis[100];

void dfs(int u) {
    vis[u] = 1;
    for (int i = 0; i < deg[u]; i++) if (!vis[adj[u][i]]) dfs(adj[u][i]);
}

int main(void) {
    int n = 0, m = 0;
    if (scanf("%d %d", &n, &m) == 2) {
        for (int i = 0, u, v; i < m && scanf("%d %d", &u, &v) == 2; i++) {
            adj[u][deg[u]++] = v; adj[v][deg[v]++] = u;
        }
        int comps = 0;
        for (int i = 0; i < n; i++) if (!vis[i]) { comps++; dfs(i); }
        printf("%d\\n", comps);
    }
    return 0;
}`,
        stdin: '5 2\n0 1\n2 3',
        expectedOutput: '3',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'for (int i = 0; i < n; i++) if (!vis[i]) { comps++; dfs(i); }', whatItMeans: 'Starts a new DFS for each unvisited vertex.', whyItIsThere: 'Covers disconnected subgraphs cleanly.', ifDeletedError: 'Only explores component containing vertex 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides scanf and printf declarations.', whyItIsThere: 'Reads bracket string and prints validation status.', ifDeletedError: 'Compile error: implicit stdio functions.' },
      { lineNumber: 'Line 3', codeSnippet: 'int match(char o, char c) {', whatItMeans: 'Helper verifying opening and closing bracket pairs match.', whyItIsThere: 'Separates bracket rules cleanly from stack mechanics.', ifDeletedError: 'Compile error: match undefined.' },
      { lineNumber: 'Line 10', codeSnippet: 'int top = 0, ok = 1;', whatItMeans: 'Stack top cursor and validity boolean.', whyItIsThere: 'Tracks active stack height in O(1).', ifDeletedError: 'Compile error: top undeclared.' },
      { lineNumber: 'Line 13', codeSnippet: 'if (c == \'(\' || c == \'[\' || c == \'{\') st[top++] = c;', whatItMeans: 'Pushes opening bracket onto stack and increments top.', whyItIsThere: 'Saves expectation until matching closer arrives.', ifDeletedError: 'Openers ignored; stack stays empty.' },
      { lineNumber: 'Line 14', codeSnippet: 'else if (top == 0 || !match(st[--top], c)) ok = 0;', whatItMeans: 'Guards against empty stack before popping and verifying match.', whyItIsThere: 'Prevents negative index UB and rejects mismatched pairs.', ifDeletedError: 'Segfaults on unmatched closer or mislabels invalid strings.' },
      { lineNumber: 'Line 16', codeSnippet: 'printf("%s\\n", (ok && top == 0) ? "VALID" : "INVALID");', whatItMeans: 'Requires BOTH zero mismatches AND empty stack at end.', whyItIsThere: 'Unclosed openers like "((" have ok=1 yet top=2!', ifDeletedError: 'Falsely prints VALID for "((". ' },
    ],
    dryRunTable: [
      { step: 1, state: 'Read "{[("', memoryOrStack: 'st=["{","[","("], top=3', note: 'Openers pushed LIFO' },
      { step: 2, state: 'Read ")"', memoryOrStack: 'pop "(", match YES -> top=2', note: 'Innermost closed first' },
      { step: 3, state: 'Read "]}"', memoryOrStack: 'pop "[" match, pop "{" match', note: 'top drops to 0' },
      { step: 4, state: 'End check (ok && top==0)', memoryOrStack: 'stdout="VALID"', note: 'Balanced expression verified' },
    ],
    harryBugTraps: [
      {
        title: 'Popping Stack When top == 0 (Out-of-Bounds Negative Index)',
        brokenCode: `char top_c = st[--top]; // if top==0, reads st[-1] -> crash!`,
        fixedCode: `#include <stdio.h>\nint main(void) { char st[8]; int top = 0; if (top > 0) { printf("%c\\n", st[--top]); } else printf("EMPTY\\n"); return 0; }`,
        whyItBreaks: 'Decrementing top when empty reads before array bounds and corrupts adjacent stack variables.',
      },
      {
        title: 'Marking BFS visited[] on Pop Instead of on Enqueue',
        brokenCode: `u = q[head++]; vis[u] = 1; // pushes duplicate neighbors O(V^2) times!`,
        fixedCode: `#include <stdio.h>\n// Mark vis[v] = 1 at the exact line you append q[tail++] = v!\nint main(void) { printf("Mark on enqueue\\n"); return 0; }`,
        whyItBreaks: 'Multiple vertices adjacent to v enqueue v before v is popped, blowing up queue buffer size and causing TLE.',
      },
      {
        title: 'Forgetting && top == 0 Check After Valid-Brackets Loop',
        brokenCode: `printf("%s", ok ? "VALID" : "INVALID"); // returns VALID for "((("!`,
        fixedCode: `#include <stdio.h>\nint main(void) { int ok = 1, top = 2; printf("%s\\n", (ok && top == 0) ? "VALID" : "INVALID"); return 0; }`,
        whyItBreaks: 'Strings with unclosed opening brackets never trigger a mismatch inside the loop but leave top > 0.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-23-q1',
        difficulty: 'Easy',
        title: '1. Reverse Sequence Using Stack',
        prompt: 'Read n then n integers; push onto stack and pop to print reversed order.',
        banglaHint: 'সব সংখ্যা `st[top++] = x` করে শেষে `while (top > 0) printf("%lld", st[--top]);` চালাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n=0, top=0; long long st[1000], x=0;\n    if (scanf("%d", &n)==1) {\n        for(int i=0;i<n && scanf("%lld",&x)==1;i++) st[top++]=x;\n        while(top>0) printf("%lld%s", st[--top], top==0?"\\n":" ");\n    }\n    return 0;\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'c-ch-23-q2',
        difficulty: 'Easy',
        title: '2. Next Greater Element on Right (O(n) Monotonic Stack)',
        prompt: 'Read n then n ints; for each element print the first strictly greater element to its right, or -1.',
        banglaHint: 'ডান থেকে বামে বা ইনডেক্স স্ট্যাকে `a[st[top-1]] < a[i]` থাকা পর্যন্ত পপ করে রেজাল্ট বসাও।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n=0, top=0, st[1000]; long long a[1000], ans[1000];\n    if (scanf("%d", &n)==1) {\n        for(int i=0;i<n;i++){ scanf("%lld",&a[i]); ans[i]=-1; }\n        for(int i=0;i<n;i++){ while(top>0 && a[st[top-1]]<a[i]) ans[st[--top]]=a[i]; st[top++]=i; }\n        for(int i=0;i<n;i++) printf("%lld%s", ans[i], i+1==n?"\\n":" ");\n    }\n    return 0;\n}`,
        sampleStdin: '4\n4 5 2 25',
        expectedOutput: '5 25 25 -1',
      },
      {
        id: 'c-ch-23-q3',
        difficulty: 'Medium',
        title: '3. Shortest Distance Between Nodes S and T (BFS)',
        prompt: 'Read n, m, start S, target T, then m edges; print shortest edge distance or -1.',
        banglaHint: '`S` থেকে BFS চালিয়ে `dist[T]` প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nstatic int adj[100][100], deg[100], dist[100], q[500];\nint main(void) {\n    int n=0,m=0,S=0,T=0; if (scanf("%d %d %d %d",&n,&m,&S,&T)!=4) return 0;\n    for(int i=0;i<n;i++) dist[i]=-1;\n    for(int i=0,u,v;i<m && scanf("%d %d",&u,&v)==2;i++){ adj[u][deg[u]++]=v; adj[v][deg[v]++]=u; }\n    int h=0,t=0; dist[S]=0; q[t++]=S;\n    while(h<t){ int u=q[h++]; for(int i=0;i<deg[u];i++){ int v=adj[u][i]; if(dist[v]==-1){dist[v]=dist[u]+1;q[t++]=v;} } }\n    printf("%d\\n", dist[T]);\n    return 0;\n}`,
        sampleStdin: '5 4 0 4\n0 1\n1 2\n2 3\n3 4',
        expectedOutput: '4',
      },
      {
        id: 'c-ch-23-q4',
        difficulty: 'Medium',
        title: '4. Postfix (RPN) Expression Evaluator via Stack',
        prompt: 'Read space-separated single-digit integers and +/* operators until EOF; evaluate using stack.',
        banglaHint: 'সংখ্যা পেলে স্ট্যাকে পুশ করো; অপারেটর পেলে শীর্ষ দুটি মান পপ করে হিসাব করে পুশ করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    long long st[256]; int top=0; char tok[32];\n    while (scanf("%31s", tok)==1) {\n        if (tok[0]=='+' || tok[0]=='-' || tok[0]=='*') {\n            long long b=st[--top], a=st[--top];\n            st[top++] = tok[0]=='+' ? a+b : (tok[0]=='-' ? a-b : a*b);\n        } else {\n            long long v=0; sscanf(tok, "%lld", &v); st[top++]=v;\n        }\n    }\n    if (top>0) printf("%lld\\n", st[top-1]);\n    return 0;\n}`,
        sampleStdin: '2 3 + 4 *',
        expectedOutput: '20',
      },
      {
        id: 'c-ch-23-q5',
        difficulty: 'Hard',
        title: '5. Tree Height & Leaf Count via DFS',
        prompt: 'Read n nodes (0..n-1) rooted at 0 with n-1 edges; print tree height (edges on longest root-leaf path).',
        banglaHint: '`dfs(u, parent)` চালিয়ে সব সন্তানের `1 + height(child)`-এর সর্বোচ্চ মান বের করো।',
        starterCode: `#include <stdio.h>\nstatic int adj[100][100], deg[100];\nint dfs_h(int u, int p) {\n    int best = 0;\n    for(int i=0;i<deg[u];i++) if(adj[u][i]!=p){ int c=1+dfs_h(adj[u][i],u); if(c>best)best=c; }\n    return best;\n}\nint main(void) {\n    int n=0; if (scanf("%d",&n)!=1) return 0;\n    for(int i=0,u,v;i<n-1 && scanf("%d %d",&u,&v)==2;i++){ adj[u][deg[u]++]=v; adj[v][deg[v]++]=u; }\n    printf("%d\\n", dfs_h(0, -1));\n    return 0;\n}`,
        sampleStdin: '5\n0 1\n0 2\n1 3\n3 4',
        expectedOutput: '3',
      },
    ],
    miniBuild: {
      title: 'Array Stack & Shortest-Path BFS Engine',
      description: 'Validates balanced brackets via stack and solves shortest graph distance cleanly with BFS.',
      banglaGoal: 'অ্যারে-ভিত্তিক স্ট্যাক ও কিউ ব্যবহার করে ব্র্যাকেট যাচাই ও BFS শর্টেস্ট পাথ চালানো।',
      combinesChapters: 'Ch 1–23',
      starterCode: `#include <stdio.h>

static int adj[100][100], deg[100], dist[100], q[1000];

int main(void) {
    int n = 0, m = 0;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    for (int i = 0; i < n; i++) dist[i] = -1;
    for (int i = 0, u, v; i < m && scanf("%d %d", &u, &v) == 2; i++) {
        adj[u][deg[u]++] = v; adj[v][deg[v]++] = u;
    }
    int head = 0, tail = 0;
    dist[0] = 0; q[tail++] = 0;
    while (head < tail) {
        int u = q[head++];
        for (int i = 0; i < deg[u]; i++) {
            int v = adj[u][i];
            if (dist[v] == -1) { dist[v] = dist[u] + 1; q[tail++] = v; }
        }
    }
    for (int i = 0; i < n; i++) printf("%d%s", dist[i], i + 1 == n ? "\\n" : " ");
    return 0;
}`,
      sampleStdin: '4 3\n0 1\n0 2\n1 3',
      expectedOutput: '0 1 1 2',
    },
    starterCode: `#include <stdio.h>

int match(char o, char c) {
    return (o == '(' && c == ')') || (o == '[' && c == ']') || (o == '{' && c == '}');
}

int main(void) {
    char s[2048], st[2048];
    if (scanf("%2047s", s) == 1) {
        int top = 0, ok = 1;
        for (int i = 0; s[i] && ok; i++) {
            char c = s[i];
            if (c == '(' || c == '[' || c == '{') st[top++] = c;
            else if (top == 0 || !match(st[--top], c)) ok = 0;
        }
        printf("%s\\n", (ok && top == 0) ? "VALID" : "INVALID");
    }
    return 0;
}`,
    sampleStdin: '{[()]}',
    expectedSampleOutput: 'VALID',
    testCases: [
      { id: 'c23-t1', input: '{[()]}', expectedOutput: 'VALID' },
      { id: 'c23-t2', input: '([)]', expectedOutput: 'INVALID', isHidden: true },
    ],
  },

  24: {
    chapterNumber: 24,
    title: 'C Chapter 24 (C23): File I/O, Error Handling, Concurrency & Modular Code',
    banglaTitle: 'C অধ্যায় ২৪ (C23): ফাইল I/O, এরর হ্যান্ডলিং, কনকারেন্সি ও মডুলার কোড',
    subtitle: 'fopen/fclose RAII cleanup, errno & perror diagnostics, atomic/thread safety basics, and multi-file header guards.',
    zeroIntuition: {
      plainEnglishStory:
        'Real systems programs cannot ignore failures: files fail to open, parsers meet corrupt inputs, and concurrent threads race over shared counters. In C23, resilient programs inspect return values immediately (`FILE *fp = fopen(...)`), report structured diagnostics via `errno` / `strerror`, and funnel cleanup through a single exit path (`goto cleanup` or helper wrappers) so handles are NEVER leaked.\n\nWhen scaling across header (`.h`) and implementation (`.c`) modules, `#pragma once` or `#ifndef HEADER_H` guards stop duplicate symbol errors, while C23 `<stdatomic.h>` keeps shared counters race-free.',
      asciiFlowchart: `  fopen("data.txt", "r")
     |-- returns NULL --> check errno / fallback to stdin / safe error return
     +-- returns valid fp --> parse lines --> fclose(fp) BEFORE exit!`,
      pseudocode: [
        '1. CHECK every OS resource call (fopen, malloc) for nullptr immediately',
        '2. SEPARATE public declarations (.h with include guard) from private static helpers (.c)',
        '3. ROUTE multi-step resource cleanup through deterministic fclose/free paths',
        '4. USE structured error enums + <errno.h> / atomic ops for concurrent safety',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সুরক্ষিত ফাইল লকার ও মডিউল-ভিত্তিক কারখানা (File I/O & Modular C)',
        explanation:
          'কনসোল থেকে ইনপুট নেওয়া ছাড়াও বাস্তব সফটওয়্যার হার্ডডিস্কের ফাইল পড়ে ও লেখে (`FILE *fp = fopen(...)`)। তবে ফাইল না থাকলে বা অনুমতি না থাকলে `fopen` সরাসরি `nullptr` ফিরিয়ে দেয়! তাই প্রতিটি ফাইল খোলার সাথে সাথে `if (!fp)` চেক না করলে `fprintf`/`fgets` চালালেই প্রোগ্রাম ক্র্যাশ করবে, এবং কাজ শেষে অবশ্যই `fclose(fp)` দিয়ে ফাইল বন্ধ করতে হবে। সিস্টেমে কী কারণে ত্রুটি হলো তা জানার জন্য C স্ট্যান্ডার্ড লাইব্রেরিতে `<errno.h>` এবং `strerror(errno)` রয়েছে। এছাড়াও বড় প্রজেক্টে হাজার হাজার লাইন এক ফাইলে না রেখে হেডার (`.h`) ও সোর্স (`.c`) ফাইলে ভাগ করা হয়—হেডার ফাইলে অবশ্যই `#ifndef ... #define ... #endif` (Include Guard) দিতে হয় যাতে দুবার ইনক্লুড হলেও কম্পাইলার এরর না দেয়! আর ফাইল-প্রাইভেট হেল্পার ফাংশনের সামনে `static` লিখলে তা অন্য ফাইলের নামের সাথে সংঘর্ষ ঘটায় না। সমান্তরাল থ্রেড (`<threads.h>`) একসাথে একই ভ্যারিয়েবল বদলালে ডেটা রেস ঘটে—যা থামাতে `<stdatomic.h>`-এর `atomic_fetch_add` ব্যবহার হয়।',
        everydayExample:
          'ব্যাংকের ভল্টের দরজা খোলা (`fopen`) সফল হলো কি না দেখে ভেতরে কাজ করে চাবি দিয়ে তালা বন্ধ (`fclose`) করে বের হওয়া—যাতে দরজা খোলা না থাকে!',
        keyTakeaways: [
          '`fopen` ব্যর্থ হলে `nullptr` দেয়; ব্যবহার করার আগে `if (!fp)` যাচাই করা বাধ্যতামূলক।',
          'প্রতিটি সফল `fopen`-এর জন্য ঠিক একটি `fclose` নিশ্চিত করো (ফাইল ডেসক্রিপ্টর লিক এড়াতে)।',
          'হেডার ফাইলে Include Guard (`#ifndef`) এবং প্রাইভেট ফাংশনে `static` ব্যবহার করে মডুলার কোড সাজাও।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-24-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Structured Result Codes & Deterministic Error Handling',
        englishParagraphs: [
          'Because C has no `try/catch` exceptions, functions return structured `Status` enum codes (`OK`, `ERR_DIV_ZERO`, `ERR_RANGE`) and write outputs through validated out-pointers.',
          'Checking status codes at every call boundary makes failure paths explicit and auditable.',
        ],
        banglaParagraphs: [
          'C ভাষায় `try/catch` নেই বলে `enum Status` রিটার্ন করে এবং আউট-পয়েন্টারে মান বসিয়ে এরর হ্যান্ডলিং করা হয়।',
          'এতে ভুল ইনপুট বা শূন্য দিয়ে ভাগের সময় প্রোগ্রাম ক্র্যাশ না করে নিরাপদ এরর কোড ফেরত দেয়।',
        ],
        memoryDiagram: `safe_div(10, 0, &out) -> returns ERR_ZERO (no SIGFPE crash!)`,
        code: `#include <stdio.h>

typedef enum { OK = 0, ERR_DIV_ZERO = 1 } Status;

Status safe_div(long long a, long long b, long long *out) {
    if (b == 0 || !out) return ERR_DIV_ZERO;
    *out = a / b;
    return OK;
}

int main(void) {
    long long res = 0;
    printf("10/2->%s(%lld) ", safe_div(10, 2, &res) == OK ? "OK" : "ERR", res);
    printf("10/0->%s\\n", safe_div(10, 0, &res) == OK ? "OK" : "ERR");
    return 0;
}`,
        stdin: '',
        expectedOutput: '10/2->OK(5) 10/0->ERR',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'Status safe_div(long long a, long long b, long long *out) {', whatItMeans: 'Separates success/error status from computed numeric output.', whyItIsThere: 'Allows 0 or negative numbers to be valid quotients without ambiguity.', ifDeletedError: 'Compile error: safe_div undeclared.' },
        ],
      },
      {
        id: 'c-ch-24-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Stream Parsing With fmemopen / In-Memory File Streams & Error Reporting',
        englishParagraphs: [
          'C POSIX/stdio lets you treat streams (`stdin` or `FILE*`) uniformly via `fgets` + `sscanf` instead of brittle raw `scanf`, preventing leftover tokens from breaking subsequent lines.',
          'When `sscanf(line, "%d %d", &a, &b) != 2`, emit an explicit parse error without crashing!',
        ],
        banglaParagraphs: [
          'বাস্তব প্রোগ্রামে `fgets` দিয়ে পুরো লাইন পড়ে তারপর `sscanf` দিয়ে পার্স করলে লাইনের বাড়তি আবর্জনা পরের লাইন নষ্ট করে না এবং প্রতিটি লাইনের ত্রুটি আলাদাভাবে ধরা যায়!',
          'ফাইল বা `stdin` উভয় স্ট্রিমেই একইভাবে `fgets` কাজ করে।',
        ],
        memoryDiagram: `stdin line -> fgets(buf) -> sscanf==2 ? "SUM=..." : "ERR_PARSE"`,
        code: `#include <stdio.h>

int main(void) {
    char line[128];
    while (fgets(line, sizeof(line), stdin)) {
        long long a = 0, b = 0;
        if (sscanf(line, "%lld %lld", &a, &b) == 2) printf("SUM=%lld\\n", a + b);
        else printf("SKIP_INVALID\\n");
    }
    return 0;
}`,
        stdin: '4 6\nbad_line\n10 5',
        expectedOutput: 'SUM=10\nSKIP_INVALID\nSUM=15',
        lineByLine: [
          { lineNumber: 'Line 5', codeSnippet: 'while (fgets(line, sizeof(line), stdin)) {', whatItMeans: 'Reads one full line safely bounded by sizeof(line).', whyItIsThere: 'Isolates malformed lines cleanly without jamming stream cursor.', ifDeletedError: 'Fails to consume lines reliably.' },
        ],
      },
      {
        id: 'c-ch-24-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Single-Exit Resource Cleanup Pattern (Zero Leaks on Failure)',
        englishParagraphs: [
          'When a function acquires multiple resources (heap buffer + file/parser state), scattered `return 1;` lines easily leak earlier allocations. Using one `cleanup:` label guarantees every acquired resource is released cleanly.',
          'Look how `buf = nullptr` before allocations guarantees `free(nullptr)` is safe even on early errors!',
        ],
        banglaParagraphs: [
          'একাধিক মেমোরি বা ফাইল একসাথে খুললে মাঝপথে এরর এলে আগের রিসোর্স লিক হওয়া ঠেকাতে `goto cleanup;` প্যাটার্ন হলো লিনাক্স কার্নেল ও প্রোডাকশন C কোডের সেরা রীতি।',
          'এতে সব ফেরার পথ এক জায়গায় এসে নিরাপদে `free` হয়ে বের হয়।',
        ],
        memoryDiagram: `alloc buf -> validate input -> (fail? goto cleanup) -> free(buf) once`,
        code: `#include <stdio.h>
#include <stdlib.h>

int process_batch(int n) {
    int rc = 1;
    long long *buf = nullptr;
    if (n <= 0) goto cleanup;
    buf = (long long *)calloc((size_t)n, sizeof(*buf));
    if (!buf) goto cleanup;
    long long sum = 0;
    for (int i = 0; i < n && scanf("%lld", &buf[i]) == 1; i++) sum += buf[i];
    printf("BATCH_OK=%lld\\n", sum);
    rc = 0;
cleanup:
    free(buf);
    return rc;
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && process_batch(n) != 0) printf("BATCH_ERR\\n");
    return 0;
}`,
        stdin: '3\n10 20 30',
        expectedOutput: 'BATCH_OK=60',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'cleanup: free(buf); return rc;', whatItMeans: 'Centralized teardown releasing heap buffer on both success and failure.', whyItIsThere: 'Prevents resource leaks across error branches.', ifDeletedError: 'Compile error: label cleanup missing.' },
        ],
      },
      {
        id: 'c-ch-24-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'C23 <stdatomic.h> Race-Free Shared Counter & Module Visibility',
        englishParagraphs: [
          'Regular `counter++` compiles into Load → Add → Store; two concurrent threads running it simultaneously drop updates! C11/C23 `<stdatomic.h>` `atomic_fetch_add(&cnt, 1)` executes an indivisible CPU hardware instruction.',
          'Marking internal helper functions `static` limits symbol linkage to the current `.c` module so large multi-file binaries never collide.',
        ],
        banglaParagraphs: [
          'একাধিক থ্রেড একসাথে সাধারণ `counter++` চালালে আপডেট হারিয়ে যায় (Data Race)। এর সমাধান হলো `<stdatomic.h>`-এর `atomic_fetch_add` যা একক অবিভাজ্য সিপিইউ নির্দেশে মান বাড়ায়।',
          'পাশাপাশি মডিউলের অভ্যন্তরীণ ফাংশনের সামনে `static` বসালে অন্য ফাইলের সাথে নামের সংঘর্ষ ঘটে না।',
        ],
        memoryDiagram: `atomic_int hits = 0 -> atomic_fetch_add(&hits, 1) -> guaranteed atomic increment`,
        code: `#include <stdatomic.h>
#include <stdio.h>

static atomic_int g_hits = 0;

static void record_hit(int n) {
    for (int i = 0; i < n; i++) atomic_fetch_add(&g_hits, 1);
}

int main(void) {
    int k = 0;
    if (scanf("%d", &k) == 1) {
        record_hit(k);
        printf("atomic_hits=%d\\n", atomic_load(&g_hits));
    }
    return 0;
}`,
        stdin: '5',
        expectedOutput: 'atomic_hits=5',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'atomic_fetch_add(&g_hits, 1);', whatItMeans: 'Atomically increments shared counter without data race.', whyItIsThere: 'Hardware lock/CAS ensures thread safety across cores.', ifDeletedError: 'Counter stays 0.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Provides printf output signature.', whyItIsThere: 'Reports OK vs ERR results cleanly.', ifDeletedError: 'Compile error: implicit printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'typedef enum { OK = 0, ERR_DIV_ZERO = 1 } Status;', whatItMeans: 'Defines explicit named error status codes.', whyItIsThere: 'Replaces magic integers 0/1 with self-documenting enums.', ifDeletedError: 'Compile error: unknown type Status.' },
      { lineNumber: 'Line 5', codeSnippet: 'Status safe_div(long long a, long long b, long long *out) {', whatItMeans: 'Validates inputs and populates *out only when safe.', whyItIsThere: 'Prevents divide-by-zero traps cleanly.', ifDeletedError: 'Compile error: safe_div undeclared.' },
      { lineNumber: 'Line 6', codeSnippet: 'if (b == 0 || !out) return ERR_DIV_ZERO;', whatItMeans: 'Guards against zero divisor and nullptr out-pointer.', whyItIsThere: 'Fails gracefully before performing division.', ifDeletedError: 'Crashes with SIGFPE when b == 0!' },
      { lineNumber: 'Line 7', codeSnippet: '*out = a / b;', whatItMeans: 'Writes quotient to caller memory only after guard succeeds.', whyItIsThere: 'Separates result storage from status code.', ifDeletedError: 'out stays unchanged at 0.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call safe_div(10, 2, &res)', memoryOrStack: 'b=2 != 0 -> res=5, ret OK', note: 'Success path' },
      { step: 2, state: 'Call safe_div(10, 0, &res)', memoryOrStack: 'b==0 guard -> ret ERR_DIV_ZERO', note: 'Safe rejection, zero crash' },
      { step: 3, state: 'Inspect returned Status', memoryOrStack: 'prints OK(5) then ERR', note: 'Explicit caller handling' },
      { step: 4, state: 'Return 0 from main', memoryOrStack: 'stdout="10/2->OK(5) 10/0->ERR"', note: 'Deterministic exit' },
    ],
    harryBugTraps: [
      {
        title: 'Using FILE* Without Checking fopen() Return Value',
        brokenCode: `FILE *f = fopen("missing.txt", "r"); fgets(buf, 64, f); // Segfault!`,
        fixedCode: `#include <stdio.h>\nint main(void) { FILE *f = fopen("missing.txt", "r"); if (!f) { printf("FILE_NOT_FOUND\\n"); return 0; } fclose(f); return 0; }`,
        whyItBreaks: 'When a file does not exist or permissions deny access, fopen returns nullptr; passing it to fgets crashes instantly.',
      },
      {
        title: 'Forgetting to Close FILE* Inside Error Early-Return Paths',
        brokenCode: `FILE *f = fopen("a.txt", "r"); if (bad) return 1; // Leaks file descriptor!`,
        fixedCode: `#include <stdio.h>\nint main(void) { printf("Use goto cleanup to always fclose(f)\\n"); return 0; }`,
        whyItBreaks: 'Long-running servers run out of OS file descriptors (EMFILE) if error paths skip fclose().',
      },
      {
        title: 'Checking feof(fp) Directly as Loop Condition',
        brokenCode: `while (!feof(fp)) { fscanf(fp, "%d", &x); sum += x; } // processes last item TWICE!`,
        fixedCode: `#include <stdio.h>\nint main(void) { int x=0, s=0; while (scanf("%d", &x) == 1) s += x; printf("%d\\n", s); return 0; }`,
        whyItBreaks: 'feof() only becomes true AFTER a read attempt hits EOF, causing the loop body to run one extra time on stale x.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-24-q1',
        difficulty: 'Easy',
        title: '1. Safe Bounds-Checked Array Read Helper',
        prompt: 'Write `int try_get(const int *a, int n, int idx, int *out)` returning 0 if invalid else 1.',
        banglaHint: '`idx >= 0 && idx < n && out != nullptr` হলে `*out = a[idx]` বসিয়ে `1` ফেরত দাও।',
        starterCode: `#include <stdio.h>\nint try_get(const int *a, int n, int idx, int *out) {\n    if (!a || !out || idx < 0 || idx >= n) return 0;\n    *out = a[idx]; return 1;\n}\nint main(void) {\n    int a[3]={10,20,30}, idx=0, v=0;\n    if (scanf("%d",&idx)==1 && try_get(a,3,idx,&v)) printf("%d\\n", v); else printf("OOB\\n");\n    return 0;\n}`,
        sampleStdin: '5',
        expectedOutput: 'OOB',
      },
      {
        id: 'c-ch-24-q2',
        difficulty: 'Easy',
        title: '2. Line-by-Line Valid Integer Counter',
        prompt: 'Read lines via fgets; count how many lines contain a valid integer.',
        banglaHint: '`sscanf(line, "%lld", &v) == 1` দিয়ে বৈধ লাইন গণনা করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char line[128]; int ok=0; long long v=0;\n    while (fgets(line, sizeof(line), stdin)) if (sscanf(line, "%lld", &v) == 1) ok++;\n    printf("%d\\n", ok);\n    return 0;\n}`,
        sampleStdin: '42\nhello\n99',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-24-q3',
        difficulty: 'Medium',
        title: '3. Strict String-to-Int64 Parser Using strtoll',
        prompt: 'Read token s; use `strtoll` + `errno` + `*end == \'\\0\'` to print value or "BAD".',
        banglaHint: '`strtoll` শেষে `end != s && *end == \'\\0\' && errno == 0` হলেই সংখ্যাটি শতভাগ বৈধ।',
        starterCode: `#include <errno.h>\n#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    char s[64], *end = nullptr;\n    if (scanf("%63s", s)==1) {\n        errno = 0; long long v = strtoll(s, &end, 10);\n        if (errno==0 && end!=s && *end=='\\0') printf("%lld\\n", v); else printf("BAD\\n");\n    }\n    return 0;\n}`,
        sampleStdin: '123abc',
        expectedOutput: 'BAD',
      },
      {
        id: 'c-ch-24-q4',
        difficulty: 'Medium',
        title: '4. Modular Key=Value Config Parser',
        prompt: 'Read lines of `key=value` up to EOF; print count of lines with non-empty key and int value.',
        banglaHint: '`sscanf(line, "%31[^=]=%d", key, &val) == 2` ফরম্যাট দিয়ে `key=value` পার্স করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char line[128], k[32]; int v=0, cnt=0;\n    while (fgets(line, sizeof(line), stdin)) if (sscanf(line, "%31[^=]=%d", k, &v)==2) cnt++;\n    printf("%d\\n", cnt);\n    return 0;\n}`,
        sampleStdin: 'port=3000\ninvalid\nworkers=4',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-24-q5',
        difficulty: 'Hard',
        title: '5. Atomic Transaction Ledger With Cleanup Path',
        prompt: 'Read n operations (`+amt` or `-amt`); reject negative balance without altering balance, print final balance.',
        banglaHint: 'অবৈধ বিয়োগ এলে স্টেট পরিবর্তন না করে বাদ দাও (Transactional Rollback)!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int n=0; long long bal=0, d=0;\n    if (scanf("%d", &n)==1) {\n        for(int i=0;i<n && scanf("%lld",&d)==1;i++) if (bal + d >= 0) bal += d;\n        printf("%lld\\n", bal);\n    }\n    return 0;\n}`,
        sampleStdin: '4\n100 -40 -90 25',
        expectedOutput: '85',
      },
    ],
    miniBuild: {
      title: 'Resilient Line-Parser & Safe Division Diagnostics',
      description: 'Processes input streams via fgets + sscanf and enforces explicit enum error codes without crashes.',
      banglaGoal: 'fgets ও enum Status ব্যবহার করে ক্র্যাশ-মুক্ত নিরাপদ স্ট্রিম পার্সার তৈরি।',
      combinesChapters: 'Ch 1–24',
      starterCode: `#include <stdio.h>

typedef enum { OK = 0, ERR_DIV_ZERO = 1 } Status;

Status safe_div(long long a, long long b, long long *out) {
    if (b == 0 || !out) return ERR_DIV_ZERO;
    *out = a / b;
    return OK;
}

int main(void) {
    long long a = 0, b = 0, res = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        if (safe_div(a, b, &res) == OK) printf("OK:%lld\\n", res);
        else printf("ERR_DIV_ZERO\\n");
    }
    return 0;
}`,
      sampleStdin: '20 4',
      expectedOutput: 'OK:5',
    },
    starterCode: `#include <stdio.h>

typedef enum { OK = 0, ERR_DIV_ZERO = 1 } Status;

Status safe_div(long long a, long long b, long long *out) {
    if (b == 0 || !out) return ERR_DIV_ZERO;
    *out = a / b;
    return OK;
}

int main(void) {
    long long a = 0, b = 0, res = 0;
    if (scanf("%lld %lld", &a, &b) == 2) {
        if (safe_div(a, b, &res) == OK) printf("OK:%lld\\n", res);
        else printf("ERR_DIV_ZERO\\n");
    }
    return 0;
}`,
    sampleStdin: '20 4',
    expectedSampleOutput: 'OK:5',
    testCases: [
      { id: 'c24-t1', input: '20 4', expectedOutput: 'OK:5' },
      { id: 'c24-t2', input: '20 0', expectedOutput: 'ERR_DIV_ZERO', isHidden: true },
    ],
  },

  25: {
    chapterNumber: 25,
    title: 'C Chapter 25 (C23): Full-Stack Website Architecture & HTTP Engine (Mega Capstone)',
    banglaTitle: 'C অধ্যায় ২৫ (C23): ফুল-স্ট্যাক ওয়েবসাইট আর্কিটেকচার ও HTTP ইঞ্জিন (মেগা ক্যাপস্টোন)',
    subtitle: 'How C powers NGINX/HTTP backends, HTTP request-line parsing, route dispatch tables, JSON serialization, and Mega Capstone Ch 1–25.',
    zeroIntuition: {
      plainEnglishStory:
        'Underneath modern full-stack web apps (React/HTML5 frontend -> API Gateway -> Database), high-throughput edge servers like NGINX, Redis, PostgreSQL, and Cloudflare workers run on C! Every browser click sends a plain-text HTTP request (`GET /api/users?id=42 HTTP/1.1`), which the backend parses into method, path, and query parameters, checks auth middleware, queries data, and emits an HTTP status + JSON body.\n\nIn this Mega Capstone for C23, you unify ALL 25 chapters—string tokenization, structs, pointer tables, heap/bounded buffers, hash/rate-limit checks, and structured status codes—into a deterministic HTTP Request Router and JSON Response Engine!',
      asciiFlowchart: `  [ Browser HTTP/1.1 Request: "GET /api/score?user=argon HTTP/1.1" ]
        |
        v  (1. Parse Method & Path -> 2. Auth/Route Table -> 3. Handler)
  [ HTTP/1.1 200 OK | Content-Type: application/json ]
  [ {"user":"argon","status":"active","code":200} ]`,
      pseudocode: [
        '1. PARSE incoming HTTP request line into bounded struct { method, path, query }',
        '2. MATCH route table entries (/health, /api/sum, /api/user) via function pointers',
        '3. VALIDATE headers/parameters safely returning 200, 400, or 404 HTTP status codes',
        '4. SERIALIZE HTTP response headers + escaping-safe JSON payload cleanly to stdout/socket',
      ],
      banglaZeroToHero: {
        analogyTitle: 'পূর্ণাঙ্গ ওয়েব সার্ভার, রাউটার ও ফুল-স্ট্যাক আর্কিটেকচার (Mega Capstone)',
        explanation:
          'একটি পূর্ণাঙ্গ ওয়েবসাইটে ব্রাউজারে HTML/CSS/JS চলে (Frontend), মাঝখানে API সার্ভার রিকোয়েস্ট সামলায় (Backend), আর পেছনে ডেটাবেস (PostgreSQL/Redis) তথ্য জমা রাখে—আর মজার ব্যাপার হলো NGINX, Redis, PostgreSQL-এর মতো পৃথিবীর দ্রুততম সার্ভার ও ডেটাবেস ইঞ্জিনগুলো C ভাষাতেই লেখা! ব্রাউজার যখন সার্ভারে ক্লিক পাঠায়, তখন আসলে একটি সাধারণ টেক্সট HTTP রিকোয়েস্ট আসে: যেমন `GET /api/user HTTP/1.1`। সার্ভার প্রথমে মেথড (`GET`/`POST`) ও পথ (`/api/user`) আলাদা করে (Parsing), তারপর রাউট টেবিল দেখে ঠিক করে কোন হ্যান্ডলার ফাংশন চলবে (Routing)। যদি টোকেন না মেলে তবে `401 Unauthorized`, আর পাথ না মিললে `404 Not Found` ফেরত পাঠায়। সবকিছু ঠিক থাকলে ডেটাবেস থেকে তথ্য এনে JSON ফরম্যাটে `200 OK` রেসপন্স তৈরি করে! C-তে ফুল-স্ট্যাক ব্যাকএন্ড বানানোর সময় বাফার ওভারফ্লো ঠেকাতে `%15s` এর মতো সীমা বেঁধে স্ট্রিং পড়া ও `snprintf` দিয়ে রেসপন্স লেখা অত্যন্ত জরুরি। এই মেগা ক্যাপস্টোনে তুমি অধ্যায় ১ থেকে ২৪-এ শেখা সব জ্ঞান—টাইপ, বিটমাস্ক, অ্যারে, স্ট্রিং, পয়েন্টার, স্ট্রাক্ট, ফাংশন পয়েন্টার ডিসপ্যাচ ও এরর হ্যান্ডলিং—একসাথে মিলিয়ে একটি সত্যিকারের C23 HTTP রাউটার ও JSON রেসপন্স ইঞ্জিন তৈরি করবে!',
        everydayExample:
          'একটি রেস্তোরাঁয় ওয়েটার (HTTP Router) অর্ডার স্লিপ (`GET /api/menu`) পড়ে রান্নাঘরের সঠিক শেফের (Route Handler Function) কাছে পাঠিয়ে সুন্দর প্যাকেটে (JSON Response) গ্রাহককে ফিরিয়ে দেয়!',
        keyTakeaways: [
          'প্রতিটি ওয়েব রিকোয়েস্ট মূলত স্ট্রিং টোকেনাইজেশন + রাউট টেবিল ডিসপ্যাচ + JSON রেসপন্স জেনারেশন।',
          'HTTP সার্ভারে অসীম ইনপুটে বাফার ওভারফ্লো ঠেকাতে সর্বদা `snprintf` ও সীমাবদ্ধ `%Ns` ব্যবহার করবে।',
          'ফাংশন পয়েন্টারযুক্ত `Route` স্ট্রাক্ট অ্যারে দিয়ে শত শত URL রাউট O(n) বা হ্যাশ ম্যাপে O(1) সময়ে চালানো যায়।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-25-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Parsing an HTTP Request Line Into a Typed Struct',
        englishParagraphs: [
          'Every HTTP/1.1 request opens with `<METHOD> <PATH> <VERSION>` (e.g., `GET /health HTTP/1.1`). Bounded `sscanf` reads fixed-width buffers safely without risking stack overflow.',
          'Structuring parsed metadata into `HttpReq` decouples network parsing from business logic cleanly.',
        ],
        banglaParagraphs: [
          'যেকোনো HTTP রিকোয়েস্টের প্রথম লাইন `GET /health HTTP/1.1` ভেঙে `method`, `path`, ও `version` আলাদা স্ট্রাক্টে নেওয়ার পরিচ্ছন্ন পদ্ধতি এটি।',
          'বাফার ওভারফ্লো এড়াতে `%15s` ও `%63s` সীমা দেওয়া হয়েছে।',
        ],
        memoryDiagram: `"GET /health HTTP/1.1" -> HttpReq{method="GET", path="/health"}`,
        code: `#include <stdio.h>

typedef struct { char method[16]; char path[64]; } HttpReq;

int main(void) {
    const char *raw = "GET /health HTTP/1.1";
    HttpReq req = {"", ""};
    if (sscanf(raw, "%15s %63s", req.method, req.path) == 2) {
        printf("method=%s path=%s\\n", req.method, req.path);
    }
    return 0;
}`,
        stdin: '',
        expectedOutput: 'method=GET path=/health',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'typedef struct { char method[16]; char path[64]; } HttpReq;', whatItMeans: 'Compact request struct holding bounded HTTP method and route path.', whyItIsThere: 'Organizes parsed request fields safely.', ifDeletedError: 'Compile error: unknown type HttpReq.' },
          { lineNumber: 'Line 8', codeSnippet: 'if (sscanf(raw, "%15s %63s", req.method, req.path) == 2) {', whatItMeans: 'Parses method and path with explicit width limits.', whyItIsThere: 'Prevents buffer overflow on oversized URLs.', ifDeletedError: 'Request fields remain empty strings.' },
        ],
      },
      {
        id: 'c-ch-25-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'JSON Response Serializer Using Safe snprintf()',
        englishParagraphs: [
          'Never build HTTP/JSON responses with unsafe `sprintf`! `snprintf(buf, sizeof(buf), ...)` guarantees the output buffer NEVER overflows even if user handles are unexpectedly long.',
          'Here we serialize a full HTTP 200 status + JSON body from parsed request tokens.',
        ],
        banglaParagraphs: [
          'সার্ভার থেকে JSON রেসপন্স বানানোর সময় `sprintf`-এর বদলে সবসময় `snprintf(buf, sizeof(buf), ...)` ব্যবহার করতে হয় যাতে মেমোরি ওভারফ্লো না ঘটে।',
          'ইনপুট থেকে ইউজারনেম ও স্কোর নিয়ে নিখুঁত `200 OK` JSON তৈরি হচ্ছে।',
        ],
        memoryDiagram: `stdin: "argon 95" -> snprintf -> HTTP 200 {"user":"argon","score":95}`,
        code: `#include <stdio.h>

int main(void) {
    char user[32], json[256];
    int score = 0;
    if (scanf("%31s %d", user, &score) == 2) {
        snprintf(json, sizeof(json), "{\\"user\\":\\"%s\\",\\"score\\":%d}", user, score);
        printf("HTTP/1.1 200 OK\\n%s\\n", json);
    }
    return 0;
}`,
        stdin: 'argon 95',
        expectedOutput: 'HTTP/1.1 200 OK\n{"user":"argon","score":95}',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'snprintf(json, sizeof(json), "{\\"user\\":\\"%s\\",\\"score\\":%d}", user, score);', whatItMeans: 'Bounds-checked JSON formatting into fixed 256-byte buffer.', whyItIsThere: 'Prevents stack smashing on untrusted inputs.', ifDeletedError: 'json contains uninitialized stack data.' },
        ],
      },
      {
        id: 'c-ch-25-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'API Route Dispatch Table & Middleware Auth Check',
        englishParagraphs: [
          'Production web servers map path prefixes (`/health`, `/api/echo`, `/admin`) to handler function pointers inside a `Route` lookup table, wrapped by an auth middleware check first!',
          'Any unknown route falls through cleanly to a standardized `404 Not Found` response.',
        ],
        banglaParagraphs: [
          'একটি বাস্তব ব্যাকএন্ড সার্ভারের মতো এখানে Middleware দিয়ে টোকেন (`auth`) যাচাই করে তারপর রাউট টেবিল থেকে সঠিক হ্যান্ডলার ফাংশন কল করা হয়েছে!',
          'অজানা পাথ এলে স্বয়ংক্রিয়ভাবে `404` উত্তর আসে।',
        ],
        memoryDiagram: `req -> check auth -> match route["/health"] -> 200 OK | missing -> 404`,
        code: `#include <stdio.h>
#include <string.h>

void h_health(void) { printf("200 {\\"ok\\":true}\\n"); }
void h_ver(void) { printf("200 {\\"ver\\":\\"c23\\"}\\n"); }

typedef struct { const char *path; void (*fn)(void); } Route;

int main(void) {
    Route routes[] = {{"/health", h_health}, {"/version", h_ver}};
    char path[64], tok[32];
    if (scanf("%63s %31s", path, tok) == 2) {
        if (strcmp(tok, "secret") != 0) { printf("401 Unauthorized\\n"); return 0; }
        for (size_t i = 0; i < 2; i++) {
            if (strcmp(path, routes[i].path) == 0) { routes[i].fn(); return 0; }
        }
        printf("404 NotFound\\n");
    }
    return 0;
}`,
        stdin: '/health secret',
        expectedOutput: '200 {"ok":true}',
        lineByLine: [
          { lineNumber: 'Line 13', codeSnippet: 'if (strcmp(tok, "secret") != 0) { printf("401 Unauthorized\\n"); return 0; }', whatItMeans: 'Middleware barrier blocking unauthenticated callers before routing.', whyItIsThere: 'Protects private endpoints cleanly.', ifDeletedError: 'Unauthenticated clients bypass auth!' },
        ],
      },
      {
        id: 'c-ch-25-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Mega Capstone: Full-Stack HTTP Request Router + JSON API Engine',
        englishParagraphs: [
          'This Mega Capstone reads `n` simulated browser requests (`METHOD /path arg`), dispatches `/health`, `/api/add?a&b`, and `/api/stats`, rejects bad methods with `405` and missing routes with `404`, and prints exact JSON responses.',
          'Notice how C’s deterministic memory, bounded string slices, and function-pointer tables zero out allocation overhead!',
        ],
        banglaParagraphs: [
          'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): একাধিক HTTP রিকোয়েস্ট পড়ে মেথড যাচাই, পাথ রাউটিং (`/health`, `/api/add`), ও `200`/`404`/`405` স্ট্যাটাস কোডসহ JSON রেসপন্স জেনারেটর!',
          'সম্পূর্ণ প্রোগ্রামটি কোনো হিপ লিক বা বাফার ওভারফ্লো ছাড়াই একটানা হাজার রিকোয়েস্ট প্রসেস করতে সক্ষম।',
        ],
        memoryDiagram: `Request Stream -> Router -> Handler(/api/add -> JSON sum) / 404 / 405`,
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        char method[16], path[64];
        long long a = 0, b = 0;
        if (scanf("%15s %63s %lld %lld", method, path, &a, &b) != 4) break;
        if (strcmp(method, "GET") != 0 && strcmp(method, "POST") != 0) {
            printf("405 MethodNotAllowed\\n");
        } else if (strcmp(path, "/health") == 0) {
            printf("200 {\\"status\\":\\"ok\\"}\\n");
        } else if (strcmp(path, "/api/add") == 0) {
            printf("200 {\\"sum\\":%lld}\\n", a + b);
        } else {
            printf("404 {\\"error\\":\\"not_found\\"}\\n");
        }
    }
    return 0;
}`,
        stdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
        expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'if (strcmp(method, "GET") != 0 && strcmp(method, "POST") != 0)', whatItMeans: 'Enforces allowed HTTP verb whitelist cleanly.', whyItIsThere: 'Rejects unsupported verbs with proper HTTP 405 semantics.', ifDeletedError: 'Invalid HTTP methods route straight into handlers.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports sscanf and printf for request parsing and response printing.', whyItIsThere: 'Core I/O backbone of the HTTP line parser.', ifDeletedError: 'Compile error: implicit printf/sscanf.' },
      { lineNumber: 'Line 3', codeSnippet: 'typedef struct { char method[16]; char path[64]; } HttpReq;', whatItMeans: 'Fixed-width request structure holding HTTP verb and path.', whyItIsThere: 'Models parsed request cleanly on stack with zero heap fragmentation.', ifDeletedError: 'Compile error: HttpReq unknown.' },
      { lineNumber: 'Line 6', codeSnippet: 'const char *raw = "GET /health HTTP/1.1";', whatItMeans: 'Sample raw HTTP/1.1 wire request line.', whyItIsThere: 'Demonstrates parsing incoming socket text.', ifDeletedError: 'Compile error: raw undeclared.' },
      { lineNumber: 'Line 8', codeSnippet: 'if (sscanf(raw, "%15s %63s", req.method, req.path) == 2) {', whatItMeans: 'Width-limited token parsing into struct buffers.', whyItIsThere: 'Guarantees zero stack buffer overflow.', ifDeletedError: 'Request struct remains unpopulated.' },
      { lineNumber: 'Line 9', codeSnippet: 'printf("method=%s path=%s\\n", req.method, req.path);', whatItMeans: 'Emits parsed route tokens for router dispatch.', whyItIsThere: 'Confirms parser extracted HTTP verb and route cleanly.', ifDeletedError: 'No parsed output displayed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Receive "GET /health 0 0"', memoryOrStack: 'method="GET", path="/health"', note: 'Allowed method' },
      { step: 2, state: 'Match route "/health"', memoryOrStack: 'Emits 200 {"status":"ok"}', note: 'Health endpoint OK' },
      { step: 3, state: 'Receive "POST /api/add 15 27"', memoryOrStack: 'a=15, b=27 -> sum=42', note: '200 {"sum":42}' },
      { step: 4, state: 'Receive "GET /unknown 0 0"', memoryOrStack: 'No route matched -> 404', note: 'Clean error JSON' },
    ],
    harryBugTraps: [
      {
        title: 'Unbounded sprintf / scanf("%s") Leading to Remote Buffer Overflow',
        brokenCode: `char path[32]; sscanf(req, "%s", path); // 500-byte URL smashes stack!`,
        fixedCode: `#include <stdio.h>\nint main(void) { char path[32]; sscanf("/api/v1/ok", "%31s", path); printf("%s\\n", path); return 0; }`,
        whyItBreaks: 'Network input is untrusted; unbounded %s writes past buffer end causing critical security vulnerabilities (CVE).',
      },
      {
        title: 'Using == Instead of strcmp() to Match HTTP Route Paths',
        brokenCode: `if (path == "/health") { ... } // compares RAM pointers, always false!`,
        fixedCode: `#include <stdio.h>\n#include <string.h>\nint main(void) { char p[16] = "/health"; printf("%s\\n", strcmp(p, "/health") == 0 ? "MATCH" : "NO"); return 0; }`,
        whyItBreaks: 'In C, == checks pointer addresses rather than characters; always use strcmp(a, b) == 0.',
      },
      {
        title: 'Using sprintf Instead of snprintf When Serializing JSON',
        brokenCode: `char json[32]; sprintf(json, "{\\"user\\":\\"%s\\"}", very_long_name);`,
        fixedCode: `#include <stdio.h>\nint main(void) { char json[32]; snprintf(json, sizeof(json), "{\\"user\\":\\"%s\\"}", "argon"); printf("%s\\n", json); return 0; }`,
        whyItBreaks: 'sprintf has no length limit and corrupts adjacent memory on long user strings; snprintf safely truncates at sizeof(json).',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-25-q1',
        difficulty: 'Easy',
        title: '1. HTTP Status Text Mapper',
        prompt: 'Read HTTP status integer code (200, 404, 500) and print OK / NOT_FOUND / SERVER_ERR.',
        banglaHint: '`switch (code)` দিয়ে প্রতিটি স্ট্যাটাস কোডের নাম প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int c = 0;\n    if (scanf("%d", &c) == 1) {\n        if (c == 200) printf("OK\\n");\n        else if (c == 404) printf("NOT_FOUND\\n");\n        else printf("SERVER_ERR\\n");\n    }\n    return 0;\n}`,
        sampleStdin: '404',
        expectedOutput: 'NOT_FOUND',
      },
      {
        id: 'c-ch-25-q2',
        difficulty: 'Easy',
        title: '2. Safe JSON Pair Serializer',
        prompt: 'Read key and integer value; output exact `{"<key>":<val>}` cleanly.',
        banglaHint: '`snprintf` বা `printf` দিয়ে `"{\\"%s\\":%lld}"` ফরম্যাট করো।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char k[32]; long long v = 0;\n    if (scanf("%31s %lld", k, &v) == 2) printf("{\\"%s\\":%lld}\\n", k, v);\n    return 0;\n}`,
        sampleStdin: 'xp 250',
        expectedOutput: '{"xp":250}',
      },
      {
        id: 'c-ch-25-q3',
        difficulty: 'Medium',
        title: '3. Query Parameter Value Extractor',
        prompt: 'Read query string like `id=42&mode=pro`; parse integer `id` via `sscanf` and print it.',
        banglaHint: '`sscanf(q, "id=%lld", &id)` দিয়ে সহজেই প্রথম প্যারামিটার পড়া যায়।',
        starterCode: `#include <stdio.h>\nint main(void) {\n    char q[128]; long long id = -1;\n    if (scanf("%127s", q) == 1 && sscanf(q, "id=%lld", &id) == 1) printf("%lld\\n", id);\n    return 0;\n}`,
        sampleStdin: 'id=42&mode=pro',
        expectedOutput: '42',
      },
      {
        id: 'c-ch-25-q4',
        difficulty: 'Medium',
        title: '4. Sliding Rate-Limiter Request Counter',
        prompt: 'Read cap and n request timestamps (sorted); count how many are accepted within 10s window of max `cap` requests.',
        banglaHint: 'উইন্ডো `[r]` ও `[l]`-এর দূরত্ব `>= 10` হলে বাম থেকে `l++` সরাও এবং বর্তমান উইন্ডোর সংখ্যা `< cap` হলে অ্যাক্সেপ্ট করো!',
        starterCode: `#include <stdio.h>\nint main(void) {\n    int cap=0, n=0; long long t[1000], accepted_t[1000];\n    if (scanf("%d %d", &cap, &n) != 2) return 0;\n    int l=0, r=0;\n    for (int i=0; i<n; i++) {\n        scanf("%lld", &t[i]);\n        while (l < r && t[i] - accepted_t[l] >= 10) l++;\n        if (r - l < cap) accepted_t[r++] = t[i];\n    }\n    printf("%d\\n", r);\n    return 0;\n}`,
        sampleStdin: '2 4\n1 2 5 12',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-25-q5',
        difficulty: 'Hard',
        title: '5. Mini REST API In-Memory Store Simulator',
        prompt: 'Process n commands: `SET id val` or `GET id` for ids 0..99; print result of each GET.',
        banglaHint: '`strcmp(cmd, "SET") == 0` হলে অ্যারেতে সেভ করো, `GET` হলে বর্তমান মান প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\n#include <string.h>\nint main(void) {\n    int n = 0; long long db[100] = {0};\n    if (scanf("%d", &n) != 1) return 0;\n    for (int i = 0; i < n; i++) {\n        char cmd[8]; int id = 0; long long v = 0;\n        scanf("%7s %d", cmd, &id);\n        if (strcmp(cmd, "SET") == 0) { scanf("%lld", &v); if (id>=0 && id<100) db[id] = v; }\n        else if (id>=0 && id<100) printf("%lld\\n", db[id]);\n    }\n    return 0;\n}`,
        sampleStdin: '3\nSET 5 900\nGET 1\nGET 5',
        expectedOutput: '0\n900',
      },
    ],
    miniBuild: {
      title: 'Mega Capstone (Ch 1–25): C23 Full-Stack HTTP Router & JSON Engine',
      description: 'Combines parsing, structs, bounded strings, status codes, and routing tables into a live C23 HTTP backend.',
      banglaGoal: 'মেগা ক্যাপস্টোন (অধ্যায় ১–২৫): পূর্ণাঙ্গ HTTP রিকোয়েস্ট রাউটার ও JSON রেসপন্স ইঞ্জিন নির্মাণ।',
      combinesChapters: 'Ch 1–25',
      starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        char method[16], path[64];
        long long a = 0, b = 0;
        if (scanf("%15s %63s %lld %lld", method, path, &a, &b) != 4) break;
        if (strcmp(method, "GET") != 0 && strcmp(method, "POST") != 0) {
            printf("405 MethodNotAllowed\\n");
        } else if (strcmp(path, "/health") == 0) {
            printf("200 {\\"status\\":\\"ok\\"}\\n");
        } else if (strcmp(path, "/api/add") == 0) {
            printf("200 {\\"sum\\":%lld}\\n", a + b);
        } else {
            printf("404 {\\"error\\":\\"not_found\\"}\\n");
        }
    }
    return 0;
}`,
      sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
      expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    },
    starterCode: `#include <stdio.h>
#include <string.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        char method[16], path[64];
        long long a = 0, b = 0;
        if (scanf("%15s %63s %lld %lld", method, path, &a, &b) != 4) break;
        if (strcmp(method, "GET") != 0 && strcmp(method, "POST") != 0) {
            printf("405 MethodNotAllowed\\n");
        } else if (strcmp(path, "/health") == 0) {
            printf("200 {\\"status\\":\\"ok\\"}\\n");
        } else if (strcmp(path, "/api/add") == 0) {
            printf("200 {\\"sum\\":%lld}\\n", a + b);
        } else {
            printf("404 {\\"error\\":\\"not_found\\"}\\n");
        }
    }
    return 0;
}`,
    sampleStdin: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0',
    expectedSampleOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}',
    testCases: [
      { id: 'c25-t1', input: '3\nGET /health 0 0\nPOST /api/add 15 27\nGET /unknown 0 0', expectedOutput: '200 {"status":"ok"}\n200 {"sum":42}\n404 {"error":"not_found"}' },
      { id: 'c25-t2', input: '1\nDELETE /api/add 1 2', expectedOutput: '405 MethodNotAllowed', isHidden: true },
    ],
  },
};


