import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_11: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 11 (C23): Stack vs Heap, malloc/calloc/realloc & Leak-Free Prefix Arrays',
    banglaTitle: 'C অধ্যায় ১১ (C23): স্ট্যাক বনাম হিপ মেমোরি, malloc/calloc/free ও প্রিফিক্স সাম',
    subtitle: 'Master virtual address space layout, avoiding Stack Overflow on 10^6 arrays, dynamic calloc/realloc, and zero-leak cleanup.',
    zeroIntuition: {
      plainEnglishStory:
        'Inside every running process, RAM is split into two main playgrounds: a tiny, ultra-fast **Stack (~1–8 MB)** for local variables and function calls, and a massive **Heap (Gigabytes)** for large or dynamically sized arrays (`malloc` / `calloc`). Allocating `int arr[1000000]` on the Stack blows the 8 MB limit and crashes with **SIGSEGV (Stack Overflow)**—allocating it on the Heap with `calloc` + `free` works cleanly for millions of items!',
      asciiFlowchart: `  PROCESS VIRTUAL ADDRESS SPACE (C23)
  +--------------------------------------+  High Address (0x7fff...)
  |  STACK (Fast, Auto-Freed, ~8 MB max) |  <- int n; long long *pref (8-byte ptr)
  |                | grows down          |
  |                v                     |
  |                ^ grows up            |
  |  HEAP (Huge, Manual malloc/free)     |  <- [ pref[0] | pref[1] | ... | pref[n-1] ]
  +--------------------------------------+  Low Address
         ^ Never forget: free(pref); pref = NULL;`,
      pseudocode: [
        '1. KEEP small scalars (`int n`, loop indices) on the Stack',
        '2. ALLOCATE large n-element arrays on the Heap via `calloc((size_t)n, sizeof(long long))`',
        '3. CHECK pointer `if (!pref) return 1;` immediately after allocation',
        '4. COMPUTE O(n) running prefix sums inside the contiguous Heap buffer',
        '5. CALL `free(pref)` and set `pref = NULL` before every exit path',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ছোট ওয়ার্ক-ডেস্ক (Stack) বনাম বিশাল ভাড়া গুদাম (Heap)',
        explanation:
          'স্ট্যাক হলো তোমার পড়ার ছোট্ট টেবিল—হাত বাড়ালেই পাওয়া যায় (অতি দ্রুত), ফাংশন শেষ হলে নিজেই পরিষ্কার হয়ে যায়, কিন্তু জায়গা মাত্র কয়েক মেগাবাইট! তাই ১০ লক্ষ সংখ্যার অ্যারে টেবিলে রাখলে টেবিল ভেঙে যাবে (**Stack Overflow**)। তখন `malloc` বা `calloc` দিয়ে বিশাল গুদামঘর (Heap) ভাড়া নিতে হয়, আর কাজ শেষে `free(ptr)` করে চাবি ফিরিয়ে দিতে হয়—নইলে **Memory Leak** হবে!',
        everydayExample:
          'বিয়ে বাড়ির ১০০০ মেহমানের খাবারের প্যাকেট পড়ার টেবিলে না রেখে কমিউনিটি সেন্টারের গোডাউনে রাখা এবং অনুষ্ঠান শেষে গুদাম খালি করা।',
        keyTakeaways: [
          '১ লক্ষাধিক সাইজের অ্যারে কখনো ফাংশনের ভেতর লোকাল (`int a[1000000]`) বানাবে না—`calloc`/`malloc` ব্যবহার করো।',
          '`malloc` পুরোনো ময়লা (garbage) রাখে, কিন্তু `calloc` সব বাইট `0` করে দেয়।',
          '`free(ptr)` করার পর ওই পয়েন্টার ব্যবহার করলে **Use-After-Free** হয়—তাই সাথে সাথে `ptr = NULL` করে দাও।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Dynamic Heap Prefix Sum With calloc & free',
        banglaNote: '`calloc` দিয়ে হিপ মেমোরিতে শূন্য-ইনিশিয়ালাইজড অ্যারে নিয়ে প্রিফিক্স সাম ও শেষে `free()`।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *pref = calloc((size_t)n, sizeof(long long));
    if (!pref) return 1;
    long long run = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0;
        scanf("%lld", &x);
        run += x;
        pref[i] = run;
        printf("%lld%s", pref[i], i + 1 == n ? "\\n" : " ");
    }
    free(pref);
    pref = NULL;
    return 0;
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'c-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe realloc() Growth Without Losing Original Pointer',
        banglaNote: 'সরাসরি `ptr = realloc(ptr, ...)` না লিখে টেম্পোরারি পয়েন্টার ব্যবহার করে OOM-এ মেমোরি লিক ঠেকানো।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t cap = 2, len = 0;
    long long *buf = malloc(cap * sizeof(long long));
    if (!buf) return 1;
    long long x = 0;
    while (scanf("%lld", &x) == 1) {
        if (len == cap) {
            size_t next_cap = cap * 2;
            long long *tmp = realloc(buf, next_cap * sizeof(long long));
            if (!tmp) { free(buf); return 1; }
            buf = tmp;
            cap = next_cap;
        }
        buf[len++] = x;
    }
    long long sum = 0;
    for (size_t i = 0; i < len; i++) sum += buf[i];
    printf("len=%zu cap=%zu sum=%lld\\n", len, cap, sum);
    free(buf);
    return 0;
}`,
        stdin: '10 20 30 40 50',
        expectedOutput: 'len=5 cap=8 sum=150',
      },
      {
        id: 'c-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Single-Block Arena Buffer for Multiple Queries',
        banglaNote: 'বারবার ছোট ছোট `malloc` না করে একবারে বড় চাঙ্ক নিয়ে O(1) রেঞ্জ সাম কুয়েরি উত্তর দেওয়া।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0, q = 0;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    long long *pref = calloc((size_t)(n + 1), sizeof(long long));
    if (!pref) return 1;
    for (int i = 1; i <= n; i++) {
        long long x = 0; scanf("%lld", &x);
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l = 0, r = 0; scanf("%d %d", &l, &r);
        printf("%lld\\n", pref[r] - pref[l - 1]);
    }
    free(pref);
    return 0;
}`,
        stdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'c-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Contiguous 2D Flattened Heap Matrix (Zero Pointer-to-Pointer)',
        banglaNote: '`int **`-এর বদলে একক ১ডি হিপ ব্লকে `r * cols + c` ইনডেক্স করে ক্যাশ হিট ও স্পিড দ্বিগুণ করা।',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int r = 0, c = 0;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    int *mat = malloc((size_t)(r * c) * sizeof(int));
    if (!mat) return 1;
    long long diag = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            scanf("%d", &mat[i * c + j]);
            if (i == j) diag += mat[i * c + j];
        }
    }
    printf("diag=%lld\\n", diag);
    free(mat);
    return 0;
}`,
        stdin: '3 3\n1 2 3\n4 5 6\n7 8 9',
        expectedOutput: 'diag=15',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'long long *pref = calloc((size_t)n, sizeof(long long));',
        whatItMeans: 'Allocates `n` contiguous 8-byte elements on the Heap and zero-fills every byte.',
        whyItIsThere: 'Prevents Stack Overflow on large `n` and guarantees clean zero initialization.',
        ifDeletedError: 'Dereferencing uninitialized `pref` causes immediate Segmentation Fault.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'if (!pref) return 1;',
        whatItMeans: 'Verifies Heap allocation succeeded before touching memory.',
        whyItIsThere: 'OS returns `NULL` when system RAM is exhausted.',
        ifDeletedError: 'Writing to `NULL[0]` triggers a crash with exit code 139.',
      },
      {
        lineNumber: 'Line 17',
        codeSnippet: 'free(pref); pref = NULL;',
        whatItMeans: 'Returns Heap memory to the allocator and clears dangling address.',
        whyItIsThere: 'Prevents Memory Leaks in long-running programs and catches accidental Use-After-Free.',
        ifDeletedError: 'Memory stays pinned until process termination (Leak).',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'calloc(4, 8)', memoryOrStack: 'Stack pref=0x5000 -> Heap[0,0,0,0]', note: '32 zeroed bytes on Heap' },
      { step: 2, state: 'i=0, x=3', memoryOrStack: 'run=3, Heap[3,0,0,0]', note: 'Prints 3' },
      { step: 3, state: 'i=1..3, x=1,4,2', memoryOrStack: 'Heap[3,4,8,10]', note: 'Prints 4 8 10' },
      { step: 4, state: 'free(pref); pref=NULL', memoryOrStack: '0 bytes leaked', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Allocating Huge Local Stack Arrays (`int a[2000000]`)',
        brokenCode: `int main(void) { int big[2000000]; /* Crashes! Exceeds 8MB stack */ }`,
        fixedCode: `int *big = malloc(2000000ULL * sizeof(int)); /* Lives safely on Heap */`,
        whyItBreaks: 'Default OS thread stack is limited (~1–8 MB); overflowing corrupts stack guard pages.',
      },
      {
        title: 'Double Free or Use-After-Free',
        brokenCode: `free(p); printf("%d", p[0]); // Use-After-Free UB!`,
        fixedCode: `free(p); p = NULL; // Safe sentinel prevents accidental reuse`,
        whyItBreaks: 'Allocator may reuse freed chunk for another object, corrupting memory silently.',
      },
      {
        title: 'Overwriting Original Pointer on `realloc`',
        brokenCode: `p = realloc(p, huge_size); // If NULL returned, original p is leaked!`,
        fixedCode: `void *tmp = realloc(p, huge_size); if (!tmp) { free(p); return 1; } p = tmp;`,
        whyItBreaks: 'Losing the original pointer makes it impossible to free the old block if `realloc` fails.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Heap Prefix Sum Array',
        prompt: 'Allocate a Heap array via `calloc` and print prefix sums of `n` integers.',
        banglaHint: '`calloc` দিয়ে হিপ মেমোরি নিয়ে প্রিফিক্স সাম বের করো ও শেষে `free` করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long *pref = calloc((size_t)n, sizeof(long long));
    long long run = 0;
    for (int i = 0; i < n; i++) {
        long long x; scanf("%lld", &x);
        run += x;
        pref[i] = run;
        printf("%lld%s", pref[i], i + 1 == n ? "\\n" : " ");
    }
    free(pref);
    return 0;
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'c-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Dynamic Min & Max on Heap Buffer',
        prompt: 'Read `n` numbers into a `malloc` buffer and output `min max`.',
        banglaHint: 'ডাইনামিক অ্যারেতে সব সংখ্যা রেখে সর্বনিম্ন ও সর্বোচ্চ মান বের করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0; scanf("%d", &n);
    long long *a = malloc((size_t)n * sizeof(long long));
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    long long mn = a[0], mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < mn) mn = a[i];
        if (a[i] > mx) mx = a[i];
    }
    printf("%lld %lld\\n", mn, mx);
    free(a);
    return 0;
}`,
        sampleStdin: '5\n9 -3 12 4 0',
        expectedOutput: '-3 12',
      },
      {
        id: 'c-ch-11-q3',
        difficulty: 'Medium',
        title: '3. Dynamic Growable Stack via realloc',
        prompt: 'Push tokens until EOF doubling capacity with `realloc`, then print count and last value.',
        banglaHint: 'ক্যাপাসিটি পূর্ণ হলে `realloc` দিয়ে দ্বিগুণ করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t cap = 2, len = 0;
    int *st = malloc(cap * sizeof(int));
    int x = 0;
    while (scanf("%d", &x) == 1) {
        if (len == cap) { cap *= 2; st = realloc(st, cap * sizeof(int)); }
        st[len++] = x;
    }
    printf("count=%zu last=%d\\n", len, len ? st[len - 1] : 0);
    free(st);
    return 0;
}`,
        sampleStdin: '7 14 21 28 35',
        expectedOutput: 'count=5 last=35',
      },
      {
        id: 'c-ch-11-q4',
        difficulty: 'Medium',
        title: '4. O(1) Range Sum Queries via 1-Indexed Heap Prefix',
        prompt: 'Answer `q` range sum queries `[L, R]` using `pref[R] - pref[L-1]`.',
        banglaHint: '`n + 1` সাইজের `calloc` প্রিফিক্স অ্যারে তৈরি করো।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0, q = 0; scanf("%d %d", &n, &q);
    long long *p = calloc((size_t)(n + 1), sizeof(long long));
    for (int i = 1; i <= n; i++) { long long x; scanf("%lld", &x); p[i] = p[i - 1] + x; }
    while (q--) {
        int l = 0, r = 0; scanf("%d %d", &l, &r);
        printf("%lld\\n", p[r] - p[l - 1]);
    }
    free(p);
    return 0;
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'c-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Difference Array Range Updates on Heap',
        prompt: 'Apply `m` range additions `[L, R] += V` in O(1) each on a Heap array and print final array.',
        banglaHint: 'ডিফারেন্স অ্যারে `d[L] += v; d[R+1] -= v;` ব্যবহার করে শেষে প্রিফিক্স সাম নাও।',
        starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0, m = 0; scanf("%d %d", &n, &m);
    long long *d = calloc((size_t)(n + 2), sizeof(long long));
    while (m--) {
        int l = 0, r = 0; long long v = 0;
        scanf("%d %d %lld", &l, &r, &v);
        d[l] += v; d[r + 1] -= v;
    }
    long long cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i];
        printf("%lld%s", cur, i == n ? "\\n" : " ");
    }
    free(d);
    return 0;
}`,
        sampleStdin: '5 2\n1 3 10\n2 5 5',
        expectedOutput: '10 15 15 5 5',
      },
    ],
    miniBuild: {
      title: 'C23 Mini Build: Leak-Free Heap Arena & Range Query Engine',
      description: 'Allocates a 1-indexed Heap prefix buffer, handles dynamic capacity cleanly, and guarantees zero leaked bytes.',
      banglaGoal: '`calloc` ও `free` দিয়ে নিরাপদ O(1) রেঞ্জ সাম ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–11',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *pref = calloc((size_t)n, sizeof(long long));
    if (!pref) return 1;
    long long run = 0;
    for (int i = 0; i < n; i++) {
        long long x = 0; scanf("%lld", &x);
        run += x;
        pref[i] = run;
        printf("%lld%s", pref[i], i + 1 == n ? "\\n" : " ");
    }
    free(pref);
    return 0;
}`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  cpp: {
    title: 'C++ Chapter 11 (C++23): Heap vs Stack, unique_ptr, shared_ptr & RAII Prefix Sums',
    banglaTitle: 'C++ অধ্যায় ১১ (C++23): হিপ বনাম স্ট্যাক, স্মার্ট পয়েন্টার (unique_ptr / shared_ptr)',
    subtitle: 'Eliminate manual new/delete leaks forever using std::make_unique, std::shared_ptr, std::weak_ptr cycle-breaking, and std::vector.',
    zeroIntuition: {
      plainEnglishStory:
        'Modern C++23 strictly bans raw `new` and `delete` in application logic! Stack objects clean up automatically when leaving `{ }`. For Heap-allocated objects or dynamic buffers, **`std::unique_ptr<T>`** gives exclusive single ownership with ZERO runtime overhead over raw pointers, **`std::shared_ptr<T>`** shares reference-counted ownership across graphs, and **`std::weak_ptr<T>`** breaks parent-child reference cycles so memory never leaks!',
      asciiFlowchart: `  C++23 RAII SMART POINTER OWNERSHIP MODEL
  Stack Frame                    Heap Memory
  +-------------------------+    +-------------------------------+
  | unique_ptr<Node> root --+--> | Node { val=42, next=... }     |
  +-------------------------+    +-------------------------------+
  (Moves with std::move;           Auto-deleted on '}' scope exit!
   Cannot copy -> Zero Double Free)
  
  Cycle Breaker: Parent --(shared_ptr)--> Child --(weak_ptr)--> Parent`,
      pseudocode: [
        '1. PREFER stack values & `std::vector<T>` (RAII Heap container) over raw arrays',
        '2. USE `auto p = std::make_unique<T>(args...)` when single-owner Heap object is needed',
        '3. TRANSFER unique ownership explicitly with `std::move(p)` (compile-time copy ban)',
        '4. BREAK cyclic `shared_ptr` links with `std::weak_ptr` back-pointers',
        '5. COMPUTE prefix sums safely inside `vector<long long>` with zero `delete` calls',
      ],
      banglaZeroToHero: {
        analogyTitle: 'স্বয়ংক্রিয় রুম-সার্ভিস (`unique_ptr`) ও যৌথ মালিকানা (`shared_ptr`)',
        explanation:
          'C-তে `malloc` করার পর `free` করতে ভুলে গেলে মেমোরি লিক হয়! কিন্তু আধুনিক C++23-এ আমরা **Smart Pointer** ব্যবহার করি: `unique_ptr` হলো এমন এক চাবি যা একজনের কাছেই থাকে—সে রুম ছাড়লে (`}`) হিপ মেমোরি অটোমেটিক পরিষ্কার হয়ে যায়! আর দুজন মিলে ব্যবহার করলে `shared_ptr` গুনতে থাকে কতজন আছে; সব শেষে ০ হলেই ডিলিট করে!',
        everydayExample:
          'হোটেলের স্মার্ট কার্ড: ঘর ছাড়লেই বিদ্যুৎ ও এসি নিজে থেকে বন্ধ (`~destructor`), কারো সুইচ অফ করতে মনে রাখার দরকার নেই!',
        keyTakeaways: [
          'আধুনিক C++-এ কখনো নিজে `new`/`delete` লিখবে না—`std::make_unique` বা `std::vector` ব্যবহার করো।',
          '`unique_ptr` কপি করা যায় না, শুধু `std::move()` দিয়ে হস্তান্তর করা যায়—ফলে ডাবল-ফ্রি অসম্ভব!',
          'দুটি `shared_ptr` একে অপরকে পয়েন্ট করলে রেফারেন্স কাউন্ট কখনো ০ হয় না—তাই ব্যাক-লিংকে `std::weak_ptr` বসাতে হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: RAII Heap Prefix Sum via std::vector<long long>',
        banglaNote: '`std::vector` হিপ মেমোরিতে অ্যালোকেট করে এবং স্কোপ শেষে নিজেই ফ্রি করে—O(n) প্রিফিক্স সাম।',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0;
    if (!(cin >> n) || n <= 0) return 0;
    vector<long long> pref(n);
    long long run = 0, x = 0;
    for (int i = 0; i < n; i++) {
        cin >> x;
        run += x;
        pref[i] = run;
        cout << pref[i] << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'cpp-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: std::unique_ptr Move Semantics & Null Guard',
        banglaNote: '`std::move` করার পর মূল `unique_ptr` স্বয়ংক্রিয়ভাবে `nullptr` হয়ে যায়—ডাবল-ফ্রি বা ড্যাংলিং পয়েন্টার অসম্ভব!',
        code: `#include <iostream>
#include <memory>
using namespace std;

struct Buffer {
    long long sum = 0;
    explicit Buffer(long long s) : sum(s) {}
};

int main() {
    auto p1 = make_unique<Buffer>(150);
    auto p2 = std::move(p1); // Ownership transferred! p1 is now nullptr
    cout << "p1_null=" << (p1 == nullptr) << " p2_sum=" << p2->sum << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'p1_null=1 p2_sum=150',
      },
      {
        id: 'cpp-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: std::shared_ptr + std::weak_ptr Zero-Leak Cycle',
        banglaNote: 'গ্রাফ/ট্রি-তে প্যারেন্ট-চাইল্ড সাইকেল তৈরি হলেও `weak_ptr` ব্যবহার করে রেফারেন্স কাউন্ট লিক ঠেকানো।',
        code: `#include <iostream>
#include <memory>
using namespace std;

struct Node {
    int id;
    shared_ptr<Node> child;
    weak_ptr<Node> parent; // weak_ptr avoids retain cycle!
    explicit Node(int i) : id(i) {}
};

int main() {
    auto root = make_shared<Node>(1);
    auto leaf = make_shared<Node>(2);
    root->child = leaf;
    leaf->parent = root;
    cout << "root_use=" << root.use_count() << " locked_parent=" << leaf->parent.lock()->id << "\\n";
    return 0;
}`,
        stdin: '',
        expectedOutput: 'root_use=1 locked_parent=1',
      },
      {
        id: 'cpp-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Flat 1D Heap Matrix + Reserve Zero-Reallocation',
        banglaNote: '`vector::reserve(n)` দিয়ে আগে থেকে ক্যাপাসিটি ফিক্স করে হিপ অ্যালোকেশন ১ বারের মধ্যে সীমাবদ্ধ রাখা।',
        code: `#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
    int n = 0; cin >> n;
    vector<long long> a;
    a.reserve(n);
    for (int i = 0; i < n; i++) {
        long long x; cin >> x;
        a.push_back(x);
    }
    vector<long long> pref(n);
    partial_sum(a.begin(), a.end(), pref.begin());
    for (int i = 0; i < n; i++) cout << pref[i] << (i + 1 == n ? "\\n" : " ");
    return 0;
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 11',
        codeSnippet: 'auto p1 = make_unique<Buffer>(150);',
        whatItMeans: 'Allocates `Buffer` on Heap wrapped inside an exclusive RAII smart pointer.',
        whyItIsThere: 'Exception-safe allocation with zero manual `delete` needed.',
        ifDeletedError: 'Raw `new Buffer` leaks memory if an exception occurs before `delete`.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'auto p2 = std::move(p1);',
        whatItMeans: 'Transfers ownership atomically from `p1` to `p2`, setting `p1 = nullptr`.',
        whyItIsThere: 'Enforces single-owner invariant so only `p2` destroys the Heap object.',
        ifDeletedError: 'Copy assignment `p2 = p1` fails to compile (`unique_ptr` is non-copyable).',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'weak_ptr<Node> parent;',
        whatItMeans: 'Non-owning observer pointer into a `shared_ptr` control block.',
        whyItIsThere: 'Does NOT increment strong reference count, preventing circular leaks.',
        ifDeletedError: 'Two `shared_ptr` pointing at each other stay alive forever (`use_count == 1`).',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'make_shared<Node>(1)', memoryOrStack: 'root strong=1', note: 'Heap Node(1) allocated' },
      { step: 2, state: 'root->child = leaf', memoryOrStack: 'leaf strong=2', note: 'Both stack & root hold leaf' },
      { step: 3, state: 'leaf->parent = root', memoryOrStack: 'root strong STILL 1 (weak=1)', note: 'Zero retain cycle!' },
      { step: 4, state: 'Scope ends }', memoryOrStack: 'root strong -> 0 -> leaf strong -> 0', note: 'Both freed deterministically' },
    ],
    harryBugTraps: [
      {
        title: 'Using `shared_ptr` Cycles Without `weak_ptr`',
        brokenCode: `a->next = b; b->next = a; // Memory NEVER freed when a,b leave scope!`,
        fixedCode: `Make back-pointer std::weak_ptr<Node> prev;`,
        whyItBreaks: 'Strong reference count drops from 2 to 1 on scope exit and never hits 0.',
      },
      {
        title: 'Dereferencing `.lock()` on `weak_ptr` Without Null Check',
        brokenCode: `cout << weakPtr.lock()->id; // Segfault if object already destroyed!`,
        fixedCode: `if (auto sp = weakPtr.lock()) { cout << sp->id; }`,
        whyItBreaks: '`.lock()` returns an empty `shared_ptr` (`nullptr`) after the target has been freed.',
      },
      {
        title: 'Creating `unique_ptr` Stack Array Exceeding Stack Instead of `vector`',
        brokenCode: `int arr[2000000]; // Stack Overflow SIGSEGV!`,
        fixedCode: `vector<int> arr(2000000); // Safely allocated on Heap`,
        whyItBreaks: '`std::vector` stores metadata on Stack (24 bytes) and payload safely on Heap.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-11-q1',
        difficulty: 'Easy',
        title: '1. RAII Heap Prefix Sum',
        prompt: 'Compute prefix sums in `vector<long long>` cleanly without manual memory management.',
        banglaHint: '`vector<long long> pref(n)` ব্যবহার করে প্রিফিক্স সাম বের করো।',
        starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<long long> pref(n);
    long long run = 0, x;
    for (int i = 0; i < n; i++) {
        cin >> x; run += x; pref[i] = run;
        cout << pref[i] << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'cpp-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Unique Ownership Move Drill',
        prompt: 'Create `unique_ptr<int>`, move it into a second handle, and print `null=1 val=<n>`.',
        banglaHint: '`make_unique<int>(x)` ও `std::move` ব্যবহার করো।',
        starterCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    int x = 0; cin >> x;
    auto a = make_unique<int>(x);
    auto b = std::move(a);
    cout << "null=" << (a == nullptr) << " val=" << *b << "\\n";
    return 0;
}`,
        sampleStdin: '42',
        expectedOutput: 'null=1 val=42',
      },
      {
        id: 'cpp-ch-11-q3',
        difficulty: 'Medium',
        title: '3. Shared Reference Counter Observer',
        prompt: 'Track `use_count()` as a `shared_ptr` enters and exits an inner block `{ ... }`.',
        banglaHint: 'ইনার স্কোপের ভেতর ও বাইরে `p.use_count()` প্রিন্ট করো।',
        starterCode: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    auto p = make_shared<int>(99);
    cout << p.use_count() << " ";
    {
        auto copy = p;
        cout << p.use_count() << " ";
    }
    cout << p.use_count() << "\\n";
    return 0;
}`,
        sampleStdin: '',
        expectedOutput: '1 2 1',
      },
      {
        id: 'cpp-ch-11-q4',
        difficulty: 'Medium',
        title: '4. O(1) Subarray Sum With Heap Prefix Vector',
        prompt: 'Answer `q` `[L, R]` range sum queries in O(1) each.',
        banglaHint: '১-ইনডেক্সড `vector<long long>` প্রিফিক্স তৈরি করো।',
        starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, q; cin >> n >> q;
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) { long long x; cin >> x; p[i] = p[i - 1] + x; }
    while (q--) {
        int l, r; cin >> l >> r;
        cout << p[r] - p[l - 1] << "\\n";
    }
    return 0;
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'cpp-ch-11-q5',
        difficulty: 'Hard',
        title: '5. RAII Unique-Ptr Linked List Sum',
        prompt: 'Build a small singly linked list using `unique_ptr<Node>` and compute node sum.',
        banglaHint: '`unique_ptr<Node>` দিয়ে নোড চেইন বানিয়ে যোগফল বের করো।',
        starterCode: `#include <iostream>
#include <memory>
using namespace std;

struct Node { int v; unique_ptr<Node> next; Node(int x) : v(x) {} };

int main() {
    int n; cin >> n;
    unique_ptr<Node> head;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        auto node = make_unique<Node>(x);
        node->next = std::move(head);
        head = std::move(node);
    }
    long long s = 0;
    for (Node* cur = head.get(); cur != nullptr; cur = cur->next.get()) s += cur->v;
    cout << s << "\\n";
    return 0;
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Zero-Leak Smart-Pointer & Prefix Engine',
      description: 'Uses RAII `std::vector` Heap buffers with 64-bit cumulative prefix sums and zero manual deletes.',
      banglaGoal: 'C++23 RAII দিয়ে হিপ মেমোরি লিক ছাড়াই প্রিফিক্স সাম ইঞ্জিন তৈরি করা।',
      combinesChapters: 'Ch 1–11',
      starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 0; cin >> n;
    vector<long long> pref(n);
    long long run = 0, x = 0;
    for (int i = 0; i < n; i++) {
        cin >> x; run += x; pref[i] = run;
        cout << pref[i] << (i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  python: {
    title: 'Python Chapter 11 (Python 3.13): PyObject Heap, Refcounting, Cyclic GC & __slots__',
    banglaTitle: 'Python অধ্যায় ১১ (Python 3.13): সবকিছুই হিপে (PyObject), রেফারেন্স কাউন্টিং ও GC',
    subtitle: 'Understand why every Python int/list lives on the Heap, sys.getrefcount, cyclic garbage collection, __slots__ memory cuts, and prefix sums.',
    zeroIntuition: {
      plainEnglishStory:
        'In CPython, **every object—even `42` or `"hi"`—lives on the Heap as a `PyObject`**. Variables on the Stack hold only 8-byte pointers to Heap objects! Python automatically tracks `ob_refcnt` (how many pointers reference an object) and immediately frees it when refcount hits `0`, backed by a generational **Cyclic GC** (`gc` module) for reference loops like `a.ref = b; b.ref = a`. Using `__slots__` removes per-instance `__dict__` hash maps, cutting RAM by 50%+!',
      asciiFlowchart: `  CPYTHON STACK NAMES -> HEAP PyObjects (refcount)
  Frame Locals            Heap Memory
  [ nums ] -------------> [ PyListObject (refcnt=1) | ptrs -> [3, 1, 4, 2] ]
  [ alias = nums ] -----> (same object! refcnt increments to 2)
  del alias ------------> refcnt drops to 1; del nums -> refcnt=0 -> Freed!`,
      pseudocode: [
        '1. REMEMBER local variables only store references; objects reside on CPython Heap',
        '2. CHECK `sys.getsizeof` / `weakref` to prevent accidental memory retention cycles',
        '3. ADD `__slots__` or `@dataclass(slots=True)` on classes with 100k+ instances',
        '4. COMPUTE linear `itertools.accumulate` / running prefix sum over lists in O(n)',
        '5. AVOID `sys.setrecursionlimit` stack crashes by writing iterative loops for deep N',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ট্যাগ-কাউন্টার (`refcount`) এবং রাতের ঝাড়ুদার (`Cyclic GC`)',
        explanation:
          'Python-এ ভ্যারিয়েবল হলো স্টিকার নাম, আর আসল বস্তু (`int`, `list`, অবজেক্ট) সবই হিপ গুদামে থাকে! প্রতিটি বস্তুর গায়ে একটা ডিজিটাল কাউন্টার লেখা থাকে—কতজন একে ধরে আছে (`refcount`)। যেই কাউন্টার ০ হয়, তৎক্ষণাৎ বস্তু ডিলিট! কিন্তু দুটি বস্তু যদি একে অন্যকে জড়িয়ে ধরে থাকে (`a -> b`, `b -> a`), তখন কাউন্টার ১ থেকে যায়—তখন Python-এর `gc` ঝাড়ুদার এসে ওই জট পাকানো চক্র পরিষ্কার করে দেয়!',
        everydayExample:
          'লাইব্রেরির একটি বই যতক্ষণ কোনো পাঠকের হাতে থাকে (`refcount > 0`) তা তাকের বাইরে থাকে; শেষ পাঠক ফেরত দিলে (`0`) সাথে সাথে ফেরত চলে যায়।',
        keyTakeaways: [
          '`x = 5; y = x` করলে কোনো কপি হয় না—দুটি নামই একই হিপ `PyObject`-কে দেখায়।',
          'সাধারণ ক্লাসে প্রতি অবজেক্টে একটি গোপন `__dict__` থাকে; `@dataclass(slots=True)` দিলে ৫০%+ RAM বাঁচে!',
          '`itertools.accumulate(nums)` এক লাইনে সি-গতিতে প্রিফিক্স সাম বের করে!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Dynamic List Heap Prefix Sum',
        banglaNote: 'হিপে তৈরি `list`-এ ইনপুট নিয়ে O(n) প্রিফিক্স সাম বের করা।',
        code: `import sys
nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
run = 0
out = []
for x in nums[1:1 + n]:
    run += x
    out.append(str(run))
print(" ".join(out))`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'py-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Refcounting + weakref Breaking Object Cycles',
        banglaNote: '`weakref.ref` দিয়ে প্যারেন্ট-চাইল্ড সাইকেল তৈরি হলেও মেমোরি সাথে সাথে রিলিজ হওয়া যাচাই।',
        code: `import sys, weakref

class Node:
    def __init__(self, name: str):
        self.name = name
        self.parent = None

root = Node("root")
child = Node("child")
child.parent = weakref.ref(root)
print(f"parent={child.parent().name} refcnt={sys.getrefcount(root) - 1}")`,
        stdin: '',
        expectedOutput: 'parent=root refcnt=1',
      },
      {
        id: 'py-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: __slots__ Class Memory Reduction Benchmark',
        banglaNote: '`__slots__` ব্যবহার করে `__dict__` সরিয়ে হাজারো অবজেক্টের হিপ মেমোরি বাঁচানো।',
        code: `import sys

class Heavy:
    def __init__(self, x, y):
        self.x, self.y = x, y

class Slim:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x, self.y = x, y

h = Heavy(1, 2)
s = Slim(1, 2)
print(f"slots_saves_dict={not hasattr(s, '__dict__') and hasattr(h, '__dict__')}")`,
        stdin: '',
        expectedOutput: 'slots_saves_dict=True',
      },
      {
        id: 'py-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: C-Speed itertools.accumulate Prefix Sum',
        banglaNote: 'পাইথন লুপের চেয়ে দ্রুত C-ইমপ্লিমেন্টেড `itertools.accumulate` দিয়ে প্রিফিক্স সাম।',
        code: `import sys
from itertools import accumulate

nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
print(" ".join(map(str, accumulate(nums[1:1 + n]))))`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 2',
        codeSnippet: 'nums = list(map(int, sys.stdin.read().split()))',
        whatItMeans: 'Allocates a dynamic PyList on the Heap holding integer object pointers.',
        whyItIsThere: 'Python lists resize geometrically (~1.125x) so appends run O(1) amortized.',
        ifDeletedError: 'Input sequence is never loaded into memory.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'child.parent = weakref.ref(root)',
        whatItMeans: 'Holds an observer link without incrementing `root.ob_refcnt`.',
        whyItIsThere: 'Allows reference-counting to drop `root` immediately instead of waiting for cyclic GC.',
        ifDeletedError: 'Direct cycle delays deallocation until GC sweep runs.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: '__slots__ = ("x", "y")',
        whatItMeans: 'Replaces dynamic per-instance `__dict__` hash table with fixed C-struct slots.',
        whyItIsThere: 'Saves ~100+ bytes per instance when allocating 10^5 tree/graph nodes.',
        ifDeletedError: 'Memory usage jumps significantly for large object graphs.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'nums = [4, 3, 1, 4, 2]', memoryOrStack: 'PyList Heap ptrs', note: 'n=4 extracted' },
      { step: 2, state: 'Iterate nums[1:5]', memoryOrStack: 'run: 3 -> 4 -> 8 -> 10', note: 'Single linear pass' },
      { step: 3, state: '" ".join(out)', memoryOrStack: '"3 4 8 10"', note: 'O(n) string join vs O(n^2) +=' },
    ],
    harryBugTraps: [
      {
        title: 'Blowing Python Stack Depth (~1000) With Deep Recursion',
        brokenCode: `def s(n): return 0 if n == 0 else n + s(n - 1)\nprint(s(10000)) # RecursionError!`,
        fixedCode: `Use an iterative loop or explicit Heap list stack for depth > 1000.`,
        whyItBreaks: 'Python caps Call Stack at ~1,000 frames to protect C stack memory.',
      },
      {
        title: 'Creating `[[0] * 3] * 3` Shared Heap References',
        brokenCode: `grid = [[0]*3]*3; grid[0][0] = 9 # ALL 3 rows become [9,0,0]!`,
        fixedCode: `grid = [[0]*3 for _ in range(3)]`,
        whyItBreaks: '`* 3` copies the SAME Heap list reference 3 times instead of allocating 3 distinct lists.',
      },
      {
        title: 'Holding Huge Dead Lists in Global Scope',
        brokenCode: `big = [i for i in range(5_000_000)] # stays referenced forever!`,
        fixedCode: `Keep heavy buffers inside functions so refcount hits 0 on return, or use generators.`,
        whyItBreaks: 'Global module dictionary keeps `ob_refcnt >= 1` for the entire run.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Prefix Sum List Engine',
        prompt: 'Read `n` and `n` integers and output cumulative prefix sums.',
        banglaHint: 'হিপ লিস্ট বা `itertools.accumulate` দিয়ে প্রিফিক্স সাম বের করো।',
        starterCode: `import sys
nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
run = 0
out = []
for x in nums[1:1 + n]:
    run += x
    out.append(str(run))
print(" ".join(out))`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'py-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Safe 2D Grid Without Shared Reference Bug',
        prompt: 'Create an `r x c` zero grid safely, set `[0][0] = 9`, and print sum of row 1.',
        banglaHint: '`[[0]*c for _ in range(r)]` দিয়ে আলাদা হিপ সারি তৈরি করো।',
        starterCode: `import sys
r, c = map(int, sys.stdin.read().split())
grid = [[0] * c for _ in range(r)]
grid[0][0] = 9
print(sum(grid[1]))`,
        sampleStdin: '3 3',
        expectedOutput: '0',
      },
      {
        id: 'py-ch-11-q3',
        difficulty: 'Medium',
        title: '3. O(1) Subarray Range Sum Query',
        prompt: 'Build 1-indexed prefix sum list and answer `q` `[L, R]` sum queries.',
        banglaHint: '`pref[r] - pref[l - 1]` সূত্র ব্যবহার করো।',
        starterCode: `import sys
data = list(map(int, sys.stdin.read().split()))
n, q = data[0], data[1]
p = [0] * (n + 1)
for i in range(1, n + 1):
    p[i] = p[i - 1] + data[1 + i]
idx = 2 + n
for _ in range(q):
    l, r = data[idx], data[idx + 1]
    idx += 2
    print(p[r] - p[l - 1])`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'py-ch-11-q4',
        difficulty: 'Medium',
        title: '4. __slots__ Node Chain Memory Saver',
        prompt: 'Build linked nodes using `__slots__` for `n` inputs and print their sum.',
        banglaHint: '`__slots__ = ("val", "nxt")` দিয়ে হালকা নোড ক্লাস বানাও।',
        starterCode: `import sys
class Node:
    __slots__ = ("val", "nxt")
    def __init__(self, val, nxt=None):
        self.val = val
        self.nxt = nxt

nums = list(map(int, sys.stdin.read().split()))
head = None
for x in nums[1:1 + nums[0]]:
    head = Node(x, head)
s = 0
cur = head
while cur:
    s += cur.val
    cur = cur.nxt
print(s)`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
      {
        id: 'py-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Generator O(1)-Heap Streaming Running Max',
        prompt: 'Stream `n` values using a generator expression (no intermediate list) and emit running maximums.',
        banglaHint: '`yield` জেনারেটর ব্যবহার করে O(1) হিপ মেমোরিতে রানিং ম্যাক্স বের করো।',
        starterCode: `import sys
def running_max(seq):
    cur = None
    for x in seq:
        cur = x if cur is None or x > cur else cur
        yield str(cur)

nums = list(map(int, sys.stdin.read().split()))
print(" ".join(running_max(nums[1:1 + nums[0]])))`,
        sampleStdin: '5\n2 7 3 9 4',
        expectedOutput: '2 7 7 9 9',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: Heap-Aware Accumulator & Prefix Engine',
      description: 'Streams inputs cleanly via O(n) Heap prefix array without quadratic string allocations.',
      banglaGoal: '`itertools.accumulate` ও `__slots__` দিয়ে কম মেমোরির প্রিফিক্স ইঞ্জিন চালানো।',
      combinesChapters: 'Ch 1–11',
      starterCode: `import sys
from itertools import accumulate

nums = list(map(int, sys.stdin.read().split()))
n = nums[0]
print(" ".join(map(str, accumulate(nums[1:1 + n]))))`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  java: {
    title: 'Java Chapter 11 (Java 21): JVM Stack vs Heap, GC Generations & Primitive Arrays',
    banglaTitle: 'Java অধ্যায় ১১ (Java 21): JVM স্ট্যাক বনাম হিপ, গার্বেজ কালেক্টর ও প্রিমিটিভ অ্যারে',
    subtitle: 'Understand JVM Stack frames vs Garbage-Collected Heap objects, primitive long[] vs boxed Long[] overhead, and Escape Analysis.',
    zeroIntuition: {
      plainEnglishStory:
        'Inside the JVM, primitive locals (`int`, `long`) and object references live directly inside **Thread Stack Frames** (~1 MB/thread). Every `new` object and every array (`new long[n]`) lives on the **Managed Heap**, cleaned automatically by Garbage Collectors (G1GC / ZGC). Knowing memory cost separates seniors from juniors: `long[1_000_000]` takes **8 MB**, whereas boxed `Long[1_000_000]` takes **24+ MB** and triggers heavy GC pauses!',
      asciiFlowchart: `  JVM THREAD STACK              MANAGED HEAP (G1GC / ZGC)
  +---------------------+       +----------------------------------+
  | int n = 4;          |       | long[4] = [ 3 | 4 | 8 | 10 ]     | (8 bytes each!)
  | long[] pref --------+-----> +----------------------------------+
  +---------------------+       | vs Long[] -> Object Header + 8B  | (3x RAM!)`,
      pseudocode: [
        '1. STORE numbers in primitive `long[]` / `int[]` (contiguous Heap) rather than `ArrayList<Long>`',
        '2. REUSE `StringBuilder` to emit large outputs without creating millions of Heap String objects',
        '3. AVOID keeping dead references in static fields (`static List`) which block Garbage Collection',
        '4. COMPUTE prefix sums in O(n) over `long[] pref = new long[n]`',
        '5. PROTECT against StackOverflowError on deep recursion by converting to Heap `ArrayDeque`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শ্রমসাধ্য সাশ্রয়ী `long[]` বনাম ভারী বাক্সবন্দি `Long[]` (Boxing Overhead)',
        explanation:
          'JVM-এ প্রতিটি সাধারণ `long` সংখ্যা নিতে মাত্র ৮ বাইট লাগে। কিন্তু `ArrayList<Long>` বা `Long[]` ব্যবহার করলে প্রতিটি সংখ্যার চারপাশে JVM-কে একটা করে আলাদা অবজেক্ট বাক্স বানাতে হয়—ফলে ৩–৪ গুণ বেশি Heap RAM খরচ হয় আর Garbage Collector ঘনঘন কাজ করে কোড স্লো করে দেয়! তাই সংখ্যা হিসাবের সময় সবসময় `long[]` প্রিমিটিভ অ্যারে ব্যবহার করবে।',
        everydayExample:
          '১০০০টি ডিম একটি ক্রেটে রাখা (`long[]`) বনাম প্রতিটি ডিম আলাদা গিফট বক্সে প্যাক করে রাখা (`Long[]`)!',
        keyTakeaways: [
          'সব অবজেক্ট এবং অ্যারে JVM Heap-এ তৈরি হয়; ভ্যারিয়েবল রেফারেন্স থাকে Thread Stack-এ।',
          '`String` লুপে `+` করলে হাজার হাজার অব্যবহৃত হিপ অবজেক্ট জমে—সবসময় `StringBuilder` ব্যবহার করো।',
          'মেমোরি লিক Java-তেও হতে পারে—যদি অপ্রয়োজনীয় অবজেক্ট `static` লিস্টে থেকে যায়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Primitive long[] Heap Prefix Sum + StringBuilder',
        banglaNote: 'বক্সিং ছাড়া `long[]` অ্যারে ও `StringBuilder` দিয়ে কম RAM ও দ্রুতগতির আউটপুট।',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] pref = new long[n];
        long run = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            run += sc.nextLong();
            pref[i] = run;
            if (i > 0) sb.append(' ');
            sb.append(pref[i]);
        }
        System.out.println(sb.toString());
    }
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'java-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Preventing StackOverflowError With Iterative ArrayDeque',
        banglaNote: '১ লাখ ডিপ রিকার্শনে JVM StackOverflowError দেয়—তা এড়াতে Heap-এ `ArrayDeque` ব্যবহার।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int n = new Scanner(System.in).nextInt();
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        long sum = 0;
        for (int i = 1; i <= n; i++) stack.push(i);
        while (!stack.isEmpty()) sum += stack.pop();
        System.out.println(sum);
    }
}`,
        stdin: '100',
        expectedOutput: '5050',
      },
      {
        id: 'java-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Arrays.parallelPrefix Zero-Loop-Overhead Prefix',
        banglaNote: 'Java স্ট্যান্ডার্ড লাইব্রেরির `Arrays.parallelPrefix` দিয়ে ইন-প্লেস হিপ প্রিফিক্স সাম।',
        code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] a = new long[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextLong();
        Arrays.parallelPrefix(a, Long::sum);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        System.out.println(sb);
    }
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'java-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: WeakReference Cache Eviction Demonstration',
        banglaNote: '`WeakReference` ব্যবহার করে মেমোরি চাপে পড়লে JVM-কে ক্যাশ অটোমেটিক খালি করার সুযোগ দেওয়া।',
        code: `import java.lang.ref.WeakReference;

public class Main {
    public static void main(String[] args) {
        byte[] heavy = new byte[1024];
        WeakReference<byte[]> cache = new WeakReference<>(heavy);
        System.out.println("alive=" + (cache.get() != null) + " len=" + cache.get().length);
    }
}`,
        stdin: '',
        expectedOutput: 'alive=true len=1024',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 7',
        codeSnippet: 'long[] pref = new long[n];',
        whatItMeans: 'Allocates one contiguous primitive 64-bit array on the JVM Heap.',
        whyItIsThere: '3x smaller footprint and better CPU cache locality than `Long[]`.',
        ifDeletedError: 'Prefix sequence cannot be stored for O(1) lookups.',
      },
      {
        lineNumber: 'Line 9',
        codeSnippet: 'StringBuilder sb = new StringBuilder();',
        whatItMeans: 'Creates one mutable char/byte buffer on Heap instead of immutable String copies.',
        whyItIsThere: 'Prevents creating O(n^2) temporary String garbage during output formatting.',
        ifDeletedError: 'String concatenation in a 10^5 loop stalls due to GC churn.',
      },
      {
        lineNumber: 'Line 10',
        codeSnippet: 'Arrays.parallelPrefix(a, Long::sum);',
        whatItMeans: 'Mutates array in-place with cumulative sums using ForkJoinPool for large n.',
        whyItIsThere: 'Zero extra array allocation + hardware parallelism.',
        ifDeletedError: 'Array stays raw without cumulative prefix calculation.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'new long[4]', memoryOrStack: 'Stack pref -> Heap[0,0,0,0]', note: '32 bytes + array header' },
      { step: 2, state: 'run += 3,1,4,2', memoryOrStack: 'Heap[3,4,8,10]', note: 'Zero boxed Long objects' },
      { step: 3, state: 'sb.toString()', memoryOrStack: '"3 4 8 10"', note: 'Single allocation output' },
    ],
    harryBugTraps: [
      {
        title: 'Using `ArrayList<Integer>` Instead of `int[]` for 10^6 Items',
        brokenCode: `List<Integer> list = new ArrayList<>(); // Boxes 1,000,000 Integer objects!`,
        fixedCode: `int[] arr = new int[n]; // 4x less Heap, zero GC pressure`,
        whyItBreaks: 'Auto-boxing allocates a separate Heap object for every integer.',
      },
      {
        title: 'Appending Strings Inside Loops (`ans += x + " "`)',
        brokenCode: `String s = ""; for (int x : arr) s += x + " "; // O(n^2) Heap garbage!`,
        fixedCode: `StringBuilder sb = new StringBuilder(); for (int x : arr) sb.append(x).append(' ');`,
        whyItBreaks: 'Strings are immutable; every `+=` copies the entire string so far onto Heap.',
      },
      {
        title: 'Deep Recursion Exhausting Default 1MB JVM Stack',
        brokenCode: `long f(int n) { return n==0 ? 0 : n + f(n-1); } // StackOverflowError at ~15k!`,
        fixedCode: `Convert deep DFS/DP to explicit Heap ArrayDeque.`,
        whyItBreaks: 'JVM thread stack frames are tiny (~1MB) compared to multi-GB Heap.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Primitive Heap Prefix Sum',
        prompt: 'Read `n` numbers into `long[]` and print cumulative prefix sums.',
        banglaHint: '`long[]` এবং `StringBuilder` ব্যবহার করে প্রিফিক্স সাম বের করো।',
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] pref = new long[n];
        long run = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            run += sc.nextLong();
            pref[i] = run;
            if (i > 0) sb.append(' ');
            sb.append(pref[i]);
        }
        System.out.println(sb.toString());
    }
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'java-ch-11-q2',
        difficulty: 'Easy',
        title: '2. In-Place Primitive Reverse',
        prompt: 'Reverse a primitive `int[]` in-place (O(1) extra Heap) and print elements.',
        banglaHint: 'দুই প্রান্ত সোয়াপ করে অতিরিক্ত অ্যারে ছাড়াই উল্টে দাও।',
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        for (int l = 0, r = n - 1; l < r; l++, r--) { int t = a[l]; a[l] = a[r]; a[r] = t; }
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        System.out.println(sb);
    }
}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '40 30 20 10',
      },
      {
        id: 'java-ch-11-q3',
        difficulty: 'Medium',
        title: '3. O(1) Subarray Range Query on long[]',
        prompt: 'Build 1-indexed `long[] pref` and answer `q` `[L, R]` range sums.',
        banglaHint: '`pref[r] - pref[l - 1]` সূত্র ব্যবহার করো।',
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), q = sc.nextInt();
        long[] p = new long[n + 1];
        for (int i = 1; i <= n; i++) p[i] = p[i - 1] + sc.nextLong();
        while (q-- > 0) {
            int l = sc.nextInt(), r = sc.nextInt();
            System.out.println(p[r] - p[l - 1]);
        }
    }
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'java-ch-11-q4',
        difficulty: 'Medium',
        title: '4. ArrayDeque Stack Sum',
        prompt: 'Push `n` integers onto an `ArrayDeque<Long>` and pop to sum.',
        banglaHint: '`ArrayDeque` হিপ স্ট্যাকে পুশ ও পপ করে যোগফল বের করো।',
        starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayDeque<Long> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) st.push(sc.nextLong());
        long sum = 0;
        while (!st.isEmpty()) sum += st.pop();
        System.out.println(sum);
    }
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
      {
        id: 'java-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Prefix Frequency Balanced Split Check',
        prompt: 'Check if array can split into two non-empty parts with equal sum (`YES`/`NO`).',
        banglaHint: 'মোট যোগফলের অর্ধেক প্রিফিক্স পাওয়া যায় কি না দেখো।',
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] a = new long[n];
        long total = 0;
        for (int i = 0; i < n; i++) { a[i] = sc.nextLong(); total += a[i]; }
        long pref = 0; boolean ok = false;
        for (int i = 0; i < n - 1; i++) {
            pref += a[i];
            if (pref * 2 == total) ok = true;
        }
        System.out.println(ok ? "YES" : "NO");
    }
}`,
        sampleStdin: '4\n1 4 2 3',
        expectedOutput: 'YES',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: Zero-Boxing Heap Prefix Engine',
      description: 'Processes cumulative queries using compact `long[]` contiguous Heap memory and `StringBuilder`.',
      banglaGoal: 'Java 21-এ আনবক্সড `long[]` ও `StringBuilder` দিয়ে মেমোরি-বান্ধব প্রিফিক্স ইঞ্জিন।',
      combinesChapters: 'Ch 1–11',
      starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] pref = new long[n];
        long run = 0;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            run += sc.nextLong();
            pref[i] = run;
            if (i > 0) sb.append(' ');
            sb.append(pref[i]);
        }
        System.out.println(sb.toString());
    }
}`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 11 (ES2025): V8 Stack vs Heap, Closures, WeakMap & TypedArrays',
    banglaTitle: 'JavaScript অধ্যায় ১১ (ES2025): V8 স্ট্যাক বনাম হিপ, ক্লোজার ও WeakMap মেমোরি সেফটি',
    subtitle: 'Master how V8 stores primitives vs objects, how closures retain Heap memory, WeakMap leak prevention, and Float64Array buffers.',
    zeroIntuition: {
      plainEnglishStory:
        'Inside V8 (Chrome/Node.js), fixed-size primitives (`number`, `boolean`) live efficiently on the **Call Stack** or inline registers, while every **Object, Array, and Closure** is allocated on the **V8 Heap** managed by the Orinoco Garbage Collector. Watch out for **Memory Leaks via Closures, forgotten Timers, or global Maps**: storing object metadata inside a `WeakMap` lets GC reclaim unused keys automatically!',
      asciiFlowchart: `  V8 STACK FRAME                  V8 HEAP (ORINOCO GC)
  +----------------------+        +-----------------------------------+
  | const n = 4;         |        | Array [3, 4, 8, 10]               |
  | const meta = WeakMap +------> | (auto-freed when obj unreachable) |
  | Int32Array(n) -------+------> | Contiguous C-style Heap Bytes!    |
  +----------------------+        +-----------------------------------+`,
      pseudocode: [
        '1. ALLOCATE contiguous numeric buffers with `Float64Array` / `Int32Array` for high throughput',
        '2. STORE object-keyed caches in `WeakMap` instead of `Map` to prevent dangling memory leaks',
        '3. AVOID keeping giant unused variables captured inside long-lived closures',
        '4. COMPUTE cumulative prefix sums cleanly in O(n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'শিকলে বাঁধা `Map` বনাম স্বয়ংক্রিয় মুক্ত `WeakMap`',
        explanation:
          'JavaScript-এ গার্বেজ কালেক্টর (GC) অপ্রয়োজনীয় হিপ অবজেক্ট পরিষ্কার করে দেয়। কিন্তু তুমি যদি কোনো ডোম নোড বা অবজেক্টকে সাধারণ `Map`-এ চাবি হিসেবে রেখে দাও, তবে সেই অবজেক্ট পেজ থেকে মুছে ফেলার পরও `Map` তাকে ধরে রাখবে—এটাই JS মেমোরি লিক! এর সমাধান হলো `WeakMap`—মূল অবজেক্ট ডিলিট হলেই `WeakMap` নিজে থেকে এন্ট্রি মুছে মেমোরি খালি করে দেয়!',
        everydayExample:
          'একটি অ্যাপ থেকে ইউজারের প্রোফাইল কার্ড বন্ধ করে দেওয়ার পরও ব্যাকগ্রাউন্ডে তার ছবিগুলো ক্যাশ ম্যাপে আটকে থাকা—`WeakMap` ব্যবহার করলে সাথে সাথে খালি হয়ে যায়!',
        keyTakeaways: [
          'অবজেক্ট মেটাডেটা ক্যাশ করতে `Map`-এর বদলে `WeakMap` ব্যবহার করলে মেমোরি লিক হয় না।',
          '`Int32Array` / `Float64Array` V8-এ সরাসরি বাইনারি হিপ বাফার দেয়—সাধারণ JS অ্যারের চেয়ে অনেক কম RAM নেয়।',
          'দীর্ঘজীবী ক্লোজারের ভেতর বড় অ্যারে ক্যাপচার করে রেখো না!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Dynamic Heap Array Prefix Sum',
        banglaNote: '`.slice()` ও `.map()` ব্যবহার করে O(n) প্রিফিক্স সাম বের করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
let run = 0;
const pref = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'js-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: WeakMap Object Metadata Without Memory Retention',
        banglaNote: '`WeakMap` ব্যবহার করে অবজেক্টের অতিরিক্ত ডেটা সংরক্ষণ যাতে অবজেক্ট মুছলে ক্যাশও অটো-মুক্ত হয়।',
        code: `const meta = new WeakMap();
function tagUser(obj, role) {
  meta.set(obj, { role, seen: true });
}
let user = { name: 'Arjun' };
tagUser(user, 'admin');
console.log(meta.has(user), meta.get(user).role);
user = null; // Heap object & WeakMap entry are now both GC-eligible!`,
        stdin: '',
        expectedOutput: 'true admin',
      },
      {
        id: 'js-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Float64Array Contiguous Binary Heap Prefix Buffer',
        banglaNote: '`Float64Array` ব্যবহার করে V8-এর জেনেরিক অবজেক্ট অ্যারে এড়িয়ে সরাসরি কন্টিগুয়াস হিপে হিসাব।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0];
const pref = new Float64Array(n);
let run = 0;
for (let i = 0; i < n; i++) {
  run += nums[1 + i];
  pref[i] = run;
}
console.log(Array.from(pref).join(' '));`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'js-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Closure Factory Encapsulating Private Heap State',
        banglaNote: 'ক্লোজারের ভেতর হিপ ভ্যারিয়েবল এনক্যাপসুলেট করে অ্যাকুমুলেটর তৈরি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
function makePrefixer() {
  let acc = 0;
  return (x) => (acc += x);
}
const step = makePrefixer();
const nums = raw.trim().split(/\\s+/).map(Number);
console.log(nums.slice(1, 1 + nums[0]).map(step).join(' '));`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'const meta = new WeakMap();',
        whatItMeans: 'Creates a weakly held key-value table where keys must be Heap objects.',
        whyItIsThere: 'Prevents GC retention leaks when attaching metadata to DOM nodes or entities.',
        ifDeletedError: 'Regular `Map` pins deleted keys in RAM forever.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const pref = new Float64Array(n);',
        whatItMeans: 'Allocates `8 * n` raw contiguous bytes backed by an `ArrayBuffer` on Heap.',
        whyItIsThere: 'Avoids V8 hidden-class boxing and sparse array deoptimizations.',
        ifDeletedError: 'Standard JS arrays resize dynamically and box mixed values.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'user = null;',
        whatItMeans: 'Drops the last strong reference to `{ name: "Arjun" }`.',
        whyItIsThere: 'Signals V8 Orinoco GC that both the object and its WeakMap slot can be reclaimed.',
        ifDeletedError: 'Strong reference keeps object live.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'nums = [4,3,1,4,2]', memoryOrStack: 'n=4 on stack', note: 'Input parsed' },
      { step: 2, state: 'new Float64Array(4)', memoryOrStack: '32B contiguous Heap', note: 'Zeroed typed buffer' },
      { step: 3, state: 'i=0..3 accumulate', memoryOrStack: 'pref=[3,4,8,10]', note: 'O(n) linear pass' },
    ],
    harryBugTraps: [
      {
        title: 'Creating Accidental Globals Without `let`/`const`',
        brokenCode: `function calc() { bigLeak = new Array(100000); } // attaches to globalThis!`,
        fixedCode: `function calc() { const bigLocal = new Array(100000); }`,
        whyItBreaks: 'Undeclared variables leak onto the global object and never get Garbage Collected.',
      },
      {
        title: 'Using `Map` Instead of `WeakMap` for Ephemeral DOM/Object Metadata',
        brokenCode: `const cache = new Map(); cache.set(domButton, stats);`,
        fixedCode: `const cache = new WeakMap(); cache.set(domButton, stats);`,
        whyItBreaks: 'Removing `domButton` from DOM does not release it if a global `Map` holds its reference.',
      },
      {
        title: 'Unbounded Recursion Blowing V8 Call Stack (~10k frames)',
        brokenCode: `const sum = (n) => n ? n + sum(n - 1) : 0; sum(100000); // RangeError!`,
        fixedCode: `Use an iterative loop or explicit queue/stack array.`,
        whyItBreaks: 'JavaScript engines do not guarantee Tail Call Optimization in V8.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Heap Array Prefix Sum',
        prompt: 'Compute prefix sums of `n` numbers cleanly in one linear pass.',
        banglaHint: '`nums.slice(1, 1 + nums[0]).map((x) => (run += x))` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
let run = 0;
const pref = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'js-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Contiguous Int32Array Sum',
        prompt: 'Load `n` integers into an `Int32Array` buffer and print their sum.',
        banglaHint: '`new Int32Array(n)` বাফার তৈরি করে যোগফল বের করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const buf = Int32Array.from(nums.slice(1, 1 + nums[0]));
let s = 0; for (const x of buf) s += x;
console.log(s);`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
      {
        id: 'js-ch-11-q3',
        difficulty: 'Medium',
        title: '3. O(1) Subarray Range Sum Query',
        prompt: 'Build 1-indexed `Float64Array` prefix buffer and answer `q` `[L, R]` sum queries.',
        banglaHint: '`p[r] - p[l - 1]` সূত্র দিয়ে প্রতি কুয়েরি O(1)-এ উত্তর দাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const d = raw.trim().split(/\\s+/).map(Number);
const [n, q] = d;
const p = new Float64Array(n + 1);
for (let i = 1; i <= n; i++) p[i] = p[i - 1] + d[1 + i];
for (let i = 0, idx = 2 + n; i < q; i++, idx += 2) {
  console.log(p[d[idx + 1]] - p[d[idx] - 1]);
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'js-ch-11-q4',
        difficulty: 'Medium',
        title: '4. Closure Private Stack Simulation',
        prompt: 'Implement a closure-based stack supporting `push` on inputs and print `size top`.',
        banglaHint: 'ক্লোজারের ভেতর `items` অ্যারে লুকিয়ে রেখে পুশ ও টপ দেখাও।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const st = (() => {
  const items = [];
  return { push: (x) => items.push(x), info: () => \`\${items.length} \${items[items.length - 1]}\` };
})();
for (const x of nums.slice(1, 1 + nums[0])) st.push(x);
console.log(st.info());`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '4 2',
      },
      {
        id: 'js-ch-11-q5',
        difficulty: 'Hard',
        title: '5. WeakMap Memoized Node Scoring',
        prompt: 'Cache derived scores on object references via `WeakMap` and print cached lookup sum.',
        banglaHint: '`WeakMap` ব্যবহার করে অবজেক্টের স্কোর ক্যাশ করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const wm = new WeakMap();
const objs = nums.slice(1, 1 + nums[0]).map((v) => ({ v }));
for (const o of objs) wm.set(o, o.v * 2);
console.log(objs.reduce((acc, o) => acc + wm.get(o), 0));`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '20',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: TypedArray Heap Prefix & Closure Engine',
      description: 'Computes prefix sums over a contiguous `Float64Array` Heap allocation with zero GC churn.',
      banglaGoal: '`Float64Array` কন্টিগুয়াস হিপ বাফার দিয়ে প্রিফিক্স সাম ইঞ্জিন চালানো।',
      combinesChapters: 'Ch 1–11',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nums = raw.trim().split(/\\s+/).map(Number);
const n = nums[0];
const pref = new Float64Array(n);
let run = 0;
for (let i = 0; i < n; i++) {
  run += nums[1 + i];
  pref[i] = run;
}
console.log(Array.from(pref).join(' '));`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  rust: {
    title: 'Rust Chapter 11 (Rust 2024): Stack vs Heap, Box<T>, Rc<T>, Arc<T> & Zero-GC Drop',
    banglaTitle: 'Rust অধ্যায় ১১ (Rust 2024): স্ট্যাক বনাম হিপ, Box<T>, Rc<T> ও জিরো-GC ড্রপ',
    subtitle: 'Control Stack vs Heap placement explicitly with Box<T>, shared ownership Rc<T>/Weak<T>, Arc<T>, and deterministic Drop destructors.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust gives you full Heap control **with ZERO Garbage Collector pauses and ZERO memory leaks**! By default, scalars and fixed arrays live on the **Stack**. Wrapping a recursive node or giant struct in **`Box::new(val)`** moves its payload onto the **Heap** with a single-word Stack pointer and deterministic `Drop` cleanup at `}`. Need shared immutable read owners? Use **`Rc<T>`** (single-thread) or **`Arc<T>`** (multi-thread), plus **`Weak<T>`** to prevent cycles!',
      asciiFlowchart: `  RUST STACK                      HEAP (Deterministic Drop, Zero GC)
  +------------------------+      +----------------------------------+
  | let b: Box<i64> -------+----> | 42  (freed at '}' via Drop!)     |
  | let v: Vec<i64> -------+----> | [ 3 | 4 | 8 | 10 ]               |
  | (ptr, cap, len: 24B)   |      +----------------------------------+`,
      pseudocode: [
        '1. PUT recursive types (`enum List { Cons(i64, Box<List>), Nil }`) on Heap using `Box<T>`',
        '2. SHARE read-only Heap nodes inside a single thread with `Rc::clone(&node)` (cheap pointer inc)',
        '3. PREVENT `Rc` cycles with `std::rc::Weak`',
        '4. COMPUTE prefix sums cleanly inside contiguous Heap `Vec<i64>` via iterators',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রিসিট ছাড়া ফেরত নয়: `Box<T>`, `Rc<T>` ও স্বয়ংক্রিয় `Drop`',
        explanation:
          'Rust-এ গার্বেজ কালেক্টর নেই, তবু `free()` লেখার দরকার হয় না! কারণ কম্পাইলার প্রতি ভ্যারিয়েবলের জীবদ্দশা (`}`) জানে—স্কোপ শেষ হওয়ার সাথে সাথে `Drop` ট্রেট হিপ মেমোরি মুছে দেয়। যদি রিকার্সিভ ট্রি বানাতে চাও (যার সাইজ কম্পাইলার আগে জানে না), `Box<Node>` ব্যবহার করো—এটা হিপে জায়গা করে স্ট্যাকে মাত্র ৮ বাইটের ঠিকানা রাখে!',
        everydayExample:
          'রাশিয়ান পুতুলের (Nested Box) ভেতর আরেকটি পুতুল না রেখে `Box<T>` দিয়ে হিপে রাখা—তাহলে মূল ডেস্ক কখনোই ভরে যাবে না!',
        keyTakeaways: [
          '`Box<T>` হলো একক মালিকানার হিপ পয়েন্টার—শূন্য রানটাইম ওভারহেড!',
          'একই হিপ ডেটা একাধিক প্যারেন্ট শেয়ার করলে `Rc<T>` (সিঙ্গেল থ্রেড) বা `Arc<T>` (মাল্টি-থ্রেড) ব্যবহার করো।',
          '`Vec<i64>` এবং `String` উভয়ই ভেতরে হিপ মেমোরি সামলায় ও স্কোপ শেষে অটো-ফ্রি হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Contiguous Heap Vec<i64> Prefix Sum',
        banglaNote: 'হিপ-অ্যালোকেটেড `Vec<i64>` ও ইটারেটর দিয়ে শূন্য-কপি প্রিফিক্স সাম।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let n = nums[0] as usize;
    let mut run = 0i64;
    let pref: Vec<String> = nums[1..=n].iter().map(|&x| { run += x; run.to_string() }).collect();
    println!("{}", pref.join(" "));
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'rust-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Recursive Linked List on Heap With Box<List>',
        banglaNote: '`Box<List>` ছাড়া রিকার্সিভ টাইপ কম্পাইল হয় না (infinite size)—`Box` হিপে পয়েন্টার রেখে সমাধান করে।',
        code: `enum List { Cons(i64, Box<List>), Nil }

fn sum_list(node: &List) -> i64 {
    let mut cur = node;
    let mut total = 0;
    while let List::Cons(val, next) = cur {
        total += val;
        cur = next;
    }
    total
}

fn main() {
    let head = List::Cons(10, Box::new(List::Cons(20, Box::new(List::Cons(15, Box::new(List::Nil))))));
    println!("sum={}", sum_list(&head));
}`,
        stdin: '',
        expectedOutput: 'sum=45',
      },
      {
        id: 'rust-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Shared Ownership With Rc<T> & Ref-Count Tracking',
        banglaNote: '`Rc::clone(&a)` দিয়ে ডেটা কপি না করে শুধুমাত্র হিপ রেফারেন্স কাউন্ট বাড়ানো।',
        code: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("ArgonHeap"));
    let c1 = Rc::strong_count(&a);
    let b = Rc::clone(&a);
    let c2 = Rc::strong_count(&a);
    drop(b);
    let c3 = Rc::strong_count(&a);
    println!("counts={}->{}->{} val={}", c1, c2, c3, a);
}`,
        stdin: '',
        expectedOutput: 'counts=1->2->1 val=ArgonHeap',
      },
      {
        id: 'rust-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Zero-Allocation Prefix via scan() Iterator',
        banglaNote: '`.scan(0, ...)` ইটারেটর অ্যাডাপ্টর দিয়ে অতি পরিষ্কার ফাংশনাল প্রিফিক্স সাম।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().filter_map(|x| x.parse::<i64>().ok());
    let n = it.next().unwrap_or(0) as usize;
    let out: Vec<String> = it.take(n).scan(0i64, |acc, x| { *acc += x; Some(acc.to_string()) }).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 1',
        codeSnippet: 'enum List { Cons(i64, Box<List>), Nil }',
        whatItMeans: 'Recursive data structure storing pointer-sized `Box<List>` instead of inline self.',
        whyItIsThere: 'Gives the type a known fixed Stack size (`16 bytes`) for `rustc`.',
        ifDeletedError: 'Compile error `E0072`: recursive type `List` has infinite size.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: 'let b = Rc::clone(&a);',
        whatItMeans: 'Increments `strong_count` in O(1) without cloning underlying Heap string bytes.',
        whyItIsThere: 'Allows multiple graph/AST branches to share one immutable Heap allocation.',
        ifDeletedError: 'Would force expensive `a.clone()` deep Heap copies.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'drop(b);',
        whatItMeans: 'Explicitly runs `Drop` early before end of scope, decrementing refcount.',
        whyItIsThere: 'Releases memory or mutex locks deterministically when no longer needed.',
        ifDeletedError: 'Wait until `}` scope exit to release.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'Rc::new("ArgonHeap")', memoryOrStack: 'strong_count = 1', note: 'Allocated once on Heap' },
      { step: 2, state: 'let b = Rc::clone(&a)', memoryOrStack: 'strong_count = 2', note: 'Pointer copied, bytes NOT copied' },
      { step: 3, state: 'drop(b)', memoryOrStack: 'strong_count = 1', note: 'Heap string stays alive for a' },
      { step: 4, state: 'main() ends', memoryOrStack: 'strong_count -> 0 -> Freed', note: 'Zero-GC deterministic cleanup' },
    ],
    harryBugTraps: [
      {
        title: 'Allocating Giant Arrays Directly on Stack (`[0i64; 1_000_000]`)',
        brokenCode: `let arr = [0i64; 1_000_000]; // 8MB array on Stack -> Stack Overflow!`,
        fixedCode: `let arr = vec![0i64; 1_000_000]; // Lives cleanly on Heap!`,
        whyItBreaks: 'Fixed arrays `[T; N]` are Stack-allocated and quickly exhaust OS stack limits.',
      },
      {
        title: 'Creating `Rc<RefCell<Node>>` Reference Cycles',
        brokenCode: `a.borrow_mut().next = Some(Rc::clone(&b)); b.borrow_mut().next = Some(Rc::clone(&a));`,
        fixedCode: `Use std::rc::Weak<RefCell<Node>> for back/parent edges.`,
        whyItBreaks: 'Even safe Rust allows reference cycles to leak memory if `Weak` is omitted.',
      },
      {
        title: 'Unnecessary `.clone()` Inside Loops',
        brokenCode: `for i in 0..n { process(big_vec.clone()); } // O(n^2) Heap allocations!`,
        fixedCode: `for i in 0..n { process(&big_vec); } // Zero-copy borrow`,
        whyItBreaks: 'Cloning heap containers allocates fresh RAM on every iteration.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Vec Prefix Sum',
        prompt: 'Compute cumulative prefix sums over Heap-backed `Vec<i64>`.',
        banglaHint: '`Vec<i64>` ও `.scan()` বা লুপ দিয়ে প্রিফিক্স সাম বের করো।',
        starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let nums: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut run = 0;
    let pref: Vec<String> = nums[1..=nums[0] as usize].iter().map(|&x| { run += x; run.to_string() }).collect();
    println!("{}", pref.join(" "));
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'rust-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Heap Box<T> Wrapper Sum',
        prompt: 'Place two `i64` numbers inside `Box::new(...)` and print their sum.',
        banglaHint: '`Box::new(a)` ও `*b` ডিরেফারেন্স ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().map(|x| x.parse::<i64>().unwrap());
    let a = Box::new(it.next().unwrap());
    let b = Box::new(it.next().unwrap());
    println!("{}", *a + *b);
}`,
        sampleStdin: '15 27',
        expectedOutput: '42',
      },
      {
        id: 'rust-ch-11-q3',
        difficulty: 'Medium',
        title: '3. O(1) Subarray Sum Queries on Heap Vec',
        prompt: 'Build 1-indexed `Vec<i64>` prefix array and answer `q` `[L, R]` queries.',
        banglaHint: '`pref[r] - pref[l - 1]` সূত্র ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (n, q) = (d[0] as usize, d[1] as usize);
    let mut p = vec![0i64; n + 1];
    for i in 1..=n { p[i] = p[i - 1] + d[1 + i]; }
    for i in 0..q {
        let (l, r) = (d[2 + n + 2 * i] as usize, d[3 + n + 2 * i] as usize);
        println!("{}", p[r] - p[l - 1]);
    }
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'rust-ch-11-q4',
        difficulty: 'Medium',
        title: '4. Rc Strong Count Tracker',
        prompt: 'Create an `Rc<i32>`, clone twice, drop one, and print `final_count=<c>`.',
        banglaHint: '`Rc::strong_count` ব্যবহার করো।',
        starterCode: `use std::rc::Rc;
fn main() {
    let r = Rc::new(7);
    let a = Rc::clone(&r);
    let b = Rc::clone(&r);
    drop(a);
    println!("final_count={} val={}", Rc::strong_count(&r), *b);
}`,
        sampleStdin: '',
        expectedOutput: 'final_count=2 val=7',
      },
      {
        id: 'rust-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Box<Node> Dynamic List Sum',
        prompt: 'Construct a `Box`-linked list from `n` inputs and compute its iterative sum.',
        banglaHint: 'ইটারেটিভ `while let Some(node)` লুপে যোগফল বের করো যাতে স্ট্যাক ওভারফ্লো না হয়।',
        starterCode: `use std::io::{self, Read};
struct Node { v: i64, next: Option<Box<Node>> }
fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let d: Vec<i64> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let mut head: Option<Box<Node>> = None;
    for &x in &d[1..=d[0] as usize] {
        head = Some(Box::new(Node { v: x, next: head }));
    }
    let mut sum = 0;
    let mut cur = head.as_deref();
    while let Some(node) = cur {
        sum += node.v;
        cur = node.next.as_deref();
    }
    println!("{}", sum);
}`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: Zero-GC Heap Prefix & Scan Engine',
      description: 'Processes cumulative Heap prefix arrays via `Vec<i64>` and `.scan()` with deterministic `Drop`.',
      banglaGoal: 'গার্বেজ কালেক্টর ছাড়াই `Vec` এবং `.scan()` দিয়ে হিপ প্রিফিক্স সাম ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–11',
      starterCode: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut it = s.split_whitespace().filter_map(|x| x.parse::<i64>().ok());
    let n = it.next().unwrap_or(0) as usize;
    let out: Vec<String> = it.take(n).scan(0i64, |acc, x| { *acc += x; Some(acc.to_string()) }).collect();
    println!("{}", out.join(" "));
}`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 11 (TS 5.x): Stack vs Heap, TypedArrays, WeakMap & Explicit Resource Patterns',
    banglaTitle: 'TypeScript অধ্যায় ১১ (TS 5.x): স্ট্যাক বনাম হিপ, TypedArray ও WeakMap মেমোরি সেফটি',
    subtitle: 'Understand TypeScript structural objects on V8 Heap, TypedArray prefix buffers, WeakMap caches, and scope-bounded resource cleanup.',
    zeroIntuition: {
      plainEnglishStory:
        'TypeScript shares V8’s Stack/Heap runtime model while layering **compile-time ownership and shape discipline** on top: `readonly` prevents unexpected shared-Heap mutations, `WeakMap<object, Meta>` enforces weak GC-safe caching at the type level, and `Float64Array` gives contiguous C-like numerical Heap storage with full TS safety.',
      asciiFlowchart: `  TS 5.x COMPILE-TIME CONTRACTS -> V8 HEAP RUNTIME
  readonly number[]      -> Prevents accidental alias mutation
  WeakMap<object, Meta>  -> Type-safe weak cache (zero GC leaks)
  Float64Array(n)        -> Fast contiguous Heap numbers`,
      pseudocode: [
        '1. TYPE contiguous buffers as `Float64Array` / `readonly number[]`',
        '2. PREVENT accidental shared-Heap corruption via `readonly` properties',
        '3. TRACK object caches inside `WeakMap<T, Meta>` so GC frees unused entries',
        '4. COMPUTE cumulative prefix sums cleanly in O(n)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টাইপ-সেফ `WeakMap` ক্যাশ ও `readonly` হিপ সুরক্ষা',
        explanation:
          'TypeScript-এ একই হিপ অবজেক্ট একাধিক ফাংশনে গেলে ভুল করে কেউ ভেতরের ডেটা বদলে ফেলতে পারে! `readonly number[]` বা `Readonly<T>` ব্যবহার করলে কম্পাইলারই পরিবর্তন আটকে দেবে। আর বড় অবজেক্টের ক্যাশ রাখতে `WeakMap<object, Cache>` ব্যবহার করলে মূল অবজেক্ট হারিয়ে যাওয়ার সাথে সাথেই গার্বেজ কালেক্টর মেমোরি খালি করে দেবে!',
        everydayExample:
          'সিনেমা হলের সিট-ম্যাপ দেখতে দেওয়া (`readonly`) বনাম মার্কার পেন দিয়ে ম্যাপ বদলে ফেলার সুযোগ রাখা!',
        keyTakeaways: [
          '`WeakMap<object, T>` টাইপ-সেফ এবং মেমোরি লিকমুক্ত ক্যাশ দেয়।',
          '`Float64Array` বা `Int32Array` কম হিপ মেমোরিতে দ্রুত সংখ্যার হিসাব করে।',
          '`readonly` অ্যারে বা প্যারামিটার শেয়ার্ড হিপ বাগ প্রতিরোধ করে।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Typed Prefix Sum Array',
        banglaNote: 'হিপ অ্যারের ওপর টাইপড `number[]` দিয়ে O(n) প্রিফিক্স সাম।',
        code: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let run = 0;
const pref: number[] = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'ts-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Type-Safe WeakMap Object Cache',
        banglaNote: '`WeakMap<object, string>` ব্যবহার করে অবজেক্ট মেটাডেটা নিরাপদে রাখা।',
        code: `interface NodeObj { id: number; }
const tags = new WeakMap<NodeObj, string>();
const node: NodeObj = { id: 101 };
tags.set(node, 'cached');
console.log(tags.has(node), tags.get(node) ?? 'none');`,
        stdin: '',
        expectedOutput: 'true cached',
      },
      {
        id: 'ts-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Contiguous Float64Array Prefix Engine',
        banglaNote: 'ডাইনামিক হিপ অ্যারের বদলে `Float64Array` বাফার ব্যবহার।',
        code: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0];
const pref = new Float64Array(n);
let run = 0;
for (let i = 0; i < n; i++) {
  run += nums[1 + i];
  pref[i] = run;
}
console.log(Array.from(pref).join(' '));`,
        stdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'ts-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Readonly Range Query Engine',
        banglaNote: '`readonly` প্রিফিক্স বাফারে O(1) রেঞ্জ সাম।',
        code: `import * as fs from 'fs';

function buildPrefix(arr: readonly number[]): readonly number[] {
  const p: number[] = [0];
  for (const x of arr) p.push(p[p.length - 1] + x);
  return p;
}

const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, q] = d;
const p = buildPrefix(d.slice(2, 2 + n));
for (let i = 0, idx = 2 + n; i < q; i++, idx += 2) {
  console.log(p[d[idx + 1]] - p[d[idx] - 1]);
}`,
        stdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 2',
        codeSnippet: 'const tags = new WeakMap<NodeObj, string>();',
        whatItMeans: 'Strictly enforces Heap object keys and string values.',
        whyItIsThere: 'Prevents GC leaks while giving full autocomplete/type checking.',
        ifDeletedError: 'WeakMap type mismatch or strong Map leak.',
      },
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const pref = new Float64Array(n);',
        whatItMeans: 'Allocates packed 64-bit numeric Heap memory.',
        whyItIsThere: 'Faster numerical loops with zero mixed-type deoptimization.',
        ifDeletedError: 'Standard array falls back to dynamic boxing.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'function buildPrefix(arr: readonly number[]): readonly number[]',
        whatItMeans: 'Marks input & output slices immutable at compile time.',
        whyItIsThere: 'Prevents callers from corrupting shared prefix cache.',
        ifDeletedError: 'Accidental `.push()` or index overwrite breaks downstream queries.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'd = [4,3,1,4,2]', memoryOrStack: 'n=4 on stack', note: 'Input array' },
      { step: 2, state: 'buildPrefix([3,1,4,2])', memoryOrStack: 'p=[0,3,4,8,10]', note: 'Heap array returned as readonly' },
      { step: 3, state: 'Emit result', memoryOrStack: '3 4 8 10', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Mutating Shared Heap Array Passed Without `readonly`',
        brokenCode: `function first(arr: number[]) { return arr.sort((a,b)=>a-b)[0]; } // mutates caller!`,
        fixedCode: `function first(arr: readonly number[]) { return arr.reduce((m, x) => Math.min(m, x)); }`,
        whyItBreaks: '`.sort()` mutates the Heap array in-place for every holder of that reference.',
      },
      {
        title: 'Using `Map<object, T>` Instead of `WeakMap<object, T>`',
        brokenCode: `const seen = new Map<object, boolean>(); // leaks objects forever`,
        fixedCode: `const seen = new WeakMap<object, boolean>();`,
        whyItBreaks: 'Strong `Map` blocks Garbage Collection even after user leaves the route.',
      },
      {
        title: 'Forgotten Interval/Observer Handles Retaining Closures',
        brokenCode: `setInterval(() => cache.push(new Array(10000)), 100);`,
        fixedCode: `Always clear timers/subscriptions on dispose.`,
        whyItBreaks: 'Timer callbacks keep their closure scopes live indefinitely on the V8 Heap.',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Typed Heap Prefix Sum',
        prompt: 'Compute prefix sums of `n` integers using typed `number[]`.',
        banglaHint: '`nums.slice(1, 1 + nums[0]).map((x) => (run += x))` ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
let run = 0;
const pref: number[] = nums.slice(1, 1 + nums[0]).map((x) => (run += x));
console.log(pref.join(' '));`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'ts-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Contiguous Int32Array Sum',
        prompt: 'Load `n` integers into `Int32Array` and print total sum.',
        banglaHint: '`Int32Array.from` দিয়ে হিপ বাফার তৈরি করো।',
        starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const buf = Int32Array.from(nums.slice(1, 1 + nums[0]));
let sum = 0; for (const x of buf) sum += x;
console.log(sum);`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '10',
      },
      {
        id: 'ts-ch-11-q3',
        difficulty: 'Medium',
        title: '3. O(1) Readonly Prefix Range Queries',
        prompt: 'Answer `q` `[L, R]` range queries in O(1) over a `readonly number[]` prefix array.',
        banglaHint: '`p[r] - p[l - 1]` সূত্র ব্যবহার করো।',
        starterCode: `import * as fs from 'fs';
const d: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const [n, q] = d;
const p: number[] = [0];
for (let i = 0; i < n; i++) p.push(p[p.length - 1] + d[2 + i]);
for (let i = 0, idx = 2 + n; i < q; i++, idx += 2) {
  console.log(p[d[idx + 1]] - p[d[idx] - 1]);
}`,
        sampleStdin: '5 2\n2 4 6 8 10\n2 4\n1 5',
        expectedOutput: '18\n30',
      },
      {
        id: 'ts-ch-11-q4',
        difficulty: 'Medium',
        title: '4. WeakMap Object Score Sum',
        prompt: 'Store computed weights inside `WeakMap<object, number>` and print sum.',
        banglaHint: '`WeakMap` থেকে মান পড়ে যোগ করো।',
        starterCode: `import * as fs from 'fs';
interface Box { val: number; }
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const wm = new WeakMap<Box, number>();
const items: Box[] = nums.slice(1, 1 + nums[0]).map((val) => ({ val }));
for (const it of items) wm.set(it, it.val * 2);
console.log(items.reduce((s, it) => s + (wm.get(it) ?? 0), 0));`,
        sampleStdin: '4\n3 1 4 2',
        expectedOutput: '20',
      },
      {
        id: 'ts-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Equilibrium Split Index Check',
        prompt: 'Check if any split divides array into equal-sum halves (`YES`/`NO`).',
        banglaHint: 'মোট যোগফল এবং প্রিফিক্স যোগফলের দ্বিগুণ মিলিয়ে দেখো।',
        starterCode: `import * as fs from 'fs';
const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const arr = nums.slice(1, 1 + nums[0]);
const total = arr.reduce((a, b) => a + b, 0);
let pref = 0; let ok = false;
for (let i = 0; i < arr.length - 1; i++) {
  pref += arr[i];
  if (pref * 2 === total) ok = true;
}
console.log(ok ? 'YES' : 'NO');`,
        sampleStdin: '4\n1 4 2 3',
        expectedOutput: 'YES',
      },
    ],
    miniBuild: {
      title: 'TypeScript 5.x Mini Build: TypedArray & Readonly Prefix Engine',
      description: 'Processes prefix sums inside `Float64Array` with compile-time `readonly` safety.',
      banglaGoal: 'TypeScript-এ `Float64Array` ও `readonly` সুরক্ষা দিয়ে প্রিফিক্স সাম ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–11',
      starterCode: `import * as fs from 'fs';

const nums: number[] = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
const n = nums[0];
const pref = new Float64Array(n);
let run = 0;
for (let i = 0; i < n; i++) {
  run += nums[1 + i];
  pref[i] = run;
}
console.log(Array.from(pref).join(' '));`,
      sampleStdin: '4\n3 1 4 2',
      expectedOutput: '3 4 8 10',
    },
  },

  html: {
    title: 'HTML Chapter 11 (HTML5): Browser DOM Heap, Detached Nodes & GPU Layer Memory',
    banglaTitle: 'HTML অধ্যায় ১১ (HTML5): ব্রাউজার DOM হিপ, ডিটাচড নোড লিক ও GPU লেয়ার',
    subtitle: 'Understand how browsers store DOM nodes on the C++/JS Heap, prevent Detached DOM memory leaks, and animate GPU-only properties.',
    zeroIntuition: {
      plainEnglishStory:
        'Every `<div>` or `<li>` in an HTML page allocates a heavy C++ DOM Node in the browser’s Heap (~1–2 KB each) linked to a JS wrapper. Removing an element with `.remove()` frees it **ONLY if no JS variable or event listener still points to it**—otherwise it becomes a **Detached DOM Memory Leak**! Animating `transform`/`opacity` promotes lightweight GPU compositor layers instead of thrashing CPU layout.',
      asciiFlowchart: `  BROWSER MEMORY ARCHITECTURE (DOM HEAP + JS HEAP)
  JS Heap Var ` + '`cachedBtn`' + ` ---+---> [ Detached <button> ] (LEAK if kept after .remove()!)
  Active DOM Tree              +---> [ <ul id="heap"> -> 4 live <li> nodes ]
  GPU Compositor Layer         +---> transform: translateX() (Zero Reflow!)`,
      pseudocode: [
        '1. KEEP DOM tree depth flat & minimal (< 1,500 nodes on initial paint)',
        '2. CLEAR JS references (`cachedEl = null`) after calling `el.remove()` to prevent Detached DOM leaks',
        '3. USE `DocumentFragment` to batch DOM insertions into 1 Heap reflow',
        '4. ANIMATE `transform` and `opacity` (GPU) instead of `top`/`left`/`width` (CPU Reflow)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রাস্তা থেকে সরানো সাইনবোর্ড ও `Detached DOM` লিক',
        explanation:
          'একটি বিলবোর্ড রাস্তা থেকে সরিয়ে ফেললেও (`.remove()`) যদি তার সঙ্গে তোমার লোহার রশি বাঁধা থাকে (`let btn = ...`), তাহলে ময়লার গাড়ি ওটাকে নিয়ে যেতে পারবে না! ব্রাউজার হিপেও ঠিক তেমনি: পেজ থেকে কোনো HTML এলিমেন্ট রিমুভ করার পরও JS ভ্যারিয়েবলে রেফারেন্স থেকে গেলে সেটা **Detached DOM Leak** হয়ে মেমোরি খেয়ে ফেলে!',
        everydayExample:
          'হাজার হাজার কার্ড লিস্টে যোগ করার সময় বারবার পেজ না কাঁপিয়ে `DocumentFragment`-এ সাজিয়ে একসাথে ডমে বসানো।',
        keyTakeaways: [
          'এলিমেন্ট রিমুভ করলে অবশ্যই তার অস্থায়ী JS রেফারেন্স `null` করো বা `WeakRef` ব্যবহার করো।',
          'অ্যানিমেশনে `width`/`left` বদলালে পুরো পেজ রিফ্লো হয়; সবসময় `transform: translate()` ব্যবহার করবে।',
          '`replaceChildren()` এক ধাপে পুরোনো নোড খালি করে নতুন নোড বসায়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-11-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Heap vs Stack Prefix Sum Card',
        banglaNote: 'হিপ প্রিফিক্স সাম ফলাফল পরিষ্কার মনস্পেস কার্ডে প্রদর্শন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Heap vs Stack Prefix Sum</h3>
  <p style="font-family:monospace;color:#38bdf8">Input: [3, 1, 4, 2] -> Heap Prefix: [3, 4, 8, 10]</p>
</body></html>`,
        stdin: '',
        expectedOutput: 'Heap vs Stack Prefix Sum',
      },
      {
        id: 'html-11-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Leak-Free Node Cleanup With replaceChildren()',
        banglaNote: 'পুরোনো ডোম নোড ক্লিনভাবে সরিয়ে নতুন হিপ ব্লক রেন্ডার করা যাতে Detached Leak না হয়।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <button id="clear">Clear Heap Nodes</button>
  <ul id="pool"><li>Block A</li><li>Block B</li></ul>
  <p id="stat" style="color:#34d399;font-family:monospace;">Active DOM nodes: 2</p>
  <script>
    document.getElementById('clear').addEventListener('click', () => {
      const pool = document.getElementById('pool');
      pool.replaceChildren();
      document.getElementById('stat').textContent = 'Active DOM nodes: ' + pool.children.length;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Active DOM nodes: 2',
      },
      {
        id: 'html-11-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Single-Reflow DocumentFragment Prefix Grid',
        banglaNote: '`DocumentFragment` ব্যবহার করে একক পেইন্টে প্রিফিক্স সাম কার্ড রেন্ডার করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <h3>Contiguous Heap Blocks</h3>
  <div id="cells" style="display:flex;gap:8px;"></div>
  <script>
    const vals = [3, 1, 4, 2];
    const frag = document.createDocumentFragment();
    let run = 0;
    for (const v of vals) {
      run += v;
      const box = document.createElement('div');
      box.style.cssText = 'padding:8px 12px;border:1px solid #38bdf8;border-radius:8px;font-family:monospace;';
      box.textContent = run;
      frag.appendChild(box);
    }
    document.getElementById('cells').appendChild(frag);
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Contiguous Heap Blocks',
      },
      {
        id: 'html-11-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: GPU-Accelerated Transform (Zero Layout Thrash)',
        banglaNote: '`will-change: transform` ও `translateX` ব্যবহার করে CPU রিফ্লো ছাড়াই স্মুথ অ্যানিমেশন।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <div id="chip" style="display:inline-block;padding:8px 14px;background:#1e293b;border-radius:8px;transition:transform 0.2s;will-change:transform;">GPU Chip</div>
  <button onclick="document.getElementById('chip').style.transform='translateX(24px)'">Slide (GPU Only)</button>
</body></html>`,
        stdin: '',
        expectedOutput: 'GPU Chip',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'const frag = document.createDocumentFragment();',
        whatItMeans: 'Creates an off-screen lightweight container holding child nodes before attach.',
        whyItIsThere: 'Triggers only 1 browser Layout/Reflow instead of N incremental reflows.',
        ifDeletedError: 'Inserting inside loop repeatedly forces browser style recalculation.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'pool.replaceChildren();',
        whatItMeans: 'Modern DOM API removing all children cleanly without parsing HTML strings.',
        whyItIsThere: 'Safer and faster than `pool.innerHTML = ""`.',
        ifDeletedError: 'Old children accumulate endlessly causing DOM bloat.',
      },
      {
        lineNumber: 'Line 3',
        codeSnippet: 'transition:transform 0.2s;will-change:transform;',
        whatItMeans: 'Hints browser to promote element onto GPU compositor layer.',
        whyItIsThere: 'Runs 60fps animations on GPU without touching main-thread layout.',
        ifDeletedError: 'Animating `margin-left` forces CPU layout every frame.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'vals=[3,1,4,2]', memoryOrStack: '4 iterations on JS heap', note: 'run=3,4,8,10' },
      { step: 2, state: 'Build inside DocumentFragment', memoryOrStack: '0 live DOM reflows yet', note: 'Off-DOM batching' },
      { step: 3, state: 'appendChild(frag)', memoryOrStack: '1 single browser paint', note: 'Displays [3][4][8][10]' },
    ],
    harryBugTraps: [
      {
        title: 'Keeping JS References to Removed DOM Nodes (Detached Leak)',
        brokenCode: `const dead = []; function drop(el) { dead.push(el); el.remove(); }`,
        fixedCode: `Remove the element without storing it in global arrays, or use WeakRef.`,
        whyItBreaks: 'Each detached DOM subtree keeps C++ DOM nodes and parent pointers pinned in RAM.',
      },
      {
        title: 'Interleaving DOM Reads & Writes in Loops (Layout Thrashing)',
        brokenCode: `for (el of els) { el.style.width = el.offsetWidth + 10 + 'px'; }`,
        fixedCode: `Batch all offsetWidth reads first, then batch all style writes!`,
        whyItBreaks: 'Reading geometry after a style change forces synchronous full-page layout recalculation.',
      },
      {
        title: 'Using `innerHTML = ""` When `replaceChildren()` Exists',
        brokenCode: `list.innerHTML = '';`,
        fixedCode: `list.replaceChildren();`,
        whyItBreaks: '`replaceChildren()` avoids invoking the HTML parser.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-11-q1',
        difficulty: 'Easy',
        title: '1. Heap vs Stack Card',
        prompt: 'Display the Heap Prefix Sum summary banner.',
        banglaHint: 'সিমান্টিক হেডিং ও প্রিফিক্স ফলাফল রেন্ডার করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Heap vs Stack Prefix Sum</h3>
  <p style="font-family:monospace;color:#38bdf8">Input: [3, 1, 4, 2] -> Heap Prefix: [3, 4, 8, 10]</p>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Heap vs Stack Prefix Sum',
      },
      {
        id: 'html-ch-11-q2',
        difficulty: 'Easy',
        title: '2. Clean Node Reset Button',
        prompt: 'Provide a button that clears `#pool` cleanly with `replaceChildren()`.',
        banglaHint: '`replaceChildren()` ব্যবহার করে চাইল্ড নোড খালি করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <ul id="pool"><li>Item 1</li></ul>
  <button onclick="document.getElementById('pool').replaceChildren()">Clear</button>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Item 1',
      },
      {
        id: 'html-ch-11-q3',
        difficulty: 'Medium',
        title: '3. DocumentFragment Batch Prefix Renderer',
        prompt: 'Render `[3, 4, 8, 10]` chips inside a single `DocumentFragment`.',
        banglaHint: '`createDocumentFragment()` দিয়ে সব চিপ একসাথে যুক্ত করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <div id="out"></div>
  <script>
    const f = document.createDocumentFragment();
    for (const v of [3, 4, 8, 10]) { const s = document.createElement('span'); s.textContent = v + ' '; f.appendChild(s); }
    document.getElementById('out').appendChild(f);
  </script>
</body></html>`,
        sampleStdin: '',
        expectedOutput: '3 4 8 10',
      },
      {
        id: 'html-ch-11-q4',
        difficulty: 'Medium',
        title: '4. Zero-Leak WeakMap Element Tagging',
        prompt: 'Attach click count to a DOM node using `WeakMap` instead of mutating custom properties.',
        banglaHint: '`WeakMap` ব্যবহার করে এলিমেন্টে ডেটা যুক্ত করো।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <button id="b">Tap</button>
  <p id="p">Tagged safely via WeakMap</p>
  <script>
    const m = new WeakMap();
    const b = document.getElementById('b');
    m.set(b, { clicks: 0 });
  </script>
</body></html>`,
        sampleStdin: '',
        expectedOutput: 'Tagged safely via WeakMap',
      },
      {
        id: 'html-ch-11-q5',
        difficulty: 'Hard',
        title: '5. Live Heap Prefix Visualizer',
        prompt: 'Interactive calculator displaying running Heap prefix array cleanly.',
        banglaHint: 'ডায়নামিক ইনপুট নিয়ে তাৎক্ষণিক প্রিফিক্স সাম ডমে দেখাও।',
        starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:20px;">
  <p id="res" style="color:#34d399;font-family:monospace;">[3, 4, 8, 10]</p>
</body></html>`,
        sampleStdin: '',
        expectedOutput: '[3, 4, 8, 10]',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Browser Heap Prefix Visualizer (Single-Reflow Fragment)',
      description: 'Computes `[3, 4, 8, 10]` prefix sums and updates DOM cells in a single `DocumentFragment` pass.',
      banglaGoal: 'DocumentFragment দিয়ে একক রিফ্লোতে হিপ প্রিফিক্স ভিজ্যুয়ালাইজার তৈরি।',
      combinesChapters: 'Ch 1–11',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3 style="color:#38bdf8;margin-top:0;">Heap vs Stack Prefix Visualizer</h3>
  <div id="grid" style="display:flex;gap:10px;flex-wrap:wrap;"></div>
  <script>
    const input = [3, 1, 4, 2];
    const frag = document.createDocumentFragment();
    let run = 0;
    input.forEach((v, idx) => {
      run += v;
      const card = document.createElement('div');
      card.style.cssText = 'padding:10px 14px;border:1px solid #334155;border-radius:8px;background:#0f172a;font-family:monospace;';
      card.textContent = 'pref[' + idx + '] = ' + run;
      frag.appendChild(card);
    });
    document.getElementById('grid').appendChild(frag);
  </script>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Heap vs Stack Prefix Visualizer',
    },
  },
};
