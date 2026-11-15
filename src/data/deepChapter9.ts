import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_9: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 9 (C23): C Standard Library (qsort, bsearch, string.h & Memory Utils)',
    banglaTitle: 'C অধ্যায় ৯ (C23): C স্ট্যান্ডার্ড লাইব্রেরি (qsort, bsearch, string.h)',
    subtitle: 'Master stdlib.h qsort() with overflow-safe comparators, O(log n) bsearch(), memcpy/memmove, and linear frequency counting.',
    zeroIntuition: {
      plainEnglishStory:
        'C keeps its core tiny and exposes battle-tested sorting, binary search, and raw byte manipulation inside `<stdlib.h>` and `<string.h>`! One huge trap in `qsort()` comparators: writing `return *(int*)a - *(int*)b;` **overflows** when comparing `-2,000,000,000` and `2,000,000,000`—always write `(va > vb) - (va < vb)` instead!',
      asciiFlowchart: `  C qsort() + RUN-LENGTH FREQUENCY PIPELINE
  Input:  [ 4, 1, 2, 1, 2, 1 ]
            | qsort(..., cmp)  O(n log n)
            v
  Sorted: [ 1, 1, 1, 2, 2, 4 ]
            | 1-pass scan: count runs -> best=(1, 3)  O(n)`,
      pseudocode: [
        '1. SORT array using `qsort(a, n, sizeof(int), cmp)` in O(n log n)',
        '2. COMPARE inside `cmp` via `(va > vb) - (va < vb)` (NEVER `va - vb`!)',
        '3. SCAN sorted contiguous runs to aggregate exact frequency in O(n) time, O(1) extra RAM',
        '4. USE `bsearch()` on sorted arrays for O(log n) lookup',
        '5. USE `memmove` (not `memcpy`) whenever source and destination buffers overlap',
      ],
      banglaZeroToHero: {
        analogyTitle: 'লাইব্রেরির বিল্ট-ইন ক্যাটালগ (`qsort`) ও ওভারফ্লো-মুক্ত কম্পারেটর',
        explanation:
          'নিজে হাতে বাবল সর্ট (`O(n^2)`) না লিখে `<stdlib.h>`-এর `qsort()` ব্যবহার করলে কোড মুহূর্তে `O(n log n)` গতিতে সর্ট হয়! তারপর পাশাপাশি থাকা সমান সংখ্যাগুলো গুনে নিলেই সবচেয়ে বেশিবার আসা সংখ্যা সহজে পাওয়া যায়। তবে কম্পারেটর ফাংশনে `*a - *b` লিখবে না—বড় নেগেটিভ আর পজিটিভ সংখ্যা বিয়োগ করলে `int` ওভারফ্লো হয়ে সর্ট উল্টোপাল্টা হয়ে যায়!',
        everydayExample:
          'সব নম্বর রসিদ আগে ছোট থেকে বড় সাজিয়ে (`qsort`) একটার পর একটা গুনে দেখা কোন নম্বর সবচেয়ে বেশি আছে!',
        keyTakeaways: [
          '`qsort` কম্পারেটরে সবসময় `(va > vb) - (va < vb)` ব্যবহার করবে, `va - vb` নয়।',
          'দুটি মেমোরি ব্লক ওভারল্যাপ করলে `memcpy` আনডিফাইন্ড বিহেভিয়ার করে—তখন `memmove` ব্যবহার করো।',
          '`bsearch` কেবল আগে থেকেই `qsort` করা অ্যারেতে কাজ করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: qsort() + Run-Length Most Frequent Element',
        banglaNote: '`qsort` দিয়ে অ্যারে সাজিয়ে এক পাসে সর্বাধিক পুনরাবৃত্ত সংখ্যা ও তার গণনা বের করা।',
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_asc(const void *pa, const void *pb) {
    int a = *(const int *)pa, b = *(const int *)pb;
    return (a > b) - (a < b);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, (size_t)n, sizeof(int), cmp_asc);
    int best = a[0], best_c = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        cur = (a[i] == a[i - 1]) ? cur + 1 : 1;
        if (cur > best_c) { best_c = cur; best = a[i]; }
    }
    printf("%d %d\\n", best, best_c);
    free(a);
    return 0;
}`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'c-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Overflow-Safe Comparator With INT_MIN & INT_MAX',
        banglaNote: '`INT_MIN - INT_MAX` বিয়োগ করলে সিগনেড ওভারফ্লো হয়—`(a > b) - (a < b)` দিয়ে ১০০% সুরক্ষিত!',
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_safe(const void *pa, const void *pb) {
    int a = *(const int *)pa, b = *(const int *)pb;
    return (a > b) - (a < b);
}

int main(void) {
    int a[3];
    if (scanf("%d %d %d", &a[0], &a[1], &a[2]) != 3) return 0;
    qsort(a, 3, sizeof(int), cmp_safe);
    printf("%d %d %d\\n", a[0], a[1], a[2]);
    return 0;
}`,
        stdin: '2000000000 -2000000000 0',
        expectedOutput: '-2000000000 0 2000000000',
      },
      {
        id: 'c-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(log n) Binary Search via stdlib bsearch()',
        banglaNote: '`qsort`-এর পর `bsearch()` ব্যবহার করে O(log n) সময়ে নির্দিষ্ট মান খোঁজা।',
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_int(const void *pa, const void *pb) {
    int a = *(const int *)pa, b = *(const int *)pb;
    return (a > b) - (a < b);
}

int main(void) {
    int n = 0, key = 0;
    if (scanf("%d %d", &n, &key) != 2 || n <= 0) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, (size_t)n, sizeof(int), cmp_int);
    int *hit = bsearch(&key, a, (size_t)n, sizeof(int), cmp_int);
    printf("%s\\n", hit ? "FOUND" : "MISSING");
    free(a);
    return 0;
}`,
        stdin: '5 7\n11 2 7 15 5',
        expectedOutput: 'FOUND',
      },
      {
        id: 'c-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Multi-Key Struct Sort (Score Desc, Name Asc)',
        banglaNote: 'কাস্টম কম্পারেটর দিয়ে স্কোর বড় থেকে ছোট ও সমান হলে নাম অনুযায়ী সাজানো।',
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct { char name[32]; int score; } Entry;

int cmp_entry(const void *pa, const void *pb) {
    const Entry *a = pa, *b = pb;
    if (a->score != b->score) return (b->score > a->score) - (b->score < a->score);
    return strcmp(a->name, b->name);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Entry *arr = malloc((size_t)n * sizeof(Entry));
    for (int i = 0; i < n; i++) scanf("%31s %d", arr[i].name, &arr[i].score);
    qsort(arr, (size_t)n, sizeof(Entry), cmp_entry);
    printf("%s %d\\n", arr[0].name, arr[0].score);
    free(arr);
    return 0;
}`,
        stdin: '3\nZara 90\nAmir 90\nRafi 75',
        expectedOutput: 'Amir 90',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4-7',
        codeSnippet: 'int cmp_asc(const void *pa, const void *pb) { ... return (a > b) - (a < b); }',
        whatItMeans: 'Type-casts generic `const void *` pointers to `int` and returns `-1`, `0`, or `+1`.',
        whyItIsThere: '`qsort` works on any element type by accepting `void*` callbacks.',
        ifDeletedError: 'Compile error: `cmp_asc` undeclared in `qsort()`.',
      },
      {
        lineNumber: 'Line 14',
        codeSnippet: 'qsort(a, (size_t)n, sizeof(int), cmp_asc);',
        whatItMeans: 'Sorts `n` elements of size `sizeof(int)` in O(n log n) time.',
        whyItIsThere: 'Groups identical numbers together so frequency counting takes 1 linear pass.',
        ifDeletedError: 'Unsorted array breaks contiguous frequency counting.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'cur = (a[i] == a[i - 1]) ? cur + 1 : 1;',
        whatItMeans: 'Extends current value’s frequency streak or resets counter to 1.',
        whyItIsThere: 'Tracks frequency in O(1) space after sorting.',
        ifDeletedError: 'Frequency count never updates accurately.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Input [4, 1, 2, 1, 2, 1]', memoryOrStack: 'Heap array a[0..5]', note: 'Calls qsort()' },
      { step: 2, state: 'qsort sorts a -> [1,1,1,2,2,4]', memoryOrStack: 'Smallest ties stay leftmost', note: 'O(n log n) time' },
      { step: 3, state: 'Scan runs: 1(x3), 2(x2), 4(x1)', memoryOrStack: 'best=1, best_c=3', note: 'Tie-breaks smaller key' },
      { step: 4, state: 'printf("1 3\\n")', memoryOrStack: 'stdout: 1 3', note: 'Frees heap buffer' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Overflowing `return *(int*)a - *(int*)b;` in `qsort`',
        brokenCode: `int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }`,
        fixedCode: `int cmp(const void *a, const void *b) { int x=*(int*)a, y=*(int*)b; return (x>y)-(x<y); }`,
        whyItBreaks: 'Subtracting `-2e9 - 2e9` overflows 32-bit `int` and flips the sign, breaking sort order!',
      },
      {
        title: 'Trap 2: Passing `n` Instead of `sizeof(int)` as 3rd Argument to `qsort`',
        brokenCode: `qsort(a, sizeof(int), n, cmp); // Swapped count & element size!`,
        fixedCode: `qsort(a, (size_t)n, sizeof(int), cmp);`,
        whyItBreaks: 'Corrupts memory by reading wrong stride sizes.',
      },
      {
        title: 'Trap 3: Calling `memcpy` on Overlapping Buffers',
        brokenCode: `memcpy(buf + 1, buf, 10); // Undefined Behavior!`,
        fixedCode: `memmove(buf + 1, buf, 10); // Overlap-safe`,
        whyItBreaks: '`memcpy` assumes non-overlapping ranges; `memmove` safely handles overlaps.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Descending qsort Top 3 Sum',
        prompt: 'Read n and n ints; sort descending with `qsort` and print sum of largest 3.',
        banglaHint: '`return (b > a) - (b < a);` কম্পারেটর ব্যবহার করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp_desc(const void *pa, const void *pb) { int a=*(const int*)pa, b=*(const int*)pb; return (b>a)-(b<a); }\nint main(void) {\n    int n; if (scanf("%d", &n) != 1) return 0;\n    int *a = malloc((size_t)n * sizeof(int)); for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    qsort(a, (size_t)n, sizeof(int), cmp_desc);\n    long long s = 0; for (int i = 0; i < n && i < 3; i++) s += a[i];\n    printf("%lld\\n", s); free(a); return 0;\n}`,
        sampleStdin: '5\n10 4 50 2 30',
        expectedOutput: '90',
      },
      {
        id: 'c-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Count Distinct Elements via qsort',
        prompt: 'Read n and n ints; count unique values in one pass after `qsort`.',
        banglaHint: '`if (i == 0 || a[i] != a[i - 1]) uniq++;` গোনো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *pa, const void *pb) { int a=*(const int*)pa, b=*(const int*)pb; return (a>b)-(a<b); }\nint main(void) {\n    int n; if (scanf("%d", &n) != 1) return 0;\n    int *a = malloc((size_t)n * sizeof(int)); for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    qsort(a, (size_t)n, sizeof(int), cmp);\n    int uniq = 0; for (int i = 0; i < n; i++) if (i == 0 || a[i] != a[i - 1]) uniq++;\n    printf("%d\\n", uniq); free(a); return 0;\n}`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'c-ch-9-q3',
        difficulty: 'Medium',
        title: '3. String Dictionary Sort via qsort & strcmp',
        prompt: 'Read n words (`<=31` chars); sort alphabetically with `qsort` and print the first word.',
        banglaHint: '`strcmp(*(const char (*)[32])a, *(const char (*)[32])b)` ব্যবহার করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\nint cmp_str(const void *a, const void *b) { return strcmp((const char*)a, (const char*)b); }\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    char (*w)[32] = malloc((size_t)n * sizeof(*w));\n    for (int i = 0; i < n; i++) scanf("%31s", w[i]);\n    qsort(w, (size_t)n, sizeof(*w), cmp_str);\n    printf("%s\\n", w[0]); free(w); return 0;\n}`,
        sampleStdin: '3\nzebra apple mango',
        expectedOutput: 'apple',
      },
      {
        id: 'c-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Count Pairs Matching Sum via bsearch',
        prompt: 'Read n, target and n unique ints; sort and count how many `x` have `target - x` present via `bsearch`.',
        banglaHint: '`bsearch(&need, ...)` দিয়ে চেক করো (`need > a[i]` ধরলে ডুপ্লিকেট এড়ায়)।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *pa, const void *pb) { int a=*(const int*)pa, b=*(const int*)pb; return (a>b)-(a<b); }\nint main(void) {\n    int n, t; if (scanf("%d %d", &n, &t) != 2) return 0;\n    int *a = malloc((size_t)n * sizeof(int)); for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n    qsort(a, (size_t)n, sizeof(int), cmp);\n    int cnt = 0;\n    for (int i = 0; i < n; i++) {\n        int need = t - a[i];\n        if (need > a[i] && bsearch(&need, a, (size_t)n, sizeof(int), cmp)) cnt++;\n    }\n    printf("%d\\n", cnt); free(a); return 0;\n}`,
        sampleStdin: '5 10\n2 4 6 8 5',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Multi-Key Priority Sort Tie-Breaker',
        prompt: 'Read n `(name, score)` records; print highest score (tie-break smallest name alphabetically).',
        banglaHint: '`strcmp` দিয়ে টাই-ব্রেক কম্পারেটর লিখো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\ntypedef struct { char name[32]; int score; } Rec;\nint cmp_rec(const void *pa, const void *pb) {\n    const Rec *a = pa, *b = pb;\n    if (a->score != b->score) return (b->score > a->score) - (b->score < a->score);\n    return strcmp(a->name, b->name);\n}\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    Rec *r = malloc((size_t)n * sizeof(Rec));\n    for (int i = 0; i < n; i++) scanf("%31s %d", r[i].name, &r[i].score);\n    qsort(r, (size_t)n, sizeof(Rec), cmp_rec);\n    printf("%s %d\\n", r[0].name, r[0].score); free(r); return 0;\n}`,
        sampleStdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
    ],
    miniBuild: {
      title: 'C23 Mini Build: qsort Frequency Mode Finder',
      description: 'Sorts input via stdlib qsort and extracts the most frequent element with tie-breaking.',
      banglaGoal: 'C stdlib `qsort` ব্যবহার করে ফ্রিকোয়েন্সি অ্যানালিটিক্স তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    qsort(a, (size_t)n, sizeof(int), cmp);
    int best = a[0], best_c = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        if (a[i] == a[i - 1]) cur++;
        else cur = 1;
        if (cur > best_c) { best_c = cur; best = a[i]; }
    }
    printf("%d %d\\n", best, best_c);
    free(a);
    return 0;
}`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  cpp: {
    title: 'C++ Chapter 9 (C++23): C++ STL (map, unordered_map, priority_queue, ranges::sort)',
    banglaTitle: 'C++ অধ্যায় ৯ (C++23): C++ STL (map, unordered_map, priority_queue, sort)',
    subtitle: 'Master std::map O(log n), unordered_map + splitmix64 anti-hack hash, priority_queue heaps, and C++23 ranges::sort.',
    zeroIntuition: {
      plainEnglishStory:
        'The C++ Standard Template Library (STL) is every competitive programmer’s superpower: `std::map` gives auto-sorted O(log n) Red-Black Tree keys (automatically resolving tie-breaks!), `std::unordered_map` gives O(1) average lookup (pair with custom `splitmix64` hash to prevent Codeforces collision hacks!), and `std::priority_queue` maintains Top-K heaps in O(log n)!',
      asciiFlowchart: `  C++ STL CONTAINER SELECTION GUIDE
  Need sorted keys + tie-break? ---> std::map<K, V>           O(log n)
  Need max speed lookup?        ---> std::unordered_map<K, V> O(1) avg (+ custom hash!)
  Need repeated Top/Min item?   ---> std::priority_queue<T>   O(log n) push/pop
  Need sorted array/records?    ---> std::ranges::sort        O(n log n)`,
      pseudocode: [
        '1. CHOOSE `std::map` when sorted key iteration or natural smallest tie-break is needed',
        '2. ADD custom `splitmix64` hash on `unordered_map` in adversarial contests',
        '3. USE `std::priority_queue<T, vector<T>, greater<T>>` for a Min-Heap',
        '4. USE `std::ranges::sort(v, cmp)` for clean multi-key sorting',
        '5. USE `.contains(key)` (C++20+) instead of `m[key]` when reading (avoid accidental insertion!)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সাজানো ডিকশনারি (`std::map`) বনাম তাৎক্ষণিক লকার (`unordered_map`)',
        explanation:
          'ধরো একটি লাইব্রেরিতে সব বই বর্ণমালা অনুযায়ী সাজানো (`std::map` = `O(log n)`)—তাই যেকোনো বই খুঁজতে একটু সময় লাগলেও সব বই সবসময় সাজানো অবস্থায় পাওয়া যায়! আর `unordered_map` হলো জাদুকরী লকার যেখানে চাবি দেখেই `O(1)` সময়ে জিনিস পাওয়া যায়, তবে কনটেস্টে কিছু চালাক টেস্টকেস হ্যাশ কলিশন ঘটিয়ে এটি স্লো করে দিতে পারে—তাই `splitmix64` কাস্টম হ্যাশ ব্যবহার করা সেফ!',
        everydayExample:
          'কলেজের রোল নম্বর সিরিয়ালে রাখা খাতা হলো `std::map`, আর টোকেন নম্বর দিয়ে সরাসরি বক্স খোঁজা হলো `unordered_map`।',
        keyTakeaways: [
          '`m[key]` দিয়ে কোনো কী পড়লে সেটি ম্যাপে না থাকলেও `0` ভ্যালুসহ নতুন কী তৈরি করে দেয়! শুধু চেক করতে `m.contains(key)` বা `m.find(key)` ব্যবহার করো।',
          '`std::priority_queue<int>` ডিফল্টভাবে Max-Heap; Min-Heap চাইলে `greater<int>` দিতে হয়।',
          'Codeforces কনটেস্টে `unordered_map` ব্যবহার করলে `chrono` ভিত্তিক `splitmix64` হ্যাশ ফাংশন ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: std::map Ordered Frequency Counter',
        banglaNote: '`std::map` ব্যবহার করে স্বয়ংক্রিয়ভাবে ছোট কী-এর টাই-ব্রেকসহ সর্বাধিক ফ্রিকোয়েন্সি নির্ণয়।',
        code: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, x;
    if (!(cin >> n)) return 0;
    map<int, int> freq;
    for (int i = 0; i < n; i++) { cin >> x; freq[x]++; }
    int best = 0, bestC = -1;
    for (const auto &[k, v] : freq) {
        if (v > bestC) { bestC = v; best = k; }
    }
    cout << best << " " << bestC << "\\n";
    return 0;
}`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'cpp-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe .contains() vs Accidental m[key] Insertion',
        banglaNote: '`m.contains(k)` ব্যবহার করে অপ্রয়োজনীয় কী ইনসার্শন থেকে ম্যাপের সাইজ ঠিক রাখা।',
        code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> m = {{"alice", 50}};
    string q;
    if (cin >> q) {
        int score = m.contains(q) ? m[q] : -1;
        cout << "score=" << score << " map_size=" << m.size() << "\\n";
    }
    return 0;
}`,
        stdin: 'bob',
        expectedOutput: 'score=-1 map_size=1',
      },
      {
        id: 'cpp-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Anti-Hack splitmix64 Custom Hash on unordered_map',
        banglaNote: 'হ্যাশ কলিশন হ্যাক থেকে বাঁচতে `splitmix64` হ্যাশ ফাংশন দিয়ে O(1) `unordered_map`।',
        code: `#include <cstdint>
#include <iostream>
#include <unordered_map>
using namespace std;

struct CustomHash {
    size_t operator()(uint64_t x) const noexcept {
        x += 0x9e3779b97f4a7c15ULL;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9ULL;
        x = (x ^ (x >> 27)) * 0x94d049bb133111ebULL;
        return static_cast<size_t>(x ^ (x >> 31));
    }
};

int main() {
    int n; uint64_t x;
    if (!(cin >> n)) return 0;
    unordered_map<uint64_t, int, CustomHash> freq;
    freq.reserve(static_cast<size_t>(n));
    for (int i = 0; i < n; i++) { cin >> x; freq[x]++; }
    cout << "unique=" << freq.size() << "\\n";
    return 0;
}`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: 'unique=3',
      },
      {
        id: 'cpp-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Min-Heap priority_queue + std::ranges::sort Multi-Key',
        banglaNote: 'Min-Heap (`greater<int>`) দিয়ে K-তম বৃহত্তম উপাদান O(n log k) সময়ে বের করা।',
        code: `#include <functional>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    int n, k, x;
    if (!(cin >> n >> k)) return 0;
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int i = 0; i < n; i++) {
        cin >> x;
        minHeap.push(x);
        if (static_cast<int>(minHeap.size()) > k) minHeap.pop();
    }
    cout << minHeap.top() << "\\n";
    return 0;
}`,
        stdin: '5 2\n10 4 50 2 30',
        expectedOutput: '30',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'map<int, int> freq;',
        whatItMeans: 'Instantiates an ordered Red-Black Tree dictionary sorted by key ascending.',
        whyItIsThere: 'Visiting keys in ascending order automatically breaks frequency ties in favor of the smallest key.',
        ifDeletedError: '`freq` is undeclared.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'freq[x]++;',
        whatItMeans: 'Inserts `x -> 0` if missing, then increments its frequency in O(log n).',
        whyItIsThere: 'Aggregates frequencies cleanly in a single concise statement.',
        ifDeletedError: 'Counts stay 0.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'for (const auto &[k, v] : freq)',
        whatItMeans: 'Structured binding iterating ordered `(key, count)` pairs by const reference.',
        whyItIsThere: 'Zero copies while picking the highest count.',
        ifDeletedError: 'Winner cannot be selected.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Insert 4, 1, 2, 1, 2, 1', memoryOrStack: 'map { 1:3, 2:2, 4:1 }', note: 'Keys stored sorted: 1 < 2 < 4' },
      { step: 2, state: 'Visit (1, 3)', memoryOrStack: 'best=1, bestC=3', note: '3 > -1 updates best' },
      { step: 3, state: 'Visit (2, 2), (4, 1)', memoryOrStack: 'best stays 1, bestC=3', note: 'Strict > keeps smaller key on ties' },
      { step: 4, state: 'cout << "1 3\\n"', memoryOrStack: 'stdout: 1 3', note: 'Clean RAII cleanup' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `unordered_map` Without `reserve` / Custom Hash on Codeforces',
        brokenCode: `unordered_map<long long, int> m; // Hackable to O(n^2) TLE!`,
        fixedCode: `unordered_map<long long, int, CustomHash> m; // Or use std::map<long long, int>`,
        whyItBreaks: 'Adversarial inputs force all keys into bucket #0 using multiples of std::hash prime!',
      },
      {
        title: 'Trap 2: Checking Presence via `if (m[key] > 0)` Mutates the Map',
        brokenCode: `if (m[missing] > 0) ... // Inserts {missing: 0} into m!`,
        fixedCode: `if (m.contains(missing)) ... // Read-only check (C++20/23)`,
        whyItBreaks: '`operator[]` silently creates a zero-initialized entry if `key` doesn’t exist yet.',
      },
      {
        title: 'Trap 3: Comparator Using `<=` Instead of Strict `<` in `std::sort`',
        brokenCode: `sort(v.begin(), v.end(), [](int a, int b) { return a <= b; }); // Segfault / UB!`,
        fixedCode: `ranges::sort(v, [](int a, int b) { return a < b; });`,
        whyItBreaks: 'Violates strict weak ordering: `comp(x, x)` MUST return `false`!',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Count Unique Numbers With std::set',
        prompt: 'Read n and n ints; print unique count using `std::set<int>`.',
        banglaHint: '`set<int> s;` এ ইনসার্ট করে `s.size()` প্রিন্ট করো।',
        starterCode: `#include <iostream>\n#include <set>\nusing namespace std;\nint main() { int n, x; if (!(cin >> n)) return 0; set<int> s; for (int i = 0; i < n; i++) { cin >> x; s.insert(x); } cout << s.size() << "\\n"; }`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'cpp-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Sort & Remove Adjacent Duplicates via std::ranges::sort',
        prompt: 'Read n and n ints; sort ascending and print unique space-separated list.',
        banglaHint: '`ranges::sort(a)` ও `ranges::unique(a)` ব্যবহার করো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0; vector<int> a(n); for (int &x : a) cin >> x;\n    ranges::sort(a); auto ret = ranges::unique(a); a.erase(ret.begin(), ret.end());\n    for (size_t i = 0; i < a.size(); i++) cout << a[i] << (i + 1 == a.size() ? "\\n" : " ");\n}`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 2 4',
      },
      {
        id: 'cpp-ch-9-q3',
        difficulty: 'Medium',
        title: '3. O(n) Two-Sum Using Custom-Hashed unordered_map',
        prompt: 'Read n, target and n ints; output `0/1` whether any pair sums to target.',
        banglaHint: '`seen.contains(target - x)` চেক করো।',
        starterCode: `#include <iostream>\n#include <unordered_map>\nusing namespace std;\nint main() {\n    int n; long long target, x; if (!(cin >> n >> target)) return 0;\n    unordered_map<long long, int> seen;\n    for (int i = 0; i < n; i++) {\n        cin >> x;\n        if (seen.contains(target - x)) { cout << "1\\n"; return 0; }\n        seen[x] = i;\n    }\n    cout << "0\\n";\n}`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'cpp-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Min-Heap Running Rope Connect Cost',
        prompt: 'Read n rope lengths; repeatedly merge two smallest ropes via Min-Heap and print total cost.',
        banglaHint: '`priority_queue<long long, vector<long long>, greater<>> pq` ব্যবহার করো।',
        starterCode: `#include <functional>\n#include <iostream>\n#include <queue>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n)) return 0;\n    priority_queue<long long, vector<long long>, greater<>> pq;\n    for (int i = 0; i < n; i++) { long long x; cin >> x; pq.push(x); }\n    long long cost = 0;\n    while (pq.size() > 1) { long long a = pq.top(); pq.pop(); long long b = pq.top(); pq.pop(); cost += a + b; pq.push(a + b); }\n    cout << cost << "\\n";\n}`,
        sampleStdin: '4\n4 3 2 6',
        expectedOutput: '29',
      },
      {
        id: 'cpp-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Multi-Key Custom Lambda Sort Leaderboard',
        prompt: 'Read n `(name, score)` rows; sort score descending then name ascending and print top entry.',
        banglaHint: '`ranges::sort(v, [](auto &a, auto &b) { ... })` লিখো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if (!(cin >> n) || n <= 0) return 0;\n    vector<pair<string, int>> v(n);\n    for (auto &[nm, sc] : v) cin >> nm >> sc;\n    ranges::sort(v, [](const auto &a, const auto &b) {\n        if (a.second != b.second) return a.second > b.second;\n        return a.first < b.first;\n    });\n    cout << v[0].first << " " << v[0].second << "\\n";\n}`,
        sampleStdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Ordered Map Mode Engine',
      description: 'Aggregates frequencies cleanly in std::map and resolves ties deterministically.',
      banglaGoal: 'C++ STL `std::map` দিয়ে নির্ভুল ফ্রিকোয়েন্সি ও মোড নির্ণয়।',
      combinesChapters: 'Ch 1–9',
      starterCode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n, x;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) { cin >> x; freq[x]++; }
    int best = 0, bestC = -1;
    for (auto &[k, v] : freq) {
        if (v > bestC) { bestC = v; best = k; }
    }
    cout << best << " " << bestC << "\\n";
    return 0;
}`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  python: {
    title: 'Python Chapter 9 (Python 3.13): collections (Counter, deque), heapq & sorted()',
    banglaTitle: 'Python অধ্যায় ৯ (Python 3.13): collections, heapq ও কাস্টম সর্টিং',
    subtitle: 'Master Counter, defaultdict, O(1) deque queues, heapq min/max heaps, and multi-key lambda sorting.',
    zeroIntuition: {
      plainEnglishStory:
        'Python’s Standard Library ships "batteries included": `collections.Counter` counts frequencies in C speed, `deque` gives true O(1) `popleft()` for BFS/sliding windows, `heapq` gives an O(log n) Min-Heap, and `min(items, key=lambda kv: (-kv[1], kv[0]))` finds the Top-1 winner in O(n) without even sorting the entire dictionary!',
      asciiFlowchart: `  PYTHON 3.13 COLLECTIONS TOOLBELT
  Frequency count?  --> Counter(arr)              O(n)
  FIFO Queue / BFS? --> deque() + .popleft()      O(1)
  Priority Heap?    --> heapq.heappush / heappop  O(log n)
  Multi-key sort?   --> sorted(items, key=lambda x: (-x.score, x.name))`,
      pseudocode: [
        '1. COUNT elements in 1 line with `Counter(nums)`',
        '2. PICK tie-broken winner in O(n) via `min(counts.items(), key=lambda kv: (-kv[1], kv[0]))`',
        '3. USE `deque` instead of `list.pop(0)` for FIFO queues',
        '4. USE `heapq` (push `-x` for a Max-Heap) for streaming Top-K queries',
        '5. USE `set` for O(1) membership lookups (`if need in seen`)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রেডিমেড কিচেন মিক্সার (`Counter`, `deque`, `heapq`)',
        explanation:
          'রান্না করার জন্য নিজের হাতে মশলা না বেটে যেমন মিক্সার (`Counter`) চালালেই এক সেকেন্ডে কাজ শেষ হয়, Python-এর `collections` ঠিক তেমনই! `Counter(arr)` এক লাইনে সব সংখ্যার হিসাব করে দেয়, `deque` দুই পাশ থেকেই `O(1)` সময়ে আইটেম যোগ/বাদ দেয়, আর `min(..., key=lambda kv: (-kv[1], kv[0]))` দিয়ে এক পাসে সর্বোচ্চ ফ্রিকোয়েন্সি ও ছোট কী বের করা যায়!',
        everydayExample:
          'ভোট গণনার মেশিন (`Counter`): সব ব্যালট ঢেলে দিলেই মুহূর্তে প্রতিটি প্রার্থীর ভোটের সংখ্যা বলে দেয়!',
        keyTakeaways: [
          '`x in my_set` বা `my_dict` খোঁজা O(1), কিন্তু `x in my_list` খোঁজা O(n)!',
          'Python-এর `heapq` শুধু Min-Heap; Max-Heap বানাতে চাইলে সংখ্যা `-x` করে পুশ করবে।',
          '`sorted(..., key=...)` Python-এর **Timsort** ব্যবহার করে যা অত্যন্ত দ্রুত এবং Stable।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: collections.Counter + Multi-Key Tie-Breaker',
        banglaNote: '`Counter` ও `min(..., key=lambda kv: (-kv[1], kv[0]))` দিয়ে এক পাসে মোড নির্ণয়।',
        code: `import sys
from collections import Counter

nums = list(map(int, sys.stdin.read().split()))
if nums:
    counts = Counter(nums[1:1 + nums[0]])
    best_k, best_v = min(counts.items(), key=lambda kv: (-kv[1], kv[0]))
    print(best_k, best_v)`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'py-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: defaultdict(list) Grouping Without KeyError',
        banglaNote: 'কী না থাকলেও `KeyError` ছাড়াই অটো খালি লিস্ট তৈরি করে গ্রুপ বানানো।',
        code: `import sys
from collections import defaultdict

words = sys.stdin.read().split()
groups: defaultdict[int, list[str]] = defaultdict(list)
for w in words:
    groups[len(w)].append(w)
for length in sorted(groups):
    print(f"{length}:{','.join(groups[length])}")`,
        stdin: 'hi cat dog go rust',
        expectedOutput: '2:hi,go\n3:cat,dog\n4:rust',
      },
      {
        id: 'py-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: heapq Running Rope Merge in O(n log n)',
        banglaNote: '`heapq` Min-Heap ব্যবহার করে সর্বনিম্ন খরচে দড়ি জোড়া লাগানো।',
        code: `import heapq
import sys

nums = list(map(int, sys.stdin.read().split()))
if nums:
    h = nums[1:1 + nums[0]]
    heapq.heapify(h)
    cost = 0
    while len(h) > 1:
        a = heapq.heappop(h)
        b = heapq.heappop(h)
        cost += a + b
        heapq.heappush(h, a + b)
    print(cost)`,
        stdin: '4\n4 3 2 6',
        expectedOutput: '29',
      },
      {
        id: 'py-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: O(n) Monotonic Sliding Window Maximum via deque',
        banglaNote: '`collections.deque` দিয়ে প্রতিটি উইন্ডোর সর্বোচ্চ উপাদান মাত্র O(n) সময়ে বের করা!',
        code: `import sys
from collections import deque

nums = list(map(int, sys.stdin.read().split()))
n, k = nums[0], nums[1]
arr = nums[2:2 + n]
dq: deque[int] = deque()
ans = []
for i, v in enumerate(arr):
    while dq and dq[0] <= i - k:
        dq.popleft()
    while dq and arr[dq[-1]] <= v:
        dq.pop()
    dq.append(i)
    if i >= k - 1:
        ans.append(str(arr[dq[0]]))
print(" ".join(ans))`,
        stdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 2',
        codeSnippet: 'from collections import Counter',
        whatItMeans: 'Imports C-optimized frequency dictionary subclass.',
        whyItIsThere: 'Tallies element frequencies in O(n) without manual `if k in d` boilerplate.',
        ifDeletedError: 'NameError: `Counter` is not defined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'counts = Counter(nums[1:1 + nums[0]])',
        whatItMeans: 'Builds `{element: frequency}` hash map across payload slice.',
        whyItIsThere: 'Avoids counting header `n` inside the frequency table.',
        ifDeletedError: '`counts` undefined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'best_k, best_v = min(counts.items(), key=lambda kv: (-kv[1], kv[0]))',
        whatItMeans: 'Selects highest count (`-kv[1]` smallest), breaking ties by smallest key (`kv[0]`).',
        whyItIsThere: 'Runs in O(u) time instead of O(u log u) full sort.',
        ifDeletedError: 'Does not find the mode or breaks ties unpredictably.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Counter([4,1,2,1,2,1])', memoryOrStack: '{4:1, 1:3, 2:2}', note: 'O(n) hash map tally' },
      { step: 2, state: 'Compute keys (-v, k)', memoryOrStack: '( -1,4 ), ( -3,1 ), ( -2,2 )', note: 'Negative count prioritizes highest frequency' },
      { step: 3, state: 'min(...) picks (-3, 1)', memoryOrStack: 'best_k=1, best_v=3', note: 'Tie-breaks smallest k cleanly' },
      { step: 4, state: 'print(1, 3)', memoryOrStack: 'stdout: 1 3', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `x in my_list` Inside a Loop (O(n^2) TLE!)',
        brokenCode: `for x in queries:\n    if x in big_list: ... # Linear scan every time!`,
        fixedCode: `big_set = set(big_list)\nfor x in queries:\n    if x in big_set: ... # O(1) lookup!`,
        whyItBreaks: '`in` on a `list` scans from index 0; converting to a `set` makes each lookup O(1).',
      },
      {
        title: 'Trap 2: Modifying a `dict` or `set` Size While Iterating Over It',
        brokenCode: `for k in d:\n    if d[k] == 0: del d[k] # RuntimeError: dictionary changed size!`,
        fixedCode: `d = {k: v for k, v in d.items() if v != 0}`,
        whyItBreaks: 'Python raises `RuntimeError` if keys are added/removed during iteration.',
      },
      {
        title: 'Trap 3: Calling `d[k]` on Plain `dict` Instead of `d.get(k, 0)`',
        brokenCode: `d = {}; d['x'] += 1 # KeyError: 'x'!`,
        fixedCode: `d['x'] = d.get('x', 0) + 1  # or use defaultdict(int)`,
        whyItBreaks: 'Plain `dict` raises `KeyError` on missing key access.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Count Unique Numbers With set()',
        prompt: 'Read n and n ints; print number of distinct ints using `set`.',
        banglaHint: '`len(set(nums[1:1+nums[0]]))` প্রিন্ট করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nprint(len(set(nums[1:1 + nums[0]])))`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'py-ch-9-q2',
        difficulty: 'Easy',
        title: '2. O(n) Two-Sum Using Hash Set',
        prompt: 'Read n, target and n ints; print `1` if any pair sums to target else `0`.',
        banglaHint: '`if target - x in seen:` ব্যবহার করো।',
        starterCode: `import sys\nnums = list(map(int, sys.stdin.read().split()))\nn, t = nums[0], nums[1]; seen = set()\nfor x in nums[2:2 + n]:\n    if t - x in seen: print(1); sys.exit(0)\n    seen.add(x)\nprint(0)`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'py-ch-9-q3',
        difficulty: 'Medium',
        title: '3. Kth Largest via Min-Heap (heapq)',
        prompt: 'Read n, k and n ints; find kth largest element keeping heap size <= k.',
        banglaHint: '`if len(h) > k: heapq.heappop(h)` চালাও।',
        starterCode: `import heapq, sys\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]; h = []\nfor x in nums[2:2 + n]:\n    heapq.heappush(h, x)\n    if len(h) > k: heapq.heappop(h)\nprint(h[0])`,
        sampleStdin: '5 2\n10 4 50 2 30',
        expectedOutput: '30',
      },
      {
        id: 'py-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Sort Records by Multi-Key Tuple',
        prompt: 'Read n `(name, score)` rows; print top winner (score desc, name asc).',
        banglaHint: '`min(rows, key=lambda r: (-int(r[1]), r[0]))` ব্যবহার করো।',
        starterCode: `import sys\nlines = sys.stdin.read().strip().splitlines()\nrows = [ln.split() for ln in lines[1:1 + int(lines[0])]]\nw = min(rows, key=lambda r: (-int(r[1]), r[0]))\nprint(w[0], w[1])`,
        sampleStdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
      {
        id: 'py-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Sliding Window Maximum With collections.deque',
        prompt: 'Read n, k and n ints; output maximum of each contiguous window of length k.',
        banglaHint: '`deque`-এর সামনে পুরোনো ইনডেক্স পপ ও পেছনে ছোট মান পপ করো।',
        starterCode: `import sys\nfrom collections import deque\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1]; a = nums[2:2 + n]\ndq, out = deque(), []\nfor i, x in enumerate(a):\n    while dq and dq[0] <= i - k: dq.popleft()\n    while dq and a[dq[-1]] <= x: dq.pop()\n    dq.append(i)\n    if i >= k - 1: out.append(str(a[dq[0]]))\nprint(" ".join(out))`,
        sampleStdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: Counter Mode & Tie-Breaker',
      description: 'Computes exact frequencies via collections.Counter and breaks ties in O(n) time.',
      banglaGoal: 'Python `Counter` ও ল্যাম্বডা টাই-ব্রেকার দিয়ে ফ্রিকোয়েন্সি ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `import sys
from collections import Counter

nums = list(map(int, sys.stdin.read().split()))
counts = Counter(nums[1:1 + nums[0]])
best_k, best_v = min(counts.items(), key=lambda kv: (-kv[1], kv[0]))
print(best_k, best_v)`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  java: {
    title: 'Java Chapter 9 (Java 21): Collections Framework, PriorityQueue & Streams',
    banglaTitle: 'Java অধ্যায় ৯ (Java 21): কালেকশনস ফ্রেমওয়ার্ক, PriorityQueue ও স্ট্রিম',
    subtitle: 'Master HashMap vs TreeMap, PriorityQueue heaps, Comparator.comparingInt tie-breakers, and Java 21 Stream pipelines.',
    zeroIntuition: {
      plainEnglishStory:
        'Java’s `java.util` Collections Framework provides production-grade containers: `HashMap` for O(1) average lookup, `TreeMap` for auto-sorted O(log n) keys, `PriorityQueue` for O(log n) Min/Max Heaps, and `Comparator` chains so multi-key sorting (`score DESC, name ASC`) reads like plain English!',
      asciiFlowchart: `  JAVA COLLECTIONS FRAMEWORK SELECTION
  Map<K,V>   ---> HashMap (O(1) unordered) | TreeMap (O(log n) sorted keys!)
  Set<T>     ---> HashSet (O(1) distinct)  | TreeSet (O(log n) ordered)
  Queue<T>   ---> PriorityQueue (Min-Heap) | ArrayDeque (O(1) FIFO/Stack)`,
      pseudocode: [
        '1. TALLY frequencies concisely with `map.merge(x, 1, Integer::sum)` or `getOrDefault`',
        '2. USE `TreeMap` when sorted keys are needed for tie-breaking',
        '3. SORT `List<T>` using `Comparator.comparingInt(...).thenComparing(...)`',
        '4. USE `PriorityQueue` for O(n log k) Top-K streaming problems',
        '5. USE `ArrayDeque` instead of legacy `Stack` or `LinkedList`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'Java-র সাজানো ক্যাটালগ (`TreeMap`) ও প্রায়োরিটি লাইন (`PriorityQueue`)',
        explanation:
          '`HashMap` দ্রুত হলেও এর ভেতরে কীগুলো এলোমেলো থাকে। কিন্তু `TreeMap` ব্যবহার করলে সব কী ছোট থেকে বড় সাজানো থাকে—ফলে `freq.entrySet()` লুপ চালালে টাই হলে ছোট সংখ্যাটিই অটো প্রথম আসে! আর `PriorityQueue` হলো হাসপাতালের ইমার্জেন্সি লাইন: সবার শেষে এসেও সবচেয়ে ছোট (বা গুরুত্বপূর্ণ) আইটেমটি আগে সেবা পায়!',
        everydayExample:
          'বোর্ডিং পাস: সাধারণ কিউতে যে আগে আসে সে আগে যায় (`ArrayDeque`), কিন্তু প্রায়োরিটি লাইনে (`PriorityQueue`) র‍্যাংক অনুসারে আগে বের হয়!',
        keyTakeaways: [
          '`map.merge(k, 1, Integer::sum)` এক লাইনেই সুন্দর ফ্রিকোয়েন্সি কাউন্ট করে।',
          '`List.sort` অবজেক্টের জন্য **Timsort** ব্যবহার করে যা Stable ও O(n log n) গ্যারান্টিড।',
          'Java-তে `Stack` ক্লাসটি পুরোনো ও ধীর—তার বদলে সবসময় `ArrayDeque` ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: TreeMap Ordered Frequency Mode',
        banglaNote: '`TreeMap` ব্যবহার করে সাজানো অর্ডারে ফ্রিকোয়েন্সি হিসাব ও টাই-ব্রেক।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        TreeMap<Integer, Integer> freq = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            freq.merge(sc.nextInt(), 1, Integer::sum);
        }
        int best = 0, bestC = -1;
        for (var e : freq.entrySet()) {
            if (e.getValue() > bestC) { bestC = e.getValue(); best = e.getKey(); }
        }
        System.out.println(best + " " + bestC);
    }
}`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'java-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Integer Overflow-Safe Comparator (Integer.compare)',
        banglaNote: '`a - b` বিয়োগ করে কম্পারেটর লিখলে ওভারফ্লো হয়—`Integer.compare(a, b)` ব্যবহার করা নিরাপদ!',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> list = new ArrayList<>();
        while (sc.hasNextInt()) list.add(sc.nextInt());
        list.sort(Integer::compare);
        System.out.println(list.get(0) + " " + list.get(list.size() - 1));
    }
}`,
        stdin: '2000000000 -2000000000 0',
        expectedOutput: '-2000000000 2000000000',
      },
      {
        id: 'java-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: PriorityQueue Min-Heap Running Rope Merge',
        banglaNote: '`PriorityQueue<Long>` দিয়ে O(n log n) সময়ে সর্বনিম্ন দড়ি জোড়া খরচ।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        PriorityQueue<Long> pq = new PriorityQueue<>();
        for (int i = 0; i < n; i++) pq.add(sc.nextLong());
        long cost = 0;
        while (pq.size() > 1) {
            long merged = pq.poll() + pq.poll();
            cost += merged;
            pq.add(merged);
        }
        System.out.println(cost);
    }
}`,
        stdin: '4\n4 3 2 6',
        expectedOutput: '29',
      },
      {
        id: 'java-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Multi-Key Record Sort With Comparator Chain',
        banglaNote: '`Comparator.comparingInt(Rec::score).reversed().thenComparing(Rec::name)` দিয়ে ১ লাইনে সর্ট!',
        code: `import java.util.*;

public class Main {
    record Rec(String name, int score) {}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Rec> list = new ArrayList<>();
        for (int i = 0; i < n; i++) list.add(new Rec(sc.next(), sc.nextInt()));
        list.sort(Comparator.comparingInt(Rec::score).reversed().thenComparing(Rec::name));
        System.out.println(list.get(0).name() + " " + list.get(0).score());
    }
}`,
        stdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'TreeMap<Integer, Integer> freq = new TreeMap<>();',
        whatItMeans: 'Creates a Red-Black Tree map keeping keys sorted ascending.',
        whyItIsThere: 'Automatically orders entries so smaller keys tie-break earlier.',
        ifDeletedError: '`freq` is undefined.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'freq.merge(sc.nextInt(), 1, Integer::sum);',
        whatItMeans: 'Inserts `1` if key is absent, or sums existing value with `1`.',
        whyItIsThere: 'Concise idiomatic alternative to `put(x, getOrDefault(x, 0) + 1)`.',
        ifDeletedError: 'Frequencies stay empty.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'for (var e : freq.entrySet())',
        whatItMeans: 'Iterates ordered key-value pairs using Java local variable type inference (`var`).',
        whyItIsThere: 'Finds maximum frequency in one clean loop.',
        ifDeletedError: 'Cannot select the mode.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'freq.merge on [4,1,2,1,2,1]', memoryOrStack: 'TreeMap {1:3, 2:2, 4:1}', note: 'Keys balanced in sorted tree' },
      { step: 2, state: 'Iterate entrySet: (1,3)', memoryOrStack: 'best=1, bestC=3', note: 'First entry has highest count' },
      { step: 3, state: 'Visit (2,2), (4,1)', memoryOrStack: 'best=1 unchanged', note: 'Strict > keeps tie-winner 1' },
      { step: 4, state: 'println("1 3")', memoryOrStack: 'stdout: 1 3', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Comparator Subtraction `(a, b) -> a - b` Overflow Bug',
        brokenCode: `list.sort((a, b) -> a - b); // Overflows on Integer.MIN_VALUE!`,
        fixedCode: `list.sort(Integer::compare);`,
        whyItBreaks: 'Subtracting `-2e9 - 2e9` wraps positive, reversing comparator contract!',
      },
      {
        title: 'Trap 2: Removing Elements Inside Enhanced For-Each Loop',
        brokenCode: `for (Integer x : list) if (x < 0) list.remove(x); // ConcurrentModificationException!`,
        fixedCode: `list.removeIf(x -> x < 0);`,
        whyItBreaks: 'Mutating collection structure during enhanced for-loop triggers `ConcurrentModificationException`.',
      },
      {
        title: 'Trap 3: Calling `Arrays.asList(...)` and Trying `.add()`',
        brokenCode: `List<Integer> l = Arrays.asList(1, 2); l.add(3); // UnsupportedOperationException!`,
        fixedCode: `List<Integer> l = new ArrayList<>(List.of(1, 2)); l.add(3);`,
        whyItBreaks: '`Arrays.asList` and `List.of` return fixed-size/unmodifiable lists.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Count Distinct Elements via HashSet',
        prompt: 'Read n and n ints; print distinct element count using `HashSet<Integer>`.',
        banglaHint: '`HashSet<Integer>`-এ সব যোগ করে `.size()` প্রিন্ট করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt();\n        Set<Integer> s = new HashSet<>(); for (int i = 0; i < n; i++) s.add(sc.nextInt());\n        System.out.println(s.size());\n    }\n}`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'java-ch-9-q2',
        difficulty: 'Easy',
        title: '2. O(n) Two-Sum via HashSet',
        prompt: 'Read n, target and n ints; output `1` if pair sums to target else `0`.',
        banglaHint: '`if (seen.contains(target - x))` চেক করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt(); long t = sc.nextLong();\n        Set<Long> seen = new HashSet<>();\n        for (int i = 0; i < n; i++) {\n            long x = sc.nextLong();\n            if (seen.contains(t - x)) { System.out.println(1); return; }\n            seen.add(x);\n        }\n        System.out.println(0);\n    }\n}`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'java-ch-9-q3',
        difficulty: 'Medium',
        title: '3. Kth Largest Using PriorityQueue',
        prompt: 'Read n, k and n ints; print kth largest keeping heap size <= k.',
        banglaHint: '`if (pq.size() > k) pq.poll();` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt(), k = sc.nextInt();\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (int i = 0; i < n; i++) { pq.add(sc.nextInt()); if (pq.size() > k) pq.poll(); }\n        System.out.println(pq.peek());\n    }\n}`,
        sampleStdin: '5 2\n10 4 50 2 30',
        expectedOutput: '30',
      },
      {
        id: 'java-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Java 21 Stream Sum of Distinct Evens',
        prompt: 'Read n and n ints; use `.stream().filter(x -> x % 2 == 0).distinct().mapToInt(Integer::intValue).sum()`.',
        banglaHint: 'Stream `.filter()`, `.distinct()` ও `.sum()` চেইন করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt();\n        List<Integer> a = new ArrayList<>(); for (int i = 0; i < n; i++) a.add(sc.nextInt());\n        int sum = a.stream().filter(x -> (x & 1) == 0).distinct().mapToInt(Integer::intValue).sum();\n        System.out.println(sum);\n    }\n}`,
        sampleStdin: '6\n4 2 4 3 6 2',
        expectedOutput: '12',
      },
      {
        id: 'java-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Sliding Window Maximum With ArrayDeque',
        prompt: 'Read n, k and n ints; output maximum of each window of size k in O(n).',
        banglaHint: '`ArrayDeque<Integer>`-এ ইনডেক্স সংরক্ষণ করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in); int n = sc.nextInt(), k = sc.nextInt();\n        int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        Deque<Integer> dq = new ArrayDeque<>(); StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < n; i++) {\n            while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();\n            while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast();\n            dq.addLast(i);\n            if (i >= k - 1) { if (sb.length() > 0) sb.append(' '); sb.append(a[dq.peekFirst()]); }\n        }\n        System.out.println(sb);\n    }\n}`,
        sampleStdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: TreeMap Frequency Analyzer',
      description: 'Counts frequencies cleanly via TreeMap and outputs the deterministic mode.',
      banglaGoal: 'Java TreeMap দিয়ে ফ্রিকোয়েন্সি গণনা ও টাই-ব্রেকিং সলিউশন।',
      combinesChapters: 'Ch 1–9',
      starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        TreeMap<Integer, Integer> freq = new TreeMap<>();
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            freq.put(x, freq.getOrDefault(x, 0) + 1);
        }
        int best = 0, bestC = -1;
        for (var e : freq.entrySet()) {
            if (e.getValue() > bestC) { bestC = e.getValue(); best = e.getKey(); }
        }
        System.out.println(best + " " + bestC);
    }
}`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 9 (ES2025): Map, Set, Map.groupBy & Array Pipelines',
    banglaTitle: 'JavaScript অধ্যায় ৯ (ES2025): Map, Set, groupBy ও অ্যারে মেথড',
    subtitle: 'Master O(1) Map & Set vs plain objects, ES2024/2025 Object.groupBy / toSorted, and Fetch JSON response pipelines.',
    zeroIntuition: {
      plainEnglishStory:
        'Plain JS objects `{}` turn numeric keys into strings and collide with prototype keys like `"toString"` or `"constructor"`! Always use **`new Map()`** for dictionaries (preserves insertion order and accepts any key type!) and **`new Set()`** for O(1) membership, paired with ES2025 non-mutating `.toSorted()` and `Object.groupBy()`.',
      asciiFlowchart: `  ES2025 Map / Set vs PLAIN OBJECT {}
  {} (Object) ---> Keys forced to strings! Prototypes leak ("toString")!
  new Map()   ---> Real O(1) hash map, .size property, safe numeric keys!
  new Set()   ---> Real O(1) .has() lookup, instant deduplication!`,
      pseudocode: [
        '1. STORE key-value counts in `new Map()` instead of `{}`',
        '2. DEDUPLICATE items or check membership in O(1) via `new Set()`',
        '3. SORT cleanly without mutating using `.toSorted((a, b) => ...)`',
        '4. GROUP records cleanly with `Object.groupBy` / `Map` accumulator',
        '5. PARSE API payloads safely with `response.ok` checks before `await res.json()`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'নিরাপদ হ্যাশ-বক্স (`Map`, `Set`) ও নন-মিউটেটিং `toSorted()`',
        explanation:
          'JavaScript-এ সাধারণ অবজেক্ট `{}` ডিকশনারি হিসেবে ব্যবহার করলে দুটি বড় সমস্যা হয়: প্রথমত, কী `1` লিখলেও তা `"1"` স্ট্রিং হয়ে যায়, আর দ্বিতীয়ত `"toString"` বা `"constructor"` কী দিলে প্রোটোটাইপ ঝামেলা করে! কিন্তু `new Map()` এবং `new Set()` হলো আসল নিরাপদ ডেটা স্ট্রাকচার, যেখানে `.size` প্রপার্টিও থাকে এবং যেকোনো সংখ্যাই আসল সংখ্যা হিসেবেই থাকে!',
        everydayExample:
          'সাধারণ খোলা ঝুড়ি (`{}`) বনাম নম্বর লেখা লকার সিস্টেম (`Map`) ও ইউনিক টোকেন রেজিস্টার (`Set`)।',
        keyTakeaways: [
          'ডিকশনারির জন্য সবসময় `Map`, আর ইউনিক চেকের জন্য `Set` ব্যবহার করো (`.has()` হলো O(1))।',
          '`Array.from(map.entries()).toSorted(...)` মূল অ্যারে বদলায় না।',
          '`fetch()` করার পর `if (!res.ok) throw new Error(...)` চেক করা প্রতিটি ওয়েব অ্যাপে আবশ্যক।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Map Frequency Counter & Multi-Key Tie-Break Sort',
        banglaNote: '`new Map()` দিয়ে ফ্রিকোয়েন্সি গুনে `[...freq.entries()].toSorted()` দিয়ে মোড বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);

const freq = new Map();
for (let i = 1; i <= nums[0]; i++) {
  freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
}
const [[bestK, bestV]] = [...freq.entries()].toSorted((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'js-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Prototype Collision Guard (Map vs `{}`)',
        banglaNote: 'সাধারণ `{}` অবজেক্টে `"constructor"` খুঁজলে ফাংশন পাওয়া যায়, কিন্তু `Map` কখনো ভুল করে না!',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const keys = raw.trim().split(/\\s+/);
const counts = new Map();
for (const k of keys) counts.set(k, (counts.get(k) || 0) + 1);
console.log(\`constructor=\${counts.get('constructor') ?? 0} size=\${counts.size}\`);`,
        stdin: 'toString constructor argon',
        expectedOutput: 'constructor=1 size=3',
      },
      {
        id: 'js-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: O(n) Two-Sum Using Hash Set',
        banglaNote: '`Set.has()` ব্যবহার করে O(1) লুকআপে O(n) Two-Sum সমাধান।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const [n, target] = nums;
const seen = new Set();
let hit = 0;
for (let i = 2; i < 2 + n; i++) {
  if (seen.has(target - nums[i])) { hit = 1; break; }
  seen.add(nums[i]);
}
console.log(hit);`,
        stdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'js-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: ES2025 Object.groupBy + Safe JSON Pipeline',
        banglaNote: 'আধুনিক `Object.groupBy` (বা Map গ্রুপ) দিয়ে শব্দের দৈর্ঘ্য অনুযায়ী দ্রুত গ্রুপিং।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const words = raw.trim().split(/\\s+/);
const grouped = new Map();
for (const w of words) {
  const list = grouped.get(w.length) ?? [];
  list.push(w);
  grouped.set(w.length, list);
}
const out = [...grouped.entries()]
  .toSorted((a, b) => a[0] - b[0])
  .map(([len, arr]) => \`\${len}:\${arr.join(',')}\`);
console.log(out.join('\\n'));`,
        stdin: 'hi cat dog go rust',
        expectedOutput: '2:hi,go\n3:cat,dog\n4:rust',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const freq = new Map();',
        whatItMeans: 'Creates an empty hash map preserving numeric key types.',
        whyItIsThere: 'Provides O(1) `.get` / `.set` without prototype-key bugs.',
        ifDeletedError: 'ReferenceError: `freq` is not defined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);',
        whatItMeans: 'Increments frequency safely starting from 0 if missing.',
        whyItIsThere: 'Aggregates all array counts in O(n).',
        ifDeletedError: 'Map remains empty (`size === 0`).',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: '[...freq.entries()].toSorted((a, b) => b[1] - a[1] || a[0] - b[0]);',
        whatItMeans: 'Sorts `[key, count]` tuples by count DESC, breaking ties by key ASC.',
        whyItIsThere: 'Selects deterministic mode cleanly without mutating the Map.',
        ifDeletedError: 'Destructuring fails or wrong tie-break winner selected.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Loop nums[1..6] = [4,1,2,1,2,1]', memoryOrStack: 'Map { 4=>1, 1=>3, 2=>2 }', note: 'O(n) inserts' },
      { step: 2, state: 'Convert to entries array', memoryOrStack: '[[4,1], [1,3], [2,2]]', note: '3 unique entries' },
      { step: 3, state: 'toSorted(count desc, key asc)', memoryOrStack: '[[1,3], [2,2], [4,1]]', note: '[1,3] is first' },
      { step: 4, state: 'console.log("1 3")', memoryOrStack: 'stdout: 1 3', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using Plain `{}` as Hash Map When Keys Might Be `"toString"` or Numbers',
        brokenCode: `const map = {}; if (map["toString"]) // Truthy! Inherits Object.prototype.toString!`,
        fixedCode: `const map = new Map(); // Zero prototype keys`,
        whyItBreaks: 'Plain objects inherit methods from `Object.prototype`.',
      },
      {
        title: 'Trap 2: Checking `if (map.get(k))` When Value Is `0`',
        brokenCode: `if (map.get(k)) // False when stored count is 0!`,
        fixedCode: `if (map.has(k)) // Always checks actual key existence`,
        whyItBreaks: '`0` is falsy in JS, whereas `.has(k)` checks presence explicitly.',
      },
      {
        title: 'Trap 3: Calling `res.json()` Before Checking `if (!res.ok)` in `fetch`',
        brokenCode: `const data = await (await fetch(url)).json(); // Fails parsing HTML 404/500 error page!`,
        fixedCode: `const res = await fetch(url); if (!res.ok) throw new Error(res.statusText); const data = await res.json();`,
        whyItBreaks: 'HTTP 404/500 responses do NOT reject `fetch` promises automatically!',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Count Unique Elements via Set',
        prompt: 'Read n and n ints; output distinct count via `new Set(...).size`.',
        banglaHint: '`new Set(nums.slice(1, 1 + nums[0])).size` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconsole.log(new Set(nums.slice(1, 1 + nums[0])).size);`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'js-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Array.prototype.filter + reduce Sum of Evens',
        prompt: 'Read n and n ints; sum distinct even values.',
        banglaHint: '`Set` দিয়ে ইউনিক করে `.filter()` ও `.reduce()` চালাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst sum = [...new Set(nums.slice(1, 1 + nums[0]))].filter(x => (x & 1) === 0).reduce((a, b) => a + b, 0);\nconsole.log(sum);`,
        sampleStdin: '6\n4 2 4 3 6 2',
        expectedOutput: '12',
      },
      {
        id: 'js-ch-9-q3',
        difficulty: 'Medium',
        title: '3. O(n) Two-Sum Using Hash Set',
        prompt: 'Read n, target and n ints; print `1` if pair exists else `0`.',
        banglaHint: '`seen.has(target - x)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst [n, t] = nums; const seen = new Set(); let hit = 0;\nfor (let i = 2; i < 2 + n; i++) { if (seen.has(t - nums[i])) { hit = 1; break; } seen.add(nums[i]); }\nconsole.log(hit);`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'js-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Multi-Key Non-Mutating .toSorted() Records',
        prompt: 'Read n `(name, score)` rows; print winner with highest score (tie-break name asc).',
        banglaHint: '`.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines = raw.trim().split(/\\r?\\n/);\nconst rows = lines.slice(1, 1 + Number(lines[0])).map(l => { const [n, s] = l.split(/\\s+/); return [n, Number(s)]; });\nconst [top] = rows.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));\nconsole.log(\`\${top[0]} \${top[1]}\`);`,
        sampleStdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
      {
        id: 'js-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Sliding Window Maximum With Index Queue',
        prompt: 'Read n, k and n ints; output max of every length-k window in O(n) without `.shift()`.',
        banglaHint: 'হোয়াইল লুপ দিয়ে ইনডেক্স ডেক ও হেড পয়েন্টার (`head`) রাখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums = raw.trim().split(/\\s+/).map(Number);\nconst [n, k] = nums; const a = nums.slice(2, 2 + n);\nconst dq = []; let head = 0; const out = [];\nfor (let i = 0; i < n; i++) {\n  while (head < dq.length && dq[head] <= i - k) head++;\n  while (head < dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();\n  dq.push(i);\n  if (i >= k - 1) out.push(a[dq[head]]);\n}\nconsole.log(out.join(' '));`,
        sampleStdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: Map Frequency & Tie-Breaker',
      description: 'Aggregates frequencies in a JS Map and picks the mode via non-mutating sorting.',
      banglaGoal: 'ES2025 `Map` ও `sort` দিয়ে ডিকশনারি ফ্রিকোয়েন্সি অ্যানালিটিক্স তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const freq = new Map();
for (let i = 1; i <= nums[0]; i++) freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
const [[bestK, bestV]] = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  rust: {
    title: 'Rust Chapter 9 (Rust 2024): HashMap, BTreeMap, BinaryHeap & Zero-Cost Iterators',
    banglaTitle: 'Rust অধ্যায় ৯ (Rust 2024): HashMap, BTreeMap, BinaryHeap ও ইটারেটর',
    subtitle: 'Master std::collections (.entry().or_insert(), BTreeMap, BinaryHeap<Reverse<T>>), .sort_by(), and chained iterators.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust’s `std::collections` shines with its **Entry API**: `*freq.entry(x).or_insert(0) += 1;` hashes `x` only ONCE! Choose `BTreeMap` when you want deterministic ascending key order, `HashMap` for raw O(1) speed (SipHash-protected against DoS hacks by default!), and `BinaryHeap<Reverse<T>>` for O(log n) Min-Heaps.',
      asciiFlowchart: `  RUST ENTRY API (Single Hash Lookup!)
  *freq.entry(x).or_insert(0) += 1;
     ├── Vacant(x)   --> inserts 0 and returns &mut 0  (now becomes 1)
     └── Occupied(x) --> returns &mut existing_count   (increments in-place!)`,
      pseudocode: [
        '1. COUNT frequencies with `*map.entry(key).or_insert(0) += 1`',
        '2. PREFER `BTreeMap` for sorted keys and predictable tie-breaking',
        '3. USE `std::cmp::Reverse` inside `BinaryHeap` when you need a Min-Heap',
        '4. CHAIN `.iter().filter().map().sum()` (zero heap allocations!)',
        '5. USE `.sort_by(|a, b| ...)` with `.then_with()` for multi-key sorting',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একবারেই বক্স খোঁজা (`.entry().or_insert(0)`) ও উল্টো হিপ (`Reverse<T>`)',
        explanation:
          'অন্যান্য ভাষায় কী আছে কি না একবার চেক করে, না থাকলে আরেকবার ম্যাপে লিখতে হয়। কিন্তু Rust-এর `*freq.entry(x).or_insert(0) += 1` মাত্র **একবার** ম্যাপে খুঁজে মিউটেবল রেফারেন্স এনে মান বাড়িয়ে দেয়! আর Rust-এর `HashMap` বাই-ডিফল্ট SipHash ব্যবহার করে, তাই Codeforces-এ কোনো হ্যাকিংয়ে স্লো হয় না! আর `BinaryHeap<Reverse<i64>>` হলো Min-Heap বানানোর সুপারপাওয়ার।',
        everydayExample:
          'দরজার তালা একবার খুলে ভেতরে নতুন খাতা রেখেই সংখ্যা লেখা—দুবার চাবি ঘোরাতে হয় না!',
        keyTakeaways: [
          '`BTreeMap` কীগুলোকে সবসময় ছোট থেকে বড় সাজানো রাখে।',
          '`BinaryHeap` ডিফল্টভাবে Max-Heap; Min-Heap চাইলে `std::cmp::Reverse` দিয়ে র‍্যাপ করবে।',
          '`.sort_by()`-এ `.cmp()` আর `.then_with()` জুড়ে দিলে অত্যন্ত পরিষ্কার মাল্টি-কী সর্টিং হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: BTreeMap Entry API Ordered Mode Finder',
        banglaNote: '`BTreeMap` ও `.entry().or_insert(0)` দিয়ে সাজানো অর্ডারে ফ্রিকোয়েন্সি ও মোড।',
        code: `use std::collections::BTreeMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut freq = BTreeMap::new();
    for &x in &nums[1..=nums[0] as usize] {
        *freq.entry(x).or_insert(0) += 1;
    }
    let (mut best, mut best_c) = (0, -1);
    for (k, c) in freq {
        if c > best_c { best_c = c; best = k; }
    }
    println!("{} {}", best, best_c);
}`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'rust-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Multi-Key Sorting With .then_with()',
        banglaNote: 'স্কোর সমান হলে `.then_with(|| a.0.cmp(&b.0))` দিয়ে টাই-ব্রেক সর্ট।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace();
    let n: usize = it.next().unwrap_or("0").parse().unwrap_or(0);
    let mut recs: Vec<(String, i32)> = (0..n)
        .map(|_| (it.next().unwrap().to_string(), it.next().unwrap().parse().unwrap()))
        .collect();
    recs.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
    if let Some((name, sc)) = recs.first() {
        println!("{} {}", name, sc);
    }
}`,
        stdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
      {
        id: 'rust-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: BinaryHeap<Reverse<i64>> Min-Heap Rope Merge',
        banglaNote: '`Reverse` র‍্যাপার দিয়ে `BinaryHeap`-কে O(log n) Min-Heap হিসেবে ব্যবহার।',
        code: `use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut heap: BinaryHeap<Reverse<i64>> = v[1..=v[0] as usize].iter().map(|&x| Reverse(x)).collect();
    let mut cost = 0i64;
    while heap.len() > 1 {
        let Reverse(a) = heap.pop().unwrap();
        let Reverse(b) = heap.pop().unwrap();
        cost += a + b;
        heap.push(Reverse(a + b));
    }
    println!("{}", cost);
}`,
        stdin: '4\n4 3 2 6',
        expectedOutput: '29',
      },
      {
        id: 'rust-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Zero-Cost Iterator Pipeline With HashSet Deduplication',
        banglaNote: '`HashSet` ও ইটারেটর চেইনিংয়ে ইউনিক জোড় সংখ্যার যোগফল নির্ণয়।',
        code: `use std::collections::HashSet;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let uniq: HashSet<i64> = v[1..=v[0] as usize].iter().copied().collect();
    let even_sum: i64 = uniq.into_iter().filter(|x| x % 2 == 0).sum();
    println!("{}", even_sum);
}`,
        stdin: '6\n4 2 4 3 6 2',
        expectedOutput: '12',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 8',
        codeSnippet: 'let mut freq = BTreeMap::new();',
        whatItMeans: 'Creates an ordered B-Tree dictionary sorting keys ascending automatically.',
        whyItIsThere: 'Ensures ties resolve cleanly in favor of the smallest key.',
        ifDeletedError: '`freq` is undeclared.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: '*freq.entry(x).or_insert(0) += 1;',
        whatItMeans: 'Looks up `x` once, inserts `0` if absent, and increments the mutable reference.',
        whyItIsThere: 'Fast idiomatic Rust frequency counting in one line.',
        ifDeletedError: 'Map remains empty.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'for (k, c) in freq',
        whatItMeans: 'Iterates keys in sorted order to pick the highest frequency.',
        whyItIsThere: 'Strict `c > best_c` preserves earliest (smallest) key on ties.',
        ifDeletedError: 'Outputs `0 -1` default.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Entry API on [4,1,2,1,2,1]', memoryOrStack: 'BTreeMap { 1=>3, 2=>2, 4=>1 }', note: 'Sorted keys in B-Tree' },
      { step: 2, state: 'Visit (1, 3)', memoryOrStack: 'best=1, best_c=3', note: 'First & highest count' },
      { step: 3, state: 'Visit (2, 2), (4, 1)', memoryOrStack: 'best=1 unchanged', note: 'Tie-safe selection' },
      { step: 4, state: 'println!("1 3")', memoryOrStack: 'stdout: 1 3', note: 'RAII drops BTreeMap cleanly' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Use `f64` Directly as a `HashMap` or `BTreeMap` Key',
        brokenCode: `let mut m = HashMap::new(); m.insert(1.5f64, "hi"); // Error: f64 does not implement Eq/Hash!`,
        fixedCode: `Use integer keys (e.g. scaled fixed-point i64) or OrderedFloat wrappers because NaN != NaN.`,
        whyItBreaks: 'Floating-point `NaN` violates reflexivity (`Eq`), so floats cannot be map keys.',
      },
      {
        title: 'Trap 2: Forgetting `Reverse` When Expecting a Min-Heap From `BinaryHeap`',
        brokenCode: `let mut h = BinaryHeap::new(); h.push(1); h.push(10); // .pop() gives 10, not 1!`,
        fixedCode: `let mut h = BinaryHeap::new(); h.push(Reverse(1)); h.push(Reverse(10));`,
        whyItBreaks: '`std::collections::BinaryHeap` is a Max-Heap by default.',
      },
      {
        title: 'Trap 3: Calling `map[&key]` on Missing Key (Panics!)',
        brokenCode: `let val = freq[&999]; // Panics if 999 is missing!`,
        fixedCode: `let val = freq.get(&999).copied().unwrap_or(0);`,
        whyItBreaks: 'Index syntax panics on missing keys; `.get()` safely returns `Option<&V>`.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Count Distinct Elements With HashSet',
        prompt: 'Read n and n ints; print count of distinct values using `HashSet<i32>`.',
        banglaHint: '`let s: HashSet<i32> = v[1..=n].iter().copied().collect();` ব্যবহার করো।',
        starterCode: `use std::collections::HashSet;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let set: HashSet<i32> = v[1..=v[0] as usize].iter().copied().collect();\n    println!("{}", set.len());\n}`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'rust-ch-9-q2',
        difficulty: 'Easy',
        title: '2. O(n) Two-Sum Using HashSet',
        prompt: 'Read n, target and n ints; print `1` if pair sums to target else `0`.',
        banglaHint: '`if seen.contains(&(target - x))` চেক করো।',
        starterCode: `use std::collections::HashSet;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (n, target) = (v[0] as usize, v[1]); let mut seen = HashSet::new();\n    for &x in &v[2..2 + n] { if seen.contains(&(target - x)) { println!("1"); return; } seen.insert(x); }\n    println!("0");\n}`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'rust-ch-9-q3',
        difficulty: 'Medium',
        title: '3. Kth Largest via BinaryHeap<Reverse<i32>>',
        prompt: 'Read n, k and n ints; output kth largest maintaining a size-k Min-Heap.',
        banglaHint: '`if heap.len() > k { heap.pop(); }` ব্যবহার করো।',
        starterCode: `use std::cmp::Reverse;\nuse std::collections::BinaryHeap;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (n, k) = (v[0] as usize, v[1] as usize); let mut h = BinaryHeap::new();\n    for &x in &v[2..2 + n] { h.push(Reverse(x)); if h.len() > k { h.pop(); } }\n    println!("{}", h.peek().unwrap().0);\n}`,
        sampleStdin: '5 2\n10 4 50 2 30',
        expectedOutput: '30',
      },
      {
        id: 'rust-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Sort & Dedup With Vec Methods',
        prompt: 'Read n and n ints; `.sort_unstable()` + `.dedup()` and print space-separated.',
        banglaHint: '`a.sort_unstable(); a.dedup();` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let mut a = v[1..=v[0] as usize].to_vec();\n    a.sort_unstable(); a.dedup();\n    let out: Vec<String> = a.iter().map(|x| x.to_string()).collect(); println!("{}", out.join(" "));\n}`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 2 4',
      },
      {
        id: 'rust-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Sliding Window Maximum via VecDeque',
        prompt: 'Read n, k and n ints; print max of every length-k window in O(n) using `VecDeque`.',
        banglaHint: '`VecDeque` দিয়ে `.pop_front()` ও `.pop_back()` করো।',
        starterCode: `use std::collections::VecDeque;\nuse std::io::{self, Read};\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();\n    let (n, k) = (v[0] as usize, v[1] as usize); let a = &v[2..2 + n];\n    let mut dq: VecDeque<usize> = VecDeque::new(); let mut out = Vec::new();\n    for i in 0..n {\n        while dq.front().is_some_and(|&f| f + k <= i) { dq.pop_front(); }\n        while dq.back().is_some_and(|&b| a[b] <= a[i]) { dq.pop_back(); }\n        dq.push_back(i);\n        if i + 1 >= k { out.push(a[*dq.front().unwrap()].to_string()); }\n    }\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: BTreeMap Entry Frequency Engine',
      description: 'Counts integer frequencies in one hash-free ordered pass via BTreeMap Entry API.',
      banglaGoal: 'Rust `BTreeMap` এবং `.entry().or_insert()` দিয়ে ফ্রিকোয়েন্সি ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `use std::collections::BTreeMap;
use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut freq = BTreeMap::new();
    for &x in &nums[1..=nums[0] as usize] {
        *freq.entry(x).or_insert(0) += 1;
    }
    let (mut best, mut best_c) = (0, -1);
    for (k, c) in freq {
        if c > best_c { best_c = c; best = k; }
    }
    println!("{} {}", best, best_c);
}`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 9 (TS 5.x): Typed Map/Set, Utility Types & API Contracts',
    banglaTitle: 'TypeScript অধ্যায় ৯ (TS 5.x): টাইপড Map/Set, ইউটিলিটি টাইপ ও API কন্ট্রাক্ট',
    subtitle: 'Master Map<K, V>, Set<T>, Record<K, V>, TS utility types (Pick, Omit, Partial), and strongly typed comparators.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript supercharges standard JS collections by locking key and value types at compile time: `new Map<number, number>()` stops you from accidentally looking up a `string` key, `Set<number>` catches wrong membership checks, and built-in Utility Types (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`) transform API DTOs without duplicating types!',
      asciiFlowchart: `  TYPESCRIPT 5.x COLLECTIONS & UTILITY TYPES
  Map<number, number>   ---> freq.get(1) -> number | undefined (must guard!)
  Set<number>           ---> seen.has(x) -> O(1) strictly typed!
  Partial<User> / Pick<User, 'name' | 'score'> -> Zero-duplication DTOs`,
      pseudocode: [
        '1. ANNOTATE dictionaries cleanly with `Map<K, V>` and `Set<T>`',
        '2. HANDLE `number | undefined` from `map.get(k)` via `?? 0`',
        '3. SORT entry arrays without mutation via `.toSorted((a, b) => ...)`',
        '4. USE `Record<string, number>` when modeling known JSON string-keyed maps',
        '5. TRANSFORM existing interfaces with `Pick` / `Omit` / `Partial`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'কড়া লেবেলযুক্ত কন্টেইনার (`Map<K, V>`) ও ইউটিলিটি ছাঁচ (`Pick`, `Partial`)',
        explanation:
          '`new Map<number, number>()` লিখে দিলে TypeScript নিশ্চিত করে যে ওই ম্যাপে ভুল করে কোনো `string` ঢুকবে না! আর `.get(key)` সবসময় `number | undefined` দেয় বলে `?? 0` দিয়ে ডিফল্ট দিতেই হয়! তাছাড়া API ডেটা মডেলিংয়ে `Partial<User>` বা `Pick<User, "name">` ব্যবহার করলে একই ইন্টারফেস বারবার কপি-পেস্ট করতে হয় না!',
        everydayExample:
          'ওষুধের বক্সে লেবেল সাঁটা (`Map<number, number>`)—ভুল বক্সে ভুল জিনিস রাখলেই সতর্ক সংকেত বাজে!',
        keyTakeaways: [
          '`freq.get(k) ?? 0` লিখলে `undefined` কেস নিরাপদে ০ হয়ে যায়।',
          '`ReadonlyMap<K, V>` এবং `ReadonlySet<T>` দিয়ে রিড-অনলি প্যারামিটার বানানো যায়।',
          '`toSorted((a, b) => b[1] - a[1] || a[0] - b[0])` টাইপ-সেফলি মাল্টি-কী সর্ট করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Map<number, number> Frequency Mode',
        banglaNote: '`Map<number, number>` ও `.toSorted()` দিয়ে নির্ভুল মোড ও গণনা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);

const freq = new Map<number, number>();
for (let i = 1; i <= nums[0]; i++) {
  freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);
}
const [[bestK, bestV]] = [...freq.entries()].toSorted((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
        stdin: '6\n4 1 2 1 2 1',
        expectedOutput: '1 3',
      },
      {
        id: 'ts-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe Nullish Map Lookup & Empty Guard',
        banglaNote: '`map.get(k)`-এর `undefined` মান `?? -1` দিয়ে হ্যান্ডেল করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const key: number = Number(raw.trim() || 0);

const scores = new Map<number, number>([[10, 95], [20, 0]]);
const hit: number = scores.get(key) ?? -1;
console.log(\`has=\${scores.has(key)} val=\${hit}\`);`,
        stdin: '20',
        expectedOutput: 'has=true val=0',
      },
      {
        id: 'ts-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Typed O(n) Two-Sum via Set<number>',
        banglaNote: '`Set<number>` ব্যবহার করে O(n) সময়ে পেয়ার অস্তিত্ব যাচাই।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const [n = 0, target = 0] = nums;

const seen = new Set<number>();
let found = 0;
for (let i = 2; i < 2 + n; i++) {
  if (seen.has(target - nums[i])) { found = 1; break; }
  seen.add(nums[i]);
}
console.log(found);`,
        stdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'ts-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Multi-Key Typed Tuple Sort',
        banglaNote: 'টাইপড রেকর্ড `[string, number]` সর্টিং ও টাই-ব্রেক।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const lines: string[] = raw.trim().split(/\\r?\\n/);
const n: number = Number(lines[0] || 0);
const rows: Array<[string, number]> = lines.slice(1, 1 + n).map((l) => {
  const [name, sc] = l.trim().split(/\\s+/);
  return [name, Number(sc)];
});
const [top] = rows.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log(\`\${top[0]} \${top[1]}\`);`,
        stdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const freq = new Map<number, number>();',
        whatItMeans: 'Instantiates a strictly typed dictionary mapping `number` keys to `number` counts.',
        whyItIsThere: 'Prevents mixing key types like strings vs numbers at compile time.',
        ifDeletedError: '`freq` becomes undefined.',
      },
      {
        lineNumber: 'Line 7',
        codeSnippet: 'freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);',
        whatItMeans: 'Safely coalesces missing (`undefined`) counts to `0` using `??` before adding `1`.',
        whyItIsThere: 'Avoids `undefined + 1 -> NaN` runtime bugs.',
        ifDeletedError: 'Map remains empty.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: '[...freq.entries()].toSorted((a, b) => b[1] - a[1] || a[0] - b[0]);',
        whatItMeans: 'Sorts entries descending by count and ascending by key cleanly.',
        whyItIsThere: 'Guarantees deterministic mode and tie resolution.',
        ifDeletedError: 'Cannot identify winner cleanly.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Loop nums[1..6]', memoryOrStack: 'Map<number, number> {4=>1, 1=>3, 2=>2}', note: 'Typed inserts' },
      { step: 2, state: 'Spread [...freq.entries()]', memoryOrStack: 'Array<[number, number]>', note: '3 pairs' },
      { step: 3, state: 'toSorted(count desc, key asc)', memoryOrStack: '[[1,3], [2,2], [4,1]]', note: 'Non-mutating' },
      { step: 4, state: 'console.log("1 3")', memoryOrStack: 'stdout: 1 3', note: 'Exact match' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `|| 0` Instead of `?? 0` on Stored `0` Values',
        brokenCode: `const val = scores.get(id) || -1; // Returns -1 even when score IS 0!`,
        fixedCode: `const val = scores.get(id) ?? -1; // Only falls back on null/undefined`,
        whyItBreaks: '`||` treats `0` as falsy, whereas `??` treats only `null | undefined` as missing.',
      },
      {
        title: 'Trap 2: Mutating a `ReadonlyMap` or `readonly` Array Parameter',
        brokenCode: `function add(m: ReadonlyMap<string, number>) { m.set("a", 1); } // Compile error!`,
        fixedCode: `Use Map<string, number> when mutation is intended, ReadonlyMap for readers.`,
        whyItBreaks: '`ReadonlyMap` intentionally forbids `.set`, `.delete`, and `.clear`.',
      },
      {
        title: 'Trap 3: Writing Plain `{ [k: string]: number }` Without Checking `hasOwn`',
        brokenCode: `const d: Record<string, number> = {}; if (d["toString"]) // True!`,
        fixedCode: `Use Map<string, number> or Object.hasOwn(d, key).`,
        whyItBreaks: 'Plain records still inherit `Object.prototype` properties at runtime.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Typed Set<number> Distinct Count',
        prompt: 'Read n and n ints; output distinct count via `new Set<number>(...).size`.',
        banglaHint: '`new Set<number>(nums.slice(1, 1 + nums[0])).size` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconsole.log(new Set<number>(nums.slice(1, 1 + nums[0])).size);`,
        sampleStdin: '6\n4 1 2 1 2 1',
        expectedOutput: '3',
      },
      {
        id: 'ts-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Sum Distinct Evens With Typed Set & Filter',
        prompt: 'Read n and n ints; sum unique even integers.',
        banglaHint: '`Set<number>` থেকে `.filter().reduce()` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst sum: number = [...new Set<number>(nums.slice(1, 1 + nums[0]))].filter((x) => (x & 1) === 0).reduce((a, b) => a + b, 0);\nconsole.log(sum);`,
        sampleStdin: '6\n4 2 4 3 6 2',
        expectedOutput: '12',
      },
      {
        id: 'ts-ch-9-q3',
        difficulty: 'Medium',
        title: '3. O(n) Two-Sum via Set<number>',
        prompt: 'Read n, target and n ints; output `1` if pair exists else `0`.',
        banglaHint: '`seen.has(target - nums[i])` চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst [n, t] = nums; const seen = new Set<number>(); let hit = 0;\nfor (let i = 2; i < 2 + n; i++) { if (seen.has(t - nums[i])) { hit = 1; break; } seen.add(nums[i]); }\nconsole.log(hit);`,
        sampleStdin: '4 9\n7 2 11 15',
        expectedOutput: '1',
      },
      {
        id: 'ts-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Multi-Key Non-Mutating Typed Record Sort',
        prompt: 'Read n `(name, score)` records; print highest score (tie-break name asc).',
        banglaHint: '`.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst lines: string[] = raw.trim().split(/\\r?\\n/);\nconst rows = lines.slice(1, 1 + Number(lines[0])).map((l) => { const [n, s] = l.split(/\\s+/); return [n, Number(s)] as [string, number]; });\nconst [top] = rows.toSorted((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));\nconsole.log(\`\${top[0]} \${top[1]}\`);`,
        sampleStdin: '3\nbob 50\nalice 50\nzara 40',
        expectedOutput: 'alice 50',
      },
      {
        id: 'ts-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Sliding Window Maximum With Typed Index Queue',
        prompt: 'Read n, k and n ints; compute sliding window max of size k in O(n).',
        banglaHint: '`const dq: number[] = [];` ও `head` পয়েন্টার ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst nums: number[] = raw.trim().split(/\\s+/).map(Number);\nconst [n, k] = nums; const a: readonly number[] = nums.slice(2, 2 + n);\nconst dq: number[] = []; let head = 0; const out: number[] = [];\nfor (let i = 0; i < n; i++) {\n  while (head < dq.length && dq[head] <= i - k) head++;\n  while (head < dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();\n  dq.push(i);\n  if (i >= k - 1) out.push(a[dq[head]]);\n}\nconsole.log(out.join(' '));`,
        sampleStdin: '6 3\n1 3 -1 -3 5 3',
        expectedOutput: '3 3 5 5',
      },
    ],
    miniBuild: {
      title: 'TS 5.x Mini Build: Typed Map Frequency Engine',
      description: 'Uses Map<number, number> with nullish coalescing and multi-key sorting.',
      banglaGoal: 'TypeScript `Map<number, number>` ব্যবহার করে টাইপ-সেফ মোড অ্যানালাইজার তৈরি।',
      combinesChapters: 'Ch 1–9',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums: number[] = raw.trim().split(/\\s+/).map(Number);
const freq = new Map<number, number>();
for (let i = 1; i <= nums[0]; i++) freq.set(nums[i], (freq.get(nums[i]) ?? 0) + 1);
const [[bestK, bestV]] = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
console.log(\`\${bestK} \${bestV}\`);`,
      sampleStdin: '6\n4 1 2 1 2 1',
      expectedOutput: '1 3',
    },
  },

  html: {
    title: 'HTML5 Chapter 9: Native Forms, Validation, <datalist> & <dialog> Web APIs',
    banglaTitle: 'HTML5 অধ্যায় ৯: নেটিভ ফর্ম, ভ্যালিডেশন, <datalist> ও <dialog> ওয়েব API',
    subtitle: 'Build accessible forms with native constraints (required, pattern, min/max), <datalist> autocomplete, and native <dialog> modals.',
    zeroIntuition: {
      plainEnglishStory:
        'Before reaching for heavy JavaScript libraries, HTML5 ships powerful native Web APIs right in the browser: `<form>` constraint validation (`required`, `type="email"`, `min`, `pattern`), `<datalist>` native autocomplete suggestions, and `<dialog>` accessible modals with built-in Escape key handling!',
      asciiFlowchart: `  HTML5 NATIVE FORM & WEB API FLOW
  <form id="f">
    <label for="n">...</label>
    <input id="n" required min="1" list="presets" />
    <datalist id="presets">...</datalist>
    <button type="submit">Compute</button>
  </form> ---> e.preventDefault() -> Update DOM output without reload!`,
      pseudocode: [
        '1. PAIR every `<input>` with an explicit `<label for="...">`',
        '2. APPLY native HTML5 constraints (`required`, `min`, `max`, `pattern`)',
        '3. ADD `<datalist>` for zero-JS native autocomplete suggestions',
        '4. CALL `e.preventDefault()` on `submit` event to handle form data smoothly in JS',
        '5. RENDER structured analytics / leaderboard cleanly via Map + Array methods',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ব্রাউজারের বিল্ট-ইন ফর্ম গার্ড (`required`, `pattern`) ও `<datalist>`',
        explanation:
          'অনেক সময় ইউজার খালি ফর্ম সাবমিট করলে জাভাস্ক্রিপ্ট দিয়ে চেক করতে হয়—কিন্তু HTML5-এ শুধু `required`, `min="1"`, বা `type="number"` লিখলেই ব্রাউজার নিজেই ভুল ইনপুট আটকে দেয়! আর `<datalist>` দিয়ে গুগল সার্চের মতো রেডিমেড সাজেশন, এবং `<dialog>` দিয়ে মাত্র ২ লাইনে সুন্দর মডাল পপআপ তৈরি করা যায়!',
        everydayExample:
          'অনলাইন পরীক্ষার ফর্ম: নাম না লিখলে বা ভুল ইমেইল দিলে সাবমিট বাটন চাপলেও ফর্ম নিজেই লাল সতর্কবার্তা দেখায়!',
        keyTakeaways: [
          'প্রতিটি ইনপুটে অবশ্যই `<label for="id">` রাখবে—শুধু `placeholder` অ্যাক্সেসিবল নয়।',
          'ফর্ম সাবমিট হলে ব্রাউজার পেজ রিলোড করে ফেলে—SPA-তে `e.preventDefault()` দিয়ে তা থামাতে হয়।',
          '`<dialog>.showModal()` নিজেই ব্যাকড্রপ ও `Esc` কী বন্ধ হওয়া হ্যান্ডেল করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-9-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Collections Frequency Leaderboard Preview',
        banglaNote: '`Map` ফ্রিকোয়েন্সি গণনা ও পরিষ্কার HTML প্রিভিউ কার্ড।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Collections & Frequency Leaderboard</h3>
  <pre style="color:#38bdf8">Input: [4, 1, 2, 1, 2, 1]\nWinner: 1 (3 times)</pre>
</body></html>`,
        stdin: '',
        expectedOutput: 'Collections & Frequency Leaderboard',
      },
      {
        id: 'html-9-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Native HTML5 Form Validation + <datalist>',
        banglaNote: 'হাই-প্লাগ `<label>`, `required` ও `<datalist>` সাজেশনসহ ফর্ম ভ্যালিডেশন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Accessible Form + Datalist</h3>
  <form id="f" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <label for="lang">Language:</label>
    <input id="lang" list="langs" required minlength="1" style="padding:6px 10px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:6px" value="Rust" />
    <datalist id="langs"><option value="C"><option value="C++"><option value="Python"><option value="Rust"></datalist>
    <button type="submit" style="padding:7px 14px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Submit</button>
  </form>
  <p id="out" style="color:#34d399;font-family:monospace">Ready</p>
  <script>
    document.getElementById('f').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('out').textContent = 'Selected: ' + document.getElementById('lang').value;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Accessible Form + Datalist',
      },
      {
        id: 'html-9-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Native <dialog> Accessible Modal API',
        banglaNote: 'থার্ড-পার্টি লাইব্রেরি ছাড়াই HTML5 `<dialog>` দিয়ে ফোকাস-ট্র্যাপড মডাল।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Native &lt;dialog&gt; Modal</h3>
  <button id="open" style="padding:8px 14px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Open Quick Reference</button>
  <dialog id="dlg" style="background:#0f172a;color:#f8fafc;border:1px solid #38bdf8;border-radius:10px;padding:18px">
    <p style="margin:0 0 12px">Map = O(1) · BTreeMap = O(log n)</p>
    <button id="close" style="padding:6px 12px;background:#334155;color:#fff;border:none;border-radius:6px;cursor:pointer">Close</button>
  </dialog>
  <script>
    const d = document.getElementById('dlg');
    document.getElementById('open').onclick = () => d.showModal();
    document.getElementById('close').onclick = () => d.close();
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Modal',
      },
      {
        id: 'html-9-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Live Map Frequency Studio Inside Browser',
        banglaNote: 'ফর্মে সংখ্যাগুলো লিখলে `Map` দিয়ে সাথে সাথে মোড ও ফ্রিকোয়েন্সি হিসাব।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Live Frequency Analyzer</h3>
  <input id="nums" value="4 1 2 1 2 1" style="padding:6px 10px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:6px" />
  <button id="calc" style="padding:7px 14px;background:#34d399;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Analyze</button>
  <p id="res" style="font-family:monospace;color:#38bdf8;margin-top:10px"></p>
  <script>
    function run() {
      const arr = document.getElementById('nums').value.trim().split(/\\s+/).map(Number).filter(Number.isFinite);
      const m = new Map();
      arr.forEach(x => m.set(x, (m.get(x) || 0) + 1));
      const [[k, v]] = [...m.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0]);
      document.getElementById('res').textContent = \`Mode: \${k} (count=\${v})\`;
    }
    run();
    document.getElementById('calc').onclick = run;
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Live Frequency Analyzer',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: '<label for="lang">Language:</label><input id="lang" list="langs" required />',
        whatItMeans: 'Associates accessible label, datalist suggestions, and required validation.',
        whyItIsThere: 'Lets screen readers announce input meaning and prevents blank submissions.',
        ifDeletedError: 'Form loses label association and accepts empty submits.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'e.preventDefault();',
        whatItMeans: 'Stops default full-page form POST/GET navigation reload.',
        whyItIsThere: 'Allows updating the DOM cleanly on the same page.',
        ifDeletedError: 'Submitting the form wipes/reloads the entire preview iframe.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'd.showModal();',
        whatItMeans: 'Opens `<dialog>` in the top layer with automatic backdrop and `Esc` close.',
        whyItIsThere: 'Provides native accessible dialog focus handling with zero libraries.',
        ifDeletedError: 'Dialog stays hidden.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Form renders with default "Rust"', memoryOrStack: 'input.validity.valid === true', note: 'Datalist attached' },
      { step: 2, state: 'User submits valid input', memoryOrStack: 'submit fires -> e.preventDefault()', note: 'No page reload' },
      { step: 3, state: 'Live analyzer runs Map pass', memoryOrStack: 'Map {4=>1, 1=>3, 2=>2}', note: 'Sorts entries descending' },
      { step: 4, state: 'Updates #res.textContent', memoryOrStack: 'Mode: 1 (count=3)', note: 'Zero XSS risk' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `placeholder` Without `<label for="...">`',
        brokenCode: `<input placeholder="Enter email" />`,
        fixedCode: `<label for="em">Email</label><input id="em" type="email" required />`,
        whyItBreaks: 'Placeholders disappear as soon as typing starts and aren’t reliable accessible labels.',
      },
      {
        title: 'Trap 2: Omitting `e.preventDefault()` in `<form>` Submit Handler',
        brokenCode: `form.addEventListener('submit', () => { render(); }); // Page reloads!`,
        fixedCode: `form.addEventListener('submit', (e) => { e.preventDefault(); render(); });`,
        whyItBreaks: 'Browsers reload the page on form submit unless prevented.',
      },
      {
        title: 'Trap 3: Button Inside `<form>` Missing `type="button"`',
        brokenCode: `<form><button onclick="cancel()">Cancel</button></form> // Submits form!`,
        fixedCode: `<form><button type="button" onclick="cancel()">Cancel</button></form>`,
        whyItBreaks: 'Default `<button>` type inside a `<form>` is `"submit"`, not `"button"`!',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-9-q1',
        difficulty: 'Easy',
        title: '1. Accessible Label + Number Input',
        prompt: 'Create `<label for="age">` paired with `<input id="age" type="number" min="1" required />`.',
        banglaHint: '`for="age"` ও `id="age"` ম্যাচ করাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><label for="age">Age:</label> <input id="age" type="number" min="1" required value="18" /></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Age:',
      },
      {
        id: 'html-ch-9-q2',
        difficulty: 'Easy',
        title: '2. Native `<datalist>` Suggestions',
        prompt: 'Bind `<input list="opts">` to `<datalist id="opts">` with 3 options.',
        banglaHint: '`list="opts"` এবং `<datalist id="opts">` দাও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><input list="opts" value="Python" /><datalist id="opts"><option value="Python"><option value="Rust"><option value="C++"></datalist></body></html>`,
        sampleStdin: '',
        expectedOutput: 'datalist',
      },
      {
        id: 'html-ch-9-q3',
        difficulty: 'Medium',
        title: '3. Prevent Reload on Form Submit',
        prompt: 'Handle `<form id="f">` submit with `e.preventDefault()` and write input to `#msg`.',
        banglaHint: '`e.preventDefault()` কল করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><form id="f"><input id="v" value="Argon" /><button type="submit">Go</button></form><p id="msg"></p><script>document.getElementById('f').onsubmit=e=>{e.preventDefault();document.getElementById('msg').textContent=document.getElementById('v').value;};</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'Argon',
      },
      {
        id: 'html-ch-9-q4',
        difficulty: 'Medium',
        title: '4. Native `<dialog>` Toggle Button',
        prompt: 'Render a `<dialog id="d">` opened by button click (`d.showModal()`).',
        banglaHint: '`d.showModal()` ও `d.close()` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><button id="b">Open</button><dialog id="d">Hello <button onclick="this.closest('dialog').close()">X</button></dialog><script>document.getElementById('b').onclick=()=>document.getElementById('d').showModal();</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'dialog',
      },
      {
        id: 'html-ch-9-q5',
        difficulty: 'Hard',
        title: '5. Form + Map Frequency Mode Output',
        prompt: 'Render preformatted frequency leaderboard `[4, 1, 2, 1, 2, 1]` -> Winner: `1 (3 times)`.',
        banglaHint: '`Map` ব্যবহার করে জয়ী প্রিন্ট করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><pre id="p"></pre><script>const m=new Map();[4,1,2,1,2,1].forEach(x=>m.set(x,(m.get(x)||0)+1));const [[k,v]]=[...m.entries()].sort((a,b)=>b[1]-a[1]||a[0]-b[0]);document.getElementById('p').textContent=\`Winner: \${k} (\${v} times)\`;</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'pre',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Collections & Frequency Leaderboard',
      description: 'Displays standard library frequency aggregation results cleanly.',
      banglaGoal: 'HTML5 ও JS কালেকশন ব্যবহার করে ফ্রিকোয়েন্সি লিডারবোর্ড প্রদর্শন।',
      combinesChapters: 'Ch 1–9',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Collections & Frequency Leaderboard</h3>
  <pre style="color:#38bdf8">Input: [4, 1, 2, 1, 2, 1]\nWinner: 1 (3 times)</pre>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Collections & Frequency Leaderboard',
    },
  },
};
