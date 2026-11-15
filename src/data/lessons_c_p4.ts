import type { AtomicLessonOverride } from './atomicLessonTypes';

export const LESSONS_C_P4: Record<number, AtomicLessonOverride> = {
  16: {
    chapterNumber: 16,
    title: 'C Chapter 16 (C23): Raw Pointers, Addresses & Pointer Arithmetic',
    banglaTitle: 'C অধ্যায় ১৬ (C23): র-পয়েন্টার, মেমোরি ঠিকানা ও পয়েন্টার অ্যারিথমেটিক',
    subtitle: 'Virtual memory addresses (& and *), scaled pointer arithmetic (p + 1), nullptr safety in C23, and zero-copy array walks.',
    zeroIntuition: {
      plainEnglishStory:
        'A pointer is not magic—it is simply an integer-sized variable (8 bytes on 64-bit CPUs) whose stored value is the RAM address of another variable. While `&x` asks "where does `x` live in RAM?", dereferencing `*p` says "follow address `p` and read/write the box stored there".\n\nWhat makes C pointer arithmetic unique is automatic type scaling: if `int *p` holds address `0x1000`, computing `p + 1` jumps by `1 * sizeof(int) = 4` bytes to `0x1004`, NOT `0x1001`! Paired with C23’s typed `nullptr` keyword, explicit bounds checks, and `const` pointer contracts, raw pointers unlock zero-copy C systems performance safely.',
      asciiFlowchart: `  Stack Memory Layout (64-bit RAM)
  +------------------+          +-------------------+
  | int x = 42       | <------- | int *p = &x       |
  | addr: 0x7ff0     |          | val:  0x7ff0      |
  +------------------+          +-------------------+
  *p = 99  ==> modifies x in-place at 0x7ff0!`,
      pseudocode: [
        '1. INITIALIZE every pointer to a valid address or nullptr (never uninitialized)',
        '2. CHECK pointer != nullptr BEFORE dereferencing *p',
        '3. USE &var to obtain address and *ptr to read/mutate target',
        '4. WALK contiguous arrays cleanly with bounded pointer arithmetic [begin, end)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'বাড়ির ঠিকানার কার্ড ও তলা গুনে ওঠা (Pointer & Scaled Arithmetic)',
        explanation:
          'কল্পনা করো একটি বিশাল ফাইল ক্যাবিনেট যেখানে প্রতিটি ড্রয়ারের গায়ে হেক্সাডেসিমাল নম্বর লেখা (`0x1000`, `0x1004`, ...)। একটি সাধারণ ভ্যারিয়েবল `int x = 42` হলো ড্রয়ারের ভেতরে রাখা কাগজ, আর পয়েন্টার `int *p = &x` হলো সেই ড্রয়ারের ঠিকানা লেখা একটি ছোট কার্ড! সি ভাষায় দুটি চিহ্ন সবচেয়ে গুরুত্বপূর্ণ: `&` (Address-of) মানে "তোমার ঠিকানা দাও", আর `*` (Dereference) মানে "এই ঠিকানার ড্রয়ারে ঢুকে মান দেখো বা বদলাও"। তাই `*p = 99` লিখলে ফাংশন বা মূল জায়গার `x` সরাসরি ৯৯ হয়ে যায়। পয়েন্টার অ্যারিথমেটিকের আসল সৌন্দর্য হলো: `int *p`-এর সাথে `p + 1` যোগ করলে ঠিকানা ১ বাইট না বেড়ে `sizeof(int)` অর্থাৎ ৪ বাইট এগিয়ে ঠিক পরের ইন্টিজারের ঘরে চলে যায়! আধুনিক C23-এ ফাঁকা বা অবৈধ পয়েন্টার বোঝাতে `NULL`-এর বদলে টাইপ-সেফ `nullptr` ব্যবহার করা হয়। পয়েন্টার ব্যবহার করার আগে `if (p != nullptr)` চেক না করে `*p` পড়লে প্রোগ্রাম সাথে সাথে Segmentation Fault দিয়ে ক্র্যাশ করবে। এছাড়াও যেসব ডেটা শুধু পড়তে হবে (বদলানো যাবে না), সেখানে `const int *p` লিখলে কম্পাইলার ভুলবশত ডেটা পাল্টে ফেলা আটকে দেয়। মনে রাখবে `int *p;` এভাবে ঠিকানা না দিয়েই রেখে দিলে একে Wild Pointer বলে, যা র‍্যান্ডম মেমোরি নষ্ট করে। তাই সবসময় ঘোষণার সাথে সাথেই পয়েন্টারে বৈধ ঠিকানা অথবা `nullptr` বসাবে।',
        everydayExample:
          'বন্ধুর বাড়িতে ভারী আলমারি বয়ে না এনে শুধু তার বাসার ঠিকানা (`&x`) হাতে ধরিয়ে দেওয়া—যাতে ঠিকানা ধরেই ভেতরের জিনিস আপডেট করা যায়!',
        keyTakeaways: [
          '`&x` ভ্যারিয়েবলের RAM ঠিকানা দেয়; `*p` সেই ঠিকানার ভেতরের মান পড়ে বা বদলায়।',
          'পয়েন্টার `p + 1` মানে ১ বাইট নয়, বরং `sizeof(*p)` বাইট সামনে যাওয়া (যেমন `int` হলে +৪ বাইট)।',
          'প্রতিটি পয়েন্টার ব্যবহারের শুরুতেই `nullptr` দিয়ে ইনিশিয়ালাইজ করো এবং ডিরেফারেন্সের আগে যাচাই করো।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-16-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Obtaining Addresses (&) and Mutating Through Dereference (*)',
        englishParagraphs: [
          'Declaring `int *p = &x;` binds pointer `p` to the exact stack address of `x`. Writing `*p = 99;` updates `x` in place without touching its name directly.',
          'Always place `*` tightly with the pointer variable (`int *p`) so readers see `p` is the pointer.',
        ],
        banglaParagraphs: [
          'এখানে `p = &x` দিয়ে `x`-এর মেমোরি ঠিকানা `p`-এর ভেতর রাখা হয়েছে এবং `*p = 99` দিয়ে ঠিকানার মাধ্যমে মান পরিবর্তন করা হয়েছে।',
          'এরপর `x` প্রিন্ট করলেই দেখা যাবে `x`-এর মান ৪২ থেকে বদলে ৯৯ হয়ে গেছে!',
        ],
        memoryDiagram: `x=42 (@0xA0) <- p=0xA0 -> *p=99 mutates 0xA0 -> x is now 99`,
        code: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;
    *p = 99;
    printf("x=%d\\n", x);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'x=99',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'int x = 42;', whatItMeans: 'Allocates 4-byte integer x on stack holding 42.', whyItIsThere: 'Target memory slot to point at.', ifDeletedError: 'Compile error: x undeclared.' },
          { lineNumber: 'Line 5', codeSnippet: 'int *p = &x;', whatItMeans: 'Stores RAM address of x inside pointer p.', whyItIsThere: 'Establishes indirection link to x.', ifDeletedError: 'Compile error: p undeclared.' },
          { lineNumber: 'Line 6', codeSnippet: '*p = 99;', whatItMeans: 'Dereferences p and writes 99 directly into x’s address.', whyItIsThere: 'Mutates caller/target state indirectly.', ifDeletedError: 'Output stays x=42 instead of x=99.' },
        ],
      },
      {
        id: 'c-ch-16-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Zero-Copy Pointer Walk Using Half-Open [begin, end) Bounds',
        englishParagraphs: [
          'Notice how `long long *end = a + n;` computes the one-past-the-end sentinel pointer safely (standard C guarantees forming `a + n` is legal as long as you never dereference `*end`).',
          'Walking `for (const long long *p = a; p < end; p++)` sums the entire array cleanly using scaled pointer increments.',
        ],
        banglaParagraphs: [
          'অ্যারে ইন্ডেক্স `a[i]`-এর বদলে শুরু ও শেষ পয়েন্টার `p = a` থেকে `p < a + n` পর্যন্ত চালিয়ে অ্যারে সাম বের করা হয়েছে।',
          '`p++` প্রতি ধাপে `sizeof(long long)` অর্থাৎ ৮ বাইট এগিয়ে ঠিক পরের সংখ্যায় যায়।',
        ],
        memoryDiagram: `p=&a[0] -> p++ (+8B) -> p=&a[1] -> ... -> stops before p == a + n`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    long long a[1000];
    if (scanf("%d", &n) == 1 && n > 0 && n <= 1000) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        long long sum = 0;
        for (const long long *p = a; p < a + n; p++) sum += *p;
        printf("sum=%lld\\n", sum);
    }
    return 0;
}`,
        stdin: '4\n10 20 30 40',
        expectedOutput: 'sum=100',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'for (const long long *p = a; p < a + n; p++) sum += *p;', whatItMeans: 'Steps read-only pointer p across elements 0..n-1.', whyItIsThere: 'Demonstrates safe bounded pointer arithmetic.', ifDeletedError: 'Sum stays 0.' },
        ],
      },
      {
        id: 'c-ch-16-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Returning Multiple Results From One Function via Pointers',
        englishParagraphs: [
          'C functions return only a single scalar value directly. When a utility must return both `min` and `max` of an array in one scan, pass `&min_val` and `&max_val` as pointer out-parameters.',
          'Checking `if (!out_min || !out_max)` guards against `nullptr` callers cleanly.',
        ],
        banglaParagraphs: [
          'C ফাংশন থেকে সরাসরি একটি মাত্র মান `return` করা যায়, কিন্তু একসাথে `min` ও `max` দুটি ফল ফেরত পেতে চাইলে আউট-পয়েন্টার (`long long *mn, long long *mx`) পাস করা হয়।',
          'কাজের আগে `nullptr` চেক করে নিলে ফাংশন কখনো ক্র্যাশ করে না।',
        ],
        memoryDiagram: `minmax(a, n, &lo, &hi) writes both results straight into main() frame`,
        code: `#include <stdio.h>

void minmax(const long long *a, int n, long long *out_mn, long long *out_mx) {
    if (!a || n <= 0 || !out_mn || !out_mx) return;
    long long mn = a[0], mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < mn) mn = a[i];
        if (a[i] > mx) mx = a[i];
    }
    *out_mn = mn;
    *out_mx = mx;
}

int main(void) {
    int n = 0;
    long long a[1000], lo = 0, hi = 0;
    if (scanf("%d", &n) == 1 && n > 0 && n <= 1000) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        minmax(a, n, &lo, &hi);
        printf("min=%lld max=%lld\\n", lo, hi);
    }
    return 0;
}`,
        stdin: '5\n8 3 14 2 9',
        expectedOutput: 'min=2 max=14',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: '*out_mn = mn; *out_mx = mx;', whatItMeans: 'Writes computed bounds back into caller’s stack addresses.', whyItIsThere: 'Allows returning two results cleanly in one O(n) pass.', ifDeletedError: 'lo and hi remain 0 in main().' },
        ],
      },
      {
        id: 'c-ch-16-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'In-Place Pointer Reversal & Dereferencing nullptr Trap',
        englishParagraphs: [
          'Two-pointer array reversal with raw pointers `long long *l = a, *r = a + n - 1` swaps elements cleanly while `l < r`.',
          'Never dereference an unchecked or `nullptr` pointer—C23 gives `nullptr` distinct pointer type so accidental arithmetic on it fails compilation immediately.',
        ],
        banglaParagraphs: [
          'অ্যারে উল্টানোর জন্য ইনডেক্স ছাড়াও সরাসরি দুই প্রান্তের পয়েন্টার `l = a` এবং `r = a + n - 1` দিয়ে `while (l < r)` লুপ চালানো যায়।',
          'তবে পয়েন্টার ফাঁকা (`nullptr`) থাকলে ভুলেও `*p` দিয়ে পড়বে না, তাতে প্রোগ্রাম ক্র্যাশ করবে!',
        ],
        memoryDiagram: `l=&a[0], r=&a[n-1] -> swap(*l, *r); l++; r--; until l >= r`,
        code: `#include <stdio.h>

int main(void) {
    int n = 0;
    long long a[1000];
    if (scanf("%d", &n) == 1 && n > 0 && n <= 1000) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        long long *l = a, *r = a + n - 1;
        while (l < r) {
            long long tmp = *l;
            *l++ = *r;
            *r-- = tmp;
        }
        for (int i = 0; i < n; i++) printf("%lld%s", a[i], i + 1 == n ? "\\n" : " ");
    }
    return 0;
}`,
        stdin: '4\n5 10 15 20',
        expectedOutput: '20 15 10 5',
        lineByLine: [
          { lineNumber: 'Line 8', codeSnippet: 'long long *l = a, *r = a + n - 1;', whatItMeans: 'Points l to first element and r to last valid element.', whyItIsThere: 'Sets two converging pointer cursors.', ifDeletedError: 'Compile error: l and r undeclared.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Includes standard console I/O library.', whyItIsThere: 'Provides printf signature.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'int main(void) {', whatItMeans: 'Hosted entry function.', whyItIsThere: 'OS starts instruction execution here.', ifDeletedError: 'Linker error: undefined reference to main.' },
      { lineNumber: 'Line 4', codeSnippet: 'int x = 42;', whatItMeans: 'Declares stack integer variable x = 42.', whyItIsThere: 'Provides valid memory location with lifetime across main().', ifDeletedError: 'Compile error: x undeclared.' },
      { lineNumber: 'Line 5', codeSnippet: 'int *p = &x;', whatItMeans: 'Creates pointer p initialized to address of x.', whyItIsThere: 'Avoids wild uninitialized pointer state.', ifDeletedError: 'Compile error: p undeclared.' },
      { lineNumber: 'Line 6', codeSnippet: '*p = 99;', whatItMeans: 'Dereferences address inside p and stores 99 into x.', whyItIsThere: 'Proves pointer writes directly to original target RAM.', ifDeletedError: 'Prints x=42 instead of x=99.' },
      { lineNumber: 'Line 7', codeSnippet: 'printf("x=%d\\n", x);', whatItMeans: 'Reads modified x and emits result.', whyItIsThere: 'Verifies indirect write succeeded.', ifDeletedError: 'No stdout printed.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Allocate int x = 42', memoryOrStack: 'x=42 at @0x7ff0', note: '4 bytes on stack' },
      { step: 2, state: 'Bind int *p = &x', memoryOrStack: 'p = 0x7ff0', note: '8-byte address slot' },
      { step: 3, state: 'Execute *p = 99', memoryOrStack: '@0x7ff0 updated -> 99', note: 'x now equals 99' },
      { step: 4, state: 'printf x', memoryOrStack: 'stdout="x=99"', note: 'Indirect mutation verified' },
    ],
    harryBugTraps: [
      {
        title: 'Dereferencing Uninitialized (Wild) or Null Pointer',
        brokenCode: `int *p; *p = 10; // Undefined Behavior / Segfault!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int v = 0;\n    int *p = &v;\n    if (p != nullptr) *p = 10;\n    printf("%d\\n", v);\n    return 0;\n}`,
        whyItBreaks: 'An uninitialized pointer contains random stack bits; writing to *p crashes immediately or silently corrupts memory.',
      },
      {
        title: 'Forgetting * Operator Precedence in (*p)++',
        brokenCode: `int x = 5; int *p = &x; *p++; // increments POINTER p, NOT x!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int x = 5;\n    int *p = &x;\n    (*p)++;\n    printf("%d\\n", x);\n    return 0;\n}`,
        whyItBreaks: 'Postfix ++ binds tighter than *, so *p++ advances pointer p to invalid adjacent memory instead of adding 1 to x.',
      },
      {
        title: 'Declaring Multiple Pointers With Single * (int* a, b)',
        brokenCode: `int* a, b; // a is int*, b is plain int!`,
        fixedCode: `#include <stdio.h>\nint main(void) {\n    int x = 1, y = 2;\n    int *a = &x, *b = &y;\n    printf("%d %d\\n", *a, *b);\n    return 0;\n}`,
        whyItBreaks: 'In C syntax, * attaches to each declarator individually; omitting * before b makes b an integer, not a pointer.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-16-q1',
        difficulty: 'Easy',
        title: '1. Double In-Place via Pointer',
        prompt: 'Write `void double_it(long long *p)` that doubles *p; test on input x.',
        banglaHint: 'ফাংশনের ভেতর `*p *= 2;` লিখবে এবং কলের সময় `&x` দেবে।',
        starterCode: `#include <stdio.h>\nvoid double_it(long long *p) { if (p) *p *= 2; }\nint main(void) {\n    long long x = 0;\n    if (scanf("%lld", &x) == 1) { double_it(&x); printf("%lld\\n", x); }\n    return 0;\n}`,
        sampleStdin: '21',
        expectedOutput: '42',
      },
      {
        id: 'c-ch-16-q2',
        difficulty: 'Easy',
        title: '2. String Length Using Pointer Subtraction',
        prompt: 'Compute string length without `strlen` by advancing `const char *p` until `*p == \'\\0\'` and returning `p - s`.',
        banglaHint: 'দুটি পয়েন্টার বিয়োগ করলে (`p - s`) মাঝখানের অক্ষরের সংখ্যা পাওয়া যায়!',
        starterCode: `#include <stdio.h>\nsize_t my_strlen(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') p++;\n    return (size_t)(p - s);\n}\nint main(void) {\n    char buf[256];\n    if (scanf("%255s", buf) == 1) printf("%zu\\n", my_strlen(buf));\n    return 0;\n}`,
        sampleStdin: 'ArgonC23',
        expectedOutput: '8',
      },
      {
        id: 'c-ch-16-q3',
        difficulty: 'Medium',
        title: '3. Safe Integer Division & Remainder via Out-Pointers',
        prompt: 'Write `int safe_divmod(long long a, long long b, long long *q, long long *r)` returning 0 if b==0 else 1.',
        banglaHint: '`b == 0` হলে `0` রিটার্ন করো, নইলে `*q = a / b` এবং `*r = a % b` সেট করে `1` দাও।',
        starterCode: `#include <stdio.h>\nint safe_divmod(long long a, long long b, long long *q, long long *r) {\n    if (b == 0 || !q || !r) return 0;\n    *q = a / b; *r = a % b;\n    return 1;\n}\nint main(void) {\n    long long a = 0, b = 0, q = 0, r = 0;\n    if (scanf("%lld %lld", &a, &b) == 2 && safe_divmod(a, b, &q, &r)) printf("%lld %lld\\n", q, r);\n    else printf("ERR\\n");\n    return 0;\n}`,
        sampleStdin: '23 5',
        expectedOutput: '4 3',
      },
      {
        id: 'c-ch-16-q4',
        difficulty: 'Medium',
        title: '4. Find First Occurrence Pointer Index',
        prompt: 'Write `const int* find_ptr(const int *a, int n, int key)` and print index `(int)(hit - a)` or `-1`.',
        banglaHint: '`hit` পাওয়া গেলে `hit - a` বিয়োগ করলেই ইনডেক্স পাওয়া যাবে।',
        starterCode: `#include <stdio.h>\nconst int* find_ptr(const int *a, int n, int key) {\n    for (const int *p = a; p < a + n; p++) if (*p == key) return p;\n    return nullptr;\n}\nint main(void) {\n    int n = 0, key = 0, a[1000];\n    if (scanf("%d %d", &n, &key) == 2) {\n        for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n        const int *hit = find_ptr(a, n, key);\n        printf("%d\\n", hit ? (int)(hit - a) : -1);\n    }\n    return 0;\n}`,
        sampleStdin: '5 30\n10 20 30 40 50',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-16-q5',
        difficulty: 'Hard',
        title: '5. Cyclic Rotate Three Variables via Pointers',
        prompt: 'Write `void rotate3(long long *a, long long *b, long long *c)` sending `(a,b,c) -> (c,a,b)`.',
        banglaHint: '`tmp = *c; *c = *b; *b = *a; *a = tmp;` দিয়ে বৃত্তাকার ঘূর্ণন করো।',
        starterCode: `#include <stdio.h>\nvoid rotate3(long long *a, long long *b, long long *c) {\n    long long t = *c; *c = *b; *b = *a; *a = t;\n}\nint main(void) {\n    long long a = 0, b = 0, c = 0;\n    if (scanf("%lld %lld %lld", &a, &b, &c) == 3) { rotate3(&a, &b, &c); printf("%lld %lld %lld\\n", a, b, c); }\n    return 0;\n}`,
        sampleStdin: '1 2 3',
        expectedOutput: '3 1 2',
      },
    ],
    miniBuild: {
      title: 'Pointer Min-Max & Swap Inspector',
      description: 'Computes array extrema in one pointer-bounded pass using out-parameters.',
      banglaGoal: 'র-পয়েন্টার ও আউট-প্যারামিটার ব্যবহার করে এক পাসে Min ও Max বের করা।',
      combinesChapters: 'Ch 1–16',
      starterCode: `#include <stdio.h>

void minmax(const long long *a, int n, long long *out_mn, long long *out_mx) {
    long long mn = a[0], mx = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < mn) mn = a[i];
        if (a[i] > mx) mx = a[i];
    }
    *out_mn = mn;
    *out_mx = mx;
}

int main(void) {
    int n = 0;
    long long a[1000], lo = 0, hi = 0;
    if (scanf("%d", &n) == 1 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        minmax(a, n, &lo, &hi);
        printf("%lld %lld\\n", lo, hi);
    }
    return 0;
}`,
      sampleStdin: '5\n8 3 14 2 9',
      expectedOutput: '2 14',
    },
    starterCode: `#include <stdio.h>

void swap_ll(long long *a, long long *b) {
    long long t = *a;
    *a = *b;
    *b = t;
}

int main(void) {
    long long x = 0, y = 0;
    if (scanf("%lld %lld", &x, &y) == 2) {
        swap_ll(&x, &y);
        printf("%lld %lld\\n", x, y);
    }
    return 0;
}`,
    sampleStdin: '7 99',
    expectedSampleOutput: '99 7',
    testCases: [
      { id: 'c16-t1', input: '7 99', expectedOutput: '99 7' },
      { id: 'c16-t2', input: '-5 12', expectedOutput: '12 -5', isHidden: true },
    ],
  },

  17: {
    chapterNumber: 17,
    title: 'C Chapter 17 (C23): Dynamic Memory (Heap vs Stack) & Leak Prevention',
    banglaTitle: 'C অধ্যায় ১৭ (C23): ডায়নামিক মেমোরি (Heap বনাম Stack) ও লিক প্রতিরোধ',
    subtitle: 'Stack limits vs malloc/calloc/realloc/free lifecycle, NULL allocation checks, dangling pointers, and Kadane heap demo.',
    zeroIntuition: {
      plainEnglishStory:
        'Stack memory is lightning-fast and automatically freed when a function returns, but its capacity is tiny (~1–8 MB) and its size is fixed when compiling. When your program only discovers at runtime that the user needs `n = 1,000,000` records, you reserve memory dynamically from the Heap via `malloc` or `calloc`.\n\nHeap allocations live until YOU explicitly call `free(ptr)`. Always obey the 4 golden rules of C heap safety: (1) check `if (!ptr)` after `malloc`, (2) resize safely using a temporary pointer with `realloc`, (3) never use memory after `free(ptr)` (Use-After-Free), and (4) reset `ptr = nullptr;` immediately after freeing.',
      asciiFlowchart: `  [ Stack Frame: fast LIFO, ~1-8MB ]     [ Heap Arena: huge, manual lifetime ]
    long long *arr  (8 bytes)   ========>  malloc(n * sizeof(long long))
    ... run Kadane O(n) pass ...           [ -2 | 1 | -3 | 4 | 5 ]
    free(arr); arr = nullptr;   ========>  Memory cleanly returned to OS!`,
      pseudocode: [
        '1. READ runtime size n and validate n > 0',
        '2. ALLOCATE heap buffer: arr = malloc((size_t)n * sizeof(*arr))',
        '3. CHECK if (arr == nullptr) before writing or reading',
        '4. COMPUTE algorithm and call free(arr); arr = nullptr; on EVERY exit path',
      ],
      banglaZeroToHero: {
        analogyTitle: 'হাতের খাতা (Stack) বনাম ভাড়া নেওয়া বড় গুদামঘর (Heap)',
        explanation:
          'কল্পনা করো পকেটের ছোট নোটবুক হলো Stack—খুব দ্রুত পাতা ওল্টানো যায় এবং ফাংশন শেষ হলেই নিজে থেকে পরিষ্কার হয়, কিন্তু এতে জায়গা খুব কম (সর্বোচ্চ কয়েক মেগাবাইট)। কিন্তু প্রোগ্রাম চলার সময় যদি হঠাৎ ইউজার বলে `10^6` সংখ্যার ডেটা রাখতে হবে, তখন অপারেটিং সিস্টেমের বিশাল গুদামঘর অর্থাৎ Heap থেকে জায়গা ভাড়া নিতে হয় `malloc()` বা `calloc()` দিয়ে! `malloc` দ্রুত জায়গা দেয় কিন্তু ভেতরের পুরোনো ময়লা (Garbage) সাফ করে না, অন্যদিকে `calloc(n, size)` সব ঘর ০ (Zero) দিয়ে পরিষ্কার করে দেয়। আর চলন্ত অবস্থায় অ্যারে বড় করতে হলে `realloc()` ব্যবহার হয়। তবে Heap-এর নিয়ম হলো: জায়গা নেওয়ার পর ফাংশন শেষ হলে তা নিজে থেকে ফেরত যায় না—তোমাকে নিজ হাতে `free(ptr)` বলে ফেরত দিতে হবে! যদি `free()` করতে ভুলে যাও তবে একে Memory Leak বলে এবং সার্ভার কিছুক্ষণ পর RAM পূর্ণ হয়ে ক্র্যাশ করবে। আবার `free(ptr)` করার পরও ওই পুরোনো পয়েন্টার দিয়ে ডেটা পড়তে গেলে ভয়ংকর Use-After-Free বাগ ঘটে—তাই `free(ptr)` লেখার ঠিক পরের লাইনেই `ptr = nullptr;` করে দেওয়া নিরাপদ অভ্যাস। বড় প্রোডাকশন কোডে সবসময় `malloc` ফিরতি পয়েন্টার `nullptr` কি না চেক করে নিতে হয়, কারণ RAM ফুরিয়ে গেলে `malloc` নাল রিটার্ন করে। এই ডায়নামিক মেমোরির দখল ও মুক্ত করার শৃঙ্খলাই C সিস্টেম প্রোগ্রামিংয়ের মূল মেরুদণ্ড।',
        everydayExample:
          'হোটেলের রুম বুক করা হলো `malloc`, চেক-আউট করে চাবি ফেরত দেওয়া হলো `free()`, আর চাবি ফেরত দেওয়ার পর সেই চাবির নম্বর ভুলে যাওয়া হলো `ptr = nullptr`!',
        keyTakeaways: [
          '`malloc` এর ভেতর গার্বেজ থাকে; শুরুতেই সব ০ চাইলে `calloc(n, sizeof(T))` নাও।',
          '`realloc` ব্যবহারের সময় কখনো সরাসরি মূল পয়েন্টারে বসাবে না; টেম্প `tmp = realloc(p, ...)` আগে চেক করো।',
          'প্রতিটি `malloc`/`calloc`-এর জন্য ঠিক একটি `free(p); p = nullptr;` নিশ্চিত করো।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-17-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Allocating, Checking & Freeing a Dynamic Heap Array',
        englishParagraphs: [
          'Using `sizeof(*arr)` inside `malloc(5 * sizeof(*arr))` avoids type-mismatch bugs if you ever change `arr` from `int *` to `long long *`.',
          'Checking `if (!arr) return 1;` protects against out-of-memory failures cleanly.',
        ],
        banglaParagraphs: [
          'এই প্রোগ্রামে `calloc` দিয়ে হিপে ৫টি `long long` ঘর নেওয়া হয়েছে—যা স্বয়ংক্রিয়ভাবে সব ঘরে ০ বসিয়ে দেয়।',
          'ব্যবহার শেষে `free(arr); arr = nullptr;` লিখে মেমোরি অপারেটিং সিস্টেমকে ফিরিয়ে দেওয়া হয়েছে।',
        ],
        memoryDiagram: `Stack: arr -> Heap[5 * 8B = 40B zeroed] -> [10,20,30,40,50] -> free(arr)`,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t n = 5;
    long long *arr = (long long *)calloc(n, sizeof(*arr));
    if (!arr) return 1;
    for (size_t i = 0; i < n; i++) arr[i] = (long long)(i + 1) * 10;
    printf("last=%lld\\n", arr[n - 1]);
    free(arr);
    arr = nullptr;
    return 0;
}`,
        stdin: '',
        expectedOutput: 'last=50',
        lineByLine: [
          { lineNumber: 'Line 6', codeSnippet: 'long long *arr = (long long *)calloc(n, sizeof(*arr));', whatItMeans: 'Reserves n zero-initialized elements on the heap.', whyItIsThere: 'Prevents uninitialized garbage and scales dynamically at runtime.', ifDeletedError: 'Compile error: arr undeclared.' },
          { lineNumber: 'Line 7', codeSnippet: 'if (!arr) return 1;', whatItMeans: 'Handles allocation failure cleanly instead of crashing.', whyItIsThere: 'malloc/calloc return nullptr if OS runs out of RAM.', ifDeletedError: 'Dereferencing null arr segfaults under OOM.' },
          { lineNumber: 'Line 10', codeSnippet: 'free(arr);', whatItMeans: 'Returns heap allocation back to allocator.', whyItIsThere: 'Prevents memory leaks.', ifDeletedError: 'Heap memory stays leaked until process terminates.' },
        ],
      },
      {
        id: 'c-ch-17-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Heap Buffer + Kadane’s Maximum Subarray Sum',
        englishParagraphs: [
          'When `n` can grow arbitrarily large, `malloc((size_t)n * sizeof(long long))` allocates the exact capacity needed on the heap.',
          'Kadane’s O(n) pass computes maximum subarray sum in one sweep before `free(arr)` releases memory cleanly.',
        ],
        banglaParagraphs: [
          'ইনপুট থেকে `n` পড়ে ঠিক `n` সাইজের হিপ অ্যারে `malloc` করা হয়েছে এবং Kadane অ্যালগরিদমে সর্বোচ্চ সাবঅ্যারে যোগফল বের করা হয়েছে।',
          'প্রোগ্রাম শেষ করার আগে হিপ মেমোরি অবশ্যই `free(arr)` করতে হবে।',
        ],
        memoryDiagram: `stdin: [-2,1,-3,4,5] -> Heap buf -> Kadane best=9 -> free(arr)`,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *arr = (long long *)malloc((size_t)n * sizeof(*arr));
    if (!arr) return 1;
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    long long cur = arr[0], best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = (cur + arr[i] > arr[i]) ? (cur + arr[i]) : arr[i];
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    free(arr);
    arr = nullptr;
    return 0;
}`,
        stdin: '5\n-2 1 -3 4 5',
        expectedOutput: '9',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'malloc((size_t)n * sizeof(*arr))', whatItMeans: 'Allocates exact runtime size n on heap.', whyItIsThere: 'Avoids fixed stack limits for big inputs.', ifDeletedError: 'Compile error: arr undeclared.' },
        ],
      },
      {
        id: 'c-ch-17-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Safe Dynamic Vector Growth Using realloc With Temp Guard',
        englishParagraphs: [
          'Dynamic buffers double capacity (`cap = cap ? cap * 2 : 4`) whenever full, yielding O(1) amortized append time—just like C++ `std::vector`.',
          'Always assign `realloc` to a temporary pointer `tmp` first; assigning directly to `buf` leaks the old pointer if `realloc` returns `nullptr`!',
        ],
        banglaParagraphs: [
          'আগে থেকে কতগুলো ইনপুট আসবে জানা না থাকলে `realloc` দিয়ে ধারণক্ষমতা দ্বিগুণ (`cap * 2`) করে নেওয়া হয়।',
          'তবে সবসময় `tmp = realloc(buf, ...)` ধরে যাচাই করে তবেই `buf = tmp` লিখবে, নইলে ব্যর্থ হলে পুরোনো ঠিকানাও হারিয়ে যাবে!',
        ],
        memoryDiagram: `cap=2 -> push 3rd -> realloc cap=4 -> copy/extend -> free(buf)`,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t len = 0, cap = 2;
    long long *buf = (long long *)malloc(cap * sizeof(*buf));
    if (!buf) return 1;
    long long x = 0;
    while (scanf("%lld", &x) == 1) {
        if (len == cap) {
            cap *= 2;
            long long *tmp = (long long *)realloc(buf, cap * sizeof(*buf));
            if (!tmp) { free(buf); return 1; }
            buf = tmp;
        }
        buf[len++] = x;
    }
    printf("len=%zu cap=%zu last=%lld\\n", len, cap, len ? buf[len - 1] : 0);
    free(buf);
    return 0;
}`,
        stdin: '10 20 30',
        expectedOutput: 'len=3 cap=4 last=30',
        lineByLine: [
          { lineNumber: 'Line 12', codeSnippet: 'long long *tmp = (long long *)realloc(buf, cap * sizeof(*buf));', whatItMeans: 'Requests resized heap block through temp pointer.', whyItIsThere: 'Keeps original buf intact so it can be freed if realloc fails.', ifDeletedError: 'Memory leak on realloc failure.' },
        ],
      },
      {
        id: 'c-ch-17-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Use-After-Free & Double-Free Prevention With nullptr Reset',
        englishParagraphs: [
          'Calling `free(p)` does NOT zero `p`—reading `*p` afterward is Use-After-Free, and calling `free(p)` a second time corrupts the allocator heap!',
          'Setting `p = nullptr;` right after `free(p)` renders any accidental second `free(nullptr)` a harmless no-op guaranteed by the C standard.',
        ],
        banglaParagraphs: [
          '`free(p)` করার পর `p`-তে কিন্তু পুরোনো ঠিকানাই থেকে যায়! আবার ভুলে `free(p)` করলে ডাবল-ফ্রি ক্র্যাশ হবে।',
          'তাই `free(p); p = nullptr;` লিখে রাখলে দুর্ঘটনাবশত দ্বিতীয়বার `free(nullptr)` কল হলেও C স্ট্যান্ডার্ড অনুযায়ী কিছুই ভাঙবে না।',
        ],
        memoryDiagram: `free(p); p = nullptr; -> second free(nullptr) is 100% safe no-op`,
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = (int *)malloc(sizeof(*p));
    if (!p) return 1;
    *p = 77;
    printf("val=%d\\n", *p);
    free(p);
    p = nullptr;
    free(p);
    printf("safe=1\\n");
    return 0;
}`,
        stdin: '',
        expectedOutput: 'val=77\nsafe=1',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'p = nullptr;', whatItMeans: 'Clears dangling address immediately after releasing heap memory.', whyItIsThere: 'Makes accidental second free(p) safe and catches logic bugs.', ifDeletedError: 'Calling free(p) on line 11 triggers double-free Undefined Behavior!' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports printf for stdout.', whyItIsThere: 'Displays test output.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 2', codeSnippet: '#include <stdlib.h>', whatItMeans: 'Provides malloc, calloc, realloc, and free prototypes.', whyItIsThere: 'Required for C heap memory management.', ifDeletedError: 'Compile error: undeclared calloc/free.' },
      { lineNumber: 'Line 6', codeSnippet: 'long long *arr = (long long *)calloc(n, sizeof(*arr));', whatItMeans: 'Allocates 5 zeroed 8-byte slots on the heap.', whyItIsThere: 'Cleanly initializes dynamic storage at runtime.', ifDeletedError: 'Compile error: arr undeclared.' },
      { lineNumber: 'Line 7', codeSnippet: 'if (!arr) return 1;', whatItMeans: 'Null-check guard against failed allocation.', whyItIsThere: 'Prevents null pointer dereference under OOM.', ifDeletedError: 'Segfault if allocator returns nullptr.' },
      { lineNumber: 'Line 10', codeSnippet: 'free(arr);', whatItMeans: 'Reclaims heap block when work finishes.', whyItIsThere: 'Eliminates memory leaks.', ifDeletedError: 'Allocated bytes remain leaked.' },
      { lineNumber: 'Line 11', codeSnippet: 'arr = nullptr;', whatItMeans: 'Resets pointer so no dangling reference remains.', whyItIsThere: 'Blocks Use-After-Free and Double-Free bugs.', ifDeletedError: 'arr stays a dangling pointer.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call calloc(5, 8)', memoryOrStack: 'Heap block 40B zeroed', note: 'arr points to block start' },
      { step: 2, state: 'Guard if (!arr)', memoryOrStack: 'arr != nullptr -> pass', note: 'Safe to write elements' },
      { step: 3, state: 'Fill 10..50 & print last', memoryOrStack: 'arr[4] = 50 -> "last=50"', note: 'Heap indexed via arr[i]' },
      { step: 4, state: 'free(arr); arr = nullptr;', memoryOrStack: 'Heap released, arr=null', note: 'Zero memory leaks' },
    ],
    harryBugTraps: [
      {
        title: 'Assigning realloc() Result Directly Into Original Pointer',
        brokenCode: `buf = realloc(buf, new_sz); // if NULL returned, original buf is leaked!`,
        fixedCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *buf = (int *)malloc(4 * sizeof(int));\n    int *tmp = (int *)realloc(buf, 8 * sizeof(int));\n    if (!tmp) { free(buf); return 1; }\n    buf = tmp; buf[0] = 42; printf("%d\\n", buf[0]);\n    free(buf);\n    return 0;\n}`,
        whyItBreaks: 'When realloc fails and returns nullptr, overwriting buf destroys the only pointer to the still-allocated old block.',
      },
      {
        title: 'Forgetting sizeof(T) Multiplier in malloc(n)',
        brokenCode: `long long *a = malloc(n); // allocates n BYTES instead of n * 8 bytes!`,
        fixedCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    size_t n = 4;\n    long long *a = (long long *)malloc(n * sizeof(*a));\n    if (a) { a[3] = 99; printf("%lld\\n", a[3]); free(a); }\n    return 0;\n}`,
        whyItBreaks: 'malloc expects total BYTES; writing a[1] past byte 8 corrupts heap metadata immediately.',
      },
      {
        title: 'Use-After-Free After Calling free(ptr)',
        brokenCode: `free(p); printf("%d", *p); // Undefined Behavior!`,
        fixedCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *p = (int *)malloc(sizeof(*p));\n    if (!p) return 1;\n    *p = 7; printf("%d\\n", *p);\n    free(p); p = nullptr;\n    return 0;\n}`,
        whyItBreaks: 'Once freed, the allocator may overwrite or unmap that chunk; reading *p crashes or leaks stale data.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-17-q1',
        difficulty: 'Easy',
        title: '1. Heap Array Mean Calculator',
        prompt: 'Read n then n doubles into a `malloc` array; print average to 2 decimals and free cleanly.',
        banglaHint: '`malloc(n * sizeof(double))` দিয়ে মেমোরি নিয়ে গড় বের করে শেষে `free` করো।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    double *a = (double *)malloc((size_t)n * sizeof(*a));\n    if (!a) return 1;\n    double s = 0;\n    for (int i = 0; i < n; i++) { scanf("%lf", &a[i]); s += a[i]; }\n    printf("%.2f\\n", s / n);\n    free(a);\n    return 0;\n}`,
        sampleStdin: '4\n10 20 30 40',
        expectedOutput: '25.00',
      },
      {
        id: 'c-ch-17-q2',
        difficulty: 'Easy',
        title: '2. Zero-Initialized Frequency Bucket via calloc',
        prompt: 'Read max_val and n numbers in [0..max_val]; allocate `calloc(max_val + 1, sizeof(int))` and print count of 0.',
        banglaHint: '`calloc` সব ঘর ০ দিয়ে শুরু করে, তাই আলাদা `= {0}` লুপ লাগে না।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int m = 0, n = 0;\n    if (scanf("%d %d", &m, &n) != 2 || m < 0) return 0;\n    int *f = (int *)calloc((size_t)m + 1, sizeof(*f));\n    if (!f) return 1;\n    for (int i = 0, x = 0; i < n && scanf("%d", &x) == 1; i++) if (x >= 0 && x <= m) f[x]++;\n    printf("%d\\n", f[0]);\n    free(f);\n    return 0;\n}`,
        sampleStdin: '5 4\n0 2 0 5',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-17-q3',
        difficulty: 'Medium',
        title: '3. Dynamic String Duplicate Helper',
        prompt: 'Write `char* my_strdup(const char *s)` allocating `strlen(s) + 1` bytes on heap and copy string.',
        banglaHint: 'নাল বাইট `\\0` রাখার জন্য `+ 1` বাইট বেশি `malloc` নিতে ভুলবে না!',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\nchar* my_strdup(const char *s) {\n    size_t len = strlen(s);\n    char *copy = (char *)malloc(len + 1);\n    if (copy) memcpy(copy, s, len + 1);\n    return copy;\n}\nint main(void) {\n    char buf[256];\n    if (scanf("%255s", buf) == 1) { char *d = my_strdup(buf); if (d) { printf("%s\\n", d); free(d); } }\n    return 0;\n}`,
        sampleStdin: 'HeapSafe',
        expectedOutput: 'HeapSafe',
      },
      {
        id: 'c-ch-17-q4',
        difficulty: 'Medium',
        title: '4. Dynamic 2D Matrix Row Sums',
        prompt: 'Read R and C; allocate flat contiguous heap block `R * C * sizeof(long long)` and print sum of row 0.',
        banglaHint: 'ফ্ল্যাট ১ডি হিপ অ্যারেতে `(r, c)` অবস্থান হলো `mat[r * C + c]`।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int R = 0, C = 0;\n    if (scanf("%d %d", &R, &C) != 2 || R <= 0 || C <= 0) return 0;\n    long long *m = (long long *)malloc((size_t)R * (size_t)C * sizeof(*m));\n    if (!m) return 1;\n    for (int i = 0; i < R * C; i++) scanf("%lld", &m[i]);\n    long long s = 0;\n    for (int c = 0; c < C; c++) s += m[c];\n    printf("%lld\\n", s);\n    free(m);\n    return 0;\n}`,
        sampleStdin: '2 3\n1 2 3\n4 5 6',
        expectedOutput: '6',
      },
      {
        id: 'c-ch-17-q5',
        difficulty: 'Hard',
        title: '5. Kadane Max Subarray on Dynamic Heap Buffer',
        prompt: 'Read n then n integers on heap; print maximum contiguous subarray sum cleanly.',
        banglaHint: '`cur = max(a[i], cur + a[i])` এবং শেষে `free(arr)`।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int n = 0;\n    if (scanf("%d", &n) != 1 || n <= 0) return 0;\n    long long *a = (long long *)malloc((size_t)n * sizeof(*a));\n    if (!a) return 1;\n    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n    long long cur = a[0], best = a[0];\n    for (int i = 1; i < n; i++) { cur = (cur + a[i] > a[i]) ? cur + a[i] : a[i]; if (cur > best) best = cur; }\n    printf("%lld\\n", best);\n    free(a);\n    return 0;\n}`,
        sampleStdin: '5\n-2 1 -3 4 5',
        expectedOutput: '9',
      },
    ],
    miniBuild: {
      title: 'Heap-Allocated Kadane Subarray Engine',
      description: 'Dynamically allocates exact input buffer on the heap, runs Kadane O(n) pass, and frees cleanly.',
      banglaGoal: 'হিপ মেমোরি বরাদ্দ করে Kadane অ্যালগরিদম চালিয়ে মেমোরি লিক ছাড়াই রিলিজ করা।',
      combinesChapters: 'Ch 1–17',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *arr = (long long *)malloc((size_t)n * sizeof(long long));
    if (!arr) return 1;
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    long long cur = arr[0], best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = (cur + arr[i] > arr[i]) ? (cur + arr[i]) : arr[i];
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    free(arr);
    return 0;
}`,
      sampleStdin: '5\n-2 1 -3 4 5',
      expectedOutput: '9',
    },
    starterCode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    long long *arr = (long long *)malloc((size_t)n * sizeof(long long));
    if (!arr) return 1;
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    long long cur = arr[0], best = arr[0];
    for (int i = 1; i < n; i++) {
        cur = (cur + arr[i] > arr[i]) ? (cur + arr[i]) : arr[i];
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    free(arr);
    return 0;
}`,
    sampleStdin: '5\n-2 1 -3 4 5',
    expectedSampleOutput: '9',
    testCases: [
      { id: 'c17-t1', input: '5\n-2 1 -3 4 5', expectedOutput: '9' },
      { id: 'c17-t2', input: '4\n-5 -2 -8 -1', expectedOutput: '-1', isHidden: true },
    ],
  },

  18: {
    chapterNumber: 18,
    title: 'C Chapter 18 (C23): Structs, Memory Padding & Encapsulation',
    banglaTitle: 'C অধ্যায় ১৮ (C23): স্ট্রাক্ট (Struct), মেমোরি প্যাডিং ও এনক্যাপসুলেশন',
    subtitle: 'Grouping heterogeneous fields with typedef struct, arrow operator (->), memory alignment padding, and opaque handles.',
    zeroIntuition: {
      plainEnglishStory:
        'Suppose you track 10,000 leaderboard players, each having a `name`, `score`, and `id`. Keeping three disconnected arrays (`names[]`, `scores[]`, `ids[]`) breaks the moment you sort one array without moving the others!\n\nC `struct` packs related fields together into ONE contiguous record in RAM. Passing `Player *p` by pointer avoids copying whole structs and lets helpers mutate fields cleanly using the arrow operator `p->score += delta` (shorthand for `(*p).score`). Even better, ordering struct fields largest-to-smallest minimizes CPU alignment padding bytes.',
      asciiFlowchart: `  typedef struct { char name[32]; long long score; } Player;
  RAM Block (40 bytes):
  +-----------------------------------+-------------------+
  | name[32] ("Alice\\0...")            | score (120)       |
  +-----------------------------------+-------------------+
  Player *p = &hero;  ==>  p->score += 30  ==> score becomes 150!`,
      pseudocode: [
        '1. GROUP related attributes inside typedef struct { ... } Name;',
        '2. ORDER fields cleanly to minimize alignment padding gaps',
        '3. PASS const Name *p for read-only helpers, Name *p for mutators',
        '4. ACCESS fields via dot (obj.field) or arrow (ptr->field)',
      ],
      banglaZeroToHero: {
        analogyTitle: 'একজন ছাত্রের সব তথ্য একটি স্টুডেন্ট কার্ডে বাঁধা (Struct Record)',
        explanation:
          'কল্পনা করো ক্লাসের ১০০ জন ছাত্রের নাম, রোল ও নম্বর তিনটি আলাদা খাতায় লেখা আছে। রোল অনুযায়ী নম্বর সাজাতে গেলে এক খাতা ওল্টালে বাকি দুটো খাতার সাথে মিল হারিয়ে যাবে! কিন্তু যদি প্রতিটি ছাত্রের জন্য একটি `struct Student` আইডি কার্ড বানাও, তবে তার নাম, রোল ও নম্বর সব একই সাথে যুক্ত থাকবে—সর্ট করলে পুরো কার্ডটাই একসাথে সরবে! C ভাষায় `typedef struct { ... } Player;` দিয়ে নিজের পছন্দমতো কাস্টম ডেটা টাইপ তৈরি করা যায়। সরাসরি ভ্যারিয়েবল হলে ডট অপারেটর `p.score` আর পয়েন্টার হলে অ্যারো অপারেটর `ptr->score` দিয়ে ভেতরের মান পড়া বা বদলানো হয়। একটি চমৎকার সিস্টেমস-লেভেল রহস্য হলো Struct Padding: CPU দ্রুত পড়ার জন্য ৮-বাইট ডেটাকে ৮-এর গুণিতক ঠিকানায় বসায়। তাই `char` (১ বাইট), `long long` (৮ বাইট), `char` (১ বাইট) এভাবে এলোমেলো সাজালে মাঝখানে ফাঁকা প্যাডিং বাইট নষ্ট হয়ে ২৪ বাইট হতে পারে, অথচ বড় টাইপ আগে ও ছোটগুলো একসাথে রাখলে মাত্র ১৬ বাইটেই জায়গা হয়ে যায়! ফাংশনে বড় স্ট্রাক্ট কপি করে পাস না করে সবসময় `const Player *p` পয়েন্টার পাস করবে যাতে `O(1)` সময়ে কেবল ৮ বাইট অ্যাড্রেস যায়। আর হেডার ফাইলে শুধু ফরওয়ার্ড ডিক্লেয়ারেশন রেখে C ফাইলে ভেতরের ফিল্ড লুকিয়ে রাখা (Opaque Pointer) হলো সি ভাষায় এনক্যাপসুলেশনের পেশাদার কৌশল।',
        everydayExample:
          'ভর্তি ফর্মে নাম, ফোন ও ঠিকানা আলাদা কাগজে না লিখে একই ফর্মের ভেতর বক্স করে রাখা হলো `struct`—যেখানে ফর্ম সরালেই সব তথ্য একসাথে সরে যায়!',
        keyTakeaways: [
          'অ্যারে বা ভ্যালু হলে `p.score` আর পয়েন্টার হলে `ptr->score` (`(*ptr).score`) ব্যবহার করো।',
          'ফাংশনে বড় স্ট্রাক্ট কপি না করে `const T *p` (রিড-অনলি) অথবা `T *p` (মিউটেশন) পাস করো।',
          'মেমোরি বাঁচাতে স্ট্রাক্টের বড় ফিল্ড (`double`, `long long`) আগে এবং ছোট (`char`) পরে সাজাও।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-18-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Defining a typedef struct With Designated Initializer',
        englishParagraphs: [
          'C allows clean designated initialization `{ .id = 1, .score = 95 }` so omitted fields automatically zero-initialize without garbage.',
          'Using `typedef struct` lets you write `Record r;` directly instead of repeating `struct Record r;` everywhere.',
        ],
        banglaParagraphs: [
          'এখানে `typedef struct` দিয়ে `Item` টাইপ তৈরি করা হয়েছে এবং `{ .id = 101, .price = 45 }` ডিজাইনেটেড ইনিশিয়ালাইজার ব্যবহার করা হয়েছে।',
          'ফলে কোনো ফিল্ড বাদ পড়লেও তা স্বয়ংক্রিয়ভাবে ০ হয়ে যায়, গার্বেজ থাকে না।',
        ],
        memoryDiagram: `Item it -> [ id: 101 | price: 45 ] (contiguous stack record)`,
        code: `#include <stdio.h>

typedef struct {
    int id;
    long long price;
} Item;

int main(void) {
    Item it = { .id = 101, .price = 45 };
    printf("id=%d price=%lld\\n", it.id, it.price);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'id=101 price=45',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'typedef struct {', whatItMeans: 'Begins custom composite data type named Item.', whyItIsThere: 'Groups id and price into one cohesive unit.', ifDeletedError: 'Compile error: unknown type name Item.' },
          { lineNumber: 'Line 9', codeSnippet: 'Item it = { .id = 101, .price = 45 };', whatItMeans: 'Initializes fields explicitly by name.', whyItIsThere: 'Self-documenting and zeroes any unmentioned fields.', ifDeletedError: 'Compile error: it undeclared.' },
          { lineNumber: 'Line 10', codeSnippet: 'printf("id=%d price=%lld\\n", it.id, it.price);', whatItMeans: 'Accesses members via dot operator (.).', whyItIsThere: 'Reads stored fields directly from stack record.', ifDeletedError: 'Prints nothing.' },
        ],
      },
      {
        id: 'c-ch-18-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Encapsulated Mutator Method With Arrow Operator (->)',
        englishParagraphs: [
          'By pairing a `Player` struct with helper functions `player_boost(Player *p, int delta)` and `player_print(const Player *p)`, C achieves clean encapsulation without OOP overhead.',
          'Inside pointer-taking helpers, `p->score` accesses the score field on the caller’s original struct.',
        ],
        banglaParagraphs: [
          'পয়েন্টার `Player *p` গ্রহণ করে `p->score += delta;` দিয়ে সরাসরি মূল প্লেয়ারের স্কোর বাড়ানো হয়েছে।',
          'এটাই C-তে অবজেক্ট মেথডের মতো এনক্যাপসুলেশন প্যাটার্ন!',
        ],
        memoryDiagram: `player_boost(&hero, 30) -> hero.score: 120 -> 150 -> "Alice:150"`,
        code: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void player_boost(Player *p, int delta) {
    if (p) p->score += delta;
}

int main(void) {
    Player p = { .score = 0 };
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        player_boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
        stdin: 'Alice 120 30',
        expectedOutput: 'Alice:150',
        lineByLine: [
          { lineNumber: 'Line 9', codeSnippet: 'if (p) p->score += delta;', whatItMeans: 'Guards nullptr and updates caller’s struct field via arrow ->.', whyItIsThere: 'Mutates original Player in O(1) without copying.', ifDeletedError: 'Score never increases by delta.' },
        ],
      },
      {
        id: 'c-ch-18-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Struct Alignment & Padding Inspection With sizeof',
        englishParagraphs: [
          'CPUs read 8-byte `long long` values fastest at 8-byte aligned addresses. Placing `char a; long long b; char c;` forces padding bytes between `a` and `b` and after `c` (24 bytes total!).',
          'Reordering to `long long b; char a; char c;` packs both `char` fields into one 8-byte tail word (16 bytes total)—saving 33% RAM per million records!',
        ],
        banglaParagraphs: [
          'স্ট্রাক্টের ভেতরে ফিল্ডের ক্রম পরিবর্তন করলে মোট `sizeof` সাইজ কীভাবে কমে যায় তা এই প্রোগ্রামে হাতে-কলমে দেখানো হয়েছে!',
          'লাখ লাখ ডেটাবেস বা গ্রাফ নোড রাখার সময় বড় টাইপ আগে রাখলে বিশাল পরিমাণ RAM সাশ্রয় হয়।',
        ],
        memoryDiagram: `BadOrder{char, ll, char}=24B vs TightOrder{ll, char, char}=16B`,
        code: `#include <stdio.h>

typedef struct { char a; long long b; char c; } Loose;
typedef struct { long long b; char a; char c; } Tight;

int main(void) {
    printf("loose=%zu tight=%zu\\n", sizeof(Loose), sizeof(Tight));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'loose=24 tight=16',
        lineByLine: [
          { lineNumber: 'Line 4', codeSnippet: 'typedef struct { long long b; char a; char c; } Tight;', whatItMeans: 'Orders fields largest-to-smallest to minimize alignment holes.', whyItIsThere: 'Compresses struct footprint from 24 bytes down to 16 bytes.', ifDeletedError: 'Compile error: Tight undeclared.' },
        ],
      },
      {
        id: 'c-ch-18-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Sorting Struct Records Together & Pass-by-Value Trap',
        englishParagraphs: [
          'When sorting `n` students by score descending (tie-breaking by id ascending), swapping `Student` structs keeps every student’s `id` and `score` locked together automatically.',
          'Never pass a large struct by value into a mutator (`void reset(Student s)`) because modifying `s` only edits a discarded copy!',
        ],
        banglaParagraphs: [
          'একাধিক তথ্য একসাথে সর্ট করার সময় স্ট্রাক্ট অ্যারে সোয়াপ করলে `id` ও `score` কখনো আলাদা হয়ে যায় না!',
          'সবসময় `qsort` বা বাবল-সর্ট দিয়ে পুরো `Student` রেকর্ড অদলবদল করবে।',
        ],
        memoryDiagram: `[(1,50), (2,90)] -> compare score -> [(2,90), (1,50)] -> top id=2`,
        code: `#include <stdio.h>

typedef struct {
    int id;
    int score;
} Student;

int main(void) {
    int n = 0;
    if (scanf("%d", &n) == 1 && n > 0 && n <= 100) {
        Student st[100];
        for (int i = 0; i < n; i++) scanf("%d %d", &st[i].id, &st[i].score);
        int best = 0;
        for (int i = 1; i < n; i++) {
            if (st[i].score > st[best].score || (st[i].score == st[best].score && st[i].id < st[best].id)) {
                best = i;
            }
        }
        printf("top=%d score=%d\\n", st[best].id, st[best].score);
    }
    return 0;
}`,
        stdin: '3\n101 80\n102 95\n103 95',
        expectedOutput: 'top=102 score=95',
        lineByLine: [
          { lineNumber: 'Line 15', codeSnippet: 'st[i].score > st[best].score || (st[i].score == st[best].score && st[i].id < st[best].id)', whatItMeans: 'Composite tie-breaking rule on struct fields.', whyItIsThere: 'Selects highest score and lowest id on exact ties.', ifDeletedError: 'Tie-breaking fails on equal scores.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports printf declaration.', whyItIsThere: 'Allows printing struct fields.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'typedef struct {', whatItMeans: 'Starts composite struct blueprint.', whyItIsThere: 'Bundles related fields into a single RAM layout.', ifDeletedError: 'Compile error: invalid struct syntax.' },
      { lineNumber: 'Line 4', codeSnippet: 'int id;', whatItMeans: 'First integer member inside Item.', whyItIsThere: 'Identifies item uniquely.', ifDeletedError: 'Compile error: Item has no member named id.' },
      { lineNumber: 'Line 6', codeSnippet: '} Item;', whatItMeans: 'Assigns clean alias Item to the struct type.', whyItIsThere: 'Avoids writing "struct Item" repeatedly.', ifDeletedError: 'Compile error: unknown type Item.' },
      { lineNumber: 'Line 9', codeSnippet: 'Item it = { .id = 101, .price = 45 };', whatItMeans: 'Constructs initialized Item on stack.', whyItIsThere: 'Guarantees deterministic initial values.', ifDeletedError: 'Compile error: it undeclared.' },
      { lineNumber: 'Line 10', codeSnippet: 'printf("id=%d price=%lld\\n", it.id, it.price);', whatItMeans: 'Reads members via dot operator.', whyItIsThere: 'Emits verified state.', ifDeletedError: 'Empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Allocate Player p', memoryOrStack: 'name="", score=0', note: '36-40 bytes on stack' },
      { step: 2, state: 'scanf reads "Alice 120 30"', memoryOrStack: 'name="Alice", score=120, delta=30', note: 'Populates struct fields' },
      { step: 3, state: 'Call player_boost(&p, 30)', memoryOrStack: 'p->score = 120 + 30 = 150', note: 'Arrow mutates caller’s struct' },
      { step: 4, state: 'printf result', memoryOrStack: 'stdout="Alice:150"', note: 'Updated state preserved' },
    ],
    harryBugTraps: [
      {
        title: 'Passing Struct by Value to a Mutator Function',
        brokenCode: `void boost(Player p) { p.score += 10; } // modifies copy, caller unchanged!`,
        fixedCode: `#include <stdio.h>\ntypedef struct { int score; } Player;\nvoid boost(Player *p) { p->score += 10; }\nint main(void) { Player p = {50}; boost(&p); printf("%d\\n", p.score); return 0; }`,
        whyItBreaks: 'C passes structs by value (copying all bytes); without a pointer Player *, mutations evaporate on return.',
      },
      {
        title: 'Comparing Two Structs Directly With ==',
        brokenCode: `if (p1 == p2) printf("Same"); // Invalid operands to binary ==!`,
        fixedCode: `#include <stdio.h>\ntypedef struct { int x, y; } Pt;\nint pt_eq(const Pt *a, const Pt *b) { return a->x == b->x && a->y == b->y; }\nint main(void) { Pt a={1,2}, b={1,2}; printf("%d\\n", pt_eq(&a,&b)); return 0; }`,
        whyItBreaks: 'Structs may contain uninitialized padding bytes, so C forbids == on structs; compare fields explicitly.',
      },
      {
        title: 'Forgetting Semicolon After Struct Closing Brace',
        brokenCode: `typedef struct { int x; } Box\nint main(void) { return 0; }`,
        fixedCode: `#include <stdio.h>\ntypedef struct { int x; } Box;\nint main(void) { Box b = {7}; printf("%d\\n", b.x); return 0; }`,
        whyItBreaks: 'Missing ; causes the compiler to parse main() as part of the struct declaration.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-18-q1',
        difficulty: 'Easy',
        title: '1. 2D Point Squared Distance',
        prompt: 'Define `typedef struct { long long x, y; } Point;`. Read two points and print squared Euclidean distance.',
        banglaHint: 'ডিসট্যান্স রুট না করে `dx*dx + dy*dy` নিলে পূর্ণসংখ্যায় নিখুঁত উত্তর আসে।',
        starterCode: `#include <stdio.h>\ntypedef struct { long long x, y; } Point;\nint main(void) {\n    Point a, b;\n    if (scanf("%lld %lld %lld %lld", &a.x, &a.y, &b.x, &b.y) == 4) {\n        long long dx = a.x - b.x, dy = a.y - b.y;\n        printf("%lld\\n", dx * dx + dy * dy);\n    }\n    return 0;\n}`,
        sampleStdin: '1 2 4 6',
        expectedOutput: '25',
      },
      {
        id: 'c-ch-18-q2',
        difficulty: 'Easy',
        title: '2. Rectangle Area & Perimeter Function',
        prompt: 'Define `Rect { long long w, h }`; write helper returning area and print `area perim`.',
        banglaHint: '`const Rect *r` পয়েন্টার পাস করে `r->w * r->h` হিসাব করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { long long w, h; } Rect;\nlong long area(const Rect *r) { return r->w * r->h; }\nint main(void) {\n    Rect r;\n    if (scanf("%lld %lld", &r.w, &r.h) == 2) printf("%lld %lld\\n", area(&r), 2 * (r.w + r.h));\n    return 0;\n}`,
        sampleStdin: '5 8',
        expectedOutput: '40 26',
      },
      {
        id: 'c-ch-18-q3',
        difficulty: 'Medium',
        title: '3. BankAccount Deposit & Safe Withdraw',
        prompt: 'Read initial balance, deposit d, withdraw w (only if sufficient); print final balance.',
        banglaHint: '`withdraw` ফাংশনে আগে `if (acc->bal >= amt)` চেক করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { long long bal; } Account;\nvoid deposit(Account *a, long long amt) { if (amt > 0) a->bal += amt; }\nvoid withdraw(Account *a, long long amt) { if (amt > 0 && a->bal >= amt) a->bal -= amt; }\nint main(void) {\n    Account acc = {0}; long long d = 0, w = 0;\n    if (scanf("%lld %lld %lld", &acc.bal, &d, &w) == 3) { deposit(&acc, d); withdraw(&acc, w); printf("%lld\\n", acc.bal); }\n    return 0;\n}`,
        sampleStdin: '100 50 180',
        expectedOutput: '150',
      },
      {
        id: 'c-ch-18-q4',
        difficulty: 'Medium',
        title: '4. Rational Fraction Reduction Struct',
        prompt: 'Read num and den, reduce via GCD inside `Frac { long long n, d; }`, and print `n/d`.',
        banglaHint: 'ফ্র্যাকশনের হর ও লবকে তাদের `gcd` দিয়ে ভাগ করে সংক্ষিপ্ত করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { long long n, d; } Frac;\nlong long gcd(long long a, long long b) { while (b) { long long t = a % b; a = b; b = t; } return a < 0 ? -a : a; }\nint main(void) {\n    Frac f;\n    if (scanf("%lld %lld", &f.n, &f.d) == 2 && f.d != 0) {\n        long long g = gcd(f.n, f.d); f.n /= g; f.d /= g;\n        printf("%lld/%lld\\n", f.n, f.d);\n    }\n    return 0;\n}`,
        sampleStdin: '12 18',
        expectedOutput: '2/3',
      },
      {
        id: 'c-ch-18-q5',
        difficulty: 'Hard',
        title: '5. Sort Struct Points by (x asc, y asc)',
        prompt: 'Read n <= 100 Points; print them sorted lexicographically by x then y.',
        banglaHint: 'দুটি `Point` তুলনা করতে `(a.x != b.x) ? a.x < b.x : a.y < b.y` শর্ত ব্যবহার করো।',
        starterCode: `#include <stdio.h>\ntypedef struct { long long x, y; } Pt;\nint main(void) {\n    int n = 0; Pt p[100];\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) scanf("%lld %lld", &p[i].x, &p[i].y);\n        for (int i = 0; i < n; i++)\n            for (int j = i + 1; j < n; j++)\n                if (p[j].x < p[i].x || (p[j].x == p[i].x && p[j].y < p[i].y)) { Pt t = p[i]; p[i] = p[j]; p[j] = t; }\n        for (int i = 0; i < n; i++) printf("%lld %lld\\n", p[i].x, p[i].y);\n    }\n    return 0;\n}`,
        sampleStdin: '3\n2 5\n1 9\n2 1',
        expectedOutput: '1 9\n2 1\n2 5',
      },
    ],
    miniBuild: {
      title: 'Player Score Encapsulation Module',
      description: 'Reads player name, score, and boost delta; updates encapsulated struct via pointer helper.',
      banglaGoal: 'স্ট্রাক্ট ও অ্যারো অপারেটর দিয়ে প্লেয়ার স্কোর এনক্যাপসুলেট ও আপডেট করা।',
      combinesChapters: 'Ch 1–18',
      starterCode: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void player_boost(Player *p, int delta) {
    if (p) p->score += delta;
}

int main(void) {
    Player p = { .score = 0 };
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        player_boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
      sampleStdin: 'Alice 120 30',
      expectedOutput: 'Alice:150',
    },
    starterCode: `#include <stdio.h>

typedef struct {
    char name[32];
    int score;
} Player;

void player_boost(Player *p, int delta) {
    if (p) p->score += delta;
}

int main(void) {
    Player p = { .score = 0 };
    int delta = 0;
    if (scanf("%31s %d %d", p.name, &p.score, &delta) == 3) {
        player_boost(&p, delta);
        printf("%s:%d\\n", p.name, p.score);
    }
    return 0;
}`,
    sampleStdin: 'Alice 120 30',
    expectedSampleOutput: 'Alice:150',
    testCases: [
      { id: 'c18-t1', input: 'Alice 120 30', expectedOutput: 'Alice:150' },
      { id: 'c18-t2', input: 'Bob 50 25', expectedOutput: 'Bob:75', isHidden: true },
    ],
  },

  19: {
    chapterNumber: 19,
    title: 'C Chapter 19 (C23): Polymorphism & Dispatch via Function Pointers',
    banglaTitle: 'C অধ্যায় ১৯ (C23): ফাংশন পয়েন্টার ও পলি-মর্ফিক ডিসপ্যাচ (VTable প্যাটার্ন)',
    subtitle: 'Simulating interfaces, strategy callbacks, tagged unions, and vtable dispatch cleanly in pure C.',
    zeroIntuition: {
      plainEnglishStory:
        'C has no `class`, `extends`, or `virtual` keywords—yet the Linux kernel, SQLite, and Python’s C runtime achieve full polymorphism in pure C! How? By storing **function pointers** inside a `struct`!\n\nA function pointer holds the code address of a function matching a specific signature, such as `long long (*area)(const void *)`. By embedding a vtable pointer or operation callback inside a `Shape` struct, callers invoke `s.area(&s)` identically whether the concrete object is a `Rect` or a `Square`—the exact mechanism C++ compilers generate behind the scenes!',
      asciiFlowchart: `  C Polymorphic Dispatch (VTable Pattern)
  Shape s = { .a = 4, .b = 5, .area = rect_area };
                |
                +--> s.area(s.a, s.b) --(jumps to address of rect_area)--> 20!
  If kind == "sq":  .area = sq_area   --(jumps to address of sq_area)----> 36!`,
      pseudocode: [
        '1. DEFINE interface struct holding state + function pointer(s)',
        '2. IMPLEMENT concrete handler functions sharing exact parameter/return signature',
        '3. BIND selected function pointer at runtime based on type/input',
        '4. DISPATCH uniformly through struct.fn_ptr(...) without caller if-else chains',
      ],
      banglaZeroToHero: {
        analogyTitle: 'রিমোট কন্ট্রোলের এক বাটন ও প্লাগ-এন্ড-প্লে সার্কিট (Function Pointer Interface)',
        explanation:
          'C ভাষায় Java বা C++-এর মতো `class` বা `interface` কীওয়ার্ড নেই—তাহলে Linux কার্নেল কীভাবে একই `read()` বা `write()` ফাংশন দিয়ে হার্ডডিস্ক, পেনড্রাইভ ও নেটওয়ার্ক কার্ড সবার সাথে কথা বলে? এর গোপন অস্ত্র হলো Function Pointer! আমরা যেমন ভ্যারিয়েবলের ঠিকানা পয়েন্টারে রাখি, তেমনি একটি ফাংশনের মেমোরি ঠিকানাও পয়েন্টারে (`int (*op)(int, int)`) রাখা যায়! যখন আমরা একটি `struct` এর ভেতর ডেটার সাথে একটি ফাংশন পয়েন্টার জুড়ে দিই (একে VTable বা Strategy Pattern বলে), তখন কলার কোড জানতেই চায় না ভেতরে এটি আয়তক্ষেত্র (`Rect`) নাকি বর্গক্ষেত্র (`Square`)—সে শুধু `shape.area(...)` কল করে এবং ডাইনামিকভাবে সঠিক ফাংশনটি রান হয়ে যায়! এছাড়া সর্টিং ফাংশন `qsort`-এ কাস্টম কম্পারেটর পাঠানো কিংবা ইভেন্ট হ্যান্ডলার রেজিস্টার করাতেও ফাংশন পয়েন্টার অপরিহার্য। জটিল ফাংশন পয়েন্টার সিনট্যাক্স সহজ রাখতে সবসময় `typedef` ব্যবহার করা ভালো, যেমন `typedef long long (*AreaFn)(long long, long long);`! আর ভিন্ন ধরনের ডেটা এক জায়গায় রাখতে চাইলে C-তে Tagged Union (`struct { enum Kind; union { ... }; }`) ব্যবহার করা হয় যাতে মেমোরি অপচয় না হয় ও ভুল টাইপ পড়া না হয়। সি ভাষায় ফাংশন পয়েন্টার বুঝতে পারলে C++/Rust/Java-এর `virtual`, `trait` বা `interface` ভেতরে কীভাবে কাজ করে তা পানির মতো পরিষ্কার হয়ে যাবে।',
        everydayExample:
          'সর্বজনীন পাওয়ার সকেটের মতো—সকেট (`Shape` ইন্টারফেস) একই থাকে, তুমি তাতে ফ্যানের প্লাগ দাও বা চার্জারের প্লাগ (`rect_area` বা `sq_area`), সেই অনুযায়ী কাজ চলে!',
        keyTakeaways: [
          'C++-এর `virtual` মেথড আর Rust-এর `dyn Trait` আসলে ভেতরে স্ট্রাক্টের মধ্যে থাকা Function Pointer টেবিল (VTable)।',
          'জটিল সিনট্যাক্স এড়াতে `typedef int (*OpFn)(int, int);` দিয়ে ফাংশন পয়েন্টারের সহজ নাম রাখো।',
          'ফাংশন পয়েন্টার কল করার আগে `if (fn != nullptr)` চেক করলে Null-Jump ক্র্যাশ হবে না।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-19-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Strategy Callback via Function Pointer typedef',
        englishParagraphs: [
          'Using `typedef long long (*MathOp)(long long, long long);` creates a clean callable type `MathOp`.',
          'Passing `apply(3, 4, mul)` lets one generic engine run interchangeable behaviors at runtime.',
        ],
        banglaParagraphs: [
          'এখানে `typedef` দিয়ে ফাংশন পয়েন্টারের সহজ নাম `MathOp` বানানো হয়েছে এবং `apply()` ফাংশনে ভিন্ন ভিন্ন অপারেশন (`add` বা `mul`) পাস করা হয়েছে।',
          'কোনো `if-else` ছাড়াই পাস করা ফাংশনটি সরাসরি রান হয়ে যাচ্ছে!',
        ],
        memoryDiagram: `apply(3, 4, mul) -> calls *op(3, 4) -> jumps to mul -> 12`,
        code: `#include <stdio.h>

typedef long long (*MathOp)(long long, long long);

long long add_op(long long a, long long b) { return a + b; }
long long mul_op(long long a, long long b) { return a * b; }

long long apply(long long x, long long y, MathOp op) {
    return op ? op(x, y) : 0;
}

int main(void) {
    printf("add=%lld mul=%lld\\n", apply(3, 4, add_op), apply(3, 4, mul_op));
    return 0;
}`,
        stdin: '',
        expectedOutput: 'add=7 mul=12',
        lineByLine: [
          { lineNumber: 'Line 3', codeSnippet: 'typedef long long (*MathOp)(long long, long long);', whatItMeans: 'Defines readable type alias for function pointer taking two long longs.', whyItIsThere: 'Avoids messy nested parentheses in function signatures.', ifDeletedError: 'Compile error: unknown type MathOp.' },
          { lineNumber: 'Line 8', codeSnippet: 'long long apply(long long x, long long y, MathOp op) {', whatItMeans: 'Higher-order function accepting behavior as a parameter.', whyItIsThere: 'Decouples orchestration logic from concrete operation.', ifDeletedError: 'Compile error: apply undeclared.' },
          { lineNumber: 'Line 9', codeSnippet: 'return op ? op(x, y) : 0;', whatItMeans: 'Guards non-null pointer and invokes underlying target function.', whyItIsThere: 'Dispatches polymorphically without switch statement.', ifDeletedError: 'Returns undefined/wrong value.' },
        ],
      },
      {
        id: 'c-ch-19-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Interface Polymorphism: Shape Struct With Area Dispatch',
        englishParagraphs: [
          'Depending on stdin (`"rect"` vs `"sq"`), we bind `Shape.area` to either `rect_area` or `sq_area`.',
          'The consumer simply calls `s.area(s.a, s.b)` regardless of concrete shape.',
        ],
        banglaParagraphs: [
          'ইনপুট `"rect"` নাকি `"sq"` তা দেখে `Shape` স্ট্রাক্টের ভেতরের `.area` ফাংশন পয়েন্টারে সঠিক ইমপ্লিমেন্টেশন যুক্ত করা হয়েছে।',
          'পরবর্তী লাইন কেবল `s.area(s.a, s.b)` কল করে যা C++/Java-র পলিমরফিক মেথডের হুবহু সমতুল্য!',
        ],
        memoryDiagram: `kind=="rect" -> s.area = rect_area -> s.area(4,5) = 20`,
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    int a, b;
    int (*area)(int, int);
} Shape;

int rect_area(int w, int h) { return w * h; }
int sq_area(int s, int unused) { (void)unused; return s * s; }

int main(void) {
    char kind[16];
    int x = 0, y = 0;
    if (scanf("%15s %d %d", kind, &x, &y) >= 2) {
        Shape s = strcmp(kind, "rect") == 0
            ? (Shape){ x, y, rect_area }
            : (Shape){ x, y, sq_area };
        printf("%d\\n", s.area(s.a, s.b));
    }
    return 0;
}`,
        stdin: 'rect 4 5',
        expectedOutput: '20',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'Shape s = strcmp(kind, "rect") == 0 ? ... : ...;', whatItMeans: 'Constructs Shape binding concrete function pointer.', whyItIsThere: 'Connects runtime choice to polymorphic call site.', ifDeletedError: 's has uninitialized area pointer.' },
        ],
      },
      {
        id: 'c-ch-19-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Lookup Dispatch Table (Array of Command Handlers)',
        englishParagraphs: [
          'CLI routers and embedded state machines avoid giant `switch` blocks by placing `{ "name", handler }` pairs inside a dispatch table.',
          'Adding a new command only requires adding one entry to the array without modifying the dispatch loop!',
        ],
        banglaParagraphs: [
          'বড় কমান্ড-লাইন অ্যাপ বা এমবেডেড মেনুতে লম্বা `if-else` চেইনের বদলে ফাংশন পয়েন্টারের একটি টেবিল (`Command commands[]`) ব্যবহার করা হয়।',
          'নতুন কমান্ড যোগ করতে হলে শুধু টেবিলে ১ লাইন বাড়ালেই চলে!',
        ],
        memoryDiagram: `table: [{"INC", on_inc}, {"DEC", on_dec}] -> match name -> call fn(val)`,
        code: `#include <stdio.h>
#include <string.h>

typedef int (*CmdFn)(int);
typedef struct { const char *name; CmdFn fn; } Command;

int on_inc(int v) { return v + 1; }
int on_dec(int v) { return v - 1; }

int main(void) {
    Command cmds[] = { {"INC", on_inc}, {"DEC", on_dec} };
    char op[16]; int val = 0;
    if (scanf("%15s %d", op, &val) == 2) {
        for (size_t i = 0; i < 2; i++) {
            if (strcmp(op, cmds[i].name) == 0) {
                printf("%d\\n", cmds[i].fn(val));
                break;
            }
        }
    }
    return 0;
}`,
        stdin: 'INC 41',
        expectedOutput: '42',
        lineByLine: [
          { lineNumber: 'Line 11', codeSnippet: 'Command cmds[] = { {"INC", on_inc}, {"DEC", on_dec} };', whatItMeans: 'Maps string command names directly to handler addresses.', whyItIsThere: 'Data-driven dispatch scales cleanly with zero nested branching.', ifDeletedError: 'Command table missing.' },
        ],
      },
      {
        id: 'c-ch-19-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Tagged Union Memory Efficiency & Type-Safe Switch',
        englishParagraphs: [
          'A C `union` shares the exact same RAM bytes across multiple types. Pairing an `enum Tag` with a `union` creates a safe Tagged Union (`Result` / `Variant`), preventing misinterpreting float bits as integer bits.',
          'Always verify `tag` before reading the matching union field.',
        ],
        banglaParagraphs: [
          'একই মেমোরি ব্লকে কখনো `int` আবার কখনো `double` রাখতে হলে `union`-এর সাথে একটি `enum` ট্যাগ রাখা হয়—একে Tagged Union বলে।',
          'ট্যাগ চেক না করে ভুল ফিল্ড পড়লে মেমোরির বিট উল্টোপাল্টা অর্থ তৈরি করে, তাই `switch (v.tag)` দিয়ে পড়া বাধ্যতামূলক।',
        ],
        memoryDiagram: `TaggedVal{ tag=INT, u.i=99 } shares 8B union slot cleanly`,
        code: `#include <stdio.h>

typedef enum { TAG_INT, TAG_DBL } ValTag;
typedef struct {
    ValTag tag;
    union { long long i; double d; } data;
} Value;

void print_val(const Value *v) {
    if (v->tag == TAG_INT) printf("INT:%lld\\n", v->data.i);
    else printf("DBL:%.2f\\n", v->data.d);
}

int main(void) {
    Value v1 = { .tag = TAG_INT, .data.i = 42 };
    Value v2 = { .tag = TAG_DBL, .data.d = 3.5 };
    print_val(&v1);
    print_val(&v2);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'INT:42\nDBL:3.50',
        lineByLine: [
          { lineNumber: 'Line 10', codeSnippet: 'if (v->tag == TAG_INT) printf("INT:%lld\\n", v->data.i);', whatItMeans: 'Checks discriminant tag before reading union payload.', whyItIsThere: 'Prevents type-punning corruption of shared union bytes.', ifDeletedError: 'Reads double bits as garbage integer or vice versa.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Includes standard I/O header.', whyItIsThere: 'Provides printf for stdout.', ifDeletedError: 'Compile error: implicit declaration of printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'typedef long long (*MathOp)(long long, long long);', whatItMeans: 'Defines function pointer type alias MathOp.', whyItIsThere: 'Allows passing functions cleanly as arguments.', ifDeletedError: 'Compile error: unknown type MathOp.' },
      { lineNumber: 'Line 5', codeSnippet: 'long long add_op(long long a, long long b) { return a + b; }', whatItMeans: 'Concrete implementation matching MathOp signature.', whyItIsThere: 'Target address bound into callback parameter.', ifDeletedError: 'Compile error: add_op undeclared.' },
      { lineNumber: 'Line 8', codeSnippet: 'long long apply(long long x, long long y, MathOp op) {', whatItMeans: 'Generic dispatcher accepting any MathOp function.', whyItIsThere: 'Demonstrates C strategy polymorphism.', ifDeletedError: 'Compile error: apply undeclared.' },
      { lineNumber: 'Line 9', codeSnippet: 'return op ? op(x, y) : 0;', whatItMeans: 'Checks pointer != nullptr then calls target function.', whyItIsThere: 'Safe indirect jump via code pointer.', ifDeletedError: 'Returns uninitialized / missing return.' },
      { lineNumber: 'Line 13', codeSnippet: 'printf("add=%lld mul=%lld\\n", apply(3, 4, add_op), apply(3, 4, mul_op));', whatItMeans: 'Passes function names (decaying to pointers) into apply.', whyItIsThere: 'Executes both strategies through identical call interface.', ifDeletedError: 'Program emits empty stdout.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Call apply(3, 4, add_op)', memoryOrStack: 'op = &add_op', note: 'Code address passed' },
      { step: 2, state: 'Invoke op(3, 4)', memoryOrStack: 'add_op(3, 4) -> 7', note: 'Dynamic indirect call' },
      { step: 3, state: 'Call apply(3, 4, mul_op)', memoryOrStack: 'op = &mul_op -> 12', note: 'Same apply() handles multiply' },
      { step: 4, state: 'Print outputs', memoryOrStack: 'stdout="add=7 mul=12"', note: 'Zero switch overhead' },
    ],
    harryBugTraps: [
      {
        title: 'Calling a Null or Uninitialized Function Pointer',
        brokenCode: `int (*fn)(int) = nullptr; fn(5); // Immediate Crash (SIGSEGV)!`,
        fixedCode: `#include <stdio.h>\ntypedef int (*Fn)(int);\nint id(int x) { return x; }\nint main(void) { Fn fn = id; if (fn) printf("%d\\n", fn(5)); return 0; }`,
        whyItBreaks: 'Jumping the CPU instruction pointer to address 0 crashes the process immediately with Segmentation Fault.',
      },
      {
        title: 'Mismatched Function Signature Cast',
        brokenCode: `void* p = (void*)my_fn; ((void(*)(int,int))p)(1,2); // signature mismatch UB!`,
        fixedCode: `#include <stdio.h>\ntypedef int (*BinFn)(int, int);\nint sub(int a, int b) { return a - b; }\nint main(void) { BinFn f = sub; printf("%d\\n", f(10, 3)); return 0; }`,
        whyItBreaks: 'Calling a function pointer through an incompatible signature corrupts registers and stack calling conventions (UB).',
      },
      {
        title: 'Reading Union Field Without Checking Its Active Tag',
        brokenCode: `union { int i; double d; } u; u.d = 3.14; printf("%d", u.i); // raw float bits!`,
        fixedCode: `#include <stdio.h>\ntypedef struct { int is_d; union { int i; double d; } u; } Safe;\nint main(void) { Safe s = {1, .u.d = 3.14}; if (s.is_d) printf("%.2f\\n", s.u.d); return 0; }`,
        whyItBreaks: 'Union members overlay the exact same RAM; reading the wrong member prints raw IEEE-754 bit patterns as garbage.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-19-q1',
        difficulty: 'Easy',
        title: '1. Dispatch Math Op by Operator Char',
        prompt: 'Bind `long long (*fn)(long long, long long)` to add, sub, or mul based on char op and print result.',
        banglaHint: '`switch (op)` দিয়ে `fn = add` ইত্যাদি সেট করে শেষে `fn(a, b)` কল করো।',
        starterCode: `#include <stdio.h>\nlong long f_add(long long a, long long b){return a+b;}\nlong long f_sub(long long a, long long b){return a-b;}\nlong long f_mul(long long a, long long b){return a*b;}\nint main(void) {\n    long long a = 0, b = 0; char op = '+';\n    if (scanf("%lld %c %lld", &a, &op, &b) == 3) {\n        long long (*fn)(long long, long long) = (op=='+')?f_add:(op=='-')?f_sub:f_mul;\n        printf("%lld\\n", fn(a, b));\n    }\n    return 0;\n}`,
        sampleStdin: '9 - 4',
        expectedOutput: '5',
      },
      {
        id: 'c-ch-19-q2',
        difficulty: 'Easy',
        title: '2. Higher-Order Array Transform (map)',
        prompt: 'Write `void map_arr(long long *a, int n, long long (*f)(long long))` that applies `f` to every element.',
        banglaHint: 'লুপের ভেতর `a[i] = f(a[i]);` কল করলেই যেকোনো ট্রান্সফর্ম ফাংশন কাজ করবে!',
        starterCode: `#include <stdio.h>\nlong long sq(long long x) { return x * x; }\nvoid map_arr(long long *a, int n, long long (*f)(long long)) { for (int i = 0; i < n; i++) a[i] = f(a[i]); }\nint main(void) {\n    int n = 0; long long a[100];\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n        map_arr(a, n, sq);\n        for (int i = 0; i < n; i++) printf("%lld%s", a[i], i + 1 == n ? "\\n" : " ");\n    }\n    return 0;\n}`,
        sampleStdin: '3\n2 3 5',
        expectedOutput: '4 9 25',
      },
      {
        id: 'c-ch-19-q3',
        difficulty: 'Medium',
        title: '3. Polymorphic Shape Area Dispatcher',
        prompt: 'Read kind ("rect" or "sq") and dimensions; print area via Shape function pointer.',
        banglaHint: '`Shape.area` পয়েন্টারে `rect_area` অথবা `sq_area` বসিয়ে প্রিন্ট করো।',
        starterCode: `#include <stdio.h>\n#include <string.h>\ntypedef struct { int a, b; int (*area)(int, int); } Shape;\nint r_area(int w, int h) { return w * h; }\nint s_area(int s, int u) { (void)u; return s * s; }\nint main(void) {\n    char k[16]; int a = 0, b = 0;\n    if (scanf("%15s %d %d", k, &a, &b) >= 2) {\n        Shape s = strcmp(k, "rect") == 0 ? (Shape){a, b, r_area} : (Shape){a, b, s_area};\n        printf("%d\\n", s.area(s.a, s.b));\n    }\n    return 0;\n}`,
        sampleStdin: 'sq 6 6',
        expectedOutput: '36',
      },
      {
        id: 'c-ch-19-q4',
        difficulty: 'Medium',
        title: '4. Array Filter Counter With Predicate Callback',
        prompt: 'Write `int count_if(const int *a, int n, int (*pred)(int))` and count positive numbers.',
        banglaHint: 'প্রেডিকেট ফাংশন `pred(a[i])` সত্য হলেই কাউন্টার বাড়াও।',
        starterCode: `#include <stdio.h>\nint is_pos(int x) { return x > 0; }\nint count_if(const int *a, int n, int (*p)(int)) { int c = 0; for (int i = 0; i < n; i++) if (p(a[i])) c++; return c; }\nint main(void) {\n    int n = 0, a[100];\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n        printf("%d\\n", count_if(a, n, is_pos));\n    }\n    return 0;\n}`,
        sampleStdin: '5\n-2 4 0 9 -1',
        expectedOutput: '2',
      },
      {
        id: 'c-ch-19-q5',
        difficulty: 'Hard',
        title: '5. Fold / Reduce Engine With Function Pointer',
        prompt: 'Write `long long reduce(const long long *a, int n, long long init, long long (*comb)(long long, long long))` for product.',
        banglaHint: 'শুরুতে `acc = init` ধরে প্রতিটি উপাদানে `acc = comb(acc, a[i])` চালাও।',
        starterCode: `#include <stdio.h>\nlong long mul(long long a, long long b) { return a * b; }\nlong long reduce(const long long *a, int n, long long init, long long (*f)(long long, long long)) {\n    long long acc = init; for (int i = 0; i < n; i++) acc = f(acc, a[i]); return acc;\n}\nint main(void) {\n    int n = 0; long long a[100];\n    if (scanf("%d", &n) == 1) {\n        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);\n        printf("%lld\\n", reduce(a, n, 1, mul));\n    }\n    return 0;\n}`,
        sampleStdin: '4\n2 3 4 5',
        expectedOutput: '120',
      },
    ],
    miniBuild: {
      title: 'C VTable Polymorphic Shape Dispatcher',
      description: 'Implements interface polymorphism in C using struct-embedded function pointers.',
      banglaGoal: 'C-তে ফাংশন পয়েন্টার দিয়ে Shape ইন্টারফেস ও ডিসপ্যাচ তৈরি করা।',
      combinesChapters: 'Ch 1–19',
      starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    int a, b;
    int (*area)(int, int);
} Shape;

int rect_area(int w, int h) { return w * h; }
int sq_area(int s, int unused) { (void)unused; return s * s; }

int main(void) {
    char kind[16];
    int x = 0, y = 0;
    if (scanf("%15s %d %d", kind, &x, &y) >= 2) {
        Shape s = strcmp(kind, "rect") == 0
            ? (Shape){ x, y, rect_area }
            : (Shape){ x, y, sq_area };
        printf("%d\\n", s.area(s.a, s.b));
    }
    return 0;
}`,
      sampleStdin: 'rect 4 5',
      expectedOutput: '20',
    },
    starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    int a, b;
    int (*area)(int, int);
} Shape;

int rect_area(int w, int h) { return w * h; }
int sq_area(int s, int unused) { (void)unused; return s * s; }

int main(void) {
    char kind[16];
    int x = 0, y = 0;
    if (scanf("%15s %d %d", kind, &x, &y) >= 2) {
        Shape s = strcmp(kind, "rect") == 0
            ? (Shape){ x, y, rect_area }
            : (Shape){ x, y, sq_area };
        printf("%d\\n", s.area(s.a, s.b));
    }
    return 0;
}`,
    sampleStdin: 'rect 4 5',
    expectedSampleOutput: '20',
    testCases: [
      { id: 'c19-t1', input: 'rect 4 5', expectedOutput: '20' },
      { id: 'c19-t2', input: 'sq 6 6', expectedOutput: '36', isHidden: true },
    ],
  },

  20: {
    chapterNumber: 20,
    title: 'C Chapter 20 (C23): Standard Library, _Generic Macros & Collections Patterns (Milestone Merger 4)',
    banglaTitle: 'C অধ্যায় ২০ (C23): স্ট্যান্ডার্ড লাইব্রেরি, _Generic ম্যাক্রো ও কালেকশন প্যাটার্ন (মাইলস্টোন মার্জার ৪)',
    subtitle: 'Type-generic _Generic dispatch, bsearch & qsort stdlib contracts, generic dynamic array vector macro, and Phase 4 Milestone Merger.',
    zeroIntuition: {
      plainEnglishStory:
        'C lacks C++ templates or Rust generics, yet C11/C23 gives us two clean tools to write type-safe generic code: `void*` stdlib algorithms (`qsort`, `bsearch`, `memcpy`) and compile-time `_Generic` type selection!\n\nWith `_Generic`, a single macro like `PRINT_VAL(x)` selects the exact type-safe `%d`, `%lld`, or `%.2f` handler at compile time with ZERO runtime overhead. Combined with Phase 4’s structs, dynamic heap allocation, and function pointers, you can build reusable C23 collection utilities cleanly.',
      asciiFlowchart: `  _Generic((x), int: print_int, double: print_dbl, default: print_ll)(x)
        |
        +--> x is int    ==> compiles direct call to print_int(x)
        +--> x is double ==> compiles direct call to print_dbl(x)  [0ns overhead!]`,
      pseudocode: [
        '1. DEFINE type-specific helpers (cmp_i64, swap_bytes, or _Generic dispatch)',
        '2. USE stdlib qsort + bsearch on generic contiguous buffers',
        '3. WRITE heap-backed generic collection struct with capacity growth & cleanup',
        '4. INTEGRATE Phase 4 pointers, heap memory, structs, and callbacks in Milestone Merger 4',
      ],
      banglaZeroToHero: {
        analogyTitle: 'সর্বজনীন চাবি ও টাইপ অনুযায়ী অটো-রাউটার (_Generic & Stdlib)',
        explanation:
          'C++ বা Rust-এ `template`/`Generics` থাকায় একটি ফাংশন দিয়েই `int`, `double`, বা `struct` সর্ট করা যায়। বিশুদ্ধ C-তে টেমপ্লেট নেই, কিন্তু স্ট্যান্ডার্ড লাইব্রেরি দুটি দারুণ অস্ত্র দেয়: ১) `void*` ভিত্তিক `qsort()` ও `bsearch()`, যেকোনো টাইপের অ্যারে সর্ট ও সার্চ করার জন্য, এবং ২) আধুনিক C11/C23-এর `_Generic` কীওয়ার্ড! `_Generic` হলো কম্পাইল-টাইম রাউটার: এটি দেখে নেয় তোমার দেওয়া ভ্যারিয়েবল `int` না `double` না `long long`, তারপর ঠিক সেই টাইপের ফাংশনে সরাসরি কল পাঠিয়ে দেয়—তাও কোনো রানটাইম খরচ ছাড়াই! আর নিজের ডায়নামিক ভেক্টর/কালেকশন বানাতে চাইলে স্ট্রাক্টের ভেতর `void *data`, `size_t elem_size`, `len`, এবং `cap` রেখে `memcpy` দিয়ে যেকোনো টাইপের ভেক্টর তৈরি করা যায়। তবে ম্যাক্রো লেখার সময় একটি ফাঁদ এড়িয়ে চলবে: `#define MAX(a,b) ((a)>(b)?(a):(b))` লিখলে `MAX(x++, y)`-তে `x++` দুবার চলে যাওয়ার বিপদ থাকে! তাই ফাংশন বা `_Generic`-ভিত্তিক ইনলাইন ফাংশন ম্যাক্রোর চেয়ে অনেক নিরাপদ। ফেইজ ৪ মার্জারে আমরা পয়েন্টার, হিপ (`malloc`), স্ট্রাক্ট ও `qsort`/`bsearch` স্ট্যান্ডার্ড লাইব্রেরি একসাথে কাজে লাগাবো!',
        everydayExample:
          'একটি স্মার্ট পার্সেল স্ক্যানার: খাম `int` হলে নীল বেল্টে, `double` হলে সবুজ বেল্টে অটোমেটিক পাঠিয়ে দেওয়া—কাজ শুরুর আগেই কম্পাইলার পথ ঠিক করে দেয়!',
        keyTakeaways: [
          '`_Generic((expr), T1: fn1, T2: fn2)` রানটাইম খরচ ছাড়াই কম্পাইল-টাইমে সঠিক টাইপ বেছে নেয়।',
          'স্ট্যান্ডার্ড লাইব্রেরির `qsort` ও `bsearch` যেকোনো স্ট্রাক্ট বা অ্যারের ওপর কাজ করে।',
          'ফাংশন-সদৃশ `#define` ম্যাক্রোতে প্যারামিটার একবারের বেশি ব্যবহৃত হলে `x++` পাস করা ভয়ংকর বাগ তৈরি করে।',
        ],
      },
    },
    topics: [
      {
        id: 'c-ch-20-topic-1',
        badge: 'Example 1: Zero-to-Hero Basic',
        title: 'Compile-Time Type Dispatch Using C23 _Generic',
        englishParagraphs: [
          'The `_Generic((x), int: ..., double: ...)` selector inspects the static type of `x` during compilation and resolves directly to the matching function.',
          'Unlike `printf("%d", x)` format mismatches that silently print garbage, `_Generic` refuses invalid types at compile time!',
        ],
        banglaParagraphs: [
          'আধুনিক C23-এ `_Generic` ব্যবহার করে একটাই `show_val(x)` ম্যাক্রো দিয়ে `int`, `long long` ও `double` আলাদা ফরম্যাটে নিরাপদে প্রিন্ট করা যায়।',
          'কোনো অজানা টাইপ দিলে কম্পাইলার সাথে সাথে এরর ধরে দেয়।',
        ],
        memoryDiagram: `show_val(42) -> show_i(42) | show_val(3.5) -> show_d(3.5)`,
        code: `#include <stdio.h>

void show_i(int x) { printf("int:%d ", x); }
void show_ll(long long x) { printf("ll:%lld ", x); }
void show_d(double x) { printf("dbl:%.1f\\n", x); }

#define SHOW(x) _Generic((x), \\
    int: show_i, \\
    long long: show_ll, \\
    double: show_d \\
)(x)

int main(void) {
    SHOW(7);
    SHOW(10000000000LL);
    SHOW(3.5);
    return 0;
}`,
        stdin: '',
        expectedOutput: 'int:7 ll:10000000000 dbl:3.5',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: '#define SHOW(x) _Generic((x), ...)(x)', whatItMeans: 'Selects type-matched function pointer at compile time and invokes it with x.', whyItIsThere: 'Achieves type-safe generic printing in pure C without runtime cost.', ifDeletedError: 'Compile error: implicit/undeclared SHOW.' },
        ],
      },
      {
        id: 'c-ch-20-topic-2',
        badge: 'Example 2: Interactive Input & Formatting',
        title: 'Type-Agnostic Byte Swap Using void* and memcpy',
        englishParagraphs: [
          'In `stdlib.h` spirit, writing `void generic_swap(void *a, void *b, size_t sz)` swaps two structs, ints, or doubles cleanly using a small stack buffer and `memcpy`.',
          'Using `memcpy` avoids strict-aliasing violations completely.',
        ],
        banglaParagraphs: [
          'যেকোনো টাইপের (`int`, `double`, বা বড় `struct`) দুটি ভ্যারিয়েবল অদলবদল করতে `void*` এবং `memcpy` দিয়ে `generic_swap` ফাংশন বানানো যায়।',
          'এতে প্রতিটি টাইপের জন্য আলাদা `swap` ফাংশন লিখতে হয় না।',
        ],
        memoryDiagram: `generic_swap(&x, &y, sizeof(x)) -> byte-by-byte swap via temp stack buffer`,
        code: `#include <stdio.h>
#include <string.h>

void swap_any(void *a, void *b, size_t sz) {
    unsigned char tmp[64];
    if (sz > sizeof(tmp)) return;
    memcpy(tmp, a, sz);
    memcpy(a, b, sz);
    memcpy(b, tmp, sz);
}

int main(void) {
    long long x = 0, y = 0;
    if (scanf("%lld %lld", &x, &y) == 2) {
        swap_any(&x, &y, sizeof(x));
        printf("%lld %lld\\n", x, y);
    }
    return 0;
}`,
        stdin: '12 99',
        expectedOutput: '99 12',
        lineByLine: [
          { lineNumber: 'Line 7', codeSnippet: 'memcpy(tmp, a, sz); memcpy(a, b, sz); memcpy(b, tmp, sz);', whatItMeans: 'Copies exact sz raw bytes safely without type assumptions.', whyItIsThere: 'Respects strict aliasing rules across any type.', ifDeletedError: 'x and y stay unswapped (12 99).' },
        ],
      },
      {
        id: 'c-ch-20-topic-3',
        badge: 'Example 3: Real-World Mini-Program',
        title: 'Stdlib qsort + bsearch Lookup Engine',
        englishParagraphs: [
          'After sorting a heap buffer with `qsort`, standard `<stdlib.h>` `bsearch(&key, arr, n, sizeof(*arr), cmp)` locates matching keys in `O(log n)` without hand-rolling loops.',
          'Always verify the returned pointer is non-null (`hit != nullptr`) before subtracting `hit - arr` to obtain its index!',
        ],
        banglaParagraphs: [
          '`<stdlib.h>`-এর `qsort` দিয়ে অ্যারে সাজিয়ে সরাসরি `bsearch` দিয়ে লুপ ছাড়াই `O(log n)` সময়ে যেকোনো কী খুঁজে বের করা যায়।',
          '`bsearch` কী খুঁজে পেলে পয়েন্টার ফেরত দেয়, না পেলে `nullptr` দেয়।',
        ],
        memoryDiagram: `qsort -> [3, 10, 25, 40] -> bsearch(&25) -> ptr @ idx=2`,
        code: `#include <stdio.h>
#include <stdlib.h>

int cmp_ll(const void *a, const void *b) {
    long long va = *(const long long *)a, vb = *(const long long *)b;
    return (va > vb) - (va < vb);
}

int main(void) {
    int n = 0; long long key = 0, a[1000];
    if (scanf("%d %lld", &n, &key) == 2 && n > 0) {
        for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
        qsort(a, (size_t)n, sizeof(a[0]), cmp_ll);
        long long *hit = (long long *)bsearch(&key, a, (size_t)n, sizeof(a[0]), cmp_ll);
        printf("%d\\n", hit ? (int)(hit - a) : -1);
    }
    return 0;
}`,
        stdin: '4 25\n40 3 25 10',
        expectedOutput: '2',
        lineByLine: [
          { lineNumber: 'Line 14', codeSnippet: 'bsearch(&key, a, (size_t)n, sizeof(a[0]), cmp_ll)', whatItMeans: 'Runs stdlib binary search returning element pointer or nullptr.', whyItIsThere: 'Eliminates manual binary search off-by-one bugs.', ifDeletedError: 'Compile error: hit undeclared.' },
        ],
      },
      {
        id: 'c-ch-20-topic-4',
        badge: 'Example 4: Bug Trap vs. CP Pattern',
        title: 'Milestone Merger 4: Heap-Backed Struct Collection + qsort',
        englishParagraphs: [
          'Combining Phase 4 (pointers, dynamic `malloc`/`free`, encapsulated `Item` struct, callback comparator, and `stdlib.h` `qsort`): read `n` items into heap storage, sort by priority descending, print top name, and free cleanly!',
          'Avoid macro side effects like `MAX(a++, b)` by using inline functions.',
        ],
        banglaParagraphs: [
          'ফেইজ ৪ মার্জার: হিপ মেমোরি (`malloc`), স্ট্রাক্ট (`Task`), ফাংশন পয়েন্টার কম্পারেটর ও স্ট্যান্ডার্ড লাইব্রেরি `qsort` একত্রিত করে একটি সম্পূর্ণ প্রায়োরিটি সর্টার তৈরি করা হয়েছে!',
          'সব কাজ শেষে `free(tasks)` করে মেমোরি পরিষ্কার রাখা হয়েছে।',
        ],
        memoryDiagram: `Heap Task[n] -> qsort(cmp_priority_desc) -> tasks[0].name -> free(tasks)`,
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct { char name[32]; int prio; } Task;

int cmp_desc(const void *pa, const void *pb) {
    const Task *a = (const Task *)pa, *b = (const Task *)pb;
    return (b->prio > a->prio) - (b->prio < a->prio);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Task *list = (Task *)malloc((size_t)n * sizeof(*list));
    if (!list) return 1;
    for (int i = 0; i < n; i++) scanf("%31s %d", list[i].name, &list[i].prio);
    qsort(list, (size_t)n, sizeof(*list), cmp_desc);
    printf("%s %d\\n", list[0].name, list[0].prio);
    free(list);
    return 0;
}`,
        stdin: '3\nSync 2\nDeploy 9\nLint 5',
        expectedOutput: 'Deploy 9',
        lineByLine: [
          { lineNumber: 'Line 17', codeSnippet: 'qsort(list, (size_t)n, sizeof(*list), cmp_desc);', whatItMeans: 'Sorts heap-allocated struct array using callback comparator.', whyItIsThere: 'Unifies structs, heap buffers, and stdlib generic algorithms.', ifDeletedError: 'Prints unsorted first item Sync 2 instead of Deploy 9.' },
        ],
      },
    ],
    lineByLineAnatomy: [
      { lineNumber: 'Line 1', codeSnippet: '#include <stdio.h>', whatItMeans: 'Imports printf for stdout.', whyItIsThere: 'Used inside each typed print helper.', ifDeletedError: 'Compile error: implicit printf.' },
      { lineNumber: 'Line 3', codeSnippet: 'void show_i(int x) { printf("int:%d ", x); }', whatItMeans: 'Type-specific formatter for int.', whyItIsThere: 'Target handler when _Generic matches int.', ifDeletedError: 'Compile error: show_i undeclared.' },
      { lineNumber: 'Line 7', codeSnippet: '#define SHOW(x) _Generic((x), \\', whatItMeans: 'Starts C23 compile-time type-generic macro.', whyItIsThere: 'Dispatches based on argument type without runtime cost.', ifDeletedError: 'SHOW macro unavailable.' },
      { lineNumber: 'Line 8', codeSnippet: 'int: show_i, \\', whatItMeans: 'Associates int expressions with show_i.', whyItIsThere: 'Selects int handler for SHOW(7).', ifDeletedError: 'Compile error on int arguments.' },
      { lineNumber: 'Line 11', codeSnippet: ')(x)', whatItMeans: 'Immediately invokes the selected function pointer with x.', whyItIsThere: '_Generic evaluates to a function pointer that must be called.', ifDeletedError: 'Expression resolves to unused function pointer instead of calling it.' },
    ],
    dryRunTable: [
      { step: 1, state: 'Expand SHOW(7)', memoryOrStack: 'typeof(7)==int -> show_i(7)', note: 'Stdout="int:7 "' },
      { step: 2, state: 'Expand SHOW(10^10LL)', memoryOrStack: 'typeof==long long -> show_ll', note: 'Stdout+="ll:10000000000 "' },
      { step: 3, state: 'Expand SHOW(3.5)', memoryOrStack: 'typeof==double -> show_d', note: 'Stdout+="dbl:3.5"' },
      { step: 4, state: 'Zero runtime branching', memoryOrStack: 'Direct calls emitted in binary', note: '100% compile-time dispatch' },
    ],
    harryBugTraps: [
      {
        title: 'Double-Evaluation Bug in Function-Like Macros (#define MAX(a,b))',
        brokenCode: `#define MAX(a,b) ((a)>(b)?(a):(b))\nint r = MAX(x++, y); // increments x TWICE!`,
        fixedCode: `#include <stdio.h>\nstatic inline int max_i(int a, int b) { return a > b ? a : b; }\nint main(void) { int x = 5, y = 3; printf("%d\\n", max_i(x++, y)); return 0; }`,
        whyItBreaks: 'Preprocessor macros paste arguments textually, evaluating x++ twice when x > y!',
      },
      {
        title: 'Calling bsearch() on an Unsorted Array',
        brokenCode: `bsearch(&k, unsorted, n, sizeof(int), cmp); // Undefined results!`,
        fixedCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) { int x=*(const int*)a, y=*(const int*)b; return (x>y)-(x<y); }\nint main(void) { int a[3]={9,2,5}, k=5; qsort(a,3,4,cmp); int *p=bsearch(&k,a,3,4,cmp); printf("%d\\n", p?*p:-1); return 0; }`,
        whyItBreaks: 'bsearch assumes monotonic ascending order matching the comparator; unsorted elements are skipped completely.',
      },
      {
        title: 'Missing default: Branch or Type Case in _Generic',
        brokenCode: `_Generic((x), int: f_i)(x) // fails if x is float!`,
        fixedCode: `#include <stdio.h>\nvoid f_i(int x){printf("i:%d\\n",x);} void f_o(double x){printf("o:%.1f\\n",x);}\n#define F(x) _Generic((x), int: f_i, default: f_o)(x)\nint main(void){ F(4); F(2.5); return 0; }`,
        whyItBreaks: 'If an expression type is not listed and no default: exists, compilation aborts cleanly.',
      },
    ],
    practiceSheet: [
      {
        id: 'c-ch-20-q1',
        difficulty: 'Easy',
        title: '1. Type-Safe _Generic Doubler',
        prompt: 'Write `_Generic` macro `DBL(x)` dispatching `int` and `double` helpers and print results on `5` and `2.5`.',
        banglaHint: '`int` ও `double`-এর জন্য দুটি আলাদা হেল্পার ফাংশন বানিয়ে `_Generic` দিয়ে যুক্ত করো।',
        starterCode: `#include <stdio.h>\nint dbl_i(int x){return x*2;} double dbl_d(double x){return x*2.0;}\n#define DBL(x) _Generic((x), int: dbl_i, double: dbl_d)(x)\nint main(void) { printf("%d %.1f\\n", DBL(5), DBL(2.5)); return 0; }`,
        sampleStdin: '',
        expectedOutput: '10 5.0',
      },
      {
        id: 'c-ch-20-q2',
        difficulty: 'Easy',
        title: '2. Safe Inline Max vs Macro Pitfall',
        prompt: 'Read a and b; increment a via `max_i(a++, b)` and print `max a`.',
        banglaHint: 'ম্যাক্রোর বদলে `static inline` ফাংশন ব্যবহার করলে `a++` ঠিক ১ বারই বাড়বে!',
        starterCode: `#include <stdio.h>\nstatic inline int max_i(int a, int b) { return a > b ? a : b; }\nint main(void) { int a=0, b=0; if (scanf("%d %d", &a, &b)==2) { int m = max_i(a++, b); printf("%d %d\\n", m, a); } return 0; }`,
        sampleStdin: '10 4',
        expectedOutput: '10 11',
      },
      {
        id: 'c-ch-20-q3',
        difficulty: 'Medium',
        title: '3. Stdlib qsort + bsearch Existence Check',
        prompt: 'Read n, key, then n ints; sort with qsort and use bsearch to print "FOUND" or "MISS".',
        banglaHint: '`bsearch(&key, a, n, sizeof(a[0]), cmp)` নাল না হলে "FOUND"! ',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b){ int x=*(const int*)a, y=*(const int*)b; return (x>y)-(x<y); }\nint main(void) {\n    int n=0, k=0, a[1000];\n    if (scanf("%d %d", &n, &k)==2) {\n        for(int i=0;i<n;i++) scanf("%d",&a[i]);\n        qsort(a,(size_t)n,sizeof(int),cmp);\n        printf("%s\\n", bsearch(&k,a,(size_t)n,sizeof(int),cmp) ? "FOUND" : "MISS");\n    }\n    return 0;\n}`,
        sampleStdin: '4 7\n10 2 7 5',
        expectedOutput: 'FOUND',
      },
      {
        id: 'c-ch-20-q4',
        difficulty: 'Medium',
        title: '4. Generic Byte Swap for Structs',
        prompt: 'Swap two `Pair { int x, y; }` structs using `memcpy`-based `swap_any` and print the first struct.',
        banglaHint: '`sizeof(Pair)` দিয়ে দুই স্ট্রাক্টের সব বাইট অদলবদল করো।',
        starterCode: `#include <stdio.h>\n#include <string.h>\ntypedef struct { int x, y; } Pair;\nvoid swap_any(void *a, void *b, size_t s) { unsigned char t[64]; memcpy(t,a,s); memcpy(a,b,s); memcpy(b,t,s); }\nint main(void) {\n    Pair p={0,0}, q={0,0};\n    if (scanf("%d %d %d %d", &p.x, &p.y, &q.x, &q.y)==4) { swap_any(&p, &q, sizeof(Pair)); printf("%d %d\\n", p.x, p.y); }\n    return 0;\n}`,
        sampleStdin: '1 2 9 8',
        expectedOutput: '9 8',
      },
      {
        id: 'c-ch-20-q5',
        difficulty: 'Hard',
        title: '5. Dynamic Heap Vector With Auto-Doubling Growth',
        prompt: 'Read n then n ints into a heap struct `Vec` starting at cap=2, doubling on overflow; print final `cap` and `sum`.',
        banglaHint: '`len == cap` হলে `cap *= 2` করে `realloc` দিয়ে বড় করো, শেষে `free(v.data)` ভুলবে না।',
        starterCode: `#include <stdio.h>\n#include <stdlib.h>\ntypedef struct { long long *d; size_t len, cap; } Vec;\nint main(void) {\n    int n=0; if (scanf("%d",&n)!=1 || n<=0) return 0;\n    Vec v = {(long long*)malloc(2*sizeof(long long)), 0, 2};\n    long long sum=0, x=0;\n    for (int i=0; i<n && scanf("%lld",&x)==1; i++) {\n        if (v.len == v.cap) { v.cap *= 2; long long *t=(long long*)realloc(v.d, v.cap*sizeof(long long)); if(!t){free(v.d);return 1;} v.d=t; }\n        v.d[v.len++]=x; sum+=x;\n    }\n    printf("%zu %lld\\n", v.cap, sum); free(v.d);\n    return 0;\n}`,
        sampleStdin: '5\n1 2 3 4 5',
        expectedOutput: '8 15',
      },
    ],
    miniBuild: {
      title: 'Milestone Merger 4: Heap Struct Priority Sorter',
      description: 'Integrates heap memory, structs, callbacks, and stdlib qsort into a clean priority scheduler.',
      banglaGoal: 'ফেইজ ৪ মার্জার: হিপ অ্যারে, স্ট্রাক্ট ও qsort মিলিয়ে টাস্ক প্রায়োরিটি সর্টার বানানো।',
      combinesChapters: 'Ch 16–20',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct { char name[32]; int prio; } Task;

int cmp_desc(const void *pa, const void *pb) {
    const Task *a = (const Task *)pa, *b = (const Task *)pb;
    return (b->prio > a->prio) - (b->prio < a->prio);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Task *list = (Task *)malloc((size_t)n * sizeof(*list));
    if (!list) return 1;
    for (int i = 0; i < n; i++) scanf("%31s %d", list[i].name, &list[i].prio);
    qsort(list, (size_t)n, sizeof(*list), cmp_desc);
    printf("%s %d\\n", list[0].name, list[0].prio);
    free(list);
    return 0;
}`,
      sampleStdin: '3\nSync 2\nDeploy 9\nLint 5',
      expectedOutput: 'Deploy 9',
    },
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct { char name[32]; int prio; } Task;

int cmp_desc(const void *pa, const void *pb) {
    const Task *a = (const Task *)pa, *b = (const Task *)pb;
    return (b->prio > a->prio) - (b->prio < a->prio);
}

int main(void) {
    int n = 0;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    Task *list = (Task *)malloc((size_t)n * sizeof(*list));
    if (!list) return 1;
    for (int i = 0; i < n; i++) scanf("%31s %d", list[i].name, &list[i].prio);
    qsort(list, (size_t)n, sizeof(*list), cmp_desc);
    printf("%s %d\\n", list[0].name, list[0].prio);
    free(list);
    return 0;
}`,
    sampleStdin: '3\nSync 2\nDeploy 9\nLint 5',
    expectedSampleOutput: 'Deploy 9',
    testCases: [
      { id: 'c20-t1', input: '3\nSync 2\nDeploy 9\nLint 5', expectedOutput: 'Deploy 9' },
      { id: 'c20-t2', input: '2\nBuild 1\nTest 8', expectedOutput: 'Test 8', isHidden: true },
    ],
  },
};


