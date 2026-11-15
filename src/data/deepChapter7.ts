import type { DeepChapterContent } from './deepChapter1';
import type { LanguageId } from '../types/academy';

export const DEEP_CHAPTER_7: Record<LanguageId, DeepChapterContent> = {
  c: {
    title: 'C Chapter 7 (C23): Raw Pointers, Addresses & Pointer Arithmetic',
    banglaTitle: 'C অধ্যায় ৭ (C23): র-পয়েন্টার, মেমোরি ঠিকানা ও পয়েন্টার অ্যারিথমেটিক',
    subtitle: 'Master & (address-of), * (dereference), pointer arithmetic (p + i), C23 nullptr, and avoiding dangling pointers.',
    zeroIntuition: {
      plainEnglishStory:
        'Every variable lives at a numbered byte address in RAM (like `0x7ff0`). A **Pointer** (`int *p = &a;`) is simply a small 8-byte variable storing that RAM address! Writing `*p = 99` walks straight to address `0x7ff0` and modifies the original `a` in-place—zero copying. Remember: `p + 1` on an `int *` jumps forward by **4 bytes** (`sizeof(int)`), never 1 byte!',
      asciiFlowchart: `  STACK RAM (64-bit Addresses)
  +-------------------+              +-------------------+
  | int a = 10;       | <--- *p ---- | int *p = &a;      |
  | addr: 0x7ff0      |              | val : 0x7ff0      |
  +-------------------+              +-------------------+
  swap_ptrs(&a, &b) copies ONLY 8-byte addresses, modifying a & b in-place!`,
      pseudocode: [
        '1. TAKE variable address using `&x` (Address-of operator)',
        '2. STORE address in pointer `int *p = &x`',
        '3. CHECK `if (p != nullptr)` (C23 keyword) BEFORE dereferencing `*p`',
        '4. MODIFY caller variables directly inside helper functions via `*x = *y`',
        '5. NEVER return `&local_var` from a function — its stack frame dies on return!',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বাড়ির কাগজের ঠিকানা (`&`) ও সরাসরি তালা খোলা (`*`)',
        explanation:
          'ধরো তোমার বন্ধু করিমের হাতে একটি টিফিন বক্স (`int a = 10`) আছে। তুমি বক্সটি ফটোকপি না করে শুধু করিমের বাসার ঠিকানা (`&a`) একটি কাগজে (`int *p`) লিখে নিলে! এখন `*p` মানে হলো "ঠিকানার ভেতরে গিয়ে আসল বক্সটি বদলে দাও"। C-তে পয়েন্টার আমাদের সেই সুপারপাওয়ার দেয়—যেন ফাংশনের ভেতর থেকে আসল ভ্যারিয়েবল বদলানো যায়!',
        everydayExample:
          'গুগল ড্রাইভে ১০০ পাতার বই না পাঠিয়ে শুধু ওই ফাইলের লিংক (&a) পাঠানো—যাকে লিংক দিবে সে সরাসরি আসল ফাইল এডিট করতে পারবে!',
        keyTakeaways: [
          '`&x` মানে "x-এর র‍্যাম ঠিকানা কত?", আর `*p` মানে "p ঠিকানার ভেতরে থাকা মান পড়ো বা বদলাও"।',
          'C23 স্ট্যান্ডার্ডে `NULL`-এর বদলে টাইপ-সেফ `nullptr` কীওয়ার্ড ব্যবহার করা যায়।',
          'ফাংশনের লোকাল ভ্যারিয়েবলের ঠিকানা রিটার্ন করলে তা **Dangling Pointer** হয়ে প্রোগ্রাম ক্র্যাশ করায়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'c-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Pass-by-Pointer In-Place Swap (*x, *y)',
        banglaNote: '`&a` ও `&b` ঠিকানা পাঠিয়ে ফাংশনের ভেতর থেকে মূল ভ্যারিয়েবল সোয়াপ করা।',
        code: `#include <stdio.h>

void swap_ptrs(int *x, int *y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}

int main(void) {
    int a = 0, b = 0;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    swap_ptrs(&a, &b);
    printf("%d %d\\n", a, b);
    return 0;
}`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'c-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: C23 nullptr Guard Before Dereference',
        banglaNote: 'পয়েন্টার `nullptr` হলে সরাসরি `*p` পড়তে গেলে Segmentation Fault হয়—আগেই গার্ড করা।',
        code: `#include <stdio.h>

int safe_read(const int *p) {
    if (p == nullptr) return -1;
    return *p;
}

int main(void) {
    int x = 0;
    if (scanf("%d", &x) != 1) {
        printf("%d\\n", safe_read(nullptr));
        return 0;
    }
    const int *ptr = (x < 0) ? nullptr : &x;
    printf("%d\\n", safe_read(ptr));
    return 0;
}`,
        stdin: '-5',
        expectedOutput: '-1',
      },
      {
        id: 'c-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Pointer Arithmetic Walk *(p++) Without Index Math',
        banglaNote: 'অ্যারের প্রথম ঠিকানা ধরে `p++` করে সরাসরি মেমোরি স্ক্যান (O(1) extra memory)।',
        code: `#include <stdio.h>
#include <stdlib.h>

long long sum_range(const int *begin, const int *end) {
    long long total = 0;
    for (const int *p = begin; p < end; p++) {
        total += *p;
    }
    return total;
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", a + i);
    printf("%lld\\n", sum_range(a, a + n));
    free(a);
    return 0;
}`,
        stdin: '4\n10 20 30 40',
        expectedOutput: '100',
      },
      {
        id: 'c-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Returning Multiple Stats via Output Pointers',
        banglaNote: 'একটি ফাংশন থেকে একই সাথে `min` ও `max` দুটি মান আউটপুট পয়েন্টার দিয়ে ফেরত পাওয়া।',
        code: `#include <stdio.h>
#include <stdlib.h>

void minmax(const int *a, int n, int *out_min, int *out_max) {
    *out_min = *out_max = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < *out_min) *out_min = a[i];
        if (a[i] > *out_max) *out_max = a[i];
    }
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int *a = malloc((size_t)n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int mn = 0, mx = 0;
    minmax(a, n, &mn, &mx);
    printf("%d %d\\n", mn, mx);
    free(a);
    return 0;
}`,
        stdin: '5\n7 -2 19 4 8',
        expectedOutput: '-2 19',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'void swap_ptrs(int *x, int *y) {',
        whatItMeans: 'Declares `x` and `y` as pointers to `int` memory addresses.',
        whyItIsThere: 'Allows `swap_ptrs` to mutate the caller’s variables directly instead of local copies.',
        ifDeletedError: 'Passing `int x, int y` by value swaps only copies—caller sees unchanged values!',
      },
      {
        lineNumber: 'Line 4-6',
        codeSnippet: 'int tmp = *x; *x = *y; *y = tmp;',
        whatItMeans: 'Dereferences `x` and `y` to read and overwrite the integers at those addresses.',
        whyItIsThere: '`*` follows the RAM address arrow to reach the real data.',
        ifDeletedError: 'Assigning `x = y` only changes local addresses, leaving caller untouched.',
      },
      {
        lineNumber: 'Line 12',
        codeSnippet: 'swap_ptrs(&a, &b);',
        whatItMeans: 'Passes the RAM addresses of `a` and `b` using `&`.',
        whyItIsThere: 'Types must match `int *` parameters.',
        ifDeletedError: 'Passing `a, b` without `&` fails compilation (int vs int *).',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main has a=10 (0x100), b=20 (0x104)', memoryOrStack: 'Stack: a=10, b=20', note: 'Calls swap_ptrs(&a, &b)' },
      { step: 2, state: 'swap_ptrs receives x=0x100, y=0x104', memoryOrStack: 'tmp = *x = 10', note: 'Reads 10 from 0x100' },
      { step: 3, state: '*x = *y; *y = tmp;', memoryOrStack: '0x100 -> 20, 0x104 -> 10', note: 'Caller RAM updated directly!' },
      { step: 4, state: 'printf("%d %d\\n", a, b)', memoryOrStack: 'stdout: 20 10', note: 'Outputs 20 10' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Returning Address of a Local Stack Variable',
        brokenCode: `int* bad(void) { int x = 42; return &x; } // x dies on return!`,
        fixedCode: `int* good(void) { int *p = malloc(sizeof(int)); *p = 42; return p; }`,
        whyItBreaks: 'Once `bad()` returns, its Stack Frame is popped; `*p` points to freed garbage!',
      },
      {
        title: 'Trap 2: Dereferencing Uninitialized Wild Pointer',
        brokenCode: `int *p; *p = 5; // p holds garbage address -> SIGSEGV!`,
        fixedCode: `int x = 0; int *p = &x; *p = 5;`,
        whyItBreaks: 'Uninitialized pointers hold random stack bits and crash immediately on `*p`.',
      },
      {
        title: 'Trap 3: Confusing `const int *p` vs `int * const p`',
        brokenCode: `const int *p = &x; *p = 10; // Error: pointed data is read-only!`,
        fixedCode: `int *p = &x; *p = 10; // Use const int * only for read-only params`,
        whyItBreaks: '`const int *p` locks the target value; `int * const p` locks the pointer address.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Increment Integer via Pointer',
        prompt: 'Read x and delta; add delta to x inside `void add_in_place(int *p, int d)` and print x.',
        banglaHint: '`*p += d;` লিখে `&x` পাস করো।',
        starterCode: `#include <stdio.h>\nvoid add_in_place(int *p, int d) { *p += d; }\nint main(void) {\n    int x = 0, d = 0; if (scanf("%d %d", &x, &d) != 2) return 0;\n    add_in_place(&x, d);\n    printf("%d\\n", x);\n    return 0;\n}`,
        sampleStdin: '15 25',
        expectedOutput: '40',
      },
      {
        id: 'c-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Order Two Values via Pointers',
        prompt: 'Read a and b; ensure `a <= b` by swapping through pointers if `a > b`, then print `a b`.',
        banglaHint: '`if (*a > *b)` হলে সোয়াপ করো।',
        starterCode: `#include <stdio.h>\nvoid sort2(int *a, int *b) { if (*a > *b) { int t = *a; *a = *b; *b = t; } }\nint main(void) {\n    int a = 0, b = 0; if (scanf("%d %d", &a, &b) != 2) return 0;\n    sort2(&a, &b);\n    printf("%d %d\\n", a, b);\n    return 0;\n}`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'c-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Custom String Length With Pointer Subtraction',
        prompt: 'Read a word and calculate its length using `const char *p` without `strlen()`.',
        banglaHint: '`while (*p != \'\\0\') p++;` করে `p - start` রিটার্ন করো।',
        starterCode: `#include <stdio.h>\nsize_t my_strlen(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') p++;\n    return (size_t)(p - s);\n}\nint main(void) {\n    char buf[256]; if (scanf("%255s", buf) != 1) return 0;\n    printf("%zu\\n", my_strlen(buf));\n    return 0;\n}`,
        sampleStdin: 'pointers',
        expectedOutput: '8',
      },
      {
        id: 'c-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Reverse Array Using Only Pointer Variables',
        prompt: 'Read n and n ints; reverse using `int *l = a, *r = a + n - 1`.',
        banglaHint: '`while (l < r)` লিখে `*l` আর `*r` সোয়াপ করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n; if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    int *a = malloc((size_t)n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf("%d", a + i);\n    for (int *l = a, *r = a + n - 1; l < r; l++, r--) { int t = *l; *l = *r; *r = t; }\n    for (int i = 0; i < n; i++) printf("%d%s", *(a + i), i + 1 == n ? "\\n" : " ");\n    free(a);\n    return 0;\n}`,
        sampleStdin: '4\n3 6 9 12',
        expectedOutput: '12 9 6 3',
      },
      {
        id: 'c-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Double-Pointer Update (`int **pp`) Head Rebind',
        prompt: 'Read x and y; pass `&ptr` to `rebind_to_larger(&ptr, &y)` so `ptr` points to the larger integer.',
        banglaHint: '`if (**pp < *cand) *pp = cand;` ব্যবহার করো।',
        starterCode: `#include <stdio.h>\nvoid rebind(int **pp, int *cand) {\n    if (**pp < *cand) *pp = cand;\n}\nint main(void) {\n    int x = 0, y = 0; if (scanf("%d %d", &x, &y) != 2) return 0;\n    int *best = &x;\n    rebind(&best, &y);\n    printf("%d\\n", *best);\n    return 0;\n}`,
        sampleStdin: '12 45',
        expectedOutput: '45',
      },
    ],
    miniBuild: {
      title: 'C23 Mini Build: In-Place Pointer Swap Engine',
      description: 'Swaps two variables via raw 64-bit addresses cleanly in O(1) time.',
      banglaGoal: 'C পয়েন্টার ও অ্যাড্রেস ব্যবহার করে কপি ছাড়াই ইন-প্লেস সোয়াপ সম্পন্ন করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `#include <stdio.h>

void swap_ptrs(int *x, int *y) {
    int tmp = *x;
    *x = *y;
    *y = tmp;
}

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) == 2) {
        swap_ptrs(&a, &b);
        printf("%d %d\\n", a, b);
    }
    return 0;
}`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  cpp: {
    title: 'C++ Chapter 7 (C++23): References, Smart Pointers & RAII Handles',
    banglaTitle: 'C++ অধ্যায় ৭ (C++23): রেফারেন্স, স্মার্ট পয়েন্টার ও RAII হ্যান্ডলিং',
    subtitle: 'Master non-null references (&), zero-copy const T&, and std::unique_ptr RAII ownership with zero leaks.',
    zeroIntuition: {
      plainEnglishStory:
        'A C++ **Reference** (`int &r = a;`) is a permanent alias for an existing variable—it can NEVER be null and never needs `*` to read! For dynamic Heap ownership, Modern C++23 replaces dangerous `new`/`delete` with `std::unique_ptr<T>` (RAII): when the owner leaves scope, the destructor frees Heap memory automatically!',
      asciiFlowchart: `  C++23 REFERENCE vs std::unique_ptr
  [ int a = 10 ] <--- alias int& r = a (cannot be null/rebound!)
  [ unique_ptr<int> p ] --owns--> [ Heap int(42) ]
        | (scope exits)
        v
  ~unique_ptr() auto-calls delete! (0 leaks!)`,
      pseudocode: [
        '1. PREFER `const T&` for passing read-only objects without copying',
        '2. USE `T&` when a function intentionally mutates the caller variable',
        '3. USE `std::make_unique<T>(...)` instead of raw `new` / `delete`',
        '4. TRANSFER ownership explicitly with `std::move(ptr)`',
        '5. CHECK `if (ptr)` before dereferencing nullable raw or smart pointers',
      ],
      banglaZeroToHero: {
        analogyTitle: 'ডাকনাম (`&` Reference) এবং স্বয়ংক্রিয় দারোয়ান (`unique_ptr` RAII)',
        explanation:
          'একজন মানুষের দুটি নাম থাকলে যেমন আসল নাম ধরে ডাকলেও সে সাড়া দেয় এবং ডাকনাম ধরে ডাকলেও সে-ই সাড়া দেয়, C++-এর রেফারেন্স (`int &x = a;`) ঠিক তাই—এটি কখনো খালি (null) হতে পারে না! আর হিপ মেমোরি নিয়ে কাজ করার সময় `new`/`delete` ভুল করে মিস হলে মেমোরি লিক হয়; তাই আধুনিক C++23-তে `std::unique_ptr` হলো এমন এক স্বয়ংক্রিয় দারোয়ান যে কাজ শেষ হলেই নিজে ঘর পরিষ্কার করে তালা দিয়ে দেয়!',
        everydayExample:
          'হোটেলের রুম কার্ড: চেক-আউট (`}` স্কোপ শেষ) হওয়ার সাথে সাথে রুম নিজে থেকেই রিসেট ও পরিষ্কার হয়ে যায়।',
        keyTakeaways: [
          'ফাংশনে `vector` বা `string` পাঠাতে সবসময় `const auto&` লিখলে কপি ছাড়াই কাজ হয়।',
          'মালিকানাধীন হিপ অবজেক্টে `new`/`delete` না লিখে `std::make_unique` ব্যবহার করো।',
          'রেফারেন্স কখনো `nullptr` হতে পারে না—তাই ডালিগিং বা নাল ক্র্যাশের ঝুঁকি অনেক কম।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'cpp-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Pass-by-Reference (&) Swap Function',
        banglaNote: '`int &x, int &y` রেফারেন্স ব্যবহার করে `*` বা `&` ঝামেলা ছাড়াই সরাসরি সোয়াপ।',
        code: `#include <iostream>
using namespace std;

void swapRef(int &x, int &y) {
    int tmp = x;
    x = y;
    y = tmp;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        swapRef(a, b);
        cout << a << " " << b << "\\n";
    }
    return 0;
}`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'cpp-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Zero-Copy const vector<int>& Read-Only Guard',
        banglaNote: '`const vector<long long>&` দিলে বিশাল অ্যারে কপিও হয় না, আবার দুর্ঘটনাবশত বদলানোও যায় না।',
        code: `#include <iostream>
#include <vector>
using namespace std;

long long safeSum(const vector<long long> &v) {
    long long s = 0;
    for (long long x : v) s += x;
    return s;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> v(n);
    for (auto &x : v) cin >> x;
    cout << safeSum(v) << "\\n";
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '50',
      },
      {
        id: 'cpp-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: std::unique_ptr & std::move Ownership Transfer',
        banglaNote: 'RAII `unique_ptr` দিয়ে হিপ মেমোরি হ্যান্ডলিং এবং `std::move` দিয়ে নিরাপদ মালিকানা হস্তান্তর।',
        code: `#include <iostream>
#include <memory>
#include <utility>
using namespace std;

int main() {
    int val = 0;
    if (!(cin >> val)) return 0;
    auto owner1 = make_unique<int>(val * 2);
    auto owner2 = std::move(owner1); // owner1 is now nullptr!
    cout << "moved_null=" << (owner1 == nullptr) << " val=" << *owner2 << "\\n";
    return 0;
}`,
        stdin: '21',
        expectedOutput: 'moved_null=1 val=42',
      },
      {
        id: 'cpp-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Structured Binding References auto &[k, v]',
        banglaNote: 'লুপের ভেতর কপি না করে সরাসরি রেফারেন্স `auto &[a, b]` দিয়ে ইন-প্লেস আপডেট।',
        code: `#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> pts(n);
    for (auto &[x, y] : pts) cin >> x >> y;
    for (auto &[x, y] : pts) swap(x, y);
    for (const auto &[x, y] : pts) cout << x << ":" << y << "\\n";
    return 0;
}`,
        stdin: '2\n1 9\n4 7',
        expectedOutput: '9:1\n7:4',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'void swapRef(int &x, int &y) {',
        whatItMeans: 'Binds `x` and `y` as direct references to caller variables.',
        whyItIsThere: 'Mutates original ints without pointers or dereference syntax.',
        ifDeletedError: 'Removing `&` creates copies; caller prints unchanged `10 20`!',
      },
      {
        lineNumber: 'Line 5-7',
        codeSnippet: 'int tmp = x; x = y; y = tmp;',
        whatItMeans: 'Swaps values through the reference aliases.',
        whyItIsThere: 'Updates the exact stack slots in `main()`.',
        ifDeletedError: 'Variables remain unswapped.',
      },
      {
        lineNumber: 'Line 13',
        codeSnippet: 'swapRef(a, b);',
        whatItMeans: 'Passes lvalues `a` and `b` directly.',
        whyItIsThere: 'Binds non-const references `x -> a`, `y -> b`.',
        ifDeletedError: 'Output stays `10 20`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'main creates a=10, b=20', memoryOrStack: 'Stack: [a=10, b=20]', note: 'Calls swapRef(a, b)' },
      { step: 2, state: 'x aliases a; y aliases b', memoryOrStack: 'Zero copy of data', note: 'tmp = 10' },
      { step: 3, state: 'x = y; y = tmp;', memoryOrStack: 'a becomes 20, b becomes 10', note: 'Mutated caller directly' },
      { step: 4, state: 'cout << a << " " << b', memoryOrStack: 'stdout: 20 10', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Returning a Reference to a Local Variable',
        brokenCode: `int& bad() { int x = 5; return x; } // Dangling reference!`,
        fixedCode: `int good() { int x = 5; return x; }`,
        whyItBreaks: 'Local `x` is destroyed when `bad()` returns, leaving a dangling reference.',
      },
      {
        title: 'Trap 2: Copying Huge Vectors in Loop `for (auto v : matrix)`',
        brokenCode: `for (vector<int> row : grid) sum += row[0]; // Copies every row!`,
        fixedCode: `for (const auto &row : grid) sum += row[0]; // Zero copy`,
        whyItBreaks: 'Omitting `&` deep-copies every inner vector on every iteration.',
      },
      {
        title: 'Trap 3: Dereferencing Moved-From `std::unique_ptr`',
        brokenCode: `auto p2 = std::move(p1); cout << *p1; // Null dereference!`,
        fixedCode: `if (p1) cout << *p1; else cout << *p2;`,
        whyItBreaks: '`std::move` transfers ownership and sets `p1` to `nullptr`.',
      },
    ],
    practiceSheet: [
      {
        id: 'cpp-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Reference Increment Helper',
        prompt: 'Read x and d; mutate `x` inside `void boost(int &val, int d)` and print `x`.',
        banglaHint: '`val += d;` লিখে প্যারামিটার `&val` রাখো।',
        starterCode: `#include <iostream>\nusing namespace std;\nvoid boost(int &v, int d) { v += d; }\nint main() { int x, d; if (cin >> x >> d) { boost(x, d); cout << x << "\\n"; } }`,
        sampleStdin: '15 25',
        expectedOutput: '40',
      },
      {
        id: 'cpp-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Zero-Copy const string& Length Sum',
        prompt: 'Read two words; pass them via `const string&` to return total character length.',
        banglaHint: '`const string &a, const string &b` ব্যবহার করো।',
        starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\nsize_t totalLen(const string &a, const string &b) { return a.size() + b.size(); }\nint main() { string a, b; if (cin >> a >> b) cout << totalLen(a, b) << "\\n"; }`,
        sampleStdin: 'hello world',
        expectedOutput: '10',
      },
      {
        id: 'cpp-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Order Pair via References',
        prompt: 'Read a and b; order them ascending inside `void order2(int &a, int &b)`.',
        banglaHint: '`if (a > b) swap(a, b);` লিখো।',
        starterCode: `#include <iostream>\n#include <utility>\nusing namespace std;\nvoid order2(int &a, int &b) { if (a > b) swap(a, b); }\nint main() { int a, b; if (cin >> a >> b) { order2(a, b); cout << a << " " << b << "\\n"; } }`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'cpp-ch-7-q4',
        difficulty: 'Medium',
        title: '4. unique_ptr Heap Box Transfer',
        prompt: 'Create a `unique_ptr<int>` holding `n`, move it to `b`, and print `*b + 10`.',
        banglaHint: '`make_unique<int>(n)` ও `std::move(a)` ব্যবহার করো।',
        starterCode: `#include <iostream>\n#include <memory>\n#include <utility>\nusing namespace std;\nint main() { int n; if (cin >> n) { auto a = make_unique<int>(n); auto b = std::move(a); cout << (*b + 10) << "\\n"; } }`,
        sampleStdin: '32',
        expectedOutput: '42',
      },
      {
        id: 'cpp-ch-7-q5',
        difficulty: 'Hard',
        title: '5. In-Place Normalize Vector via Non-Const Reference',
        prompt: 'Read n and n ints; subtract minimum element from all items inside `void normalize(vector<int> &a)`.',
        banglaHint: '`vector<int> &a` পাস করে মিনিমাম বিয়োগ করো।',
        starterCode: `#include <algorithm>\n#include <iostream>\n#include <vector>\nusing namespace std;\nvoid normalize(vector<int> &a) {\n    int mn = *min_element(a.begin(), a.end());\n    for (int &x : a) x -= mn;\n}\nint main() {\n    int n; if (!(cin >> n) || n <= 0) return 0;\n    vector<int> a(n); for (int &x : a) cin >> x;\n    normalize(a);\n    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 == n ? "\\n" : " ");\n}`,
        sampleStdin: '4\n10 5 8 12',
        expectedOutput: '5 0 3 7',
      },
    ],
    miniBuild: {
      title: 'C++23 Mini Build: Zero-Copy Reference Swap Engine',
      description: 'Uses C++ non-null references (`int &`) to mutate caller state directly with zero pointer boilerplate.',
      banglaGoal: 'C++ রেফারেন্স (`&`) ব্যবহার করে কপি-মুক্ত ইন-প্লেস স্টেট পরিবর্তন করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `#include <iostream>
using namespace std;

void swapRef(int &x, int &y) {
    int tmp = x;
    x = y;
    y = tmp;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        swapRef(a, b);
        cout << a << " " << b << "\\n";
    }
    return 0;
}`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  python: {
    title: 'Python Chapter 7 (Python 3.13): Object References, Mutability & Aliasing',
    banglaTitle: 'Python অধ্যায় ৭ (Python 3.13): অবজেক্ট রেফারেন্স, মিউটেবিলিটি ও অ্যালিয়াসিং',
    subtitle: 'Understand Python Pass-by-Object-Reference, id(), immutable ints/strs vs mutable lists, and shallow vs deep copy bugs.',
    zeroIntuition: {
      plainEnglishStory:
        'In Python, variables are **name tags stuck onto Heap objects**, not fixed boxes! Writing `b = a` on a `list` creates TWO tags pointing to the SAME list in RAM (`id(a) == id(b)`). Mutating `b.append(99)` secretly mutates `a` too—unless you clone with `a.copy()` or `copy.deepcopy(a)`!',
      asciiFlowchart: `  ALIASING vs CLONING IN PYTHON HEAP
  b = a         -->  [a] ---+---> [10, 20]  (Same id! Mutating b mutates a!)
                     [b] ---+
  b = a.copy()  -->  [a] -------> [10, 20]
                     [b] -------> [10, 20]  (New outer list!)`,
      pseudocode: [
        '1. DISTINGUISH mutable objects (`list`, `dict`, `set`) from immutable (`int`, `str`, `tuple`)',
        '2. CHECK object identity (`a is b` / `id(a)`) vs value equality (`a == b`)',
        '3. CLONE lists with `.copy()` or `copy.deepcopy()` before mutating shared state',
        '4. NEVER use mutable default arguments like `def f(arr=[]):`',
        '5. MUTATE passed `list` in-place via index assignment `box[0], box[1] = box[1], box[0]`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একই টিফিন বক্সে দুটি নামের স্টিকার (Aliasing & Mutability)',
        explanation:
          'ধরো একটি টিফিন বক্সের ওপর প্রথমে "রহিম" নামের স্টিকার লাগানো আছে (`a = [10, 20]`)। এখন তুমি যদি `b = a` লেখো, তবে নতুন বক্স তৈরি হয় না—ওই একই বক্সেই আরেকটি "করিম" স্টিকার লাগানো হয়! ফলে `b[0] = 99` করলে `a`-এর ভেতরের খাবারও বদলে যাবে! আলাদা বক্স চাইলে লিখতে হবে `b = a.copy()`, আর বক্সের ভেতর আরেকটা বক্স থাকলে `copy.deepcopy(a)`।',
        everydayExample:
          'একই গুগল শীটের দুটি শর্টকাট লিংক: একটিতে এডিট করলে অন্য লিংকেও সাথে সাথে বদলে যায়!',
        keyTakeaways: [
          '`int`, `str`, `tuple` বদলানো যায় না (Immutable); কিন্তু `list`, `dict`, `set` সরাসরি বদলে যায় (Mutable)।',
          'ফাংশনের প্যারামিটারে কখনো ডিফল্ট খালি লিস্ট `def add(x, buf=[]):` দেবে না—বদলে `buf=None` ব্যবহার করো!',
          'দুটি লিস্ট মেমোরিতে একই কি না তা `is` দিয়ে আর ভেতরের মান সমান কি না তা `==` দিয়ে চেক করতে হয়।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'py-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Mutating a Shared Mutable List Reference In-Place',
        banglaNote: 'লিস্ট রেফারেন্স ফাংশনে পাঠিয়ে ইন-প্লেস সোয়াপ (`box[0], box[1] = box[1], box[0]`)।',
        code: `import sys

def swap_in_list(box: list[int]) -> None:
    box[0], box[1] = box[1], box[0]

nums = list(map(int, sys.stdin.read().split()))
if len(nums) >= 2:
    pair = [nums[0], nums[1]]
    swap_in_list(pair)
    print(pair[0], pair[1])`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'py-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Fixing the Mutable Default Argument Trap',
        banglaNote: 'ডিফল্ট `buf=[]` ব্যবহার করলে প্রতি কল-এ পুরোনো ডেটা জমে যায়—সঠিক সমাধান `None` প্যাটার্ন।',
        code: `import sys

def push_safe(val: int, buf: list[int] | None = None) -> list[int]:
    if buf is None:
        buf = []
    buf.append(val)
    return buf

nums = list(map(int, sys.stdin.read().split()))
r1 = push_safe(nums[0] if nums else 1)
r2 = push_safe(nums[1] if len(nums) > 1 else 2)
print(len(r1), len(r2), r2[0])`,
        stdin: '7 99',
        expectedOutput: '1 1 99',
      },
      {
        id: 'py-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Shallow Copy vs copy.deepcopy Independence',
        banglaNote: 'নেস্টেড লিস্টের জন্য `.copy()` যথেষ্ট নয়—`copy.deepcopy` আলাদা হিপ অবজেক্ট বানায়।',
        code: `import copy
import sys

val = int(sys.stdin.read().strip() or 0)
orig = [[1, 2], [3, 4]]
cloned = copy.deepcopy(orig)
cloned[0][0] = val
print(f"orig={orig[0][0]} cloned={cloned[0][0]}")`,
        stdin: '999',
        expectedOutput: 'orig=1 cloned=999',
      },
      {
        id: 'py-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Identity Caching (`is`) & Zero-Copy List Aliasing',
        banglaNote: '`is` ও `id()` দিয়ে রেফারেন্স অ্যালিয়াসিং যাচাই এবং ইনডেক্স বাউন্ড কপি এড়ানো।',
        code: `import sys

nums = list(map(int, sys.stdin.read().split()))
a = nums[:]
alias = a
clone = a.copy()
print(f"alias_same={alias is a} clone_same={clone is a} equal={clone == a}")`,
        stdin: '1 2 3',
        expectedOutput: 'alias_same=True clone_same=False equal=True',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'def swap_in_list(box: list[int]) -> None:',
        whatItMeans: 'Receives a reference to the caller’s mutable `list` object.',
        whyItIsThere: 'Allows modifying `box[0]` and `box[1]` in-place without returning a copy.',
        ifDeletedError: 'NameError: `swap_in_list` is not defined.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'box[0], box[1] = box[1], box[0]',
        whatItMeans: 'Mutates slots inside the existing `list` object via tuple unpacking.',
        whyItIsThere: 'Changes the shared Heap object rather than rebinding local name `box`.',
        ifDeletedError: 'Rebinding `box = [box[1], box[0]]` leaves caller’s `pair` untouched!',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'pair = [nums[0], nums[1]]',
        whatItMeans: 'Wraps two immutable ints in a mutable `list` container.',
        whyItIsThere: 'Immutable `int` objects cannot be modified inside a helper function.',
        ifDeletedError: 'NameError on `pair`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'pair = [10, 20]', memoryOrStack: 'Heap list#1 -> [10, 20]', note: 'Calls swap_in_list(pair)' },
      { step: 2, state: 'box aliases list#1', memoryOrStack: 'box is pair == True', note: 'Same object id in RAM' },
      { step: 3, state: 'box[0], box[1] = 20, 10', memoryOrStack: 'list#1 mutated to [20, 10]', note: 'Zero new list allocated' },
      { step: 4, state: 'print(pair[0], pair[1])', memoryOrStack: 'stdout: 20 10', note: 'Caller sees updated list' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Mutable Default Parameter `def f(items=[]):`',
        brokenCode: `def add(x, items=[]):\n    items.append(x)\n    return items  # Shared across ALL calls!`,
        fixedCode: `def add(x, items=None):\n    if items is None: items = []\n    items.append(x)\n    return items`,
        whyItBreaks: 'Default arguments are evaluated ONCE at function definition time, not per call!',
      },
      {
        title: 'Trap 2: Rebinding Parameter Name Instead of Mutating',
        brokenCode: `def reset(arr): arr = []  # Rebinds local label only!`,
        fixedCode: `def reset(arr): arr.clear()  # Mutates the actual Heap list`,
        whyItBreaks: '`arr = []` sticks the local name tag onto a brand-new list without touching caller’s list.',
      },
      {
        title: 'Trap 3: Shallow `.copy()` on 2D Matrices',
        brokenCode: `b = a.copy(); b[0][0] = 9  # Also changes a[0][0]!`,
        fixedCode: `b = [row[:] for row in a]  # or copy.deepcopy(a)`,
        whyItBreaks: '`.copy()` copies only outer row references, not the inner row lists.',
      },
    ],
    practiceSheet: [
      {
        id: 'py-ch-7-q1',
        difficulty: 'Easy',
        title: '1. In-Place List Multiply via Reference',
        prompt: 'Read n and n ints; multiply each element by 2 in-place inside `double_all(arr)`.',
        banglaHint: '`for i in range(len(arr)): arr[i] *= 2` ব্যবহার করো।',
        starterCode: `import sys\ndef double_all(a: list[int]) -> None:\n    for i in range(len(a)): a[i] *= 2\nnums = list(map(int, sys.stdin.read().split()))\narr = nums[1:1 + nums[0]]\ndouble_all(arr)\nprint(*arr)`,
        sampleStdin: '4\n2 5 8 10',
        expectedOutput: '4 10 16 20',
      },
      {
        id: 'py-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Alias vs Independent Clone Check',
        prompt: 'Read x; clone `[1, 2, 3]`, set `clone[0] = x`, and print `orig[0] clone[0]`.',
        banglaHint: '`clone = orig.copy()` ব্যবহার করো।',
        starterCode: `import sys\nx = int(sys.stdin.read().strip())\norig = [1, 2, 3]\nclone = orig.copy()\nclone[0] = x\nprint(orig[0], clone[0])`,
        sampleStdin: '77',
        expectedOutput: '1 77',
      },
      {
        id: 'py-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Safe None Default Accumulator',
        prompt: 'Write `append_item(val, buf=None)` and print `len(a) len(b)` for two separate calls.',
        banglaHint: '`if buf is None: buf = []` দিয়ে আলাদা লিস্ট বানাও।',
        starterCode: `import sys\ndef append_item(v, buf=None):\n    if buf is None: buf = []\n    buf.append(v)\n    return buf\nx, y = map(int, sys.stdin.read().split())\na = append_item(x)\nb = append_item(y)\nprint(len(a), len(b))`,
        sampleStdin: '5 9',
        expectedOutput: '1 1',
      },
      {
        id: 'py-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Deepcopy 2D Grid Independence',
        prompt: 'Read r c val; clone `[[0]*c for _ in range(r)]` cleanly with `deepcopy` and mutate clone only.',
        banglaHint: '`copy.deepcopy` ব্যবহার করে মূল গ্রিড অক্ষত রাখো।',
        starterCode: `import copy, sys\nr, c, val = map(int, sys.stdin.read().split())\ng1 = [[0] * c for _ in range(r)]\ng2 = copy.deepcopy(g1)\ng2[0][0] = val\nprint(g1[0][0], g2[0][0])`,
        sampleStdin: '2 2 55',
        expectedOutput: '0 55',
      },
      {
        id: 'py-ch-7-q5',
        difficulty: 'Hard',
        title: '5. In-Place Rotate Array Right by K Without Extra Array',
        prompt: 'Read n, k and n ints; rotate in-place using 3 reference reverses.',
        banglaHint: 'পুরোটা উল্টে, প্রথম k ও শেষ n-k আলাদা করে উল্টাও।',
        starterCode: `import sys\ndef rev(a, l, r):\n    while l < r: a[l], a[r] = a[r], a[l]; l += 1; r -= 1\nnums = list(map(int, sys.stdin.read().split()))\nn, k = nums[0], nums[1] % nums[0]\narr = nums[2:2 + n]\nrev(arr, 0, n - 1); rev(arr, 0, k - 1); rev(arr, k, n - 1)\nprint(*arr)`,
        sampleStdin: '5 2\n1 2 3 4 5',
        expectedOutput: '4 5 1 2 3',
      },
    ],
    miniBuild: {
      title: 'Python 3.13 Mini Build: In-Place Mutable Reference Swap',
      description: 'Demonstrates Pass-by-Object-Reference by swapping elements inside a shared Heap list.',
      banglaGoal: 'পাইথনে অবজেক্ট রেফারেন্সের মাধ্যমে ইন-প্লেস মিউটেশন প্রমাণ করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `import sys

def swap_in_list(box: list[int]) -> None:
    box[0], box[1] = box[1], box[0]

a, b = map(int, sys.stdin.read().split())
pair = [a, b]
swap_in_list(pair)
print(pair[0], pair[1])`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  java: {
    title: 'Java Chapter 7 (Java 21): JVM Object References & Pass-by-Value',
    banglaTitle: 'Java অধ্যায় ৭ (Java 21): JVM অবজেক্ট রেফারেন্স ও পাস-বাই-ভ্যালু',
    subtitle: 'Solve the famous interview question: Why Java is strictly Pass-by-Value (copying the Heap reference pointer!).',
    zeroIntuition: {
      plainEnglishStory:
        'Java NEVER has raw pointers—yet EVERY object or array variable holds a hidden **JVM Reference** (a 64-bit pointer to the Heap!). When you pass `pair` to a method, Java copies that reference value onto the method’s Stack Frame: mutating `box[0]` modifies the shared Heap array, while reassigning `box = new int[2]` only switches the local copy!',
      asciiFlowchart: `  JVM STACK FRAME                  JVM HEAP
  main: pair (ref @0x900) ----+---> int[] [ 10, 20 ]
                              |
  swapBox: box (copy @0x900) -+   (mutating box[0] updates Heap!)
  Note: box = new int[]{0,0} would ONLY redirect box, NOT pair!`,
      pseudocode: [
        '1. STORE objects/arrays on the JVM Heap; Stack frames hold their references',
        '2. MUTATE object fields or array elements through the copied reference',
        '3. AVOID reassigning the parameter variable expecting caller rebinding',
        '4. GUARD nullable references (`if (obj != null)`) or use `Optional`',
        '5. CLONE arrays (`arr.clone()` or `Arrays.copyOf`) when isolation is required',
      ],
      banglaZeroToHero: {
        analogyTitle: 'টিভির রিমোট কন্ট্রোলের কপি (`Pass-by-Value of Reference`)',
        explanation:
          'Java-তে তোমার ঘরে একটি টিভি (`new int[]{10, 20}`) আছে। তুমি একটি মেথডকে ডাকলে মানে তোমার রিমোট কন্ট্রোলটির হুবহু আরেকটি কপি তাকে দিলে! এখন ওই মেথড রিমোটের চ্যানেল বদলালে (`box[0] = 20`) তোমার ঘরের টিভি ঠিকই বদলে যাবে। কিন্তু সে যদি নিজের হাতের রিমোট ফেলে নতুন রিমোট নেয় (`box = new int[2]`), তবে তোমার আসল টিভি বা রিমোটে কোনো প্রভাব পড়বে না!',
        everydayExample:
          'একই গাড়ির দুটি চাবি: দ্বিতীয় চাবি দিয়ে গাড়ির সিট অ্যাডজাস্ট করলে গাড়ি বদলায়, কিন্তু দ্বিতীয় চাবি বদলে ফেললে প্রথম চাবি বদলায় না।',
        keyTakeaways: [
          'Java-তে সবকিছুই Pass-by-Value—অবজেক্টের ক্ষেত্রে সেই ভ্যালুটি হলো Heap-এর রেফারেন্স ঠিকানা।',
          '`String` ও `Integer` হলো Immutable অবজেক্ট—ভেতর থেকে এদের মান বদলানো যায় না।',
          '`null` রেফারেন্সের মেথড কল করলেই কুখ্যাত `NullPointerException` (NPE) হয়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'java-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Mutating Heap Array Elements Through Reference Copy',
        banglaNote: '`int[] box` রেফারেন্স পাস করে হিপ অ্যারের ভেতরের উপাদান সোয়াপ করা।',
        code: `import java.util.Scanner;

public class Main {
    static void swapBox(int[] box) {
        int tmp = box[0];
        box[0] = box[1];
        box[1] = tmp;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] pair = { sc.nextInt(), sc.nextInt() };
        swapBox(pair);
        System.out.println(pair[0] + " " + pair[1]);
    }
}`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'java-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Why Reassigning Parameter Reference Fails vs Mutating',
        banglaNote: '`p = new Holder(999)` লিখলে কলারের `h` বদলায় না, কিন্তু `p.val = 999` লিখলে বদলায়!',
        code: `import java.util.Scanner;

public class Main {
    static class Holder { int val; Holder(int v) { this.val = v; } }
    static void rebindLocal(Holder h) { h = new Holder(999); }
    static void mutateField(Holder h, int v) { h.val = v; }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt(), y = sc.nextInt();
        Holder h = new Holder(x);
        rebindLocal(h);
        int afterRebind = h.val;
        mutateField(h, y);
        System.out.println(afterRebind + " " + h.val);
    }
}`,
        stdin: '15 42',
        expectedOutput: '15 42',
      },
      {
        id: 'java-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Null-Safe Objects.requireNonNull & Optional Guard',
        banglaNote: '`NullPointerException` এড়াতে Java 21 `Optional` ও নাল-গার্ড প্যাটার্ন।',
        code: `import java.util.Optional;
import java.util.Scanner;

public class Main {
    static Optional<Integer> parsePositive(int x) {
        return x > 0 ? Optional.of(x * 2) : Optional.empty();
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        System.out.println(parsePositive(x).orElse(-1));
    }
}`,
        stdin: '-8',
        expectedOutput: '-1',
      },
      {
        id: 'java-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Defensive Arrays.copyOf() Isolation',
        banglaNote: 'সর্টিং করার সময় আসল অ্যারে অক্ষত রাখতে `Arrays.copyOf` দিয়ে ফাস্ট হিপ ক্লোন।',
        code: `import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] orig = new int[n];
        for (int i = 0; i < n; i++) orig[i] = sc.nextInt();
        int[] sorted = Arrays.copyOf(orig, n);
        Arrays.sort(sorted);
        System.out.println("orig0=" + orig[0] + " sorted0=" + sorted[0]);
    }
}`,
        stdin: '4\n9 2 7 5',
        expectedOutput: 'orig0=9 sorted0=2',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 4',
        codeSnippet: 'static void swapBox(int[] box) {',
        whatItMeans: 'Receives a copy of the JVM Heap reference pointing to `pair`.',
        whyItIsThere: 'Both `box` and `pair` refer to the exact same `int[]` object.',
        ifDeletedError: 'Compile error: cannot find method `swapBox`.',
      },
      {
        lineNumber: 'Line 5-7',
        codeSnippet: 'int tmp = box[0]; box[0] = box[1]; box[1] = tmp;',
        whatItMeans: 'Mutates array slots in Heap memory.',
        whyItIsThere: 'Persists changes visible to `main()`.',
        ifDeletedError: 'Output stays `10 20`.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'int[] pair = { sc.nextInt(), sc.nextInt() };',
        whatItMeans: 'Allocates a 2-element `int[]` on the JVM Heap.',
        whyItIsThere: 'Primitive `int` cannot be mutated inside another method; wrapping in `int[]` enables mutation.',
        ifDeletedError: '`pair` undefined.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'pair -> Heap int[2]{10,20}', memoryOrStack: 'Stack ref pair=@0x900', note: 'Calls swapBox(pair)' },
      { step: 2, state: 'box = copy of @0x900', memoryOrStack: 'Both point to Heap int[2]', note: 'tmp = 10' },
      { step: 3, state: 'box[0]=20; box[1]=10', memoryOrStack: 'Heap int[2] -> {20, 10}', note: 'Caller sees updated slots' },
      { step: 4, state: 'System.out.println("20 10")', memoryOrStack: 'stdout: 20 10', note: 'Matches expected' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Trying to Write `swap(int a, int b)` on Primitives',
        brokenCode: `static void swap(int a, int b) { int t=a; a=b; b=t; } // Swaps copies only!`,
        fixedCode: `static void swapBox(int[] p) { int t=p[0]; p[0]=p[1]; p[1]=t; }`,
        whyItBreaks: 'Primitive parameters pass value copies; caller’s local ints never change.',
      },
      {
        title: 'Trap 2: Calling Methods on `null` Without Guarding',
        brokenCode: `String s = null;\nint n = s.length(); // NullPointerException!`,
        fixedCode: `int n = (s == null) ? 0 : s.length();`,
        whyItBreaks: 'Dereferencing a `null` JVM reference crashes at runtime.',
      },
      {
        title: 'Trap 3: `int[] b = a;` Expecting a Copy',
        brokenCode: `int[] b = a; b[0] = -1; // Silently ruins a[0]!`,
        fixedCode: `int[] b = Arrays.copyOf(a, a.length);`,
        whyItBreaks: '`=` copies only the reference address, not the array elements.',
      },
    ],
    practiceSheet: [
      {
        id: 'java-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Mutate Counter Object Field',
        prompt: 'Create a `Box(int v)` class, pass it to `addDelta(Box b, int d)`, and print `b.v`.',
        banglaHint: '`b.v += d;` দিয়ে অবজেক্ট ফিল্ড বদলাও।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static class Box { int v; Box(int v) { this.v = v; } }\n    static void addDelta(Box b, int d) { b.v += d; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        Box b = new Box(sc.nextInt()); addDelta(b, sc.nextInt());\n        System.out.println(b.v);\n    }\n}`,
        sampleStdin: '15 25',
        expectedOutput: '40',
      },
      {
        id: 'java-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Safe Null String Length Helper',
        prompt: 'Read a token; print its length (or `0` if `"NULL"` is passed to simulate null).',
        banglaHint: '`s == null ? 0 : s.length()` লিখো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static int safeLen(String s) { return s == null ? 0 : s.length(); }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String t = sc.hasNext() ? sc.next() : "NULL";\n        System.out.println(safeLen("NULL".equals(t) ? null : t));\n    }\n}`,
        sampleStdin: 'NULL',
        expectedOutput: '0',
      },
      {
        id: 'java-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Independent Copy With Arrays.copyOf',
        prompt: 'Read n, newVal and n ints; clone `a`, set `clone[0] = newVal`, print `a[0] + " " + clone[0]`.',
        banglaHint: '`Arrays.copyOf(a, n)` ব্যবহার করো।',
        starterCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt(), nv = sc.nextInt();\n        int[] a = new int[n]; for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int[] c = Arrays.copyOf(a, n); c[0] = nv;\n        System.out.println(a[0] + " " + c[0]);\n    }\n}`,
        sampleStdin: '3 99\n5 6 7',
        expectedOutput: '5 99',
      },
      {
        id: 'java-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Order Two Slots via Array Reference',
        prompt: 'Read a and b into `int[2]` and sort ascending inside `sort2(int[] p)`.',
        banglaHint: '`if (p[0] > p[1])` হলে সোয়াপ করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    static void sort2(int[] p) { if (p[0] > p[1]) { int t = p[0]; p[0] = p[1]; p[1] = t; } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int[] p = { sc.nextInt(), sc.nextInt() }; sort2(p);\n        System.out.println(p[0] + " " + p[1]);\n    }\n}`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'java-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Deep Clone 2D Matrix Without Row Aliasing',
        prompt: 'Read r c val; deep-clone `int[r][c]` row by row, mutate `clone[0][0] = val`, print `orig[0][0] + " " + clone[0][0]`.',
        banglaHint: 'প্রতিটি রো `orig[i].clone()` করে কপি করো।',
        starterCode: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt(), c = sc.nextInt(), val = sc.nextInt();\n        int[][] orig = new int[r][c];\n        int[][] clone = new int[r][];\n        for (int i = 0; i < r; i++) clone[i] = orig[i].clone();\n        clone[0][0] = val;\n        System.out.println(orig[0][0] + " " + clone[0][0]);\n    }\n}`,
        sampleStdin: '2 2 88',
        expectedOutput: '0 88',
      },
    ],
    miniBuild: {
      title: 'Java 21 Mini Build: JVM Heap Reference Swap',
      description: 'Demonstrates how passing a JVM object reference copies the reference value while mutating shared Heap state.',
      banglaGoal: 'JVM হিপ রেফারেন্স কীভাবে মেথডের ভেতর থেকে অ্যারে বদলায় তা যাচাই করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `import java.util.Scanner;

public class Main {
    static void swapBox(int[] box) {
        int tmp = box[0];
        box[0] = box[1];
        box[1] = tmp;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] pair = { sc.nextInt(), sc.nextInt() };
        swapBox(pair);
        System.out.println(pair[0] + " " + pair[1]);
    }
}`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  javascript: {
    title: 'JavaScript Chapter 7 (ES2025): Browser DOM Tree, Object References & structuredClone',
    banglaTitle: 'JavaScript অধ্যায় ৭ (ES2025): ব্রাউজার DOM ট্রি, অবজেক্ট রেফারেন্স ও ক্লোনিং',
    subtitle: 'Master JS heap references vs structuredClone(), optional chaining (?.), and mutating live Browser DOM node references.',
    zeroIntuition: {
      plainEnglishStory:
        'In JavaScript, primitives (`number`, `string`, `boolean`) copy by value, while Objects, Arrays, and **HTML DOM Nodes** copy by reference! Calling `const el = document.getElementById("view")` grabs a live reference to that exact element in the browser’s DOM tree—mutating `el.textContent` immediately repaints the screen!',
      asciiFlowchart: `  JS HEAP & BROWSER DOM TREE
  user1 (ref @0xA1) ---> { name: "Arjun", meta: { xp: 100 } }
  { ...user1 }      ---> Shallow copy! Still shares meta @0xB2!
  structuredClone() ---> True Deep Copy (new nested objects!)`,
      pseudocode: [
        '1. MUTATE arrays/objects passed by reference carefully or clone first',
        '2. USE `{ ...obj }` only for 1-level shallow copies; use `structuredClone(obj)` for nested data',
        '3. GUARD nullable nested lookups with optional chaining `obj?.nested?.prop ?? fallback`',
        '4. QUERY DOM nodes once and update `.textContent` (never raw `.innerHTML` with user text!)',
        '5. AVOID aliasing state objects directly inside UI stores',
      ],
      banglaZeroToHero: {
        analogyTitle: 'অবজেক্টের ছায়া বনাম `structuredClone` এবং লাইভ DOM গাছ',
        explanation:
          'JavaScript-এ একটি অবজেক্টের ওপর `const b = a` বা স্প্রেড `{ ...a }` করলেও ভেতরের নেস্টেড অবজেক্টগুলোর ঠিকানা কপি হয় না—ফলে `b.meta.xp` বদলালে `a.meta.xp`-ও বদলে যায়! সত্যিকারের গভীর কপি করতে আধুনিক ES2025-এ আছে `structuredClone(a)`। আর ওয়েব পেজের `document.getElementById(...)` হলো ব্রাউজারের DOM গাছের একটি ডালের সরাসরি রেফারেন্স—এটা বদলালেই পেজের লেখা সাথে সাথে বদলে যায়!',
        everydayExample:
          'গাছের মূল ডাল ধরে নাড়া দিলে পুরো ডালের পাতাই নড়ে—`const node = document.querySelector(...)` ঠিক তেমনই লাইভ DOM রেফারেন্স।',
        keyTakeaways: [
          '`{ ...obj }` শুধু ওপরের স্তর কপি করে (Shallow Copy)—নেস্টেড অবজেক্ট আলাদা করতে `structuredClone(obj)` ব্যবহার করো।',
          'নাল বা আনডিফাইন্ড এরর এড়াতে `user?.profile?.name ?? "Guest"` ব্যবহার করো।',
          'DOM-এ ইউজার টেক্সট দেখাতে `.innerHTML`-এর বদলে নিরাপদ `.textContent` ব্যবহার করো (XSS প্রতিরোধ)।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'js-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Mutating Array Reference In-Place',
        banglaNote: 'অবজেক্ট/অ্যারে রেফারেন্স ফাংশনে পাঠিয়ে সরাসরি ভেতরের মান সোয়াপ করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const box = raw.trim().split(/\\s+/).map(Number);

function swapRef(ref) {
  [ref[0], ref[1]] = [ref[1], ref[0]];
}
swapRef(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'js-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Optional Chaining (?.) & Nullish Coalescing (??)',
        banglaNote: 'নেস্টেড প্রপার্টি অনুপস্থিত থাকলে ক্র্যাশ না করে নিরাপদ ফলব্যাক দেওয়া।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const mode = raw.trim();
const state = mode === 'guest' ? { profile: null } : { profile: { rank: 'Grandmaster' } };
const rank = state?.profile?.rank ?? 'Novice';
console.log(rank);`,
        stdin: 'guest',
        expectedOutput: 'Novice',
      },
      {
        id: 'js-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Shallow Spread Trap vs structuredClone() Deep Copy',
        banglaNote: '`structuredClone` ব্যবহার করে নেস্টেড অবজেক্ট মিউটেশন থেকে মূল স্টেট সুরক্ষিত রাখা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const nextXp = Number(raw.trim() || 0);
const orig = { name: 'Arjun', stats: { xp: 100 } };
const deep = structuredClone(orig);
deep.stats.xp = nextXp;
console.log(\`orig=\${orig.stats.xp} deep=\${deep.stats.xp}\`);`,
        stdin: '500',
        expectedOutput: 'orig=100 deep=500',
      },
      {
        id: 'js-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Pure Object Reference Update & Shallow Identity Check',
        banglaNote: '`Object.is` দিয়ে রেফারেন্স আইডেন্টিটি চেক ও ইমিউটেবল স্টেট আপডেট।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const delta = Number(raw.trim() || 0);
const state = { count: 10 };
const alias = state;
const nextState = { ...state, count: state.count + delta };
console.log(\`same_alias=\${Object.is(state, alias)} same_next=\${Object.is(state, nextState)} val=\${nextState.count}\`);`,
        stdin: '5',
        expectedOutput: 'same_alias=true same_next=false val=15',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'function swapRef(ref) {',
        whatItMeans: 'Accepts a reference pointing to the caller’s `box` array in Heap memory.',
        whyItIsThere: 'Allows updating `ref[0]` and `ref[1]` directly in O(1).',
        ifDeletedError: 'ReferenceError: `swapRef` is not defined.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: '[ref[0], ref[1]] = [ref[1], ref[0]];',
        whatItMeans: 'Destructuring assignment mutating indices `0` and `1` on the shared array.',
        whyItIsThere: 'Changes the underlying Heap object rather than reassigning `ref`.',
        ifDeletedError: 'Output stays `10 20`.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'swapRef(box);',
        whatItMeans: 'Invokes `swapRef` passing the reference to `box`.',
        whyItIsThere: 'Mutates `box` before printing.',
        ifDeletedError: 'Prints unswapped `10 20`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'box = [10, 20]', memoryOrStack: 'Heap Array @0xA1', note: 'Calls swapRef(box)' },
      { step: 2, state: 'ref points to @0xA1', memoryOrStack: 'No array copied', note: 'Reads [20, 10]' },
      { step: 3, state: 'ref[0]=20; ref[1]=10', memoryOrStack: 'Heap @0xA1 now [20, 10]', note: 'Mutated in-place' },
      { step: 4, state: 'console.log("20 10")', memoryOrStack: 'stdout: 20 10', note: 'Matches expected' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Thinking `{ ...obj }` Deep-Copies Nested Objects',
        brokenCode: `const b = { ...a }; b.nested.x = 99; // Mutates a.nested.x!`,
        fixedCode: `const b = structuredClone(a); b.nested.x = 99;`,
        whyItBreaks: 'Spread syntax copies top-level keys only; nested objects share references!',
      },
      {
        title: 'Trap 2: Reassigning a Parameter Variable `ref = [20, 10]`',
        brokenCode: `function swap(r) { r = [r[1], r[0]]; } // Caller array unchanged!`,
        fixedCode: `function swap(r) { [r[0], r[1]] = [r[1], r[0]]; }`,
        whyItBreaks: 'Reassigning `r` only changes what the local parameter points to.',
      },
      {
        title: 'Trap 3: `innerHTML = userInput` XSS Risk on DOM Nodes',
        brokenCode: `el.innerHTML = username; // Executes injected <script>/<img> tags!`,
        fixedCode: `el.textContent = username; // Always safe plain text`,
        whyItBreaks: '`innerHTML` parses HTML markup, whereas `textContent` renders literal text safely.',
      },
    ],
    practiceSheet: [
      {
        id: 'js-ch-7-q1',
        difficulty: 'Easy',
        title: '1. In-Place Object Field Boost',
        prompt: 'Read score and delta; mutate `player.score` in-place via `boost(player, delta)`.',
        banglaHint: '`p.score += d;` ফাংশনে রেফারেন্স পাস করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst [s, d] = raw.trim().split(/\\s+/).map(Number);\nfunction boost(p, delta) { p.score += delta; }\nconst player = { score: s };\nboost(player, d);\nconsole.log(player.score);`,
        sampleStdin: '15 25',
        expectedOutput: '40',
      },
      {
        id: 'js-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Safe Optional Chaining Fallback',
        prompt: 'Read key (`has` or `none`); safely read `obj?.meta?.code ?? 404`.',
        banglaHint: '`?.` এবং `??` অপারেটর ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst mode = raw.trim();\nconst obj = mode === 'has' ? { meta: { code: 200 } } : {};\nconsole.log(obj?.meta?.code ?? 404);`,
        sampleStdin: 'none',
        expectedOutput: '404',
      },
      {
        id: 'js-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Deep Clone Nested Object With structuredClone',
        prompt: 'Read val; clone `{ a: { x: 1 } }` with `structuredClone`, update `clone.a.x = val`, print `orig.a.x clone.a.x`.',
        banglaHint: '`structuredClone(orig)` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst val = Number(raw.trim());\nconst orig = { a: { x: 1 } };\nconst clone = structuredClone(orig);\nclone.a.x = val;\nconsole.log(\`\${orig.a.x} \${clone.a.x}\`);`,
        sampleStdin: '88',
        expectedOutput: '1 88',
      },
      {
        id: 'js-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Sort Two Slots via Array Reference',
        prompt: 'Read a and b into `[a, b]` and sort ascending inside `sort2(pair)`.',
        banglaHint: '`if (p[0] > p[1]) [p[0], p[1]] = [p[1], p[0]];` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst pair = raw.trim().split(/\\s+/).map(Number);\nfunction sort2(p) { if (p[0] > p[1]) [p[0], p[1]] = [p[1], p[0]]; }\nsort2(pair);\nconsole.log(\`\${pair[0]} \${pair[1]}\`);`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'js-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Immutable Nested State Transition',
        prompt: 'Read delta; update `state.user.xp` without mutating `state`, and print `state.user.xp next.user.xp`.',
        banglaHint: 'স্প্রেড অপারেটর দিয়ে `{ ...state, user: { ...state.user, xp: ... } }` করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst delta = Number(raw.trim());\nconst state = { user: { xp: 50 } };\nconst next = { ...state, user: { ...state.user, xp: state.user.xp + delta } };\nconsole.log(\`\${state.user.xp} \${next.user.xp}\`);`,
        sampleStdin: '25',
        expectedOutput: '50 75',
      },
    ],
    miniBuild: {
      title: 'ES2025 Mini Build: Object Reference Swap Engine',
      description: 'Swaps two elements inside a shared Heap array reference in O(1) time.',
      banglaGoal: 'জাভাস্ক্রিপ্ট অবজেক্ট/অ্যারে রেফারেন্সের মাধ্যমে ইন-প্লেস স্টেট আপডেট।',
      combinesChapters: 'Ch 1–7',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const box = raw.trim().split(/\\s+/).map(Number);
function swapRef(ref) { [ref[0], ref[1]] = [ref[1], ref[0]]; }
swapRef(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  rust: {
    title: 'Rust Chapter 7 (Rust 2024): Ownership, Borrowing (&T / &mut T) & The Borrow Checker',
    banglaTitle: 'Rust অধ্যায় ৭ (Rust 2024): ওনারশিপ, বরোয়িং (&T / &mut T) ও বরো চেকার',
    subtitle: 'Master Rust’s 3 Ownership laws, Move semantics, shared (&T) vs exclusive (&mut T) borrows, and zero-GC memory safety.',
    zeroIntuition: {
      plainEnglishStory:
        'Rust gives you C-level speed with **zero Garbage Collector** and **zero dangling pointers** using 3 compile-time Ownership Laws: (1) Every value has ONE Owner; (2) Assigning a Heap value (`let s2 = s1;`) **moves** ownership so `s1` can never cause a double-free; (3) Instead of moving, you can **borrow**: unlimited readers (`&T`) OR ONE exclusive writer (`&mut T`)—never both at once!',
      asciiFlowchart: `  RUST BORROW CHECKER RULES (Verified at Compile Time!)
  +----------------------------------------------------------------+
  | Ownership Move:  let s2 = s1;   ==> s1 is invalidated! (0 double-free)
  | Shared Borrow:   &T, &T, &T     ==> Many simultaneous readers OK!
  | Mutable Borrow:  &mut T         ==> ONLY 1 writer at a time! (0 data races)
  +----------------------------------------------------------------+`,
      pseudocode: [
        '1. KEEP one clear Owner for every Heap allocation (`String`, `Vec`)',
        '2. PASS read-only references as `&T` / `&str` / `&[T]` so caller keeps ownership',
        '3. PASS mutable references as `&mut T` when caller expects in-place updates',
        '4. USE `std::mem::swap(&mut a, &mut b)` safely for two disjoint mutable borrows',
        '5. DROP non-lexical borrows automatically as soon as their last usage finishes',
      ],
      banglaZeroToHero: {
        analogyTitle: 'এক মালিক + পাঠাগারের বই ধারের নিয়ম (Ownership & Borrow Checker)',
        explanation:
          'একটি দুর্লভ বইয়ের (`String`/`Vec`) আসল মালিক একজনই থাকে। তুমি যদি বইটি বন্ধুকে একেবারে দিয়ে দাও (`let s2 = s1;`), তবে তোমার হাতে আর বই থাকে না—এটাই **Move**! কিন্তু যদি শুধু পড়তে ধার দাও (`&s1`), তবে একসাথে ১০ জন মিলে পড়তে পারবে (Shared Borrow)। আর যদি কেউ কলম দিয়ে বইটি এডিট করতে চায় (`&mut s1`), তখন অন্য কেউ পড়তেও পারবে না, লিখতেও পারবে না—এটাই Rust-এর **Borrow Checker** যা সব মেমোরি বাগ কম্পাইল করার আগেই আটকে দেয়!',
        everydayExample:
          'একটি গুগল ডক: View-Only লিংক (&T) ১০০ জন একসাথে দেখতে পারে, কিন্তু একসাথে দুইজন একই ভ্যারিয়েবল ডিলিট/রিসাইজ করতে গেলে যে কনফ্লিক্ট হতো তা `&mut T` রুল বন্ধ করে।',
        keyTakeaways: [
          'অনেকগুলো `&T` (Immutable Borrow) একসাথে থাকতে পারে, কিন্তু `&mut T` (Mutable Borrow) সময়ে মাত্র একটিই থাকবে।',
          '`i32`, `bool`, `char`-এর মতো ছোট স্ট্যাক টাইপগুলো `Copy` ট্রেইট ইমপ্লিমেন্ট করে—এরা Move হয় না, কপি হয়।',
          'স্কোপ শেষ হলেই মালিকের ডেটা সাথে সাথে ফ্রি হয়ে যায়—তাই কোনো Garbage Collector বা `free()` লাগে না!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'rust-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Exclusive Mutable Borrows (&mut i32) Swap',
        banglaNote: '`&mut a` এবং `&mut b` দুটি আলাদা মিউটেবল বরো পাঠিয়ে `std::mem::swap`।',
        code: `use std::io::{self, Read};

fn swap_borrow(x: &mut i32, y: &mut i32) {
    std::mem::swap(x, y);
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (mut a, mut b) = (v[0], v[1]);
    swap_borrow(&mut a, &mut b);
    println!("{} {}", a, b);
}`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'rust-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Ownership Move vs Borrow (&String)',
        banglaNote: 'হেল্পার ফাংশনকে ওনারশিপ না দিয়ে `&str` বরো দিলে `main`-এ স্ট্রিংটি আবার ব্যবহার করা যায়।',
        code: `use std::io::{self, Read};

fn byte_len(text: &str) -> usize {
    text.len() // Borrows text without moving ownership!
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let word = s.trim().to_string();
    let len = byte_len(&word); // word stays valid after call!
    println!("{}={}", word, len);
}`,
        stdin: 'ownership',
        expectedOutput: 'ownership=9',
      },
      {
        id: 'rust-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: NLL (Non-Lexical Lifetimes) Readers Before Writer',
        banglaNote: 'ইমিউটেবল বরোর শেষ ব্যবহারের পরপরই `&mut` বরো শুরু করা (আধুনিক Rust 2024)।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut nums: Vec<i32> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    let r1 = &nums[0];
    let r2 = &nums[1];
    let initial_sum = *r1 + *r2; // Last use of r1 & r2 ends their borrow here!
    nums.push(initial_sum);      // Now &mut borrow for .push() is 100% legal!
    println!("len={} last={}", nums.len(), nums[nums.len() - 1]);
}`,
        stdin: '12 8',
        expectedOutput: 'len=3 last=20',
      },
      {
        id: 'rust-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: split_at_mut() for Two Disjoint Mutable Slice Borrows',
        banglaNote: 'একই স্লাইসের ভেতর দুইটি আলাদা `&mut` অংশ নিরাপদভাবে পেতে `.split_at_mut()`।',
        code: `use std::io::{self, Read};

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let mut v: Vec<i32> = s.split_whitespace().filter_map(|t| t.parse().ok()).collect();
    let mid = v.len() / 2;
    let (left, right) = v.split_at_mut(mid);
    for x in left.iter_mut() { *x += 1; }
    for x in right.iter_mut() { *x *= 2; }
    let out: Vec<String> = v.iter().map(|x| x.to_string()).collect();
    println!("{}", out.join(" "));
}`,
        stdin: '10 20 30 40',
        expectedOutput: '11 21 60 80',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 3',
        codeSnippet: 'fn swap_borrow(x: &mut i32, y: &mut i32) {',
        whatItMeans: 'Accepts two exclusive mutable references without taking ownership.',
        whyItIsThere: 'Guarantees no other code aliases `x` or `y` during the swap.',
        ifDeletedError: 'Compile error: cannot find function `swap_borrow`.',
      },
      {
        lineNumber: 'Line 4',
        codeSnippet: 'std::mem::swap(x, y);',
        whatItMeans: 'Swaps the values behind two disjoint mutable references in O(1).',
        whyItIsThere: 'Safe standard-library primitive avoiding temporary move issues on non-Copy types too.',
        ifDeletedError: '`a` and `b` stay unswapped (`10 20`).',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'let (mut a, mut b) = (v[0], v[1]);',
        whatItMeans: 'Binds mutable local ints `a` and `b` so `&mut` borrows are allowed.',
        whyItIsThere: 'Immutable bindings cannot be borrowed as `&mut`.',
        ifDeletedError: 'Missing `mut` triggers `error[E0596]: cannot borrow as mutable`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'a=10 (mut), b=20 (mut)', memoryOrStack: 'Owner: main()', note: 'Borrows &mut a, &mut b' },
      { step: 2, state: 'swap_borrow checks exclusivity', memoryOrStack: 'x=&mut a, y=&mut b (disjoint!)', note: 'Borrow checker approves' },
      { step: 3, state: 'std::mem::swap(x, y)', memoryOrStack: 'a=20, b=10', note: 'Mutates original stack ints' },
      { step: 4, state: 'Borrows end; println!("20 10")', memoryOrStack: 'stdout: 20 10', note: 'Zero dangling pointers possible' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using a String/Vec After Moving Ownership',
        brokenCode: `let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s1); // E0382: borrow of moved value!`,
        fixedCode: `let s1 = String::from("hi");\nlet s2 = &s1; // Borrow instead of move!\nprintln!("{} {}", s1, s2);`,
        whyItBreaks: 'Heap owners cannot be copied implicitly; `s2 = s1` transfers ownership.',
      },
      {
        title: 'Trap 2: Holding `&T` Across a `.push()` (`&mut T`) Mutation',
        brokenCode: `let first = &v[0];\nv.push(99); // Could reallocate Heap & dangle first!\nprintln!("{}", first);`,
        fixedCode: `let first = v[0]; // Copy i32 value, OR use first BEFORE v.push(99)`,
        whyItBreaks: '`v.push()` might reallocate the Vec buffer, invalidating `first`!',
      },
      {
        title: 'Trap 3: Trying to Return a Reference to a Local Variable',
        brokenCode: `fn bad<'a>() -> &'a String { let s = String::new(); &s }`,
        fixedCode: `fn good() -> String { String::new() } // Return owned String!`,
        whyItBreaks: 'Rust’s lifetime checker blocks returning references to dropped stack frames.',
      },
    ],
    practiceSheet: [
      {
        id: 'rust-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Mutable Borrow Boost (&mut i32)',
        prompt: 'Read x and d; add d to x inside `fn boost(v: &mut i32, d: i32)`.',
        banglaHint: '`*v += d;` লিখো ও `&mut x` পাস করো।',
        starterCode: `use std::io::{self, Read};\nfn boost(v: &mut i32, d: i32) { *v += d; }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let nums: Vec<i32> = s.split_whitespace().map(|t| t.parse().unwrap()).collect();\n    let mut x = nums[0]; boost(&mut x, nums[1]); println!("{}", x);\n}`,
        sampleStdin: '15 25',
        expectedOutput: '40',
      },
      {
        id: 'rust-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Borrow String Twice Without Move',
        prompt: 'Read a word; call `fn len(s: &str) -> usize` and print `<word> <len>`.',
        banglaHint: '`&str` বরো করলে `word` ফাংশন কলের পরও জীবিত থাকে।',
        starterCode: `use std::io::{self, Read};\nfn word_len(w: &str) -> usize { w.len() }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let word = s.trim().to_string();\n    let n = word_len(&word);\n    println!("{} {}", word, n);\n}`,
        sampleStdin: 'borrow',
        expectedOutput: 'borrow 6',
      },
      {
        id: 'rust-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Order Two Mutable Borrows',
        prompt: 'Read a and b; ensure `a <= b` inside `fn order2(a: &mut i32, b: &mut i32)`.',
        banglaHint: '`if *a > *b { std::mem::swap(a, b); }` লিখো।',
        starterCode: `use std::io::{self, Read};\nfn order2(a: &mut i32, b: &mut i32) { if *a > *b { std::mem::swap(a, b); } }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().map(|t| t.parse().unwrap()).collect();\n    let (mut a, mut b) = (v[0], v[1]); order2(&mut a, &mut b); println!("{} {}", a, b);\n}`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'rust-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Mutate Vec Elements via `&mut [i32]`',
        prompt: 'Read n and n ints; subtract min from every element using `normalize(&mut a)`.',
        banglaHint: '`for x in a.iter_mut() { *x -= mn; }` ব্যবহার করো।',
        starterCode: `use std::io::{self, Read};\nfn normalize(a: &mut [i32]) {\n    if let Some(&mn) = a.iter().min() { for x in a.iter_mut() { *x -= mn; } }\n}\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let mut v: Vec<i32> = s.split_whitespace().map(|t| t.parse().unwrap()).collect();\n    let n = v[0] as usize; let a = &mut v[1..1 + n]; normalize(a);\n    let out: Vec<String> = a.iter().map(|x| x.to_string()).collect();\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '4\n10 5 8 12',
        expectedOutput: '5 0 3 7',
      },
      {
        id: 'rust-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Move Ownership Into Builder & Return Owned Vec',
        prompt: 'Write `fn append_sum(mut v: Vec<i32>) -> Vec<i32>` that takes ownership, pushes sum, and returns ownership.',
        banglaHint: '`mut v: Vec<i32>` গ্রহণ করে পুশ শেষে `v` রিটার্ন করো।',
        starterCode: `use std::io::{self, Read};\nfn append_sum(mut v: Vec<i32>) -> Vec<i32> { let s: i32 = v.iter().sum(); v.push(s); v }\nfn main() {\n    let mut s = String::new(); io::stdin().read_to_string(&mut s).unwrap();\n    let v: Vec<i32> = s.split_whitespace().skip(1).map(|t| t.parse().unwrap()).collect();\n    let res = append_sum(v);\n    let out: Vec<String> = res.iter().map(|x| x.to_string()).collect();\n    println!("{}", out.join(" "));\n}`,
        sampleStdin: '3\n4 5 6',
        expectedOutput: '4 5 6 15',
      },
    ],
    miniBuild: {
      title: 'Rust 2024 Mini Build: Safe Exclusive-Borrow Swap',
      description: 'Swaps two stack integers via Rust’s exclusive `&mut i32` borrows enforced at compile time.',
      banglaGoal: 'Rust বরো চেকার ও `&mut` রেফারেন্স ব্যবহার করে ক্র্যাশ-মুক্ত সোয়াপ ইঞ্জিন তৈরি।',
      combinesChapters: 'Ch 1–7',
      starterCode: `use std::io::{self, Read};

fn swap_borrow(x: &mut i32, y: &mut i32) {
    std::mem::swap(x, y);
}

fn main() {
    let mut s = String::new();
    io::stdin().read_to_string(&mut s).unwrap();
    let v: Vec<i32> = s.split_whitespace().map(|x| x.parse().unwrap()).collect();
    let (mut a, mut b) = (v[0], v[1]);
    swap_borrow(&mut a, &mut b);
    println!("{} {}", a, b);
}`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  typescript: {
    title: 'TypeScript Chapter 7 (TS 5.x): Typed References, Readonly<T> & Narrowing',
    banglaTitle: 'TypeScript অধ্যায় ৭ (TS 5.x): টাইপড রেফারেন্স, Readonly<T> ও ন্যারোয়িং',
    subtitle: 'Protect shared object references with Readonly<T>, handle nullable unions safely, and use type narrowing (typeof / in).',
    zeroIntuition: {
      plainEnglishStory:
        'JavaScript objects are shared by reference, so accidental mutations can corrupt distant parts of an app. TypeScript stops those bugs at compile time using `Readonly<T>` / `readonly` tuples and strict `null` narrowing—ensuring you never read `.prop` off `null | undefined`!',
      asciiFlowchart: `  TYPE NARROWING & READONLY PROTECTION
  val: string | null ---> if (val !== null) ---> narrowed to: string!
  Readonly<User>     ---> user.xp = 99  ==> COMPILE ERROR (immutable contract!)`,
      pseudocode: [
        '1. ANNOTATE fixed-shape pairs cleanly as `[number, number]` tuples',
        '2. GUARD nullable references (`x !== null && x !== undefined`) before property access',
        '3. LOCK shared reference payloads with `Readonly<T>` or `readonly` fields',
        '4. USE `typeof` / `in` narrowing inside union handlers',
        '5. CLONE before producing updated copies (`{ ...obj, xp: newXp }`)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সিল করা এনভেলপ (`Readonly<T>`) এবং নাল-চেক দারোয়ান (`Narrowing`)',
        explanation:
          'যখন একটি অবজেক্ট রেফারেন্স অন্য ফাংশনে পাঠানো হয়, TypeScript-এ `Readonly<T>` বলে দেয়—"তুমি শুধু পড়তে পারবে, কোনো প্রপার্টি বদলাতে পারবে না!" আর কোনো ভ্যালু `string | null` হলে `if (x !== null)` চেক না করা পর্যন্ত TS কম্পাইলার `.length` লিখতেই দেয় না (Type Narrowing)!',
        everydayExample:
          'সিল করা মার্কশিটের কপি: সবাই নম্বর দেখতে পারবে, কিন্তু কলম দিয়ে কাটাকুটি করতে পারবে না!',
        keyTakeaways: [
          'টিউপল `[number, number]` দিয়ে ফিক্সড-সাইজ পেয়ার রেফারেন্স স্পষ্টভাবে টাইপ করা যায়।',
          '`if (x !== null)` বা `?.` দিয়ে নাল-ন্যারোয়িং করলে রানটাইম TypeError শূন্যে নামে।',
          '`Readonly<T>` শুধু টপ-লেভেল প্রপার্টি লক করে—গভীর কপির জন্য `structuredClone` ব্যবহার করো।',
        ],
      },
    },
    codeExamples: [
      {
        id: 'ts-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Mutable Tuple Reference Swap (`[number, number]`)',
        banglaNote: 'টিউপল রেফারেন্স `[number, number]` পাস করে ইন-প্লেস সোয়াপ।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const box = raw.trim().split(/\\s+/).map(Number) as [number, number];

function swapPair(ref: [number, number]): void {
  [ref[0], ref[1]] = [ref[1], ref[0]];
}
swapPair(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
        stdin: '10 20',
        expectedOutput: '20 10',
      },
      {
        id: 'ts-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Strict Union Narrowing (`number | string | null`)',
        banglaNote: '`typeof` ও `null` ন্যারোয়িং করে প্রতিটি টাইপ শাখা নিরাপদে হ্যান্ডেল করা।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const token: string = raw.trim();

function formatInput(v: number | string | null): string {
  if (v === null) return 'EMPTY';
  if (typeof v === 'number') return \`NUM:\${v * 2}\`;
  return \`STR:\${v.toUpperCase()}\`;
}
const parsed = token === 'NULL' ? null : (/^-?\\d+$/.test(token) ? Number(token) : token);
console.log(formatInput(parsed));`,
        stdin: '21',
        expectedOutput: 'NUM:42',
      },
      {
        id: 'ts-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Readonly State Snapshot & Pure Clone Update',
        banglaNote: '`Readonly` কনট্রাক্টে মূল স্টেট না ছুঁয়ে ক্লোনের মাধ্যমে নতুন স্টেট তৈরি।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const bonus: number = Number(raw.trim() || 0);

interface Profile { readonly name: string; readonly xp: number; }
function addXp(p: Profile, delta: number): Profile {
  return { ...p, xp: p.xp + delta };
}
const p1: Profile = { name: 'Rafi', xp: 100 };
const p2 = addXp(p1, bonus);
console.log(\`\${p1.xp} -> \${p2.xp}\`);`,
        stdin: '50',
        expectedOutput: '100 -> 150',
      },
      {
        id: 'ts-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: `in` Operator Discriminated Union Narrowing',
        banglaNote: '`in` অপারেটর দিয়ে দুটি অবজেক্ট শেপের মধ্যে টাইপ-সেফ পার্থক্য নির্ণয়।',
        code: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const kind: string = raw.trim();

interface OkRes { ok: true; value: number; }
interface ErrRes { ok: false; message: string; }

const res: OkRes | ErrRes = kind === 'ok' ? { ok: true, value: 200 } : { ok: false, message: 'DENIED' };
console.log('value' in res ? \`VAL=\${res.value}\` : \`ERR=\${res.message}\`);`,
        stdin: 'err',
        expectedOutput: 'ERR=DENIED',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: 'function swapPair(ref: [number, number]): void {',
        whatItMeans: 'Requires an exact 2-number tuple reference.',
        whyItIsThere: 'Prevents passing empty arrays or wrong-typed elements at compile time.',
        ifDeletedError: 'Compile error: `Cannot find name "swapPair"`.',
      },
      {
        lineNumber: 'Line 6',
        codeSnippet: '[ref[0], ref[1]] = [ref[1], ref[0]];',
        whatItMeans: 'Mutates the 2 tuple slots directly in Heap memory.',
        whyItIsThere: 'Updates the caller’s `box` without allocating a new array.',
        ifDeletedError: 'Output stays `10 20`.',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'swapPair(box);',
        whatItMeans: 'Passes typed tuple reference `box`.',
        whyItIsThere: 'Performs the swap before logging.',
        ifDeletedError: 'Prints unswapped `10 20`.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'box = [10, 20]', memoryOrStack: 'Tuple ref @0xA1', note: 'Calls swapPair(box)' },
      { step: 2, state: 'ref aliases @0xA1', memoryOrStack: 'Zero copy', note: 'Destructures [20, 10]' },
      { step: 3, state: 'ref[0]=20, ref[1]=10', memoryOrStack: '@0xA1 mutated', note: 'Type contract upheld' },
      { step: 4, state: 'console.log("20 10")', memoryOrStack: 'stdout: 20 10', note: 'Clean exit' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Using `as any` to Silence a Null/Reference Warning',
        brokenCode: `const len = (maybeStr as any).length; // Runtime crash on null!`,
        fixedCode: `const len = maybeStr !== null ? maybeStr.length : 0;`,
        whyItBreaks: '`any` turns off TypeScript completely and lets `TypeError` slip into production.',
      },
      {
        title: 'Trap 2: Shallow `Readonly<T>` Expecting Deep Immutability',
        brokenCode: `const u: Readonly<{ meta: { xp: number } }> = { meta: { xp: 1 } }; u.meta.xp = 99;`,
        fixedCode: `Mark nested fields readonly too, or use structuredClone() before updating.`,
        whyItBreaks: '`Readonly<T>` only freezes top-level properties, not nested object references.',
      },
      {
        title: 'Trap 3: Checking `if (val)` When `val` Can Be `0` or `""`',
        brokenCode: `if (val) return val; // Rejects valid 0!`,
        fixedCode: `if (val !== null && val !== undefined) return val;`,
        whyItBreaks: '`0` and `""` are falsy in JS/TS!',
      },
    ],
    practiceSheet: [
      {
        id: 'ts-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Typed Tuple Order2',
        prompt: 'Read a and b; order `pair: [number, number]` ascending via reference.',
        banglaHint: '`if (p[0] > p[1]) [p[0], p[1]] = [p[1], p[0]];` লিখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst p = raw.trim().split(/\\s+/).map(Number) as [number, number];\nfunction sort2(ref: [number, number]): void { if (ref[0] > ref[1]) [ref[0], ref[1]] = [ref[1], ref[0]]; }\nsort2(p);\nconsole.log(\`\${p[0]} \${p[1]}\`);`,
        sampleStdin: '99 -5',
        expectedOutput: '-5 99',
      },
      {
        id: 'ts-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Strict Null Narrowing Length',
        prompt: 'Read token; treat `"NULL"` as `null` and print safe string length.',
        banglaHint: '`if (s === null) return 0;` দিয়ে ন্যারোয়িং করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t: string = raw.trim();\nconst val: string | null = t === 'NULL' ? null : t;\nconsole.log(val === null ? 0 : val.length);`,
        sampleStdin: 'NULL',
        expectedOutput: '0',
      },
      {
        id: 'ts-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Readonly Copy Update',
        prompt: 'Read delta; clone `{ score: 40 }` cleanly and print `orig.score next.score`.',
        banglaHint: '`{ ...orig, score: orig.score + delta }` ব্যবহার করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst d: number = Number(raw.trim());\ninterface Box { readonly score: number; }\nconst orig: Box = { score: 40 };\nconst next: Box = { ...orig, score: orig.score + d };\nconsole.log(\`\${orig.score} \${next.score}\`);`,
        sampleStdin: '15',
        expectedOutput: '40 55',
      },
      {
        id: 'ts-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Union `typeof` Narrowing Doubler',
        prompt: 'Read token; if integer double it, else repeat string twice.',
        banglaHint: '`typeof x === "number"` চেক করো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst t = raw.trim();\nconst inp: number | string = /^-?\\d+$/.test(t) ? Number(t) : t;\nconsole.log(typeof inp === 'number' ? inp * 2 : inp + inp);`,
        sampleStdin: 'hi',
        expectedOutput: 'hihi',
      },
      {
        id: 'ts-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Deep Clone Nested Object Safely',
        prompt: 'Read val; clone `{ a: { x: 10 } }` via `structuredClone`, update `clone.a.x = val`, print `orig.a.x clone.a.x`.',
        banglaHint: '`structuredClone(orig)` দিয়ে মূল অবজেক্ট আলাদা রাখো।',
        starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;\nconst raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');\nconst val: number = Number(raw.trim());\nconst orig = { a: { x: 10 } };\nconst clone = structuredClone(orig);\nclone.a.x = val;\nconsole.log(\`\${orig.a.x} \${clone.a.x}\`);`,
        sampleStdin: '77',
        expectedOutput: '10 77',
      },
    ],
    miniBuild: {
      title: 'TS 5.x Mini Build: Typed Tuple Reference Swap',
      description: 'Enforces a strict `[number, number]` tuple contract for O(1) in-place mutation.',
      banglaGoal: 'TypeScript টিউপল রেফারেন্স `[number, number]` ব্যবহার করে টাইপ-সেফ সোয়াপ।',
      combinesChapters: 'Ch 1–7',
      starterCode: `const fs = typeof require !== 'undefined' ? require('fs') : null;
const raw: string = typeof readAllStdin === 'function' ? readAllStdin() : fs.readFileSync(0, 'utf8');
const box = raw.trim().split(/\\s+/).map(Number) as [number, number];
function swapPair(ref: [number, number]): void {
  [ref[0], ref[1]] = [ref[1], ref[0]];
}
swapPair(box);
console.log(\`\${box[0]} \${box[1]}\`);`,
      sampleStdin: '10 20',
      expectedOutput: '20 10',
    },
  },

  html: {
    title: 'HTML5 Chapter 7: DOM Tree Hierarchy, Semantic Nodes & Live Mutation',
    banglaTitle: 'HTML5 অধ্যায় ৭: DOM ট্রি হায়ারার্কি, সিমান্টিক নোড ও লাইভ আপডেট',
    subtitle: 'Understand how the browser parses HTML into a live Parent-Child DOM Tree, data-* attributes, and safe DOM node references.',
    zeroIntuition: {
      plainEnglishStory:
        'When a browser loads HTML, it builds a live upside-down family tree in RAM called the **DOM (Document Object Model)**: `document` -> `<html>` -> `<body>` -> `<main>` -> child nodes! Holding a JS variable `const el = document.getElementById("view")` points directly to that DOM tree node—updating `el.textContent` updates the page instantly without reloading!',
      asciiFlowchart: `  BROWSER DOM TREE IN RAM
  document
   └── <html>
        └── <body>
             ├── <button id="btn">Swap Text Nodes</button>
             └── <p id="view" data-state="ready">20 10</p>`,
      pseudocode: [
        '1. STRUCTURE pages as a clean Parent -> Child semantic hierarchy (`<main>`, `<section>`)',
        '2. STORE custom metadata in `data-*` attributes (`dataset.state`)',
        '3. QUERY exact nodes via `getElementById` or `querySelector`',
        '4. UPDATE visible text using safe `.textContent` (never raw `.innerHTML` for user strings)',
        '5. LISTEN to user events cleanly via `.addEventListener("click", ...)`',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বংশলতিকা গাছ (DOM Tree) এবং রিমোট কন্ট্রোল (`getElementById`)',
        explanation:
          'তোমার HTML ফাইল ব্রাউজারে খুললেই একটি গাছ (Tree) তৈরি হয়—একদম গোড়ায় `<html>`, তার দুই শাখা `<head>` ও `<body>`, আর ভেতরে `<section>`, `<p>`, `<button>` হলো পাতা ও ছোট ডাল! JavaScript দিয়ে `document.getElementById("view")` লিখলে ওই পাতার ঠিকানা হাতে আসে—তারপর `.textContent` বদলালেই ব্রাউজারে সাথে সাথে লেখা বদলে যায়!',
        everydayExample:
          'একটি পারিবারিক গাছের (Family Tree) মতো: প্রতিটি এলিমেন্টের একটি Parent ও একাধিক Children নোড থাকে।',
        keyTakeaways: [
          '`id` একটি পেজে ইউনিক হতে হয়; অনেকগুলো একই রকম আইটেমের জন্য `class` বা `data-*` ব্যবহার করো।',
          'টেক্সট আপডেটে `.innerHTML`-এর বদলে `.textContent` ব্যবহার করলে কোড নিরাপদ ও দ্রুত থাকে।',
          'HTML-এ `data-user-id="42"` লিখলে JS-এ `el.dataset.userId` হিসেবে পাওয়া যায়!',
        ],
      },
    },
    codeExamples: [
      {
        id: 'html-7-ex-basic',
        tier: 'Basic',
        title: '1. Basic: Live DOM Node Reference & Click Swap',
        banglaNote: '`getElementById` দিয়ে DOM নোড রেফারেন্স ধরে ক্লিকে লেখা অদলবদল করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Live DOM Node Reference</h3>
  <button id="btn" style="padding:8px 14px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Swap Text Nodes</button>
  <p id="view" style="margin-top:12px;font-family:monospace">20 10</p>
  <script>
    let a = 10, b = 20;
    const view = document.getElementById('view');
    document.getElementById('btn').addEventListener('click', () => {
      [a, b] = [b, a];
      view.textContent = \`\${a} \${b}\`;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Live DOM Node Reference',
      },
      {
        id: 'html-7-ex-edge',
        tier: 'Edge-Case',
        title: '2. Edge-Case: Safe Null-Checked querySelector & textContent XSS Guard',
        banglaNote: 'DOM এলিমেন্ট না থাকলে ক্র্যাশ এড়াতে null চেক ও নিরাপদ `textContent` ব্যবহার।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Null-Safe DOM Text Binding</h3>
  <div id="badge" style="padding:10px;border:1px solid #34d399;border-radius:8px;font-family:monospace"></div>
  <script>
    const el = document.querySelector('#badge');
    const untrusted = '<script>alert(1)<\\/script> Safe Text';
    if (el) el.textContent = untrusted; // Renders literally, never executes!
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Null-Safe DOM Text Binding',
      },
      {
        id: 'html-7-ex-opt',
        tier: 'Optimized',
        title: '3. Optimized: Event Delegation on Parent Node (`data-*` Attributes)',
        banglaNote: '১০০টি বাটনে আলাদা লিসেনার না লাগিয়ে প্যারেন্ট নোডে ১টি Event Delegation ব্যবহার।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Parent Delegation + data-*</h3>
  <div id="toolbar" style="display:flex;gap:8px">
    <button data-role="Admin" style="padding:6px 12px;background:#1e293b;color:#38bdf8;border:1px solid #334155;border-radius:6px;cursor:pointer">Admin</button>
    <button data-role="Member" style="padding:6px 12px;background:#1e293b;color:#34d399;border:1px solid #334155;border-radius:6px;cursor:pointer">Member</button>
  </div>
  <p id="status" style="margin-top:10px;font-family:monospace;color:#cbd5e1">Role: Admin</p>
  <script>
    document.getElementById('toolbar').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-role]');
      if (btn) document.getElementById('status').textContent = 'Role: ' + btn.dataset.role;
    });
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'Parent Delegation + data-*',
      },
      {
        id: 'html-7-ex-cp',
        tier: 'CP Trick',
        title: '4. CP Trick: Walking Parent/Children DOM Tree Nodes',
        banglaNote: '`.children` ও `.parentElement` রেফারেন্স দিয়ে DOM ট্রি ট্রাভার্স করা।',
        code: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>DOM Tree Traversal</h3>
  <ul id="tree"><li>Root</li><li>Leaf A</li><li>Leaf B</li></ul>
  <p id="summary" style="color:#38bdf8;font-family:monospace"></p>
  <script>
    const ul = document.getElementById('tree');
    document.getElementById('summary').textContent = \`Parent=\${ul.parentElement.tagName} Children=\${ul.children.length}\`;
  </script>
</body></html>`,
        stdin: '',
        expectedOutput: 'DOM Tree Traversal',
      },
    ],
    lineByLineAnatomy: [
      {
        lineNumber: 'Line 5',
        codeSnippet: '<p id="view">20 10</p>',
        whatItMeans: 'Creates an addressable paragraph node inside `<body>`.',
        whyItIsThere: 'Provides a unique `id` target for DOM lookup.',
        ifDeletedError: '`getElementById("view")` returns `null` -> TypeError on `.textContent`!',
      },
      {
        lineNumber: 'Line 8',
        codeSnippet: 'const view = document.getElementById("view");',
        whatItMeans: 'Stores a live reference to the `<p>` DOM node.',
        whyItIsThere: 'Avoids re-querying the DOM tree on every click.',
        ifDeletedError: '`view` is undefined inside the click handler.',
      },
      {
        lineNumber: 'Line 11',
        codeSnippet: 'view.textContent = `${a} ${b}`;',
        whatItMeans: 'Mutates the node’s text safely without HTML parsing.',
        whyItIsThere: 'Immediately updates the browser viewport and prevents XSS.',
        ifDeletedError: 'Clicking button leaves text frozen.',
      },
    ],
    dryRunTable: [
      { step: 1, state: 'HTML parsed into DOM tree', memoryOrStack: 'body -> [btn, view]', note: 'Initial a=10, b=20' },
      { step: 2, state: 'JS grabs ref to #view', memoryOrStack: 'view points to <p>', note: 'Registers click listener' },
      { step: 3, state: 'User clicks Swap button', memoryOrStack: '[a, b] = [20, 10]', note: 'view.textContent = "20 10"' },
      { step: 4, state: 'Browser repaints <p>', memoryOrStack: 'UI displays "20 10"', note: 'Live reference verified' },
    ],
    harryBugTraps: [
      {
        title: 'Trap 1: Running `<script>` in `<head>` Before DOM Exists',
        brokenCode: `<head><script>document.getElementById('view').textContent='Hi'</script></head>`,
        fixedCode: `Place <script> before </body> OR use <script defer> / DOMContentLoaded.`,
        whyItBreaks: '`<p id="view">` has not been parsed yet, so `getElementById` returns `null`!',
      },
      {
        title: 'Trap 2: Duplicate `id` Attributes on Multiple Elements',
        brokenCode: `<div id="card">A</div><div id="card">B</div>`,
        fixedCode: `<div class="card" data-id="1">A</div><div class="card" data-id="2">B</div>`,
        whyItBreaks: '`getElementById` returns only the first match and breaks accessibility labels.',
      },
      {
        title: 'Trap 3: Writing User Input via `.innerHTML`',
        brokenCode: `box.innerHTML = comment; // Vulnerable to XSS scripts!`,
        fixedCode: `box.textContent = comment; // 100% text-safe`,
        whyItBreaks: 'Browser executes malicious HTML/JS payloads inside `innerHTML`.',
      },
    ],
    practiceSheet: [
      {
        id: 'html-ch-7-q1',
        difficulty: 'Easy',
        title: '1. Live Counter DOM Reference',
        prompt: 'Render a button that increments a `<span id="cnt">0</span>` node using `.textContent`.',
        banglaHint: '`getElementById("cnt")` ধরে `.textContent` বাড়াও।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><button id="inc">+1</button> <span id="cnt">0</span><script>let n=0;const c=document.getElementById('cnt');document.getElementById('inc').onclick=()=>{c.textContent=++n;};</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'cnt',
      },
      {
        id: 'html-ch-7-q2',
        difficulty: 'Easy',
        title: '2. Read `data-*` Attribute via dataset',
        prompt: 'Read `data-lang="Rust"` from `#tag` and display it in `#out`.',
        banglaHint: '`el.dataset.lang` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><span id="tag" data-lang="Rust">Item</span><p id="out"></p><script>document.getElementById('out').textContent=document.getElementById('tag').dataset.lang;</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'data-lang',
      },
      {
        id: 'html-ch-7-q3',
        difficulty: 'Medium',
        title: '3. Null-Safe querySelector Update',
        prompt: 'Query `#missing` and `#ok` safely with `if (el)` before writing text.',
        banglaHint: '`if (el) el.textContent = ...` চেক করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><p id="ok"></p><script>const m=document.querySelector('#missing');if(m)m.textContent='x';const o=document.querySelector('#ok');if(o)o.textContent='Safe';</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'ok',
      },
      {
        id: 'html-ch-7-q4',
        difficulty: 'Medium',
        title: '4. Event Delegation List Highlighter',
        prompt: 'Attach ONE click listener to `<ul id="ul">` that highlights clicked `<li>` items via `e.target.closest("li")`.',
        banglaHint: '`e.target.closest("li")` ব্যবহার করো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><ul id="ul"><li>One</li><li>Two</li></ul><script>document.getElementById('ul').addEventListener('click',e=>{const li=e.target.closest('li');if(li)li.style.color='#38bdf8';});</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'One',
      },
      {
        id: 'html-ch-7-q5',
        difficulty: 'Hard',
        title: '5. Live DOM Tree Node Counter',
        prompt: 'Count `document.body.children.length` and display it in `#count`.',
        banglaHint: '`document.body.children.length` পড়ো।',
        starterCode: `<!doctype html><html><body style="background:#090d16;color:#f8fafc;padding:20px"><div>A</div><div>B</div><p id="count"></p><script>document.getElementById('count').textContent='Nodes: '+document.body.children.length;</script></body></html>`,
        sampleStdin: '',
        expectedOutput: 'count',
      },
    ],
    miniBuild: {
      title: 'HTML5 Mini Build: Live DOM Node Reference Swapper',
      description: 'Mutates live DOM node references interactively in response to user click events.',
      banglaGoal: 'ব্রাউজার DOM নোডের রেফারেন্স ধরে ক্লিকে লাইভ UI আপডেট করা।',
      combinesChapters: 'Ch 1–7',
      starterCode: `<!doctype html>
<html><body style="font-family:system-ui;background:#090d16;color:#f8fafc;padding:24px;">
  <h3>Live DOM Node Reference</h3>
  <button id="btn" style="padding:8px 14px;background:#38bdf8;color:#090d16;border:none;border-radius:6px;font-weight:700;cursor:pointer">Swap Text Nodes</button>
  <p id="view" style="margin-top:12px;font-family:monospace">20 10</p>
  <script>
    let a = 10, b = 20;
    const view = document.getElementById('view');
    document.getElementById('btn').addEventListener('click', () => {
      [a, b] = [b, a];
      view.textContent = \`\${a} \${b}\`;
    });
  </script>
</body></html>`,
      sampleStdin: '',
      expectedOutput: 'Live DOM Node Reference',
    },
  },
};
